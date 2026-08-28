import React, { useState, useRef, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, BookOpen, Book, Mic, Loader2 } from 'lucide-react';
import dictionaryData from '../../data/dictionary.json';
import { WEEK_33_MASTER_DICTIONARY } from '../../data/weeks/week_33/vocab_dictionary_master';
import VoiceService from '../../services/voiceService';

// ─── Free Dictionary API + Vietnamese Translation (MyMemory) ─────────────────
const apiCache = new Map(); // word → entry | null

async function fetchViTranslation(word) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const vi = data?.responseData?.translatedText || '';
    // Reject bad/unchanged translations
    if (!vi || vi === word || /PLEASE SELECT/i.test(vi) || /\d{3}/.test(vi)) return null;
    return vi;
  } catch { return null; }
}

async function fetchFreeDictionary(word) {
  const key = word.toLowerCase().trim();
  if (apiCache.has(key)) return apiCache.get(key);

  try {
    const [dictRes, viMeaning] = await Promise.all([
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`),
      fetchViTranslation(key),
    ]);

    if (!dictRes.ok) { apiCache.set(key, null); return null; }
    const data = await dictRes.json();
    if (!Array.isArray(data) || !data[0]) { apiCache.set(key, null); return null; }

    const entry = data[0];
    const meaning = entry.meanings?.[0];
    const def = meaning?.definitions?.[0];
    const phonetic = entry.phonetic ||
      entry.phonetics?.find(p => p.text)?.text || '';

    const result = {
      word: entry.word,
      type: meaning?.partOfSpeech || 'word',
      pronounce: phonetic,
      meaning: def?.definition || '',
      meaning_vi: viMeaning || '',   // Vietnamese translation
      example: def?.example || '',
      audioText: entry.word,
      _source: 'api',
    };
    apiCache.set(key, result);
    return result;
  } catch {
    apiCache.set(key, null);
    return null;
  }
}

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
 * @param {string} highlightMode - 'clean' | 'vocab' | 'grammar' (default: 'vocab' for backward compat)
 * @param {Array} targetGrammarRegex - Array of { pattern: string, label: string, color: string } for Grammar X-Ray mode
 */
export function renderParsedText(text, themeColor = 'indigo', onSpeak = null, isStealthMode = false, highlightMode = 'vocab', targetGrammarRegex = []) {
  if (!text) return null;

  // 1. Collect explicit target patterns (either string chunks or { pattern, label } objects)
  const explicitChunks = [];
  if (Array.isArray(targetGrammarRegex)) {
    targetGrammarRegex.forEach(p => {
      if (typeof p === 'string' && p.trim()) {
        explicitChunks.push(p.trim());
      } else if (p && typeof p.pattern === 'string' && p.pattern.trim()) {
        explicitChunks.push(p.pattern.trim());
      }
    });
  }

  // Sort explicit chunks by length descending
  explicitChunks.sort((a, b) => b.length - a.length);

  // Build regex patterns for matching
  const chunkRegexes = explicitChunks.map(c => {
    if (c.includes('\\b') || c.includes('(') || c.includes('|')) return c;
    return '\\b' + c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '\\b';
  });

  const shouldHighlightChunks = highlightMode === 'vocab' || highlightMode === 'grammar';
  const masterPattern = (shouldHighlightChunks && chunkRegexes.length > 0)
    ? `(\\*{2}.*?\\*{2}|${chunkRegexes.join('|')})`
    : `(\\*{2}.*?\\*{2})`;

  let masterRegex;
  try {
    masterRegex = new RegExp(masterPattern, 'gi');
  } catch (_) {
    masterRegex = /(\*{2}.*?\*{2})/gi;
  }

  const segments = text.split(masterRegex);
  let key = 0;
  const parts = [];

  for (const segment of segments) {
    if (!segment) continue;

    const cleanSegment = segment.replace(/\*\*/g, '').trim();
    const isMarkdownBold = segment.startsWith('**') && segment.endsWith('**');
    const isTargetMatch = shouldHighlightChunks && (isMarkdownBold || chunkRegexes.some(r => {
      try { return new RegExp('^' + r + '$', 'i').test(cleanSegment); } catch (_) { return false; }
    }));

    if (isTargetMatch) {
      const phraseWord = cleanSegment;
      const matchedBaseKey = phraseLookupMap[phraseWord.toLowerCase()] || phraseWord;
      const entry = WEEK_33_MASTER_DICTIONARY[matchedBaseKey] || lookupDict(phraseWord);

      let targetTier = 3;
      if (!isStealthMode) {
        if (highlightMode === 'grammar') targetTier = 4;
        else if (highlightMode === 'vocab') targetTier = 1;
      }

      parts.push(
        <HoverWord
          key={`target-${key++}`}
          word={phraseWord}
          themeColor={highlightMode === 'grammar' ? 'amber' : themeColor}
          onSpeak={onSpeak}
          entry={entry}
          tier={targetTier}
        />
      );
    } else {
      // Tokenize into words and punctuation
      const tokens = segment.split(/([a-zA-Z0-9'-]+)/g);

      tokens.forEach((token) => {
        if (!token) return;

        // English word: wrap in HoverWord with tier = 3 (clean, unhighlighted, but 100% interactive)
        if (/^[a-zA-Z0-9'-]+$/.test(token)) {
          const cleanW = token.toLowerCase().trim();
          const matchedBaseKey = phraseLookupMap[cleanW];
          const entry = matchedBaseKey ? WEEK_33_MASTER_DICTIONARY[matchedBaseKey] : lookupDict(token);

          parts.push(
            <HoverWord
              key={`word-${key++}`}
              word={token}
              themeColor={themeColor}
              onSpeak={onSpeak}
              entry={entry}
              tier={3}
            />
          );
        } else {
          // Plain whitespace and punctuation
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

    // FALLBACK ENTRY: Guarantees every word is 100% clickable & playable with clean ESL message!
    return {
      word,
      pronounce: `/${cleanKey}/`,
      meaning: `Từ vựng tiếng Anh "${word}". Chạm nút 🔊 để nghe phát âm chuẩn hoặc tra cứu thêm từ điển ngoài.`,
      example: null,
      audioText: cleanKey,
      type: "Word"
    };
  }, [entry, word, cleanKey]);

  const [mode, setMode] = useState('idle'); // idle | open
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const wordRef = useRef(null);

  // API fetch state
  const [apiEntry, setApiEntry] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  // True if the local entry is only the generic fallback (no real data)
  const hasLocalEntry = Boolean(
    entry && (entry.meaning || entry.definition_vi || entry.definition) &&
    !(entry.meaning || '').startsWith('Từ vựng tiếng Anh')
  ) || Boolean(
    resolvedEntry && !resolvedEntry.meaning?.startsWith('Từ vựng tiếng Anh')
  );

  // Fetch from Free Dictionary API when popup opens without a real local entry
  useEffect(() => {
    if (mode !== 'open') return;
    if (hasLocalEntry) return; // already have a real local entry
    const clean = (word || '').toLowerCase().replace(/[^a-z'-]/g, '');
    if (!clean || clean.length < 2) return;

    // Check cache first (synchronous)
    if (apiCache.has(clean)) {
      setApiEntry(apiCache.get(clean));
      return;
    }

    setApiLoading(true);
    fetchFreeDictionary(clean).then(result => {
      setApiEntry(result);
      setApiLoading(false);
    });
  }, [mode, word, hasLocalEntry]);

  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationResult, setPronunciationResult] = useState(null);
  const recognitionRef = useRef(null);

  const handleClose = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (_) {}
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setMode('idle');
  };

  // ────────── Click / tap handler ──────────
  const handleClick = (e) => {
    e.stopPropagation();
    if (mode === 'open') {
      handleClose();
    } else {
      if (wordRef.current) {
        const rect = wordRef.current.getBoundingClientRect();
        const popupW = Math.min(290, window.innerWidth - 32);
        const rawLeft = rect.left + rect.width / 2;
        const minLeft = popupW / 2 + 16;
        const maxLeft = window.innerWidth - (popupW / 2) - 16;
        const clampedLeft = Math.max(minLeft, Math.min(maxLeft, rawLeft));

        const isNearTop = rect.top < 240;
        const topPos = isNearTop ? rect.bottom + 10 : rect.top - 10;
        const transformY = isNearTop ? '0%' : '-100%';

        setPopupPos({
          top: topPos,
          left: clampedLeft,
          transform: `translate(-50%, ${transformY})`,
        });
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
    recognitionRef.current = recognition;

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

  // Tier 1 = Vocab target, Tier 3 = General word, Tier 4 = Grammar X-Ray highlight
  const isTarget = tier === 1;
  const isGrammar = tier === 4;
  const targetClass = `text-indigo-600 font-bold underline decoration-dotted cursor-pointer hover:text-indigo-800 transition-colors highlight-target`;
  const grammarClass = `font-semibold text-amber-800 bg-amber-100/80 rounded px-0.5 cursor-pointer hover:bg-amber-200 transition-all border-b-2 border-amber-300 highlight-grammar`;
  const generalWordClass = `font-medium text-slate-800 hover:text-indigo-600 hover:bg-indigo-50/50 cursor-pointer rounded px-[1px] transition-all`;

  const className = isGrammar ? grammarClass : (isTarget ? targetClass : generalWordClass);

  const displayTitle = resolvedEntry?.word || word;

  return (
    <>
      {/* Popover Portal */}
      {mode === 'open' && createPortal(
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[9950]"
            onClick={handleClose}
          />

          {/* Popup Card */}
          <div
            className="fixed z-[9951] animate-in fade-in zoom-in-95 duration-200"
            style={{
              top: popupPos.top,
              left: popupPos.left,
              transform: popupPos.transform || 'translate(-50%, -100%)',
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 sm:p-4 min-w-[240px] max-w-[290px]">
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
              {(resolvedEntry?.pronounce || resolvedEntry?.ipa || (apiEntry?.pronounce && !hasLocalEntry)) && (
                <p className="text-xs font-mono text-slate-500 mb-2">
                  {(!hasLocalEntry && apiEntry?.pronounce) ? apiEntry.pronounce : (resolvedEntry.pronounce || resolvedEntry.ipa)}
                </p>
              )}

              {/* Loading skeleton */}
              {apiLoading && !hasLocalEntry && (
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-2 flex items-center gap-2">
                  <Loader2 size={13} className="animate-spin text-indigo-400" />
                  <span className="text-xs text-slate-400 italic">Looking up example...</span>
                </div>
              )}

              {/* API entry: VI meaning (primary) → EN example → EN definition */}
              {!apiLoading && !hasLocalEntry && apiEntry && (
                <>
                  {/* Vietnamese meaning — primary bold card */}
                  {apiEntry.meaning_vi ? (
                    <div className="p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-100 mb-1.5">
                      {apiEntry.type && (
                        <span className="text-[9px] font-black uppercase text-indigo-500 block mb-1">{apiEntry.type}</span>
                      )}
                      <p className="text-xs font-black text-indigo-950 leading-snug">{apiEntry.meaning_vi}</p>
                    </div>
                  ) : apiEntry.meaning ? (
                    /* No VI translation — show EN definition as fallback primary */
                    <div className="p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-100 mb-1.5">
                      {apiEntry.type && (
                        <span className="text-[9px] font-black uppercase text-indigo-500 block mb-1">{apiEntry.type}</span>
                      )}
                      <p className="text-xs font-black text-indigo-950 leading-snug">{apiEntry.meaning}</p>
                    </div>
                  ) : null}
                  {/* English example sentence */}
                  {apiEntry.example && (
                    <p className="text-xs text-slate-600 italic leading-snug px-0.5 mb-1">
                      &ldquo;{apiEntry.example}&rdquo;
                    </p>
                  )}
                  {/* English definition — small secondary (only shown when we have VI) */}
                  {apiEntry.meaning_vi && apiEntry.meaning && (
                    <p className="text-[10px] text-slate-400 leading-snug px-0.5">{apiEntry.meaning}</p>
                  )}
                </>
              )}

              {/* Local entry: Vietnamese meaning primary + English example */}
              {hasLocalEntry && (resolvedEntry?.meaning || resolvedEntry?.definition_vi) && (
                <div className="p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-100 mb-2">
                  <p className="text-xs font-black text-indigo-950 leading-snug">
                    {resolvedEntry.meaning || resolvedEntry.definition_vi}
                  </p>
                </div>
              )}
              {hasLocalEntry && resolvedEntry?.example && (
                <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Example:</p>
                  <p className="text-xs text-slate-600 leading-relaxed italic">&ldquo;{resolvedEntry.example}&rdquo;</p>
                </div>
              )}

              {/* No data at all */}
              {!apiLoading && !hasLocalEntry && !apiEntry && (
                <p className="text-xs text-slate-400 italic text-center py-1">No example found. Try Cambridge ↓</p>
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
