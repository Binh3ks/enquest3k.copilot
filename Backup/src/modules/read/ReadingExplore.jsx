import React, { useState, useEffect, useRef } from 'react';
import { Volume2, BookOpen, Globe, PenTool, Check, ArrowRight, AlertTriangle, RefreshCcw, Star, HelpCircle, XCircle, CheckCircle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';

const ReadingExplore = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const [sentences, setSentences] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [committedLength, setCommittedLength] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [showFullRef, setShowFullRef] = useState(false);
  const [qInputs, setQInputs] = useState({});
  const [qFeedback, setQFeedback] = useState({});
  const [showHint, setShowHint] = useState({});
  const [qAttempts, setQAttempts] = useState({}); // Track attempts per question
  const [showAnswer, setShowAnswer] = useState({}); // Show correct answer after 3 attempts
  const textareaRef = useRef(null);

  const isComplete = sentences.length > 0 && currentIdx >= sentences.length;
  const currentSentence = !isComplete && sentences.length > 0 ? sentences[currentIdx] : null;

  useEffect(() => {
    if (data && data.content_en) {
      const enRaw = data.content_en.match(/[^.!?]+[.!?]+(\s|$)/g) || [data.content_en];
      const viRaw = data.content_vi ? (data.content_vi.match(/[^.!?]+[.!?]+(\s|$)/g) || [data.content_vi]) : [];
      
      const combined = enRaw.map((s, i) => ({
        en: s.trim(),
        vi: viRaw[i] ? viRaw[i].trim() : ""
      }));
      setSentences(combined);
      setCurrentIdx(0); setInputValue(""); setCommittedLength(0); setFeedback(null); setShowFullRef(false);
      setQInputs({}); setQFeedback({}); setShowHint({});
      if(textareaRef.current) textareaRef.current.focus();
    }
  }, [data]);

  useEffect(() => {
      if (isComplete && onReportProgress) { onReportProgress(100); }
  }, [isComplete, onReportProgress]);

  if (!data) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Module...</div>;
  if (sentences.length === 0) return <div className="p-10 text-center">Initializing...</div>;

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
                setCommittedLength(nextText.length);
                setCurrentIdx(prev => prev + 1);    
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
    }
  };

  const toggleHint = (id) => setShowHint(prev => ({ ...prev, [id]: !prev[id] }));

  const renderStyledText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => 
      part.startsWith('**') ? 
      <span key={i} className={`font-black text-${themeColor}-600 text-2xl px-1 bg-${themeColor}-50 rounded border-b-2 border-${themeColor}-200 cursor-pointer hover:bg-${themeColor}-100 transition-colors`} onClick={(e) => { e.stopPropagation(); speakText(part.replace(/\*\*/g, '')); }}>{part.replace(/\*\*/g, '')}</span> : 
      <span key={i} className="text-xl">{part}</span>
    );
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
            <div className="w-full bg-slate-900 relative overflow-hidden">
                <img src={data.image_url} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" alt="Reading Cover" onError={(e) => { e.target.style.display='none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white shadow-sm`}><BookOpen className="w-4 h-4" /></div>
                        <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">{isVi ? "Đọc hiểu & Dịch thuật" : "Reading & Translation"}</p>
                    </div>
                    <h2 className="text-xl font-black text-white leading-tight drop-shadow-md">{data.title}</h2>
                </div>
            </div>
        )}
        
        <div className="p-8">
            <div className="flex justify-between items-start mb-6">
               <button onClick={() => speakText(renderCleanText(data.content_en), data.audio_url)} className={`p-3 bg-${themeColor}-600 text-white rounded-full shadow-lg hover:bg-${themeColor}-700 transition-transform hover:scale-110 flex-shrink-0`}>
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
            <button onClick={() => {
                setCurrentIdx(0); setInputValue(""); setCommittedLength(0); setFeedback(null); setShowFullRef(false); 
            }} className="text-xs text-slate-400 hover:text-rose-500 flex items-center font-bold transition-colors"><RefreshCcw className="w-3 h-3 mr-1"/> {isVi ? "Làm lại" : "Reset"}</button>
        </div>
        {!isComplete && currentSentence ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 mb-6 animate-in fade-in slide-in-from-bottom-2">
               <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Sentence {currentIdx + 1} / {sentences.length}</span>
                  <button onClick={() => speakText(renderCleanText(currentSentence.en))} className="text-slate-300 hover:text-indigo-500 transition-colors"><Volume2 className="w-5 h-5"/></button>
               </div>
               <p className="text-2xl font-bold text-slate-800 leading-snug select-text cursor-text">{renderCleanText(currentSentence.en)}</p>
               {showFullRef && currentSentence.vi && (<div className="mt-4 pt-4 border-t border-slate-50 animate-in fade-in"><p className="text-xs font-bold text-green-600 uppercase mb-1">{isVi ? "Gợi ý / Câu mẫu:" : "Suggestion / Sample:"}</p><p className="text-green-800 font-medium text-sm">{currentSentence.vi}</p></div>)}
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
        {data.comprehension_questions && data.comprehension_questions.map((q, idx) => (
            <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-100 transition-colors">
               <div className="flex gap-3 mb-4">
                  <span className={`px-2 py-1 rounded bg-${themeColor}-50 text-${themeColor}-700 text-[10px] font-black h-fit uppercase`}>Q{idx + 1}</span>
                  <p className="font-bold text-slate-800 text-base">{q.question_en}</p>
               </div>
               <div className="relative">
                  <input type="text" className={`w-full p-4 pr-32 bg-slate-50 border-2 rounded-xl outline-none text-sm transition-all font-medium ${qFeedback[q.id]?.status === 'perfect' ? 'border-green-400 bg-green-50 text-green-800' : qFeedback[q.id]?.status === 'warning' ? 'border-amber-400 bg-amber-50 text-amber-800' : qFeedback[q.id]?.status === 'wrong' ? 'border-rose-300 bg-rose-50 text-rose-800' : 'border-slate-100 focus:border-indigo-300 focus:bg-white'}`} placeholder={isVi ? "Nhập câu trả lời..." : "Type answer..."} value={qInputs[q.id] || ''} onChange={(e) => {setQInputs({ ...qInputs, [q.id]: e.target.value }); if(qFeedback[q.id]) setQFeedback({...qFeedback, [q.id]: null})}} onKeyDown={(e) => e.key === 'Enter' && handleQCheck(q.id, q.answer)} />
                  <div className="absolute right-2 top-2 bottom-2 flex gap-1">
                      <button onClick={() => toggleHint(q.id)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Hint"><HelpCircle className="w-5 h-5" /></button>
                      <button onClick={() => handleQCheck(q.id, q.answer)} className={`px-5 rounded-lg font-bold text-[10px] uppercase tracking-wider text-white transition-all bg-${themeColor}-600 hover:bg-${themeColor}-700 active:scale-95 shadow-sm`}>Check</button>
                  </div>
               </div>
               {qFeedback[q.id] && (<p className={`mt-3 text-xs font-bold flex items-center animate-in slide-in-from-top-1 ${qFeedback[q.id].status === 'perfect' ? 'text-green-600' : qFeedback[q.id].status === 'warning' ? 'text-amber-600' : 'text-rose-500'}`}>{qFeedback[q.id].status === 'perfect' ? <CheckCircle className="w-4 h-4 mr-1.5"/> : qFeedback[q.id].status === 'warning' ? <AlertTriangle className="w-4 h-4 mr-1.5"/> : <XCircle className="w-4 h-4 mr-1.5"/>} {qFeedback[q.id].message} {qAttempts[q.id] > 0 && !showAnswer[q.id] && `(Lần ${qAttempts[q.id]}/3)`}</p>)}
               {showHint[q.id] && (<div className="mt-2 p-3 bg-amber-50 border-l-4 border-amber-300 rounded-r-lg text-xs text-slate-600 italic flex items-center animate-fade-in"><HelpCircle className="w-3 h-3 mr-2 text-amber-500"/> {isVi ? q.hint_vi : q.hint_en}</div>)}
               {showAnswer[q.id] && (<div className="mt-2 p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg animate-fade-in"><p className="text-[10px] font-black text-green-600 uppercase mb-1">Đáp án đúng:</p><p className="text-sm font-bold text-green-800">{Array.isArray(q.answer) ? q.answer[0] : q.answer}</p></div>)}
            </div>
        ))}
      </div>
    </div>
  );
};
export default ReadingExplore;
