/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 130 | Theme: "Opinion Project 3: Comparing Global Approaches" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.452Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 130,
  "theme": "Opinion Project 3: Comparing Global Approaches",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "In contrast to France's nationwide ban, Florida opted for a decentralized approach.",
      "options": [
        "In contrast to",
        "In addition to",
        "As a result of"
      ],
      "answer": "In contrast to",
      "explanation": "Use 'In contrast to' to highlight a prominent difference between two subjects."
    },
    {
      "sentence": "Whereas France bans all devices, Florida restricts access to specific platforms.",
      "options": [
        "Whereas",
        "Because",
        "Despite"
      ],
      "answer": "Whereas",
      "explanation": "Use 'Whereas' to contrast two facts or situations in adjoining clauses."
    },
    {
      "sentence": "Students with documented health conditions receive an official exemption.",
      "options": [
        "exemption",
        "exempted",
        "exempting"
      ],
      "answer": "exemption",
      "explanation": "Use the noun 'exemption' following the adjective 'official'."
    },
    {
      "sentence": "Consistent enforcement ensures that all students comply with school policies.",
      "options": [
        "comply with",
        "comply to",
        "comply for"
      ],
      "answer": "comply with",
      "explanation": "Use the preposition 'with' following the verb 'comply'."
    },
    {
      "sentence": "Lawmakers enacted statutory measures to protect student wellbeing.",
      "options": [
        "enacted",
        "enact",
        "enacting"
      ],
      "answer": "enacted",
      "explanation": "Use the past simple 'enacted' to describe completed legislative actions."
    }
  ],
  "singapore_math": [
    {
      "id": "w130_p1",
      "type": "part_whole",
      "title": "Tallying Comparative School Device Survey Sample",
      "question": "A comparative legal study surveys 180 French school administrators and 220 American district superintendents regarding policy enforcement. What is the total survey sample size?",
      "storyContext": "Chloe compiles survey response totals for her comparative law portfolio.",
      "modelData": {
        "bars": [
          {
            "label": "French Administrators",
            "value": 180,
            "color": "#3b82f6"
          },
          {
            "label": "American Superintendents",
            "value": 220,
            "color": "#ef4444"
          }
        ],
        "total": 400,
        "unit": "administrators"
      },
      "target_answer": 400,
      "unit": "administrators",
      "steps": [
        "Take French respondents: 180.",
        "Add American respondents: 220.",
        "180 + 220 = 400 total administrators surveyed."
      ]
    },
    {
      "id": "w130_p2",
      "type": "comparison",
      "title": "Comparing Policy Compliance Rates Over Time",
      "question": "In a pilot school, student compliance with device rules was 65 percent in September and rose to 92 percent by December following clear communication. What was the percentage increase in compliance?",
      "storyContext": "David graphs compliance improvements across the academic term.",
      "modelData": {
        "bars": [
          {
            "label": "December Compliance",
            "value": 92,
            "color": "#10b981"
          },
          {
            "label": "September Baseline",
            "value": 65,
            "color": "#f59e0b"
          }
        ],
        "difference": 27,
        "unit": "percentage points"
      },
      "target_answer": 27,
      "unit": "percentage points",
      "steps": [
        "Start with December compliance: 92%.",
        "Subtract September compliance: 65%.",
        "92 - 65 = 27 percentage point improvement."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Opinion Project 3: Comparing Global Approaches Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Centralized vs Decentralized Statutory Architecture",
        "diagram_type": "comparative_governance_flowchart",
        "instruction": "Map legislative command structures from national parliaments to local classroom doors.",
        "items": [
          {
            "label": "National Statutory Mandate",
            "target": "centralized_model"
          },
          {
            "label": "Decentralized District Policy",
            "target": "local_discretion"
          },
          {
            "label": "Administrative Enforcement Gateway",
            "target": "compliance_point"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Filtering Algorithmic Social Media Access",
        "diagram_type": "school_firewall_protocol_filter",
        "instruction": "Configure school network protocols to block social algorithms while allowing educational research.",
        "items": [
          {
            "label": "Social Platform Packet Filter",
            "target": "statutory_block"
          },
          {
            "label": "Educational Database Whitelist",
            "target": "open_access"
          },
          {
            "label": "Encrypted School Network Router",
            "target": "secure_gateway"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Evaluating Medical & Accommodation Exemptions",
        "diagram_type": "statutory_exemption_verification_flow",
        "instruction": "Process verified medical certificates to grant authorized device exemptions.",
        "items": [
          {
            "label": "Physician Medical Certificate",
            "target": "verification_input"
          },
          {
            "label": "Digital Health Permit",
            "target": "authorization_badge"
          },
          {
            "label": "Secure Classroom Monitoring",
            "target": "protected_usage"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
