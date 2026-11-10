/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 134 | Theme: "Identifying Fallacies" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.456Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 134,
  "theme": "Identifying Fallacies",
  "cefr_level": "B2 First",
  "picture_story": {
    "title": "Identifying and Correcting Generalization Fallacies in Arguments",
    "prompt_en": "Look at the four panels. Write a critical analysis paragraph identifying a hasty generalization fallacy in a media statement and correcting it using careful qualifiers ('some', 'many', 'often', 'tend to'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn phân tích phê phán nhận diện lỗi ngụy biện khái quát hóa vội vã trong một phát ngôn truyền thông và sửa lại bằng các từ chỉ mức độ cẩn trọng ('some', 'many', 'often', 'tend to'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Claiming that all video gamers are lazy and unmotivated represents an invalid hasty generalization fallacy. This flawed assumption ignores empirical research showing that many gamers develop strategic thinking and teamwork skills. To maintain academic soundness, critical thinkers must use careful qualifiers, noting that while excessive gaming may impair some students, many players manage their screen time responsibly.",
    "word_bank": [
      "fallacy",
      "generalization",
      "assumption",
      "true",
      "false",
      "valid",
      "invalid",
      "logic",
      "premise",
      "stereotype"
    ],
    "sentence_frames": [
      "Claiming that all gamers are lazy represents a classic hasty ___ fallacy.",
      "This invalid argument rests on a completely false ___.",
      "In contrast, empirical studies prove that ___ players build strong problem-solving skills.",
      "Ultimately, using qualifiers like 'often' and 'tend to' ensures logical ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Identifying the Universal Claim",
        "title_vi": "Khung 1: Nhận Diện Khẳng Định Tuyệt Đối",
        "image_url": "/images/week134/writing_panel_1.png",
        "image_prompt": "A student circling words like ALL and NEVER in red marker on a printed newspaper editorial.",
        "caption": "Absolute universal claims often signal an invalid generalization fallacy.",
        "sentence_frame": "The editorial [makes an absolute universal claim] that [all digital gamers lack academic motivation].",
        "pills": [
          "makes an absolute universal claim",
          "all digital gamers lack academic motivation",
          "sweeping generalization",
          "unsubstantiated stereotype"
        ],
        "connectors": [
          "First,",
          "In the editorial,",
          "To begin the critique,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Exposing the Flawed Assumption",
        "title_vi": "Khung 2: Vạch Trần Giả Định Khiếm Khuyết",
        "image_url": "/images/week134/writing_panel_2.png",
        "image_prompt": "A balance scale tipping unevenly with one single anecdotal feather outweighing massive research books.",
        "caption": "Drawing sweeping conclusions from isolated cases invalidates deductive reasoning.",
        "sentence_frame": "The writer [draws an invalid sweeping deduction] from [isolated individual anecdotes].",
        "pills": [
          "draws an invalid sweeping deduction",
          "isolated individual anecdotes",
          "unreliable premise",
          "logical fallacy"
        ],
        "connectors": [
          "However,",
          "Upon scrutiny,",
          "In reality,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Introducing Epistemic Qualifiers",
        "title_vi": "Khung 3: Đưa Vào Các Từ Chỉ Mức Độ",
        "image_url": "/images/week134/writing_panel_3.png",
        "image_prompt": "A student typing on a laptop screen replacing the word ALL with SOME and TEND TO in bold font.",
        "caption": "Careful qualifiers replace absolute universal words with nuanced precision.",
        "sentence_frame": "Critical thinkers [replace absolute universal words] with [careful qualifiers like some and often].",
        "pills": [
          "replace absolute universal words",
          "careful qualifiers like some and often",
          "nuanced factual precision",
          "avoids generalization"
        ],
        "connectors": [
          "Therefore,",
          "To correct the claim,",
          "Instead of universal words,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: Restoring Intellectual Soundness",
        "title_vi": "Khung 4: Khôi Phục Tính Xác Đáng Trí Tuệ",
        "image_url": "/images/week134/writing_panel_4.png",
        "image_prompt": "A logic seminar discussion board showing verified premises connecting smoothly to sound conclusions.",
        "caption": "Sound reasoning grounded in true premises fosters honest academic discourse.",
        "sentence_frame": "Sound argumentation [ensures that conclusions follow logically] from [factually true empirical premises].",
        "pills": [
          "ensures that conclusions follow logically",
          "factually true empirical premises",
          "valid intellectual soundness",
          "honest academic discourse"
        ],
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "Consequently,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Stating the Flawed Generalization",
        "image_url": "/images/week134/writing_panel_1.png",
        "caption": "Absolute universal claims often signal an invalid generalization fallacy.",
        "frame_L1": "The editorial claims that all video gamers are lazy. This is an invalid generalization fallacy.",
        "connectors": [
          "First,",
          "To begin,",
          "The article states that,"
        ],
        "sentence_hint": "Write 2 sentences stating the media claim and identifying the fallacy.",
        "ordered_chips": [
          "Claiming that all gamers",
          "are unmotivated and lazy",
          "represents a classic",
          "hasty generalization fallacy."
        ],
        "pills": [
          "all gamers are lazy",
          "hasty generalization fallacy",
          "absolute universal claim",
          "unproven assumption"
        ],
        "sentence_frame": "The editorial [makes an absolute universal claim] that [all digital gamers lack academic motivation]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Exposing the False Premise",
        "image_url": "/images/week134/writing_panel_2.png",
        "caption": "Drawing sweeping conclusions from isolated cases invalidates deductive reasoning.",
        "frame_L1": "The assumption is false. Many students play games and still earn excellent grades.",
        "connectors": [
          "However,",
          "In reality,",
          "Upon examination,"
        ],
        "sentence_hint": "Write 2 sentences explaining why the premise is factually untrue.",
        "pills": [
          "assumption is false",
          "earn excellent grades",
          "isolated examples",
          "cannot support generalization"
        ],
        "sentence_frame": "The writer [draws an invalid sweeping deduction] from [isolated individual anecdotes]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Rewriting with Careful Qualifiers",
        "image_url": "/images/week134/writing_panel_3.png",
        "caption": "Careful qualifiers replace absolute universal words with nuanced precision.",
        "frame_L1": "We should use words like 'some' and 'often'. While some kids play too much, many play responsibly.",
        "connectors": [
          "Instead,",
          "Using qualifiers,",
          "To be precise,"
        ],
        "sentence_hint": "Write 2 sentences using 'some', 'many', or 'tend to' to state the truth accurately.",
        "pills": [
          "words like some and often",
          "some kids play too much",
          "many play responsibly",
          "nuanced precision"
        ],
        "sentence_frame": "Critical thinkers [replace absolute universal words] with [careful qualifiers like some and often]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Synthesizing the Critical Thinking Lesson",
        "image_url": "/images/week134/writing_panel_4.png",
        "caption": "Sound reasoning grounded in true premises fosters honest academic discourse.",
        "frame_L1": "Sound logic requires true premises. Spotting fallacies protects us from misleading advertisements and bias.",
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "Consequently,"
        ],
        "sentence_hint": "Write 2 sentences summarizing why identifying fallacies strengthens critical thinking.",
        "pills": [
          "sound logic requires truth",
          "spotting fallacies protects us",
          "misleading bias",
          "critical thinking skills"
        ],
        "sentence_frame": "Sound argumentation [ensures that conclusions follow logically] from [factually true empirical premises]."
      }
    ]
  }
};
export default writingHubData;
