import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, RotateCcw, Trophy, Zap, Target, Sparkles, CheckCircle2, Timer } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * BubblePopGame V3 — Realistic Floating Bubbles with Speedrun Time Attack & Reflex Metric
 */

export default function BubblePopGame({ weekNumber = 33, words = [], onExit, isStandalone = false }) {
  const weekData = getWeekArcadeData(weekNumber);
  const activeWordObjects = (words && words.length >= 4)
    ? words.map(w => typeof w === 'string' ? { word: w, audio_word: null } : w)
    : weekData.words;

  const activeWords = activeWordObjects.map(w => w.word);

  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'done'
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wordsPopped, setWordsPopped] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [gameTimer, setGameTimer] = useState(180);
  const [bubbles, setBubbles] = useState([]);
  const [inkSplat, setInkSplat] = useState(null);
  const [showPenalty, setShowPenalty] = useState(false);
  const [revealMsg, setRevealMsg] = useState(null);
  const [foxTrigger, setFoxTrigger] = useState(false);
  const [fastestReflex, setFastestReflex] = useState(null);
  const [speedrunClearTime, setSpeedrunClearTime] = useState(null);

  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const wordsPoppedRef = useRef(0);
  const targetRef = useRef('');
  const animFrameRef = useRef(null);
  const gameStateRef = useRef('idle');
  const lastCatchTimeRef = useRef(Date.now());
  const spawnTimestampRef = useRef(Date.now());
  const startTimeRef = useRef(Date.now());
  const fastestReflexRef = useRef(null);

  const { consumePlayEnergy, recordHighScore, highScores, recordBestReaction, recordSpeedrunTime, bestReactionTimes, bestSpeedrunTimes } = useArcadeStore();
  const personalBestScore = highScores['bubble_pop'] || 0;
  const storedBestReflex = bestReactionTimes['bubble_pop'] || null;
  const storedBestSpeedrun = bestSpeedrunTimes['bubble_pop'] || null;
  const GOAL_WORDS = 20; // 20 words in 3 minutes

  const W = 600;
  const H = 420;

  const COLORS = [
    ['#06b6d4', '#0ea5e9'],
    ['#a855f7', '#ec4899'],
    ['#f59e0b', '#f97316'],
    ['#10b981', '#0d9488'],
    ['#6366f1', '#8b5cf6'],
    ['#ec4899', '#f43f5e'],
  ];

  const playAudio = useCallback((word) => {
    if (!word) return;
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    const matchObj = activeWordObjects.find(w => w.word === word);
    speakText(word, matchObj?.audio_word, 0.9, null, 'new_word', weekNumber);
  }, [activeWordObjects, weekNumber]);

  // Spawn bubbles distributed across the tank (5 compact bubbles, spaced out to prevent overlap)
  const spawnBubbles = useCallback((target, currentStreak) => {
    const decoys = activeWords
      .filter(w => w !== target)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const allWords = [target, ...decoys].sort(() => Math.random() - 0.5);

    const newBubbles = allWords.map((word, i) => {
      const color = COLORS[i % COLORS.length];
      const radius = Math.max(26, Math.min(34, 22 + word.length * 0.9));
      const col = i % 3;
      const row = Math.floor(i / 3);

      const cellW = (W - 80) / 3;
      const cellH = (H - 80) / 2;

      const baseX = 40 + col * cellW + cellW / 2;
      const baseY = 40 + row * cellH + cellH / 2;

      const x = baseX + (Math.random() - 0.5) * 20;
      const y = baseY + (Math.random() - 0.5) * 20;

      const speedMag = 0.35 + (currentStreak * 0.04);
      const angle = Math.random() * Math.PI * 2;

      return {
        id: `b_${Date.now()}_${i}_${Math.random()}`,
        word,
        isTarget: word === target,
        x: Math.max(radius + 10, Math.min(W - radius - 10, x)),
        y: Math.max(radius + 10, Math.min(H - radius - 10, y)),
        vx: Math.cos(angle) * speedMag,
        vy: Math.sin(angle) * speedMag,
        radius,
        color,
        popped: false,
        phase: Math.random() * Math.PI * 2,
      };
    });

    bubblesRef.current = newBubbles;
    setBubbles(newBubbles);
    lastCatchTimeRef.current = Date.now();
    spawnTimestampRef.current = Date.now(); // Record spawn time for reflex measurement
    setFoxTrigger(false);
    playAudio(target);
  }, [activeWords, playAudio]);

  // Smooth floating physics
  const runLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    const list = bubblesRef.current;
    for (let i = 0; i < list.length; i++) {
      const b = list[i];
      if (b.popped) continue;

      b.phase += 0.03;
      b.x += b.vx + Math.sin(b.phase) * 0.2;
      b.y += b.vy + Math.cos(b.phase) * 0.2;

      if (b.x - b.radius < 8) { b.x = b.radius + 8; b.vx = Math.abs(b.vx); }
      if (b.x + b.radius > W - 8) { b.x = W - 8 - b.radius; b.vx = -Math.abs(b.vx); }
      if (b.y - b.radius < 8) { b.y = b.radius + 8; b.vy = Math.abs(b.vy); }
      if (b.y + b.radius > H - 8) { b.y = H - 8 - b.radius; b.vy = -Math.abs(b.vy); }
    }

    setBubbles([...bubblesRef.current]);
    animFrameRef.current = requestAnimationFrame(runLoop);
  }, []);

  const endGame = useCallback((isSpeedrunVictory = false) => {
    gameStateRef.current = 'done';
    setGameState('done');
    cancelAnimationFrame(animFrameRef.current);

    if (isSpeedrunVictory) {
      const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
      setSpeedrunClearTime(elapsedSec);
      recordSpeedrunTime('bubble_pop', elapsedSec);
    }

    recordHighScore('bubble_pop', scoreRef.current);
  }, [recordHighScore, recordSpeedrunTime]);

  const startGame = () => {
    scoreRef.current = 0;
    streakRef.current = 0;
    wordsPoppedRef.current = 0;
    fastestReflexRef.current = null;
    startTimeRef.current = Date.now();

    setScore(0);
    setStreak(0);
    setWordsPopped(0);
    setGameTimer(180);
    setShowPenalty(false);
    setInkSplat(null);
    setRevealMsg(null);
    setFoxTrigger(false);
    setFastestReflex(null);
    setSpeedrunClearTime(null);

    const target = activeWords[Math.floor(Math.random() * activeWords.length)];
    targetRef.current = target;
    setTargetWord(target);
    gameStateRef.current = 'playing';
    setGameState('playing');

    spawnBubbles(target, 0);
    animFrameRef.current = requestAnimationFrame(runLoop);
  };

  // 1-second clock
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
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
    return () => clearInterval(interval);
  }, [gameState, isStandalone, endGame]);

  const handleBubbleTap = useCallback((bubble, e) => {
    if (gameStateRef.current !== 'playing') return;
    e.stopPropagation();

    if (bubble.isTarget) {
      // Calculate Reflex Reaction Time
      const reflexSec = (Date.now() - spawnTimestampRef.current) / 1000;
      const isLightning = reflexSec <= 1.5;
      const speedBonus = isLightning ? 5 : 0;

      if (!fastestReflexRef.current || reflexSec < fastestReflexRef.current) {
        fastestReflexRef.current = reflexSec;
        setFastestReflex(reflexSec);
        recordBestReaction('bubble_pop', reflexSec);
      }

      // POP SUCCESS!
      const pts = 15 + streakRef.current * 2 + speedBonus;
      scoreRef.current += pts;
      streakRef.current += 1;
      wordsPoppedRef.current += 1;

      setScore(scoreRef.current);
      setStreak(streakRef.current);
      setWordsPopped(wordsPoppedRef.current);

      if (isLightning) {
        setRevealMsg({ text: `⚡ LIGHTNING REFLEX: ${reflexSec.toFixed(2)}s! (+${pts} pts)`, type: 'lightning' });
      } else {
        setRevealMsg({ text: `🎉 Pop: "${bubble.word}" (${reflexSec.toFixed(1)}s) (+${pts} pts)`, type: 'correct' });
      }
      setTimeout(() => setRevealMsg(null), 900);

      // Check Speedrun Victory (All 20 words cleared early!)
      if (wordsPoppedRef.current >= GOAL_WORDS) {
        const timeBonus = Math.floor(gameTimer * 2);
        scoreRef.current += timeBonus;
        setScore(scoreRef.current);
        endGame(true);
        return;
      }

      // Pick next target word & respawn
      const nextTarget = activeWords[Math.floor(Math.random() * activeWords.length)];
      targetRef.current = nextTarget;
      setTargetWord(nextTarget);
      spawnBubbles(nextTarget, streakRef.current);
    } else {
      // Wrong tap — ink splat penalty + Answer Reveal
      streakRef.current = 0;
      setStreak(0);
      const rect = e.currentTarget.getBoundingClientRect();
      setInkSplat({ x: e.clientX - rect.left, y: e.clientY - rect.top, color: bubble.color[0] });
      setShowPenalty(true);

      setRevealMsg({ text: `✗ Tapped "${bubble.word}" · Catch: "${targetRef.current}"`, type: 'wrong' });
      playAudio(targetRef.current);
      setFoxTrigger(true);
      setTimeout(() => { setInkSplat(null); setShowPenalty(false); }, 900);
      setTimeout(() => setRevealMsg(null), 1600);
    }
  }, [activeWords, spawnBubbles, playAudio, gameTimer, endGame, recordBestReaction]);

  useEffect(() => () => {
    cancelAnimationFrame(animFrameRef.current);
    window.speechSynthesis?.cancel();
  }, []);

  const targetBubble = bubbles.find(b => b.isTarget && !b.popped);

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '420px',
      background: 'linear-gradient(180deg, #09153e 0%, #12286b 40%, #0d4085 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden', fontFamily: 'system-ui, sans-serif', userSelect: 'none',
    }}>
      {/* Top HUD with Speed Metrics & Best Reflex */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 12px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🫧</span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#38bdf8', letterSpacing: '0.04em' }}>BUBBLE POP</div>
            <div style={{ fontSize: '9px', color: '#94a3b8' }}>
              🎯 <b style={{ color: wordsPopped >= GOAL_WORDS ? '#4ade80' : '#fbbf24' }}>{wordsPopped}/{GOAL_WORDS} words</b>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {(fastestReflex || storedBestReflex) && (
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#fde047', background: 'rgba(253,224,71,0.12)', border: '1px solid rgba(253,224,71,0.3)', borderRadius: '6px', padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Zap size={10} fill="#fde047" /> ⚡ {(fastestReflex || storedBestReflex).toFixed(2)}s
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

      {/* IDLE STATE (Lifted, compact) */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '24px', gap: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 12px rgba(56,189,248,0.5))' }}>🫧</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 900, color: '#38bdf8' }}>
              Speedrun Bubble Dash!
            </h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#cbd5e1', maxWidth: '300px', lineHeight: 1.4 }}>
              Pop all <b>{GOAL_WORDS} target bubbles</b> as fast as possible! Fast reactions earn <b>⚡ Speed Bonus (+5 pts)</b>!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '10px 24px', background: 'linear-gradient(135deg, #0284c7, #2563eb)',
            color: '#fff', fontWeight: 900, fontSize: '13px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(2,132,199,0.4)',
            display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px',
          }}>
            <span>🫧</span> START SPEEDRUN
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <>
          {/* Target Word Banner (Compact) */}
          <div style={{
            padding: '5px 12px', background: 'rgba(56,189,248,0.18)',
            borderBottom: '1px solid rgba(56,189,248,0.3)', textAlign: 'center', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <span style={{ fontSize: '10px', color: '#7dd3fc', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              FIND & POP:
            </span>
            <span style={{ fontSize: '16px', color: '#f8fafc', fontWeight: 900, textShadow: '0 2px 6px rgba(56,189,248,0.8)' }}>
              {targetWord}
            </span>
            <button
              type="button"
              onClick={() => playAudio(targetWord)}
              style={{
                background: 'rgba(56,189,248,0.2)', border: '1px solid rgba(56,189,248,0.4)',
                color: '#7dd3fc', borderRadius: '6px', padding: '2px 6px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 800
              }}
            >
              <Volume2 size={13} /> <span>Listen</span>
            </button>
          </div>

          {/* Ocean Aquarium Canvas */}
          <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {revealMsg && (
              <div style={{
                position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
                zIndex: 40, padding: '5px 14px', borderRadius: '12px', fontWeight: 900, fontSize: '11px',
                background: revealMsg.type === 'lightning'
                  ? 'linear-gradient(135deg, #eab308, #ca8a04)'
                  : revealMsg.type === 'correct'
                  ? 'rgba(16,185,129,0.95)'
                  : 'rgba(239,68,68,0.95)',
                color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.5)', border: '1.5px solid rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap',
              }}>
                {revealMsg.text}
              </div>
            )}

            {/* Floating Bubbles (Compact, Crisp, Touch-Friendly) */}
            {bubbles.filter(b => !b.popped).map(b => (
              <div
                key={b.id}
                onClick={(e) => handleBubbleTap(b, e)}
                style={{
                  position: 'absolute',
                  left: `${(b.x / W) * 100}%`,
                  top: `${(b.y / H) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  width: `${b.radius * 2}px`,
                  height: `${b.radius * 2}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 25%, ${b.color[0]}cc 60%, ${b.color[1]}ee 100%)`,
                  border: '1.5px solid rgba(255,255,255,0.6)',
                  boxShadow: `0 0 12px ${b.color[0]}88, inset -2px -2px 6px rgba(0,0,0,0.3)`,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff', fontWeight: 900, fontSize: b.word.length > 8 ? '10px' : '11.5px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  zIndex: 20,
                  transition: 'transform 0.1s',
                  padding: '2px',
                  textAlign: 'center',
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.92)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
              >
                {b.word}
              </div>
            ))}

            {/* Top-right Fox Mascot Helper */}
            <ArcadeFoxHelper
              hintText={`Pop "${targetWord}"!`}
              triggerHint={foxTrigger}
              onHintUsed={() => setFoxTrigger(false)}
            />
          </div>
        </>
      )}

      {/* RESULTS STATE (Lifted, compact, small icons, no extra space) */}
      {gameState === 'done' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px',
          gap: '10px', padding: '16px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '32px' }}>{wordsPopped >= GOAL_WORDS ? '🏆' : '⭐'}</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 900, color: '#7dd3fc' }}>
              {wordsPopped >= GOAL_WORDS ? '⚡ SPEEDRUN CHAMPION!' : 'Round Complete!'}
            </h3>
            <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#cbd5e1' }}>
              Popped: <strong style={{ color: wordsPopped >= GOAL_WORDS ? '#4ade80' : '#fbbf24' }}>{wordsPopped}/{GOAL_WORDS} words</strong>
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
              padding: '9px 20px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              color: '#fff', fontWeight: 900, fontSize: '12px', borderRadius: '10px',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <RotateCcw size={14} /> Play Again
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
