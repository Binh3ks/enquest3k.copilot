/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 126 | Theme: "Advanced Robotics & Artificial Intelligence Ethics" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.309Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 126,
  "theme": "Advanced Robotics & Artificial Intelligence Ethics",
  "cefr_level": "B2 First",
  "talkshow_prompt": {
    "topic": "Ethical Governance in Autonomous Healthcare Robotics",
    "question": "Dr. Vance, should autonomous robotic systems ever be granted full decision-making authority over critical patient triage?",
    "model_response": "It is widely agreed among bioethicists that automated systems must never operate without meaningful human supervision in critical triage. While machine learning algorithms can analyze vital signs with unmatched speed, moral accountability cannot be transferred to software. Human physicians must retain the final prerogative to override algorithmic recommendations, ensuring that empathy, contextual judgment, and institutional accountability are preserved."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Dr. Vance's Autonomous Hospital Rover",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Dr. Vance",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / rover tested?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the autonomous rover tested?",
            "Where did the testing take place?",
            "Where was the rover evaluated?"
          ],
          "nova_reply": "The rover was tested in the simulated corridors of St. Jude University Research Hospital."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what sensors / detect obstacles?",
          "cue_word": "what sensors",
          "is_missing": true,
          "acceptable_questions": [
            "What sensors detect obstacles in corridors?",
            "What kind of sensors are used?",
            "Which sensors detect obstacles?"
          ],
          "nova_reply": "It relies on solid-state lidar and panoramic ultrasonic proximity sensors."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how / prevent algorithmic bias?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How do engineers prevent algorithmic bias?",
            "How is bias prevented in training?",
            "How do they eliminate bias?"
          ],
          "nova_reply": "Data scientists balance demographic datasets and run independent fairness audits monthly."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / holds legal accountability?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who holds legal accountability for errors?",
            "Who is responsible if an error occurs?",
            "Who holds accountability?"
          ],
          "nova_reply": "The hospital governing board and the robotics manufacturing firm share legal liability."
        },
        {
          "id": "field_a5",
          "cue_prompt": "when / clinical deployment begin?",
          "cue_word": "when",
          "is_missing": true,
          "acceptable_questions": [
            "When will clinical deployment begin?",
            "When does hospital deployment start?",
            "When will trials start?"
          ],
          "nova_reply": "Clinical deployment is scheduled to begin in the cardiology wing next September."
        }
      ]
    },
    "table_b": {
      "title": "Ethan Cole's Carebot Prototype",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Ethan",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / carebot deployed?",
          "cue_word": "where",
          "value": "At the Oakwood Senior Living rehabilitation center in Manchester.",
          "nova_question": "Where is Ethan's carebot prototype currently deployed?",
          "acceptable_answers": [
            "At the Oakwood Senior Living rehabilitation center in Manchester.",
            "At Oakwood Senior Living.",
            "In Manchester."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what tasks / robot perform?",
          "cue_word": "what tasks",
          "value": "It delivers prescribed medications and monitors patient heart telemetry.",
          "nova_question": "What primary tasks does the carebot perform for residents?",
          "acceptable_answers": [
            "It delivers prescribed medications and monitors patient heart telemetry.",
            "Delivers medication and monitors heart telemetry.",
            "Delivering medication and monitoring vitals."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "why / manual override required?",
          "cue_word": "why",
          "value": "To guarantee human nurses can disengage automated navigation instantly.",
          "nova_question": "Why is a manual physical override switch required on the unit?",
          "acceptable_answers": [
            "To guarantee human nurses can disengage automated navigation instantly.",
            "So nurses can stop automated navigation instantly.",
            "To allow instant human disengagement."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "how long / battery operate?",
          "cue_word": "how long",
          "value": "The dual lithium-polymer pack powers continuous operation for fourteen hours.",
          "nova_question": "How long can the prototype operate between charging cycles?",
          "acceptable_answers": [
            "The dual lithium-polymer pack powers continuous operation for fourteen hours.",
            "Fourteen hours continuously.",
            "For fourteen hours."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "what regulation / standard certified?",
          "cue_word": "what regulation",
          "value": "It earned ISO-13482 international safety certification for personal care robots.",
          "nova_question": "What regulatory safety certification has the prototype received?",
          "acceptable_answers": [
            "It earned ISO-13482 international safety certification for personal care robots.",
            "ISO-13482 international safety certification.",
            "ISO-13482 certification."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
