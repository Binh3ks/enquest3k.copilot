import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, Sparkles, CheckCircle2, Zap, Trophy, Target } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * CatapultChunkGame V3 — Multi-Mode Sentence & Definition Match with Audio Overlap Guard
 */

export default function CatapultChunkGame({ weekNumber = 33, onExit, isStandalone = false }) {
  const weekData = getWeekArcadeData(weekNumber);
  const sentenceRounds = weekData.sentenceRounds;

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [roundsDone, setRoundsDone] = useState(0);
  const [gameTimer, setGameTimer] = useState(180); // 3 minutes
  const [lockedSlots, setLockedSlots] = useState({}); // { slotId: word }
  const [selectedChunkId, setSelectedChunkId] = useState(null); // for Tap-to-Place
  const [feedback, setFeedback] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [foxTrigger, setFoxTrigger] = useState(false);

  const containerRef = useRef(null);
  const chunksRef = useRef([]);
  const lockedSlotsRef = useRef({});
  const scoreRef = useRef(0);
  const roundsDoneRef = useRef(0);
  const gameStateRef = useRef('idle');
  const animRef = useRef(null);
  const dragRef = useRef(null);
  const lastCatchTimeRef = useRef(Date.now());

  const { consumePlayEnergy, recordHighScore, highScores } = useArcadeStore();
  const personalBest = highScores['chunk_catapult'] || 0;
  const TOTAL_ROUNDS = sentenceRounds.length;

  const round = sentenceRounds[Math.min(roundIdx, sentenceRounds.length - 1)];

  const playAudio = useCallback((text) => {
    if (!text) return;
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    speakText(text, null, 0.9, null, 'read', weekNumber);
  }, [weekNumber]);

  // Make chunks distributed across full width with distractors
  const makeChunks = useCallback((r) => {
    const correctAnswers = r.slots.map(s => ({ word: s.answer, isDistractor: false }));
    const distractorAnswers = (r.distractors || []).map(w => ({ word: w, isDistractor: true }));
    const allItems = [...correctAnswers, ...distractorAnswers].sort(() => Math.random() - 0.5);

    return allItems.map((item, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const initX = 12 + col * 34 + (Math.random() - 0.5) * 6; // %
      const initY = 20 + row * 28 + (Math.random() - 0.5) * 6;

      const vx = (Math.random() - 0.5) * 0.22;
      const vy = (Math.random() - 0.5) * 0.22;

      return {
        id: `chunk_${Date.now()}_${i}_${Math.random()}`,
        word: item.word,
        isDistractor: item.isDistractor,
        xPct: initX,
        yPct: initY,
        vx,
        vy,
        locked: false,
        lockedSlotId: null,
      };
    });
  }, []);

  // Float animation loop
  const floatLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    chunksRef.current = chunksRef.current.map(c => {
      if (c.locked || dragRef.current?.chunkId === c.id) return c;

      let { xPct, yPct, vx, vy } = c;

      if (xPct < 5) { xPct = 5; vx = Math.abs(vx); }
      if (xPct > 78) { xPct = 78; vx = -Math.abs(vx); }
      if (yPct < 10) { yPct = 10; vy = Math.abs(vy); }
      if (yPct > 72) { yPct = 72; vy = -Math.abs(vy); }

      xPct += vx;
      yPct += vy;

      return { ...c, xPct, yPct, vx, vy };
    });

    setChunks([...chunksRef.current]);
    animRef.current = requestAnimationFrame(floatLoop);
  }, []);

  const checkRoundComplete = useCallback((currentLocked, currentRIdx) => {
    const r = sentenceRounds[Math.min(currentRIdx, sentenceRounds.length - 1)];
    const allFilled = r.slots.every(s => currentLocked[s.id] === s.answer);

    if (allFilled) {
      scoreRef.current += 30;
      roundsDoneRef.current += 1;
      setScore(scoreRef.current);
      setRoundsDone(roundsDoneRef.current);
      setFeedback({ msg: `🎉 Round Complete! (+30 pts)`, type: 'good' });

      // Cleanly speak the completed sentence
      playAudio(r.type === 'sentence' ? r.sentence : r.title);

      // Generous delay so the sentence finishes speaking BEFORE the next round's prompt
      setTimeout(() => {
        setFeedback(null);
        if (currentRIdx + 1 < sentenceRounds.length) {
          const nextRIdx = currentRIdx + 1;
          setRoundIdx(nextRIdx);
          lockedSlotsRef.current = {};
          setLockedSlots({});
          setSelectedChunkId(null);
          lastCatchTimeRef.current = Date.now();
          setFoxTrigger(false);

          const newChunks = makeChunks(sentenceRounds[nextRIdx]);
          chunksRef.current = newChunks;
          setChunks(newChunks);

          // Delay next prompt audio slightly
          setTimeout(() => {
            playAudio(sentenceRounds[nextRIdx].sentence || sentenceRounds[nextRIdx].title);
          }, 400);
        } else {
          endGame();
        }
      }, 2200);
    }
  }, [sentenceRounds, makeChunks, playAudio]);

  // Attempt to place a chunk into a slot (shared by Click-to-Place & Drag-and-Drop)
  const placeChunkInSlot = useCallback((chunk, slot) => {
    if (!chunk || !slot || chunk.locked || lockedSlotsRef.current[slot.id]) return;

    if (slot.answer === chunk.word) {
      // SNAP SUCCESS!
      const newLocked = { ...lockedSlotsRef.current, [slot.id]: chunk.word };
      lockedSlotsRef.current = newLocked;
      setLockedSlots({ ...newLocked });

      chunksRef.current = chunksRef.current.map(ch =>
        ch.id === chunk.id ? { ...ch, locked: true, lockedSlotId: slot.id } : ch
      );
      setChunks([...chunksRef.current]);
      setSelectedChunkId(null);
      lastCatchTimeRef.current = Date.now();
      setFoxTrigger(false);

      scoreRef.current += 15;
      setScore(scoreRef.current);
      setFeedback({ msg: `✓ Matched [${slot.label}]! (+15 pts)`, type: 'good' });
      playAudio(chunk.word);
      setTimeout(() => setFeedback(null), 800);

      checkRoundComplete(newLocked, roundIdx);
    } else {
      // REJECT
      setSelectedChunkId(null);
      if (chunk.isDistractor) {
        setFeedback({ msg: `❌ "${chunk.word}" is a distractor!`, type: 'bad' });
      } else {
        const correctSlot = round.slots.find(s => s.answer === chunk.word);
        setFeedback({
          msg: `❌ "${chunk.word}" belongs to [${correctSlot?.label || 'Other Slot'}]`,
          type: 'bad'
        });
      }
      setFoxTrigger(true);
      setTimeout(() => setFeedback(null), 1600);
    }
  }, [round, roundIdx, checkRoundComplete, playAudio]);

  // Click on a chunk (for Tap-to-Place)
  const handleChunkClick = (chunk) => {
    if (chunk.locked) return;
    playAudio(chunk.word);
    if (selectedChunkId === chunk.id) {
      setSelectedChunkId(null);
    } else {
      setSelectedChunkId(chunk.id);
    }
  };

  // Click on a slot (for Tap-to-Place)
  const handleSlotClick = (slot) => {
    if (lockedSlots[slot.id]) return;
    if (selectedChunkId) {
      const chunk = chunksRef.current.find(c => c.id === selectedChunkId);
      if (chunk) {
        placeChunkInSlot(chunk, slot);
      }
    }
  };

  // 1-second game timer + Fox Idle Hint Trigger
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
      }
      if (Date.now() - lastCatchTimeRef.current > 5000) {
        setFoxTrigger(true);
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
    cancelAnimationFrame(animRef.current);
    recordHighScore('chunk_catapult', scoreRef.current);
  }, [recordHighScore]);

  const startGame = () => {
    scoreRef.current = 0;
    roundsDoneRef.current = 0;
    setScore(0);
    setRoundsDone(0);
    setRoundIdx(0);
    setGameTimer(180); // 3 minutes
    setLockedSlots({});
    setSelectedChunkId(null);
    setFeedback(null);
    setFoxTrigger(false);
    lockedSlotsRef.current = {};

    const initialChunks = makeChunks(sentenceRounds[0]);
    chunksRef.current = initialChunks;
    setChunks(initialChunks);

    gameStateRef.current = 'playing';
    setGameState('playing');
    animRef.current = requestAnimationFrame(floatLoop);
    playAudio(sentenceRounds[0].sentence || sentenceRounds[0].title);
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '450px',
      background: 'linear-gradient(180deg, #131b31 0%, #1e293b 50%, #0f172a 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Top HUD with Target Rounds & Personal Best */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🧩</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#f59e0b', letterSpacing: '0.05em' }}>CHUNK CATAPULT</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              🎯 Target: <b style={{ color: roundsDone >= TOTAL_ROUNDS ? '#4ade80' : '#fbbf24' }}>{roundsDone}/{TOTAL_ROUNDS} Rounds</b> · {round.title}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {personalBest > 0 && (
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '8px', padding: '3px 8px' }}>
              🏆 Best: {personalBest}
            </div>
          )}
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '4px 12px' }}>
            ⭐ {score} pts
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#7dd3fc', background: 'rgba(125,211,252,0.1)', border: '1px solid rgba(125,211,252,0.25)', borderRadius: '8px', padding: '4px 12px' }}>
            ⏱ {gameTimer}s
          </div>
        </div>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', filter: 'drop-shadow(0 0 16px rgba(245,158,11,0.5))' }}>🧩</div>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 900, color: '#f59e0b' }}>
              Chunk Catapult & Meaning Match!
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', maxWidth: '360px', lineHeight: 1.5 }}>
              Target: Complete <b>{TOTAL_ROUNDS} Challenge Rounds</b> in 60 seconds! Tap or drag floating chunks to match grammar slots, meanings, and definitions.
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(245,158,11,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🧩</span> START (GOAL: 4 ROUNDS)
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Target Guide Banner */}
          <div style={{
            padding: '8px 16px', background: 'rgba(245,158,11,0.15)',
            borderBottom: '1.5px solid rgba(245,158,11,0.25)', textAlign: 'center', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              MISSION:
            </span>
            <span style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 800 }}>
              "{round.sentence}"
            </span>
            <button
              type="button"
              onClick={() => playAudio(round.sentence)}
              style={{
                background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)',
                color: '#fbbf24', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800
              }}
            >
              <Volume2 size={14} /> <span>Listen</span>
            </button>
          </div>

          {/* Feedback Overlay Banner */}
          {feedback && (
            <div style={{
              position: 'absolute', top: '95px', left: '50%', transform: 'translateX(-50%)',
              zIndex: 50, padding: '8px 20px', borderRadius: '16px', fontWeight: 900, fontSize: '14px',
              background: feedback.type === 'good' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)',
              color: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.6)', border: '2px solid rgba(255,255,255,0.4)',
              whiteSpace: 'nowrap',
            }}>
              {feedback.msg}
            </div>
          )}

          {/* Floating Chunks Area */}
          <div
            ref={containerRef}
            style={{ flex: 1, position: 'relative', overflow: 'hidden', touchAction: 'none' }}
          >
            {/* Instruction Tip */}
            <div style={{
              position: 'absolute', top: '8px', left: '16px',
              fontSize: '11px', color: '#94a3b8', fontWeight: 700, pointerEvents: 'none'
            }}>
              {selectedChunkId ? '👉 Now tap a matching slot below to place it!' : '👉 Click any chunk to select, then click a slot below'}
            </div>

            {/* Render Floating Chunks */}
            {chunks.filter(c => !c.locked).map(c => {
              const isSelected = selectedChunkId === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => handleChunkClick(c)}
                  style={{
                    position: 'absolute',
                    left: `${c.xPct}%`,
                    top: `${c.yPct}%`,
                    padding: '10px 18px',
                    borderRadius: '14px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                      : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: isSelected ? '2.5px solid #ffffff' : '1.5px solid rgba(255,255,255,0.4)',
                    boxShadow: isSelected
                      ? '0 0 20px #f59e0b, 0 6px 16px rgba(0,0,0,0.5)'
                      : '0 4px 14px rgba(0,0,0,0.4)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.15s, box-shadow 0.15s, background 0.15s',
                    zIndex: isSelected ? 30 : 20,
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = isSelected ? 'scale(1.05)' : 'scale(0.95)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = isSelected ? 'scale(1.1)' : 'scale(1)'; }}
                >
                  🧩 {c.word}
                </div>
              );
            })}

            {/* FLYING LEXIO FOX TARGET TRACKER */}
            {foxTrigger && (() => {
              const unplacedSlot = round.slots.find(s => !lockedSlots[s.id]);
              const targetChunk = unplacedSlot ? chunks.find(c => c.word === unplacedSlot.answer && !c.locked) : null;
              if (!targetChunk) return null;

              return (
                <div style={{
                  position: 'absolute',
                  left: `${targetChunk.xPct}%`,
                  top: `${targetChunk.yPct}%`,
                  transform: 'translate(-50%, -140%)',
                  zIndex: 45,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  animation: 'bounceIn 0.3s ease-out',
                }}>
                  <div style={{
                    background: '#fde047',
                    border: '2px solid #ca8a04',
                    borderRadius: '12px',
                    padding: '4px 10px',
                    color: '#713f12',
                    fontWeight: 900,
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                    marginBottom: '4px',
                  }}>
                    🦊 Put "{targetChunk.word}" in [{unplacedSlot.label}]! 👇
                  </div>
                  <div style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}>
                    🦊
                  </div>
                </div>
              );
            })()}

            {/* Lexio Fox Mascot Assistant on Bottom-Left */}
            <ArcadeFoxHelper
              hintText={`Match the floating chunk to the correct slot!`}
              triggerHint={foxTrigger}
              onHintUsed={() => setFoxTrigger(false)}
            />
          </div>

          {/* Grammar Drop Target Slots Bar (Bottom) */}
          <div style={{
            padding: '14px 16px', background: 'rgba(15,23,42,0.95)',
            borderTop: '2px solid rgba(255,255,255,0.1)', flexShrink: 0,
            display: 'flex', gap: '12px', zIndex: 40,
          }}>
            {round.slots.map(slot => {
              const isFilled = !!lockedSlots[slot.id];
              const filledWord = lockedSlots[slot.id];
              const isHighlightTarget = !!selectedChunkId && !isFilled;

              return (
                <div
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  style={{
                    flex: 1,
                    minHeight: '68px',
                    borderRadius: '14px',
                    padding: '8px 12px',
                    background: isFilled
                      ? 'rgba(16,185,129,0.15)'
                      : isHighlightTarget
                      ? 'rgba(245,158,11,0.15)'
                      : 'rgba(255,255,255,0.05)',
                    border: isFilled
                      ? '2px solid #10b981'
                      : isHighlightTarget
                      ? '2px dashed #f59e0b'
                      : '1.5px dashed rgba(255,255,255,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: isFilled ? 'default' : selectedChunkId ? 'pointer' : 'default',
                    boxShadow: isFilled ? '0 0 16px rgba(16,185,129,0.25)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    color: isFilled ? '#34d399' : isHighlightTarget ? '#fbbf24' : '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '2px',
                    textAlign: 'center'
                  }}>
                    {slot.label}
                  </div>

                  {isFilled ? (
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 900,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle2 size={14} color="#34d399" />
                      <span>{filledWord}</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: '11px', color: isHighlightTarget ? '#fbbf24' : '#64748b', fontWeight: 800 }}>
                      {isHighlightTarget ? '👉 Tap here to place' : 'Empty Slot'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME OVER STATE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px' }}>{roundsDone >= TOTAL_ROUNDS ? '🏆' : '⭐'}</div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 900, color: '#f59e0b' }}>
              {roundsDone >= TOTAL_ROUNDS ? 'All Challenges Complete! Grammar Master!' : 'Round Complete!'}
            </h3>
            <p style={{ margin: '0 0 6px', fontSize: '15px', color: '#cbd5e1' }}>
              Completed: <strong style={{ color: roundsDone >= TOTAL_ROUNDS ? '#4ade80' : '#fbbf24' }}>{roundsDone}/{TOTAL_ROUNDS} Rounds</strong>
            </p>
            <p style={{ margin: 0, fontSize: '16px', color: '#cbd5e1' }}>
              Final Score: <strong style={{ color: '#fbbf24', fontSize: '22px' }}>{score} pts</strong>
              {score > personalBest && <span style={{ color: '#4ade80', fontSize: '13px', marginLeft: '8px', fontWeight: 900 }}>🔥 NEW BEST!</span>}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={startGame} style={{
              padding: '12px 28px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '12px',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <RotateCcw size={16} /> Play Again
            </button>
            {onExit && (
              <button type="button" onClick={onExit} style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#cbd5e1', fontWeight: 800, fontSize: '14px', borderRadius: '12px',
                cursor: 'pointer',
              }}>
                Back to Arcade
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
