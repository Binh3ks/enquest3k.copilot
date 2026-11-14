/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 42 | Theme: "The Water Journey (Cycle)" | CEFR: A2 Flyers
 */
export const speakingHubData = {
  "week": 42,
  "theme": "The Water Journey (Cycle)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "The Water Cycle",
    "question": "Can you explain how rain forms in the sky?",
    "model_response": "First, the sun warms water on the ocean surface, causing evaporation! As warm water vapor rises high into the sky, it cools down and turns into clouds. When the water droplets become heavy, they fall down as rain!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Lucas's Mountain Lake Study",
      "subtitle": "Candidate Question Card",
      "person": "Lucas",
      "fields": [
        {
          "id": "field_a1",
          "label": "how deep / lake?",
          "cue_prompt": "how deep / lake?",
          "cue_word": "depth",
          "is_missing": true,
          "value": "Eighty-five meters deep",
          "acceptable_questions": [
            "How deep is the lake?",
            "What is the lake depth?",
            "How many meters deep is the lake?"
          ],
          "nova_reply": "The mountain lake is eighty-five meters deep."
        },
        {
          "id": "field_a2",
          "label": "water / warm or cool?",
          "cue_prompt": "water / warm or cool?",
          "cue_word": "temperature",
          "is_missing": true,
          "value": "Cool and clear",
          "acceptable_questions": [
            "Is the water warm or cool?",
            "What is the water temperature?",
            "Is the lake water cool?"
          ],
          "nova_reply": "The water is cool and clear."
        },
        {
          "id": "field_a3",
          "label": "where / stream flow?",
          "cue_prompt": "where / stream flow?",
          "cue_word": "flow",
          "is_missing": true,
          "value": "Into the Pine River",
          "acceptable_questions": [
            "Where does the mountain stream flow?",
            "Which river does the stream enter?",
            "Where does the water go?"
          ],
          "nova_reply": "The mountain stream flows down into the Pine River."
        },
        {
          "id": "field_a4",
          "label": "how much / rain / weekly?",
          "cue_prompt": "how much / rain / weekly?",
          "cue_word": "rainfall",
          "is_missing": true,
          "value": "Forty millimeters",
          "acceptable_questions": [
            "How much rain falls weekly?",
            "What is the weekly rainfall?",
            "How many millimeters of rain fall?"
          ],
          "nova_reply": "About forty millimeters of rain falls every week."
        },
        {
          "id": "field_a5",
          "label": "what / wildlife / live there?",
          "cue_prompt": "what / wildlife / live there?",
          "cue_word": "wildlife",
          "is_missing": true,
          "value": "Trout and river otters",
          "acceptable_questions": [
            "What animals live near the lake?",
            "Which wildlife can you find there?",
            "What creatures live in the lake?"
          ],
          "nova_reply": "Wild trout and river otters live around the lake."
        }
      ]
    },
    "table_b": {
      "title": "Emma's Cloud Experiment Card",
      "subtitle": "Candidate Answer Card",
      "person": "Emma",
      "fields": [
        {
          "id": "field_b1",
          "label": "how much / water / beaker?",
          "cue_prompt": "how much / water / beaker?",
          "cue_word": "volume",
          "is_missing": false,
          "value": "One hundred milliliters",
          "nova_question": "How much water is inside the glass beaker?",
          "acceptable_answers": [
            "One hundred milliliters",
            "One hundred milliliters.",
            "There is one hundred milliliters of water.",
            "100 ml."
          ]
        },
        {
          "id": "field_b2",
          "label": "what temperature / vapor form?",
          "cue_prompt": "what temperature / vapor form?",
          "cue_word": "temperature",
          "is_missing": false,
          "value": "Fifty degrees Celsius",
          "nova_question": "At what temperature does vapor begin to form?",
          "acceptable_answers": [
            "Fifty degrees Celsius",
            "Fifty degrees Celsius.",
            "Vapor forms at fifty degrees Celsius.",
            "50 degrees."
          ]
        },
        {
          "id": "field_b3",
          "label": "where / experiment take place?",
          "cue_prompt": "where / experiment take place?",
          "cue_word": "location",
          "is_missing": false,
          "value": "School science laboratory",
          "nova_question": "Where did the water cycle experiment take place?",
          "acceptable_answers": [
            "School science laboratory",
            "School science laboratory.",
            "It took place in the school science laboratory.",
            "In the science lab."
          ]
        },
        {
          "id": "field_b4",
          "label": "how long / evaporation take?",
          "cue_prompt": "how long / evaporation take?",
          "cue_word": "duration",
          "is_missing": false,
          "value": "Twenty-five minutes",
          "nova_question": "How long did the evaporation process take under the lamp?",
          "acceptable_answers": [
            "Twenty-five minutes",
            "Twenty-five minutes.",
            "It took twenty-five minutes.",
            "25 minutes."
          ]
        },
        {
          "id": "field_b5",
          "label": "what color / condensed drops?",
          "cue_prompt": "what color / condensed drops?",
          "cue_word": "color",
          "is_missing": false,
          "value": "Clear and pure",
          "nova_question": "What color were the condensed drops on the glass lid?",
          "acceptable_answers": [
            "Clear and pure",
            "Clear and pure.",
            "The drops were completely clear and pure.",
            "Clear."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
