# 🐛 LESSONS LEARNED: WEEK 9-11 BUGS → WEEK 12 PREVENTION

**Date:** March 6, 2026  
**Purpose:** Document all bugs encountered in Week 9-11 để KHÔNG LẶP LẠI khi tạo Week 12  
**Context:** Week 6-7 là golden standard → Week 9-11 phát hiện bugs mới → Update Master Prompt  

---

## 🎯 EXECUTIVE SUMMARY

**Week 9-11 đã mắc phải 17 BUGS** (BUG-1 đến BUG-17) trong quá trình production. Tất cả đã được fix nhưng cần **UPDATE MASTER PROMPT** để Week 12 KHÔNG mắc lại.

### 📊 Bug Breakdown:
- **Audio-related bugs:** 8/17 (47%) - Chiếm phần lớn
- **Path/naming bugs:** 4/17 (24%)
- **Content bugs:** 3/17 (18%)
- **Config bugs:** 2/17 (12%)

---

## 🔴 CRITICAL BUGS (Must Fix Before Week 12)

### **BUG-16: TTS Pronunciation Issues - "read" /rɛd/ vs /riːd/**

**Context:** Week 11 vocab word "read" (present tense) bị Deepgram TTS đọc sai

**What Went Wrong:**
```javascript
// Deepgram TTS không có phoneme control
// Default: "read" → /rɛd/ (past tense, more common)
// Cần: "read" → /riːd/ (present tense, Week 11 context)
```

**Symptoms:**
- Vocab audio: TTS đọc "red" instead of "reed"
- Mindmap audio: Same issue
- User confusion: "Sao đọc là 'red' vậy?"

**Root Cause:**
- Deepgram Aura TTS uses statistical model
- No phoneme/IPA input support
- Chooses most common pronunciation (past tense)

**Fix Applied:**
```bash
# Workaround: Context trick + audio trimming
1. Generate with context: "read (present tense)"
   → Deepgram produces /riːd/ + extra text
2. Trim audio: ffmpeg -t 0.6 (remove "present tense" part)
3. Result: 3.7KB file with correct /riːd/ pronunciation
```

**Commits:**
- `4528de7`: Initial fix attempt (macOS TTS - rejected)
- `076fc34`: Deepgram context trick implementation
- `ed1081a`: Upload to correct R2 path
- `f4cd602`, `5e7ed3a`: Cloudflare cache clear

**PREVENTION FOR WEEK 12:**
```markdown
⚠️ **BEFORE generating audio for Week 12:**

1. Check syllabus vocab for HOMOPHONE words:
   - read (present) vs read (past)
   - tear (rip) vs tear (cry)
   - bow (weapon) vs bow (gesture)
   - live (verb) vs live (adjective)
   
2. If found, test Deepgram pronunciation FIRST:
   curl -X POST "https://api.deepgram.com/v1/speak?model=aura-asteria-en" \
     -d '{"text": "read"}' -o test.mp3
   # Play and verify pronunciation
   
3. If wrong, apply CONTEXT TRICK:
   - Generate: "{word} (part of speech/context)"
   - Trim: ffmpeg -t {duration} -acodec copy
   - Example: "read (present tense)" → trim to 0.6s
   
4. Document in AUDIO_GENERATION_NOTES.md
```

---

### **BUG-17: AI Tutor FreeTalk - TTS Reads Numbered Lists**

**Context:** AI Tutor thỉnh thoảng copy-paste prompt format vào response

**What Went Wrong:**
```javascript
// Prompt có numbered knowledge base:
freetalk_knowledge: {
  knowledge_base: [
    "1. Topic about reading",
    "2. Topic about libraries", 
    "3. Topic about books"
  ]
}

// AI response:
"1. Let's talk about reading" 
// TTS đọc: "one let's talk about reading" ❌
```

**Symptoms:**
- User hears: "One...", "Two...", "Three..." in AI greeting
- Happens randomly (~10% of time)
- Both opening messages and mid-conversation

**Root Cause:**
- FreeTalk prompt formats knowledge_base with numbers
- AI sometimes copies format literally
- TTS receives unfiltered text → reads everything

**Fix Applied:**
```javascript
// Added cleanNumberedListArtifacts() function
function cleanNumberedListArtifacts(text) {
  return text
    .replace(/^\d+\.\s+/gm, '') // Remove "1. " at line starts
    .replace(/\s+\d+\.\s+/g, ' ') // Remove " 1. " in middle
    .trim();
}

// Applied to 5 TTS call sites in FreeTalkTab.jsx
```

