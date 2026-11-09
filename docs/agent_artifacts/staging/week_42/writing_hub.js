/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 42 | Theme: "The Water Journey (Cycle)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:07.330Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 42,
  "theme": "The Water Journey (Cycle)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Tracking a Water Droplet's Journey",
    "prompt_en": "Look at the four pictures. Tell a story about Maya and Noah tracking the journey of water from the lake to the sea. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Maya và Noah theo dõi hành trình của nước từ hồ ra biển (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Maya and Noah tracked the water cycle on a sunny afternoon. First, the warm sun heated the lake water, causing evaporation. Next, vapor went up into the sky and formed thick clouds. After that, rain came down over the mountain forest. In the end, the river carried the water back to the vast blue ocean.",
    "word_bank": [
      "sun",
      "evaporation",
      "go up",
      "cloud",
      "rain",
      "come down",
      "river",
      "ocean",
      "stream",
      "nature"
    ],
    "sentence_frames": [
      "First, the warm sun shines upon the calm ___.",
      "Then, invisible water vapor begins to go ___ into the sky.",
      "Next, cool raindrops fall upon the green ___.",
      "Finally, the rushing river flows back into the deep ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Sunshine on the Lake",
        "title_vi": "Cảnh 1: Ánh Nắng Trên Mặt Hồ",
        "image_url": "/images/week42/writing_panel_1.png",
        "image_prompt": "Two children standing on a wooden pier watching morning sunlight glistening on a tranquil lake with rising steam vapor.",
        "caption": "The warm sun heated the lake water and started evaporation.",
        "sentence_frame": "First, the warm sun [heated the blue lake] on a [calm sunny morning].",
        "pills": [
          "heated the blue lake",
          "calm sunny morning",
          "Maya and Noah",
          "evaporation began"
        ],
        "connectors": [
          "First,",
          "On a sunny morning,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Clouds Gathering Above",
        "title_vi": "Cảnh 2: Mây Tụ Lại Trên Cao",
        "image_url": "/images/week42/writing_panel_2.png",
        "image_prompt": "Fluffy white clouds gathering and turning into darker rain clouds over a forested mountain peak.",
        "caption": "Water vapor went up into the cold sky and formed thick clouds.",
        "sentence_frame": "Next, water vapor [went up into the sky] and [formed thick rain clouds].",
        "pills": [
          "went up into the sky",
          "formed thick rain clouds",
          "cooled down",
          "gentle breeze"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Soon afterwards,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Rain Coming Down",
        "title_vi": "Cảnh 3: Mưa Rơi Xuống Con Đường",
        "image_url": "/images/week42/writing_panel_3.png",
        "image_prompt": "Two smiling children holding a large yellow umbrella while cool rain falls on mountain pine trees.",
        "caption": "Heavy raindrops came down over the forest trees and village path.",
        "sentence_frame": "After that, cool rain [came down over the forest] and [watered thirsty plants].",
        "pills": [
          "came down over the forest",
          "watered thirsty plants",
          "held an umbrella",
          "fresh raindrops"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Journey Back to Ocean",
        "title_vi": "Cảnh 4: Hành Trình Trở Lại Đại Dương",
        "image_url": "/images/week42/writing_panel_4.png",
        "image_prompt": "A wide river opening into the deep blue ocean with seabirds flying over sunny coastline waters.",
        "caption": "The rushing river flowed back into the vast blue ocean.",
        "sentence_frame": "In the end, the river [flowed into the ocean] to [complete the water cycle].",
        "pills": [
          "flowed into the ocean",
          "complete the water cycle",
          "Maya and Noah smiled",
          "endless journey"
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
        "title": "Scene 1: Sun and Lake",
        "image_url": "/images/week42/writing_panel_1.png",
        "caption": "The warm sun heated the lake water and started evaporation.",
        "frame_L1": "First, Maya and Noah observed the lake. The warm sun caused liquid water to evaporate into the air.",
        "connectors": [
          "First,",
          "In the beginning,",
          "On Sunday morning,"
        ],
        "sentence_hint": "Write 2 sentences about the sun heating the lake water.",
        "ordered_chips": [
          "The warm sun",
          "heated the lake water",
          "and started evaporation",
          "into the sky"
        ],
        "pills": [
          "warm sun",
          "lake water",
          "started evaporation",
          "Maya and Noah"
        ],
        "sentence_frame": "First, the warm sun [heated the lake water] and [started evaporation]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Clouds Forming",
        "image_url": "/images/week42/writing_panel_2.png",
        "caption": "Water vapor went up into the cold sky and formed thick clouds.",
        "frame_L1": "Next, light vapor went up toward the sky. It cooled down and gathered into fluffy clouds.",
        "connectors": [
          "Next,",
          "Then,",
          "Soon afterwards,"
        ],
        "sentence_hint": "Write 2 sentences about clouds forming in the sky.",
        "pills": [
          "went up",
          "cool sky",
          "formed clouds",
          "mountain peak"
        ],
        "sentence_frame": "Next, water vapor [went up into the cool sky] to [form fluffy clouds]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: Rain Falling",
        "image_url": "/images/week42/writing_panel_3.png",
        "caption": "Heavy raindrops came down over the forest trees and village path.",
        "frame_L1": "After that, gray clouds turned heavy. Fresh raindrops came down over the green mountain trees.",
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences about rain falling from clouds.",
        "pills": [
          "fresh raindrops",
          "came down",
          "forest trees",
          "held umbrella"
        ],
        "sentence_frame": "After that, fresh raindrops [came down from clouds] onto the [forest trees]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Reaching the Ocean",
        "image_url": "/images/week42/writing_panel_4.png",
        "caption": "The rushing river flowed back into the vast blue ocean.",
        "frame_L1": "In the end, rainwater collected into a stream. It flowed into a river and traveled home to the ocean.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about the river reaching the ocean.",
        "pills": [
          "rainwater collected",
          "rushing river",
          "flowed to the ocean",
          "cycle completed"
        ],
        "sentence_frame": "In the end, the river [flowed steadily] back into the [vast blue ocean]."
      }
    ]
  }
};
export default writingHubData;
