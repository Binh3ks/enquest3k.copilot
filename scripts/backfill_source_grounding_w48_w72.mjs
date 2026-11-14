/**
 * Backfill source_grounding.json for staged weeks W48-W72
 * Follows the standard schema established in W40, W42, W44, W47 and W73+
 */
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SYLLABUS_FILE = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');

function extractSourceBExcerpt(w) {
  if (!fs.existsSync(SYLLABUS_FILE)) return null;
  const txt = fs.readFileSync(SYLLABUS_FILE, 'utf8');
  const lines = txt.split('\n');
  let candidates = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const singleMatch = line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Tuần)\s*(\d+)\b/i);
    if (singleMatch && parseInt(singleMatch[1], 10) === w) {
      candidates.push({ index: i, span: 0, line });
      break;
    }
    const rangeMatch = line.match(/(?:Weeks|Tuần)\s*(\d+)\s*[-–]\s*(\d+)\b/i);
    if (rangeMatch) {
      const s = parseInt(rangeMatch[1], 10);
      const e = parseInt(rangeMatch[2], 10);
      if (w >= s && w <= e) {
        candidates.push({ index: i, span: e - s, line });
      }
    }
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.span - b.span);
  const startIndex = candidates[0].index;

  const collected = [lines[startIndex]];
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Weeks|Tuần)\s*\d+/i) || line.match(/^[ \t]*(?:Phase|Block|🔵|🟢|🟣)/i)) {
      break;
    }
    collected.push(line);
  }

  let result = collected.join('\n').trim();
  if (Buffer.byteLength(result, 'utf8') > 1536) {
    result = result.slice(0, 1500) + '...';
  }
  return result;
}

let count = 0;
for (let w = 48; w <= 72; w++) {
  const weekFolder = path.join(STAGING_DIR, `week_${w}`);
  if (!fs.existsSync(weekFolder)) {
    console.warn(`Folder not found: ${weekFolder}`);
    continue;
  }
  const bpPath = path.join(weekFolder, 'blueprint.json');
  if (!fs.existsSync(bpPath)) {
    console.warn(`Blueprint not found: ${bpPath}`);
    continue;
  }
  const bpData = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
  const sourceBExcerpt = extractSourceBExcerpt(w);

  const sourceGroundingData = {
    week: w,
    theme: bpData.theme,
    cefr_level: bpData.cefr_level || 'A2 Flyers',
    blueprint_snapshot: bpData,
    source_b_excerpt: sourceBExcerpt
  };

  const targetPath = path.join(weekFolder, 'source_grounding.json');
  fs.writeFileSync(targetPath, JSON.stringify(sourceGroundingData, null, 2) + '\n', 'utf8');
  console.log(`✅ Staged week_${w}: wrote source_grounding.json (${Buffer.byteLength(JSON.stringify(sourceGroundingData), 'utf8')} bytes)`);
  count++;
}

console.log(`\n🎉 Successfully backfilled source_grounding.json for ${count} weeks (W48-W72).`);
