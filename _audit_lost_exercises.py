"""Comprehensive audit: find ALL content lost between c8429a2c (original) and HEAD."""
import json, re, subprocess
from pathlib import Path

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
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
    """Find index where exercises start (Title: / Stage N / numbered)."""
    for i, l in enumerate(content):
        s = str(l).strip()
        if s.startswith('Title:') or re.match(r'^Stage\s+\d', s) or re.match(r'^\d+[.)]\s', s):
            return i
    return len(content)

def get_session_reading_exercises(data):
    """Return dict of session index → exercise lines (after ex_start)."""
    result = {}
    sessions_keys = [k for k in data if k.startswith('sessions')]
    for key in sessions_keys:
        for si, sess in enumerate(data.get(key, [])):
            rp = next((p for p in sess.get('parts', [])
                       if 'READING INPUT' in p.get('title', '').upper()), None)
            if rp:
                c = rp['content']
                ei = ex_start_idx(c)
                result[(key, si)] = c[ei:]
    return result

losses = {}

for wn in range(1, 54):
    orig_data = get_json_at_commit(wn, ORIG_COMMIT)
    if orig_data is None:
        continue

    curr_path = PUBLIC / f"W{wn}.json"
    if not curr_path.exists():
        continue
    curr_data = json.loads(curr_path.read_text(encoding='utf-8'))

    orig_exs = get_session_reading_exercises(orig_data)
    curr_exs = get_session_reading_exercises(curr_data)

    week_losses = []
    for key in orig_exs:
        orig_lines = [str(l).strip() for l in orig_exs[key] if str(l).strip()]
        # find matching session in curr
        curr_lines = [str(l).strip() for l in curr_exs.get(key, []) if str(l).strip()]

        # Check what's in orig but not in curr
        curr_set = set(curr_lines)
        missing = [l for l in orig_lines if l not in curr_set]
        if missing:
            week_losses.append((key, missing, orig_lines, curr_lines))

    if week_losses:
        losses[wn] = week_losses

print(f"Weeks with missing exercise content: {sorted(losses.keys())}")
print()
for wn in sorted(losses.keys()):
    print(f"=== W{wn} ===")
    # Show first session's data only (sessions are usually mirrored)
    for (key, si), missing, orig, curr in losses[wn][:1]:
        print(f"  Missing {len(missing)} lines from {key}[{si}]:")
        for l in missing[:20]:
            print(f"    - {l[:100]}")
    print()
