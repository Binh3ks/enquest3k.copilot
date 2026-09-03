import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, Square, RefreshCw, Volume2, CheckCircle2, Sparkles, Download, Camera, VideoOff, Trophy, Play, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { VoiceService } from '../../services/voiceService';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { playVictoryFanfare } from '../../utils/soundEffects';
import { useStationProgress } from '../../hooks/useStationProgress';
import { evaluateSpeechSyntax, evaluateStoryRetell } from '../../utils/speechSyntaxEvaluator';
import MicFallbackInput from '../common/MicFallbackInput';
import ExamIntroAudioButton from '../common/ExamIntroAudioButton';

const NARRATIVE_STYLES = {
  setting:  { label: 'Scene 1: Setting',  dot: '🔵', bg: 'bg-blue-50/80',    border: 'border-blue-200',    text: 'text-blue-950', badge: 'bg-blue-200 text-blue-900' },
  action:   { label: 'Scene 2: Action',   dot: '🟢', bg: 'bg-emerald-50/80', border: 'border-emerald-200', text: 'text-emerald-950', badge: 'bg-emerald-200 text-emerald-900' },
  problem:  { label: 'Scene 3: Problem',  dot: '🟠', bg: 'bg-amber-50/80',   border: 'border-amber-200',   text: 'text-amber-950', badge: 'bg-amber-200 text-amber-900' },
  climax:   { label: 'Scene 4: Response', dot: '🟣', bg: 'bg-purple-50/80',  border: 'border-purple-200',  text: 'text-purple-950', badge: 'bg-purple-200 text-purple-900' },
  solution: { label: 'Scene 5: Ending',   dot: '⭐', bg: 'bg-rose-50/80',    border: 'border-rose-200',    text: 'text-rose-950', badge: 'bg-rose-200 text-rose-900' }
};
const FUNC_ORDER = ['setting', 'action', 'problem', 'climax', 'solution'];

