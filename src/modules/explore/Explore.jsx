import React, { useState } from 'react';
import { Volume2, Globe, HelpCircle, CheckCircle, XCircle, AlertTriangle, Lightbulb, ArrowRight, Edit3, Sparkles } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';

const Explore = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState({});
  const [showHint, setShowHint] = useState({}); 
  const [showModel, setShowModel] = useState(false);
  const [attempts, setAttempts] = useState({}); // Track attempts per question
  const [showAnswer, setShowAnswer] = useState({}); // Show correct answer after 3 attempts
  const [completedIds, setCompletedIds] = useState([]);

  // Early return AFTER hooks
  if (!data) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Explore...</div>;

  const handleCheck = (id, correctAnswers) => {
      // --- CRITICAL THINKING MODE (ID 99) ---
      if (id === 99) { 
          const res = analyzeAnswer(inputs[id], [], 'critical');
          setFeedback({ ...feedback, [id]: res });
          
          // LUÔN HIỆN CÂU MẪU SAU KHI CHECK
          setShowModel(true);

          if (res.isCorrect && !completedIds.includes(99)) {
              const newCompleted = [...completedIds, 99];
              setCompletedIds(newCompleted);
              report(newCompleted);
          }
          return;
      }
      
      // --- STANDARD MODE ---
      // Support multiple correct answers
      const answers = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
      const res = analyzeAnswer(inputs[id], answers, 'academic'); 
      setFeedback({ ...feedback, [id]: res });

      if (res.isCorrect) {
          if (!completedIds.includes(id)) {
              const newCompleted = [...completedIds, id];
              setCompletedIds(newCompleted);
              report(newCompleted);
          }
      } else {
          // Track attempts for wrong answers
          const newAttempts = (attempts[id] || 0) + 1;
          setAttempts({ ...attempts, [id]: newAttempts });
          
          // Show correct answer after 3 wrong attempts
          if (newAttempts >= 3) {
              setShowAnswer({ ...showAnswer, [id]: true });
          }
      }
  };

  const report = (completed) => {
      if (onReportProgress && data.check_questions) {
          const total = data.check_questions.length + 1; 
          onReportProgress(Math.round((completed.length / total) * 100));
      }
  };

  const toggleHint = (id) => setShowHint(prev => ({ ...prev, [id]: !prev[id] }));

  const renderStyledText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => 
      part.startsWith('**') ? 
      <span key={i} className={`font-black text-${themeColor}-600 text-xl px-1 bg-${themeColor}-50 rounded border-b-2 border-${themeColor}-200 cursor-pointer hover:bg-${themeColor}-100 transition-colors`} onClick={(e) => { e.stopPropagation(); speakText(part.replace(/\*\*/g, '')); }}>{part.replace(/\*\*/g, '')}</span> : 
      <span key={i} className="text-lg">{part}</span>
    );
  };

  const criticalQ = data.question || data.think_respond || { text_en: "What do you think?", text_vi: "Bạn nghĩ sao?", hint_en: "I think...", hint_vi: "Tôi nghĩ..." };

  return (
    <div className="space-y-8 pb-24">
      {/* HEADER & CONTENT */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative group">
        <div className="w-full bg-slate-900 relative overflow-hidden">
            {data.image_url && <img src={data.image_url} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" alt="cover" onError={(e) => { e.target.src="https://placehold.co/800x400/e2e8f0/64748b?text=Image+Loading..."; }} />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
               <h2 className="text-xl font-black text-white leading-tight drop-shadow-md">{data.title_en}</h2>
            </div>
        </div>
        <div className="p-8">
            <div className="flex justify-between items-start mb-4">
               <button onClick={() => speakText(data.content_en.replace(/\*\*/g, ''), data.audio_url)} className={`p-3 bg-${themeColor}-600 text-white rounded-full shadow-lg hover:bg-${themeColor}-700 transition-transform hover:scale-110 flex-shrink-0`}>
                  <Volume2 className="w-6 h-6" />
               </button>
               <button onClick={onToggleLang} className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center bg-slate-100 px-3 py-1 rounded-lg transition-colors"><Globe className="w-3 h-3 mr-1"/> {isVi?'VI':'EN'}</button>
            </div>
            <div className="leading-loose font-medium text-justify text-slate-800">
               {renderStyledText(data.content_en)}
            </div>
            {isVi && <div className="mt-6 p-4 bg-lime-50 rounded-xl text-lime-900 italic text-lg border-l-4 border-lime-400">{data.content_vi}</div>}
        </div>
      </div>

      {/* CHECK QUESTIONS */}
      <div className="grid grid-cols-1 gap-6">
        {data.check_questions && data.check_questions.map((q, i) => {
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
