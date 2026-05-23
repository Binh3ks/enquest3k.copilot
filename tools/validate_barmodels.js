#!/usr/bin/env node
/**
 * Validate bar model paths and images for a week.
 *
 * Usage: node tools/validate_barmodels.js 34
 *
 * Checks:
 * 1. bar_model paths follow correct naming: barmodel_w{NN}_{mode}_p{n}_v{n}.jpg
 * 2. Image files actually exist at those paths
 * 3. Image files are not empty (min 1KB)
 *
 * Exit code: 0 = pass, 1 = fail, 2 = no file found
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const WEEK = parseInt(process.argv[2]);
if (!WEEK) {
  console.error(`Usage: node tools/validate_barmodels.js <WEEK_NUMBER>`);
  process.exit(1);
}

const PAD = String(WEEK).padStart(2, '0');

async function loadWeek(mode) {
  const suffix = mode === 'easy' ? '_easy' : '';
  const f = path.join(ROOT, `src/data/weeks${suffix}/week_${PAD}/singapore_math.js`);
  if (!fs.existsSync(f)) return null;
  try {
    const mod = await import(`file://${f}`);
    const data = mod.default || mod;
    return { mode, data, file: f };
  } catch(e) {
    return null;
  }
}

function validatePath(pathStr, mode, week) {
  const modeStr = mode === 'adv' ? 'adv' : 'easy';
  const regex = new RegExp(`^/images/week${week}/barmodel_w${week}_${modeStr}_p\\d+_v\\d+\\.jpg$`);
  return regex.test(pathStr);
}

function fileExists(relativePath) {
  const fullPath = path.join(ROOT, 'public', relativePath.replace(/^\//, ''));
  return fs.existsSync(fullPath);
}

function fileSize(relativePath) {
  const fullPath = path.join(ROOT, 'public', relativePath.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) return 0;
  return fs.statSync(fullPath).size;
}

async function main() {
  let errors = 0;
  let warnings = 0;
  let totalChecked = 0;

  const results = await Promise.all([loadWeek('adv'), loadWeek('easy')]);

  for (const result of results) {
    if (!result) {
      console.warn(`⚠️  No singapore_math.js for ${result?.mode || 'unknown'} mode`);
      continue;
    }
    const { mode, data } = result;
    const problems = data.problems || data.questions || [];

    if (problems.length === 0) {
      console.warn(`⚠️  [${mode.toUpperCase()}] No problems found`);
      continue;
    }

    for (const p of problems) {
      const barModel = p.bar_model || p.barModel;
      if (!barModel) {
        console.warn(`⚠️  [${mode.toUpperCase()}] Problem ${p.id}: no bar_model field`);
        warnings++;
        continue;
      }
      totalChecked++;

      // Check 1: correct naming convention
      const modeStr = mode === 'adv' ? 'adv' : 'easy';
      if (!validatePath(barModel, mode, WEEK)) {
        console.error(`❌ [${mode.toUpperCase()}] Problem ${p.id}: BAD PATH`);
        console.error(`   Got:      ${barModel}`);
        console.error(`   Expected: /images/week${PAD}/barmodel_w${PAD}_${modeStr}_p{n}_v{n}.jpg`);
        errors++;
        continue;
      }

      // Check 2: file exists
      if (!fileExists(barModel)) {
        console.error(`❌ [${mode.toUpperCase()}] Problem ${p.id}: FILE NOT FOUND`);
        console.error(`   Path: ${barModel}`);
        errors++;
        continue;
      }

      // Check 3: file not empty (min 1KB)
      const size = fileSize(barModel);
      if (size < 1024) {
        console.error(`❌ [${mode.toUpperCase()}] Problem ${p.id}: FILE TOO SMALL (${size} bytes)`);
        console.error(`   Path: ${barModel}`);
        errors++;
        continue;
      }

      console.log(`✅ [${mode.toUpperCase()}] p${p.id}: ${path.basename(barModel)} (${(size/1024).toFixed(1)}KB)`);
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Bar Model Validation — Week ${PAD}`);
  console.log(`${'─'.repeat(50)}`);
  console.log(`Checked: ${totalChecked} | Errors: ${errors} | Warnings: ${warnings}`);

  if (errors > 0) {
    console.error(`\n❌ FAILED`);
    process.exit(1);
  } else if (totalChecked === 0) {
    console.warn(`⚠️  No bar models to check`);
    process.exit(2);
  } else {
    console.log(`✅ PASS`);
    process.exit(0);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
