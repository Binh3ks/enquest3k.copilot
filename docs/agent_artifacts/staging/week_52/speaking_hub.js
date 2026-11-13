/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 52 | Theme: "Have You Ever\" Bingo (Seeding)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 52,
  "theme": "Have You Ever\" Bingo (Seeding)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Interview your partner using 'Have you ever...?' chunks and share three interesting experiences you discovered.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Global Junior Traveler",
      "cues": [
        "Countries visited",
        "Favorite experience",
        "Never tried",
        "Unusual food eaten",
        "Next adventure"
      ],
      "information": "Harper has visited three foreign countries and seen Mount Fuji. She has eaten sushi and dragon fruit, but has never ridden a camel. Her next dream is climbing the Alps."
    },
    "card_b": {
      "role": "Outdoor Adventure Explorer",
      "cues": [
        "Mountains climbed",
        "Aviation experience",
        "Never tried",
        "Museums visited",
        "Next goal"
      ],
      "information": "Daniel has climbed five forest hills and flown across the ocean twice. He has visited the national space museum, but has never flown in a hot air balloon. His goal is visiting a coral reef."
    },
    "table_a": {
      "title": "Global Junior Traveler's Info Card",
      "subtitle": "Candidate Card",
      "person": "Global Junior Traveler",
      "fields": [
        {
          "id": "f1",
          "label": "Countries visited",
          "cue_prompt": "what / countries visited?",
          "cue_word": "countries",
          "is_missing": true,
          "acceptable_questions": [
            "What is the countries visited?",
            "Can you tell me the countries visited?"
          ],
          "nova_reply": "The countries visited is recorded for Have You Ever\" Bingo (Seeding)."
        },
        {
          "id": "f2",
          "label": "Favorite experience",
          "cue_prompt": "what / favorite experience?",
          "cue_word": "favorite",
          "is_missing": true,
          "acceptable_questions": [
            "What is the favorite experience?",
            "Can you tell me the favorite experience?"
          ],
          "nova_reply": "The favorite experience is recorded for Have You Ever\" Bingo (Seeding)."
        },
        {
          "id": "f3",
          "label": "Never tried",
          "cue_prompt": "what / never tried?",
          "cue_word": "never",
          "is_missing": false,
          "card_value": "Never tried verified",
          "value": "Never tried verified",
          "examiner_question": "What is the never tried?",
          "acceptable_answers": [
            "It is never tried.",
            "Never tried."
          ]
        },
        {
          "id": "f4",
          "label": "Unusual food eaten",
          "cue_prompt": "what / unusual food eaten?",
          "cue_word": "unusual",
          "is_missing": false,
          "card_value": "Unusual food eaten verified",
          "value": "Unusual food eaten verified",
          "examiner_question": "What is the unusual food eaten?",
          "acceptable_answers": [
            "It is unusual food eaten.",
            "Unusual food eaten."
          ]
        },
        {
          "id": "f5",
          "label": "Next adventure",
          "cue_prompt": "what / next adventure?",
          "cue_word": "next",
          "is_missing": false,
          "card_value": "Next adventure verified",
          "value": "Next adventure verified",
          "examiner_question": "What is the next adventure?",
          "acceptable_answers": [
            "It is next adventure.",
            "Next adventure."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Outdoor Adventure Explorer's Info Card",
      "subtitle": "Partner Card",
      "person": "Outdoor Adventure Explorer",
      "fields": [
        {
          "id": "fb1",
          "label": "Mountains climbed",
          "cue_prompt": "what / mountains climbed?",
          "cue_word": "mountains",
          "is_missing": false,
          "card_value": "Mountains climbed on file",
          "value": "Mountains climbed on file",
          "examiner_question": "What is the mountains climbed?",
          "acceptable_answers": [
            "It is mountains climbed.",
            "Mountains climbed."
          ]
        },
        {
          "id": "fb2",
          "label": "Aviation experience",
          "cue_prompt": "what / aviation experience?",
          "cue_word": "aviation",
          "is_missing": false,
          "card_value": "Aviation experience on file",
          "value": "Aviation experience on file",
          "examiner_question": "What is the aviation experience?",
          "acceptable_answers": [
            "It is aviation experience.",
            "Aviation experience."
          ]
        },
        {
          "id": "fb3",
          "label": "Never tried",
          "cue_prompt": "what / never tried?",
          "cue_word": "never",
          "is_missing": true,
          "acceptable_questions": [
            "What is the never tried?",
            "Can you tell me the never tried?"
          ],
          "nova_reply": "The never tried is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Museums visited",
          "cue_prompt": "what / museums visited?",
          "cue_word": "museums",
          "is_missing": true,
          "acceptable_questions": [
            "What is the museums visited?",
            "Can you tell me the museums visited?"
          ],
          "nova_reply": "The museums visited is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Next goal",
          "cue_prompt": "what / next goal?",
          "cue_word": "next",
          "is_missing": true,
          "acceptable_questions": [
            "What is the next goal?",
            "Can you tell me the next goal?"
          ],
          "nova_reply": "The next goal is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
