import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle, XCircle, ArrowRight, Star, Hash, Globe } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';

const ReviewDrill = ({ item, onComplete, onCancel }) => {
    const [inputVal, setInputVal] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isVi, setIsVi] = useState(false); 
    
    const isVocab = item.type === 'Word';
    const primaryColor = isVocab ? 'orange' : 'rose';
    
    // Câu lệnh hướng dẫn thông minh hơn
    const getInstruction = () => {
        if (isVocab) return isVi ? 'Điền từ còn thiếu vào chỗ trống:' : 'Fill in the missing word:';
        return isVi ? 'Hoàn thành câu ngữ pháp:' : 'Complete the grammar sentence:';
    }

    const checkAnswer = () => {
        if (isCorrect) return;
        const result = analyzeAnswer(inputVal, item.answer, item.checkType || 'text');
        
        let msg = "";
        let newIsCorrect = false;

        if (result.status === 'perfect' || result.status === 'near_perfect') {
            msg = isVi ? "Chính xác!" : "Correct!";
            newIsCorrect = true;
        } else if (result.status === 'warning') {
            msg = isVi ? "Gần đúng, kiểm tra lỗi chính tả/viết hoa." : "Close, check spelling/caps.";
        } else {
            msg = isVi ? "Chưa đúng. Thử lại nhé." : "Incorrect. Try again.";
        }
        
        setFeedback({ ...result, message: msg });
        setIsCorrect(newIsCorrect);
        
        if (newIsCorrect) {
            if (item.audioUrl) {
                new Audio(item.audioUrl).play().catch(() => speakText("Correct!"));
            } else {
                speakText("Correct!");
            }
        }
    };
    
    const handleSaveAndNext = () => {
        if (isCorrect) onComplete(item.id);
        else checkAnswer();
    };

    return (
        <div className="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 border-t-8 border-${primaryColor}-500`}>
                
                {/* Header */}
                <div className="p-6 bg-white flex justify-between items-start border-b border-slate-100">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 flex items-center">
                            {isVocab ? <Star className="w-6 h-6 mr-2 text-orange-500" /> : <Hash className="w-6 h-6 mr-2 text-rose-500" />}
                            {item.subType || item.type}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 font-bold">Week {item.week}</p>
                    </div>
                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><XCircle className="w-8 h-8" /></button>
                </div>

                {/* Body */}
                <div className="p-8 bg-slate-50 space-y-6">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">{getInstruction()}</p>
                        <button onClick={() => setIsVi(!isVi)} className="text-xs font-bold text-slate-400 flex items-center hover:text-indigo-600"><Globe className="w-3 h-3 mr-1"/> {isVi ? 'EN' : 'VI'}</button>
                    </div>
                    
                    {/* Question Box - Hiển thị to, rõ ràng */}
                    <div className="p-6 rounded-2xl border-2 border-slate-200 bg-white text-center shadow-sm">
                        <p className="text-2xl md:text-3xl font-black text-slate-800 leading-snug">
                            {item.task}
                        </p>
                        {item.hint && <p className="text-sm text-slate-400 mt-3 italic font-medium">Hint: {item.hint}</p>}
                    </div>

                    {/* Input Zone */}
                    <div className="relative">
                        <input 
                            type="text" 
                            className={`w-full p-4 pl-6 pr-32 text-xl font-bold border-2 rounded-2xl outline-none transition-all ${feedback?.isCorrect ? 'border-green-500 bg-green-50 text-green-700' : feedback ? 'border-rose-400 bg-rose-50' : 'border-slate-300 focus:border-indigo-500 focus:shadow-lg'}`}
                            placeholder="..."
                            value={inputVal}
                            onChange={(e) => { setInputVal(e.target.value); setFeedback(null); setIsCorrect(false); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveAndNext()}
                            disabled={isCorrect}
                            autoFocus
                        />
                        <button onClick={handleSaveAndNext} className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold text-white shadow-md transition-all active:scale-95 ${isCorrect ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                             {isCorrect ? <CheckCircle className="w-6 h-6"/> : (isVi ? 'Check' : 'Check')}
                        </button>
                    </div>

                    {/* Feedback Message */}
                    {feedback && (
                        <div className={`p-3 rounded-xl text-center text-sm font-bold animate-in fade-in slide-in-from-top-2 ${feedback.isCorrect ? 'text-green-600 bg-green-100' : 'text-rose-600 bg-rose-100'}`}>
                            {feedback.message}
                            {!feedback.isCorrect && <div className="mt-1 text-slate-500">Correct answer: <span className="font-black">{item.answer}</span></div>}
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-slate-200 bg-white flex justify-end">
                    <button 
                        onClick={handleSaveAndNext} 
                        disabled={!isCorrect}
                        className={`btn-3d px-10 py-3 rounded-xl font-black text-white flex items-center transition-all ${isCorrect ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-200 transform hover:-translate-y-1' : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                        {isVi ? 'TIẾP TỤC' : 'CONTINUE'} <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </div>

            </div>
        </div>
    );
};
export default ReviewDrill;