**Commit:** `0a4a3d0`

**PREVENTION FOR WEEK 12:**
```markdown
✅ **FIX ALREADY IN CODE** - No action needed for Week 12

BUT: Verify no OTHER formatting artifacts:
- Bullet points (•, -, *)
- Brackets ([word], {context})
- Special markers (✅, ❌, 🎯)

If Week 12 prompt adds new formatting, update cleanNumberedListArtifacts()
```

---

### **BUG-7: CDN_WEEKS Whitelist Missing New Week**

**Context:** voiceService.js has hardcoded week whitelist

**What Went Wrong:**
```javascript
// src/services/voiceService.js
const CDN_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
// ❌ Week 11 missing!

// Result: TTS falls back to browser TTS despite R2 files existing
```

**Symptoms:**
- Console: `[TTS] ⚠️ Using browser TTS as last resort`
- Audio plays but with wrong voice quality
- Files exist on R2 (curl returns 200 OK)

**Fix Applied:**
```javascript
const CDN_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
```

**Commit:** `bb07bdf`

**PREVENTION FOR WEEK 12:**
```markdown
🔴 **MANDATORY STEP - ADD TO WORKFLOW:**

After generating Week 12 audio:
1. Edit src/services/voiceService.js
2. Add 12 to CDN_WEEKS array (line ~96)
3. Commit: "Enable CDN audio for Week 12"
4. Deploy BEFORE testing audio

⚠️ Without this: All Week 12 audio will use browser TTS!
```

---

### **BUG-8: Audio Files Gitignored → 404 in Production**

**Context:** `public/audio/` in .gitignore → files not in git → not deployed

**What Went Wrong:**
```bash
# Local dev: Works (files in public/audio/week11/)
# Production: 404 (files never uploaded to Cloudflare Pages)

git ls-files public/audio/week11/  # Returns nothing
cat .gitignore | grep audio        # Shows: public/audio/
```

**Symptoms:**
- Dev environment: Audio plays perfectly
- Production: All audio returns 404
- Console: `Failed to load audio: 404 Not Found`

**Fix Applied:**
```bash
git add -f public/audio/week11/       # Force add (bypass gitignore)
git add -f public/audio/week11_easy/
# Result: 320 files tracked (~4.4MB)
```

**Commit:** `8162f44`

**PREVENTION FOR WEEK 12:**
```markdown
🔴 **MANDATORY STEP - ADD TO WORKFLOW:**

After running generate_audio_deepgram.py:
1. git add -f public/audio/week12/
2. git add -f public/audio/week12_easy/
3. Verify: git status | grep week12 | wc -l  
   # Should show ~300-350 files
4. Commit: "Add Week 12 audio files: {count} Advanced + {count} Easy"
5. Push and wait for Cloudflare deployment

⚠️ DO NOT SKIP THE -f FLAG! Files will not deploy without it!
```

---

### **BUG-9: Easy Mode Audio Filename Suffix Mismatch**

**Context:** Code expects `_easy` suffix in filename, script generates without suffix

**What Went Wrong:**
```javascript
// ❌ Code expected:
audio: "/audio/week11_easy/mindmap_stem_2_easy.mp3"

// ✅ Actual file generated:
/audio/week11_easy/mindmap_stem_2.mp3  // No _easy in filename
```

**Naming Rule (CRITICAL):**
```
Folder path: MUST have mode suffix
  - Advanced: /audio/week11/
  - Easy: /audio/week11_easy/

Filename: NO mode suffix
  - Both modes: mindmap_stem_2.mp3(same name)
```

**Symptoms:**
- Easy mode: Browser TTS for mindmap/word_power
- Console: 404 for `filename_easy.mp3`
- Advanced mode: Works fine

**Fix Applied:**
```bash
# Remove _easy suffix from Easy mode code
sed -i '' 's/_easy\.mp3/.mp3/g' src/data/weeks_easy/week_11/mindmap.js
sed -i '' 's/_easy\.mp3/.mp3/g' src/data/weeks_easy/week_11/word_power.js
```

**Commit:** `eab4a3d`

