import React, { useState, useEffect } from 'react';
import { Sparkles, Gift } from 'lucide-react';
import Confetti from 'react-confetti';
import { useUserStore } from '../../stores/useUserStore';
import { getCollectionById } from '../../data/collectionConfig';
import { getBadgeById } from '../../data/badgeConfig';
import { getAvatarItem } from '../../data/avatarItemConfig';
import { playVictoryFanfare } from '../../utils/soundEffects';

const ACCENT_COLORS = {
  blue: { primary: '#3b82f6', secondary: '#93c5fd', bg: 'bg-blue-500' },
  green: { primary: '#10b981', secondary: '#6ee7b7', bg: 'bg-emerald-500' },
  amber: { primary: '#f59e0b', secondary: '#fcd34d', bg: 'bg-amber-500' },
};

export default function UnboxAnimation({ isOpen, onClose, onOpenCloset }) {
  // Stage transitions: 'hidden' → 'reveal' (after 100ms) → 'done' (after 2500ms).
  // The initial 'hidden' value is correct for the first render. We only need to advance
  // forward when the overlay opens; closing simply hides via the early return.
  const [stage, setStage] = useState('hidden');
  const earnedBadges = useUserStore((s) => s.earnedBadges);
  const avatarItems = useUserStore((s) => s.avatarItems);

  // Find the most recently earned collection badge/avatar item
  const collectionBadges = ['collection_1', 'collection_2', 'collection_3'];
  const recentBadgeId = [...earnedBadges].reverse().find((b) => collectionBadges.includes(b));
  // The store awards kawaii-style ids ('crown', 'hat', 'wand', etc.) — these are also
  // the keys in avatarItemConfig.AVATAR_ITEMS, so look them up directly.
  const recentItemId = [...avatarItems].reverse().find((i) => !!getAvatarItem(i));

  const badge = recentBadgeId ? getBadgeById(recentBadgeId) : null;
  const item = recentItemId ? getAvatarItem(recentItemId) : null;
  const collection = recentBadgeId ? getCollectionById(recentBadgeId) : null;
  const colors = ACCENT_COLORS[collection?.accent] || ACCENT_COLORS.blue;

  useEffect(() => {
    if (!isOpen) return;
    try {
      playVictoryFanfare();
    } catch (_) {}
    const t1 = setTimeout(() => setStage('reveal'), 100);
    const t2 = setTimeout(() => setStage('done'), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {stage !== 'hidden' && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={150}
          recycle={false}
          tweenDuration={4000}
          colors={[colors.primary, colors.secondary, '#fbbf24', '#fff']}
        />
      )}

      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden transition-all duration-500 ${
          stage === 'hidden' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top banner */}
        <div className={`${colors.bg} p-6 text-center text-white`}>
          <div className="text-5xl mb-2">{collection?.icon || '🎁'}</div>
          <h2 className="text-lg font-black">Collection Complete!</h2>
          <p className="text-sm font-semibold text-white/80">Collection Complete</p>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-sm font-black text-slate-700">New Rewards Unlocked</span>
            <Sparkles size={16} className="text-amber-500" />
          </div>

          <div className="flex justify-center gap-6">
            {/* Badge */}
            {badge && (
              <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl ${badge.color} flex items-center justify-center text-3xl shadow-lg mx-auto mb-2`}>
                  {badge.icon}
                </div>
                <p className="text-[11px] font-black text-slate-700">{badge.name}</p>
                <p className="text-[9px] font-semibold text-slate-400">Badge</p>
              </div>
            )}

            {/* Avatar item */}
            {item && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 border-2 border-purple-200 flex items-center justify-center text-3xl shadow-lg mx-auto mb-2 animate-bounce">
                  {item.icon}
                </div>
                <p className="text-[11px] font-black text-slate-700">{item.name}</p>
                <p className="text-[9px] font-semibold text-slate-400">Avatar Item</p>
              </div>
            )}
          </div>

          {/* Collection name */}
          {collection && (
            <p className="text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
              {collection.theme}
            </p>
          )}

          {/* CTA */}
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-200 transition-colors"
            >
              Continue
            </button>
            <button
              onClick={() => { onClose(); setTimeout(() => onOpenCloset?.(), 300); }}
              className="px-5 py-2.5 bg-indigo-500 text-white rounded-xl font-black text-xs hover:bg-indigo-600 transition-colors shadow-md flex items-center gap-1.5"
            >
              <Gift size={14} />
              View Closet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
