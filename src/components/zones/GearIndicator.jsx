import React from 'react';
import { Compass, Flame, Zap, Trophy, CheckCircle2 } from 'lucide-react';

export const GEARS = [
  {
    level: 1,
    name: 'Discovery',
    label_vi: 'Khám Phá',
    icon: Compass,
    color: 'from-blue-500 to-cyan-500',
    border: 'border-cyan-300',
    bg: 'bg-cyan-50 text-cyan-900',
    desc: 'No pressure • Explore story, context & vocabulary'
  },
  {
    level: 2,
    name: 'Practice',
    label_vi: 'Luyện Tập',
    icon: Flame,
    color: 'from-amber-500 to-orange-500',
    border: 'border-amber-300',
    bg: 'bg-amber-50 text-amber-900',
    desc: 'Fast feedback • Build speed & word confidence'
  },
  {
    level: 3,
    name: 'Challenge',
    label_vi: 'Thử Thách',
    icon: Zap,
    color: 'from-purple-600 to-indigo-600',
    border: 'border-purple-300',
    bg: 'bg-purple-50 text-purple-900',
    desc: 'High Focus • No hints • Timed reasoning & problem solving'
  },
  {
    level: 4,
    name: 'Boss Battle',
    label_vi: 'Đấu Trùm',
    icon: Trophy,
    color: 'from-rose-600 to-red-600',
    border: 'border-rose-300',
    bg: 'bg-rose-50 text-rose-900',
    desc: 'Cambridge Exam Condition • Earn Official Flyers Shields'
  }
];

export default function GearIndicator({ currentGear = 1, onSelectGear, completedGears = [] }) {
  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-800 text-white shadow-xl mb-4">
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {GEARS.map((g) => {
          const isActive = currentGear === g.level;
          const isCompleted = completedGears.includes(g.level);
          const Icon = g.icon;

          return (
            <button
              key={g.level}
              type="button"
              onClick={() => onSelectGear && onSelectGear(g.level)}
              className={`flex-1 min-w-[130px] p-2 sm:p-2.5 rounded-xl transition-all flex items-center gap-2 text-left border ${
                isActive
                  ? `bg-gradient-to-r ${g.color} text-white shadow-lg ring-2 ring-white/30 scale-[1.02] border-white/40`
                  : isCompleted
                  ? 'bg-slate-800/80 text-emerald-300 border-emerald-500/40 hover:bg-slate-800'
                  : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-white/25 text-white' : 'bg-slate-700/80 text-slate-300'
                }`}
              >
                {isCompleted && !isActive ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Icon size={16} />}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-80">
                    Gear {g.level}
                  </span>
                </div>
                <div className="text-xs font-black truncate">{g.name}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
