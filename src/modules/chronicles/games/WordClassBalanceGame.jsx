/**
 * WordClassBalanceGame.jsx — Dual-Scale Tilt Arena (Floor 7 Door 3 Redesign)
 *
 * Mechanic (Phương án 1 — Dual-Scale Tilt Arena):
 * - Central balance scale with 2 plates: NOUN (Left Pan) vs VERB (Right Pan).
 * - Leo stands on the tilting yoke/beam, moving with A/D or ArrowLeft/ArrowRight.
 * - Falling vocabulary orbs drop from the sky.
 * - Player positions Leo near the orb and presses SPACE (or directional strike)
 *   to deflect the orb into the targeted plate:
 *     - Facing Left (A / Left) + SPACE  -> Deflect to Left Pan (NOUN)
 *     - Facing Right (D / Right) + SPACE -> Deflect to Right Pan (VERB)
 * - Correct Sort:
 *     - +100 XP, scale auto-balances (tilt pulls back towards 0°).
 *     - Balance streak increases towards 8 consecutive correct orbs (P = 0.39%).
 * - Wrong Sort or Dropped Orb (Free Fall):
 *     - Plate takes heavy imbalance weight (+12° to +15° tilt).
 *     - Streak resets to 0.
 * - Critical Tilt Hazard:
 *     - Tilt angle |theta| > 25° -> Leo slips off the beam!
 *     - Lose 1 heart immediately (-1 ❤️).
 *     - Scale undergoes emergency counter-weight re-centering.
 *     - 2 hearts total (allowed 1 failure before KO).
 * - Win condition: 8 consecutive correct orbs within 45s round.
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Heart, Scale, Sparkles, Trophy, RotateCcw, AlertTriangle, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import './WordClassBalanceGame.css';

// ── Word Banks per Week ──────────────────────────────────────────────────────
const CURRICULUM_WORDS = {
  33: [
    { word: 'corridor', role: 'NOUN', meaning: 'hành lang trường học' },
    { word: 'slipped', role: 'VERB', meaning: 'trượt chân ngã' },
    { word: 'bandage', role: 'NOUN', meaning: 'băng gạc y tế' },
    { word: 'treat', role: 'VERB', meaning: 'chữa trị vết thương' },
    { word: 'nurse', role: 'NOUN', meaning: 'cô y tá trường học' },
    { word: 'walk', role: 'VERB', meaning: 'đi bộ cẩn thận' },
    { word: 'mistake', role: 'NOUN', meaning: 'sai sót nguy hiểm' },
    { word: 'help', role: 'VERB', meaning: 'giúp đỡ bạn bè' },
    { word: 'floor', role: 'NOUN', meaning: 'mặt sàn trơn trượt' },
    { word: 'stop', role: 'VERB', meaning: 'dừng lại kịp thời' },
    { word: 'shoes', role: 'NOUN', meaning: 'đôi giày đế cao su' },
    { word: 'slide', role: 'VERB', meaning: 'trượt dài trên nền' },
  ],
  35: [
    { word: 'tent', role: 'NOUN', meaning: 'chiếc lều cắm trại' },
    { word: 'climb', role: 'VERB', meaning: 'leo trèo lên dốc núi' },
    { word: 'campfire', role: 'NOUN', meaning: 'đống lửa trại ấm áp' },
    { word: 'roast', role: 'VERB', meaning: 'nướng kẹo xốp' },
    { word: 'mountain', role: 'NOUN', meaning: 'ngọn núi thông' },
    { word: 'hike', role: 'VERB', meaning: 'đi bộ đường dài' },
    { word: 'stream', role: 'NOUN', meaning: 'con suối rừng trong vắt' },
    { word: 'escape', role: 'VERB', meaning: 'trốn thoát khỏi bẫy' },
    { word: 'hunter', role: 'NOUN', meaning: 'người thợ săn' },
    { word: 'rescue', role: 'VERB', meaning: 'giải cứu đồng đội' },
    { word: 'rope', role: 'NOUN', meaning: 'sợi dây thừng dày' },
    { word: 'sleep', role: 'VERB', meaning: 'ngủ say dưới bóng cây' },
  ],
};

const GENERIC_WORDS = [
  { word: 'castle', role: 'NOUN', meaning: 'lâu đài cổ kính' },
  { word: 'explore', role: 'VERB', meaning: 'thám hiểm vùng đất' },
  { word: 'compass', role: 'NOUN', meaning: 'la bàn định hướng' },
  { word: 'discover', role: 'VERB', meaning: 'khám phá kho báu' },
  { word: 'bridge', role: 'NOUN', meaning: 'cây cầu gỗ bắc ngang' },
  { word: 'navigate', role: 'VERB', meaning: 'lái tàu vượt sóng' },
  { word: 'lantern', role: 'NOUN', meaning: 'chiếc đèn lồng phát sáng' },
  { word: 'protect', role: 'VERB', meaning: 'bảo vệ sự an toàn' },
  { word: 'island', role: 'NOUN', meaning: 'hòn đảo bí mật' },
  { word: 'ignite', role: 'VERB', meaning: 'thắp lên ngọn lửa' },
];

const TARGET_STREAK = 8;
const MAX_HEARTS = 2;
const CRITICAL_TILT = 25; // degrees
const ARENA_CX = 500;
const ARENA_CY = 490;

export default function WordClassBalanceGame({
  weekNumber = 33,
  duration = 45,
  onComplete,
  onExit,
}) {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [tiltDisplay, setTiltDisplay] = useState(0);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [feedback, setFeedback] = useState(null);

  // References for game loop
  const canvasRef = useRef(null);
  const phaseRef = useRef(phase);
  const heartsRef = useRef(hearts);
  const streakRef = useRef(streak);
  const scoreRef = useRef(score);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { heartsRef.current = hearts; }, [hearts]);
  useEffect(() => { streakRef.current = streak; }, [streak]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Vocabulary bank for this week
  const wordPool = useMemo(() => {
    const list = CURRICULUM_WORDS[weekNumber] || GENERIC_WORDS;
    // Shuffle deterministic
    return [...list].sort(() => 0.5 - Math.random());
  }, [weekNumber]);

  const wordIndexRef = useRef(0);

  // Physical simulation state
  const simRef = useRef({
    tilt: 0,            // current angle in degrees
    targetTilt: 0,      // target angle driven by plate weights
    leoX: 0,            // position on beam (-260 to +260, 0 = center)
    leoVelX: 0,
    facing: 'left',     // 'left' | 'right'
    isSwinging: 0,      // visual swing timer
    activeOrb: null,    // { word, role, meaning, x, y, vx, vy, state: 'falling'|'flying', targetPan: null }
    particles: [],      // visual sparks
    screenShake: 0,
    slipCooldown: 0,
    keys: { left: false, right: false },
    lastTime: performance.now(),
  });

  // Function to spawn next orb
  const spawnOrb = useCallback(() => {
    const pool = wordPool;
    const item = pool[wordIndexRef.current % pool.length];
    wordIndexRef.current += 1;

    // Spawn between -160 and +160 relative to center
    const spawnOffsetX = (Math.random() - 0.5) * 320;
    simRef.current.activeOrb = {
      word: item.word,
      role: item.role,
      meaning: item.meaning,
      x: ARENA_CX + spawnOffsetX,
      y: 60,
      vx: 0,
      vy: 135, // 135 px/s downward
      state: 'falling',
      targetPan: null,
      radius: 26,
    };
  }, [wordPool]);

  // ── Strike mechanic ────────────────────────────────────────────────────────
  const strikeOrb = useCallback((direction) => {
    if (phaseRef.current !== 'playing') return;
    const sim = simRef.current;
    const orb = sim.activeOrb;
    if (!orb || orb.state !== 'falling') return;

    // Calculate Leo world position
    const rad = (sim.tilt * Math.PI) / 180;
    const cx = ARENA_CX;
    const cy = ARENA_CY;
    const leoWorldX = cx + sim.leoX * Math.cos(rad);
    const leoWorldY = cy + sim.leoX * Math.sin(rad) - 28;

    // Check distance between Leo and Orb
    const dist = Math.hypot(orb.x - leoWorldX, orb.y - leoWorldY);
    const dir = direction || sim.facing;

    // Trigger visual swing
    sim.isSwinging = 0.25;
    sim.facing = dir;

    // Generous strike range threshold for smooth gameplay
    if (dist <= 110 || (Math.abs(orb.x - leoWorldX) < 95 && Math.abs(orb.y - leoWorldY) < 115)) {
      // Hit! Deflect towards chosen pan
      orb.state = 'flying';
      orb.targetPan = dir === 'left' ? 'NOUN' : 'VERB';

      // Arc trajectory towards the pan
      const targetPanX = dir === 'left' ? (cx - 320) : (cx + 320);
      const targetPanY = cy + (dir === 'left' ? -320 : 320) * Math.sin(rad) + 60;
      const flightDuration = 0.35; // seconds

      orb.vx = (targetPanX - orb.x) / flightDuration;
      orb.vy = (targetPanY - orb.y) / flightDuration - 120; // upward arch
    }
  }, []);

  // ── Keyboard event listener ────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phaseRef.current !== 'playing') return;
      const sim = simRef.current;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        sim.keys.left = true;
        sim.facing = 'left';
        sim.leoX = Math.max(-270, sim.leoX - 35); // tap impulse
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        sim.keys.right = true;
        sim.facing = 'right';
        sim.leoX = Math.min(270, sim.leoX + 35); // tap impulse
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        strikeOrb();
      }
    };

    const handleKeyUp = (e) => {
      const sim = simRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        sim.keys.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        sim.keys.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [strikeOrb]);

  // ── Timer countdown ────────────────────────────────────────────────────────
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

  // Spawn first orb on mount
  useEffect(() => {
    spawnOrb();
  }, [spawnOrb]);

  // ── Main Kinetic Animation & Physics Loop ──────────────────────────────────
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    simRef.current.lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - simRef.current.lastTime) / 1000, 0.1);
      simRef.current.lastTime = now;
      const sim = simRef.current;

      if (phaseRef.current === 'playing') {
        // 1. Leo Horizontal Movement
        if (sim.keys.left && !sim.keys.right) {
          sim.leoX = Math.max(-270, sim.leoX - 340 * dt);
          sim.facing = 'left';
        } else if (sim.keys.right && !sim.keys.left) {
          sim.leoX = Math.min(270, sim.leoX + 340 * dt);
          sim.facing = 'right';
        }

        // Decay swing animation
        if (sim.isSwinging > 0) {
          sim.isSwinging = Math.max(0, sim.isSwinging - dt);
        }

        // Screen shake decay
        if (sim.screenShake > 0) {
          sim.screenShake = Math.max(0, sim.screenShake - dt * 2.5);
        }

        // Slip cooldown decay
        if (sim.slipCooldown > 0) {
          sim.slipCooldown = Math.max(0, sim.slipCooldown - dt);
        }

        // 2. Scale Tilt Physics (Spring & Damping)
        sim.tilt += (sim.targetTilt - sim.tilt) * Math.min(dt * 6, 1);
        setTiltDisplay(Math.round(sim.tilt * 10) / 10);

        // 3. Critical Tilt Check (|tilt| > 25°)
        if (Math.abs(sim.tilt) >= CRITICAL_TILT && sim.slipCooldown <= 0) {
          // Leo slips off beam!
          sim.slipCooldown = 1.2;
          sim.screenShake = 0.5;
          sim.targetTilt = 0; // Emergency counter-weight reset
          sim.leoX = 0;

          setHearts(h => {
            const next = Math.max(0, h - 1);
            if (next <= 0) {
              setTimeout(() => setPhase('ko'), 400);
            }
            return next;
          });

          setStreak(0);
          setFeedback({
            isCorrect: false,
            text: `💥 CRITICAL TILT (>25°)! Leo slipped! -1 ❤️`,
          });
        }

        // 4. Orb Simulation
        const orb = sim.activeOrb;
        if (orb) {
          if (orb.state === 'falling') {
            orb.y += orb.vy * dt;

            // Calculate beam surface Y at orb's X
            const cx = ARENA_CX;
            const cy = ARENA_CY;
            const rad = (sim.tilt * Math.PI) / 180;
            const beamRelX = orb.x - cx;
            const beamSurfaceY = cy + beamRelX * Math.tan(rad);

            // Missed check: orb drops past the beam
            if (orb.y >= beamSurfaceY + 25) {
              // Orb dropped onto the scale without strike!
              sim.screenShake = 0.4;
              // Immediate critical tilt (> 25°)
              sim.targetTilt = beamRelX < 0 ? -26 : 26;

              setStreak(0);
              setFeedback({
                isCorrect: false,
                text: `⚠️ DROPPED ORB! "${orb.word}" fell! Scale overturned!`,
              });

              // Create impact particles
              for (let i = 0; i < 14; i++) {
                sim.particles.push({
                  x: orb.x,
                  y: orb.y,
                  vx: (Math.random() - 0.5) * 200,
                  vy: -Math.random() * 140,
                  life: 0.5,
                  color: '#f87171',
                });
              }

              sim.activeOrb = null;
              setTimeout(() => {
                if (phaseRef.current === 'playing') spawnOrb();
              }, 600);
            }
          } else if (orb.state === 'flying') {
            orb.x += orb.vx * dt;
            orb.y += orb.vy * dt;
            orb.vy += 450 * dt; // gravity arc

            // Target pan arrival check
            const cx = ARENA_CX;
            const cy = ARENA_CY;
            const rad = (sim.tilt * Math.PI) / 180;
            const panX = orb.targetPan === 'NOUN' ? (cx - 320) : (cx + 320);
            const panY = cy + (orb.targetPan === 'NOUN' ? -320 : 320) * Math.sin(rad) + 60;

            const distToPan = Math.hypot(orb.x - panX, orb.y - panY);
            if (distToPan < 55 || (orb.vy > 0 && orb.y >= panY - 10)) {
              // Orb landed in the targeted pan!
              const isCorrect = orb.role === orb.targetPan;

              if (isCorrect) {
                // ── CORRECT SORT ──────────────────────────────────────────
                // Scale auto-balances: tilt pulls back towards level!
                sim.targetTilt = 0;
                setScore(s => s + 100);

                const nextStreak = streakRef.current + 1;
                setStreak(nextStreak);

                setFeedback({
                  isCorrect: true,
                  text: `✨ BALANCED! "${orb.word}" is indeed a ${orb.role}! (+100 XP)`,
                });

                // Sparkles explosion
                for (let i = 0; i < 20; i++) {
                  sim.particles.push({
                    x: panX,
                    y: panY,
                    vx: (Math.random() - 0.5) * 260,
                    vy: -Math.random() * 200,
                    life: 0.7,
                    color: orb.role === 'NOUN' ? '#38bdf8' : '#f97316',
                  });
                }

                // Win check: 8 consecutive correct orbs
                if (nextStreak >= TARGET_STREAK) {
                  setTimeout(() => setPhase('cleared'), 500);
                } else {
                  sim.activeOrb = null;
                  setTimeout(() => {
                    if (phaseRef.current === 'playing') spawnOrb();
                  }, 400);
                }
              } else {
                // ── WRONG SORT ────────────────────────────────────────────
                // Imbalance: wrong plate takes heavy weight -> triggers critical tilt > 25°!
                sim.targetTilt = orb.targetPan === 'NOUN' ? -26 : 26;
                sim.screenShake = 0.4;
                setStreak(0);
                setFeedback({
                  isCorrect: false,
                  text: `💥 IMBALANCE! "${orb.word}" is a ${orb.role}, not a ${orb.targetPan}! Scale overturned!`,
                });

                // Negative shock particles
                for (let i = 0; i < 16; i++) {
                  sim.particles.push({
                    x: panX,
                    y: panY,
                    vx: (Math.random() - 0.5) * 200,
                    vy: -Math.random() * 150,
                    life: 0.6,
                    color: '#ef4444',
                  });
                }

                sim.activeOrb = null;
                setTimeout(() => {
                  if (phaseRef.current === 'playing') spawnOrb();
                }, 500);
              }
            }
          }
        }

        // 5. Update Particles
        for (let i = sim.particles.length - 1; i >= 0; i--) {
          const p = sim.particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life -= dt;
          if (p.life <= 0) {
            sim.particles.splice(i, 1);
          }
        }
      }

      // ── RENDERING ────────────────────────────────────────────────────────
      renderArena(ctx, canvas.width, canvas.height, sim);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [spawnOrb]);

  // ── Canvas Renderer ────────────────────────────────────────────────────────
  const renderArena = (ctx, W, H, sim) => {
    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // Apply screen shake
    if (sim.screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * sim.screenShake * 16;
      const shakeY = (Math.random() - 0.5) * sim.screenShake * 16;
      ctx.translate(shakeX, shakeY);
    }

    const cx = W / 2;
    const cy = H - 160;
    const rad = (sim.tilt * Math.PI) / 180;
    const beamLength = 680;
    const halfBeam = beamLength / 2;

    // 1. Fulcrum Stand (Mechanical Base)
    ctx.save();
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - 45, cy + 130);
    ctx.lineTo(cx + 45, cy + 130);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing pivot gem
    const isCrit = Math.abs(sim.tilt) >= CRITICAL_TILT;
    ctx.fillStyle = isCrit ? '#ef4444' : '#38bdf8';
    ctx.shadowColor = isCrit ? '#ef4444' : '#38bdf8';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Tilting Yoke / Beam
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rad);

    // Beam shadow / glow
    ctx.shadowColor = isCrit ? 'rgba(239, 68, 68, 0.6)' : 'rgba(56, 189, 248, 0.3)';
    ctx.shadowBlur = isCrit ? 20 : 10;

    // Wooden / Metallic Beam body
    const gradBeam = ctx.createLinearGradient(0, -10, 0, 10);
    gradBeam.addColorStop(0, '#334155');
    gradBeam.addColorStop(0.5, '#475569');
    gradBeam.addColorStop(1, '#1e293b');

    ctx.fillStyle = gradBeam;
    ctx.strokeStyle = isCrit ? '#f87171' : '#64748b';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.roundRect(-halfBeam, -9, beamLength, 18, 6);
    ctx.fill();
    ctx.stroke();

    // Runway indicator dashes on beam
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(-halfBeam + 30, 0);
    ctx.lineTo(halfBeam - 30, 0);
    ctx.stroke();
    ctx.setLineDash([]);

    // Direction arrows towards plates
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('◄ NOUN', -halfBeam + 40, -16);

    ctx.fillStyle = '#f97316';
    ctx.fillText('VERB ►', halfBeam - 80, -16);

    ctx.restore();

    // 3. Hanging Plates / Pans (Hang vertically by gravity!)
    const leftTipX = cx - halfBeam * Math.cos(rad);
    const leftTipY = cy - halfBeam * Math.sin(rad);
    const rightTipX = cx + halfBeam * Math.cos(rad);
    const rightTipY = cy + halfBeam * Math.sin(rad);

    const chainLength = 80;

    // Draw Left Pan (NOUN)
    renderPlate(ctx, leftTipX, leftTipY, chainLength, 'NOUN (Left)', '#38bdf8', 'rgba(56, 189, 248, 0.15)');

    // Draw Right Pan (VERB)
    renderPlate(ctx, rightTipX, rightTipY, chainLength, 'VERB (Right)', '#f97316', 'rgba(249, 115, 22, 0.15)');

    // 4. Draw Leo Mascot on the Beam
    const leoWorldX = cx + sim.leoX * Math.cos(rad);
    const leoWorldY = cy + sim.leoX * Math.sin(rad) - 24;

    renderLeo(ctx, leoWorldX, leoWorldY, rad, sim.facing, sim.isSwinging, isCrit);

    // 5. Draw Active Orb
    const orb = sim.activeOrb;
    if (orb) {
      renderOrb(ctx, orb);
    }

    // 6. Draw Particles
    for (const p of sim.particles) {
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1, p.life * 4), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  // ── Helper: Render Plate / Pan ─────────────────────────────────────────────
  const renderPlate = (ctx, tipX, tipY, chainLen, label, color, fillBg) => {
    const panY = tipY + chainLen;
    const panWidth = 120;

    ctx.save();
    // Chains
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX - panWidth / 2 + 10, panY);
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX + panWidth / 2 - 10, panY);
    ctx.stroke();

    // Plate basin
    ctx.fillStyle = fillBg;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.ellipse(tipX, panY, panWidth / 2, 18, 0, 0, Math.PI);
    ctx.fill();
    ctx.stroke();

    // Plate rim
    ctx.beginPath();
    ctx.ellipse(tipX, panY, panWidth / 2, 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Plate label capsule
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, tipX, panY + 36);

    ctx.restore();
  };

  // ── Helper: Render Leo Character ───────────────────────────────────────────
  const renderLeo = (ctx, x, y, tiltRad, facing, isSwinging, isCrit) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tiltRad); // Leo stands perpendicular to the tilted beam

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, 16, 20, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Leo Body (Orange Fox/Mascot head capsule)
    ctx.fillStyle = isCrit ? '#f87171' : '#f97316';
    ctx.shadowColor = isCrit ? '#f87171' : '#f97316';
    ctx.shadowBlur = 14;

    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();

    // Mascot Antenna / Ears
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.moveTo(-12, -14);
    ctx.lineTo(-18, -28);
    ctx.lineTo(-4, -18);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(12, -14);
    ctx.lineTo(18, -28);
    ctx.lineTo(4, -18);
    ctx.fill();

    // Face / Eye direction
    const eyeOffsetX = facing === 'left' ? -6 : 6;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeOffsetX, -2, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(eyeOffsetX + (facing === 'left' ? -2 : 2), -2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Swing Paddle / Deflector Effect
    if (isSwinging > 0) {
      ctx.save();
      const swingDir = facing === 'left' ? -1 : 1;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.arc(0, 0, 32, (swingDir === 1 ? -0.8 : Math.PI - 0.8), (swingDir === 1 ? 0.8 : Math.PI + 0.8));
      ctx.stroke();
      ctx.restore();
    }

    // Name label
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LEO', 0, -32);

    ctx.restore();
  };

  // ── Helper: Render Falling / Flying Orb ─────────────────────────────────────
  const renderOrb = (ctx, orb) => {
    ctx.save();
    ctx.translate(orb.x, orb.y);

    const isNoun = orb.role === 'NOUN';
    const orbColor = isNoun ? '#38bdf8' : '#f97316';
    const glowColor = isNoun ? 'rgba(56, 189, 248, 0.5)' : 'rgba(249, 115, 22, 0.5)';

    // Pulsing aura
    ctx.fillStyle = glowColor;
    ctx.shadowColor = orbColor;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, Math.PI * 2);
    ctx.fill();

    // Orb Sphere
    const grad = ctx.createRadialGradient(-6, -6, 2, 0, 0, 26);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, orbColor);
    grad.addColorStop(1, '#0f172a');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill();

    // Word Pill Banner below orb
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = orbColor;
    ctx.lineWidth = 1.5;

    const wordText = orb.word.toUpperCase();
    ctx.font = 'bold 13px sans-serif';
    const textWidth = ctx.measureText(wordText).width;
    const pillW = Math.max(80, textWidth + 24);

    ctx.beginPath();
    ctx.roundRect(-pillW / 2, 28, pillW, 24, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(wordText, 0, 40);

    ctx.restore();
  };

  // ── Dev Test Hook (Strictly Guarded) ────────────────────────────────────────
  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      window.__WORD_CLASS_BALANCE_TEST_HOOK__ = {
        getTilt: () => simRef.current.tilt,
        getTargetTilt: () => simRef.current.targetTilt,
        getStreak: () => streakRef.current,
        getHearts: () => heartsRef.current,
        getScore: () => scoreRef.current,
        getActiveOrb: () => simRef.current.activeOrb ? { ...simRef.current.activeOrb } : null,
        getLeo: () => ({
          x: simRef.current.leoX,
          facing: simRef.current.facing,
        }),
        moveLeo: (dir) => {
          if (dir === 'left') {
            simRef.current.leoX = Math.max(-270, simRef.current.leoX - 100);
            simRef.current.facing = 'left';
          } else {
            simRef.current.leoX = Math.min(270, simRef.current.leoX + 100);
            simRef.current.facing = 'right';
          }
        },
        strike: (dir) => strikeOrb(dir),
        triggerImbalance: (deg) => {
          simRef.current.targetTilt = deg;
        },
      };
    }
    return () => {
      if (import.meta.env.DEV && typeof window !== 'undefined') {
        delete window.__WORD_CLASS_BALANCE_TEST_HOOK__;
      }
    };
  }, [strikeOrb]);

  // Tilt severity status
  const tiltAbs = Math.abs(tiltDisplay);
  const tiltStatus = tiltAbs < 12 ? 'safe' : tiltAbs < 22 ? 'warning' : 'critical';

  return (
    <div className="wcb-arena-container">
      {/* ── Top HUD Bar ───────────────────────────────────────────────────── */}
      <div className="wcb-hud-bar">
        <div className="wcb-hud-left">
          <button className="wcb-exit-btn" onClick={onExit}>
            ← Chamber
          </button>
          <div className="wcb-hearts">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart
                key={i}
                size={18}
                fill={i < hearts ? '#ef4444' : 'none'}
                color={i < hearts ? '#ef4444' : '#475569'}
              />
            ))}
          </div>
          <div className="wcb-score-pill">
            <Zap size={14} />
            <span>{score} XP</span>
          </div>
        </div>

        <div className="wcb-hud-center">
          <div className="wcb-streak-panel">
            <span className="wcb-streak-label">Streak:</span>
            <div className="wcb-streak-gems">
              {Array.from({ length: TARGET_STREAK }).map((_, i) => (
                <div
                  key={i}
                  className={`wcb-streak-gem ${i < streak ? 'filled' : ''}`}
                />
              ))}
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9' }}>
              {streak}/{TARGET_STREAK}
            </span>
          </div>
        </div>

        <div className="wcb-hud-right">
          <div className={`wcb-tilt-meter ${tiltStatus}`}>
            <Scale size={14} />
            <span>TILT: {tiltDisplay > 0 ? `+${tiltDisplay}°` : `${tiltDisplay}°`}</span>
          </div>
          <div className="wcb-timer-pill">
            <span>⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* ── Instruction Header Capsule ────────────────────────────────────── */}
      <div className="wcb-header-banner">
        <div className="wcb-banner-capsule">
          <div className="wcb-banner-plate noun">
            <span>◄</span>
            <span>NOUN (Left Pan)</span>
          </div>
          <span style={{ color: '#64748b' }}>|</span>
          <div className="wcb-banner-plate verb">
            <span>VERB (Right Pan)</span>
            <span>►</span>
          </div>
        </div>
        <div className="wcb-banner-instructions">
          A/D or ◄/► to Move Leo • SPACE to Strike Orb • Maintain Balance!
        </div>
      </div>

      {/* ── Dynamic Canvas Arena ──────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="wcb-canvas"
        width={1000}
        height={650}
      />

      {/* ── Floating Feedback Banner ──────────────────────────────────────── */}
      {feedback && (
        <div className={`wcb-feedback-banner ${feedback.isCorrect ? 'correct' : 'wrong'}`}>
          {feedback.isCorrect ? <Sparkles size={18} /> : <AlertTriangle size={18} />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* ── Virtual Movement & Strike Controls ────────────────────────────── */}
      <div className="wcb-controls-bar">
        <button
          type="button"
          className="wcb-control-btn aim-noun"
          onClick={() => {
            simRef.current.facing = 'left';
            simRef.current.leoX = Math.max(-270, simRef.current.leoX - 35);
          }}
          aria-label="Move Left and Aim NOUN"
        >
          <ArrowLeft size={16} /> Aim NOUN (◄)
        </button>
        <button
          type="button"
          className="wcb-control-btn strike-action"
          onClick={() => strikeOrb()}
          aria-label="Strike with Space"
        >
          <Zap size={16} /> SPACE (Strike)
        </button>
        <button
          type="button"
          className="wcb-control-btn aim-verb"
          onClick={() => {
            simRef.current.facing = 'right';
            simRef.current.leoX = Math.min(270, simRef.current.leoX + 35);
          }}
          aria-label="Move Right and Aim VERB"
        >
          Aim VERB (►) <ArrowRight size={16} />
        </button>
      </div>

      {/* ── Victory Modal ─────────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="wcb-modal-overlay">
          <div className="wcb-modal-card">
            <Trophy size={48} color="#38bdf8" style={{ margin: '0 auto 12px' }} />
            <h2 className="wcb-modal-title victory">PERFECT BALANCE!</h2>
            <p className="wcb-modal-subtitle">
              Leo successfully balanced 8 grammatical word orbs in a row with zero critical tilt!
            </p>
            <div className="wcb-modal-stats">
              <div className="wcb-modal-stat-box">
                <div className="wcb-modal-stat-value">{score + 200}</div>
                <div className="wcb-modal-stat-label">Total XP</div>
              </div>
              <div className="wcb-modal-stat-box">
                <div className="wcb-modal-stat-value">{streak}/{TARGET_STREAK}</div>
                <div className="wcb-modal-stat-label">Streak Achieved</div>
              </div>
              <div className="wcb-modal-stat-box">
                <div className="wcb-modal-stat-value">{hearts}/{MAX_HEARTS}</div>
                <div className="wcb-modal-stat-label">Hearts Left</div>
              </div>
            </div>
            <button
              className="wcb-modal-action-btn"
              onClick={() => onComplete ? onComplete(score + 200) : onExit && onExit()}
            >
              Collect Rewards & Exit
            </button>
          </div>
        </div>
      )}

      {/* ── Defeat Modal ──────────────────────────────────────────────────── */}
      {phase === 'ko' && (
        <div className="wcb-modal-overlay">
          <div className="wcb-modal-card">
            <AlertTriangle size={48} color="#f87171" style={{ margin: '0 auto 12px' }} />
            <h2 className="wcb-modal-title defeat">SCALE OVERTURNED!</h2>
            <p className="wcb-modal-subtitle">
              {timeLeft <= 0
                ? 'Time ran out before achieving 8 consecutive balanced orbs.'
                : 'The dual-scale tilted beyond critical limits (>25°) and lost equilibrium.'}
            </p>
            <div className="wcb-modal-stats">
              <div className="wcb-modal-stat-box">
                <div className="wcb-modal-stat-value">{score}</div>
                <div className="wcb-modal-stat-label">Score</div>
              </div>
              <div className="wcb-modal-stat-box">
                <div className="wcb-modal-stat-value">{streak}</div>
                <div className="wcb-modal-stat-label">Best Streak</div>
              </div>
            </div>
            <button
              className="wcb-modal-action-btn"
              onClick={onExit}
            >
              Return to Chamber
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
