#!/usr/bin/env python3
"""
Add audio_scripts field to all W1-53 JSON files.
Parses Section 6 from docx files, writes directly to mcp-server/data/lessons/W{n}.json
"""
import docx, re, json, os

DOCX_FILES = [
    ("Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W01-24.docx", range(1, 25)),
    ("Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W25-36.docx", range(25, 37)),
    ("Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W37-53.docx", range(37, 54)),
]

WNS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
OUT_DIR = 'mcp-server/data/lessons'


def para_text(el):
    return ''.join(t.text or '' for t in el.findall(f'.//{{{WNS}}}t'))


def parse_session_audio_chunks(raw_text, speed_note):
    """Parse a blob of text that may contain multiple S1/S2/S3 blocks."""
    scripts = []
    # Split on S1/S2/S3 Listening Text markers
    chunks = re.split(r'(?=S\d\s+Listening Text:)', raw_text)
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk:
            continue
        m_lt = re.match(r'S(\d)\s+Listening Text:\s*(.*?)(?=S\d\s+Dictation|$)', chunk, re.DOTALL)
        if not m_lt:
            continue
        sess_num = int(m_lt.group(1))
        listening_text = m_lt.group(2).strip()
        # Find dictation in same chunk
        m_dict = re.search(r'S\d\s+Dictation sentences?:\s*(.*?)$', chunk, re.DOTALL)
        dictation = []
        if m_dict:
            raw_dict = m_dict.group(1).strip()
            sentences = re.findall(r'\d+\.\s*"([^"]+)"', raw_dict)
            if not sentences:
                sentences = [s.strip() for s in re.split(r'\d+\.\s*', raw_dict) if s.strip()]
            dictation = sentences
            # Remove dictation from listening_text
            lt_clean = re.sub(r'S\d\s+Dictation sentences?:.*$', '', listening_text, flags=re.DOTALL).strip()
            listening_text = lt_clean
        entry = {'session': sess_num, 'listening_text': listening_text, 'dictation': dictation, 'speed_note': speed_note}
        scripts.append(entry)
    return scripts


def extract_audio_scripts_from_week_items(items):
    """
    items = list of (tag, str) for one week block.
    Returns list of dicts: [{session, listening_text, dictation, speed_note}]
    """
    scripts = []
    in_sec = False
    speed_note = ''
    # Collect all text in Section 6 as one blob (handles cases where content is packed into one paragraph)
    sec6_blob = ''

    for tag, data in items:
        if tag != 'p':
            continue
        t = data.strip()
        if re.match(r'^SECTION 6:', t) and 'AUDIO' in t.upper():
            in_sec = True
            # Content may be on same line after the header
            rest = re.sub(r'^SECTION 6:[^$]*?AUDIO SCRIPTS\s*', '', t).strip()
            if rest:
                sec6_blob += ' ' + rest
            continue
        if in_sec and re.match(r'^SECTION [789]:|^SECTION 10:', t):
            break
        if not in_sec or not t:
            continue
        sec6_blob += ' ' + t

    if sec6_blob.strip():
        # Extract speed note
        m_speed = re.search(r'Reading speed:[^S]*', sec6_blob)
        if m_speed:
            speed_note = m_speed.group(0).strip()
        scripts = parse_session_audio_chunks(sec6_blob, speed_note)

    # Fallback: also parse line-by-line if parse_session_audio_chunks found nothing
    if not scripts:
        in_sec = False
        speed_note = ''
        for tag, data in items:
            if tag != 'p':
                continue
            t = data.strip()
            if re.match(r'^SECTION 6:', t) and 'AUDIO' in t.upper():
                in_sec = True
                continue
            if in_sec and re.match(r'^SECTION [789]:|^SECTION 10:', t):
                break
            if not in_sec or not t:
                continue
            if re.match(r'^Reading speed:', t):
                speed_note = t
                continue
            m = re.match(r'^S(\d)\s+Listening Text:\s*(.*)', t, re.DOTALL)
            if m:
                sess_num = int(m.group(1))
                entry = next((e for e in scripts if e['session'] == sess_num), None)
                if not entry:
                    entry = {'session': sess_num, 'listening_text': '', 'dictation': [], 'speed_note': speed_note}
                    scripts.append(entry)
                entry['listening_text'] = m.group(2).strip()
                continue
            m = re.match(r'^S(\d)\s+Dictation sentences?:\s*(.*)', t, re.DOTALL)
            if m:
                sess_num = int(m.group(1))
                raw_dict = m.group(3).strip() if len(m.groups()) > 2 else m.group(2).strip()
                sentences = re.findall(r'\d+\.\s*"([^"]+)"', raw_dict)
                if not sentences:
                    sentences = [s.strip() for s in re.split(r'\d+\.\s*', raw_dict) if s.strip()]
                entry = next((e for e in scripts if e['session'] == sess_num), None)
                if not entry:
                    entry = {'session': sess_num, 'listening_text': '', 'dictation': [], 'speed_note': speed_note}
                    scripts.append(entry)
                entry['dictation'] = sentences

    return sorted(scripts, key=lambda x: x['session'])


def parse_all_weeks():
    updated = {}

    for docx_path, wrange in DOCX_FILES:
        print(f"Parsing {docx_path}...")
        doc = docx.Document(docx_path)

        # Build ordered list of (tag, text)
        body_items = []
        for el in doc.element.body:
            tag = el.tag.split('}')[1] if '}' in el.tag else el.tag
            if tag == 'p':
                body_items.append(('p', para_text(el)))
            elif tag == 'tbl':
                body_items.append(('tbl', ''))

        # Find week boundaries
        week_starts = []
        for i, (tag, data) in enumerate(body_items):
            if tag == 'p':
                m = re.match(r'^TEACHER CONTENT PACK.*?WEEK\s+(\d+)', data)
                if m:
                    week_starts.append((i, int(m.group(1))))

        for wi, (wstart, wnum) in enumerate(week_starts):
            wend = week_starts[wi + 1][0] if wi + 1 < len(week_starts) else len(body_items)
            week_items = body_items[wstart:wend]
            scripts = extract_audio_scripts_from_week_items(week_items)
            updated[wnum] = scripts
            sess_info = ', '.join(f"S{s['session']}({'✓' if s['listening_text'] else '✗'})" for s in scripts)
            print(f"  W{wnum}: {len(scripts)} sessions — {sess_info}")

    return updated


def apply_to_json_files(week_scripts):
    for wnum, scripts in week_scripts.items():
        fpath = os.path.join(OUT_DIR, f'W{wnum}.json')
        if not os.path.exists(fpath):
            print(f"  SKIP W{wnum} — file not found")
            continue
        with open(fpath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        data['audio_scripts'] = scripts
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\nUpdated {len(week_scripts)} files in {OUT_DIR}/")


if __name__ == '__main__':
    week_scripts = parse_all_weeks()
    apply_to_json_files(week_scripts)
    print("Done!")
