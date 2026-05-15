"""Remove duplicate passage prose that appears after Title: in exercises section."""
import json, re
from pathlib import Path

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP    = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

def is_prose(s):
    """True if line looks like story prose (not an exercise item)."""
    s = s.strip()
    if not s: return False
    if re.match(r'^\d+[.)]\s', s): return False           # numbered exercise
    if s.startswith('[') or s.startswith('(T)') or s.startswith('(F)'): return False
    if re.match(r'^Stage\s+\d', s): return False
    if re.match(r'^(Title:|True|False|Match|Circle|Underline|Choose|Fill|Write|Complete|Listen|Read|Answer|Sub.total|Grammar|Vocabulary)', s, re.I): return False
    if s.startswith('—') or s.startswith('★') or s.startswith('▶') or s.startswith('📖') or s.startswith('📌'): return False
    return True

def fix_file(path):
    data = json.loads(path.read_text(encoding='utf-8'))
    changed = False

    for key in ['sessions', 'sessions_2', 'sessions_5']:
        if key not in data or not data[key]: continue
        for sess in data[key]:
            parts = sess.get('parts', [])
            for part in parts:
                if 'READING INPUT' not in part.get('title', '').upper():
                    continue
                content = list(part.get('content', []))

                # Find where passage ends (before exercises)
                ex_i = next((i for i, l in enumerate(content)
                             if str(l).strip().startswith('Title:') or
                             re.match(r'^Stage\s+\d', str(l).strip()) or
                             re.match(r'^\d+[.)]\s', str(l).strip()) or
                             str(l).strip().startswith('[')), -1)
                if ex_i < 0:
                    continue

                # Passage lines (without 📖 header)
                passage_text = ' '.join(
                    str(l).strip() for l in content[:ex_i]
                    if str(l).strip() and not str(l).strip().startswith('📖')
                )

                # Find prose block immediately after Title: (before first numbered item)
                # We collect indices of prose lines between ex_i and the first real exercise item
                prose_indices = set()
                for i in range(ex_i, len(content)):
                    s = str(content[i]).strip()
                    if s.startswith('Title:') or not s:
                        continue
                    # Stop when we hit a real exercise item
                    if re.match(r'^\d+[.)]\s', s) or s.startswith('[') or re.match(r'^Stage\s+\d', s):
                        break
                    if is_prose(s):
                        prose_indices.add(i)

                if prose_indices:
                    new_content = [l for i, l in enumerate(content) if i not in prose_indices]
                    part['content'] = new_content
                    changed = True

    return data, changed

fixed = []
for wn in range(1, 54):
    pub = PUBLIC / f'W{wn}.json'
    mcp = MCP / f'W{wn}.json'
    if not pub.exists():
        continue
    data, changed = fix_file(pub)
    if changed:
        js = json.dumps(data, ensure_ascii=False, indent=2)
        pub.write_text(js, encoding='utf-8')
        mcp.write_text(js, encoding='utf-8')
        print(f'  ✅ W{wn:2}: duplicate prose removed')
        fixed.append(wn)

print(f'\nFixed {len(fixed)} weeks: {fixed}')
