# 📊 REPOSITORY AUDIT REPORT - EngQuest3K

**Date:** March 13, 2026  
**Total Size:** 2.1GB (local) | 453MB (.git history)

---

## 🔴 **CRITICAL ISSUES FOUND**

### 1. **KHÔNG NÊN COMMIT VÀO GIT** (~3,795 files, ~500MB)

| Thư mục/File | Size | Lý do | Hành động |
|-------------|------|-------|----------|
| **esl_server/** | 134MB | Backend server + AI models (92MB ONNX, 28MB voices) | ❌ REMOVE |
| **mcp-server/** | 47MB | VSCode extension development tool | ❌ REMOVE |
| **.wrangler/** | ~100MB+ | Cloudflare dev cache (SQLite, R2 blobs) | ❌ REMOVE (đã ignore nhưng còn trong history) |
| **Backup/** | 2.9MB | Old backup files | ❌ REMOVE |
| **Production_FINAL/** | 2.9MB | Documentation | ❌ REMOVE (hoặc move sang repo riêng) |
| **MASS_Final/** | 1.2MB | Documentation | ❌ REMOVE |
| **Icon/** | 1.4MB | MacOS system folder | ❌ REMOVE |
| Large .txt files | ~500KB | Master prompts, syllabus copies | ❌ REMOVE duplicates |

### 2. **CÓ THỂ OPTIMIZE** (~200MB)

| Thư mục | Size | Vấn đề | Giải pháp |
|---------|------|--------|----------|
| **public/images/** | 204MB | 1,070 images, nhiều file > 1MB | ⚠️ Optimize hoặc move sang CDN |
| **dist/** | 560MB | Build output (CÓ trong .gitignore) | ✅ OK - không commit |
| **node_modules/** | 181MB | Dependencies (CÓ trong .gitignore) | ✅ OK - không commit |

---

## 📈 **BREAKDOWN CHI TIẾT**

### Git Repository Size
```
Loose objects: 228.95 MiB
Packed objects: 222.76 MiB
Total .git/: ~453 MB
```

### Top 20 Largest Files in Git History
```
1. esl_server/kokoro-v1.0.int8.onnx - 92.4 MB (AI TTS model)
2. esl_server/voices-v1.0.bin - 28.2 MB (Voice data)
3-10. .wrangler/state/.../*.sqlite-wal - 20.8 MB each (Wrangler cache)
11-20. .wrangler/state/.../blobs/* - 1-2 MB each (R2 local storage)
```

### Tracked Files
```
Total: 6,479 files
Should remove: 3,795 files (58.6%)
Should keep: 2,684 files (41.4%)
```

---

## ✅ **ĐÃ FIX**

1. ✅ Updated `.gitignore` với sections mới:
   - Backend/Server folders (esl_server, mcp-server)
   - Backup folders
   - Documentation folders
   - Large text files
   - MacOS system folders

2. ✅ Created `cleanup_repo.sh` script

---

## 🚀 **HÀNH ĐỘNG GẦN NGAY**

### Bước 1: Stop Tracking Files (Giữ lại local)
```bash
./cleanup_repo.sh
```
Hoặc manual:
```bash
git rm -r --cached esl_server/ mcp-server/ Backup/ Production_FINAL/ MASS_Final/ Icon/ .wrangler/
git commit -m "chore: Untrack large server/backup files from Git"
git push
```

### Bước 2: Commit .gitignore mới
```bash
git add .gitignore
git commit -m "chore: Update .gitignore to exclude server/backup folders"
git push
```

---

## ⚠️ **ADVANCED: CLEAN GIT HISTORY** (Optional)

**CHÚ Ý:** Cần force push, ảnh hưởng đến collaborators!

### Option A: BFG Repo-Cleaner (Recommended)
```bash
# Install
brew install bfg

# Backup trước
git clone --mirror https://github.com/Binh3ks/enquest3k.copilot.git enquest3k-backup.git

# Clean history
cd enquest3k.copilot/
bfg --delete-folders esl_server,mcp-server,.wrangler,Backup,Production_FINAL,MASS_Final .

# Verify và push
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force

# Expected result: .git/ size giảm từ 453MB → ~50-100MB
```

### Option B: Git Filter-Repo
```bash
pip install git-filter-repo

git filter-repo \
  --path esl_server --invert-paths \
  --path mcp-server --invert-paths \
  --path .wrangler --invert-paths \
  --path Backup --invert-paths

git push --force
```

---

## 📊 **EXPECTED RESULTS**

### Immediate (Stop Tracking):
- ✅ Future commits: Chỉ ~1-10KB mỗi commit (code changes)
- ✅ Stop committing 134MB server files
- ❌ Git history vẫn còn: .git/ = 453MB

### After History Cleanup:
- ✅ .git/ shrinks: 453MB → 50-100MB
- ✅ Faster clone/pull
- ✅ GitHub repo size giảm đáng kể

---

## 🎯 **RECOMMENDATIONS**

### For Images (public/images/ - 204MB)
1. **Optimize images:**
   ```bash
   # Install imagemagick
   brew install imagemagick
   
   # Compress all JPGs to 85% quality
   find public/images -name "*.jpg" -exec mogrify -quality 85 {} \;
   
   # Expected: 204MB → 100-150MB
   ```

2. **Or move to CDN:** Upload to Cloudflare R2, serve from CDN

### For Documentation
- Move `Production_FINAL/`, `MASS_Final/` to separate Git repo
- Keep only essential README/setup docs in main repo

### For Server Code
- Keep `esl_server/` in separate Git repo
- Deploy independently to HuggingFace Spaces

---

## 📝 **SUMMARY**

| Item | Before | After Stop Tracking | After History Cleanup |
|------|--------|---------------------|----------------------|
| Local size | 2.1GB | 2.1GB (files stay) | 2.1GB |
| .git/ size | 453MB | 453MB (history) | ~50-100MB |
| Tracked files | 6,479 | 2,684 | 2,684 |
| Future commits | Large | Small | Small |
| GitHub size | Large | Large (history) | Small |

**Bottom line:** 
- **Immediate fix** stops new bloat  
- **History cleanup** fixes old bloat  
- Both recommended for optimal repo health
