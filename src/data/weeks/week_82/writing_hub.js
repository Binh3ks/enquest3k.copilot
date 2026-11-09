/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 82 | Theme: "ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.706Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 82,
  "theme": "ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data",
  "cefr_level": "B1 Preliminary",
  "picture_story": {
    "title": "Drafting a Descriptive Travel Essay with Sensory Words",
    "prompt_en": "Look at the four panels. Write a descriptive essay draft of a visit to a scenic mountain town using sensory adjectives (sight, sound, smell, touch). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một bản thảo bài văn miêu tả chuyến thăm thị trấn vùng núi tuyệt đẹp sử dụng các tính từ chỉ giác quan (thị giác, thính giác, khứu giác, xúc giác). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "At dawn, the mountain summit offered a breathtaking panoramic view of the golden horizon. Walking through the valley, a crisp autumn breeze carried the sweet fragrance of pine needles. In the bustling old town, the rich aroma of roasted coffee drifted through lively cobblestone streets. As sunset painted the sky, church bells echoed across the tranquil harbor, bringing total serenity.",
    "word_bank": [
      "spectacular",
      "landscape",
      "panoramic",
      "vibrant",
      "bustling",
      "fragrance",
      "crisp",
      "picturesque",
      "aroma",
      "serenity"
    ],
    "sentence_frames": [
      "At dawn, we marveled at the ___ panoramic view from the summit.",
      "A crisp mountain breeze carried the sweet ___ of fresh pine trees.",
      "We wandered through the ___ marketplace filled with colorful lanterns.",
      "In the evening, church bells echoed across the valley, bringing peaceful ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Breathtaking Mountain Sunrise",
        "title_vi": "Khung 1: Bình Minh Ngoạn Mục Vùng Núi",
        "image_url": "/images/week82/writing_panel_1.png",
        "image_prompt": "A travel vlogger with a camera recording a glorious golden sunrise over mountain peaks and mist.",
        "caption": "At dawn, the summit offered a breathtaking panoramic vista.",
        "sentence_frame": "At dawn, the mountain summit [offered a breathtaking panoramic view] of [the glowing golden horizon].",
        "pills": [
          "offered a breathtaking panoramic view",
          "the glowing golden horizon",
          "misty mountain peaks",
          "travel vlogger"
        ],
        "connectors": [
          "At dawn,",
          "Early in the morning,",
          "First,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Crisp Valley Breeze",
        "title_vi": "Khung 2: Làn Gió Thung Lũng Mát Lành",
        "image_url": "/images/week82/writing_panel_2.png",
        "image_prompt": "Two young travelers walking on a stone path through green pine trees with sunbeams streaming through leaves.",
        "caption": "A crisp breeze carried the sweet fragrance of forest trees.",
        "sentence_frame": "Walking through the valley, [a crisp morning breeze] carried [the sweet fragrance of pine needles].",
        "pills": [
          "a crisp morning breeze",
          "the sweet fragrance of pine needles",
          "emerald terraced fields",
          "scenic stone path"
        ],
        "connectors": [
          "Next,",
          "As we walked,",
          "Soon afterwards,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Bustling Market Aromas",
        "title_vi": "Khung 3: Hương Vị Chợ Phố Nhộn Nhịp",
        "image_url": "/images/week82/writing_panel_3.png",
        "image_prompt": "A vibrant market street with wooden stalls, smiling food vendors, roasted nuts, and warm pastries.",
        "caption": "The bustling market was filled with rich aromas and laughter.",
        "sentence_frame": "In the bustling old town, [the rich aroma of roasted coffee] filled [the vibrant market square].",
        "pills": [
          "the rich aroma of roasted coffee",
          "the vibrant market square",
          "cheerful street musicians",
          "bustling cobblestone alleys"
        ],
        "connectors": [
          "Later,",
          "In the town center,",
          "Meanwhile,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Serene Harbor Sunset",
        "title_vi": "Khung 4: Hoàng Hôn Bến Cảng Thanh Bình",
        "image_url": "/images/week82/writing_panel_4.png",
        "image_prompt": "Small wooden fishing boats floating on calm pink water while church bells echo across the harbor.",
        "caption": "Church bells echoed softly across the peaceful harbor at dusk.",
        "sentence_frame": "As dusk fell, church bells [echoed softly across the harbor], bringing [a sense of pure serenity].",
        "pills": [
          "echoed softly across the harbor",
          "a sense of pure serenity",
          "tranquil fishing boats",
          "picturesque sunset"
        ],
        "connectors": [
          "Finally,",
          "As dusk fell,",
          "In the end,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Sight (Visual Horizon)",
        "image_url": "/images/week82/writing_panel_1.png",
        "caption": "At dawn, the summit offered a breathtaking panoramic vista.",
        "frame_L1": "At dawn, the mountain summit was breathtaking. The golden sunrise provided a panoramic view.",
        "connectors": [
          "At dawn,",
          "Early in the morning,",
          "To start with,"
        ],
        "sentence_hint": "Write 2 sentences describing the sight of sunrise.",
        "ordered_chips": [
          "At dawn, the mountain summit",
          "offered a breathtaking",
          "panoramic view across",
          "the glowing horizon."
        ],
        "pills": [
          "breathtaking sunrise",
          "panoramic view",
          "golden horizon",
          "mountain summit"
        ],
        "sentence_frame": "At dawn, the summit [offered a breathtaking view] of [the golden mountain horizon]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Touch & Smell (Crisp Air & Fragrance)",
        "image_url": "/images/week82/writing_panel_2.png",
        "caption": "A crisp breeze carried the sweet fragrance of forest trees.",
        "frame_L1": "A crisp breeze touched our faces. The air smelled of sweet pine needles and wet earth.",
        "connectors": [
          "As we walked,",
          "Next,",
          "Following this,"
        ],
        "sentence_hint": "Write 2 sentences describing the crisp touch of wind and smell of pine.",
        "pills": [
          "crisp breeze",
          "touched our faces",
          "sweet pine needles",
          "fragrant forest"
        ],
        "sentence_frame": "A crisp morning breeze [cooled our faces] and carried [the sweet fragrance of pines]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Sound & Taste (Bustling Market Aromas)",
        "image_url": "/images/week82/writing_panel_3.png",
        "caption": "The bustling market was filled with rich aromas and laughter.",
        "frame_L1": "The old town was bustling and vibrant. The rich aroma of fresh coffee beans filled the street.",
        "connectors": [
          "In the afternoon,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences describing market sounds and delicious aromas.",
        "pills": [
          "bustling and vibrant",
          "rich aroma",
          "fresh coffee beans",
          "laughing crowds"
        ],
        "sentence_frame": "The bustling market [was vibrant with laughter] and [the rich aroma of roasted coffee]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Serenity & Reflection",
        "image_url": "/images/week82/writing_panel_4.png",
        "caption": "Church bells echoed softly across the peaceful harbor at dusk.",
        "frame_L1": "As dusk fell, church bells echoed across the tranquil harbor. Total serenity settled over the town.",
        "connectors": [
          "As dusk fell,",
          "Finally,",
          "In conclusion,"
        ],
        "sentence_hint": "Write 2 sentences about peaceful harbor sounds and serenity.",
        "pills": [
          "church bells echoed",
          "tranquil harbor",
          "total serenity",
          "picturesque destination"
        ],
        "sentence_frame": "As dusk fell, bells [echoed across the tranquil water], creating [a feeling of pure serenity]."
      }
    ]
  }
};
export default writingHubData;
