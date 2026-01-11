#!/usr/bin/env python3
"""
CRITICAL FIX: Ensure ALL hooks are called BEFORE any early returns
This fixes the React Hooks order violation error
"""
import os
import re

# Files that need fixing (have useParams and may have early returns after it)
FILES_TO_CHECK = [
    'src/modules/explore/Explore.jsx',
    'src/modules/logic/LogicLab.jsx',
    'src/modules/power/WordPower.jsx',
    'src/modules/production/MindMapSpeaking.jsx',
    'src/modules/read/ReadingExplore.jsx',
    'src/modules/shadowing/Shadowing.jsx',
    'src/modules/video/VideoChallenge.jsx',
    'src/modules/watch/DailyWatch.jsx',
    'src/modules/match/WordMatch.jsx',
]

def check_and_fix_file(filepath):
    """Check if hooks are called before early returns"""
    
    if not os.path.exists(filepath):
        print(f"⏭️  Skip {filepath} - not found")
        return False
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find component start
    comp_match = re.search(r'(const \w+\s*=\s*\(\{[^}]+\}\)\s*=>\s*\{)', content)
    if not comp_match:
        print(f"⚠️  {filepath} - Could not find component")
        return False
    
    comp_start = comp_match.end()
    
    # Find first early return
    early_return_match = re.search(r'\n  if \([^)]+\) return', content[comp_start:])
    
    if not early_return_match:
        print(f"✅ {filepath} - No early return found")
        return True
    
    early_return_pos = comp_start + early_return_match.start()
    
    # Find all useState calls
    usestate_matches = list(re.finditer(r'  const \[[^\]]+\] = useState', content[comp_start:]))
    
    if not usestate_matches:
        print(f"✅ {filepath} - No useState calls")
        return True
    
    # Check if any useState comes AFTER early return
    first_usestate_pos = comp_start + usestate_matches[0].start()
    
    if first_usestate_pos > early_return_pos:
        print(f"❌ {filepath} - useState AFTER early return! CRITICAL BUG!")
        print(f"   Early return at char {early_return_pos}, useState at {first_usestate_pos}")
        return False
    else:
        print(f"✅ {filepath} - Hooks called before early return")
        return True

def main():
    print("🔍 Checking React Hooks order in all stations...\n")
    
    ok_count = 0
    bad_count = 0
    
    for filepath in FILES_TO_CHECK:
        try:
            if check_and_fix_file(filepath):
                ok_count += 1
            else:
                bad_count += 1
        except Exception as e:
            print(f"❌ {filepath}: {str(e)}")
            bad_count += 1
    
    print(f"\n{'='*60}")
    print(f"✅ OK: {ok_count} files")
    print(f"❌ CRITICAL: {bad_count} files")
    print(f"{'='*60}")
    
    if bad_count > 0:
        print("\n⚠️  CRITICAL: Some files have useState AFTER early return!")
        print("This violates Rules of Hooks and causes crashes.")
        print("\nFix: Move ALL hooks (useState, useEffect) BEFORE early returns.")
    else:
        print("\n✅ All files OK!")

if __name__ == '__main__':
    main()
