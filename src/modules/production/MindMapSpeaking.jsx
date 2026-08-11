import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Mic, Volume2, CheckCircle, Brain, ArrowLeft, Sparkles, Volume1, Edit2, AlertCircle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { analyzeAnswer } from '../../utils/smartCheck';
import { useStationProgress } from '../../hooks/useStationProgress';

const MindMapSpeaking = ({ data, themeColor, isVi, onReportProgress }) => {
  const { weekId } = useParams();
  
  // 🔥 Universal Progress System - MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const { savedData, saveProgress, markComplete } = useStationProgress(parseInt(weekId), 'production_mindmap');
  
  // 🔥 ALL HOOKS MUST BE DECLARED BEFORE ANY CONDITIONAL RETURNS (Rules of Hooks)
  const [view, setView] = useState('structures');
  const [selectedStruct, setSelectedStruct] = useState(null);
  const [branchInputs, setBranchInputs] = useState(savedData.recordings || {});
  const [feedback, setFeedback] = useState(savedData.feedback || {});
  const [isListening, setIsListening] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [completedBranches, setCompletedBranches] = useState(() => {
    return savedData.completedBranches ? new Set(savedData.completedBranches) : new Set();
  });
  // BUG FIX (Jun 7, 2026): re-sync from savedData after async fetchWeekProgress
  const hasRestoredMindMap = useRef(false);
  useEffect(() => {
    if (hasRestoredMindMap.current) return;
    if (!savedData._savedAt) return;
    hasRestoredMindMap.current = true;
    if (savedData.completedBranches?.length) setCompletedBranches(new Set(savedData.completedBranches));
  }, [savedData]);

  // 🔧 FIX: Store recognition instance to allow stopping before retry
  const recognitionRef = useRef(null);
  
  // 🔥 ALL useEffect HOOKS MUST BE BEFORE ANY CONDITIONAL RETURNS
  // Save to Universal Progress System
  useEffect(() => {
    const handler = setTimeout(() => {
      if (data?.centerStems && data?.branchLabels) {
        const totalBranches = data.centerStems.flatMap(s => 
          data.branchLabels[s.id] || []
        ).length;
        
        const percent = totalBranches > 0 ? Math.round((completedBranches.size / totalBranches) * 100) : 0;
        const isComplete = totalBranches > 0 && completedBranches.size === totalBranches;
        
        saveProgress({
          completedBranches: [...completedBranches],
          recordings: branchInputs,
          feedback: feedback
        }, isComplete, percent);
        
        if (isComplete) markComplete(100);
      }
    }, 1500); // Debounce saving

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedBranches, branchInputs, feedback]);

  // Auto-reset to structures view if no structure selected
  useEffect(() => {
    if (!selectedStruct && view !== 'structures') {
      setView('structures');
    }
  }, [selectedStruct, view]);
  
  // ================= DEBUGGING LOG =================
  // console.log("--- MindMapSpeaking Component Received Data ---");
  // console.log(data);
  // ===============================================

  // Normalize branchLabels if centerStems has nested branches
  const effectiveBranchLabels = data?.branchLabels || (data?.centerStems ? Object.fromEntries(
    data.centerStems.map((s, idx) => [
      s.id || `stem_${idx + 1}`,
      (s.branches || []).map((b, bIdx) => typeof b === 'string' ? { id: `b_${idx + 1}_${bIdx + 1}`, label: b } : b)
    ])
  ) : null);

  const effectiveCenterStems = (data?.centerStems || []).map((s, idx) => ({
    id: s.id || `stem_${idx + 1}`,
    label: s.label || s.title || `Stem ${idx + 1}`,
    icon: s.icon || '📌'
  }));

  // 🔥 EARLY RETURN AFTER ALL HOOKS (Rules of Hooks compliance)
  if (!data || !effectiveCenterStems.length || !effectiveBranchLabels) {
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

  // Handle both old format (string) and new format ({text, audio})
  // Fall back to dataHooks-injected audio arrays for string-only weeks (e.g. week 1)
  const structures = data.centerStems.map((stem, i) => {
    const stemText = typeof stem === 'string' ? stem : stem.text;
    const stemAudio = typeof stem === 'string'
      ? (data.centerStemAudio?.[i] || null)   // dataHooks: /audio/week1/mindmap_stem_1.mp3
      : stem.audio;
    return {
      id: `s${i}`,
      text: stemText,
      audioUrl: stemAudio,
      color: ['#6366F1', '#F43F5E', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'][i % 6]
    };
  });

  const sentenceTargets = selectedStruct ? (data.branchLabels[selectedStruct.text] || []) : [];

  const branches = sentenceTargets.map((branch, i) => {
    // Handle both old format (string) and new format ({text, audio})
    const branchText = typeof branch === 'string' ? branch : branch.text;
    // Fall back to dataHooks-injected branch audio map for string-only weeks
    const branchAudio = typeof branch === 'string'
      ? (data.branchLabelsAudio?.[selectedStruct.text]?.[i] || null)  // dataHooks: /audio/week1/mindmap_branch_N.mp3
      : branch.audio;
    
    const angle = (i * 60 - 30) * (Math.PI / 180);
    const radius = 35;
    const fullSentence = selectedStruct.text.replace('___', branchText);
    return {
      id: `b${i}`,
      display: branchText,
      target: fullSentence,
      audioUrl: branchAudio,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
      color: ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#9376E1', '#FF92E0'][i % 6]
    };
  });

  const startSTT = (id) => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return alert("Microphone not supported!");
    
    // 🔧 FIX: Stop previous recognition before starting new one
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log('Could not stop previous recognition:', e);
      }
    }
    
    const rec = new Recognition();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 3; // Try top-3 STT hypotheses before failing
    
    rec.onstart = () => {
      setIsListening(id);
      recognitionRef.current = rec;
    };
    
    rec.onresult = (e) => {
      // Collect all alternatives returned by the browser STT engine
      const alternatives = [];
      for (let i = 0; i < e.results[0].length; i++) {
        alternatives.push(e.results[0][i].transcript);
      }
      const transcript = alternatives[0]; // Top hypothesis shown to student
      setBranchInputs(prev => ({ ...prev, [id]: transcript }));
      setIsListening(null);
      recognitionRef.current = null;
      validateBranch(id, alternatives); // Pass all alternatives
    };
    
    rec.onerror = (event) => {
      console.log('Speech recognition error:', event.error);
      setIsListening(null);
      recognitionRef.current = null;
    };
    
    // 🔧 FIX: Add onend handler to properly reset state
    rec.onend = () => {
      setIsListening(null);
      recognitionRef.current = null;
    };
    
    rec.start();
  };

  const validateBranch = (branchId, userInputOrAlts) => {
    // Accept either a single string (manual/edit check) or array of STT alternatives
    const isSpeechInput = Array.isArray(userInputOrAlts);
    const inputs = isSpeechInput ? userInputOrAlts : [userInputOrAlts];
    if (!inputs.some(i => i && i.trim())) return;
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return;

    const numberWords = {
      '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
      '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten'
    };

    const prepareInput = (raw) => {
      let s = raw.trim();
      // Convert numerals to words (STT returns "7" for spoken "seven")
      Object.keys(numberWords).forEach(num => {
        s = s.replace(new RegExp(`\\b${num}\\b`, 'g'), numberWords[num]);
      });
      // Capitalise first letter
      if (s && !/^[A-Z]/.test(s)) s = s.charAt(0).toUpperCase() + s.slice(1);
      // Add terminal punctuation to match target format
      if (s && !/[.!?]$/.test(s)) s += '.';
      return s;
    };

    // Only accept the FULL sentence (stem + branch).
    // Saying only the branch word is not enough — student must speak the complete sentence.
    const acceptableTargets = [branch.target];

    // Try each STT alternative; stop at first passing result
    let result = null;
    for (const raw of inputs) {
      if (!raw || !raw.trim()) continue;
      const normalizedInput = prepareInput(raw);
      console.log('🔍 Mindmap STT check:', { raw, normalizedInput, targets: acceptableTargets });
      // 'speech' mode: levenshtein ≤25% OR word-overlap ≥75% → isCorrect=true
      const r = analyzeAnswer(normalizedInput, acceptableTargets, 'speech');
      if (r.isCorrect) { result = r; break; }
      if (!result) result = r; // Keep first (worst) result as fallback
    }
    if (!result) return;

    // Use a context-appropriate failure message
    if (!result.isCorrect && !isSpeechInput) {
      result = { ...result, message: 'Chưa đúng. Kiểm tra lại nhé!' };
    }

    console.log('🔍 Mindmap result:', result);
    setFeedback(prev => ({ ...prev, [branchId]: result }));
    
    if (result.isCorrect) {
      speakText(isVi ? "Đúng rồi!" : "Correct!");
      
      // Create unique key combining structure and branch
      const uniqueKey = `${selectedStruct.id}_${branchId}`;
      const newCompleted = new Set(completedBranches);
      newCompleted.add(uniqueKey);
      setCompletedBranches(newCompleted);
      
      // Calculate total progress across ALL structures
      const totalBranches = structures.reduce((sum, s) => {
        const branchCount = (data.branchLabels[s.text] || []).length;
        return sum + branchCount;
      }, 0);
      
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
              // Restore state for this structure when viewing
              const structureSpecificRecordings = {};
              const structureSpecificFeedback = {};
              const branchesForStruct = data.branchLabels[s.text] || [];
              branchesForStruct.forEach((b, i) => {
                const branchId = `b${i}`;
                const uniqueKey = `${s.id}_${branchId}`;
                if (savedData.recordings && savedData.recordings[uniqueKey]) {
                  structureSpecificRecordings[branchId] = savedData.recordings[uniqueKey];
                }
                if (savedData.feedback && savedData.feedback[uniqueKey]) {
                  structureSpecificFeedback[branchId] = savedData.feedback[uniqueKey];
                }
              });
              setBranchInputs(structureSpecificRecordings);
              setFeedback(structureSpecificFeedback);
              setEditMode({});
              speakText(s.text, s.audioUrl, 1.0, null, 'mindmap_speaking', parseInt(weekId), 'advanced', true); // ⚡ instant mode
            }}
              style={{ backgroundColor: s.color }}
              className="group p-5 rounded-[28px] shadow-xl hover:scale-105 active:scale-95 transition-all text-white font-bold text-xs sm:text-sm md:text-base leading-snug border-b-[6px] border-black/10 min-h-[7rem] h-auto flex items-center justify-center text-center overflow-hidden">
              {s.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Early return for mindmap view without selected structure
  if (view === 'mindmap' && !selectedStruct) {
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
          <span className="font-black text-sm sm:text-base md:text-lg leading-tight relative z-10 drop-shadow-md tracking-tight p-2 max-w-[90%] text-center">
            {selectedStruct.text}
          </span>
          
          {/* Audio button for center node */}
          {selectedStruct.audioUrl && (
            <button
              onClick={() => speakText(selectedStruct.text, selectedStruct.audioUrl, 1.0, null, 'mindmap_speaking', parseInt(weekId), 'advanced', true)} // ⚡ instant mode
              className="absolute top-3 right-3 z-20 bg-white text-indigo-600 p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
            >
              <Volume2 size={20} />
            </button>
          )}
          <Sparkles className="absolute top-4 right-4 text-white/30 animate-bounce" size={32}/>
        </div>
      </div>

      {branches.map(b => {
        const uniqueKey = `${selectedStruct.id}_${b.id}`;
        const isDone = completedBranches.has(uniqueKey) || feedback[b.id]?.isCorrect;
        const hasError = feedback[b.id] && !feedback[b.id]?.isCorrect;
        const isEditing = editMode[b.id];
        const hasInput = branchInputs[b.id];
        
        return (
          <div key={b.id} style={{ position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%, -50%)' }} className="z-30">
            <div style={{ borderColor: isDone ? '#22C55E' : hasError ? '#EF4444' : b.color }} 
                 className={`bg-white border-[6px] p-4 rounded-[35px] shadow-2xl w-56 flex flex-col items-center gap-3 transition-all ${isDone ? 'bg-green-50' : 'hover:scale-105'}`}>
              
              <div className="flex items-center gap-2 font-black text-slate-800 uppercase text-xs italic">
                <div style={{ backgroundColor: b.color }} className="p-1.5 rounded-lg text-white shadow-sm cursor-pointer hover:scale-110 transition-transform" onClick={() => speakText(b.target, b.audioUrl, 1.0, null, 'mindmap_speaking', parseInt(weekId), 'advanced', true)}>
                  <Volume1 size={14}/>
                </div>
                <span className="text-center">{b.display}</span>
              </div>
              {/* Hint: show the full sentence student should say/type */}
              {!isDone && (
                <p className="text-[9px] text-slate-400 text-center leading-tight italic px-1">
                  💬 &ldquo;{b.target}&rdquo;
                </p>
              )}
              
              {(isEditing || (hasError && !hasInput)) && (
                <div className="relative w-full">
                  <input 
                    className={`w-full bg-slate-50 border-2 rounded-2xl p-3 text-[11px] font-black outline-none text-center shadow-inner transition-all ${hasError ? 'border-red-300 focus:border-red-400' : 'border-transparent focus:border-indigo-100'}`}
                    value={branchInputs[b.id] || ""} 
                    placeholder="Type your answer here..."
                    onChange={e => setBranchInputs({...branchInputs, [b.id]: e.target.value})}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleManualCheck(b); } }}
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

              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => startSTT(b.id)} disabled={isListening || isDone} className={`p-2 rounded-full transition-all ${isListening === b.id ? 'bg-red-500 text-white animate-pulse' : isDone ? 'bg-slate-200 text-slate-400' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
                  <Mic size={16}/>
                </button>
                <button onClick={() => setEditMode({...editMode, [b.id]: !isEditing})} disabled={isDone} className={`p-2 rounded-full transition-all ${isEditing ? 'bg-slate-300' : 'bg-slate-100'} text-slate-600 hover:bg-slate-200 disabled:bg-slate-100 disabled:text-slate-300`}>
                  <Edit2 size={16}/>
                </button>
                {/* Manual Check Button - visible when editing/has input and not completed */}
                {(hasInput || isEditing) && !isDone && (
                  <button 
                    onClick={() => handleManualCheck(b)} 
                    className="p-2 rounded-full transition-all bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl active:scale-95"
                    title={isVi ? "Kiểm tra (Enter)" : "Check Answer (Enter)"}
                  >
                    <CheckCircle size={16}/>
                  </button>
                )}
                {isDone && <CheckCircle size={20} className="text-green-500 animate-bounce"/>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MindMapSpeaking;
