/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 134 | Theme: "Identifying Fallacies" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.875Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 134,
  "theme": "Identifying Fallacies",
  "cefr_level": "B1+ Academic",
  "talkshow_prompt": {
    "topic": "Detecting and Correcting Logical Fallacies in Public Debate",
    "question": "Zoe, why is the hasty generalization fallacy so common, and how can debaters avoid committing it?",
    "model_response": "A hasty generalization is tempting because people love quick shortcuts! When someone sees one or two lazy gamers, they jump to saying 'all gamers are lazy.' But in a school debate, just one counterexample breaks an extreme 'all' or 'never' claim! Smart speakers keep their points fair by using careful words like 'many', 'some', or 'tend to' so their logic stays sound."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Zoe's Logic and Fallacy Workshop",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Zoe",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / critical logic workshop held?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the critical logic workshop held?",
            "Where was the workshop held?",
            "Where did Zoe attend the logic seminar?"
          ],
          "nova_reply": "In the philosophy seminar room at the central public library."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / core fallacy analyzed this week?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What core fallacy was analyzed this week?",
            "What was the fallacy analyzed?",
            "What fallacy did they study?"
          ],
          "nova_reply": "The hasty generalization fallacy and false universal claims."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / media advertisements analyzed for bias?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many media advertisements were analyzed for bias?",
            "How many ads were checked?",
            "What was the number of ads analyzed?"
          ],
          "nova_reply": "Twenty-four print and television commercial advertisements."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / instructed the critical reasoning class?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who instructed the critical reasoning class?",
            "Who was the logic professor?",
            "Who taught the course?"
          ],
          "nova_reply": "Mr. Arthur Pendelton, our school debate and logic coach."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / universal absolute claims dangerous in debate?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are universal absolute claims dangerous in debate?",
            "Why avoid words like 'all' and 'never'?",
            "Why are absolute claims risky?"
          ],
          "nova_reply": "Because an opponent needs only one single counterexample to disprove the entire claim."
        }
      ]
    },
    "table_b": {
      "title": "Professor Pendelton's Logic Guide",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Professor Pendelton",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / download the fallacy classification chart?",
          "cue_word": "where",
          "value": "From the school debate club study page.",
          "nova_question": "Where can students download the fallacy classification chart?",
          "acceptable_answers": [
            "From the school debate club study page.",
            "From the debate club page.",
            "School debate club page."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / three essential qualifiers recommended?",
          "cue_word": "what",
          "value": "'Some', 'often', and 'tend to' for fair claims.",
          "nova_question": "What three essential qualifiers are recommended?",
          "acceptable_answers": [
            "'Some', 'often', and 'tend to' for fair claims.",
            "'Some', 'often', and 'tend to'.",
            "Some, often, tend to."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / test if an argument is sound?",
          "cue_word": "how",
          "value": "Check that all starting facts are true and every logic step is valid.",
          "nova_question": "How do debaters test whether an argument is sound?",
          "acceptable_answers": [
            "Check that all starting facts are true and every logic step is valid.",
            "Check true facts and valid logic steps.",
            "Test true starting facts and logic."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / wrote the early rules of step-by-step logic?",
          "cue_word": "who",
          "value": "Aristotle wrote the early rules of step-by-step logic.",
          "nova_question": "Who wrote the early rules of step-by-step logic?",
          "acceptable_answers": [
            "Aristotle wrote the early rules of step-by-step logic.",
            "Aristotle.",
            "Ancient thinker Aristotle."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / critical thinking essential for democratic citizens?",
          "cue_word": "why",
          "value": "To check claims fairly and spot tricky ads or rumors.",
          "nova_question": "Why is critical thinking essential for democratic citizens?",
          "acceptable_answers": [
            "To check claims fairly and spot tricky ads or rumors.",
            "To check claims fairly and avoid tricks.",
            "To spot unfair tricks."
          ]
        }
      ]
    }
  }
};

export default speakingHubData;
