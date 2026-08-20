import React, { useState, useEffect, useCallback } from 'react';
import lexioHappy from '../../assets/lexio-happy.jpg';
import lexioCelebrate from '../../assets/lexio-celebrate.jpg';
import lexioThinking from '../../assets/lexio-thinking.jpg';
import lexioEncourage from '../../assets/lexio-encourage.jpg';
import lexioListening from '../../assets/lexio-listening.jpg';
import lexioWaving from '../../assets/lexio-waving.jpg';
import './LexioMascot.css';

/**
 * Lexio Mascot Component — Animated fox character
 * 
 * Moods:
 * - 'happy'       → Default idle state (standing, smiling)
 * - 'celebrate'   → Task completed! (jumping with confetti)
 * - 'thinking'    → AI processing / loading
 * - 'encourage'   → Motivational (thumbs up, heart)
 * - 'listening'   → User is recording audio
 * - 'waving'      → Greeting / onboarding / idle nudge
 * 
 * Animations (CSS):
 * - idle: gentle float + subtle scale breathing
 * - celebrate: bounce + glow pulse
 * - thinking: slow rock side to side
 * - encourage: gentle nod
 * - listening: lean forward pulse
 * - waving: wave animation
 */

const MOOD_SRC = {
  happy: lexioHappy,
  celebrate: lexioCelebrate,
  thinking: lexioThinking,
  encourage: lexioEncourage,
  listening: lexioListening,
  waving: lexioWaving,
};

const MOOD_ANIMATIONS = {
  happy: 'lexio-idle',
  celebrate: 'lexio-celebrate',
  thinking: 'lexio-thinking',
  encourage: 'lexio-encourage',
  listening: 'lexio-listening',
  waving: 'lexio-waving',
};

const LexioMascot = ({ 
  size = 80, 
  mood = 'happy', 
  className = '',
  speechBubble = null,  // string text for speech bubble
  onClick = null,
  showSpeechBubble = false,
}) => {
  const [currentMood, setCurrentMood] = useState(mood);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth mood transitions
  useEffect(() => {
    if (mood !== currentMood) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentMood(mood);
        setIsTransitioning(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [mood, currentMood]);

  const animationClass = MOOD_ANIMATIONS[currentMood] || 'lexio-idle';
  const imgSrc = MOOD_SRC[currentMood] || lexioHappy;

  return (
    <div 
      className={`lexio-mascot-container ${animationClass} ${isTransitioning ? 'lexio-transitioning' : ''} ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img
        src={imgSrc}
        alt={`Lexio mascot — ${currentMood}`}
        className="lexio-mascot-img"
        draggable={false}
      />
      
      {/* Speech Bubble */}
      {showSpeechBubble && speechBubble && (
        <div className="lexio-speech-bubble">
          <span>{speechBubble}</span>
          <div className="lexio-speech-tail" />
        </div>
      )}
    </div>
  );
};

export default LexioMascot;
