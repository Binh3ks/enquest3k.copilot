import re, glob
from _add_clue_and_questions import clean_story, sentence_to_qa

files = sorted(glob.glob('src/data/weeks/*/read.js') + glob.glob('src/data/weeks_easy/*/read.js'))
total_extra = 0
under10 = []
for f in files:
    txt = open(f).read()
    existing = len(re.findall(r'question_en', txt))
    cm = re.search(r'content_en\s*:\s*"((?:[^"\\]|\\.)*)"', txt)
    extra = 0
    if cm:
        content = cm.group(1).replace('\\n',' ').replace('\\"','"')
        sents = clean_story(content)
        used = set()
        ex = set()
        for s in sents:
            r = sentence_to_qa(s, ex, used)
            if r:
                extra += 1
                for a in r['answer']:
                    ex.add(a.lower())
    total = existing + extra
    if total < 10:
        under10.append((f.replace('src/data/',''), existing, extra, total))
    total_extra += extra

print("Total extra questions generated:", total_extra)
print("Weeks with < 10 total questions:", len(under10))
for f, e, x, t in under10:
    print(" ", f, ":", e, "+", x, "extra =", t)
