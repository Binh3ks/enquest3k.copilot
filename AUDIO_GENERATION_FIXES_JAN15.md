# Audio Generation Fixes & Updates (January 15, 2026)

## Summary of Changes

### 1. **Prompt Updates (ENGQUEST MASTER PROMPT V26-FINAL.txt)**

#### Added New Section: Audio Naming Convention & Text Cleaning
- **Critical Rules for TTS**:
  - Remove `**bold**` markers before TTS (prevents reading asterisks)
  - Remove `___` blanks before TTS (prevents reading "underscore" 3x)
  - Correct file naming conventions for all stations
  - Mindmap data structure conversion (strings → objects with audio property)

#### Updated Workflow Steps
- **Step [5.5] Auto-Fill Audio URLs** - New step between audio generation and image generation
  - Script: `update_mindmap_audio_urls.js <week_number>`
  - Prevents browser TTS fallback by auto-filling mindmap audio URLs
  - Converts mindmap data from strings to objects with `.audio` property

#### Updated Supporting Scripts Section
- Added description for `update_mindmap_audio_urls.js`
- Clarified text cleaning features in `generate_audio_final.py`

---

### 2. **Script Updates**

#### A. `tools/generate_audio_final.py` (Updated)
- **Added comments**: Explain removal of `**` and `___` before TTS
- **Added header**: Clarify script purpose and next steps
- **extract_read_explore()**: Comments explain filename mapping (read_explore_main.mp3, explore_main.mp3)
- **extract_mindmap()**: Comments explain blank removal ("This is my ___." → "This is my.")

#### B. `tools/mass_production_final.sh` (Updated)
- **Step [5.5] NEW**: Auto-fill mindmap audio URLs after audio generation
- **Run**: `node tools/update_mindmap_audio_urls.js $WEEK`
- **Error handling**: Stop on failure with clear error message
- **Updated flow comments**: Reflect new 10-step process (was 9)

#### C. `tools/update_mindmap_audio_urls.js` (Enhanced)
- **Updated header**: Clear documentation of purpose and transformation
- **Example before/after**: Show exact data structure conversion
- **Usage**: Clear instructions on when to run (after audio generation)

---

### 3. **Error Prevention & Quality Assurance**

#### Common Errors Now Documented & Prevented:
1. ✅ **Bold markers in audio**: `**name**` → now stripped before TTS
2. ✅ **Blank markers in mindmap**: `___` → now stripped before TTS
3. ✅ **Wrong filenames**: `read_main.mp3` → now correctly `read_explore_main.mp3`
4. ✅ **Missing audio URLs**: mindmap audio URLs → now auto-filled
5. ✅ **Browser TTS fallback**: MindMap will use server audio, not fallback to browser

#### Integration into Workflow:
- **Prompt**: Clear rules and naming conventions
- **Scripts**: Automatic text cleaning and error handling
- **Mass Production**: Sequential steps with validation

---

### 4. **File Naming Convention (Golden Standard)**

| Station | Format | Example | Folder |
|---------|--------|---------|--------|
| Read | `read_explore_main.mp3` | `/audio/week2/read_explore_main.mp3` | `week2` |
| Explore | `explore_main.mp3` | `/audio/week2/explore_main.mp3` | `week2` |
| Mindmap Stems | `mindmap_stem_#.mp3` | `/audio/week2/mindmap_stem_1.mp3` | `week2` |
| Mindmap Branches | `mindmap_branch_#.mp3` | `/audio/week2/mindmap_branch_1.mp3` | `week2` |
| Vocab Word | `vocab_word.mp3` | `/audio/week2/vocab_mother.mp3` | `week2` |
| Vocab Definition | `vocab_def_word.mp3` | `/audio/week2/vocab_def_mother.mp3` | `week2` |
| Vocab Example | `vocab_ex_word.mp3` | `/audio/week2/vocab_ex_mother.mp3` | `week2` |
| Vocab Collocation | `vocab_coll_word.mp3` | `/audio/week2/vocab_coll_mother.mp3` | `week2` |

---

### 5. **New Workflow (Updated Steps)**

```bash
[0] 💾 Backup
[1] ✍️  Manual Content Generation (Claude creates 29 files)
[2] 🔍 Validate Quality
[3] 🔄 Sync Data (auto-fill audio_url, image_url)
[4] 💾 Register Database
[5] 🔊 Generate Audio (TTS with text cleaning)
[5.5] 🔗 Auto-Fill Mindmap Audio URLs ⭐ NEW
[6] 🖼️  Generate Images (AI)
[7] 📹 Fetch Videos (YouTube)
[8] ✅ Final Validation
[9] 📊 Report & Cleanup
```

---

### 6. **Running the Full Workflow**

#### Using Mass Production Script (Recommended):
```bash
bash tools/mass_production_final.sh 2
```
This will automatically run steps 0-9 in sequence, including the new step 5.5.

#### Manual Steps:
```bash
# Step 5: Generate audio
python3 tools/generate_audio_final.py 2

# Step 5.5: Auto-fill mindmap audio URLs (NEW)
node tools/update_mindmap_audio_urls.js 2

# Continue with remaining steps...
```

---

### 7. **Validation Checklist**

After running the workflow, verify:
- ✅ Audio files generated: ~130 Advanced, ~126 Easy
- ✅ File naming: `read_explore_main.mp3`, `explore_main.mp3`
- ✅ Mindmap files: `mindmap_stem_1.mp3` through `mindmap_stem_6.mp3`
- ✅ Mindmap branches: `mindmap_branch_1.mp3` through `mindmap_branch_36.mp3`
- ✅ Mindmap data: Contains `.audio` property in centerStems and branchLabels
- ✅ No bold markers in audio: Verify by playing a vocab audio file
- ✅ No "underscore" reading in mindmap: Verify by playing mindmap_stem audio

---

## Key Improvements

| Issue | Before | After |
|-------|--------|-------|
| Bold markers in audio | TTS reads `**` | Stripped before TTS |
| Blank markers in mindmap | TTS reads "underscore" 3x | Stripped before TTS |
| Read filename | Sometimes wrong | Always `read_explore_main.mp3` |
| Explore filename | Sometimes wrong | Always `explore_main.mp3` |
| Mindmap audio URLs | Missing (browser fallback) | Auto-filled after generation |
| Browser TTS fallback | Yes (low quality) | No (uses server audio) |

---

## Testing Notes

### For Week 2:
1. Run: `python3 tools/generate_audio_final.py 2`
   - Should generate 136 Advanced + 120 Easy files
   
2. Run: `node tools/update_mindmap_audio_urls.js 2`
   - Should update mindmap.js with `.audio` properties
   
3. Verify in browser:
   - MindMap stems should play audio (no "underscore" reading)
   - MindMap branches should play audio
   - Read & Explore should NOT have `**` in audio

---

**Status**: ✅ Ready for production use
**Last Updated**: January 15, 2026
**Tested With**: Week 2 (Advanced & Easy modes)
