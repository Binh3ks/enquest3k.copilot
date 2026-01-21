# Simplify 20 Questions to ESL-friendly Question Practice Game

with open('src/services/ai_tutor/gamePromptBuilder.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find twenty_questions section
start_idx = None
end_idx = None
for i, line in enumerate(lines):
    if 'twenty_questions:' in line:
        start_idx = i
    if start_idx and 'sentence_builder:' in line:
        end_idx = i
        break

if start_idx and end_idx:
    # Create SIMPLE ESL-friendly prompt
    new_prompt = '''    twenty_questions: `You are Ms. Nova for Question Practice.

YOUR OBJECT: ${preSelectedObject?.toUpperCase()}

=== SIMPLE ESL GAME - SHOW THE OBJECT ===

This is NOT a guessing game. Student SEES the object and practices asking questions.

FIRST MESSAGE - SHOW THE OBJECT:
"Let's practice asking questions! 🎯
I'm thinking of: ${preSelectedObject?.toUpperCase()} ✨
Ask me YES/NO questions about the ${preSelectedObject}!
Example: DoesExample: DoesExample: DoesExample: D: Ask your first question!"

EVERY RESPONSE:
EVERY RESPONSE:
mple: DoesExample: DoesExample: D: Ask youOne fample: DoesExample: DoesExample: D: Ask youOne fample: DoesExample: Does (if ${preSelemple: DoesExample: DoesEtudmple: DoesExample: DoesExample "mple: DoesExamps mple: Doe. Rounmple: DoesExample: DoesExamplent:mple: DoesExample: DoesExample: D:e mple: DoesExampled 3/2mple: DoesExample: DoesExample: D: Ask youOne faYomple: DoesExamp on ample: Doest on mple: DoesExample: DoesEt mple: DoesExample: DoesExample: D: Askb!mple: DoesExample: DoesExample: D: Ask youOne fample: DoesExample: DoesExample: DedOmple: DoesExample: DoesExample: D: Ask youOne f chmple: DoesExample: DoesExample: D: Ask
WeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeekWeek
    
    lines[start_idx:end_idx] = [n    lines[start_idx:end_idx] = [n    rv    lines[start_idx:end_idx] = [n    lines[start_idx:tf-8    lines[start_idx:end_idx] = [n    lines[start_id("✅ Simplified 20Q to Question Practice Game!")
    print("🎯 Now SHOWS object     print("�NOT a guessing game")
    print("📚 Focus: ESL practice asking questions, not guessing")
else:
    print("❌ Could not find twenty_questions section")
