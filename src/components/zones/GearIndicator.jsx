import React from 'react';
import { Film, Headphones, Mic, Globe, CheckCircle2 } from 'lucide-react';

export const STORY_GEARS = [
  {
    level: 1,
    name: '3D Webtoon',
    label_vi: 'Tranh 3D & Từ Vựng',
    icon: Film,
    color: 'from-blue-600 to-cyan-600',
    border: 'border-cyan-400',
    bg: 'bg-cyan-50 text-cyan-900',
    desc: 'Explore 5 Pixar scenes • Tap hotspots for instant definitions & audio'
  },
  {
    level: 2,
    name: 'Audio Narration',
    label_vi: 'Nghe Tường Thuật',
    icon: Headphones,
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-400',
    bg: 'bg-amber-50 text-amber-900',
    desc: 'Listen to full story • Tap any sentence to replay audio instantly'
  },
  {
    level: 3,
    name: 'Retell to Nova',
    label_vi: 'Kể Lại Cho Nova',
    icon: Mic,
    color: 'from-purple-600 to-indigo-600',
    border: 'border-purple-400',
    bg: 'bg-purple-50 text-purple-900',
    desc: 'Record 30s voice retell • Get instant cheerful mascot feedback'
  },
  {
    level: 4,
    name: 'CLIL Science',
    label_vi: 'Khoa Học Thực Tế',
    icon: Globe,
    color: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-400',
    bg: 'bg-emerald-50 text-emerald-900',
    desc: 'Read science article • 3 inference questions • Grammar X-Ray'
  }
];

export default function GearIndicator({ currentGear = 1, onSelectGear, completedGears = [] }) {
  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-800 text-white shadow-xl mb-4">
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
              className={`flex-1 min-w-[140px] p-2.5 rounded-xl transition-all flex items-center gap-2.5 text-left border ${
                isActive
                  ? `bg-gradient-to-r ${g.color} text-white shadow-lg ring-2 ring-white/30 scale-[1.02] border-white/40`
                  : isCompleted
                  ? 'bg-slate-800/90 text-emerald-300 border-emerald-500/40 hover:bg-slate-800'
                  : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-white/25 text-white shadow-inner' : 'bg-slate-700/80 text-slate-300'
                }`}
              >
                {isCompleted && !isActive ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Icon size={16} />}
              </div>
              <div className="truncate">
                <span className="text-[10px] font-black uppercase tracking-wider opacity-80 block">
                  Gear {g.level}
                </span>
                <div className="text-xs font-black truncate">{g.name}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
