/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 44 | Theme: "The Cookie Monster (Subtraction Language)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.167Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 44,
  "theme": "The Cookie Monster (Subtraction Language)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Explaining Subtraction with Snacks",
    "question": "Hi Chloe! How do you use cookies to explain subtraction to your friends?",
    "model_response": "I explain subtraction by taking cookies away from a plate! If we start with eight cookies and my brother eats three, we subtract three from eight. Eight minus three leaves five cookies left. Subtraction tells us the difference between what we had and what remains!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Lucas's Cookie Monster Subtraction",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Lucas",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "how many / cookies on tray at start?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How many cookies were on the tray at the start?",
            "How many cookies did Grandma bake?",
            "How many cookies were on the plate?"
          ],
          "nova_reply": "Grandma baked ten delicious chocolate cookies on the tray."
        },
        {
          "id": "field_a2",
          "cue_prompt": "who / took away four cookies?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who took away four cookies?",
            "Who took four cookies away?",
            "Who took the cookies for a snack?"
          ],
          "nova_reply": "The funny blue Cookie Monster puppet took away four cookies."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what / subtraction equation?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is the subtraction equation?",
            "What math equation did they write?",
            "What was the subtraction sentence?"
          ],
          "nova_reply": "The subtraction equation is: ten minus four equals six."
        },
        {
          "id": "field_a4",
          "cue_prompt": "how many / cookies left?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How many cookies were left?",
            "How many cookies remain on the plate?",
            "How many cookies are left on the tray?"
          ],
          "nova_reply": "There are six sweet cookies left on the ceramic plate."
        },
        {
          "id": "field_a5",
          "cue_prompt": "who / share remaining cookies with?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who did they share the remaining cookies with?",
            "Who did they give the remaining cookies to?",
            "Who ate the rest of the cookies?"
          ],
          "nova_reply": "They shared the remaining six cookies with their kind grandfather."
        }
      ]
    },
    "table_b": {
      "title": "Chloe's Fruit Tart Subtraction",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Chloe",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "how many / strawberry tarts on plate?",
          "cue_word": "how",
          "value": "Eight small homemade strawberry tarts on a plate.",
          "nova_question": "How many strawberry tarts were on Chloe's plate initially?",
          "acceptable_answers": [
            "Eight small homemade strawberry tarts on a plate.",
            "Eight strawberry tarts.",
            "Eight tarts."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "how many / tarts did friends eat?",
          "cue_word": "how",
          "value": "Three friends each ate one tart, so three were removed.",
          "nova_question": "How many fruit tarts were eaten during break time?",
          "acceptable_answers": [
            "Three friends each ate one tart, so three were removed.",
            "Three tarts were eaten.",
            "Three tarts."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "what / math equation sentence?",
          "cue_word": "what",
          "value": "Eight minus three leaves five tarts left on the dish.",
          "nova_question": "What subtraction sentence describes the remaining tarts?",
          "acceptable_answers": [
            "Eight minus three leaves five tarts left on the dish.",
            "Eight minus three equals five.",
            "Five tarts left."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "where / put remaining five tarts?",
          "cue_word": "where",
          "value": "Inside a cool glass container in the refrigerator.",
          "nova_question": "Where did Chloe store the remaining five tarts?",
          "acceptable_answers": [
            "Inside a cool glass container in the refrigerator.",
            "In the refrigerator.",
            "In a glass container."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / subtraction important in kitchen?",
          "cue_word": "why",
          "value": "It helps us count ingredients and share food fairly.",
          "nova_question": "Why is subtraction an important skill in the kitchen?",
          "acceptable_answers": [
            "It helps us count ingredients and share food fairly.",
            "To share food fairly.",
            "It helps us count ingredients."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
