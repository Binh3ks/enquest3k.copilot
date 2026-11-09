/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 42 | Theme: "The Water Journey (Cycle)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:07.330Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 42,
  "theme": "The Water Journey (Cycle)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "The Never-Ending Water Journey",
    "question": "Hello Noah! Can you explain the four main stages of the water cycle to our listeners?",
    "model_response": "Hello! First, the warm sun shines on lakes and oceans, causing evaporation. Next, invisible water vapor goes up into the cool sky and forms fluffy clouds. After that, when the clouds become heavy, rain comes down over the hills and forests. Finally, the rainwater collects into streams and rivers, flowing all the way back into the ocean. That is how nature recycles water every day!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Maya's Rain Cloud Experiment",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Maya",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / clouds form?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where do clouds form in the sky?",
            "Where do clouds form?",
            "Where are clouds made?"
          ],
          "nova_reply": "Clouds form high in the cool upper atmosphere when water vapor cools down."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / inside a cloud?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is inside a rain cloud?",
            "What is a cloud made of?",
            "What is inside it?"
          ],
          "nova_reply": "A cloud is made of millions of tiny condensed water droplets and ice particles."
        },
        {
          "id": "field_a3",
          "cue_prompt": "why / clouds turn dark gray?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why do clouds turn dark gray?",
            "Why are rain clouds gray?",
            "Why do they look dark?"
          ],
          "nova_reply": "They turn dark gray because they become packed with billions of heavy water drops that block the sunlight."
        },
        {
          "id": "field_a4",
          "cue_prompt": "when / rain come down?",
          "cue_word": "when",
          "is_missing": true,
          "acceptable_questions": [
            "When does rain come down from clouds?",
            "When does it start to rain?",
            "When do drops fall?"
          ],
          "nova_reply": "Rain comes down when water droplets grow too heavy to float in the sky."
        },
        {
          "id": "field_a5",
          "cue_prompt": "how / clouds float?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How do heavy clouds float in the air?",
            "How do clouds float?",
            "How do they stay up?"
          ],
          "nova_reply": "Rising currents of warm air push gently upward against the tiny droplets to keep them floating."
        }
      ]
    },
    "table_b": {
      "title": "Noah's Mountain Stream Project",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Noah",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / stream start?",
          "cue_word": "where",
          "value": "The stream starts high on the snowy rocky mountain peak.",
          "nova_question": "Where does Noah's mountain stream begin its journey?",
          "acceptable_answers": [
            "The stream starts high on the snowy rocky mountain peak.",
            "High on the snowy mountain peak.",
            "On the rocky mountain peak."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what direction / water flow?",
          "cue_word": "what direction",
          "value": "It flows steadily downhill through green valleys toward the river.",
          "nova_question": "What direction does the mountain stream water flow?",
          "acceptable_answers": [
            "It flows steadily downhill through green valleys toward the river.",
            "Downhill through green valleys.",
            "Downhill toward the river."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "why / stream water cold?",
          "cue_word": "why",
          "value": "Because it comes from melting winter snow and deep underground springs.",
          "nova_question": "Why is the mountain stream water so cold and fresh?",
          "acceptable_answers": [
            "Because it comes from melting winter snow and deep underground springs.",
            "It comes from melting snow.",
            "From melting winter snow and springs."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "where / river empty?",
          "cue_word": "where",
          "value": "The large river empties into the vast blue ocean along the coast.",
          "nova_question": "Where does the large river finally empty its water?",
          "acceptable_answers": [
            "The large river empties into the vast blue ocean along the coast.",
            "Into the vast blue ocean.",
            "Into the ocean along the coast."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "how many / fish live in stream?",
          "cue_word": "how many",
          "value": "Noah counted twenty-four silvery trout swimming in the clear pools.",
          "nova_question": "How many wild fish did Noah count in the stream pools?",
          "acceptable_answers": [
            "Noah counted twenty-four silvery trout swimming in the clear pools.",
            "Twenty-four silvery trout.",
            "Twenty-four fish."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