**PREVENTION FOR WEEK 12:**
```markdown
🔴 **MANDATORY CHECK - ADD TO WORKFLOW:**

After generating Week 12 audio:
1. List actual filenames:
   ls -1 public/audio/week12/*.mp3 | head -10
   ls -1 public/audio/week12_easy/*.mp3 | head -10
   
2. Verify NO _easy suffix in filenames (only in folder path)

3. When writing code paths:
   ✅ audio: "/audio/week12_easy/vocab_word.mp3"
   ❌ audio: "/audio/week12_easy/vocab_word_easy.mp3"
   
4. Cross-check ALL audio paths in:
   - mindmap.js (both modes)
   - word_power.js (both modes)
   - Any other files with audio_url fields
```

---

## ⚠️ MEDIUM PRIORITY BUGS

### **BUG-12: Unused Stations in stationConfig.js**

**What Went Wrong:**
```javascript
// stationConfig.js included deprecated stations:
{ id: '20_questions', label: '20 Questions' }
{ id: 'word_chain', label: 'Word Chain' }

// These were moved to Game Hub but config not updated
```

**Fix:** Remove unused entries from stationConfig.js

**Commit:** `7262138`

**PREVENTION:** After Week 12 generation, verify stationConfig.js only has active stations

---

### **BUG-13: Week 11 Easy Mindmap Grammar Error**

**What Went Wrong:**
```javascript
// Week 11 Easy mindmap stem:
"At the library, you must be quiet" 
// ❌ "be quiet" không phù hợp với imperative context

// Fixed to:
"At the library, you must stay quiet"
// ✅ "stay quiet" = action verb, better for imperative
```

**Fix:** Grammar review + correction

**Commit:** `7262138`

**PREVENTION:** 
```markdown
After Week 12 generation:
1. Review ALL Easy mode mindmap stems
2. Check grammar patterns match Advanced mode
3. Verify imperative forms use action verbs (stay, keep, go)
```

---

### **BUG-10: Game Hub Missing Imports**

**What Went Wrong:**
```javascript
// gameAdaptation.js imported week11Games
// But file didn't exist yet (not created)
// → Build failed
```

**Fix:** Create games.js before committing gameAdaptation.js

**Commit:** `1ef546e`, `3fc682b`

**PREVENTION:**
```markdown
When adding Week 12 to Game Hub:
1. Create games.js FIRST (both modes)
2. Test import locally
3. THEN update gameAdaptation.js
4. Commit in correct order
```

---

## 📝 MINOR BUGS (Low Priority)

### **BUG-14: Deleted YouTube Video**

**What Went Wrong:** Week 11 Daily Watch video was deleted by creator → 404

**Fix:** Find replacement video with same theme

**PREVENTION:** Test all YouTube links before committing

---

### **BUG-15: Week 11 Easy Mode Path Inconsistencies**

**What Went Wrong:** Some Easy mode files had `week11` instead of `week11_easy` in paths

**Fix:** Global find-replace `week11` → `week11_easy` in Easy mode files

**Commits:** `90d7772`, `c19f645`

**PREVENTION FOR WEEK 12:**
```markdown
After creating Easy mode files:
1. Run validation script:
   grep -r "week12/" src/data/weeks_easy/week_12/ 
   # Should return 0 results
   
2. ALL paths in weeks_easy/week_12/ MUST have:
   - Images: /assets/images/weeks/week12_easy/
   - Audio: /audio/week12_easy/
   - Videos: (same as Advanced - no suffix)
```

---

## 🚀 WEEK 12 PRODUCTION WORKFLOW (Updated with Prevention)

### **Phase 1: Content Generation**
```bash
# 1. Generate week_12_real.js (Advanced mode)
# 2. Generate week_12_real.js (Easy mode) 
# 3. Update weekData.js imports
# 4. Test locally (npm run dev)
```

### **Phase 2: Audio Generation**
```bash
# 1. Run audio generation script
python3 audit_golden.py 12

# 2. Verify filenames (NO _easy suffix in filenames!)
ls -1 public/audio/week12/*.mp3 | head
ls -1 public/audio/week12_easy/*.mp3 | head

# 3. Check for homophones (BUG-16 prevention)
# If found, apply context trick + trim

# 4. Force-add to git (BUG-8 prevention)
git add -f public/audio/week12/
git add -f public/audio/week12_easy/

# 5. Verify file count
git status | grep week12 | wc -l  # Should be ~300-350

# 6. Commit
git commit -m "Add Week 12 audio files: {count} files"
```

