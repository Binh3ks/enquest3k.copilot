import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Volume2, BookOpen, Globe, PenTool, Check, ArrowRight, AlertTriangle, RefreshCcw, Star, HelpCircle, XCircle, CheckCircle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';
import { useStationProgress } from '../../hooks/useStationProgress';
import { getImageUrl } from '../../utils/imageUrl';
import { useUserStore } from '../../stores/useUserStore';
import HoverWord from '../../components/common/HoverWord';
import dictionaryData from '../../data/dictionary.json';
// import TabbedReadExplore from '../../components/ReadExplore/TabbedReadExplore'; // W36+ only

const ReadingExplore = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const { weekId } = useParams();
  const { learningMode } = useUserStore();
  const currentWeek = parseInt(weekId);
  const normalizeLookupKey = (value = '') => value
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 🔥 W36+: Detect triple-tab structure (Culture, Technology, Social) - DISABLED for W16-35
  // const isW36Plus = data && (data.read_stem || data.read_social);
  // if (isW36Plus) {
  //   return <TabbedReadExplore weekNumber={parseInt(weekId)} weekData={data} />;
  // }
  
  // 🔥 Universal Progress System
  const { savedData, saveProgress, markComplete } = useStationProgress(parseInt(weekId), 'skill_reading');
  
  // 🚀 TTS Prefetch - auto-cache reading content (with weekNumber for auto voice detection)
  
  const [sentences, setSentences] = useState([]);
  const [isReady, setIsReady] = useState(false);
  // Dictionary loaded from static import and merged with per-week data.dictionary
  const [dictionary, setDictionary] = useState({});

  useEffect(() => {
    const staticDict = Array.isArray(dictionaryData)
      ? Object.fromEntries(dictionaryData.map(e => [normalizeLookupKey(e.word), e]))
      : dictionaryData;
    
    const localDict = {};
    if (data && data.dictionary) {
      Object.entries(data.dictionary).forEach(([k, v]) => {
        const normKey = normalizeLookupKey(k);
        localDict[normKey] = {
          word: v.word || k,
          ipa: v.pronunciation || v.ipa || '',
          meaning: v.definition_vi || v.meaning || v.definition_en || '',
          example: v.example || '',
          ...v
        };
      });
    }
    setDictionary({ ...staticDict, ...localDict });
  }, [data]);

  // State initialized from savedData or defaults
  const [currentIdx, setCurrentIdx] = useState(() => savedData.lastPage || 0);
  const [inputValue, setInputValue] = useState(() => savedData.text || "");
  const [committedLength, setCommittedLength] = useState(() => savedData.committedLength || 0);
  const [feedback, setFeedback] = useState(null); 
  const [showFullRef, setShowFullRef] = useState(false);
  const [qInputs, setQInputs] = useState(() => savedData.questions?.qInputs || {});
  const [qFeedback, setQFeedback] = useState(() => {
    // Discard saved "correct" feedback where the saved input was ≤2 words
    // (artefacts from an old bug that accepted partial single-word answers)
    const saved = savedData.questions?.qFeedback || {};
    const inputs = savedData.questions?.qInputs || {};
    return Object.fromEntries(
      Object.entries(saved).filter(([id, fb]) => {
        if (fb?.isCorrect) {
          const words = (inputs[id] || '').trim().split(/\s+/).filter(Boolean);
          return words.length >= 3;
        }
        return true;
      })
    );
  });
  const [showHint, setShowHint] = useState({});
  const [qAttempts, setQAttempts] = useState(() => savedData.questions?.qAttempts || {});
  const [showAnswer, setShowAnswer] = useState(() => savedData.questions?.showAnswer || {});
  const textareaRef = useRef(null);
  const hasRestoredRef = useRef(false); // 🔥 Restore state from server once after async load

  // Restore saved state after server data loads asynchronously
  useEffect(() => {
    if (hasRestoredRef.current) return; // Only restore once per mount
    if (!savedData._savedAt) return;    // Skip if no real saved data yet
    hasRestoredRef.current = true;
    setCurrentIdx(savedData.lastPage || 0);
    setInputValue(savedData.text || '');
    setCommittedLength(savedData.committedLength || 0);
    setQInputs(savedData.questions?.qInputs || {});
    {
      // Discard saved "correct" feedback where the saved input was ≤2 words
      const savedFb = savedData.questions?.qFeedback || {};
      const savedIn = savedData.questions?.qInputs || {};
      setQFeedback(Object.fromEntries(
        Object.entries(savedFb).filter(([id, fb]) => {
          if (fb?.isCorrect) {
            const words = (savedIn[id] || '').trim().split(/\s+/).filter(Boolean);
            return words.length >= 3;
          }
          return true;
        })
      ));
    }
    setQAttempts(savedData.questions?.qAttempts || {});
    setShowAnswer(savedData.questions?.showAnswer || {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedData._savedAt]);

  const isComplete = sentences.length > 0 && currentIdx >= sentences.length;
  const currentSentence = !isComplete && sentences.length > 0 ? sentences[currentIdx] : null;

  // Debounced save effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isReady || !data) return; // Ensure data is loaded and component is ready

      const questionCount = data.comprehension_questions?.length || 0;
      const correctQuestions = Object.values(qFeedback).filter(f => f.isCorrect).length;
      
      const translationProgress = sentences.length > 0 ? (currentIdx / sentences.length) * 100 : 0;
      const questionProgress = questionCount > 0 ? (correctQuestions / questionCount) * 100 : 0;
      
      const percent = Math.round(translationProgress * 0.7 + questionProgress * 0.3);
      const isStationComplete = translationProgress >= 100 && questionProgress >= 100;

      const progressData = {
        lastPage: currentIdx,
        text: inputValue,
        committedLength: committedLength,
        questions: {
          qInputs,
          qFeedback,
          qAttempts,
          showAnswer
        }
      };
      saveProgress(progressData, isStationComplete, percent);
      if (isStationComplete) {
        markComplete(100);
      }
    }, 1500); // Debounce for 1.5 seconds

    return () => {
      clearTimeout(handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, inputValue, committedLength, qInputs, qFeedback, qAttempts, showAnswer, isReady]);

  useEffect(() => {
    const activeData = data?.content_en ? data : (data?.read_explore || data?.read_stem || data);
    if (activeData && activeData.content_en) {
      const enRaw = activeData.content_en.match(/[^.!?]+[.!?]+(\s|$)/g) || [activeData.content_en];
      const viRaw = activeData.content_vi ? (activeData.content_vi.match(/[^.!?]+[.!?]+(\s|$)/g) || [activeData.content_vi]) : [];
      
      const combined = enRaw.map((s, i) => ({
        en: s.trim(),
        vi: viRaw[i] ? viRaw[i].trim() : ""
      }));
      setSentences(combined);
      setIsReady(true);

      if (textareaRef.current) textareaRef.current.focus({ preventScroll: true });
    } else if (data) {
      setIsReady(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const resetProgress = () => {
    setIsReady(false); // Prevent saving during reset
    setCurrentIdx(0); 
    setInputValue(""); 
    setCommittedLength(0); 
    setFeedback(null); 
    setShowFullRef(false); 
    setQInputs({}); 
    setQFeedback({}); 
    setQAttempts({}); 
    setShowAnswer({});
    setTimeout(() => setIsReady(true), 50); // Re-enable saving
  };

  if (!data) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Module...</div>;
  if (!isReady) return <div className="p-10 text-center">Initializing...</div>;

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    if (newVal.length < committedLength) return; 
    if (!newVal.startsWith(inputValue.substring(0, committedLength))) return; 
    
    setInputValue(newVal);
    if (feedback) setFeedback(null); 
    if (showFullRef) setShowFullRef(false); 
    
    if (!isComplete && currentSentence) {
        const char = newVal.slice(-1);
        const validPunctuation = ['.', '!', '?'];
        const currentPart = newVal.substring(committedLength).trim();
        
        if (validPunctuation.includes(char) && currentPart.length > 2) {
            setTimeout(() => {
                const nextText = newVal + (currentIdx < sentences.length - 1 ? " " : "");
                setInputValue(nextText);
                const newCommittedLength = nextText.length;
                setCommittedLength(newCommittedLength);
                const newIndex = currentIdx + 1;
                setCurrentIdx(newIndex);    
                
                // 🔥 Save progress is now handled by the debounced useEffect
                
                if (textareaRef.current) {
                    textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
                }
            }, 100);
        }
    }
  };

  const handleCheck = () => {
    if (isComplete || !currentSentence) return;
    const userInput = inputValue.substring(committedLength).trim();
    // MODE ACADEMIC: Để bắt lỗi dấu câu và viết hoa
    const result = analyzeAnswer(userInput, currentSentence.vi, 'academic'); 
    setFeedback(result); // Dùng trực tiếp result để hiển thị message chi tiết từ smartCheck
    setShowFullRef(true); 
    setTimeout(() => { setFeedback(null); }, 4000);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const handleQCheck = (id, answer) => {
    // Support multiple correct answers (string or array)
    const answers = Array.isArray(answer) ? answer : [answer];
    
    // MODE ACADEMIC cho câu hỏi đọc hiểu
    const res = analyzeAnswer(qInputs[id], answers, 'academic');
    setQFeedback({ ...qFeedback, [id]: res });
    
    // Track attempts for wrong answers
    if (!res.isCorrect) {
      const newAttempts = (qAttempts[id] || 0) + 1;
      setQAttempts({ ...qAttempts, [id]: newAttempts });
      
      // Show correct answer after 3 wrong attempts
      if (newAttempts >= 3) {
        setShowAnswer({ ...showAnswer, [id]: true });
      }
    } else {
      // Ensure correct answers are counted for progress
      const newFeedback = { ...qFeedback, [id]: res };
      setQFeedback(newFeedback);
    }
  };

  const toggleHint = (id) => setShowHint(prev => ({ ...prev, [id]: !prev[id] }));

  const renderStyledText = (text) => {
    if (!text) return null;
    
    const parts = [];
    let key = 0;
    
    // Full lemmatizer: handles possessives, plurals, -ing/-ed/-er/-est forms
    const getDictEntry = (word) => {
      const lower = normalizeLookupKey(word);
      if (!lower) return null;
      // Check if entry with meaning exists
      const v = (key) => {
        const e = dictionary[key];
        return (e && e.meaning && e.meaning.trim()) ? e : null;
      };

      // 1. Direct lookup
      let e = v(lower); if (e) return e;

      // Multi-word chunks only use exact lookup
      if (lower.includes(' ')) {
        return dictionary[lower] || null;
      }

      // 2. Strip possessive: today's → today, children's → children
      const noPoss = lower.replace(/['\u2019]s$/, '');
      if (noPoss !== lower) { e = v(noPoss); if (e) return e; }
      const w = noPoss; // work on possessive-stripped form

      // 3. -ies → -y  (babies → baby, countries → country)
      if (w.endsWith('ies') && w.length > 4) { e = v(w.slice(0,-3)+'y'); if (e) return e; }

      // 4. -ves → -f/-fe  (shelves → shelf, knives → knife)
      if (w.endsWith('ves') && w.length > 4) {
        e = v(w.slice(0,-3)+'f'); if (e) return e;
        e = v(w.slice(0,-3)+'fe'); if (e) return e;
      }

      // 5. -es → base  (boxes → box, classes → class)
      if (w.endsWith('es') && w.length > 4) {
        e = v(w.slice(0,-2)); if (e) return e;
        e = v(w.slice(0,-1)); if (e) return e; // buses → bus
      }

      // 6. -s → base  (rows → row, books → book, students → student)
      if (w.endsWith('s') && w.length > 3) { e = v(w.slice(0,-1)); if (e) return e; }

      // 7. -ing forms  (walking → walk, writing → write, running → run)
      if (w.endsWith('ing') && w.length > 5) {
        const s = w.slice(0,-3);
        e = v(s); if (e) return e;         // walking → walk
        e = v(s+'e'); if (e) return e;     // writing → write
        if (s.length >= 3 && s[s.length-1] === s[s.length-2]) {
          e = v(s.slice(0,-1)); if (e) return e; // running → run
        }
      }

      // 8. -ed forms  (walked → walk, danced → dance, stopped → stop)
      if (w.endsWith('ed') && w.length > 4) {
        const s = w.slice(0,-2);
        e = v(s); if (e) return e;         // walked → walk
        e = v(s+'e'); if (e) return e;     // danced → dance
        if (s.length >= 3 && s[s.length-1] === s[s.length-2]) {
          e = v(s.slice(0,-1)); if (e) return e; // stopped → stop
        }
      }

      // 9. -er/-est  (faster → fast, biggest → big, happier → happy)
      if (w.endsWith('est') && w.length > 5) {
        e = v(w.slice(0,-3)); if (e) return e;   // fastest → fast
        e = v(w.slice(0,-4)); if (e) return e;   // biggest → big
        e = v(w.slice(0,-3)+'y'); if (e) return e; // happiest → happy
      }
      if (w.endsWith('er') && w.length > 4) {
        e = v(w.slice(0,-2)); if (e) return e;   // faster → fast
        e = v(w.slice(0,-3)); if (e) return e;   // bigger → big
        e = v(w.slice(0,-2)+'y'); if (e) return e; // happier → happy
      }

      // 10. -ly adverbs  (quickly → quick, happily → happy)
      if (w.endsWith('ily') && w.length > 5) { e = v(w.slice(0,-3)+'y'); if (e) return e; }
      if (w.endsWith('ly') && w.length > 4) { e = v(w.slice(0,-2)); if (e) return e; }

      // Return best available entry even without meaning (for TTS tier 3)
      return dictionary[lower] || dictionary[noPoss] || null;
    };
    
    // Split by bold markers first
    const segments = text.split(/(\*\*.*?\*\*)/);
    
    for (const segment of segments) {
      if (segment.startsWith('**')) {
        // Bold keyword — TIER 1 (target vocab this week)
        const word = segment.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
        parts.push(
          <HoverWord
            key={key++}
            word={word}
            themeColor={themeColor}
            onSpeak={(w) => speakText(w, null, 1.0, null, 'new_word', parseInt(weekId), learningMode)}
            entry={getDictEntry(word)}
            tier={1}
          />
        );
      } else {
        // Non-bold segment — process char by char to find words
        let currentWord = '';
        let currentNonWord = '';

        for (let i = 0; i < segment.length; i++) {
          const char = segment[i];
          const isWordChar = /[\w'-]/.test(char);

          if (isWordChar) {
            // Flush non-word buffer first
            if (currentNonWord) {
              parts.push(<span key={key++} className="text-xl">{currentNonWord}</span>);
              currentNonWord = '';
            }
            currentWord += char;
          } else {
            // Flush word buffer first
            if (currentWord) {
              const entry = getDictEntry(currentWord);
              // ALL words get HoverWord — tier 3 if not in dictionary
              let tier;
              if (entry && entry.meaning && entry.meaning.trim()) {
                const wasTaughtBefore = entry.first_taught_week && entry.first_taught_week < currentWeek;
                tier = wasTaughtBefore ? 3 : 2;
              } else {
                tier = 3; // Unknown words → tier 3 (TTS only, no popup meaning)
              }
              parts.push(
                <HoverWord
                  key={key++}
                  word={currentWord}
                  themeColor={themeColor}
                  onSpeak={(w) => speakText(w, null, 1.0, null, 'new_word', parseInt(weekId), learningMode)}
                  entry={entry}
                  tier={tier}
                />
              );
              currentWord = '';
            }
            currentNonWord += char;
          }
        }

        // Flush remaining buffers
        if (currentWord) {
          const entry = getDictEntry(currentWord);
          let tier;
          if (entry && entry.meaning && entry.meaning.trim()) {
            const wasTaughtBefore = entry.first_taught_week && entry.first_taught_week < currentWeek;
            tier = wasTaughtBefore ? 3 : 2;
          } else {
            tier = 3;
          }
          parts.push(
            <HoverWord
              key={key++}
              word={currentWord}
              themeColor={themeColor}
              onSpeak={(w) => speakText(w, null, 1.0, null, 'new_word', parseInt(weekId), learningMode)}
              entry={entry}
              tier={tier}
            />
          );
        }
        if (currentNonWord) {
          parts.push(<span key={key++} className="text-xl">{currentNonWord}</span>);
        }
      }
    }
    
    return parts;
  };

  const renderCleanText = (text) => text.replace(/\*\*/g, '');
  const currentUserInput = inputValue.substring(committedLength).trim();
  const currentInputLen = currentUserInput.length;
  const targetLen = currentSentence ? currentSentence.vi.length : 50;
  const progressPercent = Math.min(100, Math.floor((currentInputLen / targetLen) * 100));
  const canCheck = progressPercent >= 50;

  return (
    <div className="space-y-8 pb-24">
      {/* 1. HEADER & READING CONTENT (Updated UI) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative group">
        {data.image_url && (
            <div className="w-full bg-slate-100 relative overflow-hidden">
                <img src={getImageUrl(data.image_url)} className="w-full max-h-[480px] md:max-h-[560px] aspect-[16/10] md:aspect-[16/9] object-cover object-center transition-transform duration-700 group-hover:scale-105" alt="Reading Cover" onError={(e) => { e.target.style.display='none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white shadow-sm`}><BookOpen className="w-4 h-4" /></div>
                        <p className="text-xs text-white/90 font-bold uppercase tracking-widest">{isVi ? "Đọc hiểu & Dịch thuật" : "Reading & Translation"}</p>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-lg">{data.title || data.title_en}</h2>
                </div>
            </div>
        )}
        
        <div className="p-8">
            <div className="flex justify-between items-start mb-6">
               <button onClick={() => speakText(renderCleanText(data.content_en), null, 1.0, null, 'read', parseInt(weekId), learningMode, true)} className={`p-3 bg-${themeColor}-600 text-white rounded-full shadow-lg hover:bg-${themeColor}-700 transition-transform hover:scale-110 flex-shrink-0`}>
                  <Volume2 className="w-6 h-6" />
               </button>
               <button onClick={onToggleLang} className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center bg-slate-100 px-3 py-1 rounded-lg transition-colors"><Globe className="w-3 h-3 mr-1"/> {isVi?'VI':'EN'}</button>
            </div>
            <div className="leading-loose font-medium text-justify select-text cursor-text text-slate-800 text-lg">
                {renderStyledText(data.content_en)}
            </div>
        </div>
      </div>

      {/* 2. TRANSLATION CHALLENGE */}
      <div className={`bg-${themeColor}-50/50 p-6 rounded-3xl border-2 border-${themeColor}-100`}>
        <div className="flex justify-between items-center mb-6">
            <h3 className={`text-sm font-black text-${themeColor}-800 uppercase flex items-center tracking-wider`}><PenTool className="w-4 h-4 mr-2"/> {isVi ? "Thử thách Dịch thuật" : "Translation Challenge"}</h3>
            <button onClick={resetProgress} className="text-xs text-slate-400 hover:text-rose-500 flex items-center font-bold transition-colors"><RefreshCcw className="w-3 h-3 mr-1"/> {isVi ? "Làm lại" : "Reset"}</button>
        </div>
        {!isComplete && currentSentence ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 mb-6 animate-in fade-in slide-in-from-bottom-2">
               <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Sentence {currentIdx + 1} / {sentences.length}</span>
                  <button onClick={() => speakText(renderCleanText(currentSentence.en), null, 1.0, null, 'read', parseInt(weekId), learningMode)} className="text-slate-300 hover:text-indigo-500 transition-colors"><Volume2 className="w-5 h-5"/></button>
               </div>
               <p className="text-2xl font-bold text-slate-800 leading-snug select-text cursor-text">{renderCleanText(currentSentence.en)}</p>
               {showFullRef && currentSentence.vi && (<div className="mt-4 pt-4 border-t border-slate-50 animate-in fade-in"><p className="text-xs font-bold text-green-600 uppercase mb-1">{isVi ? "Gợi ý / Câu mẫu:" : "Suggestion / Sample:"}</p><p className="text-green-800 font-medium text-sm">{renderCleanText(currentSentence.vi)}</p></div>)}
            </div>
        ) : isComplete ? (<div className="bg-green-100 p-8 rounded-2xl text-center text-green-800 font-bold mb-6 flex flex-col items-center justify-center border border-green-200 shadow-inner"><CheckCircle className="w-12 h-12 mb-3 text-green-600"/><span className="text-lg">{isVi ? "Hoàn thành xuất sắc!" : "Excellent Work!"}</span></div>) : null}
        
        <div className="relative group">
            <div className="mb-3 px-4 py-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50"><p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-wider">{isVi ? "Đoạn văn của bạn:" : "Your Paragraph:"}</p><p className="text-slate-700 text-sm leading-relaxed italic opacity-90">{inputValue.substring(0, committedLength)}</p></div>
            <textarea ref={textareaRef} value={inputValue} onChange={handleInputChange} className="w-full p-6 pb-16 bg-white rounded-2xl border-2 border-transparent shadow-sm focus:shadow-md focus:border-indigo-300 outline-none text-xl leading-loose text-slate-700 placeholder:text-slate-300 font-medium min-h-[200px] transition-all" placeholder={isVi ? "Nhập bản dịch của bạn (kết thúc câu bằng dấu chấm)..." : "Start typing (end with a period)..."} spellCheck={false} readOnly={isComplete} />
            {feedback && (<div className={`absolute bottom-4 left-4 right-24 p-3 rounded-xl flex items-center shadow-lg animate-in slide-in-from-bottom-2 z-10 backdrop-blur-sm border ${feedback.status === 'warning' ? 'bg-orange-50/90 text-orange-800 border-orange-200' : feedback.status === 'perfect' ? 'bg-green-50/90 text-green-700 border-green-200' : 'bg-rose-50/90 text-rose-700 border-rose-200'}`}>{feedback.status === 'perfect' ? <CheckCircle className="w-5 h-5 mr-2 shrink-0"/> : <AlertTriangle className="w-5 h-5 mr-2 shrink-0"/>}<span className="text-sm font-bold ml-2">{feedback.message}</span></div>)}
            {!isComplete && canCheck && (<button onClick={handleCheck} className={`absolute bottom-4 right-4 h-10 px-6 rounded-xl font-bold text-xs text-white shadow-lg transition-all flex items-center z-20 bg-${themeColor}-600 hover:bg-${themeColor}-700 hover:scale-105 active:scale-95 cursor-pointer animate-in zoom-in`}>{isVi ? "Kiểm tra" : "Check"} <ArrowRight className="w-4 h-4 ml-2"/></button>)}
            {!isComplete && (<span className={`absolute bottom-4 left-6 text-[10px] font-bold transition-opacity duration-300 ${feedback ? 'opacity-0' : 'opacity-100'} ${canCheck ? 'text-green-600' : 'text-slate-300'}`}>{currentInputLen}/{Math.floor(targetLen * 0.5)} chars ({progressPercent}%)</span>)}
        </div>
      </div>

      {/* 3. COMPREHENSION CHECK */}
      <div className="space-y-6 pt-8 border-t border-slate-200 mt-8">
        <h3 className="font-black text-slate-700 uppercase tracking-wider ml-1 text-sm">{isVi ? "Kiểm tra Đọc hiểu" : "Comprehension Check"}</h3>
        {data.comprehension_questions && data.comprehension_questions.map((q, idx) => {
          const opts = (q.options && Array.isArray(q.options) && q.options.length > 0)
            ? q.options
            : [
                (Array.isArray(q.answer) ? q.answer[0] : q.answer) || 'Correct Choice',
                'Other Option 1',
                'Other Option 2',
                'Other Option 3'
              ];
          const selectedOpt = qInputs[q.id] || '';
          const isDone = qFeedback[q.id]?.isCorrect;

          return (
            <div key={q.id || idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-100 transition-colors">
               <div className="flex gap-3 mb-4">
                  <span className={`px-2 py-1 rounded bg-${themeColor}-50 text-${themeColor}-700 text-[10px] font-black h-fit uppercase`}>Q{idx + 1}</span>
                  <p className="font-bold text-slate-800 text-base">{q.question_en}</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                 {opts.map((opt, optIdx) => {
                   const isSelected = selectedOpt === opt;
                   const correctChoice = Array.isArray(q.answer) ? q.answer[0] : q.answer;
                   const isOptCorrect = isDone && (opt === correctChoice || opt === q.answer);
                   const isOptWrong = qFeedback[q.id] && !qFeedback[q.id].isCorrect && isSelected;
                   
                   let btnClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
                   if (isSelected) btnClass = "bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm";
                   if (isDone && isOptCorrect) btnClass = "bg-green-600 text-white border-green-600 font-bold shadow-md";
                   if (isOptWrong) btnClass = "bg-rose-500 text-white border-rose-500 font-bold opacity-80";

                   return (
                     <button
                       key={optIdx}
                       disabled={isDone}
                       onClick={() => {
                         setQInputs(prev => ({ ...prev, [q.id]: opt }));
                         handleQCheck(q.id, opt, q.answer);
                       }}
                       className={`px-4 py-2.5 rounded-xl border text-left text-sm transition-all flex items-center gap-2 ${btnClass}`}
                     >
                       <span className="w-5 h-5 rounded-full bg-slate-100/30 text-xs font-black flex items-center justify-center flex-shrink-0">
                         {String.fromCharCode(65 + optIdx)}
                       </span>
                       <span>{opt}</span>
                     </button>
                   );
                 })}
               </div>
               {qFeedback[q.id] && !qFeedback[q.id].isCorrect && (
                 <p className="mt-3 text-xs font-bold flex items-center animate-in slide-in-from-top-1 text-rose-500">
                   <XCircle className="w-4 h-4 mr-1.5"/> {qFeedback[q.id].message}
                 </p>
               )}
               {qFeedback[q.id]?.isCorrect && (
                 <p className="mt-3 text-xs font-bold flex items-center animate-in slide-in-from-top-1 text-green-600">
                   <CheckCircle className="w-4 h-4 mr-1.5"/> {qFeedback[q.id].message}
                 </p>
               )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ReadingExplore;
