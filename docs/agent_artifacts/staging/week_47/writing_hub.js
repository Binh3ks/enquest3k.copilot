/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 47 | Theme: "Big Numbers (Place Value)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:30.707Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 47,
  "theme": "Big Numbers (Place Value)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Counting Big Numbers at the Village Festival",
    "prompt_en": "Look at the four pictures. Tell a story about Lucas and Sophie counting saplings and stars at the village festival. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Lucas và Sophie đếm cây non và các vì sao tại lễ hội làng (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Lucas and Sophie joined the village tree festival on Saturday morning. First, Sophie grouped fifty pine saplings into neat bundles of ten. Next, Lucas counted eighty oak saplings planted along the river. In the evening, they looked up and counted stars in the clear sky. In the end, Teacher Martin congratulated the children for counting over one hundred trees.",
    "word_bank": [
      "ten",
      "twenty",
      "fifty",
      "eighty",
      "hundred",
      "count",
      "group",
      "total",
      "tree",
      "star"
    ],
    "sentence_frames": [
      "In the beginning, Lucas and Sophie visited the village ___ festival.",
      "Sophie grouped the young saplings into bundles of ___.",
      "Next, Lucas counted eighty oak saplings along the ___.",
      "In the end, everyone celebrated planting over one ___ trees."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Arriving at the Garden",
        "title_vi": "Cảnh 1: Đến Khu Vườn Cộng Đồng",
        "image_url": "/images/week47/writing_panel_1.png",
        "image_prompt": "Two smiling students carrying clipboards arriving at a lively village festival with crates of tree saplings.",
        "caption": "Lucas and Sophie volunteered at the village tree-planting festival.",
        "sentence_frame": "First, Lucas and Sophie [volunteered at the village festival] on a [sunny Saturday morning].",
        "pills": [
          "volunteered at the village festival",
          "sunny Saturday morning",
          "held clipboards",
          "Lucas and Sophie"
        ],
        "connectors": [
          "First,",
          "On Saturday morning,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Grouping by Tens",
        "title_vi": "Cảnh 2: Nhóm Cây Thành Từng Bó Mười",
        "image_url": "/images/week47/writing_panel_2.png",
        "image_prompt": "A girl tying green string around bundles of ten pine saplings on a wooden potting bench.",
        "caption": "Sophie grouped fifty pine saplings into bundles of ten.",
        "sentence_frame": "Next, Sophie grouped [fifty young saplings] into [neat bundles of ten].",
        "pills": [
          "fifty young saplings",
          "neat bundles of ten",
          "tied with string",
          "place value grouping"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Soon after,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Counting Eighty Trees",
        "title_vi": "Cảnh 3: Đếm Tám Mươi Cây Sồi",
        "image_url": "/images/week47/writing_panel_3.png",
        "image_prompt": "A boy walking beside a straight row of newly planted oak saplings along a peaceful riverbank.",
        "caption": "Lucas counted eighty oak saplings planted along the river path.",
        "sentence_frame": "After that, Lucas counted [eighty oak saplings] along the [peaceful river path].",
        "pills": [
          "eighty oak saplings",
          "peaceful river path",
          "tallied numbers",
          "straight green row"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Certificate for One Hundred",
        "title_vi": "Cảnh 4: Nhận Bằng Khen Một Trăm Cây",
        "image_url": "/images/week47/writing_panel_4.png",
        "image_prompt": "A kind teacher handing golden certificates to two proud children in front of a village banner reading 100 Trees.",
        "caption": "Teacher Martin presented certificates for planting over one hundred trees.",
        "sentence_frame": "In the end, Teacher Martin gave [golden certificates to the children] for [planting one hundred trees].",
        "pills": [
          "golden certificates to the children",
          "planting one hundred trees",
          "Teacher Martin smiled",
          "proud community"
        ],
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Scene 1: Tree Festival Arrival",
        "image_url": "/images/week47/writing_panel_1.png",
        "caption": "Lucas and Sophie volunteered at the village tree-planting festival.",
        "frame_L1": "First, Lucas and Sophie joined the village festival. They carried notebooks to help count young trees.",
        "connectors": [
          "First,",
          "In the beginning,",
          "On Saturday morning,"
        ],
        "sentence_hint": "Write 2 sentences about joining the village festival.",
        "ordered_chips": [
          "Lucas and Sophie",
          "joined the village festival",
          "to count saplings",
          "on Saturday morning"
        ],
        "pills": [
          "village festival",
          "count saplings",
          "Lucas and Sophie",
          "carried notebooks"
        ],
        "sentence_frame": "First, Lucas and Sophie [joined the village festival] to [count saplings with clipboards]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Grouping by Tens",
        "image_url": "/images/week47/writing_panel_2.png",
        "caption": "Sophie grouped fifty pine saplings into bundles of ten.",
        "frame_L1": "Next, Sophie sorted the pine saplings. She arranged fifty trees into five neat bundles of ten.",
        "connectors": [
          "Next,",
          "Then,",
          "Soon after,"
        ],
        "sentence_hint": "Write 2 sentences about grouping trees into bundles of ten.",
        "pills": [
          "fifty pine saplings",
          "bundles of ten",
          "neat rows",
          "green string"
        ],
        "sentence_frame": "Next, Sophie arranged [fifty pine saplings] into [five neat bundles of ten]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: Counting Eighty Trees",
        "image_url": "/images/week47/writing_panel_3.png",
        "caption": "Lucas counted eighty oak saplings planted along the river path.",
        "frame_L1": "After that, Lucas walked along the riverbank. He tallied the saplings and reached eighty trees in total.",
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences about counting eighty trees.",
        "pills": [
          "eighty oak saplings",
          "river path",
          "tallied numbers",
          "Lucas walked"
        ],
        "sentence_frame": "After that, Lucas counted [eighty oak saplings] planted along the [river path]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Certificate for One Hundred",
        "image_url": "/images/week47/writing_panel_4.png",
        "caption": "Teacher Martin presented certificates for planting over one hundred trees.",
        "frame_L1": "In the end, the festival ended with big applause. Teacher Martin gave awards for planting over one hundred trees.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about receiving certificates.",
        "pills": [
          "Teacher Martin",
          "one hundred trees",
          "golden certificates",
          "big applause"
        ],
        "sentence_frame": "In the end, Teacher Martin presented [golden certificates] for [planting one hundred trees]."
      }
    ]
  }
};
export default writingHubData;
