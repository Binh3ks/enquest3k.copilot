import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const weekArg = process.argv[2];
if (!weekArg) {
  console.error('Usage: node week_inventory.mjs <weekNumber>');
  process.exit(1);
}

const weekNum = parseInt(weekArg, 10);
const weekDir = path.join(rootDir, 'src', 'data', 'weeks', `week_${weekNum}`);

if (!fs.existsSync(weekDir)) {
  console.error(`Week directory does not exist: ${weekDir}`);
  process.exit(1);
}

function getAssetCounts() {
  const audioDir = path.join(rootDir, 'public', 'audio', `week${weekNum}`);
  const imagesDir = path.join(rootDir, 'public', 'images', `week${weekNum}`);
  
  let audioFiles = [];
  if (fs.existsSync(audioDir)) {
    audioFiles = fs.readdirSync(audioDir).filter(f => !f.startsWith('.')).sort();
  }

  let imageFiles = [];
  if (fs.existsSync(imagesDir)) {
    imageFiles = fs.readdirSync(imagesDir).filter(f => !f.startsWith('.')).sort();
  }

  const transcriptDir = path.join(rootDir, 'src', 'data', 'video_transcripts_by_id', 'sentences');
  let transcriptFiles = [];
  if (fs.existsSync(transcriptDir)) {
    transcriptFiles = fs.readdirSync(transcriptDir)
      .filter(f => !f.startsWith('.') && (f.includes(`w${weekNum}`) || f.includes(`week${weekNum}`) || f.includes(`week_${weekNum}`)))
      .sort();
  }

  return {
    audio_file_count: audioFiles.length,
    audio_files: audioFiles,
    image_file_count: imageFiles.length,
    image_files: imageFiles,
    transcript_file_count: transcriptFiles.length,
    transcript_files: transcriptFiles
  };
}

function inspect(val, p, visited, map) {
  if (val === null) {
    map[p] = { type: 'null' };
    return;
  }
  if (val === undefined) {
    map[p] = { type: 'undefined' };
    return;
  }

  const t = typeof val;

  if (t === 'string') {
    const entry = { type: 'string', char_length: val.length };
    if (val.length > 20) {
      entry.word_count = val.trim().split(/\s+/).filter(Boolean).length;
    }
    map[p] = entry;
    return;
  }

  if (t === 'number' || t === 'boolean') {
    map[p] = { type: t, value: val };
    return;
  }

  if (t === 'function') {
    map[p] = { type: 'function', name: val.name || 'anonymous' };
    return;
  }

  if (Array.isArray(val)) {
    map[p] = { type: 'array', length: val.length };
    for (let i = 0; i < val.length; i++) {
      inspect(val[i], `${p}[${i}]`, visited, map);
    }
    return;
  }

  if (t === 'object') {
    if (visited.has(val)) {
      map[p] = { type: 'ref', target: visited.get(val) };
      return;
    }
    visited.set(val, p);

    const keys = Object.keys(val).sort();
    map[p] = { type: 'object', keys };
    for (const k of keys) {
      inspect(val[k], `${p}.${k}`, visited, map);
    }
    return;
  }

  map[p] = { type: t };
}

async function runInventory() {
  const assetStats = getAssetCounts();
  const fileEntries = fs.readdirSync(weekDir)
    .filter(f => !f.startsWith('.') && !f.endsWith('.bak') && (f.endsWith('.js') || f.endsWith('.json')))
    .sort();

  const fileInventories = {};

  for (const filename of fileEntries) {
    const fullPath = path.join(weekDir, filename);
    const map = {};
    const visited = new Map();

    if (filename.endsWith('.json')) {
      try {
        const raw = fs.readFileSync(fullPath, 'utf8');
        const parsed = JSON.parse(raw);
        inspect(parsed, filename, visited, map);
      } catch (err) {
        map[filename] = { error: err.message };
      }
    } else if (filename.endsWith('.js')) {
      try {
        const mod = await import(`file://${fullPath}`);
        const exportKeys = Object.keys(mod).sort();
        map[`${filename}::exports`] = { type: 'module_exports', exports: exportKeys };

        for (const expKey of exportKeys) {
          inspect(mod[expKey], `${filename}::${expKey}`, visited, map);
        }
      } catch (err) {
        map[filename] = { error: err.message };
      }
    }

    fileInventories[filename] = {
      field_count: Object.keys(map).length,
      fields: map
    };
  }

  const inventoryOutput = {
    week: weekNum,
    directory: `src/data/weeks/week_${weekNum}`,
    summary: {
      data_file_count: fileEntries.length,
      audio_file_count: assetStats.audio_file_count,
      image_file_count: assetStats.image_file_count,
      transcript_file_count: assetStats.transcript_file_count
    },
    assets: {
      audio_file_count: assetStats.audio_file_count,
      audio_files: assetStats.audio_files,
      image_file_count: assetStats.image_file_count,
      image_files: assetStats.image_files,
      transcript_file_count: assetStats.transcript_file_count,
      transcript_files: assetStats.transcript_files
    },
    data_files: fileInventories
  };

  console.log(JSON.stringify(inventoryOutput, null, 2));
}

runInventory().catch(err => {
  console.error('Inventory failure:', err);
  process.exit(1);
});
