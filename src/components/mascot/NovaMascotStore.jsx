import React from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { ShoppingBag, Sparkles, Shield, CheckCircle2, Lock, X, Award, Zap } from 'lucide-react';

export const MASCOT_ITEMS = [
  {
    id: 'crown',
    name: '👑 Gold Crown',
    category: 'hat',
    price: 500,
    icon: '👑',
    description: 'Royalty gear for Cambridge Flyers Champions!'
  },
  {
    id: 'astronaut',
    name: '🚀 Astronaut Helmet',
    category: 'hat',
    price: 800,
    icon: '🚀',
    description: 'Explore space and galaxy vocabulary with Nova!'
  },
  {
    id: 'headphones',
    name: '🎧 DJ Headphones',
    category: 'accessory',
    price: 300,
    icon: '🎧',
    description: 'High-tech headset for Listening Arena mastery.'
  },
  {
    id: 'cape',
    name: '🦸 Superhero Cape',
    category: 'accessory',
    price: 600,
    icon: '🦸',
    description: 'Fly through Writing and Speaking challenges!'
  },
  {
    id: 'glasses',
    name: '👓 Smart Glasses',
    category: 'glasses',
    price: 200,
    icon: '👓',
    description: 'Boost reading comprehension and open cloze accuracy.'
  },
  {
    id: 'streak_freeze',
    name: '🛡️ Daily Streak Freeze',
    category: 'utility',
    price: 400,
    icon: '🛡️',
    description: 'Protect your daily learning streak if you miss a day!'
  }
];

export default function NovaMascotStore({ isOpen, onClose }) {
  const userXP = useUserStore((state) => state.userXP || 0);
  const purchasedItems = useUserStore((state) => state.purchasedNovaItems || []);
  const equippedGear = useUserStore((state) => state.equippedNovaGear || {});
  const buyNovaItem = useUserStore((state) => state.buyNovaItem);
  const equipNovaItem = useUserStore((state) => state.equipNovaItem);

  if (!isOpen) return null;

  const handleBuy = async (item) => {
    const res = await buyNovaItem(item);
    if (res?.success) {
      fireCelebrationConfetti();
    } else if (res?.message) {
      alert(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <ShoppingBag className="w-7 h-7 text-amber-300 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Nova Mascot Fitting Store</h3>
              <p className="text-xs font-medium text-purple-100">Spend Word Treasury XP to customize AI Mascot Nova!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Balance & Avatar Live Preview Bar */}
        <div className="bg-purple-50 p-4 border-b border-purple-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 bg-gradient-to-tr from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-md border-2 border-white text-2xl">
              🐰
              {equippedGear.hat === 'crown' && <span className="absolute -top-3 text-lg animate-pulse">👑</span>}
              {equippedGear.hat === 'astronaut' && <span className="absolute -top-3 text-lg animate-pulse">🚀</span>}
              {equippedGear.glasses === 'glasses' && <span className="absolute text-sm top-4">👓</span>}
              {equippedGear.accessory === 'headphones' && <span className="absolute text-sm top-3">🎧</span>}
              {equippedGear.accessory === 'cape' && <span className="absolute -right-2 text-sm">🦸</span>}
            </div>
            <div>
              <span className="text-xs font-black uppercase text-purple-600 tracking-wider">Nova Mascot State</span>
              <h4 className="text-sm font-bold text-slate-800">
                {Object.values(equippedGear).filter(Boolean).length > 0
                  ? 'Customized Nova Gear'
                  : 'Classic Bunny Nova'}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-amber-400/20 border border-amber-400/50 rounded-2xl text-amber-900 font-black text-sm">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
            <span>{userXP} XP</span>
          </div>
        </div>

        {/* Store Catalog Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MASCOT_ITEMS.map((item) => {
            const isOwned = purchasedItems.includes(item.id);
            const isEquipped = equippedGear[item.category] === item.id;
            const canAfford = userXP >= item.price;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                  isEquipped
                    ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-400 shadow-md'
                    : isOwned
                    ? 'bg-slate-50 border-slate-200 hover:border-purple-300'
                    : canAfford
                    ? 'bg-white border-slate-200 hover:border-purple-400 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 opacity-75'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900">{item.name}</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">{item.description}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> {item.price} XP
                  </span>

                  {isOwned ? (
                    <button
                      onClick={() => item.category !== 'utility' && equipNovaItem(item.category, item.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                        isEquipped
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Equipped
                        </>
                      ) : (
                        'Equip'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? (
                        <>Buy Gear</>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" /> Need XP
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs font-bold text-slate-500">
          Earn more XP by completing Cambridge Reading, Listening, Writing & Speaking Check Mode Drills!
        </div>
      </div>
    </div>
  );
}
