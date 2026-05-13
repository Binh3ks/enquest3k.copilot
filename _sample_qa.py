import re, glob
from _add_clue_and_questions import clean_story, sentence_to_qa

files = sorted(glob.glob('src/data/weeks/*/read.js') + glob.glob('src/data/weeks_easy/*/read.js'))
for f in files[:10]:
    txt = open(f).read()
    cm = re.search(r'content_en\s*:\s*"((?:[^"\\]|\\.)*)"', txt)
    if not cm:
        continue
    content = cm.group(1).replace('\\n',' ').replace('\\"','"')
    sents = clean_story(content)
    used = set()
    ex = set()
    qs = []
    for s in sents:
        r = sentence_to_qa(s, ex, used)
        if r:
            qs.append(r)
            for a in r['answer']:
                ex.add(a.lower())
    if qs:
        print("===", f.replace('src/data/',''), "===")
        for r in qs:
            print(" Q:", r['question_en'])
            print(" C:", r['clue_statement'])
        print()
