/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 81 | Theme: "ELA: The Master Architect (Structure) / Math: Graphing Data" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.704Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 81,
  "theme": "ELA: The Master Architect (Structure) / Math: Graphing Data",
  "cefr_level": "B1 Preliminary",
  "picture_story": {
    "title": "Constructing a Five-Paragraph Essay Blueprint",
    "prompt_en": "Look at the four panels. Write an expository paragraph explaining how to organize a five-paragraph essay using transition signals ('Firstly', 'Secondly', 'Furthermore', 'In conclusion'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn giải thích cách tổ chức bài luận 5 đoạn sử dụng từ nối chuyển ý ('Firstly', 'Secondly', 'Furthermore', 'In conclusion'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Firstly, the introduction builds a sturdy foundation with an engaging hook and a clear thesis statement. Secondly, the first body paragraph presents solid factual evidence and careful elaboration. Furthermore, subsequent body paragraphs strengthen the argument with logical transitions. In conclusion, the final paragraph restates the thesis and synthesizes key insights, completing the essay blueprint.",
    "word_bank": [
      "architect",
      "outline",
      "structure",
      "paragraph",
      "introduction",
      "thesis",
      "evidence",
      "conclusion",
      "transition",
      "cohesion"
    ],
    "sentence_frames": [
      "Firstly, the introduction provides a firm ___ for the entire essay.",
      "Secondly, each body paragraph presents factual ___ to prove the point.",
      "Furthermore, transition signals ensure logical ___ between sections.",
      "In conclusion, the final paragraph provides a clear ___ of the main claims."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Introduction Foundation",
        "title_vi": "Khung 1: Nền Móng Mở Bài",
        "image_url": "/images/week81/writing_panel_1.png",
        "image_prompt": "An architectural blueprint showing the concrete foundation of a house labeled 'Introduction & Thesis'.",
        "caption": "Firstly, the introduction establishes the thesis foundation.",
        "sentence_frame": "Firstly, the introductory paragraph [establishes a sturdy foundation] with [a clear thesis statement].",
        "pills": [
          "establishes a sturdy foundation",
          "a clear thesis statement",
          "compelling hook",
          "introductory paragraph"
        ],
        "connectors": [
          "Firstly,",
          "To begin with,",
          "In the opening section,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: First Supporting Pillar",
        "title_vi": "Khung 2: Cột Trụ Củng Cố Thứ Nhất",
        "image_url": "/images/week81/writing_panel_2.png",
        "image_prompt": "The first stone pillar of a building rising, labeled 'Body Paragraph 1: Evidence & Examples'.",
        "caption": "Secondly, the first body paragraph provides evidence.",
        "sentence_frame": "Secondly, the first body paragraph [provides factual evidence] to [support the main thesis].",
        "pills": [
          "provides factual evidence",
          "support the main thesis",
          "topic sentence",
          "first supporting pillar"
        ],
        "connectors": [
          "Secondly,",
          "Next,",
          "Following this,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Building Cohesion",
        "title_vi": "Khung 3: Xây Dựng Tính Gắn Kết",
        "image_url": "/images/week81/writing_panel_3.png",
        "image_prompt": "Connecting arches between pillars labeled with transition words like 'Furthermore' and 'In addition'.",
        "caption": "Furthermore, transition signals link subsequent body paragraphs.",
        "sentence_frame": "Furthermore, transition signals [link supporting paragraphs smoothly] to [create strong cohesion].",
        "pills": [
          "link supporting paragraphs smoothly",
          "create strong cohesion",
          "subsequent body sections",
          "logical progression"
        ],
        "connectors": [
          "Furthermore,",
          "In addition,",
          "Moreover,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: The Concluding Roof",
        "title_vi": "Khung 4: Mái Nhà Kết Luận",
        "image_url": "/images/week81/writing_panel_4.png",
        "image_prompt": "A finished house with a sheltering roof labeled 'Conclusion: Synthesis & Reflection'.",
        "caption": "In conclusion, the final paragraph synthesizes key arguments.",
        "sentence_frame": "In conclusion, the final paragraph [synthesizes key arguments] and [restates the core thesis].",
        "pills": [
          "synthesizes key arguments",
          "restates the core thesis",
          "lasting final reflection",
          "completing the structure"
        ],
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "To summarize,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Building the Foundation",
        "image_url": "/images/week81/writing_panel_1.png",
        "caption": "Firstly, the introduction establishes the thesis foundation.",
        "frame_L1": "Firstly, the introduction establishes a firm foundation. It presents a hook and a clear thesis.",
        "connectors": [
          "Firstly,",
          "To begin with,",
          "In the opening section,"
        ],
        "sentence_hint": "Write 2 sentences about the introduction and thesis.",
        "ordered_chips": [
          "Firstly, the introduction",
          "lays a solid foundation",
          "with an engaging hook",
          "and clear thesis."
        ],
        "pills": [
          "lays a solid foundation",
          "engaging hook",
          "clear thesis",
          "introduction"
        ],
        "sentence_frame": "Firstly, the introduction [lays a solid foundation] with [a clear thesis statement]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Supporting Body Pillars",
        "image_url": "/images/week81/writing_panel_2.png",
        "caption": "Secondly, the first body paragraph provides evidence.",
        "frame_L1": "Secondly, body paragraphs provide strong evidence. They explain reasons with real examples.",
        "connectors": [
          "Secondly,",
          "Next,",
          "Following this,"
        ],
        "sentence_hint": "Write 2 sentences describing evidence in body paragraphs.",
        "pills": [
          "strong evidence",
          "body paragraphs",
          "real examples",
          "topic sentences"
        ],
        "sentence_frame": "Secondly, the body paragraphs [present factual evidence] and [explain reasons clearly]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Seamless Transitions",
        "image_url": "/images/week81/writing_panel_3.png",
        "caption": "Furthermore, transition signals link subsequent body paragraphs.",
        "frame_L1": "Furthermore, transition signals connect each idea. Words like 'moreover' create strong cohesion.",
        "connectors": [
          "Furthermore,",
          "In addition,",
          "Moreover,"
        ],
        "sentence_hint": "Write 2 sentences about using transition words.",
        "pills": [
          "transition signals",
          "connect each idea",
          "strong cohesion",
          "smooth flow"
        ],
        "sentence_frame": "Furthermore, transition words [connect ideas smoothly] and [ensure logical cohesion]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Sheltering Conclusion",
        "image_url": "/images/week81/writing_panel_4.png",
        "caption": "In conclusion, the final paragraph synthesizes key arguments.",
        "frame_L1": "In conclusion, the final paragraph unifies the essay. It restates the thesis and offers lasting insight.",
        "connectors": [
          "In conclusion,",
          "To summarize,",
          "Ultimately,"
        ],
        "sentence_hint": "Write 2 sentences summarizing the concluding paragraph.",
        "pills": [
          "unifies the essay",
          "restates the thesis",
          "lasting insight",
          "completes the blueprint"
        ],
        "sentence_frame": "In conclusion, the writer [restates the thesis] and [synthesizes the main points]."
      }
    ]
  }
};
export default writingHubData;
