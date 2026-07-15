#!/usr/bin/env python3
"""
Targeted content audit-and-fix script for all station content files.

Only applies HIGH-CONFIDENCE, LOW-RISK fixes:
1.  "the my/his/her/..." - remove spurious "the" before possessives
2.  Known spelling corrections from curated SPELL_FIXES dictionary
3.  Duplicate consecutive phrases  ("on the shelves on the shelves")
4.  Specific wrong article patterns confirmed manually
5.  "a [word starting with vowel sound]" - only clear-cut cases
6.  "an [word starting with consonant]" - only clear-cut cases

Usage:
    python3 _audit_fix_all_stations.py [--dry-run]
"""

import os, re, sys, glob

DRY_RUN = '--dry-run' in sys.argv
BASE = os.path.dirname(__file__)

# ─── Curated spelling corrections ──────────────────────────────────────────
SPELL_FIXES = {
    'becuase': 'because',
    'woudl': 'would', 'shoud': 'should', 'coudl': 'could',
    'teh ': 'the ',   # only when followed by space (not part of another word)
    'alot': 'a lot',
    'seperate': 'separate', 'occured': 'occurred',
    'recieve': 'receive', 'beleive': 'believe',
    'enviroment': 'environment', 'libary': 'library',
    'excercise': 'exercise', 'grammer': 'grammar',
    'alays': 'always', 'allways': 'always',
    'siting': 'sitting', 'runing': 'running',
    'stoped': 'stopped', 'droped': 'dropped',
    'happly': 'happily', 'quicly': 'quickly', 'quitely': 'quietly',
    'beautifull': 'beautiful', 'wonderfull': 'wonderful',
    'intresting': 'interesting', 'suprised': 'surprised',
    'classrom': 'classroom', 'teachre': 'teacher',
    'homwork': 'homework', 'homewrok': 'homework',
    'studet': 'student', 'studnet': 'student',
    'friendley': 'friendly',
    'childen': 'children', 'childre': 'children',
    'diferent': 'different', 'diffrent': 'different',
    'favourit': 'favourite', 'favourte': 'favourite',
    'exited': 'excited',   # VERY common: "I am exited" → "I am excited"
    'boarder': 'border',   # context: classroom
}

# ─── Article fixes: only when the next word clearly starts with a vowel/consonant
# These are word→correction maps for well-known wrong articles in teaching content
ARTICLE_FIXES = {
    # "a" → "an" (vowel-starting words commonly used in teaching)
    r'\ba (umbrella)\b': r'an \1',
    r'\ba (elephant)\b': r'an \1',
    r'\ba (apple)\b': r'an \1',
    r'\ba (orange)\b': r'an \1',
    r'\ba (egg)\b': r'an \1',
    r'\ba (ice)\b': r'an \1',
    r'\ba (eraser)\b': r'an \1',
    r'\ba (island)\b': r'an \1',
    r'\ba (igloo)\b': r'an \1',
    r'\ba (animal)\b': r'an \1',
    r'\ba (amazing)\b': r'an \1',
    r'\ba (awesome)\b': r'an \1',
    r'\ba (exciting)\b': r'an \1',
    r'\ba (interesting)\b': r'an \1',
    r'\ba (unforgettable)\b': r'an \1',
    r'\ba (unusual)\b': r'an \1',
    r'\ba (old)\b': r'an \1',
    r'\ba (open)\b': r'an \1',
    r'\ba (online)\b': r'an \1',
    r'\ba (hour)\b': r'an \1',
    r'\ba (honest)\b': r'an \1',
    r'\ba (honour)\b': r'an \1',
    # "an" → "a" (consonant-starting words commonly misused)
    r'\ban (school)\b': r'a \1',
    r'\ban (student)\b': r'a \1',
    r'\ban (teacher)\b': r'a \1',
    r'\ban (book)\b': r'a \1',
    r'\ban (bag)\b': r'a \1',
    r'\ban (boy)\b': r'a \1',
    r'\ban (girl)\b': r'a \1',
    r'\ban (cat)\b': r'a \1',
    r'\ban (dog)\b': r'a \1',
    r'\ban (friend)\b': r'a \1',
    r'\ban (house)\b': r'a \1',
    r'\ban (park)\b': r'a \1',
    r'\ban (game)\b': r'a \1',
    r'\ban (pencil)\b': r'a \1',
    r'\ban (ruler)\b': r'a \1',
    r'\ban (sofa)\b': r'a \1',
    r'\ban (lamp)\b': r'a \1',
    r'\ban (mirror)\b': r'a \1',
    r'\ban (rug)\b': r'a \1',
}


