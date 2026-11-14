/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 56 | Theme: "ELA: Cause & Effect (Paragraph) / Math: Subtraction with Regrouping"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 56,
  "theme": "ELA: Cause & Effect (Paragraph) / Math: Subtraction with Regrouping",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Describe a time when you solved a problem with plants or pets. Explain the cause of the problem, the action you took, and the result.",
  "info_exchange_cards": {
    "title": "David and Maya's Garden Project Exchange",
    "table_a": {
      "title": "David's School Garden",
      "person": "David",
      "fields": [
        {
          "id": "field_a1",
          "label": "where / David's garden?",
          "cue_prompt": "where / David's garden?",
          "cue_word": "where",
          "is_missing": true,
          "value": "Behind the school cafeteria",
          "acceptable_questions": [
            "Where is David's garden?",
            "Where did David make the garden?",
            "Where is his garden located?"
          ],
          "nova_reply": "David's garden is located right behind the school cafeteria."
        },
        {
          "id": "field_a2",
          "label": "what vegetables / plant?",
          "cue_prompt": "what vegetables / plant?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Tomatoes and carrots",
          "acceptable_questions": [
            "What vegetables did he plant?",
            "What did David grow?",
            "What kind of vegetables are in the garden?"
          ],
          "nova_reply": "David planted sweet red tomatoes and crunchy orange carrots."
        },
        {
          "id": "field_a3",
          "label": "when / water the plants?",
          "cue_prompt": "when / water the plants?",
          "cue_word": "when",
          "is_missing": true,
          "value": "At 8:00 AM every morning",
          "acceptable_questions": [
            "When does David water the plants?",
            "What time does he water them?",
            "When do they water the garden?"
          ],
          "nova_reply": "He waters the plants at 8:00 AM every morning before class."
        },
        {
          "id": "field_a4",
          "label": "how many / tomato plants?",
          "cue_prompt": "how many / tomato plants?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "25 tomato plants",
          "acceptable_questions": [
            "How many tomato plants are there?",
            "How many plants did he grow?",
            "How many tomatoes did they plant?"
          ],
          "nova_reply": "There are 25 healthy tomato plants growing in his garden bed."
        },
        {
          "id": "field_a5",
          "label": "who / helped David?",
          "cue_prompt": "who / helped David?",
          "cue_word": "who",
          "is_missing": true,
          "value": "His teacher Mrs. Green",
          "acceptable_questions": [
            "Who helped David?",
            "Who helped him in the garden?",
            "Who worked with David?"
          ],
          "nova_reply": "His science teacher Mrs. Green helped him set up the watering cans."
        }
      ]
    },
    "table_b": {
      "title": "Maya's Vegetable Patch",
      "person": "Maya",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Maya's favorite plant?",
          "cue_prompt": "what / Maya's favorite plant?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Green bean plants",
          "nova_question": "What is Maya's favorite plant in her vegetable patch?",
          "acceptable_answers": [
            "Green bean plants",
            "Green bean plants.",
            "Her favorite plant is green bean plants.",
            "Green beans"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / patch located?",
          "cue_prompt": "where / patch located?",
          "cue_word": "where",
          "is_missing": false,
          "value": "Next to the sunny playground",
          "nova_question": "Where is Maya's vegetable patch located?",
          "acceptable_answers": [
            "Next to the sunny playground",
            "Next to the playground.",
            "It is next to the sunny playground.",
            "Near the playground"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / bean pods picked?",
          "cue_prompt": "how many / bean pods picked?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "60 bean pods",
          "nova_question": "How many bean pods did Maya pick yesterday?",
          "acceptable_answers": [
            "60 bean pods",
            "Sixty bean pods",
            "She picked 60 bean pods.",
            "60 pods"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / pick beans?",
          "cue_prompt": "what time / pick beans?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 3:45 PM",
          "nova_question": "What time did she pick the beans?",
          "acceptable_answers": [
            "At 3:45 PM",
            "At 3:45",
            "She picked them at 3:45 PM.",
            "3:45 PM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / ate the fresh beans?",
          "cue_prompt": "who / ate the fresh beans?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Her family at dinner",
          "nova_question": "Who ate the fresh beans from her patch?",
          "acceptable_answers": [
            "Her family at dinner",
            "Her family",
            "Her family ate them at dinner.",
            "Maya's family"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
