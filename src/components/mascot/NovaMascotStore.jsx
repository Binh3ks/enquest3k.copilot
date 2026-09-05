import React from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { ShoppingBag, Sparkles, CheckCircle2, Lock, X, Zap } from 'lucide-react';

// ─── TIER 1: Starter Gear (unlock anytime) ────────────────────────────────
export const MASCOT_ITEMS_TIER1 = [
  { id: 'glasses',    name: '👓 Smart Glasses',   category: 'hat',       tier: 1, price: 200,  icon: '👓', minWeek: 1,  description: 'Reading power-up for Scene Explorer!' },
  { id: 'headphones', name: '🎧 DJ Headphones',   category: 'accessory', tier: 1, price: 300,  icon: '🎧', minWeek: 1,  description: 'High-tech headset for Listening mastery.' },
  { id: 'crown',      name: '👑 Gold Crown',       category: 'hat',       tier: 1, price: 500,  icon: '👑', minWeek: 1,  description: 'Royalty gear for Cambridge champions!' },
  { id: 'cape',       name: '🦸 Superhero Cape',   category: 'accessory', tier: 1, price: 600,  icon: '🦸', minWeek: 1,  description: 'Fly through Writing & Speaking challenges!' },
];

// ─── TIER 2: Advanced Gear (week milestone unlocks) ───────────────────────
export const MASCOT_ITEMS_TIER2 = [
  { id: 'party_hat',  name: '🎉 Celebration Hat',        category: 'hat',       tier: 2, price: 600,  icon: '🎉', minWeek: 5,  description: 'Perfect for after a Perfect Week bonus!' },
  { id: 'astronaut',  name: '🚀 Astronaut Helmet',       category: 'hat',       tier: 2, price: 800,  icon: '🚀', minWeek: 8,  description: 'Space explorer gear — unlocks Week 8.' },
  { id: 'sunglasses', name: '😎 Cool Sunglasses',        category: 'glasses',   tier: 2, price: 700,  icon: '😎', minWeek: 12, description: 'Chill vibes for the Grammar Duel arena.' },
  { id: 'wizard_hat', name: '🧙 Wizard Hat',              category: 'hat',       tier: 2, price: 1000, icon: '🧙', minWeek: 16, description: 'Ancient magic for Starters Graduates!' },
  { id: 'scarf',      name: '🧣 Movers Scarf',           category: 'accessory', tier: 2, price: 900,  icon: '🧣', minWeek: 17, description: 'Warm gear for Movers graduates!' },
];

// ─── TIER 3: Elite Gear (rare, high cost, late unlock) ────────────────────
export const MASCOT_ITEMS_TIER3 = [
  { id: 'flyers_cape', name: '⚡ Flyers Lightning Cape', category: 'accessory', tier: 3, price: 2000, icon: '⚡', minWeek: 33, description: 'Elite cape for A2 Flyers pioneers.' },
  { id: 'dragon_helm', name: '🐉 Dragon Helm',           category: 'hat',       tier: 3, price: 2500, icon: '🐉', minWeek: 50, description: 'Legendary gear unlocked at Week 50.' },
  { id: 'galaxy_suit', name: '🌌 Galaxy Frame',          category: 'glasses',   tier: 3, price: 3000, icon: '🌌', minWeek: 73, description: 'Cosmic prestige — for B1 PET pioneers.' },
];

// ─── UTILITY: Consumables (repeat-buy) ────────────────────────────────────
export const MASCOT_ITEMS_UTILITY = [
  { id: 'hint_token',    name: '💡 Hint Token ×3',    category: 'utility', tier: 1, price: 50,  icon: '💡', minWeek: 1, description: '3 hints for Grammar Duel or Bar Models.', consumable: true },
  { id: 'quiz_pack',     name: '📚 Bonus Quiz Pack',   category: 'utility', tier: 1, price: 30,  icon: '📚', minWeek: 1, description: '+5 bonus vocab flashcards for today.', consumable: true },
  { id: 'streak_repair', name: '🔧 Streak Repair',     category: 'utility', tier: 1, price: 200, icon: '🔧', minWeek: 1, description: 'Restore a streak broken yesterday (within 24h).', consumable: true },
  { id: 'streak_freeze', name: '🛡️ Streak Freeze',    category: 'utility', tier: 1, price: 400, icon: '🛡️', minWeek: 1, description: 'Protect your streak if you miss 1 day!', consumable: true },
  { id: 'xp_booster',   name: '⚡ XP Booster (2h)',   category: 'utility', tier: 2, price: 250, icon: '⚡', minWeek: 4, description: 'Double XP for the next 2 hours of study!', consumable: true },
];

// Flat combined export for backward-compatibility
export const MASCOT_ITEMS = [
  ...MASCOT_ITEMS_TIER1,
  ...MASCOT_ITEMS_TIER2,
  ...MASCOT_ITEMS_TIER3,
  ...MASCOT_ITEMS_UTILITY,
];

const TIER_LABELS = { 1: 'Starter', 2: 'Advanced', 3: '⭐ Elite' };
const TIER_BADGE_CLS = {
  1: 'bg-slate-200 text-slate-700',
  2: 'bg-purple-200 text-purple-800',
  3: 'bg-amber-300 text-amber-900',
};
const TIER_CARD_CLS = {
  1: 'border-slate-200',
  2: 'border-purple-200',
  3: 'border-amber-300',
};

