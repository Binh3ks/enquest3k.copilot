import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function WordBlock({ id, word, isPlaced, onClick, disabled }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: id,
      disabled: disabled
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms ease',
    opacity: isDragging ? 0.4 : 1,
    touchAction: 'none' // Essential for dnd-kit touch sensor
  };

  const isPunctuation = /^[.,!?:;]$/.test(word);

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        // Tap-to-place fallback support
        if (onClick) onClick(id, word);
      }}
      disabled={disabled}
      type="button"
      className={`
        inline-flex items-center justify-center font-bold rounded-xl transition-all shadow-md select-none active:scale-95 cursor-grab active:cursor-grabbing
        ${isPunctuation ? 'px-3 py-2 text-xl bg-amber-500 text-white min-w-[44px] min-h-[44px]' : 'px-4 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white min-w-[54px] min-h-[44px]'}
        ${isPlaced ? 'border-2 border-indigo-400 bg-indigo-700' : ''}
        ${isDragging ? 'z-50 shadow-2xl ring-4 ring-yellow-400 scale-105' : ''}
      `}
      aria-label={`Word block ${word}`}
    >
      {word}
    </button>
  );
}
