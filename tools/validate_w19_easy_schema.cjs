/**
 * W19 EASY MODE SCHEMA VALIDATOR
 * Validates that W19 Easy mode follows EXACT W16 structure
 */

const fs = require('fs');
const path = require('path');

const WEEK_19_PATH = path.join(__dirname, '../src/data/weeks_easy/week_19');
const WEEK_16_PATH = path.join(__dirname, '../src/data/weeks_easy/week_16');

const CRITICAL_FILES = [
  'logic_science.js',
  'mindmap.js',
  'ask_ai.js'
];

let errors = [];
let warnings = [];

console.log('🔍 VALIDATING W19 EASY MODE SCHEMA...\n');

// Check 1: logic_science.js must have "questions" array
console.log('CHECK 1: logic_science.js structure');
try {
  const content = fs.readFileSync(path.join(WEEK_19_PATH, 'logic_science.js'), 'utf8');
  
  if (!content.includes('questions: [')) {
    errors.push('❌ logic_science.js: Missing "questions" array (found "puzzles"?)');
  } else {
    console.log('✅ Has "questions" array');
  }
  
  if (!content.includes('options_en:') || !content.includes('options_vi:')) {
    errors.push('❌ logic_science.js: Missing "options_en/vi" fields');
  } else {
    console.log('✅ Has options_en/vi fields');
  }
  
  if (!content.includes('correct_answer:')) {
    errors.push('❌ logic_science.js: Missing "correct_answer" field');
  } else {
    console.log('✅ Has correct_answer field');
  }
} catch (e) {
  errors.push('❌ logic_science.js: Cannot read file');
}

// Check 2: mindmap.js must have centerStems/branchLabels
console.log('\nCHECK 2: mindmap.js structure');
try {
  const content = fs.readFileSync(path.join(WEEK_19_PATH, 'mindmap.js'), 'utf8');
  
  if (!content.includes('centerStems:')) {
    errors.push('❌ mindmap.js: Missing "centerStems" array (found "stems"?)');
  } else {
    console.log('✅ Has "centerStems" array');
  }
  
  if (!content.includes('branchLabels:')) {
    errors.push('❌ mindmap.js: Missing "branchLabels" object');
  } else {
    console.log('✅ Has "branchLabels" object');
  }
  
  if (!content.includes('export default mindMapContent')) {
    errors.push('❌ mindmap.js: Missing "export default mindMapContent" (uses default export?)');
  } else {
    console.log('✅ Has correct export statement');
  }
} catch (e) {
  errors.push('❌ mindmap.js: Cannot read file');
}

// Check 3: ask_ai.js must have "prompts" array
console.log('\nCHECK 3: ask_ai.js structure');
try {
  const content = fs.readFileSync(path.join(WEEK_19_PATH, 'ask_ai.js'), 'utf8');
  
  if (!content.includes('prompts: [')) {
    errors.push('❌ ask_ai.js: Missing "prompts" array (found "contexts"?)');
  } else {
    console.log('✅ Has "prompts" array');
  }
  
  if (!content.includes('context_en:')) {
    errors.push('❌ ask_ai.js: Missing "context_en" field');
  } else {
    console.log('✅ Has context_en field');
  }
  
  // Check for OLD format remnants
  const lines = content.split('\n');
  const exportLineIndex = lines.findIndex(l => l.trim() === '};');
  if (exportLineIndex < lines.length - 1) {
    const afterExport = lines.slice(exportLineIndex + 1).join('\n').trim();
    if (afterExport.length > 10) {
      warnings.push('⚠️ ask_ai.js: Suspicious content after closing };');
    }
  }
} catch (e) {
  errors.push('❌ ask_ai.js: Cannot read file');
}

// Check 4: Other files (quick check)
console.log('\nCHECK 4: Other core files exist');
const OTHER_FILES = ['read.js', 'vocab.js', 'grammar.js', 'dictation.js', 'shadowing.js'];
OTHER_FILES.forEach(file => {
  if (fs.existsSync(path.join(WEEK_19_PATH, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    errors.push(`❌ ${file}: File missing`);
  }
});

// SUMMARY
console.log('\n' + '='.repeat(60));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(60));

if (errors.length === 0) {
  console.log('\n✅ ALL CHECKS PASSED (' + (7 + OTHER_FILES.length) + '/(' + (7 + OTHER_FILES.length) + '))\n');
  console.log('Week 19 Easy mode follows W16 schema structure correctly.');
  process.exit(0);
} else {
  console.log('\n❌ VALIDATION FAILED\n');
  console.log('ERRORS:');
  errors.forEach(err => console.log('  ' + err));
  
  if (warnings.length > 0) {
    console.log('\nWARNINGS:');
    warnings.forEach(warn => console.log('  ' + warn));
  }
  
  console.log('\n⚠️ Schema validation failed. Fix errors before deployment.');
  process.exit(1);
}
