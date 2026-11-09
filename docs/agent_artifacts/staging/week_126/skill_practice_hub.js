/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 126 | Theme: "Advanced Robotics & Artificial Intelligence Ethics" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.309Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 126,
  "theme": "Advanced Robotics & Artificial Intelligence Ethics",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "It is widely believed that autonomous systems require strict oversight.",
      "options": [
        "believed",
        "believing",
        "believe"
      ],
      "answer": "believed",
      "explanation": "Use past participle 'believed' in the impersonal passive structure 'It is widely believed that'."
    },
    {
      "sentence": "Training datasets must be audited to prevent discriminatory bias.",
      "options": [
        "audited",
        "auditing",
        "audit"
      ],
      "answer": "audited",
      "explanation": "Passive modal construction requires 'must be' followed by past participle 'audited'."
    },
    {
      "sentence": "Emergency safeguards were established by the international committee.",
      "options": [
        "were established",
        "was established",
        "establishing"
      ],
      "answer": "were established",
      "explanation": "Plural subject 'safeguards' requires plural passive auxiliary 'were established'."
    },
    {
      "sentence": "Full transparency allows regulators to inspect complex algorithms.",
      "options": [
        "allows",
        "allowing",
        "allow"
      ],
      "answer": "allows",
      "explanation": "Singular non-count noun 'transparency' requires singular 3rd person verb 'allows'."
    },
    {
      "sentence": "Accountability is considered essential whenever machines make decisions.",
      "options": [
        "is considered",
        "are considered",
        "considering"
      ],
      "answer": "is considered",
      "explanation": "Singular noun 'accountability' takes singular passive verb 'is considered'."
    }
  ],
  "singapore_math": [
    {
      "id": "w126_p1",
      "type": "part_whole",
      "title": "Algorithmic Dataset Demographic Distribution",
      "question": "An AI training dataset contains 650 audited clinical images and 350 simulated synthetic images. What is the total volume of training images in the balanced dataset?",
      "storyContext": "Ethan tallies image files across diagnostic categories to ensure balance.",
      "modelData": {
        "bars": [
          {
            "label": "Clinical Scans",
            "value": 650,
            "color": "#3b82f6"
          },
          {
            "label": "Synthetic Models",
            "value": 350,
            "color": "#10b981"
          }
        ],
        "total": 1000,
        "unit": "images"
      },
      "target_answer": 1000,
      "unit": "images",
      "steps": [
        "Identify 650 audited clinical images.",
        "Add 350 synthetic simulation images.",
        "650 + 350 = 1000 images in total."
      ]
    },
    {
      "id": "w126_p2",
      "type": "comparison",
      "title": "Sensor Response Latency Optimization",
      "question": "The legacy rover proximity sensor responded in 85 milliseconds, whereas the upgraded optical sensor triggers in 35 milliseconds. By how many milliseconds was sensor latency reduced?",
      "storyContext": "Dr. Vance benchmarks hardware stop speeds across repeated obstacle trials.",
      "modelData": {
        "bars": [
          {
            "label": "Legacy Sensor",
            "value": 85,
            "color": "#ef4444"
          },
          {
            "label": "Upgraded Sensor",
            "value": 35,
            "color": "#06b6d4"
          }
        ],
        "difference": 50,
        "unit": "milliseconds"
      },
      "target_answer": 50,
      "unit": "milliseconds",
      "steps": [
        "Start with legacy latency of 85 ms.",
        "Subtract upgraded latency of 35 ms.",
        "85 - 35 = 50 ms reduction in latency."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Advanced Robotics & Artificial Intelligence Ethics Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Classifying Ethical Governance Principles",
        "diagram_type": "governance_matrix",
        "instruction": "Assign each technological practice to its corresponding ethical principle.",
        "items": [
          {
            "label": "Publishing Training Code -> Transparency",
            "target": "transparency"
          },
          {
            "label": "Designating Legal Liability -> Accountability",
            "target": "accountability"
          },
          {
            "label": "Balancing Demographic Ratios -> Fairness",
            "target": "fairness"
          },
          {
            "label": "Manual Emergency Killswitch -> Safeguard",
            "target": "safeguard"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Sensor Pipeline Data Flow",
        "diagram_type": "sensor_pipeline",
        "instruction": "Trace the sequence of information from physical obstacle to robotic braking.",
        "items": [
          {
            "label": "Optical Sensor Detection",
            "target": "step_1"
          },
          {
            "label": "Neural Network Analysis",
            "target": "step_2"
          },
          {
            "label": "Mechanical Brake Activation",
            "target": "step_3"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Institutional Audit Protocol",
        "diagram_type": "audit_verification",
        "instruction": "Order the mandatory stages before clinical deployment authorization.",
        "items": [
          {
            "label": "Virtual Stress Simulation",
            "target": "stage_1"
          },
          {
            "label": "Third-Party Bias Assessment",
            "target": "stage_2"
          },
          {
            "label": "Ethics Council Certification",
            "target": "stage_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
