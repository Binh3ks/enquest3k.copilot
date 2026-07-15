import React, { useState } from 'react';
import { ChevronRight, CheckCircle, XCircle, Star, BookOpen, Pencil, Brain } from 'lucide-react';
import { PLACEMENT_DATA, computePlacementResult } from '../data/placementTest';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const PHASES = ['welcome', 'vocab', 'grammar', 'reading', 'writing', 'result'];

const MODULE_META = {
  vocab: { label: 'Vocabulary', icon: BookOpen, color: 'blue' },
  grammar: { label: 'Grammar', icon: Brain, color: 'purple' },
  reading: { label: 'Reading', icon: BookOpen, color: 'emerald' },
  writing: { label: 'Writing', icon: Pencil, color: 'amber' },
};

export default function PlacementTest({ onComplete }) {
  const navigate = useNavigate();
  const { setLearningMode } = useUserStore();

  const [phase, setPhase] = useState('welcome');
  const [scores, setScores] = useState({ vocab: 0, grammar: 0, reading: 0, writing: 0 });

  // Vocab / Grammar adaptive state
  const [mcqLevel, setMcqLevel] = useState(1);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [readingStage, setReadingStage] = useState('easy'); // easy → advanced
  const [readingQIdx, setReadingQIdx] = useState(0);
  const [readingCorrect, setReadingCorrect] = useState(0);
  const [writingText, setWritingText] = useState('');
  const [writingLevel, setWritingLevel] = useState(1);
  const [writingDone, setWritingDone] = useState(false);
  const [result, setResult] = useState(null);

  // ─── MCQ helpers (vocab + grammar) ───────────────────────────────────────
  const getMcqItem = (module) => {
    const list = PLACEMENT_DATA[module];
    return list.find((q) => q.level === mcqLevel) || null;
  };

  const handleMcqSelect = (module, option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    const item = getMcqItem(module);
    const isCorrect = option === item.answer;

    if (isCorrect) {
      const nextLevel = mcqLevel + 1;
      const maxLevel = PLACEMENT_DATA[module].length;
      // Save score = levels passed
      setScores((prev) => ({ ...prev, [module]: nextLevel - 1 }));
      if (nextLevel <= maxLevel) {
        setTimeout(() => {
          setMcqLevel(nextLevel);
          setSelected(null);
          setAnswered(false);
        }, 800);
        return;
      }
      // Passed all levels
      setTimeout(() => finishMcq(module, maxLevel), 800);
    } else {
      // Failed → record current score and advance phase
      setScores((prev) => ({ ...prev, [module]: mcqLevel - 1 }));
      setTimeout(() => finishMcq(module, mcqLevel - 1), 800);
    }
  };

  const finishMcq = (module, score) => {
    setScores((prev) => ({ ...prev, [module]: score }));
    setMcqLevel(1);
    setSelected(null);
    setAnswered(false);
    const idx = PHASES.indexOf(module);
    setPhase(PHASES[idx + 1]);
  };

  // ─── Reading helpers ─────────────────────────────────────────────────────
  const getReadingData = () => PLACEMENT_DATA.reading.find((r) => r.level === readingStage);

  const handleReadingAnswer = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    const data = getReadingData();
    const isCorrect = option === data.questions[readingQIdx].answer;
    const newCorrect = readingCorrect + (isCorrect ? 1 : 0);

    const isLastQ = readingQIdx === data.questions.length - 1;

    setTimeout(() => {
      setSelected(null);
      setAnswered(false);

      if (!isLastQ) {
        setReadingQIdx((i) => i + 1);
        setReadingCorrect(newCorrect);
        return;
      }

      // finished this passage
      if (readingStage === 'easy' && newCorrect === data.questions.length) {
        // All correct on easy → try advanced
        setReadingStage('advanced');
        setReadingQIdx(0);
        setReadingCorrect(0);
      } else {
        // Score: 0 = none, 1 = easy partial, 2 = easy full, 3 = advanced full
        let readScore = 0;
        if (readingStage === 'easy') readScore = newCorrect; // 0-2
        else {
          readScore = 2 + (newCorrect === getReadingData().questions.length ? 1 : 0); // 2 or 3
        }
        setScores((prev) => ({ ...prev, reading: readScore }));
        setPhase('writing');
      }
    }, 800);
  };

  // ─── Writing helpers ─────────────────────────────────────────────────────
  const getWritingPrompt = () => PLACEMENT_DATA.writing.find((w) => w.level === writingLevel);

  const handleWritingNext = () => {
    const wordCount = writingText.trim().split(/\s+/).filter(Boolean).length;
    const prompt = getWritingPrompt();
    const met = wordCount >= (prompt.min_words || 10);
    const nextLevel = writingLevel + 1;

    if (met && nextLevel <= PLACEMENT_DATA.writing.length) {
      setScores((prev) => ({ ...prev, writing: writingLevel }));
      setWritingLevel(nextLevel);
      setWritingText('');
      return;
    }

    const finalScore = met ? writingLevel : writingLevel - 1;
    setScores((prev) => ({ ...prev, writing: finalScore }));
    finishWriting(finalScore);
  };

  const handleWritingSkip = () => {
    setScores((prev) => ({ ...prev, writing: writingLevel - 1 }));
    finishWriting(writingLevel - 1);
  };

  const finishWriting = (score) => {
    setScores((prev) => {
      const finalScores = { ...prev, writing: score };
      const res = computePlacementResult(finalScores);
      setResult(res);

      // Persist to localStorage
      localStorage.setItem('placement_result', JSON.stringify({
        ...res,
        completedAt: new Date().toISOString(),
        scores: finalScores,
      }));

      return finalScores;
    });
    setWritingDone(true);
    setPhase('result');
  };

  // ─── Navigation handlers ─────────────────────────────────────────────────
  const handleGoToStart = () => {
    if (!result) return;
    if (onComplete) {
      onComplete(result);
    } else {
      navigate(`/week/${result.startWeek}/read_explore`);
    }
  };

  const handleSkipTest = () => {
    const defaultResult = { startWeek: 1, mode: 'easy', cefr_level: 'Pre-A1' };
    localStorage.setItem('placement_result', JSON.stringify({
      ...defaultResult,
      completedAt: new Date().toISOString(),
      skipped: true,
    }));
    navigate('/week/1/read_explore');
  };

  // ─── Render phases ────────────────────────────────────────────────────────
  if (phase === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">Placement Test</h1>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Answer a few quick questions so we can find your perfect starting point.
            It only takes about 3 minutes!
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setPhase('vocab')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl text-lg transition-colors flex items-center justify-center gap-2"
            >
              Start Test <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleSkipTest}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
            >
              Skip — start from Week 1
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'vocab' || phase === 'grammar') {
    const item = getMcqItem(phase);
    if (!item) return null;
    const meta = MODULE_META[phase];
    const Icon = meta.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl bg-${meta.color}-100 flex items-center justify-center`}>
              <Icon className={`w-5 h-5 text-${meta.color}-600`} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{meta.label}</p>
              <p className="text-xs text-slate-400">Level {mcqLevel} of {PLACEMENT_DATA[phase].length}</p>
            </div>
          </div>

          <h2 className="text-xl font-black text-slate-800 mb-6">{item.question}</h2>

          <div className="grid grid-cols-1 gap-3">
            {item.options.map((opt) => {
              let cls = 'p-4 border-2 rounded-xl font-semibold text-left transition-all cursor-pointer ';
              if (!answered) {
                cls += 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700';
              } else if (opt === item.answer) {
                cls += 'border-green-500 bg-green-50 text-green-700';
              } else if (opt === selected) {
                cls += 'border-rose-400 bg-rose-50 text-rose-600';
              } else {
                cls += 'border-slate-100 bg-slate-50 text-slate-400';
              }
              return (
                <button key={opt} className={cls} onClick={() => handleMcqSelect(phase, opt)}>
                  {opt}
                  {answered && opt === item.answer && <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />}
                  {answered && opt === selected && opt !== item.answer && <XCircle className="w-4 h-4 inline ml-2 text-rose-500" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'reading') {
    const data = getReadingData();
    const q = data.questions[readingQIdx];

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Reading</p>
              <p className="text-xs text-slate-400 capitalize">{readingStage} passage · Q{readingQIdx + 1}/{data.questions.length}</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-slate-700 text-sm leading-relaxed">
            {data.passage}
          </div>

          <p className="text-lg font-black text-slate-800 mb-4">{q.q}</p>

          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt) => {
              let cls = 'p-4 border-2 rounded-xl font-semibold text-left transition-all cursor-pointer text-sm ';
              if (!answered) {
                cls += 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700';
              } else if (opt === q.answer) {
                cls += 'border-green-500 bg-green-50 text-green-700';
              } else if (opt === selected) {
                cls += 'border-rose-400 bg-rose-50 text-rose-600';
              } else {
                cls += 'border-slate-100 bg-slate-50 text-slate-400';
              }
              return (
                <button key={opt} className={cls} onClick={() => handleReadingAnswer(opt)}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'writing') {
    const prompt = getWritingPrompt();
    const wordCount = writingText.trim().split(/\s+/).filter(Boolean).length;
    const met = wordCount >= (prompt?.min_words || 10);

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Pencil className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Writing</p>
              <p className="text-xs text-slate-400">Level {writingLevel} of {PLACEMENT_DATA.writing.length}</p>
            </div>
          </div>

          <p className="text-lg font-black text-slate-800 mb-4">{prompt?.prompt}</p>
          <p className="text-xs text-slate-400 mb-2">Min: {prompt?.min_words} words · Max: {prompt?.max_words} words</p>

          <textarea
            value={writingText}
            onChange={(e) => setWritingText(e.target.value)}
            rows={5}
            placeholder="Write your answer here..."
            className="w-full p-4 border-2 rounded-2xl text-slate-700 border-slate-200 focus:border-amber-400 outline-none text-sm resize-none"
          />

          <div className="flex items-center justify-between mt-2 mb-4">
            <span className={`text-xs font-bold ${met ? 'text-green-600' : 'text-slate-400'}`}>
              {wordCount} words {met ? '✓' : `(need ${prompt?.min_words})`}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleWritingNext}
              disabled={!met}
              className={`flex-1 py-3 rounded-xl font-black text-white transition-colors ${met ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-200 cursor-not-allowed text-slate-400'}`}
            >
              {writingLevel < PLACEMENT_DATA.writing.length ? 'Next Level →' : 'Finish'}
            </button>
            <button
              onClick={handleWritingSkip}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-500 font-semibold hover:border-slate-300 transition-colors text-sm"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result' && result) {
    const cefrColors = {
      'Pre-A1': 'blue',
      'A1': 'emerald',
      'A1+': 'violet',
      'A2': 'amber',
    };
    const color = cefrColors[result.cefr_level] || 'indigo';

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
          <Star className={`w-16 h-16 text-${color}-500 mx-auto mb-4`} />
          <h2 className="text-3xl font-black text-slate-800 mb-1">Your Level</h2>
          <p className={`text-5xl font-black text-${color}-600 mb-2`}>{result.cefr_level}</p>
          <p className="text-slate-500 mb-6">
            We recommend starting at <strong>Week {result.startWeek}</strong> in <strong>{result.mode} mode</strong>.
          </p>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(scores).map(([mod, score]) => {
              const meta = MODULE_META[mod];
              const Icon = meta?.icon || Brain;
              return (
                <div key={mod} className="bg-slate-50 rounded-2xl p-3 text-left">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">{meta?.label || mod}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${i < score ? `bg-${meta?.color || 'indigo'}-500` : 'bg-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleGoToStart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl text-lg transition-colors"
          >
            Go to Week {result.startWeek} →
          </button>
        </div>
      </div>
    );
  }

  return null;
}
