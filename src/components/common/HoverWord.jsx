import React, { useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, BookOpen, Book, Mic, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import dictionaryData from '../../data/dictionary.json';
import { WEEK_33_MASTER_DICTIONARY } from '../../data/weeks/week_33/vocab_dictionary_master';
import VoiceService from '../../services/voiceService';

// Base general English dictionary map (from dictionary.json)
const baseDict = Object.fromEntries(
  (Array.isArray(dictionaryData) ? dictionaryData : []).map((e) => [
    (e.word || '').toLowerCase().trim(),
    e
  ])
);

// 1. Build Reverse Lookup Map for Phrases & Words (Base Keys + Aliases)
const phraseLookupMap = {};

Object.keys(WEEK_33_MASTER_DICTIONARY).forEach((baseKey) => {
  const entry = WEEK_33_MASTER_DICTIONARY[baseKey];
  phraseLookupMap[baseKey.toLowerCase().trim()] = baseKey;

  if (entry.aliases && Array.isArray(entry.aliases)) {
    entry.aliases.forEach((alias) => {
      phraseLookupMap[alias.toLowerCase().trim()] = baseKey;
    });
  }
});

// Full combined dictionary lookup map
const dictMap = { ...baseDict, ...phraseLookupMap };

// Robust dictionary entry resolver (handles stem variations, plurals, past tense)
export const lookupDict = (raw) => {
  if (!raw) return null;
  const clean = raw.replace(/^[^\w']+|[^\w']+$ /g, '').toLowerCase().trim();
  if (!clean) return null;

  const matchedBaseKey = phraseLookupMap[clean];
  if (matchedBaseKey && WEEK_33_MASTER_DICTIONARY[matchedBaseKey]) {
    return WEEK_33_MASTER_DICTIONARY[matchedBaseKey];
  }

  if (dictMap[clean]) return dictMap[clean];
  if (clean.endsWith('s') && dictMap[clean.slice(0, -1)]) return dictMap[clean.slice(0, -1)];
  if (clean.endsWith('es') && dictMap[clean.slice(0, -2)]) return dictMap[clean.slice(0, -2)];
  if (clean.endsWith('ed') && dictMap[clean.slice(0, -2)]) return dictMap[clean.slice(0, -2)];
  if (clean.endsWith('ing') && dictMap[clean.slice(0, -3)]) return dictMap[clean.slice(0, -3)];
  if (clean.endsWith('ing') && dictMap[clean.slice(0, -3) + 'e']) return dictMap[clean.slice(0, -3) + 'e'];

  return null;
};

/**
 * Universal Text & Chunk Parser (Stealth Mode & Morphological Alias Mapping Engine)
 *
 * @param {string} text - Text to parse
 * @param {string} themeColor - Color theme (default 'indigo')
 * @param {function} onSpeak - Custom speak handler
 * @param {boolean} isStealthMode - If true, forces tier=3 (natural text style) for ALL words & chunks so NO answers leak in tests!
 */
export function renderParsedText(text, themeColor = 'indigo', onSpeak = null, isStealthMode = false) {
  if (!text) return null;

  // 2. Filter all multi-word phrases (Base + Aliases containing spaces) sorted by length descending
  const allPhrases = Object.keys(phraseLookupMap)
    .filter((k) => k.includes(' '))
    .sort((a, b) => b.length - a.length);

  // Step 2: Build master regex for markdown bold **...** OR whitelisted multi-word phrases/aliases ONLY
  const escapedPhrases = allPhrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const masterRegex = escapedPhrases.length > 0
    ? new RegExp(`(\\*{2}.*?\\*{2}|${escapedPhrases.join('|')})`, 'gi')
    : /(\*{2}.*?\*{2})/gi;

  // Step 3: Parse text segments
  const segments = text.split(masterRegex);
  let key = 0;
  const parts = [];

  for (const segment of segments) {
    if (!segment) continue;

    const cleanSegment = segment.replace(/\*\*/g, '').trim().toLowerCase();
    const isMarkdownBold = segment.startsWith('**') && segment.endsWith('**');
    const isMatchedPhrase = allPhrases.includes(cleanSegment);

    if (isMarkdownBold || isMatchedPhrase) {
      const phraseWord = segment.replace(/\*\*/g, '').trim();
      const matchedBaseKey = phraseLookupMap[phraseWord.toLowerCase()] || phraseWord;
      const entry = WEEK_33_MASTER_DICTIONARY[matchedBaseKey] || lookupDict(phraseWord);

      parts.push(
        <HoverWord
          key={`chunk-${key++}`}
          word={phraseWord}
          themeColor={themeColor}
          onSpeak={onSpeak}
          entry={entry}
          tier={isStealthMode ? 3 : 1}
        />
      );
    } else {
      // Tokenize into words and punctuation
      const tokens = segment.split(/([a-zA-Z0-9'-]+)/g);

      tokens.forEach((token) => {
        if (!token) return;

        // If English word (letters, numbers, hyphens) -> WRAP 100% IN HOVERWORD
        if (/^[a-zA-Z0-9'-]+$/.test(token)) {
          const cleanW = token.toLowerCase().trim();
          const matchedBaseKey = phraseLookupMap[cleanW];
          const isTarget = Boolean(matchedBaseKey);
          const entry = isTarget ? WEEK_33_MASTER_DICTIONARY[matchedBaseKey] : lookupDict(token);

          parts.push(
            <HoverWord
              key={`word-${key++}`}
              word={token}
              themeColor={themeColor}
              onSpeak={onSpeak}
              entry={entry}
              tier={isStealthMode ? 3 : (isTarget ? 1 : 3)}
            />
          );
        } else {
          // Plain text only for whitespace and punctuation (.,!?)
          parts.push(<span key={`space-${key++}`}>{token}</span>);
        }
      });
    }
  }

  return parts;
}

/**
 * HoverWord — Clickable Word/Phrase with Universal Dictionary & Morphological Alias Resolver
 */
const HoverWord = ({ word, themeColor = 'indigo', onSpeak, entry, tier = 3, children }) => {
  const cleanKey = (word || '').toLowerCase().trim();

  // Automatic Alias & Fallback Entry Generator (Never displays empty meaning or "chưa có nghĩa")
  const resolvedEntry = useMemo(() => {
    if (entry && (entry.meaning || entry.definition_vi || entry.definition)) return entry;

    const matchedBaseKey = phraseLookupMap[cleanKey];
    const dictItem = (matchedBaseKey && WEEK_33_MASTER_DICTIONARY[matchedBaseKey]) ||
                      baseDict[cleanKey] ||
                      lookupDict(word);

    if (dictItem && (dictItem.meaning || dictItem.definition_vi || dictItem.definition)) {
      return {
        word: dictItem.word || word,
        pronounce: dictItem.ipa || dictItem.pronounce || dictItem.pronunciation,
        meaning: dictItem.meaning || dictItem.definition_vi || dictItem.definition,
        example: dictItem.example,
        type: dictItem.type || 'Word',
        audioText: dictItem.audioText || dictItem.word || cleanKey
      };
    }

    // FALLBACK ENTRY: Guarantees every word is 100% clickable & playable with rich ESL message!
    return {
      word,
      pronounce: `/${cleanKey}/`,
      meaning: `Từ vựng tiếng Anh "${word}". Chạm để nghe phát âm chuẩn hoặc tra từ điển ngoài.`,
      example: `"${word}" is used in school context.`,
      audioText: cleanKey,
      type: "Word"
    };
  }, [entry, word, cleanKey]);

  const [mode, setMode] = useState('idle'); // idle | open
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const wordRef = useRef(null);

  // Pronunciation check state
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationResult, setPronunciationResult] = useState(null);

  // ────────── Click / tap handler ──────────
  const handleClick = (e) => {
    e.stopPropagation();
    if (mode === 'open') {
      setMode('idle');
    } else {
      if (wordRef.current) {
        const rect = wordRef.current.getBoundingClientRect();
        setPopupPos({ top: rect.top, left: rect.left + rect.width / 2 });
      }
      setMode('open');
    }
  };

  // ────────── Pronunciation check with browser SpeechRecognition ──────────
  const handleMicClick = (e) => {
    e.stopPropagation();
    if (isRecording) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      setPronunciationResult(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const target = word.toLowerCase().trim();
      const isMatch = transcript === target || target.includes(transcript) || transcript.includes(target);

      setPronunciationResult({
        score: isMatch ? 'perfect' : 'good',
        transcript
      });
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setPronunciationResult({ score: 'try-again', transcript: 'Try again' });
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Tier 1 vs Tier 3 styling (STRICTLY OBEYS TIER = 1 VS TIER = 3 SO STEALTH MODE NEVER LEAKS)
  const isTarget = tier === 1;
  const targetClass = `text-indigo-600 font-bold underline decoration-dotted cursor-pointer hover:text-indigo-800 transition-colors`;
  const generalWordClass = `font-medium text-slate-800 hover:text-indigo-600 hover:bg-indigo-50/50 cursor-pointer rounded px-[1px] transition-all`;

  const className = isTarget ? targetClass : generalWordClass;

  const displayTitle = resolvedEntry?.word || word;

  return (
    <>
      {/* Popover Portal */}
      {mode === 'open' && createPortal(
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[9950]"
            onClick={() => setMode('idle')}
          />

          {/* Popup Card */}
          <div
            className="fixed z-[9951] animate-in fade-in zoom-in-95 duration-200"
            style={{
              top: popupPos.top,
              left: popupPos.left,
              transform: 'translate(-50%, calc(-100% - 12px))',
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 min-w-[220px] max-w-[300px]">
              {/* Header: word + type + audio */}
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-base font-black text-indigo-700 truncate">{displayTitle}</span>
                  {resolvedEntry?.type && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                      {resolvedEntry.type}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSpeak) onSpeak(word);
                    else VoiceService.speak(resolvedEntry?.audioText || word, 'vocab');
                  }}
                  className="p-1.5 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-600 hover:text-white transition-all active:scale-90 flex-shrink-0"
                  title="Play Audio"
                >
                  <Volume2 size={15} />
                </button>
              </div>

              {/* IPA */}
              {(resolvedEntry?.pronounce || resolvedEntry?.ipa) && (
                <p className="text-xs font-mono text-slate-500 mb-2">
                  {resolvedEntry.pronounce || resolvedEntry.ipa}
                </p>
              )}

              {/* Meaning */}
              {(resolvedEntry?.meaning || resolvedEntry?.definition_vi) && (
                <div className="p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-100 mb-2">
                  <p className="text-xs font-black text-indigo-950 leading-snug">
                    {resolvedEntry.meaning || resolvedEntry.definition_vi}
                  </p>
                </div>
              )}

              {/* Contextual Example */}
              {resolvedEntry?.example && (
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Example:</p>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &ldquo;{resolvedEntry.example}&rdquo;
                  </p>
                </div>
              )}

              {/* Pronunciation Practice */}
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <button
                  onClick={handleMicClick}
                  disabled={isRecording}
                  className={`w-full py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white active:scale-95'
                  }`}
                >
                  <Mic size={14} />
                  {isRecording ? 'Listening...' : 'Practice Speaking'}
                </button>
                {pronunciationResult && (
                  <div className="mt-1.5 p-1.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-bold text-center">
                    ✓ Pronounced: "{pronunciationResult.transcript}"
                  </div>
                )}
              </div>

              {/* External dictionary links */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex gap-2">
                <a
                  href={`https://dictionary.cambridge.org/dictionary/english-vietnamese/${encodeURIComponent(word.toLowerCase())}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 rounded text-[10px] font-bold transition-colors"
                >
                  <BookOpen size={11} /> Cambridge
                </a>
                <a
                  href={`https://dict.laban.vn/find?type=1&query=${encodeURIComponent(word.toLowerCase())}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 rounded text-[10px] font-bold transition-colors"
                >
                  <Book size={11} /> Laban
                </a>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Inline Word Element */}
      <span
        ref={wordRef}
        onClick={handleClick}
        className={className}
      >
        {word}
      </span>
    </>
  );
};

export default HoverWord;
