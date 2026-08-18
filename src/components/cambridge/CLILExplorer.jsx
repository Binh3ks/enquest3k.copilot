import React, { useState } from 'react';
import { Globe, Volume2, Sparkles, CheckCircle2, AlertCircle, BookOpen, Send, Lightbulb, Check, Languages, Trophy, ArrowRight, HelpCircle } from 'lucide-react';
import { renderParsedText } from '../common/HoverWord';
import VoiceService from '../../services/voiceService';
import { useUserStore } from '../../stores/useUserStore';

export default function CLILExplorer({
  clilData,
  weekNumber = 33,
  highlightMode = 'vocab', // DEFAULT IS NOW VOCAB FOCUS (MANDATORY PEDAGOGICAL STANDARD)
  setHighlightMode,
  targetGrammarRegex = []
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [criticalResponse, setCriticalResponse] = useState('');
  const [criticalSubmitted, setCriticalSubmitted] = useState(false);
  const [showCriticalHint, setShowCriticalHint] = useState(false);

  // Translation Challenge Interactive State
  const [translationInputs, setTranslationInputs] = useState({});
  const [translationResults, setTranslationResults] = useState({});
  const [activeSentenceAudio, setActiveSentenceAudio] = useState(null);

  const sentencesList = clilData?.translation_sentences || [
    {
      id: 1,
      en: "Why do we fall on wet floors?",
      target_vi: "Tại sao chúng ta lại bị ngã trên sàn nhà ướt?",
      keywords: ["tại sao", "ngã", "sàn", "ướt"]
    },
    {
      id: 2,
      en: "The answer is a science concept called Friction.",
      target_vi: "Câu trả lời là một khái niệm khoa học mang tên Lực Ma Sát.",
      keywords: ["câu trả lời", "khoa học", "ma sát"]
    },
    {
      id: 3,
      en: "Friction is a force that stops things from sliding.",
      target_vi: "Lực ma sát là một lực ngăn cản các vật trượt đi.",
      keywords: ["ma sát", "lực", "ngăn", "trượt"]
    },
    {
      id: 4,
      en: "While Jake was walking down the corridor, his rubber shoes created high friction with the dry floor.",
      target_vi: "Trong khi Jake đang đi bộ xuống hành lang, đế giày cao su của cậu ấy đã tạo ra lực ma sát lớn với mặt sàn khô.",
      keywords: ["trong khi", "đi bộ", "hành lang", "giày", "cao su", "ma sát", "sàn", "khô"]
    },
    {
      id: 5,
      en: "This kept him safe. But water changes everything! Water acts like a lubricant.",
      target_vi: "Điều này giúp cậu ấy an toàn. Nhưng nước làm thay đổi tất cả! Nước đóng vai trò như một chất bôi trơn.",
      keywords: ["an toàn", "nước", "thay đổi", "bôi trơn"]
    },
    {
      id: 6,
      en: "While Tom was running fast, his shoes hit the wet puddle. The water reduced the friction to zero!",
      target_vi: "Trong khi Tom đang chạy nhanh, giày của cậu ấy chạm vào vũng nước ướt. Lớp nước đã làm giảm lực ma sát xuống bằng không!",
      keywords: ["trong khi", "chạy", "vũng nước", "giảm", "ma sát", "không"]
    },
    {
      id: 7,
      en: "While the school nurse was applying the clean bandage, she explained that we must always look for the yellow warning sign. To stay safe, walk carefully and let friction do its job!",
      target_vi: "Trong khi cô y tá đang băng bó vết thương sạch sẽ, cô giải thích rằng chúng ta phải luôn chú ý đến biển báo cảnh báo màu vàng. Để giữ an toàn, hãy đi bộ cẩn thận và để lực ma sát làm đúng nhiệm vụ của nó!",
      keywords: ["trong khi", "y tá", "băng", "giải thích", "biển báo", "vàng", "an toàn", "cẩn thận", "ma sát"]
    }
  ];

  if (!clilData) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 font-bold">
        <Globe size={32} className="mx-auto mb-2 text-slate-400" />
        CLIL Knowledge Explorer content is loading...
      </div>
    );
  }

  const handleToggleAudio = async () => {
    if (isPlayingAudio) {
      if (typeof VoiceService.stopAudio === 'function') VoiceService.stopAudio();
      else if (typeof VoiceService.stop === 'function') VoiceService.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      try {
        await VoiceService.speak(
          clilData.content_en,
          'read',
          clilData.audio_url || `/audio/week${weekNumber}/explore.mp3`,
          weekNumber,
          'advanced'
        );
      } catch (_) {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(clilData.content_en);
          utterance.lang = 'en-US';
          window.speechSynthesis.speak(utterance);
        }
      } finally {
        setIsPlayingAudio(false);
      }
    }
  };

  const handleSpeakSingleSentence = async (text, id) => {
    setActiveSentenceAudio(id);
    try {
      await VoiceService.speak(text, 'read');
    } catch (_) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } finally {
      setActiveSentenceAudio(null);
    }
  };

  const handleCheckTranslation = (sent) => {
    const userInput = (translationInputs[sent.id] || '').trim().toLowerCase();
    if (!userInput) return;

    // Check keyword coverage
    const matchedKeywords = sent.keywords.filter(k => userInput.includes(k.toLowerCase()));
    const matchRatio = matchedKeywords.length / sent.keywords.length;
    const isPass = matchRatio >= 0.4 || userInput.length >= 15;

    setTranslationResults(prev => ({
      ...prev,
      [sent.id]: {
        isSubmitted: true,
        isPass,
        matchRatio: Math.round(matchRatio * 100),
        sampleAnswer: sent.target_vi
      }
    }));

    if (isPass) {
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(10);
    }
  };

  const handleSelectAnswer = (questionId, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header Banner */}
      <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl text-white shadow-lg border border-blue-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-blue-950 font-black text-[10px] uppercase rounded-md tracking-wider flex items-center gap-1">
              <Globe size={11} /> CLIL Knowledge Explorer
            </span>
            <span className="text-blue-200 text-xs font-bold">Physics & Science Standard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {clilData.title_en}
          </h2>
          {clilData.title_vi && (
            <p className="text-xs text-blue-200 font-medium italic">{clilData.title_vi}</p>
          )}
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={handleToggleAudio}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-md transition active:scale-95 ${
              isPlayingAudio
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950'
            }`}
          >
            <Volume2 size={16} />
            {isPlayingAudio ? 'Pause Narration' : '🎧 Listen to Article'}
          </button>
        </div>
      </div>

      {/* Main Reading Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
        {/* Grammar X-Ray & Controls Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <span className="text-[10px] font-black text-slate-400 uppercase px-2">Reading Mode:</span>
            <button
              onClick={() => setHighlightMode && setHighlightMode('vocab')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                highlightMode === 'vocab'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              🔤 Vocab Focus (Default)
            </button>
            <button
              onClick={() => setHighlightMode && setHighlightMode('grammar')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                highlightMode === 'grammar'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-amber-600'
              }`}
            >
              🔬 Grammar X-Ray
            </button>
            <button
              onClick={() => setHighlightMode && setHighlightMode('clean')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                highlightMode === 'clean'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📖 Clean Mode
            </button>
          </div>

          <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
            💡 Click any word for instant dictionary & audio
          </span>
        </div>

        {/* English Article Body */}
        <div className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed sm:leading-loose">
          {renderParsedText(
            clilData.content_en,
            'blue',
            null,
            false,
            highlightMode,
            targetGrammarRegex
          )}
        </div>
      </div>

      {/* 2. TRANSLATION CHALLENGE SECTION (REPLACED STATIC TRANSLATION) */}
      <div className="bg-gradient-to-br from-indigo-50/70 to-blue-50/50 rounded-3xl p-6 sm:p-7 border border-indigo-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <Languages className="text-indigo-600" size={22} />
            <div>
              <h3 className="text-base font-black text-indigo-950">
                CLIL Sentence Translation Challenge (Thử Thách Dịch Câu)
              </h3>
              <p className="text-xs text-indigo-700 font-medium">
                Tự tay dịch từng câu tiếng Anh sang tiếng Việt để khắc sâu kiến thức vật lý. Thưởng +10 XP mỗi câu!
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-900 font-mono text-xs font-black rounded-xl">
            {Object.keys(translationResults).length} / {sentencesList.length} Completed
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {sentencesList.map((sent, sIdx) => {
            const inputVal = translationInputs[sent.id] || '';
            const res = translationResults[sent.id];

            return (
              <div key={sent.id || sIdx} className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                      {sent.en}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeakSingleSentence(sent.en, sent.id)}
                    className="p-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl transition shrink-0 shadow-sm"
                    title="Listen to this sentence"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={inputVal}
                    onChange={(e) => setTranslationInputs({ ...translationInputs, [sent.id]: e.target.value })}
                    disabled={res?.isSubmitted}
                    placeholder="Gõ bản dịch tiếng Việt của câu này vào đây..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-slate-100"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleCheckTranslation(sent)}
                      disabled={!inputVal.trim() || res?.isSubmitted}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 active:scale-95"
                    >
                      <Check size={14} /> {res?.isSubmitted ? 'Đã kiểm tra' : 'Kiểm tra bản dịch (+10 XP)'}
                    </button>
                  </div>
                </div>

                {/* Feedback Box & Sample Answer */}
                {res && (
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1.5 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <CheckCircle2 size={15} className="text-emerald-600" />
                      <span>{res.isPass ? "🎉 Rất xuất sắc! (+10 XP)" : "👍 Tốt lắm! Hãy đối chiếu với bản dịch chuẩn:"}</span>
                    </div>
                    <div className="text-slate-700 font-medium">
                      <span className="font-bold text-slate-900">🇻🇳 Bản dịch chuẩn:</span> {res.sampleAnswer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bloom's Comprehension Questions */}
      {clilData.check_questions && clilData.check_questions.length > 0 && (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-600" size={20} />
            <h3 className="text-base font-black text-slate-900">
              Comprehension Check (Kiểm tra đọc hiểu Bloom's)
            </h3>
          </div>

          <div className="space-y-4">
            {clilData.check_questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id || idx + 1];
              const isSubmitted = Boolean(userAns);
              const isCorrect = userAns === q.answer;

              return (
                <div key={q.id || idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="font-bold text-slate-800 text-sm mb-3">
                    <span className="text-blue-600 font-black mr-1.5">{idx + 1}.</span>
                    {q.question_en}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options?.map((opt, oIdx) => {
                      const isSelected = userAns === opt;
                      let btnStyle = "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100";
                      if (isSubmitted) {
                        if (opt === q.answer) {
                          btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-sm font-black";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-500 text-white border-rose-600 font-black";
                        } else {
                          btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-blue-600 text-white border-blue-700 shadow-sm font-black";
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectAnswer(q.id || idx + 1, opt)}
                          disabled={isSubmitted}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center gap-1.5 ${btnStyle}`}
                        >
                          {opt}
                          {isSubmitted && opt === q.answer && <Check size={14} />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className={`mt-2.5 p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 size={14} className="text-emerald-600" /> Correct understanding!
                        </>
                      ) : (
                        <>
                          <AlertCircle size={14} className="text-rose-600" /> Correct answer: <span className="font-mono underline font-black">{q.answer}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Critical Thinking Challenge (Updated Prompt) */}
      {clilData.critical_thinking && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 rounded-3xl p-6 border border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-600" size={20} />
              <h3 className="text-base font-black text-amber-950">
                💡 Critical Thinking Challenge (Tư duy phản biện)
              </h3>
            </div>
            <button
              onClick={() => setShowCriticalHint(!showCriticalHint)}
              className="px-3 py-1 bg-amber-200/70 hover:bg-amber-300 text-amber-900 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <Lightbulb size={13} /> {showCriticalHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          </div>

          <p className="text-sm font-bold text-slate-800 leading-relaxed">
            {clilData.critical_thinking.question_en}
          </p>

          {showCriticalHint && clilData.critical_thinking.hint_en && (
            <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium italic">
              💡 Hint: {clilData.critical_thinking.hint_en}
            </div>
          )}

          <div className="space-y-2 pt-1">
            <textarea
              rows={3}
              value={criticalResponse}
              onChange={(e) => setCriticalResponse(e.target.value)}
              placeholder="Type your thoughtful response here in English (e.g., 'Running in socks is more dangerous because socks lack rubber grip and reduce friction on smooth wood...')..."
              className="w-full p-3.5 bg-white rounded-2xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium text-slate-800 placeholder:text-slate-400"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {criticalResponse.trim().split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                onClick={() => setCriticalSubmitted(true)}
                disabled={!criticalResponse.trim()}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white text-xs font-black rounded-xl shadow-md transition flex items-center gap-1.5 active:scale-95"
              >
                <Send size={14} /> Submit Response
              </button>
            </div>

            {criticalSubmitted && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Awesome physics reflection! Connecting socks friction and sports shoes grips builds deep real-world reasoning.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
