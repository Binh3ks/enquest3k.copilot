/**
 * MascotShopPanel.jsx — The Lexio Chronicles Mascot Boutique
 *
 * Lets students spend Lexio Coins earned from mini-games and boss gauntlets
 * to purchase and equip Nova mascot cosmetics. Bridges into useUserStore inventory.
 */

import React, { useState } from 'react';
import useChroniclesStore from '../../stores/useChroniclesStore';
import { useUserStore } from '../../stores/useUserStore';
import {
  MASCOT_ITEMS_TIER1,
  MASCOT_ITEMS_TIER2,
  MASCOT_ITEMS_TIER3,
} from '../../components/mascot/NovaMascotStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { ShoppingBag, Sparkles, Check, Lock, Coins, Shirt, CheckCircle2 } from 'lucide-react';

const ALL_COSMETICS = [
  ...MASCOT_ITEMS_TIER1,
  ...MASCOT_ITEMS_TIER2,
  ...MASCOT_ITEMS_TIER3,
];

const TIER_LABELS = {
  1: { label: 'Starter', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  2: { label: 'Advanced', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  3: { label: 'Elite', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
};

export default function MascotShopPanel({ weekNumber = 33 }) {
  const lexioCoins = useChroniclesStore((s) => s.lexioCoins || 0);
  const purchaseMascotItem = useChroniclesStore((s) => s.purchaseMascotItem);

  const purchasedNovaItems = useUserStore((s) => s.purchasedNovaItems || ['headphones']);
  const equippedNovaGear = useUserStore((s) => s.equippedNovaGear || {});
  const equipNovaItem = useUserStore((s) => s.equipNovaItem);

  const [filterTier, setFilterTier] = useState('all');
  const [purchaseMsg, setPurchaseMsg] = useState(null);
  const [shakeId, setShakeId] = useState(null);

  const filteredItems = ALL_COSMETICS.filter((item) => {
    if (filterTier === 'all') return true;
    return item.tier === Number(filterTier);
  });

  const handleBuy = (item) => {
    if (purchasedNovaItems.includes(item.id)) {
      // Already owned, equip it
      if (item.category && equipNovaItem) {
        equipNovaItem(item.category, item.id);
        setPurchaseMsg({ type: 'info', text: `Equipped ${item.name}!` });
        setTimeout(() => setPurchaseMsg(null), 2500);
      }
      return;
    }

    if (lexioCoins < item.price) {
      setShakeId(item.id);
      setPurchaseMsg({
        type: 'error',
        text: `Need ${item.price - lexioCoins} more Lexio Coins! 🪙`,
      });
      setTimeout(() => {
        setShakeId(null);
        setPurchaseMsg(null);
      }, 3000);
      return;
    }

    const success = purchaseMascotItem(item.id, item.price, item.category);
    if (success) {
      try {
        fireCelebrationConfetti();
      } catch (_) {}
      setPurchaseMsg({ type: 'success', text: `Purchased ${item.name}! 🎉` });
      setTimeout(() => setPurchaseMsg(null), 3000);
    }
  };

  return (
    <div className="mascot-shop-panel w-full max-w-5xl mx-auto px-4 py-6 text-white animate-in fade-in duration-300">
      {/* ── Coin Balance & Header ── */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 rounded-3xl p-6 mb-6 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-3xl shadow-inner">
            🛍️
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Nova Mascot Boutique</span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </h3>
            <p className="text-xs sm:text-sm text-indigo-200">
              Style Nova with legendary cosmetics using your earned Lexio Coins!
            </p>
          </div>
        </div>

        {/* Balance Badge */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-amber-400/40 rounded-2xl px-5 py-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">
            🪙
          </div>
          <div>
            <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
              Lexio Coins
            </div>
            <div className="text-2xl font-black text-amber-400">
              {lexioCoins}
            </div>
          </div>
        </div>
      </div>

      {/* ── Status Toast ── */}
      {purchaseMsg && (
        <div
          className={`mb-6 p-4 rounded-2xl text-center font-bold text-sm border animate-in slide-in-from-top-2 ${
            purchaseMsg.type === 'error'
              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
              : purchaseMsg.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
              : 'bg-indigo-950/80 border-indigo-500 text-indigo-200'
          }`}
        >
          {purchaseMsg.text}
        </div>
      )}

      {/* ── Filter Bar ── */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {['all', '1', '2', '3'].map((tier) => (
          <button
            key={tier}
            onClick={() => setFilterTier(tier)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTier === tier
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700'
            }`}
          >
            {tier === 'all' ? 'All Gears' : `Tier ${tier}: ${TIER_LABELS[tier].label}`}
          </button>
        ))}
      </div>

      {/* ── Catalog Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const isOwned = purchasedNovaItems.includes(item.id);
          const isEquipped = item.category && equippedNovaGear[item.category] === item.id;
          const isLockedWeek = item.minWeek > weekNumber;
          const tierInfo = TIER_LABELS[item.tier] || TIER_LABELS[1];
          const isShaking = shakeId === item.id;

          return (
            <div
              key={item.id}
              className={`relative bg-slate-900/80 border rounded-3xl p-5 flex flex-col justify-between transition-all duration-200 ${
                isOwned
                  ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/30'
                  : 'border-slate-800 hover:border-slate-700'
              } ${isShaking ? 'animate-shake border-rose-500' : ''}`}
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tierInfo.badge}`}
                >
                  Tier {item.tier} • {tierInfo.label}
                </span>
                {isLockedWeek && (
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> W{item.minWeek}+
                  </span>
                )}
                {isEquipped && (
                  <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                    <CheckCircle2 className="w-3 h-3" /> Equipped
                  </span>
                )}
              </div>

              {/* Item Icon */}
              <div className="h-24 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 flex items-center justify-center text-5xl mb-3 border border-slate-700/50 shadow-inner">
                {item.icon}
              </div>

              {/* Item Info */}
              <div className="mb-4">
                <h4 className="font-bold text-base text-white mb-1 flex items-center gap-1.5">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-amber-400 font-extrabold text-sm">
                  <span>🪙</span>
                  <span>{item.price}</span>
                </div>

                {isOwned ? (
                  <button
                    onClick={() => handleBuy(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isEquipped
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                    }`}
                  >
                    {isEquipped ? 'Equipped' : 'Equip Gear'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={isLockedWeek}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isLockedWeek
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {isLockedWeek ? (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Week {item.minWeek}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Buy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
