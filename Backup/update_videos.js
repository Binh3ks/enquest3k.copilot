import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const ROOT_DIR = path.resolve(path.dirname(__filename), '..');
const TASKS_FILE = path.join(ROOT_DIR, 'src/data/video_tasks.json');
const API_KEY = process.env.YOUTUBE_API_KEY || ""; 

const WHITELIST = [
  "English Singsing", "Super Simple Songs", "British Council", "WOW English", 
  "Dream English", "Numberblocks", "SciShow Kids", "Nat Geo Kids", 
  "Smile and Learn", "Homeschool Pop", "Storyline Online", "Peppa Pig", 
  "Cocomelon", "Little Baby Bum", "Dr Binocs", "Happy Learning", "Jack Hartmann"
];
const SAFE_BACKUP = { id: "L_30T6y3b4c", title: "Peppa Pig - Safe Fallback", duration: "05:00", sim_duration: 300 };

const getDetails = (id) => new Promise((resolve) => {
  if (!API_KEY || !id) return resolve(null);
  https.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${API_KEY}`, (res) => {
    let d = ''; res.on('data', c=>d+=c);
    res.on('end', () => { try { const j=JSON.parse(d); resolve(j.items?.length ? parseDuration(j.items[0].contentDetails.duration) : null); } catch { resolve(null); } });
  });
});

const parseDuration = (iso) => {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const h=parseInt(match[1]||0), m=parseInt(match[2]||0), s=parseInt(match[3]||0);
  return { duration: `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`, sim_duration: h*3600+m*60+s };
};

const search = (q) => new Promise((resolve) => {
  if(!API_KEY) return resolve(null);
  https.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q + " for kids")}&type=video&safeSearch=strict&maxResults=20&videoEmbeddable=true&key=${API_KEY}`, (res) => {
    let d=''; res.on('data', c=>d+=c);
    res.on('end', () => {
      try {
        const j=JSON.parse(d);
        if(!j.items) return resolve(null);
        let match = j.items.find(i => WHITELIST.some(w => i.snippet.channelTitle.toLowerCase().includes(w.toLowerCase())));
        if(!match) match = j.items.find(i => !/spanish|russ|arab|hindi/i.test(i.snippet.title));
        resolve(match ? { id: match.id.videoId, title: match.snippet.title } : null);
      } catch { resolve(null); }
    });
  });
});

const update = async (weekId, tasks) => {
  console.log(`\n📺 Updating Week ${weekId}...`);
  const outPath = path.join(ROOT_DIR, `src/data/weeks/week_${weekId}/daily_watch.js`);
  if(!fs.existsSync(path.dirname(outPath))) fs.mkdirSync(path.dirname(outPath), {recursive:true});
  
  let lines = [];
  for(let i=0; i<tasks.length; i++) {
    const t = tasks[i];
    let vid = await search(t.query);
    if(!vid && t.backup_query) vid = await search(t.backup_query);
    
    let final = vid || SAFE_BACKUP;
    let det = await getDetails(final.id);
    let dur = det ? det.duration : "05:00";
    let sim = det ? det.sim_duration : 300;
    
    console.log(`   ✅ [${i+1}] ${final.title.substring(0,40)}... (${dur})`);
    lines.push(`    { id: ${i+1}, title: "${final.title.replace(/"/g,"'")}", videoId: "${final.id}", duration: "${dur}", sim_duration: ${sim}, thumb: "https://img.youtube.com/vi/${final.id}/mqdefault.jpg" }`);
  }
  
  const content = `export default {\n  videos: [\n${lines.join(',\n')}\n  ],\n  bonus_games: [{title: "Game", url: "#", description: "Review"}]\n};`;
  fs.writeFileSync(outPath, content);
  
  const easyPath = path.join(ROOT_DIR, `src/data/weeks_easy/week_${weekId}/daily_watch.js`);
  if(!fs.existsSync(path.dirname(easyPath))) fs.mkdirSync(path.dirname(easyPath), {recursive:true});
  fs.writeFileSync(easyPath, content);
  console.log("✅ Synced Advanced & Easy.");
};

const main = async () => {
  const args = process.argv.slice(2);
  const target = args[0] ? parseInt(args[0]) : null;
  if(!fs.existsSync(TASKS_FILE)) return;
  const tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf-8'));
  for(const t of tasks) {
    if(target && t.weekId !== target) continue;
    await update(t.weekId, t.videos);
  }
};
main();
