import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/f875fff5-035d-4b7d-9f40-9d8daf173aeb';

async function testVoiceShadowSentences() {
  console.log('🧪 Testing Voice Shadow Sentences 1-8 navigation and audio playback...');
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
    if (text.includes('[TTS]') || text.includes('Audio')) {
      console.log(`[Browser Console] ${msg.type()}: ${text}`);
    }
  });

  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    localStorage.setItem('engquest_current_user', JSON.stringify({ id: 'test_user', role: 'student', displayName: 'Student' }));
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
  });

  await page.goto('http://localhost:5173/week/33/task/gear2_karaoke', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Loop through sentences 1 to 8 using Next ▶
  for (let s = 1; s <= 8; s++) {
    const sentenceHeader = await page.locator('text=/Sentence \\d+\\/8/').innerText().catch(() => '');
    console.log(`\n=== Current: ${sentenceHeader} ===`);
    
    // Extract sentence words in the karaoke card
    const cardText = await page.evaluate(() => {
      const el = document.querySelector('.max-w-4xl') || document.body;
      return el.innerText;
    });
    
    if (s === 3) {
      console.log('--- Sentence 3 Verification ---');
      console.log('Checking Sentence 3 text and audio...');
      const s3Path = path.join(ARTIFACT_DIR, 'test_voice_shadow_s3.png');
      await page.screenshot({ path: s3Path });
      console.log(`📸 Sentence 3 screenshot saved to ${s3Path}`);
      
      const listenBtn = page.locator('button:has-text("Listen Model")');
      if (await listenBtn.count() > 0) {
        console.log('Clicking "Listen Model" on Sentence 3...');
        await listenBtn.click();
        await page.waitForTimeout(2000);
      }
    } else if (s === 4) {
      console.log('--- Sentence 4 Verification ---');
      console.log('Checking Sentence 4 text and audio...');
      const s4Path = path.join(ARTIFACT_DIR, 'test_voice_shadow_s4.png');
      await page.screenshot({ path: s4Path });
      console.log(`📸 Sentence 4 screenshot saved to ${s4Path}`);

      const listenBtn = page.locator('button:has-text("Listen Model")');
      if (await listenBtn.count() > 0) {
        console.log('Clicking "Listen Model" on Sentence 4...');
        await listenBtn.click();
        await page.waitForTimeout(2000);
      }
    }

    // Click Next ▶ if not at end
    if (s < 8) {
      const nextBtn = page.locator('button:has-text("Next ▶")');
      if (await nextBtn.count() > 0) {
        await nextBtn.click();
        await page.waitForTimeout(500);
      }
    }
  }

  console.log('\n--- Final Network Audios Captured ---');
  console.table(networkAudios);

  await browser.close();
  console.log('\n🎉 Sentence check completed!');
}

testVoiceShadowSentences().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
