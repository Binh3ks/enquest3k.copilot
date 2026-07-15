#!/usr/bin/env python3
"""
SpaCy-based chunk auditor (per user spec).
- Lemmatizes content_en
- Normalizes possessives (my/his/her/their/our -> one's)
- Matches against curated chunk database
- Detects chunks that need REJECT vs KEEP
- Also flags pre-existing non-English text corruption
"""
import json, re, spacy, sys
from collections import defaultdict
from pathlib import Path

nlp = spacy.load('en_core_web_sm')

# Curated chunks (the user-provided set + what we've added)
CHUNK_DB = {
    "once upon a time": "Idiom",
    "brag about": "Phrasal Verb",
    "win the race": "Collocation",
    "laugh at": "Phrasal Verb",
    "one day": "Time Chunk",
    "slow and steady wins the race": "Proverb",
    "get on": "Phrasal Verb",
    "fast bicycle": "Collocation",
    "small boat": "Collocation",
    "get ahead of": "Phrasal Verb",
    "get tired": "Functional Pattern",
    "fall asleep": "Collocation",
    "shady tree": "Collocation",
    "keep on": "Phrasal Verb",
    "keep going": "Phrasal Verb",
    "give up": "Phrasal Verb",
    "finish line": "Compound Noun",
    "forest animal": "Collocation",
    "wake up": "Phrasal Verb",
    "cheer loudly": "Collocation",
    "look different": "Functional Pattern",
    "from each other": "Reciprocal",
    "clean and fresh": "Collocation",
    "good for the environment": "Collocation",
    "mode of transport": "Collocation",
    "from place to place": "Functional Pattern",
    "learn about": "Phrasal Verb",
    "types of transport": "Collocation",
    "travel by car": "Collocation",
    "every day": "Time Chunk",
    "many people": "Collocation",
    "at once": "Time Chunk",
    "ride a motorbike": "Collocation",
    "every morning": "Time Chunk",
    "longer journeys": "Collocation",
    "great choice": "Collocation",
    "steel rails": "Collocation",
    "carry hundreds of passengers": "Collocation",
    "kilometres per hour": "Unit",
    "without your own vehicle": "Collocation",
    "take a taxi": "Collocation",
    "taxi driver": "Compound Noun",
    "every room": "Collocation",
    "very tall": "Collocation",
    "for my age": "Collocation",
    "happy smile": "Collocation",
    "wears glasses": "Collocation",
    "look different from each other": "Functional Pattern",
    "every morning I": "Functional Pattern",
}

POSSESSIVES = {'my', 'his', 'her', 'their', 'our', 'your'}

def lemmatize_with_possessive(text):
    doc = nlp(text.lower())
    tokens = []
    for t in doc:
        if t.pos_ == 'PRON' and t.morph.get('Poss') == ['Yes']:
            tokens.append("one's")
        else:
            tokens.append(t.lemma_)
    return ' '.join(tokens)

def find_corruption(text):
    """Find non-ASCII letters (excluding smart quotes) - likely data corruption."""
    issues = []
    # Find words with mixed Latin + non-Latin chars
    for m in re.finditer(r'\b[a-zA-Z]*[ăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹđабвгдежзийклмнопрстуфхцчшщъыьэюя][a-zA-Zăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹд]*\b', text):
        word = m.group(0)
        issues.append((m.start(), word))
    return issues

def audit_text(raw_text):
    """Return list of detected chunks (lemmatized + possessive-normalized)."""
    cleaned = re.sub(r'\*\*([^*]+?)\*\*', lambda m: m.group(1), raw_text)  # strip bold
    cleaned = re.sub(r'\s+([,.!?])', r'\1', cleaned)
    lemmatized = lemmatize_with_possessive(cleaned)
    detected = []
    for chunk in CHUNK_DB:
        pat = re.compile(r'\b' + re.escape(chunk) + r'\b')
        n = len(pat.findall(lemmatized))
        if n > 0:
            detected.append((chunk, CHUNK_DB[chunk], n))
    return detected, lemmatized

# Scan all week files
WEEKS = [Path('src/data/weeks'), Path('src/data/weeks_easy')]
files = []
for w in range(1, 36):
    for base in WEEKS:
        for st in ['read', 'explore']:
            p = base / f'week_{w:02d}' / f'{st}.js'
            if p.exists() and '_OLD' not in str(p) and 'BACKUP' not in str(p):
                files.append(p)

content_re = re.compile(r"(content_en:\s*)([`'\"])([\s\S]*?)\2", re.MULTILINE)

corruption_count = 0
chunk_findings = defaultdict(int)
files_with_corruption = []

for fp in files:
    src = fp.read_text()
    m = content_re.search(src)
    if not m: continue
    body = m.group(3)
    
    # Find corruption
    corrupt = find_corruption(body)
    if corrupt:
        corruption_count += len(corrupt)
        files_with_corruption.append((fp, corrupt))
    
    # Find chunks
    detected, _ = audit_text(body)
    for chunk, kind, n in detected:
        chunk_findings[(chunk, kind)] += n

print(f'\n=== Corrupted words (non-English) found: {corruption_count} ===')
for fp, c in files_with_corruption[:5]:
    print(f'  {fp}: {len(c)} words')
    for pos, w in c[:3]:
        line = body[:pos].count('\n')+1
        print(f'    L{line}: {w!r}')

print(f'\n=== Detected chunks (top 30) ===')
for (chunk, kind), n in sorted(chunk_findings.items(), key=lambda x: -x[1])[:30]:
    print(f'  {n:3d}x  [{kind:18s}] {chunk}')
