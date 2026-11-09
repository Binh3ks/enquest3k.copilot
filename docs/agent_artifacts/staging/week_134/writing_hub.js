/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 134 | Theme: "Economics & International Trade: Globalization" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.320Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 134,
  "theme": "Economics & International Trade: Globalization",
  "cefr_level": "B2 First",
  "picture_story": {
    "title": "Analyzing International Trade and Economic Logic",
    "prompt_en": "Look at the four pictures. Write a formal investigative report about Dr. Hannah Vance and Oliver Sterling evaluating international trade dynamics and debunking economic fallacies. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Tiến sĩ Hannah Vance và Oliver Sterling đánh giá động lực thương mại quốc tế và vạch trần các ngụy biện kinh tế (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Dr. Hannah Vance and Oliver Sterling conducted an economic evaluation of international trade agreements. First, container freight data was analyzed at the deepwater seaport. Next, Oliver examined tariff schedules to identify valid comparative advantages. After debunking fallacies regarding trade deficits before the ministry, delegates ratified the multilateral trade accord.",
    "word_bank": [
      "economics",
      "globalization",
      "trade",
      "tariff",
      "export",
      "import",
      "fallacy",
      "logic",
      "valid",
      "equilibrium"
    ],
    "sentence_frames": [
      "Initially, researchers monitored maritime container traffic to assess global ___ logistics.",
      "Economists analyzed tariff schedules to differentiate sound policy from hasty ___.",
      "Empirical evidence demonstrated that trade deficit fears were based on an economic ___.",
      "Ultimately, trading partners ratified the agreement to maintain international market ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Maritime Container Logistics Inspection",
        "title_vi": "Kiểm Tra Hậu Cần Công-ten-nơ Hàng Hải",
        "image_url": "/images/week134/writing_panel_1.png",
        "image_prompt": "Two economists holding digital tablets standing on an elevated observation deck overlooking a massive busy container seaport.",
        "caption": "Economists monitored shipping logistics at the deepwater container terminal.",
        "sentence_frame": "First, the researchers [monitored container shipping logistics] at [the deepwater seaport terminal].",
        "pills": [
          "monitored container shipping logistics",
          "the deepwater seaport terminal",
          "Hannah and Oliver",
          "global trade volume"
        ],
        "connectors": [
          "First,",
          "Initially,",
          "On Monday morning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Tariff Impact Analysis",
        "title_vi": "Phân Tích Tác Động Thuế Quan",
        "image_url": "/images/week134/writing_panel_2.png",
        "image_prompt": "A researcher examining import duty tables and supply elasticity graphs on a high-resolution laboratory screen.",
        "caption": "Oliver evaluated tariff schedules to calculate comparative advantage.",
        "sentence_frame": "Next, Oliver evaluated [statutory tariff schedules] to calculate [sound comparative advantages].",
        "pills": [
          "statutory tariff schedules",
          "sound comparative advantages",
          "elasticity graphs",
          "Oliver tested"
        ],
        "connectors": [
          "Next,",
          "Subsequently,",
          "Shortly afterwards,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Debunking Trade Fallacies",
        "title_vi": "Vạch Trần Các Ngụy Biện Thương Mại",
        "image_url": "/images/week134/writing_panel_3.png",
        "image_prompt": "A female economist presenting trade balance charts at a podium while international delegates take notes.",
        "caption": "Hannah used empirical data to debunk common trade deficit fallacies.",
        "sentence_frame": "After that, Hannah presented [empirical trade balance charts] to debunk [common economic fallacies].",
        "pills": [
          "empirical trade balance charts",
          "common economic fallacies",
          "compelling logic",
          "parliamentary hearing"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "During the ministry session,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Multilateral Accord Ratification",
        "title_vi": "Phê Chuẩn Hiệp Định Đa Phương",
        "image_url": "/images/week134/writing_panel_4.png",
        "image_prompt": "Trade ministers and economists signing leather-bound treaty documents in front of international flags.",
        "caption": "Ministers ratified the trade accord based on valid economic models.",
        "sentence_frame": "In the end, international trade ministers [ratified the multilateral accord] based on [valid economic impact models].",
        "pills": [
          "ratified the multilateral accord",
          "valid economic impact models",
          "market equilibrium",
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
        "title": "Port Logistics Inspection",
        "image_url": "/images/week134/writing_panel_1.png",
        "caption": "Economists monitored shipping logistics at the deepwater container terminal.",
        "frame_L1": "First, the researchers visited the container port. They recorded freight numbers to evaluate bilateral export traffic.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences describing seaport logistics inspection.",
        "ordered_chips": [
          "Researchers visited",
          "the container port",
          "to analyze",
          "bilateral export traffic"
        ],
        "pills": [
          "container port",
          "export traffic",
          "Hannah and Oliver",
          "port terminal"
        ],
        "sentence_frame": "First, researchers visited [the container port] to inspect [bilateral export traffic]."
      },
      {
        "badge_label": "BUILD",
        "title": "Tariff Analysis",
        "image_url": "/images/week134/writing_panel_2.png",
        "caption": "Oliver evaluated tariff schedules to calculate comparative advantage.",
        "frame_L1": "Next, Oliver examined import tariffs. He proved that lowering duties reduced consumer prices across retail stores.",
        "connectors": [
          "Next,",
          "Subsequently,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences about analyzing tariff impacts on prices.",
        "pills": [
          "import tariffs",
          "lowered duties",
          "Oliver examined",
          "consumer prices"
        ],
        "sentence_frame": "Next, Oliver examined [import tariffs] and showed that [lowered duties reduced prices]."
      },
      {
        "badge_label": "WRITE",
        "title": "Debunking Fallacies",
        "image_url": "/images/week134/writing_panel_3.png",
        "caption": "Hannah used empirical data to debunk common trade deficit fallacies.",
        "frame_L1": "After that, Hannah spoke to trade delegates. She proved that trade deficit fears were based on invalid assumptions.",
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences about debunking economic fallacies.",
        "pills": [
          "trade delegates",
          "trade deficit fears",
          "invalid assumptions",
          "Hannah spoke"
        ],
        "sentence_frame": "After that, Hannah proved that [trade deficit fears] were based on [invalid assumptions]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Treaty Ratification",
        "image_url": "/images/week134/writing_panel_4.png",
        "caption": "Ministers ratified the trade accord based on valid economic models.",
        "frame_L1": "In the end, international leaders signed the trade treaty. Valid economic logic guided the new global accord.",
        "connectors": [
          "In the end,",
          "Finally,",
          "As a result,"
        ],
        "sentence_hint": "Write 2 sentences about signing the new trade treaty.",
        "pills": [
          "international leaders",
          "trade treaty",
          "valid economic logic",
          "global accord"
        ],
        "sentence_frame": "In the end, international leaders signed [the trade treaty] guided by [valid economic logic]."
      }
    ]
  }
};
export default writingHubData;
