/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 78 | Theme: "Social Studies/ELA: Cultures / Math: Surveys" | CEFR: B1 PET
 * Generated: 2026-11-07T07:16:42.030Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 78,
  "theme": "Social Studies/ELA: Cultures / Math: Surveys",
  "cefr_level": "B1 PET",
  "talkshow_prompt": {
    "topic": "Cultural Traditions & School Survey Findings",
    "question": "Elena, based on your school survey, what key comparative insight did you discover between different harvest celebrations?",
    "model_response": "Our research revealed that similar to East Asian lantern festivals, European harvest home gatherings celebrate community solidarity and seasonal bounties. Unlike private modern holidays, traditional celebrations bring neighborhoods together into shared public spaces, whereas newer customs focus on intercultural education and unity."
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Mid-Autumn Festival Traditions",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Cultural Anthropologist",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "what / pastries share?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What symbolic pastries do families share during Mid-Autumn Festival?",
            "What pastries do they share?",
            "What food is shared during the festival?"
          ],
          "nova_reply": "Families share sweet round mooncakes symbolic of unity and completeness."
        },
        {
          "id": "field_a2",
          "cue_prompt": "where / carry lanterns?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where do children carry their colorful paper lanterns?",
            "Where do they carry lanterns?",
            "Where do children walk with lanterns?"
          ],
          "nova_reply": "Children parade their illuminated lanterns through neighborhood parks and streets."
        },
        {
          "id": "field_a3",
          "cue_prompt": "what / legend recount?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What legend is traditionally recounted during the full moon gathering?",
            "What story is told?",
            "What legend do they recount?"
          ],
          "nova_reply": "Elders recount the ancient legend of the Moon Goddess Chang'e and the Jade Rabbit."
        },
        {
          "id": "field_a4",
          "cue_prompt": "how / foster reunion?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How does the Mid-Autumn celebration foster family reunion?",
            "How does it bring families together?",
            "Why is reunion important?"
          ],
          "nova_reply": "Relatives travel from distant cities to share a banquet under the full autumn moon."
        },
        {
          "id": "field_a5",
          "cue_prompt": "is / widely celebrated?",
          "cue_word": "is",
          "is_missing": true,
          "acceptable_questions": [
            "Is the festival widely celebrated in rural agricultural communities?",
            "Is it widely celebrated?",
            "Where is the festival popular?"
          ],
          "nova_reply": "Yes, it enjoys widespread popularity across both rural villages and modern metropolitan cities."
        }
      ]
    },
    "table_b": {
      "title": "Dia de los Muertos Traditions",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Heritage Educator",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "what / symbolic flower?",
          "cue_word": "what",
          "value": "Bright yellow and orange marigold flowers.",
          "nova_question": "What symbolic flower is prominently displayed on altars?",
          "acceptable_answers": [
            "Bright yellow and orange marigold flowers.",
            "Marigold flowers.",
            "Yellow and orange marigolds."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "where / gather?",
          "cue_word": "where",
          "value": "At community cemeteries and decorative home altars.",
          "nova_question": "Where do families gather to honor their ancestral memories?",
          "acceptable_answers": [
            "At community cemeteries and decorative home altars.",
            "At cemeteries and home altars.",
            "At home altars."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "what / sweet bread?",
          "cue_word": "what",
          "value": "Pan de muerto, sweet bread dusted with anise and sugar.",
          "nova_question": "What traditional sweet bread is prepared for the holiday?",
          "acceptable_answers": [
            "Pan de muerto, sweet bread dusted with anise and sugar.",
            "Pan de muerto.",
            "Traditional sweet bread with anise."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "unlike funerals / atmosphere?",
          "cue_word": "unlike",
          "value": "A joyful and colorful atmosphere filled with music and storytelling.",
          "nova_question": "Unlike solemn funerals, what atmosphere characterizes the celebration?",
          "acceptable_answers": [
            "A joyful and colorful atmosphere filled with music and storytelling.",
            "A joyful and colorful atmosphere.",
            "Joyful with music and stories."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "when / processions occur?",
          "cue_word": "when",
          "value": "On the first and second days of November every year.",
          "nova_question": "When do the main ceremonial processions take place?",
          "acceptable_answers": [
            "On the first and second days of November every year.",
            "On November first and second.",
            "In early November."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
