/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 51 | Theme: "Review Station 2 (Vocab & CLIL)" | CEFR: A2 Flyers
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
          "id": "field_a1",
          "label": "which / target planet?",
          "cue_prompt": "which / target planet?",
          "cue_word": "planet",
          "is_missing": true,
          "value": "Jupiter",
          "acceptable_questions": [
            "Which target planet is the astronomer studying?",
            "What planet is being observed?",
            "Which planet is it?"
          ],
          "nova_reply": "The astronomer is observing Jupiter."
        },
        {
          "id": "field_a2",
          "label": "what / planet category?",
          "cue_prompt": "what / planet category?",
          "cue_word": "category",
          "is_missing": true,
          "value": "Gas giant planet",
          "acceptable_questions": [
            "What category of planet is Jupiter?",
            "What type of planet is Jupiter?",
            "Is Jupiter a gas planet?"
          ],
          "nova_reply": "Jupiter is classified as a giant swirling gas planet."
        },
        {
          "id": "field_a3",
          "label": "what / appearance description?",
          "cue_prompt": "what / appearance description?",
          "cue_word": "appearance",
          "is_missing": true,
          "value": "Swirling clouds and giant storms",
          "acceptable_questions": [
            "What does Jupiter look like?",
            "How is Jupiter's appearance described?",
            "What can you see on Jupiter?"
          ],
          "nova_reply": "Jupiter has thick swirling clouds and massive storms."
        },
        {
          "id": "field_a4",
          "label": "how many / moons orbiting?",
          "cue_prompt": "how many / moons orbiting?",
          "cue_word": "moons",
          "is_missing": true,
          "value": "Ninety-five moons",
          "acceptable_questions": [
            "How many moons orbit Jupiter?",
            "How many moons does Jupiter have?",
            "What is the number of moons?"
          ],
          "nova_reply": "Jupiter has ninety-five confirmed moons orbiting it."
        },
        {
          "id": "field_a5",
          "label": "what / distance from sun?",
          "cue_prompt": "what / distance from sun?",
          "cue_word": "distance",
          "is_missing": true,
          "value": "Seven hundred seventy-eight million kilometers",
          "acceptable_questions": [
            "What is Jupiter's distance from the sun?",
            "How far is Jupiter from the sun?",
            "How many kilometers from the sun is Jupiter?"
          ],
          "nova_reply": "Jupiter orbits at seven hundred seventy-eight million kilometers from the sun."
        }
      ]
    },
    "table_b": {
      "title": "Mars Mission Controller's Info Card",
      "subtitle": "Partner Card",
      "person": "Mars Mission Controller",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / mission vehicle?",
          "cue_prompt": "what / mission vehicle?",
          "cue_word": "vehicle",
          "is_missing": false,
          "value": "Robotic rover",
          "nova_question": "What vehicle is exploring the Martian surface?",
          "acceptable_answers": [
            "Robotic rover",
            "Robotic rover.",
            "A robotic rover is exploring the surface.",
            "The robotic rover."
          ]
        },
        {
          "id": "field_b2",
          "label": "which / destination planet?",
          "cue_prompt": "which / destination planet?",
          "cue_word": "planet",
          "is_missing": false,
          "value": "Mars",
          "nova_question": "Which planet is the mission controller directing?",
          "acceptable_answers": [
            "Mars",
            "Mars.",
            "The planet Mars.",
            "Mars is the destination."
          ]
        },
        {
          "id": "field_b3",
          "label": "what / planet appearance?",
          "cue_prompt": "what / planet appearance?",
          "cue_word": "appearance",
          "is_missing": false,
          "value": "Dry, red, rocky surface",
          "nova_question": "How is the surface of Mars described?",
          "acceptable_answers": [
            "Dry, red, rocky surface",
            "Dry, red, rocky surface.",
            "Mars has a dry, red, and rocky surface.",
            "Red and rocky."
          ]
        },
        {
          "id": "field_b4",
          "label": "what / surface feature photographed?",
          "cue_prompt": "what / surface feature photographed?",
          "cue_word": "craters",
          "is_missing": false,
          "value": "Giant impact craters",
          "nova_question": "What surface features does the rover photograph?",
          "acceptable_answers": [
            "Giant impact craters",
            "Giant impact craters.",
            "It photographs giant impact craters.",
            "Impact craters."
          ]
        },
        {
          "id": "field_b5",
          "label": "what / atmosphere condition?",
          "cue_prompt": "what / atmosphere condition?",
          "cue_word": "atmosphere",
          "is_missing": false,
          "value": "Thin carbon dioxide atmosphere",
          "nova_question": "What kind of atmosphere does Mars have?",
          "acceptable_answers": [
            "Thin carbon dioxide atmosphere",
            "Thin carbon dioxide atmosphere.",
            "Mars has a thin carbon dioxide atmosphere.",
            "Thin atmosphere."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
