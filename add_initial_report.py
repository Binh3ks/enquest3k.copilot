#!/usr/bin/env python3
"""Fix all stations - add initial progress report on mount"""
import os
import re

STATIONS = [
    ('src/modules/vocab/VocabManager.jsx', 'completedIds.length', 'data.vocab.length'),
    ('src/modules/grammar/GrammarEngine.jsx', 'completedQuestions.length', 'data.exercises.length'),
    ('src/modules/ask_ai/AskAi.jsx', 'completedPrompts.size', 'data.prompts.length'),
    ('src/modules/dictation/DictationEngine.jsx', 'completedIds.length', 'data.sentences.length'),
    ('src/modules/explore/Explore.jsx', 'completedIds.length', 'data.check_questions.length'),
    ('src/modules/logic/LogicLab.jsx', 'completedIds.length', 'data.puzzles.length'),
    ('src/modules/power/WordPower.jsx', 'completedIds.length', 'data.vocab.length'),
]

for filepath, progress_var, total_var in STATIONS:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if already has initial progress report
    if '// Report initial progress on mount' in content:
        print(f"✅ {filepath} - Already has initial report")
        continue
    
    # Find the last useEffect (Report progress to backend)
    last_useeffect_pattern = r'(  // Report progress to backend\n  useEffect\(\(\) => \{[^}]+\}, \[[^\]]+\]\);)'
    
    match = re.search(last_useeffect_pattern, content, re.DOTALL)
    if not match:
        print(f"⚠️  {filepath} - Could not find progress report useEffect")
        continue
    
    # Add initial progress report after it
    initial_report = f"""

  // Report initial progress on mount
  useEffect(() => {{
    if (onReportProgress && data && {progress_var} > 0) {{
      const percent = Math.round(({progress_var} / {total_var}) * 100);
      onReportProgress(percent);
    }}
  }}, []);"""
    
    # Insert after the matched useEffect
    insert_pos = match.end()
    content = content[:insert_pos] + initial_report + content[insert_pos:]
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"✅ {filepath} - Added initial progress report")

print("\n🎉 Done! All stations now report initial progress on mount.")
