import fs from 'fs';
import path from 'path';
import https from 'https';

// CẤU HÌNH MAPPING THÔNG MINH CHO WEEK 1
// Định nghĩa chính xác những gì muốn hiển thị để khớp ngữ cảnh
const SMART_MAP = {
    // New Words
    "scholar": "cute young student wearing glasses reading a book 3d pixar style",
    "knowledge": "open magical glowing book with floating letters 3d icon",
    "observe": "cute kid looking through a magnifying glass 3d cartoon",
    "tool": "school stationery set pencil ruler eraser 3d icon colorful", // FIX: Búa -> Văn phòng phẩm
    "fact": "magnifying glass checking a document checkmark 3d icon",
    "idea": "glowing lightbulb idea symbol 3d render cute",
    "journey": "winding path road map adventure 3d cartoon game asset",
    "discovery": "open treasure chest with glowing light 3d icon",
    "record": "hand writing in a notebook diary with pen 3d cartoon",
    "explore": "cute kid holding a map and binoculars adventure 3d character",
    
    // Word Power (Những từ này cần hình trừu tượng hơn)
    "diligent": "cute ant working hard carrying leaf 3d cartoon",
    "focus": "camera lens focus target 3d icon",
    "create": "artist palette and brush painting colorful 3d icon"
};

const IMG_DIR = './public/images/week1';
const DATA_FILE = './src/data/weeks/week_01.js';

// Hàm download ảnh từ Pollinations (AI Generator - Free & Fast)
const downloadImage = (prompt, filename) => {
    // Encode prompt và thêm seed ngẫu nhiên để ảnh không bị cache nếu chạy lại
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
    
    const dest = path.join(IMG_DIR, filename);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`✅ Updated: ${filename} -> "${prompt}"`);
                    resolve();
                });
            } else {
                console.error(`❌ Failed: ${filename} (Status: ${res.statusCode})`);
                resolve(); // Skip error to continue
            }
        }).on('error', (err) => {
            console.error(`❌ Error downloading ${filename}: ${err.message}`);
            resolve();
        });
    });
};

const run = async () => {
    console.log("--- BẮT ĐẦU CẬP NHẬT HÌNH ẢNH WEEK 1 (SMART CONTEXT) ---");
    
    // 1. Đọc file data để lấy tên file ảnh hiện tại
    if (!fs.existsSync(DATA_FILE)) {
        console.error("Không tìm thấy file data Week 1");
        return;
    }
    
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    
    // 2. Quét và map lại ảnh
    // Regex tìm: word: "...", ... image_url: "/images/week1/..."
    // Vì regex phức tạp, ta sẽ duyệt qua SMART_MAP và tìm file tương ứng trong folder
    
    const files = fs.readdirSync(IMG_DIR);
    
    for (const [word, prompt] of Object.entries(SMART_MAP)) {
        // Tìm file ảnh có chứa tên từ vựng (ví dụ: scholar.jpg hoặc img_w1_... nhưng ta ưu tiên logic mapping)
        // Cách tốt nhất: Tìm trong file data xem từ 'word' đang dùng file ảnh nào
        
        // Regex tìm object chứa word: "word" và sau đó lấy image_url
        // Pattern: word: "scholar" ... image_url: "/images/week1/fileName.jpg"
        // Lưu ý: Code này giả định format file week_01.js chuẩn
        
        const regex = new RegExp(`word:\\s*["']${word}["'][\\s\\S]*?image_url:\\s*["']([^"']+)["']`, 'i');
        const match = content.match(regex);
        
        if (match) {
            const currentPath = match[1]; // /images/week1/student.jpg
            const filename = path.basename(currentPath); // student.jpg
            
            console.log(`🔄 Updating image for "${word}"...`);
            await downloadImage(prompt, filename);
        } else {
            console.warn(`⚠️ Cannot find image mapping for word: ${word} in data file.`);
        }
    }
    
    console.log("--- HOÀN TẤT. VUI LÒNG RELOAD TRANG WEB ---");
};

run();
