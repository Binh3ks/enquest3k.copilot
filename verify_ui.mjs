import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

try {
  await page.goto('http://127.0.0.1:5173/week/1/read_explore', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(5000);

  const html = await page.content();
  console.log('HTML length:', html.length);

  const checks = [
    'Ant and the Grasshopper',
    'This is my family',
    'Fables',
    'fable',
    'animal characters',
    'content_en',
    'MainLayout',
    'ReadingExplore',
    'Explore',
    'Loading',
    'Station loading',
    'weekData',
  ];

  checks.forEach(c => {
    if (html.includes(c)) {
      console.log('FOUND:', c);
    }
  });

  console.log('--- First 5000 chars ---');
  console.log(html.slice(0, 5000));

} catch (e) {
  console.error('Error:', e.message);
}

await browser.close();
