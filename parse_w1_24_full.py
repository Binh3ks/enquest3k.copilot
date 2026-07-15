#!/usr/bin/env python3
"""
Full parser for W01-24 docx → individual W{n}.json + lessonPlans.json + indexes
Extracts: quick_ref, methodology, vocab_tiers, sessions (with session_label),
          answer_key, answer_key_by_session, task_cards, task_cards_by_session,
          video_prompts, games (placeholder)
"""
import docx, re, json, os

DOCX = "Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W01-24.docx"
WNS  = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

# ─── helpers ──────────────────────────────────────────────────────────────────

def para_text(el):
    """Get full text of a <w:p> element."""
    return ''.join(t.text or '' for t in el.findall(f'.//{{{WNS}}}t'))

def table_rows(el):
    """Return list of list-of-str for a <w:tbl> element."""
    rows = []
    for tr in el.findall(f'.//{{{WNS}}}tr'):
        cells = []
        for tc in tr.findall(f'{{{WNS}}}tc'):
            cell_text = ''.join(t.text or '' for t in tc.findall(f'.//{{{WNS}}}t')).strip()
            cells.append(cell_text)
        rows.append(cells)
    return rows

# ─── Section extractors ───────────────────────────────────────────────────────

def extract_quick_ref(items):
    """items = [(tag, data)] from one week block; return dict."""
    qr = {}
    in_sec = False
    for tag, data in items:
        if tag == 'p':
            t = data.strip()
            if re.match(r'^SECTION 1:', t):
                in_sec = True
                continue
            if in_sec and re.match(r'^SECTION \d+:', t):
                break
        elif tag == 'tbl' and in_sec:
            rows = data
            if rows and len(rows[0]) >= 2:
                # Category/Details table
                if rows[0][0].lower() in ('category', 'categories'):
                    for row in rows[1:]:
                        if len(row) >= 2 and row[0] and row[1]:
                            qr[row[0]] = row[1]
                    break
    return qr


def extract_methodology(items):
    """Return list of {title, content[]} from SECTION 2."""
    method = []
    in_sec = False
    cur_title = None
    cur_lines = []
    for tag, data in items:
        if tag == 'p':
            t = data.strip()
            if re.match(r'^SECTION 2:', t):
                in_sec = True
                continue
            if in_sec and re.match(r'^SECTION \d+:', t):
                break
            if not in_sec:
                continue
            # Sub-section headers like "2.1 ..." or "2.2 ..."
            if re.match(r'^2\.\d[\s:]', t):
                if cur_title:
                    method.append({'title': cur_title, 'content': cur_lines})
                cur_title = t
                cur_lines = []
            elif cur_title and t:
                cur_lines.append(t)
    if cur_title:
        method.append({'title': cur_title, 'content': cur_lines})
    return method


def extract_vocab_tiers(items):
    """Return list of vocab dicts from SECTION 3 Tier 1 table."""
    vocab = []
    in_sec = False
    for tag, data in items:
        if tag == 'p':
            t = data.strip()
            if re.match(r'^SECTION 3:', t):
                in_sec = True
                continue
            if in_sec and re.match(r'^SECTION \d+:', t):
                break
        elif tag == 'tbl' and in_sec:
            rows = data
            if not rows:
                continue
            headers = [c.strip() for c in rows[0]]
            # Only Tier 1 table (has "Word", "Vietnamese", "Memory Trick")
            if 'Word' in headers and 'Vietnamese' in headers and 'Memory Trick' in headers:
                for row in rows[1:]:
                    if len(row) >= len(headers) and row[0]:
                        entry = {headers[i]: row[i] for i in range(len(headers))}
                        vocab.append(entry)
                break  # only first matching table
    return vocab


def extract_answer_key(items):
    """Return flat list of strings + by_session dict."""
    all_lines = []
    by_session = {'s1': [], 's2': [], 's3': []}
    in_sec = False
    cur_sess = None
    for tag, data in items:
        if tag != 'p':
            continue
        t = data.strip()
        if re.match(r'^SECTION [89]:', t) or re.match(r'^SECTION 10:', t):
            if 'ANSWER' in t.upper():
                in_sec = True
                continue
            elif in_sec:
                break
        if re.match(r'^APPENDIX', t) and in_sec:
            break
        if not in_sec or not t:
            continue
        # Detect session header
        m = re.match(r'^S(\d)\s+ANSWER\s+KEY', t, re.IGNORECASE)
        if m:
            cur_sess = f's{m.group(1)}'
            all_lines.append(t)
            continue
        # Skip parenthetical notes only
        if re.match(r'^\(Giáo viên', t) or re.match(r'^\(Teacher', t):
            continue
        all_lines.append(t)
        if cur_sess and cur_sess in by_session:
            by_session[cur_sess].append(t)
    return all_lines, by_session


