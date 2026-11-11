/**
 * scripts/verify_round81_browser_e2e.mjs
 *
 * REAL-BROWSER PLAYWRIGHT E2E VERIFICATION FOR ROUND 81
 * Follows AGENTS.md Mandatory Anti-Hallucination & Browser Audit Gate:
 *   - Serves production `dist/` via `vite preview`
 *   - Navigates to real routes, captures full DOM text & PNG screenshots BEFORE and AFTER clicking START / interactive buttons
 *   - Records console.error & pageerror per flow
 *   - Writes raw verbatim output to `docs/agent_artifacts/round81_browser_e2e_raw.txt`
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

import w33 from '../src/data/weeks/week_33/index.js';
import w38 from '../src/data/weeks/week_38/index.js';
import w39 from '../src/data/weeks/week_39/index.js';
import w76 from '../src/data/weeks/week_76/index.js';
import {
  normalizeBarModelQuestion,
  normalizeGrammarDrill,
  normalizeScienceLabStages,
} from '../src/utils/station2Adapters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PORT = 4179;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const SHOT_DIR = '/tmp/round81_e2e';
const RAW_OUT_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round81_browser_e2e_raw.txt');

fs.mkdirSync(SHOT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(RAW_OUT_PATH), { recursive: true });

const lines = [];
function log(msg = '') {
  lines.push(msg);
  console.log(msg);
}

let passed = 0;
let failed = 0;
function check(cond, label, detail = '') {
  if (cond) {
    passed++;
    log(`  [PASS] ${label}${detail ? ` — ${detail}` : ''}`);
  } else {
    failed++;
    log(`  [FAIL] ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Preview server did not become ready at ${url} within ${timeoutMs}ms`);
}

function getPreviewCommand() {
  const viteBin = path.join(ROOT_DIR, 'node_modules/.bin/vite');
  return spawn(viteBin, ['preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function createIsolatedPage(browser, consoleErrors, pageErrors) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    pageErrors.push(String(err?.message || err));
  });
  return { context, page };
}

async function settleQuestScreen(page) {
  // Wait past TaskScreen's 1.5s QuestEntryOverlay auto-dismiss before clicking
  await page.waitForTimeout(1900);
}

function compactText(txt) {
  return String(txt || '').replace(/\s+/g, ' ').trim();
}

function filterFatalConsoleErrors(errs) {
  return errs.filter(
    (e) =>
      !e.includes('favicon') &&
      !e.includes('ERR_FAILED') &&
      !e.includes('404') &&
      !e.includes('Failed to load resource') &&
      !e.includes('supabase')
  );
}

log('========================================================================================');
log('🌐 ROUND 81 — REAL-BROWSER PLAYWRIGHT E2E VERIFICATION');
log(`Timestamp: ${new Date().toISOString()} | Preview URL: ${BASE_URL}`);
log(`Screenshots Dir: ${SHOT_DIR}`);
log('========================================================================================\n');

const previewProc = getPreviewCommand();
let previewLogs = '';
previewProc.stdout.on('data', (d) => { previewLogs += d.toString(); });
previewProc.stderr.on('data', (d) => { previewLogs += d.toString(); });

let browser;
try {
  await waitForServer(BASE_URL);
  log(`✅ Vite preview server ready at ${BASE_URL}\n`);

  browser = await chromium.launch({ headless: true });

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 1: W39 MATH QUEST (target_answer=100, reject fallback 10, accept 100)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 1: W39 Math Quest (/week/39/task/math_quest)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      const w39Q1 = normalizeBarModelQuestion(w39.skill_practice_hub.singapore_math[0], 0);
      await page.goto(`${BASE_URL}/week/39/task/math_quest`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_math_before.png'), fullPage: true });
      const beforeText = compactText(await page.locator('body').innerText());
      log(`  DOM Before START (${beforeText.length} chars): ${beforeText.slice(0, 260)}`);

      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="math-answer-input"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_math_active.png'), fullPage: true });
      const activeText = compactText(await page.locator('body').innerText());
      check(activeText.includes('Green Valley Sanctuary'), 'W39 Math Q1 real problemText rendered', w39Q1.title);
      check(!activeText.includes('Solve the Bar Model problem below:'), 'W39 Math Q1 not generic default fallback');

      // Anti-fallback regression: submitting 10 MUST be rejected!
      await page.fill('[data-testid="math-answer-input"]', '10');
      await page.click('[data-testid="math-submit-btn"]');
      await page.waitForSelector('[data-testid="math-feedback"]');
      const wrongFeedback = compactText(await page.locator('[data-testid="math-feedback"]').innerText());
      const scoreAfterWrong = compactText(await page.locator('[data-testid="math-score-display"]').innerText());
      check(/Not quite|Try/i.test(wrongFeedback) && scoreAfterWrong === '0 PTS', 'W39 Math rejects old fallback value 10', `feedback="${wrongFeedback}", score="${scoreAfterWrong}"`);

      // Wait briefly if needed, clear & submit real target_answer (100)
      await page.fill('[data-testid="math-answer-input"]', String(w39Q1.correctAnswer));
      await page.click('[data-testid="math-submit-btn"]');
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_math_correct.png'), fullPage: true });
      const rightFeedback = compactText(await page.locator('[data-testid="math-feedback"]').innerText());
      const scoreAfterRight = compactText(await page.locator('[data-testid="math-score-display"]').innerText());
      check(/Correct|Great/i.test(rightFeedback) && !scoreAfterRight.startsWith('0 PTS'), `W39 Math accepts real target_answer=${w39Q1.correctAnswer}`, `feedback="${rightFeedback}", score="${scoreAfterRight}"`);
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W39 Math 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 2: W39 GRAMMAR DUEL MCQ (/week/39/task/sentence_smash)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 2: W39 Grammar Duel MCQ (/week/39/task/sentence_smash)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      const w39G1 = normalizeGrammarDrill(w39.skill_practice_hub.grammar_drills[0], 0);
      await page.goto(`${BASE_URL}/week/39/task/sentence_smash`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_grammar_before.png'), fullPage: true });

      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="grammar-mcq-board"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_grammar_active.png'), fullPage: true });

      const promptText = compactText(await page.locator('[data-testid="grammar-mcq-prompt"]').innerText());
      const optCount = await page.locator('[data-testid="grammar-mcq-option"]').count();
      check(promptText.includes('______') && !promptText.includes('undefined'), 'W39 Grammar MCQ prompt renders clean blank', `"${promptText}"`);
      check(optCount === w39G1.options.length, `W39 Grammar renders all ${w39G1.options.length} MCQ options`, `count=${optCount}`);

      // Select wrong option first -> non-spoiler feedback, score stays 0
      const wrongOpt = w39G1.options.find((o) => o !== w39G1.answer);
      await page.locator('[data-testid="grammar-mcq-option"]', { hasText: wrongOpt }).first().click();
      await page.click('[data-testid="grammar-check-btn"]');
      await page.waitForSelector('[data-testid="grammar-feedback"]');
      const wrongFb = compactText(await page.locator('[data-testid="grammar-feedback"]').innerText());
      check(!wrongFb.toLowerCase().includes(w39G1.answer.toLowerCase()), 'W39 Grammar wrong feedback does not spoil answer', `"${wrongFb}"`);

      // Wait or select right option (component unlocks or allows retry? Wait: if wrong waits 1300ms for try-again or stays enabled)
      await page.locator('[data-testid="grammar-mcq-option"]', { hasText: w39G1.answer }).first().click();
      await page.click('[data-testid="grammar-check-btn"]');
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_grammar_correct.png'), fullPage: true });
      const rightFb = compactText(await page.locator('[data-testid="grammar-feedback"]').innerText());
      const scoreText = compactText(await page.locator('[data-testid="grammar-score-display"]').innerText());
      check(scoreText.includes('25') || /Correct/i.test(rightFb), `W39 Grammar accepts "${w39G1.answer}" and adds score`, `score="${scoreText}", fb="${rightFb}"`);
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W39 Grammar 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 3: W39 ACTION LAB MATCH_PAIRS N:1 (/week/39/task/science_lab)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 3: W39 Action Lab match_pairs N:1 (/week/39/task/science_lab)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      const stages = normalizeScienceLabStages(w39.skill_practice_hub.science_lab);
      const s1 = stages[0];
      await page.goto(`${BASE_URL}/week/39/task/science_lab`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_lab_before.png'), fullPage: true });

      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="lab-match-pairs-board"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_lab_active.png'), fullPage: true });

      const labelCount = await page.locator('[data-testid="lab-label-btn"]').count();
      const bucketCount = await page.locator('[data-testid="lab-bucket-zone"]').count();
      check(labelCount === s1.pairs.length && bucketCount === s1.targetBuckets.length, `W39 Action Lab renders ${s1.pairs.length} pairs & ${s1.targetBuckets.length} N:1 buckets`, `labels=${labelCount}, buckets=${bucketCount}`);

      // Assign each item by clicking label then matching bucket
      for (const pair of s1.pairs) {
        const bucket = s1.targetBuckets.find((b) => b.id === pair.targetId);
        assert.ok(bucket, `Missing bucket for ${pair.id}`);
        await page.locator('[data-testid="lab-label-btn"]', { hasText: pair.label }).first().click();
        await page.locator('[data-testid="lab-bucket-zone"]', { hasText: bucket.name }).first().click();
        await page.waitForTimeout(150);
      }

      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w39_lab_cleared.png'), fullPage: true });
      const bodyText = compactText(await page.locator('body').innerText());
      const scoreText = compactText(await page.locator('[data-testid="lab-score-display"]').innerText());
      check(bodyText.includes('Scenario 1 Cleared!'), 'W39 Action Lab N:1 Scenario 1 clears after 4 matches');
      check(!scoreText.startsWith('0 PTS'), 'W39 Action Lab score increases after matches', `score="${scoreText}"`);
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W39 Action Lab 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 4: W38 ACTION LAB INQUIRY_STEPS + W35 EMPTY GUARD
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 4: W38 Action Lab inquiry_steps & W35 Empty Guard');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      const w38Stages = normalizeScienceLabStages(w38.skill_practice_hub.science_lab);
      await page.goto(`${BASE_URL}/week/38/task/science_lab`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="lab-inquiry-card"]');
      const cardText = compactText(await page.locator('[data-testid="lab-inquiry-card"]').innerText());
      check(cardText.includes(w38Stages[0].title), 'W38 Action Lab renders Stage 1 inquiry card', w38Stages[0].title);

      await page.click('[data-testid="lab-confirm-step-btn"]');
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w38_lab_inquiry.png'), fullPage: true });
      const afterText = compactText(await page.locator('body').innerText());
      const scoreText = compactText(await page.locator('[data-testid="lab-score-display"]').innerText());
      check(afterText.includes('Scenario 1 Cleared!') && scoreText.includes('35 PTS'), 'W38 Action Lab inquiry step awards 35 PTS & unlocks Stage 2', `score="${scoreText}"`);

      // W35 un-authored legacy stub index.js -> must show explicit empty guard, NOT W33 wet floor!
      await page.goto(`${BASE_URL}/week/35/task/science_lab`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('[data-testid="action-lab-data-missing"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w35_lab_empty_guard.png'), fullPage: true });
      const w35Text = compactText(await page.locator('body').innerText());
      check(!w35Text.includes('Wet Floor'), 'W35 un-authored Action Lab renders empty guard (no W33 Wet Floor silent fallback)');
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'Flow 4 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 5: W76 PET BOSS BATTLE PART 3 (/week/76/task/boss_reading?part=rw_p3)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 5: W76 PET Boss Battle Part 3 (/week/76/task/boss_reading?part=rw_p3)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      await page.goto(`${BASE_URL}/week/76/task/boss_reading?part=rw_p3`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('[data-testid="pet-rw-part3"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w76_boss_p3_active.png'), fullPage: true });

      const activeText = compactText(await page.locator('body').innerText());
      log(`  W76 Boss Active DOM (${activeText.length} chars): ${activeText.slice(0, 260)}`);
      check(/Cambridge B1 Preliminary \(PET\)/i.test(activeText), 'W76 Boss header displays Cambridge B1 Preliminary (PET)');
      check(!/FULL MOCK/i.test(activeText) && !activeText.includes('Cycle 0/5'), 'W76 Boss is Cycle 4 practice (NOT FULL MOCK / NOT Cycle 0/5)');

      const p3Text = compactText(await page.locator('[data-testid="pet-rw-part3"]').innerText());
      check(p3Text.includes('Magellan') || p3Text.includes('Audacious Voyage'), 'W76 Boss Part 3 renders Magellan PET article (not Flyers Holly fallback)');

      const p3Items = w76.reading_hub.rw_part3.items;
      for (const item of p3Items) {
        const card = page.locator(`[data-testid="pet-rw-p3-q-${item.id}"]`);
        await card.locator('button', { hasText: item.answer }).first().click();
      }
      await page.click('[data-testid="pet-rw-p3-check-btn"]');
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w76_boss_p3_scored.png'), fullPage: true });

      const scoredText = compactText(await page.locator('[data-testid="pet-rw-part3"]').innerText());
      check(scoredText.includes(`Score: ${p3Items.length}/${p3Items.length}`), `W76 PET Part 3 checks all 5 answers -> Score: ${p3Items.length}/${p3Items.length}`);
      await page.click('[data-testid="pet-rw-p3-complete-btn"]');
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w76_boss_p3_completed.png'), fullPage: true });
      const postCompleteText = compactText(await page.locator('body').innerText());
      check(/Complete|Victory|Boss Defeated|Shield/i.test(postCompleteText), 'W76 PET Part 3 Complete button transitions cleanly to Boss Victory / completion');
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W76 PET Boss 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 6: W37 BOSS ROTARY GUARD (/week/37/task/boss_listening)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 6: W37 Boss Rotary Guard (/week/37/task/boss_listening)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      await page.goto(`${BASE_URL}/week/37/task/boss_listening`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("L1")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w37_boss_active.png'), fullPage: true });
      const activeText = compactText(await page.locator('body').innerText());
      log(`  W37 Boss DOM (${activeText.length} chars): ${activeText.slice(0, 260)}`);
      check(activeText.includes('Cambridge A2 Flyers'), 'W37 Boss renders Cambridge A2 Flyers badge');
      check(activeText.includes('L1') && activeText.includes('L2'), 'W37 Boss shows Cycle 1 Listening tabs (L1 & L2)');
      check(!/FULL MOCK/i.test(activeText) && !activeText.includes('Cycle 0/5') && !activeText.includes('R1 ·'), 'W37 Boss does NOT misfire FULL MOCK / 16-part schedule');

      await page.locator('button:has-text("L2")').first().click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w37_boss_l2.png'), fullPage: true });
      const l2Text = compactText(await page.locator('body').innerText());
      check(/Listening Part 2|Note Completion/i.test(l2Text), 'W37 Boss tab switch L1 -> L2 transitions cleanly');
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W37 BossBattle transitions cleanly with 0 runtime errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 7: W33 FROZEN BASELINE REGRESSION CHECK
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 7: W33 Frozen Baseline Station 2 Regression');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      // W33 Math
      const w33M1 = normalizeBarModelQuestion(w33.skill_practice_hub.singapore_math[0], 0);
      await page.goto(`${BASE_URL}/week/33/task/math_quest`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="math-answer-input"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w33_math.png'), fullPage: true });
      await page.fill('[data-testid="math-answer-input"]', String(w33M1.correctAnswer));
      await page.click('[data-testid="math-submit-btn"]');
      await page.waitForSelector('[data-testid="math-feedback"]');
      const mFb = compactText(await page.locator('[data-testid="math-feedback"]').innerText());
      check(/Correct|Great/i.test(mFb), `W33 Math Q1 answer=${w33M1.correctAnswer} still works`, mFb);

      // W33 Grammar (word_blocks mode)
      await page.goto(`${BASE_URL}/week/33/task/sentence_smash`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="grammar-check-btn"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w33_grammar.png'), fullPage: true });
      const mcqCount = await page.locator('[data-testid="grammar-mcq-board"]').count();
      check(mcqCount === 0, 'W33 Grammar keeps original word_blocks UI (not MCQ)');

      // W33 Action Lab (diagram_dnd mode)
      await page.goto(`${BASE_URL}/week/33/task/science_lab`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="lab-drop-zone"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w33_lab.png'), fullPage: true });
      const dropZones = await page.locator('[data-testid="lab-drop-zone"]').count();
      check(dropZones === 4, `W33 Action Lab keeps 4 diagram_dnd drop zones`, `dropZones=${dropZones}`);
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W33 Baseline 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  log('========================================================================================');
  log(`E2E SUMMARY: ${passed} PASSED, ${failed} FAILED (TOTAL=${passed + failed})`);
  log('========================================================================================');

  fs.writeFileSync(RAW_OUT_PATH, `${lines.join('\n')}\n`, 'utf8');
  if (failed > 0) {
    process.exitCode = 1;
  }
} finally {
  if (browser) await browser.close().catch(() => {});
  previewProc.kill('SIGTERM');
  setTimeout(() => {
    if (!previewProc.killed) previewProc.kill('SIGKILL');
  }, 1500).unref();
}
