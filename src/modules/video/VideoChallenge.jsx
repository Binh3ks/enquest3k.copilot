import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, Type, Download, Play, Pause, RotateCcw, CheckCircle, AlertCircle, Globe, Loader2, ArrowRight, Eye, EyeOff, Edit3 } from 'lucide-react';
import Confetti from 'react-confetti';

const VideoChallenge = ({ data, themeColor, isVi, onToggleLang, onReportProgress }) => {
  const content = (data?.writing || data?.video) ? (data.writing || data.video) : data;

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('write'); 
  const [script, setScript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null); 
  const [countdown, setCountdown] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isScriptVisible, setIsScriptVisible] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null); 
  const mimeTypeRef = useRef(MediaRecorder.isTypeSupported("video/mp4") ? "video/mp4" : "video/webm"); 
  const timerRef = useRef(null);

  // Cleanup & Reset
  useEffect(() => {
    setScript(""); 
    setVideoBlob(null);
    setVideoUrl(null);
    setIsRecording(false);
    setCountdown(0);
    setShowConfetti(false);
    setActiveTab('write');
    setIsPlaying(false);
    stopCamera(); 
    clearInterval(timerRef.current);
  }, [content?.title]);

  useEffect(() => {
    return () => {
        stopCamera();
        clearInterval(timerRef.current);
        if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, []);

  // --- HANDLE VIDEO URL & PLAYBACK ---
  useEffect(() => {
    if (videoBlob) {
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
        setIsPlaying(false); 
        return () => URL.revokeObjectURL(url);
    } else {
        setVideoUrl(null);
    }
  }, [videoBlob]);

  // --- CAMERA LOGIC ---
  useEffect(() => {
    if (activeTab === 'record' && !videoBlob) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [activeTab, videoBlob]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraReady(false);
  };

  const startCamera = async () => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(e => console.error("Play error:", e));
            setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error("Camera Error:", err);
    }
  };

  // --- PLAYBACK CONTROL ---
  const togglePlayback = () => {
    if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            // Đảm bảo play từ đầu nếu đã kết thúc
            if (videoRef.current.ended) {
              videoRef.current.currentTime = 0;
            }
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  if (!content || !content.title) return <div className="p-10 text-center text-slate-400">No content.</div>;

  // --- RECORDING LOGIC (FIXED) ---
  const handleStartSequence = () => {
    if (isRecording || countdown > 0 || !isCameraReady) return;
    
    // Đặt lại MIME type ngay trước khi ghi
    const types = [
        "video/mp4", 
        "video/webm;codecs=vp8,opus", 
        "video/webm"
    ];
    let selectedType = "video/webm";
    for (let t of types) {
        if (MediaRecorder.isTypeSupported(t)) {
            selectedType = t;
            break;
        }
    }
    mimeTypeRef.current = selectedType;

    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          startRecordingActual();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecordingActual = () => {
    if (!streamRef.current || !streamRef.current.active) {
        startCamera().then(() => { if(streamRef.current) startRecordingActual(); });
        return;
    }

    try {
      // Dùng mimeType đã được xác định.
      mediaRecorderRef.current = new MediaRecorder(streamRef.current, { mimeType: mimeTypeRef.current });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        // FIX: Tạo blob trước khi clear interval
        const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current });
        
        // FIX QUAN TRỌNG: Clear chunksRef SAU KHI tạo blob để tránh lỗi lặp
        chunksRef.current = []; 

        if (blob.size > 0) {
            setVideoBlob(blob);
            if (onReportProgress) onReportProgress(100);
            setShowConfetti(true);
        } else {
            alert("Lỗi: Không có dữ liệu video.");
        }
        setIsRecording(false);
        clearInterval(timerRef.current);
      };

      // start() không có timeslice để ghi liền mạch (Continuous Recording)
      mediaRecorderRef.current.start(); 
      
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (e) { 
        console.error("Recorder Start Error:", e); 
        setIsRecording(false); 
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDownload = () => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.href = url;
      // Luôn đặt tên file là MP4
      a.download = `my_video_${new Date().getTime()}.mp4`; 
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const wordCount = script.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* 1. HEADER */}
      <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center flex-shrink-0 z-50 relative">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${themeColor}-100 rounded-xl text-${themeColor}-600`}>
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-base font-black text-${themeColor}-800 uppercase`}>
              {isVi ? "Thử Thách Quay Video" : "Video Challenge"}
            </h2>
            <p className="text-slate-500 font-bold text-[10px] truncate max-w-[200px]">{content.title}</p>
          </div>
        </div>
        
        <div className="flex bg-slate-200 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('write')}
            disabled={isRecording}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all ${activeTab === 'write' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 className="w-3 h-3 mr-1"/> {isVi ? "Viết" : "Write"}
          </button>
          <button 
            onClick={() => setActiveTab('record')}
            disabled={wordCount < 1 && !videoBlob} 
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center transition-all ${activeTab === 'record' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 disabled:opacity-50'}`}
          >
            <Video className="w-3 h-3 mr-1"/> {isVi ? "Quay" : "Record"}
          </button>
        </div>

        <button onClick={onToggleLang} className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold border border-slate-200 shadow-sm">
          {isVi?'VI':'EN'}
        </button>
      </div>

      {/* --- TAB WRITE --- */}
      {activeTab === 'write' && (
        <div className="flex-1 flex flex-col p-4 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex-shrink-0 mb-3">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-sm text-blue-800">
              <p className="font-bold uppercase text-[10px] text-blue-400 mb-1">{isVi ? "Gợi ý:" : "Prompt:"}</p>
              {isVi ? content.prompt_vi : content.prompt_en}
            </div>
            {content.model_sentence && (
              <details className="mt-2 group bg-green-50 p-2 rounded-xl border border-green-100 text-sm text-green-800 cursor-pointer">
                <summary className="font-bold list-none flex items-center select-none text-xs">
                  <CheckCircle className="w-3 h-3 mr-1"/> {isVi ? "Xem Bài Mẫu" : "View Model Answer"}
                </summary>
                <div className="mt-2 pt-2 border-t border-green-200 italic leading-relaxed text-sm">"{content.model_sentence}"</div>
              </details>
            )}
          </div>
          <div className="flex-1 relative group">
            <textarea 
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full h-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-400 outline-none resize-none text-2xl leading-relaxed text-slate-700 placeholder:text-slate-300"
              placeholder={isVi ? "Viết kịch bản của bạn..." : "Write your script here..."}
            />
            <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400 bg-white/80 px-2 py-1 rounded-lg border border-slate-100">
              {wordCount} words
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button 
              onClick={() => setActiveTab('record')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all flex items-center text-sm"
            >
              {isVi ? "Chuyển sang Quay Phim" : "Go to Recording"} <ArrowRight className="ml-2 w-4 h-4"/>
            </button>
          </div>
        </div>
      )}

      {/* --- TAB RECORD --- */}
      {activeTab === 'record' && (
        <div className="flex-1 relative w-full h-full bg-black overflow-hidden group">
          
          {/* A. CAMERA LAYER */}
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
             {videoUrl ? (
                // PLAYBACK: Luôn dùng videoUrl và ref
                <video 
                    ref={videoRef}
                    key={videoUrl} 
                    src={videoUrl} 
                    className="w-full h-full object-contain bg-black" 
                    onEnded={handleVideoEnded}
                    playsInline
                />
             ) : (
                <video ref={videoRef} className="w-full h-full object-cover transform scale-x-[-1]" muted playsInline />
             )}
             
             {/* Loading State */}
             {!isCameraReady && !videoBlob && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-white">
                    <Loader2 className="w-8 h-8 animate-spin mb-2"/>
                    <p className="text-xs font-bold uppercase">Camera Starting...</p>
                </div>
             )}

             {/* Countdown */}
             {countdown > 0 && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <span className="text-9xl font-black text-white animate-ping">{countdown}</span>
                </div>
             )}
          </div>

          {/* B. PROMPTER LAYER */}
          {!videoBlob && isScriptVisible && (
            <div className="absolute top-0 left-0 right-0 z-20 h-1/4 bg-gradient-to-b from-black/90 to-transparent p-4 overflow-y-auto custom-scrollbar transition-all duration-300">
                <p className="text-yellow-400 text-3xl font-bold text-center drop-shadow-md leading-relaxed">
                    {script || "..."}
                </p>
            </div>
          )}

          {/* C. CONTROLS LAYER (Ghim đáy) */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/90 to-transparent pt-10 pb-4 px-6 flex items-end justify-between">
            
            {/* Left */}
            <div className="w-1/3 flex justify-start">
              {!videoBlob && (
                <button 
                  onClick={() => setIsScriptVisible(!isScriptVisible)}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold transition-all border border-white/10"
                >
                  {isScriptVisible ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  <span className="hidden sm:inline">{isVi ? "Kịch bản" : "Script"}</span>
                </button>
              )}
            </div>

            {/* Center: Record / Play Buttons */}
            <div className="w-1/3 flex flex-col items-center justify-end">
               
               {/* TIMER - NGAY TRÊN NÚT QUAY */}
               {isRecording && (
                  <div className="mb-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs flex items-center shadow-lg animate-pulse border border-white/20">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      {formatTime(recordingTime)}
                  </div>
               )}

               {/* 1. Ready */}
               {!isRecording && !videoBlob && (
                 <button 
                    onClick={handleStartSequence}
                    disabled={!isCameraReady}
                    className={`h-16 w-16 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all ${!isCameraReady ? 'bg-gray-500 opacity-50' : 'bg-rose-600 hover:scale-110 hover:bg-rose-500'}`}
                 >
                    <div className="w-6 h-6 bg-white rounded-full"></div> 
                 </button>
               )}
               
               {/* 2. Recording */}
               {isRecording && (
                 <button onClick={handleStopRecording} className="h-16 w-16 bg-white rounded-full flex items-center justify-center border-4 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]">
                    <div className="w-6 h-6 bg-rose-600 rounded-sm"></div>
                 </button>
               )}

               {/* 3. Playback Controls */}
               {videoBlob && (
                 <button 
                    onClick={togglePlayback}
                    className="h-16 w-16 bg-indigo-600 hover:bg-indigo-500 rounded-full border-4 border-white/20 shadow-lg flex items-center justify-center transform hover:scale-105 transition-all"
                 >
                    {isPlaying ? <Pause className="w-8 h-8 text-white fill-current"/> : <Play className="w-8 h-8 text-white fill-current ml-1"/>}
                 </button>
               )}
            </div>

            {/* Right: Actions */}
            <div className="w-1/3 flex justify-end gap-2">
               {!videoBlob && !isRecording && (
                 <button onClick={() => setActiveTab('write')} className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold transition-all border border-white/10">
                    <Edit3 className="w-4 h-4"/>
                    <span className="hidden sm:inline">{isVi?"Sửa":"Edit"}</span>
                 </button>
               )}

               {videoBlob && (
                 <>
                    <button onClick={() => { setVideoBlob(null); setCountdown(0); }} className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 border border-white/10">
                        <RotateCcw className="w-5 h-5"/>
                    </button>
                    <button onClick={handleDownload} className="p-3 bg-green-600 rounded-full text-white hover:bg-green-500 shadow-lg">
                        <Download className="w-5 h-5"/>
                    </button>
                 </>
               )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChallenge;
