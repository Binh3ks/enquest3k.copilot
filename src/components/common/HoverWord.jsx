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

// Target Week 33 dictionary map (from WEEK_33_MASTER_DICTIONARY)
const week33Map = Object.fromEntries(
  Object.entries(WEEK_33_MASTER_DICTIONARY).map(([word, item]) => [
    word.toLowerCase().trim(),
    {
      word,
      pronounce: item.ipa,
      meaning: item.meaning,
      example: item.example,
      type: item.type,
      audioText: item.audioText || word
    }
  ])
);

// Full combined dictionary lookup map
const dictMap = { ...baseDict, ...week33Map };

// Robust dictionary entry resolver (handles stem variations, plurals, past tense)
export const lookupDict = (raw) => {
  if (!raw) return null;
  const clean = raw.replace(/^[^\w']+|[^\w']+$ /g, '').toLowerCase().trim();
  if (!clean) return null;

  if (dictMap[clean]) return dictMap[clean];
  if (clean.endsWith('s') && dictMap[clean.slice(0, -1)]) return dictMap[clean.slice(0, -1)];
  if (clean.endsWith('es') && dictMap[clean.slice(0, -2)]) return dictMap[clean.slice(0, -2)];
  if (clean.endsWith('ed') && dictMap[clean.slice(0, -2)]) return dictMap[clean.slice(0, -2)];
  if (clean.endsWith('ing') && dictMap[clean.slice(0, -3)]) return dictMap[clean.slice(0, -3)];
  if (clean.endsWith('ing') && dictMap[clean.slice(0, -3) + 'e']) return dictMap[clean.slice(0, -3) + 'e'];

  return null;
};

/**
 * Universal Text & Chunk Parser (100% Word Wrapping + Fallback Dictionary Engine)
 *
 * Layer 1 (Strict Master Whitelist for Multi-Word Chunks):
 * Multi-word phrases containing spaces MUST strictly exist in WEEK_33_MASTER_DICTIONARY!
 * Zero non-target phrases (like "our class", "walk down") will EVER be chunked!
 *
 * Layer 2 (Universal 100% Single Word Wrapping):
 * ALL remaining English words (/^[a-zA-Z0-9'-]+$/) are 100% wrapped in <HoverWord>.
 * Target W33 words get tier 1 (highlighted indigo + dotted underline).
 * All general words get tier 3 (natural text style, 100% clickable for popover dictionary + TTS fallback).
 */
export function renderParsedText(text, themeColor = 'indigo', onSpeak = null) {
  if (!text) return null;

  // Layer 1: Strict Whitelist for Multi-Word Chunks (phrases containing spaces)
  const sortedPhrases = Object.keys(week33Map)
    .filter((k) => k.includes(' '))
    .sort((a, b) => b.length - a.length);

  // Step 2: Build master regex for markdown bold **...** OR whitelisted multi-word phrases ONLY
  const escapedPhrases = sortedPhrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
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
    const isMatchedPhrase = sortedPhrases.includes(cleanSegment);

    if (isMarkdownBold || isMatchedPhrase) {
      const phraseWord = segment.replace(/\*\*/g, '').trim();
      parts.push(
        <HoverWord
          key={`chunk-${key++}`}
          word={phraseWord}
          themeColor={themeColor}
          onSpeak={onSpeak}
          tier={1}
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
          const isTarget = Boolean(week33Map[cleanW] || WEEK_33_MASTER_DICTIONARY[cleanW]);

          parts.push(
            <HoverWord
              key={`word-${key++}`}
              word={token}
              themeColor={themeColor}
              onSpeak={onSpeak}
              tier={isTarget ? 1 : 3}
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
 * HoverWord — Clickable Word/Phrase with Universal Dictionary & TTS Fallback Entry
 *
 * Tier 1 (Bold Target): Target collocations & core words (W33) — bold indigo + dotted underline
 * Tier 3 (General Word): All general words — natural text style, 100% clickable for popover dictionary
 */
const HoverWord = ({ word, themeColor = 'indigo', onSpeak, entry, tier = 3, children }) => {
  const cleanKey = (word || '').toLowerCase().trim();

  // Automatic Fallback Entry Generator: Guarantees 100% of all words are clickable & playable!
  const resolvedEntry = useMemo(() => {
    if (entry) return entry;

    const dictItem = week33Map[cleanKey] || baseDict[cleanKey] || lookupDict(word);
    if (dictItem) {
      return {
        word,
        pronounce: dictItem.ipa || dictItem.pronounce || dictItem.pronunciation,
        meaning: dictItem.meaning || dictItem.definition_vi || dictItem.definition,
        example: dictItem.example,
        type: dictItem.type || 'Word',
        audioText: dictItem.audioText || dictItem.word || cleanKey
      };
    }

    // FALLBACK ENTRY: Always exists so no word is ever dead/unclickable!
    return {
      word,
      pronounce: `/${cleanKey}/`,
      meaning: "Chạm để nghe phát âm, hoặc tra cứu thêm trên từ điển ngoài.",
      example: `"${word}" is used in school context.`,
      audioText: cleanKey,
      type: "Word"
    };
  }, [entry, word, cleanKey]);

  const [mode, setMode] = useState('idle'); // idle | open
  const isPhrase = word.trim().includes(' ');
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

  // Tier 1 vs Tier 3 styling
  const isTarget = isPhrase || tier === 1;
  const targetClass = `text-indigo-600 font-bold underline decoration-dotted cursor-pointer hover:text-indigo-800 transition-colors`;
  const generalWordClass = `font-medium text-slate-800 hover:text-indigo-600 hover:bg-indigo-50/50 cursor-pointer rounded px-[1px] transition-all`;

  const className = isTarget ? targetClass : generalWordClass;

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
                  <span className="text-base font-black text-indigo-700 truncate">{word}</span>
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
