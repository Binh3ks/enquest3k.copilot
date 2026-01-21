#!/usr/bin/env node
/**
 * WEEK STRUCTURE VALIDATION
 * 
 * Validates:
 * 1. Folder naming pattern (week<N> not week_<N>)
 * 2. Vocab content differentiation between modes
 * 3. Path consistency in station files
 * 
 * Usage: node MASS/tools/validate_week_structure.cjs <week>
 * Example: node MASS/tools/validate_week_structure.cjs 5
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const weekNum = process.argv[2];

if (!weekNum) {
  console.error('\n❌ Missing week number');
  console.log('📖 Usage: node MASS/tools/validate_week_structure.cjs <week>');
  console.log('📖 Example: node MASS/tools/validate_week_structure.cjs 5\n');
  process.exit(1);
}

const weekId = parseInt(weekNum);
const errors = [];
const warnings = [];

console.log('\n' + '='.repeat(70));
console.log(`🔍 WEEK ${weekNum} STRUCTURE VALIDATION`);
console.log('='.repeat(70) + '\n');

// ===== CHECK 1: FOLDER NAMING PATTERN =====
console.log('📁 Checking folder naming pattern...\n');

const expectedFolders = [
  `public/audio/week${weekId}`,
  `public/audio/week${weekId}_easy`,
  `public/images/week${weekId}`,
  `public/images/week${weekId}_easy`
];

const wrongPatterns = [
  `public/audio/week_${String(weekId).padStart(2, '0')}`,
  `public/audio/week_${weekId}`,
  `public/images/week_${String(weekId).padStart(2, '0')}`,
  `public/images/week_${weekId}`
];

expectedFolders.forEach(folder => {
  if (fs.existsSync(folder)) {
    console.log(`  ✅ ${folder}`);
  } else {
    errors.push(`❌ Missing folder: ${folder}`);
  }
});

wrongPatterns.forEach(folder => {
  if (fs.existsSync(folder)) {
    errors.push(`❌ WRONG NAMING: ${folder} (should NOT have underscore before number!)`);
  }
});

console.log('');

// ===== CHECK 2: VOCAB DIFFERENTIATION =====
console.log('📚 Checking vocab differentiation between modes...\n');

const advancedVocab = path.join('src/data/weeks', `week_${String(weekId).padStart(2, '0')}`, 'vocab.js');
const easyVocab = path.join('src/data/weeks_easy', `week_${String(weekId).padStart(2, '0')}`, 'vocab.js');

if (fs.existsSync(advancedVocab) && fs.existsSync(easyVocab)) {
  try {
    // Extract words from both files
    const advContent = fs.readFileSync(advancedVocab, 'utf8');
    const easyContent = fs.readFileSync(easyVocab, 'utf8');
    
    const advWords = [...advContent.matchAll(/^\s*word:\s*"([^"]+)"/gm)].map(m => m[1]);
    const easyWords = [...easyContent.matchAll(/^\s*word:\s*"([^"]+)"/gm)].map(m => m[1]);
    
    console.log(`  Advanced: ${advWords.length} words`);
    console.log(`  Easy: ${easyWords.length} words\n`);
    
    // Check if words are identical
    const identical = advWords.length === easyWords.length && 
                     advWords.every((word, i) => word === easyWords[i]);
    
    if (identical) {
      errors.push(`❌ CRITICAL: Vocab is IDENTICAL between modes! This breaks mass production!`);
      console.log('  ❌ Vocab words are IDENTICAL\n');
      console.log('  Advanced words:', advWords.join(', '));
      console.log('  Easy words:    ', easyWords.join(', '));
      console.log('\n  ⚠️  Easy mode should have SIMPLER, MORE BASIC words!\n');
    } else {
      console.log('  ✅ Vocab is DIFFERENT between modes\n');
      console.log('  Advanced: ', advWords.slice(0, 5).join(', '), '...');
      console.log('  Easy:     ', easyWords.slice(0, 5).join(', '), '...\n');
    }
  } catch (e) {
    warnings.push(`⚠️  Could not compare vocab: ${e.message}`);
  }
} else {
  warnings.push('⚠️  Vocab files not found for comparison');
}

// ===== CHECK 3: PATH CONSISTENCY =====
console.log('🔗 Checking path consistency in station files...\n');

const checkPaths = (mode) => {
  const dataDir = mode === 'easy' ? 'weeks_easy' : 'weeks';
  const weekDir = path.join('src/data', dataDir, `week_${String(weekId).padStart(2, '0')}`);
  
  if (!fs.existsSync(weekDir)) {
    warnings.push(`⚠️  ${mode.toUpperCase()} mode data folder not found`);
    return;
  }
  
  const stations = fs.readdirSync(weekDir).filter(f => f.endsWith('.js') && f !== 'index.js');
  const expectedPath = mode === 'easy' ? `/week${weekId}_easy/` : `/week${weekId}/`;
  const wrongPatterns = [
    `/week_${String(weekId).padStart(2, '0')}_easy/`,
    `/week_${String(weekId).padStart(2, '0')}/`,
    `/week_${weekId}_easy/`,
    `/week_${weekId}/`
  ];
  
  let correctPaths = 0;
  let wrongPaths = 0;
  
  stations.forEach(station => {
    const content = fs.readFileSync(path.join(weekDir, station), 'utf8');
    const hasCorrect = content.includes(expectedPath);
    const hasWrong = wrongPatterns.some(p => content.includes(p));
    
    if (hasCorrect) correctPaths++;
    if (hasWrong) {
      wrongPaths++;
      errors.push(`❌ ${mode.toUpperCase()} ${station} has wrong path pattern (week_XX instead of weekXX)`);
    }
  });
  
  console.log(`  ${mode.toUpperCase()} mode: ${correctPaths} files with correct paths, ${wrongPaths} with wrong paths`);
};

checkPaths('advanced');
checkPaths('easy');

console.log('');

// ===== SUMMARY =====
console.log('='.repeat(70));
console.log('📊 VALIDATION SUMMARY\n');

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ ALL CHECKS PASSED!\n');
  console.log(`🎉 Week ${weekNum} structure is valid and ready for production.\n`);
  console.log('='.repeat(70) + '\n');
  process.exit(0);
}

if (errors.length > 0) {
  console.log(`❌ ${errors.length} CRITICAL ERRORS:\n`);
  errors.forEach(err => console.log(err));
  console.log('');
}

if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} WARNINGS:\n`);
  warnings.forEach(warn => console.log(warn));
  console.log('');
}

if (errors.length > 0) {
  console.log('❌ VALIDATION FAILED - Fix errors above before proceeding!\n');
  console.log('='.repeat(70) + '\n');
  process.exit(1);
} else {
  console.log('⚠️  VALIDATION PASSED WITH WARNINGS\n');
  console.log('='.repeat(70) + '\n');
  process.exit(0);
}
