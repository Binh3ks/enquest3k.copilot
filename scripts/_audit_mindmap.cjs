const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const roots = ['src/data/weeks', 'src/data/weeks_easy'];
const results = [];

for (const root of roots) {
  for (let w = 1; w <= 35; w++) {
    const wDir = path.join(root, `week_${String(w).padStart(2, '0')}`);
    const mmFile = path.join(wDir, 'mindmap.js');
    if (!fs.existsSync(mmFile)) continue;
    
    const content = fs.readFileSync(mmFile, 'utf8');
    // Extract all audio URLs in mindmap
    const audios = [...content.matchAll(/audio:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
    // Filter for mindmap_ only
    const mmAudios = audios.filter(a => a.includes('mindmap_'));
    
    // For each URL, check if file exists in public/audio
    const missing = mmAudios.filter(url => {
      const filePath = path.join('public', url);
      return !fs.existsSync(filePath);
    });
    
    if (missing.length > 0) {
      results.push({ root: root.replace('src/data/', ''), week: w, total: mmAudios.length, missing });
    }
  }
}

console.log('=== Mindmap audio files missing on disk ===');
console.log(`Total weeks with missing mindmap audio: ${results.length}\n`);
for (const r of results) {
  console.log(`${r.root}/week_${String(r.week).padStart(2,'0')}: ${r.missing.length}/${r.total} missing`);
  for (const m of r.missing) {
    console.log(`  ${m}`);
  }
  console.log();
}
