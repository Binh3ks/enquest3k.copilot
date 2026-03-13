#!/bin/bash

# ============================================
# REPOSITORY CLEANUP SCRIPT
# Remove unnecessary files from Git tracking
# ============================================

echo "🧹 EngQuest Repository Cleanup"
echo "================================"
echo ""

# Stop if any command fails
set -e

# Confirmation
echo "⚠️  WARNING: This will remove files from Git tracking (but keep them locally)"
echo ""
echo "Files to be removed from Git:"
echo "  - esl_server/ (134MB - HF Space server code)"
echo "  - mcp-server/ (47MB - VSCode extension)"
echo "  - Backup/ (2.9MB - old backups)"
echo "  - Production_FINAL/ (2.9MB - docs)"
echo "  - MASS_Final/ (1.2MB - docs)"
echo "  - Icon/ (1.4MB - MacOS folder)"
echo "  - .wrangler/ (if tracked - dev cache)"
echo "  - Large .txt files (master prompts, syllabus)"
echo ""
echo "📊 Estimated: ~3,795 files will be untracked"
echo ""
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Cancelled"
    exit 0
fi

echo ""
echo "🚀 Starting cleanup..."
echo ""

# Remove from git tracking (but keep files locally)
echo "1/4 Removing backend/server folders..."
git rm -r --cached esl_server/ 2>/dev/null || echo "  ✓ esl_server/ not tracked or already removed"
git rm -r --cached mcp-server/ 2>/dev/null || echo "  ✓ mcp-server/ not tracked or already removed"

echo "2/4 Removing backup/doc folders..."
git rm -r --cached Backup/ 2>/dev/null || echo "  ✓ Backup/ not tracked or already removed"
git rm -r --cached Production_FINAL/ 2>/dev/null || echo "  ✓ Production_FINAL/ not tracked or already removed"
git rm -r --cached MASS_Final/ 2>/dev/null || echo "  ✓ MASS_Final/ not tracked or already removed"
git rm -r --cached Icon/ 2>/dev/null || echo "  ✓ Icon/ not tracked or already removed"

echo "3/4 Removing dev cache folders..."
git rm -r --cached .wrangler/ 2>/dev/null || echo "  ✓ .wrangler/ not tracked or already removed"
git rm -r --cached .debris/ 2>/dev/null || echo "  ✓ .debris/ not tracked or already removed"

echo "4/4 Removing large text files..."
git rm --cached *"MASTER PROMPT"*.txt 2>/dev/null || echo "  ✓ No master prompt files tracked"
git rm --cached *"SYLLABUS"*.txt 2>/dev/null || echo "  ✓ No syllabus files tracked"
git rm --cached *_copy*.txt 2>/dev/null || echo "  ✓ No copy text files tracked"
git rm --cached _backup*/ 2>/dev/null || echo "  ✓ No backup folders tracked"

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Review changes: git status"
echo "  2. Commit: git commit -m 'chore: Untrack large server/backup files'"
echo "  3. Push: git push"
echo ""
echo "⚠️  IMPORTANT: This only stops tracking NEW changes."
echo "   Old files are still in Git history (~453MB in .git folder)"
echo ""
echo "To clean Git history (ADVANCED - use with caution):"
echo "  Option A: Use BFG Repo-Cleaner (recommended)"
echo "    brew install bfg"
echo "    bfg --delete-folders esl_server,mcp-server,.wrangler,Backup ."
echo ""
echo "  Option B: Use git filter-repo"
echo "    pip install git-filter-repo"
echo "    git filter-repo --path esl_server --invert-paths"
echo ""
echo "  After history cleanup: git push --force"
echo ""
