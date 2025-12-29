import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../src/data/video_tasks.json');
const TARGET_DIR = path.join(__dirname, '../src/data/weeks');

const ESL_GAMES = [
    { title: "Sentence Monkey", url: "https://www.eslgamesplus.com/sentence-monkey/", description: "Help the monkey build sentences!" },
    { title: "Fast English", url: "https://www.gamestolearnenglish.com/fast-english/", description: "Match words with pictures fast!" },
    { title: "Questions Game", url: "https://www.gamestolearnenglish.com/questions/", description: "Practice asking & answering." },
    { title: "Word Shake", url: "https://learnenglishkids.britishcouncil.org/games/wordshake", description: "Create words from letters." },
    { title: "Tongue Twisters", url: "https://learnenglishkids.britishcouncil.org/fun-games/tongue-twisters", description: "Twist your tongue & speak!" }
];

async function main() {
    console.log("   --- UPDATING VIDEO DATA ---");
    if (!fs.existsSync(DATA_FILE)) { console.error("Config not found!"); process.exit(1); }

    const tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    for (const task of tasks) {
        const weekId = task.weekId;
        const weekFolder = `week_${String(weekId).padStart(2, '0')}`;
        const weekFile = path.join(TARGET_DIR, weekFolder, 'daily_watch.js');
        
        if (!fs.existsSync(path.dirname(weekFile))) {
             fs.mkdirSync(path.dirname(weekFile), { recursive: true });
        }

        const processedVideos = task.videos.map(v => ({
            id: v.id,
            category: v.category || "WATCH",
            videoId: v.videoId || "dQw4w9WgXcQ", 
            title: v.title || v.query,
            duration: v.duration || "5:00",
            sim_duration: v.sim_duration || 300,
            thumb: v.thumb || `https://img.youtube.com/vi/${v.videoId || 'dQw4w9WgXcQ'}/mqdefault.jpg`
        }));

        const startIdx = (weekId * 2) % ESL_GAMES.length;
        const selectedGames = [];
        for(let i=0; i<3; i++) selectedGames.push(ESL_GAMES[(startIdx + i) % ESL_GAMES.length]);

        const content = `export default {
  weekId: ${weekId},
  title: "${task.note || 'Daily Watch'}",
  videos: ${JSON.stringify(processedVideos, null, 2)},
  bonus_games: ${JSON.stringify(selectedGames, null, 2)}
};`;
        fs.writeFileSync(weekFile, content);
        console.log(`   ✅ Week ${weekId} updated.`);
    }
}
main();
