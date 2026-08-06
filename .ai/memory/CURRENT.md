# 🧠 Current System State & Context

---

## Session: Aug 5, 2026 — Shadowing TTS/Transcript Separation + W36 Audit

### Completed work:
- **Full shadowing audit** W1-W36: TTS separation, video-topic alignment, transcript integrity
- **W03 ADV schema cleanup**: removed start/duration timestamps from script[]
- **W11 ADV schema cleanup**: removed dual ttsScript/script + auto-gen fields, videoId → Fw0rdSHzWFY
- **W11 Easy rewrite**: script[] rewritten as proper TTS entries
- **W25 video replacement**: curo8LPPA5Y → mWxahMeRMrA (ESL Making Pizza, sequence connectors)
- **W25 transcript cleaned**: 50 raw segments → 18 clean segments per frozen pipeline
- **Truncated content_en fixed**: W17 ADV, W16 Easy, W20 Easy
- **Wrong/shifted vi translations fixed**: W07 Easy, W17 Easy, W20 Easy, W22 ADV/Easy, W35 ADV/Easy, W18 ADV
- **Missing vi translations added**: 33+ shadowing.js files (all vi:null eliminated)
- **40 transcript files translated**: 1553 segments with vi translations added
- **transcriptUtils.js fix**: getCleanedTranscriptSentences now passes vi field
- **SentenceCard.jsx fix**: renders vi translation below English text in transcript list
- **W36 audit completed**: 6 issues found (Logic Lab data path, missing image, metadata, knowledge_base, typo, comment)

### Key findings from audit:
- TTS and Video Transcript are separate systems — TTS has content_en+script[], Video has segments[]
- "Transcript" tab in app loads from sentences/<videoId>.json, not from shadowing.js
- RightPanel/SentenceCard did NOT render vi translations — fixed by adding vi field
- W36 logic_science.js data path mismatch: component reads weekData?.logic_science?.questions but data stored under logic_lab

### Pipeline rules (updated):
- **NEW PIPELINE**: Find video → Fetch transcript → Clean → Split by meaning → Add vi translations → Done
- **TTS mode**: ADV and Easy have SEPARATE content_en + script[] with vi
- **Video mode**: 1 video shared for both ADV and Easy, transcript in sentences/<videoId>.json
- **vi translations**: Both TTS script[] AND transcript segments[] must have vi field
- **NEVER overwrite TTS with video transcript** (Rule #12)

### Pending (W36 fixes needed):
- [ ] Fix Logic Lab data path (TabbedLogicLab.jsx:168)
- [ ] Add W36 image file
- [ ] Add W36 to metadata.js
- [ ] Add knowledge_base to week_36_real.js
- [ ] Fix grammar.js typo "TOOKE" → "TOOK"
- [ ] Fix index.js comment

---

## Auto Status

**Updated:** 2026-08-05T15:00:00.000Z
**Branch:** `main`
**Working tree:** Clean
**Last commit:** ab3e8ba9 fix(shadowing): show vi translations in transcript mode

### Recent commits (this session)
```
ab3e8ba9 fix(shadowing): show vi translations in transcript mode
e58f302a fix(shadowing): pass vi translations through getCleanedTranscriptSentences
0cf2a66c fix(shadowing): 3 transcript files updated by late agents
9aaa38ed feat(shadowing): add vi translations to all 40 transcript files (1553 segments)
b217bcc8 fix(shadowing): W25 transcript cleaned + split per frozen pipeline
ebe6ba27 fix(shadowing): W25 → mWxahMeRMrA (ESL Making Pizza, sequence connectors)
903c82ce fix(shadowing): W11 → PKFgBK5fbfc (picnic prepositions, present tense)
7fa5c4b2 fix(shadowing): W11 → Fw0rdSHzWFY (present tense), W25 → x39KwsXxl_0 (no duplicate)
373839fd fix(shadowing): comprehensive audit — TTS/transcript separation + vi translations + video alignment
```
