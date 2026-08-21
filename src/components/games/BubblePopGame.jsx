import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Volume2, Flame, Play, RotateCcw } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';

/**
 * BubblePopGame V2 — Physics-based flying bubbles
 * - 8-12 bubbles fly from bottom with randomized trajectories + wall bouncing
 * - TTS speaks target word → tap the MOVING correct bubble
 * - Tap wrong → ink splat occludes screen for 1s
 * - Target escapes top → -5pts penalty
 * - Combo 3+ → speed increases; Combo 5+ → Golden Bubble x3
 */
export default function BubblePopGame({ words = [], onComplete, isStandalone = false }) {
  const DEFAULT_WORDS = [
    'friction', 'slippery', 'headmaster', 'bandage', 'medical',
    'corridor', 'rubber', 'safety', 'caution', 'momentum', 'velocity', 'smooth'
  ];
  const activeWords = words?.length > 0 ? words : DEFAULT_WORDS;

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [targetWord, setTargetWord] = useState('');
  const [bubbles, setBubbles] = useState([]);
  const [inkSplat, setInkSplat] = useState(null); // {x, y, color} for wrong tap
  const [showPenalty, setShowPenalty] = useState(false);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const bubblesRef = useRef([]);
  const gameStateRef = useRef('idle');
  const targetRef = useRef('');
  const scoreRef = useRef(0);
  const streakRef = useRef(0);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const W = 480, H = 340; // virtual canvas size

  const COLORS = [
    ['#06b6d4', '#0ea5e9'], // cyan-blue
    ['#a855f7', '#ec4899'], // purple-pink
    ['#f59e0b', '#f97316'], // amber-orange
    ['#10b981', '#0d9488'], // emerald-teal
    ['#6366f1', '#8b5cf6'], // indigo-violet
    ['#ef4444', '#f43f5e'], // red-rose
  ];

  const speak = useCallback((word) => {
    try {
      const u = new SpeechSynthesisUtterance(word);
      u.rate = 0.9; u.pitch = 1.1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }, []);

  const spawnBubbles = useCallback((target, currentStreak) => {
    const wordPool = activeWords.filter(w => w !== target)
      .sort(() => Math.random() - 0.5)
      .slice(0, 7 + Math.floor(currentStreak / 3));

    const allWords = [target, ...wordPool.slice(0, 7)].sort(() => Math.random() - 0.5);
    const speedMult = 1 + Math.min(currentStreak * 0.1, 1.2);

    const newBubbles = allWords.map((word, i) => {
      const color = COLORS[i % COLORS.length];
      const isGolden = currentStreak >= 5 && word === target;
      const r = word.length > 8 ? 42 : 36;
      return {
        id: `b_${Date.now()}_${i}`,
        word,
        isTarget: word === target,
        isGolden,
        x: r + Math.random() * (W - 2 * r),
        y: H + r + Math.random() * 60,
        vx: (Math.random() - 0.5) * 2.5 * speedMult,
        vy: -(1.8 + Math.random() * 1.5) * speedMult,
        r,
        color,
        opacity: 1,
        escaped: false,
      };
    });

    bubblesRef.current = newBubbles;
    setBubbles(newBubbles);
    speak(target);
  }, [activeWords, speak]);

  // Physics animation loop
  const runLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    bubblesRef.current = bubblesRef.current.map(b => {
      if (b.escaped) return b;
      let { x, y, vx, vy } = b;

      // Wall bounce
      if (x - b.r < 0) { x = b.r; vx = Math.abs(vx); }
      if (x + b.r > W) { x = W - b.r; vx = -Math.abs(vx); }

      // Buoyancy (slow deceleration upward)
      vy += 0.03;

      x += vx;
      y += vy;

      // Check escape
      if (y + b.r < 0) {
        if (b.isTarget) {
          scoreRef.current = Math.max(0, scoreRef.current - 5);
          setScore(scoreRef.current);
          streakRef.current = 0;
          setStreak(0);
          // Spawn new round
          const newTarget = activeWords[Math.floor(Math.random() * activeWords.length)];
          targetRef.current = newTarget;
          setTargetWord(newTarget);
          setTimeout(() => spawnBubbles(newTarget, 0), 200);
        }
        return { ...b, escaped: true };
      }

      return { ...b, x, y, vx, vy };
    });

    setBubbles([...bubblesRef.current]);
    animFrameRef.current = requestAnimationFrame(runLoop);
  }, [activeWords, spawnBubbles]);

  const startGame = () => {
    scoreRef.current = 0;
    streakRef.current = 0;
    setScore(0);
    setStreak(0);
    setGameTimer(60);
    setShowPenalty(false);
    setInkSplat(null);

    const target = activeWords[Math.floor(Math.random() * activeWords.length)];
    targetRef.current = target;
    setTargetWord(target);
    gameStateRef.current = 'playing';
    setGameState('playing');
    spawnBubbles(target, 0);
    animFrameRef.current = requestAnimationFrame(runLoop);
  };

  // 1-second game clock
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
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
      const pts = bubble.isGolden ? 30 : 10 + streakRef.current * 2;
      scoreRef.current += pts;
      streakRef.current += 1;
      setScore(scoreRef.current);
      setStreak(streakRef.current);

      const nextTarget = activeWords[Math.floor(Math.random() * activeWords.length)];
      targetRef.current = nextTarget;
      setTargetWord(nextTarget);
      spawnBubbles(nextTarget, streakRef.current);
    } else {
      // Wrong tap — ink splat penalty
      streakRef.current = 0;
      setStreak(0);
      const rect = e.currentTarget.getBoundingClientRect();
      setInkSplat({ x: e.clientX - rect.left, y: e.clientY - rect.top, color: bubble.color[0] });
      setShowPenalty(true);
      speak(`Find: ${targetRef.current}`);
      setTimeout(() => { setInkSplat(null); setShowPenalty(false); }, 900);
    }
  }, [activeWords, spawnBubbles, speak]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const bgStyle = {
    width: '100%', height: '100%', minHeight: '400px',
    background: 'linear-gradient(180deg, #0c1445 0%, #1a237e 40%, #0d47a1 100%)',
    borderRadius: '16px',
    display: 'flex', flexDirection: 'column',
    position: 'relative', overflow: 'hidden',
    fontFamily: 'system-ui, sans-serif', userSelect: 'none',
  };

  return (
    <div style={bgStyle}>
      {/* HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(4px)', flexShrink: 0, zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🫧</span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#7dd3fc', letterSpacing: '0.05em' }}>BUBBLE POP DASH</div>
            <div style={{ fontSize: '10px', color: '#475569' }}>Arcade Mini-Game</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '3px 10px' }}>
            🏆 {score} pts
          </div>
          {streak >= 2 && (
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#f87171', background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '3px 10px', animation: 'pulse 1s infinite' }}>
              🔥 {streak}x
            </div>
          )}
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#7dd3fc', background: 'rgba(125,211,252,0.1)', border: '1px solid rgba(125,211,252,0.25)', borderRadius: '8px', padding: '3px 10px' }}>
            ⏱ {gameTimer}s
          </div>
        </div>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px' }}>
          <div style={{ fontSize: '64px', animation: 'bounce 1s infinite' }}>🫧</div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 900, color: '#7dd3fc' }}>
              Catch the Flying Vocab Bubbles!
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', maxWidth: '320px' }}>
              Listen to the word, then tap the right bubble while it's flying. Miss it and you lose points!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(14,165,233,0.3)',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span>▶</span> START (1 MINUTE)
          </button>
        </div>
      )}

      {/* PLAYING STATE — physics canvas */}
      {gameState === 'playing' && (
        <>
          {/* Target word banner */}
          <div style={{
            textAlign: 'center', padding: '6px 12px',
            background: 'rgba(14,165,233,0.15)', borderBottom: '1px solid rgba(14,165,233,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexShrink: 0,
          }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Target:</span>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#e0f2fe', letterSpacing: '0.03em' }}>{targetWord}</span>
            <button type="button" onClick={() => speak(targetWord)} style={{ background: 'none', border: 'none', color: '#7dd3fc', cursor: 'pointer', padding: '2px' }}>
              <Volume2 size={16} />
            </button>
            {streak >= 5 && <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 800 }}>⭐ GOLDEN BUBBLE ACTIVE!</span>}
          </div>

          {/* Bubble physics canvas */}
          <div
            ref={containerRef}
            style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
          >
            {/* Ink splat overlay */}
            {inkSplat && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 10,
                background: `radial-gradient(ellipse 200px 150px at ${inkSplat.x}px ${inkSplat.y}px, ${inkSplat.color}88, transparent 70%)`,
                pointerEvents: 'none', transition: 'opacity 0.3s',
              }} />
            )}

            {/* Bubbles rendered as absolute positioned circles */}
            {bubbles.filter(b => !b.escaped && b.y - b.r < H + 100).map(b => {
              const pct = containerRef.current
                ? { x: (b.x / W) * 100, y: (b.y / H) * 100 }
                : { x: 50, y: 80 };
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={(e) => handleBubbleTap(b, e)}
                  style={{
                    position: 'absolute',
                    left: `${(b.x / W) * 100}%`,
                    top: `${(b.y / H) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${b.r * 2}px`,
                    height: `${b.r * 2}px`,
                    borderRadius: '50%',
                    background: b.isGolden
                      ? 'radial-gradient(circle at 35% 35%, #fef08a, #fbbf24, #d97706)'
                      : `radial-gradient(circle at 35% 35%, ${b.color[0]}cc, ${b.color[1]}, ${b.color[1]}88)`,
                    border: b.isGolden ? '2px solid #fef08a' : '1.5px solid rgba(255,255,255,0.35)',
                    boxShadow: b.isGolden
                      ? '0 0 16px rgba(251,191,36,0.6), inset 0 2px 4px rgba(255,255,255,0.3)'
                      : `0 4px 12px ${b.color[0]}44, inset 0 2px 4px rgba(255,255,255,0.2)`,
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: b.r > 38 ? '11px' : '10px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textAlign: 'center',
                    padding: '4px',
                    transition: 'transform 0.06s',
                    zIndex: 5,
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(-50%,-50%) scale(0.9)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1)'; }}
                >
                  {b.isGolden ? `⭐ ${b.word}` : b.word}
                </button>
              );
            })}

            {/* Penalty flash */}
            {showPenalty && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(239,68,68,0.15)',
                pointerEvents: 'none', zIndex: 8,
              }} />
            )}
          </div>

          <div style={{ textAlign: 'center', padding: '6px', fontSize: '10px', color: '#475569', flexShrink: 0 }}>
            Tap the matching bubble before it flies away!
          </div>
        </>
      )}

      {/* DONE STATE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '24px' }}>
          <div style={{ fontSize: '56px' }}>🏆</div>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#fbbf24' }}>Round Complete!</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0' }}>
            Final Score: <strong style={{ color: '#fbbf24', fontSize: '18px' }}>{score} pts</strong>
          </p>
          <button type="button" onClick={startGame} style={{
            padding: '10px 24px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            color: '#fff', fontWeight: 900, fontSize: '13px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <RotateCcw size={14} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}
