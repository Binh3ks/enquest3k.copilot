/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 64 | Theme: "ELA: Data Stories / Math: Pictographs"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 64,
  "theme": "ELA: Data Stories / Math: Pictographs",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Present a short news broadcast explaining a survey about healthy school snacks or sports. Use data phrases like 'most popular', 'least chosen', and 'twice as many'.",
  "info_exchange_cards": {
    "title": "Mason and Ella's Survey Data Exchange",
    "table_a": {
      "title": "Mason's Pet Survey Chart",
      "person": "Mason",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / survey topic?",
          "cue_prompt": "what / survey topic?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Favorite household pets",
          "acceptable_questions": [
            "What is Mason's survey topic?",
            "What was his survey about?",
            "What did Mason survey his classmates about?"
          ],
          "nova_reply": "Mason surveyed third-grade students about their favorite household pets."
        },
        {
          "id": "field_a2",
          "label": "what / value of each symbol?",
          "cue_prompt": "what / value of each symbol?",
          "cue_word": "what",
          "is_missing": true,
          "value": "1 paw symbol = 2 students",
          "acceptable_questions": [
            "What is the value of each symbol?",
            "What does one paw picture mean?",
            "What does the key show?"
          ],
          "nova_reply": "In his pictograph key, each paw print symbol stands for 2 student votes."
        },
        {
          "id": "field_a3",
          "label": "which pet / most popular?",
          "cue_prompt": "which pet / most popular?",
          "cue_word": "which pet",
          "is_missing": true,
          "value": "Dogs with 16 votes",
          "acceptable_questions": [
            "Which pet was the most popular?",
            "Which pet got the most votes?",
            "Which animal won the survey?"
          ],
          "nova_reply": "Dogs were the most popular pet with 8 symbols, which means 16 votes."
        },
        {
          "id": "field_a4",
          "label": "which pet / least popular?",
          "cue_prompt": "which pet / least popular?",
          "cue_word": "which pet",
          "is_missing": true,
          "value": "Hamsters with 4 votes",
          "acceptable_questions": [
            "Which pet was the least popular?",
            "Which animal got the fewest votes?",
            "Which pet had the least number?"
          ],
          "nova_reply": "Hamsters were the least popular choice with only 2 symbols, or 4 votes."
        },
        {
          "id": "field_a5",
          "label": "how many / students surveyed?",
          "cue_prompt": "how many / students surveyed?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "30 students in total",
          "acceptable_questions": [
            "How many students did he survey?",
            "What was the total number of students?",
            "How many children voted?"
          ],
          "nova_reply": "Mason surveyed a total of 30 students in the third grade."
        }
      ]
    },
    "table_b": {
      "title": "Ella's Favorite Fruit Pictograph",
      "person": "Ella",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Ella's chart topic?",
          "cue_prompt": "what / Ella's chart topic?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Favorite cafeteria fruits",
          "nova_question": "What is the topic of Ella's pictograph chart?",
          "acceptable_answers": [
            "Favorite cafeteria fruits",
            "Favorite fruits.",
            "Her chart is about favorite cafeteria fruits.",
            "Cafeteria fruits"
          ]
        },
        {
          "id": "field_b2",
          "label": "what / symbol in the key?",
          "cue_prompt": "what / symbol in the key?",
          "cue_word": "what",
          "is_missing": false,
          "value": "1 fruit basket = 5 students",
          "nova_question": "What does one fruit basket symbol stand for in her key?",
          "acceptable_answers": [
            "1 fruit basket = 5 students",
            "Five students.",
            "It stands for 5 students.",
            "5 students"
          ]
        },
        {
          "id": "field_b3",
          "label": "which fruit / most popular?",
          "cue_prompt": "which fruit / most popular?",
          "cue_word": "which fruit",
          "is_missing": false,
          "value": "Strawberries with 25 votes",
          "nova_question": "Which fruit was the most popular in her survey?",
          "acceptable_answers": [
            "Strawberries with 25 votes",
            "Strawberries.",
            "Strawberries were the most popular.",
            "Sweet strawberries"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / displayed chart?",
          "cue_prompt": "what time / displayed chart?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 11:30 AM",
          "nova_question": "What time did Ella display her chart in the cafeteria?",
          "acceptable_answers": [
            "At 11:30 AM",
            "At 11:30",
            "She displayed it at 11:30 AM.",
            "11:30 AM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / helped count votes?",
          "cue_prompt": "who / helped count votes?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Her classmate Daniel",
          "nova_question": "Who helped Ella count the student votes?",
          "acceptable_answers": [
            "Her classmate Daniel",
            "Daniel",
            "Her classmate Daniel helped her count.",
            "Classmate Daniel"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
