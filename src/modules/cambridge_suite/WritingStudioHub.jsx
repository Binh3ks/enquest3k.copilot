import React, { useState } from 'react';
import { learnerProgressService } from '../../services/learnerProgressService';
import { PenTool, Sparkles, CheckCircle2, AlertTriangle, Layers, Film, ArrowRight } from 'lucide-react';

export default function WritingStudioHub({ data, weekNumber = 33 }) {
  const [userScript, setUserScript] = useState('');
  const [ruleScore, setRuleScore] = useState(null);
  const [aiScore, setAiScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const picturePanels = data?.picturePanels || [
    {
      panel_id: 'panel_1',
      title_en: 'Panel 1: The Broken Clock',
      image_prompt: 'Cute 3D render of a young boy looking at a broken alarm clock on the floor, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.',
      image_url: '/images/week33/panel_1.webp'
    },
    {
      panel_id: 'panel_2',
      title_en: 'Panel 2: Slipping on Stairs',
      image_prompt: 'Cute 3D render of a young boy slipping on a wet puddle on stairs, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.',
      image_url: '/images/week33/panel_2.webp'
    },
    {
      panel_id: 'panel_3',
      title_en: 'Panel 3: The Returned Backpack',
      image_prompt: 'Cute 3D render of a friend returning a lost backpack to a smiling boy at school, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.',
      image_url: '/images/week33/panel_3.webp'
    }
  ];

  const wordBankPills = data?.wordBankPills || {
    action_verbs: ['broke', 'fell', 'lost', 'found', 'slipped'],
    connectors: ['while', 'because', 'although', 'when', 'so'],
    cumulative_chunks: ['broke his clock', 'slipped on a puddle', 'lost his backpack'],
    grammar_boosters: ['was exploring', 'were climbing', 'had forgotten']
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
    const connectors = ['while', 'because', 'although', 'when', 'so', 'however'];
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
        aiFeedbackText: 'Bài viết tốt! Cốt truyện mạch lạc qua 3 bức tranh. Cần dùng thêm từ nối để đạt điểm cao hơn.',
        verificationStatus: 'practice_only' // MANDATORY TAG UNTIL CALIBRATION
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
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <PenTool size={14} /> Hub 3: Studio Storyteller — Writing Part 7 (W{weekNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
            3-Picture Story Scriptwriter
          </h1>
        </div>
      </div>

      {/* 3D Static Picture Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {picturePanels.map((panel, idx) => (
          <div key={panel.panel_id} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
            <div className="w-full h-44 bg-slate-950 rounded-xl mb-3 flex items-center justify-center p-3 border border-slate-800 text-center">
              <Film className="w-10 h-10 text-purple-500/40 mb-1" />
              <p className="text-xs text-slate-400 font-semibold">{panel.title_en}</p>
            </div>
            <span className="text-xs font-bold text-indigo-300">Frame {idx + 1}</span>
          </div>
        ))}
      </div>

      {/* Word Bank Pills */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-6 space-y-3">
        <h4 className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1">
          <Sparkles size={14} className="text-amber-400" /> Word Bank Pills (Chạm để chèn từ năng lượng):
        </h4>

        <div className="flex flex-wrap gap-2">
          {wordBankPills.action_verbs?.map((word) => (
            <button
              key={word}
              onClick={() => handleInsertPill(word)}
              className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              + {word}
            </button>
          ))}

          {wordBankPills.connectors?.map((word) => (
            <button
              key={word}
              onClick={() => handleInsertPill(word)}
              className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              + {word}
            </button>
          ))}

          {wordBankPills.cumulative_chunks?.map((chunk) => (
            <button
              key={chunk}
              onClick={() => handleInsertPill(chunk)}
              className="px-3 py-1.5 bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition shadow-sm"
            >
              ⚡ {chunk}
            </button>
          ))}
        </div>
      </div>

      {/* Script Text Input Area */}
      <div className="space-y-3 mb-6">
        <label className="text-xs text-slate-300 font-bold uppercase">
          Kịch bản câu chuyện của bạn (Viết ít nhất 20 từ mô tả 3 bức tranh):
        </label>
        <textarea
          rows={5}
          value={userScript}
          onChange={(e) => setUserScript(e.target.value)}
          placeholder="One morning, Tom woke up late and broke his alarm clock. While he was running downstairs, he slipped on a puddle and fell. At school, he lost his backpack but his friend found it..."
          className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-base text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed font-sans"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAnalyzeScript}
        disabled={isAnalyzing || !userScript.trim()}
        className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-2xl text-base transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
      >
        {isAnalyzing ? (
          <span>Đang phân tích 2 lớp (Rule & AI)...</span>
        ) : (
          <>
            <Sparkles size={18} /> Phân Tích Kịch Bản & Đánh Giá Điểm
          </>
        )}
      </button>

      {/* 2-Layer Scoring Output Display */}
      {ruleScore && (
        <div className="mt-6 space-y-4 animate-in fade-in duration-200">
          {/* Layer 1: Rule-Based Client Check */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-xs text-indigo-400 font-bold uppercase mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> Lớp 1: Chấm Điểm Quy Tắc Ngữ Pháp (Rule-Based Immediate)
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Tổng số từ:</span>
                <div className="text-lg font-black text-amber-400">{ruleScore.wordCount} từ</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Động từ Quá khứ:</span>
                <div className="text-lg font-black text-emerald-400">{ruleScore.pastVerbsCount} / 2</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Từ nối câu ghép:</span>
                <div className="text-lg font-black text-purple-400">{ruleScore.connectorsCount} từ</div>
              </div>
            </div>
          </div>

          {/* Layer 2: AI Content Feedback (with mandatory practice_only tag) */}
          {aiScore && (
            <div className="p-4 bg-purple-950/50 rounded-2xl border border-purple-500/40">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs text-purple-300 font-bold uppercase flex items-center gap-1.5">
                  <Film size={16} /> Lớp 2: AI Movie Quality Score
                </h4>

                {/* MANDATORY UNCALIBRATED PRACTICE ONLY BADGE */}
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                  <AlertTriangle size={12} /> practice_only (Chờ Calibration)
                </span>
              </div>

              <div className="text-2xl font-black text-amber-300 mb-1">
                {aiScore.movieQualityScore} / 100 điểm
              </div>
              <p className="text-sm text-purple-100 italic">{aiScore.aiFeedbackText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
