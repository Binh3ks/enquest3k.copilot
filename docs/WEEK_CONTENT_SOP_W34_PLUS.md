# EngQuest3K — Week Content SOP for W34–W72
## Cambridge A2 Flyers 2-Tier Architecture Standard

> **Last Updated**: 2026-09-01 | **Golden Standard Reference**: W33

## Architecture Overview

TIER 1 — Days 1–4 (12 Quests): LEARNING MODE
  - Purpose: Build vocabulary, grammar, CLIL content awareness
  - Cambridge Alignment: Approximate (pedagogical, not exam-exact)

TIER 2 — Day 5 (3 Quests): BOSS CASTLE
  - Purpose: Authentic Cambridge A2 Flyers practice
  - Cambridge Alignment: EXACT format, scoring, instructions
  - Rotary: 4-week cycle covers all 16 parts → Week 5 = Full Mock Test

## Day 4 → S3 Learning Mapping (Critical)

  story_writer (Story Writer)       ← S3 Practice: WRITE the 5-picture story
  broadcast_studio (Video Challenge) ← S3 Practice: NARRATE the story aloud
  info_exchange (Info Exchange)      ← S2 Practice: info gap conversation

  → Story Writer AND Video Challenge MUST use 5 panels/scenes (same as S3 Cambridge)

## Rotary Schedule (Boss Castle)

| Cycle | Weeks    | boss_listening   | boss_reading       | weekly_review (Speaking) |
|-------|----------|------------------|--------------------|--------------------------|
| Cyc 1 | W33,W37+ | L1 + L2          | R1 + R2 + R3       | S1 (Find Differences)    |
| Cyc 2 | W34,W38+ | L3               | R2 + R3            | S2 (Info Exchange)       |
| Cyc 3 | W35,W39+ | L4               | R4 + R5            | S3 (5-Picture Story)     |
| Cyc 4 | W36,W40+ | L5               | R6 + R7            | S4 (Personal Questions)  |
| Mock  | W37,W41+ | L1+L2+L3+L4+L5   | All R Parts        | S1+S2+S3+S4              |

## Listening Hub Data Schemas

### L1 — Draw Lines (5 people in scene)
```js
listening_p1: {
  image_url: '/images/weekXX/listening_p1_scene.jpg',
  audio_url: '/audio/weekXX/listening_p1_full.mp3',
  passage_audio_script: '...',
  dialogue_script: [...],
  names: [    // 6 entries: 1 isExample + 5 scoreable
    { id: 'n1', text: 'Name', target_id: 't1', isExample: true },
    // n2-n6
  ],
  pins: [     // 6 character hotspots in image (x,y as % of container)
    { id: 't1', x: 20, y: 45, label: 'Character 1' },
  ]
}
```

### L2 — Listen & Write (5 blanks in form/notes)
```js
listening_p2: {
  title: 'Interview/Survey Title',
  audio_url: '/audio/weekXX/listening_p2_full.mp3',
  required_speakers: ['man', 'woman'],
  dialogue_script: [...],
  example: { field: 'Field Name', answer: 'Example Answer' },
  fields: [   // exactly 5 fields (ids 1-5)
    { id: 1, label: 'Label 1', answer: 'Answer 1' },
  ]
}
```

### L3 — Visual Matching A-H (5 questions)
```js
listening_p3: {
  audio_url: '/audio/weekXX/listening_p3_full.mp3',
  items: [    // 5 questions
    { id: 'p3_1', question_en: '...', dialogue_script: [...],
      options: [  // 8 pictures A-H
        { letter: 'A', image_url: '/images/weekXX/p3_optA.png', label: '...' },
      ],
      correct_letter: 'C' }
  ]
}
```

