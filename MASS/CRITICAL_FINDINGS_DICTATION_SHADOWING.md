# 🔴 CRITICAL FINDINGS: Dictation & Shadowing Structure

**Date**: January 18, 2026  
**Status**: ✅ VERIFIED AGAINST WEEK 4 CODE

---

## 🎯 KEY DISCOVERY

### Dictation & Shadowing Content Source

**CONFIRMED**: Dictation và shadowing **copy nguyên xi** từ read.js content, tách thành từng câu.

**Verification**:
- Week 4 Advanced read.js: 111 words → Split into **14 sentences**
- Week 4 Easy read.js: 69 words → Split into **10 sentences**

### Actual Week 4 Structure:

```javascript
// read.js (Advanced)
content_en: "My name is Sam. I have a happy jar at home. Every day, I put happy things in my jar. When I am playing with my dog, I feel excited. I put a yellow star in my jar. When I am reading a good book, I feel calm and happy. I put a blue heart in my jar. When I am drawing pictures, I feel creative. I put a green circle in my jar. My mom is very friendly and funny. She makes me laugh every day. I love my happy jar. It helps me remember all the good moments in my life. My jar is now full of happy things!"
// ↓ Split into sentences ↓

// dictation.js (Advanced) - 14 sentences
{ id: 1, text: "My name is Sam.", meaning: "..." }
{ id: 2, text: "I have a happy jar at home.", meaning: "..." }
// ... 14 total

// shadowing.js (Advanced) - 14 sentences
{ id: 1, text: "My name is Sam.", vi: "...", audio_url: "/audio/week4/shadowing_1.mp3" }
{ id: 2, text: "I have a happy jar at home.", vi: "...", audio_url: "/audio/week4/shadowing_2.mp3" }
// ... 14 total
```

```javascript
// read.js (Easy)
content_en: "My name is Mia. I like many things. I like to play with my toys. I like to draw pictures. I like to read books. When I play, I smile. When I draw, I laugh. When I read, I am happy. I love my happy things. They make me feel good every day!"
// ↓ Split into sentences ↓

// dictation.js (Easy) - 10 sentences
{ id: 1, text: "My name is Mia.", meaning: "..." }
{ id: 2, text: "I like many things.", meaning: "..." }
// ... 10 total

// shadowing.js (Easy) - 10 sentences
{ id: 1, text: "My name is Mia.", vi: "...", audio_url: "/audio/week4_easy/shadowing_1.mp3" }
{ id: 2, text: "I like many things.", vi: "...", audio_url: "/audio/week4_easy/shadowing_2.mp3" }
// ... 10 total
```

---

## 📊 SCHEMA DIFFERENCES: Easy vs Advanced

### Key Field Difference

**CRITICAL**: Dictation uses `meaning:` key, Shadowing uses `vi:` key

```javascript
// dictation.js - Uses 'meaning'
{ id: 1, text: "My name is Sam.", meaning: "Tên tôi là Sam." }

// shadowing.js - Uses 'vi'
{ id: 1, text: "My name is Sam.", vi: "Tên tôi là Sam.", audio_url: "..." }
```

### Structure Comparison

| Station | Advanced (week_04) | Easy (week_04_easy) | Difference |
|---------|-------------------|---------------------|------------|
| **read.js** | 111 words | 69 words | -38% words |
| **dictation.js** | 14 sentences | 10 sentences | -29% sentences |
| **shadowing.js** | 14 sentences | 10 sentences | -29% sentences |
| **Audio (dict)** | 14 files | 10 files | -29% |
| **Audio (shad)** | 14 + 1 full = 15 | 10 + 1 full = 11 | -27% |

### Audio File Counts

**Advanced Mode (week4/)**:
```
dictation: 14 files    (dictation_1.mp3 → dictation_14.mp3)
shadowing: 15 files    (shadowing_1.mp3 → shadowing_14.mp3 + shadowing_full.mp3)
Total: 29 audio files
```

**Easy Mode (week4_easy/)**:
```
dictation: 10 files    (dictation_1.mp3 → dictation_10.mp3)
shadowing: 11 files    (shadowing_1.mp3 → shadowing_10.mp3 + shadowing_full.mp3)
Total: 21 audio files
```

---

## 🔍 SENTENCE SPLITTING RULES

Based on Week 4 analysis:

### How read.js Content is Split:

1. **Split by periods** (`.`)
2. **Each sentence = 1 dictation entry**
3. **Each sentence = 1 shadowing entry**
4. **Preserve order exactly**
5. **Translation copied to `meaning` (dictation) or `vi` (shadowing)**

### Examples:

