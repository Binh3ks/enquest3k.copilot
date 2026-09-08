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
import ThreeHubCanvas from './three/ThreeHubCanvas';
import './ChroniclesWorldMap.css';

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
  const BYPASS_ROLES = ['owner', 'super_admin', 'admin', 'teacher', 'team_leader', 'center_director'];
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [bypassOverride, setBypassOverride] = useState(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('arcade_owner_bypass');
    return stored !== null ? stored === 'true' : null;
  });

  const isOwnerBypass = Boolean(
    bypassOverride !== null ? bypassOverride : (
      BYPASS_ROLES.includes(currentUser?.role) ||
      currentUser?.displayName === 'Bình' ||
      currentUser?.email?.toLowerCase().includes('binh') ||
      (typeof window !== 'undefined' && (
        localStorage.getItem('arcade_owner_bypass') === 'true' ||
        urlParams?.get('bypass') === 'true' ||
        urlParams?.get('owner') === 'true' ||
        urlParams?.get('test') === 'true'
      ))
    )
  );

  const toggleBypass = () => {
    const next = !isOwnerBypass;
    if (typeof window !== 'undefined') {
      localStorage.setItem('arcade_owner_bypass', next ? 'true' : 'false');
    }
    setBypassOverride(next);
  };

  // Auto-persist bypass flag if present in URL
  React.useEffect(() => {
    if (urlParams?.get('bypass') === 'true' || urlParams?.get('owner') === 'true') {
      localStorage.setItem('arcade_owner_bypass', 'true');
      setBypassOverride(true);
    }
  }, [urlParams]);

  const [activeTab, setActiveTab] = useState('map');
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const lexioCoins = useChroniclesStore((s) => s.lexioCoins || 0);
  const chapterFragKey = `chapter${chapter.id}`;
  const fragmentsCount = useChroniclesStore((s) => s.bossFragments[chapterFragKey] || 0);

  // Cleanup any legacy toggle flags from localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('ff_phaser_hub')) {
      localStorage.removeItem('ff_phaser_hub');
    }
  }, []);

  // Sync room unlock with zone completion
  // When owner bypass is active, unlock all 5 chambers immediately
  React.useEffect(() => {
    if (isOwnerBypass) {
      for (let d = 0; d < 5; d++) {
        if (!isRoomUnlocked(weekNumber, d)) {
          unlockRoom(weekNumber, d);
        }
      }
      return;
    }

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
  }, [weekNumber, isOwnerBypass]); // eslint-disable-line

  // PP bar
  const effectiveBossTier = (isOwnerBypass && bossTier === 'none') ? 'gold' : bossTier;
  const effectivePP = isOwnerBypass ? Math.max(weeklyPP, 360) : weeklyPP;
  const ppPct = Math.min((effectivePP / MAX_PP_PER_WEEK) * 100, 100);
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
        <div className="cwm-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className={`cwm-owner-badge ${isOwnerBypass ? 'unlocked' : ''}`}
            onClick={toggleBypass}
            title="Owner & Dev: Click to toggle unlocking all rooms & Boss for testing"
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: isOwnerBypass ? '1px solid #10b981' : '1px solid #6366f1',
              background: isOwnerBypass ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
              color: isOwnerBypass ? '#34d399' : '#a5b4fc',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
            }}
          >
            {isOwnerBypass ? '👑 Owner: Unlocked ✓' : '🔓 Unlock All (Test)'}
          </button>
          <div className="cwm-week-badge">Week {weekNumber}</div>
        </div>
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
      </div>

      {activeTab === 'shop' && <MascotShopPanel weekNumber={weekNumber} />}
      {activeTab === 'fragments' && <ChapterFragmentPanel weekNumber={weekNumber} />}

      {activeTab === 'map' && (
        <>
      {/* Power Points Bar */}
      <div className="cwm-pp-section">
        <div className="cwm-pp-label">
          <span>⚡ Power Points</span>
          <span className="cwm-pp-value">{effectivePP} / {MAX_PP_PER_WEEK}</span>
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
          {isOwnerBypass
            ? '👑 Owner Mode Active: All 5 Chambers & Boss Gate Unlocked for Testing!'
            : bossTier === 'none'
              ? `Earn ${BOSS_ACCESS_THRESHOLDS.bronze - weeklyPP} more ⚡ to unlock Boss Chamber`
              : `Boss unlocked at ${bossTier} tier!`}
        </div>
      </div>

      {/* Stars Summary */}
      <div className="cwm-stars-summary">
        <span className="cwm-stars-icon">⭐</span>
        <span className="cwm-stars-text">{totalStars} / 45 stars this week</span>
      </div>

      <div
        className="cwm-phaser-hub-wrapper"
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '500px',
          margin: '0 auto 20px auto',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '2px solid rgba(99, 102, 241, 0.5)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
        }}
      >
        <ThreeHubCanvas
          weekNumber={weekNumber}
          weeklyPP={effectivePP}
          bossTier={effectiveBossTier}
          isBossDefeated={bossDefeated}
          isOwnerBypass={!!isOwnerBypass}
          roomStatuses={CHAMBER_METADATA.map((m, idx) => ({
            dayIndex: idx,
            chamberName: m.chamberName,
            chamberEn: m.chamberEn,
            icon: m.icon,
            unlocked: isOwnerBypass || idx === 0 || isRoomUnlocked(weekNumber, idx) || isDayComplete(weekNumber, idx),
            stars: getRoomStars(weekNumber, idx),
            completed: getRoomStars(weekNumber, idx) > 0,
          }))}
          onPortalEnter={(portalData) => {
            if (portalData?.isBoss) {
              if (onEnterBoss) onEnterBoss(effectiveBossTier);
            } else if (portalData?.dayIndex !== undefined) {
              if (onEnterRoom) onEnterRoom(portalData.dayIndex);
            }
          }}
        />
      </div>

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
