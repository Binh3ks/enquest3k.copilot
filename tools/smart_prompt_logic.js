import fs from 'fs';
import path from 'path';

const weekNum = process.argv[2];
if (!weekNum) process.exit(0);

const weekFile = path.join(process.cwd(), 'src/data/weeks', `week_${weekNum}.js`);

if (!fs.existsSync(weekFile)) {
    console.log(`⚠️  Bỏ qua Tuần ${weekNum} (Chưa có nội dung)`);
    process.exit(1);
}

const content = fs.readFileSync(weekFile, 'utf8');
const tasks = [];

// Hàm làm sạch chuỗi
const clean = (str) => str ? str.replace(/"/g, '').trim() : '';

// 1. TÌM TỪ VỰNG NEW WORDS (Kèm định nghĩa)
// Regex thông minh: Lấy từ vựng VÀ định nghĩa tiếng Anh gần nhất
const regex = /word:\s*"([^"]+)"[\s\S]*?definition_en:\s*"([^"]+)"[\s\S]*?image_url:\s*"([^"]+)"/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const word = match[1];
    const def = clean(match[2]);
    const imgPath = match[3];
    const filename = path.basename(imgPath);
    
    // PROMPT CHUẨN: Kết hợp Từ + Định nghĩa + Phong cách 3D Kids
    const prompt = `${word}, concept: ${def}. educational illustration for kids, 3d render, pixar style, cute, vibrant colors, soft lighting, clean white background, high quality, 8k --no text`;
    
    tasks.push({ word, filename, prompt });
}

// Ghi ra file data.json để tool download đọc
const output = { weekId: parseInt(weekNum), tasks };
fs.writeFileSync('tools/data.json', JSON.stringify(output, null, 2));
console.log(`   📝 Đã lập lệnh cho Tuần ${weekNum}: ${tasks.length} ảnh (Prompt theo ngữ cảnh).`);
