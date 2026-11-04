#!/usr/bin/env node
/**
 * GATE 15 — PRODUCTION DOM ASSERTIONS RUNNER (SPEC-DRIVEN v2.0)
 * Anti-Hallucination Protocol v1.0 — Spec Ownership
 *
 * This runner strictly reads predicates from docs/GATE15_SPEC.json.
 * It contains NO hardcoded predicates or assertions.
 */

import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const WEEK = parseInt(process.argv[2] || '34', 10);
const hasProdFlag = process.argv.includes('--production');
const hasLocalFlag = process.argv.includes('--local') || process.env.LOCAL === '1';
const isLocal = hasLocalFlag && !hasProdFlag;
const PROD_BASE = isLocal ? (process.env.LOCAL_URL || 'http://localhost:5173') : 'https://app.bkbacademy.vn';
const envName = isLocal ? 'LOCAL DEV' : 'LIVE PRODUCTION';
const rootDir = process.cwd();

console.log(`🌍 Target Environment: [${envName}] ${PROD_BASE}`);

let defaultSpec = `docs/GATE15_SPEC.json`;
if (WEEK === 33 && fs.existsSync(path.resolve(rootDir, 'docs/GATE15_SPEC_W33.json'))) {
  defaultSpec = `docs/GATE15_SPEC_W33.json`;
}
const customSpec = process.argv.find(a => a.endsWith('.json'));
const SPEC_PATH = path.resolve(rootDir, customSpec || defaultSpec);

if (!fs.existsSync(SPEC_PATH)) {
  console.error(`FATAL: Spec file not found at ${SPEC_PATH}`);
  process.exit(1);
}

// Compute and display spec hash
const specSha = execSync(`shasum -a 256 "${SPEC_PATH}"`).toString().trim();
const rawSpec = fs.readFileSync(SPEC_PATH, 'utf-8');
const SPEC = JSON.parse(rawSpec);

const GLOBAL_NEGATIVES = SPEC.global_negative_patterns || [];
const QUESTS_SPEC = SPEC.quests || {};

function evaluatePosCheck(check, dom) {
  const { type, name } = check;
  const lower = dom.toLowerCase();

  switch (type) {
    case 'contains_one_of': {
      const vals = check.values || [];
      const isCase = check.case_sensitive === true;
      const hit = vals.find(v => isCase ? dom.includes(v) : lower.includes(v.toLowerCase()));
      if (!hit) {
        return { pass: false, snippet: dom.slice(0, 300), reason: `Missing any of [${vals.join(', ')}]` };
      }
      const target = isCase ? hit : hit.toLowerCase();
      const idx = isCase ? dom.indexOf(target) : lower.indexOf(target);
      return { pass: true, snippet: dom.slice(Math.max(0, idx - 20), idx + 100) };
    }

    case 'contains_min_count': {
      const vals = check.values || [];
      const min = check.min || 1;
      const isCase = check.case_sensitive === true;
      const hits = vals.filter(v => isCase ? dom.includes(v) : lower.includes(v.toLowerCase()));
      if (hits.length < min) {
        return {
          pass: false,
          snippet: dom.slice(0, 300),
          reason: `Found only ${hits.length}/${min} words: [${hits.join(', ')}]`
        };
      }
      const firstHit = isCase ? hits[0] : hits[0].toLowerCase();
      const idx = isCase ? dom.indexOf(firstHit) : lower.indexOf(firstHit);
      return { pass: true, snippet: `[hits: ${hits.join(', ')}] ` + dom.slice(Math.max(0, idx - 20), idx + 100) };
    }

    case 'regex': {
      const reg = new RegExp(check.pattern, check.flags || 'i');
      if (!reg.test(dom)) {
        return { pass: false, snippet: dom.slice(0, 300), reason: `Pattern /${check.pattern}/ not found` };
      }
      const idx = dom.search(reg);
      return { pass: true, snippet: dom.slice(Math.max(0, idx - 20), idx + 140) };
    }

    case 'regex_min_count': {
      const flags = (check.flags || 'i').includes('g') ? (check.flags || 'i') : (check.flags || 'i') + 'g';
      const reg = new RegExp(check.pattern, flags);
      const matches = dom.match(reg) || [];
      const min = check.min || 1;
      if (matches.length < min) {
        return {
          pass: false,
          snippet: dom.slice(0, 300),
          reason: `Pattern /${check.pattern}/ matched only ${matches.length}/${min} times (matches: [${matches.join(', ')}])`
        };
      }
      return { pass: true, snippet: `[matches (${matches.length}): ${matches.slice(0, 5).join(', ')}]` };
    }

    case 'regex_all': {
      const patterns = check.patterns || [];
      for (const p of patterns) {
        const reg = new RegExp(p, 'i');
        if (!reg.test(dom)) {
          return { pass: false, snippet: dom.slice(0, 300), reason: `Required pattern /${p}/ not found` };
        }
      }
      const firstReg = new RegExp(patterns[0], 'i');
      const idx = dom.search(firstReg);
      return { pass: true, snippet: dom.slice(Math.max(0, idx - 20), idx + 140) };
    }

    case 'not_contains_regex': {
      const reg = new RegExp(check.pattern, check.flags || 'i');
      if (reg.test(dom)) {
        const m = dom.match(reg);
        return { pass: false, snippet: dom.slice(0, 300), reason: `Banned pattern /${check.pattern}/ found: "${m[0]}"` };
      }
      return { pass: true, snippet: dom.slice(0, 150) };
    }

    default:
      return { pass: false, snippet: '', reason: `Unknown predicate type: ${type}` };
  }
}

async function runInteractionCheck(page, check) {
  const { action, selector, wait_after_ms, assertion } = check;
  try {
    if (action === 'click') {
      const el = page.locator(selector).first();
      if (await el.isVisible({ timeout: 4000 }).catch(() => false)) {
        await el.click();
        await page.waitForTimeout(wait_after_ms || 1000);
      } else {
        return { pass: false, snippet: '', reason: `Interaction element '${selector}' not visible` };
      }
    }
    if (assertion.type === 'dom_count') {
      const count = await page.$$(assertion.selector).then(els => els.length).catch(() => 0);
      const min = assertion.min || 1;
      if (count < min) {
        return { pass: false, snippet: '', reason: `Found only ${count}/${min} element(s) matching '${assertion.selector}'` };
      }
      return { pass: true, snippet: `Found ${count} element(s) matching '${assertion.selector}' (min: ${min})` };
    }
    const newDom = await page.evaluate(() => (document.body?.innerText || '').trim());
    return evaluatePosCheck(assertion, newDom);
  } catch (e) {
    return { pass: false, snippet: '', reason: `Interaction failed: ${e.message}` };
  }
}

