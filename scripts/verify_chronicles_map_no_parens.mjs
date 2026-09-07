import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: '/Users/binhnguyen/.gemini/antigravity-ide/brain/ca208f83-1a01-48c3-a922-1aabfe360652/screenshots/chronicles_world_map_no_parens.png' });
  
  const textContent = await page.evaluate(() => {
    const nodes = document.querySelectorAll('.cwm-room-node');
    return Array.from(nodes).map(n => n.innerText);
  });
  
  console.log('ROOM NODES TEXT:', JSON.stringify(textContent, null, 2));
  await browser.close();
})();
