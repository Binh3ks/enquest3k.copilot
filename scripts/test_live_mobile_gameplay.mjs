import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots';
mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });

  // Helper to open a specific room door directly or via UI
  console.log('=== TEST 1: Floor 4 Door 2 (Syntax Express Rail) ===');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const rooms = await page.$$('.cwm-room-node');
  if (rooms[3]) {
    await rooms[3].click();
    await new Promise(r => setTimeout(r, 800));
    const doors = await page.$$('.dr-door-enter-btn');
    if (doors[1]) {
      await doors[1].click();
      await new Promise(r => setTimeout(r, 1500));

      // Simulate player touching and holding right to run across the gantry
      const gestureLayer = await page.$('.syntax-rail-gesture-layer');
      if (gestureLayer) {
        const box = await gestureLayer.boundingBox();
        if (box) {
          // Touch on right side of screen
          await page.touchscreen.tap(box.x + box.width * 0.75, box.y + box.height * 0.5);
          await new Promise(r => setTimeout(r, 400));
        }
      }

      await page.screenshot({ path: path.join(OUT_DIR, 'live_01_syntax_express.png') });
      console.log('Captured live_01_syntax_express.png');

      // Click exit back to chamber
      const exitBtn = await page.$('.dr-floating-exit-btn, .dr-back-btn, [aria-label="Exit Game"]');
      if (exitBtn) await exitBtn.click();
      await new Promise(r => setTimeout(r, 800));
    }
  }

  console.log('=== TEST 2: Floor 4 Door 1 (Highway 3D Word Runner) ===');
  // Re-enter Floor 4 Door 1
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const roomsF4 = await page.$$('.cwm-room-node');
  if (roomsF4[3]) {
    await roomsF4[3].click();
    await new Promise(r => setTimeout(r, 800));
    const doors = await page.$$('.dr-door-enter-btn');
    if (doors[0]) {
      await doors[0].click();
      // Wait 5 seconds so continuous procedural spawning triggers and wave entities appear
      console.log('Waiting 5.5s for continuous procedural wave spawner...');
      await new Promise(r => setTimeout(r, 5500));

      // Simulate player swiping or steering to lane 0
      await page.touchscreen.tap(80, 500);
      await new Promise(r => setTimeout(r, 400));

      await page.screenshot({ path: path.join(OUT_DIR, 'live_02_highway_sprint.png') });
      console.log('Captured live_02_highway_sprint.png');
    }
  }

  console.log('=== TEST 3: Floor 1 Door 2 (Word Wagon Jump) ===');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const roomsF1 = await page.$$('.cwm-room-node');
  if (roomsF1[0]) {
    await roomsF1[0].click();
    await new Promise(r => setTimeout(r, 800));
    const doors = await page.$$('.dr-door-enter-btn');
    if (doors[1]) {
      await doors[1].click();
      await new Promise(r => setTimeout(r, 1500));

      await page.screenshot({ path: path.join(OUT_DIR, 'live_03_word_wagon.png') });
      console.log('Captured live_03_word_wagon.png');
    }
  }

  console.log('=== TEST 4: Floor 2 Door 1 (Potion Flip Dungeon) ===');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const roomsF2 = await page.$$('.cwm-room-node');
  if (roomsF2[1]) {
    await roomsF2[1].click();
    await new Promise(r => setTimeout(r, 800));
    const doors = await page.$$('.dr-door-enter-btn');
    if (doors[0]) {
      await doors[0].click();
      await new Promise(r => setTimeout(r, 1500));

      await page.screenshot({ path: path.join(OUT_DIR, 'live_04_potion_flip.png') });
      console.log('Captured live_04_potion_flip.png');
    }
  }

  console.log('=== TEST 5: Floor 2 Door 2 (Echo Arena Shooter) ===');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const roomsF2b = await page.$$('.cwm-room-node');
  if (roomsF2b[1]) {
    await roomsF2b[1].click();
    await new Promise(r => setTimeout(r, 800));
    const doors = await page.$$('.dr-door-enter-btn');
    if (doors[1]) {
      await doors[1].click();
      await new Promise(r => setTimeout(r, 1500));

      await page.screenshot({ path: path.join(OUT_DIR, 'live_05_echo_arena.png') });
      console.log('Captured live_05_echo_arena.png');
    }
  }

  console.log('=== TEST 6: Floor 3 Door 1 (Catapult Commander) ===');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const roomsF3 = await page.$$('.cwm-room-node');
  if (roomsF3[2]) {
    await roomsF3[2].click();
    await new Promise(r => setTimeout(r, 800));
    const doors = await page.$$('.dr-door-enter-btn');
    if (doors[0]) {
      await doors[0].click();
      await new Promise(r => setTimeout(r, 1500));

      await page.screenshot({ path: path.join(OUT_DIR, 'live_06_catapult.png') });
      console.log('Captured live_06_catapult.png');
    }
  }

  console.log('=== TEST 7: Floor 5 Door 1 (Titan Grammar Forge) ===');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const roomsF5 = await page.$$('.cwm-room-node');
  if (roomsF5[4]) {
    await roomsF5[4].click();
    await new Promise(r => setTimeout(r, 800));
    const doors = await page.$$('.dr-door-enter-btn');
    if (doors[0]) {
      await doors[0].click();
      await new Promise(r => setTimeout(r, 1500));

      await page.screenshot({ path: path.join(OUT_DIR, 'live_07_titan_forge.png') });
      console.log('Captured live_07_titan_forge.png');
    }
  }

  await browser.close();
  console.log('All live mobile gameplay tests completed!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
