import React, { useState, useMemo } from 'react';
import { TestTube, Sparkles, CheckCircle2, Send, Trophy, ChevronRight, ChevronLeft, Volume2 } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { playButtonClick, playCorrectSound, playVictoryFanfare } from '../../utils/soundEffects';

export default function ScienceReportCreator({ reportTopic, customConfig, weekNumber = 33, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Text, setStep1Text] = useState('');
  const [step2Text, setStep2Text] = useState('');
  const [step3Text, setStep3Text] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ── Per-step live checkers — just needs enough text (free typing) ─────────
  const MIN_LEN = 8;
  const step1OK = useMemo(() => step1Text.trim().length >= MIN_LEN, [step1Text]);
  const step2OK = useMemo(() => step2Text.trim().length >= MIN_LEN, [step2Text]);
  const step3OK = useMemo(() => step3Text.trim().length >= MIN_LEN, [step3Text]);

  const canSubmit = step1OK && step2OK && step3OK;
  const assembledReport = `${step1Text.trim()} ${step2Text.trim()} ${step3Text.trim()}`.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitted(true);
    playVictoryFanfare();
    fireCelebrationConfetti('ScienceReport_Complete');
    if (onComplete) onComplete(50);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  const appendToStep = (setter, text) => {
    playButtonClick();
    setter(prev => prev ? `${prev} ${text}` : text);
  };

  const STEP_CONFIG = useMemo(() => {
    if (customConfig && customConfig.steps && Array.isArray(customConfig.steps)) {
      return customConfig.steps.map((s, idx) => ({
        step: idx + 1,
        label: s.label || `Step ${idx + 1}`,
        icon: s.icon || '📝',
        color: idx === 0 ? 'emerald' : idx === 1 ? 'blue' : 'amber',
        starter: s.starter || '',
        checker: idx === 0 ? step1OK : idx === 1 ? step2OK : step3OK,
        value: idx === 0 ? step1Text : idx === 1 ? step2Text : step3Text,
        setter: idx === 0 ? setStep1Text : idx === 1 ? setStep2Text : setStep3Text,
        hint: s.hint || 'Write your observation...',
        pills: s.pills || {}
      }));
    }

    return [
      {
        step: 1,
        label: 'Observation & Facts',
        icon: '🔬',
        color: 'emerald',
        starter: 'While observing the experiment,',
        checker: step1OK,
        value: step1Text,
        setter: setStep1Text,
        hint: 'What did you observe? Tap pills or type...',
        pills: {
          '🔵 Action & Setting': ['we noticed key changes', 'measurements were taken carefully', 'results showed clear differences'],
          '🟡 Key Details': ['the force was measured', 'conditions changed quickly', 'data was recorded accurately'],
        },
      },
      {
        step: 2,
        label: 'Scientific Reason',
        icon: '⚡',
        color: 'blue',
        starter: 'This happened because',
        checker: step2OK,
        value: step2Text,
        setter: setStep2Text,
        hint: 'Explain the scientific reason...',
        pills: {
          '🟢 Science Concepts': ['forces interact with surfaces', 'energy is transferred smoothly', 'physical properties affect motion'],
          '⚡ Effects': ['friction changes with texture', 'speed decreases under resistance', 'balance is maintained with grip'],
        },
      },
      {
        step: 3,
        label: 'Conclusion & Application',
        icon: '🏆',
        color: 'amber',
        starter: 'In conclusion, we learned that',
        checker: step3OK,
        value: step3Text,
        setter: setStep3Text,
        hint: 'What is the final lesson or rule?',
        pills: {
          '🟠 Main Conclusion': ['understanding science helps us stay safe', 'small factors make big differences', 'proper precautions prevent accidents'],
          '🩹 Recommendations': ['apply principles in daily life', 'follow safety guidelines', 'test ideas carefully'],
        },
      },
    ];
  }, [customConfig, step1OK, step2OK, step3OK, step1Text, step2Text, step3Text]);

  const cfg = STEP_CONFIG[currentStep - 1];
  const colorMap = { emerald: 'emerald', blue: 'blue', amber: 'amber' };
  const c = colorMap[cfg.color];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-5 bg-white rounded-3xl border border-emerald-200 shadow-md space-y-4 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md">
          🔬
        </div>
        <div>
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
            Science Report • CLIL Friction Lab
          </span>
          <h3 className="text-sm font-black text-slate-900">Corridor Friction Lab Notebook</h3>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {STEP_CONFIG.map(({ step, label, checker }) => (
          <button
            key={step}
            type="button"
            onClick={() => setCurrentStep(step)}
            className={`flex-1 py-2 px-2 rounded-xl text-center text-[10px] font-black border transition ${
              currentStep === step
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                : checker
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {checker ? '✓' : step}. {label.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Active Step Panel */}
      <div className={`p-4 bg-${c}-50 rounded-2xl border border-${c}-200 space-y-3 animate-in fade-in`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-black uppercase text-${c}-900 tracking-wider flex items-center gap-1.5`}>
            <span>{cfg.icon}</span> Step {cfg.step} — {cfg.label}
          </span>
          {cfg.checker && (
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-[10px] font-black">
              ✓ Done
            </span>
          )}
        </div>

        {/* Sentence Starter */}
        <div className={`flex items-center gap-2 px-3 py-2 bg-white border border-${c}-200 rounded-xl`}>
          <p className={`text-xs font-semibold text-${c}-900 italic flex-1`}>
            💡 Starter: &ldquo;{cfg.starter}...&rdquo;
          </p>
          <button type="button" onClick={() => speakText(cfg.starter)}
            className={`shrink-0 p-1.5 bg-${c}-200 hover:bg-${c}-300 rounded-lg transition`}>
            <Volume2 size={12} className={`text-${c}-700`} />
          </button>
          <button type="button"
            onClick={() => cfg.setter(prev => prev ? prev : cfg.starter + ' ')}
            className={`shrink-0 px-2 py-1 bg-${c}-600 hover:bg-${c}-700 text-white rounded-lg text-[10px] font-black transition`}>
            Use
          </button>
        </div>

        {/* Vocabulary Pills */}
        <div className="space-y-1.5">
          {Object.entries(cfg.pills).map(([groupLabel, words]) => (
            <div key={groupLabel} className={`p-2 bg-white rounded-xl border border-${c}-200 space-y-1`}>
              <span className={`text-[9px] font-black uppercase text-${c}-900 block`}>{groupLabel}:</span>
              <div className="flex flex-wrap gap-1">
                {words.map((w, i) => (
                  <button key={i} type="button"
                    onClick={() => appendToStep(cfg.setter, w)}
                    className={`px-2 py-0.5 bg-${c}-50 hover:bg-${c}-100 text-${c}-950 border border-${c}-300 rounded-md text-[10px] font-bold transition active:scale-95`}>
                    +{w}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          rows={3}
          value={cfg.value}
          onChange={(e) => cfg.setter(e.target.value)}
          placeholder={cfg.hint}
          className={`w-full p-3 rounded-xl border text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-${c}-400 ${
            cfg.checker ? `border-emerald-400 bg-emerald-50/50` : `border-${c}-300 bg-white`
          }`}
        />

        {/* Word count badge — encourages rather than nags */}
        {cfg.value.trim().length > 0 && (
          <p className={`text-[10px] font-bold ${
            cfg.checker ? `text-emerald-600` : `text-${c}-600`
          }`}>
            {cfg.checker ? '✓ Great!' : `${cfg.value.trim().length} chars — keep going (need ${Math.max(0, 8 - cfg.value.trim().length)} more)`}
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button type="button" disabled={currentStep === 1}
            onClick={() => setCurrentStep(s => s - 1)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-black flex items-center gap-1 transition">
            <ChevronLeft size={13} /> Back
          </button>
          {currentStep < 3 ? (
            <button type="button"
              onClick={() => setCurrentStep(s => s + 1)}
              className={`px-4 py-1.5 bg-${c}-600 hover:bg-${c}-700 text-white rounded-xl text-xs font-black flex items-center gap-1 transition`}>
              Next Step <ChevronRight size={13} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Report Preview */}
      {assembledReport.length > 20 && (
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
          <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider">📄 Report Preview:</span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed italic">&ldquo;{assembledReport}&rdquo;</p>
        </div>
      )}

      {/* Submit */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl font-black text-sm shadow-md flex items-center justify-center gap-2 transition"
          >
            <Send size={16} />
            {canSubmit ? '✅ Submit Lab Report (+50 XP)' : `Complete all 3 steps first (${[step1OK, step2OK, step3OK].filter(Boolean).length}/3 done)`}
          </button>
        </form>
      ) : (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-950 font-black text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          🎉 Science Report Published! Lab Notebook Badge Sealed (+50 XP).
        </div>
      )}
    </div>
  );
}
