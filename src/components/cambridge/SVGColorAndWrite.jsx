import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Palette, Volume2, PlayCircle, Eye, EyeOff } from 'lucide-react';
import VoiceService from '../../services/voiceService';

export function SVGColorAndWrite({ customData, onComplete }) {
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
    { name: 'Orange', hex: '#f97316' }
  ];

  const tasksData = customData || {
    instructions: [
      { id: 't1', type: 'color', target_id: 'bandage', target_color: '#3b82f6', color_name: 'Blue', prompt: '1. Color the clean bandage on the boy’s knee BLUE.' },
      { id: 't2', type: 'color', target_id: 'coldpack', target_color: '#22c55e', color_name: 'Green', prompt: '2. Color the cold pack GREEN.' },
      { id: 't3', type: 'color', target_id: 'warning_sign', target_color: '#eab308', color_name: 'Yellow', prompt: '3. Color the wet floor warning sign YELLOW.' },
      { id: 't4', type: 'write', label_id: 'sign_label', target_text: 'SAFE', prompt: '4. Write the word SAFE on the warning sign label.' }
    ]
  };

  const fullAudioScript = tasksData.audio_script || "Listen carefully to the instructions. One: Color the clean bandage on the boy's knee blue. Two: Color the cold pack green. Three: Color the wet floor warning sign yellow. Four: Write the word SAFE on the warning sign label.";

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
      // Safety auto-reset timeout in case audio finishes without triggering onEnd
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 16000);
    } catch (e) {
      setIsPlayingAudio(false);
    }
  };

  const handleElementClick = (elemId) => {
    if (isSubmitted) return;
    setColoredElements({ ...coloredElements, [elemId]: selectedColor });
  };

  const handleTextChange = (labelId, val) => {
    if (isSubmitted) return;
    setWrittenText({ ...writtenText, [labelId]: val });
  };

  const handleCheck = () => {
    let correct = 0;
    tasksData.instructions.forEach((task) => {
      if (task.type === 'color') {
        const userColor = coloredElements[task.target_id];
        if (userColor === task.target_color) correct++;
      } else if (task.type === 'write') {
        const userVal = (writtenText[task.label_id] || '').trim().toUpperCase();
        if (userVal === task.target_text.toUpperCase()) correct++;
      }
    });

    const finalScore = Math.round((correct / tasksData.instructions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    setShowTextHelp(true);
    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setColoredElements({});
    setWrittenText({});
    setIsSubmitted(false);
    setShowTextHelp(false);
    setScore(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            🎨 MAGIC COLOR MISSION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Listen, Color & Write on Corridor Scene
          </h2>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          4 Listening Tasks · Interactive Vector Art
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
        <button
          onClick={handlePlayMasterAudio}
          className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95 shrink-0"
        >
          <PlayCircle size={18} /> {isPlayingAudio ? 'Playing...' : 'Play Audio'}
        </button>
      </div>

      {/* Main Split Grid: Left Color Palette & Hidden Text Instructions vs Right Vector SVG Scene */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Color Palette & Text Instructions */}
        <div className="lg:col-span-5 space-y-4">
          {/* Color Palette Selector */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Palette size={15} /> Select Color Palette:
            </span>
            <div className="flex items-center gap-2">
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

          {/* Listening Instructions (Hidden by Default for Pure Listening Pedagogy) */}
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
                {tasksData.instructions.map((t) => {
                  const isCorrect = isSubmitted && (
                    t.type === 'color'
                      ? coloredElements[t.target_id] === t.target_color
                      : (writtenText[t.label_id] || '').trim().toUpperCase() === t.target_text.toUpperCase()
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

        {/* Right Column: High-Definition School Corridor Vector SVG Canvas */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-5 border-2 border-slate-800 flex flex-col items-center justify-center relative shadow-2xl">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Palette size={14} /> Interactive Line-Art Scene (Click objects to color):
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              Color Active: {colorsPalette.find(c => c.hex === selectedColor)?.name || 'Blue'}
            </span>
          </div>

          {/* High-Definition Monochrome Vector Line Art SVG Scene */}
          <svg viewBox="0 0 520 360" className="w-full h-[330px] select-none bg-slate-900 rounded-2xl border-2 border-slate-700 shadow-inner">
            {/* Background Corridor Architecture */}
            <rect x="10" y="10" width="500" height="240" fill="#0f172a" stroke="#334155" strokeWidth="2.5" rx="12" />
            <line x1="10" y1="250" x2="510" y2="250" stroke="#475569" strokeWidth="4" />
            
            {/* Tiled Floor Contours */}
            <path d="M 10 250 L 510 250 M 80 250 L 50 350 M 180 250 L 160 350 M 280 250 L 290 350 M 380 250 L 410 350 M 480 250 L 500 350" stroke="#334155" strokeWidth="1.5" />

            {/* Nurse Office Door with Red Cross Emblem */}
            <rect x="35" y="35" width="90" height="215" fill="#1e293b" stroke="#64748b" strokeWidth="3" rx="8" />
            <circle cx="110" cy="145" r="4.5" fill="#e2e8f0" />
            <rect x="70" y="55" width="20" height="6" fill="#ef4444" rx="2" />
            <rect x="77" y="48" width="6" height="20" fill="#ef4444" rx="2" />
            <text x="80" y="90" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="900">NURSE ROOM</text>

            {/* Tom Sitting on Floor with Hurt Knee */}
            <g transform="translate(140, 140)">
              {/* Head & Hair */}
              <circle cx="50" cy="30" r="18" fill="#334155" stroke="#cbd5e1" strokeWidth="2.5" />
              {/* Torso */}
              <path d="M 35 48 Q 50 45 65 48 L 60 90 L 40 90 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2.5" />
              {/* Arm reaching for knee */}
              <path d="M 38 55 Q 25 75 45 85" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* SVG Layer 1: Bandage Vector on Knee (Interactive Click Target) */}
            <g onClick={() => handleElementClick('bandage')} className="cursor-pointer group">
              <rect
                x="175"
                y="232"
                width="48"
                height="22"
                rx="6"
                fill={coloredElements['bandage'] || '#ffffff'}
                stroke={coloredElements['bandage'] ? '#0284c7' : '#38bdf8'}
                strokeWidth="3.5"
                className="transition-all group-hover:scale-105"
              />
              <text x="199" y="246" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="900">BANDAGE</text>
            </g>

            {/* First Aid Table with Medicine Containers */}
            <g transform="translate(290, 160)">
              <rect x="0" y="20" width="130" height="12" fill="#334155" stroke="#64748b" strokeWidth="2" rx="3" />
              <line x1="15" y1="32" x2="15" y2="90" stroke="#475569" strokeWidth="3" />
              <line x1="115" y1="32" x2="115" y2="90" stroke="#475569" strokeWidth="3" />
              <rect x="90" y="0" width="14" height="20" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
            </g>

            {/* SVG Layer 2: Cold Pack Vector on Table (Interactive Click Target) */}
            <g onClick={() => handleElementClick('coldpack')} className="cursor-pointer group">
              <rect
                x="305"
                y="138"
                width="54"
                height="38"
                rx="8"
                fill={coloredElements['coldpack'] || '#ffffff'}
                stroke={coloredElements['coldpack'] ? '#16a34a' : '#4ade80'}
                strokeWidth="3.5"
                className="transition-all group-hover:scale-105"
              />
              <text x="332" y="161" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="900">COLD PACK</text>
            </g>

            {/* SVG Layer 3: Yellow Warning Sign Triangle on Floor (Interactive Click Target) */}
            <g onClick={() => handleElementClick('warning_sign')} className="cursor-pointer group">
              <polygon
                points="450,220 410,295 490,295"
                fill={coloredElements['warning_sign'] || '#ffffff'}
                stroke={coloredElements['warning_sign'] ? '#ca8a04' : '#facc15'}
                strokeWidth="3.5"
                className="transition-all group-hover:scale-105"
              />
              <text x="450" y="278" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="900">WET FLOOR</text>
            </g>

            {/* SVG Layer 4: Interactive Text Label Input Box on Warning Sign */}
            <foreignObject x="405" y="302" width="90" height="34">
              <input
                type="text"
                disabled={isSubmitted}
                value={writtenText['sign_label'] || ''}
                onChange={(e) => handleTextChange('sign_label', e.target.value)}
                placeholder="TYPE SAFE"
                className="w-full h-full px-1.5 rounded-xl bg-white font-black text-[11px] text-center text-slate-900 border-2 border-cyan-400 focus:outline-none uppercase shadow-lg"
              />
            </foreignObject>
          </svg>
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
