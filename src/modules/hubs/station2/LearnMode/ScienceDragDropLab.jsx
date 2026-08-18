import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, Trophy, HelpCircle, Lightbulb, Check } from 'lucide-react';
import CompletionModal from '../../../../components/common/CompletionModal';
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
      className={`px-3.5 py-2 bg-white border-2 border-emerald-400 text-emerald-950 font-black text-xs rounded-xl shadow-sm hover:shadow-md hover:bg-emerald-50 active:scale-95 cursor-grab active:cursor-grabbing transition select-none ${
        isDragging ? 'opacity-50 ring-2 ring-emerald-500' : ''
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
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 min-w-[110px] min-h-[44px] rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-md ${
        currentPlaced
          ? isCorrect
            ? 'bg-emerald-500/90 border-white text-white font-black scale-105'
            : 'bg-rose-500/90 border-white text-white font-black scale-105 animate-shake'
          : isOver
          ? 'bg-amber-400/90 border-white text-slate-900 font-black scale-110 ring-4 ring-amber-300'
          : 'bg-slate-900/80 border-dashed border-emerald-300 text-emerald-200 hover:bg-slate-900/90'
      }`}
    >
      {currentPlaced ? (
        <span className="text-xs font-black flex items-center gap-1">
          {isCorrect ? <Check size={14} /> : <AlertCircle size={14} />} {currentPlaced}
        </span>
      ) : (
        <>
          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">Drop Here</span>
          <span className="text-[11px] font-black">{label}</span>
        </>
      )}
    </div>
  );
}