### L4 — Tick the Box (5 questions × 3 pictures)
```js
listening_p4: {
  audio_url: '/audio/weekXX/listening_p4_full.mp3',
  questions: [  // 6 entries: 1 isExample + 5 scoreable
    { id: 'p4_example', isExample: true, question_en: '...', correct_letter: 'A',
      options: [
        { letter: 'A', image_url: '...', label: '...' },  // 3 options
        { letter: 'B', image_url: '...', label: '...' },
        { letter: 'C', image_url: '...', label: '...' }
      ], dialogue_script: [...] },
    // p4_1 through p4_5 (non-example)
  ]
}
```

### L5 — Colour & Write (3 colour + 2 write)
```js
listening_p5: {
  audio_url: '/audio/weekXX/listening_p5_full.mp3',
  image_url: '/images/weekXX/listening_p5_scene.png',
  audio_script: '...',
  instructions: [  // 6 entries: 1 isExample + 3 colour + 2 write
    { id: 'inst_0', item: 'Object', text: 'Colour X yellow', color: 'yellow', isExample: true, x: 10, y: 10 },
    { id: 'inst_1', item: '...', text: 'Colour X blue', color: 'blue', x: ?, y: ? },
    { id: 'inst_2', item: '...', text: 'Colour X green', color: 'green', x: ?, y: ? },
    { id: 'inst_3', item: '...', text: 'Colour X red', color: 'red', x: ?, y: ? },
    { id: 'inst_4', item: '...', text: 'Write the word "WORD" on the X', writeWord: 'WORD', x: ?, y: ? },
    { id: 'inst_5', item: '...', text: 'Write the word "WORD2" on the X', writeWord: 'WORD2', x: ?, y: ? }
  ]
}
```

## Reading Hub Data Schemas (Zone 1 & 4)

### Gear 1 — Scene Explorer (`story_scenes`, 5 scenes)
- 5 Webtoon scenes with natural linear chunks.
- Audio: `/audio/weekXX/read_stem.mp3`.

### Gear 2 — Voice Shadowing (`shadowing_sentences`, 8 sentences)
- Exactly 8 atomic sentences for shadowing.
- Pre-generated static MP3 files: `/audio/weekXX/shadowing_1.mp3` through `shadowing_8.mp3` (Voice: `en-US-Journey-F`).
- Schema:
```js
shadowing: {
  theme: 'Theme Title',
  sentences: [
    { id: 1, text: 'Sentence 1...', words: [...], ipa: [...], audio_url: '/audio/weekXX/shadowing_1.mp3' }
  ]
}
```

### Gear 4 — Fact Finder (`clil_article` - Knowledge Lab)
- **Story-Driven Science Principle**:
  - **CẤM** hội chứng dịch sách giáo khoa khô khan (Fragmented Textbook Syndrome).
  - Phải xuất phát từ **hiện tượng tương phản đời thực** (Scientific Contrast).
  - Khoa học là **manh mối thám tử** trong câu chuyện (Scientific Clue).
  - Hình tượng hóa khái niệm khoa học thành ấn tượng khó quên (*"Water steals your friction"*).
- **Selective Grammar X-Ray Invariant**:
  - **Tối đa 3–4 cụm cấu trúc ngữ pháp mục tiêu per đoạn văn**.
  - **CẤM TUYỆT ĐỐI** đưa các từ đơn lẻ phổ thông (`is`, `walk`, `noticed`, `pointed`) vào regex pattern, tránh làm hơn 70% đoạn văn bị bôi vàng gây quá tải nhận thức.
  - Soi rọi chính xác ngữ pháp mục tiêu của tuần (ví dụ: Past Continuous hành động đang diễn ra vs Past Simple xen vào/kết quả).
- **Vocab Focus Collocation Invariant**:
  - 100% mục trong `vocab_focus` phải là **cụm từ tự nhiên hoàn chỉnh (Chunks, Collocations, Compound Nouns)**. CẤM bẻ nhỏ thành từ đơn rời rạc vô nghĩa.
- **4-Option MCQ Check Questions Standard**:
  - Toàn bộ 5 câu hỏi Check Questions BẮT BUỘC có **4 lựa chọn (A, B, C, D)** với các phương án nhiễu (distractors) tự nhiên, chặt chẽ.
