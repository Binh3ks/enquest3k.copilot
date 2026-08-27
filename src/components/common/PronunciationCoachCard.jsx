import React, { useState } from 'react';
import { Sparkles, Lightbulb, Volume2, ArrowDownRight, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Built-in phonetic dictionary for high-frequency A1/A2 Cambridge story words
 */
const COMMON_WORD_IPA = {
  'jake': 'dʒeɪk', 'was': 'wəz', 'walking': 'ˈwɔːk-ɪŋ', 'carefully': 'ˈkeə-fə-li',
  'down': 'daʊn', 'the': 'ðə', 'school': 'skuːl', 'corridor': 'ˈkɒr-ɪ-dɔː',
  'corridors': 'ˈkɒr-ɪ-dɔːz', 'after': 'ˈɑːf-tə', 'science': 'ˈsaɪ-əns', 'class': 'klɑːs',
  'suddenly': 'ˈsʌd-ən-li', 'a': 'ə', 'an': 'ən', 'boy': 'bɔɪ', 'running': 'ˈrʌn-ɪŋ',
  'fast': 'fɑːst', 'slipped': 'slɪpt', 'on': 'ɒn', 'wet': 'wet', 'floor': 'flɔː',
  'and': 'ənd', 'fell': 'fel', 'heavily': 'ˈhev-ɪ-li', 'he': 'hiː', 'hurt': 'hɜːt',
  'his': 'hɪz', 'knee': 'niː', 'lost': 'lɒst', 'balance': 'ˈbæl-əns',
  'completely': 'kəm-ˈpliːt-li', 'stopped': 'stɒpt', 'immediately': 'ɪ-ˈmiː-di-ət-li',
  'to': 'tuː', 'help': 'help', 'friend': 'frend', 'stay': 'steɪ', 'calm': 'kɑːm',
  'called': 'kɔːld', 'nurse': 'nɜːs', 'right': 'raɪt', 'away': 'ə-ˈweɪ',
  'arrived': 'ə-ˈraɪvd', 'quickly': 'ˈkwɪk-li', 'with': 'wɪð', 'clean': 'kliːn',
  'bandage': 'ˈbæn-dɪdʒ', 'cold': 'kəʊld', 'pack': 'pæk', 'treat': 'triːt',
  'cut': 'kʌt', 'everyone': 'ˈev-ri-wʌn', 'felt': 'felt', 'relieved': 'rɪ-ˈliːvd',
  'praised': 'preɪzd', 'for': 'fɔː', 'following': 'ˈfɒl-əʊ-ɪŋ', 'safety': 'ˈseɪf-ti',
  'rules': 'ruːlz', 'headmaster': 'ˈhed-ˌmɑːs-tə', 'reminded': 'rɪ-ˈmaɪn-dɪd',
  'all': 'ɔːl', 'students': 'ˈstjuː-dənts', 'never': 'ˈnev-ə', 'run': 'rʌn', 'in': 'ɪn',
  'friction': 'ˈfrɪk-ʃən', 'smooth': 'smuːð', 'tiles': 'taɪlz', 'shoes': 'ʃuːz',
  'rubber': 'ˈrʌb-ə', 'grip': 'grɪp', 'surface': 'ˈsɜː-fɪs', 'warning': 'ˈwɔː-nɪŋ'
};

/**
 * Break sentence into semantic ESL Chunks (Linear Thinking)
 */
export function getSentenceChunks(sentence) {
  if (!sentence) return [];
  const rawParts = sentence.split(/([,.;!?]|\s+(?:down|in|on|at|after|before|with|from|to|into|through|during|because|and|but|suddenly|while|when)\b)/gi);
  const chunks = [];
  let currentChunk = '';

  for (let i = 0; i < rawParts.length; i++) {
    const part = rawParts[i];
    if (!part) continue;
    
    if (/^\s+(?:down|in|on|at|after|before|with|from|to|into|through|during|because|and|but|suddenly|while|when)\b/i.test(part)) {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = part.trim();
    } else if (/^[,.;!?]$/.test(part.trim())) {
      currentChunk += part;
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
    } else {
      currentChunk += (currentChunk ? ' ' : '') + part.trim();
    }
  }
  if (currentChunk.trim()) chunks.push(currentChunk.trim());

  return chunks.length >= 2 ? chunks : [sentence.trim()];
}

/**
 * Extract word-by-word IPA and Capitalized Stress
 */
export function getWordIpaList(sentence, fullIpaString = null) {
  if (!sentence) return [];
  const words = sentence.trim().split(/\s+/);
  let ipaTokens = [];
  if (fullIpaString) {
    ipaTokens = fullIpaString.replace(/^\/|\/$/g, '').trim().split(/\s+/);
  }

  return words.map((rawWord, idx) => {
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z']/g, '');
    let rawIpa = ipaTokens[idx] || COMMON_WORD_IPA[cleanWord] || '';

    const isStressed = rawIpa.includes('ˈ') || rawIpa.includes('ˌ') || cleanWord.length >= 6;

    return {
      word: rawWord,
      cleanWord,
      ipa: rawIpa ? `/${rawIpa}/` : '',
      isStressed
    };
  });
}

/**
 * Analyze sentence phonetics for bilingual Zero-L1 coaching
 */
export function analyzeSentencePhonetics(sentence, customIpa = null) {
  if (!sentence) return null;

  const isQuestion = sentence.trim().endsWith('?');
  const isWhQuestion = isQuestion && /^(what|where|when|why|who|how|which|whose)/i.test(sentence.trim());
  const isYesNoQuestion = isQuestion && !isWhQuestion;

  const chunks = getSentenceChunks(sentence);
  const wordIpaList = getWordIpaList(sentence, customIpa);

  // Capitalize stress in full IPA
  let formattedIpa = customIpa;
  if (formattedIpa) {
    formattedIpa = formattedIpa.replace(/ˈ([a-zA-Zɔæɑʊɪʌəɛɜː]+)/g, (_, syl) => `ˈ${syl.toUpperCase()}`);
  }

  // Bilingual Coaching Tips (Zero-L1: English first, Vietnamese hint underneath)
  const phoneticTips = [];
  const words = sentence.trim().split(/\s+/);

  words.forEach(rawWord => {
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z]/g, '');
    
    if (cleanWord.endsWith('ing') && !phoneticTips.some(t => t.id === 'ing')) {
      phoneticTips.push({
        id: 'ing',
        icon: '🎯',
        titleEn: 'Nasal Ending "-ing" (/ŋ/)',
        titleVi: 'Âm mũi đuôi "-ing"',
        descEn: `Keep the air in your nasal cavity for "${rawWord}". Don't pronounce as "-in".`,
        descVi: `Giữ hơi ở vòm mũi cho từ "${rawWord}", không đọc thành "in".`
      });
    } else if (cleanWord.endsWith('ed') && !phoneticTips.some(t => t.id === 'ed')) {
      phoneticTips.push({
        id: 'ed',
        icon: '🎯',
        titleEn: 'Past Tense Ending "-ed"',
        titleVi: 'Âm đuôi quá khứ "-ed"',
        descEn: `Release a crisp /t/ or /d/ sound at the end of "${rawWord}".`,
        descVi: `Bật dứt khoát âm /t/ hoặc /d/ ở đuôi từ "${rawWord}".`
      });
    } else if ((cleanWord.endsWith('tion') || cleanWord.endsWith('sion')) && !phoneticTips.some(t => t.id === 'tion')) {
      phoneticTips.push({
        id: 'tion',
        icon: '🎯',
        titleEn: 'Penultimate Stress before "-tion"',
        titleVi: 'Trọng âm trước đuôi "-tion"',
        descEn: `Stress the syllable immediately before "-tion" in "${rawWord}".`,
        descVi: `Nhấn mạnh vào âm tiết ngay liền trước đuôi "-tion".`
      });
    } else if (cleanWord.length >= 7 && !phoneticTips.some(t => t.id === 'multisyllable')) {
      phoneticTips.push({
        id: 'multisyllable',
        icon: '🔥',
        titleEn: `Primary Stress in "${rawWord.toUpperCase()}"`,
        titleVi: `Trọng âm chính trong "${rawWord}"`,
        descEn: `Emphasize the primary stressed syllable loudly and clearly.`,
        descVi: `Nhấn to, cao và ngân dài hơn ở âm tiết có trọng âm.`
      });
    }
  });

  // Default stress tip
  if (phoneticTips.length < 2) {
    const longWords = words.filter(w => w.replace(/[^a-z]/gi, '').length >= 5);
    if (longWords.length > 0) {
      phoneticTips.unshift({
        id: 'stress',
        icon: '🔥',
        titleEn: 'Key Content Word Stress',
        titleVi: 'Trọng âm từ khóa',
        descEn: `Stress key content words: ${longWords.slice(0, 2).map(w => `"${w.toUpperCase()}"`).join(', ')}.`,
        descVi: `Nhấn mạnh các từ khóa chính mang nội dung trong câu.`
      });
    }
  }

  // Intonation Rule
  phoneticTips.push({
    id: 'intonation',
    icon: isYesNoQuestion ? '↗️' : '↘️',
    titleEn: isYesNoQuestion ? 'Rising Intonation (↗)' : 'Falling Intonation (↘)',
    titleVi: isYesNoQuestion ? 'Ngữ điệu lên giọng cuối câu hỏi' : 'Ngữ điệu xuống giọng trầm cuối câu kể',
    descEn: isYesNoQuestion
      ? 'Raise your pitch slightly on the final word of the Yes/No question.'
      : 'Lower your pitch smoothly on the final word to sound natural and confident.',
    descVi: isYesNoQuestion
      ? 'Hơi nhấc cao giọng ở từ cuối cùng của câu hỏi.'
      : 'Hạ trầm giọng dần ở từ cuối cùng để câu nói tự nhiên và dứt khoát.'
  });

  return {
    isYesNoQuestion,
    chunks,
    wordIpaList,
    ipa: formattedIpa,
    phoneticTips: phoneticTips.slice(0, 3)
  };
}