export default function ScienceDragDropLab({ customLabData, onAttemptResult }) {
  const defaultLab = {
    title_en: "Corridor Friction & Safety Physics Lab",
    title_vi: "Phòng Thí Nghiệm Vật Lý Ma Sát & An Toàn Hành Lang",
    description_en: "Drag and drop the correct science labels onto the physics safety diagram!",
    background_image: "/images/week33/read_cover_w33.jpg",
    zones: [
      {
        id: "z1",
        label: "Wet Floor Puddle",
        correct_label: "Low Friction Zone",
        x: 48,
        y: 76,
        micro_explanation: "⚠️ Physics Alert: Water acts like a lubricant! Friction is reduced to ZERO, making tiles extremely slippery."
      },
      {
        id: "z2",
        label: "Running Fast",
        correct_label: "Kinetic Momentum",
        x: 62,
        y: 45,
        micro_explanation: "⚡ Physics Alert: High running speed increases forward momentum, making it impossible for shoes to stop in time!"
      },
      {
        id: "z3",
        label: "Yellow Caution Sign",
        correct_label: "Hazard Alert",
        x: 28,
        y: 65,
        micro_explanation: "💡 Safety Alert: Warning signs instruct everyone to slow down and let rubber sole friction maintain balance."
      },
      {
        id: "z4",
        label: "First Aid Treatment",
        correct_label: "Cold Pack & Bandage",
        x: 80,
        y: 55,
        micro_explanation: "🩹 Medical Care: Cold pack reduces tissue swelling, while clean bandage protects the cut skin from bacteria."
      }
    ],
    labels: ["Low Friction Zone", "Kinetic Momentum", "Hazard Alert", "Cold Pack & Bandage", "High Gravity", "Thermal Heat"]
  };

  const lab = customLabData || defaultLab;
  const [placedItems, setPlacedItems] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeExplanation, setActiveExplanation] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedLabel = active.id;
    const dropZoneId = over.id;
    const targetZone = lab.zones.find(z => z.id === dropZoneId);

    if (!targetZone) return;

    const isCorrect = targetZone.correct_label === draggedLabel;

    setPlacedItems(prev => {
      const next = { ...prev, [dropZoneId]: draggedLabel };
      // Check if all zones correctly filled
      const allZonesFilled = lab.zones.every(z => next[z.id] === z.correct_label);
      if (allZonesFilled) {
        setIsCompleted(true);
        fireCelebrationConfetti('ScienceLab_Complete');
        const userStore = useUserStore?.getState ? useUserStore.getState() : null;
        if (userStore?.addXP) userStore.addXP(60);
        if (onAttemptResult) onAttemptResult(true);
      }
      return next;
    });

    if (isCorrect) {
      setActiveExplanation(targetZone.micro_explanation || `✅ "${draggedLabel}" accurately identifies this science zone.`);
      setFeedback({ type: 'success', text: `✅ Correct Match: ${draggedLabel}!` });
    } else {
      setActiveExplanation(null);
      setFeedback({ type: 'error', text: `❌ Not quite. Think about how friction and forces act here!` });
    }
  };

  const handleRestart = () => {
    setPlacedItems({});
    setIsCompleted(false);
    setFeedback(null);
    setActiveExplanation(null);
  };

  const placedValues = Object.values(placedItems);
  const availableLabels = lab.labels.filter(l => !placedValues.includes(l));

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-md font-sans text-slate-900 space-y-4">
      <CompletionModal
        isOpen={isCompleted}
        onClose={() => setIsCompleted(false)}
        score={100}
        stars={3}
        xpEarned={60}
        activityTitle="Science Drag & Drop Lab"
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-wrap gap-2">
        <div>
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
            STEM SCIENCE LAB — INTERACTIVE PHYSICS
          </span>
          <h3 className="text-base font-black text-slate-900 mt-0.5">{lab.title_en}</h3>
          <p className="text-xs text-slate-500">{lab.description_en}</p>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <button
              onClick={handleRestart}
              className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-black rounded-xl border border-emerald-300 flex items-center gap-1 transition shadow-sm"
            >
              <RefreshCw size={13} /> Reset Lab
            </button>
          )}
          <span className="px-3 py-1 bg-emerald-50 text-emerald-900 text-xs font-mono font-black rounded-lg border border-emerald-200">
            {Object.keys(placedItems).length} / {lab.zones.length} Matched
          </span>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* Interactive Lab Diagram Viewport */}
        <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-950 rounded-3xl overflow-hidden shadow-xl border-2 border-emerald-500/50 group select-none">
          <img
            src={lab.background_image}
            alt={lab.title_en}
            className="w-full h-full object-cover object-center opacity-85"
            onError={(e) => { e.target.src = '/images/week33/webtoon_scene_1.png'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

          {/* Render Target Drop Zones */}
          {lab.zones.map(z => {
            const placed = placedItems[z.id];
            const isCorrect = placed === z.correct_label;
            return (
              <DropZone
                key={z.id}
                id={z.id}
                label={z.label}
                currentPlaced={placed}
                isCorrect={isCorrect}
                targetInfo={z}
              />
            );
          })}
        </div>

        {/* Draggable Labels Bank */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" /> Science Labels Bank (Drag to image zones):
          </div>

          <div className="flex flex-wrap gap-2.5 min-h-[46px] items-center">
            {availableLabels.length === 0 && !isCompleted ? (
              <span className="text-xs font-bold text-slate-400 italic">All labels placed. Check results above!</span>
            ) : availableLabels.map(label => (
              <DraggableLabel
                key={label}
                id={label}
                text={label}
                isPlaced={false}
                disabled={isCompleted}
              />
            ))}
          </div>
        </div>
      </DndContext>

      {/* Micro-Explanation Cause-and-Effect Banner */}
      {activeExplanation && (
        <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-xs font-bold text-emerald-950 flex items-start gap-2.5 shadow-sm animate-in fade-in slide-in-from-top-2">
          <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-black uppercase tracking-wider text-emerald-800 block mb-0.5">Cause & Effect Science Concept:</span>
            {activeExplanation}
          </div>
        </div>
      )}

      {feedback && !activeExplanation && (
        <div className={`p-3 rounded-xl text-xs font-bold transition-all ${
          feedback.type === 'success' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
        }`}>
          {feedback.text}
        </div>
      )}
    </div>
  );
}
