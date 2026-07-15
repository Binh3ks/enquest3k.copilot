/**
 * Sentence Blitz — Grammar-aligned oral production drill
 *
 * Skill tested: ORAL PRODUCTION of complete sentences using the week's grammar pattern.
 * Distinct from grammar station (written, click/type) — this forces SPEAKING full sentences.
 *
 * Round flow:
 *   Phase 1 CHIP (12s timer, 3 lives): Tap the correct word from 4 options.
 *   Phase 2 SPEAK (bonus, no timer): Say the assembled sentence aloud → +5 pts.
 *
 * Speech: Web Speech API (FREE, same as Shadowing). maxAlternatives=3 for accent robustness.
 * Data: grammar.js fill-type exercises — loaded dynamically via import.meta.glob
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { speakText } from '../../../utils/AudioHelper';

// ── Vite static globs (bundled at build time) ─────────────────────────────────
const advGrammar  = import.meta.glob('../../../data/weeks/*/grammar.js');
const easyGrammar = import.meta.glob('../../../data/weeks_easy/*/grammar.js');

// ── Constants ─────────────────────────────────────────────────────────────────
const ROUNDS       = 8;
const CHIP_SECONDS = 12;
const MAX_LIVES    = 3;

// ── Helpers ───────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildFull(question, answer) {
  return question
    .replace(/_{3,}\s*\([^)]+\)/g, answer)
    .replace(/_{3,}/g, answer);
}

