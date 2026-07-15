# EXECUTIVE SUMMARY - WEEK 3 PRODUCTION PLAN
## Tóm tắt Quy trình & Danh sách File (Dành cho Duyệt)

**Ngày**: 16/01/2026  
**Phiên bản**: 1.0  
**Trạng thái**: 📋 CHỜ DUYỆT  

---

## 🎯 MỤC TIÊU WEEK 3

| Hạng mục | Chi tiết |
|----------|----------|
| **Tên Week** | "The Mirror Game" (Trò chơi Soi Gương) |
| **Chủ đề** | Describing Physical Traits (Miêu tả đặc điểm ngoại hình) |
| **Từ vựng** | tall, short, hair, eyes, long, curly, straight, glasses (+ smile, face) |
| **Grammar** | "is" vs "has" (She is tall vs She has long hair) |
| **Chuẩn độ** | CEFR A0 (Beginner) |
| **Giai đoạn** | Phase 1, Weeks 1-54 (Nền tảng) |
| **Tham khảo** | Week 1 & Week 2 (Golden Standard) |

---

## 📊 TỔNG QUÁT FILE CẦN TẠO

### Số lượng File (29 tổng cộng)

```
ADVANCED MODE (14 files)    ────┐
EASY MODE (14 files)        ────┤─ Content Files (28)
AI TUTOR (1 file)           ────┘
                                │
                                └─ Vocabulary, Grammar, Audio
                                   Image, Video generation
```

| Loại | Số lượng | Chi tiết |
|------|----------|----------|
| **Advanced Mode** | 14 | vocab, read, explore, word_power, grammar, logic, ask_ai, writing, dictation, shadowing, word_match, mindmap, daily_watch, video_queries.json |
| **Easy Mode** | 14 | Same structure, simpler content |
| **Manual Aggregators** | 2 | index.js (Advanced) + index.js (Easy) |
| **AI Tutor** | 1 | week_03_real.js (V28 format) |
| **Database Update** | 1 | syllabus_database.js (UPDATE for Week 3) |
| **TOTAL** | **32** | Ready for asset generation |

### Expected Output (After full production)

| Category | Count | Notes |
|----------|-------|-------|
| **Content Files** | 28 .js + 2 .json | Manual creation |
| **Index Files** | 2 .js | Manual creation (aggregators) |
| **AI Tutor** | 1 .js | Manual creation (V28 format) |
| **Database Entry** | 1 update | syllabus_database.js modification |
| **Audio Files** | ~130 MP3 | TTS generation |
| **Image Files** | ~60 JPG | AI generation |
| **Video Data** | 5 entries | YouTube fetch |
| **GRAND TOTAL** | ~225 files | Full week package |

---

## ✅ QUY TRÌNH (9 BƯỚC)

### [0] Backup
```bash
Auto-backup existing weeks
```

### [1] CONTENT GENERATION (MANUAL - 2 HOURS)
```
HUMAN (Claude) creates:
├─ 14 Advanced Mode files
├─ 14 Easy Mode files
└─ 1 AI Tutor file (week_03_real.js)

Reference:
├─ Week 1 (Golden Standard)
├─ Master Prompt V28
├─ Syllabus Week 3 specs
└─ Blueprint UI requirements
```

⚠️ **CRITICAL FILES**:
- `vocab.js` - CREATE FIRST (blocks others)
- `ask_ai.js` - V28 format, A0 compliance
- `week_03_real.js` - V28 JSON: ack/recast/question

### [2] VALIDATE QUALITY (5 MIN)
```bash
node tools/validate_week.js 3
```

**Checks 8 validation rules**:
- ✅ File count (14 .js + 1 .json per mode)
- ✅ Syntax (valid JavaScript)
- ✅ Schema (all required fields)
- ✅ CEFR A0 (no past tense, etc.)
- ✅ ask_ai.js (≤10 words, A0 patterns)
- ✅ grammar.js (20 exercises)
- ✅ word_power.js (3 collocations)
- ✅ explore.js (90% unique words)

