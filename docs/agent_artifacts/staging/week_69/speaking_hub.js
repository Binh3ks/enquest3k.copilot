/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 69 | Theme: "Science/ELA: Environmental Protection / Math: Line Plots"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 69,
  "theme": "Science/ELA: Environmental Protection / Math: Line Plots",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute speech encouraging people to adopt green habits. Use modal verbs like 'must', 'should', and 'ought to' to give persuasive advice.",
  "info_exchange_cards": {
    "title": "Lucas and Chloe's Earth Care Exchange",
    "table_a": {
      "title": "Lucas's Beach Cleanup Project",
      "person": "Lucas",
      "fields": [
        {
          "id": "field_a1",
          "label": "where / cleanup project?",
          "cue_prompt": "where / cleanup project?",
          "cue_word": "where",
          "is_missing": true,
          "value": "At Sandy Cove Beach",
          "acceptable_questions": [
            "Where was the cleanup project?",
            "Where did Lucas clean up?",
            "What beach did he help clean?"
          ],
          "nova_reply": "Lucas organized a Saturday morning cleanup project at Sandy Cove Beach."
        },
        {
          "id": "field_a2",
          "label": "how many / volunteers joined?",
          "cue_prompt": "how many / volunteers joined?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "20 student volunteers",
          "acceptable_questions": [
            "How many volunteers joined?",
            "How many students helped?",
            "How many people came to help?"
          ],
          "nova_reply": "Twenty student volunteers came with gloves and blue bags to help clean."
        },
        {
          "id": "field_a3",
          "label": "what / most common trash?",
          "cue_prompt": "what / most common trash?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Plastic water bottles (75 collected)",
          "acceptable_questions": [
            "What was the most common trash?",
            "What did they pick up the most?",
            "What trash was most frequent on the plot?"
          ],
          "nova_reply": "Plastic water bottles were the most common trash, with 75 bottles collected."
        },
        {
          "id": "field_a4",
          "label": "what time / project finish?",
          "cue_prompt": "what time / project finish?",
          "cue_word": "what time",
          "is_missing": true,
          "value": "At 11:30 AM",
          "acceptable_questions": [
            "What time did the project finish?",
            "When was the cleanup over?",
            "What time did they pack up?"
          ],
          "nova_reply": "The beach cleanup finished at 11:30 AM before the sun grew too hot."
        },
        {
          "id": "field_a5",
          "label": "who / gave them recycling bins?",
          "cue_prompt": "who / gave them recycling bins?",
          "cue_word": "who",
          "is_missing": true,
          "value": "Ranger Dan from the park service",
          "acceptable_questions": [
            "Who gave them recycling bins?",
            "Who provided the bins?",
            "Who helped them sort the trash?"
          ],
          "nova_reply": "Park Ranger Dan provided 6 large blue recycling bins for the plastic and cans."
        }
      ]
    },
    "table_b": {
      "title": "Chloe's School Recycling Day",
      "person": "Chloe",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Chloe's school project?",
          "cue_prompt": "what / Chloe's school project?",
          "cue_word": "what",
          "is_missing": false,
          "value": "A classroom paper recycling drive",
          "nova_question": "What was Chloe's school project about?",
          "acceptable_answers": [
            "A classroom paper recycling drive",
            "Paper recycling drive.",
            "Her project was a paper recycling drive.",
            "Paper recycling"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / recycling bins placed?",
          "cue_prompt": "where / recycling bins placed?",
          "cue_word": "where",
          "is_missing": false,
          "value": "Outside each third-grade classroom",
          "nova_question": "Where were the recycling bins placed in the school?",
          "acceptable_answers": [
            "Outside each third-grade classroom",
            "Outside the classrooms.",
            "They were placed outside each classroom.",
            "Outside classrooms"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / kilograms collected?",
          "cue_prompt": "how many / kilograms collected?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "45 kilograms of paper",
          "nova_question": "How many kilograms of paper did students collect in one week?",
          "acceptable_answers": [
            "45 kilograms of paper",
            "Forty-five kilograms of paper",
            "They collected 45 kilograms.",
            "45 kg"
          ]
        },
        {
          "id": "field_b4",
          "label": "what day / collection held?",
          "cue_prompt": "what day / collection held?",
          "cue_word": "what day",
          "is_missing": false,
          "value": "Every Friday afternoon",
          "nova_question": "What day was the paper collected each week?",
          "acceptable_answers": [
            "Every Friday afternoon",
            "Friday afternoon.",
            "It was collected on Friday afternoons.",
            "Friday"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / weighed the paper bags?",
          "cue_prompt": "who / weighed the paper bags?",
          "cue_word": "who",
          "is_missing": false,
          "value": "Her science teacher Mr. Hall",
          "nova_question": "Who helped Chloe weigh the paper bags on the scale?",
          "acceptable_answers": [
            "Her science teacher Mr. Hall",
            "Mr. Hall",
            "Science teacher Mr. Hall helped her weigh them.",
            "Teacher Mr. Hall"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
