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

  await page.goto('http://localhost:5173/week/33/chronicles?room=4&owner=true', { waitUntil: 'networkidle2', timeout: 15000 });
  await sleep(2000);

  // Open Cambridge Cloze
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest'));
    if (btns[2]) btns[2].click();
  });
  await sleep(3000);

  // Debug: check ALL elements on page
  const allInputInfo = await page.evaluate(() => {
    return {
      allInputs: Array.from(document.querySelectorAll('input')).map(i => ({type: i.type, placeholder: i.placeholder, value: i.value, id: i.id})),
      allButtons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().substring(0, 30)),
      bodyLength: document.body.innerText.length,
      phase: document.body.innerText.includes('Enter Gauntlet') ? 'intro' : 
             document.body.innerText.includes('Submit') ? 'playing' : 'unknown',
    };
  });
  console.log('=== ALL INPUTS on page ===', JSON.stringify(allInputInfo.allInputs, null, 2));
  console.log('=== Phase detected:', allInputInfo.phase);
  console.log('=== All buttons:', allInputInfo.allButtons.join(' | '));

  // If Enter Gauntlet is visible, click it
  if (allInputInfo.phase === 'intro' || allInputInfo.allButtons.some(b => b.includes('Enter Gauntlet'))) {
    console.log('\nClicking Enter Gauntlet...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(b => b.textContent.includes('Enter Gauntlet') || b.textContent.includes('▶'));
      if (b) b.click();
    });
    await sleep(2000);

    // Check inputs again
    const afterStart = await page.evaluate(() => ({
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({type: i.type, placeholder: i.placeholder})),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().substring(0, 30)),
    }));
    console.log('\n=== AFTER Enter Gauntlet ===');
    console.log('Inputs:', JSON.stringify(afterStart.inputs));
    console.log('Buttons:', afterStart.buttons.join(' | '));
  }

  // Screenshot of current state
  const ss = path.join(SS_DIR, 'cloze_v3_debug.png');
  await page.screenshot({ path: ss });
  const domFull = await page.evaluate(() => document.body.innerText);
  console.log('\nDOM:', domFull.replace(/\n/g, ' | ').substring(0, 600));

  // If playing, fill blank 1 via React synthetic event
  const playingInputs = await page.evaluate(() => document.querySelectorAll('input').length);
  if (playingInputs > 0) {
    console.log('\n✅ Found', playingInputs, 'inputs — filling blank 1 with "corridor"');
    
    // BEFORE fill screenshot & counter
    const beforeCounter = await page.evaluate(() => 
      document.body.innerText.split('\n').find(l => l.includes('/5') || l.includes('Restored')) || 'N/A'
    );
    console.log('Counter BEFORE fill:', beforeCounter);
    
    // Type into first input using page.type selector
    await page.focus('input[type="text"]');
    await page.keyboard.type('corridor');
    await sleep(800);
    
    const afterTypingCounter = await page.evaluate(() => 
      document.body.innerText.split('\n').find(l => l.includes('/5') || l.includes('Restored')) || 'N/A'
    );
    const inputVal = await page.evaluate(() => document.querySelector('input[type="text"]')?.value);
    const ss2 = path.join(SS_DIR, 'cloze_v3_typed.png');
    await page.screenshot({ path: ss2 });
    console.log('Input value after type:', inputVal);
    console.log('Counter AFTER type (before submit):', afterTypingCounter);

    // Submit
    await page.evaluate(() => {
      const sub = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit'));
      if (sub) sub.click();
    });
    await sleep(2000);

    const afterSubmitDom = await page.evaluate(() => document.body.innerText);
    const afterSubmitCounter = afterSubmitDom.split('\n').find(l => l.includes('Correct') || l.includes('Blanks') || l.includes('/5')) || 'N/A';
    const ss3 = path.join(SS_DIR, 'cloze_v3_submitted.png');
    await page.screenshot({ path: ss3 });
    console.log('Counter/Result AFTER submit:', afterSubmitCounter);
    console.log('DOM after submit:', afterSubmitDom.replace(/\n/g, ' | ').substring(0, 500));
  }

  await browser.close();
}
main().catch(e => console.error('FATAL:', e.message));
