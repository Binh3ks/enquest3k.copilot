import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = '/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots';
const BRAIN_DIR = '/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(BRAIN_DIR)) fs.mkdirSync(BRAIN_DIR, { recursive: true });

const AUDIT_GAMES = [
  // Floor 1
  { code: 'F1D1', name: 'Bubble Storm Chase', room: 0, doorIdx: 0, prefix: 'f1d1_bubble_chase', actionKey: 'ArrowRight', file: 'src/modules/quest/BubbleStormChase.jsx' },
  { code: 'F1D2', name: 'Word Wagon Jump', room: 0, doorIdx: 1, prefix: 'f1d2_wagon_jump', actionKey: 'ArrowRight', file: 'src/modules/quest/WordWagonJump.jsx' },
  { code: 'F1D3', name: 'Shadow Vault Infiltrate', room: 0, doorIdx: 2, prefix: 'f1d3_shadow_vault', actionKey: 'ArrowRight', file: 'src/modules/quest/ShadowVaultInfiltrate.jsx' },

  // Floor 2
  { code: 'F2D1', name: 'Potion Flip Dungeon', room: 1, doorIdx: 0, prefix: 'f2d1_potion_flip', actionKey: 'ArrowRight', file: 'src/modules/quest/PotionFlipDungeon.jsx' },
  { code: 'F2D2', name: 'Anvil Rush Grammar', room: 1, doorIdx: 1, prefix: 'f2d2_anvil_rush', actionKey: 'ArrowRight', file: 'src/modules/quest/AnvilRushGrammar.jsx' },
  { code: 'F2D3', name: 'Scroll Chamber Decode', room: 1, doorIdx: 2, prefix: 'f2d3_scroll_chamber', actionKey: 'ArrowRight', file: 'src/modules/quest/ScrollChamberDecode.jsx' },

  // Floor 3
  { code: 'F3D1', name: 'Echo Arena Shooter', room: 2, doorIdx: 0, prefix: 'f3d1_echo_arena', actionKey: 'ArrowRight', file: 'src/modules/quest/EchoArenaShooter.jsx' },
  { code: 'F3D2', name: 'Chunk Catapult Match', room: 2, doorIdx: 1, prefix: 'f3d2_chunk_catapult', actionKey: 'ArrowRight', file: 'src/modules/chronicles/games/ChunkCatapultCanvas.jsx' },
  { code: 'F3D3', name: 'Storm Shield Defense', room: 2, doorIdx: 2, prefix: 'f3d3_storm_shield', actionKey: 'ArrowRight', file: 'src/modules/quest/StormShieldDefense.jsx' },

  // Floor 4
  { code: 'F4D1', name: 'Highway Word Runner', room: 3, doorIdx: 0, prefix: 'f4d1_highway_runner', actionKey: 'ArrowRight', file: 'src/modules/quest/HighwaySprintCanvas.jsx' },
  { code: 'F4D2', name: 'Syntax Express Rail', room: 3, doorIdx: 1, prefix: 'f4d2_syntax_express', actionKey: 'ArrowRight', file: 'src/modules/quest/SyntaxExpressRail.jsx' },
  { code: 'F4D3', name: 'Riddle Run Maze', room: 3, doorIdx: 2, prefix: 'f4d3_riddle_run', actionKey: 'ArrowRight', file: 'src/modules/quest/RiddleRunMaze.jsx' },

  // Floor 5
  { code: 'F5D1', name: 'Grand Master Matrix', room: 4, doorIdx: 0, prefix: 'f5d1_grand_matrix', actionKey: 'ArrowRight', file: 'src/modules/quest/GrandMatrixDungeon.jsx' },
  { code: 'F5D2', name: 'Titan Grammar Forge', room: 4, doorIdx: 1, prefix: 'f5d2_titan_forge', actionKey: 'ArrowRight', file: 'src/modules/quest/TitanGrammarForge.jsx' },
  { code: 'F5D3', name: 'Cambridge Cloze Gauntlet', room: 4, doorIdx: 2, prefix: 'f5d3_cambridge_cloze', actionKey: 'ArrowRight', file: 'src/modules/quest/CambridgeClozeGauntlet.jsx' },

  // Floor 6
  { code: 'F6D1', name: 'Synonym Storm', room: 5, doorIdx: 0, prefix: 'f6d1_synonym_storm', actionKey: 'ArrowRight', file: 'src/modules/quest/SynonymStormDefense.jsx' },
  { code: 'F6D2', name: 'Connector Relay', room: 5, doorIdx: 1, prefix: 'f6d2_connector_relay', actionKey: 'ArrowRight', file: 'src/modules/quest/ConnectorRelayCanvas.jsx' },
  { code: 'F6D3', name: 'Story Sequencer', room: 5, doorIdx: 2, prefix: 'f6d3_story_sequencer', actionKey: 'ArrowRight', file: 'src/modules/quest/StoryAltarPuzzle.jsx' },

  // Floor 7
  { code: 'F7D1', name: 'Word Forge Scramble', room: 6, doorIdx: 0, prefix: 'f7d1_word_forge', actionKey: 'ArrowRight', file: 'src/modules/quest/WordForgeCarryEngine.jsx' },
  { code: 'F7D2', name: 'Question Quest Runner', room: 6, doorIdx: 1, prefix: 'f7d2_question_quest', actionKey: 'ArrowDown', file: 'src/modules/chronicles/games/QuestionQuestRunner.jsx' },
  { code: 'F7D3', name: 'Word Class Balance', room: 6, doorIdx: 2, prefix: 'f7d3_word_class_balance', actionKey: 'ArrowRight', file: 'src/modules/chronicles/games/WordClassBalanceGame.jsx' }
];

