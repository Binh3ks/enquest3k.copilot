import React, { useState, useEffect } from 'react';
import { Trophy, Play, RotateCcw, Zap } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import useArcadeStore from '../../stores/useArcadeStore';

export default function CatapultChunkGame({ onComplete, isStandalone = false }) {
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedChunks, setSelectedChunks] = useState([]);
  const [castleHealth, setCastleHealth] = useState(100);
  const [isFiring, setIsFiring] = useState(false);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const ROUNDS = [
    {
      targetPrompt: 'Jake was walking down the corridor with rubber shoes.',
      chunks: ['Jake was walking', 'down the corridor', 'with rubber shoes'],
      shuffled: ['with rubber shoes', 'Jake was walking', 'down the corridor']
    },
    {
      targetPrompt: 'Water acts as a lubricant on the wet floor.',
      chunks: ['Water acts', 'as a lubricant', 'on the wet floor'],
      shuffled: ['on the wet floor', 'Water acts', 'as a lubricant']
    },
    {
      targetPrompt: 'The nurse arrived quickly with clean bandages.',
      chunks: ['The nurse arrived', 'quickly with', 'clean bandages'],
      shuffled: ['clean bandages', 'The nurse arrived', 'quickly with']
    }
  ];

  const round = ROUNDS[currentRoundIdx];

  const startGame = () => {
    setScore(0);
    setGameTimer(60);
    setCurrentRoundIdx(0);
    setSelectedChunks([]);
    setCastleHealth(100);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      if (!isStandalone) {
        const hasEnergy = consumePlayEnergy(1);
        if (!hasEnergy) {
          endGame();
          return;
        }
      }

      setGameTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, isStandalone]);

  const endGame = () => {
    setGameState('done');
    recordHighScore('chunk_catapult', score);
    fireCelebrationConfetti('Arcade_Catapult_Win');
    if (onComplete) onComplete(score);
  };

  const handleSelectChunk = (chunk) => {
    if (selectedChunks.includes(chunk)) return;
    const next = [...selectedChunks, chunk];
    setSelectedChunks(next);

    if (next.length === round.chunks.length) {
      setIsFiring(true);
      setTimeout(() => {
        setIsFiring(false);
        const isCorrect = next.every((c, i) => c === round.chunks[i]);
        if (isCorrect) {
          setScore(s => s + 25);
          setCastleHealth(h => Math.max(0, h - 35));
          speakText("Direct hit! Castle smashed!");
        } else {
          speakText("Missed! Check chunk sequence.");
        }

        setTimeout(() => {
          setSelectedChunks([]);
          setCurrentRoundIdx(i => (i + 1) % ROUNDS.length);
        }, 1200);
      }, 600);
    }
  };

  return (
    <div className="w-full h-full min-h-[360px] bg-gradient-to-b from-slate-950 via-amber-950 to-slate-950 rounded-3xl p-4 text-white relative overflow-hidden flex flex-col justify-between select-none shadow-2xl border-2 border-amber-500/30 font-sans">
      
      {/* Top HUD */}
      <div className="flex items-center justify-between z-10 px-2 py-1 bg-slate-900/80 backdrop-blur rounded-2xl border border-amber-500/30">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧩</span>
          <div>
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">Chunk Catapult</h4>
            <span className="text-[10px] text-slate-400 font-bold">Grammar Siege Challenge</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-400/30">
            <Trophy size={13} /> {score} PTS
          </div>
          <div className="text-xs font-black px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-400/40">
            ⏱️ {gameTimer}s
          </div>
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30 animate-bounce ring-4 ring-amber-400/40">
            🏰
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-amber-300">Load the Catapult with Grammar Chunks!</h3>
            <p className="text-xs text-amber-200 max-w-sm mx-auto">
              Tap sentence chunks in the natural grammar sequence to launch the boulder and destroy the slime fortress.
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-black rounded-2xl text-sm shadow-xl active:scale-95 transition flex items-center gap-2"
          >
            <Play size={18} fill="currentColor" /> LOAD CATAPULT (1 MIN)
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 relative overflow-hidden my-2 flex flex-col justify-between">
          <div className="text-center z-10 py-1.5 px-4 bg-amber-500/10 border border-amber-400/40 rounded-2xl backdrop-blur-sm mx-auto">
            <span className="text-[10px] font-black uppercase text-amber-400 block">Target Sentence:</span>
            <span className="text-sm font-black text-amber-200">{round.targetPrompt}</span>
          </div>

          {/* Catapult Loaded Chunks Area */}
          <div className="min-h-[50px] p-2.5 bg-slate-900/80 rounded-2xl border-2 border-dashed border-amber-500/40 flex items-center justify-center gap-2 my-2">
            {selectedChunks.length === 0 ? (
              <span className="text-xs text-slate-400 italic">Tap chunks below to load catapult...</span>
            ) : (
              selectedChunks.map((c, i) => (
                <span key={i} className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xs animate-in zoom-in">
                  {c}
                </span>
              ))
            )}
          </div>

          {/* Shuffled Chunks to Tap */}
          <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
            {round.shuffled.map((chunk, i) => {
              const isUsed = selectedChunks.includes(chunk);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectChunk(chunk)}
                  disabled={isUsed || isFiring}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
                    isUsed
                      ? 'bg-slate-800 text-slate-600 border border-slate-700 opacity-40'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 shadow-md active:scale-95'
                  }`}
                >
                  {chunk}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gameState === 'done' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 z-10 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-3xl shadow-xl font-black">
            🏆
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-amber-300">Fortress Destroyed!</h3>
            <p className="text-sm font-bold text-white">
              Final Score: <strong className="text-amber-400 text-lg">{score} PTS</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw size={14} /> Siege Again
          </button>
        </div>
      )}
    </div>
  );
}
