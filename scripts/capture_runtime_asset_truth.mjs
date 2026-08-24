#!/usr/bin/env node
/**
 * TASK 22: Production Runtime Asset Truth Capturer & Quarantine Auditor
 * Intercepts real HTTP requests across all 15 routes in Playwright:
 * - Logs all requested media (images, audio, svgs, R2 dev assets)
 * - Deeply triggers Day 5 Boss Battle and Interactive Quests
 * - Classifies into: IN_USE (200), BROKEN (404/failed), ORPHAN (on disk but 0 requests)
 * - Outputs docs/weekN_runtime_asset_truth.json & docs/quarantine_wN.md
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '33';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);

console.log(`\n========================================================================`);
console.log(`🎯 TASK 22: CAPTURE RUNTIME ASSET TRUTH (WEEK ${weekNum})`);
console.log(`========================================================================`);

const BASE_URL = 'http://localhost:5173';

const QUEST_IDS = [
  'gear1_webtoon', 'gear2_karaoke', 'gear3_retell',
  'gear4_clil', 'science_lab', 'science_report',
  'word_blitz', 'sentence_smash', 'math_quest',
  'story_writer', 'broadcast_studio', 'info_exchange',
  'boss_listening', 'boss_reading', 'weekly_review'
];

function getFileSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function captureRuntimeTruth() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // Bypass onboarding
  await page.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', '1');
    localStorage.setItem('engquest_user', JSON.stringify({ name: 'Truth Auditor', avatar: 'fox' }));
  });

  const requestedAssets = new Map(); // url -> { status, quest, type, timestamp }
  let currentRoute = 'init';

  page.on('response', async (res) => {
    const url = res.url();
    const isMedia = url.match(/\.(mp3|png|jpg|jpeg|svg|webp|gif)($|\?)/i) || url.includes('r2.dev') || url.includes('/audio/') || url.includes('/images/');
    if (isMedia && !url.includes('node_modules') && !url.includes('@vite')) {
      const status = res.status();
      const existing = requestedAssets.get(url);
      if (!existing || status === 200) {
        requestedAssets.set(url, {
          url,
          status,
          quest: currentRoute,
          contentType: res.headers()['content-type'] || 'unknown',
          sizeBytes: (await res.body().catch(() => Buffer.from([]))).length
        });
      }
    }
  });

  page.on('requestfailed', (req) => {
    const url = req.url();
    const isMedia = url.match(/\.(mp3|png|jpg|jpeg|svg|webp|gif)($|\?)/i) || url.includes('/audio/') || url.includes('/images/');
    if (isMedia) {
      requestedAssets.set(url, {
        url,
        status: 0,
        quest: currentRoute,
        failure: req.failure()?.errorText || 'Unknown failure'
      });
    }
  });

  console.log(`🌐 Navigating through all 15 quest routes at ${BASE_URL}...`);

  for (let i = 0; i < QUEST_IDS.length; i++) {
    const questId = QUEST_IDS[i];
    currentRoute = questId;
    const taskUrl = `${BASE_URL}/week/${weekNum}/task/${questId}`;
    process.stdout.write(`   [${i + 1}/15] Auditing ${questId}... `);

    try {
      await page.goto(taskUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(600);

      // Deep Interaction for Day 3 Arena (Speed Match / Word Blitz)
      if (questId === 'word_blitz') {
        const startBtn = page.locator('button:has-text("START")').first();
        if (await startBtn.isVisible()) {
          await startBtn.click();
          await page.waitForTimeout(400);
        }
      }

      // Deep Interaction for Day 5 Boss Battle Quests
      if (questId.startsWith('boss_') || questId === 'weekly_review') {
        const enterBtn = page.locator('button:has-text("ENTER BOSS BATTLE NOW"), button:has-text("START")').first();
        if (await enterBtn.isVisible()) {
          await enterBtn.click();
          await page.waitForTimeout(600);
        }
      }

      // Deep Interaction for Webtoon Scenes (Flip through panels 1-5 if available)
      if (questId === 'gear1_webtoon') {
        for (let s = 1; s <= 5; s++) {
          const sceneBtn = page.locator(`button:has-text("Scene ${s}"), button:has-text("${s}")`).first();
          if (await sceneBtn.isVisible()) {
            await sceneBtn.click().catch(() => {});
            await page.waitForTimeout(200);
          }
        }
      }

      console.log(`✅ OK`);
    } catch (e) {
      console.log(`⚠️ Navigation warning: ${e.message}`);
    }
  }

  await browser.close();

  // Scan Local Disk Files for Week N
  const weekImgDir = path.join(rootDir, `public/images/week${weekNum}`);
  const weekAudioDir = path.join(rootDir, `public/audio/week${weekNum}`);

  function getDiskFiles(dir, prefix) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => {
        const full = path.join(dir, f);
        return fs.statSync(full).isFile() && !f.startsWith('.');
      })
      .map(f => `${prefix}/${f}`);
  }

  const diskImages = getDiskFiles(weekImgDir, `/images/week${weekNum}`);
  const diskAudios = getDiskFiles(weekAudioDir, `/audio/week${weekNum}`);
  const allDiskAssets = [...diskImages, ...diskAudios];

  // Classify Assets
  const inUse = [];
  const broken = [];
  const requestedPaths = new Set();

  for (const [url, data] of requestedAssets.entries()) {
    let cleanPath = url;
    try {
      const parsed = new URL(url);
      cleanPath = parsed.pathname;
    } catch {
      // relative or raw
    }
    requestedPaths.add(cleanPath);

    if (data.status === 200) {
      inUse.push({
        path: cleanPath,
        quest: data.quest,
        size_bytes: data.sizeBytes,
        content_type: data.contentType
      });
    } else {
      broken.push({
        path: cleanPath,
        quest: data.quest,
        status: data.status,
        failure: data.failure || 'HTTP error'
      });
    }
  }

  // Find Orphan Assets (on disk but never requested)
  const orphans = [];
  for (const diskAsset of allDiskAssets) {
    if (!requestedPaths.has(diskAsset)) {
      const localFilePath = path.join(rootDir, 'public', diskAsset.startsWith('/') ? diskAsset.slice(1) : diskAsset);
      orphans.push({
        path: diskAsset,
        size_bytes: fs.existsSync(localFilePath) ? fs.statSync(localFilePath).size : 0,
        sha256: getFileSha256(localFilePath)
      });
    }
  }

  const truthReport = {
    week: weekNum,
    captured_at: new Date().toISOString(),
    summary: {
      total_in_use: inUse.length,
      total_broken: broken.length,
      total_orphans: orphans.length,
      total_disk_assets: allDiskAssets.length
    },
    in_use: inUse,
    broken: broken,
    orphans: orphans
  };

  const truthJsonPath = path.join(rootDir, `docs/week${weekNum}_runtime_asset_truth.json`);
  fs.writeFileSync(truthJsonPath, JSON.stringify(truthReport, null, 2), 'utf8');
  console.log(`\n📄 Saved Runtime Asset Truth to: ${truthJsonPath}`);

  // Generate Quarantine Markdown
  let quarantineMd = `# 🗄️ QUARANTINE REPORT — WEEK ${weekNum}\n\n`;
  quarantineMd += `> Generated: ${new Date().toISOString()}\n`;
  quarantineMd += `> Total In-Use Assets: **${inUse.length}** | Total Broken: **${broken.length}** | Total Orphan Assets: **${orphans.length}**\n\n`;

  quarantineMd += `## 1. ⚠️ BROKEN ASSETS (Requested but Failed/404)\n\n`;
  if (broken.length === 0) {
    quarantineMd += `*None. All requested assets resolved 200 OK.*\n\n`;
  } else {
    quarantineMd += `| Requested Path | Quest Route | Status / Failure |\n|---|---|---|\n`;
    broken.forEach(b => {
      quarantineMd += `| \`${b.path}\` | \`${b.quest}\` | ${b.status} (${b.failure}) |\n`;
    });
    quarantineMd += `\n`;
  }

  quarantineMd += `## 2. 📦 ORPHAN ASSETS (Present on Disk but 0 Runtime Requests)\n\n`;
  quarantineMd += `*These files exist on disk in \`public/images/week${weekNum}\` or \`public/audio/week${weekNum}\` but were NEVER requested by any of the 15 production quest routes. They must NOT be included in the production baseline manifest.*\n\n`;
  quarantineMd += `| Orphan Disk Path | Size | SHA-256 (first 12) |\n|---|---|---|\n`;
  orphans.forEach(o => {
    quarantineMd += `| \`${o.path}\` | ${(o.size_bytes / 1024).toFixed(1)} KB | \`${o.sha256 ? o.sha256.slice(0, 12) : 'N/A'}\` |\n`;
  });

  const quarantinePath = path.join(rootDir, `docs/quarantine_w${weekNum}.md`);
  fs.writeFileSync(quarantinePath, quarantineMd, 'utf8');
  console.log(`📄 Saved Quarantine Report to: ${quarantinePath}`);

  console.log(`\n========================================================================`);
  console.log(`📊 RUNTIME TRUTH SUMMARY FOR WEEK ${weekNum}:`);
  console.log(`   - ✅ In-Use (200 OK): ${inUse.length} assets`);
  console.log(`   - ❌ Broken (404/Err): ${broken.length} assets`);
  console.log(`   - 🗄️  Orphan (Unused):  ${orphans.length} assets`);
  console.log(`========================================================================\n`);

  return truthReport;
}

captureRuntimeTruth().catch(err => {
  console.error(`Fatal Task 22 Error:`, err);
  process.exit(1);
});
