/**
 * EngQuest3K Diagnostic Error Taxonomy Contracts
 * Milestone 0 Taxonomy Specifications for W33+ Architecture
 */

export const ERROR_TAXONOMY = {
  TYPE_A_VOCAB: {
    code: 'TYPE_A_VOCAB',
    label: 'Vocabulary & Lexical Chunk Error',
    description: 'Incorrect word selection or missing target chunk despite correct grammar syntax.',
    defaultTags: ['vocab_chunk_miss', 'missing_target_words']
  },
  TYPE_B_SYNTAX: {
    code: 'TYPE_B_SYNTAX',
    label: 'Grammar Syntax & Tense Error',
    description: 'Auxiliary verb omission (was/were), past continuous tense error, or word order error.',
    defaultTags: ['past_cont_missing_was', 'word_order_incorrect', 'syntax_error']
  },
  TYPE_C_SPELLING: {
    code: 'TYPE_C_SPELLING',
    label: 'Dictation & Spelling Error',
    description: 'Spelling mistake in dictation notes or typed story script.',
    defaultTags: ['spelling_error', 'minor_typo']
  },
  TYPE_D_RECEPTIVE: {
    code: 'TYPE_D_RECEPTIVE',
    label: 'Receptive Reading/Listening Error',
    description: 'Misunderstanding narrative detail or open cloze context despite knowing vocabulary.',
    defaultTags: ['cloze_context_mismatch', 'detail_comprehension_error']
  },
  TYPE_E_PRODUCTIVE: {
    code: 'TYPE_E_PRODUCTIVE',
    label: 'Productive Speaking/Writing Deficit',
    description: 'Speech shadowing hesitation, low speech fluency score, or text script word count deficit.',
    defaultTags: ['word_count_deficit', 'shadowing_fluency_low']
  },
  TYPE_F_QUESTION: {
    code: 'TYPE_F_QUESTION',
    label: 'Candidate Question Formation Error',
    description: 'Incorrect question structure or cue-card prompt formation in Speaking Part 2.',
    defaultTags: ['question_syntax_incorrect', 'cue_card_miss']
  }
};

/**
 * Classify attempt diagnostic tag into formal Error Taxonomy category
 * @param {string} diagnosticTag 
 * @returns {{ code: string, label: string, description: string }}
 */
export function classifyDiagnosticTag(diagnosticTag) {
  if (!diagnosticTag) {
    return ERROR_TAXONOMY.TYPE_A_VOCAB;
  }

  const tag = String(diagnosticTag).toLowerCase();

  if (tag.includes('question') || tag.includes('cue_card')) {
    return ERROR_TAXONOMY.TYPE_F_QUESTION;
  }
  if (tag.includes('past_cont') || tag.includes('syntax') || tag.includes('word_order')) {
    return ERROR_TAXONOMY.TYPE_B_SYNTAX;
  }
  if (tag.includes('spell') || tag.includes('typo')) {
    return ERROR_TAXONOMY.TYPE_C_SPELLING;
  }
  if (tag.includes('cloze') || tag.includes('detail') || tag.includes('reading') || tag.includes('listening')) {
    return ERROR_TAXONOMY.TYPE_D_RECEPTIVE;
  }
  if (tag.includes('fluency') || tag.includes('word_count') || tag.includes('speech') || tag.includes('writing')) {
    return ERROR_TAXONOMY.TYPE_E_PRODUCTIVE;
  }

  return ERROR_TAXONOMY.TYPE_A_VOCAB;
}

export default {
  ERROR_TAXONOMY,
  classifyDiagnosticTag
};
