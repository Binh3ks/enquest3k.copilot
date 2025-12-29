import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn file index.js (tính từ thư mục tools đi ra ngoài)
const filePath = path.join(process.cwd(), 'src/data/weeks/index.js');

if (!fs.existsSync(filePath)) {
    console.error("❌ File not found:", filePath);
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');
console.log("🛠️  Processing index.js...");

// 1. CLEANUP (Xóa sạch mọi dấu vết cũ của Week 18 để tránh trùng lặp/lỗi cú pháp)
// Xóa dòng import (bất kể ở đâu)
content = content.replace(/^.*import week18 .*$/gm, '');
content = content.replace(/^.*import week18_easy .*$/gm, '');
// Xóa object trong mảng (tìm theo id: 18)
content = content.replace(/\{[^}]*id:\s*18[^}]*\},\s*/g, '');
// Xóa dòng trống dư thừa
content = content.replace(/^\s*[\r\n]/gm, '\n');

// 2. INJECT IMPORTS (AN TOÀN TUYỆT ĐỐI)
// Chiến thuật: Tìm dòng "const weekIndex = [" và chèn import vào NGAY TRƯỚC nó.
// Điều này đảm bảo import luôn nằm ở Top-Level scope, không bao giờ bị lọt vào trong mảng.
const importBlock = `import week18 from './week_18';
import week18_easy from '../weeks_easy/week_18';`;

const weekIndexDef = 'const weekIndex = [';
if (content.includes(weekIndexDef)) {
    content = content.replace(weekIndexDef, `${importBlock}\n\n${weekIndexDef}`);
} else {
    // Fallback: Chèn vào đầu file nếu không tìm thấy mảng
    content = `${importBlock}\n${content}`;
}

// 3. INJECT DATA ENTRY (Vào trong mảng)
const weekEntry = `  { id: 18, title_en: "The Dream of Flying", title_vi: "Giấc Mơ Bay", data: week18, dataEasy: week18_easy },`;

// Tìm vị trí Array.from để chèn vào TRƯỚC nó
const dynRegex = /\.\.\.Array\.from\(\{ length: (\d+) \}/;
const match = content.match(dynRegex);

if (match) {
    // Chèn entry vào trước Array.from
    content = content.replace(match[0], `${weekEntry}\n  ${match[0]}`);
    
    // Cập nhật công thức ID trong Array.from: id: i + 18 -> id: i + 19
    // Chỉ thay thế nếu nó chưa được cập nhật
    if (!content.includes('id: i + 19')) {
        content = content.replace(/id: i \+ 18/g, 'id: i + 19');
        content = content.replace(/Week $\{i \+ 18\}/g, 'Week ${i + 19}');
        content = content.replace(/Tuần $\{i \+ 18\}/g, 'Tuần ${i + 19}');
        
        // Giảm length đi 1
        const currentLen = parseInt(match[1]);
        const newLen = currentLen - 1;
        content = content.replace(`length: ${currentLen}`, `length: ${newLen}`);
    }
    
    console.log("✅ Injected Week 18 correctly.");
} else {
    console.log("⚠️ Dynamic array not found. Appending to end of list.");
    const endArr = content.lastIndexOf('];');
    content = content.slice(0, endArr) + weekEntry + '\n' + content.slice(endArr);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("🎉 index.js fixed successfully!");
