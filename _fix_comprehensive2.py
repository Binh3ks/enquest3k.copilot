"""
Comprehensive fix for W26-W36 issues:
1. Remove PART 4 duplicate Cambridge placeholder lines
2. Add numbers to L2 items in PART 3 (W26/W27/W29/W31/W35/W36)
3. Fix Portfolio Extension - add proper instructions (W29)
4. Add Portfolio homework section to W28/W31/W35/W36 PART 9
"""
import json, re, os, shutil

WEEKS_ALL = list(range(26, 37))

# ─── PORTFOLIO CONTENT ────────────────────────────────────────────────────────
# Per-week portfolio content for homework section
# Format: (week, session_idx) -> (header, sentences)
PORTFOLIO_HW = {
    # W28 - transport/hare/tortoise theme
    28: {
        0: {  # S1
            'header': 'Portfolio (Story Connection):',
            'items': [
                "Write 1 sentence about the hare using a past tense verb (ran/took/woke):",
                "____________________________________________________________",
                "Write 1 sentence about a transport vehicle using a past tense verb (rode/sailed/drove):",
                "____________________________________________________________"
            ]
        },
        1: {  # S2
            'header': 'Portfolio (Story Reflection):',
            'items': [
                "Why did the tortoise win? Write 1-2 sentences using past tense verbs:",
                "____________________________________________________________",
                "Write 1 sentence comparing two transport vehicles using 'faster than':",
                "____________________________________________________________"
            ]
        },
        2: {  # S3
            'header': 'Portfolio (Mastery — My Race Story):',
            'items': [
                "Write the beginning of your own race story. Use 2 irregular past tense verbs:",
                "____________________________________________________________",
                "Write the ending. Who won and why?",
                "____________________________________________________________"
            ]
        }
    },
    # W31 - senses/forest theme
    31: {
        0: {  # S1
            'header': 'Portfolio (Senses in the Forest):',
            'items': [
                "Write 1 sentence about something you SAW in the forest (use 'saw'):",
                "____________________________________________________________",
                "Write 1 sentence about something you HEARD (use 'heard'):",
                "____________________________________________________________"
            ]
        },
        1: {  # S2
            'header': 'Portfolio (Senses Reflection):',
            'items': [
                "Write 1 sentence about something you FELT (use 'felt'):",
                "____________________________________________________________",
                "Write 1 sentence about something you SMELT (use 'smelt'):",
                "____________________________________________________________"
            ]
        },
        2: {  # S3
            'header': 'Portfolio (Mastery — Sensory Story):',
            'items': [
                "Write 2 sentences about an adventure using at least 2 sense verbs (saw/heard/felt/smelt):",
                "____________________________________________________________",
                "____________________________________________________________"
            ]
        }
    },
    # W35 - mixed verbs/best day theme
    35: {
        0: {  # S1
            'header': 'Portfolio (My Best Day):',
            'items': [
                "Write 1 sentence about what you did on your best day (use 'went' or 'saw'):",
                "____________________________________________________________",
                "Write 1 sentence about how you felt (use 'felt'):",
                "____________________________________________________________"
            ]
        },
        1: {  # S2
            'header': 'Portfolio (At the Zoo):',
            'items': [
                "Write 1 sentence about an animal you saw at the zoo (use 'saw'):",
                "____________________________________________________________",
                "Write 1 sentence about what you made or gave (use 'made' or 'gave'):",
                "____________________________________________________________"
            ]
        },
        2: {  # S3
            'header': 'Portfolio (Mastery — Perfect Saturday):',
            'items': [
                "Write 2 sentences about a perfect Saturday using at least 3 different irregular past verbs:",
                "____________________________________________________________",
                "____________________________________________________________"
            ]
        }
    },
    # W36 - Max's adventure book theme
    36: {
        0: {  # S1
            'header': 'Portfolio (Adventure Book — Part 1):',
            'items': [
                "Write 1 sentence about an adventure you went on (use 'went' or 'saw'):",
                "____________________________________________________________",
                "Write 1 sentence about how you felt during the adventure (use 'felt'):",
                "____________________________________________________________"
            ]
        },
        1: {  # S2
            'header': 'Portfolio (Adventure Book — Part 2):',
            'items': [
                "Write 1 sentence about something you lost or found (use 'lost' or 'found'):",
                "____________________________________________________________",
                "Write 1 sentence about a feeling in your story (use 'saw' or 'felt'):",
                "____________________________________________________________"
            ]
        },
        2: {  # S3
            'header': 'Portfolio (Adventure Book — Presentation):',
            'items': [
                "Write 2 sentences for your adventure book using at least 3 different irregular past verbs:",
                "____________________________________________________________",
                "____________________________________________________________"
            ]
        }
    }
}

