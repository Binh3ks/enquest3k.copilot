#!/usr/bin/env python3
"""
Remove objectives arrays from week files.
Objectives are disabled in StoryMissionTab.jsx and not used.
"""

import re

files_to_clean = {
    'src/data/weeks/week_02_real.js': [
        (393, 831),   # Mission 1
        (956, 1375),  # Mission 2 (after deletion, lines shift)
        (1515, 1890)  # Mission 3 (after deletion, lines shift)
    ],
    'src/data/weeks/week_04_real.js': [(269, 458)],
    'src/data/weeks/week_05_real.js': [(266, 534)],
    'src/data/weeks/week_06_real.js': [(274, 488)],
    'src/data/weeks/week_07_real.js': [(283, 551)]
}

def remove_objectives_from_file(filepath, line_ranges):
    """Remove objectives arrays from file."""
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    # Process in reverse order to prevent line number shifts
    for start, end in reversed(line_ranges):
        # Find the objectives line and verify
        objectives_line = lines[start - 1]
        if 'objectives:' not in objectives_line:
            print(f"⚠️  Line {start} doesn't contain 'objectives:', skipping")
            continue
        
        # Check what's before objectives
        before_objectives = start - 1
        while before_objectives >= 0 and lines[before_objectives].strip() in ['', '// 🔥 OBJECTIVES ARRAY (Winner feature from Week 4-7)']:
            before_objectives -= 1
        
        # Delete from the line after before_objectives to end line (inclusive)
        # But keep proper spacing
        del lines[start-1:end]
        print(f"✅ Removed lines {start}-{end} ({end-start+1} lines)")
    
    # Write back
    with open(filepath, 'w') as f:
        f.writelines(lines)
    
    print(f"✅ Cleaned {filepath}")

# Process each file
for filepath, ranges in files_to_clean.items():
    print(f"\n=== Processing {filepath} ===")
    remove_objectives_from_file(filepath, ranges)

print("\n✅✅✅ All objectives arrays removed!")
print("\nSummary:")
print("- Week 2: Removed 3 objectives arrays (Missions 1, 2, 3)")
print("- Week 4: Removed 1 objectives array")
print("- Week 5: Removed 1 objectives array")
print("- Week 6: Removed 1 objectives array")
print("- Week 7: Removed 1 objectives array")
print("\nTotal: 7 objectives arrays removed from 5 files")
