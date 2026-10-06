/**
 * test_cloze_counter.mjs
 * Test: Cambridge Cloze counter updates on submit (not per-fill)
 * Navigate → Open Chest → game loads → type into blank 1 → screenshot → Submit → screenshot result
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
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

  // Step 1: Navigate to Floor 5 (room=4)
  await page.goto('http://localhost:5173/week/33/chronicles?room=4&owner=true', { waitUntil: 'networkidle2', timeout: 15000 });
  await sleep(2000);

  // Step 2: Click 3rd Open Chest button (index 2 = Integration/Cambridge Cloze)
  const openBtns = await page.$$eval('button', btns => 
    btns.filter(b => b.textContent.includes('Open Chest')).map(b => b.textContent.trim())
  );
  console.log('Open Chest buttons found:', openBtns.length, openBtns);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
      .filter(b => b.textContent.includes('Open Chest'));
    if (btns[2]) btns[2].click();
  });
  console.log('Clicked Open Chest #2 (Integration)');
  await sleep(3000);

  // Step 3: Screenshot game load state — check counter
  const ss1Path = path.join(SS_DIR, 'cloze_01_game_loaded.png');
  await page.screenshot({ path: ss1Path });
  const dom1 = await page.evaluate(() => document.body.innerText);
  console.log('\n=== AFTER GAME LOAD ===');
  console.log('DOM:', dom1.replace(/\n/g, ' | ').substring(0, 500));

  // Step 4: Try to start the game first (click "Start Game" or "Begin Gauntlet" if present)
  const startBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const start = btns.find(b => b.textContent.includes('Begin') || b.textContent.includes('Start') || b.textContent.includes('Gauntlet'));
    if (start) { start.click(); return start.textContent.trim(); }
    return null;
  });
  if (startBtn) {
    console.log('Clicked start button:', startBtn);
    await sleep(1500);
  }

  // Step 5: Find the first blank input and type "friction"
  const inputCount = await page.evaluate(() => document.querySelectorAll('input[type="text"]').length);
  console.log('\nInput fields found:', inputCount);

  if (inputCount > 0) {
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[type="text"]');
      if (inputs[0]) inputs[0].focus();
    });
    await page.keyboard.type('friction');
    console.log('Typed "friction" into first blank');
    await sleep(1000);

    // Screenshot after typing
    const ss2Path = path.join(SS_DIR, 'cloze_02_typed_friction.png');
    await page.screenshot({ path: ss2Path });
    const dom2 = await page.evaluate(() => document.body.innerText);
    const counterLine2 = dom2.split('\n').find(l => l.includes('Restored') || l.includes('Seal') || l.includes('/5')) || 'NOT FOUND';
    console.log('\n=== AFTER TYPING "friction" (BEFORE SUBMIT) ===');
    console.log('Counter line:', counterLine2);
    console.log('DOM excerpt:', dom2.replace(/\n/g, ' | ').substring(0, 400));
  }

  // Step 6: Click Submit Gauntlet
  const submitClicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submit = btns.find(b => b.textContent.includes('Submit') || b.textContent.includes('Gauntlet'));
    if (submit) { submit.click(); return submit.textContent.trim(); }
    return null;
  });
  console.log('\nSubmit button clicked:', submitClicked);
  await sleep(2500);

  // Step 7: Screenshot after submit
  const ss3Path = path.join(SS_DIR, 'cloze_03_after_submit.png');
  await page.screenshot({ path: ss3Path });
  const dom3 = await page.evaluate(() => document.body.innerText);
  console.log('\n=== AFTER SUBMIT ===');
  const counterLine3 = dom3.split('\n').find(l => l.includes('Restored') || l.includes('Correct') || l.includes('/5')) || 'NOT FOUND';
  console.log('Counter line:', counterLine3);
  console.log('Full DOM:', dom3.replace(/\n/g, ' | ').substring(0, 600));

  await browser.close();

  console.log('\n=== SCREENSHOTS ===');
  console.log('1. Game loaded:', ss1Path);
  console.log('2. After typing:', ss2Path);
  console.log('3. After submit:', ss3Path);
  
  if (errors.length > 0) console.log('\n🔴 Console errors:', errors.join(' | '));
}

main().catch(console.error);
