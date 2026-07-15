/**
 * Vocabulary Validator for Roleplay Scenarios
 * 
 * Validates that roleplay scenarios only use vocabulary from cumulative list
 * (all words taught in current and previous weeks)
 * 
 * @module vocabValidator
 * @version 1.0
 * @created 2026-02-11
 */

/**
 * Build cumulative vocabulary list up to specified week
 * @param {number} weekNumber - Current week number
 * @param {Object[]} allWeeksData - Array of week data objects
 * @returns {string[]} Array of cumulative vocabulary words (lowercase)
 */
export function buildCumulativeVocab(weekNumber, allWeeksData) {
  const cumulativeWords = new Set();
  
  // Collect target_vocab from Week 1 to current week
  for (let i = 1; i <= weekNumber; i++) {
    const weekData = allWeeksData.find(w => w.week_id === i || w.week_number === i);
    
    if (weekData?.target_vocab) {
      weekData.target_vocab.forEach(vocabItem => {
        const word = vocabItem.word || vocabItem.text;
        if (word) {
          cumulativeWords.add(word.toLowerCase());
        }
      });
    }
    
    // Also include word_power if exists
    if (weekData?.word_power?.words) {
      weekData.word_power.words.forEach(vocabItem => {
        const word = vocabItem.word || vocabItem.text;
        if (word) {
          cumulativeWords.add(word.toLowerCase());
        }
      });
    }
  }
  
  return Array.from(cumulativeWords).sort();
}

/**
 * Validate roleplay scenario vocabulary against cumulative list
 * @param {Object} scenario - Roleplay scenario object
 * @param {string[]} cumulativeVocab - Cumulative vocabulary list
 * @returns {Object} Validation result {valid: boolean, invalidWords: string[], coverage: number}
 */
export function validateRoleplayVocab(scenario, cumulativeVocab) {
  if (!scenario.vocab_focus || scenario.vocab_focus.length === 0) {
    return {
      valid: true,
      invalidWords: [],
      coverage: 1.0,
      message: 'No vocab_focus specified - skipping validation'
    };
  }
  
  const vocabSet = new Set(cumulativeVocab.map(w => w.toLowerCase()));
  const invalidWords = [];
  
  scenario.vocab_focus.forEach(word => {
    const wordLower = word.toLowerCase();
    if (!vocabSet.has(wordLower)) {
      invalidWords.push(word);
    }
  });
  
  const coverage = (scenario.vocab_focus.length - invalidWords.length) / scenario.vocab_focus.length;
  
  return {
    valid: invalidWords.length === 0,
    invalidWords,
    coverage,
    totalWords: scenario.vocab_focus.length,
    validWords: scenario.vocab_focus.length - invalidWords.length,
    message: invalidWords.length === 0 
      ? `✅ All ${scenario.vocab_focus.length} words validated`
      : `⚠️ ${invalidWords.length}/${scenario.vocab_focus.length} words not in cumulative vocab`
  };
}

/**
 * Validate all roleplay scenarios in week data
 * @param {Object} weekData - Week data containing roleplay_scenarios
 * @param {number} weekNumber - Current week number
 * @param {Object[]} allWeeksData - All weeks data for cumulative vocab
 * @returns {Object} Validation results for all scenarios
 */
export function validateWeekRoleplays(weekData, weekNumber, allWeeksData) {
  const scenarios = weekData?.roleplay_scenarios || [];
  
  if (scenarios.length === 0) {
    return {
      weekNumber,
      valid: true,
      message: 'No roleplay scenarios found',
      scenarios: []
    };
  }
  
  const cumulativeVocab = buildCumulativeVocab(weekNumber, allWeeksData);
  console.log(`📚 Week ${weekNumber} cumulative vocab:`, cumulativeVocab.length, 'words');
  
  const results = scenarios.map(scenario => {
    const validation = validateRoleplayVocab(scenario, cumulativeVocab);
    return {
      id: scenario.id,
      title: scenario.title,
      ...validation
    };
  });
  
  const allValid = results.every(r => r.valid);
  const totalInvalidWords = results.reduce((sum, r) => sum + r.invalidWords.length, 0);
  
  return {
    weekNumber,
    valid: allValid,
    cumulativeVocabCount: cumulativeVocab.length,
    scenarioCount: scenarios.length,
    totalInvalidWords,
    scenarios: results,
    message: allValid 
      ? `✅ All ${scenarios.length} scenarios use valid cumulative vocab`
      : `⚠️ ${totalInvalidWords} invalid words found across ${scenarios.length} scenarios`
  };
}

/**
 * Get vocabulary suggestions for invalid words
 * @param {string[]} invalidWords - Words not in cumulative vocab
 * @param {string[]} cumulativeVocab - Available cumulative vocabulary
 * @returns {Object} Suggestions for each invalid word
 */
export function getSuggestionsForInvalidWords(invalidWords, cumulativeVocab) {
  const suggestions = {};
  
  invalidWords.forEach(invalidWord => {
    const similar = cumulativeVocab.filter(validWord => {
      // Simple similarity: starts with same letter or contains substring
      return validWord[0] === invalidWord[0].toLowerCase() ||
             validWord.includes(invalidWord.toLowerCase()) ||
             invalidWord.toLowerCase().includes(validWord);
    }).slice(0, 3); // Top 3 suggestions
    
    suggestions[invalidWord] = similar.length > 0 
      ? similar 
      : ['(no similar words found - consider teaching this word earlier)'];
  });
  
  return suggestions;
}

/**
 * Generate vocab validation report for console
 * @param {Object} validationResult - Result from validateWeekRoleplays
 */
export function logValidationReport(validationResult) {
  console.log('\n' + '='.repeat(60));
  console.log(`📊 VOCAB VALIDATION REPORT - WEEK ${validationResult.weekNumber}`);
  console.log('='.repeat(60));
  console.log(`Cumulative Vocab: ${validationResult.cumulativeVocabCount} words`);
  console.log(`Scenarios: ${validationResult.scenarioCount}`);
  console.log(`Status: ${validationResult.message}\n`);
  
  validationResult.scenarios.forEach(scenario => {
    const icon = scenario.valid ? '✅' : '⚠️';
    console.log(`${icon} ${scenario.title} (${scenario.id})`);
    console.log(`   ${scenario.message}`);
    
    if (!scenario.valid && scenario.invalidWords.length > 0) {
      console.log(`   Invalid words: ${scenario.invalidWords.join(', ')}`);
    }
  });
  
  console.log('='.repeat(60) + '\n');
}

/**
 * Extract vocabulary from guide_rules text (helper function)
 * @param {string} guideRules - Guide rules text
 * @returns {string[]} Extracted vocabulary words
 */
export function extractVocabFromGuideRules(guideRules) {
  const words = [];
  
  // Simple regex to find words in context (between quotes or after colons)
  const patterns = [
    /"([a-z]+)"/gi,           // Words in quotes
    /'([a-z]+)'/gi,           // Words in single quotes
    /Focus:\s*([a-z,\s]+)/gi, // After "Focus:"
    /TOPIC:\s*([a-z,\s]+)/gi  // After "TOPIC:"
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(guideRules)) !== null) {
      const extracted = match[1].split(/[,\s]+/).filter(w => w.length > 2);
      words.push(...extracted);
    }
  });
  
  return [...new Set(words)]; // Remove duplicates
}
