/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 127 | Theme: "Global Climate Systems & Renewable Energy" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.311Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 127,
  "theme": "Global Climate Systems & Renewable Energy",
  "cefr_level": "B2 First",
  "picture_story": {
    "title": "Evaluating Global Renewable Energy Systems",
    "prompt_en": "Look at the four pictures. Write a formal investigative report about Dr. Thorne and Clara Lin assessing renewable grid integration and countering climate skepticism. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Tiến sĩ Thorne và Clara Lin đánh giá tích hợp lưới điện tái tạo và phản bác hoài nghi khí hậu (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Dr. Marcus Thorne and Clara Lin conducted an audit of the regional renewable electrical grid. First, offshore wind turbine outputs were recorded under varying storm conditions. Next, Clara calculated photovoltaic panel efficiency and verified record output. After counteracting false claims with empirical data, energy ministers formally ratified the national transition accord.",
    "word_bank": [
      "renewable",
      "climate",
      "emissions",
      "turbine",
      "solar",
      "grid",
      "efficiency",
      "transition",
      "sustainable",
      "counter"
    ],
    "sentence_frames": [
      "Initially, engineers analyzed power output from offshore wind ___ installations.",
      "Testing confirmed that modern photovoltaic arrays achieved higher conversion ___ than expected.",
      "The team presented empirical research to ___ misleading claims about grid instability.",
      "Ultimately, regional authorities approved the clean energy ___ blueprint."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Offshore Turbine Inspection",
        "title_vi": "Kiểm Tra Tua-bin Ngoài Khơi",
        "image_url": "/images/week127/writing_panel_1.png",
        "image_prompt": "Two marine energy researchers on a boat inspecting massive white offshore wind turbines spinning over blue ocean waves.",
        "caption": "Engineers measured electrical output from towering offshore wind turbines.",
        "sentence_frame": "First, the researchers [inspected offshore wind turbines] to measure [ocean power output].",
        "pills": [
          "inspected offshore wind turbines",
          "ocean power output",
          "Marcus and Clara",
          "gusty coastal winds"
        ],
        "connectors": [
          "First,",
          "Initially,",
          "On Monday morning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Solar Photovoltaic Testing",
        "title_vi": "Thử Nghiệm Quang Điện Mặt Trời",
        "image_url": "/images/week127/writing_panel_2.png",
        "image_prompt": "A female scientist adjusting a digital light sensor above rows of dark blue solar panels in a sunny valley.",
        "caption": "Clara verified that solar arrays achieved a record twenty-four percent efficiency.",
        "sentence_frame": "Next, Clara verified that [photovoltaic solar arrays] achieved [record conversion efficiency].",
        "pills": [
          "photovoltaic solar arrays",
          "record conversion efficiency",
          "Clara tested",
          "peak daylight hours"
        ],
        "connectors": [
          "Next,",
          "Subsequently,",
          "Shortly afterwards,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scientific Policy Debate",
        "title_vi": "Tranh Luận Chính Sách Khoa Học",
        "image_url": "/images/week127/writing_panel_3.png",
        "image_prompt": "A scientist standing in front of a conference room pointing at emission reduction charts while opposing delegates listen.",
        "caption": "Clara used empirical data to counter false claims about renewable reliability.",
        "sentence_frame": "After that, Clara presented [empirical emissions data] to counter [misleading fossil fuel claims].",
        "pills": [
          "empirical emissions data",
          "misleading fossil fuel claims",
          "compelling point",
          "scientific consensus"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "During the hearing,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "National Accord Ratification",
        "title_vi": "Phê Chuẩn Hiệp Định Quốc Gia",
        "image_url": "/images/week127/writing_panel_4.png",
        "image_prompt": "Government officials and scientists signing a green energy transition pact in front of a national seal.",
        "caption": "Ministers signed the national energy transition pact based on sustainable models.",
        "sentence_frame": "In the end, government ministers [ratified the national energy accord] to accelerate [the clean energy transition].",
        "pills": [
          "ratified the national energy accord",
          "the clean energy transition",
          "sustainable future",
          "smiling delegates"
        ],
        "connectors": [
          "In the end,",
          "Finally,",
          "Consequently,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Turbine Output Verification",
        "image_url": "/images/week127/writing_panel_1.png",
        "caption": "Engineers measured electrical output from towering offshore wind turbines.",
        "frame_L1": "First, the researchers monitored offshore wind turbines. They proved that ocean gales produced steady clean electricity.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences describing offshore turbine monitoring.",
        "ordered_chips": [
          "Researchers monitored",
          "offshore wind turbines",
          "to verify",
          "steady electrical generation"
        ],
        "pills": [
          "offshore turbines",
          "clean electricity",
          "Marcus and Clara",
          "ocean gales"
        ],
        "sentence_frame": "First, researchers monitored [offshore wind turbines] to confirm [steady electrical generation]."
      },
      {
        "badge_label": "BUILD",
        "title": "Photovoltaic Efficiency",
        "image_url": "/images/week127/writing_panel_2.png",
        "caption": "Clara verified that solar arrays achieved a record twenty-four percent efficiency.",
        "frame_L1": "Next, Clara tested photovoltaic solar arrays. The panels achieved a remarkable conversion efficiency rate.",
        "connectors": [
          "Next,",
          "Subsequently,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences about solar panel efficiency testing.",
        "pills": [
          "solar arrays",
          "conversion efficiency",
          "Clara tested",
          "remarkable rate"
        ],
        "sentence_frame": "Next, Clara tested [photovoltaic solar arrays] that achieved [unprecedented conversion efficiency]."
      },
      {
        "badge_label": "WRITE",
        "title": "Debating Skeptics",
        "image_url": "/images/week127/writing_panel_3.png",
        "caption": "Clara used empirical data to counter false claims about renewable reliability.",
        "frame_L1": "After that, Clara addressed the energy conference. She countered false claims with real battery performance charts.",
        "connectors": [
          "After that,",
          "Later,",
          "During the session,"
        ],
        "sentence_hint": "Write 2 sentences describing how data countered misleading claims.",
        "pills": [
          "energy conference",
          "countered false claims",
          "performance charts",
          "compelling point"
        ],
        "sentence_frame": "After that, Clara [countered false claims] using [real battery performance data]."
      },
      {
        "badge_label": "EXPAND",
        "title": "National Transition Ratification",
        "image_url": "/images/week127/writing_panel_4.png",
        "caption": "Ministers signed the national energy transition pact based on sustainable models.",
        "frame_L1": "In the end, policymakers signed the clean energy treaty. They committed to expanding the smart grid nationwide.",
        "connectors": [
          "In the end,",
          "Finally,",
          "As a result,"
        ],
        "sentence_hint": "Write 2 sentences about signing the national transition treaty.",
        "pills": [
          "signed clean energy treaty",
          "policymakers",
          "smart grid expansion",
          "sustainable future"
        ],
        "sentence_frame": "In the end, policymakers signed [the clean energy treaty] to expand [the national smart grid]."
      }
    ]
  }
};
export default writingHubData;
