import puppeteer from 'puppeteer';

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
    perspective: 750px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .track {
    position: relative;
    width: 580px;
    height: 2800px;
    transform-origin: bottom center;
    transform: rotateX(78deg);
    transform-style: preserve-3d;
    background: linear-gradient(to top, #1e0b36 0%, #110526 50%, #060112 100%);
    border-left: 5px solid #a855f7;
    border-right: 5px solid #a855f7;
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.4);
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
    border: 3.5px solid #34d399;
    border-radius: 16px;
    padding: 10px 26px;
    color: white;
    font-size: 26px;
    font-weight: 900;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px #34d399;
    white-space: nowrap;
  }

  .distractor-badge {
    background: linear-gradient(135deg, #581c87, #3b0764);
    border: 3px solid #c084fc;
    border-radius: 16px;
    padding: 10px 24px;
    color: #f3e8ff;
    font-size: 26px;
    font-weight: 900;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    white-space: nowrap;
  }

  .hurdle-badge {
    background: #dc2626;
    border: 3px solid #f87171;
    border-radius: 10px;
    padding: 8px 30px;
    color: white;
    font-size: 24px;
    font-weight: 900;
    box-shadow: 0 0 25px #ef4444;
    white-space: nowrap;
  }

  .leo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1.4);
  }
</style>
</head>
<body>
  <div class="viewport">
    <div class="track">
      <div class="divider div1"></div>
      <div class="divider div2"></div>

      <!-- Wave approaching at dist = 1200px -->
      <div class="billboard-entity" style="left: 16.66%; bottom: 1200px;">
        <div class="target-badge">✨ safety</div>
      </div>
      <div class="billboard-entity" style="left: 50%; bottom: 1200px;">
        <div class="distractor-badge">hazard</div>
      </div>
      <div class="billboard-entity" style="left: 83.33%; bottom: 1200px;">
        <div class="hurdle-badge">⚡ JUMP!</div>
      </div>

      <!-- Leo at bottom = 450px -->
      <div class="billboard-entity" style="left: 50%; bottom: 450px;">
        <div class="leo-container">
          <svg viewBox="0 0 64 80" width="64" height="80" fill="none">
            <ellipse cx="32" cy="74" rx="18" ry="5" fill="rgba(0,0,0,0.4)" />
            <!-- Legs -->
            <rect x="22" y="52" width="8" height="20" rx="4" fill="#3b82f6" />
            <rect x="20" y="68" width="12" height="7" rx="3.5" fill="#78350f" />
            <rect x="34" y="52" width="8" height="20" rx="4" fill="#2563eb" />
            <rect x="32" y="68" width="12" height="7" rx="3.5" fill="#78350f" />
            <!-- Torso -->
            <rect x="20" y="28" width="24" height="26" rx="6" fill="#f59e0b" />
            <!-- Backpack -->
            <rect x="24" y="32" width="16" height="18" rx="4" fill="#b45309" stroke="#78350f" stroke-width="1.5" />
            <rect x="27" y="38" width="10" height="8" rx="2" fill="#d97706" />
            <!-- Head & Hat -->
            <ellipse cx="32" cy="24" rx="10" ry="9" fill="#fed7aa" />
            <path d="M18 20 C18 10, 46 10, 46 20 Z" fill="#92400e" />
            <ellipse cx="32" cy="20" rx="16" ry="3" fill="#b45309" />
          </svg>
        </div>
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
  await page.screenshot({ path: '/Users/binhnguyen/.gemini/antigravity-ide/brain/ca208f83-1a01-48c3-a922-1aabfe360652/screenshots/test_track_with_leo.png' });
  await browser.close();
  console.log('Saved test_track_with_leo.png');
})();
