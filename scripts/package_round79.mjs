/**
 * scripts/package_round79.mjs
 *
 * PACKAGES ROUND 79 EVIDENCE, PROPOSALS, TEMP BLUEPRINTS & SCRIPTS INTO:
 *   docs/review_packages/round79_20261111.zip
 * and writes docs/review_packages/manifest_round79.txt
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round79_20261111.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 79 REVIEW & PROPOSAL DELIVERABLES');
console.log('========================================================================');

// 1. Copy Round 79 & supporting baseline artifacts
const artifactsToInclude = [
  'docs/agent_artifacts/round79_proposed_digital_map_v2.md',
  'docs/agent_artifacts/round79_digital_map_and_rotary_raw.txt',
  'docs/agent_artifacts/round79_blueprints_cefr_and_c8_raw.txt',
  'docs/agent_artifacts/round79_w79_w80_vocab_options.md',
  'docs/agent_artifacts/round79_wave3_acceptance_spec_v2.md',
  'docs/agent_artifacts/round79_w80_tech_debt_and_math_runtime_raw.txt',
  'docs/agent_artifacts/round78_w79_w80_split_proposal.md',
  'docs/agent_artifacts/round78_wave3_acceptance_spec.md',
  'docs/agent_artifacts/round64_mock_schedule_and_conflicts.md'
];

fs.mkdirSync(path.join(TMP_STAGE, 'artifacts'), { recursive: true });
const rawFileHashes = {};
for (const a of artifactsToInclude) {
  const src = path.join(ROOT_DIR, a);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required Round 79 artifact: ${a}`);
  }
  fs.copyFileSync(src, path.join(TMP_STAGE, 'artifacts', path.basename(a)));
  const buf = fs.readFileSync(src);
  rawFileHashes[a] = crypto.createHash('sha256').update(buf).digest('hex');
}

// 2. Copy all 156 preserved-schema temp blueprints
const tempBpSrc = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_temp_blueprints');
if (!fs.existsSync(tempBpSrc)) {
  throw new Error('Missing docs/agent_artifacts/round79_temp_blueprints');
}
fs.cpSync(tempBpSrc, path.join(TMP_STAGE, 'temp_blueprints'), { recursive: true });
const tempBpCount = fs.readdirSync(path.join(TMP_STAGE, 'temp_blueprints')).filter(f => f.endsWith('.json')).length;

// 3. Copy Staging Weeks referenced in W79 / Wave 3
const targetWeeks = [79, 126, 127, 129, 130, 131, 133, 134];
for (const w of targetWeeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required staging directory: docs/agent_artifacts/staging/week_${w}`);
  }
  fs.cpSync(src, dest, { recursive: true });
}

// 4. Copy Round 79 scripts + governance baselines
fs.mkdirSync(path.join(TMP_STAGE, 'scripts/lib'), { recursive: true });
const scriptsToInclude = [
  'scripts/lib/source_b_part2_parser.mjs',
  'scripts/generate_round79_digital_map_and_rotary.mjs',
  'scripts/generate_round79_blueprints_and_cefr.mjs',
  'scripts/generate_round79_cdef_reports.mjs',
  'scripts/package_round79.mjs',
  'scripts/guard_governance_docs.mjs'
];
for (const s of scriptsToInclude) {
  const src = path.join(ROOT_DIR, s);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required script: ${s}`);
  }
  const destRel = s.startsWith('scripts/lib/') ? path.join('scripts/lib', path.basename(s)) : path.join('scripts', path.basename(s));
  fs.copyFileSync(src, path.join(TMP_STAGE, destRel));
}

fs.mkdirSync(path.join(TMP_STAGE, 'governance'), { recursive: true });
for (const g of ['docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json']) {
  const src = path.join(ROOT_DIR, g);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required governance file: ${g}`);
  }
  fs.copyFileSync(src, path.join(TMP_STAGE, 'governance', path.basename(g)));
}

// 5. Generate Internal Manifest for Zip
let zipManifest = `ROUND 79 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nTemp Blueprints Count: ${tempBpCount}\n\nFILES:\n`;
function walk(dir, relPath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const ent of entries) {
    const curPath = path.join(dir, ent.name);
    const curRel = path.join(relPath, ent.name);
    if (ent.isDirectory()) {
      walk(curPath, curRel);
    } else {
      const data = fs.readFileSync(curPath);
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      zipManifest += `${hash}  ${curRel} (${data.length} bytes)\n`;
    }
  }
}
walk(TMP_STAGE);
fs.writeFileSync(path.join(TMP_STAGE, 'manifest.txt'), zipManifest, 'utf8');

// 6. Create Zip Archive
console.log(`Creating ${ZIP_FILE}...`);
execSync(`cd "${TMP_STAGE}" && zip -rq "${ZIP_FILE}" .`, { stdio: 'inherit' });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

// 7. Write External Manifest (manifest_round79.txt)
const zipData = fs.readFileSync(ZIP_FILE);
const zipSha = crypto.createHash('sha256').update(zipData).digest('hex');
let deliverablesCommit = 'unknown';
try {
  deliverablesCommit = execSync('git rev-parse HEAD', { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
} catch (e) {}

let hashListing = '';
for (const [f, h] of Object.entries(rawFileHashes)) {
  hashListing += `  ${h}  ${f}\n`;
}

const externalManifest = `ROUND 79 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:           ${new Date().toISOString()}
deliverables_commit: ${deliverablesCommit}

ZIP PACKAGE:
  Path:    docs/review_packages/round79_20261111.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

DRY-RUN TEMP BLUEPRINTS:
  Directory: docs/agent_artifacts/round79_temp_blueprints/ (${tempBpCount} files)

RAW FORENSIC ARTIFACTS & SHA-256 HASHES:
${hashListing}
SCOPE COMPLIANCE (ROUND 79 — PROPOSAL ONLY):
  - src/data/weeks/: 0 modifications
  - SOP / MASTER_ARCH / ARCHITECTURE_CURRENT / AGENTS / Digital Map: 0 modifications
  - docs/agent_artifacts/staging/: 0 modifications / 0 regeneration / 0 merge
  - Proposals included for review:
      * A.1: Digital Map v2 keeps non-conflicting Source A Col 6 hub/activity mappings under [SUPPLEMENT — Source A]
      * A.2: B.6 split into 3 separated script-computed counts (genuine SB conflicts / Source A [SUPPLEMENT] / removed Mock flags)
      * A.3: Consumer audit (bossRotarySchedule.js math vs generate_week_blueprint.mjs Map regex + W150 cleanTheme /MOCK/i discovery), Rotary 1-4 restored on W33-156, 156-row Col 3 diff table
      * B.4: 156 temp blueprints preserving 100% existing prod keys (0 dropped keys, patching ONLY 8 SB-derived fields) + field-by-field diff
      * B.5: All existing prod CEFR (cefr_level | cefr_stage) grouped + 1 standardized proposal keeping W113-W120 [CHỜ OWNER]
      * B.6: C.8 W129-132 display bug fixed -> "Review & Math Logic Cycle [W129–132]"
      * C.7 & C.8: W79/W80 13 SUPPLEMENT vocab clarified with both Option (a) & Option (b1/b2) neutrally ([CHỜ OWNER])
      * D.9: Wave 3 Acceptance Spec v2 updated from actual src/ runtime (BarModelQuest.jsx, BarModelSVG.jsx, barModelEvaluator.js) for W133 Geometry: Angles & W134 Geometry: Triangles + staged key warning
      * E.10: Read-only forensic audit of week_80 (and week_76) prod tech debt (blueprint/source_grounding/provenance/JS clone issues)
      * F.11: Runtime Math loader proof (index.js -> zoneDataMapper/TaskScreen -> BattleArenaZone -> BarModelQuest) + 22 prod content weeks scan
  - Pending Owner Decision:
      * C.7: W79/W80 13 SUPPLEMENT vocab Option (a) 26 new words vs Option (b1) split 7+6 vs Option (b2) repeat 13 shared
      * B.5: W113-W120 CEFR Phase 2 B1 PET (Source B L949-953) vs B1+ Academic (SOP:L106 / MASTER_ARCH:L28,156)
      * M24-M34 mock format after W116 (PET vs B1+ Academic)
      * Approval of SUPPLEMENT items (W79/W80 Math, Digital Map v2 patch, W80/W76 prod repair plan, F.11 runtime math loader normalization)
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round79.txt');
fs.writeFileSync(MANIFEST_PATH, externalManifest, 'utf8');

console.log(`\n✓ Package created successfully: ${path.relative(ROOT_DIR, ZIP_FILE)}`);
console.log(`✓ External manifest written:     ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`  deliverables_commit: ${deliverablesCommit}`);
console.log(`  Package Size:        ${zipData.length} bytes`);
console.log(`  Package SHA:         ${zipSha}`);

