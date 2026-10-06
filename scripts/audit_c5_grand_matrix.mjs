import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';
const SCREENSHOT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';

async function runAudit() {
  console.log('--- STARTING C5 (Grand Master Matrix) AUDIT ---');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleLogs = [];
  const audioCalls = [];

  page.on('console', msg => {
    const txt = msg.text();
    consoleLogs.push(`[${msg.type()}] ${txt}`);
    if (txt.includes('AUDIO_CALL') || txt.includes('speakText') || txt.includes('VoiceService')) {
      audioCalls.push(txt);
    }
  });

  // Navigate to Room 4 with owner mode
  console.log('Navigating to Room 4 (Floor 5)...');
  await page.goto('http://localhost:5173/week/33/chronicles?room=4&owner=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // Install audio hook
  await page.evaluate(() => {
    window.__audioCalls = [];
    if (window.speechSynthesis) {
      const origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
      window.speechSynthesis.speak = function(utterance) {
        window.__audioCalls.push({
          type: 'speechSynthesis.speak',
          text: utterance.text,
          voice: utterance.voice ? utterance.voice.name : null,
          time: new Date().toISOString()
        });
        console.log('[AUDIO_CALL] speechSynthesis.speak:', utterance.text);
        return origSpeak(utterance);
      };
    }
  });

  // Click Chest 1 (Door 0)
  console.log('Clicking Open Chest 1 (Grand Master Matrix)...');
  const openChestBtn = await page.$('.dr-door-enter-btn');
  if (openChestBtn) {
    await openChestBtn.click();
    await new Promise(r => setTimeout(r, 1500));
  } else {
    console.error('Chest 1 button not found!');
  }

  // 1. DESKTOP BASELINE
  console.log('Capturing Desktop Baseline...');
  const desktopBaselinePath1 = path.join(ARTIFACT_DIR, 'c5_grand_matrix_desktop_baseline.png');
  const desktopBaselinePath2 = path.join(SCREENSHOT_DIR, 'c5_grand_matrix_desktop_baseline.png');
  await page.screenshot({ path: desktopBaselinePath1 });
  await page.screenshot({ path: desktopBaselinePath2 });

  // Get DOM details
  const desktopState = await page.evaluate(() => {
    const banner = document.querySelector('.matrix-dungeon-banner');
    const defText = document.querySelector('.matrix-def-text')?.textContent?.trim() || '';
    const roundChip = document.querySelector('.matrix-round-chip')?.textContent?.trim() || '';
    const glyphs = Array.from(document.querySelectorAll('.matrix-glyph-entity')).map(el => ({
      word: el.querySelector('.glyph-text')?.textContent?.trim() || '',
      rect: el.getBoundingClientRect()
    }));
    const hudScore = document.querySelector('.hud-score-text')?.textContent?.trim() || '';
    const hudHearts = Array.from(document.querySelectorAll('.hud-heart')).map(h => h.textContent?.trim());
    const guideBtn = document.querySelector('.guide-trigger-btn, .game-guide-btn, [data-testid="guide-btn"], .btn-guide');
    return {
      bannerText: banner?.innerText?.replace(/\n/g, ' ') || '',
      defText,
      roundChip,
      glyphs,
      hudScore,
      hudHearts,
      hasGuideBtn: !!guideBtn
    };
  });

  console.log('Desktop State:', JSON.stringify(desktopState, null, 2));

  // 2. MOBILE VIEW (390x844)
  console.log('Setting Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 1000));

  const mobileBaselinePath1 = path.join(ARTIFACT_DIR, 'c5_grand_matrix_mobile_baseline.png');
  const mobileBaselinePath2 = path.join(SCREENSHOT_DIR, 'c5_grand_matrix_mobile_baseline.png');
  await page.screenshot({ path: mobileBaselinePath1 });
  await page.screenshot({ path: mobileBaselinePath2 });

  const mobileMeasurements = await page.evaluate(() => {
    const banner = document.querySelector('.matrix-dungeon-banner');
    const bRect = banner?.getBoundingClientRect();
    const hud = document.querySelector('.hud-overlay');
    const hRect = hud?.getBoundingClientRect();
    const exitBtn = document.querySelector('.floating-exit-btn');
    const eRect = exitBtn?.getBoundingClientRect();
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      banner: bRect ? { left: bRect.left, right: bRect.right, top: bRect.top, width: bRect.width } : null,
      hud: hRect ? { top: hRect.top, height: hRect.height } : null,
      exitBtn: eRect ? { left: eRect.left, top: eRect.top, width: eRect.width } : null
    };
  });

  console.log('Mobile Measurements:', JSON.stringify(mobileMeasurements, null, 2));

  // Switch back to desktop for action verification
  await page.setViewport({ width: 1280, height: 800 });
  await new Promise(r => setTimeout(r, 1000));

  // 3. INTERACTIVE ACTION TEST: Click correct node vs wrong node
  console.log('Testing Interactive Action...');
  // Inspect internal state to know which glyph is the target
  const targetInfo = await page.evaluate(() => {
    // Find glyphs in DOM
    const glyphEls = Array.from(document.querySelectorAll('.matrix-glyph-entity'));
    const def = document.querySelector('.matrix-def-text')?.textContent?.replace(/["']/g, '')?.trim() || '';
    return {
      def,
      glyphCount: glyphEls.length,
      words: glyphEls.map(g => g.querySelector('.glyph-text')?.textContent?.trim())
    };
  });
  console.log('Target query info:', targetInfo);

  // Click the first glyph to see result
  console.log('Clicking first glyph node entity...');
  const firstGlyph = await page.$('.matrix-glyph-entity');
  if (firstGlyph) {
    await firstGlyph.click();
    await new Promise(r => setTimeout(r, 500));
  }

  // Capture after action
  const afterActionPath1 = path.join(ARTIFACT_DIR, 'c5_grand_matrix_after_action.png');
  const afterActionPath2 = path.join(SCREENSHOT_DIR, 'c5_grand_matrix_after_action.png');
  await page.screenshot({ path: afterActionPath1 });
  await page.screenshot({ path: afterActionPath2 });

  const afterActionState = await page.evaluate(() => {
    const toast = document.querySelector('.matrix-feedback-toast');
    const hudScore = document.querySelector('.hud-score-text')?.textContent?.trim() || '';
    const hudHearts = Array.from(document.querySelectorAll('.hud-heart')).map(h => h.textContent?.trim());
    const audioCalls = window.__audioCalls || [];
    return {
      toastText: toast?.textContent?.trim() || '',
      toastClass: toast?.className || '',
      hudScore,
      hudHearts,
      audioCalls
    };
  });

  console.log('After Action State:', JSON.stringify(afterActionState, null, 2));

  // Save full audit evidence JSON
  const evidence = {
    gameId: 'grand_matrix',
    gameName: 'Grand Master Matrix',
    component: 'GrandMatrixDungeon.jsx',
    timestamp: new Date().toISOString(),
    desktopState,
    mobileMeasurements,
    afterActionState,
    consoleLogs: consoleLogs.slice(-20),
    screenshots: {
      desktopBaseline: 'c5_grand_matrix_desktop_baseline.png',
      mobileBaseline: 'c5_grand_matrix_mobile_baseline.png',
      afterAction: 'c5_grand_matrix_after_action.png'
    }
  };

  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'c5_grand_matrix_evidence.json'),
    JSON.stringify(evidence, null, 2)
  );

  await browser.close();
  console.log('--- C5 AUDIT COMPLETE ---');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
