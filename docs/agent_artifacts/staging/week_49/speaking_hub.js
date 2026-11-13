/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 49 | Theme: "Future Dreams (Future Tense)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 49,
  "theme": "Future Dreams (Future Tense)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Talk about what you want to be when you grow up and why you chose that career.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Future Robotics Engineer",
      "cues": [
        "Career dream",
        "Reason for choice",
        "University subject",
        "Target invention",
        "Years of study"
      ],
      "information": "Chloe wants to be an engineer in order to build friendly helper robots. She plans to study computer science for four years and invent automated hospital tools."
    },
    "card_b": {
      "role": "Space Exploration Candidate",
      "cues": [
        "Career dream",
        "Destination planet",
        "Training required",
        "College degree",
        "Favorite subject"
      ],
      "information": "Noah wants to be an astronaut so that he can visit Mars. He will train in physical fitness and physics at college for five years. His favorite subject is astronomy."
    },
    "table_a": {
      "title": "Future Robotics Engineer's Info Card",
      "subtitle": "Candidate Card",
      "person": "Future Robotics Engineer",
      "fields": [
        {
          "id": "f1",
          "label": "Career dream",
          "cue_prompt": "what / career dream?",
          "cue_word": "career",
          "is_missing": true,
          "acceptable_questions": [
            "What is the career dream?",
            "Can you tell me the career dream?"
          ],
          "nova_reply": "The career dream is recorded for Future Dreams (Future Tense)."
        },
        {
          "id": "f2",
          "label": "Reason for choice",
          "cue_prompt": "what / reason for choice?",
          "cue_word": "reason",
          "is_missing": true,
          "acceptable_questions": [
            "What is the reason for choice?",
            "Can you tell me the reason for choice?"
          ],
          "nova_reply": "The reason for choice is recorded for Future Dreams (Future Tense)."
        },
        {
          "id": "f3",
          "label": "University subject",
          "cue_prompt": "what / university subject?",
          "cue_word": "university",
          "is_missing": false,
          "card_value": "University subject verified",
          "value": "University subject verified",
          "examiner_question": "What is the university subject?",
          "acceptable_answers": [
            "It is university subject.",
            "University subject."
          ]
        },
        {
          "id": "f4",
          "label": "Target invention",
          "cue_prompt": "what / target invention?",
          "cue_word": "target",
          "is_missing": false,
          "card_value": "Target invention verified",
          "value": "Target invention verified",
          "examiner_question": "What is the target invention?",
          "acceptable_answers": [
            "It is target invention.",
            "Target invention."
          ]
        },
        {
          "id": "f5",
          "label": "Years of study",
          "cue_prompt": "what / years of study?",
          "cue_word": "years",
          "is_missing": false,
          "card_value": "Years of study verified",
          "value": "Years of study verified",
          "examiner_question": "What is the years of study?",
          "acceptable_answers": [
            "It is years of study.",
            "Years of study."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Space Exploration Candidate's Info Card",
      "subtitle": "Partner Card",
      "person": "Space Exploration Candidate",
      "fields": [
        {
          "id": "fb1",
          "label": "Career dream",
          "cue_prompt": "what / career dream?",
          "cue_word": "career",
          "is_missing": false,
          "card_value": "Career dream on file",
          "value": "Career dream on file",
          "examiner_question": "What is the career dream?",
          "acceptable_answers": [
            "It is career dream.",
            "Career dream."
          ]
        },
        {
          "id": "fb2",
          "label": "Destination planet",
          "cue_prompt": "what / destination planet?",
          "cue_word": "destination",
          "is_missing": false,
          "card_value": "Destination planet on file",
          "value": "Destination planet on file",
          "examiner_question": "What is the destination planet?",
          "acceptable_answers": [
            "It is destination planet.",
            "Destination planet."
          ]
        },
        {
          "id": "fb3",
          "label": "Training required",
          "cue_prompt": "what / training required?",
          "cue_word": "training",
          "is_missing": true,
          "acceptable_questions": [
            "What is the training required?",
            "Can you tell me the training required?"
          ],
          "nova_reply": "The training required is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "College degree",
          "cue_prompt": "what / college degree?",
          "cue_word": "college",
          "is_missing": true,
          "acceptable_questions": [
            "What is the college degree?",
            "Can you tell me the college degree?"
          ],
          "nova_reply": "The college degree is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Favorite subject",
          "cue_prompt": "what / favorite subject?",
          "cue_word": "favorite",
          "is_missing": true,
          "acceptable_questions": [
            "What is the favorite subject?",
            "Can you tell me the favorite subject?"
          ],
          "nova_reply": "The favorite subject is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
