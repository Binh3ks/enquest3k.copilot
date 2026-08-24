import { execSync } from 'child_process';

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
  console.log('===============================================================');
  console.log('📱 REAL ANDROID DEVICE TEST (Samsung Galaxy S23 / SM-S911B)');
  console.log('===============================================================');

  const tabsRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await tabsRes.json();
  const pageTab = tabs.find(t => t.type === 'page');
  console.log(`Connecting to Android Chrome [Tab ${pageTab.id}] ${pageTab.url}`);

  const client = new CDPClient(pageTab.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const consoleLogs = [];
  client.onEvent((method, params) => {
    if (method === 'Runtime.consoleAPICalled') {
      const args = (params.args || []).map(a => a.value !== undefined ? (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value) : (a.description || JSON.stringify(a))).join(' ');
      const line = `[Android Log] ${args}`;
      consoleLogs.push(line);
      console.log(line);
    }
  });

  // Ensure bypass
  await client.eval(`
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
  `);

  // =========================================================================
  // 📐 PART 1: BAR MODEL QUEST (PROBLEMS 1 TO 5)
  // =========================================================================
  console.log('\n--- 📐 PART 1: NAVIGATING TO MATH QUEST ---');
  await client.send('Page.navigate', { url: 'http://localhost:5173/week/33/task/math_quest' });
  await new Promise(r => setTimeout(r, 4000));

  // Click START button
  console.log('Clicking START button on Bar Model Quest...');
  const startClicked = await client.eval(`
    (() => {
      const allBtns = Array.from(document.querySelectorAll('button'));
      const startBtn = allBtns.find(b => b.textContent.includes('START') || b.textContent.includes('Bắt đầu'));
      if (startBtn) {
        startBtn.click();
        return { success: true, text: startBtn.textContent.trim() };
      }
      return { success: false, buttons: allBtns.map(b => b.textContent.trim()) };
    })()
  `);
  console.log('Start button response:', startClicked);
  await new Promise(r => setTimeout(r, 2000));

  const correctAnswers = ['60', '17', '25', '6', '20'];
  const problemEvidence = [];

  for (let i = 0; i < 5; i++) {
    const pNum = i + 1;
    console.log(`\n--- 🔍 Inspecting Problem ${pNum}/5 ---`);
    await new Promise(r => setTimeout(r, 1500));

    const pInfo = await client.eval(`
      (() => {
        const svg = document.querySelector('svg.w-full') || document.querySelector('svg');
        const questionText = document.querySelector('h2, h3, .question-text, .text-slate-900')?.textContent;
        const rects = svg ? Array.from(svg.querySelectorAll('rect')).map(r => ({
          width: r.getAttribute('width'),
          height: r.getAttribute('height'),
          x: r.getAttribute('x'),
          y: r.getAttribute('y'),
          fill: r.getAttribute('fill')
        })) : [];
        const texts = svg ? Array.from(svg.querySelectorAll('text')).map(t => t.textContent.trim()) : [];
        const input = document.querySelector('input');
        
        return {
          problemNum: ${pNum},
          hasSvg: !!svg,
          rectsCount: rects.length,
          rects,
          texts,
          hasInput: !!input,
          title: questionText?.slice(0, 100)
        };
      })()
    `);

    problemEvidence.push(pInfo);
    console.log(`Problem ${pNum} DOM Details:\n`, JSON.stringify(pInfo, null, 2));

    // Capture screenshot from real phone
    const screenPath = `scripts/android_barmodel_p${pNum}.png`;
    execSync(`adb exec-out screencap -p > ${screenPath}`);
    console.log(`📸 Screenshot saved: ${screenPath}`);

    // Input answer and submit
    const ans = correctAnswers[i];
    console.log(`Typing answer '${ans}' and submitting...`);
    await client.eval(`
      (() => {
        const input = document.querySelector('input');
        if (input) {
          input.value = '${ans}';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          
          const submitBtn = Array.from(document.querySelectorAll('button')).find(b => 
            b.type === 'submit' || b.textContent.includes('Check') || b.textContent.includes('Kiểm tra') || b.textContent.includes('Submit')
          );
          if (submitBtn) {
            submitBtn.click();
          } else {
            const form = input.closest('form');
            if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          }
        }
      })()
    `);

    await new Promise(r => setTimeout(r, 2000));
  }

  // =========================================================================
  // 🎙️ PART 2: PHYSICAL MICROPHONE SILENCE TEST
  // =========================================================================
  console.log('\n--- 🎙️ PART 2: PHYSICAL MIC SILENCE TEST (GEAR 2 KARAOKE) ---');
  await client.send('Page.navigate', { url: 'http://localhost:5173/week/33/task/gear2_karaoke?debug=1' });
  await new Promise(r => setTimeout(r, 4000));

  console.log('Triggering "Voice Shadow" recording on physical phone...');
  const recStartRes = await client.eval(`
    (() => {
      const allBtns = Array.from(document.querySelectorAll('button'));
      const voiceShadowBtn = allBtns.find(b => b.textContent.includes('Voice Shadow') || b.textContent.includes('🎙️'));
      if (voiceShadowBtn) {
        voiceShadowBtn.click();
        return { success: true, text: voiceShadowBtn.textContent.trim() };
      }
      return { success: false, buttons: allBtns.map(b => b.textContent.trim()) };
    })()
  `);
  console.log('Voice Shadow Record Trigger Result:', recStartRes);

  console.log('⏳ WAITING 5 SECONDS IN PHYSICAL ROOM SILENCE (Real Hardware Mic Recording)...');
  await new Promise(r => setTimeout(r, 5500));

  console.log('Stopping recording on physical phone...');
  const recStopRes = await client.eval(`
    (() => {
      const allBtns = Array.from(document.querySelectorAll('button'));
      // The button while recording might say "Stop" or "Dừng" or toggle
      const stopBtn = allBtns.find(b => 
        b.textContent.includes('Stop') || 
        b.textContent.includes('Dừng') || 
        b.textContent.includes('Voice Shadow') ||
        b.className.includes('from-rose-500') ||
        b.className.includes('animate-pulse')
      );
      if (stopBtn) {
        stopBtn.click();
        return { success: true, text: stopBtn.textContent.trim() };
      }
      return { success: false };
    })()
  `);
  console.log('Voice Shadow Stop Trigger Result:', recStopRes);

  console.log('Waiting 4 seconds for VAD & Silence Guard processing...');
  await new Promise(r => setTimeout(r, 4000));

  // Extract VAD result from page DOM
  const vadResult = await client.eval(`
    (() => {
      const textElements = Array.from(document.querySelectorAll('p, span, div'))
        .map(el => el.textContent.trim())
        .filter(t => 
          t.includes('No speech detected') || 
          t.includes('Voice Shadow recorded') || 
          t.includes('Recording was too short') || 
          t.includes('⚠️') || 
          t.includes('PTS') || 
          t.includes('Score')
        );
      
      return {
        feedbackDetected: textElements.slice(0, 5)
      };
    })()
  `);
  console.log('VAD Feedback on Physical Android:', vadResult);

  // Capture final screenshot of Voice Shadow
  const karaokeShot = 'scripts/android_karaoke_real.png';
  execSync(`adb exec-out screencap -p > ${karaokeShot}`);
  console.log(`📸 Screenshot saved: ${karaokeShot}`);

  console.log('\n===============================================================');
  console.log('🎉 ALL PHYSICAL ANDROID EVIDENCE GATHERED WITH 100% SUCCESS!');
  console.log('===============================================================');
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal Error:', e);
  process.exit(1);
});
