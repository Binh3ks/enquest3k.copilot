import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../src/data/video_tasks.json');
const ADV_DIR = path.join(__dirname, '../src/data/weeks');
const EASY_DIR = path.join(__dirname, '../src/data/weeks_easy');

const ESL_GAMES = [
    { title: "Sentence Monkey", url: "https://www.eslgamesplus.com/sentence-monkey/", description: "Help the monkey build sentences!" },
    { title: "Fast English", url: "https://www.gamestolearnenglish.com/fast-english/", description: "Match words with pictures fast!" },
    { title: "Questions Game", url: "https://www.gamestolearnenglish.com/questions/", description: "Practice asking & answering." },
    { title: "Word Shake", url: "https://learnenglishkids.britishcouncil.org/games/wordshake", description: "Create words from letters." },
    { title: "Tongue Twisters", url: "https://learnenglishkids.britishcouncil.org/fun-games/tongue-twisters", description: "Twist your tongue & speak!" }
];

function processVideos(task) {
    return task.videos.map(v => ({
        id: v.id,
        category: v.category || "WATCH",
        videoId: v.videoId || "dQw4w9WgXcQ",
        title: v.title || v.query,
        duration: v.duration || "5:00",
        sim_duration: v.sim_duration || 300,
        thumb: v.thumb || `https://img.youtube.com/vi/${v.videoId || 'dQw4w9WgXcQ'}/mqdefault.jpg`
    }));
}

function selectBonusGames(weekNum) {
    const startIdx = (weekNum * 2) % ESL_GAMES.length;
    return Array.from({ length: 3 }, (_, i) => ESL_GAMES[(startIdx + i) % ESL_GAMES.length]);
}

async function main() {
    console.log("   --- UPDATING VIDEO DATA ---");
    if (!fs.existsSync(DATA_FILE)) { console.error("Config not found!"); process.exit(1); }

    const args = process.argv.slice(2);
    const forceOverwrite = args.includes('--force');
    const targetWeek = args.find(a => /^\d+$/.test(a)) || null;

    const tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    for (const task of tasks) {
        const weekId = task.weekId;
        const isEasy = String(weekId).endsWith('_easy');
        const baseNum = isEasy ? parseInt(String(weekId).replace('_easy', '')) : parseInt(weekId);

        if (targetWeek && baseNum !== parseInt(targetWeek)) continue;

        const targetDir = isEasy ? EASY_DIR : ADV_DIR;
        const weekFolder = `week_${String(baseNum).padStart(2, '0')}`;
        const weekFile = path.join(targetDir, weekFolder, 'daily_watch.js');

        if (fs.existsSync(weekFile) && !forceOverwrite) {
            // Check if file already has real video IDs (not dQw4w9WgXcQ fallback)
            const content = fs.readFileSync(weekFile, 'utf8');
            const hasRealIds = content.includes('videoId:') && !content.includes('dQw4w9WgXcQ');
            if (hasRealIds) {
                console.log(`   ⏭️  Week ${weekId} SKIP: already has real video IDs`);
                continue;
            }
        }

        if (!fs.existsSync(path.dirname(weekFile))) {
            fs.mkdirSync(path.dirname(weekFile), { recursive: true });
        }

        const processedVideos = processVideos(task);
        const selectedGames = selectBonusGames(baseNum);

        const content = `export default {
  weekId: ${baseNum},
  title: "${task.note || 'Daily Watch'}",
  videos: ${JSON.stringify(processedVideos, null, 2)},
  bonus_games: ${JSON.stringify(selectedGames, null, 2)}
};`;
        fs.writeFileSync(weekFile, content);
        console.log(`   ✅ Week ${weekId} (${isEasy ? 'Easy' : 'ADV'}) updated → ${weekFile}`);
    }
}
main();
