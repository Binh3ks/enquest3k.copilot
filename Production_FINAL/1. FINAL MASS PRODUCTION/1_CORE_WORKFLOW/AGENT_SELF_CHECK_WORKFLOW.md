# 🤖 AGENT SELF-CHECK WORKFLOW - WEEK N PRODUCTION

> **My Role:** Content Production Agent for EngQuest3K  
> **My Commitment:** Follow this checklist EXACTLY, NO shortcuts, NO Python for JS  
> **Date Created:** March 10, 2026  
> **Status:** 🟢 READY FOR PRODUCTION

---

## ⚠️ BEFORE I START: ANTI-HALLUCINATION PLEDGE

**I, the AI Agent, commit to:**

- [ ] ✅ **READ** all documentation BEFORE creating content
- [ ] ✅ **CLONE** golden standards (Week 7 AI Tutor + Week 6 Stations) - NOT generate from scratch
- [ ] ✅ **VALIDATE** syntax immediately after EACH file creation
- [ ] ✅ **NEVER** use Python to create .js files (use Node.js ONLY)
- [ ] ✅ **TEST** in browser BEFORE deploying
- [ ] ✅ **STOP** if ANY validation fails - fix before proceeding
- [ ] ✅ **ASK** user if unclear - NOT assume or hallucinate

**Week 12+13 Lessons Learned (22 issues total):**
- See `PRODUCTION_LESSONS_LEARNED.md` for full catalog
- Top issues: Python for JS files, missing index.js, wrong Deepgram model names
- Audio cutoff, voiceConfig same voices, clone without editing, fake videoIds
- **MOST CRITICAL:** Agent reports "done" but files don't exist → BƯỚC 0.5 verification
- **Prevention: Follow this checklist + verify every file with 4 commands**

---

## 📋 11-STEP PRODUCTION WORKFLOW

---

### ✅ BƯỚC -1: PRE-PRODUCTION SYSTEM CHECK (NEW - Prevents API/R2 Failures)

**Time: ~3 minutes**  
**Purpose: Test external dependencies BEFORE starting 2-hour production workflow**

> **Lỗi tiềm ẩn #1:** Agent chạy hết 2 giờ đến bước audio mới phát hiện Deepgram 401/R2 403  
> **Giải pháp:** Test APIs TRƯỚC để fail fast

#### Actions:

**Test 1: Deepgram API Authentication & Model Names**
```bash
# Test with CORRECT model name (no "2" in name!)
python3 -c "
import os, json, urllib.request
from dotenv import load_dotenv; load_dotenv()
key = os.getenv('DEEPGRAM_API_KEY')
if not key: 
    print('❌ DEEPGRAM_API_KEY not found in .env')
    exit(1)
    
url = 'https://api.deepgram.com/v1/speak?model=aura-orion-en&encoding=mp3'
data = json.dumps({'text': 'Test audio generation.'}).encode()
req = urllib.request.Request(url, data=data, 
    headers={'Authorization': f'Token {key}', 'Content-Type': 'application/json'}, 
    method='POST')
    
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        size = len(resp.read())
        print(f'✅ Deepgram OK: {size} bytes received')
        print(f'✅ Model name CORRECT: aura-orion-en (no -2- prefix!)')
except urllib.error.HTTPError as e:
    print(f'❌ DEEPGRAM FAILED: {e.code} {e.reason}')
    if e.code == 400:
        print('   → Check model name (use aura-orion-en, NOT aura-2-orion-en)')
    elif e.code == 401:
        print('   → Check API key')
    exit(1)
"
# If fails → STOP, fix API issue, do NOT proceed
```

**Test 2: R2 Upload Permission**
```bash
# Test upload 1 file BEFORE batch uploading 300+ files
echo "pre-flight test" > /tmp/r2_preflight.txt
npx wrangler r2 object put engquest-audio/audio/test_preflight.txt \
  --file=/tmp/r2_preflight.txt \
  --remote 2>&1

# Check result
if [[ $? -eq 0 ]]; then
  echo "✅ R2 upload permission OK"
else
  echo "❌ R2 FAILED - Check:"
  echo "   1. API Token has R2 Object Write permission"
  echo "   2. Bucket name correct: engquest-audio"
  echo "   3. --remote flag included"
  exit 1
fi
```

**Test 3: Node.js Version**
```bash
# Verify Node >= 18 (required for ES modules)
node --version
# Must be v18.0.0 or higher
```

**Test 4: Golden Standards Existence**
```bash
# W1-15: clone từ Week 6 stations + Week 7 AI Tutor
ls -la src/data/weeks/week_07_real.js || { echo "❌ Week 7 AI Tutor missing"; exit 1; }
ls -la src/data/weeks/week_06/index.js || { echo "❌ Week 6 Advanced missing"; exit 1; }
ls -la src/data/weeks_easy/week_06/index.js || { echo "❌ Week 6 Easy missing"; exit 1; }

# W16+: clone từ Week 16 stations + Week 16 AI Tutor
ls -la src/data/weeks/week_16_real.js || { echo "❌ Week 16 AI Tutor missing"; exit 1; }
ls -la src/data/weeks/week_16/index.js || { echo "❌ Week 16 Advanced missing"; exit 1; }
ls -la src/data/weeks_easy/week_16/index.js || { echo "❌ Week 16 Easy missing"; exit 1; }
echo "✅ All golden standards exist"
```

**Test 5: Create Session Log**
```bash
# Start session logging (Lỗi tiềm ẩn #6)
export SESSION_LOG="production_week_N_$(date +%Y%m%d_%H%M).log"
echo "========================================" | tee $SESSION_LOG
echo "WEEK N PRODUCTION SESSION" | tee -a $SESSION_LOG
echo "Started: $(date)" | tee -a $SESSION_LOG
echo "========================================" | tee -a $SESSION_LOG
echo "" | tee -a $SESSION_LOG
```

#### Self-Check Before Proceeding:
- [ ] Deepgram API test PASSED (model name verified: `aura-orion-en`)
- [ ] R2 upload permission test PASSED
- [ ] Node.js version >= 18
- [ ] All golden standards exist (Week 6/7 cho W1-15; Week 16/16_real.js cho W16+)
- [ ] Session log created
- [ ] 🔴 **If ANY test fails → STOP, fix before proceeding to BƯỚC 0**

---

### ✅ BƯỚC 0: PRE-FLIGHT CHECKLIST

**Time: ~10 minutes**  
**Purpose: Gather requirements, verify golden standards exist, understand app architecture**

#### Self-Check Questions:
- [ ] User has specified Week Number (N)?
- [ ] I have read **Blueprint** to understand app philosophy & content rules?
- [ ] I have read Syllabus for Week N theme, grammar, vocabulary?
- [ ] Week 7 (`week_07_real.js`) exists for AI Tutor template? (W1-15) **OR** Week 16 (`week_16_real.js`) for W16+?
- [ ] Week 6 (`weeks/week_06/*.js`) exists for Stations template? (W1-15) **OR** Week 16 (`week_16/`) for W16+?
- [ ] I understand Phase (1/2/3) for Week N?
- [ ] 🚨 **CRITICAL**: I will create BOTH Advanced AND Easy modes (DUAL MODE MANDATORY)

#### Actions:

**Step 0.1: READ BLUEPRINT (MANDATORY - FIRST TIME OR REFRESHER)**
```bash
# 🔴 CRITICAL: Read Blueprint trước khi tạo content
# File này chứa triết lý thiết kế, quy định cứng cho từng station

cat "Production_FINAL/MASTER PROMPT/2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt"

# Note down key rules:
# - Easy vs Advanced differentiation (Personal vs Global context)
# - Vocabulary tiers (Tier 1 vs Tier 2/3)
# - Scaffolding by Phase (Visual support, Writing support, Speaking support)
# - Fixed counts by station (vocab=10, grammar=20, word_power=3/5/7)
# - Audio emotion requirement (diễn cảm, not robotic)
# - 10 Bold Words in read.js (bắt buộc)
```

**Step 0.2: Read Syllabus**
```bash
# 1. Find Week N content
cat "Production_FINAL/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt" | grep -A 20 "Week N"

# Note down:
# - Theme: ???
# - Grammar: ???
# - Advanced Vocabulary (Tier 2/3): 10 words
# - Easy Vocabulary (Tier 1): 10 words
```

**Step 0.3: Verify golden standards exist**
```bash
# Verify golden standards
# W1-15:
ls -la src/data/weeks/week_07_real.js
ls -la src/data/weeks/week_06/*.js
ls -la src/data/weeks_easy/week_06/*.js

# W16+ (golden standard = Week 16):
ls -la src/data/weeks/week_16_real.js
ls -la src/data/weeks/week_16/*.js
ls -la src/data/weeks_easy/week_16/*.js
```

**Step 0.4: Determine Phase**
```bash
# 3. Check Phase
# Phase 1: Weeks 1-54 (3 word_power, 5 logic)
# Phase 2: Weeks 55-120 (5 word_power, 7 logic)
# Phase 3: Weeks 121-156 (7 word_power, 10 logic)
```

**Step 0.5: CLEAN UP LEGACY FILES (CRITICAL - Week 16 Lesson!)**
```bash
# 🚨 VẤN ĐỀ: Weeks 1-11 dùng flat files (week_N.js)
#           Weeks 12+ dùng folders (week_N/)
#           Vite loader ƯU TIÊN flat files → folder KHÔNG BAO GIỜ load!

# FORMAT: Thay N bằng số tuần (ví dụ: 16)
WEEK_NUM=N

echo "🔍 Checking for legacy flat files (week_${WEEK_NUM}.js)..."

# Check Advanced mode flat file
if [ -f "src/data/weeks/week_${WEEK_NUM}.js" ]; then
  echo "⚠️  Found legacy Advanced flat file - backing up..."
  mv "src/data/weeks/week_${WEEK_NUM}.js" \
     "src/data/weeks/week_${WEEK_NUM}_BACKUP_$(date +%Y%m%d).js"
  echo "✅ Backed up: week_${WEEK_NUM}_BACKUP_$(date +%Y%m%d).js"
fi

# Check Easy mode flat file
if [ -f "src/data/weeks_easy/week_${WEEK_NUM}.js" ]; then
  echo "⚠️  Found legacy Easy flat file - backing up..."
  mv "src/data/weeks_easy/week_${WEEK_NUM}.js" \
     "src/data/weeks_easy/week_${WEEK_NUM}_OLD_BACKUP_$(date +%Y%m%d).js"
  echo "✅ Backed up: week_${WEEK_NUM}_OLD_BACKUP_$(date +%Y%m%d).js"
fi

# Verify cleanup successful
echo ""
echo "📋 Verification:"
! [ -f "src/data/weeks/week_${WEEK_NUM}.js" ] && echo "✅ Advanced: No flat file conflicts"
! [ -f "src/data/weeks_easy/week_${WEEK_NUM}.js" ] && echo "✅ Easy: No flat file conflicts"
echo "✅ Ready to create week_${WEEK_NUM}/ folders"
```

