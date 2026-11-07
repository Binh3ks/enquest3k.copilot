/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 78 | Theme: "Social Studies/ELA: Cultures / Math: Surveys" | CEFR: B1 PET
 * Generated: 2026-11-07T07:16:42.030Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 78,
  "theme": "Social Studies/ELA: Cultures / Math: Surveys",
  "cefr_level": "B1 PET",
  "picture_story": {
    "title": "Comparative Analysis of Global Cultural Traditions",
    "prompt_en": "Look at the pictures and survey data. Write a comparative paragraph about global cultural traditions using 'Unlike', 'Similar to', and 'Whereas'. Write 30 or more words.",
    "prompt_vi": "Nhìn vào các bức tranh và số liệu khảo sát. Viết một đoạn văn so sánh về các truyền thống văn hóa toàn cầu sử dụng 'Unlike', 'Similar to', và 'Whereas' (từ 30 từ trở lên).",
    "min_sentences": 3,
    "min_words": 30,
    "max_words": 90,
    "model_sentence": "Throughout human civilization, diverse societies have established rich cultural traditions to celebrate agricultural harvests. Similar to East Asian communities that gather under the autumn moon to share sweet pastries, European harvest home gatherings organize communal feasts to express gratitude for crops. Unlike private household dinners, Latin American cultural festivities frequently feature vibrant public street carnivals with music and dances. Whereas ancient rituals focused strictly on religious ceremonies, modern celebrations foster intercultural dialogue. Conducting demographic surveys enables researchers to preserve ancestral heritage while embracing contemporary diversity.",
    "word_bank": [
      "tradition",
      "culture",
      "heritage",
      "celebrate",
      "gather",
      "preserve",
      "survey",
      "tally",
      "majority",
      "similar",
      "different",
      "symbolic"
    ],
    "sentence_frames": [
      "To begin their study, researchers conducted an extensive ___ to gather data.",
      "___ Asian lantern festivals, European harvest communities gather for communal meals.",
      "___ quiet indoor dinners, Latin American festivals feature vibrant street carnivals.",
      "___ older rituals were solemn, modern celebrations foster community unity."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Surveying Holiday Traditions",
        "title_vi": "Cảnh 1: Khảo Sát Truyền Thống Ngày Lễ",
        "image_url": "/images/week78/writing_panel_1.png",
        "image_prompt": "Two students interviewing diverse classmates with clipboards and tally charts in a modern school library, editorial style.",
        "caption": "Marcus and Elena distributed a questionnaire to discover how families celebrate cultural festivals.",
        "sentence_frame": "To begin their research, Marcus and Elena [conducted an extensive survey] to [gather data on cultural traditions].",
        "pills": [
          "conducted an extensive survey",
          "gather data on cultural traditions",
          "multicultural community",
          "distributed questionnaires",
          "tallied student responses"
        ],
        "connectors": [
          "First,",
          "To begin with,",
          "In their school project,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Comparing Harvest Feasts",
        "title_vi": "Cảnh 2: So Sánh Lễ Hội Mùa Màng",
        "image_url": "/images/week78/writing_panel_2.png",
        "image_prompt": "Split panel showing families sharing mooncakes under lanterns on the left, and a European harvest festival banquet with bread on the right.",
        "caption": "Similar to Asian mid-autumn gatherings, European harvest fairs emphasize communal banquets and gratitude.",
        "sentence_frame": "[Similar to] Asian lantern celebrations, European harvest communities [gather together to share meals].",
        "pills": [
          "Similar to",
          "gather together to share meals",
          "communal banquets",
          "bountiful crops",
          "shared gratitude"
        ],
        "connectors": [
          "Similar to,",
          "In a comparable way,",
          "Likewise,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Street Carnivals vs Quiet Dinners",
        "title_vi": "Cảnh 3: Lễ Hội Đường Phố Và Bữa Tối Gia Đình",
        "image_url": "/images/week78/writing_panel_3.png",
        "image_prompt": "A vibrant outdoor Latin American street carnival with colorful dancers, drums, and confetti in a sunny plaza.",
        "caption": "Unlike quiet indoor dinners, Latin American street festivals feature lively music and vibrant costumes.",
        "sentence_frame": "[Unlike quiet indoor gatherings], Latin American festivals feature [vibrant public street carnivals].",
        "pills": [
          "Unlike quiet indoor gatherings",
          "vibrant public street carnivals",
          "lively percussion and dances",
          "symbolic costumes",
          "community celebrations"
        ],
        "connectors": [
          "Unlike,",
          "In sharp contrast,",
          "On the other hand,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Tabulating Demographic Findings",
        "title_vi": "Cảnh 4: Tổng Hợp Dữ Liệu Khảo Sát",
        "image_url": "/images/week78/writing_panel_4.png",
        "image_prompt": "Students and teacher looking at a large colorful frequency bar chart displaying festival survey results on a smart board.",
        "caption": "Whereas older customs were private, modern students overwhelmingly voted to preserve global traditions together.",
        "sentence_frame": "[Whereas older customs were solemn], modern celebrations [foster inclusive civic unity].",
        "pills": [
          "Whereas older customs were solemn",
          "foster inclusive civic unity",
          "overwhelming majority voted",
          "preserve ancestral heritage",
          "multicultural appreciation"
        ],
        "connectors": [
          "Whereas,",
          "In conclusion,",
          "Finally,"
        ]
      }
    ],
    "steps": [
      {
        "scene": 1,
        "ladder_stage": "MODEL",
        "badge_label": "MODEL",
        "title": "Scene 1: Surveying Holiday Traditions",
        "image_url": "/images/week78/writing_panel_1.png",
        "caption": "Marcus and Elena distributed a questionnaire to discover how families celebrate cultural festivals.",
        "frame_L1": "Marcus and Elena conducted a comprehensive survey at their school. They gathered demographic data on cultural traditions.",
        "connectors": [
          "First,",
          "To begin with,",
          "In their project,"
        ],
        "sentence_hint": "Write 2 sentences about conducting a cultural survey and gathering data.",
        "pills": [
          "conducted an extensive survey",
          "gather data on traditions",
          "distributed questionnaires",
          "Marcus and Elena"
        ],
        "sentence_frame": "To begin their research, Marcus and Elena [conducted an extensive survey] to [gather data on cultural traditions]."
      },
      {
        "scene": 2,
        "ladder_stage": "BUILD",
        "badge_label": "BUILD",
        "title": "Scene 2: Comparing Harvest Feasts",
        "image_url": "/images/week78/writing_panel_2.png",
        "caption": "Similar to Asian mid-autumn gatherings, European harvest fairs emphasize communal banquets and gratitude.",
        "frame_L1": "Similar to Asian mid-autumn celebrations, European harvest fairs bring people together. Families gather to share meals and express gratitude.",
        "connectors": [
          "Similar to,",
          "In a comparable way,",
          "Likewise,"
        ],
        "sentence_hint": "Write 2 sentences using 'Similar to' comparing Asian and European harvest celebrations.",
        "pills": [
          "Similar to",
          "gather to share meals",
          "communal banquets",
          "express gratitude"
        ],
        "sentence_frame": "[Similar to] Asian lantern celebrations, European harvest communities [gather together to share meals]."
      },
      {
        "scene": 3,
        "ladder_stage": "WRITE",
        "badge_label": "WRITE",
        "title": "Scene 3: Street Carnivals vs Quiet Dinners",
        "image_url": "/images/week78/writing_panel_3.png",
        "caption": "Unlike quiet indoor dinners, Latin American street festivals feature lively music and vibrant costumes.",
        "frame_L1": "Unlike quiet indoor dinners, Latin American festivities take place outdoors. They feature vibrant street carnivals with lively music and dancing.",
        "connectors": [
          "Unlike,",
          "In sharp contrast,",
          "On the other hand,"
        ],
        "sentence_hint": "Write 2 sentences using 'Unlike' contrasting indoor meals with outdoor street carnivals.",
        "pills": [
          "Unlike quiet indoor gatherings",
          "vibrant public street carnivals",
          "lively percussion and music",
          "symbolic costumes"
        ],
        "sentence_frame": "[Unlike quiet indoor gatherings], Latin American festivals feature [vibrant public street carnivals]."
      },
      {
        "scene": 4,
        "ladder_stage": "EXPAND",
        "badge_label": "EXPAND",
        "title": "Scene 4: Tabulating Demographic Findings",
        "image_url": "/images/week78/writing_panel_4.png",
        "caption": "Whereas older customs were private, modern students celebrate diversity. An overwhelming majority voted to preserve traditional folk arts.",
        "frame_L1": "Whereas older customs were private, modern students celebrate diversity. An overwhelming majority voted to preserve traditional folk arts.",
        "connectors": [
          "Whereas,",
          "In conclusion,",
          "Finally,"
        ],
        "sentence_hint": "Write 2 sentences using 'Whereas' explaining modern survey findings.",
        "pills": [
          "Whereas older customs were solemn",
          "foster inclusive civic unity",
          "majority voted to preserve",
          "cultural appreciation"
        ],
        "sentence_frame": "[Whereas older customs were solemn], modern celebrations [foster inclusive civic unity]."
      }
    ]
  }
};
export default writingHubData;
