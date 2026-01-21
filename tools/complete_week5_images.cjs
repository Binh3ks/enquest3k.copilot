const fs = require('fs');
require('dotenv').config();
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`;

async function gen(prompt, file) {
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
    fs.writeFileSync('public/images/' + file, Buffer.from(base64, 'base64'));
    console.log('✅');
  } else { console.log('❌', data.candidates?.[0]?.finishReason || 'No data'); }
  await new Promise(r => setTimeout(r, 3000));
}

(async () => {
  console.log('🔧 Creating missing Week 5 images\n');
  
  // Advanced - downstairs vocab
  await gen('cartoon illustration: stairs going down, kids educational style, white background', 'week5/downstairs.jpg');
  
  // Easy - explore my house wordpower
  await gen('cartoon illustration: child exploring different rooms of a house, kids educational style', 'week5_easy/wordpower_explore_my_house.jpg');
  
  // Easy - read cover (1024x1024 to match Advanced)
  console.log('\n📐 Recreating Easy read cover with correct size...');
  await gen('My House simple storybook cover illustration for children, educational book style, bright and friendly, 1024x1024 square format', 'week5_easy/read_cover_w05.jpg');
  
  console.log('\n✅ All done! Final counts:');
  console.log('  Advanced:', fs.readdirSync('public/images/week5').length);
  console.log('  Easy:', fs.readdirSync('public/images/week5_easy').length);
})();
