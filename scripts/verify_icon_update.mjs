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

await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem('engquest_onboarded', 'true');
  localStorage.removeItem('arcade_owner_bypass');
  const raw = localStorage.getItem('engquest-daily-quest') || '{}';
  const parsed = JSON.parse(raw) || { state: {} };
  parsed.state = parsed.state || {};
  parsed.state.completedQuests = parsed.state.completedQuests || {};
  parsed.state.completedQuests['w33'] = { gear1_webtoon: true };
  localStorage.setItem('engquest-daily-quest', JSON.stringify(parsed));

  // Reset room stars
  const rawChron = localStorage.getItem('engquest_chronicles_default') || '{}';
  const parsedChron = JSON.parse(rawChron) || {};
  if (parsedChron.roomStars) {
    delete parsedChron.roomStars['w33_d0'];
    localStorage.setItem('engquest_chronicles_default', JSON.stringify(parsedChron));
  }
});

await page.goto(`${BASE}/week/33/chronicles?room=0`, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise(r => setTimeout(r, 2000));

const snapPath = path.join(OUT_DIR, 'hangmuc1_03_daily_room_1_quest_key_icon.png');
await page.screenshot({ path: snapPath, fullPage: true });
console.log(`📸 Screenshot saved: ${snapPath}`);

const btnTexts = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.dr-door-enter-btn')).map(b => b.innerText);
});
console.log('Button Texts:', btnTexts);

await browser.close();
