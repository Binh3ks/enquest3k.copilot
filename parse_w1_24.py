#!/usr/bin/env python3
"""
Parse W01-24 lesson plan docx → update lessonPlans.json
"""
import docx, re, json

DOCX = "/Users/binhnguyen/Downloads/Engquest3k/Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. NEW_FINAL_Lesson plans_W01-24.docx"
JSON_PATH = "/Users/binhnguyen/Downloads/Engquest3k/public/data/lessonPlans.json"

SKIP_PATTERNS = [
    r'^═+$', r'^══', r'^SESSION \d+ WORKSHEET$', r'^SECTION \d+:',
    r'^TEACHER CONTENT PACK', r'^Integrated English Program',
    r'^\[OLDER ONLY VERSION\]$', r'^2\.\d ', r'^3\.\d ',
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

def parse_doc(path):
    doc = docx.Document(path)
    paras = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

    # Find week boundaries
    week_starts = []
    for i, t in enumerate(paras):
        m = re.match(r'^TEACHER CONTENT PACK.*?WEEK\s+(\d+)', t)
        if m:
            week_starts.append((i, int(m.group(1))))

    result = {}

    for wi, (wstart, wnum) in enumerate(week_starts):
        wend = week_starts[wi + 1][0] if wi + 1 < len(week_starts) else len(paras)
        week_paras = paras[wstart:wend]

        # Extract unit_theme
        unit_theme = ""
        for t in week_paras[:10]:
            m = re.match(r'^Unit\s+\d+:\s+(.+)', t)
            if m:
                unit_theme = m.group(1).strip()
                break

        # Find all sessions within this week (by "📚 WEEK N | SESSION S" marker)
        sess_starts = []
        for i, t in enumerate(week_paras):
            if re.match(r'^📚 WEEK \d+ \| SESSION', t):
                sess_starts.append(i)

        sessions = []
        for si, sstart in enumerate(sess_starts):
            send = sess_starts[si + 1] if si + 1 < len(sess_starts) else len(week_paras)
            sess_paras = week_paras[sstart:send]

            m = re.match(r'^📚 WEEK \d+ \| SESSION (\d+)', sess_paras[0])
            sess_num = int(m.group(1)) if m else si + 1

            parts = parse_session(sess_paras)
            sessions.append({"session": sess_num, "parts": parts})

        result[str(wnum)] = {
            "week": wnum,
            "unit_theme": unit_theme,
            "quick_ref": {},
            "methodology": "",
            "vocab_tiers": [],
            "sessions": sessions
        }

    return result


def parse_session(lines):
    """Split session lines into parts."""
    parts = []
    current_title = None
    current_content = []
    in_video = False  # Track video challenge lines (append to Part 9)

    for line in lines:
        if should_skip(line):
            continue

        # Video challenge lines → append to Part 9 content
        if re.match(r'^🎥', line) or (in_video and current_title and re.match(r'^PART 9:', current_title)):
            if re.match(r'^🎥', line):
                in_video = True
            if current_title and re.match(r'^PART 9:', current_title):
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
                # For the session header part, only keep the Name line
                if re.match(r'^📚 WEEK \d+', current_title):
                    if 'Name:' in line:
                        current_content.append(line)
                    # Skip everything else (separator lines etc.)
                else:
                    current_content.append(line)

    if current_title is not None:
        parts.append(build_part(current_title, current_content))

    return parts


def build_part(title, content):
    """Build a part dict, with special handling for PART 1 passage."""
    clean_content = []

    if re.match(r'^PART 1:', title):
        # Strip "Title: " prefix from passage title line
        for line in content:
            stripped = re.sub(r'^Title:\s*["\']?', '', line).rstrip('"\'')
            clean_content.append(stripped)
        return {"title": title, "content": clean_content}

    elif re.match(r'^PART 9:', title):
        # Build a clean title that includes "HOMEWORK" keyword for renderer detection
        # Check if title already says HOMEWORK
        new_title = title if 'HOMEWORK' in title.upper() else title.replace('PART 9:', 'PART 9: HOMEWORK')
        for line in content:
            clean_content.append(line)
        return {"title": new_title, "content": clean_content}

    else:
        return {"title": title, "content": content}


# ── Main ──────────────────────────────────────────────────────────────────────

new_weeks = parse_doc(DOCX)

# Verify counts
print("Parsed weeks:", sorted([int(k) for k in new_weeks.keys()]))
for wk, wdata in sorted(new_weeks.items(), key=lambda x: int(x[0])):
    nsess = len(wdata['sessions'])
    nparts = sum(len(s['parts']) for s in wdata['sessions'])
    print(f"  W{wk}: {nsess} sessions, {nparts} parts total, theme: {wdata['unit_theme'][:50]}")
