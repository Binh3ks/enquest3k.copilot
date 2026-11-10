/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 126 | Theme: "From Essay to Speech" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.442Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 126,
  "theme": "From Essay to Speech",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "Moving on to our second main finding, let us examine the survey data.",
      "options": [
        "Moving on to",
        "Move on at",
        "Moved on for"
      ],
      "answer": "Moving on to",
      "explanation": "Use 'Moving on to...' as an oral signpost to transition smoothly to a new topic."
    },
    {
      "sentence": "Having examined the historical background, we can now address current policies.",
      "options": [
        "Having examined",
        "Have examined",
        "Examine"
      ],
      "answer": "Having examined",
      "explanation": "Use the perfect participle clause 'Having examined...' to summarize prior context before introducing a new focus."
    },
    {
      "sentence": "Turning our attention to the global market, export numbers grew significantly.",
      "options": [
        "Turning our attention to",
        "Turn our attention on",
        "Turned attention with"
      ],
      "answer": "Turning our attention to",
      "explanation": "Use 'Turning our attention to...' to direct listeners' focus toward a specific aspect."
    },
    {
      "sentence": "Speakers should pause deliberately so that listeners can absorb difficult points.",
      "options": [
        "so that",
        "because of",
        "in order"
      ],
      "answer": "so that",
      "explanation": "Use 'so that' followed by a clause to express the intended purpose of an action."
    },
    {
      "sentence": "Varying vocal intonation keeps the audience engaged throughout the address.",
      "options": [
        "keeps",
        "keep",
        "keeping"
      ],
      "answer": "keeps",
      "explanation": "The singular gerund subject 'Varying vocal intonation' takes the singular verb 'keeps'."
    }
  ],
  "singapore_math": [
    {
      "id": "w126_p1",
      "type": "part_whole",
      "title": "Allocating Time Across Speech Sections",
      "question": "A student allocates 120 seconds for the introduction and conclusions combined, and 240 seconds for the main body arguments. What is the total duration of the presentation in seconds?",
      "storyContext": "Lucas calculates speaking time limits using a rehearsal timeline chart.",
      "modelData": {
        "bars": [
          {
            "label": "Intro & Conclusion",
            "value": 120,
            "color": "#6366f1"
          },
          {
            "label": "Body Arguments",
            "value": 240,
            "color": "#10b981"
          }
        ],
        "total": 360,
        "unit": "seconds"
      },
      "target_answer": 360,
      "unit": "seconds",
      "steps": [
        "Take the introduction and conclusion time: 120 seconds.",
        "Add the body arguments duration: 240 seconds.",
        "120 + 240 = 360 seconds in total (exactly 6 minutes)."
      ]
    },
    {
      "id": "w126_p2",
      "type": "comparison",
      "title": "Comparing Word Counts: Full Essay vs Cue Card Notes",
      "question": "A complete written research essay contains 1,250 words, while its condensed cue card presentation notes contain only 280 words. How many fewer words are on the cue card notes?",
      "storyContext": "Elena reviews word reduction metrics on an editorial comparison graph.",
      "modelData": {
        "bars": [
          {
            "label": "Full Essay Text",
            "value": 1250,
            "color": "#f43f5e"
          },
          {
            "label": "Cue Card Notes",
            "value": 280,
            "color": "#3b82f6"
          }
        ],
        "difference": 970,
        "unit": "words"
      },
      "target_answer": 970,
      "unit": "words",
      "steps": [
        "Start with the total essay words: 1,250 words.",
        "Subtract the cue card words: 280 words.",
        "1,250 - 280 = 970 fewer words on the cue card outline."
      ]
    }
  ],
  "science_lab": {
    "title_en": "From Essay to Speech Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Deconstructing Written Essay into Core Themes",
        "diagram_type": "essay_text_condensation_funnel",
        "instruction": "Filter dense essay paragraphs down to core thesis statements and keyword prompts.",
        "items": [
          {
            "label": "Full Paragraph Text Analysis",
            "target": "source_input"
          },
          {
            "label": "Keyword Extraction Filter",
            "target": "condensation_stage"
          },
          {
            "label": "Pocket Cue Card Prompts",
            "target": "speaker_notes"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Mapping Signpost Transitions in Presentation Flow",
        "diagram_type": "speech_signposting_roadmap",
        "instruction": "Insert transition connectors between introduction, evidence points, and summary.",
        "items": [
          {
            "label": "Opening Signpost: 'Let us begin with...'",
            "target": "introduction_gate"
          },
          {
            "label": "Progressive Signpost: 'Moving on to...'",
            "target": "transition_node"
          },
          {
            "label": "Closing Signpost: 'In conclusion...'",
            "target": "synthesis_exit"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Optimizing Vocal Modulation & Pacing",
        "diagram_type": "vocal_cadence_frequency_wave",
        "instruction": "Synchronize pitch intonation, volume projection, and intentional silence pauses.",
        "items": [
          {
            "label": "Auditorium Vocal Projection",
            "target": "volume_level"
          },
          {
            "label": "Pitch Variation for Emphasis",
            "target": "intonation_curve"
          },
          {
            "label": "Strategic Three-Second Silence",
            "target": "cognitive_pause"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
