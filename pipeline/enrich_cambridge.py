#!/usr/bin/env python3
"""
pipeline/enrich_cambridge.py
════════════════════════════════════════════════════════════════════════════════
WORKFLOW 3: Enrich W01–W53 lesson plans with Cambridge Flyers content using AI.

The 3 reference DOCX files (build_from_docx.py, Workflow 1) produce lesson plans
with correct schema/structure but WITHOUT Cambridge Flyers exam-format exercises.
This script enriches each week's JSON so it matches the W28 golden standard:

  1. PART 3 (Sentence Building) — full L1 / [O]L2 / [O]L3 / L4 / L5 structure
  2. PART 4 (Listening Practice) — Cambridge Flyers Listening format
  3. vocab_tiers — mnemonic Memory Tricks (no "Definition:" placeholders)
  4. teacher_contents — rich speaking notes, listening script, STEM extension

W28 is SKIPPED (already the golden standard).

Usage:
  python3 pipeline/enrich_cambridge.py 29              # enrich W29
  python3 pipeline/enrich_cambridge.py 29 30 31        # batch
  python3 pipeline/enrich_cambridge.py 29-36           # range
  python3 pipeline/enrich_cambridge.py 1-53            # all (W28 auto-skipped)
  python3 pipeline/enrich_cambridge.py --provider openai 29
  python3 pipeline/enrich_cambridge.py --dry-run 29    # show diff, don't write
  python3 pipeline/enrich_cambridge.py --no-validate 29

Environment:
  ANTHROPIC_API_KEY   — for Claude (default, recommended)
  OPENAI_API_KEY      — for GPT-4o (use --provider openai)

Output:
  Same 5 output files as Workflow 1 (build_from_docx.py):
    public/data/lessons/W{N}.json
    mcp-server/data/lessons/W{N}.json
    public/data/lessonPlans.json
    public/data/lessonPlans_index.json
    mcp-server/data/lessonPlans_index.json
"""

import sys, json, re, os, copy
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

try:
    from build_lesson_plans_from_docx import inject_week as inject_all_5_files
except ImportError:
    inject_all_5_files = None

try:
    from pipeline.validate_lesson_plan import validate_week
except ImportError:
    try:
        from validate_lesson_plan import validate_week
    except ImportError:
        validate_week = None

GOLDEN_PATH = ROOT / 'public/data/lessons/W28.json'
WEEKS_DIR   = ROOT / 'public/data/lessons'

# ── Helpers ────────────────────────────────────────────────────────────────────

def _load_week(week_num):
    path = WEEKS_DIR / ('W%d.json' % week_num)
    if not path.exists():
        raise FileNotFoundError('W%d.json not found — run build_from_docx.py first' % week_num)
    return json.loads(path.read_text(encoding='utf-8'))


def _save_week(week_num, data, dry_run=False):
    """Write enriched week to all 5 output locations."""
    if dry_run:
        print('  [dry-run] Would write W%d to 5 output files.' % week_num)
        return
    if inject_all_5_files:
        inject_all_5_files(week_num, data)
    else:
        # Fallback: write to the two JSON dirs directly
        for out_dir in [ROOT / 'public/data/lessons', ROOT / 'mcp-server/data/lessons']:
            out_dir.mkdir(parents=True, exist_ok=True)
            p = out_dir / ('W%d.json' % week_num)
            p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
        print('  Note: build_lesson_plans_from_docx not importable; wrote to lessons dirs only.')


def _find_part(parts, title_key):
    """Return (index, part_dict) for the first part whose title starts with title_key."""
    for i, p in enumerate(parts):
        if p.get('title', '').startswith(title_key):
            return i, p
    return None, None


def _extract_story(sessions, session_num):
    """Get the PART 1 reading passage text from a session."""
    for sess in sessions:
        if sess['session'] == session_num:
            _, part1 = _find_part(sess.get('parts', []), 'PART 1')
            if part1:
                lines = part1.get('content', [])
                # Story text is typically the long narrative line(s) before Stage questions
                story_lines = []
                for line in lines:
                    if re.match(r'Stage \d|T\s*/\s*F|What is the main', line):
                        break
                    if len(line) > 30:
                        story_lines.append(line)
                return ' '.join(story_lines) or '\n'.join(lines[:3])
    return ''


