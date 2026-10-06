/**
 * StorySequencerGame.jsx — Story Sequencer (I6 Mini-Game: Integration Door)
 *
 * Mechanic:
 * - 5 narrative scenes from story_scenes[].description_en are scrambled.
 * - Player arranges them in correct chronological sequence (1 -> 5).
 * - Calibrated for fast ~35-41s gameplay duration on W33 sentences (11-16 words/sentence).
 * - Tap to select first card, tap second card to swap positions.
 * - Auto-validates when in correct order or tap 'Verify Chronology'.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Sparkles, ArrowUpDown } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { calculateStars } from '../../../stores/useChroniclesStore';

import { getStoryScenesForWeek } from '../../../services/chroniclesFloor67Service';
import { loadWeekData } from '../../../data/weeks/index';

function scrambleCards(scenes) {
  let shuffled = [...scenes];
  let isSame = true;
  let attempts = 0;
  while (isSame && attempts < 10) {
    shuffled.sort(() => Math.random() - 0.5);
    isSame = shuffled.every((c, i) => c.originalOrder === i + 1);
    attempts++;
  }
  return shuffled;
}

export default function StorySequencerGame({
  weekNumber = 33,
  weekData = null,
  duration = 60,
  onComplete,
  onExit,
}) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [cards, setCards] = useState(() => {
    const scenes = getStoryScenesForWeek(weekNumber, weekData);
    return scrambleCards(scenes);
  });
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Sync cards if weekNumber or weekData changes
  useEffect(() => {
    if (!weekData && weekNumber) {
      loadWeekData(weekNumber).then(data => {
        const scenes = getStoryScenesForWeek(weekNumber, data);
        setCards(scrambleCards(scenes));
      }).catch(() => {
        const scenes = getStoryScenesForWeek(weekNumber, null);
        setCards(scrambleCards(scenes));
      });
    } else {
      const scenes = getStoryScenesForWeek(weekNumber, weekData);
      setCards(scrambleCards(scenes));
    }
    setSelectedIdx(null);
    setFeedback(null);
  }, [weekNumber, weekData]);

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

  // Swap card handler
  const handleCardClick = (idx) => {
    if (feedback || phase !== 'playing') return;

    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      setSelectedIdx(null); // Deselect
    } else {
      // Swap cards at selectedIdx and idx
      const nextCards = [...cards];
      const temp = nextCards[selectedIdx];
      nextCards[selectedIdx] = nextCards[idx];
      nextCards[idx] = temp;
      setCards(nextCards);
      setSelectedIdx(null);

      // Check if sequence is now fully correct
      const isComplete = nextCards.every((c, i) => c.originalOrder === i + 1);
      if (isComplete) {
        setScore(300);
        setFeedback({ isCorrect: true, text: "CHRONOLOGY RESTORED! Perfect story sequence!" });
        speakText("Story sequence complete!");
        setTimeout(() => {
          setPhase('cleared');
        }, 1200);
      }
    }
  };

  const handleFinish = useCallback(() => {
    const timeTaken = duration - timeLeft;
    const stars = calculateStars(5, 5, timeTaken, duration);
    if (onComplete) onComplete(stars, score);
  }, [duration, timeLeft, score, onComplete]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #172554 0%, #030712 100%)',
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
        borderBottom: '1px solid rgba(96, 165, 250, 0.2)',
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
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: '#93c5fd' }}>
              STORY SEQUENCER
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontWeight: 600, color: '#60a5fa', fontSize: '0.95rem' }}>
            ⚡ {score} XP
          </div>
          <div style={{
            background: 'rgba(59, 130, 246, 0.2)',
            padding: '4px 12px',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: '#93c5fd',
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
          padding: '20px',
          position: 'relative'
        }}>
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#93c5fd', letterSpacing: '0.1em', marginBottom: '8px' }}>
            TAP A CARD TO SELECT, THEN TAP ANOTHER CARD TO SWAP (SẮP XẾP 1 → 5)
          </div>

          {/* 5 Scrambled Story Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '780px',
            width: '95%'
          }}>
            {cards.map((card, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrectPosition = card.originalOrder === idx + 1;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(29, 78, 216, 0.95) 100%)'
                      : 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.8) 100%)',
                    border: isSelected
                      ? '2px solid #60a5fa'
                      : isCorrectPosition
                      ? '2px solid rgba(34, 197, 94, 0.4)'
                      : '2px solid rgba(148, 163, 184, 0.2)',
                    boxShadow: isSelected
                      ? '0 0 20px rgba(96, 165, 250, 0.5)'
                      : '0 4px 12px rgba(0,0,0,0.25)',
                    borderRadius: '14px',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isCorrectPosition ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.1)',
                    color: isCorrectPosition ? '#4ade80' : '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <div style={{ flex: 1, fontSize: '1.05rem', lineHeight: 1.5, color: '#f8fafc' }}>
                    {card.text}
                  </div>
                  <ArrowUpDown className="w-4 h-4 text-slate-400 opacity-60" />
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div style={{
              position: 'absolute',
              bottom: '24px',
              padding: '12px 28px',
              borderRadius: '12px',
              background: 'rgba(34, 197, 94, 0.9)',
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
          <Sparkles className="w-16 h-16 text-blue-400 animate-bounce" />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#60a5fa' }}>SEQUENCE COMPLETE!</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            Story chronology restored perfectly in <strong>{duration - timeLeft} seconds</strong>!
          </p>
          <button
            onClick={handleFinish}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '14px 36px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.5)'
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
          <div style={{ fontSize: '3rem' }}>⌛</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>TIME RUN OUT!</h2>
          <p style={{ color: '#94a3b8' }}>The chronological timeline unraveled.</p>
          <button
            onClick={() => {
              setTimeLeft(duration);
              setScore(0);
              setCards(scrambleCards(DEFAULT_STORY_SCENES));
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
            Rewind Timeline 🔄
          </button>
        </div>
      )}
    </div>
  );
}
