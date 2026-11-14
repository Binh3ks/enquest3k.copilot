/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 72 | Theme: "Photosynthesis: Plant Energy Factory" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 72,
  "theme": "Photosynthesis: Plant Energy Factory",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Explain the multi-step process of photosynthesis to a younger student. Use sequence words like 'first', 'next', and 'finally', and mention why plants need sunlight.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Botanist A",
      "cues": [
        "Biological process explained",
        "Primary green pigment",
        "Greenhouse length and width",
        "Calculated greenhouse area",
        "Boundary perimeter fence"
      ]
    },
    "card_b": {
      "role": "Botanist B",
      "cues": [
        "Biological process explained",
        "Primary green pigment",
        "Greenhouse length and width",
        "Calculated greenhouse area",
        "Boundary perimeter fence"
      ]
    },
    "table_a": {
      "title": "Botanist A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Botanist A",
      "fields": [
        {
          "id": "f1",
          "label": "Biological process explained",
          "cue_prompt": "what / biological process explained?",
          "cue_word": "biological",
          "is_missing": true,
          "acceptable_questions": [
            "What is the biological process explained?",
            "Can you tell me the biological process explained?"
          ],
          "nova_reply": "The biological process explained is recorded for Photosynthesis: Plant Energy Factory."
        },
        {
          "id": "f2",
          "label": "Primary green pigment",
          "cue_prompt": "what / primary green pigment?",
          "cue_word": "primary",
          "is_missing": true,
          "acceptable_questions": [
            "What is the primary green pigment?",
            "Can you tell me the primary green pigment?"
          ],
          "nova_reply": "The primary green pigment is recorded for Photosynthesis: Plant Energy Factory."
        },
        {
          "id": "f3",
          "label": "Greenhouse length and width",
          "cue_prompt": "what / greenhouse length and width?",
          "cue_word": "greenhouse",
          "is_missing": false,
          "card_value": "Greenhouse length and width verified",
          "value": "Greenhouse length and width verified",
          "examiner_question": "What is the greenhouse length and width?",
          "acceptable_answers": [
            "It is greenhouse length and width.",
            "Greenhouse length and width."
          ]
        },
        {
          "id": "f4",
          "label": "Calculated greenhouse area",
          "cue_prompt": "what / calculated greenhouse area?",
          "cue_word": "calculated",
          "is_missing": false,
          "card_value": "Calculated greenhouse area verified",
          "value": "Calculated greenhouse area verified",
          "examiner_question": "What is the calculated greenhouse area?",
          "acceptable_answers": [
            "It is calculated greenhouse area.",
            "Calculated greenhouse area."
          ]
        },
        {
          "id": "f5",
          "label": "Boundary perimeter fence",
          "cue_prompt": "what / boundary perimeter fence?",
          "cue_word": "boundary",
          "is_missing": false,
          "card_value": "Boundary perimeter fence verified",
          "value": "Boundary perimeter fence verified",
          "examiner_question": "What is the boundary perimeter fence?",
          "acceptable_answers": [
            "It is boundary perimeter fence.",
            "Boundary perimeter fence."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Botanist B's Info Card",
      "subtitle": "Partner Card",
      "person": "Botanist B",
      "fields": [
        {
          "id": "fb1",
          "label": "Biological process explained",
          "cue_prompt": "what / biological process explained?",
          "cue_word": "biological",
          "is_missing": false,
          "card_value": "Biological process explained on file",
          "value": "Biological process explained on file",
          "examiner_question": "What is the biological process explained?",
          "acceptable_answers": [
            "It is biological process explained.",
            "Biological process explained."
          ]
        },
        {
          "id": "fb2",
          "label": "Primary green pigment",
          "cue_prompt": "what / primary green pigment?",
          "cue_word": "primary",
          "is_missing": false,
          "card_value": "Primary green pigment on file",
          "value": "Primary green pigment on file",
          "examiner_question": "What is the primary green pigment?",
          "acceptable_answers": [
            "It is primary green pigment.",
            "Primary green pigment."
          ]
        },
        {
          "id": "fb3",
          "label": "Greenhouse length and width",
          "cue_prompt": "what / greenhouse length and width?",
          "cue_word": "greenhouse",
          "is_missing": true,
          "acceptable_questions": [
            "What is the greenhouse length and width?",
            "Can you tell me the greenhouse length and width?"
          ],
          "nova_reply": "The greenhouse length and width is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Calculated greenhouse area",
          "cue_prompt": "what / calculated greenhouse area?",
          "cue_word": "calculated",
          "is_missing": true,
          "acceptable_questions": [
            "What is the calculated greenhouse area?",
            "Can you tell me the calculated greenhouse area?"
          ],
          "nova_reply": "The calculated greenhouse area is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Boundary perimeter fence",
          "cue_prompt": "what / boundary perimeter fence?",
          "cue_word": "boundary",
          "is_missing": true,
          "acceptable_questions": [
            "What is the boundary perimeter fence?",
            "Can you tell me the boundary perimeter fence?"
          ],
          "nova_reply": "The boundary perimeter fence is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
