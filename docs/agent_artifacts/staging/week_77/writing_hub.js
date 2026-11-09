/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 77 | Theme: "Social Studies/ELA: World Landmarks / Math: 3D Geometry" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.701Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 77,
  "theme": "Social Studies/ELA: World Landmarks / Math: 3D Geometry",
  "cefr_level": "B1 Preliminary",
  "picture_story": {
    "title": "Technical Architectural Description of a World Landmark",
    "prompt_en": "Look at the four panels. Write a technical description of a famous landmark using adjectives of material ('it is made of...') and shape ('it is shaped like...'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn miêu tả kỹ thuật về một danh thắng nổi tiếng sử dụng tính từ chất liệu ('it is made of...') và hình dáng ('it is shaped like...'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "The Colosseum is a magnificent Roman landmark made of durable concrete and travertine stone. It is shaped like an enormous elliptical cylinder with three tiers of curved arches. Inside, eighty symmetrical entrances allowed thousands of spectators to enter quickly. This historic stone structure demonstrates how geometric arches distribute heavy weight safely.",
    "word_bank": [
      "landmark",
      "architecture",
      "marble",
      "steel",
      "concrete",
      "dome",
      "arch",
      "structure",
      "symmetry",
      "cylindrical"
    ],
    "sentence_frames": [
      "The famous landmark is made of durable ___ and polished stone.",
      "The central palace is shaped like a symmetrical ___ with white towers.",
      "Builders constructed eighty curved ___ to support the upper tiers.",
      "Its outer facade is adorned with smooth ___ panels."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: The Colosseum Arches",
        "title_vi": "Khung 1: Cổng Vòm Colosseum",
        "image_url": "/images/week77/writing_panel_1.png",
        "image_prompt": "The Roman Colosseum showing multiple tiers of stone arches and weathered travertine walls.",
        "caption": "The Colosseum is made of durable volcanic concrete and stone arches.",
        "sentence_frame": "The Colosseum [is made of durable volcanic concrete] and [tiered stone arches].",
        "pills": [
          "is made of durable volcanic concrete",
          "tiered stone arches",
          "ancient Roman amphitheater",
          "travertine stone"
        ],
        "connectors": [
          "First,",
          "In Rome,",
          "Notably,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Elliptical 3D Shape",
        "title_vi": "Khung 2: Hình Dạng Ellip 3D",
        "image_url": "/images/week77/writing_panel_2.png",
        "image_prompt": "An aerial geometric diagram showing the elliptical cylindrical layout of the amphitheater.",
        "caption": "It is shaped like an enormous elliptical cylinder with symmetrical tiers.",
        "sentence_frame": "It [is shaped like an enormous elliptical cylinder] that [holds fifty thousand spectators].",
        "pills": [
          "is shaped like an enormous elliptical cylinder",
          "holds fifty thousand spectators",
          "symmetrical seating tiers",
          "geometric perfection"
        ],
        "connectors": [
          "Furthermore,",
          "Geometrically,",
          "In addition,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: The Marble Taj Mahal Dome",
        "title_vi": "Khung 3: Mái Vòm Cẩm Thạch Taj Mahal",
        "image_url": "/images/week77/writing_panel_3.png",
        "image_prompt": "The white marble Taj Mahal with its bulbous central dome and four tall cylindrical minarets.",
        "caption": "The Taj Mahal is made of polished white marble with a bulbous dome.",
        "sentence_frame": "The Taj Mahal [is made of polished white marble] and [features a bulbous dome].",
        "pills": [
          "is made of polished white marble",
          "features a bulbous dome",
          "cylindrical minarets",
          "perfect reflection"
        ],
        "connectors": [
          "In India,",
          "Similarly,",
          "Meanwhile,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: The Iron Eiffel Tower",
        "title_vi": "Khung 4: Tháp Sắt Eiffel",
        "image_url": "/images/week77/writing_panel_4.png",
        "image_prompt": "The Eiffel Tower in Paris showing intricate crisscrossed iron latticework rising into the sky.",
        "caption": "The Eiffel Tower is made of puddle iron shaped like a pyramid.",
        "sentence_frame": "The Eiffel Tower [is made of puddle iron trusses] shaped [like a soaring pyramid].",
        "pills": [
          "is made of puddle iron trusses",
          "like a soaring pyramid",
          "resists wind shear",
          "metallic framework"
        ],
        "connectors": [
          "Finally,",
          "In Paris,",
          "Ultimately,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Materials of the Colosseum",
        "image_url": "/images/week77/writing_panel_1.png",
        "caption": "The Colosseum is made of durable volcanic concrete and stone arches.",
        "frame_L1": "The Roman Colosseum is made of durable concrete. Stone arches support its heavy outer walls.",
        "connectors": [
          "First,",
          "In Rome,",
          "To begin with,"
        ],
        "sentence_hint": "Write 2 sentences describing the materials of the Colosseum.",
        "ordered_chips": [
          "The Roman Colosseum",
          "is made of volcanic concrete",
          "and sturdy travertine stone",
          "with curved arches."
        ],
        "pills": [
          "is made of volcanic concrete",
          "travertine stone",
          "curved arches",
          "ancient landmark"
        ],
        "sentence_frame": "The Colosseum [is made of durable volcanic concrete] and [supports tiered arches]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: 3D Elliptical Shape",
        "image_url": "/images/week77/writing_panel_2.png",
        "caption": "It is shaped like an enormous elliptical cylinder with symmetrical tiers.",
        "frame_L1": "It is shaped like a giant elliptical cylinder. The curved structure provided safe entrances for spectators.",
        "connectors": [
          "Geometrically,",
          "Furthermore,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences describing the shape and capacity of the amphitheater.",
        "pills": [
          "elliptical cylinder",
          "curved structure",
          "safe entrances",
          "fifty thousand spectators"
        ],
        "sentence_frame": "It [is shaped like an elliptical cylinder] with [tiered stone arches]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: The Marble Dome of Agra",
        "image_url": "/images/week77/writing_panel_3.png",
        "caption": "The Taj Mahal is made of polished white marble with a bulbous dome.",
        "frame_L1": "The Taj Mahal is made of pure white marble. It is crowned with a magnificent dome and four towers.",
        "connectors": [
          "In India,",
          "Similarly,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences about the Taj Mahal's marble and dome.",
        "pills": [
          "pure white marble",
          "magnificent dome",
          "cylindrical towers",
          "symmetrical balance"
        ],
        "sentence_frame": "The Taj Mahal [is made of polished white marble] with [a soaring central dome]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Iron Framework of Paris",
        "image_url": "/images/week77/writing_panel_4.png",
        "caption": "The Eiffel Tower is made of puddle iron shaped like a pyramid.",
        "frame_L1": "The Eiffel Tower is made of sturdy puddle iron. Its pyramid shape allows wind to pass through safely.",
        "connectors": [
          "Finally,",
          "In conclusion,",
          "Ultimately,"
        ],
        "sentence_hint": "Write 2 sentences summarizing iron and geometric engineering.",
        "pills": [
          "sturdy puddle iron",
          "pyramid shape",
          "metallic trusses",
          "historic landmarks"
        ],
        "sentence_frame": "The Eiffel Tower [is made of puddle iron trusses] shaped [like a soaring pyramid]."
      }
    ]
  }
};
export default writingHubData;
