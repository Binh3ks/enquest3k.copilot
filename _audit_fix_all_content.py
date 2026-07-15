#!/usr/bin/env python3
"""
Comprehensive audit & fix script for all week JS content files.
Fixes grammar, spelling, and meaning issues in-place.
"""

import os, re, glob, json

BASE = os.path.dirname(os.path.abspath(__file__))

# ─── Spelling corrections (case-insensitive match, preserve case) ────────────
SPELLING = {
    # British → American
    'colourful': 'colorful',
    'favourite': 'favorite',
    'colour':    'color',
    'colours':   'colors',
    'coloured':  'colored',
    'colouring': 'coloring',
    'neighbour': 'neighbor',
    'neighbours':'neighbors',
    'honour':    'honor',
    'honourable':'honorable',
    'behaviour': 'behavior',
    'behaviours':'behaviors',
    'humour':    'humor',
    'flavour':   'flavor',
    'flavours':  'flavors',
    'armour':    'armor',
    'harbour':   'harbor',
    'labour':    'labor',
    'marvellous':'marvelous',
    'travelling':'traveling',
    'travelled': 'traveled',
    'traveller': 'traveler',
    'modelling': 'modeling',
    'modelled':  'modeled',
    'cancelled': 'canceled',
    'catalogue': 'catalog',
    'centre':    'center',
    'centres':   'centers',
    'fibre':     'fiber',
    'litre':     'liter',
    'metre':     'meter',
    'metres':    'meters',
    'theatre':   'theater',
    'theatres':  'theaters',
    'programme': 'program',
    'programmes':'programs',
    'defence':   'defense',
    'offence':   'offense',
    'licence':   'license',
    'practise':  'practice',   # verb form
    'analyse':   'analyze',
    'recognise': 'recognize',
    'organise':  'organize',
    'realise':   'realize',
    'emphasise': 'emphasize',
    'apologise': 'apologize',
    'socialise': 'socialize',
    'normalise': 'normalize',
    'memorise':  'memorize',
    'exercise':  'exercise',   # already correct but keep
    'grey':      'gray',
    'greys':     'grays',
    # Common spelling errors
    'recieve':   'receive',
    'beutiful':  'beautiful',
    'beautifull':'beautiful',
    'seperate':  'separate',
    'definately':'definitely',
    'occured':   'occurred',
    'accomodate':'accommodate',
    'embarass':  'embarrass',
    'existance': 'existence',
    'independance':'independence',
    'knowlege':  'knowledge',
    'maintainance':'maintenance',
    'occurance': 'occurrence',
    'persistance':'persistence',
    'pronounciation':'pronunciation',
    'reccomend': 'recommend',
    'relevent':  'relevant',
    'responsability':'responsibility',
    'rythm':     'rhythm',
    'suprise':   'surprise',
    'untill':    'until',
    'wierd':     'weird',
    'wether':    'whether',
    'writng':    'writing',
    'studing':   'studying',
    'folowing':  'following',
    'tomorow':   'tomorrow',
    'tomorrows': "tomorrow's",
    'yesturday': 'yesterday',
    'becuase':   'because',
    'becouse':   'because',
    'freind':    'friend',
    'freinds':   'friends',
    'scholl':    'school',
    'scool':     'school',
    'lernig':    'learning',
    'somthing':  'something',
    'everyting': 'everything',
    'everythig': 'everything',
    'somwhere':  'somewhere',
    'differnt':  'different',
    'diferent':  'different',
    'importent': 'important',
    'languge':   'language',
    'languege':  'language',
    'stuent':    'student',
    'teahcer':   'teacher',
    'claasroom': 'classroom',
    'clasroom':  'classroom',
    'backpack':  'backpack',  # keep, already correct
    'notbook':   'notebook',
    'libary':    'library',
    'scintist':  'scientist',
    'wold':      'world',
    'worl':      'world',
    'leran':     'learn',
    'enjoi':     'enjoy',
    'enoy':      'enjoy',
    'happpy':    'happy',
    'hapyy':     'happy',
    'familly':   'family',
    'famliy':    'family',
    'moning':    'morning',
    'evning':    'evening',
    'anser':     'answer',
    'questoin':  'question',
    'sentance':  'sentence',
    'sentense':  'sentence',
    'grammer':   'grammar',
    'vocabluary':'vocabulary',
    'vocabualry':'vocabulary',
    'pronuncation':'pronunciation',
    'excercise': 'exercise',
    'exercice':  'exercise',
    'lisening':  'listening',
    'speaing':   'speaking',
    'writting':  'writing',
    'ridding':   'riding',  # careful - could be intentional, skip
    'swiming':   'swimming',
    'runing':    'running',
    'siting':    'sitting',
    'geting':    'getting',
    'begining':  'beginning',
    'hapening':  'happening',
    'prefered':  'preferred',
    'stoped':    'stopped',
    'droped':    'dropped',
    'tryed':     'tried',
    'enjoied':   'enjoyed',
    'stayied':   'stayed',
    'plaied':    'played',
    'learnd':    'learned',
}

