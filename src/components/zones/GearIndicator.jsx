import React from 'react';
import { Film, Headphones, Mic, Globe, CheckCircle2 } from 'lucide-react';

export const STORY_GEARS = [
  {
    level: 1,
    name: '3D Webtoon',
    icon: Film,
    color: 'from-blue-600 to-cyan-600',
    border: 'border-cyan-400',
    bg: 'bg-cyan-50 text-cyan-900',
    desc: 'Explore 5 Pixar scenes • Tap hotspots for instant definitions & audio'
  },
  {
    level: 2,
    name: 'Audio Narration',
    icon: Headphones,
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-400',
    bg: 'bg-amber-50 text-amber-900',
    desc: 'Listen to full story • Tap any sentence to replay audio instantly'
  },
  {
    level: 3,
    name: 'Retell to Nova',
    icon: Mic,
    color: 'from-purple-600 to-indigo-600',
    border: 'border-purple-400',
    bg: 'bg-purple-50 text-purple-900',
    desc: 'Record 30s voice retell • Get instant cheerful mascot feedback'
  },
  {
    level: 4,
    name: 'CLIL Knowledge Explorer',
    icon: Globe,
    color: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-400',
    bg: 'bg-emerald-50 text-emerald-900',
    desc: 'Explore 2 article paragraphs with check questions after each part'
  }
];

export default function GearIndicator({ currentGear = 1, onSelectGear, completedGears = [] }) {
  return (
    <div className="w-full bg-white rounded-2xl p-2 sm:p-2.5 border border-slate-200 text-slate-900 shadow-sm mb-3 font-sans">
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {STORY_GEARS.map((g) => {
          const isActive = currentGear === g.level;
          const isCompleted = completedGears.includes(g.level);
          const Icon = g.icon;

          return (
            <button
              key={g.level}
              type="button"
              onClick={() => onSelectGear && onSelectGear(g.level)}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl border transition-all text-left flex items-center gap-2.5 ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-400 scale-[1.02]'
                  : isCompleted
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'}`}>
                <Icon size={16} />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-black uppercase tracking-wider opacity-75">
                  GEAR {g.level}
                </div>
                <div className="text-xs font-black truncate">
                  {g.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
