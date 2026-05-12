/**
 * Update mindmap audio URLs to content-hash-based paths.
 * Hash is derived from text content (same as voiceService.hashText).
 * This ensures: text changes → hash changes → R2 MISS → fresh Deepgram call.
 *
 * Usage: node tools/update_mindmap_hash_urls.js [startWeek] [endWeek]
 * Example: node tools/update_mindmap_hash_urls.js 28 31
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const startWeek = parseInt(args[0]) || 28;
const endWeek = parseInt(args[1]) || startWeek;

/** Replicate voiceService.hashText exactly */
function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Rewrite a mindmap.js file so every stem/branch audio URL
 * is derived from its text content: /audio/<folder>/mindmap_stem_<hash>.mp3
 */
async function rewriteFile(filePath, folder) {
  // Dynamic import to parse current JS
  const mod = await import(pathToFileURL(filePath).href + `?t=${Date.now()}`);
  const data = mod.default;

  if (!data.centerStems || !data.branchLabels) {
    console.warn(`   ⚠️  No centerStems/branchLabels in ${filePath}`);
    return;
  }

  // Build new centerStems
  const newStems = data.centerStems.map(stem => {
    const text = typeof stem === 'string' ? stem : stem.text;
    return { text, audio: `/audio/${folder}/mindmap_stem_${hashText(text)}.mp3` };
  });

  // Build new branchLabels (object keyed by stem text)
  const newBranches = {};
  for (const [key, branches] of Object.entries(data.branchLabels)) {
    if (!Array.isArray(branches)) {
      console.warn(`   ⚠️  branchLabels["${key}"] is not an array, skipping`);
      continue;
    }
    newBranches[key] = branches.map(branch => {
      const text = typeof branch === 'string' ? branch : branch.text;
      return { text, audio: `/audio/${folder}/mindmap_branch_${hashText(text)}.mp3` };
    });
  }

  // Render JS source
  const stemLines = newStems
    .map(s => `    { text: ${JSON.stringify(s.text)}, audio: ${JSON.stringify(s.audio)} }`)
    .join(',\n');

  const branchEntries = Object.entries(newBranches)
    .map(([key, branches]) => {
      const branchLines = branches
        .map(b => `      { text: ${JSON.stringify(b.text)}, audio: ${JSON.stringify(b.audio)} }`)
        .join(',\n');
      return `    ${JSON.stringify(key)}: [\n${branchLines}\n    ]`;
    })
    .join(',\n');

  const output =
`const mindMapContent = {
  centerStems: [
${stemLines}
  ],
  branchLabels: {
${branchEntries}
  }
};

export default mindMapContent;
`;

  fs.writeFileSync(filePath, output, 'utf-8');
  console.log(`   ✅ Rewritten: ${path.relative(ROOT, filePath)}`);
  console.log(`      ${newStems.length} stems, ${Object.values(newBranches).flat().length} branches`);
}

async function main() {
  for (let w = startWeek; w <= endWeek; w++) {
    const padded = w.toString().padStart(2, '0');
    console.log(`\n📅 Week ${padded}:`);

    const advFile = path.join(ROOT, `src/data/weeks/week_${padded}/mindmap.js`);
    const easyFile = path.join(ROOT, `src/data/weeks_easy/week_${padded}/mindmap.js`);

    for (const [filePath, folder] of [[advFile, `week${w}`], [easyFile, `week${w}_easy`]]) {
      if (!fs.existsSync(filePath)) {
        console.log(`   ⏭️  Not found: ${path.relative(ROOT, filePath)}`);
        continue;
      }
      try {
        await rewriteFile(filePath, folder);
      } catch (e) {
        console.error(`   ❌ Error: ${e.message}`);
      }
    }
  }
  console.log('\n✅ Done. All mindmap audio URLs are now content-hash-based.\n');
}

main();
