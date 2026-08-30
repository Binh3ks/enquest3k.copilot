import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const listeningHubPath = path.join(rootDir, 'src/data/weeks/week_33/listening_hub.js');
const manifestAuditPath = path.join(rootDir, 'docs/audit/w33/W33_AUDIO_SEMANTIC_MANIFEST.json');

console.log('========================================================================');
console.log('🧪 RUNNING W33 SOURCE-OF-TRUTH MANIFEST DRIFT TESTS (P4, P5, P2)');
console.log('========================================================================\n');

const originalHubContent = fs.readFileSync(listeningHubPath, 'utf-8');

try {
  // ── 1. DRIFT TEST P4: Mutate P4 Q1 dialogue script ─────────────────────────
  console.log('▶️ Running Drift Test P4 (Listening Part 4 projection)...');
  const mutatedP4Content = originalHubContent.replace(
    "The cleaner had just washed the tiles with water.",
    "DRIFT_P4_TEST: The cleaner washed the wet floor thoroughly."
  );
  fs.writeFileSync(listeningHubPath, mutatedP4Content, 'utf-8');
  execSync('node scripts/build_w33_audio_manifest.mjs', { cwd: rootDir });

  const manifestP4 = JSON.parse(fs.readFileSync(manifestAuditPath, 'utf-8'));
  const p4Entry = manifestP4.assets.find(a => a.file.includes('listening_p4_q1.mp3'));
  if (!p4Entry || !p4Entry.transcript.includes('DRIFT_P4_TEST')) {
    throw new Error(`Drift Test P4 FAILED: Expected manifest to contain mutated string, got: ${p4Entry?.transcript}`);
  }
  // Also assert that Question 1. prefix is NOT present in the projection
  if (p4Entry.transcript.startsWith('Question 1.')) {
    throw new Error(`Drift Test P4 FAILED: Manifest transcript contains forbidden synthetic 'Question 1.' prefix!`);
  }
  console.log('  ✅ Drift Test P4 PASSED: Manifest dynamically updated and pure of duplicated question prefix.');

  // ── 2. DRIFT TEST P5: Mutate P5 Instruction 3 ──────────────────────────────
  console.log('\n▶️ Running Drift Test P5 (Listening Part 5 instruction derivation)...');
  const mutatedP5Content = originalHubContent.replace(
    'text: "Color the door frame bright green"',
    'text: "DRIFT_P5_TEST: Color the science door neon green"'
  );
  fs.writeFileSync(listeningHubPath, mutatedP5Content, 'utf-8');
  execSync('node scripts/build_w33_audio_manifest.mjs', { cwd: rootDir });

  const manifestP5 = JSON.parse(fs.readFileSync(manifestAuditPath, 'utf-8'));
  const p5Entry = manifestP5.assets.find(a => a.file.includes('listening_p5_inst3.mp3'));
  if (!p5Entry || !p5Entry.transcript.includes('DRIFT_P5_TEST')) {
    throw new Error(`Drift Test P5 FAILED: Expected manifest to contain mutated string from listening_hub.js, got: ${p5Entry?.transcript}`);
  }
  console.log('  ✅ Drift Test P5 PASSED: Manifest dynamically derived inst3 from listening_hub.js without hardcoded arrays.');

  // ── 3. DRIFT TEST P2: Mutate P2 dialogue & verify no speaker labels ────────
  console.log('\n▶️ Running Drift Test P2 (Listening Part 2 clean transcript)...');
  const mutatedP2Content = originalHubContent.replace(
    "It happened while students were walking through the school corridor near the science room.",
    "DRIFT_P2_TEST: It happened while students were walking down the main school corridor near the science room."
  );
  fs.writeFileSync(listeningHubPath, mutatedP2Content, 'utf-8');
  execSync('node scripts/build_w33_audio_manifest.mjs', { cwd: rootDir });

  const manifestP2 = JSON.parse(fs.readFileSync(manifestAuditPath, 'utf-8'));
  const p2Entry = manifestP2.assets.find(a => a.file.includes('listening_p2_full.mp3'));
  if (!p2Entry || !p2Entry.transcript.includes('DRIFT_P2_TEST')) {
    throw new Error(`Drift Test P2 FAILED: Expected manifest to contain mutated string, got: ${p2Entry?.transcript}`);
  }
  if (p2Entry.transcript.includes('woman:') || p2Entry.transcript.includes('man:')) {
    throw new Error(`Drift Test P2 FAILED: Manifest transcript contains synthetic speaker labels ('woman:' / 'man:')!`);
  }
  console.log('  ✅ Drift Test P2 PASSED: Manifest dynamically derived clean spoken text with zero speaker labels.');

} finally {
  // ── 4. RESTORE SOURCE AND REBUILD CLEAN MANIFEST ────────────────────────────
  console.log('\n▶️ Restoring original source and regenerating clean canonical manifest...');
  fs.writeFileSync(listeningHubPath, originalHubContent, 'utf-8');
  execSync('node scripts/build_w33_audio_manifest.mjs', { cwd: rootDir });
  console.log('  ✅ Clean state restored successfully.');
}

console.log('\n🎉 ALL 3 SOURCE-OF-TRUTH MANIFEST DRIFT TESTS (P4, P5, P2) PASSED WITH 100% PROVENANCE!\n');
