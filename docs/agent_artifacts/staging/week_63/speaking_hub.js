/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 63 | Theme: "ELA: Reading Maps / Math: Coordinates"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 63,
  "theme": "ELA: Reading Maps / Math: Coordinates",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Explain how to give someone directions using compass points and map grid coordinates instead of left and right.",
  "info_exchange_cards": {
    "title": "Ethan and Zoe's Map Exploration Exchange",
    "table_a": {
      "title": "Ethan's Treasure Map",
      "person": "Ethan",
      "fields": [
        {
          "id": "field_a1",
          "label": "where / Ethan's map show?",
          "cue_prompt": "where / Ethan's map show?",
          "cue_word": "where",
          "is_missing": true,
          "value": "Pine Tree Island",
          "acceptable_questions": [
            "Where does Ethan's map show?",
            "What island is on the map?",
            "Where is his treasure map located?"
          ],
          "nova_reply": "Ethan's treasure map shows the trails and hills of Pine Tree Island."
        },
        {
          "id": "field_a2",
          "label": "what / coordinate of treasure?",
          "cue_prompt": "what / coordinate of treasure?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Grid point D-5",
          "acceptable_questions": [
            "What is the coordinate of the treasure?",
            "Where is the treasure marked on the grid?",
            "What is the treasure coordinate?"
          ],
          "nova_reply": "The hidden treasure point is marked at grid coordinate D-5."
        },
        {
          "id": "field_a3",
          "label": "which direction / walk from dock?",
          "cue_prompt": "which direction / walk from dock?",
          "cue_word": "which direction",
          "is_missing": true,
          "value": "Walk North, then turn East",
          "acceptable_questions": [
            "Which direction should you walk?",
            "Which direction do we walk from the dock?",
            "How do we walk from the boat dock?"
          ],
          "nova_reply": "You walk North along the main trail for ten minutes, then turn East at the big rock."
        },
        {
          "id": "field_a4",
          "label": "how far / distance to cave?",
          "cue_prompt": "how far / distance to cave?",
          "cue_word": "how far",
          "is_missing": true,
          "value": "500 meters",
          "acceptable_questions": [
            "How far is the cave?",
            "What is the distance to the cave?",
            "How many meters is it?"
          ],
          "nova_reply": "The map scale shows the distance to the cave is exactly 500 meters."
        },
        {
          "id": "field_a5",
          "label": "who / drew the map?",
          "cue_prompt": "who / drew the map?",
          "cue_word": "who",
          "is_missing": true,
          "value": "Captain Barnaby in 1920",
          "acceptable_questions": [
            "Who drew the map?",
            "Who made the treasure map?",
            "Who was the map maker?"
          ],
          "nova_reply": "An old sea explorer named Captain Barnaby drew the map in 1920."
        }
      ]
    },
    "table_b": {
      "title": "Zoe's Camping Map",
      "person": "Zoe",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Zoe's map?",
          "cue_prompt": "what / Zoe's map?",
          "cue_word": "what",
          "is_missing": false,
          "value": "The Blue Lake Camp Map",
          "nova_question": "What is the title of Zoe's camping map?",
          "acceptable_answers": [
            "The Blue Lake Camp Map",
            "The Blue Lake Camp Map.",
            "Her map is the Blue Lake Camp Map.",
            "Blue Lake Camp Map"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / campsite located?",
          "cue_prompt": "where / campsite located?",
          "cue_word": "where",
          "is_missing": false,
          "value": "At grid coordinate B-2",
          "nova_question": "Where is the campsite located on her grid?",
          "acceptable_answers": [
            "At grid coordinate B-2",
            "At B-2.",
            "It is located at grid coordinate B-2.",
            "Grid coordinate B-2"
          ]
        },
        {
          "id": "field_b3",
          "label": "which direction / to the lake?",
          "cue_prompt": "which direction / to the lake?",
          "cue_word": "which direction",
          "is_missing": false,
          "value": "Walk South for 200 meters",
          "nova_question": "Which direction do campers walk to reach the lake?",
          "acceptable_answers": [
            "Walk South for 200 meters",
            "South.",
            "They walk South for 200 meters.",
            "South 200 meters"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / campfire starts?",
          "cue_prompt": "what time / campfire starts?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 7:00 PM",
          "nova_question": "What time does the evening campfire start?",
          "acceptable_answers": [
            "At 7:00 PM",
            "At 7:00",
            "The campfire starts at 7:00 PM.",
            "7:00 PM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / is the camp leader?",
          "cue_prompt": "who / is the camp leader?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Ranger Dan",
          "nova_question": "Who is the camp leader marked on the map key?",
          "acceptable_answers": [
            "Ranger Dan",
            "Ranger Dan.",
            "The camp leader is Ranger Dan.",
            "Ranger Dan is"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