**Lý do QUAN TRỌNG:**
```javascript
// Vite loader trong src/data/weeks/index.js:
// Kiểm tra FLAT FILE TRƯỚC:
if (easyModules[`../weeks_easy/week_${pad}.js`]) {
  return easyModules[...];  // ← FILE PHẲNG LUÔN THẮNG!
}
// Kiểm tra FOLDER SAU (never reached if flat file exists):
else if (easyModulesFolder[`../weeks_easy/week_${pad}/index.js`]) {
  return easyModulesFolder[...];
}
```

**Hậu quả nếu KHÔNG xóa:**
- Week 15: File cũ "Grandma's Old Box" load thay vì file mới "My Day at the Park"
- Week 16: File cũ "My Baby Photos" (Jan 6, sai theme) load thay vì file mới "Sports Commentary"
- UI hiển thị nội dung cũ → User report bug → Tốn 30 phút debugging

#### Self-Check Before Proceeding:
- [ ] I have read Blueprint and understand app architecture
- [ ] I have noted Week N theme, grammar, vocabulary from Syllabus
- [ ] I know Phase number for Week N (determines word_power/logic counts)
- [ ] Golden standards verified to exist
- [ ] I understand Easy vs Advanced differentiation (Personal vs Global context)
- [ ] I will NOT hallucinate content - will follow Syllabus + Blueprint EXACTLY
- [ ] 🚨 **LEGACY FILES CLEANED** - No week_N.js flat files exist (both Advanced + Easy)
- [ ] **(W13)** I have tested Deepgram API with ONE sample call (model `aura-orion-en`)
- [ ] **(W13)** I have tested R2 upload permission with ONE test file
- [ ] **(W13)** I have read `PRODUCTION_LESSONS_LEARNED.md` (22 known errors across all weeks)

---

### 🚨 BƯỚC 0.5: MANDATORY FILE VERIFICATION PROTOCOL (NEW — Week 13 Lesson)

**Time: 0 minutes (built into every other step)**  
**Purpose: PROVE that files actually exist and work — prevent "agent báo xong nhưng UI trống"**

> **Vấn đề nghiêm trọng nhất:** Agent chạy hết các bước, báo "✅ COMPLETE", nhưng browser mở lên không có gì.
> File không tồn tại, hoặc tồn tại nhưng nội dung rỗng/sai syntax/nội dung cũ.

#### 🔴 ABSOLUTE RULE: Sau MỖI file .js được tạo/sửa, PHẢI chạy 4 lệnh:

```bash
# === FILE EXISTENCE PROOF (chạy sau MỖI file) ===

# 1. File tồn tại?
ls -la $FILE_PATH
# Nếu "No such file" → DỪNG. File chưa được tạo.

# 2. File có nội dung? (station > 100 bytes, AI Tutor > 1000 bytes)
wc -c < $FILE_PATH
# Nếu < 100 bytes → File rỗng/stub. LÀM LẠI.

# 3. JS syntax đúng?
node -e "import('./$FILE_PATH').then(m => console.log('✅ OK:', Object.keys(m.default).slice(0,5)))" 2>&1
# Nếu SyntaxError → DỪNG. SỬA TRƯỚC.

# 4. Nội dung đúng theme? (không phải clone cũ)
grep -ic "THEME_KEYWORD" $FILE_PATH
# Nếu 0 → NỘI DUNG CHƯA SỬA. Vẫn là tuần cũ.

# 5. 🆕 BOLD WORD COUNT (W16+ MANDATORY - Mar 17, 2026)
# Chỉ check cho read.js và explore.js
if [[ "$FILE_PATH" == *"read.js" ]] || [[ "$FILE_PATH" == *"explore.js" ]]; then
  VOCAB_COUNT=$(grep -c "id:" src/data/weeks/week_N/vocab.js 2>/dev/null || echo "10")
  BOLD_COUNT=$(grep -o '\*\*[^*]*\*\*' $FILE_PATH | wc -l)
  echo "📊 vocab.js: $VOCAB_COUNT words | ${FILE_PATH##*/} bold: $BOLD_COUNT"
  
  if [ $BOLD_COUNT -lt $VOCAB_COUNT ]; then
    echo "❌ FAIL: Bold words insufficient!"
    echo "   Required: >= $VOCAB_COUNT bold words (100% vocab coverage)"
    echo "   Actual: $BOLD_COUNT"
    echo "   → ADD MORE BOLD WORDS IN STORY"
    exit 1
  else
    echo "✅ Bold word coverage: $BOLD_COUNT >= $VOCAB_COUNT (PASS)"
  fi
fi
```

#### Ví dụ cụ thể cho Week 16 (theme: "Sports", vocab=13):
```bash
# Sau khi tạo vocab.js:
grep -c "id:" src/data/weeks/week_16/vocab.js
# → 13 (10 sports + 3 STEM/Social seeds)

# Sau khi tạo read.js:
ls -la src/data/weeks/week_16/read.js          # → exists? ✅
wc -c < src/data/weeks/week_16/read.js         # → 2847 bytes ✅
node -e "import('./src/data/weeks/week_16/read.js').then(m => console.log('✅', Object.keys(m.default)))"  # → ✅ OK
grep -ic "kick\|run\|energy\|motion" src/data/weeks/week_16/read.js  # → 8+ matches ✅
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/read.js | wc -l  # → 14 bold words ✅ (>= 13)

# Sau khi tạo explore.js:
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/explore.js | wc -l  # → 13 bold words ✅ (>= 13)
```

#### Nếu KHÔNG chạy 4 lệnh này → Agent KHÔNG ĐƯỢC phép tiến sang bước tiếp theo.

#### POST-MODE VERIFICATION (sau khi xong tất cả files của 1 mode):
```bash
# W1-15: expect 15 files per mode
# W16+:  expect 16 files per mode (logic_science.js + singapore_math.js + games.js thay logic.js)
EXPECTED=15  # đổi thành 16 nếu N >= 16

# Đếm tổng files:
ls -1 src/data/weeks/week_N/*.js | wc -l      # PHẢI = $EXPECTED
ls -1 src/data/weeks_easy/week_N/*.js | wc -l  # PHẢI = $EXPECTED

# Validate ALL syntax cùng lúc:
for f in src/data/weeks/week_N/*.js; do
  node -e "import('./$f').then(()=>console.log('✅',f)).catch(e=>{ console.error('❌',f,e.message); process.exit(1) })" 2>&1
done
```

---

### ✅ BƯỚC 0: PRE-FLIGHT FILE CLEANUP (NEW - Week 15 Lesson!)

**Time: ~2 minutes**  
**Purpose: Remove conflicting legacy files BEFORE creating new week**

> **Week 15 Critical Issue:**  
> Old flat backup files (`week_15.js`) from January 6 existed alongside new folder structure (`week_15/index.js`).  
> Vite's lazy loader **prioritized flat files over folders** for Easy mode → loaded 3-month-old "Grandma's Old Box" instead of new "My Day at the Park"!

#### Why This Step Is Critical:

**File Structure Evolution:**
- **Legacy** (Weeks 1-11): Single flat file per week: `week_06.js`
- **Modern** (Weeks 12+): Folder structure: `week_15/index.js` + 14 station files
- **Problem**: Old flat files never deleted during migration

**System Behavior (src/data/weeks/index.js L27-50):**
```javascript
// Easy mode checks FLAT FILE FIRST!
if (easyModules[`../weeks_easy/week_${pad}.js`]) {
  return easyModules[...];  // ← OLD BACKUP WINS!
}
// Folder checked second (never reached if flat file exists!)
else if (easyModulesFolder[`../weeks_easy/week_${pad}/index.js`]) {
  return easyModulesFolder[...];
}
```

#### Actions:

**Step 1: Check for Legacy Flat Files**
```bash
echo "🔍 Checking for conflicting legacy files..."

# Check Advanced mode
if [ -f "src/data/weeks/week_N.js" ]; then
  echo "⚠️  CONFLICT: src/data/weeks/week_N.js exists (legacy flat file)"
  echo "   This file may override new folder structure!"
  echo "   → Renaming to week_N_BACKUP_$(date +%Y%m%d).js"
  mv "src/data/weeks/week_N.js" "src/data/weeks/week_N_BACKUP_$(date +%Y%m%d).js"
  echo "✅ Renamed Advanced flat file"
else
  echo "✅ No conflicting Advanced flat file"
fi

# Check Easy mode (MORE CRITICAL - flat files have priority!)
if [ -f "src/data/weeks_easy/week_N.js" ]; then
  echo "⚠️  CONFLICT: src/data/weeks_easy/week_N.js exists!"
  echo "   🚨 CRITICAL: Easy mode PRIORITIZES flat files!"
  echo "   → Renaming to week_N_BACKUP_$(date +%Y%m%d).js"
  mv "src/data/weeks_easy/week_N.js" "src/data/weeks_easy/week_N_BACKUP_$(date +%Y%m%d).js"
  echo "✅ Renamed Easy flat file"
else
  echo "✅ No conflicting Easy flat file"
fi
```

