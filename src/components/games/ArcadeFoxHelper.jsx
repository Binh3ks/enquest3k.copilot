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
    setBubbleText(`🦊 ${text}`);

    const jumpTimer = setTimeout(() => setIsJumping(false), 500);
    const bubbleTimer = setTimeout(() => {
      setShowBubble(false);
      if (onHintUsed) onHintUsed();
    }, 2000);

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
      right: '10px',
      top: '8px',
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      gap: '8px',
      pointerEvents: 'none',
    }}>
      {/* Lexio Fox Mascot button on top-RIGHT */}
      <div
        onClick={handleFoxClick}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #fb923c, #ea580c)',
          border: '2px solid #ffedd5',
          boxShadow: '0 4px 12px rgba(234,88,12,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          transform: isJumping ? 'translateY(-10px) scale(1.15) rotate(-10deg)' : 'translateY(0) scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: 'auto',
          flexShrink: 0,
        }}
        title="Click Lexio Fox for a hint!"
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
      >
        🦊
      </div>

      {/* Compact Speech Bubble pointing to Fox on the right */}
      {showBubble && bubbleText && (
        <div style={{
          background: 'linear-gradient(135deg, #fef08a, #fde047)',
          border: '1.5px solid #ca8a04',
          borderRadius: '12px',
          padding: '5px 10px',
          color: '#713f12',
          fontWeight: 900,
          fontSize: '11px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          maxWidth: '170px',
          animation: 'bounceIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          whiteSpace: 'normal',
          lineHeight: 1.3,
          position: 'relative',
          pointerEvents: 'none',
        }}>
          {/* Bubble tail on right pointing to fox */}
          <div style={{
            position: 'absolute',
            right: '-6px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '6px solid #fde047',
          }} />
          {bubbleText}
        </div>
      )}
    </div>
  );
}
