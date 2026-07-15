"""Writes the new HotSeatGame.jsx content."""
import os

DEST = os.path.join(os.path.dirname(__file__), 'src/pages/GameHub/games/HotSeatGame.jsx')

content = r'''/**
 * Hot Seat — Question Formation Game (v2)
 *
 * Two-phase mechanic per card:
 *   Phase 1 (CHIP): Tap the correct WH-word from 4 shuffled chips
 *   Phase 2 (SPEAK): Say/type the full question aloud
 *
 * Scaffold by weekNumber:
 *   W1–W28:  full chips   "What" | "Who" | "Does" | "Is"
 *   W29–W51: truncated    "Wh…"  | "Wh…" | "Do…"  | "Is…"
 *   W52+:    no chips     — answer clue only → speak directly
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { speakText } from '../../../utils/AudioHelper';

// Vite static glob — must be at file top level
const advRead  = import.meta.glob('../../../data/weeks/*/read.js');
const easyRead = import.meta.glob('../../../data/weeks_easy/*/read.js');

// ─── Constants ───────────────────────────────────────────────────────────────

const QS_PER_GAME = 3;
const TIMER_SECS  = 15;
const MAX_LIVES   = 3;

// Full WH/aux word pool — order matters for distractor selection
const WH_POOL = [
  'What', 'Where', 'Who', 'When', 'Why', 'How',
  'Does', 'Do', 'Did',
  'Is', 'Are', 'Was', 'Were',
  'Can', 'Has', 'Have',
];
const WH_LOWER = WH_POOL.map(w => w.toLowerCase());

const KEYWORD_STOPWORDS = new Set([
  'a','an','the','is','am','are','was','were','be','been',
  'have','has','had','do','does','did','will','would','shall',
  'should','may','might','must','can','could','i','you','he',
  'she','it','we','they','my','your','his','her','our','their',
  'this','that','and','but','or','so','for','in','on','at',
  'to','of','by','with','from','up','about','into','not','no',
  'what','who','where','when','why','how','which',
]);

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function tokenize(t) {
  return t.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);
}

function extractKeywords(text) {
  return tokenize(text).filter(t => t.length >= 3 && !KEYWORD_STOPWORDS.has(t));
}

function softMatch(a, b) {
  if (a === b) return true;
  const [sh, lg] = a.length <= b.length ? [a, b] : [b, a];
  if (lg.startsWith(sh) && sh.length >= 4) return true;
  if (sh.startsWith(lg.slice(0, -1)) && lg.length >= 4) return true;
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

/** First word of the question if it is in WH_POOL, else null */
function getCorrectWH(questionText) {
  if (!questionText) return null;
  const first = questionText.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, '');
  const i = WH_LOWER.indexOf(first.toLowerCase());
  return i >= 0 ? WH_POOL[i] : null;
}

/**
 * Build 4 shuffled chips: 1 correct + 3 pedagogically varied distractors.
 * Tries to include one from each category: WH-words / Do-aux / Be-aux / Other.
 */
function buildChips(correctWH) {
  if (!correctWH) return [];
  const groups = [
    ['What','Where','Who','When','Why','How'],
    ['Does','Do','Did'],
    ['Is','Are','Was','Were'],
    ['Can','Has','Have'],
  ];
  const pool = [];
  for (const g of shuffle(groups)) {
    if (pool.length >= 3) break;
    const candidates = g.filter(w => w !== correctWH && !pool.includes(w));
    if (candidates.length) pool.push(candidates[Math.floor(Math.random() * candidates.length)]);
  }
  const used = new Set([correctWH, ...pool]);
  for (const w of shuffle(WH_POOL.filter(w => w !== correctWH))) {
    if (pool.length >= 3) break;
    if (!used.has(w)) { pool.push(w); used.add(w); }
  }
  return shuffle([correctWH, ...pool.slice(0, 3)]);
}

/** Truncate chip label for W29-W51 scaffold level */
function truncateChip(word) {
  return word.slice(0, 2) + '\u2026';
}

const YES_NO = new Set(['yes','no','yeah','nope','sure','right','correct','true','false']);

function pickBestAnswer(answers) {
  const arr = Array.isArray(answers) ? answers : [String(answers)];
  return [...arr].sort((a, b) => {
    const av = YES_NO.has(a.toLowerCase().trim());
    const bv = YES_NO.has(b.toLowerCase().trim());
    if (av && !bv) return 1;
    if (!av && bv) return -1;
    return b.length - a.length;
  })[0];
}

function isVague(ans) {
  const a = ans.toLowerCase().trim();
  return YES_NO.has(a) || a.length <= 2;
}

/** Validate spoken/typed question against target question */
function validateQuestion(input, correctQ) {
  const words = tokenize(input);
  if (!words.length) return 'missing_keyword';
  if (!words.some(w => WH_LOWER.includes(w))) return 'no_question_word';
  const keywords = extractKeywords(correctQ);
  if (!keywords.length) return 'correct';
  const needed  = Math.max(1, Math.ceil(keywords.length * 0.4));
  const matched = keywords.filter(kw => words.some(w => softMatch(w, kw))).length;
  return matched >= needed ? 'correct' : 'missing_keyword';
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HotSeatGame({ weekNumber = 1, learningMode = 'advanced', onGameComplete }) {

  // ── State ─────────────────────────────────────────────────────────────────
  const [cards, setCards]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [storyTitle, setStoryTitle] = useState('');
  const [idx, setIdx]               = useState(0);
  const [lives, setLives]           = useState(MAX_LIVES);
  const [score, setScore]           = useState(0);
  const [streak, setStreak]         = useState(0);
  const [timeLeft, setTimeLeft]     = useState(TIMER_SECS);
  const [results, setResults]       = useState([]);
  const [gamePhase, setGamePhase]   = useState('playing'); // 'playing' | 'result'

  // Per-card two-phase state
  const [cardPhase, setCardPhase]       = useState('chip');   // 'chip' | 'speak'
  const [chipResult, setChipResult]     = useState(null);     // null | 'correct' | 'wrong'
  const [chipSelected, setChipSelected] = useState(null);

  // Speak phase state
  const [input, setInput]             = useState('');
  const [attempts, setAttempts]       = useState(0);
  const [feedback, setFeedback]       = useState(null);
  const [revealed, setRevealed]       = useState(false);
  const [isListening, setIsListening] = useState(false);

  const timerRef           = useRef(null);
  const recognitionRef     = useRef(null);
  const completionFiredRef = useRef(false);
  const inputRef           = useRef(null);
  const latestInput        = useRef('');

  // Scaffold level derived from weekNumber
  const chipMode = weekNumber >= 52 ? 'none' : weekNumber >= 29 ? 'truncated' : 'full';

  // ── Data loading ───────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);
    completionFiredRef.current = false;
    const pad    = String(weekNumber).padStart(2, '0');
    const isEasy = learningMode === 'easy';
    const mods   = isEasy ? easyRead : advRead;
    const folder = isEasy ? 'weeks_easy' : 'weeks';
    const key    = `../../../data/${folder}/week_${pad}/read.js`;
    const loader = mods[key] ?? advRead[`../../../data/weeks/week_${pad}/read.js`] ?? null;
    if (!loader) { setError('No reading available for this week.'); setLoading(false); return; }
    loader().then(m => {
      const data = m.default;
      const qs   = data?.comprehension_questions || [];
      if (!qs.length) { setError('No comprehension questions found.'); setLoading(false); return; }
      const mapped = qs.map(q => {
        const best = pickBestAnswer(q.answer);
        const wh   = getCorrectWH(q.question_en);
        return {
          question_en: q.question_en,
          bestAnswer:  best,
          isVague:     isVague(best),
          correctWH:   wh,
          chips:       buildChips(wh),
          hint_en:     q.hint_en || '',
        };
      });
      const good     = mapped.filter(q => !q.isVague && q.correctWH);
      const ok       = mapped.filter(q => q.correctWH && q.isVague);
      const fallback = mapped.filter(q => !q.correctWH);
      const ordered  = shuffle([...good, ...ok, ...fallback]);
      setCards(ordered.slice(0, Math.min(QS_PER_GAME, ordered.length)));
      setStoryTitle(data?.title || '');
      setLoading(false);
    }).catch(() => { setError('Could not load the reading for this week.'); setLoading(false); });
  }, [weekNumber, learningMode]);

  // ── Reset per-card state when idx changes ─────────────────────────────────
  useEffect(() => {
    setCardPhase(chipMode === 'none' ? 'speak' : 'chip');
    setChipResult(null);
    setChipSelected(null);
    setInput('');
    setAttempts(0);
    setFeedback(null);
    setRevealed(false);
  }, [idx, chipMode]);

  // ── Focus input when speak phase starts ───────────────────────────────────
  useEffect(() => {
    if (cardPhase === 'speak' && !loading && inputRef.current) inputRef.current.focus();
  }, [cardPhase, loading]);

  // ── Speech recognition ────────────────────────────────────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous      = false;
    r.maxAlternatives = 3;
    r.lang            = 'en-US';
    r.onresult = e => {
      const card = cards[idx];
      const alts = Array.from(e.results[0]).map(a => a.transcript.trim());
      const best = alts.find(t => validateQuestion(t, card?.question_en || '') === 'correct') || alts[0] || '';
      setInput(best);
      latestInput.current = best;
      setIsListening(false);
    };
    r.onerror = () => setIsListening(false);
    r.onend   = () => setIsListening(false);
    recognitionRef.current = r;
    return () => { try { r.stop(); } catch (_) {} };
  }, [cards, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-submit after speech ───────────────────────────────────────────────
  useEffect(() => { latestInput.current = input; }, [input]);
  useEffect(() => {
    if (isListening || !input || feedback !== null || revealed || cardPhase !== 'speak') return;
    const t = setTimeout(() => { if (latestInput.current) handleSubmitValue(latestInput.current); }, 400);
    return () => clearTimeout(t);
  }, [isListening]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Timer (speak phase only) ──────────────────────────────────────────────
  useEffect(() => {
    if (loading || gamePhase !== 'playing' || cardPhase !== 'speak' || feedback !== null || revealed) return;
    setTimeLeft(TIMER_SECS);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, loading, gamePhase, cardPhase, revealed, feedback]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Game over on 0 lives ──────────────────────────────────────────────────
  useEffect(() => {
    if (lives <= 0 && gamePhase === 'playing') {
      clearInterval(timerRef.current);
      setTimeout(() => setGamePhase('result'), 500);
    }
  }, [lives, gamePhase]);

  // ── onGameComplete callback ────────────────────────────────────────────────
  useEffect(() => {
    if (gamePhase === 'result' && !completionFiredRef.current) {
      completionFiredRef.current = true;
      onGameComplete?.({ gameId: 'hot_seat', score, results });
    }
  }, [gamePhase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Chip handler ──────────────────────────────────────────────────────────
  const handleChip = useCallback((chip) => {
    const card = cards[idx];
    if (!card || chipResult !== null) return;
    setChipSelected(chip);
    const correct = chip === card.correctWH;
    setChipResult(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 5);
    setTimeout(() => setCardPhase('speak'), correct ? 800 : 1400);
  }, [cards, idx, chipResult]);

  // ── Speak handlers ─────────────────────────────────────────────────────────
  const handleTimeout = useCallback(() => {
    clearInterval(timerRef.current);
    const card = cards[idx];
    setFeedback('timeout');
    setRevealed(true);
    setLives(l => l - 1);
    setStreak(0);
    setResults(r => [...r, { correct: false, timeout: true, question: card?.question_en, answer: card?.bestAnswer }]);
    setTimeout(() => advance(), 2500);
  }, [cards, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmitValue = useCallback((value) => {
    clearInterval(timerRef.current);
    const card = cards[idx];
    if (!value?.trim() || !card || feedback !== null) return;
    const result = validateQuestion(value, card.question_en);
    setAttempts(n => n + 1);
    if (result === 'correct') {
      const timeBonus   = timeLeft >= 11 ? 5 : timeLeft >= 6 ? 2 : 0;
      const streakBonus = streak + 1 >= 3 ? 3 : 0;
      const pts = 15 + timeBonus + streakBonus;
      setScore(s => s + pts);
      setStreak(n => n + 1);
      setFeedback('correct');
      setResults(r => [...r, { correct: true, pts, question: card.question_en, answer: card.bestAnswer, input: value }]);
      setTimeout(() => advance(), 1800);
    } else {
      setFeedback(result);
      if (attempts + 1 >= 2) {
        setRevealed(true);
        setLives(l => l - 1);
        setStreak(0);
        setResults(r => [...r, { correct: false, question: card.question_en, answer: card.bestAnswer, input: value }]);
        setTimeout(() => advance(), 2500);
      } else {
        setStreak(0);
        setTimeout(() => { setFeedback(null); setInput(''); }, 2000);
      }
    }
  }, [cards, idx, feedback, attempts, timeLeft, streak]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = e => { e?.preventDefault(); handleSubmitValue(input); };

  const advance = useCallback(() => {
    clearInterval(timerRef.current);
    setIdx(i => {
      const next = i + 1;
      if (next >= cards.length) { setGamePhase('result'); return i; }
      return next;
    });
  }, [cards.length]);

  const handleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); return; }
    setIsListening(true);
    try { recognitionRef.current.start(); } catch (_) { setIsListening(false); }
  };

  const handlePlayAgain = () => {
    completionFiredRef.current = false;
    setIdx(0); setLives(MAX_LIVES); setScore(0); setStreak(0);
    setResults([]); setFeedback(null); setRevealed(false);
    setGamePhase('playing');
    setCards(prev => shuffle([...prev]));
  };

  // ─── Loading / Error ──────────────────────────────────────────────────────
  if (loading) return (
    <div className="text-center py-20 text-gray-500">
      <div className="text-4xl mb-3 animate-bounce">🎤</div>
      <p>Loading story facts…</p>
    </div>
  );
  if (error || !cards.length) return (
    <div className="text-center py-20 text-red-400">
      <div className="text-4xl mb-3">😕</div>
      <p>{error || 'No questions available for this week.'}</p>
    </div>
  );

  // ─── Result screen ────────────────────────────────────────────────────────
  if (gamePhase === 'result') {
    const correct = results.filter(r => r.correct).length;
    return (
      <div className="hot-seat max-w-xl mx-auto p-6 text-center">
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl p-8 mb-6 shadow-xl">
          <div className="text-6xl mb-3">🏆</div>
          <h2 className="text-3xl font-bold mb-1">Hot Seat!</h2>
          {storyTitle && <p className="text-pink-200 text-sm mb-4">{storyTitle}</p>}
          <div className="text-6xl font-bold my-4">{score}</div>
          <div className="text-pink-200">{correct}/{results.length} questions correct</div>
        </div>
        <div className="space-y-3 mb-6 text-left">
          {results.map((r, i) => (
            <div key={i} className={`rounded-xl p-4 ${r.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-lg">{r.correct ? '✅' : r.timeout ? '⏱' : '❌'}</span>
                <div className="flex-1">
                  <p className="font-medium">Q: {r.question}</p>
                  <p className="text-xs mt-1 opacity-70">Clue: {r.answer}</p>
                  {r.pts && <p className="text-xs text-indigo-600 font-bold mt-1">+{r.pts} pts</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handlePlayAgain} className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-lg">
          Play Again 🔄
        </button>
      </div>
    );
  }

  // ─── Playing screen ───────────────────────────────────────────────────────
  const card       = cards[idx];
  const timerPct   = (timeLeft / TIMER_SECS) * 100;
  const timerColor = timeLeft <= 4 ? 'bg-red-500' : timeLeft <= 8 ? 'bg-yellow-500' : 'bg-green-500';

  const feedbackMsg = {
    correct:          { text: '✅ Great question!', cls: 'text-green-600' },
    no_question_word: { text: '❓ Use a question word (What / Who / How / Did…)', cls: 'text-orange-500' },
    missing_keyword:  { text: '🔍 Almost! Include more details from the clue.', cls: 'text-yellow-600' },
    timeout:          { text: '⏱ Time up!', cls: 'text-red-500' },
  };

  // ── CHIP PHASE ────────────────────────────────────────────────────────────
  if (cardPhase === 'chip') {
    const chips     = card?.chips || [];
    const correctWH = card?.correctWH;
    return (
      <div className="hot-seat max-w-xl mx-auto p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl p-5 mb-4 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-2xl font-bold">🎤 Hot Seat</h2>
              <p className="text-pink-200 text-sm">{storyTitle ? `"${storyTitle}"` : 'Ask the right question'}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{score}</div>
              <div className="text-xs text-pink-200">
                {'❤️'.repeat(lives)}{'🖤'.repeat(MAX_LIVES - lives)}
                {streak >= 3 ? ` 🔥×${streak}` : ''}
              </div>
            </div>
          </div>
          <div className="text-xs text-pink-200 mt-1">{idx + 1} / {cards.length}</div>
        </div>

        {/* Clue card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Answer clue:</p>
          <p className="text-3xl font-bold text-rose-600 mb-3">&ldquo;{card?.bestAnswer}&rdquo;</p>
          {card?.isVague && card?.hint_en && (
            <p className="text-sm text-amber-600 italic mb-3">💡 {card.hint_en}</p>
          )}
          <p className="text-sm text-gray-500 font-medium">
            👆 Choose the correct <strong>question word</strong>:
          </p>
        </div>

        {/* Chips grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {chips.map(chip => {
            const label      = chipMode === 'truncated' ? truncateChip(chip) : chip;
            const isSelected = chipSelected === chip;
            const isCorrect  = isSelected && chipResult === 'correct';
            const isWrong    = isSelected && chipResult === 'wrong';
            const showRight  = chipResult === 'wrong' && chip === correctWH;
            return (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                disabled={chipResult !== null}
                className={`py-5 px-6 rounded-2xl text-2xl font-bold transition-all shadow-md ${
                  isCorrect  ? 'bg-green-500 text-white scale-105 shadow-green-300' :
                  isWrong    ? 'bg-red-400 text-white' :
                  showRight  ? 'bg-green-400 text-white ring-2 ring-green-600' :
                  chipResult !== null ? 'bg-gray-100 text-gray-400' :
                  'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 active:scale-95'
                }`}
              >
                {label}{isCorrect ? ' ✓' : ''}{isWrong ? ' ✗' : ''}
              </button>
            );
          })}
        </div>

        {/* Chip feedback */}
        {chipResult && (
          <p className={`text-center text-base font-bold ${chipResult === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
            {chipResult === 'correct'
              ? `✅ Correct! "${correctWH}…" — now say the full question!`
              : `❌ The right word is "${correctWH}" — now say the full question!`}
          </p>
        )}
      </div>
    );
  }

  // ── SPEAK PHASE ───────────────────────────────────────────────────────────
  return (
    <div className="hot-seat max-w-xl mx-auto p-4">
      {/* Header with timer */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl p-5 mb-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold">🎤 Hot Seat</h2>
            <p className="text-pink-200 text-sm">{storyTitle ? `"${storyTitle}"` : 'Ask the right question'}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-xs text-pink-200">
              {'❤️'.repeat(lives)}{'🖤'.repeat(MAX_LIVES - lives)}
              {streak >= 3 ? ` 🔥×${streak}` : ''}
            </div>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-2.5 overflow-hidden">
          <div className={`h-2.5 rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
        </div>
        <div className="flex justify-between text-xs mt-1 text-pink-200">
          <span>{idx + 1} / {cards.length}</span>
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Chip result badge */}
      {chipMode !== 'none' && (
        <div className={`text-center text-sm font-semibold mb-3 px-4 py-1.5 rounded-full ${
          chipResult === 'correct' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {chipResult === 'correct'
            ? `✅ "${card?.correctWH}…" — now say the full question!`
            : `📝 Starter: "${card?.correctWH}" — now say the full question!`}
        </div>
      )}

      {/* Clue card */}
      <div className={`bg-white rounded-2xl shadow-lg p-8 mb-4 text-center transition-all ${revealed ? 'border-2 border-orange-300' : ''}`}>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Answer clue:</p>
        <p className="text-3xl font-bold text-rose-600 mb-4">&ldquo;{card?.bestAnswer}&rdquo;</p>
        {card?.isVague && card?.hint_en && !revealed && (
          <p className="text-sm text-amber-600 italic mb-2">💡 {card.hint_en}</p>
        )}
        {revealed && (
          <div className="mt-4 bg-green-50 rounded-xl p-3">
            <p className="text-sm text-green-700 font-medium">Full question:</p>
            <p className="text-base text-green-800 font-bold">{card?.question_en}</p>
          </div>
        )}
      </div>

      {/* Hint after 1st wrong attempt */}
      {attempts >= 1 && !revealed && feedback && feedback !== 'correct' && card?.hint_en && !card?.isVague && (
        <div className="bg-amber-50 rounded-xl px-4 py-2 mb-3 text-sm text-amber-700">
          💡 Hint: {card.hint_en}
        </div>
      )}

      {/* Feedback message */}
      {feedback && feedbackMsg[feedback] && (
        <p className={`text-center text-base font-bold mb-3 ${feedbackMsg[feedback].cls}`}>
          {feedbackMsg[feedback].text}
        </p>
      )}

      {/* Text input + mic */}
      {!revealed && (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type or speak your question…"
            className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-indigo-400"
            disabled={!!feedback && feedback !== 'no_question_word' && feedback !== 'missing_keyword'}
          />
          <button
            type="button"
            onClick={handleMic}
            className={`px-4 py-3 rounded-xl text-xl transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            🎤
          </button>
          <button
            type="submit"
            className="px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl"
          >
            Go
          </button>
        </form>
      )}
    </div>
  );
}
'''

with open(DEST, 'w') as f:
    f.write(content)

print(f"Written {len(content.splitlines())} lines to {DEST}")
