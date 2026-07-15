# 🔍 WEEK 12 ROOT CAUSE ANALYSIS - TẠI SAO BỊ SAI?

**Date:** March 6, 2026  
**Purpose:** Xác định nguyên nhân gốc rễ 11 bugs Week 12 → Đề xuất cải thiện Master Prompt

---

## 📊 EXECUTIVE SUMMARY

**Kết luận:** **85% LỖI AGENT + 15% LỖI PROMPT**

**Phân tích:**
- Agent KHÔNG FOLLOW instructions rõ ràng (dictation/shadowing copy từ read.js)
- Agent KHÔNG ĐỌC Golden Standard (Week 5/6 confusion)  
- Master Prompt CÓ CONTRADICTION (Week 5 vs Week 6)
- Master Prompt THIẾU step-by-step guide cho dictation/shadowing

---

## 🔥 11 BUGS - NGUYÊN NHÂN CHI TIẾT

### **BUG #1 & #6: dictation.js Field Names Wrong**

**Master Prompt Line 174:**
> `audio_url: "/audio/week[N]/dictation_{number}.mp3"`

**Week 5 Golden (dictation.js Line 3):**
```javascript
{ id: 1, text: "...", meaning: "...", audio_url: "..." }
```

**Week 12 Agent Làm:**
```javascript
{ id: 1, text: "...", translation_vi: "...", audio: "..." }  // ❌ SAI
```

**Verdict:** Agent không check Week 5 → tự sáng tạo field names

---

### **BUG #5 & #7: dictation/shadowing KHÔNG Copy từ read.js**

**Master Prompt (REPEATED 5 TIMES):**
> "Copy EXACT sentences từ read.js"

**Blueprint:**
> "Nguồn dữ liệu: Sử dụng chính bài đọc của tuần trong Tab Read & Explore"

**Quick Ref:**
> "**QUY TẮC:** KHÔNG tự viết câu mới, PHẢI copy từ read.js!"

**Week 12 Agent Làm:**  
- Easy read.js: "Today is talent show! Sarah can **sing**..."
- Easy dictation: "I can sing." ← ❌ Generic, KHÔNG từ read.js

**Verdict:** Agent HOÀN TOÀN IGNORE 3 documents viết rõ ràng

---

### **BUG #4: ask_ai.js Wrong Structure**

**Master Prompt Line 220:**
```markdown
12. **ask_ai.js** - ⚠️ **CHÍNH XÁC 5 PROMPTS**
    - `audio_url: "/audio/week[N]/ask_ai_{1-5}.mp3"`
```

**Week 5 Golden:**
```javascript
export default {
  prompts: [{ id: 1, context_en: "...", audio_url: "..." }]
};
```

**Week 12 Agent Làm:**
```javascript
export default {
  theme: "...",
  contexts_easy: [...],  // ❌ SAI structure
  contexts_advanced: [...]
};
```

**Verdict:** Agent hallucinate structure MỚI không có trong bất kỳ golden standard nào

---

## 🎯 ROOT CAUSE SYNTHESIS

### **Primary Issues:**

**1. GOLDEN STANDARD CONTRADICTION (Prompt Issue ⚠️):**
- Master Prompt Line 23: "Reference Week 5 regardless..."
- Quick Ref Line 12: "⚠️ KHÔNG dùng Week 5 cho Stations - use Week 6"
- **Result:** Agent confused → làm theo tưởng tượng

**2. THIẾU STEP-BY-STEP GUIDE (Prompt Issue ⚠️):**
- Master Prompt: "Copy EXACT sentences từ read.js" ← TOO GENERIC
- KHÔNG CÓ hướng dẫn:
  - Bước 1: Extract content_en text
  - Bước 2: Split by `. ` or `! ` or `? `
  - Bước 3: Create array with EXACT field names from Week 6
  - Bước 4: Verify count matches

