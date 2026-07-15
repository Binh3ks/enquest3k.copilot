#!/usr/bin/env python3
"""
build_lesson_plans_from_docx.py
Parse W25-36 from the reference DOCX and inject lesson plans into all 5 app JSON files.
Following W28's golden-standard schema (including teacher_contents).

Usage:
  python3 build_lesson_plans_from_docx.py              # build all weeks in DOCX
  python3 build_lesson_plans_from_docx.py 29           # build only W29
  python3 build_lesson_plans_from_docx.py 29 30 31     # build W29, W30, W31

Source (single reference file — do NOT use per-week DOCX in lesson_plans/output/):
  Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/
      0. NEW_FINAL_Lesson plans_W25-36.docx

Teacher_contents schema (W28 standard):
  session: int
  listening_script: {speed_note: str, text: str, dictation: [str]}
  speaking_notes: str
  stem_extension: str
  in_class_speaking: str
  vc_answer_key: str
"""

import sys, json, os, re
from pathlib import Path

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT / 'scripts'))
import parse_docx_lessons as pml

REFERENCE_DOCX = ROOT / 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W25-36.docx'

# Output paths (same 5 files as update_lesson_in_app.py)
PUBLIC_JSON  = ROOT / 'public/data/lessonPlans.json'
PUBLIC_IDX   = ROOT / 'public/data/lessonPlans_index.json'
MCP_IDX      = ROOT / 'mcp-server/data/lessonPlans_index.json'
MCP_LESSONS  = ROOT / 'mcp-server/data/lessons'
PUB_LESSONS  = ROOT / 'public/data/lessons'

# ── Teacher contents extraction ───────────────────────────────────────────────

def _full_para(paras, idx):
    """Get the full text of a paragraph (not truncated)."""
    return paras[idx][0] if idx < len(paras) else ''


def extract_listening_from_sec6(paras, sec6, sec7_or_end, session_num):
    """
    Extract S{n} Listening Text and Dictation from SECTION 6.
    Handles 3 DOCX variants:
      A) Standard: one paragraph per S{n} in a dedicated SECTION 6
      B) Merged:   all sessions merged into one paragraph in SECTION 6
      C) Inline:   listening text embedded in PART 4 as (Teacher reads Audio Script aloud...)
    Returns dict matching W28 schema: {speed_note, text, dictation}
    """
    speed_note = 'Read aloud at a normal, clear pace (85 wpm). Pause 2–3 seconds between sentences. Read the full text twice before students answer questions.'
    text = ''
    dictation = []

    S_LISTEN = re.compile(r'S\s*%d\s+Listening\s+Text\s*:\s*(.+?)(?=S\s*\d+\s+Listening|S\s*\d+\s+Dictation|$)' % session_num, re.I | re.S)
    S_DICT   = re.compile(r'S\s*%d\s+Dictation[^:]*:\s*(.+?)(?=S\s*\d+\s+(Listening|Dictation)|$)' % session_num, re.I | re.S)
    SPEED_RE = re.compile(r'(speed|wpm|Tốc độ)', re.I)

    if sec6 is not None:
        # Collect all text from SECTION 6 into one big string (handles merged paragraphs)
        full_sec6_text = ''
        for i in range(sec6, sec7_or_end):
            t = _full_para(paras, i)
            if not t:
                continue
            if SPEED_RE.search(t) and not text:
                speed_note = t.strip()
            full_sec6_text += ' ' + t

        # Check if SECTION 6 is actually student worksheets (wrong section numbering in some weeks)
        is_worksheets = re.search(r'SECTION\s+\d+:\s*(STUDENT\s+WORKSHEETS|WEEK\s+\d+)', full_sec6_text[:100], re.I)

        if not is_worksheets:
            # Strategy A/B: parse from SECTION 6
            m = S_LISTEN.search(full_sec6_text)
            if m:
                text = m.group(1).strip()
            m2 = S_DICT.search(full_sec6_text)
            if m2:
                raw = m2.group(1).strip()
                sentences = re.findall(r'\d+\.\s*"?([^"0-9][^"]*?)"?\s*(?=\d+\.|$)', raw)
                if not sentences:
                    sentences = [s.strip().strip('"') for s in re.split(r'\s*\d+\.\s*', raw) if s.strip()]
                dictation = sentences

    # Strategy C: fallback — extract from PART 4 inline pattern
    # "PART 4: LISTENING PRACTICE [O] (Teacher reads Audio Script aloud at 85 wpm: "...")"
    # The sessions are ordered: S1=first, S2=second, S3=third PART 4 encountered
    if not text and sec6 is not None:
        # The sec6 range might be STUDENT WORKSHEETS — search the full week range
        pass  # fall through to inline search below

    return {
        'speed_note': speed_note,
        'text': text,
        'dictation': dictation,
    }


