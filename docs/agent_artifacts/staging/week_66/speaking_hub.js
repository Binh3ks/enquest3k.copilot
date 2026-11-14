/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 66 | Theme: "Micro-Debate 1: Email vs Handwritten Letters"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 66,
  "theme": "Micro-Debate 1: Email vs Handwritten Letters",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute persuasive debate opening speech supporting either digital emails or handwritten letters. State your primary argument with a supporting comparison.",
  "info_exchange_cards": {
    "title": "Leo and Emily's Debate and Pen Pal Exchange",
    "table_a": {
      "title": "Leo's Debate Team on Emails",
      "person": "Leo",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / Leo's debate topic?",
          "cue_prompt": "what / Leo's debate topic?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Why emails are better for school",
          "acceptable_questions": [
            "What is Leo's debate topic?",
            "What was his debate about?",
            "What topic did Leo speak on?"
          ],
          "nova_reply": "Leo's debate topic was 'Why digital emails are faster and better for school news'."
        },
        {
          "id": "field_a2",
          "label": "how many / students on his team?",
          "cue_prompt": "how many / students on his team?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "4 students on Team A",
          "acceptable_questions": [
            "How many students were on his team?",
            "How many debaters were on Team A?",
            "How big was his debate team?"
          ],
          "nova_reply": "There were 4 students on Leo's debate team presenting points for emails."
        },
        {
          "id": "field_a3",
          "label": "what / main reason for emails?",
          "cue_prompt": "what / main reason for emails?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Messages arrive in seconds",
          "acceptable_questions": [
            "What was his main reason?",
            "Why did his team support emails?",
            "What was the top argument?"
          ],
          "nova_reply": "His main reason was that emails arrive in seconds and save trees by using no paper."
        },
        {
          "id": "field_a4",
          "label": "where / debate held?",
          "cue_prompt": "where / debate held?",
          "cue_word": "where",
          "is_missing": true,
          "value": "In the school media room",
          "acceptable_questions": [
            "Where was the debate held?",
            "Where did they have the debate?",
            "Where was the debate room?"
          ],
          "nova_reply": "The classroom debate was held in the school media room yesterday."
        },
        {
          "id": "field_a5",
          "label": "who / was the judge?",
          "cue_prompt": "who / was the judge?",
          "cue_word": "who",
          "is_missing": true,
          "value": "Principal Parker",
          "acceptable_questions": [
            "Who was the debate judge?",
            "Who judged the debate?",
            "Who listened to both teams?"
          ],
          "nova_reply": "School Principal Parker listened to both teams and served as the judge."
        }
      ]
    },
    "table_b": {
      "title": "Emily's Pen Pal Project",
      "person": "Emily",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Emily's project?",
          "cue_prompt": "what / Emily's project?",
          "cue_word": "what",
          "is_missing": false,
          "value": "A handwritten pen pal letter club",
          "nova_question": "What is Emily's classroom project about?",
          "acceptable_answers": [
            "A handwritten pen pal letter club",
            "A pen pal letter club.",
            "Her project is a handwritten pen pal letter club.",
            "Pen pal club"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / pen pal lives?",
          "cue_prompt": "where / pen pal lives?",
          "cue_word": "where",
          "is_missing": false,
          "value": "In sunny Melbourne, Australia",
          "nova_question": "Where does Emily's pen pal live?",
          "acceptable_answers": [
            "In sunny Melbourne, Australia",
            "In Melbourne, Australia.",
            "Her pen pal lives in Melbourne, Australia.",
            "Australia"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / letters received?",
          "cue_prompt": "how many / letters received?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "8 handwritten letters",
          "nova_question": "How many letters has Emily received this year?",
          "acceptable_answers": [
            "8 handwritten letters",
            "Eight handwritten letters",
            "She has received 8 letters.",
            "8 letters"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / write letters?",
          "cue_prompt": "what time / write letters?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 4:00 PM on Sundays",
          "nova_question": "What time does Emily usually write her letters?",
          "acceptable_answers": [
            "At 4:00 PM on Sundays",
            "At 4:00 PM.",
            "She writes at 4:00 PM on Sundays.",
            "4:00 PM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / gives her postage stamps?",
          "cue_prompt": "who / gives her postage stamps?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Her grandmother",
          "nova_question": "Who gives Emily stamps for her overseas letters?",
          "acceptable_answers": [
            "Her grandmother",
            "Grandmother",
            "Her grandmother gives her stamps.",
            "Grandma gives her stamps"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
