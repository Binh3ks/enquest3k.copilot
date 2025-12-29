import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tasks = [];

const processWeeks = async (start, end) => {
    for (let i = start; i <= end; i++) {
        const p = path.join(__dirname, `../src/data/weeks/week_${i.toString().padStart(2,'0')}.js`);
        if (!fs.existsSync(p)) continue;
        const c = fs.readFileSync(p, 'utf8');
        const dir = `public/audio/week${i}`;
        
        // Regex tìm tất cả audio link và text
        const regex = /(?:text|question_en|content_en|word|definition_en|collocation|example|model_sentence):\s*["']([^"']+)["'][\s\S]*?audio_\w+:\s*["']\/audio\/week\d+\/([^"']+)["']/g;
        let m;
        while ((m = regex.exec(c)) !== null) {
            tasks.push({ text: m[1].replace(/\*\*/g,''), path: `${dir}/${m[2]}` });
        }
    }
    fs.writeFileSync('audio_tasks.json', JSON.stringify(tasks, null, 2));
    console.log(`✅ Extracted ${tasks.length} tasks.`);
};
processWeeks(parseInt(process.argv[2]), parseInt(process.argv[3]));
