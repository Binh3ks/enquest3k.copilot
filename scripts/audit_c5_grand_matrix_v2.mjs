import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';
const SCREENSHOT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';

async function runAudit() {
  console.log('--- STARTING C5 (Grand Master Matrix) AUDIT V2 ---');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));

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
  }

  // 1. DESKTOP BASELINE
  console.log('Capturing Desktop Baseline...');
  const desktopBaselinePath1 = path.join(ARTIFACT_DIR, 'c5_grand_matrix_desktop_baseline.png');
  const desktopBaselinePath2 = path.join(SCREENSHOT_DIR, 'c5_grand_matrix_desktop_baseline.png');
  await page.screenshot({ path: desktopBaselinePath1 });
  await page.screenshot({ path: desktopBaselinePath2 });

  // 2. GUIDE MODAL VERIFICATION
  console.log('Testing Guide Modal...');
  const guideBtn = await page.$('.matrix-help-btn');
  let guideModalText = '';
  if (guideBtn) {
    await guideBtn.click();
    await new Promise(r => setTimeout(r, 500));

    const guideModalPath1 = path.join(ARTIFACT_DIR, 'c5_grand_matrix_guide_modal.png');
    const guideModalPath2 = path.join(SCREENSHOT_DIR, 'c5_grand_matrix_guide_modal.png');
    await page.screenshot({ path: guideModalPath1 });
    await page.screenshot({ path: guideModalPath2 });

    guideModalText = await page.evaluate(() => {
      const modal = document.querySelector('.gim-overlay, .instruction-modal, [class*=\"modal\"]');
      return modal?.innerText || '';
    });
    console.log('Guide Modal Text Verbatim:\n', guideModalText);

    // Close guide modal via Resume Game button or X
    const closeSuccess = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const resumeBtn = btns.find(b => b.textContent.includes('Resume Game') || b.textContent.includes('Start'));
      if (resumeBtn) {
        resumeBtn.click();
        return true;
      }
      return false;
    });
    console.log('Close guide modal clicked:', closeSuccess);
    await new Promise(r => setTimeout(r, 600));
  } else {
    console.error('Guide button .matrix-help-btn not found!');
  }

  // 3. MOBILE VIEW (390x844)
  console.log('Setting Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 1000));

  const mobileBaselinePath1 = path.join(ARTIFACT_DIR, 'c5_grand_matrix_mobile_baseline.png');
  const mobileBaselinePath2 = path.join(SCREENSHOT_DIR, 'c5_grand_matrix_mobile_baseline.png');
  await page.screenshot({ path: mobileBaselinePath1 });
  await page.screenshot({ path: mobileBaselinePath2 });

  const mobileMeasurements = await page.evaluate(() => {
    const banner = document.querySelector('.matrix-dungeon-banner');
    const bRect = banner ? banner.getBoundingClientRect() : null;
    const hud = document.querySelector('.hud-overlay');
    const hRect = hud ? hud.getBoundingClientRect() : null;
    const exitBtn = document.querySelector('.floating-exit-btn');
    const eRect = exitBtn ? exitBtn.getBoundingClientRect() : null;
    const hearts = document.querySelector('.hud-hearts');
    const heartsRect = hearts ? hearts.getBoundingClientRect() : null;
    const leo = document.querySelector('.leo-character');
    const leoRect = leo ? leo.getBoundingClientRect() : null;
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      banner: bRect ? { left: bRect.left, right: bRect.right, top: bRect.top, width: bRect.width } : null,
      hud: hRect ? { top: hRect.top, height: hRect.height } : null,
      exitBtn: eRect ? { left: eRect.left, right: eRect.right, top: eRect.top, width: eRect.width } : null,
      hearts: heartsRect ? { left: heartsRect.left, right: heartsRect.right, top: heartsRect.top } : null,
      leo: leoRect ? { left: leoRect.left, top: leoRect.top, width: leoRect.width, height: leoRect.height } : null,
      isHeartsOccludedByExit: (eRect && heartsRect) ? eRect.right > heartsRect.left : false
    };
  });

  console.log('Mobile Measurements:', JSON.stringify(mobileMeasurements, null, 2));

  // Switch back to desktop for action verification
  await page.setViewport({ width: 1280, height: 800 });
  await new Promise(r => setTimeout(r, 1000));

  // 4. INTERACTIVE ACTION TEST: Click correct node vs wrong node
  console.log('Testing Interactive Action...');
  const targetInfo = await page.evaluate(() => {
    const def = document.querySelector('.matrix-def-text')?.textContent?.replace(/["']/g, '')?.trim() || '';
    const glyphs = Array.from(document.querySelectorAll('.matrix-glyph-entity')).map((g, idx) => ({
      idx,
      word: g.querySelector('.glyph-text')?.textContent?.trim() || ''
    }));
    return { def, glyphs };
  });
  console.log('Target query info:', targetInfo);

  // Find and click the target glyph directly via data-is-target="true"
  const targetWord = await page.evaluate(() => {
    const el = document.querySelector('.matrix-glyph-entity[data-is-target="true"]');
    return el ? el.querySelector('.glyph-text')?.textContent?.trim() : null;
  });

  console.log(`Clicking correct node with word "${targetWord}"...`);
  const correctGlyph = await page.$('.matrix-glyph-entity[data-is-target="true"]');
  if (correctGlyph) {
    await correctGlyph.click();
    await new Promise(r => setTimeout(r, 600));
  } else {
    console.error('Target glyph not found!');
  }

  // Capture after action
  const afterActionPath1 = path.join(ARTIFACT_DIR, 'c5_grand_matrix_after_correct_action.png');
  const afterActionPath2 = path.join(SCREENSHOT_DIR, 'c5_grand_matrix_after_correct_action.png');
  await page.screenshot({ path: afterActionPath1 });
  await page.screenshot({ path: afterActionPath2 });

  const afterActionState = await page.evaluate(() => {
    const toast = document.querySelector('.matrix-feedback-toast');
    const hudScore = document.querySelector('.hud-score-text')?.textContent?.trim() || '';
    const hudHearts = Array.from(document.querySelectorAll('.hud-heart')).map(h => h.textContent?.trim());
    const roundChip = document.querySelector('.matrix-round-chip')?.textContent?.trim() || '';
    const audioCalls = window.__audioCalls || [];
    return {
      toastText: toast?.textContent?.trim() || '',
      toastClass: toast?.className || '',
      hudScore,
      hudHearts,
      roundChip,
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
    guideModalText,
    mobileMeasurements,
    afterActionState,
    consoleLogs: consoleLogs.slice(-20),
    screenshots: {
      desktopBaseline: 'c5_grand_matrix_desktop_baseline.png',
      guideModal: 'c5_grand_matrix_guide_modal.png',
      mobileBaseline: 'c5_grand_matrix_mobile_baseline.png',
      afterCorrectAction: 'c5_grand_matrix_after_correct_action.png'
    }
  };

  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'c5_grand_matrix_evidence.json'),
    JSON.stringify(evidence, null, 2)
  );

  await browser.close();
  console.log('--- C5 AUDIT V2 COMPLETE ---');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
