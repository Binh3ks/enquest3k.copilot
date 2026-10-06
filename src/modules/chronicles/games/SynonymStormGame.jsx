/**
 * SynonymStormGame.jsx — Synonym Storm (V6 Mini-Game: Vocab Door)
 *
 * Mechanic:
 * - A storm of word orbs sweeps across the storm tower.
 * - Target word is shown with request: "Find the SYNONYM (từ đồng nghĩa)"
 * - 4 floating atmospheric orbs contain words.
 * - Player taps the correct synonym orb before time expires.
 * - Accurate hits charge the Storm Capacitor and grant combo multipliers.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Wind, Heart, Sparkles } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { calculateStars } from '../../../stores/useChroniclesStore';

import { getSynonymPairsForWeek } from '../../../services/chroniclesFloor67Service';

export default function SynonymStormGame({
  vocabItems = [],
  weekNumber = 33,
  duration = 75,
  onComplete,
  onExit,
}) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [feedback, setFeedback] = useState(null); // { isCorrect, text }

  // Build rounds
  const rounds = useMemo(() => {
    const pairs = getSynonymPairsForWeek(weekNumber);
    return pairs.slice(0, 5).map((p, idx) => {
      const options = [p.match, ...p.distractors].sort(() => Math.random() - 0.5);
      return {
        id: `r_${idx}`,
        targetWord: p.word,
        correctMatch: p.match,
        options,
      };
    });
  }, [weekNumber]);

  const currentRound = rounds[roundIdx] || rounds[0];

  // Timer
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

  // Handle option select
  const handleSelect = useCallback((chosenWord) => {
    if (feedback || phase !== 'playing') return;

    const isCorrect = chosenWord === currentRound.correctMatch;
    if (isCorrect) {
      const newCombo = combo + 1;
      const pts = 100 + newCombo * 25;
      setScore(s => s + pts);
      setCombo(newCombo);
      setFeedback({ isCorrect: true, text: `PERFECT! "${chosenWord}" matches "${currentRound.targetWord}"!` });
      speakText('Correct!');

      setTimeout(() => {
        setFeedback(null);
        if (roundIdx + 1 >= rounds.length) {
          setPhase('cleared');
        } else {
          setRoundIdx(r => r + 1);
        }
      }, 1000);
    } else {
      setCombo(0);
      setHearts(h => {
        const nextH = h - 1;
        if (nextH <= 0) setPhase('ko');
        return Math.max(0, nextH);
      });
      setFeedback({ isCorrect: false, text: `OOPS! "${chosenWord}" is not a synonym.` });
      speakText('Try again!');

      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  }, [feedback, phase, currentRound, combo, roundIdx, rounds.length]);

  // Completion trigger
  const handleFinish = useCallback(() => {
    const stars = calculateStars(rounds.length, rounds.length, duration - timeLeft, duration);
    if (onComplete) onComplete(stars, score);
  }, [rounds.length, duration, timeLeft, score, onComplete]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #09090b 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* HUD Header */}
      <div style={{
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onExit}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#cbd5e1',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            ← Chamber
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wind className="w-5 h-5 text-violet-400" />
            <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: '#c4b5fd' }}>
              SYNONYM STORM
            </span>
          </div>
        </div>

        {/* Status / Hearts / Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className="w-5 h-5"
                style={{
                  fill: i < hearts ? '#ef4444' : 'transparent',
                  color: i < hearts ? '#ef4444' : '#475569'
                }}
              />
            ))}
          </div>
          <div style={{ fontWeight: 600, color: '#f59e0b', fontSize: '0.95rem' }}>
            ⚡ {score} XP
          </div>
          <div style={{
            background: 'rgba(99, 102, 241, 0.2)',
            padding: '4px 12px',
            borderRadius: '16px',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#a5b4fc',
            fontWeight: 700
          }}>
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      {/* Main Playing Arena */}
      {phase === 'playing' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          position: 'relative'
        }}>
          {/* Target Word Center Display */}
          <div style={{
            background: 'rgba(30, 27, 75, 0.7)',
            border: '2px solid #8b5cf6',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
            borderRadius: '24px',
            padding: '24px 48px',
            textAlign: 'center',
            marginBottom: '40px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#a78bfa', letterSpacing: '0.1em', marginBottom: '8px' }}>
              ROUND {roundIdx + 1} OF {rounds.length} • FIND SYNONYM (ĐỒNG NGHĨA)
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              &ldquo;{currentRound.targetWord}&rdquo;
            </div>
          </div>

          {/* 4 Floating Orbs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            maxWidth: '600px',
            width: '90%'
          }}>
            {currentRound.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                style={{
                  background: 'linear-gradient(135deg, rgba(76, 29, 149, 0.6) 0%, rgba(30, 27, 75, 0.8) 100%)',
                  border: '2px solid rgba(167, 139, 250, 0.4)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: 'scale(1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.borderColor = '#c084fc';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)';
                }}
              >
                🔮 {opt}
              </button>
            ))}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div style={{
              position: 'absolute',
              bottom: '40px',
              padding: '12px 28px',
              borderRadius: '12px',
              background: feedback.isCorrect ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              zIndex: 30
            }}>
              {feedback.text}
            </div>
          )}
        </div>
      )}

      {/* Cleared Screen */}
      {phase === 'cleared' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '20px'
        }}>
          <Sparkles className="w-16 h-16 text-yellow-400 animate-bounce" />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#facc15' }}>STORM CALMED!</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            You mastered all synonym pairings with a final score of <strong>{score} XP</strong>!
          </p>
          <button
            onClick={handleFinish}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '14px 36px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.5)'
            }}
          >
            Claim Reward & Continue →
          </button>
        </div>
      )}

      {/* KO Screen */}
      {phase === 'ko' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '20px'
        }}>
          <div style={{ fontSize: '3rem' }}>⚡</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>STORM OVERWHELMED!</h2>
          <p style={{ color: '#94a3b8' }}>The wind was too fierce this time.</p>
          <button
            onClick={() => {
              setHearts(3);
              setTimeLeft(duration);
              setScore(0);
              setRoundIdx(0);
              setPhase('playing');
            }}
            style={{
              background: '#334155',
              color: '#f8fafc',
              padding: '12px 28px',
              borderRadius: '12px',
              border: '1px solid #64748b',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Retry Storm 🔄
          </button>
        </div>
      )}
    </div>
  );
}
