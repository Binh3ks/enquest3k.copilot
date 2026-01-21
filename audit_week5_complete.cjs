#!/usr/bin/env node
/**
 * COMPREHENSIVE STATION FILE AUDIT
 * Check every station file (28 total) for audio_url/audio_word/image_url validity
 */

const fs = require('fs');
const path = require('path');

// Week 5 stations
const stations = [
  'vocab', 'word_power', 'read', 'grammar', 'shadowing', 
  'dictation', 'mindmap', 'writing', 'logic', 'ask_ai', 
  'explore', 'daily_watch'
];

const modes = ['advanced', 'easy'];

console.log('\n' + '='.repeat(80));
console.log('🔍 COMPREHENSIVE WEEK 5 STATION AUDIT');
console.log('='.repeat(80) + '\n');

let totalErrors = 0;
let totalWarnings = 0;

for (const mode of modes) {
  const weekDir = path.join(__dirname, `src/data/weeks${mode === 'easy' ? '_easy' : ''}/week_05`);
  const audioDir = path.join(__dirname, `public/audio/week${5}${mode === 'easy' ? '_easy' : ''}`);
  const imageDir = path.join(__dirname, `public/images/week${5}${mode === 'easy' ? '_easy' : ''}`);
  
  console.log(`\n📚 MODE: ${mode.toUpperCase()}`);
  console.log(`   Data: ${weekDir}`);
  console.log(`   Audio: ${audioDir}`);
  console.log(`   Images: ${imageDir}`);
  console.log('-'.repeat(80) + '\n');
  
  const modeErrors = [];
  const modeWarnings = [];
  
  for (const station of stations) {
    const stationFile = path.join(weekDir, `${station}.js`);
    if (!fs.existsSync(stationFile)) {
      modeErrors.push(`❌ [${station}] FILE NOT FOUND: ${stationFile}`);
      continue;
    }
    
    let stationErrors = 0;
    try {
      const content = fs.readFileSync(stationFile, 'utf8');
      
      // Check audio files
      const audioMatches = content.match(/["']\/audio\/[^"']+\.mp3["']/g) || [];
      for (const match of audioMatches) {
        const audioPath = match.slice(1, -1); // remove quotes
        const fileName = audioPath.split('/').pop();
        const fullPath = path.join(audioDir, fileName);
        
        if (!fs.existsSync(fullPath)) {
          modeErrors.push(`❌ [${station}] Missing audio: ${audioPath}`);
          stationErrors++;
        }
      }
      
      // Check image files
      const imageMatches = content.match(/["']\/images\/[^"']+\.(jpg|png|jpeg)["']/g) || [];
      for (const match of imageMatches) {
        const imagePath = match.slice(1, -1); // remove quotes
        const fileName = imagePath.split('/').pop();
        const fullPath = path.join(imageDir, fileName);
        
        if (!fs.existsSync(fullPath)) {
          modeErrors.push(`❌ [${station}] Missing image: ${imagePath}`);
          stationErrors++;
        }
      }
      
      if (stationErrors === 0) {
        console.log(`  ✅ [${station}] ${audioMatches.length} audio + ${imageMatches.length} images - ALL VALID`);
      } else {
        console.log(`  ❌ [${station}] ${stationErrors} ERROR(S) - see details below`);
      }
      
    } catch (e) {
      modeErrors.push(`❌ [${station}] Error reading file: ${e.message}`);
    }
  }
  
  totalErrors += modeErrors.length;
  totalWarnings += modeWarnings.length;
  
  if (modeErrors.length > 0) {
    console.log(`\n  Errors for ${mode} mode:`);
    modeErrors.forEach(err => console.log(`    ${err}`));
  }
}

console.log('\n' + '='.repeat(80));
console.log(`📊 AUDIT SUMMARY`);
console.log(`   Total Errors: ${totalErrors}`);
console.log(`   Total Warnings: ${totalWarnings}`);
console.log('='.repeat(80) + '\n');

if (totalErrors === 0) {
  console.log('✅ ALL FILES VALID - WEEK 5 READY FOR PRODUCTION\n');
  process.exit(0);
} else {
  console.log('❌ FOUND ERRORS - FIX BEFORE PRODUCTION\n');
  process.exit(1);
}