**Step 2: Check for Old week_N_real.js**
```bash
# Check if week_N_real.js already exists (might be from previous failed attempt)
if [ -f "src/data/weeks/week_N_real.js" ]; then
  echo "⚠️  week_N_real.js already exists!"
  echo "   Created: $(stat -f "%Sm" -t "%Y-%m-%d %H:%M" src/data/weeks/week_N_real.js)"
  echo "   Options:"
  echo "   1. Keep (resume previous work): Skip renaming"
  echo "   2. Fresh start: Rename to week_N_real_BACKUP_$(date +%Y%m%d).js"
  echo ""
  echo "   💡 TIP: If previous creation FAILED, choose Fresh start"
  
  # For automation: Rename old file to be safe
  mv "src/data/weeks/week_N_real.js" "src/data/weeks/week_N_real_OLD_$(date +%Y%m%d_%H%M).js"
  echo "✅ Backed up old week_N_real.js"
fi
```

**Step 3: Verify Clean State**
```bash
echo ""
echo "📋 Final Check:"
echo "   Advanced flat file: $([ ! -f 'src/data/weeks/week_N.js' ] && echo '✅ Not present' || echo '❌ Still exists!')"
echo "   Easy flat file: $([ ! -f 'src/data/weeks_easy/week_N.js' ] && echo '✅ Not present' || echo '❌ Still exists!')"
echo "   Advanced folder: $([ ! -d 'src/data/weeks/week_N' ] && echo '✅ Ready to create' || echo '⚠️  Already exists')"
echo "   Easy folder: $([ ! -d 'src/data/weeks_easy/week_N' ] && echo '✅ Ready to create' || echo '⚠️  Already exists')"
echo ""

# If folders already exist, ask to confirm overwrite
if [ -d "src/data/weeks/week_N" ] || [ -d "src/data/weeks_easy/week_N" ]; then
  echo "⚠️  Week N folders already exist!"
  echo "   This might be from a previous attempt."
  echo "   Recommendation: Delete folders and start fresh"
  echo ""
  echo "   rm -rf src/data/weeks/week_N src/data/weeks_easy/week_N"
fi
```

#### Self-Check Before Proceeding:
- [ ] No flat file `week_N.js` exists in `src/data/weeks/`
- [ ] No flat file `week_N.js` exists in `src/data/weeks_easy/`
- [ ] Any existing week_N_real.js backed up with timestamp
- [ ] Folder state documented (new vs resuming work)
- [ ] If folders exist → Confirmed to keep or delete

#### 🚨 If Legacy Files Found:
**DO NOT SKIP THIS!** Even if Week N has never been created before, check for Week (N-1), (N-2) backups that might interfere.

**Example: Creating Week 18:**
```bash
# Week 18 doesn't exist yet, but check for old backups
ls src/data/weeks/ | grep "week_1[0-9].js"
# Found: week_15.js, week_16_BACKUP_OLD.js, week_17.js
# → All are legacy flat files from migration period
# → Rename ALL of them before creating Week 18
```

---

### ✅ BƯỚC 1: CREATE DIRECTORIES

**Time: ~1 minute**  
**Purpose: Setup folder structure**

#### Actions:
```bash
# Create directories
mkdir -p src/data/weeks/week_N
mkdir -p src/data/weeks_easy/week_N

# Verify
ls -ld src/data/weeks/week_N
ls -ld src/data/weeks_easy/week_N
```

#### Self-Check:
- [ ] Both directories created successfully
- [ ] No errors in terminal

---

### ✅ BƯỚC 2: CLONE AI TUTOR (week_N_real.js)

**Time: ~10 minutes**  
**Purpose: Create AI Tutor with 3 missions**

#### 🔴 CRITICAL RULES (Week 12 Lessons):
- ❌ **NEVER use Python** to create this file
- ✅ **ALWAYS use Node.js** with `fs.writeFileSync()`
- ✅ **VALIDATE immediately** after creation
- ✅ **Clone Week 7** format (NOT Week 12 simplified format)

#### Actions:

**Step 2.1: Clone Week 7 as base**
```bash
cp src/data/weeks/week_07_real.js src/data/weeks/week_N_real.js
```

**Step 2.2: Create Node.js edit script**
```bash
cat > /tmp/edit_week_N_real.mjs << 'EOF'
import { readFileSync, writeFileSync } from 'fs';

// Read Week 7 template
const base = readFileSync('src/data/weeks/week_07_real.js', 'utf8');

// Modify content (update week_id, title, theme, vocabulary, missions)
let content = base;

// 1. Update week_id
content = content.replace(/week_id:\s*["']week_\d+["']/, `week_id: "week_N"`);

// 2. Update title from Syllabus
content = content.replace(/title:\s*["']Week \d+:.*?["']/, `title: "Week N: [THEME_FROM_SYLLABUS]"`);

// 3. Update theme
content = content.replace(/theme:\s*["'].*?["']/, `theme: "[THEME_FROM_SYLLABUS]"`);

// 4. Update grammar_pattern
content = content.replace(/grammar_pattern:\s*["'].*?["']/, `grammar_pattern: "[GRAMMAR_FROM_SYLLABUS]"`);

// 5. Replace vocabulary (10 objects - use Tier 2/3 words from Syllabus)
// ... (manual editing required - cannot automate vocabulary objects)

// 6. Update missions (3 missions with correct story_arc format)
// ... (manual editing required - follow Week 7 structure)

// Write output
writeFileSync('src/data/weeks/week_N_real.js', content, 'utf8');
console.log('✅ File written');
EOF

# Run Node script
node /tmp/edit_week_N_real.mjs
```

**Step 2.3: IMMEDIATE VALIDATION (MANDATORY — BƯỚC 0.5 Protocol)**
```bash
# 1. File exists?
ls -la src/data/weeks/week_N_real.js

# 2. File has content? (AI Tutor must be > 1000 bytes)
wc -c < src/data/weeks/week_N_real.js

# 3. Syntax OK?
node -e "import('./src/data/weeks/week_N_real.js').then(m => console.log('✅ OK:', Object.keys(m.default).slice(0,5)))" 2>&1

# 4. Content matches theme? (Replace THEME_KEYWORD with actual Week N keywords)
# Example for Week 15: grep -Eic "park|running|walking|busy" src/data/weeks/week_15_real.js
grep -Eic "WEEK_N_KEYWORD1|WEEK_N_KEYWORD2|WEEK_N_KEYWORD3" src/data/weeks/week_N_real.js
# Expected: 5+ matches. If 0 → Content NOT updated from clone!

# If ANY of these fail:
# → STOP immediately
# → Fix FIRST
# → DO NOT proceed to next step
```

#### Self-Check Before Proceeding:
- [ ] File created using Node.js (NOT Python)
- [ ] Syntax validation PASSED
- [ ] File uses Week 7 format (has `nova_instructions`, `v28_format_notes`)
- [ ] `story_arc` is ARRAY format (NOT object with nested `phases`)
- [ ] `opening_narrative` ≠ `phase_questions[0]` (different questions)
- [ ] NO ACK words at start of `phase_questions` strings
- [ ] All `phase_questions` obey `grammar_guard.forbidden_structures`
- [ ] Total phase_questions count ≤ `maximum_turns` (12)

#### 🚨 Common Hallucinations to AVOID:
- ❌ Using Python print() → Creates files with syntax errors
- ❌ Copying Week 12 format → Missing `nova_instructions`
- ❌ Duplicating `opening_narrative` in `phase_questions[0]`
- ❌ Starting `phase_questions` with "Great!", "Wonderful!" (ACK words)
- ❌ Using forbidden grammar (past tense, present perfect) in questions

---

### ✅ BƯỚC 3: CREATE ADVANCED STATIONS

**Time: ~25 minutes**  
**Purpose: Clone schema, replace content**

#### 🔴 WEEK STRUCTURE VARIES BY WEEK NUMBER:

**W1-15:** 14 stations + index.js = **15 files**  
**W16+:** 11 stations + 7 sub-tabs + index.js = **19 files**

#### Actions:

**Step 3.1a: Clone files (W1-15 ONLY - 15 files total)**
```bash
# For Weeks 1-15 ONLY
if [ N -le 15 ]; then
  for file in vocab word_power read explore dictation shadowing grammar logic word_match ask_ai mindmap writing daily_watch games; do
    cp "src/data/weeks/week_06/$file.js" "src/data/weeks/week_N/$file.js"
    echo "Cloned: $file.js"
  done
  
  cp src/data/weeks/week_06/index.js src/data/weeks/week_N/index.js
  echo "Cloned: index.js"
  echo "✅ W1-15: 15 files cloned"
fi
```

**Step 3.1b: Clone files (W16+ - 19 files total)**
```bash
# For Weeks 16+ ONLY
if [ N -ge 16 ]; then
  # 11 standard stations (NO read, explore, logic)
  for file in vocab word_power grammar dictation shadowing word_match ask_ai mindmap writing daily_watch games; do
    cp "src/data/weeks/week_16/$file.js" "src/data/weeks/week_N/$file.js"
    echo "Cloned: $file.js"
  done
  
  # 7 sub-tab files (NEW from W16+)
  for file in logic_science singapore_math social_quiz read_stem read_social explore_stem explore_social; do
    cp "src/data/weeks/week_16/$file.js" "src/data/weeks/week_N/$file.js"
    echo "Cloned sub-tab: $file.js"
  done
  
  cp src/data/weeks/week_16/index.js src/data/weeks/week_N/index.js
  echo "Cloned: index.js"
  echo "✅ W16+: 19 files cloned (11 stations + 7 sub-tabs + index)"
fi
```

**Step 3.2: Replace Semantic Content (Stories, Vocabulary, Questions)**

**🔴 CRITICAL WARNING**: This is NOT about updating file paths!

**What "SCHEMA" means**: Data structure (object keys, array format, field names)  
**What "CONTENT" means**: Actual text, vocabulary words, questions, grammar explanations

**Example - vocab.js**:  
✅ Keep SCHEMA: `vocab: [ { id, word, definition_en, example_en, image_url } ]`  
❌ Change CONTENT: `{ word: "box" }` (Week 6) → `{ word: "kick" }` (Week 16)

**🚨 CRITICAL RULE - VOCAB COUNT & BOLD WORDS:**
- **W1-15:** vocab.js = 10 words → read.js + explore.js MUST bold 10+ words
- **W16+:** vocab.js = 13+ words (10 core + 3+ STEM/Social seeds) → read_stem.js + read_social.js + explore_stem.js + explore_social.js MUST bold 13+ words EACH
- **100% Coverage Rule:** ALL words in vocab.js MUST appear as **bold** across all story/activity files
- **Reason:** Vocabulary continuity (vocab → read → explore → word_power workflow)

