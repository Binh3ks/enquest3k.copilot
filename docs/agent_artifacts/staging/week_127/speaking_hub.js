/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 127 | Theme: "Global Climate Systems & Renewable Energy" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.311Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 127,
  "theme": "Global Climate Systems & Renewable Energy",
  "cefr_level": "B2 First",
  "talkshow_prompt": {
    "topic": "Overcoming Skepticism in the Renewable Energy Transition",
    "question": "Clara, how do you counter critics who argue that renewable energy cannot support heavy industrial grids?",
    "model_response": "I disagree with that assertion because real-world empirical data proves it completely false! Modern smart grids integrate diverse energy sources, combining offshore wind, solar photovoltaic, and battery storage systems. When one source fluctuates, storage and interconnected regional lines maintain flawless grid equilibrium. Transitioning to sustainable energy not only reduces greenhouse gas emissions, but also shields economies from volatile fossil fuel price shocks."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Clara's Offshore Wind Array",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Clara",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / wind array located?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where is the offshore wind array located?",
            "Where is the wind farm?",
            "Where are the turbines built?"
          ],
          "nova_reply": "The offshore wind array is located twenty kilometers off the North Sea coastline."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how many / turbines operational?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many wind turbines are operational?",
            "How many turbines are there?",
            "How many are generating power?"
          ],
          "nova_reply": "There are currently seventy-two giant wind turbines operating in the array."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what capacity / electricity generated?",
          "cue_word": "what capacity",
          "is_missing": true,
          "acceptable_questions": [
            "What capacity of electricity is generated?",
            "How much electricity does it generate?",
            "What is the total capacity?"
          ],
          "nova_reply": "The entire offshore array generates eight hundred megawatts of clean electricity at peak wind."
        },
        {
          "id": "field_a4",
          "cue_prompt": "why / undersea cables used?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are undersea high-voltage cables used?",
            "Why are undersea cables needed?",
            "Why are cables on the sea floor?"
          ],
          "nova_reply": "They transmit high-voltage power safely to the mainland grid with minimal electrical loss."
        },
        {
          "id": "field_a5",
          "cue_prompt": "who / manages daily maintenance?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who manages daily maintenance of the turbines?",
            "Who maintains the wind farm?",
            "Who inspects the turbines?"
          ],
          "nova_reply": "Certified marine technicians and automated drone inspection teams handle daily maintenance."
        }
      ]
    },
    "table_b": {
      "title": "Dr. Marcus Thorne's Solar Farm",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Marcus",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / solar facility situated?",
          "cue_word": "where",
          "value": "Across three hundred hectares in the sunny Mojave desert plateau.",
          "nova_question": "Where is Dr. Thorne's utility solar facility situated?",
          "acceptable_answers": [
            "Across three hundred hectares in the sunny Mojave desert plateau.",
            "In the Mojave desert plateau.",
            "In the sunny Mojave desert."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what technology / panels utilize?",
          "cue_word": "what technology",
          "value": "Bifacial monocrystalline photovoltaic panels mounted on dual-axis trackers.",
          "nova_question": "What specific technology do the solar panels utilize?",
          "acceptable_answers": [
            "Bifacial monocrystalline photovoltaic panels mounted on dual-axis trackers.",
            "Bifacial monocrystalline photovoltaic panels.",
            "Dual-axis solar trackers."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how much / carbon emissions prevented?",
          "cue_word": "how much",
          "value": "It prevents approximately four hundred thousand metric tons of carbon annually.",
          "nova_question": "How much carbon emissions does the solar farm prevent annually?",
          "acceptable_answers": [
            "It prevents approximately four hundred thousand metric tons of carbon annually.",
            "Four hundred thousand metric tons.",
            "400,000 metric tons annually."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "why / battery storage installed?",
          "cue_word": "why",
          "value": "To supply continuous electricity to cities for five hours after sunset.",
          "nova_question": "Why was large-scale battery storage installed at the site?",
          "acceptable_answers": [
            "To supply continuous electricity to cities for five hours after sunset.",
            "To supply electricity after sunset.",
            "For power after sunset."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "what year / facility commissioned?",
          "cue_word": "what year",
          "value": "The entire commercial facility was commissioned and connected in 2024.",
          "nova_question": "What year was the solar farm officially commissioned for the grid?",
          "acceptable_answers": [
            "The entire commercial facility was commissioned and connected in 2024.",
            "In 2024.",
            "Officially commissioned in 2024."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
