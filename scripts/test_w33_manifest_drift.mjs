import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const listeningHubPath = path.join(rootDir, 'src/data/weeks/week_33/listening_hub.js');
const readingHubPath = path.join(rootDir, 'src/data/weeks/week_33/reading_hub.js');
const readJsPath = path.join(rootDir, 'src/data/weeks/week_33/read.js');
const manifestAuditPath = path.join(rootDir, 'docs/audit/w33/W33_AUDIO_SEMANTIC_MANIFEST.json');

console.log('========================================================================');
console.log('🧪 RUNNING HARDENED W33 SOURCE-MANIFEST DRIFT & FAIL-CLOSED GATE TESTS');
console.log('========================================================================\n');

const originalListeningHub = fs.readFileSync(listeningHubPath, 'utf-8');
const originalReadingHub = fs.readFileSync(readingHubPath, 'utf-8');
const originalReadJs = fs.readFileSync(readJsPath, 'utf-8');

function assertGateBlocksOnDrift(testName, mutateFn, restoreFn) {
  try {
    mutateFn();
    // 1. DO NOT rebuild manifest -> Gate MUST FAIL CLOSED
    let gateThrew = false;
    let gateOutput = '';
    try {
      gateOutput = execSync('node scripts/whisper_audio_semantic_validator.mjs --check-manifest-only', {
        cwd: rootDir,
        encoding: 'utf-8',
        stdio: 'pipe'
      });
    } catch (err) {
      gateThrew = true;
      gateOutput = err.stderr || err.stdout || '';
    }

    if (!gateThrew || !gateOutput.includes('MANIFEST SOURCE DRIFT DETECTED')) {
      throw new Error(`${testName} FAILED: Validator gate did NOT fail closed on source drift! Output: ${gateOutput}`);
    }
    console.log(`  ✅ [Fail-Closed Verified] ${testName}: Gate correctly blocked on stale on-disk manifest.`);

    // 2. Rebuild manifest -> Gate MUST PASS
    execSync('node scripts/build_w33_audio_manifest.mjs', { cwd: rootDir, stdio: 'pipe' });
    const passOutput = execSync('node scripts/whisper_audio_semantic_validator.mjs --check-manifest-only', {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    if (!passOutput.includes('Gate Check Passed')) {
      throw new Error(`${testName} FAILED: Gate did not pass after manifest rebuild.`);
    }
    console.log(`  ✅ [Recovery Verified]   ${testName}: Manifest rebuild restored cryptographic identity.`);
  } finally {
    restoreFn();
    execSync('node scripts/build_w33_audio_manifest.mjs', { cwd: rootDir, stdio: 'pipe' });
  }
}

try {
  // ── TEST A: Listening P4 Source Mutation ───────────────────────────────────
  console.log('▶️ TEST A — Listening Part 4 Source Mutation...');
  assertGateBlocksOnDrift(
    'TEST A (P4 Dialogue Mutation)',
    () => {
      const mutated = originalListeningHub.replace(
        "The cleaner had just washed the tiles with water.",
        "DRIFT_TEST_P4: The cleaner washed the corridor tiles."
      );
      fs.writeFileSync(listeningHubPath, mutated, 'utf-8');
    },
    () => {
      fs.writeFileSync(listeningHubPath, originalListeningHub, 'utf-8');
    }
  );

  // ── TEST B: Listening P5 Instruction Mutation ──────────────────────────────
  console.log('\n▶️ TEST B — Listening Part 5 Instruction Mutation...');
  assertGateBlocksOnDrift(
    'TEST B (P5 Instruction Mutation)',
    () => {
      const mutated = originalListeningHub.replace(
        'text: "Color the door frame bright green"',
        'text: "DRIFT_TEST_P5: Color the door frame neon green"'
      );
      fs.writeFileSync(listeningHubPath, mutated, 'utf-8');
    },
    () => {
      fs.writeFileSync(listeningHubPath, originalListeningHub, 'utf-8');
    }
  );

  // ── TEST C: Listening P2 Dialogue Mutation ─────────────────────────────────
  console.log('\n▶️ TEST C — Listening Part 2 Dialogue Mutation...');
  assertGateBlocksOnDrift(
    'TEST C (P2 Dialogue Mutation)',
    () => {
      const mutated = originalListeningHub.replace(
        "It happened while students were walking through the school corridor near the science room.",
        "DRIFT_TEST_P2: It happened in the second floor hallway."
      );
      fs.writeFileSync(listeningHubPath, mutated, 'utf-8');
    },
    () => {
      fs.writeFileSync(listeningHubPath, originalListeningHub, 'utf-8');
    }
  );

  // ── TEST D: STEM Story Mutation in read.js ─────────────────────────────────
  console.log('\n▶️ TEST D — Authoritative STEM Story Mutation (read.js)...');
  assertGateBlocksOnDrift(
    'TEST D (STEM Story Mutation in read.js)',
    () => {
      const mutated = originalReadJs.replaceAll(
        "Jake was walking carefully down the school corridor after science class.",
        "DRIFT_TEST_STEM: Jake walked slowly along the corridor after physics."
      );
      fs.writeFileSync(readJsPath, mutated, 'utf-8');
    },
    () => {
      fs.writeFileSync(readJsPath, originalReadJs, 'utf-8');
    }
  );

} finally {
  // Final clean restore
  fs.writeFileSync(listeningHubPath, originalListeningHub, 'utf-8');
  fs.writeFileSync(readingHubPath, originalReadingHub, 'utf-8');
  fs.writeFileSync(readJsPath, originalReadJs, 'utf-8');
  execSync('node scripts/build_w33_audio_manifest.mjs', { cwd: rootDir, stdio: 'pipe' });
}

console.log('\n🎉 ALL 4 DRIFT & FAIL-CLOSED GATE TESTS (TESTS A, B, C, D) PASSED WITH ZERO FALSE-GREENS!\n');
