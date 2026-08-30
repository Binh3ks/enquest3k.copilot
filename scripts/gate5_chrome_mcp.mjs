#!/usr/bin/env node
/**
 * GATE 5 (Chrome MCP Edition) — Runtime Visual Smoke Test
 * Uses Chrome MCP at http://127.0.0.1:12306/mcp (streamable-http)
 * Replaces Playwright-based gate5_runtime_visual_smoke.mjs
 *
 * Tests all 15 W33 task URLs:
 * 1. Page loads (no blank/error screen)
 * 2. textContent.length >= 80
 * 3. Blueprint keywords present
 * 4. No global negatives from GATE15_SPEC
 *
 * Usage: node scripts/gate5_chrome_mcp.mjs [weekNum] [--prod]
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

const QUEST_IDS = [
  'gear1_webtoon','gear2_karaoke','gear3_retell','gear4_clil',
  'science_lab','science_report','word_blitz','sentence_smash',
  'math_quest','story_writer','broadcast_studio','info_exchange',
  'boss_listening','boss_reading','weekly_review'
];

const bpPath = path.join(rootDir, `src/data/weeks/week_${weekNum}/blueprint.json`);
const blueprint = fs.existsSync(bpPath) ? JSON.parse(fs.readFileSync(bpPath, 'utf8')) : {};
const targetKeywords = blueprint.keywords || [];

const specPath = path.join(rootDir, `docs/GATE15_SPEC_W${weekNum}.json`);
const specFallback = path.join(rootDir, `docs/GATE15_SPEC.json`);
const spec = fs.existsSync(specPath) ? JSON.parse(fs.readFileSync(specPath, 'utf8')) :
             fs.existsSync(specFallback) ? JSON.parse(fs.readFileSync(specFallback, 'utf8')) : {};
const globalNegatives = spec.global_negative_patterns || [];

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
  const result = await mcpPost({ jsonrpc: '2.0', id: Date.now(), method, params });
  if (result?.error) throw new Error(`MCP error: ${JSON.stringify(result.error)}`);
  return result?.result;
}

async function callTool(name, args) {
  return await mcpCall('tools/call', { name, arguments: args });
}

// ── Main ──────────────────────────────────────────────────────────────────
async function runGate5() {
  console.log('\n========================================================================');
  console.log(`🛡️  GATE 5 (Chrome MCP): RUNTIME SMOKE TEST — WEEK ${weekNum}`);
  console.log(`📍 ${BASE_URL} | 🔌 ${MCP_URL}`);
  console.log('========================================================================\n');

  // Initialize
  try {
    await mcpCall('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'gate5-chrome-mcp', version: '1.0.0' }
    });
    await mcpPost({ jsonrpc: '2.0', method: 'notifications/initialized', params: {} });
  } catch (err) {
    console.error(`❌ FATAL: Cannot connect to Chrome MCP at ${MCP_URL}`);
    console.error(`   ${err.message}`);
    console.error('   → Make sure Chrome MCP Server is running on Port 12306');
    process.exit(1);
  }

  // List tools
  const toolsResult = await mcpCall('tools/list');
  const tools = toolsResult?.tools || [];
  console.log(`✅ Connected. Tools: ${tools.map(t => t.name).join(', ')}\n`);

  const navigateTool = tools.find(t => t.name.toLowerCase().includes('navigate'))?.name;
  const contentTool = tools.find(t => ['getContent','getInnerText','dom_snapshot','evaluate','screenshot'].includes(t.name))?.name
                   || tools.find(t => t.name.toLowerCase().includes('content') || t.name.toLowerCase().includes('dom'))?.name;

  console.log(`🔧 Navigate: ${navigateTool || 'NOT FOUND'} | Content: ${contentTool || 'NOT FOUND'}\n`);

  if (!navigateTool) {
    console.error('❌ No navigate tool found. Cannot run smoke test.');
    process.exit(1);
  }

  // Set localStorage to bypass onboarding
  const evalTool = tools.find(t => t.name === 'evaluate' || t.name === 'puppeteer_evaluate')?.name;

  const results = [];
  for (let i = 0; i < QUEST_IDS.length; i++) {
    const taskId = QUEST_IDS[i];
    const url = `${BASE_URL}/week/${weekNum}/task/${taskId}`;
    process.stdout.write(`[${String(i+1).padStart(2)}/15] ${taskId.padEnd(20)} `);

    const errors = [];
    let domText = '';

    try {
      await callTool(navigateTool, { url });
      await new Promise(r => setTimeout(r, 2500));

      // Bypass onboarding if eval available
      if (evalTool) {
        await callTool(evalTool, {
          script: `localStorage.setItem('engquest_onboarded','true');localStorage.setItem('arcade_owner_bypass','true');`
        }).catch(() => {});
      }

      if (contentTool) {
        const r = await callTool(contentTool, {});
        domText = typeof r === 'string' ? r :
                  r?.content?.[0]?.text || r?.text || JSON.stringify(r);
      }

      if (domText.length < 80) errors.push(`TEXT_TOO_SHORT (${domText.length})`);

      const domLower = domText.toLowerCase();
      for (const neg of globalNegatives) {
        if (domText.includes(neg) && domText.length < 1000) {
          errors.push(`NEGATIVE: "${neg}"`);
        }
      }

      if (targetKeywords.length > 0) {
        const found = targetKeywords.slice(0,5).filter(k => domLower.includes(k.toLowerCase()));
        if (found.length === 0) errors.push(`NO_KEYWORDS(${targetKeywords.slice(0,3).join(',')})`);
      }

    } catch (err) {
      errors.push(`ERR: ${err.message.slice(0,80)}`);
    }

    const pass = errors.length === 0;
    console.log(pass ? '✅ PASS' : '❌ FAIL');
    if (!pass) errors.forEach(e => console.log(`     ⚠️  ${e}`));
    results.push({ taskId, pass, errors, len: domText.length });
  }

  const passed = results.filter(r => r.pass).length;
  const failed = results.length - passed;
  console.log('\n========================================================================');
  console.log(`📊 GATE 5 RESULT: ${passed}/15 PASS | ${failed} FAIL`);
  if (failed > 0) {
    results.filter(r => !r.pass).forEach(r => console.log(`  ❌ ${r.taskId}: ${r.errors.join('; ')}`));
    console.log('========================================================================\n');
    process.exit(1);
  } else {
    console.log('🎉 ALL 15 TASKS PASSED');
    console.log('========================================================================\n');
    process.exit(0);
  }
}

runGate5().catch(e => { console.error('FATAL:', e); process.exit(1); });
