import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, BookOpen, Book, Mic, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Levenshtein distance for pronunciation scoring
function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
    }
  }
  return matrix[b.length][a.length];
}

/**
 * HoverWord — Từ trong đọc hiểu với hover dictionary 3 tầng.
 *
 * Tier 1 (Bold): Từ target tuần này (vocab.js) — font-black, border-b-2, full popup
 * Tier 2 (Semi-bold): Từ chưa học chính thức — font-semibold, border-dotted, full popup
 * Tier 3 (Plain): Từ đã học (vocab.js tuần trước) — normal text, no border, passive hover only
 *
 * Tầng 1 (hover): Mini tooltip — tên từ + IPA + "Bấm xem nghĩa"
 * Tầng 2 (click): Popup đầy đủ qua Portal — từ + IPA + 🔊 + nghĩa + 🎤 + links
 */
const HoverWord = ({ word, themeColor = 'indigo', onSpeak, entry, tier = 2 }) => {
  const [mode, setMode] = useState('idle'); // idle | hover | open
  const isPhrase = word.trim().includes(' ');
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const wordRef = useRef(null);
  const leaveTimer = useRef(null);

  // Pronunciation check state
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationResult, setPronunciationResult] = useState(null); // { score: 'perfect' | 'good' | 'try-again', transcript: string }
  const recognitionRef = useRef(null);

  const clearLeave = () => clearTimeout(leaveTimer.current);

  // ────────── Desktop hover handlers ──────────
  const handleMouseEnter = () => {
    clearLeave();
    if (mode === 'idle') setMode('hover');
  };

  const handleMouseLeave = () => {
    if (mode === 'hover') {
      leaveTimer.current = setTimeout(() => setMode('idle'), 200);
    }
  };

  // ────────── Click / tap handler ──────────
  const handleClick = (e) => {
    e.stopPropagation();
    clearLeave();
    if (mode === 'open') {
      setMode('idle');
    } else {
      // Calculate position for the fixed popup (avoids overflow-hidden clipping)
      if (wordRef.current) {
        const rect = wordRef.current.getBoundingClientRect();
        setPopupPos({ top: rect.top, left: rect.left + rect.width / 2 });
      }
      setMode('open');
      // Don't auto-play — let student click 🔊 explicitly to avoid interrupting story narration
    }
  };

  // Keep popup open when mouse moves into it
  const handlePopupMouseEnter = () => clearLeave();
  const handlePopupMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setMode('idle'), 300);
  };

  // ────────── Pronunciation check with browser SpeechRecognition ──────────
  const handleMicClick = (e) => {
    e.stopPropagation();
    if (isRecording) return; // Prevent double-click

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    setIsRecording(true);
    setPronunciationResult(null);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const target = word.toLowerCase();
      const distance = levenshtein(transcript, target);
      
      let score;
      if (transcript === target) {
        score = 'perfect';
      } else if (distance <= 2 && transcript.length >= target.length - 2) {
        score = 'good';
      } else {
        score = 'try-again';
      }

      setPronunciationResult({ score, transcript });
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      if (event.error === 'no-speech') {
        setPronunciationResult({ score: 'try-again', transcript: '(no speech detected)' });
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // ────────── Styling based on tier ──────────
  // Tier 1 (Bold): Target vocab this week
  const tier1Class = `font-black text-${themeColor}-600 text-2xl px-1 rounded border-b-2 border-${themeColor}-200`;
  // Tier 2 (Semi-bold): New academic words (not formally taught yet)
  const tier2Class = `text-xl font-semibold text-${themeColor}-500 border-b border-dotted border-${themeColor}-300`;
  // Tier 3 (Plain): Already learned (taught in previous weeks) — subtle, passive review only
  const tier3Class = `text-xl font-normal text-gray-700 hover:text-${themeColor}-600`;

  const baseClass = tier === 1 ? tier1Class : tier === 2 ? tier2Class : tier3Class;
  const baseClass2 = `cursor-pointer transition-colors`;
  const idleClass = tier === 3 ? '' : `hover:bg-${themeColor}-50/50`;
  const activeClass = `bg-${themeColor}-50`;

  return (
    <>
      {/* ── TẦNG 2: Full popup via Portal (không bị clip bởi overflow-hidden) ── */}
      {mode === 'open' && createPortal(
        <>
          {/* Transparent overlay — click anywhere outside to close */}
          <div
            className="fixed inset-0 z-[9950]"
            onClick={() => setMode('idle')}
          />

          {/* Popup card */}
          <div
            className="fixed z-[9951] animate-in fade-in zoom-in-95 duration-200"
            style={{
              top: popupPos.top,
              left: popupPos.left,
              transform: 'translate(-50%, calc(-100% - 12px))',
            }}
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
          >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 min-w-[210px] max-w-[280px]">
              {/* Header: word + audio */}
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xl font-black text-${themeColor}-700`}>{word}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onSpeak(word); }}
                  className={`p-1.5 bg-${themeColor}-100 text-${themeColor}-700 rounded-full hover:bg-${themeColor}-600 hover:text-white transition-all active:scale-90 flex-shrink-0 ml-2`}
                  title="Nghe phát âm"
                >
                  <Volume2 size={14} />
                </button>
              </div>

              {/* IPA */}
              {entry?.pronounce && (
                <p className="text-xs text-slate-400 font-mono mb-3">{entry.pronounce}</p>
              )}

              <div className={`h-px bg-${themeColor}-50 mb-3`} />

              {/* Vietnamese meaning — main content */}
              {entry?.meaning ? (
                <p className="text-base font-bold text-slate-800 leading-snug">{entry.meaning}</p>
              ) : (
                <p className="text-sm italic text-slate-400">Chưa có trong từ điển</p>
              )}

              {/* Example sentence (preferred) or Definition (fallback) */}
              {entry?.example ? (
                <div className="mt-2 pt-2 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Example:</p>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{entry.example}"
                  </p>
                </div>
              ) : entry?.definition_en ? (
                <div className="mt-2 pt-2 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Definition:</p>
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    {entry.definition_en.split(' ').slice(0, 12).join(' ')}
                    {entry.definition_en.split(' ').length > 12 ? '…' : ''}
                  </p>
                </div>
              ) : null}

              {/* Pronunciation practice */}
              {!isPhrase && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Practice pronunciation:</p>
                  <button
                    onClick={handleMicClick}
                    disabled={isRecording}
                    className={`w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isRecording
                        ? `bg-rose-500 text-white`
                        : `bg-${themeColor}-100 text-${themeColor}-700 hover:bg-${themeColor}-600 hover:text-white active:scale-95`
                    } ${
                      isRecording ? 'animate-pulse' : ''
                    }`}
                  >
                    <Mic size={16} className={isRecording ? 'animate-pulse' : ''} />
                    {isRecording ? 'Listening...' : 'Say it!'}
                  </button>

                  {/* Pronunciation feedback */}
                  {pronunciationResult && (
                    <div className={`mt-2 p-2 rounded-lg text-xs font-bold flex items-center gap-2 animate-in fade-in ${
                      pronunciationResult.score === 'perfect' ? 'bg-green-100 text-green-800' :
                      pronunciationResult.score === 'good' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {pronunciationResult.score === 'perfect' && <><CheckCircle size={14} /> Perfect! 🎉</>}
                      {pronunciationResult.score === 'good' && <><AlertTriangle size={14} /> Almost! Try again 💪</>}
                      {pronunciationResult.score === 'try-again' && <><XCircle size={14} /> Try harder! 🔊</>}
                    </div>
                  )}
                </div>
              )}

              {/* External lookup links */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex gap-2">
                <a
                  href={`https://dictionary.cambridge.org/dictionary/english-vietnamese/${encodeURIComponent(word.toLowerCase())}`}
                  target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 bg-${themeColor}-50 hover:bg-${themeColor}-100 text-${themeColor}-700 rounded-lg text-[10px] font-bold transition-colors`}
                >
                  <BookOpen size={11}/> Cambridge
                </a>
                <a
                  href={`https://dict.laban.vn/find?type=1&query=${encodeURIComponent(word.toLowerCase())}`}
                  target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold transition-colors"
                >
                  <Book size={11}/> Laban
                </a>
              </div>
            </div>
            {/* Caret pointing down toward the word */}
            <div className="w-3 h-3 bg-white border-b border-r border-slate-100 rotate-45 mx-auto -mt-1.5" />
          </div>
        </>,
        document.body
      )}

      {/* ── Word span + hover tooltip ── */}
      <span className="relative inline-block">
        <span
          ref={wordRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className={`${baseClass} ${baseClass2} ${mode !== 'idle' ? activeClass : idleClass}`}
        >
          {word}
        </span>

        {/* ── TẦNG 1: Hover mini tooltip (desktop only, pointer-events-none) ── */}
        {mode === 'hover' && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className={`bg-${themeColor}-700 text-white px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap flex items-center gap-2`}>
              <Volume2 size={12} className="opacity-70" />
              <span className="font-bold text-sm">{word}</span>
              {entry?.pronounce && (
                <span className="text-[11px] font-mono opacity-70">{entry.pronounce}</span>
              )}
              <span className="text-[10px] opacity-60 border-l border-white/30 pl-2">
                👆 Click to learn
              </span>
            </div>
            {/* Caret */}
            <div className={`w-2.5 h-2.5 bg-${themeColor}-700 rotate-45 mx-auto -mt-1.5`} />
          </div>
        )}
      </span>
    </>
  );
};

export default HoverWord;
