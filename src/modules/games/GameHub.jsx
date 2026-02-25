import React, { useState } from 'react';
import { PRODUCTION_GAMES } from '../../services/ai_tutor/games/index';
import ShowTellLadderGame from '../../pages/GameHub/games/ShowTellLadderGame';
import MakeSentenceGame from '../../pages/GameHub/games/MakeSentenceGame';
import AskMeGame from '../../pages/GameHub/games/AskMeGame';
import { useUserStore } from '../../stores/useUserStore';

/**
 * 🎮 Game Hub - New 3-game structure
 */

const GameHub = ({ data }) => {
  const weekNumber = data?.week_id || data?.weekId || 1;
  const learningMode = useUserStore((state) => state.learningMode || 'advanced');
  const [selectedGameId, setSelectedGameId] = useState(null);

  const availableGameIds = ['show_tell', 'make_sentence', 'ask_me'];
  const availableGames = PRODUCTION_GAMES.filter((g) => availableGameIds.includes(g.id));

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
      </div>
    </div>
  );
};

export default GameHub;
