import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Palette, Volume2, PlayCircle, Eye, EyeOff } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import ExamIntroAudioButton from '../common/ExamIntroAudioButton';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';

export function SVGColorAndWrite({ customData, data: propData, weekNumber, onComplete }) {
  const [selectedColor, setSelectedColor] = useState('#3b82f6'); // Default blue
  const [coloredElements, setColoredElements] = useState({}); // { elemId: colorHex }
  const [writtenText, setWrittenText] = useState({}); // { labelId: textValue }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTextHelp, setShowTextHelp] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [score, setScore] = useState(null);

  const colorsPalette = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Brown', hex: '#854d0e' },
    { name: 'Grey', hex: '#64748b' }
  ];

  const rawData = customData || propData || {};

  const normalizedTasks = useMemo(() => {
    if (rawData.instructions && Array.isArray(rawData.instructions)) {
      const testInstructions = rawData.instructions.filter(inst => !inst.isExample && inst.id !== 'inst_0');
      return testInstructions.map((inst, index) => {
        const id = inst.id || `inst_${index + 1}`;
        const isWrite = !!(inst.write_word || inst.type === 'write');
        const targetColorHex = inst.target_color || (
          inst.color === 'yellow' ? '#eab308' :
          inst.color === 'blue' ? '#3b82f6' :
          inst.color === 'green' ? '#22c55e' :
          inst.color === 'red' ? '#ef4444' :
          inst.color === 'brown' ? '#854d0e' :
          inst.color === 'grey' ? '#64748b' :
          inst.color === 'purple' ? '#a855f7' : '#3b82f6'
        );

        return {
          id,
          target_id: inst.target_id || `item_${index + 1}`,
          type: isWrite ? 'write' : 'color',
          item_name: inst.item || `Object ${index + 1}`,
          target_color: targetColorHex,
          color_name: inst.color || 'blue',
          target_text: inst.write_word || inst.target_text || '',
          prompt: inst.target_desc || inst.prompt || (isWrite ? `Write "${inst.write_word}" on ${inst.item}` : `Color ${inst.item} ${inst.color}`),
          audio_text: inst.audio_text || inst.prompt || ''
        };
      });
    }

    // Default fallback if no instructions provided
    return [
      { id: 't1', type: 'color', target_id: 'item_1', item_name: 'Key Object', target_color: '#3b82f6', color_name: 'Blue', prompt: '1. Color the main object BLUE.' },
      { id: 't2', type: 'color', target_id: 'item_2', item_name: 'Second Object', target_color: '#22c55e', color_name: 'Green', prompt: '2. Color the second object GREEN.' },
      { id: 't3', type: 'write', target_id: 'item_3', item_name: 'Sign Label', target_text: 'FRIENDS', prompt: '3. Write the word FRIENDS on the sign label.' }
    ];
  }, [rawData]);

  const fullAudioScript = useMemo(() => {
    if (rawData.audio_script) return rawData.audio_script;
    if (normalizedTasks && normalizedTasks.length > 0) {
      return "Listen and look. " + normalizedTasks.map((t, idx) => `Number ${idx + 1}: ${t.audio_text || t.prompt}`).join('. ');
    }
    return "Listen carefully to the audio instructions to color and write on the picture.";
  }, [rawData, normalizedTasks]);

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
      setTimeout(() => setIsPlayingAudio(false), 30000);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const handleElementClick = (targetId) => {
    if (isSubmitted) return;
    setColoredElements((prev) => ({
      ...prev,
      [targetId]: selectedColor
    }));
  };

  const handleTextChange = (targetId, val) => {
    setWrittenText((prev) => ({
      ...prev,
      [targetId]: val.replace(/\s+/g, '').toUpperCase()
    }));
  };

  const handleCheck = () => {
    let totalItems = normalizedTasks.length;
    let correctCount = 0;

    normalizedTasks.forEach((t) => {
      if (t.type === 'color') {
        const userColor = coloredElements[t.target_id];
        if (userColor && userColor.toLowerCase() === t.target_color.toLowerCase()) {
          correctCount++;
        }
      } else if (t.type === 'write') {
        const userVal = (writtenText[t.target_id] || '').trim().toUpperCase();
        const expectedVal = (t.target_text || '').trim().toUpperCase();
        if (userVal === expectedVal && expectedVal.length > 0) {
          correctCount++;
        }
      }
    });

    const calculatedScore = totalItems > 0 ? Math.round((correctCount / totalItems) * 100) : 100;
    setScore(calculatedScore);
    setIsSubmitted(true);

    if (calculatedScore >= 70) {
      fireCelebrationConfetti('Cambridge_P5_Color_Victory');
      const addXP = useUserStore.getState().addXP;
      if (addXP) addXP(50);
      if (onComplete) onComplete(calculatedScore);
    }
  };

  const handleReset = () => {
    setColoredElements({});
    setWrittenText({});
    setIsSubmitted(false);
    setScore(null);
  };

  const isSuccess = isSubmitted && score >= 70;
  const starsEarned = score === 100 ? 3 : score >= 70 ? 2 : 1;

  const sceneTitle = rawData.title || (rawData.theme ? `Listen, Color & Write: ${rawData.theme}` : "Listen, Color & Write on Scene");
  const sceneImageUrl = rawData.image_url || `/images/week${weekNumber || 34}/read_cover_w${weekNumber || 34}.jpg`;

  return (
    <div className="w-full space-y-4 font-sans select-none animate-in fade-in duration-200">
      <CompletionModal
        isOpen={isSuccess}
        onClose={() => {}}
        score={score || 0}
        stars={starsEarned}
        xpEarned={50}
        srsWordsAdded={4}
        activityTitle="Magic Color Mission (Listening Part 5)"
      />
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            Cambridge A2 Flyers — Listening Part 5
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {sceneTitle}
          </h2>
          <p className="text-xs text-cyan-700 font-bold mt-0.5">
            Listen and color and write. There is one example.
          </p>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          {normalizedTasks.length} Listening Tasks · Interactive Coloring
        </span>
      </div>

      {/* MASTER AUDIO PLAYER BAR */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg border border-indigo-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
            <Volume2 size={22} className="text-amber-300 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-black text-amber-300 block uppercase tracking-wider">
              🎧 Master Audio Instructions
            </span>
            <span className="text-xs font-medium text-indigo-200">
              Press Play and listen carefully to color and write on the picture!
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ExamIntroAudioButton
            weekNumber={weekNumber || 33}
            introId="exam_intro_L5"
            introText="Listen and colour and write. There is one example."
          />
          <button
            onClick={handlePlayMasterAudio}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95 shrink-0"
          >
            <PlayCircle size={16} />
            {isPlayingAudio ? "Pause Audio" : "Play Full Listening Audio"}
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left Color Palette & Hidden Text Instructions vs Right Interactive Scene Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Color Palette & Text Instructions */}
        <div className="lg:col-span-5 space-y-4">
          {/* Color Palette Selector */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Palette size={15} /> Select Color Palette:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {colorsPalette.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-9 h-9 rounded-xl transition-all border-2 shadow-sm ${
                    selectedColor === c.hex ? 'ring-4 ring-cyan-400 scale-110 border-white' : 'border-transparent hover:scale-105'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Listening Instructions */}
          <div className="space-y-2 bg-indigo-50/70 p-4 rounded-2xl border-2 border-indigo-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-900 uppercase tracking-wider block">
                Text Instructions:
              </span>
              <button
                onClick={() => setShowTextHelp(!showTextHelp)}
                className="text-[11px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-sm"
              >
                {showTextHelp ? <EyeOff size={13} /> : <Eye size={13} />}
                {showTextHelp ? 'Hide Text' : 'Show Text Hint'}
              </button>
            </div>

            {!showTextHelp && !isSubmitted ? (
              <div className="p-4 bg-white rounded-xl border border-indigo-200 text-center space-y-1">
                <span className="text-xs font-black text-slate-700 block">
                  🔒 Text is hidden! Listen to Master Audio above.
                </span>
                <span className="text-[11px] font-medium text-slate-500 block">
                  Click 'Show Text Hint' if you need written help.
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Worked Example Row */}
                <div
                  data-testid="example-row"
                  className="p-3 bg-amber-50 rounded-xl border-2 border-amber-300 text-xs font-bold text-slate-900 flex items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-black text-[10px] uppercase tracking-wider shadow-2xs">
                      ★ EXAMPLE
                    </span>
                    <span>{customData?.example_desc || (weekNumber === 34 ? "Color the big lion's tail YELLOW" : "Color the main corridor sign YELLOW")}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-black rounded-lg uppercase">
                    Pre-colored
                  </span>
                </div>

                {normalizedTasks.map((t) => {
                  const isCorrect = isSubmitted && (
                    t.type === 'color'
                      ? (coloredElements[t.target_id] || '').toLowerCase() === t.target_color.toLowerCase()
                      : (writtenText[t.target_id] || '').trim().toUpperCase() === t.target_text.toUpperCase()
                  );

                  return (
                    <div key={t.id} className="p-3 bg-white rounded-xl border border-indigo-200 text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>{t.prompt}</span>
                      {isSubmitted && (
                        isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Scene Canvas */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-5 border-2 border-slate-800 flex flex-col items-center justify-center relative shadow-2xl">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Palette size={14} /> Interactive Line-Art Scene (Click objects to color):
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Color Active: {colorsPalette.find(c => c.hex === selectedColor)?.name || 'Blue'}
            </span>
          </div>

          {/* Interactive Scene Canvas */}
          <div className="relative w-full h-[330px] rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner bg-slate-900 flex items-center justify-center">
            <img 
              src={sceneImageUrl} 
              alt={sceneTitle} 
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            {/* Interactive Target Overlays */}
            <div className="absolute inset-0 p-4 flex flex-wrap items-center justify-around gap-4 bg-black/40 backdrop-blur-[2px]">
              {normalizedTasks.map((t, idx) => {
                if (t.type === 'color') {
                  const appliedColor = coloredElements[t.target_id];
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleElementClick(t.target_id)}
                      style={{ backgroundColor: appliedColor || 'rgba(30, 41, 59, 0.85)' }}
                      className={`px-4 py-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 shadow-lg cursor-pointer ${
                        appliedColor ? 'border-white scale-105 ring-4 ring-cyan-400/50' : 'border-slate-500 hover:border-cyan-400 hover:scale-105'
                      }`}
                    >
                      <Palette size={18} className={appliedColor ? 'text-white' : 'text-cyan-400'} />
                      <span className="text-xs font-black text-white">{t.item_name}</span>
                      <span className="text-[10px] font-bold text-slate-300">
                        {appliedColor ? 'Colored ✨' : 'Click to Color'}
                      </span>
                    </button>
                  );
                }

                return (
                  <div key={t.id} className="p-3 bg-slate-900/90 rounded-2xl border-2 border-cyan-400 flex flex-col items-center gap-1.5 shadow-xl">
                    <span className="text-[11px] font-black text-cyan-300">{t.item_name}</span>
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={writtenText[t.target_id] || ''}
                      onChange={(e) => handleTextChange(t.target_id, e.target.value)}
                      placeholder={`WRITE WORD`}
                      className="px-3 py-1.5 rounded-xl bg-white font-black text-xs text-center text-slate-900 border-2 border-cyan-400 focus:outline-none uppercase shadow-md w-36"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Check & Score */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            className="w-full sm:w-auto px-8 py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Check Magic Color & Write Answers
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-600 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Magic Color Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SVGColorAndWrite;
