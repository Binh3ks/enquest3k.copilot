import React, { useState, useEffect } from 'react';
import { Mic, Send, Bot, User, RotateCcw, CheckCircle, HelpCircle, Lightbulb, AlertTriangle, Volume2 } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';
import { useUserStore } from '../../stores/useUserStore';
import { useStationProgress } from '../../hooks/useStationProgress';
import { useParams } from 'react-router-dom';

const AskAi = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const { weekId } = useParams();
  const { learningMode } = useUserStore();
  
  // 🔥 Universal Progress System Integration
  const { savedData, saveProgress, markComplete } = useStationProgress(
    parseInt(weekId), 
    'ask_ai'
  );
  
  const [currentPromptIdx, setCurrentPromptIdx] = useState(savedData.currentPromptIdx || 0);
  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState(savedData.feedback || null);
  const [history, setHistory] = useState(savedData.history || []);
  const [showHint, setShowHint] = useState(false);
  const [completedPrompts, setCompletedPrompts] = useState(() => new Set(savedData.completedPrompts || []));
  const [wrongCount, setWrongCount] = useState(savedData.wrongCount || 0);
  const [hasMicUsed, setHasMicUsed] = useState(false); // Track if mic has been used for current prompt

  useEffect(() => {
    const handler = setTimeout(() => {
      const totalPrompts = data?.prompts?.length || 0;
      if (totalPrompts > 0) {
        const percent = Math.round((completedPrompts.size / totalPrompts) * 100);
        const isAllComplete = completedPrompts.size === totalPrompts;
        
        saveProgress({
          currentPromptIdx,
          history,
          completedPrompts: [...completedPrompts],
          feedback,
          wrongCount,
        }, isAllComplete, percent);
        
        if (isAllComplete) {
          markComplete(100);
        }
      }
    }, 1500);

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPromptIdx, history, completedPrompts, feedback, wrongCount]);


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
    if (isListening) {
      recognition.stop();
      setIsListening(false); // Stop the recording animation
    } else { 
      setIsListening(true); 
      setHasMicUsed(true); // Mark that mic has been used
      recognition.start(); 
    }
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
        
        // Track completion persistently
        const newCompleted = new Set(completedPrompts);
        newCompleted.add(currentPromptIdx);
        setCompletedPrompts(newCompleted);
        
        // No need for manual saveProgress call here, useEffect handles it.
    } else {
        setWrongCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setInputVal('');
    setShowHint(false);
    setWrongCount(0); 
    setHasMicUsed(false); // Reset mic usage for next prompt
    if (!isLast) {
      const newIndex = currentPromptIdx + 1;
      setCurrentPromptIdx(newIndex);
    }
  };

  return (
    <div className="pb-24 max-w-3xl mx-auto">
      {/* Instruction Bar */}
      <div className={`mb-4 p-4 bg-gradient-to-r from-${themeColor}-50 to-indigo-50 rounded-2xl border-2 border-${themeColor}-200 text-center`}>
        <p className="text-base font-black text-slate-700">
          {isVi ? '🎤 Hãy đọc tình huống và bấm Mic để đặt câu hỏi' : '🎤 Read the situation and press Mic to ask a question'}
        </p>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {isVi ? 'Bạn PHẢI nói trước, sau đó có thể chỉnh sửa' : 'You MUST speak first, then you can edit'}
        </p>
      </div>

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
            
            {/* Speaker button to play correct answers TTS */}
            <button 
                onClick={() => {
                    const answers = Array.isArray(currentPrompt.answer) ? currentPrompt.answer.join(", or, ") : currentPrompt.answer;
                    speakText(answers, currentPrompt.answer_audio_url, 1.0, null, 'ask_ai', parseInt(weekId), learningMode || 'advanced');
                }}
                className={`absolute top-4 left-4 w-10 h-10 rounded-full bg-${themeColor}-100 hover:bg-${themeColor}-200 flex items-center justify-center transition-colors`}
                title={isVi ? "Nghe đáp án đúng" : "Listen to correct answers"}
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
                <p className="text-xs font-bold text-rose-500 uppercase mb-2">
                    {isVi ? "✅ Các đáp án đúng (Hãy chép lại một câu):" : "✅ Correct Answers (Please type one below):"}
                </p>
                <div className="space-y-1">
                    {(Array.isArray(currentPrompt.answer) ? currentPrompt.answer : [currentPrompt.answer]).map((ans, idx) => (
                        <p key={idx} className="text-base font-black text-rose-700 select-all">
                            {ans}
                        </p>
                    ))}
                </div>
            </div>
        )}

        <div className="relative">
            {/* Prominent Mic Button - Now larger and more visible */}
            <button 
                onClick={toggleListen}
                className={`absolute left-3 top-2 bottom-2 w-16 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg' 
                    : hasMicUsed 
                      ? 'bg-green-500 text-white' 
                      : `bg-gradient-to-br from-${themeColor}-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105`
                }`}
                title={isVi ? "Bấm để nói (BẮT BUỘC)" : "Click to speak (REQUIRED)"}
            >
                <Mic className="w-7 h-7" />
                <span className="text-xs font-bold mt-0.5">{isListening ? 'REC' : hasMicUsed ? '✓' : 'MIC'}</span>
            </button>

            <input 
                type="text" 
                value={inputVal}
                onChange={(e) => { setInputVal(e.target.value); setFeedback(null); }}
                placeholder={
                  hasMicUsed 
                    ? (isVi ? "Chỉnh sửa câu hỏi (Nhớ dấu ?)..." : "Edit your question (Remember ?)...") 
                    : (isVi ? "🔒 BẤM MIC ĐỂ NÓI TRƯỚC!" : "🔒 PRESS MIC TO SPEAK FIRST!")
                }
                className={`w-full p-4 pl-24 pr-32 text-lg font-medium rounded-2xl border-2 outline-none transition-all ${
                  !hasMicUsed 
                    ? 'bg-slate-100 border-slate-300 cursor-not-allowed text-slate-400' 
                    : feedback 
                      ? (feedback.isPass ? 'border-green-500 bg-green-50' : 'border-rose-400 bg-rose-50') 
                      : `border-slate-200 focus:border-${themeColor}-400`
                }`}
                disabled={!hasMicUsed || feedback?.isPass}
                onKeyDown={(e) => e.key === 'Enter' && hasMicUsed && !feedback?.isPass && handleCheck()}
            />

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
