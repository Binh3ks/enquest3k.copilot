// Test Week 2 grammar rules
function getGrammarRules(weekId) {
  const GRAMMAR_RULES = {
    1: { name: 'Week 1-4: Present Simple Only' },
    5: { name: 'Week 5-14: Present Simple + Present Continuous' },
    15: { name: 'Week 15-28: Basic Past Tense' },
    29: { name: 'Week 29+: Advanced Grammar' }
  };
  
  if (weekId <= 4) return GRAMMAR_RULES[1];
  if (weekId <= 14) return GRAMMAR_RULES[5];
  if (weekId <= 28) return GRAMMAR_RULES[15];
  return GRAMMAR_RULES[29];
}

const week2Rules = getGrammarRules(2);
console.log(`Week 2 uses: ${week2Rules.name}`);
console.log(`Week 2 should ban past tense: ${week2Rules.name.includes('Present Simple Only') ? 'YES ✅' : 'NO ❌'}`);
