/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 47 | Theme: "Big Numbers (Place Value)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
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
          "id": "f1",
          "label": "Village name",
          "cue_prompt": "what / village name?",
          "cue_word": "village",
          "is_missing": true,
          "acceptable_questions": [
            "What is the village name?",
            "Can you tell me the village name?"
          ],
          "nova_reply": "The village name is recorded for Big Numbers (Place Value)."
        },
        {
          "id": "f2",
          "label": "Number of houses",
          "cue_prompt": "what / number of houses?",
          "cue_word": "number",
          "is_missing": true,
          "acceptable_questions": [
            "What is the number of houses?",
            "Can you tell me the number of houses?"
          ],
          "nova_reply": "The number of houses is recorded for Big Numbers (Place Value)."
        },
        {
          "id": "f3",
          "label": "Cottages in north",
          "cue_prompt": "what / cottages in north?",
          "cue_word": "cottages",
          "is_missing": false,
          "card_value": "Cottages in north verified",
          "value": "Cottages in north verified",
          "examiner_question": "What is the cottages in north?",
          "acceptable_answers": [
            "It is cottages in north.",
            "Cottages in north."
          ]
        },
        {
          "id": "f4",
          "label": "Farms in south",
          "cue_prompt": "what / farms in south?",
          "cue_word": "farms",
          "is_missing": false,
          "card_value": "Farms in south verified",
          "value": "Farms in south verified",
          "examiner_question": "What is the farms in south?",
          "acceptable_answers": [
            "It is farms in south.",
            "Farms in south."
          ]
        },
        {
          "id": "f5",
          "label": "Total population",
          "cue_prompt": "what / total population?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total population verified",
          "value": "Total population verified",
          "examiner_question": "What is the total population?",
          "acceptable_answers": [
            "It is total population.",
            "Total population."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Star Observatory Guide's Info Card",
      "subtitle": "Partner Card",
      "person": "Star Observatory Guide",
      "fields": [
        {
          "id": "fb1",
          "label": "Observatory name",
          "cue_prompt": "what / observatory name?",
          "cue_word": "observatory",
          "is_missing": false,
          "card_value": "Observatory name on file",
          "value": "Observatory name on file",
          "examiner_question": "What is the observatory name?",
          "acceptable_answers": [
            "It is observatory name.",
            "Observatory name."
          ]
        },
        {
          "id": "fb2",
          "label": "Telescopes in use",
          "cue_prompt": "what / telescopes in use?",
          "cue_word": "telescopes",
          "is_missing": false,
          "card_value": "Telescopes in use on file",
          "value": "Telescopes in use on file",
          "examiner_question": "What is the telescopes in use?",
          "acceptable_answers": [
            "It is telescopes in use.",
            "Telescopes in use."
          ]
        },
        {
          "id": "fb3",
          "label": "Constellations counted",
          "cue_prompt": "what / constellations counted?",
          "cue_word": "constellations",
          "is_missing": true,
          "acceptable_questions": [
            "What is the constellations counted?",
            "Can you tell me the constellations counted?"
          ],
          "nova_reply": "The constellations counted is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Stars logged tonight",
          "cue_prompt": "what / stars logged tonight?",
          "cue_word": "stars",
          "is_missing": true,
          "acceptable_questions": [
            "What is the stars logged tonight?",
            "Can you tell me the stars logged tonight?"
          ],
          "nova_reply": "The stars logged tonight is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Visitor total",
          "cue_prompt": "what / visitor total?",
          "cue_word": "visitor",
          "is_missing": true,
          "acceptable_questions": [
            "What is the visitor total?",
            "Can you tell me the visitor total?"
          ],
          "nova_reply": "The visitor total is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
