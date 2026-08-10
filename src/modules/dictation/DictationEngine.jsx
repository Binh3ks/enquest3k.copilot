import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Volume2, CheckCircle, XCircle, Globe, Keyboard, LayoutList, Type, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';
import { useStationProgress } from '../../hooks/useStationProgress';
import { useTTSPrefetch } from '../../hooks/useTTSPrefetch';

const DictationEngine = ({ data, themeColor, isVi, onToggleLang, onReportProgress, weekNumber, mode: propMode }) => {
  const { weekId } = useParams();
  const currentWeek = weekNumber || parseInt(weekId);
  
  // 🔥 Universal Progress System with mode support
  const { savedData, saveProgress, markComplete, mode: hookMode } = useStationProgress(parseInt(weekId), 'skill_dictation');
  const rawMode = propMode || hookMode || 'advanced';
  const mode = currentWeek >= 33 ? 'advanced' : rawMode;
  
  // 🚀 TTS Prefetch - auto-cache dictation sentences (with weekNumber for auto voice detection)
  const { prefetchFromArray } = useTTSPrefetch('dictation', currentWeek);
  
  const [level, setLevel] = useState(savedData.level || 1);
  const [inputs, setInputs] = useState(savedData.inputs || {});
  const [feedback, setFeedback] = useState(savedData.feedback || {});
  const [completedIds, setCompletedIds] = useState(() => new Set(savedData.correctSentences || []));
  // BUG FIX (Jun 7, 2026): re-sync from savedData after async fetchWeekProgress
  const hasRestoredDictation = useRef(false);
  useEffect(() => {
    if (hasRestoredDictation.current) return;
    if (!savedData._savedAt) return;
    hasRestoredDictation.current = true;
    if (savedData.level) setLevel(savedData.level);
    if (savedData.inputs && Object.keys(inputs).length === 0) setInputs(savedData.inputs);
    if (savedData.feedback && Object.keys(feedback).length === 0) setFeedback(savedData.feedback);
    if (savedData.correctSentences?.length) setCompletedIds(new Set(savedData.correctSentences));
  }, [savedData]);

  // 🔒 Memoize shuffled word order per sentence — prevents reshuffling on every keystroke
  const shuffledWordsBySentence = useMemo(() => {
    if (!data?.sentences) return {};
    const result = {};
    data.sentences.forEach(s => {
      const words = (s.text_en || s.text || '')
        .replace(/[.,?!]$/g, '').replace(/[,?!]/g, '').split(' ');
      // Fisher-Yates shuffle (stable per mount)
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
      result[s.id] = words;
    });
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.sentences]);

  // � DEBUG: Log sentences structure
  useEffect(() => {
    const sentences = data?.sentences || [];
    console.log('[DictationEngine] 🐛 DEBUG - sentences:', {
      hasSentences: !!data?.sentences,
      sentencesLength: sentences.length,
      mode: mode,
      firstItem: sentences[0]
    });
  }, [data, mode]);

  const hasPrefetched = useRef(false); // 🔥 Prevent infinite prefetch loop
  // 🔥 FIX: Reset state when mode changes

  useEffect(() => {
    setLevel(savedData.level || 1);
    setInputs(savedData.inputs || {});
    setFeedback(savedData.feedback || {});
    setCompletedIds(new Set(savedData.correctSentences || []));
  }, [mode]); // Only depend on mode

  useEffect(() => {
    const handler = setTimeout(() => {
      const totalSentences = data?.sentences?.length || 0;
      if (totalSentences > 0) {
        const percent = Math.round((completedIds.size / totalSentences) * 100);
        const isComplete = completedIds.size === totalSentences;
        
        saveProgress({
          level,
          inputs,
          feedback,
          correctSentences: [...completedIds]
        }, isComplete, percent);
        
        if (isComplete) {
          markComplete(100);
        }
      }
    }, 1500); // Debounce saving

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, inputs, feedback, completedIds]);

  // 🚀 Pre-cache dictation sentences for instant playback (ONCE per data load)
  useEffect(() => {
    // Reset flag when data or mode changes
    hasPrefetched.current = false;
  }, [data, mode]);
  
  useEffect(() => {
    if (hasPrefetched.current) return; // Already prefetched
    
    if (data?.sentences) {
      hasPrefetched.current = true;
      console.log(`[DictationEngine] 🚀 Starting prefetch for ${data.sentences.length} sentences...`);
      prefetchFromArray(data.sentences, 'text_en').catch(err => {
        console.warn('[DictationEngine] ❌ Prefetch failed:', err);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.sentences?.length, prefetchFromArray]);


  if (!data) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Dictation...</div>;

  const levels = [ 
     {l: 1, icon: LayoutList, label: 'Level 1', desc_en: "Unscramble words", desc_vi: "Sắp xếp lại câu (Dễ)"}, 
     {l: 2, icon: Keyboard, label: 'Level 2', desc_en: "Fill in the blanks", desc_vi: "Điền từ còn thiếu (Vừa)"}, 
     {l: 3, icon: Type, label: 'Level 3', desc_en: "Type full sentence", desc_vi: "Gõ lại cả câu (Khó)"} 
  ];

  const getCloze = (text) => text.split(' ').map((w, i) => (i % 3 === 2 || w.length > 5) ? '______' : w).join(' ');
  
  const getMessage = (res) => {
    if (!res) return "";
    
    if (res.status === 'perfect') return isVi ? "Chính xác tuyệt đối!" : "Perfect! Exact match.";
    if (res.status === 'empty') return isVi ? "Bạn chưa nhập gì cả." : "Please type something.";

    if (res.status === 'warning') {
        if (res.error === 'style_error') {
            const details = res.details || [];
            let errs = [];
            if (details.includes('Capitalize first letter')) errs.push(isVi ? "Viết hoa đầu câu" : "Capitalize first letter");
            if (details.includes('End with punctuation (.!?)')) errs.push(isVi ? "Dấu chấm câu" : "End punctuation");
            if (errs.length === 0 && details.length > 0) errs = details;
            return isVi ? `Đúng từ, nhưng chú ý: ${errs.join(" & ")}` : `Correct words, but check: ${errs.join(" & ")}`;
        }
        if (res.error === 'missing_keywords') {
            return isVi ? "Thiếu một số từ quan trọng." : "Missing key words.";
        }
        if (res.message) return res.message;
        return isVi ? "Gần đúng, hãy kiểm tra lại." : "Close, check again.";
    }

    if (res.status === 'wrong') {
        return isVi ? "Chưa đúng. Hãy nghe kỹ lại nhé!" : "Incorrect. Listen again.";
    }
    return "";
  };

  const handleCheck = (id, correctText) => {
    const result = analyzeAnswer(inputs[id], correctText, 'strict');
    const msg = getMessage(result);
    setFeedback({ ...feedback, [id]: { ...result, message: msg } });

    // REPORT PROGRESS - correct answer, perfect match, or right words with minor style issues (capitalization/punctuation)
    if (result.isCorrect || result.status === 'perfect' || (result.status === 'warning' && result.error === 'style_error')) {
        if (!completedIds.has(id)) {
            const newCompleted = new Set(completedIds);
            newCompleted.add(id);
            setCompletedIds(newCompleted);
        }
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div className={`bg-${themeColor}-50 p-4 rounded-xl border border-${themeColor}-200 sticky top-0 z-10 backdrop-blur-md bg-opacity-95 shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
            <div>
               <h2 className={`text-xl font-black text-${themeColor}-900 uppercase`}>Dictation</h2>
               <p className="text-xs font-bold text-slate-500">{isVi ? "Nghe chép chính tả" : "Listen & Write"}</p>
            </div>
            <button onClick={onToggleLang} className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold flex items-center shadow-sm border border-slate-200 transition-colors hover:bg-slate-50"><Globe className="w-3 h-3 mr-1"/> {isVi?'VI':'EN'}</button>
        </div>
        
        <div className="flex p-1 bg-white rounded-lg border border-slate-200 mb-3">
            {levels.map(item => (
               <button 
                 key={item.l}
                 onClick={() => { setLevel(item.l); setInputs({}); setFeedback({}); }}
                 className={`flex-1 flex items-center justify-center py-2 rounded-md text-xs font-bold transition-all ${level === item.l ? `bg-${themeColor}-500 text-white shadow-md` : 'text-slate-500 hover:bg-slate-50'}`}
               >
                 <item.icon className="w-3 h-3 mr-1" /> {item.label}
               </button>
            ))}
        </div>
        
        <div className="flex items-center text-xs text-slate-600 bg-blue-50 p-2 rounded border border-blue-100">
            <Info className="w-3 h-3 mr-2 text-blue-500" />
            <span className="font-bold mr-1">{levels[level-1].label}:</span> 
            {isVi ? levels[level-1].desc_vi : levels[level-1].desc_en}
        </div>
      </div>

      <div className="space-y-4">
        {data.sentences && data.sentences.map((s, idx) => (
          <div key={s.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
           <div className="flex justify-between items-center mb-3">
               <span className={`px-2 py-1 rounded bg-${themeColor}-100 text-${themeColor}-700 text-xs font-black`}>#{idx+1}</span>
               <div className="flex items-center gap-2">
                 {completedIds.has(s.id) && (
                   <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                     <CheckCircle className="w-3 h-3" />
                     <span>Done</span>
                   </div>
                 )}
                 <button onClick={() => speakText(s.text_en || s.text, s.audio_url, 1.0, null, 'dictation', currentWeek, mode)} className={`p-3 bg-${themeColor}-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg`}>
                   <Volume2 className="w-5 h-5" />
                 </button>
               </div>
           </div>

           <div className="space-y-3">
               {level === 1 && shuffledWordsBySentence[s.id] && (
                   <div className="flex flex-wrap gap-2 mb-2">
                       {shuffledWordsBySentence[s.id].map((w, i) => (
                           <span
                             key={i}
                             onClick={() => {
                               if (completedIds.has(s.id)) return;
                               const current = inputs[s.id] || '';
                               const newVal = current ? current + ' ' + w : w;
                               setInputs(prev => ({ ...prev, [s.id]: newVal }));
                               setFeedback(prev => { const n = { ...prev }; delete n[s.id]; return n; });
                             }}
                             className={`px-3 py-1.5 border rounded text-base font-medium transition-all ${
                               completedIds.has(s.id)
                                 ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                                 : 'bg-slate-100 border-slate-300 text-slate-700 cursor-pointer hover:bg-indigo-100 hover:border-indigo-400 active:scale-95'
                             }`}
                           >
                             {w}
                           </span>
                       ))}
                   </div>
               )}

               {level === 2 && (
                   <p className="text-xl text-slate-500 font-mono bg-slate-50 p-3 rounded-lg border-2 border-dashed border-slate-200 tracking-wide select-none text-slate-600">
                       {getCloze(s.text_en || s.text)}
                   </p>
               )}

               <div className="relative">
                     <input 
                       type="text" 
                       autoCapitalize="none" autoCorrect="off" spellCheck="false"
                       className={`w-full p-4 pr-24 bg-slate-50 border-2 rounded-xl outline-none text-xl font-medium transition-all ${
                           feedback[s.id]?.status === 'perfect' ? 'border-green-400 bg-green-50 text-green-800' : 
                           feedback[s.id]?.status === 'warning' ? 'border-amber-400 bg-amber-50 text-amber-800' :
                           feedback[s.id]?.status === 'wrong' ? 'border-rose-300 bg-rose-50 text-rose-800' :
                           `border-slate-200 focus:border-${themeColor}-400 focus:bg-white`
                       }`}
                       placeholder={isVi ? "Gõ lại cả câu..." : "Type full sentence..."}
                       value={inputs[s.id] || ''}
                       onChange={(e) => {
                         setInputs(prev => ({ ...prev, [s.id]: e.target.value }));
                         if (feedback[s.id]) {
                           setFeedback(prev => { const n = { ...prev }; delete n[s.id]; return n; });
                         }
                       }}
                       onKeyDown={(e) => e.key === 'Enter' && handleCheck(s.id, s.text_en || s.text)}
                       disabled={completedIds.has(s.id)}
                     />
                     <button
                       onClick={() => handleCheck(s.id, s.text_en || s.text)}
                       className={`absolute right-2 top-2 bottom-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                           completedIds.has(s.id) ? 'bg-green-500 text-white cursor-not-allowed' : `bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 active:bg-slate-100`
                       }`}
                       disabled={completedIds.has(s.id)}
                     >
                       {completedIds.has(s.id) ? <CheckCircle className="w-4 h-4"/> : "Check"}
                     </button>
               </div>

               {feedback[s.id] && !completedIds.has(s.id) && (
                   <p className={`text-xs font-bold flex items-center animate-in slide-in-from-top-1 ${
                       feedback[s.id].status === 'perfect' ? 'text-green-600' : 
                       feedback[s.id].status === 'warning' ? 'text-amber-600' : 'text-rose-500'
                   }`}>
                       {feedback[s.id].status === 'perfect' ? <CheckCircle className="w-3 h-3 mr-1.5"/> : 
                        feedback[s.id].status === 'warning' ? <AlertTriangle className="w-3 h-3 mr-1.5"/> :
                        <XCircle className="w-3 h-3 mr-1.5"/>} 
                       {feedback[s.id].message}
                   </p>
               )}
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DictationEngine;
