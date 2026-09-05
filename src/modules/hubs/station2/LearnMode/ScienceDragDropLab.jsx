import React, { useState, useEffect, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, Trophy, HelpCircle, Lightbulb, Timer, Flame, Play, Pause, RotateCcw, MousePointerClick } from 'lucide-react';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';
import { useUserStore } from '../../../../stores/useUserStore';
import useDailyQuestStore from '../../../../stores/useDailyQuestStore';
import { playButtonClick, playCorrectSound, playWrongSound, playVictoryFanfare } from '../../../../utils/soundEffects';

function DraggableLabel({ id, text, isPlaced, disabled, isSelected, onClick }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: isPlaced || disabled
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999
      }
    : undefined;

  if (isPlaced) return null;

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r ${
        isSelected
          ? 'from-amber-500 to-amber-600 ring-4 ring-amber-300 scale-105 border-amber-300'
          : 'from-teal-600 to-emerald-600 border-teal-400 hover:scale-105'
      } border-2 text-white font-black text-[11px] sm:text-xs rounded-xl shadow-md active:scale-95 cursor-grab active:cursor-grabbing transition select-none ${
        isDragging ? 'opacity-50 ring-4 ring-teal-300' : ''
      }`}
    >
      {isSelected ? '👉 ' : '🏷️ '}{text}
    </button>
  );
}

function DropZone({ id, label, currentPlaced, isCorrect, targetInfo, isTargeted, onClick }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      style={{ left: `${targetInfo.x}%`, top: `${targetInfo.y}%` }}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-[70px] sm:min-w-[95px] max-w-[110px] sm:max-w-[155px] rounded-lg sm:rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center shadow-md backdrop-blur-md cursor-pointer z-10 select-none ${
        currentPlaced
          ? isCorrect
            ? 'bg-emerald-600/95 border-white text-white font-black scale-105 ring-2 ring-emerald-300'
            : 'bg-rose-600/95 border-white text-white font-black scale-105 animate-shake'
          : isOver || isTargeted
          ? 'bg-amber-400 border-amber-600 text-slate-950 font-black scale-110 ring-4 ring-amber-300 z-20'
          : 'bg-white/95 border-2 border-dashed border-teal-500 text-teal-950 font-bold hover:bg-white hover:scale-105'
      }`}
    >
      <span className="text-[7px] sm:text-[9.5px] uppercase font-black tracking-tight opacity-90 leading-tight mb-0.5 whitespace-normal break-words text-center">
        {label}
      </span>
      <span className="text-[8px] sm:text-[10.5px] font-black whitespace-normal break-words leading-tight text-center">
        {currentPlaced ? currentPlaced.text : (isTargeted ? '👉 Tap' : '📍 Drop')}
      </span>
    </div>
  );
}

const DEFAULT_SCIENCE_DATA = {
  experimentTitle: "Interactive Action Lab",
  diagramImage: "",
  labels: [],
  targets: [],
  explanation: "Interactive action & CLIL exploration."
};

