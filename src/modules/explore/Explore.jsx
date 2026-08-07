import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Volume2, Globe, HelpCircle, CheckCircle, XCircle, AlertTriangle, Lightbulb, ArrowRight, Edit3, Sparkles } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';
import { useStationProgress } from '../../hooks/useStationProgress';
import { getImageUrl } from '../../utils/imageUrl';
import { useUserStore } from '../../stores/useUserStore';
import HoverWord from '../../components/common/HoverWord';
import dictionaryData from '../../data/dictionary.json';
// import TabbedExplore from '../../components/Explore/TabbedExplore'; // W36+ only

const Explore = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const { weekId } = useParams();
  const { learningMode } = useUserStore();
  const currentWeek = parseInt(weekId);
  const normalizeLookupKey = (value = '') => value
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // 🔥 W36+: Detect triple-tab structure (Culture, Technology, Social) - DISABLED for W16-35
  // const isW36Plus = data && (data.explore_stem || data.explore_social);
  // if (isW36Plus) {
  //   return <TabbedExplore weekNumber={parseInt(weekId)} weekData={data} />;
  // }
  
  // 🔥 Universal Progress System Integration
  const { savedData, saveProgress, markComplete } = useStationProgress(
    parseInt(weekId), 
    'explore'
  );
  

  // Support both legacy (check_questions) and new (comprehension_questions) field names
  const checkQs = data?.check_questions || data?.comprehension_questions || [];

  const [dictionary] = useState(() => {
    // Convert array to lookup object on mount
    const dict = Array.isArray(dictionaryData)
      ? Object.fromEntries(dictionaryData.map(e => [normalizeLookupKey(e.word), e]))
      : dictionaryData;
    console.log('[Explore] Dictionary loaded:', Object.keys(dict).length, 'entries');
    return dict;
  });
  
  const [inputs, setInputs] = useState(savedData.inputs || {});
  const [feedback, setFeedback] = useState(savedData.feedback || {});
  const [showHint, setShowHint] = useState({}); 
  const [showModel, setShowModel] = useState(savedData.showModel || false);
  const [attempts, setAttempts] = useState(savedData.attempts || {}); // Track attempts per question
  const [showAnswer, setShowAnswer] = useState(savedData.showAnswer || {}); // Show correct answer after 3 attempts
  const [completedIds, setCompletedIds] = useState(() => new Set(savedData.completedIds || []));
  const [imageSrc, setImageSrc] = useState("https://placehold.co/800x400/e2e8f0/64748b?text=Image+Loading...");
  // BUG FIX (Jun 7, 2026): re-sync from savedData after async fetchWeekProgress
  const hasRestoredExplore = useRef(false);
  useEffect(() => {
    if (hasRestoredExplore.current) return;
    if (!savedData._savedAt) return;
    hasRestoredExplore.current = true;
    if (savedData.attempts && Object.keys(attempts).length === 0) setAttempts(savedData.attempts);
    if (savedData.showAnswer && Object.keys(showAnswer).length === 0) setShowAnswer(savedData.showAnswer);
    if (savedData.completedIds?.length) setCompletedIds(new Set(savedData.completedIds));
  }, [savedData]);

  // Preload image to avoid flicker and handle errors
  useEffect(() => {
    if (data?.image_url) {
      const img = new Image();
      img.src = getImageUrl(data.image_url);
      img.onload = () => setImageSrc(getImageUrl(data.image_url));
      img.onerror = () => setImageSrc("https://placehold.co/800x400/e2e8f0/64748b?text=Image+Failed+to+Load");
    }
  }, [data?.image_url]);

  // 🔥 Debounced Save to Universal Progress System
  useEffect(() => {
    const handler = setTimeout(() => {
      const total = checkQs.length + (data?.question ? 1 : 0) || 0;
      if (total > 0) {
        const percent = Math.round((completedIds.size / total) * 100);
        const isComplete = completedIds.size === total;
        
        saveProgress({
          completedIds: [...completedIds],
          inputs,
          feedback,
          attempts,
          showAnswer,
          showModel,
        }, isComplete, percent);
        
        if (isComplete) {
          markComplete(100);
        }
      }
    }, 1500);

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkQs.length, data?.question, completedIds, inputs, feedback, attempts, showAnswer, showModel]);

  // Early return AFTER hooks
  if (!data) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Explore...</div>;

  const handleCheck = (id, correctAnswers) => {
      // --- CRITICAL THINKING MODE (ID 99) ---
      if (id === 99) {
          const res = analyzeAnswer(inputs[id], [], 'critical');
          setFeedback({ ...feedback, [id]: res });
          setShowModel(true);

          if (res.isCorrect && !completedIds.has(99)) {
              const newCompleted = new Set(completedIds);
              newCompleted.add(99);
              setCompletedIds(newCompleted);
          }
          return;
      }

      const answers = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
      const res = analyzeAnswer(inputs[id], answers, 'academic');
      setFeedback({ ...feedback, [id]: res });

      if (res.isCorrect) {
          if (!completedIds.has(id)) {
              const newCompleted = new Set(completedIds);
              newCompleted.add(id);
              setCompletedIds(newCompleted);
          }
      } else {
          const newAttempts = (attempts[id] || 0) + 1;
          setAttempts({ ...attempts, [id]: newAttempts });
          if (newAttempts >= 3) {
              setShowAnswer({ ...showAnswer, [id]: true });
          }
      }
  };

  const report = (completed) => {
      if (onReportProgress && checkQs.length > 0) {
          const total = checkQs.length + 1; 
          onReportProgress(Math.round((completed.size / total) * 100));
      }
  };

  const toggleHint = (id) => setShowHint(prev => ({ ...prev, [id]: !prev[id] }));

  // 📖 Render content with 3-tier dictionary system
  const renderStyledText = (text) => {
    if (!text) return null;
    
    const parts = [];
    let key = 0;
    
    // Full lemmatizer: handles possessives, plurals, -ing/-ed/-er/-est forms
    const getDictEntry = (word) => {
      const lower = normalizeLookupKey(word);
      if (!lower) return null;
      const v = (key) => {
        const e = dictionary[key];
        return (e && e.meaning && e.meaning.trim()) ? e : null;
      };

      // 1. Direct lookup
      let e = v(lower); if (e) return e;

      // Multi-word chunks only use exact normalized lookup
      if (lower.includes(' ')) {
        return dictionary[lower] || null;
      }

      // 2. Strip possessive: today's → today, children's → children
      const noPoss = lower.replace(/['\u2019]s$/, '');
      if (noPoss !== lower) { e = v(noPoss); if (e) return e; }
      const w = noPoss;

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
        e = v(w.slice(0,-1)); if (e) return e;
      }

      // 6. -s → base  (rows → row, books → book, students → student)
      if (w.endsWith('s') && w.length > 3) { e = v(w.slice(0,-1)); if (e) return e; }

      // 7. -ing forms  (walking → walk, writing → write, running → run)
      if (w.endsWith('ing') && w.length > 5) {
        const s = w.slice(0,-3);
        e = v(s); if (e) return e;
        e = v(s+'e'); if (e) return e;
        if (s.length >= 3 && s[s.length-1] === s[s.length-2]) {
          e = v(s.slice(0,-1)); if (e) return e;
        }
      }

      // 8. -ed forms  (walked → walk, danced → dance, stopped → stop)
      if (w.endsWith('ed') && w.length > 4) {
        const s = w.slice(0,-2);
        e = v(s); if (e) return e;
        e = v(s+'e'); if (e) return e;
        if (s.length >= 3 && s[s.length-1] === s[s.length-2]) {
          e = v(s.slice(0,-1)); if (e) return e;
        }
      }

      // 9. -er/-est  (faster → fast, biggest → big, happier → happy)
      if (w.endsWith('est') && w.length > 5) {
        e = v(w.slice(0,-3)); if (e) return e;
        e = v(w.slice(0,-4)); if (e) return e;
        e = v(w.slice(0,-3)+'y'); if (e) return e;
      }
      if (w.endsWith('er') && w.length > 4) {
        e = v(w.slice(0,-2)); if (e) return e;
        e = v(w.slice(0,-3)); if (e) return e;
        e = v(w.slice(0,-2)+'y'); if (e) return e;
      }

      // 10. -ly adverbs  (quickly → quick, happily → happy)
      if (w.endsWith('ily') && w.length > 5) { e = v(w.slice(0,-3)+'y'); if (e) return e; }
      if (w.endsWith('ly') && w.length > 4) { e = v(w.slice(0,-2)); if (e) return e; }

      return dictionary[lower] || dictionary[noPoss] || null;
    };
    
    // Split by bold markers first
    const segments = text.split(/(\*\*.*?\*\*)/);
    
    for (const segment of segments) {
      if (segment.startsWith('**')) {
        // Bold keyword — TIER 1 (target chunk this week)
        const word = segment.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
        parts.push(
          <HoverWord
            key={key++}
            word={word}
            themeColor={themeColor}
            onSpeak={(w) => speakText(w, null, 1.0, null, 'explore', parseInt(weekId), learningMode)}
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
            if (currentNonWord) {
              parts.push(<span key={key++} className="text-xl">{currentNonWord}</span>);
              currentNonWord = '';
            }
            currentWord += char;
          } else {
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
                  onSpeak={(w) => speakText(w, null, 1.0, null, 'explore', parseInt(weekId), learningMode)}
                  entry={entry}
                  tier={tier}
                />
              );
              currentWord = '';
            }
            currentNonWord += char;
          }
        }

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
              onSpeak={(w) => speakText(w, null, 1.0, null, 'explore', parseInt(weekId), learningMode)}
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

  const criticalQ = data.question || data.think_respond || { text_en: "What do you think?", text_vi: "Bạn nghĩ sao?", hint_en: "I think...", hint_vi: "Tôi nghĩ..." };

  return (
    <div className="space-y-8 pb-24">
      {/* HEADER & CONTENT */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative group">
        <div className="w-full bg-slate-100 relative overflow-hidden">
            <img src={imageSrc} className="w-full aspect-[16/6] object-cover object-center transition-transform duration-700 group-hover:scale-105" alt="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5">
               <h2 className="text-xl font-black text-white leading-tight drop-shadow-md">{data.title_en}</h2>
            </div>
        </div>
        <div className="p-8">
            <div className="flex justify-between items-start mb-4">
               <button onClick={() => speakText(data.content_en.replace(/\*\*/g, ''), null, 1.0, null, 'explore', parseInt(weekId), learningMode)} className={`p-3 bg-${themeColor}-600 text-white rounded-full shadow-lg hover:bg-${themeColor}-700 transition-transform hover:scale-110 flex-shrink-0`}>
                  <Volume2 className="w-6 h-6" />
               </button>
               <button onClick={onToggleLang} className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center bg-slate-100 px-3 py-1 rounded-lg transition-colors"><Globe className="w-3 h-3 mr-1"/> {isVi?'VI':'EN'}</button>
            </div>
            <div className="leading-loose font-medium text-justify text-slate-800">
               {renderStyledText(data.content_en)}
            </div>
            {isVi && <div className="mt-6 p-4 bg-lime-50 rounded-xl text-lime-900 italic text-lg border-l-4 border-lime-400">{data.content_vi.replace(/\*\*/g, '')}</div>}
        </div>
      </div>

      {/* CHECK QUESTIONS */}
      <div className="grid grid-cols-1 gap-6">
        {checkQs.map((q, i) => {
            const qId = i + 1;
            const answers = q.answer || q.answer_en || [];
            const currentFeedback = feedback[qId];

            return (
                <div key={qId} className={`bg-white p-6 rounded-2xl border-2 shadow-sm transition-all ${currentFeedback?.status === 'perfect' ? 'border-green-200' : currentFeedback?.status === 'warning' ? 'border-amber-200' : 'border-slate-200'}`}>
                   <h3 className="text-xs font-black text-slate-400 uppercase mb-3 flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-lime-500"/> {isVi ? "Câu hỏi" : "Check"} {qId}</h3>
                   <p className="text-xl font-bold text-slate-800 mb-4">{q.question_en}</p>
                    
                   <div className="relative">
                      <input 
                        type="text" 
                        className={`w-full p-4 pr-32 bg-slate-50 rounded-xl border-2 outline-none text-lg font-medium transition-all 
                            ${currentFeedback?.status === 'perfect' ? 'border-green-400 bg-green-50 text-green-900' : 
                              currentFeedback?.status === 'warning' ? 'border-amber-400 bg-amber-50 text-amber-900' : 
                              currentFeedback?.status === 'wrong' ? 'border-rose-300 bg-rose-50 text-rose-900' : 
                              'border-slate-200 focus:border-lime-500 focus:bg-white'}`} 
                        placeholder={isVi ? "Nhập câu trả lời..." : "Type your answer..."} 
                        value={inputs[qId]||''} 
                        onChange={e=>{
                            setInputs({...inputs, [qId]: e.target.value}); 
                            if(currentFeedback) setFeedback({...feedback, [qId]: null});
                        }} 
                        onKeyDown={(e) => e.key === 'Enter' && handleCheck(qId, answers)} 
                      />
                      <div className="absolute right-2 top-2 bottom-2 flex gap-1">
                          <button onClick={() => toggleHint(qId)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Hint"><HelpCircle className="w-5 h-5" /></button>
                          <button onClick={()=>handleCheck(qId, answers)} className={`px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors text-white shadow-sm ${currentFeedback?.status === 'perfect' ? 'bg-green-500' : 'bg-lime-600 hover:bg-lime-700 active:scale-95'}`}>Check</button>
                      </div>
                   </div>
                   {currentFeedback && (
                       <div className={`mt-3 flex items-start gap-2 animate-in slide-in-from-top-1 ${currentFeedback.status === 'perfect' ? 'text-green-600' : currentFeedback.status === 'warning' ? 'text-amber-600' : 'text-rose-500'}`}>
                           {currentFeedback.status === 'perfect' ? <CheckCircle className="w-5 h-5 mt-0.5"/> : currentFeedback.status === 'warning' ? <AlertTriangle className="w-5 h-5 mt-0.5"/> : <XCircle className="w-5 h-5 mt-0.5"/>}
                           <span className="text-sm font-bold">{currentFeedback.message} {attempts[qId] > 0 && !showAnswer[qId] && `(Lần ${attempts[qId]}/3)`}</span>
                       </div>
                   )}
                   {showHint[qId] && (<div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-300 rounded-r-lg text-xs text-slate-600 italic flex items-center animate-fade-in"><Lightbulb className="w-3 h-3 mr-2 text-amber-500"/> {isVi ? q.hint_vi : (q.hint_en || q.hint)}</div>)}
                   {showAnswer[qId] && (
                       <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg animate-fade-in">
                           <p className="text-[10px] font-black text-green-600 uppercase mb-1">Đáp án đúng:</p>
                           <p className="text-sm font-bold text-green-800">{Array.isArray(answers) ? answers[0] : answers}</p>
                       </div>
                   )}
                </div>
            );
        })}
      </div>

      {/* 3. CRITICAL THINKING */}
      <div className={`bg-gradient-to-br from-lime-50 to-white p-8 rounded-3xl border-2 transition-all shadow-sm ${feedback[99]?.status === 'perfect' ? 'border-green-300 ring-2 ring-green-100' : 'border-lime-200'}`}>
           <h3 className="text-sm font-black text-lime-700 uppercase mb-4 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500"/> 
              {isVi ? "Tư duy Phản biện" : "Critical Thinking"}
           </h3>
           <p className="text-2xl font-bold text-slate-800 mb-2">{criticalQ.text_en}</p>
           {isVi && <p className="text-sm text-slate-500 italic mb-6">{criticalQ.text_vi}</p>}
           
           <div className="relative">
              <textarea 
                  className={`w-full p-5 bg-white rounded-2xl border-2 text-lg outline-none resize-none transition-all shadow-inner
                    ${feedback[99]?.status === 'perfect' ? 'border-green-400 text-green-900 focus:ring-2 focus:ring-green-200' : 
                      feedback[99]?.status === 'warning' ? 'border-amber-400 focus:ring-2 focus:ring-amber-200' : 
                      'border-lime-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-100'}`} 
                  rows="3" 
                  placeholder={isVi ? "Tôi nghĩ là..." : "I think..."} 
                  value={inputs[99]||''} 
                  onChange={e=>{
                      setInputs({...inputs, [99]: e.target.value}); 
                      if(feedback[99]) setFeedback({...feedback, 99: null});
                      if(showModel) setShowModel(false);
                  }}
               ></textarea>
               
               <button onClick={()=>handleCheck(99, [])} className={`mt-4 px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all float-right flex items-center text-white transform active:scale-95 ${feedback[99]?.status === 'perfect' ? 'bg-green-600 hover:bg-green-700' : 'bg-lime-600 hover:bg-lime-700'}`}>
                   {isVi ? "Kiểm tra" : "Check Answer"} <Edit3 className="w-4 h-4 ml-2"/>
               </button>
           </div>
           
           <div className="clear-both pt-2"></div>

           {/* FEEDBACK */}
           {feedback[99] && (
               <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2 ${feedback[99].status === 'perfect' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                   {feedback[99].status === 'perfect' ? <CheckCircle className="w-6 h-6 shrink-0"/> : <AlertTriangle className="w-6 h-6 shrink-0"/>}
                   <div><p className="font-bold">{feedback[99].message}</p></div>
               </div>
           )}

           {/* MODEL ANSWER & HINT */}
           {showModel && (
               <div className="mt-6 animate-in fade-in zoom-in-95 duration-300 space-y-3">
                   {/* Cấu trúc */}
                   <div className="p-4 bg-white rounded-xl border border-lime-100 shadow-sm">
                       <p className="text-xs font-black text-lime-500 uppercase mb-1 flex items-center tracking-wider">
                          <Lightbulb className="w-3 h-3 mr-1.5"/> {isVi ? "Cấu trúc gợi ý:" : "Sentence Structure:"}
                       </p>
                       <p className="font-medium text-slate-600 italic">"{criticalQ.hint_en || criticalQ.hint}"</p>
                   </div>
                   
                   {/* Câu Mẫu Hoàn Chỉnh (Nếu có) */}
                   {criticalQ.model_answer && (
                       <div className="p-4 bg-lime-100/50 rounded-xl border border-lime-200 shadow-sm">
                           <p className="text-xs font-black text-green-600 uppercase mb-1 flex items-center tracking-wider">
                              <CheckCircle className="w-3 h-3 mr-1.5"/> {isVi ? "Câu mẫu hoàn chỉnh:" : "Model Example:"}
                           </p>
                           <p className="text-lg font-bold text-green-800">"{criticalQ.model_answer}"</p>
                       </div>
                   )}
               </div>
           )}
      </div>
    </div>
  );
};
export default Explore;
