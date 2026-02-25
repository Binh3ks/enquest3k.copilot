#!/usr/bin/env python3
"""
PROPER Week 1 Upgrade Script
Replaces ONLY the missions array, keeping everything else intact
"""

import re

# Read files
with open('/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_02_real.js', 'r', encoding='utf-8') as f:
    week2 = f.read()

with open('/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_01_real.js', 'r', encoding='utf-8') as f:
    week1 = f.read()

print("📖 Reading files...")

# Extract ONLY Mission 1 from current Week 1 (keep it)
mission1_match = re.search(r'(story_missions: \[\s+\{[^}]+mission_id: 1,.*?}\s*\],)', week1, re.DOTALL)
if not mission1_match:
    print("❌ Cannot find Mission 1 in Week 1!")
    exit(1)

mission1_block = mission1_match.group(1)
print("✅ Found Week 1 Mission 1 (keeping it)")

# Extract Mission 2 & 3 from Week 2
mission23_match = re.search(r'(,\s+\{\s+mission_id: 2,.*?maximum_turns: \d+\s+\}\s+\],)', week2, re.DOTALL)
if not mission23_match:
    print("❌ Cannot find Mission 2 & 3 in Week 2!")
    exit(1)

mission23_text = mission23_match.group(1)
print("✅ Found Week 2 Mission 2 & 3")

# Adapt Mission 2 & 3 vocabulary
mission23_adapted = mission23_text

# Mission 2 adaptations
replacements = [
    ('Family Photos', 'My Backpack'),
    ('Ảnh Gia Đình', 'Ba Lô Của Tôi'),
    ('Family Description Game', 'School Supplies Guessing Game'),
    ('"📸 Wow! I have your family photos! Let\'s play a guessing game!"', '"📚 Wow! I see your backpack! Let\'s play a guessing game!"'),
    ('Week 2 Mission 2 - Family Photos', 'Week 1 Mission 2 - My Backpack'),
    ('family photo', 'backpack'),
    ('family member', 'school item'),
    ('"mother", "father", "brother", "sister", "kind", "happy", "love", "together"', '"backpack", "book", "notebook", "pen", "pencil", "eraser", "big", "small"'),
    ('My [family member] is [adjective]', 'I have a [item]'),
    
    # Mission 3 adaptations
    ('Mixed Up Family', 'My Teacher vs Your Teacher'),
    ('Gia Đình Lẫn Lộn', 'Giáo Viên Của Tôi'),
    ('My vs Your Grammar Game', 'My/Your School Grammar Game'),
    ('"🤔 Oh no! I keep saying the wrong words! Can you fix my mistakes?"', '"🤔 Oh no! I keep mixing up MY teacher and YOUR teacher! Can you fix my mistakes?"'),
    ('Week 2 Mission 3 - Mixed Up Family', 'Week 1 Mission 3 - My Teacher vs Your Teacher'),
]

for old, new in replacements:
    mission23_adapted = mission23_adapted.replace(old, new)

print("✅ Adapted Mission 2 & 3 for Week 1")

# Combine Mission 1 + Mission 2&3
new_missions = mission1_block.replace('],', mission23_adapted)

# Replace in Week 1
week1_new = re.sub(
    r'story_missions: \[\s+\{[^}]+mission_id: 1,.*?\}\s*\],',
    new_missions,
    week1,
    flags=re.DOTALL
)

# Write back
with open('/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_01_real.js', 'w', encoding='utf-8') as f:
    f.write(week1_new)

print("\n✅✅✅ DONE! Week 1 upgraded with Mission 2 & 3 from Week 2")
print("Hard reload browser!")