# ─── Grammar fixes (regex pattern → replacement) ───────────────────────────
# These are applied to string values extracted from JS files
# Format: (pattern, replacement, description)
GRAMMAR_FIXES = [
    # Double determiners
    (r'\bin the my\b', 'in my', 'double-det: in the my → in my'),
    (r'\bin the his\b', 'in his', 'double-det: in the his → in his'),
    (r'\bin the her\b', 'in her', 'double-det: in the her → in her'),
    (r'\bin the our\b', 'in our', 'double-det: in the our → in our'),
    (r'\bin the their\b', 'in their', 'double-det: in the their → in their'),
    (r'\bin the your\b', 'in your', 'double-det: in the your → in your'),
    (r'\bat the my\b', 'at my', 'double-det: at the my → at my'),
    (r'\bon the my\b', 'on my', 'double-det: on the my → on my'),
    (r'\bof the my\b', 'of my', 'double-det: of the my → of my'),
    (r'\bthe my\b', 'my', 'double-det: the my → my'),
    (r'\bthe his\b', 'his', 'double-det: the his → his'),
    (r'\bthe her\b', 'her', 'double-det: the her → her'),
    (r'\bthe their\b', 'their', 'double-det: the their → their'),
    (r'\bthe our\b', 'our', 'double-det: the our → our'),
    (r'\bthe your\b', 'your', 'double-det: the your → your'),
    # "the another" → "another"
    (r'\bthe another\b', 'another', 'article: the another → another'),
    # SV agreement: "the trees is" → "the trees are"
    (r'\bthe trees is\b', 'the trees are', 'sv-agree: trees is → are'),
    (r'\bthe leaves is\b', 'the leaves are', 'sv-agree: leaves is → are'),
    (r'\bthe flowers is\b', 'the flowers are', 'sv-agree: flowers is → are'),
    (r'\bthe birds is\b', 'the birds are', 'sv-agree: birds is → are'),
    (r'\bthe students is\b', 'the students are', 'sv-agree: students is → are'),
    (r'\bthe children is\b', 'the children are', 'sv-agree: children is → are'),
    (r'\bthe people is\b', 'the people are', 'sv-agree: people is → are'),
    (r'\bthe animals is\b', 'the animals are', 'sv-agree: animals is → are'),
    (r'\bthe books is\b', 'the books are', 'sv-agree: books is → are'),
    # "a" before vowels → "an" (conservative - only clear cases)
    (r'\b([Aa]) (eight\b)', r'an \2', 'a→an: eight'),
    (r'\b([Aa]) (apple\b)', r'an \2', 'a→an: apple'),
    (r'\b([Aa]) (elephant\b)', r'an \2', 'a→an: elephant'),
    (r'\b([Aa]) (egg\b)', r'an \2', 'a→an: egg'),
    (r'\b([Aa]) (umbrella\b)', r'an \2', 'a→an: umbrella'),
    (r'\b([Aa]) (animal\b)', r'an \2', 'a→an: animal'),
    (r'\b([Aa]) (idea\b)', r'an \2', 'a→an: idea'),
    (r'\b([Aa]) (orange\b)', r'an \2', 'a→an: orange'),
    (r'\b([Aa]) (answer\b)', r'an \2', 'a→an: answer'),
    (r'\b([Aa]) (event\b)', r'an \2', 'a→an: event'),
    (r'\b([Aa]) (hour\b)', r'an \2', 'a→an: hour'),
    (r'\b([Aa]) (honest\b)', r'an \2', 'a→an: honest'),
    (r'\b([Aa]) (interest\b)', r'an \2', 'a→an: interest'),
    # "an" before consonants → "a" (conservative - only clear cases)
    (r'\b([Aa]n) (book\b)', r'a \2', 'an→a: book'),
    (r'\b([Aa]n) (student\b)', r'a \2', 'an→a: student'),
    (r'\b([Aa]n) (cat\b)', r'a \2', 'an→a: cat'),
    (r'\b([Aa]n) (dog\b)', r'a \2', 'an→a: dog'),
    (r'\b([Aa]n) (tree\b)', r'a \2', 'an→a: tree'),
    (r'\b([Aa]n) (flower\b)', r'a \2', 'an→a: flower'),
    (r'\b([Aa]n) (person\b)', r'a \2', 'an→a: person'),
    (r'\b([Aa]n) (teacher\b)', r'a \2', 'an→a: teacher'),
    (r'\b([Aa]n) (doctor\b)', r'a \2', 'an→a: doctor'),
    (r'\b([Aa]n) (school\b)', r'a \2', 'an→a: school'),
    (r'\b([Aa]n) (girl\b)', r'a \2', 'an→a: girl'),
    (r'\b([Aa]n) (boy\b)', r'a \2', 'an→a: boy'),
    (r'\b([Aa]n) (friend\b)', r'a \2', 'an→a: friend'),
    (r'\b([Aa]n) (happy\b)', r'a \2', 'an→a: happy'),
    (r'\b([Aa]n) (good\b)', r'a \2', 'an→a: good'),
    (r'\b([Aa]n) (great\b)', r'a \2', 'an→a: great'),
    (r'\b([Aa]n) (nice\b)', r'a \2', 'an→a: nice'),
    (r'\b([Aa]n) (big\b)', r'a \2', 'an→a: big'),
    (r'\b([Aa]n) (small\b)', r'a \2', 'an→a: small'),
    (r'\b([Aa]n) (very\b)', r'a \2', 'an→a: very (rare)'),
    (r'\b([Aa]n) (long\b)', r'a \2', 'an→a: long'),
    (r'\b([Aa]n) (red\b)', r'a \2', 'an→a: red'),
    (r'\b([Aa]n) (blue\b)', r'a \2', 'an→a: blue'),
    (r'\b([Aa]n) (yellow\b)', r'a \2', 'an→a: yellow'),
    (r'\b([Aa]n) (green\b)', r'a \2', 'an→a: green'),
    (r'\b([Aa]n) (white\b)', r'a \2', 'an→a: white'),
    (r'\b([Aa]n) (black\b)', r'a \2', 'an→a: black'),
    (r'\b([Aa]n) (brown\b)', r'a \2', 'an→a: brown'),
    (r'\b([Aa]n) (purple\b)', r'a \2', 'an→a: purple'),
    (r'\b([Aa]n) (pink\b)', r'a \2', 'an→a: pink'),
    # "I goes" / "She go" etc. - common errors
    (r'\bI goes\b', 'I go', 'sv: I goes → I go'),
    (r'\bI likes\b', 'I like', 'sv: I likes → I like'),
    (r'\bI loves\b', 'I love', 'sv: I loves → I love'),
    (r'\bI haves\b', 'I have', 'sv: I haves → I have'),
    (r'\bI plays\b', 'I play', 'sv: I plays → I play'),
    (r'\bI learns\b', 'I learn', 'sv: I learns → I learn'),
    (r'\bI reads\b', 'I read', 'sv: I reads → I read'),
    (r'\bI eats\b', 'I eat', 'sv: I eats → I eat'),
    (r'\bI drinks\b', 'I drink', 'sv: I drinks → I drink'),
    (r'\bI runs\b', 'I run', 'sv: I runs → I run'),
    (r'\bI walks\b', 'I walk', 'sv: I walks → I walk'),
    (r'\bI writes\b', 'I write', 'sv: I writes → I write'),
    (r'\bI speaks\b', 'I speak', 'sv: I speaks → I speak'),
    (r'\bI sleeps\b', 'I sleep', 'sv: I sleeps → I sleep'),
    (r'\bI wakes\b', 'I wake', 'sv: I wakes → I wake'),
    (r'\bI wants\b', 'I want', 'sv: I wants → I want'),
    (r'\bI needs\b', 'I need', 'sv: I needs → I need'),
    (r'\bI knows\b', 'I know', 'sv: I knows → I know'),
    (r'\bI thinks\b', 'I think', 'sv: I thinks → I think'),
    # "You is" → "You are"
    (r'\bYou is\b', 'You are', 'sv: You is → You are'),
    (r'\byou is\b', 'you are', 'sv: you is → you are'),
    # "We is" → "We are"
    (r'\bWe is\b', 'We are', 'sv: We is → We are'),
    (r'\bwe is\b', 'we are', 'sv: we is → we are'),
    # "They is" → "They are"
    (r'\bThey is\b', 'They are', 'sv: They is → They are'),
    (r'\bthey is\b', 'they are', 'sv: they is → they are'),
    # "I am" used correctly, skip
    # Capitalization fixes for sentences that lost their capital
    # (These are hard to fix generally, skip)
    # Remove double spaces
    (r'  +', ' ', 'spacing: double space → single'),
    # "do not has" → "does not have" (tricky, skip general case)
    # "has got" is fine British English, keep
]

