/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 52 | Theme: "Have You Ever" Bingo (Seeding)" | CEFR: A2 Flyers
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
          "id": "field_a1",
          "label": "how many / foreign countries visited?",
          "cue_prompt": "how many / foreign countries visited?",
          "cue_word": "countries",
          "is_missing": true,
          "value": "Three foreign countries",
          "acceptable_questions": [
            "How many foreign countries has Harper visited?",
            "How many countries has she traveled to?",
            "What is the number of countries visited?"
          ],
          "nova_reply": "Harper has visited three foreign countries."
        },
        {
          "id": "field_a2",
          "label": "what / famous landmark seen?",
          "cue_prompt": "what / famous landmark seen?",
          "cue_word": "landmark",
          "is_missing": true,
          "value": "Mount Fuji in Japan",
          "acceptable_questions": [
            "What famous landmark has Harper seen?",
            "Which mountain has she visited?",
            "Has Harper seen Mount Fuji?"
          ],
          "nova_reply": "She has seen the snowy peak of Mount Fuji in Japan."
        },
        {
          "id": "field_a3",
          "label": "what / unusual food eaten?",
          "cue_prompt": "what / unusual food eaten?",
          "cue_word": "food",
          "is_missing": true,
          "value": "Sushi and dragon fruit",
          "acceptable_questions": [
            "What unusual foods has Harper eaten?",
            "What foods has she tried abroad?",
            "Has she eaten dragon fruit?"
          ],
          "nova_reply": "Harper has eaten fresh sushi and sweet dragon fruit."
        },
        {
          "id": "field_a4",
          "label": "what / never tried before?",
          "cue_prompt": "what / never tried before?",
          "cue_word": "never",
          "is_missing": true,
          "value": "Ridden a camel",
          "acceptable_questions": [
            "What has Harper never tried before?",
            "Has Harper ever ridden a camel?",
            "What adventure has she not done?"
          ],
          "nova_reply": "She has never ridden a camel in the desert."
        },
        {
          "id": "field_a5",
          "label": "what / next dream adventure?",
          "cue_prompt": "what / next dream adventure?",
          "cue_word": "dream",
          "is_missing": true,
          "value": "Climbing the Alps",
          "acceptable_questions": [
            "What is Harper's next dream adventure?",
            "What mountain range does she want to climb?",
            "Where does she want to go next?"
          ],
          "nova_reply": "Her next dream adventure is climbing the Swiss Alps."
        }
      ]
    },
    "table_b": {
      "title": "Outdoor Adventure Explorer's Info Card",
      "subtitle": "Partner Card",
      "person": "Outdoor Adventure Explorer",
      "fields": [
        {
          "id": "field_b1",
          "label": "how many / hills climbed?",
          "cue_prompt": "how many / hills climbed?",
          "cue_word": "hills",
          "is_missing": false,
          "value": "Five forest hills",
          "nova_question": "How many forest hills has Daniel climbed?",
          "acceptable_answers": [
            "Five forest hills",
            "Five forest hills.",
            "Daniel has climbed five forest hills.",
            "Five hills."
          ]
        },
        {
          "id": "field_b2",
          "label": "how many times / flown across ocean?",
          "cue_prompt": "how many times / flown across ocean?",
          "cue_word": "ocean",
          "is_missing": false,
          "value": "Twice",
          "nova_question": "How many times has Daniel flown across the ocean?",
          "acceptable_answers": [
            "Twice",
            "Twice.",
            "He has flown across the ocean twice.",
            "Two times."
          ]
        },
        {
          "id": "field_b3",
          "label": "which / museum visited?",
          "cue_prompt": "which / museum visited?",
          "cue_word": "museum",
          "is_missing": false,
          "value": "National Space Museum",
          "nova_question": "Which national museum has Daniel visited?",
          "acceptable_answers": [
            "National Space Museum",
            "National Space Museum.",
            "He has visited the National Space Museum.",
            "The space museum."
          ]
        },
        {
          "id": "field_b4",
          "label": "what / never tried before?",
          "cue_prompt": "what / never tried before?",
          "cue_word": "never",
          "is_missing": false,
          "value": "Flown in a hot air balloon",
          "nova_question": "What experience has Daniel never tried?",
          "acceptable_answers": [
            "Flown in a hot air balloon",
            "Flown in a hot air balloon.",
            "He has never flown in a hot air balloon.",
            "Hot air balloon."
          ]
        },
        {
          "id": "field_b5",
          "label": "what / next outdoor goal?",
          "cue_prompt": "what / next outdoor goal?",
          "cue_word": "goal",
          "is_missing": false,
          "value": "Visiting a coral reef",
          "nova_question": "What is Daniel's next outdoor exploration goal?",
          "acceptable_answers": [
            "Visiting a coral reef",
            "Visiting a coral reef.",
            "His goal is visiting a coral reef.",
            "A coral reef."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
