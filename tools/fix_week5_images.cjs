const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

async function gen(prompt, file) {
  const fullPath = path.join('public/images', file);
  process.stdout.write(`🎨 ${file}... `);
  
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      contents: [{ parts: [{ text: prompt }] }], 
      generationConfig: { temperature: 0.4, maxOutputTokens: 2048 } 
    })
  });
  
  const data = await res.json();
  const base64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64) {
    fs.writeFileSync(fullPath, Buffer.from(base64, 'base64'));
    console.log('✅');
  } else { 
    console.log('❌', data.candidates?.[0]?.finishReason || 'No data'); 
  }
  await new Promise(r => setTimeout(r, 3000));
}

(async () => {
  console.log('🔧 Fixing Week 5 Images\n');
  
  // Advanced wordpower
  await gen('cartoon illustration: person putting food into refrigerator, kids style', 'week5/wordpower_put_in_the_fridge.jpg');
  await gen('cartoon illustration: person turning on lamp with switch, kids style', 'week5/wordpower_turn_on_the_lamp.jpg');
  
  // Easy wordpower  
  await gen('cartoon illustration: child bedroom with bed and toys, kids style', 'week5_easy/wordpower_in_my_bedroom.jpg');
  await gen('cartoon illustration: child eating at dining table with family, kids style', 'week5_easy/wordpower_eat_at_the_table.jpg');
  
  // Covers (1024x1024 for consistency)
  await gen('The Mystery House storybook cover illustration, kids educational book, vibrant colors, 1024x1024', 'week5/explore_cover_w05.jpg');
  await gen('My House simple storybook cover illustration, kids educational book, bright and friendly, 1024x1024', 'week5_easy/explore_cover_w05.jpg');
  
  console.log('\n✅ Done!');
})();
