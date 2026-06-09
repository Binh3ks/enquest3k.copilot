import React from 'react';
import { CardIcon } from '../../data/cardIconLibrary';
import { Lock } from 'lucide-react';

const RARITY_STYLES = {
  common: {
    border: 'border-slate-300',
    bg: 'bg-gradient-to-br from-white via-slate-50 to-slate-100',
    ribbon: 'bg-slate-400',
    glow: '',
    label: 'Common',
  },
  rare: {
    border: 'border-amber-400',
    bg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50',
    ribbon: 'bg-gradient-to-r from-amber-400 to-yellow-500',
    glow: 'shadow-amber-200/50 shadow-xl',
    label: 'Rare',
  },
};

/**
 * <TradingCard card={...} collection={...} earned={true|false} size="sm|md|lg" />
 */
export default function TradingCard({ card, collection, earned = false, size = 'md' }) {
  const styles = RARITY_STYLES[card.rarity] || RARITY_STYLES.common;
  const accent = collection?.accent || 'sky';
  const dims = { sm: 'w-20 h-28', md: 'w-36 h-52', lg: 'w-44 h-64' };
  const iconDims = { sm: 64, md: 120, lg: 150 };
  const titleDims = { sm: 'text-[7px]', md: 'text-[10px]', lg: 'text-xs' };
  const weekDims = { sm: 'text-[8px]', md: 'text-xs', lg: 'text-sm' };

  if (!earned) {
    return (
      <div className={`${dims[size]} ${styles.bg} rounded-xl border-2 ${styles.border} flex flex-col items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-slate-200/60" />
        <Lock size={size === 'sm' ? 14 : 24} className="text-slate-400 mb-1" />
        <div className={`${weekDims[size]} font-black text-slate-400`}>W{card.weekNumber || '?'}</div>
      </div>
    );
  }

  return (
    <div
      className={`${dims[size]} ${styles.bg} rounded-xl border-2 ${styles.border} ${styles.glow} flex flex-col items-center justify-between relative overflow-hidden transition-transform hover:scale-105 hover:-translate-y-1 cursor-pointer`}
    >
      {/* Rarity ribbon */}
      <div className={`absolute top-0 left-0 right-0 ${styles.ribbon} text-white text-center ${titleDims[size]} font-black py-0.5 z-10`}>
        {card.rarity === 'rare' ? '★ RARE ★' : collection?.theme?.toUpperCase().slice(0, 10) || 'COMMON'}
      </div>

      {/* Holo shine for rare */}
      {card.rarity === 'rare' && (
        <div className="absolute inset-0 pointer-events-none z-20"
             style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)', animation: 'shine 3s linear infinite' }} />
      )}

      {/* Icon */}
      <div className="flex-1 flex items-center justify-center w-full pt-3">
        <CardIcon iconId={card.iconId} size={iconDims[size]} accent={accent} />
      </div>

      {/* Footer */}
      <div className={`w-full text-center ${titleDims[size]} font-black text-slate-700 pb-1 px-1`}>
        {card.rarity === 'rare' ? 'BONUS' : `Week ${card.weekNumber}`}
      </div>
    </div>
  );
}
