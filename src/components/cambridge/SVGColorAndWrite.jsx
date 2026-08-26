import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Palette, PlayCircle, Eye, EyeOff, Edit3, Volume2 } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import ExamIntroAudioButton from '../common/ExamIntroAudioButton';
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
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(50);
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
          <button
            onClick={handlePlayMasterAudio}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md transition active:scale-95"
          >
            <PlayCircle size={15} />
            {isPlayingAudio ? "Pause Audio" : "Play Part 5 Audio"}
          </button>
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

        {/* Right Column: Interactive Line-Art Canvas with Direct Clickable Hotspots */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-3 sm:p-4 border-2 border-slate-800 shadow-2xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <Palette size={13} /> Interactive Scene — Click targets to Color & Write:
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              5 Scored Targets + 1 Example
            </span>
          </div>

          {/* Line-Art Image & SVG Overlay Container */}
          <div className="relative w-full aspect-[4/3] max-h-[420px] rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner select-none">
            {/* Background Line-Art Scene */}
            <img
              src={sceneImageUrl}
              alt="Listening Part 5 Scene"
              className="w-full h-full object-cover filter contrast-105"
              onError={(e) => {
                // Fallback to W34 diff scene if webtoon is missing
                if (!e.target.src.includes('w34_diff_scene_a')) {
                  e.target.src = `/images/week${currentWeek}/w${currentWeek}_diff_scene_a.jpg`;
                }
              }}
            />

            {/* Example Hotspot (Pre-colored green badge) */}
            {exampleInstruction && (
              <div
                style={{
                  left: `${exampleInstruction.x || 10}%`,
                  top: `${exampleInstruction.y || 10}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-10 px-2 py-1 bg-emerald-600/90 text-white rounded-lg text-[10px] font-black border border-emerald-300 shadow-lg flex items-center gap-1 backdrop-blur-xs"
              >
                <span>★ EX: Leaves (Green)</span>
              </div>
            )}

            {/* Interactive Color & Write Spatial Hotspots */}
            {testInstructions.map((inst, idx) => {
              const isColor = inst.type === 'color';
              const userColor = coloredElements[inst.id];
              const userText = writtenText[inst.id] || '';
              const isCorrect = isSubmitted && (
                isColor
                  ? (userColor || '').toLowerCase() === inst.target_color.toLowerCase()
                  : userText.trim().toUpperCase() === inst.target_word
              );

              return (
                <div
                  key={inst.id}
                  style={{
                    left: `${inst.x}%`,
                    top: `${inst.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute z-20 flex flex-col items-center"
                >
                  {isColor ? (
                    /* Color Hotspot Button */
                    <button
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleApplyColor(inst.id)}
                      style={{
                        backgroundColor: userColor || 'rgba(15, 23, 42, 0.85)',
                        borderColor: userColor ? '#ffffff' : (isSubmitted ? '#f43f5e' : '#fbbf24')
                      }}
                      className={`group p-2 rounded-2xl border-2 shadow-xl transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs ${
                        userColor ? 'ring-3 ring-amber-400 scale-105' : 'hover:scale-110 hover:border-amber-300 animate-pulse'
                      }`}
                      title={`Click to color ${inst.item}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-black text-[10px] flex items-center justify-center border border-white/40">
                        {idx + 1}
                      </span>
                      <Palette size={14} className={userColor ? 'text-white' : 'text-amber-400'} />
                      <span className="text-[11px] font-black text-white px-1">
                        {inst.item}
                      </span>
                      {isSubmitted && (
                        isCorrect ? <CheckCircle2 size={14} className="text-emerald-400 ml-0.5" /> : <AlertCircle size={14} className="text-rose-400 ml-0.5" />
                      )}
                    </button>
                  ) : (
                    /* Write Hotspot Bubble */
                    <div
                      className={`p-1.5 rounded-2xl border-2 shadow-xl transition-all flex items-center gap-1.5 backdrop-blur-md ${
                        userText ? 'bg-slate-950/90 border-cyan-400 ring-2 ring-cyan-400/40' : 'bg-slate-900/85 border-amber-400'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <Edit3 size={13} className="text-cyan-400 shrink-0" />
                      <input
                        type="text"
                        disabled={isSubmitted}
                        value={userText}
                        onChange={(e) => handleTextChange(inst.id, e.target.value)}
                        placeholder={inst.item}
                        maxLength={12}
                        className="w-20 sm:w-24 px-2 py-0.5 bg-slate-800 text-cyan-300 font-mono font-black text-xs rounded border border-slate-700 focus:outline-none focus:border-cyan-400 text-center uppercase"
                      />
                      {isSubmitted && (
                        isCorrect ? <CheckCircle2 size={14} className="text-emerald-400 shrink-0" /> : <AlertCircle size={14} className="text-rose-400 shrink-0" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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
