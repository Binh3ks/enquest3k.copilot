/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 40 | Theme: "Beast Battle (Comparisons)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.161Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 40,
  "theme": "Beast Battle (Comparisons)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Comparing Wild Predators at the Museum",
    "prompt_en": "Look at the four pictures. Tell a story about Marcus and Maya comparing animals at the Beast Arena exhibition. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Marcus và Maya so sánh các loài thú săn mồi tại triển lãm (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Marcus and Maya visited the Natural History Museum on Friday afternoon. First, they looked at the Siberian tiger with its sharp teeth. Next, they saw that the cheetah was lighter and faster. In the end, they learned how each predator uses its strength to survive.",
    "word_bank": [
      "tiger",
      "cheetah",
      "stronger",
      "faster",
      "heavier",
      "claws",
      "teeth",
      "fur",
      "compare",
      "predator"
    ],
    "sentence_frames": [
      "In the beginning, Marcus and Maya visited the museum's ___ exhibit.",
      "They observed that the Siberian tiger had very sharp ___.",
      "Beside it, the lean cheetah was much lighter and ___.",
      "In the end, they learned that each predator has a unique ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Museum Beast Exhibition",
        "title_vi": "Cảnh 1: Triển Lãm Dã Thú",
        "image_url": "/images/week40/writing_panel_1.png",
        "image_prompt": "Two children looking at an informative museum wall chart comparing tiger, lion, and cheetah sizes.",
        "caption": "Marcus and Maya arrived at the museum to compare wild predators.",
        "sentence_frame": "First, Marcus and Maya [visited the museum exhibition] on [Friday afternoon].",
        "pills": [
          "visited the museum exhibition",
          "Friday afternoon",
          "looked at the chart",
          "Marcus and Maya"
        ],
        "connectors": [
          "First,",
          "On Friday afternoon,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Examining Tiger Strength",
        "title_vi": "Cảnh 2: Khám Phá Sức Mạnh Loài Hổ",
        "image_url": "/images/week40/writing_panel_2.png",
        "image_prompt": "A life-size model of a striped Siberian tiger showing sharp teeth and heavy muscular paws.",
        "caption": "They noticed that the tiger was bigger and heavier than other cats.",
        "sentence_frame": "Next, they saw that the [Siberian tiger] was much [stronger and heavier].",
        "pills": [
          "Siberian tiger",
          "stronger and heavier",
          "sharp white teeth",
          "heavy paws"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Examining Cheetah Speed",
        "title_vi": "Cảnh 3: Khám Phá Tốc Độ Báo Săn",
        "image_url": "/images/week40/writing_panel_3.png",
        "image_prompt": "A sleek cheetah model poised in a running stance showing black spots and lean muscular legs.",
        "caption": "The cheetah had a lighter body that allowed it to run faster.",
        "sentence_frame": "After that, they learned that the [cheetah was lighter] and [ran much faster].",
        "pills": [
          "cheetah was lighter",
          "ran much faster",
          "black spots",
          "lean body"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Completing Science Notes",
        "title_vi": "Cảnh 4: Hoàn Thành Ghi Chép Khoa Học",
        "image_url": "/images/week40/writing_panel_4.png",
        "image_prompt": "Two happy children writing on clipboards with a zoologist holding a model paw print.",
        "caption": "They completed their science notes comparing predator strength and speed.",
        "sentence_frame": "In the end, they completed their [science project comparing] wild [animal predators].",
        "pills": [
          "science project comparing",
          "animal predators",
          "wrote notes",
          "smiled proudly"
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
        "title": "Scene 1: Museum Beast Exhibition",
        "image_url": "/images/week40/writing_panel_1.png",
        "caption": "Marcus and Maya arrived at the museum to compare wild predators.",
        "frame_L1": "First, Marcus and Maya visited the museum. They wanted to compare the size and speed of wild predators.",
        "connectors": [
          "First,",
          "On Friday afternoon,",
          "In the beginning,"
        ],
        "sentence_hint": "Write 2 sentences about visiting the museum exhibition.",
        "ordered_chips": [
          "Marcus and Maya",
          "visited the museum",
          "to compare size and speed",
          "of wild predators"
        ],
        "pills": [
          "Marcus and Maya",
          "visited the museum",
          "looked at charts",
          "Friday afternoon"
        ],
        "sentence_frame": "First, Marcus and Maya [visited the museum] to compare [wild predators]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Examining Tiger Strength",
        "image_url": "/images/week40/writing_panel_2.png",
        "caption": "They noticed that the tiger was bigger and heavier than other cats.",
        "frame_L1": "Next, they observed the Siberian tiger. It was much heavier than a cheetah and had sharp teeth.",
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about the tiger's strength and teeth.",
        "pills": [
          "Siberian tiger",
          "heavier than a cheetah",
          "sharp white teeth",
          "Marcus"
        ],
        "sentence_frame": "Next, they saw that the [Siberian tiger] was [heavier than a cheetah]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: Examining Cheetah Speed",
        "image_url": "/images/week40/writing_panel_3.png",
        "caption": "The cheetah had a lighter body that allowed it to run faster.",
        "frame_L1": "After that, they looked at the spotted cheetah. Its light body helped it run faster across open plains.",
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about the cheetah's speed.",
        "pills": [
          "spotted cheetah",
          "ran faster",
          "light body",
          "open plains"
        ],
        "sentence_frame": "After that, they saw that the [spotted cheetah] ran [faster across open plains]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Completing Science Notes",
        "image_url": "/images/week40/writing_panel_4.png",
        "caption": "They completed their science notes comparing predator strength and speed.",
        "frame_L1": "In the end, they talked with Dr. Miller. They proudly completed their notes comparing predator traits.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about completing the comparison project.",
        "pills": [
          "Dr. Miller",
          "completed their notes",
          "comparing predator traits",
          "smiled proudly"
        ],
        "sentence_frame": "In the end, they completed their notes [comparing predator traits] with [Dr. Miller]."
      }
    ]
  }
};
export default writingHubData;
