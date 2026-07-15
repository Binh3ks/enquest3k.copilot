import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, Mic, StopCircle, RotateCcw, ChevronRight, Volume2 } from 'lucide-react';
import { getStressStyle } from './ipaUtils';
import { speakText } from '../../utils/AudioHelper';

/**
 * FullPracticeModal — Full-screen recording practice overlay.
 * Shows target sentence with IPA, plays TTS, records student, scores via Deepgram.
 */
export default function FullPracticeModal({
  sentence,
  ipaWords,
  isOpen,
  onClose,
  onScore,
  existingScore,
  onRecord,
  isRecording,
  stopRecording,
  speed,
  weekNumber,
  mode,
  themeColor,
}) {
  const [phase, setPhase] = useState('idle'); // idle | countdown | recording | scored | listening
  const [countdown, setCountdown] = useState(3);
  const [currentScore, setCurrentScore] = useState(existingScore || null);
  const [animating, setAnimating] = useState(false);
  const countdownRef = useRef(null);
  const recordingTimeoutRef = useRef(null);

  // Reset when sentence changes
  useEffect(() => {
    setPhase('idle');
    setCountdown(3);
    setCurrentScore(existingScore || null);
    setAnimating(false);
    return () => {
      clearInterval(countdownRef.current);
      clearTimeout(recordingTimeoutRef.current);
    };
  }, [sentence?.id, isOpen]);

  // Play TTS of the sentence (used for "Listen first" button)
  const handlePlayTTS = useCallback(() => {
    if (!sentence) return;
    setPhase('listening');
    const text = (sentence.text || '').replace(/\*\*/g, '');
    speakText(text, null, speed, () => {
      // After TTS finishes, return to idle if not recording
      setPhase(prev => prev === 'listening' ? 'idle' : prev);
    }, 'shadowing', weekNumber, mode);
  }, [sentence, speed, weekNumber, mode]);

  const startCountdown = useCallback(() => {
    setPhase('countdown');
    setCountdown(3);
    let count = 3;
    countdownRef.current = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(countdownRef.current);
        setPhase('recording');
        onRecord(sentence.id, sentence.text);
        // Auto-stop after 10s max
        recordingTimeoutRef.current = setTimeout(() => {
          stopRecording();
          setPhase('scored');
        }, 10000);
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [sentence, onRecord, stopRecording]);

  // Watch for score changes
  useEffect(() => {
    if (existingScore && existingScore.score > 0 && phase === 'recording') {
      clearTimeout(recordingTimeoutRef.current);
      setCurrentScore(existingScore);
      setPhase('scored');
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }
  }, [existingScore, phase]);

  const handleStop = useCallback(() => {
    stopRecording();
    clearTimeout(recordingTimeoutRef.current);
    setPhase('scored');
  }, [stopRecording]);

  const handleRetry = useCallback(() => {
    setCurrentScore(null);
    setPhase('idle');
    setTimeout(() => startCountdown(), 300);
  }, [startCountdown]);

  if (!isOpen || !sentence) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Practice</h3>
            <p className="text-sm text-slate-400">Sentence {sentence.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sentence + IPA display */}
        <div className="p-6 text-center">
          <p className="text-2xl font-bold text-slate-800 leading-relaxed mb-3">
            {sentence.text}
          </p>

          {/* IPA with stress colors */}
          {ipaWords && ipaWords.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 mb-4">
              {ipaWords.map((w, i) => {
                const style = getStressStyle(w.stress);
                return (
                  <span key={i} className="inline-flex flex-col items-center">
                    <span className={`text-sm font-semibold border-b-2 ${style.text} ${style.underline}`}>
                      {w.word}
                    </span>
                    {w.ipa && (
                      <span className="text-xs text-slate-400 font-mono">{w.ipa}</span>
                    )}
                  </span>
                );
              })}
            </div>
          )}

          {sentence.vi && (
            <p className="text-sm text-slate-400 italic">{sentence.vi}</p>
          )}
        </div>

        {/* Action area */}
        <div className="px-6 pb-6">
          {/* Countdown overlay */}
          {phase === 'countdown' && (
            <div className="text-center py-8">
              <div className="text-6xl font-black text-rose-500 animate-pulse">
                {countdown}
              </div>
              <p className="text-sm text-slate-500 mt-2">Get ready to speak...</p>
            </div>
          )}

          {/* Recording state */}
          {phase === 'recording' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto bg-rose-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-rose-200">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-rose-600 mt-3 font-semibold">Recording... speak now</p>
              {/* Waveform indicator */}
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-rose-400 rounded-full animate-pulse"
                    style={{
                      height: `${12 + Math.random() * 24}px`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Score display */}
          {phase === 'scored' && currentScore && (
            <div className={`text-center py-4 ${animating ? 'animate-bounce' : ''}`}>
              {/* Score ring */}
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke={currentScore.score >= 80 ? '#22c55e' : currentScore.score >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(currentScore.score / 100) * 264} 264`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black text-slate-800">{currentScore.score}%</span>
                </div>
              </div>

              {currentScore.feedback && (
                <p className="text-sm text-slate-600 mb-2">{currentScore.feedback}</p>
              )}
              {currentScore.transcript && (
                <p className="text-xs text-slate-400 italic">
                  You said: "{currentScore.transcript}"
                </p>
              )}
            </div>
          )}

          {/* Idle state */}
          {phase === 'idle' && !currentScore && (
            <div className="text-center py-4">
              <p className="text-sm text-slate-500">Listen to the sentence, then record yourself.</p>
            </div>
          )}

          {/* Listening state (TTS playing) */}
          {phase === 'listening' && (
            <div className="text-center py-4">
              <Volume2 className="w-10 h-10 mx-auto text-blue-500 animate-pulse" />
              <p className="text-sm text-blue-600 mt-2 font-semibold">Listening...</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            {phase === 'idle' && (
              <>
                <button
                  onClick={handlePlayTTS}
                  className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
                <button
                  onClick={startCountdown}
                  className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors shadow-md"
                >
                  <Mic className="w-5 h-5" /> Start Recording
                </button>
              </>
            )}

            {phase === 'recording' && (
              <button
                onClick={handleStop}
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors shadow-md"
              >
                <StopCircle className="w-5 h-5" /> Stop
              </button>
            )}

            {phase === 'scored' && (
              <>
                <button
                  onClick={handlePlayTTS}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
                <button
                  onClick={onClose}
                  className={`flex items-center gap-2 px-5 py-3 bg-${themeColor}-600 text-white rounded-xl font-bold hover:bg-${themeColor}-700 transition-colors shadow-md`}
                >
                  Done <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
