import React, { useState, useRef } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, User, MoveRight, Layers, Trash2 } from 'lucide-react';

export function SVGLineMatcher({ customData, onComplete }) {
  const [selectedName, setSelectedName] = useState(null);
  const [drawnLines, setDrawnLines] = useState([]); // [{ nameId, nameText, targetId, startX, startY, endX, endY }]
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const containerRef = useRef(null);

  // Default Listening Part 1 Line Matching Data
  const sceneData = customData || {
    image_url: '/images/week33/webtoon_scene_1.png',
    names: [
      { id: 'n1', text: 'Jake', target_id: 't1' },
      { id: 'n2', text: 'Tom', target_id: 't2' },
      { id: 'n3', text: 'School Nurse', target_id: 't3' },
      { id: 'n4', text: 'Headmaster', target_id: 't4' },
      { id: 'n5', text: 'Mia', target_id: 't5' }
    ],
    targets: [
      { id: 't1', label: 'Boy walking carefully', x: 25, y: 50 },
      { id: 't2', label: 'Boy slipping on wet floor', x: 60, y: 70 },
      { id: 't3', label: 'Nurse carrying bandage', x: 45, y: 40 },
      { id: 't4', label: 'Headmaster praising student', x: 80, y: 45 },
      { id: 't5', label: 'Girl helping clean floor', x: 15, y: 75 }
    ]
  };

  const handleSelectName = (nameObj, e) => {
    if (isSubmitted) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const nameEl = e.currentTarget.getBoundingClientRect();

    if (rect && nameEl) {
      const startX = ((nameEl.left + nameEl.width / 2 - rect.left) / rect.width) * 100;
      const startY = ((nameEl.top + nameEl.height / 2 - rect.top) / rect.height) * 100;
      setSelectedName({ ...nameObj, startX, startY });
    }
  };

  const handleTargetClick = (targetObj) => {
    if (isSubmitted || !selectedName) return;

    // Remove any existing line for this name
    const newLines = drawnLines.filter(l => l.nameId !== selectedName.id);
    newLines.push({
      nameId: selectedName.id,
      nameText: selectedName.text,
      targetId: targetObj.id,
      startX: selectedName.startX,
      startY: selectedName.startY,
      endX: targetObj.x,
      endY: targetObj.y
    });

    setDrawnLines(newLines);
    setSelectedName(null);
  };

  const handleClearLines = () => {
    if (isSubmitted) return;
    setDrawnLines([]);
    setSelectedName(null);
  };

  const handleCheck = () => {
    let correct = 0;
    sceneData.names.forEach((name) => {
      const matchedLine = drawnLines.find(l => l.nameId === name.id);
      if (matchedLine && matchedLine.targetId === name.target_id) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / sceneData.names.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setDrawnLines([]);
    setSelectedName(null);
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-wider">
            CAMBRIDGE LISTENING PART 1 — SVG LINE MATCHING
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Draw SVG Lines from Names to People in the Picture
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClearLines}
            disabled={isSubmitted || drawnLines.length === 0}
            className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs rounded-xl border border-rose-200 transition disabled:opacity-40 flex items-center gap-1"
          >
            <Trash2 size={14} /> Clear Lines
          </button>
        </div>
      </div>

      {/* 🏷️ Top Character Names Selection Bar */}
      <div className="p-4 bg-indigo-50/80 rounded-2xl border-2 border-indigo-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
            <User size={15} /> Character Names (Click name, then click person in picture):
          </span>
          <span className="text-[11px] font-bold text-indigo-700">
            {selectedName ? `Drawing line for: ${selectedName.text}` : 'Select a name'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {sceneData.names.map((name) => {
            const hasLine = drawnLines.some(l => l.nameId === name.id);
            const isSelected = selectedName?.id === name.id;

            return (
              <button
                key={name.id}
                disabled={isSubmitted}
                onClick={(e) => handleSelectName(name, e)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 border shadow-sm ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 ring-4 ring-indigo-200 scale-105 shadow-md'
                    : hasLine
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                    : 'bg-white text-slate-900 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <span>{name.text}</span>
                {hasLine && <CheckCircle2 size={14} className="text-emerald-700" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🖼️ Main Image Viewport with SVG Overlay Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[400px] sm:h-[480px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800 select-none"
      >
        {/* Background Picture Scene */}
        <img
          src={sceneData.image_url}
          alt="Listening Part 1 Scene"
          className="w-full h-full object-cover object-center"
        />

        {/* ✏️ SVG Overlay Canvas (Renders Vector Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {drawnLines.map((line, idx) => {
            const nameObj = sceneData.names.find(n => n.id === line.nameId);
            const isCorrect = isSubmitted && nameObj?.target_id === line.targetId;
            const strokeColor = isSubmitted ? (isCorrect ? '#10b981' : '#f43f5e') : '#6366f1';

            return (
              <g key={idx}>
                <line
                  x1={`${line.startX}%`}
                  y1={`${line.startY}%`}
                  x2={`${line.endX}%`}
                  y2={`${line.endY}%`}
                  stroke={strokeColor}
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <circle cx={`${line.endX}%`} cy={`${line.endY}%`} r="8" fill={strokeColor} />
              </g>
            );
          })}
        </svg>

        {/* Target Location Hotspot Pins on Picture */}
        {sceneData.targets.map((target) => {
          const matchedLine = drawnLines.find(l => l.targetId === target.id);

          return (
            <button
              key={target.id}
              disabled={isSubmitted}
              onClick={() => handleTargetClick(target)}
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-black shadow-xl backdrop-blur-md flex items-center gap-1.5 border z-30 transition-all ${
                matchedLine
                  ? 'bg-indigo-600 text-white border-indigo-300 scale-105 ring-4 ring-indigo-300/50'
                  : selectedName
                  ? 'bg-amber-400 text-slate-950 border-amber-300 animate-bounce cursor-pointer'
                  : 'bg-slate-900/80 text-white border-slate-400 hover:bg-indigo-600'
              }`}
            >
              <MoveRight size={14} />
              <span>{matchedLine ? matchedLine.nameText : target.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Check & Score */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            disabled={drawnLines.length === 0}
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Sparkles size={18} /> Check SVG Line Matches
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Line Matching Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SVGLineMatcher;