def extract_task_cards(items):
    """Return flat list + by_session dict."""
    all_lines = []
    by_session = {1: [], 2: [], 3: []}
    in_sec = False
    cur_sess = None
    for tag, data in items:
        if tag != 'p':
            continue
        t = data.strip()
        if re.match(r'^SECTION 8:', t):
            in_sec = True
            continue
        if in_sec and re.match(r'^SECTION \d+:', t):
            break
        if not in_sec or not t:
            continue
        # Detect session task header
        m = re.match(r'^S(\d)\s+Task\s*[—-]', t, re.IGNORECASE)
        if m:
            cur_sess = int(m.group(1))
        all_lines.append(t)
        if cur_sess and cur_sess in by_session:
            by_session[cur_sess].append(t)
    return all_lines, by_session


def extract_video_prompts(items):
    """Return {chanting: [{title, script}], shadowing_s2: [...], shadowing_s3: [...]}"""
    result = {'chanting': [], 'shadowing': []}
    in_app = False
    cur_section = None
    cur_title = None
    cur_lines = []

    for tag, data in items:
        if tag != 'p':
            continue
        t = data.strip()
        if re.match(r'^APPENDIX', t):
            in_app = True
            continue
        if not in_app or not t:
            continue

        # Section headers
        chant_m = re.match(r'^🎵\s*(CHANTING VIDEO.*)', t)
        shadow_m = re.match(r'^🎤\s*(SHADOWING VIDEO.*)', t)

        if chant_m or shadow_m:
            # Save previous
            if cur_title and cur_lines:
                entry = {'title': cur_title, 'script': '\n'.join(cur_lines)}
                if cur_section == 'chanting':
                    result['chanting'].append(entry)
                else:
                    result['shadowing'].append(entry)
            cur_title = chant_m.group(1) if chant_m else shadow_m.group(1)
            cur_section = 'chanting' if chant_m else 'shadowing'
            cur_lines = []
        elif cur_section and re.match(r'^\[W\d+\.\w+', t):
            cur_lines.append(t)
        # Skip production notes
        elif re.match(r'^\(Teacher production', t) or re.match(r'^\(Giáo viên', t):
            continue

    if cur_title and cur_lines:
        entry = {'title': cur_title, 'script': '\n'.join(cur_lines)}
        if cur_section == 'chanting':
            result['chanting'].append(entry)
        else:
            result['shadowing'].append(entry)

    return result


# ─── Session parser ───────────────────────────────────────────────────────────

SKIP_PATTERNS = [
    r'^═+$', r'^══', r'^SESSION \d+ WORKSHEET$',
    r'^TEACHER CONTENT PACK', r'^Integrated English Program',
    r'^\[OLDER ONLY VERSION\]$',
]

def should_skip(t):
    for p in SKIP_PATTERNS:
        if re.match(p, t):
            return True
    return False

def is_part_header(t):
    return (re.match(r'^SPIRAL REVIEW', t) or
            re.match(r'^PART \d+:', t) or
            re.match(r'^📚 WEEK \d+', t))

def build_part(title, content):
    clean = []
    if re.match(r'^PART 1:', title):
        for line in content:
            stripped = re.sub(r'^Title:\s*["\']?', '', line).rstrip('"\'')
            clean.append(stripped)
        return {'title': title, 'content': clean}
    elif re.match(r'^PART 9:', title):
        new_title = title if 'HOMEWORK' in title.upper() else title.replace('PART 9:', 'PART 9: HOMEWORK')
        return {'title': new_title, 'content': list(content)}
    else:
        return {'title': title, 'content': list(content)}

def parse_session_items(paras):
    """paras = list of (tag, str) tuples for one session block. Returns parts list."""
    parts = []
    current_title = None
    current_content = []
    in_video = False

    for tag, data in paras:
        if tag != 'p':
            continue
        line = data.strip()
        if should_skip(line):
            continue

        if re.match(r'^🎥', line):
            in_video = True
            if current_title and re.match(r'^PART 9:', current_title):
                current_content.append(line)
                continue
        elif in_video and current_title and re.match(r'^PART 9:', current_title):
            current_content.append(line)
            continue

        if is_part_header(line):
            if current_title is not None:
                parts.append(build_part(current_title, current_content))
            current_title = line
            current_content = []
            in_video = False
        else:
            if current_title is not None:
                if re.match(r'^📚 WEEK \d+', current_title):
                    if 'Name:' in line:
                        current_content.append(line)
                else:
                    current_content.append(line)

    if current_title is not None:
        parts.append(build_part(current_title, current_content))
    return parts


