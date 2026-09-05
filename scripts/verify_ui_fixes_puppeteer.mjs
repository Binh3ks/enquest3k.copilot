import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:5173';
const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb';
const LOCAL_DIR = path.resolve('public/screenshots/w33');

[ARTIFACT_DIR, LOCAL_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const SCREENS_TO_VERIFY = [
  {
    id: 'boss_listening_verified',
    url: '/week/33/task/boss_listening',
    name: 'Boss Listening (Part 1 SVGLineMatcher - Zero Black Borders)'
  },
  {
    id: 'gear3_retell_verified',
    url: '/week/33/task/gear3_retell',
    name: 'Story Retell (Side-by-side 2-Column Layout like Story Writer)'
  },
  {
    id: 'science_lab_idle_verified',
    url: '/week/33/task/science_lab',
    name: 'Action Lab (Idle state - No duplicate Back to Map button in center)'
  },
  {
    id: 'word_blitz_verified',
    url: '/week/33/task/word_blitz',
    name: 'Speed Match / Word Blitz (Wide Full-Screen Arena)'
  },
  {
    id: 'story_writer_verified',
    url: '/week/33/task/story_writer',
    name: 'Story Writer (Zero Scroll - Next Scene visible above fold)'
  }
];

async function runVerification() {
  console.log('🚀 Starting Puppeteer Verification at 1440x900 (Laptop 100% Zoom)...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1440,900',
      '--use-fake-ui-for-media-stream'
    ],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  
  // Set localStorage user so that quests don't get blocked and onboarding doesn't popup
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    try {
      localStorage.setItem('engquest_onboarded', 'true');
      localStorage.setItem('arcade_owner_bypass', 'true');
      localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
      const userState = {
        state: {
          currentUser: { id: 'test_user', name: 'Bình', displayName: 'Bình', role: 'owner' },
          userXP: 550,
          completedQuests: { w33: { gear1_webtoon: true, science_lab: true, boss_listening: true } }
        },
        version: 0
      };
      localStorage.setItem('engquest_user_store', JSON.stringify(userState));
    } catch (e) {}
  });

  for (const screen of SCREENS_TO_VERIFY) {
    console.log(`📸 Capturing: ${screen.name} at ${screen.url}...`);
    try {
      await page.goto(`${BASE_URL}${screen.url}`, { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(r => setTimeout(r, 2000));

      const artifactPath = path.join(ARTIFACT_DIR, `${screen.id}.png`);
      const localPath = path.join(LOCAL_DIR, `${screen.id}.png`);

      await page.screenshot({ path: artifactPath, fullPage: false });
      await page.screenshot({ path: localPath, fullPage: false });

      console.log(`✅ Saved screenshot to: ${artifactPath}`);
    } catch (err) {
      console.error(`❌ Failed capturing ${screen.id}:`, err.message);
    }
  }

  await browser.close();
  console.log('✨ Verification screenshots complete!');
}

runVerification().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
