import fs from 'fs';
import path from 'path';

const DATA_DIR = './src/data/weeks';
const files = fs.readdirSync(DATA_DIR).filter(f => f.startsWith('week_') && f.endsWith('.js'));

console.log(`🚀 UPGRADING DATA STRUCTURE FOR ${files.length} WEEKS...`);

files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const wNum = file.match(/week_(\d+)/)[1];
    const wPath = `week_${wNum}`;

    // 1. Nâng cấp Vocab (Thêm audio_def, audio_sent)
    content = content.replace(
        /(id:\s*(\d+)[^}]*?audio_url:\s*")([^"]+)(")/g,
        (m, p1, id, url, p4) => {
             // Giữ nguyên audio_url (Word audio)
             // Thêm audio_def và audio_sent nếu chưa có
             const base = `${p1}/audio/${wPath}/vocab_${id}_word.mp3${p4}`;
             const def = `, audio_def: "/audio/${wPath}/vocab_${id}_def.mp3"`;
             const sent = `, audio_sent: "/audio/${wPath}/vocab_${id}_sent.mp3"`;
             
             // Tránh thêm trùng lặp nếu chạy script nhiều lần
             if(content.includes(`vocab_${id}_def.mp3`)) return base;
             return base + def + sent;
        }
    );

    // 2. Nâng cấp Word Power (Thêm audio_def, audio_sent)
    // Word Power thường nằm ở cuối file, logic ID có thể trùng vocab nhưng context khác
    // Regex này tìm trong mảng word_power { words: [...] }
    // Tuy nhiên regex đơn giản chạy toàn file. Để an toàn, ta giả định ID Word Power 1-3
    // Vocab thường 1-10.
    
    // Fix Reading
    content = content.replace(/read_explore:[\s\S]*?audio_url:\s*["'][^"']*["']/, 
        (m) => m.replace(/audio_url:\s*["'][^"']*["']/, `audio_url: "/audio/${wPath}/reading.mp3"`)
    );

    // Fix Explore
    content = content.replace(/explore:[\s\S]*?audio_url:\s*["'][^"']*["']/, 
        (m) => m.replace(/audio_url:\s*["'][^"']*["']/, `audio_url: "/audio/${wPath}/explore.mp3"`)
    );

    // Fix Dictation (Reset về chuẩn)
    content = content.replace(/(id:\s*(\d+)[^}]*?text:[^}]*?audio_url:\s*")([^"]+)(")/g,
        (m, p1, id, url, p4) => {
             if(content.includes('dictation: {')) return `${p1}/audio/${wPath}/dictation_${id}.mp3${p4}`;
             return m;
        }
    );

    // Fix Logic
    content = content.replace(/(type:\s*["']math["'][^}]*?audio_url:\s*")([^"]+)(")/g,
        (m, p1, url, p3) => m // Logic audio thường ít dùng, giữ nguyên hoặc update sau
    );

    fs.writeFileSync(filePath, content, 'utf-8');
});
console.log("✅ DATA UPGRADE COMPLETE. GRANULAR AUDIO PATHS SET.");
