const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

async function gen(prompt, file) {
  const fullPath = path.join('public/images', file);
  if (fs.existsSync(fullPath)) { console.log(`⏭️  ${file} exists`); return; }
  
  process.stdout.write(`🎨 ${file}... `);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.4 } })
  });
  
  const data = await res.json();
  const base64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64) {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, Buffer.from(base64, 'base64'));
    console.log('✅');
  } else { console.log('❌'); }
  await new Promise(r => setTimeout(r, 3000));
}

(async () => {
  console.log('🍌 Generating remaining Week 5 images...\n');
  await gen('living room with sofa and TV, simple kids illustration, white background', 'week5_easy/living_room.jpg');
  await gen('cartoon illustration of person sitting on sofa, simple kids style', 'week5/wordpower_sit_on_the_sofa.jpg');
  await gen('cartoon illustration of opening refrigerator door, simple kids style', 'week5/wordpower_open_the_fridge.jpg');
  await gen('cartoon illustration of turning on lamp switch, simple kids style', 'week5/wordpower_turn_on_the_lamp.jpg');
  await gen('cartoon illustration of child going to bed, simple kids style', 'week5_easy/wordpower_go_to_bed.jpg');
  await gen('cartoon illustration of child sitting on chair, simple kids style', 'week5_easy/wordpower_sit_on_a_chair.jpg');
  await gen('cartoon illustration of family eating at table, simple kids style', 'week5_easy/wordpower_eat_at_the_table.jpg');
  await gen('The Mystery House storybook cover illustration, kids education style', 'week5/explore_cover_w05.jpg');
  await gen('My House simple storybook cover illustration, kids education style', 'week5_easy/explore_cover_w05.jpg');
  console.log('\n✅ All done!');
})();
