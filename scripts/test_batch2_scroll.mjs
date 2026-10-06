import puppeteer from 'puppeteer';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function testScroll() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/week/33/chronicles?room=2&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  await doorBtns[2].click();
  console.log('Entered ScrollChamberDecode');
  await new Promise(r => setTimeout(r, 1200));

  // Inspect initial state
  const initState = await page.evaluate(() => {
    const blanks = Array.from(document.querySelectorAll('.scroll-blank-slot')).map(el => el.innerText);
    const stones = Array.from(document.querySelectorAll('.rune-stone-entity')).map(el => ({
      word: el.innerText,
      style: el.getAttribute('style'),
    }));
    return { blanks, stones };
  });
  console.log('Init State:', initState);

  // Walk left to pick up stone "ice" at x=260
  console.log('Walking left towards stone "ice" at x=260...');
  await page.keyboard.down('ArrowLeft');
  await new Promise(r => setTimeout(r, 700));
  await page.keyboard.up('ArrowLeft');
  await new Promise(r => setTimeout(r, 200));

  // Press KeyE to interact
  console.log('Pressing KeyE to pick up...');
  await page.keyboard.press('KeyE');
  await new Promise(r => setTimeout(r, 300));

  const carryState = await page.evaluate(() => {
    const hint = document.querySelector('.scroll-carried-rune');
    return hint ? hint.innerText : 'NOT_CARRYING';
  });
  console.log('Carry State:', carryState);

  await browser.close();
}

testScroll();
