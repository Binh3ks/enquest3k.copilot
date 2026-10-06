import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

const BUILTIN_WORDS = [
  'CORRIDOR', 'SLIPPED', 'NURSE', 'BANDAGE', 'RELIEVED', 'MISTAKE', 'ACCIDENT', 'FIX', 'CAREFUL', 'CLUMSY',
  'FRICTION', 'BALANCE', 'RUBBER', 'GROUND', 'STAIRS', 'FRIEND', 'DOCTOR', 'HOSPITAL', 'RUNNING', 'WALKING',
  'STUDENT', 'SCHOOL', 'CLEANER', 'CORRIDORS', 'HYPOTHESIS', 'EXPERIMENT', 'EVIDENCE', 'PLAYGROUND', 'TERRIBLE',
  'EXPLAIN', 'HEAD', 'SURFACE', 'TILES', 'SMOOTH', 'DANGEROUS', 'SCIENCE', 'STATION', 'CHAMBER', 'MOTION',
  'WEIGHT', 'FORCE', 'ENERGY', 'SPEED', 'METHOD', 'RESULT', 'SWAP', 'ORDER', 'SEQUENCE', 'CHRONOLOGY'
];

async function main() {
  console.log('Running F7D1 Word Forge Scramble with full vocabulary list...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  await doorBtns[0].click(); // F7D1
  await new Promise(r => setTimeout(r, 800));

  // Get scrambled buttons
  const letterMap = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button[style*="border-radius: 12px"]'));
    return btns.map((b, idx) => ({ idx, char: b.innerText.trim().toUpperCase() }));
  });

  const chars = letterMap.map(b => b.char);
  console.log('Scrambled characters on screen:', chars.join(' '));

  // Load words from browser content service as well
  const extraWords = await page.evaluate(async () => {
    try {
      const { getWeeklyPoolWithReview } = await import('/src/services/contentService.js');
      const res = await getWeeklyPoolWithReview(33, 'vocab');
      return (res.items || []).map(i => i.word?.toUpperCase()).filter(Boolean);
    } catch {
      return [];
    }
  });

  const allWords = Array.from(new Set([...BUILTIN_WORDS, ...extraWords]));
  const sorted = [...chars].sort().join('');
  let solvedWord = null;

  for (const w of allWords) {
    if (w.length === chars.length && [...w].sort().join('') === sorted) {
      solvedWord = w;
      break;
    }
  }

  console.log('Solved anagram target word:', solvedWord);

  if (!solvedWord) {
    console.error('Could not solve anagram for:', chars);
    await browser.close();
    return;
  }

  // Click letters in order of solvedWord
  const usedIndices = new Set();
  for (const ch of solvedWord) {
    const match = letterMap.find(b => b.char === ch && !usedIndices.has(b.idx));
    if (match) {
      usedIndices.add(match.idx);
      const btns = await page.$$('button[style*="border-radius: 12px"]');
      await btns[match.idx].click();
      await new Promise(r => setTimeout(r, 140));
    }
  }

  // Wait for verification and feedback banner
  await new Promise(r => setTimeout(r, 450));

  const feedback = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div')).find(d => {
      const text = d.innerText?.trim() || '';
      return text.includes('FORGED!') || text.includes('INCORRECT!');
    });
    return el ? el.innerText.trim() : null;
  });
  console.log('F7D1 feedback captured:', feedback);

  // Take screenshot of completed word with feedback banner
  const picName = 'f7d1_word_forge_scramble_live_play.png';
  const picPath = path.join(OUTPUT_DIR, picName);
  await page.screenshot({ path: picPath });
  fs.copyFileSync(picPath, path.join(BRAIN_DIR, picName));
  console.log('Saved F7D1 screenshot to:', picPath);

  // Update quick_audit_floor_6_7_evidence.json
  const evidencePath = path.join(OUTPUT_DIR, 'quick_audit_floor_6_7_evidence.json');
  const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
  const f7d1Entry = evidence.find(e => e.code === 'F7D1');
  if (f7d1Entry) {
    f7d1Entry.inspectAfter.feedback = feedback;
  }
  fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 2));
  fs.copyFileSync(evidencePath, path.join(BRAIN_DIR, 'quick_audit_floor_6_7_evidence.json'));

  await browser.close();
}

main().catch(console.error);
