/**
 * REAL CHROME AUDIT — W33 EngQuest3K
 * AGENTS.md Anti-Hallucination Gate v2 — 9-step protocol
 */
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:5173';
const SCREENSHOT_DIR = path.resolve('public/screenshots/w33_real');

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const QUESTS = [
  { id: 'hub_map',          url: '/week/33/hub/1',                    label: 'Quest Map',              clickText: null },
  { id: 'gear1_webtoon',    url: '/week/33/task/gear1_webtoon',       label: 'Q1: Scene Explorer',     clickText: 'Listen to Scene' },
  { id: 'gear2_karaoke',    url: '/week/33/task/gear2_karaoke',       label: 'Q2: Voice Shadow',       clickText: 'Listen Model Audio' },
  { id: 'gear3_retell',     url: '/week/33/task/gear3_retell',        label: 'Q3: Story Retell',       clickText: 'RECORD' },
  { id: 'gear4_clil',       url: '/week/33/task/gear4_clil',          label: 'Q4: Fact Finder',        clickText: 'Gravity' },
  { id: 'science_lab',      url: '/week/33/task/science_lab',         label: 'Q5: Action Lab',         clickText: 'START' },
  { id: 'science_report',   url: '/week/33/task/science_report',      label: 'Q6: Discovery Report',   clickText: 'Wet Corridor' },
  { id: 'word_blitz',       url: '/week/33/task/word_blitz',          label: 'Q7: Speed Match',        clickText: 'START' },
  { id: 'sentence_smash',   url: '/week/33/task/sentence_smash',      label: 'Q8: Grammar Duel',       clickText: 'START' },
  { id: 'math_quest',       url: '/week/33/task/math_quest',          label: 'Q9: Math Quest',         clickText: 'START' },
  { id: 'story_writer',     url: '/week/33/task/story_writer',        label: 'Q10: Story Writer',      clickText: "2 BUILD" },
  { id: 'broadcast_studio', url: '/week/33/task/broadcast_studio',    label: 'Q11: Video Challenge',   clickText: 'START RECORDING' },
  { id: 'info_exchange',    url: '/week/33/task/info_exchange',       label: 'Q12: Info Exchange',     clickText: 'SPEAK' },
  { id: 'boss_listening',   url: '/week/33/task/boss_listening',      label: 'Q13: Listening Shield',  clickText: 'ENTER BOSS BATTLE NOW' },
  { id: 'boss_reading',     url: '/week/33/task/boss_reading',        label: 'Q14: R&W Shield',        clickText: 'ENTER BOSS BATTLE NOW' },
  { id: 'weekly_review',    url: '/week/33/task/weekly_review',       label: 'Q15: Speaking & Passport', clickText: 'ENTER BOSS BATTLE NOW' },
];

async function clickByText(page, text) {
  return page.evaluate((t) => {
    const el = Array.from(document.querySelectorAll('button,a,[role=button]'))
      .find(e => e.innerText?.includes(t));
    if (el) { el.click(); return el.innerText.trim().slice(0,50); }
    return null;
  }, text);
}

async function getDOM(page) {
  return page.evaluate(() => ({
    headings: Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(h => h.innerText.trim()).filter(Boolean),
    buttons: Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim().replace(/\s+/g,' ')).filter(Boolean).slice(0,20),
    bodyText: document.body.innerText.trim().replace(/\s+/g,' '),
    bodyLength: document.body.innerText.trim().length,
    spinners: document.querySelectorAll('[class*=spinner],[class*=loading],[class*=skeleton]').length,
    errEls: Array.from(document.querySelectorAll('[class*=error],[class*=Error]')).map(e=>e.innerText?.trim()).filter(Boolean),
  }));
}

