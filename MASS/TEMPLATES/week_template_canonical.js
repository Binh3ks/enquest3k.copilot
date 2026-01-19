/**
 * WEEK TEMPLATE - Week 1-3 Format (canonical_question)
 * 
 * Purpose: Empty skeleton for AI to fill content
 * AI can ONLY fill ${PLACEHOLDERS}, cannot change structure
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
    // Each word will be:
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
      theme: "",  // AI: One-word theme (e.g., "Identity", "Greetings")
      
      objectives: [
        // AI: Generate ${OBJECTIVES_COUNT_M1} objectives
        {
          stepKey: "",  // AI: lowercase_snake_case (e.g., "ask_name")
          category: "",  // AI: Group name (e.g., "Introduction")
          
          // WEEK 1-3 FORMAT: canonical_question (ONE question)
          canonical_question: "",  // AI: Natural question (5-8 words for A0)
          
          // Hints: Individual words (5-6 words)
          hints: [
            // AI: Fill 5-6 individual words to help construct answer
            // Example: ["My", "name", "is", "I", "am"]
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
      
      minimum_turns: ${MIN_TURNS},
      maximum_turns: ${MAX_TURNS}
    },
    
    {
      mission_id: 2,
      mission_title_en: "",
      mission_title_vi: "",
      theme: "",
      objectives: [
        // AI: Generate ${OBJECTIVES_COUNT_M2} objectives
      ],
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
      minimum_turns: ${MIN_TURNS},
      maximum_turns: ${MAX_TURNS}
    }
  ]
};

export default weekTemplate;

/**
 * VALIDATION CHECKLIST (AI must verify):
 * 
 * ✅ All target_keywords exist in target_vocab
 * ✅ Grammar examples use only allowed grammar (from spec)
 * ✅ Sentence length matches CEFR level (5-8 words for A0)
 * ✅ Exactly 3 missions with correct objective counts
 * ✅ canonical_question is ONE question (not variants)
 * ✅ hints are individual words (not scrambled sentences)
 * ✅ All ack_options are exactly 3
 * ✅ recast_templates use {placeholders}
 */
