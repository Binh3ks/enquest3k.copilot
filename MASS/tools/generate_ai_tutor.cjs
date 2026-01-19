#!/usr/bin/env node
/**
 * AI TUTOR GENERATOR - Generate week_XX_real.js file
 * 
 * Usage: node MASS/tools/generate_ai_tutor.cjs <week_number>
 * Example: node MASS/tools/generate_ai_tutor.cjs 5
 * 
 * What it does:
 * 1. Load spec file (MASS/SPECS/week_XX_spec.json)
 * 2. Show AI instructions (which prompts to read)
 * 3. Wait for AI to generate week_XX_real.js
 * 4. Validate generated file structure
 * 5. Report success/failure
 */

const fs = require('fs');
const path = require('path');

const weekNum = process.argv[2];

if (!weekNum) {
  console.error("❌ Missing week number");
  console.log("\n📖 Usage: node MASS/tools/generate_ai_tutor.cjs <week_number>");
  console.log("📖 Example: node MASS/tools/generate_ai_tutor.cjs 5\n");
  process.exit(1);
}

const weekId = parseInt(weekNum);
const specFile = path.join(__dirname, '../SPECS', `week_${String(weekId).padStart(2, '0')}_spec.json`);
const outputFile = path.join(__dirname, '../../src/data/weeks', `week_${String(weekId).padStart(2, '0')}_real.js`);

console.log('\n' + '='.repeat(70));
console.log(`🤖 AI TUTOR GENERATOR - WEEK ${weekNum}`);
console.log('='.repeat(70) + '\n');

// ===== STEP 1: CHECK SPEC =====
console.log('📋 STEP 1: Check Spec File\n');

if (!fs.existsSync(specFile)) {
  console.error(`❌ Spec file not found: ${specFile}`);
  console.log(`\n💡 Generate it first:`);
  console.log(`   node MASS/tools/generate_spec.cjs ${weekNum}\n`);
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));

console.log(`✅ Spec loaded: ${specFile}`);
console.log(`\n📊 Spec Summary:`);
console.log(`   Title: ${spec.title_en} (${spec.title_vi})`);
console.log(`   CEFR: ${spec.cefr_level}`);
console.log(`   Vocab: ${spec.vocab_count} words`);
console.log(`   Topic: ${spec.topic}`);
console.log(`   Grammar: ${spec.grammar_focus}`);

// ===== STEP 2: AI INSTRUCTIONS =====
console.log('\n' + '='.repeat(70));
console.log('🤖 STEP 2: AI Generation Instructions');
console.log('='.repeat(70) + '\n');

console.log('📝 Output: AI Tutor Configuration File (week_XX_real.js)');
console.log('📏 Size: ~1,000-1,100 lines');
console.log('⏱️  Time: ~10-15 minutes\n');

// Determine which schema to use
const useVariantSchema = weekId >= 4;
const schemaFile = useVariantSchema 
  ? '06_AI_TUTOR_SCHEMA_VARIANT.txt' 
  : '05_AI_TUTOR_SCHEMA_BASIC.txt';

console.log(`📚 AI Must Read These Files IN ORDER:\n`);

const promptsToRead = [
  '01_MASTER_ORCHESTRATOR.txt',
  '04_AI_TUTOR_CORE.txt',
  schemaFile,
  '07_AI_TUTOR_EXAMPLES.txt (optional - if confused)'
];

promptsToRead.forEach((file, i) => {
  const fullPath = `MASS/PROMPTS/${file}`;
  const exists = file.includes('optional') || fs.existsSync(path.join(__dirname, '../PROMPTS', file.split(' ')[0]));
  const status = file.includes('optional') ? '📖' : (exists ? '✅' : '❌');
  console.log(`   ${i + 1}. ${status} ${fullPath}`);
});

console.log(`\n📄 Load Data From:`);
console.log(`   ✅ MASS/SPECS/week_${String(weekId).padStart(2, '0')}_spec.json (locked data)`);

console.log(`\n📝 Output Location:`);
console.log(`   → src/data/weeks/week_${String(weekId).padStart(2, '0')}_real.js`);

