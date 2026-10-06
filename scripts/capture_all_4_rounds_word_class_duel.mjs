import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching Puppeteer to capture all 4 rounds of Word Class Duel (I7)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const url = 'http://localhost:5173/week/33/chronicles?room=6&owner=true';
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Click 3rd door (doorIdx 2)
  console.log('Clicking Door 3: Word Class Duel...');
  const doors = await page.$$('button');
  let clicked = false;
  for (const btn of doors) {
    const text = await page.evaluate(el => el.innerText, btn);
    if (text.includes('Open Door') || text.includes('Challenge') || text.includes('Word Class') || text.includes('Scale')) {
      // Find the one corresponding to door 2
    }
  }

  // More direct: evaluate click on the 3rd chest/door
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const doorBtns = buttons.filter(b => b.innerText.includes('Open Door') || b.innerText.includes('Open Chest') || b.innerText.includes('Challenge'));
    if (doorBtns[2]) doorBtns[2].click();
    else if (doorBtns[doorBtns.length - 1]) doorBtns[doorBtns.length - 1].click();
  });

  await new Promise(r => setTimeout(r, 2500));

  const rounds = [
    { roundNum: 1, word: 'GRIP', correctText: 'Your rubber shoes grip firmly' },
    { roundNum: 2, word: 'SLIDE', correctText: 'Water turns safe corridors into a dangerous slide' },
    { roundNum: 3, word: 'CARE', correctText: 'Teachers care deeply about student safety' },
    { roundNum: 4, word: 'HELP', correctText: 'Jake called the nurse for immediate help' },
  ];

  const results = [];

  for (const r of rounds) {
    console.log(`\n--- Capturing Round ${r.roundNum} (${r.word}) ---`);
    const domText = await page.evaluate(() => document.body.innerText.replace(/\n+/g, ' | '));
    console.log(`DOM snippet: ${domText.slice(0, 300)}`);

    const filename = `word_class_duel_round_${r.roundNum}_${r.word.toLowerCase()}.png`;
    const ssPath = path.join(SCREENSHOT_DIR, filename);
    await page.screenshot({ path: ssPath });

    const brainPath = path.join(BRAIN_DIR, filename);
    fs.copyFileSync(ssPath, brainPath);
    console.log(`Saved screenshot to: ${ssPath}`);

    // Extract all 4 cards shown in DOM
    const cardTexts = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns
        .map(b => b.innerText.trim())
        .filter(t => t.startsWith('CARD ') || t.includes('corridor') || t.includes('slide') || t.includes('care') || t.includes('help') || t.includes('soles'));
    });

    results.push({
      round: r.roundNum,
      word: r.word,
      domSnippet: domText.slice(0, 300),
      cardsFound: cardTexts,
      screenshot: ssPath,
      brainScreenshot: brainPath
    });

    if (r.roundNum < 4) {
      console.log(`Clicking correct card for ${r.word} (${r.correctText})...`);
      const clickedCard = await page.evaluate((targetSnippet) => {
        const btns = Array.from(document.querySelectorAll('button'));
        for (const b of btns) {
          if (b.innerText.includes(targetSnippet)) {
            b.click();
            return true;
          }
        }
        return false;
      }, r.correctText);

      console.log(`Card clicked: ${clickedCard}`);
      // Wait for animation & transition
      await new Promise(res => setTimeout(res, 1800));
    }
  }

  const outJson = path.join(SCREENSHOT_DIR, 'word_class_duel_4rounds_evidence.json');
  fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
  console.log(`\nWrote complete 4-round evidence to: ${outJson}`);

  await browser.close();
}

run().catch(err => {
  console.error('Error during Word Class Duel capture:', err);
  process.exit(1);
});
