import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function runSurvey() {
  console.log('=== STARTING QUICK SURVEY OF FLOOR 6 & FLOOR 7 GAMES ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const gamesToSurvey = [
    {
      code: 'F6D2',
      name: 'Connector Relay',
      room: 5,
      doorIdx: 1,
      filename: 'f6d2_connector_relay.png'
    },
    {
      code: 'F6D3',
      name: 'Story Sequencer',
      room: 5,
      doorIdx: 2,
      filename: 'f6d3_story_sequencer.png'
    },
    {
      code: 'F7D1',
      name: 'Word Forge Scramble',
      room: 6,
      doorIdx: 0,
      filename: 'f7d1_word_forge_scramble.png'
    },
    {
      code: 'F7D2',
      name: 'Question Quest',
      room: 6,
      doorIdx: 1,
      filename: 'f7d2_question_quest.png'
    },
    {
      code: 'F7D3',
      name: 'Word Class Duel',
      room: 6,
      doorIdx: 2,
      filename: 'f7d3_word_class_duel.png'
    }
  ];

  const surveyResults = [];

  for (const item of gamesToSurvey) {
    console.log(`\n--- Surveying ${item.code}: ${item.name} ---`);
    const roomUrl = `${BASE_URL}/week/33/chronicles?room=${item.room}&bypass=true`;
    await page.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));

    // Find and click the corresponding door button
    const doorBtns = await page.$$('.dr-door-enter-btn');
    if (doorBtns.length <= item.doorIdx) {
      console.error(`Door index ${item.doorIdx} not found! Found ${doorBtns.length} doors.`);
      continue;
    }

    await doorBtns[item.doorIdx].click();
    await new Promise(r => setTimeout(r, 1500));

    // Capture screenshot
    const outPath = path.join(OUTPUT_DIR, item.filename);
    await page.screenshot({ path: outPath });
    console.log(`📸 Saved screenshot: ${outPath}`);

    // Copy to brain directory for embedding
    const brainPath = path.join(BRAIN_DIR, item.filename);
    fs.copyFileSync(outPath, brainPath);

    // Extract DOM inspection
    const domText = await page.evaluate(() => {
      return {
        title: document.title,
        bodySnippet: document.body.innerText.slice(0, 400),
        buttons: Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean),
        hasCanvas: !!document.querySelector('canvas'),
        hasPhaser: !!window.Phaser,
        hasLeoSprite: !!document.querySelector('.leo-sprite, .leo-character, .titan-leo, [class*="leo"]'),
        numInputs: document.querySelectorAll('input').length,
      };
    });

    console.log('DOM info:', {
      buttons: domText.buttons.slice(0, 8),
      hasCanvas: domText.hasCanvas,
      hasLeoSprite: domText.hasLeoSprite
    });

    surveyResults.push({
      code: item.code,
      name: item.name,
      room: item.room,
      doorIdx: item.doorIdx,
      screenshot: item.filename,
      domText
    });
  }

  const resultFile = path.join(OUTPUT_DIR, 'survey_floor_6_7_evidence.json');
  fs.writeFileSync(resultFile, JSON.stringify(surveyResults, null, 2));
  console.log(`\n✅ Survey completed. Results written to ${resultFile}`);

  await browser.close();
}

runSurvey().catch(err => {
  console.error('Survey error:', err);
  process.exit(1);
});
