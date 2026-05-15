import re, os

for w in [28, 29, 30, 31]:
    print(f"\n{'='*60}")
    print(f"WEEK {w}")
    print('='*60)
    for src in ['weeks', 'weeks_easy']:
        label = 'ADV' if src == 'weeks' else 'EASY'
        fname = f'src/data/{src}/week_{w:02d}/vocab.js'
        wp_fname = f'src/data/{src}/week_{w:02d}/word_power.js'

        try:
            txt = open(fname).read()
            entries = re.findall(r'word:\s*"([^"]+)".*?image_url:\s*"([^"]+)"', txt, re.DOTALL)
            print(f"\n  [{label}] VOCAB ({len(entries)} entries):")
            for word, img in entries:
                m = re.search(r'/images/(week\d+[_]?[a-z]*)/', img)
                flag = "REUSE" if m and m.group(1) != f'week{w}' else "NEW  "
                print(f"    {flag}  {word:22s} {img}")
        except Exception as e:
            print(f"  [{label}] vocab error: {e}")

        try:
            txt = open(wp_fname).read()
            entries = re.findall(r'collocation:\s*"([^"]+)".*?image_url:\s*"([^"]+)"', txt, re.DOTALL)
            print(f"  [{label}] WORDPOWER ({len(entries)} entries):")
            for col, img in entries:
                print(f"    WP  {col[:40]:40s} {img}")
        except Exception as e:
            pass

    # read.js and explore.js covers
    for mode, src in [('ADV', 'weeks'), ('EASY', 'weeks_easy')]:
        for station in ['read', 'explore']:
            try:
                txt = open(f'src/data/{src}/week_{w:02d}/{station}.js').read()
                img = re.search(r'image_url:\s*"([^"]+)"', txt)
                if img:
                    print(f"  [{mode}] {station:8s} cover: {img.group(1)}")
            except:
                pass
