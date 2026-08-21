import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, Shield, Zap, Sparkles, Trophy, Target, AlertTriangle, Timer } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import { VoiceService } from '../../services/voiceService';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * MeteorSmasherGame V3 — Plasma Cannon Turret with Reflex Speed Metric & Speedrun Victory
 */

export default function MeteorSmasherGame({ weekNumber = 33, words = [], onExit, isStandalone = false }) {
  const weekData = getWeekArcadeData(weekNumber);
  const wordBank = (words && words.length >= 4) ? words : weekData.words;

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [shields, setShields] = useState(3);
  const [meteorsSmashed, setMeteorsSmashed] = useState(0);
  const [gameTimer, setGameTimer] = useState(180); // 3 minutes
  const [meteors, setMeteors] = useState([]);
  const [cannonAngle, setCannonAngle] = useState(0); // in degrees
  const [laser, setLaser] = useState(null);
  const [target, setTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [foxTrigger, setFoxTrigger] = useState(false);
  const [fastestReflex, setFastestReflex] = useState(null);
  const [speedrunClearTime, setSpeedrunClearTime] = useState(null);

  const meteorsRef = useRef([]);
  const shieldsRef = useRef(3);
  const scoreRef = useRef(0);
  const meteorsSmashedRef = useRef(0);
  const gameStateRef = useRef('idle');
  const targetRef = useRef(null);
  const frameRef = useRef(null);
  const swipeRef = useRef(null);
  const containerRef = useRef(null);
  const lastCatchTimeRef = useRef(Date.now());
  const spawnTimestampRef = useRef(Date.now());
  const startTimeRef = useRef(Date.now());
  const fastestReflexRef = useRef(null);
  const isTransitioningRef = useRef(false);

  const { consumePlayEnergy, recordHighScore, highScores, recordBestReaction, recordSpeedrunTime, bestReactionTimes, bestSpeedrunTimes } = useArcadeStore();
  const personalBest = highScores['meteor_smasher'] || 0;
  const storedBestReflex = bestReactionTimes['meteor_smasher'] || null;
  const storedBestSpeedrun = bestSpeedrunTimes['meteor_smasher'] || null;
  const GOAL_METEORS = 15; // 15 meteors in 3 minutes

  const W = 600;
  const H = 420;
  const CANNON_X = W / 2;
  const CANNON_Y = H - 24;

  // Clean definition speech
  const playDefinitionAudio = useCallback((targetWordObj) => {
    if (!targetWordObj) return;
    const def = targetWordObj.definition_en || targetWordObj.definition;
    if (!def) return;

    try { VoiceService.stop(); } catch (_) {}
    try { window.speechSynthesis?.cancel(); } catch (_) {}

    speakText(def, null, 0.90, null, 'explore', weekNumber);
  }, [weekNumber]);

  const makeMeteor = useCallback((isTarget = false, targetWordObj = null, idx = 0) => {
    const pick = targetWordObj || wordBank[Math.floor(Math.random() * wordBank.length)];
    const x = 80 + idx * 155 + (Math.random() - 0.5) * 30;
    const y = -15 - Math.random() * 20; // Enters canvas in <1.5s
    const r = Math.max(38, Math.min(50, 34 + Math.floor(pick.word.length * 1.4)));

    return {
      id: `m_${Date.now()}_${idx}_${Math.random()}`,
      word: pick.word,
      isTarget,
      x: Math.max(r + 20, Math.min(W - r - 20, x)),
      y,
      vy: 0.42 + Math.random() * 0.18,
      vx: (Math.random() - 0.5) * 0.25,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.4,
      r,
      color: isTarget ? '#f59e0b' : ['#6366f1', '#ec4899', '#0ea5e9', '#10b981', '#8b5cf6'][idx % 5],
      hit: false,
    };
  }, [wordBank]);

  const spawnWave = useCallback((currentTarget) => {
    const decoys = wordBank
      .filter(w => w.word !== currentTarget.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const waveWords = [currentTarget, ...decoys].sort(() => Math.random() - 0.5);

    const newMeteors = waveWords.map((item, i) =>
      makeMeteor(item.word === currentTarget.word, item, i)
    );

    meteorsRef.current = newMeteors;
    setMeteors([...newMeteors]);
    lastCatchTimeRef.current = Date.now();
    spawnTimestampRef.current = Date.now(); // Record spawn timestamp
    setFoxTrigger(false);

    // Aim cannon towards target meteor
    const tgtM = newMeteors.find(m => m.isTarget);
    if (tgtM) {
      const angle = (Math.atan2(tgtM.x - CANNON_X, -(tgtM.y - CANNON_Y)) * 180) / Math.PI;
      setCannonAngle(angle);
    }

    playDefinitionAudio(currentTarget);
  }, [wordBank, makeMeteor, playDefinitionAudio, CANNON_X, CANNON_Y]);

  const pickNextTarget = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const t = wordBank[Math.floor(Math.random() * wordBank.length)];
    targetRef.current = t;
    setTarget(t);
    spawnWave(t);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 500);
  }, [wordBank, spawnWave]);

  // Physics animation loop
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    let targetMissed = false;

    meteorsRef.current = meteorsRef.current.map(m => {
      if (m.hit) return m;
      let { x, y, vx, vy, rot, rotSpeed, r } = m;

      x += vx;
      y += vy;
      rot += rotSpeed;

      if (y - r > H) {
        if (m.isTarget && !m.hit) {
          targetMissed = true;
        }
        return { ...m, hit: true };
      }

      return { ...m, x, y, vx, vy, rot };
    });

    if (targetMissed && !isTransitioningRef.current) {
      shieldsRef.current = Math.max(0, shieldsRef.current - 1);
      setShields(shieldsRef.current);
      setFeedback({
        msg: `🛡️ Missed: "${targetRef.current?.word}" (−1 shield)`,
        type: 'bad'
      });
      setFoxTrigger(true);
      setTimeout(() => setFeedback(null), 1200);

      if (shieldsRef.current <= 0) {
        setTimeout(() => endGame(false), 500);
        return;
      }

      setTimeout(() => pickNextTarget(), 400);
    }

    setMeteors([...meteorsRef.current]);
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [pickNextTarget]);

  // 1-second game timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(false); return; }
      }
      if (Date.now() - lastCatchTimeRef.current > 7000) {
        setFoxTrigger(true);
      }
      setGameTimer(t => {
        if (t <= 1) { endGame(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [gameState, isStandalone]);

  const endGame = useCallback((isSpeedrunVictory = false) => {
    gameStateRef.current = 'done';
    setGameState('done');
    cancelAnimationFrame(frameRef.current);
    try { VoiceService.stop(); } catch (_) {}

    if (isSpeedrunVictory) {
      const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
      setSpeedrunClearTime(elapsedSec);
      recordSpeedrunTime('meteor_smasher', elapsedSec);
    }

    recordHighScore('meteor_smasher', scoreRef.current);
  }, [recordHighScore, recordSpeedrunTime]);

  const startGame = () => {
    scoreRef.current = 0;
    shieldsRef.current = 3;
    meteorsSmashedRef.current = 0;
    isTransitioningRef.current = false;
    fastestReflexRef.current = null;
    meteorsRef.current = [];
    startTimeRef.current = Date.now();

    setScore(0);
    setShields(3);
    setMeteorsSmashed(0);
    setGameTimer(180); // 3 minutes
    setFeedback(null);
    setLaser(null);
    setFoxTrigger(false);
    setFastestReflex(null);
    setSpeedrunClearTime(null);

    gameStateRef.current = 'playing';
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
    setTimeout(pickNextTarget, 100);
  };

  useEffect(() => () => {
    cancelAnimationFrame(frameRef.current);
    try { VoiceService.stop(); } catch (_) {}
  }, []);

  // Fire laser with rotating cannon animation
  const fireLaserAtMeteor = useCallback((meteor) => {
    if (!meteor || meteor.hit || gameStateRef.current !== 'playing' || isTransitioningRef.current) return;

    // Rotate cannon directly towards aimed meteor
    const aimAngle = (Math.atan2(meteor.x - CANNON_X, -(meteor.y - CANNON_Y)) * 180) / Math.PI;
    setCannonAngle(aimAngle);

    const isCorrect = meteor.isTarget;
    const laserColor = isCorrect ? '#4ade80' : '#ef4444';

    setLaser({
      x1: CANNON_X,
      y1: CANNON_Y,
      x2: meteor.x,
      y2: meteor.y,
      color: laserColor,
      hit: true
    });
    setTimeout(() => setLaser(null), 300);

    if (isCorrect) {
      // Calculate Reflex Reaction Time
      const reflexSec = (Date.now() - spawnTimestampRef.current) / 1000;
      const isLightning = reflexSec <= 2.2;
      const speedBonus = isLightning ? 5 : 0;

      if (!fastestReflexRef.current || reflexSec < fastestReflexRef.current) {
        fastestReflexRef.current = reflexSec;
        setFastestReflex(reflexSec);
        recordBestReaction('meteor_smasher', reflexSec);
      }

      // Laser Hit!
      scoreRef.current += (20 + speedBonus);
      meteorsSmashedRef.current += 1;
      setScore(scoreRef.current);
      setMeteorsSmashed(meteorsSmashedRef.current);

      if (isLightning) {
        setFeedback({ msg: `⚡ LIGHTNING BLAST: ${reflexSec.toFixed(2)}s! (+${20 + speedBonus} pts)`, type: 'good' });
      } else {
        setFeedback({ msg: `💥 Laser Blast! "${meteor.word}" (${reflexSec.toFixed(1)}s) (+20 pts)`, type: 'good' });
      }

      meteorsRef.current = meteorsRef.current.map(m =>
        m.id === meteor.id ? { ...m, hit: true } : m
      );

      // Speedrun Victory Trigger (All 15 meteors blasted early!)
      if (meteorsSmashedRef.current >= GOAL_METEORS) {
        const timeBonus = Math.floor(gameTimer * 2);
        scoreRef.current += timeBonus;
        setScore(scoreRef.current);
        endGame(true);
        return;
      }

      setTimeout(() => {
        setFeedback(null);
        pickNextTarget();
      }, 650);
    } else {
      // Wrong meteor hit -> shield damage
      shieldsRef.current = Math.max(0, shieldsRef.current - 1);
      setShields(shieldsRef.current);

      const correctWord = targetRef.current?.word || '';
      setFeedback({
        msg: `❌ Smashed "${meteor.word}" · Correct: "${correctWord}"`,
        type: 'bad'
      });
      setFoxTrigger(true);

      meteorsRef.current = meteorsRef.current.map(m =>
        m.id === meteor.id ? { ...m, hit: true } : m
      );

      setTimeout(() => setFeedback(null), 1600);
      if (shieldsRef.current <= 0) setTimeout(() => endGame(false), 500);
    }
  }, [pickNextTarget, endGame, CANNON_X, CANNON_Y, gameTimer, recordBestReaction]);

  // Handle Trackpad Drag / Swipe
  const handlePointerDown = (e) => {
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;
    swipeRef.current = {
      x: (e.clientX - cr.left) * (W / cr.width),
      y: (e.clientY - cr.top) * (H / cr.height),
    };
  };

  const handlePointerUp = (e) => {
    if (!swipeRef.current || gameStateRef.current !== 'playing') return;
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;

    const sx2 = (e.clientX - cr.left) * (W / cr.width);
    const sy2 = (e.clientY - cr.top) * (H / cr.height);
    swipeRef.current = null;

    let closest = null;
    let minD = Infinity;

    meteorsRef.current.forEach(m => {
      if (m.hit) return;
      const d = Math.hypot(m.x - sx2, m.y - sy2);
      if (d < m.r + 35 && d < minD) {
        minD = d;
        closest = m;
      }
    });

    if (closest) {
      fireLaserAtMeteor(closest);
    }
  };

  const targetMeteor = meteors.find(m => m.isTarget && !m.hit);

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '420px',
      background: 'radial-gradient(ellipse at 50% 20%, #1e1b4b 0%, #0f0a1e 60%, #050208 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Top HUD with Speed & Reflex Metrics */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 12px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🛸</span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#a78bfa', letterSpacing: '0.04em' }}>METEOR SMASHER</div>
            <div style={{ fontSize: '9px', color: '#94a3b8' }}>
              🎯 <b style={{ color: meteorsSmashed >= GOAL_METEORS ? '#4ade80' : '#fbbf24' }}>{meteorsSmashed}/{GOAL_METEORS} meteors</b>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {(fastestReflex || storedBestReflex) && (
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#fde047', background: 'rgba(253,224,71,0.12)', border: '1px solid rgba(253,224,71,0.3)', borderRadius: '6px', padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Zap size={10} fill="#fde047" /> ⚡ {(fastestReflex || storedBestReflex).toFixed(2)}s
            </div>
          )}
          {/* Shields */}
          <div style={{ display: 'flex', gap: '2px', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '6px' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ fontSize: '11px', filter: i < shields ? 'none' : 'grayscale(1) opacity(0.25)' }}>
                🛡️
              </span>
            ))}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '6px', padding: '3px 8px' }}>
            ⭐ {score}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#a78bfa', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '6px', padding: '3px 8px' }}>
            ⏱ {Math.floor(gameTimer / 60)}:{String(gameTimer % 60).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '24px', gap: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 12px rgba(167,139,250,0.5))' }}>🛸</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 900, color: '#a78bfa' }}>
              Plasma Cannon Defense!
            </h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#cbd5e1', maxWidth: '300px', lineHeight: 1.4 }}>
              Blast all <b>{GOAL_METEORS} target meteors</b> as fast as you can! Quick strikes earn <b>⚡ Speed Bonus (+5 pts)</b>!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '10px 24px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff', fontWeight: 900, fontSize: '13px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
            display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px',
          }}>
            <span>🛸</span> START DEFENSE
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Definition Banner + Listen Audio Button */}
          {target && (
            <div style={{
              padding: '6px 12px', background: 'rgba(124,58,237,0.2)',
              borderBottom: '1px solid rgba(124,58,237,0.35)', textAlign: 'center', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              <div>
                <div style={{ fontSize: '9px', color: '#c4b5fd', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  TARGET MEANING:
                </div>
                <div style={{ fontSize: '12px', color: '#f8fafc', fontWeight: 800, fontStyle: 'italic', maxWidth: '420px' }}>
                  "{target.definition_en || target.definition}"
                </div>
              </div>
              <button
                type="button"
                onClick={() => playDefinitionAudio(targetRef.current || target)}
                style={{
                  background: 'rgba(167,139,250,0.25)', border: '1px solid rgba(167,139,250,0.4)',
                  color: '#c4b5fd', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 800, flexShrink: 0
                }}
              >
                <Volume2 size={13} /> <span>Listen</span>
              </button>
            </div>
          )}

          {/* Feedback Overlay */}
          {feedback && (
            <div style={{
              position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)',
              zIndex: 40, padding: '8px 20px', borderRadius: '16px', fontWeight: 900, fontSize: '14px',
              background: feedback.type === 'good' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)',
              color: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.6)', border: '2px solid rgba(255,255,255,0.4)',
              whiteSpace: 'nowrap',
            }}>
              {feedback.msg}
            </div>
          )}

          {/* Meteor Space Canvas */}
          <div
            ref={containerRef}
            style={{ flex: 1, position: 'relative', overflow: 'hidden', touchAction: 'none' }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* Falling Meteors */}
            {meteors.filter(m => !m.hit).map(m => {
              const leftPct = (m.x / W) * 100;
              const topPct = (m.y / H) * 100;

              return (
                <div
                  key={m.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    fireLaserAtMeteor(m);
                  }}
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${m.r * 2}px`,
                    height: `${m.r * 2}px`,
                    cursor: 'pointer',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.1s',
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.92)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
                >
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    transform: `rotate(${m.rot}deg)`,
                    background: `radial-gradient(circle at 35% 30%, ${m.color}ff 0%, ${m.color}88 60%, #0f172a 100%)`,
                    border: `2px solid ${m.color}`,
                    boxShadow: `0 0 16px ${m.color}66, inset -4px -4px 10px rgba(0,0,0,0.6)`,
                  }} />

                  <div style={{
                    position: 'relative', zIndex: 10, color: '#ffffff',
                    fontWeight: 900, fontSize: m.word.length > 8 ? '12px' : '13px',
                    letterSpacing: '0.03em', textShadow: '0 2px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.8)',
                    textAlign: 'center', padding: '4px', pointerEvents: 'none',
                  }}>
                    {m.word}
                  </div>
                </div>
              );
            })}

            {/* Laser Beam SVG */}
            {laser && (
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 30 }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                <line x1={laser.x1} y1={laser.y1} x2={laser.x2} y2={laser.y2} stroke={laser.color} strokeWidth="10" strokeLinecap="round" opacity="0.4" />
                <line x1={laser.x1} y1={laser.y1} x2={laser.x2} y2={laser.y2} stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />
                <circle cx={laser.x2} cy={laser.y2} r="20" fill={laser.color} opacity="0.7" />
              </svg>
            )}

            {/* FLYING LEXIO FOX TARGET TRACKER */}
            {foxTrigger && targetMeteor && (
              <div style={{
                position: 'absolute',
                left: `${(targetMeteor.x / W) * 100}%`,
                top: `${(targetMeteor.y / H) * 100}%`,
                transform: 'translate(-50%, -140%)',
                zIndex: 45, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
                animation: 'bounceIn 0.3s ease-out',
              }}>
                <div style={{
                  background: '#fde047', border: '2px solid #ca8a04', borderRadius: '12px',
                  padding: '4px 10px', color: '#713f12', fontWeight: 900, fontSize: '11px',
                  whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(0,0,0,0.5)', marginBottom: '4px',
                }}>
                  🦊 Laser this one! 👇
                </div>
                <div style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}>
                  🦊
                </div>
              </div>
            )}

            {/* ROTATING PLASMA CANNON TURRET */}
            <div style={{
              position: 'absolute', bottom: '12px', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 35, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none'
            }}>
              <div style={{
                width: '12px', height: '38px',
                background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 60%, #0369a1 100%)',
                borderRadius: '6px 6px 2px 2px', border: '2px solid #bae6fd',
                boxShadow: '0 0 14px #38bdf8', transformOrigin: '50% 100%',
                transform: `rotate(${cannonAngle}deg)`, transition: 'transform 0.12s ease-out', marginBottom: '-6px',
              }} />
              <div style={{
                width: '54px', height: '24px',
                background: 'radial-gradient(circle at 50% 30%, #a855f7 0%, #6b21a8 70%, #3b0764 100%)',
                borderRadius: '14px 14px 4px 4px', border: '2px solid #d8b4fe',
                boxShadow: '0 4px 16px rgba(168,85,247,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '10px', fontWeight: 900
              }}>
                TURRET
              </div>
            </div>

            {/* Lexio Fox Assistant */}
            {target && (
              <ArcadeFoxHelper
                hintText={`Laser the "${target.word}" meteor! (${target.definition_vi || ''})`}
                triggerHint={foxTrigger}
                onHintUsed={() => setFoxTrigger(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* GAME OVER / RESULTS STATE (Lifted, compact) */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px', gap: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px' }}>{meteorsSmashed >= GOAL_METEORS ? '🏆' : '⏱️'}</div>
          <div>
            <h3 style={{
              margin: '0 0 4px', fontSize: '17px', fontWeight: 900,
              color: meteorsSmashed >= GOAL_METEORS ? '#4ade80' : '#ef4444'
            }}>
              {meteorsSmashed >= GOAL_METEORS
                ? '⚡ DEFENSE COMPLETE!'
                : shields <= 0
                ? 'Shields Down — Game Over!'
                : "Time's Up — Game Over!"}
            </h3>
            <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#cbd5e1' }}>
              Smashed: <strong style={{ color: meteorsSmashed >= GOAL_METEORS ? '#4ade80' : '#fbbf24' }}>{meteorsSmashed}/{GOAL_METEORS} meteors</strong>
              {speedrunClearTime && (
                <span style={{ color: '#38bdf8', fontWeight: 900, marginLeft: '6px' }}>
                  ({speedrunClearTime.toFixed(1)}s! 🔥)
                </span>
              )}
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '6px 0', flexWrap: 'wrap' }}>
              {fastestReflex && (
                <div style={{ background: 'rgba(253,224,71,0.15)', border: '1px solid rgba(253,224,71,0.3)', borderRadius: '8px', padding: '4px 10px', color: '#fde047', fontWeight: 900, fontSize: '11px' }}>
                  ⚡ Reflex: {fastestReflex.toFixed(2)}s
                </div>
              )}
              <div style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '4px 10px', color: '#fbbf24', fontWeight: 900, fontSize: '11px' }}>
                ⭐ Score: {score} pts
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button type="button" onClick={startGame} style={{
              padding: '9px 20px',
              background: meteorsSmashed >= GOAL_METEORS
                ? 'linear-gradient(135deg, #059669, #0d9488)'
                : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              color: '#fff', fontWeight: 900, fontSize: '12px', borderRadius: '10px',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <RotateCcw size={14} /> {meteorsSmashed >= GOAL_METEORS ? 'Play Again' : 'Try Again'}
            </button>
            {onExit && (
              <button type="button" onClick={onExit} style={{
                padding: '9px 16px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#cbd5e1', fontWeight: 800, fontSize: '12px', borderRadius: '10px',
                cursor: 'pointer',
              }}>
                Back to Arcade
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
