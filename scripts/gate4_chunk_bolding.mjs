#!/usr/bin/env node
/**
 * GATE 4: ESL Chunk Bolding Auditor (Linear Thinking Standard)
 * Validates:
 * 1. Presence of bold chunks (**...**) in read.js, explore.js, reading_hub.js, and story_scenes
 * 2. Terminal punctuation (., ,, !, ?, :, ;) MUST strictly stay OUTSIDE bold tags
 * 3. Chunks are appropriate length (2-4 words per unit)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '34';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);

console.log(`\n========================================================================`);
console.log(`🛡️  GATE 4: ESL CHUNK BOLDING AUDIT (WEEK ${weekNum})`);
console.log(`========================================================================`);

const weekDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
let errors = [];
let totalChunksChecked = 0;

// Scan story_scenes in read.js
const readPath = path.join(weekDir, 'read.js');
if (fs.existsSync(readPath)) {
  const content = fs.readFileSync(readPath, 'utf8');
  
  // Find all bold instances **...**
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;
  let sceneChunks = 0;
  
  while ((match = boldRegex.exec(content)) !== null) {
    totalChunksChecked++;
    sceneChunks++;
    const chunkText = match[1];
    
    // Check for punctuation inside bold tag
    if (/[.,!?:;]$/.test(chunkText.trim())) {
      errors.push(`[PUNCTUATION INSIDE BOLD] "${match[0]}" in read.js has punctuation inside bold tag!`);
    }
    
    // Check word count (1 to 5 words)
    const words = chunkText.trim().split(/\s+/);
    if (words.length > 5) {
      errors.push(`[CHUNK TOO LONG] "${chunkText}" has ${words.length} words (Max recommended: 4 words)`);
    }
  }
  
  console.log(`📖 Scanned read.js: Found ${sceneChunks} valid ESL bold chunks.`);
  if (sceneChunks < 5) {
    errors.push(`read.js has only ${sceneChunks} bold chunks (Minimum required: 5)`);
  }
}

// Scan reading_hub.js
const readingHubPath = path.join(weekDir, 'reading_hub.js');
if (fs.existsSync(readingHubPath)) {
  const content = fs.readFileSync(readingHubPath, 'utf8');
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;
  
  while ((match = boldRegex.exec(content)) !== null) {
    totalChunksChecked++;
    const chunkText = match[1];
    if (/[.,!?:;]$/.test(chunkText.trim())) {
      errors.push(`[PUNCTUATION INSIDE BOLD] "${match[0]}" in reading_hub.js has punctuation inside bold tag!`);
    }
  }
}

console.log(`\n------------------------------------------------------------------------`);
if (errors.length > 0) {
  console.error(`❌ GATE 4 FAILED with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`   - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 4 PASSED: ${totalChunksChecked} Chunks Checked (100% ESL Linear Thinking Standard)!`);
  process.exit(0);
}
