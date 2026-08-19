#!/usr/bin/env node
/**
 * mcp_model_router.mjs
 * MCP Server: wraps model_router.mjs → exposes `classify_task` tool via stdio
 *
 * Antigravity agent tự gọi tool này mỗi đầu conversation để nhận:
 *   { tier, model, tokenMultiplier, shouldNotify, notificationMessage }
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// ─── Router Logic ─────────────────────────────────────────────────────────────

const TIERS = {
  OPERATIONS: {
    tier: 1,
    name: 'Tier 1 — Fast Operations (Shell / Git / Audit)',
    model: 'Flash (default)',
    tokenMultiplier: 0.05,
    shouldNotify: false,
    keywords: ['git', 'commit', 'push', 'audit', 'list', 'status', 'handoff',
               'start', 'clean', 'build', 'log', 'run npm', 'chạy', 'kiểm tra'],
  },
  CODE_BUILD: {
    tier: 2,
    name: 'Tier 2 — Code & Feature Build (React / UI / Hooks)',
    model: 'Flash hoặc Standard',
    tokenMultiplier: 0.30,
    shouldNotify: false,
    keywords: ['component', 'ui', 'fix', 'refactor', 'style', 'hook',
               'view', 'route', 'state', 'css', 'layout', 'api', 'sửa'],
  },
  DEEP_REASONING: {
    tier: 3,
    name: 'Tier 3 — Deep Reasoning & Cambridge Blueprint',
    model: 'Claude Sonnet Thinking hoặc Gemini Pro',
    tokenMultiplier: 1.0,
    shouldNotify: true,
    notificationMessage:
      '> 🧠 **Tier 3 — Deep Reasoning detected**\n' +
      '> Task này yêu cầu suy luận phức tạp / debug crash / Cambridge blueprint.\n' +
      '> Khuyến nghị: Chuyển sang **Claude Sonnet (Thinking)** trong Model Settings.',
    keywords: ['math', 'bar model', 'flyers', 'blueprint', 'audio script',
               'listening part', 'speaking part', 'rubric', 'debug crash',
               'root cause', 'calibration', 'pin', 'svg', 'cambridge', 'thiết kế'],
  },
  SUBAGENT_SWARM: {
    tier: 4,
    name: 'Tier 4 — Multi-Agent Subagent Swarm (Parallel Generation)',
    model: 'Gemini Pro + Subagent',
    tokenMultiplier: 0.5,
    shouldNotify: true,
    notificationMessage:
      '> 🧠 **Tier 4 — Subagent Swarm detected**\n' +
      '> Task này cần sinh nhiều file song song / full week pipeline.\n' +
      '> Khuyến nghị: Chuyển sang **Gemini Pro** và dùng /goal command.',
    keywords: ['full week', 'all weeks', 'mass generate', 'pipeline',
               'parallel', 'toàn bộ tuần', 'sinh cả tuần', 'tất cả epic'],
  },
};

function classifyTask(prompt = '') {
  const p = prompt.toLowerCase();
  if (TIERS.SUBAGENT_SWARM.keywords.some(k => p.includes(k))) return TIERS.SUBAGENT_SWARM;
  if (TIERS.DEEP_REASONING.keywords.some(k => p.includes(k)))  return TIERS.DEEP_REASONING;
  if (TIERS.OPERATIONS.keywords.some(k => p.includes(k)))      return TIERS.OPERATIONS;
  return TIERS.CODE_BUILD;
}

// ─── MCP Server ───────────────────────────────────────────────────────────────

const server = new Server(
  { name: 'engquest-model-router', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'classify_task',
      description:
        'Phân loại task vào Tier 1-4 và gợi ý model tối ưu. ' +
        'Gọi ở ĐẦU mỗi conversation để tuân thủ AGENTS.md Model Routing Protocol.',
      inputSchema: {
        type: 'object',
        properties: {
          prompt: { type: 'string', description: 'Prompt gốc của user' },
        },
        required: ['prompt'],
      },
    },
    {
      name: 'get_tier_table',
      description: 'Lấy bảng Tier & Model Mapping đầy đủ.',
      inputSchema: { type: 'object', properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'classify_task') {
    const prompt = args?.prompt || '';
    const r = classifyTask(prompt);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          tier: r.tier,
          tierName: r.name,
          recommendedModel: r.model,
          tokenFootprint: `${Math.round(r.tokenMultiplier * 100)}% of budget`,
          shouldNotify: r.shouldNotify,
          ...(r.notificationMessage ? { notificationMessage: r.notificationMessage } : {}),
          analyzedPrompt: prompt.slice(0, 120),
        }, null, 2),
      }],
    };
  }

  if (name === 'get_tier_table') {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(
          Object.values(TIERS).map(t => ({
            tier: t.tier, name: t.name, model: t.model,
            shouldNotify: t.shouldNotify,
            sampleKeywords: t.keywords.slice(0, 4),
          })), null, 2
        ),
      }],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
