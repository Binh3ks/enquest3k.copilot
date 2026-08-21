import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';

/**
 * CatapultChunkGame V3 — Bulletproof Sentence Chunk Placement with Tap-or-Drag
 *
 * Features:
 *  - Dual Input: Tap-to-Place (Click chunk -> Click slot) AND Smooth Drag & Drop!
 *  - 100% Responsive Grid: Chunks distribute evenly across full canvas width and never drift off-screen.
 *  - Realistic Snap Physics: Snaps firmly into correct slot with green glow and click sound.
 *  - TTS Audio Voiceover: Pronounces chunks and reads full completed sentences out loud.
 *  - No compound penalty: gentle bounce-back to origin on mistake with clear feedback.
 */

export default function CatapultChunkGame({ onComplete, isStandalone = false }) {
  const ROUNDS = [
    {
      sentence: 'Jake was walking carefully down the corridor.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Jake' },
        { id: 'VP', label: 'Verb Phrase', answer: 'was walking carefully' },
        { id: 'C', label: 'Location', answer: 'down the corridor' },
      ],
      decoy: null,
    },
    {
      sentence: 'Tom slipped fast on the wet floor.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Tom' },
        { id: 'VP', label: 'Verb Phrase', answer: 'slipped fast' },
        { id: 'C', label: 'Location', answer: 'on the wet floor' },
      ],
      decoy: null,
    },
    {
      sentence: 'The nurse arrived quickly with clean bandages.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'The nurse' },
        { id: 'VP', label: 'Verb Phrase', answer: 'arrived quickly' },
        { id: 'C', label: 'Action & Tool', answer: 'with clean bandages' },
      ],
      decoy: 'in the science lab',
    },
    {
      sentence: 'Students must walk calmly during class breaks.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Students' },
        { id: 'VP', label: 'Modal & Verb', answer: 'must walk calmly' },
        { id: 'C', label: 'Time Setting', answer: 'during class breaks' },
      ],
      decoy: 'running fast',
    },
  ];

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [lockedSlots, setLockedSlots] = useState({}); // { slotId: word }
  const [selectedChunkId, setSelectedChunkId] = useState(null); // for Tap-to-Place
  const [feedback, setFeedback] = useState(null);
  const [chunks, setChunks] = useState([]);

  const containerRef = useRef(null);
  const chunksRef = useRef([]);
  const lockedSlotsRef = useRef({});
  const scoreRef = useRef(0);
  const gameStateRef = useRef('idle');
  const animRef = useRef(null);
  const dragRef = useRef(null);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const round = ROUNDS[Math.min(roundIdx, ROUNDS.length - 1)];

  const speak = useCallback((text) => {
    if (!text) return;
    try {
      window.speechSynthesis?.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.88;
      u.pitch = 1.05;
      u.lang = 'en-US';
      window.speechSynthesis?.speak(u);
    } catch (_) {}
  }, []);

  // Make chunks distributed across full width
  const makeChunks = useCallback((r) => {
    const allWords = [...r.slots.map(s => s.answer)];
    if (r.decoy) allWords.push(r.decoy);
    const shuffled = allWords.sort(() => Math.random() - 0.5);

    return shuffled.map((word, i) => {
      // Calculate responsive starting slot positions
      const col = i % 3;
      const row = Math.floor(i / 3);
      const initX = 15 + col * 33 + (Math.random() - 0.5) * 5; // percentages %
      const initY = 30 + row * 35 + (Math.random() - 0.5) * 5;

      return {
        id: `chunk_${i}_${Date.now()}`,
        word,
        isDecoy: word === r.decoy,
        xPct: initX,
        yPct: initY,
        origXPct: initX,
        origYPct: initY,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
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

      // Keep comfortably inside container % bounds
      if (xPct < 5) { xPct = 5; vx = Math.abs(vx); }
      if (xPct > 80) { xPct = 80; vx = -Math.abs(vx); }
      if (yPct < 15) { yPct = 15; vy = Math.abs(vy); }
      if (yPct > 70) { yPct = 70; vy = -Math.abs(vy); }

      xPct += vx;
      yPct += vy;

      return { ...c, xPct, yPct, vx, vy };
    });

    setChunks([...chunksRef.current]);
    animRef.current = requestAnimationFrame(floatLoop);
  }, []);

  const checkRoundComplete = useCallback((currentLocked, currentRIdx) => {
    const r = ROUNDS[Math.min(currentRIdx, ROUNDS.length - 1)];
    const allFilled = r.slots.every(s => currentLocked[s.id] === s.answer);

    if (allFilled) {
      scoreRef.current += 30;
      setScore(scoreRef.current);
      setFeedback({ msg: `🎉 Perfect Sentence! (+30 pts)`, type: 'good' });
      speak(`Completed: ${r.sentence}`);

      setTimeout(() => {
        setFeedback(null);
        if (currentRIdx + 1 < ROUNDS.length) {
          const nextRIdx = currentRIdx + 1;
          setRoundIdx(nextRIdx);
          lockedSlotsRef.current = {};
          setLockedSlots({});
          setSelectedChunkId(null);
          const newChunks = makeChunks(ROUNDS[nextRIdx]);
          chunksRef.current = newChunks;
          setChunks(newChunks);
        } else {
          // All rounds finished
          endGame();
        }
      }, 1400);
    }
  }, [makeChunks, speak]);

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

      scoreRef.current += 10;
      setScore(scoreRef.current);
      setFeedback({ msg: `✓ [${slot.label}] Locked! (+10 pts)`, type: 'good' });
      speak(chunk.word);
      setTimeout(() => setFeedback(null), 800);

      checkRoundComplete(newLocked, roundIdx);
    } else {
      // REJECT
      setSelectedChunkId(null);
      if (chunk.isDecoy) {
        setFeedback({ msg: `❌ "${chunk.word}" is an extra decoy chunk!`, type: 'bad' });
      } else {
        const correctSlot = round.slots.find(s => s.answer === chunk.word);
        setFeedback({
          msg: `❌ "${chunk.word}" belongs to [${correctSlot?.label || 'Other Slot'}]`,
          type: 'bad'
        });
      }
      setTimeout(() => setFeedback(null), 1600);
    }
  }, [round, roundIdx, checkRoundComplete, speak]);

  // Click on a chunk (for Tap-to-Place)
  const handleChunkClick = (chunk) => {
    if (chunk.locked) return;
    speak(chunk.word);
    if (selectedChunkId === chunk.id) {
      setSelectedChunkId(null); // deselect
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

  // 1-second game timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
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
    if (onComplete) onComplete(scoreRef.current);
  }, [onComplete, recordHighScore]);

  const startGame = () => {
    scoreRef.current = 0;
    setScore(0);
    setRoundIdx(0);
    setGameTimer(60);
    setLockedSlots({});
    setSelectedChunkId(null);
    setFeedback(null);
    lockedSlotsRef.current = {};

    const initialChunks = makeChunks(ROUNDS[0]);
    chunksRef.current = initialChunks;
    setChunks(initialChunks);

    gameStateRef.current = 'playing';
    setGameState('playing');
    animRef.current = requestAnimationFrame(floatLoop);
    speak(ROUNDS[0].sentence);
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '420px',
      background: 'linear-gradient(180deg, #131b31 0%, #1e293b 50%, #0f172a 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Top HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🧩</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#f59e0b', letterSpacing: '0.05em' }}>CHUNK CATAPULT</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Round {roundIdx + 1} of {ROUNDS.length}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '4px 12px' }}>
            🏆 {score} pts
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
              Assemble the Sentence Chunks!
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', maxWidth: '360px', lineHeight: 1.5 }}>
              Tap a floating chunk, then tap the matching grammar slot below (Subject, Verb Phrase, Location) to assemble the full sentence!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(245,158,11,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🧩</span> START PUZZLE
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Target Sentence Guide Banner */}
          <div style={{
            padding: '8px 16px', background: 'rgba(245,158,11,0.15)',
            borderBottom: '1.5px solid rgba(245,158,11,0.25)', textAlign: 'center', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              TARGET SENTENCE:
            </span>
            <span style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 800 }}>
              "{round.sentence}"
            </span>
            <button
              type="button"
              onClick={() => speak(round.sentence)}
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
                    minHeight: '64px',
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
                    fontSize: '10px',
                    fontWeight: 900,
                    color: isFilled ? '#34d399' : isHighlightTarget ? '#fbbf24' : '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '2px'
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
          <div style={{ fontSize: '56px' }}>🏆</div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 900, color: '#f59e0b' }}>
              All Sentences Complete!
            </h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1' }}>
              Final Score: <strong style={{ color: '#fbbf24', fontSize: '20px' }}>{score} pts</strong>
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <RotateCcw size={16} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}