```
Read content: "My name is Sam. I have a happy jar at home. Every day, I put happy things in my jar."

↓ Split into 3 sentences ↓

Dictation:
1. "My name is Sam."
2. "I have a happy jar at home."
3. "Every day, I put happy things in my jar."

Shadowing:
1. "My name is Sam." + audio_url
2. "I have a happy jar at home." + audio_url
3. "Every day, I put happy things in my jar." + audio_url
```

---

## 📝 SCHEMA CORRECTIONS REQUIRED

### 1. Update Prompts with Sentence Count Formula

**Current problem**: Prompts say "14-18 sentences" - this is wrong!

**Correct rule**: 
```
Sentence count = Number of periods in read.js content
Advanced: ~14 sentences (100-120 words)
Easy: ~10 sentences (60-80 words)
```

### 2. Document Key Name Difference

**dictation.js**:
- Uses `meaning:` key for Vietnamese translation
- No audio fields

**shadowing.js**:
- Uses `vi:` key for Vietnamese translation (NOT `meaning`)
- Has `audio_url` for each sentence
- Has `audio_full` at root level

### 3. Audio Count Formula

**Dictation Audio**:
```
Count = Number of sentences in dictation.js
Advanced: 14 files
Easy: 10 files
```

**Shadowing Audio**:
```
Count = Number of sentences + 1 full audio
Advanced: 14 + 1 = 15 files
Easy: 10 + 1 = 11 files
```

---

## 🚨 ERRORS TO FIX IN PROMPTS

### ❌ Error 1: Fixed Sentence Count
**Wrong**: "14-18 sentences in dictation/shadowing"
**Right**: "Split read.js by periods → X sentences (varies by week)"

### ❌ Error 2: Wrong Key Name
**Wrong**: Shadowing uses `meaning` key
**Right**: Shadowing uses `vi` key (already fixed in 09_STATIONS_ADVANCED.txt)

### ❌ Error 3: Missing audio_full
**Wrong**: Shadowing schema doesn't show `audio_full`
**Right**: Root-level `audio_full` field required (already fixed)

### ❌ Error 4: Audio Count Table
**Wrong**: Fixed numbers like "14 dictation files"
**Right**: Document formula based on read.js content length

---

## ✅ PRODUCTION RULES FOR MASS GENERATION

### For AI Content Generators:

1. **Read the read.js content first**
2. **Count sentences by splitting on periods**
3. **Generate dictation.js with that many sentences**
4. **Generate shadowing.js with same sentences + audio paths**
5. **Use `meaning` key in dictation**
6. **Use `vi` key in shadowing**
7. **Add `audio_full` at root of shadowing**
8. **Easy mode: ~10 sentences (60-80 words in read)**
9. **Advanced mode: ~14 sentences (100-120 words in read)**

### For Audio Generators:

```bash
# Count sentences first
SENTENCE_COUNT=$(grep -c "{ id:" src/data/weeks/week_X/dictation.js)

# Generate dictation audio (X files)
for i in $(seq 1 $SENTENCE_COUNT); do
  generate_tts "dictation_$i.mp3"
done

# Generate shadowing audio (X + 1 files)
for i in $(seq 1 $SENTENCE_COUNT); do
  generate_tts "shadowing_$i.mp3"
done
generate_tts "shadowing_full.mp3"  # Full narration
```

---

## 📌 FILES TO UPDATE

1. **MASS/PROMPTS/09_STATIONS_ADVANCED.txt**
   - ✅ Already fixed: `vi` key, `audio_full` field
   - ⏳ TODO: Update sentence count formula

2. **MASS/PROMPTS/10_STATIONS_EASY.txt**
   - ⏳ TODO: Apply same fixes as Advanced
   - ⏳ TODO: Document 10-sentence structure

3. **MASS/PROMPTS/12_ASSET_GENERATION.txt**
   - ✅ Already updated with correct counts
   - ⏳ TODO: Add sentence count formula

4. **MASS/TEMPLATES/**
   - ⏳ TODO: Add comments explaining sentence splitting

---

## 🎯 VERIFICATION CHECKLIST

Before generating Week 5+:

- [ ] Dictation uses `meaning:` key (NOT `vi`)
- [ ] Shadowing uses `vi:` key (NOT `meaning`)
- [ ] Shadowing has `audio_full` at root level
- [ ] Sentence count matches read.js periods
- [ ] Easy mode: ~10 sentences (~70 words)
- [ ] Advanced mode: ~14 sentences (~110 words)
- [ ] Audio counts match sentence counts
- [ ] Paths use correct format: `week4/` not `week_04/`

---

**Last Updated**: January 18, 2026  
**Verified Against**: Week 4 Advanced & Easy code  
**Status**: ✅ READY FOR PROMPT UPDATES
