/**
 * StormShieldDefense.jsx — Floor 3, Door 3 (Integration) Mini-Game for Lexio's Quest
 * GDD §2 Floor 3 Room C: "STORM SHIELD DEFENSE"
 *
 * Replaces static meteor tapping with Active Shield Deflection Platformer:
 * - Castle Spire Rooftop under an arcane thunderstorm
 * - Energy Meteors fall from the storm clouds:
 *   - Golden/Green Meteors bearing correct Cambridge vocabulary & collocations
 *   - Dark Crimson Hazard Meteors (distractors & lightning traps)
 * - Leo wields the Storm Aegis Shield (moves, jumps, and positions shield to body-block)
 * - Deflected valid meteors charge the Arcane Tower Battery (+20% per hit)
 * - Red hazard meteors must be dodged (or hit costs 1 Heart)
 * - Full battery (100%) summons the Astral Vortex clearing Floor 3!
 * - Virtual D-Pad + Arrow Keys / WASD + Spacebar support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Shield, Trophy, RotateCcw, ArrowRight, Zap, Sparkles, AlertTriangle, CloudLightning } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import './StormShieldDefense.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Rooftop spire platforms
const SPIRE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Spire Main Roof
  { x: 140, y: 360,     width: 180,        height: 18 },  // Left Battery Spire
  { x: 580, y: 360,     width: 180,        height: 18 },  // Right Battery Spire
];

const DEFAULT_METEOR_WORDS = [
  { word: 'friction',     isTarget: true },
  { word: 'rubber shoes', isTarget: true },
  { word: 'strong grip',  isTarget: true },
  { word: 'prevent slips',isTarget: true },
  { word: 'polished tiles', isTarget: true },
  { word: 'ice slick',    isTarget: false },
  { word: 'oil spill',    isTarget: false },
  { word: 'banana peel',  isTarget: false },
];

export default function StormShieldDefense({
  meteorVocabulary = DEFAULT_METEOR_WORDS,
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('storm_shield_defense') || 0;

  const vocabList = meteorVocabulary && meteorVocabulary.length > 0 ? meteorVocabulary : DEFAULT_METEOR_WORDS;

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [batteryCharge, setBatteryCharge] = useState(0); // 0 to 100%
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);
  const [shieldActive, setShieldActive] = useState(true);

  // Active falling meteors: [{ id, x, y, vy, word, isTarget }]
  const [meteors, setMeteors] = useState([]);
  const meteorSpawnTimer = useRef(0);

  // Leo physics
  const leoRef = useRef({
    x: 430,
    y: FLOOR_Y - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    invincibleUntil: 0,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: FLOOR_Y - LEO_HITBOX.height,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });

  const keysPressed = useRef({ left: false, right: false, up: false, shield: false });
  const animFrameId = useRef(null);

  // ── Keyboard controls ──────────────────────────────────────────────────
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
      if (['KeyE', 'KeyS', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.shield = true;
      }
    };

    const onKeyUp = (e) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) keysPressed.current.up = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keysPressed.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keysPressed.current.right = false;
      if (['KeyE', 'KeyS', 'ArrowDown'].includes(e.code)) keysPressed.current.shield = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // ── Game Loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const updateGame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;
      const keys = keysPressed.current;

      // Move Leo
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

      leo.x = clamp(leo.x + leo.vx, 20, ROOM_WIDTH - LEO_HITBOX.width - 20);
      leo.y += leo.vy;

      // Platform collisions
      const prevY = leo.y - leo.vy;
      const landing = checkPlatformLanding(
        { x: leo.x, y: leo.y, width: LEO_HITBOX.width, height: LEO_HITBOX.height, vy: leo.vy },
        SPIRE_PLATFORMS,
        prevY
      );

      if (landing.landed) {
        leo.y = landing.platformY - LEO_HITBOX.height;
        leo.vy = 0;
        leo.isGrounded = true;
      } else if (leo.y >= FLOOR_Y - LEO_HITBOX.height) {
        leo.y = FLOOR_Y - LEO_HITBOX.height;
        leo.vy = 0;
        leo.isGrounded = true;
      } else {
        leo.isGrounded = false;
      }

      // Spawn Meteors
      meteorSpawnTimer.current += dt;
      if (meteorSpawnTimer.current > 1.8) {
        meteorSpawnTimer.current = 0;
        const randomItem = vocabList[Math.floor(Math.random() * vocabList.length)] || DEFAULT_METEOR_WORDS[0];
        const spawnX = 60 + Math.random() * (ROOM_WIDTH - 140);
        setMeteors(prev => [
          ...prev,
          {
            id: `meteor_${Date.now()}_${Math.random()}`,
            x: spawnX,
            y: 40,
            vy: 90 + Math.random() * 50,
            word: randomItem.word,
            isTarget: randomItem.isTarget,
          }
        ]);
      }

      // Update Meteors & Collision Check
      const nowMs = Date.now();
      setMeteors(prevMeteors => {
        const nextMeteors = [];
        for (const m of prevMeteors) {
          const ny = m.y + m.vy * dt;

          // Check collision with Leo's Aegis Shield
          const distLeo = Math.hypot((leo.x + 20) - (m.x + 35), (leo.y + 24) - (ny + 20));

          if (distLeo < 52) {
            // Intercepted with Shield!
            if (m.isTarget) {
              // DEFLECTED TARGET METEOR!
              speakText(m.word);
              setScore(s => s + 30);
              setBatteryCharge(b => {
                const next = Math.min(100, b + 20);
                if (next >= 100) {
                  // BATTERY FULLY CHARGED!
                  setPhase('cleared');
                  const finalScore = score + 60 + (timeLeft * 2);
                  setScore(finalScore);
                  recordPersonalBest('storm_shield_defense', finalScore);
                  speakText('Storm battery fully charged! Arcane vortex unlocked!');
                }
                return next;
              });
              setFeedback({ type: 'correct', text: `⚡ DEFLECTED "${m.word}" (+20% Battery)` });
              setTimeout(() => setFeedback(null), 1500);
              continue; // meteor consumed
            } else {
              // HIT HAZARD METEOR!
              if (nowMs > leo.invincibleUntil) {
                leo.invincibleUntil = nowMs + INVINCIBILITY_MS;
                setHearts(h => {
                  const next = Math.max(0, h - 1);
                  if (next === 0) setPhase('ko');
                  return next;
                });
                setBatteryCharge(b => Math.max(0, b - 10));
                setFeedback({ type: 'wrong', text: `💥 HAZARD HIT! "${m.word}" cracked shield! (-1 Heart)` });
                setTimeout(() => setFeedback(null), 1500);
              }
              continue;
            }
          }

          // Off-screen ground hit
          if (ny > FLOOR_Y + 10) {
            continue;
          }

          nextMeteors.push({ ...m, y: ny });
        }
        return nextMeteors;
      });

      // Update Leo visuals
      let animState = 'idle';
      if (!leo.isGrounded) animState = 'jump';
      else if (Math.abs(leo.vx) > 10) animState = 'run';

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState,
        invincible: nowMs < leo.invincibleUntil,
      });

      animFrameId.current = requestAnimationFrame(updateGame);
    };

    animFrameId.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [phase, vocabList, score, timeLeft, recordPersonalBest]);

  // Timer loop
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setPhase('ko');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // D-Pad handlers
  const dpadHandlers = {
    onLeftPress: () => { keysPressed.current.left = true; },
    onLeftRelease: () => { keysPressed.current.left = false; },
    onRightPress: () => { keysPressed.current.right = true; },
    onRightRelease: () => { keysPressed.current.right = false; },
    onJumpPress: () => { keysPressed.current.up = true; },
    onJumpRelease: () => { keysPressed.current.up = false; },
    onActionPress: () => setShieldActive(true),
  };

  const handleRetry = () => {
    setBatteryCharge(0);
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setMeteors([]);
    leoRef.current = { x: 430, y: FLOOR_Y - LEO_HITBOX.height, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, 180) });
    else if (onExit) onExit();
  };

  return (
    <div className="storm-shield-root">
      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="storm-objective-banner">
        <CloudLightning size={22} className="storm-banner-icon" />
        <div className="storm-battery-gauge">
          <span className="battery-title">Storm Battery:</span>
          <div className="battery-bar-track">
            <div className="battery-bar-fill" style={{ width: `${batteryCharge}%` }} />
          </div>
          <span className="battery-pct">{batteryCharge}%</span>
        </div>
        <div className="storm-hint-chip">Deflect Golden Meteors!</div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`storm-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Main Spire Viewport ──────────────────────────────────────── */}
      <div className="storm-spire-viewport">
        {/* Arcane Lightning Clouds */}
        <div className="storm-cloud-layer">
          <div className="lightning-flash-overlay" />
        </div>

        {/* Spire Rooftop Platforms */}
        {SPIRE_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`spire-platform ${idx === 0 ? 'spire-main-roof' : 'spire-battery-deck'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          >
            {idx !== 0 && (
              <div className="spire-battery-pylon">
                <Zap size={18} className="pylon-spark" />
              </div>
            )}
          </div>
        ))}

        {/* Falling Meteors */}
        {meteors.map(m => (
          <div
            key={m.id}
            className={`falling-meteor-entity ${m.isTarget ? 'meteor-golden' : 'meteor-hazard'}`}
            style={{ left: `${m.x}px`, top: `${m.y}px` }}
          >
            <div className="meteor-trail" />
            <div className="meteor-core">
              <span className="meteor-word">{m.word}</span>
            </div>
          </div>
        ))}

        {/* Leo Character with Aegis Shield Glow */}
        <div className="leo-shield-wrapper">
          <LeoCharacter
            x={leoDisplay.x}
            y={leoDisplay.y}
            state={leoDisplay.animState}
            facingRight={leoDisplay.facingRight}
            invincible={leoDisplay.invincible}
          />
          {/* Glowing Aegis Energy Shield Aura */}
          <div
            className="aegis-shield-aura"
            style={{
              left: `${leoDisplay.x - 6}px`,
              top: `${leoDisplay.y - 6}px`,
            }}
          >
            <Shield size={52} className="shield-icon-glow" />
          </div>
        </div>
      </div>

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={Math.round(batteryCharge / 20)}
        totalWords={5}
        floorNumber={3}
        doorLabel="Door 3 — Storm Shield Defense"
      />

      {/* ── Virtual D-Pad ────────────────────────────────────────────── */}
      <VirtualDPad {...dpadHandlers} visible={phase === 'playing'} />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="storm-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>ASTRAL VORTEX CHARGED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, 180))}
            </div>
            <p className="cleared-score">Score: <strong>{score} XP</strong></p>
            {score > personalBest && (
              <div className="cleared-record">🏆 New Personal Best!</div>
            )}
            <button className="finish-door-btn" onClick={handleFinalFinish}>
              Return to Chamber <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Knockout Modal ───────────────────────────────────────────── */}
      {phase === 'ko' && (
        <div className="storm-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>OVERCHARGED DISCORD!</h2>
            <p>Dark lightning shattered the Aegis Shield!</p>
            <div className="ko-actions">
              <button className="retry-btn" onClick={handleRetry}>
                <RotateCcw size={18} /> Try Again
              </button>
              <button className="exit-btn" onClick={handleFinalFinish}>
                Retreat to Chamber
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
