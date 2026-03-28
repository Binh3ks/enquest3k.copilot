#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

function escapeJsString(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

function formatObjectKey(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : `"${escapeJsString(key)}"`;
}

function toJs(value, indent = 0) {
  const space = ' '.repeat(indent);

  if (typeof value === 'string') {
    return `"${escapeJsString(value)}"`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => `${' '.repeat(indent + 2)}${toJs(item, indent + 2)}`);
    return `[\n${items.join(',\n')}\n${space}]`;
  }

  const entries = Object.entries(value || {});
  if (entries.length === 0) return '{}';

  const lines = entries.map(([key, val]) => {
    const renderedKey = formatObjectKey(key);
    return `${' '.repeat(indent + 2)}${renderedKey}: ${toJs(val, indent + 2)}`;
  });
  return `{\n${lines.join(',\n')}\n${space}}`;
}

function normalizeStem(stem, index, audioDir) {
  if (typeof stem === 'string') {
    return { text: stem, audio: `/audio/${audioDir}/mindmap_stem_${index + 1}.mp3` };
  }

  if (stem && typeof stem === 'object' && typeof stem.text === 'string') {
    return {
      ...stem,
      audio: stem.audio || `/audio/${audioDir}/mindmap_stem_${index + 1}.mp3`
    };
  }

  throw new Error(`Invalid centerStems item at index ${index}. Expected string or { text, audio } object.`);
}

function normalizeBranch(branch, index, audioDir) {
  if (typeof branch === 'string') {
    return { text: branch, audio: `/audio/${audioDir}/mindmap_branch_${index}.mp3` };
  }

  if (branch && typeof branch === 'object' && typeof branch.text === 'string') {
    return {
      ...branch,
      audio: branch.audio || `/audio/${audioDir}/mindmap_branch_${index}.mp3`
    };
  }

  throw new Error(`Invalid branch item at running index ${index}. Expected string or { text, audio } object.`);
}

async function loadMindmapData(mindmapPath) {
  const fileUrl = pathToFileURL(mindmapPath).href;
  const mod = await import(`${fileUrl}?t=${Date.now()}`);
  return mod.default;
}

async function updateMindmapAudioUrls(week, mode) {
  const weekId = String(week).padStart(2, '0');
  const dataDir = mode === 'advanced' ? 'weeks' : 'weeks_easy';
  const mindmapPath = path.join(ROOT, 'src', 'data', dataDir, `week_${weekId}`, 'mindmap.js');
  const audioDir = `week${week}${mode === 'easy' ? '_easy' : ''}`;

  if (!fs.existsSync(mindmapPath)) {
    console.log(`⏭️  ${mindmapPath} does not exist. Skipping.`);
    return;
  }

  try {
    const data = await loadMindmapData(mindmapPath);

    if (!data || typeof data !== 'object') {
      throw new Error('mindmap.js must export a default object');
    }
    if (!Array.isArray(data.centerStems)) {
      throw new Error('centerStems must be an array');
    }
    if (!data.branchLabels || typeof data.branchLabels !== 'object') {
      throw new Error('branchLabels must be an object');
    }

    const centerStems = data.centerStems.map((stem, idx) => normalizeStem(stem, idx, audioDir));

    let branchCounter = 1;
    const branchLabels = {};
    for (const stem of centerStems) {
      const stemText = stem.text;
      const rawBranches = data.branchLabels[stemText];

      if (!Array.isArray(rawBranches)) {
        throw new Error(`branchLabels["${stemText}"] must be an array`);
      }

      branchLabels[stemText] = rawBranches.map((branch) => {
        const normalized = normalizeBranch(branch, branchCounter, audioDir);
        branchCounter += 1;
        return normalized;
      });
    }

    const updated = {
      ...data,
      centerStems,
      branchLabels
    };

    const nextContent = `export default ${toJs(updated, 0)};\n`;
    fs.writeFileSync(mindmapPath, nextContent, 'utf-8');
    console.log(`Updated: ${mindmapPath}`);
  } catch (error) {
    console.error(`Failed to update ${mindmapPath}: ${error.message}`);
    process.exitCode = 1;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const week = parseInt(args[0]);

  if (!week || week < 1 || week > 54) {
    console.error('Usage: node tools/update_mindmap_audio_urls.js <week_number>');
    console.error('   Example: node tools/update_mindmap_audio_urls.js 2');
    process.exit(1);
  }

  console.log(`Updating mindmap audio URLs for Week ${week}...`);
  await updateMindmapAudioUrls(week, 'advanced');
  await updateMindmapAudioUrls(week, 'easy');

  if (process.exitCode && process.exitCode !== 0) {
    console.log('Completed with errors. Please fix mindmap schema and retry.');
    process.exit(process.exitCode);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(`Fatal error: ${err.message}`);
  process.exit(1);
});
