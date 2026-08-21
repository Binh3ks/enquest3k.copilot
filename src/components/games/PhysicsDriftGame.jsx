import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, ArrowUp, ArrowDown, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';

/**
 * PhysicsDriftGame V3 — Intuitive Kids Car Runner with On-Screen Steering & Audio
 *
 * Features:
 *  - 3-Lane Track with Click-to-Steer: Click directly on Lane 1/2/3 OR use ▲/▼ on-screen buttons to steer!
 *  - Automatic TTS Voiceover: Speaks the scenario and both choices out loud with repeat audio button.
 *  - Clear CLIL Decision Choices: Big vibrant buttons with clear science rationale feedback.
 *  - Relaxed obstacle speed: Easy to dodge small puddles and stones.
 */

const DRIFT_OBSTACLES = {
  default: {
    theme: 'Physics & Friction Safety',
    small: ['💧', '🪨', '🍂'],
    decisions: [
      {
        icon: '💧', label: 'Wet Corridor Floor ahead! Choose footwear:',
        audioPrompt: 'Wet corridor floor ahead! Choose footwear:',
        A: { text: 'Rubber Grip Shoes', correct: true, reason: 'High friction stops slipping on wet tiles!' },
        B: { text: 'Smooth Leather Soles', correct: false, penalty: 'Too smooth — lost all friction and slipped!' },
      },
      {
        icon: '🧊', label: 'Icy Science Lab tiles! Choose your action:',
        audioPrompt: 'Icy science lab tiles! Choose your action:',
        A: { text: 'Walk with Grip Pads', correct: true, reason: 'Grip pads increase friction safely!' },
        B: { text: 'Slide with Socks', correct: false, penalty: 'Zero friction — spun out on the tiles!' },
      },
      {
        icon: '🛢️', label: 'Oil Spill in the hallway! How to brake?',
        audioPrompt: 'Oil spill in the hallway! How to brake?',
        A: { text: 'Slam Hard Brakes', correct: false, penalty: 'Hard braking locked the wheels and skidded!' },
        B: { text: 'Gentle Slow Down', correct: true, reason: 'Gentle slowing maintains tyre grip!' },
      },
      {
        icon: '🪨', label: 'Gravel Pathway! Choose tyre type:',
        audioPrompt: 'Gravel pathway! Choose tyre type:',
        A: { text: 'Wide Tread Tyres', correct: true, reason: 'Deep treads grip loose stones firmly!' },
        B: { text: 'Narrow Smooth Slicks', correct: false, penalty: 'Smooth slicks slid over the gravel!' },
      },
    ],
  },
  33: {
    theme: 'Friction & Corridor Safety — Week 33',
    small: ['💧', '🪨', '🍂'],
    decisions: [
      {
        icon: '💧', label: 'Wet Puddle in Corridor! What should Jake choose?',
        audioPrompt: 'Wet puddle in corridor! What should Jake choose?',
        A: { text: 'Rubber Soles & Walk', correct: true, reason: 'Rubber soles give maximum grip on wet floors!' },
        B: { text: 'Run in Leather Shoes', correct: false, penalty: 'Slipped heavily like Tom did!' },
      },
      {
        icon: '🧊', label: 'Slippery Polished Floor! Choose safety gear:',
        audioPrompt: 'Slippery polished floor! Choose safety gear:',
        A: { text: 'Anti-Slip Grippers', correct: true, reason: 'Friction keeps footsteps stable and secure!' },
        B: { text: 'Smooth Socks Only', correct: false, penalty: 'Spun 180 degrees into the wall!' },
      },
      {
        icon: '⚠️', label: 'Yellow Caution Sign spotted! What to do?',
        audioPrompt: 'Yellow caution sign spotted! What to do?',
        A: { text: 'Slow down & Walk calmly', correct: true, reason: 'Walking carefully avoids all corridor accidents!' },
        B: { text: 'Sprint to beat the bell', correct: false, penalty: 'Lost control near the stairs!' },
      },
    ],
  },
};

function getObstacleData(weekNumber) {
  return DRIFT_OBSTACLES[weekNumber] || DRIFT_OBSTACLES.default;
}

