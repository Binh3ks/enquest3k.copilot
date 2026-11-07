/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 43 | Theme: "The "Plus" Machine (Addition Language)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.165Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 43,
  "theme": "The \"Plus\" Machine (Addition Language)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Reading Math Equations as Stories",
    "question": "Hi Alex! How does the Plus Machine help you read an addition problem?",
    "model_response": "The Plus Machine turns numbers into a real action story! When I put four marbles in one chute and Mia adds three marbles in the other chute, the machine combines them together. When we pull the lever, seven marbles roll out. So we read the sentence: four plus three equals seven!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Alex's Marbles Addition Experiment",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Alex",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "how many / red marbles drop?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How many red marbles did Alex drop?",
            "How many red marbles did he drop into the machine?",
            "How many red marbles were there?"
          ],
          "nova_reply": "Alex dropped five shiny red marbles into the left hopper chute."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / color of second group?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What color were the second group of marbles?",
            "What color marbles did Mia add?",
            "What was the color of the second group?"
          ],
          "nova_reply": "The second group consisted of bright blue glass marbles."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how / machine join them?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How does the machine join them together?",
            "How does the machine combine the marbles?",
            "How do the marbles join together?"
          ],
          "nova_reply": "The two chutes lead into a center funnel that joins the marbles together."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / pulled the release lever?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who pulled the release lever?",
            "Who operated the metal lever?",
            "Who pulled the machine lever?"
          ],
          "nova_reply": "Alex and Mia pulled the brass lever together with Mr. Davis."
        },
        {
          "id": "field_a5",
          "cue_prompt": "what / final equation sentence?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What was the final equation sentence?",
            "What equation did they read aloud?",
            "What is the math sentence?"
          ],
          "nova_reply": "They read aloud: five plus three equals eight marbles in total."
        }
      ]
    },
    "table_b": {
      "title": "Mia's Wooden Block Addition Experiment",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Mia",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "how many / yellow blocks on table?",
          "cue_word": "how",
          "value": "Six bright yellow wooden blocks stacked in a row.",
          "nova_question": "How many yellow blocks did Mia start with on her table?",
          "acceptable_answers": [
            "Six bright yellow wooden blocks stacked in a row.",
            "Six yellow blocks.",
            "Six blocks."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / blocks did Alex add?",
          "cue_word": "what",
          "value": "Four green rectangular blocks from the toy chest.",
          "nova_question": "What blocks did Alex add to Mia's yellow stack?",
          "acceptable_answers": [
            "Four green rectangular blocks from the toy chest.",
            "Four green rectangular blocks.",
            "Four green blocks."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "where / stack the combined blocks?",
          "cue_word": "where",
          "value": "On the wide wooden workbench beside the Plus Machine.",
          "nova_question": "Where did the children stack all the combined blocks?",
          "acceptable_answers": [
            "On the wide wooden workbench beside the Plus Machine.",
            "On the wide wooden workbench.",
            "On the workbench."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "how many / blocks altogether?",
          "cue_word": "how",
          "value": "Ten blocks altogether forming a tall colorful tower.",
          "nova_question": "How many blocks were there altogether in the finished tower?",
          "acceptable_answers": [
            "Ten blocks altogether forming a tall colorful tower.",
            "Ten blocks altogether.",
            "Ten blocks."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / activity fun?",
          "cue_word": "why",
          "value": "Because building blocks makes addition easy to see.",
          "nova_question": "Why was this block building activity fun for the class?",
          "acceptable_answers": [
            "Because building blocks makes addition easy to see.",
            "It makes addition easy to see.",
            "Because it was easy to see."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
