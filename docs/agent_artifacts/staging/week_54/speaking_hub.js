/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 54 | Theme: "PHASE 1 GRADUATION SHOWCASE" | CEFR: A2 Flyers
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
          "id": "field_a1",
          "label": "who / graduation valedictorian?",
          "cue_prompt": "who / graduation valedictorian?",
          "cue_word": "valedictorian",
          "is_missing": true,
          "value": "Sophia",
          "acceptable_questions": [
            "Who is the graduation valedictorian?",
            "Who delivered the valedictory speech?",
            "What is the valedictorian's name?"
          ],
          "nova_reply": "Sophia delivered the valedictory speech."
        },
        {
          "id": "field_a2",
          "label": "what / valedictory speech topic?",
          "cue_prompt": "what / valedictory speech topic?",
          "cue_word": "topic",
          "is_missing": true,
          "value": "The Pyramids of Giza and ancient engineering",
          "acceptable_questions": [
            "What was Sophia's speech topic?",
            "What did Sophia speak about at graduation?",
            "What topic was featured in her speech?"
          ],
          "nova_reply": "Her speech topic explored the Pyramids of Giza and ancient engineering."
        },
        {
          "id": "field_a3",
          "label": "how many / weeks completed?",
          "cue_prompt": "how many / weeks completed?",
          "cue_word": "weeks",
          "is_missing": true,
          "value": "Fifty-four weeks of English excellence",
          "acceptable_questions": [
            "How many weeks did the graduates complete?",
            "How many weeks of English did they celebrate?",
            "What milestone was reached?"
          ],
          "nova_reply": "The students celebrated fifty-four completed weeks of English excellence."
        },
        {
          "id": "field_a4",
          "label": "what / academic goal for Phase 2?",
          "cue_prompt": "what / academic goal for Phase 2?",
          "cue_word": "goal",
          "is_missing": true,
          "value": "Master academic writing and persuasion",
          "acceptable_questions": [
            "What is Sophia's goal for Phase 2?",
            "What will the students master in Phase 2?",
            "What is their next academic milestone?"
          ],
          "nova_reply": "Her goal is to master academic writing and persuasion in Phase 2."
        },
        {
          "id": "field_a5",
          "label": "what / certificate awarded?",
          "cue_prompt": "what / certificate awarded?",
          "cue_word": "certificate",
          "is_missing": true,
          "value": "Phase 1 Graduation Honors Certificate",
          "acceptable_questions": [
            "What certificate was awarded to Sophia?",
            "Which honors certificate did graduates receive?",
            "What award was given on stage?"
          ],
          "nova_reply": "Sophia received the Phase 1 Graduation Honors Certificate on stage."
        }
      ]
    },
    "table_b": {
      "title": "Showcase Master of Ceremonies's Info Card",
      "subtitle": "Partner Card",
      "person": "Showcase Master of Ceremonies",
      "fields": [
        {
          "id": "field_b1",
          "label": "where / showcase ceremony venue?",
          "cue_prompt": "where / showcase ceremony venue?",
          "cue_word": "venue",
          "is_missing": false,
          "value": "The Grand Hall",
          "nova_question": "Where did the graduation showcase ceremony take place?",
          "acceptable_answers": [
            "The Grand Hall",
            "The Grand Hall.",
            "It took place in the Grand Hall.",
            "In the Grand Hall."
          ]
        },
        {
          "id": "field_b2",
          "label": "how many / graduates celebrating?",
          "cue_prompt": "how many / graduates celebrating?",
          "cue_word": "graduates",
          "is_missing": false,
          "value": "Fifty graduates",
          "nova_question": "How many graduates participated in the ceremony?",
          "acceptable_answers": [
            "Fifty graduates",
            "Fifty graduates.",
            "There were fifty graduates.",
            "Fifty students."
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / parents attended?",
          "cue_prompt": "how many / parents attended?",
          "cue_word": "parents",
          "is_missing": false,
          "value": "One hundred fifty parents",
          "nova_question": "How many parents attended the graduation showcase?",
          "acceptable_answers": [
            "One hundred fifty parents",
            "One hundred fifty parents.",
            "One hundred fifty parents attended.",
            "One hundred fifty."
          ]
        },
        {
          "id": "field_b4",
          "label": "what / highlight event?",
          "cue_prompt": "what / highlight event?",
          "cue_word": "highlight",
          "is_missing": false,
          "value": "Student portfolio gallery",
          "nova_question": "What was the highlight event of the ceremony?",
          "acceptable_answers": [
            "Student portfolio gallery",
            "Student portfolio gallery.",
            "The highlight was the student portfolio gallery.",
            "Portfolio gallery."
          ]
        },
        {
          "id": "field_b5",
          "label": "what / final ceremony stage?",
          "cue_prompt": "what / final ceremony stage?",
          "cue_word": "stage",
          "is_missing": false,
          "value": "Certificate award presentation",
          "nova_question": "What concluded the graduation showcase?",
          "acceptable_answers": [
            "Certificate award presentation",
            "Certificate award presentation.",
            "The certificate award presentation concluded the event.",
            "Award presentation."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
