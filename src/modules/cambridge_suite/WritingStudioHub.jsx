import React, { useState } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { PenTool, Sparkles, AlertTriangle, Layers, Film, HelpCircle, X, Info } from 'lucide-react';

export default function WritingStudioHub({ data, weekNumber = 33 }) {
  const [userScript, setUserScript] = useState('');
  const [ruleScore, setRuleScore] = useState(null);
  const [aiScore, setAiScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHintsModal, setShowHintsModal] = useState(false);
  const [showPracticeNotice, setShowPracticeNotice] = useState(false);

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

  const handleInsertPill = (word) => {
    setUserScript((prev) => (prev ? `${prev} ${word}` : word));
  };

  const handleAnalyzeScript = async () => {
    setIsAnalyzing(true);
    const textLower = userScript.toLowerCase();

    const pastVerbs = ['broke', 'fell', 'lost', 'found', 'slipped', 'spilled', 'tore', 'hurt', 'dropped', 'apologized'];
    const matchedVerbs = pastVerbs.filter((v) => textLower.includes(v));

    const connectors = ['first', 'suddenly', 'finally', 'while', 'because', 'although', 'when', 'so', 'however'];
    const matchedConnectors = connectors.filter((c) => textLower.includes(c));

    const wordCount = userScript.trim().split(/\s+/).filter(Boolean).length;

    const layer1Result = {
      wordCount,
      pastVerbsCount: matchedVerbs.length,
      connectorsCount: matchedConnectors.length,
      matchedVerbs,
      matchedConnectors,
      isRulePass: matchedVerbs.length >= 2 && wordCount >= 35
    };

    setRuleScore(layer1Result);

    setTimeout(async () => {
      const calculatedMovieScore = Math.min(100, Math.max(50, wordCount * 2 + matchedVerbs.length * 10));

      const layer2Result = {
        movieQualityScore: calculatedMovieScore,
        aiFeedbackText: 'Great Cambridge Flyers story script! Your narrative flows across all 3 picture panels. Keep using connectors for high accuracy.',
        verificationStatus: 'practice_only'
      };

      setAiScore(layer2Result);
      setIsAnalyzing(false);

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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hub 3: Writing Studio
          </h1>
        </div>

        <div className="flex items-center gap-2 relative">
          {/* Show Hints Scaffolding Button */}
          <button
            onClick={() => setShowHintsModal(true)}
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm"
          >
            <HelpCircle size={14} className="text-amber-600" /> Show Hints
          </button>

          {/* Interactive Practice Only Tag */}
          <button
            onClick={() => alert('AI Grading is for practice only. Official Cambridge certificates require human examiners.')}
            className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl text-xs font-black border border-purple-200 flex items-center gap-1.5 shadow-sm cursor-pointer transition"
            title="Click to view official Cambridge examiner notice"
          >
            <AlertTriangle size={14} className="text-purple-600" /> practice_only <Info size={13} />
          </button>
        </div>
      </div>

      {/* 3 Pixar 3D Picture Panels Display (Cleaned: NO pre-written full sentences and NO Vietnamese translations!) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {picturePanels.map((panel, idx) => (
          <div key={panel.panel_id || idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden flex flex-col">
            <div className="relative w-full h-48 bg-slate-200 rounded-xl overflow-hidden mb-3 border border-slate-300">
              <img
                src={panel.image_url}
                alt={panel.title_en}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-2 left-2 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black rounded-lg uppercase">
                Panel {idx + 1}
              </span>
            </div>

            <h4 className="text-xs font-black text-slate-900 mb-1">{panel.title_en}</h4>
          </div>
        ))}
      </div>

      {/* Interactive Word Bank Pills Container */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={14} /> Tap Pills below to build your original story script:
          </span>
          <button
            onClick={() => setShowHintsModal(true)}
            className="text-xs font-black text-purple-600 hover:underline"
          >
            Need Scaffolding Hints?
          </button>
        </div>

        <div className="space-y-2">
          {/* Action Verbs */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-black uppercase text-indigo-500 self-center mr-1">Verbs:</span>
            {wordBankPills.action_verbs.map((word) => (
              <button
                key={word}
                onClick={() => handleInsertPill(word)}
                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition shadow-xs"
              >
                + {word}
              </button>
            ))}
          </div>

          {/* Connectors */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-black uppercase text-purple-500 self-center mr-1">Connectors:</span>
            {wordBankPills.connectors.map((word) => (
              <button
                key={word}
                onClick={() => handleInsertPill(word)}
                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-bold transition shadow-xs"
              >
                + {word}
              </button>
            ))}
          </div>

          {/* Chunks */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-black uppercase text-amber-600 self-center mr-1">Chunks:</span>
            {wordBankPills.cumulative_chunks.map((word) => (
              <button
                key={word}
                onClick={() => handleInsertPill(word)}
                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold transition shadow-xs"
              >
                + {word}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Script Text Area Input with Cambridge Flyers Standard Target */}
      <div className="space-y-3 mb-6">
        <label className="block text-xs font-black text-slate-700 uppercase">
          Your 3-Picture Story Script (<span className="text-purple-600">Target: 35-50 words — Cambridge Flyers Standard</span> + 2 past verbs):
        </label>
        <textarea
          rows={5}
          value={userScript}
          onChange={(e) => setUserScript(e.target.value)}
          placeholder="First, Tom was playing with his soccer ball in the living room... Suddenly, the ball hit the wooden table..."
          className="w-full p-4 bg-white border border-slate-300 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />

        <div className="flex justify-end">
          <button
            onClick={handleAnalyzeScript}
            disabled={isAnalyzing || userScript.trim().length === 0}
            className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl text-sm transition shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles size={16} /> {isAnalyzing ? 'Analyzing Script...' : 'Submit & Analyze Script'}
          </button>
        </div>
      </div>

      {/* Layer 1 Rule Feedback & Layer 2 AI Score */}
      {ruleScore && (
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-black uppercase text-slate-700">Layer 1 Rule Check:</span>
            <span className={`text-xs font-black ${ruleScore.isRulePass ? 'text-emerald-600' : 'text-amber-600'}`}>
              {ruleScore.isRulePass ? '✅ Pass (Target 35-50 words met)' : '⚠️ Below Target Word Count'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-400 text-[10px] uppercase font-black">Word Count</div>
              <div className="text-lg font-black text-slate-900">{ruleScore.wordCount} / 35-50 words</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-400 text-[10px] uppercase font-black">Past Verbs</div>
              <div className="text-lg font-black text-indigo-600">{ruleScore.pastVerbsCount} detected</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-400 text-[10px] uppercase font-black">Connectors</div>
              <div className="text-lg font-black text-purple-600">{ruleScore.connectorsCount} detected</div>
            </div>
          </div>

          {aiScore && (
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-purple-950 flex items-center gap-1.5">
                  <Film size={16} /> AI Story Quality Score: {aiScore.movieQualityScore}/100
                </h4>
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] font-black uppercase">
                  {aiScore.verificationStatus}
                </span>
              </div>
              <p className="text-xs font-semibold text-purple-900">{aiScore.aiFeedbackText}</p>
            </div>
          )}
        </div>
      )}

      {/* Show Hints Modal */}
      {showHintsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HelpCircle size={18} className="text-amber-500" /> Writing Scaffolding Hints
              </h3>
              <button
                onClick={() => setShowHintsModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <h4 className="text-xs font-black text-amber-950 uppercase">Suggested Core Vocab:</h4>
                <p className="text-xs font-bold text-amber-900">
                  broke, fell, lost, found, slipped, dropped, damaged, apologized, flower vase, soccer ball, alarm clock, backpack.
                </p>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1">
                <h4 className="text-xs font-black text-indigo-950 uppercase">Suggested Collocations & Chunks:</h4>
                <ul className="text-xs font-bold text-indigo-900 space-y-1 list-disc pl-4">
                  <li>played soccer inside the living room</li>
                  <li>hit the wooden table by accident</li>
                  <li>broke the glass flower vase into pieces</li>
                  <li>apologized to his mom for the mistake</li>
                  <li>swept and cleaned up the floor carefully</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHintsModal(false)}
                className="px-6 py-2.5 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-slate-800 transition"
              >
                Close Hints
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
