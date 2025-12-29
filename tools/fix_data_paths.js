import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data/weeks');

// Hàm chuẩn hóa đường dẫn ảnh trong file data
const fixPathForWeek = (weekNum) => {
    const paddedWeek = weekNum.toString().padStart(2, '0');
    const weekFile = path.join(DATA_DIR, `week_${paddedWeek}.js`);
    
    // Tên folder chuẩn trên ổ cứng (week1, week2... không có số 0)
    const correctFolder = `week${weekNum}`;

    if (!fs.existsSync(weekFile)) {
        console.log(`⚠️  Tuần ${weekNum}: File không tồn tại.`);
        return;
    }

    let content = fs.readFileSync(weekFile, 'utf8');
    let hasChanges = false;

    // Regex tìm image_url: "..."
    // Thay thế mọi biến thể đường dẫn cũ thành /images/week{N}/filename.jpg
    content = content.replace(/image_url:\s*["']([^"']+)["']/g, (match, oldPath) => {
        if (oldPath.includes('placeholder')) return match; // Bỏ qua placeholder

        const fileName = path.basename(oldPath);
        const newPath = `/images/${correctFolder}/${fileName}`;

        if (oldPath !== newPath) {
            hasChanges = true;
            // console.log(`   [FIX] ${oldPath} -> ${newPath}`);
            return `image_url: "${newPath}"`;
        }
        return match;
    });

    if (hasChanges) {
        fs.writeFileSync(weekFile, content);
        console.log(`✅ Tuần ${weekNum}: Đã đồng bộ đường dẫn ảnh -> /images/${correctFolder}/...`);
    } else {
        console.log(`✨ Tuần ${weekNum}: Đường dẫn đã chuẩn.`);
    }
};

// Chạy cho 144 tuần
console.log("--- BẮT ĐẦU ĐỒNG BỘ ĐƯỜNG DẪN ẢNH (DATA <-> DISK) ---");
for (let i = 1; i <= 144; i++) {
    fixPathForWeek(i);
}
console.log("--- HOÀN TẤT ---");
