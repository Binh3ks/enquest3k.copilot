import React, { useState } from 'react';
import { Trophy, Medal, Crown, Flame, Zap, X, Heart, Sparkles, UserCheck } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

/**
 * ClassLeaderboardModal — Read-only Weekly XP Leaderboard for Class / Friends
 * Provides social proof and motivation for 8–12 year old learners.
 */
export default function ClassLeaderboardModal({ isOpen, onClose }) {
  const currentUser = useUserStore((s) => s.currentUser);
  const userXP = useUserStore((s) => s.userXP || 1250);
  const [highFived, setHighFived] = useState({});

  if (!isOpen) return null;

  const currentUserName = currentUser?.display_name || currentUser?.username || 'Owner (You)';

  // Mock class leaderboard sorted by XP
  const mockLeaderboard = [
    { rank: 1, name: 'Minh Anh 🚀', xp: 2450, streak: 12, avatar: '👧', isUser: false },
    { rank: 2, name: 'Bảo Nam ⚡', xp: 2100, streak: 8, avatar: '👦', isUser: false },
    { rank: 3, name: currentUserName, xp: userXP, streak: 5, avatar: '🌟', isUser: true },
    { rank: 4, name: 'Gia Hân 🎨', xp: 1180, streak: 4, avatar: '👧', isUser: false },
    { rank: 5, name: 'Khôi Nguyên 🐉', xp: 950, streak: 3, avatar: '👦', isUser: false },
    { rank: 6, name: 'Thùy Dương 🌸', xp: 820, streak: 2, avatar: '👧', isUser: false },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  const handleHighFive = (rank) => {
    setHighFived((prev) => ({ ...prev, [rank]: true }));
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl border-2 border-amber-400/40 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Trophy size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                CLASS LEADERBOARD <span className="text-xs px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-full font-bold">Week 33</span>
              </h2>
              <p className="text-xs text-indigo-200">Weekly XP Ranking · Resets every Sunday</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Podium Top 3 */}
        <div className="p-4 bg-white/5 flex items-end justify-center gap-3 border-b border-white/10">
          {/* Rank 2 */}
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">{mockLeaderboard[1]?.avatar}</span>
            <div className="w-20 bg-slate-800/90 border border-slate-600 rounded-t-2xl p-2 text-center shadow-lg">
              <span className="text-xs font-black text-slate-300 block truncate">{mockLeaderboard[1]?.name}</span>
              <span className="text-[10px] font-extrabold text-amber-300 block">{mockLeaderboard[1]?.xp} XP</span>
              <div className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-400 text-slate-950 font-black text-xs">
                2
              </div>
            </div>
          </div>

          {/* Rank 1 */}
          <div className="flex flex-col items-center -mt-3">
            <Crown size={22} className="text-amber-300 animate-bounce mb-0.5" />
            <span className="text-3xl mb-1">{mockLeaderboard[0]?.avatar}</span>
            <div className="w-24 bg-gradient-to-b from-amber-500 to-amber-600 border-2 border-amber-300 rounded-t-2xl p-2.5 text-center shadow-xl">
              <span className="text-xs font-black text-slate-950 block truncate">{mockLeaderboard[0]?.name}</span>
              <span className="text-xs font-black text-white block">{mockLeaderboard[0]?.xp} XP</span>
              <div className="mt-1 inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-200 text-slate-950 font-black text-sm shadow">
                1
              </div>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">{mockLeaderboard[2]?.avatar}</span>
            <div className="w-20 bg-amber-900/60 border border-amber-700/60 rounded-t-2xl p-2 text-center shadow-lg">
              <span className="text-xs font-black text-amber-200 block truncate">{mockLeaderboard[2]?.name}</span>
              <span className="text-[10px] font-extrabold text-amber-300 block">{mockLeaderboard[2]?.xp} XP</span>
              <div className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs">
                3
              </div>
            </div>
          </div>
        </div>

        {/* Full Ranking List */}
        <div className="p-4 space-y-2 overflow-y-auto flex-1">
          {mockLeaderboard.map((item) => (
            <div
              key={item.rank}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                item.isUser
                  ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white/5 hover:bg-white/10 border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center ${
                  item.rank === 1 ? 'bg-amber-400 text-slate-950' : item.rank === 2 ? 'bg-slate-300 text-slate-950' : item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-white/10 text-white/70'
                }`}>
                  {item.rank}
                </span>
                <span className="text-xl">{item.avatar}</span>
                <div>
                  <span className={`text-xs font-black block ${item.isUser ? 'text-amber-300 font-extrabold' : 'text-white'}`}>
                    {item.name} {item.isUser && '(You)'}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Flame size={10} className="text-amber-400" /> {item.streak} day streak
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-amber-300">{item.xp} XP</span>
                {!item.isUser && (
                  <button
                    type="button"
                    onClick={() => handleHighFive(item.rank)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition active:scale-90 flex items-center gap-1 ${
                      highFived[item.rank]
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {highFived[item.rank] ? '👏 Sent!' : '👏 High-Five'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white/5 border-t border-white/10 text-center">
          <span className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
            <Sparkles size={12} className="text-amber-400" /> Complete Today's Quests to climb the leaderboard!
          </span>
        </div>
      </div>
    </div>
  );
}
