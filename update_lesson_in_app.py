#!/usr/bin/env python3
"""
update_lesson_in_app.py
Parse a rebuilt week DOCX and inject it into the app's JSON data files.

Usage:
  python3 update_lesson_in_app.py 28
  python3 update_lesson_in_app.py 29   (once rebuild_w29.py is done)

What it updates:
  - public/data/lessonPlans.json          (monolithic, lazy-loaded fallback)
  - public/data/lessonPlans_index.json    (front-end index)
  - mcp-server/data/lessonPlans_index.json
  - mcp-server/data/lessons/W{N}.json    (authenticated per-week file)
"""
import sys, json, os, re
from pathlib import Path

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT / 'scripts'))
import parse_docx_lessons as pml

LESSON_DOCX_DIR = ROOT / 'Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/lesson_plans/output'

# ── Output paths ──────────────────────────────────────────────────────────────
PUBLIC_JSON   = ROOT / 'public/data/lessonPlans.json'
PUBLIC_IDX    = ROOT / 'public/data/lessonPlans_index.json'
MCP_IDX       = ROOT / 'mcp-server/data/lessonPlans_index.json'
MCP_LESSONS   = ROOT / 'mcp-server/data/lessons'


def parse_pipe_vocab(content_lines):
    """
    Parse pipe-separated vocab rows from Section 3 plain text.
    Expected format:  WORD | VIETNAMESE | PART OF SPEECH | KEY COLLOCATION | MEMORY TRICK
    Returns list of {Word, Vietnamese, Key Collocation(s), Memory Trick} dicts.
    """
    vocab = []
    header_found = False
    for line in content_lines:
        if '|' not in line:
            continue
        parts = [p.strip() for p in line.split('|')]
        if len(parts) < 2:
            continue
        # Detect header row
        if parts[0].upper() in ('WORD', '') and 'VIETNAMESE' in ' '.join(parts).upper():
            header_found = True
            continue
        # Skip section sub-headers like "3.1 Tier 1 —..."  or  "3.2 Tier 2 —..."
        if re.match(r'^\d+\.\d+', parts[0]) or parts[0].upper().startswith('WORD'):
            continue
        # Must have at least a word
        if not parts[0]:
            continue
        entry = {
            'Word': parts[0],
            'Vietnamese': parts[1] if len(parts) > 1 else '—',
            'Key Collocation(s)': parts[3] if len(parts) > 3 else (parts[2] if len(parts) > 2 else '—'),
            'Memory Trick': parts[4] if len(parts) > 4 else '—',
        }
        # Skip if Word looks like a header keyword
        if entry['Word'].upper() in ('WORD', 'KEY VERB', 'EXAMPLE SENTENCE'):
            continue
        vocab.append(entry)
    return vocab


def update_week(week_num: int):
    docx_path = LESSON_DOCX_DIR / f'W{week_num}_Lesson_Plan.docx'
    if not docx_path.exists():
        print(f'ERROR: {docx_path} not found')
        return False

    print(f'Parsing W{week_num} from {docx_path.name}...')
    doc, paras, body_items, para_to_bi = pml.load_doc(str(docx_path))
    ranges, order = pml.find_week_ranges(paras)

    if week_num not in ranges:
        print(f'ERROR: Week {week_num} not found in DOCX (found weeks: {order})')
        return False

    wstart, wend = ranges[week_num]
    data = pml.process_week(doc, paras, body_items, para_to_bi, week_num, wstart, wend)

    # ── Fix vocab_tiers: parse pipe-separated plain text ─────────────────────
    vt = data.get('vocab_tiers', [])
    if len(vt) == 1 and 'content' in vt[0]:
        # Fallback format — parse pipe text
        parsed = parse_pipe_vocab(vt[0]['content'])
        if parsed:
            data['vocab_tiers'] = parsed
            print(f'  vocab_tiers: parsed {len(parsed)} words from pipe text')
        else:
            print(f'  vocab_tiers: no pipe-format words found, keeping raw text block')
    else:
        print(f'  vocab_tiers: {len(vt)} structured words from tables')

    # ── Summary ───────────────────────────────────────────────────────────────
    n_sess  = len(data['sessions'])
    n_vocab = len(data['vocab_tiers'])
    n_ak    = len(data['answer_key'])
    n_tc    = len(data['task_cards'])
    n_vp    = len(data.get('video_prompts', {}))
    print(f'  {n_sess} sessions | {n_vocab} vocab | {n_ak} AK lines | {n_tc} TC lines | {n_vp} video prompt sets')

    key = str(week_num)

    # ── 1. public/data/lessonPlans.json ──────────────────────────────────────
    print(f'  Updating {PUBLIC_JSON.name}...')
    with open(PUBLIC_JSON, encoding='utf-8') as f:
        all_data = json.load(f)
    all_data[key] = data
    with open(PUBLIC_JSON, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)

    # ── 2. public/data/lessonPlans_index.json ────────────────────────────────
    print(f'  Updating {PUBLIC_IDX.name}...')
    with open(PUBLIC_IDX, encoding='utf-8') as f:
        pub_idx = json.load(f)
    pub_idx[key] = {'week': week_num, 'unit_theme': data['unit_theme']}
    with open(PUBLIC_IDX, 'w', encoding='utf-8') as f:
        json.dump(pub_idx, f, ensure_ascii=False, indent=2)

    # ── 3. mcp-server/data/lessonPlans_index.json ────────────────────────────
    print(f'  Updating mcp-server lessonPlans_index.json...')
    with open(MCP_IDX, encoding='utf-8') as f:
        mcp_idx = json.load(f)
    mcp_idx[key] = {'week': week_num, 'unit_theme': data['unit_theme']}
    with open(MCP_IDX, 'w', encoding='utf-8') as f:
        json.dump(mcp_idx, f, ensure_ascii=False, indent=2)

    # ── 4. mcp-server/data/lessons/W{N}.json ─────────────────────────────────
    MCP_LESSONS.mkdir(parents=True, exist_ok=True)
    week_file = MCP_LESSONS / f'W{week_num}.json'
    print(f'  Writing {week_file.name}...')
    with open(week_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # ── 5. public/data/lessons/W{N}.json (fallback for dev without API) ──────
    pub_lessons = ROOT / 'public/data/lessons'
    pub_lessons.mkdir(parents=True, exist_ok=True)
    pub_week_file = pub_lessons / f'W{week_num}.json'
    print(f'  Writing public/data/lessons/{pub_week_file.name}...')
    with open(pub_week_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'\nDone! W{week_num} injected into app successfully.')
    return True


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python3 update_lesson_in_app.py <week_number>')
        print('Example: python3 update_lesson_in_app.py 28')
        sys.exit(1)

    week = int(sys.argv[1])
    ok = update_week(week)
    sys.exit(0 if ok else 1)
