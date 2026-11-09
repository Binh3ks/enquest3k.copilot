/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 75 | Theme: "History/ELA: Ancient Egypt / Math: Timelines" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.699Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 75,
  "theme": "History/ELA: Ancient Egypt / Math: Timelines",
  "cefr_level": "B1 Preliminary",
  "picture_story": {
    "title": "Describing Daily Life and Monuments in Ancient Egypt",
    "prompt_en": "Look at the four panels. Write a descriptive paragraph about Ancient Egypt using 'used to' and 'would' to explain daily habits, farming, and monument construction. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 khung tranh. Viết một đoạn văn miêu tả Ai Cập Cổ đại sử dụng 'used to' và 'would' để giải thích thói quen hàng ngày, làm nông và xây dựng công trình. Viết từ 20 từ trở lên.",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "In ancient times, Egyptians used to live along the fertile banks of the Nile River. Farmers used to depend on summer floods to grow barley and wheat. During the dry season, builders would drag heavy limestone blocks to construct royal pyramids. Scribes would record temple rituals on papyrus scrolls, preserving the memory of their civilization.",
    "word_bank": [
      "pyramid",
      "pharaoh",
      "ancient",
      "civilization",
      "papyrus",
      "hieroglyph",
      "monument",
      "fertile",
      "tomb",
      "carve"
    ],
    "sentence_frames": [
      "In ancient times, Egyptians used to build massive ___ in the desert.",
      "Farmers used to grow grain in the ___ silt along the Nile.",
      "Artisans would carve sacred ___ into limestone temple walls.",
      "Scribes would write official records on sheets of woven ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Panel 1: Farming by the Nile",
        "title_vi": "Khung 1: Làm Nông Bên Bờ Sông Nile",
        "image_url": "/images/week75/writing_panel_1.png",
        "image_prompt": "Ancient Egyptian farmers harvesting tall golden grain beside a flowing river with palm trees.",
        "caption": "Farmers used to cultivate fertile soil after annual Nile floods.",
        "sentence_frame": "In ancient times, farmers [used to cultivate fertile soil] beside [the flooding Nile River].",
        "pills": [
          "used to cultivate fertile soil",
          "the flooding Nile River",
          "annual summer floods",
          "golden wheat fields"
        ],
        "connectors": [
          "In ancient times,",
          "Long ago,",
          "Originally,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Panel 2: Quarrying Pyramid Stones",
        "title_vi": "Khung 2: Khai Thác Đá Xây Kim Tự Tháp",
        "image_url": "/images/week75/writing_panel_2.png",
        "image_prompt": "Builders moving a giant rectangular limestone block on wooden logs across desert sand.",
        "caption": "Workers would drag massive stone blocks across wooden sledges.",
        "sentence_frame": "During construction, builders [would drag massive stone blocks] across [wooden desert sledges].",
        "pills": [
          "would drag massive stone blocks",
          "wooden desert sledges",
          "quarried limestone",
          "pyramid builders"
        ],
        "connectors": [
          "Furthermore,",
          "During construction,",
          "Also,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Panel 3: Scribes and Papyrus",
        "title_vi": "Khung 3: Kinh Sư và Giấy Cói",
        "image_url": "/images/week75/writing_panel_3.png",
        "image_prompt": "An ancient Egyptian scribe sitting cross-legged writing black hieroglyphs on an open papyrus scroll.",
        "caption": "Scribes would write sacred hieroglyphs on long papyrus scrolls.",
        "sentence_frame": "Temple scribes [would write sacred hieroglyphs] on [durable papyrus scrolls].",
        "pills": [
          "would write sacred hieroglyphs",
          "durable papyrus scrolls",
          "ink and reed pens",
          "official records"
        ],
        "connectors": [
          "In daily life,",
          "Regularly,",
          "Meanwhile,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Panel 4: The Pharaoh's Monument",
        "title_vi": "Khung 4: Công Trình Của Pharaoh",
        "image_url": "/images/week75/writing_panel_4.png",
        "image_prompt": "The majestic golden pyramids and the Great Sphinx standing proud against a sunset desert sky.",
        "caption": "Pharaohs used to construct magnificent monuments for eternity.",
        "sentence_frame": "Pharaohs [used to construct magnificent monuments] to [secure their legacy for eternity].",
        "pills": [
          "used to construct magnificent monuments",
          "secure their legacy for eternity",
          "Great Sphinx",
          "architectural wonders"
        ],
        "connectors": [
          "Eventually,",
          "In conclusion,",
          "Ultimately,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Stage 1: Life Along the Nile",
        "image_url": "/images/week75/writing_panel_1.png",
        "caption": "Farmers used to cultivate fertile soil after annual Nile floods.",
        "frame_L1": "In ancient times, Egyptians used to live along the Nile. Farmers used to harvest crops on fertile soil.",
        "connectors": [
          "In ancient times,",
          "Long ago,",
          "Initially,"
        ],
        "sentence_hint": "Write 2 sentences about ancient farmers relying on the Nile.",
        "ordered_chips": [
          "In ancient times, farmers",
          "used to cultivate crops",
          "in fertile black soil",
          "along the Nile."
        ],
        "pills": [
          "used to cultivate crops",
          "fertile black soil",
          "Nile floods",
          "ancient farmers"
        ],
        "sentence_frame": "In ancient times, Egyptians [used to rely on the Nile] to [produce fertile farm soil]."
      },
      {
        "badge_label": "BUILD",
        "title": "Stage 2: Pyramid Construction",
        "image_url": "/images/week75/writing_panel_2.png",
        "caption": "Workers would drag massive stone blocks across wooden sledges.",
        "frame_L1": "Stonemasons used to quarry heavy limestone. Workers would drag blocks across wooden sledges.",
        "connectors": [
          "During construction,",
          "Furthermore,",
          "Often,"
        ],
        "sentence_hint": "Write 2 sentences about how workers moved stones.",
        "pills": [
          "quarry heavy limestone",
          "would drag blocks",
          "wooden sledges",
          "pyramid builders"
        ],
        "sentence_frame": "Workers [would drag heavy stone blocks] across [desert sand with sledges]."
      },
      {
        "badge_label": "WRITE",
        "title": "Stage 3: Scribes and Hieroglyphs",
        "image_url": "/images/week75/writing_panel_3.png",
        "caption": "Scribes would write sacred hieroglyphs on long papyrus scrolls.",
        "frame_L1": "Scribes used to record historical events. They would paint hieroglyphs onto papyrus scrolls.",
        "connectors": [
          "In addition,",
          "Regularly,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences about scribes writing on papyrus.",
        "pills": [
          "record historical events",
          "would paint hieroglyphs",
          "papyrus scrolls",
          "sacred symbols"
        ],
        "sentence_frame": "Scribes [would write official records] using [intricate hieroglyph symbols]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Stage 4: Eternal Monuments",
        "image_url": "/images/week75/writing_panel_4.png",
        "caption": "Pharaohs used to construct magnificent monuments for eternity.",
        "frame_L1": "Pharaohs used to build towering stone tombs. Their magnificent monuments inspire millions today.",
        "connectors": [
          "Ultimately,",
          "In conclusion,",
          "To summarize,"
        ],
        "sentence_hint": "Write 2 sentences summarizing Egyptian architectural monuments.",
        "pills": [
          "towering stone tombs",
          "magnificent monuments",
          "inspire millions",
          "ancient civilization"
        ],
        "sentence_frame": "Pharaohs [used to erect stone pyramids] to [safeguard their memory forever]."
      }
    ]
  }
};
export default writingHubData;
