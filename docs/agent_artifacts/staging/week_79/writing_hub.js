/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 79 | Theme: "The Industrial Revolution" | CEFR: B1 PET
 * Generated: 2026-11-10T04:07:36.004Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 79,
  "theme": "The Industrial Revolution",
  "cefr_level": "B1 PET",
  "picture_story": {
    "title": "Documentary Report on the Rise of Steam Power",
    "prompt_en": "Look at the four panels. Write a historical documentary paragraph describing how steam engines and factories transformed manufacturing and transportation. Use cause-and-effect connectors ('as a result of', 'due to', 'consequently') and past passive voice ('goods were manufactured'). Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn tài liệu lịch sử mô tả động cơ hơi nước và nhà máy đã thay đổi sản xuất và giao thông như thế nào. Sử dụng các từ nối nguyên nhân - kết quả ('as a result of', 'due to', 'consequently') và câu bị động quá khứ ('goods were manufactured'). Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "During the Industrial Revolution, everyday goods were manufactured by steam-powered machines rather than by hand. Due to James Watt's innovative steam engine, coal was burned to power massive textile looms and iron foundries. As a result of this mechanization, locomotives hauled freight across nationwide railways, transforming agrarian towns into thriving industrial centers.",
    "word_bank": [
      "steam",
      "engine",
      "factory",
      "coal",
      "manufacture",
      "locomotive",
      "railway",
      "production",
      "textile",
      "transform"
    ],
    "sentence_frames": [
      "In the eighteenth century, goods were manufactured in large ___.",
      "Due to Watt's steam ___, coal was burned to power factory machinery.",
      "As a result of mechanization, cotton ___ production increased rapidly.",
      "Consequently, steam ___ hauled heavy freight along national railways."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: The Steam Engine Breakthrough",
        "title_vi": "Khung 1: Đột Phá Động Cơ Hơi Nước",
        "image_url": "/images/week79/writing_panel_1.png",
        "image_prompt": "A nineteenth-century British foundry with engineers assembling a massive cast-iron steam engine with copper pipes and boiler.",
        "caption": "James Watt perfected the commercial steam engine using coal fuel.",
        "sentence_frame": "The steam engine [was perfected by James Watt] to [generate reliable mechanical power].",
        "pills": [
          "was perfected by James Watt",
          "generate reliable mechanical power",
          "coal-fired boiler",
          "industrial machinery"
        ],
        "connectors": [
          "First,",
          "In the beginning,",
          "During this period,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Mechanized Textile Mills",
        "title_vi": "Khung 2: Các Xưởng Dệt Cơ Giới Hóa",
        "image_url": "/images/week79/writing_panel_2.png",
        "image_prompt": "A sprawling brick textile mill interior with rows of mechanical looms powered by overhead spinning driveshafts.",
        "caption": "Textile factories produced woven cloth at unprecedented speed.",
        "sentence_frame": "Cotton textiles [were manufactured by automated looms] in [sprawling urban factories].",
        "pills": [
          "were manufactured by automated looms",
          "sprawling urban factories",
          "unprecedented commercial output",
          "disciplined workforce"
        ],
        "connectors": [
          "Due to this invention,",
          "Furthermore,",
          "In textile mills,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Iron Railways and Locomotives",
        "title_vi": "Khung 3: Đường Sắt và Đầu Máy Bằng Sắt",
        "image_url": "/images/week79/writing_panel_3.png",
        "image_prompt": "An early steam locomotive puffing white smoke as it pulls black coal wagons across an arched iron railway bridge.",
        "caption": "Locomotives carried coal and merchandise across steel railways.",
        "sentence_frame": "Steam locomotives [were engineered to transport heavy freight] along [rapidly expanding railways].",
        "pills": [
          "were engineered to transport heavy freight",
          "rapidly expanding railways",
          "connected distant cities",
          "carried raw materials"
        ],
        "connectors": [
          "As a result of rail transit,",
          "Consequently,",
          "Across the nation,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: The Urban Industrial Society",
        "title_vi": "Khung 4: Xã Hội Đô Thị Công Nghiệp",
        "image_url": "/images/week79/writing_panel_4.png",
        "image_prompt": "A bustling Victorian industrial city with brick chimneys, bustling docks, merchant warehouses, and railway viaducts.",
        "caption": "Industrialization transformed rural landscapes into modern cities.",
        "sentence_frame": "Agrarian economies [were completely transformed into] an [interconnected industrial society].",
        "pills": [
          "were completely transformed into",
          "interconnected industrial society",
          "modern economic foundation",
          "urban manufacturing centers"
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
        "title": "Stage 1: Describing the Steam Engine",
        "image_url": "/images/week79/writing_panel_1.png",
        "caption": "James Watt perfected the commercial steam engine using coal fuel.",
        "frame_L1": "James Watt improved the steam engine. The machine burned coal to generate power.",
        "connectors": [
          "First,",
          "In the eighteenth century,",
          "Initially,"
        ],
        "sentence_hint": "Write 2 sentences describing how steam engines generated industrial power.",
        "ordered_chips": [
          "James Watt improved",
          "the commercial steam engine",
          "using coal fuel",
          "to drive factory machinery."
        ],
        "pills": [
          "improved the steam engine",
          "coal fuel",
          "factory machinery",
          "commercial power"
        ],
        "sentence_frame": "The steam engine [was perfected by James Watt] to [generate reliable mechanical power]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Explaining Factory Production",
        "image_url": "/images/week79/writing_panel_2.png",
        "caption": "Textile factories produced woven cloth at unprecedented speed.",
        "frame_L1": "Textile factories used steam power. Many workers operated mechanical looms every day.",
        "connectors": [
          "Due to this engine,",
          "In factories,",
          "Furthermore,"
        ],
        "sentence_hint": "Write 2 sentences explaining how factories increased textile production.",
        "pills": [
          "used steam power",
          "mechanical looms",
          "increased textile output",
          "urban factories"
        ],
        "sentence_frame": "Textile goods [were produced much faster] due to [automated mechanical equipment]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Highlighting Railway Transportation",
        "image_url": "/images/week79/writing_panel_3.png",
        "caption": "Locomotives carried coal and merchandise across steel railways.",
        "frame_L1": "Locomotives hauled coal across long distances. As a result, trade grew quickly.",
        "connectors": [
          "As a result,",
          "Consequently,",
          "Along railway tracks,"
        ],
        "sentence_hint": "Write 2 sentences describing how railways connected mines, factories, and ports.",
        "pills": [
          "hauled coal across railways",
          "trade expanded rapidly",
          "steam locomotives",
          "connected industrial ports"
        ],
        "sentence_frame": "Steam locomotives [were built from tough iron] to [haul freight along steel rails]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Summarizing the Historical Impact",
        "image_url": "/images/week79/writing_panel_4.png",
        "caption": "Industrialization transformed rural landscapes into modern cities.",
        "frame_L1": "The Industrial Revolution transformed society. It created our modern cities and technologies.",
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "Consequently,"
        ],
        "sentence_hint": "Write 2 sentences summarizing the permanent legacy of industrial mechanization.",
        "pills": [
          "transformed human society",
          "modern cities and technologies",
          "permanent industrial legacy",
          "economic progress"
        ],
        "sentence_frame": "Industrial mechanization [transformed rural economies into] an [interconnected modern society]."
      }
    ]
  }
};
export default writingHubData;
