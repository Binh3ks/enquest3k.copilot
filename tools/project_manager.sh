#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# ENGQUEST PROJECT MANAGER (Clean + Safe) - Tailwind CSS v4 Ready
#
# Features:
# 1) Backup: zip snapshot excluding heavy/garbage folders (EXCLUDES) + exclude public/
# 2) Restore: unzip to temp then rsync into project (safer than rm -rf blindly)
# 3) Fix: reinstall deps + ensure Vite runs + ensure Tailwind v4 + PostCSS config OK
# 4) Run: npm run dev
# =============================================================================

PROJECT_ROOT="$(pwd)"
BACKUP_DIR="${HOME}/Downloads/_BACKUPS"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_FILENAME="SNAPSHOT_${TIMESTAMP}.zip"

# Excludes for backup (add/remove as you like)
EXCLUDES=(
  "node_modules/*"
  ".git/*"
  ".debris/*"
  ".DS_Store"
  "dist/*"
  "build/*"
  "coverage/*"
  ".vscode/*"
  ".idea/*"
  "*.log"
  "package-lock.json"
  "yarn.lock"
  "pnpm-lock.yaml"
  # user request:
  "public/*"
)

# What we restore back into project from snapshot
# (you can add other top-level files if needed)
RESTORE_ITEMS=(
  "src"
  "tools"
  "package.json"
  "vite.config.js"
  "postcss.config.cjs"
  "postcss.config.js"
  "tailwind.config.js"
  "index.html"
)

