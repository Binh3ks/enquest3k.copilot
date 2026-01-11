import os
import re

stations = [
    ('src/modules/vocab/VocabManager.jsx', 'vocab', 'completedIds.length', 'data.vocab.length'),
    ('src/modules/grammar/GrammarEngine.jsx', 'grammar', 'completedQuestions.length', 'data.exercises.length'),
]

for filepath, station, progress_var, total_var in stations:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} - not found")
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if already has initial progress report
    if '// Report initial progress on mount' in content:
        print(f"⏭️  Skipping {filepath} - already has initial progress report")
        continue
    
    # Find the backend report useEffect and add initial progress report after it
    pattern = r'(  // Report progress to backend\n  useEffect\(\(\) => \{[^\}]+\}, \[[^\]]+\]\);)'
    
    if re.search(pattern, content, re.DOTALL):
        # Add initial progress report useEffect
        initial_progress = f"\n\n  // Report initial progress on mount (for saved state)\n  useEffect(() => {{\n    if (onReportProgress && data && {progress_var} > 0) {{\n      const percent = Math.round(({progress_var} / {total_var}) * 100);\n      onReportProgress(percent);\n    }}\n  }}, []); // Empty deps - run only on mount"
        
        content = re.sub(pattern, r'\1' + initial_progress, content, flags=re.DOTALL)
        
        with open(filepath, 'w') as f:
            f.write(content)
        
        print(f"✅ Fixed {filepath}")
    else:
        print(f"⚠️  Could not find pattern in {filepath}")

print("\nDone!")
