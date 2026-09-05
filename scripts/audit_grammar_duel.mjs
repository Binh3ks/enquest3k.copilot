import puppeteer from 'puppeteer-core';

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
  await page.goto('http://127.0.0.1:5173/week/33/hub/1', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    localStorage.setItem('engquest3k_srs_daily_reviewed', todayStr);
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('auth_token', 'offline_token');
  });

  await page.goto('http://127.0.0.1:5173/week/33/task/sentence_smash', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Dismiss SRS modal if present
  await page.evaluate(() => {
    const skipBtn = document.querySelector('.srs-skip-btn');
    if (skipBtn) skipBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Click START button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find(b => (b.innerText || '').includes('START'));
    if (startBtn) startBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: `${ARTIFACT_DIR}/audit_grammar_duel.png` });
  console.log('Saved clean screenshot: audit_grammar_duel.png');
  await browser.close();
})();
