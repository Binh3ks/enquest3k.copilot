import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, ArrowLeft, ArrowRight, Zap, Sparkles, Trophy, Target } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * PhysicsDriftGame V3 — Highway Road Runner with Top-Down Vertical Car & Realistic Oil Skid Physics
 */

// Synthesize a realistic tire skid brake screech with Web Audio API
function playTireScreech() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.38);
  } catch (_) {}
}

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
  const [skidMarks, setSkidMarks] = useState([]); // [{ id, xPct, y }]
  const [roadOffset, setRoadOffset] = useState(0);
  const [speedBoost, setSpeedBoost] = useState(false);
  const [isSkidding, setIsSkidding] = useState(false);
  const [skidRotation, setSkidRotation] = useState(0);
  const [zoomingWord, setZoomingWord] = useState(null); // Stage 1: { xPct, y, word }
  const [catchBurst, setCatchBurst] = useState(null); // Stage 2: { xPct, y }
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

    // Smooth keyboard steering (disabled during wild oil spinout)
    if (!isSkidding) {
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['a'] || keysPressed.current['A']) {
        carXRef.current = Math.max(12, carXRef.current - 1.8);
        setCarXPct(carXRef.current);
      }
      if (keysPressed.current['ArrowRight'] || keysPressed.current['d'] || keysPressed.current['D']) {
        carXRef.current = Math.min(88, carXRef.current + 1.8);
        setCarXPct(carXRef.current);
      }
    }

    const speed = speedBoost ? 4.8 : isSkidding ? 1.0 : 2.5;
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

    // Move items down and check physical hit collision
    const playerY = 360;
    let nextItems = [];

    itemsRef.current.forEach(item => {
      const nextY = item.y + speed;

      // Solid bounding box hit detection
      if (Math.abs(nextY - playerY) < 32 && Math.abs(item.xPct - carXRef.current) < 15) {
        if (item.isTarget) {
          // HIT TARGET!
          scoreRef.current += 20;
          streakRef.current += 1;
          wordsCaughtRef.current += 1;

          setScore(scoreRef.current);
          setStreak(streakRef.current);
          setWordsCaught(wordsCaughtRef.current);
          setSpeedBoost(true);

          // STAGE 1: Zoom word huge at point of hit
          setZoomingWord({ xPct: item.xPct, y: nextY - 10, word: item.word });

          // STAGE 2: Burst explosion +20 PTS after 220ms
          setTimeout(() => {
            setZoomingWord(null);
            setCatchBurst({ xPct: item.xPct, y: nextY - 10 });
            setTimeout(() => setCatchBurst(null), 500);
          }, 220);

          setFeedback({ msg: `🌟 Caught "${item.word}"! (+20 pts)`, type: 'good' });

          setTimeout(() => {
            setSpeedBoost(false);
            setFeedback(null);
            pickNextTarget();
          }, 700);
        } else if (item.isObstacle) {
          // HIT OIL SLICK -> REALISTIC 720° SPINOUT & TIRE SCREECH
          scoreRef.current = Math.max(0, scoreRef.current - 5);
          streakRef.current = 0;
          setScore(scoreRef.current);
          setStreak(0);
          setIsSkidding(true);
          setSkidRotation(720);

          // Add skid tire marks behind car
          setSkidMarks(prev => [...prev.slice(-4), { id: Date.now(), xPct: carXRef.current, y: playerY }]);

          // Swerve car violently left or right
          const swerveDir = Math.random() > 0.5 ? 18 : -18;
          carXRef.current = Math.max(15, Math.min(85, carXRef.current + swerveDir));
          setCarXPct(carXRef.current);

          playTireScreech();
          setFeedback({ msg: `🛢️ Oil Skid Spinout! (−5 pts)`, type: 'bad' });
          setFoxTrigger(true);

          setTimeout(() => {
            setIsSkidding(false);
            setSkidRotation(0);
            setFeedback(null);
          }, 1100);
        } else {
          // WRONG WORD
          scoreRef.current = Math.max(0, scoreRef.current - 2);
          setScore(scoreRef.current);
          setFeedback({ msg: `❌ That was "${item.word}" · Catch "${targetRef.current}"`, type: 'bad' });
          setFoxTrigger(true);
          setTimeout(() => setFeedback(null), 1100);
        }
        return; // Remove from road
      }

      if (nextY < 480) {
        nextItems.push({ ...item, y: nextY });
      }
    });

    itemsRef.current = nextItems;
    setItems(nextItems);

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [speedBoost, isSkidding, wordBank, pickNextTarget]);

  // Touch / Click to smoothly steer car to target X
  const handleRoadClick = (e) => {
    if (gameStateRef.current !== 'playing' || isSkidding) return;
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
    setSkidMarks([]);
    setFeedback(null);
    setZoomingWord(null);
    setCatchBurst(null);
    setSpeedBoost(false);
    setIsSkidding(false);
    setSkidRotation(0);

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
              Target: Catch <b>{GOAL_WORDS} target words</b> in 60 seconds! Glide your vertical race car into target word stars! Watch out for oil slicks!
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

            {/* Skid Marks left on road during spinouts */}
            {skidMarks.map(sm => (
              <div key={sm.id} style={{
                position: 'absolute', left: `${sm.xPct}%`, top: `${sm.y}px`,
                transform: 'translate(-50%, -50%)', width: '38px', height: '24px',
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.85) 0%, transparent 80%)',
                borderRadius: '8px', zIndex: 10, pointerEvents: 'none'
              }} />
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
                    ? 'radial-gradient(circle, #0f172a 0%, #000000 100%)'
                    : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  border: item.isTarget ? '2.5px solid #ffffff' : item.isObstacle ? '2px solid #64748b' : '1.5px solid rgba(255,255,255,0.4)',
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

            {/* STAGE 1: ZOOMING WORD POPUP (Phóng to chữ cực đại ngay khi hit) */}
            {zoomingWord && (
              <div style={{
                position: 'absolute',
                left: `${zoomingWord.xPct}%`,
                top: `${zoomingWord.y}px`,
                transform: 'translate(-50%, -50%) scale(2.4)',
                zIndex: 40,
                pointerEvents: 'none',
                padding: '10px 18px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #fef08a, #facc15)',
                border: '3px solid #ffffff',
                boxShadow: '0 0 35px #facc15, 0 10px 30px rgba(0,0,0,0.7)',
                color: '#713f12',
                fontWeight: 900,
                fontSize: '15px',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                animation: 'zoomIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}>
                ⭐ {zoomingWord.word}
              </div>
            )}

            {/* STAGE 2: CATCH BURST EXPLOSION (Nổ tung hào quang +20 PTS) */}
            {catchBurst && (
              <div style={{
                position: 'absolute',
                left: `${catchBurst.xPct}%`,
                top: `${catchBurst.y}px`,
                transform: 'translate(-50%, -50%) scale(1.8)',
                zIndex: 38,
                pointerEvents: 'none',
                animation: 'zoomIn 0.3s ease-out',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'radial-gradient(circle, #fef08a 0%, #eab308 60%, transparent 100%)',
                padding: '12px 22px',
                borderRadius: '30px',
                color: '#713f12',
                fontWeight: 900,
                fontSize: '18px',
                boxShadow: '0 0 35px #facc15',
                whiteSpace: 'nowrap',
              }}>
                <span>💥 +20 PTS!</span>
              </div>
            )}

            {/* TOP-DOWN VERTICAL RACING CAR (Faces straight UP ⬆️) */}
            <div
              style={{
                position: 'absolute',
                left: `${carXPct}%`,
                bottom: '24px',
                transform: `translate(-50%, 0) rotate(${skidRotation}deg) ${speedBoost ? 'scale(1.15)' : ''}`,
                zIndex: 30,
                transition: isSkidding ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), left 0.4s' : 'left 0.12s ease-out, transform 0.2s',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Headlights Light Beams */}
              <div style={{
                width: '36px', height: '40px',
                background: 'linear-gradient(180deg, rgba(254,240,138,0.4) 0%, transparent 100%)',
                clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                marginBottom: '-12px', opacity: 0.8,
              }} />

              {/* Crisp Top-Down Vertical Car Body SVG */}
              <svg width="42" height="68" viewBox="0 0 42 68" fill="none">
                {/* 4 Tires */}
                <rect x="0" y="8" width="8" height="16" rx="3" fill="#0f172a" stroke="#334155" />
                <rect x="34" y="8" width="8" height="16" rx="3" fill="#0f172a" stroke="#334155" />
                <rect x="0" y="44" width="8" height="18" rx="3" fill="#0f172a" stroke="#334155" />
                <rect x="34" y="44" width="8" height="18" rx="3" fill="#0f172a" stroke="#334155" />

                {/* Main Aerodynamic Chassis */}
                <path d="M7 20 C7 8, 14 2, 21 2 C28 2, 35 8, 35 20 L35 56 C35 62, 28 64, 21 64 C14 64, 7 62, 7 56 Z" fill="url(#carPaint)" stroke="#ffffff" strokeWidth="1.5" />

                {/* Front Hood Scoop & Stripes */}
                <path d="M18 6 L24 6 L22 22 L20 22 Z" fill="#ffffff" opacity="0.9" />

                {/* Windshield Cockpit */}
                <ellipse cx="21" cy="30" rx="9" ry="11" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <ellipse cx="19" cy="27" rx="5" ry="6" fill="#7dd3fc" opacity="0.6" />

                {/* Rear Spoiler Wing */}
                <rect x="4" y="60" width="34" height="6" rx="2" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.2" />

                <defs>
                  <linearGradient id="carPaint" x1="7" y1="2" x2="35" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ef4444" />
                    <stop offset="0.5" stopColor="#dc2626" />
                    <stop offset="1" stopColor="#991b1b" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Fire exhaust / Smoke when skidding */}
              {speedBoost && (
                <div style={{ fontSize: '18px', marginTop: '-6px', animation: 'bounce 0.2s infinite' }}>🔥</div>
              )}
              {isSkidding && (
                <div style={{ fontSize: '20px', marginTop: '-10px', filter: 'blur(1px)' }}>💨</div>
              )}
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

      {/* GAME OVER STATE (Clear Time's Up / Goal indicator) */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px' }}>{wordsCaught >= GOAL_WORDS ? '🏆' : '⏱️'}</div>
          <div>
            <h3 style={{
              margin: '0 0 6px', fontSize: '24px', fontWeight: 900,
              color: wordsCaught >= GOAL_WORDS ? '#4ade80' : '#ef4444'
            }}>
              {wordsCaught >= GOAL_WORDS ? 'Target Achieved! Road Legend!' : "Time's Up — Game Over!"}
            </h3>
            <p style={{ margin: '0 0 6px', fontSize: '15px', color: '#cbd5e1' }}>
              Caught: <strong style={{ color: wordsCaught >= GOAL_WORDS ? '#4ade80' : '#fbbf24' }}>{wordsCaught}/{GOAL_WORDS} words</strong>
              {wordsCaught < GOAL_WORDS && <span style={{ color: '#94a3b8', fontSize: '12px', display: 'block', marginTop: '4px' }}>Goal was {GOAL_WORDS} words in 60s</span>}
            </p>
            <p style={{ margin: 0, fontSize: '16px', color: '#cbd5e1' }}>
              Final Score: <strong style={{ color: '#fbbf24', fontSize: '22px' }}>{score} pts</strong>
              {score > personalBest && <span style={{ color: '#4ade80', fontSize: '13px', marginLeft: '8px', fontWeight: 900 }}>🔥 NEW BEST!</span>}
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px',
            background: wordsCaught >= GOAL_WORDS
              ? 'linear-gradient(135deg, #059669, #0d9488)'
              : 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <RotateCcw size={16} /> {wordsCaught >= GOAL_WORDS ? 'Race Again' : 'Try Again'}
          </button>
        </div>
      )}
    </div>
  );
}
