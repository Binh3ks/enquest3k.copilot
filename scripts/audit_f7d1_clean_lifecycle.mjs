import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

// 1. Build comprehensive dictionary & word pool
const wordsSet = new Set();

// A. dictionary.json
try {
  const dict = JSON.parse(fs.readFileSync('src/data/dictionary.json', 'utf8'));
  Object.keys(dict).forEach(w => { if (!w.includes(' ')) wordsSet.add(w.toUpperCase()); });
} catch (e) {
  console.warn('Could not load dictionary.json:', e.message);
}

// B. Cambridge official wordlists
const wordlistFiles = [
  'starters_pre_a1.json', 'movers_a1.json', 'flyers_a2.json', 'ket_a2.json', 'pet_b1.json', 'fce_b2.json'
];
wordlistFiles.forEach(f => {
  try {
    const list = JSON.parse(fs.readFileSync('src/data/official_wordlists/' + f, 'utf8'));
    (Array.isArray(list) ? list : Object.keys(list)).forEach(item => {
      const w = typeof item === 'string' ? item : item.word;
      if (w && !w.includes(' ')) wordsSet.add(w.toUpperCase());
    });
  } catch (e) {}
});

// C. Week 33 curriculum files
['src/data/weeks/week_33', 'src/data/weeks_easy/week_33'].forEach(dir => {
  try {
    fs.readdirSync(dir).forEach(f => {
      const text = fs.readFileSync(dir + '/' + f, 'utf8');
      const matches = text.match(/[A-Za-z]{3,12}/g);
      if (matches) matches.forEach(m => wordsSet.add(m.toUpperCase()));
    });
  } catch (e) {}
});

const ALL_WORDS = Array.from(wordsSet);

// Clue / Definition mapping from curriculum (R&W Part 1 & Default Forge Words)
const CLUE_MAP = {
  "A quiet room filled with books where students study.": "LIBRARY",
  "A quiet room in school with books where students read and borrow stories.": "LIBRARY",
  "You walk along this long passage inside a school building to get to your classroom.": "CORRIDOR",
  "A trained medical worker at school who helps students when they get hurt.": "NURSE",
  "A soft piece of cloth used to cover and protect a cut or knee injury.": "BANDAGE",
  "The person in charge of managing the school who praises students for safe behaviour.": "HEADMASTER",
  "A small pool of liquid left on the floor after cleaning or rain.": "PUDDLE",
  "An open area where children play during break time.": "PLAYGROUND",
  "The place where students do experiments with goggles and chemicals.": "SCIENCE ROOM",
  "A large room at school where children eat lunch and talk with friends.": "CAFETERIA",
  "You walk up or down these steps inside the school building to go between floors.": "STAIRS",
  "A yellow sign placed on the floor to warn people to walk carefully on wet tiles.": "WARNING SIGN",
  "A bag or box containing bandages and cold packs used for immediate medical aid at school.": "FIRST-AID KIT",
  "a long passage in a building with doors on each side": "CORRIDOR",
  "a strip of material used to bind a wound or cut": "BANDAGE",
  "the resistance that one surface encounters when moving over another": "FRICTION",
  "slid accidentally on a wet surface and lost balance": "SLIPPED",
  "giving serious attention to avoid danger or mistakes": "CAREFUL"
};

