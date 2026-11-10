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
    "question": "Hannah, why does citing precise statistics carry far more weight than sharing personal anecdotes?",
    "model_response": "Personal stories are emotionally moving, but they represent the experience of only one individual! In contrast, when you say: 'According to a survey of two thousand students, seventy percent play cooperatively and only twelve percent experience sleep deficits,' you are describing the broader population! Precise quantitative statistics provide verifiable proof that stops opponents from dismissing your argument as mere personal bias!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Hannah's Adolescent Gaming Survey",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Hannah",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / adolescent gaming survey conducted?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the adolescent gaming survey conducted?",
            "Where was the survey held?",
            "Where did Hannah conduct the gaming survey?"
          ],
          "nova_reply": "Across fifteen public middle schools in the Greater Boston metropolitan district."
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
          "nova_reply": "Because verified metrics substantiate claims and withstand critical cross-examination."
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
          "value": "On the university's open-access empirical research repository.",
          "nova_question": "Where is the research dataset archived?",
          "acceptable_answers": [
            "On the university's open-access empirical research repository.",
            "In the open-access repository.",
            "University empirical repository."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / percentage of gamers play cooperative titles?",
          "cue_word": "what",
          "value": "Sixty-eight percent report playing team-based cooperative games.",
          "nova_question": "What percentage of gamers play cooperative titles?",
          "acceptable_answers": [
            "Sixty-eight percent report playing team-based cooperative games.",
            "Sixty-eight percent.",
            "68 percent."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / researchers ensure demographic sample validity?",
          "cue_word": "how",
          "value": "By applying stratified random sampling across diverse income brackets.",
          "nova_question": "How did researchers ensure demographic sample validity?",
          "acceptable_answers": [
            "By applying stratified random sampling across diverse income brackets.",
            "Through stratified random sampling.",
            "Stratified random sampling across income brackets."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / funded the longitudinal study?",
          "cue_word": "who",
          "value": "The National Science Foundation and the Children's Health Foundation.",
          "nova_question": "Who funded the longitudinal study?",
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
          "value": "To prevent faulty assumptions about what directly creates sleep deficits.",
          "nova_question": "Why must researchers distinguish between correlation and causation?",
          "acceptable_answers": [
            "To prevent faulty assumptions about what directly creates sleep deficits.",
            "To avoid faulty causal assumptions.",
            "To prevent assuming gaming causes all sleep deficits."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
