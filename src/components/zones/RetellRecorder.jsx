import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, Square, RefreshCw, Volume2, CheckCircle2, Sparkles, Download, Camera, VideoOff, Trophy, Play } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { evaluateSpeechSyntax } from '../../utils/speechSyntaxEvaluator';
import MicFallbackInput from '../common/MicFallbackInput';

const NARRATIVE_STYLES = {
  setting:  { label: 'Scene 1: Setting', dot: '🔵', bg: 'bg-blue-50/80',    border: 'border-blue-200',    text: 'text-blue-950', badge: 'bg-blue-200 text-blue-900' },
  action:   { label: 'Scene 2: Action',  dot: '🟢', bg: 'bg-emerald-50/80', border: 'border-emerald-200', text: 'text-emerald-950', badge: 'bg-emerald-200 text-emerald-900' },
  problem:  { label: 'Scene 3: Problem', dot: '🟠', bg: 'bg-amber-50/80',   border: 'border-amber-200',   text: 'text-amber-950', badge: 'bg-amber-200 text-amber-900' },
  solution: { label: 'Scene 4: Ending',  dot: '🟣', bg: 'bg-purple-50/80',  border: 'border-purple-200',  text: 'text-purple-950', badge: 'bg-purple-200 text-purple-900' }
};
const FUNC_ORDER = ['setting', 'action', 'problem', 'solution'];

