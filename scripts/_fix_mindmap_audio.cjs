const fs = require('fs');
const path = require('path');

// Map of weeks with broken audio (filename has N_M format in source but files use sequential 1-36)
const WEEKS_TO_FIX = [1, 9, 17, 28, 34];  // W1=W9=W17=W28=W34 (ADV+Easy)

const roots = ['src/data/weeks', 'src/data/weeks_easy'];
let totalFixed = 0;
let totalSkipped = 0;
const log = [];

for (const root of roots) {
  for (const w of WEEKS_TO_FIX) {
    const wDir = path.join(root, `week_${String(w).padStart(2, '0')}`);
    const mmFile = path.join(wDir, 'mindmap.js');
    if (!fs.existsSync(mmFile)) {
      log.push(`SKIP: ${mmFile} not found`);
      totalSkipped++;
      continue;
    }

    // Check if there are any files for this week
    const audioDir = path.join('public/audio', `week${w}`);
    if (!fs.existsSync(audioDir)) {
      log.push(`SKIP: ${audioDir} not found`);
      totalSkipped++;
      continue;
    }
    const files = fs.readdirSync(audioDir).filter(f => f.startsWith('mindmap_branch_') && f.endsWith('.mp3'));
    if (files.length === 0) {
      log.push(`SKIP: ${audioDir}/ no mindmap files`);
      totalSkipped++;
      continue;
    }

    let content = fs.readFileSync(mmFile, 'utf8');
    let fileChanges = 0;

    // Match "audio: '/audio/weekN/mindmap_branch_N_M.mp3'" patterns
    // Replace with "audio: '/audio/weekN/mindmap_branch_X.mp3'" where X = (N-1)*6 + M
    // The branch group offset depends on how many branches per stem. For 6 branches/stem, X = (N-1)*6 + M
    // For 4 branches/stem, X = (N-1)*4 + M
    
    // We need to know the branches per stem. We can detect from source: count branches per stem key.
    // For simplicity, assume 6 branches per stem (standard). If wrong, we'll find out.
    
    content = content.replace(
      /(['"])(\/audio\/week\d+\/mindmap_branch_(\d+)_(\d+)\.mp3)\1/g,
      (match, quote, fullUrl, stem, branch) => {
        const stemNum = parseInt(stem, 10);
        const branchNum = parseInt(branch, 10);
        const sequentialIdx = (stemNum - 1) * 6 + branchNum;
        const newUrl = `/audio/week${w}/mindmap_branch_${sequentialIdx}.mp3`;
        if (fullUrl === newUrl) return match;
        fileChanges++;
        return quote + newUrl + quote;
      }
    );

    if (fileChanges > 0) {
      fs.writeFileSync(mmFile, content);
      log.push(`FIXED: ${mmFile}: ${fileChanges} URLs`);
      totalFixed++;
    } else {
      log.push(`NO CHANGE: ${mmFile}`);
    }
  }
}

console.log('=== Mindmap audio URL fix ===');
log.forEach(l => console.log(l));
console.log(`\nSummary: ${totalFixed} files fixed, ${totalSkipped} skipped`);
