import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const initLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[POTION-INIT]')) {
      initLogs.push(text);
    }
  });

  await page.goto('http://localhost:5173/week/33/chronicles?room=1&door=0&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('INIT LOGS:');
  initLogs.forEach(l => console.log(' ', l));

  // Check cauldrons in DOM
  const cauldronCount = await page.evaluate(() => {
    return document.querySelectorAll('.cauldron-wrapper').length;
  });
  console.log('Cauldrons rendered in DOM:', cauldronCount);

  await browser.close();
}

main().catch(console.error);
