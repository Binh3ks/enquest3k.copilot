import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots';
const BASE = 'http://localhost:5173';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1024, height: 768 });

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

console.log('=== STEP 1: Set up Test User State for Week 33, Day 3 (Floor 3) ===');
await page.goto(`${BASE}/week/33/chronicles`, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem('engquest_onboarded', 'true');
  localStorage.removeItem('arcade_owner_bypass');

  // Complete 1 quest in Day 3 (e.g. word_blitz) so key is ready for Floor 3
  const raw = localStorage.getItem('engquest-daily-quest') || '{}';
  const parsed = JSON.parse(raw) || { state: {} };
  parsed.state = parsed.state || {};
  parsed.state.completedQuests = parsed.state.completedQuests || {};
  parsed.state.completedQuests['w33'] = {
    ...(parsed.state.completedQuests['w33'] || {}),
    word_blitz: true,
  };
  localStorage.setItem('engquest-daily-quest', JSON.stringify(parsed));

  // Reset room stars for w33_d2
  const rawChron = localStorage.getItem('engquest_chronicles_default') || '{}';
  const parsedChron = JSON.parse(rawChron) || {};
  if (parsedChron.roomStars) {
    delete parsedChron.roomStars['w33_d2'];
    localStorage.setItem('engquest_chronicles_default', JSON.stringify(parsedChron));
  }
});

console.log('\n=== STEP 2: Navigate to Production Floor 3: Thunder Arena ===');
await page.goto(`${BASE}/week/33/chronicles?room=2`, { waitUntil: 'networkidle0', timeout: 20000 });
await new Promise(r => setTimeout(r, 2000));

// Screenshot 1: Floor 3 with 3 chests (Door 1: Chunk Catapult Match unlocked with 🔑 Open Chest)
const snap1 = path.join(OUT_DIR, 'prod_hangmuc3_01_floor3_chamber_view.png');
await page.screenshot({ path: snap1, fullPage: true });
console.log(`📸 Screenshot saved: ${snap1}`);

const floor3Buttons = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.dr-door-enter-btn')).map(b => b.innerText);
});
console.log('Floor 3 Doors Status:', floor3Buttons);

console.log('\n=== STEP 3: Click 🔑 Open Chest on Door 1 (Chunk Catapult Match) ===');
// Door 1 is the 2nd door in the list (index 1)
const enterButtons = await page.$$('.dr-door-enter-btn');
if (enterButtons[1]) {
  await enterButtons[1].click();
} else {
  console.error('Door button 1 not found!');
}
await new Promise(r => setTimeout(r, 1500));

// Screenshot 2: Chunk Catapult Canvas 2D active in production flow
const snap2 = path.join(OUT_DIR, 'prod_hangmuc3_02_catapult_in_room_idle.png');
await page.screenshot({ path: snap2, fullPage: true });
console.log(`📸 Screenshot saved: ${snap2}`);

// Locate Canvas in production screen
const canvas = await page.$('canvas');
if (!canvas) {
  console.error('❌ Canvas not found in production screen!');
  process.exit(1);
}
const box = await canvas.boundingBox();
console.log('Production Canvas Box:', box);

// Slingshot anchor at (130, 380) in virtual 800x500
const baseX = box.x + (130 / 800) * box.width;
const baseY = box.y + (380 / 500) * box.height;

console.log('\n=== STEP 4: Real Pointer Drag Interaction (Bullet Time & Parabolic Trajectory) ===');
await page.mouse.move(baseX, baseY);
await page.mouse.down();
await new Promise(r => setTimeout(r, 200));

// Drag back-left to aim up-right
const dragX = box.x + (70 / 800) * box.width;
const dragY = box.y + (435 / 500) * box.height;
await page.mouse.move(dragX, dragY, { steps: 15 });
await new Promise(r => setTimeout(r, 500));

// Screenshot 3: Real pull back with Bullet Time badge, stretched rubber bands & trajectory dots
const snap3 = path.join(OUT_DIR, 'prod_hangmuc3_03_catapult_drag_bullet_time.png');
await page.screenshot({ path: snap3, fullPage: true });
console.log(`📸 Screenshot saved: ${snap3}`);

console.log('\n=== STEP 5: Mouse Release (Launch Projectile in Parabolic Flight) ===');
await page.mouse.up();

// Wait 250ms for mid-flight parabolic trajectory
await new Promise(r => setTimeout(r, 250));
const snap4 = path.join(OUT_DIR, 'prod_hangmuc3_04_catapult_projectile_flight.png');
await page.screenshot({ path: snap4, fullPage: true });
console.log(`📸 Screenshot saved: ${snap4}`);

// Wait for target impact and collision reaction
await new Promise(r => setTimeout(r, 1100));
const snap5 = path.join(OUT_DIR, 'prod_hangmuc3_05_catapult_target_impact.png');
await page.screenshot({ path: snap5, fullPage: true });
console.log(`📸 Screenshot saved: ${snap5}`);

console.log('\n=== STEP 6: Exit Catapult back to Floor 3 Room ===');
await page.evaluate(() => {
  const exitBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Exit'));
  if (exitBtn) exitBtn.click();
});
await new Promise(r => setTimeout(r, 1500));

const snap6 = path.join(OUT_DIR, 'prod_hangmuc3_06_return_to_floor3.png');
await page.screenshot({ path: snap6, fullPage: true });
console.log(`📸 Screenshot saved: ${snap6}`);

console.log('\nConsole Errors:', errors);
await browser.close();
console.log('✅ Production flow verification script completed successfully!');
