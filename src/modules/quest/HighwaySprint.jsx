/**
 * HighwaySprint.jsx — 3D Vertical Perspective Runner
 *
 * Major Revamp:
 * - True 3D perspective via CSS (objects scale and converge naturally)
 * - Audio-First Pedagogy: Definition is spoken aloud via TTS BEFORE gameplay resumes
 * - New LeoCharacterBack: Mascot faces into the screen, running forward
 * - Expanded Vocabulary Bank for longer playtime (1-2 mins)
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Sparkles, AlertTriangle, Shield, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import LeoCharacterBack from './LeoCharacterBack';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import './HighwaySprint.css';

// Words Bank to ensure longer playtime
const DEFAULT_HIGHWAY_ROUNDS = [
  { targetWord: 'friction', definition: 'Force that resists motion when two surfaces touch', distractors: ['gravity', 'velocity', 'magnetism'] },
  { targetWord: 'slippery', definition: 'Difficult to stand or walk on because it is wet or smooth', distractors: ['sticky', 'bumpy', 'freezing'] },
  { targetWord: 'rubber', definition: 'A tough, elastic material used to make shoes grip the floor', distractors: ['plastic', 'metal', 'cotton'] },
  { targetWord: 'corridor', definition: 'A long hallway or passage inside a school or building', distractors: ['balcony', 'basement', 'courtyard'] },
  { targetWord: 'laboratory', definition: 'A room specially equipped for scientific experiments', distractors: ['cafeteria', 'gymnasium', 'dormitory'] },
  { targetWord: 'traction', definition: 'The grip of shoes or tires on a surface to stop slipping', distractors: ['motion', 'weight', 'speed'] },
  { targetWord: 'prevent', definition: 'To stop something dangerous or painful from happening', distractors: ['allow', 'create', 'forget'] },
  { targetWord: 'polished', definition: 'Made smooth and shiny by rubbing or waxing', distractors: ['rough', 'dusty', 'cracked'] },
  { targetWord: 'surface', definition: 'The outside part or uppermost layer of something', distractors: ['core', 'inside', 'bottom'] },
  { targetWord: 'balance', definition: 'An even distribution of weight enabling someone to remain upright', distractors: ['fall', 'stumble', 'wobble'] },
];

// Lane Positions in CSS 3D Space (X offsets)
const LANE_OFFSETS = [-200, 0, 200];

export default function HighwaySprint({
  vocabItems = [],
  duration = 150,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('highway_sprint') || 0;

  // Build 10 Rounds
  const rounds = useMemo(() => {
    const valid = (vocabItems || []).filter(v => v.word && v.definition);
    const pool = [...valid, ...DEFAULT_HIGHWAY_ROUNDS];
    const uniqueMap = new Map();
    pool.forEach(item => {
      const w = (item.word || '').trim().toLowerCase();
      if (w && !uniqueMap.has(w)) {
        uniqueMap.set(w, {
          targetWord: item.word,
          definition: item.definition || item.def || 'A scientific or everyday term',
          distractors: item.distractors || ['option_a', 'option_b'],
        });
      }
    });

    const uniqueList = Array.from(uniqueMap.values());
    const selected = uniqueList.slice(0, 10);
    return selected.map((r, idx) => {
      const otherWords = uniqueList.filter((_, i) => i !== idx).map(u => u.targetWord);
      return {
        ...r,
        distractors: otherWords.slice(0, 3),
      };
    });
  }, [vocabItems]);

  const [phase, setPhase] = useState('reading_definition'); // 'reading_definition' | 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_HIGHWAY_ROUNDS[0];

  // Leo State
  const [currentLane, setCurrentLane] = useState(1); // 0=Left, 1=Center, 2=Right
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [invincible, setInvincible] = useState(false);
  const invincibleUntil = useRef(0);

  // Incoming Objects Array: [{ id, lane, type, word, zOffset }]
  const [objects, setObjects] = useState([]);
  const roundSpawning = useRef(false);

  // Audio-First Logic
  const speakCurrentDefinition = useCallback(() => {
    if (!currentRound?.definition) return;
    speakText(`Find the word: ${currentRound.definition}`, null, 1.0, null, 'sentence', weekNumber);
  }, [currentRound, weekNumber]);

  useEffect(() => {
    if (phase === 'reading_definition') {
      speakCurrentDefinition();
      // Wait for audio to finish (approx 3.5s) then start playing
      const t = setTimeout(() => {
        setPhase('playing');
        roundSpawning.current = true;
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [phase, roundIdx, speakCurrentDefinition]);

  // Actions
  const triggerJump = useCallback(() => {
    if (isJumping || isSliding || phase !== 'playing') return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 550);
  }, [isJumping, isSliding, phase]);

  const triggerSlide = useCallback(() => {
    if (isJumping || isSliding || phase !== 'playing') return;
    setIsSliding(true);
    setTimeout(() => setIsSliding(false), 550);
  }, [isJumping, isSliding, phase]);

  // Spawning Wave
  const spawnRoundWave = useCallback(() => {
    const lanes = [0, 1, 2].sort(() => Math.random() - 0.5);
    
    let obstacleType = 'barrier_low';
    if (roundIdx >= 4) {
      const r = Math.random();
      obstacleType = r < 0.35 ? 'barrier_pillar' : r < 0.7 ? 'barrier_high' : 'barrier_low';
    } else if (roundIdx >= 2) {
      obstacleType = Math.random() > 0.5 ? 'barrier_high' : 'barrier_low';
    }

    // In true CSS 3D, zOffset starts far away (e.g. -2000) and moves to 0 (Leo's position)
    const newWave = [
      { id: `tgt_${Date.now()}_0`, lane: lanes[0], type: 'target', word: currentRound.targetWord, zOffset: -2500 },
      { id: `dist_${Date.now()}_1`, lane: lanes[1], type: 'distractor', word: currentRound.distractors[0] || 'wrong', zOffset: -2500 },
      { id: `barr_${Date.now()}_2`, lane: lanes[2], type: obstacleType, word: '', zOffset: -2500 },
    ];

    setObjects(newWave);
    roundSpawning.current = false;
  }, [roundIdx, currentRound]);

  // Initial wave spawn when entering 'playing'
  useEffect(() => {
    if (phase === 'playing' && roundSpawning.current) {
      setObjects([]);
      spawnRoundWave();
    }
  }, [phase, spawnRoundWave]);

  // Keyboard
  useEffect(() => {
    if (phase !== 'playing') return;
    const onKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); setCurrentLane(l => Math.max(0, l - 1)); }
      if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); setCurrentLane(l => Math.min(2, l + 1)); }
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) { e.preventDefault(); triggerJump(); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); triggerSlide(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, triggerJump, triggerSlide]);

  // Game Loop
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();
    let animId;

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const nowMs = Date.now();
      setInvincible(nowMs < invincibleUntil.current);

      // Speed increases per round (Z-units per second)
      const speed = 1500 + (roundIdx * 150);

      setObjects(prev => {
        if (prev.length === 0) return prev;
        const next = [];
        let hitTarget = false;

        for (const obj of prev) {
          const nz = obj.zOffset + speed * dt;

          // Collision Check Zone (Z between -100 and +100 relative to Leo at 0)
          const inHitZone = nz >= -80 && nz <= 80;
          const sameLane = obj.lane === currentLane;

          if (inHitZone && sameLane) {
            if (obj.type === 'target') {
              hitTarget = true;
              speakText(obj.word, null, 1.1, null, 'word', weekNumber);
              const combo = Math.min(3, streak + 1);
              const xp = 35 * combo;
              setScore(s => s + xp);
              setStreak(st => st + 1);
              setFeedback({ type: 'correct', text: `✨ Matched "${obj.word}"! (+${xp} XP)` });

              setTimeout(() => {
                setFeedback(null);
                const nextRound = roundIdx + 1;
                if (nextRound >= rounds.length) {
                  setPhase('cleared');
                  setScore(s => s + (timeLeft * 2) + 100);
                  speakText('Cosmic Highway Champion! All words cleared!');
                } else {
                  setRoundIdx(nextRound);
                  setPhase('reading_definition'); // Re-enter reading phase for next word!
                }
              }, 600);
              continue;
            }

            if (obj.type === 'barrier_low') {
              if (isJumping) {
                setScore(s => s + 10);
                continue;
              } else if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => { const nh = Math.max(0, h - 1); if (nh <= 0) setPhase('ko'); return nh; });
                setFeedback({ type: 'wrong', text: '💥 TRIPPED! Press UP / JUMP to clear hurdles!' });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }

            if (obj.type === 'barrier_high') {
              if (isSliding) {
                setScore(s => s + 10);
                continue;
              } else if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => { const nh = Math.max(0, h - 1); if (nh <= 0) setPhase('ko'); return nh; });
                setFeedback({ type: 'wrong', text: '💥 LASER STRUCK! Press DOWN / SLIDE to duck!' });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }

            if (obj.type === 'barrier_pillar' || obj.type === 'distractor') {
              if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => { const nh = Math.max(0, h - 1); if (nh <= 0) setPhase('ko'); return nh; });
                setFeedback({ type: 'wrong', text: obj.type === 'distractor' ? `⚠️ Wrong Word "${obj.word}"!` : '💥 CRASHED! Steer to dodge!' });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }
          }

          // Keep if it hasn't passed behind camera (Z > 300)
          if (nz < 300 && !hitTarget) {
            next.push({ ...obj, zOffset: nz });
          }
        }

        if (next.length === 0 && !roundSpawning.current && phase === 'playing') {
          spawnRoundWave();
        }

        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [phase, currentLane, isJumping, isSliding, roundIdx, rounds.length, streak, timeLeft, weekNumber, spawnRoundWave]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const t = setInterval(() => {
      setTimeLeft(v => {
        if (v <= 1) { setPhase('ko'); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const handleRetry = () => {
    setHearts(3); setScore(0); setTimeLeft(duration); setRoundIdx(0);
    setCurrentLane(1); setIsJumping(false); setIsSliding(false); setStreak(0);
    setPhase('reading_definition');
  };

  const handleFinalFinish = () => {
    const stars = calculateStars(score, rounds.length * 35);
    recordPersonalBest('highway_sprint', score);
    if (onComplete) onComplete(stars, score);
    else if (onExit) onExit();
  };

  const leoAnimState = isJumping ? 'jump' : isSliding ? 'slide' : (phase === 'playing' ? 'run' : 'idle');

  return (
    <div className={`highway-3d-root ${phase === 'reading_definition' ? 'reading-paused' : ''}`}>
      
      {/* ── Top Target Definition Banner ── */}
      <header className="highway-3d-banner" role="banner">
        <div className="banner-left-section">
          <div className="banner-badge-box">
            <span className="banner-target-tag">WORD {roundIdx + 1} / {rounds.length}</span>
            {streak > 1 && <span className="banner-streak-badge">⚡ Combo x{Math.min(3, streak)}</span>}
          </div>
          <button className="banner-audio-btn" onClick={speakCurrentDefinition}>
            <Volume2 size={20} className="volume-icon-pulse" />
            <span>Listen</span>
          </button>
        </div>
        <div className="banner-definition-center">
          <span className="def-instruction-label">🎯 FIND THE WORD FOR THIS DEFINITION:</span>
          <h2 className="def-main-text">"{currentRound.definition}"</h2>
        </div>
      </header>

      {/* ── Status Messages / Toast ── */}
      {phase === 'reading_definition' && (
        <div className="highway-read-overlay">
          <h2>Listen Carefully!</h2>
          <p>Get ready to run...</p>
        </div>
      )}

      {feedback && <div className={`highway-3d-toast toast-${feedback.type}`}>{feedback.text}</div>}

      {/* ── True CSS 3D Viewport ── */}
      <main className="highway-3d-viewport" role="main">
        <div className="horizon-glow" />
        
        {/* 3D Space Container */}
        <div className="scene-3d">
          {/* Ground Track */}
          <div className={`perspective-track ${phase === 'playing' ? 'track-moving' : ''}`}>
            <div className="track-grid" />
            <div className="track-lane-divider track-divider-1" />
            <div className="track-lane-divider track-divider-2" />
          </div>

          {/* 3D Objects */}
          {objects.map(obj => {
            const isTarget = obj.type === 'target';
            const isDistractor = obj.type === 'distractor';
            
            return (
              <div
                key={obj.id}
                className={`obj-3d-entity obj-${obj.type}`}
                style={{
                  transform: `translate3d(${LANE_OFFSETS[obj.lane]}px, 0px, ${obj.zOffset}px)`,
                }}
              >
                {isTarget && (
                  <div className="gem-target-container billboard">
                    <div className="gem-target-glow" />
                    <div className="gem-target-body">
                      <Sparkles size={16} className="gem-sparkle-icon" />
                      <span className="gem-target-word">{obj.word}</span>
                    </div>
                  </div>
                )}
                {isDistractor && (
                  <div className="orb-distractor-container billboard">
                    <span className="orb-distractor-word">{obj.word}</span>
                  </div>
                )}
                {obj.type === 'barrier_low' && (
                  <div className="barrier-low-box 3d-box">
                    <div className="barrier-front">⚡ JUMP</div>
                    <div className="barrier-top"></div>
                  </div>
                )}
                {obj.type === 'barrier_high' && (
                  <div className="barrier-high-box 3d-box hover-high">
                    <div className="barrier-front">🛹 SLIDE</div>
                    <div className="barrier-bottom"></div>
                  </div>
                )}
                {obj.type === 'barrier_pillar' && (
                  <div className="barrier-pillar-box 3d-box">
                    <div className="pillar-front">🧱</div>
                    <div className="pillar-side"></div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Leo Character (Billboarded) */}
          <div
            className={`leo-3d-runner-anchor ${isJumping ? 'leo-anchor-jump' : ''} ${isSliding ? 'leo-anchor-slide' : ''}`}
            style={{
              transform: `translate3d(${LANE_OFFSETS[currentLane]}px, 0px, 0px)`,
            }}
          >
            <div className="billboard">
              <LeoCharacterBack state={leoAnimState} invincible={invincible} scale={1.2} />
            </div>
          </div>
        </div>
      </main>

      <HUDOverlay hearts={hearts} score={score} timeLeft={timeLeft} wordsCollected={roundIdx} totalWords={rounds.length} floorNumber={4} doorLabel="Door 1 — Highway Word Runner" />

      <VirtualDPad onLeft={() => setCurrentLane(l => Math.max(0, l - 1))} onRight={() => setCurrentLane(l => Math.min(2, l + 1))} onUp={triggerJump} onDown={triggerSlide} onJump={triggerJump} onSlide={triggerSlide} visible={phase === 'playing'} />

      {phase === 'cleared' && (
        <div className="highway-3d-modal-backdrop">
          <div className="highway-3d-modal-card">
            <Trophy size={56} className="modal-trophy-gold" />
            <h2 className="modal-title">🏆 HIGHWAY RUNNER CHAMPION!</h2>
            <p className="modal-subtitle">You decoded all {rounds.length} scientific definitions with lightning reflexes!</p>
            <div className="modal-stats-grid">
              <div className="modal-stat-box"><span className="stat-label">Final Score</span><span className="stat-val">{score} XP</span></div>
              <div className="modal-stat-box"><span className="stat-label">Max Combo</span><span className="stat-val">x{Math.max(1, streak)}</span></div>
            </div>
            <button className="modal-continue-btn" onClick={handleFinalFinish}>Return to Chamber →</button>
          </div>
        </div>
      )}

      {phase === 'ko' && (
        <div className="highway-3d-modal-backdrop">
          <div className="highway-3d-modal-card modal-card-ko">
            <AlertTriangle size={56} className="modal-ko-icon" />
            <h2 className="modal-title">HIGHWAY CRASH!</h2>
            <p className="modal-subtitle">The cosmic highway moves fast! Remember: Jump over low hurdles, slide under high beams, and dodge pillars!</p>
            <div className="modal-btn-row">
              <button className="modal-retry-btn" onClick={handleRetry}><RotateCcw size={18} /> Try Again</button>
              <button className="modal-exit-btn" onClick={onExit || handleFinalFinish}>Chamber</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
