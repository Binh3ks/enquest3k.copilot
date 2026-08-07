import fs from 'fs';
import path from 'path';

const BAD_WORDS = new Set(['i', 'he', 'she', 'it', 'we', 'they', 'you', 'my', 'his', 'her', 'their', 'our', 'was', 'were', 'had', 'have', 'has', 'did', 'do', 'does', 'then', 'then i', 'using', 'and', 'or', 'but', 'so', 'because']);

function isBadChunk(chunk) {
  const clean = chunk.toLowerCase().trim();
  if (BAD_WORDS.has(clean)) return true;
  if (clean === 'cut small' || clean === 'using blue' || clean === 'wings were' || clean === 'my teacher' || clean === 'was happy' || clean === 'said mia') return true;
  // Orphaned prepositions without object
  if (clean === 'walked to' || clean === 'looked at' || clean === 'sat down with' || clean === 'panel two' || clean === 'panel three') return true;
  return false;
}

function auditFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  
  const boldMatches = Array.from(content.matchAll(/\*\*(.*?)\*\*/g)).map(m => m[1].trim());
  const badChunks = [];
  const punctuationInside = [];
  const missingDict = [];
  const missingFocus = [];

  // Check chunk_focus
  const cfMatch = content.match(/export const chunk_focus = \[([\s\S]*?)\];/);
  let chunkFocus = new Set();
  if (cfMatch) {
    const rawItems = Array.from(cfMatch[1].matchAll(/(?:"([^"]+)"|'([^']+)')/g)).map(m => (m[1] || m[2]).toLowerCase().trim());
    chunkFocus = new Set(rawItems);
  }

  // Check dictionary
  const dictMatch = content.match(/export const dictionary = \{([\s\S]*?)\};/);
  let dictKeys = new Set();
  if (dictMatch) {
    const rawKeys = Array.from(dictMatch[1].matchAll(/(?:"([^"]+)"|'([^']+)'|([a-zA-Z0-9_\-\s]+))\s*:/g)).map(m => (m[1] || m[2] || m[3]).toLowerCase().trim());
    dictKeys = new Set(rawKeys);
  }

  for (const b of boldMatches) {
    const clean = b.trim();
    const lower = clean.toLowerCase();

    if (/[.,!?;:]$/.test(clean)) {
      punctuationInside.push(b);
    }
    if (isBadChunk(b)) {
      badChunks.push(b);
    }

    if (cfMatch && !chunkFocus.has(lower)) {
      missingFocus.push(b);
    }
    if (dictMatch && !dictKeys.has(lower) && !dictKeys.has(clean)) {
      missingDict.push(b);
    }
  }

  return {
    filePath,
    boldCount: boldMatches.length,
    badChunks,
    punctuationInside,
    missingDict,
    missingFocus
  };
}

function runAudit(dirPath) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    if (fs.statSync(itemPath).isDirectory() && item.startsWith('week_') && !item.includes('OLD') && !item.includes('BACKUP')) {
      const readPath = path.join(itemPath, 'read.js');
      const explorePath = path.join(itemPath, 'explore.js');

      const readRes = auditFile(readPath);
      if (readRes && (readRes.badChunks.length > 0 || readRes.punctuationInside.length > 0 || readRes.missingDict.length > 0 || readRes.missingFocus.length > 0)) {
        results.push(readRes);
      }

      const exploreRes = auditFile(explorePath);
      if (exploreRes && (exploreRes.badChunks.length > 0 || exploreRes.punctuationInside.length > 0 || exploreRes.missingDict.length > 0 || exploreRes.missingFocus.length > 0)) {
        results.push(exploreRes);
      }
    }
  }

  return results;
}

function printResults(results) {
  results.forEach(r => {
    console.log(`\nFile: ${r.filePath}`);
    if (r.badChunks.length > 0) console.log(`  Bad chunks:`, r.badChunks);
    if (r.punctuationInside.length > 0) console.log(`  Punctuation inside bold:`, r.punctuationInside);
    if (r.missingFocus.length > 0) console.log(`  Missing in chunk_focus:`, r.missingFocus);
    if (r.missingDict.length > 0) console.log(`  Missing in dictionary:`, r.missingDict);
  });
}

console.log('--- AUDITING EASY MODE ---');
const easyResults = runAudit('./src/data/weeks_easy');
console.log(`Found ${easyResults.length} files with issues in weeks_easy:`);
printResults(easyResults);

console.log('\n--- AUDITING ADVANCED MODE ---');
const advResults = runAudit('./src/data/weeks');
console.log(`Found ${advResults.length} files with issues in weeks:`);
printResults(advResults);
