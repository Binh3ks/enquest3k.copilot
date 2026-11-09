/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 73 | Theme: "Science/ELA: The Water Cycle (Advanced) / Math: Volume" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.694Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 73,
  "theme": "Science/ELA: The Water Cycle (Advanced) / Math: Volume",
  "cefr_level": "B1 Preliminary",
  "picture_story": {
    "title": "Explaining the Stages of the Water Cycle",
    "prompt_en": "Look at the four panels. Write an expository paragraph explaining the stages of the water cycle using sequence connectors such as 'first', 'subsequently', 'following this', and 'eventually'. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn giải thích các giai đoạn của vòng tuần hoàn nước sử dụng từ nối trình tự ('first', 'subsequently', 'following this', 'eventually'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "First, solar heat causes liquid water to evaporate from rivers and oceans. Subsequently, this invisible vapor ascends into the cool atmosphere and condenses into dense clouds. Following this condensation process, clouds release heavy precipitation over mountain forests. Eventually, runoff collects in reservoirs and groundwater aquifers, sustaining Earth's water cycle.",
    "word_bank": [
      "evaporation",
      "vapor",
      "condensation",
      "precipitation",
      "reservoir",
      "groundwater",
      "ascend",
      "cycle",
      "droplet",
      "collection"
    ],
    "sentence_frames": [
      "First, solar heat turns liquid water into invisible ___.",
      "Subsequently, warm vapor rises into the atmosphere and causes ___.",
      "Following this stage, dense clouds release heavy ___ over the valley.",
      "Eventually, collected runoff fills the mountain ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Solar Evaporation",
        "title_vi": "Khung 1: Bốc Hơi Do Nhiệt Mặt Trời",
        "image_url": "/images/week73/writing_panel_1.png",
        "image_prompt": "Bright sunshine heating a calm lake while arrows show invisible water vapor rising into the air.",
        "caption": "First, sunlight heats surface water, transforming liquid into airborne vapor.",
        "sentence_frame": "First, sunlight [heats surface water] to drive [rapid evaporation].",
        "pills": [
          "heats surface water",
          "rapid evaporation",
          "warm sunny lake",
          "invisible vapor"
        ],
        "connectors": [
          "First,",
          "Initially,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Cloud Condensation",
        "title_vi": "Khung 2: Ngưng Tụ Tạo Mây",
        "image_url": "/images/week73/writing_panel_2.png",
        "image_prompt": "Rising vapor cooling in high altitudes and condensing into billowing cumulus clouds.",
        "caption": "Subsequently, the rising vapor cools and condenses into clouds.",
        "sentence_frame": "Subsequently, the rising vapor [cools in high altitudes] and [forms dense clouds].",
        "pills": [
          "cools in high altitudes",
          "forms dense clouds",
          "tiny water droplets",
          "cool atmosphere"
        ],
        "connectors": [
          "Subsequently,",
          "Next,",
          "After that,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Mountain Precipitation",
        "title_vi": "Khung 3: Lượng Mưa Trên Núi",
        "image_url": "/images/week73/writing_panel_3.png",
        "image_prompt": "Heavy rain pouring from dark clouds over mountain slopes and tall pine trees.",
        "caption": "Following this, heavy droplets fall to Earth as rainfall.",
        "sentence_frame": "Following this process, heavy clouds [release abundant precipitation] over [mountain pine forests].",
        "pills": [
          "release abundant precipitation",
          "mountain pine forests",
          "saturating the soil",
          "falling rain"
        ],
        "connectors": [
          "Following this,",
          "Later,",
          "Soon afterwards,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Reservoir Collection",
        "title_vi": "Khung 4: Thu Nước Vào Hồ Chứa",
        "image_url": "/images/week73/writing_panel_4.png",
        "image_prompt": "Crystal clear mountain river flowing into a large concrete dam and deep reservoir.",
        "caption": "Eventually, collected water flows into reservoirs and replenishes aquifers.",
        "sentence_frame": "Eventually, mountain runoff [flows into the valley reservoir] to [replenish groundwater].",
        "pills": [
          "flows into the valley reservoir",
          "replenish groundwater",
          "completing the cycle",
          "freshwater collection"
        ],
        "connectors": [
          "Eventually,",
          "In the end,",
          "Finally,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Solar Evaporation",
        "image_url": "/images/week73/writing_panel_1.png",
        "caption": "First, sunlight heats surface water, transforming liquid into airborne vapor.",
        "frame_L1": "First, solar heat warms the valley lake. Liquid water transforms into invisible vapor.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin with,"
        ],
        "sentence_hint": "Write 2 sentences explaining how heat triggers evaporation.",
        "ordered_chips": [
          "First, solar heat",
          "transforms lake water",
          "into rising vapor",
          "through evaporation."
        ],
        "pills": [
          "solar heat",
          "transforms lake water",
          "rising vapor",
          "evaporation"
        ],
        "sentence_frame": "First, solar heat [warms the valley lake] to [produce rising vapor]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Cloud Condensation",
        "image_url": "/images/week73/writing_panel_2.png",
        "caption": "Subsequently, the rising vapor cools and condenses into clouds.",
        "frame_L1": "Subsequently, vapor ascends high into the atmosphere. Cooling temperatures form thick clouds.",
        "connectors": [
          "Subsequently,",
          "Next,",
          "Following this,"
        ],
        "sentence_hint": "Write 2 sentences describing condensation in the cool sky.",
        "pills": [
          "vapor ascends",
          "cool atmosphere",
          "tiny droplets",
          "condenses into clouds"
        ],
        "sentence_frame": "Subsequently, warm vapor [ascends into the cool air] and [condenses into clouds]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Precipitation Falls",
        "image_url": "/images/week73/writing_panel_3.png",
        "caption": "Following this, heavy droplets fall to Earth as rainfall.",
        "frame_L1": "Following this stage, dark clouds produce heavy precipitation. Rain soaks the mountain forest.",
        "connectors": [
          "Following this,",
          "Afterwards,",
          "Then,"
        ],
        "sentence_hint": "Write 2 sentences about rain falling on the mountains.",
        "pills": [
          "heavy precipitation",
          "soaks the soil",
          "mountain slope",
          "rainwater falls"
        ],
        "sentence_frame": "Following this stage, clouds [produce heavy precipitation] that [soaks mountain slopes]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Collection and Storage",
        "image_url": "/images/week73/writing_panel_4.png",
        "caption": "Eventually, collected water flows into reservoirs and replenishes aquifers.",
        "frame_L1": "Eventually, rushing streams gather into the valley reservoir. Clean groundwater ensures life continues.",
        "connectors": [
          "Eventually,",
          "In the end,",
          "Finally,"
        ],
        "sentence_hint": "Write 2 sentences summarizing runoff collection and the water cycle.",
        "pills": [
          "valley reservoir",
          "replenishes aquifers",
          "continuous cycle",
          "freshwater collection"
        ],
        "sentence_frame": "Eventually, mountain streams [flow into the reservoir] and [replenish groundwater]."
      }
    ]
  }
};
export default writingHubData;
