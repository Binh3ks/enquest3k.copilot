"""
Sync Grammar Focus and embedded reading passages from sessions (3/wk)
into sessions_2 (2/wk) and sessions_5 (5/wk) for W28-31.

Logic:
- Match sessions in sessions_2/sessions_5 to sessions by story title
- Copy full reading passage title from sessions
- Insert Grammar Focus part after Reading Input
"""
import json, re, copy

def get_reading_story(title):
    """Extract story title keyword from READING INPUT part title."""
    m = re.search(r'READING INPUT\s+(.+?)(?:\s+Long ago|\s+Max|\s+Luna|\s+One day|\s+It was|\s+The forest|$)', title, re.I)
    if m:
        return m.group(1).strip().lower()
    # fallback: take first 40 chars after READING INPUT
    idx = title.upper().find('READING INPUT')
    if idx >= 0:
        return title[idx+13:idx+53].strip().lower()
    return title.lower()[:40]

def find_matching_session(sessions3, story_keyword):
    """Find the session in sessions (3/wk) that matches the story keyword."""
    for sess in sessions3:
        for p in sess.get('parts', []):
            if 'READING INPUT' in p.get('title', ''):
                t = p['title'].lower()
                if story_keyword in t:
                    return sess
    return None

for w in [28, 29, 30, 31]:
    path = f'public/data/lessons/W{w}.json'
    with open(path) as f:
        d = json.load(f)

    sessions3 = d.get('sessions', [])

    changed = False

    for sess_key in ['sessions_2', 'sessions_5']:
        for sess in d.get(sess_key, []):
            parts = sess.get('parts', [])

            # Find Reading Input part index
            ri_idx = next((i for i, p in enumerate(parts)
                           if 'READING INPUT' in p.get('title', '')), None)
            if ri_idx is None:
                continue

            reading_part = parts[ri_idx]
            reading_title = reading_part['title']

            # Skip if already has full passage (>80 chars after READING INPUT)
            ri_pos = reading_title.upper().find('READING INPUT')
            after_ri = reading_title[ri_pos + 13:].strip() if ri_pos >= 0 else ''
            already_has_passage = len(after_ri) > 80

            # Skip if Grammar Focus already present right after reading
            already_has_gf = any('GRAMMAR FOCUS' in p.get('title', '')
                                  for p in parts)

            if already_has_passage and already_has_gf:
                continue

            # Find matching session in sessions (3/wk)
            story_kw = get_reading_story(reading_title)
            match_sess = find_matching_session(sessions3, story_kw)

            if not match_sess:
                print(f'  W{w} {sess_key}: NO MATCH for story "{story_kw}"')
                continue

            match_parts = match_sess.get('parts', [])

            # Get reading part with full passage
            full_reading = next(
                (p for p in match_parts if 'READING INPUT' in p.get('title', '')),
                None
            )
            # Get Grammar Focus part
            gf_part = next(
                (p for p in match_parts if 'GRAMMAR FOCUS' in p.get('title', '')),
                None
            )

            if full_reading and not already_has_passage:
                parts[ri_idx] = copy.deepcopy(full_reading)
                print(f'  W{w} {sess_key}: embedded passage for session (story: {story_kw[:40]})')
                changed = True

            if gf_part and not already_has_gf:
                # Insert Grammar Focus right after Reading Input
                insert_at = ri_idx + 1
                parts.insert(insert_at, copy.deepcopy(gf_part))
                print(f'  W{w} {sess_key}: inserted Grammar Focus at [{insert_at}] — {gf_part["title"][:50]}')
                changed = True

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
        print(f'  -> W{w}.json saved')
    else:
        print(f'W{w}: no changes needed')

print('\nDone.')
