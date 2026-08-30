#!/usr/bin/env node
/**
 * GATE 15 (Chrome MCP Edition) — Production DOM Assertions
 * Reads predicates from docs/GATE15_SPEC_W{N}.json (or GATE15_SPEC.json)
 * Uses Chrome MCP at http://127.0.0.1:12306/mcp
 * Replaces Playwright-based gate15_production_dom_assertions.mjs
 *
 * Usage: node scripts/gate15_chrome_mcp.mjs [weekNum] [--prod]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '33';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);
const isProd = process.argv.includes('--prod');
const BASE_URL = isProd ? 'https://app.bkbacademy.vn' : 'http://localhost:5173';
const MCP_URL = 'http://127.0.0.1:12306/mcp';

// Load spec
const specPath = path.join(rootDir, `docs/GATE15_SPEC_W${weekNum}.json`);
const fallback = path.join(rootDir, 'docs/GATE15_SPEC.json');
const SPEC_PATH = fs.existsSync(specPath) ? specPath : fallback;
if (!fs.existsSync(SPEC_PATH)) {
  console.error(`FATAL: No spec at ${specPath} or ${fallback}`);
  process.exit(1);
}
const SPEC = JSON.parse(fs.readFileSync(SPEC_PATH, 'utf8'));
const GLOBAL_NEGATIVES = SPEC.global_negative_patterns || [];
const QUESTS_SPEC = SPEC.quests || {};

// ── Chrome MCP Client ──────────────────────────────────────────────────────
let sessionId = null;
async function mcpPost(body) {
  const headers = { 'Content-Type': 'application/json' };
  if (sessionId) headers['mcp-session-id'] = sessionId;
  const res = await fetch(MCP_URL, { method: 'POST', headers, body: JSON.stringify(body) });
  const sid = res.headers.get('mcp-session-id');
  if (sid) sessionId = sid;
  const text = await res.text();
  if (!text.trim()) return null;
  try { return JSON.parse(text); } catch { return { raw: text }; }
}
async function mcpCall(method, params = {}) {
  const r = await mcpPost({ jsonrpc: '2.0', id: Date.now(), method, params });
  if (r?.error) throw new Error(`MCP: ${JSON.stringify(r.error)}`);
  return r?.result;
}
async function callTool(name, args) {
  return await mcpCall('tools/call', { name, arguments: args });
}

// ── Assertion evaluators ──────────────────────────────────────────────────
function evalCheck(check, dom) {
  const lower = dom.toLowerCase();
  switch (check.type) {
    case 'contains_one_of': {
      const vals = check.values || [];
      const hit = vals.find(v => check.case_sensitive ? dom.includes(v) : lower.includes(v.toLowerCase()));
      if (!hit) return { pass: false, reason: `Missing any of [${vals.join(', ')}]` };
      return { pass: true };
    }
    case 'contains_min_count': {
      const vals = check.values || [];
      const hits = vals.filter(v => lower.includes(v.toLowerCase()));
      if (hits.length < (check.min || 1)) return { pass: false, reason: `Only ${hits.length}/${check.min} found` };
      return { pass: true };
    }
    case 'regex': {
      const r = new RegExp(check.pattern, check.flags || 'i');
      if (!r.test(dom)) return { pass: false, reason: `/${check.pattern}/ not found` };
      return { pass: true };
    }
    case 'not_contains': {
      const vals = check.values || [];
      const hits = vals.filter(v => dom.includes(v));
      if (hits.length > 0) return { pass: false, reason: `Found forbidden: ${hits.join(', ')}` };
      return { pass: true };
    }
    default:
      return { pass: true }; // unknown type = skip
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
async function runGate15() {
  console.log('\n========================================================================');
  console.log(`🛡️  GATE 15 (Chrome MCP): DOM ASSERTIONS — WEEK ${weekNum}`);
  console.log(`📍 ${BASE_URL} | Spec: ${path.basename(SPEC_PATH)}`);
  console.log(`🌐 Quests in spec: ${Object.keys(QUESTS_SPEC).length} | Global negatives: ${GLOBAL_NEGATIVES.length}`);
  console.log('========================================================================\n');

  try {
    await mcpCall('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'gate15-chrome-mcp', version: '1.0.0' } });
    await mcpPost({ jsonrpc: '2.0', method: 'notifications/initialized', params: {} });
  } catch (err) {
    console.error(`❌ FATAL: Cannot connect to Chrome MCP: ${err.message}`);
    process.exit(1);
  }

  const toolsResult = await mcpCall('tools/list');
  const tools = toolsResult?.tools || [];
  const navigateTool = tools.find(t => t.name.toLowerCase().includes('navigate'))?.name;
  const contentTool = tools.find(t => ['getContent','getInnerText','dom_snapshot','evaluate'].includes(t.name))?.name
                   || tools.find(t => t.name.toLowerCase().includes('content') || t.name.toLowerCase().includes('dom'))?.name;

  console.log(`✅ Connected | Navigate: ${navigateTool} | Content: ${contentTool}\n`);
  if (!navigateTool) { console.error('❌ No navigate tool'); process.exit(1); }

  const questIds = Object.keys(QUESTS_SPEC);
  let totalChecks = 0, failedChecks = 0;
  const allFailures = [];

  for (const taskId of questIds) {
    const questSpec = QUESTS_SPEC[taskId];
    const checks = questSpec?.checks || [];
    const url = `${BASE_URL}/week/${weekNum}/task/${taskId}`;

    process.stdout.write(`[${taskId.padEnd(20)}] `);

    let dom = '';
    try {
      await callTool(navigateTool, { url });
      await new Promise(r => setTimeout(r, 2500));
      if (contentTool) {
        const r = await callTool(contentTool, {});
        dom = typeof r === 'string' ? r : r?.content?.[0]?.text || r?.text || JSON.stringify(r);
      }
    } catch (e) {
      console.log(`❌ NAV_ERROR: ${e.message.slice(0,60)}`);
      allFailures.push({ taskId, check: 'navigate', reason: e.message });
      failedChecks++;
      continue;
    }

    // Global negative checks
    const negFails = GLOBAL_NEGATIVES.filter(neg => dom.includes(neg));
    if (negFails.length > 0) {
      negFails.forEach(neg => allFailures.push({ taskId, check: 'global_negative', reason: `Found: "${neg}"` }));
      failedChecks += negFails.length;
    }

    // Per-quest checks
    let questFails = 0;
    for (const check of checks) {
      totalChecks++;
      const { pass, reason } = evalCheck(check, dom);
      if (!pass) {
        questFails++;
        failedChecks++;
        allFailures.push({ taskId, check: check.name || check.type, reason });
      }
    }

    if (negFails.length + questFails === 0) {
      console.log(`✅ PASS (${checks.length} checks)`);
    } else {
      console.log(`❌ FAIL (${negFails.length} neg + ${questFails}/${checks.length} checks)`);
      allFailures.filter(f => f.taskId === taskId).forEach(f => console.log(`     ⚠️  [${f.check}] ${f.reason}`));
    }
  }

  console.log('\n========================================================================');
  console.log(`📊 GATE 15 RESULT: ${totalChecks - failedChecks}/${totalChecks} checks PASS | ${failedChecks} FAIL`);
  if (allFailures.length > 0) {
    console.log('\n❌ ALL FAILURES:');
    allFailures.forEach(f => console.log(`  ${f.taskId} [${f.check}]: ${f.reason}`));
    console.log('========================================================================\n');
    process.exit(1);
  } else {
    console.log('🎉 ALL DOM ASSERTIONS PASSED');
    console.log('========================================================================\n');
    process.exit(0);
  }
}

runGate15().catch(e => { console.error('FATAL:', e); process.exit(1); });
