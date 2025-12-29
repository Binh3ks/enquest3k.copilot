import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle, Globe, Edit3, Loader2, Star } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';
// Removed: import { useTranslation } from '../../utils/langHooks';

const VocabCard = ({ word, themeColor, isVi, onComplete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [drill, setDrill] = useState({ copy1: '', copy2: '', copy3: '', collocation: '', sentence: '' });
  const [feedback, setFeedback] = useState({ collocation: null, sentence: null });
  const [copyStatus, setCopyStatus] = useState({ copy1: null, copy2: null, copy3: null });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lấy Collocation (phrase) hoặc Example (sentence)
  const targetCollocation = word.collocation || word.example;
  const isColloCorrect = feedback.collocation?.isCorrect;
  const isSentCorrect = feedback.sentence?.isCorrect;
  const allCopyCorrect = copyStatus.copy1 && copyStatus.copy2 && copyStatus.copy3;

  // CHECK COMPLETION
  useEffect(() => {
      if (allCopyCorrect && isColloCorrect && isSentCorrect && !isCompleted) {
          setIsCompleted(true);
          onComplete(word.id);
      }
  }, [allCopyCorrect, isColloCorrect, isSentCorrect, isCompleted, onComplete, word.id]);

  const play = async (e, text, url) => {
    e.stopPropagation(); 
    if (isPlaying) return;

    setIsPlaying(true);
    try {
        await speakText(text, url);
    } catch (error) {
        console.error("Play error", error);
    } finally {
        setTimeout(() => setIsPlaying(false), 500);
    }
  };

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) {
        return;
    }
    setIsFlipped(!isFlipped);
  };

  const handleCopyCheck = (key, value) => {
      const isCorrect = value.trim().toLowerCase() === word.word.toLowerCase();
      setCopyStatus(prev => ({ ...prev, [key]: isCorrect }));
  };

  const handleCollocationCheck = () => {
    if (!targetCollocation) return;
    // Collocation Drill: Chỉ yêu cầu khớp với text của collocation/example (mode: grammar)
    const result = analyzeAnswer(drill.collocation, targetCollocation, 'grammar');
    setFeedback(prev => ({ ...prev, collocation: result }));
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
        setFeedback(prev => ({ ...prev, sentence: { isCorrect: true, status: 'perfect', message: isVi ? 'Câu tốt!' : 'Good job!' } }));
    }
  };

  const getMessage = (res) => {
    if (!res) return "";
    if (res.status === 'empty') return isVi ? "Nhập liệu..." : "Enter text.";
    if (res.status === 'perfect') return isVi ? "Chính xác!" : "Perfect!";
    if (res.status === 'wrong') return isVi ? "Sai rồi." : "Incorrect.";
    if (res.status === 'warning') return res.message || (isVi ? "Gần đúng." : "Close.");
    return res.message || "";
  };

  return (
    <div className={`flex flex-col gap-4 transition-all duration-500 ${isCompleted ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}>
      {/* 3D FLIP CARD */}
      <div 
        className={`relative w-full h-96 cursor-pointer group ${isFlipped ? 'z-50' : 'z-10'}`}
        style={{ perspective: '1000px' }}
        onClick={handleCardClick}
      >
        <div 
            className="relative w-full h-full transition-all duration-700"
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* FRONT */}
          <div className={`absolute inset-0 bg-white rounded-3xl shadow-lg border border-slate-100 flex flex-col overflow-hidden hover:shadow-orange-200/50 transition-shadow ${isFlipped ? 'pointer-events-none' : ''}`} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
           <div className="h-3/5 w-full bg-slate-50 relative p-6 flex items-center justify-center">
                <img src={word.image_url} alt={word.word} className="w-full h-full object-contain drop-shadow-md transition-transform group-hover:scale-105" />
                <div className="absolute top-3 right-3 text-white drop-shadow-md">
                    {isCompleted ? <CheckCircle className="w-8 h-8 fill-green-500 text-white" /> : <Star className="w-6 h-6 fill-amber-400 text-amber-400" />}
                </div>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center w-full relative -top-4 px-4 z-20">
                <h3 className="text-4xl font-black text-slate-800 mb-1 capitalize">{word.word}</h3>
                <span className="text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-full mb-4 shadow-sm">{word.pronunciation}</span>
                
                <button 
                    onClick={(e) => play(e, word.word, word.audio_word)} 
                    className={`p-4 bg-${themeColor}-500 text-white rounded-full hover:scale-110 transition-all shadow-lg hover:shadow-orange-300 active:scale-95 flex items-center justify-center`}
                    disabled={isPlaying}
                >
                  {isPlaying ? <Loader2 className="w-7 h-7 animate-spin" /> : <Volume2 className="w-7 h-7" />}
                </button>
           </div>
           <p className="absolute bottom-3 text-[10px] text-slate-300 uppercase font-bold tracking-widest w-full text-center">Tap to Flip</p>
          </div>

          {/* BACK */}
          <div className={`absolute inset-0 bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-xl border-2 border-orange-100 p-6 flex flex-col justify-center text-center ${!isFlipped ? 'pointer-events-none' : ''}`} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="mb-6 relative z-20">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase text-orange-400 tracking-wider">Meaning</span>
                    <button onClick={(e) => play(e, word.definition_en, word.audio_def)} className="p-1 bg-white rounded-full shadow-sm text-orange-400 hover:text-orange-600 relative z-50"><Volume2 className="w-4 h-4"/></button>
                </div>
                <p className="font-bold text-slate-800 text-2xl leading-snug">{word.definition_en}</p>
                {word.definition_vi && <div className="mt-3 pt-3 border-t border-orange-200/50"><p className="text-lg text-slate-500 italic font-medium">"{word.definition_vi}"</p></div>}
            </div>
            
            <div className="pt-4 border-t border-orange-200/50 relative z-20">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs font-black uppercase text-indigo-500 tracking-wider">COLLOCATION</span>
                    {/* FIX: Sử dụng audio_coll để phát PHRASE (Collocation) */}
                    <button onClick={(e) => play(e, targetCollocation, word.audio_coll)} className="p-1 bg-white rounded-full shadow-sm text-indigo-500 hover:text-indigo-700 relative z-50"><Volume2 className="w-4 h-4"/></button>
                </div>
                <p className="text-xl text-indigo-800 font-black italic leading-relaxed">"{targetCollocation}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* DRILL ZONE */}
      <div className={`bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 shadow-sm relative z-0 ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
        <p className="text-xs font-black uppercase text-slate-500 tracking-wider mb-1">1. Copy Word (x3)</p>
        <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <input 
                key={i} 
                type="text" 
                placeholder={`${i}`} 
                className={`w-1/3 p-3 text-xs border rounded-xl text-center outline-none transition-all font-mono capitalize ${copyStatus[`copy${i}`] === true ? 'border-green-400 bg-green-50' : copyStatus[`copy${i}`] === false ? 'border-rose-300 bg-rose-50' : 'focus:border-orange-400 focus:bg-white'}`}
                value={drill[`copy${i}`]} 
                onChange={(e) => {
                    const val = e.target.value;
                    setDrill({...drill, [`copy${i}`]: val});
                    handleCopyCheck(`copy${i}`, val);
                }} 
              />
            ))}
        </div>
        
        <p className="text-xs font-black uppercase text-slate-500 tracking-wider pt-2 mb-1">2. Collocation Drill</p>
        <div className="relative">
            <input type="text" placeholder={isVi ? `Gõ: ${targetCollocation}` : `Type: ${targetCollocation}`} 
              className={`w-full p-3 pr-24 text-sm border-2 rounded-xl outline-none transition-all font-bold ${isColloCorrect ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-indigo-400 focus:bg-white'}`}
              value={drill.collocation} 
              onChange={(e) => { setDrill({...drill, collocation: e.target.value}); setFeedback({...feedback, collocation: null}); }}
              onKeyDown={(e) => e.key === 'Enter' && handleCollocationCheck()}
            />
            <button onClick={handleCollocationCheck} className={`absolute right-1 top-1 bottom-1 px-4 rounded-lg font-bold text-white text-xs shadow-sm transition-all ${isColloCorrect ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {isColloCorrect ? <CheckCircle className="w-4 h-4"/> : "Check"}
            </button>
        </div>
        {feedback.collocation && <p className={`text-[10px] font-bold ${isColloCorrect ? 'text-green-600' : 'text-rose-500'}`}>{getMessage(feedback.collocation)}</p>}

        <p className="text-xs font-black uppercase text-slate-500 tracking-wider pt-2 mb-1">3. Make a Sentence</p>
        <div className="relative">
            <input type="text" placeholder={isVi ? "Đặt câu..." : "Write a sentence..."} 
              className={`w-full p-3 pr-24 text-sm border-2 rounded-xl outline-none transition-all ${isSentCorrect ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-orange-400 focus:bg-white'}`}
              value={drill.sentence} 
              onChange={(e) => { setDrill({...drill, sentence: e.target.value}); setFeedback({...feedback, sentence: null}); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSentenceCheck()}
            />
            <button onClick={handleSentenceCheck} className={`absolute right-1 top-1 bottom-1 px-4 rounded-lg font-bold text-white text-xs shadow-sm transition-all ${isSentCorrect ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`}>
                {isSentCorrect ? <CheckCircle className="w-4 h-4"/> : "Check"}
            </button>
        </div>
        {feedback.sentence && <p className={`text-[10px] font-bold ${feedback.sentence.isCorrect ? 'text-green-600' : 'text-rose-500'}`}>{feedback.sentence.message}</p>}
      </div>
    </div>
  );
};

const VocabManager = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const [completedIds, setCompletedIds] = useState([]);

  if (!data || !data.vocab) return <div>Loading Vocab...</div>;

  const handleCardComplete = (id) => {
      setCompletedIds(prev => {
          if (prev.includes(id)) return prev;
          const newCompleted = [...prev, id];
          // Report Progress
          const percent = Math.round((newCompleted.length / data.vocab.length) * 100);
          if (onReportProgress) onReportProgress(percent);
          return newCompleted;
      });
  };

  return (
    <div className="pb-24">
      {/* HEADER */}
      <div className={`bg-${themeColor}-100 p-4 rounded-xl border border-${themeColor}-200 mb-8 flex justify-between items-center shadow-sm`}>
        <div>
          <h2 className={`text-xl font-black text-${themeColor}-800 uppercase flex items-center`}>
            New Words
            {/* FIX: Đã thêm lại Globe import còn thiếu */}
            <button onClick={onToggleLang} className="ml-3 p-1 bg-white/50 rounded-md hover:bg-white text-xs font-bold text-slate-500 flex items-center border border-transparent hover:border-slate-300 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> {isVi ? 'VI' : 'EN'}
            </button>
          </h2>
          <p className="text-sm text-slate-600 font-bold">{isVi ? "Học từ vựng cốt lõi & Luyện tập" : "Core Vocabulary & Collocation Practice"}</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
           <span className="text-xs font-bold text-slate-400 block text-center uppercase tracking-wider">Progress</span>
           <span className={`text-2xl font-black text-${themeColor}-600 block text-center`}>
             {completedIds.length}/{data.vocab.length}
           </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
        {data.vocab.map(w => (
          <VocabCard key={w.id} word={w} themeColor={themeColor} isVi={isVi} onComplete={handleCardComplete} />
        ))}
      </div>
    </div>
  );
};
export default VocabManager;
