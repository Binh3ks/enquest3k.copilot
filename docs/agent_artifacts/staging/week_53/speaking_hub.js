/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 53 | Theme: "Project 4 Prep - "My Year in Review"" | CEFR: A2 Flyers
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
          "id": "field_a1",
          "label": "what / mystery case name?",
          "cue_prompt": "what / mystery case name?",
          "cue_word": "case",
          "is_missing": true,
          "value": "The Library Trophy Mystery",
          "acceptable_questions": [
            "What is the mystery case name?",
            "What case did Oliver investigate?",
            "What was the title of the case?"
          ],
          "nova_reply": "The case was named The Library Trophy Mystery."
        },
        {
          "id": "field_a2",
          "label": "what / key clue discovered?",
          "cue_prompt": "what / key clue discovered?",
          "cue_word": "clue",
          "is_missing": true,
          "value": "Twenty-two-centimeter sneaker footprint",
          "acceptable_questions": [
            "What was the key clue discovered?",
            "What clue did Oliver find in the library?",
            "How long was the footprint clue?"
          ],
          "nova_reply": "The key clue was a twenty-two-centimeter sneaker footprint on the rug."
        },
        {
          "id": "field_a3",
          "label": "what / deduction made?",
          "cue_prompt": "what / deduction made?",
          "cue_word": "deduction",
          "is_missing": true,
          "value": "The culprit must be a primary student",
          "acceptable_questions": [
            "What deduction did Oliver make?",
            "Who did Oliver deduce the suspect was?",
            "What conclusion was reached from the footprint?"
          ],
          "nova_reply": "Oliver deduced that the footprint must belong to a primary school student."
        },
        {
          "id": "field_a4",
          "label": "where / notes curated?",
          "cue_prompt": "where / notes curated?",
          "cue_word": "notes",
          "is_missing": true,
          "value": "In his detective portfolio",
          "acceptable_questions": [
            "Where were the detective notes curated?",
            "Where did Oliver save his evidence?",
            "What document holds the investigation notes?"
          ],
          "nova_reply": "Oliver curated all detective notes neatly into his portfolio."
        },
        {
          "id": "field_a5",
          "label": "what / modal skill demonstrated?",
          "cue_prompt": "what / modal skill demonstrated?",
          "cue_word": "modal",
          "is_missing": true,
          "value": "Modals of deduction: must, could, cannot",
          "acceptable_questions": [
            "What modal grammar skill was demonstrated?",
            "Which modal verbs did Oliver use?",
            "What grammar skill was applied?"
          ],
          "nova_reply": "He demonstrated modals of deduction using must, could, and cannot."
        }
      ]
    },
    "table_b": {
      "title": "Portfolio Curation Leader's Info Card",
      "subtitle": "Partner Card",
      "person": "Portfolio Curation Leader",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / project portfolio title?",
          "cue_prompt": "what / project portfolio title?",
          "cue_word": "title",
          "is_missing": false,
          "value": "Year in Review Portfolio",
          "nova_question": "What is the title of Grace's project portfolio?",
          "acceptable_answers": [
            "Year in Review Portfolio",
            "Year in Review Portfolio.",
            "It is called Year in Review Portfolio.",
            "My Year in Review."
          ]
        },
        {
          "id": "field_b2",
          "label": "how many / written essays included?",
          "cue_prompt": "how many / written essays included?",
          "cue_word": "essays",
          "is_missing": false,
          "value": "Five essays",
          "nova_question": "How many written essays are included in her portfolio?",
          "acceptable_answers": [
            "Five essays",
            "Five essays.",
            "Her portfolio contains five essays.",
            "Five."
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / science diagrams?",
          "cue_prompt": "how many / science diagrams?",
          "cue_word": "diagrams",
          "is_missing": false,
          "value": "Three science diagrams",
          "nova_question": "How many science diagrams did Grace curate?",
          "acceptable_answers": [
            "Three science diagrams",
            "Three science diagrams.",
            "She included three science diagrams.",
            "Three diagrams."
          ]
        },
        {
          "id": "field_b4",
          "label": "what / core learning takeaway?",
          "cue_prompt": "what / core learning takeaway?",
          "cue_word": "takeaway",
          "is_missing": false,
          "value": "Evidence must prove truth",
          "nova_question": "What is Grace's core learning takeaway from the project?",
          "acceptable_answers": [
            "Evidence must prove truth",
            "Evidence must prove truth.",
            "She demonstrated that evidence must prove truth.",
            "Proof of truth."
          ]
        },
        {
          "id": "field_b5",
          "label": "when / portfolio display date?",
          "cue_prompt": "when / portfolio display date?",
          "cue_word": "date",
          "is_missing": false,
          "value": "This Friday afternoon",
          "nova_question": "When will Grace's portfolio be displayed in the hall?",
          "acceptable_answers": [
            "This Friday afternoon",
            "This Friday afternoon.",
            "It will be displayed on Friday.",
            "On Friday afternoon."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
