"""
Fix Inference lines in PART 1 reading exercises:
1. Remove '[O] ' prefix from 'Stage 3B — Inference:' lines (that don't have ━━━)
2. Add answer blank '____________________________________________________________'
   after each such line (when not already followed by one)
"""
import json, re
from pathlib import Path

PUBLIC = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP    = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

BLANK = "____________________________________________________________"

def fix_content(content):
    new = []
    changed = False
    for i, line in enumerate(content):
        s = str(line)
        # Target: [O] Stage 3B (without ━━━) — strip prefix
        if '[O] Stage 3B — Inference:' in s and '━' not in s:
            fixed = s.replace('[O] Stage 3B — Inference:', 'Stage 3B — Inference:')
            new.append(fixed)
            nxt = str(content[i+1]).strip() if i+1 < len(content) else ""
            if nxt != BLANK:
                new.append(BLANK)
            changed = True
        # Target: already-clean Stage 3B but missing answer blank (without ━━━)
        elif 'Stage 3B — Inference:' in s and '[O]' not in s and '━' not in s:
            new.append(line)
            nxt = str(content[i+1]).strip() if i+1 < len(content) else ""
            if nxt != BLANK:
                new.append(BLANK)
                changed = True
        else:
            new.append(line)
    return new, changed

total_files = 0
for pub in sorted(PUBLIC.glob("W*.json")):
    data = json.loads(pub.read_text(encoding='utf-8'))
    file_changed = False

    for key in [k for k in data if k.startswith('sessions')]:
        for sess in data[key]:
            for part in sess.get('parts', []):
                new_content, changed = fix_content(part.get('content', []))
                if changed:
                    part['content'] = new_content
                    file_changed = True

    if file_changed:
        js = json.dumps(data, ensure_ascii=False, indent=2)
        pub.write_text(js, encoding='utf-8')
        (MCP / pub.name).write_text(js, encoding='utf-8')
        total_files += 1

print(f"Fixed {total_files} files.")