function solveWord(chars, clueText) {
  // 1. Direct clue lookup if available
  const cleanClue = (clueText || '').replace(/^[“"']|[”"']$/g, '').trim();
  for (const [clueKey, target] of Object.entries(CLUE_MAP)) {
    if (cleanClue.toLowerCase().includes(clueKey.toLowerCase()) || clueKey.toLowerCase().includes(cleanClue.toLowerCase())) {
      const sortedTarget = [...target.replace(/[^A-Z]/g, '')].sort().join('');
      const sortedChars = [...chars].sort().join('');
      if (sortedTarget === sortedChars) {
        return target;
      }
    }
  }

  // 2. Anagram solver across full vocabulary pool
  const sorted = [...chars].sort().join('');
  for (const w of ALL_WORDS) {
    if (w.length === chars.length && [...w].sort().join('') === sorted) {
      return w;
    }
  }
  return null;
}

async function runF7D1CleanLifecycle() {
  console.log('=== VIỆC U: RUNNING FULL CLEAN LIFECYCLE FOR F7D1 IN A SINGLE SCRIPT ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Step 1: Navigating to Room 6 (Floor 7)...');
  await page.goto(`${BASE_URL}/week/33/chronicles?room=6&bypass=true`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 600));

  console.log('Step 2: Entering Door 0 (Word Forge Scramble)...');
  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (!doorBtns[0]) throw new Error('Door 0 enter button not found!');
  await doorBtns[0].click();
  await new Promise(r => setTimeout(r, 800));

  console.log('Step 3: Measuring inspectBefore OF THIS VERY PLAYTHROUGH...');
  const inspectBefore = await page.evaluate(() => {
    const hasLeo = Boolean(document.querySelector('.leo-character, .leo-sprite, [class*="leo-"]'));
    const hasCanvas = Boolean(document.querySelector('canvas'));
    const hasVirtualDpad = Boolean(document.querySelector('.dpad-container, .touch-controls, .virtual-stick'));
    const hasScoreOrTimer = {
      timer: document.querySelector('.hud-timer, [class*="timer"]')?.textContent?.trim() || null,
      hearts: document.querySelectorAll('.hud-heart-full, svg[class*="text-red"], [class*="heart"]').length,
    };
    const buttonsCount = document.querySelectorAll('button').length;
    const bodyText = document.body.innerText.slice(0, 300);
    return { hasLeo, hasCanvas, hasVirtualDpad, hasScoreOrTimer, buttonsCount, bodyText };
  });
  console.log('inspectBefore.bodyText captured:\n', inspectBefore.bodyText);

  console.log('Step 4: Reading clue text and scrambled letter buttons on screen...');
  const { clueText, letterMap } = await page.evaluate(() => {
    const clueEl = document.querySelector('div[style*="font-style: italic"]');
    const clue = clueEl ? clueEl.innerText.trim() : '';
    const btns = Array.from(document.querySelectorAll('button[style*="border-radius: 12px"]'));
    const map = btns.map((b, idx) => ({ idx, char: b.innerText.trim().toUpperCase() }));
    return { clueText: clue, letterMap: map };
  });
  const chars = letterMap.map(b => b.char);
  console.log('Clue text on screen:', clueText);
  console.log('Scrambled characters on screen:', chars.join(' '));

  console.log('Step 5: Determining target word for click simulation...');
  const solvedWord = solveWord(chars, clueText);
  console.log('Target word determined:', solvedWord);
  if (!solvedWord) throw new Error(`Could not solve word for letters: ${chars.join(' ')} with clue: ${clueText}`);

  console.log('Step 6: Clicking letter buttons in correct UI order...');
  const usedIndices = new Set();
  for (const ch of solvedWord) {
    const match = letterMap.find(b => b.char === ch && !usedIndices.has(b.idx));
    if (!match) throw new Error(`Letter ${ch} not found among available buttons!`);
    usedIndices.add(match.idx);
    const btns = await page.$$('button[style*="border-radius: 12px"]');
    await btns[match.idx].click();
    await new Promise(r => setTimeout(r, 140));
  }

  console.log('Step 7: Waiting 500ms for component auto-check and toast banner render...');
  await new Promise(r => setTimeout(r, 500));

  console.log('Step 8: Reading feedback text DIRECTLY from DOM toast element (div[style*="bottom: 30px"])...');
  const inspectAfter = await page.evaluate(() => {
    const bannerEl = document.querySelector('div[style*="bottom: 30px"]');
    const feedback = bannerEl ? bannerEl.innerText.trim() : null;
    return { feedback };
  });
  console.log('inspectAfter.feedback read directly from DOM:', inspectAfter.feedback);

  console.log('Step 9: Taking screenshot of completed state with visible banner...');
  const picName = 'f7d1_word_forge_scramble_live_play.png';
  const picPath = path.join(OUTPUT_DIR, picName);
  await page.screenshot({ path: picPath });
  fs.copyFileSync(picPath, path.join(BRAIN_DIR, picName));
  console.log('Screenshot saved to:', picPath);

  console.log('Step 10: Updating quick_audit_floor_6_7_evidence.json with synchronized before & after...');
  const evidencePath = path.join(OUTPUT_DIR, 'quick_audit_floor_6_7_evidence.json');
  const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
  const f7d1Entry = evidence.find(e => e.code === 'F7D1');
  if (f7d1Entry) {
    f7d1Entry.inspectBefore = inspectBefore;
    f7d1Entry.inspectAfter = inspectAfter;
    f7d1Entry.screenshot = picName;
  }
  fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 2));
  fs.copyFileSync(evidencePath, path.join(BRAIN_DIR, 'quick_audit_floor_6_7_evidence.json'));
  console.log('JSON evidence updated and synced to brain directory!');

  await page.close();
  await browser.close();
  console.log('=== VIỆC U COMPLETED SUCCESSFULLY WITH 100% SCRIPT AUTOMATION ===');
}

runF7D1CleanLifecycle().catch(err => {
  console.error('ERROR in VIỆC U:', err);
  process.exit(1);
});
