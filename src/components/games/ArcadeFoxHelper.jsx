import React, { useState, useEffect } from 'react';

/**
 * ArcadeFoxHelper.jsx
 * Red Fox Mascot helper based on the bottom-LEFT.
 * Runs and jumps around with lively animations when students ponder or request hints.
 */

export default function ArcadeFoxHelper({
  hintText = '',
  triggerHint = false,
  onHintUsed = null,
}) {
  const [showBubble, setShowBubble] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [bubbleText, setBubbleText] = useState('');

  const triggerFoxAction = (text) => {
    setIsJumping(true);
    setShowBubble(true);
    setBubbleText(`🦊 Here! This one! 👉 ${text}`);

    const jumpTimer = setTimeout(() => setIsJumping(false), 800);
    const bubbleTimer = setTimeout(() => {
      setShowBubble(false);
      if (onHintUsed) onHintUsed();
    }, 4000);

    return () => {
      clearTimeout(jumpTimer);
      clearTimeout(bubbleTimer);
    };
  };

  useEffect(() => {
    if (triggerHint && hintText) {
      return triggerFoxAction(hintText);
    }
  }, [triggerHint, hintText]);

  const handleFoxClick = () => {
    if (hintText) {
      triggerFoxAction(hintText);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      left: '16px',
      bottom: '14px',
      zIndex: 50,
      display: 'flex',
      alignItems: 'flex-end',
      gap: '10px',
      pointerEvents: 'auto',
    }}>
      {/* Lexio Fox Mascot button on bottom-LEFT */}
      <div
        onClick={handleFoxClick}
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #fb923c, #ea580c)',
          border: '2.5px solid #ffedd5',
          boxShadow: '0 6px 20px rgba(234,88,12,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '28px',
          transform: isJumping ? 'translateY(-24px) scale(1.15) rotate(-10deg)' : 'translateY(0) scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        title="Click Lexio Fox for a hint!"
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
      >
        🦊
      </div>

      {/* Speech Bubble pointing from Fox on the left */}
      {showBubble && bubbleText && (
        <div style={{
          background: 'linear-gradient(135deg, #fef08a, #fde047)',
          border: '2.5px solid #ca8a04',
          borderRadius: '16px',
          padding: '10px 16px',
          color: '#713f12',
          fontWeight: 900,
          fontSize: '13px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
          maxWidth: '260px',
          animation: 'bounceIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          whiteSpace: 'normal',
          lineHeight: 1.4,
          position: 'relative',
        }}>
          {/* Bubble tail on left pointing to fox */}
          <div style={{
            position: 'absolute',
            left: '-8px',
            bottom: '14px',
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '8px solid #fde047',
          }} />
          {bubbleText}
        </div>
      )}
    </div>
  );
}
