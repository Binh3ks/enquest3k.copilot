# BÁO CÁO PHÂN TÍCH SO LỆCH BLUEPRINT 156 TUẦN (BASELINE MỚI — ROUND 72)

> **CĂN CỨ THỰC HIỆN:**
> - Quyết định của Owner (Round 72): **Source B (`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt`) là NGUỒN SỰ THẬT DUY NHẤT**. Source A (Digital Map) phải theo Source B.
> - **PRODUCTION GUARD:** Toàn bộ 156 file `src/data/weeks/week_{N}/blueprint.json` **100% NGUYÊN VẸN (ZERO MUTATIONS)**.
> - Bộ 156 blueprint baseline mới được tái sinh vào: `docs/agent_artifacts/temp_blueprints/`.

---

## I. TỔNG QUAN THỐNG KÊ
- **Tổng số tuần được tái sinh:** 156 / 156 tuần
- **Số tuần có thay đổi so với production hiện tại:** 154 tuần
- **Số tuần hoàn toàn trùng khớp (giữ nguyên):** 2 tuần

---

## II. BẢNG CHI TIẾT CÁC TUẦN THAY ĐỔI VÀ NGUYÊN NHÂN

| Tuần | Trường thay đổi | Giá trị cũ (Production) | Giá trị mới (Source B Baseline) | Nguyên nhân / Căn cứ Sư phạm |
| :---: | :--- | :--- | :--- | :--- |
| **W2** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W4** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W5** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W6** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W7** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W8** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W9** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W10** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W11** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W12** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W13** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W14** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W15** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W16** | `cefr_level/stage` | A2 Flyers (Stage 1) | **Pre-A1 Starters (Stage 1)** | Standardized Stage boundary resolution |
| **W16** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W17** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W18** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W19** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W20** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W21** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W22** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W23** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W24** | `cefr_level/stage` | A2 Flyers (Stage 1) | **A1 Movers (Stage 1)** | Standardized Stage boundary resolution |
| **W24** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W25** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W26** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W27** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W28** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W29** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W30** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W31** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W32** | `cefr_level/stage` | A2 Flyers (Stage 1) | **A1 Movers (Stage 1)** | Standardized Stage boundary resolution |
| **W32** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W33** | `theme` | Safety First at School & The Force of Friction | **The Mistake (Irregular Verbs 5: Accidents)** | Source B Topic priority / range resolution |
| **W33** | `cefr_level/stage` | A2 Flyers (Stage undefined) | **A2 Flyers (Stage 1)** | Standardized Stage boundary resolution |
| **W33** | `alignment_status` | undefined | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W33** | `syllabus_words` | [0]  | **[6] mistake, accident, fix, sorry, careful, clumsy** | Slash-split tokenizer or multi-week range word extraction |
| **W33** | `clil_topic.title` | The Science of Friction & Floor Safety | **The Mistake** | CLIL topic derived from Source B Topic / Skill |
| **W33** | `grammar_focus.structure` |  | **Break -> Broke, Fall -> Fell, Lose -> Lost, Hurt -> Hurt** | Grammar structure updated from Source B |
| **W34** | `theme` | The Lion and the Mouse: True Friendship | **Storytelling Practice 1 (Fable)** | Source B Topic priority / range resolution |
| **W34** | `cefr_level/stage` | A2 Flyers (Stage undefined) | **A2 Flyers (Stage 1)** | Standardized Stage boundary resolution |
| **W34** | `alignment_status` | undefined | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W34** | `syllabus_words` | [0]  | **[7] net, trap, roar, help, friend, tiny, huge** | Slash-split tokenizer or multi-week range word extraction |
| **W34** | `clil_topic.title` |  | **Storytelling Practice 1 & Pronunciation of Past Tense endings and forms** | CLIL topic derived from Source B Topic / Skill |
| **W34** | `grammar_focus.structure` | Past Simple & Past Continuous | **Mixed Regular and Irregular Verbs** | Grammar structure updated from Source B |
| **W35** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W36** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W37** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W38** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W39** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W40** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W41** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W41** | `syllabus_words` | [5] egg, hatch, caterpillar/tadpole, chrysalis, butterfly/frog | **[7] egg, hatch, caterpillar, tadpole, chrysalis, butterfly, frog** | Slash-split tokenizer or multi-week range word extraction |
| **W42** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W43** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W44** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W45** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W46** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W47** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W48** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W49** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W50** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W51** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W52** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W53** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W54** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W55** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W56** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W57** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W58** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W59** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W60** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W61** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W62** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W63** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W64** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W65** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W66** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W67** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W68** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W69** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W70** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W71** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W72** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W73** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W73** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W74** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W75** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W76** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W77** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W77** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W78** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W79** | `theme` | The Industrial Revolution | **Space Exploration vs. Earth Fix** | Source B Topic priority / range resolution |
| **W79** | `alignment_status` | ALIGNED | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W79** | `syllabus_words` | [0]  | **[7] space, earth, money, spend, fix, problem, important** | Slash-split tokenizer or multi-week range word extraction |
| **W79** | `clil_topic.title` | Lịch sử thế giới: Động cơ hơi nước & Nhà máy | **Space Exploration vs. Earth Fix & Rebuttal Intro ("Yes, but...")** | CLIL topic derived from Source B Topic / Skill |
| **W79** | `grammar_focus.structure` | Nguyên nhân & tác động lịch sử; `broadcast_studio` phim tài liệu lịch sử | **Passive Voice, Conditionals, Comparatives** | Grammar structure updated from Source B |
| **W80** | `theme` | Supply, Demand & Market Prices | **Space Exploration vs. Earth Fix** | Source B Topic priority / range resolution |
| **W80** | `alignment_status` | ALIGNED | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W80** | `syllabus_words` | [0]  | **[7] space, earth, money, spend, fix, problem, important** | Slash-split tokenizer or multi-week range word extraction |
| **W80** | `clil_topic.title` | Kinh tế học: Giá cân bằng thị trường | **Space Exploration vs. Earth Fix & Rebuttal Intro ("Yes, but...")** | CLIL topic derived from Source B Topic / Skill |
| **W80** | `grammar_focus.structure` | Logic điều kiện kinh tế; `math_quest` biểu đồ đường cung - cầu | **Passive Voice, Conditionals, Comparatives** | Grammar structure updated from Source B |
| **W81** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W82** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W82** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W83** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W84** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W85** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W86** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W87** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W87** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W88** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W89** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W90** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W91** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W92** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W92** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W93** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W94** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W95** | `theme` | Ocean Acidification & Carbon | **The Young Professor** | Source B Topic priority / range resolution |
| **W95** | `alignment_status` | ALIGNED | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W95** | `clil_topic.title` | Hóa học biển: Thang đo pH và hấp thụ CO2 | **The Young Professor** | CLIL topic derived from Source B Topic / Skill |
| **W96** | `theme` | Preparation for Mid-Phase Gate | **The Young Professor** | Source B Topic priority / range resolution |
| **W96** | `alignment_status` | ALIGNED | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W96** | `clil_topic.title` | Chiến thuật làm bài thi Cambridge B1 PET | **The Young Professor** | CLIL topic derived from Source B Topic / Skill |
| **W97** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W97** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W98** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W99** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W100** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W101** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W102** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W102** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W103** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W104** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W105** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W106** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W107** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W107** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W108** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W109** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W110** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W111** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W112** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W112** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W113** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W113** | `alignment_status` | MISSING_IN_SOURCE_A_SOURCE_B_ONLY | **ALIGNED** | Source B divergence detection active |
| **W114** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W114** | `alignment_status` | MISSING_IN_SOURCE_A_SOURCE_B_ONLY | **ALIGNED** | Source B divergence detection active |
| **W114** | `grammar_focus.structure` | Grammar Drill & Sentence Construction | **Bố cục (layout, center, organize); `action_lab` thiết kế poster** | Grammar structure updated from Source B |
| **W115** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W115** | `alignment_status` | MISSING_IN_SOURCE_A_SOURCE_B_ONLY | **ALIGNED** | Source B divergence detection active |
| **W116** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W116** | `alignment_status` | MISSING_IN_SOURCE_A_SOURCE_B_ONLY | **ALIGNED** | Source B divergence detection active |
| **W116** | `grammar_focus.structure` | Grammar Drill & Sentence Construction | **Kỹ năng phi ngôn ngữ (eye contact, loud, clear); `broadcast_studio`** | Grammar structure updated from Source B |
| **W117** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W117** | `alignment_status` | MISSING_IN_SOURCE_A_SOURCE_B_ONLY | **ALIGNED** | Source B divergence detection active |
| **W117** | `grammar_focus.structure` | Grammar Drill & Sentence Construction | **Thuyết trình 3 phút + Q&A; Đánh giá năng lực thuyết trình B1 Part A** | Grammar structure updated from Source B |
| **W118** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W118** | `alignment_status` | MISSING_IN_SOURCE_A_SOURCE_B_ONLY | **ALIGNED** | Source B divergence detection active |
| **W118** | `grammar_focus.structure` | Grammar Drill & Sentence Construction | **Thuyết trình 3 phút + Q&A; `info_exchange` phản hồi đồng cấp Part B** | Grammar structure updated from Source B |
| **W119** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W119** | `alignment_status` | MISSING_IN_SOURCE_A_SOURCE_B_ONLY | **ALIGNED** | Source B divergence detection active |
| **W120** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1 PET (Stage 2)** | Standardized Stage boundary resolution |
| **W120** | `alignment_status` | MISSING_IN_SOURCE_A_SOURCE_B_ONLY | **ALIGNED** | Source B divergence detection active |
| **W120** | `grammar_focus.structure` | Grammar Drill & Sentence Construction | **LỄ TỐT NGHIỆP PHASE 2 — ĐẠT CHUẨN NĂNG LỰC B1 PRELIMINARY (PET)!** | Grammar structure updated from Source B |
| **W121** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W122** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W123** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W124** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W125** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W126** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W127** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W128** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W129** | `theme` | Opinion Project 3: Smartphones Under 12? | **Review & Math Logic Cycle** | Source B Topic priority / range resolution |
| **W129** | `alignment_status` | ALIGNED | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W129** | `clil_topic.title` | Tâm lý phát triển: Tác động mạng xã hội | **Review & Math Logic Cycle** | CLIL topic derived from Source B Topic / Skill |
| **W130** | `theme` | Opinion Project 3: Comparing Global Approaches | **Review & Math Logic Cycle** | Source B Topic priority / range resolution |
| **W130** | `alignment_status` | ALIGNED | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W130** | `clil_topic.title` | Luật so sánh: Lệnh cấm của Pháp và Florida | **Review & Math Logic Cycle** | CLIL topic derived from Source B Topic / Skill |
| **W131** | `theme` | Opinion Project 3: Persuasive Techniques | **Review & Math Logic Cycle** | Source B Topic priority / range resolution |
| **W131** | `alignment_status` | ALIGNED | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W131** | `clil_topic.title` | Ethos, Pathos, Logos trong thuyết phục | **Review & Math Logic Cycle** | CLIL topic derived from Source B Topic / Skill |
| **W132** | `theme` | B1+ Academic Assessment Mock 2 | **Review & Math Logic Cycle** | Source B Topic priority / range resolution |
| **W132** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1+ Academic (Stage 3)** | Standardized Stage boundary resolution |
| **W132** | `alignment_status` | ALIGNED | **DIVERGENT_THEME_FALLBACK_TO_SOURCE_B** | Source B divergence detection active |
| **W132** | `clil_topic.title` | Khảo sát Năng lực Chuẩn hóa B1+ 2 | **Review & Math Logic Cycle** | CLIL topic derived from Source B Topic / Skill |
| **W133** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W134** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W135** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W136** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W137** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1+ Academic (Stage 3)** | Standardized Stage boundary resolution |
| **W138** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W139** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W140** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W141** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W142** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1+ Academic (Stage 3)** | Standardized Stage boundary resolution |
| **W143** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W144** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W145** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W146** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W147** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1+ Academic (Stage 3)** | Standardized Stage boundary resolution |
| **W147** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W148** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W149** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W150** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W151** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W152** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1+ Academic (Stage 3)** | Standardized Stage boundary resolution |
| **W152** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W153** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W154** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W155** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |
| **W156** | `cefr_level/stage` | A2 Flyers (Stage 1) | **B1+ Academic (Stage 3)** | Standardized Stage boundary resolution |
| **W156** | `alignment_status` | DIVERGENT_THEME_FALLBACK_TO_SOURCE_B | **ALIGNED** | Source B divergence detection active |

---
## III. KẾT LUẬN & HƯỚNG DẪN DÙNG BASELINE MỚI
1. Mọi công cụ kiểm tra (Gates: `G-GEN-01` đến `G-GEN-16`, audit scripts) từ Round 72 trở đi phải đối chiếu với các file blueprint baseline trong `docs/agent_artifacts/temp_blueprints/` (hoặc sau khi Owner phê duyệt merge vào production).
2. Các tuần mâu thuẫn chủ đề (như W79, W80, W95, W96, W129–132) đã được tự động gắn cờ `DIVERGENT_THEME_FALLBACK_TO_SOURCE_B` và bắt buộc lấy Theme từ Topic của Source B.
