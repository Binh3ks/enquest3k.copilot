/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 70 | Theme: "ELA: Presentation \"My Green Idea\" / Math: Graph Review"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 70,
  "theme": "ELA: Presentation \"My Green Idea\" / Math: Graph Review",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute presentation pitching a green idea (solar panels, tree planting, or zero waste). Use discourse markers: 'First of all', 'Furthermore', and 'To conclude'.",
  "info_exchange_cards": {
    "title": "Benjamin and Harper's Green Presentation Exchange",
    "table_a": {
      "title": "Benjamin's Green School Speech",
      "person": "Benjamin",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / Benjamin's speech topic?",
          "cue_prompt": "what / Benjamin's speech topic?",
          "cue_word": "what",
          "is_missing": true,
          "value": "Solar water fountains for the school garden",
          "acceptable_questions": [
            "What is Benjamin's speech topic?",
            "What did Benjamin speak about?",
            "What was his green idea?"
          ],
          "nova_reply": "Benjamin's presentation was about building a solar-powered water fountain for birds."
        },
        {
          "id": "field_a2",
          "label": "what kind of graph / displayed?",
          "cue_prompt": "what kind of graph / displayed?",
          "cue_word": "what kind of graph",
          "is_missing": true,
          "value": "A bar graph comparing energy costs",
          "acceptable_questions": [
            "What kind of graph did he display?",
            "What chart was on his poster?",
            "What graph did Benjamin show?"
          ],
          "nova_reply": "He displayed a large bar graph comparing electric costs with solar energy savings."
        },
        {
          "id": "field_a3",
          "label": "how long / his speech lasted?",
          "cue_prompt": "how long / his speech lasted?",
          "cue_word": "how long",
          "is_missing": true,
          "value": "2 minutes long",
          "acceptable_questions": [
            "How long was his speech?",
            "How many minutes did he talk?",
            "What was the length of his talk?"
          ],
          "nova_reply": "His persuasive green speech lasted exactly 2 minutes on the stage."
        },
        {
          "id": "field_a4",
          "label": "where / speech delivered?",
          "cue_prompt": "where / speech delivered?",
          "cue_word": "where",
          "is_missing": true,
          "value": "In the school auditorium",
          "acceptable_questions": [
            "Where was his speech delivered?",
            "Where did Benjamin give the speech?",
            "Where was the green assembly held?"
          ],
          "nova_reply": "He delivered his speech in the school auditorium in front of third and fourth grade."
        },
        {
          "id": "field_a5",
          "label": "who / voted for his project?",
          "cue_prompt": "who / voted for his project?",
          "cue_word": "who",
          "is_missing": true,
          "value": "45 students and 3 teachers",
          "acceptable_questions": [
            "Who voted for his project?",
            "How many people voted for him?",
            "Who supported Benjamin's fountain?"
          ],
          "nova_reply": "Forty-five students and three teachers voted to build his solar fountain project."
        }
      ]
    },
    "table_b": {
      "title": "Harper's Tree Planting Presentation",
      "person": "Harper",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Harper's green proposal?",
          "cue_prompt": "what / Harper's green proposal?",
          "cue_word": "what",
          "is_missing": false,
          "value": "Planting 10 shade trees along the playground",
          "nova_question": "What was Harper's green proposal in her presentation?",
          "acceptable_answers": [
            "Planting 10 shade trees along the playground",
            "Planting 10 shade trees.",
            "Her proposal was planting 10 shade trees along the playground.",
            "Planting 10 trees"
          ]
        },
        {
          "id": "field_b2",
          "label": "what chart / Harper use?",
          "cue_prompt": "what chart / Harper use?",
          "cue_word": "what chart",
          "is_missing": false,
          "value": "A pictograph of tree seedlings",
          "nova_question": "What kind of chart did Harper use in her speech?",
          "acceptable_answers": [
            "A pictograph of tree seedlings",
            "A pictograph.",
            "She used a pictograph of tree seedlings.",
            "Tree pictograph"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / seedlings requested?",
          "cue_prompt": "how many / seedlings requested?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "10 oak seedlings",
          "nova_question": "How many oak seedlings did her team request?",
          "acceptable_answers": [
            "10 oak seedlings",
            "Ten oak seedlings",
            "They requested 10 oak seedlings.",
            "10 seedlings"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / presentation started?",
          "cue_prompt": "what time / presentation started?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 10:45 AM",
          "nova_question": "What time did Harper's presentation start?",
          "acceptable_answers": [
            "At 10:45 AM",
            "At 10:45",
            "It started at 10:45 AM.",
            "10:45 AM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / promised to donate seedlings?",
          "cue_prompt": "who / promised to donate seedlings?",
          "cue_word": "who",
          "is_missing": false,
          "value": "The local Oak Town Garden Club",
          "nova_question": "Who promised to donate the seedlings for the project?",
          "acceptable_answers": [
            "The local Oak Town Garden Club",
            "Oak Town Garden Club",
            "The local Garden Club did.",
            "Garden Club"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
