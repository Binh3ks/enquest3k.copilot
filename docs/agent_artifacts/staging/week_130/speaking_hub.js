/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 130 | Theme: "Opinion Project 3: Comparing Global Approaches" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.865Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 130,
  "theme": "Opinion Project 3: Comparing Global Approaches",
  "cefr_level": "B1+ Academic",
  "talkshow_prompt": {
    "topic": "Synthesizing Comparative Legal Frameworks on Student Mobile Devices",
    "question": "Chloe, how does examining international laws help educators design better technology policies?",
    "model_response": "Examining international models allows us to see theoretical ideas tested in real classrooms! France tested an absolute centralized prohibition, demonstrating that removing phones dramatically reduces hallway drama and cyberbullying. Meanwhile, Florida tested a targeted statute focusing specifically on addictive social media algorithms while preserving educational technology. Comparing these frameworks gives school districts proven data to build balanced, enforceable policies!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Chloe's Comparative Policy Matrix",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Chloe",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / French national legislation debated?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the French national legislation debated?",
            "Where was the legislation debated?",
            "Where did French lawmakers debate the law?"
          ],
          "nova_reply": "The legislation was debated in the National Assembly in Paris."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / penalty for unauthorized phone use in France?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is the penalty for unauthorized phone use in France?",
            "What happens if a student uses a phone?",
            "What is the penalty?"
          ],
          "nova_reply": "Confiscation of the device until the end of the school day."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / students affected by Florida statute?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many students are affected by the Florida statute?",
            "How many students does the law cover?",
            "What is the student population affected?"
          ],
          "nova_reply": "Approximately two point eight million public school students across the state."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / sponsors legal compliance audits in schools?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who sponsors legal compliance audits in schools?",
            "Who checks for compliance?",
            "Who conducts the audits?"
          ],
          "nova_reply": "State Department of Education compliance inspectors and local district officers."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / statutes include medical exemptions?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why do statutes include medical exemptions?",
            "Why are medical exemptions necessary?",
            "Why exempt health devices?"
          ],
          "nova_reply": "To protect students with diabetes who require continuous smartphone glucose monitoring."
        }
      ]
    },
    "table_b": {
      "title": "Inspector Laurent's Enforcement Protocol",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Inspector Laurent",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / store confiscated mobile devices?",
          "cue_word": "where",
          "value": "Inside secure fireproof administration lockboxes.",
          "nova_question": "Where are confiscated mobile devices stored?",
          "acceptable_answers": [
            "Inside secure fireproof administration lockboxes.",
            "In administrative lockboxes.",
            "In fireproof lockboxes."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / percentage of student compliance reported?",
          "cue_word": "what",
          "value": "Over ninety-two percent compliance within three months.",
          "nova_question": "What percentage of student compliance was reported?",
          "acceptable_answers": [
            "Over ninety-two percent compliance within three months.",
            "Over 92 percent.",
            "Ninety-two percent."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / teachers verify medical exemptions?",
          "cue_word": "how",
          "value": "Through registered digital health passes issued by school doctors.",
          "nova_question": "How do teachers verify medical exemptions?",
          "acceptable_answers": [
            "Through registered digital health passes issued by school doctors.",
            "With registered digital health passes.",
            "Through doctor health passes."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / drafted the model enforcement protocol?",
          "cue_word": "who",
          "value": "A joint commission of child psychologists, teachers, and legal scholars.",
          "nova_question": "Who drafted the model enforcement protocol?",
          "acceptable_answers": [
            "A joint commission of child psychologists, teachers, and legal scholars.",
            "A joint commission of experts.",
            "Psychologists, teachers, and scholars."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / centralized legislation easier to enforce?",
          "cue_word": "why",
          "value": "Because clear uniform rules eliminate subjective arguments at school gates.",
          "nova_question": "Why is centralized legislation easier to enforce?",
          "acceptable_answers": [
            "Because clear uniform rules eliminate subjective arguments at school gates.",
            "Uniform rules eliminate arguments.",
            "It creates clear uniform standards."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
