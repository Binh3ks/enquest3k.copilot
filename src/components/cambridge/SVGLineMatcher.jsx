import React, { useState, useRef } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, User, MoveRight, Layers, Trash2, Volume2 } from 'lucide-react';
import VoiceService from '../../services/voiceService';

export function SVGLineMatcher({ customData, onComplete }) {
  const [selectedName, setSelectedName] = useState(null);
  const [drawnLines, setDrawnLines] = useState([]); // [{ nameId, nameText, targetId, startX, startY, endX, endY }]
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const containerRef = useRef(null);

  const fullListeningScript = "Nova: Look at Part 1. Now look at the picture. Listen and look. There is one example.\nGirl: Look at this photo of our school corridor after lunch! It was quite busy.\nMan: Oh yes, I can see many people. Who is that boy walking carefully down the hallway in the blue shirt?\nGirl: That's Jake. He always walks slowly and watches where he is going.\nMan: That is very sensible of him.\nNova: Can you see the line? This is an example. Now you listen and draw lines.\nGirl: Oh dear, look at the boy who is slipping on the wet floor!\nMan: Yes, his papers are flying everywhere! Is he wearing a red sweater?\nGirl: That's right, he is wearing a red shirt. His name is Tom. He fell down because he was running in a hurry.\nMan: Poor Tom! I hope he is okay.\nGirl: Look, someone is rushing quickly to help him. Can you see the lady carrying a clean bandage in the white uniform?\nMan: Ah, that's our school nurse! She always takes good care of everyone when accidents happen.\nGirl: Yes, she is very kind.\nMan: Who is that tall man standing near the blue lockers in the dark suit?\nGirl: Do you mean the man watching all the students to make sure the hallway is safe?\nMan: Yes, exactly.\nGirl: That's our headmaster! He always reminds us about corridor safety rules.\nMan: Now look near the yellow warning sign. Is that a girl holding a cleaning mop?\nGirl: Yes, that is Mia. She is wiping the water off the floor so nobody else slips.\nMan: What a helpful girl!\nGirl: Is Alex in this picture today?\nMan: No, Alex had a doctor appointment this morning, so he is not at school today.";

  // Default Listening Part 1 Line Matching Data
  const sceneData = customData || {
    image_url: '/images/week33/w33_listening_p1_scene.jpg',
    names: [
      { id: 'n1', text: 'Jake', target_id: 't1', isExample: true },
      { id: 'n2', text: 'School Nurse', target_id: 't2' },
      { id: 'n3', text: 'Tom', target_id: 't3' },
      { id: 'n4', text: 'Headmaster', target_id: 't4' },
      { id: 'n5', text: 'Mia', target_id: 't5' },
      { id: 'n6', text: 'Alex', target_id: null }
    ],
    targets: [
      { id: 't1', label: 'Jake (Boy walking carefully)', x: 39, y: 65, isExample: true },
      { id: 't2', label: 'School Nurse (Carrying bandage)', x: 65, y: 60 },
      { id: 't3', label: 'Tom (Slipping on wet floor)', x: 58, y: 65 },
      { id: 't4', label: 'Headmaster (In dark blue suit)', x: 48, y: 53 },
      { id: 't5', label: 'Mia (Girl holding mop)', x: 76, y: 64 }
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
    const testNames = sceneData.names.filter(n => !n.isExample);
    let correct = 0;
    testNames.forEach((name) => {
      const matchedLine = drawnLines.find(l => l.nameId === name.id);
      if (name.target_id) {
        if (matchedLine && matchedLine.targetId === name.target_id) correct++;
      } else {
        // Distractor name: should NOT have any line drawn
        if (!matchedLine) correct++;
      }
    });
    const finalScore = Math.round((correct / testNames.length) * 100);
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

  const exampleName = sceneData.names.find(n => n.isExample);
  const exampleTarget = sceneData.targets.find(t => t.id === exampleName?.target_id || t.isExample);

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
            onClick={() => {
              const scriptToSpeak = sceneData?.passage_audio_script || fullListeningScript;
              VoiceService.speak(
                scriptToSpeak,
                'questions',
                sceneData?.audio_url || '/audio/week33/listening_p1_full.mp3',
                33
              );
            }}
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

      {/* Name Selection Ribbon */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <User size={14} className="text-indigo-600" /> Character Names (Click name, then move mouse over picture):
          </span>
          <span className="text-xs font-bold text-indigo-700">
            {selectedName ? `Selected: ${selectedName.text} (Click a person dot)` : 'Select a name'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {sceneData.names.map((name) => {
            const hasLine = drawnLines.some(l => l.nameId === name.id);
            const isSelected = selectedName?.id === name.id;

            return (
              <button
                key={name.id}
                disabled={isSubmitted || name.isExample}
                onClick={(e) => !name.isExample && handleSelectName(name, e)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 border shadow-sm ${
                  name.isExample
                    ? 'bg-amber-100 text-amber-950 border-amber-400 cursor-default ring-2 ring-amber-300'
                    : isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 ring-4 ring-indigo-200 scale-105 shadow-md animate-pulse'
                    : hasLine
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                    : 'bg-white text-slate-900 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <span>{name.text}</span>
                {name.isExample && (
                  <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-md uppercase font-black tracking-wider">
                    Example
                  </span>
                )}
                {hasLine && !name.isExample && <CheckCircle2 size={14} className="text-emerald-700" />}
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
          {/* 🌟 Official Cambridge Example Line (Pre-drawn) */}
          {exampleTarget && (
            <g className="opacity-95">
              <line
                x1="10%"
                y1="0%"
                x2={`${exampleTarget.x}%`}
                y2={`${exampleTarget.y}%`}
                stroke="#f59e0b"
                strokeWidth="5"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
              <circle cx={`${exampleTarget.x}%`} cy={`${exampleTarget.y}%`} r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            </g>
          )}

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

        {/* 🌟 Official Cambridge Example Line Floating Badge */}
        {exampleTarget && (
          <div
            style={{ left: `${(10 + exampleTarget.x) / 2}%`, top: `${Math.max(10, (0 + exampleTarget.y) / 2)}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none px-3 py-1 bg-amber-500 text-white font-black text-[11px] rounded-full uppercase tracking-wider border-2 border-white shadow-xl flex items-center gap-1 animate-pulse"
          >
            ★ EXAMPLE
          </div>
        )}

        {/* Pure Clean Vector Target Pins on Picture */}
        {sceneData.targets.map((target) => {
          const matchedLine = drawnLines.find(l => l.targetId === target.id);
          const isExamplePin = target.isExample || target.id === 't1' || target.label?.toLowerCase().includes('jake');

          if (isExamplePin) {
            return (
              <div
                key={target.id}
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <span className="px-2.5 py-1 rounded-xl border-2 border-white shadow-2xl bg-amber-500 text-white font-black text-xs flex items-center gap-1">
                  Jake (Example)
                </span>
              </div>
            );
          }

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
                <span className={`px-2.5 py-1 rounded-xl border-2 border-white shadow-xl flex items-center justify-center font-black text-xs ${
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
