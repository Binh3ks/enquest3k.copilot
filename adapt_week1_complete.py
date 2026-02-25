#!/usr/bin/env python3
"""
Auto-adapt Week 1 from Week 2 structure
Copies Mission 2, Mission 3, freetalk_knowledge, and roleplay_scenarios
Adapts vocabulary from Week 2 (family) to Week 1 (school/identity)
"""

import re

# Read Week 2
with open('/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_02_real.js', 'r', encoding='utf-8') as f:
    week2_content = f.read()

# Read current Week 1
with open('/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_01_real.js', 'r', encoding='utf-8') as f:
    week1_content = f.read()

# Extract Mission 2 from Week 2 (lines with mission_id: 2)
mission2_start = week2_content.find('mission_id: 2,')
mission2_end = week2_content.find('mission_id: 3,')
mission2_text = week2_content[mission2_start:mission2_end]

# Extract Mission 3 from Week 2
mission3_start = week2_content.find('mission_id: 3,')
mission3_end = week2_content.find('freetalk_knowledge: {')
mission3_text = week2_content[mission3_start:mission3_end-10]  # Remove trailing comma and spaces

# Extract freetalk_knowledge
freetalk_start = week2_content.find('freetalk_knowledge: {')
freetalk_end = week2_content.find('roleplay_scenarios: [')
freetalk_text = week2_content[freetalk_start:freetalk_end-5]

# Extract roleplay_scenarios
roleplay_start = week2_content.find('roleplay_scenarios: [')
roleplay_end = week2_content.find('export { week2RealData }')
roleplay_text = week2_content[roleplay_start:roleplay_end-5]

print("✅ Extracted sections from Week 2")

# ============================================
# ADAPT MISSION 2: Family Photos → Backpack Guessing Game
# ============================================
mission2_adapted = mission2_text

# Replace title and theme
mission2_adapted = mission2_adapted.replace('Family Photos', 'My Backpack')
mission2_adapted = mission2_adapted.replace('Ảnh Gia Đình', 'Ba Lô Của Tôi')
mission2_adapted = mission2_adapted.replace('Family Description Game', 'School Supplies Guessing Game')

# Replace greeting
mission2_adapted = mission2_adapted.replace(
    '"📸 Wow! I have your family photos! Let\'s play a guessing game!"',
    '"📚 Wow! I see your backpack! Let\'s play a guessing game!"'
)

# Replace hints
mission2_adapted = mission2_adapted.replace(
    '["My", "mother", "is", "kind", "father"]',
    '["I", "have", "a", "book", "notebook", "pen"]'
)

# Replace mission context
mission2_adapted = mission2_adapted.replace(
    'This is Week 2 Mission 2 - Family Photos (Guessing Game)',
    'This is Week 1 Mission 2 - My Backpack (Guessing Game)'
)

mission2_adapted = mission2_adapted.replace(
    'Ms. Nova looks at a family photo and gives clues about a family member',
    'Ms. Nova looks at the backpack and gives clues about school supplies'
)

mission2_adapted = mission2_adapted.replace(
    'Student guesses who it is or describes them',
    'Student guesses what item it is or describes it'
)

# Replace vocabulary patterns
mission2_adapted = mission2_adapted.replace(
    'VOCABULARY: mother, father, brother, sister, family, kind, happy, love, together',
    'VOCABULARY: backpack, book, notebook, pen, pencil, eraser, ruler, big, small, heavy, light'
)

mission2_adapted = mission2_adapted.replace(
    'GRAMMAR: "My [family member] is [adjective]"',
    'GRAMMAR: "I have a [item]" / "My backpack is [adjective]"'
)

mission2_adapted = mission2_adapted.replace(
    'PATTERN: Guess family members from photo clues',
    'PATTERN: Guess school supplies from description clues'
)

# Replace target_vocab
mission2_adapted = mission2_adapted.replace(
    'target_vocab: ["mother", "father", "brother", "sister", "kind", "happy", "love", "together"]',
    'target_vocab: ["backpack", "book", "notebook", "pen", "pencil", "eraser", "big", "small", "heavy", "light"]'
)

mission2_adapted = mission2_adapted.replace(
    'grammar_pattern: "My [family member] is [adjective]."',
    'grammar_pattern: "I have a [item]."'
)

