import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Mic, Edit3 } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { COLLECTIONS, getCardsForCollection, STORY_CARDS } from '../data/collectionConfig';
import TradingCard from '../components/cards/TradingCard';

const ACCENT_BG = {
  sky: 'from-sky-100 via-sky-50 to-white',
  rose: 'from-rose-100 via-rose-50 to-white',
  amber: 'from-amber-100 via-amber-50 to-white',
  emerald: 'from-emerald-100 via-emerald-50 to-white',
  orange: 'from-orange-100 via-orange-50 to-white',
  green: 'from-green-100 via-green-50 to-white',
  red: 'from-red-100 via-red-50 to-white',
  pink: 'from-pink-100 via-pink-50 to-white',
  slate: 'from-slate-100 via-slate-50 to-white',
  cyan: 'from-cyan-100 via-cyan-50 to-white',
  fuchsia: 'from-fuchsia-100 via-fuchsia-50 to-white',
  lime: 'from-lime-100 via-lime-50 to-white',
  violet: 'from-violet-100 via-violet-50 to-white',
  teal: 'from-teal-100 via-teal-50 to-white',
  blue: 'from-blue-100 via-blue-50 to-white',
  indigo: 'from-indigo-100 via-indigo-50 to-white',
};

export default function CollectionBoard() {
  const navigate = useNavigate();
  const weekCompletion = useUserStore((state) => state.weekCompletion);
  const earnedBadges = useUserStore((state) => state.earnedBadges);
  const avatarItems = useUserStore((state) => state.avatarItems);
  const [search, setSearch] = useState('');
  const [openCollectionId, setOpenCollectionId] = useState(null);

  // Compute "earned cards" map: { cardId: true }
  const earnedCards = useMemo(() => {
    const earned = {};
    COLLECTIONS.forEach((col) => {
      const cards = getCardsForCollection(col);
      // 6 common cards: one per week — earned when week is 100%
      col.weekRange.forEach((week, idx) => {
        if ((weekCompletion[week] || 0) >= 100) {
          earned[cards[idx].id] = true;
        }
      });
      // 2 rare bonus cards: earned when collection is fully complete (badge earned)
      if (earnedBadges.includes(col.id)) {
        earned[cards[6].id] = true;
        earned[cards[7].id] = true;
      }
    });
    return earned;
  }, [weekCompletion, earnedBadges]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COLLECTIONS;
    return COLLECTIONS.filter(
      (c) => c.theme.toLowerCase().includes(q) || c.iconIds.some((id) => id.includes(q))
    );
  }, [search]);

  const totalEarned = Object.keys(earnedCards).length;
  const totalCards = COLLECTIONS.length * 8;

  // Sprint S4 — count earned story cards (per-week badges)
  // Stored in avatarItems as e.g. "story_notebook_w16"
  const storyCardProgress = useMemo(() => {
    const result = { notebook: { earned: 0, total: 0 }, quill: { earned: 0, total: 0 }, mic: { earned: 0, total: 0 } };
    const wnSet = new Set();
    Object.keys(weekCompletion).forEach(k => {
      const m = k.match(/^(\d+)(?:_easy)?$/);
      if (m) wnSet.add(parseInt(m[1], 10));
    });
    if (wnSet.size === 0) {
      // Default range for users who haven't done any week
      for (let w = 16; w <= 35; w++) wnSet.add(w);
    }
    result.notebook.total = wnSet.size;
    result.quill.total = wnSet.size;
    result.mic.total = wnSet.size;
    avatarItems.forEach(item => {
      if (item.startsWith('story_notebook_w')) result.notebook.earned++;
      else if (item.startsWith('story_quill_w')) result.quill.earned++;
      else if (item.startsWith('storyteller_mic_w')) result.mic.earned++;
    });
    return result;
  }, [weekCompletion, avatarItems]);

  const storyCardCatalog = [
    { key: 'story_notebook', card: STORY_CARDS.story_notebook, progress: storyCardProgress.notebook, Icon: Edit3 },
    { key: 'story_quill',    card: STORY_CARDS.story_quill,    progress: storyCardProgress.quill,    Icon: Edit3 },
    { key: 'storyteller_mic',card: STORY_CARDS.storyteller_mic,progress: storyCardProgress.mic,      Icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <style>{`@keyframes shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-black text-slate-800">📚 Card Collection</h1>
            <p className="text-[11px] font-semibold text-slate-400">
              {totalEarned} / {totalCards} cards collected
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-indigo-600">{avatarItems.length}/6</div>
            <div className="text-[9px] font-bold text-slate-400 uppercase">Avatar Items</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Sprint S4 — Story Writer Cards (W16+) */}
        <div className="mb-6 rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📓</span>
            <div>
              <h2 className="text-base font-black text-amber-900">Story Writer Cards</h2>
              <p className="text-[10px] font-semibold text-amber-600">W16+ — earned via Story Writing & Tell Your Story</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {storyCardCatalog.map(({ key, card, progress, Icon }) => {
              const earned = progress.earned;
              const total = progress.total;
              const pct = total > 0 ? Math.round((earned / total) * 100) : 0;
              const bg = ACCENT_BG[card.accent] || ACCENT_BG.amber;
              return (
                <div key={key} className={`rounded-2xl border-2 ${earned > 0 ? 'border-amber-300' : 'border-slate-200'} bg-white/70 p-3`}>
                  <div className="text-3xl mb-1">{card.icon}</div>
                  <p className="text-[11px] font-black text-slate-800 leading-tight mb-1">{card.theme}</p>
                  <p className="text-[9px] text-slate-500 leading-tight mb-2">{card.desc_vi}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden mr-2">
                      <div className={`h-full ${earned > 0 ? 'bg-amber-400' : 'bg-slate-300'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-600">{earned}/{total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid of collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((collection) => {
            const cards = getCardsForCollection(collection);
            const earnedCount = cards.filter((c) => earnedCards[c.id]).length;
            const isComplete = earnedCount === 8;
            const isOpen = openCollectionId === collection.id;
            const bg = ACCENT_BG[collection.accent] || ACCENT_BG.sky;

            return (
              <div
                key={collection.id}
                className={`rounded-3xl border-2 overflow-hidden shadow-md transition-all ${
                  isComplete ? 'border-amber-300 shadow-amber-200/50' : 'border-slate-200'
                } bg-gradient-to-br ${bg}`}
              >
                <button
                  onClick={() => setOpenCollectionId(isOpen ? null : collection.id)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-3xl">{collection.icon}</div>
                    <div className="text-right">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{collection.cefr}</div>
                      <div className="text-xs font-black text-slate-700">{earnedCount}/8</div>
                    </div>
                  </div>
                  <h2 className="text-base font-black text-slate-800 leading-tight">{collection.theme}</h2>
                  <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                    Weeks {collection.weekRange[0]}–{collection.weekRange[1]}
                  </p>

                  {/* Mini card preview row */}
                  <div className="flex gap-1 mt-3">
                    {cards.slice(0, 4).map((c) => (
                      <div key={c.id} className="flex-1 aspect-[3/4] rounded-md border border-white/60 overflow-hidden bg-white/40">
                        {earnedCards[c.id] ? (
                          <div className="w-full h-full flex items-center justify-center text-lg">{collection.icon}</div>
                        ) : (
                          <div className="w-full h-full bg-slate-200/40" />
                        )}
                      </div>
                    ))}
                  </div>
                </button>

                {/* Expanded view */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-white/40 bg-white/40">
                    <div className="grid grid-cols-4 gap-2">
                      {cards.map((c) => (
                        <TradingCard
                          key={c.id}
                          card={c}
                          collection={collection}
                          earned={!!earnedCards[c.id]}
                          size="sm"
                        />
                      ))}
                    </div>
                    {isComplete && (
                      <div className="mt-3 p-2 rounded-lg bg-amber-100 border border-amber-300 text-center">
                        <p className="text-[10px] font-black text-amber-800">✨ Collection complete — bonus rare cards unlocked!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
