import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

async function playtestSynonymStorm(page, weekNumber, screenshotPrefix) {
  console.log(`\n================================================================`);
  console.log(`>>> PLAYTESTING SYNONYM STORM DEFENSE ON WEEK ${weekNumber} <<<`);
  console.log(`================================================================`);

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    errors.push(`Page Error: ${err.message}`);
  });

  const url = `${BASE_URL}/week/${weekNumber}/chronicles?room=5&bypass=true`;
  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 800));

  // Enter Door 0 (Synonym Storm)
  const doorBtns = await page.$$('.dr-door-enter-btn');
  if (!doorBtns || doorBtns.length === 0) {
    throw new Error(`No door enter buttons found at ${url}`);
  }
  console.log(`Found ${doorBtns.length} doors in Room 5. Clicking Door 0 (Synonym Storm)...`);
  await doorBtns[0].click();

  // Wait for game to mount and meteors to start falling
  await new Promise(r => setTimeout(r, 2200));

  // Extract initial game state from DOM
  const initialData = await page.evaluate(() => {
    const rootWord = document.querySelector('.synonym-root-word')?.innerText?.trim() || '';
    const targetLabel = document.querySelector('.synonym-target-label')?.innerText?.trim() || '';
    const batteryPct = document.querySelector('.battery-pct')?.innerText?.trim() || '';
    const roundChip = document.querySelector('.synonym-round-chip')?.innerText?.trim() || '';
    const meteors = Array.from(document.querySelectorAll('.falling-synonym-meteor')).map(m => ({
      word: m.querySelector('.meteor-word')?.innerText?.trim() || '',
      isSynonym: m.classList.contains('meteor-synonym'),
      isHazard: m.classList.contains('meteor-hazard'),
      styleLeft: m.style.left,
      styleTop: m.style.top,
    }));
    const hasShieldAura = Boolean(document.querySelector('.aegis-shield-aura'));
    const platforms = document.querySelectorAll('.spire-platform').length;
    const bodySnippet = document.body.innerText.slice(0, 400);

    return {
      rootWord,
      targetLabel,
      batteryPct,
      roundChip,
      meteorCount: meteors.length,
      meteors,
      hasShieldAura,
      platforms,
      bodySnippet,
    };
  });

  console.log(`[W${weekNumber} Initial State]:`);
  console.log(`  - Target Label: "${initialData.targetLabel}"`);
  console.log(`  - Root Word: "${initialData.rootWord}"`);
  console.log(`  - Battery: ${initialData.batteryPct}`);
  console.log(`  - Round: ${initialData.roundChip}`);
  console.log(`  - Aegis Shield Aura: ${initialData.hasShieldAura}`);
  console.log(`  - Spire Platforms: ${initialData.platforms}`);
  console.log(`  - Falling Meteors (${initialData.meteorCount}):`, initialData.meteors);

  // Take screenshot 1: Mid-storm falling state
  const screen1Path = path.join(OUTPUT_DIR, `${screenshotPrefix}_falling_storm.png`);
  await page.screenshot({ path: screen1Path });
  fs.copyFileSync(screen1Path, path.join(BRAIN_DIR, `${screenshotPrefix}_falling_storm.png`));
  console.log(`Screenshot 1 saved to: ${screen1Path}`);

  // Now simulate active gameplay: Move Leo towards falling meteors or jump to deflect!
  console.log(`Simulating keyboard inputs: Leo moving left, right and jumping with Aegis Shield...`);
  await page.keyboard.down('ArrowLeft');
  await new Promise(r => setTimeout(r, 400));
  await page.keyboard.up('ArrowLeft');
  await page.keyboard.down('ArrowUp'); // Jump!
  await new Promise(r => setTimeout(r, 200));
  await page.keyboard.up('ArrowUp');
  await page.keyboard.down('ArrowRight');
  await new Promise(r => setTimeout(r, 600));
  await page.keyboard.up('ArrowRight');

  // Wait additional 3.5s for more meteors and collision resolution
  await new Promise(r => setTimeout(r, 3500));

  // Extract updated game state and event logs
  const updatedData = await page.evaluate(() => {
    const batteryPct = document.querySelector('.battery-pct')?.innerText?.trim() || '';
    const scoreText = document.querySelector('.hud-score, [class*="score"]')?.innerText?.trim() || '';
    const feedbackText = document.querySelector('.synonym-feedback-toast')?.innerText?.trim() || '';
    const eventLogs = window.__SYNONYM_STORM_EVENT_LOG__ || [];
    const activeMeteors = Array.from(document.querySelectorAll('.falling-synonym-meteor')).map(m => ({
      word: m.querySelector('.meteor-word')?.innerText?.trim() || '',
      isSynonym: m.classList.contains('meteor-synonym'),
    }));
    return {
      batteryPct,
      scoreText,
      feedbackText,
      eventLogs,
      activeMeteorCount: activeMeteors.length,
      activeMeteors,
    };
  });

  console.log(`[W${weekNumber} Gameplay Progression]:`);
  console.log(`  - Battery Pct: ${updatedData.batteryPct}`);
  console.log(`  - Active Meteors Count: ${updatedData.activeMeteorCount}`);
  console.log(`  - Feedback Toast: "${updatedData.feedbackText}"`);
  console.log(`  - Deflection / Collision Event Logs (${updatedData.eventLogs.length}):`, updatedData.eventLogs);

  // Take screenshot 2: Post-action state
  const screen2Path = path.join(OUTPUT_DIR, `${screenshotPrefix}_active_deflection.png`);
  await page.screenshot({ path: screen2Path });
  fs.copyFileSync(screen2Path, path.join(BRAIN_DIR, `${screenshotPrefix}_active_deflection.png`));
  console.log(`Screenshot 2 saved to: ${screen2Path}`);

  // Test exit back to room
  const exitBtn = await page.$('.floating-exit-btn, button');
  if (exitBtn) {
    console.log('Clicking Exit/Chamber button to verify clean exit contract...');
    await exitBtn.click();
    await new Promise(r => setTimeout(r, 800));
    const backInRoom = await page.evaluate(() => Boolean(document.querySelector('.dr-door-enter-btn')));
    console.log(`Successfully returned to Chamber room: ${backInRoom}`);
  }

  return {
    weekNumber,
    initialData,
    updatedData,
    errors,
    screenshots: [
      `${screenshotPrefix}_falling_storm.png`,
      `${screenshotPrefix}_active_deflection.png`,
    ]
  };
}

