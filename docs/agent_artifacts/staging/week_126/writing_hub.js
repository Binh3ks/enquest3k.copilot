/**
 * STAGED DELIVERABLE: Writing Hub & Picture Story Architecture
 * Week: 126 | Theme: "Advanced Robotics & Artificial Intelligence Ethics" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.309Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const writingHubData = {
  "week": 126,
  "theme": "Advanced Robotics & Artificial Intelligence Ethics",
  "cefr_level": "B2 First",
  "picture_story": {
    "title": "Auditing an Autonomous Medical Assistant",
    "prompt_en": "Look at the four pictures. Write a formal investigative report about Dr. Vance and Ethan evaluating the safety and ethics of an autonomous hospital rover. Write 20 or more words.",
    "prompt_vi": "Nhìn vào 4 bức tranh. Viết bản báo cáo điều tra về Tiến sĩ Vance và Ethan đánh giá độ an toàn và đạo đức của robot bệnh viện tự hành (từ 20 từ trở lên).",
    "min_sentences": 3,
    "min_words": 20,
    "max_words": 90,
    "model_sentence": "Dr. Elena Vance and Ethan Cole conducted rigorous safety trials on their autonomous hospital rover. First, the sensors were calibrated to detect moving obstacles accurately. Next, Ethan audited the training datasets to eliminate algorithmic bias. After virtual simulations confirmed emergency stops functioned, the ethics committee approved clinical hospital deployment.",
    "word_bank": [
      "robotics",
      "algorithm",
      "ethics",
      "autonomous",
      "bias",
      "transparency",
      "safeguard",
      "simulation",
      "sensor",
      "accountability"
    ],
    "sentence_frames": [
      "Initially, the autonomous rover was evaluated within the university ___ laboratory.",
      "Engineers discovered that training data required balancing to prevent algorithmic ___.",
      "Comprehensive digital ___ verified that emergency brakes engaged under all conditions.",
      "Ultimately, institutional approval was granted due to complete system ___."
    ],
    "panels": [
      {
        "panel_id": "panel_1",
        "title_en": "Laboratory Sensor Calibration",
        "title_vi": "Hiệu Chuẩn Cảm Biến Phòng Thí Nghiệm",
        "image_url": "/images/week126/writing_panel_1.png",
        "image_prompt": "Two scientists in lab coats testing laser sensor arrays on a sleek wheeled hospital transport robot.",
        "caption": "Engineers calibrated sensor arrays to ensure obstacle detection was flawless.",
        "sentence_frame": "First, the research team [calibrated laser sensor arrays] to ensure [flawless obstacle detection].",
        "pills": [
          "calibrated laser sensor arrays",
          "flawless obstacle detection",
          "Dr. Vance and Ethan",
          "precision diagnostic"
        ],
        "connectors": [
          "First,",
          "Initially,",
          "At the start of testing,"
        ]
      },
      {
        "panel_id": "panel_2",
        "title_en": "Algorithmic Bias Inspection",
        "title_vi": "Thanh Tra Định Kiến Thuật Toán",
        "image_url": "/images/week126/writing_panel_2.png",
        "image_prompt": "A researcher examining lines of code and demographic distribution charts on a glowing monitor.",
        "caption": "Ethan audited neural network training sets to remove demographic bias.",
        "sentence_frame": "Next, the engineer [audited neural network datasets] to prevent [discriminatory algorithmic bias].",
        "pills": [
          "audited neural network datasets",
          "discriminatory algorithmic bias",
          "data integrity",
          "demographic balance"
        ],
        "connectors": [
          "Next,",
          "Subsequently,",
          "Following data analysis,"
        ]
      },
      {
        "panel_id": "panel_3",
        "title_en": "Virtual Collision Simulation",
        "title_vi": "Mô Phỏng Va Chạm Khẩn Cấp",
        "image_url": "/images/week126/writing_panel_3.png",
        "image_prompt": "A computer screen showing a 3D digital simulation of hospital hallways with virtual patients and carts.",
        "caption": "Simulations demonstrated that automated safeguards halted the rover safely.",
        "sentence_frame": "After that, virtual simulations proved that [emergency stopping safeguards] engaged [within milliseconds].",
        "pills": [
          "emergency stopping safeguards",
          "within milliseconds",
          "digital twin trial",
          "collision prevention"
        ],
        "connectors": [
          "After that,",
          "Furthermore,",
          "In subsequent tests,"
        ]
      },
      {
        "panel_id": "panel_4",
        "title_en": "Regulatory Certification Granted",
        "title_vi": "Cấp Chứng Nhận Quản Lý",
        "image_url": "/images/week126/writing_panel_4.png",
        "image_prompt": "A formal ethics review board handing signed compliance documents to smiling robotics engineers.",
        "caption": "The ethics board ratified hospital deployment based on full transparency.",
        "sentence_frame": "In the end, the ethics committee [authorized clinical deployment] due to [verified system transparency].",
        "pills": [
          "authorized clinical deployment",
          "verified system transparency",
          "ratified compliance",
          "Dr. Vance smiled"
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
        "title": "Sensor Calibration",
        "image_url": "/images/week126/writing_panel_1.png",
        "caption": "Engineers calibrated sensor arrays to ensure obstacle detection was flawless.",
        "frame_L1": "First, the engineering team tested optical sensors. They confirmed that spatial mapping was accurate.",
        "connectors": [
          "First,",
          "Initially,",
          "To begin,"
        ],
        "sentence_hint": "Write 2 sentences describing sensor testing in the laboratory.",
        "ordered_chips": [
          "Engineers tested",
          "optical sensor arrays",
          "to verify",
          "accurate spatial mapping"
        ],
        "pills": [
          "optical sensors",
          "spatial mapping",
          "Dr. Vance",
          "laboratory trial"
        ],
        "sentence_frame": "First, engineers tested [optical sensor arrays] to ensure [accurate spatial mapping]."
      },
      {
        "badge_label": "BUILD",
        "title": "Dataset Auditing",
        "image_url": "/images/week126/writing_panel_2.png",
        "caption": "Ethan audited neural network training sets to remove demographic bias.",
        "frame_L1": "Next, the data scientist analyzed training datasets. Biased data was removed to protect patient safety.",
        "connectors": [
          "Next,",
          "Subsequently,",
          "In addition,"
        ],
        "sentence_hint": "Write 2 sentences about eliminating algorithmic bias from training data.",
        "pills": [
          "training datasets",
          "removed biased data",
          "Ethan inspected",
          "algorithm fairness"
        ],
        "sentence_frame": "Next, the data scientist analyzed [training datasets] and removed [unbalanced demographic data]."
      },
      {
        "badge_label": "WRITE",
        "title": "Simulated Stress Testing",
        "image_url": "/images/week126/writing_panel_3.png",
        "caption": "Simulations demonstrated that automated safeguards halted the rover safely.",
        "frame_L1": "After that, the robot ran hundred virtual hallway trials. Automated brakes prevented every simulated crash.",
        "connectors": [
          "After that,",
          "Furthermore,",
          "Meanwhile,"
        ],
        "sentence_hint": "Write 2 sentences explaining virtual collision simulations.",
        "pills": [
          "virtual trials",
          "automated brakes",
          "prevented collisions",
          "digital twin"
        ],
        "sentence_frame": "After that, virtual trials confirmed that [automated brakes] prevented [every simulated collision]."
      },
      {
        "badge_label": "EXPAND",
        "title": "Ethics Council Approval",
        "image_url": "/images/week126/writing_panel_4.png",
        "caption": "The ethics board ratified hospital deployment based on full transparency.",
        "frame_L1": "In the end, hospital regulators reviewed audit logs. They approved clinical testing because accountability was maintained.",
        "connectors": [
          "In the end,",
          "Finally,",
          "As a result,"
        ],
        "sentence_hint": "Write 2 sentences about receiving formal ethics board approval.",
        "pills": [
          "audit logs",
          "approved testing",
          "accountability maintained",
          "clinical trial"
        ],
        "sentence_frame": "In the end, regulators reviewed [audit logs] and approved [clinical hospital testing]."
      }
    ]
  }
};
export default writingHubData;
