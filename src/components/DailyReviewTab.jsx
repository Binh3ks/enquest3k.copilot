/**
 * src/components/DailyReviewTab.jsx — SRS Flashcard Daily Review (Sprint S2.1)
 *
 * Uses the new wordMemoryBank + srsEngine (S1.2) to surface due words as
 * interactive flashcards. Shows progress for today's session and a celebration
 * screen when done.
 *
 * Props:
 *   weekNumber   {number}   — current week (for filtering by week)
 *   themeColor   {string}   — Tailwind colour name e.g. 'orange'
 *   isVi         {boolean}  — Vietnamese mode flag
 *   onToggleLang {Function}
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  RotateCcw, Trophy, BookOpen,
  Brain, ChevronRight, BarChart2, Volume2, CheckCircle, XCircle, Zap
} from 'lucide-react';
import { speakText } from '../utils/AudioHelper';
import {
  getDueToday,
  getBankStats,
  recordReview,
  getAllWords,
} from '../utils/wordMemoryBank';
import { progressAPI } from '../services/api';
import { useUserStore } from '../stores/useUserStore';

// ─────────────────────────────────────────────────────────────
// Status badge helper
// ─────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  new:       'bg-slate-100 text-slate-500',
  learning:  'bg-amber-100 text-amber-700',
  reviewing: 'bg-blue-100 text-blue-700',
  mastered:  'bg-green-100 text-green-700',
};

function StatusBadge({ status }) {
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${STATUS_COLORS[status] || 'bg-slate-100 text-slate-500'}`}>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Build 4-option multiple-choice for a word entry
// Question: "What does [word] mean?"  Options: 1 correct + 3 distractors
// ─────────────────────────────────────────────────────────────
function buildMCQ(entry, allWords) {
  // Distractors: other words in the bank that have a meaning, excluding the current word
  const pool = allWords.filter(
    w => w.word_id !== entry.word_id && w.meaning
  );
  // Shuffle and pick 3
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const distractors = shuffled.slice(0, 3).map(w => w.meaning);

  // If we have fewer than 3 distractors, pad with generic fillers
  const fillers = ['A place you visit often', 'Something you eat', 'A feeling', 'An action'];
  while (distractors.length < 3) {
    const filler = fillers[distractors.length];
    if (!distractors.includes(filler)) distractors.push(filler);
  }

  const correct = entry.meaning || entry.word; // fallback to word itself if no meaning stored
  const options = [...distractors, correct].sort(() => Math.random() - 0.5);
  return { correct, options };
}

// ─────────────────────────────────────────────────────────────
// Cloze card — fill-in-the-blank for collocation entries
// e.g. "kick the ___ hard" → student types "kick the ball"
// ─────────────────────────────────────────────────────────────
function ClozeCard({ entry, revealed, onSubmit, onPlay, onPlayFull, isVi, themeColor }) {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setInput('');
    setIsCorrect(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [entry.word_id]);

  const checkAnswer = () => {
    if (revealed || !input.trim()) return;
    const expected = (entry.answer || entry.word || '').trim().toLowerCase();
    const ok = input.trim().toLowerCase() === expected;
    setIsCorrect(ok);
    onSubmit(ok, input);
  };

  const handleKey = (e) => { if (e.key === 'Enter') checkAnswer(); };

  const parts = (entry.cloze || entry.word).split('___');
  const hasClozeBlank = parts.length > 1;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="p-6 flex flex-col items-center gap-3 border-b border-slate-50">
        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">
          {isVi ? 'cụm từ' : 'collocation'}
        </span>

        <div className="flex flex-wrap items-center justify-center gap-1 text-2xl font-black text-slate-800 text-center leading-snug">
          {hasClozeBlank ? (
            <>
              {parts[0] && <span>{parts[0].trim()}</span>}
              <span className={`px-3 py-0.5 rounded-xl border-2 border-dashed text-base
                ${revealed
                  ? isCorrect ? 'border-green-400 bg-green-50 text-green-700' : 'border-red-400 bg-red-50 text-red-600'
                  : 'border-teal-400 bg-teal-50 text-teal-600'}
              `}>
                {revealed ? (entry.answer || entry.word) : ' ? '}
              </span>
              {parts[1] && <span>{parts[1].trim()}</span>}
            </>
          ) : (
            <span className="text-lg">{entry.cloze || entry.word}</span>
          )}
        </div>

        {entry.meaning && (
          <p className="text-xs text-slate-400 font-medium italic">"{entry.meaning}"</p>
        )}
        <button
          onClick={() => revealed ? onPlayFull() : onPlay(entry.audio_url, entry.word)}
          className="p-2 bg-teal-50 text-teal-600 rounded-full hover:bg-teal-100 transition-all active:scale-90"
          title={revealed ? (isVi ? 'Nghe lại câu hoàn chỉnh' : 'Replay full sentence') : (isVi ? 'Nghe từ' : 'Play word')}
        >
          <Volume2 size={16} />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <p className="text-xs font-black uppercase text-slate-500 tracking-widest text-center">
          {isVi ? 'Điền vào chỗ trống' : 'Fill in the blank'}
        </p>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={revealed}
            placeholder={isVi ? 'Gõ câu trả lời...' : 'Type your answer...'}
            className={`flex-1 px-4 py-3 rounded-2xl border-2 font-bold text-sm outline-none transition-all
              ${revealed
                ? isCorrect ? 'border-green-400 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-700 line-through'
                : 'border-slate-200 focus:border-teal-400 focus:bg-teal-50'}
            `}
            autoCapitalize="none" autoCorrect="off" spellCheck="false"
          />
          {!revealed && (
            <button onClick={checkAnswer} disabled={!input.trim()}
              className={`px-5 py-3 rounded-2xl font-black text-white text-sm transition-all
                ${input.trim() ? 'bg-teal-500 hover:bg-teal-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
              {isVi ? 'Check' : 'Check'}
            </button>
          )}
        </div>

        {revealed && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            {isCorrect
              ? <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              : <XCircle size={16} className="text-red-500 flex-shrink-0" />}
            <span className={`text-sm font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect
                ? (isVi ? 'Chính xác! 🎉' : 'Correct! 🎉')
                : `${isVi ? 'Đáp án: ' : 'Answer: '}"${entry.answer || entry.word}"`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Stats bar
// ─────────────────────────────────────────────────────────────
function StatsBar({ stats, isVi }) {
  const entries = [
    { label: isVi ? 'Mới' : 'New',      value: stats.new,       color: 'bg-slate-300' },
    { label: isVi ? 'Đang học' : 'Learning', value: stats.learning, color: 'bg-amber-400' },
    { label: isVi ? 'Ôn tập' : 'Reviewing', value: stats.reviewing, color: 'bg-blue-400' },
    { label: isVi ? 'Thuộc' : 'Mastered',   value: stats.mastered, color: 'bg-green-500' },
  ];
  const total = (stats.new || 0) + (stats.learning || 0) + (stats.reviewing || 0) + (stats.mastered || 0);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 size={16} className="text-slate-500" />
        <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
          {isVi ? 'Sức khoẻ từ vựng' : 'Vocab Health'} ({total} {isVi ? 'từ' : 'words'})
        </span>
      </div>
      <div className="flex gap-4 flex-wrap">
        {entries.map(e => (
          <div key={e.label} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${e.color}`} />
            <span className="text-xs font-bold text-slate-600">{e.label}: {e.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
const DailyReviewTab = ({ weekNumber, themeColor = 'indigo', isVi = false, onToggleLang }) => {
  const [queue, setQueue]               = useState([]);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionDone, setSessionDone]   = useState(false);
  const [stats, setStats]               = useState({ new: 0, learning: 0, reviewing: 0, mastered: 0, dueToday: 0 });
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal]     = useState(0);

  // MCQ state (word cards)
  const [selectedOption, setSelectedOption] = useState(null);
  const [revealed, setRevealed]             = useState(false);
  const [allWords, setAllWords]             = useState([]);

  // Cloze state (collocation cards) — managed inside ClozeCard but we need revealed here for Next btn
  const [clozeRevealed, setClozeRevealed]   = useState(false);
  // Word card: hide word text until student reveals or answers
  const [wordVisible, setWordVisible]       = useState(false);

  // Track whether user has interacted (browsers block autoplay before first click)
  const hasInteracted = useRef(false);

  const { currentUser, token } = useUserStore();

  const BATCH_LIMIT = 10;

  const loadQueue = useCallback(() => {
    const due = getDueToday(BATCH_LIMIT);
    setQueue(due);
    setSessionIndex(0);
    setSelectedOption(null);
    setRevealed(false);
    setClozeRevealed(false);
    setWordVisible(false);
    setSessionDone(due.length === 0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setStats(getBankStats());
    setAllWords(getAllWords());
  }, []);

  useEffect(() => { loadQueue(); }, [loadQueue]);

  const currentEntry = queue[sessionIndex] ?? null;
  const isCollocationCard = currentEntry?.type === 'collocation';

  // Auto-play word TTS when a new word card appears (listening before reading)
  // Only fires after first user interaction (browser autoplay policy)
  useEffect(() => {
    if (!currentEntry || currentEntry.type === 'collocation') return;
    if (!hasInteracted.current) return;
    speakText(currentEntry.word, null, 1.0, null, 'new_word', weekNumber);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntry?.word_id]);

  // Build MCQ options whenever the current card changes (word cards only)
  const mcq = useMemo(() => {
    if (!currentEntry || isCollocationCard) return null;
    return buildMCQ(currentEntry, allWords);
  }, [currentEntry, allWords, isCollocationCard]); // eslint-disable-line react-hooks/exhaustive-deps

  // Word card: MCQ selection
  const handleOptionSelect = (option) => {
    if (revealed) return;
    setSelectedOption(option);
    setRevealed(true);
    setWordVisible(true);

    const isCorrect = option === mcq.correct;
    recordReview(currentEntry.word_id, isCorrect);
    setSessionTotal(t => t + 1);
    if (isCorrect) {
      setSessionCorrect(c => c + 1);
      speakText(isVi ? 'Đúng rồi!' : 'Correct!', null, 1.0, null, 'read');
    } else {
      speakText(isVi ? 'Hãy thử lại' : 'Not quite!', null, 1.0, null, 'read');
    }
  };

  // Collocation card: cloze submit
  const handleClozeSubmit = (isCorrect) => {
    if (clozeRevealed) return;
    setClozeRevealed(true);
    recordReview(currentEntry.word_id, isCorrect);
    setSessionTotal(t => t + 1);
    if (isCorrect) {
      setSessionCorrect(c => c + 1);
      speakText(isVi ? 'Đúng rồi!' : 'Correct!', null, 1.0, null, 'read');
    } else {
      speakText(isVi ? 'Hãy thử lại' : 'Not quite!', null, 1.0, null, 'read');
    }
    // Auto-play full collocation sentence after feedback
    const fullSentence = currentEntry.full_context ||
      (currentEntry.cloze || '').replace('___', currentEntry.answer || currentEntry.word);
    if (fullSentence) {
      setTimeout(() => speakText(fullSentence, null, 1.0, null, 'new_word', weekNumber), 1200);
    }
  };

  const handleNext = () => {
    const nextIndex = sessionIndex + 1;
    if (nextIndex >= queue.length) {
      setSessionDone(true);
      setStats(getBankStats());
    } else {
      setSessionIndex(nextIndex);
      setSelectedOption(null);
      setRevealed(false);
      setClozeRevealed(false);
      setWordVisible(false);
    }
  };

  const handlePlayAgain = () => {
    loadQueue();
    setSessionDone(false);
  };

  // Sync SRS stats to server when session completes (makes vocab mastery visible to teacher)
  useEffect(() => {
    if (!sessionDone || sessionTotal === 0) return;
    if (!currentUser || currentUser.role === 'guest' || !token) return;
    const stats = getBankStats();
    const accuracy = Math.round((sessionCorrect / sessionTotal) * 100);
    progressAPI.saveProgress({
      weekId: weekNumber || 1,
      stationId: 'review_session',
      data: {
        srsStats: stats,
        sessionCorrect,
        sessionTotal,
        accuracy,
        syncedAt: new Date().toISOString(),
      },
      isCompleted: true,
      score: accuracy,
    }).catch(() => {}); // non-critical — silent fail
  }, [sessionDone]); // eslint-disable-line

  // ── Empty state: no words in bank yet ──
  if (stats.new + stats.learning + stats.reviewing + stats.mastered === 0 && !sessionDone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8">
        <div className="p-5 bg-orange-50 rounded-3xl">
          <BookOpen size={48} className="text-orange-400" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            {isVi ? 'Ngân hàng từ trống' : 'Word Bank Empty'}
          </h2>
          <p className="text-slate-500 font-medium max-w-xs leading-relaxed">
            {isVi
              ? 'Hoàn thành tab New Words để thêm từ vào ngân hàng SRS.'
              : 'Complete the New Words tab to add vocabulary to your SRS bank.'}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
          <ChevronRight size={16} className="text-indigo-500" />
          <span className="text-sm font-bold text-indigo-700">
            {isVi ? 'Đi tới: New Words →' : 'Go to: New Words →'}
          </span>
        </div>
      </div>
    );
  }

  // ── Session complete ──
  if (sessionDone) {
    const percent = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 100;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8">
        <div className="p-5 bg-green-50 rounded-3xl">
          <Trophy size={48} className="text-yellow-500" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            {sessionTotal === 0
              ? (isVi ? 'Không từ nào cần ôn hôm nay!' : 'No words due today!')
              : (isVi ? 'Hoàn thành buổi ôn!' : 'Session Complete!')}
          </h2>
          {sessionTotal > 0 && (
            <p className="text-slate-500 font-medium">
              {isVi ? `Đúng ${sessionCorrect}/${sessionTotal} (${percent}%)` : `${sessionCorrect}/${sessionTotal} correct (${percent}%)`}
            </p>
          )}
        </div>

        <StatsBar stats={stats} isVi={isVi} />

        <div className="flex gap-3">
          <button
            onClick={handlePlayAgain}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all"
          >
            <RotateCcw size={16} />
            {stats.dueToday > 0
              ? (isVi ? `Tiếp tục (còn ${stats.dueToday})` : `Continue (${stats.dueToday} left)`)
              : (isVi ? 'Luyện lại' : 'Practice Again')}
          </button>
        </div>
      </div>
    );
  }

  // ── Active session ──
  const progress = sessionTotal / Math.max(queue.length, 1);

  return (
    <div
      className="max-w-lg mx-auto flex flex-col gap-6 pb-24 px-2"
      onPointerDown={() => { hasInteracted.current = true; }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between bg-${themeColor}-50 border border-${themeColor}-100 rounded-2xl px-5 py-3`}>
        <div className="flex items-center gap-2">
          <Brain size={20} className={`text-${themeColor}-500`} />
          <span className={`text-sm font-black text-${themeColor}-800 uppercase tracking-wider`}>
            {isVi ? 'Ôn tập hôm nay' : 'Daily Review'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            {sessionIndex + 1} / {queue.length}
          </span>
          <button
            onClick={onToggleLang}
            className="text-[10px] font-black px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-500"
          >
            {isVi ? 'VI' : 'EN'}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-${themeColor}-500 transition-all duration-500`}
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Card: collocation (cloze) or word (MCQ) */}
      {currentEntry && isCollocationCard && (
        <ClozeCard
          key={currentEntry.word_id}
          entry={currentEntry}
          revealed={clozeRevealed}
          onSubmit={handleClozeSubmit}
          onPlay={(url, word) => speakText(word, url, 1.0, null, 'new_word', weekNumber)}
          onPlayFull={() => {
            const full = currentEntry.full_context ||
              (currentEntry.cloze || '').replace('___', currentEntry.answer || currentEntry.word);
            speakText(full, null, 1.0, null, 'new_word', weekNumber);
          }}
          isVi={isVi}
          themeColor={themeColor}
        />
      )}

      {currentEntry && !isCollocationCard && mcq && (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
          {/* Word + status */}
          <div className="p-6 flex flex-col items-center gap-3 border-b border-slate-50">
            <StatusBadge status={currentEntry.status} />
            {(wordVisible || revealed) ? (
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black text-slate-800 text-center capitalize leading-tight">
                  {currentEntry.word}
                </h2>
                <button
                  onClick={() => speakText(currentEntry.word, null, 1.0, null, 'new_word', weekNumber)}
                  className={`p-2 bg-${themeColor}-50 text-${themeColor}-600 rounded-full hover:bg-${themeColor}-100 transition-all active:scale-90`}
                >
                  <Volume2 size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-slate-200 tracking-[0.3em] select-none">• • •</span>
                <button
                  onClick={() => speakText(currentEntry.word, null, 1.0, null, 'new_word', weekNumber)}
                  className={`p-2 bg-${themeColor}-50 text-${themeColor}-600 rounded-full hover:bg-${themeColor}-100 transition-all active:scale-90`}
                  title={isVi ? 'Nghe lại' : 'Replay'}
                >
                  <Volume2 size={18} />
                </button>
                <button
                  onClick={() => setWordVisible(true)}
                  className="text-xs font-bold text-slate-400 border border-slate-200 px-3 py-1.5 rounded-xl hover:text-indigo-500 hover:border-indigo-300 transition-all"
                >
                  {isVi ? 'Hiện chữ' : 'Show Word'}
                </button>
              </div>
            )}
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {isVi ? 'Nghĩa của từ này là gì?' : 'What does this word mean?'}
            </p>
          </div>

          {/* Options */}
          <div className="p-5 grid grid-cols-1 gap-3">
            {mcq.options.map((option, i) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = option === mcq.correct;
              let cls = 'border-2 border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50';
              if (revealed) {
                if (isCorrectOption) cls = 'border-2 border-green-400 bg-green-50 text-green-800';
                else if (isSelected) cls = 'border-2 border-red-400 bg-red-50 text-red-700 line-through opacity-70';
                else cls = 'border-2 border-slate-100 bg-slate-50 text-slate-400 opacity-50';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(option)}
                  disabled={revealed}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all active:scale-98 flex items-center gap-3 ${cls}`}
                >
                  <span className="w-6 h-6 flex-shrink-0 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-black">
                    {revealed && isCorrectOption ? <CheckCircle size={14} /> : revealed && isSelected ? <XCircle size={14} /> : String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Next button — only after answering */}
          {revealed && (
            <div className="px-5 pb-5">
              <button
                onClick={handleNext}
                className={`w-full py-3 rounded-2xl font-black text-white transition-all active:scale-95 ${selectedOption === mcq.correct ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
              >
                {sessionIndex + 1 >= queue.length
                  ? (isVi ? 'Xem kết quả →' : 'See Results →')
                  : (isVi ? 'Từ tiếp theo →' : 'Next Word →')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Next button for cloze cards (rendered outside ClozeCard for layout consistency) */}
      {currentEntry && isCollocationCard && clozeRevealed && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-2xl font-black text-white bg-teal-500 hover:bg-teal-600 transition-all active:scale-95"
        >
          {sessionIndex + 1 >= queue.length
            ? (isVi ? 'Xem kết quả →' : 'See Results →')
            : (isVi ? 'Tiếp theo →' : 'Next →')}
        </button>
      )}

      {/* Stats */}
      <StatsBar stats={stats} isVi={isVi} />
    </div>
  );
};

export default DailyReviewTab;
