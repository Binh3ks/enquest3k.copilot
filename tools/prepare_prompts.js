import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const weekNum = process.argv[2] || '01';
const weekInt = parseInt(weekNum);
const weekFile = path.join(process.cwd(), 'src/data/weeks', `week_${weekNum}.js`);

if (!fs.existsSync(weekFile)) { console.error("❌ Thiếu file data"); process.exit(1); }

const content = fs.readFileSync(weekFile, 'utf8');
const tasks = [];

// Regex trích xuất word và image_url đã chuẩn hóa
const regex = /word:\s*"([^"]+)"[\s\S]*?image_url:\s*"([^"]+)"/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const word = match[1];
    const imgPath = match[2];
    const filename = path.basename(imgPath);
    
    // Prompt "Kids Edition" chất lượng cao
    const prompt = `${word}, educational illustration for kids, 3d render, pixar style, cute, vibrant colors, soft lighting, clean white background, high quality, 8k`;

    tasks.push({ word, filename, prompt });
}

const output = { weekId: weekInt, tasks };
fs.writeFileSync('tools/data.json', JSON.stringify(output, null, 2));
console.log(`\n📋 Đã tạo lệnh tải ${tasks.length} ảnh vào tools/data.json`);
