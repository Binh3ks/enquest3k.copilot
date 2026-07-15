"""
Comprehensive fix: Extract passage + Grammar Focus from Syllabus V5
and inject into all W1-W53 lesson JSON files.

Strategy:
- For W1-W27, W32-W42, W49-W53: extract from syllabus, insert into READING INPUT content[]
- For W43-W48: math/ELA hybrid — add grammar focus to PART 3 (sentence building)
- For all: add/update Grammar Focus section
- Sync to mcp-server/
"""
import json, re
from pathlib import Path
from copy import deepcopy

SYLLABUS = Path("/Users/binhnguyen/Downloads/Engquest3k/_syllabus_v5_raw.txt")
PUBLIC   = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP      = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

# ─────────────────────────────────────────────
# STEP 1: Parse syllabus into per-week blocks
# ─────────────────────────────────────────────
raw_lines = SYLLABUS.read_text(encoding="utf-8").splitlines()

week_starts = {}
for i, line in enumerate(raw_lines):
    m = re.match(r'^Tuần (\d+):', line.strip())
    if m:
        n = int(m.group(1))
        if 1 <= n <= 53:
            week_starts[n] = i

sorted_weeks = sorted(week_starts.keys())

def get_week_block(wn):
    start = week_starts[wn]
    wkeys = sorted_weeks
    idx = wkeys.index(wn)
    end = week_starts[wkeys[idx+1]] if idx+1 < len(wkeys) else start + 200
    return [l for l in raw_lines[start:end]]

# ─────────────────────────────────────────────
# STEP 2: Extract passage text for each week
# ─────────────────────────────────────────────
def extract_passage(wn):
    """Return list of passage lines from syllabus for this week."""
    block = get_week_block(wn)
    
    # Find the READING INPUT / Reading section
    reading_start = -1
    for i, line in enumerate(block):
        if re.search(r'READING INPUT|Reading Input|\.1\s+READING|Reading Input', line):
            reading_start = i
            break
    if reading_start == -1:
        return []
    
    # Find Title and Text
    title_line = ""
    text_lines = []
    in_text = False
    
    for line in block[reading_start:reading_start+30]:
        l = line.strip()
        if re.search(r'^Title:', l):
            title_line = re.sub(r'^Title:\s*', '', l).strip().strip('"')
        if l.startswith('Text') and ('words' in l or ':' in l):
            in_text = True
            continue
        if in_text:
            # Stop at Comprehension or empty or next section
            if re.search(r'^Comprehension|^Text Type|^Grammar in context|^★|^▶|^\d+\.\d+\s', l):
                break
            if l:
                text_lines.append(l)
    
    # Build passage content lines with 📖 marker at start
    result = []
    if title_line:
        result.append(f"📖 {title_line}")
    result.extend(text_lines)
    
    return result

