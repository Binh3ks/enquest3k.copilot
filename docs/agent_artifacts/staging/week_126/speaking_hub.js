/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 126 | Theme: "From Essay to Speech" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.826Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 126,
  "theme": "From Essay to Speech",
  "cefr_level": "B1+ Academic",
  "talkshow_prompt": {
    "topic": "Mastering the Art of Converting Essays into Speeches",
    "question": "Lucas, why is oral signposting more essential in spoken presentations than in written essays?",
    "model_response": "In a written essay, readers can glance at subheadings, check footnotes, or re-read confusing paragraphs at their own pace. But in an oral presentation, the audience hears your words only once in real time! Signposting markers like 'Moving on to our next question' or 'Turning our attention to the data' act as mental road signs. They prepare listeners for what comes next, keeping everyone united and engaged throughout the entire speech!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Lucas's Public Speaking Workshop",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Lucas",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / public speaking workshop held?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where is the public speaking workshop held?",
            "Where is the workshop?",
            "Where does Lucas attend the workshop?"
          ],
          "nova_reply": "The workshop is held in the university debate lecture auditorium."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / core skill taught this session?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is the core skill taught this session?",
            "What core skill do they learn?",
            "What is taught in the session?"
          ],
          "nova_reply": "Techniques for condensing essay paragraphs into keyword cue cards."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how long / each practice speech last?",
          "cue_word": "how long",
          "is_missing": true,
          "acceptable_questions": [
            "How long does each practice speech last?",
            "How long is each speech?",
            "What is the duration of the speech?"
          ],
          "nova_reply": "Each student delivers a timed five-minute presentation."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / coaches the students?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who coaches the students?",
            "Who is the speech coach?",
            "Who leads the training session?"
          ],
          "nova_reply": "Professor Elena Vance, a national collegiate debate champion."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / signpost markers essential?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are signpost markers essential?",
            "Why do speakers use signposting?",
            "Why is signposting important?"
          ],
          "nova_reply": "Because listeners cannot re-read spoken sentences and need verbal road signs."
        }
      ]
    },
    "table_b": {
      "title": "Elena's Oratory Masterclass",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Elena",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / speech rehearsal studio located?",
          "cue_word": "where",
          "value": "On the third floor of the civic arts center.",
          "nova_question": "Where is the speech rehearsal studio located?",
          "acceptable_answers": [
            "On the third floor of the civic arts center.",
            "At the civic arts center.",
            "Third floor of the civic arts center."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / maximum number of words per cue card?",
          "cue_word": "what",
          "value": "Six bullet point keywords to prevent verbatim reading.",
          "nova_question": "What is the maximum number of words per cue card?",
          "acceptable_answers": [
            "Six bullet point keywords to prevent verbatim reading.",
            "Six bullet point keywords.",
            "Six words per card."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / measure student speaking speed?",
          "cue_word": "how",
          "value": "Using a digital pacing monitor that tracks words per minute.",
          "nova_question": "How do coaches measure student speaking speed?",
          "acceptable_answers": [
            "Using a digital pacing monitor that tracks words per minute.",
            "With a digital pacing monitor.",
            "By tracking words per minute."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / evaluates the final presentations?",
          "cue_word": "who",
          "value": "A panel of three professional communications instructors.",
          "nova_question": "Who evaluates the final student presentations?",
          "acceptable_answers": [
            "A panel of three professional communications instructors.",
            "Three communications instructors.",
            "Professional instructors."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / include deliberate pauses in speeches?",
          "cue_word": "why",
          "value": "To let listeners process key ideas and to build dramatic focus.",
          "nova_question": "Why should speakers include deliberate pauses in speeches?",
          "acceptable_answers": [
            "To let listeners process key ideas and to build dramatic focus.",
            "To let listeners process ideas.",
            "To build dramatic focus and give listeners time."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
