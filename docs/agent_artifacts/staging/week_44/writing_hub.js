/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 44 | Theme: "The Cookie Monster (Subtraction Language)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.167Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 44,
  "theme": "The Cookie Monster (Subtraction Language)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Lucas and Chloe's Cookie Subtraction Story",
    "prompt_en": "Look at the four pictures. Tell a story about Lucas and Chloe subtracting cookies in Grandma's kitchen. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Lucas và Chloe làm phép trừ bánh quy trong bếp của bà (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Grandma Baker baked ten delicious cookies on Thursday afternoon. First, the children counted all ten cookies on a plate. Next, Lucas used a blue puppet monster to take away four cookies. In the end, they calculated six cookies left to share with grandpa.",
    "word_bank": [
      "cookies",
      "minus",
      "take away",
      "left",
      "plate",
      "monster",
      "hungry",
      "baked",
      "share",
      "subtract"
    ],
    "sentence_frames": [
      "In the beginning, Grandma baked ten sweet ___ on a tray.",
      "First, Lucas and Chloe counted them on the kitchen ___.",
      "Next, a playful puppet monster came to ___ four cookies.",
      "In the end, ten minus four leaves six cookies ___ to share."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Fresh Batch of Cookies",
        "title_vi": "Cảnh 1: Mẻ Bánh Quy Mới",
        "image_url": "/images/week44/writing_panel_1.png",
        "image_prompt": "Grandma Baker showing ten warm chocolate cookies on a metal baking tray to two smiling children.",
        "caption": "Grandma baked ten delicious cookies on a shiny metal tray.",
        "sentence_frame": "First, Grandma Baker [baked ten cookies] on a [shiny baking tray].",
        "pills": [
          "baked ten cookies",
          "shiny baking tray",
          "smelled wonderful",
          "Thursday afternoon"
        ],
        "connectors": [
          "First,",
          "On Thursday afternoon,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Counting on the Plate",
        "title_vi": "Cảnh 2: Đếm Bánh Trên Đĩa",
        "image_url": "/images/week44/writing_panel_2.png",
        "image_prompt": "A boy and girl pointing and counting ten cookies arranged neatly on a ceramic plate.",
        "caption": "Lucas and Chloe counted all ten cookies together on the plate.",
        "sentence_frame": "Next, Lucas and Chloe [counted ten cookies] on the [white ceramic plate].",
        "pills": [
          "counted ten cookies",
          "white ceramic plate",
          "counted aloud",
          "ten sweet treats"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Monster Takes Away Four",
        "title_vi": "Cảnh 3: Quái Vật Lấy Bớt Bốn Chiếc",
        "image_url": "/images/week44/writing_panel_3.png",
        "image_prompt": "Lucas using a blue furry puppet monster to take away four cookies from the plate into a napkin.",
        "caption": "A playful puppet monster took away four cookies for snack time.",
        "sentence_frame": "After that, the [puppet monster] took [away four cookies] for snack.",
        "pills": [
          "puppet monster",
          "away four cookies",
          "took them away",
          "laughed cheerfully"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Six Cookies Left",
        "title_vi": "Cảnh 4: Còn Lại Sáu Chiếc Bánh",
        "image_url": "/images/week44/writing_panel_4.png",
        "image_prompt": "Children writing on a chalkboard 10 - 4 = 6 with six remaining cookies on the table.",
        "caption": "They calculated that ten minus four equals six cookies left.",
        "sentence_frame": "In the end, they [calculated that six cookies] were [left on the plate].",
        "pills": [
          "calculated that six cookies",
          "left on the plate",
          "ten minus four",
          "shared with grandpa"
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
        "title": "Scene 1: Fresh Batch of Cookies",
        "image_url": "/images/week44/writing_panel_1.png",
        "caption": "Grandma baked ten delicious cookies on a shiny metal tray.",
        "frame_L1": "First, Grandma baked ten sweet cookies. She placed the warm baking tray on the wooden table.",
        "connectors": [
          "First,",
          "On Thursday afternoon,",
          "In the beginning,"
        ],
        "sentence_hint": "Write 2 sentences about Grandma baking ten sweet cookies.",
        "ordered_chips": [
          "Grandma baked",
          "ten sweet cookies",
          "on the warm tray",
          "in the kitchen"
        ],
        "pills": [
          "Grandma baked",
          "ten sweet cookies",
          "warm baking tray",
          "wooden table"
        ],
        "sentence_frame": "First, Grandma baked [ten sweet cookies] on a [warm baking tray]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Counting on the Plate",
        "image_url": "/images/week44/writing_panel_2.png",
        "caption": "Lucas and Chloe counted all ten cookies together on the plate.",
        "frame_L1": "Next, the children counted the cookies. There were ten round treats resting on the plate.",
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about counting the ten cookies on the plate.",
        "pills": [
          "counted the cookies",
          "ten round treats",
          "on the plate",
          "Lucas and Chloe"
        ],
        "sentence_frame": "Next, Lucas and Chloe [counted ten cookies] on the [serving plate]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: Monster Takes Away Four",
        "image_url": "/images/week44/writing_panel_3.png",
        "caption": "A playful puppet monster took away four cookies for snack time.",
        "frame_L1": "After that, Lucas put on a puppet. The blue Cookie Monster took away four cookies for tea.",
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about taking away four cookies.",
        "pills": [
          "puppet monster",
          "took away four cookies",
          "for afternoon tea",
          "Lucas laughed"
        ],
        "sentence_frame": "After that, the [puppet monster] took away [four sweet cookies]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Six Cookies Left",
        "image_url": "/images/week44/writing_panel_4.png",
        "caption": "They calculated that ten minus four equals six cookies left.",
        "frame_L1": "In the end, Chloe wrote the math problem. Ten minus four leaves six cookies left to share.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about how many cookies are left to share.",
        "pills": [
          "ten minus four",
          "leaves six cookies left",
          "shared with grandpa",
          "smiled proudly"
        ],
        "sentence_frame": "In the end, ten minus four leaves [six cookies left] to [share with grandpa]."
      }
    ]
  }
};
export default writingHubData;
