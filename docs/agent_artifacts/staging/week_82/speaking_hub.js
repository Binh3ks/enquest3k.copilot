/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 82 | Theme: "ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.706Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 82,
  "theme": "ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data",
  "cefr_level": "B1 Preliminary",
  "talkshow_prompt": {
    "topic": "Crafting Travel Vlogs with Sensory Storytelling",
    "question": "Chloe, how do sensory adjectives make a travel vlog more captivating for your viewers?",
    "model_response": "Sensory adjectives turn a flat video into a multidimensional experience! When I describe the crisp mountain air on my skin, the sweet fragrance of wild pines, and the rich aroma of roasted coffee drifting through bustling alleys, viewers don't just watch the video—they feel like they are walking right beside me! Using all five senses creates genuine emotional connection and vivid memories!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Chloe's Mountain Sunrise Vlog",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Chloe",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / film the sunrise episode?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does Chloe film the sunrise episode?",
            "Where was the sunrise filmed?",
            "Where did she film the episode?"
          ],
          "nova_reply": "Chloe filmed the sunrise at the Jade Peak Observation Deck."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / camera lens used for landscape?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What camera lens was used for the landscape?",
            "What lens did she use?",
            "Which lens was used?"
          ],
          "nova_reply": "She used a wide-angle panoramic lens with a polarizing filter."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what time / reach the scenic summit?",
          "cue_word": "what time",
          "is_missing": true,
          "acceptable_questions": [
            "What time did she reach the scenic summit?",
            "What time did she arrive?",
            "When did she reach the summit?"
          ],
          "nova_reply": "She reached the summit at five-thirty in the morning before sunrise."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / composed the acoustic background music?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who composed the acoustic background music?",
            "Who made the music?",
            "Who wrote the soundtrack?"
          ],
          "nova_reply": "Her musical partner Liam composed the gentle acoustic guitar track."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / sensory narration so popular?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why is sensory narration so popular?",
            "Why do viewers love sensory narration?",
            "Why is it popular with viewers?"
          ],
          "nova_reply": "Because vivid sensory descriptions make viewers feel like they are traveling too."
        }
      ]
    },
    "table_b": {
      "title": "Liam's Coastal Harbor Episode",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Liam",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / coastal fishing village located?",
          "cue_word": "where",
          "value": "In St. Ives Harbor on the southwestern coast of England.",
          "nova_question": "Where is the coastal fishing village located?",
          "acceptable_answers": [
            "In St. Ives Harbor on the southwestern coast of England.",
            "In St. Ives Harbor.",
            "Southwestern coast of England."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / sounds recorded in the harbor?",
          "cue_word": "what",
          "value": "Calling seabirds, lapping waves, and distant church bells.",
          "nova_question": "What ambient sounds were recorded in the harbor?",
          "acceptable_answers": [
            "Calling seabirds, lapping waves, and distant church bells.",
            "Seabirds, waves, and church bells.",
            "Lapping waves and bells."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / record sound in windy weather?",
          "cue_word": "how",
          "value": "By attaching a furry directional windscreen over the microphone.",
          "nova_question": "How did Liam capture clear audio in windy weather?",
          "acceptable_answers": [
            "By attaching a furry directional windscreen over the microphone.",
            "With a windscreen over the microphone.",
            "Using a directional windscreen."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / guided the walking tour?",
          "cue_word": "who",
          "value": "Captain Donald, a retired local fishing harbor master.",
          "nova_question": "Who guided the team through the historic fishing alleys?",
          "acceptable_answers": [
            "Captain Donald, a retired local fishing harbor master.",
            "Captain Donald.",
            "A retired local harbor master."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / harbor sunset so picturesque?",
          "cue_word": "why",
          "value": "Because golden light reflects off calm water and pastel cottages.",
          "nova_question": "Why was the harbor sunset especially picturesque?",
          "acceptable_answers": [
            "Because golden light reflects off calm water and pastel cottages.",
            "Golden light reflects off water and cottages.",
            "Because of golden water reflections."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
