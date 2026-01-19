# WEEK 2 VALIDATION SCRIPT
# Kiểm tra tất cả files theo đúng blueprint

import json
import sys

def validate_week_2():
    errors = []
    
    # 1. Check Ask AI - must be QUESTIONS not statements
    ask_ai_adv = read_file('src/data/weeks/week_02/ask_ai.js')
    if 'Say it' in ask_ai_adv or 'Describe' in ask_ai_adv:
        errors.append("Ask AI Advanced: Must teach QUESTIONS (Who/Where/Is/Can), not statements")
    
    ask_ai_easy = read_file('src/data/weeks_easy/week_02/ask_ai.js')
    if 'Say it' in ask_ai_easy:
        errors.append("Ask AI Easy: Must teach QUESTIONS")
    
    # 2. Check Dictation - must copy from Read
    read_adv = read_file('src/data/weeks/week_02/read.js')
    dictation_adv = read_file('src/data/weeks/week_02/dictation.js')
    
    # Extract first sentence from read
    if "My family is like a team" not in dictation_adv:
        errors.append("Dictation Advanced: First sentence must be 'My family is like a team.' from read.js")
    
    # 3. Check Grammar - must have 20 exercises
    grammar_adv = read_file('src/data/weeks/week_02/grammar.js')
    exercise_count = grammar_adv.count('{ id:')
    if exercise_count < 20:
        errors.append(f"Grammar Advanced: Only {exercise_count} exercises, need 20")
    
    grammar_easy = read_file('src/data/weeks_easy/week_02/grammar.js')
    exercise_count_easy = grammar_easy.count('{ id:')
    if exercise_count_easy < 20:
        errors.append(f"Grammar Easy: Only {exercise_count_easy} exercises, need 20")
    
    # 4. Check Mindmap - must have 6 branches each
    mindmap_easy = read_file('src/data/weeks_easy/week_02/mindmap.js')
    # Count branches in each stem
    if mindmap_easy.count('"My mom ___."') == 0:
        errors.append("Mindmap Easy: Missing structure")
    else:
        # Check first stem has 6 items
        start = mindmap_easy.find('"My mom ___."')
        end = mindmap_easy.find('"My dad ___."', start)
        section = mindmap_easy[start:end]
        item_count = section.count('",')
        if item_count < 5:  # 6 items = 5 commas between them
            errors.append(f"Mindmap Easy 'My mom': Only {item_count+1} branches, need 6")
    
    # 5. Check Explore - must have check_questions not comprehension_questions
    explore_adv = read_file('src/data/weeks/week_02/explore.js')
    if 'comprehension_questions' in explore_adv:
        errors.append("Explore Advanced: Must use 'check_questions' not 'comprehension_questions'")
    
    explore_easy = read_file('src/data/weeks_easy/week_02/explore.js')
    if 'comprehension_questions' in explore_easy:
        errors.append("Explore Easy: Must use 'check_questions'")
    
    # 6. Check Logic - must have full context
    logic_easy = read_file('src/data/weeks_easy/week_02/logic.js')
    if '"I have 1 mom and 1 dad. How many?"' in logic_easy:
        errors.append("Logic Easy: Question too short, need full context like 'I have 1 mom and 1 dad in my family. They both love me. How many people?'")
    
    # 7. Check AI Tutor exists
    try:
        ai_tutor = read_file('src/data/weeks/week_02_real.js')
        if 'week_id: 2' not in ai_tutor and 'id: 2' not in ai_tutor:
            errors.append("AI Tutor: week_02_real.js exists but not for week 2")
    except:
        errors.append("AI Tutor: week_02_real.js not found")
    
    return errors

def read_file(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"ERROR: {e}"

if __name__ == "__main__":
    print("🔍 Validating Week 2...")
    errors = validate_week_2()
    
    if errors:
        print("\n❌ ERRORS FOUND:")
        for i, error in enumerate(errors, 1):
            print(f"{i}. {error}")
        sys.exit(1)
    else:
        print("✅ Week 2 validation passed!")
        sys.exit(0)
