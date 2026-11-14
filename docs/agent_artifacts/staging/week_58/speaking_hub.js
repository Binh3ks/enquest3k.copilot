/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 58 | Theme: "ELA: Problem & Solution (Paragraph) / Math: Division Concepts"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 58,
  "theme": "ELA: Problem & Solution (Paragraph) / Math: Division Concepts",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "State your opinion on why students should share classroom supplies. Propose a fair system for dividing resources.",
  "info_exchange_cards": {
    "title": "Ben and Chloe's Sports Equipment Exchange",
    "table_a": {
      "title": "Ben's Book Sharing Club",
      "person": "Ben",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / Ben's sharing club?",
          "cue_prompt": "what / Ben's sharing club?",
          "cue_word": "what",
          "is_missing": true,
          "value": "A comic book sharing club",
          "acceptable_questions": [
            "What is Ben's club?",
            "What kind of club did Ben start?",
            "What does his club share?"
          ],
          "nova_reply": "Ben started a comic book sharing club for his classmates."
        },
        {
          "id": "field_a2",
          "label": "how many / books divided?",
          "cue_prompt": "how many / books divided?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "24 comic books",
          "acceptable_questions": [
            "How many books did they divide?",
            "How many comic books are there?",
            "How many books did he share?"
          ],
          "nova_reply": "They divided 24 comic books equally among the reading groups."
        },
        {
          "id": "field_a3",
          "label": "how many / groups in club?",
          "cue_prompt": "how many / groups in club?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "4 student groups",
          "acceptable_questions": [
            "How many groups are in the club?",
            "How many teams share the books?",
            "How many groups did they make?"
          ],
          "nova_reply": "There are 4 student groups, so each group receives 6 books."
        },
        {
          "id": "field_a4",
          "label": "where / meet each week?",
          "cue_prompt": "where / meet each week?",
          "cue_word": "where",
          "is_missing": true,
          "value": "In the school library corner",
          "acceptable_questions": [
            "Where do they meet?",
            "Where does the club meet each week?",
            "Where is the meeting place?"
          ],
          "nova_reply": "The book club meets in the quiet corner of the school library."
        },
        {
          "id": "field_a5",
          "label": "who / organized the schedule?",
          "cue_prompt": "who / organized the schedule?",
          "cue_word": "who",
          "is_missing": true,
          "value": "Mrs. Clark the librarian",
          "acceptable_questions": [
            "Who organized the schedule?",
            "Who helped them make the plan?",
            "Who is the club leader?"
          ],
          "nova_reply": "Mrs. Clark the librarian organized the weekly sharing schedule."
        }
      ]
    },
    "table_b": {
      "title": "Chloe's Sports Equipment Plan",
      "person": "Chloe",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / equipment shared?",
          "cue_prompt": "what / equipment shared?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Jump ropes and cones",
          "nova_question": "What sports equipment is shared in Chloe's plan?",
          "acceptable_answers": [
            "Jump ropes and cones",
            "Jump ropes and cones.",
            "They share jump ropes and cones.",
            "Ropes and cones"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / kept during recess?",
          "cue_prompt": "where / kept during recess?",
          "cue_word": "where",
          "is_missing": false,
          "value": "In the blue playground shed",
          "nova_question": "Where is the equipment kept during recess?",
          "acceptable_answers": [
            "In the blue playground shed",
            "In the blue shed.",
            "It is in the blue playground shed.",
            "Playground shed"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / jump ropes?",
          "cue_prompt": "how many / jump ropes?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "18 jump ropes",
          "nova_question": "How many jump ropes does her class share?",
          "acceptable_answers": [
            "18 jump ropes",
            "Eighteen jump ropes",
            "There are 18 jump ropes.",
            "18 ropes"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / returned to shed?",
          "cue_prompt": "what time / returned to shed?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 11:45 AM",
          "nova_question": "What time is the equipment returned to the shed?",
          "acceptable_answers": [
            "At 11:45 AM",
            "At 11:45",
            "It is returned at 11:45 AM.",
            "11:45 AM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / checks the ropes?",
          "cue_prompt": "who / checks the ropes?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Coach Evans",
          "nova_question": "Who checks the ropes at the end of recess?",
          "acceptable_answers": [
            "Coach Evans",
            "Coach Evans checks them.",
            "Her gym teacher Coach Evans",
            "Teacher Coach Evans"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
