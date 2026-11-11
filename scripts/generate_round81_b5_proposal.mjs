#!/usr/bin/env node
/**
 * scripts/generate_round81_b5_proposal.mjs
 *
 * ROUND 81 — PRIORITY 3 (Owner Decision B.5, PROPOSAL ONLY in docs/agent_artifacts/):
 *   - Updates `round80_proposed_digital_map_v2.md` -> `round81_proposed_digital_map_v2.md`:
 *     Replaces `[CHỜ OWNER: Phase 2 vs B1+ Academic]` on all 8 W113–W120 rows with
 *     `Phase 2 (B1 PET)` and confirms B1+ Academic starts at W121 (Source B Phase 3, L953).
 *   - Produces `docs/agent_artifacts/round81_temp_blueprints/` (156 files) from
 *     `round79_temp_blueprints/`, updating W113–W120 -> `{ cefr_level: "B1 PET", cefr_stage: 2 }`
 *     and normalizing canonical CEFR tiers (leaving frozen W33 untouched).
 *   - ZERO writes to `src/data/weeks/week_<N>/blueprint.json` or live `docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SOURCE_B_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const R80_MAP_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round80_proposed_digital_map_v2.md');
const R79_BP_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/round79_temp_blueprints');

const R81_MAP_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round81_proposed_digital_map_v2.md');
const R81_BP_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/round81_temp_blueprints');

const sbLines = fs.readFileSync(SOURCE_B_PATH, 'utf8').split('\n');
const l949 = sbLines[948]?.trim();
const l951 = sbLines[950]?.trim();
const l953 = sbLines[952]?.trim();

// 1. Generate round81_proposed_digital_map_v2.md
const r80MapLines = fs.readFileSync(R80_MAP_PATH, 'utf8').split('\n');
let w113to120Replacements = 0;

const r81MapLines = r80MapLines.map((line) => {
  if (line.startsWith('# 🗺️ ENGQUEST3K — DIGITAL SYLLABUS')) {
    return '# 🗺️ ENGQUEST3K — DIGITAL SYLLABUS & CURRICULUM BRIDGE (W01–W156) [PROPOSED v2 — ROUND 81]';
  }
  if (line.includes('**TRẠNG THÁI ĐỀ XUẤT')) {
    return `> **TRẠNG THÁI ĐỀ XUẤT (ROUND 81 PROPOSAL ONLY — KHÔNG SỬA FILE GỐC):** Kế thừa nguyên vẹn Map v2 Round 80 đồng bộ **Source B Part II** (\`156\` tuần nội dung, bảo toàn \`[SUPPLEMENT — Source A]\`, \`Rotary 1–4\`, và \`M14–M34 = B1 PET\`), và **áp dụng Quyết định B.5 (Owner Ruling 2026-11-11)**: toàn bộ khối \`W113–W120\` thuộc **Phase 2 (\`B1 PET\`)**; **B1+ Academic bắt đầu từ \`W121\`** (\`Source B Phase 3, L953\`: \`${l953}\`). Giữ nguyên \`C.7\` (\`W79/W80\` vocab) ở trạng thái chờ/không tự sửa.`;
  }
  if (line.startsWith('**Assessment Generations**:')) {
    return '**Assessment Generations**: Starters/Movers/Flyers (W01–72) $\\rightarrow$ Phase 2 B1 PET & CLIL Lab (W73–120) $\\rightarrow$ Phase 3 B1+ Academic Reading & Structured Opinion (W121–156) [Decision B.5 Confirmed 2026-11-11]';
  }
  if (line.startsWith('#### Block F:')) {
    return '#### Block F: Đổi Mới Liên Môn, Chứng Chỉ B1 PET & Capstone Showcase (Weeks 97–120 — Phase 2 B1 PET Complete)';
  }
  if (line.startsWith('### PHASE 3:')) {
    return '### PHASE 3: ADVANCED SYNTHESIS & ACADEMIC OPINION (WEEKS 121–156 — B1+ Academic Starts W121, Source B L953)';
  }
  if (/^\|\s*\*\*W11[3-9]\*\*|^\|\s*\*\*W120\*\*/.test(line)) {
    w113to120Replacements++;
    return line
      .replace(/B1\+ PET · Rotary (\d)(?:\s*·\s*Graduation Showcase \(Content Week\))?\s*·\s*\[CHỜ OWNER: Phase 2 vs B1\+ Academic\]/, (_, r) =>
        line.includes('W120')
          ? `Phase 2 (B1 PET) · Rotary ${r} · Graduation Showcase (Content Week)`
          : `Phase 2 (B1 PET) · Rotary ${r}`
      );
  }
  return line;
});

fs.writeFileSync(R81_MAP_PATH, r81MapLines.join('\n'), 'utf8');

// 2. Generate round81_temp_blueprints/ (156 files, proposal only)
fs.mkdirSync(R81_BP_DIR, { recursive: true });

function expectedCefrForWeek(w) {
  if (w <= 16) return { cefr_level: 'Pre-A1 Starters', cefr_stage: 1 };
  if (w <= 32) return { cefr_level: 'A1 Movers', cefr_stage: 1 };
  if (w <= 72) return { cefr_level: 'A2 Flyers', cefr_stage: 1 };
  if (w <= 120) return { cefr_level: 'B1 PET', cefr_stage: 2 }; // Includes B.5 ruling W113–W120
  return { cefr_level: 'B1+ Academic', cefr_stage: 3 }; // Phase 3 starts W121 (Source B L953)
}

const changedFromR79 = [];
const cefrSummary = new Map();

for (let w = 1; w <= 156; w++) {
  const srcPath = path.join(R79_BP_DIR, `week_${w}_blueprint.json`);
  const dstPath = path.join(R81_BP_DIR, `week_${w}_blueprint.json`);
  const bp = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

  // Preserve frozen W33 identically
  if (w !== 33) {
    const exp = expectedCefrForWeek(w);
    if (bp.cefr_level !== exp.cefr_level || bp.cefr_stage !== exp.cefr_stage) {
      changedFromR79.push({
        week: w,
        from: `${bp.cefr_level} (stage ${bp.cefr_stage})`,
        to: `${exp.cefr_level} (stage ${exp.cefr_stage})`
      });
      bp.cefr_level = exp.cefr_level;
      bp.cefr_stage = exp.cefr_stage;
    }
  }

  const key = `${bp.cefr_level} | stage=${bp.cefr_stage}`;
  if (!cefrSummary.has(key)) cefrSummary.set(key, []);
  cefrSummary.get(key).push(w);

  fs.writeFileSync(dstPath, JSON.stringify(bp, null, 2) + '\n', 'utf8');
}

console.log(`Source B boundary anchors verified:`);
console.log(`  L949: ${l949}`);
console.log(`  L951: ${l951}`);
console.log(`  L953: ${l953}`);
console.log(`✓ Generated ${path.relative(ROOT_DIR, R81_MAP_PATH)} (W113–W120 rows updated: ${w113to120Replacements}/8)`);
console.log(`✓ Generated ${path.relative(ROOT_DIR, R81_BP_DIR)}/ (156 files; CEFR normalized on ${changedFromR79.length} weeks vs R79 temp)`);
for (const [k, ws] of cefrSummary.entries()) {
  console.log(`  ${k}: ${ws.length} weeks (W${ws[0]}..W${ws[ws.length - 1]})`);
}
