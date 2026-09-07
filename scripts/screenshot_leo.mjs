import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 750 });
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle2' });
  await page.evaluate(() => { localStorage.setItem('arcade_owner_bypass', 'true'); });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => { document.querySelectorAll('.cwm-room-node')[3].click(); });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => { document.querySelectorAll('.dr-door-enter-btn')[0].click(); });
  await new Promise(r => setTimeout(r, 1500));

  const el = await page.$('.track-leo-anchor');
  if (el) {
    await el.screenshot({ path: '/Users/binhnguyen/.gemini/antigravity-ide/brain/ca208f83-1a01-48c3-a922-1aabfe360652/screenshots/leo_element.png' });
    console.log('Leo element screenshot saved!');
  }
  await browser.close();
})();
