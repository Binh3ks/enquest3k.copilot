#!/usr/bin/env python3
"""
pipeline/generate_ai_week.py
════════════════════════════════════════════════════════════════════════════════
WORKFLOW 2: Generate lesson plans for W54+ using AI (no DOCX reference).

This script uses an LLM (Anthropic Claude or OpenAI GPT) to generate new lesson
plan JSON for weeks that have no reference DOCX file (W54 and beyond).

The generated output is validated against the golden schema and injected into all
5 output files exactly like Workflow 1 (build_from_docx.py).

Requirements:
  pip install anthropic   (for Claude)
  pip install openai      (for GPT)

  Environment variables:
    ANTHROPIC_API_KEY     — for Claude (default)
    OPENAI_API_KEY        — for GPT (use --provider openai)

Syllabus context:
  Production_FINAL/1. FINAL MASS PRODUCTION/Syllabus_V5_PublicationReady.docx
  (read automatically if available; can be overridden with --syllabus-json)

Golden example:
  public/data/lessons/W28.json   (always used as few-shot example)

Usage:
  python3 pipeline/generate_ai_week.py 54           # generate W54
  python3 pipeline/generate_ai_week.py 54 55 56     # batch
  python3 pipeline/generate_ai_week.py 54-60        # range
  python3 pipeline/generate_ai_week.py --provider openai 54
  python3 pipeline/generate_ai_week.py --dry-run 54  # generate but don't write
  python3 pipeline/generate_ai_week.py --no-validate 54

Output:
  Same 5 files as Workflow 1 (see build_from_docx.py for full list)
"""

import sys, json, re, os
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

from build_lesson_plans_from_docx import inject_week as inject_all_5_files
from fix_w28_format import transform_week

GOLDEN_EXAMPLE_PATH = ROOT / 'public/data/lessons/W28.json'
SYLLABUS_DOCX = ROOT / 'Production_FINAL/1. FINAL MASS PRODUCTION/Syllabus_V5_PublicationReady.docx'
SYLLABUS_JSON_CACHE = ROOT / 'pipeline/syllabus_cache.json'

SLOT_LABELS = [
    'Slot 1 — Activate / Khởi động — Spiral, Reading & Vocab S1',
    'Slot 2 — Drill / Luyện tập — Listening, Error Correction & Writing S1',
    'Slot 3 — Bridge / Kết nối — Spiral, Reading & Vocab S2',
    'Slot 4 — Challenge / Thử thách — Listening, Error Correction & Writing S2',
    'Slot 5 — Perform / Biểu diễn — Error Correction, Writing & Task Cards S3',
]


# ── Syllabus loader ────────────────────────────────────────────────────────────

def load_syllabus_info(week_num):
    """Load theme/grammar/block info for a given week from syllabus cache or DOCX."""
    # Try JSON cache first
    if SYLLABUS_JSON_CACHE.exists():
        syllabus = json.loads(SYLLABUS_JSON_CACHE.read_text())
        key = str(week_num)
        if key in syllabus:
            return syllabus[key]

    # Try to parse DOCX (requires python-docx)
    if SYLLABUS_DOCX.exists():
        try:
            return _parse_syllabus_for_week(week_num)
        except Exception as e:
            print('  Warning: could not read syllabus DOCX (%s). Using defaults.' % e)

    # Fallback: minimal defaults
    block_letter = _estimate_block(week_num)
    return {
        'week': week_num,
        'block': block_letter,
        'theme': 'Theme for Week %d' % week_num,
        'grammar_focus': 'Grammar focus for Week %d' % week_num,
        'vocab_count': 10,
        'cambridge_level': 'Flyers',
    }


def _estimate_block(week_num):
    """Estimate block letter from week number (each block is ~8-12 weeks)."""
    if week_num <= 8:   return 'A'
    if week_num <= 16:  return 'A'
    if week_num <= 24:  return 'A'
    if week_num <= 32:  return 'B'
    if week_num <= 40:  return 'B'
    if week_num <= 48:  return 'C'
    return 'C'


