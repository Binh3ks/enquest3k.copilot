/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 45 | Theme: "Shape Detectives (Geometry)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.168Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 45,
  "theme": "Shape Detectives (Geometry)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Ben and Zoe: Shape Detectives in the Classroom",
    "prompt_en": "Look at the four pictures. Tell a story about Ben and Zoe finding shapes in their classroom. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Kể câu chuyện về Ben và Zoe tìm kiếm hình khối trong lớp học (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 80,
    "model_sentence": "Ben and Zoe played shape detectives during math class on Friday morning. First, they looked at the wall clock and observed that it is round. Next, Zoe measured the rectangular whiteboard with a wooden ruler. In the end, they found squares, circles, and triangles all over the room.",
    "word_bank": [
      "square",
      "circle",
      "triangle",
      "rectangle",
      "sides",
      "corners",
      "round",
      "straight",
      "ruler",
      "detective"
    ],
    "sentence_frames": [
      "In the beginning, Ben and Zoe put on their ___ hats.",
      "First, they saw that the wall clock is a round ___.",
      "Next, Zoe measured the whiteboard with four straight ___.",
      "In the end, they discovered geometric shapes in every ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Scene 1: Starting the Detective Game",
        "title_vi": "Cảnh 1: Bắt Đầu Trò Chơi Thám Tử",
        "image_url": "/images/week45/writing_panel_1.png",
        "image_prompt": "Two young students wearing detective hats looking at a clipboard with shape drawings in a classroom.",
        "caption": "Ben and Zoe started their shape detective hunt in the classroom.",
        "sentence_frame": "First, Ben and Zoe [started their shape hunt] on [Friday morning].",
        "pills": [
          "started their shape hunt",
          "Friday morning",
          "detective hats",
          "looked around"
        ],
        "connectors": [
          "First,",
          "On Friday morning,",
          "In the beginning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Scene 2: Examining the Round Clock",
        "title_vi": "Cảnh 2: Quan Sát Chiếc Đồng Hồ Tròn",
        "image_url": "/images/week45/writing_panel_2.png",
        "image_prompt": "A boy pointing at a circular wall clock and noting that it has no straight corners.",
        "caption": "They noticed that the wall clock was round like a circle.",
        "sentence_frame": "Next, they saw that the [wall clock was round] like a [large white circle].",
        "pills": [
          "wall clock was round",
          "large white circle",
          "curved edge",
          "no sharp corners"
        ],
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Scene 3: Measuring the Whiteboard",
        "title_vi": "Cảnh 3: Đo Đạc Chiếc Bảng Trắng",
        "image_url": "/images/week45/writing_panel_3.png",
        "image_prompt": "A girl using a straight wooden ruler to measure the long side of the classroom whiteboard.",
        "caption": "Zoe measured the rectangular whiteboard with her long ruler.",
        "sentence_frame": "After that, Zoe [measured the whiteboard] with her [straight wooden ruler].",
        "pills": [
          "measured the whiteboard",
          "straight wooden ruler",
          "four straight sides",
          "two long edges"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Scene 4: Completing the Shape Poster",
        "title_vi": "Cảnh 4: Hoàn Thành Tấm Áp Phích Hình Khối",
        "image_url": "/images/week45/writing_panel_4.png",
        "image_prompt": "Two smiling students presenting a colorful shape poster to their teacher Detective Ray.",
        "caption": "They completed their poster showing shapes all over the room.",
        "sentence_frame": "In the end, they completed a [colorful shape poster] showing [every classroom object].",
        "pills": [
          "colorful shape poster",
          "every classroom object",
          "Detective Ray",
          "smiled proudly"
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
        "title": "Scene 1: Starting the Detective Game",
        "image_url": "/images/week45/writing_panel_1.png",
        "caption": "Ben and Zoe started their shape detective hunt in the classroom.",
        "frame_L1": "First, Ben and Zoe began their game. They wore detective hats to find geometric shapes.",
        "connectors": [
          "First,",
          "On Friday morning,",
          "In the beginning,"
        ],
        "sentence_hint": "Write 2 sentences about starting the shape search.",
        "ordered_chips": [
          "Ben and Zoe",
          "wore detective hats",
          "to search for",
          "shapes in the room"
        ],
        "pills": [
          "Ben and Zoe",
          "wore detective hats",
          "shape search",
          "Friday morning"
        ],
        "sentence_frame": "First, Ben and Zoe [began their shape search] in the [classroom]."
      },
      {
        "badge_label": "BUILD",
        "title": "Scene 2: Examining the Round Clock",
        "image_url": "/images/week45/writing_panel_2.png",
        "caption": "They noticed that the wall clock was round like a circle.",
        "frame_L1": "Next, they observed the clock. It was completely round with no sharp corners.",
        "connectors": [
          "Next,",
          "Then,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about the round clock.",
        "pills": [
          "observed the clock",
          "completely round",
          "no sharp corners",
          "Ben"
        ],
        "sentence_frame": "Next, they saw that the [clock was round] with [no sharp corners]."
      },
      {
        "badge_label": "WRITE",
        "title": "Scene 3: Measuring the Whiteboard",
        "image_url": "/images/week45/writing_panel_3.png",
        "caption": "Zoe measured the rectangular whiteboard with her long ruler.",
        "frame_L1": "After that, Zoe took a ruler. She checked the four straight sides of the whiteboard.",
        "connectors": [
          "After that,",
          "Later,",
          "Also,"
        ],
        "sentence_hint": "Write 2 sentences about measuring the whiteboard.",
        "pills": [
          "took a ruler",
          "four straight sides",
          "whiteboard",
          "Zoe"
        ],
        "sentence_frame": "After that, Zoe [measured the whiteboard] with [four straight sides]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Scene 4: Completing the Shape Poster",
        "image_url": "/images/week45/writing_panel_4.png",
        "caption": "They completed their poster showing shapes all over the room.",
        "frame_L1": "In the end, they finished their project. They proudly showed their shape poster to Detective Ray.",
        "connectors": [
          "In the end,",
          "Finally,",
          "At last,"
        ],
        "sentence_hint": "Write 2 sentences about finishing the poster.",
        "pills": [
          "finished their project",
          "shape poster",
          "Detective Ray",
          "cheered happily"
        ],
        "sentence_frame": "In the end, they completed their [shape poster] for [Detective Ray]."
      }
    ]
  }
};
export default writingHubData;
