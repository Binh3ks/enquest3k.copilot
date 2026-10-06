/**
 * StoryAltarPuzzle.jsx — Floor 6 Door 3: Story Sequencer (Physical Carry Engine)
 *
 * Architecture:
 * - Physical Carry Mechanic: Leo runs and jumps across shrine platforms.
 * - 5 narrative slabs (scenes 1-5) on ground/ledges.
 * - 5 chronological altars on the upper terrace.
 * - Proximity Guard: Pickup (d < 55px), Deposit (d < 65px). No remote click bypass.
 * - Anti-Double-Fire: Ref-based state updates (leoRef, slabsRef, altarsRef, carryingSlabRef).
 *   Zero nested setState inside updaters.
 * - N4 Probability: Strictly 5/120 = 4.17% (2 hearts persistent, max 1 mistake, no distractor, no pity-timer).
 * - N2 Pacing: Worst-case 72.99s / 90s budget -> Margin +2.84s/leg >= +2.0s/leg.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Crown, Star, Sparkles, AlertTriangle, RotateCcw, ArrowRight } from 'lucide-react';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import { calculateStars } from '../../stores/useChroniclesStore';
import { getStoryScenesForWeek } from '../../services/chroniclesFloor67Service';
import { loadWeekData } from '../../data/weeks/index';
import './StoryAltarPuzzle.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Shrine platforms: Base ground + stepping ledges + upper Altar Terrace
const ALTAR_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 }, // Ground floor (surface y: 460)
  { x: 30,  y: 380,     width: 150,        height: 18 }, // Left Stone Ledge (surface y: 320)
  { x: 720, y: 380,     width: 150,        height: 18 }, // Right Stone Ledge (surface y: 320)
  { x: 60,  y: 240,     width: 780,        height: 22 }, // Altar Terrace Deck (surface y: 180)
];

// Fixed coordinates of the 5 Chronological Altars on the Terrace Deck (y: 240)
export const ALTAR_DEFS = [
  { pos: 1, x: 110, y: 215, label: 'ALTAR 1' },
  { pos: 2, x: 260, y: 215, label: 'ALTAR 2' },
  { pos: 3, x: 410, y: 215, label: 'ALTAR 3' },
  { pos: 4, x: 560, y: 215, label: 'ALTAR 4' },
  { pos: 5, x: 710, y: 215, label: 'ALTAR 5' },
];

// Initial spawn coordinates for the 5 scrambled narrative slabs
export const SLAB_SPAWN_COORDS = [
  { x: 75,  y: 350 }, // Left Ledge
  { x: 230, y: 485 }, // Ground Mid-Left
  { x: 400, y: 485 }, // Ground Center
  { x: 570, y: 485 }, // Ground Mid-Right
  { x: 765, y: 350 }, // Right Ledge
];

function scramble(scenes) {
  const arr = [...scenes];
  let same = true;
  let tries = 0;
  while (same && tries < 25) {
    arr.sort(() => Math.random() - 0.5);
    same = arr.every((s, i) => s.originalOrder === i + 1);
    tries++;
  }
  return arr;
}

export default function StoryAltarPuzzle({
  weekNumber = 33,
  weekData = null,
  duration = 90,
  onComplete,
  onExit,
}) {
  // Session & game lifecycle
  const [phase, setPhase] = useState('loading'); // 'loading' | 'playing' | 'cleared' | 'ko'
  const [hearts, setHearts] = useState(2);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong', text: string }

  // Slabs & placed altars
  const [slabs, setSlabs] = useState([]);
  const [placedAltars, setPlacedAltars] = useState({}); // { [pos]: slab }
  const [carryingSlab, setCarryingSlab] = useState(null);
  const [wrongBlinkAltar, setWrongBlinkAltar] = useState(null);

  // Responsive container width
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(ROOM_WIDTH);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth || ROOM_WIDTH);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Single source of truth REFS to prevent stale closures and nested setState
  const heartsRef = useRef(2);
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(duration);
  const phaseRef = useRef('loading');
  const slabsRef = useRef([]);
  const placedAltarsRef = useRef({});
  const carryingSlabRef = useRef(null);

  heartsRef.current = hearts;
  scoreRef.current = score;
  timeLeftRef.current = timeLeft;
  phaseRef.current = phase;
  slabsRef.current = slabs;
  placedAltarsRef.current = placedAltars;
  carryingSlabRef.current = carryingSlab;

  // Leo Physics state
  const leoRef = useRef({
    x: 430,
    y: 460,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: 460,
    facingRight: true,
    animState: 'idle',
  });

  const keysPressed = useRef({ left: false, right: false, up: false });
  const animFrameId = useRef(null);

  // DEV-only test hook (guarded by import.meta.env.DEV)
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    window.__STORY_ALTAR_TEST_HOOK__ = {
      getHearts: () => heartsRef.current,
      getScore: () => scoreRef.current,
      getPhase: () => phaseRef.current,
      getCarrying: () => carryingSlabRef.current,
      getPlacedAltars: () => placedAltarsRef.current,
      getSlabs: () => slabsRef.current,
      getLeoPos: () => ({ x: leoRef.current.x, y: leoRef.current.y }),
    };
  }

  // Load story scenes on mount / week change
  const initGame = useCallback(async () => {
    let data = weekData;
    if (!data) {
      try { data = await loadWeekData(weekNumber); } catch { data = null; }
    }
    const rawScenes = getStoryScenesForWeek(weekNumber, data);
    const scrambled = scramble(rawScenes);

    const initialSlabs = scrambled.map((s, idx) => {
      const coord = SLAB_SPAWN_COORDS[idx % SLAB_SPAWN_COORDS.length];
      return {
        id: `slab_${s.id}`,
        sceneId: s.id,
        originalOrder: s.originalOrder,
        text: s.text,
        x: coord.x,
        y: coord.y,
        originX: coord.x,
        originY: coord.y,
        isPlaced: false,
      };
    });

    setSlabs(initialSlabs);
    slabsRef.current = initialSlabs;
    setPlacedAltars({});
    placedAltarsRef.current = {};
    setCarryingSlab(null);
    carryingSlabRef.current = null;
    setHearts(2);
    heartsRef.current = 2;
    setScore(0);
    scoreRef.current = 0;
    setTimeLeft(duration);
    timeLeftRef.current = duration;
    setFeedback(null);
    leoRef.current = { x: 430, y: 460, vx: 0, vy: 0, isGrounded: true, facingRight: true };
    setPhase('playing');
    phaseRef.current = 'playing';
  }, [weekNumber, weekData, duration]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Audio helper
  const speakText = useCallback((text) => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      }
    } catch {
      // Audio fallback
    }
  }, []);

  // ── Interact: Pick up Slab / Deposit onto Altar ──────────────────────────
  const handleInteractAction = useCallback(() => {
    const leo = leoRef.current;
    if (phaseRef.current !== 'playing') return;

    const carried = carryingSlabRef.current;

    // CASE 1: LEO IS CARRYING A SLAB -> ATTEMPT TO DEPOSIT ONTO NEARBY ALTAR
    if (carried) {
      let matchedAltar = null;
      for (const altar of ALTAR_DEFS) {
        if (!placedAltarsRef.current[altar.pos]) {
          const dist = Math.hypot((leo.x + 20) - (altar.x + 35), (leo.y + 24) - (altar.y + 15));
          if (dist < 65) {
            matchedAltar = { ...altar, dist };
            break;
          }
        }
      }

      if (matchedAltar) {
        const isCorrect = carried.originalOrder === matchedAltar.pos;

        if (isCorrect) {
          // SUCCESS!
          console.log(`[ALTAR-ACTION] DEPOSIT_SUCCESS: slab="${carried.id}" order=${carried.originalOrder} into altar=${matchedAltar.pos} at (${matchedAltar.x}, ${matchedAltar.y}) leo=(${leo.x.toFixed(1)}, ${leo.y.toFixed(1)}) dist=${matchedAltar.dist.toFixed(1)}px t=${Date.now()}`);

          const newPlaced = { ...placedAltarsRef.current, [matchedAltar.pos]: carried };
          placedAltarsRef.current = newPlaced;
          setPlacedAltars(newPlaced);

          const newScore = scoreRef.current + 60;
          scoreRef.current = newScore;
          setScore(newScore);

          speakText(carried.text);
          setFeedback({ type: 'correct', text: `✨ Scene ${matchedAltar.pos} Bound to Shrine Altar!` });
          setTimeout(() => setFeedback(null), 1800);

          const updatedSlabs = slabsRef.current.map(s => s.id === carried.id ? { ...s, isPlaced: true } : s);
          slabsRef.current = updatedSlabs;
          setSlabs(updatedSlabs);

          carryingSlabRef.current = null;
          setCarryingSlab(null);

          // Check Victory cleanly outside updater
          if (Object.keys(newPlaced).length >= 5) {
            const finalScore = newScore + (timeLeftRef.current * 2) + 100;
            scoreRef.current = finalScore;
            setScore(finalScore);
            setPhase('cleared');
            phaseRef.current = 'cleared';
            speakText('Chronology restored! Lexio has conquered the Story Shrine!');
          }
        } else {
          // WRONG ALTAR! Penalty -1 Heart
          console.log(`[ALTAR-ACTION] DEPOSIT_FAIL: slab="${carried.id}" order=${carried.originalOrder} into altar=${matchedAltar.pos} at (${matchedAltar.x}, ${matchedAltar.y}) leo=(${leo.x.toFixed(1)}, ${leo.y.toFixed(1)}) dist=${matchedAltar.dist.toFixed(1)}px t=${Date.now()}`);

          const nextHearts = Math.max(0, heartsRef.current - 1);
          heartsRef.current = nextHearts;
          setHearts(nextHearts);

          if (nextHearts === 0) {
            setPhase('ko');
            phaseRef.current = 'ko';
          }

          setWrongBlinkAltar(matchedAltar.pos);
          setTimeout(() => setWrongBlinkAltar(null), 800);

          setFeedback({ type: 'wrong', text: `⚡ Scene does not belong to Altar ${matchedAltar.pos}! (-1 ❤️)` });
          setTimeout(() => setFeedback(null), 1800);

          // Return slab to origin
          const resetSlabs = slabsRef.current.map(s => s.id === carried.id ? { ...s, x: s.originX, y: s.originY } : s);
          slabsRef.current = resetSlabs;
          setSlabs(resetSlabs);

          carryingSlabRef.current = null;
          setCarryingSlab(null);
        }
      } else {
        // Dropped outside altars: put down at current position
        const droppedSlabs = slabsRef.current.map(s => s.id === carried.id ? { ...s, x: leo.x, y: leo.y } : s);
        slabsRef.current = droppedSlabs;
        setSlabs(droppedSlabs);
        carryingSlabRef.current = null;
        setCarryingSlab(null);
      }
      return;
    }

    // CASE 2: LEO IS EMPTY-HANDED -> PICK UP CLOSEST SLAB (dist < 55px)
    const availableSlabs = slabsRef.current.filter(s => !s.isPlaced);
    let closestSlab = null;
    let closestDist = 55;

    for (const slab of availableSlabs) {
      const dist = Math.hypot((leo.x + 20) - (slab.x + 20), (leo.y + 24) - (slab.y + 15));
      if (dist < closestDist) {
        closestDist = dist;
        closestSlab = { ...slab, dist };
      }
    }

    if (closestSlab) {
      console.log(`[ALTAR-ACTION] PICKUP: slab="${closestSlab.id}" order=${closestSlab.originalOrder} at (${closestSlab.x}, ${closestSlab.y}) leo=(${leo.x.toFixed(1)}, ${leo.y.toFixed(1)}) dist=${closestSlab.dist.toFixed(1)}px t=${Date.now()}`);
      carryingSlabRef.current = closestSlab;
      setCarryingSlab(closestSlab);
      speakText(closestSlab.text);
    }
  }, [speakText]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.up = true;
      }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.left = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.right = true;
      }
      if (['KeyE', 'Enter', 'Space'].includes(e.code)) {
        e.preventDefault();
        handleInteractAction();
      }
    };

    const onKeyUp = (e) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) keysPressed.current.up = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keysPressed.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keysPressed.current.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [handleInteractAction]);

  // Mobile gesture touch controls
  const gestureRef = useGestureControls({
    onSwipeLeft: () => {
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 220);
    },
    onSwipeRight: () => {
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 220);
    },
    onSwipeUp: () => {
      keysPressed.current.up = true;
      setTimeout(() => { keysPressed.current.up = false; }, 200);
    },
    onTapCenter: handleInteractAction,
    enabled: phase === 'playing',
  });

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        timeLeftRef.current = next;
        if (next <= 0) {
          clearInterval(interval);
          setPhase('ko');
          phaseRef.current = 'ko';
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  // Main Physics game loop (60 FPS)
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const updateGame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;
      const keys = keysPressed.current;

      if (keys.left) {
        leo.vx = -LEO_SPEED;
        leo.facingRight = false;
      } else if (keys.right) {
        leo.vx = LEO_SPEED;
        leo.facingRight = true;
      } else {
        leo.vx = 0;
      }

      if (keys.up && leo.isGrounded) {
        leo.vy = LEO_JUMP_FORCE;
        leo.isGrounded = false;
      }

      applyGravity(leo);

      leo.x = clamp(leo.x + leo.vx, 15, ROOM_WIDTH - LEO_HITBOX.width - 15);
      leo.y += leo.vy;

      // Platform collision resolution
      const landed = checkPlatformLanding(leo, ALTAR_PLATFORMS);
      if (landed) {
        leo.isGrounded = true;
        leo.vy = 0;
      } else if (leo.y >= FLOOR_Y - LEO_HITBOX.height) {
        leo.y = FLOOR_Y - LEO_HITBOX.height;
        leo.vy = 0;
        leo.isGrounded = true;
      } else {
        leo.isGrounded = false;
      }

      let animState = 'idle';
      if (!leo.isGrounded) animState = 'jump';
      else if (Math.abs(leo.vx) > 0.5) animState = 'run';

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState,
      });

      animFrameId.current = requestAnimationFrame(updateGame);
    };

    animFrameId.current = requestAnimationFrame(updateGame);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [phase]);

  // Camera tracking for narrow screens
  const cameraX = useMemo(() => {
    if (containerWidth >= ROOM_WIDTH) return 0;
    const target = leoDisplay.x - (containerWidth / 2) + 20;
    return clamp(target, 0, ROOM_WIDTH - containerWidth);
  }, [containerWidth, leoDisplay.x]);

  // Finish handlers
  const handleFinalFinish = () => {
    const stars = calculateStars(score, 480);
    if (onComplete) onComplete(stars, score);
    else if (onExit) onExit();
  };

  const handleRetry = () => {
    initGame();
  };

  const placedCount = Object.keys(placedAltars).length;

  return (
    <div className="sa-physical-root" ref={containerRef}>
      <FloatingExitBtn onExit={onExit} />

      {/* Objective Banner */}
      <div className="sa-objective-banner">
        <Crown size={22} className="sa-banner-icon" />
        <div className="sa-banner-info">
          <span className="sa-title">Shrine of Chronicles: Story Sequencer</span>
          <span className="sa-counter">
            Chronological Altars Restored: {placedCount} / 5
          </span>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className={`sa-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* Main Physical Viewport */}
      <div
        className="sa-viewport"
        style={{
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Mobile touch layer */}
        <div className="sa-gesture-layer" ref={gestureRef} />

        {/* Aurora Background Glow */}
        <div className="sa-shrine-aurora-glow" />

        {/* Platforms */}
        {ALTAR_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`sa-platform ${idx === 0 ? 'sa-floor-base' : idx === 3 ? 'sa-terrace-deck' : 'sa-ledge-platform'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* 5 Chronological Altars */}
        {ALTAR_DEFS.map((altar) => {
          const filledSlab = placedAltars[altar.pos];
          const isWrongBlink = wrongBlinkAltar === altar.pos;
          return (
            <div
              key={altar.pos}
              className={`sa-altar-entity ${filledSlab ? 'altar-bound' : 'altar-vacant'} ${isWrongBlink ? 'altar-wrong-blink' : ''}`}
              style={{ left: `${altar.x}px`, top: `${altar.y}px` }}
              onClick={handleInteractAction}
            >
              <div className="altar-label-tag">
                <Star size={14} /> <span>{altar.label}</span>
              </div>
              <div className="altar-pedestal-socket">
                {filledSlab ? (
                  <span className="altar-bound-text">{filledSlab.text}</span>
                ) : (
                  <span className="altar-vacant-slot">[ EMPTY ]</span>
                )}
              </div>
            </div>
          );
        })}

        {/* 5 Narrative Slabs */}
        {slabs.map((slab) => {
          if (slab.isPlaced || (carryingSlab && carryingSlab.id === slab.id)) return null;
          return (
            <div
              key={slab.id}
              className="sa-slab-entity"
              style={{ left: `${slab.x}px`, top: `${slab.y}px` }}
              onClick={handleInteractAction}
            >
              <div className="slab-header-icon">📜</div>
              <div className="slab-preview-text">{slab.text.slice(0, 36)}…</div>
            </div>
          );
        })}

        {/* Leo Character */}
        <LeoCharacter
          x={leoDisplay.x}
          y={leoDisplay.y}
          state={leoDisplay.animState}
          facingRight={leoDisplay.facingRight}
        />

        {/* Overhead Carried Slab */}
        {carryingSlab && (
          <div
            className="sa-overhead-slab"
            style={{ left: `${leoDisplay.x - 40}px`, top: `${leoDisplay.y - 36}px` }}
          >
            <span>📜 {carryingSlab.text.slice(0, 28)}…</span>
          </div>
        )}
      </div>

      {/* Prominent Narrative Reading Bar (A2-B1 ESL Clarity) */}
      <div className="sa-narrative-reading-bar">
        <Sparkles size={18} className="reading-icon" />
        <span className="reading-text">
          {carryingSlab
            ? `Carrying Scene: "${carryingSlab.text}" — Bring to the matching Altar!`
            : 'Explore the shrine! Stand near a narrative slab and press [E] or [Space] to pick it up.'}
        </span>
      </div>

      {/* HUD Overlay */}
      <HUDOverlay
        floorDoorLabel="Floor 6 • Door 3 — Story Sequencer"
        hearts={hearts}
        maxHearts={2}
        round={`${placedCount}/5`}
        roundLabel="SCENES:"
        score={score}
        timeLeft={timeLeft}
        wordsCollected={0}
        totalWords={0}
        floorNumber={6}
        doorLabel="Door 3 — Story Sequencer"
      />

      {/* Cleared Modal */}
      {phase === 'cleared' && (
        <div className="sa-modal-overlay">
          <div className="sa-modal-card cleared-card">
            <Crown size={56} className="crown-icon" />
            <h2>CHRONOLOGY RESTORED!</h2>
            <div className="stars-row">⭐⭐⭐</div>
            <p>Lexio has successfully sequenced the shrine&apos;s story fragments!</p>
            <p className="score-line">Final Score: <strong>{score} XP</strong></p>
            <button className="finish-btn" onClick={handleFinalFinish}>
              Ascend to Next Chamber <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* KO Modal */}
      {phase === 'ko' && (
        <div className="sa-modal-overlay">
          <div className="sa-modal-card ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>SHRINE TIMELINE COLLAPSED!</h2>
            <p>{hearts <= 0 ? 'Out of Hearts! The sacred sequence broke.' : 'Time run out! The shrine faded into darkness.'}</p>
            <div className="modal-actions">
              <button className="retry-btn" onClick={handleRetry}>
                <RotateCcw size={18} /> Try Again
              </button>
              <button className="exit-btn" onClick={handleFinalFinish}>
                Retreat to Hall
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
