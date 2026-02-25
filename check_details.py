import re

# ---- W1 M1 context ----
with open('src/data/weeks/week_01_real.js') as f: c1 = f.read()
ctxs1 = re.findall(r'mission_context:\s*`([^`]+)`', c1)
print(f'W1 M1 ctx ({len(ctxs1[0])}c):')
print(ctxs1[0][:300])
print('---')

# W1 M1 full opening and arc
ons1 = re.findall(r'opening_narrative:\s*`([^`]+)`', c1)
if not ons1:
    ons1 = re.findall(r"opening_narrative:\s*'([^']+)'", c1)
for i,o in enumerate(ons1,1):
    print(f'W1 M{i} opening ({len(o)}c): {o}')
print()

# ---- W3 M3 opening ----
with open('src/data/weeks/week_03_real.js') as f: c3 = f.read()
ons3 = re.findall(r'opening_narrative:\s*[`\'"](.*?)[`\'"]', c3, re.DOTALL)
for i,o in enumerate(ons3,1):
    print(f'W3 M{i} opening ({len(o)}c): {o}')
print()
ctxs3 = re.findall(r'mission_context:\s*`([^`]+)`', c3)
for i,o in enumerate(ctxs3,1):
    print(f'W3 M{i} ctx ({len(o)}c): {o[:150]}')
print()

# ---- W7 M1 title ----
with open('src/data/weeks/week_07_real.js') as f: c7 = f.read()
titles7 = re.findall(r'(?:story_mission|mission_id[^}]+?)title:\s*[`\'"](.*?)[`\'"]', c7, re.DOTALL)
print('W7 titles:', titles7[:5])
# More direct
m7 = re.findall(r'mission_id:\s*\d+[^}]*?title:\s*["\']([^"\']+)["\']', c7, re.DOTALL)
print('W7 mission titles:', m7)
print()

# ---- W2 M3 opening ----
with open('src/data/weeks/week_02_real.js') as f: c2 = f.read()
ons2 = re.findall(r'opening_narrative:\s*[`\'"](.*?)[`\'"]', c2, re.DOTALL)
for i,o in enumerate(ons2,1):
    print(f'W2 M{i} opening ({len(o)}c): {o}')