### [3] SYNC DATA (1 MIN)
```bash
python tools/sync_week_data.py 3
```

**Auto-fills**:
- Dictation from read.js
- Shadowing from read.js
- Audio URLs
- Image URLs

### [4] REGISTER DATABASE (INSTANT)
```bash
node tools/update_db_smart.js 3
```

**Adds Week 3 to**:
- `src/data/syllabus_database.js`

### [5] GENERATE AUDIO (3-5 MIN)
```bash
node tools/batch_manager.js 3 3
```

**Output**:
- ~65 files in `public/audio/week3/` (Advanced)
- ~70 files in `public/audio/week3_easy/` (Easy)

### [6] GENERATE IMAGES (5-10 MIN)
```bash
node tools/generate_images_nano_banana.js 3 both
```

**Output**:
- ~30 files in `public/images/week3/` (Advanced)
- ~30 files in `public/images/week3_easy/` (Easy)

### [7] FETCH VIDEOS (30 SEC)
```bash
node tools/update_videos.js 3
```

**Output**:
- Real YouTube IDs in `daily_watch.js`

### [8] FINAL VALIDATION (1 MIN)
```bash
# Verify file counts vs Week 1 baseline
ls src/data/weeks/week_03/*.js | wc -l     # Should be 14
ls public/audio/week3/*.mp3 | wc -l        # Should be ~65
ls public/images/week3/*.jpg | wc -l       # Should be ~30
```

### [9] REPORT & CLEANUP
```
Print comprehensive metrics
Ask to delete backup
```

---

## 📝 DANH SÁCH FILE CHI TIẾT

### ADVANCED MODE (14 files)

| # | Tên File | Loại | Yêu cầu |
|---|----------|------|--------|
| 1 | `vocab.js` | .js | 10 từ, IPA, VN/EN def, example, image, audio |
| 2 | `read.js` | .js | 10-11 câu, 10 bold từ, 3 questions, audio_url: null |
| 3 | `explore.js` | .js | 10-11 câu, 10 từ KHÁC (90% unique), CLIL topic |
| 4 | `word_power.js` | .js | 3 collocations, full sentences |
| 5 | `grammar.js` | .js | 20 exercises (11 MC, 5 Fill, 4 Unscramble) |
| 6 | `logic.js` | .js | 5 puzzles + FULL context, answer with units |
| 7 | `ask_ai.js` | .js | ⚠️ 5 prompts, 8-10 words, A0 ONLY |
| 8 | `writing.js` | .js | Prompt + model_sentence, NO image_url |
| 9 | `dictation.js` | .js | Auto (copy read.js) |
| 10 | `shadowing.js` | .js | Auto (copy read.js) |
| 11 | `word_match.js` | .js | Placeholder (10-20 lines) |
| 12 | `mindmap.js` | .js | 3 branches, A0 stems |
| 13 | `daily_watch.js` | .js | 3-5 videos, English Singsing + Little Fox |
| 14 | `video_queries.json` | json | Backup search keywords |

### EASY MODE (14 files)

Same structure as Advanced, with:
- Simpler vocabulary in definitions
- Shorter sentences (6-8 instead of 10-11)
- Fewer words per sentence (5-7 instead of 8-10)
- Easier examples
- Simpler grammar exercises
- Smaller numbers in logic puzzles
- Shorter ask_ai context (5-6 instead of 8-10)

### AI TUTOR (1 file)

| # | Tên File | Loại | Yêu cầu |
|---|----------|------|--------|
| 15 | `week_03_real.js` | .js | ⚠️ V28 format (ack/recast/question, subject agreement) |

### AUTO-GENERATED (System tạo)

| # | Tên File | Loại | Yêu cầu |
|---|----------|------|--------|
| 16 | `index.js` (Advanced) | .js | Combine 13 stations + voiceConfig |
| 17 | `index.js` (Easy) | .js | Same structure |

---

## ⚠️ CRITICAL REQUIREMENTS

### ask_ai.js (A0 Patterns ONLY)

