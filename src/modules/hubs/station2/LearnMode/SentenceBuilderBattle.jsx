import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { WordBlock } from '../components/WordBlock';
import { evaluateSentenceAttempt } from '../../../../services/answerMatchingEngine';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import { renderParsedText } from '../../../../components/common/HoverWord';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, ArrowRight, Trophy, BookOpen, Timer, Flame, Play, Pause, RotateCcw } from 'lucide-react';
import LearnGrammarModal from '../../../../components/cambridge/LearnGrammarModal';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';

const WEEK33_GRAMMAR_DRILLS = [
  {
    id: "st2_w33_g01",
    grammar_tag: "past_continuous_when_while",
    text_en: "Build a past continuous sentence with 'While'.",
    word_blocks: ["While", "Jake", "was", "walking", "down", "the", "corridor", ",", "a", "boy", "slipped", "."],
    distractor_blocks: ["is", "slips", "run"]
  },
  {
    id: "st2_w33_g02",
    grammar_tag: "past_continuous_when_while",
    text_en: "Build a sentence describing first aid treatment.",
    word_blocks: ["While", "the", "nurse", "was", "treating", "his", "knee", ",", "Tom", "felt", "relieved", "."],
    distractor_blocks: ["feels", "treats", "so"]
  },
  {
    id: "st2_w33_g03",
    grammar_tag: "past_continuous_when_while",
    text_en: "Build a sentence showing cause of slipping.",
    word_blocks: ["A", "boy", "slipped", "while", "he", "was", "running", "fast", "on", "the", "wet", "floor", "."],
    distractor_blocks: ["runs", "is", "slowly"]
  },
  {
    id: "st2_w33_g04",
    grammar_tag: "past_simple_irregular",
    text_en: "Build an emergency action sentence.",
    word_blocks: ["Jake", "called", "the", "school", "nurse", "immediately", "for", "medical", "help", "."],
    distractor_blocks: ["calls", "calling", "later"]
  },
  {
    id: "st2_w33_g05",
    grammar_tag: "modal_verbs",
    text_en: "Build a school rule sentence.",
    word_blocks: ["The", "headmaster", "reminded", "all", "students", "never", "to", "run", "in", "corridors", "."],
    distractor_blocks: ["reminds", "always", "slow"]
  }
];