- **Mandatory Dictionary Synchronization Invariant**:
  - Mọi chunks/collocations trong `vocab_focus` và bài đọc BẮT BUỘC phải được khai báo trong `src/data/weeks/weekXX/vocab_dictionary_master.js` (và `src/data/dictionary.json`) với đầy đủ `ipa`, `meaning` (tiếng Việt có dấu), `example`, `type`, `audioText`, và `aliases`.
  - Tuyệt đối không để trống khiến popup từ điển `HoverWord` bị treo spinner "Looking up example...".
- **Audio Assets Pre-generation Requirement**:
  - Bắt buộc sinh sẵn 3 file: `clil_X_p1.mp3` (Part 1), `clil_X_p2.mp3` (Part 2), `clil_X.mp3` (Full text) giọng `en-US-Journey-F`.
- Schema:
```js
clil_article: {
  id: 'clil_wXX_theme',
  title_en: 'Title En',
  title_vi: 'Title Vi',
  part_1_title: 'Part 1 Heading',
  part_2_title: 'Part 2 Heading',
  content_en: 'Part 1 text...\n\nPart 2 text...',
  content_vi: 'Dịch Part 1...\n\nDịch Part 2...',
  audio_url: '/audio/weekXX/clil_theme.mp3',
  vocab_focus: ['collocation 1', 'collocation 2', ...],
  grammar_patterns: [
    { pattern: '\\b(target phrase 1|target phrase 2)\\b', label: 'Grammar Focus P1', paragraph_scope: 1 },
    { pattern: '\\b(target phrase 3|target phrase 4)\\b', label: 'Grammar Focus P2', paragraph_scope: 2 }
  ],
  sentence_drills: [
    { id: 1, label: 'Science Fact', scrambled: [...], correct: [...] },
    { id: 2, label: 'Safety Rule', scrambled: [...], correct: [...] }
  ],
  check_questions: [
    { id: 1, question_en: 'Question 1?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
    // id 2-5 (all 4 options)
  ],
  critical_thinking: { question_en: '...', hint_en: '...' }
}
```

## Writing Hub Data Schemas

### R1 — Word-Definition Match (10 of 15 words)
```js
rw_part_1: {
  word_bank: ['word1', ..., 'word15'],   // exactly 15 words
  example: { id: 0, text: 'Definition', target: 'exampleword' },
  definitions: [  // exactly 10 definitions
    { id: 1, text: 'Definition...', target: 'word' },
    // id 2-10
  ]
}
```

### R2 — Dialogue Gap (5 gaps, 8 options A-H)
```js
rw_part_2: {
  title: 'Conversation Title',
  example: { speaker_a: 'Name', text_a: '?', speaker_b: 'Name', answer_letter: 'D', answer_text: '...' },
  turns: [  // exactly 5
    { id: 'q1', speaker_a: 'Name', text_a: '?', correct_letter: 'G' },
  ],
  answer_options: [  // exactly 8 options A-H
    { letter: 'A', text: '...' },
  ]
}
```

### R3 — Story Gap-fill (5 blanks + title choice)
```js
rw_part_3: {
  story_text: 'Story with ___ exactly 5 ___ gaps ___ numbered ___ by ___ blank ID.',
  example: { blank: 1, answer: 'word', word_bank: ['word1',...,'word8'] },  // 8-word bank
  blanks: [  // exactly 5 blanks (ids 2-6)
    { id: 2, answer: 'word2' },
    { id: 3, answer: 'word3' },
    { id: 4, answer: 'word4' },
    { id: 5, answer: 'word5' },
    { id: 6, answer: 'word6' }
  ],
  title_options: [  // 3 choices (1 correct)
    { text: 'Correct Title', isCorrect: true },
    { text: 'Wrong 1', isCorrect: false },
    { text: 'Wrong 2', isCorrect: false }
  ]
}
```