✅ **ALLOWED**:
```
- What is this?
- Where is the pen?
- Is this a book?
- Can I play?
- Do you like it?
```

❌ **FORBIDDEN**:
```
- How do they go? (A1 - plural)
- What does it do? (A1 - auxiliary)
- Why is she...? (A1 - causation)
- How many words? (A1 - quantifiers)
```

**Context word limit**:
- Advanced: 8-10 words
- Easy: 5-6 words

### week_03_real.js (V28 Format)

**OLD (V27) ❌**:
```json
{
  "teacher_ack": "Good!",
  "teacher_recast": "You are busy!",
  "teacher_question": "What is your name?"
}
```

**NEW (V28) ✅**:
```json
{
  "ack": "Great!",
  "recast": "You are busy!",
  "question": "What is your name?"
}
```

**Subject Agreement** (CRITICAL):
```
Q: "Is your mother busy?"
Student: "Yes"
✅ AI: "She is busy!" (not "You are busy!")
```

---

## 📋 PRE-PRODUCTION CHECKLIST

### Preparation
- [ ] Read: `WEEK3_PRODUCTION_PLAN.md`
- [ ] Read: `V28_CRITICAL_CHANGES_SUMMARY.md`
- [ ] Review: Week 1 & Week 2 files as reference
- [ ] Understand: ask_ai.js A0 validation rules
- [ ] Setup: Validation tools ready

### Content Creation
- [ ] vocab.js (10 words) ← CREATE FIRST
- [ ] read.js (using vocab.js)
- [ ] explore.js (90% unique from read.js)
- [ ] word_power.js (3 collocations)
- [ ] grammar.js (20 exercises: 11 MC, 5 Fill, 4 Unscramble)
- [ ] logic.js (5 puzzles + context)
- [ ] ask_ai.js (5 A0 prompts, ≤10 words) ← VALIDATE
- [ ] writing.js (NO image_url field)
- [ ] dictation.js (auto-copy from read.js)
- [ ] shadowing.js (auto-copy from read.js)
- [ ] word_match.js (placeholder)
- [ ] mindmap.js (3 branches)
- [ ] daily_watch.js (3-5 videos)
- [ ] video_queries.json (backup keywords)
- [ ] Easy mode (adapt all above)
- [ ] week_03_real.js (V28 format with subject agreement) ← CRITICAL

### Quality Assurance
- [ ] Run: `node tools/validate_week.js 3`
- [ ] Run: `node tools/validate_ask_ai.js 3`
- [ ] Verify: All 8 checks pass
- [ ] Check: ask_ai.js context length
- [ ] Check: explore.js uniqueness (≤2 overlap)
- [ ] Verify: week_03_real.js V28 format

### Asset Generation
- [ ] Sync data: `python tools/sync_week_data.py 3`
- [ ] Register DB: `node tools/update_db_smart.js 3`
- [ ] Generate audio: `node tools/batch_manager.js 3 3`
- [ ] Generate images: `node tools/generate_images_nano_banana.js 3 both`
- [ ] Fetch videos: `node tools/update_videos.js 3`

---

## 🎯 KEY DECISION POINTS

### 1. ask_ai.js A0 Compliance
**Decision**: Strict enforcement of A0 patterns
- ✅ Enforced in validator
- ✅ Examples in Master Prompt V28
- ✅ All 5 prompts must pass

### 2. explore.js CLIL Topic
**Suggestion**: "Magic Mirrors" (Science/Reflection)
- Different from family-focused read.js
- Maintains 90% word uniqueness
- Example words: mirror, reflection, image, glass, light, etc.

### 3. Easy Mode Content Path
**Decision**: Different topic for Easy explore.js
- Not just simplified Advanced content
- Different CLIL angle (e.g., Mirror care vs Mirror physics)
- Same 10 words from Advanced vocab.js

### 4. AI Tutor Mission Structure
**Requirement**: V28 JSON format ONLY
- ack / recast / question (not teacher_ack, etc.)
- Subject agreement enforced
- Examples provided in V28 prompt

---