console.log(`\n🎯 Schema Type: ${useVariantSchema ? 'VARIANT (Week 4+)' : 'BASIC (Week 1-3)'}`);
if (useVariantSchema) {
  console.log(`   - 3 question variants per objective`);
  console.log(`   - Scrambled hints (6-9 words)`);
  console.log(`   - Student question invitations (2 per mission)`);
  console.log(`   - Goodbye objective with termination type`);
} else {
  console.log(`   - Single canonical_question per objective`);
  console.log(`   - Ordered hints (3-5 words)`);
  console.log(`   - Simpler structure`);
}

// ===== STEP 3: STRUCTURE GUIDE =====
console.log('\n' + '='.repeat(70));
console.log('📐 STEP 3: File Structure Guide');
console.log('='.repeat(70) + '\n');

console.log('🗂️  week_XX_real.js Structure:\n');
console.log('   1. Metadata (lines 1-20)');
console.log('      - week_id, phase, block, unit, week_number');
console.log('      - title, topic, learning_outcome');
console.log('      - grammar_focus, grammar_pattern, grammar_examples');
console.log('');
console.log('   2. Target Vocabulary (lines 20-120)');
console.log(`      - ${spec.vocab_count} word objects with:`);
console.log('        • word, pronunciation, definition_vi, definition_en');
console.log('        • example, syllabus_context');
console.log('');
console.log('   3. Story Missions (lines 120-1000)');
console.log('      - 3 missions total');
console.log('      - Each mission:');
if (useVariantSchema) {
  console.log('        • 8-11 regular objectives');
  console.log('        • 2 student question invitations');
  console.log('        • 1 goodbye objective');
  console.log('        • mission_context with AI instructions');
} else {
  console.log('        • 6-9 objectives');
  console.log('        • Direct canonical_question format');
}
console.log('');
console.log('   4. FreeTalk Knowledge (lines 1000-1100)');
console.log('      - week_title, week_number, theme');
console.log('      - knowledge_base array');
console.log('      - example_opening_questions array');

// ===== STEP 4: CRITICAL FIELDS CHECKLIST =====
console.log('\n' + '='.repeat(70));
console.log('⚠️  STEP 4: Critical Fields Checklist');
console.log('='.repeat(70) + '\n');

console.log('✅ Metadata:');
console.log('   [ ] week_id, phase, block, unit');
console.log('   [ ] title, week_title_en, week_title_vi');
console.log('   [ ] topic, topic_vi');
console.log('   [ ] learning_outcome, learning_outcome_vi');
console.log('   [ ] grammar_focus, grammar_pattern, grammar_examples (array)');
console.log('');
console.log('✅ Target Vocabulary:');
console.log(`   [ ] ${spec.vocab_count} word objects`);
console.log('   [ ] Each has: word, pronunciation, definition_vi, definition_en');
console.log('   [ ] Each has: example, syllabus_context');
console.log('');
console.log('✅ Story Missions:');
console.log('   [ ] 3 missions (mission_id: 1, 2, 3)');
console.log('   [ ] Each mission has: title, title_vi, theme');
console.log('   [ ] Each mission has: nova_greeting, mission_context');
console.log('   [ ] Each mission has: target_vocab (array), grammar_pattern');
console.log('   [ ] Each mission has: objectives (array)');
console.log('   [ ] Each mission has: minimum_turns, maximum_turns');
console.log('');

if (useVariantSchema) {
  console.log('✅ Regular Objectives (in each mission):');
  console.log('   [ ] stepKey, category');
  console.log('   [ ] question_variants (3 variants)');
  console.log('   [ ] Each variant: question, hints (6-9 scrambled words)');
  console.log('   [ ] target_keywords (array)');
  console.log('   [ ] ack_variants (NOT ack_options!)');
  console.log('   [ ] recast_templates (array with {placeholders})');
  console.log('   [ ] success_criteria (string)');
  console.log('');
  console.log('✅ Student Question Invitations (2 per mission):');
  console.log('   [ ] stepKey: student_question_1, student_question_2');
  console.log('   [ ] type: "invitation"');
  console.log('   [ ] question_variants (3 variants with empty hints)');
  console.log('   [ ] allow_skip: true');
  console.log('');
  console.log('✅ Goodbye Objective (1 per mission):');
  console.log('   [ ] stepKey: "goodbye"');
  console.log('   [ ] type: "termination"');
  console.log('   [ ] canonical_question: "" (empty string)');
  console.log('   [ ] goodbye_en, goodbye_vi (messages)');
  console.log('   [ ] hints: [] (empty array)');
} else {
  console.log('✅ Objectives (in each mission):');
  console.log('   [ ] stepKey, category');
  console.log('   [ ] canonical_question (single question)');
  console.log('   [ ] hints (3-5 ordered words)');
  console.log('   [ ] target_keywords (array)');
  console.log('   [ ] ack_options (array)');
  console.log('   [ ] recast_templates (array)');
  console.log('   [ ] success_criteria (string)');
}

