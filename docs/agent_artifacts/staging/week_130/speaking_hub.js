/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 130 | Theme: "Deep Ocean Exploration & Abyssal Organisms" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.315Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 130,
  "theme": "Deep Ocean Exploration & Abyssal Organisms",
  "cefr_level": "B2 First",
  "talkshow_prompt": {
    "topic": "Deep Sea Oceanography and Benthic Conservation",
    "question": "Dr. Brooks, why should the international community enact strict moratoriums against deep-sea seabed mining?",
    "model_response": "Under no circumstances should industrial mining be permitted in vulnerable benthic ecosystems! Never before have scientists encountered organisms with such delicate cellular adaptations to extreme hydrostatic pressure. Abyssal trenches develop at geologic time scales; organisms take centuries to reach maturity. If commercial robotic dredgers crush these hydrothermal vent communities, entire evolutionary branches will be extinguished before oceanographers have even cataloged their biochemistry."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Dr. Sylvia Brooks's Submersible Dive",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Sylvia",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / dive conducted?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the deep dive conducted?",
            "Where did the submersible dive?",
            "Where was the expedition?"
          ],
          "nova_reply": "The dive was conducted inside the Horizon Deep sector of the Tonga Trench in the South Pacific."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what depth / submersible reached?",
          "cue_word": "what depth",
          "is_missing": true,
          "acceptable_questions": [
            "What depth did the submersible reach?",
            "How deep did it go?",
            "What was the maximum depth reached?"
          ],
          "nova_reply": "The submersible reached a verified depth of ten thousand eight hundred and twenty meters."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / new species discovered?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many new species were discovered?",
            "How many species did they find?",
            "How many new organisms were cataloged?"
          ],
          "nova_reply": "The team cataloged fourteen previously unknown benthic marine species during the expedition."
        },
        {
          "id": "field_a4",
          "cue_prompt": "why / hull made of titanium?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why is the hull made of titanium?",
            "Why was titanium chosen?",
            "Why is titanium needed for the hull?"
          ],
          "nova_reply": "Titanium possesses the high compressive strength required to withstand crushing hydrostatic pressure."
        },
        {
          "id": "field_a5",
          "cue_prompt": "how long / dive lasted?",
          "cue_word": "how long",
          "is_missing": true,
          "acceptable_questions": [
            "How long did the dive last?",
            "What was the duration of the dive?",
            "How many hours did it take?"
          ],
          "nova_reply": "The complete round-trip descent, bottom exploration, and ascent lasted twelve continuous hours."
        }
      ]
    },
    "table_b": {
      "title": "Liam Ross's Hydrothermal Vent Survey",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Liam",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / vents situated?",
          "cue_word": "where",
          "value": "Along a volcanic spreading ridge on the East Pacific Rise.",
          "nova_question": "Where are Liam's studied hydrothermal vents situated?",
          "acceptable_answers": [
            "Along a volcanic spreading ridge on the East Pacific Rise.",
            "On the East Pacific Rise.",
            "Along a volcanic spreading ridge."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what temperature / fluid spews?",
          "cue_word": "what temperature",
          "value": "Superheated mineral fluid erupts at three hundred and sixty degrees Celsius.",
          "nova_question": "What temperature is the hydrothermal fluid spewing from the chimneys?",
          "acceptable_answers": [
            "Superheated mineral fluid erupts at three hundred and sixty degrees Celsius.",
            "Three hundred and sixty degrees Celsius.",
            "360 degrees Celsius."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "why / organisms not boil?",
          "cue_word": "why",
          "value": "They colonize the boundary where superheated vent fluid mixes with cold seawater.",
          "nova_question": "Why do tubeworms and crustaceans not boil near the vent chimneys?",
          "acceptable_answers": [
            "They colonize the boundary where superheated vent fluid mixes with cold seawater.",
            "Because fluid mixes with cold seawater.",
            "They live where water mixes with cold seawater."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "what gas / bacteria consume?",
          "cue_word": "what gas",
          "value": "Chemosynthetic bacteria metabolize dissolved hydrogen sulfide gas.",
          "nova_question": "What toxic gas do the chemosynthetic bacteria consume for energy?",
          "acceptable_answers": [
            "Chemosynthetic bacteria metabolize dissolved hydrogen sulfide gas.",
            "Dissolved hydrogen sulfide gas.",
            "Hydrogen sulfide gas."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "how many / cameras mounted on probe?",
          "cue_word": "how many",
          "value": "Six ultra-high-definition low-light cameras recorded video continuously.",
          "nova_question": "How many specialized video cameras were mounted on the seafloor probe?",
          "acceptable_answers": [
            "Six ultra-high-definition low-light cameras recorded video continuously.",
            "Six ultra-high-definition cameras.",
            "Six cameras."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
