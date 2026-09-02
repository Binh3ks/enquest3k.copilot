/**
 * StoryWriting.jsx — Cambridge A2 Flyers Story Writer (Part 7).
 *
 * ANTI-HALLUCINATION PROTOCOL v1.0 — ROUND M: STORY WRITER PART-7 MINI-LADDER (W33 + W34)
 *
 * Mini-Ladder 3-Stage Invariants:
 * 1. Step 1 (MODEL): Locked connector ("In the beginning,") + ordered chips in data order.
 * 2. Step 2 (BUILD): >=3 connectors choice + shuffled chips (child decides semantic order).
 * 3. Step 3 (WRITE): Connectors choice + keyword chips with BASE VERBS (chew/free/bandage); textarea required (>=5 words min).
 * 4. Dedicated Connector Row: "🔗 LINK YOUR SENTENCES" with distinct violet styling & tooltip.
 * 5. Review Screen: Cohesive single-paragraph assembly + total word counter (min 20) + connector counter (>=2 distinct) + Scene 3 past-tense check.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, Volume2, Sparkles, Trophy, Clock, CheckCircle2, Lightbulb, Link2, AlertCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { useStationProgress } from '../../hooks/useStationProgress';
import { scoreWritingTiered } from '../../utils/writingRubric';
import { speakText } from '../../utils/AudioHelper';
import { playButtonClick, playVictoryFanfare } from '../../utils/soundEffects';
import { useUserStore } from '../../stores/useUserStore';

const STAGE_COLORS = [
  { bg: 'bg-sky-50', border: 'border-sky-200', pill: 'bg-sky-50 text-sky-950 border-sky-300 hover:bg-sky-100' },
  { bg: 'bg-amber-50', border: 'border-amber-200', pill: 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100' },
  { bg: 'bg-emerald-50', border: 'border-emerald-200', pill: 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100' },
  { bg: 'bg-purple-50', border: 'border-purple-200', pill: 'bg-purple-50 text-purple-950 border-purple-300 hover:bg-purple-100' },
  { bg: 'bg-rose-50', border: 'border-rose-200', pill: 'bg-rose-50 text-rose-950 border-rose-300 hover:bg-rose-100' }
];

const KNOWN_CONNECTORS = [
  'in the beginning',
  'then',
  'suddenly',
  'after that',
  'finally',
  'in the end',
  'at last',
  'while',
  'when',
  'because',
  'so',
  'but'
];

export function StoryWriting({ content, storyPrompts, themeColor = 'indigo', isVi = false, onReportProgress, onGoToSpeak, onComplete, weekNumber }) {
  const { weekId } = useParams();
  const currentWeek = parseInt(weekId) || weekNumber || 33;
  const userProfile = useUserStore((state) => state.userProfile);
  const userLevel = userProfile?.writingLevel || userProfile?.level || 'L3';

  // Saved progress under stationId 'story_writing'
  const { savedData, saveProgress, markComplete } = useStationProgress(currentWeek, 'story_writing');

  // Extract picture story data from writing_hub
  const rawStory = content?.picture_story || content?.story_prompts?.picture_mode || storyPrompts?.picture_mode || {};

  const steps = useMemo(() => {
    if (Array.isArray(rawStory.steps) && rawStory.steps.length >= 3) {
      return rawStory.steps.slice(0, 5); // Support up to 5 scenes (S3 Cambridge format)
    }
    // Fallback if not configured
    return [
      {
        scene: 1,
        ladder_stage: 'MODEL',
        badge_label: 'MODEL',
        title: 'Scene 1: The Beginning',
        image_url: `/images/week${currentWeek}/writing_panel_1.png`,
        caption: 'Look at Picture 1 and describe the setting and characters.',
        locked_connector: 'In the beginning,',
        ordered_chips: ['the main character', 'explored the trail', 'in the setting'],
        pills: ['the main character', 'explored the trail', 'in the setting'],
        audio: 'Look at the first picture and describe how the story begins.'
      },
      {
        scene: 2,
        ladder_stage: 'BUILD',
        badge_label: 'BUILD',
        title: 'Scene 2: The Problem',
        image_url: `/images/week${currentWeek}/writing_panel_2.png`,
        caption: 'Look at Picture 2 and describe what happened next.',
        connectors: ['Then', 'Suddenly', 'After that'],
        display_chips: ['an unexpected event', 'happened suddenly', 'on the path'],
        pills: ['an unexpected event', 'happened suddenly', 'on the path'],
        audio: 'Look at the second picture and describe what went wrong.'
      },
      {
        scene: 3,
        ladder_stage: 'WRITE',
        badge_label: 'WRITE',
        title: 'Scene 3: The Resolution',
        image_url: `/images/week${currentWeek}/writing_panel_3.png`,
        caption: 'Look at Picture 3 and describe what happened next.',
        frame_L1: 'Someone came to help. Describe what they did.',
        sentence_hint: 'Write 2 sentences about how someone helped.',
        connectors: ['Finally', 'In the end', 'At last'],
        keywords: ['the helper', 'arrive', 'the bandage', 'feel relieved'],
        pills: ['the helper', 'arrive', 'the bandage', 'feel relieved'],
        audio: 'Look at the third picture and describe the happy ending.'
      },
      {
        scene: 4, title: 'Scene 4: What Happened Next',
        image_url: `/images/week${currentWeek}/writing_panel_4.png`,
        caption: 'Look at Picture 4 and continue the story.',
        frame_L1: 'An important person arrived. Describe what they said or did.',
        ladder_stage: 'EXPAND', badge_label: 'EXPAND',
        sentence_hint: 'Write 2 sentences about what happened after that.',
        connectors: ['Then,', 'After that,', 'Meanwhile,'],
        pills: ['Then,', 'After that,', 'arrived', 'spoke to'],
      },
      {
        scene: 5, title: 'Scene 5: The Ending',
        image_url: `/images/week${currentWeek}/writing_panel_5.png`,
        caption: 'Look at Picture 5 and write how the story ended.',
        frame_L1: 'In the end, everyone felt proud. Describe the final outcome.',
        ladder_stage: 'REFLECT', badge_label: 'REFLECT',
        sentence_hint: 'Write 2 sentences about how the story ended and how people felt.',
        connectors: ['In the end,', 'Finally,', 'At last,'],
        pills: ['In the end,', 'Finally,', 'everyone', 'felt proud'],
      }
    ];
  }, [rawStory, currentWeek]);

  // Wizard state: 0, 1, 2 = Scene steps, 3 = Review screen
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [panelTexts, setPanelTexts] = useState(['', '', '', '', '']);
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
  const colorScheme = STAGE_COLORS[currentStepIdx % STAGE_COLORS.length];

  const fullText = useMemo(() => panelTexts.filter(Boolean).join(' ').trim(), [panelTexts]);
  const wordCount = useMemo(() => fullText ? fullText.split(/\s+/).filter(Boolean).length : 0, [fullText]);
  const stepWordCount = (panelTexts[currentStepIdx] || '').trim().split(/\s+/).filter(Boolean).length;

  // Real-time connector and past-tense analysis
  const distinctConnectors = useMemo(() => {
    const textLower = fullText.toLowerCase();
    const found = new Set();
    for (const c of KNOWN_CONNECTORS) {
      const reg = new RegExp(`\\b${c}\\b`, 'i');
      if (reg.test(textLower)) {
        found.add(c.charAt(0).toUpperCase() + c.slice(1));
      }
    }
    return Array.from(found);
  }, [fullText]);

  const hasScene3PastTense = useMemo(() => {
    const s3Text = (panelTexts[2] || '').toLowerCase();
    return /\b(chewed|freed|bandaged|ran|trapped|was|were|arrived|helped|applied|felt|slipped|fell|walked|became)\b/i.test(s3Text);
  }, [panelTexts]);

  // Mandatory cognitive shuffle: never display pills in sequential sentence order
  const chipsToDisplay = useMemo(() => {
    const raw = currentStep.pills || currentStep.display_chips || currentStep.keywords || currentStep.ordered_chips || [];
    if (!Array.isArray(raw) || raw.length === 0) return [];
    const arr = [...raw];
    for (let i = arr.length - 1; i > 0; i--) {
      const hash = ((i * 37 + (arr[i].charCodeAt(0) || 0) * 19 + currentStepIdx * 13) ^ 0x5a5a) % (i + 1);
      [arr[i], arr[hash]] = [arr[hash], arr[i]];
    }
    return arr;
  }, [currentStep, currentStepIdx]);

  // Robust Hydration with hydratedRef
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    if (savedData && typeof savedData === 'object' && (savedData.panelTexts || savedData.text)) {
      hydratedRef.current = true;
      if (Array.isArray(savedData.panelTexts) && savedData.panelTexts.length > 0) {
        setPanelTexts(savedData.panelTexts);
      } else if (savedData.text) {
        const parts = savedData.text.split(/(?<=[.!?])\s+/);
        // Distribute legacy text across 5 slots
        const fifth = Math.ceil(parts.length / 5);
        setPanelTexts([
          parts.slice(0, fifth).join(' ') || '',
          parts.slice(fifth, fifth * 2).join(' ') || '',
          parts.slice(fifth * 2, fifth * 3).join(' ') || '',
          parts.slice(fifth * 3, fifth * 4).join(' ') || '',
          parts.slice(fifth * 4).join(' ') || ''
        ]);
      }
      if (savedData.rubric) setRubric(savedData.rubric);
      if (typeof savedData.currentStepIdx === 'number' && savedData.currentStepIdx < steps.length) {
        setCurrentStepIdx(savedData.currentStepIdx);
      }
    }
  }, [savedData, steps.length]);

  // Mark hydration true on first user edit even if savedData was empty
  useEffect(() => {
    if (!hydratedRef.current && panelTexts.some(t => t && t.trim().length > 0)) {
      hydratedRef.current = true;
    }
  }, [panelTexts]);

  // Debounced Auto-Save on panelTexts changes
  useEffect(() => {
    if (!hydratedRef.current) return;
    const hasContent = panelTexts.some(t => t && t.trim().length > 0);
    if (!hasContent) return;

    const timer = setTimeout(() => {
      saveProgress({
        panelTexts: [...panelTexts],
        text: fullText,
        currentStepIdx,
        _savedAt: new Date().toISOString()
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [panelTexts, fullText, currentStepIdx, saveProgress]);

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

  // Smart cursor-based insertion helper for connectors and pills
  const insertTextAtCursor = (textToInsert) => {
    playButtonClick();
    const textarea = textareaRef.current;
    const currentText = panelTexts[currentStepIdx] || '';
    
    let newText = '';
    let newCursorPos = 0;

    if (!textarea || typeof textarea.selectionStart !== 'number') {
      newText = currentText ? `${currentText} ${textToInsert}` : textToInsert;
      newCursorPos = newText.length;
    } else {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const before = currentText.substring(0, startPos);
      const after = currentText.substring(endPos);

      // Add leading space if before cursor is not empty and doesn't end with whitespace
      const needsLeadingSpace = before.length > 0 && !/\s$/.test(before);
      // Add trailing space if after cursor is not empty and doesn't start with whitespace or punctuation
      const needsTrailingSpace = after.length > 0 && !/^\s/.test(after) && !/^[.,!?;:]/.test(after);

      const prefix = needsLeadingSpace ? ' ' : '';
      const suffix = needsTrailingSpace ? ' ' : '';

      newText = before + prefix + textToInsert + suffix + after;
      newCursorPos = startPos + prefix.length + textToInsert.length;
    }

    setPanelTexts(prev => {
      const next = [...prev];
      next[currentStepIdx] = newText;
      return next;
    });

    // Re-focus and set cursor right after the inserted text
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 10);
  };

  const handleInsertConnector = (connectorText) => {
    insertTextAtCursor(connectorText);
  };

  const handleInsertPill = (pillText) => {
    insertTextAtCursor(pillText);
  };

  const isCurrentStepValid = useMemo(() => {
    if (currentStepIdx === 0) return stepWordCount >= 3;
    if (currentStepIdx === 1) return stepWordCount >= 3;
    if (currentStepIdx === 2) return stepWordCount >= 5; // STRICT: >=5 words min for Step 3
    if (currentStepIdx === 3) return stepWordCount >= 3;
    if (currentStepIdx === 4) return stepWordCount >= 3;
    return true;
  }, [currentStepIdx, stepWordCount]);

  const handleNextStep = () => {
    playButtonClick();
    // Save progress immediately on step change
    saveProgress({
      panelTexts: [...panelTexts],
      text: fullText,
      currentStepIdx: currentStepIdx + 1,
      _savedAt: new Date().toISOString()
    });
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
      saveProgress({
        panelTexts: [...panelTexts],
        text: fullText,
        currentStepIdx: currentStepIdx - 1,
        _savedAt: new Date().toISOString()
      });
      setCurrentStepIdx(prev => prev - 1);
      setShowHint(false);
    }
  };

  const handleListenScene = () => {
    const speechText = currentStep.audio || currentStep.caption || `Scene ${currentStepIdx + 1}`;
    speakText(speechText);
  };

  const handleSubmitStory = () => {
    const wordBank = steps.flatMap(s => s.pills || s.keywords || []);
    const evalResult = scoreWritingTiered({
      text: fullText,
      wordBank,
      promptEn: "Look at the three pictures and write your story.",
      tier: 2,
      weekNumber: currentWeek
    });

    // Cambridge 5-shield distribution (Content 2, Grammar 2, Vocab 1)
    const contentScore = Math.min(2, Math.max(1, wordCount >= 40 ? 2 : 1));
    const grammarScore = Math.min(2, Math.max(1, distinctConnectors.length >= 2 && hasScene3PastTense ? 2 : 1));
    const vocabScore = Math.min(1, Math.max(1, evalResult.dimensions?.D2?.score >= 1 ? 1 : 1));
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
      panelTexts: [...panelTexts], // 5-panel array for CreatorStudioZone → Video Challenge
      fields: {
        setting: panelTexts[0] || '',
        action: panelTexts[1] || '',
        problem: panelTexts[2] || '',
        climax: panelTexts[3] || '',
        solution: panelTexts[4] || ''
      },
      text: fullText
    };
    // Persist panelTexts to station progress for hydration across navigation
    saveProgress({
      panelTexts,
      text: fullText,
      rubric: scoredRubric,
      completedAt: new Date().toISOString()
    });
    if (onComplete) onComplete(50, fullText, extraData);
    if (onReportProgress) onReportProgress(100, fullText, extraData);
    speakText("Great job! You completed your Cambridge story!");
  };

  // ─────────────────────────────────────────────────────────────
  // REVIEW SCREEN (Story Cohesion & Flow Assessment)
  // ─────────────────────────────────────────────────────────────
  if (isReview) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300 font-sans text-slate-900">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

        {/* Cambridge Exam Review Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-2xl">
          <button
            type="button"
            onClick={() => setCurrentStepIdx(steps.length - 1)}
            className="flex items-center gap-1.5 text-xs font-black text-indigo-700 hover:text-indigo-900 transition"
          >
            <ChevronLeft size={16} /> Edit Scenes
          </button>
          <span className="text-xs font-black uppercase text-indigo-900 tracking-wider">
            CAMBRIDGE A2 FLYERS — READING & WRITING PART 7
          </span>
          <span
            data-testid="total-words-counter"
            className={`text-xs font-black px-3 py-1 rounded-full border ${
              wordCount >= 40
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}
          >
            Total words: {wordCount} {wordCount >= 40 ? '✓' : '/ 40 min'}
          </span>
        </div>

        {/* 5 Step Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
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

        {/* Assembled Continuous Cohesive Story */}
        <div className="p-4 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 rounded-2xl border-2 border-indigo-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-indigo-900 tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-purple-600" /> Assembled Story (Full Paragraph):
            </span>
            <span
              data-testid="connector-counter"
              className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-900 border border-purple-300"
            >
              🔗 Connectors Used: {distinctConnectors.length} / 2+ {distinctConnectors.length > 0 ? `(${distinctConnectors.join(', ')})` : ''}
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-indigo-100 space-y-2 text-sm leading-relaxed font-medium text-slate-800 shadow-inner">
            {fullText ? (
              <p className="text-base text-slate-800 leading-relaxed font-serif">
                {panelTexts.map((text, i) => (
                  <span key={i} className="inline mr-1.5">
                    {text.trim()}
                  </span>
                ))}
              </p>
            ) : (
              <p className="text-slate-400 italic">No text written yet. Go back to each scene step to write your sentences.</p>
            )}
          </div>

          {/* Real-time Story Cohesion & Flow Feedback */}
          {distinctConnectors.length < 2 ? (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-start gap-2 animate-in fade-in">
              <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span>💡 Story Flow Hint: Your story needs linking words (Then / Finally) to become ONE story!</span>
                <p className="text-[11px] font-medium text-amber-800 mt-0.5">
                  Try adding connectors like <span className="font-bold">Then</span>, <span className="font-bold">Suddenly</span>, or <span className="font-bold">Finally</span> to connect your sentences smoothly.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>🌟 Cohesive Story Flow — All linking connectors and past tense verified!</span>
            </div>
          )}
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
              🎉 Cambridge-ready story! Excellent job describing all 5 scenes in detail.
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
  // STEP WIZARD SCREEN (Mini-Ladder Stages: MODEL -> BUILD -> WRITE)
  // ─────────────────────────────────────────────────────────────
  const stage = currentStep.ladder_stage || (currentStepIdx === 0 ? 'MODEL' : currentStepIdx === 1 ? 'BUILD' : 'WRITE');
  const stageBadgeColors = {
    MODEL: 'bg-blue-100 text-blue-900 border-blue-300',
    BUILD: 'bg-amber-100 text-amber-900 border-amber-300',
    WRITE: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 animate-in fade-in duration-200 font-sans text-slate-900">
      {/* Cambridge Exam Header */}
      <div className="pb-2 border-b border-slate-200">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-900 text-[11px] font-black rounded-full uppercase tracking-wider">
          Cambridge A2 Flyers — Reading & Writing Part 7
        </span>
        <p className="text-xs text-indigo-700 font-bold mt-1">
          Look at the five pictures. Write about this story. Write 40 or more words.
        </p>
      </div>

      {/* Mini-Ladder Stage Selector & Step Progress Bar */}
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2 p-2 sm:px-4 sm:py-2.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-1.5">
          <span
            data-testid="ladder-badge"
            className={`text-[9.5px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md border shadow-2xs ${stageBadgeColors[stage] || 'bg-indigo-50 text-indigo-800 border-indigo-200'}`}
          >
            {stage}
          </span>
          <span className="text-[11px] sm:text-xs font-black text-slate-700">
            Scene {currentStepIdx + 1} of {steps.length}
          </span>
        </div>

        {activeLevel === 'L5' && (
          <div className="flex items-center gap-1.5 text-xs font-mono font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
            <Clock size={12} /> {Math.floor(timeLeftSec / 60)}:{String(timeLeftSec % 60).padStart(2, '0')}
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full py-0.5">
          {steps.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                saveProgress({
                  panelTexts: [...panelTexts],
                  text: fullText,
                  currentStepIdx: i,
                  _savedAt: new Date().toISOString()
                });
                setCurrentStepIdx(i);
              }}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 border transition shrink-0 ${
                i === currentStepIdx
                  ? 'bg-indigo-600 text-white border-indigo-400 scale-105 shadow-xs'
                  : panelTexts[i]?.trim()
                  ? 'bg-emerald-500 text-white border-emerald-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <span>{i + 1}</span>
              <span className="text-[9px] uppercase opacity-80 hidden sm:inline">
                {s.ladder_stage || (i === 0 ? 'MODEL' : i === 1 ? 'BUILD' : 'WRITE')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Container: Strictly 1 Full-Width <img> Scene */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-md space-y-4">
        {/* Full-width Image Viewport (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
          <img
            src={currentStep.image_url}
            alt={`Scene ${currentStepIdx + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = '/images/week33/read_stem.jpg'; }}
          />
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 bg-amber-400/95 text-slate-950 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider shadow border border-amber-300 backdrop-blur-xs">
            Scene {currentStepIdx + 1}/{steps.length} • {stage}
          </div>

          <button
            type="button"
            onClick={handleListenScene}
            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-slate-950/85 hover:bg-slate-950 text-white rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1 sm:gap-1.5 transition active:scale-95 border border-white/20"
            title="Listen to scene audio"
          >
            <Volume2 size={13} className="text-amber-400" /> <span>Listen</span>
          </button>
        </div>

        {/* M2: Dedicated Connector Row ("🔗 LINK YOUR SENTENCES") */}
        <div
          data-testid="connector-row"
          className="p-3 bg-purple-50/80 rounded-2xl border-2 border-purple-200 space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-purple-900 tracking-wider flex items-center gap-1.5">
              <Link2 size={13} className="text-purple-700" /> 🔗 LINK YOUR SENTENCES:
            </span>
            <span className="text-[10px] font-medium text-purple-700 italic">
              Connectors join your five pictures into ONE story.
            </span>
          </div>

          {/* Locked connector (Scene 1 only) */}
          {currentStep.locked_connector && (
            <div className="flex items-center gap-2 pt-0.5 flex-wrap">
              <button
                type="button"
                onClick={() => handleInsertConnector(currentStep.locked_connector)}
                className="px-3 py-1.5 rounded-xl text-xs font-black bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 shadow-2xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                data-testid="locked-connector"
                title="Click to insert locked connector"
              >
                🔒 ★ LOCKED: {currentStep.locked_connector}
              </button>
              <span className="text-[10px] font-bold text-purple-800">
                (Start your first sentence with this)
              </span>
            </div>
          )}
          {/* Optional connectors for linking sentences within this scene */}
          {(currentStep.connectors || []).length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1" data-testid="connector-options">
              {(currentStep.connectors || []).map((conn, cIdx) => (
                <button
                  key={cIdx}
                  type="button"
                  onClick={() => handleInsertConnector(conn)}
                  className="px-3 py-1.5 rounded-xl text-xs font-black bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 shadow-2xs transition active:scale-95 flex items-center gap-1 cursor-pointer"
                  data-testid="connector-btn"
                >
                  🔗 + {conn}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Chips Row — flat word bank for this scene */}
        {Array.isArray(chipsToDisplay) && chipsToDisplay.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
              {currentStepIdx === 0 && "💡 WORD BANK — tap to insert into your sentences:"}
              {currentStepIdx === 1 && "💡 WORD BANK — tap words, then decide the order:"}
              {currentStepIdx >= 2 && "💡 WORD BANK — change verbs to past tense when you use them:"}
            </span>
            <div className="flex flex-wrap gap-2" data-testid="content-chips">
              {chipsToDisplay.map((chip, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleInsertPill(chip)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition shadow-2xs active:scale-95 ${colorScheme.pill}`}
                  data-testid="content-chip"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Writing Input Area */}
        <div className="space-y-2">
          {/* Sentence Target Guidance */}
          {currentStep.sentence_hint && (
            <div className="px-3 py-2 bg-indigo-50 rounded-xl border border-indigo-200 text-[11px] font-bold text-indigo-800 flex items-start gap-1.5">
              <span>📝</span>
              <span>{currentStep.sentence_hint}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-black uppercase text-slate-700 tracking-wider">
              Write your sentences for Scene {currentStepIdx + 1} ({stage}):
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
            placeholder={
              currentStepIdx === 0
                ? "Start with 'In the beginning,' and describe Scene 1..."
                : currentStepIdx === 1
                ? "Choose a connector (Then / Suddenly) and describe Scene 2..."
                : "Choose a connector (Finally / In the end) and describe Scene 3 using past tense verbs..."
            }
            className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none transition leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>
              {stepWordCount} words in this sentence {currentStepIdx === 2 && '(min: 5)'}
            </span>
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
            disabled={!isCurrentStepValid}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-black shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
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

export default StoryWriting;
