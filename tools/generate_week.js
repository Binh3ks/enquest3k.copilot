import fs from 'fs';
import path from 'path';

// --- HƯỚNG DẪN: node tools/generate_week.js <số_tuần> ---
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("❌ LỖI: Thiếu số tuần.");
    console.log("👉 Ví dụ để tạo Tuần 2: node tools/generate_week.js 2");
    process.exit(1);
}

const targetWeek = parseInt(args[0]);
const targetWeekStr = targetWeek < 10 ? `0${targetWeek}` : `${targetWeek}`;
const TEMPLATE_WEEK = 19; // Change this to the latest template week
const TEMPLATE_WEEK_STR = TEMPLATE_WEEK < 10 ? `0${TEMPLATE_WEEK}` : `${TEMPLATE_WEEK}`;
const SOURCE_FILE = path.join(process.cwd(), `src/data/weeks/week_${TEMPLATE_WEEK_STR}.js`);
const TARGET_FILE = path.join(process.cwd(), `src/data/weeks/week_${targetWeekStr}.js`);
const INDEX_FILE = path.join(process.cwd(), 'src/data/weeks/index.js');


// Always remove old data before creating new
if (fs.existsSync(TARGET_FILE)) {
    fs.unlinkSync(TARGET_FILE);
    console.log(`🗑️ Đã xóa file cũ: src/data/weeks/week_${targetWeekStr}.js`);
}

console.log(`⚙️ Đang sao chép từ Tuần ${TEMPLATE_WEEK} sang Tuần ${targetWeek}...`);

// 1. Đọc nội dung mẫu
let content = fs.readFileSync(SOURCE_FILE, 'utf8');

// 2. Thay thế dữ liệu (dùng regex để thay đúng weekId và tiêu đề)
content = content.replace(/weekId:\s*\d+,/g, `weekId: ${targetWeek},`);
content = content.replace(/weekTitle_en:\s*"[^"]*"/g, `weekTitle_en: "Week ${targetWeek} Topic"`);
content = content.replace(/weekTitle_vi:\s*"[^"]*"/g, `weekTitle_vi: "Chủ đề Tuần ${targetWeek}"`);

// 3. Ghi file
fs.writeFileSync(TARGET_FILE, content);
console.log(`✅ Đã tạo file: src/data/weeks/week_${targetWeekStr}.js`);

// 4. Đăng ký vào index.js (Quan trọng)
let indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
const importStmt = `import week${targetWeekStr} from './week_${targetWeekStr}.js';`;

// Kiểm tra xem đã import chưa
if (!indexContent.includes(importStmt)) {
    // Chèn Import vào dòng cuối cùng của khối import
    const lastImportIdx = indexContent.lastIndexOf('import ');
    const endOfImportLine = indexContent.indexOf(';', lastImportIdx);
    
    indexContent = indexContent.slice(0, endOfImportLine + 1) + '\n' + importStmt + indexContent.slice(endOfImportLine + 1);
    
    // Chèn Export vào object weeks
    // Tìm dòng chứa "week01: week01," hoặc tương tự
    const regexExport = /week\d+:\s*week\d+,/g;
    const matches = indexContent.match(regexExport);
    
    if (matches && matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        const lastMatchIdx = indexContent.lastIndexOf(lastMatch);
        const endOfMatch = lastMatchIdx + lastMatch.length;
        
        const newExport = `\n  week${targetWeekStr}: week${targetWeekStr},`;
        indexContent = indexContent.slice(0, endOfMatch) + newExport + indexContent.slice(endOfMatch);
        
        fs.writeFileSync(INDEX_FILE, indexContent);
        console.log(`✅ Đã đăng ký Week ${targetWeek} vào index.js`);
    } else {
        console.warn("⚠️ Không tìm thấy chỗ để chèn export trong index.js. Hãy kiểm tra thủ công.");
    }
} else {
    console.log("ℹ️ Week này đã được đăng ký trong index.js rồi.");
}

console.log("\n🎉 HOÀN TẤT! Bạn có thể bắt đầu chỉnh sửa file mới.");
