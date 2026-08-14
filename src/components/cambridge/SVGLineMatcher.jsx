import React, { useState, useRef } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, User, MoveRight, Layers, Trash2, Volume2 } from 'lucide-react';
import VoiceService from '../../services/voiceService';

export function SVGLineMatcher({ customData, onComplete }) {
  const [selectedName, setSelectedName] = useState(null);
  const [drawnLines, setDrawnLines] = useState([]); // [{ nameId, nameText, targetId, startX, startY, endX, endY }]
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const containerRef = useRef(null);

  const fullListeningScript = "Look at Part 1. Listen and draw lines. Girl: Look at that boy in the corridor! Is he running? Man: No, the boy slipping on the wet floor in the red shirt is Tom! Look at the boy walking carefully in the blue shirt. Girl: Oh, I see him now. Is that Jake? Man: Yes, that's right. Jake is walking carefully. Girl: Who is the lady in the white uniform carrying a bandage? Man: That's the school nurse! She is rushing to help Tom. Girl: And who is the tall man in the blue suit talking to students? Man: That's the headmaster. He is making sure everyone stays safe. Girl: Look at the girl near the yellow wet floor sign holding a mop. Man: Ah, that's Mia. She is cleaning the wet floor so nobody else falls.";

  // Default Listening Part 1 Line Matching Data
  const sceneData = customData || {
    image_url: '/images/week33/w33_listening_p1_scene.jpg',
    names: [
      { id: 'n1', text: 'Jake', target_id: 't1' },
      { id: 'n2', text: 'School Nurse', target_id: 't2' },
      { id: 'n3', text: 'Tom', target_id: 't3' },
      { id: 'n4', text: 'Headmaster', target_id: 't4' },
      { id: 'n5', text: 'Mia', target_id: 't5' }
    ],
    targets: [
      { id: 't1', label: 'Jake (Boy walking carefully)', x: 20, y: 60 },
      { id: 't2', label: 'School Nurse (Carrying bandage)', x: 39, y: 50 },
      { id: 't3', label: 'Tom (Slipping on wet floor)', x: 56, y: 68 },
      { id: 't4', label: 'Headmaster (In blue suit)', x: 74, y: 48 },
      { id: 't5', label: 'Mia (Girl holding mop)', x: 88, y: 52 }
    ]
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!selectedName || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleSelectName = (nameObj, e) => {
    if (isSubmitted) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const nameEl = e.currentTarget.getBoundingClientRect();

    if (rect && nameEl) {
      const startX = ((nameEl.left + nameEl.width / 2 - rect.left) / rect.width) * 100;
      const startY = ((nameEl.top + nameEl.height / 2 - rect.top) / rect.height) * 100;
      setSelectedName({ ...nameObj, startX, startY });
      setMousePos({ x: startX, y: startY });
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
          <span className="px-3 py-1 bg-indigo-100 text-indigo-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            🔗 DRAW THE LINES MISSION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Click Name Pill then Move Mouse & Click Person in Picture
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

      {/* Master Audio Player Bar for Listening Part 1 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl text-white shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => VoiceService.speak(fullListeningScript, 'questions')}
            className="p-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 transition shadow-md shrink-0 active:scale-95"
          >
            <Volume2 size={18} /> Play Part 1 Listening Audio 🎧
          </button>
          <div>
            <div className="text-[10px] font-black text-amber-200 uppercase tracking-widest">Listening Part 1 Audio Script:</div>
            <p className="text-xs font-bold text-white italic">"Listen and draw a line from each name to the correct person in the picture..."</p>
          </div>
        </div>
      </div>

      {/* 🏷️ Top Character Names Selection Bar */}
      <div className="p-4 bg-indigo-50/80 rounded-2xl border-2 border-indigo-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
            <User size={15} /> Character Names (Click name, then move mouse over picture):
          </span>
          <span className="text-[11px] font-bold text-indigo-700">
            {selectedName ? `Drawing live line for: ${selectedName.text}` : 'Select a name'}
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
                    ? 'bg-indigo-600 text-white border-indigo-700 ring-4 ring-indigo-200 scale-105 shadow-md animate-pulse'
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
        onMouseMove={handleMouseMove}
        className="relative w-full h-[400px] sm:h-[480px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800 select-none cursor-crosshair"
      >
        {/* Background Picture Scene (Clean, without text overlays) */}
        <img
          src={sceneData.image_url}
          alt="Listening Part 1 Scene"
          className="w-full h-full object-cover object-center"
        />

        {/* ✏️ Real-Time Dynamic SVG Line Canvas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {/* Locked Drawn Lines */}
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
                  strokeWidth="5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
                <circle cx={`${line.endX}%`} cy={`${line.endY}%`} r="8" fill={strokeColor} />
              </g>
            );
          })}

          {/* Active Real-Time Mouse Tracking Line */}
          {selectedName && (
            <g>
              <line
                x1={`${selectedName.startX}%`}
                y1={`${selectedName.startY}%`}
                x2={`${mousePos.x}%`}
                y2={`${mousePos.y}%`}
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <circle cx={`${mousePos.x}%`} cy={`${mousePos.y}%`} r="10" fill="#f59e0b" className="animate-ping" />
            </g>
          )}
        </svg>

        {/* Pure Clean Vector Target Pins on Picture (No text badges) */}
        {sceneData.targets.map((target) => {
          const matchedLine = drawnLines.find(l => l.targetId === target.id);

          return (
            <button
              key={target.id}
              disabled={isSubmitted}
              onClick={() => handleTargetClick(target)}
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all ${
                selectedName ? 'scale-125 cursor-pointer' : 'hover:scale-110'
              }`}
              title={matchedLine ? matchedLine.nameText : 'Click to connect line'}
            >
              <div className="relative flex items-center justify-center">
                <span className={`w-8 h-8 rounded-full border-2 border-white shadow-xl flex items-center justify-center font-black text-xs ${
                  matchedLine ? 'bg-indigo-600 text-white' : selectedName ? 'bg-amber-400 text-slate-950 animate-bounce' : 'bg-slate-900/80 text-white'
                }`}>
                  {matchedLine ? matchedLine.nameText : '📍'}
                </span>
              </div>
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
