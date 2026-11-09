/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 131 | Theme: "Genetics & Biotechnology: Modern Agriculture" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.316Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 131,
  "theme": "Genetics & Biotechnology: Modern Agriculture",
  "cefr_level": "B2 First",
  "talkshow_prompt": {
    "topic": "Biotechnology and Global Food Security",
    "question": "Dr. Thorne, how can precision genetic modification safeguard agriculture against catastrophic climate shifts?",
    "model_response": "Precision biotechnology allows agronomists to introduce proven environmental resilience traits into staple crops in a fraction of the time required by classical breeding. Crops, which we engineer with enhanced root depth and cuticle wax, maintain steady grain yields during severe droughts. By providing smallholder farmers with open-source, non-patented resilient seeds, we strengthen regional food security and prevent climate-induced crop failures."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Dr. Aris Thorne's Drought Rice Project",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Aris",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / rice trial conducted?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the rice trial conducted?",
            "Where did the field trial take place?",
            "Where was the trial grown?"
          ],
          "nova_reply": "The rice field trial was conducted in the irrigated delta experimental station in Vietnam."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how much / water saved?",
          "cue_word": "how much",
          "is_missing": true,
          "acceptable_questions": [
            "How much water was saved during the trial?",
            "How much water did it conserve?",
            "How much water was reduced?"
          ],
          "nova_reply": "The drought-adapted rice variety required thirty-eight percent less irrigation water than standard crops."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what gene / source used?",
          "cue_word": "what gene",
          "is_missing": true,
          "acceptable_questions": [
            "What gene source was used?",
            "Which wild plant provided the gene?",
            "What was the genetic source?"
          ],
          "nova_reply": "The drought-tolerance trait was identified in a wild perennial African grass species."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / tested grain quality?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who tested the harvested grain quality?",
            "Who analyzed the grain?",
            "Who checked the grain quality?"
          ],
          "nova_reply": "An independent university nutrition laboratory verified that protein and carbohydrate levels matched premium grain."
        },
        {
          "id": "field_a5",
          "cue_prompt": "when / commercial distribution begin?",
          "cue_word": "when",
          "is_missing": true,
          "acceptable_questions": [
            "When will commercial distribution begin?",
            "When can farmers buy the seeds?",
            "When does distribution start?"
          ],
          "nova_reply": "Certified open-source seed packages will be released to farming cooperatives next spring."
        }
      ]
    },
    "table_b": {
      "title": "Naomi Ward's Saline Wheat Strain",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Naomi",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / wheat cultivated?",
          "cue_word": "where",
          "value": "Across salt-affected coastal river flats in the Indus Valley.",
          "nova_question": "Where is Naomi's salinity-tolerant wheat currently cultivated?",
          "acceptable_answers": [
            "Across salt-affected coastal river flats in the Indus Valley.",
            "In the Indus Valley.",
            "Across coastal river flats in the Indus Valley."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what salinity / crop withstands?",
          "cue_word": "what salinity",
          "value": "It germinates in soil salinity levels up to twelve deciSiemens per meter.",
          "nova_question": "What level of soil salinity can the wheat variety withstand?",
          "acceptable_answers": [
            "It germinates in soil salinity levels up to twelve deciSiemens per meter.",
            "Up to twelve deciSiemens per meter.",
            "12 deciSiemens per meter."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "why / farmers adopt strain?",
          "cue_word": "why",
          "value": "Because sea level rise and tidal floods have salinized traditional freshwater paddies.",
          "nova_question": "Why are local farmers eager to adopt this particular wheat strain?",
          "acceptable_answers": [
            "Because sea level rise and tidal floods have salinized traditional freshwater paddies.",
            "Sea level rise has salinized paddies.",
            "Because tides salinized traditional freshwater paddies."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "how much / grain yield increased?",
          "cue_word": "how much",
          "value": "Grain yield increased by forty-two percent compared to unedited local seeds.",
          "nova_question": "By how much did harvest yield increase in saline trial plots?",
          "acceptable_answers": [
            "Grain yield increased by forty-two percent compared to unedited local seeds.",
            "By forty-two percent.",
            "42 percent increase."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "what price / seeds sold for?",
          "cue_word": "what price",
          "value": "Distributed free of royalty charges through an open-source humanitarian treaty.",
          "nova_question": "What price are cooperative farmers charged for the patented seed technology?",
          "acceptable_answers": [
            "Distributed free of royalty charges through an open-source humanitarian treaty.",
            "Free of royalty charges.",
            "Free through a humanitarian treaty."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