def _get_part3_content(sessions, session_num):
    """Return current PART 3 content lines for a session."""
    for sess in sessions:
        if sess['session'] == session_num:
            _, part3 = _find_part(sess.get('parts', []), 'PART 3')
            if part3:
                return part3.get('content', [])
    return []


def _update_part_in_all_views(data, session_num, part_key, new_content):
    """
    Update a specific part's content (identified by title prefix `part_key`)
    consistently across `sessions`, `sessions_5`, and `sessions_2`.
    """
    # --- sessions ---
    for sess in data.get('sessions', []):
        if sess['session'] == session_num:
            idx, part = _find_part(sess.get('parts', []), part_key)
            if part is not None:
                sess['parts'][idx]['content'] = new_content

    # --- sessions_5 ---
    # Slot 1 = S1 (PART 1-3), Slot 2 = S1 (PART 4-9)
    # Slot 3 = S2 (PART 1-3), Slot 4 = S2 (PART 4-9)
    # Slot 5 = S3 (PART 4-9) — S3 PART 1-3 not in sessions_5
    session_to_part13_slot = {1: 0, 2: 2}  # session_num → sessions_5 index for PART 1-3 slot
    slot_idx = session_to_part13_slot.get(session_num)
    if slot_idx is not None:
        slots = data.get('sessions_5', [])
        if slot_idx < len(slots):
            idx, part = _find_part(slots[slot_idx].get('parts', []), part_key)
            if part is not None:
                slots[slot_idx]['parts'][idx]['content'] = new_content

    # --- sessions_2 ---
    for sess in data.get('sessions_2', []):
        if sess.get('session') == session_num:
            idx, part = _find_part(sess.get('parts', []), part_key)
            if part is not None:
                sess['parts'][idx]['content'] = new_content


# ── Quality checks (detect what needs enrichment) ─────────────────────────────

def _needs_vocab_enrichment(vocab_tiers):
    """Return True if any vocab entry has a non-mnemonic Memory Trick."""
    for v in vocab_tiers:
        trick = v.get('Memory Trick', '')
        if trick.lower().startswith('definition:') or len(trick) < 5:
            return True
    return False


def _needs_vocab_expansion(vocab_tiers, min_words=14):
    """Return True if vocab_tiers has fewer than min_words entries."""
    return len(vocab_tiers) < min_words


def _needs_part3_enrichment(sessions, session_num, force=False):
    """Return True if PART 3 of this session is missing L1 or L5 sections (or force=True)."""
    if force:
        return True
    content = _get_part3_content(sessions, session_num)
    joined = '\n'.join(content)
    has_l1 = bool(re.search(r'L1\s*[—–-]', joined))
    has_l5 = bool(re.search(r'L5\s*[—–-]', joined))
    # Also force if items are not numbered
    has_numbering = bool(re.search(r'^\d+\.\s', joined, re.MULTILINE))
    return not (has_l1 and has_l5 and has_numbering)


def _needs_teacher_enrichment(teacher_contents, session_num):
    """Return True if teacher_contents for this session look incomplete."""
    for tc in teacher_contents:
        if tc.get('session') == session_num:
            speaking = tc.get('speaking_notes', '')
            # Red flag: speaking_notes contains exercise lines (L3 fill-in etc.)
            if re.search(r'L[34]\s*[—–-]\s*Fill|Unscramble', speaking):
                return True
            # Red flag: very short
            if len(speaking) < 400:
                return True
    return False


# ── Golden W28 examples (trimmed for prompt) ──────────────────────────────────

def _golden_part3_example():
    """Return W28 Session 1 PART 3 content as a JSON string (for prompt)."""
    golden = json.loads(GOLDEN_PATH.read_text(encoding='utf-8'))
    for sess in golden['sessions']:
        if sess['session'] == 1:
            _, part3 = _find_part(sess['parts'], 'PART 3')
            if part3:
                return json.dumps(part3['content'], ensure_ascii=False, indent=2)
    return '[]'