**3. THIẾU VALIDATION CHECKLIST (Prompt Issue ⚠️):**
- Không có commands để check field names
- Không có commands để check structure
- Không có commands để check counts

**4. AGENT KHÔNG ĐỌC INSTRUCTIONS (Agent Issue ❌):**
- "Copy EXACT sentences" repeated 5 times → ignored
- Field names documented in Quick Ref → ignored
- Count requirements (5 logic, 10 word_match) → ignored

---

## 📝 ĐỀ XUẤT CẢI THIỆN MASTER PROMPT

### **Priority 1: FIX CONTRADICTION**

**Current (CONFUSING):**
```
Master Prompt: "Reference Week 5..."
Quick Ref: "KHÔNG dùng Week 5 - use Week 6"
```

**Proposed Fix:**
```markdown
## GOLDEN STANDARDS (UPDATED March 6, 2026)

⚠️ **STATIONS (14 files): ALWAYS USE WEEK 6**
- `src/data/weeks/week_06/*.js` (Advanced)
- `src/data/weeks_easy/week_06/*.js` (Easy)

**WHY Week 6 (NOT Week 5):**
- ✅ Week 6: Correct field names (`audio_url`, `meaning`)
- ✅ Week 6: Correct structures (dictation sentences, shadowing script)
- ❌ Week 5: Deprecated formats

⚠️ **AI TUTOR (week_N_real.js): USE WEEK 7**
- `src/data/weeks/week_07_real.js`

**MANDATORY PRE-FLIGHT:**
```bash
# Open Week 6 in split screen before starting
code src/data/weeks/week_06/
```
```

---

### **Priority 2: ADD STEP-BY-STEP GUIDE**

**Proposed addition to STEP 3.4:**

```markdown
4. **dictation.js** - Extract sentences from read.js

**⚠️ STEP-BY-STEP PROCEDURE (FOLLOW EXACTLY):**

**Step 1: Read source**
```bash
cat src/data/weeks/week_12/read.js | grep -A 1 'content_en:'
# Copy the text between quotes
```

**Step 2: Split into sentences**
```python
# Python helper (or manual)
import re
story = "{content_en text from read.js}"
sentences = re.split(r'(?<=[.!?])\s+', story)
# Remove ** bold markers
sentences = [re.sub(r'\*\*([^*]+)\*\*', r'\1', s) for s in sentences]
print(f"Found {len(sentences)} sentences")
```

**Step 3: Create dictation.js with EXACT format from Week 6**
```javascript
export default {
  sentences: [
    { 
      id: 1, 
      text: "{exact sentence 1 from read.js}", 
      meaning: "{Vietnamese translation}", 
      audio_url: "/audio/week12/dictation_1.mp3"  // ← NOTE: audio_URL not audio
    },
    // Repeat for ALL sentences
  ]
};
```

**Step 4: Verify**
```bash
# Check field names (should = 0)
grep -c '"audio":' src/data/weeks/week_12/dictation.js
grep -c 'translation_vi:' src/data/weeks/week_12/dictation.js

# Check count matches read.js
grep -c '{ id:' src/data/weeks/week_12/dictation.js
```

**⚠️ COMMON MISTAKES:**
- ❌ `audio: "..."` → Should be `audio_url: "..."`
- ❌ `translation_vi: "..."` → Should be `meaning: "..."`
- ❌ Writing generic sentences → MUST extract from read.js
```

---

### **Priority 3: ADD VALIDATION CHECKLIST**

**Proposed STEP 3.15 (NEW):**

```markdown
### **STEP 3.15: VALIDATE ALL STATIONS (MANDATORY!)**

**Run these commands BEFORE committing Week 12:**

```bash
# 1. Field name validation
grep -c 'audio_url:' src/data/weeks/week_12/dictation.js
# Should > 0

grep -c '"audio":' src/data/weeks/week_12/dictation.js
# Should = 0 (if NOT zero → WRONG field name!)

grep -c 'translation_vi:' src/data/weeks/week_12/dictation.js
# Should = 0 (if NOT zero → Should be 'meaning')

# 2. Structure validation
grep -q 'script:' src/data/weeks/week_12/shadowing.js && echo "✅" || echo "❌ FAIL"
grep -q 'audio_full:' src/data/weeks/week_12/shadowing.js && echo "✅" || echo "❌ FAIL"
grep -q 'passages:' src/data/weeks_easy/week_12/shadowing.js && echo "❌ OLD STRUCTURE!" || echo "✅"

# 3. Count validation
[ $(grep -c '"id":' src/data/weeks/week_12/logic.js) -eq 5 ] && echo "✅ logic" || echo "❌ logic != 5"
[ $(grep -c '"id":' src/data/weeks/week_12/word_match.js) -eq 10 ] && echo "✅ word_match" || echo "❌ word_match != 10"

# 4. File existence
test -f src/data/weeks/week_12/writing.js && echo "✅ writing" || echo "❌ writing missing!"

# 5. Easy mode paths
grep -r 'images/week12[^_]' src/data/weeks_easy/week_12/ && echo "❌ Path error!" || echo "✅"
```

**If ANY check shows ❌ → Stop and fix before proceeding!**
```

---

### **Priority 4: CREATE VALIDATION SCRIPT**

**Proposed:** `tools/validate_week.sh`

```bash
#!/bin/bash
WEEK=$1
ADV="src/data/weeks/week_${WEEK}"
EASY="src/data/weeks_easy/week_${WEEK}"

echo "🔍 Validating Week $WEEK..."

# Test 1: Field names
if grep -q 'translation_vi:' "$ADV/dictation.js"; then
  echo "❌ dictation uses 'translation_vi' (should be 'meaning')"
  exit 1
fi
echo "✅ Field names correct"

# Test 2: Structure
if ! grep -q 'script:' "$ADV/shadowing.js"; then
  echo "❌ shadowing missing 'script' array"
  exit 1
fi
echo "✅ Structure correct"

# Test 3: Counts
LOGIC=$(grep -c '"id":' "$ADV/logic.js")
[ "$LOGIC" -eq 5 ] || { echo "❌ logic has $LOGIC (need 5)"; exit 1; }
echo "✅ Counts correct"

# Test 4: Files exist
[ -f "$ADV/writing.js" ] || { echo "❌ writing.js missing"; exit 1; }
echo "✅ All files exist"

echo "🎉 Week $WEEK validated!"
```

**Usage in workflow:**
```bash
# After STEP 3, before STEP 4:
bash tools/validate_week.sh 12
```

---

## 📊 FINAL VERDICT

### **Lỗi Agent (85%):**
1. ❌ Không đọc Golden Standard trước khi bắt đầu
2. ❌ Ignore repeated warnings "Copy EXACT sentences"
3. ❌ Không validate requirements
4. ❌ Skip stations (writing.js)
5. ❌ Hallucinate structures (ask_ai.js)

### **Lỗi Prompt (15%):**
1. ⚠️ Contradiction Week 5 vs Week 6
2. ⚠️ Thiếu step-by-step guide
3. ⚠️ Thiếu validation checklist

### **Action Items:**
1. **Update Master Prompt:** Fix contradiction, add guides, add checklist
2. **Create validation script:** `tools/validate_week.sh`
3. **Agent MUST:** Read Week 6 golden + follow checklist từng bước

---

## 🚀 REGENERATE WEEK 12 - NEW WORKFLOW

```bash
# 1. Open Golden Standard
code src/data/weeks/week_06/

# 2. Generate Week 12 files (following Week 6 EXACTLY)

# 3. Validate BEFORE committing
bash tools/validate_week.sh 12

# 4. If pass → commit
# If fail → fix issues and re-validate
```

**Với prevention measures này, Week 12 lần 2 sẽ chạy đúng 100%!**
