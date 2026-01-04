import React, { useState, useEffect } from 'react';
import { Volume2, Zap, Globe, CheckCircle, Edit3, BookOpen, Star } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';

const PowerCard = ({ word, themeColor, isVi, onComplete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [drill, setDrill] = useState({ copy1: '', copy2: '', copy3: '', definition: '', sentence: '' });
  const [feedback, setFeedback] = useState({ definition: null, sentence: null });
  const [copyStatus, setCopyStatus] = useState({ copy1: null, copy2: null, copy3: null });
  const [isCompleted, setIsCompleted] = useState(false);

  // FIX: Ưu tiên hiển thị Collocation (Phrase) ở phần Context để khớp với Audio Phrase
  // Giai đoạn 1: Học Phrase -> Audio đọc Phrase -> Text hiển thị Phrase.
  const targetDefinition = word.definition_en;
  const targetContext = word.collocation || word.model_sentence || word.example; 
  
  const isDefCorrect = feedback.definition?.isCorrect;
  const isSentCorrect = feedback.sentence?.isCorrect;
  const allCopyCorrect = copyStatus.copy1 && copyStatus.copy2 && copyStatus.copy3;

  useEffect(() => {
      if (allCopyCorrect && isDefCorrect && isSentCorrect && !isCompleted) {
          setIsCompleted(true);
          onComplete(word.id);
      }
  }, [allCopyCorrect, isDefCorrect, isSentCorrect, isCompleted, onComplete, word.id]);

  const play = (e, text, url) => {
    e.stopPropagation();
    speakText(text, url);
  };

  const handleCopyCheck = (key, value) => {
      const isCorrect = value.trim().toLowerCase() === word.word.toLowerCase();
      setCopyStatus(prev => ({ ...prev, [key]: isCorrect }));
  };

  const handleDefinitionCheck = () => {
    if (!targetDefinition) return;
    const result = analyzeAnswer(drill.definition, targetDefinition, 'academic');
    setFeedback(prev => ({ ...prev, definition: result }));
  };

  const handleSentenceCheck = () => {
    const input = drill.sentence.trim();
    if (!input) return;
    
    if (!input.toLowerCase().includes(word.word.toLowerCase())) {
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: false, status: 'wrong', message: isVi ? `Thiếu từ "${word.word}"` : `Missing "${word.word}"` } }));
        return;
    }

    let warnings = [];
    if (input.charAt(0) !== input.charAt(0).toUpperCase()) warnings.push(isVi ? "Viết hoa đầu câu" : "Capitalization");
    if (!/[.?!]$/.test(input)) warnings.push(isVi ? "Dấu kết câu" : "Punctuation");

    if (warnings.length > 0) {
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: false, status: 'warning', message: isVi ? `Lỗi: ${warnings.join(', ')}` : `Check: ${warnings.join(', ')}` } }));
    } else if (input.split(' ').length < 3) {
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: false, status: 'warning', message: isVi ? 'Câu quá ngắn' : 'Too short' } }));
    } else {
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: true, status: 'perfect', message: isVi ? 'Tuyệt vời!' : 'Excellent!' } }));
    }
  };

  const getMessage = (res) => {
    if (!res) return "";
    if (res.status === 'empty') return isVi ? "Nhập nội dung..." : "Enter text.";
    if (res.status === 'perfect') return isVi ? "Chính xác!" : "Correct!";
    if (res.status === 'wrong') return isVi ? "Sai rồi." : "Incorrect.";
    if (res.status === 'warning') return res.message || (isVi ? "Gần đúng." : "Close.");
    return res.message || "";
  };

  return (
    <div className={`flex flex-col gap-4 transition-all duration-500 ${isCompleted ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}>
      <div 
        className={`relative w-full h-96 cursor-pointer group ${isFlipped ? 'z-50' : 'z-10'}`}
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
            className="relative w-full h-full transition-all duration-700"
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 bg-teal-600 rounded-3xl shadow-xl border border-teal-500 flex flex-col overflow-hidden text-white" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
           <div className="h-3/5 w-full relative p-6 flex items-center justify-center bg-teal-700/50">
                  {word.image_url ? (
                    <img src={word.image_url} alt={word.word} className="w-full h-full object-contain p-2 bg-white opacity-90 rounded-xl shadow-inner" />
                  ) : (
                    <div className="text-6xl font-black opacity-20">{word.word[0]}</div>
                  )}
                  <div className="absolute top-3 right-3">
                    {isCompleted ? <CheckCircle className="w-8 h-8 fill-green-400 text-white" /> : <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />}
                  </div>
           </div>
           <div className="flex-1 flex flex-col items-center justify-center p-4">
                  <h3 className="text-4xl font-black mb-2 capitalize tracking-wide">{word.word}</h3>
                  <span className="text-sm font-mono bg-white/20 px-3 py-1 rounded-full mb-4">{word.pronunciation}</span>
                  <button onClick={(e) => play(e, word.word, word.audio_word)} className="p-3 bg-white text-teal-700 rounded-full hover:scale-110 transition-transform shadow-lg">
                    <Volume2 className="w-6 h-6" />
                  </button>
           </div>
           <p className="absolute bottom-3 w-full text-center text-[10px] font-bold opacity-60 uppercase tracking-widest">Tap for Definition</p>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-xl border-2 border-teal-100 p-6 flex flex-col justify-center text-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
           <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase text-teal-600 tracking-wider">Definition</span>
                    <button onClick={(e) => play(e, word.definition_en, word.audio_def)} className="p-1 bg-teal-50 rounded-full text-teal-500 hover:text-teal-700"><Volume2 className="w-4 h-4"/></button>
                </div>
                <p className="font-bold text-slate-800 text-xl leading-snug">{word.definition_en}</p>
                {word.definition_vi && <p className="text-sm text-slate-400 italic mt-2">"{word.definition_vi}"</p>}
           </div>
           <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase text-teal-600 tracking-wider">Context</span>
                    {/* Nút loa phát audio_coll (Phrase Audio) */}
                    <button onClick={(e) => play(e, targetContext, word.audio_coll)} className="p-1 bg-teal-50 rounded-full text-teal-500 hover:text-teal-700"><Volume2 className="w-4 h-4"/></button>
                </div>
                {/* Hiển thị Text của Phrase (Collocation) */}
                <p className="text-lg text-teal-800 font-medium italic">"{targetContext}"</p>
           </div>
          </div>
        </div>
      </div>

      {/* DRILL ZONE */}
      <div className={`bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm ${isCompleted ? 'bg-teal-50 border-teal-200' : ''}`}>
       <div>
            <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">1. Copy Word (x3)</p>
            <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                <input 
                    key={i} 
                    type="text" 
                    placeholder={`${i}`} 
                    className={`w-1/3 p-3 text-xs border rounded-xl text-center outline-none transition-all font-mono capitalize ${copyStatus[`copy${i}`] === true ? 'border-green-400 bg-green-50' : copyStatus[`copy${i}`] === false ? 'border-rose-300 bg-rose-50' : 'focus:border-teal-400 focus:bg-teal-50'}`}
                    value={drill[`copy${i}`]} 
                    onChange={(e) => {
                        const val = e.target.value;
                        setDrill({...drill, [`copy${i}`]: val});
                        handleCopyCheck(`copy${i}`, val);
                    }} 
                />
                ))}
            </div>
       </div>

       <div>
            <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">2. Type Definition (Academic)</p>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder={isVi ? `Gõ: ${targetDefinition}` : `Type: ${targetDefinition}`} 
                    className={`w-full p-3 pr-24 text-sm border-2 rounded-xl outline-none transition-all font-medium ${isDefCorrect ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-teal-400 focus:bg-white'}`}
                    value={drill.definition} 
                    onChange={(e) => { setDrill({...drill, definition: e.target.value}); setFeedback({...feedback, definition: null}); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleDefinitionCheck()}
                />
                <button onClick={handleDefinitionCheck} className={`absolute right-1 top-1 bottom-1 px-4 rounded-lg font-bold text-white text-xs shadow-sm transition-all ${isDefCorrect ? 'bg-green-500' : 'bg-teal-600 hover:bg-teal-700'}`}>
                    {isDefCorrect ? <CheckCircle className="w-4 h-4"/> : "Check"}
                </button>
            </div>
            {feedback.definition && <p className={`text-[10px] font-bold mt-1 ${isDefCorrect ? 'text-green-600' : 'text-rose-500'}`}>{getMessage(feedback.definition)}</p>}
       </div>

       <div>
            <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">3. Write a Sentence</p>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder={isVi ? "Đặt câu..." : "Write a sentence..."} 
                    className={`w-full p-3 pr-24 text-sm border-2 rounded-xl outline-none transition-all ${isSentCorrect ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-teal-400 focus:bg-white'}`}
                    value={drill.sentence} 
                    onChange={(e) => { setDrill({...drill, sentence: e.target.value}); setFeedback({...feedback, sentence: null}); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSentenceCheck()}
                />
                <button onClick={handleSentenceCheck} className={`absolute right-1 top-1 bottom-1 px-4 rounded-lg font-bold text-white text-xs shadow-sm transition-all ${isSentCorrect ? 'bg-green-500' : 'bg-teal-600 hover:bg-teal-700'}`}>
                    {isSentCorrect ? <CheckCircle className="w-4 h-4"/> : "Check"}
                </button>
            </div>
            {feedback.sentence && <p className={`text-[10px] font-bold mt-1 ${feedback.sentence.isCorrect ? 'text-green-600' : 'text-rose-500'}`}>{feedback.sentence.message}</p>}
       </div>
      </div>
    </div>
  );
};

const WordPower = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const [completedIds, setCompletedIds] = useState([]);

  if (!data || !data.words) return <div>Loading Power...</div>;

  const handleCardComplete = (id) => {
      setCompletedIds(prev => {
          if (prev.includes(id)) return prev;
          const newCompleted = [...prev, id];
          // Report Progress
          const percent = Math.round((newCompleted.length / data.words.length) * 100);
          if (onReportProgress) onReportProgress(percent);
          return newCompleted;
      });
  };

  return (
    <div className="pb-24">
      <div className="bg-teal-50 p-6 rounded-2xl border-2 border-teal-100 mb-8 flex justify-between items-center shadow-sm">
       <div>
            <h2 className="text-2xl font-black text-teal-800 uppercase flex items-center">
                Word Power
                <button onClick={onToggleLang} className="ml-3 px-2 py-1 bg-white rounded-lg border border-teal-200 text-xs font-bold text-teal-600 hover:bg-teal-100 transition-colors">
                 {isVi ? 'VI' : 'EN'}
                </button>
            </h2>
            <p className="text-sm font-bold text-teal-600/70">{isVi ? "Từ vựng Học thuật & Tư duy" : "Academic Vocabulary & Thinking"}</p>
       </div>
       <div className="text-right flex flex-col items-center">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Progress</span>
            <div className="text-3xl font-black text-teal-500">
                {completedIds.length}/{data.words.length}
            </div>
       </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
       {data.words.map(w => (
            <PowerCard key={w.id} word={w} themeColor={themeColor} isVi={isVi} onComplete={handleCardComplete} />
       ))}
      </div>
      {/* DEBUG: Hiển thị trạng thái Audio để kiểm tra lỗi file câm Tuần 2 */}
    </div>
  );
};
export default WordPower;
