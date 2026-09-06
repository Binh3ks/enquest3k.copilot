import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { X, RotateCcw, CheckCircle, XCircle, Volume2, Brain, Sparkles, ChevronRight, Zap, Target, Layers } from 'lucide-react';
import srsService from '../../services/srsService';
import useTTSStore from '../../stores/useTTSStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import './SRSFlashcardReview.css';

/**
 * SRSFlashcardReview — Gamified Spaced Repetition Daily Warm-up Modal.
 * Loads 5–10 due SRS words from past weeks (W01–W32 syllabus) for Week 33+.
 * Supports 3 exciting game modes:
 *   1. 🎴 Flash Flip: 3D smart flashcard with pronunciation, phonetics & Leitner boxes.
 *   2. ⚡ Match Blitz: 4x4 rapid-fire English <-> Vietnamese pairing.
 *   3. 🎯 Speed Quiz: 1 word, 3 choices rapid retrieval.
 */

const MAX_CARDS = 8;

export default function SRSFlashcardReview({ onComplete, weekNumber = 33 }) {
  const [cards, setCards] = useState([]);
  const [gameMode, setGameMode] = useState('flip'); // 'flip' | 'match' | 'quiz'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState([]); // { word, remembered: boolean }[]
  const [phase, setPhase] = useState('review'); // 'review' | 'summary'

  // Match Blitz state
  const [selectedWord, setSelectedWord] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [wrongPair, setWrongPair] = useState(null);

  // Speed Quiz state
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { speak } = useTTSStore();
  const cardRef = useRef(null);

  // Load due words once on mount
  useEffect(() => {
    const dueWords = srsService.getDueWords(MAX_CARDS, weekNumber);
    if (!dueWords || dueWords.length === 0) {
      onComplete?.();
      return;
    }
    setCards(dueWords);
  }, [weekNumber, onComplete]);

  // Safely get current card
  const currentCard = cards.length > 0 ? cards[Math.min(currentIndex, cards.length - 1)] : null;
  const progress = cards.length > 0 ? (currentIndex / cards.length) * 100 : 0;
  const stats = srsService.getStats();

  // Speak word
  const handleSpeak = useCallback((wordToSpeak, e) => {
    e?.stopPropagation();
    const word = wordToSpeak || currentCard?.word;
    if (word) {
      speak?.(word, 'en-US');
    }
  }, [currentCard, speak]);

  // Answer handler for Flip & Quiz
  const handleAnswer = useCallback((remembered) => {
    if (!currentCard) return;

    // Record in SRS engine
    srsService.recordReview(currentCard.word, remembered);

    // Track result
    setResults(prev => [...prev, { word: currentCard.word, remembered }]);

    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setQuizAnswered(false);
      setSelectedOption(null);
    } else {
      srsService.markDailyReviewDone();
      fireCelebrationConfetti();
      setPhase('summary');
    }
  }, [currentCard, currentIndex, cards.length]);

  const handleFinish = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  // ── Match Blitz Logic ──
  // Current batch of 4 words for matching
  const matchBatch = useMemo(() => {
    if (cards.length === 0) return { words: [], defs: [] };
    // Take 4 words around current index
    const start = Math.floor(currentIndex / 4) * 4;
    const batch = cards.slice(start, start + 4);
    const words = batch.map(c => ({ id: c.word, text: c.word, raw: c }));
    // Shuffle definitions
    const defs = [...batch]
      .sort(() => Math.random() - 0.5)
      .map(c => ({ id: c.word, text: c.definition, raw: c }));
    return { words, defs, count: batch.length };
  }, [cards, currentIndex]);

  const handleMatchSelect = (item, type) => {
    if (matchedIds.has(item.id)) return;

    if (type === 'word') {
      handleSpeak(item.text);
      setSelectedWord(item);
    } else if (type === 'def') {
      if (!selectedWord) return;

      if (selectedWord.id === item.id) {
        // Correct match!
        srsService.recordReview(selectedWord.id, true);
        setResults(prev => [...prev, { word: selectedWord.id, remembered: true }]);
        const nextMatched = new Set(matchedIds);
        nextMatched.add(selectedWord.id);
        setMatchedIds(nextMatched);
        setSelectedWord(null);

        // Advance index
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);

        if (nextIdx >= cards.length) {
          srsService.markDailyReviewDone();
          fireCelebrationConfetti();
          setPhase('summary');
        }
      } else {
        // Wrong match
        setWrongPair({ wordId: selectedWord.id, defId: item.id });
        srsService.recordReview(selectedWord.id, false);
        setTimeout(() => {
          setWrongPair(null);
          setSelectedWord(null);
        }, 600);
      }
    }
  };

  // ── Speed Quiz Options ──
  const quizOptions = useMemo(() => {
    if (!currentCard || cards.length === 0) return [];
    const correct = currentCard.definition;
    const otherDefs = cards
      .filter(c => c.word !== currentCard.word)
      .map(c => c.definition);
    // Shuffle distractors
    const shuffledOthers = [...otherDefs].sort(() => Math.random() - 0.5).slice(0, 2);
    const all = [correct, ...shuffledOthers].sort(() => Math.random() - 0.5);
    return all;
  }, [currentCard, cards]);

  const handleQuizSelect = (opt) => {
    if (quizAnswered || !currentCard) return;
    setQuizAnswered(true);
    setSelectedOption(opt);
    const isCorrect = opt === currentCard.definition;
    setTimeout(() => {
      handleAnswer(isCorrect);
    }, 650);
  };

  if (cards.length === 0) return null;

  // ── Summary Screen ──────────────────────────────────────────
  if (phase === 'summary') {
    const remembered = results.filter(r => r.remembered).length;
    const total = results.length;
    const percentage = total > 0 ? Math.round((remembered / total) * 100) : 0;

    return (
      <div className="srs-overlay">
        <div className="srs-modal srs-summary">
          <div className="srs-summary-icon">
            <Sparkles size={44} />
          </div>
          <h2 className="srs-summary-title">Khởi động hoàn tất! 🎉</h2>
          <p className="srs-summary-score">
            {remembered}/{total} từ ôn tập thành công ({percentage}%) · <strong>+50 XP</strong>
          </p>

          <div className="srs-stats-grid">
            <div className="srs-stat-item">
              <span className="srs-stat-number">{stats.totalWords}</span>
              <span className="srs-stat-label">Tổng vốn từ</span>
            </div>
            <div className="srs-stat-item srs-stat-mastered">
              <span className="srs-stat-number">{stats.masteredWords}</span>
              <span className="srs-stat-label">Thuộc lòng</span>
            </div>
            <div className="srs-stat-item">
              <span className="srs-stat-number">{stats.dueNow}</span>
              <span className="srs-stat-label">Cần ôn tiếp</span>
            </div>
          </div>

          {/* Word results list */}
          <div className="srs-results-list">
            {results.map((r, i) => (
              <div key={i} className={`srs-result-item ${r.remembered ? 'srs-correct' : 'srs-incorrect'}`}>
                {r.remembered ? <CheckCircle size={14} /> : <XCircle size={14} />}
                <span>{r.word}</span>
              </div>
            ))}
          </div>

          <button type="button" className="srs-continue-btn cursor-pointer" onClick={handleFinish}>
            <span>Bắt đầu học ngay! 🚀</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── Main Review Screen ──────────────────────────────────────
  return (
    <div className="srs-overlay">
      <div className="srs-modal">
        {/* Top Header & Mode Switcher */}
        <div className="srs-header">
          <div className="srs-header-left">
            <Brain size={20} className="text-indigo-400" />
            <span>SRS Daily Warm-up</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/15">
            <button
              type="button"
              onClick={() => setGameMode('flip')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                gameMode === 'flip' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
              title="Thẻ 3D Leitner"
            >
              <Layers size={13} /> Thẻ 3D
            </button>
            <button
              type="button"
              onClick={() => setGameMode('match')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                gameMode === 'match' ? 'bg-amber-500 text-slate-950 font-black shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
              title="Ghép Nhanh 60s"
            >
              <Zap size={13} /> Nối từ
            </button>
            <button
              type="button"
              onClick={() => setGameMode('quiz')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                gameMode === 'quiz' ? 'bg-emerald-500 text-slate-950 font-black shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
              title="Chọn Nhanh"
            >
              <Target size={13} /> Trắc nghiệm
            </button>
          </div>

          <div className="srs-header-right">
            <span className="srs-counter">{currentIndex + 1}/{cards.length}</span>
            <button type="button" className="srs-skip-btn cursor-pointer" onClick={handleFinish} title="Bỏ qua warm-up">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="srs-progress-bar">
          <div className="srs-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Box Leitner Indicator */}
        <div className="srs-box-indicator">
          {[1, 2, 3, 4, 5].map(box => (
            <div
              key={box}
              className={`srs-box-dot ${currentCard?.box === box ? 'srs-box-active' : ''} ${currentCard?.box > box ? 'srs-box-passed' : ''}`}
              title={`Hộp ghi nhớ ${box}`}
            >
              {box}
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MODE 1: 🎴 3D Smart Flashcard
           ══════════════════════════════════════════════════════════════ */}
        {gameMode === 'flip' && currentCard && (
          <div>
            <div
              ref={cardRef}
              className={`srs-card-container ${isFlipped ? 'srs-flipped' : ''}`}
              onClick={() => setIsFlipped(prev => !prev)}
              role="button"
              tabIndex={0}
            >
              {/* Front: English Word */}
              <div className="srs-card srs-card-front">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-400/30">
                    Tuần {currentCard.week || 1} · Hộp {currentCard.box || 1}
                  </span>
                  <button
                    type="button"
                    className="srs-speak-btn cursor-pointer"
                    onClick={(e) => handleSpeak(currentCard.word, e)}
                    title="Nghe phát âm chuẩn"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>

                <h3 className="srs-word">{currentCard.word}</h3>
                {currentCard.phonetic && (
                  <p className="text-xs text-indigo-300/80 font-mono mt-0.5">{currentCard.phonetic}</p>
                )}
                <p className="srs-hint">👉 Bấm thẻ để xem nghĩa</p>
              </div>

              {/* Back: Vietnamese Definition */}
              <div className="srs-card srs-card-back">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30 mb-2">
                  Ý nghĩa tiếng Việt
                </span>
                <p className="srs-definition">{currentCard.definition}</p>
                <p className="srs-week-label">Từ vựng Cambridge Syllabus · Tuần {currentCard.week}</p>
              </div>
            </div>

            {/* Action Buttons — Visible when flipped */}
            <div className={`srs-actions ${isFlipped ? 'srs-actions-visible' : ''}`}>
              <button
                type="button"
                className="srs-action-btn srs-btn-forgot cursor-pointer"
                onClick={() => handleAnswer(false)}
              >
                <XCircle size={18} />
                <span>Chưa nhớ</span>
              </button>
              <button
                type="button"
                className="srs-action-btn srs-btn-remember cursor-pointer"
                onClick={() => handleAnswer(true)}
              >
                <CheckCircle size={18} />
                <span>Nhớ rồi!</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            MODE 2: ⚡ Match Blitz (Ghép Nhanh Cặp Từ 4x4)
           ══════════════════════════════════════════════════════════════ */}
        {gameMode === 'match' && (
          <div className="py-2 space-y-3">
            <p className="text-xs text-center text-indigo-200 font-bold">
              ⚡ Chạm 1 từ tiếng Anh và ghép đúng nghĩa tiếng Việt!
            </p>
            <div className="grid grid-cols-2 gap-2">
              {/* Words Column */}
              <div className="space-y-2">
                {matchBatch.words.map(w => {
                  const isMatched = matchedIds.has(w.id);
                  const isSelected = selectedWord?.id === w.id;
                  const isWrong = wrongPair?.wordId === w.id;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleMatchSelect(w, 'word')}
                      className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black border transition-all flex items-center justify-between cursor-pointer ${
                        isMatched
                          ? 'opacity-30 border-dashed border-slate-600 bg-transparent text-slate-500'
                          : isWrong
                          ? 'bg-rose-500 text-white border-rose-600 animate-shake'
                          : isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-500 scale-102 shadow-md ring-2 ring-amber-300'
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <span>{w.text}</span>
                      <Volume2 size={13} className="text-indigo-300 shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Definitions Column */}
              <div className="space-y-2">
                {matchBatch.defs.map(d => {
                  const isMatched = matchedIds.has(d.id);
                  const isWrong = wrongPair?.defId === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleMatchSelect(d, 'def')}
                      className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all text-left cursor-pointer ${
                        isMatched
                          ? 'opacity-30 border-dashed border-slate-600 bg-transparent text-slate-500'
                          : isWrong
                          ? 'bg-rose-500 text-white border-rose-600 animate-shake'
                          : 'bg-indigo-950/80 text-indigo-200 border-indigo-700/60 hover:bg-indigo-900'
                      }`}
                    >
                      {d.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            MODE 3: 🎯 Speed Quiz (Trắc Nghiệm Tốc Độ 3 Lựa Chọn)
           ══════════════════════════════════════════════════════════════ */}
        {gameMode === 'quiz' && currentCard && (
          <div className="py-2 space-y-3">
            <div className="p-4 bg-indigo-950/70 border border-indigo-500/40 rounded-2xl text-center space-y-1">
              <button
                type="button"
                onClick={(e) => handleSpeak(currentCard.word, e)}
                className="p-2 bg-indigo-600/50 hover:bg-indigo-600 text-white rounded-full mx-auto inline-flex items-center justify-center transition cursor-pointer"
                title="Nghe"
              >
                <Volume2 size={20} />
              </button>
              <h3 className="text-2xl font-black text-white tracking-wide">{currentCard.word}</h3>
              {currentCard.phonetic && (
                <p className="text-xs text-indigo-300 font-mono">{currentCard.phonetic}</p>
              )}
            </div>

            <div className="space-y-2">
              {quizOptions.map((opt, idx) => {
                const isCorrect = opt === currentCard.definition;
                const isSelected = selectedOption === opt;
                let btnStyle = 'bg-white/10 text-white border-white/20 hover:bg-white/20';

                if (quizAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 text-slate-950 font-black border-emerald-400 ring-2 ring-emerald-300 shadow-md';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white font-bold border-rose-600';
                  } else {
                    btnStyle = 'opacity-40 bg-white/5 text-slate-400 border-transparent';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={quizAnswered}
                    onClick={() => handleQuizSelect(opt)}
                    className={`w-full p-3 rounded-xl text-xs sm:text-sm text-left border transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizAnswered && isCorrect && <CheckCircle size={16} className="text-slate-950" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
