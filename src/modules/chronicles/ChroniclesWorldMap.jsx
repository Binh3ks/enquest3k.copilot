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
import MascotShopPanel from './MascotShopPanel';
import ChapterFragmentPanel from './ChapterFragmentPanel';
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
      <div className="cwm-room-label">Tầng {dayIndex + 1}</div>
      <div className="cwm-room-sub">{chamber.chamberName}</div>
      <div className="cwm-room-zone-ref">({chamber.chamberEn})</div>

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
      {status === 'unlocked' && <div className="cwm-enter-badge">⚡ Vào chơi</div>}
      {status === 'completed' && <div className="cwm-done-badge">✓ Hoàn thành</div>}
    </button>
  );
}

// ─── Boss Chamber Node ─────────────────────────────────────────────────────

function BossChamberNode({ weekNumber, tier, weeklyPP, isBossDefeated, onClick }) {
  const isUnlocked = tier !== 'none';
  const tierColors = { none: '#6b7280', bronze: '#b45309', silver: '#6b7280', gold: '#d97706' };
  const tierLabels = { none: '🔒 Cần 150⚡', bronze: '🥉 Bronze', silver: '🥈 Silver', gold: '🥇 Gold' };

  return (
    <button
      className={`cwm-boss-node ${isUnlocked ? 'unlocked' : 'locked'} ${isBossDefeated ? 'defeated' : ''}`}
      onClick={() => isUnlocked && onClick()}
      disabled={!isUnlocked}
      style={{ '--tier-color': tierColors[tier] }}
    >
      <div className="cwm-boss-icon">👾</div>
      <div className="cwm-boss-label">Hộ Vệ Bão Tố</div>
      <div className="cwm-boss-sub">Storm Titan Boss</div>
      <div className="cwm-boss-tier" style={{ color: tierColors[tier] }}>
        {tierLabels[tier]}
      </div>
      {isBossDefeated && <div className="cwm-boss-defeated">⚔️ ĐÃ HẠ GỤC</div>}
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

  const [activeTab, setActiveTab] = useState('map');
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

      {/* 5 Room Nodes */}
      <div className="cwm-rooms-grid" style={{ paddingLeft: 16, paddingRight: 16 }}>
        {CHAMBER_METADATA.map((_, idx) => {
          // Day 1 always unlocked; other days: previous zone complete OR manually unlocked
          const unlocked = idx === 0
            ? true
            : isRoomUnlocked(weekNumber, idx) || isDayComplete(weekNumber, idx);
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
          onClick={() => onEnterBoss && onEnterBoss(bossTier)}
        />
      </div>

      {/* Footer */}
      <div className="cwm-footer">
        <p className="cwm-footer-hint">
          Hoàn thành nhiệm vụ bài học mỗi ngày để mở khóa Tầng Tháp thử thách tiếp theo 🔓
        </p>
      </div>
        </>
      )}
    </div>
  );
}
