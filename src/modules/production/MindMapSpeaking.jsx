import React, { useState, useEffect } from 'react';
import { Mic, Volume2, CheckCircle, Brain, ArrowLeft, Sparkles, Volume1, Edit2, AlertCircle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';

const MindMapSpeaking = ({ data, themeColor, isVi, onReportProgress }) => {
  
  // ================= DEBUGGING LOG =================
  console.log("--- MindMapSpeaking Component Received Data ---");
  console.log(data);
  // ===============================================

  if (!data || !data.centerStems || !data.branchLabels) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-full bg-slate-50 rounded-lg">
        <Brain className="text-slate-300 mb-4" size={64} />
        <h3 className="text-xl font-bold text-slate-400">Mindmap Data Missing</h3>
        <p className="text-slate-400">Could not load content for this week's mindmap station. Prop 'data' is either null or has the wrong structure.</p>
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-xs font-mono">
          <p className="font-bold mb-2">Debug Info:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    );
  }

  const [view, setView] = useState('structures');
  const [selectedStruct, setSelectedStruct] = useState(null);
  const [branchInputs, setBranchInputs] = useState({});
  const [feedback, setFeedback] = useState({});
  const [isListening, setIsListening] = useState(null);
  const [editMode, setEditMode] = useState({});

  // Get audio URLs from injected data (if available)
  const centerStemAudio = data.centerStemAudio || [];
  const branchLabelsAudio = data.branchLabelsAudio || {};

  const structures = data.centerStems.map((stem, i) => ({
    id: `s${i}`,
    text: stem,
    audioUrl: centerStemAudio[i] || null,
    color: ['#6366F1', '#F43F5E', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'][i % 6]
  }));

  const sentenceTargets = selectedStruct ? (data.branchLabels[selectedStruct.text] || []) : [];
  const sentenceAudioArray = selectedStruct ? (branchLabelsAudio[selectedStruct.text] || []) : [];

  const branches = sentenceTargets.map((sentence, i) => {
    const angle = (i * 60 - 30) * (Math.PI / 180);
    const radius = 35;
    const fullSentence = selectedStruct.text.replace('___', sentence);
    return {
      id: `b${i}`,
      display: sentence,
      target: fullSentence,
      audioUrl: sentenceAudioArray[i] || null,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
      color: ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#9376E1', '#FF92E0'][i % 6]
    };
  });

  const startSTT = (id) => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return alert("Microphone not supported!");
    const rec = new Recognition();
    rec.lang = 'en-US';
    rec.onstart = () => setIsListening(id);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setBranchInputs(prev => ({ ...prev, [id]: transcript }));
      setIsListening(null);
      validateBranch(id, transcript);
    };
    rec.onerror = () => setIsListening(null);
    rec.start();
  };

  const validateBranch = (branchId, userInput) => {
    if (!userInput.trim()) return;
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return;
    
    const result = analyzeAnswer(userInput, branch.target, 'strict');
    setFeedback(prev => ({ ...prev, [branchId]: result }));
    
    if (result.isCorrect) {
      speakText(isVi ? "Đúng rồi!" : "Correct!");
      const doneCount = Object.values(feedback).filter(f => f.isCorrect).length + 1;
      onReportProgress?.(Math.round((doneCount / branches.length) * 100));
      setEditMode(prev => ({ ...prev, [branchId]: false }));
    } else {
      speakText(isVi ? "Hãy thử lại" : "Try again");
      setEditMode(prev => ({ ...prev, [branchId]: true }));
    }
  };

  const handleManualCheck = (b) => {
    const userInput = branchInputs[b.id] || "";
    validateBranch(b.id, userInput);
  };
  
  if (view === 'structures') {
    return (
      <div className="flex flex-col items-center p-10 animate-in fade-in">
        <div className="w-24 h-24 bg-indigo-600 rounded-[35px] flex items-center justify-center mb-8 shadow-2xl rotate-3 border-4 border-white animate-bounce-slow">
          <Brain className="text-white" size={48}/>
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-10 uppercase italic tracking-tighter">Idea Lab</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          {structures.map(s => (
            <button key={s.id} onClick={() => { 
              setSelectedStruct(s); 
              setView('mindmap'); 
              setBranchInputs({});
              setFeedback({});
              setEditMode({});
              speakText(s.text, s.audioUrl); 
            }}
              style={{ backgroundColor: s.color }}
              className="group p-8 rounded-[40px] shadow-xl hover:scale-105 active:scale-95 transition-all text-white font-black text-xl uppercase italic border-b-[8px] border-black/10 h-32 flex items-center justify-center text-center">
              {s.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedStruct) {
    setView('structures');
    return null;
  }

  return (
    <div className="relative w-full h-[850px] bg-white rounded-[80px] shadow-inner overflow-hidden border-[10px] border-indigo-50">
      <button onClick={() => setView('structures')} className="absolute top-6 left-6 z-50 bg-slate-900 text-white px-6 py-2 rounded-full font-black text-xs flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-xl">
        <ArrowLeft size={16}/> BACK
      </button>

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        {branches.map((b, i) => (
          <path key={i} d={`M 50 50 Q 50 ${b.y} ${b.x} ${b.y}`} fill="none" stroke={b.color} strokeWidth="0.6" strokeDasharray="1 1" opacity="0.4" />
        ))}
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div style={{ backgroundColor: selectedStruct.color }} 
             className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center text-white border-[15px] border-white shadow-[0_30px_70px_rgba(0,0,0,0.2)] text-center p-6 relative overflow-hidden">
          <span className="font-black text-xl md:text-3xl uppercase italic leading-none relative z-10 drop-shadow-md tracking-tighter">{selectedStruct.text}</span>
          
          {/* Audio button for center node */}
          {selectedStruct.audioUrl && (
            <button
              onClick={() => speakText(selectedStruct.text, selectedStruct.audioUrl)}
              className="absolute top-3 right-3 z-20 bg-white text-indigo-600 p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
            >
              <Volume2 size={20} />
            </button>
          )}
          <Sparkles className="absolute top-4 right-4 text-white/30 animate-bounce" size={32}/>
        </div>
      </div>

      {branches.map(b => {
        const isDone = feedback[b.id]?.isCorrect;
        const hasError = feedback[b.id] && !feedback[b.id]?.isCorrect;
        const isEditing = editMode[b.id];
        const hasInput = branchInputs[b.id];
        
        return (
          <div key={b.id} style={{ position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%, -50%)' }} className="z-30">
            <div style={{ borderColor: isDone ? '#22C55E' : hasError ? '#EF4444' : b.color }} 
                 className={`bg-white border-[6px] p-4 rounded-[35px] shadow-2xl w-56 flex flex-col items-center gap-3 transition-all ${isDone ? 'bg-green-50' : 'hover:scale-105'}`}>
              
              <div className="flex items-center gap-2 font-black text-slate-800 uppercase text-xs italic">
                <div style={{ backgroundColor: b.color }} className="p-1.5 rounded-lg text-white shadow-sm cursor-pointer hover:scale-110 transition-transform" onClick={() => speakText(b.target, b.audioUrl)}>
                  <Volume1 size={14}/>
                </div>
                <span className="text-center">{b.display}</span>
              </div>
              
              {(isEditing || (hasError && !hasInput)) && (
                <div className="relative w-full">
                  <input 
                    className={`w-full bg-slate-50 border-2 rounded-2xl p-3 text-[11px] font-black outline-none text-center shadow-inner transition-all ${hasError ? 'border-red-300 focus:border-red-400' : 'border-transparent focus:border-indigo-100'}`}
                    value={branchInputs[b.id] || ""} 
                    placeholder="Edit your answer..."
                    onChange={e => setBranchInputs({...branchInputs, [b.id]: e.target.value})}
                    onBlur={() => handleManualCheck(b)}
                    autoFocus
                  />
                </div>
              )}

              {hasInput && !isEditing && (
                <div className={`w-full text-center text-xs font-bold p-2 rounded-lg ${isDone ? 'bg-green-100 text-green-700' : hasError ? 'bg-red-100 text-red-700' : ''}`}>
                  {branchInputs[b.id]}
                </div>
              )}

              {hasError && !isEditing && (
                <div className="w-full flex items-start gap-2 bg-red-50 p-2 rounded-lg border border-red-200">
                  <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5"/>
                  <p className="text-[10px] font-bold text-red-700 text-left leading-tight">{feedback[b.id]?.message}</p>
                </div>
              )}

              <div className="flex flex-col w-full gap-2">
                {!isDone ? (
                  <>
                    {!hasInput ? (
                      <button 
                        onClick={() => startSTT(b.id)} 
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-black text-white text-[12px] uppercase tracking-widest shadow-lg active:scale-95 transition-all border-b-4 border-black/10 ${isListening === b.id ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                      >
                        <Mic size={16}/>
                        {isListening === b.id ? 'Listening...' : 'Speak Now'}
                      </button>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleManualCheck(b)}
                          style={{ backgroundColor: b.color }}
                          className="w-full text-white text-[11px] font-black py-2 rounded-xl shadow-lg active:scale-95 transition-all uppercase tracking-widest border-b-4 border-black/10"
                        >
                          Check Answer
                        </button>
                        
                        <button 
                          onClick={() => {
                            setBranchInputs(prev => ({ ...prev, [b.id]: '' }));
                            setFeedback(prev => ({ ...prev, [b.id]: null }));
                            setEditMode(prev => ({ ...prev, [b.id]: false }));
                          }}
                          className="w-full text-slate-700 text-[10px] font-black py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 shadow transition-all uppercase tracking-widest"
                        >
                          Speak Again
                        </button>
                      </>
                    )}

                    {hasError && !isEditing && (
                      <button 
                        onClick={() => setEditMode(prev => ({ ...prev, [b.id]: true }))}
                        className="w-full text-slate-600 text-[10px] font-black py-1.5 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100 shadow transition-all uppercase tracking-widest flex items-center justify-center gap-1"
                      >
                        <Edit2 size={12}/>
                        Edit Answer
                      </button>
                    )}
                  </>
                ) : (
                  <button 
                    disabled
                    style={{ backgroundColor: '#22C55E' }}
                    className="w-full text-white text-[11px] font-black py-2 rounded-xl shadow-lg uppercase tracking-widest border-b-4 border-black/10 cursor-not-allowed"
                  >
                    ✓ COMPLETED!
                  </button>
                )}
              </div>

              {isDone && <CheckCircle className="absolute -top-4 -right-4 text-green-500 fill-white drop-shadow-xl" size={36}/>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MindMapSpeaking;
