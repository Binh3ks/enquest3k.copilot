/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 81 | Theme: "ELA: The Master Architect (Structure) / Math: Graphing Data" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.704Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 81,
  "theme": "ELA: The Master Architect (Structure) / Math: Graphing Data",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "Firstly, the introduction establishes a clear thesis statement.",
      "options": [
        "Firstly",
        "First of",
        "At first"
      ],
      "answer": "Firstly",
      "explanation": "Use 'Firstly' as an enumeration adverb to introduce the first point in formal writing."
    },
    {
      "sentence": "Secondly, three body paragraphs provide factual evidence.",
      "options": [
        "Secondly",
        "Second",
        "Seconds"
      ],
      "answer": "Secondly",
      "explanation": "Use 'Secondly' to introduce the second item in an ordered sequence."
    },
    {
      "sentence": "In conclusion, writers restate their thesis in new words.",
      "options": [
        "In conclusion",
        "At conclusion",
        "On conclusion"
      ],
      "answer": "In conclusion",
      "explanation": "The standard prepositional phrase to signal the ending of an essay is 'In conclusion'."
    },
    {
      "sentence": "Transition signals ensure logical cohesion across the essay.",
      "options": [
        "cohesion",
        "cohesive",
        "cohesively"
      ],
      "answer": "cohesion",
      "explanation": "The noun 'cohesion' describes the quality of parts sticking together into a united whole."
    },
    {
      "sentence": "A skilled master architect designs a blueprint before building.",
      "options": [
        "architect",
        "architecture",
        "architectural"
      ],
      "answer": "architect",
      "explanation": "Use the noun 'architect' referring to the person who designs structures."
    }
  ],
  "singapore_math": [
    {
      "id": "w81_p1",
      "type": "part_whole",
      "title": "Graphing Word Counts in a Five-Paragraph Essay",
      "question": "Lucas's introductory and concluding paragraphs total 130 words combined, while his three body paragraphs contain 270 words. What is the total word count of the five-paragraph essay?",
      "storyContext": "Mr. Vance helps Lucas plot paragraph word counts on an analytical bar graph.",
      "modelData": {
        "bars": [
          {
            "label": "Intro & Conclusion",
            "value": 130,
            "color": "#f59e0b"
          },
          {
            "label": "Three Body Paragraphs",
            "value": 270,
            "color": "#3b82f6"
          }
        ],
        "total": 400,
        "unit": "words"
      },
      "target_answer": 400,
      "unit": "words",
      "steps": [
        "Take the combined intro and conclusion length: 130 words.",
        "Add the three body paragraphs: 270 words.",
        "130 + 270 = 400 total words."
      ]
    },
    {
      "id": "w81_p2",
      "type": "comparison",
      "title": "Comparing Evidence Quotations between Body Paragraphs",
      "question": "Body Paragraph 1 contains 48 words of cited evidence, while Body Paragraph 2 contains 32 words of cited evidence. How many more words of evidence are in Paragraph 1 than Paragraph 2?",
      "storyContext": "Lucas compares quotation density across two draft sections on his bar chart.",
      "modelData": {
        "bars": [
          {
            "label": "Paragraph 1 Evidence",
            "value": 48,
            "color": "#10b981"
          },
          {
            "label": "Paragraph 2 Evidence",
            "value": 32,
            "color": "#6366f1"
          }
        ],
        "difference": 16,
        "unit": "words"
      },
      "target_answer": 16,
      "unit": "words",
      "steps": [
        "Start with Paragraph 1 evidence: 48 words.",
        "Subtract Paragraph 2 evidence: 32 words.",
        "48 - 32 = 16 words difference."
      ]
    }
  ],
  "science_lab": {
    "title_en": "ELA: The Master Architect (Structure) / Math: Graphing Data Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Introductory Foundation & Thesis",
        "diagram_type": "foundation_hook_blueprint",
        "instruction": "Select the required structural elements for a strong introductory paragraph.",
        "items": [
          {
            "label": "Engaging Opening Hook",
            "target": "hook"
          },
          {
            "label": "Contextual Background Info",
            "target": "context"
          },
          {
            "label": "Definitive Thesis Statement",
            "target": "thesis"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Body Paragraph Pillars & Evidence",
        "diagram_type": "pillar_evidence_column",
        "instruction": "Sequence the internal components of a supportive body paragraph.",
        "items": [
          {
            "label": "Clear Topic Sentence",
            "target": "topic_sentence"
          },
          {
            "label": "Factual Evidence & Quotes",
            "target": "evidence"
          },
          {
            "label": "Analytical Elaboration",
            "target": "elaboration"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Concluding Synthesis & Reflection",
        "diagram_type": "roof_synthesis_vault",
        "instruction": "Assemble the essential elements of an effective conclusion.",
        "items": [
          {
            "label": "Restated Thesis Statement",
            "target": "restate_thesis"
          },
          {
            "label": "Synthesis of Core Arguments",
            "target": "synthesis"
          },
          {
            "label": "Provocative Final Thought",
            "target": "reflection"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