### R4 — Grammar cloze / T-F-NG (W35+)
```js
// Grammar word-choice format (current W33 style):
rw_part_4: {
  text_template: 'Text with [1] grammar [2] choices throughout [3].',
  example: { blank: 1, correct: 'word', options: ['opt1', 'opt2', 'opt3'] },
  blanks: [  // 9 blanks (ids 2-10), each 3 options
    { id: 2, correct: 'word', options: ['a', 'b', 'c'] },
  ]
}
```

### R5 — Story Comprehension (7 questions, 1-4 word answers)
```js
rw_part_5: {
  title: 'Story Title',
  story_text: '~120-word passage...',
  example: { prompt: 'Context question', answer: '1-4 word answer' },
  questions: [  // 7 questions
    { id: 'q1', prompt: 'Question about story?', answer: 'short answer' },
  ]
}
```

### R6 — Open Cloze (10 single-word gaps) — NEW W36
```js
rw_part_6: {
  passage: 'Text with ten ___ single-word gaps through the passage.',
  example: { blank: 0, answer: 'correct_word' },
  gaps: [  // 10 gaps (ids 1-10)
    { id: 1, answer: 'word1' },
    // ... id 2-10
  ]
}
```

### R7 (picture_story) — 5-Panel Story Writing (S3 Learning Scaffold Standard)

> **Mandatory Scaffold Invariants for Story Writer**:
> 1. **Collocation & Chunk-First Invariant**:
>    - Mọi `pills` và keyword inputs BẮT BUỘC phải là **cụm từ tự nhiên (Chunks, Collocations, Phrasal Verbs, Prepositional Phrases)** hoàn chỉnh (ví dụ: `felt proud of him`, `spoke to all the students`, `walked carefully down the corridor`, `slipped on the wet tiles`, `applied a clean bandage`, `gave Jake a special safety award`).
>    - CẤM TUYỆT ĐỐI bẻ nhỏ thành từng từ đơn rời rạc vô nghĩa (`fast`, `walked`, `the`).
> 2. **Pure Discourse Connectors Invariant (Chống Xung Đột Cú Pháp)**:
>    - Hàng `connectors` BẮT BUỘC CHỈ CHỨA các liên từ nối câu / liên từ thời gian thuần túy (`In the beginning,`, `Suddenly,`, `Then,`, `After that,`, `Meanwhile,`, `In the end,`, `Finally,`, `and`, `because`, `so`).
>    - **CẤM TUYỆT ĐỐI** nhét cả mệnh đề có sẵn chủ ngữ và động từ vào hàng connectors (ví dụ: cấm dùng `"While he was walking,"`), tránh gây xung đột kép thành *"In the beginning, While Jake was walking walked carefully..."*.
> 3. **2-Sentence Syntactic Architecture (2 Câu Hoàn Chỉnh per Scene)**:
>    - Mỗi cảnh (Scene 1–5) cung cấp đủ các cụm từ để học sinh ghép thành **2 câu chuẩn mực**:
>      - *Câu 1*: Bối cảnh / Hành động của nhân vật chính.
>      - *Câu 2*: Sự cố bất ngờ / Hành động can thiệp / Kết quả.
>    - Bắt buộc cung cấp đúng 2 distractors hợp lý per scene để kiểm tra tư duy ngữ cảnh của học sinh.
> 4. **Smart Cursor Insertion & Dictionary Synchronization**:
>    - Khi bấm vào Connector hoặc Pill, văn bản chèn chính xác tại vị trí con trỏ chuột, tự căn chỉnh dấu cách.
>    - 100% pills và chunks BẮT BUỘC phải có trong từ điển `vocab_dictionary_master.js` với nghĩa tiếng Việt, IPA và câu ví dụ để click là xem ngay không bị treo.
> 5. **No Locked Connectors (Trao Quyền Tự Chủ Lựa Chọn)**:
>    - Tuyệt đối KHÔNG sử dụng `locked_connector`. 100% liên từ được đưa vào hàng `connectors` dưới dạng các nút lựa chọn tự do (`🔗 + In the beginning,`, `🔗 + Suddenly,`, `🔗 + Then,`, `🔗 + and`,...). Học sinh có toàn quyền lựa chọn cách mở đầu câu.
> 6. **Mobile-First Compact Real Estate Invariant**:
>    - Bố cục responsive: 2 cột trên desktop (`md:grid md:grid-cols-12`), khống chế chiều cao ảnh vừa vặn trên di động (`h-36 sm:h-44`), textarea `rows={2}`, giúp hiển thị trọn vẹn trong 1 màn hình di động mà không cần cuộn trang.

