import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:5173';
const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900', '--use-fake-ui-for-media-stream'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
    localStorage.setItem('engquest_user_store', JSON.stringify({
      state: {
        currentUser: { id: 'test', name: 'Bình', displayName: 'Bình', role: 'owner' },
        userXP: 550,
        completedQuests: { w33: { gear1_webtoon: true, science_lab: true, boss_listening: true } }
      },
      version: 0
    }));
  });

  // 1. Story Writer
  console.log('Capturing Story Writer...');
  await page.goto(`${BASE_URL}/week/33/task/story_writer`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'story_writer_verified.png') });

  // 2. Word Blitz Playing State
  console.log('Capturing Word Blitz Playing...');
  await page.goto(`${BASE_URL}/week/33/task/word_blitz`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));
  // Click START button
  const startBtn = await page.$('button');
  if (startBtn) {
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const s = btns.find(b => b.textContent.includes('START'));
      if (s) s.click();
    });
    await new Promise(r => setTimeout(r, 1000));
  }
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'word_blitz_playing_verified.png') });

  await browser.close();
  console.log('Done!');
}

run().catch(console.error);
