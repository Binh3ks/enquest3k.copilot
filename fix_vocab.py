with open('src/modules/vocab/VocabManager.jsx', 'r') as f:
    lines = f.readlines()

# Find start of VocabManager component
start_idx = None
for i, line in enumerate(lines):
    if 'const VocabManager = ({' in line:
        start_idx = i
        break

if start_idx:
    # Keep everything before component
    new_lines = lines[:start_idx]
    
    # Add fixed component start
    new_lines.append('\n')
    new_lines.append('const VocabManager = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {\n')
    new_lines.append('  const { weekId } = useParams();\n')
    new_lines.append('\n')
    new_lines.append('  if (!data || !data.vocab) return <div>Loading Vocab...</div>;\n')
    new_lines.append('\n')
    new_lines.append('  const [completedIds, setCompletedIds] = useState(() => {\n')
    new_lines.append('    const saved = loadStationState(weekId, \'vocab\');\n')
    new_lines.append('    return saved?.completed || [];\n')
    new_lines.append('  });\n')
    new_lines.append('\n')
    new_lines.append('  const handleCardComplete = (id) => {\n')
    new_lines.append('    setCompletedIds(prev => {\n')
    new_lines.append('      if (prev.includes(id)) return prev;\n')
    new_lines.append('      return [...prev, id];\n')
    new_lines.append('    });\n')
    new_lines.append('  };\n')
    new_lines.append('\n')
    new_lines.append('  // Save to localStorage\n')
    new_lines.append('  useEffect(() => {\n')
    new_lines.append('    if (weekId && completedIds.length > 0) {\n')
    new_lines.append('      saveStationState(weekId, \'vocab\', { completed: completedIds });\n')
    new_lines.append('    }\n')
    new_lines.append('  }, [completedIds, weekId]);\n')
    new_lines.append('\n')
    new_lines.append('  // Report progress to backend\n')
    new_lines.append('  useEffect(() => {\n')
    new_lines.append('    if (onReportProgress && completedIds.length > 0) {\n')
    new_lines.append('      const percent = Math.round((completedIds.length / data.vocab.length) * 100);\n')
    new_lines.append('      onReportProgress(percent);\n')
    new_lines.append('    }\n')
    new_lines.append('  }, [completedIds.length, data.vocab.length, onReportProgress]);\n')
    new_lines.append('\n')
    
    # Find the return statement
    for i in range(start_idx, len(lines)):
        if '  return (' in lines[i]:
            # Add everything from return onwards
            new_lines.extend(lines[i:])
            break
    
    with open('src/modules/vocab/VocabManager.jsx', 'w') as f:
        f.writelines(new_lines)
    
    print(f"Fixed VocabManager - replaced lines {start_idx+1} to return statement")
else:
    print("Could not find VocabManager component")
