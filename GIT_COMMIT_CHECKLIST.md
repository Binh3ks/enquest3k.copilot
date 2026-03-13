# GIT COMMIT CHECKLIST - Quick Reference
**Mục đích**: Đảm bảo mỗi lần commit lên GitHub đúng cách, không có file rác  
**Cập nhật**: March 13, 2026 (Sau repository cleanup)  
**Sử dụng**: Đọc checklist này TRƯỚC MỖI LẦN `git commit`

---

## ⚡ QUICK CHECKLIST (Copy & Paste vào Terminal)

### 1️⃣ PRE-COMMIT INSPECTION (30 giây)

```bash
# Xem tất cả files sẽ được commit
git status

# Xem danh sách files staged (nếu đã git add)
git diff --cached --name-only

# Kiểm tra kích thước commit
git diff --cached --stat | tail -1
```

**✅ CHỈ COMMIT NẾU**:
- Chỉ thấy files trong: `src/data/weeks/`, `public/audio/`, `public/images/`
- Kích thước: Code < 10MB, Assets < 50MB
- Không có: `.wrangler/`, `node_modules/`, `Backup/`, `*.txt` copies

**❌ UNSTAGE NGAY NẾU THẤY**:
```bash
git reset HEAD .wrangler/
git reset HEAD node_modules/
git reset HEAD Backup/
git reset HEAD "ENGQUEST MASTER PROMPT*.txt"
git reset HEAD "*_copy.txt"
```

---

## 📋 DETAILED WORKFLOW

### STEP 1: Generate Week Content

```bash
# Ví dụ: Generate Week 15
cd /Users/binhnguyen/Downloads/Engquest3k
node MASS/tools/generate_spec.cjs 15
node MASS/tools/create_week.cjs 15

# Files được tạo:
# - src/data/weeks/week_15/*.js (14 files)
# - src/data/weeks_easy/week_15/*.js (13 files)
# - public/audio/week_15/*.mp3 (143 files)
# - public/images/week_15/*.jpg (23 files)
```

### STEP 2: Validate Output

```bash
node MASS/tools/validate_week_v2.cjs 15
```

### STEP 3: Test in Browser

```bash
npm run dev
# Test all stations, verify audio/images load
```

### STEP 4: ✅ CRITICAL - Pre-Commit Checks

#### A. Check What Will Be Committed

```bash
git status
```

**Expected Output (✅ GOOD):**
```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/data/weeks/week_15/
        src/data/weeks_easy/week_15/
        public/audio/week_15/
        public/images/week_15/
```

**Unexpected Output (❌ BAD - DO NOT COMMIT):**
```
Untracked files:
        .wrangler/                          ← ❌ Dev cache
        Backup/old_week15.js                ← ❌ Backup
        esl_server/model.onnx               ← ❌ Server file
        ENGQUEST MASTER PROMPT V28.txt      ← ❌ Doc duplicate
        node_modules/                       ← ❌ Dependencies
```

#### B. Selective Add (NEVER use "git add .")

```bash
# ✅ CORRECT: Add specific folders only
git add src/data/weeks/week_15
git add src/data/weeks_easy/week_15
git add public/audio/week_15
git add public/images/week_15

# ❌ WRONG: Never use this!
# git add .              ← Will add EVERYTHING including cache!
# git add -A             ← Same problem!
```

#### C. Verify Staged Files

```bash
# See list of staged files
git diff --cached --name-only

# Expected: Only week_15 files (should be ~170 files)
# NOT expecting: .wrangler/, node_modules/, Backup/

# Check sizes
git diff --cached --stat | tail -1
# Expected: "170 files changed, 15000 insertions(+)"
# File size: ~20-50MB total (code + assets)
```

#### D. If Found Unwanted Files → UNSTAGE

```bash
# Remove specific folder from staging
git reset HEAD .wrangler/
git reset HEAD Backup/

# Remove all .txt files
git reset HEAD "*.txt"

# Remove specific file
git reset HEAD path/to/file.js

# Start over (unstage everything)
git reset HEAD .
```

### STEP 5: Commit with Clear Message

```bash
git commit -m "feat: Week 15 - The Busy Park (Present Continuous)

Content:
- 14 Advanced station files (vocab, read, grammar, dictation, etc.)
- 13 Easy station files (simplified versions)

Assets:
- 143 audio files (vocab: 40, dictation: 12, shadowing: 12, mindmap: 42, etc.)
- 23 images (vocab: 10, covers: 2, logic: 5, word match: 6)
- 5 video references (YouTube IDs)

Validation: ✅ All schemas compliant, no placeholders"
```

### STEP 6: Final Pre-Push Check

```bash
# See what will be pushed
git log origin/main..HEAD --oneline --stat

# Expected: 1 commit with ~170 files
# If you see multiple commits with .wrangler/ or large files → STOP

# Check commit size
git show --stat
```

### STEP 7: Push to GitHub

```bash
git push

# Expected output:
# Writing objects: 100% (175/175), 25.3 MiB
# Total 175 (delta 12), reused 0 (delta 0)
# To https://github.com/Binh3ks/enquest3k.copilot.git
#    a5a4fd4..b6c7e85  main -> main

# Push should be < 1 minute for code, < 5 minutes for assets
```

---

## 🚨 ERROR SCENARIOS & FIXES

### Problem 1: "git status" shows .wrangler/ or node_modules/

