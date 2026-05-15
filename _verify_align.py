"""Quick verification of fixed weeks."""
import json, re
from pathlib import Path

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
issues = []

def check(wn):
    data = json.loads((PUBLIC / f"W{wn}.json").read_text(encoding='utf-8'))
    sess = data['sessions'][0]
    parts = sess['parts']

    # Passage check
    rp = next((p for p in parts if 'READING INPUT' in p.get('title','').upper()), None)
    passage_ok = False
    passage_title = ""
    if rp:
        c = rp['content']
        ex_i = next(
            (i for i, l in enumerate(c)
             if str(l).strip().startswith('Title:') or
             re.match(r'^Stage\s+\d', str(l).strip()) or
             re.match(r'^\d+[.)]\s', str(l).strip())),
            len(c)
        )
        passage = [l for l in c[:ex_i] if str(l).strip()]
        passage_ok = len(passage) >= 4
        if passage: passage_title = str(passage[0])[:60]

    # GF check
    gf = next((p for p in parts if re.search(r'GRAMMAR (FOCUS|SPOTLIGHT)', p.get('title','').upper())), None)
    gf_ok = False
    has_rule = False
    has_cambridge = False
    if gf:
        gf_lines = gf['content']
        gf_ok = len(gf_lines) >= 10
        has_rule = any('📌 RULE' in str(l) for l in gf_lines)
        has_cambridge = any('★ CAMBRIDGE' in str(l) for l in gf_lines)

    status = "✅" if (passage_ok or wn in [36,50,51,53]) and gf_ok and has_rule and has_cambridge else "❌"
    print(f"  {status} W{wn:2}: passage={'OK' if passage_ok else 'MISSING'} ({passage_title[:40]})  "
          f"GF lines={len(gf['content']) if gf else 0}  RULE={'✓' if has_rule else '✗'}  "
          f"CAMBRIDGE={'✓' if has_cambridge else '✗'}")

for wn in [28, 29, 30, 31, 36, 50, 51, 53]:
    check(wn)
