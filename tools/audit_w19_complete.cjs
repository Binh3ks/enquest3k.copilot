/**
 * COMPREHENSIVE W19 AUDIT TOOL
 * Compares W19 against W16 gold standard - EVERY field, EVERY structure
 */

const fs = require('fs');
const path = require('path');

const W16_ADV = path.join(__dirname, '../src/data/weeks/week_16');
const W19_ADV = path.join(__dirname, '../src/data/weeks/week_19');
const W16_EASY = path.join(__dirname, '../src/data/weeks_easy/week_16');
const W19_EASY = path.join(__dirname, '../src/data/weeks_easy/week_19');

let errors = [];
let warnings = [];
let passed = 0;

console.log('═'.repeat(70));
console.log('📋 COMPREHENSIVE W19 AUDIT vs W16 GOLD STANDARD');
console.log('═'.repeat(70));
console.log('');

// Helper: Read file safely
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

// Helper: Check if pattern exists
function hasPattern(content, pattern, description) {
  if (content.includes(pattern)) {
    passed++;
    console.log('  ✅', description);
    return true;
  } else {
    errors.push(`❌ Missing: ${description}`);
    console.log('  ❌', description);
    return false;
  }
}

// Helper: Check field count
function checkArrayLength(content, arrayName, minCount, description) {
  const regex = new RegExp(`${arrayName}:\\s*\\[`, 'g');
  if (!regex.test(content)) {
    errors.push(`❌ ${description}: No ${arrayName} array found`);
    console.log(`  ❌ No ${arrayName} array`);
    return false;
  }
  
  // Count items (rough estimate by counting commas + 1)
  const match = content.match(new RegExp(`${arrayName}:\\s*\\[([\\s\\S]*?)\\]`));
  if (match) {
    const items = match[1].split(/,(?![^{]*})/g).filter(i => i.trim());
    if (items.length >= minCount) {
      passed++;
      console.log(`  ✅ ${description}: ${items.length} items`);
      return true;
    } else {
      warnings.push(`⚠️  ${description}: Only ${items.length} items (expected ${minCount}+)`);
      console.log(`  ⚠️  ${description}: Only ${items.length} items`);
      return false;
    }
  }
  return false;
}

console.log('1️⃣  ADVANCED MODE AUDIT');
console.log('─'.repeat(70));

// 1. logic_science.js
console.log('\n📄 logic_science.js (Advanced)');
const w16AdvLogic = readFile(path.join(W16_ADV, 'logic_science.js'));
const w19AdvLogic = readFile(path.join(W19_ADV, 'logic_science.js'));
if (w19AdvLogic) {
  hasPattern(w19AdvLogic, 'questions:', 'Has questions array');
  hasPattern(w19AdvLogic, 'question_en:', 'Has question_en field');
  hasPattern(w19AdvLogic, 'options_en:', 'Has options_en field');
  hasPattern(w19AdvLogic, 'correct_answer:', 'Has correct_answer field');
  hasPattern(w19AdvLogic, 'explanation_en:', 'Has explanation_en field');
  checkArrayLength(w19AdvLogic, 'questions', 3, 'Logic questions count');
} else {
  errors.push('❌ logic_science.js (Advanced): File missing');
}

// 2. mindmap.js
console.log('\n📄 mindmap.js (Advanced)');
const w16AdvMindmap = readFile(path.join(W16_ADV, 'mindmap.js'));
const w19AdvMindmap = readFile(path.join(W19_ADV, 'mindmap.js'));
if (w19AdvMindmap) {
  hasPattern(w19AdvMindmap, 'centerStems:', 'Has centerStems array');
  hasPattern(w19AdvMindmap, 'branchLabels:', 'Has branchLabels object');
  hasPattern(w19AdvMindmap, 'export default mindMapContent', 'Correct export statement');
  checkArrayLength(w19AdvMindmap, 'centerStems', 5, 'Mindmap stems count');
} else {
  errors.push('❌ mindmap.js (Advanced): File missing');
}