def _golden_teacher_contents_example():
    """Return W28 teacher_contents[0] as a JSON string (for prompt)."""
    golden = json.loads(GOLDEN_PATH.read_text(encoding='utf-8'))
    tc = golden.get('teacher_contents', [])
    if tc:
        return json.dumps(tc[0], ensure_ascii=False, indent=2)
    return '{}'


def _golden_vocab_example():
    """Return W28 vocab_tiers first 3 entries as JSON string (for prompt)."""
    golden = json.loads(GOLDEN_PATH.read_text(encoding='utf-8'))
    vt = golden.get('vocab_tiers', [])[:3]
    return json.dumps(vt, ensure_ascii=False, indent=2)


def _golden_vocab_full_example():
    """Return W30 full vocab_tiers as JSON string — good Science/Cambridge expansion example."""
    w30_path = WEEKS_DIR / 'W30.json'
    if w30_path.exists():
        d = json.loads(w30_path.read_text(encoding='utf-8'))
        return json.dumps(d.get('vocab_tiers', []), ensure_ascii=False, indent=2)
    return _golden_vocab_example()


# ── Prompt builders ────────────────────────────────────────────────────────────

def build_vocab_expansion_prompt(week_num, data):
    """
    Prompt to generate a FULL 18-20 word vocab_tiers list for a week that currently
    has fewer than 14 words. Expands to include:
      TIER 1: Core story/theme words (5-8)
      TIER 2: Cambridge Flyers preview vocabulary (5-8)
      TIER 3: Irregular verbs or STEM/grammar patterns (3-5, if relevant)
    """
    qr = data.get('quick_ref', {})
    theme   = qr.get('Theme', data.get('unit_theme', ''))
    grammar = qr.get('Grammar Focus', '')
    block   = qr.get('Block', '')
    current_vocab = data.get('vocab_tiers', [])
    current_words = [v['Word'] for v in current_vocab]

    s1_story = _extract_story(data['sessions'], 1)
    s2_story = _extract_story(data['sessions'], 2)
    s3_story = _extract_story(data['sessions'], 3)
    golden_ex = _golden_vocab_full_example()

    return """You are an expert EFL curriculum designer for EngQuest 3000 (Vietnamese primary school, Cambridge Flyers level, ages 8-11).

## TASK
Generate a FULL vocab_tiers list of exactly 18-20 words for Week {week}.
The current list only has {current_count} words — expand it to Cambridge Flyers standard.

## WEEK {week} CONTEXT
- Theme: {theme}
- Grammar Focus: {grammar}
- Block: {block}
- Reading stories summary:
  S1: {s1_story}
  S2: {s2_story}
  S3: {s3_story}

## CURRENT vocab_tiers (keep ALL of these, add more):
{current_vocab_json}

## GOLDEN EXAMPLE — W30 full vocab_tiers (19 words, follow this format EXACTLY):
{golden_ex}

## REQUIREMENTS
1. Keep ALL {current_count} existing words unchanged
2. Add words to reach 18-20 total, structured as:
   - TIER 1: Core story/theme words (the original {current_count} already count)
   - TIER 2: Cambridge Flyers exam vocabulary related to the theme
   - TIER 3: If grammar focus involves irregular verbs, include base→past pairs
3. Each word entry MUST have exactly 4 fields:
   - "Word": the English word (or "base → past" for irregular verbs)
   - "Vietnamese": translation (short, natural)
   - "Key Collocation(s)": 1-2 example collocations with the word
   - "Memory Trick": a memorable letter-based mnemonic e.g. "L-I-V-E: Life Is Very Exciting"
     OR a simple rule for irregular verbs e.g. "LIVE → LIVED: just add D"
4. Memory Tricks must be creative and memorable — NOT "Definition:"
5. Words must be genuinely Cambridge Flyers level — appropriate for ages 8-11

## OUTPUT
Return ONLY the JSON array (no markdown fences, no explanation):
[
  {{ "Word": "...", "Vietnamese": "...", "Key Collocation(s)": "...", "Memory Trick": "..." }},
  ...
]
""".format(
        week=week_num,
        theme=theme,
        grammar=grammar,
        block=block,
        current_count=len(current_vocab),
        current_vocab_json=json.dumps(current_vocab, ensure_ascii=False, indent=2),
        s1_story=s1_story[:400],
        s2_story=s2_story[:300],
        s3_story=s3_story[:300],
        golden_ex=golden_ex,
    )


