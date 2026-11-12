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
    "title": "Turning a Written Essay into a Clear Speech",
    "prompt_en": "Look at the four panels. Write a practical guide paragraph explaining how to convert a written research essay into an engaging spoken presentation. Use oral signposting phrases ('Moving on to...', 'Turning our attention to...') and vocal delivery techniques. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn hướng dẫn thực tế giải thích cách chuyển đổi một bài luận nghiên cứu viết thành bài thuyết trình nói hấp dẫn. Sử dụng các cụm từ định hướng bằng lời ('Moving on to...', 'Turning our attention to...') và kỹ thuật diễn thuyết. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "To turn a written essay into a lively speech, copy your main ideas onto short cue cards. First, make a simple outline and use spoken signpost phrases like 'Moving on to our next point.' Next, practice your pacing and intonation so people stay interested. In the end, clear pauses and signposts help every listener follow your talk.",
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
      "When preparing a speech, speakers write short key words on ___ cards.",
      "Spoken ___ phrases like 'Moving on to...' guide listeners smoothly.",
      "Steady vocal ___ lets the audience think about hard points.",
      "In the end, clear voice delivery makes a memorable ___ talk."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Condensing Essays onto Cards",
        "title_vi": "Khung 1: Cô Đọng Bài Luận Lên Thẻ",
        "image_url": "/images/week126/writing_panel_1.png",
        "image_prompt": "A student highlighting key thesis lines on a printed essay and writing bullet points onto index cards.",
        "caption": "Writers put main ideas onto small cue cards with short notes.",
        "sentence_frame": "Speakers [shorten long written paragraphs] onto [small cue cards with key words].",
        "pills": [
          "shorten long written paragraphs",
          "small cue cards with key words",
          "highlight main ideas",
          "prepare speaking notes"
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
        "image_prompt": "A speaker on stage pointing to slides with signpost words like Next and Moving on.",
        "caption": "Signpost phrases guide the audience from one topic to the next.",
        "sentence_frame": "Spoken signposts [guide the listening audience] through [each clear step of the talk].",
        "pills": [
          "guide the listening audience",
          "each clear step of the talk",
          "signal topic changes",
          "move smoothly"
        ],
        "connectors": [
          "Next,",
          "After that,",
          "Moving on to our next point,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Rehearsing Vocal Modulation",
        "title_vi": "Khung 3: Diễn Tập Điều Biến Giọng Nói",
        "image_url": "/images/week126/writing_panel_3.png",
        "image_prompt": "A speaker practicing before an audio recorder with sound wave graphics illustrating pauses and intonation.",
        "caption": "Practicing speed and voice pitch stops your speech from sounding flat.",
        "sentence_frame": "Speakers [vary their vocal intonation] with [steady speaking pacing] to [keep listeners interested].",
        "pills": [
          "vary their vocal intonation",
          "steady speaking pacing",
          "keep listeners interested",
          "avoid flat delivery"
        ],
        "connectors": [
          "Meanwhile,",
          "During rehearsals,",
          "In addition,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Speaking Clearly on Stage",
        "title_vi": "Khung 4: Nói Rõ Ràng Trên Sân Khấu",
        "image_url": "/images/week126/writing_panel_4.png",
        "image_prompt": "A student standing confidently at a lecture hall microphone while the engaged audience listens intently.",
        "caption": "Clear signposts and steady delivery make spoken talks easy to follow.",
        "sentence_frame": "Clear delivery [turns a written essay into] a [lively spoken talk] for listeners.",
        "pills": [
          "turns a written essay into",
          "lively spoken talk",
          "clear vocal summary",
          "confident stage ending"
        ],
        "connectors": [
          "In conclusion,",
          "Finally,",
          "To sum up,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Making Simple Cue Cards",
        "image_url": "/images/week126/writing_panel_1.png",
        "caption": "Writers put main ideas onto small cue cards with short notes.",
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
          "shorten long written paragraphs",
          "small cue cards with key words",
          "highlight main ideas",
          "prepare speaking notes"
        ],
        "sentence_frame": "Speakers [shorten long written paragraphs] onto [small cue cards with key words]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Using Spoken Signposts",
        "image_url": "/images/week126/writing_panel_2.png",
        "caption": "Signpost phrases guide the audience from one topic to the next.",
        "frame_L1": "Signposting phrases tell the audience where the speech is going. They make transitions smooth.",
        "connectors": [
          "Next,",
          "After that,",
          "Moving on to our next point,"
        ],
        "sentence_hint": "Write 2 sentences explaining how signposts like 'Moving on to...' help listeners.",
        "pills": [
          "guide the listening audience",
          "each clear step of the talk",
          "signal topic changes",
          "move smoothly"
        ],
        "sentence_frame": "Spoken signposts [guide the listening audience] through [each clear step of the talk]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Using Good Speed and Tone",
        "image_url": "/images/week126/writing_panel_3.png",
        "caption": "Practicing speed and voice pitch stops your speech from sounding flat.",
        "frame_L1": "Speakers rehearse with a timer to adjust their speed. Changing pitch keeps the audience engaged.",
        "connectors": [
          "During practice,",
          "In addition,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences describing why pauses and vocal variety matter on stage.",
        "pills": [
          "vary their vocal intonation",
          "steady speaking pacing",
          "keep listeners interested",
          "avoid flat delivery"
        ],
        "sentence_frame": "Speakers [vary their vocal intonation] with [steady speaking pacing] to [keep listeners interested]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Wrapping Up the Speech",
        "image_url": "/images/week126/writing_panel_4.png",
        "caption": "Clear signposts and steady delivery make spoken talks easy to follow.",
        "frame_L1": "Clear delivery turns an essay into a memorable talk. The audience understands and remembers the main message.",
        "connectors": [
          "In conclusion,",
          "Finally,",
          "To sum up,"
        ],
        "sentence_hint": "Write 2 sentences summarizing how public speaking skills bring research alive.",
        "pills": [
          "turns a written essay into",
          "lively spoken talk",
          "clear vocal summary",
          "confident stage ending"
        ],
        "sentence_frame": "Clear delivery [turns a written essay into] a [lively spoken talk] for listeners."
      }
    ]
  }
};

export default writingHubData;
