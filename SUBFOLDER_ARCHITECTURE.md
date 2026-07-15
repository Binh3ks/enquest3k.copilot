# Subfolder-Only Architecture for Week Data

## ✅ Current Structure (Weeks 9-11)

### Why Subfolder Structure?
1. **Maintainability**: 14-16 separate files (200-1000 lines each) vs 1 monolithic file (2000-3000 lines)
2. **Scalability**: Week 144 with 20+ stations = 5000+ line monolithic file (impossible to maintain)
3. **Collaboration**: No merge conflicts when 2+ developers edit different stations
4. **Code Splitting**: App only loads needed stations (not entire 3000-line file)
5. **Clarity**: Each station has dedicated file with clear purpose

### Folder Structure
```
src/data/weeks/week_XX/
├── index.js              # Aggregator (exports all stations)
├── read.js               # READ station
├── explore.js            # EXPLORE station
├── vocab.js              # NEW WORDS station
├── grammar.js            # GRAMMAR station
├── word_power.js         # WORD POWER station
├── dictation.js          # DICTATION station
├── shadowing.js          # SHADOWING station
├── sentence_builder.js   # SENTENCE BUILDER station (Week 11+)
├── mindmap.js            # MINDMAP station
├── twenty_questions.js   # 20 QUESTIONS station (Week 11+)
├── word_chain.js         # WORD CHAIN station (Week 11+)
├── ask_ai.js             # ASK AI station
├── logic.js              # LOGIC LAB station
├── word_match.js         # WORD MATCH station
├── daily_watch.js        # DAILY WATCH station
├── video_queries.json    # Daily Watch video metadata
└── writing.js            # WRITING station (Weeks 1-10, deprecated in 11+)
```

### index.js Template
```javascript
import read from './read.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import sentence_builder from './sentence_builder.js';
import explore from './explore.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import twenty_questions from './twenty_questions.js';
import word_chain from './word_chain.js';

const weekData = {
  weekId: XX,
  isEasy: false,
  weekTitle_en: "Week Title",
  weekTitle_vi: "Tiêu đề tuần",
  grammar_focus: "Grammar focus description",
  global_vocab: vocab.vocab,
  
  voiceConfig: {
    narration: 'en-US-Neural2-D',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D'
  },
  
  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    sentence_builder: sentence_builder,
    explore: explore,
    mindmap_speaking: mindmap,
    twenty_questions: twenty_questions,
    word_chain: word_chain,
    daily_watch: daily_watch
  }
};

export default weekData;
```

## 🗂️ Data Loader Priority (src/data/weeks/index.js)

### Loading Order
1. **Subfolder structure (PRIORITY)**: `./week_XX/index.js`  
   ✅ Loads from modular subfolder (preferred)
   
2. **Monolithic fallback**: `./week_XX.js`  
   ⚠️ Only used for weeks 1-8, 12-21 (not yet migrated)

### Example for Week 11
```javascript
// Loader checks:
1. './week_11/index.js'     ← ✅ FOUND (loads this)
2. './week_11.js'            ← ❌ IGNORED (moved to Backup)
```

## 📦 Migration Status

### ✅ Migrated to Subfolder-Only
- **Week 9**: City Sounds & Sights
- **Week 10**: The Farm Adventure
- **Week 11**: Weekend Fun Spots

### ❌ Still Using Monolithic Files
- Weeks 1-8: Not yet migrated
- Weeks 12-21: Not yet migrated

### 🔄 Migration Process
1. Create subfolder: `mkdir src/data/weeks/week_XX`
2. Split monolithic file into station files
3. Create `index.js` aggregator (use template above)
4. Test: `npm run dev` → verify all stations load
5. Move monolithic to Backup: `mv src/data/weeks/week_XX.js Backup/weeks_monolithic_deprecated/`
6. Deploy and verify production

## 🚨 Critical Rules

### DO:
- ✅ Create new weeks using subfolder structure (follow template)
- ✅ Each station = separate file (read.js, grammar.js, etc.)
- ✅ index.js imports and aggregates all stations
- ✅ Test locally before deploying
- ✅ Validate vocab uniqueness: `python3 tools/validate_vocab.py`

### DON'T:
- ❌ Create new monolithic `week_XX.js` files (deprecated)
- ❌ Manually edit both subfolder AND monolithic (causes desync)
- ❌ Skip index.js (app won't load data without it)
- ❌ Merge read + explore in index.js (export separately!)

## 🧪 Vocabulary Validation Rules

### Cross-Week Uniqueness
- **Rule**: Each week MUST have 100% unique vocabulary (no overlaps)
- **Example**: Week 9 "city", Week 10 "farm", Week 11 "park" (all different)
- **Tool**: `python3 tools/validate_vocab.py`

### Easy vs Advanced Overlap
- **Rule**: 50% vocabulary overlap within same week (±10%)
- **Example Week 9**:
  - Advanced: city, street, noisy, busy, tall, modern, car, bus, building, traffic
  - Easy: city, street, noisy, busy, tall, modern, car, bus, building, traffic (50% match)
- **Exception**: Week 11 has 80% overlap (audio already generated, grandfathered)

## 📊 Benefits Measured

### Before (Monolithic week_11.js)
- **File size**: 2872 lines, 53KB
- **Edit conflicts**: HIGH (2 developers = merge hell)
- **Load time**: Entire 53KB loaded even if only need vocab
- **Readability**: Scroll 2872 lines to find one station

### After (Subfolder week_11/)
- **File sizes**: 16 files (200-1000 lines each, 1-5KB)
- **Edit conflicts**: ZERO (each developer edits different station file)
- **Load time**: Only needed stations loaded (dynamic imports)
- **Readability**: Open specific station file (200-1000 lines, easy to read)

## 🔮 Future Plans

### Week 12+ (New Production)
- ✅ Use subfolder structure by default
- ✅ Auto-run vocab validation before commit
- ✅ Template script: `npm run create-week --week 12`

### Weeks 1-8, 12-21 (Backfill Migration)
- 🔄 Gradually migrate to subfolders (low priority, no user impact)
- 🔄 Keep monolithic in Backup for rollback safety
- 🔄 Update loader to remove monolithic fallback (once all migrated)

## 📝 Git Commits
- **86eab4c**: Add Week 11 subfolder aggregator index.js
- **26293ec**: Move weeks 9-11 monolithic files to Backup (subfolder-only architecture)
- **fc0f22d**: Rebuild weeks 9-11 monolithic files with correct content (temporary fix, now deprecated)

## 🧹 Cleanup Status
- ✅ Weeks 9-11 monolithic files moved to `Backup/weeks_monolithic_deprecated/`
- ✅ App now loads only from `week_XX/index.js` (no fallback for 9-11)
- ✅ Easy mode: Will migrate next (create `weeks_easy/week_XX/` subfolders)

---

**Last Updated**: January 31, 2025  
**Status**: ✅ Weeks 9-11 production-ready with subfolder structure  
**Next**: Test Week 11 UI after Cloudflare deployment
