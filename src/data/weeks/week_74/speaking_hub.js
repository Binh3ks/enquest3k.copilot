/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 74 | Theme: "Science/ELA: Food Chains / Math: Complex Charts" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.697Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 74,
  "theme": "Science/ELA: Food Chains / Math: Complex Charts",
  "cefr_level": "B1 Preliminary",
  "talkshow_prompt": {
    "topic": "Ecosystem Stability and the Zero Conditional",
    "question": "Ranger Chloe, why is the zero conditional grammar structure ideal for explaining food webs?",
    "model_response": "The zero conditional expresses universal scientific facts that always occur under specific conditions! For example: if plants capture sunlight, they produce glucose; when herbivores eat plants, energy moves to the next trophic level. If an apex predator vanishes, herbivore numbers rapidly explode and destroy the habitat. It clearly shows direct cause and effect in living systems!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Leo's Forest Food Web Study",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Leo",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / conduct food web survey?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does Leo conduct his food web survey?",
            "Where is the survey conducted?",
            "Where does he study the forest?"
          ],
          "nova_reply": "Leo conducts his survey across the Oak Ridge Nature Reserve."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / primary producer in the study?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is the primary producer in the study?",
            "What producer does he study?",
            "What plant acts as producer?"
          ],
          "nova_reply": "Ancient white oak trees and forest clover act as primary producers."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / trophic levels recorded?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many trophic levels are recorded?",
            "How many levels did he record?",
            "What is the number of trophic levels?"
          ],
          "nova_reply": "He recorded four distinct trophic levels from producers to apex predators."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / helps identify soil decomposers?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who helps identify the soil decomposers?",
            "Who helps Leo?",
            "Who identifies fungi and worms?"
          ],
          "nova_reply": "Ranger Chloe helps identify earthworms and woodland fungi."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / predator populations essential?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are predator populations essential?",
            "Why do we need predators?",
            "Why are hawks important?"
          ],
          "nova_reply": "Because predators prevent herbivores from overconsuming plant foliage."
        }
      ]
    },
    "table_b": {
      "title": "Ranger Chloe's Wetland Energy Project",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Ranger Chloe",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / wetland research pond?",
          "cue_word": "where",
          "value": "At the southern boundary of Willow Creek Marsh.",
          "nova_question": "Where is Ranger Chloe's wetland research site located?",
          "acceptable_answers": [
            "At the southern boundary of Willow Creek Marsh.",
            "At Willow Creek Marsh.",
            "Southern boundary of the marsh."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / apex predator in the marsh?",
          "cue_word": "what",
          "value": "The great blue heron hunting fish and frogs.",
          "nova_question": "What animal serves as the apex predator in the marsh?",
          "acceptable_answers": [
            "The great blue heron hunting fish and frogs.",
            "The great blue heron.",
            "A blue heron."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / measure aquatic plant biomass?",
          "cue_word": "how",
          "value": "By weighing dried sample quadrants of pond lily leaves.",
          "nova_question": "How does the research team measure aquatic plant biomass?",
          "acceptable_answers": [
            "By weighing dried sample quadrants of pond lily leaves.",
            "By weighing dried plant samples.",
            "Using sample quadrants of leaves."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / monitors water quality weekly?",
          "cue_word": "who",
          "value": "Student volunteers from the environmental science academy.",
          "nova_question": "Who monitors water quality and nutrient levels weekly?",
          "acceptable_answers": [
            "Student volunteers from the environmental science academy.",
            "Student volunteers.",
            "Environmental science students."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / decomposers crucial for ponds?",
          "cue_word": "why",
          "value": "To prevent decaying plant matter from choking fish oxygen.",
          "nova_question": "Why are aquatic decomposers crucial for wetland ponds?",
          "acceptable_answers": [
            "To prevent decaying plant matter from choking fish oxygen.",
            "To maintain fish oxygen.",
            "So decaying plants do not choke oxygen."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
