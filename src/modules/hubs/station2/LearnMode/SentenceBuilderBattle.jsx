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

export function SentenceBuilderBattle({ currentItem, onNext, onTriggerAdaptiveHint }) {
  const [bankBlocks, setBankBlocks] = useState([]);
  const [targetBlocks, setTargetBlocks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [consecutiveFails, setConsecutiveFails] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  // Set up dnd-kit sensors with mobile/tablet scroll-prevention constraints
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, // 100ms hold ensures page scrolling isn't hijacked on iPad/Android
        tolerance: 5
      }
    })
  );

  // Initialize question blocks
  useEffect(() => {
    if (!currentItem) return;

    const allWords = [
      ...(currentItem.raw_content.word_blocks || []),
      ...(currentItem.raw_content.distractor_blocks || [])
    ];

    // Create block items with unique IDs
    const formatted = allWords.map((word, idx) => ({
      id: `blk_${currentItem.content_id}_${idx}_${word}`,
      word: word
    }));

    // Fisher-Yates shuffle
    const shuffled = [...formatted].sort(() => Math.random() - 0.5);

    setBankBlocks(shuffled);
    setTargetBlocks([]);
    setFeedback(null);
    setStartTime(Date.now());
  }, [currentItem]);

  // Handle Drag Start
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handle Drag End (Move between bank and target or reorder target)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const inBank = bankBlocks.some((b) => b.id === activeId);
    const inTarget = targetBlocks.some((b) => b.id === activeId);

    // Case A: Dragged from Bank into Target zone
    if (inBank && (overId === 'target_dropzone' || targetBlocks.some((b) => b.id === overId))) {
      const blockToMove = bankBlocks.find((b) => b.id === activeId);
      setBankBlocks(bankBlocks.filter((b) => b.id !== activeId));
      setTargetBlocks([...targetBlocks, blockToMove]);
    }
    // Case B: Dragged from Target back into Bank
    else if (inTarget && (overId === 'bank_dropzone' || bankBlocks.some((b) => b.id === overId))) {
      const blockToMove = targetBlocks.find((b) => b.id === activeId);
      setTargetBlocks(targetBlocks.filter((b) => b.id !== activeId));
      setBankBlocks([...bankBlocks, blockToMove]);
    }
    // Case C: Reorder inside Target Zone
    else if (inTarget && targetBlocks.some((b) => b.id === overId)) {
      const oldIndex = targetBlocks.findIndex((b) => b.id === activeId);
      const newIndex = targetBlocks.findIndex((b) => b.id === overId);
      if (oldIndex !== newIndex) {
        setTargetBlocks(arrayMove(targetBlocks, oldIndex, newIndex));
      }
    }
  };

  // Tap-to-Place Fallback (Alternative gesture for younger kids)
  const handleBlockTap = (id, word) => {
    const inBank = bankBlocks.some((b) => b.id === id);
    if (inBank) {
      const blockToMove = bankBlocks.find((b) => b.id === id);
      setBankBlocks(bankBlocks.filter((b) => b.id !== id));
      setTargetBlocks([...targetBlocks, blockToMove]);
    } else {
      const blockToMove = targetBlocks.find((b) => b.id === id);
      setTargetBlocks(targetBlocks.filter((b) => b.id !== id));
      setBankBlocks([...bankBlocks, blockToMove]);
    }
  };

  // Check Answer
  const handleCheckAnswer = async () => {
    const userTokens = targetBlocks.map((b) => b.word);
    const result = evaluateSentenceAttempt(userTokens, currentItem.answer_key);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    setFeedback(result);

    // Real-time Event Logging via learnerProgressService
    await learnerProgressService.logAttempt({
      learnerId: 'learner_default_01',
      contentId: currentItem.content_id,
      mode: 'learn',
      result: result.isCorrect
        ? result.isMinorError
          ? 'minor_error'
          : 'correct'
        : 'incorrect',
      hintUsed: false,
      minorErrors: result.minorErrors,
      diagnosticTag: result.diagnosticTag,
      score: result.score,
      timeSpentSeconds: timeSpent
    });

    if (result.isCorrect) {
      setConsecutiveFails(0);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      const newFailCount = consecutiveFails + 1;
      setConsecutiveFails(newFailCount);

      // Adaptive Logic Rule Check: Fail 2 consecutive times on same grammar tag -> trigger Mini Explainer Modal
      if (newFailCount >= 2 && onTriggerAdaptiveHint) {
        onTriggerAdaptiveHint(currentItem.raw_content.grammar_tag);
      }
    }
  };

  // Reset current target line
  const handleClear = () => {
    const all = [...bankBlocks, ...targetBlocks];
    setBankBlocks(all);
    setTargetBlocks([]);
    setFeedback(null);
  };

  const activeBlock = activeId
    ? [...bankBlocks, ...targetBlocks].find((b) => b.id === activeId)
    : null;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl text-white">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Learn Mode — Sentence Builder Battle
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-amber-400">
            {currentItem?.unit_theme}
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {currentItem?.raw_content.text}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-xs font-medium text-slate-300">
          <span>Dạng: </span>
          <span className="text-emerald-400 font-bold">
            {currentItem?.raw_content.grammar_tag}
          </span>
        </div>
      </div>

      {/* Dnd Context Wrapper */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Arena Battle Visual Field */}
        <div className="my-6 relative min-h-[160px] bg-slate-950 rounded-2xl p-4 sm:p-6 border-2 border-dashed border-indigo-500/40 flex flex-col justify-center items-center">
          <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-3">
            Dòng Sông Từ Vựng (Thả hoặc Chạm các từ để xếp câu tại đây)
          </div>

          {/* Target Dropzone */}
          <div
            id="target_dropzone"
            className={`w-full min-h-[70px] flex flex-wrap items-center justify-center gap-2.5 p-3 rounded-xl transition-all ${
              isShaking ? 'animate-bounce border-2 border-red-500' : ''
            } ${
              feedback?.isCorrect
                ? 'bg-emerald-950/40 border-2 border-emerald-500'
                : 'bg-slate-900/80 border border-slate-700'
            }`}
          >
            <SortableContext
              items={targetBlocks.map((b) => b.id)}
              strategy={horizontalListSortingStrategy}
            >
              {targetBlocks.length === 0 ? (
                <span className="text-slate-500 text-sm italic pointer-events-none">
                  (Kéo từ bên dưới lên đây hoặc chạm từ để xếp câu...)
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
        <div id="bank_dropzone" className="bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-700">
          <div className="text-xs text-slate-400 font-medium mb-3 flex items-center justify-between">
            <span>Kho Khối Từ (Chạm hoặc kéo để chọn):</span>
            {targetBlocks.length > 0 && (
              <button
                onClick={handleClear}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} /> Làm lại
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

        {/* Drag Overlay for smooth touch dragging */}
        <DragOverlay>
          {activeBlock ? <WordBlock id={activeBlock.id} word={activeBlock.word} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Feedback Alert Bar */}
      {feedback && (
        <div
          className={`mt-6 p-4 rounded-2xl flex items-center gap-3 transition-all ${
            feedback.isCorrect
              ? feedback.isMinorError
                ? 'bg-amber-950/60 border border-amber-500 text-amber-200'
                : 'bg-emerald-950/60 border border-emerald-500 text-emerald-200'
              : 'bg-rose-950/60 border border-rose-500 text-rose-200'
          }`}
        >
          {feedback.isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
          )}
          <div className="flex-1 text-sm font-medium">{feedback.feedbackText}</div>
        </div>
      )}

      {/* Action Footer Controls */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
        <button
          onClick={handleClear}
          disabled={targetBlocks.length === 0}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Xóa hết
        </button>

        {feedback?.isCorrect ? (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-600/30"
          >
            Câu tiếp theo <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleCheckAnswer}
            disabled={targetBlocks.length === 0}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={16} /> Kiểm tra câu
          </button>
        )}
      </div>
    </div>
  );
}
