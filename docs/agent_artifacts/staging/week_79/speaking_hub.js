/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 79 | Theme: "Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.703Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 79,
  "theme": "Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate",
  "cefr_level": "B1 Preliminary",
  "talkshow_prompt": {
    "topic": "Defending Environmental Priorities in Micro-Debates",
    "question": "Nora, why is the 'Yes, but...' rebuttal structure so effective in competitive science debates?",
    "model_response": "The 'Yes, but...' structure is effective because it demonstrates that you listened to your opponent's perspective before presenting a stronger counter-argument! You show intellectual respect by conceding: 'Yes, satellite sensors developed for space provide vital climate data.' Then you deliver the compelling rebuttal: 'But investing billions in planting trees and expanding renewable energy is far more urgent for saving Earth right now!'"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Kevin's Space Research Mission",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Kevin",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / satellite control station located?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where is the satellite control station located?",
            "Where is the control station?",
            "Where does Kevin monitor satellites?"
          ],
          "nova_reply": "The orbital telemetry center is located in Houston, Texas."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / primary satellite mission?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is the primary satellite mission?",
            "What do the satellites do?",
            "What is their main purpose?"
          ],
          "nova_reply": "The satellites monitor global greenhouse emissions and ocean heat levels."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how much / annual space program budget?",
          "cue_word": "how much",
          "is_missing": true,
          "acceptable_questions": [
            "How much is the annual space program budget?",
            "What is the budget?",
            "How much money is allocated?"
          ],
          "nova_reply": "Congress allocated twenty-four billion dollars to the federal space program."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / leads the climate satellite division?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who leads the climate satellite division?",
            "Who is the division director?",
            "Who supervises the project?"
          ],
          "nova_reply": "Dr. Evelyn Vance leads the Earth observation satellite team."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / orbital telescopes valuable?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are orbital telescopes valuable?",
            "Why do we need space telescopes?",
            "Why fund orbital telescopes?"
          ],
          "nova_reply": "Because they capture infrared radiation without atmospheric distortion."
        }
      ]
    },
    "table_b": {
      "title": "Nora's Rainforest Reforestation Campaign",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Nora",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / ecological restoration reserve?",
          "cue_word": "where",
          "value": "Across the Atlantic Forest coastal belt in Brazil.",
          "nova_question": "Where is Nora's reforestation reserve located?",
          "acceptable_answers": [
            "Across the Atlantic Forest coastal belt in Brazil.",
            "In Brazil.",
            "The Atlantic Forest in Brazil."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / species of trees planted?",
          "cue_word": "what",
          "value": "Thirty native broadleaf species to maximize biodiversity.",
          "nova_question": "What species of trees are planted in the nursery?",
          "acceptable_answers": [
            "Thirty native broadleaf species to maximize biodiversity.",
            "Thirty native broadleaf species.",
            "Native broadleaf species."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / measure annual carbon capture?",
          "cue_word": "how",
          "value": "By analyzing soil core samples and trunk growth diameters.",
          "nova_question": "How does the research team measure annual carbon capture?",
          "acceptable_answers": [
            "By analyzing soil core samples and trunk growth diameters.",
            "Through soil cores and tree trunk measurements.",
            "Using soil samples and trunk diameters."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / funds the forest restoration project?",
          "cue_word": "who",
          "value": "An international coalition of green climate foundations.",
          "nova_question": "Who funds the coastal reforestation campaign?",
          "acceptable_answers": [
            "An international coalition of green climate foundations.",
            "Green climate foundations.",
            "International climate foundations."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / restore mangrove wetlands first?",
          "cue_word": "why",
          "value": "To shield coastal communities from severe storm surges.",
          "nova_question": "Why does the campaign prioritize restoring mangrove wetlands?",
          "acceptable_answers": [
            "To shield coastal communities from severe storm surges.",
            "To protect coastal communities from storms.",
            "To shield against storm surges."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
