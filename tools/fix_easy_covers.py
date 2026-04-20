import os

BASE = "/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks_easy"

changes = []

# weeks 1-8: folder week_0N, image path week_N_easy -> weekN
for n in range(1, 9):
    ww = "%02d" % n
    folder = "week_%02d" % n
    for kind in ["read", "explore"]:
        path = os.path.join(BASE, folder, "%s.js" % kind)
        if not os.path.exists(path):
            continue
        old = "/images/week%d_easy/%s_cover_w%s.jpg" % (n, kind, ww)
        new = "/images/week%d/%s_cover_w%s.jpg" % (n, kind, ww)
        txt = open(path).read()
        if old in txt:
            open(path, 'w').write(txt.replace(old, new))
            changes.append("%s/%s.js" % (folder, kind))

# weeks 10-15, 17, 18: folder week_NN
for n in [10, 11, 12, 13, 14, 15, 17, 18]:
    ww = "%02d" % n
    folder = "week_%02d" % n
    for kind in ["read", "explore"]:
        path = os.path.join(BASE, folder, "%s.js" % kind)
        if not os.path.exists(path):
            continue
        old = "/images/week%d_easy/%s_cover_w%s.jpg" % (n, kind, ww)
        new = "/images/week%d/%s_cover_w%s.jpg" % (n, kind, ww)
        txt = open(path).read()
        if old in txt:
            open(path, 'w').write(txt.replace(old, new))
            changes.append("%s/%s.js" % (folder, kind))

# week 16 special (w016 -> w16)
for kind in ["read", "explore"]:
    path = os.path.join(BASE, "week_16/%s.js" % kind)
    if not os.path.exists(path):
        continue
    old = "/images/week16_easy/%s_cover_w016.jpg" % kind
    new = "/images/week16/%s_cover_w16.jpg" % kind
    txt = open(path).read()
    if old in txt:
        open(path, 'w').write(txt.replace(old, new))
        changes.append("week_16/%s.js" % kind)

for c in changes:
    print("Fixed:", c)
print("Total:", len(changes))
