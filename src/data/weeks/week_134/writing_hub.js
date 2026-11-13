/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 134 | Theme: "Identifying Fallacies" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.875Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 134,
  "theme": "Identifying Fallacies",
  "cefr_level": "B1+ Academic",
  "picture_story": {
    "title": "Identifying and Correcting Generalization Fallacies in Arguments",
    "prompt_en": "Look at the four panels. Write a critical analysis paragraph identifying a hasty generalization fallacy in a media statement and correcting it using careful qualifiers ('some', 'many', 'often', 'tend to'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn phân tích phê phán nhận diện lỗi ngụy biện khái quát hóa vội vã trong một phát ngôn truyền thông và sửa lại bằng các từ chỉ mức độ cẩn trọng ('some', 'many', 'often', 'tend to'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Claiming that all video gamers are lazy is an invalid hasty generalization fallacy. This weak assumption ignores real research showing that many gamers build problem-solving and teamwork skills. To keep arguments sound, careful speakers use words like some and often so their points stay fair.",
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
      "Claiming that all gamers are lazy is a classic hasty ___ fallacy.",
      "This invalid point rests on a completely false ___.",
      "In contrast, real studies show that ___ players build strong teamwork skills.",
      "Finally, using words like 'often' and 'tend to' keeps our logic ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Spotting Extreme All-or-Never Claims",
        "title_vi": "Khung 1: Nhận Diện Khẳng Định Tuyệt Đối",
        "image_url": "/images/week134/writing_panel_1.png",
        "image_prompt": "A student circling words like ALL and NEVER in red marker on a printed newspaper editorial.",
        "caption": "Words like all and never often show an unfair generalization.",
        "sentence_frame": "The writer [makes an extreme all-group claim] that [all video gamers feel lazy].",
        "pills": [
          "makes an extreme all-group claim",
          "all video gamers feel lazy",
          "broad generalization",
          "unfair stereotype"
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
        "sentence_frame": "The writer [makes an invalid quick guess] from [one or two stories].",
        "pills": [
          "makes an invalid quick guess",
          "one or two stories",
          "weak premise",
          "logic fallacy"
        ],
        "connectors": [
          "However,",
          "Look closely,",
          "In fact,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Using Careful Qualifying Words",
        "title_vi": "Khung 3: Dùng Từ Giới Hạn Cẩn Thận",
        "image_url": "/images/week134/writing_panel_3.png",
        "image_prompt": "A student typing on a laptop screen replacing the word ALL with SOME and TEND TO in bold font.",
        "caption": "Careful words like some and often replace extreme words like always.",
        "sentence_frame": "Careful speakers [replace extreme all-or-never words] with [careful words like some and often].",
        "pills": [
          "replace extreme all-or-never words",
          "careful words like some and often",
          "fair and accurate facts",
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
        "title_en": "Panel 4: Building Fair, Sound Logic",
        "title_vi": "Khung 4: Xây Dựng Lập Luận Vững Chắc",
        "image_url": "/images/week134/writing_panel_4.png",
        "image_prompt": "A logic seminar discussion board showing verified premises connecting smoothly to sound conclusions.",
        "caption": "True starting facts and fair logic build honest school debates.",
        "sentence_frame": "Fair argumentation [makes sure conclusions follow] from [true checked facts].",
        "pills": [
          "makes sure conclusions follow",
          "true checked facts",
          "clear logic soundness",
          "honest school debate"
        ],
        "connectors": [
          "Finally,",
          "In conclusion,",
          "Because of this,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Spotting the Unfair Claim",
        "image_url": "/images/week134/writing_panel_1.png",
        "caption": "Words like all and never often show an unfair generalization.",
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
          "makes an extreme all-group claim",
          "all video gamers feel lazy",
          "broad generalization",
          "unfair stereotype"
        ],
        "sentence_frame": "The writer [makes an extreme all-group claim] that [all video gamers feel lazy]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Exposing the False Premise",
        "image_url": "/images/week134/writing_panel_2.png",
        "caption": "Drawing sweeping conclusions from isolated cases invalidates deductive reasoning.",
        "frame_L1": "The assumption is false. Many students play games and still earn excellent grades.",
        "connectors": [
          "However,",
          "Look closely,",
          "In fact,"
        ],
        "sentence_hint": "Write 2 sentences explaining why the premise is factually untrue.",
        "pills": [
          "makes an invalid quick guess",
          "one or two stories",
          "weak premise",
          "logic fallacy"
        ],
        "sentence_frame": "The writer [makes an invalid quick guess] from [one or two stories]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Rewriting with Careful Qualifiers",
        "image_url": "/images/week134/writing_panel_3.png",
        "caption": "Careful words like some and often replace extreme words like always.",
        "frame_L1": "We should use words like 'some' and 'often'. While some kids play too much, many play responsibly.",
        "connectors": [
          "Instead,",
          "Using qualifiers,",
          "To be precise,"
        ],
        "sentence_hint": "Write 2 sentences using 'some', 'many', or 'tend to' to state the truth accurately.",
        "pills": [
          "replace extreme all-or-never words",
          "careful words like some and often",
          "fair and accurate facts",
          "avoids generalization"
        ],
        "sentence_frame": "Careful speakers [replace extreme all-or-never words] with [careful words like some and often]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Building Fair, Sound Logic",
        "image_url": "/images/week134/writing_panel_4.png",
        "caption": "True starting facts and fair logic build honest school debates.",
        "frame_L1": "Sound logic requires true premises. Spotting fallacies protects us from misleading advertisements and bias.",
        "connectors": [
          "Finally,",
          "In conclusion,",
          "Because of this,"
        ],
        "sentence_hint": "Write 2 sentences summarizing why identifying fallacies strengthens critical thinking.",
        "pills": [
          "makes sure conclusions follow",
          "true checked facts",
          "clear logic soundness",
          "honest school debate"
        ],
        "sentence_frame": "Fair argumentation [makes sure conclusions follow] from [true checked facts]."
      }
    ]
  }
};

export default writingHubData;
