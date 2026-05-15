"""
Comprehensive audit of ALL W1-W53 lesson JSON files.
Checks: 1) Reading passage present in READING INPUT
        2) Grammar Focus section exists
        3) mcp-server copy in sync with public/
"""
import json, re
from pathlib import Path

PUBLIC  = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP     = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

def get_parts(json_path):
    try:
        data = json.loads(json_path.read_text())
        # Try sessions, sessions_2, sessions_5
        for key in ['sessions', 'sessions_2', 'sessions_5']:
            if key in data and data[key]:
                return data[key][0].get('parts', []), key
        return [], None
    except Exception as e:
        return None, str(e)

def check_passage(content):
    """Return (exStart, passageLines) — exStart=-1 means all content, 0 means no passage"""
    ex_start = -1
    for i, l in enumerate(content):
        s = str(l).strip()
        if s.startswith('Title:') or re.match(r'^Stage\s+\d', s) or s.startswith('[') or re.match(r'^\d+\.', s):
            ex_start = i
            break
    if ex_start > 0:
        passage = [l for l in content[:ex_start] if str(l).strip()]
        return ex_start, len(passage)
    elif ex_start == 0:
        return 0, 0
    else:
        return -1, len([l for l in content if str(l).strip()])

results = {}
print(f"{'W':>4} {'File':4} {'Reading Part':20} {'exStart':>8} {'Passage':>8} {'GF':>4} {'Sync':>4}")
print("-"*60)

for wn in range(1, 54):
    pub_file = PUBLIC / f"W{wn}.json"
    mcp_file = MCP / f"W{wn}.json"
    
    if not pub_file.exists():
        print(f" W{wn:2}  MISSING public file!")
        continue
    
    parts, sess_key = get_parts(pub_file)
    if parts is None:
        print(f" W{wn:2}  ERROR: {sess_key}")
        continue
    
    # Find READING INPUT part
    reading_part = next((p for p in parts if 'READING INPUT' in str(p.get('title','')).upper()), None)
    # Find GRAMMAR FOCUS part
    gf_part = next((p for p in parts if 'GRAMMAR FOCUS' in str(p.get('title','')).upper() or 
                    'GRAMMAR SPOTLIGHT' in str(p.get('title','')).upper()), None)
    
    has_gf = gf_part is not None
    if has_gf:
        gf_content = gf_part.get('content', [])
        has_gf = len([l for l in gf_content if str(l).strip()]) > 2
    
    if reading_part:
        content = reading_part.get('content', [])
        ex_start, passage_cnt = check_passage(content)
        reading_status = f"ex={ex_start} p={passage_cnt}"
    else:
        ex_start, passage_cnt = -99, 0
        reading_status = "NO READING PART"
    
    # Check sync
    in_sync = "✅" if (mcp_file.exists() and pub_file.read_bytes() == mcp_file.read_bytes()) else "❌"
    gf_mark = "✅" if has_gf else "❌"
    passage_mark = "✅" if passage_cnt > 0 else "❌"
    
    row = f" W{wn:2}  {sess_key or '?':12} {reading_status:20} {passage_mark:>3}      {gf_mark:>3}  {in_sync:>3}"
    print(row)
    results[wn] = {
        'has_reading': reading_part is not None,
        'ex_start': ex_start,
        'passage_cnt': passage_cnt,
        'has_gf': has_gf,
        'in_sync': in_sync == "✅",
        'sess_key': sess_key
    }

# Summary
missing_passage = [w for w, r in results.items() if r['passage_cnt'] == 0]
missing_gf = [w for w, r in results.items() if not r['has_gf']]
out_of_sync = [w for w, r in results.items() if not r['in_sync']]

print(f"\n=== SUMMARY ===")
print(f"Missing passage:    {sorted(missing_passage)}")
print(f"Missing GF:         {sorted(missing_gf)}")
print(f"Out of sync mcp/:   {sorted(out_of_sync)}")
print(f"\nTotal weeks: {len(results)} | Need passage fix: {len(missing_passage)} | Need GF: {len(missing_gf)} | Need sync: {len(out_of_sync)}")
