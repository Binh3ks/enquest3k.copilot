/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 67 | Theme: "ELA: The OREO Structure / Math: Measuring Mass"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 67,
  "theme": "ELA: The OREO Structure / Math: Measuring Mass",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute persuasive speech using the OREO structure. State your opinion on a school rule, give a reason, share an example, and restate your opinion.",
  "info_exchange_cards": {
    "title": "Daniel and Hannah's Persuasive Speech Exchange",
    "table_a": {
      "title": "Daniel's Healthy Food Speech",
      "person": "Daniel",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / Daniel's speech topic?",
          "cue_prompt": "what / Daniel's speech topic?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Free fruit at school recess",
          "acceptable_questions": [
            "What is Daniel's speech topic?",
            "What did Daniel speak about?",
            "What was his persuasive speech about?"
          ],
          "nova_reply": "Daniel gave a persuasive speech about providing free fresh fruit at morning recess."
        },
        {
          "id": "field_a2",
          "label": "what / his main reason?",
          "cue_prompt": "what / his main reason?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Fruit gives natural vitamins and energy",
          "acceptable_questions": [
            "What was his main reason?",
            "Why does he want free fruit?",
            "What reason did Daniel give?"
          ],
          "nova_reply": "His main reason was that fresh fruit gives students natural vitamins and sustained energy."
        },
        {
          "id": "field_a3",
          "label": "how many / kilograms of apples?",
          "cue_prompt": "how many / kilograms of apples?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "15 kilograms for the class",
          "acceptable_questions": [
            "How many kilograms of apples did they need?",
            "How much mass was the fruit box?",
            "How many kilograms were requested?"
          ],
          "nova_reply": "He calculated that the third grade needs 15 kilograms of apples every week."
        },
        {
          "id": "field_a4",
          "label": "where / Daniel give speech?",
          "cue_prompt": "where / Daniel give speech?",
          "cue_word": "where",
          "is_missing": true,
          "value": "In the school cafeteria",
          "acceptable_questions": [
            "Where did he give the speech?",
            "Where was his presentation held?",
            "Where did Daniel speak?"
          ],
          "nova_reply": "Daniel gave his speech on stage in the school cafeteria during assembly."
        },
        {
          "id": "field_a5",
          "label": "who / supported his idea?",
          "cue_prompt": "who / supported his idea?",
          "cue_word": "who",
          "is_missing": true,
          "value": "Nurse Sarah and Coach Evans",
          "acceptable_questions": [
            "Who supported his idea?",
            "Who agreed with Daniel?",
            "Who backed his proposal?"
          ],
          "nova_reply": "Both school nurse Sarah and gym teacher Coach Evans strongly supported his proposal."
        }
      ]
    },
    "table_b": {
      "title": "Hannah's Snack Debate Card",
      "person": "Hannah",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Hannah's favorite snack?",
          "cue_prompt": "what / Hannah's favorite snack?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Crunchy baby carrots",
          "nova_question": "What is Hannah's favorite healthy snack in her presentation?",
          "acceptable_answers": [
            "Crunchy baby carrots",
            "Baby carrots.",
            "Her favorite snack is crunchy baby carrots.",
            "Carrots"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / bought the vegetables?",
          "cue_prompt": "where / bought the vegetables?",
          "cue_word": "where",
          "is_missing": false,
          "value": "At the weekend farmers market",
          "nova_question": "Where did her family buy the fresh vegetables?",
          "acceptable_answers": [
            "At the weekend farmers market",
            "At the farmers market.",
            "They bought them at the weekend farmers market.",
            "Farmers market"
          ]
        },
        {
          "id": "field_b3",
          "label": "how heavy / box of carrots?",
          "cue_prompt": "how heavy / box of carrots?",
          "cue_word": "how heavy",
          "is_missing": false,
          "value": "3 kilograms",
          "nova_question": "How heavy was the wooden box of carrots on the scale?",
          "acceptable_answers": [
            "3 kilograms",
            "Three kilograms",
            "It weighed 3 kilograms.",
            "3 kg"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / shared with friends?",
          "cue_prompt": "what time / shared with friends?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 10:00 AM recess",
          "nova_question": "What time did she share the carrots with her friends?",
          "acceptable_answers": [
            "At 10:00 AM recess",
            "At 10:00 AM.",
            "She shared them at 10:00 AM recess.",
            "10:00 AM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / helped her weigh the box?",
          "cue_prompt": "who / helped her weigh the box?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Her mother",
          "nova_question": "Who helped Hannah weigh the carrot box on the balance scale?",
          "acceptable_answers": [
            "Her mother",
            "Mother",
            "Her mother helped her weigh it.",
            "Hannah's mother"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
