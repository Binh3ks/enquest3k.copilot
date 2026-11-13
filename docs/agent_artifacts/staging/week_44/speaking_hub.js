/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 44 | Theme: "The Cookie Monster (Subtraction Language)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:36:25.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 44,
  "theme": "The Cookie Monster (Subtraction Language)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Subtraction and Sharing",
    "question": "Why is subtraction useful when sharing snacks with friends?",
    "model_response": "Subtraction is very useful because it helps us count how many snacks are left! If we start with twenty cookies and share eight with friends, subtraction shows that twelve cookies remain in the jar. It keeps everything fair!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Ben's Cookie Bake Sale Card",
      "subtitle": "Candidate Question Card",
      "person": "Ben",
      "fields": [
        {
          "id": "fa1",
          "cue_prompt": "how many / cookies / baked?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "How many cookies were baked?",
            "How many cookies did you bake?"
          ],
          "nova_reply": "We baked seventy-two cookies on large trays."
        },
        {
          "id": "fa2",
          "cue_prompt": "how many / sold?",
          "cue_word": "sold",
          "is_missing": true,
          "acceptable_questions": [
            "How many cookies were sold?",
            "How many did you sell?"
          ],
          "nova_reply": "We sold twenty-eight cookies to morning visitors."
        },
        {
          "id": "fa3",
          "cue_prompt": "how many / left?",
          "cue_word": "remaining",
          "is_missing": false,
          "card_value": "forty-four cookies left",
          "examiner_question": "How many cookies were left in the jar?"
        },
        {
          "id": "fa4",
          "cue_prompt": "what / flavor / cookies?",
          "cue_word": "flavor",
          "is_missing": false,
          "card_value": "chocolate chip and butter",
          "examiner_question": "What flavor were the cookies?"
        },
        {
          "id": "fa5",
          "cue_prompt": "what time / bake sale / end?",
          "cue_word": "time",
          "is_missing": false,
          "card_value": "four o'clock in the afternoon",
          "examiner_question": "What time did the bake sale end?"
        }
      ]
    },
    "table_b": {
      "title": "Mia's Cookie Monster Party Card",
      "subtitle": "Candidate Answer Card",
      "person": "Mia",
      "fields": [
        {
          "id": "fb1",
          "cue_prompt": "how many / guests / arrived?",
          "cue_word": "guests",
          "is_missing": false,
          "card_value": "fifteen party guests",
          "examiner_question": "How many guests arrived at the party?"
        },
        {
          "id": "fb2",
          "cue_prompt": "how many / cookies / eaten?",
          "cue_word": "eaten",
          "is_missing": false,
          "card_value": "thirty-five cookies eaten",
          "examiner_question": "How many cookies were eaten?"
        },
        {
          "id": "fb3",
          "cue_prompt": "where / party / held?",
          "cue_word": "place",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the party held?",
            "Where did the party take place?"
          ],
          "nova_reply": "The party was held in Grandma's sunny backyard."
        },
        {
          "id": "fb4",
          "cue_prompt": "how many / cookies / left?",
          "cue_word": "left",
          "is_missing": true,
          "acceptable_questions": [
            "How many cookies were left?",
            "How many treats remained?"
          ],
          "nova_reply": "There were twenty-five cookies left in the big jar."
        },
        {
          "id": "fb5",
          "cue_prompt": "what / game / played?",
          "cue_word": "game",
          "is_missing": true,
          "acceptable_questions": [
            "What game did you play?",
            "What game was played?"
          ],
          "nova_reply": "We played a fun cookie monster counting game."
        }
      ]
    }
  }
};
export default speakingHubData;
