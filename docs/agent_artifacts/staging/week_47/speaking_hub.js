/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 47 | Theme: "Big Numbers (Place Value)" | CEFR: A2 Flyers
 */
export const speakingHubData = {
  "week": 47,
  "theme": "Big Numbers (Place Value)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Explain how place value charts help you read and write big numbers up to one hundred.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Village Census Officer",
      "cues": [
        "Village name",
        "Number of houses",
        "Cottages in north",
        "Farms in south",
        "Total population"
      ],
      "information": "Silver Hill Village has forty-five stone houses. There are twenty-one cottages in the north and thirty-four farms in the south. The total population is ninety-nine residents."
    },
    "card_b": {
      "role": "Star Observatory Guide",
      "cues": [
        "Observatory name",
        "Telescopes in use",
        "Constellations counted",
        "Stars logged tonight",
        "Visitor total"
      ],
      "information": "Sky Peak Observatory uses eight large telescopes. Astronomers logged seventy-eight stars in the southern sky and sixty-seven in the north. The visitor total tonight reached fifty-six students."
    },
    "table_a": {
      "title": "Village Census Officer's Info Card",
      "subtitle": "Candidate Card",
      "person": "Village Census Officer",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / village name?",
          "cue_prompt": "what / village name?",
          "cue_word": "name",
          "is_missing": true,
          "value": "Silver Hill Village",
          "acceptable_questions": [
            "What is the village name?",
            "Can you tell me the village name?",
            "What is the name of the village?"
          ],
          "nova_reply": "The village is called Silver Hill Village."
        },
        {
          "id": "field_a2",
          "label": "how many / stone houses?",
          "cue_prompt": "how many / stone houses?",
          "cue_word": "houses",
          "is_missing": true,
          "value": "Forty-five stone houses",
          "acceptable_questions": [
            "How many stone houses are there?",
            "How many houses does the village have?",
            "How many stone houses are in the village?"
          ],
          "nova_reply": "There are forty-five stone houses in the village."
        },
        {
          "id": "field_a3",
          "label": "how many / cottages in north?",
          "cue_prompt": "how many / cottages in north?",
          "cue_word": "cottages",
          "is_missing": true,
          "value": "Twenty-one cottages",
          "acceptable_questions": [
            "How many cottages are in the north?",
            "Are there cottages in the north?",
            "How many northern cottages are there?"
          ],
          "nova_reply": "There are twenty-one cottages located in the north."
        },
        {
          "id": "field_a4",
          "label": "how many / farms in south?",
          "cue_prompt": "how many / farms in south?",
          "cue_word": "farms",
          "is_missing": true,
          "value": "Thirty-four farms",
          "acceptable_questions": [
            "How many farms are in the south?",
            "Are there farms in the south?",
            "How many southern farms are there?"
          ],
          "nova_reply": "There are thirty-four farms situated in the south."
        },
        {
          "id": "field_a5",
          "label": "what / total population?",
          "cue_prompt": "what / total population?",
          "cue_word": "population",
          "is_missing": true,
          "value": "Ninety-nine residents",
          "acceptable_questions": [
            "What is the total population?",
            "How many residents live in the village?",
            "How many people live there?"
          ],
          "nova_reply": "The total population of Silver Hill Village is ninety-nine residents."
        }
      ]
    },
    "table_b": {
      "title": "Star Observatory Guide's Info Card",
      "subtitle": "Partner Card",
      "person": "Star Observatory Guide",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / observatory name?",
          "cue_prompt": "what / observatory name?",
          "cue_word": "name",
          "is_missing": false,
          "value": "Sky Peak Observatory",
          "nova_question": "What is the name of the star observatory?",
          "acceptable_answers": [
            "Sky Peak Observatory",
            "Sky Peak Observatory.",
            "It is Sky Peak Observatory.",
            "It is called Sky Peak Observatory."
          ]
        },
        {
          "id": "field_b2",
          "label": "how many / telescopes in use?",
          "cue_prompt": "how many / telescopes in use?",
          "cue_word": "telescopes",
          "is_missing": false,
          "value": "Eight large telescopes",
          "nova_question": "How many large telescopes are currently in use?",
          "acceptable_answers": [
            "Eight large telescopes",
            "Eight large telescopes.",
            "There are eight large telescopes in use.",
            "Eight telescopes."
          ]
        },
        {
          "id": "field_b3",
          "label": "which / constellations counted?",
          "cue_prompt": "which / constellations counted?",
          "cue_word": "constellations",
          "is_missing": false,
          "value": "Southern and northern constellations",
          "nova_question": "Which constellations were observed and counted tonight?",
          "acceptable_answers": [
            "Southern and northern constellations",
            "Southern and northern constellations.",
            "Astronomers counted southern and northern constellations."
          ]
        },
        {
          "id": "field_b4",
          "label": "how many / stars logged tonight?",
          "cue_prompt": "how many / stars logged tonight?",
          "cue_word": "stars",
          "is_missing": false,
          "value": "Seventy-eight southern stars and sixty-seven northern stars",
          "nova_question": "How many stars were logged in the night sky?",
          "acceptable_answers": [
            "Seventy-eight southern stars and sixty-seven northern stars",
            "Seventy-eight southern stars and sixty-seven northern stars.",
            "They logged seventy-eight southern and sixty-seven northern stars."
          ]
        },
        {
          "id": "field_b5",
          "label": "what / visitor total tonight?",
          "cue_prompt": "what / visitor total tonight?",
          "cue_word": "visitors",
          "is_missing": false,
          "value": "Fifty-six students",
          "nova_question": "What was the total number of student visitors tonight?",
          "acceptable_answers": [
            "Fifty-six students",
            "Fifty-six students.",
            "There were fifty-six student visitors.",
            "Fifty-six."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
