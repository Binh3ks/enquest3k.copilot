/**
 * Word Duel — Definition → Word rapid-fire drill
 *
 * Skill tested: RETRIEVAL fluency (definition → word)
 * Distinct from vocab station which tests RECOGNITION (word → definition)
 *
 * Data source: vocab.js — loaded dynamically per weekNumber/learningMode
 * No dependency on games.js
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { speakText } from '../../../utils/AudioHelper';

// Vite static glob — bundles ALL vocab.js files at build time
const advVocab = import.meta.glob('../../../data/weeks/*/vocab.js');
const easyVocab = import.meta.glob('../../../data/weeks_easy/*/vocab.js');

// ─── Helpers ────────────────────────────────────────────────────────────────

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (__, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

function isClose(input, target) {
  const a = input.toLowerCase().trim();
  const b = target.toLowerCase().trim();
  if (a === b) return true;
  if (levenshtein(a, b) <= 1) return true;
  // Multi-word target: accept if student typed just the key word
  const parts = b.split(/\s+/);
  if (parts.length > 1 && parts.some(p => p.length >= 3 && levenshtein(a, p) <= 1)) return true;
  return false;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TIMER_SECONDS = 15;
const QUESTIONS_PER_GAME = 10;

// ─── Component ───────────────────────────────────────────────────────────────

export default function WordDuelGame({ weekNumber = 1, learningMode = 'advanced', onGameComplete }) {
  const [vocabItems, setVocabItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong' | 'timeout'
  const [revealWord, setRevealWord] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'result'
  const [results, setResults] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const completionFiredRef = useRef(false);

  // ── Load vocab dynamically ─────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);
    completionFiredRef.current = false;
    const pad = String(weekNumber).padStart(2, '0');
    const isEasy = learningMode === 'easy';
    const modules = isEasy ? easyVocab : advVocab;
    const folder = isEasy ? 'weeks_easy' : 'weeks';
    const key = `../../../data/${folder}/week_${pad}/vocab.js`;
    const loader = modules[key] ?? (() => Promise.reject(new Error('not found')));
    const parseItems = (m) => {
      const raw = m.default?.vocab || m.vocab || m.default;
      const list = Array.isArray(raw) ? raw : [];
      return list
        .filter(v => v && v.word && (v.definition_en || v.meaning_vi || v.definition_vi))
        .map(v => ({
          ...v,
          definition_en: v.definition_en || v.meaning_vi || v.definition_vi
        }));
    };

    loader()
      .then(m => {
        let items = parseItems(m);
        if (!items.length && isEasy) {
          const fallback = advVocab[`../../../data/weeks/week_${pad}/vocab.js`];
          if (fallback) {
            return fallback().then(fm => parseItems(fm));
          }
        }
        return items;
      })
      .then(items => {
        if (!items || !items.length) {
          setError('No vocabulary found for this week.');
          setLoading(false);
          return;
        }
        setVocabItems(items);
        setQueue(shuffle(items).slice(0, Math.min(QUESTIONS_PER_GAME, items.length)));
        setLoading(false);
      })
      .catch(() => {
        // Fallback: try advanced mode data if easy doesn't exist
        const fallback = advVocab[`../../../data/weeks/week_${pad}/vocab.js`];
        if (fallback) {
          fallback().then(m => {
            const items = parseItems(m);
            if (!items.length) {
              setError('Could not load vocabulary for this week.');
              setLoading(false);
              return;
            }
            setVocabItems(items);
            setQueue(shuffle(items).slice(0, Math.min(QUESTIONS_PER_GAME, items.length)));
            setLoading(false);
          }).catch(() => { setError('Could not load vocabulary for this week.'); setLoading(false); });
          return;
        }
        setError('Could not load vocabulary for this week.');
        setLoading(false);
      });
  }, [weekNumber, learningMode]);

  // ── Speech recognition setup ───────────────────────────────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous = false;
    r.lang = 'en-US';
    r.onresult = e => {
      setInput(e.results[0][0].transcript.trim());
      setIsListening(false);
    };
    r.onerror = () => setIsListening(false);
    r.onend = () => setIsListening(false);
    recognitionRef.current = r;
    return () => { try { r.stop(); } catch (_) {} };
  }, []);

  // ── Auto-submit after speech ───────────────────────────────────────────────
  const inputRef2 = useRef('');
  useEffect(() => { inputRef2.current = input; }, [input]);

  useEffect(() => {
    if (isListening || !input || feedback !== null) return;
    const t = setTimeout(() => {
      if (inputRef2.current) submitAnswer(inputRef2.current);
    }, 350);
    return () => clearTimeout(t);
  }, [isListening]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reset per question ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!loading) {
      setImageError(false);
      if (inputRef.current && feedback === null) inputRef.current.focus();
    }
  }, [currentIdx, loading]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (loading || phase !== 'playing' || feedback !== null) return;
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIdx, loading, phase, feedback]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Callbacks ─────────────────────────────────────────────────────────────

  const advance = useCallback(() => {
    clearInterval(timerRef.current);
    setFeedback(null);
    setInput('');
    setRevealWord(false);
    setCurrentIdx(i => {
      if (i + 1 >= queue.length) {
        setPhase('result');
        return i;
      }
      return i + 1;
    });
  }, [queue.length]);

  const handleTimeout = useCallback(() => {
    clearInterval(timerRef.current);
    setFeedback('timeout');
    setStreak(0);
    setRevealWord(true);
    setResults(r => [...r, { correct: false, timeout: true, word: queue[currentIdx]?.word }]);
    setTimeout(() => advance(), 2200);
  }, [currentIdx, queue, advance]);

  const submitAnswer = useCallback((value) => {
    const current = queue[currentIdx];
    if (!value?.trim() || !current) return;
    clearInterval(timerRef.current);

    if (isClose(value, current.word)) {
      const timeBonus = timeLeft >= 10 ? 5 : timeLeft >= 5 ? 3 : 0;
      const newStreak = streak + 1;
      const streakBonus = newStreak >= 3 ? 2 : 0;
      const pts = 10 + timeBonus + streakBonus;
      setScore(s => s + pts);
      setStreak(newStreak);
      setFeedback('correct');
      setRevealWord(true);
      setResults(r => [...r, { correct: true, word: current.word, pts }]);
      setTimeout(() => advance(), 1600);
    } else {
      setStreak(0);
      setFeedback('wrong');
      setResults(r => [...r, { correct: false, word: current.word }]);
      setTimeout(() => {
        setRevealWord(true);
        setTimeout(() => advance(), 1500);
      }, 800);
    }
  }, [currentIdx, queue, timeLeft, streak, advance]);

  const handleSubmit = useCallback(e => {
    e?.preventDefault();
    if (feedback !== null) return;
    submitAnswer(input);
  }, [input, feedback, submitAnswer]);

  // ── Emit completion ────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'result' && !completionFiredRef.current) {
      completionFiredRef.current = true;
      onGameComplete?.({ gameId: 'word_duel', score, results });
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Audio ──────────────────────────────────────────────────────────────────
  const playDefinition = () => {
    const current = queue[currentIdx];
    if (!current) return;
    speakText(current.definition_en, null, 1.0, null, 'vocabulary', weekNumber, learningMode);
  };

  const handleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); return; }
    setIsListening(true);
    try { recognitionRef.current.start(); } catch (_) { setIsListening(false); }
  };

  const handlePlayAgain = () => {
    completionFiredRef.current = false;
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setResults([]);
    setQueue(shuffle(vocabItems).slice(0, Math.min(QUESTIONS_PER_GAME, vocabItems.length)));
    setPhase('playing');
    setFeedback(null);
    setInput('');
    setRevealWord(false);
  };

  // ─── Render: loading / error ───────────────────────────────────────────────

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="text-4xl mb-3 animate-bounce">⚔️</div>
        <p>Loading vocabulary…</p>
      </div>
    );
  }

  if (error || !queue.length) {
    return (
      <div className="text-center py-20 text-red-400">
        <div className="text-4xl mb-3">😕</div>
        <p>{error || 'No vocabulary available.'}</p>
      </div>
    );
  }

  // ─── Render: result screen ─────────────────────────────────────────────────

  if (phase === 'result') {
    const correct = results.filter(r => r.correct).length;
    const pct = Math.round((correct / results.length) * 100);
    return (
      <div className="word-duel max-w-xl mx-auto p-6 text-center">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-8 mb-6 shadow-xl">
          <div className="text-6xl mb-3">🏆</div>
          <h2 className="text-3xl font-bold mb-1">Word Duel Complete!</h2>
          <div className="text-6xl font-bold my-4">{score}</div>
          <div className="text-yellow-100 text-lg">points</div>
          <div className="text-yellow-100 mt-2">{correct}/{results.length} correct · {pct}%</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {results.map((r, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 text-sm font-medium flex items-center gap-2 ${
                r.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
              }`}
            >
              <span>{r.correct ? '✅' : r.timeout ? '⏱' : '❌'}</span>
              <span className="flex-1 text-left">{r.word}</span>
              {r.pts && <span className="text-xs text-green-700">+{r.pts}</span>}
            </div>
          ))}
        </div>

        <button
          onClick={handlePlayAgain}
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-lg"
        >
          Play Again 🔄
        </button>
      </div>
    );
  }

  // ─── Render: playing screen ────────────────────────────────────────────────

  const currentItem = queue[currentIdx];
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor =
    timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="word-duel max-w-xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-5 mb-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold">⚔️ Word Duel</h2>
            <p className="text-orange-100 text-sm">Definition → Word</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-xs text-orange-200">pts{streak >= 3 ? ` · 🔥 ×${streak}` : ''}</div>
          </div>
        </div>

        {/* Timer bar */}
        <div className="bg-white/20 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 text-orange-100">
          <span>Question {currentIdx + 1} / {queue.length}</span>
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-4 text-center min-h-[200px] flex flex-col items-center justify-center">
        {/* Revealed word + image */}
        {revealWord && (
          <>
            {currentItem?.image_url && !imageError && (
              <img
                src={currentItem.image_url}
                alt={currentItem.word}
                className="w-24 h-24 object-cover rounded-xl mb-4 shadow"
                onError={() => setImageError(true)}
              />
            )}
            <div className="text-4xl font-bold text-green-600 mb-1">{currentItem?.word}</div>
            {currentItem?.collocation && (
              <div className="text-sm text-gray-400 italic">e.g. {currentItem.collocation}</div>
            )}
          </>
        )}

        {/* Definition (always visible until revealed) */}
        {!revealWord && (
          <p className="text-xl text-gray-700 font-medium leading-relaxed max-w-sm">
            {currentItem?.definition_en}
          </p>
        )}

        {/* Feedback badge */}
        {feedback === 'correct' && (
          <div className="mt-4 text-2xl font-bold text-green-600 animate-bounce">✅ Correct!</div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-4 text-xl font-bold text-red-500">❌ Not quite…</div>
        )}
        {feedback === 'timeout' && (
          <div className="mt-4 text-xl font-bold text-orange-500">⏱ Time's up!</div>
        )}
      </div>

      {/* Input row */}
      {feedback === null && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <button
            type="button"
            onClick={playDefinition}
            className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl flex-shrink-0"
            title="Hear the definition"
          >
            🔊
          </button>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type the word…"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none text-lg"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={handleMic}
            className={`p-3 rounded-xl flex-shrink-0 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title={isListening ? 'Stop' : 'Speak'}
          >
            🎙️
          </button>
          <button
            type="submit"
            className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl flex-shrink-0"
          >
            →
          </button>
        </form>
      )}
    </div>
  );
}