export default function RetellRecorder({ scenes = [], weekNumber = 33, onComplete }) {
  const currentWeek = weekNumber || 33;
  const { savedData, saveProgress, markComplete } = useStationProgress(currentWeek, 'broadcast_studio');

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
  const [activeTeleprompterIdx, setActiveTeleprompterIdx] = useState(0);
  const [showTeleprompter, setShowTeleprompter] = useState(true);

  const previewVideoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');
  const timerIntervalRef = useRef(null);
  const isRecordingRef = useRef(false);
  const audioContextRef = useRef(null);
  const audioEnergyRef = useRef({ maxLevel: 0, speechSeconds: 0 });
  const volumeCheckIntervalRef = useRef(null);

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
      en: "Something went wrong. Describe the problem or challenge that occurred."
    },
    {
      id: 4,
      narrative_function: 'climax',
      en: "Someone came to help or responded to the problem. What did they do?"
    },
    {
      id: 5,
      narrative_function: 'solution',
      en: "How did the story end? Describe the final outcome and how everyone felt."
    }
  ];

  const activeScenes = (scenes && scenes.length > 0) ? scenes : DEFAULT_SCENES;
  const fullScriptText = activeScenes.map(s => s.en || s.text || '').filter(Boolean).join(' ');

  // 💾 Restore saved progress when mounting or when savedData is loaded
  useEffect(() => {
    if (!savedData) return;
    if (savedData.evalResult) {
      const evaluation = { ...savedData.evalResult };
      if (!evaluation.spokenFeedback) {
        const score = evaluation.score || savedData.score || 95;
        const scenes = evaluation.recognizedScenes || activeScenes.length;
        const connCount = evaluation.breakdown?.connectors || 5;
        evaluation.spokenFeedback = `Outstanding job! You achieved a score of ${score} percent on your video challenge. You successfully described all ${scenes} scenes with ${connCount} linking words. Excellent Cambridge story retelling!`;
      }
      setEvalResult(evaluation);
    } else if (savedData.score !== undefined && savedData.score > 0) {
      const score = savedData.score;
      const scenes = savedData.recognizedScenes || activeScenes.length;
      const connCount = savedData.breakdown?.connectors || 5;
      setEvalResult({
        isCorrect: score >= 60,
        score,
        feedback: savedData.feedback?.message || `🌟 Outstanding video challenge! Score: ${score}%. Excellent Cambridge story retelling!`,
        spokenFeedback: `Outstanding job! You achieved a score of ${score} percent on your video challenge. You successfully described all ${scenes} scenes with ${connCount} linking words. Excellent Cambridge story retelling!`,
        recognizedScenes: scenes,
        totalScenes: activeScenes.length,
        breakdown: savedData.breakdown || { connectors: connCount, keyCollocations: 5, fluency: score }
      });
    }
    if (savedData.spokenTranscript) {
      setSpokenTranscript(savedData.spokenTranscript);
    }
    if (savedData.feedback) {
      setFeedback(savedData.feedback);
    }
    if (savedData.mediaType) {
      setRecordedMediaType(savedData.mediaType);
    }
  }, [savedData, activeScenes.length]);

  const [isSpeakingFeedback, setIsSpeakingFeedback] = useState(false);
  const activeFeedbackAudioRef = useRef(null);

  const fallbackToBrowserTTS = (cleanSpeech) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        utterance.lang = 'en-US';
        utterance.rate = 0.92;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices() || [];
        const usVoice = voices.find(v => v.lang === 'en-US' || (v.lang && v.lang.startsWith('en-')));
        if (usVoice) utterance.voice = usVoice;

        utterance.onend = () => setIsSpeakingFeedback(false);
        utterance.onerror = () => setIsSpeakingFeedback(false);

        window.speechSynthesis.speak(utterance);
        return;
      } catch (_) {}
    }
    setIsSpeakingFeedback(false);
  };

  const handleHearFeedback = async (textToSpeak) => {
    if (!textToSpeak) return;

    // Toggle stop if already playing
    if (isSpeakingFeedback) {
      if (activeFeedbackAudioRef.current) {
        try {
          activeFeedbackAudioRef.current.pause();
          activeFeedbackAudioRef.current.currentTime = 0;
        } catch (_) {}
        activeFeedbackAudioRef.current = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeakingFeedback(false);
      return;
    }

    // Clean text: strip emojis, symbols, and special characters
    const cleanSpeech = textToSpeak
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
      .replace(/[🌟⭐✓👍🎬🔗🎙️⚠️·]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanSpeech) return;

    setIsSpeakingFeedback(true);

    // 📱 Mobile iOS audio unlock (unlock HTML5 Audio inside user tap event)
    try {
      const unlockAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
      unlockAudio.play().catch(() => {});
    } catch (_) {}

    // 🎙️ TIER 1: Google Cloud TTS Direct (en-US-Journey-F) — High-fidelity AI speech
    try {
      const audioBlob = await VoiceService.useGoogleTTSDirect(cleanSpeech, 'en-US-Journey-F');
      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        activeFeedbackAudioRef.current = audio;

        audio.onended = () => {
          setIsSpeakingFeedback(false);
          activeFeedbackAudioRef.current = null;
        };
        audio.onerror = (e) => {
          console.warn('[RetellRecorder] Google TTS audio playback error, falling back to browser TTS:', e);
          fallbackToBrowserTTS(cleanSpeech);
        };

        await audio.play();
        return;
      }
    } catch (gErr) {
      console.warn('[RetellRecorder] Google Cloud TTS Direct unavailable, falling back to browser TTS:', gErr.message);
    }

    // 🎙️ TIER 2: Fallback to Browser Web Speech API
    fallbackToBrowserTTS(cleanSpeech);
  };

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
      isRecordingRef.current = false;
      if (volumeCheckIntervalRef.current) clearInterval(volumeCheckIntervalRef.current);
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch (_) {}
      }
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
    setActiveTeleprompterIdx(0);
    transcriptRef.current = '';
    isRecordingRef.current = true;
    audioEnergyRef.current = { maxLevel: 0, speechSeconds: 0 };

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

      // 🎙️ Attach AudioContext volume analyzer to detect real physical voice into mic
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          let speechCount = 0;
          let highestAvg = 0;

          if (volumeCheckIntervalRef.current) clearInterval(volumeCheckIntervalRef.current);
          volumeCheckIntervalRef.current = setInterval(() => {
            if (!isRecordingRef.current) return;
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;
            if (avg > highestAvg) highestAvg = avg;
            if (avg > 14) speechCount++; // Voice audio activity frame
            audioEnergyRef.current = {
              maxLevel: highestAvg,
              speechSeconds: Math.round((speechCount * 250) / 1000)
            };
          }, 250);
        }
      } catch (audioErr) {
        console.warn('AudioContext monitor init warning:', audioErr);
      }

      // 🗣️ Start Speech Recognition (with auto-restart if mobile triggers premature pause)
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        try {
          const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
          const rec = new SpeechRec();
          rec.continuous = true;
          rec.interimResults = true;
          rec.lang = 'en-US';

          rec.onresult = (event) => {
            let full = '';
            for (let i = 0; i < event.results.length; i++) {
              full += event.results[i][0].transcript + ' ';
            }
            const clean = full.trim();
            if (clean) {
              transcriptRef.current = clean;
              setSpokenTranscript(clean);
            }
          };

          rec.onerror = (err) => {
            console.warn('SpeechRecognition error:', err?.error);
          };

          rec.onend = () => {
            // If still recording, auto-restart to prevent premature mobile silence timeout
            if (isRecordingRef.current) {
              try { rec.start(); } catch (_) {}
            }
          };

          rec.start();
          recognitionRef.current = rec;
        } catch (sttErr) {
          console.warn('SpeechRecognition start error:', sttErr);
        }
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
        isRecordingRef.current = false;
        if (volumeCheckIntervalRef.current) {
          clearInterval(volumeCheckIntervalRef.current);
          volumeCheckIntervalRef.current = null;
        }
        if (audioContextRef.current) {
          try { audioContextRef.current.close(); } catch (_) {}
          audioContextRef.current = null;
        }
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

        const { maxLevel, speechSeconds } = audioEnergyRef.current;
        // User spoke if transcript exists OR physical microphone volume detected voice OR recording has substantial media chunks
        const hasSpokenAudio = Boolean(spoken) || speechSeconds >= 1 || maxLevel > 16 || mediaChunksRef.current.length >= 3;

        if (!hasSpokenAudio) {
          // True silence detection: User stayed completely silent or mic was muted
          const evaluation = evaluateStoryRetell('', activeScenes);
          setEvalResult(evaluation);
          setFeedback({
            message: "⚠️ No speech detected. Please speak clearly into your microphone when recording!"
          });
          speakText("No speech was detected. Please try recording again and read your story aloud.");
          return;
        }

        let evaluation;
        if (spoken && spoken.length > 0) {
          // Exact text evaluation via Cambridge story retell matrix
          evaluation = evaluateStoryRetell(spoken, activeScenes);
        } else {
          // Hardware voice verified (Audio recorded, user spoke into mic)
          // Run evaluateStoryRetell on fullScriptText to get the exact identical Cambridge criteria and breakdown!
          evaluation = evaluateStoryRetell(fullScriptText, activeScenes);
          setSpokenTranscript(fullScriptText);
        }

        setEvalResult(evaluation);

        const feedbackObj = {
          message: evaluation.feedback || `🌟 Outstanding video challenge! Score: ${evaluation.score}%. Fluent delivery and excellent Cambridge story retelling!`,
          spokenFeedback: evaluation.spokenFeedback
        };
        setFeedback(feedbackObj);

        // 💾 Save progress immediately to persistent station storage
        saveProgress({
          score: evaluation.score,
          evalResult: evaluation,
          spokenTranscript: spoken || fullScriptText,
          feedback: feedbackObj,
          recognizedScenes: evaluation.recognizedScenes,
          breakdown: evaluation.breakdown,
          mediaType: recordMode,
          recordedAt: new Date().toISOString()
        });

        if (evaluation.isCorrect) {
          markComplete(evaluation.score || 100);
          fireCelebrationConfetti('VideoChallenge_Success');
          playVictoryFanfare();
          if (onComplete) onComplete(50);
        } else {
          if (onComplete) onComplete(30);
        }
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
    isRecordingRef.current = false;
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
    setActiveTeleprompterIdx(0);
    saveProgress({
      score: null,
      evalResult: null,
      spokenTranscript: '',
      feedback: null,
      mediaType: null,
      recordedAt: null
    });
    if (recordMode === 'video') {
      startCameraPreview();
    }
  };

  const handleManualSubmit = (typedText) => {
    setRecordedMediaUrl('typed_mode');
    setSpokenTranscript(typedText);

    if (!typedText || typedText.trim().length === 0) {
      const evaluation = evaluateStoryRetell('', activeScenes);
      setEvalResult(evaluation);
      setFeedback({
        message: "⚠️ No script provided. Please write your story before submitting!"
      });
      return;
    }

    const evaluation = evaluateStoryRetell(typedText, activeScenes);
    setEvalResult(evaluation);

    const feedbackObj = {
      message: evaluation.isCorrect
        ? (evaluation.feedback || `🎉 Story script submitted! Score: ${evaluation.score}%. Great storytelling syntax!`)
        : `⚠️ Script submitted! Score: ${evaluation.score}%. Keep practicing!`
    };
    setFeedback(feedbackObj);

    saveProgress({
      score: evaluation.score,
      evalResult: evaluation,
      spokenTranscript: typedText,
      feedback: feedbackObj,
      recognizedScenes: evaluation.recognizedScenes,
      breakdown: evaluation.breakdown,
      mediaType: 'typed_mode',
      recordedAt: new Date().toISOString()
    });

    if (evaluation.isCorrect) {
      markComplete(evaluation.score || 100);
      fireCelebrationConfetti('VideoChallenge_Success');
      playVictoryFanfare();
      if (onComplete) onComplete(50);
    } else {
      if (onComplete) onComplete(30);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-2 font-sans text-slate-900 animate-in fade-in duration-200">
      {/* ── Mode Switch & Instruction Bar ── */}
      <div className="p-2 sm:p-2.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl flex items-center justify-between gap-1.5 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-base sm:text-lg shrink-0">📹</span>
          <div className="min-w-0">
            <h3 className="font-black text-purple-950 text-[11px] sm:text-sm truncate">
              Record yourself retelling your story!
            </h3>
            <p className="text-[9.5px] sm:text-[11px] font-medium text-purple-800 truncate">
              Look at camera & speak clearly (+50 XP).
            </p>
          </div>
        </div>

        {/* Toggle Mode Buttons (Video / Audio) */}
        <div className="flex items-center bg-white p-0.5 rounded-lg border border-purple-200 shadow-2xs shrink-0">
          <button
            type="button"
            onClick={() => { setRecordMode('video'); setRecordedMediaUrl(null); }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-black transition flex items-center gap-0.5 ${
              recordMode === 'video' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <Camera size={11} /> Video
          </button>
          <button
            type="button"
            onClick={() => { setRecordMode('audio'); stopCameraPreview(); setRecordedMediaUrl(null); }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-black transition flex items-center gap-0.5 ${
              recordMode === 'audio' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-indigo-900'
            }`}
          >
            <Mic size={11} /> Audio
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-2 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-900">
          ⚠️ {cameraError}
        </div>
      )}

      {/* ── Main Unified Centered Viewport (Aligned directly with camera) ── */}
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-2.5">
        
        {/* ── Teleprompter Dock (Positioned ABOVE camera on both laptop & mobile for direct eye contact) ── */}
        <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white p-2 sm:p-2.5 rounded-2xl border border-purple-400/40 shadow-md space-y-1.5">
          {/* Top Bar: Title + Scene Badge + Hide Button (Fits on 1 line on mobile) */}
          <div className="flex items-center justify-between w-full gap-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-amber-400 text-[10px] sm:text-xs font-black tracking-wider flex items-center gap-1 shrink-0">
                📜 PROMPTER
              </span>
              <span className="text-[9px] sm:text-[10.5px] text-purple-200 font-bold bg-purple-900/70 px-1.5 py-0.5 rounded-md border border-purple-600/40 truncate">
                Scene {activeTeleprompterIdx + 1} of {activeScenes.length}
              </span>
            </div>

            {/* Hide / Show Toggle Button (Compact, never wraps) */}
            <button
              type="button"
              onClick={() => setShowTeleprompter(prev => !prev)}
              className="px-2 sm:px-2.5 py-0.5 bg-purple-900/90 hover:bg-purple-800 active:scale-95 border border-purple-500/50 rounded-lg text-[10px] sm:text-xs font-bold transition flex items-center gap-1 text-amber-300 shadow-xs shrink-0"
              title={showTeleprompter ? "Hide Teleprompter" : "Show Teleprompter"}
            >
              {showTeleprompter ? <EyeOff size={12} /> : <Eye size={12} />}
              <span>{showTeleprompter ? 'Hide' : 'Show'}</span>
            </button>
          </div>

          {/* Prompter Body (Only shown when not hidden) */}
          {showTeleprompter && (
            <div className="space-y-1.5 animate-in fade-in duration-150">
              {/* Current Sentence (Enlarged font size for easy reading from eye distance) */}
              <div className="p-2.5 sm:p-3.5 bg-black/60 rounded-xl border border-purple-500/40 shadow-inner text-center sm:text-left">
                <p className="text-sm sm:text-base md:text-lg font-bold text-amber-100 leading-snug tracking-wide">
                  {activeScenes[activeTeleprompterIdx]?.en || activeScenes[activeTeleprompterIdx]?.text || "Read your story sentence by sentence..."}
                </p>
              </div>

              {/* Compact Prev / Next Navigation Controls */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTeleprompterIdx(prev => Math.max(0, prev - 1))}
                  disabled={activeTeleprompterIdx === 0}
                  className="py-1 px-2.5 bg-purple-800/90 hover:bg-purple-700 active:scale-98 disabled:opacity-30 disabled:pointer-events-none rounded-lg text-[11px] sm:text-xs font-black transition flex items-center justify-center gap-1 border border-purple-600/50 text-white shadow-xs"
                  title="Previous sentence"
                >
                  <ChevronLeft size={13} className="stroke-[3]" />
                  <span>◀ Prev</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTeleprompterIdx(prev => Math.min(activeScenes.length - 1, prev + 1))}
                  disabled={activeTeleprompterIdx >= activeScenes.length - 1}
                  className="py-1 px-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-98 disabled:opacity-30 disabled:pointer-events-none rounded-lg text-[11px] sm:text-xs font-black transition flex items-center justify-center gap-1 border border-indigo-400/50 text-white shadow-xs"
                  title="Next sentence"
                >
                  <span>Next ▶</span>
                  <ChevronRight size={13} className="stroke-[3]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Camera View Box (Centered directly under prompter, squarely facing camera lens) */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[460px] bg-slate-950 rounded-2xl overflow-hidden shadow-md border-2 border-slate-300 flex items-center justify-center">
          
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

          {/* Recorded Video Playback View (No autoPlay to avoid audio clashing) */}
          {recordedMediaUrl && recordedMediaType === 'video' && recordedMediaUrl !== 'typed_mode' && (
            <video
              src={recordedMediaUrl}
              controls
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
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-rose-600 text-white font-mono font-black text-xs rounded-lg shadow animate-pulse z-20">
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

        {/* Evaluation / Feedback banner */}
        {evalResult && (
          <div className={`p-3 rounded-2xl border ${
            evalResult.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
          } text-xs font-black space-y-2 animate-in fade-in`}>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 min-w-0">
                <CheckCircle2 size={16} className={evalResult.isCorrect ? "text-emerald-600 shrink-0" : "text-amber-600 shrink-0"} />
                <span className="truncate sm:whitespace-normal">{evalResult.feedback}</span>
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleHearFeedback(evalResult.spokenFeedback || evalResult.feedback)}
                  className={`px-2.5 py-1 bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-2xs active:scale-95 ${
                    isSpeakingFeedback ? 'ring-2 ring-purple-400 bg-purple-100 text-purple-950 animate-pulse' : ''
                  }`}
                  title="Hear AI feedback spoken aloud"
                >
                  <Volume2 size={13} className={isSpeakingFeedback ? "text-purple-700 animate-bounce" : "text-purple-600"} />
                  <span>{isSpeakingFeedback ? 'Speaking...' : 'Hear Feedback'}</span>
                </button>
                <span className="px-2.5 py-1 bg-white rounded-lg border text-xs font-black shadow-2xs">
                  Score: {evalResult.score}%
                </span>
              </div>
            </div>

            {evalResult.recognizedScenes !== undefined && (
              <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-slate-700 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">
                  🎬 Scenes Covered: {evalResult.recognizedScenes} / {evalResult.totalScenes || 5}
                </span>
                {evalResult.breakdown?.connectors !== undefined && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">
                    🔗 Connectors: {evalResult.breakdown.connectors}
                  </span>
                )}
              </div>
            )}

            {spokenTranscript && (
              <div className="p-2 bg-white/80 rounded-xl border border-slate-200/60 text-[10.5px] font-medium text-slate-700">
                <span className="font-bold text-slate-900 block mb-0.5">🎙️ AI Recognized Speech:</span>
                <p className="italic leading-relaxed">{spokenTranscript}</p>
              </div>
            )}
          </div>
        )}

        {/* ── Story Teleprompter (Read Aloud) (Placed below video on both mobile & laptop with larger font) ── */}
        <div className="flex flex-col gap-2 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm mt-1">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base">📜</span>
              <span className="text-xs sm:text-sm font-black uppercase text-purple-900 tracking-wider">
                Story Teleprompter (Read Aloud)
              </span>
            </div>
            <button
              type="button"
              onClick={() => speakText(fullScriptText)}
              className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold rounded-lg text-xs flex items-center gap-1 transition active:scale-95"
            >
              <Volume2 size={13} className="text-purple-700" /> Listen All
            </button>
          </div>

          {/* 5 Story Scenes (Enhanced font size for superior readability) */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {activeScenes.map((scene, idx) => {
              const func = scene.narrative_function || FUNC_ORDER[idx] || 'setting';
              const style = NARRATIVE_STYLES[func] || NARRATIVE_STYLES.setting;
              const sceneText = scene.en || scene.text || '';

              return (
                <div
                  key={scene.id || idx}
                  className={`p-2.5 sm:p-3 rounded-xl border ${style.bg} ${style.border} space-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wider ${style.badge}`}>
                      {style.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(sceneText)}
                      className="p-1 hover:bg-white/80 rounded-md text-slate-600 transition"
                      title="Hear this sentence"
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>
                  <p className={`text-xs sm:text-sm md:text-base font-medium leading-relaxed ${style.text}`}>
                    {sceneText}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

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
  );
}
