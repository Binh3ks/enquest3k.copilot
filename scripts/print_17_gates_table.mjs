import fs from 'fs';
import path from 'path';

// Target weeks: W40, W44, W47, W48, W49, W50, W51, W53, W54
const weeks = [40, 44, 47, 48, 49, 50, 51, 53, 54];
const allGates = [
  'GATE_1_SCHEMA_CONTRACT',
  'GATE_2_WORD_COUNT_SRS',
  'GATE_3_CLIL_RIGOR',
  'GATE_4_SHADOWING_IPA',
  'GATE_5_CAMBRIDGE_RW_GRADABLE',
  'GATE_6_MINIGAMES_INTEGRITY',
  'GATE_7_VIETNAMESE_LEAK_ZERO',
  'GATE_8_BANNED_CONTENT_FILTER_ZERO',
  'GATE_9_NO_GENERIC_BOILERPLATE',
  'GATE_10_SKELETON_DIFFERENTIATION',
  'GATE_11_BLUEPRINT_THEME_FIDELITY_V2',
  'GATE_12_CEFR_CONSISTENCY',
  'GATE_13_READABILITY_CEILING',
  'GATE_14_PROVENANCE_INTEGRITY',
  'GATE_15_CLIL_VOCAB_INTEGRATION',
  'GATE_16_ESL_ANOMALY_ZERO',
  'GATE_SP2_SPEAKING_EXCHANGE_AUTHENTIC'
];

console.log('| Gate ID | ' + weeks.map(w => 'W' + w).join(' | ') + ' |');
console.log('|:---|' + weeks.map(() => ':---:').join('|') + '|');

for (const g of allGates) {
  let row = '| `' + g + '` | ';
  const statuses = weeks.map(w => {
    const p = JSON.parse(fs.readFileSync('./docs/agent_artifacts/staging/week_' + w + '/provenance.json', 'utf8'));
    return (p.quality_gates_passed || []).includes(g) ? 'PASS' : '**FAIL**';
  });
  row += statuses.join(' | ') + ' |';
  console.log(row);
}
