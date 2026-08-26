import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CheckCircle2, Sparkles, RefreshCw, Trash2, Volume2, Target, Copy, Check } from 'lucide-react';
import VoiceService from '../../services/voiceService';
import ExamIntroAudioButton from '../common/ExamIntroAudioButton';

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

  /* ── Calibrator state ── */
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false);
  const [calibratedTargets, setCalibratedTargets] = useState(() => sceneData.targets);
  const [activeCalibId, setActiveCalibId] = useState(sceneData.targets[0]?.id || 't1');
  const [copiedToast, setCopiedToast] = useState(false);
  const [hoverVB, setHoverVB] = useState({ x: 0, y: 0 }); // viewBox coords under cursor

  const activeTargets = isCalibratorOpen ? calibratedTargets : sceneData.targets;

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
    if (isCalibratorOpen) setHoverVB(p);
  }, [selectedName, isCalibratorOpen]);

  const handleSVGClick = useCallback((e) => {
    if (!isCalibratorOpen || !svgRef.current) return;
    const p = screenToSVG(svgRef.current, e.clientX, e.clientY);
    // Clamp to image area
    if (p.x < 0 || p.x > VB_W || p.y < 0 || p.y > VB_H) return;
    const xPct = parseFloat((p.x / VB_W * 100).toFixed(1));
    const yPct = parseFloat((p.y / VB_H * 100).toFixed(1));
    setCalibratedTargets(prev => prev.map(t =>
      t.id === activeCalibId ? { ...t, x: xPct, y: yPct } : t
    ));
    // Auto-advance to next target
    const ids = calibratedTargets.map(t => t.id);
    const cur = ids.indexOf(activeCalibId);
    if (cur < ids.length - 1) setActiveCalibId(ids[cur + 1]);
  }, [isCalibratorOpen, activeCalibId, calibratedTargets]);

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
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white px-4 py-2.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
        <div>
          <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">Official Cambridge Assessment</span>
          <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            🎧 CAMBRIDGE A2 FLYERS — LISTENING PART 1
          </h2>
        </div>
        <p className="text-[11px] text-slate-200 font-medium">Listen and draw lines. There is one example.</p>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <button type="button"
            onClick={() => { window.location.href = `/week/${weekNumber || 33}/hub/1`; }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-black flex items-center gap-1 transition active:scale-95 shadow shrink-0"
          >← Map</button>

          <button type="button"
            onClick={() => VoiceService.speak(
              sceneData?.passage_audio_script || fullListeningScript,
              'questions',
              sceneData?.audio_url || `/audio/week${weekNumber || 33}/listening_p1_full.mp3`,
              weekNumber || 33
            )}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm active:scale-95 shrink-0"
          ><Volume2 size={14} /> 🔊 Play Audio</button>

          <ExamIntroAudioButton
            weekNumber={weekNumber || 33}
            introId="exam_intro_L1"
            introText="Listen and draw lines. There is one example."
          />

          {/* 🎯 CALIBRATOR TOGGLE — always visible */}
          <button type="button"
            onClick={() => { setIsCalibratorOpen(p => !p); setCalibratedTargets(sceneData.targets); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 border shrink-0 ${
              isCalibratorOpen
                ? 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-300 animate-pulse'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-amber-50 hover:border-amber-400'
            }`}
            title="Pin Calibrator — click characters on image to set coordinates"
          >
            <Target size={13} /> {isCalibratorOpen ? '🎯 CALIBRATING…' : '🎯 Calibrator'}
          </button>
        </div>

        <button type="button" onClick={() => { setDrawnLines([]); setSelectedName(null); }}
          disabled={isSubmitted || drawnLines.length === 0}
          className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs rounded-lg border border-rose-200 transition disabled:opacity-40 flex items-center gap-1"
        ><Trash2 size={12} /> Clear</button>
      </div>

      {/* ── CALIBRATOR PANEL ── */}
      {isCalibratorOpen && (
        <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="font-black text-amber-900">🎯 Pin Calibrator — Click on each character in the image below</p>
            <div className="flex gap-2">
              <button onClick={handleCopyCalibratedJSON}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-lg flex items-center gap-1"
              >{copiedToast ? <><Check size={12}/> Copied!</> : <><Copy size={12}/> Copy JSON</>}</button>
              <button onClick={() => setIsCalibratorOpen(false)}
                className="px-3 py-1 bg-slate-700 text-white font-black rounded-lg hover:bg-slate-600"
              >Close</button>
            </div>
          </div>

          {/* Target selector pills */}
          <div className="flex flex-wrap gap-1.5">
            {calibratedTargets.map(t => (
              <button key={t.id} onClick={() => setActiveCalibId(t.id)}
                className={`px-2 py-0.5 rounded-full border font-black text-[10px] transition ${
                  activeCalibId === t.id
                    ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-200'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-amber-400'
                }`}
              >
                {t.id}: {t.label?.split(' ')[0] || t.id} ({t.x?.toFixed?.(1) ?? t.x}, {t.y?.toFixed?.(1) ?? t.y})
              </button>
            ))}
          </div>

          <p className="text-amber-800 font-semibold">
            → Click on <strong className="text-amber-900">"{calibratedTargets.find(t => t.id === activeCalibId)?.label || activeCalibId}"</strong> in the image. Cursor: x={hoverVB.x.toFixed(0)} y={hoverVB.y.toFixed(0)} (px in 1264×848)
          </p>

          {/* JSON Preview */}
          <pre className="bg-slate-900 text-emerald-400 rounded-lg p-2 text-[10px] overflow-auto max-h-40 font-mono">
{`targets: [\n${calibratedTargets.map(t =>
  `  { id: "${t.id}", label: "${t.label || ''}", x: ${t.x}, y: ${t.y}${t.isExample ? ', isExample: true' : ''} }`
).join(',\n')}\n]`}
          </pre>
        </div>
      )}

      {/* ── Name Selection Ribbon ── */}
      <div className="p-1.5 sm:p-2 bg-slate-50 border border-slate-200 rounded-xl">
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
          preserveAspectRatio="xMidYMid meet" ensures correct scaling on all screens.
          Pin coords: x = (data_x / 100) * 1264, y = (data_y / 100) * 848
          Name label coords: computed via svg.getScreenCTM().inverse()
         ══════════════════════════════════════════════════════════════ */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className={`w-full rounded-2xl shadow-xl border-2 block select-none ${
          isCalibratorOpen
            ? 'border-amber-400 ring-2 ring-amber-300 cursor-crosshair'
            : selectedName ? 'cursor-crosshair border-indigo-400' : 'border-slate-800 cursor-default'
        }`}
        onMouseMove={handleSVGMouseMove}
        onClick={handleSVGClick}
        style={{ background: '#0f172a' }}
      >
        {/* Background image — fills full viewBox, no stretch issues */}
        <image
          href={sceneData.image_url}
          x={0} y={0}
          width={VB_W} height={VB_H}
          preserveAspectRatio="xMidYMid slice"
          onLoad={recalcNamePositions}
        />

        {/* ─ Official EXAMPLE line (amber dashed) ─ */}
        {exNameVB && exTargVB && (
          <g opacity="0.95">
            <line
              x1={exNameVB.x} y1={exNameVB.y}
              x2={exTargVB.x} y2={exTargVB.y}
              stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 6" strokeLinecap="round"
            />
            <circle cx={exTargVB.x} cy={exTargVB.y} r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
            <text x={exTargVB.x} y={exTargVB.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="sans-serif">★</text>
          </g>
        )}

        {/* ─ User-drawn locked lines ─ */}
        {drawnLines.map((line, idx) => {
          const startVB = namePosVB[line.nameId];
          const tgt = activeTargets.find(t => t.id === line.targetId);
          if (!startVB || !tgt) return null;
          const endVB = { x: pctToVB(tgt.x, VB_W), y: pctToVB(tgt.y, VB_H) };
          const nameObj = sceneData.names.find(n => n.id === line.nameId);
          const isCorrect = isSubmitted && nameObj?.target_id === line.targetId;
          const stroke = isSubmitted ? (isCorrect ? '#10b981' : '#f43f5e') : '#6366f1';
          return (
            <g key={idx}>
              <line x1={startVB.x} y1={startVB.y} x2={endVB.x} y2={endVB.y}
                stroke={stroke} strokeWidth="3" strokeDasharray="10 6" strokeLinecap="round" />
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
          <g>
            <line
              x1={namePosVB[selectedName.id].x} y1={namePosVB[selectedName.id].y}
              x2={mouseVB.x} y2={mouseVB.y}
              stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" opacity="0.8"
            />
            <circle cx={mouseVB.x} cy={mouseVB.y} r="8" fill="#f59e0b" opacity="0.7" />
          </g>
        )}

        {/* ─ Target pin markers (SVG native, locked to image pixels) ─ */}
        {activeTargets.map(target => {
          const px = pctToVB(target.x, VB_W);
          const py = pctToVB(target.y, VB_H);
          const matchedLine = drawnLines.find(l => l.targetId === target.id);
          const isExamplePin = target.isExample;
          const isCalibActive = isCalibratorOpen && activeCalibId === target.id;

          return (
            <g key={target.id}
              onClick={e => {
                e.stopPropagation();
                if (isCalibratorOpen) { setActiveCalibId(target.id); return; }
                if (!isSubmitted) handleTargetClick(target);
              }}
              style={{ cursor: isSubmitted ? 'default' : 'pointer' }}
            >
              {/* Outer glow ring */}
              <circle cx={px} cy={py} r={isCalibActive ? 28 : 22}
                fill={
                  isCalibActive ? 'rgba(251,191,36,0.3)' :
                  isExamplePin ? 'rgba(245,158,11,0.2)' :
                  selectedName ? 'rgba(99,102,241,0.2)' : 'rgba(239,68,68,0.15)'
                }
              />
              {/* Main pin circle */}
              <circle cx={px} cy={py} r={16}
                fill={
                  isCalibActive ? '#f59e0b' :
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
                fill={isCalibActive ? '#f59e0b' : isExamplePin ? '#f59e0b' : matchedLine ? '#6366f1' : '#1e293b'}
                opacity="0.92"
              />
              <text x={px} y={py + 33} textAnchor="middle" fill="white"
                fontSize="9" fontWeight="700" fontFamily="sans-serif" pointerEvents="none">
                {isCalibActive ? `↑ ${target.id}` :
                 isExamplePin ? 'EXAMPLE' :
                 matchedLine ? matchedLine.nameText :
                 isCalibratorOpen ? `${target.id} (${target.x},${target.y})` : '?'}
              </text>
            </g>
          );
        })}

        {/* ─ Calibrator crosshair cursor HUD ─ */}
        {isCalibratorOpen && hoverVB.x > 0 && (
          <g pointerEvents="none">
            <line x1={hoverVB.x} y1={0} x2={hoverVB.x} y2={VB_H}
              stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6" />
            <line x1={0} y1={hoverVB.y} x2={VB_W} y2={hoverVB.y}
              stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6" />
            <rect x={hoverVB.x + 8} y={hoverVB.y - 20} width={130} height={22} rx={5} fill="rgba(0,0,0,0.8)" />
            <text x={hoverVB.x + 14} y={hoverVB.y - 5} fill="#fbbf24" fontSize="11" fontWeight="700" fontFamily="monospace">
              x:{(hoverVB.x / VB_W * 100).toFixed(1)}% y:{(hoverVB.y / VB_H * 100).toFixed(1)}%
            </text>
          </g>
        )}
      </svg>

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
