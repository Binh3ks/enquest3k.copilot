import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Trophy, ChevronRight, ChevronLeft, Volume2, Search, Lightbulb, Compass, Award } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { playButtonClick, playCorrectSound, playVictoryFanfare } from '../../utils/soundEffects';
import { speakText } from '../../utils/AudioHelper';
import QuickWritePanel from '../common/QuickWritePanel';

const NEUTRAL_IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9' stroke='%23cbd5e1' stroke-width='2'/%3E%3Ctext x='50%25' y='46%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='32'%3E🖼️%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='14' font-weight='600' fill='%2364748b'%3EImage Not Available%3C/text%3E%3C/svg%3E";

export default function ScienceReportCreator({ reportTopic, customConfig, weekNumber, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: OBSERVE, 2: PICK CLUE, 3: QUICK WRITE, 4: SEE REPORT
  const [observedHotspot, setObservedHotspot] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);
  const [clueError, setClueError] = useState(null);
  const [studentReportText, setStudentReportText] = useState('');
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // ── Step 4 Inquiry ("Why?") State & Data ──────────────────────────────────
  const [selectedInquiryOption, setSelectedInquiryOption] = useState(null);
  const [inquiryPassed, setInquiryPassed] = useState(false);
  const [inquiryFeedback, setInquiryFeedback] = useState(null);

  const rawInquiry = customConfig?.inquiryQuestion;
  const inquiryData = (rawInquiry && rawInquiry.question && Array.isArray(rawInquiry.options) && rawInquiry.options.length > 0)
    ? rawInquiry
    : null;

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

  const isW34 = Number(weekNumber) === 34;

  const displayTitle = customConfig?.notebookTitle
    || customConfig?.topic
    || reportTopic
    || (isW34 ? "Animal Cooperation in Nature" : "Corridor Friction & Safety Discovery Report");

  // ── Step 1: Hotspot Data ──────────────────────────────────────────────────
  const hotspots = useMemo(() => {
    if (customConfig?.hotspots && Array.isArray(customConfig.hotspots)) {
      return customConfig.hotspots;
    }
    const currentWeekNum = weekNumber || (isW34 ? 34 : 33);
    if (isW34) {
      return [
        {
          id: 'lion_protection',
          icon: '🦁',
          name: 'Mighty Lion Territory',
          x: '30%',
          y: '65%',
          fact: 'Observation: Large animals protect the forest territory and keep other creatures safe from danger.',
          audio_url: `/audio/week${currentWeekNum}/discovery_hotspot_1.mp3`
        },
        {
          id: 'mouse_seeds',
          icon: '🐭',
          name: 'Mouse Seed Storage',
          x: '75%',
          y: '70%',
          fact: 'Observation: Tiny mice clean the forest floor and bury seeds that grow into tall green trees.',
          audio_url: `/audio/week${currentWeekNum}/discovery_hotspot_2.mp3`
        },
        {
          id: 'forest_canopy',
          icon: '🌳',
          name: 'Forest Canopy',
          x: '50%',
          y: '35%',
          fact: 'Observation: Tall trees give shelter and food, allowing big and small animals to cooperate harmoniously.',
          audio_url: `/audio/week${currentWeekNum}/discovery_hotspot_3.mp3`
        }
      ];
    }
    return [
      {
        id: 'wet_floor',
        icon: '💧',
        name: 'Wet Corridor Floor',
        x: '50%',
        y: '78%',
        fact: 'Observation: Water on smooth corridor tiles forms a thin slippery layer that greatly reduces friction.',
        audio_url: `/audio/week${currentWeekNum}/discovery_hotspot_1.mp3`
      },
      {
        id: 'rubber_shoes',
        icon: '👟',
        name: 'Rubber Shoe Soles',
        x: '28%',
        y: '65%',
        fact: 'Observation: Jake wore rubber soles with strong grip and high friction, helping him walk safely.',
        audio_url: `/audio/week${currentWeekNum}/discovery_hotspot_2.mp3`
      },
      {
        id: 'warning_sign',
        icon: '⚠️',
        name: 'Yellow Caution Sign',
        x: '75%',
        y: '50%',
        fact: 'Observation: Cleaners mopped the slippery tiles and placed a yellow warning sign to alert everyone.',
        audio_url: `/audio/week${currentWeekNum}/discovery_hotspot_3.mp3`
      }
    ];
  }, [customConfig, isW34, weekNumber]);

  // ── Step 2: Clue Cards Data ───────────────────────────────────────────────
  const clueCards = useMemo(() => {
    if (customConfig?.clueCards && Array.isArray(customConfig.clueCards)) {
      return customConfig.clueCards;
    }
    if (isW34) {
      return [
        {
          id: 'mutual_cooperation',
          title: '🔬 Mutual Cooperation & Teamwork',
          isCorrect: true,
          description: 'Different animals have unique skills that help everyone survive, keeping the forest ecosystem balanced and safe.'
        },
        {
          id: 'solo_living',
          title: '🧱 Solo Competition Without Helping',
          isCorrect: false,
          description: 'Creatures live alone without cooperating, making it much harder to find food and survive danger.'
        }
      ];
    }
    return [
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
    ];
  }, [customConfig, isW34]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleHotspotClick = (hs) => {
    playButtonClick();
    setObservedHotspot(hs);
    if (hs?.fact) {
      speakText(hs.fact, hs.audio_url || `/audio/week${weekNumber}/${hs.id}.mp3`, 1.0, null, 'read');
    }
  };

  const handleClueSelect = (clue) => {
    if (clue.isCorrect) {
      playCorrectSound();
      setSelectedClue(clue.id);
      setClueError(null);
    } else {
      playButtonClick();
      setClueError(isW34
        ? '🔬 Science Alert: That did not explain teamwork! Examine how mutual cooperation helps both animals.'
        : '🔬 Science Alert: That did not cause the slip! Try examining the friction between shoes and tiles.');
    }
  };

  const scaffoldData = useMemo(() => {
    if (customConfig?.scaffoldData) return customConfig.scaffoldData;
    if (isW34) {
      return {
        starters: [
          "In the forest ecosystem,",
          "The mighty lion protected the territory because",
          "The tiny mouse planted seeds in the ground so",
          "Cooperation keeps nature strong and green because"
        ],
        chunks: [
          "animals work together in harmony",
          "different skills help everyone survive",
          "teamwork keeps the forest healthy"
        ],
        connectors: [
          ", so",
          ", but",
          ". Therefore,",
          "and"
        ],
        actions: [
          "all animals stay safe from danger.",
          "new plants and trees grow well.",
          "everyone has an important role in nature."
        ]
      };
    }
    return {
      starters: [
        "When water spills on corridor tiles,",
        "Jake walked safely across the corridor because",
        "Tom slipped and hurt his knee because",
        "Friction is essential in school corridors because"
      ],
      chunks: [
        "smooth floor tiles lose surface friction",
        "textured rubber soles provide strong grip",
        "wet surfaces make walking dangerous"
      ],
      connectors: [
        ", so",
        ", but",
        ". Therefore,",
        "and"
      ],
      actions: [
        "everyone must always walk carefully.",
        "cleaners put up a yellow caution sign.",
        "wearing proper shoes prevents slipping."
      ]
    };
  }, [customConfig, isW34]);

  const handleFinalSubmit = () => {
    setIsCompleted(true);
    playVictoryFanfare();
    fireCelebrationConfetti('ScienceDetective_Complete');
    if (onComplete) onComplete(50);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-3 sm:p-5 border border-purple-200 shadow-xl space-y-3.5">
      {/* Top Detective Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2.5 border-b border-purple-100">
        <div>
          <h2 className="text-sm sm:text-base font-black text-slate-900">
            {displayTitle}
          </h2>
        </div>

        {/* 4-Step Progress Dots — Compact grid on mobile to prevent overflow */}
        <div className="w-full sm:w-auto grid grid-cols-4 sm:flex items-center gap-1 bg-purple-50 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-purple-200">
          {[
            { num: 1, label: 'Observe' },
            { num: 2, label: 'Clue' },
            { num: 3, label: 'Quick Write' },
            { num: 4, label: 'Report' }
          ].map(s => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num < currentStep || (s.num === 2 && observedHotspot) || (s.num === 3 && selectedClue) || (s.num === 4 && (isReportSubmitted || studentReportText))) {
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

      {/* Teacher & Parent Note Banner */}
      {customConfig?.teacher_parent_note && (
        <div className="p-2.5 sm:p-3 bg-blue-50/90 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
          <span className="font-black uppercase tracking-wider text-blue-950">Teacher & Parent Note:</span> {customConfig.teacher_parent_note}
        </div>
      )}

      {/* CLIL Data Card (3 Key Facts) */}
      {Array.isArray(customConfig?.data_card) && customConfig.data_card.length > 0 && (
        <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-purple-950 tracking-wider flex items-center gap-1">
              <Sparkles size={14} className="text-purple-600" /> CLIL Data Card (3 Key Facts)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {customConfig.data_card.map((row, idx) => (
              <div key={idx} className="p-2.5 bg-white border border-purple-100 rounded-xl shadow-2xs space-y-1">
                <div className="text-xs font-black text-purple-900">{row.subject}</div>
                <div className="text-[11px] text-slate-700 leading-tight"><strong>Action:</strong> {row.action}</div>
                <div className="text-[11px] text-emerald-800 leading-tight font-bold"><strong>Result:</strong> {row.result}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 1: OBSERVE ──────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
            <p className="text-xs sm:text-sm font-bold text-purple-900">
              🔍 <strong>Step 1:</strong> Tap an evidence spot on the {isW34 ? 'ecosystem' : 'corridor'} diagram to observe what happened!
            </p>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-purple-200 shadow-md mx-auto w-full max-w-4xl lg:max-w-5xl aspect-video"
            style={{ maxHeight: '56vh' }}
          >
            <img
              src={isW34 ? "/images/week34/science_report_scene_w34.jpg" : "/images/week33/read_cover_w33.jpg"}
              alt={isW34 ? "Animal Cooperation Observation Scene" : "Corridor Observation Scene"}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`[ScienceReportCreator] Failed to load observation scene image: ${e.target.src}`);
                e.target.onerror = null;
                e.target.src = NEUTRAL_IMAGE_PLACEHOLDER;
              }}
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
                <span>{hs.name}</span>
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
                  onClick={() => speakText(observedHotspot.fact, observedHotspot.audio_url || (weekNumber ? `/audio/week${weekNumber}/${observedHotspot.id}.mp3` : null), 1.0, null, 'read')}
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
              💡 <strong>Step 2:</strong> {isW34 ? "What discovery clue explains how cooperation helps the forest ecosystem?" : "What discovery clue explains why the boy slipped on the wet corridor floor?"}
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
              Next: Quick Write Report <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: QUICK WRITE DISCOVERY REPORT ─────────────────────────── */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
            <p className="text-xs sm:text-sm font-bold text-purple-900">
              ✍️ <strong>Step 3:</strong> Use the sentence starters & science chunks below to write your official discovery report!
            </p>
          </div>

          <QuickWritePanel
            prompt={isW34 ? "Write a 15–25 word scientific discovery report explaining how animal cooperation helps nature survive." : "Write a 15–25 word scientific discovery report explaining why friction keeps corridor floors safe."}
            scaffoldGroups={scaffoldData}
            modelSentence={isW34 ? "In the forest ecosystem, animals work together in harmony, so everyone has an important role in nature." : "When water spills on corridor tiles, smooth floor tiles lose surface friction, so everyone must always walk carefully."}
            minWords={15}
            maxWords={25}
            initialValue={studentReportText}
            onSubmit={(txt) => {
              setStudentReportText(txt);
              setIsReportSubmitted(true);
              playCorrectSound();
              fireCelebrationConfetti('QuickWrite_Complete');
              setCurrentStep(4);
            }}
          />

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Back to Clue
            </button>
            {(isReportSubmitted || studentReportText) && (
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black shadow transition flex items-center gap-1.5"
              >
                Next: View Official Report <ChevronRight size={14} />
              </button>
            )}
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
                  {isW34 ? "Animal Cooperation & Ecosystem Field Report" : "Corridor Friction & Safety Field Report"}
                </h3>
                <p className="text-xs text-amber-800 font-bold">Investigator: Junior Discovery Detective</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const finalAudioUrl = customConfig?.final_audio_url || (weekNumber ? `/audio/week${weekNumber}/discovery_report_final.mp3` : null);
                  speakText(`Discovery Report: ${studentReportText}`, finalAudioUrl, 1.0, null, 'read');
                }}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow transition flex items-center gap-1.5"
              >
                <Volume2 size={13} /> Listen Report
              </button>
            </div>

            {/* Official Report Findings Paragraph */}
            <div className="p-3.5 sm:p-5 bg-white/90 rounded-xl sm:rounded-2xl border border-amber-200 text-slate-900 space-y-3 shadow-xs">
              <div>
                <div className="flex items-center justify-between text-xs font-black uppercase text-amber-900 tracking-wider mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-500" /> Your Discovery Report:
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-[11px] text-purple-700 hover:text-purple-900 underline font-bold"
                  >
                    ✏️ Edit Writing
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 bg-amber-50/70 p-3 rounded-xl border border-amber-100 italic leading-relaxed">
                  "{studentReportText || (isW34 ? "In the forest ecosystem, animals work together in harmony, so everyone has an important role in nature." : "When water spills on corridor tiles, smooth floor tiles lose surface friction, so everyone must always walk carefully.")}"
                </p>
              </div>

              <div className="pt-2 border-t border-amber-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-1">
                <p>
                  <strong>Observation:</strong> {isW34 ? "While investigating the forest ecosystem, we discovered that animals of all sizes cooperate and help each other survive." : "While investigating the corridor, we discovered that water on the smooth tiles greatly reduced surface friction, so Tom slipped while running in a hurry."}
                </p>
                <p>
                  <strong>Scientific Conclusion:</strong> {isW34 ? "The mighty lion protects the territory, tiny mice plant new tree seeds, and oxpeckers clean big animals. Mutual teamwork keeps nature healthy and strong!" : "Jake walked carefully with rubber shoe soles that provided strong grip. The cleaners mopped the floor dry and put up a yellow warning sign to protect all students!"}
                </p>
              </div>
            </div>

            {/* ── 🔬 Deep Inquiry ("Why?") Challenge ── */}
            {!inquiryData ? (
              <div data-testid="science-report-data-missing" className="w-full p-6 bg-rose-50 border-2 border-rose-300 rounded-2xl text-center space-y-2 shadow-inner font-sans">
                <AlertTriangle size={36} className="mx-auto text-rose-500 animate-pulse" />
                <h4 className="text-base font-black text-rose-900">⚠️ Science Report Inquiry Data Missing</h4>
                <p className="text-xs font-semibold text-rose-700">
                  No inquiry question found for Week {weekNumber || 'N/A'}. Expected data in writing_hub.science_report_config.inquiryQuestion.
                </p>
              </div>
            ) : (
              <div className="p-3.5 sm:p-5 bg-purple-50/90 rounded-2xl border-2 border-purple-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🤔</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-purple-950 uppercase tracking-wide">
                        Deep Inquiry Challenge: Why did this happen?
                      </h4>
                      <p className="text-[11px] text-purple-700 font-medium">
                        {isW34 ? "Apply scientific reasoning to explain the animal adaptation cause & effect" : "Apply scientific reasoning to explain the friction cause & effect"}
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
            )}

            {/* Detective Badge */}
            <div className="p-4 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-2xl text-slate-950 flex items-center gap-3 shadow-md border border-amber-300">
              <div className="w-12 h-12 rounded-2xl bg-white/90 shadow flex items-center justify-center text-2xl shrink-0">
                🥇
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-wide">Certified Discovery Detective</h4>
                <p className="text-xs text-slate-800 font-bold">{isW34 ? "Animal Cooperation & Ecosystem Mastery Badge Earned" : "Corridor Physics & Safety Mastery Badge Earned"}</p>
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
              <ChevronLeft size={14} /> Back to Quick Write
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