```js
picture_story: {
  steps: [   // exactly 5 steps
    { scene: 1, ladder_stage: 'MODEL', badge_label: 'MODEL',
      title: 'Scene 1: Walking in the Corridor', image_url: '/images/weekXX/writing_panel_1.png',
      caption: '...', frame_L1: '2 sentences example',
      connectors: ['In the beginning,', 'Suddenly,', 'Then,', 'and'],
      sentence_hint: 'Write 2 sentences: (1) Where Jake was walking, and (2) who ran past him.',
      ordered_chips: [...],   // full sentence target components
      pills: [...],           // SCRAMBLED collocations/chunks + 2 distractors
      audio: '...' },
    { scene: 2, ladder_stage: 'BUILD', connectors: ['Suddenly,', 'Right away,', 'Then,', 'and', 'because'], ... },
    { scene: 3, ladder_stage: 'WRITE', connectors: ['After that,', 'Next,', 'Then,', 'and', 'quickly'], ... },
    { scene: 4, ladder_stage: 'EXPAND', connectors: ['Then,', 'After that,', 'Meanwhile,', 'and', 'so'], ... },
    { scene: 5, ladder_stage: 'REFLECT', connectors: ['In the end,', 'Finally,', 'At last,', 'and', 'because'], ... }
  ],
  min_words: 40   // 5 scenes × 2 sentences = 10 sentences (~100-120 words)
}
```

## Speaking Hub Data Schemas

### S1 — Find 4 Differences
```js
find_differences: {
  image_a: { url: '/images/weekXX/find_diff_a.png', label: 'Picture A' },
  image_b: { url: '/images/weekXX/find_diff_b.png', label: 'Picture B' },
  differences: [  // exactly 4
    { id: 'd1', description: 'Object X is different',
      hotspot_a: { x: 45, y: 30 }, hotspot_b: { x: 45, y: 30 } }
  ],
  examiner_intro: 'Find 4 differences between Picture A and Picture B.'
}
```

### S2 — Information Exchange (5-slot info gap)
```js
info_exchange_cards: {
  examiner_card: {
    title: 'Name: PersonName', 
    fields: [  // 5 fields with values
      { id: 'f1', label: 'Age', value: '10 years old' },
    ]
  },
  student_card: {
    title: 'Name: PersonName',
    fields: [  // 5 fields with value: null (student fills by asking)
      { id: 'f1', label: 'Age', value: null, question_prompt: 'How old is X?' },
    ]
  }
}
```

### S3 — 5-Picture Story (Cambridge exact format)
```js
picture_story: {
  title: 'Story Title',
  images: [  // exactly 5
    { id: 1, image_url: '/images/weekXX/ps_1.png', narrator_prompt: 'Examiner describes pic 1.' },
    { id: 2, image_url: '/images/weekXX/ps_2.png', narrator_prompt: 'Student narrates.' },
    { id: 3, image_url: '/images/weekXX/ps_3.png', narrator_prompt: 'Student narrates.' },
    { id: 4, image_url: '/images/weekXX/ps_4.png', narrator_prompt: 'Student narrates.' },
    { id: 5, image_url: '/images/weekXX/ps_5.png', narrator_prompt: 'Student narrates ending.' }
  ],
  examiner_intro: 'Look at these five pictures. They tell a story about [NAME]...',
  examiner_pic1_narration: 'In the first picture, [describe].'
}
```

