import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Zap } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';

/**
 * PhysicsDriftGame V2 — Side-Scrolling Auto-Runner
 *
 * The car drives itself right-to-left on an infinite track.
 * Three lanes exist; the player swipes up/down to dodge small obstacles.
 * When a DECISION obstacle appears (large, with countdown), player swipes
 * LEFT = choice A, RIGHT = choice B within 3 seconds.
 * Wrong or too-slow → spin-out animation, −10pts, speed recovery delay.
 * Correct → speed boost, +15pts.
 *
 * Obstacle data is injected from DRIFT_OBSTACLES per weekNumber so any
 * CLIL topic (Friction, Forces, Energy, etc.) plugs in without code changes.
 */

// ─── Content-agnostic obstacle bank per week ─────────────────────────────────
const DRIFT_OBSTACLES = {
  default: {
    theme: 'Physics & Friction',
    small: ['🪨', '🌿', '🛢️'],
    decisions: [
      {
        icon: '💧', label: 'Wet Puddle ahead!',
        A: { text: 'Rubber Grips', correct: true },
        B: { text: 'Smooth Soles', correct: false, penalty: 'Too slippery!' },
      },
      {
        icon: '🛢️', label: 'Oil Spill!',
        A: { text: 'Hard Brake', correct: false, penalty: 'Wheel lock!' },
        B: { text: 'Gentle Slow', correct: true },
      },
      {
        icon: '🧊', label: 'Ice Patch!',
        A: { text: 'Rubber Chains', correct: true },
        B: { text: 'Speed Up', correct: false, penalty: 'Total skid!' },
      },
      {
        icon: '🪨', label: 'Gravel Zone!',
        A: { text: 'Wide Tyres', correct: true },
        B: { text: 'Narrow Slicks', correct: false, penalty: 'Lost control!' },
      },
    ],
  },
  33: {
    theme: 'Friction & Motion — Week 33',
    small: ['💧', '🪨', '🍂'],
    decisions: [
      {
        icon: '💧', label: 'Wet Floor — choose footwear!',
        A: { text: 'Rubber Shoes', correct: true },
        B: { text: 'Leather Soles', correct: false, penalty: 'Slipped!' },
      },
      {
        icon: '🧊', label: 'Icy Corridor!',
        A: { text: 'Grip Pads', correct: true },
        B: { text: 'Socks only', correct: false, penalty: 'Ice spin!' },
      },
      {
        icon: '🛢️', label: 'Oil leak — reduce friction!',
        A: { text: 'Slow Down', correct: true },
        B: { text: 'Accelerate', correct: false, penalty: 'Fishtail!' },
      },
    ],
  },
};

// ─── Helper: pick obstacle data for current week ──────────────────────────────
function getObstacleData(weekNumber) {
  return DRIFT_OBSTACLES[weekNumber] || DRIFT_OBSTACLES.default;
}

// ─── Road segment colours ─────────────────────────────────────────────────────
const LANE_Y = [15, 42, 69]; // % from top for 3 lanes
const CAR_EMOJI = ['🏎️', '🚗', '🚙'];