def extract_listening_inline(paras, wstart, wend, session_num):
    """
    Fallback: extract listening text from PART 4 inline pattern.
    Pattern: (Teacher reads Audio Script aloud at 85 wpm: "...")
    session_num-th PART 4 encountered = session_num's script.
    """
    INLINE_RE = re.compile(
        r'Teacher reads Audio Script aloud[^:]*:\s*"([^"]+)"', re.I | re.S
    )
    PART4_RE = re.compile(r'PART\s+4[:\s]|PART\s+3.*LISTENING', re.I)

    found = []
    for i in range(wstart, wend):
        t = _full_para(paras, i)
        if not t:
            continue
        m = INLINE_RE.search(t)
        if m:
            found.append(m.group(1).strip())

    if session_num <= len(found):
        text = found[session_num - 1]
        # Also try to extract dictation sentences embedded in the same or next paragraph
        dictation = []
        for i in range(wstart, wend):
            t = _full_para(paras, i)
            if not t:
                continue
            if re.search(r'Dictation.*sentence', t, re.I):
                parts = re.findall(r'\d+\.\s*"([^"]+)"', t)
                if not parts:
                    parts = [s.strip().strip('"') for s in re.split(r'\s*\d+\.\s*', t)[1:] if s.strip()]
                if parts:
                    dictation = parts
                    break
        return {
            'speed_note': 'Read aloud at a normal, clear pace (85 wpm). Pause 2–3 seconds between sentences. Read the full text twice before students answer questions.',
            'text': text,
            'dictation': dictation,
        }
    return {'speed_note': '', 'text': '', 'dictation': []}


def extract_speaking_checkpoint(paras, s_start, s_end):
    """
    Extract the SPEAKING CHECKPOINT section from a session.
    Returns formatted teacher guidance text.
    """
    CKPT_RE = re.compile(r'SPEAKING CHECKPOINT', re.I)
    STOP_RE = re.compile(r'^PART\s+[3456789]|^PART\s+[1-9]\d', re.I)

    ckpt_start = None
    for i in range(s_start, s_end):
        if CKPT_RE.search(_full_para(paras, i)):
            ckpt_start = i
            break

    if ckpt_start is None:
        return ''

    lines = ['SPEAKING CHECKPOINT — Teacher Guidance (do NOT share with students):']
    lines.append('')

    for i in range(ckpt_start + 1, s_end):
        t = _full_para(paras, i)
        if not t:
            continue
        if STOP_RE.match(t):
            break
        lines.append(t)

    return '\n'.join(lines)


def extract_stem_clil(paras, s_start, s_end):
    """
    Extract STEM/CLIL CONNECTION section from a session.
    Returns formatted teacher note string.
    """
    STEM_RE = re.compile(r'STEM/CLIL CONNECTION|STEM/CLIL\b', re.I)
    STOP_RE = re.compile(r'^PART\s+[789]|🔍\s+YouTube for teacher|PART\s+6:|PART\s+7:', re.I)

    stem_start = None
    for i in range(s_start, s_end):
        if STEM_RE.search(_full_para(paras, i)):
            stem_start = i
            break

    if stem_start is None:
        return ''

    lines = ['STEM/CLIL Extension Notes (teacher only):']
    lines.append('')

    for i in range(stem_start, s_end):
        t = _full_para(paras, i)
        if not t:
            continue
        if i > stem_start and STOP_RE.match(t):
            break
        lines.append(t)

    return '\n'.join(lines)


