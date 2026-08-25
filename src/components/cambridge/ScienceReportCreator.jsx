import React, { useState, useMemo } from 'react';
import { TestTube, Sparkles, CheckCircle2, AlertTriangle, Send, Trophy, ChevronRight, ChevronLeft, Volume2, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { playButtonClick, playCorrectSound, playVictoryFanfare } from '../../utils/soundEffects';
import { speakText } from '../../utils/AudioHelper';

export default function ScienceReportCreator({ reportTopic, customConfig, weekNumber = 34, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Text, setStep1Text] = useState('');
  const [step2Text, setStep2Text] = useState('');
  const [step3Text, setStep3Text] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeLevel, setActiveLevel] = useState('L3');
  const [showTeacherNote, setShowTeacherNote] = useState(false);
  const [distractorAlert, setDistractorAlert] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [selectedChips, setSelectedChips] = useState({});

  const purpose = customConfig?.purpose || "🌱 Today we write like little scientists: we say what we SAW, use past tense, and join ideas with because / so!";
  const teacherNote = customConfig?.teacher_parent_note || "Learn the language of science reports (observed / because / past tense), not science content.";

  const dataCard = useMemo(() => {
    if (Array.isArray(customConfig?.data_card) && customConfig.data_card.length >= 3) {
      return customConfig.data_card.slice(0, 3);
    }
    if (weekNumber === 33) {
      return [
        { subject: "💧 Wet Tiles", action: "water reduces surface friction", result: "students slipped and lost balance" },
        { subject: "👟 Rubber Shoes", action: "rubber provides strong grip", result: "walking safely with more friction" },
        { subject: "⚠️ Warning Sign", action: "placed near wet cleaning area", result: "warned everyone to walk carefully" }
      ];
    }
    // Week 34 default
    return [
      { subject: "🐿️ Squirrels", action: "bury extra nuts in the ground", result: "some nuts grow into new oak trees" },
      { subject: "🐝 Bees", action: "drink sweet nectar from flowers", result: "carry pollen to help new flowers grow" },
      { subject: "🐦 Jays", action: "hide seeds under soft leaves", result: "start small green plants across the forest" }
    ];
  }, [customConfig, weekNumber]);

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

  const handleChipClick = (category, pillText, isDistractor, setter) => {
    if (isDistractor) {
      const msg = customConfig?.distractor_feedback || "🔬 The Data Card does not show this fact. A science report only uses observed data!";
      setDistractorAlert(msg);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800);
      return;
    }

    setDistractorAlert(null);
    playCorrectSound();
    setSelectedChips(prev => ({ ...prev, [pillText]: true }));
    setter(prev => (prev ? `${prev} ${pillText}` : pillText));
  };

  const handleConnectorClick = (connector, setter) => {
    playButtonClick();
    setter(prev => (prev ? `${prev} ${connector}` : connector));
  };

  const STEP_CONFIG = useMemo(() => {
    const s1Pills = customConfig?.step1Pills || (weekNumber === 33 ? {
      "💧 Wet Tiles": ["water reduced surface friction"],
      "👟 Shoe Soles": ["rubber shoes provided strong grip"],
      "⚠️ Warning Sign": ["the warning sign alerted everyone to walk carefully"],
      "Distractor": ["students ran without looking"]
    } : {
      "🐿️ Squirrels": ["squirrels buried extra nuts in the ground"],
      "🐝 Bees": ["bees carried pollen to new flowers"],
      "🐦 Jays": ["jays hid seeds under soft leaves"],
      "Distractor": ["some animals forgot to share food"]
    });

    const s2Pills = customConfig?.step2Pills || (weekNumber === 33 ? {
      "⚡ Less Friction": ["wet tiles caused students to slip and fall"],
      "🛡️ More Friction": ["rubber shoes increased friction on smooth floors"]
    } : {
      "🌳 New Trees": ["buried nuts grew into young oak trees"],
      "🌸 New Flowers": ["carried pollen helped new flowers grow"]
    });

    const s3Pills = customConfig?.step3Pills || (weekNumber === 33 ? {
      "🏆 Key Conclusion": ["walking carefully prevented accidents in the corridor"],
      "🌟 Takeaway": ["understanding friction kept everyone safe"]
    } : {
      "🏆 Key Conclusion": ["small helpers kept the forest green and strong"],
      "🌟 Takeaway": ["animals and plants worked together in nature"]
    });

    const s1Starter = customConfig?.step1Starter || (weekNumber === 33 ? "While observing the corridor, we saw that" : "While observing the experiment, we saw that");

    return [
      {
        step: 1,
        label: 'Observation & Facts',
        icon: '🔬',
        color: 'emerald',
        starter: s1Starter,
        checker: step1OK,
        value: step1Text,
        setter: setStep1Text,
        hint: 'What did you observe? Tap past-tense chips from the Data Card...',
        pills: s1Pills,
        connectors: null
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
        hint: 'Explain why this happened using because / so / but...',
        pills: s2Pills,
        connectors: customConfig?.step2Connectors || ['because', 'so', 'but']
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
        hint: 'What is the final scientific takeaway?',
        pills: s3Pills,
        connectors: customConfig?.step3Connectors || ['so', 'because', 'but']
      }
    ];
  }, [customConfig, weekNumber, step1OK, step2OK, step3OK, step1Text, step2Text, step3Text]);

  const cfg = STEP_CONFIG[currentStep - 1];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-5 bg-white rounded-3xl border border-emerald-200 shadow-md space-y-4 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md">
            🔬
          </div>
          <div>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">
              Science Report • {customConfig?.topic || reportTopic || (weekNumber === 34 ? "Seed Helpers & Forest Plants Report" : "Friction & Surface Safety Report")}
            </span>
            <h3 className="text-sm font-black text-slate-900">
              {customConfig?.notebookTitle || (weekNumber === 34 ? "How Animals Help Forest Plants Grow" : "Friction on School Floors Lab Notebook")}
            </h3>
          </div>
        </div>

        {/* Level Ladder Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => {
                setActiveLevel(lvl);
                playButtonClick();
              }}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition ${
                activeLevel === lvl
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Purpose Banner for Kids */}
      <div className="p-3 bg-emerald-50/90 border border-emerald-200 rounded-2xl flex items-start gap-2.5 shadow-2xs">
        <Lightbulb size={16} className="text-emerald-700 shrink-0 mt-0.5" />
        <p className="text-xs font-bold text-emerald-950 leading-relaxed">
          {purpose}
        </p>
      </div>

      {/* Collapsible Teacher & Parent Note */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/70">
        <button
          type="button"
          onClick={() => setShowTeacherNote(prev => !prev)}
          className="w-full px-3.5 py-2 flex items-center justify-between text-[11px] font-black text-slate-700 hover:text-indigo-800 transition"
        >
          <span className="flex items-center gap-1.5">
            👩‍🏫 Teacher & Parent Note
          </span>
          {showTeacherNote ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showTeacherNote && (
          <div className="px-3.5 pb-2.5 pt-1 border-t border-slate-200/60 text-xs text-slate-600 font-medium leading-relaxed">
            {teacherNote}
          </div>
        )}
      </div>

      {/* 3-Row Data Card (Extracted from CLIL) */}
      {dataCard && dataCard.length > 0 && (
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-black uppercase text-slate-600 tracking-wider">
            <span className="flex items-center gap-1.5">
              <BookOpen size={13} className="text-indigo-600" /> CLIL Data Card (3 Key Facts)
            </span>
            <span className="text-[10px] text-slate-400 font-bold">Use these facts in your report</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {dataCard.map((row, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <div className="text-xs font-black text-slate-900 flex items-center justify-between">
                  <span>{row.subject}</span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Row #{idx + 1}</span>
                </div>
                <div className="text-[11px] text-indigo-950 font-medium leading-tight">
                  <span className="text-slate-500 font-bold">Action:</span> {row.action}
                </div>
                <div className="text-[11px] text-slate-700 font-medium leading-tight">
                  <span className="text-slate-500 font-bold">Result:</span> {row.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Tabs Indicator */}
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
      <div className={`p-4 sm:p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 space-y-3 ${isShaking ? 'animate-bounce' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">{cfg.icon}</span>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
              STEP {cfg.step} — {cfg.label}
            </h4>
          </div>
          <button
            type="button"
            onClick={() => speakText(`${cfg.starter} ${cfg.value}`)}
            className="p-1.5 bg-white text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-300 text-xs transition"
            title="Listen step"
          >
            <Volume2 size={14} />
          </button>
        </div>

        {/* Starter Sentence Frame */}
        <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900">
          💡 Starter: &ldquo;{cfg.starter}&rdquo;
        </div>

        {/* Distractor Alert Feedback */}
        {distractorAlert && (
          <div className="p-2.5 bg-rose-50 border-2 border-rose-300 rounded-xl text-xs font-bold text-rose-800 flex items-center gap-2 animate-in fade-in">
            <AlertTriangle size={15} className="text-rose-600 shrink-0" />
            <span>{distractorAlert}</span>
          </div>
        )}

        {/* Micro-decision: Connector Choice Pills (Step 2 & 3) */}
        {cfg.connectors && cfg.connectors.length > 0 && (
          <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">
              🔗 Join your ideas with a connector:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cfg.connectors.map((conn) => (
                <button
                  key={conn}
                  type="button"
                  onClick={() => handleConnectorClick(conn, cfg.setter)}
                  className="px-3 py-1 bg-white hover:bg-blue-100 text-blue-900 border border-blue-300 rounded-lg text-xs font-black transition active:scale-95 shadow-2xs"
                >
                  + {conn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Data Card Past-Tense Pills */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
            Tap Data Card chips to insert (Past Tense):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(cfg.pills || {}).flatMap(([cat, pills]) =>
              (Array.isArray(pills) ? pills : []).map((pill, pIdx) => {
                const isDistractor = cat.toLowerCase().includes('distractor') || cat.toLowerCase().includes('nhiễu');
                const isSelected = selectedChips[pill];
                return (
                  <button
                    key={`${cat}-${pIdx}`}
                    type="button"
                    onClick={() => handleChipClick(cat, pill, isDistractor, cfg.setter)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition active:scale-95 shadow-2xs border ${
                      isSelected
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black'
                        : isDistractor
                        ? 'bg-amber-50/80 hover:bg-amber-100 text-amber-950 border-amber-300'
                        : 'bg-white hover:bg-emerald-100 text-emerald-950 border-emerald-300'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {pill}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Input Textarea */}
        <textarea
          rows={3}
          value={cfg.value}
          onChange={(e) => {
            cfg.setter(e.target.value);
            setDistractorAlert(null);
          }}
          placeholder={cfg.hint}
          className="w-full p-3 bg-white border-2 border-emerald-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none resize-none leading-relaxed transition"
        />

        <div className="flex items-center justify-between text-xs">
          <span className={cfg.checker ? "text-emerald-700 font-bold" : "text-slate-400"}>
            {cfg.checker ? "✓ Step verified (>=8 chars)" : "Type or tap pills above..."}
          </span>
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-600 hover:bg-white"
              >
                Previous
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black shadow-xs flex items-center gap-1"
              >
                Next Step <ChevronRight size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Assembled Report Preview & Final Submit */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
        <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
          📄 Complete Report Preview:
        </span>
        <p className="text-xs leading-relaxed text-slate-800 font-medium italic bg-white p-3 rounded-xl border border-slate-200">
          {assembledReport ? `"${assembledReport}"` : "Complete all 3 steps above to assemble your official scientific discovery report."}
        </p>

        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2"
          >
            <Send size={15} /> Submit Science Report (+50 XP)
          </button>
        ) : (
          <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-center text-xs font-black">
            ✓ Official Science Report Filed Successfully! (+50 XP)
          </div>
        )}
      </div>
    </div>
  );
}
