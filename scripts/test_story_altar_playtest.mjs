/**
 * test_story_altar_playtest.mjs — Hạng #5 QA
 * 4 tổ hợp: W33-correct, W33-wrong, W35-correct, W35-wrong
 * - Đọc DOM trực tiếp (slab texts, altar texts)
 * - Xác minh anti-brute-force: không có viền xanh trước khi verify
 * - Xác minh hearts trừ khi đặt sai
 * - Kiểm tra layout không bị che khuất (3-point occlusion cho altars)
 * - Chụp ảnh thật 4 tổ hợp
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL   = 'http://localhost:5174';
const SHOT_DIR   = path.resolve('docs/agent_artifacts/screenshots');
const BRAIN_DIR  = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';

if (!fs.existsSync(SHOT_DIR)) fs.mkdirSync(SHOT_DIR, { recursive: true });

// ── Wait for selector helper ──────────────────────────────────────────────────
async function waitForSelector(page, sel, ms = 8000) {
  try { await page.waitForSelector(sel, { timeout: ms }); return true; }
  catch { return false; }
}

// ── Navigate + warmup ─────────────────────────────────────────────────────────
async function navigateTo(page, url) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 25000 });
  await new Promise(r => setTimeout(r, 1200));
}

// ── 3-point occlusion check for .sa-altar ────────────────────────────────────
async function checkAltarOcclusion(page, label) {
  const rects = await page.$$eval('.sa-altar', els => els.map((e, i) => {
    const r = e.getBoundingClientRect();
    return { idx: i, top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) };
  }));

  const results = await page.evaluate((rects) => {
    return rects.map(r => {
      const el = document.querySelectorAll('.sa-altar')[r.idx];
      const pts = [
        { name: 'top', x: r.left + Math.round(r.width / 2), y: r.top + 6 },
        { name: 'mid', x: r.left + Math.round(r.width / 2), y: r.top + Math.round(r.height / 2) },
        { name: 'bot', x: r.left + Math.round(r.width / 2), y: r.bottom - 6 },
      ];
      return {
        idx: r.idx,
        allClear: pts.every(pt => {
          const hit = document.elementFromPoint(pt.x, pt.y);
          return hit && (hit === el || el.contains(hit));
        }),
        pts: pts.map(pt => {
          const hit = document.elementFromPoint(pt.x, pt.y);
          return { name: pt.name, clear: Boolean(hit && (hit === el || el.contains(hit))), hitClass: hit?.className?.toString().slice(0, 30) };
        })
      };
    });
  }, rects);

  console.log(`  [${label} Altar Occlusion]:`);
  results.forEach(r => {
    const pts = r.pts.map(p => `${p.name}:${p.clear ? '✅' : '❌(' + p.hitClass + ')'}`).join(' ');
    console.log(`    Altar[${r.idx}]: ${pts} allClear=${r.allClear ? '✅' : '❌'}`);
  });
  return results.every(r => r.allClear);
}

// ── Screenshot helper ─────────────────────────────────────────────────────────
async function shot(page, name) {
  const p = path.join(SHOT_DIR, name);
  await page.screenshot({ path: p });
  fs.copyFileSync(p, path.join(BRAIN_DIR, name));
  console.log(`  [Screenshot] ${name}`);
  return p;
}

// ── Main playtest ─────────────────────────────────────────────────────────────
async function runPlaytest() {
  console.log('\n' + '═'.repeat(65));
  console.log('🏛️ HẠNG #5: STORY ALTAR PUZZLE — PLAYTEST 4 TỔ HỢP');
  console.log('═'.repeat(65));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = { pass: [], fail: [] };

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Warmup
    console.log('\n  [Warmup] Loading root...');
    await navigateTo(page, `${BASE_URL}/`);
    console.log('  [Warmup] Done');

    const combos = [
      { week: 33, mode: 'correct', label: 'W33 Correct' },
      { week: 33, mode: 'wrong',   label: 'W33 Wrong'   },
      { week: 35, mode: 'correct', label: 'W35 Correct' },
      { week: 35, mode: 'wrong',   label: 'W35 Wrong'   },
    ];

    for (const combo of combos) {
      console.log(`\n${'─'.repeat(65)}`);
      console.log(`▶ ${combo.label}`);
      console.log('─'.repeat(65));

      // Navigate to room 5 = Floor 6 (door 2 = story_sequencer)
      await navigateTo(page, `${BASE_URL}/week/${combo.week}/chronicles?room=5&bypass=true`);

      // Enter door at index 2 (Door 3 = story_sequencer)
      const doorBtns = await page.$$('.dr-door-enter-btn');
      if (!doorBtns || doorBtns.length < 3) {
        console.error(`  ❌ Door buttons not found (found: ${doorBtns?.length ?? 0})`);
        results.fail.push(`${combo.label} — no doors`);
        await shot(page, `sa_${combo.week}_${combo.mode}_debug.png`);
        continue;
      }
      await doorBtns[2].click();  // Door index 2 = story_sequencer
      await new Promise(r => setTimeout(r, 2000));

      // Wait for StoryAltarPuzzle to mount
      const mounted = await waitForSelector(page, '.sa-root', 5000);
      if (!mounted) {
        console.error('  ❌ .sa-root not found — game not mounted');
        results.fail.push(`${combo.label} — not mounted`);
        await shot(page, `sa_${combo.week}_${combo.mode}_unmounted.png`);
        continue;
      }

      // ── Read DOM ──────────────────────────────────────────────────────────
      let phase = await page.$eval('.sa-root', () =>
        window.__STORY_ALTAR_TEST_HOOK__?.getPhase() ?? 'unknown'
      );
      // Wait for 'playing' phase
      let waited = 0;
      while (phase !== 'playing' && waited < 6000) {
        await new Promise(r => setTimeout(r, 500));
        waited += 500;
        phase = await page.evaluate(() => window.__STORY_ALTAR_TEST_HOOK__?.getPhase() ?? 'unknown');
      }
      console.log(`  [Phase after load]: ${phase}`);

      // Read instruction text
      const instrText = await page.$eval('.sa-instruction-text', el => el.innerText.trim()).catch(() => '(not found)');
      console.log(`  [Instruction]: "${instrText.slice(0, 80)}"`);

      // Read slab texts from DOM
      const domSlabs = await page.$$eval('.sa-slab', els => els.map(e => ({
        text: e.querySelector('.sa-slab-text')?.innerText?.trim() ?? '',
        order: e.dataset.slabOrder,
      })));
      console.log(`  [DOM Slabs] (${domSlabs.length}):`);
      domSlabs.forEach((s, i) => console.log(`    [${i}] order=${s.order} text="${s.text.slice(0, 50)}"`));

      // Read altar data-attrs
      const altarAttrs = await page.$$eval('.sa-altar', els => els.map(e => ({
        pos: e.dataset.altarPos,
        filled: !!e.querySelector('.sa-altar-slab-placed'),
      })));
      console.log(`  [Altars]: ${JSON.stringify(altarAttrs)}`);

      // ── Anti-brute-force check: no green border before placing ────────────
      const noBorderBeforeDrop = await page.evaluate(() => {
        const slabs = document.querySelectorAll('.sa-slab');
        const altars = document.querySelectorAll('.sa-altar');
        const hasGreenSlabBorder = Array.from(slabs).some(el => {
          const bc = window.getComputedStyle(el).borderColor;
          return bc.includes('34, 197, 94') || bc.includes('rgb(34');
        });
        const hasGreenAltarBorder = Array.from(altars).some(el => {
          const bc = window.getComputedStyle(el.querySelector('.sa-altar-pedestal') || el).borderColor;
          return bc.includes('34, 197, 94');
        });
        return !hasGreenSlabBorder && !hasGreenAltarBorder;
      });
      console.log(`  [Anti-Brute-Force: no green border before drop]: ${noBorderBeforeDrop ? '✅' : '❌'}`);

      // ── Occlusion check on altars ─────────────────────────────────────────
      const occlusionOk = await checkAltarOcclusion(page, combo.label);

      // ── Interact via test hook ────────────────────────────────────────────
      const hookResult = await page.evaluate(async (mode) => {
        const hook = window.__STORY_ALTAR_TEST_HOOK__;
        if (!hook) return { error: 'hook not found' };

        hook.setHeartsVal(3);
        await new Promise(r => setTimeout(r, 100));
        const initialHearts = hook.getHearts();
        const slabs = hook.getSlabs();

        if (mode === 'correct') {
          // Place each slab on its correct altar using imperative API
          for (const slab of slabs) {
            // Re-read slabs each time since pile changes after each drop
            const currentSlabs = hook.getSlabs();
            const idx = currentSlabs.findIndex(s => s.originalOrder === slab.originalOrder);
            if (idx < 0) continue;
            hook.pickUpImperative(idx);
            await new Promise(r => setTimeout(r, 200));
            hook.dropOnAltarImperative(slab.originalOrder);
            await new Promise(r => setTimeout(r, 300));
          }
          await new Promise(r => setTimeout(r, 1200)); // wait for auto-verify + phase transition
          const heartsAfter = hook.getHearts();
          const phase = hook.getPhase();
          const feedback = document.querySelector('[data-testid="sa-feedback"]')?.innerText?.trim() ?? '';
          return { mode, initialHearts, heartsAfter, phase, feedback, slabCount: slabs.length };
        } else {
          // Try to drop slab with originalOrder=1 on wrong altar
          const currentSlabs = hook.getSlabs();
          const firstSlabIdx = currentSlabs.findIndex(s => s.originalOrder === 1);
          const wrongDropIdx = firstSlabIdx >= 0 ? firstSlabIdx : 0;
          const chosenSlab = currentSlabs[wrongDropIdx];
          const wrongAltarPos = chosenSlab.originalOrder === 5 ? 4 : 5; // ensure wrong
          hook.pickUpImperative(wrongDropIdx);
          await new Promise(r => setTimeout(r, 200));
          hook.dropOnAltarImperative(wrongAltarPos);
          await new Promise(r => setTimeout(r, 600));
          const heartsAfter = hook.getHearts();
          const phase = hook.getPhase();
          const feedback = document.querySelector('[data-testid="sa-feedback"]')?.innerText?.trim() ?? '';
          return { mode, initialHearts, heartsAfter, phase, feedback, slabCount: slabs.length };
        }
      }, combo.mode);

      if (hookResult.error) {
        console.error(`  ❌ Hook error: ${hookResult.error}`);
        results.fail.push(`${combo.label} — ${hookResult.error}`);
        await shot(page, `sa_${combo.week}_${combo.mode}_live.png`);
        continue;
      }

      console.log(`  [Hook] mode=${hookResult.mode} initialHearts=${hookResult.initialHearts} heartsAfter=${hookResult.heartsAfter}`);
      console.log(`  [Phase after interact]: ${hookResult.phase}`);
      console.log(`  [Feedback toast]: "${hookResult.feedback}"`);

      // ── Check anti-brute-force after correct drops but before verify ──────
      let noBorderAfterCorrectDrops = true;
      if (combo.mode === 'correct') {
        noBorderAfterCorrectDrops = await page.evaluate(() => {
          const altarPedestals = document.querySelectorAll('.sa-altar-pedestal');
          return Array.from(altarPedestals).every(el => {
            const bc = window.getComputedStyle(el).borderColor;
            return !bc.includes('34, 197, 94');  // no green border
          });
        });
        console.log(`  [Anti-Brute-Force: no green on altars after correct drops]: ${noBorderAfterCorrectDrops ? '✅ (auto-verify cleared)' : '❌'}`);
      }

      // ── Screenshot ───────────────────────────────────────────────────────
      const shotName = `sa_${combo.week}_${combo.mode}_live.png`;
      await shot(page, shotName);

      // ── Pass/Fail ─────────────────────────────────────────────────────────
      let pass;
      if (combo.mode === 'correct') {
        pass = hookResult.heartsAfter === 3 &&
               (hookResult.phase === 'cleared' || hookResult.feedback.includes('CHRONOLOGY')) &&
               noBorderBeforeDrop &&
               occlusionOk &&
               hookResult.slabCount === 5;
      } else {
        // Wrong mode: hearts MUST decrease (< initialHearts), phase still playing or ko
        pass = hookResult.heartsAfter < hookResult.initialHearts &&
               (hookResult.phase === 'playing' || hookResult.phase === 'ko') &&
               noBorderBeforeDrop &&
               occlusionOk &&
               hookResult.slabCount === 5;
      }

      console.log(`\n  [${combo.label} OVERALL]: ${pass ? '✅ PASS' : '❌ FAIL'}`);
      if (pass) results.pass.push(combo.label);
      else results.fail.push(combo.label + ` hearts=${hookResult.heartsAfter} phase=${hookResult.phase} border=${noBorderBeforeDrop} occ=${occlusionOk}`);
    }

  } finally {
    await browser.close();
  }

  console.log('\n' + '═'.repeat(65));
  console.log('📊 KẾT QUẢ:');
  results.pass.forEach(l => console.log(`  ✅ ${l}`));
  results.fail.forEach(l => console.log(`  ❌ ${l}`));
  console.log('═'.repeat(65));
  return results.fail.length === 0;
}

// ── Run ───────────────────────────────────────────────────────────────────────
(async () => {
  let ok = false;
  try { ok = await runPlaytest(); }
  catch (e) { console.error('[PLAYTEST ERROR]:', e.message); }
  if (!ok) process.exit(1);
})();
