/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 61 | Theme: "Main Idea Hunter: Volcanic Eruptions" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 61,
  "theme": "Main Idea Hunter: Volcanic Eruptions",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Explain the difference between a main idea and supporting details using a natural science topic like volcanoes or earthquakes.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Geology Guide A",
      "cues": [
        "Main topic investigated",
        "Location of magma chamber",
        "Total rock crates and items",
        "Calculated remaining samples",
        "Primary supporting detail"
      ]
    },
    "card_b": {
      "role": "Geology Guide B",
      "cues": [
        "Main topic investigated",
        "Location of magma chamber",
        "Total rock crates and items",
        "Calculated remaining samples",
        "Primary supporting detail"
      ]
    },
    "table_a": {
      "title": "Geology Guide A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Geology Guide A",
      "fields": [
        {
          "id": "f1",
          "label": "Main topic investigated",
          "cue_prompt": "what / main topic investigated?",
          "cue_word": "main",
          "is_missing": true,
          "acceptable_questions": [
            "What is the main topic investigated?",
            "Can you tell me the main topic investigated?"
          ],
          "nova_reply": "The main topic investigated is recorded for Main Idea Hunter: Volcanic Eruptions."
        },
        {
          "id": "f2",
          "label": "Location of magma chamber",
          "cue_prompt": "what / location of magma chamber?",
          "cue_word": "location",
          "is_missing": true,
          "acceptable_questions": [
            "What is the location of magma chamber?",
            "Can you tell me the location of magma chamber?"
          ],
          "nova_reply": "The location of magma chamber is recorded for Main Idea Hunter: Volcanic Eruptions."
        },
        {
          "id": "f3",
          "label": "Total rock crates and items",
          "cue_prompt": "what / total rock crates and items?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total rock crates and items verified",
          "value": "Total rock crates and items verified",
          "examiner_question": "What is the total rock crates and items?",
          "acceptable_answers": [
            "It is total rock crates and items.",
            "Total rock crates and items."
          ]
        },
        {
          "id": "f4",
          "label": "Calculated remaining samples",
          "cue_prompt": "what / calculated remaining samples?",
          "cue_word": "calculated",
          "is_missing": false,
          "card_value": "Calculated remaining samples verified",
          "value": "Calculated remaining samples verified",
          "examiner_question": "What is the calculated remaining samples?",
          "acceptable_answers": [
            "It is calculated remaining samples.",
            "Calculated remaining samples."
          ]
        },
        {
          "id": "f5",
          "label": "Primary supporting detail",
          "cue_prompt": "what / primary supporting detail?",
          "cue_word": "primary",
          "is_missing": false,
          "card_value": "Primary supporting detail verified",
          "value": "Primary supporting detail verified",
          "examiner_question": "What is the primary supporting detail?",
          "acceptable_answers": [
            "It is primary supporting detail.",
            "Primary supporting detail."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Geology Guide B's Info Card",
      "subtitle": "Partner Card",
      "person": "Geology Guide B",
      "fields": [
        {
          "id": "fb1",
          "label": "Main topic investigated",
          "cue_prompt": "what / main topic investigated?",
          "cue_word": "main",
          "is_missing": false,
          "card_value": "Main topic investigated on file",
          "value": "Main topic investigated on file",
          "examiner_question": "What is the main topic investigated?",
          "acceptable_answers": [
            "It is main topic investigated.",
            "Main topic investigated."
          ]
        },
        {
          "id": "fb2",
          "label": "Location of magma chamber",
          "cue_prompt": "what / location of magma chamber?",
          "cue_word": "location",
          "is_missing": false,
          "card_value": "Location of magma chamber on file",
          "value": "Location of magma chamber on file",
          "examiner_question": "What is the location of magma chamber?",
          "acceptable_answers": [
            "It is location of magma chamber.",
            "Location of magma chamber."
          ]
        },
        {
          "id": "fb3",
          "label": "Total rock crates and items",
          "cue_prompt": "what / total rock crates and items?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "What is the total rock crates and items?",
            "Can you tell me the total rock crates and items?"
          ],
          "nova_reply": "The total rock crates and items is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Calculated remaining samples",
          "cue_prompt": "what / calculated remaining samples?",
          "cue_word": "calculated",
          "is_missing": true,
          "acceptable_questions": [
            "What is the calculated remaining samples?",
            "Can you tell me the calculated remaining samples?"
          ],
          "nova_reply": "The calculated remaining samples is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Primary supporting detail",
          "cue_prompt": "what / primary supporting detail?",
          "cue_word": "primary",
          "is_missing": true,
          "acceptable_questions": [
            "What is the primary supporting detail?",
            "Can you tell me the primary supporting detail?"
          ],
          "nova_reply": "The primary supporting detail is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
