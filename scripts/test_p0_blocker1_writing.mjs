import { evaluateCambridgeCriteria } from '../src/utils/cambridgeCriteria.js';

const sampleText = "While Jake was walking in the corridor, a boy slipped on the wet floor. Jake called the school nurse right away.";

const wordCount = sampleText.trim().split(/\s+/).length;
const evalResult = evaluateCambridgeCriteria(sampleText, 33, { connectors: ['while', 'right away'] });

console.log('Sample Text:', sampleText);
console.log('Word Count:', wordCount);
console.log('Target Words:', evalResult.targetWords);
console.log('Met Words Requirement:', evalResult.metWords);
console.log('Connectors Found:', evalResult.connectorsFound);
console.log('Met Connectors Requirement:', evalResult.metConnectors);
console.log('Is All Met (Pass Cambridge Criteria):', evalResult.isAllMet);

if (evalResult.isAllMet && wordCount >= 20 && evalResult.targetWords === 20) {
  console.log('✅ P0 BLOCKER 1 VERIFIED: 22-word essay passes Cambridge criteria 100%!');
} else {
  console.error('❌ P0 BLOCKER 1 FAILED!');
  process.exit(1);
}
