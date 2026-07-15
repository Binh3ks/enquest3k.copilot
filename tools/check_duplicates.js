#!/usr/bin/env node

/**
 * DUPLICATE VIDEO DETECTOR
 * 
 * Checks if videos in a given week are duplicates of videos in previous weeks.
 * Prevents Issue #3 from W18 (duplicate videos across weeks).
 * 
 * Usage: node tools/check_duplicates.js <week_number>
 * Example: node tools/check_duplicates.js 19
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Check a specific week for duplicate videos
 */
const checkWeek = async (weekNum) => {
  const weekPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}/daily_watch.js`);
  
  if (!fs.existsSync(weekPath)) {
    console.log(`⚠️  Week ${weekNum} not found at: ${weekPath}`);
    return false;
  }

  // Import the week data
  const weekModule = await import(weekPath);
  const videos = weekModule.default?.videos || [];
  
  if (videos.length === 0) {
    console.log(`⚠️  Week ${weekNum} has no videos`);
    return false;
  }

  const videoIds = videos.map(v => v.videoId);

  console.log(`\n🔍 Checking Week ${weekNum} for duplicates...`);
  console.log(`   Found ${videos.length} videos to check\n`);

  let foundDuplicates = false;
  const duplicateReport = [];

  // Check against all previous weeks
  for (let prevWeek = 1; prevWeek < weekNum; prevWeek++) {
    const prevPath = path.join(ROOT_DIR, `src/data/weeks/week_${prevWeek}/daily_watch.js`);
    
    if (!fs.existsSync(prevPath)) continue;

    try {
      const prevModule = await import(prevPath);
      const prevVideos = prevModule.default?.videos || [];
      const prevIds = prevVideos.map(v => v.videoId);

      const duplicates = videoIds.filter(id => prevIds.includes(id));

      if (duplicates.length > 0) {
        foundDuplicates = true;
        
        console.log(`❌ DUPLICATE with Week ${prevWeek}:`);
        duplicates.forEach(id => {
          const currentVideo = videos.find(v => v.videoId === id);
          const prevVideo = prevVideos.find(v => v.videoId === id);
          
          console.log(`   Slot ${currentVideo.id}: ${id}`);
          console.log(`      W${weekNum}: "${currentVideo.title}"`);
          console.log(`      W${prevWeek}: "${prevVideo.title}"`);
          console.log('');
          
          duplicateReport.push({
            videoId: id,
            currentWeek: weekNum,
            currentSlot: currentVideo.id,
            currentTitle: currentVideo.title,
            duplicateWeek: prevWeek,
            duplicateSlot: prevVideo.id,
            duplicateTitle: prevVideo.title
          });
        });
      }
    } catch (err) {
      console.warn(`⚠️  Could not read Week ${prevWeek}: ${err.message}`);
    }
  }

  if (!foundDuplicates) {
    console.log(`\n✅ No duplicates found - Week ${weekNum} is clean!`);
    console.log(`   All ${videos.length} videos are unique.\n`);
    return true;
  } else {
    console.log(`\n❌ Found ${duplicateReport.length} duplicate(s) in Week ${weekNum}`);
    console.log(`\n📋 Summary:`);
    duplicateReport.forEach(dup => {
      console.log(`   - ${dup.videoId}: Used in W${dup.duplicateWeek} and W${dup.currentWeek}`);
    });
    console.log('');
    console.log('🔧 Action Required: Replace duplicate videos before committing.');
    console.log('');
    return false;
  }
};

/**
 * Check all weeks for internal duplicates (same videoId in same week)
 */
const checkInternalDuplicates = async (weekNum) => {
  const weekPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}/daily_watch.js`);
  
  if (!fs.existsSync(weekPath)) {
    return true; // Skip if week doesn't exist
  }

  const weekModule = await import(weekPath);
  const videos = weekModule.default?.videos || [];
  const videoIds = videos.map(v => v.videoId);
  
  const duplicates = videoIds.filter((id, index) => videoIds.indexOf(id) !== index);
  
  if (duplicates.length > 0) {
    console.log(`❌ INTERNAL DUPLICATES in Week ${weekNum}:`);
    duplicates.forEach(id => {
      const matches = videos.filter(v => v.videoId === id);
      console.log(`   ${id} appears ${matches.length} times:`);
      matches.forEach(v => console.log(`      - Slot ${v.id}: "${v.title}"`));
    });
    console.log('');
    return false;
  }
  
  return true;
};

// Main execution
const main = async () => {
  const weekArg = process.argv[2];
  
  if (!weekArg) {
    console.log('❌ Error: Week number required\n');
    console.log('Usage: node tools/check_duplicates.js <week_number>');
    console.log('Example: node tools/check_duplicates.js 19\n');
    process.exit(1);
  }

  const weekNum = parseInt(weekArg);
  
  if (isNaN(weekNum) || weekNum < 1 || weekNum > 156) {
    console.log(`❌ Error: Invalid week number "${weekArg}"`);
    console.log('   Week must be between 1 and 156\n');
    process.exit(1);
  }

  console.log('╔════════════════════════════════════════╗');
  console.log('║   DUPLICATE VIDEO DETECTION TOOL      ║');
  console.log('╚════════════════════════════════════════╝');

  // Check internal duplicates first
  const internalClean = await checkInternalDuplicates(weekNum);
  
  // Check cross-week duplicates
  const crossWeekClean = await checkWeek(weekNum);
  
  if (internalClean && crossWeekClean) {
    console.log('✅ All checks passed - Week is ready for commit!\n');
    process.exit(0);
  } else {
    console.log('❌ Validation failed - Please fix duplicates before committing.\n');
    process.exit(1);
  }
};

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
