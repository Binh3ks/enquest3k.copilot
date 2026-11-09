/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 81 | Theme: "ELA: The Master Architect (Structure) / Math: Graphing Data" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.704Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 81,
  "theme": "ELA: The Master Architect (Structure) / Math: Graphing Data",
  "cefr_level": "B1 Preliminary",
  "talkshow_prompt": {
    "topic": "Mastering Essay Architecture and Transition Signals",
    "question": "Mr. Vance, how do transition signals function like architectural supports in writing?",
    "model_response": "Transition signals act just like the steel joints and connecting beams of a building! Signals such as 'firstly', 'secondly', and 'in conclusion' show the reader exactly which floor of the argument they are standing on. Without clear transition markers, an essay becomes a confusing pile of unmortared bricks. With them, every paragraph stands tall with balance, clarity, and structural cohesion!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Lucas's Essay Outline Project",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Lucas",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / display essay blueprint?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does Lucas display his essay blueprint?",
            "Where is the blueprint displayed?",
            "Where does he post the outline?"
          ],
          "nova_reply": "Lucas pins his blueprint on the center corkboard in the writing lab."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / central thesis of the essay?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is the central thesis of the essay?",
            "What is his thesis?",
            "What does the essay argue?"
          ],
          "nova_reply": "His thesis argues that renewable energy creates cleaner cities and healthier communities."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / body paragraphs planned?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many body paragraphs are planned?",
            "How many paragraphs in the body?",
            "What is the number of body paragraphs?"
          ],
          "nova_reply": "He planned three distinct body paragraphs, each with two pieces of evidence."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / reviews the outline draft?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who reviews the outline draft?",
            "Who checks his outline?",
            "Who gives feedback on the draft?"
          ],
          "nova_reply": "Writing mentor Mr. Vance reviews the outline draft with him."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / transition signals essential?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are transition signals essential?",
            "Why do we use transition signals?",
            "Why are transitions important?"
          ],
          "nova_reply": "Because transition signals guide readers smoothly from one argument to the next."
        }
      ]
    },
    "table_b": {
      "title": "Mr. Vance's Writing Workshop Guide",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Mr. Vance",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / conduct weekly writing seminars?",
          "cue_word": "where",
          "value": "In the multimedia humanities seminar room on the third floor.",
          "nova_question": "Where does Mr. Vance conduct his weekly writing seminars?",
          "acceptable_answers": [
            "In the multimedia humanities seminar room on the third floor.",
            "On the third floor.",
            "In the seminar room."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / core textbook used for outlining?",
          "cue_word": "what",
          "value": "The Elements of Structural Composition for Young Essayists.",
          "nova_question": "What core textbook is assigned for the outlining unit?",
          "acceptable_answers": [
            "The Elements of Structural Composition for Young Essayists.",
            "The Elements of Structural Composition.",
            "The Young Essayists composition book."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / measure paragraph word balance?",
          "cue_word": "how",
          "value": "By plotting paragraph lengths on a comparative bar graph.",
          "nova_question": "How do students verify that their paragraph lengths are balanced?",
          "acceptable_answers": [
            "By plotting paragraph lengths on a comparative bar graph.",
            "Using a comparative bar graph.",
            "By plotting lengths on a bar graph."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / judges the annual essay contest?",
          "cue_word": "who",
          "value": "A panel of three visiting university literature professors.",
          "nova_question": "Who judges the academy's annual analytical essay competition?",
          "acceptable_answers": [
            "A panel of three visiting university literature professors.",
            "Three university literature professors.",
            "University professors."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / revise introductory hooks carefully?",
          "cue_word": "why",
          "value": "To capture reader curiosity within the very first twenty seconds.",
          "nova_question": "Why should writers polish their introductory hook so carefully?",
          "acceptable_answers": [
            "To capture reader curiosity within the very first twenty seconds.",
            "To capture reader curiosity quickly.",
            "To interest readers in the first twenty seconds."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
