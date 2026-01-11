#!/usr/bin/env python3
"""
Add save/load logic to VocabManager EXACTLY like Dictation
"""

file_path = "src/modules/vocab/VocabManager.jsx"

with open(file_path, 'r') as f:
    lines = f.readlines()

# Find where to insert imports
import_line = -1
for i, line in enumerate(lines):
    if "import { analyzeAnswer }" in line:
        import_line = i
        break

if import_line >= 0:
    # Add missing imports after analyzeAnswer
    lines.insert(import_line + 1, "import { useParams } from 'react-router-dom';\n")
    lines.insert(import_line + 2, "import { saveStationState, loadStationState } from '../../utils/stationStateHelper';\n")

# Find VocabManager component start
comp_start = -1
for i, line in enumerate(lines):
    if "const VocabManager =" in line:
        comp_start = i
        break

if comp_start >= 0:
    # Find where useState starts (after component declaration)
    state_line = -1
    for i in range(comp_start, min(comp_start + 10, len(lines))):
        if "const [completedIds" in lines[i]:
            state_line = i
            break
    
    if state_line >= 0:
        # Replace the useState line and add hooks
        indent = "  "
        new_code = f"""{indent}const {{ weekId }} = useParams();

{indent}const [completedIds, setCompletedIds] = useState(() => {{
{indent}  const saved = loadStationState(weekId, 'vocab');
{indent}  return saved?.completed || [];
{indent}}});

{indent}// Re-load from localStorage when weekId changes
{indent}useEffect(() => {{
{indent}  if (weekId) {{
{indent}    const saved = loadStationState(weekId, 'vocab');
{indent}    if (saved?.completed) {{
{indent}      setCompletedIds(saved.completed);
{indent}    }}
{indent}  }}
{indent}}}, [weekId]);

{indent}// Save to localStorage
{indent}useEffect(() => {{
{indent}  if (weekId && completedIds.length > 0) {{
{indent}    saveStationState(weekId, 'vocab', {{ completed: completedIds }});
{indent}  }}
{indent}}}, [completedIds, weekId]);

{indent}// Report progress to backend
{indent}useEffect(() => {{
{indent}  if (onReportProgress && data?.vocab && completedIds.length > 0) {{
{indent}    const percent = Math.round((completedIds.length / data.vocab.length) * 100);
{indent}    onReportProgress(percent);
{indent}  }}
{indent}}}, [completedIds.length, data?.vocab?.length, onReportProgress]);

{indent}// Report initial progress on mount
{indent}useEffect(() => {{
{indent}  if (onReportProgress && data?.vocab && completedIds.length > 0) {{
{indent}    const percent = Math.round((completedIds.length / data.vocab.length) * 100);
{indent}    onReportProgress(percent);
{indent}  }}
{indent}}}, []);
"""
        # Remove old useState line
        lines[state_line] = new_code

with open(file_path, 'w') as f:
    f.writelines(lines)

print("✅ Fixed VocabManager with save/load logic!")
