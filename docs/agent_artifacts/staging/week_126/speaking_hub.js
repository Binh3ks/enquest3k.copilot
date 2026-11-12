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
    "topic": "Turning a Written Essay into a Good Speech",
    "question": "Lucas, why are spoken signposts more helpful in a speech than in a written essay?",
    "model_response": "In a written essay, readers can look at headings or read hard parts again slowly. But in a speech, the audience hears your words only once! Spoken signpost phrases like 'Moving on to our next question' act like road signs so every listener can follow your talk."
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
          "nova_reply": "The workshop is held in the school speech hall."
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
          "nova_reply": "How to turn long essay paragraphs into short cue card notes."
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
          "nova_reply": "Coach Elena Vance, a two-time national school debate winner."
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
          "cue_prompt": "where / speech practice room located?",
          "cue_word": "where",
          "value": "On the third floor of the community arts center.",
          "nova_question": "Where is the speech practice room located?",
          "acceptable_answers": [
            "On the third floor of the community arts center.",
            "At the community arts center.",
            "Third floor of the community arts center."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / maximum number of words per cue card?",
          "cue_word": "what",
          "value": "Six short key words so speakers do not read word for word.",
          "nova_question": "What is the maximum number of words per cue card?",
          "acceptable_answers": [
            "Six short key words so speakers do not read word for word.",
            "Six short key words.",
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
          "value": "A team of three school speech teachers.",
          "nova_question": "Who evaluates the final student presentations?",
          "acceptable_answers": [
            "A team of three school speech teachers.",
            "Three speech teachers.",
            "School speech teachers."
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
