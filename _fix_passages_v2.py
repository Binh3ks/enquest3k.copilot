"""
Fix v2: Better passage extraction — handles both 'Text (N words):' and 'Story: ...' formats.
Also re-extracts W32-W53 where only title was found.
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
        if 1 <= n <= 53:
            week_starts[n] = i

sorted_weeks = sorted(week_starts.keys())

def get_week_block(wn):
    start = week_starts[wn]
    wkeys = sorted_weeks
    idx = wkeys.index(wn)
    end = week_starts[wkeys[idx+1]] if idx+1 < len(wkeys) else start + 200
    return raw_lines[start:end]


def split_into_sentences(text, max_chars=80):
    """Split a long sentence block into readable lines of ~max_chars."""
    sentences = re.split(r'(?<=[.!?"])\s+(?=[A-Z"])', text)
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
    """Extract passage lines from syllabus — handles W1-W27 (multi-line Text) and W28+ (single-line Story:)."""
    block = get_week_block(wn)
    
    reading_start = -1
    for i, line in enumerate(block):
        if re.search(r'READING INPUT|Reading Input|\.1\s+READING', line):
            reading_start = i
            break
    if reading_start == -1:
        return []
    
    title_line = ""
    text_lines = []
    found_story = False
    in_text_block = False
    
    for line in block[reading_start:reading_start+40]:
        l = line.strip()
        
        # Extract title — clean off "| N words | Type: ..."
        if re.search(r'^Title:', l):
            raw_title = re.sub(r'^Title:\s*', '', l).strip().strip('"')
            # Remove " | 130 words | Type: Recount" suffix
            raw_title = re.sub(r'\s*\|\s*\d+ words.*', '', raw_title).strip().strip('"')
            title_line = raw_title
        
        # Format A: "Story: full text on one line"
        if l.startswith('Story:') and not found_story:
            story_text = l[len('Story:'):].strip()
            if len(story_text) > 20:
                text_lines = split_into_sentences(story_text)
                found_story = True
                break  # Got everything
        
        # Format B: "Text (60 words):" followed by multiple lines
        if re.match(r'^Text\s*[\(\d]', l) and ':' in l and not found_story:
            in_text_block = True
            # Text might be on same line after the colon
            after_colon = l.split(':', 1)[-1].strip()
            if after_colon:
                text_lines.append(after_colon)
            continue
        
        if in_text_block:
            if re.search(r'^Comprehension|^Text Type|^Grammar in context|^★|^▶|^\d+\.\d+\s|^Key ', l):
                break
            if l:
                text_lines.append(l)
    
    # Build result
    result = []
    if title_line:
        result.append(f"📖 {title_line}")
    result.extend(text_lines)
    return result


def extract_grammar_focus(wn):
    """Extract Grammar Focus content for this week."""
    block = get_week_block(wn)
    
    gf_start = -1
    for i, line in enumerate(block):
        if re.search(r'GRAMMAR FOCUS|Grammar Focus|GRAMMAR SPOTLIGHT|\.2\s+GRAMMAR', line):
            gf_start = i
            break
    if gf_start == -1:
        return []
    
    target_structure = ""
    topic_note = ""
    patterns = []
    examples = []
    cambridge_notes = []
    current_section = None
    
    stop_pattern = r'VOCABULARY FOCUS|WRITING TASK|SPEAKING TASK|\.3\s+VOCAB|\.4\s+WRITING|\.5\s+SPEAKING|^Tuần \d+'
    
    for line in block[gf_start:gf_start+60]:
        l = line.strip()
        if not l:
            continue
        # Stop at next major section
        if re.search(stop_pattern, l) and gf_start > 0:
            break
        
        if re.search(r'^Target Structure:', l):
            target_structure = re.sub(r'^Target Structure:\s*', '', l).strip()
            current_section = None
        elif re.search(r'^Topic:', l):
            topic_note = re.sub(r'^Topic:\s*', '', l).strip()
            current_section = None
        elif re.search(r'^Verbs?:', l):
            # Verb list for irregular verb weeks
            verb_list = re.sub(r'^Verbs?:\s*', '', l).strip()
            patterns.append(verb_list[:100])
            current_section = None
        elif re.search(r'^Note:', l) or re.search(r'^Note to class:', l):
            note = re.sub(r'^Note(?: to class)?:\s*', '', l).strip()
            examples.append(f"📌 {note}")
            current_section = None
        elif l.startswith('Pattern:'):
            current_section = 'pattern'
        elif l.startswith('Examples:') or l.startswith('Example:'):
            current_section = 'examples'
        elif l.startswith('Practice Activities:') or l.startswith('Activities:') or l.startswith('Activity:'):
            current_section = 'activities'
        elif re.search(r'★\s+CAMBRIDGE', l):
            current_section = 'cambridge'
        elif l.startswith('▶') or l.startswith('->'):
            if current_section == 'cambridge':
                cambridge_notes.append(l[:100])
        elif current_section == 'pattern' and l and not re.match(r'^[A-Z][a-z]+\s*:', l):
            if not l.startswith('★') and not l.startswith('▶'):
                patterns.append(l[:80])
        elif current_section == 'examples' and l and not re.match(r'^[A-Z][a-z]+\s*:', l):
            if not l.startswith('★') and not l.startswith('▶'):
                examples.append(l[:80])
    
    # Build Grammar Focus content
    result = []
    
    main_topic = target_structure or topic_note
    if main_topic:
        result.append(f"📌 RULE: {main_topic}")
        result.append("")
    
    if patterns:
        result.append("┌─────────────────────────────────────────┐")
        result.append("│  PATTERN                                │")
        result.append("├─────────────────────────────────────────┤")
        for p in patterns[:5]:
            padded = f"  {p}"
            result.append(f"│{padded:<41} │")
        result.append("└─────────────────────────────────────────┘")
        result.append("")
    
    if examples:
        result.append("EXAMPLES:")
        for ex in examples[:5]:
            if str(ex).startswith('📌'):
                result.append(f"  {ex}")
            else:
                result.append(f"  ✎ {ex}")
        result.append("")
    
    if cambridge_notes:
        result.append("★ CAMBRIDGE INTEGRATION:")
        for note in cambridge_notes[:4]:
            result.append(f"  {note}")
        result.append("")
    
    result.append("📌 PRACTICE:")
    result.append("  1. Teacher models → Students repeat")
    result.append("  2. Substitution drill with the pattern above")
    result.append("  3. Pair practice — ask & answer")
    
    return result


# ── Main fix loop ──
SKIP_WEEKS = {28, 29, 30, 31}  # Already fixed
# Weeks that still need passage fixing (W1-W13 were fixed with multi-line format already)
# We need to re-check all and fix those that still have 0-1 passage lines

PUBLIC_LESSON_FILES = sorted(PUBLIC.glob("W*.json"), 
                              key=lambda p: int(re.search(r'W(\d+)', p.stem).group(1)))

print("Re-checking and fixing all W1-W53...")
print("="*60)
fixed = []
already_ok = []
errors = []

for pub_file in PUBLIC_LESSON_FILES:
    wn = int(re.search(r'W(\d+)', pub_file.stem).group(1))
    if not (1 <= wn <= 53):
        continue
    if wn in SKIP_WEEKS:
        already_ok.append(wn)
        continue
    
    try:
        data = json.loads(pub_file.read_text(encoding="utf-8"))
        changed = False
        
        passage_lines = extract_passage(wn)
        gf_lines = extract_grammar_focus(wn)
        
        for key in ['sessions', 'sessions_2', 'sessions_5']:
            if key not in data or not data[key]:
                continue
            for sess in data[key]:
                parts = sess.get('parts', [])
                
                # ── Fix READING INPUT ──
                reading_idx = next((i for i, p in enumerate(parts)
                                   if 'READING INPUT' in str(p.get('title','')).upper()), None)
                
                if reading_idx is not None and passage_lines:
                    part = parts[reading_idx]
                    content = list(part.get('content', []))
                    
                    # Check current passage count
                    ex_i = next((i for i, l in enumerate(content)
                                if str(l).strip().startswith('Title:') or
                                re.match(r'^Stage\s+\d', str(l).strip()) or
                                re.match(r'^\d+\.', str(l).strip()) or
                                str(l).strip().startswith('[')), 0)
                    
                    current_passage = [l for l in content[:ex_i] if str(l).strip()]
                    # Is passage adequate? (More than just a 📖 title line)
                    needs_fix = len(current_passage) < 2 or \
                                (len(current_passage) == 1 and '|' in str(current_passage[0]))
                    
                    if needs_fix:
                        # Remove any partial passage already there
                        # Find where exercises truly start
                        clean_content = content[ex_i:] if ex_i > 0 else content
                        # Remove leading 📖 lines if already there
                        while clean_content and str(clean_content[0]).strip().startswith('📖'):
                            clean_content = clean_content[1:]
                        while clean_content and not str(clean_content[0]).strip():
                            clean_content = clean_content[1:]
                        
                        new_content = passage_lines + [''] + clean_content
                        part['content'] = new_content
                        changed = True
                
                # ── Fix Grammar Focus ──
                if gf_lines:
                    gf_idx = next((i for i, p in enumerate(parts)
                                  if 'GRAMMAR FOCUS' in str(p.get('title','')).upper() or
                                  'GRAMMAR SPOTLIGHT' in str(p.get('title','')).upper()), None)
                    
                    if gf_idx is None:
                        # Insert after reading (or after part 0)
                        insert_after = (reading_idx + 1) if reading_idx is not None else 1
                        
                        # Build title
                        main_topic = ""
                        b = get_week_block(wn)
                        for line in b:
                            if re.search(r'^Target Structure:|^Topic:', line.strip()):
                                main_topic = re.sub(r'^(Target Structure:|Topic:)\s*', '', line.strip())[:60]
                                break
                        gf_title = f"GRAMMAR FOCUS — {main_topic}" if main_topic else f"GRAMMAR FOCUS — Week {wn}"
                        
                        new_gf = {"title": gf_title, "score": 0, "content": gf_lines}
                        parts.insert(insert_after, new_gf)
                        sess['parts'] = parts
                        changed = True
                    else:
                        # Update if content is thin
                        existing = parts[gf_idx].get('content', [])
                        if len([l for l in existing if str(l).strip()]) < 5:
                            parts[gf_idx]['content'] = gf_lines
                            changed = True
        
        if changed:
            json_str = json.dumps(data, ensure_ascii=False, indent=2)
            pub_file.write_text(json_str, encoding="utf-8")
            mcp_file = MCP / pub_file.name
            mcp_file.write_text(json_str, encoding="utf-8")
            
            p_cnt = len(passage_lines)
            g_cnt = len([l for l in gf_lines if l.strip()])
            print(f"  ✅ W{wn:2}: passage={p_cnt} lines, GF={g_cnt} items → FIXED")
            fixed.append(wn)
        else:
            already_ok.append(wn)
    
    except Exception as e:
        import traceback
        print(f"  ❌ W{wn:2}: {e}")
        traceback.print_exc()
        errors.append((wn, str(e)))

print()
print(f"Fixed:    {sorted(fixed)}")
print(f"OK:       {sorted(already_ok)}")
print(f"Errors:   {errors}")
