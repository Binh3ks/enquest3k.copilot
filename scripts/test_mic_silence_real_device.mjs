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

  const tabsRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await tabsRes.json();
  const pageTab = tabs.find(t => t.type === 'page');
  console.log(`Connected to Android Chrome [Tab ${pageTab.id}]`);

  const client = new CDPClient(pageTab.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const vadLogs = [];
  client.onEvent((method, params) => {
    if (method === 'Runtime.consoleAPICalled') {
      const args = (params.args || []).map(a => a.value !== undefined ? (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value) : (a.description || JSON.stringify(a))).join(' ');
      const line = `[Android Log ${params.type}] ${args}`;
      if (line.includes('VAD') || line.includes('Telemetry') || line.includes('Shadowing') || line.includes('Audio')) {
        vadLogs.push(line);
      }
      console.log(line);
    }
  });

  console.log('\n--- 1. Navigating to Week 33 Voice Shadow (Gear 2 Karaoke) ---');
  await client.send('Page.navigate', { url: 'http://localhost:5173/week/33/task/gear2_karaoke?debug=1' });
  await new Promise(r => setTimeout(r, 4000));

  // Ensure storage
  try {
    await client.eval(`
      localStorage.setItem('engquest_onboarded', 'true');
      localStorage.setItem('arcade_owner_bypass', 'true');
    `);
  } catch (e) {
    console.log('localStorage setup note:', e.message);
  }

  // =========================================================================
  // TEST: PURE PHYSICAL SILENCE (Pause any background TTS immediately)
  // =========================================================================
  console.log('\n--- 2. Starting Physical Mic Recording with ZERO speaker output ---');
  await client.eval(`
    (async () => {
      // Find the Voice Shadow record button
      const allBtns = Array.from(document.querySelectorAll('button'));
      const btn = allBtns.find(b => b.textContent.includes('Voice Shadow') || b.textContent.includes('🎙️'));
      if (btn) {
        btn.click();
        // Immediately pause speech synthesis / audio playback so phone speaker is DEAD SILENT
        setTimeout(() => {
          if (window.speechSynthesis) window.speechSynthesis.cancel();
          const allAudios = document.querySelectorAll('audio');
          allAudios.forEach(a => a.pause());
        }, 50);
      }
    })()
  `);

  console.log('⏳ RECORDING 5.0 SECONDS IN PURE ROOM SILENCE (Real mic listening to ambient room noise)...');
  await new Promise(r => setTimeout(r, 5200));

  console.log('Stopping recording on phone...');
  await client.eval(`
    (() => {
      const allBtns = Array.from(document.querySelectorAll('button'));
      const stopBtn = allBtns.find(b => 
        b.textContent.includes('Stop') || 
        b.textContent.includes('Dừng') || 
        b.textContent.includes('Voice Shadow') ||
        b.className.includes('from-rose-500')
      );
      if (stopBtn) stopBtn.click();
    })()
  `);

  console.log('Waiting 3 seconds for AudioContext VAD energy calculation...');
  await new Promise(r => setTimeout(r, 3000));

  // Extract VAD DOM state and UI feedback
  const silenceResult = await client.eval(`
    (() => {
      const allText = document.body.innerText;
      const feedbackP = Array.from(document.querySelectorAll('p, div, span')).find(el => 
        el.textContent.includes('No speech detected') || el.textContent.includes('Voice Shadow recorded') || el.textContent.includes('⚠️')
      );
      
      return {
        feedbackText: feedbackP ? feedbackP.textContent.trim() : 'NOT_FOUND',
        hasNoSpeechWarning: allText.includes('No speech detected') || allText.includes('⚠️ No speech detected'),
        fullBodySnippet: allText.slice(0, 500)
      };
    })()
  `);

  console.log('\n================================================================');
  console.log('📊 PURE SILENCE TEST RESULT ON PHYSICAL ANDROID PHONE:');
  console.log('================================================================');
  console.log(JSON.stringify(silenceResult, null, 2));

  // Capture screenshot of UI
  const silenceScreen = 'scripts/android_silence_test_result.png';
  execSync(`adb exec-out screencap -p > ${silenceScreen}`);
  console.log(`📸 Screenshot saved: ${silenceScreen}`);

  // Write dedicated silence report
  fs.writeFileSync('scripts/android_mic_silence_evidence.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    device: 'Samsung Galaxy S23 (SM-S911B)',
    testName: 'Physical Mic Silence Test (Zero Speaker Audio)',
    silenceResult,
    vadLogs
  }, null, 2));

  console.log('\n🎉 SILENCE TEST COMPLETE!');
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal Error:', e);
  process.exit(1);
});
