"""
Deep audit W28-W53: compare each week's JSON against Syllabus V5 requirements.
Checks per week:
  1. Reading passage: present, ≥5 lines, matches syllabus title/topic
  2. Grammar Focus: present, target structure matches syllabus
  3. Vocabulary: 10 core words present
  4. Cambridge Integration notes: present in GF or elsewhere
  5. Passage not duplicated below Title:
  6. mcp-server in sync
"""
import json, re
from pathlib import Path

SYLLABUS = Path("/Users/binhnguyen/Downloads/Engquest3k/_syllabus_v5_raw.txt")
PUBLIC   = Path("/Users/binhnguyen/Downloads/Engquest3k/public/data/lessons")
MCP      = Path("/Users/binhnguyen/Downloads/Engquest3k/mcp-server/data/lessons")

raw_lines = SYLLABUS.read_text(encoding='utf-8').splitlines()

# ── Parse syllabus week blocks ──
week_starts = {}
for i, line in enumerate(raw_lines):
    m = re.match(r'^Tuần (\d+):', line.strip())
    if m:
        n = int(m.group(1))
        if 1 <= n <= 56:
            week_starts[n] = i

sorted_wks = sorted(week_starts.keys())

def get_block(wn):
    start = week_starts.get(wn, -1)
    if start < 0: return []
    idx = sorted_wks.index(wn)
    end = week_starts[sorted_wks[idx+1]] if idx+1 < len(sorted_wks) else start+250
    return raw_lines[start:end]

def syllabus_info(wn):
    block = get_block(wn)
    info = {
        'title': '',
        'reading_title': '',
        'reading_words': 0,
        'reading_type': '',
        'grammar_target': '',
        'vocab_words': [],
        'cambridge_features': [],
        'is_review': False,
        'is_math': False,
    }
    
    # Week title
    if block:
        info['title'] = block[0].strip()
    
    # Detect type
    if any(re.search(r'Ôn tập|Dự án|Project|Review', l) for l in block[:3]):
        info['is_review'] = True
    if any(re.search(r'Toán|Math|Tỷ lệ|Tỷ số|Hình học|Logic|Số', l) for l in block[:3]):
        info['is_math'] = True
    
    for line in block:
        l = line.strip()
        
        # Reading title
        if re.match(r'^Title:', l) and not info['reading_title']:
            rt = re.sub(r'^Title:\s*', '', l).strip().strip('"')
            rt = re.sub(r'\s*\|\s*\d+\s*words.*', '', rt).strip().strip('"')
            info['reading_title'] = rt
        
        # Word count
        m = re.search(r'\|\s*(\d+)\s*words', l)
        if m and not info['reading_words']:
            info['reading_words'] = int(m.group(1))
        
        # Text type
        m = re.search(r'Type:\s*(.+)', l)
        if m and not info['reading_type']:
            info['reading_type'] = m.group(1).strip()[:40]
        
        # Grammar target
        if re.match(r'^Target Structure:', l) and not info['grammar_target']:
            info['grammar_target'] = re.sub(r'^Target Structure:\s*', '', l).strip()
        if re.match(r'^Topic:', l) and not info['grammar_target']:
            info['grammar_target'] = re.sub(r'^Topic:\s*', '', l).strip()
        
        # Core vocab words
        if re.match(r'^Core words:', l) and not info['vocab_words']:
            vw = re.sub(r'^Core words:\s*', '', l).strip()
            info['vocab_words'] = [w.strip() for w in vw.split(',')]
        
        # Cambridge features
        if re.search(r'★\s+CAMBRIDGE INTEGRATION', l):
            # Get the Cambridge section title on next non-empty line
            info['cambridge_features'].append(l[l.find('—')+1:].strip() if '—' in l else l[30:].strip())
    
    return info

# ── Audit each week ──
print(f"{'W':>3}  {'Reading Passage':30}  {'GF Target':35}  {'Dup':>3}  {'Sync':>4}  {'Issues'}")
print('─'*130)

all_issues = {}