def build_part3_prompt(week_num, data):
    """
    Prompt to enrich PART 3 (Sentence Building) for all 3 sessions.
    Returns a JSON object with keys: s1, s2, s3 — each an array of content lines.
    """
    qr = data.get('quick_ref', {})
    theme  = qr.get('Theme', data.get('unit_theme', ''))
    grammar = qr.get('Grammar Focus', '')
    block  = qr.get('Block', '')
    vocab_words = [v['Word'] for v in data.get('vocab_tiers', [])]

    s1_story = _extract_story(data['sessions'], 1)
    s2_story = _extract_story(data['sessions'], 2)
    s3_story = _extract_story(data['sessions'], 3)

    s1_current = json.dumps(_get_part3_content(data['sessions'], 1), ensure_ascii=False)
    s2_current = json.dumps(_get_part3_content(data['sessions'], 2), ensure_ascii=False)
    s3_current = json.dumps(_get_part3_content(data['sessions'], 3), ensure_ascii=False)

    golden_ex = _golden_part3_example()

    return """You are an expert EFL curriculum designer for EngQuest 3000 (Vietnamese primary school, Cambridge Flyers level, ages 8-11).

## TASK
Generate enriched PART 3: SENTENCE BUILDING content for Week {week}, Sessions 1, 2, and 3.
Return a JSON object with exactly 3 keys: "s1", "s2", "s3" — each an array of strings (content lines).

## WEEK {week} CONTEXT
- Theme: {theme}
- Grammar Focus: {grammar}
- Block: {block}
- Vocabulary words: {vocab_words}

## FIXED READING PASSAGES (do NOT change — base all exercises on these stories)
Session 1 story: {s1_story}
Session 2 story: {s2_story}
Session 3 story: {s3_story}

## GOLDEN EXAMPLE — W28 Session 1 PART 3 (follow this format EXACTLY):
{golden_ex}

## CURRENT PART 3 CONTENT (may be incomplete — use as base, enrich with missing sections)
Session 1 current: {s1_current}
Session 2 current: {s2_current}
Session 3 current: {s3_current}

## REQUIREMENTS FOR EACH SESSION'S PART 3
The output must include ALL of these sections IN ORDER:

1. **L1 — Read the clue and guess the word (10 items)**
   - Give a description/clue in English for a vocab word from the story
   - Student writes the word
   - Format: "This animal is very fast and has long ears. -> _________"

2. **[O] L2 — Older: True/False with Justification (10 items)**
   - Statement from or about the story
   - Student writes True/False and completes a justification sentence
   - Format: "The hare won the race. -> False. The hare ___________________."

3. **⬛ SPEAKING CHECKPOINT**
   - 2 example sentences for Student A and Student B
   - 1-line goal

4. **[O] L3 — Older: Fill in the blank with 3 options (10 items)**
   - Grammar-focused, uses vocab from the story
   - Format: "Yesterday, I ___ to the beach. (went / go / goes)"

5. **L4 — Sentence Expansion (10 items)**
   - Base sentence + Add phrase
   - Format: "Base: I went. + Add: (to the beach)"
   - Followed by answer line: "→ ____"

6. **L5 — Write Your Own (5 items)**
   - Creative sentence-writing prompts based on the story
   - Cambridge exam open-ended format

## OUTPUT FORMAT
Return ONLY this JSON object (no markdown fences, no explanation):
{{
  "s1": ["line1", "line2", ...],
  "s2": ["line1", "line2", ...],
  "s3": ["line1", "line2", ...]
}}
""".format(
        week=week_num,
        theme=theme,
        grammar=grammar,
        block=block,
        vocab_words=', '.join(vocab_words),
        s1_story=s1_story[:500],
        s2_story=s2_story[:500],
        s3_story=s3_story[:500],
        golden_ex=golden_ex,
        s1_current=s1_current[:1000],
        s2_current=s2_current[:1000],
        s3_current=s3_current[:1000],
    )