def apply_spelling_fix(text):
    """Apply spelling corrections preserving original case pattern."""
    for wrong, right in SPELLING.items():
        # Build replacement that preserves the case pattern of the original
        def make_replacement(m, right=right):
            orig = m.group(0)
            if orig.isupper():
                return right.upper()
            elif orig[0].isupper():
                return right[0].upper() + right[1:]
            else:
                return right
        text = re.sub(r'\b' + re.escape(wrong) + r'\b', make_replacement, text, flags=re.IGNORECASE)
    return text

def apply_grammar_fixes(text):
    """Apply grammar fixes."""
    for pattern, replacement, _ in GRAMMAR_FIXES:
        text = re.sub(pattern, replacement, text)
    return text

def fix_text(text):
    """Apply all fixes to a piece of text."""
    text = apply_spelling_fix(text)
    text = apply_grammar_fixes(text)
    return text

# ─── JS string extraction and replacement ───────────────────────────────────

def get_string_ranges(js_text):
    """
    Find all quoted string ranges in JS text.
    Returns list of (start, end, quote_char) for single and double quoted strings.
    Handles escaped quotes.
    """
    ranges = []
    i = 0
    n = len(js_text)
    while i < n:
        c = js_text[i]
        if c in ('"', "'", '`'):
            q = c
            start = i
            i += 1
            while i < n:
                if js_text[i] == '\\':
                    i += 2
                    continue
                if js_text[i] == q:
                    ranges.append((start, i + 1, q))
                    i += 1
                    break
                i += 1
        else:
            i += 1
    return ranges

