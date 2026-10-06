import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SS_DIR = path.join(__dirname, '..', 'docs', 'agent_artifacts', 'screenshots');
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';

if (!fs.existsSync(SS_DIR)) fs.mkdirSync(SS_DIR, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function copyToBrain(srcPath, filename) {
  try {
    fs.copyFileSync(srcPath, path.join(BRAIN_DIR, filename));
  } catch (e) {
    console.warn('Could not copy to brain:', e.message);
  }
}

async function auditChamber(page, roomIdx) {
  const url = `http://localhost:5173/week/33/chronicles?room=${roomIdx}&owner=true`;
  console.log(`\n=== AUDITING ROOM ${roomIdx} (${url}) ===`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000 });
  await sleep(2500);

  const ssPath = path.join(SS_DIR, `chamber_room_${roomIdx}_overview.png`);
  await page.screenshot({ path: ssPath });
  copyToBrain(ssPath, `chamber_room_${roomIdx}_overview.png`);

  const roomInfo = await page.evaluate(() => {
    const title = document.querySelector('.dr-chamber-title, h1, .title')?.textContent?.trim() || '';
    const subtitle = document.querySelector('.dr-chamber-subtitle, .subtitle')?.textContent?.trim() || '';
    const indicators = Array.from(document.querySelectorAll('.dr-door-indicator')).map(ind => ({
      label: ind.querySelector('.dr-door-label')?.textContent?.trim() || '',
      gameName: ind.querySelector('.dr-door-game-name')?.textContent?.trim() || '',
      icon: ind.querySelector('.dr-door-icon')?.textContent?.trim() || '',
      status: ind.className
    }));

    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim());
    const openChestBtns = buttons.filter(b => b.includes('Open Chest') || b.includes('Replay') || b.includes('Enter'));

    return {
      title,
      subtitle,
      chestCount: indicators.length,
      indicators,
      openChestBtnsCount: openChestBtns.length,
      bodySnippet: document.body.innerText.slice(0, 500).replace(/\s+/g, ' ')
    };
  });

  return { roomIdx, ssPath, ...roomInfo };
}

async function auditWorldMap(page) {
  const url = `http://localhost:5173/week/33/chronicles?owner=true`;
  console.log(`\n=== AUDITING WORLD MAP (${url}) ===`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000 });
  await sleep(3000);

  const ssPath = path.join(SS_DIR, `chronicles_world_map_overview.png`);
  await page.screenshot({ path: ssPath });
  copyToBrain(ssPath, `chronicles_world_map_overview.png`);

  const mapInfo = await page.evaluate(() => {
    const banner = document.querySelector('.cwm-pp-hint, .cwm-owner-badge')?.textContent?.trim() || '';
    const ppText = document.querySelector('.cwm-pp-section')?.textContent?.trim()?.replace(/\s+/g, ' ') || '';
    const tabs = Array.from(document.querySelectorAll('.cwm-tab-btn')).map(t => t.textContent.trim());
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim());
    const hasCanvas = !!document.querySelector('canvas');
    return {
      banner,
      ppText,
      tabs,
      buttons,
      hasCanvas,
      bodyText: document.body.innerText.slice(0, 600).replace(/\s+/g, ' ')
    };
  });

  return { ssPath, ...mapInfo };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = {
    worldMap: await auditWorldMap(page),
    chambers: []
  };

  // Audit rooms 0 to 6
  for (let r = 0; r <= 6; r++) {
    const chamberRes = await auditChamber(page, r);
    results.chambers.push(chamberRes);
  }

  const outJson = path.join(SS_DIR, 'chamber_architecture_audit_evidence.json');
  fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
  console.log('\nAudit complete! Saved to', outJson);

  await browser.close();
}

main().catch(console.error);