**DO NOT PROCEED** until you understand: Cloning gives you structure. Editing replaces meaning.

**🔴 CRITICAL: Use Node.js for editing, NOT Python**
**🔴 CRITICAL: After EACH file, run BƯỚC 0.5 verification (4 commands)**

For each file, create Node.js edit script:
```bash
cat > /tmp/edit_vocab.mjs << 'EOF'
import { writeFileSync } from 'fs';

const content = `
export default {
  vocab: [
    {
      word: "[WORD_1_FROM_SYLLABUS]",
      definition_en: "[DEFINITION]",
      definition_vi: "[VIETNAMESE_TRANSLATION]",
      example_en: "[EXAMPLE_SENTENCE]",
      collocation: "[COLLOCATION]",
      image_url: "/images/weekN/[word_1].jpg",
      audio_word: "/audio/weekN/vocab_[word_1].mp3",
      audio_definition: "/audio/weekN/vocab_def_[word_1].mp3",
      audio_example: "/audio/weekN/vocab_ex_[word_1].mp3",
      audio_collocation: "/audio/weekN/vocab_coll_[word_1].mp3"
    },
    // ... 9 more words (total 10)
  ]
};
`;

writeFileSync('src/data/weeks/week_N/vocab.js', content.trim() + '\n', 'utf8');
console.log('✅ vocab.js created');
EOF

node /tmp/edit_vocab.mjs

# IMMEDIATE VALIDATION
node --input-type=module < src/data/weeks/week_N/vocab.js && echo "✅ vocab.js OK"
```

**Repeat for all files with validation after EACH**

#### Self-Check for Key Files:

**vocab.js:**
- [ ] W1-15: Exactly 10 words (Tier 2/3 from Syllabus)
- [ ] W16+: 13+ words (10 core + 3+ STEM/Social seeds)
- [ ] All image_url paths use `/images/weekN/` (zero-padded if N < 10)
- [ ] All audio paths use `/audio/weekN/` (zero-padded)
- [ ] Syntax validation PASSED

**read.js (W1-15 ONLY):**
- [ ] Story about Week N theme (Advanced context: school/formal)
- [ ] 20-23 sentences (Advanced mode)
- [ ] 10 bold words: `**word**` format
- [ ] `comprehension_questions` field (NOT `check_questions`)
- [ ] Syntax validation PASSED

**read_stem.js + read_social.js (W16+ ONLY):**
- [ ] STEM story: Science/Tech/Engineering/Math context (5 paragraphs, 10 STEM vocab bolded)
- [ ] Social story: History/Geography/Culture context (5 paragraphs, 10 social vocab bolded)
- [ ] BOTH stories: 3-4 comprehension questions each
- [ ] Audio paths: `/audio/weekN/read_stem.mp3` and `/audio/weekN/read_social.mp3`
- [ ] Syntax validation PASSED

**dictation.js & shadowing.js:**
- [ ] W1-15: **COPIED EXACT SENTENCES from read.js** (NOT self-created)
- [ ] W16+: **COPIED from read_stem.js** (use STEM story sentences)
- [ ] 20-23 items (matches source story sentence count)
- [ ] Each item has `audio_url` field
- [ ] `shadowing.js` has `audio_full` field at root
- [ ] Syntax validation PASSED

**grammar.js:**
- [ ] **EXACTLY 20 exercises** (NOT 15, 18, 22)
- [ ] Mix of multiple choice, fill-in-blank, unscramble
- [ ] Has `instruction` or `grammar_explanation` section
- [ ] Syntax validation PASSED
- [ ] **🔴 VALIDATION:**
```bash
# Count MUST equal 20 exercises
grep -c '"question":' src/data/weeks/week_N/grammar.js
# Output MUST be: 20 (if not → fix before proceeding)
```

**logic_science.js (W16+ ONLY):**
- [ ] 3 MCQ critical thinking questions
- [ ] Theme-aligned (sports logic, science reasoning, etc.)
- [ ] Each has: question_en, options (4), correct_answer, explanation
- [ ] Syntax validation PASSED

**singapore_math.js (W16+ ONLY):**
- [ ] 5 bar model problems
- [ ] Types: part_whole, comparison
- [ ] Each has: question, answer array, bar_model path, hint, math_vocab
- [ ] Syntax validation PASSED

**social_quiz.js (W16+ ONLY):**
- [ ] 7 MCQ questions (History + Geography + Culture)
- [ ] Each has: category, question, 4 options, correct_answer, explanation
- [ ] Syntax validation PASSED

**explore_stem.js + explore_social.js (W16+ ONLY):**
- [ ] STEM: 3 hands-on activities (experiment, observation, design)
- [ ] Social: 3 activities (research, comparison, map work)
- [ ] Each has materials/steps, concept tags, discussion questions
- [ ] Syntax validation PASSED

**index.js:**
- [ ] W1-15: 15th file | W16+: 19th file — week WILL NOT LOAD without it!
- [ ] voiceConfig has **5 DISTINCT** voice names (D, F, C, J, GB-B)
- [ ] weekTitle_en and weekTitle_vi match Syllabus
- [ ] W16+: Imports all 7 sub-tab files (logic_science, singapore_math, social_quiz, read_stem, read_social, explore_stem, explore_social)
- [ ] All import paths updated to week_N
- [ ] Syntax validation PASSED

**🚨 MANDATORY VALIDATION GATE 1: Content Theme Check (Week 15 Lesson)**

**DO NOT PROCEED TO BƯỚC 4 UNTIL THIS PASSES**

```bash
# === VALIDATION GATE 1: Advanced Stations ===
echo "Validating Week N Advanced stations..."

# Test 1: vocab.js has Week N words (NOT Week 6 words)
echo "Test 1: Vocabulary check"
weekN_vocab=$(grep -o 'word: "[^"]*"' src/data/weeks/week_N/vocab.js | head -3)
if echo "$weekN_vocab" | grep -q "box\|desk\|treasure"; then
  echo "❌ FAILED: vocab.js still contains Week 6 words!"
  echo "Expected: Week N vocabulary from Syllabus"
  echo "Actual: $weekN_vocab"
  exit 1
fi
echo "✅ PASSED"

# Test 2: Story files mention Week N theme
echo "Test 2: Story theme check"
if [ N -le 15 ]; then
  # W1-15: Check read.js
  theme_mentions=$(grep -Eic "WEEK_N_KEYWORD1|WEEK_N_KEYWORD2|WEEK_N_KEYWORD3" src/data/weeks/week_N/read.js)
  if [[ $theme_mentions -lt 3 ]]; then
    echo "❌ FAILED: read.js doesn't mention Week N theme"
    exit 1
  fi
else
  # W16+: Check read_stem.js and read_social.js
  stem_mentions=$(grep -Eic "WEEK_N_KEYWORD1|WEEK_N_KEYWORD2" src/data/weeks/week_N/read_stem.js)
  social_mentions=$(grep -Eic "WEEK_N_KEYWORD1|WEEK_N_KEYWORD2" src/data/weeks/week_N/read_social.js)
  if [[ $stem_mentions -lt 2 ]] || [[ $social_mentions -lt 2 ]]; then
    echo "❌ FAILED: STEM or Social story missing theme keywords"
    exit 1
  fi
fi
echo "✅ PASSED"

# Test 3: grammar.js covers Week N grammar focus
echo "Test 3: Grammar focus check"
if grep -qi "WEEK_N_GRAMMAR_PATTERN" src/data/weeks/week_N/grammar.js; then
  echo "✅ PASSED"
else
  echo "❌ FAILED: grammar.js doesn't cover Week N grammar"
  echo "Check if it still has Week 6 content"
  exit 1
fi

echo ""
echo "🎉 ALL TESTS PASSED - Safe to proceed to BƯỚC 4"
```

**If ANY test fails**:
1. DO NOT proceed to next step
2. Fix the failing file(s)
3. Re-run this validation
4. Only proceed when all tests pass

---

### ✅ BƯỚC 3.5: UPDATE DAILY WATCH VIDEOS (MANUAL - Week 15 Lesson)

**Time: ~10 minutes**  
**Purpose: Find 5 YouTube videos matching Week N theme and grammar focus**

#### 🔴 CRITICAL: Why This Step Matters
`daily_watch.js` cannot be auto-generated. Videos require:
- Manual search on YouTube
- Theme alignment (Present Continuous actions in park)
- Appropriate difficulty (A1 level, 1-5 minute duration)
- High quality thumbnails and subtitles

**Week 15 Lesson**: Agent cloned Week 6 preposition videos, never updated them.  
**Prevention**: Make video selection an explicit mandatory step.

#### Actions:

**Step 1: Search YouTube**
```bash
# Week N search terms (example for Week 15):
# - "present continuous song for kids"
# - "what are you doing song"
# - "actions in the park for children"
# - "present progressive ESL"
```

**Step 2: Select 5 Videos**
Criteria:
- Duration: 1:00 - 5:00 (controlled screen time)
- Level: A1 (basic vocabulary)
- Quality: Clear audio, animated or real footage
- Subtitles: English subtitles preferred

**Step 3: Get Video IDs**
From YouTube URL: `https://www.youtube.com/watch?v=9bDbIgv5ruM`  
Extract: `9bDbIgv5ruM`

**Step 4: Update daily_watch.js**
```javascript
export default {
  videos: [
    { 
      id: 1, 
      title: "What Are You Doing? | Present Continuous Song", 
      videoId: "ACTUAL_VIDEO_ID_HERE",  // ← Replace with real ID
      duration: "02:15", 
      sim_duration: 135, 
      thumb: "https://img.youtube.com/vi/ACTUAL_VIDEO_ID_HERE/mqdefault.jpg" 
    },
    // ... 4 more videos
  ],
  bonus_games: [{title: "Game", url: "#", description: "Review"}]
};
```

**Step 5: Validate Video IDs**
```bash
# Test first video loads
curl -I "https://img.youtube.com/vi/9bDbIgv5ruM/mqdefault.jpg"
# Should return 200 OK, not 404
```