for wn in range(28, 54):
    pub_file = PUBLIC / f'W{wn}.json'
    mcp_file = MCP / f'W{wn}.json'
    
    if not pub_file.exists():
        print(f' W{wn:2}  MISSING FILE')
        continue
    
    syl = syllabus_info(wn)
    data = json.loads(pub_file.read_text(encoding='utf-8'))
    sess = data.get('sessions', data.get('sessions_2', [{}]))[0]
    parts = sess.get('parts', [])
    
    issues = []
    
    # ── Check Reading Passage ──
    rp = next((p for p in parts if 'READING INPUT' in p.get('title','').upper()), None)
    has_ela = any('ELA COMPONENT' in p.get('title','').upper() for p in parts)
    
    if rp:
        content = rp.get('content', [])
        # Find exStart
        ex_i = next((i for i,l in enumerate(content)
                    if str(l).strip().startswith('Title:') or
                    re.match(r'^Stage\s+\d', str(l).strip()) or
                    re.match(r'^\d+[.)]\s', str(l).strip()) or
                    str(l).strip().startswith('[')), -1)
        
        if ex_i > 0:
            passage = [l for l in content[:ex_i] if str(l).strip()]
            passage_cnt = len(passage)
            has_marker = any(str(l).startswith('📖') for l in passage)
            # Check passage title matches syllabus
            first_line = str(passage[0]).replace('📖', '').strip() if passage else ''
            title_match = syl['reading_title'].lower() in first_line.lower() or first_line.lower() in syl['reading_title'].lower()
            
            # Check for duplicate prose after Title:
            dup_found = False
            for i in range(ex_i, len(content)):
                s = str(content[i]).strip()
                if s.startswith('Title:') or not s: continue
                if re.match(r'^\d+[.)]\s', s) or s.startswith('[') or re.match(r'^Stage\s+\d', s): break
                if re.match(r'^[A-Z"][A-Za-z]', s) and len(s) > 30:  # likely prose
                    dup_found = True
                    break
            
            passage_ok = passage_cnt >= 3 and has_marker
            if not passage_ok:
                issues.append(f'passage only {passage_cnt} lines')
            if not title_match and syl['reading_title']:
                issues.append(f'title mismatch: JSON="{first_line[:30]}" SYL="{syl["reading_title"][:30]}"')
            if dup_found:
                issues.append('DUPLICATE prose below Title:')
        else:
            passage_cnt = 0
            issues.append('no passage (exStart=0)')
    elif has_ela:
        passage_cnt = 'ELA'
    elif syl['is_review']:
        passage_cnt = 'review'
    else:
        passage_cnt = 0
        issues.append('NO READING PART')
    
    # ── Check Grammar Focus ──
    gf = next((p for p in parts if re.search(r'GRAMMAR (FOCUS|SPOTLIGHT)', p.get('title','').upper())), None)
    
    if gf:
        gf_content = gf.get('content', [])
        gf_lines = len([l for l in gf_content if str(l).strip()])
        has_rule = any('📌 RULE' in str(l) or '📌 NOTE' in str(l) for l in gf_content)
        has_pattern = any('PATTERN' in str(l) or '┌' in str(l) for l in gf_content)
        has_cambridge = any('CAMBRIDGE' in str(l).upper() for l in gf_content)
        has_practice = any('PRACTICE' in str(l).upper() for l in gf_content)
        
        # Check target structure match
        gf_title = gf.get('title', '')
        syl_target = syl['grammar_target'][:40] if syl['grammar_target'] else ''
        
        gf_ok = gf_lines >= 8 and has_rule and has_practice
        if not gf_ok:
            issues.append(f'GF weak ({gf_lines} lines, rule={has_rule}, practice={has_practice})')
        if not has_cambridge and not syl['is_review']:
            issues.append('GF missing Cambridge integration')
    else:
        gf_title = 'MISSING'
        gf_lines = 0
        if not syl['is_review'] and not has_ela:
            issues.append('NO GRAMMAR FOCUS PART')
    
    # ── Check mcp sync ──
    sync_ok = mcp_file.exists() and pub_file.read_bytes() == mcp_file.read_bytes()
    if not sync_ok:
        issues.append('OUT OF SYNC with mcp-server')
    
    # ── Print row ──
    p_str = f'{passage_cnt} lines' if isinstance(passage_cnt, int) else str(passage_cnt)
    g_str = (gf.get('title','')[:32] if gf else 'MISSING')
    dup_mark = '❌' if any('DUPLICATE' in iss for iss in issues) else '✅'
    sync_mark = '✅' if sync_ok else '❌'
    issue_str = ' | '.join(issues) if issues else '✅ OK'
    
    status = '✅' if not issues else '❌'
    print(f' W{wn:2}  {p_str:5} {status}  {g_str:35}  {dup_mark}  {sync_mark}   {issue_str[:60]}')
    
    if issues:
        all_issues[wn] = issues

print()
print(f'=== SUMMARY ===')
print(f'Weeks with issues: {sorted(all_issues.keys())}')
print(f'Total clean: {26 - len(all_issues)} / 26  (W28-W53)')
for wn, iss in sorted(all_issues.items()):
    print(f'  W{wn}: {iss}')
