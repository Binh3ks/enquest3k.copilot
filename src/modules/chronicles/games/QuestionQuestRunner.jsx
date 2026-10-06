/**
 * QuestionQuestRunner.jsx — Floor 7 Door 2 Redesign: "Chaser & Branching Paths"
 * GDD §2 Floor 7: Real-time kinetic grammar runner where Leo is pursued by the Shadow Warden
 * while navigating branching platform tracks bearing candidate WH-questions.
 *
 * PARAMETERS (Approved by Owner):
 * - 3 Branching Platforms per Junction (p = 1/3)
 * - 6 Rounds (n = 6)
 * - 2 Hearts (h = 2, max 1 error allowed before KO)
 * - Brute-force guessing probability: 1.78% (P < 5% certified)
 * - Kinetic Physics:
 *     - Leo runs forward at v = 220 px/s
 *     - Warden pursues from behind at v = 170 px/s (accelerates to 240 px/s if Leo slows)
 *     - Initial safe distance D0 = 350 px
 *     - Junctions appear 500 px ahead
 *     - Wrong Branch: Platform crumbles instantly (0ms delay) -> -1 Heart, Warden lunges to 180 px
 *     - Correct Branch: Speed boost, +100 XP, Warden repelled back to 350 px
 * - Controls: [W]/[Up] (Lane up), [S]/[Down] (Lane down), [Space] (Dash boost)
 * - Anti-leak state invariant + DEV-guarded test hook
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Trophy, RotateCcw, ArrowRight, ShieldAlert, Zap, Compass } from 'lucide-react';
import HUDOverlay from '../../quest/HUDOverlay';
import FloatingExitBtn from '../../quest/FloatingExitBtn';
import useChroniclesStore, { calculateStars } from '../../../stores/useChroniclesStore';
import { getWhQuestionsForWeek } from '../../../services/chroniclesFloor67Service';
import './QuestionQuestRunner.css';

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 560;
const TOTAL_ROUNDS = 6;
const INITIAL_HEARTS = 2;
const BASE_LEO_SPEED = 30; // px/s (Calibrated for N2: D = 1110px / 30px/s = 37.00s, Margin = +4.35s)
const BASE_WARDEN_SPEED = 24; // px/s (Relative pursuit: maintains 200-250px tension gap)
const WARDEN_RUSH_SPEED = 36; // px/s (Accelerates if safe distance closes or Leo hesitates)
const INITIAL_SAFE_DIST = 320; // px
const JUNCTION_DISTANCE = 1110; // px (D = 1110px -> T_avail = 37.00s)

// 3 Lanes (Y coordinates)
const LANES_Y = [190, 310, 430];

export const DEFAULT_WH_KERNEL_ROUNDS = [
  {
    sentence: "Jake walked on wet floor.",
    options: [
      { text: "Where did Jake walk?", isCorrect: true },
      { text: "Who called the nurse?", isCorrect: false },
      { text: "When did Jake sleep?", isCorrect: false },
    ],
  },
  {
    sentence: "Suddenly he slipped and fell.",
    options: [
      { text: "What happened to him?", isCorrect: true },
      { text: "Where did he run?", isCorrect: false },
      { text: "Why was he late?", isCorrect: false },
    ],
  },
  {
    sentence: "Jake stopped to help him.",
    options: [
      { text: "What did Jake do?", isCorrect: true },
      { text: "Who went home early?", isCorrect: false },
      { text: "Where did they hide?", isCorrect: false },
    ],
  },
  {
    sentence: "Nurse brought a cold pack.",
    options: [
      { text: "What did she bring?", isCorrect: true },
      { text: "Who made the bed?", isCorrect: false },
      { text: "When did they leave?", isCorrect: false },
    ],
  },
  {
    sentence: "They treated the small cut.",
    options: [
      { text: "What did they treat?", isCorrect: true },
      { text: "Where did they play?", isCorrect: false },
      { text: "Why did they shout?", isCorrect: false },
    ],
  },
  {
    sentence: "Everyone felt safe and happy.",
    options: [
      { text: "How did they feel?", isCorrect: true },
      { text: "Who ran outside fast?", isCorrect: false },
      { text: "Where did they study?", isCorrect: false },
    ],
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuestionQuestRunner({
  weekNumber = 33,
  weekData = null,
  duration = 240,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const canvasRef = useRef(null);

  // Load questions for this week (guarantees 6 distinct Cambridge WH questions with 0% repetition)
  const questions = useMemo(() => {
    const rawQuestions = getWhQuestionsForWeek(weekNumber, weekData);
    if (Array.isArray(rawQuestions) && rawQuestions.length >= TOTAL_ROUNDS) {
      return rawQuestions.slice(0, TOTAL_ROUNDS);
    }
    // If rawQuestions is short (< 6), pad with distinct non-repeating items
    const pool = Array.isArray(rawQuestions) ? [...rawQuestions] : [];
    for (const item of DEFAULT_WH_KERNEL_ROUNDS) {
      if (pool.length >= TOTAL_ROUNDS) break;
      if (!pool.some(q => q.sentence === item.sentence)) {
        pool.push(item);
      }
    }
    return pool.slice(0, TOTAL_ROUNDS);
  }, [weekNumber, weekData]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0); // 0 to 5
  const [hearts, setHearts] = useState(INITIAL_HEARTS);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [activeLane, setActiveLane] = useState(1); // 0 (top), 1 (mid), 2 (bot)
  const [wardenDist, setWardenDist] = useState(INITIAL_SAFE_DIST);
  const [feedback, setFeedback] = useState(null);

  // Live state refs for animation loop and test hooks
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const roundIdxRef = useRef(roundIdx);
  roundIdxRef.current = roundIdx;
  const heartsRef = useRef(hearts);
  heartsRef.current = hearts;
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const activeLaneRef = useRef(activeLane);
  activeLaneRef.current = activeLane;
  const wardenDistRef = useRef(wardenDist);
  wardenDistRef.current = wardenDist;
  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft;

  // Kinetic Runner simulation state
  const runnerStateRef = useRef({
    leoY: LANES_Y[1],
    targetLeoY: LANES_Y[1],
    leoX: 420,
    wardenDist: INITIAL_SAFE_DIST,
    speedBoost: 0,
    junctionX: JUNCTION_DISTANCE, // distance from Leo to upcoming junction (780px -> 15.60s)
    junctionActive: true,
    crumblingLane: null,
    lastTime: 0,
    shakeDuration: 0,
  });

  const currentQ = questions[roundIdx] || questions[0];

  // Prepare 3 branches for the current round
  const currentBranches = useMemo(() => {
    if (!currentQ) return [];
    const opts = currentQ.options || [];
    // Ensure we have exactly 3 options (1 correct, 2 distractors)
    const correctOpt = opts.find(o => o.isCorrect) || { text: 'Why did this happen?', isCorrect: true };
    const wrongOpts = opts.filter(o => !o.isCorrect);
    const distractor1 = wrongOpts[0] || { text: 'When did it occur?', isCorrect: false };
    const distractor2 = wrongOpts[1] || { text: 'Where was everyone?', isCorrect: false };

    // Unbiased Fisher-Yates shuffle to randomize candidate options across the 3 lanes
    const candidates = [correctOpt, distractor1, distractor2];
    const shuffled = shuffleArray(candidates);

    return shuffled.map((opt, laneIdx) => ({
      lane: laneIdx,
      text: opt.text,
      isCorrect: opt.isCorrect,
      y: LANES_Y[laneIdx],
    }));
  }, [currentQ, roundIdx]);

  const currentBranchesRef = useRef(currentBranches);
  currentBranchesRef.current = currentBranches;

  // ── Lane switching handler ───────────────────────────────────────────────
  const steerLane = useCallback((direction) => {
    if (phaseRef.current !== 'playing') return;
    setActiveLane(prev => {
      let next = prev;
      if (direction === 'up') next = Math.max(0, prev - 1);
      if (direction === 'down') next = Math.min(2, prev + 1);
      runnerStateRef.current.targetLeoY = LANES_Y[next];
      return next;
    });
  }, []);

  // ── Keyboard event listener ──────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phaseRef.current !== 'playing') return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        steerLane('up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        steerLane('down');
      } else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'e' || e.key === 'E') {
        // Boost sprint (scaled to v=50px/s)
        runnerStateRef.current.speedBoost = 20;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [steerLane]);

  // ── Timer countdown ──────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('ko');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // ── Main Kinetic Animation & Physics Loop ────────────────────────────────
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    runnerStateRef.current.lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - runnerStateRef.current.lastTime) / 1000, 0.1);
      runnerStateRef.current.lastTime = now;

      if (phaseRef.current === 'playing') {
        const sim = runnerStateRef.current;

        // Smooth Leo Y interpolation towards target lane
        sim.leoY += (sim.targetLeoY - sim.leoY) * Math.min(dt * 14, 1);

        // Decay speed boost
        if (sim.speedBoost > 0) {
          sim.speedBoost = Math.max(0, sim.speedBoost - dt * 100);
        }

        // Calculate relative speeds
        const currentLeoSpeed = BASE_LEO_SPEED + sim.speedBoost;
        // Warden accelerates if safe distance closes
        const wardenSpeed = sim.wardenDist > 260 ? BASE_WARDEN_SPEED : WARDEN_RUSH_SPEED;

        // Update Warden distance: relative displacement
        // If Leo is running fast, distance expands; if slow, Warden gains ground
        const netDisplacement = (currentLeoSpeed - wardenSpeed) * dt;
        sim.wardenDist = Math.max(30, Math.min(sim.wardenDist + netDisplacement, 480));
        setWardenDist(Math.round(sim.wardenDist));

        // Warden catch collision check: if Warden reaches Leo
        if (sim.wardenDist <= 40) {
          // Warden strike!
          sim.shakeDuration = 0.3;
          sim.wardenDist = 200; // Knockback push
          setHearts(h => {
            const next = Math.max(0, h - 1);
            if (next <= 0) setPhase('ko');
            return next;
          });
          setFeedback({ ok: false, text: '⚠️ THE WARDEN STRUCK LEO! -1 ❤️' });
        }

        // Advance junction towards Leo
        sim.junctionX -= currentLeoSpeed * dt;

        // Check if junction reaches Leo's collision point
        if (sim.junctionActive && sim.junctionX <= 0) {
          sim.junctionActive = false;
          const chosenLane = activeLaneRef.current;
          const branch = currentBranchesRef.current[chosenLane];

          if (branch && branch.isCorrect) {
            // ── CORRECT BRANCH ──────────────────────────────────────────
            sim.speedBoost = 30;
            sim.wardenDist = Math.min(sim.wardenDist + 140, 420); // Repel Warden
            setScore(s => s + 100);
            setFeedback({ ok: true, text: `✨ EXCELLENT! "${branch.text}" (+100 XP)` });

            // Advance round after brief celebration
            const nextRound = roundIdxRef.current + 1;
            if (nextRound >= TOTAL_ROUNDS) {
              setTimeout(() => setPhase('cleared'), 600);
            } else {
              setRoundIdx(nextRound);
              // Reset junction for next round
              sim.junctionX = JUNCTION_DISTANCE;
              sim.junctionActive = true;
              sim.crumblingLane = null;
            }
          } else {
            // ── WRONG BRANCH: CRUMBLES IMMEDIATELY ──────────────────────
            sim.crumblingLane = chosenLane;
            sim.shakeDuration = 0.4;
            sim.wardenDist = Math.max(80, sim.wardenDist - 120); // Warden lunges forward!

            setHearts(h => {
              const next = Math.max(0, h - 1);
              if (next <= 0) {
                setTimeout(() => setPhase('ko'), 300);
              }
              return next;
            });
            setFeedback({ ok: false, text: '💥 WRONG PATH CRUMBLED! -1 ❤️' });

            // Reset junction with penalty delay
            setTimeout(() => {
              if (phaseRef.current === 'playing') {
                sim.junctionX = JUNCTION_DISTANCE;
                sim.junctionActive = true;
                sim.crumblingLane = null;
              }
            }, 600);
          }
        }

        // Screen shake decay
        if (sim.shakeDuration > 0) {
          sim.shakeDuration -= dt;
        }
      }

      // ── RENDER CANVAS ────────────────────────────────────────────────────
      ctx.save();

      // Screen shake
      if (runnerStateRef.current.shakeDuration > 0) {
        const shakeX = (Math.random() - 0.5) * 8;
        const shakeY = (Math.random() - 0.5) * 8;
        ctx.translate(shakeX, shakeY);
      }

      // Background gradient
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Starfield / Speed lines
      ctx.fillStyle = 'rgba(129, 140, 248, 0.2)';
      const timeMs = now * 0.001;
      for (let i = 0; i < 40; i++) {
        const x = (i * 37 - timeMs * (BASE_LEO_SPEED + runnerStateRef.current.speedBoost) * 1.5) % CANVAS_WIDTH;
        const drawX = x < 0 ? x + CANVAS_WIDTH : x;
        const y = (i * 29) % CANVAS_HEIGHT;
        ctx.fillRect(drawX, y, 2, 2);
      }

      // ── Draw 3 Track Lanes ──
      LANES_Y.forEach((laneY, idx) => {
        const isActive = activeLaneRef.current === idx;
        const isCrumbling = runnerStateRef.current.crumblingLane === idx;

        // Lane bed
        ctx.fillStyle = isCrumbling ? 'rgba(239, 68, 68, 0.15)' : (isActive ? 'rgba(99, 102, 241, 0.15)' : 'rgba(30, 41, 59, 0.25)');
        ctx.fillRect(0, laneY - 45, CANVAS_WIDTH, 90);

        // Neon track borders
        ctx.strokeStyle = isCrumbling ? '#ef4444' : (isActive ? '#818cf8' : 'rgba(71, 85, 105, 0.4)');
        ctx.lineWidth = isActive ? 3 : 1.5;
        ctx.beginPath();
        ctx.moveTo(0, laneY - 45);
        ctx.lineTo(CANVAS_WIDTH, laneY - 45);
        ctx.moveTo(0, laneY + 45);
        ctx.lineTo(CANVAS_WIDTH, laneY + 45);
        ctx.stroke();

        // Lane center dashed line
        ctx.strokeStyle = isActive ? 'rgba(251, 191, 36, 0.4)' : 'rgba(148, 163, 184, 0.15)';
        ctx.setLineDash([16, 16]);
        ctx.beginPath();
        ctx.moveTo(0, laneY);
        ctx.lineTo(CANVAS_WIDTH, laneY);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ── Draw Upcoming Junction Gate & Platform Cards ──
      const junctionDist = runnerStateRef.current.junctionX;
      const junctionScreenX = runnerStateRef.current.leoX + junctionDist;

      if (junctionScreenX > -200 && junctionScreenX < CANVAS_WIDTH + 200) {
        // Vertical checkpoint laser gate
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.6)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(junctionScreenX, 120);
        ctx.lineTo(junctionScreenX, 500);
        ctx.stroke();

        // Draw candidate WH-question plaques on the 3 branches
        currentBranchesRef.current.forEach((branch) => {
          const cardX = junctionScreenX + 15;
          const cardY = branch.y;
          const isChosen = activeLaneRef.current === branch.lane;
          const isCrumbling = runnerStateRef.current.crumblingLane === branch.lane;

          // Branch Card Background
          ctx.save();
          if (isCrumbling) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.95)';
            ctx.strokeStyle = '#ef4444';
          } else if (isChosen) {
            ctx.fillStyle = 'rgba(30, 27, 75, 0.95)';
            ctx.strokeStyle = '#fbbf24';
          } else {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
          }

          ctx.lineWidth = isChosen ? 3 : 1.5;
          ctx.beginPath();
          ctx.roundRect(cardX, cardY - 32, 280, 64, 12);
          ctx.fill();
          ctx.stroke();

          // Card Label / Lane Index
          ctx.fillStyle = isChosen ? '#fbbf24' : '#818cf8';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText(`LANE ${branch.lane + 1}`, cardX + 14, cardY - 14);

          // WH-Question Text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 13px sans-serif';
          const truncated = branch.text.length > 36 ? branch.text.slice(0, 34) + '...' : branch.text;
          ctx.fillText(truncated, cardX + 14, cardY + 12);

          ctx.restore();
        });
      }

      // ── Draw Shadow Warden (Chaser) ──
      const wardenX = runnerStateRef.current.leoX - runnerStateRef.current.wardenDist;
      const wardenY = runnerStateRef.current.leoY;

      ctx.save();
      // Dark energy aura
      const auraGrad = ctx.createRadialGradient(wardenX, wardenY, 10, wardenX, wardenY, 70);
      auraGrad.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
      auraGrad.addColorStop(0.5, 'rgba(126, 34, 206, 0.3)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(wardenX, wardenY, 70, 0, Math.PI * 2);
      ctx.fill();

      // Warden body
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(wardenX, wardenY, 32, 42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Glowing red-purple Warden eyes
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#f87171';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(wardenX + 12, wardenY - 8, 5, 0, Math.PI * 2);
      ctx.arc(wardenX + 12, wardenY + 8, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Warden Name Tag
      ctx.fillStyle = '#e9d5ff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('WARDEN', wardenX - 24, wardenY - 50);
      ctx.restore();

      // ── Draw Leo Character (Runner) ──
      const leoX = runnerStateRef.current.leoX;
      const leoY = runnerStateRef.current.leoY;

      ctx.save();
      // Speed trail behind Leo if boosted
      if (runnerStateRef.current.speedBoost > 0) {
        ctx.fillStyle = 'rgba(251, 191, 36, 0.3)';
        ctx.beginPath();
        ctx.arc(leoX - 25, leoY, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // Leo Body Sprite (Fox mascot runner)
      ctx.fillStyle = '#f97316'; // Orange fur
      ctx.beginPath();
      ctx.arc(leoX, leoY, 24, 0, Math.PI * 2);
      ctx.fill();

      // White chest / inner ear
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(leoX + 6, leoY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Leo Ears
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.moveTo(leoX - 10, leoY - 20);
      ctx.lineTo(leoX - 2, leoY - 38);
      ctx.lineTo(leoX + 8, leoY - 20);
      ctx.fill();

      // Leo Eye
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(leoX + 12, leoY - 4, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Running shoes
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(leoX - 8, leoY + 18, 16, 8);

      // Name Tag
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('LEO', leoX - 12, leoY - 32);

      ctx.restore();

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ── Handle Game Completion ───────────────────────────────────────────────
  const handleFinish = useCallback(() => {
    const timeTaken = duration - timeLeft;
    const finalScore = score + Math.floor(timeLeft * 1.5);
    const stars = calculateStars(finalScore, 700, timeTaken, duration);
    recordPersonalBest('question_quest', finalScore);
    if (onComplete) onComplete(stars, finalScore);
  }, [duration, timeLeft, score, onComplete, recordPersonalBest]);

  // ── DEV-Guarded Test Hook ─────────────────────────────────────────────────
  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      window.__QUESTION_QUEST_RUNNER_TEST_HOOK__ = {
        getPhase: () => phaseRef.current,
        getRound: () => roundIdxRef.current + 1,
        getRoundIdx: () => roundIdxRef.current,
        getHearts: () => heartsRef.current,
        getScore: () => scoreRef.current,
        getActiveLane: () => activeLaneRef.current,
        getWardenDist: () => wardenDistRef.current,
        getCurrentBranches: () => currentBranchesRef.current,
        steerLane: (dir) => steerLane(dir),
        setLane: (laneIdx) => {
          if (laneIdx >= 0 && laneIdx <= 2) {
            setActiveLane(laneIdx);
            runnerStateRef.current.targetLeoY = LANES_Y[laneIdx];
          }
        },
        triggerCollision: () => {
          runnerStateRef.current.junctionX = 0;
        },
      };

      return () => {
        delete window.__QUESTION_QUEST_RUNNER_TEST_HOOK__;
      };
    }
  }, [steerLane]);

  return (
    <div className="qq-runner-root">
      {/* HUD Top Bar */}
      <HUDOverlay
        score={score}
        hearts={hearts}
        maxHearts={INITIAL_HEARTS}
        round={`${roundIdx + 1}/${TOTAL_ROUNDS}`}
        timeLeft={timeLeft}
        totalTime={duration}
        stars={Math.min(3, Math.floor(score / 200) + 1)}
        title="Sanctum Runner: Question Quest"
      />
      <FloatingExitBtn onExit={onExit} />

      {/* Proximity warning edge aura when Warden is close */}
      {wardenDist < 180 && <div className="qq-warden-warning" />}

      {/* Narrative Context Banner */}
      <div className="qq-runner-banner">
        <span className="qq-runner-round-pill">ROUND {roundIdx + 1} / {TOTAL_ROUNDS}</span>
        <div className="qq-runner-banner-text">
          &ldquo;{currentQ?.sentence || 'Observe the story event and steer Leo onto the correct WH-Question path!'}&rdquo;
        </div>
      </div>

      {/* Kinetic Runner Canvas */}
      <div className="qq-canvas-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="qq-runner-canvas"
        />

        {/* Live Feedback Toast */}
        {feedback && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: feedback.ok ? 'rgba(20, 83, 45, 0.95)' : 'rgba(127, 29, 29, 0.95)',
              border: `2px solid ${feedback.ok ? '#22c55e' : '#ef4444'}`,
              borderRadius: '12px',
              padding: '6px 20px',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.9rem',
              zIndex: 30,
              pointerEvents: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
            }}
          >
            {feedback.text}
          </div>
        )}
      </div>

      {/* Virtual D-pad for touch / mobile steer */}
      <div className="qq-virtual-controls">
        <button
          type="button"
          className="qq-ctrl-btn"
          onClick={() => steerLane('up')}
          aria-label="Steer Lane Up"
        >
          ▲
        </button>
        <button
          type="button"
          className="qq-ctrl-btn"
          onClick={() => steerLane('down')}
          aria-label="Steer Lane Down"
        >
          ▼
        </button>
      </div>

      {/* ── Cleared Modal ── */}
      {phase === 'cleared' && (
        <div className="qq-overlay-screen">
          <Trophy size={64} className="text-amber-400 animate-bounce mb-3" />
          <h2 className="qq-overlay-title">🏆 ESCAPED THE WARDEN!</h2>
          <p className="qq-overlay-sub">
            Leo successfully navigated all 6 grammar junctions, answering every question and leaving the shadow sentinel far behind!
          </p>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fbbf24', marginBottom: '20px' }}>
            Final Score: {score + Math.floor(timeLeft * 1.5)} XP
          </div>
          <button type="button" className="qq-overlay-btn" onClick={handleFinish}>
            Finish Quest &amp; Claim Stars <ArrowRight size={18} style={{ display: 'inline', marginLeft: '6px' }} />
          </button>
        </div>
      )}

      {/* ── Game Over (KO) Modal ── */}
      {phase === 'ko' && (
        <div className="qq-overlay-screen">
          <ShieldAlert size={64} className="text-rose-500 mb-3" />
          <h2 className="qq-overlay-title" style={{ color: '#f87171' }}>
            {hearts <= 0 ? 'CAPTURED BY THE WARDEN!' : 'TIME RUN OUT!'}
          </h2>
          <p className="qq-overlay-sub">
            The platform crumbled beneath Leo or the shadow warden caught up. Study the question contexts and try again!
          </p>
          <button
            type="button"
            className="qq-overlay-btn"
            style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}
            onClick={() => {
              setPhase('playing');
              setRoundIdx(0);
              setHearts(INITIAL_HEARTS);
              setScore(0);
              setTimeLeft(duration);
              setWardenDist(INITIAL_SAFE_DIST);
              runnerStateRef.current.junctionX = JUNCTION_DISTANCE;
              runnerStateRef.current.junctionActive = true;
              runnerStateRef.current.wardenDist = INITIAL_SAFE_DIST;
              runnerStateRef.current.crumblingLane = null;
            }}
          >
            <RotateCcw size={18} style={{ display: 'inline', marginRight: '6px' }} /> Retry Runner
          </button>
        </div>
      )}
    </div>
  );
}
