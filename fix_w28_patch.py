"""
fix_w28_patch.py — Targeted patch for engine/pedal production issues
"""
import json
from pathlib import Path

ROOT = Path(__file__).parent

REPLACEMENTS = [
    # S1 PART 3 L1: simplify clue 8 (remove 'pedal') and clue 10 (remove 'engine')
    (
        '8. You pedal this two-wheeled vehicle with your feet. It has no engine.',
        '8. You use your feet to move this two-wheeled vehicle. It is not a motorbike.',
    ),
    (
        '10. This two-wheeled vehicle has an engine and goes faster than a bicycle.',
        '10. This vehicle has two wheels. It is faster than a bicycle. It is not a car.',
    ),
    # S2 PART 3 L3 item 7 — provide 'engine' in stem, only blank = 'ride' (taught verb)
    (
        "\u2192 No, a bicycle has no _________. You _________ it with your feet.",
        "\u2192 No! A bicycle does NOT have an engine (x\u0103ng). You _________ (ride / drive / fly) it.",
    ),
    # S3 PART 3 L2 item 7 — same fix; remove '(You pedal it.)' hint
    (
        '\u2192 A bicycle does NOT _________. (You pedal it.)',
        '\u2192 A bicycle does NOT have an engine (x\u0103ng). You _________ (ride / drive / fly) it.',
    ),
]


def apply_replacements(content):
    result = []
    for line in content:
        s = str(line)
        for old, new in REPLACEMENTS:
            if old in s:
                s = s.replace(old, new)
        result.append(s)
    return result


def main():
    for json_path in [
        ROOT / 'mcp-server/data/lessons/W28.json',
        ROOT / 'public/data/lessons/W28.json',
    ]:
        with open(json_path, encoding='utf-8') as f:
            d = json.load(f)

        changed = 0
        for key in ['sessions', 'sessions_2', 'sessions_5']:
            for session in d.get(key, []):
                for part in session.get('parts', []):
                    if 'PART 3' in part.get('title', ''):
                        old = list(part['content'])
                        new = apply_replacements(old)
                        if new != old:
                            part['content'] = new
                            changed += 1

        print(f'{json_path.name}: changed {changed} parts')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(d, f, ensure_ascii=False, indent=2)

    # Update lessonPlans.json
    lp_path = ROOT / 'public/data/lessonPlans.json'
    with open(lp_path, encoding='utf-8') as f:
        lp = json.load(f)
    with open(ROOT / 'mcp-server/data/lessons/W28.json', encoding='utf-8') as f:
        d28 = json.load(f)
    if 'W28' in lp:
        lp['W28'] = d28
        with open(lp_path, 'w', encoding='utf-8') as f:
            json.dump(lp, f, ensure_ascii=False, indent=2)
    print('lessonPlans.json updated')

    # Verify no production blanks still require 'engine' or 'pedal'
    print()
    print('=== VERIFICATION ===')
    for key in ['sessions', 'sessions_2', 'sessions_5']:
        for s in d28.get(key, []):
            for p in s.get('parts', []):
                for line in p.get('content', []):
                    ls = str(line)
                    if '_________' in ls and ('engine' in ls.lower() or 'pedal' in ls.lower()):
                        print(f'WARNING [{key}] S{s["session"]} {p["title"][:30]}: {ls[:80]}')
    print('Done!')


if __name__ == '__main__':
    main()
