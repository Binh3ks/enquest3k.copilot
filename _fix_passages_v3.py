"""
Fix v3: Handle ALL story/text formats in syllabus including 'Text:' single-line.
Targets only weeks still showing 1 passage line.
"""
import json, re
from pathlib import Path

SYLLABUS = Path("/Users/binhnguyen/Downloads/Engquest3k/_syllabus_v5_raw.txt")
PUBLIC   = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP      = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

raw_lines = SYLLABUS.read_text(encoding="utf-8").splitlines()

week_starts = {}
for i, line in enumerate(raw_lines):
    m = re.match(r'^Tuần (\d+):', line.strip())
    if m:
        n = int(m.group(1))
        if 1 <= n <= 56:
            week_starts[n] = i

sorted_weeks = sorted(week_starts.keys())

def get_week_block(wn):
    start = week_starts.get(wn, -1)
    if start == -1:
        return []
    wkeys = sorted_weeks
    idx = wkeys.index(wn)
    end = week_starts[wkeys[idx+1]] if idx+1 < len(wkeys) else start + 200
    return raw_lines[start:end]


def split_into_sentences(text, max_chars=82):
    sentences = re.split(r'(?<=[.!?])\s+', text)
    lines = []
    current = ""
    for s in sentences:
        s = s.strip()
        if not s:
            continue
        if len(current) + len(s) + 1 <= max_chars:
            current = (current + " " + s).strip()
        else:
            if current:
                lines.append(current)
            current = s
    if current:
        lines.append(current)
    return lines


def extract_passage(wn):
    """Extract passage lines — handles Story:, Text:, and multi-line Text (N words): formats."""
    block = get_week_block(wn)
    if not block:
        return []
    
    reading_start = -1
    for i, line in enumerate(block):
        if re.search(r'READING INPUT|Reading Input|\.1\s+READING', line):
            reading_start = i
            break
    if reading_start == -1:
        return []
    
    title_line = ""
    text_lines = []
    in_multiline_text = False
    
    for line in block[reading_start:reading_start+45]:
        l = line.strip()
        
        # Extract title
        if re.search(r'^Title:', l) and not title_line:
            raw_title = re.sub(r'^Title:\s*', '', l).strip().strip('"')
            raw_title = re.sub(r'\s*\|\s*\d+\s*words.*', '', raw_title).strip().strip('"')
            title_line = raw_title
        
        # Format 1: "Story: full text on one line"
        if re.match(r'^Story:', l):
            story_text = l[len('Story:'):].strip()
            if len(story_text) > 20:
                text_lines = split_into_sentences(story_text)
                break
        
        # Format 2: "Text: full text on one line" (W37-W53)
        if re.match(r'^Text:', l):
            text_text = l[len('Text:'):].strip()
            if len(text_text) > 20:
                text_lines = split_into_sentences(text_text)
                break
        
        # Format 3: "Text (60 words):" followed by lines on next lines
        if re.match(r'^Text\s+\(', l) or re.match(r'^Text\s+\d', l):
            in_multiline_text = True
            after_colon = l.split(':', 1)[-1].strip()
            if after_colon and len(after_colon) > 5:
                text_lines.append(after_colon)
            continue
        
        if in_multiline_text:
            if re.search(r'^Comprehension|^Text Type|^Grammar in context|^★|^▶|^\d+\.\d+\s|^Key |^Story', l):
                break
            if l:
                text_lines.append(l)
    
    result = []
    if title_line:
        result.append(f"📖 {title_line}")
    result.extend(text_lines)
    return result


# Weeks that still have only 1 passage line
TARGET_WEEKS = [36, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 50, 51, 52, 53]

print("Fixing remaining weeks with inadequate passages...")
print("="*60)

