/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 46 | Theme: "The Pattern Code (Logic)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.169Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 46,
  "theme": "The Pattern Code (Logic)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Noah and Lily Crack the Pattern Code",
    "prompt_en": "Look at the four pictures. Tell a story about Noah and Lily solving visual pattern codes in Professor Bright's arcade lab. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Noah và Lily giải mật mã quy luật trong phòng thí nghiệm của giáo sư Bright (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Noah and Lily visited the logic arcade laboratory on Monday afternoon. First, they observed a sequence of colored beads on the table. Next, Lily identified the repeating rule of red and blue. In the end, they placed the correct shape and solved the puzzle.",
    "word_bank": [
      "pattern",
      "sequence",
      "repeat",
      "next",
      "rule",
      "code",
      "bead",
      "solve",
      "predict",
      "logic"
    ],
    "sentence_frames": [
      "In the beginning, Noah and Lily visited the ___ laboratory.",
      "First, they saw a colorful sequence of glass ___.",
      "Next, Lily identified the repeating pattern ___.",
      "In the end, they used logic to ___ the missing symbol."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Entering the Logic Arcade",
        "title_vi": "Cảnh 1: Bước Vào Phòng Logic",
        "image_url": "/images/week46/writing_panel_1.png",
        "image_prompt": "Two young students standing before a colorful electronic arcade board with glowing colored geometric symbols.",
        "caption": "Noah and Lily arrived at the arcade lab to solve pattern codes.",
        "sentence_frame": "First, Noah and Lily [visited the arcade lab] on [Monday afternoon].",
        "pills": [
          "visited the arcade lab",
          "Monday afternoon",
          "looked at screens",
          "Noah and Lily"
        ],
        "connectors": [
          "First,",
          "On Monday afternoon,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Stringing Colored Beads",
        "title_vi": "Cảnh 2: Xâu Những Hạt Cườm Màu",
        "image_url": "/images/week46/writing_panel_2.png",
        "image_prompt": "A boy threading alternating red and blue beads onto a wire following a chart on the desk.",
        "caption": "Noah threaded red and blue beads following the repeating rule.",
        "sentence_frame": "Next, Noah threaded [red and blue beads] following the [repeating rule].",
        "pills": [
          "red and blue beads",
          "repeating rule",
          "threaded carefully",
          "red then blue"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: The Missing Question Mark",
        "title_vi": "Cảnh 3: Dấu Chấm Hỏi Còn Thiếu",
        "image_url": "/images/week46/writing_panel_3.png",
        "image_prompt": "A girl pointing to a missing slot with a white question mark in a row of geometric wooden tiles.",
        "caption": "Lily analyzed the sequence to predict which tile belonged next.",
        "sentence_frame": "After that, Lily [analyzed the sequence] to [predict the next tile].",
        "pills": [
          "analyzed the sequence",
          "predict the next tile",
          "question mark slot",
          "Lily smiled"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Cracking the Secret Code",
        "title_vi": "Cảnh 4: Phá Giải Mật Mã Bí Mật",
        "image_url": "/images/week46/writing_panel_4.png",
        "image_prompt": "Two children celebrating with an inventor holding a golden trophy as the game board flashes green.",
        "caption": "They placed the final tile and solved the pattern code successfully.",
        "sentence_frame": "In the end, they [placed the final tile] and [cracked the secret code].",
        "pills": [
          "placed the final tile",
          "cracked the secret code",
          "Professor Bright",
          "cheered happily"
        ],
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Scene 1: Entering the Logic Arcade",
        "image_url": "/images/week46/writing_panel_1.png",
        "caption": "Noah and Lily arrived at the arcade lab to solve pattern codes.",
        "frame_L1": "First, Noah and Lily entered the lab. They wanted to crack visual codes using math logic.",
        "connectors": [
          "First,",
          "On Monday afternoon,",
          "In the beginning,"
        ],
        "sentence_hint": "Write 2 sentences about visiting the logic laboratory.",
        "ordered_chips": [
          "Noah and Lily",
          "visited the arcade lab",
          "to crack visual codes",
          "using math logic"
        ],
        "pills": [
          "Noah and Lily",
          "visited the arcade lab",
          "crack visual codes",
          "Monday afternoon"
        ],
        "sentence_frame": "First, Noah and Lily [visited the arcade lab] to test [visual codes]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Stringing Colored Beads",
        "image_url": "/images/week46/writing_panel_2.png",
        "caption": "Noah threaded red and blue beads following the repeating rule.",
        "frame_L1": "Next, Noah strung the beads. He followed the pattern of red circles and blue squares.",
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about Noah stringing the colored beads.",
        "pills": [
          "strung the beads",
          "red circles and blue squares",
          "repeating order",
          "Noah"
        ],
        "sentence_frame": "Next, Noah strung beads following the [repeating order]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: The Missing Question Mark",
        "image_url": "/images/week46/writing_panel_3.png",
        "caption": "Lily analyzed the sequence to predict which tile belonged next.",
        "frame_L1": "After that, Lily saw a question mark. She used logic to predict which colored tile was missing.",
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about Lily predicting the missing tile.",
        "pills": [
          "saw a question mark",
          "used logic to predict",
          "missing tile",
          "Lily"
        ],
        "sentence_frame": "After that, Lily [used logic to predict] the [missing tile]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Cracking the Secret Code",
        "image_url": "/images/week46/writing_panel_4.png",
        "caption": "They placed the final tile and solved the pattern code successfully.",
        "frame_L1": "In the end, they found the rule. They inserted the final tile and cracked the code with Professor Bright.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about completing the code puzzle.",
        "pills": [
          "found the rule",
          "cracked the code",
          "Professor Bright",
          "won the trophy"
        ],
        "sentence_frame": "In the end, they [cracked the secret code] with [Professor Bright]."
      }
    ]
  }
};
export default writingHubData;
