/**
 * Zone 4 (Boss Castle) Live Gameplay & Task Transitions Verification
 */
import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const WEEK = 33;

async function runZone4Gameplay() {
  console.log('============================================================');
  console.log('🏰 ZONE 4: LIVE BOSS BATTLE GAMEPLAY VERIFICATION (W33)');
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

  // 1. Boss Listening Gameplay
  console.log('\n--- 1. Boss Listening (Part 1: Draw Lines Gameplay) ---');
  const pageList = await context.newPage();
  try {
    await pageList.goto(`${BASE_URL}/week/${WEEK}/task/boss_listening`, { waitUntil: 'domcontentloaded' });
    await pageList.waitForTimeout(2000);

    // Click ENTER BOSS BATTLE NOW
    console.log('  Clicking "ENTER BOSS BATTLE NOW"...');
    await pageList.click('button:has-text("ENTER BOSS BATTLE NOW")');
    await pageList.waitForTimeout(2000);

    const listGameplay = await pageList.evaluate(() => {
      const text = document.body.innerText;
      const hasAudioPlayer = !!document.querySelector('audio, button[class*="play"], svg[class*="play"]');
      const hasNames = ['Tom', 'Jake', 'Emma', 'Harry', 'Lucy', 'Helen', 'Oliver'].some(n => text.includes(n));
      const hasCanvasOrSvg = !!document.querySelector('svg, canvas, div[class*="relative"]');
      return {
        hasAudioPlayer,
        hasNames,
        hasCanvasOrSvg,
        textSnippet: text.slice(0, 300).replace(/\n+/g, ' ')
      };
    });
    console.log(`  Boss Listening Gameplay: AudioReady=${listGameplay.hasAudioPlayer}, NamesFound=${listGameplay.hasNames}`);
    await pageList.screenshot({ path: 'scripts/qa_zone4_boss_listening_gameplay.png' });
    results.boss_listening = listGameplay;
  } catch (e) {
    console.error('Boss listening error:', e.message);
  } finally {
    await pageList.close();
  }

  // 2. Boss Reading Gameplay
  console.log('\n--- 2. Boss Reading Gameplay ---');
  const pageRead = await context.newPage();
  try {
    await pageRead.goto(`${BASE_URL}/week/${WEEK}/task/boss_reading`, { waitUntil: 'domcontentloaded' });
    await pageRead.waitForTimeout(2000);

    console.log('  Clicking "ENTER BOSS BATTLE NOW"...');
    await pageRead.click('button:has-text("ENTER BOSS BATTLE NOW")');
    await pageRead.waitForTimeout(2000);

    const readGameplay = await pageRead.evaluate(() => {
      const text = document.body.innerText;
      const hasInputs = Array.from(document.querySelectorAll('input, select, button')).length;
      return {
        hasInputs,
        textSnippet: text.slice(0, 300).replace(/\n+/g, ' ')
      };
    });
    console.log(`  Boss Reading Gameplay: Inputs=${readGameplay.hasInputs}, Snippet="${readGameplay.textSnippet.slice(0, 60)}..."`);
    await pageRead.screenshot({ path: 'scripts/qa_zone4_boss_reading_gameplay.png' });
    results.boss_reading = readGameplay;
  } catch (e) {
    console.error('Boss reading error:', e.message);
  } finally {
    await pageRead.close();
  }

  await browser.close();

  fs.writeFileSync('scripts/qa_zone4_gameplay_report.json', JSON.stringify(results, null, 2));
  console.log('\n✅ Zone 4 Live Gameplay Verification Complete');
}

runZone4Gameplay().catch(e => { console.error('Fatal:', e); process.exit(1); });
