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
# 5) Update AI Context: Refresh auto-generated info in docs/ai_application_context.md
#
# Note: AI Context document (docs/ai_application_context.md) is now updated directly
#       by the AI agent when important decisions or development milestones occur.
#       The `generate:ai-context` npm script can still be run manually to refresh
#       auto-generated sections like dependencies and schema. AI chat summaries
#       are now handled directly by the AI agent itself.
# =============================================================================

PROJECT_ROOT="$(pwd)"
BACKUP_DIR="/Volumes/MY DOCUMENT/Apps/_BACKUPS"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_FILENAME="SNAPSHOT_${TIMESTAMP}.zip"

# Excludes for backup (add/remove as you like)
EXCLUDES=(
  "node_modules/*"
  "mcp-server/node_modules/*"
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
  "mcp-server/package-lock.json"
  "yarn.lock"
  "pnpm-lock.yaml"
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
  "docs"
  "mcp-server"
  "eslint.config.js"
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
  warn "VUI LÒNG KIỂM TRA & CẤU HÌNH LẠI CÁC FILE .env (frontend và mcp-server) SAU KHI RESTORE!"
}

# ---------- 3) FIX (Node/Vite/Tailwind v3) ----------
run_fix() {
  say "3) FIX: Repair dependencies + ensure Tailwind v3 + PostCSS setup"
  need_cmd npm

  say "Cleaning node_modules + vite cache + lockfiles (frontend)"
  rm -rf node_modules .vite package-lock.json yarn.lock pnpm-lock.yaml

  say "Cleaning node_modules + lockfiles (backend - mcp-server)"
  rm -rf mcp-server/node_modules mcp-server/package-lock.json mcp-server/yarn.lock mcp-server/pnpm-lock.yaml

  say "Install dependencies (frontend: npm install)"
  npm install

  say "Install dependencies (backend: cd mcp-server && npm install)"
  (cd mcp-server && npm install) || fail "Failed to install backend dependencies."

  # Ensure Vite exists (sometimes missing in copied projects)
  if ! npx --no -- vite --version >/dev/null 2>&1; then
    warn "Vite not found. Installing vite + plugin-react as dev dependencies..."
    npm install -D vite @vitejs/plugin-react
  fi

  # Tailwind v3 standard stack (supports dynamic classes like bg-${color}-500)
  say "Install Tailwind v3 + PostCSS + Autoprefixer"
  npm install -D tailwindcss@3 postcss@8 autoprefixer@10

  # PostCSS config (CJS to avoid 'type: module' issues)
  if confirm "Ghi đè postcss.config.cjs với cấu hình mặc định (có thể làm mất tùy chỉnh của bạn)?"; then
    say "Write postcss.config.cjs (Tailwind v3 standard with plugin)"
    cat > postcss.config.cjs <<'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF
  else
    warn "Bỏ qua ghi đè postcss.config.cjs."
  fi

  # Tailwind config (from user's backup)
  if confirm "Ghi đè tailwind.config.js với cấu hình mặc định (có thể làm mất tùy chỉnh của bạn)?"; then
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
  else
    warn "Bỏ qua ghi đè tailwind.config.js."
  fi

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

  # Ensure eslint.config.js exists and is configured correctly
  say "Kiểm tra và đảm bảo eslint.config.js tồn tại và được cấu hình đúng..."
  local ESLINT_CONFIG_FILE="$PROJECT_ROOT/eslint.config.js"
  local DEFAULT_ESLINT_CONFIG=""
  DEFAULT_ESLINT_CONFIG="$(cat << EOL
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'mcp-server', 'scripts']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
EOL
)"

  if [[ ! -f "$ESLINT_CONFIG_FILE" ]] || ! grep -q "mcp-server" "$ESLINT_CONFIG_FILE"; then
    warn "eslint.config.js không tồn tại hoặc không cấu hình bỏ qua 'mcp-server'. Ghi lại file mặc định."
    echo "$DEFAULT_ESLINT_CONFIG" > "$ESLINT_CONFIG_FILE" || fail "Failed to write eslint.config.js"
    ok "eslint.config.js đã được khôi phục/cập nhật."
  else
    ok "eslint.config.js đã tồn tại và cấu hình đúng."
  fi

  ok "FIX completed (Tailwind v3 installed & configured)."
  say "Next step: Run 'npm run dev' to start the development server"
  warn "VUI LÒNG KIỂM TRA & CẤU HÌNH LẠI CÁC FILE .env (frontend và mcp-server) SAU KHI FIX!"
}

# ---------- 4) RUN ----------
run_app() {
  say "4) RUN: npm run dev"
  npm run dev
}

# ---------- 5) UPDATE AI CONTEXT (AUTO-GENERATED INFO + OPTIONAL LOG) ----------
run_update_ai_context() {
  say "5) CẬP NHẬT AI CONTEXT (docs/ai_application_context.md)"
  need_cmd npm
  
  # First, update auto-generated metadata (timestamp, deps, schema)
  npm run generate:ai-context || fail "Failed to update AI context metadata."

  # Ask if user wants to add a log entry
  if confirm "Thêm log entry cho task này?"; then
    read -r -p "Nhập log message (≤120 ký tự): " log_msg
    if [[ -n "${log_msg:-}" ]]; then
      npm run context:log -- "${log_msg}" || warn "Failed to add log entry."
    else
      warn "Log message trống, bỏ qua."
    fi
  fi

  ok "AI Context đã được cập nhật: docs/ai_application_context.md"
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
5) Cập Nhật AI Context (tự động)
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
      5) run_update_ai_context ;;
      q) exit 0 ;;
      *) warn "Lựa chọn không hợp lệ. Vui lòng thử lại." ;;
    esac
  done
}

main "$@"
