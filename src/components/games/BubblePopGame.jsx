import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, RotateCcw, Trophy, Zap, Sparkles } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * BubblePopGame V3 — Realistic Floating Bubble Physics with Lexio Fox Mascot
 */

export default function BubblePopGame({ weekNumber = 33, words = [], onComplete, isStandalone = false }) {
  const weekData = getWeekArcadeData(weekNumber);
  const activeWordObjects = (words && words.length >= 4)
    ? words.map(w => typeof w === 'string' ? { word: w, audio_word: null } : w)
    : weekData.words;

  const activeWords = activeWordObjects.map(w => w.word);

  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'done'
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [gameTimer, setGameTimer] = useState(60);
  const [bubbles, setBubbles] = useState([]);
  const [inkSplat, setInkSplat] = useState(null);
  const [showPenalty, setShowPenalty] = useState(false);
  const [revealMsg, setRevealMsg] = useState(null);
  const [foxTrigger, setFoxTrigger] = useState(false);

  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const targetRef = useRef('');
  const animFrameRef = useRef(null);
  const gameStateRef = useRef('idle');
  const lastCatchTimeRef = useRef(Date.now());

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const W = 600;
  const H = 420;

  const COLORS = [
    ['#06b6d4', '#0ea5e9'], // cyan-blue
    ['#a855f7', '#ec4899'], // purple-pink
    ['#f59e0b', '#f97316'], // amber-orange
    ['#10b981', '#0d9488'], // emerald-teal
    ['#6366f1', '#8b5cf6'], // indigo-violet
    ['#ec4899', '#f43f5e'], // pink-rose
  ];

  const playAudio = useCallback((word) => {
    if (!word) return;
    const matchObj = activeWordObjects.find(w => w.word === word);
    speakText(word, matchObj?.audio_word, 0.9, null, 'new_word', weekNumber);
  }, [activeWordObjects, weekNumber]);

  // Spawn bubbles distributed across the tank
  const spawnBubbles = useCallback((target, currentStreak) => {
    const decoys = activeWords
      .filter(w => w !== target)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    const allWords = [target, ...decoys].sort(() => Math.random() - 0.5);

    const newBubbles = allWords.map((word, i) => {
      const color = COLORS[i % COLORS.length];
      const isTarget = word === target;
      const r = word.length > 8 ? 44 : 38;

      // Distribute evenly in a grid with jitter so they don't overlap on spawn
      const col = i % 4;
      const row = Math.floor(i / 4);
      const initX = 60 + col * 140 + (Math.random() - 0.5) * 30;
      const initY = 70 + row * 150 + (Math.random() - 0.5) * 30;

      // Gentle, readable floating velocities
      const vx = (Math.random() - 0.5) * 1.2;
      const vy = (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.6);

      return {
        id: `b_${Date.now()}_${i}_${Math.random()}`,
        word,
        isTarget,
        x: Math.max(r + 10, Math.min(W - r - 10, initX)),
        y: Math.max(r + 10, Math.min(H - r - 10, initY)),
        vx,
        vy,
        r,
        color,
        popped: false,
      };
    });

    bubblesRef.current = newBubbles;
    setBubbles(newBubbles);
    lastCatchTimeRef.current = Date.now();
    setFoxTrigger(false);
    playAudio(target);
  }, [activeWords, playAudio]);

  // Physics animation loop — 4-WALL BOUNCE (Ceiling, Floor, Left, Right)
  const runLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    bubblesRef.current = bubblesRef.current.map(b => {
      if (b.popped) return b;
      let { x, y, vx, vy, r } = b;

      // Left & Right wall bounce
      if (x - r < 0) {
        x = r;
        vx = Math.abs(vx);
      } else if (x + r > W) {
        x = W - r;
        vx = -Math.abs(vx);
      }

      // Ceiling & Floor bounce (REALISTIC BALLOON BOUNCE)
      if (y - r < 0) {
        y = r;
        vy = Math.abs(vy); // Bounce DOWN off ceiling
      } else if (y + r > H) {
        y = H - r;
        vy = -Math.abs(vy); // Bounce UP off floor
      }

      // Gentle wobble / buoyancy drift
      vx += (Math.random() - 0.5) * 0.04;
      vy += (Math.random() - 0.5) * 0.04;

      // Speed limits (keep relaxed for kids)
      vx = Math.max(-1.4, Math.min(1.4, vx));
      vy = Math.max(-1.2, Math.min(1.2, vy));

      x += vx;
      y += vy;

      return { ...b, x, y, vx, vy };
    });

    setBubbles([...bubblesRef.current]);
    animFrameRef.current = requestAnimationFrame(runLoop);
  }, []);

  const startGame = () => {
    scoreRef.current = 0;
    streakRef.current = 0;
    setScore(0);
    setStreak(0);
    setGameTimer(60);
    setShowPenalty(false);
    setInkSplat(null);
    setRevealMsg(null);

    const target = activeWords[Math.floor(Math.random() * activeWords.length)];
    targetRef.current = target;
    setTargetWord(target);
    gameStateRef.current = 'playing';
    setGameState('playing');

    spawnBubbles(target, 0);
    animFrameRef.current = requestAnimationFrame(runLoop);
  };

  // 1-second game clock + Fox Idle Hint Trigger
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
      }
      // If user hasn't caught target for > 5s, trigger Lexio Fox
      if (Date.now() - lastCatchTimeRef.current > 5000) {
        setFoxTrigger(true);
      }
      setGameTimer(t => {
        if (t <= 1) { endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, isStandalone]);

  const endGame = useCallback(() => {
    gameStateRef.current = 'done';
    setGameState('done');
    cancelAnimationFrame(animFrameRef.current);
    recordHighScore('bubble_pop', scoreRef.current);
    if (onComplete) onComplete(scoreRef.current);
  }, [onComplete, recordHighScore]);

  const handleBubbleTap = useCallback((bubble, e) => {
    if (gameStateRef.current !== 'playing') return;
    e.stopPropagation();

    if (bubble.isTarget) {
      // POP SUCCESS!
      const pts = bubble.isGolden ? 30 : 10 + streakRef.current * 2;
      scoreRef.current += pts;
      streakRef.current += 1;
      setScore(scoreRef.current);
      setStreak(streakRef.current);

      setRevealMsg({ text: `🎉 Great! Pop: "${bubble.word}" (+${pts} pts)`, type: 'correct' });
      setTimeout(() => setRevealMsg(null), 900);

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
  }, [activeWords, spawnBubbles, playAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const bgStyle = {
    width: '100%', height: '100%', minHeight: '420px',
    background: 'linear-gradient(180deg, #09153e 0%, #12286b 40%, #0d4085 100%)',
    borderRadius: '16px',
    display: 'flex', flexDirection: 'column',
    position: 'relative', overflow: 'hidden',
    fontFamily: 'system-ui, sans-serif', userSelect: 'none',
  };

  return (
    <div style={bgStyle}>
      {/* Top HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🫧</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#7dd3fc', letterSpacing: '0.05em' }}>BUBBLE POP DASH</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Bouncing Bubbles Physics</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '16px', padding: '24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '56px', filter: 'drop-shadow(0 0 16px rgba(14,165,233,0.6))' }}>🫧</div>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 900, color: '#7dd3fc' }}>
              Catch the Bouncing Bubbles!
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', maxWidth: '340px', lineHeight: 1.5 }}>
              Listen to the voice and read the target word. Tap the matching bubble as it gently floats and bounces off the ceiling!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(14,165,233,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'transform 0.15s',
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <span>▶</span> START PLAYING
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <>
          {/* Target Word Banner + Audio Repeat Button */}
          <div style={{
            textAlign: 'center', padding: '8px 16px',
            background: 'rgba(14,165,233,0.18)', borderBottom: '1.5px solid rgba(14,165,233,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexShrink: 0, zIndex: 10,
          }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.08em' }}>POP TARGET:</span>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', letterSpacing: '0.04em', textShadow: '0 2px 8px rgba(14,165,233,0.8)' }}>
              {targetWord}
            </span>
            <button
              type="button"
              onClick={() => playAudio(targetWord)}
              style={{
                background: 'rgba(14,165,233,0.25)', border: '1px solid rgba(14,165,233,0.4)',
                color: '#7dd3fc', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 800
              }}
              title="Repeat Audio"
            >
              <Volume2 size={16} /> <span>Listen</span>
            </button>
          </div>

          {/* Bubble physics tank */}
          <div
            ref={containerRef}
            style={{ flex: 1, position: 'relative', overflow: 'hidden', touchAction: 'none' }}
          >
            {/* Answer Reveal / Feedback Banner */}
            {revealMsg && (
              <div style={{
                position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
                zIndex: 40, padding: '8px 20px', borderRadius: '16px', fontWeight: 900, fontSize: '14px',
                background: revealMsg.type === 'correct'
                  ? 'rgba(16,185,129,0.95)'
                  : 'rgba(239,68,68,0.95)',
                color: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.6)',
                border: '2px solid rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap', pointerEvents: 'none',
              }}>
                {revealMsg.text}
              </div>
            )}

            {/* Ink splat overlay */}
            {inkSplat && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 25,
                background: `radial-gradient(ellipse 220px 160px at ${inkSplat.x}px ${inkSplat.y}px, ${inkSplat.color}99, transparent 75%)`,
                pointerEvents: 'none', transition: 'opacity 0.3s',
              }} />
            )}

            {/* Render bouncing bubbles */}
            {bubbles.filter(b => !b.popped).map(b => {
              const leftPct = (b.x / W) * 100;
              const topPct = (b.y / H) * 100;

              return (
                <div
                  key={b.id}
                  onClick={(e) => handleBubbleTap(b, e)}
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${b.r * 2}px`,
                    height: `${b.r * 2}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 35% 30%, #ffffff88 0%, ${b.color[0]}dd 40%, ${b.color[1]}ee 100%)`,
                    boxShadow: `0 4px 16px ${b.color[0]}55, inset -3px -3px 8px rgba(0,0,0,0.35), inset 3px 3px 6px rgba(255,255,255,0.6)`,
                    border: '1.5px solid rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: b.word.length > 8 ? '11px' : '13px',
                    letterSpacing: '0.02em',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                    textAlign: 'center',
                    padding: '6px',
                    zIndex: 20,
                    transition: 'transform 0.1s',
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.92)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
                >
                  {/* Glossy light reflection on bubble top */}
                  <div style={{
                    position: 'absolute', top: '12%', left: '22%',
                    width: '35%', height: '20%',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.7)',
                    transform: 'rotate(-25deg)',
                    pointerEvents: 'none',
                  }} />
                  <span style={{ position: 'relative', zIndex: 2 }}>{b.word}</span>
                </div>
              );
            })}

            {/* Bottom guideline */}
            <div style={{
              position: 'absolute', bottom: '8px', left: 0, right: 0,
              textAlign: 'center', fontSize: '11px', color: '#64748b', fontWeight: 700, pointerEvents: 'none'
            }}>
              Bubbles gently bounce off walls and ceiling · Tap the matching word!
            </div>

            {/* Lexio Fox Mascot Assistant */}
            <ArcadeFoxHelper
              hintText={`Pop the "${targetWord}" bubble!`}
              triggerHint={foxTrigger}
              onHintUsed={() => setFoxTrigger(false)}
            />
          </div>
        </>
      )}

      {/* GAME OVER STATE */}
      {gameState === 'done' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '16px', padding: '24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '56px' }}>🏆</div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 900, color: '#7dd3fc' }}>
              Time's Up! Bubble Master!
            </h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1' }}>
              Final Score: <strong style={{ color: '#fbbf24', fontSize: '20px' }}>{score} pts</strong>
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <RotateCcw size={16} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}
