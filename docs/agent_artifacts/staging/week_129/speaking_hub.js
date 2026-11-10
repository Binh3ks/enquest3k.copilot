/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 129 | Theme: "Opinion Project 3: Smartphones Under 12?" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.449Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 129,
  "theme": "Opinion Project 3: Smartphones Under 12?",
  "cefr_level": "B2 First",
  "talkshow_prompt": {
    "topic": "Evaluating Smartphone Policies for Middle School Students",
    "question": "Maya, how can families balance emergency safety with the psychological risks of smartphone overuse?",
    "model_response": "The solution lies in separating communication from social media entertainment! A child walking home from football practice needs a reliable way to call parents, but they do not need an unrestricted internet portal in their pocket twenty-four hours a day. Families can provide basic feature phones for emergency calling while keeping internet-connected tablets in shared family rooms. This ensures safety without sacrificing sleep or mental wellbeing!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Maya's Pediatric Screen Study",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Maya",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / pediatric sleep study conducted?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where was the pediatric sleep study conducted?",
            "Where was the study held?",
            "Where did researchers conduct the sleep study?"
          ],
          "nova_reply": "The study was conducted at the Children's Memorial Sleep Laboratory in Chicago."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / age group surveyed in research?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What age group was surveyed in the research?",
            "What ages were studied?",
            "Who participated in the survey?"
          ],
          "nova_reply": "Researchers tracked eight hundred students between ages nine and twelve."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / hours of screen time recorded daily?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many hours of screen time were recorded daily?",
            "How much screen time was tracked?",
            "What was the daily screen time average?"
          ],
          "nova_reply": "Participants logged an average of four and a half hours on personal screens daily."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / directed the developmental psychology team?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who directed the developmental psychology team?",
            "Who was the lead researcher?",
            "Who managed the study?"
          ],
          "nova_reply": "Dr. Sarah Lin, chief of developmental neurology at the institute."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / remove smartphones from bedrooms at night?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why remove smartphones from bedrooms at night?",
            "Why ban phones from bedrooms?",
            "Why is keeping phones outside bedrooms recommended?"
          ],
          "nova_reply": "Because blue light suppression delays melatonin production by nearly ninety minutes."
        }
      ]
    },
    "table_b": {
      "title": "Dr. Lin's Adolescent Wellness Guidelines",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Dr. Lin",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / publish the recommended guidelines?",
          "cue_word": "where",
          "value": "In the Journal of Adolescent Pediatric Medicine.",
          "nova_question": "Where were the recommended guidelines published?",
          "acceptable_answers": [
            "In the Journal of Adolescent Pediatric Medicine.",
            "In the Journal of Adolescent Medicine.",
            "Journal of Adolescent Pediatric Medicine."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / maximum recreational screen time recommended?",
          "cue_word": "what",
          "value": "Sixty to ninety minutes per day outside school work.",
          "nova_question": "What is the maximum recreational screen time recommended?",
          "acceptable_answers": [
            "Sixty to ninety minutes per day outside school work.",
            "Sixty to ninety minutes daily.",
            "60 to 90 minutes."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / parents verify app safety settings?",
          "cue_word": "how",
          "value": "Through built-in parental dashboard controls and shared passwords.",
          "nova_question": "How can parents verify app safety settings?",
          "acceptable_answers": [
            "Through built-in parental dashboard controls and shared passwords.",
            "With parental dashboard controls.",
            "Through shared passwords and parental controls."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / should be involved in setting family rules?",
          "cue_word": "who",
          "value": "Both parents and children should draft family tech agreements together.",
          "nova_question": "Who should be involved in setting family rules?",
          "acceptable_answers": [
            "Both parents and children should draft family tech agreements together.",
            "Both parents and children.",
            "Parents and kids together."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / prioritize outdoor physical exercise?",
          "cue_word": "why",
          "value": "Because natural sunlight and aerobic play regulate adolescent circadian rhythms.",
          "nova_question": "Why should families prioritize outdoor physical exercise?",
          "acceptable_answers": [
            "Because natural sunlight and aerobic play regulate adolescent circadian rhythms.",
            "It regulates circadian rhythms.",
            "Sunlight and aerobic play regulate circadian rhythms."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
