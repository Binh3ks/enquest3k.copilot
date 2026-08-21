import React, { useState, useEffect } from 'react';
import { Award, Compass, Microscope, Globe, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { speakText } from '../../utils/AudioHelper';

export const CLIL_STAMPS = {
  science: { id: 'science', title: 'Science Lab Badge', subject: 'Science', icon: Microscope, color: 'bg-emerald-500 text-white', accent: 'emerald', stampText: 'PASSED · SCIENCE LAB' },
  math: { id: 'math', title: 'Math Genius Badge', subject: 'Math', icon: Compass, color: 'bg-indigo-500 text-white', accent: 'indigo', stampText: 'PASSED · SINGAPORE MATH' },
  history: { id: 'history', title: 'History Time Explorer', subject: 'History', icon: BookOpen, color: 'bg-amber-500 text-slate-950', accent: 'amber', stampText: 'PASSED · WORLD HISTORY' },
  geography: { id: 'geography', title: 'Global World Explorer', subject: 'Geography', icon: Globe, color: 'bg-purple-500 text-white', accent: 'purple', stampText: 'PASSED · GLOBAL CULTURE' }
};

/**
 * CompactPassportBadge — Small badge displayed on the left/header of the CLIL station (Zero-Scroll layout).
 */
export function CompactPassportBadge({ stampId = 'science', isEarned = false, onClick }) {
  const stamp = CLIL_STAMPS[stampId] || CLIL_STAMPS.science;
  const Icon = stamp.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all shadow-2xs hover:scale-105 ${
        isEarned
          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
      title="Click to view CLIL Passport status"
    >
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs ${stamp.color}`}>
        <Icon size={14} />
      </div>
      <div className="text-left">
        <span className="text-[11px] font-black uppercase tracking-wider block">
          {stamp.subject} Passport
        </span>
        <span className={`text-[10px] font-bold ${isEarned ? 'text-emerald-700' : 'text-slate-400'}`}>
          {isEarned ? 'PASSED STAMP ✓' : 'READY TO EARN ⚡'}
        </span>
      </div>
    </button>
  );
}

/**
 * GrandStampModal — Dramatic full-screen celebration modal with heavy slam stamp animation.
 */
export function GrandStampModal({ stampId = 'science', isOpen = false, onClose }) {
  const [isStamped, setIsStamped] = useState(false);
  const stamp = CLIL_STAMPS[stampId] || CLIL_STAMPS.science;
  const Icon = stamp.icon;

  useEffect(() => {
    if (isOpen) {
      setIsStamped(false);
      // Trigger slam animation after 300ms
      const timer = setTimeout(() => {
        setIsStamped(true);
        fireCelebrationConfetti('CLIL_Stamp_Awarded');
        speakText("Congratulations! You earned the Science Explorer Stamp!");
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-amber-50 via-white to-orange-50 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Shimmer background */}
        <div className="absolute inset-0 bg-radial from-amber-200/30 to-transparent pointer-events-none" />

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/90 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles size={14} /> CLIL Knowledge Passport
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
            PASSPORT STAMP UNLOCKED!
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            You mastered the CLIL article and check comprehension questions!
          </p>
        </div>

        {/* Passport Stamp Card Container */}
        <div className="relative py-6 px-4 bg-amber-100/50 rounded-2xl border-2 border-dashed border-amber-300 min-h-[160px] flex items-center justify-center">
          {/* Stamp Graphic with Slam Animation */}
          <div
            className={`transition-all duration-300 transform ${
              isStamped
                ? 'scale-100 rotate-[-6deg] opacity-100 shadow-2xl'
                : 'scale-[2.5] rotate-12 opacity-0'
            }`}
          >
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-emerald-600 bg-emerald-50/90 p-2 flex flex-col items-center justify-center shadow-lg relative ring-4 ring-emerald-400/40">
              {/* Outer serrated ring */}
              <div className="w-full h-full rounded-full border-2 border-dashed border-emerald-600 flex flex-col items-center justify-center p-2 text-center">
                <Icon size={32} className="text-emerald-700 mb-1" />
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 leading-tight">
                  {stamp.title}
                </span>
                <div className="my-1 px-2 py-0.5 bg-emerald-600 text-white rounded text-[9px] font-black tracking-widest uppercase">
                  VERIFIED STAMP ✓
                </div>
                <span className="text-[8px] font-black text-emerald-700">ENGQUEST CLIL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Pills */}
        <div className="flex items-center justify-center gap-3">
          <span className="px-4 py-2 bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-xs rounded-xl shadow-xs">
            ⭐ +50 XP
          </span>
          <span className="px-4 py-2 bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs rounded-xl shadow-xs">
            🛂 Stamp Collected
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl active:scale-98 transition flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={18} /> Claim Stamp & Continue ▶
        </button>
      </div>
    </div>
  );
}

export default CompactPassportBadge;