async function runSuite() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 750 });

    // Test Week 33 (Handwritten: careful -> cautious, prevent -> stop, etc.)
    const resW33 = await playtestSynonymStorm(page, 33, 'w33_synonym_storm');

    // Test Week 35 (Generic fallback / un-hardcoded: brave -> courageous, clever -> smart, etc.)
    const resW35 = await playtestSynonymStorm(page, 35, 'w35_synonym_storm');

    console.log('\n================================================================');
    console.log('>>> SUMMARY OF PLAYTEST RESULTS <<<');
    console.log('================================================================');
    console.log(`Week 33 Root Word: "${resW33.initialData.rootWord}" | Meteors: ${resW33.initialData.meteorCount} | Shield: ${resW33.initialData.hasShieldAura}`);
    console.log(`Week 33 Console/Page Errors: ${resW33.errors.length}`);
    console.log(`Week 35 Root Word: "${resW35.initialData.rootWord}" | Meteors: ${resW35.initialData.meteorCount} | Shield: ${resW35.initialData.hasShieldAura}`);
    console.log(`Week 35 Console/Page Errors: ${resW35.errors.length}`);

    if (resW33.errors.length === 0 && resW35.errors.length === 0) {
      console.log('>>> VERDICT: ALL TESTS PASSED! 0 CONSOLE ERRORS. CLEAN REDESIGN PLAYTEST! <<<');
    } else {
      console.error('>>> VERDICT: ERRORS DETECTED! <<<', { w33Errors: resW33.errors, w35Errors: resW35.errors });
    }
  } catch (err) {
    console.error('Test Suite Failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runSuite();