export default function PhysicsDriftGame({ weekNumber = 33, onComplete, isStandalone = false }) {
  const obsData = getObstacleData(weekNumber);

  // ── State ──────────────────────────────────────────────────────────────────
  const [gameState, setGameState]         = useState('idle');
  const [score, setScore]                 = useState(0);
  const [gameTimer, setGameTimer]         = useState(60);
  const [lane, setLane]                   = useState(1);            // 0=top 1=mid 2=bot
  const [carEmoji]                        = useState(() => CAR_EMOJI[Math.floor(Math.random() * 3)]);
  const [decision, setDecision]           = useState(null);         // current decision obstacle
  const [countdown, setCountdown]         = useState(0);
  const [spinout, setSpinout]             = useState(false);
  const [speedBoost, setSpeedBoost]       = useState(false);
  const [feedback, setFeedback]           = useState(null);
  const [obstacles, setObstacles]         = useState([]);           // small obstacles
  const [trackPos, setTrackPos]           = useState(0);            // horizontal scroll offset

  // ── Refs ───────────────────────────────────────────────────────────────────
  const scoreRef        = useRef(0);
  const laneRef         = useRef(1);
  const gameStateRef    = useRef('idle');
  const decisionRef     = useRef(null);
  const countdownRef    = useRef(0);
  const spinoutRef      = useRef(false);
  const frameRef        = useRef(null);
  const trackPosRef     = useRef(0);
  const nextObsAt       = useRef(600);   // px until next small obstacle
  const nextDecisionAt  = useRef(800);   // px until next decision obstacle
  const swipeStartRef   = useRef(null);
  const containerRef    = useRef(null);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  // ── Physics loop ───────────────────────────────────────────────────────────
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    const speed = spinoutRef.current ? 1 : 3.5;
    trackPosRef.current += speed;
    setTrackPos(trackPosRef.current);

    // Move obstacles
    setObstacles(prev => {
      let next = prev
        .map(o => ({ ...o, x: o.x - speed }))
        .filter(o => o.x > -60);

      // Spawn small obstacle
      if (trackPosRef.current >= nextObsAt.current) {
        nextObsAt.current = trackPosRef.current + 200 + Math.random() * 300;
        const spawnLane = Math.floor(Math.random() * 3);
        next = [...next, {
          id: Date.now(),
          x: 520,
          lane: spawnLane,
          icon: obsData.small[Math.floor(Math.random() * obsData.small.length)],
          type: 'small',
        }];
      }

      // Check collision with small obstacles
      next.forEach(o => {
        if (o.type === 'small' && !o.hit && Math.abs(o.x - 80) < 40 && o.lane === laneRef.current) {
          o.hit = true;
          scoreRef.current = Math.max(0, scoreRef.current - 3);
          setScore(scoreRef.current);
          setFeedback({ msg: `${o.icon} Ouch! −3`, type: 'bad' });
          setTimeout(() => setFeedback(null), 700);
        }
      });

      return next;
    });

    // Spawn decision obstacle
    if (!decisionRef.current && trackPosRef.current >= nextDecisionAt.current) {
      nextDecisionAt.current = trackPosRef.current + 600 + Math.random() * 400;
      const obs = obsData.decisions[Math.floor(Math.random() * obsData.decisions.length)];
      decisionRef.current = obs;
      setDecision(obs);
      countdownRef.current = 3;
      setCountdown(3);
    }

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [obsData]);

  // ── Countdown for decision ────────────────────────────────────────────────
  useEffect(() => {
    if (!decision) return;
    const iv = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 0) {
        clearInterval(iv);
        // Too slow → spin-out
        triggerSpinout('⏰ Too slow! −10');
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [decision]);

  // ── Decision handler ──────────────────────────────────────────────────────
  const makeDecision = useCallback((choice) => {
    if (!decisionRef.current) return;
    const obs = decisionRef.current;
    const correctChoice = obs.A.correct ? obs.A : obs.B;
    decisionRef.current = null;
    setDecision(null);

    if (choice.correct) {
      scoreRef.current += 15;
      setScore(scoreRef.current);
      setSpeedBoost(true);
      setFeedback({ msg: `✅ ${choice.text}! +15`, type: 'good' });
      setTimeout(() => { setSpeedBoost(false); setFeedback(null); }, 1200);
    } else {
      triggerSpinout(`❌ ${choice.penalty || 'Wrong!'} · Đúng là: "${correctChoice.text}"`);
    }
  }, []);

  const triggerSpinout = useCallback((msg) => {
    spinoutRef.current = true;
    setSpinout(true);
    if (decisionRef.current) {
      const obs = decisionRef.current;
      const correctChoice = obs.A.correct ? obs.A : obs.B;
      msg = `⏰ Too slow! · Đúng là: "${correctChoice.text}"`;
    }
    decisionRef.current = null;
    setDecision(null);
    scoreRef.current = Math.max(0, scoreRef.current - 10);
    setScore(scoreRef.current);
    setFeedback({ msg, type: 'bad' });
    setTimeout(() => {
      spinoutRef.current = false;
      setSpinout(false);
      setFeedback(null);
    }, 2000);
  }, []);

  // ── Lane change ───────────────────────────────────────────────────────────
  const changeLane = useCallback((dir) => {
    if (spinoutRef.current || decisionRef.current) return;
    setLane(prev => {
      const next = Math.max(0, Math.min(2, prev + dir));
      laneRef.current = next;
      return next;
    });
  }, []);

  // ── Touch/Pointer swipe ───────────────────────────────────────────────────
  const handlePointerDown = (e) => {
    swipeStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = useCallback((e) => {
    if (!swipeStartRef.current) return;
    const dx = e.clientX - swipeStartRef.current.x;
    const dy = e.clientY - swipeStartRef.current.y;
    swipeStartRef.current = null;

    if (decisionRef.current) {
      // Horizontal swipe → decision choice
      if (Math.abs(dx) > 30) {
        makeDecision(dx < 0 ? decisionRef.current.A : decisionRef.current.B);
      }
    } else {
      // Vertical swipe → lane change
      if (Math.abs(dy) > 25) {
        changeLane(dy > 0 ? 1 : -1);
      }
    }
  }, [makeDecision, changeLane]);

  // ── Keyboard support ──────────────────────────────────────────────────────
  useEffect(() => {
    if (gameState !== 'playing') return;
    const handler = (e) => {
      if (e.key === 'ArrowUp')    changeLane(-1);
      if (e.key === 'ArrowDown')  changeLane(1);
      if (decisionRef.current) {
        if (e.key === 'ArrowLeft')  makeDecision(decisionRef.current.A);
        if (e.key === 'ArrowRight') makeDecision(decisionRef.current.B);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [gameState, changeLane, makeDecision]);

  // ── Game clock ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
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
    laneRef.current = 1;
    trackPosRef.current = 0;
    nextObsAt.current = 600;
    nextDecisionAt.current = 700;
    decisionRef.current = null;
    spinoutRef.current = false;
    setScore(0);
    setGameTimer(60);
    setLane(1);
    setTrackPos(0);
    setObstacles([]);
    setDecision(null);
    setSpinout(false);
    setSpeedBoost(false);
    setFeedback(null);
    gameStateRef.current = 'playing';
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  // ── Track stripe offset (creates scrolling illusion) ─────────────────────
  const stripeOffset = trackPos % 80;

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '400px',
      background: 'linear-gradient(180deg, #0c2340 0%, #1a3a5c 40%, #0d2137 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🚗</span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#4ade80', letterSpacing: '0.05em' }}>PHYSICS DRIFT RACE</div>
            <div style={{ fontSize: '10px', color: '#475569' }}>{obsData.theme}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '3px 10px' }}>🏆 {score}</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#7dd3fc', background: 'rgba(125,211,252,0.1)', border: '1px solid rgba(125,211,252,0.25)', borderRadius: '8px', padding: '3px 10px' }}>⏱ {gameTimer}s</div>
        </div>
      </div>

      {/* IDLE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px' }}>
          <div style={{ fontSize: '56px' }}>🏎️</div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 900, color: '#4ade80' }}>Physics Drift Race!</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', maxWidth: '300px' }}>
              Swipe <b>↑↓</b> to change lanes. When an obstacle appears, swipe <b>←→</b> to choose how to handle it — <b>3 seconds!</b>
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px', background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(5,150,105,0.3)',
          }}>
            🚗 START ENGINE
          </button>
        </div>
      )}

      {/* PLAYING */}
      {gameState === 'playing' && (
        <div
          ref={containerRef}
          style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* Sky / background parallax */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '22%',
            background: 'linear-gradient(180deg, #0c2340, #1a3a5c)',
          }} />

          {/* Road */}
          <div style={{
            position: 'absolute', top: '22%', left: 0, right: 0, bottom: 0,
            background: '#2d3748', overflow: 'hidden',
          }}>
            {/* Lane lines — scrolling */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} style={{
                position: 'absolute', top: '33%', height: '8px', width: '50px',
                left: `${((i * 80 - stripeOffset + 1000) % 600) - 50}px`,
                background: '#fbbf24', borderRadius: '2px', opacity: 0.7,
              }} />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} style={{
                position: 'absolute', top: '66%', height: '8px', width: '50px',
                left: `${((i * 80 - stripeOffset + 1000) % 600) - 50}px`,
                background: '#fbbf24', borderRadius: '2px', opacity: 0.7,
              }} />
            ))}
          </div>

          {/* Small obstacles on road */}
          {obstacles.filter(o => o.type === 'small').map(o => (
            <div key={o.id} style={{
              position: 'absolute',
              left: `${(o.x / 520) * 100}%`,
              top: `${22 + o.lane * 26}%`,
              fontSize: '22px',
              transform: 'translate(-50%, -50%)',
              filter: o.hit ? 'grayscale(1) opacity(0.3)' : 'none',
            }}>
              {o.icon}
            </div>
          ))}

          {/* The car */}
          <div style={{
            position: 'absolute',
            left: '16%',
            top: `${22 + lane * 26}%`,
            fontSize: '28px',
            transform: `translate(-50%, -50%) ${spinout ? 'rotate(180deg)' : speedBoost ? 'scale(1.15)' : ''}`,
            transition: 'top 0.18s cubic-bezier(0.34,1.56,0.64,1), transform 0.3s',
            filter: spinout ? 'hue-rotate(180deg)' : speedBoost ? 'brightness(1.4)' : 'none',
            zIndex: 10,
          }}>
            {carEmoji}
            {speedBoost && <span style={{ position: 'absolute', left: '-20px', top: '-4px', fontSize: '18px' }}>💨💨</span>}
          </div>

          {/* Speed boost trail */}
          {speedBoost && (
            <div style={{
              position: 'absolute', left: '5%', right: '84%', top: `${22 + lane * 26}%`,
              height: '6px', transform: 'translateY(-50%)',
              background: 'linear-gradient(90deg, transparent, #4ade80)',
              borderRadius: '3px', opacity: 0.7,
            }} />
          )}

          {/* DECISION PANEL */}
          {decision && (
            <div style={{
              position: 'absolute', bottom: '10px', left: '10px', right: '10px',
              background: 'rgba(15,23,42,0.96)', border: '2px solid #f59e0b',
              borderRadius: '14px', padding: '12px 14px', zIndex: 20,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#fbbf24' }}>
                  {decision.icon} {decision.label}
                </div>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: countdown <= 1 ? '#ef4444' : countdown === 2 ? '#f59e0b' : '#10b981',
                  color: '#fff', fontWeight: 900, fontSize: '14px',
                  boxShadow: `0 0 10px ${countdown <= 1 ? '#ef4444' : '#f59e0b'}`,
                }}>
                  {countdown}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => makeDecision(decision.A)} style={{
                  flex: 1, padding: '10px 8px', borderRadius: '10px',
                  background: 'rgba(59,130,246,0.15)', border: '1.5px solid #3b82f6',
                  color: '#93c5fd', fontWeight: 800, fontSize: '12px', cursor: 'pointer',
                }}>
                  ← {decision.A.text}
                </button>
                <button type="button" onClick={() => makeDecision(decision.B)} style={{
                  flex: 1, padding: '10px 8px', borderRadius: '10px',
                  background: 'rgba(168,85,247,0.15)', border: '1.5px solid #a855f7',
                  color: '#d8b4fe', fontWeight: 800, fontSize: '12px', cursor: 'pointer',
                }}>
                  {decision.B.text} →
                </button>
              </div>
              <div style={{ fontSize: '10px', color: '#475569', textAlign: 'center', marginTop: '6px' }}>
                Swipe ← or → to decide · keyboard ← → also works
              </div>
            </div>
          )}

          {/* Lane indicator dots */}
          <div style={{
            position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 5,
          }}>
            {[0, 1, 2].map(l => (
              <div key={l} style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: l === lane ? '#4ade80' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.15s',
              }} />
            ))}
          </div>

          {/* Swipe hint */}
          {!decision && (
            <div style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              fontSize: '10px', color: '#334155', fontWeight: 700, textAlign: 'right', lineHeight: 1.6,
            }}>
              ↑ lane<br />↓ lane
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div style={{
              position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
              padding: '6px 16px', borderRadius: '20px', fontWeight: 900, fontSize: '13px',
              background: feedback.type === 'good' ? 'rgba(16,185,129,0.92)' : 'rgba(239,68,68,0.92)',
              color: '#fff', whiteSpace: 'nowrap', zIndex: 30, boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}>
              {feedback.msg}
            </div>
          )}

          {/* Spinout flash */}
          {spinout && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(239,68,68,0.12)',
              pointerEvents: 'none', zIndex: 8,
            }} />
          )}
        </div>
      )}

      {/* DONE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '24px' }}>
          <div style={{ fontSize: '56px' }}>🏆</div>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#4ade80' }}>Race Complete!</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0' }}>
            Final Score: <strong style={{ color: '#fbbf24', fontSize: '18px' }}>{score} pts</strong>
          </p>
          <button type="button" onClick={startGame} style={{
            padding: '10px 24px', background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: '#fff', fontWeight: 900, fontSize: '13px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <RotateCcw size={14} /> Race Again
          </button>
        </div>
      )}
    </div>
  );
}