export function SentenceBuilderBattle({ customDrills, grammarLesson, onAttemptResult, onComplete }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';
  const [showGrammarModal, setShowGrammarModal] = useState(false);

  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'gameover'
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [targetBlocks, setTargetBlocks] = useState([]);
  const [bankBlocks, setBankBlocks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  const drillsList = (customDrills && Array.isArray(customDrills) && customDrills.length > 0)
    ? customDrills
    : WEEK33_GRAMMAR_DRILLS;

  const currentDrill = drillsList[currentDrillIndex] || drillsList[0];
  const totalDrillsCount = drillsList.length;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  // Load drill word blocks
  const loadDrill = (idx) => {
    const drill = drillsList[idx] || drillsList[0];
    if (!drill) return;

    const correctWords = Array.isArray(drill.word_blocks) ? drill.word_blocks : [];
    const distractors = Array.isArray(drill.distractor_blocks) ? drill.distractor_blocks : [];
    const allWords = [...correctWords, ...[...distractors].sort(() => Math.random() - 0.5)];

    const shuffled = allWords
      .map((word, index) => ({ id: `block-${index}-${word}`, word }))
      .sort(() => Math.random() - 0.5);

    setBankBlocks(shuffled);
    setTargetBlocks([]);
    setFeedback(null);
  };

  // Start Game
  const handleStartGame = () => {
    setCurrentDrillIndex(0);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setTimeLeft(45);
    setGameState('playing');
    loadDrill(0);
  };

  const handleTogglePause = () => {
    setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const finishGame = () => {
    setGameState('gameover');
    const xpEarned = score > 0 ? 35 : 0; // Anti-cheat: 0 XP if AFK!

    if (score > 0) {
      fireCelebrationConfetti('SentenceSmash_Victory');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(xpEarned);
    }

    if (onComplete) onComplete(score);
  };

  // Timer Engine (Linear 1s countdown, independent of score changes)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Timeout trigger when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      finishGame();
    }
  }, [timeLeft, gameState]);

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || gameState !== 'playing') return;

    if (active.id !== over.id) {
      const activeInTarget = targetBlocks.some((b) => b.id === active.id);
      const overInTarget = targetBlocks.some((b) => b.id === over.id);

      if (activeInTarget && overInTarget) {
        setTargetBlocks((items) => {
          const oldIndex = items.findIndex((i) => i.id === active.id);
          const newIndex = items.findIndex((i) => i.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  const handleBlockClick = (block) => {
    if (gameState !== 'playing') return;
    const inTarget = targetBlocks.some((b) => b.id === block.id);
    if (inTarget) {
      setTargetBlocks((prev) => prev.filter((b) => b.id !== block.id));
      setBankBlocks((prev) => [...prev, block]);
    } else {
      setBankBlocks((prev) => prev.filter((b) => b.id !== block.id));
      setTargetBlocks((prev) => [...prev, block]);
    }
  };

  const handleCheckAnswer = () => {
    if (gameState !== 'playing') return;
    const userSentence = targetBlocks.map((b) => b.word).join(' ');
    const targetWords = currentDrill.word_blocks || [];
    const evalResult = evaluateSentenceAttempt(userSentence, targetWords);

    if (evalResult.isCorrect) {
      const nextStreak = streak + 1;
      const nextCorrect = correctCount + 1;
      setStreak(nextStreak);
      setCorrectCount(nextCorrect);
      const bonusScore = 20 + nextStreak * 5;
      setScore(prev => prev + bonusScore);
      setTimeLeft(prev => Math.min(45, prev + 3));

      setFeedback({
        isCorrect: true,
        text: `🎉 Excellent! Correct sentence structure (+${bonusScore} PTS)`
      });

      setTimeout(() => {
        if (currentDrillIndex + 1 < totalDrillsCount) {
          const nextIdx = currentDrillIndex + 1;
          setCurrentDrillIndex(nextIdx);
          loadDrill(nextIdx);
        } else {
          finishGame();
        }
      }, 1000);
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        text: evalResult.feedbackText || 'Incorrect order. Re-arrange word blocks and try again!'
      });
    }
  };

  // Safe string title render
  const drillTitleText = typeof currentDrill?.text_en === 'string'
    ? currentDrill.text_en
    : (typeof currentDrill?.template === 'string' ? currentDrill.template : 'Build a correct sentence');

  return (
    <div className="w-full max-w-4xl mx-auto p-3.5 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border-2 border-indigo-200 shadow-xl space-y-3 text-slate-900 font-sans">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 flex-wrap gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
            🧱
          </div>
          <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">{drillTitleText}</h3>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {grammarLesson && (
            <button
              onClick={() => setShowGrammarModal(true)}
              className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white text-[11px] font-black rounded-lg shadow-sm flex items-center gap-1 transition active:scale-95"
            >
              <BookOpen size={12} className="text-amber-300" /> 📘 Rules
            </button>
          )}

          {gameState === 'playing' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 transition"
              title="Pause Timer"
            >
              <Pause size={14} />
            </button>
          )}

          {gameState === 'paused' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-black text-[11px] flex items-center gap-1 shadow-sm"
            >
              <Play size={12} /> Resume
            </button>
          )}

          <div className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1 font-mono text-[11px] font-black">
            <Timer className={timeLeft <= 8 && gameState === 'playing' ? 'text-rose-500 animate-ping' : 'text-indigo-600'} size={13} />
            <span className={timeLeft <= 8 ? 'text-rose-600' : 'text-slate-900'}>{timeLeft}s</span>
          </div>

          <div className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg border border-amber-300 font-mono text-[11px] font-black">
            {score} PTS
          </div>

          <span className="px-2 py-1 bg-indigo-50 text-indigo-900 text-[11px] font-mono font-bold rounded-lg border border-indigo-200">
            {currentDrillIndex + 1}/{totalDrillsCount}
          </span>
        </div>
      </div>

      {/* Start Screen (Idle) */}
      {gameState === 'idle' && (
        <div className="p-5 sm:p-6 bg-indigo-50/80 border-2 border-indigo-200 rounded-2xl text-center space-y-3 shadow-inner">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-md">
            🧱
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              READY FOR<br />SENTENCE SMASH?
            </h3>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white rounded-xl font-black text-sm shadow-lg inline-flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
          >
            <Play size={18} fill="currentColor" /> ▶ START
          </button>
        </div>
      )}

      {/* Paused Banner */}
      {gameState === 'paused' && (
        <div className="p-3 bg-indigo-50 border border-indigo-300 rounded-2xl flex items-center justify-between animate-in fade-in">
          <span className="text-xs font-black text-indigo-900 flex items-center gap-2">
            <Pause size={16} className="text-indigo-600 animate-pulse" /> Timer Paused — Re-order word blocks at your own pace!
          </span>
          <button
            type="button"
            onClick={handleTogglePause}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-1"
          >
            <Play size={14} fill="currentColor" /> Resume
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-3xl text-center space-y-4 shadow-inner animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-indigo-600 animate-bounce" />
          <h3 className="text-2xl font-black text-slate-900">
            {score > 0 ? 'SENTENCE SMASH COMPLETE!' : 'TIME EXPIRED — TRY AGAIN!'}
          </h3>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-700">
            <div>Score: <span className="text-xl font-black text-indigo-600">{score} PTS</span></div>
            <div>Sentences: <span className="text-xl font-black text-emerald-600">{correctCount}/{totalDrillsCount}</span></div>
            <div>XP Earned: <span className={`text-xl font-black ${score > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>+{score > 0 ? 35 : 0} XP</span></div>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <RotateCcw size={18} /> Play Sentence Smash Again
          </button>
        </div>
      )}

      {/* Active Game Display */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="space-y-2.5 sm:space-y-4">
            {/* Target Drop Zone Area */}
            <div className="p-2.5 sm:p-4 bg-indigo-50/60 border-2 border-dashed border-indigo-300 rounded-2xl min-h-[64px] sm:min-h-[80px] flex flex-wrap items-center gap-1.5 sm:gap-2 shadow-inner">
              {targetBlocks.length === 0 ? (
                <span className="text-[11px] sm:text-xs text-indigo-400 font-bold italic mx-auto">
                  (Drag or tap word pills below to construct your sentence...)
                </span>
              ) : (
                <SortableContext items={targetBlocks.map((b) => b.id)} strategy={horizontalListSortingStrategy}>
                  {targetBlocks.map((block) => (
                    <WordBlock key={block.id} id={block.id} word={block.word} onClick={() => handleBlockClick(block)} />
                  ))}
                </SortableContext>
              )}
            </div>

            {/* Word Bank Dock */}
            <div className="p-2.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 sm:space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                Word Bank (Tap or drag words to choose):
              </span>
              <div className="flex flex-wrap gap-2">
                {bankBlocks.map((block) => (
                  <WordBlock key={block.id} id={block.id} word={block.word} onClick={() => handleBlockClick(block)} />
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={targetBlocks.length === 0}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-black rounded-xl text-xs shadow-md flex items-center gap-1.5 transition active:scale-95"
              >
                <Sparkles size={16} /> Check Sentence
              </button>

              {feedback && (
                <div className={`p-3 rounded-xl border text-xs font-black flex items-center gap-2 animate-in fade-in ${
                  feedback.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'
                }`}>
                  {feedback.isCorrect ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {feedback.text}
                </div>
              )}
            </div>
          </div>
        </DndContext>
      )}

      {showGrammarModal && grammarLesson && (
        <LearnGrammarModal
          isOpen={showGrammarModal}
          onClose={() => setShowGrammarModal(false)}
          grammarLesson={grammarLesson}
        />
      )}
    </div>
  );
}

export default SentenceBuilderBattle;