def fix_js_strings(js_text, filepath=''):
    """Fix all string values in a JS file."""
    changes = []
    ranges = get_string_ranges(js_text)

    result = js_text
    offset = 0

    for start, end, q in ranges:
        orig_with_quotes = js_text[start:end]
        inner = orig_with_quotes[1:-1]  # strip quotes

        # ── Skip non-content strings ──────────────────────────────────────
        if len(inner) < 2:
            continue
        # Skip anything that looks like a file path / URL
        if re.match(r'^[/.]', inner) or inner.startswith('http') or inner.startswith('data:'):
            continue
        # Skip strings that contain file extensions (audio/image paths)
        if re.search(r'\.(mp3|mp4|jpg|jpeg|png|gif|webp|svg|wav|ogg|pdf|js|ts|json)(\?.*)?$', inner, re.I):
            continue
        # Skip pure hex color codes
        if re.match(r'^#[0-9a-fA-F]{3,8}$', inner):
            continue
        # Skip pure numbers
        if re.match(r'^\d+(\.\d+)?$', inner):
            continue
        # Skip phonetic transcriptions like /ˈstuːdənt/
        if re.match(r'^/[^/]+/$', inner) or inner.startswith('/ˈ') or inner.startswith('/ˌ'):
            continue
        # Skip Vietnamese text (contains diacritics)
        if re.search(r'[àáảãạăắặẳẵâấậẩẫèéẻẽẹêếệểễìíỉĩịòóỏõọôốộổỗơớợởỡùúủũụưứựửữỳýỷỹỵđÀÁẢÃẠĂẮẶẲẴÂẤẬẨẪÈÉẺẼẸÊẾỆỂỄÌÍỈĨỊÒÓỎÕỌÔỐỘỔỖƠỚỢỞỠÙÚỦŨỤƯỨỰỬỮỲÝỶỸỴĐ]', inner):
            continue
        # Skip emoji-only strings
        if re.match(r'^[\U0001F000-\U0001FFFF\u2600-\u27BF\s]+$', inner):
            continue
        # Skip CSS class names / IDs (all lowercase no spaces with dashes)
        if re.match(r'^[a-z][a-z0-9-]+$', inner) and '-' in inner:
            continue
        # Skip JS regex patterns
        if inner.startswith('^') or inner.startswith('(?'):
            continue

        fixed = fix_text(inner)

        if fixed != inner:
            changes.append({
                'file': filepath,
                'original': inner,
                'fixed': fixed,
            })
            result = result[:start + offset] + q + fixed + q + result[end + offset:]
            offset += len(fixed) - len(inner)

    return result, changes

# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    all_js = []
    for pattern in [
        'src/data/weeks/week_*/**.js',
        'src/data/weeks_easy/week_*/**.js',
        'src/data/week_01/**.js',
    ]:
        all_js.extend(glob.glob(os.path.join(BASE, pattern), recursive=True))
    
    # Exclude backup/old files
    all_js = [f for f in all_js if not any(x in f for x in ['BACKUP', 'OLD', '.bak', '_temp', 'video_queries'])]
    all_js = sorted(set(all_js))
    
    total_changes = []
    files_changed = 0
    
    for filepath in all_js:
        try:
            original = open(filepath, encoding='utf-8').read()
        except Exception as e:
            print(f'  SKIP (read error): {filepath}: {e}')
            continue
        
        fixed, changes = fix_js_strings(original, filepath)
        
        if fixed != original:
            files_changed += 1
            for c in changes:
                total_changes.append(c)
                relpath = os.path.relpath(c['file'], BASE)
                print(f'  [{relpath}]')
                print(f'    - "{c["original"][:80]}"')
                print(f'    + "{c["fixed"][:80]}"')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed)
    
    print(f'\n✓ Files changed: {files_changed}')
    print(f'✓ Total string fixes: {len(total_changes)}')

if __name__ == '__main__':
    main()
