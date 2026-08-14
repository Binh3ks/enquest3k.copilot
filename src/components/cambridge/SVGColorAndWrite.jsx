import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Palette, Type } from 'lucide-react';

export function SVGColorAndWrite({ customData, onComplete }) {
  const [selectedColor, setSelectedColor] = useState('#3b82f6'); // Default blue
  const [coloredElements, setColoredElements] = useState({}); // { elemId: colorHex }
  const [writtenText, setWrittenText] = useState({}); // { labelId: textValue }
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setColoredElements({});
    setWrittenText({});
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-[11px] font-black rounded-full uppercase tracking-wider">
            CAMBRIDGE LISTENING PART 5 — SVG COLOR & WRITE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Color Vector Layers & Write Text on SVG Picture
          </h2>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          4 Listening Tasks · Layered Vector SVG
        </span>
      </div>

      {/* Main Split Grid: Left Color Palette & Instructions vs Right Layered Vector SVG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Color Palette & Instructions */}
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
                    selectedColor === c.hex ? 'ring-4 ring-cyan-300 scale-110 border-white' : 'border-transparent hover:scale-105'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Listening Instructions */}
          <div className="space-y-2 bg-cyan-50/70 p-4 rounded-2xl border-2 border-cyan-200">
            <span className="text-xs font-black text-cyan-900 uppercase tracking-wider block">
              Audio Instructions:
            </span>
            <div className="space-y-2">
              {tasksData.instructions.map((t) => {
                const isCorrect = isSubmitted && (
                  t.type === 'color'
                    ? coloredElements[t.target_id] === t.target_color
                    : (writtenText[t.label_id] || '').trim().toUpperCase() === t.target_text.toUpperCase()
                );

                return (
                  <div key={t.id} className="p-3 bg-white rounded-xl border border-cyan-200 text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>{t.prompt}</span>
                    {isSubmitted && (
                      isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Layered Vector SVG Image Canvas */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 flex flex-col items-center justify-center relative shadow-2xl">
          <span className="text-[10px] font-mono text-cyan-400 font-bold mb-2 uppercase">
            Click SVG vector layers to color with active palette
          </span>

          {/* Vector SVG Vector Scene */}
          <svg viewBox="0 0 500 350" className="w-full h-[320px] select-none">
            {/* Background Corridor Wall & Floor */}
            <rect x="10" y="10" width="480" height="240" fill="#1e293b" rx="16" />
            <path d="M 10 250 L 490 250 L 490 340 L 10 340 Z" fill="#334155" />

            {/* SVG Layer 1: Bandage Vector Path */}
            <g onClick={() => handleElementClick('bandage')} className="cursor-pointer hover:opacity-80 transition">
              <path
                d="M 120 180 C 120 160, 200 160, 200 180 L 200 210 C 200 230, 120 230, 120 210 Z"
                fill={coloredElements['bandage'] || '#cbd5e1'}
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text x="160" y="198" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900">BANDAGE</text>
            </g>

            {/* SVG Layer 2: Cold Pack Vector Path */}
            <g onClick={() => handleElementClick('coldpack')} className="cursor-pointer hover:opacity-80 transition">
              <rect
                x="240"
                y="170"
                width="90"
                height="50"
                rx="12"
                fill={coloredElements['coldpack'] || '#cbd5e1'}
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text x="285" y="200" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900">COLD PACK</text>
            </g>

            {/* SVG Layer 3: Warning Sign Vector Triangle */}
            <g onClick={() => handleElementClick('warning_sign')} className="cursor-pointer hover:opacity-80 transition">
              <polygon
                points="400,140 350,230 450,230"
                fill={coloredElements['warning_sign'] || '#cbd5e1'}
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text x="400" y="210" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="900">WET FLOOR</text>
            </g>

            {/* SVG Layer 4: Interactive Text Label Node */}
            <foreignObject x="355" y="250" width="90" height="40">
              <input
                type="text"
                disabled={isSubmitted}
                value={writtenText['sign_label'] || ''}
                onChange={(e) => handleTextChange('sign_label', e.target.value)}
                placeholder="WRITE HERE"
                className="w-full h-full px-2 rounded-lg bg-white font-black text-xs text-center text-slate-900 border-2 border-cyan-400 focus:outline-none uppercase"
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
            <Sparkles size={18} /> Check Color & Write Answers
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-600 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Color & Write Score: {score}%
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
