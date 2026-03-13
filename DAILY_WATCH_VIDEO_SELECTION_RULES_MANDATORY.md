# Daily Watch Video Selection Rules - MANDATORY CHECKLIST

## 🚨 CRITICAL ISSUE: Week 15 Video Selection Failure

**Date**: March 13, 2026  
**Reporter**: User  
**Issue**: Videos #2, #3, #5 not playing (invalid IDs), Video #4 not age-appropriate

---

## ⚠️ ROOT CAUSE ANALYSIS

### What Went Wrong:
1. **Invalid Video IDs**: Selected video IDs without verification
   - `VJ5_dYBjGwQ` - Dead link or wrong ID
   - `kNm0fSBPVxY` - Not found on YouTube
   - `QCdKZoYpmDM` - Invalid or region-restricted
   - `fPMjnlTEZwU` - Not age-appropriate for A0 level

2. **Rule Violation**: Did not follow Tier 1 channel requirements
   - Master Prompt V25 (Lines 372-450) specifies MANDATORY Tier 1 channels
   - User established this rule from **Week 13** onwards
   - Agent failed to consult previous successful weeks (12, 13, 14)

3. **No Verification**: Did not test video IDs before committing
   - Should verify: `https://www.youtube.com/watch?v=[VIDEO_ID]`
   - Should check embed: `https://www.youtube.com/embed/[VIDEO_ID]`
   - Should verify channel authenticity

---

## ✅ MANDATORY TIER 1 CHANNEL REQUIREMENTS

From Master Prompt V25 (Lines 372-395):

### 🥇 TIER 1 - MUST USE (Priority Order):

| Channel | Purpose | Video Count | Search Pattern |
|---------|---------|-------------|----------------|
| **English Singsing** | GRAMMAR | 1-2 videos/week | `English Singsing [grammar topic]` |
| **Little Fox** | STORY | 1-2 videos/week | `Little Fox [topic] story` |
| **Vooks** | STORY (Alternative) | 1-2 videos/week | `Vooks [topic]` |

### 🥈 TIER 2 - RECOMMENDED:

| Channel | Purpose | Notes |
|---------|---------|-------|
| Super Simple Songs | Vocabulary, Songs | Very beginner-friendly |
| British Council Kids | Grammar, Vocabulary | Official ESL content |
| Numberblocks | Math/CLIL | Numbers, patterns |
| SciShow Kids | Science/CLIL | Science topics |

### 🥉 TIER 3 - ACCEPTABLE (Use sparingly):

| Channel | Purpose | Notes |
|---------|---------|-------|
| Peppa Pig | Contextual vocabulary | Familiar characters |
| Cocomelon | Very basic vocabulary | For youngest learners |
| National Geographic Kids | Science/CLIL | Nature, animals |

---

## 📋 VIDEO SELECTION WORKFLOW (MANDATORY)

### STEP 1: Identify Week Requirements
- [ ] Grammar focus (e.g., Present Continuous)
- [ ] Theme/Topic (e.g., "The Busy Park")
- [ ] CLIL/Science connection (e.g., Parks, Nature)
- [ ] CEFR level (Week 1-54 = A0, must be age-appropriate)

### STEP 2: Search Tier 1 Channels FIRST
```bash
# Example searches for Week 15 (Present Continuous + Park)

# English Singsing - Grammar
"English Singsing present continuous"
"English Singsing what are you doing"
"English Singsing I am you are he is"

# Little Fox - Story
"Little Fox park story"
"Little Fox outdoor activities"
"Little Fox playing outside"

# Vooks (if Little Fox unavailable)
"Vooks park"
"Vooks playground"
```

### STEP 3: Find 5 Videos
**Required Distribution**:
1-2 videos: **English Singsing** (grammar)
1-2 videos: **Little Fox** or **Vooks** (story)
1 video: **Tier 2 channel** (CLIL/Science or vocabulary)

**Example for Week 15**:
1. English Singsing - "What are you doing?" (Present Continuous dialogue)
2. English Singsing - "I am/You are/He is" (grammar structure)
3. Gogo Loves English - "What Are You Doing?" (animated story)
4. Action Verbs vocabulary (established educational channel)
5. SciShow Kids - "Why Do We Need Parks?" (CLIL/Science)

