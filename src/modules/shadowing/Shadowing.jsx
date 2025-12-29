import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, Eye, EyeOff, Volume2, Globe, StopCircle, RefreshCw } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';

const Shadowing = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  if (!data || !data.script) return <div>Loading Script...</div>;

  const [hideText, setHideText] = useState(false);
  const [activeSentence, setActiveSentence] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const handlePlayOne = (text, url, id) => {
    setIsPlayingAll(false);
    setActiveSentence(id);
    speakText(text.replace(/\*\*/g, ''), url, 0.8, () => setActiveSentence(null));
  };

  const playSequence = (index) => {
    if (index >= data.script.length) {
      setIsPlayingAll(false);
      setActiveSentence(null);
      return;
    }
    const s = data.script[index];
    setActiveSentence(s.id);
    speakText(s.text.replace(/\*\*/g, ''), s.audio_url, 0.8, () => {
      playSequence(index + 1); 
    });
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      speakText(""); 
      setActiveSentence(null);
    } else {
      setIsPlayingAll(true);
      setTimeout(() => playSequence(0), 0);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = [];
        mediaRecorderRef.current.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          
          // REPORT PROGRESS 100% WHEN RECORDING IS DONE
          if (onReportProgress) onReportProgress(100);
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) { alert("Microphone access denied!"); }
    }
  };

  useEffect(() => { return () => { speakText(""); setIsPlayingAll(false); }; }, []);

  const renderStyledText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => 
      part.startsWith('**') ? 
      <span key={i} className={`font-black text-${themeColor}-600 text-lg`}>{part.replace(/\*\*/g, '')}</span> : 
      <span key={i} className="text-lg">{part}</span>
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
        </div>
      </div>

      <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 transition-all ${hideText ? 'blur-md select-none' : ''}`}>
        <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">Full Text</h3>
        <p className="text-xl text-slate-700 leading-loose text-justify font-medium">
            {data.script.map((s, i) => <span key={i}>{renderStyledText(s.text)} </span>)}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 ml-1 tracking-wider">Practice Sentences</h3>
        {data.script.map((s) => (
          <div key={s.id} className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 ${activeSentence === s.id ? `border-${themeColor}-400 bg-${themeColor}-50 shadow-md transform scale-[1.01]` : 'border-slate-100 bg-white hover:border-slate-200'}`} onClick={() => handlePlayOne(s.text, s.audio_url, s.id)}>
            <div className={`p-2 rounded-full ${activeSentence === s.id ? `bg-${themeColor}-500 text-white` : 'bg-slate-100 text-slate-400'}`}><Volume2 className="w-4 h-4" /></div>
            <div className="flex-1">
               <p className={`text-lg font-bold text-slate-800 ${hideText ? 'opacity-20 blur-[2px]' : ''}`}>{renderStyledText(s.text)}</p>
               {isVi && <p className="text-sm text-slate-500 italic mt-1">{s.vi}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center lg:pl-72 pointer-events-none z-30">
        <div className="bg-white p-2 pl-4 rounded-full shadow-2xl border border-slate-200 flex items-center gap-4 pointer-events-auto max-w-sm w-full justify-between">
           <div className="text-xs font-bold text-slate-500">
             {isRecording ? <span className="text-rose-500 animate-pulse">● Recording...</span> : (audioUrl ? "Recorded!" : (isVi ? "Ghi âm giọng bạn" : "Record your voice"))}
           </div>
           <div className="flex gap-2">
               {audioUrl && !isRecording && (<button onClick={() => { const a = new Audio(audioUrl); a.play(); }} className="p-3 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200"><Play className="w-5 h-5" /></button>)}
               <button onClick={toggleRecording} className={`p-4 rounded-full shadow-lg transition-transform active:scale-95 ${isRecording ? 'bg-rose-500 animate-pulse ring-4 ring-rose-200' : `bg-${themeColor}-600 hover:bg-${themeColor}-700`}`}>{isRecording ? <StopCircle className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}</button>
           </div>
        </div>
      </div>
    </div>
  );
};
export default Shadowing;
