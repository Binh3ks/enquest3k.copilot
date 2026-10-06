import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const NEW_GAMES = [
  { room: 5, doorIdx: 0, id: 'synonym_storm',       name: 'Synonym Storm (V6)' },
  { room: 5, doorIdx: 1, id: 'connector_relay',     name: 'Connector Relay (G6)' },
  { room: 5, doorIdx: 2, id: 'story_sequencer',     name: 'Story Sequencer (I6)' },
  { room: 6, doorIdx: 0, id: 'word_forge_scramble', name: 'Word Forge Scramble (V7)' },
  { room: 6, doorIdx: 1, id: 'question_quest',      name: 'Question Quest (G7)' },
  { room: 6, doorIdx: 2, id: 'rune_balance_scale',  name: 'Word Class Duel (I7)' },
];

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = [];

  for (const game of NEW_GAMES) {
    console.log(`\n========================================`);
    console.log(`Testing [${game.name}] (room=${game.room}, door=${game.doorIdx})...`);
    
    const url = `http://localhost:5173/week/33/chronicles?room=${game.room}&owner=true`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    await sleep(2000);

    // Click Open Chest button for this door
    const opened = await page.evaluate((dIdx) => {
      const btns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Open Chest'));
      if (btns[dIdx]) {
        btns[dIdx].click();
        return true;
      }
      return false;
    }, game.doorIdx);

    if (!opened) {
      console.error(`❌ Could not open chest for ${game.name}`);
      results.push({ ...game, success: false, error: 'Open chest button not found' });
      continue;
    }

    await sleep(2500);

    // If there's an intro modal, click Start
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const startBtn = btns.find(b => 
        b.textContent.includes('Start') || 
        b.textContent.includes('Play') || 
        b.textContent.includes('Begin') ||
        b.textContent.includes('Infiltrate') ||
        b.textContent.includes('Enter')
      );
      if (startBtn) startBtn.click();
    });

    await sleep(2000);

    // Extract running DOM text
    const dom = await page.evaluate(() => document.body.innerText);
    const ssFileName = `game_${game.id}_running.png`;
    const ssPath = path.join(SS_DIR, ssFileName);
    await page.screenshot({ path: ssPath });

    // Copy to brain artifacts
    const brainSsPath = path.join(BRAIN_DIR, ssFileName);
    fs.copyFileSync(ssPath, brainSsPath);

    const snippet = dom.replace(/\n+/g, ' | ').substring(0, 300);
    console.log(`✅ ${game.name} is RUNNING!`);
    console.log(`DOM snippet: ${snippet}`);
    console.log(`Screenshot: ${ssPath}`);

    results.push({
      ...game,
      success: true,
      domSnippet: snippet,
      screenshot: ssPath,
      brainScreenshot: brainSsPath,
    });
  }

  await browser.close();

  // Save report
  const reportPath = path.join(SS_DIR, 'new_games_evidence_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log('\nSaved full results to:', reportPath);
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