function passesSpeak(transcript, fullSentence, answer) {
  if (!transcript) return false;
  const t = transcript.toLowerCase().replace(/[^a-z'\s]/g, '');
  const a = answer.toLowerCase().replace(/[^a-z]/g, '');
  if (!t.includes(a)) return false;
  const words = fullSentence.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length >= 2);
  const hits  = words.filter(w => t.includes(w)).length;
  return words.length > 0 && hits / words.length >= 0.55;
}

function isValidChipAnswer(answer) {
  // Accept only single-word string answers (no arrays, no multi-word sentences)
  if (typeof answer !== 'string') return false;
  const trimmed = answer.trim();
  if (!trimmed) return false;
  // Single word: letters only, possibly with hyphen (e.g., "well-known")
  return /^[a-zA-Z\-]+$/.test(trimmed);
}

// Hardcoded fallback pool for weeks with all-identical fill answers (e.g., "but")
const FALLBACK_POOL = [
  'but', 'and', 'or', 'so', 'because', 'if', 'when', 'while',
  'although', 'however', 'therefore', 'then', 'also', 'but',
];

function buildDistractorPool(data) {
  const fillTypes = ['fill', 'fill_in_blank', 'fill_in', 'fill_blank'];
  // Primary: single-word fill answers
  const fillAnswers = (data.exercises || [])
    .filter(e => fillTypes.includes(e.type))
    .map(e => e.answer)
    .filter(isValidChipAnswer);
  // Secondary: options from multiple-choice exercises
  const mcOptions = (data.exercises || [])
    .filter(e => e.type === 'multiple_choice')
    .flatMap(e => {
      if (Array.isArray(e.options)) return e.options;
      if (Array.isArray(e.choices)) return e.choices;
      if (Array.isArray(e.answers)) return e.answers;
      return [];
    })
    .filter(isValidChipAnswer);
  const pool = [...new Set([...fillAnswers, ...mcOptions])];
  // If pool is too small, pad with fallback
  if (pool.length < 4) {
    const extra = FALLBACK_POOL.filter(w => !pool.map(p => p.toLowerCase()).includes(w.toLowerCase()));
    pool.push(...extra.slice(0, 4 - pool.length));
  }
  return pool;
}

function prepareQuestions(data) {
  const fillTypes = ['fill', 'fill_in_blank', 'fill_in', 'fill_blank'];

  // Only use fill-type exercises with valid single-word answers
  const fills = (data.exercises || [])
    .filter(e => fillTypes.includes(e.type) &&
                  (e.question || e.question_en || e.sentence) &&
                  isValidChipAnswer(e.answer))
    .map(e => ({ ...e, question: e.question || e.question_en || e.sentence }));

  const pool = buildDistractorPool(data);

  let questions = fills;

  if (!questions.length) {
    // Fallback: multiple choice with single-word answers
    questions = (data.exercises || [])
      .filter(e => e.type === 'multiple_choice' &&
                    (e.question || e.question_en || e.sentence) &&
                    isValidChipAnswer(e.answer))
      .map(e => ({ ...e, question: e.question || e.question_en || e.sentence }));
  }

  if (!questions.length) return [];
  return shuffle(questions).slice(0, ROUNDS).map(ex => {
    const answerStr = Array.isArray(ex.answer) ? ex.answer[0] : ex.answer;
    const full      = buildFull(ex.question, answerStr);
    const validDistractors = pool.filter(a => a.toLowerCase() !== answerStr.toLowerCase());
    const distractors = shuffle(validDistractors).slice(0, 3);
    // Safety: ensure at least 3 distractors (pad from fallback if needed)
    let allChips = [answerStr, ...distractors];
    if (allChips.length < 4) {
      const extra = FALLBACK_POOL.filter(w =>
        !allChips.map(c => c.toLowerCase()).includes(w.toLowerCase())
      );
      allChips = shuffle([...allChips, ...extra.slice(0, 4 - allChips.length)]);
    }
    const chips = shuffle(allChips);
    return { question: ex.question, answer: answerStr, full, chips, hint: ex.hint || '' };
  });
}

// ─── Component ───────────────────────────────────────────────────────────────
// Name kept as SentenceBlitzGame internally; exported as default for GameHub routing.

export default function SentenceBlitzGame({ weekNumber = 1, learningMode = 'advanced', onGameComplete }) {
  // ── State ────────────────────────────────────────────────────────────────
  const [qs, setQs]                   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [idx, setIdx]                 = useState(0);
  const [lives, setLives]             = useState(MAX_LIVES);
  const [score, setScore]             = useState(0);
  const [streak, setStreak]           = useState(0);
  const [timeLeft, setTimeLeft]       = useState(CHIP_SECONDS);
  const [chipPicked, setChipPicked]   = useState(null);   // index of tapped chip
  const [chipResult, setChipResult]   = useState(null);   // 'correct'|'wrong'|null
  const [speakPhase, setSpeakPhase]   = useState(false);  // after correct chip: show speak step
  const [speakResult, setSpeakResult] = useState(null);   // 'correct'|'wrong'|'skip'|null
  const [isListening, setIsListening] = useState(false);
  const [textFallback, setTextFallback] = useState('');
  const [results, setResults]         = useState([]);
  const [gamePhase, setGamePhase]     = useState('playing'); // 'playing'|'result'

  const timerRef            = useRef(null);
  const recognitionRef      = useRef(null);
  const completionFiredRef  = useRef(false);
  const inputRef            = useRef(null);
  const latestText          = useRef('');

  // ── Load grammar.js ───────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);
    completionFiredRef.current = false;
    const pad    = String(weekNumber).padStart(2, '0');
    const isEasy = learningMode === 'easy';
    const folder = isEasy ? 'weeks_easy' : 'weeks';
    const mods   = isEasy ? easyGrammar : advGrammar;
    const key    = `../../../data/${folder}/week_${pad}/grammar.js`;
    const loader = mods[key] ?? advGrammar[`../../../data/weeks/week_${pad}/grammar.js`] ?? null;
    if (!loader) { setError('No grammar data for this week.'); setLoading(false); return; }
    loader().then(m => {
      const prepared = prepareQuestions(m.default || m);
      if (!prepared.length) { setError('Not enough exercises for this week.'); setLoading(false); return; }
      setQs(prepared);
      setLoading(false);
    }).catch(() => { setError('Could not load grammar for this week.'); setLoading(false); });
  }, [weekNumber, learningMode]);

  // ── Speech recognition setup ──────────────────────────────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous       = false;
    r.interimResults   = false;
    r.maxAlternatives  = 3;
    r.lang             = 'en-US';
    r.onresult = e => {
      const alts = Array.from(e.results[0]).map(a => a.transcript.trim());
      const q    = qs[idx];
      // Pick first alternative that passes; fallback to first
      const best = alts.find(t => q && passesSpeak(t, q.full, q.answer)) || alts[0] || '';
      setIsListening(false);
      handleSpeakResult(best, q);
    };
    r.onerror = () => setIsListening(false);
    r.onend   = () => setIsListening(false);
    recognitionRef.current = r;
    return () => { try { r.stop(); } catch (_) {} };
  }, [qs, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Chip-phase timer ──────────────────────────────────────────────────────
  useEffect(() => {
    if (loading || gamePhase !== 'playing' || speakPhase || chipResult !== null) return;
    setTimeLeft(CHIP_SECONDS);
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
  }, [idx, loading, gamePhase, speakPhase, chipResult]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Focus text input in speak phase ───────────────────────────────────────
  useEffect(() => {
    if (speakPhase && inputRef.current) inputRef.current.focus();
    latestText.current = '';
    setTextFallback('');
  }, [speakPhase]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const handleTimeout = useCallback(() => {
    clearInterval(timerRef.current);
    setChipResult('wrong');
    setLives(l => l - 1);
    setStreak(0);
    const q = qs[idx];
    setResults(r => [...r, { correct: false, timeout: true, question: q?.question, full: q?.full }]);
    setTimeout(() => advance(false), 2000);
  }, [qs, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChipTap = useCallback((chipIdx) => {
    clearInterval(timerRef.current);
    const q = qs[idx];
    if (!q || chipResult !== null) return;
    setChipPicked(chipIdx);
    const chosen  = q.chips[chipIdx];
    const correct = chosen.toLowerCase().trim() === q.answer.toLowerCase().trim();
    setChipResult(correct ? 'correct' : 'wrong');
    if (correct) {
      const timeBonus = timeLeft >= 9 ? 5 : timeLeft >= 5 ? 2 : 0;
      const pts = 10 + timeBonus;
      setScore(s => s + pts);
      // Proceed to speak phase after brief pause
      setTimeout(() => setSpeakPhase(true), 700);
    } else {
      setStreak(0);
      setLives(l => l - 1);
      setResults(r => [...r, { correct: false, question: q.question, full: q.full, answer: q.answer }]);
      setTimeout(() => advance(false), 2000);
    }
  }, [qs, idx, chipResult, timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSpeakResult = useCallback((transcript, q) => {
    if (!q) return;
    const passed = passesSpeak(transcript, q.full, q.answer);
    setSpeakResult(passed ? 'correct' : 'wrong');
    if (passed) {
      const streakBonus = streak + 1 >= 3 ? 2 : 0;
      setScore(s => s + 5 + streakBonus);
      setStreak(n => n + 1);
      setResults(r => [...r, { correct: true, spokePts: 5 + streakBonus, question: q.question, full: q.full }]);
    } else {
      setResults(r => [...r, { correct: true, spokePts: 0, question: q.question, full: q.full }]);
    }
    setTimeout(() => advance(true), 1800);
  }, [streak]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSkipSpeak = useCallback(() => {
    const q = qs[idx];
    setSpeakResult('skip');
    setResults(r => [...r, { correct: true, spokePts: 0, question: q?.question, full: q?.full }]);
    setTimeout(() => advance(true), 800);
  }, [qs, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = useCallback((fromSpeak) => {
    clearInterval(timerRef.current);
    setSpeakPhase(false);
    setSpeakResult(null);
    setChipPicked(null);
    setChipResult(null);
    setIsListening(false);
    setIdx(i => {
      const next = i + 1;
      if (next >= qs.length) { setGamePhase('result'); return i; }
      return next;
    });
  }, [qs.length]);

  // Auto game-over when lives = 0
  useEffect(() => {
    if (lives <= 0 && gamePhase === 'playing') {
      clearInterval(timerRef.current);
      setTimeout(() => setGamePhase('result'), 500);
    }
  }, [lives, gamePhase]);

  // Emit on complete
  useEffect(() => {
    if (gamePhase === 'result' && !completionFiredRef.current) {
      completionFiredRef.current = true;
      onGameComplete?.({ gameId: 'story_remix', score, results });
    }
  }, [gamePhase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mic ───────────────────────────────────────────────────────────────────
  const handleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); return; }
    setIsListening(true);
    try { recognitionRef.current.start(); } catch (_) { setIsListening(false); }
  };

  // ── Text fallback submit ───────────────────────────────────────────────────
  const handleTextSubmit = e => {
    e?.preventDefault();
    const q = qs[idx];
    handleSpeakResult(textFallback, q);
  };

  // ── Play Again ────────────────────────────────────────────────────────────
  const handlePlayAgain = () => {
    completionFiredRef.current = false;
    setIdx(0); setLives(MAX_LIVES); setScore(0); setStreak(0);
    setResults([]); setChipPicked(null); setChipResult(null);
    setSpeakPhase(false); setSpeakResult(null); setGamePhase('playing');
    setQs(prev => shuffle([...prev]));
  };

  // ── Play full sentence aloud ──────────────────────────────────────────────
  const playFull = () => {
    const q = qs[idx];
    if (q) speakText(q.full, null, 0.85, null, 'grammar', weekNumber, learningMode);
  };

  // ─── Loading / Error ──────────────────────────────────────────────────────
  if (loading) return (
    <div className="text-center py-20 text-gray-500">
      <div className="text-4xl mb-3 animate-bounce">⚡</div>
      <p>Loading grammar exercises…</p>
    </div>
  );
  if (error || !qs.length) return (
    <div className="text-center py-20 text-red-400">
      <div className="text-4xl mb-3">😕</div>
      <p>{error || 'No exercises available.'}</p>
    </div>
  );

  // ─── Result screen ────────────────────────────────────────────────────────
  if (gamePhase === 'result') {
    const chipCorrect = results.filter(r => r.correct).length;
    const spokeBonus  = results.reduce((s, r) => s + (r.spokePts || 0), 0);
    return (
      <div className="sentence-blitz max-w-xl mx-auto p-6 text-center">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-8 mb-6 shadow-xl">
          <div className="text-6xl mb-3">🏅</div>
          <h2 className="text-3xl font-bold mb-1">Sentence Blitz!</h2>
          <div className="text-6xl font-bold my-4">{score}</div>
          <div className="text-purple-200">
            {chipCorrect}/{results.length} sentences · +{spokeBonus} speaking bonus
          </div>
        </div>
        <div className="space-y-2 mb-6 text-left">
          {results.map((r, i) => (
            <div key={i} className={`rounded-xl p-3 text-sm ${r.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
              <div className="flex items-center gap-2">
                <span>{r.correct ? '✅' : r.timeout ? '⏱' : '❌'}</span>
                <span className="flex-1 italic">{r.full || r.question}</span>
                {(r.spokePts > 0) && <span className="text-xs text-indigo-600 font-bold">🎤+{r.spokePts}</span>}
              </div>
            </div>
          ))}
        </div>
        <button onClick={handlePlayAgain} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-lg">
          Play Again 🔄
        </button>
      </div>
    );
  }

  // ─── Playing screen ───────────────────────────────────────────────────────
  const q          = qs[idx];
  const timerPct   = (timeLeft / CHIP_SECONDS) * 100;
  const timerColor = timeLeft <= 4 ? 'bg-red-500' : timeLeft <= 8 ? 'bg-yellow-500' : 'bg-green-500';

  // Render question text with inline blank where underscores were
  const renderQuestionWithBlank = (text) => {
    if (!text) return null;
    const parts = text.split(/_{3,}(\s*\([^)]+\))?/);
    if (parts.length === 1) return text;
    const before = parts[0] ? parts[0].trimEnd() : '';
    const after  = parts[parts.length - 1] ? parts[parts.length - 1].trimStart().replace(/\.$/, '') : '';
    return (
      <>
        {before ? <span>{before}{' '}</span> : null}
        <span className={`inline-block px-4 py-1 rounded-lg font-bold mx-1 border-2 ${
          chipResult === 'correct' ? 'bg-green-200 text-green-800 border-green-400'
          : chipResult === 'wrong'   ? 'bg-red-200 text-red-700 border-red-400'
          : 'bg-yellow-100 text-yellow-600 border-yellow-400'
        }`}>
          {chipResult === 'correct' ? q?.answer
            : chipResult === 'wrong'   ? `✗ ${q?.answer}`
            : '___'}
        </span>
        {after ? <span>{' '}{after}</span> : null}
      </>
    );
  };

  return (
    <div className="sentence-blitz max-w-xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-5 mb-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold">⚡ Sentence Blitz</h2>
            <p className="text-purple-200 text-sm">{speakPhase ? '🎤 Now say it!' : 'Tap the right word'}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-xs text-purple-200">
              {'❤️'.repeat(lives)}{'🖤'.repeat(MAX_LIVES - lives)}
              {streak >= 3 ? ` 🔥×${streak}` : ''}
            </div>
          </div>
        </div>
        {/* Timer bar — only in chip phase */}
        {!speakPhase && (
          <>
            <div className="bg-white/20 rounded-full h-2.5 overflow-hidden">
              <div className={`h-2.5 rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
            </div>
            <div className="flex justify-between text-xs mt-1 text-purple-200">
              <span>{idx + 1}/{qs.length}</span>
              <span>{timeLeft}s</span>
            </div>
          </>
        )}
        {speakPhase && (
          <div className="text-xs text-purple-200 mt-1">{idx + 1}/{qs.length} · Bonus round 🎙️</div>
        )}
      </div>

      {/* ── CHIP PHASE ──────────────────────────────────────────────── */}
      {!speakPhase && (
        <>
          {/* Question frame */}
          <div className="bg-white rounded-2xl shadow-lg p-7 mb-4 min-h-[100px] flex items-center justify-center text-center">
            <p className="text-xl text-gray-800 font-medium leading-relaxed">
              {renderQuestionWithBlank(q?.question)}
            </p>
            {q?.hint && chipResult === null && (
              <p className="text-xs text-gray-400 mt-2 italic">{q.hint}</p>
            )}
            {chipResult === 'wrong' && (
              <p className="text-sm text-red-500 font-bold mt-2">❌ Wrong! −1 life</p>
            )}
          </div>

          {/* Chips */}
          <div className="grid grid-cols-2 gap-3">
            {q?.chips.map((chip, ci) => (
              <button
                key={ci}
                onClick={() => chipResult === null && handleChipTap(ci)}
                disabled={chipResult !== null}
                className={`py-4 px-4 rounded-xl text-lg font-bold transition-all border-2 ${
                  chipPicked === ci && chipResult === 'correct' ? 'bg-green-500 text-white border-green-600 scale-105'
                  : chipPicked === ci && chipResult === 'wrong' ? 'bg-red-500 text-white border-red-600'
                  : chipResult !== null && chip.toLowerCase() === q?.answer.toLowerCase() ? 'bg-green-200 text-green-800 border-green-400'
                  : chipResult !== null ? 'bg-gray-100 text-gray-400 border-gray-200'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-purple-400 hover:bg-purple-50 active:scale-95'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── SPEAK PHASE ─────────────────────────────────────────────── */}
      {speakPhase && (
        <>
          {/* Full sentence card */}
          <div className="bg-white rounded-2xl shadow-lg p-7 mb-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Now say this sentence:</p>
            <p className="text-2xl font-bold text-indigo-700 leading-relaxed mb-4">{q?.full}</p>
            {speakResult === 'correct' && <p className="text-xl font-bold text-green-600 animate-bounce">🎤 ✅ +5 pts!</p>}
            {speakResult === 'wrong'   && <p className="text-xl font-bold text-orange-500">Almost! Keep practising.</p>}
            {speakResult === 'skip'    && <p className="text-sm text-gray-400">Skipped — no bonus this time.</p>}
          </div>

          {/* Speak controls */}
          {speakResult === null && (
            <>
              <button
                onClick={handleMic}
                className={`w-full py-5 rounded-2xl text-xl font-bold mb-3 transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isListening ? '🔴 Listening…' : '🎙️ Tap to Speak'}
              </button>

              {/* Listen to model first */}
              <button onClick={playFull} className="w-full py-2 mb-2 text-sm text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-colors">
                🔊 Hear it first
              </button>

              {/* Text fallback */}
              <form onSubmit={handleTextSubmit} className="flex gap-2 mb-2">
                <input
                  ref={inputRef}
                  value={textFallback}
                  onChange={e => { setTextFallback(e.target.value); latestText.current = e.target.value; }}
                  placeholder="Or type the full sentence…"
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none"
                  autoComplete="off" autoCorrect="off" spellCheck={false}
                />
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-bold">→</button>
              </form>

              <button onClick={handleSkipSpeak} className="w-full py-2 text-xs text-gray-400 hover:text-gray-600">
                Skip speaking (no bonus)
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

