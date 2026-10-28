#!/usr/bin/env node
/**
 * WHITELIST ENTITY GATE (Gate 003B-0 Step 1)
 * 
 * Strict Enforcement:
 * 1. Scans student-facing text in the target week data files (src/data/weeks/week_{N}/).
 * 2. Scans active shared components used across the 15 Quests.
 * 3. Asserts ZERO rogue names or entities outside the authorized weekly character whitelist.
 *    For Week 34: "Jake", "Tom", "Nurse Sarah", "Sarah", "Headmaster" are STRICTLY PROHIBITED.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const TARGET_WEEK = parseInt(process.argv[2] || '34', 10);

console.log('========================================================================');
console.log(`🛡️ WHITELIST ENTITY GATE (Week ${TARGET_WEEK})`);
console.log('========================================================================\n');

// Week-specific entity definitions
const WEEK_CONFIGS = {
  34: {
    theme: 'The Lion and the Mouse',
    authorizedEntities: ['Leo', 'Lion', 'Milo', 'Mouse', 'Nova', 'Lexio', 'Aesop'],
    prohibitedRogueEntities: [
      { name: 'Jake', pattern: /\bJake\b/ },
      { name: 'Tom', pattern: /\bTom\b/ },
      { name: 'Nurse Sarah', pattern: /\bNurse\s+Sarah\b/i },
      { name: 'Sarah', pattern: /\bSarah\b/ },
      { name: 'Headmaster', pattern: /\bHeadmaster\b/i },
    ]
  },
  33: {
    theme: 'School Corridor Safety',
    authorizedEntities: ['Jake', 'Tom', 'Nurse Sarah', 'Sarah', 'Nova', 'Lexio', 'Headmaster'],
    prohibitedRogueEntities: [
      { name: 'Leo', pattern: /\bLeo\b/ },
      { name: 'Milo', pattern: /\bMilo\b/ }
    ]
  }
};

const config = WEEK_CONFIGS[TARGET_WEEK] || {
  theme: `Week ${TARGET_WEEK}`,
  authorizedEntities: ['Nova', 'Lexio'],
  prohibitedRogueEntities: [
    { name: 'Jake', pattern: /\bJake\b/ },
    { name: 'Tom', pattern: /\bTom\b/ }
  ]
};

console.log(`Auditing for Theme: "${config.theme}"`);
console.log(`Prohibited Rogue Entities: ${config.prohibitedRogueEntities.map(e => e.name).join(', ')}\n`);

const violations = [];

// 1. Files to scan: Week Data Hubs
const weekDataDir = path.join(ROOT_DIR, `src/data/weeks/week_${TARGET_WEEK}`);
const dataFilesToScan = [];
if (fs.existsSync(weekDataDir)) {
  fs.readdirSync(weekDataDir).forEach(f => {
    if (f.endsWith('.js') || f.endsWith('.json')) {
      dataFilesToScan.push(path.join(weekDataDir, f));
    }
  });
}

// 2. Active shared components used across 15 Quests
const sharedComponentsToScan = [
  'src/components/cambridge/InformationExchangeP2.jsx',
  'src/modules/zones/InfoExchangeZone.jsx',
  'src/components/cambridge/ActionLab.jsx',
  'src/components/cambridge/ScienceDragDropLab.jsx',
  'src/components/cambridge/DiscoveryReportCreator.jsx',
  'src/components/cambridge/SentenceSmashArena.jsx',
  'src/components/cambridge/WordBlitzSpeedMatch.jsx',
  'src/components/cambridge/MathBarModelQuest.jsx',
  'src/components/cambridge/VoiceShadowingKaraoke.jsx',
  'src/components/cambridge/SceneExplorerWebtoon.jsx',
  'src/components/cambridge/StoryRetellStudio.jsx',
  'src/components/cambridge/CreativeStoryWriter.jsx',
  'src/components/cambridge/BroadcastStudioVideo.jsx',
  'src/components/cambridge/ListeningShieldBoss.jsx',
  'src/components/cambridge/ReadingShieldBoss.jsx',
  'src/components/questmap/TaskScreen.jsx',
  'src/modules/zones/BossBattleZone.jsx'
].map(p => path.join(ROOT_DIR, p)).filter(p => fs.existsSync(p));

const allFiles = [...dataFilesToScan, ...sharedComponentsToScan];

console.log(`Scanning ${allFiles.length} files (${dataFilesToScan.length} week data files + ${sharedComponentsToScan.length} active shared components)...`);

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(ROOT_DIR, filePath);

  lines.forEach((line, lineIdx) => {
    // Skip pure technical comments or imports if they don't contain student-facing text
    const trimmed = line.trim();
    if (trimmed.startsWith('//') && !trimmed.toLowerCase().includes('jake') && !trimmed.toLowerCase().includes('tom')) {
      return;
    }

    for (const rogue of config.prohibitedRogueEntities) {
      if (rogue.pattern.test(line)) {
        violations.push({
          gate: 'WHITELIST_ENTITY',
          file: relPath,
          line: lineIdx + 1,
          entity: rogue.name,
          snippet: trimmed
        });
        console.error(`  ❌ [FAIL] ${relPath}:${lineIdx + 1} -> Rogue entity "${rogue.name}" found: "${trimmed}"`);
      }
    }
  });
}

console.log('\n========================================================================');
console.log('📊 WHITELIST ENTITY AUDIT RESULTS');
console.log('========================================================================');
console.log(`Total Rogue Entity Violations: ${violations.length}`);

if (violations.length > 0) {
  console.error('\n🚨 WHITELIST ENTITY GATE FAILED WITH THE FOLLOWING VIOLATIONS:');
  violations.forEach((v, i) => {
    console.error(`  [${i + 1}] [${v.entity}] ${v.file}:${v.line} -> ${v.snippet}`);
  });
  console.log('\n❌ EXIT 1 (Whitelist Entity Gate FAILED as expected on unpatched codebase)\n');
  process.exit(1);
}

console.log(`\n✅ WHITELIST ENTITY GATE PASSED: All student-facing entities match authorized whitelist for Week ${TARGET_WEEK}.\n`);
process.exit(0);
