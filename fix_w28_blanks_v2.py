"""
fix_w28_blanks_v2.py — Comprehensive blank expansion, Answer Key removal, Methodology update

Rules:
1. All word/short blanks: ___________ → ____________________ (20 underscores)
2. Write 3 times: each blank → ____________________   ____________________   ____________________
3. Sentence-production lines: split into [prompt, SENTENCE_BLANK (60 underscores)]
4. Standalone → ___ answer lines: expand in place to 60 underscores
5. Mastery vocab a. word: ___ | ___ → split into Present/Past lines
6. Remove ✍️ Answer Key from PART 9 Video Challenge (student worksheet)
7. Add methodology 2.5 In-Class Speaking Timing
8. Add 📋 GV cue line before SPEAKING CHECKPOINT in worksheet
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent

WORD = '_' * 20         # Single/short-phrase blank
SENT = '_' * 60         # Full-sentence blank
THREE = f'{"_"*22}   {"_"*22}   {"_"*22}'  # Write-3-times


# ── Blank classification helpers ──────────────────────────────────────────────

def _has_short_blank_at_end(line):
    """Line ends with 3-25 underscores (short blank needing expansion/split)."""
    return bool(re.search(r'_{3,25}\s*$', line))


def _is_standalone_arrow_blank(line):
    """Entire line is → followed by underscores (standalone answer slot)."""
    return bool(re.match(r'^→\s*_{5,}\s*$', line.strip()))


def _is_write3times(line):
    return '→ Write 3 times:' in line


def _is_sentence_producer(line):
    """This line asks for a SENTENCE-length answer (not just one word)."""
    patterns = [
        r'Write a sentence\b',
        r'Write 2 sentences',
        r'Write 3 sentences',
        r"Use '[^']+' in a sentence",
        r'My best sentence',
        r'\[O\] (?:Challenge|Extension|Stage\s*3)',
        r'Inference:',
        r'Dictation:\s+Listen and write',
        r'Rewrite the',
        r'If the .+, would',
        r'What would happen',
        r"Compare .+ using '",
        r'Write 3 sentences',
        r'What is the (lesson|main|best)',
    ]
    for p in patterns:
        if re.search(p, line, re.IGNORECASE):
            return True
    return False


def _is_l4_sentence_expansion(line):
    """'N. Base: X + Add: (Y) → ___' — L4 pattern."""
    return bool(re.match(r'^\d+\.\s+Base:.+→\s*_{5,25}\s*$', line))


def _is_homework_vocab_sentence(line):
    """'a. word (translation): ___' — write-a-sentence for this word."""
    return bool(re.match(r'^[a-j]\.\s+\S+.+\):\s*_{5,25}\s*$', line))


def _is_mastery_vocab_double(line):
    """'a. word: ___ | ___' — write present and past sentences."""
    return bool(re.match(r'^[a-p]\.\s+\S+.*:\s*_{5,}\s*\|\s*_{5,}\s*$', line))


def _is_error_correction_hw(line):
    """'N. "quoted error sentence." → ___' — write full corrected sentence."""
    # Has a quoted sentence ('' or '') followed by → ___
    return bool(re.search(r"'[^']{5,}'\s*→\s*_{5,25}\s*$", line))


def _is_wh_question_with_blank(line):
    """'What/Who/Why/How/Which...? → ___' — reading/listening comprehension."""
    return bool(re.match(r'^(Who|What|Why|How|When|Which|Where)\b.+\?\s*(→\s*)?_{5,25}\s*$', line))


def _is_grammar_use_sentence(line):
    """'N. Use "word" in a sentence...: ___' — grammar homework."""
    return bool(re.search(r"^\d+\.\s+Use\s+'[^']+'.+:\s*_{5,25}\s*$", line))


def _is_sentence_producer_ending(line):
    """Catch-all for lines ending with a blank that clearly need sentence space."""
    return (
        _is_sentence_producer(line)
        or _is_l4_sentence_expansion(line)
        or _is_homework_vocab_sentence(line)
        or _is_error_correction_hw(line)
        or _is_wh_question_with_blank(line)
        or _is_grammar_use_sentence(line)
    )


# ── Line transformer ───────────────────────────────────────────────────────────

def transform_line(line):
    """
    Returns a list of lines (may be 1 or more).
    All transformations are applied here.
    """
    if not line.strip():
        return [line]

    # ① Standalone → ___ answer blank → expand in place
    if _is_standalone_arrow_blank(line):
        return ['→ ' + SENT]

    # ② Write 3 times → expand each blank
    if _is_write3times(line):
        # Replace the three short blanks with THREE_TIMES
        transformed = re.sub(r'(_{5,25}\s*){3}', THREE, line, count=1)
        if transformed == line:
            # Fallback: replace all short blanks
            transformed = re.sub(r'_{5,25}', '_' * 22, line)
        return [transformed]

    # ③ Mastery vocab 'a. word: ___ | ___' → split into two lines
    if _is_mastery_vocab_double(line):
        label = re.sub(r':\s*_{5,}.*$', ':', line).rstrip()
        return [label, f'  Present: {SENT}', f'  Past:    {SENT}']

    # ④ L4 Sentence Expansion 'Base: X → ___' → split
    if _is_l4_sentence_expansion(line):
        prompt = re.sub(r'\s*→\s*_{3,25}\s*$', '', line)
        return [_expand_word_blanks(prompt), '→ ' + SENT]

    # ⑤ Homework vocab sentence 'a. word (trans): ___' → split
    if _is_homework_vocab_sentence(line):
        prompt = re.sub(r'\s*_{3,25}\s*$', '', line).rstrip()
        return [prompt, SENT]

    # ⑥ Other sentence-producer lines → split
    if _is_sentence_producer_ending(line) and _has_short_blank_at_end(line):
        prompt = re.sub(r'\s*_{3,25}\s*$', '', line).rstrip()
        # If prompt ends with →, move the arrow to be the prefix of the blank line
        if prompt.endswith('→'):
            prompt = prompt[:-1].rstrip()
            return [_expand_word_blanks(prompt), '→ ' + SENT]
        return [_expand_word_blanks(prompt), SENT]

    # ⑦ All other lines: expand short word blanks in place
    return [_expand_word_blanks(line)]


def _expand_word_blanks(line):
    """Expand 3-25 underscore runs to WORD width, preserve long blanks and T/F indicators."""
    # Don't touch already-long blanks
    if '__________________________________________' in line:
        return line
    # Keep T/F indicator short (just needs T or F)
    line = re.sub(r'→\s*_{3,25}\s*\(T/F\)', '→ ______ (T/F)', line)
    # Expand remaining short blanks (3+ underscores, covers VC script [1] ___ style)
    line = re.sub(r'_{3,25}', WORD, line)
    return line


# ── Content processor ─────────────────────────────────────────────────────────

def process_content(content):
    """Process a list of content lines — expand blanks, split sentence items."""
    result = []
    for line in content:
        result.extend(transform_line(line))
    return result


# ── Speaking Checkpoint cue injector ─────────────────────────────────────────

def inject_speaking_cues(content):
    """Add a teacher cue line before each SPEAKING CHECKPOINT."""
    result = []
    for line in content:
        if line.strip() == '⬛ SPEAKING CHECKPOINT':
            result.append('📋 GV: Xem Teacher\'s Contents → In-Class Speaking Activities để hướng dẫn chi tiết.')
        result.append(line)
    return result


# ── Answer Key extractor ──────────────────────────────────────────────────────

def extract_vc_answer_key(content):
    """Remove ✍️ Answer Key line from VC content. Returns (cleaned_content, key_str)."""
    cleaned = []
    key_str = None
    for line in content:
        # Match lines that start with the Answer Key marker (pen emoji variants)
        if re.match(r'^✍', line) and 'Answer Key' in line:
            key_str = line
        else:
            cleaned.append(line)
    return cleaned, key_str


# ── Methodology section 2.5 ───────────────────────────────────────────────────

METHODOLOGY_2_5 = {
    "title": "2.5 In-Class Speaking Activity Timing (Suggested Schedule)",
    "content": [
        "Each session has structured speaking activities that MUST be included. Full instructions are in Teacher's Contents → In-Class Speaking Activities.",
        "",
        "SESSION 1 (120 min):",
        "  ① After PART 2 Vocab Building [~30 min mark]: Transport Flash-Introduction (3 min)",
        "     Pairs: Student A names a transport word, Student B gives one sentence using it.",
        "  ② After PART 3 Sentence Building [~60 min mark]: Irregular Past Tense Chant (5 min)",
        "     Whole class: Teacher says base verb → students call out past form + sentence.",
        "  ③ Before PART 9 Homework briefing [~110 min mark]: Speed Translation Drill (2 min)",
        "     Rapid-fire pairs: Vietnamese → English for W28 vocab.",
        "",
        "SESSION 2 (120 min):",
        "  ① After PART 3 L2 Transformation [~45 min mark]: Describe & Guess transport (5 min)",
        "     Pairs: Student A describes a transport vehicle without naming it. Student B guesses.",
        "  ② After PART 3 L3 Error Correction [~70 min mark]: Comparison Chains (3 min)",
        "     Class chain: Student A says 'A train is faster than a bus.' Student B continues the chain.",
        "  ③ Wrap-up [~115 min mark]: Tortoise or Hare? Quick-fire (2 min)",
        "     Teacher names a transport — class calls out the character who would choose it.",
        "",
        "SESSION 3 (120 min):",
        "  ① After PART 1 Reading [~25 min mark]: Round-Robin Story Chain (5 min)",
        "     Groups of 4: Each student adds one sentence to retell the Modern Race story.",
        "  ② After PART 3 Sentence Building [~70 min mark]: Modern Race Debate (5 min)",
        "     Pairs: 'Which transport would you choose in the race and why?' (2-sentence answer each).",
        "  ③ End of lesson [~115 min mark]: Trophy Ceremony (3 min)",
        "     Whole class votes for the pair with the best speaking this week. Winner reads their sentences.",
        "",
        "Note: Timings are a guide. Teachers may adapt to class pace. Do NOT omit these activities — they are core to the spoken production requirement for the Cambridge Flyers Speaking standard.",
    ]
}


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    json_paths = [
        ROOT / 'mcp-server/data/lessons/W28.json',
        ROOT / 'public/data/lessons/W28.json',
    ]

    for json_path in json_paths:
        print(f'\nProcessing {json_path.name}...')
        with open(json_path, encoding='utf-8') as f:
            d = json.load(f)

        # Collect VC answer keys per real session number
        vc_keys = {}

        for key in ['sessions', 'sessions_2', 'sessions_5']:
            for session in d.get(key, []):
                sess_num = session.get('session', 0)
                for part in session.get('parts', []):
                    if not part.get('content'):
                        continue
                    title = part.get('title', '')

                    # Extract VC answer key from PART 9
                    if 'PART 9' in title and 'HOMEWORK' in title:
                        cleaned, key_text = extract_vc_answer_key(part['content'])
                        # Map to REAL session number based on content
                        if key_text:
                            # Determine which session this belongs to by scanning content
                            for line in cleaned:
                                m = re.search(r'Session\s+(\d)', line)
                                if m:
                                    real_s = int(m.group(1))
                                    if f's{real_s}' not in vc_keys:
                                        vc_keys[f's{real_s}'] = key_text.replace('✍️ Answer Key: ', '')
                                    break
                            else:
                                # Fallback: use session number from session dict
                                if f's{sess_num}' not in vc_keys:
                                    vc_keys[f's{sess_num}'] = key_text.replace('✍️ Answer Key: ', '')
                        part['content'] = inject_speaking_cues(process_content(cleaned))
                    else:
                        part['content'] = inject_speaking_cues(process_content(part['content']))

        # Update teacher_contents with VC answer keys
        for tc in d.get('teacher_contents', []):
            sess_num = tc.get('session', 0)
            key = vc_keys.get(f's{sess_num}')
            if key and not tc.get('vc_answer_key'):
                tc['vc_answer_key'] = key

        # Add methodology section 2.5 if not present
        methodology = d.get('methodology', [])
        has_25 = any(
            (item.get('title', '') if isinstance(item, dict) else '').startswith('2.5')
            for item in methodology
        )
        if not has_25:
            d['methodology'] = methodology + [METHODOLOGY_2_5]
            print('  ✓ Added methodology 2.5')

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
        print(f'  ✓ Saved ({json_path.name})')

    # Sync to lessonPlans.json
    lp_path = ROOT / 'public/data/lessonPlans.json'
    with open(lp_path, encoding='utf-8') as f:
        lp = json.load(f)
    with open(ROOT / 'mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
        d28 = json.load(f)
    if 'W28' in lp:
        lp['W28'] = d28
        with open(lp_path, 'w', encoding='utf-8') as f:
            json.dump(lp, f, ensure_ascii=False, indent=2)
        print('\n  ✓ lessonPlans.json synced')

    # Verification
    print('\n=== VERIFICATION ===')
    for key in ['sessions', 'sessions_2', 'sessions_5']:
        for s in d28.get(key, []):
            for p in s.get('parts', []):
                for line in p.get('content', []):
                    # Check for remaining short blanks (5-11 underscores, not part of longer runs)
                    m = re.findall(r'(?<![_])_{5,11}(?![_])', str(line))
                    if m:
                        print(f'  SHORT BLANK [{key}] S{s["session"]} {p["title"][:30]}: {str(line)[:80]}')

    print('\nVC Answer Keys collected:', list(vc_keys.keys()))
    print('teacher_contents vc_answer_key set for sessions:',
          [tc['session'] for tc in d28.get('teacher_contents', []) if tc.get('vc_answer_key')])
    print('\nDone!')


if __name__ == '__main__':
    main()