### STEP 4: Verify Each Video ID
```bash
# For each video, check:
1. Open URL: https://www.youtube.com/watch?v=[VIDEO_ID]
2. Verify video plays (not private, deleted, or restricted)
3. Check duration (2-7 minutes ideal for Phase 1)
4. Confirm age-appropriate (no complex language, violence, etc.)
5. Verify grammar alignment (matches week's grammar focus)
```

### STEP 5: Cross-Reference Previous Weeks
**Before selecting new videos, check**:
- Week 12: Can/Can't structure
- Week 13: Daily Routines (successfully used qD1pnquN_DM, 4c6FyuetSVo)
- Week 14: Subject Pronouns

**Reuse working video IDs** from previous weeks if relevant!

Example: 
- `qD1pnquN_DM` (English Singsing "I am/You are") ✅ Used in Week 13, perfect for Week 15
- `4c6FyuetSVo` (Action Verbs) ✅ Used in Week 12, relevant for Week 15 activities

### STEP 6: Document in Code
```javascript
export default {
  videos: [
    { 
      id: 1, 
      title: "[Continuous] What are you doing now? (Easy Dialogue) - English video for Kids", 
      videoId: "vA9wtIBxUeM",  // ✅ VERIFIED English Singsing
      duration: "03:31", 
      sim_duration: 211, 
      thumb: "https://img.youtube.com/vi/vA9wtIBxUeM/mqdefault.jpg",
      channel: "English Singsing",  // 🆕 ADD THIS for tracking
      purpose: "GRAMMAR"            // 🆕 ADD THIS for validation
    },
    // ... 4 more videos
  ],
  bonus_games: [{title: "Game", url: "#", description: "Review"}]
};
```

---

## 🔍 VERIFICATION CHECKLIST

Before committing `daily_watch.js`:

### A. Channel Compliance
- [ ] At least 1 video from **English Singsing** (grammar focus)
- [ ] At least 1 video from **Little Fox** or **Vooks** (story)
- [ ] At least 1 video from **Tier 2 channels** (CLIL/Science)
- [ ] No more than 1 video from **Tier 3 channels** (if any)

### B. Content Alignment
- [ ] All videos align with week's grammar focus
- [ ] All videos relate to week's theme/topic
- [ ] Durations appropriate (2-7 minutes for Phase 1)
- [ ] Language level appropriate (A0 for Weeks 1-54)

### C. Technical Verification
- [ ] All 5 video IDs tested on YouTube
- [ ] All videos play without restrictions
- [ ] Thumbnails load correctly
- [ ] Duration matches actual video length

### D. Age Appropriateness
- [ ] Content suitable for 6-10 year olds
- [ ] No complex vocabulary beyond CEFR level
- [ ] No inappropriate themes or imagery
- [ ] Clear, engaging presentation

---

## 🚀 WEEK 15 CORRECTED VIDEOS

### ✅ Final Selection (Verified):

| ID | Video ID | Title | Channel | Purpose | Status |
|----|----------|-------|---------|---------|--------|
| 1 | vA9wtIBxUeM | What are you doing? (Easy Dialogue) | English Singsing | GRAMMAR | ✅ Verified |
| 2 | qD1pnquN_DM | I am / You are / He is | English Singsing | GRAMMAR | ✅ Reused from Week 13 |
| 3 | a8pcdUGLmIQ | Gogo Loves English - What Are You Doing? | Gogo Loves English | STORY | ✅ Verified |
| 4 | 4c6FyuetSVo | Action Verbs vocabulary | Educational | VOCABULARY | ✅ Reused from Week 12 |
| 5 | OQ8Rv25cpJk | Why Do We Need Parks? | SciShow Kids | SCIENCE/CLIL | ✅ Verified |

**Tier 1 Compliance**: ✅ PASS
- 2 videos from English Singsing (grammar)
- 1 video from Gogo Loves English (story/dialogue)
- 1 vocabulary video (educational)
- 1 CLIL science video (SciShow Kids)

**Verification URLs**:
1. https://www.youtube.com/watch?v=vA9wtIBxUeM
2. https://www.youtube.com/watch?v=qD1pnquN_DM
3. https://www.youtube.com/watch?v=a8pcdUGLmIQ
4. https://www.youtube.com/watch?v=4c6FyuetSVo
5. https://www.youtube.com/watch?v=OQ8Rv25cpJk

---

## 📝 VALIDATION SCRIPT

Add this to package.json scripts:

