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
    "model_sentence": "They claim that renewable energy is too unreliable to power modern cities, but recent engineering data proves the contrary. While opponents argue that solar output drops at night, advanced battery storage facilities store excess power during peak hours. On the contrary, empirical studies demonstrate that modern renewable grids maintain steady electrical currents, exposing the opposition's premise as false.",
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
      "They say that renewable grids are unstable, but recent ___ proves otherwise.",
      "While opponents argue that solar power fluctuates, storage ___ solves the issue.",
      "On the contrary, empirical data exposes their premise as completely ___.",
      "In the end, our direct rebuttal confirms the ___ of clean energy policies."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Acknowledging the Opponent's Claim",
        "title_vi": "Khung 1: Ghi Nhận Khẳng Định Của Đối Thủ",
        "image_url": "/images/week127/writing_panel_1.png",
        "image_prompt": "A debater taking concise notes while an opposing speaker presents at a tournament podium.",
        "caption": "Debaters identify the exact claim made by the opposing speaker.",
        "sentence_frame": "Speakers [carefully note opposing arguments] to [understand the underlying premise].",
        "pills": [
          "carefully note opposing arguments",
          "understand the underlying premise",
          "identify logical assumptions",
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
        "caption": "Rebuttal analysis highlights factual errors and outdated evidence.",
        "sentence_frame": "The rebuttal [exposes factual errors] in the [opponent's outdated statistical data].",
        "pills": [
          "exposes factual errors",
          "opponent's outdated statistical data",
          "highlights flawed reasoning",
          "weak foundation"
        ],
        "connectors": [
          "However,",
          "Upon closer examination,",
          "In reality,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Delivering Counter-Evidence",
        "title_vi": "Khung 3: Đưa Ra Bằng Chứng Phản Bác",
        "image_url": "/images/week127/writing_panel_3.png",
        "image_prompt": "A confident student presenting modern scientific research charts to debate judges.",
        "caption": "Speakers counter with verifiable empirical research.",
        "sentence_frame": "Debaters [present recent empirical studies] to [counter the false assertion].",
        "pills": [
          "present recent empirical studies",
          "counter the false assertion",
          "verifiable research data",
          "peer-reviewed findings"
        ],
        "connectors": [
          "On the contrary,",
          "While proponents claim this,",
          "Evidence reveals that"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Affirming the Stronger Position",
        "title_vi": "Khung 4: Khẳng Định Lập Trường Vững Chắc Hơn",
        "image_url": "/images/week127/writing_panel_4.png",
        "image_prompt": "Debate judges awarding high scores on a scoring tablet following a structured rebuttal.",
        "caption": "A structured rebuttal confirms the validity of the speaker's case.",
        "sentence_frame": "A structured rebuttal [dismantles the opposing case] and [reaffirms the validity of our position].",
        "pills": [
          "dismantles the opposing case",
          "reaffirms the validity of our position",
          "persuades the adjudicators",
          "sound conclusion"
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
        "caption": "Debaters identify the exact claim made by the opposing speaker.",
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
          "opponents claim",
          "renewable energy is unreliable",
          "solar output drops",
          "stated fairly"
        ],
        "sentence_frame": "Opponents [claim that clean energy is unreliable] because [weather conditions fluctuate]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Introducing the Contrast Marker",
        "image_url": "/images/week127/writing_panel_2.png",
        "caption": "Rebuttal analysis highlights factual errors and outdated evidence.",
        "frame_L1": "However, that assumption is false. Modern batteries store excess electrical energy.",
        "connectors": [
          "However,",
          "On the contrary,",
          "In contrast,"
        ],
        "sentence_hint": "Write 2 sentences using 'However' or 'On the contrary' to introduce your counter-claim.",
        "pills": [
          "assumption is false",
          "modern batteries store power",
          "on the contrary",
          "flawed premise"
        ],
        "sentence_frame": "However, that assumption [is proven to be false] by [recent technological breakthroughs]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Presenting Verified Evidence",
        "image_url": "/images/week127/writing_panel_3.png",
        "caption": "Speakers counter with verifiable empirical research.",
        "frame_L1": "Recent engineering data shows constant power delivery. Modern battery storage prevents grid failures.",
        "connectors": [
          "Furthermore,",
          "Empirical data shows,",
          "In fact,"
        ],
        "sentence_hint": "Write 2 sentences citing facts that refute the opponent's claim.",
        "pills": [
          "engineering data shows",
          "constant power delivery",
          "prevents grid failures",
          "refutes the claim"
        ],
        "sentence_frame": "Empirical studies [demonstrate that battery storage] ensures [continuous electrical supply]."
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
          "factually true position",
          "direct rebuttal wins",
          "exposes weak evidence",
          "stronger argument"
        ],
        "sentence_frame": "Therefore, our evidence [confirms that clean energy is dependable] and [disproves the opposing claim]."
      }
    ]
  }
};
export default writingHubData;
