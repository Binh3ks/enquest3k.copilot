import fs from 'fs';
import path from 'path';

const ROOT = '.';
const results = [];

for (let w = 1; w <= 27; w++) {
  const wn = String(w).padStart(2, '0');
  for (const mode of ['weeks', 'weeks_easy']) {
    const folder = `week_${wn}`;
    const fpath = path.join(ROOT, 'src/data', mode, folder, 'mindmap.js');
    if (!fs.existsSync(fpath)) continue;
    const raw = fs.readFileSync(fpath, 'utf-8');
    // Find double-blank strings
    const doubleBlankStems = [...raw.matchAll(/['"]([^'"]*___[^'"]*___[^'"]*)['"]/g)]
      .map(m => m[1])
      .filter((v, i, a) => a.indexOf(v) === i);
    // Count old sequential audio URLs (1–2 digit suffixes = sequential 1-42; longer = hash)
    const oldAudioCount = (raw.match(/mindmap_(stem|branch)_\d{1,2}\.mp3/g) || []).length;
    // Count hash-based audio URLs (base36 hash, 5+ chars)
    const hashAudioCount = (raw.match(/mindmap_(stem|branch)_[a-z0-9]{5,}\.mp3/g) || []).length;
    results.push({ file: `${mode}/${folder}`, doubleBlankStems, oldAudioCount, hashAudioCount, raw });
  }
}

let totalDoubleBlank = 0;
let totalOldAudio = 0;

for (const r of results) {
  const issues = [];
  if (r.doubleBlankStems.length) issues.push(`DOUBLE_BLANK: ${r.doubleBlankStems.join(' | ')}`);
  if (r.oldAudioCount) issues.push(`OLD_AUDIO: ${r.oldAudioCount} urls`);
  if (issues.length) {
    console.log(`\n❌ ${r.file}`);
    for (const i of issues) console.log(`   ${i}`);
    totalDoubleBlank += r.doubleBlankStems.length;
    totalOldAudio += r.oldAudioCount;
  } else {
    console.log(`✅ ${r.file}`);
  }
}

console.log(`\nSummary: ${totalDoubleBlank} double-blank stems, ${totalOldAudio} old audio URLs to fix`);
