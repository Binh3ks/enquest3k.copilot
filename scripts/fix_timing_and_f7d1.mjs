import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

// Helper to extract banner feedback
const extractBannerFeedback = () => {
  const el = Array.from(document.querySelectorAll('div')).find(d => {
    const text = d.innerText?.trim() || '';
    const style = d.getAttribute('style') || '';
    return (
      (style.includes('bottom: 24px') || style.includes('bottom: 40px') || style.includes('bottom: 30px')) &&
      (text.includes('BRIDGE POWERED') || text.includes('EXCELLENT') || text.includes('DUEL WON') || text.includes('FORGED') || text.includes('INCORRECT'))
    );
  });
  return el ? el.innerText.trim() : null;
};

async function runTimingFix() {
  console.log('=== FIXING TIMING & COMPLETING F7D1 ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Read existing evidence JSON
  const evidencePath = path.join(OUTPUT_DIR, 'quick_audit_floor_6_7_evidence.json');
  const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));

  // 1. Re-test F6D2: Connector Relay
  {
    console.log('Running F6D2 (Connector Relay)...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/week/33/chronicles?room=5&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click(); // F6D2
    await new Promise(r => setTimeout(r, 800));

    // Click "because" (option 0)
    const btn = await page.$('button[style*="background: linear-gradient"]');
    if (btn) await btn.click();
    await new Promise(r => setTimeout(r, 450)); // Timing wait

    const feedback = await page.evaluate(extractBannerFeedback);
    console.log('F6D2 Feedback captured:', feedback);

    const f6d2Entry = evidence.find(e => e.code === 'F6D2');
    if (f6d2Entry) f6d2Entry.inspectAfter.feedback = feedback;

    await page.close();
  }

  // 2. Re-test F7D1: Word Forge Scramble (Full completion with all letters)
  {
    console.log('Running F7D1 (Word Forge Scramble — FULL COMPLETION)...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[0].click(); // F7D1
    await new Promise(r => setTimeout(r, 800));

    // Identify target word and available letter buttons
    const wordInfo = await page.evaluate(() => {
      const clue = document.querySelector('div[style*="font-style: italic"], div[style*="color: #cbd5e1"]')?.textContent?.trim() || '';
      return { clue };
    });
    console.log('F7D1 Clue:', wordInfo.clue);

    // Click the scrambled letters one by one to spell "TERRIBLE"
    // Let's inspect the exact letter text of available buttons
    const letterMap = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[style*="border-radius: 12px"]'));
      return btns.map((b, idx) => ({ idx, char: b.innerText.trim() }));
    });
    console.log('Available scrambled buttons:', letterMap);

    // Target is "TERRIBLE"
    const targetLetters = ['T', 'E', 'R', 'R', 'I', 'B', 'L', 'E'];
    const usedIndices = new Set();

    for (const ch of targetLetters) {
      // Find unused button with this char
      const match = letterMap.find(b => b.char === ch && !usedIndices.has(b.idx));
      if (match) {
        usedIndices.add(match.idx);
        const btns = await page.$$('button[style*="border-radius: 12px"]');
        await btns[match.idx].click();
        await new Promise(r => setTimeout(r, 120));
      } else {
        console.warn(`Letter ${ch} not found in available buttons!`);
      }
    }

    // Wait for auto-check and feedback banner to appear
    await new Promise(r => setTimeout(r, 450));

    const feedback = await page.evaluate(extractBannerFeedback);
    console.log('F7D1 Feedback captured:', feedback);

    // Capture screenshot of completed word with feedback banner
    const picName = 'f7d1_word_forge_scramble_live_play.png';
    const picPath = path.join(OUTPUT_DIR, picName);
    await page.screenshot({ path: picPath });
    fs.copyFileSync(picPath, path.join(BRAIN_DIR, picName));
    console.log('F7D1 fresh completion screenshot saved:', picName);

    const f7d1Entry = evidence.find(e => e.code === 'F7D1');
    if (f7d1Entry) f7d1Entry.inspectAfter.feedback = feedback;

    await page.close();
  }

  // 3. Re-test F7D2: Question Quest
  {
    console.log('Running F7D2 (Question Quest)...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click(); // F7D2
    await new Promise(r => setTimeout(r, 800));

    // Click option A
    const options = await page.$$('button[style*="border: 2px solid"]');
    if (options.length >= 1) await options[0].click();
    await new Promise(r => setTimeout(r, 450)); // Timing wait

    const feedback = await page.evaluate(extractBannerFeedback);
    console.log('F7D2 Feedback captured:', feedback);

    const f7d2Entry = evidence.find(e => e.code === 'F7D2');
    if (f7d2Entry) f7d2Entry.inspectAfter.feedback = feedback;

    await page.close();
  }

  // 4. Re-test F7D3: Word Class Duel
  {
    console.log('Running F7D3 (Word Class Duel)...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[2].click(); // F7D3
    await new Promise(r => setTimeout(r, 800));

    // Click Card A (linear-gradient)
    const cardBtns = await page.$$('button[style*="linear-gradient"]');
    if (cardBtns.length >= 1) await cardBtns[0].click();
    await new Promise(r => setTimeout(r, 450)); // Timing wait

    const feedback = await page.evaluate(extractBannerFeedback);
    console.log('F7D3 Feedback captured:', feedback);

    const f7d3Entry = evidence.find(e => e.code === 'F7D3');
    if (f7d3Entry) f7d3Entry.inspectAfter.feedback = feedback;

    await page.close();
  }

  await browser.close();

  // Save updated evidence JSON
  fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 2));
  fs.copyFileSync(evidencePath, path.join(BRAIN_DIR, 'quick_audit_floor_6_7_evidence.json'));
  console.log('Updated evidence JSON saved successfully!');
}

runTimingFix().catch(console.error);
