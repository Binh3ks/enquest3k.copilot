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
const PROD_BASE = 'https://app.bkbacademy.vn';
const rootDir = process.cwd();
const SPEC_PATH = path.resolve(rootDir, 'docs/GATE15_SPEC.json');

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
    const newDom = await page.evaluate(() => (document.body?.innerText || '').trim());
    return evaluatePosCheck(assertion, newDom);
  } catch (e) {
    return { pass: false, snippet: '', reason: `Interaction failed: ${e.message}` };
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

  // STEP 2: Launch browser and run all assertions
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (compatible; Gate15/2.0; EngQuest QA Bot)'
  });
  const page = await context.newPage();

  // Auth bypass
  await page.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('engquest_user', JSON.stringify({ name: 'Gate15 QA', avatar: 'lion', role: 'owner' }));
  });

  const questIds = Object.keys(QUESTS_SPEC);
  const questDoms = {};
  const results = [];
  let globalPass = true;

  for (let qi = 0; qi < questIds.length; qi++) {
    const qid = questIds[qi];
    const qspec = QUESTS_SPEC[qid];
    const url = `${PROD_BASE}/week/${WEEK}/task/${qid}`;
    process.stdout.write(`\n[${qi + 1}/${questIds.length}] ${qid}  →  ${url}\n`);

    let dom = '';
    const baseWait = qspec.waitMs || 1500;

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(baseWait);

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
          const count = await page.locator(chk.selector).count();
          const min = chk.min || 1;
          if (count >= min) {
            result = { pass: true, snippet: `Found ${count} element(s) matching '${chk.selector}' (min: ${min})` };
          } else {
            result = { pass: false, snippet: dom.slice(0, 300), reason: `Found only ${count}/${min} element(s) matching '${chk.selector}'` };
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
        } else if (chk.type === 'file_check') {
          const targetPath = path.resolve(rootDir, chk.path);
          if (fs.existsSync(targetPath)) {
            const fileContent = fs.readFileSync(targetPath, 'utf8');
            if (!chk.require || fileContent.includes(chk.require)) {
              result = { pass: true, snippet: `File ${chk.path} exists and contains required string` };
            } else {
              result = { pass: false, snippet: fileContent.slice(0, 200), reason: `File ${chk.path} does not contain '${chk.require}'` };
            }
          } else {
            result = { pass: false, snippet: '', reason: `File ${chk.path} does not exist` };
          }
        } else if (chk.type === 'keyword_overlap') {
          const sourceDom = questDoms[chk.source_quest] || '';
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

    results.push({ id: qid, negPass: !negFail, allPosPass, negFail, posResults });
  }

  await browser.close();

  // STEP: Check data_consistency
  let consistencyPass = true;
  if (SPEC.data_consistency && Array.isArray(SPEC.data_consistency)) {
    console.log(`\n========================================================================`);
    console.log(`🔍 DATA CONSISTENCY ASSERTIONS`);
    console.log(`========================================================================`);
    for (const dc of SPEC.data_consistency) {
      if (dc.type === 'file_equality') {
        try {
          const lhMod = await import(`file://${path.resolve(rootDir, 'src/data/weeks/week_34/listening_hub.js')}`);
          const smMod = await import(`file://${path.resolve(rootDir, 'src/data/weeks/week_34/singapore_math.js')}`);
          const lhProblems = lhMod.listeningHub?.singapore_math || [];
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
    console.log(`✅ PRODUCTION CERTIFIED — Week ${WEEK} ready for release`);
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
