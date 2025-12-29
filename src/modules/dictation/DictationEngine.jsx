import React, { useState } from 'react';
import { Volume2, CheckCircle, XCircle, Globe, Keyboard, LayoutList, Type, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';

const DictationEngine = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  if (!data) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Dictation...</div>;

  const [level, setLevel] = useState(1);
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState({});
  const [completedIds, setCompletedIds] = useState([]); // Track completed sentences

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

    // REPORT PROGRESS
    if (result.isCorrect) {
        if (!completedIds.includes(id)) {
            const newCompleted = [...completedIds, id];
            setCompletedIds(newCompleted);
            if (onReportProgress && data.sentences) {
                onReportProgress(Math.round((newCompleted.length / data.sentences.length) * 100));
            }
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
               <button onClick={() => speakText(s.text, s.audio_url)} className={`p-3 bg-${themeColor}-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg`}>
                 <Volume2 className="w-5 h-5" />
               </button>
           </div>

           <div className="space-y-3">
               {level === 1 && (
                   <div className="flex flex-wrap gap-2 mb-2">
                       {s.text.replace(/[.,?!]/g, '').split(' ').sort(() => Math.random() - 0.5).map((w, i) => (
                           <span key={i} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-medium select-none text-slate-600">
                               {w}
                           </span>
                       ))}
                   </div>
               )}
               
               {level === 2 && (
                   <p className="text-lg text-slate-500 font-mono bg-slate-50 p-3 rounded-lg border-2 border-dashed border-slate-200 tracking-wide select-none">
                       {getCloze(s.text)}
                   </p>
               )}

               <div className="relative">
                     <input 
                       type="text" 
                       className={`w-full p-4 pr-24 bg-slate-50 border-2 rounded-xl outline-none font-medium transition-all ${
                           feedback[s.id]?.status === 'perfect' ? 'border-green-400 bg-green-50 text-green-800' : 
                           feedback[s.id]?.status === 'warning' ? 'border-amber-400 bg-amber-50 text-amber-800' :
                           feedback[s.id]?.status === 'wrong' ? 'border-rose-300 bg-rose-50 text-rose-800' :
                           `border-slate-200 focus:border-${themeColor}-400 focus:bg-white`
                       }`}
                       placeholder={isVi ? "Gõ lại cả câu..." : "Type full sentence..."}
                       value={inputs[s.id] || ''}
                       onChange={(e) => setInputs({...inputs, [s.id]: e.target.value})}
                       onKeyDown={(e) => e.key === 'Enter' && handleCheck(s.id, s.text)}
                     />
                     <button 
                       onClick={() => handleCheck(s.id, s.text)} 
                       className={`absolute right-2 top-2 bottom-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                           feedback[s.id]?.status === 'perfect' ? 'bg-green-500 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'
                       }`}
                     >
                       {feedback[s.id]?.status === 'perfect' ? <CheckCircle className="w-4 h-4"/> : "Check"}
                     </button>
               </div>

               {feedback[s.id] && (
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
