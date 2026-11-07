/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 43 | Theme: "The "Plus" Machine (Addition Language)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.165Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 43,
  "theme": "The \"Plus\" Machine (Addition Language)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Alex and Mia Test the Plus Machine",
    "prompt_en": "Look at the four pictures. Tell a story about Alex and Mia testing the Plus Machine in Mr. Davis's workshop. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Alex và Mia thử nghiệm Cỗ Máy Cộng trong xưởng của thầy Davis (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Alex and Mia visited Mr. Davis's invention workshop on Wednesday afternoon. First, Alex placed four red blocks into the wooden chute. Next, Mia added three green blocks to the tray. Then, they pulled the lever to combine the toys. In the end, they calculated seven blocks altogether.",
    "word_bank": [
      "plus",
      "machine",
      "add",
      "equals",
      "total",
      "combine",
      "marbles",
      "blocks",
      "together",
      "calculate"
    ],
    "sentence_frames": [
      "In the beginning, Alex and Mia visited the workshop's ___ machine.",
      "First, Alex dropped four shiny red ___ down the chute.",
      "Next, Mia added three blue marbles to ___ the two groups.",
      "In the end, four plus three ___ seven marbles in total."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Entering the Workshop",
        "title_vi": "Cảnh 1: Bước Vào Xưởng Sáng Chế",
        "image_url": "/images/week43/writing_panel_1.png",
        "image_prompt": "Two young students standing beside a creative wooden machine with two top funnel chutes and numbered dials.",
        "caption": "Alex and Mia arrived at the workshop to test the mechanical Plus Machine.",
        "sentence_frame": "First, Alex and Mia [visited the math workshop] to [test the Plus Machine].",
        "pills": [
          "visited the math workshop",
          "test the Plus Machine",
          "looked at dials",
          "Wednesday afternoon"
        ],
        "connectors": [
          "First,",
          "On Wednesday afternoon,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Dropping First Marbles",
        "title_vi": "Cảnh 2: Thả Lượt Bi Đầu Tiên",
        "image_url": "/images/week43/writing_panel_2.png",
        "image_prompt": "A boy dropping four red glass marbles into the left wooden hopper chute.",
        "caption": "Alex counted and dropped four red marbles into the left chute.",
        "sentence_frame": "Next, Alex dropped [four red marbles] into the [left wooden chute].",
        "pills": [
          "four red marbles",
          "left wooden chute",
          "counted carefully",
          "rolled smoothly"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Adding Second Group",
        "title_vi": "Cảnh 3: Thêm Nhóm Bi Thứ Hai",
        "image_url": "/images/week43/writing_panel_3.png",
        "image_prompt": "A girl adding three shiny blue marbles into the right spiraling chute of the wooden machine.",
        "caption": "Mia added three blue marbles into the right chute to combine them.",
        "sentence_frame": "After that, Mia [added three blue marbles] into the [right spiraling chute].",
        "pills": [
          "added three blue marbles",
          "right spiraling chute",
          "combined the groups",
          "Mia smiled"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Counting the Total",
        "title_vi": "Cảnh 4: Đếm Tổng Số",
        "image_url": "/images/week43/writing_panel_4.png",
        "image_prompt": "Two children and an older inventor smiling as seven marbles rest in the collection tray under an equation sign.",
        "caption": "They pulled the lever and read that four plus three equals seven.",
        "sentence_frame": "In the end, they pulled the [metal lever] and [calculated seven marbles altogether].",
        "pills": [
          "metal lever",
          "calculated seven marbles altogether",
          "read the equation",
          "laughed happily"
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
        "title": "Scene 1: Entering the Workshop",
        "image_url": "/images/week43/writing_panel_1.png",
        "caption": "Alex and Mia arrived at the workshop to test the mechanical Plus Machine.",
        "frame_L1": "First, Alex and Mia entered the workshop. They wanted to test how the Plus Machine combines numbers.",
        "connectors": [
          "First,",
          "On Wednesday afternoon,",
          "In the beginning,"
        ],
        "sentence_hint": "Write 2 sentences about visiting the inventor's workshop.",
        "ordered_chips": [
          "Alex and Mia",
          "visited the workshop",
          "to test how",
          "numbers combine"
        ],
        "pills": [
          "Alex and Mia",
          "visited the workshop",
          "Plus Machine",
          "Wednesday afternoon"
        ],
        "sentence_frame": "First, Alex and Mia [visited the workshop] to test the [Plus Machine]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Dropping First Marbles",
        "image_url": "/images/week43/writing_panel_2.png",
        "caption": "Alex counted and dropped four red marbles into the left chute.",
        "frame_L1": "Next, Alex took four red marbles. He dropped them carefully into the left wooden hopper.",
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about dropping the four red marbles.",
        "pills": [
          "four red marbles",
          "left wooden hopper",
          "counted carefully",
          "Alex"
        ],
        "sentence_frame": "Next, Alex dropped [four red marbles] into the [left wooden hopper]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: Adding Second Group",
        "image_url": "/images/week43/writing_panel_3.png",
        "caption": "Mia added three blue marbles into the right chute to combine them.",
        "frame_L1": "After that, Mia held three blue marbles. She added them into the right chute to join the groups.",
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about Mia adding the blue marbles.",
        "pills": [
          "three blue marbles",
          "right chute",
          "join the groups",
          "Mia"
        ],
        "sentence_frame": "After that, Mia added [three blue marbles] to [join the groups]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Counting the Total",
        "image_url": "/images/week43/writing_panel_4.png",
        "caption": "They pulled the lever and read that four plus three equals seven.",
        "frame_L1": "In the end, they pulled the lever. Seven marbles rolled out, and they happily said four plus three equals seven.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about pulling the lever and stating the equation.",
        "pills": [
          "pulled the lever",
          "seven marbles rolled out",
          "equals seven",
          "read the math sentence"
        ],
        "sentence_frame": "In the end, they pulled the lever and stated that [four plus three equals seven]."
      }
    ]
  }
};
export default writingHubData;
