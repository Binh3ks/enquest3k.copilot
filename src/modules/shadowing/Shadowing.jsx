import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Mic, Play, Eye, EyeOff, Volume2, Globe, StopCircle, RefreshCw, Pause } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { useStationProgress } from '../../hooks/useStationProgress';
import { useTTSPrefetch } from '../../hooks/useTTSPrefetch';

const Shadowing = ({ data, themeColor, isVi, onToggleLang, onReportProgress, weekNumber, mode = 'advanced' }) => {
  const { weekId } = useParams();
  const currentWeek = weekNumber || parseInt(weekId);
  
  // 🔥 Universal Progress System
  const { savedData, saveProgress, markComplete } = useStationProgress(parseInt(weekId), 'skill_shadowing');
  
  // 🚀 TTS Prefetch
  const { prefetchFromArray } = useTTSPrefetch('shadowing');
  
  // Get script BEFORE any useState (to avoid hooks order issues)
  const script = data?.script || data?.sentences || [];
  
  // 🐛 DEBUG: Log data structure
  useEffect(() => {
    console.log('[Shadowing] 🐛 DEBUG - data:', {
      hasData: !!data,
      hasScript: !!data?.script,
      hasSentences: !!data?.sentences,
      scriptLength: script.length,
      dataKeys: data ? Object.keys(data) : []
    });
  }, [data, script.length]);
  
  const [hideText, setHideText] = useState(false);
  const [activeSentence, setActiveSentence] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  
  // Recording states
  const [isRecording, setIsRecording] = useState(false); // For single sentence recording
  const [isRecordingAll, setIsRecordingAll] = useState(false); // For full script recording
  const [recordedSegments, setRecordedSegments] = useState(() => savedData.segments || {});
  const [currentRecordingId, setCurrentRecordingId] = useState(null);
  
  // 🎯 NEW: Playback states
  const [playingRecording, setPlayingRecording] = useState(null); // Track which recording is playing
  const [playingFullRecording, setPlayingFullRecording] = useState(false); // Track if full recording is playing
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(null); // For playing audio
  const playbackRefs = useRef({}); // Store audio elements for each recording
  const hasPrefetched = useRef(false); // 🔥 Prevent infinite prefetch loop

  // Debounced save progress
  useEffect(() => {
    const handler = setTimeout(() => {
      const recordedCount = Object.keys(recordedSegments).length;
      if (script.length > 0) {
        const percent = Math.round((recordedCount / script.length) * 100);
        const isComplete = recordedCount === script.length;
        saveProgress({ segments: recordedSegments }, isComplete, percent);
        if (isComplete) {
          markComplete(100);
        }
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [recordedSegments, script.length, saveProgress, markComplete]);

  // 🚀 Prefetch shadowing sentences (ONCE per data load)
  useEffect(() => {
    // Reset flag when script length changes (different week/mode)
    hasPrefetched.current = false;
  }, [script.length]);
  
  useEffect(() => {
    if (hasPrefetched.current) return; // Already prefetched
    
    if (script && script.length > 0) {
      hasPrefetched.current = true;
      console.log(`[Shadowing] 🚀 Starting prefetch for ${script.length} sentences...`);
      prefetchFromArray(script, 'text_en').catch(err => {
        console.warn('[Shadowing] ❌ Prefetch failed:', err);
      });
    }
  }, [script.length, prefetchFromArray]);

  // Cleanup on unmount
  useEffect(() => { 
    return () => { 
      speakText(""); 
      setIsPlayingAll(false); 
      
      // Stop full recording playback
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Stop all individual recording playbacks
      Object.values(playbackRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      playbackRefs.current = {};
      
      // Stop any recording when component unmounts
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }; 
  }, []);

  // Early return AFTER all hooks
  if (!data || !script.length) return <div>Loading Script...</div>;

  const handlePlayOne = (textObj, url, id) => {
    // Always play the ORIGINAL TTS, not the recording
    setIsPlayingAll(false);
    setActiveSentence(id);
    const text = typeof textObj === 'string' ? textObj : (textObj?.text_en || textObj?.text || '');
    speakText(text.replace(/\*\*/g, ''), url, 0.8, () => setActiveSentence(null), 'shadowing', currentWeek, mode);
  };

  const playSequence = (index) => {
    if (index >= script.length) {
      setIsPlayingAll(false);
      setActiveSentence(null);
      return;
    }
    const s = script[index];
    setActiveSentence(s.id);
    const text = s.text_en || s.text || '';
    speakText(text.replace(/\*\*/g, ''), s.audio_url, 0.8, () => {
      playSequence(index + 1); 
    }, 'shadowing', currentWeek, mode);
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      speakText(""); 
      setActiveSentence(null);
      if (audioRef.current) audioRef.current.pause();
    } else {
      setIsPlayingAll(true);
      setTimeout(() => playSequence(0), 0);
    }
  };

  const startSingleRecording = async (sentenceId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedSegments(prev => ({ ...prev, [sentenceId]: url }));
        // Clean up stream
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setCurrentRecordingId(sentenceId);
    } catch (err) {
      alert("Microphone access denied!");
    }
  };

  const stopSingleRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setCurrentRecordingId(null);
  };

  const toggleRecording = (sentenceId) => {
    if (isRecording) {
      stopSingleRecording();
    } else {
      startSingleRecording(sentenceId);
    }
  };

  // 🎯 NEW: Play recorded audio
  const playRecording = (sentenceId) => {
    const recordingUrl = recordedSegments[sentenceId];
    if (!recordingUrl) return;

    // Stop any currently playing recording
    if (playingRecording && playbackRefs.current[playingRecording]) {
      playbackRefs.current[playingRecording].pause();
      playbackRefs.current[playingRecording].currentTime = 0;
    }

    // Always create new audio element to ensure fresh playback
    if (playbackRefs.current[sentenceId]) {
      playbackRefs.current[sentenceId].pause();
      playbackRefs.current[sentenceId] = null;
    }
    
    const audio = new Audio(recordingUrl);
    audio.onended = () => setPlayingRecording(null);
    playbackRefs.current[sentenceId] = audio;

    setPlayingRecording(sentenceId);
    audio.play().catch(err => {
      console.error("Failed to play recording:", err);
      setPlayingRecording(null);
    });
  };

  const stopPlayback = (sentenceId) => {
    if (playbackRefs.current[sentenceId]) {
      playbackRefs.current[sentenceId].pause();
      playbackRefs.current[sentenceId].currentTime = 0;
    }
    setPlayingRecording(null);
  };

  // 🎯 Handle separate record button
  const handleRecordButtonClick = (sentenceId) => {
    const isThisRecording = isRecording && currentRecordingId === sentenceId;
    
    if (isThisRecording) {
      // Currently recording → Stop
      stopSingleRecording();
    } else {
      // Not recording → Start (will delete old recording if exists)
      startSingleRecording(sentenceId);
    }
  };

  // 🎯 Handle separate play button
  const handlePlayButtonClick = (sentenceId) => {
    const isThisPlaying = playingRecording === sentenceId;
    
    if (isThisPlaying) {
      // Currently playing → Stop
      stopPlayback(sentenceId);
    } else {
      // Not playing → Play
      playRecording(sentenceId);
    }
  };

  const handleRecordAll = async () => {
    if (isRecordingAll) {
      // Stop recording all
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      setIsRecordingAll(false);
      return;
    }

    // Start recording all
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedSegments(prev => ({ ...prev, full_script: url }));
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecordingAll(true);
    } catch (err) {
      alert("Microphone access denied!");
      setIsRecordingAll(false);
    }
  };

  const playFullRecording = () => {
    const recordingUrl = recordedSegments.full_script;
    if (!recordingUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(recordingUrl);
      audioRef.current.onended = () => setPlayingFullRecording(false);
    } else {
      audioRef.current.src = recordingUrl;
    }

    setPlayingFullRecording(true);
    audioRef.current.play();
  };

  const stopFullPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingFullRecording(false);
  };

  const renderStyledText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => 
      part.startsWith('**') ? 
      <span key={i} className={`font-black text-${themeColor}-600 text-xl`}>{part.replace(/\*\*/g, '')}</span> : 
      <span key={i} className="text-xl">{part}</span>
    );
  };

  return (
    <div className="space-y-6 pb-24">
      <div className={`bg-${themeColor}-100 p-4 rounded-xl border border-${themeColor}-200 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-20 shadow-sm`}>
        <div>
          <h2 className={`text-xl font-black text-${themeColor}-800 uppercase flex items-center`}>
            Shadowing
            <button onClick={onToggleLang} className="ml-3 p-1 bg-white/50 rounded-md hover:bg-white text-xs font-bold text-slate-500 flex items-center border border-transparent hover:border-slate-300 transition-all">
                <Globe className="w-3 h-3 mr-1" /> {isVi ? 'VI' : 'EN'}
            </button>
          </h2>
          <p className="text-sm text-slate-600 font-bold">{isVi ? "Nghe và Nhắc lại (Tốc độ 0.8x)" : "Listen & Repeat (0.8x Speed)"}</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => setHideText(!hideText)} className="px-3 py-2 bg-white rounded-lg shadow-sm text-slate-600 hover:text-indigo-600 font-bold text-xs flex items-center border border-slate-200">
             {hideText ? <Eye className="w-4 h-4 mr-1"/> : <EyeOff className="w-4 h-4 mr-1"/>} {hideText ? (isVi ? "Hiện Chữ" : "Show Text") : (isVi ? "Ẩn Chữ" : "Hide Text")}
           </button>
           <button onClick={handlePlayAll} className={`px-4 py-2 rounded-lg shadow-md text-white font-bold text-xs flex items-center transition-all ${isPlayingAll ? 'bg-rose-500 hover:bg-rose-600' : `bg-${themeColor}-500 hover:bg-${themeColor}-600`}`}>
             {isPlayingAll ? <StopCircle className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />} {isPlayingAll ? (isVi ? "Dừng" : "Stop") : (isVi ? "Nghe Hết" : "Play All")}
           </button>
           
           {/* Record All button */}
           <button 
             onClick={handleRecordAll}
             className={`px-4 py-2 rounded-lg shadow-md text-white font-bold text-xs flex items-center transition-all relative group ${
               isRecordingAll ? 'bg-rose-500 animate-pulse' : 
               recordedSegments.full_script ? 'bg-orange-500 hover:bg-orange-600' :
               'bg-indigo-600 hover:bg-indigo-700'
             }`}
             disabled={isRecording}
           >
             {isRecordingAll ? (
               <>
                 <StopCircle className="w-4 h-4 mr-1" />
                 {isVi ? "Dừng Ghi" : "Stop"}
               </>
             ) : recordedSegments.full_script ? (
               <>
                 <RefreshCw className="w-4 h-4 mr-1" />
                 {isVi ? "Ghi Lại" : "Re-record"}
               </>
             ) : (
               <>
                 <Mic className="w-4 h-4 mr-1" />
                 {isVi ? "Ghi Âm Hết" : "Record All"}
               </>
             )}
             <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               {isRecordingAll ? (isVi ? "Dừng ghi âm" : "Stop recording") :
                recordedSegments.full_script ? (isVi ? "Ghi lại toàn bộ" : "Re-record all") :
                (isVi ? "Ghi âm toàn bộ script" : "Record full script")}
             </span>
           </button>

           {/* Play Back button (only show if has full recording) */}
           {recordedSegments.full_script && (
             <button 
               onClick={playingFullRecording ? stopFullPlayback : playFullRecording}
               className={`px-4 py-2 rounded-lg shadow-md text-white font-bold text-xs flex items-center transition-all relative group ${
                 playingFullRecording ? 'bg-purple-500 hover:bg-purple-600' : 'bg-green-600 hover:bg-green-700'
               }`}
               disabled={isRecording || isRecordingAll}
             >
               {playingFullRecording ? (
                 <>
                   <Pause className="w-4 h-4 mr-1" />
                   {isVi ? "Dừng Nghe" : "Stop"}
                 </>
               ) : (
                 <>
                   <Play className="w-4 h-4 mr-1" />
                   {isVi ? "Nghe Lại" : "Play Back"}
                 </>
               )}
               <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 {playingFullRecording ? (isVi ? "Dừng nghe bản ghi" : "Stop playback") : (isVi ? "Nghe lại bản ghi" : "Play your recording")}
               </span>
             </button>
           )}
        </div>
      </div>

      <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 transition-all ${hideText ? 'blur-md select-none' : ''}`}>
        <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">Full Text</h3>
        <p className="text-2xl text-slate-700 leading-loose text-justify font-medium">
            {script.map((s, i) => <span key={i}>{renderStyledText(s.text_en || s.text)} </span>)}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 ml-1 tracking-wider">Practice Sentences</h3>
        {script.map((s) => {
          const hasRecording = !!recordedSegments[s.id];
          const isThisRecording = isRecording && currentRecordingId === s.id;
          const isThisPlaying = playingRecording === s.id;

          return (
            <div 
              key={s.id} 
              className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                activeSentence === s.id ? `border-${themeColor}-400 bg-${themeColor}-50 shadow-md` : 
                hasRecording ? `border-green-200 bg-green-50` : 
                'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              {/* Original audio play button */}
              <button 
                onClick={() => handlePlayOne(s, s.audio_url, s.id)}
                className={`p-2 rounded-full transition-colors shrink-0 ${
                  activeSentence === s.id ? `bg-${themeColor}-500 text-white` : 
                  'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
                title={isVi ? "Nghe bản gốc" : "Play original"}
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {/* Text content */}
              <div className="flex-1 cursor-pointer" onClick={() => handlePlayOne(s, s.audio_url, s.id)}>
                 <p className={`text-xl font-bold text-slate-800 ${hideText ? 'opacity-20 blur-[2px]' : ''}`}>{renderStyledText(s.text_en || s.text)}</p>
                 {isVi && <p className="text-sm text-slate-500 italic mt-1">{s.text_vi || s.vi}</p>}
              </div>

              {/* Recording controls */}
              <div className="flex gap-2 shrink-0">
                {/* Record button */}
                <button 
                  onClick={() => handleRecordButtonClick(s.id)}
                  className={`p-3 rounded-full shadow-md transition-all active:scale-95 relative group ${
                    isThisRecording 
                      ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-200' 
                      : hasRecording 
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : `bg-${themeColor}-600 text-white hover:bg-${themeColor}-700`
                  }`}
                  disabled={isRecordingAll || (isRecording && !isThisRecording)}
                  title={isThisRecording ? (isVi ? "Dừng ghi" : "Stop") : hasRecording ? (isVi ? "Ghi lại" : "Re-record") : (isVi ? "Ghi âm" : "Record")}
                >
                  {isThisRecording ? (
                    <StopCircle className="w-5 h-5" />
                  ) : hasRecording ? (
                    <RefreshCw className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                  <span className="absolute bottom-full mb-2 right-0 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {isThisRecording ? (isVi ? "Dừng ghi" : "Stop") : hasRecording ? (isVi ? "Ghi lại" : "Re-record") : (isVi ? "Ghi âm" : "Record")}
                  </span>
                </button>

                {/* Play recording button (only show if has recording) */}
                {hasRecording && (
                  <button 
                    onClick={() => handlePlayButtonClick(s.id)}
                    className={`p-3 rounded-full shadow-md transition-all active:scale-95 relative group ${
                      isThisPlaying 
                        ? 'bg-purple-500 text-white ring-4 ring-purple-200' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                    disabled={isRecordingAll || isRecording || (playingRecording && !isThisPlaying)}
                    title={isThisPlaying ? (isVi ? "Dừng nghe" : "Stop") : (isVi ? "Nghe lại" : "Play")}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                    <span className="absolute bottom-full mb-2 right-0 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {isThisPlaying ? (isVi ? "Dừng nghe" : "Stop playing") : (isVi ? "Nghe lại" : "Play recording")}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Global record button removed */}
    </div>
  );
};
export default Shadowing;
