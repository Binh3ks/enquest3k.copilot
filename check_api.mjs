import https from 'https';
import fs from 'fs';

const keyFile = 'API keys.txt';
let API_KEY = '';

if (fs.existsSync(keyFile)) {
  const lines = fs.readFileSync(keyFile, 'utf8').split('\n');
  for (const line of lines) {
    if (line.includes('Youtube Data API')) {
      const m = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
      if (m) { API_KEY = m[0]; break; }
    }
  }
}

console.log('Testing YouTube API...');

const q = 'weather song kids';
https.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=3&key=${API_KEY}`, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const j = JSON.parse(d);
      if (j.error) {
        console.log(`\n❌ ERROR: ${j.error.message}`);
        console.log(`Code: ${j.error.code}`);
        if (j.error.errors) {
          j.error.errors.forEach(e => console.log(`- ${e.reason}: ${e.message}`));
        }
      } else if (j.items?.length) {
        console.log(`\n✅ FOUND ${j.items.length} results:\n`);
        j.items.forEach((v, i) => {
          console.log(`${i+1}. ${v.snippet.title}`);
          console.log(`   ${v.snippet.channelTitle} - ID: ${v.id.videoId}\n`);
        });
      } else {
        console.log('\n⚠️ No results');
      }
    } catch (e) {
      console.log('\n❌ Parse error:', e.message);
    }
  });
});
