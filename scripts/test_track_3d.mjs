import puppeteer from 'puppeteer';
import fs from 'fs';

const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    background: #0b021a;
    overflow: hidden;
    font-family: sans-serif;
  }
  .viewport {
    width: 100vw;
    height: 100vh;
    perspective: 700px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .track {
    position: relative;
    width: 540px;
    height: 2800px;
    transform-origin: bottom center;
    transform: rotateX(78deg);
    transform-style: preserve-3d;
    background: linear-gradient(to top, #1e0b36 0%, #110526 50%, #060112 100%);
    border-left: 5px solid #a855f7;
    border-right: 5px solid #a855f7;
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
  }
  .divider {
    position: absolute;
    width: 3px;
    height: 100%;
    background: rgba(168, 85, 247, 0.4);
  }
  .div1 { left: 33.33%; }
  .div2 { left: 66.66%; }

  .billboard-entity {
    position: absolute;
    transform-origin: bottom center;
    transform: translateX(-50%) rotateX(-78deg);
    pointer-events: none;
  }

  .target-badge {
    background: linear-gradient(135deg, #059669, #047857);
    border: 3px solid #34d399;
    border-radius: 14px;
    padding: 10px 24px;
    color: white;
    font-size: 28px;
    font-weight: 900;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px #34d399;
    white-space: nowrap;
  }

  .distractor-badge {
    background: linear-gradient(135deg, #581c87, #3b0764);
    border: 3px solid #c084fc;
    border-radius: 14px;
    padding: 10px 24px;
    color: #f3e8ff;
    font-size: 28px;
    font-weight: 900;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    white-space: nowrap;
  }

  .hurdle-badge {
    background: #dc2626;
    border: 3px solid #f87171;
    border-radius: 8px;
    padding: 8px 30px;
    color: white;
    font-size: 24px;
    font-weight: 900;
    box-shadow: 0 0 25px #ef4444;
    white-space: nowrap;
  }

  .leo-avatar {
    width: 80px;
    height: 100px;
    background: #f59e0b;
    border: 3px solid #b45309;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 900;
  }
</style>
</head>
<body>
  <div class="viewport">
    <div class="track">
      <div class="divider div1"></div>
      <div class="divider div2"></div>

      <!-- Wave 1: near Leo (dist = 400px) -->
      <div class="billboard-entity" style="left: 16.66%; bottom: 500px;">
        <div class="target-badge">✨ safety</div>
      </div>
      <div class="billboard-entity" style="left: 50%; bottom: 500px;">
        <div class="distractor-badge">hazard</div>
      </div>
      <div class="billboard-entity" style="left: 83.33%; bottom: 500px;">
        <div class="hurdle-badge">⚡ JUMP</div>
      </div>

      <!-- Wave 2: mid distance (dist = 1400px) -->
      <div class="billboard-entity" style="left: 16.66%; bottom: 1400px;">
        <div class="hurdle-badge">⚡ JUMP</div>
      </div>
      <div class="billboard-entity" style="left: 50%; bottom: 1400px;">
        <div class="target-badge">✨ friction</div>
      </div>
      <div class="billboard-entity" style="left: 83.33%; bottom: 1400px;">
        <div class="distractor-badge">gravity</div>
      </div>

      <!-- Leo at bottom = 60px -->
      <div class="billboard-entity" style="left: 50%; bottom: 60px;">
        <div class="leo-avatar">LEO</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 750 });
  await page.setContent(html);
  await page.screenshot({ path: '/Users/binhnguyen/.gemini/antigravity-ide/brain/ca208f83-1a01-48c3-a922-1aabfe360652/screenshots/test_track_3d.png' });
  await browser.close();
  console.log('Saved test_track_3d.png');
})();
