/**
 * ChroniclesWorldMap.jsx — The Lexio Chronicles weekly map
 *
 * Shows 5 Daily Rooms + Boss Chamber for the current week.
 * Rooms unlock when the corresponding zone (day) is completed.
 * Boss Chamber unlocks at 150+ Power Points.
 */

import React, { useMemo, useState } from 'react';
import useChroniclesStore, {
  getChapterForWeek,
  BOSS_ACCESS_THRESHOLDS,
  MAX_PP_PER_WEEK,
  CHAMBER_METADATA,
} from '../../stores/useChroniclesStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import { useUserStore } from '../../stores/useUserStore';
import MascotShopPanel from './MascotShopPanel';
import ChapterFragmentPanel from './ChapterFragmentPanel';
import HallOfFameModal from './HallOfFameModal';
import { FEATURES } from '../../config/featureFlags';
import PhaserGameCanvas from '../../phaser/PhaserGameCanvas';
import HubScene from '../../phaser/scenes/HubScene';
import './ChroniclesWorldMap.css';

// ─── Room Node ─────────────────────────────────────────────────────────────

function RoomNode({ dayIndex, weekNumber, isUnlocked, isCompleted, totalStars, onClick }) {
  const chamber = CHAMBER_METADATA[dayIndex] || { chamberName: `Chamber ${dayIndex + 1}`, chamberEn: `Floor ${dayIndex + 1}`, icon: '🏰', zoneRef: `Day ${dayIndex + 1}` };
  const status = isCompleted ? 'completed' : isUnlocked ? 'unlocked' : 'locked';

  return (
    <button
      className={`cwm-room-node day-${dayIndex} ${status}`}
      onClick={() => isUnlocked && onClick(dayIndex)}
      disabled={!isUnlocked}
      aria-label={`${chamber.chamberName} — ${status}`}
    >
      <div className="cwm-room-icon">{chamber.icon}</div>
      <div className="cwm-room-label">Floor {dayIndex + 1}</div>
      <div className="cwm-room-sub">{chamber.chamberName}</div>

      {/* Stars */}
      {isCompleted && (
        <div className="cwm-room-stars">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <span key={n} className={`cwm-star ${n <= totalStars ? 'earned' : ''}`}>★</span>
          ))}
        </div>
      )}

      {/* Status badge */}
      {status === 'locked' && <div className="cwm-lock-badge">🔒</div>}
      {status === 'unlocked' && <div className="cwm-enter-badge">⚡ Enter Chamber</div>}
      {status === 'completed' && <div className="cwm-done-badge">✓ Completed</div>}
    </button>
  );
}

// ─── Boss Chamber Node ─────────────────────────────────────────────────────

