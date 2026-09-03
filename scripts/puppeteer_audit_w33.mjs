import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:5173';
const OUTPUT_DIR = path.resolve('public/screenshots/w33');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const QUESTS = [
  { id: 'hub_map', url: '/week/33/hub/1', name: 'Quest Map (Day 1-5)' },
  { id: 'gear1_webtoon', url: '/week/33/task/gear1_webtoon', name: 'Quest 1: Scene Explorer (Webtoon)' },
  { id: 'gear2_karaoke', url: '/week/33/task/gear2_karaoke', name: 'Quest 2: Voice Shadow (Karaoke)' },
  { id: 'gear3_retell', url: '/week/33/task/gear3_retell', name: 'Quest 3: Story Retell' },
  { id: 'gear4_clil', url: '/week/33/task/gear4_clil', name: 'Quest 4: Fact Finder (CLIL)' },
  { id: 'science_lab', url: '/week/33/task/science_lab', name: 'Quest 5: Action Lab' },
  { id: 'science_report', url: '/week/33/task/science_report', name: 'Quest 6: Discovery Report' },
  { id: 'word_blitz', url: '/week/33/task/word_blitz', name: 'Quest 7: Speed Match (Word Blitz)' },
  { id: 'sentence_smash', url: '/week/33/task/sentence_smash', name: 'Quest 8: Grammar Duel (Sentence Smash)' },
  { id: 'math_quest', url: '/week/33/task/math_quest', name: 'Quest 9: Math Quest (Bar Model)' },
  { id: 'story_writer', url: '/week/33/task/story_writer', name: 'Quest 10: Story Writer (Part 7)' },
  { id: 'broadcast_studio', url: '/week/33/task/broadcast_studio', name: 'Quest 11: Video Challenge (Broadcast)' },
  { id: 'info_exchange', url: '/week/33/task/info_exchange', name: 'Quest 12: Info Exchange (Speaking P2)' },
  { id: 'boss_listening', url: '/week/33/task/boss_listening', name: 'Quest 13: Boss Listening Shield' },
  { id: 'boss_reading', url: '/week/33/task/boss_reading', name: 'Quest 14: Boss Reading & Writing Shield' },
  { id: 'weekly_review', url: '/week/33/task/weekly_review', name: 'Quest 15: Speaking & Passport Review' },
];

async function runAudit() {
  console.log('🚀 Starting Puppeteer Audit with Google Chrome at:', CHROME_PATH);
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  
  // Set localStorage bypass
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('role', 'student');
  });

  const report = [];

  for (let i = 0; i < QUESTS.length; i++) {
    const q = QUESTS[i];
    const fullUrl = `${BASE_URL}${q.url}`;
    console.log(`\n------------------------------------------------------------`);
    console.log(`[${i + 1}/${QUESTS.length}] Auditing: ${q.name} (${q.url})`);
    
    const consoleLogs = [];
    const pageErrors = [];
    
    const logHandler = (msg) => {
      if (msg.type() === 'error') consoleLogs.push(msg.text());
    };
    const errHandler = (err) => pageErrors.push(err.message);
    
    page.on('console', logHandler);
    page.on('pageerror', errHandler);

    try {
      await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise((r) => setTimeout(r, 2000)); // wait 2s for UI animation/render

      const screenshotPath = path.join(OUTPUT_DIR, `${q.id}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      const auditData = await page.evaluate(() => {
        // Collect visible headings
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.innerText.trim()).filter(Boolean);
        // Collect visible buttons
        const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim().replace(/\n+/g, ' ')).filter(Boolean);
        // Full visible text (first 600 chars)
        const bodyText = document.body.innerText.trim().replace(/\s+/g, ' ');
        // Check for error boundary or red screen
        const isErrorScreen = document.body.innerText.includes('Something went wrong') || 
                              document.body.innerText.includes('Lexio Screen Recovery') ||
                              document.body.innerText.includes('ReferenceError') ||
                              document.body.innerText.includes('TypeError');
        
        return {
          title: document.title,
          headings,
          buttons: buttons.slice(0, 15),
          bodySnippet: bodyText.slice(0, 400),
          isErrorScreen,
          bodyLength: bodyText.length
        };
      });

      console.log(`📸 Screenshot saved: public/screenshots/w33/${q.id}.png`);
      console.log(`🏷️ Headings: ${JSON.stringify(auditData.headings)}`);
      console.log(`🔘 Buttons (${auditData.buttons.length}): ${JSON.stringify(auditData.buttons.slice(0, 8))}`);
      console.log(`📄 Snippet: ${auditData.bodySnippet.slice(0, 150)}...`);
      if (auditData.isErrorScreen) {
        console.error(`🚨 DETECTED ERROR SCREEN!`);
      }
      if (pageErrors.length > 0) {
        console.error(`❌ Page Errors: ${pageErrors.join(' | ')}`);
      }

      report.push({
        quest: q,
        success: !auditData.isErrorScreen && pageErrors.length === 0,
        data: auditData,
        errors: pageErrors,
        consoleLogs
      });
    } catch (e) {
      console.error(`❌ Failed to navigate to ${fullUrl}:`, e.message);
      report.push({
        quest: q,
        success: false,
        error: e.message
      });
    } finally {
      page.off('console', logHandler);
      page.off('pageerror', errHandler);
    }
  }

  await browser.close();
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'audit_report.json'),
    JSON.stringify(report, null, 2)
  );
  console.log(`\n============================================================`);
  console.log(`🎉 Audit Complete. Report written to public/screenshots/w33/audit_report.json`);
}

runAudit().catch(e => {
  console.error('Fatal audit error:', e);
  process.exit(1);
});
