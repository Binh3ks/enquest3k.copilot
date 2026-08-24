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
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) cb.reject(msg.error);
          else cb.resolve(msg.result);
        } else if (msg.method) {
          for (const listener of this.eventListeners) {
            listener(msg.method, msg.params);
          }
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = this.id++;
      this.callbacks.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  onEvent(listener) {
    this.eventListeners.push(listener);
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }
}

async function main() {
  console.log('================================================================');
  console.log('🔇 PHYSICAL MIC SILENCE TEST SUITE ON SAMSUNG GALAXY S23');
  console.log('================================================================');

  execSync('adb reverse tcp:5173 tcp:5173');
  execSync('adb forward tcp:9222 localabstract:chrome_devtools_remote');

  const tabsRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await tabsRes.json();
  let targetTab = tabs.find(t => t.type === 'page' && (t.url.includes('5173') || t.url.includes('bkbacademy.vn')));
  if (!targetTab) targetTab = tabs.find(t => t.type === 'page');

  console.log(`Connecting to Android Chrome [Tab ${targetTab.id}] ${targetTab.url}`);
  const client = new CDPClient(targetTab.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const capturedTelemetry = [];
  client.onEvent((method, params) => {
    if (method === 'Runtime.consoleAPICalled') {
      const args = (params.args || []).map(a => a.value !== undefined ? (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value) : (a.description || JSON.stringify(a))).join(' ');
      const line = `[Android Console ${params.type}] ${args}`;
      console.log(line);
      if (line.includes('VAD') || line.includes('Telemetry') || line.includes('audioBlobSize') || line.includes('Shadowing')) {
        capturedTelemetry.push(line);
      }
    }
  });

  console.log('\n--- 1. Navigating to Week 33 Voice Shadow (Gear 2 Karaoke) ---');
  await client.send('Page.navigate', { url: 'http://localhost:5173/week/33/task/gear2_karaoke?debug=1' });
  await new Promise(r => setTimeout(r, 4500));

  await client.eval(`
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
  `);

  console.log('\n--- 2. Starting Physical Mic Recording with Model Audio Paused (ZERO Speaker Output) ---');
  const clickRes = await client.eval(`
    (() => {
      const allBtns = Array.from(document.querySelectorAll('button'));
      const btn = allBtns.find(b => b.textContent.includes('Voice Shadow') || b.textContent.includes('🎙️'));
      if (btn) {
        btn.click();
        // Immediately pause speech synthesis / audio playback so phone speaker is DEAD SILENT
        setTimeout(() => {
          if (window.speechSynthesis) window.speechSynthesis.cancel();
          const allAudios = document.querySelectorAll('audio');
          allAudios.forEach(a => a.pause());
        }, 30);
        return { clicked: true, text: btn.textContent.trim() };
      }
      return { clicked: false, buttons: allBtns.map(b => b.textContent.trim()) };
    })()
  `);
  console.log('Record Trigger Click Result:', clickRes);

  console.log('\n⏳ RECORDING 5.0 SECONDS IN PURE ROOM SILENCE ON PHYSICAL MIC...');
  await new Promise(r => setTimeout(r, 5200));

  console.log('Stopping recording on real phone...');
  const stopRes = await client.eval(`
    (() => {
      const allBtns = Array.from(document.querySelectorAll('button'));
      const stopBtn = allBtns.find(b => 
        b.textContent.includes('Stop') || 
        b.textContent.includes('Dừng') || 
        b.textContent.includes('Voice Shadow') ||
        b.className.includes('from-rose-500')
      );
      if (stopBtn) {
        stopBtn.click();
        return { stopped: true, text: stopBtn.textContent.trim() };
      }
      return { stopped: false };
    })()
  `);
  console.log('Stop Trigger Click Result:', stopRes);

  console.log('Waiting 3 seconds for AudioContext VAD energy calculation...');
  await new Promise(r => setTimeout(r, 3000));

  // Extract VAD result from page DOM
  const vadDomResult = await client.eval(`
    (() => {
      const allText = document.body.innerText;
      const feedbackP = Array.from(document.querySelectorAll('p, div, span')).find(el => 
        el.textContent.includes('No speech detected') || 
        el.textContent.includes('Voice Shadow recorded') || 
        el.textContent.includes('⚠️') ||
        el.textContent.includes('Score')
      );
      
      const hasNoSpeechWarning = allText.includes('No speech detected') || allText.includes('⚠️ No speech detected');
      const hasVoiceRecorded = allText.includes('Voice Shadow recorded');

      return {
        feedbackText: feedbackP ? feedbackP.textContent.trim() : 'NOT_FOUND',
        hasNoSpeechWarning,
        hasVoiceRecorded,
        isZeroScore: hasNoSpeechWarning,
        fullBodySnippet: allText.slice(0, 500)
      };
    })()
  `);

  console.log('\n================================================================');
  console.log('📊 PURE SILENCE TEST RESULT ON PHYSICAL ANDROID PHONE:');
  console.log('================================================================');
  console.log('DOM Evaluation:', JSON.stringify(vadDomResult, null, 2));
  console.log('Captured Telemetry Logs:\n', capturedTelemetry.join('\n') || '(No telemetry line logged)');

  // Capture screenshot of UI
  const shotFile = 'scripts/android_silence_exact_result.png';
  execSync(`adb exec-out screencap -p > ${shotFile}`);
  console.log(`📸 Screenshot saved: ${shotFile}`);

  fs.writeFileSync('scripts/android_silence_exact_evidence.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    device: 'Samsung Galaxy S23 (SM-S911B)',
    test: 'Physical Microphone Silence Test (5s Room Silence with Zero Speaker Audio)',
    telemetry: capturedTelemetry,
    vadDomResult
  }, null, 2));

  console.log('\n🎉 ALL SILENCE EVIDENCE GATHERED!');
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal Error:', e);
  process.exit(1);
});
