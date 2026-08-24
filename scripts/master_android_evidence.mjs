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
  console.log('📱 MASTER PHYSICAL ANDROID QA (SAMSUNG GALAXY S23)');
  console.log('================================================================');

  const tabsRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await tabsRes.json();
  const pageTab = tabs.find(t => t.type === 'page');
  console.log(`Connecting to Android Chrome [Tab ${pageTab.id}]`);

  const client = new CDPClient(pageTab.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const androidLogs = [];
  client.onEvent((method, params) => {
    if (method === 'Runtime.consoleAPICalled') {
      const args = (params.args || []).map(a => a.value !== undefined ? (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value) : (a.description || JSON.stringify(a))).join(' ');
      const line = `[Android Log ${params.type}] ${args}`;
      androidLogs.push(line);
      console.log(line);
    }
  });

  // Ensure storage
  await client.eval(`
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
  `);

  // =========================================================================
  // 📐 PART 1: BAR MODEL QUEST P1 - P5
  // =========================================================================
  console.log('\n================================================================');
  console.log('📐 PART 1: TESTING BAR MODEL QUEST P1-P5 ON SAMSUNG GALAXY S23');
  console.log('================================================================');

  await client.eval(`window.location.href = 'http://localhost:5173/week/33/task/math_quest';`);
  await new Promise(r => setTimeout(r, 4000));

  // Click ▶ START button
  console.log('Clicking ▶ START button...');
  await client.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('START'));
      if (btn) btn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const answers = ['60', '17', '25', '6', '20'];
  const allProblemsEvidence = [];

  for (let i = 0; i < 5; i++) {
    const pNum = i + 1;
    console.log(`\n--- 🔍 Inspecting Problem ${pNum}/5 on Samsung Galaxy S23 ---`);
    await new Promise(r => setTimeout(r, 1200));

    const pData = await client.eval(`
      (() => {
        const svg = document.querySelector('svg.w-full') || document.querySelector('div.bg-slate-50 svg') || document.querySelector('svg');
        const h4 = document.querySelector('h4')?.textContent;
        const pText = document.querySelector('p.text-base, p.font-bold, p')?.textContent;
        const rects = svg ? Array.from(svg.querySelectorAll('rect')).map(r => ({
          width: r.getAttribute('width'),
          height: r.getAttribute('height'),
          x: r.getAttribute('x'),
          y: r.getAttribute('y'),
          fill: r.getAttribute('fill')
        })) : [];
        const texts = svg ? Array.from(svg.querySelectorAll('text')).map(t => t.textContent.trim()) : [];
        
        return {
          problemNumber: ${pNum},
          title: h4,
          problemText: pText,
          hasSvg: !!svg,
          rectsCount: rects.length,
          rects,
          texts
        };
      })()
    `);

    allProblemsEvidence.push(pData);
    console.log(`Problem ${pNum} DOM Details:\n`, JSON.stringify(pData, null, 2));

    // Capture screenshot from real Android screen via adb
    const shotPath = `scripts/android_barmodel_p${pNum}.png`;
    execSync(`adb exec-out screencap -p > ${shotPath}`);
    console.log(`📸 Real Android Screenshot saved: ${shotPath}`);

    // Input answer and submit
    const ans = answers[i];
    console.log(`Submitting answer '${ans}' for Problem ${pNum}...`);
    await client.eval(`
      (() => {
        const input = document.querySelector('input[type="number"]') || document.querySelector('input');
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(input, '${ans}');
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));

          const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.type === 'submit' || b.textContent.includes('Submit'));
          if (submitBtn) {
            submitBtn.click();
          }
        }
      })()
    `);

    await new Promise(r => setTimeout(r, 2200));
  }

  // =========================================================================
  // 🎙️ PART 2: PHYSICAL MICROPHONE SILENCE TEST
  // =========================================================================
  console.log('\n================================================================');
  console.log('🎙️ PART 2: PHYSICAL MIC SILENCE TEST ON SAMSUNG GALAXY S23');
  console.log('================================================================');

  await client.eval(`window.location.href = 'http://localhost:5173/week/33/task/gear2_karaoke?debug=1';`);
  await new Promise(r => setTimeout(r, 4000));

  console.log('Starting Voice Shadow recording on real phone mic...');
  const recStart = await client.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Voice Shadow') || b.textContent.includes('🎙️'));
      if (btn) {
        btn.click();
        return { success: true, text: btn.textContent.trim() };
      }
      return { success: false };
    })()
  `);
  console.log('Voice Shadow Record Click:', recStart);

  console.log('⏳ WAITING 5.5 SECONDS IN PHYSICAL ROOM SILENCE (Real mic capturing ambient room acoustic energy)...');
  await new Promise(r => setTimeout(r, 5500));

  console.log('Stopping recording on real phone...');
  const recStop = await client.eval(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => 
        b.textContent.includes('Stop') || 
        b.textContent.includes('Dừng') || 
        b.textContent.includes('Voice Shadow') ||
        b.className.includes('from-rose-500')
      );
      if (btn) {
        btn.click();
        return { success: true, text: btn.textContent.trim() };
      }
      return { success: false };
    })()
  `);
  console.log('Voice Shadow Stop Click:', recStop);

  console.log('Waiting 3.5 seconds for VAD & Silence Guard evaluation...');
  await new Promise(r => setTimeout(r, 3500));

  // Extract VAD result
  const vadEvaluation = await client.eval(`
    (() => {
      const textElements = Array.from(document.querySelectorAll('p, span, div'))
        .map(el => el.textContent.trim())
        .filter(t => 
          t.includes('No speech detected') || 
          t.includes('Voice Shadow recorded') || 
          t.includes('Recording was too short') || 
          t.includes('⚠️') || 
          t.includes('PTS') || 
          t.includes('Score') ||
          t.includes('Play My Voice')
        );
      
      return {
        feedbackDetected: textElements.slice(0, 5)
      };
    })()
  `);
  console.log('VAD Feedback on Physical Android:\n', JSON.stringify(vadEvaluation, null, 2));

  // Take screenshot of Voice Shadow
  const karaokeShot = 'scripts/android_karaoke_real.png';
  execSync(`adb exec-out screencap -p > ${karaokeShot}`);
  console.log(`📸 Real Android Screenshot saved: ${karaokeShot}`);

  // Write full evidence report to disk
  fs.writeFileSync('scripts/android_qa_evidence_report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    device: 'Samsung Galaxy S23 (SM-S911B)',
    barModelProblems: allProblemsEvidence,
    voiceShadowVad: vadEvaluation,
    consoleLogs: androidLogs.filter(l => l.includes('Audio') || l.includes('Speech') || l.includes('TTS') || l.includes('VAD') || l.includes('blob') || l.includes('score'))
  }, null, 2));

  console.log('\n================================================================');
  console.log('🎉 100% COMPLETE: PHYSICAL ANDROID QA REPORT SAVED TO scripts/android_qa_evidence_report.json');
  console.log('================================================================');
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal Error:', e);
  process.exit(1);
});