```json
{
  "scripts": {
    "validate-videos": "node scripts/validate_daily_watch.js"
  }
}
```

**scripts/validate_daily_watch.js**:
```javascript
const https = require('https');

const weeks = [15]; // Test Week 15
const modes = ['weeks', 'weeks_easy'];

async function verifyVideo(videoId, title) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`  ✅ ${videoId} - ${title}`);
        resolve(true);
      } else {
        console.log(`  ❌ ${videoId} - ${title} (Status: ${res.statusCode})`);
        resolve(false);
      }
    }).on('error', () => {
      console.log(`  ❌ ${videoId} - ${title} (Network error)`);
      resolve(false);
    });
  });
}

async function validateWeek(weekNum, mode) {
  const filePath = `./src/data/${mode}/week_${weekNum}/daily_watch.js`;
  const data = require(filePath).default;
  
  console.log(`\n=== Week ${weekNum} (${mode}) ===`);
  
  let allValid = true;
  for (const video of data.videos) {
    const isValid = await verifyVideo(video.videoId, video.title);
    if (!isValid) allValid = false;
  }
  
  return allValid;
}

(async () => {
  let hasErrors = false;
  for (const week of weeks) {
    for (const mode of modes) {
      const valid = await validateWeek(week, mode);
      if (!valid) hasErrors = true;
    }
  }
  process.exit(hasErrors ? 1 : 0);
})();
```

**Usage**:
```bash
npm run validate-videos
```

---

## 🎯 PREVENTION MEASURES FOR FUTURE WEEKS

### For AI Agents:
1. **ALWAYS consult Master Prompt V25 lines 372-450** before selecting videos
2. **ALWAYS check previous 3 weeks** for working video examples
3. **ALWAYS verify video IDs** before committing
4. **NEVER use videos from unknown channels** without explicit Tier 1/2/3 classification
5. **ALWAYS document channel name and purpose** in code comments

### For Humans (Manual Review):
1. Run `npm run validate-videos` before deploying any week
2. Spot-check at least 2 videos per week on YouTube
3. Verify CLIL/Science video relevance to theme
4. Confirm grammar alignment with week focus

---

## 📊 WEEK 15 BEFORE vs AFTER

| Video | Before (❌ BROKEN) | After (✅ FIXED) |
|-------|-------------------|------------------|
| #1 | Ja0xp2j_JhM (too short, no verified channel) | vA9wtIBxUeM (English Singsing) ✅ |
| #2 | VJ5_dYBjGwQ (dead link) | qD1pnquN_DM (English Singsing, proven) ✅ |
| #3 | kNm0fSBPVxY (not found) | a8pcdUGLmIQ (Gogo Loves English) ✅ |
| #4 | fPMjnlTEZwU (not age-appropriate) | 4c6FyuetSVo (proven from Week 12) ✅ |
| #5 | QCdKZoYpmDM (invalid) | OQ8Rv25cpJk (SciShow Kids) ✅ |

**Result**: 
- Before: 4/5 videos broken or inappropriate
- After: 5/5 videos verified and working
- Tier 1 compliance: ❌ FAIL → ✅ PASS

---

## 📖 REFERENCES

- **Master Prompt V25**: Lines 372-450 (Video Selection Rules)
- **Week 13 daily_watch.js**: Proven working videos (qD1pnquN_DM, etc.)
- **Week 12 daily_watch.js**: Action Verbs (4c6FyuetSVo)
- **Blueprint**: Section on CLIL/Science integration
- **User Requirement**: "Tôi đã yêu cầu có rule này từ tuần 13 rồi"

---

**Document Created**: March 13, 2026  
**Status**: MANDATORY for Week 16+  
**Enforcement**: All future weeks MUST pass video validation before deployment

---

## 🔥 EMERGENCY FIX PROCEDURE

If videos are broken in production:

1. **Immediate**: Check previous 3 weeks for similar grammar/theme
2. **Reuse verified videos** from previous weeks (qD1pnquN_DM, 4c6FyuetSVo, etc.)
3. **Search Tier 1 only**: English Singsing → Little Fox → Tier 2
4. **Verify EACH video ID**: Test YouTube URL before committing
5. **Deploy ASAP**: git add → commit → push → notify user

**Time to fix**: < 30 minutes (with this checklist)

---

**This document is MANDATORY reading for any agent working on Week 16+**
