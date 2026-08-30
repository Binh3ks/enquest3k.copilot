import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekDir = path.join(rootDir, 'src/data/weeks/week_33');
const t = Date.now();

const readMod = await import(pathToFileURL(path.join(weekDir, 'read.js')).href + `?t=${t}`);
const readHubMod = await import(pathToFileURL(path.join(weekDir, 'reading_hub.js')).href + `?t=${t}`);
const listHubMod = await import(pathToFileURL(path.join(weekDir, 'listening_hub.js')).href + `?t=${t}`);
const skillMod = await import(pathToFileURL(path.join(weekDir, 'skill_practice_hub.js')).href + `?t=${t}`);
const exploreMod = await import(pathToFileURL(path.join(weekDir, 'explore.js')).href + `?t=${t}`);
const spkMod = await import(pathToFileURL(path.join(weekDir, 'speaking_hub.js')).href + `?t=${t}`);

const readJs = readMod.default || readMod;
const readHub = readHubMod.readingHubData || readHubMod.default;
const listHub = listHubMod.listeningHub || listHubMod.default;
const skillPractice = skillMod.skillPracticeHub || skillMod.default;
const exploreJs = exploreMod.default || exploreMod;
const spkHub = spkMod.speakingHub || spkMod.speakingHubData || spkMod.default;

const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, 'docs/audit/w33/W33_AUDIO_SEMANTIC_MANIFEST.json'), 'utf-8'));

const assets = [];

for (const entry of manifest.assets) {
  const fullPath = path.join(rootDir, entry.file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing physical asset: ${entry.file}`);
  }
  const fileBuf = fs.readFileSync(fullPath);
  const stats = fs.statSync(fullPath);
  const physicalSha256 = crypto.createHash('sha256').update(fileBuf).digest('hex');
  const sourceSha256 = crypto.createHash('sha256').update(entry.expected_transcript.trim()).digest('hex');

  assets.push({
    file: entry.file,
    filename: path.basename(entry.file),
    category: entry.category,
    part: entry.part,
    source_file: entry.source_file,
    source_key: entry.source_key,
    source_fingerprint: sourceSha256,
    physical_sha256: physicalSha256,
    file_size_bytes: stats.size,
    last_modified: stats.mtime.toISOString(),
    expected_transcript: entry.expected_transcript
  });
}

const generationManifest = {
  timestamp: new Date().toISOString(),
  governing_standard: "W33 Golden Learning & Assessment Standard v1.0",
  provenance_mode: "PHYSICAL_DISK_VERIFIED",
  total_assets: assets.length,
  root_source_hash: manifest.root_source_hash,
  assets
};

const outPath = path.join(rootDir, 'docs/audit/w33/W33_AUDIO_GENERATION_MANIFEST.json');
fs.writeFileSync(outPath, JSON.stringify(generationManifest, null, 2));
console.log(`✅ Generated W33_AUDIO_GENERATION_MANIFEST.json with ${assets.length} cryptographically hashed assets.`);
