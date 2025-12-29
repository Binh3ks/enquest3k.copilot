import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const weekId = parseInt(process.argv[2]);
if (!weekId) { console.log("Usage: node tools/auto_video_task.js <weekId>"); process.exit(1); }

const weekStr = weekId.toString().padStart(2, '0');
const filePath = path.join(__dirname, `../src/data/weeks/week_${weekStr}.js`);

if (!fs.existsSync(filePath)) { console.log(`File not found: week_${weekStr}.js`); process.exit(1); }

const content = fs.readFileSync(filePath, 'utf8');
// Trích xuất block daily_watch bằng Regex
const watchMatch = content.match(/daily_watch:\s*\{[\s\S]*?videos:\s*\[([\s\S]*?)\]/);

if (watchMatch && watchMatch[1]) {
    const videoBlock = watchMatch[1];
    const videos = [];
    const videoRegex = /\{[^}]*?id:\s*(\d+)[^}]*?query:\s*["']([^"']+)["'][^}]*?\}/g;
    let m;
    while ((m = videoRegex.exec(videoBlock)) !== null) {
        videos.push({ id: parseInt(m[1]), query: m[2] });
    }
    
    const output = { weeks: [{ weekId: weekId, videos: videos }] };
    fs.writeFileSync('video_tasks.json', JSON.stringify(output, null, 2));
    console.log(`✅ Extracted ${videos.length} video tasks for Week ${weekId}`);
} else {
    console.log("❌ Could not parse daily_watch videos.");
}
