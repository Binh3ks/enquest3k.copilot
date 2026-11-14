/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 68 | Theme: "ELA: Strong Reasons / Math: Bar Graphs"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 68,
  "theme": "ELA: Strong Reasons / Math: Bar Graphs",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Present an argument advocating for new library books or playground equipment. Cite two strong reasons and quote specific numerical evidence from a chart.",
  "info_exchange_cards": {
    "title": "Jacob and Lily's After-School Activity Exchange",
    "table_a": {
      "title": "Jacob's Sports Club Bar Graph",
      "person": "Jacob",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / Jacob's graph about?",
          "cue_prompt": "what / Jacob's graph about?",
          "cue_word": "what",
          "is_missing": true,
          "value": "After-school sports club choices",
          "acceptable_questions": [
            "What is Jacob's graph about?",
            "What does his bar graph show?",
            "What topic did Jacob chart?"
          ],
          "nova_reply": "Jacob made a bar graph showing student choices for after-school sports clubs."
        },
        {
          "id": "field_a2",
          "label": "what / graph scale count by?",
          "cue_prompt": "what / graph scale count by?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Counts up by fives (0, 5, 10, 15, 20)",
          "acceptable_questions": [
            "What does the scale count by?",
            "How does the graph scale count?",
            "What is the scale step?"
          ],
          "nova_reply": "The scale on the left side of his graph counts up by fives: 0, 5, 10, 15, and 20."
        },
        {
          "id": "field_a3",
          "label": "which sport / had tallest bar?",
          "cue_prompt": "which sport / had tallest bar?",
          "cue_word": "which sport",
          "is_missing": true,
          "value": "Soccer with 25 votes",
          "acceptable_questions": [
            "Which sport had the tallest bar?",
            "Which club had the highest height?",
            "What was the most popular sport?"
          ],
          "nova_reply": "Soccer had the tallest bar on the graph, reaching a height of 25 votes."
        },
        {
          "id": "field_a4",
          "label": "where / graph displayed?",
          "cue_prompt": "where / graph displayed?",
          "cue_word": "where",
          "is_missing": true,
          "value": "On the gym bulletin board",
          "acceptable_questions": [
            "Where is the graph displayed?",
            "Where did he put the poster?",
            "Where can students see his graph?"
          ],
          "nova_reply": "His colorful bar graph poster is displayed on the main gym bulletin board."
        },
        {
          "id": "field_a5",
          "label": "who / helped Jacob draw bars?",
          "cue_prompt": "who / helped Jacob draw bars?",
          "cue_word": "who",
          "is_missing": true,
          "value": "His friend Lucas with a ruler",
          "acceptable_questions": [
            "Who helped Jacob draw the bars?",
            "Who worked with him?",
            "Who helped make the poster?"
          ],
          "nova_reply": "His friend Lucas helped him measure and draw the straight bars with a long ruler."
        }
      ]
    },
    "table_b": {
      "title": "Lily's Library Book Bar Graph",
      "person": "Lily",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Lily's bar graph topic?",
          "cue_prompt": "what / Lily's bar graph topic?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Favorite book genres in third grade",
          "nova_question": "What is the topic of Lily's bar graph?",
          "acceptable_answers": [
            "Favorite book genres in third grade",
            "Favorite book genres.",
            "Her graph shows favorite book genres in third grade.",
            "Favorite books"
          ]
        },
        {
          "id": "field_b2",
          "label": "which genre / had highest bar?",
          "cue_prompt": "which genre / had highest bar?",
          "cue_word": "which genre",
          "is_missing": false,
          "value": "Adventure books with 30 votes",
          "nova_question": "Which book genre had the highest bar on her chart?",
          "acceptable_answers": [
            "Adventure books with 30 votes",
            "Adventure books.",
            "Adventure books had the highest bar.",
            "Adventure"
          ]
        },
        {
          "id": "field_b3",
          "label": "what / scale step?",
          "cue_prompt": "what / scale step?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Skip counting by tens",
          "nova_question": "What scale step did Lily use on her chart?",
          "acceptable_answers": [
            "Skip counting by tens",
            "Counting by tens.",
            "She used skip counting by tens.",
            "By tens"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / presented graph?",
          "cue_prompt": "what time / presented graph?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 1:15 PM in reading class",
          "nova_question": "What time did Lily present her graph to the class?",
          "acceptable_answers": [
            "At 1:15 PM in reading class",
            "At 1:15 PM.",
            "She presented it at 1:15 PM.",
            "1:15 PM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / commended her neat poster?",
          "cue_prompt": "who / commended her neat poster?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Mrs. Clark the librarian",
          "nova_question": "Who commended Lily for her neat and colorful poster?",
          "acceptable_answers": [
            "Mrs. Clark the librarian",
            "Mrs. Clark.",
            "Librarian Mrs. Clark commended her.",
            "Mrs. Clark did"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
