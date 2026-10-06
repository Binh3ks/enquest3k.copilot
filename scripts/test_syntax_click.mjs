import puppeteer from 'puppeteer';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function testSyntax() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/week/33/chronicles?room=3&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  await doorBtns[1].click();
  await new Promise(r => setTimeout(r, 1200));

  // Check what levers exist in DOM
  const levers = await page.evaluate(() => {
    const els = document.querySelectorAll('.rail-switch-entity');
    return Array.from(els).map(el => ({
      text: el.innerText,
      isCorrect: el.getAttribute('data-is-correct'),
      box: el.getBoundingClientRect(),
    }));
  });
  console.log('Levers in DOM:', levers);

  // Click using DOM click
  console.log('Clicking correct lever via DOM...');
  const res = await page.evaluate(() => {
    const el = document.querySelector('.rail-switch-entity[data-is-correct="true"]');
    if (!el) return 'NOT_FOUND';
    el.click();
    return 'CLICKED';
  });
  console.log('DOM click result:', res);

  await new Promise(r => setTimeout(r, 500));
  const toast = await page.evaluate(() => {
    const t = document.querySelector('.syntax-feedback-toast');
    return t ? { text: t.innerText, className: t.className } : null;
  });
  console.log('Toast after DOM click:', toast);

  await browser.close();
}

testSyntax();