async function runAudit() {
  console.log('=== STARTING 21-GAME COMPREHENSIVE SCHEMA AUDIT ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream']
  });

  const results = [];

  for (const game of AUDIT_GAMES) {
    console.log(`\n----------------------------------------`);
    console.log(`AUDITING ${game.code}: ${game.name} (Room ${game.room}, Door ${game.doorIdx})`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
      const roomUrl = `${BASE_URL}/week/33/chronicles?room=${game.room}&bypass=true`;
      await page.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1000));

      const doorBtns = await page.$$('.dr-door-enter-btn');
      if (doorBtns.length <= game.doorIdx) {
        throw new Error(`Door ${game.doorIdx} not found. Found ${doorBtns.length} buttons.`);
      }
      await doorBtns[game.doorIdx].click();
      await new Promise(r => setTimeout(r, 1500));

      // Inspect DOM before action
      const hudData = await page.evaluate(() => {
        const bodyText = document.body.innerText || '';
        
        // Check Floor / Door indicator
        const floorMatch = document.querySelector('.hud-floor-badge, .hud-room-info, .dr-header, [class*="floor"]') || null;
        const hasFloorDoorText = /Floor\s*\d|Door\s*\d|Chamber/i.test(bodyText) || Boolean(floorMatch);
        const floorDoorSnippet = floorMatch ? (floorMatch.innerText || floorMatch.textContent || '').trim() : (bodyText.match(/Floor\s*\d[^\n]*/i)?.[0] || '');

        // Check Hearts
        const heartsEl = document.querySelector('.hud-hearts, .hearts, [class*="heart"], .wb-hearts, .qq-hearts');
        const heartTextCount = (bodyText.match(/[❤️🖤]/g) || []).length;
        const heartElCount = document.querySelectorAll('.hud-heart, [class*="heart"]').length;
        const hasHearts = heartTextCount > 0 || heartElCount > 0 || Boolean(heartsEl);

        // Check Round
        const roundEl = document.querySelector('.hud-round, [class*="round"], .wb-round-badge, .qq-round-badge');
        const roundTextMatch = bodyText.match(/Round\s*(\d+)\s*\/\s*(\d+)|(\d+)\s*\/\s*(\d+)\s*Rounds?|R(\d+)\/(\d+)/i);
        const hasRound = Boolean(roundTextMatch) || Boolean(roundEl);
        const roundSnippet = roundTextMatch ? roundTextMatch[0] : (roundEl ? (roundEl.innerText || roundEl.textContent || '').trim() : '');

        // Check XP / Score
        const xpEl = document.querySelector('.hud-score, [class*="score"], [class*="xp"], .hud-xp');
        const xpMatch = bodyText.match(/\d+\s*XP|\+\d+\s*XP|Score:\s*\d+/i);
        const hasXP = Boolean(xpMatch) || Boolean(xpEl);
        const xpSnippet = xpMatch ? xpMatch[0] : (xpEl ? (xpEl.innerText || xpEl.textContent || '').trim() : '');

        // Check On-screen Controls / Affordances
        const dpad = document.querySelector('.virtual-dpad, .dpad, .touch-controls, [class*="control"], .wb-touch-controls, .qq-runner-controls');
        const keyHints = bodyText.match(/\[[◄►▲▼WASDSPACE]+\]|Arrow|Jump|Strike|Steer/i);
        const hasVisibleControls = Boolean(dpad) || Boolean(keyHints);

        // Check Prompts / Words / Sentences for Pacing calculation
        const promptEls = document.querySelectorAll('h1, h2, h3, .banner, .spellbook, .prompt, .word, .statement, [class*="question"], [class*="banner"]');
        let promptSnippet = '';
        promptEls.forEach(el => {
          const t = (el.innerText || el.textContent || '').trim();
          if (t.length > 5 && t.length < 200 && !promptSnippet.includes(t)) {
            promptSnippet += (promptSnippet ? ' | ' : '') + t;
          }
        });

        // Check Timer
        const timerEl = document.querySelector('.hud-timer, [class*="timer"], .countdown');
        const timerMatch = bodyText.match(/\d{1,2}:\d{2}|\b\d{2,3}s\b/);
        const timerVal = timerMatch ? timerMatch[0] : (timerEl ? (timerEl.innerText || timerEl.textContent || '').trim() : '');

        return {
          hasFloorDoorText,
          floorDoorSnippet,
          hasHearts,
          heartTextCount,
          hasRound,
          roundSnippet,
          hasXP,
          xpSnippet,
          hasVisibleControls,
          promptSnippet,
          timerVal,
          bodySnippet: bodyText.slice(0, 300).replace(/\n+/g, ' ')
        };
      });

      const initialPic = `${game.prefix}_initial.png`;
      const initialPicPath = path.join(OUTPUT_DIR, initialPic);
      await page.screenshot({ path: initialPicPath });
      fs.copyFileSync(initialPicPath, path.join(BRAIN_DIR, initialPic));

      // Dispatch action key for 500ms
      console.log(`Dispatching key ${game.actionKey}...`);
      await page.keyboard.down(game.actionKey);
      await new Promise(r => setTimeout(r, 400));
      await page.keyboard.up(game.actionKey);
      await new Promise(r => setTimeout(r, 300));

      const actionPic = `${game.prefix}_action.png`;
      const actionPicPath = path.join(OUTPUT_DIR, actionPic);
      await page.screenshot({ path: actionPicPath });
      fs.copyFileSync(actionPicPath, path.join(BRAIN_DIR, actionPic));

      results.push({
        code: game.code,
        name: game.name,
        room: game.room,
        doorIdx: game.doorIdx,
        file: game.file,
        hudData,
        initialPic,
        actionPic,
        success: true
      });
      console.log(`✅ Audited ${game.code} successfully.`);
    } catch (err) {
      console.error(`❌ Error auditing ${game.code}:`, err.message);
      results.push({
        code: game.code,
        name: game.name,
        room: game.room,
        doorIdx: game.doorIdx,
        file: game.file,
        error: err.message,
        success: false
      });
    } finally {
      await page.close();
    }
  }

  const jsonOut = path.join(OUTPUT_DIR, 'audit_all_21_games_results.json');
  fs.writeFileSync(jsonOut, JSON.stringify(results, null, 2));
  console.log(`\nAll 21 games audited. Results saved to ${jsonOut}`);

  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
