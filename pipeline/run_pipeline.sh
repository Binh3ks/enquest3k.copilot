#!/usr/bin/env bash
# pipeline/run_pipeline.sh
# ════════════════════════════════════════════════════════════════════════════════
# Master orchestrator for the EngQuest 3000 Lesson Plan Pipeline.
#
# COMMANDS:
#   build    <weeks>   — Workflow 1: build from DOCX (W01-53)
#   generate <weeks>   — Workflow 2: AI-generate new weeks (W54+)
#   enrich   <weeks>   — Workflow 3: AI-enrich with Cambridge content (W01-53)
#   validate <weeks>   — validate existing JSON files
#   rebuild  <weeks>   — rebuild (same as build) with explicit label
#   all                — build W01-53 then validate all
#
# WEEKS SYNTAX:
#   54          single week
#   54 55 56    specific weeks
#   1-24        range
#   --all       all weeks in the command's valid range
#
# OPTIONS:
#   --dry-run     parse/generate but don't write files
#   --no-validate skip validation step
#   --provider    openai|claude (for generate command)
#
# EXAMPLES:
#   ./pipeline/run_pipeline.sh build 1-53        # Workflow 1: full W01-53
#   ./pipeline/run_pipeline.sh build 1-24        # only W01-24
#   ./pipeline/run_pipeline.sh generate 54-60    # Workflow 2: W54-60
#   ./pipeline/run_pipeline.sh enrich 29-36      # Workflow 3: enrich W29-36
#   ./pipeline/run_pipeline.sh enrich 1-53       # Workflow 3: enrich all W01-53
#   ./pipeline/run_pipeline.sh validate --all    # validate all existing weeks
#   ./pipeline/run_pipeline.sh rebuild 29        # re-run single week from DOCX
#   ./pipeline/run_pipeline.sh all               # full W01-53 build + validate

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
cd "$ROOT"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
  echo ""
  echo -e "${BLUE}══════════════════════════════════════════════════════════════${NC}"
  echo -e "${BLUE}  EngQuest 3000 Lesson Plan Pipeline${NC}"
  echo -e "${BLUE}══════════════════════════════════════════════════════════════${NC}"
  echo ""
}

usage() {
  echo "Usage: $0 <command> [weeks] [options]"
  echo ""
  echo "Commands:"
  echo "  build    <weeks>   Build from DOCX (W01-53 only)"
  echo "  generate <weeks>   AI-generate new weeks (W54+ only)"
  echo "  enrich   <weeks>   AI-enrich with Cambridge content (W01-53)"
  echo "  validate <weeks>   Validate existing JSON files"
  echo "  rebuild  <weeks>   Alias for build"
  echo "  all                Build all W01-53 then validate"
  echo ""
  echo "Week syntax:"
  echo "  54           single week"
  echo "  1-24         range"
  echo "  1 2 3        specific"
  echo "  --all        all weeks for the command"
  echo ""
  echo "Options:"
  echo "  --dry-run       parse/generate but don't write files"
  echo "  --no-validate   skip validation step"
  echo "  --provider X    AI provider: claude (default) or openai"
  exit 1
}

# Parse command
COMMAND="${1:-}"
shift || true

if [[ -z "$COMMAND" ]]; then
  usage
fi

# Check Python
if ! command -v python3 &> /dev/null; then
  echo -e "${RED}ERROR: python3 not found${NC}"
  exit 1
fi

print_header

