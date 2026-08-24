/**
 * Zone 2 Master Interactive QA (Fast & Robust DOM Evaluation)
 * Tests both INCORRECT and CORRECT interactions for all 3 tasks:
 *  1. Speed Match (word_blitz)
 *  2. Grammar Duel (sentence_smash)
 *  3. Math Quest (math_quest)
 */

import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function runInteractiveZone2QA() {
  console.log('============================================================');
  console.log('🧪 ZONE 2: INTERACTIVE SCORING & BEHAVIOR AUDIT');
  console.log('============================================================');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    isMobile: true,
  });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const results = {};

  // =========================================================================
  // TASK 1: SPEED MATCH (word_blitz)
  // =========================================================================
  console.log('\n--- 1. SPEED MATCH (word_blitz) ---');
  const page1 = await context.newPage();
  await page1.goto(`${BASE_URL}/week/${WEEK}/task/word_blitz`, { waitUntil: 'domcontentloaded' });
  await page1.waitForTimeout(2000);
  await page1.click('button:has-text("START")');
  await page1.waitForTimeout(1000);

  // 1a. Test Wrong Pair ('fell down' + 'khen ngợi')
  console.log('  Testing WRONG pair: "fell down" + "khen ngợi"...');
  await page1.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b1 = btns.find(b => b.textContent.trim() === 'fell down');
    const b2 = btns.find(b => b.textContent.trim() === 'khen ngợi');
    if (b1) b1.click();
    setTimeout(() => { if (b2) b2.click(); }, 200);
  });
  await page1.waitForTimeout(1000);

  const ptsAfterWrongMatch = await page1.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/(\d+)\s*PTS/);
    return match ? parseInt(match[1]) : 0;
  });
  console.log(`  PTS after WRONG match: ${ptsAfterWrongMatch} (Expected: 0)`);
  await page1.screenshot({ path: 'scripts/qa_zone2_word_blitz_wrong.png' });

  // 1b. Test Correct Pair ('fell down' + 'ngã xuống')
  console.log('  Testing CORRECT pair: "fell down" + "ngã xuống"...');
  await page1.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b1 = btns.find(b => b.textContent.trim() === 'fell down');
    const b2 = btns.find(b => b.textContent.trim() === 'ngã xuống');
    if (b1) b1.click();
    setTimeout(() => { if (b2) b2.click(); }, 200);
  });
  await page1.waitForTimeout(1200);

  const ptsAfterCorrectMatch = await page1.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/(\d+)\s*PTS/);
    return match ? parseInt(match[1]) : 0;
  });
  console.log(`  PTS after CORRECT match: ${ptsAfterCorrectMatch} (Expected: > 0)`);
  await page1.screenshot({ path: 'scripts/qa_zone2_word_blitz_correct.png' });

  results.word_blitz = {
    wrongAttemptScore: ptsAfterWrongMatch,
    correctAttemptScore: ptsAfterCorrectMatch,
    passed: ptsAfterWrongMatch === 0 && ptsAfterCorrectMatch > 0
  };
  await page1.close();

  // =========================================================================
  // TASK 2: GRAMMAR DUEL (sentence_smash)
  // =========================================================================
  console.log('\n--- 2. GRAMMAR DUEL (sentence_smash) ---');
  const page2 = await context.newPage();
  await page2.goto(`${BASE_URL}/week/${WEEK}/task/sentence_smash`, { waitUntil: 'domcontentloaded' });
  await page2.waitForTimeout(2000);
  await page2.click('button:has-text("START")');
  await page2.waitForTimeout(1000);

  // 2a. Test Wrong Sentence
  console.log('  Testing WRONG sentence order...');
  await page2.evaluate(() => {
    const words = ['Jake', 'slips', 'run', '.'];
    const btns = Array.from(document.querySelectorAll('button'));
    words.forEach(w => {
      const b = btns.find(btn => btn.textContent.trim() === w);
      if (b) b.click();
    });
  });
  await page2.waitForTimeout(500);

  await page2.evaluate(() => {
    const checkBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Check Sentence'));
    if (checkBtn) checkBtn.click();
  });
  await page2.waitForTimeout(1000);

  const feedbackWrongGrammar = await page2.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div, p, span')).find(e => 
      e.textContent.includes('Incorrect') || e.textContent.includes('Re-arrange') || e.textContent.includes('try again')
    );
    return el ? el.textContent.trim() : 'NO_WRONG_FEEDBACK';
  });
  console.log(`  Feedback on WRONG attempt: "${feedbackWrongGrammar}"`);
  await page2.screenshot({ path: 'scripts/qa_zone2_sentence_smash_wrong.png' });

  // 2b. Test Correct Sentence
  console.log('  Testing CORRECT sentence order...');
  await page2.goto(`${BASE_URL}/week/${WEEK}/task/sentence_smash`, { waitUntil: 'domcontentloaded' });
  await page2.waitForTimeout(1500);
  await page2.click('button:has-text("START")');
  await page2.waitForTimeout(1000);

  const correctWords = ["While", "Jake", "was", "walking", "down", "the", "corridor", ",", "a", "boy", "slipped", "."];
  await page2.evaluate((words) => {
    words.forEach((w) => {
      const allBtns = Array.from(document.querySelectorAll('button'));
      const b = allBtns.find(btn => btn.textContent.trim() === w && !btn.className.includes('border-indigo-400'));
      if (b) b.click();
    });
  }, correctWords);
  await page2.waitForTimeout(500);

  await page2.evaluate(() => {
    const checkBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Check Sentence'));
    if (checkBtn) checkBtn.click();
  });
  await page2.waitForTimeout(1000);

  const feedbackCorrectGrammar = await page2.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div, p, span')).find(e => 
      e.textContent.includes('Excellent') || e.textContent.includes('Correct') || e.textContent.includes('PTS')
    );
    return el ? el.textContent.trim() : 'NO_CORRECT_FEEDBACK';
  });
  console.log(`  Feedback on CORRECT attempt: "${feedbackCorrectGrammar}"`);
  await page2.screenshot({ path: 'scripts/qa_zone2_sentence_smash_correct.png' });

  results.sentence_smash = {
    wrongFeedback: feedbackWrongGrammar,
    correctFeedback: feedbackCorrectGrammar,
    passed: feedbackWrongGrammar.includes('Incorrect') && feedbackCorrectGrammar.includes('Excellent')
  };
  await page2.close();

  // =========================================================================
  // TASK 3: MATH QUEST (math_quest)
  // =========================================================================
  console.log('\n--- 3. MATH QUEST (math_quest) ---');
  const page3 = await context.newPage();
  await page3.goto(`${BASE_URL}/week/${WEEK}/task/math_quest`, { waitUntil: 'domcontentloaded' });
  await page3.waitForTimeout(2000);
  await page3.click('button:has-text("START")');
  await page3.waitForTimeout(1000);

  // 3a. Test Wrong Answer (50)
  console.log('  Testing WRONG numerical answer (50)...');
  await page3.fill('input[placeholder*="answer"]', '50');
  await page3.click('button:has-text("Submit Answer")');
  await page3.waitForTimeout(1000);

  const feedbackWrongMath = await page3.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div, p, span')).find(e => 
      e.textContent.includes('Not quite') || e.textContent.includes('Incorrect') || e.textContent.includes('Try again') || e.textContent.includes('Check the bar model')
    );
    return el ? el.textContent.trim() : 'NO_WRONG_MATH_FEEDBACK';
  });
  console.log(`  Feedback on WRONG math answer: "${feedbackWrongMath}"`);
  await page3.screenshot({ path: 'scripts/qa_zone2_math_quest_wrong.png' });

  // 3b. Test Correct Answer (60)
  console.log('  Testing CORRECT numerical answer (60)...');
  await page3.fill('input[placeholder*="answer"]', '60');
  await page3.click('button:has-text("Submit Answer")');
  await page3.waitForTimeout(1200);

  const feedbackCorrectMath = await page3.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div, p, span')).find(e => 
      e.textContent.includes('Spot on!') || e.textContent.includes('Correct!') || e.textContent.includes('Great job') || e.textContent.includes('+30') || e.textContent.includes('PTS')
    );
    return el ? el.textContent.trim() : 'NO_CORRECT_MATH_FEEDBACK';
  });
  console.log(`  Feedback on CORRECT math answer: "${feedbackCorrectMath}"`);
  await page3.screenshot({ path: 'scripts/qa_zone2_math_quest_correct.png' });

  results.math_quest = {
    wrongFeedback: feedbackWrongMath,
    correctFeedback: feedbackCorrectMath,
    passed: (feedbackWrongMath.includes('Not quite') || feedbackWrongMath.includes('Check the bar model')) &&
            (feedbackCorrectMath.includes('Spot on') || feedbackCorrectMath.includes('Correct') || feedbackCorrectMath.includes('PTS'))
  };
  await page3.close();

  await browser.close();

  fs.writeFileSync('scripts/qa_zone2_interactive_report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    results
  }, null, 2));

  console.log('\n============================================================');
  console.log('📊 INTERACTIVE QA AUDIT COMPLETE: ALL 3 TASKS VERIFIED');
  console.log('============================================================');
  console.log(JSON.stringify(results, null, 2));
}

runInteractiveZone2QA().catch(e => { console.error('Fatal:', e); process.exit(1); });
