/**
 * DungeonRoom.jsx — Base dungeon game container with requestAnimationFrame loop
 * GDD §4.3 — "DungeonRoomEngine: physics + collision + enemy AI + word crystals"
 *
 * This is the SHARED BASE that all 15 Leo game rooms extend.
 * Each specific game (BubbleStormChase, WordWagonJump, etc.) renders custom
 * room content on top of this base, which handles:
 *   - Leo physics + movement (keyboard + virtual D-Pad)
 *   - Enemy patrol AI + freeze/speedup state
 *   - Word crystal proximity detection → MCQ Blitz popup trigger
 *   - HP/invincibility system
 *   - Timer countdown
 *   - Room completion when all crystals collected
 *   - Parallax layered background per floor theme
 */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import LeoCharacter                   from './LeoCharacter';
import VirtualDPad                    from './VirtualDPad';
import EnemyLayer, { createEnemy, updateEnemyPatrol, freezeAllEnemies, speedupAllEnemies } from './EnemyAI';
import { WordCrystalLayer }           from './WordCrystal';
import MCQBlitzPopup, { generateMCQChoices } from './MCQBlitzPopup';
import HUDOverlay                     from './HUDOverlay';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y, MAX_FALL_SPEED,
  LEO_HITBOX, WORD_COLLECT_RADIUS, INVINCIBILITY_MS,
  ROOM_WIDTH, ROOM_HEIGHT,
  FLOOR_PLATFORMS, DEFAULT_FLOOR_PLATFORM,
  applyGravity, checkPlatformLanding, checkLeoEnemyCollision,
  isNearCrystal, clamp,
} from './LeoPhysics';

import './DungeonRoom.css';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const CRYSTAL_COLORS = ['purple', 'cyan', 'amber', 'green', 'rose'];

/**
 * Build crystal objects from vocab items
 * Places them evenly across the room at varied heights
 */
function buildCrystals(vocabItems = [], platforms = [], count = 6) {
  const items = vocabItems.slice(0, count);
  const roomW = ROOM_WIDTH;

  return items.map((vocab, i) => {
    // Spread crystals evenly horizontally, above platforms where possible
    const section  = roomW / items.length;
    const baseX    = section * i + section / 2;
    // Alternate: ground level or platform height
    const onPlat   = i % 2 === 1 && platforms.length > 1;
    const plat     = onPlat ? platforms[Math.min(i % (platforms.length - 1) + 1, platforms.length - 1)] : null;
    const crystalY = plat ? plat.y - 50 : FLOOR_Y - 90;

    return {
      id:    `crystal_${vocab.word}_${i}`,
      word:  vocab.word,
      def:   vocab.definition || vocab.meaning || '',
      x:     Math.max(40, Math.min(ROOM_WIDTH - 40, baseX)),
      y:     crystalY,
      state: 'idle',      // 'idle' | 'nearby' | 'collected'
      color: CRYSTAL_COLORS[i % CRYSTAL_COLORS.length],
      vocab,
    };
  });
}

// ─── BACKGROUND THEMES ────────────────────────────────────────────────────────