fixed = []
for wn in TARGET_WEEKS:
    pub_file = PUBLIC / f"W{wn}.json"
    if not pub_file.exists():
        print(f"  W{wn}: MISSING")
        continue
    
    passage_lines = extract_passage(wn)
    if len(passage_lines) < 3:
        print(f"  ⚠️  W{wn}: syllabus passage still only {len(passage_lines)} lines: {passage_lines[:2]}")
        continue
    
    data = json.loads(pub_file.read_text(encoding="utf-8"))
    changed = False
    
    for key in ['sessions', 'sessions_2', 'sessions_5']:
        if key not in data or not data[key]:
            continue
        for sess in data[key]:
            parts = sess.get('parts', [])
            reading_idx = next((i for i, p in enumerate(parts)
                               if 'READING INPUT' in str(p.get('title','')).upper()), None)
            
            if reading_idx is None:
                continue
            
            part = parts[reading_idx]
            content = list(part.get('content', []))
            
            # Find where exercises start
            ex_i = next((i for i, l in enumerate(content)
                        if str(l).strip().startswith('Title:') or
                        re.match(r'^Stage\s+\d', str(l).strip()) or
                        re.match(r'^\d+\.', str(l).strip()) or
                        str(l).strip().startswith('[')), 0)
            
            # Check current passage quality
            current_passage = [l for l in content[:ex_i] if str(l).strip()]
            needs_fix = len(current_passage) < 3 or \
                        (len(current_passage) <= 2 and any('|' in str(l) for l in current_passage))
            
            if needs_fix:
                # Get exercises part
                exercises = content[ex_i:] if ex_i > 0 else content
                # Remove old partial 📖 line if present
                while exercises and str(exercises[0]).strip().startswith('📖'):
                    exercises = exercises[1:]
                while exercises and not str(exercises[0]).strip():
                    exercises = exercises[1:]
                
                part['content'] = passage_lines + [''] + exercises
                changed = True
    
    if changed:
        json_str = json.dumps(data, ensure_ascii=False, indent=2)
        pub_file.write_text(json_str, encoding="utf-8")
        mcp_file = MCP / pub_file.name
        mcp_file.write_text(json_str, encoding="utf-8")
        print(f"  ✅ W{wn:2}: passage={len(passage_lines)} lines → FIXED")
        fixed.append(wn)
    else:
        print(f"  ➖ W{wn:2}: already adequate")

print(f"\nFixed: {fixed}")

# Final verification
print("\n=== FINAL CHECK ===")
issues = []
for wn in range(1, 54):
    pub_file = PUBLIC / f"W{wn}.json"
    if not pub_file.exists():
        issues.append(f"W{wn}: MISSING")
        continue
    data = json.loads(pub_file.read_text())
    sess = data.get('sessions', data.get('sessions_2', [{}]))[0]
    parts = sess.get('parts', [])
    rp = next((p for p in parts if 'READING INPUT' in str(p.get('title','')).upper()), None)
    gf = next((p for p in parts if 'GRAMMAR FOCUS' in str(p.get('title','')).upper()), None)
    
    if rp:
        content = rp.get('content', [])
        ex_i = next((i for i, l in enumerate(content)
                    if str(l).strip().startswith('Title:') or
                    re.match(r'^Stage\s+\d', str(l).strip()) or
                    re.match(r'^\d+\.', str(l).strip()) or
                    str(l).strip().startswith('[')), 0)
        p_cnt = len([l for l in content[:ex_i] if str(l).strip()])
    else:
        p_cnt = -1
    
    gf_cnt = len([l for l in gf.get('content',[]) if str(l).strip()]) if gf else 0
    
    p_ok = "✅" if p_cnt >= 3 else ("❌" if p_cnt < 1 else "⚠️")
    g_ok = "✅" if gf_cnt >= 5 else "❌"
    print(f"  W{wn:2}: passage={p_cnt:3} {p_ok}  GF={gf_cnt:3} {g_ok}")
    if p_cnt < 3 or gf_cnt < 5:
        issues.append(f"W{wn}")

print(f"\nTotal issues remaining: {len(issues)}: {issues}")