## 📊 SUCCESS METRICS

| Metric | Target | Status |
|--------|--------|--------|
| Content files created | 28 (.js + .json) | Pending |
| AI tutor file created | 1 (V28 format) | Pending |
| ask_ai.js validation | 5/5 prompts A0 | Pending |
| grammar.js exercises | 20 exactly | Pending |
| explore.js uniqueness | ≥90% | Pending |
| Word count accuracy | ±1 | Pending |
| Audio files generated | ~130 | Post-validation |
| Image files generated | ~60 | Post-validation |
| Video fetch success | 5/5 (or 3-5 min) | Post-validation |

---

## 📚 SUPPORTING DOCUMENTS

| Document | Size | Purpose |
|----------|------|---------|
| WEEK3_PRODUCTION_PLAN.md | ~5000 words | Comprehensive guide |
| V28_CRITICAL_CHANGES_SUMMARY.md | ~2000 words | AI tutor updates |
| WEEK3_QUICK_REFERENCE.md | ~3000 words | Checklist & templates |
| MASS_PRODUCTION_CONTEXT.md | ~1600 words | Overall context |
| Master Prompt V28 | 3300 lines | Full specification |
| Syllabus Week 3 | Extract | Topic/grammar details |
| Blueprint UI/UX | Extract | Content requirements |

---

## ⏱️ TIMELINE

| Phase | Task | Duration | Owner |
|-------|------|----------|-------|
| **Prep** | Review docs + setup | 15 min | PM |
| **Content Creation** | Create 28 files | 2 hours | Claude |
| **AI Tutor** | Create week_03_real.js | 20 min | Developer |
| **Validation** | Run validate scripts | 5 min | QA |
| **Sync** | Auto-sync + DB register | 2 min | System |
| **Assets** | Audio, images, videos | 15 min | Batch scripts |
| **Final Check** | Verify metrics | 2 min | QA |
| **Total** | | ~2.5 hours | |

---

## 🚀 NEXT STEPS

### Immediate (Today)
1. ✅ Review this executive summary
2. ✅ Review `WEEK3_PRODUCTION_PLAN.md` (especially Section 3.12 & 3.13 for index.js & syllabus_database.js)
3. ✅ Review `V28_CRITICAL_CHANGES_SUMMARY.md`
4. ✅ Approve or request changes

### Once Approved
1. Create `vocab.js` (FIRST)
2. Create remaining 27 content files
3. Create `index.js` (Advanced + Easy) ← **2 MANUAL files**
4. Update `syllabus_database.js` (Week 3 entry)
5. Create `week_03_real.js` (V28 format)
6. Run validation
7. Generate assets
8. Deploy to app

### During Production
1. Reference `WEEK3_QUICK_REFERENCE.md` for checklist
2. Use `WEEK3_PRODUCTION_PLAN.md` for detailed specs
3. Validate frequently (ask_ai.js especially)

### After Production
1. Test in app (localhost:5173)
2. Verify Week 3 appears in dropdown
3. Click through each station
4. Check audio plays
5. Verify images display
6. Test AI Tutor conversation

---

## 📞 CONTACT & CLARIFICATION

**Questions on**:
- **ask_ai.js patterns**: See `V28_CRITICAL_CHANGES_SUMMARY.md` section "Subject Agreement"
- **Content structure**: See `WEEK3_PRODUCTION_PLAN.md` section "File Details"
- **Validation rules**: See `WEEK3_QUICK_REFERENCE.md` section "Validation Sequence"
- **V28 format**: See Master Prompt V28 sections "New JSON Format" & "Subject Agreement"

---

## ✨ FINAL NOTES

✅ **All documentation prepared**
✅ **File templates ready**
✅ **Validation tools available**
✅ **Reference materials (Week 1-2) available**
✅ **Critical requirements identified**

**Status**: 📋 **READY FOR APPROVAL & EXECUTION**

---

**Created**: 16/01/2026  
**Version**: 1.0  
**Prepared by**: AI Assistant  
**For Review**: Project Manager / Content Lead  

