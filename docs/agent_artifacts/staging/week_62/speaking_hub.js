/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 62 | Theme: "ELA: The Movie Trailer (Summarizing) / Math: Rounding"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 62,
  "theme": "ELA: The Movie Trailer (Summarizing) / Math: Rounding",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute movie trailer voiceover for your favorite book or film. Paraphrase the plot in three punchy sentences.",
  "info_exchange_cards": {
    "title": "Noah and Ava's Short Movie Exchange",
    "table_a": {
      "title": "Noah's Cartoon Trailer",
      "person": "Noah",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / movie title?",
          "cue_prompt": "what / movie title?",
          "cue_word": "what",
          "is_missing": true,
          "value": "The Brave Little Tugboat",
          "acceptable_questions": [
            "What is the movie title?",
            "What is Noah's cartoon called?",
            "What is the name of his movie?"
          ],
          "nova_reply": "Noah's cartoon movie trailer is titled 'The Brave Little Tugboat'."
        },
        {
          "id": "field_a2",
          "label": "who / main character?",
          "cue_prompt": "who / main character?",
          "cue_word": "who",
          "is_missing": true,
          "value": "A red tugboat named Barnaby",
          "acceptable_questions": [
            "Who is the main character?",
            "Who is the hero of the story?",
            "Who stars in the cartoon?"
          ],
          "nova_reply": "The main character is a cheerful red tugboat named Barnaby."
        },
        {
          "id": "field_a3",
          "label": "where / story take place?",
          "cue_prompt": "where / story take place?",
          "cue_word": "where",
          "is_missing": true,
          "value": "In Sunny Cove Harbor",
          "acceptable_questions": [
            "Where does the story take place?",
            "Where is the movie set?",
            "Where does Barnaby live?"
          ],
          "nova_reply": "The story takes place in a busy harbor called Sunny Cove."
        },
        {
          "id": "field_a4",
          "label": "how long / trailer lasts?",
          "cue_prompt": "how long / trailer lasts?",
          "cue_word": "how long",
          "is_missing": true,
          "value": "90 seconds long",
          "acceptable_questions": [
            "How long does the trailer last?",
            "How long is his trailer?",
            "What is the length of the trailer?"
          ],
          "nova_reply": "His cartoon trailer lasts for exactly 90 seconds."
        },
        {
          "id": "field_a5",
          "label": "how many / students watched it?",
          "cue_prompt": "how many / students watched it?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "About 80 students (rounded from 78)",
          "acceptable_questions": [
            "How many students watched it?",
            "How many people saw the trailer?",
            "How many students attended the screening?"
          ],
          "nova_reply": "About 80 students watched the trailer in the auditorium (rounded from 78)."
        }
      ]
    },
    "table_b": {
      "title": "Ava's Nature Film",
      "person": "Ava",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Ava's film about?",
          "cue_prompt": "what / Ava's film about?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Sea turtles returning to the ocean",
          "nova_question": "What is Ava's short film about?",
          "acceptable_answers": [
            "Sea turtles returning to the ocean",
            "Sea turtles returning to the ocean.",
            "Her film is about sea turtles returning to the ocean.",
            "Sea turtles"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / film recorded?",
          "cue_prompt": "where / film recorded?",
          "cue_word": "where",
          "is_missing": false,
          "value": "On Shell Bay Beach",
          "nova_question": "Where was her nature film recorded?",
          "acceptable_answers": [
            "On Shell Bay Beach",
            "At Shell Bay Beach.",
            "She filmed it on Shell Bay Beach.",
            "Shell Bay Beach"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / baby turtles seen?",
          "cue_prompt": "how many / baby turtles seen?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "42 baby turtles",
          "nova_question": "How many baby turtles were seen in the film?",
          "acceptable_answers": [
            "42 baby turtles",
            "Forty-two baby turtles",
            "There were 42 baby turtles.",
            "42 turtles"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / film shown?",
          "cue_prompt": "what time / film shown?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 2:45 PM",
          "nova_question": "What time was the film shown in class?",
          "acceptable_answers": [
            "At 2:45 PM",
            "At 2:45",
            "It was shown at 2:45 PM.",
            "2:45 PM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / did the voiceover?",
          "cue_prompt": "who / did the voiceover?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Her brother Lucas",
          "nova_question": "Who did the voiceover for Ava's movie?",
          "acceptable_answers": [
            "Her brother Lucas",
            "Lucas",
            "Her brother Lucas did the voiceover.",
            "Brother Lucas"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
