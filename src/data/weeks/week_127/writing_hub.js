/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 127 | Theme: "Rebuttal Practice" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.855Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 127,
  "theme": "Rebuttal Practice",
  "cefr_level": "B1+ Academic",
  "picture_story": {
    "title": "Constructing an Argumentative Rebuttal Paragraph",
    "prompt_en": "Look at the four panels. Write a debate rebuttal paragraph dismantling an opposing argument. Use the 'They claim that... but I say...' framework, contrast connectors ('on the contrary', 'however'), and evidence-based reasoning. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn phản biện tranh biện bác bỏ một luận điểm đối lập. Sử dụng khung 'They claim that... but I say...', từ nối tương phản ('on the contrary', 'however'), và lập luận dựa trên bằng chứng. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "They claim that clean energy is too weak to power modern cities, but recent data proves the contrary. While opponents argue that solar power drops at night, big new batteries store extra power during sunny hours. On the contrary, recent studies show that clean power grids stay steady, proving the other claim false.",
    "word_bank": [
      "disagree",
      "counter",
      "point",
      "false",
      "true",
      "rebuttal",
      "refute",
      "evidence",
      "oppose",
      "validity"
    ],
    "sentence_frames": [
      "They say clean power is weak, but recent ___ proves them wrong.",
      "While opponents say solar power drops at night, battery ___ solves the issue.",
      "On the contrary, real data shows their first premise is completely ___.",
      "In the end, our clear rebuttal confirms the ___ of clean energy plans."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Acknowledging the Opponent's Claim",
        "title_vi": "Khung 1: Ghi Nhận Khẳng Định Của Đối Thủ",
        "image_url": "/images/week127/writing_panel_1.png",
        "image_prompt": "A debater taking concise notes while an opposing speaker presents at a tournament podium.",
        "caption": "Debaters listen carefully to find the exact claim made by the other side.",
        "sentence_frame": "Speakers [note the opposing claim] to [check its starting premise].",
        "pills": [
          "note the opposing claim",
          "check its starting premise",
          "spot false assumptions",
          "listen actively"
        ],
        "connectors": [
          "First,",
          "In the opening exchange,",
          "To begin,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Exposing the Flawed Assumption",
        "title_vi": "Khung 2: Vạch Trần Giả Định Sai Lầm",
        "image_url": "/images/week127/writing_panel_2.png",
        "image_prompt": "A magnifying glass examining an outdated statistical chart with red exclamation marks over errors.",
        "caption": "Rebuttal notes point out wrong facts and old numbers.",
        "sentence_frame": "A clear rebuttal [spots factual mistakes] in the [other side's old numbers].",
        "pills": [
          "spots factual mistakes",
          "other side's old numbers",
          "shows flawed reasoning",
          "weak basis"
        ],
        "connectors": [
          "However,",
          "Look closely,",
          "In fact,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Delivering Counter-Evidence",
        "title_vi": "Khung 3: Đưa Ra Bằng Chứng Phản Bác",
        "image_url": "/images/week127/writing_panel_3.png",
        "image_prompt": "A confident student presenting modern scientific research charts to debate judges.",
        "caption": "Speakers counter weak claims with real, checked studies.",
        "sentence_frame": "Debaters [share recent real studies] to [counter a false claim].",
        "pills": [
          "share recent real studies",
          "counter a false claim",
          "checked survey data",
          "verified facts"
        ],
        "connectors": [
          "On the contrary,",
          "However,",
          "Real data shows that"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Affirming the Stronger Position",
        "title_vi": "Khung 4: Khẳng Định Lập Trường Vững Chắc Hơn",
        "image_url": "/images/week127/writing_panel_4.png",
        "image_prompt": "Debate judges awarding high scores on a scoring tablet following a structured rebuttal.",
        "caption": "A structured rebuttal confirms the validity of the speaker's case.",
        "sentence_frame": "A clear rebuttal [answers the opposing claim] and [proves the validity of our idea].",
        "pills": [
          "answers the opposing claim",
          "proves the validity of our idea",
          "convinces the judges",
          "clear conclusion"
        ],
        "connectors": [
          "Ultimately,",
          "Therefore,",
          "In conclusion,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Stating the Opposing Point",
        "image_url": "/images/week127/writing_panel_1.png",
        "caption": "Debaters listen carefully to find the exact claim made by the other side.",
        "frame_L1": "Opponents claim that clean energy is unreliable. They argue solar power drops on cloudy days.",
        "connectors": [
          "They claim that",
          "Opponents argue that",
          "First,"
        ],
        "sentence_hint": "Write 2 sentences stating the opponent's argument fairly.",
        "ordered_chips": [
          "They claim that",
          "renewable energy is unreliable",
          "because solar output drops",
          "during cloudy winter weather."
        ],
        "pills": [
          "note the opposing claim",
          "check its starting premise",
          "spot false assumptions",
          "listen actively"
        ],
        "sentence_frame": "Speakers [note the opposing claim] to [check its starting premise]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Introducing the Contrast Marker",
        "image_url": "/images/week127/writing_panel_2.png",
        "caption": "Rebuttal notes point out wrong facts and old numbers.",
        "frame_L1": "However, that assumption is false. Modern batteries store excess electrical energy.",
        "connectors": [
          "However,",
          "Look closely,",
          "In fact,"
        ],
        "sentence_hint": "Write 2 sentences using 'However' or 'On the contrary' to introduce your counter-claim.",
        "pills": [
          "spots factual mistakes",
          "other side's old numbers",
          "shows flawed reasoning",
          "weak basis"
        ],
        "sentence_frame": "A clear rebuttal [spots factual mistakes] in the [other side's old numbers]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Presenting Verified Evidence",
        "image_url": "/images/week127/writing_panel_3.png",
        "caption": "Speakers counter weak claims with real, checked studies.",
        "frame_L1": "Recent engineering data shows constant power delivery. Modern battery storage prevents grid failures.",
        "connectors": [
          "On the contrary,",
          "However,",
          "Real data shows that"
        ],
        "sentence_hint": "Write 2 sentences citing facts that refute the opponent's claim.",
        "pills": [
          "share recent real studies",
          "counter a false claim",
          "checked survey data",
          "verified facts"
        ],
        "sentence_frame": "Debaters [share recent real studies] to [counter a false claim]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing the Rebuttal Outcome",
        "image_url": "/images/week127/writing_panel_4.png",
        "caption": "A structured rebuttal confirms the validity of the speaker's case.",
        "frame_L1": "Therefore, our position is factually true. Direct rebuttals win debates by exposing weak evidence.",
        "connectors": [
          "Ultimately,",
          "Therefore,",
          "In conclusion,"
        ],
        "sentence_hint": "Write 2 sentences concluding why your side has the stronger argument.",
        "pills": [
          "answers the opposing claim",
          "proves the validity of our idea",
          "convinces the judges",
          "clear conclusion"
        ],
        "sentence_frame": "A clear rebuttal [answers the opposing claim] and [proves the validity of our idea]."
      }
    ]
  }
};

export default writingHubData;
