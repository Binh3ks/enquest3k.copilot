/**
 * Update source_grounding.json for staged weeks W48-W72 with:
 * - grounding_origin: "backfilled_after_generation"
 * - grounding_date: "2026-11-14"
 * - grounding_commit: "ce8cd3af"
 * - source_b_line_range: "L{start}–L{end}"
 *
 * Prints markdown table: Tuần | Khoảng dòng Source B | Byte của excerpt (≤1536) | Tuần đúng/sai
 */
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SYLLABUS_FILE = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');

const lines = fs.readFileSync(SYLLABUS_FILE, 'utf8').split('\n');

const tableRows = [];

for (let w = 48; w <= 72; w++) {
  const p = path.join(STAGING_DIR, `week_${w}/source_grounding.json`);
  if (!fs.existsSync(p)) {
    console.error(`Missing file: ${p}`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  // Find exact start line and end line in Source B
  let startLine = -1;
  let endLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const sm = l.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Tuần)\s*(\d+)\b/i);
    if (sm && parseInt(sm[1], 10) === w) {
      startLine = i + 1;
      let j = i + 1;
      while (j < lines.length) {
        const nextL = lines[j];
        if (nextL.match(/^[ \t]*[•\-\*]?[ \t]*(?:Week|Weeks|Tuần)\s*\d+/i) || nextL.match(/^[ \t]*(?:Phase|Block|🔵|🟢|🟣)/i)) {
          break;
        }
        j++;
      }
      endLine = j;
      break;
    }
  }

  const excerptBytes = Buffer.byteLength(data.source_b_excerpt || '', 'utf8');
  const isMatch = (data.source_b_excerpt || '').includes(`Week ${w}:`) || (data.source_b_excerpt || '').includes(`Tuần ${w}:`);

  // Add grounding_origin fields
  data.grounding_origin = 'backfilled_after_generation';
  data.grounding_date = '2026-11-14';
  data.grounding_commit = 'ce8cd3af';
  data.source_b_line_range = `L${startLine}–L${endLine}`;

  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');

  tableRows.push({
    week: w,
    lineRange: `L${startLine}–L${endLine}`,
    bytes: excerptBytes,
    isCorrect: isMatch && excerptBytes <= 1536
  });
}

console.log('| Tuần | Khoảng dòng Source B | Byte của excerpt (≤1536) | Tuần đúng/sai |');
console.log('|---|---|---|---|');
for (const r of tableRows) {
  console.log(`| W${r.week.toString().padStart(2, '0')} | ${r.lineRange.padEnd(10)} | ${r.bytes.toString().padStart(4, ' ')} bytes | ${r.isCorrect ? 'ĐÚNG (PASS)' : 'SAI (FAIL)'} |`);
}
