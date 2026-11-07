/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 125 | Theme: "Intro & Conclusion (Academic Essay Structure)" | CEFR: B1+ Academic
 * Generated: 2026-11-07T07:16:42.031Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 125,
  "theme": "Intro & Conclusion (Academic Essay Structure)",
  "cefr_level": "B1+ Academic",
  "picture_story": {
    "title": "Academic Composition: Framing Arguments with Rigor",
    "prompt_en": "Look at the stages of essay composition. Write an academic synthesis illustrating how introductions and conclusions frame scholarly research. Write 35 or more words.",
    "prompt_vi": "Nhìn vào các giai đoạn soạn thảo bài luận. Viết đoạn tổng hợp học thuật minh họa cách mở bài và kết bài định hình nghiên cứu khoa học (từ 35 từ trở lên).",
    "min_sentences": 3,
    "min_words": 35,
    "max_words": 100,
    "model_sentence": "In scholarly composition, introductory and concluding paragraphs function as critical conceptual bookends that determine analytical rigor. An authoritative introduction captures scholarly attention through an engaging rhetorical hook before establishing context and articulating a precise, debatable thesis statement. Throughout the body paragraphs, authors evaluate empirical evidence from divergent perspectives, addressing counterarguments to demonstrate intellectual balance. In contrast to mechanical summaries that reiterate claims verbatim, an effective conclusion synthesizes primary findings into a unified framework. Furthermore, rigorous conclusions outline far-reaching implications, urging researchers and policymakers to implement evidence-based reforms.",
    "word_bank": [
      "conclusion",
      "introduction",
      "thesis",
      "synthesis",
      "perspective",
      "evidence",
      "counterargument",
      "implication",
      "summarize",
      "restate",
      "urge",
      "recommend",
      "advocate",
      "persuasive",
      "rigorous",
      "cohesive"
    ],
    "sentence_frames": [
      "An authoritative introduction must culminate in a precise and debatable ___ statement.",
      "Scholars evaluate empirical evidence from divergent ___ to substantiate claims.",
      "Professor Vance ___ addressing counterarguments to cultivate intellectual balance.",
      "A rigorous conclusion synthesizes primary evidence, ___ policymakers toward reform."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Framing the Introduction and Thesis",
        "title_vi": "Cảnh 1: Định Hình Mở Bài Và Luận Đề",
        "image_url": "/images/week125/writing_panel_1.png",
        "image_prompt": "A university student drafting a paper on a laptop in a quiet academic research library with books, focused lighting.",
        "caption": "Julian drafted an engaging rhetorical question to frame the problem before stating his thesis.",
        "sentence_frame": "In the introductory paragraph, Julian [formulated a compelling rhetorical hook] before [stating an explicit thesis statement].",
        "pills": [
          "formulated a compelling rhetorical hook",
          "stating an explicit thesis statement",
          "academic introduction",
          "intellectual framework",
          "define the scope"
        ],
        "connectors": [
          "First,",
          "In the introduction,",
          "To commence the inquiry,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Evaluating Empirical Evidence",
        "title_vi": "Cảnh 2: Đánh Giá Bằng Chứng Thực Nghiệm",
        "image_url": "/images/week125/writing_panel_2.png",
        "image_prompt": "A researcher analyzing highlighted academic papers and data graphs on a wooden seminar table.",
        "caption": "Claire examined peer-reviewed empirical studies to support her propositions with rigorous data.",
        "sentence_frame": "To ensure academic credibility, Claire [reviewed empirical evidence] from [multiple scholarly perspectives].",
        "pills": [
          "reviewed empirical evidence",
          "multiple scholarly perspectives",
          "peer-reviewed research",
          "intellectual balance",
          "substantiate claims"
        ],
        "connectors": [
          "Subsequently,",
          "In the literature review,",
          "Furthermore,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Rebutting Counterarguments",
        "title_vi": "Cảnh 3: Phản Biện Luận Điểm Đối Lập",
        "image_url": "/images/week125/writing_panel_3.png",
        "image_prompt": "A university professor discussing argumentative structure with two students in front of a whiteboard diagram.",
        "caption": "Professor Vance recommended addressing counterarguments directly to establish persuasive stance.",
        "sentence_frame": "Professor Vance [recommended addressing counterarguments] to [demonstrate persuasive rigor].",
        "pills": [
          "recommended addressing counterarguments",
          "demonstrate persuasive rigor",
          "analytical balance",
          "persuasive stance verbs",
          "academic maturity"
        ],
        "connectors": [
          "Importantly,",
          "To address objections,",
          "On the contrary,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Concluding Synthesis and Implications",
        "title_vi": "Cảnh 4: Tổng Hợp Kết Luận Và Hàm Ý Chính Sách",
        "image_url": "/images/week125/writing_panel_4.png",
        "image_prompt": "A student presenting concluding slides with a synthesis diagram to a university lecture hall audience.",
        "caption": "Julian synthesized his findings into broad implications, urging policymakers to act decisively.",
        "sentence_frame": "Rather than summarizing points mechanically, the conclusion [synthesizes primary findings] and [urges policymakers to adopt reforms].",
        "pills": [
          "synthesizes primary findings",
          "urges policymakers to adopt reforms",
          "far-reaching policy implications",
          "cohesive argument",
          "authoritative conclusion"
        ],
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "Consequently,"
        ]
      }
    ],
    "steps": [
      {
        "scene": 1,
        "ladder_stage": "MODEL",
        "badge_label": "MODEL",
        "title": "Scene 1: Framing the Introduction and Thesis",
        "image_url": "/images/week125/writing_panel_1.png",
        "caption": "Julian drafted an engaging rhetorical question to frame the problem before stating his thesis.",
        "frame_L1": "In the introductory paragraph, Julian formulated a compelling hook. He articulated a precise, debatable thesis statement.",
        "connectors": [
          "In the introduction,",
          "First,",
          "To begin with,"
        ],
        "sentence_hint": "Write 2 sentences about creating an introductory hook and stating a clear thesis.",
        "pills": [
          "formulated a compelling hook",
          "stated an explicit thesis",
          "intellectual scope",
          "Julian"
        ],
        "sentence_frame": "In the introductory paragraph, Julian [formulated a compelling rhetorical hook] before [stating an explicit thesis statement]."
      },
      {
        "scene": 2,
        "ladder_stage": "BUILD",
        "badge_label": "BUILD",
        "title": "Scene 2: Evaluating Empirical Evidence",
        "image_url": "/images/week125/writing_panel_2.png",
        "caption": "Claire examined peer-reviewed empirical studies to support her propositions with rigorous data.",
        "frame_L1": "To substantiate her argument, Claire reviewed empirical data. She examined findings from multiple scholarly perspectives.",
        "connectors": [
          "Subsequently,",
          "In the body paragraphs,",
          "Furthermore,"
        ],
        "sentence_hint": "Write 2 sentences about reviewing empirical evidence across perspectives.",
        "pills": [
          "reviewed empirical evidence",
          "multiple perspectives",
          "peer-reviewed research",
          "Claire"
        ],
        "sentence_frame": "To ensure academic credibility, Claire [reviewed empirical evidence] from [multiple scholarly perspectives]."
      },
      {
        "scene": 3,
        "ladder_stage": "WRITE",
        "badge_label": "WRITE",
        "title": "Scene 3: Rebutting Counterarguments",
        "image_url": "/images/week125/writing_panel_3.png",
        "caption": "Professor Vance recommended addressing counterarguments directly to establish persuasive stance.",
        "frame_L1": "Professor Vance recommended addressing counterarguments directly. This critical move demonstrates analytical balance and rigor.",
        "connectors": [
          "Importantly,",
          "To address objections,",
          "On the contrary,"
        ],
        "sentence_hint": "Write 2 sentences using stance verbs about addressing counterarguments.",
        "pills": [
          "recommended addressing counterarguments",
          "demonstrate persuasive rigor",
          "analytical balance",
          "Professor Vance"
        ],
        "sentence_frame": "Professor Vance [recommended addressing counterarguments] to [demonstrate persuasive rigor]."
      },
      {
        "scene": 4,
        "ladder_stage": "EXPAND",
        "badge_label": "EXPAND",
        "title": "Scene 4: Concluding Synthesis and Implications",
        "image_url": "/images/week125/writing_panel_4.png",
        "caption": "Julian synthesized his findings into broad implications, urging policymakers to act decisively.",
        "frame_L1": "In the conclusion, Julian synthesized primary evidence. He articulated broad implications, urging leaders toward reform.",
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "Consequently,"
        ],
        "sentence_hint": "Write 2 sentences using 'synthesize' and 'urge' to outline policy implications.",
        "pills": [
          "synthesizes primary findings",
          "urges policymakers to adopt reforms",
          "policy implications",
          "authoritative conclusion"
        ],
        "sentence_frame": "Rather than summarizing points mechanically, the conclusion [synthesizes primary findings] and [urges policymakers to adopt reforms]."
      }
    ]
  }
};
export default writingHubData;
