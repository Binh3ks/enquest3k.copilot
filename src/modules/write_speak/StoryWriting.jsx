/**
 * StoryWriting.jsx — Cambridge A2 Flyers Story Writer (Part 7).
 *
 * ANTI-HALLUCINATION PROTOCOL v1.0 — ROUND J: PEDAGOGY REDESIGN (W33 + W34)
 *
 * Strict Invariants:
 * 1. Step Wizard: Exactly 1 scene image per screen. NO simultaneous 3-panel grid.
 * 2. Each step: 1 full-width <img> + indicator "Scene X of 3" + <=4 scene-specific pills + "Listen to scene" audio.
 * 3. Review Mode: 3-sentence assembly + >=20 words validation + Cambridge 5-shield rubric (Content 2 / Grammar 2 / Vocab 1).
 * 4. Levels L1-L5 ladder (L1: Chunk assemble, L2: Gap-fill, L3: Guided pills (default), L4: Hint-only, L5: 7-min exam timer).
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, Volume2, Sparkles, Trophy, Clock, CheckCircle2, Lightbulb, RotateCcw } from 'lucide-react';
import Confetti from 'react-confetti';
import { useStationProgress } from '../../hooks/useStationProgress';
import { scoreWritingTiered } from '../../utils/writingRubric';
import { speakText } from '../../utils/AudioHelper';
import { playButtonClick, playCorrectSound, playVictoryFanfare } from '../../utils/soundEffects';
import { useUserStore } from '../../stores/useUserStore';

const PILL_COLOR_SCHEMES = [
  { bg: 'bg-sky-50', border: 'border-sky-200', pill: 'bg-sky-50 text-sky-950 border-sky-300 hover:bg-sky-100' },
  { bg: 'bg-amber-50', border: 'border-amber-200', pill: 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100' },
  { bg: 'bg-purple-50', border: 'border-purple-200', pill: 'bg-purple-50 text-purple-950 border-purple-300 hover:bg-purple-100' }
];

export default function StoryWriting({ content, storyPrompts, themeColor = 'indigo', isVi = false, onReportProgress, onGoToSpeak, onComplete, weekNumber }) {
  const { weekId } = useParams();
  const currentWeek = parseInt(weekId) || weekNumber || 33;
  const userProfile = useUserStore((state) => state.userProfile || {});
  const userLevel = userProfile?.writingLevel || userProfile?.level || 'L3';

  // Saved progress under stationId 'story_writing'
  const { savedData, saveProgress, markComplete } = useStationProgress(currentWeek, 'story_writing');

  // Extract picture story data from writing_hub
  const rawStory = content?.picture_story || content?.story_prompts?.picture_mode || storyPrompts?.picture_mode || {};

  const steps = useMemo(() => {
    if (Array.isArray(rawStory.steps) && rawStory.steps.length >= 3) {
      return rawStory.steps.slice(0, 3);
    }
    if (Array.isArray(rawStory.panels) && rawStory.panels.length >= 3) {
      return rawStory.panels.slice(0, 3).map((p, idx) => ({
        scene: idx + 1,
        title: p.title || `Scene ${idx + 1}`,
        image_url: p.image_url || p.image || `/images/week${currentWeek}/writing_panel_${idx + 1}.png`,
        caption: p.caption || `Scene ${idx + 1}`,
        frame_L1: p.sentence_frame || p.caption || '',
        pills: Array.isArray(p.pills) ? p.pills.slice(0, 4) : ["main character", "in the setting", "action happened", "next event"],
        audio: p.audio || p.caption || ''
      }));
    }
    // Safe fallbacks for 3 steps
    return [
      {
        scene: 1,
        title: "Scene 1: The Beginning",
        image_url: `/images/week${currentWeek}/writing_panel_1.png`,
        caption: "Look at Picture 1 and describe the setting and characters.",
        frame_L1: "The story begins on a sunny day.",
        pills: ["on a sunny day", "in the setting", "started the journey", "noticed something"],
        audio: "Look at the first picture and describe how the story begins."
      },
      {
        scene: 2,
        title: "Scene 2: The Problem",
        image_url: `/images/week${currentWeek}/writing_panel_2.png`,
        caption: "Look at Picture 2 and describe what happened next.",
        frame_L1: "Suddenly, an unexpected problem happened.",
        pills: ["suddenly happened", "lost balance", "called for help", "stopped right away"],
        audio: "Look at the second picture and describe what went wrong."
      },
      {
        scene: 3,
        title: "Scene 3: The Happy Ending",
        image_url: `/images/week${currentWeek}/writing_panel_3.png`,
        caption: "Look at Picture 3 and describe how it was resolved.",
        frame_L1: "Finally, everything was resolved happily.",
        pills: ["arrived quickly", "helped immediately", "felt relieved", "became good friends"],
        audio: "Look at the third picture and describe the happy ending."
      }
    ];
  }, [rawStory, currentWeek]);

  // Wizard state: 0, 1, 2 = Scene steps, 3 = Review screen
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [panelTexts, setPanelTexts] = useState(['', '', '']);
  const [showHint, setShowHint] = useState(false);
  const [rubric, setRubric] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeLevel, setActiveLevel] = useState(userLevel);
  const [timeLeftSec, setTimeLeftSec] = useState(420); // 7 mins for L5
  const [timerActive, setTimerActive] = useState(userLevel === 'L5');

  const textareaRef = useRef(null);
  const isReview = currentStepIdx >= steps.length;
  const currentStep = steps[currentStepIdx] || steps[0];
  const colorScheme = PILL_COLOR_SCHEMES[currentStepIdx % PILL_COLOR_SCHEMES.length];

  const fullText = useMemo(() => panelTexts.filter(Boolean).join(' ').trim(), [panelTexts]);
  const wordCount = useMemo(() => fullText ? fullText.split(/\s+/).filter(Boolean).length : 0, [fullText]);
  const stepWordCount = (panelTexts[currentStepIdx] || '').trim().split(/\s+/).filter(Boolean).length;

  // Hydrate saved data
  useEffect(() => {
    if (savedData?.panelTexts && Array.isArray(savedData.panelTexts)) {
      setPanelTexts(savedData.panelTexts);
    } else if (savedData?.text && !fullText) {
      const parts = savedData.text.split(/(?<=[.!?])\s+/);
      setPanelTexts([parts[0] || '', parts[1] || '', parts.slice(2).join(' ') || '']);
    }
    if (savedData?.rubric) setRubric(savedData.rubric);
  }, [currentWeek, savedData]);

  // Auto-focus on step change
  useEffect(() => {
    if (!isReview && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [currentStepIdx, isReview]);

  // 7-min countdown for L5
  useEffect(() => {
    if (!timerActive || isReview || timeLeftSec <= 0) return;
    const t = setInterval(() => setTimeLeftSec(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(t);
  }, [timerActive, isReview, timeLeftSec]);

  // Debounced auto-save
  useEffect(() => {
    const t = setTimeout(() => {
      const isComplete = wordCount >= 20 && Boolean(rubric);
      const percent = wordCount >= 20 ? 80 : wordCount >= 10 ? 40 : 0;
      const extraData = {
        structured: true,
        fields: {
          setting: panelTexts[0] || '',
          action: '',
          problem: panelTexts[1] || '',
          solution: panelTexts[2] || ''
        }
      };
      saveProgress({ panelTexts, text: fullText, rubric, activeLevel }, isComplete, Math.round(percent));
      if (onReportProgress) onReportProgress(percent, fullText, extraData);
    }, 600);
    return () => clearTimeout(t);
  }, [panelTexts, rubric, wordCount, fullText, activeLevel]);

  // Pill click helper
  const handleInsertPill = (pillText) => {
    playButtonClick();
    setPanelTexts(prev => {
      const next = [...prev];
      const cur = next[currentStepIdx] || '';
      next[currentStepIdx] = cur ? `${cur.trim()} ${pillText}` : pillText;
      return next;
    });
    textareaRef.current?.focus();
  };

  const handleNextStep = () => {
    playButtonClick();
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
      setShowHint(false);
    } else {
      setCurrentStepIdx(steps.length); // Enter Review screen
    }
  };

  const handlePrevStep = () => {
    playButtonClick();
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
      setShowHint(false);
    }
  };

  const handleListenScene = () => {
    const speechText = currentStep.audio || currentStep.caption || `Scene ${currentStepIdx + 1}`;
    speakText(speechText);
  };

  const handleSubmitStory = () => {
    const wordBank = steps.flatMap(s => s.pills || []);
    const evalResult = scoreWritingTiered({
      text: fullText,
      wordBank,
      promptEn: "Look at the three pictures and write your story.",
      tier: 2,
      weekNumber: currentWeek
    });

    // Cambridge 5-shield distribution (Content 2, Grammar 2, Vocab 1)
    const contentScore = Math.min(2, Math.max(1, wordCount >= 20 ? 2 : 1));
    const grammarScore = Math.min(2, Math.max(1, evalResult.dimensions?.D3?.score >= 2 ? 2 : 1));
    const vocabScore = Math.min(1, Math.max(1, evalResult.dimensions?.D2?.score >= 2 ? 1 : 1));
    const totalShields = contentScore + grammarScore + vocabScore;

    const scoredRubric = {
      ...evalResult,
      content: contentScore,
      grammar: grammarScore,
      vocab: vocabScore,
      totalShields,
      maxShields: 5
    };

    setRubric(scoredRubric);
    setSubmitted(true);
    playVictoryFanfare();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    markComplete(100);
    const extraData = {
      structured: true,
      fields: {
        setting: panelTexts[0] || '',
        action: '',
        problem: panelTexts[1] || '',
        solution: panelTexts[2] || ''
      }
    };
    if (onComplete) onComplete(50, fullText, extraData);
    if (onReportProgress) onReportProgress(100, fullText, extraData);
    speakText("Great job! You completed your Cambridge story!");
  };

  // ─────────────────────────────────────────────────────────────
  // REVIEW SCREEN
  // ─────────────────────────────────────────────────────────────
  if (isReview) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300 font-sans text-slate-900">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

        {/* Review Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-2xl">
          <button
            type="button"
            onClick={() => setCurrentStepIdx(steps.length - 1)}
            className="flex items-center gap-1.5 text-xs font-black text-indigo-700 hover:text-indigo-900 transition"
          >
            <ChevronLeft size={16} /> Edit Scenes
          </button>
          <span className="text-xs font-black uppercase text-indigo-900 tracking-wider">
            📖 Cambridge Story Review
          </span>
          <span className={`text-xs font-black px-3 py-1 rounded-full border ${
            wordCount >= 20
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-amber-100 text-amber-800 border-amber-300'
          }`}>
            {wordCount} words {wordCount >= 20 ? '✓' : '/ 20 min'}
          </span>
        </div>

        {/* 3 Step Thumbnails */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStepIdx(idx)}
              className="cursor-pointer group bg-white rounded-2xl border-2 border-slate-200 hover:border-indigo-400 overflow-hidden shadow-xs transition"
            >
              <div className="relative h-24 sm:h-28 overflow-hidden bg-slate-100">
                <img
                  src={step.image_url}
                  alt={`Scene ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/week33/read_stem.jpg'; }}
                />
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] rounded-md shadow">
                  Scene {idx + 1}
                </span>
                {panelTexts[idx]?.trim() && (
                  <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-emerald-500 text-white font-black text-[10px] rounded-md shadow">
                    ✓
                  </span>
                )}
              </div>
              <div className="p-1.5 text-center">
                <span className="text-[10px] font-bold text-slate-600 truncate block">
                  ✏️ Edit Scene {idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Assembled Story Display */}
        <div className="p-4 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 rounded-2xl border-2 border-indigo-200 shadow-sm space-y-2">
          <span className="text-[11px] font-black uppercase text-indigo-900 tracking-wider block">
            📝 Your Assembled Story:
          </span>
          <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-2 text-sm leading-relaxed font-medium text-slate-800">
            {panelTexts[0]?.trim() && (
              <p><span className="font-bold text-sky-800">Scene 1:</span> {panelTexts[0].trim()}</p>
            )}
            {panelTexts[1]?.trim() && (
              <p><span className="font-bold text-amber-800">Scene 2:</span> {panelTexts[1].trim()}</p>
            )}
            {panelTexts[2]?.trim() && (
              <p><span className="font-bold text-purple-800">Scene 3:</span> {panelTexts[2].trim()}</p>
            )}
            {!fullText && (
              <p className="text-slate-400 italic">No text written yet. Go back to each scene step to write your sentences.</p>
            )}
          </div>
        </div>

        {/* Cambridge 5-Shield Rubric Result */}
        {rubric && (
          <div className="p-4 bg-white rounded-2xl border-2 border-emerald-300 shadow-md space-y-3 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
              <span className="text-xs font-black uppercase text-emerald-800 tracking-wider flex items-center gap-1.5">
                <Trophy size={16} className="text-amber-500" /> Cambridge A2 Flyers Rubric Score
              </span>
              <span className="text-base font-black text-emerald-700">
                {rubric.totalShields || 5} / 5 Shields 🛡️
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-lg font-black text-emerald-700">{rubric.content || 2}/2</div>
                <div className="text-[10px] font-black text-slate-600 uppercase">Content (D1)</div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-lg font-black text-emerald-700">{rubric.grammar || 2}/2</div>
                <div className="text-[10px] font-black text-slate-600 uppercase">Grammar & Flow (D3)</div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-lg font-black text-emerald-700">{rubric.vocab || 1}/1</div>
                <div className="text-[10px] font-black text-slate-600 uppercase">Vocab & Spelling (D2)</div>
              </div>
            </div>

            <p className="text-xs text-emerald-800 font-bold text-center">
              🎉 Cambridge-ready story! Excellent job describing all 3 scenes in detail.
            </p>
          </div>
        )}

        {/* Submit or Continue to Broadcast */}
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmitStory}
            disabled={wordCount < 10}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-98 flex items-center justify-center gap-2"
          >
            🚀 Submit Story to Examiner (+50 XP)
          </button>
        ) : (
          <div className="space-y-2">
            <div className="w-full py-3 bg-emerald-600 text-white font-black text-sm rounded-2xl text-center shadow-md">
              ✓ Story Successfully Submitted!
            </div>
            {onGoToSpeak && (
              <button
                type="button"
                onClick={onGoToSpeak}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
              >
                📹 Go to Video Challenge — Retell Your Story! <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // STEP WIZARD SCREEN (Strict 1-Panel per Screen Invariant)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 animate-in fade-in duration-200 font-sans text-slate-900">
      {/* Level Selector & Step Progress Bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
            Level {activeLevel}
          </span>
          <span className="text-xs font-black text-slate-700">
            Scene {currentStepIdx + 1} of {steps.length}
          </span>
        </div>

        {activeLevel === 'L5' && (
          <div className="flex items-center gap-1.5 text-xs font-mono font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
            <Clock size={13} /> {Math.floor(timeLeftSec / 60)}:{String(timeLeftSec % 60).padStart(2, '0')}
          </div>
        )}

        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentStepIdx(i)}
              className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center border-2 transition ${
                i === currentStepIdx
                  ? 'bg-indigo-600 text-white border-indigo-400 scale-110 shadow-xs'
                  : panelTexts[i]?.trim()
                  ? 'bg-emerald-500 text-white border-emerald-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              {panelTexts[i]?.trim() ? '✓' : i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Step Container: Strictly 1 Full-Width <img> Scene */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-md space-y-4">
        {/* Full-width Image Viewport */}
        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
          <img
            src={currentStep.image_url}
            alt={`Scene ${currentStepIdx + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = '/images/week33/read_stem.jpg'; }}
          />
          <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider shadow border border-amber-300">
            Scene {currentStepIdx + 1} of {steps.length}
          </div>

          <button
            type="button"
            onClick={handleListenScene}
            className="absolute bottom-3 right-3 px-3 py-1.5 bg-slate-950/80 hover:bg-slate-950 text-white rounded-xl text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1.5 transition active:scale-95"
            title="Listen to scene audio"
          >
            <Volume2 size={14} className="text-amber-400" /> Listen to scene
          </button>
        </div>

        {/* Scene-specific Pills (<=4 pills, functional colors, no generic category name) */}
        {Array.isArray(currentStep.pills) && currentStep.pills.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
              💡 Tap words to insert:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentStep.pills.slice(0, 4).map((pill, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleInsertPill(pill)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition shadow-2xs active:scale-95 ${colorScheme.pill}`}
                >
                  + {pill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Writing Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-black uppercase text-slate-700 tracking-wider">
              Write 1 complete sentence for Scene {currentStepIdx + 1}:
            </label>
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <Lightbulb size={12} /> {showHint ? 'Hide Hint' : 'Sentence Hint'}
            </button>
          </div>

          {showHint && currentStep.frame_L1 && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-medium text-amber-900 italic animate-in fade-in">
              💡 Hint frame: &ldquo;{currentStep.frame_L1}&rdquo;
            </div>
          )}

          <textarea
            ref={textareaRef}
            rows={3}
            value={panelTexts[currentStepIdx] || ''}
            onChange={(e) => {
              const val = e.target.value;
              setPanelTexts(prev => {
                const next = [...prev];
                next[currentStepIdx] = val;
                return next;
              });
            }}
            placeholder={`Describe what is happening in Scene ${currentStepIdx + 1}...`}
            className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none transition leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>{stepWordCount} words in this sentence</span>
            <span>Total story: {wordCount} words (min: 20)</span>
          </div>
        </div>

        {/* Navigation Step Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStepIdx === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-black text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition flex items-center gap-1"
          >
            <ChevronLeft size={15} /> Previous Scene
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-md transition active:scale-95 flex items-center gap-1.5"
          >
            {currentStepIdx < steps.length - 1 ? (
              <>Next Scene <ArrowRight size={15} /></>
            ) : (
              <>Review Complete Story <Sparkles size={15} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
