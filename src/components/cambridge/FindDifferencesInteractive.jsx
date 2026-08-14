import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Mic, MicOff, Volume2, Eye } from 'lucide-react';
import VoiceService from '../../services/voiceService';

export function FindDifferencesInteractive({ customData, onComplete }) {
  const [foundHotspots, setFoundHotspots] = useState([]); // [hotspotId]
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenResponses, setSpokenResponses] = useState({}); // { hotspotId: transcript }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const differencesData = customData || {
    picA: { title: 'Picture A (Original Scene)', image_url: '/images/week33/w33_diff_scene_a.jpg' },
    picB: { title: 'Picture B (Difference Scene)', image_url: '/images/week33/w33_diff_scene_b.jpg' },
    hotspots: [
      { id: 'diff1', name: 'Left Bench Backpack Color', x: 10, y: 60, prompt_en: 'In Picture A, the backpack on the left bench is blue, but in Picture B, it is red.' },
      { id: 'diff2', name: 'Boy Shirt Color', x: 45, y: 50, prompt_en: 'In Picture A, the boy is wearing a red shirt, but in Picture B, he is wearing a blue shirt.' },
      { id: 'diff3', name: 'Wall Clock Time', x: 73, y: 14, prompt_en: 'In Picture A, the wall clock shows 9:00, but in Picture B, it shows 10:00.' },
      { id: 'diff4', name: 'Wet Floor Warning Sign Color', x: 78, y: 72, prompt_en: 'In Picture A, the wet floor warning sign is yellow, but in Picture B, it is orange.' }
    ]
  };

  const [showHint, setShowHint] = useState(false);

  const handleHotspotClick = (hs) => {
    if (!foundHotspots.includes(hs.id)) {
      setFoundHotspots([...foundHotspots, hs.id]);
    }
    setActiveHotspot(hs);
    setShowHint(false); // Hide hint by default for authentic Speaking practice
  };

  const handleToggleRecord = () => {
    if (!activeHotspot) return;

    if (isRecording) {
      setIsRecording(false);
      // Mock AI speech recognition transcript
      setSpokenResponses({
        ...spokenResponses,
        [activeHotspot.id]: activeHotspot.prompt_en
      });
    } else {
      setIsRecording(true);
    }
  };

  const handleListenExaminerPrompt = async () => {
    if (!activeHotspot) return;
    try {
      await VoiceService.speak(activeHotspot.prompt_en, 'story');
    } catch (_) {}
  };

  const handleCheck = () => {
    const foundCount = foundHotspots.length;
    const finalScore = Math.round((foundCount / differencesData.hotspots.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setFoundHotspots([]);
    setActiveHotspot(null);
    setIsRecording(false);
    setSpokenResponses({});
    setIsSubmitted(false);
    setScore(null);
    setShowHint(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-rose-100 text-rose-800 text-[11px] font-black rounded-full uppercase tracking-wider">
            CAMBRIDGE SPEAKING PART 1 — FIND DIFFERENCES
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Click Hotspot Differences & Record Your Explanation
          </h2>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          Found {foundHotspots.length} of {differencesData.hotspots.length} Differences
        </span>
      </div>

      {/* Side-by-Side Dual Picture Scenes with Interactive SVG Circles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Picture A Viewport */}
        <div className="relative h-64 sm:h-72 bg-slate-900 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-800">
          <img src={differencesData.picA.image_url} alt={differencesData.picA.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 text-white rounded-xl text-xs font-black backdrop-blur-md">
            Picture A
          </div>

          {/* SVG Circles for Found Hotspots on Picture A */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {differencesData.hotspots.map((hs) => {
              const isFound = foundHotspots.includes(hs.id);
              if (!isFound) return null;
              return (
                <g key={hs.id}>
                  <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="24" stroke="#f59e0b" strokeWidth="4" fill="rgba(245, 158, 11, 0.25)" className="animate-ping" />
                  <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="24" stroke="#f59e0b" strokeWidth="4" fill="rgba(245, 158, 11, 0.25)" />
                </g>
              );
            })}
          </svg>

          {/* Hotspot Click Targets */}
          {differencesData.hotspots.map((hs) => (
            <button
              key={hs.id}
              onClick={() => handleHotspotClick(hs)}
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full cursor-pointer hover:bg-amber-400/30 transition z-20"
            />
          ))}
        </div>

        {/* Picture B Viewport */}
        <div className="relative h-64 sm:h-72 bg-slate-900 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-800">
          <img src={differencesData.picB.image_url} alt={differencesData.picB.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 px-3 py-1 bg-rose-600 text-white rounded-xl text-xs font-black backdrop-blur-md">
            Picture B
          </div>

          {/* SVG Circles for Found Hotspots on Picture B */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {differencesData.hotspots.map((hs) => {
              const isFound = foundHotspots.includes(hs.id);
              if (!isFound) return null;
              return (
                <g key={hs.id}>
                  <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="24" stroke="#f43f5e" strokeWidth="4" fill="rgba(244, 63, 94, 0.25)" className="animate-ping" />
                  <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="24" stroke="#f43f5e" strokeWidth="4" fill="rgba(244, 63, 94, 0.25)" />
                </g>
              );
            })}
          </svg>

          {/* Hotspot Click Targets */}
          {differencesData.hotspots.map((hs) => (
            <button
              key={hs.id}
              onClick={() => handleHotspotClick(hs)}
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full cursor-pointer hover:bg-rose-400/30 transition z-20"
            />
          ))}
        </div>
      </div>

      {/* Examiner Prompt & Microphone Recording Card */}
      {activeHotspot && (
        <div className="p-5 bg-rose-50/80 rounded-2xl border-2 border-rose-200 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center shadow">
                🎙️
              </span>
              <div>
                <span className="text-xs font-black text-rose-950 uppercase tracking-wider block">
                  Difference Found: {activeHotspot.name}
                </span>
                <span className="text-xs font-bold text-rose-700">
                  Describe this difference / Hãy mô tả điểm khác biệt này
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs rounded-xl border border-amber-300 transition flex items-center gap-1 shadow-sm"
            >
              💡 {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          </div>

          {/* Authentic Speaking Practice: English Text & Audio are HIDDEN by default */}
          {showHint && (
            <div className="p-3.5 bg-white/90 rounded-xl border border-rose-200 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-rose-700 uppercase tracking-wider">
                  Sample English Answer (Examiner Hint):
                </span>
                <button
                  onClick={handleListenExaminerPrompt}
                  className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 hover:bg-rose-700"
                >
                  <Volume2 size={12} /> Listen Sample
                </button>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 italic">
                "{activeHotspot.prompt_en}"
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleToggleRecord}
              className={`px-5 py-2.5 rounded-xl font-black text-xs transition flex items-center gap-2 shadow-md ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              <span>{isRecording ? 'Stop Recording' : 'Record Your Speaking Explanation 🎙️'}</span>
            </button>

            {spokenResponses[activeHotspot.id] && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 size={16} /> Explanation Recorded!
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer Check & Score */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            disabled={foundHotspots.length === 0}
            className="w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Sparkles size={18} /> Complete Speaking Differences
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-rose-600 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Differences Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FindDifferencesInteractive;
