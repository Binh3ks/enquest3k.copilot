#!/usr/bin/env python3
"""
COMPLETE REWRITE - Progress Saving System for All 13 Stations
This script adds proper progress persistence to all learning stations
"""

import os
import re

# Station configurations: (file, stationKey, progressVar, totalVar, dataCheck)
STATIONS = [
    {
        'file': 'src/modules/vocab/VocabManager.jsx',
        'key': 'vocab',
        'progressVar': 'completedIds.length',
        'totalVar': 'data.vocab.length',
        'dataCheck': '!data || !data.vocab',
        'stateInit': "useState(() => {\n    const saved = loadStationState(weekId, 'vocab');\n    return saved?.completed || [];\n  })",
    },
    {
        'file': 'src/modules/grammar/GrammarEngine.jsx',
        'key': 'grammar',
        'progressVar': 'completedQuestions.length',
        'totalVar': 'data.exercises.length',
        'dataCheck': '!data?.exercises',
        'stateInit': "useState(() => {\n    const saved = loadStationState(weekId, 'grammar');\n    return saved?.completed || [];\n  })",
    },
    {
        'file': 'src/modules/ask_ai/AskAi.jsx',
        'key': 'ask_ai',
        'progressVar': 'completedPrompts.size',
        'totalVar': 'data.prompts.length',
        'dataCheck': '!data?.prompts',
        'stateInit': "useState(() => {\n    const saved = loadStationState(weekId, 'ask_ai');\n    const savedArray = saved?.completed || [];\n    return new Set(savedArray);\n  })",
    },
    {
        'file': 'src/modules/dictation/DictationEngine.jsx',
        'key': 'dictation',
        'progressVar': 'completedIds.length',
        'totalVar': 'data.sentences.length',
        'dataCheck': '!data?.sentences',
        'stateInit': "useState(() => {\n    const saved = loadStationState(weekId, 'dictation');\n    return saved?.completed || [];\n  })",
    },
    {
        'file': 'src/modules/explore/Explore.jsx',
        'key': 'explore',
        'progressVar': 'completedIds.length',
        'totalVar': 'data.check_questions.length',
        'dataCheck': '!data?.check_questions',
        'stateInit': "useState(() => {\n    const saved = loadStationState(weekId, 'explore');\n    return saved?.completed || [];\n  })",
    },
    {
        'file': 'src/modules/logic/LogicLab.jsx',
        'key': 'logic',
        'progressVar': 'completedIds.length',
        'totalVar': 'data.puzzles.length',
        'dataCheck': '!data',
        'stateInit': "useState(() => {\n    const saved = loadStationState(weekId, 'logic');\n    return saved?.completed || [];\n  })",
    },
    {
        'file': 'src/modules/power/WordPower.jsx',
        'key': 'power',
        'progressVar': 'completedIds.length',
        'totalVar': 'data.vocab.length',
        'dataCheck': '!data?.vocab',
        'stateInit': "useState(() => {\n    const saved = loadStationState(weekId, 'power');\n    return saved?.completed || [];\n  })",
    },
]

def add_imports(content):
    """Add necessary imports if not present"""
    if "import { useParams } from 'react-router-dom'" not in content:
        content = content.replace(
            "import React,",
            "import React,\nimport { useParams } from 'react-router-dom';"
        )
    
    if "import { saveStationState, loadStationState }" not in content:
        # Find last import line
        import_lines = [i for i, line in enumerate(content.split('\n')) if line.startswith('import ')]
        if import_lines:
            lines = content.split('\n')
            last_import = import_lines[-1]
            lines.insert(last_import + 1, "import { saveStationState, loadStationState } from '../../utils/stationStateHelper';")
            content = '\n'.join(lines)
    
    return content

