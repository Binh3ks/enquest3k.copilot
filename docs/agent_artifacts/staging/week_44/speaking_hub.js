/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 44 | Theme: "The Cookie Monster (Subtraction Language)" | CEFR: A2 Flyers
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
          "id": "field_a1",
          "label": "how many / cookies baked?",
          "cue_prompt": "how many / cookies baked?",
          "cue_word": "baked",
          "is_missing": true,
          "value": "Seventy-two cookies",
          "acceptable_questions": [
            "How many cookies were baked?",
            "How many cookies did the class bake?",
            "What was the total number baked?"
          ],
          "nova_reply": "We baked seventy-two cookies on large baking trays."
        },
        {
          "id": "field_a2",
          "label": "how many / cookies sold?",
          "cue_prompt": "how many / cookies sold?",
          "cue_word": "sold",
          "is_missing": true,
          "value": "Twenty-eight cookies",
          "acceptable_questions": [
            "How many cookies were sold?",
            "How many treats did you sell?",
            "What was the number sold?"
          ],
          "nova_reply": "We sold twenty-eight cookies to morning visitors."
        },
        {
          "id": "field_a3",
          "label": "how many / cookies left?",
          "cue_prompt": "how many / cookies left?",
          "cue_word": "remaining",
          "is_missing": true,
          "value": "Forty-four cookies",
          "acceptable_questions": [
            "How many cookies were left?",
            "How many cookies remained in the jar?",
            "What was the remaining count?"
          ],
          "nova_reply": "There were forty-four cookies left in the jar."
        },
        {
          "id": "field_a4",
          "label": "what / flavor / cookies?",
          "cue_prompt": "what / flavor / cookies?",
          "cue_word": "flavor",
          "is_missing": true,
          "value": "Chocolate chip and butter",
          "acceptable_questions": [
            "What flavor were the cookies?",
            "What kind of cookies did you bake?",
            "What was the cookie flavor?"
          ],
          "nova_reply": "The cookies were chocolate chip and sweet butter flavor."
        },
        {
          "id": "field_a5",
          "label": "what time / bake sale end?",
          "cue_prompt": "what time / bake sale end?",
          "cue_word": "time",
          "is_missing": true,
          "value": "Four o'clock in the afternoon",
          "acceptable_questions": [
            "What time did the bake sale end?",
            "When did the sale finish?",
            "At what time did it end?"
          ],
          "nova_reply": "The bake sale finished at four o'clock in the afternoon."
        }
      ]
    },
    "table_b": {
      "title": "Mia's Cookie Monster Party Card",
      "subtitle": "Candidate Answer Card",
      "person": "Mia",
      "fields": [
        {
          "id": "field_b1",
          "label": "how many / party guests arrived?",
          "cue_prompt": "how many / party guests arrived?",
          "cue_word": "guests",
          "is_missing": false,
          "value": "Fifteen party guests",
          "nova_question": "How many guests arrived at the cookie party?",
          "acceptable_answers": [
            "Fifteen party guests",
            "Fifteen party guests.",
            "There were fifteen party guests.",
            "Fifteen guests."
          ]
        },
        {
          "id": "field_b2",
          "label": "how many / cookies eaten?",
          "cue_prompt": "how many / cookies eaten?",
          "cue_word": "eaten",
          "is_missing": false,
          "value": "Thirty-five cookies eaten",
          "nova_question": "How many cookies were eaten during the party?",
          "acceptable_answers": [
            "Thirty-five cookies eaten",
            "Thirty-five cookies eaten.",
            "The guests ate thirty-five cookies.",
            "Thirty-five."
          ]
        },
        {
          "id": "field_b3",
          "label": "where / party held?",
          "cue_prompt": "where / party held?",
          "cue_word": "venue",
          "is_missing": false,
          "value": "Grandma's sunny backyard",
          "nova_question": "Where was the cookie party held?",
          "acceptable_answers": [
            "Grandma's sunny backyard",
            "Grandma's sunny backyard.",
            "The party was held in Grandma's sunny backyard.",
            "In the backyard."
          ]
        },
        {
          "id": "field_b4",
          "label": "how many / cookies left in jar?",
          "cue_prompt": "how many / cookies left in jar?",
          "cue_word": "remaining",
          "is_missing": false,
          "value": "Twenty-five cookies",
          "nova_question": "How many cookies remained in the big glass jar?",
          "acceptable_answers": [
            "Twenty-five cookies",
            "Twenty-five cookies.",
            "There were twenty-five cookies left.",
            "Twenty-five."
          ]
        },
        {
          "id": "field_b5",
          "label": "what / game played?",
          "cue_prompt": "what / game played?",
          "cue_word": "game",
          "is_missing": false,
          "value": "Cookie monster counting game",
          "nova_question": "What game did the guests play together?",
          "acceptable_answers": [
            "Cookie monster counting game",
            "Cookie monster counting game.",
            "They played a fun cookie monster counting game.",
            "Cookie counting game."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