# ─── Main parser ──────────────────────────────────────────────────────────────

def parse_doc(path):
    doc = docx.Document(path)

    # Build ordered list of (tag, data) — 'p' or 'tbl'
    body_items = []
    for el in doc.element.body:
        tag = el.tag.split('}')[1] if '}' in el.tag else el.tag
        if tag == 'p':
            body_items.append(('p', para_text(el)))
        elif tag == 'tbl':
            body_items.append(('tbl', table_rows(el)))

    # Find week boundaries by "TEACHER CONTENT PACK — WEEK N" paragraphs
    week_starts = []
    for i, (tag, data) in enumerate(body_items):
        if tag == 'p':
            m = re.match(r'^TEACHER CONTENT PACK.*?WEEK\s+(\d+)', data)
            if m:
                week_starts.append((i, int(m.group(1))))

    result = {}

    for wi, (wstart, wnum) in enumerate(week_starts):
        wend = week_starts[wi + 1][0] if wi + 1 < len(week_starts) else len(body_items)
        week_items = body_items[wstart:wend]

        # unit_theme
        unit_theme = ''
        for tag, data in week_items[:15]:
            if tag == 'p':
                m = re.match(r'^Unit\s+\d+:\s+(.+)', data)
                if m:
                    unit_theme = m.group(1).strip()
                    break

        # quick_ref
        quick_ref = extract_quick_ref(week_items)

        # methodology
        methodology = extract_methodology(week_items)

        # vocab_tiers
        vocab_tiers = extract_vocab_tiers(week_items)

        # answer_key
        answer_key, answer_key_by_session = extract_answer_key(week_items)

        # task_cards
        task_cards, task_cards_by_session = extract_task_cards(week_items)

        # video_prompts
        video_prompts = extract_video_prompts(week_items)

        # sessions — find session blocks by SECTION 4 + session markers
        # Find all "📚 WEEK N | SESSION S" paragraphs
        sess_marker_idx = []
        for i, (tag, data) in enumerate(week_items):
            if tag == 'p' and re.match(r'^📚 WEEK \d+ \| SESSION', data):
                sess_marker_idx.append(i)

        # Find end of sessions (SECTION 5 or later)
        sec5_idx = len(week_items)
        for i, (tag, data) in enumerate(week_items):
            if tag == 'p' and re.match(r'^SECTION [5-9]:', data):
                sec5_idx = i
                break

        sessions = []
        for si, sstart in enumerate(sess_marker_idx):
            send = sess_marker_idx[si + 1] if si + 1 < len(sess_marker_idx) else sec5_idx
            sess_items = week_items[sstart:send]

            header_text = sess_items[0][1] if sess_items else ''
            m = re.match(r'^📚 WEEK (\d+) \| SESSION (\d+) \| (BLOCK \w+)', header_text)
            sess_num = int(m.group(2)) if m else si + 1
            block = m.group(3) if m else ''

            # Determine session label based on type: S1=Chanting, S2=Shadowing, S3=Production
            sess_labels = {1: 'Chanting (S1)', 2: 'Shadowing (S2)', 3: 'Production (S3)'}
            session_label = f"{sess_labels.get(sess_num, f'Session {sess_num}')} — {unit_theme}"

            parts = parse_session_items(sess_items)
            sessions.append({
                'session': sess_num,
                'session_label': session_label,
                'parts': parts
            })

        # Simple placeholder games (3 per week, based on unit_theme)
        # These match the W25+ games structure
        games = [
            {
                'id': f'w{wnum}_g1',
                'name': 'Vocab Slam',
                'type': 'Vocabulary',
                'duration': '10–12 min',
                'players': '2–4 per group',
                'session_fit': 'All sessions — best after vocab intro (Part 2)',
                'materials': f'Vocab flashcards W{wnum} — teacher-created',
                'instructions': [
                    'Round 1: Teacher calls a Vietnamese meaning — first student to say the English word AND use it in a sentence wins the card.',
                    'Round 2: Reverse — teacher calls the English word, student gives Vietnamese and a sentence.',
                    'Round 3 (extension): Student-to-student across groups — one student is the caller.'
                ]
            },
            {
                'id': f'w{wnum}_g2',
                'name': 'Error Hunt',
                'type': 'Grammar',
                'duration': '8–10 min',
                'players': 'Whole class',
                'session_fit': 'Session 2 or 3 — after Part 3 sentence building',
                'materials': 'Whiteboard or projected sentences with deliberate errors',
                'instructions': [
                    'Teacher writes 5 sentences on the board — some correct, some with errors from this week\'s grammar focus.',
                    'Students mark each sentence as Correct (✓) or Error (✗) on their paper.',
                    'Class discussion: students explain the error and provide the corrected sentence.',
                    'Award 1 point per correct identification + 1 point for a well-explained correction.'
                ]
            },
            {
                'id': f'w{wnum}_g3',
                'name': 'Quick Production Race',
                'type': 'Speaking / Writing',
                'duration': '6–8 min',
                'players': 'Teams of 3–4',
                'session_fit': 'Session 3 — consolidation phase',
                'materials': 'Mini-whiteboards or paper',
                'instructions': [
                    'Teacher gives a prompt word from this week\'s vocab.',
                    'Each team writes a complete, grammatically correct sentence using that word.',
                    'First team to hold up a correct sentence wins 2 points. Second team: 1 point.',
                    'After 5 rounds, the team with the most points wins.'
                ]
            }
        ]

        result[str(wnum)] = {
            'week': wnum,
            'unit_theme': unit_theme,
            'quick_ref': quick_ref,
            'methodology': methodology,
            'vocab_tiers': vocab_tiers,
            'sessions': sessions,
            'sessions_2': [],
            'sessions_5': [],
            'answer_key': answer_key,
            'answer_key_by_session': answer_key_by_session,
            'task_cards': task_cards,
            'task_cards_by_session': task_cards_by_session,
            'games': games,
            'video_prompts': video_prompts,
        }

    return result


