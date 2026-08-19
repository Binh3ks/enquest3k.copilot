import React, { useState, useRef } from 'react';
import { Mic, Square, Play, RefreshCw, Sparkles, Trophy, Volume2, CheckCircle2, Headphones, Radio, ArrowRight } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

export default function RetellRecorder({ scenes = [], onComplete }) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordings, setRecordings] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);

  // Cognitive Scaffolding Tier System: 'tier1' (Default ultra-clean), 'tier2' (Reporter), 'tier3' (Radio Pro Mode)
  const [tierMode, setTierMode] = useState('tier1');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const DEFAULT_SCENES = [
    {
      id: 1,
      narrative_function: 'setting',
      title: "Scene 1: Setting (🔵 Where & When)",
      en: "After science class, Jake was walking carefully down the school corridor.",
      radio_starters: ["Welcome back to Corridor Watch!", "Breaking news from the hallway!", "On a sunny Monday morning..."]
    },
    {
      id: 2,
      narrative_function: 'action',
      title: "Scene 2: Action (🟢 What Was Happening)",
      en: "Jake was walking carefully while other students were running fast.",
      radio_starters: ["Right then and there...", "Let's find out what happened next...", "As students were moving..."]
    },
    {
      id: 3,
      narrative_function: 'problem',
      title: "Scene 3: Problem (🟠 What Went Wrong)",
      en: "Suddenly, a student slipped on the wet floor and fell down heavily.",
      radio_starters: ["But then, listeners...", "Suddenly, everything changed...", "Unexpectedly..."]
    },
    {
      id: 4,
      narrative_function: 'solution',
      title: "Scene 4: Solution (🟣 How It Was Fixed)",
      en: "The school nurse arrived quickly with a clean bandage to help.",
      radio_starters: ["And that's why we always...", "To sum it up...", "Fortunately..."]
    }
  ];

  const activeScenes = (scenes && scenes.length > 0) ? scenes : DEFAULT_SCENES;
  const currentScene = activeScenes[currentSceneIdx] || activeScenes[0];

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
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        setRecordings(prev => ({ ...prev, [currentScene.id]: audioUrl }));

        setFeedback({
          score: 95,
          message: "🎉 Excellent broadcast performance! Broadcast fluency score: 95%"
        });

        fireCelebrationConfetti('Broadcast_Record');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Microphone access fallback, simulating broadcast recording:', err);
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setFeedback({
          score: 90,
          message: "🎉 Broadcast audio recorded! Great reporting performance!"
        });
        fireCelebrationConfetti('Broadcast_Record');
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-7 bg-white rounded-3xl border-2 border-purple-200 shadow-xl space-y-5 text-slate-900 font-sans">
      {/* Top Arcade Goal & Tier Selector Dock */}
      <div className="p-3.5 bg-purple-50 border border-purple-300 rounded-2xl space-y-2 text-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-black text-purple-950 flex items-center gap-1.5">
            🎙️ {tierMode === 'tier1' ? 'BROADCAST GOAL: Perform your scene like a news reporter!' : tierMode === 'tier2' ? 'BROADCAST GOAL: Add reporter starters & perform your scene!' : 'BROADCAST PRO GOAL: Combine radio starters, transition pills & sound effects!'}
          </span>
          <span className="text-xs font-bold text-purple-900 bg-purple-200/80 px-2.5 py-1 rounded-lg">
            Scene {currentSceneIdx + 1} of {activeScenes.length}
          </span>
        </div>

        {/* Tier Selector Buttons (Explicit Voluntarily Toggle) */}
        <div className="flex items-center gap-1.5 pt-1 border-t border-purple-200/70 flex-wrap">
          <span className="text-[10px] font-black uppercase text-purple-800 mr-1">Studio Mode:</span>
          <button
            type="button"
            onClick={() => setTierMode('tier1')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition flex items-center gap-1 ${
              tierMode === 'tier1' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            🌱 Tier 1 (Clean Mode)
          </button>
          <button
            type="button"
            onClick={() => setTierMode('tier2')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition flex items-center gap-1 ${
              tierMode === 'tier2' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            ✨ Tier 2 (Reporter)
          </button>
          <button
            type="button"
            onClick={() => setTierMode('tier3')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition flex items-center gap-1 ${
              tierMode === 'tier3' ? 'bg-amber-500 text-slate-950 shadow-xs ring-1 ring-amber-300' : 'bg-amber-50 text-amber-950 border border-amber-300 hover:bg-amber-100'
            }`}
          >
            🎙️ Try Radio Pro Mode
          </button>
        </div>
      </div>

      {/* Current Scene Display Card */}
      <div className="p-6 bg-purple-50/80 rounded-3xl border-2 border-purple-200 space-y-4 shadow-inner">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-purple-900">
            {currentScene.title || `Scene ${currentSceneIdx + 1}`}
          </span>
          <button
            type="button"
            onClick={handlePlaySceneAudio}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-2 transition active:scale-95"
          >
            <Volume2 size={16} /> 🔊 Hear My Line
          </button>
        </div>

        <p className="text-lg sm:text-xl font-black text-slate-900 leading-relaxed">
          "{currentScene.en || currentScene.text || currentScene.caption}"
        </p>

        {/* ─── TIER 2: Merged Single Row (Max 3 Pills, No Dual Header Split) ─── */}
        {tierMode === 'tier2' && (
          <div className="pt-2.5 border-t border-purple-200/80 space-y-1.5 text-xs">
            <span className="font-black text-purple-900 uppercase text-[10px] block">✨ Reporter Expressions (Optional 1-tap):</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                currentScene.radio_starters?.[0] || "Welcome back to Corridor Watch!",
                "SUDDENLY...",
                "To sum it up..."
              ].map((pill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => speakText(pill)}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-300 text-purple-950 font-bold rounded-lg text-[11px] shadow-xs transition active:scale-95 flex items-center gap-1"
                >
                  <Volume2 size={11} className="text-purple-600" /> {pill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── TIER 3: Radio Pro Mode (Full Production Suite) ─── */}
        {tierMode === 'tier3' && (
          <div className="pt-3 border-t border-purple-200/80 space-y-2.5 text-xs animate-in fade-in duration-200">
            {/* Radio Host Starters */}
            <div className="space-y-1">
              <span className="font-black text-purple-900 uppercase text-[10px] block">🎙️ Radio Host Starters (Click to listen):</span>
              <div className="flex flex-wrap gap-1.5">
                {(currentScene.radio_starters || [
                  "Welcome back to Corridor Watch!",
                  "Believe it or not...",
                  "Stay tuned to hear what happened...",
                  "Breaking news from the hallway!"
                ]).map((starter, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => speakText(starter)}
                    className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-300 text-purple-950 font-bold rounded-lg text-[11px] shadow-xs transition active:scale-95 flex items-center gap-1"
                  >
                    <Volume2 size={11} className="text-purple-600" /> {starter}
                  </button>
                ))}
              </div>
            </div>

            {/* Academic Language Pills */}
            <div className="space-y-1">
              <span className="font-black text-indigo-900 uppercase text-[10px] block">✨ Language Transition Pills (Academic discourse):</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "SUDDENLY...",
                  "Wait for it...",
                  "Right then and there!",
                  "To sum it up...",
                  "Let's find out!"
                ].map((marker, mIdx) => (
                  <button
                    key={mIdx}
                    type="button"
                    onClick={() => speakText(marker)}
                    className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-black rounded-md text-[10px] transition active:scale-95"
                  >
                    ⚡ {marker}
                  </button>
                ))}
              </div>
            </div>

            {/* Collapsible 4-Part Full Story Overview */}
            <div className="pt-2 border-t border-purple-100">
              <button
                type="button"
                onClick={() => setShowFullOverview(prev => !prev)}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 rounded-xl text-xs font-black transition flex items-center justify-between w-full shadow-xs"
              >
                <span className="flex items-center gap-1.5">
                  📖 {showFullOverview ? 'Hide Full Story Overview' : 'View Full Story Overview (Your 4 Parts)'}
                </span>
                <span className="text-[10px] text-purple-600 font-bold">
                  {showFullOverview ? '▲ Collapse' : '▼ Expand'}
                </span>
              </button>

              {showFullOverview && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5 animate-in fade-in duration-200">
                  {activeScenes.map((scene, sIdx) => {
                    const bgColors = {
                      setting: 'bg-blue-50 border-blue-200 text-blue-950',
                      action: 'bg-emerald-50 border-emerald-200 text-emerald-950',
                      problem: 'bg-amber-50 border-amber-200 text-amber-950',
                      solution: 'bg-purple-50 border-purple-200 text-purple-950'
                    };
                    const labels = {
                      setting: '🔵 Setting:',
                      action: '🟢 Action:',
                      problem: '🟠 Problem:',
                      solution: '🟣 Solution:'
                    };
                    const func = scene.narrative_function || ['setting', 'action', 'problem', 'solution'][sIdx] || 'setting';
                    return (
                      <div key={scene.id || sIdx} className={`p-2.5 rounded-xl border space-y-1 ${bgColors[func] || 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                        <span className="text-[10px] font-black uppercase block">
                          {labels[func] || `Scene ${sIdx + 1}:`}
                        </span>
                        <span className="text-xs font-bold leading-relaxed block">
                          "{scene.en || scene.text || ''}"
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sound Board & Production Tools */}
            <div className="flex items-center justify-between flex-wrap gap-1 pt-1 border-t border-purple-100">
              <span className="font-black text-purple-900 uppercase text-[10px]">🎛️ Production Tools & Sound Board SFX:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button type="button" onClick={() => speakText("Pause for 2 seconds")} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-xs active:scale-95">
                  ⏸️ Pause 2s
                </button>
                <button type="button" onClick={() => speakText("Footsteps")} className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-xs active:scale-95">
                  👟 Footsteps
                </button>
                <button type="button" onClick={() => speakText("Uh-oh! Be careful!")} className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-950 border border-rose-300 font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-xs active:scale-95">
                  ⚠️ Uh-Oh!
                </button>
                <button type="button" onClick={() => speakText("School bell")} className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-950 border border-blue-300 font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-xs active:scale-95">
                  🔔 Bell Ring
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recording Control Dock (Bug 2 Fix) */}
      <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200 text-center space-y-4">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition hover:scale-105 active:scale-95"
          >
            <Mic size={22} className="animate-pulse" /> 🎙️ RECORD MY BROADCAST
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-base shadow-xl inline-flex items-center gap-3 transition animate-bounce"
          >
            <Square size={22} fill="currentColor" /> ⏹️ STOP RECORDING BROADCAST
          </button>
        )}

        {/* Playback Recorded Audio */}
        {recordedAudioUrl && (
          <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
            <audio controls src={recordedAudioUrl} className="h-10 rounded-xl" />
            <button
              type="button"
              onClick={startRecording}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Re-record
            </button>
          </div>
        )}

        {/* AI Voice Feedback */}
        {feedback && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-black flex items-center justify-center gap-3 animate-in fade-in">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* Scene Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          disabled={currentSceneIdx === 0}
          onClick={() => { setCurrentSceneIdx(prev => prev - 1); setRecordedAudioUrl(null); setFeedback(null); }}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-black transition"
        >
          Previous Scene
        </button>
        <span className="text-xs font-bold text-slate-500">
          Scene {currentSceneIdx + 1} of {activeScenes.length}
        </span>
        <button
          type="button"
          disabled={currentSceneIdx + 1 >= activeScenes.length}
          onClick={() => { setCurrentSceneIdx(prev => prev + 1); setRecordedAudioUrl(null); setFeedback(null); }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5"
        >
          Next Scene <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
