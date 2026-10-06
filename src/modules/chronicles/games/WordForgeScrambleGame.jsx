/**
 * WordForgeScrambleGame.jsx — Word Forge Scramble (V7 Mini-Game: Vocab Door)
 *
 * Mechanic:
 * - Scrambled letter tiles are hammered out on the Arcane Anvil.
 * - Player taps the fiery rune letter tiles in correct sequence to forge the target word.
 * - An English definition / hint is displayed at the top.
 * - Real-time slot filling with undo / backspace support.
 * - Correct forge awards sparks and advances to the next word.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Hammer, Sparkles, Heart, Delete } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { calculateStars } from '../../../stores/useChroniclesStore';

const WEEK_33_FORGE_WORDS = [
  { word: 'corridor', definition: 'a long passage in a building with doors on each side' },
  { word: 'bandage', definition: 'a strip of material used to bind a wound or cut' },
  { word: 'friction', definition: 'the resistance that one surface encounters when moving over another' },
  { word: 'slipped', definition: 'slid accidentally on a wet surface and lost balance' },
  { word: 'careful', definition: 'giving serious attention to avoid danger or mistakes' },
];

const WEEK_34_FORGE_WORDS = [
  { word: 'mighty', definition: 'having or showing great and impressive strength' },
  { word: 'forest', definition: 'a large area covered chiefly with trees and undergrowth' },
  { word: 'hunter', definition: 'a person who tracks wild animals with nets and traps' },
  { word: 'rescue', definition: 'save someone from a dangerous situation' },
  { word: 'scared', definition: 'fearful or frightened by unexpected danger' },
];

const GENERIC_FORGE_WORDS = [
  { word: 'wonder', definition: 'a feeling of amazement caused by something unexpected' },
  { word: 'castle', definition: 'a large fortified building protected by thick walls' },
  { word: 'silver', definition: 'a precious shiny greyish-white metallic element' },
  { word: 'bridge', definition: 'a structure built to span a gorge or river' },
  { word: 'planet', definition: 'a celestial body moving in an elliptical orbit round a star' },
];

function getForgeFallbackWords(weekNumber) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_FORGE_WORDS;
  if (w === 34) return WEEK_34_FORGE_WORDS;
  return GENERIC_FORGE_WORDS;
}

function scrambleWord(word) {
  const letters = word.toUpperCase().split('');
  // Shuffle letters ensuring it does not equal original if length > 1
  let shuffled = [...letters];
  let tries = 0;
  while (shuffled.join('') === letters.join('') && tries < 10) {
    shuffled.sort(() => Math.random() - 0.5);
    tries++;
  }
  return shuffled.map((char, idx) => ({ id: `${char}_${idx}`, char, used: false }));
}

export default function WordForgeScrambleGame({
  vocabItems = [],
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
  const [selectedTiles, setSelectedTiles] = useState([]); // [{ id, char }]
  const [feedback, setFeedback] = useState(null);

  // Filter clean vocab words from props or use week-appropriate fallback
  const wordPool = useMemo(() => {
    const valid = (vocabItems || [])
      .filter(v => v.word && v.word.length >= 4 && v.word.length <= 10 && !v.word.includes(' '))
      .map(v => ({ word: v.word.toLowerCase(), definition: v.definition_en || v.definition || '' }));
    return valid.length >= 5 ? valid.slice(0, 5) : getForgeFallbackWords(weekNumber);
  }, [vocabItems, weekNumber]);

  const currentItem = wordPool[roundIdx] || wordPool[0];
  const targetWord = currentItem.word.toUpperCase();

  // Scrambled pool for current round
  const [letterTiles, setLetterTiles] = useState(() => scrambleWord(currentItem.word));

  const advanceToNextRound = useCallback(() => {
    if (roundIdx + 1 >= wordPool.length) {
      setPhase('cleared');
    } else {
      const nextIdx = roundIdx + 1;
      setRoundIdx(nextIdx);
      setLetterTiles(scrambleWord(wordPool[nextIdx].word));
      setSelectedTiles([]);
      setFeedback(null);
    }
  }, [roundIdx, wordPool]);

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

  // Tap a scrambled letter
  const handleTapTile = (tile) => {
    if (tile.used || feedback || phase !== 'playing') return;

    // Mark as used
    setLetterTiles(tiles => tiles.map(t => t.id === tile.id ? { ...t, used: true } : t));
    const nextSelected = [...selectedTiles, tile];
    setSelectedTiles(nextSelected);

    // Auto-check if full word length reached
    if (nextSelected.length === targetWord.length) {
      const assembled = nextSelected.map(t => t.char).join('');
      if (assembled === targetWord) {
        setScore(s => s + 150);
        setFeedback({ isCorrect: true, text: `FORGED! "${targetWord}" is complete!` });
        speakText(currentItem.word);

        setTimeout(() => {
          advanceToNextRound();
        }, 1000);
      } else {
        setHearts(h => {
          const nextH = h - 1;
          if (nextH <= 0) setPhase('ko');
          return Math.max(0, nextH);
        });
        setFeedback({ isCorrect: false, text: `INCORRECT! "${assembled}" does not match.` });
        speakText('Try again');

        setTimeout(() => {
          // Reset tiles
          setLetterTiles(tiles => tiles.map(t => ({ ...t, used: false })));
          setSelectedTiles([]);
          setFeedback(null);
        }, 1200);
      }
    }
  };

  // Backspace / Undo last letter
  const handleUndo = () => {
    if (selectedTiles.length === 0 || feedback) return;
    const last = selectedTiles[selectedTiles.length - 1];
    setSelectedTiles(selectedTiles.slice(0, -1));
    setLetterTiles(tiles => tiles.map(t => t.id === last.id ? { ...t, used: false } : t));
  };

  // Clear all
  const handleClear = () => {
    if (selectedTiles.length === 0 || feedback) return;
    setSelectedTiles([]);
    setLetterTiles(tiles => tiles.map(t => ({ ...t, used: false })));
  };

  const handleFinish = useCallback(() => {
    const stars = calculateStars(wordPool.length, wordPool.length, duration - timeLeft, duration);
    if (onComplete) onComplete(stars, score);
  }, [wordPool.length, duration, timeLeft, score, onComplete]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #271008 0%, #09090b 100%)',
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
        borderBottom: '1px solid rgba(249, 115, 22, 0.2)',
        background: 'rgba(20, 10, 5, 0.7)',
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
            <Hammer className="w-5 h-5 text-orange-400" />
            <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: '#fdba74' }}>
              WORD FORGE SCRAMBLE
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
          <div style={{ fontWeight: 600, color: '#f59e0b', fontSize: '0.95rem' }}>
            ⚡ {score} XP
          </div>
          <div style={{
            background: 'rgba(249, 115, 22, 0.2)',
            padding: '4px 12px',
            borderRadius: '16px',
            border: '1px solid rgba(249, 115, 22, 0.4)',
            color: '#fdba74',
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
          {/* Definition Banner */}
          <div style={{
            background: 'rgba(40, 15, 5, 0.6)',
            border: '1px solid #ea580c',
            borderRadius: '16px',
            padding: '16px 28px',
            maxWidth: '650px',
            width: '90%',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#fb923c', letterSpacing: '0.08em', marginBottom: '4px' }}>
              WORD {roundIdx + 1} OF {wordPool.length} • CLUE / DEFINITION
            </div>
            <div style={{ fontSize: '1.15rem', color: '#fed7aa', fontWeight: 500, fontStyle: 'italic' }}>
              &ldquo;{currentItem.definition || 'Spell the target word correctly.'}&rdquo;
            </div>
          </div>

          {/* Word Assembly Slots */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {[...Array(targetWord.length)].map((_, i) => {
              const letter = selectedTiles[i]?.char;
              return (
                <div
                  key={i}
                  style={{
                    width: '56px',
                    height: '64px',
                    border: '2px solid',
                    borderColor: letter ? '#f97316' : 'rgba(255,255,255,0.2)',
                    background: letter ? 'rgba(234, 88, 12, 0.25)' : 'rgba(0,0,0,0.4)',
                    boxShadow: letter ? '0 0 15px rgba(249, 115, 22, 0.4)' : 'none',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#ffedd5',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {letter || ''}
                </div>
              );
            })}
          </div>

          {/* Scrambled Rune Tiles */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '600px'
          }}>
            {letterTiles.map((tile) => (
              <button
                key={tile.id}
                disabled={tile.used}
                onClick={() => handleTapTile(tile)}
                style={{
                  width: '56px',
                  height: '60px',
                  background: tile.used
                    ? 'rgba(50, 20, 10, 0.2)'
                    : 'linear-gradient(135deg, #c2410c 0%, #7c2d12 100%)',
                  border: tile.used ? '1px dashed #431407' : '2px solid #fb923c',
                  boxShadow: tile.used ? 'none' : '0 6px 16px rgba(194, 65, 12, 0.5)',
                  borderRadius: '12px',
                  color: tile.used ? '#78350f' : '#fff',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  cursor: tile.used ? 'default' : 'pointer',
                  transform: tile.used ? 'scale(0.92)' : 'scale(1)',
                  transition: 'all 0.15s ease'
                }}
              >
                {tile.char}
              </button>
            ))}
          </div>

          {/* Controls: Undo & Clear */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handleUndo}
              disabled={selectedTiles.length === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#451a03',
                border: '1px solid #78350f',
                color: '#fed7aa',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: selectedTiles.length === 0 ? 'not-allowed' : 'pointer',
                opacity: selectedTiles.length === 0 ? 0.5 : 1
              }}
            >
              <Delete className="w-4 h-4" /> Backspace
            </button>
            <button
              onClick={handleClear}
              disabled={selectedTiles.length === 0}
              style={{
                background: '#451a03',
                border: '1px solid #78350f',
                color: '#fed7aa',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: selectedTiles.length === 0 ? 'not-allowed' : 'pointer',
                opacity: selectedTiles.length === 0 ? 0.5 : 1
              }}
            >
              Clear
            </button>
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
          <Sparkles className="w-16 h-16 text-orange-400 animate-bounce" />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fb923c' }}>FORGE COMPLETE!</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
            All runic words forged successfully with <strong>{score} XP</strong>!
          </p>
          <button
            onClick={handleFinish}
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '14px 36px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(249, 115, 22, 0.5)'
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
          <div style={{ fontSize: '3rem' }}>💥</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>FORGE OVERHEATED!</h2>
          <p style={{ color: '#94a3b8' }}>The runes crumbled under pressure.</p>
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
            Rekindle Forge 🔄
          </button>
        </div>
      )}
    </div>
  );
}
