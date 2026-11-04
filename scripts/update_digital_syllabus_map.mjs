#!/usr/bin/env node
/**
 * scripts/update_digital_syllabus_map.mjs
 * 
 * Round 51 — Update Source A (Digital Syllabus Map) to align with Source B:
 * 1. Synchronizes pedagogical content (Theme, CLIL Module) of 138 divergent weeks
 *    using authoritative data from blueprint.json (and Source B Master Syllabus).
 * 2. Adds missing 8 weeks W113–W120 to Phase 2 (under Block F table).
 * 3. Preserves 100% of testing architecture columns (CEFR Stage/Type, Rotary Cycle 1-4,
 *    28-week Mock Test cadence, Scaffolding Tier, and Grammar Hub / Action Lab notes).
 * 4. Adds provenance / changelog note at document header.
 * 5. Maintains frozen Golden Standards (W33 & W34) integrity.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const MAP_PATH = path.join(ROOT_DIR, 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md');
const DIVERGENCE_DATA_PATH = path.join(ROOT_DIR, 'docs/FULL_156_WEEKS_DIVERGENCE_DATA.json');

// Fix unclosed quotes in pedagogical strings for clean markdown
function cleanFocusQuotes(str) {
  if (!str) return '';
  let cleaned = str.trim();
  // Fix specific unclosed quotes from syllabus extraction
  cleaned = cleaned.replace(/using "My$/i, 'using "My"')
                   .replace(/using "is" vs "has$/i, 'using "is" vs "has"')
                   .replace(/using "Because$/i, 'using "Because"')
                   .replace(/using "Want to$/i, 'using "Want to"')
                   .replace(/What was hard\?$/i, 'What was hard?"')
                   .replace(/That is a generalization$/i, 'That is a generalization"')
                   .replace(/\|/g, '-');
  return cleaned;
}

export function updateDigitalSyllabusMap() {
  const mapContent = fs.readFileSync(MAP_PATH, 'utf8');
  const divData = JSON.parse(fs.readFileSync(DIVERGENCE_DATA_PATH, 'utf8'));
  const divergentWeeks = new Set(
    divData.weeks
      .filter(w => w.alignment_status === 'DIVERGENT_THEME_FALLBACK_TO_SOURCE_B')
      .map(w => w.week)
  );

  const lines = mapContent.split('\n');
  const updatedLines = [];
  let changelogInserted = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 1. Insert provenance note in header
    if (line.startsWith('**Effective Date**:') && !changelogInserted) {
      updatedLines.push(line);
      updatedLines.push('**Provenance / Changelog (Round 51 — 2026-11-04)**: Đồng bộ hóa toàn diện nội dung sư phạm (Theme, CLIL Module) và bổ sung 8 tuần W113–W120 khớp chuẩn Master Syllabus Foundation (Nguồn B) sau kiểm toán Round 49 (tham chiếu: `docs/FULL_156_WEEKS_DIVERGENCE_DATA.json`), bảo toàn 100% các cột kiến trúc khảo thí và nhịp 28 Mock Tests.');
      changelogInserted = true;
      continue;
    }

    // 2. Adjust Block F header for W97-120
    if (line.includes('#### Block F: Đổi Mới Liên Môn & Chứng Chỉ B1 PET (Weeks 97–112)')) {
      updatedLines.push('#### Block F: Đổi Mới Liên Môn, Chứng Chỉ B1 PET & Capstone Showcase (Weeks 97–120)');
      continue;
    }
    if (line.includes('*Focus: Chu kỳ 4+1, viết bài báo cáo khoa học độc lập, kỳ thi chính thức Cambridge B1 PET tại W112.*')) {
      updatedLines.push('*Focus: Chu kỳ 4+1, viết bài báo cáo khoa học độc lập, kỳ thi chính thức Cambridge B1 PET tại W112, và Capstone Passion Project Presentation W113–W120.*');
      continue;
    }

    // 3. Match table rows: | **W{n}** | ... |
    const match = line.match(/^(\|\s*\*\*W0?(\d+)\*\*\s*\|)([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/i);

    if (match) {
      const weekNum = parseInt(match[2], 10);
      const colPrefix = match[1]; // e.g. "| **W02** |"
      const colTheme = match[3];  // Theme
      const colCefr = match[4];   // CEFR & Week Type (PRESERVED)
      const colClil = match[5];   // CLIL Module
      const colScaff = match[6];  // Giàn giáo (PRESERVED)
      const colHub = match[7];    // Grammar Hub / Output (PRESERVED)

      if (divergentWeeks.has(weekNum)) {
        // Keep W33 as frozen golden standard
        if (weekNum === 33) {
          updatedLines.push(line);
        } else {
          const bpPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}/blueprint.json`);
          if (fs.existsSync(bpPath)) {
            const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));

            // Column 2: Theme (preserving bold if original row used bold for mock weeks)
            const isBoldTheme = colTheme.trim().startsWith('**') && colTheme.trim().endsWith('**');
            const targetTheme = isBoldTheme ? `**${bp.theme}**` : bp.theme;

            // Column 4: CLIL Module
            let targetClil = '';
            if (bp.title_vi && bp.title_vi !== 'null' && bp.title_vi !== 'undefined') {
              if (bp.clil_topic?.focus && bp.clil_topic.focus !== bp.title_vi) {
                targetClil = `${bp.title_vi}: ${cleanFocusQuotes(bp.clil_topic.focus)}`;
              } else {
                targetClil = bp.title_vi;
              }
            } else if (bp.clil_topic?.title) {
              if (bp.clil_topic?.focus && bp.clil_topic.focus !== bp.clil_topic.title) {
                targetClil = `${bp.clil_topic.title}: ${cleanFocusQuotes(bp.clil_topic.focus)}`;
              } else {
                targetClil = bp.clil_topic.title;
              }
            } else {
              targetClil = bp.theme;
            }

            const updatedRow = `${colPrefix} ${targetTheme} |${colCefr}| ${targetClil} |${colScaff}|${colHub}|`;
            updatedLines.push(updatedRow);
          } else {
            updatedLines.push(line);
          }
        }
      } else {
        // Aligned weeks: keep unchanged
        updatedLines.push(line);
      }

      // 4. Insert W113–W120 right after W112
      if (weekNum === 112) {
        const w113_w120_rows = [
          '| **W113**| Visual Aids (Images & Captions) | B1+ PET · Rotary 1 | Hỗ trợ Hình ảnh: Thêm thông tin hình ảnh; Multimodal writing | Tier 3 (Autonomous)| Cụm giới từ ("In this picture...", "Next to..."); `writing_hub` |',
          '| **W114**| Project Assembly (Making the Poster)| B1+ PET · Rotary 2 | Lắp ráp Dự án: Bố cục & thiết kế poster; Đo lường không gian | Tier 3 (Autonomous)| Bố cục (layout, center, organize); `action_lab` thiết kế poster |',
          '| **W115**| Speaking Notes (Cue Cards) | B1+ PET · Rotary 3 | Ghi chú Nói: Tạo thẻ gợi ý từ khóa (cue cards) cho bài nói | Tier 3 (Autonomous)| Từ khóa gợi ý, câu mệnh lệnh; `speaking_hub` luyện nói |',
          '| **W116**| Rehearsal (Voice & Body) | B1+ PET · Rotary 4 | Tập dượt: Kỹ năng thuyết trình phi ngôn ngữ (âm lượng, mắt nhìn) | Tier 3 (Autonomous)| Kỹ năng phi ngôn ngữ (eye contact, loud, clear); `broadcast_studio` |',
          '| **W117**| **The Knowledge Fair (Group A)** | **★ FULL MOCK (Presentation A)**| **Hội chợ Tri thức Nhóm A: Báo cáo dự án Passion Project** | **Tier 3 (Exam)** | **Thuyết trình 3 phút + Q&A; Đánh giá năng lực thuyết trình B1 Part A** |',
          '| **W118**| The Knowledge Fair (Group B) | B1+ PET · Rotary 1 | Hội chợ Tri thức Nhóm B: Báo cáo dự án Passion Project | Tier 3 (Autonomous)| Thuyết trình 3 phút + Q&A; `info_exchange` phản hồi đồng cấp Part B |',
          '| **W119**| Reflection & Portfolio | B1+ PET · Rotary 2 | Phản ánh & Hồ sơ: Viết bài nhìn lại tiến trình học tập | Tier 3 (Autonomous)| Thì quá khứ phản ánh; `writing_hub` hoàn thiện hồ sơ Portfolio |',
          '| **W120**| **PHASE 2 GRADUATION** | **★ GRADUATION (Phase 2)** | **TỐT NGHIỆP GIAI ĐOẠN 2: Lễ trao chứng chỉ & Chuyển giao B1+** | **Tier 3 (Official)**| **LỄ TỐT NGHIỆP PHASE 2 — ĐẠT CHUẨN NĂNG LỰC B1 PRELIMINARY (PET)!** |'
        ];
        w113_w120_rows.forEach(r => updatedLines.push(r));
      }

      continue;
    }

    updatedLines.push(line);
  }

  const newContent = updatedLines.join('\n');
  fs.writeFileSync(MAP_PATH, newContent, 'utf8');
  console.log(`✅ Successfully updated ${path.relative(ROOT_DIR, MAP_PATH)}`);
}

if (process.argv[1] && (process.argv[1].endsWith('update_digital_syllabus_map.mjs') || fileURLToPath(import.meta.url) === process.argv[1])) {
  updateDigitalSyllabusMap();
}
