/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 77 | Theme: "Social Studies/ELA: World Landmarks / Math: 3D Geometry" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.701Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 77,
  "theme": "Social Studies/ELA: World Landmarks / Math: 3D Geometry",
  "cefr_level": "B1 Preliminary",
  "talkshow_prompt": {
    "topic": "Describing Materials and Shapes in World Architecture",
    "question": "Architect Elena, how do adjectives of material and shape help engineers describe historic landmarks?",
    "model_response": "Adjectives of material and shape provide exact technical clarity! We say the Taj Mahal is made of polished white marble and shaped with a symmetrical bulbous dome. In contrast, the Eiffel Tower is made of puddle iron trusses shaped like a soaring four-legged pyramid. Describing both the substance and 3D geometry helps us understand how these historic structures bear immense physical loads!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Marcus's Roman Colosseum Model",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Marcus",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / Colosseum located?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where is the Roman Colosseum located?",
            "Where is the Colosseum?",
            "Where does the Colosseum stand?"
          ],
          "nova_reply": "The Colosseum stands in the historic center of Rome, Italy."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / primary material used?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What is the primary material used?",
            "What was it made of?",
            "What material did Romans use?"
          ],
          "nova_reply": "It was built from volcanic concrete, brick, and travertine stone."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how many / exterior arches per tier?",
          "cue_word": "how many",
          "is_missing": true,
          "acceptable_questions": [
            "How many exterior arches are on each tier?",
            "How many arches per tier?",
            "What is the number of arches?"
          ],
          "nova_reply": "There are eighty exterior arched entrances on each of the lower tiers."
        },
        {
          "id": "field_a4",
          "cue_prompt": "who / commissioned the amphitheater?",
          "cue_word": "who",
          "is_missing": true,
          "acceptable_questions": [
            "Who commissioned the amphitheater?",
            "Who ordered the building?",
            "Which emperor built it?"
          ],
          "nova_reply": "Emperor Vespasian commissioned the construction in 72 AD."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / elliptical shape beneficial?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why is the elliptical shape beneficial?",
            "Why build it as an ellipse?",
            "What is the advantage of the shape?"
          ],
          "nova_reply": "The elliptical shape gives every spectator an unobstructed view of the arena floor."
        }
      ]
    },
    "table_b": {
      "title": "Elena's Taj Mahal Marble Analysis",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Elena",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / Taj Mahal situated?",
          "cue_word": "where",
          "value": "On the southern bank of the Yamuna River in Agra.",
          "nova_question": "Where is the Taj Mahal located?",
          "acceptable_answers": [
            "On the southern bank of the Yamuna River in Agra.",
            "In Agra, India.",
            "On the bank of the Yamuna River."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / stone used for dome facade?",
          "cue_word": "what",
          "value": "High-grade Makrana white marble with inlaid semiprecious stones.",
          "nova_question": "What stone was used for the dome facade?",
          "acceptable_answers": [
            "High-grade Makrana white marble with inlaid semiprecious stones.",
            "Makrana white marble.",
            "White marble."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how tall / four corner minarets?",
          "cue_word": "how tall",
          "value": "Each cylindrical minaret stands forty meters tall.",
          "nova_question": "How tall are the four cylindrical corner minarets?",
          "acceptable_answers": [
            "Each cylindrical minaret stands forty meters tall.",
            "Forty meters tall.",
            "About forty meters."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "who / directed the stone artisans?",
          "cue_word": "who",
          "value": "Master architect Ustad Ahmad Lahori under Emperor Shah Jahan.",
          "nova_question": "Who directed the team of twenty thousand stone artisans?",
          "acceptable_answers": [
            "Master architect Ustad Ahmad Lahori under Emperor Shah Jahan.",
            "Ustad Ahmad Lahori.",
            "Architect Ustad Ahmad Lahori."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / minarets tilt slightly outward?",
          "cue_word": "why",
          "value": "So they fall away from the central dome during an earthquake.",
          "nova_question": "Why were the four minarets constructed with a slight outward tilt?",
          "acceptable_answers": [
            "So they fall away from the central dome during an earthquake.",
            "To protect the dome during an earthquake.",
            "So they fall away from the tomb."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
