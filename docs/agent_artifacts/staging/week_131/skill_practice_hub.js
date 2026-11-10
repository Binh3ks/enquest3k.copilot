/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 131 | Theme: "Opinion Project 3: Persuasive Techniques" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.453Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 131,
  "theme": "Opinion Project 3: Persuasive Techniques",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "Not only does digital moderation protect sleep, but it also improves attention.",
      "options": [
        "does digital moderation protect",
        "digital moderation protects",
        "did digital moderation protected"
      ],
      "answer": "does digital moderation protect",
      "explanation": "After the negative or limiting expression 'Not only...', invert the auxiliary verb and subject: 'does digital moderation protect'."
    },
    {
      "sentence": "By uniting emotion and logic, the speaker convinced skeptical listeners.",
      "options": [
        "convinced",
        "convince",
        "convincing"
      ],
      "answer": "convinced",
      "explanation": "Use past simple 'convinced' to describe completed persuasive action."
    },
    {
      "sentence": "The speech was both articulate and deeply moving to the audience.",
      "options": [
        "both",
        "either",
        "neither"
      ],
      "answer": "both",
      "explanation": "Use 'both... and...' to join two parallel positive adjectives."
    },
    {
      "sentence": "Varying vocal cadence reinforces the emotional weight of key phrases.",
      "options": [
        "reinforces",
        "reinforce",
        "reinforcing"
      ],
      "answer": "reinforces",
      "explanation": "The singular gerund subject 'Varying vocal cadence' takes the singular verb 'reinforces'."
    },
    {
      "sentence": "Ethos establishes personal credibility through consistent moral integrity.",
      "options": [
        "through",
        "with of",
        "across to"
      ],
      "answer": "through",
      "explanation": "Use 'through' to denote the means or agency by which credibility is established."
    }
  ],
  "singapore_math": [
    {
      "id": "w131_p1",
      "type": "part_whole",
      "title": "Measuring Time Devoted to Rhetorical Appeals",
      "question": "In a 300-second keynote address, Olivia spends 90 seconds establishing research credentials and ethos, and 210 seconds presenting logos and pathos. What is the total speech duration in seconds?",
      "storyContext": "Olivia reviews audio rehearsal logs to balance rhetorical components.",
      "modelData": {
        "bars": [
          {
            "label": "Ethos Introduction",
            "value": 90,
            "color": "#6366f1"
          },
          {
            "label": "Logos & Pathos Body",
            "value": 210,
            "color": "#10b981"
          }
        ],
        "total": 300,
        "unit": "seconds"
      },
      "target_answer": 300,
      "unit": "seconds",
      "steps": [
        "Take ethos duration: 90 seconds.",
        "Add logos and pathos duration: 210 seconds.",
        "90 + 210 = 300 seconds in total (5 full minutes)."
      ]
    },
    {
      "id": "w131_p2",
      "type": "comparison",
      "title": "Comparing Audience Engagement Rates",
      "question": "Before rhetoric coaching, 45 percent of audience members signed the digital wellness petition; after coaching in ethos, pathos, and logos, 82 percent signed. What was the percentage increase in sign-ups?",
      "storyContext": "Marcus analyzes petition conversion statistics on a comparative chart.",
      "modelData": {
        "bars": [
          {
            "label": "Post-Coaching Sign-ups",
            "value": 82,
            "color": "#0ea5e9"
          },
          {
            "label": "Pre-Coaching Baseline",
            "value": 45,
            "color": "#f59e0b"
          }
        ],
        "difference": 37,
        "unit": "percentage points"
      },
      "target_answer": 37,
      "unit": "percentage points",
      "steps": [
        "Start with post-coaching rate: 82%.",
        "Subtract pre-coaching rate: 45%.",
        "82 - 45 = 37 percentage point increase."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Opinion Project 3: Persuasive Techniques Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Balancing Aristotle's Rhetorical Triangle",
        "diagram_type": "rhetorical_triangle_equilibrium",
        "instruction": "Equilibrate ethos, pathos, and logos vectors to prevent speech bias or manipulation.",
        "items": [
          {
            "label": "Ethos Credibility Anchor",
            "target": "ethical_vertex"
          },
          {
            "label": "Pathos Emotional Empathy Vector",
            "target": "affective_vertex"
          },
          {
            "label": "Logos Empirical Evidence Base",
            "target": "rational_vertex"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Modulating Vocal Cadence & Pitch Contours",
        "diagram_type": "acoustic_speech_cadence_envelope",
        "instruction": "Structure pitch shifts, rhetorical emphasis, and three-second pauses across key sentences.",
        "items": [
          {
            "label": "Inverted Sentence Stress Peak",
            "target": "pitch_inflection"
          },
          {
            "label": "Deliberate Three-Second Silence",
            "target": "rhetorical_pause"
          },
          {
            "label": "Resonant Downward Cadence",
            "target": "resolution_cadence"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Synthesizing Persuasive Call to Action",
        "diagram_type": "civic_advocacy_conversion_funnel",
        "instruction": "Channel intellectual conviction into concrete community resolutions and petitions.",
        "items": [
          {
            "label": "Empirical Problem Formulation",
            "target": "cognitive_conviction"
          },
          {
            "label": "Heartfelt Empathy Awakening",
            "target": "moral_motivation"
          },
          {
            "label": "Unanimous Civic Commitment",
            "target": "action_commitment"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
