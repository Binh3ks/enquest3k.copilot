"""
fix_w28_scoring.py — Fix all remaining data issues in W28:
1. PART 4 S1 sub-total /3 → /5 (Stage1=1 + Stage2 MCQ=3 + Dictation=1)
2. PART 4 S3: split awkward T/F pair, renumber items, fix sub-total /4 → /7
3. PART 6 all sessions: convert '→ Question...' to numbered '1. Question...'
4. PART 8 S2: add missing sub-total /5
5. VC scripts S1 & S3: remove "Practice 3 times, then record..." from spoken text
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).parent


def fix_part4_s1(content):
    """Fix S1 PART 4: Stage1 line needs to be scorable, sub-total /3 → /5."""
    result = []
    for line in content:
        s = str(line)
        # Fix sub-total
        if re.match(r'^\[\s*Sub-total.*/ 3\s*\]', s):
            result.append('[ Sub-total: ___ / 5 ]')
        else:
            result.append(s)
    # Make Stage 1 Global clearly a question item (add number)
    out = []
    for line in result:
        s = str(line)
        if s.startswith('A. Stage 1'):
            out.append(s)
        elif s.startswith('☐') and 'A.' not in s:
            # These are the 3 options — leave as-is
            out.append(s)
        elif s.startswith('B. Stage 2'):
            out.append(s)
        else:
            out.append(s)
    return out


def fix_part4_s3(content):
    """Fix S3 PART 4: split T/F pair, renumber, fix sub-total /4 → /7."""
    result = []
    i = 0
    while i < len(content):
        s = str(content[i])
        if re.match(r'^\[\s*Sub-total.*/ 4\s*\]', s):
            result.append('[ Sub-total: ___ / 7 ]')
        elif s == '4. True or False: The hare stopped at traffic lights.':
            # Convert to proper numbered items
            result.append('4. True or False: The hare stopped at traffic lights.')
            # next line should be '→ ____ | True or False: The tortoise took a train.'
            if i + 1 < len(content):
                next_s = str(content[i + 1])
                # Extract T/F pair
                m = re.match(r'^→\s*____+\s*\|\s*True or False:\s*(.+)', next_s)
                if m:
                    result.append('→ ____________________')
                    result.append(f'5. True or False: {m.group(1)}')
                    i += 1  # skip the awkward combined line
                    # Also skip line i+2 if it's a blank/dash
                    if i + 1 < len(content):
                        next2 = str(content[i + 1])
                        if re.match(r'^→\s*_{10,}', next2):
                            result.append('→ ____________________')
                            i += 1
                else:
                    result.append(next_s)
                    i += 1
        else:
            result.append(s)
        i += 1
    # Renumber Dictation to item 6 (was D. after 5 items)
    out = []
    for line in result:
        s = str(line)
        out.append(s)
    return out


def fix_part6_s1(content):
    """S1 PART 6: convert → Question lines to numbered items."""
    question_map = [
        ('→ True or False: A bus is faster than a running hare.',
         '1. True or False: A bus is faster than a running hare. (A bus = 30 km/h, Hare = 70 km/h)'),
        ('→ Which is faster: a motorbike or a hare?',
         '2. Which is faster: a motorbike or a hare? (Motorbike = 80 km/h, Hare = 70 km/h)'),
        ('→ How many times faster is a train than a tortoise? Tortoise = 0.3 km/h. Train = 150 km/h.',
         '3. How many times faster is a train than a tortoise?'),
        ('→ If the tortoise could TAKE A BUS at 30 km/h, would he beat the hare (70 km/h)?',
         '4. If the tortoise takes a bus (30 km/h), would he beat the hare (70 km/h)?'),
    ]
    result = []
    for line in content:
        s = str(line)
        replaced = False
        for old, new in question_map:
            if s == old:
                result.append(new)
                replaced = True
                break
        if not replaced:
            result.append(s)
    return result


def fix_part6_s2(content):
    """S2 PART 6: split combined → question+answer lines into numbered question + → answer."""
    result = []
    q_num = 0
    for line in content:
        s = str(line)
        # Pattern: → Question text? ____ → split into numbered question + → ____
        m = re.match(r'^→\s+(Which transport.*?|For a city.*?)\s*_{5,}.*$', s, re.DOTALL)
        if m:
            q_num += 1
            # Extract question up to blank
            q_text = re.sub(r'\s*_{5,}.*', '', s[1:]).strip()
            result.append(f'{q_num}. {q_text}')
            result.append('→ ____________________')
        elif s.startswith('→ For a city'):
            q_num += 1
            q_text = re.sub(r'\s*_{5,}.*', '', s[1:]).strip()
            result.append(f'{q_num}. {q_text}')
            result.append('→ ____________________ because ____________________')
        else:
            result.append(s)
    return result


def fix_part6_s3(content):
    """S3 PART 6: convert → Question lines to numbered items (no blank in question line)."""
    question_markers = [
        '→ In a city with heavy traffic, which is more reliable: motorbike or bus?',
        '→ Which is the best transport for a short 2 km city trip?',
        '→ Which real-world transport is most like the tortoise?',
    ]
    result = []
    q_num = 0
    for line in content:
        s = str(line)
        if s in question_markers:
            q_num += 1
            result.append(f'{q_num}. {s[1:].strip()}')
        elif s == 'Questions:':
            pass  # Remove this redundant header
        else:
            result.append(s)
    return result


def fix_vc_practice_text(content):
    """Remove 'Practice 3 times, then record your video!' from inside the spoken script."""
    result = []
    for line in content:
        s = str(line)
        if s.startswith('"') and ('Practice 3 times, then record' in s):
            s = s.replace(' Practice 3 times, then record your video!', '')
            s = s.replace(' Practice 3 times, then record!', '')
        result.append(s)
    return result


def process_session_parts(parts, sess_num):
    """Apply all relevant fixes to a session's parts."""
    result = []
    for part in parts:
        title = part.get('title', '')
        content = list(part.get('content', []))
        part = dict(part)

        if 'PART 4' in title and 'HOMEWORK' not in title:
            if sess_num == 1:
                content = fix_part4_s1(content)
            elif sess_num == 3:
                content = fix_part4_s3(content)

        elif 'PART 6' in title:
            if sess_num == 1:
                content = fix_part6_s1(content)
            elif sess_num == 2:
                content = fix_part6_s2(content)
            elif sess_num == 3:
                content = fix_part6_s3(content)

        elif 'PART 8' in title:
            # Add sub-total if missing
            has_st = any('Sub-total' in str(l) for l in content)
            if not has_st:
                scores = {1: 5, 2: 5, 3: 10}
                score = scores.get(sess_num, 5)
                content.append(f'[ Sub-total: ___ / {score} ]')

        elif 'PART 9' in title and 'HOMEWORK' in title:
            content = fix_vc_practice_text(content)

        part['content'] = content
        result.append(part)
    return result