export default function ScienceDragDropLab({ scienceData, weekNumber = 33, onComplete, onBackToMap }) {
  const wasAlreadyCompleted = useDailyQuestStore((s) => s.isQuestCompleted(weekNumber, 'science_lab'));
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'gameover'
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [completedStages, setCompletedStages] = useState({}); // { [stageIdx]: true }
  const [placedItems, setPlacedItems] = useState({});
  const [selectedLabelId, setSelectedLabelId] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 120s total for 3 scenarios
  const [stageCleared, setStageCleared] = useState(false);

  const stages = useMemo(() => {
    if (scienceData?.stages && Array.isArray(scienceData.stages) && scienceData.stages.length > 0) {
      return scienceData.stages;
    }
    // Single stage fallback
    return [{
      id: scienceData?.id || 'stage_1',
      stageNumber: 1,
      title: scienceData?.title_en || scienceData?.experimentTitle || "Interactive Action Lab",
      diagramImage: scienceData?.background_image || scienceData?.diagramImage || "",
      explanation: scienceData?.description_en || scienceData?.explanation || "Interactive action exploration.",
      zones: scienceData?.zones || [],
      labels: scienceData?.labels || []
    }];
  }, [scienceData]);

  const labData = useMemo(() => {
    const stage = stages[currentStageIdx] || stages[0] || DEFAULT_SCIENCE_DATA;
    const experimentTitle = stage.title || stage.title_en || stage.experimentTitle || `Stage ${currentStageIdx + 1}`;
    const diagramImage = stage.diagramImage || stage.background_image || "";
    const explanation = stage.explanation || stage.description_en || "";

    let targets = [];
    let labels = [];

    if (stage.zones && Array.isArray(stage.zones)) {
      targets = stage.zones.map((z, idx) => ({
        id: z.id || `target_${idx + 1}`,
        name: z.label || `Zone ${idx + 1}`,
        x: z.x || 50,
        y: z.y || 50,
        micro_explanation: z.micro_explanation || ''
      }));

      labels = stage.zones.map((z, idx) => ({
        id: `lbl_${currentStageIdx}_${idx + 1}`,
        text: z.correct_label || z.label || `Label ${idx + 1}`,
        targetId: z.id || `target_${idx + 1}`
      }));
    } else if (stage.targets && Array.isArray(stage.targets)) {
      targets = stage.targets;
      labels = stage.labels || [];
    } else {
      targets = DEFAULT_SCIENCE_DATA.targets;
      labels = DEFAULT_SCIENCE_DATA.labels;
    }

    return { experimentTitle, diagramImage, explanation, targets, labels, stageNumber: currentStageIdx + 1 };
  }, [stages, currentStageIdx]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  // 120s Timer Engine
  useEffect(() => {
    if (gameState !== 'playing' || stageCleared) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, stageCleared]);

  // Timeout trigger when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      finishGame();
    }
  }, [timeLeft, gameState]);

  const handleStartGame = () => {
    setCurrentStageIdx(0);
    setCompletedStages({});
    setPlacedItems({});
    setSelectedLabelId(null);
    setScore(0);
    setStreak(0);
    setTimeLeft(120);
    setStageCleared(false);
    setGameState('playing');
  };

  const handleTogglePause = () => {
    setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const finishGame = () => {
    setGameState('gameover');
    setStageCleared(false);

    if (score > 0) {
      playVictoryFanfare();
      fireCelebrationConfetti('ScienceLab_Victory');
    }

    useDailyQuestStore.getState().completeQuest(weekNumber, 'science_lab', {
      score: score > 0 ? score : 100,
      data: { finalScore: score, completedStages, completedAt: new Date().toISOString() }
    });

    if (onComplete) onComplete(score > 0 ? score : 50);
  };

  const handleNextStage = () => {
    playButtonClick();
    if (currentStageIdx < stages.length - 1) {
      setCurrentStageIdx(prev => prev + 1);
      setPlacedItems({});
      setSelectedLabelId(null);
      setStageCleared(false);
      setTimeLeft(prev => prev + 30); // bonus 30s
    } else {
      finishGame();
    }
  };

  const handleLabelClick = (labelId) => {
    if (gameState !== 'playing' || stageCleared) return;
    playButtonClick();
    setSelectedLabelId(prev => (prev === labelId ? null : labelId));
  };

  const handleTargetClick = (target) => {
    if (gameState !== 'playing' || !selectedLabelId || stageCleared) return;

    const labelItem = labData.labels.find(l => l.id === selectedLabelId);
    if (!labelItem) return;

    const isCorrect = labelItem.targetId === target.id;
    const newPlaced = { ...placedItems, [target.id]: { ...labelItem, isCorrect } };
    setPlacedItems(newPlaced);
    setSelectedLabelId(null);

    if (isCorrect) {
      playCorrectSound();
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const bonusScore = 25 + nextStreak * 5;
      setScore(prev => prev + bonusScore);

      const totalCorrect = Object.values(newPlaced).filter(p => p.isCorrect).length;
      if (totalCorrect === labData.targets.length) {
        setCompletedStages(prev => ({ ...prev, [currentStageIdx]: true }));
        setStageCleared(true);
        playVictoryFanfare();
        if (currentStageIdx === stages.length - 1) {
          finishGame();
        }
      }
    } else {
      playWrongSound();
      setStreak(0);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || gameState !== 'playing' || stageCleared) return;

    const labelItem = labData.labels.find(l => l.id === active.id);
    const targetInfo = labData.targets.find(t => t.id === over.id);

    if (!labelItem || !targetInfo) return;

    const isCorrect = labelItem.targetId === over.id;
    const newPlaced = { ...placedItems, [over.id]: { ...labelItem, isCorrect } };
    setPlacedItems(newPlaced);

    if (isCorrect) {
      playCorrectSound();
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const bonusScore = 25 + nextStreak * 5;
      setScore(prev => prev + bonusScore);

      const totalCorrect = Object.values(newPlaced).filter(p => p.isCorrect).length;
      if (totalCorrect === labData.targets.length) {
        setCompletedStages(prev => ({ ...prev, [currentStageIdx]: true }));
        setStageCleared(true);
        playVictoryFanfare();
        if (currentStageIdx === stages.length - 1) {
          finishGame();
        }
      }
    } else {
      playWrongSound();
      setStreak(0);
    }
  };

  const xpEarned = score > 0 ? 50 : 0;

  return (
    <div className="w-full max-w-7xl mx-auto p-3.5 sm:p-6 lg:p-7 bg-white rounded-2xl sm:rounded-3xl border-2 border-teal-300 shadow-xl space-y-3.5 text-slate-900 font-sans">
      {/* Top Arcade Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-teal-100 pb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
            🧪
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-base lg:text-lg font-black text-slate-900 truncate">{labData.experimentTitle || 'Interactive Action Lab'}</h3>
          </div>
        </div>

        {/* Score & Timer Dashboard */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {gameState === 'playing' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 transition"
              title="Pause Timer"
            >
              <Pause size={14} />
            </button>
          )}

          {gameState === 'paused' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-black text-[11px] flex items-center gap-1 shadow-sm"
            >
              <Play size={12} /> Resume
            </button>
          )}

          <div className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1">
            <Timer className={timeLeft <= 10 && gameState === 'playing' ? 'text-rose-500 animate-ping' : 'text-teal-600'} size={13} />
            <span className={`text-xs font-black font-mono ${timeLeft <= 10 ? 'text-rose-600' : 'text-slate-900'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="px-2.5 py-1 bg-teal-100 text-teal-900 rounded-lg border border-teal-300 font-black text-xs font-mono">
            {score} PTS
          </div>
        </div>
      </div>

      {/* Start Screen (Idle) */}
      {gameState === 'idle' && (
        <div className="p-5 sm:p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-300 rounded-2xl text-center space-y-3 shadow-inner">
          <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-md">
            🧪
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              READY FOR<br />ACTION LAB?
            </h3>
            {wasAlreadyCompleted && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-black">
                <CheckCircle2 size={13} className="text-emerald-700" />
                <span>✓ Quest Completed — Practice / Replay Anytime</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
            <button
              type="button"
              onClick={handleStartGame}
              className="px-6 py-2.5 sm:py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 text-white rounded-xl font-black text-sm shadow-lg inline-flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
            >
              <Play size={18} fill="currentColor" /> {wasAlreadyCompleted ? '▶ REPLAY LAB' : '▶ START'}
            </button>
            {wasAlreadyCompleted && onBackToMap && (
              <button
                type="button"
                onClick={onBackToMap}
                className="px-5 py-2.5 sm:py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-black text-sm shadow-sm inline-flex items-center gap-1.5 transition hover:scale-105"
              >
                ← Back to Map
              </button>
            )}
          </div>
        </div>
      )}

      {/* Paused Banner (Non-blocking) */}
      {gameState === 'paused' && (
        <div className="p-3 bg-teal-50 border border-teal-300 rounded-2xl flex items-center justify-between animate-in fade-in">
          <span className="text-xs font-black text-teal-900 flex items-center gap-2">
            <Pause size={16} className="text-teal-600 animate-pulse" /> Timer Paused — Take your time to inspect the action diagram!
          </span>
          <button
            type="button"
            onClick={handleTogglePause}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-1"
          >
            <Play size={14} fill="currentColor" /> Resume
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="p-8 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-300 rounded-3xl text-center space-y-4 shadow-inner animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-teal-600 animate-bounce" />
          <h3 className="text-2xl font-black text-slate-900">
            {score > 0 ? 'ACTION LAB COMPLETE!' : 'TIME EXPIRED — TRY AGAIN!'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed font-bold">
            {labData.explanation}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-700">
            <div>Score: <span className="text-xl font-black text-teal-600">{score} PTS</span></div>
            <div>XP Earned: <span className={`text-xl font-black ${xpEarned > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>+{xpEarned} XP</span></div>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
            <button
              type="button"
              onClick={() => {
                if (onBackToMap) onBackToMap();
                else if (onComplete) onComplete(score > 0 ? score : 50);
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105 active:scale-95"
            >
              <CheckCircle2 size={18} /> ✓ Return to Map (+50 XP)
            </button>
            <button
              type="button"
              onClick={handleStartGame}
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-sm shadow-sm inline-flex items-center gap-2 transition hover:scale-105"
            >
              <RotateCcw size={18} /> Play Action Lab Again
            </button>
          </div>
        </div>
      )}

      {/* Active Lab Display */}
      {gameState === 'playing' && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="space-y-2.5 sm:space-y-4">
            {/* Multi-Stage Stepper Tabs (3 Scenarios) */}
            {stages.length > 1 && (
              <div className="flex items-center gap-2 p-1.5 bg-teal-50 border border-teal-200 rounded-xl overflow-x-auto">
                <span className="text-[10px] font-black uppercase text-teal-800 px-2 shrink-0">
                  Scenarios:
                </span>
                {stages.map((stg, idx) => {
                  const isCurrent = currentStageIdx === idx;
                  const isDone = completedStages[idx];
                  return (
                    <button
                      key={stg.id || idx}
                      type="button"
                      onClick={() => {
                        playButtonClick();
                        setCurrentStageIdx(idx);
                        setPlacedItems({});
                        setSelectedLabelId(null);
                        setStageCleared(false);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition flex items-center gap-1.5 shrink-0 ${
                        isCurrent
                          ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-300 scale-[1.02]'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {isDone ? <CheckCircle2 size={13} className="text-emerald-700" /> : <span>{idx + 1}.</span>}
                      <span>{stg.title ? stg.title.split(':')[0] : `Stage ${idx + 1}`}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Stage Cleared Next Scenario Banner */}
            {stageCleared && currentStageIdx < stages.length - 1 && (
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-in zoom-in-95">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={24} className="text-emerald-200 shrink-0" />
                  <div>
                    <h4 className="font-black text-sm sm:text-base">Scenario {currentStageIdx + 1} Cleared!</h4>
                    <p className="text-xs text-emerald-100 font-medium">
                      {currentStageIdx === 0
                        ? 'Great! Now compare shoe sole grip and friction in Scenario 2.'
                        : 'Awesome! Now investigate first aid care in Scenario 3.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleNextStage}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition transform hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1.5"
                >
                  Next Scenario: Stage {currentStageIdx + 2} ▶
                </button>
              </div>
            )}

            {/* Title */}
            <div className="p-2.5 sm:p-4 bg-teal-50 rounded-xl sm:rounded-2xl border border-teal-200">
              <h4 className="text-xs sm:text-sm font-black text-teal-950">{labData.experimentTitle}</h4>
              <p className="text-[11px] sm:text-xs text-teal-800 mt-0.5">
                {labData.explanation || 'Drag or tap the action labels into the correct position on the diagram!'}
              </p>
            </div>

            {/* Diagram Area with Drop Zones */}
            <div className="relative w-full h-[290px] xs:h-[330px] sm:h-[480px] md:h-[540px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border-2 border-teal-300 shadow-md">
              <img
                src={labData.diagramImage}
                alt={labData.experimentTitle}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/images/scenes/default_story.jpg'; }}
              />

              {/* Render Target Dropzones */}
              {labData.targets?.map((target) => (
                <DropZone
                  key={target.id}
                  id={target.id}
                  label={target.name}
                  currentPlaced={placedItems[target.id]}
                  isCorrect={placedItems[target.id]?.isCorrect}
                  targetInfo={target}
                  isTargeted={!!selectedLabelId && !placedItems[target.id]?.isCorrect}
                  onClick={() => handleTargetClick(target)}
                />
              ))}
            </div>

            {/* Draggable Labels Source Dock */}
            <div className="p-2.5 sm:p-4 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                  {selectedLabelId ? '👉 TAP A TARGET ZONE ON DIAGRAM ABOVE:' : 'TAP OR DRAG LABELS TO EXPERIMENT DIAGRAM:'}
                </span>
                {selectedLabelId && (
                  <button
                    type="button"
                    onClick={() => setSelectedLabelId(null)}
                    className="text-[10px] font-bold text-rose-600 underline"
                  >
                    Deselect
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {labData.labels?.map((label) => {
                  const isPlaced = Object.values(placedItems).some(p => p.id === label.id && p.isCorrect);
                  return (
                    <DraggableLabel
                      key={label.id}
                      id={label.id}
                      text={label.text}
                      isPlaced={isPlaced}
                      disabled={gameState !== 'playing'}
                      isSelected={selectedLabelId === label.id}
                      onClick={() => handleLabelClick(label.id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </DndContext>
      )}
    </div>
  );
}
