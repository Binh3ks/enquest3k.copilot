import puppeteer from 'puppeteer';

async function test() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/quest-demo');
  await new Promise(r => setTimeout(r, 1000));
  await page.select('#select-active-game', 'riddle_maze');
  await new Promise(r => setTimeout(r, 1500));

  const result = await page.evaluate(() => {
    const root = document.querySelector('.riddle-maze-viewport');
    const fiberKey = Object.keys(root || {}).find(k => k.startsWith('__reactFiber'));
    let fiber = root ? root[fiberKey] : null;
    let foundLeoRef = false;
    let leoCoords = null;
    while (fiber) {
      if (fiber.memoizedState) {
        let s = fiber.memoizedState;
        while (s) {
          if (s.memoizedState?.current?.vx !== undefined) {
            foundLeoRef = true;
            leoCoords = { ...s.memoizedState.current };
            break;
          }
          s = s.next;
        }
      }
      if (foundLeoRef) break;
      fiber = fiber.return;
    }
    const doorEl = document.querySelector('[data-door-id="door_0"]');
    doorEl.click();
    return {
      foundLeoRef,
      leoCoords,
      toast: document.querySelector('.riddle-feedback-toast')?.innerText,
    };
  });

  console.log('Result:', result);
  await browser.close();
}
test();
