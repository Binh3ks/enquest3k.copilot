#!/bin/bash
# Commit ALL pending shadowing fixes
set -e
cd /Users/binhnguyen/projects/Engquest3k

echo "📋 Staging..."
git add -A

echo "📝 Committing..."
git commit -m "fix(shadowing): unify videoId + remove Deepgram + fix broken transcripts

Video unification (12 weeks):
- Each week now uses 1 shared video for both ADV and Easy
- W04,W06,W08,W09,W12,W18,W19,W21,W24,W27,W31,W36 updated

Pipeline simplification:
- Remove Deepgram alignment (Step 4) — YouTube timestamps = source of truth
- Remove fix_sentence_formatting (Step 5) — conflicts with FROZEN rules
- Add CLAUDE.md Rule #15: NEVER use Deepgram on transcript
- Update SHADOWING_PIPELINE_FROZEN.md

Transcript fixes:
- W10 (EfD2k9beP-4): Replace broken timestamps with cleaned/ data
- W31 (-0zVS6aDPXY): Fix broken timestamps, merge fragments
- W21 (mngiqrT44Pk): Re-split auto-caption fragments per FROZEN rules
- W02 (nddRGDEKxA0): Merge over-split compound sentences

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "🚀 Pushing..."
git push

echo "✅ Done!"