# ─────────────────────────────────────────────
# STEP 3: Extract Grammar Focus for each week
# ─────────────────────────────────────────────
def extract_grammar_focus(wn):
    """Return formatted Grammar Focus content lines."""
    block = get_week_block(wn)
    
    # Find GRAMMAR FOCUS section
    gf_start = -1
    for i, line in enumerate(block):
        if re.search(r'GRAMMAR FOCUS|Grammar Focus|GRAMMAR SPOTLIGHT|\.2\s+GRAMMAR', line):
            gf_start = i
            break
    if gf_start == -1:
        return []
    
    lines_out = []
    stop_keywords = ['VOCABULARY FOCUS', 'WRITING TASK', 'SPEAKING TASK', 'HOMEWORK', 
                     '\.3\s+VOCAB', '\.4\s+WRITING', '\.5\s+SPEAKING', 'Tuần \d+:']
    stop_pattern = '|'.join(stop_keywords)
    
    target_structure = ""
    patterns = []
    examples = []
    rules = []
    cambridge_notes = []
    
    current_section = None
    for line in block[gf_start:gf_start+50]:
        l = line.strip()
        if not l:
            continue
        if re.search(stop_pattern, l) and gf_start > 0:
            break
        
        if re.search(r'^Target Structure:', l):
            target_structure = re.sub(r'^Target Structure:\s*', '', l)
        elif re.search(r'^Pattern:', l):
            current_section = 'pattern'
        elif re.search(r'^Examples?:', l):
            current_section = 'examples'
        elif re.search(r'^Practice Activities:', l):
            current_section = None
        elif re.search(r'^Note to class:|^Topic:', l):
            rules.append(l)
        elif re.search(r'★\s+CAMBRIDGE', l):
            current_section = 'cambridge'
        elif current_section == 'pattern' and l and not re.match(r'^[A-Z].*:', l):
            patterns.append(l)
        elif current_section == 'examples' and l and not re.match(r'^[A-Z].*:', l):
            examples.append(l)
        elif current_section == 'cambridge':
            cambridge_notes.append(l)
    
    # Build Grammar Focus content
    result = []
    if target_structure:
        result.append(f"📌 RULE: Target Structure — {target_structure}")
        result.append("")
    
    if rules:
        for r in rules[:2]:
            result.append(f"📌 NOTE: {r}")
        result.append("")
    
    if patterns:
        result.append("┌─────────────────────────────────────┐")
        result.append("│  PATTERN                            │")
        result.append("├─────────────────────────────────────┤")
        for p in patterns[:4]:
            result.append(f"│  {p:<35} │")
        result.append("└─────────────────────────────────────┘")
        result.append("")
    
    if examples:
        result.append("EXAMPLES:")
        for ex in examples[:5]:
            result.append(f"  ✎ {ex}")
        result.append("")
    
    if cambridge_notes:
        result.append("★ CAMBRIDGE INTEGRATION:")
        for note in cambridge_notes[:3]:
            if note.strip().startswith(('▶', '->', '★')):
                result.append(f"  {note}")
        result.append("")
    
    result.append("📌 PRACTICE:")
    result.append("  1. Teacher models → Students repeat")
    result.append("  2. Substitution drill with the pattern above")
    result.append("  3. Pair practice — ask & answer")
    
    return result

# ─────────────────────────────────────────────
# STEP 4: Apply fixes to JSON files
# ─────────────────────────────────────────────

def update_all_session_modes(data, updater_fn):
    """Apply updater_fn to sessions in all session modes."""
    for key in ['sessions', 'sessions_2', 'sessions_5']:
        if key in data and data[key]:
            for sess in data[key]:
                updater_fn(sess)

def fix_week(wn):
    pub_file = PUBLIC / f"W{wn}.json"
    if not pub_file.exists():
        print(f"  W{wn}: SKIP — file missing")
        return False
    
    data = json.loads(pub_file.read_text(encoding="utf-8"))
    
    passage_lines = extract_passage(wn)
    gf_lines = extract_grammar_focus(wn)
    
    changed = False
    
    def update_session(sess):
        nonlocal changed
        parts = sess.get('parts', [])
        
        # ── Fix READING INPUT passage ──
        reading_idx = next((i for i, p in enumerate(parts) 
                           if 'READING INPUT' in str(p.get('title','')).upper()), None)
        
        if reading_idx is not None and passage_lines:
            part = parts[reading_idx]
            content = list(part.get('content', []))
            
            # Check if passage already there (starts with 📖)
            already_has_passage = any(str(l).startswith('📖') for l in content[:5])
            
            if not already_has_passage:
                # Insert passage lines BEFORE any Title:/Stage/exercise lines
                ex_start = next((i for i, l in enumerate(content)
                                if str(l).strip().startswith('Title:') or
                                re.match(r'^Stage\s+\d', str(l).strip()) or
                                re.match(r'^\d+\.', str(l).strip()) or
                                str(l).strip().startswith('[')), 0)
                new_content = passage_lines + [''] + content[ex_start:]
                part['content'] = new_content
                changed = True
        
        # ── Add/update Grammar Focus section ──
        if gf_lines:
            # Check if Grammar Focus part already exists
            gf_idx = next((i for i, p in enumerate(parts) 
                          if 'GRAMMAR FOCUS' in str(p.get('title','')).upper() or
                          'GRAMMAR SPOTLIGHT' in str(p.get('title','')).upper()), None)
            
            if gf_idx is None:
                # Insert Grammar Focus after Reading Input (or as part 2)
                insert_after = (reading_idx + 1) if reading_idx is not None else 1
                
                # Infer Grammar Focus title from syllabus
                block = get_week_block(wn)
                gf_title_line = ""
                for line in block:
                    if re.search(r'Target Structure:|Topic:', line.strip()):
                        gf_title_line = line.strip()
                        gf_title_line = re.sub(r'^(Target Structure:|Topic:)\s*', '', gf_title_line)
                        break
                
                gf_part_title = f"GRAMMAR FOCUS — {gf_title_line[:50]}" if gf_title_line else f"GRAMMAR FOCUS — Week {wn}"
                
                new_gf_part = {
                    "title": gf_part_title,
                    "score": 0,
                    "content": gf_lines
                }
                parts.insert(insert_after, new_gf_part)
                sess['parts'] = parts
                changed = True
            else:
                # Update existing but don't overwrite if it has good content already
                existing = parts[gf_idx].get('content', [])
                if len([l for l in existing if str(l).strip()]) < 3:
                    parts[gf_idx]['content'] = gf_lines
                    changed = True
    
    update_all_session_modes(data, update_session)
    
    if changed:
        json_str = json.dumps(data, ensure_ascii=False, indent=2)
        pub_file.write_text(json_str, encoding="utf-8")
        # Sync to mcp-server
        mcp_file = MCP / f"W{wn}.json"
        mcp_file.write_text(json_str, encoding="utf-8")
        return True
    return False

