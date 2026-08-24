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
  console.log('🏰 ZONE 1 (STORY WORLD) COMPREHENSIVE QA ON SAMSUNG GALAXY S23');
  console.log('================================================================');

  execSync('adb reverse tcp:5173 tcp:5173');
  execSync('adb forward tcp:9222 localabstract:chrome_devtools_remote');

  const tabsRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await tabsRes.json();
  let targetTab = tabs.find(t => t.type === 'page' && t.url.includes('5173'));
  if (!targetTab) targetTab = tabs.find(t => t.type === 'page');

  console.log(`Connecting to Android Chrome [Tab ${targetTab.id}]`);
  const client = new CDPClient(targetTab.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const consoleErrors = [];
  client.onEvent((method, params) => {
    if (method === 'Runtime.consoleAPICalled' && params.type === 'error') {
      const args = (params.args || []).map(a => a.value !== undefined ? (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value) : (a.description || JSON.stringify(a))).join(' ');
      consoleErrors.push(args);
    }
  });

  const zone1Tasks = [
    {
      taskId: 'gear1_webtoon',
      name: 'Gear 1: Scene Explorer (Webtoon Reader)',
      url: 'http://localhost:5173/week/33/task/gear1_webtoon'
    },
    {
      taskId: 'gear2_karaoke',
      name: 'Gear 2: Voice Shadow (Karaoke Practice)',
      url: 'http://localhost:5173/week/33/task/gear2_karaoke'
    },
    {
      taskId: 'gear3_retell',
      name: 'Gear 3: Story Retell (Sequence Ordering)',
      url: 'http://localhost:5173/week/33/task/gear3_retell'
    }
  ];

  const results = [];

  for (let i = 0; i < zone1Tasks.length; i++) {
    const task = zone1Tasks[i];
    console.log(`\n----------------------------------------------------------------`);
    console.log(`▶ [${i + 1}/3] Auditing ${task.name} (${task.taskId})`);
    console.log(`----------------------------------------------------------------`);

    consoleErrors.length = 0;

    await client.eval(`
      localStorage.setItem('engquest_onboarded', 'true');
      localStorage.setItem('arcade_owner_bypass', 'true');
      window.location.href = '${task.url}';
    `);

    // Wait for full React render & images
    await new Promise(r => setTimeout(r, 4500));

    // Deep DOM scan for data anomalies (Text, Alt, Title, Aria-Label)
    const domAudit = await client.eval(`
      (() => {
        const anomalies = [];
        const suspiciousPatterns = ['undefined', 'NaN', 'null', '[object Object]'];

        // 1. Text content scan
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
          const val = node.nodeValue.trim();
          if (!val) continue;
          
          if (val.includes('[object Object]')) {
            anomalies.push({ type: 'text', pattern: '[object Object]', text: val.slice(0, 100), parentTag: node.parentElement?.tagName });
          }
          if (/\bundefined\b/i.test(val)) {
            anomalies.push({ type: 'text', pattern: 'undefined', text: val.slice(0, 100), parentTag: node.parentElement?.tagName });
          }
          if (/\bNaN\b/.test(val)) {
            anomalies.push({ type: 'text', pattern: 'NaN', text: val.slice(0, 100), parentTag: node.parentElement?.tagName });
          }
          if (/\bnull\b/i.test(val) && !val.toLowerCase().includes('null and void')) {
            anomalies.push({ type: 'text', pattern: 'null', text: val.slice(0, 100), parentTag: node.parentElement?.tagName });
          }
        }

        // 2. Image alt attribute scan
        document.querySelectorAll('img').forEach(img => {
          const alt = img.getAttribute('alt');
          if (alt) {
            if (alt.includes('[object Object]') || /\b(undefined|NaN|null)\b/i.test(alt)) {
              anomalies.push({ type: 'img-alt', alt, src: img.src });
            }
          }
        });

        // 3. Title & aria-label attribute scan
        document.querySelectorAll('[title], [aria-label]').forEach(el => {
          const title = el.getAttribute('title') || '';
          const aria = el.getAttribute('aria-label') || '';
          if (title.includes('[object Object]') || /\b(undefined|NaN|null)\b/i.test(title)) {
            anomalies.push({ type: 'title', title });
          }
          if (aria.includes('[object Object]') || /\b(undefined|NaN|null)\b/i.test(aria)) {
            anomalies.push({ type: 'aria-label', aria });
          }
        });

        // Extract key UI metadata
        const heading = document.querySelector('h1, h2, h3')?.textContent?.trim() || '';
        const bodySnippet = document.body.innerText.slice(0, 300).replace(/\\n+/g, ' | ');

        return {
          heading,
          bodySnippet,
          anomaliesCount: anomalies.length,
          anomalies,
          renderedElementsCount: document.querySelectorAll('*').length
        };
      })()
    `);

    // Capture screenshot directly from Samsung Galaxy S23
    const shotPath = `scripts/android_zone1_${task.taskId}.png`;
    execSync(`adb exec-out screencap -p > ${shotPath}`);
    console.log(`📸 Screenshot: ${shotPath}`);

    const taskReport = {
      task: task.name,
      taskId: task.taskId,
      url: task.url,
      domHeading: domAudit.heading,
      elementsRendered: domAudit.renderedElementsCount,
      jsConsoleErrors: [...consoleErrors],
      anomalies: domAudit.anomalies,
      screenshot: shotPath,
      pass: consoleErrors.length === 0 && domAudit.anomaliesCount === 0
    };

    results.push(taskReport);
    console.log(`Status: ${taskReport.pass ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`- DOM Elements: ${domAudit.renderedElementsCount}`);
    console.log(`- JS Console Errors: ${consoleErrors.length}`);
    console.log(`- Data Anomalies (undefined/NaN/null/alt/aria): ${domAudit.anomaliesCount}`);
  }

  // Save Zone 1 Audit Report
  const finalReport = {
    timestamp: new Date().toISOString(),
    device: 'Samsung Galaxy S23 (SM-S911B)',
    zone: 'Zone 1: Story World (Week 33)',
    allPassed: results.every(r => r.pass),
    tasks: results
  };

  fs.writeFileSync('scripts/android_zone1_qa_report.json', JSON.stringify(finalReport, null, 2));

  console.log('\n================================================================');
  console.log(`🎉 ZONE 1 MASTER QA COMPLETED: ${finalReport.allPassed ? 'ALL 3 TASKS PASSED' : 'FAILURES DETECTED'}`);
  console.log('================================================================');
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal Error:', e);
  process.exit(1);
});
