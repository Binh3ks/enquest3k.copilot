/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 45 | Theme: "Shape Detectives (Geometry)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.168Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 45,
  "theme": "Shape Detectives (Geometry)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Describing Classroom Objects with Shapes",
    "question": "Hi Ben! How can you tell if an everyday object is a square or a rectangle?",
    "model_response": "I check the straight sides with a ruler! Both shapes have four straight sides and four corners. But a square has four sides of the exact same length. A rectangle has two long sides and two short sides, like our classroom door or book!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Ben's Classroom Square Study",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Ben",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / find square object?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where did Ben find a square object?",
            "Where did he find the square?",
            "Where was the square object located?"
          ],
          "nova_reply": "Ben found smooth square ceramic tiles on the classroom floor."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how many / sides does square have?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How many sides does the square have?",
            "How many straight sides are on the square?",
            "How many sides does it have?"
          ],
          "nova_reply": "It has four straight sides of the exact same length."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / corners does it have?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How many corners does it have?",
            "How many sharp corners are on the square?",
            "How many corners can you count?"
          ],
          "nova_reply": "It has four right-angle corners where the sides meet."
        },
        {
          "id": "field_a4",
          "cue_prompt": "what / color of floor tile?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What color is the square floor tile?",
            "What color are the tiles?",
            "What is the color of the square?"
          ],
          "nova_reply": "The square floor tiles are bright sky-blue and white."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / squares good for floors?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are squares good for floor tiles?",
            "Why do we use square tiles for floors?",
            "Why do squares fit together so well?"
          ],
          "nova_reply": "Square tiles fit together tightly without leaving any open gaps."
        }
      ]
    },
    "table_b": {
      "title": "Zoe's Wall Clock Circle Study",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Zoe",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "what shape / classroom clock?",
          "cue_word": "what",
          "value": "A round circular shape with a curved metal frame.",
          "nova_question": "What geometric shape is the classroom wall clock?",
          "acceptable_answers": [
            "A round circular shape with a curved metal frame.",
            "A round circular shape.",
            "A circle."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "how many / straight sides does circle have?",
          "cue_word": "how",
          "value": "Zero straight sides, it only has one continuous curved edge.",
          "nova_question": "How many straight sides does Zoe's circle clock have?",
          "acceptable_answers": [
            "Zero straight sides, it only has one continuous curved edge.",
            "Zero straight sides.",
            "None, it is curved."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how many / sharp corners on clock?",
          "cue_word": "how",
          "value": "No corners at all because circles bend smoothly.",
          "nova_question": "How many sharp corners are on the round clock face?",
          "acceptable_answers": [
            "No corners at all because circles bend smoothly.",
            "No corners at all.",
            "Zero corners."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "where / hanging on wall?",
          "cue_word": "where",
          "value": "Directly above the wooden teacher's desk near the door.",
          "nova_question": "Where is the round clock hanging in the room?",
          "acceptable_answers": [
            "Directly above the wooden teacher's desk near the door.",
            "Above the teacher's desk.",
            "Near the door."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / clocks usually round?",
          "cue_word": "why",
          "value": "Because the ticking clock hands sweep around in a circle.",
          "nova_question": "Why are wall clocks usually shaped like a circle?",
          "acceptable_answers": [
            "Because the ticking clock hands sweep around in a circle.",
            "Because clock hands turn in a circle.",
            "Hands sweep in a circle."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
