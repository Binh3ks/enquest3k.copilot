import React, { useState, useEffect } from 'react';
import { Award, Compass, Microscope, Globe, BookOpen, Sparkles, CheckCircle2, Lock, Star, ChevronRight, Zap } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { speakText } from '../../utils/AudioHelper';

export const CLIL_STAMPS = {
  science: {
    id: 'science',
    title: 'Science Explorer',
    subject: 'Science Lab',
    levelTitle: 'Physics & Forces Master',
    icon: Microscope,
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-400',
    glowColor: 'shadow-emerald-500/30',
    ringColor: 'ring-emerald-400/50',
    textColor: 'text-emerald-950',
    badgeBg: 'bg-emerald-600 text-white',
    stampText: 'VERIFIED · SCIENCE LAB',
    desc: 'Mastered principles of friction, forces, momentum & laboratory safety.'
  },
  math: {
    id: 'math',
    title: 'Math Genius',
    subject: 'Singapore Math',
    levelTitle: 'Bar Model Tactician',
    icon: Compass,
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-400',
    glowColor: 'shadow-blue-500/30',
    ringColor: 'ring-blue-400/50',
    textColor: 'text-blue-950',
    badgeBg: 'bg-blue-600 text-white',
    stampText: 'VERIFIED · MATH GENIUS',
    desc: 'Visualised multi-step bar models and mastered speed, distance & time.'
  },
  history: {
    id: 'history',
    title: 'Time Explorer',
    subject: 'World History',
    levelTitle: 'Chronicle Historian',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-400',
    glowColor: 'shadow-amber-500/30',
    ringColor: 'ring-amber-400/50',
    textColor: 'text-amber-950',
    badgeBg: 'bg-amber-600 text-white',
    stampText: 'VERIFIED · WORLD HISTORY',
    desc: 'Uncovered authentic history, ancient Olympic truces and world civilizations.'
  },
  geography: {
    id: 'geography',
    title: 'Global Explorer',
    subject: 'World Horizon',
    levelTitle: 'Global Expeditionist',
    icon: Globe,
    color: 'from-purple-500 to-fuchsia-600',
    borderColor: 'border-purple-400',
    glowColor: 'shadow-purple-500/30',
    ringColor: 'ring-purple-400/50',
    textColor: 'text-purple-950',
    badgeBg: 'bg-purple-600 text-white',
    stampText: 'VERIFIED · GLOBAL CULTURE',
    desc: 'Traversed world geography, Rift Valley marathons and global cultures.'
  }
};

/**
 * CLILSealStamp — 3D Embossed Seal Stamp Graphic
 * Renders an authentic wax/passport 3D embossed stamp seal (matching user's design image).
 */
