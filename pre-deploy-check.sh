#!/usr/bin/env bash
# pre-deploy-check.sh
# Validates dist/ build output before deploying to Cloudflare Pages.
# Prevents MIME type errors caused by index.html referencing non-existent JS/CSS hashes.
#
# Usage:  bash pre-deploy-check.sh
# CI:     Add as a step BEFORE wrangler pages deploy

set -euo pipefail

DIST="dist"
OK=0
FAIL=0

check() {
  if [ "$1" = "ok" ]; then
    echo "  ✅ $2"
    OK=$((OK+1))
  else
    echo "  ❌ $2"
    FAIL=$((FAIL+1))
  fi
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Pre-deploy check — EngQuest build"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. dist/ exists
[ -d "$DIST" ] && check ok "dist/ directory exists" || { echo "❌ dist/ not found — run npm run build first"; exit 1; }

# 2. Required root files
for f in index.html _redirects _headers 404.html sw.js; do
  [ -f "$DIST/$f" ] && check ok "$f present" || check fail "$f MISSING"
done

# 3. All JS/CSS referenced in index.html must exist in dist/
echo ""
echo "  Checking assets referenced in index.html..."
ASSET_ERRORS=0
while IFS= read -r asset; do
  path="$DIST${asset}"
  if [ -f "$path" ]; then
    check ok "$(basename "$path")"
  else
    check fail "$(basename "$path") — FILE NOT FOUND (MIME error will occur!)"
    ASSET_ERRORS=$((ASSET_ERRORS+1))
  fi
done < <(grep -oE '"/assets/[^"]+\.(js|css)"' "$DIST/index.html" | tr -d '"')

# 4. SPA fallback must exist for React Router
grep -q '/index.html 200' "$DIST/_redirects" && check ok "_redirects has SPA fallback" || check fail "_redirects missing SPA fallback"

# 5. Assets rule must come BEFORE SPA fallback (prevents MIME error)
assets_line=$(grep -n '/assets/\*' "$DIST/_redirects" | head -1 | cut -d: -f1 || echo "0")
spa_line=$(grep -n 'index.html 200' "$DIST/_redirects" | head -1 | cut -d: -f1 || echo "0")
if [ "$assets_line" -gt 0 ] && [ "$assets_line" -lt "$spa_line" ]; then
  check ok "/assets/* rule is BEFORE /* SPA fallback"
else
  check fail "/assets/* rule MUST come before /* in _redirects (MIME bug!)"
fi

# 6. index.html has no-cache headers
grep -q 'no-cache\|no-store' "$DIST/_headers" && check ok "_headers has no-cache for index.html" || check fail "_headers missing no-cache rule"

# 7. 404.html has auto-reload script
grep -q 'reload' "$DIST/404.html" && check ok "404.html has auto-reload" || check fail "404.html missing auto-reload script"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Results: ✅ $OK passed  ❌ $FAIL failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAIL -gt 0 ]; then
  echo ""
  echo "  ⛔ Deploy BLOCKED — fix the issues above before deploying"
  echo ""
  exit 1
fi

echo ""
echo "  🚀 All checks passed — safe to deploy"
echo ""
