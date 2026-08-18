import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, Trophy, HelpCircle, Lightbulb, Timer, Flame } from 'lucide-react';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';
import { useUserStore } from '../../../../stores/useUserStore';

function DraggableLabel({ id, text, isPlaced, disabled }) {
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
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 border-2 border-teal-400 text-white font-black text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing transition select-none ${
        isDragging ? 'opacity-50 ring-4 ring-teal-300' : ''
      }`}
    >
      🏷️ {text}
    </button>
  );
}

function DropZone({ id, label, currentPlaced, isCorrect, targetInfo }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ left: `${targetInfo.x}%`, top: `${targetInfo.y}%` }}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 min-w-[130px] min-h-[50px] rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md ${
        currentPlaced
          ? isCorrect
            ? 'bg-emerald-600 border-white text-white font-black scale-105 ring-2 ring-emerald-300'
            : 'bg-rose-600 border-white text-white font-black scale-105 animate-shake'
          : isOver
          ? 'bg-amber-400 border-amber-600 text-slate-950 font-black scale-110 ring-4 ring-amber-300'
          : 'bg-white/90 border-dashed border-teal-500 text-teal-950 font-bold hover:bg-white'
      }`}
    >
      <span className="text-[10px] uppercase font-black tracking-wider opacity-90">{label}</span>
      <span className="text-xs font-black truncate max-w-[120px]">
        {currentPlaced ? currentPlaced.text : 'Drop Label Here'}
      </span>
    </div>
  );
}

const DEFAULT_SCIENCE_DATA = {
  experimentTitle: "Corridor Friction & Slip Hazard Virtual Lab",
  diagramImage: "/images/week33/clil_friction.png",
  labels: [
    { id: "lbl_01", text: "Wet Puddle", targetId: "target_01" },
    { id: "lbl_02", text: "Friction Zero", targetId: "target_02" },
    { id: "lbl_03", text: "Clean Bandage", targetId: "target_03" },
    { id: "lbl_04", text: "Safety Sign", targetId: "target_04" }
  ],
  targets: [
    { id: "target_01", name: "Puddle Zone", x: 50, y: 75 },
    { id: "target_02", name: "Low Friction Area", x: 65, y: 60 },
    { id: "target_03", name: "First Aid Kit", x: 30, y: 55 },
    { id: "target_04", name: "Corridor Warning Sign", x: 80, y: 35 }
  ],
  explanation: "Water acts as a liquid lubricant between shoe soles and smooth tiles, reducing friction to near zero and causing sudden slips."
};

export default function ScienceDragDropLab({ scienceData, weekNumber = 33, onComplete }) {
  const labData = scienceData || DEFAULT_SCIENCE_DATA;
  const [placedItems, setPlacedItems] = useState({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  // 45s Timer Engine
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          fireCelebrationConfetti('ScienceLab_Complete');
          if (onComplete) onComplete(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver, score, onComplete]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || isGameOver) return;

    const labelItem = labData.labels.find(l => l.id === active.id);
    const targetInfo = labData.targets.find(t => t.id === over.id);

    if (!labelItem || !targetInfo) return;

    const isCorrect = labelItem.targetId === over.id;
    const newPlaced = { ...placedItems, [over.id]: { ...labelItem, isCorrect } };
    setPlacedItems(newPlaced);

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const bonusScore = 25 + nextStreak * 5;
      setScore(prev => prev + bonusScore);
      setTimeLeft(prev => Math.min(45, prev + 3));

      const totalCorrect = Object.values(newPlaced).filter(p => p.isCorrect).length;
      if (totalCorrect === labData.targets.length) {
        setIsGameOver(true);
        fireCelebrationConfetti('ScienceLab_Victory');
        const userStore = useUserStore?.getState ? useUserStore.getState() : null;
        if (userStore?.addXP) userStore.addXP(45);
        if (onComplete) onComplete(score + bonusScore);
      }
    } else {
      setStreak(0);
    }
  };

  const handleRestart = () => {
    setPlacedItems({});
    setScore(0);
    setStreak(0);
    setTimeLeft(45);
    setIsGameOver(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5 sm:p-7 bg-white rounded-3xl border-2 border-teal-300 shadow-xl space-y-6 text-slate-900 font-sans">
      {/* Top Arcade Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-teal-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
            🧪
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-300">
              Science Physics CLIL • Arcade Challenge
            </span>
            <h3 className="text-lg font-black text-slate-900">🧪 SCIENCE LAB (PHYSICS DRAG & DROP)</h3>
          </div>
        </div>

        {/* Score & Timer Dashboard */}
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="px-3 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-black text-xs animate-bounce flex items-center gap-1 shadow-md rounded-full">
              <Flame size={14} /> {streak}x STREAK!
            </div>
          )}

          <div className="px-4 py-2 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-2">
            <Timer className={timeLeft <= 8 ? 'text-rose-500 animate-ping' : 'text-teal-600'} size={18} />
            <span className={`text-base font-black font-mono ${timeLeft <= 8 ? 'text-rose-600' : 'text-slate-900'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="px-4 py-2 bg-teal-100 text-teal-900 rounded-2xl border border-teal-300 font-black text-sm font-mono">
            {score} PTS
          </div>
        </div>
      </div>

      {/* Game Over Screen */}
      {isGameOver ? (
        <div className="p-8 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-300 rounded-3xl text-center space-y-4 shadow-inner animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-teal-600 animate-bounce" />
          <h3 className="text-2xl font-black text-slate-900">SCIENCE LAB COMPLETE!</h3>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed font-bold">
            {labData.explanation}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-700">
            <div>Score: <span className="text-xl font-black text-teal-600">{score} PTS</span></div>
            <div>XP Earned: <span className="text-xl font-black text-emerald-600">+45 XP</span></div>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 text-white rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <RefreshCw size={18} /> Play Science Lab Again (45s)
          </button>
        </div>
      ) : (
        /* Active Lab Display */
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="space-y-5">
            {/* Title */}
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200">
              <h4 className="text-sm font-black text-teal-950">{labData.experimentTitle}</h4>
              <p className="text-xs text-teal-800 mt-0.5">
                Drag the science labels into the correct position on the experiment diagram before time runs out!
              </p>
            </div>

            {/* Diagram Area with Drop Zones */}
            <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-300 shadow-md">
              <img
                src={labData.diagramImage || '/images/week33/clil_friction.png'}
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
                />
              ))}
            </div>

            {/* Draggable Labels Source Dock */}
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                DRAG LABELS TO EXPERIMENT DIAGRAM:
              </span>
              <div className="flex items-center gap-3 flex-wrap">
                {labData.labels?.map((label) => {
                  const isPlaced = Object.values(placedItems).some(p => p.id === label.id && p.isCorrect);
                  return (
                    <DraggableLabel
                      key={label.id}
                      id={label.id}
                      text={label.text}
                      isPlaced={isPlaced}
                      disabled={isGameOver}
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
