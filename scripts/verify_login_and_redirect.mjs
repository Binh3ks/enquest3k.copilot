import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log('=== TEST 1: Direct navigation to /week/33/read_explore ===');
  await page.goto('http://127.0.0.1:5173/week/33/read_explore', { waitUntil: 'networkidle2', timeout: 25000 });
  await new Promise(r => setTimeout(r, 2000));

  const redirectedUrl = page.url();
  console.log('Redirected URL from /week/33/read_explore:', redirectedUrl);
  if (!redirectedUrl.includes('/week/33/hub/1')) {
    throw new Error(`Expected redirect to /week/33/hub/1, got ${redirectedUrl}`);
  }
  await page.screenshot({ path: `${ARTIFACT_DIR}/verify_redirect_read_explore.png` });

  console.log('=== TEST 2: Clear Storage & Visit Landing Page ===');
  await page.evaluate(() => localStorage.clear());
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2', timeout: 25000 });
  await new Promise(r => setTimeout(r, 1500));
  console.log('Landing page URL:', page.url());
  await page.screenshot({ path: `${ARTIFACT_DIR}/verify_landing_page.png` });

  console.log('=== TEST 3: Click "Đăng nhập" to open LoginScreen ===');
  await page.waitForSelector('button', { timeout: 5000 });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText && b.innerText.trim() === 'Đăng nhập');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `${ARTIFACT_DIR}/verify_login_screen_open.png` });

  console.log('=== TEST 4: Type Owner credentials & Click START ADVENTURE ===');
  await page.waitForSelector('input[placeholder="Email"]', { timeout: 5000 });
  await page.type('input[placeholder="Email"]', 'owner@bkbacademy.vn');
  await page.type('input[placeholder="Password"]', '123456');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `${ARTIFACT_DIR}/verify_login_form_filled.png` });

  console.log('Clicking START ADVENTURE button...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const submitBtn = buttons.find(b => b.innerText && b.innerText.includes('START ADVENTURE'));
    if (submitBtn) submitBtn.click();
  });

  // Wait for login processing and navigation
  await new Promise(r => setTimeout(r, 3500));
  const afterLoginUrl = page.url();
  console.log('URL after clicking START ADVENTURE:', afterLoginUrl);

  const afterLoginBodySnippet = await page.evaluate(() => document.body.innerText.slice(0, 400));
  console.log('After login body snippet:\n', afterLoginBodySnippet);

  await page.screenshot({ path: `${ARTIFACT_DIR}/verify_logged_in_questmap.png` });

  if (!afterLoginUrl.includes('/week/33/hub/1')) {
    throw new Error(`Expected login navigation to /week/33/hub/1, got ${afterLoginUrl}`);
  }

  console.log('Filtered console errors:', consoleErrors.filter(e => !e.includes('Permissions policy violation') && !e.includes('unload')));

  await browser.close();
  console.log('🎉 ALL LOGIN & REDIRECT TESTS PASSED PERFECTLY!');
})();
