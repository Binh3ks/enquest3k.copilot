"""
Restructure reading passages for W28-31:
- Extract story text from title (where it's embedded as one long blob)
- Split into individual sentences
- Put as FIRST items in content[] array with clear markers
- Clean part title to just have story title (not full story text)
- Handle all session types: sessions, sessions_2, sessions_5
"""
import json, re, copy

def split_story(story_text):
    """
    Split a story blob into individual sentences.
    Returns list of sentence strings.
    """
    # Split at sentence boundaries: '. ', '! ', '? ', '." ', '!" ', '?" '
    # But preserve quoted speech
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z"\'])', story_text)
    result = []
    for s in sentences:
        s = s.strip()
        if s:
            result.append(s)
    return result

def extract_story_title(story_text):
    """
    The story text starts with the story title, then the body.
    E.g., "The Tortoise and the Hare Long ago, ..."
    Extract just the title part (everything before the body starts).
    Body-starting indicators: Long ago, Last summer, Yesterday, One day,
    Luna went, Max went, Tom went, Max wrote, After the famous, etc.
    """
    # Match known story openers at word boundary
    body_start_pattern = r'\s+(?:Long ago,|Last \w+,|Yesterday[,\s]|One day,|After the|First,|Luna went|Max went|Tom went|Max wrote|He went|She went|They went)'
    m = re.search(body_start_pattern, story_text)
    if m:
        return story_text[:m.start()].strip(), story_text[m.start():].strip()
    # Fallback: if first word group is the title (no period), use first 30 chars
    first_period = story_text.find('.')
    if first_period > 0 and first_period < 80:
        # Story starts with a sentence directly
        return '', story_text
    return story_text[:40], story_text[40:].strip()

def build_passage_content_lines(story_text):
    """
    Given full story text (title + body), return a list of content lines
    that represent the passage in the JSON content array.
    """
    story_title, story_body = extract_story_title(story_text)
    sentences = split_story(story_body if story_body else story_text)
    
    lines = []
    # Visual separator header
    if story_title:
        lines.append(f'📖 {story_title}')
    else:
        lines.append('📖 Reading Passage:')
    lines.append('')  # blank line for visual separation
    
    # Add each sentence as its own line
    # Group short sentences (≤60 chars) into pairs for readability
    i = 0
    while i < len(sentences):
        s = sentences[i]
        if i + 1 < len(sentences) and len(s) + len(sentences[i+1]) + 1 < 90:
            # Pair two short sentences on one line
            lines.append(f'{s} {sentences[i+1]}')
            i += 2
        else:
            lines.append(s)
            i += 1
    
    lines.append('')  # blank line separator before exercises
    return lines, story_title

def fix_reading_part(part):
    """
    Given a reading input part, restructure it:
    - Extract story from title
    - Put story lines at START of content array
    - Clean title to just have "PART X: READING INPUT  [Story Title]"
    Returns (modified_part, was_changed)
    """
    title = part.get('title', '')
    if 'READING INPUT' not in title.upper():
        return part, False
    
    ai = title.upper().find('READING INPUT') + len('READING INPUT')
    story_and_title = title[ai:].strip()
    
    # Check if story is already in content (starts with 📖)
    content = part.get('content', [])
    if content and str(content[0]).startswith('📖'):
        return part, False  # Already restructured
    
    # Check if there's meaningful story text embedded in title
    # (more than just the story title - i.e., has actual body sentences)
    _, body = extract_story_title(story_and_title)
    if not body or len(body) < 50:
        # No real story body to move - title is just the story name
        return part, False
    
    # Build passage content lines
    passage_lines, clean_title = build_passage_content_lines(story_and_title)
    
    # New part title: "PART X: READING INPUT  [Story Title]"
    part_prefix = title[:ai].rstrip()  # "PART 1: READING INPUT"
    if clean_title:
        new_title = f'{part_prefix}  {clean_title}'
    else:
        # Keep original story title part (first 40 chars of story_and_title)
        new_title = f'{part_prefix}  {story_and_title[:40].strip()}'
    
    # New content: passage lines + original exercise lines
    new_content = passage_lines + list(content)
    
    new_part = dict(part)
    new_part['title'] = new_title
    new_part['content'] = new_content
    return new_part, True

# ── Process all W28-31 ───────────────────────────────────────────
for w in [28, 29, 30, 31]:
    path = f'public/data/lessons/W{w}.json'
    with open(path) as f:
        d = json.load(f)
    
    changed = False
    
    for sess_key in ['sessions', 'sessions_2', 'sessions_5']:
        for si, sess in enumerate(d.get(sess_key, [])):
            parts = sess.get('parts', [])
            for pi, part in enumerate(parts):
                new_part, was_changed = fix_reading_part(part)
                if was_changed:
                    parts[pi] = new_part
                    # Get story title for logging
                    old_ai = part['title'].upper().find('READING INPUT') + 13
                    story_text = part['title'][old_ai:].strip()
                    title_only, _ = extract_story_title(story_text)
                    print(f'  W{w} {sess_key}[{si}] Part[{pi}]: restructured "{title_only[:30]}"')
                    changed = True
    
    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
        print(f'  → W{w}.json saved\n')
    else:
        print(f'W{w}: nothing to change\n')

print('Done.')
