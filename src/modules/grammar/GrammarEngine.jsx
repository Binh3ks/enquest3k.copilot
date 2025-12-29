import React, { useState, useRef, useEffect } from 'react';
import { Hash, Check, AlertCircle, ArrowRight, HelpCircle, Edit3, BookOpen, ChevronDown, ChevronUp, Keyboard, CheckCircle } from 'lucide-react';
import { analyzeAnswer } from '../../utils/smartCheck';
import InstructionBar from '../../components/common/InstructionBar';
import { speakText } from '../../utils/AudioHelper';
import { saveStationState, loadStationState } from '../../utils/stationStateHelper';
import { useParams } from 'react-router-dom';

const GrammarEngine = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const { weekId } = useParams();
  
  // Load saved state from localStorage
  const savedState = loadStationState(weekId, 'grammar');
  const [completedQuestions, setCompletedQuestions] = useState(savedState?.completed || []);
  const [currentIndex, setCurrentIndex] = useState(savedState?.currentIndex || 0);
  const [feedback, setFeedback] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [inputVal, setInputVal] = useState(""); 
  const [showLesson, setShowLesson] = useState(true);
  const inputRef = useRef(null);

  // Save state whenever it changes
  useEffect(() => {
    if (completedQuestions.length > 0 || currentIndex > 0) {
      saveStationState(weekId, 'grammar', {
        completed: completedQuestions,
        currentIndex: currentIndex
      });
    }
  }, [completedQuestions, currentIndex, weekId]);

  // Report progress based on completed questions
  useEffect(() => {
    if (data?.exercises && completedQuestions.length > 0 && onReportProgress) {
      const progress = Math.round((completedQuestions.length / data.exercises.length) * 100);
      onReportProgress(progress);
    }
  }, [completedQuestions, data?.exercises, onReportProgress]);

  // Move useEffect BEFORE the early return
  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, [currentIndex]);

  if (!data || !data.exercises) return <div className="p-8 text-center">Loading grammar...</div>;

  const questions = data.exercises;
  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const renderRichText = (text) => {
    if (!text) return "";
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => 
      part.startsWith('**') ? <span key={i} className={`font-black text-${themeColor}-600`}>{part.replace(/\*\*/g, '')}</span> : <span key={i}>{part}</span>
    );
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex(prev => prev + 1);
      setFeedback({}); setShowHint(false); setInputVal(""); 
    } else {
        if (onReportProgress) onReportProgress(100);
    }
  };

  const checkAnswer = () => {
    const cleanInput = inputVal.replace(/\s+/g, ' ').trim();
    
    // INTELLIGENT MODE SWITCHING
    // Nếu là bài sắp xếp câu (unscramble) hoặc tự đặt câu (customCheck) -> Dùng mode 'strict' để bắt dấu câu/viết hoa.
    // Nếu là điền từ (fill/mc) -> Dùng mode 'grammar' (dễ tính hơn).
    const checkMode = (currentQ.type === 'unscramble' || currentQ.customCheck) ? 'strict' : 'grammar';

    const result = analyzeAnswer(cleanInput, currentQ.answer, checkMode);
    
    let msgVi = "Sai rồi."; let msgEn = "Incorrect.";
    
    if (result.status === 'perfect') {
        msgVi = "Chính xác tuyệt đối!"; msgEn = "Perfect!";
    } else if (result.status === 'warning') {
        msgVi = result.message; // Sử dụng thông báo chi tiết từ SmartCheck v15
        msgEn = result.message;
    } else if (result.status === 'empty') {
        msgVi = "Bạn chưa nhập gì cả."; msgEn = "Please type something.";
    }

    setFeedback({ ...result, message_vi: msgVi, message_en: msgEn });

    if (result.isCorrect) {
        // Mark question as completed
        if (!completedQuestions.includes(currentQ.id)) {
          setCompletedQuestions(prev => [...prev, currentQ.id]);
        }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        if (feedback.isCorrect) handleNext(); else checkAnswer();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-24">
      {data.grammar_explanation && (
        <div className={`bg-white rounded-2xl shadow-sm border-2 border-${themeColor}-100 overflow-hidden mb-6`}>
          <button onClick={() => setShowLesson(!showLesson)} className={`w-full p-4 flex items-center justify-between bg-${themeColor}-50 text-${themeColor}-800 font-bold hover:bg-${themeColor}-100 transition-colors`}>
            <span className="flex items-center text-lg"><BookOpen className="w-6 h-6 mr-2" /> {isVi ? data.grammar_explanation.title_vi : data.grammar_explanation.title_en}</span>
            {showLesson ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {showLesson && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white animate-slide-down">
              {data.grammar_explanation.rules.map((rule, idx) => (
                <div key={idx} className={`p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-${themeColor}-200 bg-slate-50/50`}>
                  <div className="text-3xl mb-3">{rule.icon}</div>
                  <p className="text-base text-slate-800 mb-2 leading-snug">{renderRichText(isVi ? rule.rule_vi : rule.rule_en)}</p>
                  <p className="text-xs text-slate-500 italic border-t border-slate-200 pt-2 mt-2">Ex: {renderRichText(rule.example)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <InstructionBar themeColor={themeColor} isVi={isVi} onToggle={onToggleLang} textEn="Complete the tasks. Pay attention to Punctuation & Capitalization!" textVi="Hoàn thành bài tập. Chú ý Dấu câu & Viết hoa!" />

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3 w-full mr-4">
          <span className={`p-2 rounded-lg ${completedQuestions.includes(currentQ.id) ? 'bg-green-100 text-green-600' : `bg-${themeColor}-100 text-${themeColor}-600`} font-bold text-xs flex items-center gap-1`}>
            {completedQuestions.includes(currentQ.id) && <CheckCircle className="w-3 h-3" />}
            Q{currentQ.id}
          </span>
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full bg-${themeColor}-500 transition-all duration-500`} style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        <span className="text-sm font-bold text-slate-500 whitespace-nowrap">{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className={`card-3d p-6 md:p-8 border-${themeColor}-100 min-h-[300px] flex flex-col`}>
        <div className="mb-8">
          <h3 className={`text-sm font-bold text-${themeColor}-600 mb-2 uppercase tracking-wider flex items-center`}><Keyboard className="w-4 h-4 mr-2" /> {isVi ? "Bài tập" : "Task"}</h3>
          <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">{currentQ.question}</p>
          {currentQ.type === 'mc' && (
            <div className="mt-4 flex flex-wrap gap-3">
                {currentQ.options.map(opt => (
                    <span key={opt} className="px-3 py-1 bg-slate-100 rounded-lg border border-slate-300 text-slate-600 font-mono text-sm font-bold select-none">{opt}</span>
                ))}
            </div>
          )}
          {currentQ.type === 'unscramble' && (
            <div className="mt-4 flex flex-wrap gap-2">
                {currentQ.words.map((w, i) => (
                    <span key={i} className={`px-3 py-2 rounded-lg border-2 border-${themeColor}-200 bg-${themeColor}-50 text-${themeColor}-700 font-bold shadow-sm select-none`}>{w}</span>
                ))}
            </div>
          )}
        </div>

        <div className="mt-auto space-y-4">
            {isLastQuestion && feedback.isCorrect ? (
                <div className="text-center py-8">
                    <h3 className="text-2xl font-black text-green-500 mb-4">You did it! 🎉</h3>
                    <p className="text-slate-500 mb-6">Completed all grammar tasks.</p>
                    <button className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg" onClick={() => window.location.reload()}>Review Again</button>
                </div>
            ) : (
                <>
                    <input ref={inputRef} type="text" value={inputVal} onChange={(e) => { setInputVal(e.target.value); if (feedback.status) setFeedback({}); }} onKeyDown={handleKeyDown} placeholder={isVi ? "Gõ câu trả lời..." : "Type your answer..."} className={`w-full p-4 text-lg border-2 rounded-xl outline-none transition-all font-medium ${feedback.status === 'perfect' ? 'border-green-500 bg-green-50 text-green-900' : feedback.status === 'warning' ? 'border-amber-400 bg-amber-50 text-amber-900' : feedback.status === 'wrong' ? 'border-rose-300 bg-rose-50 text-rose-900' : `border-slate-300 focus:border-${themeColor}-500 focus:bg-white`}`} autoComplete="off" autoCorrect="off" spellCheck="false" />
                    <div className="flex justify-between items-center h-12">
                        <div className="flex-1 mr-4">
                            {feedback.status ? (
                                <div className={`flex items-center font-bold text-sm animate-fade-in ${feedback.status === 'perfect' ? 'text-green-600' : feedback.status === 'warning' ? 'text-amber-600' : 'text-rose-500'}`}>
                                    {feedback.status === 'perfect' ? <Check className="w-5 h-5 mr-2"/> : <AlertCircle className="w-5 h-5 mr-2"/>}
                                    {isVi ? feedback.message_vi : feedback.message_en}
                                </div>
                            ) : (showHint && <div className={`text-sm font-medium italic text-${themeColor}-500 animate-fade-in flex items-center`}><HelpCircle className="w-4 h-4 mr-1"/> {isVi ? "Gợi ý: " : "Hint: "} {isVi ? currentQ.hint_vi || currentQ.hint : currentQ.hint_en || currentQ.hint}</div>)}
                        </div>
                        <div className="flex gap-2 shrink-0">
                            {!feedback.isCorrect && !showHint && <button onClick={() => setShowHint(true)} className="p-3 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors" title="Hint"><HelpCircle className="w-6 h-6" /></button>}
                            {feedback.isCorrect ? <button onClick={handleNext} className={`btn-3d px-8 py-3 bg-${themeColor}-600 text-white rounded-xl font-bold flex items-center`}>{isVi ? "Tiếp theo" : "Next"} <ArrowRight className="w-5 h-5 ml-2" /></button> : <button onClick={checkAnswer} className={`btn-3d px-8 py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center`}>{isVi ? "Kiểm tra" : "Check"} <Edit3 className="w-4 h-4 ml-2" /></button>}
                        </div>
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
};
export default GrammarEngine;
