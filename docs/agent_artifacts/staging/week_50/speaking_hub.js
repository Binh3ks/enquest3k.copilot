/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 50 | Theme: "Review Station 1 (Grammar Mix)" | CEFR: A2 Flyers
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
          "id": "field_a1",
          "label": "what / vehicle model?",
          "cue_prompt": "what / vehicle model?",
          "cue_word": "model",
          "is_missing": true,
          "value": "The EcoCity Car",
          "acceptable_questions": [
            "What is the electric vehicle model?",
            "What model is the car?",
            "What is the name of the vehicle?"
          ],
          "nova_reply": "The vehicle model is called the EcoCity Car."
        },
        {
          "id": "field_a2",
          "label": "what / battery capacity?",
          "cue_prompt": "what / battery capacity?",
          "cue_word": "battery",
          "is_missing": true,
          "value": "Seventy kilowatts",
          "acceptable_questions": [
            "What is the battery capacity?",
            "How big is the battery?",
            "What capacity does the battery have?"
          ],
          "nova_reply": "The EcoCity Car uses a seventy-kilowatt battery."
        },
        {
          "id": "field_a3",
          "label": "how long / recharge time?",
          "cue_prompt": "how long / recharge time?",
          "cue_word": "recharge",
          "is_missing": true,
          "value": "Thirty minutes",
          "acceptable_questions": [
            "How long does the car take to recharge?",
            "What is the recharge time?",
            "How many minutes to charge?"
          ],
          "nova_reply": "It recharges in thirty minutes at high-speed fast stations."
        },
        {
          "id": "field_a4",
          "label": "what / driving range?",
          "cue_prompt": "what / driving range?",
          "cue_word": "range",
          "is_missing": true,
          "value": "Four hundred kilometers",
          "acceptable_questions": [
            "What is the driving range?",
            "How far can the car drive on one charge?",
            "What is its maximum range?"
          ],
          "nova_reply": "The EcoCity Car offers a four-hundred-kilometer driving range."
        },
        {
          "id": "field_a5",
          "label": "what / clean energy source?",
          "cue_prompt": "what / clean energy source?",
          "cue_word": "energy",
          "is_missing": true,
          "value": "Solar panels",
          "acceptable_questions": [
            "What is the clean energy source?",
            "Where does the clean electricity come from?",
            "What powers the charging station?"
          ],
          "nova_reply": "The car is charged with electricity powered entirely by solar panels."
        }
      ]
    },
    "table_b": {
      "title": "Solar Charging Station Manager's Info Card",
      "subtitle": "Partner Card",
      "person": "Solar Charging Station Manager",
      "fields": [
        {
          "id": "field_b1",
          "label": "where / station location?",
          "cue_prompt": "where / station location?",
          "cue_word": "location",
          "is_missing": false,
          "value": "Greenway Hub",
          "nova_question": "Where is the solar charging station located?",
          "acceptable_answers": [
            "Greenway Hub",
            "Greenway Hub.",
            "It is located at Greenway Hub.",
            "At Greenway Hub."
          ]
        },
        {
          "id": "field_b2",
          "label": "how many / fast chargers?",
          "cue_prompt": "how many / fast chargers?",
          "cue_word": "chargers",
          "is_missing": false,
          "value": "Sixteen high-speed plugs",
          "nova_question": "How many high-speed charging plugs are available?",
          "acceptable_answers": [
            "Sixteen high-speed plugs",
            "Sixteen high-speed plugs.",
            "There are sixteen high-speed charging plugs.",
            "Sixteen plugs."
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / solar panels on roof?",
          "cue_prompt": "how many / solar panels on roof?",
          "cue_word": "panels",
          "is_missing": false,
          "value": "Eighty solar panels",
          "nova_question": "How many solar panels are installed on the roof?",
          "acceptable_answers": [
            "Eighty solar panels",
            "Eighty solar panels.",
            "There are eighty solar panels on the roof.",
            "Eighty panels."
          ]
        },
        {
          "id": "field_b4",
          "label": "how many / vehicles served daily?",
          "cue_prompt": "how many / vehicles served daily?",
          "cue_word": "vehicles",
          "is_missing": false,
          "value": "Ninety electric vehicles",
          "nova_question": "How many electric vehicles does the hub serve daily?",
          "acceptable_answers": [
            "Ninety electric vehicles",
            "Ninety electric vehicles.",
            "It serves ninety electric vehicles daily.",
            "Ninety vehicles."
          ]
        },
        {
          "id": "field_b5",
          "label": "what / environmental benefit?",
          "cue_prompt": "what / environmental benefit?",
          "cue_word": "benefit",
          "is_missing": false,
          "value": "Reduces city carbon emissions",
          "nova_question": "What is the main environmental benefit of Greenway Hub?",
          "acceptable_answers": [
            "Reduces city carbon emissions",
            "Reduces city carbon emissions.",
            "It reduces city carbon emissions significantly.",
            "Reducing emissions."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