### **Phase 3: CDN Configuration**
```bash
# 1. Update CDN_WEEKS (BUG-7 prevention)
vim src/services/voiceService.js
# Add 12 to CDN_WEEKS array (line ~96)

# 2. Commit
git commit -m "Enable CDN audio for Week 12"
```

### **Phase 4: Easy Mode Path Validation**
```bash
# 1. Check for path errors (BUG-15 prevention)
grep -r "week12/" src/data/weeks_easy/week_12/
# Should return 0 results (all should be week12_easy)

# 2. Check for _easy suffix errors (BUG-9 prevention)
grep -r "_easy\.mp3" src/data/weeks_easy/week_12/
# Should return 0 results (filenames have NO suffix)

# 3. If issues found, fix with:
sed -i '' 's/week12/week12_easy/g' src/data/weeks_easy/week_12/*.js
sed -i '' 's/_easy\.mp3/.mp3/g' src/data/weeks_easy/week_12/*.js
```

### **Phase 5: Video & Images**
```bash
# 1. Find YouTube videos (test links!)
# 2. Generate cover prompts: COVER_PROMPTS_WEEK_12.md
# 3. User tạo ảnh với Leonardo/Midjourney
# 4. Rename & upload: week12/, week12_easy/
# 5. Update CDN index
```

### **Phase 6: Game Hub Integration**
```bash
# 1. Create games.js FIRST (both modes)
# 2. Test import locally
# 3. Update gameAdaptation.js
# 4. Commit in correct order
```

### **Phase 7: Deployment & Testing**
```bash
# 1. Push to GitHub
git push

# 2. Wait for Cloudflare deployment (2-3 min)

# 3. Test in production (Incognito mode):
   - Audio plays (not browser TTS)
   - Images load (no 404)
   - Videos play
   - Easy mode uses week12_easy paths

# 4. If issues found:
   - Check console for errors
   - Verify R2 file paths
   - Use QUICK_REF.md troubleshooting section
```

---

## 📋 WEEK 12 PRE-FLIGHT CHECKLIST

**Before Starting Week 12 Production:**

### Audio Checklist:
- [ ] Check syllabus for homophone words
- [ ] Test Deepgram pronunciation for tricky words
- [ ] Prepare context tricks if needed
- [ ] Verify audio script generates to week12/ (NOT week12_easy/ for filenames)

### Path Checklist:
- [ ] Easy mode files use week12_easy in folder paths
- [ ] Easy mode files use NO _easy suffix in filenames
- [ ] All audio paths cross-checked with `ls public/audio/week12*/`

### Config Checklist:
- [ ] CDN_WEEKS includes 12
- [ ] stationConfig.js has no unused stations
- [ ] gameAdaptation.js imports games.js (if Game Hub added)

### Content Checklist:
- [ ] YouTube videos tested (not deleted)
- [ ] Easy mode mindmap grammar reviewed
- [ ] Vocabulary count matches syllabus (not arbitrary 10)

---

## 🎓 KEY LESSONS FOR MASS PRODUCTION

1. **Audio is the #1 source of bugs** (8/17 bugs)
   - Always verify actual filenames before writing code paths
   - Test pronunciation for homophones
   - Force-add to git with `-f` flag
   - Update CDN_WEEKS immediately

2. **Easy mode requires extra validation** (3/17 bugs)
   - Folder paths: MUST have _easy suffix
   - Filenames: MUST NOT have _easy suffix
   - Run grep validation after generation

3. **Test before committing** (2/17 bugs)
   - YouTube links
   - Import statements (games.js before gameAdaptation.js)
   - Local dev build

4. **Follow workflow strictly** → "Chạy 1 lèo" như bạn yêu cầu!

---

## 📄 FILES TO UPDATE

1. **ENGQUEST MASTER PROMPT V28 (or latest):**
   - Add BUG-16, BUG-17 prevention rules
   - Add homophone check step
   - Add CDN_WEEKS update step
   - Add audio gitignore workaround

2. **QUICK_REF.md:**
   - Already has BUG 7-10 documented
   - Add BUG-16, BUG-17
   - Update audio generation workflow

3. **Production Workflow Script (Optional):**
   - Create automated checklist runner
   - Pre-flight validation script
   - Post-generation path validator

---

**END OF LESSONS LEARNED**  
**Ready for Week 12 Production: GO! 🚀**