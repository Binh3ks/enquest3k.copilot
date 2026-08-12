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
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';

const WEEK33_GRAMMAR_DRILLS = [
  {
    id: "st2_w33_g01",
    grammar_tag: "past_continuous_when_while",
    text_en: "Build a past continuous sentence with 'While'.",
    word_blocks: ["While", "Tom", "was", "waking", "up", ",", "he", "broke", "his", "clock", "."],
    distractor_blocks: ["is", "breaks", "run"]
  },
  {
    id: "st2_w33_g02",
    grammar_tag: "clauses_of_reason",
    text_en: "Build a cause and effect sentence with 'because'.",
    word_blocks: ["Tom", "fell", "down", "because", "the", "floor", "was", "slippery", "."],
    distractor_blocks: ["so", "falls", "why"]
  },
  {
    id: "st2_w33_g03",
    grammar_tag: "connectors",
    text_en: "Build a sentence showing contrast with 'Although'.",
    word_blocks: ["Although", "Tom", "made", "a", "mistake", ",", "Mia", "helped", "him", "."],
    distractor_blocks: ["but", "helps", "makes"]
  },
  {
    id: "st2_w33_g04",
    grammar_tag: "past_continuous_when_while",
    text_en: "Build a sentence about dropping a glass of orange juice.",
    word_blocks: ["While", "making", "breakfast", ",", "he", "dropped", "a", "glass", "."],
    distractor_blocks: ["were", "breaks", "while"]
  },
  {
    id: "st2_w33_g05",
    grammar_tag: "clauses_of_reason",
    text_en: "Build a sentence about apologizing for a clumsy mistake.",
    word_blocks: ["Tom", "apologized", "because", "he", "made", "a", "mistake", "."],
    distractor_blocks: ["so", "forgets", "why"]
  }
];

export function SentenceBuilderBattle({ customItem, onNext, onTriggerAdaptiveHint }) {
  const [bankBlocks, setBankBlocks] = useState([]);
  const [targetBlocks, setTargetBlocks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [consecutiveFails, setConsecutiveFails] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [drillIndex, setDrillIndex] = useState(0);

  const currentDrill = customItem || WEEK33_GRAMMAR_DRILLS[drillIndex] || WEEK33_GRAMMAR_DRILLS[0];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  useEffect(() => {
    if (!currentDrill) return;

    const allWords = [
      ...(currentDrill.word_blocks || currentDrill.raw_content?.word_blocks || []),
      ...(currentDrill.distractor_blocks || currentDrill.raw_content?.distractor_blocks || [])
    ];

    const formatted = allWords.map((word, idx) => ({
      id: `blk_${currentDrill.id || currentDrill.content_id}_${idx}_${word}`,
      word: word
    }));

    const shuffled = [...formatted].sort(() => Math.random() - 0.5);

    setBankBlocks(shuffled);
    setTargetBlocks([]);
    setFeedback(null);
    setStartTime(Date.now());
  }, [currentDrill]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const inBank = bankBlocks.some((b) => b.id === activeId);

    if (overId === 'target_dropzone' || targetBlocks.some((b) => b.id === overId)) {
      if (inBank) {
        const itemToMove = bankBlocks.find((b) => b.id === activeId);
        setBankBlocks(bankBlocks.filter((b) => b.id !== activeId));
        setTargetBlocks([...targetBlocks, itemToMove]);
      } else {
        const oldIdx = targetBlocks.findIndex((b) => b.id === activeId);
        const newIdx = targetBlocks.findIndex((b) => b.id === overId);
        if (oldIdx !== -1 && newIdx !== -1 && oldIdx !== newIdx) {
          setTargetBlocks(arrayMove(targetBlocks, oldIdx, newIdx));
        }
      }
    } else if (overId === 'bank_dropzone' || bankBlocks.some((b) => b.id === overId)) {
      if (!inBank) {
        const itemToMove = targetBlocks.find((b) => b.id === activeId);
        setTargetBlocks(targetBlocks.filter((b) => b.id !== activeId));
        setBankBlocks([...bankBlocks, itemToMove]);
      }
    }
  };

  const handleBlockTap = (id) => {
    const inBank = bankBlocks.some((b) => b.id === id);
    if (inBank) {
      const itemToMove = bankBlocks.find((b) => b.id === id);
      setBankBlocks(bankBlocks.filter((b) => b.id !== id));
      setTargetBlocks([...targetBlocks, itemToMove]);
    } else {
      const itemToMove = targetBlocks.find((b) => b.id === id);
      setTargetBlocks(targetBlocks.filter((b) => b.id !== id));
      setBankBlocks([...bankBlocks, itemToMove]);
    }
  };

  const handleClear = () => {
    const all = [...targetBlocks, ...bankBlocks];
    setTargetBlocks([]);
    setBankBlocks(all);
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
        learnerId: 'learner_default_01',
        contentId: currentDrill.id || 'w33_sentence_builder',
        mode: 'learn',
        result: 'correct',
        score: 100,
        timeSpentSeconds
      });
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

  const handleNextDrill = () => {
    if (onNext) {
      onNext();
    } else {
      setDrillIndex((prev) => (prev + 1) % WEEK33_GRAMMAR_DRILLS.length);
    }
  };

  const activeBlock = [...bankBlocks, ...targetBlocks].find((b) => b.id === activeId);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-md font-sans text-slate-900">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">
            LEARN MODE — SENTENCE BUILDER BATTLE
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">
            {currentDrill.text_en || currentDrill.text || 'Build the target sentence'}
          </h3>
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-900 text-xs font-mono font-bold rounded-lg border border-amber-200">
          Sentence {drillIndex + 1} / {(customDrills || WEEK33_GRAMMAR_DRILLS).length}
        </span>
      </div>

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
                    onClick={handleBlockTap}
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
                  onClick={handleBlockTap}
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
