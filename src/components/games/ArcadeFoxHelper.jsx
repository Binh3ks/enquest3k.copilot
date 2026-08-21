import React, { useState, useEffect } from 'react';
import LexioMascot from '../mascot/LexioMascot';

/**
 * ArcadeFoxHelper.jsx
 * Red Fox Mascot helper that runs in, gives hints ("Here, this one!"),
 * and cheers the student on during arcade games.
 */

export default function ArcadeFoxHelper({
  hintText = '',
  triggerHint = false,
  onHintUsed = null,
  mood = 'encourage',
}) {
  const [showFox, setShowFox] = useState(false);
  const [bubbleText, setBubbleText] = useState('');

  useEffect(() => {
    if (triggerHint && hintText) {
      setShowFox(true);
      setBubbleText(`🦊 Here! ${hintText}`);
      const timer = setTimeout(() => {
        setShowFox(false);
        if (onHintUsed) onHintUsed();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [triggerHint, hintText, onHintUsed]);

  const handleFoxClick = () => {
    if (hintText) {
      setShowFox(true);
      setBubbleText(`🦊 Here! ${hintText}`);
      setTimeout(() => setShowFox(false), 3500);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      right: '14px',
      bottom: '14px',
      zIndex: 50,
      display: 'flex',
      alignItems: 'flex-end',
      gap: '8px',
      pointerEvents: 'auto',
    }}>
      {/* Speech Bubble */}
      {showFox && bubbleText && (
        <div style={{
          background: 'linear-gradient(135deg, #fef08a, #fde047)',
          border: '2px solid #ca8a04',
          borderRadius: '16px',
          padding: '8px 14px',
          color: '#713f12',
          fontWeight: 900,
          fontSize: '13px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          maxWidth: '220px',
          animation: 'bounceIn 0.3s ease-out',
          whiteSpace: 'normal',
        }}>
          {bubbleText}
        </div>
      )}

      {/* Lexio Fox Mascot button */}
      <div
        onClick={handleFoxClick}
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #fb923c, #ea580c)',
          border: '2.5px solid #ffedd5',
          boxShadow: '0 4px 16px rgba(234,88,12,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '26px',
          transition: 'transform 0.15s',
        }}
        title="Click Lexio Fox for a hint!"
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
      >
        🦊
      </div>
    </div>
  );
}
