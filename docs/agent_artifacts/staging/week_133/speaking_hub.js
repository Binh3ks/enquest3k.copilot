/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 133 | Theme: "Astrophysics: Black Holes, Galaxies & Gravity" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.318Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 133,
  "theme": "Astrophysics: Black Holes, Galaxies & Gravity",
  "cefr_level": "B2 First",
  "talkshow_prompt": {
    "topic": "Black Holes and the Validation of General Relativity",
    "question": "Dr. Sagan-Smith, how do gravitational wave detections confirm Einstein's century-old predictions regarding black holes?",
    "model_response": "The observed gravitational wave frequency spikes could not have been produced by ordinary matter; they must have originated from the violent orbital decay and merger of two supermassive black holes! For decades, black holes existed primarily as mathematical singularities in Einstein's equations. Detecting gravitational ripples that traveled across billions of light-years provides irrefutable empirical proof that massive objects warp spacetime geometry exactly as general relativity predicts."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Dr. Carl Sagan-Smith's Gravitational Observatory",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Carl",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / observatory situated?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where is the observatory situated?",
            "Where is the gravitational observatory located?",
            "Where was it built?"
          ],
          "nova_reply": "The laser interferometer observatory is situated in the high desert of Eastern Washington state."
        },
        {
          "id": "field_a2",
          "cue_prompt": "how far / colliding black holes?",
          "cue_word": "how far",
          "is_missing": true,
          "acceptable_questions": [
            "How far away were the colliding black holes?",
            "How distant was the merger?",
            "What was the distance to the black holes?"
          ],
          "nova_reply": "The black hole merger occurred approximately one point three billion light-years from Earth."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what mass / black holes possessed?",
          "cue_word": "what mass",
          "is_missing": true,
          "acceptable_questions": [
            "What mass did the black holes possess?",
            "How heavy were the black holes?",
            "What was their solar mass?"
          ],
          "nova_reply": "The two merging black holes possessed twenty-nine and thirty-six solar masses respectively."
        },
        {
          "id": "field_a4",
          "cue_prompt": "why / lasers used in detector?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why are laser beams used in the detector?",
            "Why do they use lasers?",
            "Why are lasers needed in the interferometer?"
          ],
          "nova_reply": "Lasers measure infinitesimal spacetime length distortions smaller than one ten-thousandth the width of a proton."
        },
        {
          "id": "field_a5",
          "cue_prompt": "what award / researchers received?",
          "cue_word": "what award",
          "is_missing": true,
          "acceptable_questions": [
            "What award did the research team receive?",
            "Which award was granted?",
            "What prize was received?"
          ],
          "nova_reply": "The founding astrophysics research team received the Nobel Prize in Physics for the discovery."
        }
      ]
    },
    "table_b": {
      "title": "Zoe Vance's Radio Telescope Array",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Zoe",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / radio array located?",
          "cue_word": "where",
          "value": "At an elevation of five thousand meters on the Chajnantor Plateau in Chile.",
          "nova_question": "Where is Zoe's submillimeter radio telescope array located?",
          "acceptable_answers": [
            "At an elevation of five thousand meters on the Chajnantor Plateau in Chile.",
            "On the Chajnantor Plateau in Chile.",
            "In Chile at five thousand meters elevation."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "how many / radio antennas operating?",
          "cue_word": "how many",
          "value": "Sixty-six high-precision parabolic antennas operate together as an interferometer.",
          "nova_question": "How many radio antennas operate simultaneously in the network?",
          "acceptable_answers": [
            "Sixty-six high-precision parabolic antennas operate together as an interferometer.",
            "Sixty-six parabolic antennas.",
            "66 antennas."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "why / desert plateau chosen?",
          "cue_word": "why",
          "value": "Because extreme atmospheric aridity minimizes water vapor interference with cosmic signals.",
          "nova_question": "Why was this high desert plateau chosen for the observatory?",
          "acceptable_answers": [
            "Because extreme atmospheric aridity minimizes water vapor interference with cosmic signals.",
            "Extreme aridity minimizes water vapor interference.",
            "To avoid water vapor interference."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "what resolution / images achieved?",
          "cue_word": "what resolution",
          "value": "An angular resolution sufficient to read a newspaper in Paris from New York City.",
          "nova_question": "What extraordinary angular resolution can the combined array achieve?",
          "acceptable_answers": [
            "An angular resolution sufficient to read a newspaper in Paris from New York City.",
            "Sufficient to read a newspaper across the Atlantic.",
            "Extreme micro-arcsecond angular resolution."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "what target / currently observed?",
          "cue_word": "what target",
          "value": "The supermassive black hole Sagittarius A* at the center of the Milky Way.",
          "nova_question": "What celestial object is Zoe currently observing with the array?",
          "acceptable_answers": [
            "The supermassive black hole Sagittarius A* at the center of the Milky Way.",
            "Sagittarius A* at the center of the Milky Way.",
            "Sagittarius A*."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