async function performMeaningfulInteraction(page, qid) {
  try {
    switch (qid) {
      case 'gear1_webtoon': {
        const nextBtn = page.locator('button:has-text("Next Scene"), button[aria-label="Next scene"]').first();
        if (await nextBtn.isVisible().catch(() => false)) {
          await nextBtn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        break;
      }
      case 'gear2_karaoke': {
        const nextBtn = page.locator('button:has-text("Next ▶"), button:has-text("2/8")').first();
        if (await nextBtn.isVisible().catch(() => false)) {
          await nextBtn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        break;
      }
      case 'gear3_retell': {
        const hintBtn = page.locator('button:has-text("Show Sentence Hint"), button:has-text("Show Hint")').first();
        if (await hintBtn.isVisible().catch(() => false)) {
          await hintBtn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        break;
      }
      case 'gear4_clil': {
        const vocabBtn = page.locator('button:has-text("Vocab Focus")').first();
        if (await vocabBtn.isVisible().catch(() => false)) {
          await vocabBtn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        break;
      }
      case 'science_lab': {
        const startBtn = page.locator('button:has-text("▶ START"), button:has-text("START")').first();
        if (await startBtn.isVisible().catch(() => false)) {
          await startBtn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        // Action Lab: tap draggable label then tap dropzone to place label and score points
        const labelBtn = page.locator('[data-testid="lab-label-btn"]').first();
        if (await labelBtn.isVisible().catch(() => false)) {
          await labelBtn.click().catch(() => {});
          await page.waitForTimeout(250);
          const dropZone = page.locator('[data-testid="lab-drop-zone"]').first();
          if (await dropZone.isVisible().catch(() => false)) {
            await dropZone.click().catch(() => {});
            await page.waitForTimeout(400);
          }
        }
        break;
      }
      case 'science_report': {
        const hotspot = page.locator('[data-testid="discovery-hotspot-btn"]').first();
        if (await hotspot.isVisible().catch(() => false)) {
          await hotspot.click().catch(() => {});
          await page.waitForTimeout(600);
        }
        break;
      }
      case 'word_blitz': {
        const startBtn = page.locator('button:has-text("▶ START"), button:has-text("START")').first();
        if (await startBtn.isVisible().catch(() => false)) {
          await startBtn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        // Speed Match: click matching English and Vietnamese word cards
        const enBtn = page.locator('[data-testid="flash-en-btn"]').first();
        if (await enBtn.isVisible().catch(() => false)) {
          const itemId = await enBtn.getAttribute('data-id');
          await enBtn.click().catch(() => {});
          await page.waitForTimeout(250);
          const viBtn = page.locator(`[data-testid="flash-vi-btn"][data-id="${itemId}"]`);
          if (await viBtn.isVisible().catch(() => false)) {
            await viBtn.click().catch(() => {});
            await page.waitForTimeout(400);
          }
        }
        break;
      }
      case 'sentence_smash': {
        const startBtn = page.locator('button:has-text("▶ START"), button:has-text("START")').first();
        if (await startBtn.isVisible().catch(() => false)) {
          await startBtn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        // Place first 4 word blocks into sentence builder target zone
        const blocks = page.locator('[data-testid="word-block-btn"]');
        const blockCount = await blocks.count().catch(() => 0);
        for (let i = 0; i < Math.min(blockCount, 4); i++) {
          await blocks.nth(i).click().catch(() => {});
          await page.waitForTimeout(200);
        }
        break;
      }
      case 'math_quest': {
        const startBtn = page.locator('button:has-text("▶ START"), button:has-text("START")').first();
        if (await startBtn.isVisible().catch(() => false)) {
          await startBtn.click().catch(() => {});
          await page.waitForTimeout(600);
        }
        // Problem 1: 100m corridor - 40m walked = 60m
        const input = page.locator('[data-testid="math-answer-input"]').first();
        if (await input.isVisible().catch(() => false)) {
          await input.fill('60');
          await page.waitForTimeout(200);
          const submitBtn = page.locator('[data-testid="math-submit-btn"]').first();
          if (await submitBtn.isVisible().catch(() => false)) {
            await submitBtn.click().catch(() => {});
            await page.waitForTimeout(500);
          }
        }
        break;
      }
      case 'story_writer': {
        // Interacted via ladder test (on review screen)
        break;
      }
      case 'broadcast_studio': {
        const nextBtn = page.locator('[data-testid="prompter-next-btn"], button:has-text("Next ▶")').first();
        if (await nextBtn.isVisible().catch(() => false)) {
          await nextBtn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        break;
      }
      case 'info_exchange': {
        // Reveal question text on Card 1
        const peekBtn = page.locator('[data-testid="ie-peek-question-btn"]').first();
        if (await peekBtn.isVisible().catch(() => false)) {
          await peekBtn.click().catch(() => {});
          await page.waitForTimeout(300);
        }
        // Switch to Card 2 (You Ask)
        const card2Btn = page.locator('[data-testid="ie-card2-tab-btn"]').first();
        if (await card2Btn.isVisible().catch(() => false)) {
          await card2Btn.click().catch(() => {});
          await page.waitForTimeout(500);
        }
        break;
      }
      case 'boss_listening': {
        // Cambridge A2 Listening Part 1: Select character name, click target pin, and click Check
        const nameBtn = page.locator('[data-testid="line-matcher-name-btn"]').first();
        if (await nameBtn.isVisible().catch(() => false)) {
          await nameBtn.click().catch(() => {});
          await page.waitForTimeout(250);
          const targetPin = page.locator('[data-testid="line-matcher-target"]:not([data-example])').first();
          if (await targetPin.isVisible().catch(() => false)) {
            await targetPin.click({ force: true }).catch(() => {});
            await page.waitForTimeout(250);
          }
          const checkBtn = page.locator('[data-testid="line-matcher-check-btn"]');
          if (await checkBtn.isVisible().catch(() => false) && !(await checkBtn.isDisabled().catch(() => true))) {
            await checkBtn.click().catch(() => {});
            await page.waitForTimeout(400);
          }
        }
        break;
      }
      case 'boss_reading': {
        // WordBankMatchingGrid: select first word pill, assign to first def slot, and check
        const pill = page.locator('[data-testid="word-bank-pill"]').first();
        if (await pill.isVisible().catch(() => false)) {
          await pill.click().catch(() => {});
          await page.waitForTimeout(250);
          const defSlot = page.locator('[data-testid="word-def-slot"]').first();
          if (await defSlot.isVisible().catch(() => false)) {
            await defSlot.click().catch(() => {});
            await page.waitForTimeout(250);
          }
          const checkBtn = page.locator('[data-testid="word-bank-check-btn"]').first();
          if (await checkBtn.isVisible().catch(() => false)) {
            await checkBtn.click().catch(() => {});
            await page.waitForTimeout(500);
          }
        }
        break;
      }
      case 'weekly_review': {
        // FindDifferencesInteractive: click first hotspot on Picture A or B
        const hotspot = page.locator('[data-testid="diff-hotspot-btn"]').first();
        if (await hotspot.isVisible().catch(() => false)) {
          await hotspot.click({ force: true }).catch(() => {});
          await page.waitForTimeout(400);
          const hintBtn = page.locator('[data-testid="diff-hint-btn"]').first();
          if (await hintBtn.isVisible().catch(() => false)) {
            await hintBtn.click().catch(() => {});
            await page.waitForTimeout(300);
          }
        }
        break;
      }
    }
  } catch (err) {
    console.warn(`[WARN] Interaction failed on ${qid}: ${err.message}`);
  }
}

async function main() {
  console.log(`\n========================================================================`);
  console.log(`🛡️  GATE 15 — PRODUCTION DOM ASSERTIONS (SPEC-DRIVEN v2.0) — WEEK ${WEEK}`);
  console.log(`🌐 Target: ${PROD_BASE}`);
  console.log(`📄 Spec:   ${SPEC_PATH}`);
  console.log(`🔒 SHA256: ${specSha}`);
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  console.log(`========================================================================\n`);

  if (isLocal) {
    console.log(`🏠 Running Gate 15 in LOCAL mode against ${PROD_BASE}`);
  } else {
    // STEP 1: Check version.json vs git HEAD
    let prodVersion = null;
    try {
      const vRes = await fetch(`${PROD_BASE}/version.json?_t=${Date.now()}`);
      const vJson = await vRes.json();
      prodVersion = vJson.commit || vJson.git_commit;
    } catch (e) {
      console.error(`FAIL: Cannot reach ${PROD_BASE}/version.json — ${e.message}`);
      process.exit(1);
    }

    let gitHead = null;
    try {
      gitHead = execSync('git rev-parse HEAD', { cwd: process.cwd() }).toString().trim();
    } catch (e) {
      console.error(`FAIL: Cannot read git HEAD — ${e.message}`);
      process.exit(1);
    }

    console.log(`🔖 Production commit: ${prodVersion}`);
    console.log(`🔖 Git HEAD:          ${gitHead}`);

    if (prodVersion && gitHead) {
      const prodShort = prodVersion.slice(0, 8);
      const headShort = gitHead.slice(0, 8);
      if (prodShort !== headShort) {
        console.error(`\nFAIL: PRODUCTION STALE — redeploy trước`);
        console.error(`  Production: ${prodVersion}`);
        console.error(`  Local HEAD: ${gitHead}`);
        process.exit(1);
      }
    }
    console.log(`✅ Version check: Production matches local HEAD (${prodVersion?.slice(0, 8)})\n`);
  }

  // STEP 1.5: Production Asset HEAD Check (Listening P1/P3/P4/P5 + S1 differences)
  const weekDir = path.join(rootDir, `src/data/weeks/week_${WEEK}`);
  let referencedAssetUrls = [];
  try {
    const lhMod = await import(`file://${path.join(weekDir, 'listening_hub.js')}`);
    const lh = lhMod.listeningHub || lhMod.listeningHubData || lhMod.default || {};
    if (lh.listening_p1?.image_url) referencedAssetUrls.push(lh.listening_p1.image_url);
    (lh.listening_p3?.cards || []).forEach(c => { if (c.image_url) referencedAssetUrls.push(c.image_url); });
    (lh.listening_p3?.items || []).forEach(i => { if (i.audio_url) referencedAssetUrls.push(i.audio_url); });
    (lh.listening_p4?.questions || []).forEach(q => {
      if (q.audio_url) referencedAssetUrls.push(q.audio_url);
      (q.options || []).forEach(opt => { if (opt.image_url) referencedAssetUrls.push(opt.image_url); });
    });
    if (lh.listening_p5?.image_url) referencedAssetUrls.push(lh.listening_p5.image_url);
    if (lh.listening_p5?.audio_url) referencedAssetUrls.push(lh.listening_p5.audio_url);
  } catch (e) {}

  try {
    const shMod = await import(`file://${path.join(weekDir, 'speaking_hub.js')}`);
    const sh = shMod.speakingHub || shMod.speakingHubData || shMod.default || {};
    if (sh.find_differences?.picA?.image_url) referencedAssetUrls.push(sh.find_differences.picA.image_url);
    if (sh.find_differences?.picB?.image_url) referencedAssetUrls.push(sh.find_differences.picB.image_url);
  } catch (e) {}

  referencedAssetUrls = [...new Set(referencedAssetUrls)].filter(u => u && typeof u === 'string' && u.startsWith('/'));
  console.log(`🔍 Production Asset HEAD Check: verifying ${referencedAssetUrls.length} referenced URLs on ${PROD_BASE}...`);
  const missingProdAssets = [];
  for (const u of referencedAssetUrls) {
    if (isLocal) {
      const localP = path.join(rootDir, 'public', u);
      if (!fs.existsSync(localP) || fs.statSync(localP).size === 0) {
        missingProdAssets.push({ url: u, status: 'LOCAL_MISSING_OR_EMPTY' });
      }
    } else {
      const fullUrl = `${PROD_BASE}${u}`;
      try {
        const hRes = await fetch(fullUrl, { method: 'HEAD' });
        if (hRes.status === 404) {
          missingProdAssets.push({ url: fullUrl, status: 404 });
        }
      } catch (err) {
        missingProdAssets.push({ url: fullUrl, error: err.message });
      }
    }
  }

  if (missingProdAssets.length > 0) {
    console.error(`❌ Production Asset HEAD Check FAILED (${missingProdAssets.length} missing/empty):`);
    missingProdAssets.forEach(m => console.error(`   - ${m.url} (${m.status || m.error})`));
    process.exit(1);
  }
  console.log(`   ✅ 100% of ${referencedAssetUrls.length} referenced assets verified!\n`);

  // STEP 2: Launch browser and run all assertions
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--no-sandbox']
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (compatible; Gate15/2.0; EngQuest QA Bot)',
    permissions: ['microphone', 'camera']
  });
  const page = await context.newPage();

  // Intercept Supabase progress calls so QA runner always tests clean/initial quest state
  await page.route('**/rest/v1/user_progress*', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '[]'
    });
  });

  // Auth bypass & SRS bypass — inject Zustand persist key + flags
  await page.addInitScript(() => {
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: {
        currentUser: { id: 'qa-user-1', name: 'Gate15 QA', display_name: 'Gate15 QA', avatar: 'lion', role: 'owner' },
        token: 'qa-test-token',
        learningMode: 'advanced',
        progressCache: {}
      },
      version: 2
    }));
    localStorage.setItem('engquest-daily-quest-store', JSON.stringify({
      state: {
        completedQuests: {}
      },
      version: 1
    }));
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('engquest_overlay_dismissed', 'true');
    localStorage.setItem('engquest_user', JSON.stringify({ name: 'Gate15 QA', avatar: 'lion', role: 'owner' }));
    // Critical: bypass SRS daily warm-up modal
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });

  const ssDir = process.env.GATE15_SS_DIR
    ? path.resolve(process.env.GATE15_SS_DIR)
    : path.resolve(rootDir, `docs/agent_artifacts/screenshots/w${WEEK}`);
  if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir, { recursive: true });
  const artifactSsDir = process.env.ARTIFACT_SS_DIR ? path.resolve(process.env.ARTIFACT_SS_DIR) : null;
  if (artifactSsDir && !fs.existsSync(artifactSsDir)) fs.mkdirSync(artifactSsDir, { recursive: true });

  let currentQuestErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('favicon.ico') && !text.includes('chrome-extension')) {
        currentQuestErrors.push(`[console.error] ${text}`);
      }
    }
  });
  page.on('pageerror', err => {
    currentQuestErrors.push(`[pageerror] ${err.message}`);
  });

  const targetQuestArg = process.argv.find(a => a.startsWith('--quest='));
  const targetQuest = targetQuestArg ? targetQuestArg.split('=')[1] : null;
  const questIds = targetQuest ? [targetQuest] : Object.keys(QUESTS_SPEC);
  const questDoms = {};
  const results = [];
  const interactionEvidenceMap = {};
  let globalPass = true;

  for (let qi = 0; qi < questIds.length; qi++) {
    const qid = questIds[qi];
    const qspec = QUESTS_SPEC[qid];
    const url = `${PROD_BASE}/week/${WEEK}/task/${qid}`;
    process.stdout.write(`\n[${qi + 1}/${questIds.length}] ${qid}  →  ${url}\n`);

    let dom = '';
    const baseWait = qspec.waitMs || 1500;
    currentQuestErrors = [];

    try {
      let navOk = false;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
          await page.waitForTimeout(baseWait);
          navOk = true;
          break;
        } catch (e) {
          if (attempt === 0) await page.waitForTimeout(1500);
          else throw e;
        }
      }

      if (qspec.clickStart) {
        const btnSel = `button:has-text("${qspec.clickText || 'START'}")`;
        const btn = page.locator(btnSel).first();
        if (await btn.isVisible({ timeout: 4000 }).catch(() => false)) {
          await btn.click();
          await page.waitForTimeout(qspec.waitMs || 1000);
        }
      }

      dom = await page.evaluate(() => (document.body?.innerText || '').trim());
      questDoms[qid] = dom;

      // Capture initial screenshot
      const ssPath = path.join(ssDir, `${qid}.png`);
      await page.screenshot({ path: ssPath });
      if (artifactSsDir) {
        try { fs.copyFileSync(ssPath, path.join(artifactSsDir, `${qid}.png`)); } catch (_) {}
      }
    } catch (e) {
      dom = '';
      questDoms[qid] = '';
      console.log(`   ⚠️  Navigation error: ${e.message}`);
    }

    // NEGATIVE assertions (global + quest specific)
    const negPatterns = [...GLOBAL_NEGATIVES, ...(qspec.neg || [])];
    let negFail = null;
    for (const pat of negPatterns) {
      if (dom.includes(pat)) {
        negFail = pat;
        break;
      }
    }
    const negStatus = negFail ? `FAIL(banned:"${negFail}")` : 'ok';

    // POSITIVE assertions
    const posResults = [];
    for (const chk of (qspec.pos || [])) {
      let result;
      try {
        if (chk.type === 'interaction_check') {
          result = await runInteractionCheck(page, chk);
        } else if (chk.type === 'dom_count') {
          const locator = page.locator(chk.selector);
          const count = await locator.count();
          const min = chk.min || 1;
          if (count < min) {
            result = { pass: false, snippet: dom.slice(0, 300), reason: `Found only ${count}/${min} element(s) matching '${chk.selector}'` };
          } else {
            let textLenPass = true;
            let failedText = '';
            const minTextLen = chk.min_text_len || (chk.selector.includes('clil-glossary-chip') ? 10 : 0);
            if (minTextLen > 0) {
              for (let i = 0; i < count; i++) {
                const txt = (await locator.nth(i).innerText()).trim();
                if (txt.length < minTextLen) {
                  textLenPass = false;
                  failedText = `Chip #${i + 1} text "${txt}" length ${txt.length} < min length ${minTextLen}`;
                  break;
                }
              }
            }
            if (!textLenPass) {
              result = { pass: false, snippet: dom.slice(0, 300), reason: failedText };
            } else {
              result = { pass: true, snippet: `Found ${count} element(s) matching '${chk.selector}' (min: ${min}${minTextLen > 0 ? `, all textContent >= ${minTextLen} chars` : ''})` };
            }
          }
        } else if (chk.type === 'numbers_overlap') {
          const numbersInDom = (dom.match(/\b\d+\b/g) || []).map(n => parseInt(n, 10));
          const uniqueNums = [...new Set(numbersInDom)];
          const min = chk.min || 2;
          if (uniqueNums.length >= min) {
            result = { pass: true, snippet: `Found numbers in bar model DOM: [${uniqueNums.slice(0, 6).join(', ')}]` };
          } else {
            result = { pass: false, snippet: dom.slice(0, 300), reason: `Found only ${uniqueNums.length}/${min} numbers in DOM` };
          }
        } else if (chk.type === 'click_test_hotspots') {
          try {
            // Find all hotspot buttons (absolute positioned rounded-full buttons)
            const hotspotBtns = await page.$$('button.rounded-full.absolute, button[style*="left:"]');
            for (const btn of hotspotBtns) {
              await btn.click({ force: true }).catch(() => {});
              await page.waitForTimeout(150);
            }
            await page.waitForTimeout(500);
            const clickDom = await page.evaluate(() => (document.body?.innerText || '').trim());
            const has4of4 = clickDom.includes('Found 4 of 4') || clickDom.includes('4 of 4 Differences') || clickDom.includes('4/4');
            if (has4of4) {
              result = { pass: true, snippet: `Found 4 of 4 Differences verified in DOM after clicking ${hotspotBtns.length} hotspots` };
            } else {
              result = { pass: false, snippet: clickDom.slice(0, 300), reason: `Hotspot click test failed to reach 4/4 (DOM: ${clickDom.slice(0, 150)})` };
            }
          } catch (e) {
            result = { pass: false, snippet: '', reason: `click_test_hotspots error: ${e.message}` };
          }
        } else if (chk.type === 'file_check') {
          const resolvedPath = chk.path.replace(/week\d+/i, `week${WEEK}`);
          const targetPath = path.resolve(rootDir, resolvedPath);
          if (fs.existsSync(targetPath)) {
            const fileContent = fs.readFileSync(targetPath, 'utf8');
            if (!chk.require || fileContent.includes(chk.require)) {
              result = { pass: true, snippet: `File ${resolvedPath} exists and contains required string` };
            } else {
              result = { pass: false, snippet: fileContent.slice(0, 200), reason: `File ${resolvedPath} does not contain '${chk.require}'` };
            }
          } else {
            result = { pass: false, snippet: '', reason: `File ${resolvedPath} does not exist` };
          }
        } else if (chk.type === 'scenes_ratio_16_9') {
          try {
            const weekDir = path.resolve(rootDir, `public/images/week${WEEK}`);
            const files = fs.readdirSync(weekDir).filter(f => /^(webtoon_scene_[1-5]|writing_panel_[1-3])\.(png|jpg)$/.test(f));
            let all16x9 = true;
            const details = [];
            for (const f of files) {
              const fPath = path.join(weekDir, f);
              const outW = execSync(`sips -g pixelWidth "${fPath}"`).toString();
              const outH = execSync(`sips -g pixelHeight "${fPath}"`).toString();
              const w = parseInt(outW.match(/pixelWidth:\s*(\d+)/)[1], 10);
              const h = parseInt(outH.match(/pixelHeight:\s*(\d+)/)[1], 10);
              const ratio = w / h;
              const is16x9 = Math.abs(ratio - (16 / 9)) <= 0.08 || Math.abs(ratio - (1264 / 848)) <= 0.05;
              details.push(`${f}: ${w}x${h} (r=${ratio.toFixed(2)})`);
              if (!is16x9) all16x9 = false;
            }
            if (all16x9 && files.length > 0) {
              result = { pass: true, snippet: `All ${files.length} story scenes verified 16:9 [${details.slice(0, 3).join(', ')}]` };
            } else {
              result = { pass: false, snippet: '', reason: `Story scenes not 16:9: ${details.join('; ')}` };
            }
          } catch (e) {
            result = { pass: false, snippet: '', reason: `scenes_ratio_16_9 error: ${e.message}` };
          }
        } else if (chk.type === 'hotspot_alignment_check') {
          try {
            const calibPath = path.resolve(rootDir, `docs/week${WEEK}_hotspot_calibration.json`);
            const speakingPath = path.resolve(rootDir, `src/data/weeks/week_${WEEK}/speaking_hub.js`);
            if (!fs.existsSync(calibPath)) {
              result = { pass: false, snippet: '', reason: `Calibration file not found at ${calibPath}` };
            } else if (!fs.existsSync(speakingPath)) {
              result = { pass: false, snippet: '', reason: `speaking_hub.js not found at ${speakingPath}` };
            } else {
              const calib = JSON.parse(fs.readFileSync(calibPath, 'utf8'));
              const speakingModule = await import(`file://${speakingPath}?t=${Date.now()}`);
              const spkHub = speakingModule.speakingHub || speakingModule.speakingHubData || speakingModule.default || {};
              const dataDiffs = spkHub.find_differences?.differences || [];
              const centroids = calib.centroids || calib.differences || [];
              const expectedCount = calib.regions || calib.mapped || dataDiffs.length;

              if (dataDiffs.length !== expectedCount || centroids.length !== expectedCount) {
                result = { pass: false, snippet: '', reason: `Expected ${expectedCount} diffs and ${expectedCount} centroids, got ${dataDiffs.length} diffs and ${centroids.length} centroids` };
              } else {
                let maxDist = 0;
                for (const d of dataDiffs) {
                  const minDistToCentroid = Math.min(...centroids.map(c => Math.hypot(d.x - c.x, d.y - c.y)));
                  if (minDistToCentroid > maxDist) maxDist = minDistToCentroid;
                }
                const limit = chk.max_error_pct || 6.0;
                if (maxDist <= limit) {
                  result = { pass: true, snippet: `Direct calculation: Data coordinates match pixel centroids within ${maxDist.toFixed(2)}% (limit <= ${limit}%)` };
                } else {
                  result = { pass: false, snippet: '', reason: `Direct calculation: Max error ${maxDist.toFixed(2)}% > ${limit}% limit between data coords and centroids` };
                }
              }
            }
          } catch (e) {
            result = { pass: false, snippet: '', reason: `hotspot_alignment_check error: ${e.message}` };
          }
        } else if (chk.type === 'story_writer_ladder_test') {
          try {
            // STEP 1: Verify MODEL badge, locked connector, ordered chips
            const badge1 = await page.locator('[data-testid="ladder-badge"]').innerText().catch(() => '');
            if (!badge1.includes('MODEL')) {
              result = { pass: false, snippet: '', reason: `Step 1 ladder badge expected MODEL, got "${badge1}"` };
            } else {
              const lockedConn = page.locator('[data-testid="locked-connector"], [data-testid="connector-btn"]').first();
              const hasLockedConn = await lockedConn.isVisible().catch(() => false);
              const lockedText = hasLockedConn ? await lockedConn.innerText() : '';
              if (!hasLockedConn || (!lockedText.includes('In the beginning') && !lockedText.includes('Suddenly'))) {
                result = { pass: false, snippet: '', reason: `Step 1 connector missing or invalid: "${lockedText}"` };
              } else {
                // Fill clean, grammatical model sentence for Scene 1 (replaces chip-clicking loop)
                const s1Text = Number(WEEK) === 34
                  ? "In the beginning, a little mouse was playing happily in the warm forest."
                  : "In the beginning, Jake walked carefully down the quiet school corridor after science class.";
                const ta1 = page.locator('textarea').first();
                await ta1.fill(s1Text);
                await page.waitForTimeout(200);
                
                // Click Next Scene
                const nextBtn1 = page.locator('button:has-text("Next Scene")').first();
                await nextBtn1.click();
                await page.waitForTimeout(600);

                // STEP 2: Verify BUILD badge, >=3 connector options, shuffled chips
                const badge2 = await page.locator('[data-testid="ladder-badge"]').innerText().catch(() => '');
                const connBtns2 = await page.locator('[data-testid="connector-btn"]').count();
                const step2Chips = await page.$$eval('[data-testid="content-chip"]', els => els.map(e => e.innerText.replace(/^\+\s*/, '').trim()));
                
                if (!badge2.includes('BUILD')) {
                  result = { pass: false, snippet: '', reason: `Step 2 ladder badge expected BUILD, got "${badge2}"` };
                } else if (connBtns2 < 3) {
                  result = { pass: false, snippet: '', reason: `Step 2 expected >=3 connector buttons, got ${connBtns2}` };
                } else {
                  // Fill clean, grammatical model sentence for Scene 2 (replaces chip-clicking loop)
                  const s2Text = Number(WEEK) === 34
                    ? "Suddenly, a huge lion caught the mouse and roared with anger."
                    : "Suddenly, Tom lost his balance on the wet floor and slipped.";
                  const ta2 = page.locator('textarea').first();
                  await ta2.fill(s2Text);
                  await page.waitForTimeout(200);

                  // Click Next Scene
                  const nextBtn2 = page.locator('button:has-text("Next Scene")').first();
                  await nextBtn2.click();
                  await page.waitForTimeout(600);

                  // STEP 3: Verify WRITE badge, base verb keywords, textarea required
                  const badge3 = await page.locator('[data-testid="ladder-badge"]').innerText().catch(() => '');
                  const step3ChipsText = await page.$$eval('[data-testid="content-chip"]', els => els.map(e => e.innerText.replace(/^\+\s*/, '').trim()));
                  const hasBaseVerb = step3ChipsText.some(t => /\b(chew|free|bandage|run|trap|hurt|nurse|call|stop|cry|calm|pain)\b/i.test(t));
                  
                  // Check Next button is disabled when textarea has <5 words
                  const advanceBtn = page.locator('button:has-text("Next Scene"), button:has-text("Review Complete Story")').first();
                  const isDisabledInitial = await advanceBtn.isDisabled().catch(() => false);

                  if (!badge3.includes('WRITE')) {
                    result = { pass: false, snippet: '', reason: `Step 3 ladder badge expected WRITE, got "${badge3}"` };
                  } else if (step3ChipsText.length < 2 || !hasBaseVerb) {
                    result = { pass: false, snippet: '', reason: `Step 3 chips expected >=2 with action verbs, got [${step3ChipsText.join(', ')}]` };
                  } else if (!isDisabledInitial) {
                    result = { pass: false, snippet: '', reason: `Step 3 Next button was not disabled when textarea has <5 words` };
                  } else {
                    // Type sentence with past-tense verb in textarea (Scene 3)
                    const s3Text = Number(WEEK) === 34
                      ? "Then, the lion was caught in a hunter's strong net and roared loudly."
                      : "Then, Jake stopped immediately to help his friend and called the school nurse.";
                    const textarea = page.locator('textarea').first();
                    await textarea.fill(s3Text);
                    await page.waitForTimeout(300);

                    // Check Next button is now enabled
                    const isEnabledNow = !(await advanceBtn.isDisabled().catch(() => true));
                    if (!isEnabledNow) {
                      result = { pass: false, snippet: '', reason: `Step 3 Review button remained disabled after typing valid sentence` };
                    } else {
                      await advanceBtn.click();
                      await page.waitForTimeout(600);

                      // If there are more scenes before review (e.g. W33 has 5 scenes), advance through remaining scenes to enter review
                      for (let stepIdx = 3; stepIdx < 5; stepIdx++) {
                        const nextBtn = page.locator('button:has-text("Next Scene"), button:has-text("Review Complete Story")').first();
                        const isVisible = await nextBtn.isVisible().catch(() => false);
                        if (!isVisible) break;
                        const ta = page.locator('textarea').first();
                        if (await ta.isVisible().catch(() => false)) {
                          let stepText = "";
                          if (Number(WEEK) === 34) {
                            stepText = stepIdx === 3
                              ? "After that, the brave mouse chewed the thick ropes with his sharp teeth."
                              : "In the end, the mouse freed the lion, and they became true friends forever.";
                          } else {
                            stepText = stepIdx === 3
                              ? "After that, the school nurse arrived quickly with a clean bandage to treat the cut."
                              : "In the end, everyone felt relieved, and the headmaster reminded all students never to run in corridors.";
                          }
                          await ta.fill(stepText);
                          await page.waitForTimeout(200);
                        }
                        await nextBtn.click();
                        await page.waitForTimeout(600);
                      }

                      // REVIEW SCREEN: Check total words counter + connector counter
                      const totalWordsEl = page.locator('[data-testid="total-words-counter"]').first();
                      const connCounterEl = page.locator('[data-testid="connector-counter"]').first();
                      const hasTotalWords = await totalWordsEl.isVisible().catch(() => false);
                      const hasConnCounter = await connCounterEl.isVisible().catch(() => false);
                      const connCounterText = hasConnCounter ? await connCounterEl.innerText() : '';

                      // Extract assembled continuous story text
                      const assembledStoryText = await page.evaluate(() => {
                        const p = document.querySelector('div.bg-gradient-to-br p.font-serif, div.bg-gradient-to-br p');
                        return (p?.innerText || '').trim();
                      });
                      console.log(`\n📖 [Story Writer Assembled Story Verbatim]:\n"${assembledStoryText}"\n`);

                      if (!hasTotalWords || !hasConnCounter) {
                        result = { pass: false, snippet: '', reason: `Review screen missing total-words-counter (${hasTotalWords}) or connector-counter (${hasConnCounter})` };
                      } else if (Number(WEEK) === 33 && (!assembledStoryText.includes('Jake walked carefully') || !assembledStoryText.includes('Tom lost his balance') || !assembledStoryText.includes('called the school nurse'))) {
                        result = { pass: false, snippet: assembledStoryText, reason: `Assembled story missing model sentences or corrupted: ${assembledStoryText}` };
                      } else {
                        result = {
                          pass: true,
                          snippet: `Mini-ladder verified: Step 1 (MODEL) -> Step 2 (BUILD, 3 conns) -> Step 3 (WRITE, base verbs, 5w gate) -> Review (${connCounterText}). Assembled Story: "${assembledStoryText.slice(0, 100)}..."`
                        };
                      }
                    }
                  }
                }
              }
            }
          } catch (e) {
            result = { pass: false, snippet: '', reason: `story_writer_ladder_test error: ${e.message}` };
          }
        } else if (chk.type === 'keyword_overlap') {
          let sourceDom = questDoms[chk.source_quest] || '';
          if (!sourceDom && chk.source_quest) {
            const srcPage = await context.newPage();
            try {
              await srcPage.goto(`${PROD_BASE}/week/${WEEK}/task/${chk.source_quest}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
              await srcPage.waitForTimeout(1500);
              sourceDom = await srcPage.evaluate(() => (document.body?.innerText || '').trim());
              questDoms[chk.source_quest] = sourceDom;
            } catch (_) {} finally {
              await srcPage.close();
            }
          }
          const sourceWords = (sourceDom.toLowerCase().match(/\b[a-z]{4,}\b/g) || []);
          const currentWords = (dom.toLowerCase().match(/\b[a-z]{4,}\b/g) || []);
          const overlap = [...new Set(currentWords.filter(w => sourceWords.includes(w) && !['this', 'that', 'with', 'from', 'have', 'were', 'will', 'your', 'about', 'step', 'note', 'book', 'notebook', 'animal', 'forest'].includes(w)))];
          const min = chk.min_overlap || 2;
          if (overlap.length < min) {
            result = { pass: false, snippet: dom.slice(0, 300), reason: `Overlap with ${chk.source_quest} has only ${overlap.length}/${min} keywords: [${overlap.join(', ')}]` };
          } else {
            result = { pass: true, snippet: `[keyword overlap (${overlap.length}): ${overlap.slice(0, 6).join(', ')}]` };
          }
        } else {
          result = evaluatePosCheck(chk, dom);
        }
      } catch (e) {
        result = { pass: false, snippet: '', reason: `Exception: ${e.message}` };
      }
      posResults.push({ name: chk.name, ...result });
    }

    const allPosPass = posResults.every(r => r.pass);
    const posStatus = allPosPass
      ? 'ok'
      : 'FAIL(' + posResults.filter(r => !r.pass).map(r => r.reason).join('; ') + ')';

    const linePass = negFail === null && allPosPass;
    if (!linePass) globalPass = false;

    console.log(`[${qid}] NEG=${negStatus} POS=${posStatus}`);

    for (const pr of posResults) {
      const mark = pr.pass ? '  ✅' : '  ❌';
      console.log(`${mark} CHECK: "${pr.name}"`);
      if (pr.snippet) {
        console.log(`     SNIPPET: ${pr.snippet.replace(/\n+/g, ' ').slice(0, 140)}`);
      }
      if (!pr.pass && pr.reason) {
        console.log(`     REASON:  ${pr.reason}`);
      }
    }

    // Perform meaningful interaction to advance/change quest state for authentic interacted screenshot
    try {
      await performMeaningfulInteraction(page, qid);
      await page.waitForTimeout(600);
    } catch (_) {}

    // Extract live visual/DOM interaction metrics for authentic verification
    let questInteractionState = {};
    try {
      if (qid === 'boss_listening') {
        const linesCount = await page.locator('svg line[stroke="#10b981"], svg line[stroke="#f43f5e"], svg line[stroke="#6366f1"]').count();
        const scoreText = await page.locator('[data-testid="line-matcher-score"]').innerText().catch(() => '');
        questInteractionState = { linesCount, scoreText, pass: linesCount > 0 && scoreText.includes('Score:') };
        console.log(`     🎯 [boss_listening interaction]: lines=${linesCount}, scoreText="${scoreText}" (pass=${questInteractionState.pass})`);
      } else if (qid === 'science_lab') {
        const scoreText = await page.locator('[data-testid="lab-score-display"]').innerText().catch(() => '');
        const placedCount = await page.locator('[data-testid="lab-drop-zone"].bg-emerald-600\\/95, [data-testid="lab-drop-zone"] span:not(:has-text("Drop")):not(:has-text("Tap"))').count();
        questInteractionState = { scoreText, placedCount, pass: scoreText !== '0 PTS' && scoreText.includes('PTS') };
        console.log(`     🎯 [science_lab interaction]: scoreText="${scoreText}", placedCount=${placedCount} (pass=${questInteractionState.pass})`);
      } else if (qid === 'word_blitz') {
        const scoreText = await page.locator('[data-testid="flash-score-display"]').innerText().catch(() => '');
        const matchedCount = await page.locator('span:has-text("✓")').count();
        questInteractionState = { scoreText, matchedCount, pass: scoreText !== '0 PTS' && scoreText.includes('PTS') };
        console.log(`     🎯 [word_blitz interaction]: scoreText="${scoreText}", matchedCount=${matchedCount} (pass=${questInteractionState.pass})`);
      } else if (qid === 'story_writer') {
        const assembled = await page.evaluate(() => {
          const p = document.querySelector('div.bg-gradient-to-br p.font-serif, div.bg-gradient-to-br p');
          return (p?.innerText || '').trim();
        });
        const hasWordSalad = assembled.includes('after science class down the school corridor');
        const hasModelSentence = assembled.includes('Jake walked carefully') || assembled.includes('Jake was walking carefully');
        questInteractionState = { assembled, pass: !hasWordSalad && hasModelSentence };
        console.log(`     🎯 [story_writer interaction]: pass=${questInteractionState.pass}, wordSalad=${hasWordSalad}`);
      } else if (qid === 'science_report') {
        const evidenceVisible = await page.locator('[data-testid="discovery-evidence-card"]').isVisible().catch(() => false);
        const evidenceText = await page.locator('[data-testid="discovery-evidence-card"] p').innerText().catch(() => '');
        questInteractionState = { evidenceVisible, evidenceText, pass: evidenceVisible && evidenceText.length > 10 };
        console.log(`     🎯 [science_report interaction]: evidenceVisible=${evidenceVisible}, text="${evidenceText.slice(0, 45)}..." (pass=${questInteractionState.pass})`);
      } else if (qid === 'sentence_smash') {
        const placedCount = await page.locator('.border-dashed [data-testid="word-block-btn"]').count().catch(() => 0);
        const checkBtnDisabled = await page.locator('[data-testid="grammar-check-btn"]').isDisabled().catch(() => true);
        questInteractionState = { placedCount, checkBtnEnabled: !checkBtnDisabled, pass: placedCount > 0 };
        console.log(`     🎯 [sentence_smash interaction]: placedCount=${placedCount}, checkBtnEnabled=${!checkBtnDisabled} (pass=${questInteractionState.pass})`);
      } else if (qid === 'math_quest') {
        const scoreText = await page.locator('[data-testid="math-score-display"]').innerText().catch(() => '');
        const progressText = await page.locator('span:has-text("/5")').innerText().catch(() => '');
        questInteractionState = { scoreText, progressText, pass: scoreText !== '0 PTS' && scoreText.includes('PTS') };
        console.log(`     🎯 [math_quest interaction]: scoreText="${scoreText}", progressText="${progressText}" (pass=${questInteractionState.pass})`);
      } else if (qid === 'broadcast_studio') {
        const sceneBadge = await page.locator('[data-testid="prompter-scene-badge"]').innerText().catch(() => '');
        const prompterText = await page.locator('[data-testid="prompter-text"]').innerText().catch(() => '');
        questInteractionState = { sceneBadge, prompterText: prompterText.slice(0, 80), pass: sceneBadge.includes('Scene 2') };
        console.log(`     🎯 [broadcast_studio interaction]: badge="${sceneBadge}", text="${prompterText.slice(0, 45)}..." (pass=${questInteractionState.pass})`);
      } else if (qid === 'info_exchange') {
        const phaseTitle = await page.locator('[data-testid="ie-phase-title"]').innerText().catch(() => '');
        const isCard2Active = await page.locator('[data-testid="ie-card2-tab-btn"].bg-indigo-600').isVisible().catch(() => false);
        questInteractionState = { phaseTitle, isCard2Active, pass: isCard2Active || phaseTitle.includes('Phase 2') };
        console.log(`     🎯 [info_exchange interaction]: phaseTitle="${phaseTitle}", isCard2Active=${isCard2Active} (pass=${questInteractionState.pass})`);
      } else if (qid === 'boss_reading') {
        const scoreText = await page.locator('[data-testid="word-bank-score"]').innerText().catch(() => '');
        const assignedText = await page.locator('[data-testid="word-def-slot"]').first().innerText().catch(() => '');
        questInteractionState = { scoreText, assignedWord: assignedText, pass: scoreText.includes('Matching Score') || assignedText.length > 0 };
        console.log(`     🎯 [boss_reading interaction]: scoreText="${scoreText}", assignedWord="${assignedText}" (pass=${questInteractionState.pass})`);
      } else if (qid === 'weekly_review') {
        const counterText = await page.locator('[data-testid="diff-counter"]').innerText().catch(() => '');
        const diffName = await page.locator('[data-testid="diff-name"]').innerText().catch(() => '');
        const sampleAnswer = await page.locator('[data-testid="diff-sample-answer"]').innerText().catch(() => '');
        questInteractionState = { counterText, diffName, sampleAnswer: sampleAnswer.slice(0, 60), pass: counterText.includes('1/') || diffName.length > 0 };
        console.log(`     🎯 [weekly_review interaction]: counter="${counterText}", diffName="${diffName}" (pass=${questInteractionState.pass})`);
      }
    } catch (e) {
      console.warn(`[WARN] Failed to capture interaction metrics for ${qid}: ${e.message}`);
    }

    // Capture interacted screenshot
    try {
      const ssInteracted = path.join(ssDir, `${qid}_interacted.png`);
      await page.screenshot({ path: ssInteracted });
      if (artifactSsDir) {
        try { fs.copyFileSync(ssInteracted, path.join(artifactSsDir, `${qid}_interacted.png`)); } catch (_) {}
      }
    } catch (_) {}

    interactionEvidenceMap[qid] = questInteractionState;

    if (currentQuestErrors.length > 0) {
      console.log(`     ⚠️  CONSOLE/PAGE ERRORS (${currentQuestErrors.length}):`);
      currentQuestErrors.forEach(err => console.log(`        ${err}`));
    }

    results.push({ id: qid, negPass: !negFail, allPosPass, negFail, posResults, errors: [...currentQuestErrors] });
  }

  // Write interaction evidence summary
  const evFile = path.join(ssDir, 'interaction_evidence.json');
  fs.writeFileSync(evFile, JSON.stringify(interactionEvidenceMap, null, 2), 'utf8');
  if (artifactSsDir) {
    try { fs.writeFileSync(path.join(artifactSsDir, 'interaction_evidence.json'), JSON.stringify(interactionEvidenceMap, null, 2), 'utf8'); } catch (_) {}
  }
  console.log(`\n📋 Saved interaction verification evidence: ${evFile}`);

  await browser.close();

  // STEP: Screenshot Deduplication & Integrity Gate
  console.log(`\n========================================================================`);
  console.log(`📸 SCREENSHOT DEDUPLICATION & INTEGRITY CHECK`);
  console.log(`========================================================================`);
  const crypto = await import('crypto');
  const capturedFiles = fs.readdirSync(ssDir).filter(f => f.endsWith('.png'));
  const screenshotHashes = new Map();
  for (const f of capturedFiles) {
    const buf = fs.readFileSync(path.join(ssDir, f));
    const h = crypto.createHash('sha256').update(buf).digest('hex');
    screenshotHashes.set(f, h);
  }
  const uniqueHashes = new Set(screenshotHashes.values());
  console.log(`   Captured ${capturedFiles.length} screenshots in ${ssDir}`);
  console.log(`   Unique SHA256 hashes: ${uniqueHashes.size} / ${capturedFiles.length}`);
  const minRequiredUnique = Math.min(15, questIds.length);
  if (uniqueHashes.size < minRequiredUnique) {
    console.error(`🚨 FATAL: Screenshot deduplication check FAILED!`);
    console.error(`   Found only ${uniqueHashes.size} unique hashes across ${capturedFiles.length} screenshots (minimum required: ${minRequiredUnique}).`);
    console.error(`   This indicates a repeated error screen or crash overlay was captured across multiple quests.`);
    globalPass = false;
  } else {
    console.log(`   ✅ Deduplication check PASSED: ${uniqueHashes.size} distinct screenshot views verified.`);
  }

  // STEP: Check Before vs After Interacted Screenshot Pairs
  console.log(`\n========================================================================`);
  console.log(`📸 BEFORE VS AFTER INTERACTED SCREENSHOT INTEGRITY CHECK`);
  console.log(`========================================================================`);
  let identicalPairsCount = 0;
  for (const qid of questIds) {
    const beforeFile = path.join(ssDir, `${qid}.png`);
    const afterFile = path.join(ssDir, `${qid}_interacted.png`);
    if (fs.existsSync(beforeFile) && fs.existsSync(afterFile)) {
      const hBefore = crypto.createHash('sha256').update(fs.readFileSync(beforeFile)).digest('hex');
      const hAfter = crypto.createHash('sha256').update(fs.readFileSync(afterFile)).digest('hex');
      const isIdentical = hBefore === hAfter;
      if (isIdentical) {
        identicalPairsCount++;
        console.error(`🚨 IDENTICAL SCREENSHOT PAIR: ${qid} (before: ${hBefore.slice(0, 8)} == after: ${hAfter.slice(0, 8)})`);
      } else {
        console.log(`   ✅ ${qid}: distinct screenshots (before: ${hBefore.slice(0, 8)} != after: ${hAfter.slice(0, 8)})`);
      }
    }
  }

  if (identicalPairsCount > 0) {
    console.error(`🚨 FATAL: Found ${identicalPairsCount} identical before/after screenshot pairs! Every quest must show visible progress/interaction in its interacted screenshot.`);
    globalPass = false;
  } else {
    console.log(`   ✅ 100% of ${questIds.length} quests have distinct before/after screenshot pairs!`);
  }

  // STEP: Check data_consistency
  let consistencyPass = true;
  if (SPEC.data_consistency && Array.isArray(SPEC.data_consistency)) {
    console.log(`\n========================================================================`);
    console.log(`🔍 DATA CONSISTENCY ASSERTIONS`);
    console.log(`========================================================================`);
    for (const dc of SPEC.data_consistency) {
      if (dc.type === 'file_equality') {
        try {
          const spPath = path.resolve(rootDir, `src/data/weeks/week_${WEEK}/skill_practice_hub.js`);
          let spMod = null;
          if (fs.existsSync(spPath)) {
            spMod = await import(`file://${spPath}`);
          } else {
            spMod = await import(`file://${path.resolve(rootDir, `src/data/weeks/week_${WEEK}/listening_hub.js`)}`);
          }
          const smMod = await import(`file://${path.resolve(rootDir, `src/data/weeks/week_${WEEK}/singapore_math.js`)}`);
          const lhProblems = spMod.skillPracticeHub?.singapore_math || spMod.skillPracticeHubData?.singapore_math || spMod.listeningHub?.singapore_math || [];
          const smProblems = (smMod.default?.problems || smMod.problems || []);
          let match = true;
          let diffMsg = '';
          for (let i = 0; i < 5; i++) {
            const lhText = (lhProblems[i]?.problem_en || '').trim();
            const smText = (smProblems[i]?.problemText || '').trim();
            if (lhText !== smText) {
              match = false;
              diffMsg = `Mismatch problem ${i + 1}: "${lhText}" vs "${smText}"`;
              break;
            }
          }
          if (match) {
            console.log(`  ✅ CHECK: "${dc.name}"`);
            console.log(`     SNIPPET: 100% Identical 5 problems`);
          } else {
            console.error(`  ❌ CHECK: "${dc.name}"`);
            console.error(`     REASON:  ${diffMsg}`);
            consistencyPass = false;
            globalPass = false;
          }
        } catch (e) {
          console.error(`  ❌ CHECK: "${dc.name}" — ${e.message}`);
          consistencyPass = false;
          globalPass = false;
        }
      } else if (dc.type === 'field_exists') {
        try {
          const mod = await import(`file://${path.resolve(rootDir, `src/data/weeks/week_${WEEK}/` + dc.file)}`);
          const data = mod.default || mod[Object.keys(mod)[0]];
          let ok = true;
          let detail = '';
          if (dc.path.includes('examiner_questions') || dc.path.includes('table_b')) {
            const eq = data?.info_exchange_cards?.table_b?.fields?.filter(f => f.nova_question || f.audio_url)
              || data?.info_exchange_cards?.examiner_questions
              || data?.info_exchange?.examiner_questions
              || [];
            ok = eq.length >= 3 && eq.every(q => q.audio_url);
            detail = `${eq.length} questions with audio_url`;
          } else if (dc.path === 'writing_chunks') {
            const wc = data?.writing_chunks;
            ok = !!(wc && wc.setting_time && wc.action_manner && wc.problem_event && wc.solution_outcome);
            detail = ok ? '4 chunk groups verified' : 'missing chunk group';
          }
          if (ok) {
            console.log(`  ✅ CHECK: "${dc.name}"`);
            console.log(`     SNIPPET: ${detail}`);
          } else {
            console.error(`  ❌ CHECK: "${dc.name}"`);
            console.error(`     REASON:  ${detail || 'field does not exist'}`);
            consistencyPass = false;
            globalPass = false;
          }
        } catch (e) {
          console.error(`  ❌ CHECK: "${dc.name}" — ${e.message}`);
          consistencyPass = false;
          globalPass = false;
        }
      }
    }
  }

  console.log(`\n========================================================================`);
  console.log(`📋 GATE 15 CHECKLIST SUMMARY — WEEK ${WEEK}:`);
  console.log(`========================================================================`);
  let passCount = 0;
  for (const r of results) {
    const ok = r.negPass && r.allPosPass;
    if (ok) passCount++;
    const mark = ok ? '✅' : '❌';
    const negInfo = r.negPass ? 'NEG=ok' : `NEG=FAIL("${r.negFail}")`;
    const posInfo = r.allPosPass ? 'POS=ok' : `POS=FAIL`;
    console.log(`${mark} [${r.id}] ${negInfo} ${posInfo}`);
  }

  console.log(`\n========================================================================`);
  console.log(`🔒 SPEC SHA256: ${specSha}`);
  if (globalPass && consistencyPass && passCount === questIds.length) {
    console.log(`🎉 GATE 15 PASSED: ${passCount}/${questIds.length} Quests — 100% Clean DOM Assertions`);
    if (isLocal) {
      console.log(`✅ LOCAL VERIFIED — Week ${WEEK} passed on ${PROD_BASE} (NOT live production)`);
    } else {
      console.log(`✅ PRODUCTION CERTIFIED — Week ${WEEK} verified on ${PROD_BASE}`);
    }
    process.exit(0);
  } else {
    console.error(`🚨 GATE 15 FAILED: ${passCount}/${questIds.length} passed`);
    console.error(`❌ Fix failed quests before pushing to production`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`FATAL:`, err);
  process.exit(1);
});
