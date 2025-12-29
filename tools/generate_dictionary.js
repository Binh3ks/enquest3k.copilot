import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const weeksDir = path.join(__dirname, '../src/data/weeks');
const outputFile = path.join(__dirname, '../public/dictionary.json');

const dictionary = {};

// Hàm trích xuất từ vựng từ nội dung file text
const extractWords = (content) => {
    // Regex tìm object từ vựng: { word: "...", definition_vi: "..." }
    // Chấp nhận cả trường hợp có hoặc không có dấu ngoặc kép ở key
    const regex = /\{[\s\S]*?(?:word|['"]word['"])\s*:\s*["']([^"']+)["'][\s\S]*?(?:definition_vi|['"]definition_vi['"])\s*:\s*["']([^"']+)["'][\s\S]*?\}/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
        const word = match[1].toLowerCase().trim();
        const def = match[2].trim();
        
        // Logic: Ưu tiên định nghĩa dài hơn (chi tiết hơn) nếu từ đã tồn tại
        if (!dictionary[word] || dictionary[word].length < def.length) {
            dictionary[word] = def;
        }
    }
};

console.log("🚀 STARTING DICTIONARY SCAN...");

if (!fs.existsSync(weeksDir)) {
    console.error("❌ Weeks directory not found!");
    process.exit(1);
}

const files = fs.readdirSync(weeksDir);
let fileCount = 0;

files.forEach(file => {
    if (file.startsWith('week_') && file.endsWith('.js')) {
        const filePath = path.join(weeksDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        extractWords(content);
        fileCount++;
        process.stdout.write("."); // Progress bar kiểu đơn giản
    }
});

// Thêm một số từ vựng hệ thống cơ bản nếu cần
dictionary["scholar"] = "Học giả, người nghiên cứu";
dictionary["engquest"] = "Hành trình chinh phục tiếng Anh";

// Ghi file
fs.writeFileSync(outputFile, JSON.stringify(dictionary, null, 2), 'utf8');

console.log(`\n\n✨ DONE! Scanned ${fileCount} files.`);
console.log(`📚 Total words in dictionary: ${Object.keys(dictionary).length}`);
console.log(`💾 Saved to: public/dictionary.json`);
