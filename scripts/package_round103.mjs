import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const PKG_DIR = path.join(ROOT_DIR, 'docs/review_packages');
fs.mkdirSync(PKG_DIR, { recursive: true });

const ZIP_NAME = 'round103_20261115.zip';
const ZIP_PATH = path.join(PKG_DIR, ZIP_NAME);
const MANIFEST_PATH = path.join(PKG_DIR, 'manifest_round103.txt');

function getSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function packageRound103() {
  console.log('========================================================================');
  console.log('📦 PACKAGING ROUND 103 DELIVERABLES');
  console.log('========================================================================\n');

  const filesToPackage = [];

  // 1. Images
  const imgDir39 = path.join(ROOT_DIR, 'public/images/week39');
  if (fs.existsSync(imgDir39)) {
    fs.readdirSync(imgDir39).forEach(f => {
      filesToPackage.push(path.join('public/images/week39', f));
    });
  }

  const imgDir41 = path.join(ROOT_DIR, 'public/images/week41');
  if (fs.existsSync(imgDir41)) {
    fs.readdirSync(imgDir41).forEach(f => {
      filesToPackage.push(path.join('public/images/week41', f));
    });
  }

  // 2. Audio
  const audDir39 = path.join(ROOT_DIR, 'public/audio/week39');
  if (fs.existsSync(audDir39)) {
    fs.readdirSync(audDir39).forEach(f => {
      filesToPackage.push(path.join('public/audio/week39', f));
    });
  }

  const audDir41 = path.join(ROOT_DIR, 'public/audio/week41');
  if (fs.existsSync(audDir41)) {
    fs.readdirSync(audDir41).forEach(f => {
      filesToPackage.push(path.join('public/audio/week41', f));
    });
  }

  // 3. Audio scripts & image prompts
  filesToPackage.push('audio_scripts/week39.json');
  filesToPackage.push('audio_scripts/week41.json');
  filesToPackage.push('image_prompts/week39.json');
  filesToPackage.push('image_prompts/week41.json');

  // 4. Contact Sheet
  filesToPackage.push('docs/agent_artifacts/contact_sheet_round103.png');

  // 5. Spec & Gate
  filesToPackage.push('media_requirements.json');
  filesToPackage.push('scripts/gate_required_vs_present.mjs');

  // 6. Staging patches
  filesToPackage.push('docs/agent_artifacts/staging/week_39/patch_rw_parts.json');
  filesToPackage.push('docs/agent_artifacts/staging/week_41/patch_rw_parts.json');
  filesToPackage.push('docs/agent_artifacts/staging/week_39/patch_story_writer_s3.json');
  filesToPackage.push('docs/agent_artifacts/staging/week_41/patch_story_writer_s3.json');

  // 7. Screenshots
  const ssDir = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots/round103');
  if (fs.existsSync(ssDir)) {
    fs.readdirSync(ssDir).forEach(f => {
      filesToPackage.push(path.join('docs/agent_artifacts/screenshots/round103', f));
    });
  }
  filesToPackage.push('docs/agent_artifacts/round103_playwright_proof.json');
  filesToPackage.push('docs/agent_artifacts/audio_table_c7_w39_w41.md');

  // Generate Manifest
  console.log(`Auditing ${filesToPackage.length} files for manifest...`);
  const manifestLines = [
    `# ROUND 103 DELIVERABLES MANIFEST — W39 & W41`,
    `# Generated: ${new Date().toISOString()}`,
    `# Total files: ${filesToPackage.length}`,
    `# Package zip: ${ZIP_NAME}`,
    ``,
    `| Relative Path | Size (Bytes) | SHA-256 |`,
    `|---|:---:|---|`
  ];

  for (const relPath of filesToPackage) {
    const fullPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`WARNING: File not found: ${relPath}`);
      continue;
    }
    const stat = fs.statSync(fullPath);
    const sha = getSha256(fullPath);
    manifestLines.push(`| \`${relPath}\` | ${stat.size.toLocaleString()} | \`${sha}\` |`);
  }

  fs.writeFileSync(MANIFEST_PATH, manifestLines.join('\n'), 'utf8');
  console.log(`✓ Manifest written: ${MANIFEST_PATH}`);

  // Create Zip
  if (fs.existsSync(ZIP_PATH)) {
    fs.unlinkSync(ZIP_PATH);
  }

  // Use zip command
  const relFilesArg = filesToPackage.filter(f => fs.existsSync(path.join(ROOT_DIR, f))).map(f => `"${f}"`).join(' ');
  const zipCmd = `zip -r "${ZIP_PATH}" ${relFilesArg} "docs/review_packages/manifest_round103.txt"`;
  console.log(`Creating zip archive ${ZIP_PATH}...`);
  execSync(zipCmd, { cwd: ROOT_DIR });

  const zipStat = fs.statSync(ZIP_PATH);
  const zipSha = getSha256(ZIP_PATH);

  console.log(`\n✅ PACKAGE CREATION COMPLETE!`);
  console.log(`  Archive: ${ZIP_PATH}`);
  console.log(`  Size: ${(zipStat.size / (1024 * 1024)).toFixed(2)} MB (${zipStat.size} bytes)`);
  console.log(`  SHA-256: ${zipSha}`);
}

packageRound103().catch(err => {
  console.error('Packaging failed:', err);
  process.exit(1);
});
