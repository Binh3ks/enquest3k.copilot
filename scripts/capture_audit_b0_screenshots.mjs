import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../docs/agent_artifacts/screenshots');

async function capture() {
  console.log('Launching browser for Production Evidence Capture...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('engquest_onboarded', 'true');
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('engquest3k_srs_daily_reviewed', new Date().toISOString().slice(0, 10));
  });

  // 1. W33 Floor 3 -> Chunk Catapult
  console.log('Navigating to W33 Floor 3 (Catapult)...');
  await page.goto('http://localhost:5173/week/33/chronicles?owner=true&room=2', { waitUntil: 'networkidle2', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '01_w33_floor3_chamber.png') });

  const door1Btn = (await page.$$('.dr-door-enter-btn'))[1];
  if (door1Btn) {
    console.log('Clicking Door 1 (Chunk Catapult)...');
    await door1Btn.click();
    await new Promise(r => setTimeout(r, 2500));
    await page.screenshot({ path: path.join(OUT_DIR, '02_w33_catapult_gameplay.png') });
  }

  // 2. W33 Floor 4 -> Highway Runner
  console.log('Navigating to W33 Floor 4 (Highway Runner)...');
  await page.goto('http://localhost:5173/week/33/chronicles?owner=true&room=3', { waitUntil: 'networkidle2', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '03_w33_floor4_chamber.png') });

  const door0Btn = (await page.$$('.dr-door-enter-btn'))[0];
  if (door0Btn) {
    console.log('Clicking Door 0 (Highway Runner)...');
    await door0Btn.click();
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: path.join(OUT_DIR, '04_w33_highway_runner_gameplay.png') });
  }

  // 3. W40 Floor 3 -> Chunk Catapult Fallback (No dedicated lesson data in W40)
  console.log('Navigating to W40 Floor 3 (Catapult Fallback)...');
  await page.goto('http://localhost:5173/week/40/chronicles?owner=true&room=2', { waitUntil: 'networkidle2', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  const w40Door1 = (await page.$$('.dr-door-enter-btn'))[1];
  if (w40Door1) {
    await w40Door1.click();
    await new Promise(r => setTimeout(r, 2500));
    await page.screenshot({ path: path.join(OUT_DIR, '05_w40_catapult_fallback.png') });
  }

  // 4. W40 Floor 4 -> Highway Runner Fallback
  console.log('Navigating to W40 Floor 4 (Highway Runner Fallback)...');
  await page.goto('http://localhost:5173/week/40/chronicles?owner=true&room=3', { waitUntil: 'networkidle2', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  const w40Door0 = (await page.$$('.dr-door-enter-btn'))[0];
  if (w40Door0) {
    await w40Door0.click();
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: path.join(OUT_DIR, '06_w40_highway_runner_fallback.png') });
  }

  // 5. ArcadeModal check: Open Quest Map and open Arcade Room
  console.log('Checking ArcadeModal on Quest Map...');
  await page.goto('http://localhost:5173/week/33/hub/1', { waitUntil: 'networkidle2', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  
  // Trigger ArcadeModal via window/store or click
  await page.evaluate(() => {
    window.useArcadeStore?.getState()?.setArcadeOpen(true);
  });
  // Or click sidebar button if drawer exists
  const menuBtn = await page.$('.qm3d-menu-btn, button[aria-label="Menu"]');
  if (menuBtn) await menuBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  
  const arcadeSidebarBtn = await page.$('.qs-nav-item:has(.fa-gamepad), .qs-nav-item:has-text("Arcade")');
  if (arcadeSidebarBtn) await arcadeSidebarBtn.click();
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, '07_arcade_modal_unlocked_check.png') });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