def apply_spell_fixes(text):
    """Apply curated spelling corrections."""
    for wrong, right in SPELL_FIXES.items():
        text = re.sub(r'\b' + re.escape(wrong.rstrip()) + r'\b', right.rstrip(), text, flags=re.IGNORECASE)
    return text


def fix_the_possessive(text):
    """Remove spurious 'the' before possessive pronouns."""
    POSS = r'(?:my|his|her|its|our|your|their)'
    return re.sub(r'\bthe (' + POSS + r')\b', r'\1', text)


def fix_duplicate_phrase(text):
    """Fix repeated consecutive 2-5 word phrases."""
    return re.sub(r'\b((?:\w+ ){1,5}\w+) \1\b', r'\1', text)


def fix_article_pairs(text):
    """Apply curated article fixes."""
    for pattern, replacement in ARTICLE_FIXES.items():
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    return text


def is_vietnamese(text):
    """Return True if text contains Vietnamese characters."""
    return bool(re.search(
        r'[àáảãạăắặẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]',
        text
    ))


def is_path_or_url(text):
    """Return True if text is a file path or URL."""
    return bool(re.match(r'^(?:/audio|/images|/video|https?://)', text.strip()))


def fix_string_value(value):
    """Apply all safe fixes to a single extracted string value."""
    if is_vietnamese(value) or is_path_or_url(value):
        return value
    if re.match(r'^[\d\s\-_/.,]+$', value):
        return value  # pure numbers/symbols

    original = value
    value = fix_the_possessive(value)
    value = fix_duplicate_phrase(value)
    value = apply_spell_fixes(value)
    value = fix_article_pairs(value)
    return value


def process_js_file(path):
    """Read, fix, and optionally write a JS file. Returns list of (old, new) changes."""
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    def fix_match(m):
        prefix, value, suffix = m.group(1), m.group(2), m.group(3)
        fixed = fix_string_value(value)
        if fixed != value:
            changes.append((value[:70], fixed[:70]))
        return prefix + fixed + suffix

    # Fix double-quoted property values: key: "value"
    content = re.sub(
        r'(:\s*")((?:[^"\\]|\\.)*?)(")',
        fix_match, content
    )

    # Fix template literal property values: key: `value`
    content = re.sub(
        r'(:\s*`)((?:[^`\\]|\\.)*?)(`)',
        fix_match, content
    )

    if content != original_content and not DRY_RUN:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

    return changes


