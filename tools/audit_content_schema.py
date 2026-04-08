#!/usr/bin/env python3
"""Audit all writing.js and explore.js files for schema completeness."""
import os

BASE = 'src/data'
issues = []

# --- WRITING.JS AUDIT ---
print("=== writing.js audit ===")
for mode_folder, label in [('weeks_easy', 'Easy'), ('weeks', 'Adv')]:
    for i in range(1, 29):
        w = f'{i:02d}'
        path = f'{BASE}/{mode_folder}/week_{w}/writing.js'
        if not os.path.exists(path):
            issues.append(f'{label} W{w} writing.js: MISSING FILE')
            continue
        txt = open(path, encoding='utf-8').read()
        flags = []
        if 'title' not in txt:
            flags.append('NO_TITLE')
        if 'prompt_en' not in txt:
            flags.append('NO_PROMPT_EN')
        if 'prompt_vi' not in txt:
            flags.append('NO_PROMPT_VI')
        if 'model_sentence' not in txt:
            flags.append('NO_MODEL')
        if 'min_words' not in txt:
            flags.append('NO_MINWORDS')
        if 'prompts:' in txt and 'prompt_en' not in txt:
            flags.append('OLD_ARRAY_SCHEMA')
        if flags:
            issues.append(f'{label} W{w} writing.js: {" ".join(flags)}')

# --- EXPLORE.JS AUDIT ---
print("=== explore.js audit ===")
for mode_folder, label in [('weeks_easy', 'Easy'), ('weeks', 'Adv')]:
    for i in range(1, 29):
        w = f'{i:02d}'
        path = f'{BASE}/{mode_folder}/week_{w}/explore.js'
        if not os.path.exists(path):
            issues.append(f'{label} W{w} explore.js: MISSING FILE')
            continue
        txt = open(path, encoding='utf-8').read()
        flags = []
        if 'check_questions' not in txt:
            flags.append('NO_CHECK_QUESTIONS')
        if 'question_en' not in txt:
            flags.append('NO_QUESTION_EN')
        if 'question:' in txt and 'question_en' not in txt:
            flags.append('WRONG_FIELD_question_not_question_en')
        # Must have final question object
        if '"question"' not in txt and "'question'" not in txt:
            flags.append('NO_FINAL_QUESTION')
        if flags:
            issues.append(f'{label} W{w} explore.js: {" ".join(flags)}')

# --- LOGIC_SCIENCE.JS AUDIT (W16-W28) ---
print("=== logic_science.js audit ===")
for mode_folder, label in [('weeks_easy', 'Easy'), ('weeks', 'Adv')]:
    for i in range(16, 29):
        w = f'{i:02d}'
        path = f'{BASE}/{mode_folder}/week_{w}/logic_science.js'
        if not os.path.exists(path):
            issues.append(f'{label} W{w} logic_science.js: MISSING FILE')
            continue
        txt = open(path, encoding='utf-8').read()
        count = txt.count('question_en')
        if count < 5:
            issues.append(f'{label} W{w} logic_science.js: only {count} questions (target 5+)')

# --- READ.JS AUDIT ---
print("=== read.js audit ===")
for mode_folder, label in [('weeks_easy', 'Easy'), ('weeks', 'Adv')]:
    for i in range(1, 29):
        w = f'{i:02d}'
        path = f'{BASE}/{mode_folder}/week_{w}/read.js'
        if not os.path.exists(path):
            issues.append(f'{label} W{w} read.js: MISSING FILE')
            continue
        txt = open(path, encoding='utf-8').read()
        flags = []
        if 'comprehension_questions' not in txt and 'check_questions' not in txt:
            flags.append('NO_QUESTIONS')
        if 'comprehension_questions' not in txt and 'check_questions' in txt:
            flags.append('WRONG_FIELD_check_questions')
        if flags:
            issues.append(f'{label} W{w} read.js: {" ".join(flags)}')

print()
if issues:
    for iss in issues:
        print(iss)
else:
    print('ALL CLEAR - no issues found')