# ---------- Helpers ----------
say() { printf "\n\033[1m%s\033[0m\n" "$*"; }
warn() { printf "\n\033[33m⚠ %s\033[0m\n" "$*"; }
ok() { printf "\n\033[32m✅ %s\033[0m\n" "$*"; }
fail() { printf "\n\033[31m❌ %s\033[0m\n" "$*"; exit 1; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

ensure_dir() {
  mkdir -p "$1"
}

confirm() {
  read -r -p "$1 (y/N): " ans
  [[ "${ans:-}" == "y" || "${ans:-}" == "Y" ]]
}

# ---------- 1) BACKUP ----------
run_backup() {
  say "1) BACKUP: Creating snapshot zip"
  ensure_dir "$BACKUP_DIR"

  local out="${BACKUP_DIR}/${BACKUP_FILENAME}"

  say "Excluding:"
  for x in "${EXCLUDES[@]}"; do echo "  - $x"; done

  # Build -x arguments for zip
  local zip_excludes=()
  for x in "${EXCLUDES[@]}"; do
    zip_excludes+=("-x" "$x")
  done

  # zip everything in project root, excluding patterns above
  # Use (cd ...) so zip paths are relative
  (cd "$PROJECT_ROOT" && zip -r "$out" . "${zip_excludes[@]}") || fail "Backup failed"
  ok "Backup created: $out"
}

# ---------- 2) RESTORE ----------
run_restore() {
  say "2) RESTORE: Restore from a snapshot (safe rsync)"
  ensure_dir "$BACKUP_DIR"
  need_cmd unzip
  need_cmd rsync

  local snapshots
  snapshots=$(ls -1t "${BACKUP_DIR}"/SNAPSHOT_*.zip 2>/dev/null || true)
  [[ -n "$snapshots" ]] || fail "No snapshots found in: $BACKUP_DIR"

  say "Available snapshots:"
  echo "$snapshots" | nl -w2 -s". "

  read -r -p "Choose snapshot number: " idx
  local chosen
  chosen=$(echo "$snapshots" | sed -n "${idx}p") || true
  [[ -f "${chosen:-}" ]] || fail "Invalid selection."

  say "Selected: $chosen"
  warn "Restore will overwrite these items in current project:"
  for it in "${RESTORE_ITEMS[@]}"; do echo "  - $it"; done

  confirm "Continue restore?" || { warn "Restore cancelled."; return; }

  local tmp
  tmp="$(mktemp -d)"
  say "Unzipping to temp: $tmp"
  unzip -q "$chosen" -d "$tmp"

  # If zip contains top-level folder, detect it
  local root_candidate
  root_candidate="$(find "$tmp" -maxdepth 1 -type d ! -path "$tmp" | head -n 1 || true)"
  local SRCROOT="$tmp"
  if [[ -n "${root_candidate:-}" ]]; then
    # If it looks like a project root (has package.json or src), use it
    if [[ -f "$root_candidate/package.json" || -d "$root_candidate/src" ]]; then
      SRCROOT="$root_candidate"
    fi
  fi

  say "Rsync selected items into project root: $PROJECT_ROOT"

  for it in "${RESTORE_ITEMS[@]}"; do
    if [[ -e "$SRCROOT/$it" ]]; then
      # --delete makes target match source for that item
      rsync -a --delete "$SRCROOT/$it" "$PROJECT_ROOT/" || fail "Failed syncing: $it"
      ok "Restored: $it"
    else
      warn "Not found in snapshot (skipped): $it"
    fi
  done

  rm -rf "$tmp"
  ok "Restore completed."
  warn "Next: run option [3] FIX to reinstall dependencies & ensure Tailwind v4 pipeline."
}

# ---------- 3) FIX (Node/Vite/Tailwind v3) ----------
run_fix() {
  say "3) FIX: Repair dependencies + ensure Tailwind v3 + PostCSS setup"
  need_cmd npm

  say "Cleaning node_modules + vite cache + lockfiles"
  rm -rf node_modules .vite package-lock.json yarn.lock pnpm-lock.yaml

  say "Install dependencies (npm install)"
  npm install

  # Ensure Vite exists (sometimes missing in copied projects)
  if ! npx --no -- vite --version >/dev/null 2>&1; then
    warn "Vite not found. Installing vite + plugin-react as dev dependencies..."
    npm install -D vite @vitejs/plugin-react
  fi

  # Tailwind v3 standard stack (supports dynamic classes like bg-${color}-500)
  say "Install Tailwind v3 + PostCSS + Autoprefixer"
  npm install -D tailwindcss@3 postcss@8 autoprefixer@10

  # PostCSS config (CJS to avoid 'type: module' issues)
  say "Write postcss.config.cjs (Tailwind v3 standard with plugin)"
  cat > postcss.config.cjs <<'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

  # Tailwind config (from user's backup)
  say "Ensure tailwind.config.js exists (from user backup)"
  cat > tailwind.config.js <<'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border|ring|from|to)-(indigo|orange|purple|rose|emerald|cyan|sky|pink|lime|violet|teal|red|blue|amber|sky)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /shadow-(indigo|orange|purple|rose|emerald|cyan|sky|pink|lime|violet|teal|red|blue)-(200|300|400|500)/,
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
EOF

  # FORCE OVERWRITE src/index.css with Tailwind v3 directives
  say "Force writing correct Tailwind v3 directives to src/index.css"
  if [[ -f "$PROJECT_ROOT/src/index.css" ]]; then
    local temp_css
    temp_css=$(mktemp)
    printf '%s\n' "@tailwind base;" "@tailwind components;" "@tailwind utilities;" > "$temp_css"
    grep -vE '^\s*@tailwind|^\s*@import\s+"tailwindcss"|^\s*@import\s+' "$PROJECT_ROOT/src/index.css" >> "$temp_css"
    mv "$temp_css" "$PROJECT_ROOT/src/index.css"
    ok "src/index.css has been corrected for Tailwind v3."
  else
    warn "src/index.css not found, creating a new one."
    printf '%s\n' "@tailwind base;" "@tailwind components;" "@tailwind utilities;" > "$PROJECT_ROOT/src/index.css"
  fi


  # Ensure index.html exists
  if [[ ! -f "$PROJECT_ROOT/index.html" ]]; then
    warn "index.html missing, creating minimal Vite index.html"
    cat > index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EngQuest</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF
  fi

  ok "FIX completed (Tailwind v3 installed & configured)."
  say "Next step: Run 'npm run dev' to start the development server"
}

# ---------- 4) RUN ----------
run_app() {
  say "4) RUN: npm run dev"
  npm run dev
}

# ---------- 5) MEMORY & CONTEXT ----------
run_memory_context() {
  say "5) GHI MEMORY & BUILD CONTEXT (HOÀN CHỈNH)"
  need_cmd node
  
  # Check if scripts exist
  [[ -f "${PROJECT_ROOT}/scripts/add-memory.mjs" ]] || fail "scripts/add-memory.mjs not found"
  [[ -f "${PROJECT_ROOT}/scripts/add-chat-insights.mjs" ]] || fail "scripts/add-chat-insights.mjs not found"
  [[ -f "${PROJECT_ROOT}/scripts/build-context.mjs" ]] || fail "scripts/build-context.mjs not found"
  
  # Step 1: Add chat session insights
  say "🧠 BƯỚC 1: Thêm insights từ chat sessions..."
  node "${PROJECT_ROOT}/scripts/add-chat-insights.mjs" || warn "Some chat insights may have failed"
  
  # Step 2: Add core project memories
  say "📝 BƯỚC 2: Thêm core project memories..."
  
  # Array of all critical memories to save
  local memories=(
    "Decision: AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)"
    "Decision: AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses."
    "Fact: 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)"
    "Rule: Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14)."
    "Constraint: Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic."
    "Fact: Week 1-2 data complete with full station structure. Week 2 has Advanced (Family Observation) + Easy (My Family Squad) modes with UK voice config. Week 3-17 are MISSING (15 weeks need generation). Week 18-21 are complete."
    "Fact: Week 2 structure complete - Advanced: Present Continuous & Questions, Easy: This is my... (Possession). Both modes have 14 station files, UK voice config (en-GB-Neural2-A/C), and AI Tutor specific checklist."
    "Constraint: Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23."
    "Decision: Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback."
    "Fact: Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented."
    "Constraint: Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets."
    "Decision: Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 3-17 (15 weeks), Day 4: Testing + polish. Target completion: Jan 2, 2026."
    "Rule: AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week."
    "Fact: AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow)."
    "Decision: User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js."
    "Rule: Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar."
    "Constraint: Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar."
    "Decision: Week 2 Easy mode correctly implements family topic with simpler grammar (This is my...) vs Advanced (Present Continuous). Both share family context but different complexity levels."
    "Discovery: copilot-context.md outdated - Shows Week 2-17 MISSING but Week 2 actually complete with full structure (Advanced + Easy modes, voice config, AI Tutor checklist)."
    "Decision: Memory system needs chat session insights capture - Important discussions, design decisions, and implementation considerations from chat sessions must be preserved in memory for future reference."
    "Fact: Week 2 has unique AI Tutor features - Special checklist in AITutor.jsx (line 1053) with tips and learning objectives specific to family vocabulary and Present Continuous grammar."
    "Rule: Context rebuild required after major discoveries - When significant gaps found between documentation and reality, immediate context rebuild needed to sync copilot knowledge with actual project state."
    "Discovery: Week 2 audio tasks generated in tools/audio_tasks.json for mindmap branches (week2_easy) - Shows asset generation pipeline working for completed weeks."
    "Constraint: Memory entries in project_manager.sh were hardcoded and outdated - Need dynamic system to capture real-time project insights and decisions from active development sessions."
    "Decision: Manual memory curation essential - Critical insights from chat sessions about project structure, implementation gaps, and strategic decisions must be manually reviewed and added to memory system."
  )
  
  # Add each memory
  local count=0
  for memory in "${memories[@]}"; do
    node "${PROJECT_ROOT}/scripts/add-memory.mjs" "${memory}" >/dev/null 2>&1 && ((count++)) || warn "Failed: ${memory:0:50}..."
  done
  
  ok "✅ Đã ghi ${count}/${#memories[@]} memory entries vào docs/memory.md"
  
  # Step 3: Build context
  say "🔄 BƯỚC 3: Build copilot-context.md từ tất cả sources..."
  node "${PROJECT_ROOT}/scripts/build-context.mjs" || fail "Failed to build context"
  ok "Context đã được build: copilot-context.md"
  
  # Summary
  ok "🎯 HOÀN TẤT! Tất cả đã được cập nhật:"
  echo "   ✅ Chat insights đã lưu vào memory"
  echo "   ✅ Core memories đã cập nhật" 
  echo "   ✅ Context đã rebuild hoàn chỉnh"
  echo ""
  echo "📋 Sẵn sàng cho phiên chat mới:"
  echo "   @workspace #file:copilot-context.md"
}

# ---------- MENU ----------
show_menu() {
  cat <<'EOF'

==========================================
   QUẢN LÝ DỰ ÁN ENGQUEST (Tailwind v4)
==========================================
1) Backup (Tạo Snapshot .zip, loại public/)
2) Restore (Khôi phục an toàn bằng rsync)
3) FIX (Reinstall + Tailwind v4 + PostCSS config)
4) Chạy App (npm run dev)
5) Ghi Chat Insights + Memory + Build Context
q) Thoát
------------------------------------------
EOF
}

main() {
  need_cmd zip

  while true; do
    show_menu
    read -r -p "Chọn tác vụ: " choice
    case "$choice" in
      1) run_backup ;;
      2) run_restore ;;
      3) run_fix ;;
      4) run_app ;;
      5) run_memory_context ;;
      q) exit 0 ;;
      *) warn "Lựa chọn không hợp lệ. Vui lòng thử lại." ;;
    esac
  done
}

main "$@"