console.log('');
console.log('✅ FreeTalk Knowledge:');
console.log('   [ ] freetalk_knowledge (NO UNDERSCORE!)');
console.log('   [ ] week_title, week_number, theme');
console.log('   [ ] knowledge_base (array of strings)');
console.log('   [ ] example_opening_questions (array)');

// ===== STEP 5: VALIDATION RULES =====
console.log('\n' + '='.repeat(70));
console.log('🔍 STEP 5: Validation Rules');
console.log('='.repeat(70) + '\n');

console.log('❌ Common Mistakes to Avoid:\n');
console.log('   1. Using "ack_options" instead of "ack_variants"');
console.log('   2. Using "free_talk_knowledge" instead of "freetalk_knowledge"');
console.log('   3. Using "target_vocab_focus" instead of "target_vocab"');
console.log('   4. Missing "type: termination" in goodbye objective');
console.log('   5. Missing "goodbye_en" and "goodbye_vi" fields');
console.log('   6. Using "question_variants" in goodbye (should use canonical_question)');
console.log('   7. Missing "theme" field in mission');
console.log('   8. Including "description_en/vi" in mission (should NOT exist)');
console.log('   9. Scrambled hints with < 6 words (should be 6-9)');
console.log('   10. Hints in sentence order (should be SCRAMBLED)');

// ===== STEP 6: WAIT FOR AI =====
console.log('\n' + '='.repeat(70));
console.log('⏳ STEP 6: Waiting for AI Generation...');
console.log('='.repeat(70) + '\n');

console.log('🎯 Generation Checklist:\n');
console.log('   [ ] Read all prompt files listed above');
console.log('   [ ] Load spec data (week_XX_spec.json)');
console.log(`   [ ] Reference Week 4 structure (src/data/weeks/week_04_real.js)`);
console.log('   [ ] Generate metadata + target_vocab');
console.log('   [ ] Generate 3 missions with objectives');
console.log('   [ ] Generate freetalk_knowledge');
console.log('   [ ] Export as: export default weekXRealData;');
console.log(`   [ ] Save to: ${outputFile}\n`);

// Check if file exists
if (fs.existsSync(outputFile)) {
  console.log(`✅ File already exists: ${outputFile}`);
  console.log(`📊 Size: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
  
  // Quick validation
  try {
    const content = fs.readFileSync(outputFile, 'utf8');
    
    const checks = {
      'Has week_id': content.includes(`week_id: ${weekId}`),
      'Has story_missions': content.includes('story_missions:'),
      'Has freetalk_knowledge': content.includes('freetalk_knowledge:'),
      'Has export default': content.includes('export default'),
      'Uses ack_variants': content.includes('ack_variants:'),
      'NO ack_options': !content.includes('ack_options:'),
      'Has goodbye objective': content.includes('type: "termination"'),
      'Has goodbye messages': content.includes('goodbye_en:')
    };
    
    console.log('\n🔍 Quick Validation:\n');
    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`   ${passed ? '✅' : '❌'} ${check}`);
    });
    
    const allPassed = Object.values(checks).every(v => v);
    
    if (allPassed) {
      console.log('\n✅ File looks good! Ready to validate fully.\n');
      console.log('Next steps:');
      console.log(`   1. Review the file: code ${outputFile}`);
      console.log(`   2. Test in UI: npm run dev`);
      console.log(`   3. Generate stations: node MASS/tools/create_week.cjs ${weekNum}\n`);
    } else {
      console.log('\n⚠️  File has issues. Review and fix before proceeding.\n');
    }
    
  } catch (error) {
    console.error(`\n❌ Error reading file: ${error.message}\n`);
  }
} else {
  console.log(`⏸️  File not generated yet: ${outputFile}`);
  console.log('\n📝 After AI generates the file, run this script again to validate.\n');
}

console.log('='.repeat(70));
console.log('🎯 AI TUTOR GENERATOR COMPLETE');
console.log('='.repeat(70) + '\n');
