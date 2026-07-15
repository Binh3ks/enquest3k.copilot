# 🎯 STATION ID MAPPING - UNIVERSAL PROGRESS SYSTEM

## ⚠️ CRITICAL: Station ID Consistency

**All modules MUST use these exact station IDs for Universal Progress System**

---

## 📊 STATION ID STRUCTURE

Format: `{category}_{name}` hoặc `{type}_{category}_{name}` cho modes

---

## 🗺️ COMPLETE STATION ID MAP (19 Stations)

### **1. Daily Watch** 📺
- **Station ID:** `daily_watch`
- **Tab Key (URL):** `daily_watch`
- **Component:** `DailyWatch.jsx`
- **Module Path:** `src/modules/watch/`

### **2-4. AI Tutor (3 Tabs)** 🤖

#### Story Mission
- **Station ID:** `ai_story`
- **Tab Key:** `story_mission` hoặc `ai_tutor` (tab=story)
- **Component:** `StoryMissionTab.jsx`

#### Free Talk
- **Station ID:** `ai_freetalk`
- **Tab Key:** `free_talk` hoặc `ai_tutor` (tab=freetalk)
- **Component:** `FreeTalkTab.jsx`

#### Pronunciation
- **Station ID:** `ai_pronunciation`
- **Tab Key:** `pronunciation` hoặc `ai_tutor` (tab=pronunciation)
- **Component:** `PronunciationTab.jsx`

### **5. Video Challenge** 🎥
- **Station ID:** `video_challenge`
- **Tab Key:** `writing` hoặc `video_challenge`
- **Component:** `VideoChallenge.jsx`
- **Module Path:** `src/modules/video/`

### **6. Ask AI** 💬
- **Station ID:** `ask_ai`
- **Tab Key:** `ask_ai`
- **Component:** `AskAi.jsx`
- **Module Path:** `src/modules/ask_ai/`

### **7. Explore** 🔍
- **Station ID:** `explore`
- **Tab Key:** `explore`
- **Component:** `Explore.jsx`
- **Module Path:** `src/modules/explore/`

### **8-11. Games** 🎮

#### Word Match
- **Station ID:** `game_word_match`
- **Tab Key:** `word_match`
- **Component:** `WordMatch.jsx`
- **Module Path:** `src/modules/match/`

#### Word Power
- **Station ID:** `game_word_power`
- **Tab Key:** `word_power`
- **Component:** `WordPower.jsx`
- **Module Path:** `src/modules/power/`

#### Logic Lab
- **Station ID:** `game_logic`
- **Tab Key:** `logic_lab`
- **Component:** `LogicLab.jsx`
- **Module Path:** `src/modules/logic/`

#### Game Hub
- **Station ID:** `game_hub`
- **Tab Key:** `game_hub`
- **Component:** `GameHub.jsx`
- **Module Path:** `src/modules/games/`

### **12-16. Skills** 📚

#### Vocabulary Mastery
- **Station ID:** `vocab_mastery`
- **Tab Key:** `new_words`
- **Component:** `VocabManager.jsx`
- **Module Path:** `src/modules/vocab/`

#### Grammar Engine
- **Station ID:** `grammar_lab`
- **Tab Key:** `grammar`
- **Component:** `GrammarEngine.jsx`
- **Module Path:** `src/modules/grammar/`

#### Dictation
- **Station ID:** `skill_dictation`
- **Tab Key:** `dictation`
- **Component:** `DictationEngine.jsx`
- **Module Path:** `src/modules/dictation/`

#### Reading Explore
- **Station ID:** `skill_reading`
- **Tab Key:** `read_explore`
- **Component:** `ReadingExplore.jsx`
- **Module Path:** `src/modules/read/`

#### MindMap Speaking
- **Station ID:** `production_mindmap`
- **Tab Key:** `mindmap_speaking`
- **Component:** `MindMapSpeaking.jsx`
- **Module Path:** `src/modules/production/`

### **17. Shadowing** 🎤
- **Station ID:** `skill_shadowing`
- **Tab Key:** `shadowing`
- **Component:** `Shadowing.jsx`
- **Module Path:** `src/modules/shadowing/`

### **18. Review Dashboard** 📝
- **Station ID:** `review_session`
- **Tab Key:** `review`
- **Component:** `ReviewDashboard.jsx`
- **Module Path:** `src/modules/review/`

