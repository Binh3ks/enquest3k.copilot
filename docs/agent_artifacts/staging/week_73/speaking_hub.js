/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 73 | Theme: "Science/ELA: The Water Cycle (Advanced) / Math: Volume" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.694Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 73,
  "theme": "Science/ELA: The Water Cycle (Advanced) / Math: Volume",
  "cefr_level": "B1 Preliminary",
  "talkshow_prompt": {
    "topic": "The Importance of the Global Water Cycle",
    "question": "Dr. Aris, how do advanced sequence connectors help us explain the continuous movement of water?",
    "model_response": "Sequence connectors like 'subsequently' and 'eventually' allow scientists to explain each transition clearly! First, solar energy drives evaporation over lakes. Subsequently, cooling temperatures in the upper atmosphere trigger condensation. Following this stage, precipitation replenishes rivers and groundwater reserves. Without these connected steps, freshwater could not circulate to sustain life on Earth!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Maya's Mountain Stream Project",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Maya",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / measure water volume?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does Maya measure the water volume?",
            "Where is the water measured?",
            "Where does she test the stream?"
          ],
          "nova_reply": "Maya measures water volume at the Jade Creek gauging station."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how much / rainfall recorded yesterday?",
          "cue_word": "how much",
          "is_missing": true,
          "acceptable_questions": [
            "How much rainfall was recorded yesterday?",
            "How much rain fell yesterday?",
            "What was yesterday's rainfall measurement?"
          ],
          "nova_reply": "The rain gauge recorded forty-five millimeters of precipitation yesterday."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what / instruments used for testing?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What instruments are used for testing?",
            "What tools does she use?",
            "What equipment does Maya use?"
          ],
          "nova_reply": "She uses digital flow meters, water cylinders, and temperature sensors."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / manages the valley reservoir?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who manages the valley reservoir?",
            "Who is in charge of the reservoir?",
            "Who supervises the dam?"
          ],
          "nova_reply": "Chief Hydrologist Dr. Aris manages the valley reservoir gates."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / monitoring groundwater important?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why is monitoring groundwater important?",
            "Why do they check groundwater?",
            "Why monitor underground water?"
          ],
          "nova_reply": "Because local farms rely on groundwater during dry summer periods."
        }
      ]
    },
    "table_b": {
      "title": "Dr. Aris's Cloud Observation Lab",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Dr. Aris",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / cloud observation tower?",
          "cue_word": "where",
          "value": "On the highest granite ridge of Mount Jade.",
          "nova_question": "Where is Dr. Aris's cloud observation tower located?",
          "acceptable_answers": [
            "On the highest granite ridge of Mount Jade.",
            "On Mount Jade.",
            "On the highest granite ridge."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / type of clouds observed?",
          "cue_word": "what",
          "value": "Dense rain clouds carrying mountain precipitation.",
          "nova_question": "What type of clouds does the radar monitor today?",
          "acceptable_answers": [
            "Dense rain clouds carrying mountain precipitation.",
            "Dense rain clouds.",
            "Rain clouds carrying precipitation."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / measure atmospheric moisture?",
          "cue_word": "how",
          "value": "By launching automated weather balloons with humidity sensors.",
          "nova_question": "How does the research team measure atmospheric moisture?",
          "acceptable_answers": [
            "By launching automated weather balloons with humidity sensors.",
            "With weather balloons.",
            "Using humidity sensors on balloons."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / analyzes the daily data?",
          "cue_word": "who",
          "value": "A dedicated team of university climate researchers.",
          "nova_question": "Who analyzes the daily water cycle measurements?",
          "acceptable_answers": [
            "A dedicated team of university climate researchers.",
            "University climate researchers.",
            "Climate researchers."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / study evaporation rates?",
          "cue_word": "why",
          "value": "To predict reservoir water storage for the coming summer.",
          "nova_question": "Why do scientists study regional evaporation rates?",
          "acceptable_answers": [
            "To predict reservoir water storage for the coming summer.",
            "To predict reservoir storage.",
            "To plan water storage for summer."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
