/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 35 | Theme: "Storytelling Practice 2 (Personal Recount)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T07:16:42.026Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 35,
  "theme": "Storytelling Practice 2 (Personal Recount)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "My Most Memorable Trip",
    "question": "Hi Lucas! What was the most memorable part of your weekend visit to the Discovery Science Museum?",
    "model_response": "The most memorable part was entering the planetarium with Maya and Grandpa! Suddenly, the hall lights went dark and thousands of glowing stars appeared across the ceiling. We whispered with excitement, and Grandpa took a wonderful family photograph outside. It was a delightful adventure that I will always remember!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Maya's Museum Visit",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Maya",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / Maya go?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where did Maya go on Saturday morning?",
            "Where did Maya go?",
            "Where did she travel to?"
          ],
          "nova_reply": "Maya went to the Discovery Science Museum with her brother Lucas."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / see in main hall?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What did Maya see in the main exhibition hall?",
            "What did they see in the hall?",
            "What did they see?"
          ],
          "nova_reply": "They saw a giant walking robot that turned and waved hello."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how / feel in planetarium?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How did Maya feel inside the dark planetarium?",
            "How did she feel in the planetarium?",
            "Did Maya feel excited in the planetarium?"
          ],
          "nova_reply": "She felt delighted and whispered with wonder under the glowing stars."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / take photograph?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who took the family photograph before leaving?",
            "Who took the photo?",
            "Who took the photograph?"
          ],
          "nova_reply": "Grandpa took a wonderful photograph in front of the courtyard fountain."
        },
        {
          "id": "field_a5",
          "cue_prompt": "what souvenir / buy?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What souvenir did Maya choose from the gift shop?",
            "What souvenir did she buy?",
            "What did she buy as a souvenir?"
          ],
          "nova_reply": "She bought a colorful star puzzle as a memorable souvenir."
        }
      ]
    },
    "table_b": {
      "title": "Lucas's Birthday Celebration",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Lucas",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / party?",
          "cue_word": "where",
          "value": "At Grandpa's peaceful cottage near the sunny lake.",
          "nova_question": "Where was Lucas's birthday party held?",
          "acceptable_answers": [
            "At Grandpa's peaceful cottage near the sunny lake.",
            "At Grandpa's cottage near the lake.",
            "Near the lake at Grandpa's cottage."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / eat?",
          "cue_word": "what",
          "value": "A wonderful homemade strawberry cake.",
          "nova_question": "What delicious food did the family celebrate with?",
          "acceptable_answers": [
            "A wonderful homemade strawberry cake.",
            "Strawberry cake.",
            "They ate a homemade strawberry cake."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "when / celebration start?",
          "cue_word": "when",
          "value": "At two o'clock on Sunday afternoon.",
          "nova_question": "When did the celebration begin?",
          "acceptable_answers": [
            "At two o'clock on Sunday afternoon.",
            "At two o'clock.",
            "On Sunday afternoon."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / attend?",
          "cue_word": "who",
          "value": "His whole family and four cheerful school friends.",
          "nova_question": "Who joined Lucas for the birthday games?",
          "acceptable_answers": [
            "His whole family and four cheerful school friends.",
            "Family and four friends.",
            "His family and friends."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "how / Lucas feel?",
          "cue_word": "how",
          "value": "He felt delighted and laughed with happiness.",
          "nova_question": "How did Lucas feel at the end of the day?",
          "acceptable_answers": [
            "He felt delighted and laughed with happiness.",
            "He felt delighted.",
            "Lucas was delighted and happy."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
