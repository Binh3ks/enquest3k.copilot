/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 37 | Theme: "Living vs. Non-Living (Reasoning)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:07.328Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 37,
  "theme": "Living vs. Non-Living (Reasoning)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Classifying Nature Clues in the Garden",
    "prompt_en": "Look at the four pictures. Tell a story about Mia and Oliver discovering living and non-living things in the school garden. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Mia và Oliver phát hiện các vật sống và không sống trong vườn trường (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Mia and Oliver explored the school garden on Monday morning. First, they observed a green caterpillar feeding on a plant leaf. Next, Oliver picked up a smooth gray rock near the pond. In the end, they explained to Teacher Elena that living things grow and need food, while rocks do not.",
    "word_bank": [
      "living",
      "non-living",
      "breathe",
      "grow",
      "need",
      "food",
      "water",
      "rock",
      "plastic",
      "caterpillar"
    ],
    "sentence_frames": [
      "In the beginning, Mia and Oliver walked into the school ___.",
      "They found a green caterpillar that was ___ on a leaf.",
      "Next, Oliver held a heavy gray ___ that never needs food.",
      "In the end, both children completed their nature ___ chart."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Entering the Garden",
        "title_vi": "Cảnh 1: Bước Vào Khu Vườn",
        "image_url": "/images/week37/writing_panel_1.png",
        "image_prompt": "Two young students holding clipboards and magnifying glasses entering a sunny school vegetable garden.",
        "caption": "Mia and Oliver started their nature detective project in the school garden.",
        "sentence_frame": "First, Mia and Oliver [entered the school garden] on a [bright sunny morning].",
        "pills": [
          "entered the school garden",
          "bright sunny morning",
          "held clipboards",
          "Mia and Oliver"
        ],
        "connectors": [
          "First,",
          "On Monday morning,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Spotting a Caterpillar",
        "title_vi": "Cảnh 2: Nhìn Thấy Sâu Bướm",
        "image_url": "/images/week37/writing_panel_2.png",
        "image_prompt": "A close-up of a smiling girl looking at a green caterpillar crawling on a broad cabbage leaf.",
        "caption": "Mia observed a living caterpillar crawling and feeding on a green leaf.",
        "sentence_frame": "Next, they observed a [green caterpillar] eating a [tender vegetable leaf].",
        "pills": [
          "green caterpillar",
          "tender vegetable leaf",
          "crawling slowly",
          "living creature"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Soon after,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Examining Garden Stones",
        "title_vi": "Cảnh 3: Kiểm Tra Những Viên Đá Vườn",
        "image_url": "/images/week37/writing_panel_3.png",
        "image_prompt": "A boy holding a smooth gray pebble near a garden pond with water lilies.",
        "caption": "Oliver examined a smooth gray rock and explained that it never needs food.",
        "sentence_frame": "After that, Oliver picked up a [smooth gray rock] near the [cool garden pond].",
        "pills": [
          "smooth gray rock",
          "cool garden pond",
          "non-living item",
          "Oliver explained"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Completing the Project",
        "title_vi": "Cảnh 4: Hoàn Thành Dự Án",
        "image_url": "/images/week37/writing_panel_4.png",
        "image_prompt": "Two children showing a colorful classification poster with photos of caterpillars and stones to their teacher.",
        "caption": "They presented their classification poster with clear scientific reasons.",
        "sentence_frame": "In the end, they showed their [classification poster] to [Teacher Elena with big smiles].",
        "pills": [
          "classification poster",
          "Teacher Elena with big smiles",
          "clear reasons",
          "proud children"
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
        "title": "Scene 1: Starting the Project",
        "image_url": "/images/week37/writing_panel_1.png",
        "caption": "Mia and Oliver started their nature detective project in the school garden.",
        "frame_L1": "First, Mia and Oliver walked into the school garden. They carried notebooks to search for living things.",
        "connectors": [
          "First,",
          "On Monday morning,",
          "In the beginning,"
        ],
        "sentence_hint": "Write 2 sentences about entering the school garden.",
        "ordered_chips": [
          "Mia and Oliver",
          "walked into the school garden",
          "to search for",
          "living and non-living things"
        ],
        "pills": [
          "Mia and Oliver",
          "walked into the school garden",
          "held notebooks",
          "sunny morning"
        ],
        "sentence_frame": "First, Mia and Oliver [walked into the school garden] to find [living and non-living things]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Spotting the Caterpillar",
        "image_url": "/images/week37/writing_panel_2.png",
        "caption": "Mia observed a living caterpillar crawling and feeding on a green leaf.",
        "frame_L1": "Next, they spotted a tiny green caterpillar. It was living because it moved and chewed the leaf.",
        "connectors": [
          "Next,",
          "Then,",
          "Soon after,"
        ],
        "sentence_hint": "Write 2 sentences about the caterpillar eating leaves.",
        "pills": [
          "green caterpillar",
          "tender leaf",
          "living creature",
          "breathes air"
        ],
        "sentence_frame": "Next, they spotted a [green caterpillar] that was [chewing a leaf]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: Examining Garden Stones",
        "image_url": "/images/week37/writing_panel_3.png",
        "caption": "Oliver examined a smooth gray rock and explained that it never needs food.",
        "frame_L1": "After that, Oliver found a smooth pebble. He noted that the stone was non-living because it does not grow.",
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences about the rock being non-living.",
        "pills": [
          "smooth pebble",
          "non-living object",
          "does not grow",
          "Oliver held"
        ],
        "sentence_frame": "After that, Oliver found a [smooth pebble] that [does not grow or need food]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Presenting the Poster",
        "image_url": "/images/week37/writing_panel_4.png",
        "caption": "They presented their classification poster with clear scientific reasons.",
        "frame_L1": "In the end, the students shared their poster with Teacher Elena. She was delighted with their clear reasons.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about presenting their project results.",
        "pills": [
          "shared their poster",
          "Teacher Elena",
          "clear reasons",
          "proud smiles"
        ],
        "sentence_frame": "In the end, they [shared their poster] and explained their [clear scientific reasons]."
      }
    ]
  }
};
export default writingHubData;
