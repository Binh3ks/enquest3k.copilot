/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 127 | Theme: "Rebuttal Practice" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.855Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 127,
  "theme": "Rebuttal Practice",
  "cefr_level": "B1+ Academic",
  "talkshow_prompt": {
    "topic": "The Mechanics of Strategic Debate Rebuttals",
    "question": "Nora, why should debaters avoid simply repeating their original speech during a rebuttal round?",
    "model_response": "Simply repeating your original points signals to the judges that you did not listen to the debate! A true rebuttal must grapple directly with what your opponent just said. By using the 'They say... but I say...' formula, you prove you heard their point, identify their logical flaw, and deploy fresh evidence to dismantle their premise. That is what wins competitive debate rounds!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Nora's Tournament Debate Round",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Nora",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / tournament championship round held?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the tournament championship round held?",
            "Where was the debate round held?",
            "Where did the tournament take place?"
          ],
          "nova_reply": "The championship round took place in the grand hall of the city council."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / resolution debated by teams?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What was the resolution debated by teams?",
            "What was the debate topic?",
            "What resolution did they debate?"
          ],
          "nova_reply": "Whether governments should mandate 100 percent renewable energy by 2035."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how long / rebuttal speeches last?",
          "cue_word": "how long",
          "is_missing": true,
          "acceptable_questions": [
            "How long did rebuttal speeches last?",
            "What was the rebuttal time limit?",
            "How much time for rebuttals?"
          ],
          "nova_reply": "Each speaker had exactly four minutes to deliver their rebuttal."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / was Nora's debate partner?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who was Nora's debate partner?",
            "Who did Nora debate with?",
            "Who was her teammate?"
          ],
          "nova_reply": "Lucas, who specialized in economic and statistical arguments."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / judges praise Nora's rebuttal?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why did the judges praise Nora's rebuttal?",
            "Why did Nora receive high marks?",
            "Why was her rebuttal effective?"
          ],
          "nova_reply": "Because she directly dismantled the opposition's data without personal insults."
        }
      ]
    },
    "table_b": {
      "title": "Judge Miller's Adjudication Sheet",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Judge Miller",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / adjudication scores submitted?",
          "cue_word": "where",
          "value": "Through the tournament's official digital scoring portal.",
          "nova_question": "Where were the adjudication scores submitted?",
          "acceptable_answers": [
            "Through the tournament's official digital scoring portal.",
            "Through the digital scoring portal.",
            "Online scoring portal."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / main scoring criterion for rebuttals?",
          "cue_word": "what",
          "value": "Direct responsiveness to opponents' arguments and logical soundness.",
          "nova_question": "What was the main scoring criterion for rebuttals?",
          "acceptable_answers": [
            "Direct responsiveness to opponents' arguments and logical soundness.",
            "Direct responsiveness and logical soundness.",
            "Responsiveness and logic."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how many / points awarded for rebuttal clarity?",
          "cue_word": "how many",
          "value": "Twenty-five out of thirty possible points for argumentation.",
          "nova_question": "How many points were awarded for rebuttal clarity?",
          "acceptable_answers": [
            "Twenty-five out of thirty possible points for argumentation.",
            "Twenty-five points.",
            "25 out of 30."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / won the best speaker award?",
          "cue_word": "who",
          "value": "Nora received the award for her articulate cross-examination.",
          "nova_question": "Who won the best speaker award?",
          "acceptable_answers": [
            "Nora received the award for her articulate cross-examination.",
            "Nora.",
            "Nora won best speaker."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / debaters avoid personal attacks?",
          "cue_word": "why",
          "value": "Because personal attacks commit an ad hominem fallacy and lose points.",
          "nova_question": "Why must debaters avoid personal attacks?",
          "acceptable_answers": [
            "Because personal attacks commit an ad hominem fallacy and lose points.",
            "They commit a fallacy and lose points.",
            "Personal attacks are fallacious."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
