/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 131 | Theme: "Genetics & Biotechnology: Modern Agriculture" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.316Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 131,
  "theme": "Genetics & Biotechnology: Modern Agriculture",
  "cefr_level": "B2 First",
  "picture_story": {
    "title": "Developing Climate-Resilient Agricultural Strains",
    "prompt_en": "Look at the four pictures. Write a formal investigative report about Dr. Aris Thorne and Naomi Ward developing drought-resistant crops through biotechnology. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Tiến sĩ Aris Thorne và Naomi Ward phát triển giống cây trồng chịu hạn qua công nghệ sinh học (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Dr. Aris Thorne and Naomi Ward developed climate-resilient rice crops to protect regional food security. First, genetic sequencing identified drought-tolerant traits in wild grasses. Next, greenhouse trials proved that edited seedlings developed deep root architecture in saline soil. After field tests demonstrated thirty percent higher grain yields, open-source seeds were distributed to cooperative farmers.",
    "word_bank": [
      "genetics",
      "biotechnology",
      "agriculture",
      "cultivate",
      "yield",
      "drought",
      "salinity",
      "trait",
      "resistant",
      "harvest"
    ],
    "sentence_frames": [
      "Initially, researchers sequenced wild grass genomes to isolate beneficial climate ___.",
      "Greenhouse trials confirmed that the edited cultivars tolerated elevated soil ___ levels.",
      "Field harvests, which spanned three dry seasons, produced significantly higher grain ___.",
      "Ultimately, open-source seed varieties were shared to bolster regional ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Gene Marker Sequencing",
        "title_vi": "Giải Trình Tự Dấu Chuẩn Gen",
        "image_url": "/images/week131/writing_panel_1.png",
        "image_prompt": "Two scientists analyzing colorful fluorescent DNA gel electrophoresis bands on a high-tech laboratory screen.",
        "caption": "Geneticists analyzed DNA markers to identify drought-tolerant plant traits.",
        "sentence_frame": "First, geneticists [analyzed DNA sequencing markers] to identify [drought-tolerant plant traits].",
        "pills": [
          "analyzed DNA sequencing markers",
          "drought-tolerant plant traits",
          "Aris and Naomi",
          "laboratory genomics"
        ],
        "connectors": [
          "First,",
          "Initially,",
          "On Monday morning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Saline Greenhouse Trials",
        "title_vi": "Thử Nghiệm Đất Mặn Trong Nhà Kính",
        "image_url": "/images/week131/writing_panel_2.png",
        "image_prompt": "A researcher in a glass greenhouse examining green rice seedlings thriving in transparent hydroponic nutrient tubs.",
        "caption": "Greenhouse trials confirmed deep root development in saline water.",
        "sentence_frame": "Next, greenhouse trials confirmed that [edited rice seedlings developed deep roots] despite [saline water conditions].",
        "pills": [
          "edited rice seedlings developed deep roots",
          "saline water conditions",
          "Naomi measured",
          "hydroponic growth"
        ],
        "connectors": [
          "Next,",
          "Subsequently,",
          "Shortly afterwards,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Field Trial Golden Harvest",
        "title_vi": "Mùa Vàng Thu Hoạch Thử Nghiệm",
        "image_url": "/images/week131/writing_panel_3.png",
        "image_prompt": "Farmers and researchers smiling in a golden sunlit grain field holding heavy sheaves of ripe rice.",
        "caption": "The drought-resistant crop yielded thirty percent more grain than controls.",
        "sentence_frame": "After that, the coastal field harvest [yielded thirty percent more grain] than [conventional control crops].",
        "pills": [
          "yielded thirty percent more grain",
          "conventional control crops",
          "golden rice sheaves",
          "abundant harvest"
        ],
        "connectors": [
          "After that,",
          "Later,",
          "At the end of the season,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Open-Source Seed Distribution",
        "title_vi": "Phân Phối Hạt Giống Nguồn Mở",
        "image_url": "/images/week131/writing_panel_4.png",
        "image_prompt": "A scientist handing cloth bags of certified seeds to smiling local farmers at an agricultural community hall.",
        "caption": "Scientists distributed open-source seeds to cooperative farming leaders.",
        "sentence_frame": "In the end, researchers distributed [certified open-source seeds] to [local farming cooperatives].",
        "pills": [
          "certified open-source seeds",
          "local farming cooperatives",
          "food security assured",
          "proud scientists"
        ],
        "connectors": [
          "In the end,",
          "Finally,",
          "Consequently,"
        ]
      }
    ],
    "ladder_stages": [
      {
        "badge_label": "MODEL",
        "title": "Genomic Trait Identification",
        "image_url": "/images/week131/writing_panel_1.png",
        "caption": "Geneticists analyzed DNA markers to identify drought-tolerant plant traits.",
        "frame_L1": "First, the researchers sequenced wild grass DNA. They found genes that helped roots absorb water in dry soil.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences describing DNA sequencing of wild plants.",
        "ordered_chips": [
          "Researchers sequenced",
          "wild grass DNA",
          "to identify",
          "drought-tolerant traits"
        ],
        "pills": [
          "sequenced DNA",
          "drought traits",
          "Aris and Naomi",
          "wild grass"
        ],
        "sentence_frame": "First, researchers sequenced [wild grass DNA] to discover [drought-tolerant traits]."
      },
      {
        "badge_label": "BUILD",
        "title": "Saline Stress Testing",
        "image_url": "/images/week131/writing_panel_2.png",
        "caption": "Greenhouse trials confirmed deep root development in saline water.",
        "frame_L1": "Next, Naomi tested edited seedlings in saline tanks. The plants grew long roots and survived high salt levels.",
        "connectors": [
          "Next,",
          "Subsequently,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences about testing seedlings in saline conditions.",
        "pills": [
          "saline tanks",
          "long roots",
          "Naomi tested",
          "survived salt"
        ],
        "sentence_frame": "Next, Naomi tested [edited seedlings] in tanks that [contained high salinity]."
      },
      {
        "badge_label": "WRITE",
        "title": "Bountiful Field Harvest",
        "image_url": "/images/week131/writing_panel_3.png",
        "caption": "The drought-resistant crop yielded thirty percent more grain than controls.",
        "frame_L1": "After that, coastal farmers harvested the trial field. The new strain yielded thirty percent more grain during drought.",
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences describing the abundant grain harvest.",
        "pills": [
          "trial field",
          "thirty percent more",
          "new strain",
          "golden grain"
        ],
        "sentence_frame": "After that, coastal farmers harvested [the trial field] which produced [thirty percent more grain]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Community Seed Handover",
        "image_url": "/images/week131/writing_panel_4.png",
        "caption": "Scientists distributed open-source seeds to cooperative farming leaders.",
        "frame_L1": "In the end, Dr. Thorne gave bags of seeds to farmer groups. This partnership protected food security across the valley.",
        "connectors": [
          "In the end,",
          "Finally,",
          "As a result,"
        ],
        "sentence_hint": "Write 2 sentences about sharing open-source seeds with farmers.",
        "pills": [
          "gave seeds",
          "farmer groups",
          "food security",
          "across the valley"
        ],
        "sentence_frame": "In the end, Dr. Thorne shared [bags of seeds] with farmers to [protect regional food security]."
      }
    ]
  }
};
export default writingHubData;
