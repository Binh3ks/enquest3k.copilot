import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74';
const SCREENSHOT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';

async function verifyAll4Rounds() {
  console.log('=== VERIFYING ALL 4 ROUNDS OF GRAND MATRIX (C5) ===');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5173/week/33/chronicles?room=4&owner=true', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // Click Chest 1 (Door 0)
  const openChestBtn = await page.$('.dr-door-enter-btn');
  if (openChestBtn) {
    await openChestBtn.click();
    await new Promise(r => setTimeout(r, 1200));
  }

  const roundsVerification = [];

  for (let r = 0; r < 4; r++) {
    console.log(`\n--- INSPECTING ROUND ${r + 1} / 4 ---`);
    const roundData = await page.evaluate(() => {
      const bannerTitle = document.querySelector('.matrix-banner-title')?.textContent?.trim() || '';
      const defText = document.querySelector('.matrix-def-text')?.textContent?.trim() || '';
      const roundChip = document.querySelector('.matrix-round-chip')?.textContent?.trim() || '';
      
      const targetEntity = document.querySelector('.matrix-glyph-entity[data-is-target="true"]');
      const targetWord = targetEntity?.querySelector('.glyph-text')?.textContent?.trim() || '';

      const allGlyphs = Array.from(document.querySelectorAll('.matrix-glyph-entity')).map(g => ({
        word: g.querySelector('.glyph-text')?.textContent?.trim() || '',
        isTarget: g.getAttribute('data-is-target') === 'true'
      }));

      return {
        bannerTitle,
        defText,
        roundChip,
        targetWord,
        allGlyphs
      };
    });

    console.log(`[ROUND ${r + 1}] Definition: ${roundData.defText}`);
    console.log(`[ROUND ${r + 1}] Target Word: "${roundData.targetWord}"`);
    console.log(`[ROUND ${r + 1}] Glyphs on Field:`, roundData.allGlyphs.map(g => `${g.word} (target=${g.isTarget})`));

    // Capture screenshot of each round
    const shotFilename = `c5_grand_matrix_round_${r + 1}_verified.png`;
    const shotPath1 = path.join(ARTIFACT_DIR, shotFilename);
    const shotPath2 = path.join(SCREENSHOT_DIR, shotFilename);
    await page.screenshot({ path: shotPath1 });
    await page.screenshot({ path: shotPath2 });
    console.log(`Saved screenshot: ${shotFilename}`);

    roundsVerification.push({
      round: r + 1,
      definition: roundData.defText,
      targetWord: roundData.targetWord,
      allGlyphs: roundData.allGlyphs,
      screenshot: shotFilename
    });

    // Advance to next round by clicking the target glyph
    const targetGlyph = await page.$('.matrix-glyph-entity[data-is-target="true"]');
    if (targetGlyph) {
      await targetGlyph.click();
      await new Promise(res => setTimeout(res, 1800)); // wait for toast feedback and round transition
    } else {
      console.error(`Target glyph not found in Round ${r + 1}`);
      break;
    }
  }

  // Save evidence json
  const jsonPath = path.join(SCREENSHOT_DIR, 'c5_grand_matrix_4rounds_semantic_evidence.json');
  fs.writeFileSync(jsonPath, JSON.stringify(roundsVerification, null, 2), 'utf-8');
  console.log(`\nSaved verification evidence JSON to: ${jsonPath}`);

  await browser.close();
}

verifyAll4Rounds().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
