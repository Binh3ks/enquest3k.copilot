/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 131 | Theme: "Opinion Project 3: Persuasive Techniques" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.868Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 131,
  "theme": "Opinion Project 3: Persuasive Techniques",
  "cefr_level": "B1+ Academic",
  "picture_story": {
    "title": "Applying Rhetorical Appeals in a Persuasive Public Address",
    "prompt_en": "Look at the four panels. Write a persuasive speech paragraph advocating for digital wellness boundaries. Combine ethical credibility (ethos), emotional resonance (pathos), and logical data (logos). Use rhetorical triads or inverted emphasis ('not only does it...'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn bài phát biểu thuyết phục vận động cho các ranh giới sống khỏe kỹ thuật số. Kết hợp uy tín đạo đức (ethos), cảm xúc cộng hưởng (pathos) và dữ liệu logic (logos). Sử dụng bộ ba tu từ hoặc nhấn mạnh đảo ngữ ('not only does it...'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "To persuade an audience effectively, an orator must balance ethos, pathos, and logos. Drawing on verified pediatric studies establishes scientific ethos, while personal stories of student isolation evoke profound pathos. Not only does digital moderation protect nocturnal sleep cycles, but it also revitalizes deep classroom focus. By uniting empirical logic with heartfelt emotion, speakers inspire authentic commitment to community wellbeing.",
    "word_bank": [
      "persuasion",
      "ethos",
      "pathos",
      "logos",
      "credibility",
      "rhetorical",
      "emotion",
      "logic",
      "convince",
      "cadence"
    ],
    "sentence_frames": [
      "An effective speech combines personal ethos with logical ___.",
      "Vivid stories evoke emotional ___ and touch the listeners' hearts.",
      "Not only does balanced screen time protect sleep, but it also improves ___ focus.",
      "Ultimately, uniting emotion and evidence creates irresistible ___ power."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Establishing Speaker Credibility (Ethos)",
        "title_vi": "Khung 1: Thiết Lập Uy Tín Diễn Giả (Ethos)",
        "image_url": "/images/week131/writing_panel_1.png",
        "image_prompt": "A student speaker standing before an academic seal presenting peer-reviewed medical credentials.",
        "caption": "Ethos establishes trust through research integrity and ethical leadership.",
        "sentence_frame": "The speaker [establishes moral and scholarly credibility] by [citing verified scientific research].",
        "pills": [
          "establishes moral and scholarly credibility",
          "citing verified scientific research",
          "demonstrates personal integrity",
          "builds audience trust"
        ],
        "connectors": [
          "First,",
          "To begin with,",
          "By establishing ethos,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Evoking Emotional Empathy (Pathos)",
        "title_vi": "Khung 2: Khơi Gợi Sự Đồng Cảm Cảm Xúc (Pathos)",
        "image_url": "/images/week131/writing_panel_2.png",
        "image_prompt": "An audience listening with touched, thoughtful expressions as a story of child wellness is told.",
        "caption": "Pathos touches human emotion through compelling personal stories.",
        "sentence_frame": "Vivid storytelling [evokes genuine emotional empathy] across [the assembled listeners].",
        "pills": [
          "evokes genuine emotional empathy",
          "the assembled listeners",
          "touches human hearts",
          "awakens moral concern"
        ],
        "connectors": [
          "Furthermore,",
          "Next,",
          "Through heartfelt pathos,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Anchoring Logic and Data (Logos)",
        "title_vi": "Khung 3: Cố Định Logic và Dữ Liệu (Logos)",
        "image_url": "/images/week131/writing_panel_3.png",
        "image_prompt": "A digital screen displaying clear bar charts correlating sleep hours with academic performance.",
        "caption": "Logos satisfies rational scrutiny with verifiable statistical proof.",
        "sentence_frame": "Empirical data [provides undeniable logical proof] to [substantiate the central thesis].",
        "pills": [
          "provides undeniable logical proof",
          "substantiate the central thesis",
          "statistical bar charts",
          "rigorous reasoning"
        ],
        "connectors": [
          "In addition,",
          "Providing logos,",
          "Empirical data reveals that"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Inspiring Collective Action",
        "title_vi": "Khung 4: Truyền Cảm Hứng Cho Hành Động Tập Thể",
        "image_url": "/images/week131/writing_panel_4.png",
        "image_prompt": "An auditorium of diverse citizens raising hands in unanimous support of a community wellness agreement.",
        "caption": "Uniting rhetoric appeals moves communities to enact positive changes.",
        "sentence_frame": "Harmonizing these appeals [inspires the community to embrace] a [healthier digital future].",
        "pills": [
          "inspires the community to embrace",
          "healthier digital future",
          "unanimous civic commitment",
          "authentic persuasion"
        ],
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "Therefore,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Building Speaker Credibility",
        "image_url": "/images/week131/writing_panel_1.png",
        "caption": "Ethos establishes trust through research integrity and ethical leadership.",
        "frame_L1": "Speakers establish credibility by citing medical facts. Trust helps the audience listen carefully.",
        "connectors": [
          "First,",
          "To establish ethos,",
          "Initially,"
        ],
        "sentence_hint": "Write 2 sentences explaining how ethos creates trust.",
        "ordered_chips": [
          "Speakers build credibility",
          "by citing verified research",
          "to establish trust",
          "with their audience."
        ],
        "pills": [
          "build credibility",
          "verified research",
          "establish trust",
          "thoughtful listeners"
        ],
        "sentence_frame": "The speaker [establishes moral and scholarly credibility] by [citing verified scientific research]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Engaging Audience Empathy",
        "image_url": "/images/week131/writing_panel_2.png",
        "caption": "Pathos touches human emotion through compelling personal stories.",
        "frame_L1": "Personal stories touch listeners' hearts. Pathos makes dry data feel urgent and meaningful.",
        "connectors": [
          "Furthermore,",
          "Through pathos,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences describing how emotional storytelling inspires listeners.",
        "pills": [
          "personal stories",
          "touch listeners hearts",
          "pathos makes data urgent",
          "meaningful message"
        ],
        "sentence_frame": "Vivid storytelling [evokes genuine emotional empathy] across [the assembled listeners]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Providing Verifiable Logic",
        "image_url": "/images/week131/writing_panel_3.png",
        "caption": "Logos satisfies rational scrutiny with verifiable statistical proof.",
        "frame_L1": "Statistical charts prove the point logically. Logos ensures that listeners cannot dismiss the argument.",
        "connectors": [
          "Providing logos,",
          "In addition,",
          "Logically,"
        ],
        "sentence_hint": "Write 2 sentences explaining why data and reasoning complete the appeal.",
        "pills": [
          "statistical charts",
          "proves the point logically",
          "satisfies rational inquiry",
          "solid evidence"
        ],
        "sentence_frame": "Empirical data [provides undeniable logical proof] to [substantiate the central thesis]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Inspiring Action with Cadence",
        "image_url": "/images/week131/writing_panel_4.png",
        "caption": "Uniting rhetoric appeals moves communities to enact positive changes.",
        "frame_L1": "Not only does rhetoric inform the mind, but it also inspires action. Together, these appeals persuade everyone.",
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "Consequently,"
        ],
        "sentence_hint": "Write 2 sentences using 'Not only does it...' to summarize the full impact.",
        "pills": [
          "inform the mind",
          "inspire positive action",
          "persuasive rhetoric",
          "community change"
        ],
        "sentence_frame": "Harmonizing these appeals [inspires the community to embrace] a [healthier digital future]."
      }
    ]
  }
};
export default writingHubData;
