import puppeteer from 'puppeteer';
import path from 'path';

const EVIDENCE_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/evidence';

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function captureWeek(page, weekNum, outFilename) {
  console.log(`\n=== Setting up for Week ${weekNum} ===`);
  
  await page.goto(`http://localhost:5173/week/${weekNum}/chronicles`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((wk) => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.removeItem('arcade_owner_bypass');

    const raw = localStorage.getItem('engquest-daily-quest') || '{}';
    const parsed = JSON.parse(raw) || { state: {} };
    parsed.state = parsed.state || {};
    parsed.state.completedQuests = parsed.state.completedQuests || {};
    parsed.state.completedQuests[`w${wk}`] = {
      ...(parsed.state.completedQuests[`w${wk}`] || {}),
      word_blitz: true,
      gear1_webtoon: true,
    };
    localStorage.setItem('engquest-daily-quest', JSON.stringify(parsed));

    const rawChron = localStorage.getItem('engquest_chronicles_default') || '{}';
    const parsedChron = JSON.parse(rawChron) || {};
    if (parsedChron.roomStars) {
      delete parsedChron.roomStars[`w${wk}_d2`];
      localStorage.setItem('engquest_chronicles_default', JSON.stringify(parsedChron));
    }
  }, weekNum);

  // Navigate directly to Floor 3: Thunder Arena (room=2)
  console.log(`Navigating to Week ${weekNum} Room 2 (Floor 3)...`);
  await page.goto(`http://localhost:5173/week/${weekNum}/chronicles?room=2`, { waitUntil: 'networkidle2', timeout: 30000 });
  await wait(1500);

  // Click on Door 1 (Chunk Catapult Match): .dr-door-enter-btn index 1
  const enterButtons = await page.$$('.dr-door-enter-btn');
  console.log(`Found enter buttons: ${enterButtons.length}`);
  if (enterButtons[1]) {
    await enterButtons[1].click();
  } else if (enterButtons[0]) {
    await enterButtons[0].click();
  }

  await wait(2000);

  // Read prompt banner
  const promptText = await page.evaluate(() => {
    const banner = document.querySelector('div[style*="border: 1.5px solid"]');
    return banner ? banner.innerText : 'Banner not found';
  });
  console.log(`Week ${weekNum} Observed Prompt Banner:\n${promptText}`);

  // Take screenshot
  const targetPath = path.join(EVIDENCE_DIR, outFilename);
  await page.screenshot({ path: targetPath });
  console.log(`Saved screenshot: ${targetPath}`);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1280,800',
    ],
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  // 1. Week 1 (Pre-A1 Starters Lite Mode)
  await captureWeek(page, 1, 'prod_w01_catapult_pre_a1.png');

  // 2. Week 17 (Chapter 1: The Grand Library)
  await captureWeek(page, 17, 'prod_w17_catapult_library.png');

  // 3. Week 50 (Chapter 5: The Forge of Words)
  await captureWeek(page, 50, 'prod_w50_catapult_forge.png');

  await browser.close();
  console.log('\nAll 3 weeks successfully captured!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
