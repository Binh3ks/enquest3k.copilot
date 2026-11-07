/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 35 | Theme: "Storytelling Practice 2 (Personal Recount)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T07:16:42.026Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 35,
  "theme": "Storytelling Practice 2 (Personal Recount)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Lucas and Maya's Museum Adventure",
    "prompt_en": "Look at the pictures. Write the recount of the museum adventure. Write 20 or more words.",
    "prompt_vi": "Nhìn vào các bức tranh. Viết bài kể lại chuyến phiêu lưu ở bảo tàng (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Last Saturday, Lucas and Maya had a memorable adventure at the Discovery Science Museum. First, they boarded the cheerful morning train. Next, they were delighted to see a giant robot in the exhibition hall. Then, Maya whispered with excitement under glowing stars in the planetarium. In the end, Grandpa took a wonderful family photograph that they treasured as a souvenir.",
    "word_bank": [
      "boarded",
      "cheerful",
      "delighted",
      "surprised",
      "whispered",
      "laughed",
      "treasured",
      "photograph",
      "souvenir",
      "adventure"
    ],
    "sentence_frames": [
      "In the morning, Lucas and Maya boarded the ___ train.",
      "In the exhibition hall, they were ___ to see a giant robot.",
      "Suddenly, the lights dimmed and Maya ___ with excitement.",
      "Grandpa took a ___ family photograph as a souvenir."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Boarding the Morning Train",
        "title_vi": "Cảnh 1: Lên Chuyến Tàu Buổi Sáng",
        "image_url": "/images/week35/writing_panel_1.png",
        "image_prompt": "Two smiling children with backpacks boarding a bright modern passenger train on a sunny morning, cartoon storybook style.",
        "caption": "Lucas and Maya packed their backpacks early and boarded the cheerful morning train.",
        "sentence_frame": "In the morning, Lucas and Maya [packed their backpacks] and [boarded the cheerful train].",
        "pills": [
          "packed their backpacks",
          "boarded the cheerful train",
          "on Saturday morning",
          "cheerful morning train",
          "Lucas and Maya"
        ],
        "connectors": [
          "In the morning,",
          "First,",
          "Early on Saturday,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Meeting the Giant Robot",
        "title_vi": "Cảnh 2: Gặp Gỡ Robot Khổng Lồ",
        "image_url": "/images/week35/writing_panel_2.png",
        "image_prompt": "A large friendly chrome robot waving at two amazed children inside a brightly lit science museum exhibition hall.",
        "caption": "At the museum, Lucas was delighted and surprised when a giant robot waved hello.",
        "sentence_frame": "When they arrived, Lucas was [delighted and surprised] to [see a giant robot].",
        "pills": [
          "delighted and surprised",
          "see a giant robot",
          "in the main hall",
          "waved hello",
          "huge silver robot"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Inside the hall,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Wonder in the Planetarium",
        "title_vi": "Cảnh 3: Kỳ Diệu Tại Cung Thiên Văn",
        "image_url": "/images/week35/writing_panel_3.png",
        "image_prompt": "Two children looking up in awe inside a dark planetarium dome filled with glowing constellations and planets.",
        "caption": "Suddenly, the lights dimmed and Maya whispered with excitement under glowing stars.",
        "sentence_frame": "Suddenly, the lights dimmed and Maya [whispered with excitement] under the [glowing stars].",
        "pills": [
          "whispered with excitement",
          "under glowing stars",
          "in the dark planetarium",
          "suddenly the lights dimmed",
          "looked magnificent"
        ],
        "connectors": [
          "Suddenly,",
          "At that moment,",
          "After that,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Family Photograph Celebration",
        "title_vi": "Cảnh 4: Bức Ảnh Kỷ Niệm Gia Đình",
        "image_url": "/images/week35/writing_panel_4.png",
        "image_prompt": "Grandfather taking a photo with a camera of two happy children holding small museum souvenir models in a sunny courtyard.",
        "caption": "Before leaving, Grandpa took a wonderful family photograph that everyone treasured as a memorable souvenir.",
        "sentence_frame": "In the end, Grandpa took a [wonderful family photograph] that we will [always treasure] as a souvenir.",
        "pills": [
          "wonderful family photograph",
          "always treasure",
          "memorable souvenir",
          "delighted and happy",
          "celebrated together"
        ],
        "connectors": [
          "In the end,",
          "Finally,",
          "Before going home,"
        ]
      }
    ],
    "steps": [
      {
        "scene": 1,
        "ladder_stage": "MODEL",
        "badge_label": "MODEL",
        "title": "Scene 1: Boarding the Morning Train",
        "image_url": "/images/week35/writing_panel_1.png",
        "caption": "Lucas and Maya packed their backpacks early and boarded the cheerful morning train.",
        "frame_L1": "In the morning, Lucas and Maya packed their backpacks early. They boarded the cheerful morning train to the museum.",
        "connectors": [
          "In the morning,",
          "First,",
          "On Saturday,"
        ],
        "sentence_hint": "Write 2 sentences about packing backpacks and boarding the train.",
        "pills": [
          "packed their backpacks",
          "boarded the cheerful train",
          "morning train",
          "Lucas and Maya"
        ],
        "sentence_frame": "In the morning, Lucas and Maya [packed their backpacks] and [boarded the cheerful train]."
      },
      {
        "scene": 2,
        "ladder_stage": "BUILD",
        "badge_label": "BUILD",
        "title": "Scene 2: Meeting the Giant Robot",
        "image_url": "/images/week35/writing_panel_2.png",
        "caption": "At the museum, Lucas was delighted and surprised when a giant robot waved hello.",
        "frame_L1": "Next, they arrived at the exhibition hall. Lucas was delighted and surprised to see a giant robot waving hello.",
        "connectors": [
          "Next,",
          "Then,",
          "Inside the hall,"
        ],
        "sentence_hint": "Write 2 sentences about arriving at the museum and seeing the giant robot.",
        "pills": [
          "delighted and surprised",
          "see a giant robot",
          "in the hall",
          "waved hello"
        ],
        "sentence_frame": "Next, Lucas was [delighted and surprised] to [see a giant robot] in the hall."
      },
      {
        "scene": 3,
        "ladder_stage": "WRITE",
        "badge_label": "WRITE",
        "title": "Scene 3: Wonder in the Planetarium",
        "image_url": "/images/week35/writing_panel_3.png",
        "caption": "Suddenly, the lights dimmed and Maya whispered with excitement under glowing stars.",
        "frame_L1": "Suddenly, the room lights dimmed in the planetarium. Maya whispered with excitement under thousands of glowing stars.",
        "connectors": [
          "Suddenly,",
          "Then,",
          "After that,"
        ],
        "sentence_hint": "Write 2 sentences about the dark planetarium and whispering under glowing stars.",
        "pills": [
          "whispered with excitement",
          "under glowing stars",
          "dark planetarium",
          "lights dimmed"
        ],
        "sentence_frame": "Suddenly, the lights dimmed and Maya [whispered with excitement] under the [glowing stars]."
      },
      {
        "scene": 4,
        "ladder_stage": "EXPAND",
        "badge_label": "EXPAND",
        "title": "Scene 4: Family Photograph Celebration",
        "image_url": "/images/week35/writing_panel_4.png",
        "caption": "Before leaving, Grandpa took a wonderful family photograph that everyone treasured as a memorable souvenir.",
        "frame_L1": "In the end, Grandpa took a wonderful family photograph. Everyone treasured the picture as a memorable souvenir.",
        "connectors": [
          "In the end,",
          "Finally,",
          "Before going home,"
        ],
        "sentence_hint": "Write 2 sentences about taking a family photo and treasuring the souvenir.",
        "pills": [
          "wonderful family photograph",
          "always treasure",
          "memorable souvenir",
          "delighted"
        ],
        "sentence_frame": "In the end, Grandpa took a [wonderful family photograph] that we will [always treasure] as a souvenir."
      }
    ]
  }
};
export default writingHubData;
