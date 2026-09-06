/**
 * CollectorPopup.jsx — The Lexio Chronicles Hidden Collectible Modal
 *
 * Triggered after clearing a Daily Room (all 3 doors with high rating).
 * Awards the day's unique collectible artifact + 5 bonus Lexio Coins.
 */

import React, { useEffect, useState } from 'react';
import useChroniclesStore from '../../stores/useChroniclesStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { Sparkles, Trophy, Check, Gift } from 'lucide-react';

const COLLECTIBLE_DEFS = [
  {
    icon: '📖',
    name: 'Chronicle Tome Fragment',
    zone: 'Story World',
    desc: 'An ancient illuminated page recording the genesis of the Lexio realms.',
  },
  {
    icon: '🔬',
    name: "Alchemist's Lens",
    zone: 'Knowledge Lab',
    desc: 'A luminous crystal lens that reveals hidden scientific patterns.',
  },
  {
    icon: '⚔️',
    name: "Gladiator's Crest",
    zone: 'Battle Arena',
    desc: 'A forged titanium badge proving linguistic reflexes in the arena.',
  },
  {
    icon: '✍️',
    name: 'Quill of Eternity',
    zone: 'Creator Studio',
    desc: 'A mythical quill infused with timeless storytelling ink.',
  },
  {
    icon: '👑',
    name: 'Sovereign Sigil',
    zone: 'Boss Castle',
    desc: 'The royal seal of mastery granting audience with the Chapter Guardian.',
  },
];

export default function CollectorPopup({ weekId, dayIndex = 0, onClose }) {
  const { markCollectibleFound, addBonusCoins, isCollectibleFound } = useChroniclesStore();
  const [collected, setCollected] = useState(false);

  const collectible = COLLECTIBLE_DEFS[dayIndex] || COLLECTIBLE_DEFS[0];
  const alreadyOwned = isCollectibleFound(weekId, dayIndex);

  useEffect(() => {
    try {
      fireCelebrationConfetti();
    } catch (_) {}
  }, []);

  const handleClaim = () => {
    if (!collected) {
      markCollectibleFound(weekId, dayIndex);
      addBonusCoins(5);
      setCollected(true);
      try {
        fireCelebrationConfetti();
      } catch (_) {}
    }
    setTimeout(() => {
      onClose && onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-amber-500/20 text-center overflow-hidden">
        {/* Glow halo */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hidden Chamber Treasure</span>
        </div>

        {/* Artifact Icon */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-400/20 to-purple-600/30 border border-amber-300/40 flex items-center justify-center text-5xl sm:text-6xl shadow-inner animate-bounce">
            {collectible.icon}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight mb-1">
          {collectible.name}
        </h3>
        <p className="text-xs text-indigo-300 font-semibold mb-2">
          {collectible.zone} • Day {dayIndex + 1}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed mb-6 px-2">
          {collectible.desc}
        </p>

        {/* Reward Pill */}
        <div className="bg-slate-800/80 border border-amber-400/30 rounded-2xl py-3 px-4 mb-6 flex items-center justify-center gap-3">
          <Gift className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-bold text-amber-200">
            {alreadyOwned ? 'Artifact Collected' : '+5 Bonus Lexio Coins 🪙'}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClaim}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {collected || alreadyOwned ? (
            <>
              <Check className="w-5 h-5" />
              <span>Claimed! Continue</span>
            </>
          ) : (
            <>
              <Trophy className="w-5 h-5" />
              <span>Claim Artifact & Coins</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
