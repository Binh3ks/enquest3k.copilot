/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 39 | Theme: "Habitats (Persuasion Intro)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.159Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 39,
  "theme": "Habitats (Persuasion Intro)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Matching Animals to Safe Habitats",
    "prompt_en": "Look at the four pictures. Tell a story about Liam and Emma helping animals find their natural habitats. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Liam và Emma giúp các loài động vật tìm về môi trường sống an toàn (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Liam and Emma visited the wildlife sanctuary on Saturday morning. First, they saw a desert tortoise walking slowly across dry sand. Next, they observed a colorful parrot resting in the rainforest canopy. In the end, they agreed that every animal belongs in its natural habitat.",
    "word_bank": [
      "habitat",
      "desert",
      "rainforest",
      "canopy",
      "shelter",
      "belong",
      "opinion",
      "safe",
      "creature",
      "survive"
    ],
    "sentence_frames": [
      "In the beginning, Liam and Emma visited the ___ nature reserve.",
      "They believed that the desert tortoise belongs in a warm ___.",
      "High above, colorful parrots rested inside the green ___.",
      "In the end, everyone agreed that wild animals need a ___ home."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Visiting Nature Reserve",
        "title_vi": "Cảnh 1: Thăm Khu Bảo Tồn",
        "image_url": "/images/week39/writing_panel_1.png",
        "image_prompt": "Two children with backpacks looking at an outdoor wildlife sanctuary map with desert, forest, and ocean zones.",
        "caption": "Liam and Emma visited the wildlife reserve to learn about animal habitats.",
        "sentence_frame": "First, Liam and Emma [visited the wildlife reserve] on a [sunny Saturday morning].",
        "pills": [
          "visited the wildlife reserve",
          "sunny Saturday morning",
          "looked at the map",
          "Liam and Emma"
        ],
        "connectors": [
          "First,",
          "On Saturday morning,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Sandy Desert Zone",
        "title_vi": "Cảnh 2: Khu Vực Sa Mạc Cát",
        "image_url": "/images/week39/writing_panel_2.png",
        "image_prompt": "A friendly tortoise resting near a sandy burrow beside small desert rocks and green cacti.",
        "caption": "They observed a desert tortoise near its warm underground burrow.",
        "sentence_frame": "Next, they saw a [desert tortoise] resting beside its [sandy burrow].",
        "pills": [
          "desert tortoise",
          "sandy burrow",
          "warm dry rocks",
          "crawled slowly"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Rainforest Canopy Zone",
        "title_vi": "Cảnh 3: Tầng Tán Rừng Mưa",
        "image_url": "/images/week39/writing_panel_3.png",
        "image_prompt": "A bright green parrot perching on a flowering tree branch high in a leafy rainforest canopy.",
        "caption": "A bright parrot called out from the tall rainforest canopy.",
        "sentence_frame": "After that, they spotted a [colorful parrot] high in the [leafy rainforest canopy].",
        "pills": [
          "colorful parrot",
          "leafy rainforest canopy",
          "tall green branches",
          "flew gracefully"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Happy Conclusion",
        "title_vi": "Cảnh 4: Kết Luận Hạnh Phúc",
        "image_url": "/images/week39/writing_panel_4.png",
        "image_prompt": "Two smiling children talking with a park ranger in front of a green wooden wildlife protection sign.",
        "caption": "Everyone agreed that every creature needs a safe natural habitat.",
        "sentence_frame": "In the end, they agreed that [every animal belongs] in its [safe natural habitat].",
        "pills": [
          "every animal belongs",
          "safe natural habitat",
          "gave a thumbs up",
          "smiled happily"
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
        "title": "Scene 1: Visiting Nature Reserve",
        "image_url": "/images/week39/writing_panel_1.png",
        "caption": "Liam and Emma visited the wildlife reserve to learn about animal habitats.",
        "frame_L1": "First, Liam and Emma visited the wildlife reserve. They wanted to learn where each animal lives safely.",
        "connectors": [
          "First,",
          "On Saturday morning,",
          "In the beginning,"
        ],
        "sentence_hint": "Write 2 sentences about visiting the wildlife reserve.",
        "ordered_chips": [
          "Liam and Emma",
          "visited the wildlife reserve",
          "to learn where",
          "animals live safely"
        ],
        "pills": [
          "Liam and Emma",
          "visited the wildlife reserve",
          "looked at the map",
          "sunny morning"
        ],
        "sentence_frame": "First, Liam and Emma [visited the wildlife reserve] to learn where [animals live safely]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Sandy Desert Zone",
        "image_url": "/images/week39/writing_panel_2.png",
        "caption": "They observed a desert tortoise near its warm underground burrow.",
        "frame_L1": "Next, they saw a desert tortoise. It crawled slowly toward a cool sandy burrow.",
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about the tortoise and its burrow.",
        "pills": [
          "desert tortoise",
          "sandy burrow",
          "crawled slowly",
          "Liam"
        ],
        "sentence_frame": "Next, they saw a [desert tortoise] crawling near a [sandy burrow]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: Rainforest Canopy Zone",
        "image_url": "/images/week39/writing_panel_3.png",
        "caption": "A bright parrot called out from the tall rainforest canopy.",
        "frame_L1": "After that, they spotted a colorful parrot. It flew high into the green rainforest canopy.",
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about the parrot in the canopy.",
        "pills": [
          "colorful parrot",
          "rainforest canopy",
          "flew high",
          "green branches"
        ],
        "sentence_frame": "After that, they spotted a [colorful parrot] high in the [rainforest canopy]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Safe Animal Habitats",
        "image_url": "/images/week39/writing_panel_4.png",
        "caption": "Everyone agreed that every creature needs a safe natural habitat.",
        "frame_L1": "In the end, the children spoke with Ranger David. They agreed that every animal belongs in a safe habitat.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about keeping animal habitats safe.",
        "pills": [
          "every animal belongs",
          "safe habitat",
          "Ranger David",
          "smiled happily"
        ],
        "sentence_frame": "In the end, they agreed that [every animal belongs] in a [safe habitat]."
      }
    ]
  }
};
export default writingHubData;
