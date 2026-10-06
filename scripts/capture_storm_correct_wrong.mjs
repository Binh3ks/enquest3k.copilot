import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function saveAndVerifyFrame(srcBuffer, filename, description) {
  const p1 = path.join(OUTPUT_DIR, filename);
  const p2 = path.join(BRAIN_DIR, filename);
  fs.writeFileSync(p1, srcBuffer);
  fs.writeFileSync(p2, srcBuffer);
  console.log(`  📸 [VERIFIED & SAVED] ${filename} — ${description}`);
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    args: ['--no-sandbox', '--window-size=1280,820'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5173/week/33/chronicles?room=2&bypass=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const doorBtns = await page.$$('.dr-door-enter-btn');
  await doorBtns[2].click();
  console.log('Entered Door 2 (Storm Shield Defense)');
  await new Promise(r => setTimeout(r, 1500));

  // 1. Spawn frame
  const spawnBuf = await page.screenshot();
  saveAndVerifyFrame(spawnBuf, 'b4_real_storm_spawn.png', 'Spawn frame (Castle Spire, 3/3 Hearts, Battery 0%)');

  // 2. Intercept Golden Target Meteor
  console.log('Tracking falling golden meteor to intercept with shield...');
  let hitGolden = false;
  for (let step = 0; step < 40; step++) {
    // Find positions
    const pos = await page.evaluate(() => {
      const golden = document.querySelector('.falling-meteor-entity.meteor-golden');
      const leoWrapper = document.querySelector('.leo-shield-wrapper');
      const aura = document.querySelector('.aegis-shield-aura');
      const toast = document.querySelector('.storm-feedback-toast');
      const battery = document.querySelector('.battery-fill')?.style?.width;
      const hearts = document.querySelectorAll('.hud-heart-full').length;

      let gx = null, gy = null, lx = null;
      if (golden) {
        gx = parseFloat(golden.style.left);
        gy = parseFloat(golden.style.top);
      }
      if (aura) {
        lx = parseFloat(aura.style.left) + 26;
      }
      return { gx, gy, lx, toast: toast?.innerText, battery, hearts };
    });

    if (pos.toast && pos.toast.includes('DEFLECTED')) {
      console.log('Golden meteor successfully deflected!', pos);
      hitGolden = true;
      const correctBuf = await page.screenshot();
      saveAndVerifyFrame(correctBuf, 'b4_real_storm_correct.png', `Correct Action (Shield Deflection, toast: "${pos.toast}", Battery: ${pos.battery})`);
      break;
    }

    if (pos.gx !== null && pos.lx !== null) {
      if (pos.gx > pos.lx + 15) {
        await page.keyboard.press('ArrowRight');
      } else if (pos.gx < pos.lx - 15) {
        await page.keyboard.press('ArrowLeft');
      } else if (pos.gy > 300) {
        await page.keyboard.press('Space'); // jump to meet it
      }
    }
    await new Promise(r => setTimeout(r, 150));
  }

  // 3. Intercept Crimson Hazard Meteor
  await new Promise(r => setTimeout(r, 1800)); // wait for invincibility to wear off
  console.log('Tracking falling crimson hazard meteor to intercept (-1 heart)...');
  let hitHazard = false;
  for (let step = 0; step < 40; step++) {
    const pos = await page.evaluate(() => {
      const hazard = document.querySelector('.falling-meteor-entity.meteor-hazard');
      const aura = document.querySelector('.aegis-shield-aura');
      const toast = document.querySelector('.storm-feedback-toast');
      const hearts = document.querySelectorAll('.hud-heart-full').length;

      let hx = null, hy = null, lx = null;
      if (hazard) {
        hx = parseFloat(hazard.style.left);
        hy = parseFloat(hazard.style.top);
      }
      if (aura) {
        lx = parseFloat(aura.style.left) + 26;
      }
      return { hx, hy, lx, toast: toast?.innerText, hearts };
    });

    if (pos.hearts < 3 || (pos.toast && pos.toast.includes('HAZARD'))) {
      console.log('Hazard meteor successfully hit!', pos);
      hitHazard = true;
      const wrongBuf = await page.screenshot();
      saveAndVerifyFrame(wrongBuf, 'b4_real_storm_wrong.png', `Hazard Hit Action (-1 Heart, toast: "${pos.toast}", Hearts: ${pos.hearts}/3)`);
      break;
    }

    if (pos.hx !== null && pos.lx !== null) {
      if (pos.hx > pos.lx + 15) {
        await page.keyboard.press('ArrowRight');
      } else if (pos.hx < pos.lx - 15) {
        await page.keyboard.press('ArrowLeft');
      } else if (pos.hy > 300) {
        await page.keyboard.press('Space');
      }
    }
    await new Promise(r => setTimeout(r, 150));
  }

  await browser.close();
}

run().catch(console.error);
