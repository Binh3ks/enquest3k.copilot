import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:5173';
const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb';

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function run() {
  console.log('🚀 Launching Chrome to capture verification screenshots...');
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

  // Set up teacher/owner user session in localStorage so all quests are unlocked
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const user = {
      id: 'tester_owner_01',
      name: 'Bình Teacher',
      role: 'owner',
      grade: 4,
      xp: 1250,
      streak: 7
    };
    localStorage.setItem('engquest_user', JSON.stringify(user));
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    // Clear daily reviewed flag so SRS modal triggers on task load
    localStorage.removeItem('engquest3k_srs_daily_reviewed');
  });

  // ── TEST 1: SRS Daily Warm-up Modal (W01-W32 Syllabus Vocab & Modes) ──
  console.log('📸 1. Capturing SRS Daily Warm-up Modal...');
  await page.goto(`${BASE_URL}/week/33/task/gear1_webtoon`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'srs_daily_mode_flip.png') });
  console.log('   Saved srs_daily_mode_flip.png');

  // Switch to Mode 2: Nối từ (Match Blitz)
  const matchBtn = await page.$('button[title*="Nối"]');
  if (matchBtn) {
    await matchBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'srs_daily_mode_match.png') });
    console.log('   Saved srs_daily_mode_match.png');
  }

  // Switch to Mode 3: Trắc nghiệm (Speed Quiz)
  const quizBtn = await page.$('button[title*="Chọn Nhanh"]');
  if (quizBtn) {
    await quizBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'srs_daily_mode_quiz.png') });
    console.log('   Saved srs_daily_mode_quiz.png');
  }

  // Close SRS modal to continue with task checks
  const skipBtn = await page.$('.srs-skip-btn');
  if (skipBtn) {
    await skipBtn.click();
    await new Promise(r => setTimeout(r, 1000));
  }
  // Ensure daily flag is set for remainder of tests
  await page.evaluate(() => {
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });

  // ── TEST 2: Listening Part 1 (SVGLineMatcher Layout & Docks) ──
  console.log('📸 2. Capturing Listening Part 1 (SVGLineMatcher)...');
  await page.goto(`${BASE_URL}/week/33/task/boss_listening`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'listening_part1_docks_verified.png') });
  console.log('   Saved listening_part1_docks_verified.png');

  // ── TEST 3: Listening Part 2 (NotepadNoteCompleter Layout) ──
  console.log('📸 3. Capturing Listening Part 2 (NotepadNoteCompleter)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p2Btn = btns.find(b => b.textContent.includes('Note Completion') || b.textContent.includes('L2'));
    if (p2Btn) p2Btn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'listening_part2_harmonized.png') });
  console.log('   Saved listening_part2_harmonized.png');

  // ── TEST 4: Quick Write Scaffolding in Science Discovery Report ──
  console.log('📸 4. Capturing Quick Write in Science Report...');
  await page.goto(`${BASE_URL}/week/33/task/science_report`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));
  // Scroll down to Quick Write section
  await page.evaluate(() => {
    const qw = document.querySelector('.qw-container');
    if (qw) qw.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'quick_write_rich_scaffolding.png') });
  console.log('   Saved quick_write_rich_scaffolding.png');

  // Toggle model sentence
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const modelBtn = btns.find(b => b.textContent.includes('câu hoàn chỉnh'));
    if (modelBtn) modelBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'quick_write_model_exemplar.png') });
  console.log('   Saved quick_write_model_exemplar.png');

  // ── TEST 5: Info Exchange Card 2 (Model Cue 1) ──
  console.log('📸 5. Capturing Info Exchange Card 2 Cue 1...');
  await page.goto(`${BASE_URL}/week/33/task/info_exchange`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));
  // Switch to Card 2 if on Phase 1
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const card2 = btns.find(b => b.textContent.includes('Card 2'));
    if (card2) card2.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'info_exchange_card2_cue1.png') });
  console.log('   Saved info_exchange_card2_cue1.png');

  await browser.close();
  console.log('🎉 All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
