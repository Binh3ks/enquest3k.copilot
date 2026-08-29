import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Palette, PlayCircle, Eye, EyeOff, Edit3, Volume2 } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import ExamIntroAudioButton from '../common/ExamIntroAudioButton';
import FlyersListeningPlayButton from '../common/FlyersListeningPlayButton';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';

export function SVGColorAndWrite({ customData, data: propData, weekNumber, onComplete }) {
  const [selectedColor, setSelectedColor] = useState('#eab308'); // Default yellow
  const [coloredElements, setColoredElements] = useState({}); // { instId: colorHex }
  const [writtenText, setWrittenText] = useState({}); // { instId: textValue }
  const [activeInputId, setActiveInputId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTextHelp, setShowTextHelp] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [score, setScore] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const colorsPalette = [
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Dark Green', hex: '#15803d' },
    { name: 'Red', hex: '#ef4444' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Brown', hex: '#854d0e' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Grey', hex: '#64748b' }
  ];

  const rawData = customData || propData || {};
  const currentWeek = weekNumber || 34;

  const sceneImageUrl = rawData.image_url || `/images/week${currentWeek}/w${currentWeek}_diff_scene_a.jpg` || `/images/week${currentWeek}/webtoon_scene_1.png`;

  // Extract example and scored test instructions
  const exampleInstruction = useMemo(() => {
    if (rawData.instructions && Array.isArray(rawData.instructions)) {
      return rawData.instructions.find(i => i.isExample || i.id === 'inst_0') || null;
    }
    return null;
  }, [rawData]);

  const testInstructions = useMemo(() => {
    if (rawData.instructions && Array.isArray(rawData.instructions)) {
      return rawData.instructions.filter(i => !i.isExample && i.id !== 'inst_0').map((inst, index) => {
        const id = inst.id || `inst_${index + 1}`;
        const isWrite = inst.action === 'write' || !!inst.word || !!inst.write_word;
        
        let targetColorHex = '#3b82f6';
        const cLower = (inst.color || '').toLowerCase();
        if (cLower.includes('yellow') || cLower.includes('gold')) targetColorHex = '#eab308';
        else if (cLower.includes('dark green')) targetColorHex = '#15803d';
        else if (cLower.includes('green')) targetColorHex = '#22c55e';
        else if (cLower.includes('blue')) targetColorHex = '#3b82f6';
        else if (cLower.includes('red')) targetColorHex = '#ef4444';
        else if (cLower.includes('brown')) targetColorHex = '#854d0e';
        else if (cLower.includes('purple')) targetColorHex = '#a855f7';
        else if (cLower.includes('orange')) targetColorHex = '#f97316';
        else if (cLower.includes('pink')) targetColorHex = '#ec4899';
        else if (cLower.includes('grey') || cLower.includes('gray')) targetColorHex = '#64748b';

        return {
          ...inst,
          id,
          type: isWrite ? 'write' : 'color',
          target_color: targetColorHex,
          target_word: (inst.word || inst.write_word || '').trim().toUpperCase(),
          x: typeof inst.x === 'number' ? inst.x : 50,
          y: typeof inst.y === 'number' ? inst.y : 50
        };
      });
    }

    // Default 5-item fallback (3 color + 2 write)
    return [
      { id: 'inst_1', item: 'Key Object', text: 'Color the key object yellow', type: 'color', color: 'yellow', target_color: '#eab308', x: 45, y: 55 },
      { id: 'inst_2', item: 'Sign Label', text: 'Write the word NET near the ropes', type: 'write', word: 'NET', target_word: 'NET', x: 65, y: 45 },
      { id: 'inst_3', item: 'Small Animal', text: 'Color the small animal brown', type: 'color', color: 'brown', target_color: '#854d0e', x: 30, y: 70 },
      { id: 'inst_4', item: 'Notice Board', text: 'Write the word FOREST on the signboard', type: 'write', word: 'FOREST', target_word: 'FOREST', x: 80, y: 30 },
      { id: 'inst_5', item: 'Head Hat', text: 'Color the hat dark green', type: 'color', color: 'dark green', target_color: '#15803d', x: 90, y: 20 }
    ];
  }, [rawData]);

  const fullAudioScript = useMemo(() => {
    if (rawData.audio_script) return rawData.audio_script;
    return "Listen and colour and write. There is one example.";
  }, [rawData]);

  const handlePlayMasterAudio = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    try {
      VoiceService.speak(fullAudioScript, {
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
      setTimeout(() => setIsPlayingAudio(false), 35000);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const handleApplyColor = (instId) => {
    if (isSubmitted) return;
    setColoredElements(prev => ({
      ...prev,
      [instId]: selectedColor
    }));
  };

  const handleTextChange = (instId, val) => {
    setWrittenText(prev => ({
      ...prev,
      [instId]: val.toUpperCase()
    }));
  };

  const handleCheck = () => {
    let correctCount = 0;

    testInstructions.forEach((inst) => {
      if (inst.type === 'color') {
        const userHex = (coloredElements[inst.id] || '').toLowerCase();
        const targetHex = (inst.target_color || '').toLowerCase();
        if (userHex === targetHex) correctCount++;
      } else {
        const userText = (writtenText[inst.id] || '').trim().toUpperCase();
        const targetText = (inst.target_word || '').trim().toUpperCase();
        if (userText === targetText) correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / testInstructions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 80) {
      fireCelebrationConfetti('L5_Color_And_Write');
      setShowCompletionModal(true);
    }

    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setColoredElements({});
    setWrittenText({});
    setActiveInputId(null);
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-800 text-[11px] font-black uppercase tracking-wider rounded-full border border-amber-300">
            Cambridge A2 Flyers — Listening Part 5
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            🎨 Color & Write On The Picture
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <ExamIntroAudioButton
            weekNumber={currentWeek}
            introId="exam_intro_L5"
            introText="Listen and colour and write. There is one example."
          />
          <FlyersListeningPlayButton
            partNumber={5}
            audioUrl={rawData.audio_url || `/audio/week${currentWeek}/listening_p5_full.mp3`}
            script={fullAudioScript}
            weekNumber={currentWeek}
          />
        </div>
      </div>

      {/* Main Grid: Left Controls vs Right Interactive Line-Art Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Palette & Checklist */}
        <div className="lg:col-span-4 space-y-3">
          {/* Color Palette */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Palette size={14} className="text-amber-600" /> 1. Choose a Color:
            </span>
            <div className="grid grid-cols-5 gap-2">
              {colorsPalette.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className={`h-8 rounded-lg transition-all border-2 flex items-center justify-center shadow-xs ${
                    selectedColor === c.hex ? 'ring-3 ring-amber-400 scale-110 border-white' : 'border-transparent hover:scale-105'
                  }`}
                  title={c.name}
                >
                  {selectedColor === c.hex && <Sparkles size={12} className="text-white drop-shadow" />}
                </button>
              ))}
            </div>
            <div className="text-[11px] font-bold text-slate-500 pt-1 text-center">
              Active Color: <span className="font-black text-slate-900">{colorsPalette.find(c => c.hex === selectedColor)?.name}</span>
            </div>
          </div>

          {/* Collapsible Text Instruction Hints */}
          <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900 uppercase tracking-wider">
                2. Instructions:
              </span>
              <button
                onClick={() => setShowTextHelp(!showTextHelp)}
                className="text-[10px] font-black text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-300 shadow-2xs flex items-center gap-1"
              >
                {showTextHelp ? <EyeOff size={11} /> : <Eye size={11} />}
                {showTextHelp ? 'Hide' : 'Show Text'}
              </button>
            </div>

            {!showTextHelp && !isSubmitted ? (
              <div className="p-3 bg-white rounded-xl border border-amber-200 text-center space-y-1">
                <span className="text-[11px] font-black text-slate-700 block">
                  🎧 Listen to audio & click items on the picture!
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Click 'Show Text' if you need written hints.
                </span>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                {/* Example Row */}
                <div
                  data-testid="example-row"
                  className="p-2 bg-amber-100/90 rounded-lg border border-amber-400 text-[11px] font-bold text-amber-950 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <span className="px-1.5 py-0.2 bg-amber-600 text-white rounded text-[9px] font-black">★ EX</span>
                    <span>{exampleInstruction?.text || "Top tree leaves colored dark green"}</span>
                  </span>
                  <span className="text-[9px] font-black text-amber-800 uppercase">Pre-colored</span>
                </div>

                {testInstructions.map((inst, idx) => {
                  const isColor = inst.type === 'color';
                  const isFilled = isColor ? !!coloredElements[inst.id] : !!writtenText[inst.id];
                  const isCorrect = isSubmitted && (
                    isColor
                      ? (coloredElements[inst.id] || '').toLowerCase() === inst.target_color.toLowerCase()
                      : (writtenText[inst.id] || '').trim().toUpperCase() === inst.target_word
                  );

                  return (
                    <div
                      key={inst.id}
                      className={`p-2 rounded-lg border text-[11px] font-bold transition flex items-center justify-between ${
                        isSubmitted
                          ? isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
                          : isFilled ? 'bg-white border-amber-400' : 'bg-white/80 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate pr-1">
                        <span className="w-4 h-4 rounded bg-slate-800 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate">{inst.text}</span>
                      </div>

                      {isSubmitted ? (
                        isCorrect ? <CheckCircle2 size={14} className="text-emerald-600 shrink-0" /> : <AlertCircle size={14} className="text-rose-500 shrink-0" />
                      ) : (
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                          isFilled ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {isFilled ? (isColor ? 'Colored' : 'Written') : 'Pending'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Authentic Vector Line-Art SVG Canvas */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-3 sm:p-5 border-2 border-slate-800 shadow-2xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Palette size={14} /> Vector Line-Art Canvas — Click paths to fill color & write:
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Active: <span style={{ color: selectedColor }}>● {colorsPalette.find(c => c.hex === selectedColor)?.name}</span>
            </span>
          </div>

          {/* Interactive Vector Line-Art Scene Container */}
          <div className="relative w-full aspect-[4/3] max-h-[440px] rounded-2xl overflow-hidden border-2 border-slate-700 bg-white shadow-2xl select-none">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
            >
              {/* Sky Background */}
              <rect x="0" y="0" width="800" height="600" fill="#f8fafc" />

              {/* Distant Hills Line Art */}
              <path
                d="M 0 380 Q 200 320, 400 360 T 800 340 L 800 600 L 0 600 Z"
                fill="#f1f5f9"
                stroke="#64748b"
                strokeWidth="2"
              />

              {/* Ground & Grass Line Art */}
              <path
                d="M 0 420 Q 250 390, 500 430 T 800 410 L 800 600 L 0 600 Z"
                fill="#e2e8f0"
                stroke="#334155"
                strokeWidth="3"
              />

              {/* --- SCENE OBJECT: TREE LEAVES (Example Pre-colored Green) --- */}
              <g id="tree_structure">
                {/* Tree Trunk */}
                <path
                  d="M 60 600 L 90 220 Q 110 180, 160 160 L 150 600 Z"
                  fill="#cbd5e1"
                  stroke="#1e293b"
                  strokeWidth="3.5"
                />
                {/* Branch to Right */}
                <path
                  d="M 120 230 Q 200 200, 320 220 L 310 240 Q 180 225, 110 270 Z"
                  fill="#cbd5e1"
                  stroke="#1e293b"
                  strokeWidth="3"
                />

                {/* Example Top Tree Leaves (Pre-colored Dark Green) */}
                <path
                  d="M 20 200 C 0 120, 80 40, 180 50 C 260 30, 340 100, 320 180 C 350 240, 260 290, 180 270 C 100 290, 30 250, 20 200 Z"
                  fill="#15803d"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                  className="transition-colors duration-300"
                />
                <text x="140" y="140" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">
                  ★ EXAMPLE: LEAVES (GREEN)
                </text>
              </g>

              {/* --- SCENE OBJECT 5: HUNTER'S HAT ON BRANCH (inst_5 / color) --- */}
              <g
                id="hunter_hat"
                onClick={() => handleApplyColor('inst_5')}
                className="cursor-pointer group"
              >
                {/* Hat Brim */}
                <ellipse
                  cx="260"
                  cy="205"
                  rx="45"
                  ry="12"
                  fill={coloredElements['inst_5'] || '#ffffff'}
                  stroke="#0f172a"
                  strokeWidth="3"
                  className="transition-colors duration-300 group-hover:stroke-amber-500"
                />
                {/* Hat Crown */}
                <path
                  d="M 235 203 C 235 165, 285 165, 285 203 Z"
                  fill={coloredElements['inst_5'] || '#ffffff'}
                  stroke="#0f172a"
                  strokeWidth="3"
                  className="transition-colors duration-300 group-hover:stroke-amber-500"
                />
                {/* Hat Feather / Ribbon */}
                <path d="M 275 190 Q 295 160, 290 145" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                <text x="260" y="235" fill="#0f172a" fontSize="11" fontWeight="800" textAnchor="middle">
                  5. Hunter's Hat
                </text>
              </g>

              {/* --- SCENE OBJECT 4: FOREST SIGNBOARD (inst_4 / write) --- */}
              <g id="signboard" className="cursor-pointer">
                {/* Wooden Post */}
                <rect x="660" y="240" width="16" height="220" fill="#94a3b8" stroke="#0f172a" strokeWidth="3" />
                {/* Sign Board Rectangle */}
                <rect
                  x="580"
                  y="180"
                  width="180"
                  height="75"
                  rx="8"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                />
                <text x="670" y="202" fill="#64748b" fontSize="10" fontWeight="800" textAnchor="middle">
                  4. WRITE ON SIGNBOARD:
                </text>
                <foreignObject x="595" y="210" width="150" height="38">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={writtenText['inst_4'] || ''}
                    onChange={(e) => handleTextChange('inst_4', e.target.value)}
                    placeholder="CLICK & WRITE"
                    maxLength={10}
                    className="w-full h-8 px-2 bg-amber-50 text-slate-900 font-mono font-black text-xs rounded-md border-2 border-slate-700 focus:outline-none focus:border-amber-500 text-center uppercase tracking-widest"
                  />
                </foreignObject>
              </g>

              {/* --- SCENE OBJECT 2: ROPE NET (inst_2 / write) --- */}
              <g id="rope_net" className="cursor-pointer">
                {/* Net Mesh Lines */}
                <path
                  d="M 480 320 L 590 380 M 500 300 L 610 360 M 520 280 L 630 340 M 480 370 L 610 290 M 500 390 L 630 310"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeDasharray="4,3"
                />
                {/* Net Tag / Label to write */}
                <rect
                  x="480"
                  y="340"
                  width="140"
                  height="65"
                  rx="8"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3"
                />
                <text x="550" y="360" fill="#64748b" fontSize="10" fontWeight="800" textAnchor="middle">
                  2. WRITE NEAR ROPE:
                </text>
                <foreignObject x="495" y="368" width="110" height="32">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={writtenText['inst_2'] || ''}
                    onChange={(e) => handleTextChange('inst_2', e.target.value)}
                    placeholder="WRITE WORD"
                    maxLength={6}
                    className="w-full h-7 px-1 bg-amber-50 text-slate-900 font-mono font-black text-xs rounded border border-slate-600 focus:outline-none focus:border-amber-500 text-center uppercase tracking-widest"
                  />
                </foreignObject>
              </g>

              {/* --- SCENE OBJECT: ROCKS --- */}
              <path
                d="M 120 540 C 90 480, 160 450, 240 460 C 280 465, 300 510, 280 550 Z"
                fill="#cbd5e1"
                stroke="#1e293b"
                strokeWidth="3"
              />

              {/* --- SCENE OBJECT 3: TINY MOUSE ON ROCK (inst_3 / color) --- */}
              <g
                id="tiny_mouse"
                onClick={() => handleApplyColor('inst_3')}
                className="cursor-pointer group"
              >
                {/* Mouse Body */}
                <ellipse
                  cx="200"
                  cy="465"
                  rx="24"
                  ry="16"
                  fill={coloredElements['inst_3'] || '#ffffff'}
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  className="transition-colors duration-300 group-hover:stroke-amber-500"
                />
                {/* Mouse Head & Ear */}
                <circle
                  cx="180"
                  cy="460"
                  r="12"
                  fill={coloredElements['inst_3'] || '#ffffff'}
                  stroke="#0f172a"
                  strokeWidth="2"
                />
                <circle cx="178" cy="450" r="6" fill="#fbcfe8" stroke="#0f172a" strokeWidth="1.5" />
                {/* Mouse Tail */}
                <path d="M 224 468 Q 248 455, 252 440" stroke="#0f172a" strokeWidth="2" fill="none" />
                <text x="200" y="500" fill="#0f172a" fontSize="11" fontWeight="800" textAnchor="middle">
                  3. Little Mouse
                </text>
              </g>

              {/* --- SCENE OBJECT 1: BIG LION & LION MANE (inst_1 / color) --- */}
              <g id="big_lion">
                {/* Lion Body Line-Art */}
                <path
                  d="M 360 490 C 340 430, 420 380, 520 400 C 600 410, 620 490, 580 540 C 500 560, 390 550, 360 490 Z"
                  fill="#f8fafc"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                />
                {/* Lion Tail */}
                <path d="M 590 470 Q 660 460, 670 510" stroke="#0f172a" strokeWidth="3" fill="none" />
                <circle cx="675" cy="515" r="8" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />

                {/* Lion Mane (CLICKABLE COLORABLE PATH inst_1) */}
                <path
                  id="lion_mane_path"
                  onClick={() => handleApplyColor('inst_1')}
                  d="M 330 450 C 300 370, 350 300, 420 310 C 490 300, 540 370, 510 450 C 480 500, 360 500, 330 450 Z"
                  fill={coloredElements['inst_1'] || '#ffffff'}
                  stroke="#0f172a"
                  strokeWidth="4"
                  className="cursor-pointer transition-colors duration-300 hover:stroke-amber-500"
                />

                {/* Lion Face Inside Mane */}
                <ellipse
                  cx="420"
                  cy="410"
                  rx="45"
                  ry="40"
                  fill="#fef08a"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  pointerEvents="none"
                />
                {/* Eyes, Nose, Whiskers */}
                <circle cx="405" cy="400" r="4" fill="#0f172a" pointerEvents="none" />
                <circle cx="435" cy="400" r="4" fill="#0f172a" pointerEvents="none" />
                <polygon points="415,415 425,415 420,422" fill="#ef4444" pointerEvents="none" />
                <path d="M 420 422 L 420 430 M 415 430 Q 420 435, 425 430" stroke="#0f172a" strokeWidth="2" fill="none" pointerEvents="none" />

                <text x="420" y="475" fill="#0f172a" fontSize="12" fontWeight="900" textAnchor="middle" pointerEvents="none">
                  1. Lion's Big Mane
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Footer Check & Action Bar */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles size={16} /> Check My Coloring & Writing (5 Items)
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500 animate-bounce" />
              <span className="text-base sm:text-lg font-black text-slate-900">
                Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={13} /> Try Again
            </button>
          </div>
        )}
      </div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletionModal}
        score={score}
        onClose={() => setShowCompletionModal(false)}
        title="Part 5 Coloring Master!"
        subtitle="You colored and wrote all objects on the picture with high precision!"
      />
    </div>
  );
}

export default SVGColorAndWrite;
