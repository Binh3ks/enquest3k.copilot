import fs from 'fs';
import path from 'path';

// Tìm file WordPower.jsx (thường ở src/modules/power/WordPower.jsx)
const filePath = path.join(process.cwd(), 'src/modules/power/WordPower.jsx');

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Tìm thẻ img có object-cover và thay thế bằng object-contain p-2
    // Giả sử class hiện tại là "w-full h-48 object-cover..." hoặc tương tự
    if (content.includes('object-cover')) {
        content = content.replace(/object-cover/g, 'object-contain p-2 bg-white');
        fs.writeFileSync(filePath, content);
        console.log("✅ Đã sửa WordPower.jsx: Chuyển object-cover thành object-contain.");
    } else {
        console.log("⚠️ Không tìm thấy 'object-cover' trong WordPower.jsx. Có thể đã sửa rồi?");
    }
} else {
    console.error("❌ Không tìm thấy file src/modules/power/WordPower.jsx");
}
