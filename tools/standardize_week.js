import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const weekNum = process.argv[2] || '01'; 
const weekFile = path.join(process.cwd(), 'src/data/weeks', `week_${weekNum}.js`);

if (!fs.existsSync(weekFile)) {
    console.error(`❌ Không tìm thấy file: ${weekFile}`);
    process.exit(1);
}

let content = fs.readFileSync(weekFile, 'utf8');
let count = 0;

// Regex tìm: word: "ABC", ... image_url: "..."
const regex = /word:\s*"([^"]+)"[\s\S]*?image_url:\s*"([^"]+)"/g;

const newContent = content.replace(regex, (match, word, oldPath) => {
    // Chỉ xử lý nếu chưa chuẩn
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newFilename = `${cleanWord}_w${weekNum}.jpg`;
    const newPath = `/images/week${parseInt(weekNum)}/${newFilename}`;
    
    if (oldPath !== newPath) {
        count++;
        console.log(`✏️  Sửa: ${word} -> ${newFilename}`);
        return match.replace(oldPath, newPath);
    }
    return match;
});

if (count > 0) {
    fs.writeFileSync(weekFile, newContent, 'utf8');
    console.log(`✅ Đã cập nhật ${count} đường dẫn ảnh trong ${weekFile}`);
} else {
    console.log("✨ Các đường dẫn ảnh trong file đã chuẩn, không cần sửa.");
}
