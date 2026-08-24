/**
 * Inspect buttons and DOM on production tab 1539 (gear2_karaoke)
 * using Playwright CDP connection
 */
import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';

async function main() {
  execSync('adb forward tcp:9222 localabstract:chrome_devtools_remote');

  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  const allPages = [];
  for (const ctx of contexts) {
    allPages.push(...ctx.pages());
  }

  console.log('All pages found:', allPages.map(p => p.url()));

  // Find the gear2_karaoke production page
  let targetPage = allPages.find(p => p.url().includes('bkbacademy.vn') && p.url().includes('gear2_karaoke'));
  if (!targetPage) {
    targetPage = allPages.find(p => p.url().includes('bkbacademy.vn'));
  }
  if (!targetPage) {
    targetPage = allPages[0];
  }
  console.log('Using page:', targetPage.url());

  // Bring to front (focus)
  await targetPage.bringToFront();
  await new Promise(r => setTimeout(r, 1000));

  // Get all button texts
  const buttons = await targetPage.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.textContent.trim().slice(0, 80),
      id: b.id,
      className: b.className.slice(0, 50)
    }));
  });

  console.log('\n=== BUTTONS ON PAGE ===');
  buttons.forEach((b, i) => console.log(`[${i}] "${b.text}" id="${b.id}" cls="${b.className}"`));

  // Get body text snippet
  const bodySnippet = await targetPage.evaluate(() => document.body.innerText.slice(0, 600));
  console.log('\n=== BODY TEXT SNIPPET ===');
  console.log(bodySnippet);

  // Screenshot
  await targetPage.screenshot({ path: 'scripts/tab1539_inspect.png', fullPage: false });
  console.log('\nScreenshot: scripts/tab1539_inspect.png');

  fs.writeFileSync('scripts/tab1539_buttons.json', JSON.stringify({ buttons, bodySnippet }, null, 2));
  console.log('Saved: scripts/tab1539_buttons.json');

  await browser.close();
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