# Replace opening_narrative
mission2_adapted = mission2_adapted.replace(
    '"📸 Wow! I have your family photos! Look at this one! I see someone who is kind. Who is kind in your family? Say: My mother is kind OR My father is kind"',
    '"📚 Wow! I see your backpack! Look inside! I see something red. What is red in your backpack? Say: My book is red OR My notebook is red OR My pen is red"'
)

# Replace story_character
mission2_adapted = mission2_adapted.replace(
    'curious, playful, loves guessing games about families',
    'curious, playful, loves guessing games about school supplies'
)

mission2_adapted = mission2_adapted.replace(
    'I have your family photo album! Let\'s play a guessing game with the photos!',
    'I see your backpack! Let\'s play a guessing game with your school supplies!'
)

mission2_adapted = mission2_adapted.replace(
    'gives clues, asks who/what, celebrates correct guesses',
    'gives clues about items, asks what/which, celebrates correct guesses'
)

mission2_adapted = mission2_adapted.replace(
    '"I love looking at family photos!"',
    '"I love school supplies!"'
)

mission2_adapted = mission2_adapted.replace(
    '"Each family member is special!"',
    '"Each item in your backpack is important!"'
)

mission2_adapted = mission2_adapted.replace(
    '"We use \'My mother is...\' and \'My father is...\' patterns!"',
    '"We use \'I have a...\' and \'My backpack is...\' patterns!"'
)

mission2_adapted = mission2_adapted.replace(
    'Photo game host giving family member clues',
    'Backpack game host giving school supply clues'
)

print("✅ Adapted Mission 2: Family Photos → My Backpack")

# ============================================
# ADAPT MISSION 3: Mixed Up Family → My Teacher vs Your Teacher
# ============================================
mission3_adapted = mission3_text

# Replace title and theme
mission3_adapted = mission3_adapted.replace('Mixed Up Family', 'My Teacher vs Your Teacher')
mission3_adapted = mission3_adapted.replace('Gia Đình Lẫn Lộn', 'Giáo Viên Của Tôi')
mission3_adapted = mission3_adapted.replace('My vs Your Grammar Game', 'My/Your School Grammar Game')

# Replace greeting
mission3_adapted = mission3_adapted.replace(
    '"🤔 Oh no! I keep saying the wrong words! Can you fix my mistakes?"',
    '"🤔 Oh no! I keep mixing up MY teacher and YOUR teacher! Can you fix my mistakes?"'
)

# Replace hints
mission3_adapted = mission3_adapted.replace(
    '["My", "mother", "is", "kind"]',
    '["My", "teacher", "is", "nice", "school"]'
)

# Replace mission context
mission3_adapted = mission3_adapted.replace(
    'This is Week 2 Mission 3 - Mixed Up Family (Grammar Correction Game)',
    'This is Week 1 Mission 3 - My Teacher vs Your Teacher (Grammar Correction Game)'
)

# Replace vocabulary
mission3_adapted = mission3_adapted.replace(
    'VOCABULARY: My, Your, mother, father, brother, sister, family, kind, happy',
    'VOCABULARY: My, Your, teacher, school, classroom, student, nice, kind, big, small'
)

mission3_adapted = mission3_adapted.replace(
    'PATTERN: Fix possessive adjective errors in family sentences',
    'PATTERN: Fix possessive adjective errors in school sentences'
)

mission3_adapted = mission3_adapted.replace(
    'target_vocab: ["mother", "father", "brother", "sister", "family", "kind", "happy", "love"]',
    'target_vocab: ["teacher", "school", "classroom", "student", "nice", "kind", "big", "small"]'
)

mission3_adapted = mission3_adapted.replace(
    'grammar_pattern: "My [family member] is... / Your [family member] is..."',
    'grammar_pattern: "My [teacher/school] is... / Your [teacher/school] is..."'
)

print("✅ Adapted Mission 3: Mixed Up Family → My Teacher vs Your Teacher")

# ============================================
# ADAPT FREETALK KNOWLEDGE
# ============================================
freetalk_adapted = freetalk_text

freetalk_adapted = freetalk_adapted.replace('week_title: "My Family Squad"', 'week_title: "Hello, World!"')
freetalk_adapted = freetalk_adapted.replace('week_number: 2', 'week_number: 1')
freetalk_adapted = freetalk_adapted.replace('theme: "Family Members and Relationships"', 'theme: "Introduction & Identity"')

