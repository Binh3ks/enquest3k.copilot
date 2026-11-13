/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 54 | Theme: "PHASE 1 GRADUATION SHOWCASE" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 54,
  "theme": "PHASE 1 GRADUATION SHOWCASE",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver your Phase 1 graduation showcase speech, sharing your favorite memory and introducing a world wonder.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Graduation Valedictorian",
      "cues": [
        "Student name",
        "Speech topic",
        "World wonder featured",
        "Weeks completed",
        "Phase 2 goal"
      ],
      "information": "Sophia delivered the valedictory speech on the Pyramids of Giza. She celebrated fifty-four weeks of English excellence and aims to master academic writing in Phase 2."
    },
    "card_b": {
      "role": "Showcase Master of Ceremonies",
      "cues": [
        "Ceremony venue",
        "Number of graduates",
        "Certificates awarded",
        "Audience size",
        "Event highlight"
      ],
      "information": "The showcase took place in the Grand Hall with fifty graduates and one hundred fifty parents. The highlight was a student portfolio gallery and certificate ceremony."
    },
    "table_a": {
      "title": "Graduation Valedictorian's Info Card",
      "subtitle": "Candidate Card",
      "person": "Graduation Valedictorian",
      "fields": [
        {
          "id": "f1",
          "label": "Student name",
          "cue_prompt": "what / student name?",
          "cue_word": "student",
          "is_missing": true,
          "acceptable_questions": [
            "What is the student name?",
            "Can you tell me the student name?"
          ],
          "nova_reply": "The student name is recorded for PHASE 1 GRADUATION SHOWCASE."
        },
        {
          "id": "f2",
          "label": "Speech topic",
          "cue_prompt": "what / speech topic?",
          "cue_word": "speech",
          "is_missing": true,
          "acceptable_questions": [
            "What is the speech topic?",
            "Can you tell me the speech topic?"
          ],
          "nova_reply": "The speech topic is recorded for PHASE 1 GRADUATION SHOWCASE."
        },
        {
          "id": "f3",
          "label": "World wonder featured",
          "cue_prompt": "what / world wonder featured?",
          "cue_word": "world",
          "is_missing": false,
          "card_value": "World wonder featured verified",
          "value": "World wonder featured verified",
          "examiner_question": "What is the world wonder featured?",
          "acceptable_answers": [
            "It is world wonder featured.",
            "World wonder featured."
          ]
        },
        {
          "id": "f4",
          "label": "Weeks completed",
          "cue_prompt": "what / weeks completed?",
          "cue_word": "weeks",
          "is_missing": false,
          "card_value": "Weeks completed verified",
          "value": "Weeks completed verified",
          "examiner_question": "What is the weeks completed?",
          "acceptable_answers": [
            "It is weeks completed.",
            "Weeks completed."
          ]
        },
        {
          "id": "f5",
          "label": "Phase 2 goal",
          "cue_prompt": "what / phase 2 goal?",
          "cue_word": "phase",
          "is_missing": false,
          "card_value": "Phase 2 goal verified",
          "value": "Phase 2 goal verified",
          "examiner_question": "What is the phase 2 goal?",
          "acceptable_answers": [
            "It is phase 2 goal.",
            "Phase 2 goal."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Showcase Master of Ceremonies's Info Card",
      "subtitle": "Partner Card",
      "person": "Showcase Master of Ceremonies",
      "fields": [
        {
          "id": "fb1",
          "label": "Ceremony venue",
          "cue_prompt": "what / ceremony venue?",
          "cue_word": "ceremony",
          "is_missing": false,
          "card_value": "Ceremony venue on file",
          "value": "Ceremony venue on file",
          "examiner_question": "What is the ceremony venue?",
          "acceptable_answers": [
            "It is ceremony venue.",
            "Ceremony venue."
          ]
        },
        {
          "id": "fb2",
          "label": "Number of graduates",
          "cue_prompt": "what / number of graduates?",
          "cue_word": "number",
          "is_missing": false,
          "card_value": "Number of graduates on file",
          "value": "Number of graduates on file",
          "examiner_question": "What is the number of graduates?",
          "acceptable_answers": [
            "It is number of graduates.",
            "Number of graduates."
          ]
        },
        {
          "id": "fb3",
          "label": "Certificates awarded",
          "cue_prompt": "what / certificates awarded?",
          "cue_word": "certificates",
          "is_missing": true,
          "acceptable_questions": [
            "What is the certificates awarded?",
            "Can you tell me the certificates awarded?"
          ],
          "nova_reply": "The certificates awarded is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Audience size",
          "cue_prompt": "what / audience size?",
          "cue_word": "audience",
          "is_missing": true,
          "acceptable_questions": [
            "What is the audience size?",
            "Can you tell me the audience size?"
          ],
          "nova_reply": "The audience size is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Event highlight",
          "cue_prompt": "what / event highlight?",
          "cue_word": "event",
          "is_missing": true,
          "acceptable_questions": [
            "What is the event highlight?",
            "Can you tell me the event highlight?"
          ],
          "nova_reply": "The event highlight is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
