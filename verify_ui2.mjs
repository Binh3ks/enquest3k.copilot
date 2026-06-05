import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

try {
  await page.goto('http://127.0.0.1:5173/week/1/read_explore', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(5000);

  const html = await page.content();
  writeFileSync('/tmp/page_debug.html', html);
  console.log('HTML saved, length:', html.length);

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
    'useFetchWeekData',
    'Loading Explore',
    'Loading Reading',
    'Reading Station',
    'Explore Station',
    'weekDataError',
    'weekData',
    'stationData',
    'getStationData',
    'error',
    'Error',
  ];

  checks.forEach(c => {
    const pos = html.indexOf(c);
    if (pos >= 0) {
      console.log('FOUND at', pos, ':', c);
    }
  });

  // Also check if we're getting an empty div or some loading state
  // Search for the root div content
  const rootContent = html.substring(html.indexOf('<div id="root">'), html.indexOf('<div id="root">') + 5000);
  console.log('--- Root div content ---');
  console.log(rootContent.slice(0, 2000));

} catch (e) {
  console.error('Error:', e.message);
}

await browser.close();