def _parse_syllabus_for_week(week_num):
    """Parse Syllabus_V5 DOCX for week metadata."""
    from docx import Document
    doc = Document(str(SYLLABUS_DOCX))
    week_pat = re.compile(r'WEEK\s+%d\b' % week_num, re.I)
    theme = None
    grammar = None
    block = _estimate_block(week_num)
    for para in doc.paragraphs:
        t = para.text.strip()
        if week_pat.search(t):
            m = re.search(r'BLOCK\s+([A-Z])', t, re.I)
            if m: block = m.group(1).upper()
        if theme is None and re.search(r'theme|topic', t, re.I) and re.search(r'week\s+%d' % week_num, t, re.I):
            theme = t
        if grammar is None and re.search(r'grammar|tense|structure', t, re.I) and re.search(r'week\s+%d' % week_num, t, re.I):
            grammar = t
    return {
        'week': week_num,
        'block': block,
        'theme': theme or 'Theme for Week %d' % week_num,
        'grammar_focus': grammar or 'Grammar focus for Week %d' % week_num,
        'vocab_count': 10,
        'cambridge_level': 'Flyers',
    }


# ── Prompt builder ─────────────────────────────────────────────────────────────

def build_prompt(week_num, syllabus_info):
    """Build the LLM prompt for generating a week's lesson plan JSON."""
    golden = json.loads(GOLDEN_EXAMPLE_PATH.read_text(encoding='utf-8'))
    # Trim golden to reduce tokens — keep just schema shape
    golden_trimmed = _trim_golden(golden)

    theme = syllabus_info.get('theme', 'Theme for Week %d' % week_num)
    grammar = syllabus_info.get('grammar_focus', 'Grammar')
    block = syllabus_info.get('block', 'C')
    cambridge = syllabus_info.get('cambridge_level', 'Flyers')
    vocab_count = syllabus_info.get('vocab_count', 10)

    prompt = """You are an expert EFL curriculum designer creating lesson plan JSON for EngQuest 3000, a 3-year English program for Vietnamese primary school children.

## TASK
Generate a complete lesson plan JSON for **Week {week}** following EXACTLY the structure and field names shown in the golden example below.

## WEEK {week} CONTEXT
- Theme / Unit: {theme}
- Grammar focus: {grammar}
- Block: {block}
- Cambridge target level: {cambridge}
- Vocabulary: ~{vocab_count} words across 3 sessions

## GOLDEN EXAMPLE (W28 structure — follow this exactly)
```json
{golden}
```

## GENERATION RULES
1. All top-level keys must match the golden example exactly (week, title, unit_theme, quick_ref, vocab_tiers, sessions, sessions_5, sessions_2, teacher_contents, task_cards_by_session, answer_key_by_session, games, video_prompts, spark_talk)
2. `quick_ref.Block` must be a single letter: "{block}"
3. `quick_ref.Theme` field (NOT "Unit / Theme")
4. `vocab_tiers` entries must have exactly: Word, Vietnamese, Key Collocation(s), Memory Trick
5. Each session must have PART 1-9 (PART 6 STEM/CLIL can be omitted if not applicable)
6. `sessions_5` must have exactly 5 entries with session_label starting "Slot [1-5] —"
7. `teacher_contents` must have exactly 3 entries (one per session) each with: session, session_label, reading_passage, listening_script, grammar_notes, speaking_notes, stem_extension, in_class_speaking
8. `task_cards_by_session` keys must be "1", "2", "3"
9. `answer_key_by_session` keys must be "s1", "s2", "s3"
10. Vietnamese translations must be accurate
11. Stories must be age-appropriate (8-11 year olds), 50-80 words each
12. Grammar exercises must target the stated grammar focus
13. STEM/CLIL section must connect to the theme with a real-world science/math connection

## OUTPUT
Respond with ONLY the JSON object. No explanation, no markdown fences, no extra text.
""".format(
        week=week_num,
        theme=theme,
        grammar=grammar,
        block=block,
        cambridge=cambridge,
        vocab_count=vocab_count,
        golden=json.dumps(golden_trimmed, ensure_ascii=False, indent=2),
    )
    return prompt


