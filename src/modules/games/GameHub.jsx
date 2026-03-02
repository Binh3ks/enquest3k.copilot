import React, { useState } from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import { PRODUCTION_GAMES } from '../../services/ai_tutor/games/index';
import ShowTellLadderGame from '../../pages/GameHub/games/ShowTellLadderGame';
import MakeSentenceGame from '../../pages/GameHub/games/MakeSentenceGame';
import AskMeGame from '../../pages/GameHub/games/AskMeGame';
import { useUserStore } from '../../stores/useUserStore';

/**
 * 🎮 Game Hub - New 3-game structure + World Adventure
 */

const EXTERNAL_GAMES = [
  { id: 'gtle',        title: 'Arcade World',   icon: '🎮', url: 'https://www.gamestolearnenglish.com/', color: 'bg-gradient-to-br from-indigo-500 to-blue-600' },
  { id: 'wordwall',    title: 'Wordwall Park',   icon: '🌍', url: 'https://wordwall.net/',                color: 'bg-gradient-to-br from-rose-400 to-pink-600' },
  { id: 'baamboozle',  title: 'Baamboozle',      icon: '🧩', url: 'https://www.baamboozle.com/',          color: 'bg-gradient-to-br from-emerald-400 to-teal-600' },
  { id: 'eslgamesplus',title: 'ESL Games Plus',  icon: '🧸', url: 'https://www.eslgamesplus.com/',        color: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
];

const GameHub = ({ data }) => {
  const weekNumber = data?.week_id || data?.weekId || 1;
  const learningMode = useUserStore((state) => state.learningMode || 'advanced');
  const [selectedGameId, setSelectedGameId] = useState(null);

  const availableGameIds = ['show_tell', 'make_sentence', 'ask_me'];
  const availableGames = PRODUCTION_GAMES.filter((g) => availableGameIds.includes(g.id));

  const handleOpenExternal = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (selectedGameId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="p-4">
          <button
            onClick={() => setSelectedGameId(null)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold"
          >
            ← Back to Menu
          </button>
        </div>

        {selectedGameId === 'show_tell' && (
          <ShowTellLadderGame
            weekNumber={weekNumber}
            learningMode={learningMode}
          />
        )}
        {selectedGameId === 'make_sentence' && (
          <MakeSentenceGame
            weekNumber={weekNumber}
            learningMode={learningMode}
          />
        )}
        {selectedGameId === 'ask_me' && (
          <AskMeGame
            weekNumber={weekNumber}
            learningMode={learningMode}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-black">Game Hub</h1>
          <p className="text-purple-100 text-lg font-semibold">Week {weekNumber}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGameId(game.id)}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-6xl mb-4">{game.emoji}</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">{game.name_en}</h3>
              <p className="text-gray-600 font-semibold mb-4 text-sm">{game.intro}</p>
              <div className="text-xs text-gray-500">{game.productionType}</div>
            </button>
          ))}
        </div>

        {/* World Adventure — external English game sites */}
        <div className="bg-slate-950 mt-8 p-8 rounded-[40px] shadow-2xl border-4 border-slate-800">
          <h3 className="font-black text-white text-2xl md:text-3xl flex items-center gap-3 mb-6 italic uppercase">
            <Globe className="text-sky-400" size={28} /> World Adventure
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXTERNAL_GAMES.map(g => (
              <button
                key={g.id}
                onClick={() => handleOpenExternal(g.url)}
                className={`group ${g.color} p-6 rounded-[28px] transition-all cursor-pointer flex items-center justify-between border-b-4 border-black/30 hover:translate-x-1 active:scale-95`}
              >
                <div className="flex items-center gap-4 text-white">
                  <div className="text-5xl group-hover:rotate-12 transition-transform">{g.icon}</div>
                  <div>
                    <h4 className="font-black text-xl uppercase tracking-tight">{g.title}</h4>
                    <p className="text-xs font-bold opacity-70 uppercase">Explore Online</p>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <ExternalLink className="text-white" size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHub;
