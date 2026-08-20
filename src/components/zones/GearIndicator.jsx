import React from 'react';
import { Film, Headphones, Mic, Globe, CheckCircle2 } from 'lucide-react';

export const STORY_GEARS = [
  {
    level: 1,
    name: 'Scene Scroll',
    icon: Film,
    activeBg: 'bg-cyan-500 text-slate-950 border-cyan-400 ring-2 ring-cyan-300 scale-[1.02]',
    inactiveBg: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border-cyan-200',
    iconActive: 'bg-slate-950 text-cyan-300',
    iconInactive: 'bg-cyan-200 text-cyan-900',
    desc: 'Explore 5 Pixar scenes • Tap hotspots for instant definitions & audio'
  },
  {
    level: 2,
    name: 'Echo Drill',
    icon: Headphones,
    activeBg: 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-300 scale-[1.02]',
    inactiveBg: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200',
    iconActive: 'bg-slate-950 text-amber-300',
    iconInactive: 'bg-amber-200 text-amber-900',
    desc: 'Shadowing drill • Listen sentence by sentence, then record your own voice'
  },
  {
    level: 3,
    name: "Nova's Story Pit",
    icon: Mic,
    activeBg: 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-300 scale-[1.02]',
    inactiveBg: 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200',
    iconActive: 'bg-purple-950 text-amber-300',
    iconInactive: 'bg-purple-200 text-purple-900',
    desc: 'Retell the story to Nova step-by-step • Instant voice feedback'
  },
  {
    level: 4,
    name: 'Lab Briefing',
    icon: Globe,
    activeBg: 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-300 scale-[1.02]',
    inactiveBg: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200',
    iconActive: 'bg-emerald-950 text-emerald-300',
    iconInactive: 'bg-emerald-200 text-emerald-900',
    desc: 'CLIL world knowledge briefing • Answer 3 check questions per section'
  }
];

export default function GearIndicator({ currentGear = 1, onSelectGear, completedGears = [] }) {
  return (
    <div className="w-full bg-slate-100/90 rounded-2xl p-2 sm:p-2.5 border border-slate-200 text-slate-900 shadow-inner mb-3 font-sans">
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
                  ? g.activeBg
                  : isCompleted
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300 font-black'
                  : g.inactiveBg
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? g.iconActive : g.iconInactive}`}>
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
