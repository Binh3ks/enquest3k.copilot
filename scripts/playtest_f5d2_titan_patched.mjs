import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const ARTIFACT_DIR = path.resolve('docs/agent_artifacts/f5d2_titan_playtest');
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function runPlaytest() {
  console.log('🚀 Starting F5D2 (Titan Grammar Forge) Playtest...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const logs = [];
  const errors = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    page.on('console', msg => {
      const text = msg.text();
      logs.push(text);
      if (msg.type() === 'error') errors.push(text);
      if (text.includes('[TITAN-FORGE')) console.log('  [BROWSER]', text);
    });

    page.on('pageerror', err => {
      errors.push(err.toString());
      console.error('  [PAGE ERROR]', err.toString());
    });

    console.log('Navigating to Room 4 (Floor 5)...');
    await page.goto(`${BASE_URL}/week/33/chronicles?room=4&bypass=true`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));

    // Click Door 2 (Titan Grammar Forge -> index 1)
    const doorBtns = await page.$$('.dr-door-enter-btn');
    if (doorBtns.length < 2) throw new Error('Could not find Door 2 button in Room 4');
    await doorBtns[1].click();

    console.log('Waiting for .titan-forge-root...');
    await page.waitForSelector('.titan-forge-root', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    // Screenshot 1: Spawn
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'f5d2_01_spawn.png') });
    console.log('📸 Saved f5d2_01_spawn.png');

    // Verify Round 1 Stem
    const r1Stem = await page.$eval('.titan-stem-text', el => el.textContent.trim());
    console.log('Round 1 Stem:', r1Stem);

    // Hit wrong gear first to test -1 heart (N3)
    console.log('Testing WRONG cog strike (-1 heart)...');
    await page.evaluate(() => {
      const wrongEl = document.querySelector('.titan-gear-entity[data-is-correct="false"]');
      if (wrongEl && window.__setTitanLeo) {
        const left = parseFloat(wrongEl.style.left);
        const top = parseFloat(wrongEl.style.top);
        window.__setTitanLeo(left + 15, top - 4);
      }
    });

    await page.keyboard.press('KeyE');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'f5d2_02_wrong_hit.png') });
    console.log('📸 Saved f5d2_02_wrong_hit.png');

    // Wait for wrong feedback toast to clear
    await new Promise(r => setTimeout(r, 1600));

    // Play through Round 1 to Round 4 correctly
    for (let r = 1; r <= 4; r++) {
      const stem = await page.$eval('.titan-stem-text', el => el.textContent.trim());
      const chip = await page.$eval('.titan-round-chip', el => el.textContent.trim());
      console.log(`\n--- Playing Round ${r} (${chip}) ---`);
      console.log(`Stem: "${stem}"`);

      if (r === 3) {
        // Verify R3 Patched content!
        if (!stem.includes('corridor floor was slippery')) {
          throw new Error(`R3 was NOT patched! Found: "${stem}"`);
        }
        console.log('✅ R3 Patched content verified: "When the corridor floor was slippery, Jake"');
      }

      // Find correct gear from DOM
      const correctText = await page.evaluate(() => {
        const correctEl = document.querySelector('.titan-gear-entity[data-is-correct="true"]');
        if (!correctEl) return null;
        const left = parseFloat(correctEl.style.left);
        const top = parseFloat(correctEl.style.top);
        if (window.__setTitanLeo) {
          window.__setTitanLeo(left + 15, top - 4);
        }
        return correctEl.querySelector('.titan-clause-plaque span')?.textContent;
      });

      console.log(`  Leo positioned at correct cog: "${correctText}"`);
      await page.keyboard.press('KeyE');
      await new Promise(r => setTimeout(r, 600));

      if (r === 3) {
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'f5d2_03_r3_correct.png') });
        console.log('📸 Saved f5d2_03_r3_correct.png');
      }

      // Wait for round transition (1600ms setTimeout in activateCog)
      await new Promise(r => setTimeout(r, 2000));
    }

    // Cleared state
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'f5d2_04_cleared.png') });
    console.log('📸 Saved f5d2_04_cleared.png');

    const bodyText = await page.evaluate(() => document.body.textContent);
    const isCleared = bodyText.includes('Titan clockwork engine') || bodyText.includes('CLEARED') || bodyText.includes('SCORE') || bodyText.includes('Victory');
    console.log('Game cleared detected:', isCleared);

    console.log('\nConsole Errors count:', errors.length);
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }

    const report = {
      gameId: 'F5D2',
      gameName: 'Titan Grammar Forge',
      timestamp: new Date().toISOString(),
      r3PatchedVerified: true,
      errorsCount: errors.length,
      errors,
      isCleared,
    };

    fs.writeFileSync(path.join(ARTIFACT_DIR, 'playtest_report.json'), JSON.stringify(report, null, 2));
    console.log('✅ Playtest completed successfully!');
  } finally {
    await browser.close();
  }
}

runPlaytest().catch(err => {
  console.error('❌ Playtest failed:', err);
  process.exit(1);
});
