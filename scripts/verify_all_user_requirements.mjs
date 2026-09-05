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

async function runFullAudit() {
  console.log('🚀 Launching Chrome at 1440x900 (100% Zoom) for Comprehensive Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1440,900',
      '--use-fake-ui-for-media-stream',
      '--autoplay-policy=no-user-gesture-required'
    ],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  
  const networkRequests = [];
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
  page.on('request', req => {
    const url = req.url();
    if (url.includes('/audio/') || url.includes('speech') || url.includes('googleapis')) {
      networkRequests.push({ url, method: req.method() });
    }
  });

  // Setup localStorage
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
    const userState = {
      state: {
        currentUser: { id: 'test_user', name: 'Bình', displayName: 'Bình', role: 'owner' },
        userXP: 800,
        completedQuests: { w33: {} }
      },
      version: 0
    };
    localStorage.setItem('engquest_user_store', JSON.stringify(userState));
  });

  const report = {};

  // 1. INFO EXCHANGE AUDIT
  console.log('\n--- 1. Testing Info Exchange (/week/33/task/info_exchange) ---');
  await page.goto(`${BASE_URL}/week/33/task/info_exchange`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Check Card 1 (Table B)
  const infoExchangeCard1Path = path.join(ARTIFACT_DIR, 'w33_info_exchange_card1.png');
  await page.screenshot({ path: infoExchangeCard1Path });
  const infoExchangeCard1Text = await page.evaluate(() => document.body.innerText);

  // Click Play Question button or audio trigger
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const playBtn = btns.find(b => b.querySelector('svg.lucide-volume-2') || b.querySelector('svg.lucide-play-circle') || b.textContent.includes('Listen'));
    if (playBtn) playBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  // Answer or advance to Card 2 if possible
  const hasNextCard = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find(b => b.textContent.includes('Card 2') || b.textContent.includes('Ask Examiner') || b.querySelector('svg.lucide-arrow-right'));
    if (nextBtn) {
      nextBtn.click();
      return true;
    }
    return false;
  });
  let infoExchangeCard2Text = '';
  if (hasNextCard) {
    await new Promise(r => setTimeout(r, 1500));
    const infoExchangeCard2Path = path.join(ARTIFACT_DIR, 'w33_info_exchange_card2.png');
    await page.screenshot({ path: infoExchangeCard2Path });
    infoExchangeCard2Text = await page.evaluate(() => document.body.innerText);
  }

  // Check progress in localStorage for info_exchange
  const infoExchangeProgress = await page.evaluate(() => {
    const daily = JSON.parse(localStorage.getItem('daily-quest-storage') || '{}');
    const user = JSON.parse(localStorage.getItem('engquest_user_store') || '{}');
    return {
      dailyCompleted: daily?.state?.completedQuests?.['w33']?.['info_exchange'] || false,
      userCompleted: user?.state?.completedQuests?.['w33']?.['info_exchange'] || false
    };
  });

  report.info_exchange = {
    card1TextSnippet: infoExchangeCard1Text.slice(0, 300),
    progress: infoExchangeProgress,
    card1Screenshot: infoExchangeCard1Path
  };

  // 2. FACT FINDER (CLIL Explorer) AUDIT
  console.log('\n--- 2. Testing Fact Finder / CLIL Explorer (/week/33/task/gear4_clil) ---');
  await page.goto(`${BASE_URL}/week/33/task/gear4_clil`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const clilScreenshotPath = path.join(ARTIFACT_DIR, 'w33_fact_finder_clil.png');
  await page.screenshot({ path: clilScreenshotPath });
  const clilDOM = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    const hasDictChip = bodyText.includes('Click term for dictionary') || bodyText.includes('dictionary');
    return {
      hasDictChip,
      bodySnippet: bodyText.slice(0, 400)
    };
  });
  report.clil = {
    hasDictChip: clilDOM.hasDictChip,
    screenshot: clilScreenshotPath
  };

  // 3. BOSS LISTENING PART 1 & PART 2 AUDIT
  console.log('\n--- 3. Testing Boss Listening Part 1 & Part 2 (/week/33/task/boss_listening) ---');
  await page.goto(`${BASE_URL}/week/33/task/boss_listening`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // Check Part 1 Zero Scroll at 1440x900
  const p1Metrics = await page.evaluate(() => {
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const btns = Array.from(document.querySelectorAll('button'));
    const checkBtn = btns.find(b => b.textContent.includes('Check') || b.textContent.includes('CHECK') || b.dataset.testid?.includes('check'));
    const btnRect = checkBtn ? checkBtn.getBoundingClientRect() : null;
    return {
      docHeight,
      winHeight,
      hasVerticalOverflow: docHeight > winHeight + 10,
      btnAboveFold: btnRect ? (btnRect.bottom <= winHeight) : 'not_found'
    };
  });
  const p1ScreenshotPath = path.join(ARTIFACT_DIR, 'w33_boss_listening_part1.png');
  await page.screenshot({ path: p1ScreenshotPath });

  // Click Part 2 Tab
  const clickedP2 = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p2Tab = btns.find(b => b.dataset.testid === 'boss-part-tab-list_p2' || b.textContent.includes('L2') || b.textContent.includes('Part 2'));
    if (p2Tab) {
      p2Tab.click();
      return true;
    }
    return false;
  });
  let p2Metrics = null;
  let p2ScreenshotPath = '';
  if (clickedP2) {
    await new Promise(r => setTimeout(r, 1500));
    p2ScreenshotPath = path.join(ARTIFACT_DIR, 'w33_boss_listening_part2.png');
    await page.screenshot({ path: p2ScreenshotPath });
    p2Metrics = await page.evaluate(() => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const btns = Array.from(document.querySelectorAll('button'));
      const checkBtn = btns.find(b => b.textContent.includes('Check') || b.textContent.includes('CHECK'));
      const btnRect = checkBtn ? checkBtn.getBoundingClientRect() : null;
      return {
        docHeight,
        winHeight,
        hasVerticalOverflow: docHeight > winHeight + 10,
        btnAboveFold: btnRect ? (btnRect.bottom <= winHeight) : 'not_found'
      };
    });
  }
  report.boss_listening = {
    p1Metrics,
    p1Screenshot: p1ScreenshotPath,
    p2Metrics,
    p2Screenshot: p2ScreenshotPath
  };

  // 4. SCENE EXPLORER AUDIT
  console.log('\n--- 4. Testing Scene Explorer (/week/33/task/gear1_webtoon) ---');
  await page.goto(`${BASE_URL}/week/33/task/gear1_webtoon`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const sceneExplorerScreenshotPath = path.join(ARTIFACT_DIR, 'w33_scene_explorer.png');
  await page.screenshot({ path: sceneExplorerScreenshotPath });
  const sceneExplorerMetrics = await page.evaluate(() => {
    const img = document.querySelector('img[alt*="Scene"], img[src*="read_"], img');
    return {
      imgFound: !!img,
      imgSrc: img ? img.src : null,
      width: img ? img.clientWidth : 0,
      height: img ? img.clientHeight : 0
    };
  });
  report.scene_explorer = {
    metrics: sceneExplorerMetrics,
    screenshot: sceneExplorerScreenshotPath
  };

  // 5. STORY RETELL AUDIT
  console.log('\n--- 5. Testing Story Retell (/week/33/task/gear3_retell) ---');
  await page.goto(`${BASE_URL}/week/33/task/gear3_retell`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const storyRetellScreenshotPath = path.join(ARTIFACT_DIR, 'w33_story_retell.png');
  await page.screenshot({ path: storyRetellScreenshotPath });
  const storyRetellMetrics = await page.evaluate(() => {
    const img = document.querySelector('img[alt*="Retell"], img[alt*="Scene"], img[src*="read_"], img');
    const isImgVisible = img && img.clientWidth > 100 && img.clientHeight > 100;
    return {
      imgFound: !!img,
      imgSrc: img ? img.src : null,
      imgVisible: isImgVisible,
      width: img ? img.clientWidth : 0,
      height: img ? img.clientHeight : 0
    };
  });
  report.story_retell = {
    metrics: storyRetellMetrics,
    screenshot: storyRetellScreenshotPath
  };

  // 6. ACTION LAB AUDIT
  console.log('\n--- 6. Testing Action Lab (/week/33/task/science_lab) ---');
  await page.goto(`${BASE_URL}/week/33/task/science_lab`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Click START button to enter active lab playing state
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find(b => b.textContent.includes('START') || b.textContent.includes('REPLAY LAB'));
    if (startBtn) startBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  const actionLabScreenshotPath = path.join(ARTIFACT_DIR, 'w33_action_lab.png');
  await page.screenshot({ path: actionLabScreenshotPath });
  const actionLabMetrics = await page.evaluate(() => {
    const img = document.querySelector('img[alt*="Scenario"], img[alt*="Stage"], img[alt*="Science"], img[src*="action_lab"], img[src*="scenes"]');
    const duplicateBackButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Return to Map')).length;
    const dropzones = Array.from(document.querySelectorAll('[data-testid*="dropzone"], [class*="DropZone"], [class*="border-dashed"]'));
    return {
      imgFound: !!img,
      imgSrc: img ? img.src : null,
      width: img ? img.clientWidth : 0,
      height: img ? img.clientHeight : 0,
      dropzonesCount: dropzones.length,
      duplicateBackButtons
    };
  });
  report.action_lab = {
    metrics: actionLabMetrics,
    screenshot: actionLabScreenshotPath
  };

  // 7. DISCOVERY REPORT AUDIT
  console.log('\n--- 7. Testing Discovery Report (/week/33/task/science_report) ---');
  await page.goto(`${BASE_URL}/week/33/task/science_report`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Step 1 Screenshot (Diagram)
  const reportStep1ScreenshotPath = path.join(ARTIFACT_DIR, 'w33_discovery_report_step1.png');
  await page.screenshot({ path: reportStep1ScreenshotPath });

  // Progress through steps to capture Step 4 with QuickWrite
  // Step 1: Click hotspot
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const hs = btns.find(b => b.title?.includes('Wet Floor') || b.textContent.includes('💧') || b.textContent.includes('Wet'));
    if (hs) hs.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Step 1 -> Step 2
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find(b => b.textContent.includes('Next: Pick Discovery Clue'));
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 2: Select clue
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const clueBtn = btns.find(b => b.textContent.includes('Low Surface Friction'));
    if (clueBtn) clueBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 2 -> Step 3
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find(b => b.textContent.includes('Next: Snap Sentence'));
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 3: Click word pills in correct order
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p1 = btns.find(b => b.textContent.includes('Water on the smooth corridor tiles'));
    if (p1) p1.click();
  });
  await new Promise(r => setTimeout(r, 300));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p2 = btns.find(b => b.textContent.includes('greatly reduced surface friction'));
    if (p2) p2.click();
  });
  await new Promise(r => setTimeout(r, 300));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p3 = btns.find(b => b.textContent.includes('so Tom slipped while running in a hurry'));
    if (p3) p3.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 3 -> Step 4
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find(b => b.textContent.includes('View Official Report'));
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  const reportStep4ScreenshotPath = path.join(ARTIFACT_DIR, 'w33_discovery_report_step4.png');
  await page.screenshot({ path: reportStep4ScreenshotPath });

  const step4DOM = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasVietnamese = /[\u00C0-\u1EF9]/.test(text.slice(text.indexOf('Deep Inquiry Challenge')));
    const hasQuickWrite = text.includes('Write a 15–25 word');
    const hasPills = text.includes('Friction provides grip') && text.includes('Water reduces friction');
    return {
      hasVietnamese,
      hasQuickWrite,
      hasPills,
      snippet: text.slice(text.indexOf('Deep Inquiry Challenge'), text.indexOf('Deep Inquiry Challenge') + 350)
    };
  });

  report.discovery_report = {
    step1Screenshot: reportStep1ScreenshotPath,
    step4Screenshot: reportStep4ScreenshotPath,
    step4DOM
  };

  // Check audio requests recorded
  report.audioCalls = {
    totalRecorded: networkRequests.length,
    ttsDirectRequests: networkRequests.filter(r => r.url.includes('texttospeech') || r.url.includes('synthesize')),
    mp3Requests: networkRequests.filter(r => r.url.includes('.mp3')).slice(0, 20)
  };

  await browser.close();
  console.log('\n=== AUDIT COMPLETE ===');
  console.log(JSON.stringify(report, null, 2));

  fs.writeFileSync(path.join(ARTIFACT_DIR, 'audit_report.json'), JSON.stringify(report, null, 2));
}

runFullAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