// 3. ask_ai.js
console.log('\n📄 ask_ai.js (Advanced)');
const w19AdvAskAi = readFile(path.join(W19_ADV, 'ask_ai.js'));
if (w19AdvAskAi) {
  hasPattern(w19AdvAskAi, 'prompts:', 'Has prompts array');
  hasPattern(w19AdvAskAi, 'context_en:', 'Has context_en field');
  hasPattern(w19AdvAskAi, 'answer:', 'Has answer field');
  hasPattern(w19AdvAskAi, 'hint:', 'Has hint field');
  checkArrayLength(w19AdvAskAi, 'prompts', 4, 'Ask AI prompts count');
} else {
  errors.push('❌ ask_ai.js (Advanced): File missing');
}

// 4. vocab.js
console.log('\n📄 vocab.js (Advanced)');
const w19AdvVocab = readFile(path.join(W19_ADV, 'vocab.js'));
if (w19AdvVocab) {
  hasPattern(w19AdvVocab, 'words:', 'Has words array');
  hasPattern(w19AdvVocab, 'pronunciation:', 'Has pronunciation field');
  hasPattern(w19AdvVocab, 'definition_en:', 'Has definition_en field');
  hasPattern(w19AdvVocab, 'example:', 'Has example field');
  hasPattern(w19AdvVocab, 'collocation:', 'Has collocation field');
  checkArrayLength(w19AdvVocab, 'words', 10, 'Vocabulary count');
} else {
  errors.push('❌ vocab.js (Advanced): File missing');
}

// 5. grammar.js
console.log('\n📄 grammar.js (Advanced)');
const w19AdvGrammar = readFile(path.join(W19_ADV, 'grammar.js'));
if (w19AdvGrammar) {
  hasPattern(w19AdvGrammar, 'grammar_explanation:', 'Has grammar_explanation');
  hasPattern(w19AdvGrammar, 'exercises:', 'Has exercises array');
  hasPattern(w19AdvGrammar, 'rules:', 'Has rules array');
  checkArrayLength(w19AdvGrammar, 'exercises', 15, 'Grammar exercises count');
} else {
  errors.push('❌ grammar.js (Advanced): File missing');
}

// 6. read.js
console.log('\n📄 read.js (Advanced)');
const w19AdvRead = readFile(path.join(W19_ADV, 'read.js'));
if (w19AdvRead) {
  hasPattern(w19AdvRead, 'title:', 'Has title field');
  hasPattern(w19AdvRead, 'content_en:', 'Has content_en field');
  hasPattern(w19AdvRead, 'comprehension_questions:', 'Has comprehension_questions');
  hasPattern(w19AdvRead, 'question_en:', 'Has question_en in questions');
  hasPattern(w19AdvRead, 'answer:', 'Has answer in questions');
} else {
  errors.push('❌ read.js (Advanced): File missing');
}

// 7. dictation.js
console.log('\n📄 dictation.js (Advanced)');
const w19AdvDictation = readFile(path.join(W19_ADV, 'dictation.js'));
if (w19AdvDictation) {
  hasPattern(w19AdvDictation, 'sentences:', 'Has sentences array');
  hasPattern(w19AdvDictation, 'sentence:', 'Has sentence field');
  hasPattern(w19AdvDictation, 'meaning:', 'Has meaning field');
  hasPattern(w19AdvDictation, 'audio_url:', 'Has audio_url field');
  checkArrayLength(w19AdvDictation, 'sentences', 8, 'Dictation sentences count');
} else {
  errors.push('❌ dictation.js (Advanced): File missing');
}

// 8. shadowing.js
console.log('\n📄 shadowing.js (Advanced)');
const w19AdvShadowing = readFile(path.join(W19_ADV, 'shadowing.js'));
if (w19AdvShadowing) {
  hasPattern(w19AdvShadowing, 'dialogue_title_en:', 'Has dialogue_title_en');
  hasPattern(w19AdvShadowing, 'speakers:', 'Has speakers array');
  hasPattern(w19AdvShadowing, 'lines:', 'Has lines array');
  hasPattern(w19AdvShadowing, 'speaker:', 'Has speaker in lines');
  hasPattern(w19AdvShadowing, 'start_time:', 'Has start_time in lines