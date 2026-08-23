import React, { useState } from 'react';
import { Sparkles, Lightbulb, Volume2, ArrowDownRight, ArrowUpRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Automatically analyze sentence for phonetic coaching hints (Stress, Chunks, Final Sounds, Intonation)
 */
export function analyzeSentencePhonetics(sentence, customIpa = null) {
  if (!sentence) return null;

  const words = sentence.trim().split(/\s+/);
  const isQuestion = sentence.endsWith('?');
  const isWhQuestion = isQuestion && /^(what|where|when|why|who|how|which|whose)/i.test(sentence.trim());
  const isYesNoQuestion = isQuestion && !isWhQuestion;

  // 1. Intonation Guide
  const intonationType = isYesNoQuestion ? 'rising' : 'falling';
  const intonationLabel = isYesNoQuestion
    ? 'Rising Intonation (↗) — Lên giọng ở cuối câu hỏi Yes/No'
    : 'Falling Intonation (↘) — Xuống giọng trầm ở cuối câu kể';

  // 2. Linear Thinking ESL Chunks (split by prepositions, conjunctions, punctuation)
  const chunks = [];
  const chunkRegex = /([^,.;!?]+(?:[,.;!?]|\s+(?:down|in|on|at|after|before|with|from|to|because|and|but|suddenly|while)\b|$))/gi;
  let match;
  while ((match = chunkRegex.exec(sentence)) !== null) {
    const chunkText = match[0].trim();
    if (chunkText) chunks.push(chunkText);
  }
  const finalChunks = chunks.length >= 2 ? chunks : [sentence];

  // 3. Extract Multi-syllable & Key Stress Words
  const stressWords = [];
  const phoneticTips = [];

  words.forEach(rawWord => {
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z]/g, '');
    if (cleanWord.length >= 6) {
      stressWords.push(rawWord.replace(/[.,!?;:]/g, ''));
    }

    // Specific phoneme detection
    if (cleanWord.endsWith('ing') && !phoneticTips.some(t => t.id === 'ing')) {
      phoneticTips.push({
        id: 'ing',
        icon: '🎯',
        title: 'Âm đuôi "-ing" (/ŋ/)',
        desc: `Bật nhẹ âm mũi trong "${rawWord}", giữ hơi ở vòm họng, không đọc thành "in".`
      });
    } else if (cleanWord.endsWith('ed') && !phoneticTips.some(t => t.id === 'ed')) {
      phoneticTips.push({
        id: 'ed',
        icon: '🎯',
        title: 'Âm đuôi "-ed"',
        desc: `Chú ý phát âm rõ âm đuôi của từ "${rawWord}" (/t/ hoặc /d/), không nuốt âm.`
      });
    } else if ((cleanWord.endsWith('tion') || cleanWord.endsWith('sion')) && !phoneticTips.some(t => t.id === 'tion')) {
      phoneticTips.push({
        id: 'tion',
        icon: '🎯',
        title: 'Trọng âm trước "-tion" (/ʃən/)',
        desc: `Nhấn mạnh vào âm tiết ngay liền trước đuôi "-tion" trong "${rawWord}".`
      });
    } else if (cleanWord.endsWith('ly') && cleanWord.length > 4 && !phoneticTips.some(t => t.id === 'ly')) {
      phoneticTips.push({
        id: 'ly',
        icon: '🎯',
        title: 'Đuôi trạng từ "-ly" (/li/)',
        desc: `Đọc lướt nhẹ âm "-ly", dồn trọng âm chính vào gốc từ trong "${rawWord}".`
      });
    }
  });

  // Default stress tip if not enough specific rules
  if (stressWords.length > 0 && phoneticTips.length < 3) {
    phoneticTips.unshift({
      id: 'stress',
      icon: '🔥',
      title: 'Trọng âm từ chính (Word Stress)',
      desc: `Nhấn to, rõ và ngân dài hơn ở các từ quan trọng: ${stressWords.slice(0, 3).map(w => `"${w}"`).join(', ')}.`
    });
  }

  // Intonation tip
  phoneticTips.push({
    id: 'intonation',
    icon: isYesNoQuestion ? '↗️' : '↘️',
    title: 'Ngữ điệu câu (Sentence Intonation)',
    desc: isYesNoQuestion
      ? 'Hơi nhấc cao giọng ở từ cuối cùng của câu hỏi.'
      : 'Hạ trầm giọng dần ở từ cuối cùng để câu nói nghe tự nhiên và dứt khoát.'
  });

  return {
    intonationType,
    intonationLabel,
    chunks: finalChunks,
    stressWords,
    phoneticTips: phoneticTips.slice(0, 3),
    ipa: customIpa || null
  };
}

export default function PronunciationCoachCard({ sentence, customIpa = null, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const guide = analyzeSentencePhonetics(sentence, customIpa);

  if (!guide) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-3 bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-amber-50/80 rounded-2xl border border-indigo-200/80 shadow-sm overflow-hidden transition-all text-left">
      {/* Header Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between bg-white/70 hover:bg-white/90 border-b border-indigo-100 transition"
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-600 text-white shadow-xs">
            <Sparkles size={14} />
          </span>
          <span className="text-xs sm:text-sm font-black text-indigo-950 tracking-tight">
            🎯 AI Pronunciation & Intonation Coach <span className="text-indigo-600 font-semibold text-[11px]">(Mẹo Trọng Âm & Ngữ Điệu)</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
          <span>{isOpen ? 'Thu gọn' : 'Xem mẹo'}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-3.5 sm:p-4 space-y-3">
          {/* 1. IPA Transcription (if available) */}
          {guide.ipa && (
            <div className="bg-white/80 rounded-xl p-2.5 border border-indigo-100/80 flex items-center gap-2">
              <span className="text-[11px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md shrink-0">
                IPA
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 tracking-wide break-words">
                {guide.ipa}
              </span>
            </div>
          )}

          {/* 2. Rhythmic ESL Chunks (Linear Thinking) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-black uppercase text-purple-900 tracking-wider flex items-center gap-1">
              <span>🌊 Nhịp Ngắt Câu Tự Nhiên (Rhythmic Chunks):</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {guide.chunks.map((chunk, cIdx) => (
                <React.Fragment key={cIdx}>
                  <span className="px-2.5 py-1 bg-white rounded-lg text-xs font-bold text-purple-950 border border-purple-200 shadow-xs">
                    {chunk}
                  </span>
                  {cIdx < guide.chunks.length - 1 && (
                    <span className="text-purple-400 font-black text-xs px-0.5">‖</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 3. Actionable Phonetic & Stress Tips */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
              <Lightbulb size={13} className="text-amber-600" />
              <span>Điểm Cần Chú Ý Khi Phát Âm:</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {guide.phoneticTips.map((tip, tIdx) => (
                <div
                  key={tIdx}
                  className="flex items-start gap-2 bg-white/90 p-2 rounded-xl border border-amber-200/70 shadow-2xs text-xs"
                >
                  <span className="text-sm shrink-0 mt-0.5">{tip.icon}</span>
                  <div className="flex-1">
                    <span className="font-black text-slate-900 mr-1">{tip.title}:</span>
                    <span className="text-slate-600 font-medium leading-relaxed">{tip.desc}</span>
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
