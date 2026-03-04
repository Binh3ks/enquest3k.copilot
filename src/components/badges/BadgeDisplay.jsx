/**
 * BadgeDisplay Component
 * 
 * Shows user's earned badges with visual indicators
 */
import React from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { getBadgeDisplay, getAllBadges } from '../../data/badgeConfig';

const BadgeDisplay = ({ compact = false, language = 'en' }) => {
  const earnedBadges = useUserStore(state => state.earnedBadges);
  const allBadges = getAllBadges();

  if (compact) {
    // Compact view - show only earned badges count
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="font-bold text-slate-600">🏆 Badges:</span>
        <span className="font-black text-indigo-600">{earnedBadges.length}/{allBadges.length}</span>
      </div>
    );
  }

  // Full view - show all badges with earned status
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
        Achievements
      </div>
      <div className="grid grid-cols-2 gap-2">
        {allBadges.map(badge => {
          const isEarned = earnedBadges.includes(badge.id);
          const display = getBadgeDisplay(badge.id, isEarned, language);
          
          return (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border-2 transition-all ${
                isEarned 
                  ? `${badge.color} border-transparent text-white shadow-md` 
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
              title={display.requirement}
            >
              <div className="text-2xl mb-1 text-center">{badge.icon}</div>
              <div className={`text-[9px] font-bold text-center leading-tight ${isEarned ? 'opacity-100' : 'opacity-50'}`}>
                {display.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeDisplay;
