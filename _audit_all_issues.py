import json, re

# Comprehensive audit of issues across W26-W36
issues = {}

for w in range(26, 37):
    try:
        with open(f'mcp-server/data/lessons/W{w}.json') as f:
            d = json.load(f)
    except:
        print(f'W{w}: FILE NOT FOUND')
        continue
    
    week_issues = []
    
    for si, s in enumerate(d['sessions']):
        for p in s['parts']:
            title = p.get('title', '')
            content = p.get('content', [])
            
            # Issue 1: PART 4 placeholder lines
            if 'PART 4' in title:
                placeholders = [l for l in content if str(l).strip().startswith('—') and 'Cambridge' in str(l)]
                if placeholders:
                    week_issues.append(f'S{si+1} PART4: {len(placeholders)} placeholder lines')
            
            # Issue 2: Double numbering
            if 'PART 9' in title or 'HOMEWORK' in title:
                doubles = [(i, str(l)[:60]) for i, l in enumerate(content) if re.match(r'^\d+\.\s+\d+\.', str(l).strip())]
                if doubles:
                    week_issues.append(f'S{si+1} PART9: DOUBLE NUMBERING at lines {[i for i,_ in doubles[:5]]}')
                
                # Portfolio Extension  
                for i, l in enumerate(content):
                    if 'Portfolio Extension' in str(l):
                        next_lines = [str(content[j]) for j in range(i+1, min(i+4, len(content)))]
                        has_instructions = any(len(str(nl)) > 20 and not str(nl).startswith('Sentence') for nl in next_lines[:2])
                        if not has_instructions:
                            week_issues.append(f'S{si+1} PART9: Portfolio Extension NO INSTRUCTIONS')
                        break
                
                # Check if Portfolio mentioned at all
                has_portfolio = any('portfolio' in str(l).lower() for l in content)
                if not has_portfolio:
                    week_issues.append(f'S{si+1} PART9: No Portfolio section at all')
            
            # Issue 3: PART 3 L-sections without numbers
            if 'PART 3' in title:
                cur_l = None
                cur_l_start = None
                for i, line in enumerate(content):
                    ls = str(line)
                    m = re.match(r'(\[O\]\s+)?L(\d)\s*[—\-]', ls.strip())
                    if m:
                        cur_l = int(m.group(2))
                        cur_l_start = i
                # Check L2 specifically - are items numbered?
                in_l2 = False
                l2_items = []
                cur_section = None
                for line in content:
                    ls = str(line)
                    m = re.match(r'(\[O\]\s+)?L(\d)\s*[—\-]', ls.strip())
                    if m:
                        cur_section = int(m.group(2))
                    elif cur_section == 2:
                        if ls.strip() and not ls.startswith('→') and not ls.startswith('⬛'):
                            l2_items.append(ls[:50])
                if l2_items:
                    numbered = sum(1 for item in l2_items if re.match(r'^\d+\.', item.strip()))
                    if numbered == 0 and len(l2_items) > 2:
                        week_issues.append(f'S{si+1} PART3: L2 items NOT numbered ({len(l2_items)} items)')
    
    if week_issues:
        print(f'\nW{w}:')
        for issue in week_issues:
            print(f'  - {issue}')
    else:
        print(f'W{w}: OK')
