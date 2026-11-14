/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 40 | Theme: "Beast Battle (Comparisons)" | CEFR: A2 Flyers
 */
export const speakingHubData = {
  "week": 40,
  "theme": "Beast Battle (Comparisons)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Animal Comparisons",
    "question": "Which wild animal do you think is the strongest, and why?",
    "model_response": "I think the Siberian tiger is the strongest predator because it has powerful muscles and heavy bones! It can weigh over two hundred kilograms and hunt in deep snow. While cheetahs run faster, tigers are much stronger and have sharper teeth!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Marcus's Siberian Tiger Card",
      "subtitle": "Candidate Question Card",
      "person": "Marcus",
      "fields": [
        {
          "id": "field_a1",
          "label": "how heavy / Siberian tiger?",
          "cue_prompt": "how heavy / Siberian tiger?",
          "cue_word": "weight",
          "is_missing": true,
          "value": "Three hundred kilograms",
          "acceptable_questions": [
            "How heavy is the Siberian tiger?",
            "How much does the Siberian tiger weigh?",
            "What is the weight of the tiger?"
          ],
          "nova_reply": "The male Siberian tiger weighs three hundred kilograms."
        },
        {
          "id": "field_a2",
          "label": "what color / stripes?",
          "cue_prompt": "what color / stripes?",
          "cue_word": "color",
          "is_missing": true,
          "value": "Dark brown and black",
          "acceptable_questions": [
            "What color are its stripes?",
            "What color are the tiger's stripes?",
            "Are its stripes black?"
          ],
          "nova_reply": "Its stripes are dark brown and black."
        },
        {
          "id": "field_a3",
          "label": "where / tiger live?",
          "cue_prompt": "where / tiger live?",
          "cue_word": "habitat",
          "is_missing": true,
          "value": "Russian cold pine forests",
          "acceptable_questions": [
            "Where does the Siberian tiger live?",
            "What is its natural habitat?",
            "Where can you find the tiger?"
          ],
          "nova_reply": "The Siberian tiger lives in cold pine forests in Russia."
        },
        {
          "id": "field_a4",
          "label": "how fast / tiger run?",
          "cue_prompt": "how fast / tiger run?",
          "cue_word": "speed",
          "is_missing": true,
          "value": "Sixty kilometers per hour",
          "acceptable_questions": [
            "How fast can the tiger run?",
            "What is the tiger's top speed?",
            "Can the tiger run fast?"
          ],
          "nova_reply": "It can run up to sixty kilometers per hour in short bursts."
        },
        {
          "id": "field_a5",
          "label": "what / tiger eat?",
          "cue_prompt": "what / tiger eat?",
          "cue_word": "diet",
          "is_missing": true,
          "value": "Deer and wild boars",
          "acceptable_questions": [
            "What does the tiger eat?",
            "What is its main food?",
            "What animals does the tiger hunt?"
          ],
          "nova_reply": "The tiger hunts wild boars and large forest deer."
        }
      ]
    },
    "table_b": {
      "title": "Sophia's African Cheetah Card",
      "subtitle": "Candidate Answer Card",
      "person": "Sophia",
      "fields": [
        {
          "id": "field_b1",
          "label": "how heavy / cheetah?",
          "cue_prompt": "how heavy / cheetah?",
          "cue_word": "weight",
          "is_missing": false,
          "value": "Sixty kilograms",
          "nova_question": "How heavy is the adult cheetah?",
          "acceptable_answers": [
            "Sixty kilograms",
            "Sixty kilograms.",
            "It weighs sixty kilograms.",
            "About sixty kilograms."
          ]
        },
        {
          "id": "field_b2",
          "label": "what / on fur?",
          "cue_prompt": "what / on fur?",
          "cue_word": "spots",
          "is_missing": false,
          "value": "Small round black spots",
          "nova_question": "What pattern is on the cheetah's fur?",
          "acceptable_answers": [
            "Small round black spots",
            "Small round black spots.",
            "It has small round black spots.",
            "Black spots."
          ]
        },
        {
          "id": "field_b3",
          "label": "where / cheetah live?",
          "cue_prompt": "where / cheetah live?",
          "cue_word": "habitat",
          "is_missing": false,
          "value": "Open African grasslands",
          "nova_question": "Where does the cheetah live in the wild?",
          "acceptable_answers": [
            "Open African grasslands",
            "Open African grasslands.",
            "The cheetah lives in open African grasslands.",
            "African grasslands."
          ]
        },
        {
          "id": "field_b4",
          "label": "how fast / cheetah run?",
          "cue_prompt": "how fast / cheetah run?",
          "cue_word": "speed",
          "is_missing": false,
          "value": "One hundred ten kilometers per hour",
          "nova_question": "How fast can the cheetah run?",
          "acceptable_answers": [
            "One hundred ten kilometers per hour",
            "One hundred ten kilometers per hour.",
            "It can run up to one hundred ten kilometers per hour.",
            "110 km per hour."
          ]
        },
        {
          "id": "field_b5",
          "label": "what / cheetah eat?",
          "cue_prompt": "what / cheetah eat?",
          "cue_word": "prey",
          "is_missing": false,
          "value": "Small gazelles and hares",
          "nova_question": "What does the cheetah hunt and eat?",
          "acceptable_answers": [
            "Small gazelles and hares",
            "Small gazelles and hares.",
            "The cheetah eats small gazelles and hares.",
            "Gazelles and hares."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
