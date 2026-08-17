import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, User, Trash2, Volume2, Target } from 'lucide-react';
import VoiceService from '../../services/voiceService';

export function SVGLineMatcher({ customData, onComplete }) {
  const [selectedName, setSelectedName] = useState(null);
  const [drawnLines, setDrawnLines] = useState([]); // [{ nameId, nameText, targetId }]
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const masterContainerRef = useRef(null);
  const imageRef = useRef(null);
  const nameButtonRefs = useRef({});

  const fullListeningScript = "Nova: Look at Part 1. Now look at the picture. Listen and look. There is one example.\nGirl: Look at this photo of our school corridor after lunch! It was quite busy.\nMan: Oh yes, I can see many people. Who is that boy walking carefully down the hallway in the blue shirt?\nGirl: That's Jake. He always walks slowly and watches where he is going.\nMan: That is very sensible of him.\nNova: Can you see the line? This is an example. Now you listen and draw lines.\nGirl: Oh dear, look at the boy who is slipping on the wet floor!\nMan: Yes, his papers are flying everywhere! Is he wearing a red sweater?\nGirl: That's right, he is wearing a red shirt. His name is Tom. He fell down because he was running in a hurry.\nMan: Poor Tom! I hope he is okay.\nGirl: Look, someone is rushing quickly to help him. Can you see the lady carrying a clean bandage in the white uniform?\nMan: Ah, that's our school nurse! She always takes good care of everyone when accidents happen.\nGirl: Yes, she is very kind.\nMan: Who is that tall man standing near the blue lockers in the dark suit?\nGirl: Do you mean the man watching all the students to make sure the hallway is safe?\nMan: Yes, exactly.\nGirl: That's our headmaster! He always reminds us about corridor safety rules.\nMan: Now look near the yellow warning sign. Is that a girl holding a cleaning mop?\nGirl: Yes, that is Mia. She is wiping the water off the floor so nobody else slips.\nMan: What a helpful girl!\nGirl: Is Alex in this picture today?\nMan: No, Alex had a doctor appointment this morning, so he is not at school today.";

  // Default Listening Part 1 Line Matching Data with 100% Calibrated Coordinates
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
      { id: 't1', label: 'Jake (Boy walking with backpack on far left)', x: 20, y: 60, isExample: true },
      { id: 't2', label: 'School Nurse (White uniform with bandage)', x: 64, y: 52 },
      { id: 't3', label: 'Tom (Red shirt, slipping on wet floor)', x: 56, y: 62 },
      { id: 't4', label: 'Headmaster (Dark blue suit near lockers)', x: 38, y: 50 },
      { id: 't5', label: 'Mia (Girl holding cleaning mop)', x: 72, y: 54 }
    ]
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // % in master container
  const [positions, setPositions] = useState({}); // { nameId: {x,y}, targetId: {x,y} }
  
  // 🎯 Calibrator Tool State
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false);
  const [calibratedTargets, setCalibratedTargets] = useState(sceneData.targets);
  const [activeCalibTargetId, setActiveCalibTargetId] = useState(sceneData.targets[0]?.id || 't1');
  const [copiedToast, setCopiedToast] = useState(false);

  const activeTargets = isCalibratorOpen ? calibratedTargets : sceneData.targets;

  // Helper to re-calculate absolute percentage positions relative to master container
  const recalculatePositions = useCallback(() => {
    if (!masterContainerRef.current || !imageRef.current) return;
    const mRect = masterContainerRef.current.getBoundingClientRect();
    const iRect = imageRef.current.getBoundingClientRect();
    if (mRect.width === 0 || mRect.height === 0) return;

    const nextPos = {};

    // 1. Calculate positions for Name Buttons
    sceneData.names.forEach((n) => {
      const btn = nameButtonRefs.current[n.id];
      if (btn) {
        const bRect = btn.getBoundingClientRect();
        nextPos[n.id] = {
          x: ((bRect.left + bRect.width / 2 - mRect.left) / mRect.width) * 100,
          y: ((bRect.top + bRect.height / 2 - mRect.top) / mRect.height) * 100,
        };
      }
    });

    // 2. Calculate positions for Picture Targets
    activeTargets.forEach((t) => {
      const pxX = (t.x / 100) * iRect.width + (iRect.left - mRect.left);
      const pxY = (t.y / 100) * iRect.height + (iRect.top - mRect.top);
      nextPos[t.id] = {
        x: (pxX / mRect.width) * 100,
        y: (pxY / mRect.height) * 100,
      };
    });

    setPositions(nextPos);
  }, [sceneData.names, activeTargets]);

  useEffect(() => {
    recalculatePositions();
    window.addEventListener('resize', recalculatePositions);
    return () => window.removeEventListener('resize', recalculatePositions);
  }, [recalculatePositions]);

  const handleImageClickForCalibration = (e) => {
    if (!isCalibratorOpen || !activeCalibTargetId || !imageRef.current) return;
    const iRect = imageRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - iRect.left) / iRect.width) * 100);
    const y = Math.round(((e.clientY - iRect.top) / iRect.height) * 100);

    const updated = calibratedTargets.map(t => t.id === activeCalibTargetId ? { ...t, x, y } : t);
    setCalibratedTargets(updated);
  };

  const handleCopyCalibratedJSON = () => {
    const jsonStr = JSON.stringify(calibratedTargets, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const handleMouseMove = (e) => {
    if (!selectedName || !masterContainerRef.current) return;
    const mRect = masterContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - mRect.left) / mRect.width) * 100;
    const y = ((e.clientY - mRect.top) / mRect.height) * 100;
    setMousePos({ x, y });
  };

  const handleSelectName = (nameObj) => {
    if (isSubmitted || nameObj.isExample) return;
    const startPos = positions[nameObj.id] || { x: 50, y: 10 };
    setSelectedName(nameObj);
    setMousePos(startPos);
  };

  const handleTargetClick = (targetObj) => {
    if (isSubmitted || !selectedName) return;

    const newLines = drawnLines.filter(l => l.nameId !== selectedName.id);
    newLines.push({
      nameId: selectedName.id,
      nameText: selectedName.text,
      targetId: targetObj.id,
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
  const exampleTarget = activeTargets.find(t => t.id === exampleName?.target_id || t.isExample);

  const exampleStartPos = positions[exampleName?.id];
  const exampleEndPos = positions[exampleTarget?.id];

  return (
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            🔗 DRAW THE LINES MISSION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Click Name Pill then Click Person in Picture
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCalibratorOpen(!isCalibratorOpen)}
            className={`px-3 py-1.5 font-bold text-xs rounded-xl border transition flex items-center gap-1 shadow-sm ${
              isCalibratorOpen 
                ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300 animate-pulse' 
                : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-900 border-slate-300'
            }`}
          >
            <Target size={14} /> Calibrate Pins
          </button>
          <button
            onClick={handleClearLines}
            disabled={isSubmitted || drawnLines.length === 0}
            className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs rounded-xl border border-rose-200 transition disabled:opacity-40 flex items-center gap-1"
          >
            <Trash2 size={14} /> Clear Lines
          </button>
        </div>
      </div>

      {/* 🎯 Dev/Admin Target Calibrator Bar */}
      {isCalibratorOpen && (
        <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
              🎯 Visual Pin Calibrator Tool: Click target pin below, then click directly on person in the image:
            </span>
            <button
              onClick={handleCopyCalibratedJSON}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl transition flex items-center gap-1 shadow-md"
            >
              {copiedToast ? '✅ Copied!' : '📋 Copy JSON Targets'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {calibratedTargets.map((t) => {
              const isActive = activeCalibTargetId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveCalibTargetId(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 border ${
                    isActive
                      ? 'bg-amber-600 text-white border-amber-700 ring-4 ring-amber-200 scale-105 shadow'
                      : 'bg-white text-slate-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <span>{t.label || t.id}</span>
                  <span className="text-[10px] opacity-80">({t.x}%, {t.y}%)</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Master Audio Player Bar */}
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

      {/* 🌟 UNIFIED SVG CANVAS MASTER WRAPPER 🌟 */}
      <div
        ref={masterContainerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full space-y-4 select-none"
      >
        {/* Real-time Dynamic SVG Line Canvas covering entire Master Container */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
          {/* 🌟 Official Cambridge Example Line (Connected from Name Box to Character Pin) */}
          {exampleStartPos && exampleEndPos && (
            <g className="opacity-95">
              <line
                x1={`${exampleStartPos.x}%`}
                y1={`${exampleStartPos.y}%`}
                x2={`${exampleEndPos.x}%`}
                y2={`${exampleEndPos.y}%`}
                stroke="#f59e0b"
                strokeWidth="5"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
              <circle cx={`${exampleEndPos.x}%`} cy={`${exampleEndPos.y}%`} r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
            </g>
          )}

          {/* User Locked Drawn Lines */}
          {drawnLines.map((line, idx) => {
            const startP = positions[line.nameId];
            const endP = positions[line.targetId];
            if (!startP || !endP) return null;

            const nameObj = sceneData.names.find(n => n.id === line.nameId);
            const isCorrect = isSubmitted && nameObj?.target_id === line.targetId;
            const strokeColor = isSubmitted ? (isCorrect ? '#10b981' : '#f43f5e') : '#6366f1';

            return (
              <g key={idx}>
                <line
                  x1={`${startP.x}%`}
                  y1={`${startP.y}%`}
                  x2={`${endP.x}%`}
                  y2={`${endP.y}%`}
                  stroke={strokeColor}
                  strokeWidth="5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
                <circle cx={`${endP.x}%`} cy={`${endP.y}%`} r="8" fill={strokeColor} stroke="#ffffff" strokeWidth="2" />
              </g>
            );
          })}

          {/* Active Drag/Mouse Tracking Line */}
          {selectedName && positions[selectedName.id] && (
            <g>
              <line
                x1={`${positions[selectedName.id].x}%`}
                y1={`${positions[selectedName.id].y}%`}
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

        {/* 🌟 Example Badge Floating Overlay on Example Line */}
        {exampleStartPos && exampleEndPos && (
          <div
            style={{
              left: `${(exampleStartPos.x + exampleEndPos.x) / 2}%`,
              top: `${(exampleStartPos.y + exampleEndPos.y) / 2}%`
            }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none px-3 py-1 bg-amber-500 text-white font-black text-[11px] rounded-full uppercase tracking-wider border-2 border-white shadow-xl flex items-center gap-1 animate-pulse"
          >
            ★ EXAMPLE
          </div>
        )}

        {/* Name Selection Ribbon */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 z-10 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <User size={14} className="text-indigo-600" /> Character Names (Click name pill, then click person below):
            </span>
            <span className="text-xs font-bold text-indigo-700">
              {selectedName ? `Selected: ${selectedName.text} (Click person in picture)` : 'Select a name'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {sceneData.names.map((name) => {
              const hasLine = drawnLines.some(l => l.nameId === name.id);
              const isSelected = selectedName?.id === name.id;

              return (
                <button
                  key={name.id}
                  ref={(el) => (nameButtonRefs.current[name.id] = el)}
                  disabled={isSubmitted || name.isExample}
                  onClick={() => handleSelectName(name)}
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

        {/* 🖼️ Main Image Viewport */}
        <div
          ref={imageRef}
          onClick={handleImageClickForCalibration}
          className={`relative w-full h-[400px] sm:h-[480px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800 ${
            isCalibratorOpen ? 'cursor-crosshair ring-4 ring-amber-400' : selectedName ? 'cursor-crosshair' : 'cursor-default'
          }`}
        >
          {/* Background Picture Scene */}
          <img
            src={sceneData.image_url}
            alt="Listening Part 1 Scene"
            className="w-full h-full object-cover object-center"
          />

          {/* Clean Target Pin Markers on Picture */}
          {activeTargets.map((target) => {
            const matchedLine = drawnLines.find(l => l.targetId === target.id);
            const isExamplePin = target.isExample || target.id === 't1' || target.label?.toLowerCase().includes('jake');
            const isCalibActive = isCalibratorOpen && activeCalibTargetId === target.id;

            return (
              <button
                key={target.id}
                disabled={isSubmitted && !isCalibratorOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isCalibratorOpen) {
                    setActiveCalibTargetId(target.id);
                  } else {
                    handleTargetClick(target);
                  }
                }}
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all ${
                  isCalibActive
                    ? 'scale-150 ring-4 ring-amber-400 z-40'
                    : selectedName ? 'scale-125 cursor-pointer' : 'hover:scale-110'
                }`}
                title={matchedLine ? `${matchedLine.nameText} -> ${target.label}` : target.label}
              >
                <div className="relative flex items-center justify-center">
                  {isExamplePin ? (
                    <span className="px-2.5 py-1 rounded-full border-2 border-white shadow-2xl bg-amber-500 text-white font-black text-xs flex items-center gap-1">
                      📍 Jake
                    </span>
                  ) : (
                    <span className={`px-2.5 py-1 rounded-full border-2 border-white shadow-xl flex items-center justify-center font-black text-xs ${
                      isCalibActive
                        ? 'bg-amber-500 text-white animate-bounce'
                        : matchedLine
                        ? 'bg-indigo-600 text-white'
                        : selectedName
                        ? 'bg-amber-400 text-slate-950 animate-bounce ring-4 ring-amber-200'
                        : 'bg-rose-600 text-white hover:bg-rose-500'
                    }`}>
                      📍 {matchedLine ? matchedLine.nameText : (isCalibratorOpen ? target.id : '')}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
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
