import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { ArrowLeft, Shield, Star } from 'lucide-react';

const SHIELD_PARTS = [
  { key: 'L1', label: 'Listening Shield', icon: '🎧', color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { key: 'R1', label: 'Reading & Writing Shield', icon: '📖', color: 'bg-violet-100 text-violet-700 border-violet-200' },
  { key: 'S1', label: 'Speaking & Passport', icon: '🏆', color: 'bg-amber-100 text-amber-700 border-amber-200' },
];

const TOTAL_TRIPS = 36;

function ShieldPips({ count, max = 5 }) {
  return (
    <div className="flex gap-1 mt-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full border-2 transition-colors ${
            i < count
              ? 'bg-amber-400 border-amber-500 shadow-sm'
              : 'bg-slate-100 border-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function PassportTracker() {
  const navigate = useNavigate();
  const currentUser = useUserStore(s => s.currentUser);
  const highestShieldScores = useUserStore(s => s.highestShieldScores) || {};
  const uid = currentUser?.id;

  const userShields = uid ? (highestShieldScores[uid] || {}) : {};

  // Build week-by-week matrix
  const weeks = useMemo(() => {
    return Array.from({ length: TOTAL_TRIPS }, (_, i) => {
      const weekNum = i + 1;
      const parts = SHIELD_PARTS.map(p => {
        // Shield score ID format: w{weekNumber}_{shieldPart}_{userId}
        const key = Object.keys(userShields).find(k =>
          k.includes(`w${weekNum}_`) && k.includes(`_${p.key}`)
        );
        const record = key ? userShields[key] : null;
        return { ...p, shields: record?.shields || 0 };
      });
      const totalShields = parts.reduce((acc, p) => acc + p.shields, 0);
      return { weekNum, parts, totalShields };
    });
  }, [userShields]);

  const completedWeeks = weeks.filter(w => w.totalShields >= 10).length;
  const totalEarned = weeks.reduce((acc, w) => acc + w.totalShields, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm sticky top-0 z-40">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Cambridge Progress</p>
          <h1 className="text-base font-black text-slate-800">🛡️ Passport Tracker</h1>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xs font-black text-emerald-600">{totalEarned} shields</div>
          <div className="text-[10px] text-slate-400">{completedWeeks}/{TOTAL_TRIPS} trips complete</div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
        {/* Summary Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-emerald-100 shadow-sm p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-100 flex items-center justify-center text-xl sm:text-2xl">🛡️</div>
          <div>
            <div className="font-black text-slate-800 text-base sm:text-lg">{totalEarned} / {TOTAL_TRIPS * 15} Shields</div>
            <div className="text-[11px] sm:text-xs text-slate-500">Cambridge A2 Flyers Practice — 3 shields × 5 parts × {TOTAL_TRIPS} trips</div>
            <div className="flex gap-2 mt-1">
              {SHIELD_PARTS.map(p => {
                const earned = weeks.reduce((acc, w) => acc + (w.parts.find(x => x.key === p.key)?.shields || 0), 0);
                return (
                  <span key={p.key} className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${p.color}`}>
                    {p.icon} {earned}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Week Grid */}
        {weeks.map(({ weekNum, parts, totalShields }) => {
          const hasAny = totalShields > 0;
          return (
            <div
              key={weekNum}
              className={`bg-white rounded-xl sm:rounded-2xl border-2 shadow-sm p-3 sm:p-4 transition-all ${
                hasAny ? 'border-emerald-200' : 'border-slate-100 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-black text-slate-800 text-sm">Trip {weekNum}</span>
                  {totalShields >= 10 && (
                    <span className="ml-2 text-[10px] font-black bg-amber-400 text-white rounded-full px-2 py-0.5">
                      ⭐ COMPLETE
                    </span>
                  )}
                </div>
                <span className="text-xs font-black text-slate-500">{totalShields}/15 shields</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {parts.map(part => (
                  <div
                    key={part.key}
                    className={`rounded-xl border p-2 ${part.color}`}
                  >
                    <div className="text-xs font-black">{part.icon} {part.key}</div>
                    <div className="text-[10px] mb-1 text-current opacity-70">{part.label}</div>
                    <ShieldPips count={part.shields} />
                    <div className="text-[10px] font-black mt-1">{part.shields}/5</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA if no data */}
        {totalEarned === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🛡️</div>
            <p className="font-black text-slate-700">No shields yet!</p>
            <p className="text-sm text-slate-500 mb-4">Complete Boss Battles to earn Cambridge shields.</p>
            <button
              onClick={() => navigate('/week/33/hub/1')}
              className="bg-emerald-500 text-white font-black rounded-xl px-6 py-3 hover:bg-emerald-600 transition-colors"
            >
              Go to Trip 33 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
