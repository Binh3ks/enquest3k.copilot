#!/usr/bin/env python3
"""Add Week 17 Singapore Math bar model prompts to image prompt files."""

adv_bars = [
    '22. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_p1.jpg. Educational bar model diagram: one long rectangular bar divided into 2 sections - left section labeled "Umbrellas: 3" (blue), right section labeled "Coats: 4" (orange), question mark below asking "Total weather items: ?", clean educational illustration style for Singapore Math, aspect ratio 16:9, simple clear labels, bright colors.',
    '23. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_p2.jpg. Educational bar model diagram: two horizontal bars aligned vertically - top bar "January: 8 rainy days" (longer, dark blue with rain cloud icon), bottom bar "February: 5 rainy days" (shorter, light blue), bracket on the right showing difference with "? more days", comparison model, Singapore Math style, aspect ratio 16:9, clear comparison visual.',
    '24. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_p3.jpg. Educational bar model diagram: one full rectangular bar at top labeled "Total needed: 20 umbrellas", bar below divided into filled section "Have: 13" (green) and empty section with question mark "Need: ?" (gray with dashed border), part-whole missing model, Singapore Math style, aspect ratio 16:9, clean educational layout.',
    '25. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_p4.jpg. Educational bar model diagram: one bar divided into two parts - left section "Monday: 4 cm snow" (light blue with snowflake icon), right section "Tuesday: 6 cm snow" (white with snowflake icon), total bracket below labeled "Total snow: ?", addition part-whole model, Singapore Math style, aspect ratio 16:9, clear visual for kids.',
    '26. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_p5.jpg. Educational bar model diagram: two horizontal bars - top bar "City A: 15 sunny days" (longer, bright yellow with sun icon), bottom bar "City B: 9 sunny days" (shorter, orange), bracket on right showing difference with "? more days", comparison model, Singapore Math style, aspect ratio 16:9, bright educational colors.',
]

easy_bars = [
    '22. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_easy_p1.jpg. Educational bar model diagram: one long rectangular bar divided into 2 sections - left section labeled "Lily: 2 umbrellas" (pink), right section labeled "Mom: 3 umbrellas" (purple), question mark below asking "Total: ?", simple and colorful, Singapore Math style, aspect ratio 16:9, clear labels for young kids.',
    '23. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_easy_p2.jpg. Educational bar model diagram: two horizontal bars aligned vertically - top bar "Week 2: 6 rainy days" (longer, dark blue with rain drops), bottom bar "Week 1: 4 rainy days" (shorter, light blue), bracket on right showing difference with "? more days", comparison model, Singapore Math style, aspect ratio 16:9, simple and bright.',
    '24. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_easy_p3.jpg. Educational bar model diagram: one full bar at top labeled "Total coats: 5", bar below divided into filled section "Blue coats: 3" (blue) and empty section "Red coats: ?" (red with dashed border), part-whole missing model, Singapore Math style, aspect ratio 16:9, colorful and simple for young learners.',
    '25. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_easy_p4.jpg. Educational bar model diagram: one bar divided into two parts - left section "Tim: 2 hats" (green with hat icon), right section "Sister: 1 hat" (yellow with hat icon), total bracket below labeled "Total hats: ?", addition model, Singapore Math style, aspect ratio 16:9, cute and simple for kids.',
    '26. Hay tao BIEU DO BAR MODEL sau day. Filename: barmodel_w17_easy_p5.jpg. Educational bar model diagram: two horizontal bars - top bar "Class A: 7 boots" (longer, orange with boot icon), bottom bar "Class B: 4 boots" (shorter, red), bracket on right showing difference with "? fewer", comparison model, Singapore Math style, aspect ratio 16:9, bright and simple for young learners.',
]

adv_path = 'Production_FINAL/IMAGE PROMPTS/week_17_image_prompts.txt'
easy_path = 'Production_FINAL/IMAGE PROMPTS/week_17_easy_image_prompts.txt'

for path, bars in [(adv_path, adv_bars), (easy_path, easy_bars)]:
    with open(path, 'r', encoding='utf-8') as f:
        existing = f.read().rstrip('\n')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(existing + '\n')
        for line in bars:
            f.write(line + '\n')
    with open(path, 'r', encoding='utf-8') as f:
        count = sum(1 for l in f if l.strip())
    print(f'OK: {path.split("/")[-1]} -> {count} lines')
