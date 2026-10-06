/**
 * QuestionQuestGame.jsx — Question Quest (G7 Mini-Game: Grammar Door)
 *
 * Mechanic:
 * - Ancient Quest Scroll presents a narrative sentence / statement.
 * - Player must choose 1 of 3 pre-generated WH-questions that accurately matches the situation.
 * - Build-time pre-generated content from week data (verified 100% grammar).
 * - 5 rounds, 75 seconds duration.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HelpCircle, Sparkles, Heart } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { calculateStars } from '../../../stores/useChroniclesStore';
import { getWhQuestionsForWeek } from '../../../services/chroniclesFloor67Service';
import { loadWeekData } from '../../../data/weeks/index';

export default function QuestionQuestGame({
  weekNumber = 33,
  weekData = null,
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
  const [activeWeekData, setActiveWeekData] = useState(weekData);

  useEffect(() => {
    if (!weekData && weekNumber) {
      loadWeekData(weekNumber).then(data => setActiveWeekData(data)).catch(() => {});
    } else {
      setActiveWeekData(weekData);
    }
  }, [weekNumber, weekData]);

  // Load questions for this week
  const questions = useMemo(() => {
    return getWhQuestionsForWeek(weekNumber, activeWeekData);
  }, [weekNumber, activeWeekData]);

  const currentQ = questions[roundIdx] || questions[0];

  // Deterministically rotate options for current question
  const shuffledOptions = useMemo(() => {
    const opts = [...currentQ.options];
    const shift = roundIdx % opts.length;
    return [...opts.slice(shift), ...opts.slice(0, shift)];
  }, [currentQ, roundIdx]);

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

  const handleSelect = useCallback((opt) => {
    if (feedback || phase !== 'playing') return;

    if (opt.isCorrect) {
      setScore(s => s + 120);
      setFeedback({ isCorrect: true, text: `EXCELLENT! "${opt.text}" is the correct WH-question!` });
      speakText('Correct question!');

      setTimeout(() => {
        setFeedback(null);
        if (roundIdx + 1 >= questions.length) {
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
      setFeedback({ isCorrect: false, text: `INCORRECT! That question does not match this event.` });
      speakText('Try another question');

      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  }, [feedback, phase, roundIdx, questions.length]);

  const handleFinish = useCallback(() => {
    const stars = calculateStars(questions.length, questions.length, duration - timeLeft, duration);
    if (onComplete) onComplete(stars, score);
  }, [questions.length, duration, timeLeft, score, onComplete]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #030712 100%)',
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
        borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
        background: 'rgba(15, 23, 42, 0.7)',
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
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: '#d8b4fe' }}>
              QUESTION QUEST
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
          <div style={{ fontWeight: 600, color: '#c084fc', fontSize: '0.95rem' }}>
            ⚡ {score} XP
          </div>
          <div style={{
            background: 'rgba(168, 85, 247, 0.2)',
            padding: '4px 12px',
            borderRadius: '16px',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            color: '#d8b4fe',
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
          {/* Question Index */}
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#c084fc', letterSpacing: '0.1em', marginBottom: '16px' }}>
            QUESTION {roundIdx + 1} OF {questions.length} • CHOOSE MATCHING WH-QUESTION
          </div>

          {/* Statement / Answer Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(46, 16, 101, 0.8) 0%, rgba(24, 9, 58, 0.9) 100%)',
            border: '2px solid #a855f7',
            boxShadow: '0 0 35px rgba(168, 85, 247, 0.35)',
            borderRadius: '24px',
            padding: '28px 36px',
            textAlign: 'center',
            marginBottom: '32px',
            maxWidth: '720px',
            width: '90%'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              📜 NARRATIVE STATEMENT
            </div>
            <div style={{ fontSize: '1.35rem', lineHeight: 1.6, color: '#f8fafc', fontWeight: 600 }}>
              &ldquo;{currentQ.sentence}&rdquo;
            </div>
            {currentQ.hint && (
              <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#c4b5fd', fontStyle: 'italic' }}>
                💡 {currentQ.hint}
              </div>
            )}
          </div>

          {/* 3 WH-Question Rune Choices */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            maxWidth: '680px',
            width: '90%'
          }}>
            {shuffledOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                style={{
                  background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.5) 0%, rgba(59, 7, 100, 0.8) 100%)',
                  border: '2px solid rgba(192, 132, 252, 0.35)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  borderRadius: '14px',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#f3e8ff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                  e.currentTarget.style.borderColor = '#c084fc';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(126, 34, 206, 0.7) 0%, rgba(88, 28, 135, 0.9) 100%)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.35)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(88, 28, 135, 0.5) 0%, rgba(59, 7, 100, 0.8) 100%)';
                }}
              >
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(192, 132, 252, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e9d5ff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt.text}</span>
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
          <Sparkles className="w-16 h-16 text-purple-400 animate-bounce" />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#d8b4fe' }}>QUEST COMPLETED!</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            All WH-questions matched with <strong>{score} XP</strong>!
          </p>
          <button
            onClick={handleFinish}
            style={{
              background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '14px 36px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(168, 85, 247, 0.5)'
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
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>QUEST FAILED!</h2>
          <p style={{ color: '#94a3b8' }}>The questions grew too perplexing.</p>
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
            Restart Quest 🔄
          </button>
        </div>
      )}
    </div>
  );
}