def build_vocab_prompt(week_num, data):
    """
    Prompt to fix vocab_tiers Memory Tricks.
    Only called for entries with 'Definition:' or missing tricks.
    Returns a JSON array matching the vocab_tiers structure.
    """
    vocab = data.get('vocab_tiers', [])
    golden_ex = _golden_vocab_example()
    vocab_json = json.dumps(vocab, ensure_ascii=False, indent=2)

    return """You are an expert EFL curriculum designer.

## TASK
Fix the vocab_tiers Memory Tricks for Week {week}.
Some entries have "Definition:" placeholders instead of proper letter-based mnemonics.
Replace ALL "Definition:" entries with memorable letter-based mnemonics following the golden format.

## GOLDEN EXAMPLE (follow this format):
{golden_ex}

## CURRENT vocab_tiers for Week {week}:
{vocab_json}

## RULES
- Memory Trick format: "X-X-X-X: Each Letter Stands For A Word"
- Each letter in the word maps to a memorable English word
- Example for "holiday": "H-O-L-I-D-A-Y: Happy Outstanding Laughter In Distant Amazing Years"
- Keep all other fields (Word, Vietnamese, Key Collocation(s)) exactly as-is
- Only change Memory Trick entries that start with "Definition:" or are too short/generic

## OUTPUT
Return ONLY the JSON array (no markdown fences, no explanation):
[
  {{ "Word": "...", "Vietnamese": "...", "Key Collocation(s)": "...", "Memory Trick": "..." }},
  ...
]
""".format(
        week=week_num,
        golden_ex=golden_ex,
        vocab_json=vocab_json,
    )


def build_teacher_contents_prompt(week_num, data):
    """
    Prompt to enrich teacher_contents for all 3 sessions.
    Returns a JSON array of 3 teacher_contents objects.
    """
    qr = data.get('quick_ref', {})
    theme  = qr.get('Theme', data.get('unit_theme', ''))
    grammar = qr.get('Grammar Focus', '')
    vocab_words = [v['Word'] for v in data.get('vocab_tiers', [])]

    s1_story = _extract_story(data['sessions'], 1)
    s2_story = _extract_story(data['sessions'], 2)
    s3_story = _extract_story(data['sessions'], 3)

    golden_ex = _golden_teacher_contents_example()
    current_tc = json.dumps(data.get('teacher_contents', []), ensure_ascii=False, indent=2)

    return """You are an expert EFL curriculum designer for EngQuest 3000 (Vietnamese primary school, Cambridge Flyers level).

## TASK
Enrich the teacher_contents for Week {week}, Sessions 1-3.
Return a JSON array with exactly 3 objects (one per session).

## WEEK {week} CONTEXT
- Theme: {theme}
- Grammar Focus: {grammar}
- Vocabulary: {vocab_words}

## FIXED READING PASSAGES
Session 1: {s1_story}
Session 2: {s2_story}
Session 3: {s3_story}

## GOLDEN EXAMPLE — W28 teacher_contents[0] (follow this structure EXACTLY):
{golden_ex}

## CURRENT teacher_contents for Week {week}:
{current_tc}

## REQUIREMENTS
Each teacher_contents object must have ALL these fields:
- "session": integer (1, 2, or 3)
- "session_label": empty string "" (always)
- "reading_passage": the main story text for this session (same as PART 1 story)
- "listening_script": object with:
    - "speed_note": e.g. "Normal speed (130 wpm)"
    - "text": the full script for the teacher to read aloud (~60-100 words, natural spoken English based on session story)
    - "dictation": one sentence from the script for dictation practice
- "grammar_notes": bullet points explaining the grammar focus for this session
- "speaking_notes": PROPER teacher guidance (NOT exercise content). Include:
    - SPEAKING CHECKPOINT guidance
    - Pull-out task instructions
    - How to scaffold weaker students
    - Target language the teacher should elicit
- "stem_extension": a science/math extension note connecting the theme (2-4 sentences)
- "in_class_speaking": a communicative task description (e.g. Story Circle, Partner Retell)
- "vc_answer_key": answer key for the Video Challenge fill-in task (comma-separated answers)

## CRITICAL: speaking_notes must be TEACHER GUIDANCE, not exercise content.
  - BAD: "L3 — Fill in the blank: Yesterday, I __ to the beach. (went/go/goes)"
  - GOOD: "SPEAKING CHECKPOINT: Student A names an action verb; Student B uses it in a sentence."

## OUTPUT
Return ONLY the JSON array (no markdown fences, no explanation):
[
  {{ ... session 1 teacher_contents ... }},
  {{ ... session 2 teacher_contents ... }},
  {{ ... session 3 teacher_contents ... }}
]
""".format(
        week=week_num,
        theme=theme,
        grammar=grammar,
        vocab_words=', '.join(vocab_words),
        s1_story=s1_story[:400],
        s2_story=s2_story[:400],
        s3_story=s3_story[:400],
        golden_ex=golden_ex,
        current_tc=current_tc[:3000],
    )