**Cause**: These folders not in .gitignore  
**Fix**:
```bash
# Check .gitignore
cat .gitignore | grep -E "wrangler|node_modules"

# If missing, add them
echo ".wrangler/" >> .gitignore
echo "node_modules/" >> .gitignore

# Verify they're now ignored
git status --ignored | grep -E "wrangler|node_modules"
```

### Problem 2: Already committed large files by mistake

**If NOT pushed yet:**
```bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Unstage unwanted files
git reset HEAD .wrangler/

# Commit again (clean)
git add src/data/weeks/week_15
git commit -m "Week 15: Complete"
```

**If ALREADY pushed:**
```bash
# ⚠️ WARNING: This rewrites history!

# Remove from last commit
git rm --cached -r .wrangler/
git commit --amend --no-edit
git push --force

# If committed many times, use BFG:
# See REPOSITORY_AUDIT_REPORT.md for full cleanup procedure
```

### Problem 3: Push takes too long (> 10 minutes)

**Cause**: Committing too many/large files  
**Fix**:
```bash
# Check what's in the commit
git show --stat

# If you see thousands of files or 100MB+:
git reset --soft HEAD~1
git reset HEAD .

# Re-add ONLY production files
git add src/data/weeks/week_15
git add public/audio/week_15
git add public/images/week_15
git commit -m "Week 15: Complete"
```

### Problem 4: .gitignore not working

**Cause**: Files already tracked before adding to .gitignore  
**Fix**:
```bash
# Remove from Git tracking (keeps local file)
git rm --cached -r .wrangler/
git rm --cached -r Backup/

# Commit the removal
git commit -m "chore: Stop tracking cache and backup folders"

# Now .gitignore will work for future changes
```

---

## 📊 REPOSITORY HEALTH CHECK (Run Weekly)

```bash
# Current repository size
du -sh .git/
# Target: < 300MB (Current: 289MB after March 2026 cleanup)

# Number of tracked files
git ls-files | wc -l
# Target: < 2,000 files (Current: 1,600 files)

# Largest files in repo
git rev-list --objects --all \
  | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
  | awk '$1=="blob" && $3 > 1000000 {print $3/1024/1024 " MB", $4}' \
  | sort -rn | head -10

# Expected: Only images (1-2MB each)
# NOT expected: Code files > 1MB, .onnx models, .sqlite files
```

---

## ✅ GOOD COMMIT EXAMPLES

### Example 1: Week 15 Production Files

```bash
$ git add src/data/weeks/week_15 public/audio/week_15 public/images/week_15
$ git commit -m "feat: Week 15 - The Busy Park

- Add 14 station files (vocab, read, grammar, etc.)
- Add 143 audio files (TTS generated)
- Add 23 images (vocab + covers)
- Validation: All schemas compliant"

$ git push
```

**Result**: 
- Commit size: ~25MB
- Files: 180
- Push time: 2 minutes
- ✅ Clean commit

### Example 2: Bug Fix

```bash
$ git add src/modules/vocab/VocabManager.jsx
$ git commit -m "fix: Vocab audio not playing due to missing await

- Add await to VoiceService.prefetch() call
- Fixes audio path resolution for week 15+
- Tested on Week 15 vocab station"

$ git push
```

**Result**:
- Commit size: 2KB
- Files: 1
- Push time: < 10 seconds
- ✅ Clean commit

---

## ❌ BAD COMMIT EXAMPLES (What NOT To Do)

### Bad Example 1: Committed Cache Files

```bash
$ git add .     ← ❌ NEVER DO THIS
$ git commit -m "Week 15"
$ git push

Enumerating objects: 3542, done.
Writing objects: 100% (3542/3542), 157.2 MiB   ← ❌ Too large!
```

**Problem**: 
- Committed 3,000+ .wrangler/ cache files
- Push size: 157MB (should be ~25MB)
- Repo bloated

**Fix**: See "Problem 2" above

### Bad Example 2: Vague Commit Message

```bash
$ git commit -m "update"    ← ❌ Too vague
$ git commit -m "fix"       ← ❌ What fix?
$ git commit -m "done"      ← ❌ What's done?
```

**Better**:
```bash
$ git commit -m "feat: Week 15 - Complete all stations and assets"
$ git commit -m "fix(vocab): Audio playback stops after 3 words"
$ git commit -m "docs: Update mass production workflow with Git checklist"
```

---

## 🎯 SUCCESS CRITERIA

**After following this checklist, each commit should be:**

✅ **Selective**: Only production files (src/, public/)  
✅ **Clean**: No cache, no backups, no duplicates  
✅ **Reasonable size**: Code < 10MB, Assets < 50MB  
✅ **Clear message**: Describes what and why  
✅ **Fast push**: < 5 minutes  
✅ **No bloat**: Repository stays healthy (< 300MB .git/)

**🎉 Result**: Professional, maintainable repository!

---

**Last Updated**: March 13, 2026  
**Next Review**: When hitting 2,000 tracked files or 400MB .git/ size

**Related Documents**:
- [MASS_PRODUCTION_WORKFLOW_COMPLETE.md](MASS_PRODUCTION_WORKFLOW_COMPLETE.md) - Full workflow
- [REPOSITORY_AUDIT_REPORT.md](REPOSITORY_AUDIT_REPORT.md) - Cleanup details
- [.gitignore](.gitignore) - Exclusion rules
