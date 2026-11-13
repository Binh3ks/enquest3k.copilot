/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 81 | Theme: "ELA: The Master Architect (Structure) / Math: Graphing Data" | CEFR: "B1 Preliminary"
 * Updated: 2026-11-13T04:18:06.397Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
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
    },
    {
      "id": 3,
      "title": "Problem 3: Atrium Pillar Load Capacity (Part-Whole)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A grand atrium pavilion rests on two primary load-bearing pillars. The north pillar supports 280 kilonewtons of weight and the south pillar supports 220 kilonewtons. What is the combined load supported by both pillars?",
      "question": "A grand atrium pavilion rests on two primary load-bearing pillars. The north pillar supports 280 kilonewtons of weight and the south pillar supports 220 kilonewtons. What is the combined load supported by both pillars?",
      "correctAnswer": 500,
      "target_answer": 500,
      "unit": "kilonewtons",
      "hintText": "Add the north pillar load (280) and south pillar load (220) together.",
      "steps": [
        "North pillar: 280 kN.",
        "South pillar: 220 kN.",
        "Combined structural load: 280 + 220 = 500 kilonewtons."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "North: 280kN",
            "value": 280,
            "color": "#475569"
          },
          {
            "label": "South: 220kN",
            "value": 220,
            "color": "#64748b"
          }
        ],
        "totalLabel": "Total: 500 kN"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Drafting Revision Expansion (Comparison)",
      "difficulty": "medium",
      "type": "comparison",
      "problemText": "Elena's revised second draft of her architectural research essay contains 680 words, whereas her preliminary first draft contained 490 words. How many words did Elena add during revision?",
      "question": "Elena's revised second draft of her architectural research essay contains 680 words, whereas her preliminary first draft contained 490 words. How many words did Elena add during revision?",
      "correctAnswer": 190,
      "target_answer": 190,
      "unit": "words",
      "hintText": "Subtract first draft words (490) from second draft words (680).",
      "steps": [
        "Second draft: 680 words.",
        "First draft: 490 words.",
        "Words added: 680 - 490 = 190 words."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Draft 2: 680",
            "value": 680,
            "color": "#2563eb"
          },
          {
            "label": "Draft 1: 490",
            "value": 490,
            "color": "#94a3b8"
          }
        ],
        "differenceLabel": "190 words added"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Blueprint Measurement Framing (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A structural blueprint specifies a corridor gallery length of 850 centimeters. The construction crew framed 310 centimeters on day one and 340 centimeters on day two. How many centimeters remain to be framed on day three?",
      "question": "A structural blueprint specifies a corridor gallery length of 850 centimeters. The construction crew framed 310 centimeters on day one and 340 centimeters on day two. How many centimeters remain to be framed on day three?",
      "correctAnswer": 200,
      "target_answer": 200,
      "unit": "cm",
      "hintText": "Add day one (310) and day two (340) framing first. Then subtract from 850 cm specified length.",
      "steps": [
        "Framed so far: 310 + 340 = 650 cm.",
        "Remaining to frame: 850 - 650 = 200 cm."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Day 1: 310cm",
            "value": 310,
            "color": "#0891b2"
          },
          {
            "label": "Day 2: 340cm",
            "value": 340,
            "color": "#06b6d4"
          },
          {
            "label": "Day 3: 200cm",
            "value": 200,
            "color": "#cbd5e1"
          }
        ],
        "totalLabel": "Spec: 850 cm"
      }
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