#### Self-Check:
- [ ] Found 5 videos related to Week N theme
- [ ] All video IDs are valid (thumbnails load)
- [ ] Durations are accurate (checked on YouTube)
- [ ] Titles are descriptive and match theme
- [ ] Videos are child-appropriate (no ads, safe content)
- [ ] **Updated BOTH modes**: `week_N/daily_watch.js` (Easy mode has no daily_watch)

---

### ✅ BƯỚC 3.5: VALIDATE METADATA & FILE STRUCTURE (NEW - Week 15 Lesson!)

**Time: ~3 minutes**  
**Purpose: Prevent metadata mismatch and flat file conflicts**

> **Week 15 Critical Failures:**  
> - ✅ Station files (vocab, read, grammar) had correct content  
> - ❌ index.js still had Week 6 metadata (weekId: 6, wrong title, wrong grammar)  
> - ❌ Old flat file `week_15.js` from Jan 6 overrode folder `week_15/index.js`  
> - Result: Easy mode showed "Grandma's Old Box" (backup from 3 months ago!)

#### Actions:

**Validation Gate 1: Check index.js Metadata**
```bash
# Both Advanced and Easy must have CORRECT metadata (NOT source week metadata!)

echo "=== ADVANCED MODE METADATA ===="
grep -E "(weekId:|weekTitle_en:|grammar_focus:)" src/data/weeks/week_N/index.js

# Expected output:
#   weekId: N,  ← Should be N (NOT 6 or 7!)
#   weekTitle_en: "[WEEK_N_THEME]",  ← Should match Week N theme
#   grammar_focus: "[WEEK_N_GRAMMAR]",  ← Should match Week N grammar

echo "=== EASY MODE METADATA ===="
grep -E "(weekId:|weekTitle_en:|grammar_focus:)" src/data/weeks_easy/week_N/index.js

# Expected output:
#   weekId: N,
#   weekTitle_en: "[WEEK_N_EASY_THEME]",  ← May differ from Advanced (personal context)
#   grammar_focus: "[WEEK_N_GRAMMAR]",  ← Same grammar as Advanced
```

**If weekId is wrong (e.g., weekId: 6 for Week 15):**  
```bash
# Fix using Node.js (NOT sed - preserves formatting)
node -e "
const fs = require('fs');
let content = fs.readFileSync('src/data/weeks/week_N/index.js', 'utf8');
content = content.replace(/weekId:\s*\d+/, 'weekId: N');
content = content.replace(/weekTitle_en:\s*\".*?\"/, 'weekTitle_en: \"[WEEK_N_THEME]\"');
content = content.replace(/grammar_focus:\s*\".*?\"/, 'grammar_focus: \"[WEEK_N_GRAMMAR]\"');
fs.writeFileSync('src/data/weeks/week_N/index.js', content, 'utf8');
console.log('✅ Advanced index.js metadata updated');
"

# Repeat for Easy mode
node -e "
const fs = require('fs');
let content = fs.readFileSync('src/data/weeks_easy/week_N/index.js', 'utf8');
content = content.replace(/weekId:\s*\d+/, 'weekId: N');
content = content.replace(/weekTitle_en:\s*\".*?\"/, 'weekTitle_en: \"[WEEK_N_EASY_THEME]\"');
content = content.replace(/grammar_focus:\s*\".*?\"/, 'grammar_focus: \"[WEEK_N_GRAMMAR]\"');
fs.writeFileSync('src/data/weeks_easy/week_N/index.js', content, 'utf8');
console.log('✅ Easy index.js metadata updated');
"
```

**Validation Gate 2: Check Flat File Conflicts**
```bash
# Check if old flat files exist (they should NOT!)
echo "=== CHECKING FOR FLAT FILE CONFLICTS ==="

# Check Advanced flat file
if [ -f "src/data/weeks/week_N.js" ]; then
  echo "⚠️ CONFLICT DETECTED: src/data/weeks/week_N.js exists!"
  echo "   This old flat file may override week_N/index.js (folder structure)"
  echo "   → Rename to week_N_BACKUP_OLD.js"
  mv src/data/weeks/week_N.js src/data/weeks/week_N_BACKUP_OLD.js
  echo "✅ Renamed to week_N_BACKUP_OLD.js"
else
  echo "✅ No Advanced flat file conflict"
fi

# Check Easy flat file
if [ -f "src/data/weeks_easy/week_N.js" ]; then
  echo "⚠️ CONFLICT DETECTED: src/data/weeks_easy/week_N.js exists!"
  echo "   Easy mode PRIORITIZES flat files over folders (see src/data/weeks/index.js L27-35)"
  echo "   → Rename to week_N_BACKUP_OLD.js"
  mv src/data/weeks_easy/week_N.js src/data/weeks_easy/week_N_BACKUP_OLD.js
  echo "✅ Renamed to week_N_BACKUP_OLD.js"
else
  echo "✅ No Easy flat file conflict"
fi
```

**Validation Gate 3: Content Spot Check**
```bash
# Ensure station files have NEW content (NOT cloned content still!)

echo "=== CONTENT VALIDATION ==="

# Check Advanced vocab has Week N words (NOT Week 6/7 words)
echo "Advanced vocab keywords:"
grep -o 'word: "[^"]*"' src/data/weeks/week_N/vocab.js | head -3

# Expected: Week N vocabulary (e.g., "running", "walking" for Week 15)
# NOT Week 6 words (e.g., "box", "desk", "treasure")

# Check Easy vocab has same words
echo "Easy vocab keywords:"
grep -o 'word: "[^"]*"' src/data/weeks_easy/week_N/vocab.js | head -3

# Check Advanced read has Week N theme keywords
echo "Advanced story theme check:"
grep -i "[WEEK_N_KEYWORD]" src/data/weeks/week_N/read.js | wc -l
# Expected: 5+ matches. If 0 → Story still has Week 6/7 content!

# Check grammar has Week N focus (NOT cloned grammar)
echo "Grammar focus:"
head -10 src/data/weeks/week_N/grammar.js | grep -i "description"
# Expected: Should mention Week N grammar (e.g., "Present Continuous")
# NOT Week 6 grammar (e.g., "Prepositions")
```

#### Self-Check Before Proceeding:
- [ ] Advanced `index.js`: weekId = N, weekTitle matches Week N theme, grammar_focus matches Week N grammar
- [ ] Easy `index.js`: weekId = N, weekTitle matches Week N Easy theme, grammar_focus matches Week N grammar
- [ ] NO flat file conflicts (week_N.js renamed to _BACKUP_OLD)
- [ ] vocab.js contains Week N vocabulary (NOT Week 6/7 words)
- [ ] read.js story matches Week N theme (NOT treasure hunt!)
- [ ] grammar.js exercises target Week N grammar (NOT prepositions!)

#### 🚨 If ANY validation fails:
- **STOP immediately**
- **Fix metadata/content FIRST**
- **Re-run all 3 validation gates**
- **DO NOT proceed to Easy mode or commit**

---

### ✅ BƯỚC 4: CREATE EASY STATIONS

**Time: ~20 minutes**  
**Purpose: Independent content for Easy mode (NOT copy Advanced)**

#### 🔴 CRITICAL: Mode Differentiation
- ❌ **NEVER copy Advanced content to Easy**
- ✅ Generate Easy mode from scratch
- ✅ Use Tier 1 vocabulary
- ✅ Use personal/family context (NOT school events)
- ✅ Verify first sentence: Easy ≠ Advanced

#### 🔴 WEEK STRUCTURE VARIES BY WEEK NUMBER:

**W1-15:** 14 stations + index.js = **15 files**  
**W16+:** 11 stations + 7 sub-tabs + index.js = **19 files**

#### Actions:

**Step 4.1a: Clone Easy files (W1-15 ONLY - 15 files)**
```bash
# For Weeks 1-15 ONLY
if [ N -le 15 ]; then
  for file in vocab word_power read explore dictation shadowing grammar logic word_match ask_ai mindmap writing daily_watch games; do
    cp "src/data/weeks_easy/week_06/$file.js" "src/data/weeks_easy/week_N/$file.js"
    echo "Cloned easy: $file.js"
  done
  
  cp src/data/weeks_easy/week_06/index.js src/data/weeks_easy/week_N/index.js
  echo "Cloned easy: index.js"
  echo "✅ W1-15 Easy: 15 files cloned"
fi
```

**Step 4.1b: Clone Easy files (W16+ - 19 files)**
```bash
# For Weeks 16+ ONLY
if [ N -ge 16 ]; then
  # 11 standard stations
  for file in vocab word_power grammar dictation shadowing word_match ask_ai mindmap writing daily_watch games; do
    cp "src/data/weeks_easy/week_16/$file.js" "src/data/weeks_easy/week_N/$file.js"
    echo "Cloned easy: $file.js"
  done
  
  # 7 sub-tab files
  for file in logic_science singapore_math social_quiz read_stem read_social explore_stem explore_social; do
    cp "src/data/weeks_easy/week_16/$file.js" "src/data/weeks_easy/week_N/$file.js"
    echo "Cloned easy sub-tab: $file.js"
  done
  
  cp src/data/weeks_easy/week_16/index.js src/data/weeks_easy/week_N/index.js
  echo "Cloned easy: index.js"
  echo "✅ W16+ Easy: 19 files cloned"
fi
```

**Step 4.2: Edit with Node.js (same pattern as BƯỚC 3)**

**Step 4.3: CRITICAL VALIDATION - Mode Differentiation**
```bash
# Check first sentences are DIFFERENT
echo "Advanced first sentence:"
head -1 src/data/weeks/week_N/read.js

echo "Easy first sentence:"
head -1 src/data/weeks_easy/week_N/read.js

# They MUST be different!
# Advanced: School/formal context
# Easy: Personal/family context
```