export default function RetellRecorder({ scenes = [], onComplete }) {
  const [recordMode, setRecordMode] = useState('video'); // 'video' | 'audio'
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedMediaUrl, setRecordedMediaUrl] = useState(null);
  const [recordedMediaType, setRecordedMediaType] = useState('video'); // 'video' | 'audio'
  const [feedback, setFeedback] = useState(null);
  const [evalResult, setEvalResult] = useState(null);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const previewVideoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');
  const timerIntervalRef = useRef(null);

  const DEFAULT_SCENES = [
    {
      id: 1,
      narrative_function: 'setting',
      en: "Look at the first scene and describe where and when the story began."
    },
    {
      id: 2,
      narrative_function: 'action',
      en: "Describe what the characters were doing and what happened next."
    },
    {
      id: 3,
      narrative_function: 'problem',
      en: "Explain what unexpected problem or challenge occurred in the story."
    },
    {
      id: 4,
      narrative_function: 'solution',
      en: "Tell how the situation was resolved and how the story ended."
    }
  ];

  const activeScenes = (scenes && scenes.length > 0) ? scenes : DEFAULT_SCENES;
  const fullScriptText = activeScenes.map(s => s.en || s.text || '').filter(Boolean).join(' ');

  // Initialize camera preview on mount if in video mode
  useEffect(() => {
    let isMounted = true;
    if (recordMode === 'video' && !recordedMediaUrl) {
      startCameraPreview(isMounted);
    } else {
      stopCameraPreview();
    }
    return () => {
      isMounted = false;
      stopCameraPreview();
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [recordMode, recordedMediaUrl]);

  const startCameraPreview = async (isMounted = true) => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: true
      });
      if (!isMounted) {
        stream.getTracks().forEach(t => t.stop());
        return;
      }
      streamRef.current = stream;
      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.warn('Camera preview failed, fallback to audio mode:', err);
      setCameraError('Camera not available or access denied. Switched to audio mode.');
      setRecordMode('audio');
      setCameraActive(false);
    }
  };

  const stopCameraPreview = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Start recording with 3-second countdown
  const initiateRecording = () => {
    setCountdown(3);
    const countTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countTimer);
          startActualRecording();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startActualRecording = async () => {
    setFeedback(null);
    setEvalResult(null);
    setRecordedMediaUrl(null);
    setRecordingSeconds(0);
    transcriptRef.current = '';

    // Start Speech Recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      try {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SpeechRec();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';
        rec.onresult = (event) => {
          const text = Array.from(event.results).map(r => r[0].transcript).join(' ');
          transcriptRef.current = text;
        };
        rec.start();
        recognitionRef.current = rec;
      } catch (_) {}
    }

    try {
      let stream = streamRef.current;
      if (!stream || !stream.active) {
        stream = await navigator.mediaDevices.getUserMedia(
          recordMode === 'video'
            ? { video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }, audio: true }
            : { audio: true }
        );
        streamRef.current = stream;
      }

      if (recordMode === 'video' && previewVideoRef.current) {
        previewVideoRef.current.srcObject = stream;
      }

      const mimeType = recordMode === 'video'
        ? (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus') ? 'video/webm;codecs=vp8,opus' : 'video/webm')
        : 'audio/webm';

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined });
      mediaChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) mediaChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (_) {}
          recognitionRef.current = null;
        }

        const blobType = recordMode === 'video' ? 'video/webm' : 'audio/webm';
        const blob = new Blob(mediaChunksRef.current, { type: blobType });
        const mediaUrl = URL.createObjectURL(blob);
        setRecordedMediaUrl(mediaUrl);
        setRecordedMediaType(recordMode);

        const spoken = transcriptRef.current.trim();
        setSpokenTranscript(spoken);

        const evaluation = evaluateSpeechSyntax(spoken, fullScriptText, { mode: 'sentence', minWords: 4 });
        setEvalResult(evaluation);

        setFeedback({
          message: evaluation.isCorrect
            ? `🎉 Fantastic video performance! Accuracy: ${evaluation.score}%. Your fluency is Cambridge-ready!`
            : `⭐ Good effort! Accuracy: ${evaluation.score}%. Practice speaking with confident expression!`
        });

        fireCelebrationConfetti('VideoChallenge_Success');
        speakText("Awesome video challenge! You told your story brilliantly!");
        if (onComplete) onComplete(50);
      };

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } catch (err) {
      console.warn('Media recording error:', err);
      handleManualSubmit(fullScriptText);
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRetake = () => {
    setRecordedMediaUrl(null);
    setFeedback(null);
    setEvalResult(null);
    setSpokenTranscript('');
    if (recordMode === 'video') {
      startCameraPreview();
    }
  };

  const handleManualSubmit = (typedText) => {
    setRecordedMediaUrl('typed_mode');
    setSpokenTranscript(typedText);

    const evaluation = evaluateSpeechSyntax(typedText, fullScriptText, { mode: 'sentence', minWords: 4 });
    setEvalResult(evaluation);

    setFeedback({
      message: evaluation.isCorrect
        ? `🎉 Story script submitted! Accuracy: ${evaluation.score}%. Great storytelling syntax!`
        : `⚠️ Script submitted! Accuracy: ${evaluation.score}%. Keep practicing!`
    });

    fireCelebrationConfetti('VideoChallenge_Success');
    if (onComplete) onComplete(50);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-2.5 font-sans text-slate-900 animate-in fade-in duration-200">
      {/* ── Mode Switch & Instruction Bar ── */}
      <div className="p-2.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">📹</span>
          <div>
            <h3 className="font-black text-purple-950 text-xs sm:text-sm">
              Record yourself retelling your story!
            </h3>
            <p className="text-[10px] sm:text-[11px] font-medium text-purple-800">
              Look at camera & speak clearly (+50 XP).
            </p>
          </div>
        </div>

        {/* Toggle Mode */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-purple-200 shadow-2xs">
          <button
            type="button"
            onClick={() => { setRecordMode('video'); setRecordedMediaUrl(null); }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-black transition flex items-center gap-1 ${
              recordMode === 'video' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <Camera size={12} /> Video
          </button>
          <button
            type="button"
            onClick={() => { setRecordMode('audio'); stopCameraPreview(); setRecordedMediaUrl(null); }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-black transition flex items-center gap-1 ${
              recordMode === 'audio' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-indigo-900'
            }`}
          >
            <Mic size={12} /> Audio
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-2 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-900">
          ⚠️ {cameraError}
        </div>
      )}

      {/* ── Main Unified Viewport ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
        
        {/* Left Column (6/12): Camera Preview + Teleprompter + Action Buttons */}
        <div className="md:col-span-6 flex flex-col gap-2">
          <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden shadow-md border-2 border-slate-300 flex items-center justify-center">
            
            {/* Live Camera View */}
            {!recordedMediaUrl && recordMode === 'video' && (
              <>
                <video
                  ref={previewVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                {!cameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 gap-1.5 bg-slate-900">
                    <Camera size={28} className="animate-pulse text-purple-400" />
                    <span className="text-xs font-bold">Connecting Camera...</span>
                  </div>
                )}
              </>
            )}

            {/* Audio Mode Graphic View */}
            {!recordedMediaUrl && recordMode === 'audio' && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-900 text-white space-y-2 p-3">
                <div className={`w-14 h-14 rounded-full bg-indigo-600/30 border-2 border-indigo-400 flex items-center justify-center shadow-lg ${isRecording ? 'animate-pulse scale-110' : ''}`}>
                  <Mic size={24} className="text-indigo-300" />
                </div>
                <span className="text-xs font-bold text-indigo-200">🎙️ Audio Recording Mode</span>
              </div>
            )}

            {/* Recorded Video Playback View */}
            {recordedMediaUrl && recordedMediaType === 'video' && recordedMediaUrl !== 'typed_mode' && (
              <video
                src={recordedMediaUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            {/* Recorded Audio Playback View */}
            {recordedMediaUrl && (recordedMediaType === 'audio' || recordedMediaUrl === 'typed_mode') && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-950 text-white p-3 space-y-2">
                <CheckCircle2 size={36} className="text-emerald-400" />
                <span className="text-xs font-black">Audio Clip Ready</span>
                {recordedMediaUrl !== 'typed_mode' && (
                  <audio src={recordedMediaUrl} controls className="w-full max-w-xs" />
                )}
              </div>
            )}

            {/* Countdown Overlay (3, 2, 1) */}
            {countdown !== null && (
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-30">
                <span className="text-6xl sm:text-7xl font-black text-amber-400 animate-ping">
                  {countdown}
                </span>
              </div>
            )}

            {/* Live Recording HUD */}
            {isRecording && (
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-rose-600 text-white font-mono font-black text-xs rounded-lg shadow animate-pulse">
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                REC {formatTime(recordingSeconds)}
              </div>
            )}
          </div>

          {/* Action Buttons Dock */}
          <div className="space-y-1.5">
            {!isRecording && !recordedMediaUrl && (
              <button
                type="button"
                onClick={initiateRecording}
                disabled={countdown !== null}
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-black text-xs sm:text-sm shadow-md active:scale-98 transition flex items-center justify-center gap-2"
              >
                {recordMode === 'video' ? <Video size={16} /> : <Mic size={16} />}
                {recordMode === 'video' ? '🎬 START RECORDING' : '🎙️ START AUDIO RECORDING'}
              </button>
            )}

            {isRecording && (
              <button
                type="button"
                onClick={stopRecording}
                className="w-full py-2.5 sm:py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-black text-xs sm:text-sm shadow-md active:scale-98 transition flex items-center justify-center gap-2 animate-bounce"
              >
                <Square size={16} fill="currentColor" /> ⏹️ FINISH ({formatTime(recordingSeconds)})
              </button>
            )}

            {recordedMediaUrl && (
              <div className="space-y-1.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-black transition flex items-center justify-center gap-1"
                  >
                    <RefreshCw size={12} /> Retake
                  </button>
                  {recordedMediaUrl !== 'typed_mode' && (
                    <a
                      href={recordedMediaUrl}
                      download={`engquest_story_video_${Date.now()}.webm`}
                      className="py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 rounded-lg text-xs font-black transition flex items-center justify-center gap-1 text-center"
                    >
                      <Download size={12} /> Save Clip 💾
                    </a>
                  )}
                </div>

                <div className="py-2 bg-emerald-600 text-white font-black text-xs rounded-lg text-center shadow-sm flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={14} /> Video Recorded! +50 XP ⭐
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (6/12): Story Script Teleprompter Directly Visible */}
        <div className="md:col-span-6 flex flex-col gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">📜</span>
              <span className="text-xs font-black uppercase text-purple-900 tracking-wider">
                Story Teleprompter (Read Aloud)
              </span>
            </div>
            <button
              type="button"
              onClick={() => speakText(fullScriptText)}
              className="px-2.5 py-0.5 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold rounded-lg text-[10px] flex items-center gap-1 transition active:scale-95"
            >
              <Volume2 size={11} className="text-purple-700" /> Full Audio
            </button>
          </div>

          {/* 4 Story Scenes */}
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {activeScenes.map((scene, idx) => {
              const func = scene.narrative_function || FUNC_ORDER[idx] || 'setting';
              const style = NARRATIVE_STYLES[func] || NARRATIVE_STYLES.setting;
              const sceneText = scene.en || scene.text || '';

              return (
                <div
                  key={scene.id || idx}
                  className={`p-2.5 rounded-xl border ${style.bg} ${style.border} space-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase tracking-wider ${style.badge}`}>
                      {style.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(sceneText)}
                      className="p-1 hover:bg-white/80 rounded-md text-slate-600 transition"
                      title="Hear this sentence"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                  <p className={`text-xs sm:text-sm font-bold leading-snug ${style.text}`}>
                    {sceneText}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Evaluation / Feedback banner */}
          {evalResult && (
            <div className={`p-3 rounded-2xl border ${
              evalResult.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
            } text-xs font-black space-y-1 animate-in fade-in`}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className={evalResult.isCorrect ? "text-emerald-600" : "text-amber-600"} />
                  {evalResult.feedback}
                </span>
                <span className="px-2 py-0.5 bg-white rounded-md border text-[10px]">
                  Score: {evalResult.score}%
                </span>
              </div>
              {spokenTranscript && (
                <p className="text-[10.5px] font-medium text-slate-700 italic">
                  Recognized speech: "{spokenTranscript}"
                </p>
              )}
            </div>
          )}

          {/* Typing fallback */}
          <div className="pt-1">
            <MicFallbackInput
              onSubmit={handleManualSubmit}
              placeholder="Or type your story script here..."
              buttonLabel="Submit Script →"
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
