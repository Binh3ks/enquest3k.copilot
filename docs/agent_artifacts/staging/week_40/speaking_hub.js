/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 40 | Theme: "Beast Battle (Comparisons)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.161Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 40,
  "theme": "Beast Battle (Comparisons)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Comparing the Strength and Speed of Predators",
    "question": "Hi Marcus! Which predator do you think is more impressive: the Siberian tiger or the African cheetah?",
    "model_response": "I think both are amazing in different ways! The tiger is much bigger and heavier, with powerful jaws that can hunt large animals in the snow. But the cheetah has a lighter body and runs faster than any creature on land! Each animal has evolved the perfect body for its home."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Marcus's Siberian Tiger Study",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Marcus",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "how heavy / adult tiger?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How heavy is an adult Siberian tiger?",
            "How much does the tiger weigh?",
            "How heavy is the tiger?"
          ],
          "nova_reply": "An adult Siberian tiger can weigh up to three hundred kilograms."
        },
        {
          "id": "field_a2",
          "cue_prompt": "where / tiger hunt?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does the Siberian tiger hunt?",
            "Where does the tiger live?",
            "Where does it hunt its prey?"
          ],
          "nova_reply": "It hunts in snowy birch forests and rocky northern mountains."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what / color of fur stripes?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What color are the tiger's fur stripes?",
            "What pattern does the fur have?",
            "What color are its stripes?"
          ],
          "nova_reply": "It has dark black stripes over a thick golden-orange coat."
        },
        {
          "id": "field_a4",
          "cue_prompt": "why / have sharp claws?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why does the tiger have sharp claws?",
            "Why are its claws so sharp?",
            "How does it use its claws?"
          ],
          "nova_reply": "Its sharp curved claws help it grip prey and walk on slippery snow."
        },
        {
          "id": "field_a5",
          "cue_prompt": "how fast / can run?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How fast can the tiger run?",
            "What is the tiger's running speed?",
            "How fast does it move?"
          ],
          "nova_reply": "It can sprint up to sixty kilometers per hour in short bursts."
        }
      ]
    },
    "table_b": {
      "title": "Maya's African Cheetah Study",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Maya",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "how heavy / cheetah weigh?",
          "cue_word": "how",
          "value": "Between forty and sixty kilograms, making it very light.",
          "nova_question": "How heavy is the African cheetah compared to a tiger?",
          "acceptable_answers": [
            "Between forty and sixty kilograms, making it very light.",
            "Forty to sixty kilograms.",
            "About fifty kilograms."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "where / cheetah hunt?",
          "cue_word": "where",
          "value": "Across flat open grasslands and sunny savanna plains.",
          "nova_question": "Where does the cheetah hunt its daily prey?",
          "acceptable_answers": [
            "Across flat open grasslands and sunny savanna plains.",
            "Across flat grasslands.",
            "On sunny savanna plains."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "what / pattern on fur?",
          "cue_word": "what",
          "value": "Solid round black spots over a tawny golden coat.",
          "nova_question": "What distinct pattern covers the cheetah's fur coat?",
          "acceptable_answers": [
            "Solid round black spots over a tawny golden coat.",
            "Solid black spots.",
            "Round black spots."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "how fast / can cheetah sprint?",
          "cue_word": "how",
          "value": "Over one hundred kilometers per hour in quick sprints.",
          "nova_question": "How fast can the cheetah sprint across open plains?",
          "acceptable_answers": [
            "Over one hundred kilometers per hour in quick sprints.",
            "Over one hundred kilometers per hour.",
            "One hundred kilometers per hour."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / tail so long?",
          "cue_word": "why",
          "value": "Its long muscular tail acts like a rudder to steer fast turns.",
          "nova_question": "Why does the cheetah have such a long and muscular tail?",
          "acceptable_answers": [
            "Its long muscular tail acts like a rudder to steer fast turns.",
            "To steer sharp turns.",
            "To balance while sprinting."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
