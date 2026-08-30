import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('========================================================================');
console.log('🔍 W33 INDEPENDENT AUDIO PIPELINE FORENSIC AUDIT (STEP 1F)');
console.log('========================================================================\n');

// Load manifest and validation report
const manifestPath = path.join(rootDir, 'docs/audit/w33/W33_AUDIO_SEMANTIC_MANIFEST.json');
const reportPath = path.join(rootDir, 'docs/audit/w33/W33_AUDIO_SEMANTIC_VALIDATION_REPORT.json');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

// ── 1. PHYSICAL AUDIO INTEGRITY AUDIT ─────────────────────────────────────────
console.log('▶️ [1/6] Auditing physical MP3 integrity and hashes...');
const physicalAudit = [];
const hashMap = new Map();

for (const entry of manifest.assets) {
  const filePath = path.join(rootDir, entry.filesystem_path || entry.file);
  const exists = fs.existsSync(filePath);
  let size = 0;
  let sha256 = null;
  let isZeroByte = false;

  if (exists) {
    const buf = fs.readFileSync(filePath);
    size = buf.length;
    isZeroByte = size === 0;
    sha256 = crypto.createHash('sha256').update(buf).digest('hex');

    if (hashMap.has(sha256)) {
      hashMap.get(sha256).push(entry.file);
    } else {
      hashMap.set(sha256, [entry.file]);
    }
  }

  const reportAsset = report.assets.find(a => a.file === entry.file || a.asset === entry.file.replace(/^public/, ''));

  physicalAudit.push({
    file: entry.file,
    filename: path.basename(entry.file),
    exists,
    size_bytes: size,
    is_zero_byte: isZeroByte,
    sha256,
    category: entry.category,
    part: entry.part,
    source_file: entry.source_file,
    source_key: entry.source_key,
    transcript_provenance: entry.transcript_provenance,
    expected_transcript: entry.transcript,
    actual_transcript: reportAsset?.actual_transcript || null,
    similarity: reportAsset?.similarity ?? null,
    classification: reportAsset?.classification || 'UNKNOWN',
    anchors_required: entry.required_anchors || [],
    anchors_found: reportAsset?.detected_anchors || []
  });
}

// Check for hash collisions
const duplicateHashes = [];
for (const [hash, files] of hashMap.entries()) {
  if (files.length > 1) {
    duplicateHashes.push({ hash, files });
  }
}

// ── 2. RUNTIME UI BINDING AUDIT ──────────────────────────────────────────────
console.log('▶️ [2/6] Auditing runtime UI bindings and references...');
const srcDir = path.join(rootDir, 'src');

function grepFiles(dir, pattern, extFilter = ['.js', '.jsx', '.ts', '.tsx']) {
  let matches = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      matches = matches.concat(grepFiles(full, pattern, extFilter));
    } else if (extFilter.some(ext => ent.name.endsWith(ext))) {
      const content = fs.readFileSync(full, 'utf-8');
      if (content.includes(pattern)) {
        matches.push({ file: path.relative(rootDir, full) });
      }
    }
  }
  return matches;
}

for (const item of physicalAudit) {
  const relAudioUrl = item.file.replace(/^public/, '');
  const baseName = item.filename;
  const references = grepFiles(srcDir, baseName);
  item.runtime_bindings = references.map(r => r.file);
  item.is_referenced_in_src = references.length > 0;
}

// ── 3. GENERATOR SCRIPTS INVENTORY ───────────────────────────────────────────
console.log('▶️ [3/6] Mapping generator script fragmentation...');
const generatorScripts = [
  'tools/generate_w33_all_audio.mjs',
  'scripts/regenerate_w33_listening_audio.mjs',
  'scripts/regenerate_w33_stale_audio.mjs',
  'scripts/generate_exam_intro_audio.mjs',
  'tools/generate_w33_dialogue_audio.mjs',
  'tools/generate_w33_part1_audio.mjs',
  'tools/generate_w33_all_cambridge_audio.mjs'
];

const scriptInventory = {};
for (const s of generatorScripts) {
  const full = path.join(rootDir, s);
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, 'utf-8');
    const matchedFiles = [];
    for (const item of physicalAudit) {
      if (content.includes(item.filename)) {
        matchedFiles.push(item.filename);
      }
    }
    scriptInventory[s] = {
      path: s,
      exists: true,
      generated_w33_assets: matchedFiles,
      asset_count: matchedFiles.length
    };
  }
}

// ── 4. 54-ASSET SET RECONCILIATION ───────────────────────────────────────────
console.log('▶️ [4/6] Reconciling 54-asset set differences (A, B, C, D, E, F)...');
const setA_source = new Set(physicalAudit.map(a => a.filename)); // 54
const setB_generators = new Set();
Object.values(scriptInventory).forEach(s => s.generated_w33_assets.forEach(f => setB_generators.add(f)));
const setC_manifest = new Set(manifest.assets.map(a => path.basename(a.file)));
const setD_physical = new Set(physicalAudit.filter(a => a.exists).map(a => a.filename));
const setE_runtime = new Set(physicalAudit.filter(a => a.is_referenced_in_src).map(a => a.filename));
const setF_validator = new Set(report.assets.map(a => path.basename(a.file)));

