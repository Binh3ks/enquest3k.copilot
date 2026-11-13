/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 40 | Theme: "Beast Battle (Comparisons)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:36:25.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 40,
  "theme": "Beast Battle (Comparisons)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Animal Comparisons",
    "question": "Which wild animal do you think is the strongest, and why?",
    "model_response": "I think the Siberian tiger is the strongest predator because it has powerful muscles and heavy bones! It can weigh over two hundred kilograms and hunt in deep snow. While cheetahs run faster, tigers are much stronger and have sharper teeth!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Marcus's Siberian Tiger Card",
      "subtitle": "Candidate Question Card",
      "person": "Marcus",
      "fields": [
        {
          "id": "f1",
          "cue_prompt": "how heavy / tiger?",
          "cue_word": "how heavy",
          "is_missing": true,
          "acceptable_questions": [
            "How heavy is the tiger?",
            "How much does the tiger weigh?"
          ],
          "nova_reply": "The male Siberian tiger weighs three hundred kilograms."
        },
        {
          "id": "f2",
          "cue_prompt": "what color / stripes?",
          "cue_word": "color",
          "is_missing": true,
          "acceptable_questions": [
            "What color are its stripes?",
            "What color are the stripes?"
          ],
          "nova_reply": "Its stripes are dark brown and black."
        },
        {
          "id": "f3",
          "cue_prompt": "where / live?",
          "cue_word": "where",
          "is_missing": false,
          "card_value": "Russian cold pine forests",
          "examiner_question": "Where does the Siberian tiger live?"
        },
        {
          "id": "f4",
          "cue_prompt": "how fast / run?",
          "cue_word": "speed",
          "is_missing": false,
          "card_value": "60 km per hour",
          "examiner_question": "How fast can the tiger run?"
        },
        {
          "id": "f5",
          "cue_prompt": "what / eat?",
          "cue_word": "food",
          "is_missing": false,
          "card_value": "deer and wild boars",
          "examiner_question": "What does the tiger eat?"
        }
      ]
    },
    "table_b": {
      "title": "Sophia's African Cheetah Card",
      "subtitle": "Candidate Answer Card",
      "person": "Sophia",
      "fields": [
        {
          "id": "fb1",
          "cue_prompt": "how heavy / cheetah?",
          "cue_word": "weight",
          "is_missing": false,
          "card_value": "60 kilograms",
          "examiner_question": "How heavy is the cheetah?"
        },
        {
          "id": "fb2",
          "cue_prompt": "what / on fur?",
          "cue_word": "coat",
          "is_missing": false,
          "card_value": "small round black spots",
          "examiner_question": "What is on the cheetah's fur?"
        },
        {
          "id": "fb3",
          "cue_prompt": "where / live?",
          "cue_word": "habitat",
          "is_missing": true,
          "acceptable_questions": [
            "Where does the cheetah live?",
            "What is its habitat?"
          ],
          "nova_reply": "The cheetah lives in open African grasslands."
        },
        {
          "id": "fb4",
          "cue_prompt": "how fast / run?",
          "cue_word": "speed",
          "is_missing": true,
          "acceptable_questions": [
            "How fast can the cheetah run?",
            "What is its top speed?"
          ],
          "nova_reply": "It can run up to one hundred and ten kilometers per hour."
        },
        {
          "id": "fb5",
          "cue_prompt": "what / eat?",
          "cue_word": "prey",
          "is_missing": true,
          "acceptable_questions": [
            "What does the cheetah eat?",
            "What is its food?"
          ],
          "nova_reply": "The cheetah hunts small gazelles and hares."
        }
      ]
    }
  }
};
export default speakingHubData;
