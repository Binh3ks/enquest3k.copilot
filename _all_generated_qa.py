import re, glob
from _add_clue_and_questions import clean_story, sentence_to_qa

files = sorted(glob.glob('src/data/weeks/*/read.js') + glob.glob('src/data/weeks_easy/*/read.js'))
all_qs = []
for f in files:
    txt = open(f).read()
    cm = re.search(r'content_en\s*:\s*"((?:[^"\\]|\\.)*)"', txt)
    if not cm:
        continue
    content = cm.group(1).replace('\\n',' ').replace('\\"','"')
    sents = clean_story(content)
    used = set()
    ex = set()
    for s in sents:
        r = sentence_to_qa(s, ex, used)
        if r:
            all_qs.append((f.replace('src/data/',''), r['question_en'], r['clue_statement']))
            for a in r['answer']:
                ex.add(a.lower())

print("Total generated:", len(all_qs))
print()
for f, q, c in all_qs:
    print(f"{f}")
    print(f"  Q: {q}")
    print(f"  C: {c}")
    print()