def _trim_golden(golden):
    """Trim golden example to reduce token usage while preserving structure."""
    trimmed = {}
    for k, v in golden.items():
        if k == 'sessions':
            # Keep only first session with first 3 parts
            if v:
                s1 = dict(v[0])
                s1['parts'] = s1.get('parts', [])[:4]  # keep first 4 parts as example
                trimmed[k] = [s1, '... (2 more sessions with same structure)']
            else:
                trimmed[k] = v
        elif k == 'sessions_5':
            trimmed[k] = v[:2] + [{'...': '3 more Slot entries'}] if len(v) > 2 else v
        elif k == 'teacher_contents':
            trimmed[k] = v[:1] + [{'...': '2 more teacher_contents entries'}] if len(v) > 1 else v
        elif k == 'task_cards_by_session':
            # Keep just key structure
            trimmed[k] = {sk: sv[:1] if isinstance(sv, list) else sv for sk, sv in v.items()}
        elif k == 'answer_key_by_session':
            trimmed[k] = {sk: '...' for sk in v}
        elif k == 'games':
            trimmed[k] = v[:1] if isinstance(v, list) and len(v) > 1 else v
        elif k == 'vocab_tiers':
            trimmed[k] = v[:3] + [{'...': '%d more vocab entries' % (len(v)-3)}] if len(v) > 3 else v
        else:
            trimmed[k] = v
    return trimmed


# ── LLM callers ───────────────────────────────────────────────────────────────

def call_claude(prompt, model='claude-3-5-sonnet-20241022'):
    """Call Anthropic Claude API."""
    import anthropic
    client = anthropic.Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])
    message = client.messages.create(
        model=model,
        max_tokens=8192,
        messages=[{'role': 'user', 'content': prompt}],
    )
    return message.content[0].text


def call_openai(prompt, model='gpt-4o'):
    """Call OpenAI API."""
    from openai import OpenAI
    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    response = client.chat.completions.create(
        model=model,
        messages=[{'role': 'user', 'content': prompt}],
        max_tokens=8192,
        response_format={'type': 'json_object'},
    )
    return response.choices[0].message.content


def call_llm(prompt, provider='claude', model=None):
    """Dispatch to the appropriate LLM provider."""
    if provider == 'claude':
        if 'ANTHROPIC_API_KEY' not in os.environ:
            raise RuntimeError('ANTHROPIC_API_KEY not set. Export it or use --provider openai.')
        return call_claude(prompt, model or 'claude-3-5-sonnet-20241022')
    elif provider == 'openai':
        if 'OPENAI_API_KEY' not in os.environ:
            raise RuntimeError('OPENAI_API_KEY not set.')
        return call_openai(prompt, model or 'gpt-4o')
    else:
        raise ValueError('Unknown provider: %s (use claude or openai)' % provider)


def parse_json_from_response(text):
    """Extract JSON from LLM response (handle code fences if present)."""
    text = text.strip()
    # Strip markdown code fences
    text = re.sub(r'^```(?:json)?\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    return json.loads(text)


# ── Main pipeline ──────────────────────────────────────────────────────────────

def generate_single_week(week_num, provider='claude', model=None, dry_run=False):
    """Generate + validate + inject one week using AI."""

    print('  W%d: loading syllabus context...' % week_num, end='', flush=True)
    syllabus_info = load_syllabus_info(week_num)
    print(' theme="%s"' % syllabus_info.get('theme', '?')[:40])

    print('  W%d: building prompt...' % week_num, end='', flush=True)
    prompt = build_prompt(week_num, syllabus_info)
    print(' %d chars' % len(prompt))

    print('  W%d: calling %s...' % (week_num, provider), end='', flush=True)
    raw_response = call_llm(prompt, provider=provider, model=model)
    print(' %d chars response' % len(raw_response))

    print('  W%d: parsing JSON...' % week_num, end='', flush=True)
    data = parse_json_from_response(raw_response)
    print(' ok')

    # Ensure week number is correct
    data['week'] = week_num

    # Apply transform to enforce W28 golden format (slot labels, etc.)
    print('  W%d: applying golden-format transform...' % week_num, end='', flush=True)
    data = transform_week(week_num, data)
    print(' ok')

    n_sess = len(data.get('sessions', []))
    n_voc  = len(data.get('vocab_tiers', []))
    n_tc   = len(data.get('teacher_contents', []))
    n_s5   = len(data.get('sessions_5', []))
    print('  W%d ▶ %d sessions | %d vocab | %d teacher_contents | %d slots' % (
        week_num, n_sess, n_voc, n_tc, n_s5))

    if dry_run:
        print('  W%d [DRY RUN] — not writing files' % week_num)
        # Save to temp file for inspection
        tmp = ROOT / ('_ai_gen_W%d.json' % week_num)
        tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2))
        print('  W%d [DRY RUN] saved to %s' % (week_num, tmp.name))
        return data

    # Inject to all 5 files
    inject_all_5_files(week_num, data)

    # Generate Lesson Plan DOCX (W28 golden standard format)
    try:
        from pipeline.gen_lp_docx import generate_lp_docx
        lp_path = generate_lp_docx(week_num)
        print('  W%d [DOCX] → %s' % (week_num, lp_path.name))
    except Exception as e:
        print('  W%d [DOCX] warning: could not generate DOCX (%s)' % (week_num, e))

    return data