### **19. Self Regulation** 🎯
- **Station ID:** `self_regulation`
- **Tab Key:** `self_regulation`
- **Component:** `SelfRegulation.jsx`
- **Module Path:** `src/modules/self_regulation/`

---

## 🔄 TAB KEY → STATION ID MAPPING

```javascript
const TAB_TO_STATION_ID = {
  // Watch & Video
  'daily_watch': 'daily_watch',
  'writing': 'video_challenge',
  'video_challenge': 'video_challenge',
  
  // AI & Interactive
  'ask_ai': 'ask_ai',
  'explore': 'explore',
  
  // Games
  'word_match': 'game_word_match',
  'word_power': 'game_word_power',
  'logic_lab': 'game_logic',
  'game_hub': 'game_hub',
  
  // Skills
  'new_words': 'vocab_mastery',
  'grammar': 'grammar_lab',
  'dictation': 'skill_dictation',
  'read_explore': 'skill_reading',
  'mindmap_speaking': 'production_mindmap',
  'shadowing': 'skill_shadowing',
  
  // Meta
  'review': 'review_session',
  'self_regulation': 'self_regulation'
};
```

---

## 🎓 LEARNING MODES

### Easy Mode
- Uses same station IDs as above
- Different content loaded based on `learningMode` prop
- Progress saved separately per mode

### Advanced Mode
- Uses same station IDs as above
- Different content loaded based on `learningMode` prop
- Progress saved separately per mode

**Database Schema:**
```sql
SELECT * FROM user_progress 
WHERE user_id = 1 
  AND week_id = 1 
  AND station_id = 'vocab_mastery';
```

Progress data should include mode:
```javascript
{
  mode: 'easy', // or 'advanced'
  completedWords: [1, 2, 3],
  ...
}
```

---

## ✅ INTEGRATION CHECKLIST

For each module, ensure:

1. **Import hook:**
   ```javascript
   import { useStationProgress } from '../../hooks/useStationProgress';
   ```

2. **Use correct station ID:**
   ```javascript
   const { savedData, saveProgress, markComplete } = useStationProgress(
     parseInt(weekId), 
     'CORRECT_STATION_ID_FROM_TABLE_ABOVE'
   );
   ```

3. **Save progress with mode:**
   ```javascript
   saveProgress({
     mode: learningMode, // easy or advanced
     ...yourData
   }, isCompleted, scorePercent);
   ```

4. **Remove ALL old localStorage logic:**
   - ❌ `loadStationState()`
   - ❌ `saveStationState()`
   - ❌ `localStorage.getItem()`
   - ❌ `localStorage.setItem()`

---

## 🚫 DEPRECATED (DO NOT USE)

These are old localStorage keys that should be REMOVED:

- `engquest_station_*`
- `daily_watch_seconds`
- `daily_watch_progress_*`
- `engquest_newwords_use_*`
- `engquest_patterns_week_*`
- `engquest_videoScript_week_*`
- `engquest_*_progress_*`

---

## 📝 NAMING CONVENTIONS

### Station IDs
- **Format:** `lowercase_underscore`
- **Examples:** `vocab_mastery`, `game_word_match`, `skill_reading`
- **Prefixes:**
  - `ai_` - AI Tutor tabs
  - `game_` - Game stations
  - `skill_` - Skill practice stations
  - `production_` - Production/speaking stations
  - No prefix for unique stations

### Tab Keys (URLs)
- **Format:** `lowercase_underscore`
- **Match station IDs when possible**
- **Example URL:** `/week/1/vocab_mastery` or `/week/1/new_words`

---

## 🔍 DEBUGGING

Check if a module is using old system:

```bash
# Search for old localStorage calls
grep -r "loadStationState\|saveStationState" src/modules/

# Search for direct localStorage access
grep -r "localStorage.getItem\|localStorage.setItem" src/modules/
```

Check station ID in DevTools Console:
```javascript
// Should see station ID in progress calls
// ✅ Correct: saveProgress({...}, false, 50) from 'vocab_mastery'
// ❌ Wrong: localStorage.setItem('engquest_station_1_vocab', ...)
```

---

**Last Updated:** January 11, 2026
**Status:** ✅ ALL 19 MODULES MAPPED