export default function PronunciationCoachCard({ sentence, customIpa = null, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const guide = analyzeSentencePhonetics(sentence, customIpa);

  if (!guide) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-3 bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-amber-50/80 rounded-2xl border border-indigo-200/80 shadow-sm overflow-hidden transition-all text-left">
      {/* Header Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between bg-white/80 hover:bg-white/95 border-b border-indigo-100 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-600 text-white shadow-xs">
            <Sparkles size={14} />
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <span className="text-xs sm:text-sm font-black text-indigo-950 tracking-tight">
              🎯 AI Pronunciation & Intonation Coach
            </span>
            <span className="text-indigo-600 font-semibold text-[11px]">
              (Trọng Âm & Ngữ Điệu Chuẩn Bản Xứ)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
          <span>{isOpen ? 'Hide Guide' : 'Show Guide'}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-3.5 sm:p-4 space-y-3">
          {/* 1. Full IPA with Capitalized Stress */}
          {guide.ipa && (
            <div className="bg-white/90 rounded-xl p-2.5 border border-indigo-100/90 flex items-center gap-2">
              <span className="text-[11px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md shrink-0">
                IPA (Stress CAP)
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 tracking-wide break-words">
                {guide.ipa}
              </span>
            </div>
          )}

          {/* 2. Rhythmic ESL Chunks (Linear Thinking) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-black uppercase text-purple-900 tracking-wider flex items-center gap-1">
              <span>🌊 Rhythmic Speech Chunks (Nhịp ngắt câu tự nhiên):</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {guide.chunks.map((chunk, cIdx) => (
                <div key={cIdx} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-white rounded-xl text-xs sm:text-sm font-bold text-purple-950 border border-purple-300 shadow-xs flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 text-[10px] font-black flex items-center justify-center">
                      {cIdx + 1}
                    </span>
                    <span>{chunk}</span>
                  </span>
                  {cIdx < guide.chunks.length - 1 && (
                    <span className="text-purple-400 font-black text-sm" title="Take a short breath">
                      ➔
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Actionable Bilingual Phonetic & Stress Tips */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
              <Lightbulb size={13} className="text-amber-600" />
              <span>Phonetic & Intonation Focus (Điểm chú ý):</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {guide.phoneticTips.map((tip, tIdx) => (
                <div
                  key={tIdx}
                  className="flex items-start gap-2.5 bg-white/95 p-2.5 rounded-xl border border-amber-200/80 shadow-2xs text-xs"
                >
                  <span className="text-base shrink-0 mt-0.5">{tip.icon}</span>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <span className="font-black text-slate-900">{tip.titleEn}</span>
                      <span className="text-[11px] text-slate-500 font-semibold italic">({tip.titleVi})</span>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {tip.descEn}{' '}
                      <span className="text-slate-500 italic">({tip.descVi})</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
