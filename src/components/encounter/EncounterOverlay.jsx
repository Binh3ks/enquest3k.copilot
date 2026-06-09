import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import ShowTellLadderGame from '../../pages/GameHub/games/ShowTellLadderGame';
import AskMeGame from '../../pages/GameHub/games/AskMeGame';
import MakeSentenceGame from '../../pages/GameHub/games/MakeSentenceGame';

const GAMES = [
  { id: 'show_tell', icon: '🗣️', title: 'Show & Tell', desc: 'Describe each word' },
  { id: 'ask_me', icon: '❓', title: 'Ask Me', desc: 'Practice asking questions' },
  { id: 'make_sentence', icon: '✍️', title: 'Make Sentence', desc: 'Unscramble words' },
];

export default function EncounterOverlay({ isOpen, onClose, weekNumber, learningMode }) {
  const [phase, setPhase] = useState('intro'); // intro → choosing → playing → reward
  const [selectedGame, setSelectedGame] = useState(null);

  if (!isOpen) return null;

  const handlePickGame = (gameId) => {
    setSelectedGame(gameId);
    setPhase('playing');
  };

  const handleGameComplete = () => {
    setPhase('reward');
  };

  const handleClose = () => {
    setPhase('intro');
    setSelectedGame(null);
    onClose();
  };

  const GameComponent = selectedGame === 'show_tell' ? ShowTellLadderGame
    : selectedGame === 'ask_me' ? AskMeGame
    : selectedGame === 'make_sentence' ? MakeSentenceGame
    : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 rounded-t-3xl px-5 py-3.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            <h2 className="text-sm font-black text-slate-800">Quick Challenge!</h2>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        <div className="p-5">
          {phase === 'intro' && (
            <div className="text-center">
              <div className="text-5xl mb-4">🦉</div>
              <p className="text-base font-black text-slate-800 mb-1">Great work!</p>
              <p className="text-sm text-slate-500 mb-5">Want a quick game to practice what you learned?</p>
              <button
                onClick={() => setPhase('choosing')}
                className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-black text-sm hover:bg-indigo-600 transition-colors shadow-md"
              >
                Let&apos;s Play! 🎮
              </button>
              <button
                onClick={handleClose}
                className="block mx-auto mt-3 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Maybe later
              </button>
            </div>
          )}

          {phase === 'choosing' && (
            <div>
              <p className="text-sm font-black text-slate-700 mb-4 text-center">Pick a game:</p>
              <div className="space-y-2">
                {GAMES.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handlePickGame(game.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 transition-all text-left"
                  >
                    <span className="text-2xl">{game.icon}</span>
                    <div>
                      <div className="text-sm font-black text-slate-800">{game.title}</div>
                      <div className="text-[10px] font-semibold text-slate-400">{game.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'playing' && GameComponent && (
            <div className="max-h-[65vh] overflow-y-auto">
              <GameComponent
                weekNumber={weekNumber}
                learningMode={learningMode}
                onGameComplete={handleGameComplete}
              />
            </div>
          )}

          {phase === 'reward' && (
            <div className="text-center py-6">
              <div className="text-5xl mb-3">🎉</div>
              <p className="text-lg font-black text-slate-800 mb-1">Amazing!</p>
              <p className="text-sm text-slate-500 mb-6">You earned bonus stars!</p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-black text-sm hover:bg-emerald-600 transition-colors shadow-md"
              >
                Back to Learning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