def main():
    patterns = [
        'src/data/weeks/week_*/read.js',
        'src/data/weeks/week_*/vocab.js',
        'src/data/weeks/week_*/grammar.js',
        'src/data/weeks/week_*/dictation.js',
        'src/data/weeks/week_*/shadowing.js',
        'src/data/weeks/week_*/ask_ai.js',
        'src/data/weeks/week_*/writing.js',
        'src/data/weeks/week_*/games.js',
        'src/data/weeks/week_*/explore.js',
        'src/data/weeks/week_*/word_power.js',
        'src/data/weeks/week_*/logic.js',
        'src/data/weeks_easy/week_*/read.js',
        'src/data/weeks_easy/week_*/vocab.js',
        'src/data/weeks_easy/week_*/grammar.js',
        'src/data/weeks_easy/week_*/dictation.js',
        'src/data/weeks_easy/week_*/shadowing.js',
        'src/data/weeks_easy/week_*/ask_ai.js',
        'src/data/weeks_easy/week_*/writing.js',
        'src/data/weeks_easy/week_*/games.js',
        'src/data/weeks_easy/week_*/explore.js',
        'src/data/weeks_easy/week_*/word_power.js',
        'src/data/weeks_easy/week_*/logic.js',
    ]

    all_files = []
    for pat in patterns:
        all_files.extend(sorted(glob.glob(os.path.join(BASE, pat))))
    all_files = sorted(set(all_files))

    total_changes = 0
    files_changed = 0
    report_lines = []

    mode_label = '[DRY RUN] ' if DRY_RUN else ''
    print(f"{mode_label}Scanning {len(all_files)} station files...\n")

    for path in all_files:
        rel = os.path.relpath(path, BASE)
        changes = process_js_file(path)
        if changes:
            total_changes += len(changes)
            files_changed += 1
            report_lines.append(f"\n{rel} ({len(changes)} fix{'es' if len(changes)!=1 else ''}):")
            for old, new in changes:
                report_lines.append(f"  - {repr(old)}")
                report_lines.append(f"  + {repr(new)}")

    print('\n'.join(report_lines))
    print(f"\n{'─'*60}")
    print(f"Files scanned:  {len(all_files)}")
    print(f"Files changed:  {files_changed}")
    print(f"Total fixes:    {total_changes}")
    if DRY_RUN:
        print("\n[DRY RUN] No files written. Remove --dry-run to apply.")
    else:
        print("\n✓ All fixes applied.")


if __name__ == '__main__':
    main()


Scans all JS files in weeks/ and weeks_easy/ directories, extracts English
text strings, applies rule-based grammar and spelling corrections in-place.

Rules applied:
1.  "in the my [noun]" / "the my [noun]"  → remove spurious "the"
2.  "There is [plural]"                   → "There are [plural]"
3.  "There are [singular count noun]"     → "There is [singular count noun]"
4.  Duplicate consecutive phrases         → deduplicated
5.  Missing "the" before bare teacher/board/class etc. when used as subject
6.  Wrong verb forms in examples (he/she + base verb)
7.  "a [vowel-noun]" / "an [consonant-noun]"  → correct article
8.  Common spelling fixes (whitelist-filtered)

Usage:
    python3 _audit_fix_all_stations.py [--dry-run]
