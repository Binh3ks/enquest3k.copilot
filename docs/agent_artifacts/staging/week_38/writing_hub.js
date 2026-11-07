/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 38 | Theme: "Animal Abilities (Modals)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T07:16:42.028Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 38,
  "theme": "Animal Abilities (Modals)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Animal Adaptations & Special Abilities",
    "prompt_en": "Look at the pictures. Write about what these wild animals can and cannot do. Write 20 or more words.",
    "prompt_vi": "Nhìn vào các bức tranh. Viết về những việc các loài động vật hoang dã có thể và không thể làm (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Wild animals have amazing abilities suited to their habitats. On open grasslands, agile cheetahs can run at astonishing speeds to catch prey. In contrast, heavy elephants cannot jump off the ground, but they can swim across wide rivers. High above rocky cliffs, golden eagles can fly and glide effortlessly. Finally, aquatic penguins cannot fly in the air, but they can dive deeply into water to hunt fish.",
    "word_bank": [
      "run",
      "fly",
      "swim",
      "dive",
      "jump",
      "hunt",
      "glide",
      "burrow",
      "survive",
      "agile",
      "predator",
      "habitat"
    ],
    "sentence_frames": [
      "On the savanna, cheetahs can ___ faster than other animals.",
      "Large elephants cannot ___, but they can ___ across rivers.",
      "Golden eagles can ___ high in the sky with hollow bones.",
      "Penguins cannot fly, but they can ___ deeply into the sea."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Cheetah Sprint on the Plains",
        "title_vi": "Cảnh 1: Báo Săn Bứt Tốc Trên Thảo Nguyên",
        "image_url": "/images/week38/writing_panel_1.png",
        "image_prompt": "A sleek cheetah sprinting across golden African savanna grasslands, motion blur, wildlife documentary style.",
        "caption": "Agile cheetahs can run across open savanna grasslands at astonishing speed.",
        "sentence_frame": "On the savanna, the agile cheetah [can run faster] than [any other land animal].",
        "pills": [
          "can run faster",
          "any other land animal",
          "across open grasslands",
          "agile predator",
          "hunt fast prey"
        ],
        "connectors": [
          "First,",
          "On the savanna,",
          "In the grasslands,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Heavy Elephants in River",
        "title_vi": "Cảnh 2: Đàn Voi Bơi Dưới Lòng Sông",
        "image_url": "/images/week38/writing_panel_2.png",
        "image_prompt": "Two large gray elephants wading and swimming in a wide jungle river with water splashing, sunny day.",
        "caption": "Large elephants cannot jump off the ground, but they can swim across deep rivers.",
        "sentence_frame": "Large gray elephants [cannot jump] because [their bodies are heavy], but they [can swim across rivers].",
        "pills": [
          "cannot jump",
          "their bodies are heavy",
          "can swim across rivers",
          "powerful legs",
          "strong trunk"
        ],
        "connectors": [
          "In contrast,",
          "However,",
          "Near the river,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Soaring Golden Eagles",
        "title_vi": "Cảnh 3: Đại Bàng Lượn Giữa Đỉnh Núi",
        "image_url": "/images/week38/writing_panel_3.png",
        "image_prompt": "A majestic golden eagle gliding high above snow-capped mountain peaks with wings spread wide against a blue sky.",
        "caption": "Golden eagles can fly high above the rocky mountain peaks using hollow bones.",
        "sentence_frame": "Golden eagles [can fly high] in the sky because they have [lightweight hollow bones].",
        "pills": [
          "can fly high",
          "lightweight hollow bones",
          "glide effortlessly",
          "above mountain peaks",
          "sharp vision"
        ],
        "connectors": [
          "High above,",
          "In the sky,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Diving Aquatic Penguins",
        "title_vi": "Cảnh 4: Chim Cánh Cụt Lặn Sâu Săn Mồi",
        "image_url": "/images/week38/writing_panel_4.png",
        "image_prompt": "Penguins diving underwater through crystal blue polar waters among icebergs, hunting small silver fish.",
        "caption": "Aquatic penguins cannot fly in the air, but they can dive deeply into cold water to hunt.",
        "sentence_frame": "Penguins [cannot fly in the sky], but their flipper wings allow them to [dive deeply into water].",
        "pills": [
          "cannot fly in the sky",
          "dive deeply into water",
          "hunt silver fish",
          "rigid flipper wings",
          "aquatic habitat"
        ],
        "connectors": [
          "Finally,",
          "Underwater,",
          "In conclusion,"
        ]
      }
    ],
    "steps": [
      {
        "scene": 1,
        "ladder_stage": "MODEL",
        "badge_label": "MODEL",
        "title": "Scene 1: Cheetah Sprint on the Plains",
        "image_url": "/images/week38/writing_panel_1.png",
        "caption": "Agile cheetahs can run across open savanna grasslands at astonishing speed.",
        "frame_L1": "On the savanna, agile cheetahs can run very fast. They can run faster than any other land animal.",
        "connectors": [
          "First,",
          "On the savanna,",
          "In the grasslands,"
        ],
        "sentence_hint": "Write 2 sentences about cheetahs running fast across grasslands.",
        "pills": [
          "can run faster",
          "any other land animal",
          "across grasslands",
          "agile cheetah"
        ],
        "sentence_frame": "On the savanna, the agile cheetah [can run faster] than [any other land animal]."
      },
      {
        "scene": 2,
        "ladder_stage": "BUILD",
        "badge_label": "BUILD",
        "title": "Scene 2: Heavy Elephants in River",
        "image_url": "/images/week38/writing_panel_2.png",
        "caption": "Large elephants cannot jump off the ground, but they can swim across deep rivers.",
        "frame_L1": "In contrast, large elephants cannot jump because they are heavy. However, they can swim across wide rivers.",
        "connectors": [
          "In contrast,",
          "However,",
          "Near the river,"
        ],
        "sentence_hint": "Write 2 sentences about what elephants cannot do and what they can do.",
        "pills": [
          "cannot jump",
          "are very heavy",
          "can swim across rivers",
          "large elephants"
        ],
        "sentence_frame": "Large gray elephants [cannot jump] because [their bodies are heavy], but they [can swim across rivers]."
      },
      {
        "scene": 3,
        "ladder_stage": "WRITE",
        "badge_label": "WRITE",
        "title": "Scene 3: Soaring Golden Eagles",
        "image_url": "/images/week38/writing_panel_3.png",
        "caption": "Golden eagles can fly high above the rocky mountain peaks using hollow bones.",
        "frame_L1": "High above the mountains, golden eagles can fly easily. They can glide in strong winds because they have hollow bones.",
        "connectors": [
          "High above,",
          "In the sky,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about eagles flying and gliding in the sky.",
        "pills": [
          "can fly high",
          "lightweight hollow bones",
          "glide effortlessly",
          "golden eagles"
        ],
        "sentence_frame": "Golden eagles [can fly high] in the sky because they have [lightweight hollow bones]."
      },
      {
        "scene": 4,
        "ladder_stage": "EXPAND",
        "badge_label": "EXPAND",
        "title": "Scene 4: Diving Aquatic Penguins",
        "image_url": "/images/week38/writing_panel_4.png",
        "caption": "Aquatic penguins cannot fly in the air, but they can dive deeply into cold water to hunt.",
        "frame_L1": "Finally, aquatic penguins cannot fly in the air. Instead, their wings help them dive deeply to hunt fish.",
        "connectors": [
          "Finally,",
          "Underwater,",
          "In conclusion,"
        ],
        "sentence_hint": "Write 2 sentences about penguins diving and hunting underwater.",
        "pills": [
          "cannot fly in the sky",
          "dive deeply into water",
          "hunt fish",
          "aquatic penguins"
        ],
        "sentence_frame": "Penguins [cannot fly in the sky], but their flipper wings allow them to [dive deeply into water]."
      }
    ]
  }
};
export default writingHubData;