const BG_THEMES = {
  'chamber-of-tales': {
    sky:      'linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
    midLayer: '📜🏺📜',
    floor:    'rgba(99, 65, 20, 0.8)',
    floorBorder: 'rgba(161, 96, 30, 0.9)',
    label:    'Chamber of Tales',
    torches:  true,
  },
  'alchemy-lab': {
    sky:      'linear-gradient(180deg, #052e16 0%, #14532d 50%, #166534 100%)',
    midLayer: '⚗️🧪⚗️',
    floor:    'rgba(5, 46, 22, 0.9)',
    floorBorder: 'rgba(21, 128, 61, 0.9)',
    label:    'Alchemy Lab',
    torches:  false,
  },
  'thunder-arena': {
    sky:      'linear-gradient(180deg, #1c1917 0%, #292524 50%, #44403c 100%)',
    midLayer: '⚡🏟️⚡',
    floor:    'rgba(41, 37, 36, 0.9)',
    floorBorder: 'rgba(120, 113, 108, 0.8)',
    label:    'Thunder Arena',
    torches:  true,
  },
  'rune-sanctum': {
    sky:      'linear-gradient(180deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)',
    midLayer: '⚒️🔮⚒️',
    floor:    'rgba(30, 27, 75, 0.9)',
    floorBorder: 'rgba(99, 102, 241, 0.8)',
    label:    'Rune Sanctum',
    torches:  true,
  },
  'apex-spire': {
    sky:      'linear-gradient(180deg, #0c0a09 0%, #1c1917 50%, #292524 100%)',
    midLayer: '🏰💀🏰',
    floor:    'rgba(12, 10, 9, 0.95)',
    floorBorder: 'rgba(251, 191, 36, 0.7)',
    label:    'Apex Spire',
    torches:  true,
  },
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

/**
 * DungeonRoom — Base game container for all Lexio's Quest rooms
 *
 * @param {{
 *   roomConfig: {
 *     theme: string,           — floor theme key
 *     enemyDefs: Array,        — [{type, x, y}]
 *     wordCount?: number,      — how many crystals to place (default 6)
 *   },
 *   vocabItems: Array,         — [{word, definition}] from weekData
 *   duration: number,          — game timer in seconds
 *   floorNumber?: number,
 *   doorLabel?: string,
 *   onComplete: (stars, score) => void,
 *   children?: React.ReactNode, — game-specific overlays (e.g. bubble animations)
 * }} props
 */
export default function DungeonRoom({
  roomConfig = {},
  vocabItems = [],
  duration = 90,
  floorNumber,
  doorLabel,
  onComplete,
  children,
}) {
  const theme    = roomConfig.theme || 'chamber-of-tales';
  const bg       = BG_THEMES[theme] || BG_THEMES['chamber-of-tales'];
  const platforms = FLOOR_PLATFORMS[theme] || [DEFAULT_FLOOR_PLATFORM];

  // ── Game state (refs for mutable physics state, no React re-render on each frame) ──

  const leoRef = useRef({
    x: 80,
    y: FLOOR_Y - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    onGround: true,
    hearts: 3,
    invincibleUntil: 0,
    animState: 'idle',
    facingRight: true,
    score: 0,
  });

  const enemiesRef  = useRef([]);
  const crystalsRef = useRef([]);
  const inputRef    = useRef({ left: false, right: false, jump: false, jumpConsumed: false });
  const animFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // ── React render state (only updated when visuals must change) ───────────────

  const [renderTick, setRenderTick] = useState(0);  // trigger re-render
  const [hearts, setHearts]         = useState(3);
  const [score, setScore]           = useState(0);
  const [timeLeft, setTimeLeft]     = useState(duration);
  const [gamePhase, setGamePhase]   = useState('playing'); // 'playing' | 'mcq' | 'cleared' | 'ko'

  // MCQ state
  const [mcqData, setMcqData] = useState(null);   // { crystalId, word, question, choices, isRetry }

  // Leo render state (synced from ref each tick)
  const [leoDisplay, setLeoDisplay] = useState({
    x: 80, y: FLOOR_Y - LEO_HITBOX.height, animState: 'idle', facingRight: true, invincible: false,
  });
  const [enemiesDisplay, setEnemiesDisplay]   = useState([]);
  const [crystalsDisplay, setCrystalsDisplay] = useState([]);
  const [wordsCollected, setWordsCollected]   = useState(0);

  // ── Initialize room ──────────────────────────────────────────────────────────

  useEffect(() => {
    // Build enemies
    const rawEnemies = roomConfig.enemyDefs || [];
    enemiesRef.current = rawEnemies.length > 0
      ? rawEnemies.map(def => createEnemy(def))
      : [
          createEnemy({ type: 'zombie', x: 350, y: FLOOR_Y - 60 }),
          createEnemy({ type: 'worm',   x: 650, y: FLOOR_Y - 44 }),
        ];

    // Build crystals
    const wordCount = roomConfig.wordCount || Math.min(6, vocabItems.length) || 4;
    crystalsRef.current = buildCrystals(vocabItems, platforms, wordCount);

    // Sync to display
    setEnemiesDisplay([...enemiesRef.current]);
    setCrystalsDisplay([...crystalsRef.current]);
    setWordsCollected(0);

    // Reset Leo
    leoRef.current = {
      x: 80, y: FLOOR_Y - LEO_HITBOX.height,
      vx: 0, vy: 0, onGround: true,
      hearts: 3, invincibleUntil: 0,
      animState: 'idle', facingRight: true, score: 0,
    };
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setGamePhase('playing');
  }, [roomConfig, vocabItems, duration]);

  // ── Keyboard input ───────────────────────────────────────────────────────────

  useEffect(() => {
    const onKeyDown = (e) => {
      if (gamePhase === 'mcq') return; // block movement during MCQ
      switch (e.code) {
        case 'ArrowLeft':  case 'KeyA': inputRef.current.left  = true;  break;
        case 'ArrowRight': case 'KeyD': inputRef.current.right = true;  break;
        case 'ArrowUp': case 'KeyW': case 'Space':
          if (!inputRef.current.jumpConsumed) {
            inputRef.current.jump = true;
            inputRef.current.jumpConsumed = true;
          }
          e.preventDefault();
          break;
        default: break;
      }
    };
    const onKeyUp = (e) => {
      switch (e.code) {
        case 'ArrowLeft':  case 'KeyA': inputRef.current.left  = false; break;
        case 'ArrowRight': case 'KeyD': inputRef.current.right = false; break;
        case 'ArrowUp': case 'KeyW': case 'Space':
          inputRef.current.jump = false;
          inputRef.current.jumpConsumed = false;
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
    };
  }, [gamePhase]);

  // ── Virtual D-Pad handlers ───────────────────────────────────────────────────

  const dpadHandlers = useMemo(() => ({
    onLeft:         () => { inputRef.current.left  = true; },
    onLeftRelease:  () => { inputRef.current.left  = false; },
    onRight:        () => { inputRef.current.right = true; },
    onRightRelease: () => { inputRef.current.right = false; },
    onUp:           () => { inputRef.current.jump  = true; },
    onUpRelease:    () => { inputRef.current.jump  = false; inputRef.current.jumpConsumed = false; },
    onJump:         () => { if (!inputRef.current.jumpConsumed) { inputRef.current.jump = true; inputRef.current.jumpConsumed = true; } },
    onJumpRelease:  () => { inputRef.current.jump = false; inputRef.current.jumpConsumed = false; },
  }), []);

  // ── Timer countdown ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (gamePhase !== 'playing') return;
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerIntervalRef.current);
          handleGameOver('timeout');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerIntervalRef.current);
  }, [gamePhase]);

  // ── Game loop ────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (gamePhase !== 'playing') {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const loop = () => {
      const leo      = leoRef.current;
      const input    = inputRef.current;
      const enemies  = enemiesRef.current;
      const crystals = crystalsRef.current;
      const now      = Date.now();

      // ── 1. Leo horizontal movement ─────────────────────────────────
      if (input.left  && !input.right) { leo.vx = -LEO_SPEED; leo.facingRight = false; }
      else if (input.right && !input.left) { leo.vx =  LEO_SPEED; leo.facingRight = true;  }
      else                                  { leo.vx = 0; }

      // ── 2. Jump ────────────────────────────────────────────────────
      if (input.jump && leo.onGround) {
        leo.vy = LEO_JUMP_FORCE;
        leo.onGround = false;
        input.jump = false;
        input.jumpConsumed = true;
      }

      // ── 3. Gravity ─────────────────────────────────────────────────
      applyGravity(leo);

      // ── 4. Move Leo ────────────────────────────────────────────────
      leo.x = clamp(leo.x + leo.vx, 0, ROOM_WIDTH - LEO_HITBOX.width);
      leo.y += leo.vy;

      // ── 5. Platform collision ──────────────────────────────────────
      const landed = checkPlatformLanding(leo, platforms);
      leo.onGround = landed || leo.y >= FLOOR_Y - LEO_HITBOX.height;
      if (leo.y >= FLOOR_Y - LEO_HITBOX.height) {
        leo.y  = FLOOR_Y - LEO_HITBOX.height;
        leo.vy = 0;
        leo.onGround = true;
      }

      // ── 6. Determine Leo animation state ──────────────────────────
      const invincible = now < leo.invincibleUntil;
      if (!leo.onGround && leo.vy < 0) leo.animState = 'jump';
      else if (!leo.onGround && leo.vy > 0) leo.animState = 'fall';
      else if (input.left  || input.right)  leo.animState = leo.facingRight ? 'run_r' : 'run_l';
      else                                  leo.animState = 'idle';

      // ── 7. Enemy collision ─────────────────────────────────────────
      if (!invincible) {
        for (const enemy of enemies) {
          if (checkLeoEnemyCollision(leo, enemy)) {
            leo.hearts = Math.max(0, leo.hearts - 1);
            leo.invincibleUntil = now + INVINCIBILITY_MS;
            leo.animState = 'hit';
            if (leo.hearts <= 0) {
              handleKO();
              return;
            }
            setHearts(leo.hearts);
            break; // only 1 hit per frame
          }
        }
      }

      // ── 8. Word crystal proximity & collection ─────────────────────
      let crystalUpdated = false;
      for (const crystal of crystals) {
        if (crystal.state === 'collected') continue;

        const near = isNearCrystal({ x: leo.x, y: leo.y }, { x: crystal.x, y: crystal.y });
        if (near && crystal.state !== 'nearby') {
          crystal.state = 'nearby';
          crystalUpdated = true;
        } else if (!near && crystal.state === 'nearby') {
          crystal.state = 'idle';
          crystalUpdated = true;
        }

        // Trigger collection when Leo JUMPS into crystal (vy < 0 = rising, or close)
        if (near && leo.vy < 2 && !leo.onGround) {
          collectCrystal(crystal);
          crystalUpdated = true;
          break; // one at a time
        }
      }

      // ── 9. Enemy patrol update ─────────────────────────────────────
      for (const enemy of enemies) {
        updateEnemyPatrol(enemy, FLOOR_Y, ROOM_WIDTH);
      }

      // ── 10. Sync render state (throttled) ─────────────────────────
      setLeoDisplay({
        x: leo.x, y: leo.y,
        animState: leo.animState,
        facingRight: leo.facingRight,
        invincible: now < leo.invincibleUntil,
      });
      setEnemiesDisplay([...enemies]);
      if (crystalUpdated) setCrystalsDisplay([...crystals]);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gamePhase, platforms]);

  // ── Collect crystal → trigger MCQ ───────────────────────────────────────────

  const collectCrystal = useCallback((crystal) => {
    // Already collected or already showing MCQ
    if (crystal.state === 'collected') return;
    crystal.state = 'collected'; // optimistic mark

    leoRef.current.animState = 'collect';

    // Build MCQ choices from vocab pool
    const choices = generateMCQChoices(
      { word: crystal.word, definition: crystal.def },
      vocabItems
    );

    setMcqData({
      crystalId: crystal.id,
      word:      crystal.word,
      question:  `What does "${crystal.word}" mean?`,
      choices,
      isRetry:   false,
    });
    setGamePhase('mcq');
  }, [vocabItems]);

  // ── MCQ outcome handlers ─────────────────────────────────────────────────────

  const handleMCQCorrect = useCallback(() => {
    // Award XP
    const xpGain = mcqData?.isRetry ? 5 : 10;
    leoRef.current.score += xpGain;
    setScore(s => s + xpGain);

    // Freeze enemies
    freezeAllEnemies(enemiesRef.current);
    setEnemiesDisplay([...enemiesRef.current]);

    // Count collected
    const collected = crystalsRef.current.filter(c => c.state === 'collected').length;
    setWordsCollected(collected);

    // Check room complete
    const total = crystalsRef.current.length;
    if (collected >= total) {
      setTimeout(() => handleRoomClear(), 600);
    } else {
      setGamePhase('playing');
    }
    setMcqData(null);
  }, [mcqData]);

  const handleMCQWrong = useCallback(() => {
    // Crystal remains — reset from 'collected' back to 'idle' for retry
    const crystal = crystalsRef.current.find(c => c.id === mcqData?.crystalId);
    if (crystal) crystal.state = 'idle';

    // Speed up enemies
    speedupAllEnemies(enemiesRef.current);
    setEnemiesDisplay([...enemiesRef.current]);
    setCrystalsDisplay([...crystalsRef.current]);

    setGamePhase('playing');
    setMcqData(null);
  }, [mcqData]);

  // ── Room completion ──────────────────────────────────────────────────────────

  const handleRoomClear = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    clearInterval(timerIntervalRef.current);

    const finalScore = leoRef.current.score;
    const timeBonus  = Math.max(0, Math.floor(timeLeft * 0.5));
    const total      = finalScore + timeBonus;

    const stars = total >= 80 ? 3 : total >= 50 ? 2 : 1;
    setGamePhase('cleared');
    onComplete?.(stars, { score: total, timeBonus });
  }, [timeLeft, onComplete]);

  const handleGameOver = useCallback((reason) => {
    cancelAnimationFrame(animFrameRef.current);
    clearInterval(timerIntervalRef.current);
    const finalScore = leoRef.current.score;
    const stars = finalScore >= 50 ? 1 : 0;
    setGamePhase('cleared');
    onComplete?.(stars, { score: finalScore, reason });
  }, [onComplete]);

  const handleKO = useCallback(() => {
    leoRef.current.hearts = 0;
    setHearts(0);
    setGamePhase('ko');
    cancelAnimationFrame(animFrameRef.current);
    // Auto-respawn after 1.5s with half score penalty
    setTimeout(() => {
      leoRef.current.hearts = 3;
      leoRef.current.score  = Math.floor(leoRef.current.score * 0.5);
      leoRef.current.x = 80;
      leoRef.current.y = FLOOR_Y - LEO_HITBOX.height;
      setHearts(3);
      setScore(leoRef.current.score);
      setGamePhase('playing');
    }, 1500);
  }, []);

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  const totalCrystals   = crystalsRef.current.length;

  return (
    <div
      className="dungeon-room"
      style={{ background: bg.sky }}
      aria-label={`Dungeon room: ${bg.label}`}
    >
      {/* ── Parallax Background Layers ────────────────────────────────── */}
      <div className="dungeon-bg-far"   aria-hidden="true" />
      <div className="dungeon-bg-mid"   aria-hidden="true">
        <span className="dungeon-bg-deco">{bg.midLayer}</span>
      </div>

      {/* ── Platforms ────────────────────────────────────────────────── */}
      {platforms.slice(1).map((plat, i) => (
        <div
          key={i}
          className="dungeon-platform"
          style={{ left: plat.x, top: plat.y, width: plat.width, height: plat.height }}
          aria-hidden="true"
        />
      ))}

      {/* ── Floor ────────────────────────────────────────────────────── */}
      <div
        className="dungeon-floor"
        style={{
          top:          FLOOR_Y,
          background:   bg.floor,
          borderTop:    `3px solid ${bg.floorBorder}`,
        }}
        aria-hidden="true"
      />

      {/* ── Torches ──────────────────────────────────────────────────── */}
      {bg.torches && (
        <>
          <span className="dungeon-torch dungeon-torch-left"  aria-hidden="true">🔦</span>
          <span className="dungeon-torch dungeon-torch-right" aria-hidden="true">🔦</span>
        </>
      )}

      {/* ── Word Crystals ─────────────────────────────────────────────── */}
      <WordCrystalLayer
        crystals={crystalsDisplay}
        onCollect={(id) => {
          const crystal = crystalsRef.current.find(c => c.id === id);
          if (crystal && gamePhase === 'playing') collectCrystal(crystal);
        }}
      />

      {/* ── Enemies ───────────────────────────────────────────────────── */}
      <EnemyLayer enemies={enemiesDisplay} />

      {/* ── Leo ───────────────────────────────────────────────────────── */}
      <LeoCharacter
        x={leoDisplay.x}
        y={leoDisplay.y}
        state={leoDisplay.animState}
        facingRight={leoDisplay.facingRight}
        invincible={leoDisplay.invincible}
      />

      {/* ── Game-Specific Children (e.g. BubbleStormChase bubbles) ───── */}
      {children}

      {/* ── HUD ───────────────────────────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={wordsCollected}
        totalWords={totalCrystals}
        floorNumber={floorNumber}
        doorLabel={doorLabel}
      />

      {/* ── MCQ Blitz Popup ───────────────────────────────────────────── */}
      {gamePhase === 'mcq' && mcqData && (
        <MCQBlitzPopup
          word={mcqData.word}
          question={mcqData.question}
          choices={mcqData.choices}
          isRetry={mcqData.isRetry}
          onCorrect={handleMCQCorrect}
          onWrong={handleMCQWrong}
          onClose={() => {}}
        />
      )}

      {/* ── KO Screen ─────────────────────────────────────────────────── */}
      {gamePhase === 'ko' && (
        <div className="dungeon-ko-screen" aria-live="assertive">
          <span className="dungeon-ko-emoji">😵</span>
          <p className="dungeon-ko-text">Leo was knocked out!</p>
          <p className="dungeon-ko-sub">Respawning in a moment...</p>
        </div>
      )}

      {/* ── Mobile Virtual D-Pad ──────────────────────────────────────── */}
      <VirtualDPad {...dpadHandlers} visible={gamePhase === 'playing'} />
    </div>
  );
}
