import React, { useState, useEffect } from 'react';
import { Trophy, Play, RotateCcw, Zap, Sparkles } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import useArcadeStore from '../../stores/useArcadeStore';

export default function PhysicsDriftGame({ onComplete, isStandalone = false }) {
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [roadType, setRoadType] = useState('wet'); // 'wet' | 'dry' | 'ice'
  const [carPosition, setCarPosition] = useState(10);
  const [isDrifting, setIsDrifting] = useState(false);
  const [driftResult, setDriftResult] = useState(null);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const TRACKS = [
    { surface: 'Wet Floor & Puddle', type: 'wet', correctTire: 'Rubber Grips', desc: 'Water creates a lubricant layer reducing friction.' },
    { surface: 'Dry Corridor Concrete', type: 'dry', correctTire: 'Standard Shoes', desc: 'High friction keeps footsteps stable and secure.' },
    { surface: 'Polished Science Lab Tile', type: 'ice', correctTire: 'Rubber Grips', desc: 'Smooth tile surfaces require high-friction soles.' }
  ];

  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const track = TRACKS[currentTrackIdx];

  const startGame = () => {
    setScore(0);
    setGameTimer(60);
    setGameState('playing');
    setCurrentTrackIdx(0);
    setCarPosition(10);
    setDriftResult(null);
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
    recordHighScore('physics_drift', score);
    fireCelebrationConfetti('Arcade_Drift_Win');
    if (onComplete) onComplete(score);
  };

  const handleChooseTire = (chosenTire) => {
    setIsDrifting(true);
    setCarPosition(80);

    setTimeout(() => {
      setIsDrifting(false);
      const isCorrect = chosenTire === track.correctTire;
      if (isCorrect) {
        setScore(s => s + 20);
        setDriftResult({ success: true, msg: '🏎️ PERFECT BRAKE! High friction stopped the car in time!' });
        speakText("Perfect brake! Safe stop!");
      } else {
        setDriftResult({ success: false, msg: '💦 SLIPPED! Low friction caused a 360 spin!' });
        speakText("Whoops! Low friction caused a slide!");
      }

      setTimeout(() => {
        setCurrentTrackIdx(i => (i + 1) % TRACKS.length);
        setCarPosition(10);
        setDriftResult(null);
      }, 1500);
    }, 600);
  };

  return (
    <div className="w-full h-full min-h-[360px] bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 rounded-3xl p-4 text-white relative overflow-hidden flex flex-col justify-between select-none shadow-2xl border-2 border-emerald-500/30 font-sans">
      
      {/* Top HUD */}
      <div className="flex items-center justify-between z-10 px-2 py-1 bg-slate-900/80 backdrop-blur rounded-2xl border border-emerald-500/30">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚗</span>
          <div>
            <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider">Physics Drift Race</h4>
            <span className="text-[10px] text-slate-400 font-bold">Friction Simulation Lab</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-400/30">
            <Trophy size={13} /> {score} PTS
          </div>
          <div className="text-xs font-black px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-400/40">
            ⏱️ {gameTimer}s
          </div>
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30 animate-bounce ring-4 ring-emerald-400/40">
            🏎️
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-emerald-300">Master Friction to Brake in Time!</h3>
            <p className="text-xs text-emerald-200 max-w-sm mx-auto">
              Select the right high-friction shoe/tire gear to stop safely before the danger line.
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black rounded-2xl text-sm shadow-xl active:scale-95 transition flex items-center gap-2"
          >
            <Play size={18} fill="currentColor" /> START RACE (1 MIN)
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 relative overflow-hidden my-2 flex flex-col justify-between">
          {/* Surface Condition */}
          <div className="text-center z-10 py-1.5 px-4 bg-emerald-500/10 border border-emerald-400/40 rounded-2xl backdrop-blur-sm mx-auto">
            <span className="text-[10px] font-black uppercase text-emerald-400 block">Upcoming Track Surface:</span>
            <span className="text-base font-black text-emerald-200">{track.surface}</span>
            <span className="text-[10px] text-slate-400 block">{track.desc}</span>
          </div>

          {/* Racetrack Visual */}
          <div className="relative h-20 bg-slate-900 border-y-2 border-dashed border-emerald-500/50 rounded-2xl flex items-center my-3 overflow-hidden px-4">
            <div
              className="text-4xl transition-all duration-500 transform"
              style={{
                marginLeft: `${carPosition}%`,
                transform: isDrifting ? 'rotate(20deg) scale(1.1)' : 'rotate(0deg)'
              }}
            >
              🏎️
            </div>
            <div className="absolute right-4 top-0 bottom-0 w-2 bg-rose-500 flex items-center justify-center">
              <span className="text-[9px] font-black text-white uppercase -rotate-90">STOP</span>
            </div>
          </div>

          {driftResult && (
            <div className={`text-center text-xs font-black p-2 rounded-xl border animate-in fade-in ${
              driftResult.success ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' : 'bg-rose-500/20 text-rose-300 border-rose-400'
            }`}>
              {driftResult.msg}
            </div>
          )}

          {/* Decision Buttons */}
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => handleChooseTire('Rubber Grips')}
              disabled={isDrifting}
              className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs shadow-lg transition active:scale-95"
            >
              ⚡ Rubber Grips (High Friction)
            </button>
            <button
              type="button"
              onClick={() => handleChooseTire('Standard Shoes')}
              disabled={isDrifting}
              className="py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs shadow-lg transition active:scale-95"
            >
              👟 Standard Soles (Low Friction)
            </button>
          </div>
        </div>
      )}

      {gameState === 'done' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 z-10 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-3xl shadow-xl font-black">
            🏆
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-amber-300">Race Trial Complete!</h3>
            <p className="text-sm font-bold text-white">
              Final Score: <strong className="text-amber-400 text-lg">{score} PTS</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw size={14} /> Race Again
          </button>
        </div>
      )}
    </div>
  );
}
