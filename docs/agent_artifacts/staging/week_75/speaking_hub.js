/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 75 | Theme: "History/ELA: Ancient Egypt / Math: Timelines" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.699Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 75,
  "theme": "History/ELA: Ancient Egypt / Math: Timelines",
  "cefr_level": "B1 Preliminary",
  "talkshow_prompt": {
    "topic": "Past Habits in Ancient Egypt",
    "question": "Professor Tariq, how do 'used to' and 'would' help historians bring ancient Egypt to life?",
    "model_response": "Historians use 'used to' and 'would' to describe everyday customs and past routines that no longer occur! For instance, Egyptian farmers used to harvest wheat on the Nile's fertile floodplains, and stonemasons would drag heavy limestone blocks across desert sledges. Scribes used to document temple rituals on papyrus scrolls. These grammatical structures enable us to picture historical civilization with clarity!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Sophia's Giza Pyramid Expedition",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Sophia",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / conduct pyramid study?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does Sophia conduct her pyramid study?",
            "Where is the study conducted?",
            "Where does she study pyramids?"
          ],
          "nova_reply": "Sophia conducts her research at the Giza Pyramid Plateau near Cairo."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how tall / Great Pyramid when built?",
          "cue_word": "how tall",
          "is_missing": true,
          "acceptable_questions": [
            "How tall was the Great Pyramid when built?",
            "How high was the pyramid?",
            "What was the original height?"
          ],
          "nova_reply": "The Great Pyramid originally stood one hundred and forty-six meters tall."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what / stone used for outer casing?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What stone was used for the outer casing?",
            "What stone did they use?",
            "What was the casing made of?"
          ],
          "nova_reply": "Builders used polished white Tura limestone for the outer casing."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / supervised the royal architects?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who supervised the royal architects?",
            "Who was in charge of building?",
            "Who directed the architects?"
          ],
          "nova_reply": "Hemiunu, the royal vizier, supervised the master architects."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / build pyramids so high?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why did they build pyramids so high?",
            "Why were pyramids so tall?",
            "Why build such high monuments?"
          ],
          "nova_reply": "To guide the pharaoh's soul directly toward the eternal northern stars."
        }
      ]
    },
    "table_b": {
      "title": "Professor Tariq's Papyrus Translation Project",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Professor Tariq",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / translate ancient scrolls?",
          "cue_word": "where",
          "value": "Inside the manuscript laboratory at the Grand Egyptian Museum.",
          "nova_question": "Where does Professor Tariq translate the ancient scrolls?",
          "acceptable_answers": [
            "Inside the manuscript laboratory at the Grand Egyptian Museum.",
            "At the Grand Egyptian Museum.",
            "In the manuscript laboratory."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / language written on the papyrus?",
          "cue_word": "what",
          "value": "Hieroglyphic and hieratic script from the New Kingdom.",
          "nova_question": "What language and script is written on the papyrus?",
          "acceptable_answers": [
            "Hieroglyphic and hieratic script from the New Kingdom.",
            "Hieroglyphic script.",
            "New Kingdom hieroglyphs."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / preserve brittle papyrus sheets?",
          "cue_word": "how",
          "value": "By keeping them inside climate-controlled glass frames.",
          "nova_question": "How does the conservation team preserve brittle papyrus sheets?",
          "acceptable_answers": [
            "By keeping them inside climate-controlled glass frames.",
            "In climate-controlled glass frames.",
            "With climate control and glass frames."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / discovered the royal scroll hoard?",
          "cue_word": "who",
          "value": "French and Egyptian archaeologists during the Luxor excavation.",
          "nova_question": "Who discovered the hidden hoard of royal papyrus scrolls?",
          "acceptable_answers": [
            "French and Egyptian archaeologists during the Luxor excavation.",
            "Archaeologists during the Luxor excavation.",
            "French and Egyptian archaeologists."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / document historical rituals?",
          "cue_word": "why",
          "value": "To decode how ancient priests conducted sacred temple ceremonies.",
          "nova_question": "Why is translating these temple records so valuable?",
          "acceptable_answers": [
            "To decode how ancient priests conducted sacred temple ceremonies.",
            "To understand sacred ceremonies.",
            "To decode ancient temple ceremonies."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
