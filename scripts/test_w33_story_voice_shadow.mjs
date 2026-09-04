import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb';

async function testStoryAndShadowing() {
  console.log('🧪 Starting Playwright Test for Week 33 Story & Voice Shadow...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--use-fake-ui-for-media-stream',
      '--autoplay-policy=no-user-gesture-required',
      '--disable-web-security'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    permissions: ['microphone']
  });

  const page = await context.newPage();

  const networkAudios = [];
  page.on('response', res => {
    const url = res.url();
    if (url.includes('.mp3') || url.includes('/audio/')) {
      networkAudios.push({ url, status: res.status() });
      console.log(`[Network Audio] ${res.status()} -> ${url}`);
    }
  });

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[TTS]') || text.includes('Audio') || text.includes('Error')) {
      console.log(`[Browser Console] ${msg.type()}: ${text}`);
    }
  });

  // Pre-seed localStorage with guest user
  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    localStorage.setItem('engquest_current_user', JSON.stringify({ id: 'test_user', role: 'student', displayName: 'Student' }));
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
  });

  console.log('\n--- 1. Testing Gear 1: Scene Explorer ---');
  await page.goto('http://localhost:5173/week/33/task/gear1_webtoon', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take screenshot of Scene 1
  const scene1Path = path.join(ARTIFACT_DIR, 'test_scene_explorer_s1.png');
  await page.screenshot({ path: scene1Path });
  console.log(`📸 Scene 1 screenshot saved to ${scene1Path}`);

  // Extract Scene 1 text
  const scene1Text = await page.locator('.p-3.sm\\:p-4.bg-blue-50\\/70').innerText().catch(() => '');
  console.log(`[Scene 1 DOM Text]: "${scene1Text.replace(/\n/g, ' ')}"`);

  // Click Listen to Scene button
  console.log('Testing "Listen to Scene" button on Scene 1...');
  const listenSceneBtn = page.locator('button:has-text("Listen to Scene")');
  if (await listenSceneBtn.count() > 0) {
    await listenSceneBtn.click();
    await page.waitForTimeout(1000);
  }

  // Click through all 5 scenes
  for (let s = 2; s <= 5; s++) {
    const nextBtn = page.locator('button:has-text("Next Frame →"), button:has-text("Next")').last();
    if (await nextBtn.count() > 0 && await nextBtn.isEnabled()) {
      await nextBtn.click();
      await page.waitForTimeout(1000);
      const sceneText = await page.locator('.p-3.sm\\:p-4.bg-blue-50\\/70').innerText().catch(() => '');
      console.log(`[Scene ${s} DOM Text]: "${sceneText.replace(/\n/g, ' ')}"`);
      if (s === 3) {
        const scene3Path = path.join(ARTIFACT_DIR, 'test_scene_explorer_s3.png');
        await page.screenshot({ path: scene3Path });
        console.log(`📸 Scene 3 screenshot saved to ${scene3Path}`);
      }
    }
  }

  console.log('\n--- 2. Testing Gear 2: Voice Shadow ---');
  await page.goto('http://localhost:5173/week/33/task/gear2_karaoke', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const shadowPath = path.join(ARTIFACT_DIR, 'test_voice_shadow_landing.png');
  await page.screenshot({ path: shadowPath });
  console.log(`📸 Voice Shadow landing screenshot saved to ${shadowPath}`);

  // Extract all sentence cards or texts
  const sentencesText = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.rounded-2xl, .shadowing-sentence-card, [data-sentence-id]'));
    return cards.map(c => c.innerText.trim()).filter(t => t.length > 10);
  });

  console.log('Found sentence cards in DOM:');
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('DOM excerpt:', bodyText.substring(0, 1000));

  // Check Full Audio button
  console.log('\nTesting "Full Audio" button...');
  const fullAudioBtn = page.locator('button:has-text("Full Audio"), button:has-text("Full Story Audio"), button:has-text("Full Audio (Toàn bộ bài)")');
  console.log(`Full Audio button count: ${await fullAudioBtn.count()}`);
  if (await fullAudioBtn.count() > 0) {
    await fullAudioBtn.first().click();
    console.log('Clicked "Full Audio" button. Waiting 3s for playback...');
    await page.waitForTimeout(3000);
  }

  // Click "Listen" button for Sentence 3
  console.log('\nTesting individual sentence audio for Sentence 3 ("Suddenly, he lost his balance...")...');
  const listenBtns = page.locator('button:has-text("Listen")');
  console.log(`Found ${await listenBtns.count()} Listen buttons.`);
  if (await listenBtns.count() >= 3) {
    await listenBtns.nth(2).click(); // 3rd button (0-indexed 2)
    await page.waitForTimeout(2000);
  }

  console.log('\n--- Network Audios Captured ---');
  console.table(networkAudios);

  await browser.close();
  console.log('\n✅ Playwright test completed successfully!');
}

testStoryAndShadowing().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
