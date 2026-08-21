import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, ArrowLeft, ArrowRight, Zap, Sparkles, Trophy } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * PhysicsDriftGame V3 — Vertical Highway Road Runner
 *
 * Features:
 *  - Vertical Scrolling Highway (Top to Bottom) with 3 Lanes: Left, Center, Right.
 *  - Collect Target Vocabulary Stars: Match the target word displayed at top.
 *  - Easy Controls: Left/Right keyboard arrows, on-screen ◀ / ▶ buttons, or direct lane taps.
 *  - Dynamic, fast, exciting road action with Lexio Fox assistant.
 */

export default function PhysicsDriftGame({ weekNumber = 33, words = [], onComplete, isStandalone = false }) {
  const weekData = getWeekArcadeData(weekNumber);
  const wordBank = (words && words.length >= 4) ? words : weekData.words;

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [lane, setLane] = useState(1); // 0 = Left, 1 = Center, 2 = Right
  const [targetWord, setTargetWord] = useState('');
  const [items, setItems] = useState([]); // Falling word stars and obstacles
  const [roadOffset, setRoadOffset] = useState(0);
  const [speedBoost, setSpeedBoost] = useState(false);
  const [spinout, setSpinout] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [foxTrigger, setFoxTrigger] = useState(false);

  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const laneRef = useRef(1);
  const targetRef = useRef('');
  const itemsRef = useRef([]);
  const gameStateRef = useRef('idle');
  const frameRef = useRef(null);
  const roadOffsetRef = useRef(0);
  const nextSpawnAtRef = useRef(0);
  const lastCatchTimeRef = useRef(Date.now());

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const W = 480;
  const H = 500;

  const playAudio = useCallback((word) => {
    if (!word) return;
    const matchObj = wordBank.find(w => w.word === word);
    speakText(word, matchObj?.audio_word, 0.92, null, 'new_word', weekNumber);
  }, [wordBank, weekNumber]);

  const steerTo = useCallback((targetLane) => {
    if (spinout || gameStateRef.current !== 'playing') return;
    const clamped = Math.max(0, Math.min(2, targetLane));
    setLane(clamped);
    laneRef.current = clamped;
  }, [spinout]);

  const pickNextTarget = useCallback(() => {
    const t = wordBank[Math.floor(Math.random() * wordBank.length)];
    targetRef.current = t.word;
    setTargetWord(t.word);
    lastCatchTimeRef.current = Date.now();
    setFoxTrigger(false);
    playAudio(t.word);
  }, [wordBank, playAudio]);

  // Game animation loop — vertical scrolling
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    const speed = speedBoost ? 4.5 : spinout ? 0.8 : 2.6;
    roadOffsetRef.current = (roadOffsetRef.current + speed) % 60;
    setRoadOffset(roadOffsetRef.current);

    // Spawn falling word items across lanes
    if (Date.now() >= nextSpawnAtRef.current) {
      nextSpawnAtRef.current = Date.now() + (speedBoost ? 1200 : 1600);

      // Pick 1 lane for target, 1 lane for decoy or coin
      const lanesAvailable = [0, 1, 2].sort(() => Math.random() - 0.5);
      const targetLane = lanesAvailable[0];
      const decoyLane = lanesAvailable[1];

      const decoys = wordBank.filter(w => w.word !== targetRef.current);
      const decoyWord = decoys[Math.floor(Math.random() * decoys.length)]?.word || 'caution';

      const newItems = [
        {
          id: `item_${Date.now()}_tgt`,
          lane: targetLane,
          y: -40,
          word: targetRef.current,
          isTarget: true,
          isObstacle: false,
          icon: '⭐',
        },
        {
          id: `item_${Date.now()}_decoy`,
          lane: decoyLane,
          y: -40,
          word: Math.random() > 0.4 ? decoyWord : '🛢️ Oil Slick',
          isTarget: false,
          isObstacle: Math.random() <= 0.4,
          icon: Math.random() > 0.4 ? '💎' : '🛢️',
        }
      ];

      itemsRef.current = [...itemsRef.current, ...newItems];
    }

    // Move items down vertically
    const playerY = H - 80;
    let nextItems = [];

    itemsRef.current.forEach(item => {
      const nextY = item.y + speed;

      // Check collision with car
      if (Math.abs(nextY - playerY) < 35 && item.lane === laneRef.current) {
        if (item.isTarget) {
          // COLLECTED TARGET STAR!
          scoreRef.current += 20;
          streakRef.current += 1;
          setScore(scoreRef.current);
          setStreak(streakRef.current);
          setSpeedBoost(true);
          setFeedback({ msg: `🌟 Collected "${item.word}"! (+20 pts)`, type: 'good' });
          playAudio(item.word);

          setTimeout(() => {
            setSpeedBoost(false);
            setFeedback(null);
            pickNextTarget();
          }, 800);
        } else if (item.isObstacle) {
          // BUMPED OIL SLICK
          scoreRef.current = Math.max(0, scoreRef.current - 5);
          streakRef.current = 0;
          setScore(scoreRef.current);
          setStreak(0);
          setSpinout(true);
          setFeedback({ msg: `🛢️ Oil Skid! Avoid obstacles (−5 pts)`, type: 'bad' });
          setFoxTrigger(true);

          setTimeout(() => {
            setSpinout(false);
            setFeedback(null);
          }, 1400);
        } else {
          // WRONG WORD COIN
          scoreRef.current = Math.max(0, scoreRef.current - 2);
          setScore(scoreRef.current);
          setFeedback({ msg: `❌ That was "${item.word}" · Collect "${targetRef.current}"`, type: 'bad' });
          setFoxTrigger(true);
          setTimeout(() => setFeedback(null), 1200);
        }
        return; // Remove from road
      }

      if (nextY < H + 50) {
        nextItems.push({ ...item, y: nextY });
      }
    });

    itemsRef.current = nextItems;
    setItems(nextItems);

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [speedBoost, spinout, wordBank, playAudio, pickNextTarget]);

  // Keyboard controls
  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') steerTo(laneRef.current - 1);
      if (e.key === 'ArrowRight' || e.key === 'd') steerTo(laneRef.current + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, steerTo]);

  // 1-second clock + Fox idle trigger
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
    recordHighScore('physics_drift', scoreRef.current);
    if (onComplete) onComplete(scoreRef.current);
  }, [onComplete, recordHighScore]);

  const startGame = () => {
    scoreRef.current = 0;
    streakRef.current = 0;
    laneRef.current = 1;
    itemsRef.current = [];
    nextSpawnAtRef.current = Date.now() + 500;

    setScore(0);
    setStreak(0);
    setGameTimer(60);
    setLane(1);
    setItems([]);
    setFeedback(null);
    setSpeedBoost(false);
    setSpinout(false);

    gameStateRef.current = 'playing';
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
    setTimeout(pickNextTarget, 100);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const laneX = (l) => `${16.66 + l * 33.33}%`;

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '450px',
      background: 'linear-gradient(180deg, #091a2e 0%, #0f2744 40%, #091a2e 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Top HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🏎️</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#4ade80', letterSpacing: '0.05em' }}>ROAD RUNNER HIGHWAY</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Week {weekNumber} Word Collector</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {streak >= 3 && (
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={12} fill="#fbbf24" /> {streak}x STREAK
            </div>
          )}
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '4px 12px' }}>
            🏆 {score} pts
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#7dd3fc', background: 'rgba(125,211,252,0.1)', border: '1px solid rgba(125,211,252,0.25)', borderRadius: '8px', padding: '4px 12px' }}>
            ⏱ {gameTimer}s
          </div>
        </div>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', filter: 'drop-shadow(0 0 16px rgba(74,222,128,0.6))' }}>🏎️</div>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 900, color: '#4ade80' }}>
              Highway Word Collector!
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', maxWidth: '340px', lineHeight: 1.5 }}>
              Steer left and right to collect the target vocabulary words on the highway and avoid oil slicks!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(5,150,105,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🏎️</span> START HIGHWAY RUN
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Target Word Banner */}
          <div style={{
            padding: '8px 16px', background: 'rgba(74,222,128,0.18)',
            borderBottom: '1.5px solid rgba(74,222,128,0.3)', textAlign: 'center', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', zIndex: 10,
          }}>
            <span style={{ fontSize: '11px', color: '#86efac', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              COLLECT TARGET:
            </span>
            <span style={{ fontSize: '24px', color: '#f8fafc', fontWeight: 900, textShadow: '0 2px 8px rgba(74,222,128,0.8)' }}>
              {targetWord}
            </span>
            <button
              type="button"
              onClick={() => playAudio(targetWord)}
              style={{
                background: 'rgba(74,222,128,0.2)', border: '1px solid rgba(74,222,128,0.4)',
                color: '#86efac', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800
              }}
            >
              <Volume2 size={16} /> <span>Listen</span>
            </button>
          </div>

          {/* Vertical Road Canvas */}
          <div
            style={{
              flex: 1, position: 'relative', background: '#1e293b', overflow: 'hidden',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)'
            }}
          >
            {/* 3 Clickable Vertical Lanes */}
            <div
              onClick={() => steerTo(0)}
              style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, width: '33.33%',
                borderRight: '2px dashed rgba(251,191,36,0.6)', cursor: 'pointer',
                background: lane === 0 ? 'rgba(74,222,128,0.06)' : 'transparent',
              }}
            />
            <div
              onClick={() => steerTo(1)}
              style={{
                position: 'absolute', top: 0, bottom: 0, left: '33.33%', width: '33.33%',
                borderRight: '2px dashed rgba(251,191,36,0.6)', cursor: 'pointer',
                background: lane === 1 ? 'rgba(74,222,128,0.06)' : 'transparent',
              }}
            />
            <div
              onClick={() => steerTo(2)}
              style={{
                position: 'absolute', top: 0, bottom: 0, left: '66.66%', width: '33.33%',
                cursor: 'pointer',
                background: lane === 2 ? 'rgba(74,222,128,0.06)' : 'transparent',
              }}
            />

            {/* Falling Road Stripes (Vertical Scrolling) */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <React.Fragment key={i}>
                <div style={{
                  position: 'absolute', left: '33.33%', width: '6px', height: '40px',
                  top: `${((i * 70 + roadOffset * 2) % 560) - 40}px`,
                  background: '#fbbf24', borderRadius: '3px', transform: 'translateX(-50%)', opacity: 0.8,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', left: '66.66%', width: '6px', height: '40px',
                  top: `${((i * 70 + roadOffset * 2) % 560) - 40}px`,
                  background: '#fbbf24', borderRadius: '3px', transform: 'translateX(-50%)', opacity: 0.8,
                  pointerEvents: 'none',
                }} />
              </React.Fragment>
            ))}

            {/* Falling Word Items / Stars */}
            {items.map(item => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  left: laneX(item.lane),
                  top: `${item.y}px`,
                  transform: 'translate(-50%, -50%)',
                  padding: item.isObstacle ? '8px 12px' : '10px 16px',
                  borderRadius: '16px',
                  background: item.isTarget
                    ? 'linear-gradient(135deg, #f59e0b, #eab308)'
                    : item.isObstacle
                    ? 'rgba(15,23,42,0.9)'
                    : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  border: item.isTarget ? '2.5px solid #ffffff' : '1.5px solid rgba(255,255,255,0.4)',
                  boxShadow: item.isTarget
                    ? '0 0 20px #f59e0b, 0 6px 16px rgba(0,0,0,0.5)'
                    : '0 4px 12px rgba(0,0,0,0.4)',
                  color: item.isTarget ? '#78350f' : '#ffffff',
                  fontWeight: 900,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 20,
                  pointerEvents: 'none',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.word}</span>
              </div>
            ))}

            {/* Player's Race Car */}
            <div
              style={{
                position: 'absolute',
                left: laneX(lane),
                bottom: '30px',
                transform: `translate(-50%, 0) ${spinout ? 'rotate(180deg)' : speedBoost ? 'scale(1.2)' : ''}`,
                fontSize: '44px',
                zIndex: 30,
                transition: 'left 0.18s cubic-bezier(0.34,1.56,0.64,1), transform 0.25s',
                pointerEvents: 'none',
                filter: spinout ? 'hue-rotate(180deg)' : speedBoost ? 'brightness(1.5)' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.7))',
              }}
            >
              🏎️
              {speedBoost && <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', fontSize: '18px' }}>🔥</div>}
            </div>

            {/* Feedback Banner */}
            {feedback && (
              <div style={{
                position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
                zIndex: 50, padding: '8px 20px', borderRadius: '16px', fontWeight: 900, fontSize: '14px',
                background: feedback.type === 'good' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)',
                color: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.6)', border: '2px solid rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap',
              }}>
                {feedback.msg}
              </div>
            )}

            {/* On-Screen Steering Left / Right Buttons */}
            <div style={{
              position: 'absolute', bottom: '12px', left: '16px', right: '16px',
              display: 'flex', justifyContent: 'space-between', zIndex: 40, pointerEvents: 'none'
            }}>
              <button
                type="button"
                onClick={() => steerTo(lane - 1)}
                disabled={lane === 0}
                style={{
                  width: '64px', height: '54px', borderRadius: '14px',
                  background: lane === 0 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #10b981, #059669)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  color: lane === 0 ? '#64748b' : '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: lane === 0 ? 'default' : 'pointer',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
                  pointerEvents: 'auto',
                }}
              >
                <ArrowLeft size={28} strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={() => steerTo(lane + 1)}
                disabled={lane === 2}
                style={{
                  width: '64px', height: '54px', borderRadius: '14px',
                  background: lane === 2 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #10b981, #059669)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  color: lane === 2 ? '#64748b' : '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: lane === 2 ? 'default' : 'pointer',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
                  pointerEvents: 'auto',
                }}
              >
                <ArrowRight size={28} strokeWidth={3} />
              </button>
            </div>

            {/* Lexio Fox Mascot Assistant */}
            <ArcadeFoxHelper
              hintText={`Collect "${targetWord}" in the lane!`}
              triggerHint={foxTrigger}
              onHintUsed={() => setFoxTrigger(false)}
            />
          </div>
        </div>
      )}

      {/* GAME OVER STATE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px' }}>🏆</div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 900, color: '#4ade80' }}>
              Highway Run Finished!
            </h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1' }}>
              Final Score: <strong style={{ color: '#fbbf24', fontSize: '20px' }}>{score} pts</strong>
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px', background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <RotateCcw size={16} /> Race Again
          </button>
        </div>
      )}
    </div>
  );
}
