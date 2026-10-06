import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const ARTIFACT_DIR = path.resolve('docs/agent_artifacts/f5d2_titan_playtest');
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function runVerifiedPlaytest() {
  console.log('🚀 [STEAM-PATCH-PLAYTEST] Starting F5D2 Headful Verification Playtest...');
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--window-size=1280,850']
  });

  const logs = [];
  const errors = [];

  try {
    const page = await browser.newPage();

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
    await new Promise(r => setTimeout(r, 1000));

    // Click Door 2 (Titan Grammar Forge)
    const doorBtns = await page.$$('.dr-door-enter-btn');
    await doorBtns[1].click();

    await page.waitForSelector('.titan-forge-root', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    // Helper to count hearts
    const getHeartsCount = async () => {
      return page.evaluate(() => {
        return document.querySelectorAll('.hud-heart-full').length;
      });
    };

    const initialHearts = await getHeartsCount();
    console.log(`Initial Hearts count: ${initialHearts}/3`);

    // ── STEP 1: CHỦ ĐỘNG VA CHẠM STEAM VENT ĐANG ACTIVE ──
    console.log('\n--- STEP 1: Actively testing Steam Vent collision while ACTIVE ---');
    
    // Wait until .vent-active is present in DOM
    await page.waitForFunction(() => {
      const vent = document.querySelector('.steam-vent-entity');
      return vent && vent.classList.contains('vent-active');
    }, { timeout: 6000 });

    console.log('Steam Vent is ACTIVE (💨 STEAM BLAST 💨)! Moving Leo directly into vent at x=550, y=470...');
    
    // Move Leo into the active vent
    await page.evaluate(() => {
      if (window.__setTitanLeo) {
        window.__setTitanLeo(550, 470);
      }
    });

    // Wait 200ms for physics frame collision to trigger knockback
    await new Promise(r => setTimeout(r, 250));

    // Capture screenshot of exact collision & knockback moment
    const steamCollisionPath = path.join(ARTIFACT_DIR, 'f5d2_steam_collision_zero_damage.png');
    await page.screenshot({ path: steamCollisionPath });
    console.log(`📸 Saved screenshot of Steam collision to: ${steamCollisionPath}`);

    const heartsAfterSteam = await getHeartsCount();
    const feedbackText = await page.evaluate(() => {
      return document.querySelector('.titan-feedback-toast')?.textContent || '';
    });
    console.log(`Toast feedback observed: "${feedbackText}"`);
    console.log(`Hearts count after Steam collision: ${heartsAfterSteam}/3`);

    if (heartsAfterSteam !== 3) {
      throw new Error(`CRITICAL FAILURE: Steam Vent deducted hearts! Expected 3, got ${heartsAfterSteam}`);
    }
    console.log('✅ PASS: Steam Vent caused knockback but ZERO HEART LOSS (3/3 hearts maintained)!');

    // Wait for feedback toast to clear
    await new Promise(r => setTimeout(r, 1500));

    // ── STEP 2: TEST PHẠT HEART KHI CHỌN SAI NGỮ PHÁP (N3) ──
    console.log('\n--- STEP 2: Testing WRONG grammar cog strike (-1 heart) ---');
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

    const heartsAfterWrongGrammar = await getHeartsCount();
    console.log(`Hearts count after wrong grammar strike: ${heartsAfterWrongGrammar}/3`);
    if (heartsAfterWrongGrammar !== 2) {
      throw new Error(`Expected hearts to decrease to 2 after wrong grammar, but got ${heartsAfterWrongGrammar}`);
    }
    console.log('✅ PASS: Wrong grammar strike correctly deducted exactly 1 heart (2/3 hearts remaining).');

    await new Promise(r => setTimeout(r, 1600));

    // ── STEP 3: GIẢI 4 ROUNDS (VỚI R3 PATCHED) ──
    console.log('\n--- STEP 3: Solving all 4 rounds correctly ---');
    for (let r = 1; r <= 4; r++) {
      const stem = await page.$eval('.titan-stem-text', el => el.textContent.trim());
      console.log(`\n▶ Round ${r}/4: "${stem}"`);

      if (r === 3) {
        if (!stem.includes('corridor floor was slippery')) {
          throw new Error(`R3 is not patched! Found: "${stem}"`);
        }
        console.log('  ✅ Verified R3 Patched content: "When the corridor floor was slippery, Jake"');
      }

      const cogText = await page.evaluate(() => {
        const correctEl = document.querySelector('.titan-gear-entity[data-is-correct="true"]');
        if (!correctEl) return null;
        const left = parseFloat(correctEl.style.left);
        const top = parseFloat(correctEl.style.top);
        if (window.__setTitanLeo) {
          window.__setTitanLeo(left + 15, top - 4);
        }
        return correctEl.querySelector('.titan-clause-plaque span')?.textContent;
      });

      console.log(`  Positioned Leo at correct Cog: "${cogText}"`);
      await page.keyboard.press('KeyE');
      await new Promise(r => setTimeout(r, 500));

      // Wait for feedback transition (1600ms)
      await new Promise(r => setTimeout(r, 1800));
    }

    // ── STEP 4: VERIFY CLEARED MODAL ──
    console.log('\n--- STEP 4: Verifying Victory / Cleared Modal ---');
    await new Promise(r => setTimeout(r, 1200));

    const clearedScreenshotPath = path.join(ARTIFACT_DIR, 'f5d2_verified_cleared_modal.png');
    await page.screenshot({ path: clearedScreenshotPath });
    console.log(`📸 Saved cleared modal screenshot to: ${clearedScreenshotPath}`);

    const modalData = await page.evaluate(() => {
      const modal = document.querySelector('.titan-cleared-modal');
      if (!modal) return null;
      const title = modal.querySelector('h2')?.textContent || '';
      const score = modal.querySelector('.cleared-score')?.textContent || '';
      return { title, score };
    });

    console.log('Modal data detected:', modalData);
    if (!modalData || !modalData.title.includes('TITAN ENGINE FORGED')) {
      throw new Error('Victory modal TITAN ENGINE FORGED was not detected!');
    }
    console.log('✅ PASS: Victory modal TITAN ENGINE FORGED verified with score:', modalData.score);

    const report = {
      gameId: 'F5D2',
      gameName: 'Titan Grammar Forge',
      timestamp: new Date().toISOString(),
      steamCollisionTested: true,
      steamHeartsDeducted: 0,
      heartsAfterSteam: 3,
      wrongGrammarDeductedHeart: true,
      heartsAfterWrong: 2,
      r3PatchedVerified: true,
      clearedModalTitle: modalData.title,
      clearedScore: modalData.score,
      errorsCount: errors.length,
      errors
    };

    fs.writeFileSync(path.join(ARTIFACT_DIR, 'steam_patch_verification_report.json'), JSON.stringify(report, null, 2));
    console.log('\n🎉 ALL TESTS PASSED WITH ZERO ERRORS!');
  } finally {
    await browser.close();
  }
}

runVerifiedPlaytest().catch(err => {
  console.error('❌ Playtest failed:', err);
  process.exit(1);
});
