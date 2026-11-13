/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 133 | Theme: "Deep Research & Data" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.872Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 133,
  "theme": "Deep Research & Data",
  "cefr_level": "B1+ Academic",
  "picture_story": {
    "title": "Using Numbers and Study Findings in Debate Writing",
    "prompt_en": "Look at the four panels. Write a research findings paragraph reporting quantitative data on youth gaming habits. Use formal attribution citation formulas ('According to a study by...', 'Statistics demonstrate that...', 'Data reveals that...') and precise numerical metrics. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn kết quả nghiên cứu báo cáo dữ liệu định lượng về thói quen chơi game của giới trẻ. Sử dụng các cấu trúc trích dẫn chính thức ('According to a study by...', 'Statistics demonstrate that...', 'Data reveals that...') và các chỉ số số liệu chính xác. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "According to an empirical study by school researchers, seventy percent of students play video games every week. Survey data shows that a large majority of players use team games to build friendships. In addition, statistics reveal that only a small minority lose sleep, showing that most students balance gaming and homework well.",
    "word_bank": [
      "statistic",
      "percent",
      "study",
      "data",
      "majority",
      "minority",
      "survey",
      "population",
      "sample",
      "empirical"
    ],
    "sentence_frames": [
      "According to a recent ___, seventy percent of students play games weekly.",
      "The collected survey ___ reveals that a large majority play together.",
      "In addition, statistics show that only a small ___ loses sleep at night.",
      "Finally, sharing checked ___ turns a guess into strong proof."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Formulating the Survey Hypothesis",
        "title_vi": "Khung 1: Xây Dựng Giả Thuyết Khảo Sát",
        "image_url": "/images/week133/writing_panel_1.png",
        "image_prompt": "Two researchers designing a questionnaire on laptop screens with statistical flowcharts on the whiteboard.",
        "caption": "Students plan a short survey to test ideas with real school data.",
        "sentence_frame": "Students [test an empirical hypothesis] to [check how gaming affects study time].",
        "pills": [
          "test an empirical hypothesis",
          "check how gaming affects study time",
          "short survey questions",
          "fair student sample"
        ],
        "connectors": [
          "First,",
          "In the planning phase,",
          "To begin the study,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Sampling the Student Population",
        "title_vi": "Khung 2: Lấy Mẫu Quần Thể Học Sinh",
        "image_url": "/images/week133/writing_panel_2.png",
        "image_prompt": "Students in a school computer lab quietly answering an online research survey with privacy dividers.",
        "caption": "A fair random sample of students answers the short online survey.",
        "sentence_frame": "A fair student sample [answers the short online survey] to [share true number facts].",
        "pills": [
          "answers the short online survey",
          "share true number facts",
          "randomized student sample",
          "fair school group"
        ],
        "connectors": [
          "Survey data shows,",
          "In addition,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Analyzing Numerical Metrics",
        "title_vi": "Khung 3: Phân Tích Các Chỉ Số Số Liệu",
        "image_url": "/images/week133/writing_panel_3.png",
        "image_prompt": "A researcher pointing to colorful pie charts and bar graphs showing seventy percent participation and high grades.",
        "caption": "Simple charts show that seventy percent of gamers keep strong grades.",
        "sentence_frame": "Data charts [show that a large majority] of [gamers keep strong school grades].",
        "pills": [
          "show that a large majority",
          "gamers keep strong school grades",
          "simple pie charts",
          "seventy percent result"
        ],
        "connectors": [
          "According to the data,",
          "Statistics reveal that,",
          "In addition,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Sharing Clear Study Proof",
        "title_vi": "Khung 4: Chia Sẻ Bằng Chứng Rõ Ràng",
        "image_url": "/images/week133/writing_panel_4.png",
        "image_prompt": "A student presenting a research poster titled Deep Research & Data at a science symposium with faculty listening.",
        "caption": "Clear citation phrases base your points on checked facts.",
        "sentence_frame": "Clear citation phrases [turn personal guesses into] an [honest fact-based report].",
        "pills": [
          "turn personal guesses into",
          "honest fact-based report",
          "clear citation phrases",
          "checked school facts"
        ],
        "connectors": [
          "In conclusion,",
          "Finally,",
          "Because of this,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Introducing the Survey Source",
        "image_url": "/images/week133/writing_panel_1.png",
        "caption": "Students plan a short survey to test ideas with real school data.",
        "frame_L1": "Scientists conducted a study on video games. They surveyed many students to collect facts.",
        "connectors": [
          "First,",
          "According to researchers,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences introducing who conducted the study and what was investigated.",
        "ordered_chips": [
          "According to a study",
          "by university researchers,",
          "seventy percent of students",
          "play video games weekly."
        ],
        "pills": [
          "test an empirical hypothesis",
          "check how gaming affects study time",
          "short survey questions",
          "fair student sample"
        ],
        "sentence_frame": "Students [test an empirical hypothesis] to [check how gaming affects study time]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Collecting Survey Answers",
        "image_url": "/images/week133/writing_panel_2.png",
        "caption": "A fair random sample of students answers the short online survey.",
        "frame_L1": "The survey data shows interesting facts. A large majority of players enjoy cooperative team games.",
        "connectors": [
          "Survey data shows,",
          "In addition,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences reporting the findings about the majority of players.",
        "pills": [
          "answers the short online survey",
          "share true number facts",
          "randomized student sample",
          "fair school group"
        ],
        "sentence_frame": "A fair student sample [answers the short online survey] to [share true number facts]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Quantifying the Minority Finding",
        "image_url": "/images/week133/writing_panel_3.png",
        "caption": "Simple charts show that seventy percent of gamers keep strong grades.",
        "frame_L1": "Only a small minority has sleep problems. Statistics prove that most gamers keep good school marks.",
        "connectors": [
          "According to the data,",
          "Statistics reveal that,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences contrasting the small minority with the broader population.",
        "pills": [
          "show that a large majority",
          "gamers keep strong school grades",
          "simple pie charts",
          "seventy percent result"
        ],
        "sentence_frame": "Data charts [show that a large majority] of [gamers keep strong school grades]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing Evidence-Based Claims",
        "image_url": "/images/week133/writing_panel_4.png",
        "caption": "Clear citation phrases base your points on checked facts.",
        "frame_L1": "Using real statistics makes our writing trusted. Empirical evidence proves that guesses about gaming can be false.",
        "connectors": [
          "In conclusion,",
          "Finally,",
          "Because of this,"
        ],
        "sentence_hint": "Write 2 sentences concluding why quantitative data makes claims believable.",
        "pills": [
          "turn personal guesses into",
          "honest fact-based report",
          "clear citation phrases",
          "checked school facts"
        ],
        "sentence_frame": "Clear citation phrases [turn personal guesses into] an [honest fact-based report]."
      }
    ]
  }
};

export default writingHubData;