def extract_in_class_speaking(paras, s_start, s_end, session_num):
    """
    Extract Student A/B speaking prompts from the SPEAKING CHECKPOINT section
    and format as structured in-class speaking activities (teacher card).
    """
    CKPT_RE = re.compile(r'SPEAKING CHECKPOINT', re.I)
    STOP_RE = re.compile(r'^PART\s+[3-9]|^L3\s+—|^\[O\]', re.I)

    ckpt_start = None
    for i in range(s_start, s_end):
        if CKPT_RE.search(_full_para(paras, i)):
            ckpt_start = i
            break

    if ckpt_start is None:
        return ''

    # Collect Student A/B lines
    student_prompts = []
    l3_lines = []
    mode = 'ab'

    for i in range(ckpt_start + 1, s_end):
        t = _full_para(paras, i)
        if not t:
            continue
        if re.match(r'^PART\s+[3-9]', t, re.I):
            break
        if re.match(r'^L3\s+—|^\[O\]\s+L3', t, re.I):
            mode = 'l3'
            l3_lines.append(t)
            continue
        if mode == 'ab':
            student_prompts.append(t)
        else:
            l3_lines.append(t)

    lines = ['IN-CLASS SPEAKING ACTIVITIES — Session %d (teacher-led)' % session_num, '']

    if student_prompts:
        lines.append('Activity 1 — Pair Speaking (3–5 min, pairs):')
        for p in student_prompts:
            lines.append('  ' + p)
        lines.append('')

    if l3_lines:
        lines.append('Challenge Extension (L3 — for advanced/older students):')
        for p in l3_lines[:12]:
            lines.append('  ' + p)
        lines.append('')

    return '\n'.join(lines)


def extract_vc_answer_key(paras, s_start, s_end, session_num):
    """
    Extract VC (Video Challenge) answer key from the word/phrase bank.
    First option in each numbered group = the correct answer.
    Returns string like: "[1] answer [2] answer ..."
    """
    VC_RE  = re.compile(r'VIDEO CHALLENGE SCRIPT.*Session\s*%d' % session_num, re.I)
    STOP_RE = re.compile(r'^(SESSION|WEEK\s+\d+|SECTION)', re.I)

    vc_start = None
    for i in range(s_start, s_end):
        if VC_RE.search(_full_para(paras, i)):
            vc_start = i
            break

    if vc_start is None:
        return ''

    # Collect all word bank lines after the script
    bank_text = ''
    in_bank = False
    for i in range(vc_start + 1, s_end):
        t = _full_para(paras, i)
        if not t:
            continue
        if STOP_RE.match(t):
            break
        # Word/Phrase Bank lines often have "Bank" or start with [1] ... or contain "/"
        if re.search(r'Bank|Phrase Bank|Word Bank|Clause Bank', t, re.I):
            in_bank = True
            bank_text += ' ' + t  # include this line itself (bank may be inline)
            continue
        if in_bank or re.search(r'\[\d+\]\s*\(', t):
            bank_text += ' ' + t

    # Also check the VC script lines themselves for inline word banks
    if not bank_text:
        # Sometimes the entire bank is on one merged paragraph after the script
        for i in range(vc_start + 1, s_end):
            t = _full_para(paras, i)
            if not t:
                continue
            if STOP_RE.match(t):
                break
            if re.search(r'\[\d+\]\s*\([^)]+/', t):
                bank_text += ' ' + t

    if not bank_text:
        return ''

    # Extract numbered groups: [N] (option1 / option2 / ...)
    answers = {}
    for m in re.finditer(r'\[(\d+)\]\s*\(([^)]+?)\)', bank_text):
        n = int(m.group(1))
        options = [o.strip() for o in m.group(2).split('/')]
        if options:
            answers[n] = options[0]  # First option = correct answer

    if not answers:
        return ''

    parts = ['[%d] %s' % (k, answers[k]) for k in sorted(answers.keys())]
    return ' '.join(parts)


def extract_teacher_contents(paras, wstart, wend):
    """
    Build teacher_contents list (one entry per session) following W28 schema.
    """
    ss = pml.find_session_starts(paras, wstart, wend)

    # SECTION 6 boundaries
    sec6 = pml.find_section(paras, wstart, wend, r'SECTION\s+6')
    sec7 = pml.find_section(paras, (sec6 or wstart) + 1, wend, r'SECTION\s+7')

    # Detect if SECTION 6 is actually student worksheets (W35 style mis-numbering)
    if sec6 is not None:
        sec6_header = _full_para(paras, sec6)
        if re.search(r'STUDENT\s+WORKSHEETS|SESSION\s+3', sec6_header, re.I):
            sec6 = None  # treat as absent; use inline fallback

    sec6_end = sec7 or ((sec6 + 30) if sec6 else wstart)

    result = []

    for sn in [1, 2, 3]:
        s_start = ss.get(sn)
        if s_start is None:
            continue

        # Session end = start of next session, or SECTION 5 start
        next_sn = sn + 1
        s_end = ss.get(next_sn)
        if s_end is None:
            sec5 = pml.find_section(paras, s_start + 1, wend, r'SECTION\s+5')
            s_end = sec5 or sec6 or wend

        # listening_script: try SECTION 6 first, then inline PART 4 fallback
        ls = extract_listening_from_sec6(paras, sec6, sec6_end, sn)
        if not ls.get('text'):
            ls = extract_listening_inline(paras, wstart, wend, sn)

        spk  = extract_speaking_checkpoint(paras, s_start, s_end)
        stem = extract_stem_clil(paras, s_start, s_end)
        ics  = extract_in_class_speaking(paras, s_start, s_end, sn)
        vcak = extract_vc_answer_key(paras, s_start, s_end, sn)

        result.append({
            'session': sn,
            'listening_script': ls,
            'speaking_notes': spk,
            'stem_extension': stem,
            'in_class_speaking': ics,
            'vc_answer_key': vcak,
        })

    return result