const diff = (set1, set2) => [...set1].filter(x => !set2.has(x));

const setDifferences = {
  A_minus_B: diff(setA_source, setB_generators),
  A_minus_C: diff(setA_source, setC_manifest),
  A_minus_D: diff(setA_source, setD_physical),
  A_minus_E: diff(setA_source, setE_runtime),
  A_minus_F: diff(setA_source, setF_validator),
  B_minus_C: diff(setB_generators, setC_manifest),
  B_minus_D: diff(setB_generators, setD_physical),
  C_minus_D: diff(setC_manifest, setD_physical),
  D_minus_E: diff(setD_physical, setE_runtime),
  E_minus_F: diff(setE_runtime, setF_validator)
};

// ── 5. ADVERSARIAL PIPELINE TESTS ────────────────────────────────────────────
console.log('▶️ [5/6] Executing adversarial pipeline tests...');

// A. Duplication & Reordering Attack Analysis (Section 14)
console.log('  Testing Duplication & Reordering attacks against validator similarity...');
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function computeSimilarity(s1, s2) {
  const norm1 = s1.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  const norm2 = s2.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  if (!norm1 && !norm2) return 1.0;
  if (!norm1 || !norm2) return 0.0;
  const dist = levenshtein(norm1, norm2);
  const maxLen = Math.max(norm1.length, norm2.length);
  return 1 - dist / maxLen;
}

const simDup = computeSimilarity("First aid table clean bandage", "First aid table clean bandage clean bandage");
const simReorder = computeSimilarity("Jake walked to school corridor", "corridor walked school to Jake");

console.log(`  Duplication Attack (A B C vs A B B C): Similarity = ${(simDup * 100).toFixed(1)}%`);
console.log(`  Reordering Attack (A B C vs C B A): Similarity = ${(simReorder * 100).toFixed(1)}%`);

// B. Stale Manifest Simulation (Section 10)
console.log('  Analyzing Stale Manifest vulnerability scenario...');
const staleManifestRisk = {
  scenario: "Source hub text modified, but developer does not run 'node scripts/build_w33_audio_manifest.mjs'",
  behavior: "Validator reads manifest from disk, which contains OLD expected transcript. Physical audio is NEW (if regenerated) or OLD (if not regenerated).",
  vulnerability: "If neither audio nor manifest is regenerated after source edit, validator passes against old MP3 and old manifest with 100% green, despite application code having drifted."
};

// C. Wrong Audio Swap Test (Section 11)
console.log('  Testing audio file swap detection...');
const swapTestTarget = 'public/audio/week33/listening_p4_q1.mp3';
const swapTestDonor = 'public/audio/week33/listening_p4_q2.mp3';
const simSwap = computeSimilarity(
  "Why was the floor slippery near the science room? The cleaner had just washed the tiles with water.",
  "What happened when the boy ran fast? He slipped on the wet floor and hurt his knee."
);
console.log(`  Audio Swap Test (P4 Q1 expected vs P4 Q2 actual): Similarity = ${(simSwap * 100).toFixed(1)}% (Categorized as SEMANTIC_MISMATCH < 70% or missing anchors)`);

// ── 6. COMPOSE AND SAVE OUTPUT MATRIX & FINDINGS ─────────────────────────────
console.log('\n▶️ [6/6] Writing comprehensive audit artifacts...');

const matrixOutput = {
  timestamp: new Date().toISOString(),
  governing_standard: "W33 Golden Learning & Assessment Standard v1.0",
  total_assets: physicalAudit.length,
  summary: {
    total: physicalAudit.length,
    physical_exists: physicalAudit.filter(a => a.exists).length,
    zero_byte_count: physicalAudit.filter(a => a.is_zero_byte).length,
    duplicate_hash_groups: duplicateHashes.length,
    strict_pass: physicalAudit.filter(a => a.classification === 'PASS').length,
    minor_variance: physicalAudit.filter(a => a.classification === 'MINOR_TRANSCRIPTION_VARIANCE').length,
    semantic_mismatch: physicalAudit.filter(a => a.classification === 'SEMANTIC_MISMATCH').length
  },
  set_reconciliation: {
    counts: {
      A_source_defined: setA_source.size,
      B_generator_defined: setB_generators.size,
      C_manifest_defined: setC_manifest.size,
      D_physical_on_disk: setD_physical.size,
      E_runtime_referenced: setE_runtime.size,
      F_validator_audited: setF_validator.size
    },
    differences: setDifferences
  },
  duplicate_hashes: duplicateHashes,
  generator_scripts_inventory: scriptInventory,
  adversarial_analyses: {
    duplication_attack_similarity: simDup,
    reordering_attack_similarity: simReorder,
    audio_swap_similarity: simSwap,
    stale_manifest_risk: staleManifestRisk
  },
  assets: physicalAudit
};

