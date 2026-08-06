#!/usr/bin/env node
require('dotenv/config');
const https = require('https');

const API_KEY = process.env.YOUTUBE_API_KEY;
const queries = [
  'first next then finally sequence words kids English',
  'sequencing words first next then finally ESL children',
  'first next then last sequence connectors kids lesson',
  'how to make sandwich first next then finally English kids'
];

async function search(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    type: 'video',
    videoDuration: 'short',
    maxResults: '5',
    part: 'snippet',
    relevanceLanguage: 'en'
  });
  return new Promise((resolve, reject) => {
    https.get('https://www.googleapis.com/youtube/v3/search?' + params, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

(async () => {
  const seen = new Set();
  for (const q of queries) {
    const res = await search(q);
    if (res.items) {
      for (const item of res.items) {
        const vid = item.id.videoId;
        if (vid && !seen.has(vid)) {
          seen.add(vid);
          const title = item.snippet.title;
          const desc = (item.snippet.description || '').substring(0, 80);
          console.log(vid + ' | ' + title + ' | ' + desc);
        }
      }
    }
  }
})();
