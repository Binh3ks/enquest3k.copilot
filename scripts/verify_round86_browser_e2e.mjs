#!/usr/bin/env node
/**
 * scripts/verify_round86_browser_e2e.mjs
 *
 * REAL-BROWSER PLAYWRIGHT E2E VERIFICATION FOR ROUND 86
 * Follows AGENTS.md Mandatory Anti-Hallucination & Browser Audit Gate:
 *   - Serves production dist/ via vite preview
 *   - Verifies all 4 newly LIVE weeks (W126, W127, W133, W134) across multiple zones
 *   - Verifies SVG asset resolution (HTTP 200) for W133 & W134
 *   - Captures DOM text & PNG screenshots before and after START/interactive clicks
 *   - Asserts 0 fatal console errors and 0 page errors
 *   - Writes verbatim output to docs/agent_artifacts/round86_browser_e2e_raw.txt
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PORT = 4186;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const SHOT_DIR = '/tmp/round86_e2e';
const RAW_OUT_PATH = path.join(ROOT_DIR, 'docs/agent_artifacts/round86_browser_e2e_raw.txt');

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
    log(`  ❌ [FAIL] ${label}${detail ? ` — ${detail}` : ''}`);
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

async function createIsolatedPage(browser, consoleErrors, pageErrors, networkRequests = []) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    pageErrors.push(String(err?.message || err));
  });
  page.on('response', (res) => {
    networkRequests.push({ url: res.url(), status: res.status() });
  });
  return { context, page };
}

async function settleQuestScreen(page) {
  // Wait past TaskScreen's QuestEntryOverlay auto-dismiss
  await page.waitForTimeout(2000);
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
log('🌐 ROUND 86 — REAL-BROWSER PLAYWRIGHT E2E SMOKE PASS (LIVE W126, W127, W133, W134)');
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
  // FLOW 1: W126 MATH QUEST (/week/126/task/math_quest)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 1: W126 Math Quest (/week/126/task/math_quest)');
    const spModule = (await import(pathToFileURL(path.join(ROOT_DIR, 'src/data/weeks/week_126/skill_practice_hub.js')).href)).default;
    const q1Ans = String(spModule.singapore_math[0].correctAnswer);
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      await page.goto(`${BASE_URL}/week/126/task/math_quest`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w126_math_before.png'), fullPage: true });

      const beforeText = compactText(await page.locator('body').innerText());
      log(`  DOM Before START: ${beforeText.slice(0, 180)}...`);

      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="math-answer-input"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w126_math_active.png'), fullPage: true });

      // Submit W126 Q1 correctAnswer dynamically
      await page.fill('[data-testid="math-answer-input"]', q1Ans);
      await page.click('[data-testid="math-submit-btn"]');
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w126_math_correct.png'), fullPage: true });

      const feedback = compactText(await page.locator('[data-testid="math-feedback"]').innerText());
      const score = compactText(await page.locator('[data-testid="math-score-display"]').innerText());
      check(/Correct|Great/i.test(feedback) && !score.startsWith('0 PTS'), `W126 Math accepts correctAnswer=${q1Ans}`, `feedback="${feedback}", score="${score}"`);
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W126 Math 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 2: W126 CLIL FACT FINDER (/week/126/task/gear4_clil)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 2: W126 CLIL Fact Finder (/week/126/task/gear4_clil)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      await page.goto(`${BASE_URL}/week/126/task/gear4_clil`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w126_clil.png'), fullPage: true });

      const bodyText = compactText(await page.locator('body').innerText());
      check(bodyText.includes('From Essay to Speech') || bodyText.includes('Speech') || bodyText.includes('presentation'), 'W126 CLIL article renders theme content');
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W126 CLIL 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 3: W127 MATH QUEST (/week/127/task/math_quest)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 3: W127 Math Quest (/week/127/task/math_quest)');
    const spModule = (await import(pathToFileURL(path.join(ROOT_DIR, 'src/data/weeks/week_127/skill_practice_hub.js')).href)).default;
    const q1Ans = String(spModule.singapore_math[0].correctAnswer);
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      await page.goto(`${BASE_URL}/week/127/task/math_quest`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w127_math_before.png'), fullPage: true });

      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="math-answer-input"]');

      // Submit W127 Q1 correctAnswer dynamically
      await page.fill('[data-testid="math-answer-input"]', q1Ans);
      await page.click('[data-testid="math-submit-btn"]');
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w127_math_correct.png'), fullPage: true });

      const feedback = compactText(await page.locator('[data-testid="math-feedback"]').innerText());
      const score = compactText(await page.locator('[data-testid="math-score-display"]').innerText());
      check(/Correct|Great/i.test(feedback) && !score.startsWith('0 PTS'), `W127 Math accepts correctAnswer=${q1Ans}`, `feedback="${feedback}", score="${score}"`);
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W127 Math 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 4: W127 ACTION LAB (/week/127/task/science_lab)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 4: W127 Action Lab (/week/127/task/science_lab)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      await page.goto(`${BASE_URL}/week/127/task/science_lab`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w127_lab_before.png'), fullPage: true });

      await page.locator('button:has-text("START")').click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w127_lab_active.png'), fullPage: true });

      const bodyText = compactText(await page.locator('body').innerText());
      check(bodyText.includes('Scenario') || bodyText.includes('Rebuttal') || bodyText.includes('PTS') || bodyText.includes('Match'), 'W127 Action Lab renders interactive stage board');
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W127 Action Lab 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 5: W133 MATH QUEST WITH STATIC SVG (/week/133/task/math_quest)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 5: W133 Math Quest with Static SVG (/week/133/task/math_quest)');
    const spModule = (await import(pathToFileURL(path.join(ROOT_DIR, 'src/data/weeks/week_133/skill_practice_hub.js')).href)).default;
    const q1Ans = String(spModule.singapore_math[0].correctAnswer);
    const consoleErrors = [];
    const pageErrors = [];
    const networkRequests = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors, networkRequests);
    try {
      await page.goto(`${BASE_URL}/week/133/task/math_quest`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w133_math_before.png'), fullPage: true });

      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="math-answer-input"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w133_math_active.png'), fullPage: true });

      // Verify SVG request was served with HTTP 200
      const svgReq = networkRequests.find((r) => r.url.includes('w133_angle_p1.svg'));
      const svgStatus = svgReq ? svgReq.status : 'not_requested';
      check(svgStatus === 200, 'W133 Math SVG asset w133_angle_p1.svg loaded with HTTP 200', `status=${svgStatus}`);

      // Submit W133 Q1 correctAnswer dynamically
      await page.fill('[data-testid="math-answer-input"]', q1Ans);
      await page.click('[data-testid="math-submit-btn"]');
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w133_math_correct.png'), fullPage: true });

      const feedback = compactText(await page.locator('[data-testid="math-feedback"]').innerText());
      const score = compactText(await page.locator('[data-testid="math-score-display"]').innerText());
      check(/Correct|Great/i.test(feedback) && !score.startsWith('0 PTS'), `W133 Math accepts correctAnswer=${q1Ans}`, `feedback="${feedback}", score="${score}"`);
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W133 Math 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 6: W133 CLIL FACT FINDER (/week/133/task/gear4_clil)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 6: W133 CLIL Fact Finder (/week/133/task/gear4_clil)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      await page.goto(`${BASE_URL}/week/133/task/gear4_clil`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w133_clil.png'), fullPage: true });

      const bodyText = compactText(await page.locator('body').innerText());
      check(bodyText.includes('Deep Research') || bodyText.includes('statistic') || bodyText.includes('researcher'), 'W133 CLIL renders B1+ research article');
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W133 CLIL 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 7: W134 MATH QUEST WITH STATIC SVG (/week/134/task/math_quest)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 7: W134 Math Quest with Static SVG (/week/134/task/math_quest)');
    const spModule = (await import(pathToFileURL(path.join(ROOT_DIR, 'src/data/weeks/week_134/skill_practice_hub.js')).href)).default;
    const q1Ans = String(spModule.singapore_math[0].correctAnswer);
    const consoleErrors = [];
    const pageErrors = [];
    const networkRequests = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors, networkRequests);
    try {
      await page.goto(`${BASE_URL}/week/134/task/math_quest`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.waitForSelector('button:has-text("START")');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w134_math_before.png'), fullPage: true });

      await page.locator('button:has-text("START")').click();
      await page.waitForSelector('[data-testid="math-answer-input"]');
      await page.screenshot({ path: path.join(SHOT_DIR, 'w134_math_active.png'), fullPage: true });

      // Verify SVG request was served with HTTP 200
      const svgReq = networkRequests.find((r) => r.url.includes('w134_triangle_p1.svg'));
      const svgStatus = svgReq ? svgReq.status : 'not_requested';
      check(svgStatus === 200, 'W134 Math SVG asset w134_triangle_p1.svg loaded with HTTP 200', `status=${svgStatus}`);

      // Submit W134 Q1 correctAnswer dynamically
      await page.fill('[data-testid="math-answer-input"]', q1Ans);
      await page.click('[data-testid="math-submit-btn"]');
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w134_math_correct.png'), fullPage: true });

      const feedback = compactText(await page.locator('[data-testid="math-feedback"]').innerText());
      const score = compactText(await page.locator('[data-testid="math-score-display"]').innerText());
      check(/Correct|Great/i.test(feedback) && !score.startsWith('0 PTS'), `W134 Math accepts correctAnswer=${q1Ans}`, `feedback="${feedback}", score="${score}"`);
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W134 Math 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }

  // ──────────────────────────────────────────────────────────────────────────────────────
  // FLOW 8: W134 CLIL FACT FINDER (/week/134/task/gear4_clil)
  // ──────────────────────────────────────────────────────────────────────────────────────
  {
    log('## Flow 8: W134 CLIL Fact Finder (/week/134/task/gear4_clil)');
    const consoleErrors = [];
    const pageErrors = [];
    const { context, page } = await createIsolatedPage(browser, consoleErrors, pageErrors);
    try {
      await page.goto(`${BASE_URL}/week/134/task/gear4_clil`, { waitUntil: 'networkidle' });
      await settleQuestScreen(page);
      await page.screenshot({ path: path.join(SHOT_DIR, 'w134_clil.png'), fullPage: true });

      const bodyText = compactText(await page.locator('body').innerText());
      check(bodyText.includes('Identifying Fallacies') || bodyText.includes('Fallacies') || bodyText.includes('generalization'), 'W134 CLIL renders B1+ Fallacies article');
      check(pageErrors.length === 0 && filterFatalConsoleErrors(consoleErrors).length === 0, 'W134 CLIL 0 fatal runtime/page errors', `pageErrors=${pageErrors.length}`);
    } finally {
      await context.close();
    }
    log('');
  }
} finally {
  if (browser) await browser.close();
  previewProc.kill('SIGTERM');
}

log('\n========================================================================================');
log(`E2E SUMMARY: ${passed} PASSED / ${failed} FAILED`);
log(`STATUS: ${failed === 0 ? 'ALL E2E FLOWS PASSED ✅' : 'FAILURES DETECTED ❌'}`);
log('========================================================================================\n');

fs.writeFileSync(RAW_OUT_PATH, lines.join('\n'), 'utf8');
log(`Wrote raw output to ${RAW_OUT_PATH}`);

if (failed > 0) {
  process.exit(1);
}
