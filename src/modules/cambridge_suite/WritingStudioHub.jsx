import React, { useState } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { PenTool, Sparkles, CheckCircle2, AlertTriangle, Layers, Film } from 'lucide-react';

export default function WritingStudioHub({ data, weekNumber = 33 }) {
  const [userScript, setUserScript] = useState('');
  const [ruleScore, setRuleScore] = useState(null);
  const [aiScore, setAiScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const picturePanels = data?.picture_story || data?.picturePanels || [
    {
      panel_id: 'panel_1',
      title_en: 'Panel 1: Running in the Living Room',
      title_vi: 'Cảnh 1: Chạy Nhảy Trong Phòng Khách',
      image_url: '/images/week33/writing_panel_1.png'
    },
    {
      panel_id: 'panel_2',
      title_en: 'Panel 2: Accidental Crash',
      title_vi: 'Cảnh 2: Va Chạm Vô Tình',
      image_url: '/images/week33/writing_panel_2.png'
    },
    {
      panel_id: 'panel_3',
      title_en: 'Panel 3: Apologizing and Cleaning',
      title_vi: 'Cảnh 3: Xin Lỗi Và Dọn Dẹp',
      image_url: '/images/week33/writing_panel_3.png'
    }
  ];

  const wordBankPills = data?.word_bank_pills || data?.wordBankPills || {
    action_verbs: ['broke', 'fell', 'lost', 'found', 'slipped', 'spilled', 'dropped', 'apologized'],
    connectors: ['first', 'suddenly', 'finally', 'while', 'because', 'although', 'so'],
    cumulative_chunks: ['broke a flower vase', 'slipped on the floor', 'apologized to mom', 'cleaned up carefully'],
    grammar_boosters: ['was playing', 'were climbing', 'had realized', 'was searching']
  };

  // Tap-to-insert pill helper
  const handleInsertPill = (word) => {
    setUserScript((prev) => (prev ? `${prev} ${word}` : word));
  };

  // Layer 1: Rule-based client-side checker
  const handleAnalyzeScript = async () => {
    setIsAnalyzing(true);
    const textLower = userScript.toLowerCase();

    // Past tense verb detection
    const pastVerbs = ['broke', 'fell', 'lost', 'found', 'slipped', 'spilled', 'tore', 'hurt', 'dropped', 'apologized'];
    const matchedVerbs = pastVerbs.filter((v) => textLower.includes(v));

    // Connectors detection
    const connectors = ['first', 'suddenly', 'finally', 'while', 'because', 'although', 'when', 'so', 'however'];
    const matchedConnectors = connectors.filter((c) => textLower.includes(c));

    const wordCount = userScript.trim().split(/\s+/).filter(Boolean).length;

    const layer1Result = {
      wordCount,
      pastVerbsCount: matchedVerbs.length,
      connectorsCount: matchedConnectors.length,
      matchedVerbs,
      matchedConnectors,
      isRulePass: matchedVerbs.length >= 2 && wordCount >= 20
    };

    setRuleScore(layer1Result);

    // Layer 2: Simulated AI Content Feedback (with mandatory practice_only tag)
    setTimeout(async () => {
      const calculatedMovieScore = Math.min(100, Math.max(50, wordCount * 2 + matchedVerbs.length * 10));

      const layer2Result = {
        movieQualityScore: calculatedMovieScore,
        aiFeedbackText: 'Great story! Your narrative flows smoothly across all 3 picture panels. Try adding more connecting words for a higher score.',
        verificationStatus: 'practice_only' // MANDATORY PRACTICE ONLY TAG
      };

      setAiScore(layer2Result);
      setIsAnalyzing(false);

      // Log attempt
      await learnerProgressService.logAttempt({
        learnerId: 'learner_default_01',
        contentId: `w${weekNumber}_writing_p7`,
        mode: 'learn',
        result: layer1Result.isRulePass ? 'correct' : 'incorrect',
        score: calculatedMovieScore,
        timeSpentSeconds: 60
      });
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <span className="px-3.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <PenTool size={14} /> Hub 3: Studio Storyteller — Writing Part 7 (W{weekNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            3-Picture Story Scriptwriter
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Write a complete story script based on 3 Pixar 3D visual story panels!</p>
        </div>

        <div className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-xl text-xs font-black border border-amber-200 flex items-center gap-1.5 shadow-sm">
          <AlertTriangle size={14} /> Status: practice_only
        </div>
      </div>

      {/* 3 Pixar 3D Picture Panels Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {picturePanels.map((panel, idx) => (
          <div key={panel.panel_id || idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden flex flex-col">
            <div className="relative w-full h-48 bg-slate-200 rounded-xl overflow-hidden mb-3 border border-slate-300">
              <img
                src={panel.image_url}
                alt={panel.title_en || `Panel ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 px-2.5 py-1 bg-slate-900/80 text-white font-black text-[10px] rounded-lg backdrop-blur-md">
                Panel {idx + 1}
              </span>
            </div>
            <h4 className="text-xs font-black text-slate-900 truncate">{panel.title_en}</h4>
            <p className="text-[10px] text-slate-500 italic mt-0.5 truncate">{panel.title_vi}</p>
          </div>
        ))}
      </div>

      {/* 4-Color Word Bank Pills */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-purple-600" /> Word Bank Pills (Click to insert into script):
          </h4>
          <span className="text-[10px] text-slate-500 font-bold">4 Color-Coded Categories</span>
        </div>

        {/* Action Verbs Pills (Blue) */}
        <div className="flex flex-wrap gap-1.5">
          {wordBankPills.action_verbs?.map((word) => (
            <button
              key={word}
              onClick={() => handleInsertPill(word)}
              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-black rounded-lg border border-blue-200 transition active:scale-95 shadow-sm"
            >
              + {word}
            </button>
          ))}
        </div>

        {/* Connectors Pills (Purple) */}
        <div className="flex flex-wrap gap-1.5">
          {wordBankPills.connectors?.map((word) => (
            <button
              key={word}
              onClick={() => handleInsertPill(word)}
              className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-black rounded-lg border border-purple-200 transition active:scale-95 shadow-sm"
            >
              + {word}
            </button>
          ))}
        </div>

        {/* Cumulative Chunks Pills (Amber) */}
        <div className="flex flex-wrap gap-1.5">
          {wordBankPills.cumulative_chunks?.map((chunk) => (
            <button
              key={chunk}
              onClick={() => handleInsertPill(chunk)}
              className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black rounded-lg border border-amber-300 transition active:scale-95 shadow-sm"
            >
              ⚡ {chunk}
            </button>
          ))}
        </div>
      </div>

      {/* Script Input Box */}
      <div className="space-y-3 mb-6">
        <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
          Your Story Script (Write at least 20 words describing the 3 pictures):
        </label>
        <textarea
          value={userScript}
          onChange={(e) => setUserScript(e.target.value)}
          placeholder="First, Tom was playing with his soccer ball in the living room. Suddenly, the ball hit a glass flower vase and broke it. Finally, Tom apologized to his mom..."
          rows={5}
          className="w-full p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans text-sm leading-relaxed"
        />

        <button
          onClick={handleAnalyzeScript}
          disabled={isAnalyzing || userScript.trim().length === 0}
          className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl text-base transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
        >
          <Sparkles size={18} /> {isAnalyzing ? 'Analyzing Script...' : 'Submit & Analyze Script'}
        </button>
      </div>

      {/* Layer 1 Rule-Based Evaluation Results */}
      {ruleScore && (
        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 mb-4 animate-in fade-in">
          <h4 className="text-sm font-black text-purple-950 mb-2">Layer 1: Script Analysis Results</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="text-slate-500 block">Total Words</span>
              <span className="text-base font-black text-purple-900">{ruleScore.wordCount}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="text-slate-500 block">Past Verbs</span>
              <span className="text-base font-black text-purple-900">{ruleScore.pastVerbsCount}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="text-slate-500 block">Connectors</span>
              <span className="text-base font-black text-purple-900">{ruleScore.connectorsCount}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="text-slate-500 block">Rule Gatekeeper</span>
              <span className={`text-base font-black ${ruleScore.isRulePass ? 'text-emerald-600' : 'text-amber-600'}`}>
                {ruleScore.isRulePass ? 'PASSED' : 'NEEDS MORE WORDS'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Layer 2 AI Evaluation Feedback */}
      {aiScore && (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 animate-in fade-in">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" /> Layer 2: AI Story Evaluation
            </h4>
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] font-black uppercase">
              {aiScore.verificationStatus}
            </span>
          </div>
          <p className="text-xs text-emerald-900 font-medium">{aiScore.aiFeedbackText}</p>
        </div>
      )}
    </div>
  );
}
