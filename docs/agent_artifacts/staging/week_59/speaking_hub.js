/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 59 | Theme: "ELA: Message in a Bottle (Informal Writing) / Math: Remainders"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 59,
  "theme": "ELA: Message in a Bottle (Informal Writing) / Math: Remainders",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Imagine you found an ancient message in a bottle. Describe what it said, who wrote it, and what clues were inside.",
  "info_exchange_cards": {
    "title": "Liam and Grace's Island Message Exchange",
    "table_a": {
      "title": "Liam's Island Letter",
      "person": "Liam",
      "fields": [
        {
          "id": "field_a1",
          "label": "where / find the bottle?",
          "cue_prompt": "where / find the bottle?",
          "cue_word": "where",
          "is_missing": true,
          "value": "Near the rocky tide pool",
          "acceptable_questions": [
            "Where did Liam find the bottle?",
            "Where was the bottle found?",
            "Where did he see the bottle?"
          ],
          "nova_reply": "Liam found the floating bottle near the rocky tide pool on Sandy Beach."
        },
        {
          "id": "field_a2",
          "label": "what / inside the bottle?",
          "cue_prompt": "what / inside the bottle?",
          "cue_word": "what",
          "is_missing": true,
          "value": "A rolled paper map and note",
          "acceptable_questions": [
            "What was inside the bottle?",
            "What did he find inside?",
            "What was in the glass bottle?"
          ],
          "nova_reply": "Inside the bottle was a rolled paper map and a friendly handwritten note."
        },
        {
          "id": "field_a3",
          "label": "who / wrote the message?",
          "cue_prompt": "who / wrote the message?",
          "cue_word": "who",
          "is_missing": true,
          "value": "A young sailor named Toby",
          "acceptable_questions": [
            "Who wrote the message?",
            "Who sent the bottle?",
            "Who was the letter from?"
          ],
          "nova_reply": "A young sailor named Toby wrote the message from his sailboat."
        },
        {
          "id": "field_a4",
          "label": "how many / days at sea?",
          "cue_prompt": "how many / days at sea?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "15 days at sea",
          "acceptable_questions": [
            "How many days was the bottle at sea?",
            "How long was it floating?",
            "How many days did it take?"
          ],
          "nova_reply": "The note said the bottle had floated for 15 days across the bay."
        },
        {
          "id": "field_a5",
          "label": "what / Toby's favorite news?",
          "cue_prompt": "what / Toby's favorite news?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Spotting two playful dolphins",
          "acceptable_questions": [
            "What was Toby's favorite news?",
            "What news did he share?",
            "What did Toby see?"
          ],
          "nova_reply": "His favorite news was spotting two playful dolphins swimming beside his boat."
        }
      ]
    },
    "table_b": {
      "title": "Grace's Beach Discovery",
      "person": "Grace",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Grace's discovery?",
          "cue_prompt": "what / Grace's discovery?",
          "cue_word": "what",
          "is_missing": false,
          "value": "A blue corked glass bottle",
          "nova_question": "What did Grace discover on the beach?",
          "acceptable_answers": [
            "A blue corked glass bottle",
            "A blue glass bottle.",
            "She discovered a blue corked glass bottle.",
            "Blue glass bottle"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / bottle washed ashore?",
          "cue_prompt": "where / bottle washed ashore?",
          "cue_word": "where",
          "is_missing": false,
          "value": "By the tall white lighthouse",
          "nova_question": "Where did the bottle wash ashore?",
          "acceptable_answers": [
            "By the tall white lighthouse",
            "By the lighthouse.",
            "It washed ashore by the tall white lighthouse.",
            "Near the lighthouse"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / shells inside?",
          "cue_prompt": "how many / shells inside?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "5 tiny purple shells",
          "nova_question": "How many shells were inside the bottle with the note?",
          "acceptable_answers": [
            "5 tiny purple shells",
            "Five tiny purple shells",
            "There were 5 tiny purple shells.",
            "5 shells"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / found the bottle?",
          "cue_prompt": "what time / found the bottle?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 10:15 AM",
          "nova_question": "What time did Grace find the bottle?",
          "acceptable_answers": [
            "At 10:15 AM",
            "At 10:15",
            "She found it at 10:15 AM.",
            "10:15 AM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / helped Grace read it?",
          "cue_prompt": "who / helped Grace read it?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Her grandfather",
          "nova_question": "Who helped Grace read the letter?",
          "acceptable_answers": [
            "Her grandfather",
            "Her grandfather helped her.",
            "Grandfather",
            "Her granddad"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
