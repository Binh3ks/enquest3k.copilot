/**
 * test_cloze_counter_v2.mjs
 * Fix: Game starts in phase='intro'. Must click "Enter Gauntlet ▶" first,
 * then inputs render. Answer: "corridor" for blank #1.
 */
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

  // Navigate to Floor 5 (room=4, cambridge_cloze is door 2)
  await page.goto('http://localhost:5173/week/33/chronicles?room=4&owner=true', { waitUntil: 'networkidle2', timeout: 15000 });
  await sleep(2000);

  // Step 1: Open Cambridge Cloze chest (3rd Open Chest button = index 2)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest'));
    if (btns[2]) btns[2].click();
  });
  await sleep(3000);

  // Step 2: Verify game intro screen
  const introText = await page.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('Intro screen DOM:', introText.replace(/\n/g, ' | '));

  // Step 3: Click "Enter Gauntlet ▶" to start game (transitions phase to 'playing')
  const enterClicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enter = btns.find(b => b.textContent.includes('Enter Gauntlet'));
    if (enter) { enter.click(); return enter.textContent.trim(); }
    // Fallback: find by text content pattern
    const any = btns.find(b => /gauntlet|begin|enter/i.test(b.textContent));
    if (any) { any.click(); return any.textContent.trim(); }
    return 'NOT FOUND — buttons: ' + btns.map(b => b.textContent.trim().substring(0, 20)).join(' | ');
  });
  console.log('\nClicked:', enterClicked);
  await sleep(1500);

  // Step 4: Screenshot BEFORE filling — check counter
  const ss1 = path.join(SS_DIR, 'cloze_v2_01_before_fill.png');
  await page.screenshot({ path: ss1 });
  const dom1 = await page.evaluate(() => document.body.innerText);
  const counter1 = dom1.split('\n').find(l => l.includes('Restored') || l.includes('/5'));
  const inputCount = await page.evaluate(() => document.querySelectorAll('input[type="text"]').length);
  console.log('\n=== BEFORE FILL ===');
  console.log('Counter:', counter1);
  console.log('Input fields found:', inputCount);
  console.log('DOM excerpt:', dom1.replace(/\n/g, ' | ').substring(0, 400));

  if (inputCount === 0) {
    console.log('ERROR: No inputs found even after Enter Gauntlet click');
    await browser.close();
    return;
  }

  // Step 5: Fill blank #1 ("corridor" is the answer for blank 1 per CLOZE_PASSAGE)
  await page.evaluate(() => {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs[0].focus();
    inputs[0].click();
  });
  await page.keyboard.type('corridor');
  await sleep(800);

  // Step 6: Screenshot AFTER typing (before submit) — counter should still be 0/5
  const ss2 = path.join(SS_DIR, 'cloze_v2_02_typed.png');
  await page.screenshot({ path: ss2 });
  const dom2 = await page.evaluate(() => document.body.innerText);
  const counter2 = dom2.split('\n').find(l => l.includes('Restored') || l.includes('/5'));
  const val1 = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input[type="text"]');
    return inputs[0]?.value || 'EMPTY';
  });
  console.log('\n=== AFTER TYPING "corridor" (BEFORE SUBMIT) ===');
  console.log('Input[0] value:', val1);
  console.log('Counter:', counter2);

  // Step 7: Click "Submit Gauntlet"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const sub = btns.find(b => b.textContent.includes('Submit'));
    if (sub) sub.click();
  });
  await sleep(2000);

  // Step 8: Screenshot AFTER submit — counter should show 1/5
  const ss3 = path.join(SS_DIR, 'cloze_v2_03_after_submit.png');
  await page.screenshot({ path: ss3 });
  const dom3 = await page.evaluate(() => document.body.innerText);
  const counter3 = dom3.split('\n').find(l => l.includes('Correct') || l.includes('Blanks') || l.includes('/5') || l.includes('Restored'));
  console.log('\n=== AFTER SUBMIT ===');
  console.log('Counter/Result:', counter3);
  console.log('DOM (first 500):', dom3.replace(/\n/g, ' | ').substring(0, 500));

  await browser.close();
  console.log('\n=== Screenshots ===');
  console.log('1. Before fill:', ss1);
  console.log('2. After typing:', ss2);
  console.log('3. After submit:', ss3);
}
main().catch(e => console.error('ERROR:', e.message));
