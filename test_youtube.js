import https from 'https';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const keyFilePath = path.join(ROOT_DIR, 'API keys.txt');
let API_KEY = '';

if (fs.existsSync(keyFilePath)) {
  const content = fs.readFileSync(keyFilePath, 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes('Youtube Data API')) {
      const match = line.match(/AIzaSy[a-zA-Z0-9_-]+/);
      if (match) {
        API_KEY = match[0];
        break;
      }
    }
  }
}

console.log(`API Key: ${API_KEY.substring(0, 20)}...`);

const test Query = 'weather song kids';
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(testQuery)}&type=video&maxResults=5&key=${API_KEY}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.error)      if (json.error)      if (json.error)      if (json.error)      if (jsonog('Code:', json.error.code);      i} else if (json.items && json.items.leng      if (json.error)      if `\      if (json.error)      if (json.error)      if (jso{t      if (json.e         if (json.error)      ifEach(      if (json.error)      if (json.error)      if (jsni      if (json.error)      if (e.log(     hannel: ${item.snippet.ch      if (json.error)      if (json.err  ID:       if (json.error)      if (json.error)    se {
                      n�           esults found');
              catch (e) {
      console.log('\n❌ Parse error:', e.message);
      console.log('Response:', data.substring(0, 500));
    }
  });
}).on('error', (e) => {
  console.log('\n❌ Request error:', e.message);
});
