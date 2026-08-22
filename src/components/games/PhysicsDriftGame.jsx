import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { RotateCcw, Volume2, ArrowLeft, ArrowRight, Zap, Sparkles, Trophy, Target, Timer } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import { playDriftSound, playCorrectSound, playWrongSound, playVictoryFanfare, playButtonClick } from '../../utils/soundEffects';
import { duckArcadeBgm } from '../../utils/arcadeBgm';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * PhysicsDriftGame V3 — Highway Road Runner with Reflex Speed Metric & Speedrun Time Attack
 */

export default function PhysicsDriftGame({ weekNumber = 33, words = [], onExit, isStandalone = false }) {
  const weekData = getWeekArcadeData(weekNumber);
  const wordBank = useMemo(() => {
    const raw = (words && words.length >= 4) ? words : weekData.words;
    return raw.map(w => typeof w === 'string' ? { word: w, audio_word: null } : w);
  }, [words, weekData.words]);

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wordsCaught, setWordsCaught] = useState(0);
  const [gameTimer, setGameTimer] = useState(180); // 3 minutes
  const [carXPct, setCarXPct] = useState(50); // 0 to 100%
  const [targetWord, setTargetWord] = useState('');
  const [items, setItems] = useState([]);
  const [skidMarks, setSkidMarks] = useState([]);
  const [roadOffset, setRoadOffset] = useState(0);
  const [speedBoost, setSpeedBoost] = useState(false);
  const [isSkidding, setIsSkidding] = useState(false);
  const [skidRotation, setSkidRotation] = useState(0);
  const [zoomingWord, setZoomingWord] = useState(null);
  const [catchBurst, setCatchBurst] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [foxTrigger, setFoxTrigger] = useState(false);
  const [fastestReflex, setFastestReflex] = useState(null);
  const [speedrunClearTime, setSpeedrunClearTime] = useState(null);

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
  const spawnTimestampRef = useRef(Date.now());
  const startTimeRef = useRef(Date.now());
  const fastestReflexRef = useRef(null);
  const keysPressed = useRef({});

  const { consumePlayEnergy, recordHighScore, highScores, recordBestReaction, recordSpeedrunTime, bestReactionTimes, bestSpeedrunTimes } = useArcadeStore();
  const personalBest = highScores['physics_drift'] || 0;
  const storedBestReflex = bestReactionTimes['physics_drift'] || null;
  const storedBestSpeedrun = bestSpeedrunTimes['physics_drift'] || null;
  const GOAL_WORDS = 20; // 20 words in 3 minutes

  const playAudio = useCallback((word) => {
    if (!word) return;
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    duckArcadeBgm(2000);
    const matchObj = wordBank.find(w => w.word === word);
    speakText(word, matchObj?.audio_word, 0.92, null, 'new_word', weekNumber);
  }, [wordBank, weekNumber]);

  const pickNextTarget = useCallback(() => {
    if (!wordBank || wordBank.length === 0) return;
    const t = wordBank[Math.floor(Math.random() * wordBank.length)];
    const wordStr = t?.word || 'caution';
    targetRef.current = wordStr;
    setTargetWord(wordStr);
    lastCatchTimeRef.current = Date.now();
    spawnTimestampRef.current = Date.now();
    setFoxTrigger(false);
    playAudio(wordStr);
  }, [wordBank, playAudio]);

  const endGame = useCallback((isSpeedrunVictory = false) => {
    gameStateRef.current = 'done';
    setGameState('done');
    cancelAnimationFrame(frameRef.current);

    if (isSpeedrunVictory) {
      const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
      setSpeedrunClearTime(elapsedSec);
      recordSpeedrunTime('physics_drift', elapsedSec);
    }

    recordHighScore('physics_drift', scoreRef.current);
  }, [recordHighScore, recordSpeedrunTime]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

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

    const playerY = 360;
    let nextItems = [];

    itemsRef.current.forEach(item => {
      const nextY = item.y + speed;

      if (Math.abs(nextY - playerY) < 32 && Math.abs(item.xPct - carXRef.current) < 15) {
        if (item.isTarget) {
          // Calculate Reflex Reaction Time
          const reflexSec = (Date.now() - spawnTimestampRef.current) / 1000;
          const isLightning = reflexSec <= 2.0;
          const speedBonus = isLightning ? 5 : 0;

          if (!fastestReflexRef.current || reflexSec < fastestReflexRef.current) {
            fastestReflexRef.current = reflexSec;
            setFastestReflex(reflexSec);
            recordBestReaction('physics_drift', reflexSec);
          }

          playCorrectSound();
          scoreRef.current += (20 + speedBonus);
          streakRef.current += 1;
          wordsCaughtRef.current += 1;

          setScore(scoreRef.current);
          setStreak(streakRef.current);
          setWordsCaught(wordsCaughtRef.current);
          setSpeedBoost(true);

          setZoomingWord({ xPct: item.xPct, y: nextY - 10, word: item.word });

          setTimeout(() => {
            setZoomingWord(null);
            setCatchBurst({ xPct: item.xPct, y: nextY - 10 });
            setTimeout(() => setCatchBurst(null), 500);
          }, 220);

          if (isLightning) {
            setFeedback({ msg: `⚡ LIGHTNING DRIFT: ${reflexSec.toFixed(2)}s! (+${20 + speedBonus} pts)`, type: 'good' });
          } else {
            setFeedback({ msg: `🌟 Caught "${item.word}"! (${reflexSec.toFixed(1)}s) (+20 pts)`, type: 'good' });
          }

          // Speedrun Victory Check (All 20 words caught early!)
          if (wordsCaughtRef.current >= GOAL_WORDS) {
            playVictoryFanfare();
            const timeBonus = Math.floor(gameTimer * 2);
            scoreRef.current += timeBonus;
            setScore(scoreRef.current);
            endGame(true);
            return;
          }

          setTimeout(() => {
            setSpeedBoost(false);
            setFeedback(null);
            pickNextTarget();
          }, 700);
        } else if (item.isObstacle) {
          playDriftSound();
          playWrongSound();
          scoreRef.current = Math.max(0, scoreRef.current - 5);
          streakRef.current = 0;
          setScore(scoreRef.current);
          setStreak(0);
          setIsSkidding(true);
          setSkidRotation(720);

          setSkidMarks(prev => [...prev.slice(-4), { id: Date.now(), xPct: carXRef.current, y: playerY }]);

          const swerveDir = Math.random() > 0.5 ? 18 : -18;
          carXRef.current = Math.max(15, Math.min(85, carXRef.current + swerveDir));
          setCarXPct(carXRef.current);

          setFeedback({ msg: `🛢️ Oil Skid Spinout! (−5 pts)`, type: 'bad' });
          setFoxTrigger(true);

          setTimeout(() => {
            setIsSkidding(false);
            setSkidRotation(0);
            setFeedback(null);
          }, 1100);
        } else {
          playWrongSound();
          scoreRef.current = Math.max(0, scoreRef.current - 2);
          setScore(scoreRef.current);
          setFeedback({ msg: `❌ That was "${item.word}" · Catch "${targetRef.current}"`, type: 'bad' });
          setFoxTrigger(true);
          setTimeout(() => setFeedback(null), 1100);
        }
        return;
      }

      if (nextY < 480) {
        nextItems.push({ ...item, y: nextY });
      }
    });

    itemsRef.current = nextItems;
    setItems(nextItems);

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [speedBoost, isSkidding, wordBank, pickNextTarget, gameTimer, endGame, recordBestReaction]);

  const handleRoadClick = (e) => {
    if (gameStateRef.current !== 'playing' || isSkidding) return;
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;
    const clickXPct = Math.max(12, Math.min(88, ((e.clientX - cr.left) / cr.width) * 100));
    carXRef.current = clickXPct;
    setCarXPct(clickXPct);
  };

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

  // 1-second clock
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(false); return; }
      }
      setGameTimer(t => {
        if (t <= 1) { endGame(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [gameState, isStandalone, endGame]);

  const startGame = () => {
    playButtonClick();
    scoreRef.current = 0;
    streakRef.current = 0;
    wordsCaughtRef.current = 0;
    carXRef.current = 50;
    itemsRef.current = [];
    nextSpawnAtRef.current = Date.now() + 400;
    nextObstacleAtRef.current = Date.now() + 6000;
    fastestReflexRef.current = null;
    startTimeRef.current = Date.now();

    setScore(0);
    setStreak(0);
    setWordsCaught(0);
    setGameTimer(180); // 3 minutes
    setCarXPct(50);
    setItems([]);
    setSkidMarks([]);
    setFeedback(null);
    setZoomingWord(null);
    setCatchBurst(null);
    setSpeedBoost(false);
    setIsSkidding(false);
    setSkidRotation(0);
    setFastestReflex(null);
    setSpeedrunClearTime(null);

    gameStateRef.current = 'playing';
    setGameState('playing');
    pickNextTarget();
    frameRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '420px',
      background: 'linear-gradient(180deg, #091a2e 0%, #0f2744 40%, #091a2e 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Top HUD with Speed & Reflex Metrics */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 12px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🏎️</span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#4ade80', letterSpacing: '0.04em' }}>ROAD RUNNER</div>
            <div style={{ fontSize: '9px', color: '#94a3b8' }}>
              🎯 <b style={{ color: wordsCaught >= GOAL_WORDS ? '#4ade80' : '#fbbf24' }}>{wordsCaught}/{GOAL_WORDS} words</b>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {(fastestReflex || storedBestReflex) && (
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#fde047', background: 'rgba(253,224,71,0.12)', border: '1px solid rgba(253,224,71,0.3)', borderRadius: '6px', padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Zap size={10} fill="#fde047" /> ⚡ {(fastestReflex || storedBestReflex).toFixed(2)}s
            </div>
          )}
          {streak >= 3 && (
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '6px', padding: '2px 6px' }}>
              ⚡ {streak}x
            </div>
          )}
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '6px', padding: '3px 8px' }}>
            ⭐ {score}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#7dd3fc', background: 'rgba(125,211,252,0.1)', border: '1px solid rgba(125,211,252,0.25)', borderRadius: '6px', padding: '3px 8px' }}>
            ⏱ {Math.floor(gameTimer / 60)}:{String(gameTimer % 60).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* IDLE STATE (Lifted, compact, ultra-responsive start button) */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '24px', gap: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 12px rgba(74,222,128,0.5))' }}>🏎️</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 900, color: '#4ade80' }}>
              Highway Word Collector!
            </h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#cbd5e1', maxWidth: '300px', lineHeight: 1.4 }}>
              Catch all <b>{GOAL_WORDS} target words</b> in record time! Fast drift catches earn <b>⚡ Speed Bonus (+5 pts)</b>!
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            onTouchEnd={(e) => { e.preventDefault(); startGame(); }}
            style={{
              padding: '10px 24px', background: 'linear-gradient(135deg, #059669, #0d9488)',
              color: '#fff', fontWeight: 900, fontSize: '13px', borderRadius: '12px',
              border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(5,150,105,0.4)',
              display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px',
            }}
          >
            <span>🏎️</span> START SPEEDRUN
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Target Word Banner */}
          <div style={{
            padding: '5px 12px', background: 'rgba(74,222,128,0.18)',
            borderBottom: '1px solid rgba(74,222,128,0.3)', textAlign: 'center', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 10,
          }}>
            <span style={{ fontSize: '10px', color: '#86efac', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              COLLECT TARGET:
            </span>
            <span style={{ fontSize: '16px', color: '#f8fafc', fontWeight: 900, textShadow: '0 2px 6px rgba(74,222,128,0.8)' }}>
              {targetWord}
            </span>
            <button
              type="button"
              onClick={() => playAudio(targetWord)}
              style={{
                background: 'rgba(74,222,128,0.2)', border: '1px solid rgba(74,222,128,0.4)',
                color: '#86efac', borderRadius: '6px', padding: '2px 6px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 800
              }}
            >
              <Volume2 size={13} /> <span>Listen</span>
            </button>
          </div>

          {/* Road Canvas */}
          <div
            ref={containerRef}
            onClick={handleRoadClick}
            style={{
              flex: 1, position: 'relative', background: '#1e293b', overflow: 'hidden',
              cursor: 'pointer', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)'
            }}
          >
            {/* Center Stripes */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <React.Fragment key={i}>
                <div style={{
                  position: 'absolute', left: '33.33%', width: '4px', height: '30px',
                  top: `${((i * 65 + roadOffset * 2) % 520) - 40}px`,
                  background: '#fbbf24', borderRadius: '2px', transform: 'translateX(-50%)', opacity: 0.7,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', left: '66.66%', width: '4px', height: '30px',
                  top: `${((i * 65 + roadOffset * 2) % 520) - 40}px`,
                  background: '#fbbf24', borderRadius: '2px', transform: 'translateX(-50%)', opacity: 0.7,
                  pointerEvents: 'none',
                }} />
              </React.Fragment>
            ))}

            {/* Skid Marks */}
            {skidMarks.map(sm => (
              <div key={sm.id} style={{
                position: 'absolute', left: `${sm.xPct}%`, top: `${sm.y}px`,
                transform: 'translate(-50%, -50%)', width: '38px', height: '24px',
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.85) 0%, transparent 80%)',
                borderRadius: '8px', zIndex: 10, pointerEvents: 'none'
              }} />
            ))}

            {/* Falling Word Items */}
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

            {/* STAGE 1: ZOOMING WORD POPUP (Compact for mobile) */}
            {zoomingWord && (
              <div style={{
                position: 'absolute',
                left: `${zoomingWord.xPct}%`,
                top: `${zoomingWord.y}px`,
                transform: 'translate(-50%, -50%) scale(1.15)',
                zIndex: 40,
                pointerEvents: 'none',
                padding: '6px 12px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #fef08a, #facc15)',
                border: '2px solid #ffffff',
                boxShadow: '0 0 18px #facc15, 0 6px 16px rgba(0,0,0,0.5)',
                color: '#713f12',
                fontWeight: 900,
                fontSize: '12px',
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
                animation: 'zoomIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}>
                ⭐ {zoomingWord.word}
              </div>
            )}

            {/* STAGE 2: CATCH BURST EXPLOSION (Compact for mobile) */}
            {catchBurst && (
              <div style={{
                position: 'absolute',
                left: `${catchBurst.xPct}%`,
                top: `${catchBurst.y}px`,
                transform: 'translate(-50%, -50%) scale(1.1)',
                zIndex: 38,
                pointerEvents: 'none',
                animation: 'zoomIn 0.3s ease-out',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'radial-gradient(circle, #fef08a 0%, #eab308 60%, transparent 100%)',
                padding: '6px 14px',
                borderRadius: '20px',
                color: '#713f12',
                fontWeight: 900,
                fontSize: '13px',
                boxShadow: '0 0 18px #facc15',
                whiteSpace: 'nowrap',
              }}>
                <span>💥 +20 PTS!</span>
              </div>
            )}

            {/* TOP-DOWN VERTICAL RACING CAR */}
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
              <div style={{
                width: '36px', height: '40px',
                background: 'linear-gradient(180deg, rgba(254,240,138,0.4) 0%, transparent 100%)',
                clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                marginBottom: '-12px', opacity: 0.8,
              }} />

              <svg width="42" height="68" viewBox="0 0 42 68" fill="none">
                <rect x="0" y="8" width="8" height="16" rx="3" fill="#0f172a" stroke="#334155" />
                <rect x="34" y="8" width="8" height="16" rx="3" fill="#0f172a" stroke="#334155" />
                <rect x="0" y="44" width="8" height="18" rx="3" fill="#0f172a" stroke="#334155" />
                <rect x="34" y="44" width="8" height="18" rx="3" fill="#0f172a" stroke="#334155" />
                <path d="M7 20 C7 8, 14 2, 21 2 C28 2, 35 8, 35 20 L35 56 C35 62, 28 64, 21 64 C14 64, 7 62, 7 56 Z" fill="url(#carPaint3)" stroke="#ffffff" strokeWidth="1.5" />
                <path d="M18 6 L24 6 L22 22 L20 22 Z" fill="#ffffff" opacity="0.9" />
                <ellipse cx="21" cy="30" rx="9" ry="11" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <ellipse cx="19" cy="27" rx="5" ry="6" fill="#7dd3fc" opacity="0.6" />
                <rect x="4" y="60" width="34" height="6" rx="2" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.2" />

                <defs>
                  <linearGradient id="carPaint3" x1="7" y1="2" x2="35" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ef4444" />
                    <stop offset="0.5" stopColor="#dc2626" />
                    <stop offset="1" stopColor="#991b1b" />
                  </linearGradient>
                </defs>
              </svg>

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

            {/* Steering Buttons (Compact) */}
            <div style={{
              position: 'absolute', bottom: '10px', left: '16px', right: '16px',
              display: 'flex', justifyContent: 'space-between', zIndex: 40, pointerEvents: 'none'
            }}>
              <button
                type="button"
                onMouseDown={() => { playDriftSound(); carXRef.current = Math.max(12, carXRef.current - 14); setCarXPct(carXRef.current); }}
                onTouchStart={() => { playDriftSound(); carXRef.current = Math.max(12, carXRef.current - 14); setCarXPct(carXRef.current); }}
                style={{
                  width: '46px', height: '40px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  pointerEvents: 'auto',
                }}
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </button>
              <button
                type="button"
                onMouseDown={() => { playDriftSound(); carXRef.current = Math.min(88, carXRef.current + 14); setCarXPct(carXRef.current); }}
                onTouchStart={() => { playDriftSound(); carXRef.current = Math.min(88, carXRef.current + 14); setCarXPct(carXRef.current); }}
                style={{
                  width: '46px', height: '40px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  pointerEvents: 'auto',
                }}
              >
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Top-Right Fox Helper */}
            <ArcadeFoxHelper
              hintText={`Catch "${targetWord}" star!`}
              triggerHint={foxTrigger}
              onHintUsed={() => setFoxTrigger(false)}
            />
          </div>
        </div>
      )}

      {/* GAME OVER / RESULTS STATE (Lifted, compact) */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px', gap: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px' }}>{wordsCaught >= GOAL_WORDS ? '🏆' : '⏱️'}</div>
          <div>
            <h3 style={{
              margin: '0 0 4px', fontSize: '17px', fontWeight: 900,
              color: wordsCaught >= GOAL_WORDS ? '#4ade80' : '#ef4444'
            }}>
              {wordsCaught >= GOAL_WORDS ? '⚡ RACE COMPLETE!' : "Time's Up — Game Over!"}
            </h3>
            <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#cbd5e1' }}>
              Caught: <strong style={{ color: wordsCaught >= GOAL_WORDS ? '#4ade80' : '#fbbf24' }}>{wordsCaught}/{GOAL_WORDS} words</strong>
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
              background: 'linear-gradient(135deg, #059669, #0d9488)',
              color: '#fff', fontWeight: 900, fontSize: '12px', borderRadius: '10px',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <RotateCcw size={14} /> {wordsCaught >= GOAL_WORDS ? 'Race Again' : 'Try Again'}
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
