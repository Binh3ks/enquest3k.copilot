#!/usr/bin/env python3
"""
Auto-generate Week 2 content based on Week 1 template
Using Claude to ensure quality matches Week 1 standard
"""

import json
import os
from pathlib import Path

# Week 2 Data from Syllabus
WEEK_2_DATA = {
    "week_id": 2,
    "topic_en": "My Family Squad (Relationships)",
    "topic_vi": "Biệt đội Gia đình",
    "learning_outcome": "Point to a photo and describe roles using 'My'",
    "grammar_focus": "This is my... (Possession)",
    "target_vocab": [
        {"word": "mother", "vi": "Mẹ"},
        {"word": "father", "vi": "Cha"},
        {"word": "brother", "vi": "Anh/em trai"},
        {"word": "sister", "vi": "Chị/em gái"},
        {"word": "family", "vi": "Gia đình"},
        {"word": "team", "vi": "Đội, nhóm"},
        {"word": "helper", "vi": "Người giúp đỡ"},
        {"word": "leader", "vi": "Người lãnh đạo"},
        {"word": "love", "vi": "Yêu thương"},
        {"word": "home", "vi": "Nhà, gia đình"}
    ]
}

# Instructions for Claude
INSTRUCTIONS = """
You are creating Week 2 content for EngQuest3k ESL program.

CONTEXT:
- Week 1: "Hello, World!" (Identity) - CEFR A0, introducing self
- Week 2: "My Family Squad" (Relationships) - CEFR A0, describing family

WEEK 2 REQUIREMENTS:
Topic: My Family Squad (Relationships)
Learning Outcome: Point to a photo and describe roles using "My"
Grammar Focus: "This is my..." (Possession) 
Vocabulary: mother, father, brother, sister, family, team, helper, leader, love, home

QUALITY STANDARDS (From Week 1):
✅ Child-friendly (ages 6-10)
✅ CEFR A0 only (simple, high-frequency words)
✅ Short sentences (8-14 words for Advanced, 5-8 for Easy)
✅ Natural, engaging stories
✅ Clear Vietnamese translations
✅ Educational + fun

TASK: Generate high-quality content that matches Week 1 quality standard.
"""

print("="*80)
print("🤖 Week 2 Auto-Generator with Claude")
print("="*80)
print()
print("📋 This script will guide Claude (you) to generate all 29 files for Week 2")
print("   based on Week 1 template, ensuring consistent quality.")
print()
print("WEEK 2 TOPIC:", WEEK_2_DATA["topic_en"])
print("GRAMMAR:", WEEK_2_DATA["grammar_focus"])
print("VOCABULARY:", ", ".join([v["word"] for v in WEEK_2_DATA["target_vocab"]]))
print()
print("="*80)
print()
print("🎯 FILES NEEDED:")
print("   ADVANCED MODE (15 files):")
print("     1. vocab.js ✅ (already created)")
print("     2. read.js")
print("     3. explore.js")
print("     4. word_power.js")
print("     5. grammar.js")
print("     6. logic.js")
print("     7. writing.js")
print("     8. dictation.js")
print("     9. shadowing.js")
print("     10. word_match.js")
print("     11. mindmap.js")
print("     12. ask_ai.js")
print("     13. daily_watch.js")
print("     14. index.js")
print("     15. video_queries.json")
print()
print("   EASY MODE (14 files): Same as above, minus video_queries.json")
print("   AI TUTOR (1 file): week_02_real.js")
print()
print("="*80)
print()
print("💡 INSTRUCTIONS:")
print("   Claude will now create each file one by one, following Week 1's schema")
print("   and quality standards. This ensures Week 2 is production-ready.")
print()
print("🚀 Starting generation...")
print()
