import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to W33 Floor 1 (room=0)...');
  await page.goto('http://localhost:5173/week/33/chronicles?room=0&owner=true', {
    waitUntil: 'networkidle2',
    timeout: 15000
  });
  await sleep(2500);

  // Click Door 3 (index 2) "Open Chest"
  console.log('Opening Door 3 (lexical_det)...');
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest'));
    if (btns[2]) {
      btns[2].click();
      return true;
    }
    return false;
  });

  if (!clicked) {
    console.error('Could not find Open Chest button for Door 3');
    await browser.close();
    process.exit(1);
  }

  await sleep(3000);

  // Check if instruction modal is present and click Start
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find(b => 
      b.textContent.includes('Start') || 
      b.textContent.includes('Infiltrate') || 
      b.textContent.includes('Play') ||
      b.textContent.includes('Begin')
    );
    if (startBtn) startBtn.click();
  });
  await sleep(2000);

  // Capture DOM and elements
  const data = await page.evaluate(() => {
    const dom = document.body.innerText;
    const defLabels = Array.from(document.querySelectorAll('.safe-def-label, .safe-card, .safe-item, [class*="safe"]'))
      .map(el => el.textContent.trim())
      .filter(t => t.length > 5);

    return {
      fullDom: dom,
      defLabels,
      relatedToOccurrences: dom.split('\n').filter(l => l.includes('Related to')),
    };
  });

  console.log('\n=== EVIDENCE RESULTS FOR LEXICAL_DET (W33 F1/D2) ===');
  console.log('"Related to" occurrences found:', data.relatedToOccurrences.length);
  if (data.relatedToOccurrences.length > 0) {
    console.log('VIOLATIONS:', data.relatedToOccurrences);
  } else {
    console.log('✅ ZERO "Related to" strings found in DOM!');
  }

  console.log('\nSample DOM text (first 600 chars):');
  console.log(data.fullDom.replace(/\n+/g, ' | ').substring(0, 600));

  const ssPath = path.join(SS_DIR, 'w33_lexical_det_fixed.png');
  await page.screenshot({ path: ssPath });
  console.log('\nSaved screenshot to:', ssPath);

  // Copy to brain artifacts dir so it can be viewed / embedded
  const brainSsPath = path.join(BRAIN_DIR, 'w33_lexical_det_fixed.png');
  fs.copyFileSync(ssPath, brainSsPath);
  console.log('Copied screenshot to brain dir:', brainSsPath);

  await browser.close();
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
