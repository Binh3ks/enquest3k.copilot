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
  console.log('🧪 TEST: NO-HEADPHONES SPEAKER LOOPBACK (SPEAKER ON + STUDENT SILENT)');
  console.log('Device: Samsung Galaxy S23 (SM-S911B)');
  console.log('================================================================');

  execSync('adb reverse tcp:5173 tcp:5173');
  execSync('adb forward tcp:9222 localabstract:chrome_devtools_remote');

  const tabsRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await tabsRes.json();
  let targetTab = tabs.find(t => t.type === 'page' && t.url.includes('5173'));
  if (!targetTab) targetTab = tabs.find(t => t.type === 'page');

  console.log(`Connecting to Android Chrome [Tab ${targetTab.id}] ${targetTab.url}`);
  const client = new CDPClient(targetTab.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const rawLogs = [];
  client.onEvent((method, params) => {
    if (method === 'Runtime.consoleAPICalled') {
      const args = (params.args || []).map(a => a.value !== undefined ? (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value) : (a.description || JSON.stringify(a))).join(' ');
      const line = `[Android Console ${params.type}] ${args}`;
      console.log(line);
      rawLogs.push(line);
    }
  });

  // Ensure on Voice Shadow page
  await client.eval(`
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    if (!location.href.includes('gear2_karaoke')) {
      location.href = 'http://localhost:5173/week/33/task/gear2_karaoke?debug=1';
    }
  `);
  await new Promise(r => setTimeout(r, 3000));

  console.log('\n--- 1. Triggering Voice Shadow with Speaker Audio ENABLED ---');
  // Dispatch a real trusted click event via DOM
  const triggerRes = await client.eval(`
    (() => {
      const allBtns = Array.from(document.querySelectorAll('button'));
      const btn = allBtns.find(b => b.textContent.includes('Voice Shadow') || b.textContent.includes('🎙️'));
      if (btn) {
        btn.focus();
        btn.click();
        return { success: true, text: btn.textContent.trim() };
      }
      return { success: false };
    })()
  `);
  console.log('Record Button Clicked:', triggerRes);

  console.log('⏳ RECORDING 5.5s WHILE SPEAKER PLAYS MODEL AUDIO (Student remains 100% silent)...');
  await new Promise(r => setTimeout(r, 5500));

  console.log('Stopping recording...');
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
        stopBtn.focus();
        stopBtn.click();
        return { success: true, text: stopBtn.textContent.trim() };
      }
      return { success: false };
    })()
  `);
  console.log('Stop Button Clicked:', stopRes);

  console.log('Waiting 3.5 seconds for AudioContext VAD energy calculation...');
  await new Promise(r => setTimeout(r, 3500));

  // Extract VAD DOM state
  const evalResult = await client.eval(`
    (() => {
      const allText = document.body.innerText;
      const feedbackP = Array.from(document.querySelectorAll('p, div, span')).find(el => 
        el.textContent.includes('No speech detected') || 
        el.textContent.includes('Voice Shadow recorded') || 
        el.textContent.includes('Voice Recorded!') ||
        el.textContent.includes('⚠️')
      );
      
      const hasNoSpeechWarning = allText.includes('No speech detected');
      const hasVoiceRecorded = allText.includes('Voice Shadow recorded') || allText.includes('Voice Recorded!');

      return {
        feedbackText: feedbackP ? feedbackP.textContent.trim() : 'NOT_FOUND',
        hasNoSpeechWarning,
        hasVoiceRecorded,
        isFalsePositiveScoreAwarded: hasVoiceRecorded,
        fullBodySnippet: allText.slice(0, 600)
      };
    })()
  `);

  console.log('\n================================================================');
  console.log('📊 EMPIRICAL RESULT OF NO-HEADPHONES LOOPBACK TEST:');
  console.log('================================================================');
  console.log('DOM Evaluation:', JSON.stringify(evalResult, null, 2));

  const shotFile = 'scripts/android_no_headphone_real_evidence.png';
  execSync(`adb exec-out screencap -p > ${shotFile}`);
  console.log(`📸 Screenshot saved: ${shotFile}`);

  fs.writeFileSync('scripts/android_no_headphone_loopback_report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    device: 'Samsung Galaxy S23 (SM-S911B)',
    test: 'Speaker Loopback Test without Headphones (Speaker ON, Student Silent)',
    evalResult,
    logs: rawLogs.filter(l => l.includes('VAD') || l.includes('TTS') || l.includes('voice-shadow') || l.includes('timing'))
  }, null, 2));

  console.log('\n🎉 SCRIPT COMPLETED!');
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal Error:', e);
  process.exit(1);
});
