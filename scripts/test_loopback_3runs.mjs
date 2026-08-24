/**
 * No-Headphone Loopback Repeated Test (3 runs with increasing speaker volume)
 *
 * METHODOLOGY:
 * - All 3 runs use production tab on https://app.bkbacademy.vn (HTTPS mic permission granted)
 * - Each run: click Voice Shadow, wait 5.5s in total phone-speaker silence from student, stop
 * - Extract: (1) raw UI text from DOM screen (feedbackText), (2) fullBodySnippet for score context
 * - isFalsePositiveScoreAwarded = (hasVoiceRecorded === true)
 *   This is a DERIVED label. hasVoiceRecorded is a DOM text grep:
 *   - TRUE  if body.innerText contains "Voice Shadow recorded" or "Voice Recorded!" (app shows this ONLY after a genuine accepted recording)
 *   - FALSE if body.innerText does NOT contain those strings (mic rejected or no mic)
 * - Runs:
 *   Run 1: Phone speaker at DEFAULT volume (same as previous passing test)
 *   Run 2: adb shell media volume --set 14 (increase to ~87% system max)
 *   Run 3: adb shell media volume --set 15 (max volume)
 */

import { execSync } from 'child_process';
import fs from 'fs';

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
    this.eventListeners = [];
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) cb.reject(msg.error); else cb.resolve(msg.result);
        } else if (msg.method) {
          for (const l of this.eventListeners) l(msg.method, msg.params);
        }
      };
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  onEvent(fn) { this.eventListeners.push(fn); }
  async eval(expression) {
    const res = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails));
    return res.result ? res.result.value : undefined;
  }
}

const VOLUME_LEVELS = [
  { run: 1, label: 'DEFAULT VOLUME (same as previous test)', adbVolumeSet: null },
  { run: 2, label: 'HIGH VOLUME (87% system max)', adbVolumeSet: '14' },
  { run: 3, label: 'MAX VOLUME (100% system max)', adbVolumeSet: '15' },
];

async function runOnce(client, run, volLabel, capturedLogs) {
  console.log(`\n========================================================`);
  console.log(`🔁 RUN ${run}/3: ${volLabel}`);
  console.log(`========================================================`);

  // Navigate back to voice shadow (fresh state)
  await client.eval(`window.location.href = window.location.href;`);
  await new Promise(r => setTimeout(r, 3000));

  // Find and click Voice Shadow button
  const triggerRes = await client.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Voice Shadow') || b.textContent.includes('🎙️'));
      if (btn) { btn.click(); return { clicked: true, text: btn.textContent.trim() }; }
      return { clicked: false };
    })()
  `);
  console.log(`Record Click: ${JSON.stringify(triggerRes)}`);

  console.log(`⏳ Recording 5.5 seconds at ${volLabel} (Student stays 100% silent)...`);
  await new Promise(r => setTimeout(r, 5500));

  // Stop recording
  const stopRes = await client.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b =>
        b.textContent.includes('Stop') || b.textContent.includes('Dừng') || b.textContent.includes('Voice Shadow')
      );
      if (btn) { btn.click(); return { stopped: true, text: btn.textContent.trim() }; }
      return { stopped: false };
    })()
  `);
  console.log(`Stop Click: ${JSON.stringify(stopRes)}`);

  // Wait for VAD processing
  await new Promise(r => setTimeout(r, 3500));

  const domState = await client.eval(`
    (function() {
      var body = document.body.innerText;
      var allEls = Array.prototype.slice.call(document.querySelectorAll('p, div, span'));
      
      var feedbackEl = null;
      for (var i = 0; i < allEls.length; i++) {
        var txt = allEls[i].textContent;
        if (txt.indexOf('No speech detected') !== -1 ||
            txt.indexOf('Voice Shadow recorded') !== -1 ||
            txt.indexOf('Voice Recorded!') !== -1 ||
            txt.indexOf('Microphone permission needed') !== -1 ||
            txt.indexOf('⚠️') !== -1) {
          feedbackEl = allEls[i];
          break;
        }
      }
      var feedbackText = feedbackEl ? feedbackEl.textContent.trim().slice(0, 300) : 'NOT_FOUND';
      
      var hasNoSpeechMsg = body.indexOf('No speech detected') !== -1;
      var hasVoiceRecordedMsg = body.indexOf('Voice Shadow recorded') !== -1 || body.indexOf('Voice Recorded!') !== -1;
      var hasMicPermissionError = body.indexOf('Microphone permission needed') !== -1;
      
      var scoreEl = null;
      var scoreEls = Array.prototype.slice.call(document.querySelectorAll('span, div'));
      for (var j = 0; j < scoreEls.length; j++) {
        var st = scoreEls[j].textContent;
        if (st.indexOf('⭐') !== -1 && /[0-9]/.test(st)) { scoreEl = scoreEls[j]; break; }
      }
      var scoreDisplay = scoreEl ? scoreEl.textContent.trim() : 'NOT_FOUND';
      
      var fullBodySnippet = body.slice(0, 800);
      
      var isFalsePositiveAwarded = hasVoiceRecordedMsg;
      
      return {
        feedbackText: feedbackText,
        hasNoSpeechMsg: hasNoSpeechMsg,
        hasVoiceRecordedMsg: hasVoiceRecordedMsg,
        hasMicPermissionError: hasMicPermissionError,
        scoreDisplay: scoreDisplay,
        isFalsePositiveAwarded: isFalsePositiveAwarded,
        derivationFormula: "isFalsePositiveAwarded = body includes 'Voice Shadow recorded' OR 'Voice Recorded!'",
        fullBodySnippet: fullBodySnippet
      };
    }())
  `);

  console.log(`\n📊 ACTUAL APP UI STATE (Run ${run}):`);
  console.log(`  feedbackText    = "${domState.feedbackText}"`);
  console.log(`  scoreDisplay    = "${domState.scoreDisplay}"`);
  console.log(`  hasNoSpeechMsg  = ${domState.hasNoSpeechMsg}`);
  console.log(`  hasVoiceRecordedMsg = ${domState.hasVoiceRecordedMsg}`);
  console.log(`  hasMicPermissionError = ${domState.hasMicPermissionError}`);
  console.log(`  isFalsePositiveAwarded (DERIVED) = ${domState.isFalsePositiveAwarded}`);
  console.log(`  derivationFormula = ${domState.derivationFormula}`);

  // Screenshot from physical device
  const shot = `scripts/android_loopback_run${run}.png`;
  execSync(`adb exec-out screencap -p > ${shot}`);
  console.log(`📸 Screenshot: ${shot}`);

  return { run, volLabel, domState, screenshot: shot, vadLogs: capturedLogs.filter(l => l.includes('VAD')) };
}

