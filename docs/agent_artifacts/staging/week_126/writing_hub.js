/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 126 | Theme: "From Essay to Speech" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.826Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 126,
  "theme": "From Essay to Speech",
  "cefr_level": "B1+ Academic",
  "picture_story": {
    "title": "Converting an Academic Paper into a Public Address",
    "prompt_en": "Look at the four panels. Write a practical guide paragraph explaining how to convert a written research essay into an engaging spoken presentation. Use oral signposting phrases ('Moving on to...', 'Turning our attention to...') and vocal delivery techniques. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn hướng dẫn thực tế giải thích cách chuyển đổi một bài luận nghiên cứu viết thành bài thuyết trình nói hấp dẫn. Sử dụng các cụm từ định hướng bằng lời ('Moving on to...', 'Turning our attention to...') và kỹ thuật diễn thuyết. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "To convert an academic essay into an engaging speech, speakers must condense paragraphs into concise cue cards. First, outline the core arguments and replace dense academic prose with oral signposting phrases like 'Moving on to our next finding.' Next, rehearse vocal pacing and intonation to keep the audience focused. Ultimately, deliberate pauses and clear signposts ensure the spoken delivery captivates listeners.",
    "word_bank": [
      "signpost",
      "cue",
      "transition",
      "rhetoric",
      "delivery",
      "articulate",
      "audience",
      "pacing",
      "intonation",
      "summary"
    ],
    "sentence_frames": [
      "When preparing a speech, speakers write concise keywords on ___ cards.",
      "Oral ___ markers like 'Moving on to...' guide listeners smoothly.",
      "Deliberate vocal ___ allows the audience to absorb complex points.",
      "In the end, clear vocal delivery produces a memorable ___ presentation."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Condensing Essays onto Cards",
        "title_vi": "Khung 1: Cô Đọng Bài Luận Lên Thẻ",
        "image_url": "/images/week126/writing_panel_1.png",
        "image_prompt": "A student highlighting key thesis lines on a printed essay and writing bullet points onto index cards.",
        "caption": "Writers condense paragraphs into concise cue card bullet points.",
        "sentence_frame": "Speakers [condense long written paragraphs] onto [compact cue cards with key phrases].",
        "pills": [
          "condense long written paragraphs",
          "compact cue cards with key phrases",
          "highlight essential claims",
          "prepare speaking prompts"
        ],
        "connectors": [
          "First,",
          "To begin with,",
          "In the planning phase,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Integrating Signposting Signals",
        "title_vi": "Khung 2: Tích Hợp Các Tín Hiệu Định Hướng",
        "image_url": "/images/week126/writing_panel_2.png",
        "image_prompt": "A podium speaker pointing to presentation slides labeled with transition words like Next and Furthermore.",
        "caption": "Signposting phrases guide the audience between major sections.",
        "sentence_frame": "Oral signposts [guide the listening audience] through [each logical step of the argument].",
        "pills": [
          "guide the listening audience",
          "each logical step of the argument",
          "signal topic changes",
          "transition smoothly"
        ],
        "connectors": [
          "Next,",
          "Moving on to the next step,",
          "Furthermore,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Rehearsing Vocal Modulation",
        "title_vi": "Khung 3: Diễn Tập Điều Biến Giọng Nói",
        "image_url": "/images/week126/writing_panel_3.png",
        "image_prompt": "A speaker practicing before an audio recorder with sound wave graphics illustrating pauses and intonation.",
        "caption": "Rehearsing pacing and vocal pitch prevents monotone delivery.",
        "sentence_frame": "Speakers [rehearse vocal pacing and intonation] to [maintain strong audience attention].",
        "pills": [
          "rehearse vocal pacing and intonation",
          "maintain strong audience attention",
          "avoid monotonous delivery",
          "practice strategic pauses"
        ],
        "connectors": [
          "Meanwhile,",
          "During rehearsals,",
          "In addition,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Captivating the Auditorium",
        "title_vi": "Khung 4: Lôi Cuốn Toàn Thể Khán Phòng",
        "image_url": "/images/week126/writing_panel_4.png",
        "image_prompt": "A student standing confidently at a lecture hall microphone while the engaged audience listens intently.",
        "caption": "Dynamic spoken delivery turns dry research into an inspiring speech.",
        "sentence_frame": "Confident delivery [transforms written academic research] into [an inspiring keynote address].",
        "pills": [
          "transforms written academic research",
          "an inspiring keynote address",
          "connects with the audience",
          "delivers clear conclusions"
        ],
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "As a result,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Organizing Speaker Prompts",
        "image_url": "/images/week126/writing_panel_1.png",
        "caption": "Writers condense paragraphs into concise cue card bullet points.",
        "frame_L1": "Speakers summarize paragraphs onto cue cards. Bullet points help them remember main points.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences about how cue cards help speakers stay organized.",
        "ordered_chips": [
          "Speakers write keywords",
          "on portable cue cards",
          "to guide their delivery",
          "without reading full texts."
        ],
        "pills": [
          "portable cue cards",
          "write keywords",
          "guide delivery",
          "stay organized"
        ],
        "sentence_frame": "Speakers [condense long written paragraphs] onto [compact cue cards with key phrases]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Applying Signpost Language",
        "image_url": "/images/week126/writing_panel_2.png",
        "caption": "Signposting phrases guide the audience between major sections.",
        "frame_L1": "Signposting phrases tell the audience where the speech is going. They make transitions smooth.",
        "connectors": [
          "Moving on,",
          "Next,",
          "Furthermore,"
        ],
        "sentence_hint": "Write 2 sentences explaining how signposts like 'Moving on to...' help listeners.",
        "pills": [
          "signposting phrases",
          "guide the audience",
          "smooth transitions",
          "signal topic changes"
        ],
        "sentence_frame": "Oral signposts [guide the listening audience] through [each logical step of the argument]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Mastering Tempo and Intonation",
        "image_url": "/images/week126/writing_panel_3.png",
        "caption": "Rehearsing pacing and vocal pitch prevents monotone delivery.",
        "frame_L1": "Speakers rehearse with a timer to adjust their speed. Changing pitch keeps the audience engaged.",
        "connectors": [
          "During practice,",
          "In addition,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences describing why pauses and vocal variety matter on stage.",
        "pills": [
          "rehearse with a timer",
          "adjust speaking speed",
          "changing vocal pitch",
          "keep audience engaged"
        ],
        "sentence_frame": "Speakers [rehearse vocal pacing and intonation] to [maintain strong audience attention]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing the Public Address",
        "image_url": "/images/week126/writing_panel_4.png",
        "caption": "Dynamic spoken delivery turns dry research into an inspiring speech.",
        "frame_L1": "Clear delivery turns an essay into a memorable talk. The audience understands and remembers the main message.",
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "Consequently,"
        ],
        "sentence_hint": "Write 2 sentences summarizing how public speaking skills bring research alive.",
        "pills": [
          "clear vocal delivery",
          "memorable keynote talk",
          "audience understands message",
          "inspires listeners"
        ],
        "sentence_frame": "Confident delivery [transforms written academic research] into [an inspiring keynote address]."
      }
    ]
  }
};
export default writingHubData;