# ── LLM callers (reused from generate_ai_week.py) ─────────────────────────────

def call_llm(prompt, provider='claude', model=None):
    if provider == 'claude':
        if 'ANTHROPIC_API_KEY' not in os.environ:
            raise RuntimeError('ANTHROPIC_API_KEY not set. Export it first.')
        import anthropic
        client = anthropic.Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])
        msg = client.messages.create(
            model=model or 'claude-3-5-sonnet-20241022',
            max_tokens=8192,
            messages=[{'role': 'user', 'content': prompt}],
        )
        return msg.content[0].text

    elif provider == 'openai':
        if 'OPENAI_API_KEY' not in os.environ:
            raise RuntimeError('OPENAI_API_KEY not set.')
        from openai import OpenAI
        client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
        resp = client.chat.completions.create(
            model=model or 'gpt-4o',
            messages=[{'role': 'user', 'content': prompt}],
            max_tokens=8192,
            response_format={'type': 'json_object'},
        )
        return resp.choices[0].message.content

    raise ValueError('Unknown provider: %s' % provider)


def parse_json(text):
    """Extract JSON from LLM response (strip markdown fences if present)."""
    text = text.strip()
    text = re.sub(r'^```(?:json)?\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    return json.loads(text)


# ── Core enrichment function ───────────────────────────────────────────────────

def enrich_week(week_num, provider='claude', model=None, dry_run=False,
                no_validate=False, force_vocab=False, force_part3=False):
    """
    Enrich a single week's lesson plan with Cambridge content.
    force_vocab: expand vocab to ~18-20 words even if current count >= 14.
    force_part3: regenerate PART 3 with numbered items even if L1+L5 exist.
    Returns True on success, False on failure.
    """
    if week_num == 28:
        print('  W28: skipped (golden standard).')
        return True

    print('  W%d: loading existing JSON...' % week_num, end='', flush=True)
    try:
        data = _load_week(week_num)
    except FileNotFoundError as e:
        print(' ERROR: %s' % e)
        return False
    print(' ok')

    enriched = copy.deepcopy(data)
    changed = []

    # ── 0. Vocab EXPANSION (new words, not just fix tricks) ───────────────────
    if force_vocab or _needs_vocab_expansion(data.get('vocab_tiers', [])):
        reason = 'forced' if force_vocab else ('%d words < 14' % len(data.get('vocab_tiers', [])))
        print('  W%d: expanding vocab to 18-20 words (%s)...' % (week_num, reason), end='', flush=True)
        prompt = build_vocab_expansion_prompt(week_num, data)
        try:
            raw = call_llm(prompt, provider=provider, model=model)
            new_vocab = parse_json(raw)
            if isinstance(new_vocab, list) and 14 <= len(new_vocab) <= 24:
                enriched['vocab_tiers'] = new_vocab
                # Also update PART 2 content in all sessions to match new vocab
                for sess_num in [1, 2, 3]:
                    new_part2 = _build_part2_content(new_vocab, week_num, sess_num)
                    if new_part2:
                        _update_part_in_all_views(enriched, sess_num, 'PART 2', new_part2)
                print(' ok (%d words)' % len(new_vocab))
                changed.append('vocab_expanded')
                # Update data reference so PART 3 prompt uses new vocab
                data = copy.deepcopy(enriched)
            else:
                print(' WARNING: got %d words (expected 14-24), keeping original' % len(new_vocab) if isinstance(new_vocab, list) else ' WARNING: bad shape')
        except Exception as e:
            print(' FAILED: %s' % e)

    # ── 1. PART 3 enrichment ─────────────────────────────────────────────────
    needs_p3 = any(_needs_part3_enrichment(data['sessions'], s, force=force_part3) for s in [1, 2, 3])
    if needs_p3:
        reason = 'forced' if force_part3 else 'missing L1/L5/numbering'
        print('  W%d: enriching PART 3 (%s)...' % (week_num, reason), end='', flush=True)
        prompt = build_part3_prompt(week_num, enriched)
        try:
            raw = call_llm(prompt, provider=provider, model=model)
            result = parse_json(raw)
            for sess_key, sess_num in [('s1', 1), ('s2', 2), ('s3', 3)]:
                if sess_key in result and isinstance(result[sess_key], list):
                    _update_part_in_all_views(enriched, sess_num, 'PART 3', result[sess_key])
            print(' ok (%d+%d+%d lines)' % (
                len(result.get('s1', [])),
                len(result.get('s2', [])),
                len(result.get('s3', [])),
            ))
            changed.append('PART3')
        except Exception as e:
            print(' FAILED: %s' % e)
            # Continue with other enrichments

    # ── 2. Vocab Memory Tricks (fix existing tricks if not expanded) ──────────
    if 'vocab_expanded' not in changed and _needs_vocab_enrichment(enriched.get('vocab_tiers', [])):
        print('  W%d: fixing vocab Memory Tricks...' % week_num, end='', flush=True)
        prompt = build_vocab_prompt(week_num, enriched)
        try:
            raw = call_llm(prompt, provider=provider, model=model)
            new_vocab = parse_json(raw)
            if isinstance(new_vocab, list) and len(new_vocab) == len(enriched['vocab_tiers']):
                enriched['vocab_tiers'] = new_vocab
                print(' ok (%d words)' % len(new_vocab))
                changed.append('vocab')
            else:
                print(' WARNING: unexpected vocab response shape, keeping original')
        except Exception as e:
            print(' FAILED: %s' % e)

    # ── 3. Teacher contents enrichment ───────────────────────────────────────
    tc = enriched.get('teacher_contents', [])
    needs_tc = any(_needs_teacher_enrichment(tc, s) for s in [1, 2, 3])
    if needs_tc:
        print('  W%d: enriching teacher_contents...' % week_num, end='', flush=True)
        prompt = build_teacher_contents_prompt(week_num, data)
        try:
            raw = call_llm(prompt, provider=provider, model=model)
            new_tc = parse_json(raw)
            if isinstance(new_tc, list) and len(new_tc) == 3:
                enriched['teacher_contents'] = new_tc
                print(' ok')
                changed.append('teacher_contents')
            else:
                print(' WARNING: unexpected teacher_contents shape, keeping original')
        except Exception as e:
            print(' FAILED: %s' % e)

    if not changed:
        print('  W%d: already Cambridge-enriched, no changes needed.' % week_num)
        return True


def _build_part2_content(vocab_tiers, week_num, session_num):
    """
    Build numbered PART 2 content lines from vocab_tiers.
    Each word gets: number, Memory Trick, Write 3 times, Key Collocation, Collocation practice, Your turn.
    Returns list of strings matching W28/W30 format.
    """
    lines = []
    # Determine which vocab words to show per session (split evenly across 3 sessions)
    total = len(vocab_tiers)
    # Session 1 gets words 1 to ~ceil(total/3), session 2 next third, session 3 last third
    # But all words still in vocab_tiers — sessions show overlapping subsets for review
    # Simple approach: show all words in S1, highlight subset in S2/S3
    # Actually W28 pattern: S1 shows first ~8, S2 shows next ~5, S3 shows last ~5 + review
    per_sess = max(5, total // 3)
    start = (session_num - 1) * per_sess
    end   = start + per_sess + (total % 3 if session_num == 3 else 0)
    session_vocab = vocab_tiers[start:min(end, total)]
    if not session_vocab:  # fallback: show all if split empty
        session_vocab = vocab_tiers

    for i, v in enumerate(session_vocab, start=1):
        word = v.get('Word', '')
        viet = v.get('Vietnamese', '')
        trick = v.get('Memory Trick', '')
        colloc = v.get('Key Collocation(s)', '')
        lines.append('%d. %s (Vietnamese: %s)' % (i, word, viet))
        if trick and trick != '—':
            lines.append('\u2192 Memory trick: %s' % trick)
        lines.append('\u2192 Write 3 times: ___________ ___________ ___________')
        if colloc:
            lines.append('\u2192 Key Collocation: %s' % colloc)
            lines.append('\u2192 Collocation practice:')
            # Generate simple fill-in from collocation
            first_word = word.split('\u2192')[0].strip().split()[0] if '\u2192' in word else word.split()[0]
            lines.append('a. I ______________________________ %s.' % first_word)
            lines.append('b. She ______________________________ %s.' % first_word)
        lines.append('\u2192 Your turn: ____________________________________________________________')
    lines.append('[ Sub-total: ___ / %d ]' % len(session_vocab))
    return lines

    # ── 4. Validate ──────────────────────────────────────────────────────────
    if not no_validate and validate_week is not None:
        print('  W%d: validating...' % week_num, end='', flush=True)
        errors = validate_week(week_num, enriched)
        if errors:
            print(' WARNINGS: %s' % '; '.join(errors[:3]))
        else:
            print(' ok')

    # ── 5. Write ─────────────────────────────────────────────────────────────
    _save_week(week_num, enriched, dry_run=dry_run)

    if not dry_run:
        print('  W%d: ✓ enriched [%s]' % (week_num, ', '.join(changed)))
    return True


# ── Range parser (reused from generate_ai_week.py) ────────────────────────────

def parse_week_args(args):
    """Parse week numbers from CLI args (e.g. '29', '29-36', '1 2 3')."""
    weeks = []
    for a in args:
        if re.match(r'^\d+-\d+$', a):
            lo, hi = a.split('-')
            weeks.extend(range(int(lo), int(hi) + 1))
        elif re.match(r'^\d+$', a):
            weeks.append(int(a))
    return weeks


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]

    if not args or args[0] in ('-h', '--help'):
        print(__doc__)
        sys.exit(0)

    provider     = 'claude'
    model        = None
    dry_run      = False
    no_validate  = False
    force_vocab  = False
    force_part3  = False
    week_args    = []

    i = 0
    while i < len(args):
        a = args[i]
        if a == '--provider':
            provider = args[i + 1]; i += 2
        elif a == '--model':
            model = args[i + 1]; i += 2
        elif a == '--dry-run':
            dry_run = True; i += 1
        elif a == '--no-validate':
            no_validate = True; i += 1
        elif a == '--force-vocab':
            force_vocab = True; i += 1
        elif a == '--force-part3':
            force_part3 = True; i += 1
        elif a == '--force':
            force_vocab = True; force_part3 = True; i += 1
        else:
            week_args.append(a); i += 1

    weeks = parse_week_args(week_args)
    if not weeks:
        print('ERROR: no week numbers provided.')
        print('Usage: python3 pipeline/enrich_cambridge.py 29-36')
        sys.exit(1)

    # Dedup and sort
    weeks = sorted(set(weeks))
    print('Enriching %d week(s) with Cambridge content [provider=%s]...\n' % (len(weeks), provider))

    success = 0
    for w in weeks:
        print('── W%d ──' % w)
        ok = enrich_week(w, provider=provider, model=model,
                         dry_run=dry_run, no_validate=no_validate,
                         force_vocab=force_vocab, force_part3=force_part3)
        if ok:
            success += 1
        print()

    print('────────────────────────────────────────────────────')
    print('Done: %d/%d weeks enriched.' % (success, len(weeks)))


if __name__ == '__main__':
    main()