function BossChamberNode({ weekNumber, tier, weeklyPP, isBossDefeated, isOwnerBypass, onClick }) {
  const isUnlocked = isOwnerBypass || tier !== 'none';
  const effectiveTier = (isOwnerBypass && tier === 'none') ? 'gold' : tier;
  const tierColors = { none: '#6b7280', bronze: '#b45309', silver: '#6b7280', gold: '#d97706' };
  const tierLabels = {
    none: isOwnerBypass ? '👑 Test Access (Gold)' : '🔒 Need 150⚡',
    bronze: '🥉 Bronze',
    silver: '🥈 Silver',
    gold: isOwnerBypass && tier === 'none' ? '👑 Test Access (Gold)' : '🥇 Gold',
  };

  return (
    <button
      className={`cwm-boss-node ${isUnlocked ? 'unlocked' : 'locked'} ${isBossDefeated ? 'defeated' : ''}`}
      onClick={() => isUnlocked && onClick(effectiveTier)}
      disabled={!isUnlocked}
      style={{ '--tier-color': tierColors[effectiveTier] }}
    >
      <div className="cwm-boss-icon">👾</div>
      <div className="cwm-boss-label">Storm Titan Guardian</div>
      <div className="cwm-boss-sub">Weekly Boss Battle</div>
      <div className="cwm-boss-tier" style={{ color: tierColors[effectiveTier] }}>
        {tierLabels[effectiveTier]}
      </div>
      {isBossDefeated && <div className="cwm-boss-defeated">⚔️ DEFEATED</div>}
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function ChroniclesWorldMap({ weekNumber, onEnterRoom, onEnterBoss }) {
  const {
    isRoomUnlocked,
    getRoomStars,
    getTotalWeekStars,
    getWeeklyPP,
    getBossAccessTier,
    isBossDefeated,
    unlockRoom,
  } = useChroniclesStore();

  const { isDayComplete } = useDailyQuestStore();

  const chapter = useMemo(() => getChapterForWeek(weekNumber), [weekNumber]);
  const weeklyPP = getWeeklyPP(weekNumber);
  const totalStars = getTotalWeekStars(weekNumber);
  const bossTier = getBossAccessTier(weekNumber);
  const bossDefeated = isBossDefeated(weekNumber);

  const { currentUser } = useUserStore();
  const BYPASS_ROLES = ['super_admin', 'admin', 'teacher', 'team_leader', 'center_director'];
  const isOwnerBypass = BYPASS_ROLES.includes(currentUser?.role) || (typeof window !== 'undefined' && localStorage.getItem('arcade_owner_bypass') === 'true');

  const [activeTab, setActiveTab] = useState('map');
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const lexioCoins = useChroniclesStore((s) => s.lexioCoins || 0);
  const chapterFragKey = `chapter${chapter.id}`;
  const fragmentsCount = useChroniclesStore((s) => s.bossFragments[chapterFragKey] || 0);

  // Sync room unlock with zone completion
  // Day 1 (dayIndex=0) is ALWAYS accessible, like the quest map.
  // Other days unlock when the previous day's zone is complete.
  React.useEffect(() => {
    // Day 1 always unlocked
    if (!isRoomUnlocked(weekNumber, 0)) {
      unlockRoom(weekNumber, 0);
    }
    for (let d = 1; d < 5; d++) {
      if (isDayComplete(weekNumber, d) && !isRoomUnlocked(weekNumber, d)) {
        // d here is the previous day (1-based) = dayIndex d
        unlockRoom(weekNumber, d);
      }
    }
  }, [weekNumber]); // eslint-disable-line

  // PP bar
  const ppPct = Math.min((weeklyPP / MAX_PP_PER_WEEK) * 100, 100);
  const ppBronzePct = (BOSS_ACCESS_THRESHOLDS.bronze / MAX_PP_PER_WEEK) * 100;
  const ppSilverPct = (BOSS_ACCESS_THRESHOLDS.silver / MAX_PP_PER_WEEK) * 100;
  const ppGoldPct  = (BOSS_ACCESS_THRESHOLDS.gold  / MAX_PP_PER_WEEK) * 100;

  return (
    <div className={`chronicles-world-map theme-${chapter.theme}`}>
      {/* Chapter Header */}
      <div className="cwm-chapter-header" style={{ '--wing-color': chapter.wingColor }}>
        <div className="cwm-chapter-icon">🦊</div>
        <div className="cwm-chapter-info">
          <h2 className="cwm-chapter-title">Chapter {chapter.id}: {chapter.title}</h2>
          <p className="cwm-chapter-crystal">{chapter.crystal}</p>
        </div>
        <div className="cwm-week-badge">Week {weekNumber}</div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="cwm-tab-bar">
        <button
          className={`cwm-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <span>🗺️ Map</span>
        </button>
        <button
          className={`cwm-tab-btn ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          <span>🛍️ Mascot Shop</span>
          <span className="cwm-tab-coin-badge">🪙 {lexioCoins}</span>
        </button>
        <button
          className={`cwm-tab-btn ${activeTab === 'fragments' ? 'active' : ''}`}
          onClick={() => setActiveTab('fragments')}
        >
          <span>💎 Fragments</span>
          <span className="cwm-tab-frag-badge">{fragmentsCount}/4</span>
        </button>
        <button
          className="cwm-tab-btn"
          onClick={() => setShowHallOfFame(true)}
        >
          <span>🏆 Hall of Fame</span>
        </button>
        <button
          className="cwm-tab-btn"
          style={{ fontSize: '11px', opacity: 0.85, background: FEATURES.PHASER_HUB_WORLD ? 'rgba(99, 102, 241, 0.2)' : 'transparent' }}
          onClick={() => {
            const next = !FEATURES.PHASER_HUB_WORLD;
            localStorage.setItem('ff_phaser_hub', next.toString());
            window.location.reload();
          }}
          title="Toggle Phaser 2D Hub Engine vs Legacy Grid"
        >
          <span>{FEATURES.PHASER_HUB_WORLD ? '🎮 Hub: 2D' : '📱 Hub: Grid'}</span>
        </button>
      </div>

      {activeTab === 'shop' && <MascotShopPanel weekNumber={weekNumber} />}
      {activeTab === 'fragments' && <ChapterFragmentPanel weekNumber={weekNumber} />}

      {activeTab === 'map' && (
        <>
      {/* Power Points Bar */}
      <div className="cwm-pp-section">
        <div className="cwm-pp-label">
          <span>⚡ Power Points</span>
          <span className="cwm-pp-value">{weeklyPP} / {MAX_PP_PER_WEEK}</span>
        </div>
        <div className="cwm-pp-bar">
          <div className="cwm-pp-fill" style={{ width: `${ppPct}%` }} />
          {/* Threshold markers */}
          <div className="cwm-pp-marker bronze" style={{ left: `${ppBronzePct}%` }}>
            <span>🥉</span>
          </div>
          <div className="cwm-pp-marker silver" style={{ left: `${ppSilverPct}%` }}>
            <span>🥈</span>
          </div>
          <div className="cwm-pp-marker gold" style={{ left: `${ppGoldPct}%` }}>
            <span>🥇</span>
          </div>
        </div>
        <div className="cwm-pp-hint">
          {bossTier === 'none'
            ? `Earn ${BOSS_ACCESS_THRESHOLDS.bronze - weeklyPP} more ⚡ to unlock Boss Chamber`
            : `Boss unlocked at ${bossTier} tier!`}
        </div>
      </div>

      {/* Stars Summary */}
      <div className="cwm-stars-summary">
        <span className="cwm-stars-icon">⭐</span>
        <span className="cwm-stars-text">{totalStars} / 45 stars this week</span>
      </div>

      {FEATURES.PHASER_HUB_WORLD ? (
        <div
          className="cwm-phaser-hub-wrapper"
          style={{
            width: '100%',
            height: '520px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1.5px solid rgba(99, 102, 241, 0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            marginBottom: '20px',
          }}
        >
          <PhaserGameCanvas
            sceneClass={HubScene}
            sceneData={{
              weekNumber,
              weeklyPP,
              bossTier,
            }}
            onSceneEvent={(eventName, data) => {
              if (eventName === 'door_enter') {
                if (data.isBoss) {
                  if (onEnterBoss) onEnterBoss(bossTier);
                } else {
                  if (onEnterRoom) onEnterRoom(data.dayIndex);
                }
              }
            }}
          />
        </div>
      ) : (
        <>
          {/* 5 Room Nodes */}
          <div className="cwm-rooms-grid" style={{ paddingLeft: 16, paddingRight: 16 }}>
            {CHAMBER_METADATA.map((_, idx) => {
              // Day 1 always unlocked; other days: owner bypass OR previous zone complete OR manually unlocked
              const unlocked = idx === 0
                ? true
                : isOwnerBypass || isRoomUnlocked(weekNumber, idx) || isDayComplete(weekNumber, idx);
              const stars = getRoomStars(weekNumber, idx);
              const completed = stars > 0;
              return (
                <React.Fragment key={idx}>
                  <RoomNode
                    dayIndex={idx}
                    weekNumber={weekNumber}
                    isUnlocked={unlocked}
                    isCompleted={completed}
                    totalStars={stars}
                    onClick={(di) => onEnterRoom && onEnterRoom(di)}
                  />
                  {/* Path connector between rooms */}
                  {idx < 4 && (
                    <div className={`cwm-path-connector ${unlocked ? 'lit' : 'dim'}`}>
                      <span>···</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Boss Chamber */}
          <div className="cwm-boss-section">
            <div className="cwm-boss-path">▼</div>
            <BossChamberNode
              weekNumber={weekNumber}
              tier={bossTier}
              weeklyPP={weeklyPP}
              isBossDefeated={bossDefeated}
              isOwnerBypass={isOwnerBypass}
              onClick={(selectedTier) => onEnterBoss && onEnterBoss(selectedTier || bossTier)}
            />
          </div>
        </>
      )}

      {/* Footer */}
      <div className="cwm-footer">
        <p className="cwm-footer-hint">
          Complete daily quest zones to unlock the next challenge tower floor 🔓
        </p>
      </div>
        </>
      )}
      
      {/* Speedrunner Hall of Fame Modal */}
      <HallOfFameModal
        isOpen={showHallOfFame}
        onClose={() => setShowHallOfFame(false)}
      />
    </div>
  );
}
