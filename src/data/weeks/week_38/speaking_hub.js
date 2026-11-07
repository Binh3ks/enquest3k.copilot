/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 38 | Theme: "Animal Abilities (Modals)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T07:16:42.028Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 38,
  "theme": "Animal Abilities (Modals)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Amazing Animal Superpowers",
    "question": "Hi Liam! Which animal ability surprised you the most during your trip to the wildlife sanctuary?",
    "model_response": "I was most surprised by the penguins! Even though they are sea birds, they cannot fly in the air because their flippers are rigid. But underwater, they can dive so fast and catch fish easily. It was super cool to watch them swim!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Peregrine Falcon Abilities",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Falcon Specialist",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "how fast / dive?",
          "cue_word": "how fast",
          "is_missing": true,
          "acceptable_questions": [
            "How fast can peregrine falcons dive through the air?",
            "How fast can falcons dive?",
            "What speed can they dive at?"
          ],
          "nova_reply": "Peregrine falcons can dive faster than two hundred miles per hour."
        },
        {
          "id": "field_a2",
          "cue_prompt": "where / build nests?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where do falcons build their nests?",
            "Where do they nest?",
            "Where do falcons live?"
          ],
          "nova_reply": "They build their nests high up on rocky cliffs."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what / hunt?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What kind of prey do falcons hunt?",
            "What do they hunt?",
            "What animals do falcons catch?"
          ],
          "nova_reply": "They hunt other flying birds mid-air using sharp talons."
        },
        {
          "id": "field_a4",
          "cue_prompt": "why / spot small animals?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why can falcons spot small animals from high in the sky?",
            "Why is their eyesight so good?",
            "How can they see small prey?"
          ],
          "nova_reply": "Because their eyesight is remarkably acute with specialized retinas."
        },
        {
          "id": "field_a5",
          "cue_prompt": "can / survive cold climates?",
          "cue_word": "can",
          "is_missing": true,
          "acceptable_questions": [
            "Can falcons survive in cold mountain climates?",
            "Can they live in cold weather?",
            "Do falcons survive cold winters?"
          ],
          "nova_reply": "Yes, they can survive across diverse climates from tundra to deserts."
        }
      ]
    },
    "table_b": {
      "title": "Red Kangaroo Abilities",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Kangaroo Researcher",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "how far / jump?",
          "cue_word": "how far",
          "value": "Up to nine meters across the dry plains in a single leap.",
          "nova_question": "How far can red kangaroos jump in a single leap?",
          "acceptable_answers": [
            "Up to nine meters across the dry plains in a single leap.",
            "Up to nine meters.",
            "Nine meters in one hop."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "can / climb trees?",
          "cue_word": "can",
          "value": "No, they cannot climb trees because of their large hind feet.",
          "nova_question": "Can red kangaroos climb tall trees in the forest?",
          "acceptable_answers": [
            "No, they cannot climb trees because of their large hind feet.",
            "No, they cannot climb trees.",
            "They cannot climb."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "what / eat?",
          "cue_word": "what",
          "value": "They eat green grass, herbs, and desert shrub roots.",
          "nova_question": "What do red kangaroos eat to survive?",
          "acceptable_answers": [
            "They eat green grass, herbs, and desert shrub roots.",
            "Grass and desert herbs.",
            "Green grass and roots."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "when / active?",
          "cue_word": "when",
          "value": "They are nocturnal and most active at night or dawn.",
          "nova_question": "When are kangaroos most active during the day?",
          "acceptable_answers": [
            "They are nocturnal and most active at night or dawn.",
            "At night and dawn.",
            "They are nocturnal animals."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "how fast / hop?",
          "cue_word": "how fast",
          "value": "They can hop at over fifty kilometers per hour to escape predators.",
          "nova_question": "How fast can kangaroos hop when avoiding predators?",
          "acceptable_answers": [
            "They can hop at over fifty kilometers per hour to escape predators.",
            "Over fifty kilometers per hour.",
            "Fifty km/h."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
