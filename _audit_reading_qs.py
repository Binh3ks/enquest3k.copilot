"""Compare original W1-W10 reading part exercises vs current state."""
import json, re, subprocess
from pathlib import Path

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")

def get_reading_content_at_commit(wn, commit):
    """Get reading part content at a specific commit."""
    result = subprocess.run(
        ['git', 'show', f'{commit}:public/data/lessons/W{wn}.json'],
        capture_output=True, text=True,
        cwd="/Users/binhnguyen/Downloads/Engquest3k"
    )
    if result.returncode != 0:
        return None
    data = json.loads(result.stdout)
    sess = data['sessions'][0]
    rp = next((p for p in sess['parts'] if 'READING INPUT' in p.get('title','').upper()), None)
    return rp['content'] if rp else None

def count_stage_lines(content):
    if not content: return 0
    return sum(1 for l in content if re.search(r'Stage \d', str(l)) or
               re.search(r'T / F:|→ _{5}|What is|Who is|How ', str(l)))

print("Week  | ORIG stages | CURR stages | ORIG exLines | CURR exLines")
print("-" * 65)

for wn in range(1, 20):
    try:
        orig = get_reading_content_at_commit(wn, 'c8429a2c')
        curr_data = json.loads((PUBLIC / f"W{wn}.json").read_text(encoding='utf-8'))
        curr_sess = curr_data['sessions'][0]
        curr_rp = next((p for p in curr_sess['parts'] if 'READING INPUT' in p.get('title','').upper()), None)
        curr = curr_rp['content'] if curr_rp else None

        if orig is None and curr is None:
            continue

        # Find exStart in original
        def ex_start(c):
            if not c: return 0
            i = next((i for i, l in enumerate(c) if str(l).strip().startswith('Title:')), None)
            if i is None:
                i = next((i for i, l in enumerate(c) if re.match(r'^Stage\s+\d', str(l).strip())), None)
            return i if i is not None else len(c)

        oi = ex_start(orig) if orig else 0
        ci = ex_start(curr) if curr else 0

        orig_ex = orig[oi:] if orig else []
        curr_ex = curr[ci:] if curr else []

        orig_stages = count_stage_lines(orig_ex)
        curr_stages = count_stage_lines(curr_ex)

        status = "✅" if curr_stages >= orig_stages else f"❌ lost {orig_stages-curr_stages}"
        print(f"W{wn:2}   | {orig_stages:11} | {curr_stages:11} | {len(orig_ex):12} | {len(curr_ex):12} {status}")
    except Exception as e:
        print(f"W{wn:2}   | ERR: {e}")
