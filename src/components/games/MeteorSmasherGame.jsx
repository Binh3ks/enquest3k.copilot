import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, Shield, Zap, Sparkles, Trophy, Target, AlertTriangle } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import { VoiceService } from '../../services/voiceService';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * MeteorSmasherGame V3 — Plasma Cannon Turret with Bulletproof Wave Sync & Clean Definition Audio
 */

export default function MeteorSmasherGame({ weekNumber = 33, words = [], onComplete, isStandalone = false }) {
  const weekData = getWeekArcadeData(weekNumber);
  const wordBank = (words && words.length >= 4) ? words : weekData.words;

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [shields, setShields] = useState(3);
  const [meteorsSmashed, setMeteorsSmashed] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [meteors, setMeteors] = useState([]);
  const [cannonAngle, setCannonAngle] = useState(0); // in degrees
  const [laser, setLaser] = useState(null);
  const [target, setTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [foxTrigger, setFoxTrigger] = useState(false);

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
  const isTransitioningRef = useRef(false);

  const { consumePlayEnergy, recordHighScore, highScores } = useArcadeStore();
  const personalBest = highScores['meteor_smasher'] || 0;
  const GOAL_METEORS = 10;

  const W = 600;
  const H = 420;
  const CANNON_X = W / 2;
  const CANNON_Y = H - 24;

  // Clean, uninterrupted definition speech
  const playDefinitionAudio = useCallback((targetWordObj) => {
    if (!targetWordObj) return;
    const def = targetWordObj.definition_en || targetWordObj.definition;
    if (!def) return;

    try { VoiceService.stop(); } catch (_) {}
    try { window.speechSynthesis?.cancel(); } catch (_) {}

    // Clean audio speaking definition directly
    speakText(def, null, 0.90, null, 'explore', weekNumber);
  }, [weekNumber]);

  const makeMeteor = useCallback((isTarget = false, targetWordObj = null, idx = 0) => {
    const pick = targetWordObj || wordBank[Math.floor(Math.random() * wordBank.length)];
    const x = 80 + idx * 155 + (Math.random() - 0.5) * 30;
    const y = -45 - Math.random() * 40;
    const r = Math.max(38, Math.min(50, 34 + Math.floor(pick.word.length * 1.4)));

    return {
      id: `m_${Date.now()}_${idx}_${Math.random()}`,
      word: pick.word,
      isTarget,
      x: Math.max(r + 20, Math.min(W - r - 20, x)),
      y,
      vy: 0.28 + Math.random() * 0.16, // Smooth and comfortable fall speed (~20s per wave)
      vx: (Math.random() - 0.5) * 0.2,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.2,
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
    }, 600);
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

      // Reached bottom without hit
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
        endGame();
        return;
      }
      setTimeout(() => pickNextTarget(), 400);
    }

    setMeteors([...meteorsRef.current]);
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [pickNextTarget]);

  // 1-second game timer + Fox idle trigger
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
      }
      if (Date.now() - lastCatchTimeRef.current > 5000) {
        setFoxTrigger(true);
      }
      setGameTimer(t => {
        if (t <= 1) { endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [gameState, isStandalone]);

  const endGame = useCallback(() => {
    gameStateRef.current = 'done';
    setGameState('done');
    cancelAnimationFrame(frameRef.current);
    try { VoiceService.stop(); } catch (_) {}
    recordHighScore('meteor_smasher', scoreRef.current);
    if (onComplete) onComplete(scoreRef.current);
  }, [onComplete, recordHighScore]);

  const startGame = () => {
    scoreRef.current = 0;
    shieldsRef.current = 3;
    meteorsSmashedRef.current = 0;
    isTransitioningRef.current = false;
    setScore(0);
    setShields(3);
    setMeteorsSmashed(0);
    setGameTimer(60);
    setFeedback(null);
    setLaser(null);
    setFoxTrigger(false);

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

    // Show laser beam from cannon turret to meteor
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
      // Laser Hit!
      scoreRef.current += 20;
      meteorsSmashedRef.current += 1;
      setScore(scoreRef.current);
      setMeteorsSmashed(meteorsSmashedRef.current);
      setFeedback({ msg: `💥 Laser Blast! "${meteor.word}" (+20 pts)`, type: 'good' });

      meteorsRef.current = meteorsRef.current.map(m =>
        m.id === meteor.id ? { ...m, hit: true } : m
      );

      setTimeout(() => {
        setFeedback(null);
        pickNextTarget();
      }, 700);
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
      if (shieldsRef.current <= 0) setTimeout(endGame, 500);
    }
  }, [pickNextTarget, endGame, CANNON_X, CANNON_Y]);

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
      {/* Top HUD with Goal & Personal Best */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🛸</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#a78bfa', letterSpacing: '0.05em' }}>METEOR SMASHER</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              🎯 Goal: <b style={{ color: meteorsSmashed >= GOAL_METEORS ? '#4ade80' : '#fbbf24' }}>{meteorsSmashed}/{GOAL_METEORS} meteors</b>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {personalBest > 0 && (
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '8px', padding: '3px 8px' }}>
              🏆 Best: {personalBest}
            </div>
          )}
          {/* Shields */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '8px' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ fontSize: '14px', filter: i < shields ? 'none' : 'grayscale(1) opacity(0.25)' }}>
                🛡️
              </span>
            ))}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '4px 12px' }}>
            ⭐ {score} pts
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#a78bfa', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '8px', padding: '4px 12px' }}>
            ⏱ {gameTimer}s
          </div>
        </div>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', filter: 'drop-shadow(0 0 16px rgba(167,139,250,0.6))' }}>🛸</div>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 900, color: '#a78bfa' }}>
              Plasma Cannon Defense!
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', maxWidth: '360px', lineHeight: 1.5 }}>
              Target: Blast <b>{GOAL_METEORS} target meteors</b> in 60 seconds! Rotate the plasma cannon and click or swipe to fire laser beams!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🛸</span> START DEFENSE (GOAL: 10)
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Definition Banner + Listen Audio Button */}
          {target && (
            <div style={{
              padding: '10px 16px', background: 'rgba(124,58,237,0.2)',
              borderBottom: '1.5px solid rgba(124,58,237,0.35)', textAlign: 'center', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <div>
                <div style={{ fontSize: '10px', color: '#c4b5fd', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  TARGET MEANING:
                </div>
                <div style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 800, fontStyle: 'italic', maxWidth: '500px' }}>
                  "{target.definition_en || target.definition}"
                </div>
              </div>
              <button
                type="button"
                onClick={() => playDefinitionAudio(targetRef.current || target)}
                style={{
                  background: 'rgba(167,139,250,0.25)', border: '1px solid rgba(167,139,250,0.4)',
                  color: '#c4b5fd', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800, flexShrink: 0
                }}
              >
                <Volume2 size={16} /> <span>Listen</span>
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
            {/* Star field */}
            {[...Array(24)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${(i * 37 + 11) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                width: i % 3 === 0 ? '2px' : '1px',
                height: i % 3 === 0 ? '2px' : '1px',
                borderRadius: '50%',
                background: `rgba(255,255,255,${0.3 + (i % 4) * 0.2})`,
                pointerEvents: 'none',
              }} />
            ))}

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
                  {/* Rotating Meteor Texture */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    transform: `rotate(${m.rot}deg)`,
                    background: `radial-gradient(circle at 35% 30%, ${m.color}ff 0%, ${m.color}88 60%, #0f172a 100%)`,
                    border: `2px solid ${m.color}`,
                    boxShadow: `0 0 16px ${m.color}66, inset -4px -4px 10px rgba(0,0,0,0.6)`,
                  }} />

                  {/* 100% FIXED HORIZONTAL TEXT (NEVER ROTATES!) */}
                  <div style={{
                    position: 'relative',
                    zIndex: 10,
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: m.word.length > 8 ? '12px' : '13px',
                    letterSpacing: '0.03em',
                    textShadow: '0 2px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.8)',
                    textAlign: 'center',
                    padding: '4px',
                    pointerEvents: 'none',
                  }}>
                    {m.word}
                  </div>
                </div>
              );
            })}

            {/* Laser Beam SVG */}
            {laser && (
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 30 }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                <line
                  x1={laser.x1} y1={laser.y1}
                  x2={laser.x2} y2={laser.y2}
                  stroke={laser.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                <line
                  x1={laser.x1} y1={laser.y1}
                  x2={laser.x2} y2={laser.y2}
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <circle cx={laser.x2} cy={laser.y2} r="20" fill={laser.color} opacity="0.7" />
              </svg>
            )}

            {/* FLYING LEXIO FOX TARGET TRACKER (flies right next to target meteor) */}
            {foxTrigger && targetMeteor && (
              <div style={{
                position: 'absolute',
                left: `${(targetMeteor.x / W) * 100}%`,
                top: `${(targetMeteor.y / H) * 100}%`,
                transform: 'translate(-50%, -140%)',
                zIndex: 45,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
                animation: 'bounceIn 0.3s ease-out',
              }}>
                <div style={{
                  background: '#fde047',
                  border: '2px solid #ca8a04',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  color: '#713f12',
                  fontWeight: 900,
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                  marginBottom: '4px',
                }}>
                  🦊 Laser this one! 👇
                </div>
                <div style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}>
                  🦊
                </div>
              </div>
            )}

            {/* ROTATING PLASMA CANNON TURRET AT BOTTOM CENTER */}
            <div style={{
              position: 'absolute', bottom: '12px', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 35, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none'
            }}>
              {/* Cannon Barrel rotating towards aim target */}
              <div style={{
                width: '12px', height: '38px',
                background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 60%, #0369a1 100%)',
                borderRadius: '6px 6px 2px 2px',
                border: '2px solid #bae6fd',
                boxShadow: '0 0 14px #38bdf8',
                transformOrigin: '50% 100%',
                transform: `rotate(${cannonAngle}deg)`,
                transition: 'transform 0.12s ease-out',
                marginBottom: '-6px',
              }} />
              {/* Turret Base */}
              <div style={{
                width: '54px', height: '24px',
                background: 'radial-gradient(circle at 50% 30%, #a855f7 0%, #6b21a8 70%, #3b0764 100%)',
                borderRadius: '14px 14px 4px 4px',
                border: '2px solid #d8b4fe',
                boxShadow: '0 4px 16px rgba(168,85,247,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '10px', fontWeight: 900
              }}>
                TURRET
              </div>
            </div>

            {/* Lexio Fox Mascot Assistant on Bottom-Left */}
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

      {/* GAME OVER STATE (Clear Time's Up / Shields Down indication) */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px' }}>{meteorsSmashed >= GOAL_METEORS ? '🏆' : '⏱️'}</div>
          <div>
            <h3 style={{
              margin: '0 0 6px', fontSize: '24px', fontWeight: 900,
              color: meteorsSmashed >= GOAL_METEORS ? '#4ade80' : '#ef4444'
            }}>
              {meteorsSmashed >= GOAL_METEORS
                ? 'Target Achieved! Galaxy Guardian!'
                : shields <= 0
                ? 'Shields Down — Game Over!'
                : "Time's Up — Game Over!"}
            </h3>
            <p style={{ margin: '0 0 6px', fontSize: '15px', color: '#cbd5e1' }}>
              Smashed: <strong style={{ color: meteorsSmashed >= GOAL_METEORS ? '#4ade80' : '#fbbf24' }}>{meteorsSmashed}/{GOAL_METEORS} meteors</strong>
              {meteorsSmashed < GOAL_METEORS && <span style={{ color: '#94a3b8', fontSize: '12px', display: 'block', marginTop: '4px' }}>Goal was {GOAL_METEORS} meteors in 60s</span>}
            </p>
            <p style={{ margin: 0, fontSize: '16px', color: '#cbd5e1' }}>
              Final Score: <strong style={{ color: '#fbbf24', fontSize: '22px' }}>{score} pts</strong>
              {score > personalBest && <span style={{ color: '#4ade80', fontSize: '13px', marginLeft: '8px', fontWeight: 900 }}>🔥 NEW BEST!</span>}
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px',
            background: meteorsSmashed >= GOAL_METEORS
              ? 'linear-gradient(135deg, #059669, #0d9488)'
              : 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <RotateCcw size={16} /> {meteorsSmashed >= GOAL_METEORS ? 'Play Again' : 'Try Again'}
          </button>
        </div>
      )}
    </div>
  );
}
