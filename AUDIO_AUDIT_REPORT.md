# 🎵 Audio URL Audit Report - EngQuest3k

**Date**: December 25, 2025  
**Purpose**: Verify all audio URLs are properly injected and match available MP3 files

---

## Audio Injection System (dataHooks.js)

### Current Mapping:

| Station | Data Field | Audio URL Pattern | Status |
|---------|-----------|------------------|--------|
| **read_explore** | main content | `/audio/weekNN/read_explore_main.mp3` | ✅ Implemented |
| **explore** | main content | `/audio/weekNN/explore_main.mp3` | ✅ Implemented |
| **new_words** | vocab items | `/audio/weekNN/vocab_{word}.mp3` | ✅ Implemented |
| | | `/audio/weekNN/vocab_def_{word}.mp3` | ✅ Implemented |
| | | `/audio/weekNN/vocab_ex_{word}.mp3` | ✅ Implemented |
| | | `/audio/weekNN/vocab_coll_{word}.mp3` | ✅ Implemented (if exists) |
| **word_power** | words | `/audio/weekNN/wordpower_{word}.mp3` | ✅ Implemented |
| | | `/audio/weekNN/power_word_{word}.mp3` | ✅ Implemented |
| | | `/audio/weekNN/power_def_{word}.mp3` | ✅ Implemented |
| | | `/audio/weekNN/power_ex_{word}.mp3` | ✅ Implemented |
| | | `/audio/weekNN/power_coll_{word}.mp3` | ✅ Implemented (if exists) |
| **dictation** | sentences | `/audio/weekNN/dictation_{1-5}.mp3` | ✅ Implemented |
| **shadowing** | script | `/audio/weekNN/shadowing_{1-5}.mp3` | ✅ Implemented |
| | | `/audio/weekNN/shadowing_full.mp3` | ✅ Implemented |
| **logic_lab** | puzzles | `/audio/weekNN/logic_{id}.mp3` | ✅ Implemented |
| **mindmap_speaking** | center stems | `/audio/weekNN/mindmap_stem_{1-6}.mp3` | ✅ **NEWLY ADDED** |
| | | branch labels | `/audio/weekNN/mindmap_branch_{1-6}.mp3` | ✅ **NEWLY ADDED** |

---

## Week 20 Audio Files (Current Status)

### Existing Files:
```
week20/
├── dictation_1.mp3 through dictation_5.mp3
├── explore_main.mp3
├── logic_1.mp3 through logic_5.mp3
├── read_explore_main.mp3
├── shadowing_1.mp3 through shadowing_5.mp3
├── shadowing_full.mp3
├── vocab_ancient.mp3, vocab_archaeologist.mp3, ... (8 words)
├── vocab_ex_*.mp3 (example sentences)
├── wordpower_*.mp3 (3 words with variants)
└── (52 files total)
```

### Missing Files for Mindmap:
**⚠️ ACTION REQUIRED**: Generate audio files:
- `mindmap_stem_1.mp3` through `mindmap_stem_6.mp3` (center stems)
- `mindmap_branch_1.mp3` through `mindmap_branch_6.mp3` (branch topics)

**Total needed**: 12 MP3 files per week with mindmap station

---

## How to Generate Missing Audio

### Option 1: Automatic (Recommended)
```bash
cd Engquest3k
node tools/generate_audio.js 20 20 YOUR_GOOGLE_API_KEY
```

This will:
1. Read week_20/mindmap.js
2. Extract all center stems and branch labels
3. Generate TTS audio for each
4. Save to `/public/audio/week20/mindmap_stem_*.mp3` and `/public/audio/week20/mindmap_branch_*.mp3`

### Option 2: Manual
Create MP3 files with these texts:
```
mindmap_stem_1.mp3: "In the old castle, there was ___."
mindmap_stem_2.mp3: "There were many ___."
mindmap_stem_3.mp3: "Long ago, a king could ___ here."
mindmap_stem_4.mp3: "The castle was ___."
mindmap_stem_5.mp3: "It was interesting because ___."
mindmap_stem_6.mp3: "Next time, I want to ___."

mindmap_branch_1.mp3: "a very tall tower"
mindmap_branch_2.mp3: "a deep, dark dungeon"
... (12 branch items total)
```

---

## Data Structure Requirements

### MindMap Data Format (from week data file)
```javascript
mindmap_speaking: {
  centerStems: [
    "Sentence with ___",
    "Another ___",
    // ... 6 total
  ],
  branchLabels: {
    "Sentence with ___": [
      "option 1",
      "option 2",
      // ... 6 options per stem
    ],
    // ... for each stem
  }
}
```

### After Audio Injection (by dataHooks.js)
```javascript
mindmap_speaking: {
  centerStems: [
    { stem: "Sentence with ___", audio_url: "/audio/week20/mindmap_stem_1.mp3" },
    // ...
  ],
  branchLabels: {
    "Sentence with ___": [
      { branch: "option 1", audio_url: "/audio/week20/mindmap_branch_1.mp3" },
      // ...
    ],
    // ...
  }
}
```

---

## Verification Checklist

- [ ] Week 20 mindmap audio files exist (12 files)
- [ ] All other station audio files present
- [ ] No 404 errors in browser console for audio URLs
- [ ] MindMap component can play audio for stems
- [ ] MindMap component can play audio for branch options
- [ ] Easy mode audio files created (`week20_easy/`)

---

## Code Changes Made

### dataHooks.js (Lines 74-89)
Added mindmap audio injection logic:
```javascript
// 8. MindMap Speaking - Inject audio for center stems
if (weekData.stations?.mindmap_speaking?.centerStems) {
    weekData.stations.mindmap_speaking.centerStems = 
      weekData.stations.mindmap_speaking.centerStems.map((stem, idx) => ({
        stem: stem,
        audio_url: mkUrl(`mindmap_stem_${idx + 1}.mp3`)
      }));
}

// 9. MindMap Speaking - Inject audio for branch labels
if (weekData.stations?.mindmap_speaking?.branchLabels) {
    const newBranchLabels = {};
    for (const [stemKey, branches] of Object.entries(...)) {
        newBranchLabels[stemKey] = branches.map((branch, idx) => ({
            branch: branch,
            audio_url: mkUrl(`mindmap_branch_${idx + 1}.mp3`)
        }));
    }
    weekData.stations.mindmap_speaking.branchLabels = newBranchLabels;
}
```

---

## Next Steps

1. **Generate Audio**: Use `generate_audio.js` tool for Week 20 mindmap content
2. **Test**: Verify MindMapSpeaking component displays audio buttons correctly
3. **Easy Mode**: Create `week20_easy/` with simplified mindmap audio
4. **Other Weeks**: Repeat for weeks 18, 19, 21 (if they have mindmap stations)

---

## Support

For audio generation issues, check:
- Google Cloud TTS API quota
- Network connectivity
- API key validity
- Output directory permissions (`public/audio/weekNN/`)
