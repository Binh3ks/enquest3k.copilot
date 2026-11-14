/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 64 | Theme: "Data Stories: Reading Pictographs" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 64,
  "theme": "Data Stories: Reading Pictographs",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Present a short news broadcast explaining a survey about healthy school snacks or sports. Use data phrases like 'most popular', 'least chosen', and 'twice as many'.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Data Analyst A",
      "cues": [
        "Survey topic investigated",
        "Key scale per icon",
        "Most popular category",
        "Least common category",
        "Calculated difference"
      ]
    },
    "card_b": {
      "role": "Data Analyst B",
      "cues": [
        "Survey topic investigated",
        "Key scale per icon",
        "Most popular category",
        "Least common category",
        "Calculated difference"
      ]
    },
    "table_a": {
      "title": "Data Analyst A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Data Analyst A",
      "fields": [
        {
          "id": "f1",
          "label": "Survey topic investigated",
          "cue_prompt": "what / survey topic investigated?",
          "cue_word": "survey",
          "is_missing": true,
          "acceptable_questions": [
            "What is the survey topic investigated?",
            "Can you tell me the survey topic investigated?"
          ],
          "nova_reply": "The survey topic investigated is recorded for Data Stories: Reading Pictographs."
        },
        {
          "id": "f2",
          "label": "Key scale per icon",
          "cue_prompt": "what / key scale per icon?",
          "cue_word": "key",
          "is_missing": true,
          "acceptable_questions": [
            "What is the key scale per icon?",
            "Can you tell me the key scale per icon?"
          ],
          "nova_reply": "The key scale per icon is recorded for Data Stories: Reading Pictographs."
        },
        {
          "id": "f3",
          "label": "Most popular category",
          "cue_prompt": "what / most popular category?",
          "cue_word": "most",
          "is_missing": false,
          "card_value": "Most popular category verified",
          "value": "Most popular category verified",
          "examiner_question": "What is the most popular category?",
          "acceptable_answers": [
            "It is most popular category.",
            "Most popular category."
          ]
        },
        {
          "id": "f4",
          "label": "Least common category",
          "cue_prompt": "what / least common category?",
          "cue_word": "least",
          "is_missing": false,
          "card_value": "Least common category verified",
          "value": "Least common category verified",
          "examiner_question": "What is the least common category?",
          "acceptable_answers": [
            "It is least common category.",
            "Least common category."
          ]
        },
        {
          "id": "f5",
          "label": "Calculated difference",
          "cue_prompt": "what / calculated difference?",
          "cue_word": "calculated",
          "is_missing": false,
          "card_value": "Calculated difference verified",
          "value": "Calculated difference verified",
          "examiner_question": "What is the calculated difference?",
          "acceptable_answers": [
            "It is calculated difference.",
            "Calculated difference."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Data Analyst B's Info Card",
      "subtitle": "Partner Card",
      "person": "Data Analyst B",
      "fields": [
        {
          "id": "fb1",
          "label": "Survey topic investigated",
          "cue_prompt": "what / survey topic investigated?",
          "cue_word": "survey",
          "is_missing": false,
          "card_value": "Survey topic investigated on file",
          "value": "Survey topic investigated on file",
          "examiner_question": "What is the survey topic investigated?",
          "acceptable_answers": [
            "It is survey topic investigated.",
            "Survey topic investigated."
          ]
        },
        {
          "id": "fb2",
          "label": "Key scale per icon",
          "cue_prompt": "what / key scale per icon?",
          "cue_word": "key",
          "is_missing": false,
          "card_value": "Key scale per icon on file",
          "value": "Key scale per icon on file",
          "examiner_question": "What is the key scale per icon?",
          "acceptable_answers": [
            "It is key scale per icon.",
            "Key scale per icon."
          ]
        },
        {
          "id": "fb3",
          "label": "Most popular category",
          "cue_prompt": "what / most popular category?",
          "cue_word": "most",
          "is_missing": true,
          "acceptable_questions": [
            "What is the most popular category?",
            "Can you tell me the most popular category?"
          ],
          "nova_reply": "The most popular category is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Least common category",
          "cue_prompt": "what / least common category?",
          "cue_word": "least",
          "is_missing": true,
          "acceptable_questions": [
            "What is the least common category?",
            "Can you tell me the least common category?"
          ],
          "nova_reply": "The least common category is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Calculated difference",
          "cue_prompt": "what / calculated difference?",
          "cue_word": "calculated",
          "is_missing": true,
          "acceptable_questions": [
            "What is the calculated difference?",
            "Can you tell me the calculated difference?"
          ],
          "nova_reply": "The calculated difference is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
