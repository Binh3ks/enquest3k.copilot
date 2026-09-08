import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function captureEvidence() {
  console.log('📸 Launching Puppeteer to capture all 4 Phaser 3 Engines in Mobile Viewport...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Standard Mobile Viewport (Android)
  await page.setViewport({ width: 412, height: 860, deviceScaleFactor: 2 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.error('[Page Error]:', msg.text());
  });

  const outDir = 'public/phaser-assets/evidence';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Go to /quest-demo
  await page.goto('http://localhost:5173/quest-demo', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Phaser Hub World
  console.log('Capturing: 1. Phaser Hub World...');
  await page.select('#select-active-game', 'phaser_hub');
  await new Promise(r => setTimeout(r, 1500));
  // Tap to move player
  await page.mouse.click(200, 300);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '01_hub_world.png') });
  console.log('✅ Saved: 01_hub_world.png');

  // 2. Phaser Highway Runner
  console.log('Capturing: 2. Phaser Highway Runner...');
  await page.select('#select-active-game', 'phaser_highway');
  await new Promise(r => setTimeout(r, 1500));
  // Tap right to steer
  await page.mouse.click(320, 500);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '02_highway_runner.png') });
  console.log('✅ Saved: 02_highway_runner.png');

  // 3. Phaser Chunk Catapult
  console.log('Capturing: 3. Phaser Chunk Catapult...');
  await page.select('#select-active-game', 'phaser_catapult');
  await new Promise(r => setTimeout(r, 1500));
  // Drag slingshot to aim
  await page.mouse.move(140, 380);
  await page.mouse.down();
  await page.mouse.move(90, 420);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '03_chunk_catapult.png') });
  await page.mouse.up();
  console.log('✅ Saved: 03_chunk_catapult.png');

  // 4. Phaser Boss Combat (Ancient Sorcerer)
  console.log('Capturing: 4. Phaser Boss Combat...');
  await page.select('#select-active-game', 'phaser_boss');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '04_boss_combat.png') });
  console.log('✅ Saved: 04_boss_combat.png');

  // 5. Test Performance & FPS under 6x CPU Throttle
  console.log('5. Running FPS benchmark under 6x CPU Throttle on Highway Runner...');
  const client = await page.target().createCDPSession();
  await client.send('Emulation.setCPUThrottlingRate', { rate: 6 });

  await page.select('#select-active-game', 'phaser_highway');
  await new Promise(r => setTimeout(r, 1000));

  const fps = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let frames = 0;
      const start = performance.now();
      function count() {
        frames++;
        if (performance.now() - start < 1000) {
          requestAnimationFrame(count);
        } else {
          resolve(frames);
        }
      }
      requestAnimationFrame(count);
    });
  });

  console.log(`⚡ Measured FPS under 6x CPU slowdown: ${fps} FPS (Target: >= 24 FPS)`);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });

  await browser.close();
  console.log('🎉 All evidence screenshots and benchmarks captured successfully!');
}

captureEvidence().catch(err => {
  console.error('Failed to capture evidence:', err);
  process.exit(1);
});