### S4 — Personal Questions (4 open questions)
```js
personal_questions: {
  examiner_intro: "Now let's talk about you...",
  questions: [  // 4 questions on personal topics
    { id: 'q1', question: 'What is your favourite subject?', topic: 'school', sample_answer_hint: '...' },
    { id: 'q2', question: 'What do you like to do after school?', topic: 'hobbies', sample_answer_hint: '...' },
    { id: 'q3', question: 'Tell me about your best friend.', topic: 'friends', sample_answer_hint: '...' },
    { id: 'q4', question: 'What do you want to be when you grow up?', topic: 'future', sample_answer_hint: '...' }
  ]
}
```

## Image Asset Checklist Per Week

public/images/weekXX/
  writing_panel_1.png    # 3D Pixar: Setting scene
  writing_panel_2.png    # 3D Pixar: Action/event
  writing_panel_3.png    # 3D Pixar: Problem/conflict
  writing_panel_4.png    # 3D Pixar: Response/help (EXPAND)
  writing_panel_5.png    # 3D Pixar: Resolution/award (REFLECT)
  ps_1.png ... ps_5.png  # Speaking S3 - same theme as writing panels
  find_diff_a.png        # S1 Picture A (Cycle 1 weeks)
  find_diff_b.png        # S1 Picture B (4 differences from A)
  listening_p1_scene.jpg # L1 scene with 6 characters
  listening_p5_scene.png # L5 colour & write scene

## Audio Asset Checklist Per Week (Pre-generated MP3 Priority)

public/audio/weekXX/
  shadowing_1.mp3 ... shadowing_8.mp3 # Voice Shadowing (8 sentences, en-US-Journey-F)
  clil_X_p1.mp3                       # Fact Finder Part 1 audio (en-US-Journey-F)
  clil_X_p2.mp3                       # Fact Finder Part 2 audio (en-US-Journey-F)
  clil_X.mp3                          # Fact Finder Full text audio (en-US-Journey-F)
  read_stem.mp3                       # STEM Story full audio (en-US-Journey-F)
  read_social.mp3                     # Social Story full audio (en-US-Journey-F)
  dictation_1.mp3 ... dictation_5.mp3 # Dictation audio (5 files, en-US-Neural2-F)
  listening_p1_full.mp3               # L1 full audio with 2-play loop
  listening_p2_full.mp3               # L2 full audio
  listening_p3_full.mp3               # L3 full audio
  listening_p4_full.mp3               # L4 full audio
  listening_p5_full.mp3               # L5 full audio

## Validation Before Commit

  npm run build
  npm run audit:cefr <weekNum>
  node scripts/gate17_fidelity_doctrine.mjs <weekNum>
  npm run audit:chunks

## 🔄 Mandatory Continuous Handoff & Maintenance Doctrine (Invariant)
> **BẮT BUỘC ÁP DỤNG TỪ NAY VỀ SAU**:
> Bất kỳ review, tinh chỉnh phương pháp luận, sửa đổi cấu trúc (architecture) hay chuẩn hóa dữ liệu nào được User phê duyệt trên Tuần 33 (Golden Standard) **BẮT BUỘC PHẢI ĐƯỢC CẬP NHẬT ĐỒNG BỘ NGAY LẬP TỨC** vào:
> 1. `AGENTS.md` (Agent Memory & Rules)
> 2. `docs/WEEK_CONTENT_SOP_W34_PLUS.md` (Standard Operating Procedure cho W34–W72)
> 
> Tuyệt đối không để xảy ra tình trạng "sửa xong trong code mà quên cập nhật tài liệu chuẩn", đảm bảo mọi Agent trong các phiên làm việc tiếp theo luôn thừa hưởng kiến trúc mới nhất 100%!
