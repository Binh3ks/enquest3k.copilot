import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { WordBlock } from '../components/WordBlock';
import { evaluateSentenceAttempt } from '../../../../services/answerMatchingEngine';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import { renderParsedText } from '../../../../components/common/HoverWord';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, ArrowRight, Trophy, BookOpen } from 'lucide-react';
import CompletionModal from '../../../../components/common/CompletionModal';
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

export function SentenceBuilderBattle({ customDrills, grammarLesson, onAttemptResult }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';
  const [showGrammarModal, setShowGrammarModal] = useState(false);

  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [targetBlocks, setTargetBlocks] = useState([]);
  const [bankBlocks, setBankBlocks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [consecutiveFails, setConsecutiveFails] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const drillsList = customDrills || WEEK33_GRAMMAR_DRILLS;
  const currentDrill = drillsList[currentDrillIndex] || drillsList[0];
  const totalDrillsCount = drillsList.length;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  useEffect(() => {
    if (!currentDrill) return;

    const correctWords = currentDrill.word_blocks || [];
    const distractors = currentDrill.distractor_blocks || [];
    const allWords = [...correctWords, ...distractorWordsShuffle(distractors)];

    const shuffled = allWords
      .map((word, index) => ({ id: `block-${index}-${word}`, word }))
      .sort(() => Math.random() - 0.5);

    setBankBlocks(shuffled);
    setTargetBlocks([]);
    setFeedback(null);
    setConsecutiveFails(0);
    setStartTime(Date.now());
  }, [currentDrillIndex, customDrills]);

  const distractorWordsShuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

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

  const handleTapBlockToTarget = (block) => {
    setBankBlocks((prev) => prev.filter((b) => b.id !== block.id));
    setTargetBlocks((prev) => [...prev, block]);
    setFeedback(null);
  };

  const handleTapBlockToBank = (block) => {
    setTargetBlocks((prev) => prev.filter((b) => b.id !== block.id));
    setBankBlocks((prev) => [...prev, block]);
    setFeedback(null);
  };

  const handleClear = () => {
    setBankBlocks((prev) => [...prev, ...targetBlocks]);
    setTargetBlocks([]);
    setFeedback(null);
  };

  const handleCheckAnswer = async () => {
    const userWords = targetBlocks.map((b) => b.word);
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    const evalResult = evaluateSentenceAttempt(userWords, currentDrill.answer_key || {
      valid_structures: [currentDrill.word_blocks]
    });

    const isCorrect = evalResult.isCorrect;

    if (isCorrect) {
      setConsecutiveFails(0);
      setFeedback({ isCorrect: true, text: '100% Correct! Excellent grammar structure!' });

      await learnerProgressService.logAttempt({
        learnerId,
        contentId: currentDrill.id || 'w33_sentence_builder',
        mode: 'learn',
        result: 'correct',
        score: 100,
        timeSpentSeconds
      });
      if (onAttemptResult) onAttemptResult(true);
    } else {
      const nextFails = consecutiveFails + 1;
      setConsecutiveFails(nextFails);

      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      setFeedback({
        isCorrect: false,
        text: evalResult.feedbackText || 'Incorrect order. Check word positions and try again!'
      });

      if (nextFails >= 2 && onTriggerAdaptiveHint) {
        onTriggerAdaptiveHint(currentDrill.grammar_tag);
      }
    }
  };

  const [isCompleted, setIsCompleted] = useState(false);

  const handleNextDrill = () => {
    if (currentDrillIndex + 1 < totalDrillsCount) {
      setDrillIndex(currentDrillIndex + 1);
    } else {
      setIsCompleted(true);
      fireCelebrationConfetti('SentenceBuilder_Complete');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(50);
    }
  };

  const handleRestart = () => {
    setDrillIndex(0);
    setIsCompleted(false);
    setFeedback(null);
  };

  const activeBlock = [...bankBlocks, ...targetBlocks].find((b) => b.id === activeId);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-md font-sans text-slate-900">
      <CompletionModal
        isOpen={isCompleted}
        onClose={() => {}}
        score={100}
        stars={3}
        xpEarned={50}
        srsWordsAdded={5}
        activityTitle="Sentence Builder Battle (Arena Game)"
      />
      {/* Header Info */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 flex-wrap gap-2">
        <div>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">
            LEARN MODE — SENTENCE BUILDER BATTLE
          </span>
          <h3 className="text-base font-black text-slate-900 mt-0.5">{currentDrill.text_en}</h3>
        </div>
        <div className="flex items-center gap-2">
          {grammarLesson && (
            <button
              onClick={() => setShowGrammarModal(true)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95 border border-blue-400/40"
              title="Learn Grammar Rules (Grammar in Use)"
            >
              <BookOpen size={14} className="text-amber-300" /> 📘 Learn Grammar
            </button>
          )}

          {isCompleted && (
            <button
              onClick={handleRestart}
              className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black rounded-lg border border-indigo-200 flex items-center gap-1 transition shadow-sm"
            >
              <RefreshCw size={12} /> Play Again
            </button>
          )}
          <span className="px-3 py-1 bg-amber-50 text-amber-900 text-xs font-mono font-bold rounded-lg border border-amber-200">
            Sentence {currentDrillIndex + 1} / {totalDrillsCount}
          </span>
        </div>
      </div>

      {showGrammarModal && grammarLesson && (
        <LearnGrammarModal
          isOpen={showGrammarModal}
          onClose={() => setShowGrammarModal(false)}
          grammarLesson={grammarLesson}
        />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Arena Battle Visual Field */}
        <div className="my-6 relative min-h-[160px] bg-slate-50 rounded-2xl p-4 sm:p-6 border-2 border-dashed border-indigo-300 flex flex-col justify-center items-center shadow-inner">
          <div className="text-xs text-indigo-600 font-black uppercase tracking-wider mb-3">
            Sentence Builder Zone (Drag or tap words below to construct sentence)
          </div>

          {/* Target Dropzone */}
          <div
            id="target_dropzone"
            className={`w-full min-h-[70px] flex flex-wrap items-center justify-center gap-2.5 p-3 rounded-xl transition-all ${
              isShaking ? 'animate-bounce border-2 border-red-500' : ''
            } ${
              feedback?.isCorrect
                ? 'bg-emerald-50 border-2 border-emerald-500'
                : 'bg-white border border-slate-300 shadow-sm'
            }`}
          >
            <SortableContext
              items={targetBlocks.map((b) => b.id)}
              strategy={horizontalListSortingStrategy}
            >
              {targetBlocks.length === 0 ? (
                <span className="text-slate-400 text-xs font-medium italic pointer-events-none">
                  (Drag or tap word pills below to construct your sentence...)
                </span>
              ) : (
                targetBlocks.map((block) => (
                  <WordBlock
                    key={block.id}
                    id={block.id}
                    word={block.word}
                    isPlaced={true}
                    onClick={() => handleTapBlockToBank(block)}
                  />
                ))
              )}
            </SortableContext>
          </div>
        </div>

        {/* Word Bank Field */}
        <div id="bank_dropzone" className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-600 font-black mb-3 flex items-center justify-between">
            <span>Word Bank (Tap or drag words to choose):</span>
            {targetBlocks.length > 0 && (
              <button
                onClick={handleClear}
                className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} /> Reset All
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 min-h-[60px]">
            <SortableContext
              items={bankBlocks.map((b) => b.id)}
              strategy={horizontalListSortingStrategy}
            >
              {bankBlocks.map((block) => (
                <WordBlock
                  key={block.id}
                  id={block.id}
                  word={block.word}
                  isPlaced={false}
                  onClick={() => handleTapBlockToTarget(block)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        <DragOverlay>
          {activeBlock ? <WordBlock id={activeBlock.id} word={activeBlock.word} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Action Controls & Feedback */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handleCheckAnswer}
          disabled={targetBlocks.length === 0}
          className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-sm transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles size={16} /> Check Sentence
        </button>

        {feedback && (
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className={`text-xs font-black ${feedback.isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
              {feedback.text}
            </span>
            {feedback.isCorrect && (
              <button
                onClick={handleNextDrill}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs transition shadow-md flex items-center gap-1.5"
              >
                Next Drill <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