# ── Pipe-vocab fallback (from update_lesson_in_app.py) ───────────────────────

def parse_pipe_vocab(content_lines):
    """Parse pipe-separated vocab rows from Section 3 plain text."""
    vocab = []
    for line in content_lines:
        if '|' not in line:
            continue
        parts = [p.strip() for p in line.split('|')]
        if len(parts) < 2:
            continue
        if parts[0].upper() in ('WORD', '') and 'VIETNAMESE' in ' '.join(parts).upper():
            continue
        if re.match(r'^\d+\.\d+', parts[0]) or parts[0].upper().startswith('WORD'):
            continue
        if not parts[0]:
            continue
        entry = {
            'Word': parts[0],
            'Vietnamese': parts[1] if len(parts) > 1 else '—',
            'Key Collocation(s)': parts[3] if len(parts) > 3 else (parts[2] if len(parts) > 2 else '—'),
            'Memory Trick': parts[4] if len(parts) > 4 else '—',
        }
        if entry['Word'].upper() in ('WORD', 'KEY VERB', 'EXAMPLE SENTENCE'):
            continue
        vocab.append(entry)
    return vocab


# ── Main build function ───────────────────────────────────────────────────────

def normalize_vocab_tiers(vocab_list):
    """
    Normalize vocab_tiers to W28's golden 4-field schema:
      {Word, Vietnamese, Key Collocation(s), Memory Trick}

    Reference DOCX has two table formats that need cleaning:
      Tier 1: [Word, Base, POS, Vietnamese, Key Collocation(s), Memory Trick, ☐]
              → keep the 4 needed fields, drop Base/POS/☐
      Tier 2: [Word, Simple English definition, Vietnamese, Key Collocation, Example...]
              → map 'Key Collocation' → 'Key Collocation(s)'
              → map 'Simple English definition' → 'Memory Trick' (prefixed)
    """
    out = []
    for v in vocab_list:
        if 'content' in v:
            # Raw fallback block — skip (handled by parse_pipe_vocab before this)
            out.append(v)
            continue
        word = v.get('Word', '').strip()
        if not word:
            continue

        # Key Collocation: handle both 'Key Collocation(s)' and 'Key Collocation'
        colloc = v.get('Key Collocation(s)') or v.get('Key Collocation') or '—'

        # Memory Trick: use explicit field, or derive from 'Simple English definition'
        mem = v.get('Memory Trick', '').strip()
        if not mem:
            defn = v.get('Simple English definition', '').strip()
            if defn:
                mem = 'Definition: ' + defn
            else:
                mem = '—'

        out.append({
            'Word': word,
            'Vietnamese': v.get('Vietnamese', '—').strip(),
            'Key Collocation(s)': colloc.strip() if colloc else '—',
            'Memory Trick': mem,
        })
    return out


def build_week(doc, paras, body_items, para_to_bi, week_num, wstart, wend):
    """Build complete lesson plan JSON for one week, following W28 schema."""
    print('  Processing W%d...' % week_num, end='', flush=True)

    # Base content using existing parser
    data = pml.process_week(doc, paras, body_items, para_to_bi, week_num, wstart, wend)

    # Clean unit_theme: remove trailing ═══ separator characters
    if data.get('unit_theme'):
        data['unit_theme'] = re.sub(r'\s*[═=─\-━]{3,}.*$', '', data['unit_theme']).strip()

    # Fix vocab_tiers: parse pipe-separated plain text if needed
    vt = data.get('vocab_tiers', [])
    if len(vt) == 1 and 'content' in vt[0]:
        parsed = parse_pipe_vocab(vt[0]['content'])
        if parsed:
            data['vocab_tiers'] = parsed
            vt = data['vocab_tiers']

    # Normalize vocab to W28 standard 4-field schema (strip Base/POS/☐, fix Tier 2 keys)
    data['vocab_tiers'] = normalize_vocab_tiers(vt)

    # Add teacher_contents (W28 schema)
    data['teacher_contents'] = extract_teacher_contents(paras, wstart, wend)

    n_sess = len(data['sessions'])
    n_voc  = len(data['vocab_tiers'])
    n_ak   = len(data['answer_key'])
    n_tc   = len(data['task_cards'])
    n_tcs  = len(data['teacher_contents'])
    print(' %d sessions | %d vocab | %d AK | %d TC | %d teacher_contents' % (
        n_sess, n_voc, n_ak, n_tc, n_tcs), flush=True)

    return data


