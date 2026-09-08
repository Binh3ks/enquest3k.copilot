import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

async function record() {
  const frameDir = path.resolve('scratch/video_frames');
  if (fs.existsSync(frameDir)) {
    fs.rmSync(frameDir, { recursive: true });
  }
  fs.mkdirSync(frameDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 750, deviceScaleFactor: 1 });

  console.log('Navigating...');
  await page.goto('http://localhost:5173/week/33/chronicles', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  let frameCount = 0;
  async function captureFrame() {
    frameCount++;
    const pad = String(frameCount).padStart(3, '0');
    await page.screenshot({ path: path.join(frameDir, `frame_${pad}.png`) });
  }

  // Record idle for 1 second (10 frames)
  console.log('Recording initial state...');
  for (let i = 0; i < 10; i++) {
    await captureFrame();
    await new Promise(r => setTimeout(r, 100));
  }

  // Click on Chamber of Tales area (x: 350, y: 380) to move hero left
  console.log('Moving hero left...');
  await page.mouse.click(350, 420);
  for (let i = 0; i < 18; i++) {
    await captureFrame();
    await new Promise(r => setTimeout(r, 80));
  }

  // Click on red carpet center (x: 500, y: 550) to move hero down
  console.log('Moving hero down...');
  await page.mouse.click(500, 560);
  for (let i = 0; i < 18; i++) {
    await captureFrame();
    await new Promise(r => setTimeout(r, 80));
  }

  // Click on Thunder Arena area (x: 650, y: 400) to move hero right
  console.log('Moving hero right...');
  await page.mouse.click(650, 410);
  for (let i = 0; i < 20; i++) {
    await captureFrame();
    await new Promise(r => setTimeout(r, 80));
  }

  await browser.close();

  // Compile with ffmpeg into webp and mp4
  const outDir = path.resolve('public/phaser-assets/evidence');
  const webpOut = path.join(outDir, 'hub_world_demo.webp');
  const mp4Out = path.join(outDir, 'hub_world_demo.mp4');

  console.log('Encoding video with ffmpeg...');
  execSync(`/opt/homebrew/bin/ffmpeg -y -framerate 12 -i "${frameDir}/frame_%03d.png" -vcodec libwebp -filter:v fps=fps=12 -lossless 0 -compression_level 4 -q:v 70 -loop 0 "${webpOut}"`);
  execSync(`/opt/homebrew/bin/ffmpeg -y -framerate 12 -i "${frameDir}/frame_%03d.png" -c:v libx264 -pix_fmt yuv420p "${mp4Out}"`);

  console.log('Saved:', webpOut, mp4Out);
}

record().catch(console.error);
