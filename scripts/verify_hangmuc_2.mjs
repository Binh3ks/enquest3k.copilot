import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots';
const BASE = 'http://localhost:5173';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1024, height: 768 });

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

// Reset test user state
await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem('engquest_onboarded', 'true');
  localStorage.removeItem('arcade_owner_bypass');
  const rawChron = localStorage.getItem('engquest_chronicles_default') || '{}';
  const parsedChron = JSON.parse(rawChron) || {};
  parsedChron.collectiblesFound = parsedChron.collectiblesFound || {};
  delete parsedChron.collectiblesFound['w33_secret_vault_5'];
  delete parsedChron.collectiblesFound['w33_secret_room_6'];
  parsedChron.lexioCoins = 10; // Start with 10 coins
  localStorage.setItem('engquest_chronicles_default', JSON.stringify(parsedChron));
});

console.log('\n=== TEST HẠNG MỤC 2: Secret Chamber (Door 5: Mystery Vault) Unclaimed ===');
await page.goto(`${BASE}/week/33/chronicles?room=5`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

const snap1 = path.join(OUT_DIR, 'hangmuc2_01_mystery_vault_unopened.png');
await page.screenshot({ path: snap1, fullPage: true });
console.log(`📸 Screenshot saved: ${snap1}`);

const stateBefore = await page.evaluate(() => {
  return {
    title: document.querySelector('h1')?.innerText,
    speech: document.querySelector('.secret-chamber-screen')?.innerText,
  };
});
console.log('Chamber State (Unclaimed):', stateBefore.title);

console.log('\n=== TEST HẠNG MỤC 2: Click Open Secret Chest Button via UI ===');
// Click the real button on UI
await page.click('.secret-open-chest-btn');
await new Promise(r => setTimeout(r, 1200));

const snap2 = path.join(OUT_DIR, 'hangmuc2_02_mystery_vault_claimed.png');
await page.screenshot({ path: snap2, fullPage: true });
console.log(`📸 Screenshot saved: ${snap2}`);

const stateAfter = await page.evaluate(() => {
  const coinsText = document.querySelector('.secret-chamber-screen')?.innerText;
  return { coinsText };
});
console.log('Chamber Text After Claiming:\n', stateAfter.coinsText.substring(0, 300));

console.log('\n=== TEST HẠNG MỤC 2: Click Return to Citadel ===');
await page.click('.secret-return-btn');
await new Promise(r => setTimeout(r, 2000));

const snap3 = path.join(OUT_DIR, 'hangmuc2_03_return_to_citadel.png');
await page.screenshot({ path: snap3, fullPage: true });
console.log(`📸 Screenshot saved: ${snap3}`);

console.log('\nConsole Errors:', errors);
await browser.close();
console.log('✅ Hạng mục 2 verification complete!');