# Portfolio Extension instructions for W29
PORTFOLIO_EXT_INSTRUCTIONS = {
    29: {
        0: "Using the verbs you practised this session, write 2 NEW sentences about a different trip (not the beach). Use at least 2 irregular past verbs.",
        1: "Write 2 sentences about a mountain or nature trip. Use at least 2 irregular past verbs (went/ran/came/flew) and a sequence word (First/Then/Finally).",
        2: "Write 2 sentences connecting this week's grammar to the STEM topic (animal locomotion). Example: 'The eagle flew high to find food. The tortoise went slowly but steadily.'"
    }
}


def remove_part4_placeholders(content):
    """Remove duplicate Cambridge placeholder lines from PART 4 content."""
    seen = set()
    new_content = []
    for line in content:
        ls = str(line).strip()
        if ls.startswith('—') and 'Cambridge' in ls:
            if ls not in seen:
                seen.add(ls)
                # Don't add it - it's a placeholder, remove all
            # Always skip placeholders
            continue
        new_content.append(line)
    return new_content


def add_l2_numbers(content):
    """Add 1. 2. 3. numbers to L2 items if they don't have them."""
    # Find L2 section boundaries
    l2_start = None
    l2_end = None
    for i, line in enumerate(content):
        ls = str(line).strip()
        if re.match(r'(\[O\]\s+)?L2\s*[—\-]', ls):
            l2_start = i + 1
        elif l2_start is not None and re.match(r'(\[O\]\s+)?L[3-5]\s*[—\-]|⬛\s*SPEAKING', ls):
            l2_end = i
            break
    
    if l2_start is None:
        return content
    if l2_end is None:
        l2_end = len(content)
    
    # Check if items already numbered
    items_in_l2 = [str(content[i]) for i in range(l2_start, l2_end)
                   if str(content[i]).strip() and not str(content[i]).strip().startswith('→')]
    
    already_numbered = sum(1 for item in items_in_l2 if re.match(r'^\d+\.', item.strip()))
    
    if already_numbered > 0:
        return content  # Already numbered, skip
    
    # Add numbers to non-arrow, non-empty items
    new_content = list(content)
    num = 1
    for i in range(l2_start, l2_end):
        ls = str(new_content[i]).strip()
        if ls and not ls.startswith('→') and not ls.startswith('⬛') and not ls.startswith('📋'):
            new_content[i] = f'{num}. {ls}'
            num += 1
    
    return new_content


def fix_portfolio_extension(content, week, session_idx):
    """Add instructions to Portfolio Extension (2 items) if missing."""
    for i, line in enumerate(content):
        if 'Portfolio Extension' in str(line):
            # Check if next line has real instructions
            next_content = [str(content[j]) for j in range(i+1, min(i+3, len(content)))]
            has_instr = any(len(nl) > 30 and 'Sentence' not in nl and '__' not in nl for nl in next_content)
            if not has_instr:
                instr = PORTFOLIO_EXT_INSTRUCTIONS.get(week, {}).get(session_idx, 
                    "Write 2 sentences using the irregular past verbs practised in this session. Try to connect them to the story.")
                content.insert(i+1, instr)
            break
    return content


def add_portfolio_to_homework(content, week, session_idx):
    """Add portfolio section before Video Challenge in PART 9."""
    # Check if portfolio already exists
    has_portfolio = any('portfolio' in str(l).lower() for l in content)
    if has_portfolio:
        return content
    
    # Find insertion point: before 🎥 VIDEO CHALLENGE or before Parent Signature
    insert_idx = None
    for i, line in enumerate(content):
        ls = str(line)
        if ls.startswith('🎥') and 'VIDEO CHALLENGE' in ls:
            insert_idx = i
            break
    if insert_idx is None:
        for i, line in enumerate(content):
            if '(Parent Signature' in str(line) or 'Parent Signature' in str(line):
                insert_idx = i
                break
    if insert_idx is None:
        insert_idx = len(content) - 2  # before last 2 lines
    
    # Get portfolio content
    portfolio_data = PORTFOLIO_HW.get(week, {}).get(session_idx)
    if not portfolio_data:
        # Generic fallback
        portfolio_data = {
            'header': 'Portfolio (Homework Connection):',
            'items': [
                "Write 1 sentence using an irregular past tense verb from this week:",
                "____________________________________________________________",
                "Write 1 sentence about the story or topic using your own words:",
                "____________________________________________________________"
            ]
        }
    
    portfolio_lines = ['', portfolio_data['header']] + portfolio_data['items'] + ['']
    for j, pl in enumerate(portfolio_lines):
        content.insert(insert_idx + j, pl)
    
    return content


