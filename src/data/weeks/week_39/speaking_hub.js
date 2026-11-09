/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 39 | Theme: "Habitats (Persuasion Intro)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.159Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 39,
  "theme": "Habitats (Persuasion Intro)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Matching Animals to Their Natural Homes",
    "question": "Hi Liam! In your opinion, why does a desert tortoise belong in a dry sandy habitat?",
    "model_response": "In my opinion, the tortoise belongs in the desert because its body needs warm sun and dry rocks! It digs a cool burrow underground when the afternoon gets too hot. If we put it in a wet polar zone, it could not survive. Every creature needs the right home!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Liam's Desert Tortoise Project",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Liam",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / tortoise live?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does the desert tortoise live?",
            "Where does the tortoise live?",
            "Where is the tortoise's home?"
          ],
          "nova_reply": "The desert tortoise lives in a sandy underground burrow."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / eat for food?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What does the desert tortoise eat for food?",
            "What does it eat?",
            "What food does the tortoise like?"
          ],
          "nova_reply": "It eats desert grasses, dry leaves, and juicy cactus flowers."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how / stay cool?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How does the tortoise stay cool?",
            "How does it stay cool in the desert?",
            "How does it escape the hot sun?"
          ],
          "nova_reply": "It crawls deep inside its cool burrow during sunny afternoons."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / protects its habitat?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who protects its natural habitat?",
            "Who protects the tortoise?",
            "Who guards the desert reserve?"
          ],
          "nova_reply": "Friendly wildlife rangers protect the desert reserve from danger."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / shell so hard?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why is the tortoise's shell so hard?",
            "Why does it have a hard shell?",
            "Why is its shell strong?"
          ],
          "nova_reply": "Its hard shell protects its soft body from enemies and falling stones."
        }
      ]
    },
    "table_b": {
      "title": "Emma's Arctic Fox Project",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Emma",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / arctic fox live?",
          "cue_word": "where",
          "value": "In icy snowy burrows across the cold polar region.",
          "nova_question": "Where does Emma's arctic fox make its winter home?",
          "acceptable_answers": [
            "In icy snowy burrows across the cold polar region.",
            "In snowy burrows.",
            "In the cold polar region."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / color of fur in winter?",
          "cue_word": "what",
          "value": "Pure thick white fur to hide in the snow.",
          "nova_question": "What color is the arctic fox's thick winter fur?",
          "acceptable_answers": [
            "Pure thick white fur to hide in the snow.",
            "Thick white fur.",
            "Pure white fur."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / stay warm in wind?",
          "cue_word": "how",
          "value": "It curls its fluffy bushy tail around its face.",
          "nova_question": "How does the fox stay warm during freezing polar winds?",
          "acceptable_answers": [
            "It curls its fluffy bushy tail around its face.",
            "With its bushy tail.",
            "By curling its tail around its face."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / cares for the cubs?",
          "cue_word": "who",
          "value": "Both the mother and father fox protect their cubs.",
          "nova_question": "Who cares for the young fox cubs in the den?",
          "acceptable_answers": [
            "Both the mother and father fox protect their cubs.",
            "Both mother and father fox.",
            "The parent foxes."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / polar home special?",
          "cue_word": "why",
          "value": "It has clean ice and open snowy hills to hunt.",
          "nova_question": "Why is the polar region a special habitat for this fox?",
          "acceptable_answers": [
            "It has clean ice and open snowy hills to hunt.",
            "It has clean ice and snow.",
            "Because it loves open snowy hills."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
