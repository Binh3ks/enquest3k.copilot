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

async function run() {
  console.log('--- 📱 CONNECTING TO ANDROID CHROME CDP ---');
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await res.json();
  let targetTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:5173'));
  if (!targetTab) {
    targetTab = tabs.find(t => t.type === 'page');
  }

  console.log(`Using Chrome tab [${targetTab.id}] URL: ${targetTab.url}`);
  const client = new CDPClient(targetTab.webSocketDebuggerUrl);
  await client.connect();
  console.log('✅ Connected to WebSocket CDP debugger.');

  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Log.enable');

  const consoleLogs = [];
  client.onEvent((method, params) => {
    if (method === 'Runtime.consoleAPICalled') {
      const args = (params.args || []).map(a => a.value !== undefined ? (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value) : (a.description || JSON.stringify(a))).join(' ');
      const logLine = `[Console ${params.type}] ${args}`;
      consoleLogs.push(logLine);
      console.log(logLine);
    }
  });

  // Bypass onboarding and setup storage
  await client.eval(`
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
  `);

  // 1. Math Quest (Bar Model P1-P5 Screenshots)
  console.log('\n--- 📐 STEP 1: NAVIGATING TO MATH QUEST (BAR MODEL P1-P5) ---');
  await client.send('Page.navigate', { url: 'http://localhost:5173/week/33/task/math_quest' });
  await new Promise(r => setTimeout(r, 4000));

  for (let p = 1; p <= 5; p++) {
    console.log(`\n--- Capturing Bar Model Problem ${p}/5 ---`);
    await new Promise(r => setTimeout(r, 1500));
    
    // Inspect DOM
    const problemInfo = await client.eval(`
      (() => {
        const svg = document.querySelector('svg.w-full') || document.querySelector('svg');
        const questionText = document.querySelector('h2, h3, .question-text, .font-bold')?.textContent;
        const rects = svg ? Array.from(svg.querySelectorAll('rect')).map(r => ({
          width: r.getAttribute('width'),
          height: r.getAttribute('height'),
          x: r.getAttribute('x'),
          y: r.getAttribute('y'),
          fill: r.getAttribute('fill')
        })) : [];
        const texts = svg ? Array.from(svg.querySelectorAll('text')).map(t => t.textContent.trim()) : [];
        
        return {
          hasSvg: !!svg,
          rectsCount: rects.length,
          rects: rects.slice(0, 5),
          texts: texts.slice(0, 8),
          problemTitle: questionText?.slice(0, 80)
        };
      })()
    `);
    console.log(`Problem ${p} DOM info:`, JSON.stringify(problemInfo, null, 2));

    // Capture screenshot directly from physical Android screen
    const screenPath = `scripts/android_barmodel_p${p}.png`;
    execSync(`adb exec-out screencap -p > ${screenPath}`);
    console.log(`✅ Saved physical screen: ${screenPath}`);

    // Click Next button or answer choice if not at problem 5
    if (p < 5) {
      await client.eval(`
        (() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          // Look for choice button (A, B, C, D)
          const choiceBtn = buttons.find(b => b.textContent.includes('A') || b.textContent.includes('B') || b.classList.contains('choice-btn') || b.className.includes('rounded-2xl'));
          if (choiceBtn) choiceBtn.click();
        })()
      `);
      await new Promise(r => setTimeout(r, 1200));

      await client.eval(`
        (() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const nextBtn = buttons.find(b => b.textContent.includes('Next') || b.textContent.includes('Tiếp tục') || b.textContent.includes('Câu tiếp') || b.textContent.includes('Xác nhận'));
          if (nextBtn) nextBtn.click();
        })()
      `);
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // 2. Navigate to Week 33 Karaoke (Voice Shadow)
  console.log('\n--- 🎤 STEP 2: NAVIGATING TO VOICE SHADOW (GEAR 2 KARAOKE) ---');
  await client.send('Page.navigate', { url: 'http://localhost:5173/week/33/task/gear2_karaoke?debug=1' });
  await new Promise(r => setTimeout(r, 4000));

  console.log('\n--- 🔇 STEP 3: RUNNING PHYSICAL MIC SILENCE TEST (5 SECONDS) ---');
  // Check available buttons on page
  const pageButtons = await client.eval(`
    (() => {
      return Array.from(document.querySelectorAll('button')).map(b => ({
        text: b.textContent.trim(),
        ariaLabel: b.getAttribute('aria-label'),
        className: b.className
      }));
    })()
  `);
  console.log('Available buttons on Karaoke page:', pageButtons.slice(0, 10));

  // Trigger recording on first sentence card or challenge bar
  const recordTrigger = await client.eval(`
    (async () => {
      // Look for mic/record button or card practice button
      const buttons = Array.from(document.querySelectorAll('button'));
      const practiceBtn = buttons.find(b => b.getAttribute('title')?.includes('Phát') || b.getAttribute('title')?.includes('Play') || b.textContent.includes('Luyện') || b.textContent.includes('Record'));
      if (practiceBtn) {
        practiceBtn.click();
        return { clickedPractice: true, title: practiceBtn.getAttribute('title') };
      }
      // Click first sentence card
      const firstCard = document.querySelector('.cursor-pointer');
      if (firstCard) {
        firstCard.click();
        return { clickedCard: true };
      }
      return { none: true };
    })()
  `);
  console.log('Recording trigger result:', recordTrigger);

  console.log('Waiting 5 seconds in physical room silence (mic hardware active)...');
  await new Promise(r => setTimeout(r, 5000));

  // Take screenshot of Voice Shadow
  console.log('Taking screenshot of Voice Shadow on Android...');
  execSync('adb exec-out screencap -p > scripts/android_karaoke_real.png');
  console.log('✅ Saved: scripts/android_karaoke_real.png');

  console.log('\n--- 📋 SUMMARY OF RELEVANT LOGS ---');
  const relevant = consoleLogs.filter(l => l.includes('Audio') || l.includes('Speech') || l.includes('WebSpeech') || l.includes('blob') || l.includes('score') || l.includes('rms') || l.includes('Deepgram') || l.includes('TTS') || l.includes('BarModel') || l.includes('Math'));
  console.log(relevant.slice(-20).join('\n'));

  console.log('\n🎉 ALL PHYSICAL QA TASKS COMPLETED SUCCESSFULLY!');
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error in physical QA:', err);
  process.exit(1);
});
