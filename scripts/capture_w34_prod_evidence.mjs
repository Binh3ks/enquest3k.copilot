import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'https://app.bkbacademy.vn';
const OUT_DIR = path.resolve('docs/agent_artifacts/screenshots/w34_003b_prod');

fs.mkdirSync(OUT_DIR, { recursive: true });

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ['microphone', 'camera']
  });

  const page = await context.newPage();

  await page.addInitScript(() => {
    localStorage.setItem('engquest-user-storage', JSON.stringify({
      state: {
        currentUser: { id: 'owner-eval', name: 'Owner', display_name: 'Owner', avatar: 'lion', role: 'owner' },
        token: 'test-token',
        learningMode: 'advanced',
        progressCache: {}
      },
      version: 2
    }));
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest_onboarding_completed', 'true');
    localStorage.setItem('engquest_overlay_dismissed', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });

  // 1. Action Lab
  console.log('Capturing Action Lab...');
  await page.goto(`${BASE_URL}/week/34/task/science_lab`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '01_action_lab_live.png'), fullPage: true });

  // 2. Info Exchange Quest 12
  console.log('Capturing Info Exchange (Quest 12)...');
  await page.goto(`${BASE_URL}/week/34/task/info_exchange`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '02_info_exchange_live.png'), fullPage: true });

  // 3. Weekly Review Speaking Part 2
  console.log('Capturing Weekly Review Speaking Part 2...');
  await page.goto(`${BASE_URL}/week/34/task/weekly_review`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const startExamBtn = page.locator('button:has-text("START EXAM")').first();
  if (await startExamBtn.isVisible().catch(() => false)) {
    await startExamBtn.click({ force: true }).catch(() => {});
    await page.waitForTimeout(4500); // Wait for auto-advance into Question 1
    await page.screenshot({ path: path.join(OUT_DIR, '03_speaking_p2_q1_live.png'), fullPage: true });
  }

  // 4. Voice Shadow Quest 2
  console.log('Capturing Voice Shadow (Quest 2)...');
  await page.goto(`${BASE_URL}/week/34/task/gear2_karaoke`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '04_voice_shadow_no_dictation_live.png'), fullPage: true });

  await browser.close();
  console.log('Done capturing live evidence screenshots!');
}

capture().catch(console.error);