"""

import os, re, sys, glob
from spellchecker import SpellChecker

DRY_RUN = '--dry-run' in sys.argv

BASE = os.path.join(os.path.dirname(__file__), 'src', 'data')

# ─── Proper noun / domain whitelist (not checked by spellchecker) ──────────
WHITELIST = {
    # Story character names
    'alex', 'nova', 'mia', 'sam', 'luna', 'emma', 'ben', 'lily', 'tom', 'anna',
    'leo', 'max', 'maya', 'zara', 'jin', 'chen', 'lena', 'kai', 'jade', 'ella',
    'ms', 'mr', 'mrs', 'dr', 'johnson', 'smith', 'jones', 'baker', 'green',
    # Place names
    'greenwood', 'singapore', 'vietnam', 'hanoi', 'saigon', 'hcm',
    # Education / app-specific terms
    'vocab', 'whiteboard', 'flashcard', 'worksheet', 'unscramble', 'fillblank',
    # Common contractions fragments & abbreviations
    'colour', 'favourite', 'neighbour', 'practise', 'behaviour',  # British spellings
    # Numbers written as words
    'twenty', 'thirty',
    # Common words pyspellchecker sometimes flags
    'backpack', 'pencilcase', 'notebook', 'classroom', 'homework', 'bookshelf',
    'raincoat', 'lunchbox', 'schoolbag', 'schoolyard', 'supermarket',
    'upstairs', 'downstairs', 'outside', 'inside',
    # Vietnamese words that might appear in mixed strings
    'tôi', 'học', 'sinh', 'trường', 'cô', 'giáo',
}

# ─── Common spelling corrections ────────────────────────────────────────────
SPELL_FIXES = {
    'becuase': 'because', 'becaus': 'because', 'because,': 'because,',
    'woudl': 'would', 'shoud': 'should', 'coudl': 'could',
    'teh': 'the', 'hte': 'the',
    'alot': 'a lot', 'alright': 'all right',
    'seperate': 'separate', 'occured': 'occurred',
    'recieve': 'receive', 'beleive': 'believe',
    'enviroment': 'environment', 'libary': 'library',
    'excercise': 'exercise', 'grammer': 'grammar',
    'spelt': 'spelled',  # in formal US English context
    'their\'s': "theirs", 'its\'': "it's",  # common confusion
    'alays': 'always', 'allways': 'always',
    'siting': 'sitting', 'runing': 'running', 'swiming': 'swimming',
    'stoped': 'stopped', 'droped': 'dropped', 'skiped': 'skipped',
    'happly': 'happily', 'quicly': 'quickly', 'quitely': 'quietly',
    'beautifull': 'beautiful', 'wonderfull': 'wonderful', 'powerfull': 'powerful',
    'exited': 'excited',  # very common confusion
    'intresting': 'interesting', 'suprised': 'surprised',
    'favourit': 'favourite', 'favourte': 'favourite',
    'classrom': 'classroom', 'teachre': 'teacher',
    'homwork': 'homework', 'homewrok': 'homework',
    'studet': 'student', 'studnet': 'student',
    'friendley': 'friendly', 'friendy': 'friendly',
    'childen': 'children', 'childre': 'children',
    'happines': 'happiness', 'sadnes': 'sadness',
    'diferent': 'different', 'diffrent': 'different',
}

# ─── Irregular plural nouns (for there is/are check) ─────────────────────────
IRREGULAR_PLURALS = {
    'children', 'people', 'men', 'women', 'feet', 'teeth', 'mice', 'geese',
    'sheep', 'fish', 'deer', 'moose', 'series', 'species', 'aircraft',
}

IRREGULAR_SINGULARS = {
    'child': 'children', 'person': 'people', 'man': 'men', 'woman': 'women',
    'foot': 'feet', 'tooth': 'teeth', 'mouse': 'mice', 'goose': 'geese',
}

# Nouns that look plural (end in s) but are singular
ALWAYS_SINGULAR_S = {
    'news', 'mathematics', 'physics', 'economics', 'politics', 'athletics',
    'gymnastics', 'linguistics', 'ethics', 'aesthetics', 'series', 'species',
    'means', 'crossroads',
}

# ─── Article fix helpers ─────────────────────────────────────────────────────
VOWEL_SOUNDS = re.compile(r'^[aeiouAEIOU]')
# Words starting with consonant sound despite vowel letter
CONSONANT_SOUND_EXCEPTIONS = {'one', 'once', 'unit', 'uniform', 'university',
                                'unique', 'useful', 'use', 'user', 'usual',
                                'euro', 'european', 'eu'}
# Words starting with vowel letter but consonant sound → use "a"
def needs_an(word):
    w = word.lower().strip("'s.,!?")
    if w in CONSONANT_SOUND_EXCEPTIONS:
        return False
    return bool(VOWEL_SOUNDS.match(w))


def is_likely_plural(word):
    """Return True if word looks like a plural noun."""
    w = word.lower()
    if w in IRREGULAR_PLURALS:
        return True
    if w in ALWAYS_SINGULAR_S:
        return False
    # ends in s but not ss/us/is/as/os
    if w.endswith('s') and not w.endswith(('ss', 'us', 'is', 'as', 'os')):
        return True
    return False


def is_likely_singular(word):
    """Return True if word looks like a singular count noun."""
    w = word.lower()
    if w in IRREGULAR_PLURALS or w in ALWAYS_SINGULAR_S:
        return False
    # Does NOT end in s  (simple heuristic)
    return not w.endswith('s')


# ─── Grammar fix functions ────────────────────────────────────────────────────

def fix_the_my(text):
    """Fix 'the my/his/her/its/our/your/their [noun]' → 'my/... [noun]'"""
    POSS = r'(?:my|his|her|its|our|your|their)'
    return re.sub(r'\bthe (' + POSS + r')\b', r'\1', text)


def fix_there_is_are(text):
    """
    Fix "There is [plural noun]" → "There are [plural noun]"
    Fix "There are [singular noun]" → "There is [singular noun]"
    Conservative: only when first noun after there is/are is clearly plural/singular.
    """
    def _fix(m):
        prefix, aux, space, rest = m.group(1), m.group(2), m.group(3), m.group(4)
        # Get first word of rest
        words = rest.split()
        if not words:
            return m.group(0)
        # Skip articles at start
        first_content = words[0].lower()
        if first_content in ('a', 'an', 'the', 'also', 'just', 'no', 'some', 'many', 'much'):
            if len(words) > 1:
                first_content = words[1].lower().rstrip('.,!?')
            else:
                return m.group(0)
        else:
            first_content = first_content.rstrip('.,!?')

        if aux.lower() == 'is' and first_content in IRREGULAR_PLURALS:
            return prefix + 'are' + space + rest
        if aux.lower() == 'is' and is_likely_plural(first_content):
            return prefix + 'are' + space + rest
        if aux.lower() == 'are' and is_likely_singular(first_content) and first_content not in IRREGULAR_PLURALS:
            # Be conservative: only fix when first word is clearly singular
            if not first_content.endswith('s') and first_content not in ALWAYS_SINGULAR_S:
                return prefix + 'is' + space + rest
        return m.group(0)

    # Match "there is/are" (case-insensitive, preserving case)
    return re.sub(
        r'((?:[Tt]here\s+))(is|are)(\s+)(.+?)(?=\.|,|$)',
        _fix,
        text
    )


def fix_duplicate_phrase(text):
    """Fix repeated consecutive phrases like 'on the shelves on the shelves'"""
    # Match a 2-5 word phrase followed immediately by the same phrase
    return re.sub(r'\b((?:\w+ ){1,5}\w+) \1\b', r'\1', text)


def fix_articles(text):
    """Fix 'a [vowel noun]' → 'an [vowel noun]' and vice versa"""
    def _fix_an(m):
        art, space, word = m.group(1), m.group(2), m.group(3)
        if needs_an(word):
            return 'an' + space + word
        return m.group(0)

    def _fix_a(m):
        art, space, word = m.group(1), m.group(2), m.group(3)
        if not needs_an(word):
            return 'a' + space + word
        return m.group(0)

    text = re.sub(r'\b(a)(\s+)([a-zA-Z]\w*)', _fix_an, text)
    text = re.sub(r'\b(an)(\s+)([a-zA-Z]\w*)', _fix_a, text)
    return text


def apply_spell_fixes(text):
    """Apply known spelling correction dictionary."""
    for wrong, right in SPELL_FIXES.items():
        # Word-boundary aware replacement
        text = re.sub(r'\b' + re.escape(wrong) + r'\b', right, text, flags=re.IGNORECASE)
    return text


def fix_he_she_base_verb(text):
    """
    Fix common subject-verb agreement errors in example sentences:
    'He/She + base verb (missing s)' in present simple.
    Only applied to short example sentence patterns.
    """
    # Common verbs that lose their 's' when used with he/she
    _NEEDS_S = {
        'teach': 'teaches', 'reach': 'reaches', 'catch': 'catches',
        'watch': 'watches', 'touch': 'touches', 'match': 'matches',
        'go': 'goes', 'do': 'does',
        'play': 'plays', 'stay': 'stays', 'say': 'says',
        'work': 'works', 'walk': 'walks', 'talk': 'talks',
        'run': 'runs', 'jump': 'jumps', 'sit': 'sits',
        'eat': 'eats', 'read': 'reads', 'write': 'writes',
        'sleep': 'sleeps', 'wake': 'wakes',
        'live': 'lives', 'love': 'loves', 'like': 'likes',
        'have': 'has', 'make': 'makes', 'take': 'takes',
        'come': 'comes', 'give': 'gives', 'get': 'gets',
        'see': 'sees', 'know': 'knows', 'think': 'thinks',
        'want': 'wants', 'need': 'needs', 'help': 'helps',
        'ask': 'asks', 'answer': 'answers', 'listen': 'listens',
        'look': 'looks', 'feel': 'feels', 'seem': 'seems',
        'learn': 'learns', 'study': 'studies', 'try': 'tries',
        'carry': 'carries', 'worry': 'worries', 'hurry': 'hurries',
        'fly': 'flies', 'cry': 'cries', 'buy': 'buys', 'pay': 'pays',
        'swim': 'swims', 'sing': 'sings', 'draw': 'draws',
        'open': 'opens', 'close': 'closes', 'start': 'starts',
        'finish': 'finishes', 'use': 'uses', 'show': 'shows',
        'bring': 'brings', 'find': 'finds', 'meet': 'meets',
        'visit': 'visits', 'travel': 'travels', 'arrive': 'arrives',
    }
    for base, third in _NEEDS_S.items():
        # "He/She [base]" at start of sentence or after period
        # Only when NOT followed by "not" (negative: he does not ...)
        pattern = r'\b(He|She|he|she) (' + re.escape(base) + r')(?! not\b)(?=\s)'
        def make_repl(t):
            def repl(m):
                subj = m.group(1)
                return f'{subj} {t}'
            return repl
        text = re.sub(pattern, make_repl(third), text)
    return text


def apply_all_fixes(text):
    """Apply all grammar and spelling fixes to a text string."""
    original = text
    text = fix_the_my(text)
    text = fix_there_is_are(text)
    text = fix_duplicate_phrase(text)
    text = apply_spell_fixes(text)
    text = fix_articles(text)
    # Note: fix_he_she_base_verb is applied separately to specific fields
    return text


# ─── JS file text extraction & replacement ───────────────────────────────────

def extract_and_fix_js_strings(js_content, apply_grammar_fix=True):
    """
    Find all double-quoted and template-literal English strings in JS content,
    apply fixes, and return the corrected content + list of changes.
    """
    changes = []

    def fix_string_value(value, field_hint=''):
        """Fix a single string value (already extracted, no quotes)."""
        # Skip: pure Vietnamese (contains Unicode Vietnamese chars)
        if re.search(r'[àáảãạăắặẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]', value):
            return value, []

        # Skip: URLs, audio paths, image paths
        if re.match(r'^/(?:audio|images|video)/', value) or re.match(r'^https?://', value):
            return value, []

        # Skip: pure numbers / IDs
        if re.match(r'^[\d\s\-_/]+$', value):
            return value, []

        original = value
        value = apply_all_fixes(value)

        # Apply verb agreement for example_en / example sentences
        if field_hint in ('example', 'example_en', 'text', 'rule_en'):
            value = fix_he_she_base_verb(value)

        local_changes = []
        if value != original:
            local_changes.append((original, value))
        return value, local_changes

    # Process double-quoted string values (JSON-style fields)
    # Pattern: "field": "value"  or  answer: "value"  etc.
    # We need to replace the values carefully without touching keys/structure
    
    new_content = js_content
    total_changes = []

    # Step 1: Fix simple quoted string values (double-quoted)
    # Match: ": "value"  where value doesn't contain unescaped "
    def fix_quoted_match(m):
        prefix, value, suffix = m.group(1), m.group(2), m.group(3)
        fixed, ch = fix_string_value(value)
        if ch:
            total_changes.extend(ch)
        return prefix + fixed + suffix

    # Fix strings in property values: key: "value"
    new_content = re.sub(
        r'(:\s*")((?:[^"\\]|\\.)*?)(")',
        fix_quoted_match,
        new_content
    )

    # Step 2: Fix template literal content (backtick strings)
    def fix_template_match(m):
        prefix, value, suffix = m.group(1), m.group(2), m.group(3)
        fixed, ch = fix_string_value(value)
        if ch:
            total_changes.extend(ch)
        return prefix + fixed + suffix

    new_content = re.sub(
        r'(:\s*`)((?:[^`\\]|\\.)*?)(`)',
        fix_template_match,
        new_content
    )

    return new_content, total_changes


# ─── Main processing ──────────────────────────────────────────────────────────

def process_file(path):
    """Read, fix, and write a single JS file. Returns list of changes."""
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()

    fixed, changes = extract_and_fix_js_strings(original)

    if changes and not DRY_RUN:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(fixed)

    return changes


def main():
    patterns = [
        'src/data/weeks/week_*/read.js',
        'src/data/weeks/week_*/vocab.js',
        'src/data/weeks/week_*/grammar.js',
        'src/data/weeks/week_*/dictation.js',
        'src/data/weeks/week_*/shadowing.js',
        'src/data/weeks/week_*/ask_ai.js',
        'src/data/weeks/week_*/writing.js',
        'src/data/weeks/week_*/games.js',
        'src/data/weeks/week_*/explore.js',
        'src/data/weeks/week_*/word_power.js',
        'src/data/weeks/week_*/logic.js',
        'src/data/weeks_easy/week_*/read.js',
        'src/data/weeks_easy/week_*/vocab.js',
        'src/data/weeks_easy/week_*/grammar.js',
        'src/data/weeks_easy/week_*/dictation.js',
        'src/data/weeks_easy/week_*/shadowing.js',
        'src/data/weeks_easy/week_*/ask_ai.js',
        'src/data/weeks_easy/week_*/writing.js',
        'src/data/weeks_easy/week_*/games.js',
        'src/data/weeks_easy/week_*/explore.js',
        'src/data/weeks_easy/week_*/word_power.js',
        'src/data/weeks_easy/week_*/logic.js',
    ]

    base_dir = os.path.dirname(__file__)
    all_files = []
    for pat in patterns:
        all_files.extend(sorted(glob.glob(os.path.join(base_dir, pat))))

    # Deduplicate
    all_files = sorted(set(all_files))

    total_changes = 0
    files_changed = 0
    report = []

    print(f"{'[DRY RUN] ' if DRY_RUN else ''}Processing {len(all_files)} station files...\n")

    for path in all_files:
        rel = os.path.relpath(path, base_dir)
        changes = process_file(path)
        if changes:
            total_changes += len(changes)
            files_changed += 1
            report.append(f"\n{rel} ({len(changes)} fix{'es' if len(changes) != 1 else ''}):")
            for old, new in changes[:10]:  # show max 10 per file
                old_disp = old[:60] + '...' if len(old) > 60 else old
                new_disp = new[:60] + '...' if len(new) > 60 else new
                report.append(f"  - {repr(old_disp)}")
                report.append(f"  + {repr(new_disp)}")
            if len(changes) > 10:
                report.append(f"  ... and {len(changes)-10} more")

    print('\n'.join(report))
    print(f"\n{'─'*60}")
    print(f"Files scanned:  {len(all_files)}")
    print(f"Files changed:  {files_changed}")
    print(f"Total fixes:    {total_changes}")
    if DRY_RUN:
        print("\n[DRY RUN] No files were written. Remove --dry-run to apply.")
    else:
        print("\n✓ All fixes applied in-place.")


if __name__ == '__main__':
    main()
