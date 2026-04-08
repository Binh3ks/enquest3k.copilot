#!/usr/bin/env python3
"""Audit word counts for all week read.js files vs blueprint targets."""
import re, os

BASE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')

# Blueprint Block word count targets (Easy, Advanced)
targets = {}
for w in range(1, 10):
    targets[f'{w:02d}'] = (70, 100)
for w in range(10, 19):
    targets[f'{w:02d}'] = (100, 130)
for w in range(19, 28):
    targets[f'{w:02d}'] = (115, 145)
for w in range(28, 37):
    targets[f'{w:02d}'] = (130, 160)


def count_words(path):
    if not os.path.exists(path):
        return None
    text = open(path, encoding='utf-8').read()
    m = re.search(r'content_en["\']?\s*:\s*["\'](.+?)["\'],\s*\n', text, re.DOTALL)
    if not m:
        # Try multiline approach
        m = re.search(r'content_en["\']?\s*:\s*"(.*?)",\s*\n\s*content_vi', text, re.DOTALL)
    if m:
        content = m.group(1)
        content = re.sub(r'\*\*', '', content)
        content = re.sub(r'\\n', ' ', content)
        return len(content.split())
    return None


print(f"{'Week':<6} | {'Adv':>5} | {'T_A':>5} | {'A_ok':<5} | {'Easy':>5} | {'T_E':>5} | {'E_ok':<5}")
print('-' * 55)

under_adv = []
under_easy = []

for i in range(1, 29):
    w = f'{i:02d}'
    adv_f = os.path.join(BASE, 'weeks', f'week_{w}', 'read.js')
    esy_f = os.path.join(BASE, 'weeks_easy', f'week_{w}', 'read.js')
    t_e, t_a = targets.get(w, (0, 0))

    adv_c = count_words(adv_f)
    esy_c = count_words(esy_f)

    adv_ok = '✅' if adv_c and adv_c >= t_a - 15 else ('❌' if adv_c else '--')
    esy_ok = '✅' if esy_c and esy_c >= t_e - 15 else ('❌' if esy_c else '--')

    if adv_c and adv_c < t_a - 15:
        under_adv.append((w, adv_c, t_a))
    if esy_c and esy_c < t_e - 15:
        under_easy.append((w, esy_c, t_e))

    adv_str = str(adv_c) if adv_c else 'N/A'
    esy_str = str(esy_c) if esy_c else 'N/A'
    print(f'W{w:<4} | {adv_str:>5} | {t_a:>5} | {adv_ok:<5} | {esy_str:>5} | {t_e:>5} | {esy_ok:<5}')

print()
print('=== UNDER TARGET (Advanced) ===')
for w, actual, target in under_adv:
    print(f'  W{w}: {actual} words (target ~{target}, gap {target - actual})')

print()
print('=== UNDER TARGET (Easy) ===')
for w, actual, target in under_easy:
    print(f'  W{w}: {actual} words (target ~{target}, gap {target - actual})')
