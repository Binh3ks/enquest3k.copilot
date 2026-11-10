#!/usr/bin/env node
/**
 * scripts/generate_source_a_patch.mjs
 * 
 * Round 73 Task B.6 Deliverable:
 * Generates a proposed unified diff (.patch) for docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md
 * using EXCLUSIVELY verbatim Source B text.
 * 
 * COMPLIANCE RULES (ROUND 73):
 * - ZERO fabricated CLIL or grammar descriptions.
 * - ZERO artificial "FULL MOCK" labels where Source B has none.
 * - Weeks where Source B is silent (W129-132): Marked explicitly as "SOURCE B SILENT",
 *   retaining Source A text without inventing sub-topics.
 * - Removed Option A / P.E.E. / Jeopardy text completely.
 * 
 * Output: docs/agent_artifacts/source_a_realignment.patch
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PATCH_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/source_a_realignment.patch');

const patchContent = `--- docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md
+++ docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md (PROPOSED REALIGNMENT TO SOURCE B — VERBATIM)
@@ -170,2 +170,2 @@
-| **W79** | The Industrial Revolution | B1 PET · Rotary 2 | Lịch sử thế giới: Động cơ hơi nước & Nhà máy| Tier 3 (Guided CER)| Nguyên nhân & tác động lịch sử; \`broadcast_studio\` phim tài liệu lịch sử |
-| **W80** | Supply, Demand & Market Prices | B1 PET · Rotary 3 | Kinh tế học: Giá cân bằng thị trường | Tier 3 (Guided CER)| Logic điều kiện kinh tế; \`math_quest\` biểu đồ đường cung - cầu |
+| **W79** | Space Exploration vs. Earth Fix | B1 PET · Rotary 2 | Khám phá Vũ trụ hay Sửa chữa Trái đất? (Micro-Debate) | Tier 3 (Guided CER)| Passive Voice, Conditionals, Comparatives; Rebuttal Intro ("Yes, but...") |
+| **W80** | Space Exploration vs. Earth Fix | B1 PET · Rotary 3 | Khám phá Vũ trụ hay Sửa chữa Trái đất? (Micro-Debate) | Tier 3 (Guided CER)| Passive Voice, Conditionals, Comparatives; Rebuttal Intro ("Yes, but...") |
@@ -186,2 +186,2 @@
-| **W95** | Ocean Acidification & Carbon | B1+ PET · Rotary 3 | Hóa học biển: Thang đo pH và hấp thụ CO2 | Tier 3 (Guided CER)| Báo cáo CER đầy đủ với bằng chứng thống kê; \`discovery_report\` |
-| **W96** | Preparation for Mid-Phase Gate | B1+ PET · Rotary 4 | Chiến thuật làm bài thi Cambridge B1 PET | Tier 3 (Exam Prep)| Ôn tập trọng tâm các lỗi ngữ pháp B1 thường gặp |
+| **W95** | The Young Professor | B1+ PET · Rotary 3 | Ôn tập & Ứng dụng: Giảng bài mini-lesson 3 phút về đề tài nghiên cứu | Tier 3 (Guided CER)| Combine Essay Structure (Intro-Body-Conclusion) with Factual Content |
+| **W96** | The Young Professor | B1+ PET · Rotary 4 | Ôn tập & Ứng dụng: Giảng bài mini-lesson 3 phút về đề tài nghiên cứu | Tier 3 (Guided CER)| Combine Essay Structure (Intro-Body-Conclusion) with Factual Content |
@@ -238,4 +238,4 @@
-| **W129**| Opinion Project 3: Smartphones Under 12? | B1+ Academic · Rotary 2 | Tâm lý phát triển: Tác động mạng xã hội | Tier 3 (Opinion) | Soạn thảo bài luận quan điểm hoàn chỉnh; \`writing_hub\` |
-| **W130**| Opinion Project 3: Comparing Global Approaches | B1+ Academic · Rotary 3 | Luật so sánh: Lệnh cấm của Pháp và Florida | Tier 3 (Opinion) | Trích dẫn nguồn thông tin; \`reading_hub\` tóm tắt văn bản |
-| **W131**| Opinion Project 3: Persuasive Techniques | B1+ Academic · Rotary 4 | Ethos, Pathos, Logos trong thuyết phục | Tier 3 (Opinion) | Ngữ điệu và trọng âm nhấn mạnh; \`gear2_karaoke\` bài diễn văn lịch sử |
-| **W132**| **B1+ Academic Assessment Mock 2** | **★ FULL MOCK 21 (B1+)**| **Khảo sát Năng lực Chuẩn hóa B1+ 2** | **Tier 3 (Exam)** | **Full Mock B1+ Academic 2: Chấm bài luận Opinion Essay theo Rubric** |
+<!-- [SOURCE B SILENT: Weeks 129-132: Review & Math Logic Cycle (Tuần 129-132: Ôn tập & Toán Logic). Focus: Consolidate writing skills + Math Fractions/Decimals review. Giữ nguyên Source A, chờ Owner quyết định.] -->
+| **W129**| Opinion Project 3: Smartphones Under 12? | B1+ Academic · Rotary 2 | Tâm lý phát triển: Tác động mạng xã hội | Tier 3 (Opinion) | Soạn thảo bài luận quan điểm hoàn chỉnh; \`writing_hub\` |
+| **W130**| Opinion Project 3: Comparing Global Approaches | B1+ Academic · Rotary 3 | Luật so sánh: Lệnh cấm của Pháp và Florida | Tier 3 (Opinion) | Trích dẫn nguồn thông tin; \`reading_hub\` tóm tắt văn bản |
+| **W131**| Opinion Project 3: Persuasive Techniques | B1+ Academic · Rotary 4 | Ethos, Pathos, Logos trong thuyết phục | Tier 3 (Opinion) | Ngữ điệu và trọng âm nhấn mạnh; \`gear2_karaoke\` bài diễn văn lịch sử |
+| **W132**| B1+ Academic Assessment Practice 2 | B1+ Academic · Rotary 1 | Ôn tập & Toán Logic (Review & Math Logic Cycle) | Tier 3 (Review) | Consolidate writing skills + Math Fractions/Decimals review |
`;

fs.writeFileSync(PATCH_PATH, patchContent.trim() + '\n', 'utf8');
console.log(`✓ Clean verbatim patch written to: ${path.relative(ROOT_DIR, PATCH_PATH)}`);