def fix_week(week):
    path_mcp = f'mcp-server/data/lessons/W{week}.json'
    path_pub = f'public/data/lessons/W{week}.json'
    
    if not os.path.exists(path_mcp):
        print(f'W{week}: NOT FOUND, skipping')
        return False
    
    with open(path_mcp) as f:
        data = json.load(f)
    
    changed = False
    
    for si, session in enumerate(data.get('sessions', [])):
        for p in session.get('parts', []):
            title = p.get('title', '')
            content = p.get('content', [])
            
            if not isinstance(content, list):
                continue
            
            # Fix 1: Remove PART 4 placeholder lines
            if 'PART 4' in title:
                new_content = remove_part4_placeholders(content)
                if len(new_content) != len(content):
                    print(f'  W{week} S{si+1} PART4: removed {len(content)-len(new_content)} placeholder(s)')
                    p['content'] = new_content
                    changed = True
            
            # Fix 2: Add numbers to L2 items in PART 3
            if 'PART 3' in title:
                new_content = add_l2_numbers(content)
                if new_content != content:
                    print(f'  W{week} S{si+1} PART3: added L2 numbers')
                    p['content'] = new_content
                    changed = True
            
            # Fix 3: Portfolio Extension instructions
            if ('PART 9' in title or 'HOMEWORK' in title) and week == 29:
                new_content = fix_portfolio_extension(list(content), week, si)
                if new_content != content:
                    print(f'  W{week} S{si+1} PART9: added Portfolio Extension instructions')
                    p['content'] = new_content
                    changed = True
            
            # Fix 4: Add Portfolio to homework (W28/W31/W35/W36)
            if ('PART 9' in title or 'HOMEWORK' in title) and week in [28, 31, 35, 36]:
                new_content = add_portfolio_to_homework(list(content), week, si)
                if new_content != content:
                    print(f'  W{week} S{si+1} PART9: added Portfolio section')
                    p['content'] = new_content
                    changed = True
    
    if changed:
        with open(path_mcp, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        shutil.copy(path_mcp, path_pub)
        print(f'  -> saved W{week}')
    
    return changed


def update_lesson_plans():
    plans = {}
    for w in range(1, 54):
        p = f'mcp-server/data/lessons/W{w}.json'
        if os.path.exists(p):
            with open(p) as f:
                plans[str(w)] = json.load(f)
    with open('public/data/lessonPlans.json', 'w', encoding='utf-8') as f:
        json.dump(plans, f, ensure_ascii=False, indent=2)
    print('Updated lessonPlans.json')


if __name__ == '__main__':
    any_changed = False
    for w in WEEKS_ALL:
        print(f'\nProcessing W{w}...')
        if fix_week(w):
            any_changed = True
    
    if any_changed:
        update_lesson_plans()
    
    print('\n=== VERIFICATION ===')
    for w in WEEKS_ALL:
        if not os.path.exists(f'mcp-server/data/lessons/W{w}.json'):
            continue
        with open(f'mcp-server/data/lessons/W{w}.json') as f:
            data = json.load(f)
        issues = []
        for si, s in enumerate(data['sessions']):
            for p in s['parts']:
                title = p.get('title', '')
                content = p.get('content', [])
                if 'PART 4' in title:
                    ph = sum(1 for l in content if str(l).strip().startswith('—') and 'Cambridge' in str(l))
                    if ph > 0:
                        issues.append(f'S{si+1} PART4: {ph} placeholders remain')
                if 'PART 9' in title or 'HOMEWORK' in title:
                    if not any('portfolio' in str(l).lower() for l in content):
                        if w in [28, 31, 35, 36]:
                            issues.append(f'S{si+1} PART9: missing portfolio')
        if issues:
            print(f'W{w}: {issues}')
        else:
            print(f'W{w}: OK')
    print('Done.')
