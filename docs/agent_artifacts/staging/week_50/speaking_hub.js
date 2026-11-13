/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 50 | Theme: "Review Station 1 (Grammar Mix)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 50,
  "theme": "Review Station 1 (Grammar Mix)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Present a TV news report on how electric vehicles and solar energy help protect the environment.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Electric Car Designer",
      "cues": [
        "Vehicle model",
        "Battery capacity",
        "Recharge time",
        "Driving range",
        "Clean energy source"
      ],
      "information": "The EcoCity Car uses a seventy-kilowatt battery. It charges in thirty minutes at fast stations, offers a four-hundred-kilometer range, and is powered entirely by solar panels."
    },
    "card_b": {
      "role": "Solar Charging Station Manager",
      "cues": [
        "Station location",
        "Number of chargers",
        "Solar panels on roof",
        "Daily vehicles served",
        "CO2 reduced"
      ],
      "information": "Greenway Hub has sixteen high-speed charging plugs and eighty solar panels on its roof. It serves ninety electric vehicles daily and reduces city emissions significantly."
    },
    "table_a": {
      "title": "Electric Car Designer's Info Card",
      "subtitle": "Candidate Card",
      "person": "Electric Car Designer",
      "fields": [
        {
          "id": "f1",
          "label": "Vehicle model",
          "cue_prompt": "what / vehicle model?",
          "cue_word": "vehicle",
          "is_missing": true,
          "acceptable_questions": [
            "What is the vehicle model?",
            "Can you tell me the vehicle model?"
          ],
          "nova_reply": "The vehicle model is recorded for Review Station 1 (Grammar Mix)."
        },
        {
          "id": "f2",
          "label": "Battery capacity",
          "cue_prompt": "what / battery capacity?",
          "cue_word": "battery",
          "is_missing": true,
          "acceptable_questions": [
            "What is the battery capacity?",
            "Can you tell me the battery capacity?"
          ],
          "nova_reply": "The battery capacity is recorded for Review Station 1 (Grammar Mix)."
        },
        {
          "id": "f3",
          "label": "Recharge time",
          "cue_prompt": "what / recharge time?",
          "cue_word": "recharge",
          "is_missing": false,
          "card_value": "Recharge time verified",
          "value": "Recharge time verified",
          "examiner_question": "What is the recharge time?",
          "acceptable_answers": [
            "It is recharge time.",
            "Recharge time."
          ]
        },
        {
          "id": "f4",
          "label": "Driving range",
          "cue_prompt": "what / driving range?",
          "cue_word": "driving",
          "is_missing": false,
          "card_value": "Driving range verified",
          "value": "Driving range verified",
          "examiner_question": "What is the driving range?",
          "acceptable_answers": [
            "It is driving range.",
            "Driving range."
          ]
        },
        {
          "id": "f5",
          "label": "Clean energy source",
          "cue_prompt": "what / clean energy source?",
          "cue_word": "clean",
          "is_missing": false,
          "card_value": "Clean energy source verified",
          "value": "Clean energy source verified",
          "examiner_question": "What is the clean energy source?",
          "acceptable_answers": [
            "It is clean energy source.",
            "Clean energy source."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Solar Charging Station Manager's Info Card",
      "subtitle": "Partner Card",
      "person": "Solar Charging Station Manager",
      "fields": [
        {
          "id": "fb1",
          "label": "Station location",
          "cue_prompt": "what / station location?",
          "cue_word": "station",
          "is_missing": false,
          "card_value": "Station location on file",
          "value": "Station location on file",
          "examiner_question": "What is the station location?",
          "acceptable_answers": [
            "It is station location.",
            "Station location."
          ]
        },
        {
          "id": "fb2",
          "label": "Number of chargers",
          "cue_prompt": "what / number of chargers?",
          "cue_word": "number",
          "is_missing": false,
          "card_value": "Number of chargers on file",
          "value": "Number of chargers on file",
          "examiner_question": "What is the number of chargers?",
          "acceptable_answers": [
            "It is number of chargers.",
            "Number of chargers."
          ]
        },
        {
          "id": "fb3",
          "label": "Solar panels on roof",
          "cue_prompt": "what / solar panels on roof?",
          "cue_word": "solar",
          "is_missing": true,
          "acceptable_questions": [
            "What is the solar panels on roof?",
            "Can you tell me the solar panels on roof?"
          ],
          "nova_reply": "The solar panels on roof is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Daily vehicles served",
          "cue_prompt": "what / daily vehicles served?",
          "cue_word": "daily",
          "is_missing": true,
          "acceptable_questions": [
            "What is the daily vehicles served?",
            "Can you tell me the daily vehicles served?"
          ],
          "nova_reply": "The daily vehicles served is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "CO2 reduced",
          "cue_prompt": "what / co2 reduced?",
          "cue_word": "co2",
          "is_missing": true,
          "acceptable_questions": [
            "What is the co2 reduced?",
            "Can you tell me the co2 reduced?"
          ],
          "nova_reply": "The co2 reduced is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
