/**
 * WordClassDuelGame.jsx — Word Class Duel (I7 Mini-Game: Integration Door)
 * Aliased from / mapped to gameId 'rune_balance_scale'
 *
 * Mechanic:
 * - Duel of Grammatical Word Classes (Parts of Speech: NOUN vs VERB).
 * - A target word is challenged (e.g. 'grip', 'slide', 'care', 'help').
 * - Prompt asks: "Which sentence uses '{word}' as a {ROLE}?"
 * - 4 context sentence cards are presented.
 * - Player identifies and strikes the card where the target word fulfills the target role.
 * - 4 rounds, 75 seconds duration.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Scale, Heart, Sparkles } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { calculateStars } from '../../../stores/useChroniclesStore';
import { getWordClassDuelForWeek } from '../../../services/chroniclesFloor67Service';

export default function WordClassDuelGame({
  weekNumber = 33,
  duration = 75,
  onComplete,
  onExit,
}) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [feedback, setFeedback] = useState(null);

  const rounds = useMemo(() => {
    return getWordClassDuelForWeek(weekNumber);
  }, [weekNumber]);

  const currentRound = rounds[roundIdx] || rounds[0];

  // Deterministically rotate cards for current round based on roundIdx
  const shuffledCards = useMemo(() => {
    const cards = [...currentRound.cards];
    const shift = (roundIdx * 2) % cards.length;
    return [...cards.slice(shift), ...cards.slice(0, shift)];
  }, [currentRound, roundIdx]);

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

  const handleSelect = useCallback((card) => {
    if (feedback || phase !== 'playing') return;

    if (card.isCorrect) {
      setScore(s => s + 150);
      setFeedback({ isCorrect: true, text: `DUEL WON! In this sentence, "${currentRound.word}" is indeed a ${currentRound.targetRole}!` });
      speakText('Correct word class!');

      setTimeout(() => {
        setFeedback(null);
        if (roundIdx + 1 >= rounds.length) {
          setPhase('cleared');
        } else {
          setRoundIdx(r => r + 1);
        }
      }, 1000);
    } else {
      setHearts(h => {
        const nextH = h - 1;
        if (nextH <= 0) setPhase('ko');
        return Math.max(0, nextH);
      });
      setFeedback({ isCorrect: false, text: `INCORRECT! Here, "${currentRound.word}" functions as a ${card.role}.` });
      speakText('Check the word role');

      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  }, [feedback, phase, currentRound, roundIdx, rounds.length]);

  const handleFinish = useCallback(() => {
    const stars = calculateStars(rounds.length, rounds.length, duration - timeLeft, duration);
    if (onComplete) onComplete(stars, score);
  }, [rounds.length, duration, timeLeft, score, onComplete]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #064e3b 0%, #022c22 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(52, 211, 153, 0.2)',
        background: 'rgba(6, 78, 59, 0.6)',
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
            <Scale className="w-5 h-5 text-emerald-400" />
            <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: '#6ee7b7' }}>
              WORD CLASS DUEL
            </span>
          </div>
        </div>

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
          <div style={{ fontWeight: 600, color: '#34d399', fontSize: '0.95rem' }}>
            ⚡ {score} XP
          </div>
          <div style={{
            background: 'rgba(52, 211, 153, 0.2)',
            padding: '4px 12px',
            borderRadius: '16px',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            color: '#6ee7b7',
            fontWeight: 700
          }}>
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      {/* Main Playing Area */}
      {phase === 'playing' && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative'
        }}>
          {/* Duel Target Header */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 95, 70, 0.8) 0%, rgba(4, 47, 46, 0.9) 100%)',
            border: '2px solid #10b981',
            boxShadow: '0 0 35px rgba(16, 185, 129, 0.35)',
            borderRadius: '24px',
            padding: '24px 36px',
            textAlign: 'center',
            marginBottom: '32px',
            maxWidth: '700px',
            width: '90%'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
              ROUND {roundIdx + 1} OF {rounds.length} • TARGET WORD: <strong style={{ color: '#fff' }}>&ldquo;{currentRound.word.toUpperCase()}&rdquo;</strong>
            </div>
            <div style={{ fontSize: '1.45rem', color: '#ecfdf5', fontWeight: 700 }}>
              {currentRound.prompt}
            </div>
            {currentRound.hint && (
              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#a7f3d0', fontStyle: 'italic' }}>
                💡 {currentRound.hint}
              </div>
            )}
          </div>

          {/* 4 Context Sentence Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '750px',
            width: '95%'
          }}>
            {shuffledCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleSelect(card)}
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.6) 0%, rgba(2, 44, 34, 0.8) 100%)',
                  border: '2px solid rgba(52, 211, 153, 0.3)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '1.1rem',
                  lineHeight: 1.5,
                  fontWeight: 500,
                  color: '#ecfdf5',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                  e.currentTarget.style.borderColor = '#34d399';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 0.6) 0%, rgba(6, 78, 59, 0.9) 100%)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 78, 59, 0.6) 0%, rgba(2, 44, 34, 0.8) 100%)';
                }}
              >
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#6ee7b7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  CARD {String.fromCharCode(65 + idx)}
                </div>
                <div>{card.text}</div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div style={{
              position: 'absolute',
              bottom: '24px',
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
          <Sparkles className="w-16 h-16 text-emerald-400 animate-bounce" />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399' }}>DUEL VICTORIOUS!</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            All grammatical word class duels conquered with <strong>{score} XP</strong>!
          </p>
          <button
            onClick={handleFinish}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '14px 36px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.5)'
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
          <div style={{ fontSize: '3rem' }}>⚖️</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>DUEL DEFEATED!</h2>
          <p style={{ color: '#94a3b8' }}>The word classes fell out of balance.</p>
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
            Challenge Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}
