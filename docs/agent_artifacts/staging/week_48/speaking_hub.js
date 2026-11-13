/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 48 | Theme: "Measuring Up (Length)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
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
          "id": "f1",
          "label": "Lab room",
          "cue_prompt": "what / lab room?",
          "cue_word": "lab",
          "is_missing": true,
          "acceptable_questions": [
            "What is the lab room?",
            "Can you tell me the lab room?"
          ],
          "nova_reply": "The lab room is recorded for Measuring Up (Length)."
        },
        {
          "id": "f2",
          "label": "Ruler length",
          "cue_prompt": "what / ruler length?",
          "cue_word": "ruler",
          "is_missing": true,
          "acceptable_questions": [
            "What is the ruler length?",
            "Can you tell me the ruler length?"
          ],
          "nova_reply": "The ruler length is recorded for Measuring Up (Length)."
        },
        {
          "id": "f3",
          "label": "Ribbon color",
          "cue_prompt": "what / ribbon color?",
          "cue_word": "ribbon",
          "is_missing": false,
          "card_value": "Ribbon color verified",
          "value": "Ribbon color verified",
          "examiner_question": "What is the ribbon color?",
          "acceptable_answers": [
            "It is ribbon color.",
            "Ribbon color."
          ]
        },
        {
          "id": "f4",
          "label": "Freezing temperature",
          "cue_prompt": "what / freezing temperature?",
          "cue_word": "freezing",
          "is_missing": false,
          "card_value": "Freezing temperature verified",
          "value": "Freezing temperature verified",
          "examiner_question": "What is the freezing temperature?",
          "acceptable_answers": [
            "It is freezing temperature.",
            "Freezing temperature."
          ]
        },
        {
          "id": "f5",
          "label": "Container type",
          "cue_prompt": "what / container type?",
          "cue_word": "container",
          "is_missing": false,
          "card_value": "Container type verified",
          "value": "Container type verified",
          "examiner_question": "What is the container type?",
          "acceptable_answers": [
            "It is container type.",
            "Container type."
          ]
        }
      ]
    },
    "table_b": {
      "title": "School Garden Botanist's Info Card",
      "subtitle": "Partner Card",
      "person": "School Garden Botanist",
      "fields": [
        {
          "id": "fb1",
          "label": "Garden plot",
          "cue_prompt": "what / garden plot?",
          "cue_word": "garden",
          "is_missing": false,
          "card_value": "Garden plot on file",
          "value": "Garden plot on file",
          "examiner_question": "What is the garden plot?",
          "acceptable_answers": [
            "It is garden plot.",
            "Garden plot."
          ]
        },
        {
          "id": "fb2",
          "label": "Sunflower height",
          "cue_prompt": "what / sunflower height?",
          "cue_word": "sunflower",
          "is_missing": false,
          "card_value": "Sunflower height on file",
          "value": "Sunflower height on file",
          "examiner_question": "What is the sunflower height?",
          "acceptable_answers": [
            "It is sunflower height.",
            "Sunflower height."
          ]
        },
        {
          "id": "fb3",
          "label": "Measuring tool",
          "cue_prompt": "what / measuring tool?",
          "cue_word": "measuring",
          "is_missing": true,
          "acceptable_questions": [
            "What is the measuring tool?",
            "Can you tell me the measuring tool?"
          ],
          "nova_reply": "The measuring tool is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Plot width",
          "cue_prompt": "what / plot width?",
          "cue_word": "plot",
          "is_missing": true,
          "acceptable_questions": [
            "What is the plot width?",
            "Can you tell me the plot width?"
          ],
          "nova_reply": "The plot width is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Growth this week",
          "cue_prompt": "what / growth this week?",
          "cue_word": "growth",
          "is_missing": true,
          "acceptable_questions": [
            "What is the growth this week?",
            "Can you tell me the growth this week?"
          ],
          "nova_reply": "The growth this week is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
