#!/usr/bin/env python3
"""Scan all week JS files for remaining grammar issues and report them."""
import glob, re

files = []
for p in ['src/data/weeks/week_*/read.js', 'src/data/weeks_easy/week_*/read.js',
          'src/data/weeks/week_*/vocab.js', 'src/data/weeks_easy/week_*/vocab.js',
          'src/data/weeks/week_*/grammar.js', 'src/data/weeks_easy/week_*/grammar.js',
          'src/data/weeks/week_*/dictation.js', 'src/data/weeks_easy/week_*/dictation.js',
          'src/data/weeks/week_*/shadowing.js', 'src/data/weeks_easy/week_*/shadowing.js',
          'src/data/weeks/week_*/writing.js', 'src/data/weeks_easy/week_*/writing.js',
          'src/data/weeks/week_*/ask_ai.js', 'src/data/weeks_easy/week_*/ask_ai.js']:
    files += [f for f in glob.glob(p) if 'BACKUP' not in f and 'OLD' not in f]

VIET_RE = re.compile(r'[àáảãạăắặẳẵâấậẩẫèéẻẽẹêếệểễìíỉĩịòóỏõọôốộổỗơớợởỡùúủũụưứựửữỳýỷỹỵđ]', re.I)

checks = [
    (r'\bin the my\b|\bin the his\b|\bin the her\b|\bin the their\b', 'double-det'),
    (r'\bthe my\b|\bthe his\b|\bthe her\b|\bthe their\b', 'double-det2'),
    (r'\bthe trees is\b|\bthe people is\b|\bthe children is\b|\bthe students is\b|\bthe flowers is\b', 'sv-agree'),
    (r'\bI goes\b|\bI likes\b|\bI loves\b|\bI plays\b|\bI eats\b|\bI drinks\b|\bI runs\b|\bI walks\b|\bI writes\b|\bI reads\b', 'I+3ps'),
    (r'\bYou is\b|\byou is\b|\bWe is\b|\bwe is\b|\bThey is\b|\bthey is\b', 'pron+is'),
    (r'\b[Aa] (eight|apple|elephant|egg|umbrella|animal|idea|orange|answer|event|hour|honest)\b', 'a+vowel'),
    (r'\b[Aa]n (book|student|cat|dog|teacher|school|boy|girl|friend|person|doctor)\b', 'an+cons'),
    (r'\bcolour\b|\bfavourite\b|\bcolourful\b|\bbehaviour\b|\bneighbour\b|\bcentre\b', 'british-spell'),
    (r'  +', 'double-space'),
]

issues = []
for f in sorted(files):
    txt = open(f).read()
    for m in re.finditer(r'"([^"\n]{8,})"', txt):
        s = m.group(1)
        if VIET_RE.search(s): continue
        if re.search(r'\.(mp3|jpg|png|js|wav)$', s): continue
        if s.startswith('/'): continue
        if s.startswith('/ˈ') or s.startswith('/ˌ'): continue
        for pat, label in checks:
            hit = re.search(pat, s)
            if hit:
                rel = f.replace('src/data/weeks/', 'W/').replace('src/data/weeks_easy/', 'E/')
                issues.append((label, rel, hit.group(0), s[:100]))

print(f"Total issues found: {len(issues)}\n")
for label, f, hit, s in issues:
    print(f"[{label}] {f}")
    print(f"  match: '{hit}'")
    print(f"  in: {s}")
    print()
