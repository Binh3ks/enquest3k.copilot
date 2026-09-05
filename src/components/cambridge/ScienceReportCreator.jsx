import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Trophy, ChevronRight, ChevronLeft, Volume2, Search, Lightbulb, Compass, Award } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { playButtonClick, playCorrectSound, playVictoryFanfare } from '../../utils/soundEffects';
import { speakText } from '../../utils/AudioHelper';

export default function ScienceReportCreator({ reportTopic, customConfig, weekNumber = 33, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: OBSERVE, 2: PICK CLUE, 3: SNAP SENTENCE, 4: SEE REPORT
  const [observedHotspot, setObservedHotspot] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);
  const [clueError, setClueError] = useState(null);
  const [assembledPills, setAssembledPills] = useState([]);
  const [sentenceError, setSentenceError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // ── Step 4 Inquiry ("Why?") State & Data ──────────────────────────────────
  const [selectedInquiryOption, setSelectedInquiryOption] = useState(null);
  const [inquiryPassed, setInquiryPassed] = useState(false);
  const [inquiryFeedback, setInquiryFeedback] = useState(null);

  const defaultInquiryData = useMemo(() => ({
    question: "Why was Jake able to walk safely down the wet corridor while Tom slipped and fell?",
    options: [
      {
        text: "Jake's textured rubber shoe soles provided strong friction and grip against the wet tiles.",
        isCorrect: true,
        explanation: "💡 Correct! Textured rubber material creates high surface friction with floor tiles, preventing sliding even when wet."
      },
      {
        text: "Jake was running much faster than Tom, so the water did not have time to make him slip.",
        isCorrect: false,
        explanation: "⚠️ Science Tip: Running fast makes it harder to stop and makes slipping much more dangerous!"
      },
      {
        text: "The floor tiles absorbed all the water where Jake walked, making the surface completely dry.",
        isCorrect: false,
        explanation: "⚠️ Science Tip: Smooth ceramic tiles do not absorb water; water stays on the surface forming a slippery film."
      }
    ]
  }), []);

  const inquiryData = customConfig?.inquiryQuestion || defaultInquiryData;

  const handleSelectInquiryOption = (oIdx, opt) => {
    setSelectedInquiryOption(oIdx);
    if (opt.isCorrect) {
      playCorrectSound();
      setInquiryPassed(true);
      setInquiryFeedback(opt.explanation);
      fireCelebrationConfetti('Inquiry_Solved');
    } else {
      playButtonClick();
      setInquiryPassed(false);
      setInquiryFeedback(opt.explanation);
    }
  };

  // ── Step 1: Hotspot Data ──────────────────────────────────────────────────
  const hotspots = useMemo(() => [
    {
      id: 'wet_floor',
      icon: '💧',
      name: 'Wet Corridor Floor',
      x: '50%',
      y: '78%',
      fact: 'Observation: Water on smooth corridor tiles forms a thin slippery layer that greatly reduces friction.',
      audio_url: '/audio/week33/discovery_hotspot_1.mp3'
    },
    {
      id: 'rubber_shoes',
      icon: '👟',
      name: 'Rubber Shoe Soles',
      x: '28%',
      y: '65%',
      fact: 'Observation: Jake wore rubber soles with strong grip and high friction, helping him walk safely.',
      audio_url: '/audio/week33/discovery_hotspot_2.mp3'
    },
    {
      id: 'warning_sign',
      icon: '⚠️',
      name: 'Yellow Caution Sign',
      x: '75%',
      y: '50%',
      fact: 'Observation: Cleaners mopped the slippery tiles and placed a yellow warning sign to alert everyone.',
      audio_url: '/audio/week33/discovery_hotspot_3.mp3'
    }
  ], []);

  // ── Step 2: Clue Cards Data ───────────────────────────────────────────────
  const clueCards = useMemo(() => [
    {
      id: 'low_friction',
      title: '🔬 Low Surface Friction',
      isCorrect: true,
      description: 'Water formed a thin slippery layer between Tom\'s smooth shoe soles and the floor tiles, drastically reducing the friction needed to walk safely.'
    },
    {
      id: 'smooth_dry_floor',
      title: '🧱 Rough Carpet Flooring',
      isCorrect: false,
      description: 'The corridor has thick rough carpet that provides maximum grip and prevents anyone from slipping.'
    }
  ], []);

  // ── Step 3: Sentence Word Pills (Shuffled on Initial Display) ─────────────
  const rawWordPills = useMemo(() => [
    { id: 'p1', text: 'Water on the smooth corridor tiles', correctOrder: 1 },
    { id: 'p2', text: 'greatly reduced surface friction,', correctOrder: 2 },
    { id: 'p3', text: 'so Tom slipped while running in a hurry.', correctOrder: 3 },
    { id: 'p_dist', text: 'because of heavy rain inside the classroom.', correctOrder: -1 } // distractor
  ], []);

  const [shuffledWordPills, setShuffledWordPills] = useState([]);

  useEffect(() => {
    // Fisher-Yates deterministic/randomized initial shuffle so pills are never pre-sorted
    const pills = [...rawWordPills];
    for (let i = pills.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pills[i], pills[j]] = [pills[j], pills[i]];
    }
    setShuffledWordPills(pills);
  }, [rawWordPills]);

  const requiredPillCount = 3;
  const isSentenceComplete = assembledPills.length === requiredPillCount;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleHotspotClick = (hs) => {
    playButtonClick();
    setObservedHotspot(hs);
    // 🎧 Hotspot Tap: play discovery fact pre-generated static audio via speakText
    if (hs?.fact) {
      speakText(hs.fact, hs.audio_url || `/audio/week33/${hs.id}.mp3`, 1.0, null, 'read');
    }
  };

  const handleClueSelect = (clue) => {
    if (clue.isCorrect) {
      playCorrectSound();
      setSelectedClue(clue.id);
      setClueError(null);
    } else {
      playButtonClick();
      setClueError('🔬 Science Alert: That did not cause the slip! Try examining the friction between shoes and tiles.');
    }
  };

  const handleAddPill = (pill) => {
    if (pill.correctOrder === -1) {
      playButtonClick();
      setSentenceError('⚠️ That fact is not part of the corridor physics report. Pick the friction cause and effect!');
      return;
    }
    if (assembledPills.some(p => p.id === pill.id)) return;

    playCorrectSound();
    setSentenceError(null);
    setAssembledPills(prev => [...prev, pill]);
  };

  const handleRemovePill = (pillId) => {
    playButtonClick();
    setAssembledPills(prev => prev.filter(p => p.id !== pillId));
  };

  const handleFinalSubmit = () => {
    setIsCompleted(true);
    playVictoryFanfare();
    fireCelebrationConfetti('ScienceDetective_Complete');
    if (onComplete) onComplete(50);
  };

  const finalReportText = "While investigating the corridor, we discovered that water on the smooth tiles reduced surface friction, so Tom slipped while running in a hurry. Jake walked carefully with rubber soles that provided strong grip. The cleaners dried the floor and put up a yellow warning sign to keep everyone safe.";

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-4 sm:p-7 border border-purple-200 shadow-xl space-y-6">
      {/* Top Detective Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5">
              <Search size={14} /> DISCOVERY DETECTIVE
            </span>
            <span className="text-xs font-bold text-purple-700">Week {weekNumber} • Discovery Report</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Corridor Friction & Safety Discovery Report
          </h2>
        </div>

        {/* 4-Step Progress Dots — Compact grid on mobile to prevent overflow */}
        <div className="w-full sm:w-auto grid grid-cols-4 sm:flex items-center gap-1 bg-purple-50 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-purple-200">
          {[
            { num: 1, label: 'Observe' },
            { num: 2, label: 'Clue' },
            { num: 3, label: 'Sentence' },
            { num: 4, label: 'Report' }
          ].map(s => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num < currentStep || (s.num === 2 && observedHotspot) || (s.num === 3 && selectedClue) || (s.num === 4 && isSentenceComplete)) {
                  setCurrentStep(s.num);
                }
              }}
              className={`px-1 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition flex items-center justify-center gap-0.5 sm:gap-1 ${
                currentStep === s.num
                  ? 'bg-purple-600 text-white shadow-xs'
                  : currentStep > s.num
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span>{s.num}.</span> <span className="truncate">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── STEP 1: OBSERVE ──────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
            <p className="text-xs sm:text-sm font-bold text-purple-900">
              🔍 <strong>Step 1:</strong> Tap an evidence spot on the corridor diagram to observe what happened!
            </p>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border-2 border-purple-200 shadow-md">
            <img
              src="/images/week33/read_cover_w33.jpg"
              alt="Corridor Observation Scene"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = '/images/week33/read_stem.jpg'; }}
            />

            {/* Hotspots */}
            {hotspots.map(hs => (
              <button
                key={hs.id}
                type="button"
                onClick={() => handleHotspotClick(hs)}
                style={{ top: hs.y, left: hs.x }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-2xl font-black text-xs shadow-xl transition-all flex items-center gap-1.5 ${
                  observedHotspot?.id === hs.id
                    ? 'bg-amber-400 text-slate-950 scale-110 ring-4 ring-amber-300 z-20'
                    : 'bg-slate-950/80 text-white hover:bg-slate-950 animate-pulse border border-white/40'
                }`}
              >
                <span>{hs.icon}</span>
                <span className="hidden sm:inline">{hs.name}</span>
              </button>
            ))}
          </div>

          {/* Observation Callout Card */}
          {observedHotspot && (
            <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-2 animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
                  <Lightbulb size={16} className="text-amber-600" /> Evidence Found: {observedHotspot.name}
                </span>
                <button
                  type="button"
                  onClick={() => speakText(observedHotspot.fact, observedHotspot.audio_url || `/audio/week33/${observedHotspot.id}.mp3`, 1.0, null, 'read')}
                  className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <Volume2 size={13} /> Listen
                </button>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-relaxed">
                {observedHotspot.fact}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={!observedHotspot}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2"
            >
              Next: Pick Discovery Clue <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: PICK CLUE ────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
            <p className="text-xs sm:text-sm font-bold text-purple-900">
              💡 <strong>Step 2:</strong> What discovery clue explains why the boy slipped on the wet corridor floor?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-1">
            {clueCards.map(clue => {
              const isSelected = selectedClue === clue.id;
              return (
                <button
                  key={clue.id}
                  type="button"
                  onClick={() => handleClueSelect(clue)}
                  className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl text-left border-2 transition-all space-y-1.5 sm:space-y-2 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-200 shadow-lg scale-102'
                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm sm:text-base text-slate-900">{clue.title}</h3>
                    {isSelected && <CheckCircle2 size={20} className="text-emerald-600" />}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {clue.description}
                  </p>
                  <div className="pt-2 text-xs font-bold text-purple-700">
                    {isSelected ? '✓ Clue Confirmed' : 'Tap to select this clue'}
                  </div>
                </button>
              );
            })}
          </div>

          {clueError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertTriangle size={15} className="text-rose-600 shrink-0" />
              <span>{clueError}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              disabled={!selectedClue}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2"
            >
              Next: Snap Sentence <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: SNAP SENTENCE ────────────────────────────────────────── */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
            <p className="text-xs sm:text-sm font-bold text-purple-900">
              🧩 <strong>Step 3:</strong> Tap the word pills in order to snap your official discovery sentence together!
            </p>
          </div>

          {/* Target Sentence Drop Area */}
          <div className="p-3.5 sm:p-5 bg-gradient-to-br from-indigo-900 to-purple-950 rounded-2xl sm:rounded-3xl border border-purple-400 text-white space-y-2 sm:space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] sm:text-[11px] font-black uppercase text-amber-300 tracking-wider">
                📝 Discovery Sentence:
              </span>
              <span className="text-xs text-purple-200 font-bold">
                {assembledPills.length} / {requiredPillCount} words connected
              </span>
            </div>

            <div className="min-h-16 p-3 bg-black/40 rounded-2xl border border-purple-400/40 flex flex-wrap items-center gap-2">
              {assembledPills.length === 0 ? (
                <span className="text-xs text-purple-300/70 italic">
                  Tap the magnetic word pills below to build your discovery sentence...
                </span>
              ) : (
                assembledPills.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleRemovePill(p.id)}
                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shadow transition active:scale-95 flex items-center gap-1.5"
                    title="Tap to remove"
                  >
                    <span>{p.text}</span>
                    <span className="text-[10px] text-slate-700">✕</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {sentenceError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertTriangle size={15} className="text-rose-600 shrink-0" />
              <span>{sentenceError}</span>
            </div>
          )}

          {/* Magnetic Word Pills Bank */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-black uppercase text-slate-600 tracking-wider block">
              Tap Word Pills to Insert:
            </span>
            <div className="flex flex-wrap gap-2">
              {shuffledWordPills.map(pill => {
                const isSelected = assembledPills.some(p => p.id === pill.id);
                return (
                  <button
                    key={pill.id}
                    type="button"
                    disabled={isSelected}
                    onClick={() => handleAddPill(pill)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-xs border ${
                      isSelected
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-purple-50 text-slate-900 border-purple-200 hover:border-purple-400 active:scale-95'
                    }`}
                  >
                    + {pill.text}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              disabled={!isSentenceComplete}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2"
            >
              Next: View Official Report <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: SEE REPORT & COLLECT BADGE ───────────────────────────── */}
      {currentStep === 4 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Stamped Spiral Notebook */}
          <div className="relative p-3.5 sm:p-6 bg-amber-50/90 rounded-2xl sm:rounded-3xl border-2 border-amber-200 shadow-md space-y-3 sm:space-y-4">
            {/* Spiral binding rings decoration */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase text-amber-900 tracking-wider ml-1">
                📓 Nova's Official Discovery Field Notebook
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-200 pb-2.5">
              <div>
                <h3 className="text-base sm:text-xl font-black text-slate-900">
                  Corridor Friction & Safety Field Report
                </h3>
                <p className="text-xs text-amber-800 font-bold">Investigator: Junior Discovery Detective</p>
              </div>
              <button
                type="button"
                onClick={() => speakText(finalReportText, '/audio/week33/discovery_report_final.mp3', 1.0, null, 'read')}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow transition flex items-center gap-1.5"
              >
                <Volume2 size={13} /> Listen Report
              </button>
            </div>

            {/* Official Report Findings Paragraph */}
            <div className="p-3 sm:p-4 bg-white/90 rounded-xl sm:rounded-2xl border border-amber-200 text-slate-900 leading-relaxed font-serif text-xs sm:text-base space-y-1.5 sm:space-y-2">
              <p>
                <strong>Observation:</strong> While investigating the corridor, we discovered that <em>water on the smooth tiles greatly reduced surface friction</em>, so Tom slipped while running in a hurry.
              </p>
              <p>
                <strong>Scientific Conclusion:</strong> Jake walked carefully with rubber shoe soles that provided strong grip. The cleaners mopped the floor dry and put up a yellow warning sign to protect all students!
              </p>
            </div>

            {/* ── 🔬 Deep Inquiry ("Why?") Challenge ── */}
            <div className="p-3.5 sm:p-5 bg-purple-50/90 rounded-2xl border-2 border-purple-200 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤔</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-purple-950 uppercase tracking-wide">
                      Deep Inquiry Challenge: Why did this happen?
                    </h4>
                    <p className="text-[11px] text-purple-700 font-medium">
                      Apply scientific reasoning to explain the friction cause & effect
                    </p>
                  </div>
                </div>
                {inquiryPassed && (
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-black rounded-lg border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Solved
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-800">
                {inquiryData.question}
              </p>

              <div className="space-y-2 pt-1">
                {inquiryData.options.map((opt, oIdx) => {
                  const isSelected = selectedInquiryOption === oIdx;
                  const isCorrectOption = opt.isCorrect;
                  let btnStyle = "bg-white hover:bg-purple-100/50 border-purple-200 text-slate-800";
                  if (isSelected) {
                    btnStyle = isCorrectOption
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300 font-black"
                      : "bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200";
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectInquiryOption(oIdx, opt)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span>{opt.text}</span>
                      {isSelected && (
                        isCorrectOption ? (
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle size={16} className="text-rose-600 shrink-0" />
                        )
                      )}
                    </button>
                  );
                })}
              </div>

              {inquiryFeedback && (
                <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  inquiryPassed ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-rose-100 text-rose-900 border border-rose-200'
                }`}>
                  {inquiryPassed ? <CheckCircle2 size={14} className="text-emerald-700 shrink-0" /> : <AlertTriangle size={14} className="text-rose-600 shrink-0" />}
                  <span>{inquiryFeedback}</span>
                </div>
              )}
            </div>

            {/* Detective Badge */}
            <div className="p-4 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-2xl text-slate-950 flex items-center gap-3 shadow-md border border-amber-300">
              <div className="w-12 h-12 rounded-2xl bg-white/90 shadow flex items-center justify-center text-2xl shrink-0">
                🥇
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-wide">Certified Discovery Detective</h4>
                <p className="text-xs text-slate-800 font-bold">Corridor Physics & Safety Mastery Badge Earned</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Back to Sentence
            </button>

            {!isCompleted ? (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-2xl shadow-xl transition active:scale-95 flex items-center gap-2 animate-bounce"
              >
                <Award size={18} /> CLAIM 50 XP & FINISH QUEST
              </button>
            ) : (
              <div className="px-6 py-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-black flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-700" />
                <span>Discovery Report Completed & Saved (+50 XP)!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