async function runAudit() {
  console.log('🚀 REAL Chrome Audit — AGENTS.md v2 9-step protocol');
  console.log('Chrome: non-headless | --use-fake-ui-for-media-stream');
  console.log('='.repeat(60));

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    args: [
      '--no-sandbox',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--window-size=1280,820',
      '--window-position=0,0',
    ],
    defaultViewport: { width: 1280, height: 760 },
  });

  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
  });

  const report = [];

  for (let i = 0; i < QUESTS.length; i++) {
    const q = QUESTS[i];
    const consoleErrs = [], pageErrs = [];
    const errH = m => { if (m.type()==='error') consoleErrs.push(m.text()); };
    const pgH = e => pageErrs.push(e.message);
    page.on('console', errH);
    page.on('pageerror', pgH);

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`[${i+1}/16] ${q.label}`);

    try {
      // S1: Navigate
      await page.goto(`${BASE_URL}${q.url}`, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 2500));

      // S2: Screenshot before
      const p1 = path.join(SCREENSHOT_DIR, `${q.id}_1_before.png`);
      await page.screenshot({ path: p1 });

      // S3: Full DOM before
      const d1 = await getDOM(page);
      console.log(`  📄 [BEFORE] H:${JSON.stringify(d1.headings)} | Btns:${d1.buttons.length} | Body:${d1.bodyLength}ch`);
      console.log(`  📝 ${d1.bodyText.slice(0,180)}`);
      if (d1.spinners) console.warn(`  ⚠️  ${d1.spinners} spinner(s) before action`);
      if (d1.errEls.length) console.error(`  🚨 Error elements: ${d1.errEls.join(' | ')}`);

      // S5-7: Click + screenshot after
      let clicked = null, d2 = null;
      if (q.clickText) {
        clicked = await clickByText(page, q.clickText);
        if (clicked) {
          console.log(`  👆 Clicked: "${clicked}"`);
          await new Promise(r => setTimeout(r, 2500));
          const p2 = path.join(SCREENSHOT_DIR, `${q.id}_2_after.png`);
          await page.screenshot({ path: p2 });
          d2 = await getDOM(page);
          console.log(`  📄 [AFTER]  H:${JSON.stringify(d2.headings)} | Body:${d2.bodyLength}ch`);
          console.log(`  📝 ${d2.bodyText.slice(0,180)}`);
          if (d2.spinners) console.warn(`  ⚠️  ${d2.spinners} spinner(s) AFTER action`);
          if (d2.errEls.length) console.error(`  🚨 Errors AFTER click: ${d2.errEls.join(' | ')}`);
        } else {
          console.warn(`  ⚠️  Button "${q.clickText}" NOT FOUND`);
        }
      }

      // S8: Console/page errors
      if (consoleErrs.length) console.error(`  ❌ Console errs: ${consoleErrs.slice(0,2).join(' | ')}`);
      if (pageErrs.length) console.error(`  ❌ JS errors: ${pageErrs.slice(0,2).join(' | ')}`);

      const hasErrs = consoleErrs.length > 0 || pageErrs.length > 0;
      const noClick = q.clickText && !clicked;
      let status = hasErrs ? 'WARNINGS' : noClick ? 'BUTTON_MISSING' : clicked ? 'PASS_INTERACTED' : 'PASS_VIEW_ONLY';
      const icon = status === 'PASS_INTERACTED' ? '✅' : status === 'PASS_VIEW_ONLY' ? '🟢' : status === 'BUTTON_MISSING' ? '🔴' : '🟡';
      console.log(`  ${icon} ${status}`);

      report.push({
        id: q.id, label: q.label, url: q.url, status,
        screenshotBefore: `${q.id}_1_before.png`,
        screenshotAfter: clicked ? `${q.id}_2_after.png` : null,
        clickText: q.clickText, clicked,
        domBefore: d1, domAfter: d2,
        consoleErrors: consoleErrs, pageErrors: pageErrs,
      });

    } catch(e) {
      console.error(`  ❌ FATAL: ${e.message}`);
      report.push({ id: q.id, label: q.label, url: q.url, status: 'FATAL_ERROR', error: e.message });
    } finally {
      page.off('console', errH);
      page.off('pageerror', pgH);
    }
  }

  await new Promise(r => setTimeout(r, 1500));
  await browser.close();

  const rp = path.join(SCREENSHOT_DIR, 'audit_report_real.json');
  fs.writeFileSync(rp, JSON.stringify(report, null, 2));

  // Final summary
  console.log(`\n${'='.repeat(60)}`);
  const byStatus = {};
  report.forEach(r => { byStatus[r.status] = (byStatus[r.status]||0)+1; });
  console.log('📊 AUDIT SUMMARY:');
  Object.entries(byStatus).forEach(([s,n]) => console.log(`   ${s}: ${n}`));
  console.log(`📁 public/screenshots/w33_real/`);
  console.log(`📋 audit_report_real.json`);
  
  // Print any non-pass items
  const issues = report.filter(r => !r.status?.startsWith('PASS'));
  if (issues.length) {
    console.log('\n🔴 ISSUES REQUIRING ATTENTION:');
    issues.forEach(r => console.log(`   ${r.label}: ${r.status} — ${r.error || r.clicked}`));
  }
}

runAudit().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
