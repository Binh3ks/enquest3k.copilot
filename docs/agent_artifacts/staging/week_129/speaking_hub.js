/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 129 | Theme: "Architecture of the Future: Megacities & Sustainability" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.313Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 129,
  "theme": "Architecture of the Future: Megacities & Sustainability",
  "cefr_level": "B2 First",
  "talkshow_prompt": {
    "topic": "The Future of Megacities and Vertical Urbanism",
    "question": "Julian, will vertical skyscraper communities truly replace suburban sprawl by the year 2050?",
    "model_response": "By 2050, municipal planners will have constructed dozens of self-sustaining vertical communities, and millions of urban citizens will be living in integrated eco-towers! Suburban sprawl consumes valuable agricultural wilderness and generates extreme commute traffic. By integrating modular residential units, vertical hydroponic farms, and passive ventilation into single high-density structures, future megacities will achieve extraordinary ecological sustainability without sacrificing quality of life."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Julian's Vertical Forest Tower",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Julian",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / tower constructed?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the vertical tower constructed?",
            "Where is the tower located?",
            "Where was it built?"
          ],
          "nova_reply": "The vertical forest tower is constructed in the central bay district of Singapore."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how tall / structure reach?",
          "cue_word": "how tall",
          "is_missing": true,
          "acceptable_questions": [
            "How tall does the structure reach?",
            "What is the height of the tower?",
            "How tall is the building?"
          ],
          "nova_reply": "The timber-composite structure reaches a height of three hundred and twenty meters."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / trees on balconies?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many trees are planted on balconies?",
            "How many trees does it have?",
            "How many balcony trees are there?"
          ],
          "nova_reply": "Over two thousand native trees and shrubs are integrated into balcony planter boxes."
        },
        {
          "id": "field_a4",
          "cue_prompt": "why / passive ventilation used?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why is passive ventilation used in the atrium?",
            "Why is passive ventilation needed?",
            "Why did architects use passive airflow?"
          ],
          "nova_reply": "It reduces mechanical air conditioning power consumption by forty-five percent."
        },
        {
          "id": "field_a5",
          "cue_prompt": "what energy / powers building?",
          "cue_word": "what energy",
          "is_missing": true,
          "acceptable_questions": [
            "What energy powers the building?",
            "What power source does it use?",
            "What energy runs the building?"
          ],
          "nova_reply": "Rooftop photovoltaic solar shingles and geothermal basement heat pumps supply one hundred percent of its power."
        }
      ]
    },
    "table_b": {
      "title": "Maya Chen's Eco-District Transit Hub",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Maya",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / transit hub situated?",
          "cue_word": "where",
          "value": "At the intersection of three major pedestrian promenades in downtown Seoul.",
          "nova_question": "Where is Maya's eco-district transit hub situated?",
          "acceptable_answers": [
            "At the intersection of three major pedestrian promenades in downtown Seoul.",
            "In downtown Seoul.",
            "At three pedestrian promenades in Seoul."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what transit / operates from hub?",
          "cue_word": "what transit",
          "value": "Autonomous electric shuttles and underground magnetic levitation trains.",
          "nova_question": "What public transit modalities operate from the central terminal?",
          "acceptable_answers": [
            "Autonomous electric shuttles and underground magnetic levitation trains.",
            "Electric shuttles and magnetic levitation trains.",
            "Autonomous shuttles and maglev trains."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how many / passengers commute daily?",
          "cue_word": "how many",
          "value": "Over one hundred and fifty thousand commuters pass through the hub daily.",
          "nova_question": "How many passengers commute through the terminal on an average weekday?",
          "acceptable_answers": [
            "Over one hundred and fifty thousand commuters pass through the hub daily.",
            "Over 150,000 commuters daily.",
            "One hundred and fifty thousand passengers."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "why / cars prohibited in district?",
          "cue_word": "why",
          "value": "To eliminate toxic tailpipe smog and guarantee complete pedestrian safety.",
          "nova_question": "Why are private fossil-fuel automobiles strictly prohibited in the zone?",
          "acceptable_answers": [
            "To eliminate toxic tailpipe smog and guarantee complete pedestrian safety.",
            "To eliminate smog and ensure pedestrian safety.",
            "For pedestrian safety and zero smog."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "what material / canopy made of?",
          "cue_word": "what material",
          "value": "A translucent recycled polymer composite that filters natural sunlight.",
          "nova_question": "What sustainable material was used to build the sweeping roof canopy?",
          "acceptable_answers": [
            "A translucent recycled polymer composite that filters natural sunlight.",
            "Translucent recycled polymer composite.",
            "Recycled polymer composite."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
