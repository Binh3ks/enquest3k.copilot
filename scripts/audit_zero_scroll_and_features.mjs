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

const SCREENS = [
  { id: 'audit_gear1_webtoon', url: '/week/33/task/gear1_webtoon', name: 'Scene Explorer (Zero-Scroll & Enlarged Text)' },
  { id: 'audit_gear2_dictation', url: '/week/33/task/gear2_karaoke', name: 'Voice Shadow (Dictation Notepad with Nurse Sarah & Tom Audio)' },
  { id: 'audit_gear3_retell', url: '/week/33/task/gear3_retell', name: 'Story Retell (2-Column Side-by-Side Zero-Scroll)' },
  { id: 'audit_science_lab', url: '/week/33/task/science_lab', name: 'Action Lab (3 Scenarios & No Center Duplicate Button)' },
  { id: 'audit_science_report', url: '/week/33/task/science_report', name: 'Discovery Report (Observe Image Capped Height)' },
  { id: 'audit_word_blitz', url: '/week/33/task/word_blitz', name: 'Speed Match (Week 33 Target Vocab Sets)' },
  { id: 'audit_sentence_smash', url: '/week/33/task/sentence_smash', name: 'Grammar Duel (No Spoiler Answer & Big Word Blocks)' },
  { id: 'audit_math_quest', url: '/week/33/task/math_quest', name: 'Math Quest (Singapore Bar Model & Large Typography)' },
  { id: 'audit_story_writer', url: '/week/33/task/story_writer', name: 'Story Writer (Flyers Part 7 Zero-Scroll)' },
  { id: 'audit_info_exchange', url: '/week/33/task/info_exchange', name: 'Info Exchange (Candidate & Examiner Console)' },
  { id: 'audit_boss_listening', url: '/week/33/task/boss_listening', name: 'Boss Listening Shield (No Black Borders Part 1)' },
  { id: 'audit_boss_reading', url: '/week/33/task/boss_reading', name: 'Boss Reading Shield (Zero-Scroll)' },
  { id: 'audit_weekly_review', url: '/week/33/task/weekly_review', name: 'Weekly Review Passport (Zero-Scroll)' }
];

async function runAudit() {
  console.log('🚀 Starting Full Audit for all requested screens at 1440x900 (100% Zoom)...');

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
  
  // Set up mock user in localStorage
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('currentUser', JSON.stringify({ id: 'tester_01', name: 'Alex', username: 'alex', grade: 4 }));
    localStorage.setItem('user-storage', JSON.stringify({
      state: {
        currentUser: { id: 'tester_01', name: 'Alex', username: 'alex', grade: 4 },
        userXP: 1250,
        userShields: 12
      },
      version: 0
    }));
  });

  const auditResults = [];

  for (const screen of SCREENS) {
    console.log(`\n🔍 Auditing ${screen.name} -> ${screen.url}...`);
    try {
      await page.goto(`${BASE_URL}${screen.url}`, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1200));

      // Extra interaction based on task type:
      if (screen.id === 'audit_gear2_dictation') {
        // Switch to Dictation Notepad
        const dictationBtn = await page.$('button ::-p-text(Dictation Notepad)');
        if (dictationBtn) {
          await dictationBtn.click();
          await new Promise(r => setTimeout(r, 800));
        }
      } else if (screen.id === 'audit_sentence_smash' || screen.id === 'audit_word_blitz' || screen.id === 'audit_math_quest' || screen.id === 'audit_science_lab') {
        // Click START button if idle
        const startBtn = await page.$('button ::-p-text(START)');
        if (startBtn) {
          await startBtn.click();
          await new Promise(r => setTimeout(r, 800));
        }
      }

      // Check vertical scroll height of body
      const metrics = await page.evaluate(() => {
        return {
          windowHeight: window.innerHeight,
          bodyScrollHeight: document.body.scrollHeight,
          documentHeight: document.documentElement.scrollHeight,
          hasVerticalScroll: document.documentElement.scrollHeight > window.innerHeight + 15
        };
      });

      // Capture screenshot
      const filename = `${screen.id}.png`;
      const artifactPath = path.join(ARTIFACT_DIR, filename);
      const localPath = path.join(LOCAL_DIR, filename);

      await page.screenshot({ path: artifactPath, fullPage: false });
      fs.copyFileSync(artifactPath, localPath);

      // Extract key DOM text evidence
      const domText = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.innerText.trim()).filter(Boolean);
        const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean).slice(0, 10);
        return { headings, buttons };
      });

      console.log(`  📸 Screenshot saved: ${artifactPath}`);
      console.log(`  📏 Scroll Height: ${metrics.documentHeight}px (Window: ${metrics.windowHeight}px) | Vertical Overflow: ${metrics.hasVerticalScroll ? 'YES' : 'NO'}`);
      console.log(`  🔤 Key Headings: ${JSON.stringify(domText.headings.slice(0, 3))}`);

      auditResults.push({
        id: screen.id,
        name: screen.name,
        url: screen.url,
        metrics,
        artifactPath,
        domText
      });

    } catch (err) {
      console.error(`❌ Error auditing ${screen.name}:`, err.message);
      auditResults.push({
        id: screen.id,
        name: screen.name,
        error: err.message
      });
    }
  }

  await browser.close();
  console.log('\n🏁 Audit Finished! Total screens verified:', auditResults.length);
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'audit_results.json'), JSON.stringify(auditResults, null, 2));
}

runAudit().catch(console.error);
