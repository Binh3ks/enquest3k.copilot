/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 62 | Theme: "The Movie Trailer: Summarizing Stories" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 62,
  "theme": "The Movie Trailer: Summarizing Stories",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute movie trailer voiceover for your favorite book or film. Paraphrase the plot in three punchy sentences.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Producer A",
      "cues": [
        "Film title and genre",
        "Three-sentence summary",
        "Friday ticket count",
        "Friday count rounded to 10",
        "Audience feedback"
      ]
    },
    "card_b": {
      "role": "Producer B",
      "cues": [
        "Film title and genre",
        "Three-sentence summary",
        "Friday ticket count",
        "Friday count rounded to 10",
        "Audience feedback"
      ]
    },
    "table_a": {
      "title": "Producer A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Producer A",
      "fields": [
        {
          "id": "f1",
          "label": "Film title and genre",
          "cue_prompt": "what / film title and genre?",
          "cue_word": "film",
          "is_missing": true,
          "acceptable_questions": [
            "What is the film title and genre?",
            "Can you tell me the film title and genre?"
          ],
          "nova_reply": "The film title and genre is recorded for The Movie Trailer: Summarizing Stories."
        },
        {
          "id": "f2",
          "label": "Three-sentence summary",
          "cue_prompt": "what / three-sentence summary?",
          "cue_word": "three-sentence",
          "is_missing": true,
          "acceptable_questions": [
            "What is the three-sentence summary?",
            "Can you tell me the three-sentence summary?"
          ],
          "nova_reply": "The three-sentence summary is recorded for The Movie Trailer: Summarizing Stories."
        },
        {
          "id": "f3",
          "label": "Friday ticket count",
          "cue_prompt": "what / friday ticket count?",
          "cue_word": "friday",
          "is_missing": false,
          "card_value": "Friday ticket count verified",
          "value": "Friday ticket count verified",
          "examiner_question": "What is the friday ticket count?",
          "acceptable_answers": [
            "It is friday ticket count.",
            "Friday ticket count."
          ]
        },
        {
          "id": "f4",
          "label": "Friday count rounded to 10",
          "cue_prompt": "what / friday count rounded to 10?",
          "cue_word": "friday",
          "is_missing": false,
          "card_value": "Friday count rounded to 10 verified",
          "value": "Friday count rounded to 10 verified",
          "examiner_question": "What is the friday count rounded to 10?",
          "acceptable_answers": [
            "It is friday count rounded to 10.",
            "Friday count rounded to 10."
          ]
        },
        {
          "id": "f5",
          "label": "Audience feedback",
          "cue_prompt": "what / audience feedback?",
          "cue_word": "audience",
          "is_missing": false,
          "card_value": "Audience feedback verified",
          "value": "Audience feedback verified",
          "examiner_question": "What is the audience feedback?",
          "acceptable_answers": [
            "It is audience feedback.",
            "Audience feedback."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Producer B's Info Card",
      "subtitle": "Partner Card",
      "person": "Producer B",
      "fields": [
        {
          "id": "fb1",
          "label": "Film title and genre",
          "cue_prompt": "what / film title and genre?",
          "cue_word": "film",
          "is_missing": false,
          "card_value": "Film title and genre on file",
          "value": "Film title and genre on file",
          "examiner_question": "What is the film title and genre?",
          "acceptable_answers": [
            "It is film title and genre.",
            "Film title and genre."
          ]
        },
        {
          "id": "fb2",
          "label": "Three-sentence summary",
          "cue_prompt": "what / three-sentence summary?",
          "cue_word": "three-sentence",
          "is_missing": false,
          "card_value": "Three-sentence summary on file",
          "value": "Three-sentence summary on file",
          "examiner_question": "What is the three-sentence summary?",
          "acceptable_answers": [
            "It is three-sentence summary.",
            "Three-sentence summary."
          ]
        },
        {
          "id": "fb3",
          "label": "Friday ticket count",
          "cue_prompt": "what / friday ticket count?",
          "cue_word": "friday",
          "is_missing": true,
          "acceptable_questions": [
            "What is the friday ticket count?",
            "Can you tell me the friday ticket count?"
          ],
          "nova_reply": "The friday ticket count is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Friday count rounded to 10",
          "cue_prompt": "what / friday count rounded to 10?",
          "cue_word": "friday",
          "is_missing": true,
          "acceptable_questions": [
            "What is the friday count rounded to 10?",
            "Can you tell me the friday count rounded to 10?"
          ],
          "nova_reply": "The friday count rounded to 10 is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Audience feedback",
          "cue_prompt": "what / audience feedback?",
          "cue_word": "audience",
          "is_missing": true,
          "acceptable_questions": [
            "What is the audience feedback?",
            "Can you tell me the audience feedback?"
          ],
          "nova_reply": "The audience feedback is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
