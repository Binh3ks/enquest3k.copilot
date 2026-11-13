/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 53 | Theme: "Project 4 Prep - \"My Year in Review\"" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 53,
  "theme": "Project 4 Prep - \"My Year in Review\"",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Explain how you solved a classroom mystery using clues and modals of deduction, and share your favorite portfolio artifact.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Lead Junior Detective",
      "cues": [
        "Case name",
        "Key clue",
        "Deduction made",
        "Suspect status",
        "Portfolio piece"
      ],
      "information": "In the Library Trophy Mystery, the key clue was a twenty-two-centimeter sneaker footprint. Oliver deduced it must be a primary student, and he curated the detective notes into his portfolio."
    },
    "card_b": {
      "role": "Portfolio Curation Leader",
      "cues": [
        "Project title",
        "Artifacts chosen",
        "Modal deduction skill",
        "Summary focus",
        "Display date"
      ],
      "information": "Grace's Year in Review portfolio contains five essays, three science diagrams, and an art award. She demonstrated that evidence must prove truth, and her portfolio will be displayed on Friday."
    },
    "table_a": {
      "title": "Lead Junior Detective's Info Card",
      "subtitle": "Candidate Card",
      "person": "Lead Junior Detective",
      "fields": [
        {
          "id": "f1",
          "label": "Case name",
          "cue_prompt": "what / case name?",
          "cue_word": "case",
          "is_missing": true,
          "acceptable_questions": [
            "What is the case name?",
            "Can you tell me the case name?"
          ],
          "nova_reply": "The case name is recorded for Project 4 Prep - \"My Year in Review\"."
        },
        {
          "id": "f2",
          "label": "Key clue",
          "cue_prompt": "what / key clue?",
          "cue_word": "key",
          "is_missing": true,
          "acceptable_questions": [
            "What is the key clue?",
            "Can you tell me the key clue?"
          ],
          "nova_reply": "The key clue is recorded for Project 4 Prep - \"My Year in Review\"."
        },
        {
          "id": "f3",
          "label": "Deduction made",
          "cue_prompt": "what / deduction made?",
          "cue_word": "deduction",
          "is_missing": false,
          "card_value": "Deduction made verified",
          "value": "Deduction made verified",
          "examiner_question": "What is the deduction made?",
          "acceptable_answers": [
            "It is deduction made.",
            "Deduction made."
          ]
        },
        {
          "id": "f4",
          "label": "Suspect status",
          "cue_prompt": "what / suspect status?",
          "cue_word": "suspect",
          "is_missing": false,
          "card_value": "Suspect status verified",
          "value": "Suspect status verified",
          "examiner_question": "What is the suspect status?",
          "acceptable_answers": [
            "It is suspect status.",
            "Suspect status."
          ]
        },
        {
          "id": "f5",
          "label": "Portfolio piece",
          "cue_prompt": "what / portfolio piece?",
          "cue_word": "portfolio",
          "is_missing": false,
          "card_value": "Portfolio piece verified",
          "value": "Portfolio piece verified",
          "examiner_question": "What is the portfolio piece?",
          "acceptable_answers": [
            "It is portfolio piece.",
            "Portfolio piece."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Portfolio Curation Leader's Info Card",
      "subtitle": "Partner Card",
      "person": "Portfolio Curation Leader",
      "fields": [
        {
          "id": "fb1",
          "label": "Project title",
          "cue_prompt": "what / project title?",
          "cue_word": "project",
          "is_missing": false,
          "card_value": "Project title on file",
          "value": "Project title on file",
          "examiner_question": "What is the project title?",
          "acceptable_answers": [
            "It is project title.",
            "Project title."
          ]
        },
        {
          "id": "fb2",
          "label": "Artifacts chosen",
          "cue_prompt": "what / artifacts chosen?",
          "cue_word": "artifacts",
          "is_missing": false,
          "card_value": "Artifacts chosen on file",
          "value": "Artifacts chosen on file",
          "examiner_question": "What is the artifacts chosen?",
          "acceptable_answers": [
            "It is artifacts chosen.",
            "Artifacts chosen."
          ]
        },
        {
          "id": "fb3",
          "label": "Modal deduction skill",
          "cue_prompt": "what / modal deduction skill?",
          "cue_word": "modal",
          "is_missing": true,
          "acceptable_questions": [
            "What is the modal deduction skill?",
            "Can you tell me the modal deduction skill?"
          ],
          "nova_reply": "The modal deduction skill is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Summary focus",
          "cue_prompt": "what / summary focus?",
          "cue_word": "summary",
          "is_missing": true,
          "acceptable_questions": [
            "What is the summary focus?",
            "Can you tell me the summary focus?"
          ],
          "nova_reply": "The summary focus is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Display date",
          "cue_prompt": "what / display date?",
          "cue_word": "display",
          "is_missing": true,
          "acceptable_questions": [
            "What is the display date?",
            "Can you tell me the display date?"
          ],
          "nova_reply": "The display date is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
