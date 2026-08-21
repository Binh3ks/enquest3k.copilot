import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, Sparkles, CheckCircle2, Trophy, Zap, Target, BookOpen, Timer } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { getWeekArcadeData } from './gameDataHelper';
import { speakText } from '../../utils/AudioHelper';
import ArcadeFoxHelper from './ArcadeFoxHelper';

/**
 * CatapultChunkGame V3 — Multi-Mode Sentence & Definition Match with Speedrun Time Attack
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
  const [fastestReflex, setFastestReflex] = useState(null);
  const [speedrunClearTime, setSpeedrunClearTime] = useState(null);

  const containerRef = useRef(null);
  const chunksRef = useRef([]);
  const lockedSlotsRef = useRef({});
  const scoreRef = useRef(0);
  const roundsDoneRef = useRef(0);
  const gameStateRef = useRef('idle');
  const animRef = useRef(null);
  const dragRef = useRef(null);
  const lastCatchTimeRef = useRef(Date.now());
  const spawnTimestampRef = useRef(Date.now());
  const startTimeRef = useRef(Date.now());
  const fastestReflexRef = useRef(null);

  const { consumePlayEnergy, recordHighScore, highScores, recordBestReaction, recordSpeedrunTime, bestReactionTimes, bestSpeedrunTimes } = useArcadeStore();
  const personalBest = highScores['chunk_catapult'] || 0;
  const storedBestReflex = bestReactionTimes['chunk_catapult'] || null;
  const storedBestSpeedrun = bestSpeedrunTimes['chunk_catapult'] || null;
  const TOTAL_ROUNDS = sentenceRounds.length;

  const round = sentenceRounds[Math.min(roundIdx, sentenceRounds.length - 1)];

  const playAudio = useCallback((text) => {
    if (!text) return;
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    speakText(text, null, 0.9, null, 'read', weekNumber);
  }, [weekNumber]);

  const makeChunks = (currentRound) => {
    if (!currentRound) return [];
    const correctChunks = (currentRound.slots || []).map(s => ({
      slotId: s.id,
      text: s.answer,
    }));
    const distractorChunks = (currentRound.distractors || []).map(d => ({
      slotId: null,
      text: d,
    }));
    const rawChunks = currentRound.chunks || [...correctChunks, ...distractorChunks];

    return rawChunks
      .sort(() => Math.random() - 0.5)
      .map((c, i) => ({
        id: `chunk_${c.slotId || 'd'}_${i}_${Math.random()}`,
        text: c.text,
        slotId: c.slotId,
        placed: false,
        x: 4 + (i % 3) * 30 + (Math.random() - 0.5) * 3,
        y: 10 + Math.floor(i / 3) * 28 + (Math.random() - 0.5) * 3,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        color: ['#0284c7', '#7c3aed', '#059669', '#d97706', '#dc2626'][i % 5],
      }));
  };

  const floatLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    chunksRef.current = chunksRef.current.map(c => {
      if (c.placed) return c;
      let { x, y, vx, vy } = c;
      x += vx;
      y += vy;
      if (x < 2 || x > 62) vx = -vx;
      if (y < 6 || y > 56) vy = -vy;
      return { ...c, x, y, vx, vy };
    });

    setChunks([...chunksRef.current]);
    animRef.current = requestAnimationFrame(floatLoop);
  }, []);

  const placeChunkInSlot = useCallback((chunk, slot) => {
    if (lockedSlotsRef.current[slot.id]) return;

    if (chunk.slotId === slot.id) {
      // Calculate Reflex Reaction Time for completing round
      const newLocked = { ...lockedSlotsRef.current, [slot.id]: chunk.text };
      lockedSlotsRef.current = newLocked;
      setLockedSlots(newLocked);

      scoreRef.current += 15;
      setScore(scoreRef.current);
      setFeedback({ msg: `✨ Matched "${chunk.text}"! (+15 pts)`, type: 'good' });

      chunksRef.current = chunksRef.current.map(c =>
        c.id === chunk.id ? { ...c, placed: true } : c
      );
      setChunks([...chunksRef.current]);
      setSelectedChunkId(null);
      lastCatchTimeRef.current = Date.now();
      setFoxTrigger(false);

      const allFilled = round.slots.every(s => newLocked[s.id]);

      if (allFilled) {
        // Round Finished!
        const roundSolveSec = (Date.now() - spawnTimestampRef.current) / 1000;
        const isLightning = roundSolveSec <= 5.0;
        const speedBonus = isLightning ? 10 : 0;

        if (!fastestReflexRef.current || roundSolveSec < fastestReflexRef.current) {
          fastestReflexRef.current = roundSolveSec;
          setFastestReflex(roundSolveSec);
          recordBestReaction('chunk_catapult', roundSolveSec);
        }

        scoreRef.current += (30 + speedBonus);
        roundsDoneRef.current += 1;
        setScore(scoreRef.current);
        setRoundsDone(roundsDoneRef.current);

        if (isLightning) {
          setFeedback({ msg: `⚡ LIGHTNING SOLVE: ${roundSolveSec.toFixed(1)}s! (+${30 + speedBonus} pts)`, type: 'good' });
        } else {
          setFeedback({ msg: `🎉 Round Complete (${roundSolveSec.toFixed(1)}s)! (+30 pts)`, type: 'good' });
        }

        setTimeout(() => {
          if (roundIdx + 1 >= sentenceRounds.length) {
            // Speedrun Victory Trigger (All rounds solved early!)
            const timeBonus = Math.floor(gameTimer * 2);
            scoreRef.current += timeBonus;
            setScore(scoreRef.current);
            endGame(true);
          } else {
            const nextIdx = roundIdx + 1;
            setRoundIdx(nextIdx);
            setLockedSlots({});
            lockedSlotsRef.current = {};
            const nextChunks = makeChunks(sentenceRounds[nextIdx]);
            chunksRef.current = nextChunks;
            setChunks(nextChunks);
            setFeedback(null);
            spawnTimestampRef.current = Date.now();
            playAudio(sentenceRounds[nextIdx].sentence || sentenceRounds[nextIdx].title);
          }
        }, 1200);
      } else {
        setTimeout(() => setFeedback(null), 800);
      }
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 5);
      setScore(scoreRef.current);
      setFeedback({ msg: `❌ "${chunk.text}" does not match "${slot.label}"`, type: 'bad' });
      setFoxTrigger(true);
      setSelectedChunkId(null);
      setTimeout(() => setFeedback(null), 1200);
    }
  }, [round, roundIdx, sentenceRounds, playAudio, gameTimer, recordBestReaction]);

  // Handle Drag Start
  const handleChunkDragStart = (chunk, e) => {
    dragRef.current = chunk;
    setSelectedChunkId(chunk.id);
  };

  const handleSlotDrop = (slot, e) => {
    e.preventDefault();
    if (dragRef.current) {
      placeChunkInSlot(dragRef.current, slot);
      dragRef.current = null;
    }
  };

  const handleSlotClick = (slot) => {
    if (selectedChunkId) {
      const chunk = chunksRef.current.find(c => c.id === selectedChunkId);
      if (chunk) {
        placeChunkInSlot(chunk, slot);
      }
    }
  };

  // 1-second game timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(false); return; }
      }
      setGameTimer(t => {
        if (t <= 1) { endGame(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [gameState, isStandalone]);

  const endGame = useCallback((isSpeedrunVictory = false) => {
    gameStateRef.current = 'done';
    setGameState('done');
    cancelAnimationFrame(animRef.current);

    if (isSpeedrunVictory) {
      const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
      setSpeedrunClearTime(elapsedSec);
      recordSpeedrunTime('chunk_catapult', elapsedSec);
    }

    recordHighScore('chunk_catapult', scoreRef.current);
  }, [recordHighScore, recordSpeedrunTime]);

  const startGame = () => {
    scoreRef.current = 0;
    roundsDoneRef.current = 0;
    fastestReflexRef.current = null;
    startTimeRef.current = Date.now();

    setScore(0);
    setRoundsDone(0);
    setRoundIdx(0);
    setGameTimer(180); // 3 minutes
    setLockedSlots({});
    setSelectedChunkId(null);
    setFeedback(null);
    setFoxTrigger(false);
    setFastestReflex(null);
    setSpeedrunClearTime(null);
    lockedSlotsRef.current = {};

    const initialChunks = makeChunks(sentenceRounds[0]);
    chunksRef.current = initialChunks;
    setChunks(initialChunks);

    gameStateRef.current = 'playing';
    setGameState('playing');
    animRef.current = requestAnimationFrame(floatLoop);
    spawnTimestampRef.current = Date.now();
    playAudio(sentenceRounds[0].sentence || sentenceRounds[0].title);
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '440px',
      background: 'radial-gradient(ellipse at 50% 20%, #1e1b4b 0%, #0f172a 60%, #050208 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden'
    }}>
      {/* Top HUD with Speed Metrics */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 12px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🎯</span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.04em' }}>CHUNK MATCHER</div>
            <div style={{ fontSize: '9px', color: '#94a3b8' }}>
              🎯 <b style={{ color: roundsDone >= TOTAL_ROUNDS ? '#4ade80' : '#fbbf24' }}>{roundsDone}/{TOTAL_ROUNDS} Rounds</b>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {(fastestReflex || storedBestReflex) && (
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#fde047', background: 'rgba(253,224,71,0.12)', border: '1px solid rgba(253,224,71,0.3)', borderRadius: '6px', padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Zap size={10} fill="#fde047" /> ⚡ {(fastestReflex || storedBestReflex).toFixed(1)}s
            </div>
          )}
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '6px', padding: '3px 8px' }}>
            ⭐ {score}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '6px', padding: '3px 8px' }}>
            ⏱ {Math.floor(gameTimer / 60)}:{String(gameTimer % 60).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* IDLE STATE (Lifted, compact) */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '24px', gap: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 12px rgba(245,158,11,0.5))' }}>🎯</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 900, color: '#fbbf24' }}>
              Grammar & Chunk Matcher!
            </h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#cbd5e1', maxWidth: '300px', lineHeight: 1.4 }}>
              Match chunks to slots across <b>{TOTAL_ROUNDS} grammar rounds</b>! Fast rounds earn <b>⚡ Speed Bonus (+10 pts)</b>!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '10px 24px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff', fontWeight: 900, fontSize: '13px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
            display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px',
          }}>
            <span>🎯</span> START MATCHING
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && round && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Target Banner */}
          <div style={{
            padding: '4px 10px', background: 'rgba(245,158,11,0.15)',
            borderBottom: '1px solid rgba(245,158,11,0.3)', textAlign: 'center', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {round.title ? `${round.title}:` : 'MATCH:'}
            </span>
            {round.sentence && (
              <span style={{ fontSize: '12px', color: '#f8fafc', fontWeight: 800, fontStyle: 'italic', maxWidth: '380px' }}>
                "{round.sentence}"
              </span>
            )}
            <button
              type="button"
              onClick={() => playAudio(round.sentence || round.title)}
              style={{
                background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)',
                color: '#fbbf24', borderRadius: '6px', padding: '2px 6px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 800
              }}
            >
              <Volume2 size={13} /> <span>Listen</span>
            </button>
          </div>

          {/* Floating Chunks Canvas */}
          <div
            ref={containerRef}
            style={{
              flex: 1, position: 'relative', overflow: 'hidden', minHeight: '160px',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(30,27,75,0.6) 0%, rgba(15,23,42,0.8) 100%)',
            }}
          >
            {feedback && (
              <div style={{
                position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
                zIndex: 40, padding: '4px 12px', borderRadius: '10px', fontWeight: 900, fontSize: '11px',
                background: feedback.type === 'good' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)',
                color: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap',
              }}>
                {feedback.msg}
              </div>
            )}

            {chunks.filter(c => !c.placed).map(c => {
              const isSelected = selectedChunkId === c.id;
              return (
                <div
                  key={c.id}
                  draggable
                  onDragStart={(e) => handleChunkDragStart(c, e)}
                  onClick={() => setSelectedChunkId(isSelected ? null : c.id)}
                  style={{
                    position: 'absolute',
                    left: `${c.x}%`,
                    top: `${c.y}%`,
                    padding: '4px 9px',
                    borderRadius: '8px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                      : `linear-gradient(135deg, ${c.color}, #1e293b)`,
                    border: isSelected ? '1.5px solid #ffffff' : '1px solid rgba(255,255,255,0.3)',
                    boxShadow: isSelected
                      ? '0 0 12px #fbbf24, 0 3px 8px rgba(0,0,0,0.5)'
                      : '0 2px 6px rgba(0,0,0,0.35)',
                    color: isSelected ? '#78350f' : '#ffffff',
                    fontWeight: 900,
                    fontSize: '10px',
                    lineHeight: 1.2,
                    maxWidth: '120px',
                    cursor: 'grab',
                    zIndex: isSelected ? 30 : 20,
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.text}
                </div>
              );
            })}

            {/* Top-Right Fox Helper */}
            <ArcadeFoxHelper
              hintText={`Tap chunk, then destination slot!`}
              triggerHint={foxTrigger}
              onHintUsed={() => setFoxTrigger(false)}
            />
          </div>

          {/* Bottom Destination Slots (Clean, compact, no obstruction) */}
          <div style={{
            padding: '6px 10px', background: 'rgba(15,23,42,0.94)',
            borderTop: '1px solid rgba(255,255,255,0.12)', flexShrink: 0,
            display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap',
          }}>
            {round.slots.map(slot => {
              const filledWord = lockedSlots[slot.id];
              const isFilled = !!filledWord;
              const isHighlightTarget = selectedChunkId && !isFilled;

              return (
                <div
                  key={slot.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleSlotDrop(slot, e)}
                  onClick={() => handleSlotClick(slot)}
                  style={{
                    minWidth: '82px', minHeight: '36px', padding: '3px 6px',
                    borderRadius: '8px',
                    background: isFilled
                      ? 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.35))'
                      : isHighlightTarget
                      ? 'rgba(251,191,36,0.18)'
                      : 'rgba(255,255,255,0.06)',
                    border: isFilled
                      ? '1.5px solid #10b981'
                      : isHighlightTarget
                      ? '1.5px dashed #fbbf24'
                      : '1px dashed rgba(255,255,255,0.25)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: isFilled ? 'default' : 'pointer',
                    boxShadow: isHighlightTarget ? '0 0 10px rgba(251,191,36,0.4)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    fontSize: '8px', color: isFilled ? '#a7f3d0' : '#94a3b8',
                    fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em',
                    marginBottom: '1px', textAlign: 'center'
                  }}>
                    {slot.label}
                  </div>

                  {isFilled ? (
                    <div style={{ fontSize: '10px', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <CheckCircle2 size={11} color="#34d399" />
                      <span>{filledWord}</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: '9px', color: isHighlightTarget ? '#fbbf24' : '#64748b', fontWeight: 800 }}>
                      {isHighlightTarget ? '👉 Place' : 'Empty'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RESULTS STATE (Lifted, compact) */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px', gap: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px' }}>{roundsDone >= TOTAL_ROUNDS ? '🏆' : '⭐'}</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 900, color: '#f59e0b' }}>
              {roundsDone >= TOTAL_ROUNDS ? '⚡ ALL ROUNDS SOLVED!' : 'Round Complete!'}
            </h3>
            <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#cbd5e1' }}>
              Completed: <strong style={{ color: roundsDone >= TOTAL_ROUNDS ? '#4ade80' : '#fbbf24' }}>{roundsDone}/{TOTAL_ROUNDS} Rounds</strong>
              {speedrunClearTime && (
                <span style={{ color: '#38bdf8', fontWeight: 900, marginLeft: '6px' }}>
                  ({speedrunClearTime.toFixed(1)}s! 🔥)
                </span>
              )}
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '6px 0', flexWrap: 'wrap' }}>
              {fastestReflex && (
                <div style={{ background: 'rgba(253,224,71,0.15)', border: '1px solid rgba(253,224,71,0.3)', borderRadius: '8px', padding: '4px 10px', color: '#fde047', fontWeight: 900, fontSize: '11px' }}>
                  ⚡ Reflex: {fastestReflex.toFixed(1)}s
                </div>
              )}
              <div style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '4px 10px', color: '#fbbf24', fontWeight: 900, fontSize: '11px' }}>
                ⭐ Score: {score} pts
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button type="button" onClick={startGame} style={{
              padding: '9px 20px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#fff', fontWeight: 900, fontSize: '12px', borderRadius: '10px',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <RotateCcw size={14} /> Play Again
            </button>
            {onExit && (
              <button type="button" onClick={onExit} style={{
                padding: '9px 16px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#cbd5e1', fontWeight: 800, fontSize: '12px', borderRadius: '10px',
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
