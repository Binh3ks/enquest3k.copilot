/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 134 | Theme: "Economics & International Trade: Globalization" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.320Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 134,
  "theme": "Economics & International Trade: Globalization",
  "cefr_level": "B2 First",
  "talkshow_prompt": {
    "topic": "Debunking Protectionist Fallacies in Global Economics",
    "question": "Dr. Vance, why is the popular assumption that trade deficits destroy national wealth considered an economic fallacy?",
    "model_response": "The assumption that a trade deficit signifies economic failure is a widespread fallacy because it confuses accounting balances with economic health! A nation frequently imports more consumer and capital goods precisely because its domestic economy is booming and investment capital is pouring in from abroad. Whereas protectionist tariffs may offer fleeting benefits to select domestic lobbyists, they nevertheless penalize consumers and provoke retaliatory duties. Valid economic logic demonstrates that comparative advantage expands real living standards across trading partners."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Dr. Hannah Vance's Trade Logistics Analysis",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Hannah",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / seaport hub located?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where is the seaport logistics hub located?",
            "Where is the container terminal?",
            "Where was the study conducted?"
          ],
          "nova_reply": "The deepwater container terminal is located at the Port of Rotterdam in the Netherlands."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how many / containers processed annually?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many containers are processed annually?",
            "How many containers pass through?",
            "What is the annual container volume?"
          ],
          "nova_reply": "The terminal processes fourteen million twenty-foot equivalent container units each year."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what tariff / reduction agreed?",
          "cue_word": "what tariff",
          "is_missing": true,
          "acceptable_questions": [
            "What tariff reduction was agreed in the accord?",
            "What was the tariff reduction?",
            "How much were tariffs reduced?"
          ],
          "nova_reply": "Member nations agreed to reduce industrial component tariffs by four point five percent."
        },
        {
          "id": "field_a4",
          "cue_prompt": "why / trade deficit fears unfounded?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are trade deficit fears unfounded?",
            "Why is the deficit fear a fallacy?",
            "Why are deficit fears invalid?"
          ],
          "nova_reply": "Because inward foreign capital investment completely balanced the current account deficit."
        },
        {
          "id": "field_a5",
          "cue_prompt": "when / treaty take effect?",
          "cue_word": "when",
          "is_missing": true,
          "acceptable_questions": [
            "When will the multilateral treaty take effect?",
            "When does the accord begin?",
            "When will the treaty start?"
          ],
          "nova_reply": "The multilateral free trade accord takes full statutory effect on January first of next year."
        }
      ]
    },
    "table_b": {
      "title": "Oliver Sterling's Green Export Initiative",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Oliver",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / export delegation based?",
          "cue_word": "where",
          "value": "At the World Trade Center headquarters in Geneva, Switzerland.",
          "nova_question": "Where is Oliver's green export initiative delegation based?",
          "acceptable_answers": [
            "At the World Trade Center headquarters in Geneva, Switzerland.",
            "In Geneva, Switzerland.",
            "At the World Trade Center in Geneva."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what technology / exported globally?",
          "cue_word": "what technology",
          "value": "Next-generation solid-state batteries and wind turbine composite blades.",
          "nova_question": "What specific green technology does the initiative export globally?",
          "acceptable_answers": [
            "Next-generation solid-state batteries and wind turbine composite blades.",
            "Solid-state batteries and turbine blades.",
            "Battery and wind turbine technology."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how much / export volume grew?",
          "cue_word": "how much",
          "value": "Green technology export volume grew by twenty-eight percent over two fiscal quarters.",
          "nova_question": "By how much did export volume increase during the initiative?",
          "acceptable_answers": [
            "Green technology export volume grew by twenty-eight percent over two fiscal quarters.",
            "By twenty-eight percent.",
            "28 percent growth."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "why / transitional subsidies permitted?",
          "cue_word": "why",
          "value": "To allow nascent domestic clean industries to achieve economies of scale.",
          "nova_question": "Why are temporary transitional subsidies permitted under the agreement?",
          "acceptable_answers": [
            "To allow nascent domestic clean industries to achieve economies of scale.",
            "To achieve economies of scale.",
            "For clean industries to achieve economies of scale."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "how many / nations signed accord?",
          "cue_word": "how many",
          "value": "Thirty-four sovereign trading nations signed the environmental goods agreement.",
          "nova_question": "How many sovereign nations signed the final environmental goods agreement?",
          "acceptable_answers": [
            "Thirty-four sovereign trading nations signed the environmental goods agreement.",
            "Thirty-four nations.",
            "34 sovereign trading nations."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
