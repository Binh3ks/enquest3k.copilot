import re
import glob

files = sorted(glob.glob('src/data/weeks/week_*_real.js'))
issues = []

for fpath in files:
    week = re.search(r'week_(\d+)', fpath).group(1)
    with open(fpath, encoding='utf-8') as f:
        content = f.read()

    # Check all 'ai:' strings in conversation exchanges
    for m in re.finditer(r'ai:\s*["`]([^`"]*?)["`]', content, re.DOTALL):
        ai_text = m.group(1)

        # Issue 1: Say: with ___ (blank hint)
        say_m = re.search(r'Say:\s*([^\n]+)', ai_text)
        if say_m and '___' in say_m.group(0):
            issues.append(('SAY_BLANK', week, fpath, ai_text[:150].replace('\n', ' ')))

        # Issue 2: Abrupt rude-sounding questions about family existence
        low = ai_text.lower()
        if re.search(r'do you have a (mother|father|brother|sister|parent)\?', low):
            issues.append(('RUDE_Q', week, fpath, ai_text[:150].replace('\n', ' ')))

    # Check fill_blank with insufficient meaningful accept_words
    for m in re.finditer(r'fill_blank:\s*["`]([^`"]*?)["`]', content):
        fb = m.group(1)
        if '___' not in fb:
            continue
        start = max(0, m.start() - 200)
        ctx = content[start:m.end() + 400]
        aw_m = re.search(r'accept_words:\s*\[([^\]]+)\]', ctx)
        if aw_m:
            words = re.findall(r"[\"']([^\"']+)[\"']", aw_m.group(1))
            tpl_words = set(re.sub(r'_+', '', fb).lower().split())
            meaningful = [w for w in words if w.lower() not in tpl_words and len(w) > 2]
            if len(meaningful) < 2:
                issues.append(('FB_NO_WORDS', week, fpath,
                    'fill_blank: "' + fb + '" | accept_words: ' + str(words[:6])))

    # Check story_arc phase_questions for Say: ___
    for m in re.finditer(r'["`]([^`"]*?Say:[^`"]*?___[^`"]*?)["`]', content):
        text = m.group(1)
        if 'phase_questions' in content[max(0, m.start()-500):m.start()]:
            issues.append(('STORY_ARC_SAY_BLANK', week, fpath, text[:150].replace('\n', ' ')))

# Deduplicate
seen = set()
unique = []
for item in issues:
    key = (item[0], item[1], item[3][:60])
    if key not in seen:
        seen.add(key)
        unique.append(item)

by_type = {}
for t, w, fp, txt in unique:
    by_type.setdefault(t, []).append((w, fp, txt))

print(f"TOTAL UNIQUE ISSUES: {len(unique)}\n")
for t, lst in sorted(by_type.items()):
    print(f"\n=== {t} ({len(lst)}) ===")
    for w, fp, txt in sorted(lst, key=lambda x: x[0]):
        print(f"  W{w}: {txt[:120]}")
