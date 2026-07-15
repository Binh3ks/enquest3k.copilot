#!/usr/bin/env python3
"""
Remove bold markers from chunks that aren't real collocations.
Based on user feedback: 'car horns', 'Cities bring people together' (too long), etc.
"""
import re, pathlib

# Chunks to unbold (false positives based on user review)
UNBOLD_CHUNKS = {
    'car horns',           # generic noun+noun, not a collocation
    'Cities bring people together',  # too long, not standard
    'Cities bring people',  # generic
    'bring people',         # too generic
    'there is',             # grammatical, not a chunk
    'there are',            # grammatical
    'there was',            # grammatical
    'there were',           # grammatical
    'it is',                # grammatical
    'he is', 'she is', 'i am', 'we are', 'they are', 'you are',
    'this is', 'that is', 'these are', 'those are',
    'Cities',               # single word
    'forest animals',       # generic
    'forest animal',        # generic
    'main road',            # generic
    'main street',          # generic
    'big buildings',        # generic adj+noun
    'small buildings',      # generic
    'new buildings',        # generic
    'old buildings',        # generic
    'small things',         # generic
    'big things',           # generic
    'many things',          # generic
    'some things',          # generic
    'good things',          # generic
    'other side',           # generic
    'other side of the',    # too long
    'all day',              # grammatical time
    'all week',             # grammatical
    'all month',            # grammatical
    'all year',             # grammatical
    'all summer long',      # too long
    'all winter long',      # too long
    'all day long',         # too long
    'every morning I',      # too long (verb+pronoun pattern)
    'from childhood',       # generic
    'go to the',            # incomplete (need noun)
    'go to school',         # common
    'go home',              # common
    'go to bed',            # common
    'at school',            # preposition+noun
    'at home',              # preposition+noun
    'at work',              # preposition+noun
    'at night',             # preposition+noun
    'at the park',          # preposition+article+noun
    'at the market',        # preposition+article+noun
    'at the store',         # preposition+article+noun
    'at the library',       # preposition+article+noun
    'at the beach',         # preposition+article+noun
    'at the zoo',           # preposition+article+noun
    'at the table',         # preposition+article+noun
    'at the door',          # preposition+article+noun
    'at the window',        # preposition+article+noun
    'at the end',           # preposition+article+noun
    'at the beginning',     # preposition+article+noun
    'at the top',           # preposition+article+noun
    'at the bottom',        # preposition+article+noun
    'at the front',         # preposition+article+noun
    'at the back',          # preposition+article+noun
    'at the side',          # preposition+article+noun
    'at the corner',        # preposition+article+noun
    'at the same time',     # phrase
    'in the morning',       # preposition+article+noun+time
    'in the afternoon',     # ditto
    'in the evening',       # ditto
    'in the night',         # ditto
    'in the city',          # ditto
    'in the town',          # ditto
    'in the village',       # ditto
    'in the country',       # ditto
    'in the kitchen',       # ditto
    'in the bedroom',       # ditto
    'in the bathroom',      # ditto
    'in the classroom',     # ditto
    'in the garden',        # ditto
    'in the park',          # ditto
    'in the library',       # ditto
    'in the market',        # ditto
    'in the house',        # ditto
    'in the car',           # ditto
    'in the world',         # ditto
    'in the sky',           # ditto
    'in the sea',           # ditto
    'in the water',         # ditto
    'in the air',           # ditto
    'on the wall',          # ditto
    'on the floor',         # ditto
    'on the table',         # ditto
    'on the chair',         # ditto
    'on the bed',           # ditto
    'on the board',         # ditto
    'on the ground',        # ditto
    'on the left',          # ditto
    'on the right',         # ditto
    'by the lake',          # ditto
    'by the river',         # ditto
    'by the sea',           # ditto
    'by the window',        # ditto
    'by the door',          # ditto
    'by the table',         # ditto
    'by the bed',           # ditto
    'by the chair',         # ditto
    'good friends and',     # has trailing word
    'good friends',         # common but generic — keep, it's valid
    'good friend',          # ditto
    'best friends',         # ditto
    'best friend',          # ditto
}

# Remove from UNBOLD since these ARE valid:
UNBOLD_CHUNKS.discard('good friends')
UNBOLD_CHUNKS.discard('good friend')
UNBOLD_CHUNKS.discard('best friends')
UNBOLD_CHUNKS.discard('best friend')
UNBOLD_CHUNKS.discard('go to school')
UNBOLD_CHUNKS.discard('go home')
UNBOLD_CHUNKS.discard('go to bed')

WEEKS = [pathlib.Path('src/data/weeks'), pathlib.Path('src/data/weeks_easy')]
files = []
for w in range(1, 36):
    for base in WEEKS:
        for st in ['read', 'explore']:
            p = base / f'week_{w:02d}' / f'{st}.js'
            if p.exists() and '_OLD' not in str(p) and 'BACKUP' not in str(p):
                files.append(p)

content_re = re.compile(r"(content_en:\s*)([`'\"])([\s\S]*?)\2", re.MULTILINE)
fixed_files = 0
total_unbolds = 0

for fp in files:
    src = fp.read_text()
    m = content_re.search(src)
    if not m: continue
    quote = m.group(2)
    body = m.group(3)
    new_body = body
    file_changes = 0
    
    for chunk in UNBOLD_CHUNKS:
        # Find `**chunk**` and replace with `chunk` (case insensitive)
        pat = re.compile(r'\*\*(' + re.escape(chunk) + r')\*\*', re.IGNORECASE)
        new_body, n = pat.subn(r'\1', new_body)
        if n: file_changes += n
    
    if file_changes > 0 and new_body != body:
        new_src = src[:m.start()] + m.group(1) + quote + new_body + quote + src[m.end():]
        fp.write_text(new_src)
        fixed_files += 1
        total_unbolds += file_changes
        print(f'[unbold] {fp}: {file_changes} removals')

print(f'\n[unbold] total: {total_unbolds} false-positive bolds removed across {fixed_files} files')
