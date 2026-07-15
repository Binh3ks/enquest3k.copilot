import React, { useState, useMemo } from 'react';
import { X, Lock, Shuffle } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import { ALL_AVATAR_ITEMS, LEGACY_ITEM_TO_KAWAII } from '../../data/avatarItemConfig';
import KawaiiAvatar, { AVATAR_PRESETS } from './avatarLayers';

const SLOT_LABELS = {
  accessory: 'Accessories',
};

export default function AvatarCloset({ isOpen, onClose }) {
  const avatarItems = useUserStore((state) => state.avatarItems);
  const equippedItems = useUserStore((state) => state.equippedItems);
  const equipItem = useUserStore((state) => state.equipItem);
  const unequipItem = useUserStore((state) => state.unequipItem);

  const [preset, setPreset] = useState(AVATAR_PRESETS[0]);
  // Derive the active accessory straight from equippedItems so we never need an
  // effect to mirror store state. We use this both for the preview and for the
  // "is equipped" highlight on inventory items.
  const equippedAccessory = useMemo(() => {
    const equippedValues = Object.values(equippedItems || {}).filter(Boolean);
    for (const id of equippedValues) {
      const mapped = LEGACY_ITEM_TO_KAWAII[id] || id;
      if (['crown', 'hat', 'glasses', 'star', 'trophy', 'wand'].includes(mapped)) {
        return mapped;
      }
    }
    return 'none';
  }, [equippedItems]);

  if (!isOpen) return null;

  // Map kawaii accessory id back to legacy store item id when equipping
  const handleItemClick = (item) => {
    if (!avatarItems.includes(item.id) && !avatarItems.includes(LEGACY_ITEM_TO_KAWAII[item.id])) {
      // Need legacy id? avatarItems is stored under legacy ids (explorer_hat, crown, etc.)
      // so check if its legacy id is owned
      const legacyId = Object.keys(LEGACY_ITEM_TO_KAWAII).find((k) => LEGACY_ITEM_TO_KAWAII[k] === item.id);
      if (!legacyId || !avatarItems.includes(legacyId)) return;
    }
    const legacyId = Object.keys(LEGACY_ITEM_TO_KAWAII).find((k) => LEGACY_ITEM_TO_KAWAII[k] === item.id) || item.id;
    if (equippedItems.accessory === legacyId || equippedAccessory === item.id) {
      unequipItem('accessory');
    } else {
      equipItem('accessory', legacyId);
    }
  };

  // Check ownership by legacy id (since that's what store awards)
  const isOwned = (item) => {
    const legacyId = Object.keys(LEGACY_ITEM_TO_KAWAII).find((k) => LEGACY_ITEM_TO_KAWAII[k] === item.id) || item.id;
    return avatarItems.includes(item.id) || avatarItems.includes(legacyId);
  };

  const liveConfig = { ...preset, accessory: equippedAccessory };
  const equipped = equippedAccessory !== 'none';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 rounded-t-3xl px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-black text-slate-800">👗 Avatar Closet</h2>
            <p className="text-[11px] font-semibold text-slate-400">Customize your character</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar preview */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 shadow-lg flex items-center justify-center">
                <KawaiiAvatar size={150} config={liveConfig} />
              </div>
              <p className="text-xs font-bold text-slate-600 mt-3">
                {avatarItems.length} / {ALL_AVATAR_ITEMS.length} items
              </p>
              {equipped && (
                <p className="text-[10px] font-semibold text-emerald-600 mt-1">● Accessory equipped</p>
              )}
            </div>

            {/* Inventory */}
            <div className="flex-1 space-y-4">
              {/* Preset selector */}
              <div>
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Shuffle size={11} /> Base Look
                </h3>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPreset(p)}
                      className={`relative p-1 rounded-xl border-2 transition-all ${
                        preset.id === p.id ? 'border-indigo-400 ring-2 ring-indigo-200' : 'border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <KawaiiAvatar size={60} config={p} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                  {SLOT_LABELS.accessory}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ALL_AVATAR_ITEMS.map((item) => {
                    const owned = isOwned(item);
                    const isEquipped = equippedAccessory === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        disabled={!owned}
                        title={owned ? item.description : `🔒 ${item.description}`}
                        className={`relative p-2.5 rounded-2xl border-2 transition-all text-center min-w-[80px] ${
                          isEquipped
                            ? 'border-indigo-400 bg-indigo-50 shadow-md ring-2 ring-indigo-200'
                            : owned
                            ? 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                            : 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="text-2xl mb-0.5">{owned ? item.icon : <Lock size={20} className="text-slate-300 mx-auto" />}</div>
                        <div className={`text-[9px] font-bold leading-tight ${
                          isEquipped ? 'text-indigo-700' : owned ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {item.name}
                        </div>
                        {isEquipped && (
                          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-[8px] font-black">✓</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-3xl">
          <p className="text-[10px] font-semibold text-slate-400 text-center">
            Earn accessories by completing collections, building streaks, and collecting stars!
          </p>
        </div>
      </div>
    </div>
  );
}