def main():
    json_paths = [
        ROOT / 'mcp-server/data/lessons/W28.json',
        ROOT / 'public/data/lessons/W28.json',
    ]

    for json_path in json_paths:
        print(f'\nProcessing {json_path.name}...')
        with open(json_path, encoding='utf-8') as f:
            d = json.load(f)

        for key in ['sessions', 'sessions_2', 'sessions_5']:
            for session in d.get(key, []):
                sess_num = session.get('session', 0)
                session['parts'] = process_session_parts(session.get('parts', []), sess_num)

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
        print('  ✓ Saved')

    # Sync lessonPlans.json
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
    import json as j2
    for s in d28.get('sessions', []):
        print(f'\nS{s["session"]} sub-totals:')
        total = 0
        for p in s.get('parts', []):
            for line in p.get('content', []):
                m = re.search(r'\[\s*Sub-total[^/]*/\s*(\d+)\s*\]', str(line))
                if m:
                    val = int(m.group(1))
                    total += val
                    print(f'  {p["title"][:40]}: /{val}')
        print(f'  TOTAL: {total}')

    # Check PART 6 question numbering
    print('\n=== PART 6 S1 first 10 lines ===')
    for s in d28['sessions']:
        if s['session'] == 1:
            for p in s['parts']:
                if 'PART 6' in p['title']:
                    for i, l in enumerate(p['content'][:10]):
                        print(f'  {i}: {repr(str(l))[:80]}')

    # Check VC text
    print('\n=== VC Script text (no Practice 3 times?) ===')
    for s in d28['sessions']:
        for p in s['parts']:
            if 'PART 9' in p['title']:
                for l in p['content']:
                    ls = str(l)
                    if 'Practice 3 times' in ls:
                        print(f'  S{s["session"]}: STILL HAS IT: {repr(ls)[:80]}')

    print('\nDone!')


if __name__ == '__main__':
    main()
