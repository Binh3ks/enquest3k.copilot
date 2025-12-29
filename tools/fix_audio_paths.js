import fs from 'fs';
import path from 'path';

const DATA_DIR = './src/data/weeks';
const files = fs.readdirSync(DATA_DIR).filter(f => f.startsWith('week_') && f.endsWith('.js'));

console.log(`🚀 AUTO-CONNECTING AUDIO FOR ${files.length} WEEKS...`);

files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Lấy ID tuần chuẩn (01, 02...)
    const weekNumRaw = file.match(/week_(\d+)/)[1]; 
    const wFolder = `week_${weekNumRaw}`; // Audio folder có underscore (week_01)
    
    // Logic thay thế cực mạnh (Regex Replacement)
    
    // 1. Reading
    content = content.replace(/audio_url:\s*["'].*?reading\.mp3["']/g, `audio_url: "/audio/${wFolder}/reading.mp3"`);
    // Fallback cho file chưa có path chuẩn
    content = content.replace(/read_explore:[\s\S]*?audio_url:\s*["']([^"']+)["']/g, (m, url) => {
        if(url.includes('/audio/week')) return m; // Đã chuẩn rồi thì thôi
        return m.replace(url, `/audio/${wFolder}/reading.mp3`);
    });

    // 2. Vocab (id: 1 -> vocab_1_word.mp3)
    content = content.replace(/(id:\s*(\d+)[^}]*?word:[^}]*?audio_url:\s*")([^"]+)(")/g, 
        (m, p1, id, url, p4) => `${p1}/audio/${wFolder}/vocab_${id}_word.mp3${p4}`
    );

    // 3. Dictation
    content = content.replace(/(id:\s*(\d+)[^}]*?text:[^}]*?audio_url:\s*")([^"]+)(")/g,
        (m, p1, id, url, p4) => {
             if(content.includes('dictation: {')) return `${p1}/audio/${wFolder}/dictation_${id}.mp3${p4}`;
             return m;
        }
    );
    
    // 4. Shadowing
    content = content.replace(/(script:[\s\S]*?id:\s*(\d+)[^}]*?audio_url:\s*")([^"]+)(")/g,
         (m, p1, id, url, p4) => `${p1}/audio/${wFolder}/shadowing_${id}.mp3${p4}`
    );

    fs.writeFileSync(filePath, content, 'utf-8');
});
console.log("✅ ALL AUDIO PATHS CONNECTED.");
