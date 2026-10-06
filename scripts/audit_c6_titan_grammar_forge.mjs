import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function copyToBrain(srcPath, filename) {
  try {
    fs.copyFileSync(srcPath, path.join(BRAIN_DIR, filename));
  } catch (e) {
    console.warn('Could not copy to brain:', e.message);
  }
}

async function main() {
  console.log('=== STARTING 6-ITEM AUDIT FOR C6: TITAN GRAMMAR FORGE ===');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ITEM 1: DESKTOP BASELINE (1280x800)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n--- ITEM 1: DESKTOP BASELINE (1280x800) ---');
  await page.setViewport({ width: 1280, height: 800 });

  // Navigate to Floor 5 (Apex Spire): room=4
  const url = 'http://localhost:5173/week/33/chronicles?room=4&owner=true';
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Click Chest 2 (Door 1: Titan Grammar Forge)
  const opened = await page.evaluate(() => {
    const btns = document.querySelectorAll('.dr-door-enter-btn');
    if (btns[1]) {
      btns[1].click();
      return true;
    }
    return false;
  });

  if (!opened) {
    throw new Error('❌ Could not click Chest 2 (Titan Grammar Forge) in Room 4!');
  }
  await sleep(2500);

  // Capture Desktop Screenshot
  const ssDesktopPath = path.join(SS_DIR, 'c6_titan_forge_desktop_1280x800.png');
  await page.screenshot({ path: ssDesktopPath });
  copyToBrain(ssDesktopPath, 'c6_titan_forge_desktop_1280x800.png');
  console.log('📸 Desktop baseline screenshot saved:', ssDesktopPath);

  const desktopDom = await page.evaluate(() => {
    const banner = document.querySelector('.titan-forge-banner')?.textContent?.trim() || '';
    const stem = document.querySelector('.titan-stem-text')?.textContent?.trim() || '';
    const blank = document.querySelector('.titan-blank-highlight')?.textContent?.trim() || '';
    const roundChip = document.querySelector('.titan-round-chip')?.textContent?.trim() || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    
    const cogs = Array.from(document.querySelectorAll('.titan-gear-entity')).map((g, idx) => {
      const text = g.querySelector('.titan-clause-plaque')?.textContent?.trim() || '';
      const style = g.getAttribute('style') || '';
      return { idx, text, style };
    });

    const hasLeo = !!document.querySelector('.leo-character');
    const hasExit = !!document.querySelector('.floating-exit-btn');
    const hasHelp = !!document.querySelector('.titan-help-btn');
    const hasSteam = !!document.querySelector('.steam-vent-entity');

    return { banner, stem, blank, roundChip, hud, cogs, hasLeo, hasExit, hasHelp, hasSteam };
  });

  console.log('Desktop DOM state:', JSON.stringify(desktopDom, null, 2));

  // ═══════════════════════════════════════════════════════════════════════════
  // ITEM 2: GUIDE MODAL VERIFICATION
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n--- ITEM 2: GUIDE MODAL VERIFICATION ---');
  await page.evaluate(() => {
    const helpBtn = document.querySelector('.titan-help-btn');
    if (helpBtn) helpBtn.click();
  });
  await sleep(1000);

  const ssGuidePath = path.join(SS_DIR, 'c6_titan_forge_guide_modal.png');
  await page.screenshot({ path: ssGuidePath });
  copyToBrain(ssGuidePath, 'c6_titan_forge_guide_modal.png');
  console.log('📸 Guide Modal screenshot saved:', ssGuidePath);

  const guideModalText = await page.evaluate(() => {
    const modalEl = document.querySelector('div.fixed.z-\\[200\\]')
      || Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('HOW TO PLAY (STEP-BY-STEP)'));
    return modalEl?.textContent?.trim() || '';
  });
  console.log('Guide Modal Text Length:', guideModalText.length);
  console.log('Guide Modal Preview:', guideModalText.slice(0, 200));

  // Close Guide Modal
  await page.evaluate(() => {
    const closeBtn = Array.from(document.querySelectorAll('button')).find(b => 
      b.textContent.includes('Resume') || b.textContent.includes('Understood')
    ) || document.querySelector('div.fixed.z-\\[200\\] button');
    if (closeBtn) closeBtn.click();
  });
  await sleep(800);

  // ═══════════════════════════════════════════════════════════════════════════
  // ITEM 3: BASELINE BEFORE INTERACTION
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n--- ITEM 3: BASELINE BEFORE CLICK ---');
  const ssBaselinePath = path.join(SS_DIR, 'c6_titan_forge_baseline_before_click.png');
  await page.screenshot({ path: ssBaselinePath });
  copyToBrain(ssBaselinePath, 'c6_titan_forge_baseline_before_click.png');
  console.log('📸 Baseline screenshot saved:', ssBaselinePath);

  // ═══════════════════════════════════════════════════════════════════════════
  // ITEM 4: INTERACTIVE ACTION (CLICKING CORRECT GEAR COG) & IMMEDIATE FEEDBACK
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n--- ITEM 4: INTERACTIVE ACTION (CLICKING CORRECT GEAR COG) ---');
  // In Round 1: stem is "Without sufficient friction, the vehicle" -> correct clause is "could not stop in time" (gear_0)
  const clickedTarget = await page.evaluate(() => {
    const cogs = Array.from(document.querySelectorAll('.titan-gear-entity'));
    for (const c of cogs) {
      const plaque = c.querySelector('.titan-clause-plaque')?.textContent?.trim() || '';
      if (plaque === 'could not stop in time') {
        c.click();
        return { clicked: true, text: plaque };
      }
    }
    // Fallback: click first cog
    if (cogs[0]) {
      cogs[0].click();
      return { clicked: true, text: cogs[0].textContent.trim() };
    }
    return { clicked: false };
  });

  console.log('Clicked target result:', clickedTarget);

  // Wait 400ms for immediate feedback animation and toast
  await sleep(400);

  const ssActionPath = path.join(SS_DIR, 'c6_titan_forge_after_correct_action.png');
  await page.screenshot({ path: ssActionPath });
  copyToBrain(ssActionPath, 'c6_titan_forge_after_correct_action.png');
  console.log('📸 Correct Action screenshot saved:', ssActionPath);

  const actionFeedbackState = await page.evaluate(() => {
    const toast = document.querySelector('.titan-feedback-toast');
    const toastClass = toast?.className || '';
    const toastText = toast?.textContent?.trim() || '';
    const hudText = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const ttsLog = window.__ttsInvocations || [];
    return { toastClass, toastText, hudText, ttsLog };
  });
  console.log('Action Feedback State (Immediate):', actionFeedbackState);

  // Wait for round transition (1.6s timeout in component)
  await sleep(1800);

  const round2State = await page.evaluate(() => {
    const stem = document.querySelector('.titan-stem-text')?.textContent?.trim() || '';
    const roundChip = document.querySelector('.titan-round-chip')?.textContent?.trim() || '';
    const hud = document.querySelector('.hud-overlay')?.textContent?.trim() || '';
    const cogs = Array.from(document.querySelectorAll('.titan-gear-entity')).map(g => 
      g.querySelector('.titan-clause-plaque')?.textContent?.trim() || ''
    );
    return { stem, roundChip, hud, cogs };
  });
  console.log('Round 2 State after transition:', round2State);

  // ═══════════════════════════════════════════════════════════════════════════
  // ITEM 5: MOBILE VIEWPORT & CLAMPING AUDIT (390x844)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n--- ITEM 5: MOBILE VIEWPORT (390x844) AUDIT ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(2000);

  // Enter game on mobile
  await page.evaluate(() => {
    const btns = document.querySelectorAll('.dr-door-enter-btn');
    if (btns[1]) btns[1].click();
  });
  await sleep(2500);

  const ssMobilePath = path.join(SS_DIR, 'c6_titan_forge_mobile_390x844.png');
  await page.screenshot({ path: ssMobilePath });
  copyToBrain(ssMobilePath, 'c6_titan_forge_mobile_390x844.png');
  console.log('📸 Mobile screenshot saved:', ssMobilePath);

  const mobileDom = await page.evaluate(() => {
    const banner = document.querySelector('.titan-forge-banner');
    const bannerRect = banner?.getBoundingClientRect();
    const hud = document.querySelector('.hud-overlay');
    const hudRect = hud?.getBoundingClientRect();
    const helpBtn = document.querySelector('.titan-help-btn');
    const helpRect = helpBtn?.getBoundingClientRect();

    const bannerSafe = bannerRect ? {
      left: bannerRect.left >= 0,
      right: bannerRect.right <= window.innerWidth,
      width: bannerRect.width,
    } : null;

    const hudSafe = hudRect ? {
      top: hudRect.top >= 0,
      bottom: hudRect.bottom <= window.innerHeight,
      visible: hudRect.height > 0
    } : null;

    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      bannerSafe,
      hudSafe,
      helpBtnPresent: !!helpBtn,
      stemText: document.querySelector('.titan-stem-text')?.textContent?.trim() || '',
      roundChip: document.querySelector('.titan-round-chip')?.textContent?.trim() || '',
    };
  });
  console.log('Mobile DOM measurements:', JSON.stringify(mobileDom, null, 2));

  // ═══════════════════════════════════════════════════════════════════════════
  // ITEM 6: CONSOLE ERROR AUDIT & PERSISTENCE EVIDENCE JSON
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n--- ITEM 6: CONSOLE ERROR AUDIT ---');
  console.log('Console Errors caught during audit:', consoleErrors);

  const finalReport = {
    gameId: 'titan_forge',
    title: 'Titan Grammar Forge',
    chamber: 'Floor 5 (Apex Spire), Door 2 (Grammar)',
    desktopBaseline: desktopDom,
    guideModal: {
      length: guideModalText.length,
      preview: guideModalText.slice(0, 180)
    },
    actionFeedback: actionFeedbackState,
    round2State,
    mobileAudit: mobileDom,
    consoleErrors,
    screenshots: [
      'c6_titan_forge_desktop_1280x800.png',
      'c6_titan_forge_guide_modal.png',
      'c6_titan_forge_baseline_before_click.png',
      'c6_titan_forge_after_correct_action.png',
      'c6_titan_forge_mobile_390x844.png'
    ]
  };

  const evidencePath = path.join(SS_DIR, 'c6_titan_forge_audit_evidence.json');
  fs.writeFileSync(evidencePath, JSON.stringify(finalReport, null, 2), 'utf-8');
  console.log('Saved audit evidence JSON to:', evidencePath);

  await browser.close();
  console.log('\n=== C6 AUDIT SCRIPT COMPLETED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
