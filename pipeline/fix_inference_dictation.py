#!/usr/bin/env python3
"""
fix_inference_dictation.py
Three fixes applied to ALL W1-W53:

1. Add answer blank after C. Stage 3B — Inference questions (ALL weeks)
2. W1-W9:  replace dictation with scaffolded cloze + word bank + Sub-total /5
3. W10-W26: ensure Sub-total /5 exists in PART 4 (1 sentence, no change)
4. W27-W53 (where D. Dictation exists): upgrade to 2-sentence dictation
"""

import json
import re
from pathlib import Path

LESSONS_DIRS = [
    Path('public/data/lessons'),
    Path('mcp-server/data/lessons'),
]

# ─────────────────────────────────────────────────────────────────────────────
# Scaffold data for W1-W9 dictation
# ─────────────────────────────────────────────────────────────────────────────
SCAFFOLD = {
    (1, 1): ("I am a ___ student.", "happy / sad / tired"),
    (1, 2): ("We are very ___!", "happy / busy / small"),
    (1, 3): ("We are best ___.", "friends / students / teachers"),
    (2, 1): ("We are a great ___.", "team / class / school"),
    (2, 2): ("He is very ___.", "tall / short / funny"),
    (2, 3): ("She is kind and ___.", "smart / quiet / happy"),
    (3, 1): ("Max is ___.", "tall / short / happy"),
    (3, 2): ("She has long ___.", "hair / eyes / ears"),
    (3, 3): ("He has big ___.", "glasses / ears / eyes"),
    (4, 1): ("I love my happy ___.", "jar / book / bag"),
    (4, 2): ("I feel very ___.", "excited / tired / bored"),
    (4, 3): ("It makes me ___.", "smile / laugh / jump"),
    (5, 1): ("There is a ___.", "house / car / park"),
    (5, 2): ("There are two ___.", "bathrooms / bedrooms / gardens"),
    (5, 3): ("There is a ___.", "garden / window / door"),
    (6, 1): ("I wash my ___.", "face / hands / hair"),
    (6, 2): ("I go to ___.", "sleep / school / bed"),
    (6, 3): ("I love my ___.", "routine / family / school"),
    (7, 1): ("There is a ___.", "ruler / pen / book"),
    (7, 2): ("There is an ___.", "eraser / apple / orange"),
    (7, 3): ("We are happy ___.", "students / friends / teachers"),
    (8, 1): ("There are 20 ___.", "desks / chairs / windows"),
    (8, 2): ("There are many ___.", "bags / books / pens"),
    (8, 3): ("We are ___.", "ready / busy / tired"),
    (9, 1): ("There is a tall ___.", "building / tree / mountain"),
    (9, 2): ("The modern ___ are tall.", "buildings / streets / parks"),
    (9, 3): ("He likes the beautiful ___.", "city / park / school"),
}


# ─────────────────────────────────────────────────────────────────────────────
# Fix 1: Add answer blank after Inference questions
# ─────────────────────────────────────────────────────────────────────────────
INFERENCE_RE = re.compile(r'^(C\.|━+\s*\[O\]\s*C\.)\s*Stage\s+3B\s*[—\-]+\s*Inference:', re.IGNORECASE)
DICTATION_RE = re.compile(r'^D\. Dictation', re.IGNORECASE)

def fix_inference_blank(content):
    """Insert → ____ after C. Stage 3B — Inference: lines that lack one."""
    result = []
    for i, line in enumerate(content):
        result.append(line)
        if INFERENCE_RE.match(line.strip()):
            nxt = content[i + 1].strip() if i + 1 < len(content) else ''
            if not (nxt.startswith('→') and '___' in nxt):
                result.append('→ ________________________________________')
    return result


# ─────────────────────────────────────────────────────────────────────────────
# Fix 2: W1-W9 scaffolded dictation
# ─────────────────────────────────────────────────────────────────────────────
def fix_dictation_scaffold(content, week, session):
    """Replace dictation block with cloze + word bank + Sub-total for W1-W9."""
    key = (week, session)
    if key not in SCAFFOLD:
        return content
    cloze, word_bank = SCAFFOLD[key]

    result = []
    i = 0
    while i < len(content):
        s = content[i].strip()
        if DICTATION_RE.match(s):
            i += 1
            # Skip old blank answer lines (e.g. '1. ____', '2. ____')
            while i < len(content) and re.match(r'^\d+\.\s+_{3,}', content[i].strip()):
                i += 1
            # Emit new scaffold
            result.append('D. Dictation (teacher reads twice — complete the sentence):')
            result.append('1. ' + cloze)
            result.append('   [ Word bank: ' + word_bank + ' ]')
            # Emit Sub-total (existing or new)
            if i < len(content) and content[i].strip().startswith('[ Sub-total'):
                result.append(content[i])
                i += 1
            else:
                result.append('[ Sub-total: ___ / 5 ]')
        else:
            result.append(content[i])
            i += 1
    return result


