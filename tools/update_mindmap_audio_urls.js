#!/usr/bin/env node
/**
 * ENGQUEST3K MINDMAP AUDIO URL AUTO-FILL SCRIPT (Updated JAN 15, 2026)
 * 
 * Purpose: Auto-fill audio URLs in mindmap.js data files to prevent browser TTS fallback
 * 
 * What It Does:
 *   - Converts centerStems from strings to objects with .audio property
 *   - Converts branchLabels entries from strings to objects with .audio property
 *   - Auto-fills correct audio URLs based on generated files
 * 
 * Example - BEFORE:
 *   centerStems: ["This is my ___.", "My mother is ___."]
 *   branchLabels: { "This is my ___.": ["mother and father", "big brother", ...] }
 * 
 * Example - AFTER:
 *   centerStems: [
 *     { text: "This is my ___.", audio: "/audio/week2/mindmap_stem_1.mp3" },
 *     { text: "My mother is ___.", audio: "/audio/week2/mindmap_stem_2.mp3" }
 *   ]
 *   branchLabels: {
 *     "This is my ___.": [
 *       { text: "mother and father", audio: "/audio/week2/mindmap_branch_1.mp3" },
 *       { text: "big brother", audio: "/audio/week2/mindmap_branch_2.mp3" }
 *     ]
 *   }
 * 
 * Usage: node tools/update_mindmap_audio_urls.js <week_number>
 * Example: node tools/update_mindmap_audio_urls.js 2
 * 
 * Important: Run AFTER generate_audio_final.py and BEFORE final validation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

function updateMindmapAudioUrls(week, mode) {
  const weekId = String(week).padStart(2, '0');
  const dataDir = mode === 'advanced' ? 'weeks' : 'weeks_easy';
  const mindmapPath = path.join(ROOT, 'src', 'data', dataDir, `week_${weekId}`, 'mindmap.js');
  const audioDir = `week${week}${mode === 'easy' ? '_easy' : ''}`;

  if (!fs.existsSync(mindmapPath)) {
    console.log(`⏭️  ${mindmapPath} does not exist. Skipping.`);
    return;
  }

  let content = fs.readFileSync(mindmapPath, 'utf-8');

  // Convert centerStems from strings to objects with text and audio properties
  content = content.replace(
    /centerStems:\s*\[\s*([\s\S]*?)\s*\]/,
    (match) => {
      // Extract the array content
      const arrayContent = match.match(/\[([\s\S]*)\]/)[1];
      const stems = [];
      let stemIndex = 1;
      
      // Find all quoted strings
      const stringMatches = arrayContent.match(/"[^"]*"|'[^']*'/g) || [];
      
      stringMatches.forEach(str => {
        const cleanStr = str.slice(1, -1); // Remove quotes
        stems.push(
          `{ text: "${cleanStr}", audio: "/audio/${audioDir}/mindmap_stem_${stemIndex}.mp3" }`
        );
        stemIndex++;
      });

      return `centerStems: [\n    ${stems.join(',\n    ')}\n  ]`;
    }
  );

  // Convert branchLabels entries from strings to objects with text and audio
  // This is trickier because branchLabels is an object with arrays
  content = content.replace(
    /branchLabels:\s*{([\s\S]*?)}\s*}/,
    (match) => {
      let branchIndex = 1;
      let updatedBranchLabels = match;

      // Replace each branch string with an object
      // We need to be careful here - find patterns like "text" inside arrays
      updatedBranchLabels = updatedBranchLabels.replace(
        /"([^"]+)"\s*(?=,|\])/g,
        (branchMatch, branchText) => {
          // Don't replace the stem labels (keys), only the branch values
          // Stems are like "This is my ___." - they have ___ in them
          if (branchText.includes('___')) {
            return branchMatch; // Keep stem labels as is
          }
          const audioUrl = `/audio/${audioDir}/mindmap_branch_${branchIndex}.mp3`;
          branchIndex++;
          return `{ text: "${branchText}", audio: "${audioUrl}" }`;
        }
      );

      return updatedBranchLabels;
    }
  );

  // Write back
  fs.writeFileSync(mindmapPath, content, 'utf-8');
  console.log(`✅ Updated: ${mindmapPath}`);
}

function main() {
  const args = process.argv.slice(2);
  const week = parseInt(args[0]);

  if (!week || week < 1 || week > 54) {
    console.error('❌ Usage: node tools/update_mindmap_audio_urls.js <week_number>');
    console.error('   Example: node tools/update_mindmap_audio_urls.js 2');
    process.exit(1);
  }

  console.log(`🔥 Updating mindmap audio URLs for Week ${week}...`);
  updateMindmapAudioUrls(week, 'advanced');
  updateMindmapAudioUrls(week, 'easy');
  console.log('✅ Done!');
}

main();