#### Self-Check:
- [ ] W1-15: 15 Easy files | W16+: 19 Easy files created
- [ ] Easy vocabulary = Tier 1 (concrete actions: sing, dance, run)
- [ ] W1-15: Easy read.js = Personal context ("I have...", "My name is...")
- [ ] W16+: Easy read_stem.js + read_social.js = Personal context (simpler than Advanced)
- [ ] W1-15: Advanced read.js ≠ Easy read.js (first sentence different)
- [ ] W16+: Advanced stories ≠ Easy stories (context/complexity different)
- [ ] dictation.js/shadowing.js = Copied from Easy source story (NOT Advanced)
- [ ] grammar.js = EXACTLY 20 exercises + instruction section
- [ ] **🔴 VALIDATION:**
```bash
# Both modes MUST have 20 grammar exercises
grep -c '"question":' src/data/weeks/week_N/grammar.js          # = 20
grep -c '"question":' src/data/weeks_easy/week_N/grammar.js    # = 20

# W16+: Verify sub-tab question counts
if [ N -ge 16 ]; then
  grep -c '"id":' src/data/weeks_easy/week_N/logic_science.js    # = 3
  grep -c '"id":' src/data/weeks_easy/week_N/singapore_math.js  # = 5
  grep -c '"id":' src/data/weeks_easy/week_N/social_quiz.js     # = 7
fi
```
- [ ] index.js voiceConfig has 5 DISTINCT voices (both modes)
- [ ] word_power phrases spell-checked (no missing prepositions)
- [ ] W16+: All 7 sub-tab files have theme-aligned content
- [ ] All files content matches week theme (not old clone source)
- [ ] All files syntax validated

---

### ✅ BƯỚC 5: UPDATE UI IMPORTS (CRITICAL!)

**Time: ~5 minutes**  
**Purpose: Add Week N to 3 UI files**

#### 🔴 CRITICAL (Week 12 Lesson):
- Missing this step → Week N shows Week 7 missions (fallback)
- **MUST update 3 files:**
  1. StoryMissionTab.jsx
  2. FreeTalkTab.jsx
  3. gameAdaptation.js

#### Actions:

**File 1: StoryMissionTab.jsx**
```bash
# Add import around line 27
# Add before existing imports:
import weekNRealData from '../../../data/weeks/week_N_real';

# Add to ternary chain around line 105:
# Before the : week7RealData; fallback, add:
: weekNumber === N ? weekNRealData

# Verify
grep -n "weekNRealData" src/modules/ai_tutor/tabs/StoryMissionTab.jsx
# Should show 2 matches: import + ternary
```

**File 2: FreeTalkTab.jsx**
```bash
# Same pattern as StoryMissionTab
# Add import around line 26
# Add to ternary chain around line 95

# Verify
grep -n "weekNRealData" src/modules/ai_tutor/tabs/FreeTalkTab.jsx
# Should show 2 matches
```

**File 3: gameAdaptation.js**
```bash
# Add 3 imports around line 30:
import weekNGamesAdvanced from '../data/weeks/week_N/games.js';
import weekNGamesEasy from '../data/weeks_easy/week_N/games.js';
import weekNRealData from '../data/weeks/week_N_real.js';

# Add to REAL_WEEK_DATA around line 110:
N: weekNRealData,

# Add to weekGamesMap around line 137:
N: { advanced: weekNGamesAdvanced, easy: weekNGamesEasy },

# Verify
grep -c "weekN" src/config/gameAdaptation.js
# Should show 6 matches total
```

#### Self-Check:
- [ ] StoryMissionTab.jsx updated (2 matches)
- [ ] FreeTalkTab.jsx updated (2 matches)
- [ ] gameAdaptation.js updated (6 matches)
- [ ] **NEW (Week 15 Lesson)**: Import statements verified with strict grep:
```bash
# Strict validation: Check IMPORT lines specifically (NOT ternary usage)
grep "^import weekNRealData from" src/modules/ai_tutor/tabs/StoryMissionTab.jsx
grep "^import weekNRealData from" src/modules/ai_tutor/tabs/FreeTalkTab.jsx
# Both should return exactly 1 match each

# ❌ WRONG validation (counts ternary usage, not imports):
# grep -c "weekN" src/modules/ai_tutor/tabs/StoryMissionTab.jsx
```
- [ ] Ternary chains updated with `weekNumber === N ? weekNRealData`
- [ ] No syntax errors after edits

---

### ✅ BƯỚC 5.5: CLEAR BUILD CACHE (NEW - Week 15 Lesson!)

**Time: ~2 minutes**  
**Purpose: Ensure Vite generates fresh bundle with new content**

> **Week 15 Critical Issue:**  
> After fixing all 28 station files + metadata, rebuild produced **SAME bundle hash** for 3 builds!  
> - `dist/assets/index-CpKv51Iq.js` (pre-fix)  
> - `dist/assets/index-CpKv51Iq.js` (post-fix) ← SAME HASH!  
> - User cleared browser cache, localStorage, hard refresh → NO EFFECT  
> - Problem: Vite's `node_modules/.vite` cache was stale  

#### Root Cause:
Vite uses deterministic hashing with aggressive module graph caching. Changes to imported files (like `week_N/vocab.js`) may not trigger cache invalidation if module graph is unchanged.

#### Actions:

**Clear Vite Cache + Dist Folder**
```bash
echo "🧹 Clearing build cache..."

# Remove Vite cache
rm -rf node_modules/.vite

# Remove old dist folder
rm -rf dist

echo "✅ Cache cleared. Ready for fresh build."
```

**Verification: Build Should Have New Hash**
```bash
# Build and capture bundle hash
npm run build 2>&1 | tee /tmp/build_output.txt

# Extract main bundle hash
BUNDLE_HASH=$(grep -o "index-[a-zA-Z0-9]*.js" /tmp/build_output.txt | head -1)

echo "📦 New bundle hash: $BUNDLE_HASH"
echo "   (Should be DIFFERENT from previous build if content changed)"

# Save hash for comparison
echo "$BUNDLE_HASH" > /tmp/last_bundle_hash.txt
```

#### Self-Check:
- [ ] `node_modules/.vite` directory deleted
- [ ] `dist/` directory deleted  
- [ ] Build produces new bundle hash (NOT same as previous)
- [ ] Build completes without errors
- [ ] Bundle size is reasonable (~1.7MB for index.js)

#### 🚨 If bundle hash is same as previous build:
This indicates Vite may still be using cached modules. Possible causes:
1. **Module imports didn't change**: If you only updated comments, Vite won't rehash
2. **Import resolution cached**: Restart terminal or Node process
3. **Git-tracked files**: Vite may use git timestamps →  `touch src/data/weeks/week_N/index.js`

**Nuclear option (use if above fails):**
```bash
# Clear ALL caches
rm -rf node_modules/.vite dist
npm cache clean --force
npm ci  # Reinstall dependencies
npm run build
```

---

### ✅ BƯỚC 6: AUDIO GENERATION (⚠️ DEPRECATED SINCE WEEK 14)

**⚠️ SKIP THIS STEP** - Audio is now **on-demand** via Deepgram Worker

**Old workflow** (Weeks 1-13): Pre-generate 300+ audio files → Upload to R2 (~30 minutes)  
**New workflow** (Week 14+): Audio auto-generated on first play → Cached to R2 (~2 seconds)

#### How On-Demand TTS Works:
1. User clicks speaker icon in app
2. Frontend calls: `POST https://engquest-tts-worker.binhkhoi08.workers.dev/tts`
3. Worker checks R2 cache (`engquest-audio/audio/weekN/vocab_running.mp3`)
4. If cached → Return immediately
5. If not cached → Call Deepgram API → Save to R2 → Return audio
6. Future plays are instant (served from cache)

#### Benefits:
- Zero production time for audio (was 30 minutes)
- No local storage needed
- Always uses latest voice model
- Automatic caching

#### No Action Required
- DO NOT run audio generation scripts
- DO NOT upload to R2 manually
- Audio will generate automatically during browser test (BƯỚC 9)

**Proceed directly to BƯỚC 7 (Images)** or **BƯỚC 9 (Browser Test)**

---

**📌 For Reference: Old Audio Workflow (Weeks 1-13)**

<details>
<summary>Click to expand old workflow (archived)</summary>

### ✅ BƯỚC 6: GENERATE & UPLOAD AUDIO (LEGACY)

**Time: ~30 minutes**  
**Purpose: Generate MP3 files, upload to R2 CDN**

#### Actions:

**Step 6.1: ⚠️ Test Deepgram API FIRST (Week 13 Lesson — MANDATORY)**
```bash
# Test ONE call before running full batch
python3 -c "
import os, json, urllib.request
from dotenv import load_dotenv; load_dotenv()
key = os.getenv('DEEPGRAM_API_KEY')
url = 'https://api.deepgram.com/v1/speak?model=aura-orion-en&encoding=mp3'
data = json.dumps({'text': 'Hello test.'}).encode()
req = urllib.request.Request(url, data=data, headers={'Authorization': f'Token {key}', 'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(req, timeout=10) as resp:
    print(f'OK: {len(resp.read())} bytes')
"
# If 400 error → model name wrong (use aura-orion-en, NOT aura-2-orion-en)
# If 401 error → API key invalid
```

**Step 6.2: Generate audio locally**
```bash
python3 tools/generate_audio_deepgram.py N --mode all --force

# Expected output:
# - public/audio/weekN/*.mp3 (~163 files Advanced)
# - public/audio/weekN_easy/*.mp3 (~157 files Easy)
```

**Step 6.3: Verify local files**
```bash
# 🔴 EXACT COUNT VALIDATION (Lỗi tiềm ẩn #4)
# Count files
ADVANCED_COUNT=$(ls -1 public/audio/weekN/*.mp3 2>/dev/null | wc -l | tr -d ' ')
EASY_COUNT=$(ls -1 public/audio/weekN_easy/*.mp3 2>/dev/null | wc -l | tr -d ' ')

echo "Advanced audio files: $ADVANCED_COUNT"
echo "Easy audio files: $EASY_COUNT"
echo "Total: $((ADVANCED_COUNT + EASY_COUNT))"

# EXPECTED COUNTS (Phase 1):
# Advanced: 163 files breakdown:
#   - vocab: 40 (10 words × 4 audios)
#   - word_power: 15 (3 words × 5 audios)
#   - read: 1
#   - grammar: 20
#   - logic: 5
#   - dictation: ~23
#   - shadowing: ~23
#   - ask_ai: 5
#   - mindmap: 20  
#   - daily_watch: 7
#   - + other stations

# Easy: 157 files (similar breakdown, slightly fewer)

# VALIDATION: If count differs by more than ±10 from expected:
if [ $ADVANCED_COUNT -lt 150 ] || [ $ADVANCED_COUNT -gt 180 ]; then
  echo "⚠️ WARNING: Advanced count outside expected range (150-180)"
  echo "   Check if all stations were generated"
fi

if [ $EASY_COUNT -lt 145 ] || [ $EASY_COUNT -gt 170 ]; then
  echo "⚠️ WARNING: Easy count outside expected range (145-170)"
  echo "   Check if all stations were generated"
fi
```

