#!/bin/bash
# Shadowing pipeline fix — commit + push
# Created: 2026-08-02

set -e

cd /Users/binhnguyen/projects/Engquest3k

echo "📋 Staging files..."
git add -A

echo "📝 Committing..."
git commit -m "fix(shadowing): remove Deepgram alignment, fix broken transcripts, update pipeline

Pipeline changes:
- Remove Deepgram alignment (Step 4) — YouTube timestamps are source of truth
- Remove fix_sentence_formatting (Step 5) — conflicts with FROZEN rules
- Add CLAUDE.md Rule #15: NEVER use Deepgram on transcript
- Update SHADOWING_PIPELINE_FROZEN.md with simplified 3-step pipeline

Transcript fixes:
- W10 (EfD2k9beP-4): Replace broken timestamps with cleaned/ data
- W31 (-0zVS6aDPXY): Fix broken timestamps, merge fragments
- W21 (mngiqrT44Pk): Re-split auto-caption fragments per FROZEN rules
- W02 (nddRGDEKxA0): Merge over-split compound sentences

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "🚀 Pushing..."
git push

echo "✅ Done!"
