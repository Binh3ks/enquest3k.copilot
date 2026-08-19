/**
 * StoryWriting.jsx — Picture-prompt writing tab (W16+).
 *
 * Renders a picture and a writing area scaffolded by the tier:
 *  - Tier 1 (W16-W23): sentence frames + word bank + writing prompts
 *  - Tier 2 (W24-W35): writing prompts + word bank (no frames)
 *  - Tier 3 (W36+): free topic choice (handled by TopicMode below)
 *
 * Saves progress under stationId 'story_writing' via useStationProgress.
 * Triggers tiered rubric scoring (see writingRubric.js scoreWritingTiered).
 *
 * Implementation: see plan /Users/binhnguyen/.claude/plans/refactored-bubbling-comet.md
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart2, Star, ArrowRight, Lightbulb, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { useStationProgress } from '../../hooks/useStationProgress';
import { scoreWritingTiered } from '../../utils/writingRubric';
import { renderParsedText } from '../../components/common/HoverWord';
import { getImageUrl } from '../../utils/imageUrl';
import { evaluateCambridgeCriteria } from '../../utils/cambridgeCriteria';
import { speakText } from '../../utils/AudioHelper';

const DEFAULT_W33_PICTURE_MODE = {
  type: "picture",
  rubric_tier: 2,
  image_url: "/images/week33/read_stem.jpg",
  word_bank: ["corridor", "walking", "fast", "slipped", "wet floor", "knee", "bandage", "nurse"],
  writing_prompts: {
    en: "Look at the school corridor story picture and write a story about what happened to the running student and how Jake helped."
  }
};

const StoryWriting = ({ content, storyPrompts, themeColor, isVi, onToggleLang, onReportProgress, onGoToSpeak, onComplete, weekNumber }) => {
  const { weekId } = useParams();
  const currentWeek = parseInt(weekId) || weekNumber || 33;
  const prompts = content?.story_prompts || storyPrompts || { picture_mode: DEFAULT_W33_PICTURE_MODE };
  const pictureMode = prompts?.picture_mode || DEFAULT_W33_PICTURE_MODE;
  const topicMode = prompts?.topic_mode;

  // Saved progress lives under stationId 'story_writing'
  const { savedData, saveProgress, markComplete } = useStationProgress(currentWeek, 'story_writing');

  // Bridge: onComplete(xp, finalText) funnels into onReportProgress(percent, text)
  const handleProgress = (percent, text = '') => {
    if (onReportProgress) onReportProgress(percent, text);
    if (onComplete && percent >= 100) onComplete(50, text);
  };

  // ── Topic Mode (W36+) ─────────────────────────────────────
  if (topicMode && !pictureMode) {
    return <TopicMode topicMode={topicMode} weekId={currentWeek} savedData={savedData} saveProgress={saveProgress} markComplete={markComplete} isVi={isVi} onReportProgress={handleProgress} onGoToSpeak={onGoToSpeak} />;
  }

  return <PictureMode pictureMode={pictureMode} content={content || { story_prompts: prompts }} weekId={currentWeek} savedData={savedData} saveProgress={saveProgress} markComplete={markComplete} isVi={isVi} onReportProgress={handleProgress} onGoToSpeak={onGoToSpeak} themeColor={themeColor} />;
};

// ─────────────────────────────────────────────────────────────
// PictureMode — Tier 1 & Tier 2 (W16-W35)
// ─────────────────────────────────────────────────────────────

const PictureMode = ({ pictureMode, content, weekId, savedData, saveProgress, markComplete, isVi, onReportProgress, onGoToSpeak, themeColor = 'pink' }) => {
  const currentW = parseInt(weekId, 10) || 16;
  const tier = pictureMode.rubric_tier || 1;

  // State for structured input (Tier 1 & Tier 2) vs freeform (Tier 3)
  const isStructured = tier < 3;
  const [settingText, setSettingText] = useState(savedData?.fields?.setting || '');
  const [actionText, setActionText] = useState(savedData?.fields?.action || '');
  const [problemText, setProblemText] = useState(savedData?.fields?.problem || '');
  const [solutionText, setSolutionText] = useState(savedData?.fields?.solution || '');

  // Main text is assembled from fields when structured, or single text state when freeform (Tier 3)
  const [freeformText, setFreeformText] = useState(savedData?.text || '');

  const text = isStructured
    ? [settingText, actionText, problemText, solutionText].map(s => s.trim()).filter(Boolean).join(' ')
    : freeformText;

  const [imgSrc, setImgSrc] = useState('');
  const [imgFailed, setImgFailed] = useState(false);
  const [rubric, setRubric] = useState(savedData?.rubric || null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);
  const [showModelText, setShowModelText] = useState(false);

  // Field completeness check for structured mode
  const allPartsWritten = isStructured
    ? (settingText.trim().length >= 5 && actionText.trim().length >= 5 && problemText.trim().length >= 5 && solutionText.trim().length >= 5)
    : true;

  // W66+ Exam Mode Timer (10 mins = 600s)
  const isExamMode = currentW >= 66;
  const [timeLeftSec, setTimeLeftSec] = useState(savedData?.timeLeftSec ?? 600);
  const [timerStarted, setTimerStarted] = useState(savedData?.timerStarted ?? false);

  useEffect(() => {
    if (!isExamMode || !timerStarted || timeLeftSec <= 0) return;
    const interval = setInterval(() => {
      setTimeLeftSec(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamMode, timerStarted, timeLeftSec]);

  // Hydrate from saved progress
  useEffect(() => {
    if (savedData?.fields && isStructured) {
      if (savedData.fields.setting) setSettingText(savedData.fields.setting);
      if (savedData.fields.action) setActionText(savedData.fields.action);
      if (savedData.fields.problem) setProblemText(savedData.fields.problem);
      if (savedData.fields.solution) setSolutionText(savedData.fields.solution);
    } else if (savedData?.text) {
      if (!isStructured) {
        setFreeformText(savedData.text);
      } else {
        setSettingText(savedData.text);
      }
    }
    if (savedData?.rubric) setRubric(savedData.rubric);
  }, [weekId, savedData]);

  // Cambridge criteria evaluation
  const cambridgeEval = useMemo(() => {
    return evaluateCambridgeCriteria(text, currentW, pictureMode.word_bank);
  }, [text, currentW, pictureMode.word_bank]);

  // Debounced auto-save
  useEffect(() => {
    const t = setTimeout(() => {
      const isComplete = (cambridgeEval.isAllMet || (!!rubric && rubric.total >= 6)) && allPartsWritten;
      const percent = isComplete ? 100 : (cambridgeEval.wordCount > 10 ? 40 : 0);
      saveProgress({
        text,
        fields: isStructured ? { setting: settingText, action: actionText, problem: problemText, solution: solutionText } : null,
        rubric,
        timeLeftSec,
        timerStarted,
      }, isComplete, Math.round(percent));
      if (isComplete) {
        markComplete(Math.round(percent));
      }
      if (onReportProgress) onReportProgress(Math.round(percent), text, {
        structured: isStructured,
        fields: isStructured ? { setting: settingText, action: actionText, problem: problemText, solution: solutionText } : null
      });
    }, 1500);
    return () => clearTimeout(t);
  }, [text, settingText, actionText, problemText, solutionText, rubric, cambridgeEval.isAllMet, allPartsWritten, timeLeftSec, timerStarted]);

  // Image resolution
  useEffect(() => {
    if (!pictureMode?.image_url) { setImgFailed(true); return; }
    const initialUrl = getImageUrl(pictureMode.image_url);
    setImgSrc(initialUrl);
    setImgFailed(false);
  }, [pictureMode?.image_url, weekId]);

  const handleImgError = useCallback(() => {
    if (imgSrc !== '/images/week33/read_stem.jpg') {
      setImgSrc('/images/week33/read_stem.jpg');
      setImgFailed(false);
    } else {
      setImgFailed(true);
    }
  }, [imgSrc]);

  const handleSubmit = () => {
    const wordBankArray = Array.isArray(pictureMode.word_bank)
      ? pictureMode.word_bank
      : [
          ...(pictureMode.word_bank?.action_verbs || []),
          ...(pictureMode.word_bank?.connectors || []),
          ...(pictureMode.word_bank?.cumulative_chunks || []),
        ];

    const result = scoreWritingTiered({
      text,
      wordBank: wordBankArray,
      promptEn: pictureMode.writing_prompts?.en || '',
      tier,
      weekNumber: weekId,
    });
    setRubric(result);
    if (result.total >= 8 || cambridgeEval.isAllMet) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    // Data contract v2: pass payload up to parent (→ CreatorStudioZone → Broadcast Studio)
    if (onReportProgress) onReportProgress(100, text, {
      structured: isStructured,
      fields: isStructured ? {
        setting: settingText.trim(),
        action: actionText.trim(),
        problem: problemText.trim(),
        solution: solutionText.trim(),
      } : null
    });
  };

  // Extract word bank groups (4 groups)
  const isCategorizedWordBank = pictureMode.word_bank && typeof pictureMode.word_bank === 'object' && !Array.isArray(pictureMode.word_bank);
  const actionVerbs = isCategorizedWordBank ? (pictureMode.word_bank.action_verbs || []) : [];
  const cumulativeChunks = isCategorizedWordBank ? (pictureMode.word_bank.cumulative_chunks || []) : [];
  const connectors = isCategorizedWordBank ? (pictureMode.word_bank.connectors || []) : [];
  const grammarBoosters = isCategorizedWordBank ? (pictureMode.word_bank.grammar_boosters || []) : [];
  const flatWordBank = Array.isArray(pictureMode.word_bank) ? pictureMode.word_bank : [];

  const fallback3Panels = [
    { panel: 1, image_url: "/images/week33/read_stem.jpg", caption: "Jake walking in corridor" },
    { panel: 2, image_url: "/images/scenes/default_story.jpg", caption: "Boy slipping on wet floor" },
    { panel: 3, image_url: "/images/week33/read_stem.jpg", caption: "Nurse applying clean bandage" }
  ];

  const pictureSet = (Array.isArray(pictureMode.picture_set) && pictureMode.picture_set.length > 0)
    ? pictureMode.picture_set
    : (Array.isArray(pictureMode.panels) && pictureMode.panels.length > 0)
      ? pictureMode.panels
      : (Array.isArray(pictureMode.picture_story) && pictureMode.picture_story.length > 0)
        ? pictureMode.picture_story
        : fallback3Panels;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Top Bar: Exam Mode Timer (W66+) */}
      {isExamMode && (
        <div className="flex-shrink-0 bg-gradient-to-r from-rose-600 to-red-700 text-white px-4 py-2 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider">
              {isVi ? 'TIMED WRITING CHALLENGE (10 MINS)' : 'TIMED WRITING CHALLENGE (10 MINS)'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-black bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/30">
              {Math.floor(timeLeftSec / 60)}:{String(timeLeftSec % 60).padStart(2, '0')}
            </span>
            {!timerStarted && (
              <button
                onClick={() => setTimerStarted(true)}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-lg shadow"
              >
                {isVi ? 'Bắt đầu làm bài' : 'Start Exam'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Story Picture(s) — 3-Panel Cambridge Picture Set */}
      <div className="flex-shrink-0 bg-gradient-to-b from-slate-100 to-white p-3 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { panel: 1, image_url: "/images/week33/writing_panel_1.png", caption: "Jake walking in school corridor" },
            { panel: 2, image_url: "/images/week33/writing_panel_2.png", caption: "Boy slipping on wet floor" },
            { panel: 3, image_url: "/images/week33/writing_panel_3.png", caption: "Nurse applying clean bandage" }
          ].map((p, idx) => {
            const panelImg = (pictureSet && pictureSet[idx]?.image_url) || p.image_url;
            const captionText = (pictureSet && (pictureSet[idx]?.caption || pictureSet[idx]?.title_en)) || p.caption;

            return (
              <div key={idx} className="bg-white p-2 rounded-2xl border-2 border-indigo-200 shadow-md flex flex-col items-center hover:scale-[1.02] transition">
                <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={panelImg}
                    alt={`Panel ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/images/week33/writing_panel_${idx + 1}.png`;
                    }}
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded-md text-[10px] font-black uppercase tracking-wider shadow border border-amber-300">
                    Panel {idx + 1}
                  </span>
                </div>
                <span className="text-xs font-black text-slate-800 mt-2 text-center truncate w-full px-1">
                  {captionText}
                </span>
              </div>
            );
          })}
        </div>

        {/* Writing prompts */}
        <div className="mt-2 bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100">
          <p className="text-[10px] font-black uppercase text-indigo-700 mb-0.5 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" />
            {isVi ? 'Gợi Ý Viết Truyện' : 'Story Writing Prompt'}
          </p>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            {isVi ? (pictureMode.writing_prompts?.vi || '') : renderParsedText(pictureMode.writing_prompts?.en || '', 'indigo')}
          </p>
        </div>
      </div>

      {/* 💡 MODEL STORY EXAMPLE & COLLOCATION CHUNKS ECOSYSTEM */}
      {(!isExamMode || timerStarted) && (
        <div className="flex-shrink-0 px-3 py-2.5 bg-indigo-50/70 border-b border-indigo-200 space-y-2.5 shadow-sm">
          {/* Model Example Header */}
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="text-[10px] font-black uppercase text-indigo-900 tracking-wider flex items-center gap-1">
              💡 Model Story Example (Audio-First):
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => speakText("Jake was walking carefully down the school corridor after science class. Suddenly, a boy slipped on the wet floor and hurt his knee. The school nurse arrived quickly with a clean bandage to help.")}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-[10px] font-black flex items-center gap-1 transition shadow-xs"
              >
                🔊 Listen Model Audio
              </button>
              <button
                type="button"
                onClick={() => setShowModelText(!showModelText)}
                className="px-2.5 py-1 bg-white hover:bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md text-[10px] font-bold transition shadow-xs"
              >
                {showModelText ? '🙈 Hide Text' : '👁️ Reveal Text Hint'}
              </button>
            </div>
          </div>

          {/* Collapsible Model Text */}
          {showModelText ? (
            <p className="text-xs text-indigo-950 font-medium italic leading-relaxed bg-white/90 p-2.5 rounded-xl border border-indigo-200 animate-in fade-in">
              &ldquo;Jake <span className="text-emerald-700 font-bold underline">was walking carefully</span> <span className="text-blue-700 font-bold underline">down the school corridor</span>. Suddenly, a boy <span className="text-amber-700 font-bold underline">slipped on the wet floor</span>. The school nurse <span className="text-purple-700 font-bold underline">arrived with a clean bandage</span> to help.&rdquo;
            </p>
          ) : (
            <p className="text-[11px] text-indigo-700 font-medium italic bg-white/50 px-2.5 py-1.5 rounded-lg border border-indigo-100 flex items-center justify-between">
              <span>🎧 Listen to the model audio above, then write using your own words below!</span>
              <span className="text-[10px] font-bold text-indigo-500">(Text hidden to prevent copy-pasting)</span>
            </p>
          )}

          {/* 4 Multi-Word Collocation & Chunk Groups (Clickable to Insert) */}
          <div className="space-y-1.5 pt-1 border-t border-indigo-200/60">
            <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider">
              🎯 Tap Chunks & Collocations to Insert:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {/* 🔵 Setting Chunks */}
              <div className="p-2 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-blue-900 block">🔵 Setting & Time:</span>
                <div className="flex flex-wrap gap-1">
                  {["After science class", "down the school corridor", "On a Monday morning"].map((c, i) => (
                    <button key={i} type="button" onClick={() => isStructured ? setSettingText(prev => prev ? `${prev} ${c}` : c) : setFreeformText(prev => prev ? `${prev} ${c}` : c)}
                      className="px-2 py-0.5 bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 rounded-md text-[10px] font-bold transition active:scale-95 text-left shadow-xs">
                      + {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🟢 Action Chunks */}
              <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-emerald-900 block">🟢 Action & Manner:</span>
                <div className="flex flex-wrap gap-1">
                  {["was walking carefully", "was running very fast", "stopped immediately to help"].map((c, i) => (
                    <button key={i} type="button" onClick={() => isStructured ? setActionText(prev => prev ? `${prev} ${c}` : c) : setFreeformText(prev => prev ? `${prev} ${c}` : c)}
                      className="px-2 py-0.5 bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-md text-[10px] font-bold transition active:scale-95 text-left shadow-xs">
                      + {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🟠 Problem Chunks */}
              <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-amber-900 block">🟠 Problem & Hazard:</span>
                <div className="flex flex-wrap gap-1">
                  {["slipped on the wet floor", "fell down heavily", "hurt his knee badly"].map((c, i) => (
                    <button key={i} type="button" onClick={() => isStructured ? setProblemText(prev => prev ? `${prev} ${c}` : c) : setFreeformText(prev => prev ? `${prev} ${c}` : c)}
                      className="px-2 py-0.5 bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-md text-[10px] font-bold transition active:scale-95 text-left shadow-xs">
                      + {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🟣 Solution Chunks */}
              <div className="p-2 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                <span className="text-[9px] font-black uppercase text-purple-900 block">🟣 Solution & Care:</span>
                <div className="flex flex-wrap gap-1">
                  {["called the school nurse", "with a clean bandage", "felt deeply relieved"].map((c, i) => (
                    <button key={i} type="button" onClick={() => isStructured ? setSolutionText(prev => prev ? `${prev} ${c}` : c) : setFreeformText(prev => prev ? `${prev} ${c}` : c)}
                      className="px-2 py-0.5 bg-white hover:bg-purple-100 text-purple-950 border border-purple-300 rounded-md text-[10px] font-bold transition active:scale-95 text-left shadow-xs">
                      + {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4 Structured Input Boxes OR Single Freeform Box */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-3">
        {isStructured ? (
          <div className="space-y-3">
            {/* 🔵 1. SETTING */}
            <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider flex items-center gap-1">
                  🔵 1. SETTING — Where and when does your story begin?
                </span>
                {settingText.trim().length >= 5 && <span className="text-[10px] font-bold text-emerald-600">✓ Complete</span>}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {["After science class,", "Down the school corridor,", "On a sunny Monday morning,"].slice(0, tier === 1 ? 3 : 1).map((starter, sIdx) => (
                  <button key={sIdx} type="button" onClick={() => setSettingText(prev => prev ? `${prev} ${starter}` : starter)}
                    className="px-2 py-0.5 bg-white hover:bg-blue-100 text-blue-950 border border-blue-300 rounded-md text-[10px] font-bold transition active:scale-95">
                    + {starter}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                value={settingText}
                onChange={e => setSettingText(e.target.value)}
                placeholder="Write sentence 1: Describe the setting (e.g. After science class, Jake was in the school corridor...)"
                className="w-full p-2.5 bg-white border border-blue-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* 🟢 2. ACTION */}
            <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1">
                  🟢 2. ACTION — What was happening in the story?
                </span>
                {actionText.trim().length >= 5 && <span className="text-[10px] font-bold text-emerald-600">✓ Complete</span>}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {["Jake was walking carefully,", "A student was running fast,", "Everyone was moving,"].slice(0, tier === 1 ? 3 : 1).map((starter, sIdx) => (
                  <button key={sIdx} type="button" onClick={() => setActionText(prev => prev ? `${prev} ${starter}` : starter)}
                    className="px-2 py-0.5 bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-md text-[10px] font-bold transition active:scale-95">
                    + {starter}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                value={actionText}
                onChange={e => setActionText(e.target.value)}
                placeholder="Write sentence 2: What were the characters doing? (e.g. Jake was walking carefully down the corridor...)"
                className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* 🟠 3. PROBLEM */}
            <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
                  🟠 3. PROBLEM — What went wrong? What was the hazard?
                </span>
                {problemText.trim().length >= 5 && <span className="text-[10px] font-bold text-emerald-600">✓ Complete</span>}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {["Suddenly, a student slipped on the wet floor,", "Unexpectedly, he fell down heavily,", "All of a sudden, someone lost their balance,"].slice(0, tier === 1 ? 3 : 1).map((starter, sIdx) => (
                  <button key={sIdx} type="button" onClick={() => setProblemText(prev => prev ? `${prev} ${starter}` : starter)}
                    className="px-2 py-0.5 bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-md text-[10px] font-bold transition active:scale-95">
                    + {starter}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                value={problemText}
                onChange={e => setProblemText(e.target.value)}
                placeholder="Write sentence 3: What problem occurred? (e.g. Suddenly, a boy slipped on the wet floor and hurt his knee...)"
                className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* 🟣 4. SOLUTION */}
            <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-purple-900 tracking-wider flex items-center gap-1">
                  🟣 4. SOLUTION — How was it solved or fixed?
                </span>
                {solutionText.trim().length >= 5 && <span className="text-[10px] font-bold text-emerald-600">✓ Complete</span>}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {["The school nurse arrived quickly,", "Immediately, Jake helped his friend,", "Fortunately, a clean bandage was applied,"].slice(0, tier === 1 ? 3 : 1).map((starter, sIdx) => (
                  <button key={sIdx} type="button" onClick={() => setSolutionText(prev => prev ? `${prev} ${starter}` : starter)}
                    className="px-2 py-0.5 bg-white hover:bg-purple-100 text-purple-950 border border-purple-300 rounded-md text-[10px] font-bold transition active:scale-95">
                    + {starter}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                value={solutionText}
                onChange={e => setSolutionText(e.target.value)}
                placeholder="Write sentence 4: How was the situation resolved? (e.g. The school nurse arrived with a clean bandage...)"
                className="w-full p-2.5 bg-white border border-purple-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* 📖 LIVE PREVIEW (Assembled 4 parts with soft pastel source highlighting) */}
            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-slate-300 space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                📖 LIVE STORY PREVIEW (Auto-assembled from your 4 parts above):
              </span>
              {text.trim().length === 0 ? (
                <p className="text-xs text-slate-400 italic">Your complete story will appear here as you fill out the 4 parts above…</p>
              ) : (
                <div className="text-xs leading-relaxed font-medium text-slate-900 flex flex-wrap gap-1">
                  {settingText.trim() && <span className="bg-blue-100/80 text-blue-950 px-1.5 py-0.5 rounded-md border border-blue-200">{settingText.trim()}</span>}
                  {actionText.trim() && <span className="bg-emerald-100/80 text-emerald-950 px-1.5 py-0.5 rounded-md border border-emerald-200">{actionText.trim()}</span>}
                  {problemText.trim() && <span className="bg-amber-100/80 text-amber-950 px-1.5 py-0.5 rounded-md border border-amber-200">{problemText.trim()}</span>}
                  {solutionText.trim() && <span className="bg-purple-100/80 text-purple-950 px-1.5 py-0.5 rounded-md border border-purple-200">{solutionText.trim()}</span>}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Tier 3 Single Freeform Box */
          <div className="relative flex-1 flex flex-col">
            <textarea
              value={freeformText}
              onChange={e => setFreeformText(e.target.value)}
              disabled={isExamMode && !timerStarted}
              placeholder={isVi ? 'Viết toàn bộ câu chuyện tự do của bạn ở đây...' : 'Write your full story script here...'}
              className="w-full flex-1 min-h-[180px] p-3 bg-white border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none resize-y text-sm leading-relaxed text-slate-800 font-normal shadow-inner"
            />
          </div>
        )}

        {/* Real-time Criteria Checker Display */}
        <div className="mt-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-black uppercase text-indigo-700 tracking-wider">
              🏆 Story Criteria Checker (W{currentW})
            </span>
            <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${cambridgeEval.isAllMet && allPartsWritten ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {cambridgeEval.isAllMet && allPartsWritten ? '✓ All Criteria Qualified' : '→ In Progress'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {/* Metric 1: Word Count */}
            <div className={`p-2 rounded-lg border text-center ${cambridgeEval.metWords ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Target Words</p>
              <p className="text-xs font-black">{cambridgeEval.wordCount}/{cambridgeEval.targetWords}</p>
              <p className="text-[9px] font-bold">{cambridgeEval.metWords ? '✓ Target Met' : `Need ${Math.max(0, cambridgeEval.targetWords - cambridgeEval.wordCount)} more`}</p>
            </div>

            {/* Metric 2: Connectors */}
            <div className={`p-2 rounded-lg border text-center ${cambridgeEval.metConnectors ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Connectors</p>
              <p className="text-xs font-black">{cambridgeEval.connectorsFound.length}/{cambridgeEval.minConnectors}</p>
              <p className="text-[9px] font-bold">{cambridgeEval.metConnectors ? '✓ Transition Met' : `Need ${cambridgeEval.minConnectors}+ connectors`}</p>
            </div>

            {/* Metric 3: Past Continuous */}
            <div className={`p-2 rounded-lg border text-center ${cambridgeEval.metPastContinuous ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Past Continuous</p>
              <p className="text-xs font-black">{cambridgeEval.hasPastContinuous ? 'was/were V-ing' : 'None'}</p>
              <p className="text-[9px] font-bold">{cambridgeEval.metPastContinuous ? '✓ Grammar Met' : 'Require was/were + V-ing'}</p>
            </div>

            {/* Metric 4: Advanced Chunks */}
            <div className={`p-2 rounded-lg border text-center ${cambridgeEval.metChunks ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Advanced Chunks</p>
              <p className="text-xs font-black">{cambridgeEval.chunksFound?.length || 0} Found</p>
              <p className="text-[9px] font-bold">{cambridgeEval.metChunks ? '✓ Chunks Met' : 'Add 1+ learned chunk'}</p>
            </div>

            {/* Metric 5: 4 Parts Written (Structured Mode Only) */}
            <div className={`p-2 rounded-lg border text-center ${allPartsWritten ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase">4 Story Parts</p>
              <p className="text-xs font-black">{isStructured ? `${[settingText, actionText, problemText, solutionText].filter(s => s.trim().length >= 5).length}/4 Parts` : 'Freeform'}</p>
              <p className="text-[9px] font-bold">{allPartsWritten ? '✓ Complete' : 'Fill all 4 boxes'}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={handleSubmit}
              disabled={!allPartsWritten}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow"
            >
              <BarChart2 size={13} />
              {isVi ? 'Chấm Điểm Cambridge' : 'Score Cambridge'}
            </button>

            <button
              onClick={onGoToSpeak}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow"
            >
              {isVi ? 'Chuyển Kể Chuyện (Tab 3)' : 'Tell Story (Tab 3)'} <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

        {/* Rubric result */}
        {rubric && (
          <div className="mt-3 bg-white border-2 border-emerald-200 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <BarChart2 size={14} className="text-emerald-600" />
                <span className="font-black text-emerald-800 uppercase text-xs">
                  {isVi ? 'Kết quả' : 'Score'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {rubric.badge && (
                  <span className="flex items-center gap-1 text-[10px] font-black bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                    <Star size={10} className="fill-yellow-500 text-yellow-500" />
                    {rubric.badge}
                  </span>
                )}
                <span className={`text-xl font-black ${
                  rubric.tier === 'excellent' ? 'text-yellow-600' :
                  rubric.tier === 'good' ? 'text-green-600' : 'text-rose-600'
                }`}>
                  {rubric.total}<span className="text-xs text-slate-400">/{rubric.maxTotal}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(rubric.dimensions).map(([key, dim]) => {
                const labels = { D1: '📋 Task', D2: '📚 Vocab', D3: '✏️ Grammar', D4: '🔗 Link' };
                const colors = { 3: 'bg-green-100 text-green-700', 2: 'bg-amber-100 text-amber-700', 1: 'bg-rose-100 text-rose-700' };
                return (
                  <div key={key} className={`rounded-lg p-2 ${colors[dim.score] || 'bg-slate-100'}`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-black uppercase">{labels[key]}</span>
                      <span className="text-[10px] font-black">{dim.score}/3</span>
                    </div>
                    <p className="text-[9px] leading-relaxed opacity-80">{dim.descriptor}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-[9px] font-black uppercase text-slate-400 mb-0.5">
                {isVi ? 'Nhận xét' : 'Feedback'}
              </p>
              <p className="text-[11px] text-slate-700 font-medium leading-relaxed">{rubric.feedback}</p>
            </div>

            {rubric.total >= 8 && (
              <div className="text-center bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-2 border border-amber-200">
                <p className="text-[10px] text-amber-700 font-black">
                  {isVi ? '🎉 Bạn đã unlock thẻ Story Writer mới!' : '🎉 You unlocked a new Story Writer card!'}
                </p>
              </div>
            )}
          </div>
        )}

      {/* Image lightbox overlay */}
      {imgZoomed && imgSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setImgZoomed(false)}
        >
          <button
            onClick={() => setImgZoomed(false)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white text-xl font-bold hover:bg-white/40 z-10"
          >
            ✕
          </button>
          <img
            src={imgSrc}
            alt={isVi ? 'Tranh viết truyện' : 'Story prompt picture'}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// TopicMode — Tier 3 (W36+): 2-3 topics, free choice, no time limit
// ─────────────────────────────────────────────────────────────

const TopicMode = ({ topicMode, weekId, savedData, saveProgress, markComplete, isVi, onReportProgress, onGoToSpeak }) => {
  const topics = topicMode.topics || [];
  const [selectedTopicId, setSelectedTopicId] = useState(savedData?.topicId || null);
  const [text, setText] = useState(savedData?.text || '');
  const [rubric, setRubric] = useState(savedData?.rubric || null);

  useEffect(() => {
    if (savedData?.topicId) setSelectedTopicId(savedData.topicId);
    if (savedData?.text) setText(savedData.text);
    if (savedData?.rubric) setRubric(savedData.rubric);
  }, [weekId]);

  // Debounced auto-save
  useEffect(() => {
    if (!selectedTopicId) return;
    const t = setTimeout(() => {
      const isComplete = !!rubric && rubric.total >= 6;
      const percent = rubric ? rubric.total * (100 / rubric.maxTotal) : (text.length > 10 ? 30 : 0);
      saveProgress({ topicId: selectedTopicId, text, rubric }, isComplete, Math.round(percent));
      if (onReportProgress) onReportProgress(Math.round(percent));
    }, 1500);
    return () => clearTimeout(t);
  }, [text, rubric, selectedTopicId]);

  const selectedTopic = topics.find(t => t.id === selectedTopicId);
  const wordCount = useMemo(() => (text || '').trim().split(/\s+/).filter(Boolean).length, [text]);

  const handleSubmit = () => {
    if (wordCount < 10 || !selectedTopic) return;
    const result = scoreWritingTiered({
      text,
      wordBank: selectedTopic.word_bank || [],
      promptEn: selectedTopic.en || '',
      tier: 3,
      weekNumber: weekId,
    });
    setRubric(result);
  };

  if (topics.length === 0) {
    return (
      <div className="p-10 text-center text-slate-400 font-black italic">
        {isVi ? 'Chưa có chủ đề nào' : 'No topics available yet.'}
      </div>
    );
  }

  // Topic selection screen
  if (!selectedTopicId) {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-black text-slate-800 uppercase">
          {isVi ? 'Chọn chủ đề' : 'Choose a topic'}
        </h2>
        <p className="text-xs text-slate-500">
          {isVi ? 'Chọn 1 trong các chủ đề sau để viết' : 'Pick one of the following topics to write about'}
        </p>
        {topics.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
            className="w-full text-left p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl hover:border-amber-400 transition-all"
          >
            <p className="font-black text-slate-800 mb-1">{topic.title_en}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{isVi ? topic.vi : topic.en}</p>
          </button>
        ))}
      </div>
    );
  }

  // Writing screen
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 bg-gradient-to-b from-amber-50 to-white p-3 border-b border-amber-100">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-black uppercase text-amber-600">
            {isVi ? 'Chủ đề' : 'Topic'}
          </p>
          <button onClick={() => setSelectedTopicId(null)} className="text-[10px] text-slate-500 underline">
            {isVi ? 'Đổi' : 'Change'}
          </button>
        </div>
        <p className="text-sm font-black text-amber-900 mb-1">{selectedTopic.title_en}</p>
        <p className="text-xs text-amber-800 leading-relaxed">{isVi ? selectedTopic.vi : selectedTopic.en}</p>

        {selectedTopic.word_bank && selectedTopic.word_bank.length > 0 && (
          <div className="mt-2">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
              {isVi ? '💡 Từ vựng (tự gõ vào)' : '💡 Word bank — use these in your writing'}
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
              {selectedTopic.word_bank.map((w, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-white border border-amber-200 text-amber-800 text-[10px] font-medium rounded-full"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={isVi ? 'Viết bài của em ở đây...' : 'Write your essay here...'}
          className="w-full min-h-[200px] p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-400 outline-none resize-none text-sm leading-relaxed text-slate-700"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-bold text-slate-400">
            {wordCount} {isVi ? 'từ' : 'words'}
          </span>
          <div className="flex items-center gap-2">
            {wordCount >= 10 && (
              <button
                onClick={handleSubmit}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
              >
                <BarChart2 size={13} />
                {isVi ? 'Chấm điểm' : 'Score'}
              </button>
            )}
            {rubric && rubric.total >= 6 && onGoToSpeak && (
              <button
                onClick={onGoToSpeak}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
              >
                {isVi ? 'Kể' : 'Speak'} <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>

        {rubric && (
          <div className="mt-3 bg-white border-2 border-emerald-200 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-emerald-800 uppercase text-xs">
                {isVi ? 'Kết quả' : 'Score'}
              </span>
              <span className={`text-xl font-black ${
                rubric.tier === 'excellent' ? 'text-yellow-600' :
                rubric.tier === 'good' ? 'text-green-600' : 'text-rose-600'
              }`}>
                {rubric.total}<span className="text-xs text-slate-400">/{rubric.maxTotal}</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(rubric.dimensions).map(([key, dim]) => {
                const labels = { D1: '📋 Task', D2: '📚 Vocab', D3: '✏️ Grammar', D4: '🔗 Link' };
                const colors = { 3: 'bg-green-100 text-green-700', 2: 'bg-amber-100 text-amber-700', 1: 'bg-rose-100 text-rose-700' };
                return (
                  <div key={key} className={`rounded-lg p-2 ${colors[dim.score] || 'bg-slate-100'}`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-black uppercase">{labels[key]}</span>
                      <span className="text-[10px] font-black">{dim.score}/3</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <p className="text-[10px] text-slate-700 font-medium">{rubric.feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryWriting;
