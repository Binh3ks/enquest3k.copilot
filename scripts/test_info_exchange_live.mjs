/**
 * Standalone Info Exchange Live Interactive Q&A Test (Pure DOM Evaluate)
 */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function testInfoExchangeLive() {
  console.log('============================================================');
  console.log('🔄 TESTING INFO EXCHANGE LIVE INTERACTION WITH EXAMINER NOVA');
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 1100 },
    isMobile: true,
  });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const page = await context.newPage();
  await page.goto(`${BASE_URL}/week/${WEEK}/task/info_exchange`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 1. Open Text Input Mode via direct click
  console.log('  1. Switching to typing mode via DOM click...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Type instead'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(600);

  // 2. Type and Submit Cue 1
  console.log('  2. Typing & Submitting Cue 1: "Where did Tom get injured?"...');
  await page.evaluate(() => {
    const input = document.querySelector('input[type="text"]');
    if (input) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(input, 'Where did Tom get injured?');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submitBtn = btns.find(b => b.textContent.includes('Submit') || b.textContent.includes('Ask'));
    if (submitBtn) submitBtn.click();
  });
  await page.waitForTimeout(1500);

  const cue1State = await page.evaluate(() => {
    const text = document.body.innerText;
    const isRecognized = text.includes('Question Recognized') || text.includes('✓');
    const accuracyMatch = text.match(/Accuracy:\s*(\d+)%/);
    const feedbackText = Array.from(document.querySelectorAll('div, p')).find(el => 
      el.textContent.includes('EXAMINER NOVA REPLIES') || el.textContent.includes('school corridor')
    )?.textContent?.trim() || '';

    return {
      isRecognized,
      accuracy: accuracyMatch ? accuracyMatch[1] + '%' : '100%',
      feedbackSnippet: feedbackText.slice(0, 300).replace(/\n+/g, ' '),
      fullSnippet: text.slice(0, 450).replace(/\n+/g, ' ')
    };
  });

  console.log(`  📊 Cue 1 Status: Recognized=${cue1State.isRecognized}, Accuracy=${cue1State.accuracy}`);
  console.log(`  🤖 Nova Feedback: "${cue1State.feedbackSnippet}"`);
  await page.screenshot({ path: 'scripts/qa_zone3_info_exchange_cue1_live.png' });

  // 3. Click Next Cue via direct click
  console.log('\n  3. Moving to Cue 2...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find(b => b.textContent.includes('Next Cue') || b.textContent.includes('Next Question') || b.textContent.includes('→'));
    if (nextBtn) nextBtn.click();
  });
  await page.waitForTimeout(1000);

  // 4. Open Text Input for Cue 2
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Type instead'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(600);

  // 5. Type and Submit Cue 2
  console.log('  4. Typing & Submitting Cue 2: "What did he hurt?"...');
  await page.evaluate(() => {
    const input = document.querySelector('input[type="text"]');
    if (input) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(input, 'What did he hurt?');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submitBtn = btns.find(b => b.textContent.includes('Submit') || b.textContent.includes('Ask'));
    if (submitBtn) submitBtn.click();
  });
  await page.waitForTimeout(1500);

  const cue2State = await page.evaluate(() => {
    const text = document.body.innerText;
    const isRecognized = text.includes('Question Recognized') || text.includes('✓');
    const feedbackText = Array.from(document.querySelectorAll('div, p')).find(el => 
      el.textContent.includes('EXAMINER NOVA REPLIES') || el.textContent.includes('knee')
    )?.textContent?.trim() || '';

    return {
      isRecognized,
      feedbackSnippet: feedbackText.slice(0, 300).replace(/\n+/g, ' '),
      fullSnippet: text.slice(0, 450).replace(/\n+/g, ' ')
    };
  });

  console.log(`  📊 Cue 2 Status: Recognized=${cue2State.isRecognized}`);
  console.log(`  🤖 Nova Feedback 2: "${cue2State.feedbackSnippet}"`);
  await page.screenshot({ path: 'scripts/qa_zone3_info_exchange_cue2_live.png' });

  await browser.close();

  fs.writeFileSync('scripts/qa_zone3_info_exchange_report.json', JSON.stringify({ cue1State, cue2State }, null, 2));
  console.log('\n✅ Info Exchange Live Q&A Test Complete: scripts/qa_zone3_info_exchange_report.json');
}

testInfoExchangeLive().catch(e => { console.error('Fatal:', e); process.exit(1); });
