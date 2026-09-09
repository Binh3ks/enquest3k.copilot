/**
 * SecretChamberScreen.jsx — Interactive Secret Room & Mystery Vault (Hạng mục 2)
 *
 * Replaces the disappointing "empty room" with a rewarding Easter Egg:
 * - Ambient stone vault atmosphere with flickering torches & glowing runes
 * - Interactive antique treasure chest awarding +5 Lexio Coins on first discovery
 * - Joyful mascot dialogue & reactions from Leo Fox
 * - Ancient inscription with pedagogical Cambridge proverb
 * - Safe return navigation to the 3D Citadel Hall
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, Coins, CheckCircle, Gift } from 'lucide-react';
import useChroniclesStore from '../../stores/useChroniclesStore';

const SECRET_ROOM_CONFIG = {
  5: {
    id: 'vault_5',
    title: '❓ Mystery Vault',
    subtitle: 'A hidden chamber concealed behind the Citadel tapestries',
    mascotIntro: "Psst! Look around... this hidden vault has been sealed for centuries! Touch the golden chest to see what's inside!",
    mascotReward: "Aha! Look what was hidden behind the ancient tapestry! 5 Shiny Lexio Coins for our boutique! 🦊✨",
    mascotClaimed: "We already found the treasure in this room this week! Still, it makes a great secret hideout! 🌟",
    inscription: "“Courage opens great gates, but Curiosity discovers the hidden treasures.”",
    chestIcon: '🏺',
    gemColor: '#f59e0b',
  },
  6: {
    id: 'room_6',
    title: '🕳️ Secret Chamber',
    subtitle: 'A quiet sanctum deep beneath the Citadel library',
    mascotIntro: "Whoa! You discovered the secret stairs under the floorboards! There's an ancient treasure box right here!",
    mascotReward: "Whoa! A secret chamber under the Citadel! The guardian left a hidden stash: +5 Lexio Coins! 🪙🎉",
    mascotClaimed: "The secret cache here has already been claimed this week! The room is tranquil and safe. 🌟",
    inscription: "“Knowledge is a mighty shield, but Practice makes a true hero.”",
    chestIcon: '📦',
    gemColor: '#38bdf8',
  },
};

export default function SecretChamberScreen({
  weekNumber = 33,
  doorIndex = 5,
  onExit,
  onBackToMap,
}) {
  const exitHandler = onExit || onBackToMap;
  const config = SECRET_ROOM_CONFIG[doorIndex] || SECRET_ROOM_CONFIG[5];
  const { lexioCoins, claimSecretReward, isSecretClaimed } = useChroniclesStore();

  const [alreadyClaimed, setAlreadyClaimed] = useState(() =>
    isSecretClaimed(weekNumber, config.id)
  );
  const [isOpening, setIsOpening] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [speechText, setSpeechText] = useState(() =>
    alreadyClaimed ? config.mascotClaimed : config.mascotIntro
  );

  const handleOpenChest = () => {
    if (alreadyClaimed || isOpening) return;
    setIsOpening(true);

    // Play pleasant coin ding using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (_) {}

    setTimeout(() => {
      const result = claimSecretReward(weekNumber, config.id);
      setIsOpening(false);
      setAlreadyClaimed(true);
      setShowCelebration(true);
      setSpeechText(config.mascotReward);
    }, 600);
  };

  return (
    <div
      className="secret-chamber-screen"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 30%, #171b30 0%, #0a0d18 80%, #05070e 100%)',
        color: '#f1f5f9',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        padding: '1.5rem',
      }}
    >
      {/* Background Ambience / Torch Light */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '60%',
          height: '40%',
          background: `radial-gradient(circle, ${config.gemColor}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto 1.5rem auto',
          zIndex: 10,
        }}
      >
        <button
          onClick={exitHandler}
          className="secret-return-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(30, 41, 59, 0.85)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '0.75rem',
            padding: '0.6rem 1.2rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Return to Citadel</span>
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '0.75rem',
            padding: '0.5rem 1rem',
            color: '#fcd34d',
            fontWeight: 700,
            fontSize: '0.95rem',
          }}
        >
          <Coins className="w-4 h-4 text-amber-400" />
          <span>{lexioCoins || 0} Lexio Coins</span>
        </div>
      </div>

      {/* Main Chamber Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* Room Title & Subtitle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.8rem',
              borderRadius: '999px',
              background: `${config.gemColor}22`,
              border: `1px solid ${config.gemColor}66`,
              color: config.gemColor,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
            }}
          >
            Secret Citadel Discovery
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0.2rem 0',
              textShadow: `0 0 20px ${config.gemColor}88`,
            }}
          >
            {config.title}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            {config.subtitle}
          </p>
        </div>

        {/* Mascot Speech Bubble */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.9)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '1rem',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            maxWidth: '560px',
            width: '100%',
            marginBottom: '2rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontSize: '2.5rem',
              lineHeight: 1,
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
            }}
          >
            🦊
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
              Leo the Guide
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.4 }}>
              {speechText}
            </div>
          </div>
        </div>

        {/* Interactive Chest Container */}
        <div
          style={{
            position: 'relative',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            background: 'rgba(15, 23, 42, 0.7)',
            border: `2px solid ${alreadyClaimed ? 'rgba(52, 211, 153, 0.4)' : `${config.gemColor}66`}`,
            boxShadow: alreadyClaimed
              ? '0 0 30px rgba(52, 211, 153, 0.2)'
              : `0 0 40px ${config.gemColor}33`,
            maxWidth: '380px',
            width: '100%',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Glowing Aura */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: alreadyClaimed
                ? 'radial-gradient(circle, #10b98144 0%, transparent 70%)'
                : `radial-gradient(circle, ${config.gemColor}55 0%, transparent 70%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4.5rem',
              marginBottom: '1rem',
              animation: alreadyClaimed ? 'none' : 'bounce 2s infinite',
              filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
            }}
          >
            {alreadyClaimed ? '🎁' : config.chestIcon}
          </div>

          {/* Action Button or Claimed Badge */}
          {!alreadyClaimed ? (
            <button
              className="secret-open-chest-btn"
              onClick={handleOpenChest}
              disabled={isOpening}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#1e1b4b',
                border: 'none',
                borderRadius: '0.85rem',
                padding: '0.85rem 1.6rem',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Sparkles className="w-5 h-5 text-amber-900" />
              <span>{isOpening ? 'Unlocking...' : '✨ Open Chest (+5 Coins)'}</span>
            </button>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '0.75rem',
                padding: '0.6rem 1.2rem',
                color: '#34d399',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              <CheckCircle className="w-4 h-4" />
              <span>+5 Coins Claimed This Week</span>
            </div>
          )}

          {/* Celebration Banner */}
          {showCelebration && (
            <div
              style={{
                marginTop: '1rem',
                color: '#fef08a',
                fontSize: '0.95rem',
                fontWeight: 700,
                animation: 'fadeIn 0.4s ease',
              }}
            >
              🎉 +5 Lexio Coins added to your pouch!
            </div>
          )}
        </div>

        {/* Ancient Wall Inscription (Pedagogical Element) */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px dashed rgba(148, 163, 184, 0.3)',
            borderRadius: '0.85rem',
            padding: '0.9rem 1.4rem',
            maxWidth: '560px',
            color: '#cbd5e1',
            fontStyle: 'italic',
            fontSize: '0.88rem',
            lineHeight: 1.5,
          }}
        >
          {config.inscription}
        </div>
      </div>
    </div>
  );
}
