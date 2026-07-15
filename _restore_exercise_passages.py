"""
Restore exercise reading passages that were removed by b8b360b3.

Strategy:
- For all weeks: restore original passage text (between Title: and Stage/Sub-total)
  from commit c8429a2c.
- For W29/30/31 session 0 (main session): override with the new correct story
  (currently in the blue box), since we replaced those stories.
"""
import json, re, subprocess
from pathlib import Path
from copy import deepcopy

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP    = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")
ORIG_COMMIT = 'c8429a2c'


def get_json_at_commit(wn, commit):
    result = subprocess.run(
        ['git', 'show', f'{commit}:public/data/lessons/W{wn}.json'],
        capture_output=True, text=True,
        cwd="/Users/binhnguyen/Downloads/Engquest3k"
    )
    if result.returncode != 0:
        return None
    return json.loads(result.stdout)


def ex_start_idx(content):
    """Return index of first exercise line (Title: / Stage N / numbered item)."""
    for i, l in enumerate(content):
        s = str(l).strip()
        if (s.startswith('Title:') or re.match(r'^Stage\s+\d', s) or
                re.match(r'^\d+[.)]\s', s) or s.startswith('[O]')):
            return i
    return len(content)


def after_title_before_stage(content):
    """
    Given content that starts with Title:..., return (title_line, passage_lines, rest_lines).
    passage_lines = lines between Title: and first Stage/[Sub-total/[ 
    """
    title_i = next((i for i, l in enumerate(content)
                    if str(l).strip().startswith('Title:')), None)
    if title_i is None:
        return None, [], content

    # Find where the passage after title ends (Stage N, [ Sub-total, [O] etc.)
    stage_i = None
    for i in range(title_i + 1, len(content)):
        s = str(content[i]).strip()
        if (re.match(r'^Stage\s+\d', s) or
                s.startswith('[ Sub-total') or
                s.startswith('[O]') or
                re.match(r'^\d+[.)]\s', s)):
            stage_i = i
            break

    if stage_i is None:
        stage_i = len(content)  # everything after title is passage

    passage = content[title_i + 1:stage_i]
    return title_i, [l for l in passage if str(l).strip()], content[stage_i:]


def get_blue_box_passage(content):
    """Get lines from the blue box (before Title: / before exercises)."""
    ei = ex_start_idx(content)
    return [l for l in content[:ei] if str(l).strip() and not str(l).strip().startswith('📖')]


# New correct stories for W29/30/31 session 0 (already in blue box)
NEW_STORY_LINES = {
    29: [
        "A group of friends went on a magic trip.",
        "They ran QUICKLY to the station and flew on a magic carpet.",
        "They came to a beautiful island.",
        "They swam HAPPILY in the sea, rode on dolphins, and drove a tiny car.",
        "They flew CAREFULLY over the mountains. They saw wonderful things and took photos.",
        'Then they came back home. "That was the best trip!" they said.',
    ],
    30: [
        "The class went to the park for a picnic.",
        "They ate sandwiches and drank lemonade.",
        "Sam bought ice cream.",
        "Lisa gave her apple to a small bird.",
        "Ben made a flower crown.",
        "The CHEF cooked the sandwiches in the morning.",
        "The FARMER grew the apples that Lisa gave to the bird.",
        "The DRIVER drove the bus that took the class to the park.",
        "They had a wonderful time. Then it began to rain!",
        'They quickly put away the food and ran to the bus. "That was the best picnic!" they said.',
    ],
    31: [
        "Maya went to the market with her mum.",
        "She saw colourful fruits and vegetables.",
        "She heard the sellers calling.",
        "She smelled fresh bread.",
        "She felt the soft COTTON cloth and the cold METAL pots.",
        "She saw WOODEN shelves, GLASS jars, PLASTIC bags, and STONE sculptures.",
        "She tasted a piece of sweet mango.",
        "She knew every shop and understood every word the sellers said.",
        '"I love the market!" she said.',
    ],
}

def restore_week(wn):
    orig_data = get_json_at_commit(wn, ORIG_COMMIT)
    if orig_data is None:
        print(f"  W{wn}: could not fetch original — skip")
        return False

    curr_data = json.loads((PUBLIC / f"W{wn}.json").read_text(encoding='utf-8'))
    changed = False

    all_sess_keys = [k for k in curr_data if k.startswith('sessions')]
    orig_sess_keys = [k for k in orig_data if k.startswith('sessions')]

    for key in all_sess_keys:
        curr_sessions = curr_data.get(key, [])
        orig_sessions = orig_data.get(key, []) if key in orig_sess_keys else []

        for si, sess in enumerate(curr_sessions):
            # Find reading part
            rp_idx = next((i for i, p in enumerate(sess.get('parts', []))
                           if 'READING INPUT' in p.get('title', '').upper()), None)
            if rp_idx is None:
                continue

            content = list(sess['parts'][rp_idx]['content'])

            # Find where exercises start in current content
            ei = ex_start_idx(content)

            # Get exercises from current
            exercises_current = content[ei:]

            # Check if Title: already has passage text after it
            title_i, existing_passage, rest = after_title_before_stage(exercises_current)
            if title_i is not None and len(existing_passage) >= 3:
                # Already has passage text, skip
                continue

            # Determine what passage text to insert
            passage_to_insert = None

            if wn in NEW_STORY_LINES and si == 0 and key == 'sessions':
                # W29/30/31 session 0: use new correct story
                passage_to_insert = NEW_STORY_LINES[wn]
            else:
                # Get original passage from c8429a2c
                orig_s = orig_sessions[si] if si < len(orig_sessions) else None
                if orig_s is None:
                    continue
                orig_rp = next((p for p in orig_s.get('parts', [])
                                if 'READING INPUT' in p.get('title', '').upper()), None)
                if orig_rp is None:
                    continue

                orig_content = orig_rp['content']
                orig_ei = ex_start_idx(orig_content)
                orig_exercises = orig_content[orig_ei:]
                _, orig_passage, _ = after_title_before_stage(orig_exercises)
                if not orig_passage:
                    continue
                passage_to_insert = [str(l) for l in orig_passage]

            if not passage_to_insert:
                continue

            # Find Title: in exercises_current and insert passage after it
            new_exercises = []
            for j, line in enumerate(exercises_current):
                new_exercises.append(line)
                if str(line).strip().startswith('Title:'):
                    # Insert passage after title
                    new_exercises.extend(passage_to_insert)

            # Reconstruct full content: blue box passage + new exercises
            passage_section = content[:ei]
            sess['parts'][rp_idx]['content'] = passage_section + new_exercises
            changed = True

    if changed:
        js = json.dumps(curr_data, ensure_ascii=False, indent=2)
        (PUBLIC / f"W{wn}.json").write_text(js, encoding='utf-8')
        (MCP / f"W{wn}.json").write_text(js, encoding='utf-8')

    return changed


# Weeks that were modified by b8b360b3 (from git diff stat)
# (All weeks with reading content that had story below Title:)
print("Restoring exercise reading passages...")
print("=" * 60)

total_fixed = 0
for wn in range(1, 54):
    pub = PUBLIC / f"W{wn}.json"
    if not pub.exists():
        continue
    result = restore_week(wn)
    if result:
        print(f"  ✅ W{wn:2}: exercise passage restored")
        total_fixed += 1

print(f"\nDone. Fixed {total_fixed} weeks.")
