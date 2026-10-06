/**
 * test_meteor_bug002.mjs
 * Q8: Confirm if meteor_smasher shows "Related to {sentence}" as option labels
 * Floor 3 / room=2 / doorIdx=2
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Navigate to Floor 3 (room=2)
  await page.goto('http://localhost:5173/week/33/chronicles?room=2&owner=true', {
    waitUntil: 'networkidle2', timeout: 15000
  });
  await sleep(2000);

  // Click 3rd Open Chest (doorIdx=2 = Integration = meteor_smasher)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
      .filter(b => b.textContent.includes('Open Chest'));
    if (btns[2]) btns[2].click();
  });
  console.log('Clicked Open Chest #2 (meteor_smasher)');
  await sleep(3500);

  // Screenshot
  const ssPath = path.join(SS_DIR, 'meteor_bug002_test.png');
  await page.screenshot({ path: ssPath });

  // Full DOM verbatim
  const dom = await page.evaluate(() => document.body.innerText);
  console.log('\n=== METEOR SMASHER DOM (verbatim) ===');
  console.log(dom.replace(/\n/g, ' | '));

  // Specifically check for "Related to" strings
  const relatedToLines = dom.split('\n').filter(l => l.includes('Related to'));
  console.log('\n=== "Related to" lines found:', relatedToLines.length, '===');
  relatedToLines.forEach(l => console.log('  >', l.trim()));

  // Check for full sentence as options (sentence-length option labels > 20 chars)
  const lines = dom.split('\n').map(l => l.trim()).filter(l => l.length > 20 && l.length < 120);
  console.log('\n=== Candidate option lines (20-120 chars) ===');
  lines.forEach(l => console.log(' ', l));

  await browser.close();
  console.log('\nScreenshot:', ssPath);
}
main().catch(console.error);
