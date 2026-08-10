/**
 * Game Hub - Main Container
 * Games: Word Duel (retrieval), Story Remix (vocab-in-context), Hot Seat (coming soon)
 */

import { useState } from 'react';
import { PRODUCTION_GAMES } from '../../services/ai_tutor/games/index';
import WordDuelGame from './games/WordDuelGame';
import StoryRemixGame from './games/StoryRemixGame';
import HotSeatGame from './games/HotSeatGame';

function getAvailableGamesForWeek() {
  return ['word_duel', 'story_remix', 'hot_seat'];
}

export default function GameHub({ weekNumber = 1, learningMode: propLearningMode = 'advanced' }) {
  const learningMode = weekNumber >= 33 ? 'advanced' : propLearningMode;
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameResults, setGameResults] = useState([]);

  const availableGameIds = getAvailableGamesForWeek();
  const availableGames = PRODUCTION_GAMES.filter((game) => availableGameIds.includes(game.id));

  const handleGameSelect = (gameId) => setSelectedGame(gameId);

  const handleGameComplete = (result) => {
    setGameResults((prev) => [...prev, { ...result, timestamp: new Date().toISOString() }]);
    setTimeout(() => setSelectedGame(null), 1500);
  };

  if (selectedGame) {
    return (
      <div className="game-container">
        <button
          onClick={() => setSelectedGame(null)}
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          ← Back to Games
        </button>

        {selectedGame === 'word_duel' && (
          <WordDuelGame
            weekNumber={weekNumber}
            learningMode={learningMode}
            onGameComplete={handleGameComplete}
          />
        )}
        {selectedGame === 'story_remix' && (
          <StoryRemixGame
            weekNumber={weekNumber}
            learningMode={learningMode}
            onGameComplete={handleGameComplete}
          />
        )}
        {selectedGame === 'hot_seat' && (
          <HotSeatGame
            weekNumber={weekNumber}
            learningMode={learningMode}
            onGameComplete={handleGameComplete}
          />
        )}
      </div>
    );
  }

  return (
    <div className="game-hub max-w-6xl mx-auto p-6">
      <div className="header mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">🎮 Game Hub</h1>
        <p className="text-sm text-gray-500">Week {weekNumber} • Production-first games</p>
      </div>

      <div className="game-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {availableGames.map((game) => (
          <div
            key={game.id}
            onClick={() => handleGameSelect(game.id)}
            className="game-card bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <div className="text-6xl text-center mb-4">{game.emoji}</div>
            <h3 className="text-xl font-bold text-center mb-2">{game.name_en}</h3>
            <p className="text-sm text-gray-600 text-center mb-3">{game.intro}</p>
            <div className="bg-green-50 border border-green-300 rounded-lg p-2 mb-3">
              <p className="text-xs text-green-800 text-center">✍️ {game.productionType}</p>
            </div>
            <button className="w-full mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
              Play Now! 🎮
            </button>
          </div>
        ))}
      </div>

      {gameResults.length > 0 && (
        <div className="recent-results mt-8">
          <h3 className="text-lg font-bold mb-2">Recent Results</h3>
          <div className="bg-white rounded-lg p-4 shadow">
            {gameResults.slice(-3).map((r, idx) => (
              <div key={idx} className="text-sm text-gray-600">✅ {r.gameId || 'Game'} completed</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
