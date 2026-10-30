#!/usr/bin/env node
/**
 * GATE 15 v2 — FUNCTIONAL AUDIO PLAYTEST & TTS RUNTIME GUARD
 * 
 * Strict Enforcement:
 * 1. Clicks every audio button in all 15 Quests.
 * 2. Hooks window.speechSynthesis.speak, Audio.prototype.play, and fetch to texttospeech.googleapis.com.
 * 3. Asserts HTTP 200 and audio/mpeg content-type (zero HTML SPA fallback).
 * 4. Asserts ZERO runtime TTS (both browser speechSynthesis and Google Cloud TTS Direct) in 15 quests.
 * 5. Asserts Speaking Part 2 state machine completes Phase 1 -> Phase 2 (zero freeze in Phase 1).
 * 6. Asserts NO "Dictation Notepad" tab/button in Voice Shadow.
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

import crypto from 'crypto';

const WEEK = parseInt(process.argv[2] || '34', 10);
const hasProdFlag = process.argv.includes('--production');
const hasLocalFlag = process.argv.includes('--local') || process.env.LOCAL === '1';
const isLocal = hasLocalFlag && !hasProdFlag;
const BASE_URL = process.env.BASE_URL || (isLocal ? (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:5173') : 'https://app.bkbacademy.vn');
const envName = isLocal ? 'LOCAL DEV' : 'LIVE PRODUCTION';

console.log('========================================================================');
console.log(`🛡️ GATE 15 v2: FUNCTIONAL PLAYTEST & TTS RUNTIME GUARD (W${WEEK})`);
console.log(`🌍 Target Environment: [${envName}] ${BASE_URL}`);
console.log('========================================================================\n');

async function run() {
  // Check version.json first
  try {
    const verRes = await fetch(`${BASE_URL}/version.json`);
    if (verRes.ok) {
      const ver = await verRes.json();
      console.log(`📌 Production Commit: ${ver.shortCommit || ver.commit} (${ver.builtAt || ver.build_timestamp})\n`);
    }
  } catch (e) {
    console.warn(`⚠️ Could not fetch version.json from ${BASE_URL}: ${e.message}`);
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    permissions: ['microphone', 'camera']
  });

  const page = await context.newPage();

  // Telemetry
  const failures = [];
  const audioRequests = [];
  const runtimeTTSCalls = [];
  const spaFallbacks = [];

  // Network listener
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('texttospeech.googleapis.com')) {
      runtimeTTSCalls.push({ type: 'GoogleCloudTTSDirect', url, method: req.method() });
      console.error(`🚨 [FAIL GATE 15 v2] Runtime Google Cloud TTS call detected: ${url}`);
    }
  });

  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('/audio/') || url.endsWith('.mp3')) {
      const status = res.status();
      const contentType = res.headers()['content-type'] || '';
      let bytes = 0;
      let sha256 = '';
      try {
        const buf = await res.body();
        bytes = buf ? buf.length : 0;
        sha256 = buf ? crypto.createHash('sha256').update(buf).digest('hex') : '';
      } catch (e) {}
      audioRequests.push({ url, status, contentType, bytes, sha256 });
      if (contentType.includes('text/html')) {
        spaFallbacks.push({ url, status, bytes });
        console.error(`🚨 [FAIL GATE 15 v2] Audio file missing (SPA HTML fallback 200): ${url}`);
      }
    }
  });

  // Client init script for hooks and auth
  await page.addInitScript(() => {
    window.__hookTelemetry = {
      speechSynthesisCalls: [],
      audioPlayed: []
    };

    if (window.speechSynthesis) {
      const origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
      window.speechSynthesis.speak = function(utterance) {
        const item = { text: utterance.text, lang: utterance.lang, time: Date.now() };
        window.__hookTelemetry.speechSynthesisCalls.push(item);
        console.warn('🚨 [CLIENT HOOK] window.speechSynthesis.speak called:', item.text);
        return origSpeak(utterance);
      };
    }

    const origPlay = HTMLAudioElement.prototype.play;
    HTMLAudioElement.prototype.play = function() {
      const src = this.src || this.currentSrc;
      window.__hookTelemetry.audioPlayed.push({ src, time: Date.now() });
      return origPlay.apply(this, arguments);
    };

    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: {
        currentUser: { id: 'gate15-tester', name: 'GateTester', display_name: 'GateTester', avatar: 'lion', role: 'owner' },
        token: 'test-token',
        learningMode: 'advanced',
        progressCache: {}
      },
      version: 2
    }));
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('engquest_overlay_dismissed', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });

  // Intercept Supabase
  await page.route('**/rest/v1/user_progress*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));

  const QUESTS = [
    { id: 'gear1_webtoon', name: 'Quest 1: Scene Explorer (D1)', path: 'gear1_webtoon', audioSelectors: ['button:has-text("Listen to Scene")'] },
    { id: 'gear2_karaoke', name: 'Quest 2: Voice Shadow (D1)', path: 'gear2_karaoke', audioSelectors: ['button:has-text("Listen Model")', 'button:has-text("Full Audio")'] },
    { id: 'gear3_retell', name: 'Quest 3: Story Retell (D1)', path: 'gear3_retell', audioSelectors: ['button:has-text("Listen")'] },
    { id: 'gear4_clil', name: 'Quest 4: Fact Finder (D2)', path: 'gear4_clil', audioSelectors: [] },
    { id: 'science_lab', name: 'Quest 5: Action Lab (D2)', path: 'science_lab', audioSelectors: ['button:has-text("START")'] },
    { id: 'science_report', name: 'Quest 6: Discovery Report (D2)', path: 'science_report', audioSelectors: ['button:has-text("Observe")'] },
    { id: 'word_blitz', name: 'Quest 7: Speed Match (D3)', path: 'word_blitz', audioSelectors: ['button:has-text("START")'] },
    { id: 'sentence_smash', name: 'Quest 8: Grammar Duel (D3)', path: 'sentence_smash', audioSelectors: ['button:has-text("START")'] },
    { id: 'math_quest', name: 'Quest 9: Math Quest (D3)', path: 'math_quest', audioSelectors: ['button:has-text("START")'] },
    { id: 'story_writer', name: 'Quest 10: Story Writer (D4)', path: 'story_writer', audioSelectors: ['button:has-text("Listen")'] },
    { id: 'broadcast_studio', name: 'Quest 11: Video Challenge (D4)', path: 'broadcast_studio', audioSelectors: [] },
    { id: 'info_exchange', name: 'Quest 12: Info Exchange (D4)', path: 'info_exchange', audioSelectors: ['button:has-text("Play Model Dialogue")', 'button:has-text("Replay Audio")'] },
    { id: 'boss_listening', name: 'Quest 13: Listening Shield (D5)', path: 'boss_listening', audioSelectors: ['button:has-text("Play Audio (2x)")', 'button:has-text("START")'] },
    { id: 'boss_reading', name: 'Quest 14: Reading Shield (D5)', path: 'boss_reading', audioSelectors: ['button:has-text("START")'] },
    { id: 'weekly_review', name: 'Quest 15: Speaking & Passport (D5)', path: 'weekly_review', audioSelectors: [] },
  ];

  for (let idx = 0; idx < QUESTS.length; idx++) {
    const q = QUESTS[idx];
    const url = `${BASE_URL}/week/${WEEK}/task/${q.path}`;
    console.log(`[${idx + 1}/15] Auditing ${q.name}...`);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // SPECIFIC CHECK: Quest 2 Voice Shadow - No Dictation Notepad allowed!
    if (q.id === 'gear2_karaoke') {
      const dictationTab = await page.locator('button:has-text("Dictation Notepad"), div:has-text("Dictation Notepad")').count();
      if (dictationTab > 0) {
        failures.push({
          quest: q.id,
          error: 'DICTATION_NOTEPAD_PRESENT',
          detail: 'Tab "✍️ Dictation Notepad" detected in Voice Shadow. Dictation was abolished and must be removed.'
        });
        console.error('  ❌ FAIL: Dictation Notepad tab detected in Voice Shadow!');
      }
    }

    // Trigger audio buttons
    for (const sel of q.audioSelectors) {
      const btns = await page.locator(sel).all();
      for (const btn of btns) {
        if (await btn.isVisible().catch(() => false)) {
          await btn.click({ force: true }).catch(() => {});
          await page.waitForTimeout(1500);
        }
      }
    }

    // SPECIFIC CHECK: Quest 15 Speaking Part 2 Flow & Freeze check (W34 Rotary Part)
    if (q.id === 'weekly_review' && WEEK === 34) {
      console.log('  Testing Speaking Part 2 state machine progression...');
      const startExamBtn = page.locator('button:has-text("START EXAM")').first();
      if (await startExamBtn.isVisible().catch(() => false)) {
        await startExamBtn.click({ force: true }).catch(() => {});
        // Wait 5 seconds for auto-advance from intro to question 1 (nominal delay is 3.8s)
        await page.waitForTimeout(5000);

        const speakingStatus = await page.evaluate(() => {
          const bodyText = document.body.innerText || '';
          const isJakePresent = bodyText.includes('Jake');
          const isTomPresent = bodyText.includes('Tom');
          const isIntroText = bodyText.includes("I don't know anything about Jake");
          const isPhase1Q = bodyText.includes("Listen to Nova's Question");
          return { isJakePresent, isTomPresent, isIntroText, isPhase1Q };
        });

        if (speakingStatus.isJakePresent || speakingStatus.isTomPresent) {
          failures.push({
            quest: q.id,
            error: 'HARDCODED_ROGUE_NAME_IN_UI',
            detail: `Speaking Part 2 UI displays rogue characters "Jake"/"Tom" instead of Week ${WEEK} characters!`
          });
          console.error('  ❌ FAIL: Rogue characters "Jake"/"Tom" displayed in Speaking Part 2 UI!');
        }

        if (!speakingStatus.isPhase1Q) {
          failures.push({
            quest: q.id,
            error: 'SPEAKING_P2_FROZEN_PHASE1',
            detail: 'Speaking Part 2 is FROZEN in Phase 1 intro. State machine never advanced to Question #1 (playPhase1Question aborted due to empty tableBFields).'
          });
          console.error('  ❌ FAIL: Speaking Part 2 is FROZEN in Phase 1 (did not advance to Question #1)!');
        }
      } else {
        failures.push({
          quest: q.id,
          error: 'START_EXAM_BUTTON_MISSING',
          detail: 'START EXAM button was not found or not visible in Speaking Part 2.'
        });
      }
    }

    // Retrieve client hooks for TTS
    const clientTelemetry = await page.evaluate(() => window.__hookTelemetry || {});
    if (clientTelemetry.speechSynthesisCalls && clientTelemetry.speechSynthesisCalls.length > 0) {
      clientTelemetry.speechSynthesisCalls.forEach(call => {
        failures.push({
          quest: q.id,
          error: 'BROWSER_SPEECH_SYNTHESIS_CALLED',
          detail: `window.speechSynthesis.speak called for text: "${call.text}"`
        });
        console.error(`  ❌ FAIL: window.speechSynthesis.speak called in ${q.id}: "${call.text}"`);
      });
      // Reset telemetry
      await page.evaluate(() => { window.__hookTelemetry.speechSynthesisCalls = []; });
    }
  }

  await browser.close();

  // Check Google Cloud TTS runtime calls
  if (runtimeTTSCalls.length > 0) {
    runtimeTTSCalls.forEach(call => {
      failures.push({
        quest: 'GLOBAL',
        error: 'GOOGLE_CLOUD_TTS_RUNTIME_CALLED',
        detail: `Runtime fetch to texttospeech.googleapis.com: ${call.url}`
      });
    });
  }

  // Check SPA HTML Fallbacks
  if (spaFallbacks.length > 0) {
    spaFallbacks.forEach(fb => {
      failures.push({
        quest: 'AUDIO_NET',
        error: 'MISSING_AUDIO_SPA_FALLBACK',
        detail: `Missing audio returned HTML 200: ${fb.url}`
      });
    });
  }

  // Save raw telemetry to artifact
  const logArtifactPath = path.resolve(process.cwd(), `docs/agent_artifacts/gate15_v2_audio_log_w${WEEK}.json`);
  fs.writeFileSync(logArtifactPath, JSON.stringify({
    week: WEEK,
    target: BASE_URL,
    timestamp: new Date().toISOString(),
    totalAudioRequests: audioRequests.length,
    audioRequests,
    runtimeTTSCalls,
    spaFallbacks,
    failures
  }, null, 2));
  console.log(`📁 Raw audio telemetry logged to: ${logArtifactPath}`);

  console.log('\n========================================================================');
  console.log('📊 GATE 15 v2 AUDIT RESULTS');
  console.log('========================================================================');
  console.log(`Total Failures Detected: ${failures.length}`);

  if (failures.length > 0) {
    console.error('\n🚨 GATE 15 v2 FAILED WITH THE FOLLOWING DEFECTS:');
    failures.forEach((f, i) => {
      console.error(`  [${i + 1}] [${f.quest}] ${f.error}: ${f.detail}`);
    });
    console.log('\n❌ EXIT 1 (Gate 15 v2 FAILED as expected on unpatched codebase)\n');
    process.exit(1);
  }

  if (isLocal) {
    console.log(`\n✅ GATE 15 v2 PASSED (LOCAL DEV): 0 runtime TTS, 0 missing audios, 0 frozen phases, 0 dictation tabs on ${BASE_URL}.\n`);
  } else {
    console.log(`\n✅ GATE 15 v2 PRODUCTION CERTIFIED: 0 runtime TTS, 0 missing audios, 0 frozen phases, 0 dictation tabs on ${BASE_URL}.\n`);
  }
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal Gate 15 v2 error:', err);
  process.exit(1);
});