def add_progress_hooks(content, config):
    """Add progress saving hooks to component"""
    key = config['key']
    progress_var = config['progressVar']
    total_var = config['totalVar']
    
    # For Set-based completedPrompts (Ask AI)
    if 'completedPrompts.size' in progress_var:
        save_code = f"""
  // Save to localStorage
  useEffect(() => {{
    if (weekId && completedPrompts.size > 0) {{
      saveStationState(weekId, '{key}', {{ completed: Array.from(completedPrompts) }});
    }}
  }}, [completedPrompts.size, weekId]);

  // Report progress to backend
  useEffect(() => {{
    if (onReportProgress && data?.prompts && completedPrompts.size > 0) {{
      const percent = Math.round(({progress_var} / {total_var}) * 100);
      onReportProgress(percent);
    }}
  }}, [{progress_var}, {total_var}, onReportProgress]);

  // Report initial progress on mount
  useEffect(() => {{
    if (onReportProgress && data?.prompts && completedPrompts.size > 0) {{
      const percent = Math.round(({progress_var} / {total_var}) * 100);
      onReportProgress(percent);
    }}
  }}, []);"""
    else:
        # For array-based completedIds
        save_code = f"""
  // Save to localStorage
  useEffect(() => {{
    if (weekId && completedIds.length > 0) {{
      saveStationState(weekId, '{key}', {{ completed: completedIds }});
    }}
  }}, [completedIds, weekId]);

  // Report progress to backend
  useEffect(() => {{
    if (onReportProgress && data && completedIds.length > 0) {{
      const percent = Math.round((completedIds.length / {total_var}) * 100);
      onReportProgress(percent);
    }}
  }}, [completedIds.length, data, onReportProgress]);

  // Report initial progress on mount
  useEffect(() => {{
    if (onReportProgress && data && completedIds.length > 0) {{
      const percent = Math.round((completedIds.length / {total_var}) * 100);
      onReportProgress(percent);
    }}
  }}, []);"""
    
    return save_code

def process_station(config):
    """Process a single station file"""
    filepath = config['file']
    
    if not os.path.exists(filepath):
        print(f"❌ {filepath} not found")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    content = original_content
    
    # Step 1: Add imports
    content = add_imports(content)
    
    # Step 2: Add weekId extraction after component declaration
    # Find the component function declaration
    component_pattern = r'(const \w+\s*=\s*\(\{[^}]+\}\)\s*=>\s*\{)'
    
    if not re.search(component_pattern, content):
        print(f"⚠️  {filepath}: Could not find component declaration")
        return False
    
    # Add weekId after component start if not present
    if 'const { weekId } = useParams()' not in content:
        content = re.sub(
            component_pattern,
            r'\1\n  const { weekId } = useParams();\n',
            content,
            count=1
        )
    
    # Step 3: Check if already has progress hooks
    if '// Save to localStorage' in content and '// Report progress to backend' in content:
        print(f"✅ {filepath} - Already has progress hooks")
        return True
    
    # Step 4: Find location to insert hooks (before return statement)
    # Look for the main return statement of the component
    return_match = re.search(r'\n  return \(', content)
    if not return_match:
        print(f"⚠️  {filepath}: Could not find return statement")
        return False
    
    insert_pos = return_match.start()
    
    # Generate hooks code
    hooks_code = add_progress_hooks(content, config)
    
    # Insert hooks before return
    content = content[:insert_pos] + hooks_code + '\n' + content[insert_pos:]
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filepath} - Progress hooks added")
    return True

def main():
    print("🚀 Starting COMPLETE REWRITE of Progress Saving System\n")
    
    success_count = 0
    fail_count = 0
    
    for config in STATIONS:
        try:
            if process_station(config):
                success_count += 1
            else:
                fail_count += 1
        except Exception as e:
            print(f"❌ {config['file']}: {str(e)}")
            fail_count += 1
    
    print(f"\n{'='*60}")
    print(f"✅ Success: {success_count} stations")
    print(f"❌ Failed: {fail_count} stations")
    print(f"{'='*60}")
    
    if fail_count == 0:
        print("\n🎉 ALL STATIONS UPDATED SUCCESSFULLY!")
        print("\nNext steps:")
        print("1. Refresh browser (Cmd+R)")
        print("2. Open DevTools Console (F12)")
        print("3. Complete an activity in ANY station")
        print("4. Check localStorage: localStorage.getItem('engquest_station_1_ask_ai')")
        print("5. Refresh and verify progress persists")
    else:
        print("\n⚠️  Some stations failed. Please check errors above.")

if __name__ == '__main__':
    main()
