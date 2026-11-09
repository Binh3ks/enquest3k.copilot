/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 129 | Theme: "Architecture of the Future: Megacities & Sustainability" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.313Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 129,
  "theme": "Architecture of the Future: Megacities & Sustainability",
  "cefr_level": "B2 First",
  "picture_story": {
    "title": "Designing Sustainable Vertical Megacities",
    "prompt_en": "Look at the four pictures. Write a formal investigative report about Julian Reyes and Maya Chen designing self-cooling vertical architecture for future megacities. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Julian Reyes và Maya Chen thiết kế kiến trúc thẳng đứng tự làm mát cho đại đô thị tương lai (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Julian Reyes and Maya Chen presented architectural plans for an eco-friendly vertical skyscraper. First, 3D holographic models demonstrated natural ventilation channels. Next, stress tests confirmed that lightweight composite timber beams supported heavy vertical gardens. After pedestrian skybridges eliminated car dependency, the city council ratified the sustainable district development plan.",
    "word_bank": [
      "megacity",
      "architecture",
      "skyscraper",
      "sustainability",
      "infrastructure",
      "pedestrian",
      "ventilation",
      "modular",
      "efficiency",
      "resilient"
    ],
    "sentence_frames": [
      "Initially, architects evaluated holographic models of an eco-friendly ___ tower.",
      "Engineers verified that passive ___ channels drew cool ground air into the central atrium.",
      "Interconnected skybridges established a continuous network for ___ commuters.",
      "Ultimately, city authorities approved the resilient ___ plan."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Holographic Blueprint Examination",
        "title_vi": "Kiểm Tra Bản Vẽ Ba Chiều",
        "image_url": "/images/week129/writing_panel_1.png",
        "image_prompt": "Two architects standing over a glowing blue holographic projection of a curved vertical forest tower.",
        "caption": "Architects examined holographic models of a self-cooling skyscraper.",
        "sentence_frame": "First, the architects [examined holographic models] of an [innovative self-cooling skyscraper].",
        "pills": [
          "examined holographic models",
          "innovative self-cooling skyscraper",
          "Julian and Maya",
          "3D architectural blueprint"
        ],
        "connectors": [
          "First,",
          "Initially,",
          "On Monday morning,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Aerodynamic Ventilation Testing",
        "title_vi": "Thử Nghiệm Thông Gió Khí Động Học",
        "image_url": "/images/week129/writing_panel_2.png",
        "image_prompt": "A digital wind tunnel monitor displaying blue and green airflow vectors flowing through an open building atrium.",
        "caption": "Simulations proved passive ventilation cooled office floors naturally.",
        "sentence_frame": "Next, airflow simulations confirmed that [passive ventilation channels] cooled [internal office atriums naturally].",
        "pills": [
          "passive ventilation channels",
          "internal office atriums naturally",
          "airflow vectors",
          "energy efficiency"
        ],
        "connectors": [
          "Next,",
          "Subsequently,",
          "Following fluid simulations,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Pedestrian Skybridge Connection",
        "title_vi": "Kết Nối Cầu Đi Bộ Trên Không",
        "image_url": "/images/week129/writing_panel_3.png",
        "image_prompt": "Glass and timber skybridges connecting three leafy skyscrapers high above street level with pedestrians walking.",
        "caption": "Elevated pedestrian skybridges linked towers without road traffic.",
        "sentence_frame": "After that, elevated skybridges [connected multiple residential towers] for [pedestrian transit].",
        "pills": [
          "connected multiple residential towers",
          "pedestrian transit",
          "glass walkways",
          "eliminated road crossings"
        ],
        "connectors": [
          "After that,",
          "Furthermore,",
          "In the next design phase,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "City Council Zoning Approval",
        "title_vi": "Phê Chuẩn Quy Hoạch Của Hội Đồng Thành Phố",
        "image_url": "/images/week129/writing_panel_4.png",
        "image_prompt": "Smiling municipal planning officials shaking hands with the architects in front of an architectural scale model.",
        "caption": "The city council unanimously ratified the sustainable eco-district plan.",
        "sentence_frame": "In the end, the municipal planning council [ratified the eco-district plan] to ensure [long-term urban sustainability].",
        "pills": [
          "ratified the eco-district plan",
          "long-term urban sustainability",
          "unanimous vote",
          "resilient megacity"
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
        "title": "Blueprint Examination",
        "image_url": "/images/week129/writing_panel_1.png",
        "caption": "Architects examined holographic models of a self-cooling skyscraper.",
        "frame_L1": "First, the architects analyzed holographic blueprints. They confirmed that the tower incorporated green vertical gardens.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences describing holographic model examination.",
        "ordered_chips": [
          "Architects analyzed",
          "holographic blueprints",
          "to incorporate",
          "green vertical gardens"
        ],
        "pills": [
          "holographic blueprints",
          "green vertical gardens",
          "Julian and Maya",
          "tower design"
        ],
        "sentence_frame": "First, architects analyzed [holographic blueprints] to design [green vertical gardens]."
      },
      {
        "badge_label": "BUILD",
        "title": "Ventilation Testing",
        "image_url": "/images/week129/writing_panel_2.png",
        "caption": "Simulations proved passive ventilation cooled office floors naturally.",
        "frame_L1": "Next, Maya simulated wind vectors in the atrium. Natural airflow cooled all floors without mechanical air conditioning.",
        "connectors": [
          "Next,",
          "Subsequently,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences about simulated passive airflow.",
        "pills": [
          "simulated wind vectors",
          "natural airflow",
          "cooled floors",
          "Maya tested"
        ],
        "sentence_frame": "Next, Maya simulated [wind vectors] that provided [natural airflow cooling]."
      },
      {
        "badge_label": "WRITE",
        "title": "Skybridge Networks",
        "image_url": "/images/week129/writing_panel_3.png",
        "caption": "Elevated pedestrian skybridges linked towers without road traffic.",
        "frame_L1": "After that, engineers designed glass skybridges between towers. Residents could walk to work without crossing busy streets.",
        "connectors": [
          "After that,",
          "Later,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences describing pedestrian skybridge connections.",
        "pills": [
          "glass skybridges",
          "walk to work",
          "pedestrians",
          "avoided traffic"
        ],
        "sentence_frame": "After that, engineers designed [glass skybridges] so residents could [walk to work safely]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Municipal Approval",
        "image_url": "/images/week129/writing_panel_4.png",
        "caption": "The city council unanimously ratified the sustainable eco-district plan.",
        "frame_L1": "In the end, municipal leaders approved the zoning permit. The project set a sustainable benchmark for future megacities.",
        "connectors": [
          "In the end,",
          "Finally,",
          "As a result,"
        ],
        "sentence_hint": "Write 2 sentences about receiving final municipal council approval.",
        "pills": [
          "municipal leaders",
          "zoning permit",
          "sustainable benchmark",
          "future megacities"
        ],
        "sentence_frame": "In the end, municipal leaders approved [the zoning permit] to establish [a sustainable urban benchmark]."
      }
    ]
  }
};
export default writingHubData;
