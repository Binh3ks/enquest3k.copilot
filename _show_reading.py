import json, re
from pathlib import Path

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")

def show_reading_part(wn):
    data = json.loads((PUBLIC / f"W{wn}.json").read_text(encoding='utf-8'))
    sess = data['sessions'][0]
    rp = next((p for p in sess['parts'] if 'READING INPUT' in p.get('title', '').upper()), None)
    if not rp:
        print(f"W{wn}: No READING INPUT part found")
        return
    c = rp['content']
    print(f"=== W{wn} READING PART — ALL CONTENT ({len(c)} lines) ===")
    for i, l in enumerate(c):
        print(f"  [{i:3}] {str(l)[:100]}")
    print()

show_reading_part(1)
