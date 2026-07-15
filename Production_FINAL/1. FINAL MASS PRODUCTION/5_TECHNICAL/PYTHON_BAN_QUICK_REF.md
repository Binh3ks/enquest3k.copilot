# 📋 PYTHON BAN - QUICK REFERENCE

> **Why this exists:** Week 12 had 11 issues, 36% caused by Python script usage  
> **Date:** March 10, 2026  
> **Status:** 🔴 ABSOLUTE PROHIBITION

---

## 🚫 THE RULE

### **❌ NEVER use Python to create JavaScript files**

```bash
# ❌ FORBIDDEN - Python print() to JS file:
python3 -c "print('export default {...}')" > week_13_real.js
python3 script.py > vocab.js
python3 << EOF > file.js

# ✅ REQUIRED - Node.js with fs:
node /tmp/generate.mjs
# Inside: writeFileSync('target.js', content, 'utf8');
```

---

## 🧠 WHY IT FAILS

### **Python Perspective:**
```python
# Python thinks: "I created a file!" ✅
with open('week_12_real.js', 'w') as f:
    f.write("export default { missions: [...] }")
# File exists → Success!
```

### **JavaScript Perspective:**
```javascript
// JavaScript sees: "Syntax errors!" ❌
import week12 from './week_12_real.js'
// SyntaxError: Unexpected token '\'
// Error: Missing } after property list
```

### **Problems:**

1. **Encoding Corruption**
   - Python print() adds control characters when piping
   - Long lines get wrapped with `\` at unexpected positions
   - Unicode handling differs between Python/JS

2. **No JS Validation**
   - Python cannot check:
     - Missing commas in objects
     - Unbalanced brackets
     - Invalid `export` syntax
     - Template literal syntax
     - Module format

3. **String Escaping Mismatch**
   ```python
   # Python escaping:
   print("\"Hello\"")  # → "Hello"
   
   # JS template literals:
   `Hello ${name}`     # Python doesn't understand this
   ```

---

## 💥 REAL IMPACT (Week 12)

### **Cascading Failures:**

```
Python creates broken JS
    ↓
Import fails: SyntaxError
    ↓
Build fails OR fallback to Week 7
    ↓
AI Tutor shows wrong missions
    ↓
Students see Week 7 content for Week 12
    ↓
Launch delayed, emergency hotfix
```

### **Metrics:**
- **Total Week 12 Issues:** 11
- **Critical (blocked launch):** 4 (36%)
- **Caused by Python directly:** 1 (Issue 11)
- **Caused by Python indirectly:** 3 (domino effect)
- **Total Python-related:** 4/11 = 36%

---

## ✅ CORRECT WORKFLOW

### **Template for Creating JS Files:**

```bash
# 1. Create Node.js generator script
cat > /tmp/generate_week13.mjs << 'EOF'
import { writeFileSync } from 'fs';

const content = `
export default {
  week_id: "week_13",
  title: "Week 13: [Theme from Syllabus]",
  story_missions: [
    {
      id: "week_13_m1",
      title: "Mission 1",
      // ... full mission content
    }
  ]
};
`;

writeFileSync('src/data/weeks/week_13_real.js', content.trim() + '\n', 'utf8');
console.log('✅ File created successfully');
EOF

# 2. Run with Node (NOT Python)
node /tmp/generate_week13.mjs

# 3. IMMEDIATELY validate syntax
node --input-type=module < src/data/weeks/week_13_real.js

# 4. If ANY error → STOP and fix
# DO NOT proceed to next file until syntax is OK
```

---

## 🔍 VALIDATION COMMANDS

### **After Creating EACH File:**

```bash
# Validate syntax (MANDATORY)
node --input-type=module < src/data/weeks/week_13/vocab.js && echo "✅ OK" || echo "❌ SYNTAX ERROR"

# If ❌ appears → FIX IMMEDIATELY
# DO NOT create next file until this one passes
```

### **Before Proceeding to Audio:**

```bash
# Validate ALL 29 files
for file in src/data/weeks/week_13/*.js; do
  echo "Checking $(basename $file)..."
  node --input-type=module < "$file" || exit 1
done

for file in src/data/weeks_easy/week_13/*.js; do
  echo "Checking easy/$(basename $file)..."
  node --input-type=module < "$file" || exit 1
done

# If ANY file fails → STOP entire workflow
echo "✅ All 29 files passed syntax validation"
```

---

## 📚 WHEN TO USE PYTHON (Safe Cases)

### **✅ Python IS allowed for:**

1. **Audio generation**
   ```bash
   python3 tools/generate_audio_deepgram.py 13 --mode all
   # Safe: Generates .mp3 files, not .js files
   ```

2. **Image processing**
   ```bash
   python3 tools/auto_rename.py 13
   # Safe: Renames .jpg files, no JS generation
   ```

3. **Data analysis**
   ```bash
   python3 tools/audit_week12_audio_complete.py
   # Safe: Reads data, outputs to terminal
   ```

4. **Validation scripts**
   ```bash
   python3 tools/validate_week_content.py 13
   # Safe: Checks data, no file generation
   ```

### **❌ Python is FORBIDDEN for:**

1. **ANY .js or .jsx file creation**
2. **ANY content that will be imported by JavaScript**
3. **ANY module export statements**
4. **ANY file that Node.js will parse**

---

## 🎯 ENFORCEMENT

### **Pre-commit Hook (Recommended):**

```bash
# .git/hooks/pre-commit
#!/bin/bash

# Check for Python-generated JS files
CHANGED_JS=$(git diff --cached --name-only --diff-filter=ACM | grep '\.js$')

for file in $CHANGED_JS; do
  # Validate syntax
  if ! node --input-type=module < "$file" 2>/dev/null; then
    echo "❌ Syntax error in $file"
    echo "→ If created with Python, this is WHY Python is banned"
    echo "→ Re-create with Node.js and validate"
    exit 1
  fi
done

echo "✅ All JS files passed validation"
```

### **Code Review Checklist:**

When reviewing PRs for new weeks:
- [ ] Check git history: No Python scripts creating .js files
- [ ] Verify: All .js files created with Node.js
- [ ] Confirm: Syntax validation ran for ALL files
- [ ] No files with encoding issues or control characters

---

## 📖 RELATED DOCS

- **Full Analysis:** `PRODUCTION_LESSONS_LEARNED.md` (Category A: Agent Execution Failures)
- **Lessons Learned:** `PRODUCTION_LESSONS_LEARNED.md` (Issue A2: Python for JS files)
- **Workflow Guide:** `QUICK_REF copy.md` (Python Ban section)
- **Production Process:** `1. WEEK_PRODUCTION_PROMPT.md` (BƯỚC 3)

---

## 💡 REMEMBER

**User's quote (Week 12 post-mortem):**
> *"agent hỏi có cho phép chạy python script cho nhanh ko thì tôi đã đồng ý và vì thế mà bị ảo giác"*

**Translation:**
> "Agent asked if it's OK to run Python scripts for speed, I agreed, and that caused hallucinations"

**Lesson:**
- **Speed ≠ Correctness**
- Python may be faster to write, but causes bugs that take 10x longer to fix
- **Always choose Node.js for JS files** - even if it seems slower upfront
- Validation catches errors immediately with Node, but Python bypasses all checks

---

**Status:** 🔴 ABSOLUTE RULE - NO EXCEPTIONS  
**Violation Consequence:** Cascading failures, production bugs, emergency hotfixes  
**Last Updated:** March 10, 2026
