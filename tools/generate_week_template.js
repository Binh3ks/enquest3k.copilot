// TOOL: TẠO KHUNG DỮ LIỆU CHO TUẦN MỚI
// Cách dùng: node tools/generate_week_template.js <week_number>
// Ví dụ: node tools/generate_week_template.js 15

const fs = require('fs');
const path = require('path');

const weekNum = process.argv[2];
if (!weekNum) {
    console.error("❌ Vui lòng nhập số tuần. Ví dụ: node tools/generate_week_template.js 15");
    process.exit(1);
}

const weekId = parseInt(weekNum);
const fileName = `week_${String(weekId).padStart(2, '0')}.js`;
const filePath = path.join(__dirname, '../src/data/weeks', fileName);

const template = \`const weekData = {
  weekId: \${weekId},
  weekTitle_en: "Topic Title (EN)",
  weekTitle_vi: "Chủ đề (VI)",
  grammar_focus: "Grammar Focus",
  stations: {
    read_explore: {
      title: "Reading Title",
      content_en: "English content here...",
      content_vi: "Vietnamese content here...",
      audio_url: null,
      comprehension_questions: []
    },
    new_words: {
      vocab: [
        // 10 WORDS TEMPLATE
        { id: 1, word: "word1", pronunciation: "//", definition_en: "...", definition_vi: "...", example: "...", collocation: "...", image_url: "" },
        { id: 2, word: "word2", pronunciation: "//", definition_en: "...", definition_vi: "...", example: "...", collocation: "...", image_url: "" },
        // ... Copy thêm cho đủ 10 từ
      ]
    },
    grammar: {
        grammar_explanation: { rules: [] },
        exercises: []
    },
    // ... Copy thêm cấu trúc các trạm khác
  }
};
export default weekData;\`;

if (fs.existsSync(filePath)) {
    console.log(\`⚠️ File \${fileName} đã tồn tại!\`);
} else {
    fs.writeFileSync(filePath, template);
    console.log(\`✅ Đã tạo file mẫu: src/data/weeks/\${fileName}\`);
    console.log(\`👉 Đừng quên import vào src/data/weeks/index.js\`);
}
