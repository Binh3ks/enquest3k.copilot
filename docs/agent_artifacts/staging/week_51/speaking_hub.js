/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 51 | Theme: "Review Station 2 (Vocab & CLIL)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 51,
  "theme": "Review Station 2 (Vocab & CLIL)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Describe your favorite planet using correct adjective order and scientific data from our solar system.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Observatory Astronomer",
      "cues": [
        "Target planet",
        "Planet category",
        "Adjective description",
        "Number of moons",
        "Orbital distance"
      ],
      "information": "Jupiter is a giant swirling gas planet with ninety-five moons. It orbits at a distance of seven hundred seventy-eight million kilometers from the sun."
    },
    "card_b": {
      "role": "Mars Mission Controller",
      "cues": [
        "Mission vehicle",
        "Planet type",
        "Adjective description",
        "Surface feature",
        "Atmosphere condition"
      ],
      "information": "The robotic rover explores Mars, an ancient dry red rocky planet. It photographs giant impact craters and studies the thin carbon dioxide atmosphere."
    },
    "table_a": {
      "title": "Observatory Astronomer's Info Card",
      "subtitle": "Candidate Card",
      "person": "Observatory Astronomer",
      "fields": [
        {
          "id": "f1",
          "label": "Target planet",
          "cue_prompt": "what / target planet?",
          "cue_word": "target",
          "is_missing": true,
          "acceptable_questions": [
            "What is the target planet?",
            "Can you tell me the target planet?"
          ],
          "nova_reply": "The target planet is recorded for Review Station 2 (Vocab & CLIL)."
        },
        {
          "id": "f2",
          "label": "Planet category",
          "cue_prompt": "what / planet category?",
          "cue_word": "planet",
          "is_missing": true,
          "acceptable_questions": [
            "What is the planet category?",
            "Can you tell me the planet category?"
          ],
          "nova_reply": "The planet category is recorded for Review Station 2 (Vocab & CLIL)."
        },
        {
          "id": "f3",
          "label": "Adjective description",
          "cue_prompt": "what / adjective description?",
          "cue_word": "adjective",
          "is_missing": false,
          "card_value": "Adjective description verified",
          "value": "Adjective description verified",
          "examiner_question": "What is the adjective description?",
          "acceptable_answers": [
            "It is adjective description.",
            "Adjective description."
          ]
        },
        {
          "id": "f4",
          "label": "Number of moons",
          "cue_prompt": "what / number of moons?",
          "cue_word": "number",
          "is_missing": false,
          "card_value": "Number of moons verified",
          "value": "Number of moons verified",
          "examiner_question": "What is the number of moons?",
          "acceptable_answers": [
            "It is number of moons.",
            "Number of moons."
          ]
        },
        {
          "id": "f5",
          "label": "Orbital distance",
          "cue_prompt": "what / orbital distance?",
          "cue_word": "orbital",
          "is_missing": false,
          "card_value": "Orbital distance verified",
          "value": "Orbital distance verified",
          "examiner_question": "What is the orbital distance?",
          "acceptable_answers": [
            "It is orbital distance.",
            "Orbital distance."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Mars Mission Controller's Info Card",
      "subtitle": "Partner Card",
      "person": "Mars Mission Controller",
      "fields": [
        {
          "id": "fb1",
          "label": "Mission vehicle",
          "cue_prompt": "what / mission vehicle?",
          "cue_word": "mission",
          "is_missing": false,
          "card_value": "Mission vehicle on file",
          "value": "Mission vehicle on file",
          "examiner_question": "What is the mission vehicle?",
          "acceptable_answers": [
            "It is mission vehicle.",
            "Mission vehicle."
          ]
        },
        {
          "id": "fb2",
          "label": "Planet type",
          "cue_prompt": "what / planet type?",
          "cue_word": "planet",
          "is_missing": false,
          "card_value": "Planet type on file",
          "value": "Planet type on file",
          "examiner_question": "What is the planet type?",
          "acceptable_answers": [
            "It is planet type.",
            "Planet type."
          ]
        },
        {
          "id": "fb3",
          "label": "Adjective description",
          "cue_prompt": "what / adjective description?",
          "cue_word": "adjective",
          "is_missing": true,
          "acceptable_questions": [
            "What is the adjective description?",
            "Can you tell me the adjective description?"
          ],
          "nova_reply": "The adjective description is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Surface feature",
          "cue_prompt": "what / surface feature?",
          "cue_word": "surface",
          "is_missing": true,
          "acceptable_questions": [
            "What is the surface feature?",
            "Can you tell me the surface feature?"
          ],
          "nova_reply": "The surface feature is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Atmosphere condition",
          "cue_prompt": "what / atmosphere condition?",
          "cue_word": "atmosphere",
          "is_missing": true,
          "acceptable_questions": [
            "What is the atmosphere condition?",
            "Can you tell me the atmosphere condition?"
          ],
          "nova_reply": "The atmosphere condition is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
