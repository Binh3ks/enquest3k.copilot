import puppeteer from 'puppeteer';

async function runTest() {
  console.log('🚀 Starting Phaser Canvas Lifecycle & Leak Test...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 915 }); // Mobile viewport (Android pixel)

  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('[BROWSER ERROR]:', msg.text());
    }
  });

  // Enable feature flag via localStorage before load
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('ff_phaser_hub', 'true');
  });

  console.log('Navigating to Chronicles World Map...');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));

  const canvasCount = await page.evaluate(() => document.querySelectorAll('canvas').length);
  console.log('Initial Canvas Count in Hub World:', canvasCount);

  // Capture screenshot of Hub World in Phaser mode
  await page.screenshot({ path: 'public/phaser-assets/test_hub_world.png' });
  console.log('📸 Screenshot saved to public/phaser-assets/test_hub_world.png');

  // Verify rapid mounting/unmounting 10 times to test for WebGL/Canvas leaks (Bước 5.5)
  console.log('Testing 10 rapid toggles between Hub World (Phaser) and Room Node...');
  let maxCanvases = canvasCount;

  for (let i = 1; i <= 10; i++) {
    // Switch to shop tab (unmounts Hub World)
    await page.evaluate(() => {
      const shopBtn = document.querySelectorAll('.cwm-tab-btn')[0];
      if (shopBtn) shopBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    const shopCanvases = await page.evaluate(() => document.querySelectorAll('canvas').length);
    if (shopCanvases > maxCanvases) maxCanvases = shopCanvases;

    // Switch back to map tab (remounts Hub World)
    await page.evaluate(() => {
      const tabs = document.querySelectorAll('.cwm-tab-btn');
      // Tab 0 is shop, tab 1 is fragments, or re-click Map / switch
      const mapBtn = Array.from(tabs).find(b => b.textContent.includes('Map') || b.textContent.includes('Hub'));
      if (mapBtn) mapBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const currentCanvases = await page.evaluate(() => document.querySelectorAll('canvas').length);
    if (currentCanvases > maxCanvases) maxCanvases = currentCanvases;
    console.log(`Cycle ${i}/10 — Current Canvases: ${currentCanvases}`);
  }

  console.log('Max simultaneous canvases during 10 cycles:', maxCanvases);

  if (maxCanvases <= 1) {
    console.log('✅ PASSED: Zero canvas leaks detected! Canvas count strictly <= 1.');
  } else {
    console.error('❌ FAILED: Canvas leak detected! Max canvases:', maxCanvases);
    process.exit(1);
  }

  await browser.close();
}

runTest().catch(err => {
  console.error('Test crashed:', err);
  process.exit(1);
});
