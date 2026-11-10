/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 131 | Theme: "Opinion Project 3: Persuasive Techniques" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.868Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 131,
  "theme": "Opinion Project 3: Persuasive Techniques",
  "cefr_level": "B1+ Academic",
  "talkshow_prompt": {
    "topic": "The Power of Classical Rhetoric in Contemporary Speeches",
    "question": "Marcus, how does balancing ethos, pathos, and logos prevent a speech from being either dry or manipulative?",
    "model_response": "A speech with only logos is an emotionless textbook that puts people to sleep, while a speech with only pathos can turn into manipulative propaganda! But when an orator roots their character in honest ethos, supports their claims with undeniable logos, and brings those facts alive with human pathos, true persuasion occurs! The audience feels the emotional urgency while their rational minds confirm every fact!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Marcus's Rhetorical Analysis Workshop",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Marcus",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / classical rhetoric seminar held?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the classical rhetoric seminar held?",
            "Where was the seminar held?",
            "Where did Marcus study rhetoric?"
          ],
          "nova_reply": "The seminar was held in the university humanities symposium room."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / three classical appeals studied?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What are the three classical appeals studied?",
            "What appeals did they study?",
            "What is the rhetorical triad?"
          ],
          "nova_reply": "Ethos, pathos, and logos as formulated by Aristotle."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / historic speeches analyzed by students?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many historic speeches were analyzed by students?",
            "How many speeches did they analyze?",
            "What was the number of speeches studied?"
          ],
          "nova_reply": "Students transcribed and annotated twelve landmark historic addresses."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / delivered the guest lecture on vocal cadence?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who delivered the guest lecture on vocal cadence?",
            "Who was the guest speaker?",
            "Who gave the cadence lecture?"
          ],
          "nova_reply": "Professor Julian Vance, director of the national oratory institute."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / inverted sentence structures effective?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are inverted sentence structures effective?",
            "Why use structures like 'not only does it'?",
            "Why use inversion in speeches?"
          ],
          "nova_reply": "Because they create dramatic cadence and emphasize the secondary benefit."
        }
      ]
    },
    "table_b": {
      "title": "Olivia's Speech Rehearsal Notes",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Olivia",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / practice her keynote speech?",
          "cue_word": "where",
          "value": "In the acoustic rehearsal theater of the community center.",
          "nova_question": "Where does Olivia practice her keynote speech?",
          "acceptable_answers": [
            "In the acoustic rehearsal theater of the community center.",
            "At the community center theater.",
            "In the acoustic rehearsal theater."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / core metaphor used in the introduction?",
          "cue_word": "what",
          "value": "Comparing unmoderated notifications to continuous mental turbulence.",
          "nova_question": "What is the core metaphor used in the introduction?",
          "acceptable_answers": [
            "Comparing unmoderated notifications to continuous mental turbulence.",
            "Continuous mental turbulence.",
            "Mental turbulence metaphor."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / vocal pitch modulated during key phrases?",
          "cue_word": "how",
          "value": "By lowering pitch at line ends and pausing three full seconds.",
          "nova_question": "How does she modulate her vocal pitch during key phrases?",
          "acceptable_answers": [
            "By lowering pitch at line ends and pausing three full seconds.",
            "Lowering pitch and pausing.",
            "Pausing three seconds with lower pitch."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / provided feedback on speech delivery?",
          "cue_word": "who",
          "value": "The school debate coach and senior civic communications officers.",
          "nova_question": "Who provided feedback on speech delivery?",
          "acceptable_answers": [
            "The school debate coach and senior civic communications officers.",
            "The debate coach and civic officers.",
            "Debate coach and communications officers."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / balance pathos with statistical data?",
          "cue_word": "why",
          "value": "To ensure emotional stories are grounded in objective reality.",
          "nova_question": "Why must speakers balance pathos with statistical data?",
          "acceptable_answers": [
            "To ensure emotional stories are grounded in objective reality.",
            "To ground emotional stories in reality.",
            "To prevent emotional manipulation."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
