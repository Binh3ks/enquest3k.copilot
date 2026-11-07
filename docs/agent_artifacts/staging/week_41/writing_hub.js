/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 41 | Theme: "Life Cycles (Process)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.163Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 41,
  "theme": "Life Cycles (Process)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Oliver and Sophia's Butterfly Observation Project",
    "prompt_en": "Look at the four pictures. Tell a story about Oliver and Sophia observing the life cycle of a butterfly in the garden. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Oliver và Sophia quan sát vòng đời bươm bướm trong vườn (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Oliver and Sophia studied the garden plants during science class on Tuesday. First, they discovered a tiny egg on a leaf. Next, a hungry caterpillar hatched and ate daily. Then, it formed a protective chrysalis. In the end, a colorful butterfly flew gracefully into the sunny sky.",
    "word_bank": [
      "caterpillar",
      "butterfly",
      "chrysalis",
      "hatched",
      "leaf",
      "stage",
      "cycle",
      "wings",
      "grows",
      "changes"
    ],
    "sentence_frames": [
      "In the morning, Oliver and Sophia found a tiny ___ on a leaf.",
      "Soon, a green caterpillar hatched and began to ___.",
      "Next, it hung upside down and formed a green ___.",
      "In the end, a bright butterfly emerged with colorful ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Finding the Egg",
        "title_vi": "Cảnh 1: Tìm Thấy Quả Trứng",
        "image_url": "/images/week41/writing_panel_1.png",
        "image_prompt": "Two young students using hand lenses to look at a tiny butterfly egg on a broad green plant leaf.",
        "caption": "Oliver and Sophia discovered a tiny round egg resting on a garden leaf.",
        "sentence_frame": "First, Oliver and Sophia [discovered a tiny egg] on a [broad green leaf].",
        "pills": [
          "discovered a tiny egg",
          "broad green leaf",
          "looked with lenses",
          "Tuesday morning"
        ],
        "connectors": [
          "First,",
          "On Tuesday morning,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: The Feeding Caterpillar",
        "title_vi": "Cảnh 2: Chú Sâu Bướm Kiếm Ăn",
        "image_url": "/images/week41/writing_panel_2.png",
        "image_prompt": "A striped caterpillar chewing fresh green leaves inside an observation jar with air holes.",
        "caption": "A striped caterpillar hatched from the egg and fed on fresh green leaves.",
        "sentence_frame": "Next, a striped [caterpillar hatched] and [fed on fresh leaves].",
        "pills": [
          "caterpillar hatched",
          "fed on fresh leaves",
          "grew bigger",
          "every day"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: The Hanging Chrysalis",
        "title_vi": "Cảnh 3: Kén Nhộng Treo Ngược",
        "image_url": "/images/week41/writing_panel_3.png",
        "image_prompt": "A jade-green chrysalis with tiny golden dots hanging from a twig under the wooden lid of the cage.",
        "caption": "The caterpillar formed a peaceful chrysalis to undergo metamorphosis.",
        "sentence_frame": "After that, it [formed a green chrysalis] and [stayed very quiet].",
        "pills": [
          "formed a green chrysalis",
          "stayed very quiet",
          "inside the case",
          "changed slowly"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: The Butterfly Flight",
        "title_vi": "Cảnh 4: Chú Bướm Bay Lượn",
        "image_url": "/images/week41/writing_panel_4.png",
        "image_prompt": "An orange and black monarch butterfly taking off into the bright garden air as the children cheer.",
        "caption": "A magnificent butterfly emerged and flew toward the sunny flower garden.",
        "sentence_frame": "In the end, an [adult butterfly emerged] and [spread its colorful wings].",
        "pills": [
          "adult butterfly emerged",
          "spread its colorful wings",
          "flew into the garden",
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
        "title": "Scene 1: Finding the Egg",
        "image_url": "/images/week41/writing_panel_1.png",
        "caption": "Oliver and Sophia discovered a tiny round egg resting on a garden leaf.",
        "frame_L1": "First, Oliver and Sophia explored the garden. They found a tiny butterfly egg on a green plant leaf.",
        "connectors": [
          "First,",
          "On Tuesday morning,",
          "In the beginning,"
        ],
        "sentence_hint": "Write 2 sentences about finding the tiny egg in the garden.",
        "ordered_chips": [
          "Oliver and Sophia",
          "found a tiny egg",
          "resting on a leaf",
          "in the garden"
        ],
        "pills": [
          "Oliver and Sophia",
          "tiny butterfly egg",
          "garden leaf",
          "Tuesday morning"
        ],
        "sentence_frame": "First, Oliver and Sophia found a [tiny butterfly egg] on a [garden leaf]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: The Feeding Caterpillar",
        "image_url": "/images/week41/writing_panel_2.png",
        "caption": "A striped caterpillar hatched from the egg and fed on fresh green leaves.",
        "frame_L1": "Next, a hungry caterpillar hatched out. It ate green leaves quickly and grew bigger every day.",
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about the caterpillar hatching and eating.",
        "pills": [
          "hungry caterpillar",
          "ate green leaves",
          "grew bigger",
          "every day"
        ],
        "sentence_frame": "Next, a [hungry caterpillar] hatched and [ate green leaves] to grow."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: The Hanging Chrysalis",
        "image_url": "/images/week41/writing_panel_3.png",
        "caption": "The caterpillar formed a peaceful chrysalis to undergo metamorphosis.",
        "frame_L1": "After that, the caterpillar hung from a branch. It built a firm chrysalis where its body changed.",
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about forming the chrysalis.",
        "pills": [
          "hung from a branch",
          "firm chrysalis",
          "body changed",
          "stayed quiet"
        ],
        "sentence_frame": "After that, the caterpillar [built a firm chrysalis] where its [body changed]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: The Butterfly Flight",
        "image_url": "/images/week41/writing_panel_4.png",
        "caption": "A magnificent butterfly emerged and flew toward the sunny flower garden.",
        "frame_L1": "In the end, a lovely butterfly flew out. It dried its orange wings and flew toward the bright flowers.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about the butterfly drying its wings and flying.",
        "pills": [
          "lovely butterfly",
          "dried its orange wings",
          "flew into the sunlight",
          "smiled proudly"
        ],
        "sentence_frame": "In the end, a [lovely butterfly] emerged and [flew into the sunlight]."
      }
    ]
  }
};
export default writingHubData;
