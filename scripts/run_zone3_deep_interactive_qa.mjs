/**
 * Zone 3 Deep Interactive QA & Boundary Verification Script
 * Covers:
 *  1. Story Writer: Exact 19 words vs 20 words boundary test + Panel 2/3 transitions
 *  2. Broadcast Studio: Camera & Mic permission, Fake Media Stream, Video recording, Stop & Preview
 *  3. Info Exchange: Cambridge Speaking Part 2 full question-answer loop with AI Nova
 */

import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function runZone3DeepQA() {
  console.log('============================================================');
  console.log('🧪 ZONE 3: DEEP INTERACTIVE & BOUNDARY QA AUDIT');
  console.log('============================================================');

  // Launch Chromium with fake video and audio streams enabled
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--allow-file-access'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    isMobile: true,
    permissions: ['camera', 'microphone']
  });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const results = {};

  // =========================================================================
  // 1. STORY WRITER: BOUNDARY 19 vs 20 WORDS & PANEL TRANSITIONS
  // =========================================================================
  console.log('\n--- 1. STORY WRITER: Boundary & Panel Transitions ---');
  const pageWriting = await context.newPage();
  try {
    await pageWriting.goto(`${BASE_URL}/week/${WEEK}/task/story_writer`, { waitUntil: 'domcontentloaded' });
    await pageWriting.waitForTimeout(2000);

    const textarea = pageWriting.locator('textarea').first();

    // 1a. Test Boundary 19 words
    // 19 words sentence:
    const text19 = "Jake was walking carefully down the school corridor after science class when suddenly a student slipped on the wet floor.";
    const count19 = text19.trim().split(/\s+/).length;
    console.log(`  Writing 19 words (actual count: ${count19})...`);
    await textarea.fill(text19);
    await pageWriting.waitForTimeout(600);

    const counter19State = await pageWriting.evaluate(() => {
      const text = document.body.innerText;
      const totalMatch = text.match(/(\d+)\s*WORDS\s*TOTAL/i);
      const isGreenCheck = document.body.innerHTML.includes('30 WORDS TOTAL ✓') || document.body.innerHTML.includes('WORDS TOTAL ✓');
      return { totalText: totalMatch ? totalMatch[0] : 'NOT_FOUND', hasCheckMark: isGreenCheck };
    });
    console.log(`  Counter at 19 words: "${counter19State.totalText}" | Has green check: ${counter19State.hasCheckMark}`);
    await pageWriting.screenshot({ path: 'scripts/qa_zone3_story_writer_19words.png' });

    // 1b. Test Boundary 20 words
    const text20 = text19 + " heavily.";
    const count20 = text20.trim().split(/\s+/).length;
    console.log(`  Writing 20 words (actual count: ${count20})...`);
    await textarea.fill(text20);
    await pageWriting.waitForTimeout(600);

    const counter20State = await pageWriting.evaluate(() => {
      const text = document.body.innerText;
      const totalMatch = text.match(/(\d+)\s*WORDS\s*TOTAL/i);
      const isCheckMark = document.body.innerText.includes('WORDS TOTAL ✓') || document.body.innerHTML.includes('✓');
      return { totalText: totalMatch ? totalMatch[0] : 'NOT_FOUND', hasCheckMark: isCheckMark };
    });
    console.log(`  Counter at 20 words: "${counter20State.totalText}" | Has check mark: ${counter20State.hasCheckMark}`);
    await pageWriting.screenshot({ path: 'scripts/qa_zone3_story_writer_20words.png' });

    // 1c. Transition to Panel 2
    console.log('  Navigating to Panel 2...');
    await pageWriting.click('button:has-text("Panel 2 →")');
    await pageWriting.waitForTimeout(1000);

    const panel2Content = await pageWriting.evaluate(() => {
      const panelBadge = Array.from(document.querySelectorAll('span, div')).find(el => el.textContent.trim() === 'Panel 2');
      const question = document.querySelector('div[class*="gradient"] p')?.textContent?.trim() || '';
      const pills = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('+')).map(b => b.textContent.trim());
      return {
        hasPanel2Badge: !!panelBadge,
        question,
        pillsCount: pills.length,
        samplePills: pills.slice(0, 4)
      };
    });
    console.log(`  Panel 2 Rendered: Badge=${panel2Content.hasPanel2Badge}, Question="${panel2Content.question.slice(0, 60)}..."`);
    await pageWriting.screenshot({ path: 'scripts/qa_zone3_story_writer_panel2.png' });

    // 1d. Transition to Panel 3
    console.log('  Navigating to Panel 3...');
    const textarea2 = pageWriting.locator('textarea').first();
    await textarea2.fill('The boy fell down heavily and hurt his knee badly. Jake stopped immediately.');
    await pageWriting.waitForTimeout(500);
    await pageWriting.click('button:has-text("Panel 3 →")');
    await pageWriting.waitForTimeout(1000);

    const panel3Content = await pageWriting.evaluate(() => {
      const panelBadge = Array.from(document.querySelectorAll('span, div')).find(el => el.textContent.trim() === 'Panel 3');
      const reviewBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Review Story'));
      return { hasPanel3Badge: !!panelBadge, hasReviewBtn: !!reviewBtn };
    });
    console.log(`  Panel 3 Rendered: Badge=${panel3Content.hasPanel3Badge}, HasReviewBtn=${panel3Content.hasReviewBtn}`);
    await pageWriting.screenshot({ path: 'scripts/qa_zone3_story_writer_panel3.png' });

    results.story_writer = {
      boundary19: counter19State,
      boundary20: counter20State,
      panel2: panel2Content,
      panel3: panel3Content,
      passed: !counter19State.hasCheckMark && counter20State.hasCheckMark && panel2Content.hasPanel2Badge && panel3Content.hasPanel3Badge
    };
  } catch (e) {
    console.error('Story writer test error:', e.message);
    results.story_writer = { error: e.message, passed: false };
  } finally {
    await pageWriting.close();
  }

  // =========================================================================
  // 2. BROADCAST STUDIO: CAMERA STREAM & VIDEO RECORDING LOOP
  // =========================================================================
  console.log('\n--- 2. BROADCAST STUDIO: Video Camera Recording Loop ---');
  const pageBroadcast = await context.newPage();
  try {
    await pageBroadcast.goto(`${BASE_URL}/week/${WEEK}/task/broadcast_studio`, { waitUntil: 'domcontentloaded' });
    await pageBroadcast.waitForTimeout(3000); // Allow camera stream to attach

    const streamStatus = await pageBroadcast.evaluate(() => {
      const videoEl = document.querySelector('video');
      const hasErrorBanner = document.body.innerText.includes('Camera not available');
      return {
        hasVideoElement: !!videoEl,
        videoSrcObjectAttached: !!(videoEl && videoEl.srcObject),
        hasErrorBanner
      };
    });
    console.log(`  Camera Status: VideoEl=${streamStatus.hasVideoElement}, SrcAttached=${streamStatus.videoSrcObjectAttached}, ErrorBanner=${streamStatus.hasErrorBanner}`);
    await pageBroadcast.screenshot({ path: 'scripts/qa_zone3_broadcast_camera_ready.png' });

    // Start Video Recording
    console.log('  Triggering START VIDEO RECORDING (3s countdown)...');
    const startRecordBtn = pageBroadcast.locator('button:has-text("START"), button:has-text("RECORDING")').first();
    if (await startRecordBtn.isVisible()) {
      await startRecordBtn.click();
      await pageBroadcast.waitForTimeout(4500); // Wait 3s countdown + 1.5s active recording

      const recordingState = await pageBroadcast.evaluate(() => {
        const text = document.body.innerText;
        const isRecordingText = text.includes('STOP') || text.includes('Recording') || text.includes('00:');
        return { isRecordingText };
      });
      console.log(`  Active Recording State: ${recordingState.isRecordingText}`);
      await pageBroadcast.screenshot({ path: 'scripts/qa_zone3_broadcast_recording.png' });

      // Stop Recording
      console.log('  Stopping Recording...');
      const stopBtn = pageBroadcast.locator('button:has-text("STOP"), button:has-text("Dừng")').first();
      if (await stopBtn.isVisible()) {
        await stopBtn.click();
        await pageBroadcast.waitForTimeout(2000); // Wait for media blob creation

        const postRecordingState = await pageBroadcast.evaluate(() => {
          const text = document.body.innerText;
          const hasPreview = !!document.querySelector('video[src*="blob:"], audio[src*="blob:"]');
          const hasCompleteOrSubmit = text.includes('Save') || text.includes('Submit') || text.includes('Complete') || text.includes('Re-record');
          return { hasPreview, hasCompleteOrSubmit };
        });
        console.log(`  Post-Recording Preview: HasMediaBlob=${postRecordingState.hasPreview}, HasSubmitBtn=${postRecordingState.hasCompleteOrSubmit}`);
        await pageBroadcast.screenshot({ path: 'scripts/qa_zone3_broadcast_preview.png' });

        results.broadcast_studio = {
          streamStatus,
          recordingState,
          postRecordingState,
          passed: postRecordingState.hasPreview || postRecordingState.hasCompleteOrSubmit
        };
      }
    }
  } catch (e) {
    console.error('Broadcast studio test error:', e.message);
    results.broadcast_studio = { error: e.message, passed: false };
  } finally {
    await pageBroadcast.close();
  }

  // =========================================================================
  // 3. INFO EXCHANGE: COMPLETE QUESTION & ANSWER INTERACTION LOOP WITH NOVA
  // =========================================================================
  console.log('\n--- 3. INFO EXCHANGE: End-to-End Q&A Loop with AI Nova ---');
  const pageInfo = await context.newPage();
  try {
    await pageInfo.goto(`${BASE_URL}/week/${WEEK}/task/info_exchange`, { waitUntil: 'domcontentloaded' });
    await pageInfo.waitForTimeout(2500);

    // 3a. Ask Cue 1: "Where did Tom get injured?" via input/speech fallback
    console.log('  Testing Cue 1 question: "Where did Tom get injured?"...');
    
    // Switch to text input fallback mode or fill
    const typeBtn = pageInfo.locator('button:has-text("Type instead"), span:has-text("Type instead"), button:has-text("Keyboard")').first();
    if (await typeBtn.isVisible()) {
      await typeBtn.click();
      await pageInfo.waitForTimeout(500);
    }

    const inputQ = pageInfo.locator('input[placeholder*="Ask"], input[type="text"]').first();
    if (await inputQ.isVisible()) {
      await inputQ.fill('Where did Tom get injured?');
      await pageInfo.waitForTimeout(300);

      // Submit Question
      const askBtn = pageInfo.locator('button:has-text("Ask Nova"), button:has-text("Send"), button:has-text("Submit")').first();
      if (await askBtn.isVisible()) {
        await askBtn.click();
        await pageInfo.waitForTimeout(1500); // Allow Nova reply animation

        const novaResponse1 = await pageInfo.evaluate(() => {
          const text = document.body.innerText;
          const hasCorridor = text.includes('corridor') || text.includes('school') || text.includes('science class');
          const hasCheck = document.body.innerHTML.includes('CheckCircle') || text.includes('✓');
          return { textSnippet: text.slice(0, 400).replace(/\n+/g, ' '), hasCorridor, hasCheck };
        });
        console.log(`  Nova Response on Cue 1: Contains Answer=${novaResponse1.hasCorridor}, CheckMark=${novaResponse1.hasCheck}`);
        await pageInfo.screenshot({ path: 'scripts/qa_zone3_info_exchange_cue1_answered.png' });

        // 3b. Advance to Cue 2 and Ask
        console.log('  Testing Cue 2: "What did he hurt?"...');
        const nextCueBtn = pageInfo.locator('button:has-text("Next Cue"), button:has-text("Next Question"), button:has-text("→")').first();
        if (await nextCueBtn.isVisible()) {
          await nextCueBtn.click();
          await pageInfo.waitForTimeout(1000);

          if (await inputQ.isVisible()) {
            await inputQ.fill('What part of his body did he hurt?');
            await askBtn.click();
            await pageInfo.waitForTimeout(1500);

            const novaResponse2 = await pageInfo.evaluate(() => {
              const text = document.body.innerText;
              const hasKnee = text.includes('knee') || text.includes('hurt his knee');
              return { hasKnee, textSnippet: text.slice(0, 300).replace(/\n+/g, ' ') };
            });
            console.log(`  Nova Response on Cue 2: Contains Answer (knee)=${novaResponse2.hasKnee}`);
            await pageInfo.screenshot({ path: 'scripts/qa_zone3_info_exchange_cue2_answered.png' });

            results.info_exchange = {
              cue1: novaResponse1,
              cue2: novaResponse2,
              passed: novaResponse1.hasCorridor && novaResponse2.hasKnee
            };
          }
        }
      }
    }
  } catch (e) {
    console.error('Info exchange test error:', e.message);
    results.info_exchange = { error: e.message, passed: false };
  } finally {
    await pageInfo.close();
  }

  await browser.close();

  fs.writeFileSync('scripts/qa_zone3_deep_report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    results
  }, null, 2));

  console.log('\n============================================================');
  console.log('🏁 ZONE 3 DEEP QA COMPLETE');
  console.log('============================================================');
  console.log(JSON.stringify(results, null, 2));
}

runZone3DeepQA().catch(e => { console.error('Fatal:', e); process.exit(1); });
