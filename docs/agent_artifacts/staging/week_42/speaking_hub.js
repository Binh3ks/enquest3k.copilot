/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 42 | Theme: "The Water Journey (Cycle)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
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
          "id": "fa1",
          "cue_prompt": "how deep / lake?",
          "cue_word": "depth",
          "is_missing": true,
          "acceptable_questions": [
            "How deep is the lake?",
            "What is the lake depth?"
          ],
          "nova_reply": "The mountain lake is eighty-five meters deep."
        },
        {
          "id": "fa2",
          "cue_prompt": "water / warm or cool?",
          "cue_word": "temperature",
          "is_missing": true,
          "acceptable_questions": [
            "Is the water warm or cool?",
            "What is the water temperature?"
          ],
          "nova_reply": "The water is cool and clear."
        },
        {
          "id": "fa3",
          "cue_prompt": "where / stream flow?",
          "cue_word": "flow",
          "is_missing": false,
          "card_value": "into the Pine River",
          "examiner_question": "Where does the mountain stream flow?"
        },
        {
          "id": "fa4",
          "cue_prompt": "how much / rain / weekly?",
          "cue_word": "rainfall",
          "is_missing": false,
          "card_value": "forty millimeters",
          "examiner_question": "How much rain falls weekly?"
        },
        {
          "id": "fa5",
          "cue_prompt": "what / animals / live there?",
          "cue_word": "wildlife",
          "is_missing": false,
          "card_value": "trout and otters",
          "examiner_question": "What animals live near the lake?"
        }
      ]
    },
    "table_b": {
      "title": "Emma's Cloud Experiment Card",
      "subtitle": "Candidate Answer Card",
      "person": "Emma",
      "fields": [
        {
          "id": "fb1",
          "cue_prompt": "how much / water / beaker?",
          "cue_word": "volume",
          "is_missing": false,
          "card_value": "one hundred milliliters",
          "examiner_question": "How much water is in the beaker?"
        },
        {
          "id": "fb2",
          "cue_prompt": "what temperature / vapor form?",
          "cue_word": "heat",
          "is_missing": false,
          "card_value": "fifty degrees Celsius",
          "examiner_question": "At what temperature does vapor form?"
        },
        {
          "id": "fb3",
          "cue_prompt": "where / experiment take place?",
          "cue_word": "location",
          "is_missing": true,
          "acceptable_questions": [
            "Where did the experiment take place?",
            "Where was the lab?"
          ],
          "nova_reply": "It took place in the school science laboratory."
        },
        {
          "id": "fb4",
          "cue_prompt": "how long / evaporation take?",
          "cue_word": "time",
          "is_missing": true,
          "acceptable_questions": [
            "How long did evaporation take?",
            "What was the time?"
          ],
          "nova_reply": "It took twenty-five minutes under the lamp."
        },
        {
          "id": "fb5",
          "cue_prompt": "what color / drops?",
          "cue_word": "color",
          "is_missing": true,
          "acceptable_questions": [
            "What color were the drops?",
            "Were the drops clear?"
          ],
          "nova_reply": "The drops were completely clear and pure."
        }
      ]
    }
  }
};
export default speakingHubData;
