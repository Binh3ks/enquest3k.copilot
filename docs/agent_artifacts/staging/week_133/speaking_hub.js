/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 133 | Theme: "Deep Research & Data" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.872Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 133,
  "theme": "Deep Research & Data",
  "cefr_level": "B1+ Academic",
  "talkshow_prompt": {
    "topic": "Using Deep Research and Quantitative Data in Public Debate",
    "question": "Hannah, why are real survey statistics stronger than telling just one personal story?",
    "model_response": "Personal stories are interesting, but they only show one person's life! When you say: 'According to a survey of two thousand students, seventy percent play team games and only twelve percent lose sleep,' you describe the whole group. Clear number facts stop people from saying your idea is only a personal guess."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Hannah's Student Gaming Survey",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Hannah",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / student gaming survey done?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the student gaming survey done?",
            "Where was the survey held?",
            "Where did Hannah do the gaming survey?"
          ],
          "nova_reply": "Across fifteen middle schools in our city district."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / exact percentage of weekly gamers recorded?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is the exact percentage of weekly gamers recorded?",
            "What percent play weekly?",
            "What percentage was found?"
          ],
          "nova_reply": "Exactly seventy-one point four percent of respondents played weekly."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / total respondents completed questionnaires?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many total respondents completed questionnaires?",
            "How many students participated?",
            "What was the total sample size?"
          ],
          "nova_reply": "Two thousand four hundred and fifty verified student respondents."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / supervised statistical data analysis?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who supervised the statistical data analysis?",
            "Who was the data analyst?",
            "Who managed the statistics?"
          ],
          "nova_reply": "Dr. Marcus Thorne, chair of quantitative educational statistics."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / cite empirical data in debate speeches?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why cite empirical data in debate speeches?",
            "Why is data important in debates?",
            "Why use statistics in speaking?"
          ],
          "nova_reply": "Because checked numbers support claims and answer hard questions."
        }
      ]
    },
    "table_b": {
      "title": "Dr. Thorne's Statistical Fact Sheet",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Dr. Thorne",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / research dataset archived?",
          "cue_word": "where",
          "value": "On the school science club's public data page.",
          "nova_question": "Where is the research dataset archived?",
          "acceptable_answers": [
            "On the school science club's public data page.",
            "On the public data page.",
            "School data page."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / percent of gamers play team games?",
          "cue_word": "what",
          "value": "Sixty-eight percent say they play friendly team games.",
          "nova_question": "What percent of gamers play team games?",
          "acceptable_answers": [
            "Sixty-eight percent say they play friendly team games.",
            "Sixty-eight percent.",
            "68 percent."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / researchers pick a fair student group?",
          "cue_word": "how",
          "value": "By picking students at random from different schools and neighborhoods.",
          "nova_question": "How did researchers pick a fair student group?",
          "acceptable_answers": [
            "By picking students at random from different schools and neighborhoods.",
            "Random picking across different schools.",
            "Fair random student group."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / paid for the multi-year study?",
          "cue_word": "who",
          "value": "The National Science Foundation and the Children's Health Foundation.",
          "nova_question": "Who paid for the multi-year study?",
          "acceptable_answers": [
            "The National Science Foundation and the Children's Health Foundation.",
            "National Science Foundation.",
            "NSF and Children's Health Foundation."
          ]
        },
        {
          "id": "field_b5",
          "why": "why",
          "cue_prompt": "why / distinguish between correlation and causation?",
          "cue_word": "why",
          "value": "So we do not assume one habit directly causes every sleep problem.",
          "nova_question": "Why must researchers distinguish between correlation and causation?",
          "acceptable_answers": [
            "So we do not assume one habit directly causes every sleep problem.",
            "To avoid false cause guesses.",
            "To stop assuming gaming causes every sleep problem."
          ]
        }
      ]
    }
  }
};

export default speakingHubData;