# Replace knowledge_base
freetalk_adapted = re.sub(
    r'knowledge_base: \[(.*?)\]',
    '''knowledge_base: [
      "Identity: name, age, student, school, teacher",
      "Adjectives: happy, excited, nice, kind, big, small",
      "Grammar: I am [name/age/student]",
      "Students go to school to learn",
      "Teachers help students learn - they are kind and nice",
      "We use 'I am' to introduce ourselves",
      "Backpack has books, notebooks, pens - school supplies",
      "We say 'My teacher is...' and 'My school is...'",
      "Students can be happy, excited, or nervous on first day"
    ]''',
    freetalk_adapted,
    flags=re.DOTALL
)

# Replace example questions
freetalk_adapted = re.sub(
    r'example_opening_questions: \[(.*?)\]',
    '''example_opening_questions: [
      "What is your name?",
      "How old are you?",
      "Are you a student?",
      "Do you like school?",
      "What is your teacher like?",
      "What do you have in your backpack?",
      "Are you excited about school?"
    ]''',
    freetalk_adapted,
    flags=re.DOTALL
)

print("✅ Adapted freetalk_knowledge")

# ============================================
# ADAPT ROLEPLAY SCENARIOS
# ============================================
roleplay_adapted = roleplay_text

# Replace first roleplay
roleplay_adapted = roleplay_adapted.replace('rp_family_photo', 'rp_first_day')
roleplay_adapted = roleplay_adapted.replace('Family Photo Album 📷', 'First Day at School 🏫')
roleplay_adapted = roleplay_adapted.replace('Album ảnh gia đình', 'Ngày đầu đi học')
roleplay_adapted = roleplay_adapted.replace('"📷"', '"🏫"')
roleplay_adapted = roleplay_adapted.replace('Show Ms. Nova your family photos!', 'Meet Ms. Nova on your first day!')

# Replace second roleplay
roleplay_adapted = roleplay_adapted.replace('rp_family_dinner', 'rp_show_and_tell')
roleplay_adapted = roleplay_adapted.replace('Family Dinner Time 🍽️', 'Show and Tell - My Backpack 🎒')
roleplay_adapted = roleplay_adapted.replace('Bữa tối gia đình', 'Giới thiệu ba lô')
roleplay_adapted = roleplay_adapted.replace('"🍽️"', '"🎒"')
roleplay_adapted = roleplay_adapted.replace('Have dinner with your family!', 'Show your backpack and school supplies!')

# Replace third roleplay
roleplay_adapted = roleplay_adapted.replace('rp_weekend_family', 'rp_meet_teacher')
roleplay_adapted = roleplay_adapted.replace('Weekend with Family 🎉', 'Meet Your Teacher 👨‍🏫')
roleplay_adapted = roleplay_adapted.replace('Cuối tuần cùng gia đình', 'Gặp giáo viên')
roleplay_adapted = roleplay_adapted.replace('"🎉"', '"👨‍🏫"')
roleplay_adapted = roleplay_adapted.replace('Tell Ms. Nova about your weekend with family!', 'Tell Ms. Nova about your teacher and school!')

print("✅ Adapted roleplay_scenarios")

# ============================================
# COMBINE INTO WEEK 1
# ============================================

# Find where to insert (after Mission 1 ends)
# Look for the closing of Mission 1 (last success_criteria)
insertion_point = week1_content.rfind('    }\n  ],')

if insertion_point == -1:
    print("❌ Could not find insertion point in Week 1")
    exit(1)

# Move to after the missions array closing
insertion_point = week1_content.find('\n', insertion_point + 10)

# Insert Mission 2, Mission 3, freetalk, roleplay
new_week1 = week1_content[:insertion_point] + '\n,\n    ' + mission2_adapted + '\n,\n    ' + mission3_adapted + '\n  ],\n\n  ' + freetalk_adapted + ',\n\n  ' + roleplay_adapted + week1_content[insertion_point:]

# Fix export statement
new_week1 = new_week1.replace('export { week1RealData', '}\n\nexport { week1RealData')

# Write back
with open('/Users/binhnguyen/Downloads/Engquest3k/src/data/weeks/week_01_real.js', 'w', encoding='utf-8') as f:
    f.write(new_week1)

print("\n✅✅✅ DONE! Week 1 now has:")
print("  ✅ Mission 1: Story (kept as-is)")
print("  ✅ Mission 2: My Backpack Game (adapted from Week 2)")
print("  ✅ Mission 3: My Teacher vs Your Teacher Game (adapted from Week 2)")
print("  ✅ freetalk_knowledge (adapted)")
print("  ✅ roleplay_scenarios (adapted)")
print("\nHard reload browser để test!")
