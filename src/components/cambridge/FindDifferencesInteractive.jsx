import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Mic, MicOff, Volume2, Eye, HelpCircle } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';
import { evaluateSpeechSyntax } from '../../utils/speechSyntaxEvaluator';
import MicFallbackInput from '../common/MicFallbackInput';
import ExamIntroAudioButton from '../common/ExamIntroAudioButton';
import { getCalibratedCentroids } from '../../utils/calibrationAdapter';

export function FindDifferencesInteractive({ customData, onComplete, isStealthMode = false, weekNumber = 33 }) {
  const [foundHotspots, setFoundHotspots] = useState([]); // [hotspotId]
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenResponses, setSpokenResponses] = useState({}); // { hotspotId: { transcript, evalResult } }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const recognitionRef = useRef(null);

  const rawDifferences = (customData?.differences && Array.isArray(customData.differences))
    ? customData.differences
    : (customData?.hotspots && Array.isArray(customData.hotspots))
      ? customData.hotspots
      : [];

  const rawHotspots = useMemo(() => {
    if (rawDifferences.length === 0) return [];
    const centroids = getCalibratedCentroids(customData?.week || weekNumber);
    if (rawDifferences.length !== centroids.length) {
      throw new Error(`[DEV-003 Violation] differences length (${rawDifferences.length}) !== calibration centroids length (${centroids.length})`);
    }
    return rawDifferences.map((item, index) => {
      const cx = centroids[index].x;
      const cy = centroids[index].y;
      if (item.x !== undefined && Math.abs(item.x - cx) > 2) {
        throw new Error(`[DEV-003 Violation] differences[${index}].x (${item.x}) deviates from calibration centroid x (${cx})`);
      }
      if (item.y !== undefined && Math.abs(item.y - cy) > 2) {
        throw new Error(`[DEV-003 Violation] differences[${index}].y (${item.y}) deviates from calibration centroid y (${cy})`);
      }
      return {
        ...item,
        x: item.x ?? cx,
        y: item.y ?? cy
      };
    });
  }, [rawDifferences, customData, weekNumber]);

  const differencesData = {
    picA: customData?.picA || { title: 'Picture A (Original Scene)', image_url: '' },
    picB: customData?.picB || { title: 'Picture B (Difference Scene)', image_url: '' },
    hotspots: rawHotspots
  };

  const [showHint, setShowHint] = useState(false);

  // Hotspot coords (x%, y%) are calibrated in container-% space (visual position
  // on the rendered object-cover image). No coordinate remapping needed.
  // Keeping refs only for ResizeObserver cleanup (not used for math).
  const containerARef = useRef(null);
  const containerBRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
    };
  }, []);

  const handleHotspotClick = (hs) => {
    setFoundHotspots(prev => (prev.includes(hs.id) ? prev : [...prev, hs.id]));
    setActiveHotspot(hs);
    setShowHint(false);
  };

  const handleToggleRecord = () => {
    if (!activeHotspot) return;

    if (isRecording) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_) {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      // Fallback
      handleEvaluateText(activeHotspot.prompt_en);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => setIsRecording(true);
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleEvaluateText(transcript);
      };
      rec.onerror = () => setIsRecording(false);
      rec.onend = () => setIsRecording(false);

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      setIsRecording(false);
    }
  };

  const handleEvaluateText = (transcript) => {
    if (!activeHotspot) return;
    const evalResult = evaluateSpeechSyntax(transcript, activeHotspot.prompt_en, {
      mode: 'find_diff',
      minWords: 3
    });

    setSpokenResponses(prev => ({
      ...prev,
      [activeHotspot.id]: { transcript, evalResult }
    }));
  };


  const handleListenExaminerPrompt = async () => {
    if (!activeHotspot) return;
    if (isStealthMode) return; // Block TTS of answer in Check Mode
    try {
      await VoiceService.speak(activeHotspot.prompt_en, 'story');
    } catch (_) {}
  };

  const TARGET_DIFFERENCES = 4; // Cambridge A2 Flyers standard: 4 differences

  const handleCheck = () => {
    const foundCount = foundHotspots.length;
    // Score based on Cambridge target of 4 differences (up to 6 discoverable)
    const finalScore = Math.min(100, Math.round((foundCount / TARGET_DIFFERENCES) * 100));
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 70) {
      fireCelebrationConfetti('FindDiff_Complete');
    }

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

  const starsEarned = (score || 0) >= 80 ? 3 : (score || 0) >= 60 ? 2 : 1;

  return (
    <div
      data-testid="find-differences"
      className="find-differences w-full max-w-7xl mx-auto my-1 sm:my-2 p-3 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md font-sans space-y-3"
    >
      <CompletionModal
        isOpen={isSubmitted && (score || 0) >= 50}
        onClose={() => {}}
        score={score || 0}
        stars={starsEarned}
        xpEarned={50}
        srsWordsAdded={6}
        activityTitle="Find Differences Mission (Speaking Part 1)"
      />
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2.5 border-b border-slate-200 gap-1.5">
        <div>
          <span className="px-2.5 py-0.5 bg-rose-100 text-rose-900 text-[10.5px] font-black rounded-full uppercase tracking-wider">
            Flyers Practice
          </span>
          <h2 className="text-base sm:text-xl font-black text-slate-900 mt-0.5">
            Find the Differences
          </h2>
          <p className="text-[11px] sm:text-xs text-rose-700 font-bold">
            Look at the two pictures. They are the same, but there are some differences. Tell me the differences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExamIntroAudioButton
            weekNumber={customData?.week || 33}
            introId="exam_intro_S1"
            introText="Look at the two pictures. They are the same, but there are some differences. Tell me the differences."
            isStealth={isStealthMode}
          />
          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
            {foundHotspots.length}/{differencesData.hotspots.length} differences
          </span>
        </div>
      </div>

      {/* Side-by-Side Dual Picture Scenes with Interactive SVG Circles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Picture A Viewport */}
        <div ref={containerARef} className="relative aspect-[1264/848] w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-slate-800">
          <img
            src={differencesData.picA.image_url}
            alt={differencesData.picA.title}
            className="w-full h-full object-contain pointer-events-none"
          />
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2.5 sm:px-3 py-1 bg-slate-950/80 text-white rounded-xl text-[11px] sm:text-xs font-black backdrop-blur-md">
            Picture A
          </div>

          {/* SVG Circles for Found Hotspots on Picture A */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {differencesData.hotspots.map((hs) => {
              const isFound = foundHotspots.includes(hs.id);
              if (!isFound) return null;
              return (
                <g key={hs.id}>
                  <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="20" stroke="#f59e0b" strokeWidth="3" fill="rgba(245, 158, 11, 0.25)" className="animate-ping" />
                  <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="20" stroke="#f59e0b" strokeWidth="3" fill="rgba(245, 158, 11, 0.25)" />
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
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:bg-amber-400/30 transition z-20"
            />
          ))}
        </div>

        {/* Picture B Viewport */}
        <div ref={containerBRef} className="relative aspect-[1264/848] w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-slate-800">
          <img
            src={differencesData.picB.image_url}
            alt={differencesData.picB.title}
            className="w-full h-full object-contain pointer-events-none"
          />
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2.5 sm:px-3 py-1 bg-rose-600 text-white rounded-xl text-[11px] sm:text-xs font-black backdrop-blur-md">
            Picture B
          </div>

          {/* SVG Circles for Found Hotspots on Picture B */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {differencesData.hotspots.map((hs) => {
              const isFound = foundHotspots.includes(hs.id);
              if (!isFound) return null;
              return (
                <g key={hs.id}>
                  <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="20" stroke="#f43f5e" strokeWidth="3" fill="rgba(244, 63, 94, 0.25)" className="animate-ping" />
                  <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="20" stroke="#f43f5e" strokeWidth="3" fill="rgba(244, 63, 94, 0.25)" />
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
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:bg-rose-400/30 transition z-20"
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
                  {isStealthMode ? `Difference #${foundHotspots.indexOf(activeHotspot.id) + 1} Found` : `Difference Found: ${activeHotspot.name}`}
                </span>
                <span className="text-xs font-bold text-rose-700">
                  Describe this difference / Hãy mô tả điểm khác biệt này
                </span>
              </div>
            </div>

            {!isStealthMode && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs rounded-xl border border-amber-300 transition flex items-center gap-1 shadow-sm"
              >
                💡 {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}
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
                {isStealthMode ? '"[Audio Sample Only — Speak your explanation into the mic]"' : `"${activeHotspot.prompt_en}"`}
              </p>
            </div>
          )}

          <div className="space-y-3 pt-1">

            <div className="flex flex-wrap items-center gap-3">
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

              {spokenResponses[activeHotspot.id]?.evalResult && (
                <span className={`text-xs font-bold flex items-center gap-1 ${
                  spokenResponses[activeHotspot.id].evalResult.isCorrect ? 'text-emerald-700' : 'text-amber-700'
                }`}>
                  <CheckCircle2 size={16} />
                  {spokenResponses[activeHotspot.id].evalResult.feedback} ({spokenResponses[activeHotspot.id].evalResult.score}%)
                </span>
              )}
            </div>

            {/* Transcript & Feedback details */}
            {spokenResponses[activeHotspot.id]?.transcript && (
              <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs font-medium text-slate-700 space-y-1">
                <p><strong>You said:</strong> "{spokenResponses[activeHotspot.id].transcript}"</p>
              </div>
            )}

            {/* Mic Fallback Typing */}
            <MicFallbackInput
              onSubmit={(typed) => handleEvaluateText(typed)}
              placeholder="e.g. In Picture A the backpack is blue, but in Picture B it is red."
              buttonLabel="Submit Explanation →"
            />
          </div>
        </div>
      )}


      {/* Footer Check & Score */}
      <div className="pt-2 sm:pt-2.5 border-t border-slate-200 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            disabled={foundHotspots.length === 0}
            className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            <Sparkles size={16} /> Complete Speaking Differences
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-600 animate-bounce" />
              <span className="text-sm sm:text-base font-black text-slate-900">
                Differences Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={13} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FindDifferencesInteractive;
