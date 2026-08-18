import React, { useState } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { srsService } from '../../services/srsService';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';
import { renderParsedText } from '../../components/common/HoverWord';
import { NotepadNoteCompleter } from '../../components/common/NotepadNoteCompleter';
import { HelpCircle, Sparkles, AlertCircle, RefreshCw, Send, Trophy, CheckCircle2, Layers, Film, ShoppingBag, Zap, X } from 'lucide-react';
import GlobalModeToggle from '../../components/cambridge/GlobalModeToggle';
import NovaMascotStore from '../../components/mascot/NovaMascotStore';
import CompletionModal from '../../components/common/CompletionModal';
import { evaluateCambridgeCriteria, evaluateEssayStructure } from '../../utils/cambridgeCriteria';
import { generateWeeklyWorksheet } from '../../utils/pdfWorksheetGenerator';
import { Printer, Download } from 'lucide-react';

export default function WritingStudioHub({ data, weekNumber = 33 }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';
  const addXP = useUserStore((state) => state.addXP);
  const userXP = useUserStore((state) => state.userXP || 0);

  const [activeTab, setActiveTab] = useState('rw_p7'); // 'rw_p7' | 'listening_p2'
  const [userScript, setUserScript] = useState('');
  const [ruleScore, setRuleScore] = useState(null);
  const [aiScore, setAiScore] = useState(null);
  const [userStory, setUserStory] = useState('');
  const [activeMode, setActiveMode] = useState('learn'); // 'learn' | 'check'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHintsModal, setShowHintsModal] = useState(false);
  const [showPracticeNotice, setShowPracticeNotice] = useState(false);
  const [showMascotStore, setShowMascotStore] = useState(false);
  const [structureResult, setStructureResult] = useState(null);


  const picturePanels = data?.picture_story || data?.writing?.picture_story || data?.picturePanels || data?.writing?.picturePanels || [
    {
      panel_id: 'panel_1',
      title_en: 'Panel 1: Running in the Corridor',
      title_vi: 'Cảnh 1: Chạy Nhảy Tại Hành Lang Trường',
      image_url: '/images/week33/writing_panel_1.png'
    },
    {
      panel_id: 'panel_2',
      title_en: 'Panel 2: Slipping on Wet Floor',
      title_vi: 'Cảnh 2: Trượt Chân Trên Sàn Ướt',
      image_url: '/images/week33/writing_panel_2.png'
    },
    {
      panel_id: 'panel_3',
      title_en: 'Panel 3: Nurse Applying Bandage',
      title_vi: 'Cảnh 3: Y Tá Băng Bó Và Dọn Dẹp',
      image_url: '/images/week33/writing_panel_3.png'
    }
  ];

  const wordBankPills = data?.word_bank_pills || data?.writing?.word_bank_pills || data?.wordBankPills || data?.writing?.wordBankPills || {
    action_verbs: ['slipped', 'fell down', 'hurt knee', 'called nurse', 'applied bandage', 'helped clean', 'walked carefully'],
    connectors: ['first', 'suddenly', 'then', 'while', 'because', 'so', 'finally'],
    cumulative_chunks: ['slipped on wet floor', 'hurt his knee', 'called the school nurse', 'applied a clean bandage', 'cleaned the wet floor'],
    grammar_boosters: ['was running', 'was walking carefully', 'were helping', 'had slipped']
  };

  const handleInsertPill = (word) => {
    setUserScript((prev) => (prev ? `${prev} ${word}` : word));
  };

  const handleRuleSubmitCheck = () => {
    if (!userScript.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);

      const evaluation = evaluateCambridgeCriteria(userScript, weekNumber, {
        connectors: wordBankPills?.connectors || [],
        keywords: [
          ...(wordBankPills?.action_verbs || []),
          ...(wordBankPills?.cumulative_chunks || [])
        ]
      });

      const struct = evaluateEssayStructure(userScript, weekNumber);
      setStructureResult(struct);
      const totalScore = evaluation.totalScore;
      const stars = evaluation.stars;
      const isWordCountPass = evaluation.metWords;
      const isCoherent = evaluation.isCoherent;
      const wordCount = evaluation.wordCount;
      const foundPastVerbs = evaluation.foundPastVerbs;
      const foundConnectors = evaluation.connectorsFound;

      // Hub 3 Performance Task Gamification: Trigger Confetti Burst & +100 XP for ≥ 80% (3 Stars) 🎉
      if (totalScore >= 80) {
        fireCelebrationConfetti();
        if (addXP) addXP(100);
      }

      let feedbackText = "";
      if (totalScore >= 80) {
        feedbackText = "Outstanding story! Excellent past tense verbs, connectors (then, suddenly), and target keywords!";
      } else if (totalScore >= 60) {
        feedbackText = "Good story! Try adding connectors like 'first', 'then', or 'suddenly' to link your sentences smoothly.";
      } else if (!isCoherent) {
        feedbackText = "Con hãy dùng các từ nối (first, then, suddenly) và dấu chấm câu để kết nối các từ thành bài văn hoàn chỉnh nhé!";
      } else {
        feedbackText = "Keep practicing! Write 20+ words and include past tense verbs (slipped, fell, called) to describe the accident.";
      }

      const layer1Result = {
        isRulePass: isWordCountPass && isCoherent,
        wordCount,
        pastVerbsCount: foundPastVerbs.length,
        connectorsCount: foundConnectors.length
      };

      setRuleScore(layer1Result);

      setAiScore({
        movieQualityScore: totalScore,
        stars,
        verificationStatus: stars === 3 ? '3 Stars (Gold)' : stars === 2 ? '2 Stars (Silver)' : '1 Star (Pass)',
        aiFeedbackText: feedbackText
      });

      learnerProgressService.logAttempt({
        learnerId,
        contentId: `w${weekNumber}_writing_p7`,
        mode: 'learn',
        result: isWordCountPass && totalScore >= 60 ? 'correct' : 'incorrect',
        score: totalScore,
        timeSpentSeconds: 60
      });
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-xl font-sans">
      <CompletionModal
        isOpen={!!aiScore && (aiScore.movieQualityScore >= 50)}
        onClose={() => {}}
        score={aiScore?.movieQualityScore || 0}
        stars={aiScore?.stars || 1}
        xpEarned={100}
        srsWordsAdded={5}
        activityTitle="Writing Studio Challenge (R&W Part 7)"
      />
      {/* Top Controls: Mode Toggle, Mascot Store & Hints */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <GlobalModeToggle activeMode={activeMode} onModeChange={setActiveMode} />

        <div className="flex items-center gap-2">
          {/* Nova Mascot Fitting Store Button */}
          <button
            onClick={() => setShowMascotStore(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md"
          >
            <ShoppingBag size={14} className="text-amber-300" /> Nova Store ({userXP} XP)
          </button>

          {/* Show Hints Scaffolding Button (Only available in Learn Mode) */}
          {activeMode === 'learn' && (
            <button
              onClick={() => setShowHintsModal(true)}
              className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm"
            >
              <HelpCircle size={14} className="text-amber-600" /> Show Hints
            </button>
          )}
        </div>
      </div>

      {/* Check Mode Exam Condition Banner */}
      {activeMode === 'check' && (
        <div className="p-4 mb-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between text-amber-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="text-xs font-black">🎯 CHECK MODE (EXAM CONDITION): Scaffolding pills and hints are hidden. Write your 20+ word story completely from memory!</span>
          </div>
          <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-amber-200 text-amber-900 rounded-lg shrink-0">Real Exam</span>
        </div>
      )}

      {/* Examiner Instructions Banner */}
      <div className="p-4 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white shadow-md flex items-center gap-3">
        <div className="p-2.5 bg-amber-400 text-slate-950 font-black rounded-xl text-lg shrink-0">
          📝
        </div>
        <div>
          <span className="text-[10px] font-black text-amber-200 uppercase tracking-widest block">
            ✨ NOVA'S WRITING CHALLENGE:
          </span>
          <p className="text-sm sm:text-base font-extrabold text-white">
            "Look at the three pictures. Write the story. Write 20 or more words."
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 3 Sequential Picture Story Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {picturePanels.map((panel, idx) => (
            <div key={panel.panel_id || idx} className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-col justify-between">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-2 bg-slate-200 border border-slate-200">
                <img src={panel.image_url} alt={panel.title_en} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-1 bg-slate-900/80 text-white rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                  Picture {idx + 1}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{activeMode === 'check' ? `Picture ${idx + 1}` : panel.title_en}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Word Bank Pills Section (Only rendered in Learn Mode) */}
        {activeMode === 'learn' && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                💡 Scaffolding Word Bank Pills (Click to Insert):
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
    )}

      {/* Script Text Area Input with Cambridge Flyers Standard Target */}
      <div className="space-y-3 mb-6">
        <label className="block text-xs font-black text-slate-700 uppercase">
          Your 3-Picture Story Script (<span className="text-purple-600">Cambridge Min: 20+ words | EngQuest Stretch Goal: 35–50 words</span> + 2 past verbs):
        </label>
        <textarea
          rows={5}
          value={userScript}
          onChange={(e) => setUserScript(e.target.value)}
          placeholder={activeMode === 'check' ? "Look at the 3 pictures above and write your 20+ word story completely from memory..." : "Look at the 3 pictures and write your story here (use past tense verbs like slipped, fell, called and connectors like first, then, suddenly)..."}
          className="w-full p-4 bg-white border border-slate-300 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />

        <div className="flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={() => generateWeeklyWorksheet(data, learnerId)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition border border-slate-300 flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Download/Print Weekly PBL Worksheet"
          >
            <Printer size={14} className="text-blue-600" /> 📥 Download Worksheet (PDF)
          </button>

          <button
            onClick={handleRuleSubmitCheck}
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
              {ruleScore.isRulePass
                ? (ruleScore.wordCount >= 35 ? '✅ Pass (Cambridge 20+ words & EngQuest Stretch Goal met!)' : '✅ Pass (Cambridge Minimum 20+ words met)')
                : '⚠️ Below Cambridge Minimum (20 words)'}
            </span>
          </div>

          <div className="text-[11px] font-bold text-slate-600 bg-amber-50/80 px-3.5 py-2 rounded-xl border border-amber-200 flex items-center gap-2">
            <span>💡</span> <span>Điểm luyện tập AI — Chưa phải kết quả thi Cambridge chính thức đâu con nhé!</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-400 text-[10px] uppercase font-black">Word Count</div>
              <div className="text-lg font-black text-slate-900">{ruleScore.wordCount} words <span className="text-[10px] text-slate-400 font-bold block">(Cam: 20+ | Stretch: 35–50)</span></div>
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

          {/* Structure Analysis Card */}
          {structureResult && (
            <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-950 uppercase flex items-center gap-1.5">
                  <Layers size={14} className="text-indigo-600" /> Narrative Structure Analysis:
                </span>
                <span className="text-xs font-mono font-bold text-indigo-700">
                  {structureResult.sentenceCount} sentences • {structureResult.paragraphCount} paragraph(s)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <div className={`p-2 rounded-lg text-center ${structureResult.hasIntro ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                  {structureResult.hasIntro ? '✅ Introduction' : '⚪ Intro'}
                </div>
                <div className={`p-2 rounded-lg text-center ${structureResult.hasBody ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                  {structureResult.hasBody ? '✅ Climax / Action' : '⚪ Body'}
                </div>
                <div className={`p-2 rounded-lg text-center ${structureResult.hasConclusion ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                  {structureResult.hasConclusion ? '✅ Resolution' : '⚪ Conclusion'}
                </div>
              </div>
            </div>
          )}

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
      </div>

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
                  corridor, slipped, fell down, nurse, bandage, cold pack, praised, carefully, immediately, relieved.
                </p>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1">
                <h4 className="text-xs font-black text-indigo-950 uppercase">Suggested Collocations & Chunks:</h4>
                <ul className="text-xs font-bold text-indigo-900 space-y-1 list-disc pl-4">
                  <li>walked carefully down the school corridor</li>
                  <li>slipped on the wet slippery tiles</li>
                  <li>called the school nurse immediately</li>
                  <li>applied a clean bandage and cold pack</li>
                  <li>praised Jake for following safety rules</li>
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

      {/* Nova Mascot Store Modal */}
      <NovaMascotStore isOpen={showMascotStore} onClose={() => setShowMascotStore(false)} />
    </div>
  );
}
