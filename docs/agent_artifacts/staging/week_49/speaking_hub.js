/**
 * STAGED DELIVERABLE: Round 96 Authentic Cambridge Flyers Speaking Hub
 * Week: 49 | Theme: "Future Dreams (Future Tense)" | CEFR: A2 Flyers
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
          "id": "field_a1",
          "label": "what / career dream?",
          "cue_prompt": "what / career dream?",
          "cue_word": "career",
          "is_missing": true,
          "value": "Robotics engineer",
          "acceptable_questions": [
            "What is Chloe's career dream?",
            "What does Chloe want to be?",
            "What career does she want?"
          ],
          "nova_reply": "Chloe wants to become a robotics engineer."
        },
        {
          "id": "field_a2",
          "label": "why / choose robotics?",
          "cue_prompt": "why / choose robotics?",
          "cue_word": "reason",
          "is_missing": true,
          "value": "To build friendly helper robots",
          "acceptable_questions": [
            "Why did she choose robotics?",
            "Why does Chloe want to be an engineer?",
            "What is her reason for choosing robotics?"
          ],
          "nova_reply": "She chose robotics in order to build friendly helper robots."
        },
        {
          "id": "field_a3",
          "label": "what / university subject?",
          "cue_prompt": "what / university subject?",
          "cue_word": "subject",
          "is_missing": true,
          "value": "Computer science",
          "acceptable_questions": [
            "What subject will Chloe study at university?",
            "What will she study at college?",
            "Which subject is she planning to study?"
          ],
          "nova_reply": "She plans to study computer science at university."
        },
        {
          "id": "field_a4",
          "label": "what / target invention?",
          "cue_prompt": "what / target invention?",
          "cue_word": "invention",
          "is_missing": true,
          "value": "Automated hospital tools",
          "acceptable_questions": [
            "What is Chloe's target invention?",
            "What does she want to invent?",
            "What tools will she create?"
          ],
          "nova_reply": "Her target invention is automated hospital tools to help doctors."
        },
        {
          "id": "field_a5",
          "label": "how many / years of study?",
          "cue_prompt": "how many / years of study?",
          "cue_word": "years",
          "is_missing": true,
          "value": "Four years",
          "acceptable_questions": [
            "How many years will Chloe study?",
            "How long is her university course?",
            "How many years of study are required?"
          ],
          "nova_reply": "She will study computer science for four years."
        }
      ]
    },
    "table_b": {
      "title": "Space Exploration Candidate's Info Card",
      "subtitle": "Partner Card",
      "person": "Space Exploration Candidate",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / career dream?",
          "cue_prompt": "what / career dream?",
          "cue_word": "dream",
          "is_missing": false,
          "value": "Astronaut",
          "nova_question": "What is Noah's future career dream?",
          "acceptable_answers": [
            "Astronaut",
            "Astronaut.",
            "He wants to be an astronaut.",
            "Noah wants to be an astronaut."
          ]
        },
        {
          "id": "field_b2",
          "label": "which / destination planet?",
          "cue_prompt": "which / destination planet?",
          "cue_word": "planet",
          "is_missing": false,
          "value": "Mars",
          "nova_question": "Which planet does Noah hope to visit?",
          "acceptable_answers": [
            "Mars",
            "Mars.",
            "He hopes to visit Mars.",
            "The planet Mars."
          ]
        },
        {
          "id": "field_b3",
          "label": "what / training required?",
          "cue_prompt": "what / training required?",
          "cue_word": "training",
          "is_missing": false,
          "value": "Physical fitness and physics",
          "nova_question": "What training will Noah complete at college?",
          "acceptable_answers": [
            "Physical fitness and physics",
            "Physical fitness and physics.",
            "He will train in physical fitness and physics."
          ]
        },
        {
          "id": "field_b4",
          "label": "how long / college training?",
          "cue_prompt": "how long / college training?",
          "cue_word": "duration",
          "is_missing": false,
          "value": "Five years",
          "nova_question": "How long will his college training last?",
          "acceptable_answers": [
            "Five years",
            "Five years.",
            "His college training will last five years.",
            "Five years at college."
          ]
        },
        {
          "id": "field_b5",
          "label": "what / favorite subject?",
          "cue_prompt": "what / favorite subject?",
          "cue_word": "subject",
          "is_missing": false,
          "value": "Astronomy",
          "nova_question": "What is Noah's favorite school subject?",
          "acceptable_answers": [
            "Astronomy",
            "Astronomy.",
            "His favorite subject is astronomy.",
            "Astronomy class."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
