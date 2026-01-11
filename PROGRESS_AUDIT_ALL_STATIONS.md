# Progress Saving Audit - All Stations

## Summary Status

| Station | File | Progress Tracking | Initial Report | Status |
|---------|------|------------------|----------------|--------|
| 1. Reading (read_explore) | ReadingExplore.jsx | ✅ Reports 100% on completion | ❌ No initial report | ⚠️ NEEDS FIX |
| 2. New Words (new_words) | VocabManager.jsx | ✅ Tracks by completed cards | ✅ Reports on mount | ✅ FIXED |
| 3. Word Match (word_match) | WordMatch.jsx | ✅ Reports 100% when done | ❌ No initial report | ⚠️ NEEDS FIX |
| 4. Grammar (grammar) | GrammarEngine.jsx | ✅ Tracks by completed Q | ✅ Reports on mount | ✅ WORKING |
| 5. MindMap (mindmap) | MindMapSpeaking.jsx | ✅ Cumulative tracking | ❌ No initial report | ⚠️ NEEDS FIX |
| 6. Ask-AI (ask_ai) | AskAi.jsx | ✅ Set-based tracking | ✅ Reports on mount | ✅ FIXED |
| 7. Dictation (dictation) | DictationEngine.jsx | ✅ Tracks sentences | ❌ No initial report | ⚠️ NEEDS FIX |
| 8. Shadowing (shadowing) | Shadowing.jsx | ✅ Reports 100% on record | ❌ No initial report | ⚠️ NEEDS FIX |
| 9. Video (video) | VideoChallenge.jsx | ✅ Reports 100% on record | ❌ No initial report | ⚠️ NEEDS FIX |
| 10. Explore (explore) | Explore.jsx | ✅ Tracks by answers | ❌ No initial report | ⚠️ NEEDS FIX |
| 11. Logic Lab (logic) | LogicLab.jsx | ✅ Tracks by puzzles | ❌ No initial report | ⚠️ NEEDS FIX |
| 12. Word Power (power) | WordPower.jsx | ✅ Tracks by completed | ❌ No initial report | ⚠️ NEEDS FIX |
| 13. Daily Watch (watch) | DailyWatch.jsx | ✅ Tracks by videos | ❌ No initial report | ⚠️ NEEDS FIX |

## Issues Found

### Critical Issues

**All stations except Grammar, VocabManager, and AskAi are missing initial progress reporting on component mount.**

When a user switches stations or refreshes the page:
- The component remounts
- State is reset to initial values (empty arrays/sets)
- Progress is NOT reported until the user completes a new item
- Backend shows 0% even if user had previous progress

### Secondary Issue

**MindMapSpeaking**: While tracking is cumulative, it doesn't report initial progress when component mounts.

## Required Fixes

All stations need to add a useEffect that reports initial progress on mount, similar to:

```javascript
useEffect(() => {
  if (onReportProgress && data?.items) {
    const percent = Math.round((completedItems.length / data.items.length) * 100);
    onReportProgress(percent);
  }
}, []); // Only on mount
```

This ensures the backend is notified of the current state when the station loads.

## Next Steps

1. Add initial progress reporting useEffect to all stations
2. Ensure completedItems state is properly initialized
3. Test each station individually
4. Verify progress persists across station switches
