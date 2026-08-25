import React, { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';

/**
 * ExamIntroAudioButton
 * Cambridge Exam Simulation Intro Audio Player
 * Auto-plays instruction audio 1x on mount.
 * In learning mode, renders a replay button with [data-testid="exam-intro-audio"].
 */
export default function ExamIntroAudioButton({
  weekNumber = 33,
  introId = 'exam_intro_L1',
  introText = 'Listen and draw lines. There is one example.',
  isStealth = false,
  className = ''
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioUrl = `/audio/week${weekNumber}/${introId}.mp3`;

  const playAudio = () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setIsPlaying(true);
      audio.play().catch(() => {
        // Autoplay may be blocked by browser policy until interaction
        setIsPlaying(false);
      });
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Auto-play 1 time on mount with small delay for smooth transition
    const t = setTimeout(() => {
      playAudio();
    }, 400);

    return () => {
      clearTimeout(t);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  if (isStealth) {
    return (
      <span
        data-testid="exam-intro-audio"
        className="hidden"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      data-testid="exam-intro-audio"
      onClick={playAudio}
      title={introText}
      className={`px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 shadow-xs shrink-0 ${
        isPlaying ? 'ring-2 ring-amber-400 bg-amber-200' : ''
      } ${className}`}
    >
      <Volume2 size={14} className={isPlaying ? 'animate-bounce text-amber-700' : 'text-amber-800'} />
      <span>{isPlaying ? '🔊 Playing Intro...' : '🎧 Exam Intro'}</span>
    </button>
  );
}
