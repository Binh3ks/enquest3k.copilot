import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/screenshots/w33_verified');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const artifactDir = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb';

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required']
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12/13/14 mobile viewport
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });

  // Inject bypass localStorage before any script runs
  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest_user', JSON.stringify({
      id: 'owner_test',
      displayName: 'Bình',
      role: 'owner',
      xp: 9999
    }));
  });

  const page = await context.newPage();

  console.log('=== TEST 1: Mobile Map Header & Quick Hub Button ===');
  await page.goto('http://localhost:5173/week/33/hub/1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const headerMetrics = await page.evaluate(() => {
    const header = document.querySelector('.qm3d-header');
    const hubBtn = document.querySelector('.qm3d-header-right button');
    const badge = document.querySelector('.qm3d-week-badge');
    const leftLogo = document.querySelector('.qm3d-header-left');
    const eruda = document.querySelector('.eruda-container, #eruda, [class*="eruda"]');

    const hBox = header ? header.getBoundingClientRect() : null;
    const btnBox = hubBtn ? hubBtn.getBoundingClientRect() : null;
    const badgeBox = badge ? badge.getBoundingClientRect() : null;
    const leftBox = leftLogo ? leftLogo.getBoundingClientRect() : null;

    return {
      windowWidth: window.innerWidth,
      headerBox: hBox ? { x: Math.round(hBox.x), y: Math.round(hBox.y), width: Math.round(hBox.width), right: Math.round(hBox.right) } : null,
      hubBtnBox: btnBox ? { x: Math.round(btnBox.x), y: Math.round(btnBox.y), width: Math.round(btnBox.width), right: Math.round(btnBox.right), fullyInside: btnBox.right <= window.innerWidth } : null,
      badgeBox: badgeBox ? { x: Math.round(badgeBox.x), width: Math.round(badgeBox.width) } : null,
      leftBox: leftBox ? { x: Math.round(leftBox.x), width: Math.round(leftBox.width) } : null,
      hasEruda: !!eruda
    };
  });

  console.log('Header Metrics on Mobile (390px):', JSON.stringify(headerMetrics, null, 2));

  const mapShot = path.join(outDir, 'mobile_map_header_fixed.png');
  await page.screenshot({ path: mapShot });
  fs.copyFileSync(mapShot, path.join(artifactDir, 'mobile_map_header_fixed.png'));

  console.log('=== TEST 2: Boss Castle - Listening (boss_listening) ===');
  await page.goto('http://localhost:5173/week/33/task/boss_listening', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const listeningMetrics = await page.evaluate(() => {
    const header = document.querySelector('[data-testid="boss-assessment-header"]');
    const mapBtn = document.querySelector('[data-testid="boss-back-to-map"]');
    const titleEl = document.querySelector('[data-testid="boss-active-part"]');
    const cardHeadings = Array.from(document.querySelectorAll('h4, h3, span'))
      .map(el => el.innerText.trim())
      .filter(t => t.includes('Practice') || t.includes('Flyers'));

    const mapBox = mapBtn ? mapBtn.getBoundingClientRect() : null;

    return {
      headerText: header ? header.innerText.replace(/\n+/g, ' | ') : null,
      titleText: titleEl ? titleEl.innerText.trim() : null,
      mapBtnPos: mapBox ? { x: Math.round(mapBox.x), y: Math.round(mapBox.y), width: Math.round(mapBox.width) } : null,
      matchingHeadings: cardHeadings
    };
  });
  console.log('Listening Boss Metrics:', JSON.stringify(listeningMetrics, null, 2));

  const listShot = path.join(outDir, 'mobile_boss_listening_fixed.png');
  await page.screenshot({ path: listShot });
  fs.copyFileSync(listShot, path.join(artifactDir, 'mobile_boss_listening_fixed.png'));

  console.log('=== TEST 3: Boss Castle - Reading & Writing (boss_reading) ===');
  await page.goto('http://localhost:5173/week/33/task/boss_reading', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const rwMetrics = await page.evaluate(() => {
    const header = document.querySelector('[data-testid="boss-assessment-header"]');
    const titleEl = document.querySelector('[data-testid="boss-active-part"]');
    const mapBtn = document.querySelector('[data-testid="boss-back-to-map"]');
    const cardHeadings = Array.from(document.querySelectorAll('h4, h3, span'))
      .map(el => el.innerText.trim())
      .filter(t => t.includes('Practice') || t.includes('Flyers'));

    const mapBox = mapBtn ? mapBtn.getBoundingClientRect() : null;

    return {
      headerText: header ? header.innerText.replace(/\n+/g, ' | ') : null,
      titleText: titleEl ? titleEl.innerText.trim() : null,
      mapBtnPos: mapBox ? { x: Math.round(mapBox.x), y: Math.round(mapBox.y), width: Math.round(mapBox.width) } : null,
      matchingHeadings: cardHeadings
    };
  });
  console.log('R&W Boss Metrics:', JSON.stringify(rwMetrics, null, 2));

  const rwShot = path.join(outDir, 'mobile_boss_rw_fixed.png');
  await page.screenshot({ path: rwShot });
  fs.copyFileSync(rwShot, path.join(artifactDir, 'mobile_boss_rw_fixed.png'));

  console.log('=== TEST 4: Boss Castle - Speaking (weekly_review) ===');
  await page.goto('http://localhost:5173/week/33/task/weekly_review', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const speakingMetrics = await page.evaluate(() => {
    const header = document.querySelector('[data-testid="boss-assessment-header"]');
    const titleEl = document.querySelector('[data-testid="boss-active-part"]');
    const mapBtn = document.querySelector('[data-testid="boss-back-to-map"]');
    const cardHeadings = Array.from(document.querySelectorAll('h4, h3, span'))
      .map(el => el.innerText.trim())
      .filter(t => t.includes('Practice') || t.includes('Flyers'));

    const mapBox = mapBtn ? mapBtn.getBoundingClientRect() : null;

    return {
      headerText: header ? header.innerText.replace(/\n+/g, ' | ') : null,
      titleText: titleEl ? titleEl.innerText.trim() : null,
      mapBtnPos: mapBox ? { x: Math.round(mapBox.x), y: Math.round(mapBox.y), width: Math.round(mapBox.width) } : null,
      matchingHeadings: cardHeadings
    };
  });
  console.log('Speaking Boss Metrics:', JSON.stringify(speakingMetrics, null, 2));

  const spkShot = path.join(outDir, 'mobile_boss_speaking_fixed.png');
  await page.screenshot({ path: spkShot });
  fs.copyFileSync(spkShot, path.join(artifactDir, 'mobile_boss_speaking_fixed.png'));

  console.log('=== TEST 5: Story Writer Heading (story_writer) ===');
  await page.goto('http://localhost:5173/week/33/task/story_writer', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const storyMetrics = await page.evaluate(() => {
    const allSpans = Array.from(document.querySelectorAll('span'));
    const sceneHeading = allSpans.find(s => s.innerText.includes('Write 2-3 sentences'));
    const oldHeading = allSpans.find(s => s.innerText.includes('Cambridge A2 Flyers — Reading & Writing Part 7') || s.innerText.includes('CAMBRIDGE A2 FLYERS'));

    return {
      hasNewHeading: !!sceneHeading,
      newHeadingText: sceneHeading ? sceneHeading.innerText.trim() : null,
      hasOldHeading: !!oldHeading
    };
  });
  console.log('Story Writer Metrics:', JSON.stringify(storyMetrics, null, 2));

  const storyShot = path.join(outDir, 'mobile_story_writer_fixed.png');
  await page.screenshot({ path: storyShot });
  fs.copyFileSync(storyShot, path.join(artifactDir, 'mobile_story_writer_fixed.png'));

  console.log('=== TEST 6: Voice Shadow (gear2_karaoke) ===');
  await page.goto('http://localhost:5173/week/33/task/gear2_karaoke', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const vsInitial = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Listen Model'));
    const sentence = document.querySelector('.min-h-\\[48px\\], .min-h-\\[56px\\]');
    return {
      hasListenBtn: !!btn,
      sentenceText: sentence ? sentence.innerText.replace(/\n+/g, ' ') : null
    };
  });
  console.log('Voice Shadow Mounted:', JSON.stringify(vsInitial, null, 2));

  // Click Listen Model
  const listenBtn = await page.locator('button:has-text("Listen Model")').first();
  if (await listenBtn.isVisible()) {
    await listenBtn.click();
    console.log('Clicked Listen Model!');
    await page.waitForTimeout(1200);

    const vsLiveState = await page.evaluate(() => {
      const activeWord = document.querySelector('.bg-amber-400.text-slate-950');
      const playingBadge = Array.from(document.querySelectorAll('div, span')).find(el => el.innerText.includes('Playing audio'));
      return {
        activeWordText: activeWord ? activeWord.innerText.trim() : null,
        isPlaying: !!playingBadge
      };
    });
    console.log('Voice Shadow Live State at t=1.2s:', JSON.stringify(vsLiveState, null, 2));
  }

  const vsShot = path.join(outDir, 'mobile_voice_shadow_fixed.png');
  await page.screenshot({ path: vsShot });
  fs.copyFileSync(vsShot, path.join(artifactDir, 'mobile_voice_shadow_fixed.png'));

  await browser.close();
  console.log('\n🎉 ALL QA TESTS FINISHED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('QA Test error:', err);
  process.exit(1);
});
