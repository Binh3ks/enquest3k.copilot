import puppeteer from 'puppeteer';
import path from 'path';

const EVIDENCE_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/evidence';

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
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

  // Set local storage to unlock Door 2 on Floor 3 (Thunder Arena)
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.removeItem('arcade_owner_bypass');

    const raw = localStorage.getItem('engquest-daily-quest') || '{}';
    const parsed = JSON.parse(raw) || { state: {} };
    parsed.state = parsed.state || {};
    parsed.state.completedQuests = parsed.state.completedQuests || {};
    parsed.state.completedQuests['w33'] = {
      ...(parsed.state.completedQuests['w33'] || {}),
      word_blitz: true,
    };
    localStorage.setItem('engquest-daily-quest', JSON.stringify(parsed));

    const rawChron = localStorage.getItem('engquest_chronicles_default') || '{}';
    const parsedChron = JSON.parse(rawChron) || {};
    if (parsedChron.roomStars) {
      delete parsedChron.roomStars['w33_d2'];
      localStorage.setItem('engquest_chronicles_default', JSON.stringify(parsedChron));
    }
  });

  // Navigate directly to Floor 3: Thunder Arena (room=2)
  console.log('Navigating to Floor 3 Room URL...');
  await page.goto('http://localhost:5173/week/33/chronicles?room=2', { waitUntil: 'networkidle2', timeout: 30000 });
  await wait(1500);

  // Click on Door 1 (Chunk Catapult Match): .dr-door-enter-btn index 1
  console.log('Entering Chunk Catapult door...');
  const enterButtons = await page.$$('.dr-door-enter-btn');
  console.log('Found enter buttons:', enterButtons.length);
  if (enterButtons[1]) {
    await enterButtons[1].click();
  } else if (enterButtons[0]) {
    await enterButtons[0].click();
  }

  await wait(2000);

  // Observe HUD prompt banner text
  const promptText = await page.evaluate(() => {
    const banner = document.querySelector('div[style*="border: 1.5px solid"]');
    return banner ? banner.innerText : 'Banner not found';
  });
  console.log('Observed Prompt Banner:\n', promptText);

  // Take Screenshot 1: Chunk Catapult Idle showing full sentence stem!
  await page.screenshot({
    path: path.join(EVIDENCE_DIR, 'prod_w33_catapult_01_retell_stem.png'),
  });
  console.log('Saved prod_w33_catapult_01_retell_stem.png');

  // Find canvas and perform real drag & shoot
  const canvasEl = await page.$('canvas');
  if (canvasEl) {
    const box = await canvasEl.boundingBox();
    console.log('Canvas bounding box:', box);

    const scaleX = box.width / 800;
    const scaleY = box.height / 500;

    const startX = box.x + 120 * scaleX;
    const startY = box.y + 390 * scaleY;

    // Pull back slingshot (down & left)
    const pullX = startX - 55 * scaleX;
    const pullY = startY + 50 * scaleY;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(pullX, pullY, { steps: 10 });
    await wait(400);

    // Screenshot 2: Dragging in bullet time showing trajectory
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, 'prod_w33_catapult_02_retell_drag.png'),
    });
    console.log('Saved prod_w33_catapult_02_retell_drag.png');

    // Release mouse to fire projectile
    await page.mouse.up();
    await wait(220);

    // Screenshot 3: Projectile in flight
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, 'prod_w33_catapult_03_retell_flight.png'),
    });
    console.log('Saved prod_w33_catapult_03_retell_flight.png');

    // Wait for hit reaction
    await wait(500);

    // Screenshot 4: Hit reaction / score update
    await page.screenshot({
      path: path.join(EVIDENCE_DIR, 'prod_w33_catapult_04_retell_hit.png'),
    });
    console.log('Saved prod_w33_catapult_04_retell_hit.png');
  }

  await browser.close();
  console.log('Finished capturing all production evidence.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
