import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const TARGETS = [
  {
    code: 'F6D2',
    name: 'Connector Relay',
    room: 5,
    doorIdx: 1,
    action: async (page) => {
      // Try pressing arrow keys to see if anything moves
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await new Promise(r => setTimeout(r, 200));
      // Click an option button (e.g. first button)
      const btn = await page.$('button[style*="background: linear-gradient"]');
      if (btn) await btn.click();
      await new Promise(r => setTimeout(r, 400));
    }
  },
  {
    code: 'F6D3',
    name: 'Story Sequencer',
    room: 5,
    doorIdx: 2,
    action: async (page) => {
      // Try pressing arrow keys
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await new Promise(r => setTimeout(r, 200));
      // Click first card, then second card to test swap
      const cards = await page.$$('div[style*="cursor: pointer"]');
      if (cards.length >= 2) {
        await cards[0].click();
        await new Promise(r => setTimeout(r, 200));
        await cards[1].click();
      }
      await new Promise(r => setTimeout(r, 400));
    }
  },
  {
    code: 'F7D1',
    name: 'Word Forge Scramble',
    room: 6,
    doorIdx: 0,
    action: async (page) => {
      // Try pressing arrow keys
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await new Promise(r => setTimeout(r, 200));
      // Click letter buttons to spell
      const letterBtns = await page.$$('button[style*="border-radius: 12px"]');
      if (letterBtns.length >= 3) {
        await letterBtns[0].click();
        await new Promise(r => setTimeout(r, 150));
        await letterBtns[1].click();
        await new Promise(r => setTimeout(r, 150));
        await letterBtns[2].click();
      }
      await new Promise(r => setTimeout(r, 400));
    }
  },
  {
    code: 'F7D2',
    name: 'Question Quest',
    room: 6,
    doorIdx: 1,
    action: async (page) => {
      // Try pressing arrow keys
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await new Promise(r => setTimeout(r, 200));
      // Click one of the 3 question option cards
      const options = await page.$$('button[style*="border: 2px solid"]');
      if (options.length >= 1) {
        await options[0].click();
      }
      await new Promise(r => setTimeout(r, 400));
    }
  },
  {
    code: 'F7D3',
    name: 'Word Class Duel',
    room: 6,
    doorIdx: 2,
    action: async (page) => {
      // Try pressing arrow keys
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowUp');
      await new Promise(r => setTimeout(r, 200));
      // Click one of the 4 cards
      const cards = await page.$$('button[style*="cursor: pointer"]');
      if (cards.length >= 1) {
        await cards[0].click();
      }
      await new Promise(r => setTimeout(r, 400));
    }
  },
];

async function main() {
  console.log('=== QUICK AUDIT: 5 GAMES IN FLOOR 6-7 ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const report = [];

  for (const t of TARGETS) {
    console.log(`\nTesting ${t.code} — ${t.name} (Room ${t.room}, Door ${t.doorIdx})...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const roomUrl = `${BASE_URL}/week/33/chronicles?room=${t.room}&bypass=true`;
    await page.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 600));

    // Click door enter button
    const doorBtns = await page.$$('.dr-door-enter-btn');
    if (!doorBtns[t.doorIdx]) {
      console.error(`Door index ${t.doorIdx} not found in room ${t.room}! Available doors: ${doorBtns.length}`);
      await page.close();
      continue;
    }

    await doorBtns[t.doorIdx].click();
    await new Promise(r => setTimeout(r, 800));

    // Inspect game environment before action
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

    // Execute gameplay interaction
    await t.action(page);

    // Inspect after action
    const inspectAfter = await page.evaluate(() => {
      const feedback = document.querySelector('[class*="feedback"], [style*="color: rgb(34, 197, 94)"], [style*="color: rgb(239, 68, 68)"]')?.textContent?.trim() || null;
      return { feedback };
    });

    // Capture screenshot
    const picName = `${t.code.toLowerCase()}_${t.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_live_play.png`;
    const picPath = path.join(OUTPUT_DIR, picName);
    await page.screenshot({ path: picPath });
    fs.copyFileSync(picPath, path.join(BRAIN_DIR, picName));
    console.log(`Saved screenshot: ${picName}`);

    report.push({
      code: t.code,
      name: t.name,
      inspectBefore,
      inspectAfter,
      screenshot: picName
    });

    await page.close();
  }

  await browser.close();

  const reportPath = path.join(OUTPUT_DIR, 'quick_audit_floor_6_7_evidence.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nAudit complete! Evidence saved to ${reportPath}`);
}

main().catch(console.error);