export default function PhysicsDriftGame({ weekNumber = 33, onComplete, isStandalone = false }) {
  const obsData = getObstacleData(weekNumber);

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [lane, setLane] = useState(1); // 0 = Top, 1 = Mid, 2 = Bot
  const [decision, setDecision] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [spinout, setSpinout] = useState(false);
  const [speedBoost, setSpeedBoost] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [obstacles, setObstacles] = useState([]);
  const [trackPos, setTrackPos] = useState(0);

  const scoreRef = useRef(0);
  const laneRef = useRef(1);
  const gameStateRef = useRef('idle');
  const decisionRef = useRef(null);
  const countdownRef = useRef(0);
  const spinoutRef = useRef(false);
  const frameRef = useRef(null);
  const trackPosRef = useRef(0);
  const nextObsAt = useRef(400);
  const nextDecisionAt = useRef(700);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const speak = useCallback((text) => {
    if (!text) return;
    try {
      window.speechSynthesis?.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      u.pitch = 1.05;
      u.lang = 'en-US';
      window.speechSynthesis?.speak(u);
    } catch (_) {}
  }, []);

  const steerToLane = useCallback((targetLane) => {
    if (spinoutRef.current || gameStateRef.current !== 'playing') return;
    const clamped = Math.max(0, Math.min(2, targetLane));
    setLane(clamped);
    laneRef.current = clamped;
  }, []);

  // Physics animation loop
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    // Slower speed during decision or spinout
    const speed = spinoutRef.current ? 0.8 : decisionRef.current ? 1.2 : 2.5;
    trackPosRef.current += speed;
    setTrackPos(trackPosRef.current);

    // Move small obstacles
    setObstacles(prev => {
      let next = prev
        .map(o => ({ ...o, x: o.x - speed }))
        .filter(o => o.x > -60);

      // Spawn small obstacle
      if (!decisionRef.current && trackPosRef.current >= nextObsAt.current) {
        nextObsAt.current = trackPosRef.current + 250 + Math.random() * 200;
        const spawnLane = Math.floor(Math.random() * 3);
        next = [...next, {
          id: `obs_${Date.now()}_${Math.random()}`,
          x: 540,
          lane: spawnLane,
          icon: obsData.small[Math.floor(Math.random() * obsData.small.length)],
          type: 'small',
          hit: false,
        }];
      }

      // Check collision with car (car is at x = 90)
      next.forEach(o => {
        if (!o.hit && Math.abs(o.x - 90) < 35 && o.lane === laneRef.current) {
          o.hit = true;
          scoreRef.current = Math.max(0, scoreRef.current - 3);
          setScore(scoreRef.current);
          setFeedback({ msg: `${o.icon} Puddle Bump! −3 pts`, type: 'bad' });
          setTimeout(() => setFeedback(null), 800);
        }
      });

      return next;
    });

    // Spawn CLIL Decision obstacle
    if (!decisionRef.current && trackPosRef.current >= nextDecisionAt.current) {
      nextDecisionAt.current = trackPosRef.current + 550 + Math.random() * 300;
      const obs = obsData.decisions[Math.floor(Math.random() * obsData.decisions.length)];
      decisionRef.current = obs;
      setDecision(obs);
      countdownRef.current = 5; // Generous 5 seconds
      setCountdown(5);
      speak(`${obs.audioPrompt} Choose: A, ${obs.A.text}, or B, ${obs.B.text}`);
    }

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [obsData, speak]);

  // Decision timer countdown
  useEffect(() => {
    if (!decision) return;
    const iv = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 0) {
        clearInterval(iv);
        // Timeout
        const obs = decisionRef.current;
        const correctChoice = obs?.A?.correct ? obs.A : obs?.B;
        triggerSpinout(`⏰ Time's up! · Đúng là: "${correctChoice?.text || 'Grip Shoes'}"`);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [decision]);

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
      setFeedback({ msg: `✅ ${choice.text}! (+15 pts) · ${choice.reason}`, type: 'good' });
      speak(`Correct! ${choice.reason}`);
      setTimeout(() => {
        setSpeedBoost(false);
        setFeedback(null);
      }, 1600);
    } else {
      triggerSpinout(`❌ ${choice.penalty || 'Wrong choice!'} · Đúng là: "${correctChoice.text}"`);
    }
  }, [speak]);

  const triggerSpinout = useCallback((msg) => {
    spinoutRef.current = true;
    setSpinout(true);
    decisionRef.current = null;
    setDecision(null);
    scoreRef.current = Math.max(0, scoreRef.current - 5);
    setScore(scoreRef.current);
    setFeedback({ msg, type: 'bad' });
    speak('Spin out! Be careful with friction!');

    setTimeout(() => {
      spinoutRef.current = false;
      setSpinout(false);
      setFeedback(null);
    }, 2000);
  }, [speak]);

  // Keyboard controls support
  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKey = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') steerToLane(laneRef.current - 1);
      if (e.key === 'ArrowDown' || e.key === 's') steerToLane(laneRef.current + 1);
      if (decisionRef.current) {
        if (e.key === 'ArrowLeft' || e.key === '1') makeDecision(decisionRef.current.A);
        if (e.key === 'ArrowRight' || e.key === '2') makeDecision(decisionRef.current.B);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, steerToLane, makeDecision]);

  // 1-second clock
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
    nextObsAt.current = 350;
    nextDecisionAt.current = 500;
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

  const stripeOffset = trackPos % 80;

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '420px',
      background: 'linear-gradient(180deg, #0b1e36 0%, #152e4d 40%, #0d2138 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Top HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🏎️</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#4ade80', letterSpacing: '0.05em' }}>PHYSICS DRIFT RACE</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{obsData.theme}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
          <div style={{ fontSize: '56px', filter: 'drop-shadow(0 0 16px rgba(74,222,128,0.5))' }}>🏎️</div>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 900, color: '#4ade80' }}>
              Physics Drift Runner!
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', maxWidth: '340px', lineHeight: 1.5 }}>
              Click on any lane or use the <b>▲/▼ buttons</b> to change lanes. When an obstacle barrier appears, listen to the voice and pick the correct friction choice!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(5,150,105,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🏎️</span> START ENGINE
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Main Road Area with 3 Clickable Lanes */}
          <div style={{ flex: 1, position: 'relative', background: '#1e293b', overflow: 'hidden' }}>
            {/* Lane 0 (Top) */}
            <div
              onClick={() => steerToLane(0)}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '33.33%',
                borderBottom: '2px dashed rgba(251,191,36,0.5)',
                cursor: 'pointer', background: lane === 0 ? 'rgba(74,222,128,0.08)' : 'transparent',
                display: 'flex', alignItems: 'center', paddingLeft: '12px',
              }}
            >
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 800 }}>LANE 1 (TOP)</span>
            </div>

            {/* Lane 1 (Middle) */}
            <div
              onClick={() => steerToLane(1)}
              style={{
                position: 'absolute', top: '33.33%', left: 0, right: 0, height: '33.33%',
                borderBottom: '2px dashed rgba(251,191,36,0.5)',
                cursor: 'pointer', background: lane === 1 ? 'rgba(74,222,128,0.08)' : 'transparent',
                display: 'flex', alignItems: 'center', paddingLeft: '12px',
              }}
            >
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 800 }}>LANE 2 (MID)</span>
            </div>

            {/* Lane 2 (Bottom) */}
            <div
              onClick={() => steerToLane(2)}
              style={{
                position: 'absolute', top: '66.66%', left: 0, right: 0, height: '33.33%',
                cursor: 'pointer', background: lane === 2 ? 'rgba(74,222,128,0.08)' : 'transparent',
                display: 'flex', alignItems: 'center', paddingLeft: '12px',
              }}
            >
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 800 }}>LANE 3 (BOT)</span>
            </div>

            {/* Scrolling Road Stripes */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <React.Fragment key={i}>
                <div style={{
                  position: 'absolute', top: '33.33%', height: '6px', width: '40px',
                  left: `${((i * 80 - stripeOffset + 1200) % 700) - 40}px`,
                  background: '#fbbf24', borderRadius: '3px', transform: 'translateY(-50%)', opacity: 0.8
                }} />
                <div style={{
                  position: 'absolute', top: '66.66%', height: '6px', width: '40px',
                  left: `${((i * 80 - stripeOffset + 1200) % 700) - 40}px`,
                  background: '#fbbf24', borderRadius: '3px', transform: 'translateY(-50%)', opacity: 0.8
                }} />
              </React.Fragment>
            ))}

            {/* Small obstacles on road */}
            {obstacles.filter(o => o.type === 'small').map(o => (
              <div key={o.id} style={{
                position: 'absolute',
                left: `${(o.x / 540) * 100}%`,
                top: `${(o.lane * 33.33) + 16.66}%`,
                fontSize: '28px',
                transform: 'translate(-50%, -50%)',
                filter: o.hit ? 'grayscale(1) opacity(0.3)' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                zIndex: 15,
                pointerEvents: 'none',
              }}>
                {o.icon}
              </div>
            ))}

            {/* The Player's Car */}
            <div style={{
              position: 'absolute',
              left: '90px',
              top: `${(lane * 33.33) + 16.66}%`,
              fontSize: '34px',
              transform: `translate(-50%, -50%) ${spinout ? 'rotate(180deg)' : speedBoost ? 'scale(1.2)' : ''}`,
              transition: 'top 0.2s cubic-bezier(0.34,1.56,0.64,1), transform 0.3s',
              zIndex: 25,
              pointerEvents: 'none',
              filter: spinout ? 'hue-rotate(180deg)' : speedBoost ? 'brightness(1.5)' : 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))',
            }}>
              🏎️
              {speedBoost && <span style={{ position: 'absolute', left: '-26px', top: '-6px', fontSize: '20px' }}>💨</span>}
            </div>

            {/* On-screen Steering Buttons (Left/Bottom Corner) */}
            <div style={{
              position: 'absolute', left: '16px', bottom: '12px',
              display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 30,
            }}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); steerToLane(lane - 1); }}
                disabled={lane === 0}
                style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: lane === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(74,222,128,0.9)',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  color: lane === 0 ? '#64748b' : '#0f172a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: lane === 0 ? 'default' : 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                }}
                title="Steer Up"
              >
                <ArrowUp size={22} strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); steerToLane(lane + 1); }}
                disabled={lane === 2}
                style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: lane === 2 ? 'rgba(255,255,255,0.08)' : 'rgba(74,222,128,0.9)',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  color: lane === 2 ? '#64748b' : '#0f172a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: lane === 2 ? 'default' : 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                }}
                title="Steer Down"
              >
                <ArrowDown size={22} strokeWidth={3} />
              </button>
            </div>
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

          {/* CLIL DECISION PANEL (when obstacle arrives) */}
          {decision && (
            <div style={{
              padding: '12px 16px', background: 'rgba(15,23,42,0.96)',
              borderTop: '2px solid #f59e0b', zIndex: 40, flexShrink: 0,
              boxShadow: '0 -8px 24px rgba(0,0,0,0.6)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{decision.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#fbbf24' }}>
                    {decision.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => speak(decision.label)}
                    style={{
                      background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)',
                      color: '#fbbf24', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800
                    }}
                  >
                    <Volume2 size={14} /> <span>Listen</span>
                  </button>
                </div>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: countdown <= 2 ? '#ef4444' : '#10b981',
                  color: '#fff', fontWeight: 900, fontSize: '14px',
                  boxShadow: `0 0 10px ${countdown <= 2 ? '#ef4444' : '#10b981'}`,
                }}>
                  {countdown}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => makeDecision(decision.A)}
                  style={{
                    flex: 1, padding: '12px 14px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.15))',
                    border: '2px solid #3b82f6', color: '#bfdbfe', fontWeight: 900, fontSize: '14px',
                    cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.2)',
                  }}
                >
                  Option A: {decision.A.text}
                </button>
                <button
                  type="button"
                  onClick={() => makeDecision(decision.B)}
                  style={{
                    flex: 1, padding: '12px 14px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(168,85,247,0.15))',
                    border: '2px solid #a855f7', color: '#e9d5ff', fontWeight: 900, fontSize: '14px',
                    cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 12px rgba(168,85,247,0.2)',
                  }}
                >
                  Option B: {decision.B.text}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME OVER STATE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px' }}>🏆</div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 900, color: '#4ade80' }}>
              Race Finished!
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
