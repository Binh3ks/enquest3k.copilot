import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5173/week/33/chronicles?room=2&owner=true', { waitUntil: 'networkidle2', timeout: 15000 });
  await sleep(2000);

  // Click Open Chest #2 (meteor_smasher = Integration door)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest'));
    if (btns[2]) btns[2].click();
  });
  await sleep(3500);

  // Click Start / Begin / Play button
  const startLabel = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const start = btns.find(b => /start|begin|play|launch|storm|defend/i.test(b.textContent));
    if (start) { start.click(); return start.textContent.trim(); }
    // Also try clicking any button
    return btns.map(b => b.textContent.trim().substring(0, 30)).filter(Boolean).join(' | ');
  });
  console.log('Start button clicked:', startLabel);
  await sleep(2500); // Wait for meteors to spawn

  // Full DOM after game starts
  const dom = await page.evaluate(() => document.body.innerText);
  const ss = path.join(SS_DIR, 'meteor_started_bug002.png');
  await page.screenshot({ path: ss });

  console.log('\n=== DOM after game starts ===');
  console.log(dom.replace(/\n/g, ' | ').substring(0, 800));

  const related = dom.split('\n').filter(l => l.includes('Related to'));
  console.log('\n=== "Related to" lines:', related.length, '===');
  related.forEach(l => console.log('  >', l.trim()));

  // Check all meteor text labels (short to medium length strings that appear as game options)
  const optionCandidates = dom.split('\n').map(l => l.trim())
    .filter(l => l.length > 5 && l.length < 100 && !l.includes('Floor') && !l.includes('⏱️') && !l.includes('Storm Battery'));
  console.log('\n=== Meteor option candidates ===');
  optionCandidates.forEach(l => console.log(' ', l));

  await browser.close();
  console.log('\nScreenshot:', ss);
}
main().catch(console.error);