export function CLILSealStamp({
  stampId = 'science',
  level = 1,
  size = 'lg', // 'sm' | 'md' | 'lg'
  onClick = null,
  className = ''
}) {
  const stamp = CLIL_STAMPS[stampId] || CLIL_STAMPS.science;
  const Icon = stamp.icon;

  if (size === 'sm') {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center justify-center cursor-pointer select-none transition hover:scale-105 active:scale-95 ${className}`}
        title={`${stamp.subject} Stamp (Level ${level})`}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 via-teal-500 to-emerald-800 p-0.5 shadow-[0_3px_8px_rgba(16,185,129,0.4)] relative ring-2 ring-emerald-400/40 flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-dashed border-white/70 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700 shadow-inner">
            <Icon size={13} className="text-white drop-shadow-xs" />
            <span className="text-[6px] font-black text-white leading-none mt-0.5">LV.{level}</span>
          </div>
        </div>
      </div>
    );
  }

  // Large 3D Embossed Stamp (Laptop / Sidebar / Modal)
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      {/* 3D Embossed Outer Metallic Ring */}
      <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-emerald-300 via-teal-500 to-emerald-800 p-1.5 flex flex-col items-center justify-center shadow-[0_16px_36px_rgba(16,185,129,0.35),0_6px_16px_rgba(0,0,0,0.15),inset_0_3px_6px_rgba(255,255,255,0.8),inset_0_-4px_6px_rgba(0,0,0,0.3)] relative ring-4 ring-emerald-400/40">
        
        {/* Middle Ring with Dark Teal Contrast */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-1.5 flex flex-col items-center justify-center shadow-inner relative">
          
          {/* Inner Dashed Stamp Seal */}
          <div className="w-full h-full rounded-full border-2 border-dashed border-emerald-200/80 flex flex-col items-center justify-center p-2.5 text-center bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 shadow-[inset_0_4px_12px_rgba(0,0,0,0.25)] relative overflow-hidden">
            
            {/* Top Gloss Shimmer */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/30 rounded-full blur-md pointer-events-none" />

            {/* Subject Icon */}
            <Icon size={34} className="text-white mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
            
            {/* Subject Header */}
            <span className="text-[10.5px] font-black uppercase tracking-widest text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              {stamp.subject}
            </span>
            
            {/* Middle White Embossed 3D Badge */}
            <div className="my-1.5 px-3 py-1 bg-white text-slate-950 rounded-xl text-[10.5px] font-black tracking-wider uppercase shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center gap-1 border border-slate-100">
              <span>LV. {level} VERIFIED</span>
              <span className="text-emerald-600 font-black">✓</span>
            </div>
            
            {/* Bottom Stamp Label */}
            <span className="text-[8.5px] font-black tracking-wider text-emerald-100 uppercase drop-shadow-xs">
              ENGQUEST CLIL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * SingleSubjectPassportSidebar — Laptop/Tablet dedicated left sidebar.
 * Displays the big, impressive 3D stamp, level title, and progress.
 */
export function SingleSubjectPassportSidebar({
  currentSubject = 'science',
  level = 1,
  onSelectStamp
}) {
  const stamp = CLIL_STAMPS[currentSubject] || CLIL_STAMPS.science;

  return (
    <aside className="w-56 shrink-0 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xl space-y-3.5 font-sans text-slate-900 text-center flex flex-col items-center">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-black border border-emerald-200 shadow-2xs">
        <span>🛂</span>
        <span className="uppercase tracking-wider">CLIL Passport Stamp</span>
      </div>

      {/* Big 3D Embossed Stamp */}
      <div className="py-2">
        <CLILSealStamp
          stampId={currentSubject}
          level={level}
          size="lg"
          onClick={() => onSelectStamp && onSelectStamp(currentSubject)}
        />
      </div>

      {/* Stamp Details */}
      <div className="space-y-1 w-full">
        <div className="text-sm font-black text-slate-900">
          {stamp.title}
        </div>
        <p className="text-[11px] text-emerald-700 font-bold">
          {stamp.levelTitle}
        </p>
        <p className="text-[10px] text-slate-500 leading-relaxed pt-0.5">
          {stamp.desc}
        </p>
      </div>

      {/* Interactive Stamp CTA */}
      <button
        type="button"
        onClick={() => onSelectStamp && onSelectStamp(currentSubject)}
        className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
      >
        <span>View Passport Details 🛂</span>
      </button>
    </aside>
  );
}

/**
 * PassportRackSidebar — Game-style vertical passport stamps rack on the left sidebar.
 * Displays 4 subject stamps with dynamic level badges, game borders, and level progress.
 */
export function PassportRackSidebar({
  currentSubject = 'science',
  earnedStamps = { science: 1, math: 1, history: 0, geography: 0 },
  onSelectStamp
}) {
  return (
    <aside className="w-full md:w-56 shrink-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-3 rounded-3xl border-2 border-indigo-500/30 shadow-xl space-y-3 font-sans text-white">
      {/* Rack Header */}
      <div className="flex items-center justify-between px-1 pb-2 border-b border-indigo-800/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
            🛂
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              CLIL Passports
            </h4>
            <span className="text-[9.5px] font-bold text-indigo-300">
              4 Subject Badges
            </span>
          </div>
        </div>
      </div>

      {/* 4 Game Stamps Vertical List */}
      <div className="space-y-2.5">
        {Object.values(CLIL_STAMPS).map((stamp) => {
          const Icon = stamp.icon;
          const level = earnedStamps[stamp.id] || (stamp.id === 'science' ? 1 : 0);
          const isEarned = level > 0;
          const isCurrent = currentSubject === stamp.id;

          return (
            <div
              key={stamp.id}
              onClick={() => onSelectStamp && onSelectStamp(stamp.id)}
              className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer group relative overflow-hidden ${
                isCurrent
                  ? 'bg-indigo-900/60 border-amber-400 shadow-lg ring-2 ring-amber-400/40 scale-[1.02]'
                  : isEarned
                  ? 'bg-slate-800/60 border-indigo-400/40 hover:border-indigo-300 hover:bg-slate-800'
                  : 'bg-slate-900/40 border-slate-700/50 opacity-60 grayscale hover:opacity-80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {/* Circular Stamp Seal Icon */}
                <div
                  className={`w-11 h-11 rounded-full p-0.5 border-2 ${
                    isEarned ? stamp.borderColor : 'border-slate-600'
                  } flex items-center justify-center shrink-0 shadow-md relative`}
                >
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${
                      isEarned ? stamp.color : 'from-slate-800 to-slate-700'
                    } flex items-center justify-center text-white border border-dashed border-white/50`}
                  >
                    <Icon size={18} />
                  </div>
                  {isEarned && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[9px] font-black shadow-xs">
                      ✓
                    </span>
                  )}
                </div>

                {/* Stamp Details & Level */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-white truncate block">
                      {stamp.subject}
                    </span>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                        isEarned
                          ? 'bg-amber-400 text-slate-950 shadow-2xs'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {isEarned ? `LV. ${level}` : 'LOCK 🔒'}
                    </span>
                  </div>

                  <span className="text-[9.5px] font-bold text-indigo-300 block truncate">
                    {stamp.title}
                  </span>

                  {/* Level Progress Indicator */}
                  <div className="mt-1 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
                    <div
                      className={`h-full bg-gradient-to-r ${stamp.color} rounded-full`}
                      style={{ width: isEarned ? `${Math.min(100, level * 50)}%` : '10%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Level Up Tip */}
      <div className="p-2 bg-indigo-900/40 rounded-xl border border-indigo-700/30 text-[10px] text-indigo-200 text-center font-bold">
        ⚡ Complete weekly CLIL quests to level up your stamps!
      </div>
    </aside>
  );
}

/**
 * GrandStampModal — Dramatic full-screen celebration modal with heavy slam stamp animation.
 */
export function GrandStampModal({ stampId = 'science', isOpen = false, level = 1, onClose }) {
  const [isStamped, setIsStamped] = useState(false);
  const stamp = CLIL_STAMPS[stampId] || CLIL_STAMPS.science;
  const Icon = stamp.icon;

  useEffect(() => {
    if (isOpen) {
      setIsStamped(false);
      // Trigger slam animation after 250ms
      const timer = setTimeout(() => {
        setIsStamped(true);
        fireCelebrationConfetti('CLIL_Stamp_Awarded');
        speakText(`Congratulations! You leveled up your ${stamp.subject} Passport to Level ${level}!`);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, stampId, level]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative overflow-hidden text-white">
        {/* Shimmer glow */}
        <div className="absolute inset-0 bg-radial from-amber-400/20 via-transparent to-transparent pointer-events-none" />

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles size={14} /> CLIL PASSPORT UPGRADED!
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-amber-300">
            {stamp.title} · LV. {level}
          </h3>
          <p className="text-xs text-indigo-200 font-medium">
            {stamp.desc}
          </p>
        </div>

        {/* Circular Stamp Graphic with Slam Animation */}
        <div className="relative py-6 px-4 bg-slate-950/60 rounded-2xl border-2 border-dashed border-indigo-400/40 min-h-[190px] flex items-center justify-center">
          <div
            className={`transition-all duration-300 transform ${
              isStamped
                ? 'scale-100 rotate-[-6deg] opacity-100 shadow-2xl'
                : 'scale-[2.5] rotate-12 opacity-0'
            }`}
          >
            <div className={`w-40 h-40 rounded-full border-4 ${stamp.borderColor} bg-slate-900/90 p-2 flex flex-col items-center justify-center shadow-2xl relative ring-4 ${stamp.ringColor}`}>
              {/* Inner serrated circular seal */}
              <div className={`w-full h-full rounded-full border-2 border-dashed ${stamp.borderColor} flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br ${stamp.color}`}>
                <Icon size={34} className="text-white mb-0.5" />
                <span className="text-[10px] font-black uppercase tracking-wider text-white leading-tight">
                  {stamp.subject}
                </span>
                <div className="my-1 px-2.5 py-0.5 bg-white text-slate-950 rounded-md text-[9.5px] font-black tracking-widest uppercase shadow-xs">
                  LV. {level} VERIFIED ✓
                </div>
                <span className="text-[8px] font-black text-white/90">ENGQUEST CLIL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Pills */}
        <div className="flex items-center justify-center gap-3">
          <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-black text-xs rounded-xl shadow-xs">
            ⭐ +50 XP
          </span>
          <span className="px-4 py-2 bg-amber-400/20 border border-amber-400 text-amber-300 font-black text-xs rounded-xl shadow-xs">
            🏆 Stamp Rank Up
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-sm shadow-xl active:scale-98 transition flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={18} /> Equip Stamp & Continue ▶
        </button>
      </div>
    </div>
  );
}

export default PassportRackSidebar;
