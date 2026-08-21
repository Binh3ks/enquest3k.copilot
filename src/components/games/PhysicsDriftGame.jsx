import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, ArrowLeft, ArrowRight, Zap, Sparkles, Trophy, Target } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * PhysicsDriftGame V3 — Highway Road Runner with Catch Explosion FX & Goal Tracking
 */

export default function PhysicsDriftGame({ weekNumber = 33, words = [], onComplete, isStandalone = false }) {
  const weekData = getWeekArcadeData(weekNumber);
  const wordBank = (words && words.length >= 4) ? words : weekData.words;

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wordsCaught, setWordsCaught] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [carXPct, setCarXPct] = useState(50); // 0 to 100%
  const [targetWord, setTargetWord] = useState('');
  const [items, setItems] = useState([]);
  const [roadOffset, setRoadOffset] = useState(0);
  const [speedBoost, setSpeedBoost] = useState(false);
  const [spinout, setSpinout] = useState(false);
  const [catchBurst, setCatchBurst] = useState(null); // { xPct, y, word }
  const [feedback, setFeedback] = useState(null);
  const [foxTrigger, setFoxTrigger] = useState(false);

  const containerRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const wordsCaughtRef = useRef(0);
  const carXRef = useRef(50);
  const targetRef = useRef('');
  const itemsRef = useRef([]);
  const gameStateRef = useRef('idle');
  const frameRef = useRef(null);
  const roadOffsetRef = useRef(0);
  const nextSpawnAtRef = useRef(0);
  const nextObstacleAtRef = useRef(0);
  const lastCatchTimeRef = useRef(Date.now());
  const keysPressed = useRef({});

  const { consumePlayEnergy, recordHighScore, highScores } = useArcadeStore();
  const personalBest = highScores['physics_drift'] || 0;
  const GOAL_WORDS = 10;

  const playAudio = useCallback((word) => {
    if (!word) return;
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    const matchObj = wordBank.find(w => w.word === word);
    speakText(word, matchObj?.audio_word, 0.92, null, 'new_word', weekNumber);
  }, [wordBank, weekNumber]);

  const pickNextTarget = useCallback(() => {
    const t = wordBank[Math.floor(Math.random() * wordBank.length)];
    targetRef.current = t.word;
    setTargetWord(t.word);
    lastCatchTimeRef.current = Date.now();
    setFoxTrigger(false);
    playAudio(t.word);
  }, [wordBank, playAudio]);

  // Game loop — continuous smooth physics
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    // Smooth keyboard steering
    if (keysPressed.current['ArrowLeft'] || keysPressed.current['a'] || keysPressed.current['A']) {
      carXRef.current = Math.max(12, carXRef.current - 1.8);
      setCarXPct(carXRef.current);
    }
    if (keysPressed.current['ArrowRight'] || keysPressed.current['d'] || keysPressed.current['D']) {
      carXRef.current = Math.min(88, carXRef.current + 1.8);
      setCarXPct(carXRef.current);
    }

    const speed = speedBoost ? 4.8 : spinout ? 0.9 : 2.5;
    roadOffsetRef.current = (roadOffsetRef.current + speed) % 60;
    setRoadOffset(roadOffsetRef.current);

    // Spawn falling word items randomly across road
    if (Date.now() >= nextSpawnAtRef.current) {
      nextSpawnAtRef.current = Date.now() + (speedBoost ? 1100 : 1500);

      const x1 = 15 + Math.random() * 32;
      const x2 = 53 + Math.random() * 32;

      const isLeftTarget = Math.random() > 0.5;
      const decoys = wordBank.filter(w => w.word !== targetRef.current);
      const decoyWord = decoys[Math.floor(Math.random() * decoys.length)]?.word || 'caution';

      const newItems = [
        {
          id: `item_${Date.now()}_1`,
          xPct: isLeftTarget ? x1 : x2,
          y: -40,
          word: targetRef.current,
          isTarget: true,
          isObstacle: false,
          icon: '⭐',
        },
        {
          id: `item_${Date.now()}_2`,
          xPct: isLeftTarget ? x2 : x1,
          y: -40 - (Math.random() * 30),
          word: decoyWord,
          isTarget: false,
          isObstacle: false,
          icon: '💎',
        }
      ];

      itemsRef.current = [...itemsRef.current, ...newItems];
    }

    // Rare single oil obstacle spawn (every ~10s)
    if (Date.now() >= nextObstacleAtRef.current) {
      nextObstacleAtRef.current = Date.now() + 9000 + Math.random() * 4000;
      itemsRef.current.push({
        id: `obs_${Date.now()}`,
        xPct: 20 + Math.random() * 60,
        y: -40,
        word: 'Oil Slick',
        isTarget: false,
        isObstacle: true,
        icon: '🛢️',
      });
    }

    // Move items down and check collisions
    const playerY = 360;
    let nextItems = [];

    itemsRef.current.forEach(item => {
      const nextY = item.y + speed;

      // Collision check
      if (Math.abs(nextY - playerY) < 32 && Math.abs(item.xPct - carXRef.current) < 14) {
        if (item.isTarget) {
          // COLLECTED TARGET STAR! (VISUAL EXPLOSION FX, NO AUDIO OVERLAP)
          scoreRef.current += 20;
          streakRef.current += 1;
          wordsCaughtRef.current += 1;

          setScore(scoreRef.current);
          setStreak(streakRef.current);
          setWordsCaught(wordsCaughtRef.current);
          setSpeedBoost(true);

          // Trigger Starburst Explosion at catch location
          setCatchBurst({ xPct: item.xPct, y: nextY, word: item.word });
          setTimeout(() => setCatchBurst(null), 600);

          setFeedback({ msg: `🌟 Caught "${item.word}"! (+20 pts)`, type: 'good' });

          setTimeout(() => {
            setSpeedBoost(false);
            setFeedback(null);
            pickNextTarget();
          }, 600);
        } else if (item.isObstacle) {
          // HIT OIL SLICK
          scoreRef.current = Math.max(0, scoreRef.current - 5);
          streakRef.current = 0;
          setScore(scoreRef.current);
          setStreak(0);
          setSpinout(true);
          setFeedback({ msg: `🛢️ Puddle Skid! (−5 pts)`, type: 'bad' });
          setFoxTrigger(true);

          setTimeout(() => {
            setSpinout(false);
            setFeedback(null);
          }, 1200);
        } else {
          // WRONG WORD
          scoreRef.current = Math.max(0, scoreRef.current - 2);
          setScore(scoreRef.current);
          setFeedback({ msg: `❌ That was "${item.word}" · Catch "${targetRef.current}"`, type: 'bad' });
          setFoxTrigger(true);
          setTimeout(() => setFeedback(null), 1100);
        }
        return; // Remove from canvas
      }

      if (nextY < 480) {
        nextItems.push({ ...item, y: nextY });
      }
    });

    itemsRef.current = nextItems;
    setItems(nextItems);

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [speedBoost, spinout, wordBank, pickNextTarget]);

  // Touch / Click to smoothly steer car to target X
  const handleRoadClick = (e) => {
    if (gameStateRef.current !== 'playing') return;
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;
    const clickXPct = Math.max(12, Math.min(88, ((e.clientX - cr.left) / cr.width) * 100));
    carXRef.current = clickXPct;
    setCarXPct(clickXPct);
  };

  // Keyboard events
  useEffect(() => {
    const onKeyDown = (e) => { keysPressed.current[e.key] = true; };
    const onKeyUp = (e) => { keysPressed.current[e.key] = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

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
    wordsCaughtRef.current = 0;
    carXRef.current = 50;
    itemsRef.current = [];
    nextSpawnAtRef.current = Date.now() + 500;
    nextObstacleAtRef.current = Date.now() + 6000;

    setScore(0);
    setStreak(0);
    setWordsCaught(0);
    setGameTimer(60);
    setCarXPct(50);
    setItems([]);
    setFeedback(null);
    setCatchBurst(null);
    setSpeedBoost(false);
    setSpinout(false);

    gameStateRef.current = 'playing';
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
    setTimeout(pickNextTarget, 100);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '450px',
      background: 'linear-gradient(180deg, #091a2e 0%, #0f2744 40%, #091a2e 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Top HUD with Goal & Personal Best */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🏎️</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#4ade80', letterSpacing: '0.05em' }}>ROAD RUNNER HIGHWAY</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              🎯 Goal: <b style={{ color: wordsCaught >= GOAL_WORDS ? '#4ade80' : '#fbbf24' }}>{wordsCaught}/{GOAL_WORDS} words</b>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {personalBest > 0 && (
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '8px', padding: '3px 8px' }}>
              🏆 Best: {personalBest}
            </div>
          )}
          {streak >= 3 && (
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={12} fill="#fbbf24" /> {streak}x STREAK
            </div>
          )}
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '4px 12px' }}>
            ⭐ {score} pts
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
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', maxWidth: '360px', lineHeight: 1.5 }}>
              Target: Catch <b>{GOAL_WORDS} target words</b> in 60 seconds! Tap anywhere or use <b>◀ / ▶</b> to glide into target word stars!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(5,150,105,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🏎️</span> START (GOAL: 10 WORDS)
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

          {/* Smooth Vertical Road Canvas */}
          <div
            ref={containerRef}
            onClick={handleRoadClick}
            style={{
              flex: 1, position: 'relative', background: '#1e293b', overflow: 'hidden',
              cursor: 'pointer', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)'
            }}
          >
            {/* Center Road Stripes (Smooth vertical scrolling) */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <React.Fragment key={i}>
                <div style={{
                  position: 'absolute', left: '33.33%', width: '5px', height: '36px',
                  top: `${((i * 65 + roadOffset * 2) % 520) - 40}px`,
                  background: '#fbbf24', borderRadius: '3px', transform: 'translateX(-50%)', opacity: 0.7,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', left: '66.66%', width: '5px', height: '36px',
                  top: `${((i * 65 + roadOffset * 2) % 520) - 40}px`,
                  background: '#fbbf24', borderRadius: '3px', transform: 'translateX(-50%)', opacity: 0.7,
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
                  left: `${item.xPct}%`,
                  top: `${item.y}px`,
                  transform: 'translate(-50%, -50%)',
                  padding: item.isObstacle ? '8px 12px' : '10px 16px',
                  borderRadius: '16px',
                  background: item.isTarget
                    ? 'linear-gradient(135deg, #f59e0b, #eab308)'
                    : item.isObstacle
                    ? 'rgba(15,23,42,0.92)'
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
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.word}</span>
              </div>
            ))}

            {/* Catch Burst Explosion Effect */}
            {catchBurst && (
              <div style={{
                position: 'absolute',
                left: `${catchBurst.xPct}%`,
                top: `${catchBurst.y}px`,
                transform: 'translate(-50%, -50%) scale(1.6)',
                zIndex: 35,
                pointerEvents: 'none',
                animation: 'zoomIn 0.3s ease-out',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'radial-gradient(circle, #fef08a 0%, #eab308 60%, transparent 100%)',
                padding: '12px 20px',
                borderRadius: '30px',
                color: '#713f12',
                fontWeight: 900,
                fontSize: '16px',
                boxShadow: '0 0 30px #facc15',
              }}>
                <span>💥 +20 PTS!</span>
              </div>
            )}

            {/* Player's Race Car */}
            <div
              style={{
                position: 'absolute',
                left: `${carXPct}%`,
                bottom: '30px',
                transform: `translate(-50%, 0) ${spinout ? 'rotate(180deg)' : speedBoost ? 'scale(1.2)' : ''}`,
                fontSize: '44px',
                zIndex: 30,
                transition: 'left 0.15s ease-out, transform 0.25s',
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
                onMouseDown={() => { carXRef.current = Math.max(12, carXRef.current - 16); setCarXPct(carXRef.current); }}
                onTouchStart={() => { carXRef.current = Math.max(12, carXRef.current - 16); setCarXPct(carXRef.current); }}
                style={{
                  width: '64px', height: '54px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
                  pointerEvents: 'auto',
                }}
              >
                <ArrowLeft size={28} strokeWidth={3} />
              </button>
              <button
                type="button"
                onMouseDown={() => { carXRef.current = Math.min(88, carXRef.current + 16); setCarXPct(carXRef.current); }}
                onTouchStart={() => { carXRef.current = Math.min(88, carXRef.current + 16); setCarXPct(carXRef.current); }}
                style={{
                  width: '64px', height: '54px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
                  pointerEvents: 'auto',
                }}
              >
                <ArrowRight size={28} strokeWidth={3} />
              </button>
            </div>

            {/* Lexio Fox Mascot on Bottom-Left */}
            <ArcadeFoxHelper
              hintText={`Catch "${targetWord}" star on the road!`}
              triggerHint={foxTrigger}
              onHintUsed={() => setFoxTrigger(false)}
            />
          </div>
        </div>
      )}

      {/* GAME OVER STATE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px' }}>{wordsCaught >= GOAL_WORDS ? '🏆' : '⭐'}</div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 900, color: '#4ade80' }}>
              {wordsCaught >= GOAL_WORDS ? 'Target Achieved! Road Legend!' : 'Highway Run Finished!'}
            </h3>
            <p style={{ margin: '0 0 6px', fontSize: '15px', color: '#cbd5e1' }}>
              Caught: <strong style={{ color: wordsCaught >= GOAL_WORDS ? '#4ade80' : '#fbbf24' }}>{wordsCaught} words</strong> (Goal: {GOAL_WORDS})
            </p>
            <p style={{ margin: 0, fontSize: '16px', color: '#cbd5e1' }}>
              Final Score: <strong style={{ color: '#fbbf24', fontSize: '22px' }}>{score} pts</strong>
              {score > personalBest && <span style={{ color: '#4ade80', fontSize: '13px', marginLeft: '8px', fontWeight: 900 }}>🔥 NEW BEST!</span>}
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