async function main() {
  console.log('============================================================');
  console.log('🔁 NO-HEADPHONE LOOPBACK: 3 REPEATED RUNS AT INCREASING VOLUME');
  console.log('Samsung Galaxy S23 (SM-S911B) — Physical Device Test');
  console.log('============================================================');

  execSync('adb forward tcp:9222 localabstract:chrome_devtools_remote');

  const tabsRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await tabsRes.json();
  const targetTab = tabs.find(t => t.id === '1539' || t.url.includes('bkbacademy.vn')) || tabs[0];

  console.log(`Using Tab [${targetTab.id}] ${targetTab.url}`);
  const client = new CDPClient(targetTab.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const capturedLogs = [];
  client.onEvent((method, params) => {
    if (method === 'Runtime.consoleAPICalled') {
      const args = (params.args || []).map(a => a.value !== undefined ? String(a.value) : (a.description || '')).join(' ');
      const line = `[Console ${params.type}] ${args}`;
      console.log(line);
      capturedLogs.push(line);
    }
  });

  const results = [];

  for (const vol of VOLUME_LEVELS) {
    // Set speaker volume via adb
    if (vol.adbVolumeSet !== null) {
      try {
        execSync(`adb shell media volume --show --stream 3 --set ${vol.adbVolumeSet}`);
        console.log(`🔊 Set speaker volume to level ${vol.adbVolumeSet}`);
      } catch (e) {
        console.log(`Volume set note: ${e.message}`);
      }
    }

    capturedLogs.length = 0;
    const result = await runOnce(client, vol.run, vol.label, capturedLogs);
    results.push(result);

    // Delay between runs
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n============================================================');
  console.log('📋 FINAL SUMMARY: 3 RUN LOOPBACK TEST');
  console.log('============================================================');

  results.forEach(r => {
    const verdict = r.domState.isFalsePositiveAwarded ? '🔴 FALSE POSITIVE DETECTED' : '✅ No false positive';
    console.log(`Run ${r.run} [${r.volLabel}]: ${verdict}`);
    console.log(`  → feedbackText: "${r.domState.feedbackText.slice(0, 120)}"`);
    console.log(`  → scoreDisplay: "${r.domState.scoreDisplay}"`);
  });

  fs.writeFileSync('scripts/android_loopback_3runs_report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    device: 'Samsung Galaxy S23 (SM-S911B)',
    methodology: {
      origin: targetTab.url,
      studentBehavior: '100% silent — does not speak at any point',
      speakerState: 'ON — model audio plays through phone speaker',
      isFalsePositiveDerivedField: true,
      derivationFormula: "body.includes('Voice Shadow recorded') || body.includes('Voice Recorded!')",
      explanation: 'isFalsePositiveAwarded is NOT a field returned by the app. It is derived by the test script checking whether the app UI showed the success message it only shows when it ACCEPTS audio as real speech.'
    },
    results: results.map(r => ({
      run: r.run,
      volumeLabel: r.volLabel,
      screenshot: r.screenshot,
      appFeedbackText: r.domState.feedbackText,
      appScoreDisplay: r.domState.scoreDisplay,
      hasNoSpeechMsg: r.domState.hasNoSpeechMsg,
      hasVoiceRecordedMsg: r.domState.hasVoiceRecordedMsg,
      hasMicPermissionError: r.domState.hasMicPermissionError,
      isFalsePositiveAwarded: r.domState.isFalsePositiveAwarded,
      vadLogs: r.vadLogs,
    }))
  }, null, 2));

  console.log('\n✅ REPORT SAVED: scripts/android_loopback_3runs_report.json');
  process.exit(0);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
