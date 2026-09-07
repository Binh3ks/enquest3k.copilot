import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/ca208f83-1a01-48c3-a922-1aabfe360652/screenshots';

async function playtestMobile() {
  console.log('📱 Launching Mobile Playtest...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Set iPhone 13 Pro viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    localStorage.setItem('arcade_owner_bypass', 'true');
    localStorage.setItem('dev_bypass', 'true');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    const nodes = document.querySelectorAll('.cwm-room-node');
    if (nodes[3]) nodes[3].click();
  });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const btns = document.querySelectorAll('.dr-door-enter-btn');
    if (btns[0]) btns[0].click();
  });
  await new Promise(r => setTimeout(r, 1800));

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'highway_3d_mobile_landing.png') });
  console.log('📸 Captured: highway_3d_mobile_landing.png');

  // Wait for reading_definition phase
  await new Promise(r => setTimeout(r, 4000));

  // Check if D-pad buttons are present
  const dpad = await page.evaluate(() => {
    return {
      left: !!document.querySelector('.vdpad-left-btn'),
      right: !!document.querySelector('.vdpad-right-btn'),
      jump: !!document.querySelector('.vdpad-jump-btn'),
      slide: !!document.querySelector('.vdpad-slide-btn'),
    };
  });
  console.log('Mobile D-Pad Audit:', dpad);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'highway_3d_mobile_playing.png') });
  console.log('📸 Captured: highway_3d_mobile_playing.png');

  await browser.close();
  console.log('📱 Mobile playtest done.');
}

playtestMobile().catch(console.error);
