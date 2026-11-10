/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 79 | Theme: "The Industrial Revolution" | CEFR: B1 Preliminary
 * Generated: 2026-11-10T03:12:16.360Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 79,
  "theme": "The Industrial Revolution",
  "cefr_level": "B1 Preliminary",
  "talkshow_prompt": {
    "topic": "Presenting a Historical Documentary on the Steam Revolution",
    "question": "William, how did the combination of coal, iron, and steam power launch modern industry?",
    "model_response": "The combination of coal, iron, and steam created a powerful chain reaction! Abundant coal was burned to heat water inside iron boilers, producing high-pressure steam that drove factory machinery. In turn, these steam engines powered iron foundries and locomotives that transported more coal across steel railways. This remarkable cycle mechanized manufacturing and launched the modern industrial world!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "James Watt's Steam Engine Workshop",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "James Watt",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / steam engine workshop located?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the steam engine workshop located?",
            "Where was the workshop located?",
            "Where did James Watt build steam engines?"
          ],
          "nova_reply": "The Soho Manufactory workshop was located in Birmingham, England."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / primary invention developed?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What primary invention was developed?",
            "What was the invention?",
            "What did James Watt invent?"
          ],
          "nova_reply": "He perfected the separate condenser steam engine that reduced coal fuel waste."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how much / fuel efficiency improved?",
          "cue_word": "how much",
          "is_missing": true,
          "acceptable_questions": [
            "How much was fuel efficiency improved?",
            "How much fuel did it save?",
            "What was the efficiency increase?"
          ],
          "nova_reply": "The improved design saved up to seventy-five percent of coal fuel consumption."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / partnered with James Watt?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who partnered with James Watt?",
            "Who was his business partner?",
            "Who funded the steam engine factory?"
          ],
          "nova_reply": "Industrialist Matthew Boulton provided capital and commercial factory space."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / factories adopt steam power?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why did factories adopt steam power?",
            "Why was steam better than watermills?",
            "Why use steam engines?"
          ],
          "nova_reply": "Because steam engines operated year-round without depending on river water currents."
        }
      ]
    },
    "table_b": {
      "title": "George Stephenson's Railway Network",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "George Stephenson",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / first public railway line opened?",
          "cue_word": "where",
          "value": "Between Stockton and Darlington in northern England.",
          "nova_question": "Where was the first public railway line opened?",
          "acceptable_answers": [
            "Between Stockton and Darlington in northern England.",
            "Between Stockton and Darlington.",
            "In northern England."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / name of famous locomotive?",
          "cue_word": "what",
          "value": "The Rocket, an advanced steam locomotive built in 1829.",
          "nova_question": "What was the name of the famous locomotive?",
          "acceptable_answers": [
            "The Rocket, an advanced steam locomotive built in 1829.",
            "The Rocket.",
            "Stephensons Rocket."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how fast / locomotive travel?",
          "cue_word": "how fast",
          "value": "It achieved an unprecedented speed of twenty-nine miles per hour.",
          "nova_question": "How fast could the Rocket locomotive travel?",
          "acceptable_answers": [
            "It achieved an unprecedented speed of twenty-nine miles per hour.",
            "Twenty-nine miles per hour.",
            "29 mph."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / financed the railway construction?",
          "cue_word": "who",
          "value": "Local merchants seeking cheap transportation for bulk coal.",
          "nova_question": "Who financed the railway construction?",
          "acceptable_answers": [
            "Local merchants seeking cheap transportation for bulk coal.",
            "Local coal merchants.",
            "Business merchants."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / railways replace horse wagons?",
          "cue_word": "why",
          "value": "Because steam trains carried ten times more freight at lower cost.",
          "nova_question": "Why did railways replace horse wagons?",
          "acceptable_answers": [
            "Because steam trains carried ten times more freight at lower cost.",
            "They carried ten times more freight.",
            "To move heavy freight cheaper and faster."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
