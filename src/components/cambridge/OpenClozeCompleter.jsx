import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, PenTool, BookOpen } from 'lucide-react';
import { learnerProgressService } from '../../services/learnerProgressService';
import HoverWord, { renderParsedText } from '../common/HoverWord';

export function OpenClozeCompleter({ customData, data: propData, onComplete }) {
  const data = customData || propData || {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Story Diary Note",
    text_template: "Dear Diary, today I learned an amazing lesson. While exploring [1]_____, we found something interesting. A small creature [2]_____ quickly across the path. Everyone [3]_____ surprised. We worked [4]_____ to solve the puzzle and [5]_____ the day happily!",
    answers: {
      "1": "outside",
      "2": "ran",
      "3": "was",
      "4": "together",
      "5": "finished"
    }
  };

  const [userInputs, setUserInputs] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const targetAnswers = data.answers || {};

  const handleInputChange = (gapId, val) => {
    // Only allow single-word typing (no spaces)
    const cleanWord = val.replace(/\s+/g, '');
    setUserInputs((prev) => ({
      ...prev,
      [gapId]: cleanWord
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const testGapIds = Object.keys(targetAnswers).filter(id => id !== '0');
    const totalGaps = testGapIds.length || 1;

    testGapIds.forEach((id) => {
      const userVal = (userInputs[id] || '').trim().toLowerCase();
      const targetVal = (targetAnswers[id] || '').trim().toLowerCase();
      if (userVal === targetVal) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / totalGaps) * 100);
    setScore({ correctCount, total: totalGaps, percent });
    setIsSubmitted(true);

    if (onComplete) {
      onComplete({
        score: percent,
        correctCount,
        totalGaps
      });
    }

    learnerProgressService.saveStationProgress(33, 'read_explore', {
      stationId: 'rw_part_6_open_cloze',
      score: percent,
      completed: true
    });
  };

  const handleReset = () => {
    setUserInputs({});
    setIsSubmitted(false);
    setScore(null);
  };

  // Helper to parse text_template and replace [0]_____, [1]_____, [2]_____, etc. with input fields
  const renderParsedDiaryText = () => {
    const rawText = data.text_template || '';
    const gapRegex = /\[(\d+)\]_____/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = gapRegex.exec(rawText)) !== null) {
      const gapId = match[1];
      const matchIndex = match.index;

      // Push preceding text segment
      if (matchIndex > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {renderParsedText(rawText.substring(lastIndex, matchIndex), 'indigo', null, true)}
          </span>
        );
      }

      // Check if gap 0 is an example gap
      if (gapId === '0') {
        const exampleVal = data.example?.target || data.answers?.['0'] || '';
        parts.push(
          <span key={`gap-0`} className="inline-flex flex-col items-center mx-1.5 my-1 align-baseline relative">
            <input
              type="text"
              disabled={true}
              value={exampleVal}
              readOnly
              className="w-28 sm:w-36 px-3 py-1.5 rounded-xl border-2 font-mono font-black text-center text-sm bg-amber-100 border-amber-400 text-amber-950 shadow-xs cursor-not-allowed"
            />
            <span className="text-[9px] font-black text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded mt-0.5 uppercase tracking-wide">
              ★ EXAMPLE
            </span>
          </span>
        );
        lastIndex = gapRegex.lastIndex;
        continue;
      }

      // Push gap input field
      const userVal = userInputs[gapId] || '';
      const targetVal = targetAnswers[gapId] || '';
      const isCorrect = isSubmitted && userVal.trim().toLowerCase() === targetVal.trim().toLowerCase();
      const isWrong = isSubmitted && !isCorrect;

      parts.push(
        <span key={`gap-${gapId}`} className="inline-flex flex-col items-center mx-1.5 my-1 align-baseline relative">
          <input
            type="text"
            disabled={isSubmitted}
            value={userVal}
            onChange={(e) => handleInputChange(gapId, e.target.value)}
            placeholder={`[${gapId}]...`}
            className={`w-28 sm:w-36 px-3 py-1.5 rounded-xl border-2 font-mono font-bold text-center text-sm transition-all focus:outline-none focus:ring-4 ${
              isSubmitted
                ? isCorrect
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md ring-2 ring-emerald-200'
                  : 'bg-rose-100 border-rose-500 text-rose-950 font-black shadow-md ring-2 ring-rose-200'
                : 'bg-white border-amber-300 text-amber-950 focus:border-amber-500 focus:ring-amber-200 shadow-inner'
            }`}
          />
          {isSubmitted && isWrong && (
            <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300 mt-1 shadow-sm animate-in fade-in">
              ✓ {targetVal}
            </span>
          )}
        </span>
      );

      lastIndex = gapRegex.lastIndex;
    }

    // Push remaining text segment
    if (lastIndex < rawText.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {renderParsedText(rawText.substring(lastIndex), 'indigo', null, true)}
        </span>
      );
    }

    return parts;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-black rounded-full uppercase tracking-wider flex items-center gap-1.5 w-max">
            Cambridge A2 Flyers — Reading & Writing Part 6
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Open Cloze Challenge
          </h2>
          <p className="text-xs text-amber-700 font-bold mt-0.5">
            Read the diary page and write the missing words. Write one word on each line.
          </p>
        </div>
        {isSubmitted && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition flex items-center gap-1.5"
          >
            <RefreshCw size={14} /> Try Again
          </button>
        )}
      </div>

      {/* Worked Example Card */}
      <div
        data-testid="example-row"
        className="p-3.5 bg-amber-50/90 rounded-2xl border-2 border-amber-300 shadow-2xs flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-white font-black text-[10px] uppercase tracking-wider shadow-2xs">
            ★ EXAMPLE
          </span>
          <span className="text-xs font-black text-amber-950">
            Example Gap [0]: &ldquo;{data?.example?.target || ""}&rdquo;
          </span>
          <span className="text-[11px] text-amber-800 italic font-medium">
            (Read the diary and write one missing word on each line)
          </span>
        </div>
        <span className="px-2 py-0.5 bg-amber-200 text-amber-950 font-black text-[10px] rounded-lg uppercase">
          Pre-filled
        </span>
      </div>

      {/* Main Diary Entry Paper Card Viewport */}
      <div className="p-6 sm:p-8 bg-amber-50/80 rounded-3xl border-2 border-amber-200/90 shadow-lg relative overflow-hidden space-y-4">
        {/* Diary Title Ribbon */}
        <div className="flex items-center justify-between border-b-2 border-amber-300/70 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-amber-800" />
            <h3 className="text-lg sm:text-xl font-black text-amber-950 font-serif">
              {data.title || "Story Diary Note"}
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-200/70 px-3 py-1 rounded-full font-mono">
            5 Gaps • No Word Bank
          </span>
        </div>

        {/* Diary Paragraph Passage with Inline Text Inputs */}
        <div className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif tracking-wide pt-2">
          {renderParsedDiaryText()}
        </div>
      </div>

      {/* Action Footer Button & Score Result Modal */}
      {!isSubmitted ? (
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(userInputs).filter(k => userInputs[k].trim().length > 0).length === 0}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm transition shadow-lg flex items-center gap-2 disabled:opacity-50 active:scale-95"
          >
            <CheckCircle2 size={18} /> Submit Open Cloze Answers
          </button>
        </div>
      ) : (
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-300 text-center space-y-3 shadow-md animate-in fade-in">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
            {score.percent === 100 ? '🌟' : '👍'}
          </div>
          <h3 className="text-xl font-black text-emerald-950">
            Open Cloze Challenge Completed!
          </h3>
          <div className="flex items-center justify-center gap-4 text-sm font-black text-emerald-900">
            <span>Score: {score.correctCount} / {score.total}</span>
            <span>({score.percent}%)</span>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs transition shadow-md flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw size={14} /> Retake Open Cloze Challenge
          </button>
        </div>
      )}
    </div>
  );
}

export default OpenClozeCompleter;