def inject_week(week_num, data):
    """Write week data to all 5 required output files."""
    key = str(week_num)

    # 1. public/data/lessonPlans.json (monolithic)
    with open(PUBLIC_JSON, encoding='utf-8') as f:
        all_data = json.load(f)
    all_data[key] = data
    with open(PUBLIC_JSON, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)

    # 2. public/data/lessonPlans_index.json
    with open(PUBLIC_IDX, encoding='utf-8') as f:
        pub_idx = json.load(f)
    pub_idx[key] = {'week': week_num, 'unit_theme': data['unit_theme']}
    with open(PUBLIC_IDX, 'w', encoding='utf-8') as f:
        json.dump(pub_idx, f, ensure_ascii=False, indent=2)

    # 3. mcp-server/data/lessonPlans_index.json
    with open(MCP_IDX, encoding='utf-8') as f:
        mcp_idx = json.load(f)
    mcp_idx[key] = {'week': week_num, 'unit_theme': data['unit_theme']}
    with open(MCP_IDX, 'w', encoding='utf-8') as f:
        json.dump(mcp_idx, f, ensure_ascii=False, indent=2)

    # 4. mcp-server/data/lessons/W{N}.json
    MCP_LESSONS.mkdir(parents=True, exist_ok=True)
    with open(MCP_LESSONS / ('W%d.json' % week_num), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # 5. public/data/lessons/W{N}.json
    PUB_LESSONS.mkdir(parents=True, exist_ok=True)
    with open(PUB_LESSONS / ('W%d.json' % week_num), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def main():
    if not REFERENCE_DOCX.exists():
        print('ERROR: Reference DOCX not found: %s' % REFERENCE_DOCX)
        sys.exit(1)

    # Determine which weeks to build
    requested = [int(a) for a in sys.argv[1:] if a.isdigit()]

    print('Loading reference DOCX...')
    doc, paras, body_items, para_to_bi = pml.load_doc(str(REFERENCE_DOCX))
    ranges, order = pml.find_week_ranges(paras)
    print('  Weeks in DOCX: %s' % order)

    target_weeks = requested if requested else order
    # Skip W28 — it's already finalized manually
    target_weeks = [w for w in target_weeks if w in ranges]

    print('Building weeks: %s' % target_weeks)
    print()

    results = {}
    for wnum in target_weeks:
        wstart, wend = ranges[wnum]
        data = build_week(doc, paras, body_items, para_to_bi, wnum, wstart, wend)
        results[wnum] = data

    print()
    print('Injecting into app JSON files...')
    for wnum, data in results.items():
        inject_week(wnum, data)
        print('  W%d → 5 files updated' % wnum)

    print()
    print('Done! %d weeks built and injected.' % len(results))

    # Validation summary
    print()
    print('=== Validation ===')
    for wnum, data in results.items():
        tc = data.get('teacher_contents', [])
        critical = []  # fields that MUST be present
        optional = []  # fields that are sometimes absent in DOCX
        for s in tc:
            sn = s['session']
            if not s.get('listening_script', {}).get('text'):
                critical.append('W%d S%d: no listening_script.text' % (wnum, sn))
            if not s.get('vc_answer_key'):
                optional.append('W%d S%d: no vc_answer_key' % (wnum, sn))
        if critical:
            print('  ERROR: ' + '; '.join(critical))
        else:
            unit_theme = data.get('unit_theme', '?')
            n_tc = len(tc)
            opt_note = (' [missing: %s]' % ', '.join(optional)) if optional else ''
            print('  W%d ✓ — "%s" — %d teacher_contents sessions%s' % (wnum, unit_theme, n_tc, opt_note))


if __name__ == '__main__':
    main()
