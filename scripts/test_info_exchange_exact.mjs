/**
 * Info Exchange Live Q&A Test - Full Submission
 */
import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 412, height: 1100 }, isMobile: true });

  await context.addInitScript(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
  });

  const page = await context.newPage();
  await page.goto(`${BASE_URL}/week/${WEEK}/task/info_exchange`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Switch to typing mode
  await page.click('button:has-text("Type instead")');
  await page.waitForTimeout(500);

  // Fill text
  const input = page.locator('input[placeholder*="response"], input[type="text"]').first();
  await input.fill('Where did Tom get injured?');
  await page.waitForTimeout(300);

  // Click Submit Response button
  await page.click('button:has-text("Submit Response")');
  await page.waitForTimeout(2000);

  // Extract Nova's Response Card
  const result = await page.evaluate(() => {
    const text = document.body.innerText;
    const isRecognized = text.includes('Question Recognized');
    const accuracy = text.match(/Accuracy:\s*(\d+)%/)?.[1] || '';
    const novaCard = Array.from(document.querySelectorAll('div')).find(d => d.textContent.includes('EXAMINER NOVA REPLIES'))?.textContent?.trim() || '';
    return { isRecognized, accuracy, novaCard, snippet: text.slice(0, 500).replace(/\n+/g, ' ') };
  });

  console.log('Result:', JSON.stringify(result, null, 2));
  await page.screenshot({ path: 'scripts/qa_zone3_info_exchange_cue1_evaluated.png' });

  await browser.close();
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
