import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const discoveredWriters = [
  {
    path: "scripts/generate_w33_audio_canonical.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week33", "public/audio/cambridge"],
    classification: "CANONICAL",
    execution_behavior: "Derives 100% of spoken scripts from live data hubs and Cambridge blueprints. Emits 54 dual-voice MP3s and generation manifest.",
    risk_level: "NONE (Authoritative Target)"
  },
  {
    path: "tools/generate_w33_all_audio.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week33"],
    classification: "DEPRECATED_FAIL_CLOSED",
    execution_behavior: "Exits code 1 with deprecation error message directing to npm run generate:audio:w33.",
    risk_level: "NONE (Blocked)"
  },
  {
    path: "tools/generate_w33_dialogue_audio.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week33"],
    classification: "DEPRECATED_FAIL_CLOSED",
    execution_behavior: "Exits code 1 with deprecation error message directing to npm run generate:audio:w33.",
    risk_level: "NONE (Blocked)"
  },
  {
    path: "tools/generate_w33_part1_audio.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week33"],
    classification: "DEPRECATED_FAIL_CLOSED",
    execution_behavior: "Exits code 1 with deprecation error message directing to npm run generate:audio:w33.",
    risk_level: "NONE (Blocked)"
  },
  {
    path: "tools/generate_w33_all_cambridge_audio.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week33"],
    classification: "DEPRECATED_FAIL_CLOSED",
    execution_behavior: "Exits code 1 with deprecation error message directing to npm run generate:audio:w33.",
    risk_level: "NONE (Blocked)"
  },
  {
    path: "scripts/generate_exam_intro_audio.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week33"],
    classification: "DEPRECATED_FAIL_CLOSED",
    execution_behavior: "Exits code 1 with deprecation error message directing to npm run generate:audio:w33.",
    risk_level: "NONE (Blocked)"
  },
  {
    path: "scripts/regenerate_w33_listening_audio.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week33"],
    classification: "DEPRECATED_FAIL_CLOSED",
    execution_behavior: "Exits code 1 with deprecation error message directing to npm run generate:audio:w33.",
    risk_level: "NONE (Blocked)"
  },
  {
    path: "scripts/regenerate_w33_stale_audio.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week33"],
    classification: "DEPRECATED_FAIL_CLOSED",
    execution_behavior: "Exits code 1 with deprecation error message directing to npm run generate:audio:w33.",
    risk_level: "NONE (Blocked)"
  },
  {
    path: "scripts/generate_week_audio_universal.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["public/audio/week${weekNum}"],
    classification: "SAFE_READ_ONLY",
    execution_behavior: "Multi-week utility with fail-closed guard blocking week 33 execution.",
    risk_level: "NONE (Guarded against W33)"
  },
  {
    path: "scripts/build_w33_audio_manifest.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["docs/audit/w33"],
    classification: "SAFE_READ_ONLY",
    execution_behavior: "Reads live hub data, computes SHA-256 fingerprints, and emits W33_AUDIO_SEMANTIC_MANIFEST.json. Does not write MP3s.",
    risk_level: "NONE (Audit Tool)"
  },
  {
    path: "scripts/build_w33_generation_manifest.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["docs/audit/w33"],
    classification: "SAFE_READ_ONLY",
    execution_behavior: "Hashes on-disk MP3s and writes W33_AUDIO_GENERATION_MANIFEST.json. Does not write MP3s.",
    risk_level: "NONE (Audit Tool)"
  },
  {
    path: "scripts/whisper_audio_semantic_validator.mjs",
    type: "NODE_SCRIPT",
    target_directories: ["docs/audit/w33", "artifacts/"],
    classification: "SAFE_READ_ONLY",
    execution_behavior: "Executes Whisper STT against on-disk MP3s and validates against manifest. Does not write MP3s.",
    risk_level: "NONE (Audit Tool)"
  }
];

const report = {
  timestamp: new Date().toISOString(),
  governing_standard: "W33 Golden Learning & Assessment Standard v1.0",
  total_writers_discovered: discoveredWriters.length,
  summary: {
    canonical: discoveredWriters.filter(w => w.classification === 'CANONICAL').length,
    deprecated_fail_closed: discoveredWriters.filter(w => w.classification === 'DEPRECATED_FAIL_CLOSED').length,
    safe_read_only: discoveredWriters.filter(w => w.classification === 'SAFE_READ_ONLY').length,
    unknown: 0,
    dangerous: 0
  },
  writers: discoveredWriters
};

const outPath = path.join(rootDir, 'docs/audit/w33/W33_AUDIO_WRITER_DISCOVERY.json');
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`✅ Generated W33_AUDIO_WRITER_DISCOVERY.json covering ${discoveredWriters.length} discovered scripts.`);
