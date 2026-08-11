import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/fd5de532-53a7-4fe0-b374-4b9b329dde4f';
const BASE_URL = 'http://localhost:5173';

async function runE2E() {
  console.log(`🚀 Starting E2E UI Inspection on ${BASE_URL} using system Google Chrome...`);
  
  let browser;
  try {
    browser = await chromium.launch({
      channel: 'chrome',
      headless: true
    });
  } catch (e1) {
    console.log('⚠️ Fallback to macOS default Chrome executable path...');
    const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if (fs.existsSync(chromePath)) {
      browser = await chromium.launch({
        executablePath: chromePath,
        headless: true
      });
    } else {
      throw new Error(`Google Chrome not found at ${chromePath}: ` + e1.message);
    }
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  // Inject Zustand session state using correct localStorage key
  await context.addInitScript(() => {
    localStorage.setItem('placement_result', JSON.stringify({ startWeek: 36 }));
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: {
        currentUser: { id: 1, username: 'owner', role: 'super_admin', plan: 'premium' },
        token: 'dev-token',
        learningMode: 'advanced'
      },
      version: 2
    }));
  });

  const page = await context.newPage();

  // Test 1: Grammar Station (Week 36)
  console.log('📸 Navigating to Grammar W36...');
  await page.goto(`${BASE_URL}/week/36/grammar`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const screenshotPathGrammar = path.join(ARTIFACTS_DIR, 'e2e_w36_grammar.png');
  await page.screenshot({ path: screenshotPathGrammar, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathGrammar}`);

  // Test 2: Mindmap Speaking (Week 36)
  console.log('📸 Navigating to Mindmap Speaking W36...');
  await page.goto(`${BASE_URL}/week/36/mindmap_speaking`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const screenshotPathMindmap = path.join(ARTIFACTS_DIR, 'e2e_w36_mindmap.png');
  await page.screenshot({ path: screenshotPathMindmap, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathMindmap}`);

  // Test 3: Ask AI (Week 36)
  console.log('📸 Navigating to Ask AI W36...');
  await page.goto(`${BASE_URL}/week/36/ask_ai`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const screenshotPathAskAi = path.join(ARTIFACTS_DIR, 'e2e_w36_ask_ai.png');
  await page.screenshot({ path: screenshotPathAskAi, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathAskAi}`);

  // Test 4: Logic Lab (Week 36)
  console.log('📸 Navigating to Logic Lab W36...');
  await page.goto(`${BASE_URL}/week/36/logic_lab`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const screenshotPathLogic = path.join(ARTIFACTS_DIR, 'e2e_w36_logic_lab.png');
  await page.screenshot({ path: screenshotPathLogic, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathLogic}`);

  // Test 5: New Words (Week 36)
  console.log('📸 Navigating to New Words W36...');
  await page.goto(`${BASE_URL}/week/36/new_words`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const screenshotPathVocab = path.join(ARTIFACTS_DIR, 'e2e_w36_new_words.png');
  await page.screenshot({ path: screenshotPathVocab, fullPage: false });
  console.log(`✅ Saved screenshot: ${screenshotPathVocab}`);

  await browser.close();
  console.log('🎉 Full E2E UI Inspection Complete!');
}

runE2E().catch(err => {
  console.error('❌ E2E Inspection failed:', err);
  process.exit(1);
});
