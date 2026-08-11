import { chromium } from 'playwright';

async function testDOM() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set mock user session in localStorage
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('engquest_user', JSON.stringify({ id: 1, username: 'demo_student', name: 'Demo Student', role: 'student' }));
    localStorage.setItem('engquest_token', 'mock_token_123');
    localStorage.setItem('placement_result', JSON.stringify({ level: 'A2', recommendedWeek: 36 }));
  });

  console.log('🔍 Testing DOM elements on http://localhost:5173/week/36/explore...');
  await page.goto('http://localhost:5173/week/36/explore', { waitUntil: 'load' });
  await page.waitForTimeout(4000);

  const textInputs = await page.$$('input[type="text"]');
  const textareas = await page.$$('textarea');
  const buttons = await page.$$('button');
  const pageText = await page.innerText('body');

  console.log(`  └─ Count of <input type="text">: ${textInputs.length}`);
  console.log(`  └─ Count of <textarea>: ${textareas.length}`);
  console.log(`  └─ Count of <button>: ${buttons.length}`);
  console.log(`  └─ Contains "Multiple Choice Question": ${pageText.includes('Multiple Choice Question') || pageText.includes('Câu hỏi trắc nghiệm')}`);
  console.log(`  └─ Contains "Type your answer": ${pageText.includes('Type your answer')}`);
  console.log(`  └─ Contains "Son Doong Cave": ${pageText.includes('Son Doong Cave')}`);

  console.log('\n🔍 Testing DOM elements on http://localhost:5173/week/36/game_hub...');
  await page.goto('http://localhost:5173/week/36/game_hub', { waitUntil: 'load' });
  await page.waitForTimeout(4000);
  const ghText = await page.innerText('body');
  console.log(`  └─ Contains "Word Duel": ${ghText.includes('Word Duel')}`);
  console.log(`  └─ Contains "Not enough words": ${ghText.includes('Not enough words')}`);

  await browser.close();
}

testDOM().catch(err => {
  console.error('DOM test error:', err);
  process.exit(1);
});
