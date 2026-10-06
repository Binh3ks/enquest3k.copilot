/**
 * ConnectorRelayGame.jsx — Connector Relay (G6 Mini-Game: Grammar Door)
 *
 * Mechanic:
 * - A high-speed bridge runner through the Arcane Chasm.
 * - Each segment presents a complex sentence with a missing connector / conjunction (____).
 * - 4 portal choices (e.g. because, although, so, unless, if, while).
 * - Player selects the correct logical connective to energize the bridge segment.
 * - Accurate selections power Leo's energy dash forward.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Route, Sparkles, Heart } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { calculateStars } from '../../../stores/useChroniclesStore';

import { getConnectorQuestionsForWeek } from '../../../services/chroniclesFloor67Service';

export default function ConnectorRelayGame({
  grammarSentences = [],
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

  const questions = useMemo(() => {
    return getConnectorQuestionsForWeek(weekNumber, grammarSentences);
  }, [weekNumber, grammarSentences]);

  const currentQ = questions[roundIdx] || questions[0];

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

  const handleSelect = useCallback((chosen) => {
    if (feedback || phase !== 'playing') return;

    const isCorrect = chosen === currentQ.answer;
    if (isCorrect) {
      setScore(s => s + 120);
      setFeedback({ isCorrect: true, text: `BRIDGE POWERED! "${chosen}" connects the clauses correctly!` });
      speakText('Bridge connected!');

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
      setFeedback({ isCorrect: false, text: `LOGIC FRACTURE! "${chosen}" does not fit the sentence structure.` });
      speakText('Try another connector');

      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  }, [feedback, phase, currentQ, roundIdx, questions.length]);

  const handleFinish = useCallback(() => {
    const stars = calculateStars(questions.length, questions.length, duration - timeLeft, duration);
    if (onComplete) onComplete(stars, score);
  }, [questions.length, duration, timeLeft, score, onComplete]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)',
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
        borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
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
            <Route className="w-5 h-5 text-sky-400" />
            <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: '#7dd3fc' }}>
              CONNECTOR RELAY
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
          <div style={{ fontWeight: 600, color: '#38bdf8', fontSize: '0.95rem' }}>
            ⚡ {score} XP
          </div>
          <div style={{
            background: 'rgba(56, 189, 248, 0.2)',
            padding: '4px 12px',
            borderRadius: '16px',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
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
          {/* Segment Indicator */}
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#7dd3fc', letterSpacing: '0.1em', marginBottom: '16px' }}>
            RELAY SEGMENT {roundIdx + 1} OF {questions.length} • CLAUSE CONNECTOR
          </div>

          {/* Sentence Display Card */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.7)',
            border: '2px solid #0284c7',
            boxShadow: '0 0 30px rgba(2, 132, 199, 0.3)',
            borderRadius: '24px',
            padding: '32px 40px',
            textAlign: 'center',
            marginBottom: '36px',
            maxWidth: '750px',
            width: '90%'
          }}>
            <div style={{
              fontSize: '1.4rem',
              lineHeight: 1.6,
              color: '#f8fafc',
              fontWeight: 500
            }}>
              {currentQ.sentence.split('_____').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span style={{
                      display: 'inline-block',
                      minWidth: '90px',
                      height: '36px',
                      lineHeight: '36px',
                      background: 'rgba(56, 189, 248, 0.25)',
                      border: '2px dashed #38bdf8',
                      borderRadius: '8px',
                      margin: '0 8px',
                      color: '#38bdf8',
                      fontWeight: 700,
                      verticalAlign: 'middle',
                      textAlign: 'center'
                    }}>
                      ?
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
            {currentQ.hint && (
              <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic' }}>
                💡 Hint: {currentQ.hint}
              </div>
            )}
          </div>

          {/* 4 Connector Options */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '600px',
            width: '90%'
          }}>
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 116, 144, 0.5) 0%, rgba(3, 105, 161, 0.8) 100%)',
                  border: '2px solid rgba(56, 189, 248, 0.4)',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                  borderRadius: '14px',
                  padding: '16px 24px',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#f0f9ff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                }}
              >
                ⚡ {opt}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div style={{
              position: 'absolute',
              bottom: '30px',
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
          <Sparkles className="w-16 h-16 text-sky-400 animate-bounce" />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8' }}>RELAY COMPLETE!</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            All bridge connectors energized with <strong>{score} XP</strong>!
          </p>
          <button
            onClick={handleFinish}
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '14px 36px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(2, 132, 199, 0.5)'
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
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>BRIDGE COLLAPSED!</h2>
          <p style={{ color: '#94a3b8' }}>A connective clause broke mid-relay.</p>
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
            Reconnect Bridge 🔄
          </button>
        </div>
      )}
    </div>
  );
}
