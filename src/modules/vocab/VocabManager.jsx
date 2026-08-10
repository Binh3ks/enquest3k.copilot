import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Volume2, CheckCircle, Loader2, Star } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';
import { useStationProgress } from '../../hooks/useStationProgress';
import { useTTSPrefetch } from '../../hooks/useTTSPrefetch';
import { getImageUrl } from '../../utils/imageUrl';
import { addWeekWords } from '../../utils/wordMemoryBank';
import VocabDigest from '../../components/VocabDigest';

const VocabCard = ({ word, themeColor, isVi, onComplete, savedCardData, onUpdate, weekNumber }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [drill, setDrill] = useState(savedCardData?.drill || { copy1: '', copy2: '', copy3: '', collocation: '', sentence: '' });
  const [feedback, setFeedback] = useState(savedCardData?.feedback || { collocation: null, sentence: null });
  const [copyStatus, setCopyStatus] = useState(savedCardData?.copyStatus || { copy1: null, copy2: null, copy3: null });
  const [isCompleted, setIsCompleted] = useState(savedCardData?.completed || false);
  const [isPlaying, setIsPlaying] = useState(false);

  // BUG FIX (Jun 7, 2026): The lazy useState(s) above only read savedCardData on
  // first mount. If the parent re-syncs savedData after async fetchWeekProgress
  // (which is the common case), the card's local state stays at defaults.
  // Re-sync when savedCardData ref changes — but only if user hasn't started
  // typing yet (guard against overwriting in-progress edits).
  const hasRestoredCard = useRef(false);
  useEffect(() => {
    if (hasRestoredCard.current) return;
    if (!savedCardData) return;
    hasRestoredCard.current = true;
    // Seed only if local state is still at defaults (no user edits yet)
    if (savedCardData.drill && drill.copy1 === '' && drill.copy2 === '' && drill.copy3 === '' && drill.collocation === '' && drill.sentence === '') {
      setDrill(savedCardData.drill);
    }
    if (savedCardData.feedback && (feedback.collocation === null || feedback.collocation === undefined) && (feedback.sentence === null || feedback.sentence === undefined)) {
      setFeedback(savedCardData.feedback);
    }
    if (savedCardData.copyStatus && copyStatus.copy1 === null && copyStatus.copy2 === null && copyStatus.copy3 === null) {
      setCopyStatus(savedCardData.copyStatus);
    }
    if (savedCardData.completed && !isCompleted) {
      setIsCompleted(savedCardData.completed);
    }
  }, [savedCardData]);

  // collocation can be an array ["chunk1", "chunk2"] or string "chunk1 / chunk2"
  const collocations = Array.isArray(word.collocation)
    ? word.collocation
    : (typeof word.collocation === 'string' && word.collocation.includes('/'))
    ? word.collocation.split('/').map(s => s.trim())
    : (word.collocation ? [word.collocation] : []);

  const isColloCorrect = feedback.collocation?.isCorrect;
  const isSentCorrect = feedback.sentence?.isCorrect;
  const allCopyCorrect = copyStatus.copy1 && copyStatus.copy2 && copyStatus.copy3;

  useEffect(() => {
      if (allCopyCorrect && isColloCorrect && isSentCorrect && !isCompleted) {
          setIsCompleted(true);
          onComplete(word.id, { drill, feedback, copyStatus, completed: true });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCopyCorrect, isColloCorrect, isSentCorrect]);

  useEffect(() => {
    onUpdate(word.id, { drill, feedback, copyStatus, completed: isCompleted });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drill, feedback, copyStatus, isCompleted]);

  const play = async (e, text, url) => {
    e.stopPropagation();
    if (isPlaying) return;
    setIsPlaying(true);
    try {
        await speakText(text, url, 1.0, null, 'new_word', weekNumber);
    } catch (error) {
        console.error("Play error", error);
    } finally {
        setTimeout(() => setIsPlaying(false), 500);
    }
  };

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    setIsFlipped(!isFlipped);
  };

  const handleCopyCheck = (key, value) => {
      const isCorrect = value.trim().toLowerCase() === word.word.trim().toLowerCase();
      setCopyStatus(prev => ({ ...prev, [key]: isCorrect }));
  };

  const handleCollocationCheck = () => {
    if (collocations.length === 0) return;
    const result = analyzeAnswer(drill.collocation, collocations, 'grammar');
    setFeedback(prev => ({ ...prev, collocation: result }));
  };

  const handleSentenceCheck = () => {
    const input = drill.sentence.trim();
    if (!input) return;

    if (!input.toLowerCase().includes(word.word.toLowerCase())) {
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: false, status: 'wrong', message: isVi ? `Thiếu từ "${word.word}"` : `Missing "${word.word}"` } }));
        return;
    }

    let warnings = [];
    if (input.charAt(0) !== input.charAt(0).toUpperCase()) warnings.push(isVi ? "Viết hoa đầu câu" : "Capitalization");
    if (!/[.?!]$/.test(input)) warnings.push(isVi ? "Dấu kết câu" : "Punctuation");

    if (warnings.length > 0) {
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: false, status: 'warning', message: isVi ? `Lỗi: ${warnings.join(', ')}` : `Check: ${warnings.join(', ')}` } }));
    } else if (input.split(' ').length < 5) {
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: false, status: 'warning', message: isVi ? 'Câu quá ngắn (cần ít nhất 5 từ)' : 'Too short (need at least 5 words)' } }));
    } else {
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: true, status: 'perfect', message: isVi ? 'Câu tốt!' : 'Good job!' } }));
    }
  };

  const getMessage = (res) => {
    if (!res) return "";
    if (res.status === 'empty') return isVi ? "Nhập liệu..." : "Enter text.";
    if (res.status === 'perfect') return isVi ? "Chính xác!" : "Perfect!";
    if (res.status === 'wrong') return isVi ? "Sai rồi." : "Incorrect.";
    if (res.status === 'warning') return res.message || (isVi ? "Gần đúng." : "Close.");
    return res.message || "";
  };

  const example = word.example || '';

  return (
    <div className={`flex flex-col gap-4 transition-all duration-500 ${isCompleted ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}>
      {/* Visited/Completed badge — shown when student has interacted with this card before */}
      {savedCardData && !isCompleted && (
        <div className="flex justify-end -mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider border border-slate-200">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
            {isVi ? 'Đã xem' : 'Visited'}
          </span>
        </div>
      )}
      {isCompleted && (
        <div className="flex justify-end -mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-wider border border-green-200">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            {isVi ? 'Hoàn thành' : 'Completed'}
          </span>
        </div>
      )}
      <div
        className={`relative w-full h-96 cursor-pointer group ${isFlipped ? 'z-50' : 'z-10'}`}
        style={{ perspective: '1000px' }}
        onClick={handleCardClick}
      >
        <div
            className="relative w-full h-full transition-all duration-700"
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <div className={`absolute inset-0 bg-white rounded-3xl shadow-lg border border-slate-100 flex flex-col overflow-hidden hover:shadow-orange-200/50 transition-shadow ${isFlipped ? 'pointer-events-none' : ''}`} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
           <div className="h-[210px] w-full relative overflow-hidden flex items-center justify-center bg-slate-50 p-3 shrink-0">
                <img src={getImageUrl(word.image_url)} alt={word.word} className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3 text-white drop-shadow-lg z-10">
                    {isCompleted ? <CheckCircle className="w-8 h-8 fill-green-500 text-white" /> : <Star className="w-6 h-6 fill-amber-400 text-amber-400" />}
                </div>
           </div>

           <div className="flex-1 flex flex-col items-center justify-between w-full pt-3 pb-7 px-4 z-20">
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-3xl font-black text-slate-800 mb-0.5 capitalize leading-tight">{word.word}</h3>
                    <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-0.5 rounded-full shadow-sm">{word.pronunciation}</span>
                </div>

                <button
                    onClick={(e) => play(e, word.word, word.audio_word)}
                    className={`p-3.5 bg-${themeColor}-500 text-white rounded-full hover:scale-110 transition-all shadow-md hover:shadow-orange-300 active:scale-95 flex items-center justify-center my-1`}
                    disabled={isPlaying}
                >
                  {isPlaying ? <Loader2 className="w-6 h-6 animate-spin" /> : <Volume2 className="w-6 h-6" />}
                </button>
           </div>
           <p className="absolute bottom-2 text-[10px] text-slate-400 uppercase font-bold tracking-widest w-full text-center pointer-events-none">Tap to Flip</p>
          </div>

          {/* Back face */}
          <div className={`absolute inset-0 bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-xl border-2 border-orange-100 p-5 flex flex-col gap-3 overflow-y-auto ${!isFlipped ? 'pointer-events-none' : ''}`} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>

            {/* Meaning section */}
            <div className="relative z-20 flex-shrink-0">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase text-orange-400 tracking-wider">Meaning</span>
                    <button onClick={(e) => play(e, word.definition_en)} className="p-0.5 bg-white rounded-full shadow-sm text-orange-400 hover:text-orange-600 relative z-50"><Volume2 className="w-3.5 h-3.5"/></button>
                </div>
                <p className="font-bold text-slate-800 text-xl leading-snug">{word.definition_en}</p>
                {word.definition_vi && <div className="mt-1.5 pt-1.5 border-t border-orange-200/50"><p className="text-sm text-slate-500 italic font-medium">"{word.definition_vi}"</p></div>}
            </div>

            {/* Example section */}
            {example && (
              <div className="relative z-20 flex-shrink-0 border-t border-orange-200/50 pt-3">
                  <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase text-teal-500 tracking-wider">Example</span>
                      <button onClick={(e) => play(e, example, word.audio_example)} className="p-0.5 bg-white rounded-full shadow-sm text-teal-500 hover:text-teal-700 relative z-50"><Volume2 className="w-3.5 h-3.5"/></button>
                  </div>
                  <p className="text-sm text-slate-600 italic leading-relaxed">"{example}"</p>
              </div>
            )}

            {/* Also Say — pills */}
            {collocations.length > 0 && (
              <div className="relative z-20 flex-shrink-0 border-t border-orange-200/50 pt-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">Also Say</span>
                      <button onClick={(e) => play(e, collocations.join(', '), word.audio_collocation)} className="p-0.5 bg-white rounded-full shadow-sm text-indigo-500 hover:text-indigo-700 relative z-50"><Volume2 className="w-3.5 h-3.5"/></button>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {collocations.map((chunk, i) => (
                      <button
                        key={i}
                        onClick={(e) => play(e, chunk, word[`audio_collocation_${i}`] || word.audio_collocation)}
                        className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold text-sm rounded-full border border-indigo-200 transition-colors shadow-sm"
                      >
                        {chunk}
                      </button>
                    ))}
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drill section */}
      <div className={`bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 shadow-sm relative z-0 ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
        <p className="text-xs font-black uppercase text-slate-500 tracking-wider mb-1">1. Copy Word (x3)</p>
        <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <input
                key={i}
                type="text"
                placeholder={`${i}`}
                className={`w-1/3 p-3 text-xs border rounded-xl text-center outline-none transition-all font-mono ${copyStatus[`copy${i}`] === true ? 'border-green-400 bg-green-50' : copyStatus[`copy${i}`] === false ? 'border-rose-300 bg-rose-50' : 'focus:border-orange-400 focus:bg-white'} ${isCompleted ? 'cursor-not-allowed opacity-60' : ''}`}
                autoCapitalize="none" autoCorrect="off" spellCheck="false"
                value={drill[`copy${i}`]}
                disabled={isCompleted}
                onChange={(e) => {
                    const val = e.target.value;
                    setDrill(prev => ({ ...prev, [`copy${i}`]: val }));
                    handleCopyCheck(`copy${i}`, val);
                }}
              />
            ))}
        </div>

        <p className="text-xs font-black uppercase text-slate-500 tracking-wider pt-2 mb-1">2. Collocation Drill</p>
        <div className="relative">
            <input type="text"
              placeholder={isVi ? `Gõ 1 trong: ${collocations[0] || '...'}...` : `Type 1 of: ${collocations[0] || '...'}...`}
              className={`w-full p-3 pr-24 text-sm border-2 rounded-xl outline-none transition-all font-bold ${isColloCorrect ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-indigo-400 focus:bg-white'} ${isCompleted ? 'cursor-not-allowed opacity-60' : ''}`}
              autoCapitalize="none" autoCorrect="off" spellCheck="false"
              value={drill.collocation}
              disabled={isCompleted}
              onChange={(e) => { setDrill(prev => ({ ...prev, collocation: e.target.value })); setFeedback(prev => ({ ...prev, collocation: null })); }}
              onKeyDown={(e) => e.key === 'Enter' && handleCollocationCheck()}
            />
            <button onClick={handleCollocationCheck} className={`absolute right-1 top-1 bottom-1 px-4 rounded-lg font-bold text-white text-xs shadow-sm transition-all ${isColloCorrect ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {isColloCorrect ? <CheckCircle className="w-4 h-4"/> : "Check"}
            </button>
        </div>
        {feedback.collocation && <p className={`text-[10px] font-bold ${isColloCorrect ? 'text-green-600' : 'text-rose-500'}`}>{getMessage(feedback.collocation)}</p>}

        <p className="text-xs font-black uppercase text-slate-500 tracking-wider pt-2 mb-1">3. Make a Sentence</p>
        <div className="relative">
            <input type="text" placeholder={isVi ? "Đặt câu..." : "Write a sentence..."}
              className={`w-full p-3 pr-24 text-sm border-2 rounded-xl outline-none transition-all ${isSentCorrect ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-orange-400 focus:bg-white'} ${isCompleted ? 'cursor-not-allowed opacity-60' : ''}`}
              autoCapitalize="sentences" autoCorrect="off" spellCheck="false"
              value={drill.sentence}
              disabled={isCompleted}
              onChange={(e) => { setDrill(prev => ({ ...prev, sentence: e.target.value })); setFeedback(prev => ({ ...prev, sentence: null })); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSentenceCheck()}
            />
            <button onClick={handleSentenceCheck} className={`absolute right-1 top-1 bottom-1 px-4 rounded-lg font-bold text-white text-xs shadow-sm transition-all ${isSentCorrect ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`}>
                {isSentCorrect ? <CheckCircle className="w-4 h-4"/> : "Check"}
            </button>
        </div>
        {feedback.sentence && <p className={`text-[10px] font-bold ${feedback.sentence.isCorrect ? 'text-green-600' : 'text-rose-500'}`}>{feedback.sentence.message}</p>}
      </div>
    </div>
  );
};

const VocabManager = ({ data, themeColor, isVi, onToggleLang, onReportProgress, weekNumber, mode: propMode }) => {
  const { weekId } = useParams();
  const currentWeek = weekNumber || parseInt(weekId);

  // useStationProgress returns: { savedData, isCompleted, savedScore, saveProgress, markComplete, mode }
  // OLD pattern (working): useStationProgress(parseInt(weekId), 'vocab_mastery')
  // Then use saveProgress({ cards: cardsData, completedWords }, isComplete, percent)
  const { savedData, saveProgress, markComplete } = useStationProgress(parseInt(weekId), 'vocab_mastery');
  const effectiveMode = propMode || 'advanced';

  // TTS prefetch
  const { prefetchMultiple } = useTTSPrefetch('new_word', currentWeek);
  const hasPrefetched = useRef(false);

  const [view, setView] = useState('cards');
  const [cardsData, setCardsData] = useState(savedData.cards || {});

  const vocabList = data?.vocab || [];

  // Sync savedData into local state — runs when savedData reference changes
  // (covers both initial mount AND async fetchWeekProgress completion).
  // BUG FIX (Jun 7, 2026): The previous version used deps=[] so it only ran once
  // on mount. If the user opened the station before App.jsx's fetchWeekProgress
  // had populated progressCache, savedData.cards was undefined and the local
  // state stayed empty even after the store filled in. Now we re-sync whenever
  // savedData changes — but only seed local state if it isn't already populated,
  // so user edits made in this session are never overwritten.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (savedData.cards && Object.keys(cardsData).length === 0) {
      setCardsData(savedData.cards);
    }
  }, [savedData]);

  // Report progress to parent (App.jsx expects a percent NUMBER, not an object).
  // Passing an object caused App.jsx to call progressAPI.saveProgress with
  // `score: [object Object]` and `data: {}`, which overwrote the rich
  // {cards, completedWords} data the useStationProgress hook had just saved.
  useEffect(() => {
    if (!vocabList.length) return;
    const completedWords = Object.keys(cardsData).filter(id => cardsData[id]?.completed);
    const percent = Math.round((completedWords.length / vocabList.length) * 100);
    onReportProgress?.(percent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsData]);

  // TTS prefetch (first 8 words, once)
  useEffect(() => {
    hasPrefetched.current = false;
  }, [data, effectiveMode]);

  useEffect(() => {
    if (hasPrefetched.current || !vocabList.length) return;
    hasPrefetched.current = true;

    const items = vocabList.slice(0, 8).flatMap(word => [
      { text: word.word, audioPath: word.audio_word || word.audio_url },
      { text: word.definition_en, audioPath: word.audio_definition },
    ]).filter(item => item.text);

    if (items.length > 0) {
      prefetchMultiple(items, 1000).catch(err => {
        console.warn('[VocabManager] Prefetch failed:', err);
      });
    }
  }, [vocabList, prefetchMultiple, effectiveMode]);

  const handleCardUpdate = (id, cardData) => {
    setCardsData(prev => ({ ...prev, [id]: cardData }));
  };

  const handleCardComplete = (id, cardData) => {
    handleCardUpdate(id, cardData);
  };

  // Auto-save to useStationProgress when cardsData changes
  useEffect(() => {
    if (!vocabList.length) return;
    const completedWords = Object.keys(cardsData).filter(id => cardsData[id]?.completed);
    const percent = Math.round((completedWords.length / vocabList.length) * 100);
    const isComplete = completedWords.length === vocabList.length;

    saveProgress({ cards: cardsData, completedWords }, isComplete, percent);
    if (isComplete) markComplete(100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsData, vocabList.length]);

  const handleReset = () => {
    setCardsData({});
    saveProgress({}, false, 0);
  };

  const completedCount = Object.values(cardsData).filter(c => c.completed).length;
  // BUG FIX (Jun 7, 2026): show visited (interacted) count too, so students
  // can see their prior work even when the saved drill fields are empty
  // (e.g. flipped card but didn't type — savedCardsData has the key but
  // drill.copy1 etc. are '')
  const visitedCount = Object.keys(cardsData).length;

  if (vocabList.length === 0) return <div className="p-8 text-center text-slate-400">No vocabulary found.</div>;

  if (view === 'digest' || completedCount >= vocabList.length) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setView('cards')} className="text-sm text-slate-500 hover:text-slate-700 underline">
            ← {isVi ? 'Quay lại' : 'Back to cards'}
          </button>
          <button onClick={handleReset} className="text-xs text-rose-400 hover:text-rose-600">
            {isVi ? 'Làm lại' : 'Reset'}
          </button>
        </div>
        <VocabDigest
          words={vocabList}
          cardsData={cardsData}
          themeColor={themeColor}
          isVi={isVi}
          weekNumber={currentWeek}
        />
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className={`bg-${themeColor}-100 p-4 rounded-xl border border-${themeColor}-200 mb-8 flex justify-between items-center shadow-sm`}>
        <div>
          <h2 className={`text-xl font-black text-${themeColor}-800 uppercase flex items-center`}>
            {isVi ? 'Từ mới' : 'New Words'}
            <button onClick={onToggleLang} className="ml-3 px-2 py-1 bg-white/50 rounded-md hover:bg-white text-xs font-bold text-slate-500 border border-transparent hover:border-slate-300 transition-all">
              {isVi ? 'VI' : 'EN'}
            </button>
          </h2>
          <p className="text-sm text-slate-600 font-bold">
            {isVi ? 'Từ vựng cốt lõi & Collocation' : 'Core Vocabulary & Collocation'}
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isVi ? 'Hoàn thành' : 'Completed'}</span>
           <span className={`text-2xl font-black text-${themeColor}-600`}>{completedCount}/{vocabList.length}</span>
           {visitedCount > completedCount && (
             <span className="text-[10px] text-slate-400 mt-0.5">
               {isVi ? `${visitedCount} đã xem` : `${visitedCount} visited`}
             </span>
           )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button onClick={() => setView('digest')} className="text-xs text-slate-400 hover:text-slate-600 underline">
            {isVi ? 'Xem tổng kết' : 'Summary'}
          </button>
          <button onClick={handleReset} className="text-xs text-rose-400 hover:text-rose-600">
            {isVi ? 'Làm lại' : 'Reset'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
        {vocabList.map(word => (
          <VocabCard
            key={word.id}
            word={word}
            themeColor={themeColor}
            isVi={isVi}
            onComplete={handleCardComplete}
            onUpdate={handleCardUpdate}
            savedCardData={cardsData[word.id]}
            weekNumber={currentWeek}
          />
        ))}
      </div>
    </div>
  );
};

export default VocabManager;
