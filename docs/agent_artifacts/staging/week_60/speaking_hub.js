/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 60 | Theme: "ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 60,
  "theme": "ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute formal speech to the town council proposing a community improvement project. State the problem, your budget estimate, and why it matters.",
  "info_exchange_cards": {
    "title": "Jack and Sophia's Town Hall Exchange",
    "table_a": {
      "title": "Jack's Letter to the Mayor",
      "person": "Jack",
      "fields": [
        {
          "id": "field_a1",
          "label": "who / Jack write to?",
          "cue_prompt": "who / Jack write to?",
          "cue_word": "who",
          "is_missing": true,
          "value": "Mayor Baker",
          "acceptable_questions": [
            "Who did Jack write to?",
            "Who was the letter sent to?",
            "Who received Jack's letter?"
          ],
          "nova_reply": "Jack wrote a polite formal letter to Town Mayor Baker."
        },
        {
          "id": "field_a2",
          "label": "what / Jack request?",
          "cue_prompt": "what / Jack request?",
          "cue_word": "what",
          "is_missing": true,
          "value": "New wooden benches for the park",
          "acceptable_questions": [
            "What did Jack request?",
            "What did he ask for?",
            "What was his letter request?"
          ],
          "nova_reply": "Jack requested 4 new wooden benches for the community park paths."
        },
        {
          "id": "field_a3",
          "label": "where / park located?",
          "cue_prompt": "where / park located?",
          "cue_word": "where",
          "is_missing": true,
          "value": "On Oak Street beside the school",
          "acceptable_questions": [
            "Where is the park located?",
            "Where is the town park?",
            "Where is Oak Street park?"
          ],
          "nova_reply": "The community park is located on Oak Street, right beside the school."
        },
        {
          "id": "field_a4",
          "label": "how many / students signed?",
          "cue_prompt": "how many / students signed?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "32 students signed",
          "acceptable_questions": [
            "How many students signed the letter?",
            "How many names were on the letter?",
            "How many students supported it?"
          ],
          "nova_reply": "Thirty-two students signed their names at the bottom of the letter."
        },
        {
          "id": "field_a5",
          "label": "when / receive a reply?",
          "cue_prompt": "when / receive a reply?",
          "cue_word": "when",
          "is_missing": true,
          "value": "On Friday morning",
          "acceptable_questions": [
            "When did Jack receive a reply?",
            "What day did the reply come?",
            "When did the mayor answer?"
          ],
          "nova_reply": "The mayor sent a kind reply letter on Friday morning."
        }
      ]
    },
    "table_b": {
      "title": "Sophia's Library Petition",
      "person": "Sophia",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Sophia's request?",
          "cue_prompt": "what / Sophia's request?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Extra science books for the library",
          "nova_question": "What did Sophia request in her petition?",
          "acceptable_answers": [
            "Extra science books for the library",
            "Extra science books.",
            "She requested extra science books for the library.",
            "Science books"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / library located?",
          "cue_prompt": "where / library located?",
          "cue_word": "where",
          "is_missing": false,
          "value": "Opposite the town hall",
          "nova_question": "Where is the community library located?",
          "acceptable_answers": [
            "Opposite the town hall",
            "Opposite town hall.",
            "It is opposite the town hall.",
            "Near town hall"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / books requested?",
          "cue_prompt": "how many / books requested?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "50 new science books",
          "nova_question": "How many new books did her group request?",
          "acceptable_answers": [
            "50 new science books",
            "Fifty new science books",
            "They requested 50 new science books.",
            "50 books"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / meeting with mayor?",
          "cue_prompt": "what time / meeting with mayor?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 3:15 PM",
          "nova_question": "What time was Sophia's meeting with the mayor?",
          "acceptable_answers": [
            "At 3:15 PM",
            "At 3:15",
            "The meeting was at 3:15 PM.",
            "3:15 PM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / went with Sophia?",
          "cue_prompt": "who / went with Sophia?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Her teacher Mr. Hall",
          "nova_question": "Who went to town hall with Sophia?",
          "acceptable_answers": [
            "Her teacher Mr. Hall",
            "Mr. Hall",
            "Her teacher Mr. Hall went with her.",
            "Teacher Mr. Hall"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
