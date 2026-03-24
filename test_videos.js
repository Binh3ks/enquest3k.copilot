const videoIds = {
  W17: ["P9abGg_gF1s", "O7KZ-SM5f9M", "XcW9Ct000yY", "rD6FRDd9Hew", "C8HUWW3jpEo"],
  W18: ["dcfxyH7CNQQ", "N-bIHYM9M38", "xVPx9FsN3ww", "4c6FyuetSVo", "UUmuVqKo_Yk"]
};

const https = require('https');

async function checkVideo(id) {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/watch?v=${id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const isAvailable = !data.includes('This video is unavailable') && !data.includes('Video unavailable');
        console.log(`${id}: ${isAvailable ? '✅ OK' : '❌ DEAD'}`);
        resolve(isAvailable);
      });
    }).on('error', () => {
      console.log(`${id}: ❌ ERROR`);
      resolve(false);
    });
  });
}

(async () => {
  console.log('\n=== W17 Videos ===');
  for (const id of videoIds.W17) await checkVideo(id);
  console.log('\n=== W18 Videos ===');
  for (const id of videoIds.W18) await checkVideo(id);
})();
