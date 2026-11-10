import fs from 'fs';

const lines = fs.readFileSync('docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt', 'utf8').split('\n');

function getLine(n) {
  return `${n}: ${lines[n - 1]}`;
}

let md = `# Comprehensive Audit: Source B Internal Contradictions (Part I vs Part II)\n\n`;
md += `Generated strictly by programmatic analysis of \`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt\`.\n\n`;

md += `## 1. Summary of Structural Conflict\n\n`;
md += `Trong văn bản Source B (\`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt\`), tồn tại một mâu thuẫn cấu trúc sâu sắc giữa:\n`;
md += `- **Part I (Overview / Triết lý & Phân bổ thời lượng, dòng 95–108)**: Mô tả Phase 3 chỉ gồm 32 tuần (Tuần 113–144), chia thành 3 chu trình 8 tuần + 8 tuần tốt nghiệp (137–144).\n`;
md += `- **Part II (Detailed Week-by-Week Curriculum, dòng 907–1205)**: Thiết kế chương trình thực tế đủ 156 tuần (3 năm x 52 tuần). Giai đoạn 2 kết thúc ở Tuần 120 (Phase 2 Graduation). Giai đoạn 3 bắt đầu từ Tuần 121 đến 156 (36 tuần), chia thành 3 chu trình 12 tuần (121–132, 133–144, 145–156).\n\n`;

md += `## 2. Side-by-Side Comparison Table\n\n`;
md += `| Trục Phân Tích | Part I: Overview (Dòng 95–108) | Part II: Detailed Syllabus (Dòng 907–1156) | Trạng thái Mâu Thuẫn & Hậu Quả |\n`;
md += `| :--- | :--- | :--- | :--- |\n`;
md += `| **Phạm vi Phase 2 Kết thúc** | Không đề cập rõ W113–120 thuộc Phase 2 | **Dòng 907, 949**: Tuần 113–120 là *Visuals, Presentation & Graduation Phase 2*. W120 là *PHASE 2 GRADUATION*. | **Mâu thuẫn 8 tuần**: Part I coi W113 là bắt đầu Phase 3, trong khi Part II coi W113–120 là kết thúc Phase 2. |\n`;
md += `| **Bắt đầu Phase 3** | **Dòng 101**: Bắt đầu từ Tuần 113 | **Dòng 953**: *PHASE 3: ADVANCED SYNTHESIS & DEBATE (WEEKS 121-156)* (36 tuần). | Lệch 8 tuần mốc xuất phát của Phase 3. |\n`;
md += `| **Project Cycle 1** | **Dòng 101–102**: Tuần 113–120 (8 tuần). Chủ đề: *Homework: A Helper or a Burden?* | **Dòng 955**: Tuần 121–132 (12 tuần). Chủ đề: *THE HOMEWORK DEBATE*. | Lệch tuần (113-120 vs 121-132) và độ dài (8 tuần vs 12 tuần). |\n`;
md += `| **Project Cycle 2** | **Dòng 103–104**: Tuần 121–128 (8 tuần). Chủ đề: *Video Games: More Than Just a Game?* | **Dòng 1009**: Tuần 133–144 (12 tuần). Chủ đề: *VIDEO GAMES DEBATE*. | Lệch tuần (121-128 vs 133-144) và độ dài (8 tuần vs 12 tuần). |\n`;
md += `| **Project Cycle 3** | **Dòng 105–106**: Tuần 129–136 (8 tuần). Chủ đề: *Smartphones for Kids: A Tool or a Distraction?* | **Dòng 1106**: Tuần 145–156 (12 tuần). Chủ đề: *CAPSTONE & GRADUATION: Smartphones*. | Lệch tuần (129-136 vs 145-156) và vị trí kết khóa. |\n`;
md += `| **Khối Tuần 129–132** | Nằm trong Project Cycle 3 (Smartphones) | **Dòng 1007**: *Weeks 129-132: Review & Math Logic Cycle* (Đệm giữa Homework và Video Games). | **Điểm mù (Blind Spot)**: Part I đặt Smartphones tại W129-136; Part II đặt Review & Math Logic tại W129-132 và dời Smartphones về W145-156! |\n`;
md += `| **Kết thúc Chương Trình** | **Dòng 107**: Tuần 137–144 (Tổng 144 tuần). | **Dòng 1106, 1156**: Tuần 156 (Tổng 156 tuần - đủ 3 năm). | Part I là bản nháp cũ 144 tuần, Part II là bản triển khai thực tế 156 tuần. |\n\n`;

md += `## 3. Verbatim Citations from Source B\n\n`;
md += `### Part I Overview (Trích nguyên văn):\n\`\`\`text\n`;
for (let i = 96; i <= 108; i++) {
  md += getLine(i) + '\n';
}
md += `\`\`\`\n\n`;

md += `### Part II Detailed Syllabus (Trích nguyên văn các mốc chu trình):\n\`\`\`text\n`;
md += getLine(907) + '\n';
md += getLine(949) + '\n';
md += getLine(953) + '\n';
md += getLine(955) + '\n';
md += getLine(956) + '\n';
md += getLine(1004) + '\n';
md += getLine(1007) + '\n';
md += getLine(1008) + '\n';
md += getLine(1009) + '\n';
md += getLine(1010) + '\n';
md += getLine(1106) + '\n';
md += getLine(1107) + '\n';
md += `\`\`\`\n\n`;

md += `## 4. Root Cause of Digital Map (Source A) Divergence at W129–134\n\n`;
md += `1. Khi tác giả Digital Map (Source A) biên soạn khối Phase 3:\n`;
md += `   - Tại W121–128: Lấy nội dung từ Part II (Homework Debate: Intro, Critical Listening... The Live Debate 1).\n`;
md += `   - Tại W129–132: Nhìn vào **Part I** (dòng 105: *Project Cycle 3 (Weeks 129-136): Smartphones for Kids*), nên đã đặt tên W129–131 là *Opinion Project 3: Smartphones Under 12?*.\n`;
md += `   - Tại W133–136: Quay trở lại **Part II** (dòng 1009: *Project Cycle 2: Deep Research & Data, Identifying Fallacies*).\n`;
md += `2. Kết quả: Digital Map đã vô tình lai ghép hai phần không tương thích của Source B:\n`;
md += `   - Đưa chủ đề Smartphones (vốn thuộc W145–156 trong Part II) chen ngang vào W129–131.\n`;
md += `   - Bỏ qua khối ôn tập *Review & Math Logic Cycle* (W129–132) của Part II.\n`;
md += `   - Đẩy Video Games lùi xuống sau Smartphones thay vì đi theo trình tự Part II.\n`;

fs.writeFileSync('docs/agent_artifacts/source_b_internal_contradictions.md', md, 'utf8');
console.log('Saved source_b_internal_contradictions.md');
