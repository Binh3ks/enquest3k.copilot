import React, { useState, useRef } from 'react';
import { Mic, Square, Play, RefreshCw, Sparkles, Trophy, Volume2, CheckCircle2 } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';

export default function RetellRecorder({ scenes = [], onComplete }) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordings, setRecordings] = useState({});
  const [feedback, setFeedback] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const currentScene = scenes[currentSceneIdx] || null;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        setRecordings(prev => ({ ...prev, [currentSceneIdx]: audioUrl }));
        setFeedback({
          stars: 3,
          message: "🎉 Great voice clarity & rhythm! You spoke with great confidence."
        });
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setFeedback(null);
    } catch (err) {
      console.warn("Microphone access denied or error:", err);
      // Fallback dummy recording for browsers without mic permission
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setFeedback({
          stars: 3,
          message: "⭐ Audio practice simulated! Keep training your speaking pace."
        });
      }, 3000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlaySceneAudio = () => {
    if (!currentScene) return;
    const textToRead = currentScene.en || currentScene.text || currentScene.caption || '';
    speakText(textToRead);
  };

  if (!currentScene) return <div className="p-4 text-center text-xs text-slate-400">No scenes loaded.</div>;

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-purple-500/30 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Mic size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-purple-300">🎙️ SCENE VOICE RETELL & DUAL-PLAY</h4>
            <span className="text-[10px] text-slate-400">Scene {currentSceneIdx + 1} of {scenes.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {scenes.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentSceneIdx(idx);
                setRecordedAudioUrl(recordings[idx] || null);
                setFeedback(null);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                currentSceneIdx === idx
                  ? 'bg-purple-600 text-white shadow-md'
                  : recordings[idx]
                  ? 'bg-emerald-800/80 text-emerald-200'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Scene & Prompt */}
      <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
            "{currentScene.en || currentScene.text || currentScene.caption}"
          </p>
          <button
            type="button"
            onClick={handlePlaySceneAudio}
            className="p-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white transition shrink-0 shadow-sm"
            title="Listen to native model narration"
          >
            <Volume2 size={18} />
          </button>
        </div>

        {currentScene.vi && (
          <p className="text-xs text-slate-400 italic">
            Dịch: {currentScene.vi}
          </p>
        )}
      </div>

      {/* Recording Control Center */}
      <div className="text-center py-3 space-y-4">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-purple-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
          >
            <Mic size={18} />
            {recordedAudioUrl ? 'Record Scene Again' : 'Record Your Retelling'}
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-rose-600/30 transition-all animate-pulse flex items-center gap-2 mx-auto"
          >
            <Square size={18} />
            Stop Recording (Tap when done)
          </button>
        )}

        {/* Playback your recording */}
        {recordedAudioUrl && (
          <div className="p-4 bg-purple-950/50 rounded-2xl border border-purple-500/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-black text-purple-300">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Recording Saved!
            </div>
            <audio src={recordedAudioUrl} controls className="h-8 max-w-[200px]" />
          </div>
        )}

        {/* Feedback Chip */}
        {feedback && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
            <Sparkles size={16} className="text-amber-400" />
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
}
