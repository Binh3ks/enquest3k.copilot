/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 79 | Theme: "Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.703Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 79,
  "theme": "Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate",
  "cefr_level": "B1 Preliminary",
  "picture_story": {
    "title": "Structuring a Rebuttal in an Environmental Debate",
    "prompt_en": "Look at the four panels. Write a debate rebuttal paragraph comparing space exploration with Earth restoration. Use rebuttal transition signals (such as 'Yes, but...'), passive voice ('funds are allocated'), and comparatives ('more urgent than...'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn phản biện so sánh thám hiểm không gian với khôi phục Trái Đất. Sử dụng từ nối phản biện ('Yes, but...'), câu bị động ('funds are allocated'), và so sánh hơn ('more urgent than...'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Yes, space exploration develops advanced satellite technologies that monitor climate change, but restoring Earth's environment is far more urgent. Public funds should be allocated toward planting forests and building renewable solar farms. Protecting our only habitable planet is more critical than funding distant cosmic voyages.",
    "word_bank": [
      "exploration",
      "restoration",
      "planet",
      "investment",
      "priority",
      "renewable",
      "biodiversity",
      "debate",
      "evidence",
      "urgent"
    ],
    "sentence_frames": [
      "Yes, space exploration is valuable, but ecological ___ is more urgent.",
      "Weather satellites are placed in the ___ to monitor climate patterns.",
      "Public investment should be allocated toward clean ___ energy.",
      "Protecting Earth's ___ is our primary moral responsibility."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: The Space Exploration Argument",
        "title_vi": "Khung 1: Luận Điểm Thám Hiểm Không Gian",
        "image_url": "/images/week79/writing_panel_1.png",
        "image_prompt": "A modern spacecraft launching into starry space while orbital satellites beam scientific data back to Earth.",
        "caption": "Space research develops satellites that monitor atmospheric changes.",
        "sentence_frame": "Space exploration [develops advanced orbital satellites] that [monitor planetary climate change].",
        "pills": [
          "develops advanced orbital satellites",
          "monitor planetary climate change",
          "cosmic research",
          "technological breakthroughs"
        ],
        "connectors": [
          "First,",
          "On one hand,",
          "Proponents argue that"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Earth's Urgent Ecological Need",
        "title_vi": "Khung 2: Nhu Cầu Sinh Thái Cấp Bách Của Trái Đất",
        "image_url": "/images/week79/writing_panel_2.png",
        "image_prompt": "A dry cracked riverbed contrasting with green workers planting fresh tree seedlings.",
        "caption": "Ecological restoration is needed to rebuild degraded forests and oceans.",
        "sentence_frame": "Ecological restoration [is urgently required] to [rebuild vulnerable natural ecosystems].",
        "pills": [
          "is urgently required",
          "rebuild vulnerable natural ecosystems",
          "degraded habitats",
          "biodiversity protection"
        ],
        "connectors": [
          "However,",
          "In contrast,",
          "On the other hand,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Formulating the Rebuttal",
        "title_vi": "Khung 3: Thiết Lập Lời Phản Biện",
        "image_url": "/images/week79/writing_panel_3.png",
        "image_prompt": "A student speaker raising a hand at a debate podium delivering a confident rebuttal with data slides.",
        "caption": "Speakers acknowledge satellite value with 'Yes, but...' to introduce rebuttals.",
        "sentence_frame": "Yes, satellite technology is helpful, [but protecting Earth's climate] is [far more pressing].",
        "pills": [
          "but protecting Earth's climate",
          "far more pressing",
          "acknowledged the argument",
          "delivered a strong rebuttal"
        ],
        "connectors": [
          "Yes, but...",
          "Nevertheless,",
          "While this is true,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Balanced Planetary Action",
        "title_vi": "Khung 4: Hành Động Hành Tinh Cân Bằng",
        "image_url": "/images/week79/writing_panel_4.png",
        "image_prompt": "Solar panels and wind turbines shining on a green hillside with an Earth observation satellite overhead.",
        "caption": "Funds should be allocated to preserve our only living planet.",
        "sentence_frame": "Public resources [should be allocated] toward [protecting our only living planet].",
        "pills": [
          "should be allocated",
          "protecting our only living planet",
          "renewable energy investments",
          "sustainable future"
        ],
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "Therefore,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Acknowledging Technology",
        "image_url": "/images/week79/writing_panel_1.png",
        "caption": "Space research develops satellites that monitor atmospheric changes.",
        "frame_L1": "Space exploration produces helpful technologies. Satellites monitor atmospheric temperatures and ocean levels.",
        "connectors": [
          "First,",
          "On one hand,",
          "Initially,"
        ],
        "sentence_hint": "Write 2 sentences about how satellites assist science.",
        "ordered_chips": [
          "Space exploration develops",
          "valuable orbital satellites",
          "to monitor temperatures",
          "across Earth's atmosphere."
        ],
        "pills": [
          "develops orbital satellites",
          "monitor temperatures",
          "space exploration",
          "Earth's atmosphere"
        ],
        "sentence_frame": "Space exploration [develops advanced orbital satellites] that [monitor planetary climate change]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Highlighting Climate Urgency",
        "image_url": "/images/week79/writing_panel_2.png",
        "caption": "Ecological restoration is needed to rebuild degraded forests and oceans.",
        "frame_L1": "Restoring Earth's environment is more urgent than Mars missions. Forests and oceans need protection.",
        "connectors": [
          "However,",
          "In contrast,",
          "On the other hand,"
        ],
        "sentence_hint": "Write 2 sentences comparing ecological urgency with space travel.",
        "pills": [
          "more urgent than Mars",
          "forests and oceans",
          "need protection",
          "ecological restoration"
        ],
        "sentence_frame": "Restoring Earth's ecosystems [is far more urgent] than [funding distant space voyages]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Delivering the Rebuttal",
        "image_url": "/images/week79/writing_panel_3.png",
        "caption": "Speakers acknowledge satellite value with 'Yes, but...' to introduce rebuttals.",
        "frame_L1": "Yes, space science is inspiring, but Earth is our only home. Funds must be allocated to clean energy.",
        "connectors": [
          "Yes, but...",
          "Nevertheless,",
          "Even so,"
        ],
        "sentence_hint": "Write 2 sentences using 'Yes, but...' to introduce your counter-claim.",
        "pills": [
          "Yes, but...",
          "our only home",
          "funds must be allocated",
          "clean energy"
        ],
        "sentence_frame": "Yes, space research is helpful, [but protecting our home planet] is [our primary duty]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Concluding the Argument",
        "image_url": "/images/week79/writing_panel_4.png",
        "caption": "Funds should be allocated to preserve our only living planet.",
        "frame_L1": "Ultimately, space technology must serve Earth restoration. We must preserve our living planet for future generations.",
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "Therefore,"
        ],
        "sentence_hint": "Write 2 sentences synthesizing space technology and planetary care.",
        "pills": [
          "serve Earth restoration",
          "preserve our living planet",
          "future generations",
          "balanced investment"
        ],
        "sentence_frame": "Public resources [should be allocated] to [ensure a sustainable living planet]."
      }
    ]
  }
};
export default writingHubData;
