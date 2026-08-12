import React, { useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, BookOpen, Book, Mic, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import dictionaryData from '../../data/dictionary.json';

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

const week33DictItems = [
  { word: "broke", meaning: "đã làm vỡ / gãy", pronounce: "/broʊk/", example: "He accidentally broke his alarm clock." },
  { word: "fell", meaning: "đã ngã / rơi", pronounce: "/fɛl/", example: "He fell onto the rug after slipping." },
  { word: "lost", meaning: "đã làm mất", pronounce: "/lɔːst/", example: "Tom lost his backpack on the bus." },
  { word: "found", meaning: "đã tìm thấy", pronounce: "/faʊnd/", example: "Mia found his lost backpack." },
  { word: "slipped", meaning: "đã trượt chân", pronounce: "/slɪpt/", example: "He slipped on a wet puddle." },
  { word: "spilled", meaning: "đã làm đổ / tràn", pronounce: "/spɪld/", example: "He spilled the juice on his desk." },
  { word: "dropped", meaning: "đã đánh rơi", pronounce: "/drɑːpt/", example: "He dropped a glass of orange juice." },
  { word: "apologized", meaning: "đã xin lỗi", pronounce: "/əˈpɑː.lə.dʒaɪzd/", example: "Tom apologized to mom for being clumsy." },
  { word: "repaired", meaning: "đã sửa chữa", pronounce: "/rɪˈpɛrd/", example: "He repaired the broken toy." },
  { word: "searched", meaning: "đã tìm kiếm", pronounce: "/sɜːrtʃt/", example: "Mia searched the bus seat." },
  { word: "clumsy", meaning: "vụng về / bất cẩn", pronounce: "/ˈklʌmzi/", example: "Tom felt clumsy when he woke up late." },
  { word: "puddle", meaning: "vũng nước", pronounce: "/ˈpʌd.əl/", example: "There was a wet puddle on the floor." },
  { word: "backpack", meaning: "chiếc cặp / ba lô", pronounce: "/ˈbæk.pæk/", example: "He left his backpack on the bus." },
  { word: "vase", meaning: "bình hoa", pronounce: "/veɪs/", example: "The ball knocked over the vase." },
  { word: "careful", meaning: "cẩn thận", pronounce: "/ˈkɛr.fəl/", example: "Be careful when walking on wet tiles." },
  { word: "cautious", meaning: "cẩn trọng", pronounce: "/ˈkɑː.ʃəs/", example: "He promised to be more cautious next time." },
  { word: "sorry", meaning: "xin lỗi / hối hận", pronounce: "/ˈsɑː.ri/", example: "Tom said he was sorry for making a mistake." },
  { word: "mistake", meaning: "sai lầm / lỗi", pronounce: "/mɪˈsteɪk/", example: "Everyone makes a clumsy mistake sometimes." },
  { word: "accident", meaning: "sự cố / tai nạn", pronounce: "/ˈæk.sɪ.dənt/", example: "It was just an accident in the morning." },
  { word: "careless", meaning: "bất cẩn", pronounce: "/ˈkɛr.ləs/", example: "Don't be careless with glass." },
  // 10 Lexical Chunks
  { word: "broke an alarm clock", meaning: "làm vỡ đồng hồ báo thức", pronounce: "/broʊk ən əˈlɑːrm klɑːk/", example: "He accidentally broke an alarm clock." },
  { word: "broke his alarm clock", meaning: "làm vỡ đồng hồ báo thức", pronounce: "/broʊk hɪz əˈlɑːrm klɑːk/", example: "He accidentally broke his alarm clock." },
  { word: "slipped on a puddle", meaning: "trượt chân trên vũng nước", pronounce: "/slɪpt ɑːn ə ˈpʌd.əl/", example: "Tom slipped on a puddle on the floor." },
  { word: "slipped on a wet puddle", meaning: "trượt chân trên vũng nước ướt", pronounce: "/slɪpt ɑːn ə wɛt ˈpʌd.əl/", example: "Tom slipped on a wet puddle." },
  { word: "spilled the juice", meaning: "làm đổ nước trái cây", pronounce: "/spɪld ðə dʒuːs/", example: "He spilled the juice on his notebook." },
  { word: "apologized to mom", meaning: "xin lỗi mẹ", pronounce: "/əˈpɑː.lə.dʒaɪzd tuː mɑːm/", example: "Tom apologized to mom." },
  { word: "lost his backpack", meaning: "làm mất chiếc cặp", pronounce: "/lɔːst hɪz ˈbæk.pæk/", example: "He lost his backpack on the bus." },
  { word: "dropped a glass", meaning: "đánh rơi ly nước", pronounce: "/drɑːpt ə ɡlæs/", example: "He dropped a glass of orange juice." },
  { word: "cleaned up carefully", meaning: "cẩn thận dọn dẹp", pronounce: "/kliːnd ʌp ˈkɛr.fə.li/", example: "Tom cleaned up carefully." },
  { word: "damaged a notebook", meaning: "làm hư cuốn vở", pronounce: "/ˈdæm.ɪdʒd ə ˈnoʊt.bʊk/", example: "The liquid damaged a notebook." },
  { word: "damaged his notebook", meaning: "làm hư cuốn vở", pronounce: "/ˈdæm.ɪdʒd hɪz ˈnoʊt.bʊk/", example: "The liquid damaged his notebook." },
  { word: "searched the bus", meaning: "tìm kiếm trên xe buýt", pronounce: "/sɜːrtʃt ðə bʌs/", example: "Mia searched the bus seat." },
  { word: "promised to be cautious", meaning: "hứa sẽ cẩn trọng hơn", pronounce: "/ˈprɑː.mɪst tuː biː ˈkɑː.ʃəs/", example: "Tom promised to be cautious." },
  { word: "fell onto the rug", meaning: "ngã xuống tấm thảm", pronounce: "/fɛl ˈɑːn.tuː ðə rʌɡ/", example: "He fell onto the rug." }
];

// Build dictionary lookup map (shared across all HoverWord instances)
const baseDict = Object.fromEntries(
  (Array.isArray(dictionaryData) ? dictionaryData : []).map(e => [(e.word || '').toLowerCase(), e])
);

const week33Map = Object.fromEntries(
  week33DictItems.map(e => [e.word.toLowerCase(), e])
);

const dictMap = { ...baseDict, ...week33Map };

// Look up a word/phrase in dictionary (handles plurals + past tense)
const lookupDict = (raw) => {
  if (!raw) return null;
  const t = raw.toLowerCase().trim();
  if (dictMap[t]) return dictMap[t];
  if (t.endsWith('s') && dictMap[t.slice(0, -1)]) return dictMap[t.slice(0, -1)];
  if (t.endsWith('ed') && dictMap[t.slice(0, -2)]) return dictMap[t.slice(0, -2)];
  return null;
};

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
  // Auto-lookup in dictionary when entry is not provided by parent
  const resolvedEntry = useMemo(() => entry || lookupDict(word), [entry, word]);
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

  // ────────── Tiered Bolding Styling (Chunks vs Core Words) ──────────
  const isChunk = isPhrase || tier === 1;
  const chunkClass = `font-black text-${themeColor}-800 underline decoration-${themeColor}-300 decoration-dashed cursor-pointer bg-${themeColor}-50 px-1 rounded shadow-sm hover:bg-${themeColor}-100 transition-all`;
  const singleWordClass = `font-semibold text-${themeColor}-600 hover:bg-${themeColor}-50/50 cursor-pointer rounded px-0.5 transition-all`;
  const plainWordClass = `font-normal text-slate-700 hover:text-${themeColor}-600 hover:bg-${themeColor}-50/30 cursor-pointer rounded px-0.5 transition-all`;

  const baseClass = isChunk ? chunkClass : tier <= 2 ? singleWordClass : plainWordClass;
  const baseClass2 = `cursor-pointer transition-colors`;
  const idleClass = isChunk ? 'bg-indigo-50/80' : '';
  const activeClass = `bg-${themeColor}-100 ring-2 ring-${themeColor}-200`;

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
              {resolvedEntry?.pronounce && (
                <p className="text-xs text-slate-400 font-mono mb-3">{resolvedEntry.pronounce}</p>
              )}

              <div className={`h-px bg-${themeColor}-50 mb-3`} />

              {/* Vietnamese meaning — main content */}
              {resolvedEntry?.meaning ? (
                <p className="text-base font-bold text-slate-800 leading-snug">{resolvedEntry.meaning}</p>
              ) : (
                <p className="text-sm italic text-slate-400">Chưa có trong từ điển</p>
              )}

              {/* Example sentence (preferred) or Definition (fallback) */}
              {resolvedEntry?.example ? (
                <div className="mt-2 pt-2 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Example:</p>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &ldquo;{resolvedEntry.example}&rdquo;
                  </p>
                </div>
              ) : resolvedEntry?.definition_en ? (
                <div className="mt-2 pt-2 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Definition:</p>
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    {resolvedEntry.definition_en.split(' ').slice(0, 12).join(' ')}
                    {resolvedEntry.definition_en.split(' ').length > 12 ? '…' : ''}
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
              {resolvedEntry?.pronounce && (
                <span className="text-[11px] font-mono opacity-70">{resolvedEntry.pronounce}</span>
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