def parse_week_args(args):
    """Parse CLI args into sorted list of week numbers."""
    weeks = set()
    for arg in args:
        m = re.match(r'^(\d+)-(\d+)$', arg)
        if m:
            weeks.update(range(int(m.group(1)), int(m.group(2)) + 1))
        elif arg.isdigit():
            weeks.add(int(arg))
    return sorted(weeks)


def main():
    args = sys.argv[1:]
    dry_run = '--dry-run' in args
    no_validate = '--no-validate' in args
    args = [a for a in args if a not in ('--dry-run', '--no-validate')]

    # --provider <name>
    provider = 'claude'
    if '--provider' in args:
        idx = args.index('--provider')
        provider = args[idx + 1]
        args = args[:idx] + args[idx + 2:]

    # --model <name>
    model = None
    if '--model' in args:
        idx = args.index('--model')
        model = args[idx + 1]
        args = args[:idx] + args[idx + 2:]

    weeks = parse_week_args(args)
    if not weeks:
        print('Usage: python3 pipeline/generate_ai_week.py [--provider claude|openai] [--dry-run] WEEK [WEEK...]')
        print('  WEEK can be a number (54) or range (54-60)')
        print()
        print('Environment variables:')
        print('  ANTHROPIC_API_KEY   — for Claude (default)')
        print('  OPENAI_API_KEY      — for GPT')
        sys.exit(1)

    # Only W54+ makes sense (W01-53 should use build_from_docx.py)
    docx_weeks = [w for w in weeks if w <= 53]
    if docx_weeks:
        print('WARNING: weeks %s have DOCX references — use pipeline/build_from_docx.py instead.' % docx_weeks)
        weeks = [w for w in weeks if w > 53]
        if not weeks:
            sys.exit(1)

    print('Generating %d week(s) using %s: W%s...' % (
        len(weeks), provider, ', W'.join(str(w) for w in weeks[:5])))
    if len(weeks) > 5:
        print('  (and %d more)' % (len(weeks) - 5))
    print()

    success = []
    failures = []

    for week_num in weeks:
        try:
            generate_single_week(week_num, provider=provider, model=model, dry_run=dry_run)
            success.append(week_num)
        except Exception as e:
            import traceback
            print('  W%d ✗ ERROR: %s' % (week_num, e))
            traceback.print_exc()
            failures.append(week_num)

    print()
    print('─' * 60)
    print('Generated: %d/%d weeks' % (len(success), len(weeks)))
    if failures:
        print('FAILED: W%s' % ', W'.join(str(w) for w in failures))

    if not no_validate and not dry_run and success:
        print()
        print('Running validation...')
        from pipeline.validate_lesson_plan import validate_week
        val_pass, val_fail = [], []
        for wn in success:
            r = validate_week(wn)
            (val_pass if r.ok else val_fail).append(wn)
        print('Validation: %d/%d pass' % (len(val_pass), len(success)))
        if val_fail:
            print('Validation FAILED: W%s' % ', W'.join(str(w) for w in val_fail))
            sys.exit(1)

    if failures:
        sys.exit(1)


if __name__ == '__main__':
    main()
