import re
for wk in range(1,8):
    with open(f'src/data/weeks/week_0{wk}_real.js') as f:
        c = f.read()
    pattern = r'mission_context: `([^`]+)`'
    ctxs = re.findall(pattern, c)
    parts = '  '.join([f'M{i+1}={len(x)}c' for i,x in enumerate(ctxs)])
    print(f'W{wk}: {parts}')
