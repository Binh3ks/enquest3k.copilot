/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 47 | Theme: "Big Numbers (Place Value)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:30.707Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 47,
  "theme": "Big Numbers (Place Value)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Counting Big Numbers with Place Value",
    "question": "Hello Sophie! How does grouping numbers by tens help volunteers count hundreds of trees quickly?",
    "model_response": "Hello! Grouping by tens makes counting big numbers so much faster and easier! Instead of counting one by one, we bundle ten saplings together. Two bundles make twenty, five bundles make fifty, and ten bundles equal one hundred! Place value helps us see the exact amount without getting confused or losing our place."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Lucas's Village Tree Orchard",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Lucas",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "how many / oak trees planted?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many oak trees were planted?",
            "How many oak trees are there?",
            "How many oak trees did they plant?"
          ],
          "nova_reply": "The volunteers planted seventy-four sturdy oak saplings along the orchard path."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how many / rows of trees?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many rows of trees are in the orchard?",
            "How many rows of trees are there?",
            "How many rows were planted?"
          ],
          "nova_reply": "There are eight straight rows with nine trees in each row."
        },
        {
          "id": "field_a3",
          "cue_prompt": "who / planted the pine saplings?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who planted the pine saplings?",
            "Who planted the pine trees?",
            "Who helped plant them?"
          ],
          "nova_reply": "Lucas and his school friends planted thirty young pine saplings."
        },
        {
          "id": "field_a4",
          "cue_prompt": "which tree / tallest in village?",
          "cue_word": "which tree",
          "is_missing": true,
          "acceptable_questions": [
            "Which tree is the tallest in the village?",
            "Which tree is tallest?",
            "What is the tallest tree?"
          ],
          "nova_reply": "The giant village oak in the town square is twenty-five meters tall."
        },
        {
          "id": "field_a5",
          "cue_prompt": "how much / water needed daily?",
          "cue_word": "how much",
          "is_missing": true,
          "acceptable_questions": [
            "How much water is needed daily for the saplings?",
            "How much water do they need?",
            "How much water is required each day?"
          ],
          "nova_reply": "Each bundle of ten saplings needs forty liters of fresh rainwater daily."
        }
      ]
    },
    "table_b": {
      "title": "Sophie's Stargazing Night",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Sophie",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "how many / stars counted?",
          "cue_word": "how many",
          "value": "Sophie counted eighty-six shining stars across the clear night sky.",
          "nova_question": "How many shining stars did Sophie count in the night sky?",
          "acceptable_answers": [
            "Sophie counted eighty-six shining stars across the clear night sky.",
            "Eighty-six shining stars.",
            "Eighty-six stars."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what telescope / used?",
          "cue_word": "what telescope",
          "value": "She used a portable brass telescope borrowed from the school science lab.",
          "nova_question": "What telescope did Sophie use for observing the stars?",
          "acceptable_answers": [
            "She used a portable brass telescope borrowed from the school science lab.",
            "A portable brass telescope.",
            "A brass telescope from the science lab."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "where / observed the sky?",
          "cue_word": "where",
          "value": "From the top of Oak Hill behind the quiet village church.",
          "nova_question": "Where did Sophie set up her telescope to observe the sky?",
          "acceptable_answers": [
            "From the top of Oak Hill behind the quiet village church.",
            "On top of Oak Hill.",
            "Behind the quiet village church."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "which constellation / brightest?",
          "cue_word": "which constellation",
          "value": "The Great Bear constellation shone brightest with seven major stars.",
          "nova_question": "Which constellation looked brightest in the northern sky?",
          "acceptable_answers": [
            "The Great Bear constellation shone brightest with seven major stars.",
            "The Great Bear constellation.",
            "The Great Bear with seven major stars."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "what time / finished stargazing?",
          "cue_word": "what time",
          "value": "Sophie and her parents packed their telescope at half past nine.",
          "nova_question": "What time did Sophie finish her stargazing session?",
          "acceptable_answers": [
            "Sophie and her parents packed their telescope at half past nine.",
            "At half past nine.",
            "At nine thirty."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
