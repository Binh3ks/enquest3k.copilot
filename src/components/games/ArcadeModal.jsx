import React, { useState, useEffect } from 'react';
import { X, BatteryCharging, Battery, Trophy, Lock, ArrowLeft, ShieldAlert, Sparkles, Check, Volume2, VolumeX, Music, Music2 } from 'lucide-react';
import useArcadeStore, { ARCADE_GAME_CATALOG, getUnlockedGameCount, getFocusCycleSeconds } from '../../stores/useArcadeStore';
import { useUserStore } from '../../stores/useUserStore';
import { startArcadeBgm, stopArcadeBgm } from '../../utils/arcadeBgm';
import { playButtonClick } from '../../utils/soundEffects';
import BubblePopGame from './BubblePopGame';
import MeteorSmasherGame from './MeteorSmasherGame';
import PhysicsDriftGame from './PhysicsDriftGame';
import CatapultChunkGame from './CatapultChunkGame';
import PhonicsBubbleGame from './PhonicsBubbleGame';
import SentenceChooChooGame from './SentenceChooChooGame';
import OddOneOutGame from './OddOneOutGame';

export default function ArcadeModal({ weekNumber = 33, isOpen = false, onClose, ownerBypass = false }) {
  const {
    studySeconds,
    playEnergySeconds,
    highScores,
    bestReactionTimes = {},
    bestSpeedrunTimes = {},
    sfxEnabled = true,
    bgmEnabled = true,
    toggleSfx,
    toggleBgm,
  } = useArcadeStore();

  const currentUser = useUserStore(state => state.currentUser);
  const STAFF_ROLES = ['owner', 'admin', 'super_admin', 'teacher', 'team_leader', 'center_director'];
  const isAutoStaff = STAFF_ROLES.includes(currentUser?.role) || currentUser?.role === 'owner';

  const [isOwnerModeActive, setIsOwnerModeActive] = useState(() => {
    return ownerBypass || isAutoStaff || localStorage.getItem('arcade_owner_bypass') === 'true';
  });

  // Start / Stop Arcade BGM based on modal visibility and user preference
  useEffect(() => {
    if (isOpen && bgmEnabled) {
      startArcadeBgm();
    } else {
      stopArcadeBgm();
    }
    return () => {
      stopArcadeBgm();
    };
  }, [isOpen, bgmEnabled]);

  // Sync if prop or user role updates
  useEffect(() => {
    if (ownerBypass || isAutoStaff) {
      setIsOwnerModeActive(true);
    }
  }, [ownerBypass, isAutoStaff]);

  const toggleOwnerMode = () => {
    const next = !isOwnerModeActive;
    setIsOwnerModeActive(next);
    localStorage.setItem('arcade_owner_bypass', next ? 'true' : 'false');
  };

  const [selectedGame, setSelectedGame] = useState(null);

  const effectiveOwnerBypass = isOwnerModeActive;
  const unlockedCount = effectiveOwnerBypass ? ARCADE_GAME_CATALOG.length : getUnlockedGameCount(weekNumber);
  const focusCycleReq = getFocusCycleSeconds(weekNumber);
  const isBatteryCharged = effectiveOwnerBypass || playEnergySeconds > 0;

  const formatEnergy = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayGame = (gameId) => {
    if (!isBatteryCharged && !effectiveOwnerBypass) return;
    setSelectedGame(gameId);
  };

  if (!isOpen) return null;

  // When actively playing a game → TRUE FULLSCREEN (covers everything)
  if (selectedGame) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#0f1117',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Fullscreen header bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: 'rgba(15,23,42,0.85)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
        }}>
          <button
            type="button"
            onClick={() => setSelectedGame(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              minHeight: '44px', minWidth: '44px',
              padding: '8px 16px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)',
              color: '#f8fafc', fontSize: '13px', fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'background 0.15s, transform 0.1s'
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ArrowLeft size={18} />
            <span>EXIT GAME</span>
          </button>
          <div style={{
            fontSize: '12px', fontWeight: 800, color: '#94a3b8',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span style={{ letterSpacing: '0.04em' }}>🕹️ ARCADE ROOM</span>
            {!effectiveOwnerBypass && (
              <span style={{
                background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)',
                color: '#34d399', borderRadius: '8px', padding: '3px 10px', fontWeight: 800
              }}>
                🔋 {formatEnergy(playEnergySeconds)} remaining
              </span>
            )}
            {effectiveOwnerBypass && (
              <span style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24', borderRadius: '8px', padding: '3px 10px', fontWeight: 800 }}>
                👑 Owner Mode (Unlimited)
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={() => { toggleSfx(); playButtonClick(); }}
              title={sfxEnabled ? 'Sound Effects: Enabled' : 'Sound Effects: Muted'}
              style={{
                width: '32px', height: '32px', minWidth: '32px', minHeight: '32px',
                padding: 0, borderRadius: '8px',
                background: sfxEnabled ? 'rgba(56,189,248,0.18)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${sfxEnabled ? 'rgba(56,189,248,0.4)' : 'rgba(255,255,255,0.15)'}`,
                color: sfxEnabled ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {sfxEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              type="button"
              onClick={() => { toggleBgm(); playButtonClick(); }}
              title={bgmEnabled ? 'Music: Enabled' : 'Music: Muted'}
              style={{
                width: '32px', height: '32px', minWidth: '32px', minHeight: '32px',
                padding: 0, borderRadius: '8px',
                background: bgmEnabled ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${bgmEnabled ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.15)'}`,
                color: bgmEnabled ? '#c4b5fd' : '#94a3b8',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {bgmEnabled ? <Music size={16} /> : <Music2 size={16} />}
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '32px', height: '32px', minWidth: '32px', minHeight: '32px',
                padding: 0, borderRadius: '8px',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Full-height game area */}
        <div style={{ flex: 1, overflow: 'hidden', padding: '12px', display: 'flex', flexDirection: 'column' }}>
          {selectedGame === 'bubble_pop' && <BubblePopGame weekNumber={weekNumber} onExit={() => setSelectedGame(null)} isStandalone={effectiveOwnerBypass} />}
          {selectedGame === 'phonics_bubble' && <PhonicsBubbleGame weekNumber={weekNumber} onExit={() => setSelectedGame(null)} isStandalone={effectiveOwnerBypass} />}
          {selectedGame === 'sentence_train' && <SentenceChooChooGame weekNumber={weekNumber} onExit={() => setSelectedGame(null)} isStandalone={effectiveOwnerBypass} />}
          {selectedGame === 'odd_one_out' && <OddOneOutGame weekNumber={weekNumber} onExit={() => setSelectedGame(null)} isStandalone={effectiveOwnerBypass} />}
          {selectedGame === 'meteor_smasher' && <MeteorSmasherGame weekNumber={weekNumber} onExit={() => setSelectedGame(null)} isStandalone={effectiveOwnerBypass} />}
          {selectedGame === 'physics_drift' && <PhysicsDriftGame weekNumber={weekNumber} onExit={() => setSelectedGame(null)} isStandalone={effectiveOwnerBypass} />}
          {selectedGame === 'chunk_catapult' && <CatapultChunkGame weekNumber={weekNumber} onExit={() => setSelectedGame(null)} isStandalone={effectiveOwnerBypass} />}
        </div>

      </div>
    );
  }

  // Game catalog view (modal overlay, softer design)
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(15,17,23,0.78)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: '#1e2035',
        border: '1.5px solid #3d4170',
        borderRadius: '20px',
        padding: '22px 24px',
        maxWidth: '860px', width: '100%',
        maxHeight: '90vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        gap: '16px',
        color: '#e2e8f0',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #60a5fa, #818cf8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', boxShadow: '0 4px 12px rgba(96,165,250,0.25)'
            }}>🕹️</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#e2e8f0', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <span>ENGQUEST ARCADE ROOM</span>
                <span style={{
                  fontSize: '10px', background: 'rgba(96,165,250,0.15)',
                  color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)',
                  borderRadius: '8px', padding: '2px 8px', fontWeight: 800
                }}>
                  {unlockedCount}/{ARCADE_GAME_CATALOG.length} UNLOCKED
                </span>
                <button
                  type="button"
                  onClick={toggleOwnerMode}
                  style={{
                    fontSize: '10px',
                    background: effectiveOwnerBypass ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.08)',
                    color: effectiveOwnerBypass ? '#fbbf24' : '#94a3b8',
                    border: `1.5px solid ${effectiveOwnerBypass ? '#fbbf24' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '8px',
                    padding: '2px 10px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: effectiveOwnerBypass ? '0 0 10px rgba(251,191,36,0.3)' : 'none',
                    transition: 'all 0.15s'
                  }}
                  title="Click to toggle Owner Mode (unlocks all 12 games + unlimited battery)"
                >
                  <span>👑 {effectiveOwnerBypass ? 'OWNER MODE: ON' : 'OWNER TEST (CLICK TO UNLOCK)'}</span>
                </button>
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#38bdf8', fontWeight: 800 }}>⚡ You have 3 minutes to play any mini game!</span> · Trip {weekNumber} Content
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Audio controls */}
            <button
              type="button"
              onClick={() => { toggleSfx(); playButtonClick(); }}
              title={sfxEnabled ? 'Sound Effects: Enabled' : 'Sound Effects: Muted'}
              style={{
                width: '32px', height: '32px', minWidth: '32px', minHeight: '32px',
                padding: 0, borderRadius: '8px',
                background: sfxEnabled ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${sfxEnabled ? 'rgba(56,189,248,0.35)' : 'rgba(255,255,255,0.12)'}`,
                color: sfxEnabled ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {sfxEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              type="button"
              onClick={() => { toggleBgm(); playButtonClick(); }}
              title={bgmEnabled ? 'Music: Enabled' : 'Music: Muted'}
              style={{
                width: '32px', height: '32px', minWidth: '32px', minHeight: '32px',
                padding: 0, borderRadius: '8px',
                background: bgmEnabled ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${bgmEnabled ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.12)'}`,
                color: bgmEnabled ? '#c4b5fd' : '#94a3b8',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {bgmEnabled ? <Music size={16} /> : <Music2 size={16} />}
            </button>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '5px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 800,
              background: isBatteryCharged ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)',
              border: `1px solid ${isBatteryCharged ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'}`,
              color: isBatteryCharged ? '#34d399' : '#f87171',
            }}>
              {isBatteryCharged
                ? <><BatteryCharging size={13} /> {effectiveOwnerBypass ? 'MAX' : formatEnergy(playEnergySeconds)}</>
                : <><Battery size={13} /> {Math.round((studySeconds / focusCycleReq) * 100)}%</>
              }
            </div>

            <button type="button" onClick={onClose} style={{
              width: '32px', height: '32px', minWidth: '32px', minHeight: '32px',
              padding: 0, borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Low battery warning */}
        {!isBatteryCharged && !effectiveOwnerBypass && (
          <div style={{
            padding: '10px 14px', borderRadius: '10px',
            background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
            fontSize: '12px', fontWeight: 700, color: '#fbbf24',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚡</span>
              <span>Study for {Math.floor(focusCycleReq / 60)} minutes in any Quest to recharge battery! Current: {Math.floor(studySeconds / 60)}m {studySeconds % 60}s</span>
            </div>
            <button
              type="button"
              onClick={toggleOwnerMode}
              style={{
                padding: '4px 10px', borderRadius: '8px',
                background: '#fbbf24', color: '#1e2035',
                border: 'none', fontWeight: 900, fontSize: '11px', cursor: 'pointer'
              }}
            >
              👑 Unlock with Owner Mode
            </button>
          </div>
        )}

        {/* The Lexio Chronicles Feature Banner (W17+) */}
        {Number(weekNumber) >= 17 && (
          <div style={{
            margin: '0 0 16px',
            padding: '12px 16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(99, 102, 241, 0.15))',
            border: '1.5px solid rgba(251, 191, 36, 0.4)',
            boxShadow: '0 4px 20px rgba(245, 158, 11, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
              }}>
                🦊
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#fef08a' }}>The Lexio Chronicles Adventure</span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 900,
                    background: 'rgba(251, 191, 36, 0.25)',
                    color: '#fbbf24',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    borderRadius: '6px',
                    padding: '1px 6px',
                  }}>NEW RPG</span>
                </div>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#cbd5e1' }}>
                  Daily Chambers, 10-Question Boss Gauntlet, Mascot Shop & Relic Crystals!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose && onClose();
                window.location.href = `/week/${weekNumber}/chronicles`;
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b, #eab308)',
                color: '#0f172a',
                border: 'none',
                fontWeight: 900,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)',
                transition: 'transform 0.1s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <span>Enter Chronicles ⚡</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* Game Grid */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '12px',
          }}>
            {ARCADE_GAME_CATALOG.map((game, idx) => {
              const isUnlocked = effectiveOwnerBypass || idx < unlockedCount;
              const canPlay = isUnlocked && isBatteryCharged;
              const highScore = highScores[game.id] || 0;

              return (
                <div
                  key={game.id}
                  onClick={() => canPlay && handlePlayGame(game.id)}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: `1.5px solid ${isUnlocked ? '#3d4170' : '#252845'}`,
                    background: isUnlocked ? '#252845' : 'rgba(30,32,53,0.4)',
                    opacity: isUnlocked ? 1 : 0.5,
                    cursor: canPlay ? 'pointer' : 'default',
                    filter: isUnlocked ? 'none' : 'grayscale(0.6)',
                    transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
                    display: 'flex', flexDirection: 'column', gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    if (!canPlay) return;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#60a5fa';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(96,165,250,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.borderColor = isUnlocked ? '#3d4170' : '#252845';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: `linear-gradient(135deg, ${game.colorA}, ${game.colorB})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', flexShrink: 0
                    }}>
                      {game.icon}
                    </div>
                    <span style={{
                      fontSize: '10px', fontWeight: 800, borderRadius: '6px', padding: '2px 6px',
                      background: isUnlocked ? 'rgba(96,165,250,0.12)' : 'rgba(100,116,139,0.15)',
                      color: isUnlocked ? '#60a5fa' : '#64748b',
                      border: `1px solid ${isUnlocked ? 'rgba(96,165,250,0.25)' : 'rgba(100,116,139,0.2)'}`,
                    }}>
                      {isUnlocked ? `G#${game.num}` : `W${game.minWeek}+`}
                    </span>
                  </div>

                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#e2e8f0', marginBottom: '3px' }}>
                      {game.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
                      {game.desc}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '11px', flexWrap: 'wrap', gap: '4px'
                  }}>
                    {isUnlocked ? (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Trophy size={11} /> {highScore} pts
                          </span>
                          {bestReactionTimes[game.id] && (
                            <span style={{ color: '#fde047', fontWeight: 800, fontSize: '10px' }}>
                              ⚡ {bestReactionTimes[game.id]}s
                            </span>
                          )}
                          {bestSpeedrunTimes[game.id] && (
                            <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '10px' }}>
                              ⏱️ {bestSpeedrunTimes[game.id]}s
                            </span>
                          )}
                        </div>
                        <span style={{ color: canPlay ? '#60a5fa' : '#374151', fontWeight: 800 }}>
                          {canPlay ? 'Play 3m ▶' : '🔋 No battery'}
                        </span>
                      </>
                    ) : (
                      <span style={{ color: '#4b5563', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Lock size={11} /> Week {game.minWeek}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '12px', borderTop: '1px solid #252845',
          fontSize: '11px', color: '#4b5563', flexWrap: 'wrap', gap: '6px'
        }}>
          <span>🎮 Unlock a new game every 10 weeks · 1 minute per session</span>
          <span style={{ color: '#60a5fa', fontWeight: 700 }}>15m Study → 3m Arcade Battery</span>
        </div>
      </div>
    </div>
  );
}