case "$COMMAND" in
  build|rebuild)
    echo -e "${GREEN}▶ Workflow 1: Build from DOCX${NC}"
    echo ""
    WEEKS_ARGS=()
    for arg in "$@"; do
      if [[ "$arg" == "--all" ]]; then
        WEEKS_ARGS+=("1-53")
      else
        WEEKS_ARGS+=("$arg")
      fi
    done
    if [[ ${#WEEKS_ARGS[@]} -eq 0 ]]; then
      echo "  No weeks specified — building all W01-53"
      WEEKS_ARGS=("1-53")
    fi
    exec python3 pipeline/build_from_docx.py "${WEEKS_ARGS[@]}"
    ;;

  generate)
    echo -e "${GREEN}▶ Workflow 2: AI Generation${NC}"
    echo ""
    WEEKS_ARGS=()
    EXTRA_ARGS=()
    PROVIDER_ARG=()
    SKIP_NEXT=false
    for arg in "$@"; do
      if $SKIP_NEXT; then
        PROVIDER_ARG+=("$arg")
        SKIP_NEXT=false
        continue
      fi
      if [[ "$arg" == "--all" ]]; then
        # No default range for generate — user must specify
        echo -e "${RED}ERROR: --all not supported for generate. Please specify week range (e.g., 54-60)${NC}"
        exit 1
      elif [[ "$arg" == "--provider" ]]; then
        EXTRA_ARGS+=("--provider")
        SKIP_NEXT=true
      elif [[ "$arg" == "--dry-run" || "$arg" == "--no-validate" ]]; then
        EXTRA_ARGS+=("$arg")
      else
        WEEKS_ARGS+=("$arg")
      fi
    done
    if [[ ${#WEEKS_ARGS[@]} -eq 0 ]]; then
      echo -e "${RED}ERROR: specify week numbers for generate (e.g., 54 55 or 54-60)${NC}"
      exit 1
    fi
    exec python3 pipeline/generate_ai_week.py "${EXTRA_ARGS[@]}" "${PROVIDER_ARG[@]}" "${WEEKS_ARGS[@]}"
    ;;

  validate)
    echo -e "${GREEN}▶ Validating lesson plans${NC}"
    echo ""
    WEEKS_ARGS=()
    for arg in "$@"; do
      WEEKS_ARGS+=("$arg")
    done
    if [[ ${#WEEKS_ARGS[@]} -eq 0 ]]; then
      WEEKS_ARGS=("--all")
    fi
    exec python3 pipeline/validate_lesson_plan.py "${WEEKS_ARGS[@]}"
    ;;

  enrich)
    echo -e "${GREEN}▶ Workflow 3: Enrich with Cambridge Content${NC}"
    echo ""
    WEEKS_ARGS=()
    EXTRA_ARGS=()
    SKIP_NEXT=false
    for arg in "$@"; do
      if $SKIP_NEXT; then
        EXTRA_ARGS+=("$arg")
        SKIP_NEXT=false
        continue
      fi
      if [[ "$arg" == "--all" ]]; then
        WEEKS_ARGS+=("1-53")
      elif [[ "$arg" == "--provider" || "$arg" == "--model" ]]; then
        EXTRA_ARGS+=("$arg")
        SKIP_NEXT=true
      elif [[ "$arg" == "--dry-run" || "$arg" == "--no-validate" ]]; then
        EXTRA_ARGS+=("$arg")
      else
        WEEKS_ARGS+=("$arg")
      fi
    done
    if [[ ${#WEEKS_ARGS[@]} -eq 0 ]]; then
      echo -e "${RED}ERROR: specify week numbers (e.g., 29-36 or 1-53 or --all)${NC}"
      exit 1
    fi
    exec python3 pipeline/enrich_cambridge.py "${EXTRA_ARGS[@]}" "${WEEKS_ARGS[@]}"
    ;;

  all)
    echo -e "${GREEN}▶ Full pipeline: Build W01-53 + Validate all${NC}"
    echo ""
    echo "Step 1: Building all W01-53 from DOCX..."
    python3 pipeline/build_from_docx.py 1-53 --no-validate
    echo ""
    echo "Step 2: Validating all weeks..."
    python3 pipeline/validate_lesson_plan.py --all
    echo ""
    echo -e "${GREEN}✓ Full pipeline complete${NC}"
    ;;

  *)
    echo -e "${RED}ERROR: unknown command '$COMMAND'${NC}"
    usage
    ;;
esac