**Step 6.4: ⚠️ Test R2 Permission FIRST (Week 13 Lesson)**
```bash
# Test ONE file before uploading 300+
echo "test" > /tmp/r2_test.txt
npx wrangler r2 object put engquest-audio/audio/test_upload.txt --file=/tmp/r2_test.txt --remote
# If 403 Forbidden → API Token needs R2 Object Write permission
# Fix: Cloudflare Dashboard → API Tokens → Edit → Add R2 permission
```

**Step 6.5: Upload to R2 (after permission test passes)**
```bash
cd public/audio

# Upload Advanced
find weekN -name "*.mp3" -type f | while read file; do
  npx wrangler r2 object put engquest-audio/audio/"$file" \
    --file="$file" \
    --content-type="audio/mpeg" \
    --remote
done

# Upload Easy
find weekN_easy -name "*.mp3" -type f | while read file; do
  npx wrangler r2 object put engquest-audio/audio/"$file" \
    --file="$file" \
    --content-type="audio/mpeg" \
    --remote
done

cd ../..
```

**Step 6.6: Verify CDN access**
```bash
# Test 5 sample files
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/weekN/dictation_1.mp3"
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/weekN/shadowing_1.mp3"
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/weekN_easy/dictation_1.mp3"

# All should return: HTTP/1.1 200 OK
# If 404 → Re-upload with --remote flag!
```

**Step 6.7: Update CDN_WEEKS whitelist (CRITICAL)**
```bash
# Edit voiceService.js
vim src/services/voiceService.js

# Update CDN_WEEKS array (add Week N):
# const CDN_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, N];

# Save and commit immediately
git add src/services/voiceService.js
git commit -m "Enable CDN audio for Week N (add to CDN_WEEKS)"
```

**Step 6.8: Force-commit audio files (CRITICAL)**
```bash
# public/audio/ is gitignored → MUST use -f flag
git add -f public/audio/weekN/
git add -f public/audio/weekN_easy/

# Verify staging
git status --short | grep "audio/weekN" | wc -l
# Should show: ~320 files

git commit -m "Add Week N audio: 163 Advanced + 157 Easy (320 total)"
```

#### Self-Check:
- [ ] **(W13)** Deepgram API test passed (model name verified)
- [ ] Audio generated locally (~290+ files)
- [ ] **(W13)** R2 permission test passed
- [ ] Uploaded to R2 with `--remote` flag
- [ ] CDN access verified (200 OK)
- [ ] CDN_WEEKS updated in voiceService.js
- [ ] Audio files force-committed to git

---

### ✅ BƯỚC 7: GENERATE & UPLOAD IMAGES

**Time: ~20 minutes + manual Nano Banana**  
**Purpose: Generate image prompts, create images, upload to R2**

#### Actions:

**Step 7.1: Generate prompts**
```bash
node tools/generate_images_nano.js N

# Output:
# - public/images/Prompts/week_N_image_prompts.txt
# - public/images/Prompts/week_N_easy_image_prompts.txt
```

**Step 7.2: Manual workflow**
1. Copy prompts from txt files
2. Paste into Nano Banana (banana.dev)
3. Download generated images (format: `N_N_*.png`)
4. Save to `public/images/weekN/` and `public/images/weekN_easy/`

**Step 7.3: Auto-rename**
```bash
python3 tools/auto_rename.py N

# Converts: 1_1_city.png → city.jpg
```

**Step 7.4: Upload to R2**
```bash
python3 tools/upload_week_images_r2.py N

# Uploads to:
# - images/weekN/*.jpg
# - images/weekN_easy/*.jpg
```

#### Self-Check:
- [ ] Prompts generated
- [ ] Images created via Nano Banana
- [ ] Files renamed (*.jpg)
- [ ] Uploaded to R2
- [ ] Image paths in vocab.js match R2 structure

---

### ✅ BƯỚC 8: GENERATE & VALIDATE VIDEOS

**Time: ~10 minutes**  
**Purpose: Find YouTube videos for Daily Watch**

#### Actions:

**Step 8.1: Verify Blueprint data**
```bash
grep -A 5 "  N:" tools/generate_video_queries.js
```

If NOT found → Add Week N to `BLUEPRINT_WEEKS` object

**Step 8.2: Generate queries**
```bash
node tools/generate_video_queries.js N

# Creates: src/data/weeks/week_N/video_queries.json
```

**Step 8.3: Fetch videos**
```bash
node tools/update_videos.js N --reset

# Updates: src/data/weeks/week_N/daily_watch.js
```

**Step 8.4: Validate quality (⚠️ UPDATED — Week 13 Lesson)**
```bash
# Check for priority channels
grep "⭐" src/data/weeks/week_N/daily_watch.js
# Expected: 4-5 matches

# Check for fallback warnings
grep "⚠️" src/data/weeks/week_N/daily_watch.js
# Expected: 0-1 matches (2+ = need optimization)

# ⚠️ NEW (W13): Verify ALL videoIds are REAL YouTube videos
grep -oP 'videoId:\s*["'\''](\w+)' src/data/weeks/week_N/daily_watch.js
grep -oP 'videoId:\s*["'\''](\w+)' src/data/weeks_easy/week_N/daily_watch.js
# Each videoId must resolve to a REAL playable YouTube video
# Test: https://www.youtube.com/watch?v=<videoId>
# NEVER fabricate videoIds — use tools/update_videos.js or search YouTube manually

# Same check for Easy mode
grep -oP 'videoId:\s*["'\''](\w+)' src/data/weeks_easy/week_N/daily_watch.js
```

#### Self-Check:
- [ ] Video queries generated
- [ ] Videos fetched from YouTube
- [ ] 4-5 priority channel videos (⭐)
- [ ] 0-1 fallback videos (⚠️)
- [ ] All videos return 200 OK
- [ ] **(W13)** ALL videoIds verified as real, playable YouTube videos
- [ ] **(W13)** Videos match week theme (not generic/random content)

---

### ✅ BƯỚC 9: BROWSER TEST (MANDATORY BEFORE DEPLOY)

**Time: ~10 minutes**  
**Purpose: Verify Week N content shows correctly (NOT fallback)**

#### Actions:

**Step 9.1: Start dev server**
```bash
npm run dev
```

**Step 9.2: Test AI Tutor - ADVANCED MODE**
```
URL: http://localhost:5173/week/N/ai_tutor?mode=advanced

Verify Advanced Mode:
- [ ] Story Mission shows Week N missions (NOT "Exploring My House")
- [ ] Mission titles match Week N theme
- [ ] Vocabulary = Tier 2/3 (academic words)
- [ ] Context = School/formal ("Today is the school...")
- [ ] Free Talk shows Week N roleplays
- [ ] Audio plays from CDN (~100ms load time)
- [ ] Console: 0 errors
```

