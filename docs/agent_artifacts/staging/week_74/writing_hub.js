/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 74 | Theme: "Science/ELA: Food Chains / Math: Complex Charts" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.697Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 74,
  "theme": "Science/ELA: Food Chains / Math: Complex Charts",
  "cefr_level": "B1 Preliminary",
  "picture_story": {
    "title": "Explaining Dependency in the Forest Food Web",
    "prompt_en": "Look at the four panels. Write a paragraph explaining how energy flows through the forest ecosystem using zero conditional sentences (e.g., 'If plants produce food...', 'If herbivores eat plants...'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn giải thích dòng chảy năng lượng trong hệ sinh thái rừng sử dụng câu điều kiện loại 0 ('If plants produce food...', 'If herbivores eat plants...'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "If green plants absorb bright sunlight, they produce chemical energy through photosynthesis. When herbivores eat these plants, energy transfers to primary consumers. If predators hunt herbivores, they maintain ecological balance in the woodland. When organisms die, decomposers recycle nutrients back into the soil, sustaining the endless food chain.",
    "word_bank": [
      "producer",
      "consumer",
      "predator",
      "prey",
      "energy",
      "herbivore",
      "carnivore",
      "decomposer",
      "ecosystem",
      "balance"
    ],
    "sentence_frames": [
      "If plants absorb sunlight, they act as the primary ___.",
      "When herbivores eat fresh leaves, energy transfers to the ___.",
      "If fierce carnivores hunt prey, they keep the forest in ___.",
      "When living things die, fungi serve as an active ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Sunlight & Producers",
        "title_vi": "Khung 1: Ánh Nắng & Sinh Vật Sản Xuất",
        "image_url": "/images/week74/writing_panel_1.png",
        "image_prompt": "Sunbeams illuminating green oak leaves while a small diagram shows photosynthesis creating plant energy.",
        "caption": "If plants absorb bright sunlight, they generate food energy.",
        "sentence_frame": "If plants [absorb bright sunlight], they [produce vital food energy].",
        "pills": [
          "absorb bright sunlight",
          "produce vital food energy",
          "primary producers",
          "photosynthesis process"
        ],
        "connectors": [
          "If,",
          "Whenever,",
          "When,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Herbivore Consumers",
        "title_vi": "Khung 2: Động Vật Ăn Cỏ Tiêu Thụ",
        "image_url": "/images/week74/writing_panel_2.png",
        "image_prompt": "A fluffy meadow rabbit and tiny caterpillars munching on green clover in a woodland clearing.",
        "caption": "When herbivores consume plants, energy transfers to consumers.",
        "sentence_frame": "When herbivores [consume fresh green leaves], energy [transfers to primary consumers].",
        "pills": [
          "consume fresh green leaves",
          "transfers to primary consumers",
          "meadow rabbits",
          "gentle herbivores"
        ],
        "connectors": [
          "When,",
          "If,",
          "As,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Predators & Prey Balance",
        "title_vi": "Khung 3: Kẻ Săn Mồi & Cân Bằng Con Mồi",
        "image_url": "/images/week74/writing_panel_3.png",
        "image_prompt": "A red-tailed hawk soaring over the meadow while a field mouse hides cautiously under dry grass.",
        "caption": "If predators hunt prey, they maintain natural population balance.",
        "sentence_frame": "If predators [hunt active prey], they [maintain ecological balance] in the forest.",
        "pills": [
          "hunt active prey",
          "maintain ecological balance",
          "red-tailed hawk",
          "fierce carnivore"
        ],
        "connectors": [
          "If,",
          "Whenever,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Decomposer Nutrient Recycling",
        "title_vi": "Khung 4: Sinh Vật Phân Hủy Tái Chế Dinh Dưỡng",
        "image_url": "/images/week74/writing_panel_4.png",
        "image_prompt": "Mushrooms and earthworms breaking down a fallen mossy log into rich dark soil.",
        "caption": "When organisms die, decomposers recycle nutrients into soil.",
        "sentence_frame": "When organisms die, decomposers [recycle vital nutrients] into [fertile woodland soil].",
        "pills": [
          "recycle vital nutrients",
          "fertile woodland soil",
          "enriching new seedlings",
          "completing the food web"
        ],
        "connectors": [
          "Eventually,",
          "When,",
          "In the end,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Primary Producers",
        "image_url": "/images/week74/writing_panel_1.png",
        "caption": "If plants absorb bright sunlight, they generate food energy.",
        "frame_L1": "If green plants absorb sunlight, they produce chemical food. They are primary producers.",
        "connectors": [
          "If,",
          "Whenever,",
          "When,"
        ],
        "sentence_hint": "Write 2 sentences explaining how plants capture sunlight.",
        "ordered_chips": [
          "If plants absorb sunlight,",
          "they manufacture food",
          "as primary producers",
          "in the forest."
        ],
        "pills": [
          "absorb sunlight",
          "manufacture food",
          "primary producers",
          "green leaves"
        ],
        "sentence_frame": "If plants [absorb bright sunlight], they [produce vital food energy]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Primary Consumers",
        "image_url": "/images/week74/writing_panel_2.png",
        "caption": "When herbivores consume plants, energy transfers to consumers.",
        "frame_L1": "When herbivores eat green leaves, energy transfers up. Rabbits act as primary consumers.",
        "connectors": [
          "When,",
          "If,",
          "Next,"
        ],
        "sentence_hint": "Write 2 sentences describing herbivores eating plants.",
        "pills": [
          "eat green leaves",
          "energy transfers",
          "primary consumers",
          "meadow rabbits"
        ],
        "sentence_frame": "When herbivores [eat green plants], energy [moves to the consumer tier]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Predators Maintain Balance",
        "image_url": "/images/week74/writing_panel_3.png",
        "caption": "If predators hunt prey, they maintain natural population balance.",
        "frame_L1": "If predators hunt prey animals, they preserve balance. The hawk keeps mouse numbers steady.",
        "connectors": [
          "If,",
          "Whenever,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about how predators control herbivore populations.",
        "pills": [
          "hunt prey animals",
          "preserve balance",
          "soaring hawk",
          "steady numbers"
        ],
        "sentence_frame": "If predators [hunt active prey], they [keep the ecosystem in balance]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Decomposers Recycle",
        "image_url": "/images/week74/writing_panel_4.png",
        "caption": "When organisms die, decomposers recycle nutrients into soil.",
        "frame_L1": "When organisms die, fungi break down organic matter. Rich nutrients nourish new seedlings.",
        "connectors": [
          "When,",
          "In the end,",
          "Eventually,"
        ],
        "sentence_hint": "Write 2 sentences summarizing nutrient recycling.",
        "pills": [
          "fungi break down matter",
          "rich nutrients nourish",
          "fertile soil",
          "continuous cycle"
        ],
        "sentence_frame": "When organisms die, decomposers [recycle nutrients] into [fertile forest soil]."
      }
    ]
  }
};
export default writingHubData;