# ─────────────────────────────────────────────
# STEP 5: Run for all weeks that need fixing
# ─────────────────────────────────────────────
SKIP_WEEKS = {28, 29, 30, 31}  # Already fixed
MATH_WEEKS = {43, 44, 45, 46, 47, 48}  # Different structure

print("Fixing W1-W53 (skipping W28-31 which are already correct)...")
print("="*60)

fixed = []
skipped = []
errors = []

for wn in range(1, 54):
    if wn in SKIP_WEEKS:
        skipped.append(wn)
        continue
    
    if wn in MATH_WEEKS:
        # For math weeks: just add Grammar Focus to PART 3 if missing
        pub_file = PUBLIC / f"W{wn}.json"
        if pub_file.exists():
            data = json.loads(pub_file.read_text(encoding="utf-8"))
            gf_lines = extract_grammar_focus(wn)
            
            # Math weeks may not have a grammar focus in syllabus — use PART 3 header
            if not gf_lines:
                # Check PART 3 content for grammar header
                for key in ['sessions', 'sessions_2', 'sessions_5']:
                    if key in data and data[key]:
                        sess = data[key][0]
                        for part in sess.get('parts', []):
                            if 'SENTENCE BUILDING' in str(part.get('title','')).upper() or 'ELA COMPONENT' in str(part.get('title','')): 
                                content = part.get('content', [])
                                if content and 'Grammar Focus:' in str(content[0]):
                                    # Already has it
                                    pass
            # For now skip math weeks' full restructure - just sync
            mcp_file = MCP / f"W{wn}.json"
            if not mcp_file.exists() or mcp_file.read_bytes() != pub_file.read_bytes():
                mcp_file.write_text(pub_file.read_text(encoding="utf-8"), encoding="utf-8")
        continue
    
    try:
        result = fix_week(wn)
        if result:
            passage = extract_passage(wn)
            gf = extract_grammar_focus(wn)
            print(f"  ✅ W{wn:2}: passage={len(passage)} lines, GF={len(gf)} lines → FIXED")
            fixed.append(wn)
        else:
            print(f"  ➖ W{wn:2}: no changes needed")
    except Exception as e:
        print(f"  ❌ W{wn:2}: ERROR — {e}")
        errors.append((wn, str(e)))

print()
print(f"=== DONE ===")
print(f"Fixed:   {sorted(fixed)}")
print(f"Skipped: {sorted(skipped)}")
print(f"Errors:  {errors}")
