import week33Data from '../src/data/weeks/week_33/index.js';
import week33Real from '../src/data/weeks/week_33_real.js';
import { validateWeekContentSchema, DEFAULT_TASK_CONFIG } from '../src/contracts/ContentSchemas.js';
import { classifyDiagnosticTag, ERROR_TAXONOMY } from '../src/contracts/DiagnosticTaxonomy.js';
import { validateAttemptPayload, normalizeAttemptLogEntry, PROGRESS_LABELS } from '../src/contracts/ProgressContracts.js';

console.log('\n--- RUNNING CONTRACT VALIDATION TESTS (MILESTONE 0) ---');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message, details = []) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    console.error(`❌ [FAIL] ${message}`);
    if (details.length > 0) {
      details.forEach(d => console.error(`   └─ Error: ${d}`));
    }
    process.exitCode = 1;
  }
}

// 1. Content Schema Validation for Week 33
const resIndex = validateWeekContentSchema(week33Data);
assert(resIndex.valid, 'ContentSchema: week33Data index.js matches 4-Hub schema contract', resIndex.errors);

const resReal = validateWeekContentSchema(week33Real);
assert(resReal.valid, 'ContentSchema: week_33_real.js matches week data schema contract', resReal.errors);

assert(DEFAULT_TASK_CONFIG.gapCount === 5, 'ContentSchema: DEFAULT_TASK_CONFIG gapCount is configurable');

// 2. Diagnostic Taxonomy Classification
const catSyntax = classifyDiagnosticTag('past_cont_missing_was');
assert(catSyntax.code === ERROR_TAXONOMY.TYPE_B_SYNTAX.code, 'DiagnosticTaxonomy: past_cont_missing_was classified as TYPE_B_SYNTAX');

const catVocab = classifyDiagnosticTag('vocab_chunk_miss');
assert(catVocab.code === ERROR_TAXONOMY.TYPE_A_VOCAB.code, 'DiagnosticTaxonomy: vocab_chunk_miss classified as TYPE_A_VOCAB');

const catQuestion = classifyDiagnosticTag('question_syntax_incorrect');
assert(catQuestion.code === ERROR_TAXONOMY.TYPE_F_QUESTION.code, 'DiagnosticTaxonomy: question_syntax_incorrect classified as TYPE_F_QUESTION');

// 3. Progress Contracts Validation
const valPayload = validateAttemptPayload({ contentId: 'w33_story_script', score: 100, result: 'correct' });
assert(valPayload.valid, 'ProgressContracts: validateAttemptPayload accepts valid attempt payload');

const normalized = normalizeAttemptLogEntry({ score: 100, diagnosticTag: 'past_cont_missing_was' });
assert(normalized.result === 'correct' && normalized.diagnostic_tag === 'past_cont_missing_was', 'ProgressContracts: normalizeAttemptLogEntry normalizes attempt data correctly');

assert(PROGRESS_LABELS.READINESS_ESTIMATE === 'EngQuest Flyers Readiness Estimate', 'ProgressContracts: PROGRESS_LABELS preserves readiness estimate label');

console.log(`\nCONTRACT TEST SUMMARY: ${passedTests}/${totalTests} tests passed.\n`);
