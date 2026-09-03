import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CheckCircle2, Sparkles, RefreshCw, Trash2, Volume2 } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import FlyersListeningPlayButton from '../common/FlyersListeningPlayButton';

// SVG ViewBox dimensions — MUST match actual image dimensions (1264×848)
const VB_W = 1264;
const VB_H = 848;

/** Convert screen (clientX/Y) → SVG viewBox coordinates (pixel-accurate, scale-independent) */
function screenToSVG(svgEl, clientX, clientY) {
  const pt = svgEl.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  return pt.matrixTransform(svgEl.getScreenCTM().inverse());
}

/** Convert data percentage (0-100) → SVG viewBox pixel coordinate */
const pctToVB = (pct, dim) => (pct / 100) * dim;

export function SVGLineMatcher({ customData, onComplete, weekNumber = 33 }) {
  /* ── Core game state ── */
  const [selectedName, setSelectedName] = useState(null);
  const [drawnLines, setDrawnLines] = useState([]);  // [{ nameId, nameText, targetId }]
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  /* ── Cambridge double-play state ── */
  // 'idle' | 'playing-1' | 'pausing' | 'playing-2' | 'done'
  const [playStatus, setPlayStatus] = useState('idle');
  const doublePlayAbortRef = useRef(false); // lets us cancel mid-sequence

  /* ── Refs ── */
  const svgRef = useRef(null);            // the <svg> element
  const nameButtonRefs = useRef({});      // name pill buttons

  /* ── Data ── */
  const fullListeningScript = customData?.passage_audio_script || customData?.script ||
    'Look at Part 1. Now look at the picture. Listen and draw lines from the names to the correct people.';

  const sceneData = React.useMemo(() => {
    if (customData?.names && customData?.targets) return customData;
    return { image_url: `/images/week${weekNumber}/read_cover_w${weekNumber}.jpg`, names: [], targets: [] };
  }, [customData, weekNumber]);

  const activeTargets = sceneData.targets;

  /* ── SVG coordinate state for line drawing ── */
  // Name button center positions in SVG viewBox space
  const [namePosVB, setNamePosVB] = useState({});
  // Mouse position in SVG viewBox space (for drag-preview line)
  const [mouseVB, setMouseVB] = useState({ x: 0, y: 0 });

  /* ── Recalculate name button positions in SVG space ── */
  const recalcNamePositions = useCallback(() => {
    if (!svgRef.current) return;
    const next = {};
    sceneData.names.forEach(n => {
      const btn = nameButtonRefs.current[n.id];
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const svgPt = screenToSVG(svgRef.current, r.left + r.width / 2, r.top + r.height / 2);
      next[n.id] = { x: svgPt.x, y: svgPt.y };
    });
    setNamePosVB(next);
  }, [sceneData.names]);

  useEffect(() => {
    // Initial calc + staggered retries for fonts/layout settle
    recalcNamePositions();
    const t1 = setTimeout(recalcNamePositions, 80);
    const t2 = setTimeout(recalcNamePositions, 300);
    const t3 = setTimeout(recalcNamePositions, 700);

    const obs = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(recalcNamePositions)
      : null;
    if (obs && svgRef.current) obs.observe(svgRef.current);

    window.addEventListener('resize', recalcNamePositions);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      obs?.disconnect();
      window.removeEventListener('resize', recalcNamePositions);
    };
  }, [recalcNamePositions]);

  /* ── SVG mouse handlers ── */
  const handleSVGMouseMove = useCallback((e) => {
    if (!svgRef.current) return;
    const p = screenToSVG(svgRef.current, e.clientX, e.clientY);
    if (selectedName) setMouseVB(p);
  }, [selectedName]);

  /* ── Game logic ── */
  const handleSelectName = (nameObj) => {
    if (isSubmitted || nameObj.isExample) return;
    setSelectedName(nameObj);
    // Set initial mouseVB to name button center so drag-line starts at button
    const pos = namePosVB[nameObj.id];
    if (pos) setMouseVB(pos);
  };

  const handleTargetClick = (target) => {
    if (isSubmitted || !selectedName) return;
    const newLines = drawnLines.filter(l => l.nameId !== selectedName.id);
    newLines.push({ nameId: selectedName.id, nameText: selectedName.text, targetId: target.id });
    setDrawnLines(newLines);
    setSelectedName(null);
  };

  const handleCheck = () => {
    const testNames = sceneData.names.filter(n => !n.isExample);
    let correct = 0;
    testNames.forEach(name => {
      const line = drawnLines.find(l => l.nameId === name.id);
      if (name.target_id) { if (line?.targetId === name.target_id) correct++; }
      else { if (!line) correct++; }
    });
    const finalScore = Math.round((correct / testNames.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setDrawnLines([]); setSelectedName(null); setIsSubmitted(false); setScore(null);
  };

  /* ── Flyers-authentic double-play ── */
  // Cambridge A2 Flyers spec: each Listening part is played TWICE.
  // Between the two plays there is a short pause (~5 seconds).
  const PAUSE_BETWEEN_PLAYS_MS = 5000; // 5 second pause

  const handleDoublePlay = useCallback(async () => {
    if (playStatus === 'playing-1' || playStatus === 'playing-2') {
      // Stop current playback
      VoiceService.stop();
      doublePlayAbortRef.current = true;
      setPlayStatus('idle');
      return;
    }

    doublePlayAbortRef.current = false;
    const audioUrl = sceneData?.audio_url || `/audio/week${weekNumber || 33}/listening_p1_full.mp3`;
    const script = sceneData?.passage_audio_script || fullListeningScript;

    try {
      // ── PLAY 1 ──
      setPlayStatus('playing-1');
      await VoiceService.speak(script, 'questions', audioUrl, weekNumber || 33);

      if (doublePlayAbortRef.current) { setPlayStatus('idle'); return; }

      // ── PAUSE ──
      setPlayStatus('pausing');
      await new Promise(resolve => {
        const t = setTimeout(resolve, PAUSE_BETWEEN_PLAYS_MS);
        // Allow abort during pause
        const check = setInterval(() => {
          if (doublePlayAbortRef.current) { clearTimeout(t); clearInterval(check); resolve(); }
        }, 100);
        setTimeout(() => clearInterval(check), PAUSE_BETWEEN_PLAYS_MS + 200);
      });

      if (doublePlayAbortRef.current) { setPlayStatus('idle'); return; }

      // ── PLAY 2 ──
      setPlayStatus('playing-2');
      await VoiceService.speak(script, 'questions', audioUrl, weekNumber || 33);

    } catch (err) {
      console.warn('[DoublePlay] error:', err);
    } finally {
      setPlayStatus('done');
      // Reset to idle after 3s so button is usable again
      setTimeout(() => setPlayStatus('idle'), 3000);
    }
  }, [playStatus, sceneData, fullListeningScript, weekNumber]);

  const handleCopyCalibratedJSON = () => {
    // Export as ready-to-paste listening_hub.js targets array
    const out = calibratedTargets.map(t => ({
      id: t.id,
      label: t.label || '',
      x: t.x,
      y: t.y,
      ...(t.isExample ? { isExample: true } : {})
    }));
    navigator.clipboard.writeText(JSON.stringify(out, null, 2));
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  /* ── Derived: example connection endpoints ── */
  const exampleName   = sceneData.names.find(n => n.isExample);
  const exampleTarget = activeTargets.find(t => t.isExample || t.id === exampleName?.target_id);
  const exNameVB  = exampleName   ? namePosVB[exampleName.id]   : null;
  const exTargVB  = exampleTarget ? { x: pctToVB(exampleTarget.x, VB_W), y: pctToVB(exampleTarget.y, VB_H) } : null;

  /* ── Render ── */
  return (
    <div className="w-full max-w-5xl mx-auto my-1 p-2.5 sm:p-4 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md font-sans space-y-2.5">
      {/* Cambridge Exam Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white px-3.5 py-2 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 shadow-sm">
        <div>
          <h2 className="text-xs sm:text-sm font-bold text-slate-300 flex items-center gap-1.5">
            🎧 Cambridge A2 Flyers Practice — Listening Part 1
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-black text-amber-300">
          👉 Listen and draw lines. There is one example.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div className="flex items-center justify-between w-full gap-2">
          <FlyersListeningPlayButton
            partNumber={1}
            audioUrl={sceneData?.audio_url || `/audio/week${weekNumber || 33}/listening_p1_full.mp3`}
            script={sceneData?.passage_audio_script || fullListeningScript}
            weekNumber={weekNumber || 33}
          />

          <button
            type="button"
            onClick={() => { setDrawnLines([]); setSelectedName(null); }}
            disabled={isSubmitted || drawnLines.length === 0}
            className="px-2.5 sm:px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-xs rounded-xl border border-rose-200 transition disabled:opacity-40 flex items-center gap-1 shadow-2xs whitespace-nowrap shrink-0"
          >
            <Trash2 size={13} /> Clear Lines
          </button>
        </div>
      </div>

      {/* ── Interactive Matching Area (Names Ribbon + SVG Canvas) ── */}
      <div onMouseMove={handleSVGMouseMove} className="space-y-2 relative">
        {/* ── Name Selection Ribbon ── */}
        <div className="p-1.5 sm:p-2 bg-slate-50 border border-slate-200 rounded-xl relative z-10">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {sceneData.names.map(name => {
              const hasLine = drawnLines.some(l => l.nameId === name.id);
              const isSelected = selectedName?.id === name.id;
              return (
                <button key={name.id}
                  ref={el => (nameButtonRefs.current[name.id] = el)}
                  disabled={isSubmitted || name.isExample}
                  onClick={() => handleSelectName(name)}
                  data-testid={name.isExample ? 'example-row' : undefined}
                  className={`px-2 py-1 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 border shadow-2xs w-full ${
                    name.isExample
                      ? 'bg-amber-100 text-amber-950 border-amber-400 cursor-default ring-1 ring-amber-300'
                      : isSelected
                      ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-200 scale-102 shadow-sm animate-pulse'
                      : hasLine
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                      : 'bg-white text-slate-900 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-black break-words leading-tight text-center">{name.text}</span>
                  {name.isExample && <span className="text-[9px] bg-amber-500 text-white px-1 rounded uppercase font-black shrink-0">★ EX</span>}
                  {hasLine && !name.isExample && <CheckCircle2 size={12} className="text-emerald-700 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            🖼️ SVG ViewBox Canvas — Image + Pins + Lines in ONE coordinate space
            overflow: visible allows dashed lines to cross through the frame and connect to names above.
           ══════════════════════════════════════════════════════════════ */}
        <div className="relative z-20">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            className={`w-full h-auto block rounded-2xl border-2 transition-all ${
              selectedName ? 'cursor-crosshair border-indigo-400' : 'border-slate-800 cursor-default'
            }`}
            style={{ background: '#0f172a', overflow: 'visible', maxHeight: '52vh' }}
          >
            {/* Background image — fills full viewBox, no stretch issues */}
            <image
              href={sceneData.image_url}
              x={0} y={0}
              width={VB_W} height={VB_H}
              preserveAspectRatio="xMidYMid slice"
              onLoad={recalcNamePositions}
            />

            {/* ─ Official EXAMPLE line (amber dashed, crossing through frame to name above) ─ */}
            {exNameVB && exTargVB && (
              <g opacity="0.95" className="pointer-events-none">
                <line
                  x1={exNameVB.x} y1={exNameVB.y}
                  x2={exTargVB.x} y2={exTargVB.y}
                  stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="10 6" strokeLinecap="round"
                />
                <circle cx={exNameVB.x} cy={exNameVB.y} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <circle cx={exTargVB.x} cy={exTargVB.y} r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
                <text x={exTargVB.x} y={exTargVB.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="sans-serif">★</text>
              </g>
            )}

            {/* ─ User-drawn locked lines (crossing through frame to name above) ─ */}
            {drawnLines.map((line, idx) => {
              const startVB = namePosVB[line.nameId];
              const tgt = activeTargets.find(t => t.id === line.targetId);
              if (!startVB || !tgt) return null;
              const endVB = { x: pctToVB(tgt.x, VB_W), y: pctToVB(tgt.y, VB_H) };
              const nameObj = sceneData.names.find(n => n.id === line.nameId);
              const isCorrect = isSubmitted && nameObj?.target_id === line.targetId;
              const stroke = isSubmitted ? (isCorrect ? '#10b981' : '#f43f5e') : '#6366f1';
              return (
                <g key={idx} className="pointer-events-none">
                  <line x1={startVB.x} y1={startVB.y} x2={endVB.x} y2={endVB.y}
                    stroke={stroke} strokeWidth="3.5" strokeDasharray="10 6" strokeLinecap="round" />
                  <circle cx={startVB.x} cy={startVB.y} r="6" fill={stroke} stroke="#ffffff" strokeWidth="2" />
                  <circle cx={endVB.x} cy={endVB.y} r="9" fill={stroke} stroke="#ffffff" strokeWidth="2.5" />
                  {isSubmitted && (
                    <text x={endVB.x} y={endVB.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="sans-serif">
                      {isCorrect ? '✓' : '✗'}
                    </text>
                  )}
                </g>
              );
            })}

            {/* ─ Live drag preview line (from selected name → cursor) ─ */}
            {selectedName && namePosVB[selectedName.id] && (
              <g className="pointer-events-none">
                <line
                  x1={namePosVB[selectedName.id].x} y1={namePosVB[selectedName.id].y}
                  x2={mouseVB.x} y2={mouseVB.y}
                  stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" opacity="0.85"
                />
                <circle cx={namePosVB[selectedName.id].x} cy={namePosVB[selectedName.id].y} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <circle cx={mouseVB.x} cy={mouseVB.y} r="8" fill="#f59e0b" opacity="0.8" />
              </g>
            )}

        {/* ─ Target pin markers (SVG native, locked to image pixels) ─ */}
        {activeTargets.map(target => {
          const px = pctToVB(target.x, VB_W);
          const py = pctToVB(target.y, VB_H);
          const matchedLine = drawnLines.find(l => l.targetId === target.id);
          const isExamplePin = target.isExample;

          return (
            <g key={target.id}
              onClick={e => {
                e.stopPropagation();
                if (!isSubmitted) handleTargetClick(target);
              }}
              style={{ cursor: isSubmitted ? 'default' : 'pointer' }}
            >
              {/* Outer glow ring */}
              <circle cx={px} cy={py} r={22}
                fill={
                  isExamplePin ? 'rgba(245,158,11,0.2)' :
                  selectedName ? 'rgba(99,102,241,0.2)' : 'rgba(239,68,68,0.15)'
                }
              />
              {/* Main pin circle */}
              <circle cx={px} cy={py} r={16}
                fill={
                  isExamplePin ? '#f59e0b' :
                  matchedLine ? '#6366f1' :
                  selectedName ? '#f59e0b' : '#ef4444'
                }
                stroke="white" strokeWidth="2.5"
              />
              {/* Pin icon */}
              <text x={px} y={py + 5} textAnchor="middle" fill="white"
                fontSize="13" fontWeight="900" fontFamily="sans-serif" pointerEvents="none">
                {isExamplePin ? '★' : matchedLine ? '●' : '📍'}
              </text>
              {/* Label badge below pin */}
              <rect x={px - 42} y={py + 20} width={84} height={18} rx={6}
                fill={isExamplePin ? '#f59e0b' : matchedLine ? '#6366f1' : '#1e293b'}
                opacity="0.92"
              />
              <text x={px} y={py + 33} textAnchor="middle" fill="white"
                fontSize="9" fontWeight="700" fontFamily="sans-serif" pointerEvents="none">
                {isExamplePin ? 'EXAMPLE' :
                 matchedLine ? matchedLine.nameText : '?'}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  </div>

      {/* Footer Check & Score */}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
        {!isSubmitted ? (
          <button onClick={handleCheck} disabled={drawnLines.length === 0}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-40"
          ><Sparkles size={16} /> Check Line Matches</button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 animate-bounce" />
              <span className="text-sm font-black text-slate-900">Score: {score}%</span>
            </div>
            <button onClick={handleReset}
              className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-bold text-xs rounded-lg transition flex items-center gap-1"
            ><RefreshCw size={12} /> Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SVGLineMatcher;