export default function NovaMascotStore({ isOpen, onClose, currentWeek = 1 }) {
  const userXP = useUserStore((s) => s.userXP || 0);
  const purchasedItems = useUserStore((s) => s.purchasedNovaItems || []);
  const equippedGear = useUserStore((s) => s.equippedNovaGear || {});
  const buyNovaItem = useUserStore((s) => s.buyNovaItem);
  const equipNovaItem = useUserStore((s) => s.equipNovaItem);
  const [activeTab, setActiveTab] = React.useState('cosmetic');

  if (!isOpen) return null;

  const handleBuy = async (item) => {
    const res = await buyNovaItem(item);
    if (res?.success) fireCelebrationConfetti();
    else if (res?.message) alert(res.message);
  };

  const cosmeticItems = MASCOT_ITEMS.filter((i) => i.category !== 'utility');
  const utilityItems  = MASCOT_ITEMS.filter((i) => i.category === 'utility');
  const displayItems  = activeTab === 'cosmetic' ? cosmeticItems : utilityItems;
  const tierList      = activeTab === 'cosmetic' ? [1, 2, 3] : [1, 2];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <ShoppingBag className="w-6 h-6 text-amber-300 animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Nova Mascot Store</h3>
              <p className="text-xs text-purple-100">Spend XP to customize Nova!</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Avatar Preview + XP Balance ── */}
        <div className="bg-purple-50 px-5 py-3 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-gradient-to-tr from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow text-2xl border-2 border-white">
              🐰
              {equippedGear.hat === 'crown'      && <span className="absolute -top-3 text-base">👑</span>}
              {equippedGear.hat === 'astronaut'   && <span className="absolute -top-3 text-base">🚀</span>}
              {equippedGear.hat === 'wizard_hat'  && <span className="absolute -top-3 text-base">🧙</span>}
              {equippedGear.hat === 'party_hat'   && <span className="absolute -top-3 text-base">🎉</span>}
              {equippedGear.hat === 'dragon_helm' && <span className="absolute -top-3 text-base">🐉</span>}
              {equippedGear.glasses               && <span className="absolute text-xs top-4">{equippedGear.glasses === 'sunglasses' ? '😎' : '👓'}</span>}
              {equippedGear.accessory === 'headphones' && <span className="absolute text-xs top-3">🎧</span>}
              {equippedGear.accessory === 'cape'       && <span className="absolute -right-2 text-xs">🦸</span>}
              {equippedGear.accessory === 'scarf'      && <span className="absolute -right-2 text-xs">🧣</span>}
              {equippedGear.accessory === 'flyers_cape'&& <span className="absolute -right-2 text-xs">⚡</span>}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-purple-500 tracking-widest">Nova</span>
              <p className="text-sm font-bold text-slate-800">
                {Object.values(equippedGear).filter(Boolean).length > 0 ? 'Customized' : 'Classic Bunny'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-400/20 border border-amber-400/40 rounded-2xl text-amber-900 font-black text-sm">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{userXP.toLocaleString()} XP</span>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          {[
            { id: 'cosmetic', label: '🎨 Cosmetics' },
            { id: 'utility',  label: '⚡ Utilities'  },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 text-sm font-black transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-purple-600 text-purple-700 bg-white'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tiered Catalog ── */}
        <div className="p-5 overflow-y-auto space-y-5">
          {tierList.map((tier) => {
            const items = displayItems.filter((i) => i.tier === tier);
            if (!items.length) return null;
            return (
              <div key={tier}>
                {/* Tier divider */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${TIER_BADGE_CLS[tier]}`}>
                    {TIER_LABELS[tier]}
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((item) => {
                    const isOwned      = purchasedItems.includes(item.id);
                    const isEquipped   = equippedGear[item.category] === item.id;
                    const canAfford    = userXP >= item.price;
                    const isLocked     = currentWeek < (item.minWeek || 1);
                    const isConsumable = Boolean(item.consumable);

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                          isLocked
                            ? 'opacity-50 border-slate-200 bg-slate-50'
                            : isEquipped
                            ? 'border-emerald-400 ring-2 ring-emerald-200 bg-emerald-50 shadow-md'
                            : isOwned && !isConsumable
                            ? `bg-slate-50 ${TIER_CARD_CLS[tier]}`
                            : canAfford
                            ? `bg-white ${TIER_CARD_CLS[tier]} hover:shadow-md`
                            : `bg-slate-50 ${TIER_CARD_CLS[tier]} opacity-70`
                        }`}
                      >
                        {/* Item info */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h5 className="text-sm font-black text-slate-900">{item.name}</h5>
                              {isConsumable && (
                                <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                                  consumable
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{item.description}</p>
                            {isLocked && (
                              <p className="text-[10px] font-black text-amber-600 mt-1">🔒 Unlocks Week {item.minWeek}</p>
                            )}
                          </div>
                        </div>

                        {/* Price + action */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                          <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> {item.price} XP
                          </span>

                          {isLocked ? (
                            <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-slate-100 text-slate-400 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> W{item.minWeek}
                            </span>
                          ) : isOwned && !isConsumable ? (
                            <button
                              onClick={() => item.category !== 'utility' && equipNovaItem(item.category, item.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                                isEquipped
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                              }`}
                            >
                              {isEquipped ? <><CheckCircle2 className="w-3.5 h-3.5" /> On</> : 'Equip'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBuy(item)}
                              disabled={!canAfford}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                                canAfford
                                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow'
                                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              {canAfford
                                ? (isConsumable ? '🛒 Buy' : 'Buy')
                                : <><Lock className="w-3 h-3" /> Need XP</>}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] font-bold text-slate-400">
          Earn XP by completing Cambridge Check Mode drills & Perfect Week bonuses!
        </div>
      </div>
    </div>
  );
}
