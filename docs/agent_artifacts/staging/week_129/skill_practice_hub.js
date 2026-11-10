/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 129 | Theme: "Opinion Project 3: Smartphones Under 12?" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.449Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 129,
  "theme": "Opinion Project 3: Smartphones Under 12?",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "Excessive screen usage may disrupt natural adolescent sleep cycles.",
      "options": [
        "may disrupt",
        "must to disrupt",
        "can disrupting"
      ],
      "answer": "may disrupt",
      "explanation": "Use modal 'may' followed by the base verb 'disrupt' to express a well-founded possibility."
    },
    {
      "sentence": "It is imperative that parents establish clear screen-time guidelines.",
      "options": [
        "establish",
        "establishes",
        "established"
      ],
      "answer": "establish",
      "explanation": "After the subjunctive trigger 'It is imperative that...', use the base verb form 'establish'."
    },
    {
      "sentence": "Pediatric evidence suggests that unrestricted social media impairs focus.",
      "options": [
        "suggests that",
        "suggests for",
        "suggest that"
      ],
      "answer": "suggests that",
      "explanation": "The singular noun 'evidence' takes singular verb 'suggests' followed by 'that'."
    },
    {
      "sentence": "Families should practice digital moderation rather than imposing total bans.",
      "options": [
        "rather than",
        "instead",
        "whereas"
      ],
      "answer": "rather than",
      "explanation": "Use 'rather than' followed by a gerund or parallel structure to express a preferred alternative."
    },
    {
      "sentence": "Adolescent brains are particularly vulnerable to digital stimulation.",
      "options": [
        "vulnerable to",
        "vulnerable with",
        "vulnerable on"
      ],
      "answer": "vulnerable to",
      "explanation": "Use the preposition 'to' after the adjective 'vulnerable'."
    }
  ],
  "singapore_math": [
    {
      "id": "w129_p1",
      "type": "part_whole",
      "title": "Calculating Daily Screen Time Allocation",
      "question": "A middle school student spends 45 minutes on educational research apps and 65 minutes on video streaming apps each day. What is their total recreational and study screen time in minutes?",
      "storyContext": "Maya tallies daily device usage logs for her developmental psychology project.",
      "modelData": {
        "bars": [
          {
            "label": "Educational Apps",
            "value": 45,
            "color": "#10b981"
          },
          {
            "label": "Video Streaming",
            "value": 65,
            "color": "#f59e0b"
          }
        ],
        "total": 110,
        "unit": "minutes"
      },
      "target_answer": 110,
      "unit": "minutes",
      "steps": [
        "Take educational screen time: 45 minutes.",
        "Add streaming video time: 65 minutes.",
        "45 + 65 = 110 minutes total screen time per day."
      ]
    },
    {
      "id": "w129_p2",
      "type": "comparison",
      "title": "Comparing Sleep Duration: Screen-Free vs Screen-Active Bedrooms",
      "question": "Students with screen-free bedrooms sleep an average of 540 minutes per night, while students with active screens in their rooms sleep only 435 minutes. How many more minutes of restorative sleep do screen-free students achieve?",
      "storyContext": "Leo analyzes pediatric sleep comparison statistics.",
      "modelData": {
        "bars": [
          {
            "label": "Screen-Free Bedroom",
            "value": 540,
            "color": "#3b82f6"
          },
          {
            "label": "Active Screen Bedroom",
            "value": 435,
            "color": "#ef4444"
          }
        ],
        "difference": 105,
        "unit": "minutes"
      },
      "target_answer": 105,
      "unit": "minutes",
      "steps": [
        "Start with screen-free sleep: 540 minutes (9 hours).",
        "Subtract screen-active sleep: 435 minutes (7.25 hours).",
        "540 - 435 = 105 more minutes of restorative sleep."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Opinion Project 3: Smartphones Under 12? Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Mapping Neurological Screen Stimulation Pathways",
        "diagram_type": "adolescent_brain_dopamine_loop",
        "instruction": "Trace how interactive notifications trigger dopamine reward cycles in the developing brain.",
        "items": [
          {
            "label": "Push Notification Alert",
            "target": "sensory_stimulus"
          },
          {
            "label": "Dopamine Receptor Activation",
            "target": "neural_reward"
          },
          {
            "label": "Compulsive Check Habit Loop",
            "target": "behavioral_pattern"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Circadian Rhythm Blue-Light Disruption",
        "diagram_type": "pineal_gland_melatonin_suppression",
        "instruction": "Identify how late-night screen frequencies delay hormonal sleep triggers.",
        "items": [
          {
            "label": "High-Frequency Blue Light Wave",
            "target": "photoreceptor_input"
          },
          {
            "label": "Pineal Gland Melatonin Delay",
            "target": "hormone_inhibition"
          },
          {
            "label": "Delayed Sleep Cycle Onset",
            "target": "sleep_deficit"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Designing a Family Digital Wellbeing Agreement",
        "diagram_type": "family_media_ecosystem_balance",
        "instruction": "Balance emergency connectivity with screen-free boundaries and physical recreation.",
        "items": [
          {
            "label": "Basic Emergency Calling Channel",
            "target": "safety_feature"
          },
          {
            "label": "Hallway Device Charging Hub",
            "target": "boundary_zone"
          },
          {
            "label": "Outdoor Physical Recreation Goal",
            "target": "wellness_activity"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
