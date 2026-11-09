/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 46 | Theme: "The Pattern Code (Logic)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.169Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 46,
  "theme": "The Pattern Code (Logic)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "How to Predict the Next Item in a Pattern",
    "question": "Hi Noah! What steps do you follow to predict what comes next in a color sequence?",
    "model_response": "First, I look at the whole sequence and find the repeating unit. For example, if I see red, yellow, red, yellow, the rule is one red then one yellow! If the last bead is red, then I predict that the next item must be yellow. Finding the rule makes solving patterns easy!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Noah's Colored Bead Sequence",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Noah",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "what / colors on Noah's bead string?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What colors are on Noah's bead string?",
            "What colors did Noah use for his beads?",
            "What are the colors of the beads?"
          ],
          "nova_reply": "Noah used alternating bright red and sunny yellow beads."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how many / beads in the core unit?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How many beads are in the core unit?",
            "How many beads make up the repeating core?",
            "How many beads repeat?"
          ],
          "nova_reply": "There are two beads in the core: one red and one yellow."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what color / comes after yellow?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What color comes after yellow?",
            "What color follows after yellow?",
            "Which color comes next after yellow?"
          ],
          "nova_reply": "A red bead comes after every yellow bead according to the rule."
        },
        {
          "id": "field_a4",
          "cue_prompt": "how many / times does rule repeat?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How many times does the rule repeat?",
            "How many times does the sequence repeat?",
            "How many repeats are on the string?"
          ],
          "nova_reply": "The two-bead pattern repeats five times along the silver wire."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / patterns useful in science?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are patterns useful in science?",
            "Why do scientists study patterns?",
            "Why is finding patterns important?"
          ],
          "nova_reply": "Patterns help scientists predict future events and test hypotheses."
        }
      ]
    },
    "table_b": {
      "title": "Lily's Geometric Tile Puzzle",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Lily",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "what shapes / on Lily's puzzle grid?",
          "cue_word": "what",
          "value": "A repeating sequence of green squares and purple triangles.",
          "nova_question": "What geometric shapes appear on Lily's puzzle grid?",
          "acceptable_answers": [
            "A repeating sequence of green squares and purple triangles.",
            "Green squares and purple triangles.",
            "Squares and triangles."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / core rule of the sequence?",
          "cue_word": "what",
          "value": "Two green squares followed by one purple triangle.",
          "nova_question": "What is the core rule that governs this tile sequence?",
          "acceptable_answers": [
            "Two green squares followed by one purple triangle.",
            "Two squares and one triangle.",
            "Two green then one purple."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "what symbol / marked the missing spot?",
          "cue_word": "what",
          "value": "A large blinking white question mark token.",
          "nova_question": "What symbol marked the spot where a tile was missing?",
          "acceptable_answers": [
            "A large blinking white question mark token.",
            "A white question mark token.",
            "A question mark."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "what tile / belonged in the missing spot?",
          "cue_word": "what",
          "value": "A second green square tile completed the core.",
          "nova_question": "Which geometric tile belonged in the question mark spot?",
          "acceptable_answers": [
            "A second green square tile completed the core.",
            "A second green square tile.",
            "A green square."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "who / presented the Codebreaker award?",
          "cue_word": "who",
          "value": "Professor Bright presented a golden star trophy.",
          "nova_question": "Who presented the Codebreaker award to the children?",
          "acceptable_answers": [
            "Professor Bright presented a golden star trophy.",
            "Professor Bright.",
            "The professor."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
