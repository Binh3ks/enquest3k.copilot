/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 48 | Theme: "Measuring Up (Length)" | CEFR: A2 Flyers
 */
export const speakingHubData = {
  "week": 48,
  "theme": "Measuring Up (Length)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Describe how you use rulers and measuring tapes to measure length and height at school.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Science Lab Assistant",
      "cues": [
        "Lab room",
        "Ruler length",
        "Ribbon color",
        "Freezing temperature",
        "Container type"
      ],
      "information": "Science Lab Room 3 uses thirty-centimeter plastic rulers. The blue ribbon measures forty-five centimeters. Water freezes at zero degrees Celsius in glass beakers."
    },
    "card_b": {
      "role": "School Garden Botanist",
      "cues": [
        "Garden plot",
        "Sunflower height",
        "Measuring tool",
        "Plot width",
        "Growth this week"
      ],
      "information": "Garden Plot B has a giant sunflower standing two meters tall. The botanist uses a flexible measuring tape. The plot width is eighty centimeters, and the flower grew five centimeters this week."
    },
    "table_a": {
      "title": "Science Lab Assistant's Info Card",
      "subtitle": "Candidate Card",
      "person": "Science Lab Assistant",
      "fields": [
        {
          "id": "field_a1",
          "label": "which / lab room?",
          "cue_prompt": "which / lab room?",
          "cue_word": "room",
          "is_missing": true,
          "value": "Science Lab Room 3",
          "acceptable_questions": [
            "Which science lab room is it?",
            "What room is the science lab?",
            "Where is the science experiment?"
          ],
          "nova_reply": "The experiment takes place in Science Lab Room 3."
        },
        {
          "id": "field_a2",
          "label": "how long / plastic ruler?",
          "cue_prompt": "how long / plastic ruler?",
          "cue_word": "ruler",
          "is_missing": true,
          "value": "Thirty centimeters",
          "acceptable_questions": [
            "How long is the plastic ruler?",
            "What is the length of the ruler?",
            "How many centimeters is the ruler?"
          ],
          "nova_reply": "The plastic ruler measures thirty centimeters long."
        },
        {
          "id": "field_a3",
          "label": "what color / ribbon measured?",
          "cue_prompt": "what color / ribbon measured?",
          "cue_word": "ribbon",
          "is_missing": true,
          "value": "Blue ribbon (forty-five centimeters)",
          "acceptable_questions": [
            "What color is the ribbon?",
            "What color ribbon was measured in the lab?",
            "What is the color of the ribbon?"
          ],
          "nova_reply": "The assistant measured a blue ribbon that is forty-five centimeters long."
        },
        {
          "id": "field_a4",
          "label": "what temperature / water freeze?",
          "cue_prompt": "what temperature / water freeze?",
          "cue_word": "freeze",
          "is_missing": true,
          "value": "Zero degrees Celsius",
          "acceptable_questions": [
            "At what temperature does water freeze?",
            "What is the freezing temperature of water?",
            "When does water freeze?"
          ],
          "nova_reply": "Water freezes at zero degrees Celsius in glass beakers."
        },
        {
          "id": "field_a5",
          "label": "what / container type?",
          "cue_prompt": "what / container type?",
          "cue_word": "container",
          "is_missing": true,
          "value": "Glass beakers",
          "acceptable_questions": [
            "What type of container is used?",
            "What container does the lab use?",
            "Are glass beakers used?"
          ],
          "nova_reply": "The lab assistant uses clean glass beakers for the liquids."
        }
      ]
    },
    "table_b": {
      "title": "School Garden Botanist's Info Card",
      "subtitle": "Partner Card",
      "person": "School Garden Botanist",
      "fields": [
        {
          "id": "field_b1",
          "label": "which / garden plot?",
          "cue_prompt": "which / garden plot?",
          "cue_word": "plot",
          "is_missing": false,
          "value": "Garden Plot B",
          "nova_question": "Which garden plot are you measuring?",
          "acceptable_answers": [
            "Garden Plot B",
            "Garden Plot B.",
            "It is Garden Plot B.",
            "Plot B."
          ]
        },
        {
          "id": "field_b2",
          "label": "how tall / giant sunflower?",
          "cue_prompt": "how tall / giant sunflower?",
          "cue_word": "height",
          "is_missing": false,
          "value": "Two meters tall",
          "nova_question": "How tall is the giant sunflower?",
          "acceptable_answers": [
            "Two meters tall",
            "Two meters tall.",
            "The giant sunflower is two meters tall.",
            "Two meters."
          ]
        },
        {
          "id": "field_b3",
          "label": "what / measuring tool used?",
          "cue_prompt": "what / measuring tool used?",
          "cue_word": "tool",
          "is_missing": false,
          "value": "Flexible measuring tape",
          "nova_question": "What measuring tool does the botanist use?",
          "acceptable_answers": [
            "Flexible measuring tape",
            "Flexible measuring tape.",
            "The botanist uses a flexible measuring tape.",
            "A measuring tape."
          ]
        },
        {
          "id": "field_b4",
          "label": "how wide / garden plot?",
          "cue_prompt": "how wide / garden plot?",
          "cue_word": "width",
          "is_missing": false,
          "value": "Eighty centimeters",
          "nova_question": "What is the width of Garden Plot B?",
          "acceptable_answers": [
            "Eighty centimeters",
            "Eighty centimeters.",
            "The plot width is eighty centimeters.",
            "Eighty centimeters wide."
          ]
        },
        {
          "id": "field_b5",
          "label": "how much / sunflower grow / this week?",
          "cue_prompt": "how much / sunflower grow / this week?",
          "cue_word": "growth",
          "is_missing": false,
          "value": "Five centimeters",
          "nova_question": "How much did the sunflower grow this week?",
          "acceptable_answers": [
            "Five centimeters",
            "Five centimeters.",
            "It grew five centimeters this week.",
            "Five centimeters growth."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
