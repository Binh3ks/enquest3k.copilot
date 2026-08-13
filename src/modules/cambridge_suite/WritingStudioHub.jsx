import React, { useState, useMemo } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { useUserStore } from '../../stores/useUserStore';
import { renderParsedText } from '../../components/common/HoverWord';
import { PenTool, Sparkles, Check, HelpCircle, X, Award, Layers } from 'lucide-react';

const DEFAULT_CHUNKS = [
  "woke up in a hurry",
  "felt extremely clumsy",
  "accidentally knocked over",
  "rushed downstairs",
  "slipped on a wet puddle",
  "to make things worse",
  "spilled a glass of juice",
  "cleaned up the mess",
  "apologized to his mother",
  "promised to be more careful"
];

export default function WritingStudioHub({ data, weekNumber = 33 }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const [userScript, setUserScript] = useState('');
  const [submitResult, setSubmitResult] = useState(null);
  const [showHintsModal, setShowHintsModal] = useState(false);

  const title = data?.title || data?.writing_studio?.title || "Cambridge Flyers Writing Part 7 — Tom's Diary";
  const prompt = data?.prompt || data?.writing_studio?.prompt || "Imagine you are Tom. Write a short diary entry (30-50 words) about your clumsy Saturday morning. Try to use at least 4 phrases from the Word Bank below.";

  const wordBank = useMemo(() => {
    return data?.word_bank || data?.writing_studio?.word_bank || DEFAULT_CHUNKS;
  }, [data]);

  // Live Chunk Tracking Logic: scan text for matching chunks (case-insensitive)
  const matchedChunks = useMemo(() => {
    const textLower = userScript.toLowerCase();
    return wordBank.filter((chunk) => textLower.includes(chunk.toLowerCase()));
  }, [userScript, wordBank]);

  const wordCount = useMemo(() => {
    return userScript.trim().split(/\s+/).filter(Boolean).length;
  }, [userScript]);

  const handleInsertChunk = (chunk) => {
    setUserScript((prev) => {
      if (!prev) return chunk;
      const cleanPrev = prev.trim();
      if (cleanPrev.endsWith('.') || cleanPrev.endsWith('!') || cleanPrev.endsWith(',')) {
        return `${cleanPrev} ${chunk}`;
      }
      return `${cleanPrev} ${chunk}`;
    });
  };

  const handleSubmitDiary = async () => {
    const isSuccess = matchedChunks.length >= 4;
    const score = Math.min(100, Math.max(50, matchedChunks.length * 15 + (wordCount >= 30 ? 25 : 10)));

    const resultPayload = {
      isSuccess,
      usedCount: matchedChunks.length,
      wordCount,
      score,
      message: isSuccess
        ? `Excellent! You used ${matchedChunks.length}/10 chunks and wrote ${wordCount} words!`
        : `Try to use at least 4 phrases from the Word Bank! (You used ${matchedChunks.length}/4 required)`
    };

    setSubmitResult(resultPayload);

    await learnerProgressService.logAttempt({
      learnerId,
      contentId: `w${weekNumber}_writing_studio`,
      mode: 'learn',
      result: isSuccess ? 'correct' : 'incorrect',
      score,
      timeSpentSeconds: 90
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-black rounded-full uppercase tracking-wider">
            Hub 3: Writing Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
        </div>

        <button
          onClick={() => setShowHintsModal(true)}
          className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm"
        >
          <HelpCircle size={15} className="text-amber-600" /> Writing Hints
        </button>
      </div>

      {/* Task Prompt Box */}
      <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 space-y-2 shadow-sm">
        <div className="flex items-center gap-2 text-purple-900 font-black text-sm uppercase tracking-wide">
          <PenTool size={18} className="text-purple-600" /> Writing Task Prompt:
        </div>
        <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {prompt}
        </p>
      </div>

      {/* Live Chunk Tracker & Word Bank Pills */}
      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Layers size={16} className="text-purple-600" />
            Live Chunk Tracker ({matchedChunks.length}/10 Used — Need at least 4):
          </span>
          <span className={`text-xs font-black px-3 py-1 rounded-full ${
            matchedChunks.length >= 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {matchedChunks.length >= 4 ? '✅ Target Reached' : `⚡ Need ${4 - matchedChunks.length} more`}
          </span>
        </div>

        {/* Word Bank Badges (Gamified Live Tracking) */}
        <div className="flex flex-wrap gap-2.5">
          {wordBank.map((chunk) => {
            const isUsed = matchedChunks.some((m) => m.toLowerCase() === chunk.toLowerCase());
            return (
              <button
                key={chunk}
                onClick={() => handleInsertChunk(chunk)}
                className={`px-3.5 py-2 rounded-xl text-sm sm:text-base font-extrabold transition-all flex items-center gap-2 shadow-sm border ${
                  isUsed
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black ring-2 ring-emerald-200'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-purple-400 hover:bg-purple-50/50'
                }`}
                title={isUsed ? 'Used in your text!' : 'Click to insert into your diary'}
              >
                {isUsed ? (
                  <span className="p-0.5 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </span>
                ) : (
                  <span className="text-purple-400 font-bold">+</span>
                )}
                {chunk}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Textarea Writing Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-black text-slate-600 uppercase">
          <span>Your Diary Entry:</span>
          <span>Word Count: <strong className="text-purple-700 text-sm">{wordCount}</strong> words</span>
        </div>

        <textarea
          rows={6}
          value={userScript}
          onChange={(e) => setUserScript(e.target.value)}
          placeholder="Dear Diary, I woke up in a hurry this morning because..."
          className="w-full p-5 bg-white border-2 border-slate-300 rounded-3xl text-lg sm:text-xl font-bold text-slate-900 leading-loose sm:leading-extraloose focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 shadow-inner placeholder:text-slate-400 placeholder:font-medium placeholder:italic"
        />

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs font-bold text-slate-500">
            Tip: Tap any phrase above to insert it directly into your writing.
          </p>

          <button
            onClick={handleSubmitDiary}
            disabled={userScript.trim().length === 0}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl text-base transition shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles size={18} /> Submit Diary
          </button>
        </div>
      </div>

      {/* Submit Feedback Banner */}
      {submitResult && (
        <div className={`p-6 rounded-3xl border text-center space-y-2 animate-in fade-in zoom-in-95 ${
          submitResult.isSuccess ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="flex justify-center items-center gap-2">
            <Award size={24} className={submitResult.isSuccess ? 'text-emerald-600' : 'text-amber-600'} />
            <h3 className="text-lg font-black">{submitResult.message}</h3>
          </div>
          <p className="text-sm font-bold opacity-90">
            Score: {submitResult.score}/100 — {submitResult.usedCount} Chunks Used, {submitResult.wordCount} Words Written.
          </p>
        </div>
      )}

      {/* Hints Scaffolding Modal */}
      {showHintsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HelpCircle size={18} className="text-amber-500" /> Diary Writing Scaffolding Hints
              </h3>
              <button
                onClick={() => setShowHintsModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                <h4 className="text-xs font-black text-purple-950 uppercase">Suggested Structure:</h4>
                <p className="text-xs font-bold text-purple-900 leading-relaxed">
                  Dear Diary, I woke up in a hurry this morning. I felt extremely clumsy when I accidentally knocked over my alarm clock...
                </p>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1">
                <h4 className="text-xs font-black text-indigo-950 uppercase">Target Word Bank:</h4>
                <ul className="text-xs font-bold text-indigo-900 space-y-1 list-disc pl-4">
                  {wordBank.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHintsModal(false)}
                className="px-6 py-2.5 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-slate-800 transition"
              >
                Close Hints
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
