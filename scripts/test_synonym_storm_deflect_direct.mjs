import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

async function verifyDirectDeflection() {
  console.log('>>> VERIFYING DIRECT SHIELD DEFLECTION & BATTERY CHARGING <<<');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[0].click();
    await new Promise(r => setTimeout(r, 1500));

    // Wait until a target meteor appears, then move Leo's coordinates to meet it directly!
    const deflectionResult = await page.evaluate(async () => {
      // Find Leo and the falling meteors
      let deflected = false;
      const startTime = Date.now();

      while (Date.now() - startTime < 8000 && !deflected) {
        // Check window event log
        const logs = window.__SYNONYM_STORM_EVENT_LOG__ || [];
        if (logs.some(l => l.type === 'correct')) {
          deflected = true;
          break;
        }

        // Move Leo under the first falling synonym meteor if present
        const synonymMeteor = document.querySelector('.falling-synonym-meteor.meteor-synonym');
        if (synonymMeteor) {
          const meteorLeft = parseFloat(synonymMeteor.style.left);
          // Dispatch keyboard arrows to steer Leo towards meteorLeft
          window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
        }

        await new Promise(r => setTimeout(r, 100));
      }

      return {
        logs: window.__SYNONYM_STORM_EVENT_LOG__ || [],
        batteryPct: document.querySelector('.battery-pct')?.innerText?.trim() || '',
        scoreText: document.querySelector('.hud-score')?.innerText?.trim() || '',
        feedbackText: document.querySelector('.synonym-feedback-toast')?.innerText?.trim() || '',
      };
    });

    console.log('Deflection verification result:', deflectionResult);

    const screenPath = path.join(OUTPUT_DIR, 'w33_synonym_storm_deflection_evidence.png');
    await page.screenshot({ path: screenPath });
    fs.copyFileSync(screenPath, path.join(BRAIN_DIR, 'w33_synonym_storm_deflection_evidence.png'));
    console.log(`Deflection evidence screenshot saved to: ${screenPath}`);

  } finally {
    await browser.close();
  }
}

verifyDirectDeflection();
