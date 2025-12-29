import React, { useState, useEffect } from 'react';
import { Mic, Send, Bot, User, RotateCcw, CheckCircle, HelpCircle, Lightbulb, AlertTriangle, Volume2 } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';

const AskAi = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHint, setShowHint] = useState(false);
  
  const [wrongCount, setWrongCount] = useState(0);

  if (!data || !data.prompts) return <div>Loading AI...</div>;

  const currentPrompt = data.prompts[currentPromptIdx];
  const isLast = currentPromptIdx === data.prompts.length - 1;

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition 
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() 
    : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputVal(transcript); 
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
  }

  const toggleListen = () => {
    if (!recognition) { alert("Browser not supported"); return; }
    if (isListening) recognition.stop();
    else { setIsListening(true); recognition.start(); }
  };

  const handleCheck = () => {
    if (!inputVal.trim()) return;

    const result = analyzeAnswer(inputVal, currentPrompt.answer, 'strict'); 
    
    let msg = "";
    let isPass = false;

    if (result.status === 'perfect') {
        msg = isVi ? "Tuyệt vời! Chính xác." : "Perfect!";
        isPass = true;
    } else if (result.status === 'warning') {
        msg = result.message; // Sử dụng message thông minh từ smartCheck v7
        isPass = false; 
    } else {
        msg = isVi ? "Chưa đúng mẫu câu." : "Incorrect structure.";
        isPass = false;
    }

    setFeedback({ ...result, message: msg, isPass });
    
    if (isPass) {
        speakText("Excellent!");
        const newHistory = [...history, { q: currentPrompt.context_en, a: inputVal }];
        setHistory(newHistory);
        
        if (onReportProgress) {
            onReportProgress(Math.round((newHistory.length / data.prompts.length) * 100));
        }
    } else {
        setWrongCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setInputVal('');
    setShowHint(false);
    setWrongCount(0); 
    if (!isLast) setCurrentPromptIdx(prev => prev + 1);
  };

  // FIX: Chọn đáp án đầu tiên để hiển thị và KHÔNG thêm dấu ? thủ công
  const correctAnswerText = Array.isArray(currentPrompt.answer) ? currentPrompt.answer[0] : currentPrompt.answer;

  return (
    <div className="pb-24 max-w-3xl mx-auto">
      <div className={`bg-${themeColor}-50 p-6 rounded-3xl border-2 border-${themeColor}-100 mb-6 shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full bg-${themeColor}-100 flex items-center justify-center`}>
                    <Bot className={`w-7 h-7 text-${themeColor}-600`} />
                </div>
                <div>
                    <h2 className={`text-xl font-black text-${themeColor}-800`}>ASK AI - Situation {currentPromptIdx + 1}/{data.prompts.length}</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Critical Inquiry</p>
                </div>
            </div>
            <button onClick={onToggleLang} className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-500">{isVi ? 'EN' : 'VI'}</button>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center mb-6 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
            <p className="text-sm font-bold text-slate-400 uppercase mb-2">Context (Tình huống)</p>
            <h3 className="text-2xl font-black text-slate-800 leading-snug mb-2">
                {isVi ? currentPrompt.context_vi : currentPrompt.context_en}
            </h3>
            
            {/* Speaker button to read the context aloud */}
            <button 
                onClick={() => speakText(currentPrompt.context_en, currentPrompt.audio_url)}
                className={`absolute top-4 left-4 w-10 h-10 rounded-full bg-${themeColor}-100 hover:bg-${themeColor}-200 flex items-center justify-center transition-colors`}
                title="Listen to context"
            >
                <Volume2 className={`w-5 h-5 text-${themeColor}-600`} />
            </button>
            
            <button 
                onClick={() => setShowHint(!showHint)}
                className="absolute top-4 right-4 text-amber-400 hover:text-amber-500 transition-colors"
                title="Show Hint Pattern"
            >
                <Lightbulb className={`w-6 h-6 ${showHint ? 'fill-amber-400' : ''}`} />
            </button>
            
            {showHint && (
                <div className="mt-4 inline-block px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-bold border border-amber-100 animate-in fade-in slide-in-from-top-1">
                    💡 Hint: {currentPrompt.hint}
                </div>
            )}
        </div>
        
        {wrongCount >= 3 && !feedback?.isPass && (
            <div className="mb-4 p-4 bg-rose-50 border border-rose-100 rounded-xl text-center animate-in slide-in-from-top-2">
                <p className="text-xs font-bold text-rose-500 uppercase mb-1">
                    {isVi ? "Đáp án đúng (Hãy chép lại):" : "Correct Answer (Please type below):"}
                </p>
                <p className="text-lg font-black text-rose-700 select-all">
                    {correctAnswerText}
                </p>
            </div>
        )}

        <div className="relative">
            <input 
                type="text" 
                value={inputVal}
                onChange={(e) => { setInputVal(e.target.value); setFeedback(null); }}
                placeholder={isVi ? "Nhập câu hỏi (Nhớ dấu chấm hỏi?)..." : "Type your question (Remember ?)..."}
                className={`w-full p-4 pl-14 pr-32 text-lg font-medium rounded-2xl border-2 outline-none transition-all ${feedback ? (feedback.isPass ? 'border-green-500 bg-green-50' : 'border-rose-400 bg-rose-50') : `border-slate-200 focus:border-${themeColor}-400`}`}
                disabled={feedback?.isPass}
                onKeyDown={(e) => e.key === 'Enter' && !feedback?.isPass && handleCheck()}
            />
            <button 
                onClick={toggleListen}
                className={`absolute left-3 top-3 bottom-3 w-10 rounded-xl flex items-center justify-center transition-colors ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
                <Mic className="w-5 h-5" />
            </button>

            <div className="absolute right-3 top-3 bottom-3 flex space-x-2">
                {feedback?.isPass ? (
                 isLast ? (
                   <div className="px-4 py-2 bg-green-500 text-white font-bold rounded-xl flex items-center">Done <CheckCircle className="w-4 h-4 ml-2"/></div>
                 ) : (
                   <button onClick={handleNext} className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">Next</button>
                 )
                ) : (
                    <button onClick={() => handleCheck()} className={`px-6 font-bold rounded-xl text-white transition-colors ${!inputVal.trim() ? 'bg-slate-300 cursor-not-allowed' : `bg-${themeColor}-500 hover:bg-${themeColor}-600`}`}>
                        Check
                    </button>
                )}
            </div>
        </div>

        {feedback && (
            <div className={`mt-4 p-3 rounded-xl text-center text-sm font-bold ${feedback.isPass ? 'text-green-600' : 'text-rose-500'}`}>
                {feedback.message}
            </div>
        )}

      </div>

      {history.length > 0 && (
        <div className="border-t border-slate-200 pt-6">
            <h4 className="text-sm font-black text-slate-400 uppercase mb-4">Completed Inquiries</h4>
            <div className="space-y-3">
                {history.map((h, i) => (
                    <div key={i} className="flex items-start space-x-3 opacity-70">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                            <p className="text-sm text-slate-800 font-bold">"{h.a}"</p>
                            <p className="text-xs text-slate-500 italic">{h.q}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};
export default AskAi;