# ─────────────────────────────────────────────────────────────────────────────
# Fix 3: W10-W26 — add Sub-total /5 if missing, fix bare 'D. Dictation:' label
# ─────────────────────────────────────────────────────────────────────────────
def fix_part4_subtotal(content):
    """Add Sub-total /5 if PART 4 is missing it; fix bare 'D. Dictation:' label."""
    has_sub = any('Sub-total' in l for l in content)
    result = []
    for line in content:
        s = line.strip()
        if s == 'D. Dictation:':
            result.append('D. Dictation (teacher reads twice — students write 1 sentence):')
        else:
            result.append(line)
    if not has_sub:
        result.append('[ Sub-total: ___ / 5 ]')
    return result


# ─────────────────────────────────────────────────────────────────────────────
# Fix 4: W27-W53 two-sentence dictation (only where D. Dictation exists)
# ─────────────────────────────────────────────────────────────────────────────
def fix_dictation_two_sentences(content):
    """Upgrade '1 sentence' or bare dictation to 2 sentences."""
    # Act if there's any D. Dictation header that is NOT already 2 sentences
    has_dict = any(DICTATION_RE.match(l.strip()) for l in content)
    already_two = any('2 sentences' in l for l in content)
    if not has_dict or already_two:
        return content
    result = []
    i = 0
    while i < len(content):
        s = content[i].strip()
        if DICTATION_RE.match(s) and '2 sentences' not in s:
            result.append('D. Dictation (teacher reads twice — students write 2 sentences):')
            i += 1
            # Skip old single blank line(s) like '1. ____'
            while i < len(content) and re.match(r'^\d+\.\s+_{3,}', content[i].strip()):
                i += 1
            result.append('1. ________________________________________________________________')
            result.append('2. ________________________________________________________________')
            # Keep Sub-total if present
            if i < len(content) and content[i].strip().startswith('[ Sub-total'):
                result.append(content[i])
                i += 1
            else:
                result.append('[ Sub-total: ___ / 5 ]')
        else:
            result.append(content[i])
            i += 1
    return result


# ─────────────────────────────────────────────────────────────────────────────
# Apply all fixes to a sessions list
# ─────────────────────────────────────────────────────────────────────────────
def fix_sessions_list(sessions_list, week_num):
    for sess in sessions_list:
        sn = sess.get('session', 0)
        for p in sess.get('parts', []):
            if 'PART 4' not in p.get('title', ''):
                continue
            c = p['content']
            c = fix_inference_blank(c)
            if 1 <= week_num <= 9:
                c = fix_dictation_scaffold(c, week_num, sn)
            elif 10 <= week_num <= 26:
                c = fix_part4_subtotal(c)
            elif 27 <= week_num <= 53:
                c = fix_dictation_two_sentences(c)
            p['content'] = c


def load_week(wk):
    path = LESSONS_DIRS[0] / ('W%d.json' % wk)
    return json.loads(path.read_text(encoding='utf-8'))


def save_week(wk, data):
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    for d in LESSONS_DIRS:
        p = d / ('W%d.json' % wk)
        if p.exists():
            p.write_text(payload, encoding='utf-8')


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────
def main():
    issues = []
    for wk in range(1, 54):
        data = load_week(wk)
        for key in ('sessions', 'sessions_2', 'sessions_5'):
            if key in data and isinstance(data[key], list):
                fix_sessions_list(data[key], wk)
        save_week(wk, data)

        # Verify
        d2 = load_week(wk)
        for sess in d2['sessions']:
            sn = sess['session']
            for p in sess['parts']:
                if 'PART 4' not in p.get('title', ''):
                    continue
                c = p['content']
                # Check inference blank
                for i, line in enumerate(c):
                    if INFERENCE_RE.match(line.strip()):
                        nxt = c[i + 1].strip() if i + 1 < len(c) else ''
                        if not (nxt.startswith('→') and '___' in nxt):
                            issues.append('W%d S%d: Inference still missing blank' % (wk, sn))
                # Check dictation format
                if 1 <= wk <= 9:
                    has_wordbank = any('Word bank:' in l for l in c)
                    has_sub = any('Sub-total' in l for l in c)
                    if not has_wordbank:
                        issues.append('W%d S%d: missing Word bank scaffold' % (wk, sn))
                    if not has_sub:
                        issues.append('W%d S%d: PART4 missing Sub-total' % (wk, sn))
                elif 10 <= wk <= 26:
                    has_sub = any('Sub-total' in l for l in c)
                    if not has_sub:
                        issues.append('W%d S%d: PART4 missing Sub-total' % (wk, sn))
                elif 27 <= wk <= 53:
                    # Only check if there's a dictation section at all
                    if any(DICTATION_RE.match(l.strip()) for l in c):
                        has2 = any('2.' in l and '____' in l for l in c)
                        if not has2:
                            issues.append('W%d S%d: missing 2nd dictation blank' % (wk, sn))

        # Quick print
        status = '✓' if not any('W%d' % wk in i for i in issues) else '✗'
        print('W%d: %s' % (wk, status))

    if issues:
        print('\nISSUES:')
        for i in issues:
            print(' ', i)
    else:
        print('\nAll %d weeks ✓' % 53)


if __name__ == '__main__':
    main()
