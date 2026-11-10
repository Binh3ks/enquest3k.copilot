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
    "title": "Citing Quantitative Evidence and Statistical Findings in Research",
    "prompt_en": "Look at the four panels. Write a research findings paragraph reporting quantitative data on youth gaming habits. Use formal attribution citation formulas ('According to a study by...', 'Statistics demonstrate that...', 'Data reveals that...') and precise numerical metrics. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn kết quả nghiên cứu báo cáo dữ liệu định lượng về thói quen chơi game của giới trẻ. Sử dụng các cấu trúc trích dẫn chính thức ('According to a study by...', 'Statistics demonstrate that...', 'Data reveals that...') và các chỉ số số liệu chính xác. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "According to a landmark empirical study conducted by university psychologists, seventy percent of adolescent students play video games on a weekly basis. Survey data demonstrates that a substantial majority of players utilize cooperative multiplayer modes to build social friendships. Furthermore, statistics reveal that only a small twelve-percent minority exhibit problematic sleep disruption, disproving the stereotype that all gaming harms academic wellbeing.",
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
      "According to a landmark ___, seventy percent of youth play digital games weekly.",
      "The collected survey ___ reveals that a substantial majority play cooperatively.",
      "Furthermore, statistics demonstrate that only a small ___ experiences sleep issues.",
      "Ultimately, citing verified ___ transforms personal claims into credible scholarship."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Formulating the Survey Hypothesis",
        "title_vi": "Khung 1: Xây Dựng Giả Thuyết Khảo Sát",
        "image_url": "/images/week133/writing_panel_1.png",
        "image_prompt": "Two researchers designing a questionnaire on laptop screens with statistical flowcharts on the whiteboard.",
        "caption": "Researchers draft a structured survey to test hypotheses against demographic data.",
        "sentence_frame": "Researchers [formulate an empirical hypothesis] to [evaluate youth gaming habits scientifically].",
        "pills": [
          "formulate an empirical hypothesis",
          "evaluate youth gaming habits scientifically",
          "structured survey questionnaire",
          "demographic research sample"
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
        "caption": "A randomized sample of respondents completes the quantitative questionnaire.",
        "sentence_frame": "A representative sample [completes the anonymous survey] to [provide verifiable numerical data].",
        "pills": [
          "completes the anonymous survey",
          "provide verifiable numerical data",
          "randomized participant sample",
          "diverse student population"
        ],
        "connectors": [
          "Next,",
          "During data collection,",
          "Across the survey,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Analyzing Numerical Metrics",
        "title_vi": "Khung 3: Phân Tích Các Chỉ Số Số Liệu",
        "image_url": "/images/week133/writing_panel_3.png",
        "image_prompt": "A researcher pointing to colorful pie charts and bar graphs showing seventy percent participation and high grades.",
        "caption": "Statistical analysis reveals that seventy percent of gamers maintain strong grades.",
        "sentence_frame": "Data analysis [reveals that a substantial majority] of [gamers maintain high academic standing].",
        "pills": [
          "reveals that a substantial majority",
          "gamers maintain high academic standing",
          "statistical pie charts",
          "seventy percent metric"
        ],
        "connectors": [
          "According to the data,",
          "Statistics reveal that,",
          "Furthermore,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Citing Formal Scholarly Findings",
        "title_vi": "Khung 4: Trích Dẫn Các Phát Hiện Học Thuật Chính Thức",
        "image_url": "/images/week133/writing_panel_4.png",
        "image_prompt": "A student presenting a research poster titled Deep Research & Data at a science symposium with faculty listening.",
        "caption": "Scholarly citation phrases ground arguments in verifiable scientific data.",
        "sentence_frame": "Scholarly citation formulas [transform subjective opinions into] an [evidence-based research publication].",
        "pills": [
          "transform subjective opinions into",
          "evidence-based research publication",
          "scholarly citation formulas",
          "verifiable academic proof"
        ],
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "Consequently,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Introducing the Survey Source",
        "image_url": "/images/week133/writing_panel_1.png",
        "caption": "Researchers draft a structured survey to test hypotheses against demographic data.",
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
          "according to a study",
          "university researchers",
          "seventy percent of students",
          "play video games weekly"
        ],
        "sentence_frame": "Researchers [formulate an empirical hypothesis] to [evaluate youth gaming habits scientifically]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Reporting the Majority Metric",
        "image_url": "/images/week133/writing_panel_2.png",
        "caption": "A randomized sample of respondents completes the quantitative questionnaire.",
        "frame_L1": "The survey data shows interesting facts. A large majority of players enjoy cooperative team games.",
        "connectors": [
          "Survey data shows,",
          "Furthermore,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences reporting the findings about the majority of players.",
        "pills": [
          "survey data shows",
          "large majority of players",
          "cooperative team games",
          "build friendships"
        ],
        "sentence_frame": "The collected survey data [reveals that a substantial majority] of [participants play cooperative games]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Quantifying the Minority Finding",
        "image_url": "/images/week133/writing_panel_3.png",
        "caption": "Statistical analysis reveals that seventy percent of gamers maintain strong grades.",
        "frame_L1": "Only a small minority has sleep problems. Statistics prove that most gamers keep good school marks.",
        "connectors": [
          "In contrast,",
          "Statistics demonstrate that,",
          "On the other hand,"
        ],
        "sentence_hint": "Write 2 sentences contrasting the small minority with the broader population.",
        "pills": [
          "small minority has issues",
          "statistics demonstrate that",
          "keep good school marks",
          "twelve percent metric"
        ],
        "sentence_frame": "Statistics demonstrate that [only a twelve-percent minority] experiences [problematic sleep disruption]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing Evidence-Based Claims",
        "image_url": "/images/week133/writing_panel_4.png",
        "caption": "Scholarly citation phrases ground arguments in verifiable scientific data.",
        "frame_L1": "Using real statistics makes our writing credible. Empirical evidence proves that stereotypes about gaming are false.",
        "connectors": [
          "In conclusion,",
          "Ultimately,",
          "Consequently,"
        ],
        "sentence_hint": "Write 2 sentences concluding why quantitative data makes claims believable.",
        "pills": [
          "real statistics create credibility",
          "empirical evidence proves",
          "stereotypes are false",
          "evidence-based scholarship"
        ],
        "sentence_frame": "Scholarly citation formulas [transform subjective opinions into] an [evidence-based research publication]."
      }
    ]
  }
};
export default writingHubData;
