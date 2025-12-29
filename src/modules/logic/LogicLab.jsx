import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle, XCircle, Zap, Globe, AlertTriangle, HelpCircle, Calculator, Puzzle, BrainCircuit, ListChecks } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';

const LogicLab = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  if (!data) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Logic Lab...</div>;

  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState({});
  const [showHint, setShowHint] = useState({});
  const [completedIds, setCompletedIds] = useState([]); 

  const getMessage = (res) => {
    return res.message || "";
  };

  const handleCheck = (id, puzzle) => {
    const checkType = (puzzle.type === 'math') ? 'math' : 'logic';
    
    // SmartCheck sẽ xử lý việc so sánh linh hoạt (ví dụ: "7 pots" vs "seven pots")
    const result = analyzeAnswer(
      inputs[id], 
      puzzle.answer, 
      checkType,
      puzzle.unit 
    );
    
    const msg = getMessage(result);
    setFeedback({ ...feedback, [id]: { ...result, message: msg } });

    if (result.isCorrect) {
        if (!completedIds.includes(id)) {
            const newCompleted = [...completedIds, id];
            setCompletedIds(newCompleted);
            if (onReportProgress && data.puzzles) {
                onReportProgress(Math.round((newCompleted.length / data.puzzles.length) * 100));
            }
        }
    }
  };

  const toggleHint = (id) => setShowHint(prev => ({ ...prev, [id]: !prev[id] }));

  const getPuzzleIcon = (type) => {
    switch (type) {
        case 'math': return <Calculator className={`w-6 h-6 text-${themeColor}-500`} />;
        case 'mc': return <ListChecks className={`w-6 h-6 text-${themeColor}-500`} />;
        case 'pattern': return <Zap className={`w-6 h-6 text-${themeColor}-500`} />;
        default: return <BrainCircuit className={`w-6 h-6 text-${themeColor}-500`} />;
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* HEADER */}
      <div className={`bg-${themeColor}-50 p-6 rounded-2xl border-2 border-${themeColor}-100 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-10 backdrop-blur-md bg-opacity-95 shadow-sm`}>
        <div>
          <h2 className={`text-2xl font-black text-${themeColor}-900 uppercase flex items-center`}>
            Logic Lab
            <button onClick={onToggleLang} className="ml-3 p-1.5 bg-white rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-500 flex items-center shadow-sm border border-slate-200 transition-all"><Globe className="w-3 h-3 mr-1"/> {isVi?'VI':'EN'}</button>
          </h2>
          <p className="text-slate-500 font-bold text-xs mt-1">{isVi ? "Toán học ngôn ngữ & Tư duy phản biện" : "Math as a Language & Critical Thinking"}</p>
        </div>
        <Puzzle className={`w-10 h-10 text-${themeColor}-400`} />
      </div>

      {/* PUZZLE LIST */}
      <div className="space-y-4">
        {data.puzzles && data.puzzles.map((p, idx) => (
          <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
            <div className="flex gap-5">
              
              <div className="flex flex-col items-center gap-2">
                  <span className={`w-10 h-10 rounded-xl bg-${themeColor}-100 text-${themeColor}-700 font-black text-lg flex items-center justify-center shrink-0`}>
                    {idx + 1}
                  </span>
                  <div className="mt-1 opacity-80" title={p.type}>{getPuzzleIcon(p.type)}</div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                   <p className="text-xl font-bold text-slate-800 leading-snug">{p.question_en}</p>
                   <button onClick={() => speakText(p.question_en, p.audio_url)} className="ml-2 p-2 bg-slate-50 rounded-full hover:bg-indigo-100 text-indigo-500 transition-colors flex-shrink-0"><Volume2 className="w-5 h-5" /></button>
                </div>
                
                {isVi && <p className="text-sm text-slate-400 italic mb-4 border-l-2 border-slate-200 pl-2">{p.question_vi}</p>}

                {/* INTERACTION AREA */}
                {(p.type === 'mc' || p.type === 'pattern') && p.options && p.options.length > 0 ? (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-wider">{isVi ? "Chọn đáp án đúng:" : "Select the Answer:"}</p>
                      <div className="flex flex-wrap gap-3">
                         {p.options.map((opt, i) => (
                            <button key={i} onClick={() => { 
                                const isRight = (p.answer && p.answer.includes(opt)); 
                                const msg = isRight ? (isVi?"Chính xác!":"Correct!") : (isVi?"Chưa đúng!":"Try Again!"); 
                                setInputs({ ...inputs, [p.id]: opt }); 
                                const res = { status: isRight ? 'perfect' : 'wrong', message: msg, isCorrect: isRight };
                                setFeedback({ ...feedback, [p.id]: res }); 
                                
                                if (isRight && !completedIds.includes(p.id)) {
                                    const newCompleted = [...completedIds, p.id];
                                    setCompletedIds(newCompleted);
                                    if (onReportProgress) onReportProgress(Math.round((newCompleted.length / data.puzzles.length) * 100));
                                }
                            }} className={`min-w-[4rem] px-6 py-3 rounded-xl border-2 text-lg font-bold flex items-center justify-center transition-all transform active:scale-95 ${inputs[p.id] === opt ? (feedback[p.id]?.status === 'perfect' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-rose-100 border-rose-400 text-rose-700') : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-white text-slate-600'}`}>
                                {opt}
                            </button>
                         ))}
                      </div>
                  </div>
                ) : (
                  /* Input Field cho Math/Logic tự luận */
                  /* QUAN TRỌNG: Luôn dùng type="text" để cho phép nhập đơn vị (ví dụ: "7 pots") */
                  <div className="relative mt-4">
                      <input 
                        type="text" 
                        value={inputs[p.id] || ''} 
                        onChange={(e) => {
                            setInputs({ ...inputs, [p.id]: e.target.value }); 
                            if(feedback[p.id]) setFeedback({...feedback, [p.id]: null}) 
                        }} 
                        onKeyDown={(e) => e.key === 'Enter' && handleCheck(p.id, p)} 
                        placeholder={isVi ? "Nhập câu trả lời (kèm đơn vị)..." : "Type answer (with unit)..."} 
                        className={`w-full p-4 pr-32 bg-slate-50 border-2 rounded-xl font-bold text-slate-700 outline-none transition-all ${feedback[p.id]?.status === 'perfect' ? 'border-green-400 bg-green-50' : feedback[p.id]?.status === 'warning' ? 'border-amber-400 bg-amber-50' : feedback[p.id]?.status === 'wrong' ? 'border-rose-300 bg-rose-50' : 'border-slate-200 focus:border-indigo-400 focus:bg-white'}`} 
                      />
                      {/* Đã ẩn phần hiển thị p.unit để buộc trẻ phải tự gõ */}
                      
                      <div className="absolute right-2 top-2 bottom-2 flex gap-1">
                          <button onClick={() => toggleHint(p.id)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Hint"><HelpCircle className="w-5 h-5" /></button>
                          <button onClick={() => handleCheck(p.id, p)} className={`px-5 rounded-lg font-bold text-white shadow-md active:scale-95 transition-all ${feedback[p.id]?.status === 'perfect' ? 'bg-green-500' : `bg-${themeColor}-600 hover:bg-${themeColor}-700`}`}>{feedback[p.id]?.status === 'perfect' ? <CheckCircle className="w-5 h-5" /> : 'Check'}</button>
                      </div>
                  </div>
                )}
                
                {feedback[p.id] && (<p className={`mt-3 text-sm font-bold flex items-center animate-in slide-in-from-top-1 ${feedback[p.id].status === 'perfect' ? 'text-green-600' : feedback[p.id].status === 'warning' ? 'text-amber-600' : 'text-rose-500'}`}>{feedback[p.id].status === 'perfect' ? <CheckCircle className="w-4 h-4 mr-1.5"/> : feedback[p.id].status === 'warning' ? <AlertTriangle className="w-4 h-4 mr-1.5"/> : <XCircle className="w-4 h-4 mr-1.5"/>} {feedback[p.id].message}</p>)}
                
                {showHint[p.id] && (p.hint_en || p.hint_vi) && (<div className="mt-2 p-3 bg-amber-50 border-l-4 border-amber-300 rounded-r-lg text-sm text-slate-600 italic flex items-center animate-fade-in"><HelpCircle className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0"/> {isVi ? (p.hint_vi || p.hint_en) : (p.hint_en || p.hint_vi)}</div>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogicLab;
