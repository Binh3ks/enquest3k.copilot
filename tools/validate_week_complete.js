#!/usr/bin/env node

/**
 * COMPLETE WEEK VALIDATOR
 * 
 * Validates ALL 35 files for a given week:
 * - 1 AI Tutor file (week_XX_real.js)
 * - 17 Advanced station files
 * - 17 Easy mode station files
 * 
 * Usage: node tools/validate_week_complete.js <week_number>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Expected station files for each week
const STATION_FILES = [
  'daily_watch.js',
  'read.js',
  'dictation.js',
  'shadowing.js',
  'vocab.js',
  'grammar.js',
  'games.js',
  'word_match.js',
  'word_power.js',
  'writing.js',
  'ask_ai.js',
  'explore.js',
  'mindmap.js',
  'logic.js',           // or logic_science.js from W16+
  'singapore_math.js',  // from W16+ only
  'video_queries.json',
  'index.js'
];

const validateWeek = async (weekNum) => {
  console.log('╔════════════════════════════════════════╗');
  console.log(`║   COMPLETE WEEK VALIDATOR - W${weekNum.toString().padStart(2)}      ║`);
  console.log('╚════════════════════════════════════════╝\n');

  let totalErrors = 0;
  const issues = [];

  // ========================================
  // CHECK 1: AI Tutor File
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📚 CHECK 1: AI Tutor File');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const aiTutorPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}_real.js`);
  
  if (fs.existsSync(aiTutorPath)) {
    const stats = fs.statSync(aiTutorPath);
    const content = fs.readFileSync(aiTutorPath, 'utf8');
    const lines = content.split('\n').length;
    
    console.log(`  ✅ week_${weekNum}_real.js exists`);
    console.log(`     Size: ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`     Lines: ${lines}`);
    
    // Check for key fields
    const hasWeekId = content.includes('week_id:');
    const hasTargetVocab = content.includes('target_vocab:');
    const hasStoryMissions = content.includes('story_missions:');
    
    if (!hasWeekId) {
      issues.push('AI Tutor: Missing week_id field');
      totalErrors++;
    }
    if (!hasTargetVocab) {
      issues.push('AI Tutor: Missing target_vocab field');
      totalErrors++;
    }
    if (!hasStoryMissions) {
      issues.push('AI Tutor: Missing story_missions field');
      totalErrors++;
    }
    
    if (lines < 500) {
      issues.push(`AI Tutor: Only ${lines} lines (expected ~800-1000)`);
      totalErrors++;
    }
  } else {
    console.log(`  ❌ week_${weekNum}_real.js MISSING`);
    issues.push('AI Tutor file missing completely');
    totalErrors++;
  }

  console.log('');

  // ========================================
  // CHECK 2: Advanced Station Files
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📁 CHECK 2: Advanced Station Files');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const advancedDir = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}`);
  let advancedCount = 0;
  const missingAdvanced = [];

  if (fs.existsSync(advancedDir)) {
    for (const file of STATION_FILES) {
      // Skip singapore_math.js for W1-15, logic.js might be logic_science.js
      let filePath = path.join(advancedDir, file);
      let exists = fs.existsSync(filePath);
      
      // Check alternate names
      if (!exists && file === 'logic.js') {
        const altPath = path.join(advancedDir, 'logic_science.js');
        if (fs.existsSync(altPath)) {
          exists = true;
          filePath = altPath;
        }
      }
      
      if (!exists && file === 'singapore_math.js' && weekNum < 16) {
        // Singapore Math only from W16+, skip for earlier weeks
        continue;
      }
      
      if (exists) {
        const stats = fs.statSync(filePath);
        const lines = fs.readFileSync(filePath, 'utf8').split('\n').length;
        console.log(`  ✅ ${file.padEnd(20)} (${lines} lines, ${(stats.size / 1024).toFixed(1)} KB)`);
        advancedCount++;
      } else {
        console.log(`  ❌ ${file.padEnd(20)} MISSING`);
        missingAdvanced.push(file);
        totalErrors++;
      }
    }
  } else {
    console.log(`  ❌ Directory week_${weekNum}/ does not exist!`);
    issues.push('Advanced station directory missing');
    totalErrors += 17;
  }

  console.log(`\n  Total: ${advancedCount}/17 files present`);
  
  if (missingAdvanced.length > 0) {
    issues.push(`Advanced: Missing ${missingAdvanced.join(', ')}`);
  }

  console.log('');

  // ========================================
  // CHECK 3: Easy Mode Station Files
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📁 CHECK 3: Easy Mode Station Files');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const easyDir = path.join(ROOT_DIR, `src/data/weeks_easy/week_${weekNum}`);
  let easyCount = 0;
  const missingEasy = [];

  if (fs.existsSync(easyDir)) {
    for (const file of STATION_FILES) {
      let filePath = path.join(easyDir, file);
      let exists = fs.existsSync(filePath);
      
      // Check alternate names
      if (!exists && file === 'logic.js') {
        const altPath = path.join(easyDir, 'logic_science.js');
        if (fs.existsSync(altPath)) {
          exists = true;
          filePath = altPath;
        }
      }
      
      if (!exists && file === 'singapore_math.js' && weekNum < 16) {
        continue;
      }
      
      if (exists) {
        const stats = fs.statSync(filePath);
        const lines = fs.readFileSync(filePath, 'utf8').split('\n').length;
        console.log(`  ✅ ${file.padEnd(20)} (${lines} lines, ${(stats.size / 1024).toFixed(1)} KB)`);
        easyCount++;
      } else {
        console.log(`  ❌ ${file.padEnd(20)} MISSING`);
        missingEasy.push(file);
        totalErrors++;
      }
    }
  } else {
    console.log(`  ❌ Directory weeks_easy/week_${weekNum}/ does not exist!`);
    issues.push('Easy mode directory missing');
    totalErrors += 17;
  }

  console.log(`\n  Total: ${easyCount}/17 files present`);
  
  if (missingEasy.length > 0) {
    issues.push(`Easy: Missing ${missingEasy.join(', ')}`);
  }

  console.log('');

  // ========================================
  // SUMMARY
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 VALIDATION SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const aiTutorStatus = fs.existsSync(aiTutorPath) ? '✅' : '❌';
  console.log(`  ${aiTutorStatus} AI Tutor: 1 file`);
  console.log(`  ${advancedCount === 17 ? '✅' : '⚠️ '} Advanced Stations: ${advancedCount}/17 files`);
  console.log(`  ${easyCount === 17 ? '✅' : '⚠️ '} Easy Stations: ${easyCount}/17 files`);
  
  const totalFiles = (fs.existsSync(aiTutorPath) ? 1 : 0) + advancedCount + easyCount;
  const expectedFiles = 1 + 17 + 17; // May be less for W1-15 (no singapore_math)
  
  console.log(`\n  Total Files: ${totalFiles}/35`);
  console.log(`  Completion: ${((totalFiles / 35) * 100).toFixed(1)}%`);

  if (totalErrors === 0) {
    console.log('\n✅ Week ${weekNum} is COMPLETE!');
    console.log('\nAll files present and validated.');
    return true;
  } else {
    console.log(`\n❌ Week ${weekNum} has ${totalErrors} issue(s):\n`);
    issues.forEach((issue, i) => {
      console.log(`   ${i + 1}. ${issue}`);
    });
    console.log('\n⚠️  Week is INCOMPLETE - fix issues before production.');
    return false;
  }
};

// Main execution
const main = async () => {
  const weekArg = process.argv[2];
  
  if (!weekArg) {
    console.log('❌ Error: Week number required\n');
    console.log('Usage: node tools/validate_week_complete.js <week_number>');
    console.log('Example: node tools/validate_week_complete.js 16\n');
    process.exit(1);
  }

  const weekNum = parseInt(weekArg);
  
  if (isNaN(weekNum) || weekNum < 1 || weekNum > 156) {
    console.log(`❌ Error: Invalid week number "${weekArg}"`);
    console.log('   Week must be between 1 and 156\n');
    process.exit(1);
  }

  const isValid = await validateWeek(weekNum);
  process.exit(isValid ? 0 : 1);
};

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