# ─── Run ──────────────────────────────────────────────────────────────────────

print("Parsing docx...")
new_weeks = parse_doc(DOCX)
print(f"Parsed {len(new_weeks)} weeks: {sorted(int(k) for k in new_weeks.keys())}")

for wk in sorted(int(k) for k in new_weeks.keys()):
    d = new_weeks[str(wk)]
    nsess = len(d['sessions'])
    nparts = sum(len(s['parts']) for s in d['sessions'])
    nvocab = len(d['vocab_tiers'])
    nak = len(d['answer_key'])
    ntc = len(d['task_cards'])
    nvp_c = len(d['video_prompts'].get('chanting', []))
    nvp_s = len(d['video_prompts'].get('shadowing', []))
    has_qr = bool(d['quick_ref'])
    has_method = bool(d['methodology'])
    print(f"  W{wk}: sess={nsess} parts={nparts} vocab={nvocab} ak={nak} tc={ntc} "
          f"vp=chant:{nvp_c}/shadow:{nvp_s} qr={has_qr} method={has_method}")

# Write individual files
out_dir = 'mcp-server/data/lessons'
os.makedirs(out_dir, exist_ok=True)
for wk, data in new_weeks.items():
    fpath = os.path.join(out_dir, f'W{wk}.json')
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
print(f"\nWritten {len(new_weeks)} files to {out_dir}/")

# Update public/data/lessonPlans.json (overwrite W1-24, keep W25+)
with open('public/data/lessonPlans.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)
merged = {**existing, **new_weeks}  # new_weeks overwrite existing W1-24
merged_sorted = {str(k): merged[str(k)] for k in sorted(int(x) for x in merged.keys())}
with open('public/data/lessonPlans.json', 'w', encoding='utf-8') as f:
    json.dump(merged_sorted, f, ensure_ascii=False, indent=2)
print(f"public/data/lessonPlans.json: {len(merged_sorted)} weeks")

# Update both index files
for idx_path in ['mcp-server/data/lessonPlans_index.json', 'public/data/lessonPlans_index.json']:
    with open(idx_path, 'r', encoding='utf-8') as f:
        idx = json.load(f)
    for wk, data in new_weeks.items():
        idx[wk] = {'week': int(wk), 'unit_theme': data.get('unit_theme', '')}
    idx_sorted = {str(k): idx[str(k)] for k in sorted(int(x) for x in idx.keys())}
    with open(idx_path, 'w', encoding='utf-8') as f:
        json.dump(idx_sorted, f, ensure_ascii=False, indent=2)
    print(f"{idx_path}: {len(idx_sorted)} weeks")

print("\nAll done!")
