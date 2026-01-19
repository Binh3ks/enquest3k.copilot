/**
 * WEEK TEMPLATE - Week 4+ Format (question_variants)
 * 
 * Purpose: Empty skeleton for AI to fill content
 * AI can ONLY fill ${PLACEHOLDERS}, cannot change structure
 * 
 * Key difference from canonical format:
 * - question_variants (3 per objective) instead of canonical_question
 * - scrambled_hints instead of individual words
 * - student_question_invitation included
 * 
 * Usage: Copy this template → Replace placeholders with spec data → AI fills content
 */

const weekTemplate = {
  // === METADATA (AUTO-FILL FROM SPEC) ===
  week_id: ${WEEK_ID},
  phase: ${PHASE},
  block: "${BLOCK}",
  unit: ${UNIT},
  week_number: ${WEEK_NUMBER},
  
  // === TITLES (AUTO-FILL FROM SPEC) ===
  title: "${TITLE_EN}",
  week_title_en: "${TITLE_EN}",
  week_title_vi: "${TITLE_VI}",
  
  topic: "${TOPIC_EN}",
  topic_vi: "${TOPIC_VI}",
  
  // === LEARNING OUTCOME (AI FILL) ===
  learning_outcome: "",  // AI: Write what students will achieve this week
  learning_outcome_vi: "",  // AI: Translate to Vietnamese
  
  // === GRAMMAR (AUTO-FILL FROM SPEC) ===
  grammar_focus: "${GRAMMAR_FOCUS}",
  grammar_pattern: "${GRAMMAR_PATTERN}",
  grammar_examples: [
    // AI: Generate 4 natural examples using grammar_pattern
    "",
    "",
    "",
    ""
  ],
  
  // === TARGET VOCABULARY (AUTO-FILL STRUCTURE, AI FILLS DEFINITIONS) ===
  target_vocab: [
    ${TARGET_VOCAB_ARRAY}
    // Each word MUST be object (not string):
    // {
    //   word: "happy",  // FROM SPEC
    //   pronunciation: "/ˈhæpi/",  // AI FILL
    //   definition_vi: "vui vẻ",  // AI FILL
    //   definition_en: "feeling very good and joyful",  // AI FILL
    //   example: "I am happy today.",  // AI FILL (use grammar_pattern)
    //   syllabus_context: "Emotions"  // AI FILL
    // }
  ],
  
  // === STORY MISSIONS (AI FILL CONTENT, LOCKED STRUCTURE) ===
  story_missions: [
    {
      mission_id: 1,
      mission_title_en: "",  // AI: Create engaging title related to topic
      mission_title_vi: "",  // AI: Translate
      theme: "",  // AI: One-word theme (e.g., "Identity", "Emotions")
      
      objectives: [
        // AI: Generate ${OBJECTIVES_COUNT_M1} objectives
        {
          stepKey: "",  // AI: lowercase_snake_case (e.g., "express_emotion")
          category: "",  // AI: Group name (e.g., "Emotions")
          
          // WEEK 4+ FORMAT: question_variants (3 variants)
          question_variants: [
            {
              text: "",  // AI: Natural question variant 1 (6-10 words for A0++)
              scrambled_hints: [
                // AI: Full sentence scrambled into 6-8 words
                // Example: ["happy", "I", "am", "today", "very"]
              ]
            },
            {
              text: "",  // AI: Natural question variant 2 (slightly different)
              scrambled_hints: [
                // AI: Different scrambled sentence
              ]
            },
            {
              text: "",  // AI: Natural question variant 3 (slightly different)
              scrambled_hints: [
                // AI: Different scrambled sentence
              ]
            }
          ],
          
          target_keywords: [
            // AI: 2-4 words student must use (must be in target_vocab)
          ],
          
          ack_options: [
            // AI: Exactly 3 acknowledgments
            "",
            "",
            ""
          ],
          
          recast_templates: [
            // AI: 2 templates for reformulating student answer
            // Use {placeholder} for student's words
            "",
            ""
          ],
          
          success_criteria: ""  // AI: When to move to next objective
        }
        // ... repeat for ${OBJECTIVES_COUNT_M1} objectives
      ],
      
      // WEEK 4+ FEATURE: Student Question Invitation
      student_question_invitation: {
        type: "invitation",
        turn_trigger: 4,  // After 4 turns
        invitation_text: "",  // AI: Natural invitation (e.g., "Do you have any questions for me?")
        allow_skip: true
      },
      
      minimum_turns: ${MIN_TURNS},  // Week 4+: 12
      maximum_turns: ${MAX_TURNS}   // Week 4+: 15
    },
    
    {
      mission_id: 2,
      mission_title_en: "",
      mission_title_vi: "",
      theme: "",
      objectives: [
        // AI: Generate ${OBJECTIVES_COUNT_M2} objectives
      ],
      student_question_invitation: {
        type: "invitation",
        turn_trigger: 5,
        invitation_text: "",
        allow_skip: true
      },
      minimum_turns: ${MIN_TURNS},
      maximum_turns: ${MAX_TURNS}
    },
    
    {
      mission_id: 3,
      mission_title_en: "",
      mission_title_vi: "",
      theme: "",
      objectives: [
        // AI: Generate ${OBJECTIVES_COUNT_M3} objectives
      ],
      student_question_invitation: {
        type: "invitation",
        turn_trigger: 6,
        invitation_text: "",
        allow_skip: true
      },
      minimum_turns: ${MIN_TURNS},
      maximum_turns: ${MAX_TURNS}
    }
  ]
};

export default weekTemplate;

/**
 * VALIDATION CHECKLIST (AI must verify):
 * 
 * ✅ All target_vocab are OBJECTS (not strings) with 6 fields
 * ✅ All target_keywords exist in target_vocab
 * ✅ Grammar examples use only allowed grammar (from spec)
 * ✅ Sentence length matches CEFR level (6-10 words for A0++)
 * ✅ Exactly 3 missions with correct objective counts
 * ✅ Each objective has exactly 3 question_variants
 * ✅ Each variant has scrambled_hints (full sentence, 6-8 words)
 * ✅ student_question_invitation exists in all missions
 * ✅ All ack_options are exactly 3
 * ✅ recast_templates use {placeholders}
 * ✅ minimum_turns = 12, maximum_turns = 15 (Week 4+)
 */
