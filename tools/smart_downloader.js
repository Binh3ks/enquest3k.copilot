import fs from 'fs';
import path from 'path';
import https from 'https';

// Config
const WEEK_ID = 1;
const FILE_PATH = path.join(process.cwd(), 'src/data/weeks/week_01.js');
const IMG_DIR = path.join(process.cwd(), 'public/images/week1');

// Tạo thư mục
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

// Hàm tải ảnh có xử lý Redirect & User-Agent
const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        // Fake User-Agent để tránh bị chặn
        const options = {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        };
        
        const request = https.get(url, options, (res) => {
            // Xử lý Redirect
            if (res.statusCode === 301 || res.statusCode === 302) {
                download(res.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(`Status ${res.statusCode}`);
                return;
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(true);
            });
        });
        request.on('error', (err) => {
            fs.unlink(dest, () => {});
            resolve(false);
        });
    });
};

const run = async () => {
    if (!fs.existsSync(FILE_PATH)) return;
    let content = fs.readFileSync(FILE_PATH, 'utf8');
    
    // Regex bắt link ảnh http/https
    const regex = /image_url:\s*(["'])(https?:\/\/[^"']+)\1/g;
    let match;
    let replacements = [];
    let count = 0;

    while ((match = regex.exec(content)) !== null) {
        // Lấy tên file gốc nếu có thể, hoặc random
        let filename = `img_w1_${Date.now()}_${count}.jpg`;
        replacements.push({ 
            fullMatch: match[0], 
            url: match[2], 
            quote: match[1],
            filename 
        });
        count++;
    }

    console.log(`📦 Tìm thấy ${replacements.length} ảnh cần tải...`);

    for (const item of replacements) {
        console.log(`⬇️ Đang tải: ${item.filename}`);
        const success = await download(item.url, path.join(IMG_DIR, item.filename));
        if (success) {
            const localPath = `/images/week${WEEK_ID}/${item.filename}`;
            content = content.replace(item.fullMatch, `image_url: ${item.quote}${localPath}${item.quote}`);
        }
    }
    
    fs.writeFileSync(FILE_PATH, content);
    console.log("🎉 Đã tải ảnh và cập nhật week_01.js");
};

run();
