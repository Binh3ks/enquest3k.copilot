/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 125 | Theme: "Intro & Conclusion (Academic Essay Structure)" | CEFR: B1+ Academic
 * Generated: 2026-11-07T07:16:42.031Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 125,
  "theme": "Intro & Conclusion (Academic Essay Structure)",
  "cefr_level": "B1+ Academic",
  "talkshow_prompt": {
    "topic": "Academic Rhetoric: Crafting Concluding Syntheses",
    "question": "Julian, why do scholarly writing authorities urge researchers to provide an analytical synthesis rather than a simple summary in the essay conclusion?",
    "model_response": "A superficial summary merely reiterates previously stated points verbatim, offering negligible intellectual contribution. In contrast, a rigorous synthesis integrates disparate empirical evidence to reveal macro-level patterns and articulate actionable policy implications, thereby urging the academic community toward constructive intervention."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Julian's Academic Essay Architecture",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Seminar Chair",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "what / empirical methodology?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What primary empirical methodology did Julian deploy in his essay?",
            "What methodology did Julian use?",
            "Which research method was deployed?"
          ],
          "nova_reply": "Julian deployed a mixed-methods quantitative survey combined with qualitative case analyses."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how / formulate thesis?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How did Julian formulate his central thesis statement in the introduction?",
            "How did he state the thesis?",
            "How was the thesis constructed?"
          ],
          "nova_reply": "He formulated a precise, three-pronged debatable proposition positioned as the concluding sentence of paragraph one."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what / counterargument addressed?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What specific counterargument did Julian address in section three?",
            "What counterargument was discussed?",
            "Which counterargument did he refute?"
          ],
          "nova_reply": "He addressed fiscal concerns regarding high implementation overhead, refuting them through projected longitudinal savings."
        },
        {
          "id": "field_a4",
          "cue_prompt": "which / stance verbs employed?",
          "cue_word": "which",
          "is_missing": true,
          "acceptable_questions": [
            "Which authoritative stance verbs did Julian employ in his recommendations?",
            "Which stance verbs were used?",
            "What verbs did he use to recommend actions?"
          ],
          "nova_reply": "He employed authoritative stance verbs including 'urge', 'recommend', 'advocate', and 'demonstrate'."
        },
        {
          "id": "field_a5",
          "cue_prompt": "what / policy implications?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What future policy implications did the conclusion articulate?",
            "What implications were identified?",
            "What policy changes did he propose?"
          ],
          "nova_reply": "The conclusion urged governmental oversight bodies to mandate standardized critical-thinking assessments nationwide."
        }
      ]
    },
    "table_b": {
      "title": "Claire's Empirical Investigation",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Research Director",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "what / sample size?",
          "cue_word": "what",
          "value": "Over twelve hundred secondary school educators across six distinct educational districts.",
          "nova_question": "What was the sample size of Claire's empirical survey?",
          "acceptable_answers": [
            "Over twelve hundred secondary school educators across six distinct educational districts.",
            "Over twelve hundred educators across six districts.",
            "Twelve hundred teachers."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / research question?",
          "cue_word": "what",
          "value": "The long-term cognitive and pedagogical impacts of interdisciplinary inquiry curricula.",
          "nova_question": "What primary research question did her introduction investigate?",
          "acceptable_answers": [
            "The long-term cognitive and pedagogical impacts of interdisciplinary inquiry curricula.",
            "Long-term cognitive impacts of inquiry curricula.",
            "Pedagogical impacts of interdisciplinary curricula."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / establish transitions?",
          "cue_word": "how",
          "value": "By deploying conceptual transition markers systematically linked to her primary research hypothesis.",
          "nova_question": "How did Claire establish cohesive transitions between chapters?",
          "acceptable_answers": [
            "By deploying conceptual transition markers systematically linked to her primary research hypothesis.",
            "Through conceptual transition markers.",
            "By linking paragraphs to the central hypothesis."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "what reform / urge leaders?",
          "cue_word": "what",
          "value": "Mandatory professional development workshops and equitable institutional resource allocation.",
          "nova_question": "What reform did Claire's conclusion urge educational leaders to adopt?",
          "acceptable_answers": [
            "Mandatory professional development workshops and equitable institutional resource allocation.",
            "Mandatory professional development workshops.",
            "Equitable resource allocation and teacher workshops."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "how / resolve conflicting data?",
          "cue_word": "how",
          "value": "By identifying regional demographic variations as mediating factors rather than conflicting outcomes.",
          "nova_question": "How did her synthesis resolve conflicting survey data?",
          "acceptable_answers": [
            "By identifying regional demographic variations as mediating factors rather than conflicting outcomes.",
            "Through regional demographic analysis.",
            "By recognizing demographic variations as mediating factors."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