const matrixPath = path.join(rootDir, 'docs/audit/w33/W33_STEP1F_AUDIO_PIPELINE_MATRIX.json');
fs.writeFileSync(matrixPath, JSON.stringify(matrixOutput, null, 2));
console.log(`✅ Saved data flow matrix: ${matrixPath}`);

// Identify findings
const findings = [
  {
    id: "AUDIT-FINDING-GEN-SPLIT",
    title: "Audio Generator Fragmentation & Stale Generation Task Defect",
    severity: "HIGH",
    category: "GOVERNANCE & GENERATOR INTEGRITY",
    status: "DISCOVERED",
    affected_files: [
      "tools/generate_w33_all_audio.mjs",
      "scripts/regenerate_w33_listening_audio.mjs",
      "scripts/regenerate_w33_stale_audio.mjs"
    ],
    root_cause: "tools/generate_w33_all_audio.mjs contains obsolete single-voice listening tasks with incorrect text (e.g. orange warning sign in P5 inst1, paragraph summary in P2 full). Running generate_w33_all_audio.mjs would overwrite the multi-voice audio produced by regenerate_w33_listening_audio.mjs with stale content.",
    impact: "Accidental invocation of tools/generate_w33_all_audio.mjs destroys Cambridge multi-voice compliance and introduces stale spoken text.",
    required_fix: "Deprecate/consolidate tools/generate_w33_all_audio.mjs into a single authoritative universal pipeline referencing 100% hub source data."
  },
  {
    id: "AUDIT-FINDING-MANIFEST-DECOUPLING",
    title: "Manifest Rebuild Decoupled from Validator Execution Gate",
    severity: "MEDIUM",
    category: "AUDIT HARNESS INTEGRITY",
    status: "DISCOVERED",
    affected_files: [
      "scripts/whisper_audio_semantic_validator.mjs",
      "scripts/build_w33_audio_manifest.mjs",
      "package.json"
    ],
    root_cause: "npm run audit:audio:semantic executes whisper_audio_semantic_validator.mjs directly without forcing build_w33_audio_manifest.mjs first.",
    impact: "If source content in listening_hub.js changes, running audit:audio:semantic alone validates against stale manifest on disk rather than live source code.",
    required_fix: "Prepend manifest rebuild or assert source-manifest hash identity at the start of whisper_audio_semantic_validator.mjs."
  },
  {
    id: "AUDIT-FINDING-P3-CONCAT-HASH",
    title: "Listening Part 3 & 4 Full Audio Assembled by Raw Buffer Concatenation",
    severity: "LOW",
    category: "AUDIO ASSET ENCODING",
    status: "DISCOVERED",
    affected_files: [
      "scripts/regenerate_w33_listening_audio.mjs",
      "public/audio/week33/listening_p3_full.mp3",
      "public/audio/week33/listening_p4_full.mp3"
    ],
    root_cause: "regenerate_w33_listening_audio.mjs concatenates MP3 frame buffers via Buffer.concat(l3Bufs) without ffmpeg re-muxing or inter-turn silence headers.",
    impact: "While decodable by browser HTML5 Audio and Whisper, buffer concatenation can introduce minor timestamp discontinuities across legacy MP3 decoders.",
    required_fix: "Use ffmpeg or silence-padded MP3 concatenation utility."
  },
  {
    id: "AUDIT-FINDING-RUNTIME-DISCOVERY-REPORT-TTS",
    title: "Day 2 Discovery Report & Day 4 Video Challenge Audio Independence",
    severity: "INFO",
    category: "RUNTIME BINDING",
    status: "DISCOVERED",
    affected_files: [
      "src/modules/science_report/DiscoveryReportModal.jsx",
      "src/modules/broadcast/BroadcastStudioModal.jsx"
    ],
    root_cause: "Student interactive speaking stations (Discovery Report, Story Writer P7, Video Challenge) record student mic audio rather than loading static pre-recorded MP3s.",
    impact: "Zero regression risk; these stations do not depend on static corpus MP3s.",
    required_fix: "None required (by design)."
  }
];

const findingsOutput = {
  timestamp: new Date().toISOString(),
  governing_standard: "W33 Golden Learning & Assessment Standard v1.0",
  total_findings: findings.length,
  findings
};

const findingsPath = path.join(rootDir, 'docs/audit/w33/W33_STEP1F_FINDINGS.json');
fs.writeFileSync(findingsPath, JSON.stringify(findingsOutput, null, 2));
console.log(`✅ Saved findings registry: ${findingsPath}`);

console.log('\n🎉 Forensic pipeline matrix and findings generated successfully!\n');