**Step 9.2b: Test AI Tutor - EASY MODE (🔴 Lỗi tiềm ẩn #7 - MUST TEST SEPARATELY)**
```
URL: http://localhost:5173/week/N/ai_tutor?mode=easy

Verify Easy Mode:
- [ ] Story Mission shows Week N Easy missions
- [ ] Vocabulary = Tier 1 (concrete: sing, dance, run)
- [ ] Context = Personal ("I have...", "My name is...")
- [ ] First sentence ≠ Advanced mode first sentence
- [ ] Audio from /audio/weekN_easy/ (NOT /audio/weekN/)
- [ ] Console: 0 errors

🔴 CRITICAL CHECK - Mode Differentiation:
Open browser console and check first sentence:
- Advanced: Should be school/formal context
- Easy: Should be personal/family context
- If SAME → Easy mode copied Advanced content (BUG!)
```

**Step 9.3: Test Game Hub**
```
URL: http://localhost:5173/week/N/game_hub

Verify:
- [ ] Show & Tell uses Week N vocabulary
- [ ] Sentence Expander uses Week N grammar
- [ ] Ask Me uses Week N contexts
- [ ] Console: 0 errors
```

**Step 9.4: Test Stations - BOTH MODES (🔴 Lỗi tiềm ẩn #7)**
```
Test Advanced Mode Stations:
URL: http://localhost:5173/week/N/vocab

- [ ] Vocab cards load images (no 404)
- [ ] Grammar has exactly 20 exercises
- [ ] Daily Watch videos play
- [ ] Audio from /audio/weekN/
- [ ] Console: 0 errors

Test Easy Mode Stations:
URL: http://localhost:5173/week/N/vocab?mode=easy

- [ ] Vocab uses Tier 1 words (different from Advanced)
- [ ] Grammar 20 exercises (simpler than Advanced)
- [ ] Audio from /audio/weekN_easy/ (NOT /audio/weekN/)
- [ ] Images use /images/weekN_easy/ paths
- [ ] Console: 0 errors

🔴 CRITICAL: Test BOTH modes for grammar count:
- Advanced: Must have 20 exercises
- Easy: Must have 20 exercises (simpler, but same count)
```

#### 🚨 If Week N Shows Week 7 Content:
**Cause:** Missing UI imports (BƯỚC 5)

**Fix:**
```bash
# Check imports
grep "weekNRealData" src/modules/ai_tutor/tabs/StoryMissionTab.jsx
grep "weekNRealData" src/modules/ai_tutor/tabs/FreeTalkTab.jsx
grep "weekN" src/config/gameAdaptation.js

# If missing → Go back to BƯỚC 5 and add imports
```

#### Self-Check:
- [ ] Dev server running
- [ ] **Advanced Mode:** Week N content displays correctly
- [ ] **Easy Mode:** Week N content displays correctly (TESTED SEPARATELY)
- [ ] **Easy Mode:** First sentence ≠ Advanced (mode differentiation verified)
- [ ] **Easy Mode:** Audio from weekN_easy/ folder
- [ ] **Easy Mode:** Images from weekN_easy/ folder
- [ ] NO Week 7 fallback content
- [ ] Audio plays from CDN (both modes)
- [ ] Images load correctly (both modes)
- [ ] Console: 0 errors (both modes)
- [ ] 🔴 **If ANY mode fails → Fix before deploying**

---

### ✅ BƯỚC 10: DEPLOY

**Time: ~5 minutes + 2-3 min deployment**  
**Purpose: Push to production**

#### Pre-Deploy Final Checklist:
- [ ] **All content files created:**
  - W1-15: 31 files (1 AI Tutor + 15 Advanced + 15 Easy)
  - W16+: 39 files (1 AI Tutor + 19 Advanced + 19 Easy with sub-tabs)
- [ ] All files syntax validated (4 commands × N files)
- [ ] UI imports added (3 files: StoryMissionTab, FreeTalkTab, gameAdaptation)
- [ ] voiceConfig has 5 distinct voices per mode
- [ ] All station content matches week theme (not clone source)
- [ ] W16+: All 7 sub-tab files created (logic_science, singapore_math, social_quiz, read_stem, read_social, explore_stem, explore_social)
- [ ] W16+: Logic Lab total = 15 questions (3+5+7)
- [ ] Images uploaded to R2
- [ ] Daily Watch videoIds are real YouTube videos (tested on youtube.com)
- [ ] Browser test PASSED (both modes tested separately)
- [ ] Console: 0 errors (both modes)

#### Actions:

**Step 10.1: Review changes**
```bash
git status

# Expected files:
# W1-15: 31 content files (1 AI Tutor + 15 Adv + 15 Easy)
# W16+: 39 content files (1 AI Tutor + 19 Adv + 19 Easy)
# + 3 UI files (StoryMissionTab, FreeTalkTab, gameAdaptation)
# + Images (~20-30 files)
# + NO audio files (on-demand generation, no pre-upload)
```

**Step 10.2: Create Rollback Point (🔴 Lỗi tiềm ẩn #2 - New Safety Measure)**
```bash
# Create backup tag BEFORE committing new week
# This allows instant rollback if critical bug found after deploy

git tag -a "pre-week-N-backup" -m "Backup before Week N deployment - $(date +%Y-%m-%d)"
git push origin "pre-week-N-backup"

echo "✅ Rollback point created: pre-week-N-backup"
echo "   If critical bug found after deploy, rollback with:"
echo "   git reset --hard pre-week-N-backup"
echo "   git push --force"
```

**Step 10.3: Commit all changes**
```bash
git add .

# Commit message varies by week structure
if [ N -le 15 ]; then
  git commit -m "Add Week N: AI Tutor + 28 stations (W1-15 structure)

- AI Tutor: 3 missions (Week 7 format)
- Advanced: 14 stations (Tier 2/3 vocab)
- Easy: 14 stations (Tier 1 vocab)
- Audio: On-demand via Deepgram Worker
- Images: Generated via Nano Banana, uploaded to R2
- Videos: 5 videos (4-5 priority channels)
- UI: Updated StoryMissionTab + FreeTalkTab + gameAdaptation"
else
  git commit -m "Add Week N: AI Tutor + 36 stations + sub-tabs (W16+ structure)

- AI Tutor: 3 missions (Week 7 format)
- Advanced: 18 stations (11 standard + 7 sub-tabs)
- Easy: 18 stations (11 standard + 7 sub-tabs)
- Sub-tabs: Logic Lab (3+5+7=15Q), Read (STEM+Social), Explore (STEM+Social)
- Audio: On-demand via Deepgram Worker
- Images: Generated via Nano Banana, uploaded to R2
- Videos: 5 videos (4-5 priority channels)
- UI: Updated StoryMissionTab + FreeTalkTab + gameAdaptation
- STEM/Social integration: 70/30 ratio per Blueprint V5.0"
fi
```

**Step 10.4: Push to GitHub**
```bash
git push
```

**Step 10.5: Verify Cloudflare deployment**
```
Wait 2-3 minutes for Cloudflare Pages deployment

Monitor: https://dash.cloudflare.com/pages

Should show: "Success" ✅
```

**Step 10.6: Test production - BOTH MODES**
```
Test Advanced Mode:
URL: https://enquest3k.pages.dev/week/N/ai_tutor?mode=advanced

Verify Advanced:
- [ ] Week N content displays
- [ ] Audio plays from CDN
- [ ] Images load
- [ ] Videos play
- [ ] Console: 0 errors

Test Easy Mode (SEPARATE TEST - Lỗi tiềm ẩn #7):
URL: https://enquest3k.pages.dev/week/N/ai_tutor?mode=easy

Verify Easy:
- [ ] Week N Easy content displays
- [ ] Content ≠ Advanced mode (mode differentiation)
- [ ] Audio from weekN_easy/ folder
- [ ] Images from weekN_easy/ folder
- [ ] Console: 0 errors

🔴 If ANY issue found in production:
1. Document the issue
2. Use rollback tag: git reset --hard pre-week-N-backup
3. Fix locally, test, redeploy
```

#### Self-Check:
- [ ] Git push successful
- [ ] Cloudflare deployment successful
- [ ] Production test PASSED
- [ ] Week N live for students

---

## 🚫 ANTI-HALLUCINATION REMINDERS

### **What I MUST DO:**
- ✅ Read Syllabus for Week N content
- ✅ Clone Week 7 (AI Tutor) + Week 6/16 (Stations - depends on week number)
- ✅ W1-15: Clone from Week 6 (15 files/mode)
- ✅ W16+: Clone from Week 16 (19 files/mode with sub-tabs)
- ✅ Use Node.js for ALL .js file creation
- ✅ Validate syntax IMMEDIATELY after EACH file (4 commands)
- ✅ Update UI imports (3 files: StoryMissionTab, FreeTalkTab, gameAdaptation)
- ✅ Test in browser BEFORE deploy (test BOTH modes separately!)
- ✅ Create index.js for BOTH modes (mandatory!)
- ✅ Assign 5 DISTINCT voices in voiceConfig
- ✅ Test ONE Deepgram call before batch (model: `aura-orion-en`)
- ✅ Grep all files for theme keywords after cloning
- ✅ Verify Daily Watch videoIds are real YouTube videos
- ✅ W16+: Create all 7 sub-tab files (logic_science, singapore_math, social_quiz, read_stem, read_social, explore_stem, explore_social)

### **What I MUST NOT DO:**
- ❌ Use Python to create .js files
- ❌ Copy Advanced content to Easy mode
- ❌ Skip syntax validation (4 commands after EACH file!)
- ❌ Skip UI imports (causes fallback to Week 7!)
- ❌ Deploy without browser test
- ❌ Hallucinate content not from Syllabus
- ❌ Use `aura-2-*` model names (correct: `aura-*`)
- ❌ Forget index.js (week won't load!)
- ❌ Use same voice for all stations in voiceConfig
- ❌ Clone golden standard without editing content
- ❌ Fabricate YouTube videoIds
- ❌ W16+: Create only 15 files (must be 19 files with sub-tabs!)
- ❌ W16+: Use read.js, explore.js, logic.js (these are REPLACED by split files)

### **When to STOP and ASK:**
- ⚠️ If Syllabus content unclear
- ⚠️ If syntax validation fails repeatedly
- ⚠️ If browser test shows Week 7 content
- ⚠️ If audio returns 404 from CDN
- ⚠️ If ANY step has errors

---

## 📊 POST-PRODUCTION REPORT

After completing all 11 steps (BƯỚC -1 through BƯỚC 10), I will report:

```
✅ WEEK N PRODUCTION COMPLETE

Summary:
- **Files Created:** 
  - W1-15: 31 files (1 AI Tutor + 15 Advanced + 15 Easy)
  - W16+: 39 files (1 AI Tutor + 19 Advanced + 19 Easy)
- **Audio Files:** ON-DEMAND via Deepgram Worker (no pre-generation needed)
  - Auto-generated on first play, cached to R2
- **Images:** [count] (Advanced + Easy) uploaded to R2
- **Videos:** 5 (4-5 priority channels) — ALL videoIds verified real
- **UI Updates:** 3 files (StoryMissionTab, FreeTalkTab, gameAdaptation)

✅ ALL CRITICAL VALIDATIONS PASSED:
- Pre-Production System Check: Deepgram API ✅, R2 Permission ✅
- voiceConfig: 5 distinct voices per mode ✅
- Grammar Count: 20 exercises per mode ✅
- W16+ Sub-Tabs: logic_science (3Q) + singapore_math (5Q) + social_quiz (7Q) = 15Q ✅
- Theme Grep: All files contain week theme keywords ✅
- Deepgram Model: `aura-<name>-en` (no -2- prefix) ✅
- Mode Differentiation: Easy ≠ Advanced tested separately ✅
- Browser Test: PASSED both modes ✅
- Rollback Point: Created (tag: pre-week-N-backup) ✅

Golden Standards Used:
- AI Tutor: Week 7 (V5.0 format)
- W1-15 Stations: Week 6 (15 files structure)
- W16+ Stations: Week 16 (19 files with sub-tabs)

Python Usage: ZERO (.js files created with Node.js ONLY)

Session Log: $SESSION_LOG

Status: Week N READY for production! 🚀
```
- Mode Differentiation: Easy ≠ Advanced tested separately ✅
- Browser Test: PASSED both modes ✅
- Rollback Point: Created (tag: pre-week-N-backup) ✅

Golden Standards Used:
- AI Tutor: Week 7 (V5.0 format)
- Stations: Week 6 (correct schema)

Python Usage: ZERO (.js files created with Node.js ONLY)

Session Log: $SESSION_LOG

Status: Week N READY for production! 🚀
```

---

**Ready Status:** 🟢 I am ready to follow this workflow when instructed  
**Commitment:** I will NOT deviate from this checklist  
**Week 12+13 Lessons:** All incorporated — see `PRODUCTION_LESSONS_LEARNED.md`
