import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Map, Trophy, BookOpen, FileText, Settings, LogOut, Flame, Shield, Sparkles, ChevronRight, CheckCircle2, Lock, Printer, Award, Users, Gamepad2, BatteryCharging } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import LexioMascot from '../mascot/LexioMascot';
import useArcadeStore, { getUnlockedGameCount } from '../../stores/useArcadeStore';
import ArcadeModal from '../games/ArcadeModal';
import ClassLeaderboardModal from '../common/ClassLeaderboardModal';
import { getBossRotaryConfig } from '../../config/bossRotarySchedule';
import './QuestSidebar.css';

const TOTAL_TRIPS = 36; // Current syllabus length

export default function QuestSidebar({ isOpen, onClose, currentWeekId = 33, learningMode = 'easy', onToggleMode }) {
  const navigate = useNavigate();
  const [showTripModal, setShowTripModal] = useState(false);
  const [showCoopModal, setShowCoopModal] = useState(false);
  const { isArcadeOpen, setArcadeOpen, playEnergySeconds, studySeconds } = useArcadeStore();
  const unlockedGames = getUnlockedGameCount(currentWeekId);

  const currentUser = useUserStore(state => state.currentUser) || { displayName: 'Young Explorer', role: 'student' };
  const userXP = useUserStore(state => state.userXP !== undefined ? state.userXP : (state.xp || 0));
  const userStreak = useUserStore(state => state.streak) || 3;
  const userLevel = Math.floor(userXP / 300) + 1;

  const STAFF_ROLES = ['admin', 'super_admin', 'teacher', 'team_leader', 'center_director'];
  const isTeacher = STAFF_ROLES.includes(currentUser?.role);
  const isOwner = currentUser?.role === 'owner';

  const arcadeReady = isOwner || playEnergySeconds > 0;
  const arcadeFormatEnergy = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const handleSelectTrip = (tripNum) => {
    setShowTripModal(false);
    onClose();
    navigate(`/week/${tripNum}/hub/1`);
  };

  const handleLogout = () => {
    localStorage.removeItem('engquest_user');
    localStorage.removeItem('engquest-user-storage');
    window.location.href = '/';
  };

  if (!isOpen) return null;

  return (
    <div className="qs-overlay animate-in fade-in duration-200">
      <div className="qs-backdrop" onClick={onClose} />
      
      <aside className="qs-drawer animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="qs-header">
          <div className="qs-brand">
            <span className="qs-brand-fox">🦊</span>
            <div>
              <h2 className="qs-brand-title">LEXIO QUEST</h2>
              <span className="qs-brand-sub">English Adventure 3000</span>
            </div>
          </div>
          <button className="qs-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Hero Profile Card */}
        <div className="qs-profile-card">
          <div className="qs-profile-top">
            <div className="qs-avatar-wrap">
              <LexioMascot size={46} mood="happy" />
            </div>
            <div className="qs-profile-info">
              <div className="qs-hero-name">{currentUser.displayName || 'Young Explorer'}</div>
              <div className="qs-hero-meta">
                <span className="qs-level-badge">Lv. {userLevel} Hero</span>
                <span className="qs-streak-badge">
                  <Flame size={12} className="text-amber-500 fill-amber-500" /> {userStreak}d Streak
                </span>
              </div>
            </div>
          </div>

          <div className="qs-profile-xp-row">
            <div className="qs-xp-text">
              <span>XP: <strong>{userXP}</strong></span>
              <span className="text-slate-400 text-[10px]">Next: {(userLevel * 300)} XP</span>
            </div>
            <div className="qs-xp-bar">
              <div
                className="qs-xp-fill"
                style={{ width: `${Math.min(100, ((userXP % 300) / 300) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="qs-nav-list">
          {/* Choose Your Trip */}
          <button className="qs-nav-item highlight" onClick={() => setShowTripModal(true)}>
            <div className="qs-nav-icon bg-indigo-100 text-indigo-700">
              <Map size={18} />
            </div>
            <div className="qs-nav-text">
              <div className="qs-nav-title">🗺️ Choose Your Trip</div>
              <div className="qs-nav-desc">Currently on Trip {currentWeekId}</div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          {/* Co-op Board */}
          <button className="qs-nav-item" onClick={() => setShowCoopModal(true)}>
            <div className="qs-nav-icon bg-amber-100 text-amber-700">
              <Users size={18} />
            </div>
            <div className="qs-nav-text">
              <div className="qs-nav-title">🏆 Co-op Board & Class</div>
              <div className="qs-nav-desc">Classroom progress & leaderboard</div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          {/* Day 5 Boss & Passport — dynamic cycle label */}
          {(() => {
            const bossConfig = getBossRotaryConfig(currentWeekId);
            const cycleLabel = bossConfig?.cycleNumber === 5
              ? 'Full Mock — All 16 Parts'
              : `Cycle ${bossConfig?.cycleNumber} · ${bossConfig?.activeParts?.length || 4} Parts`;
            return (
              <button
                className="qs-nav-item"
                onClick={() => {
                  onClose();
                  navigate(`/week/${currentWeekId}/task/weekly_review`);
                }}
              >
                <div className="qs-nav-icon bg-emerald-100 text-emerald-700">
                  <Award size={18} />
                </div>
                <div className="qs-nav-text">
                  <div className="qs-nav-title">🏰 Day 5 Boss & Passport</div>
                  <div className="qs-nav-desc">Cambridge assessment · {cycleLabel}</div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            );
          })()}

          {/* Word Treasury / Memory Bank */}
          <button
            className="qs-nav-item"
            onClick={() => {
              onClose();
              navigate('/word-treasury');
            }}
          >
            <div className="qs-nav-icon bg-purple-100 text-purple-700">
              <BookOpen size={18} />
            </div>
            <div className="qs-nav-text">
              <div className="qs-nav-title">📖 Word Treasury</div>
              <div className="qs-nav-desc">SRS vocabulary bank & flashcards</div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          {/* Smart Practice Drills — navigates to standalone SRS drill page */}
          <button
            className="qs-nav-item"
            onClick={() => {
              onClose();
              navigate(`/week/${currentWeekId}/practice`);
            }}
          >
            <div className="qs-nav-icon bg-blue-100 text-blue-700">
              <Sparkles size={18} />
            </div>
            <div className="qs-nav-text">
              <div className="qs-nav-title">📝 Smart Practice Drills</div>
              <div className="qs-nav-desc">SRS flashcard drills & word review</div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>

          {/* Arcade Room */}
          <button
            className="qs-nav-item"
            onClick={() => {
              useArcadeStore.getState().setArcadeOpen(true);
              onClose();
            }}
            style={{ position: 'relative' }}
          >
            <div className={`qs-nav-icon ${arcadeReady ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
              <Gamepad2 size={18} />
            </div>
            <div className="qs-nav-text">
              <div className="qs-nav-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                🕹️ Arcade Room
                {arcadeReady && (
                  <span style={{ fontSize: '9px', background: '#60a5fa', color: '#fff', borderRadius: '8px', padding: '1px 6px', fontWeight: 900, letterSpacing: '0.03em' }}>
                    READY
                  </span>
                )}
              </div>
              <div className="qs-nav-desc">
                {isOwner
                  ? `Owner Mode · ${unlockedGames}/12 games`
                  : arcadeReady
                  ? `Battery: ${arcadeFormatEnergy(playEnergySeconds)} · ${unlockedGames} games`
                  : `Study 15m to unlock · ${unlockedGames} games available`
                }
              </div>
            </div>
            {arcadeReady
              ? <BatteryCharging size={16} className="text-blue-400" style={{ flexShrink: 0 }} />
              : <Lock size={14} className="text-slate-400" style={{ flexShrink: 0 }} />
            }
          </button>

          {/* Teacher's Panel (Only for Staff / Teacher / Owner) */}
          {isTeacher && (
            <div className="qs-teacher-section">
              <div className="qs-section-tag">TEACHER & OWNER TOOLS</div>
              <button
                className="qs-nav-item teacher"
                onClick={() => {
                  onClose();
                  useUserStore.getState().setTeacherPanelOpen(true);
                }}
              >
                <div className="qs-nav-icon bg-blue-100 text-blue-700">
                  <Shield size={18} />
                </div>
                <div className="qs-nav-text">
                  <div className="qs-nav-title">👨‍🏫 Teacher Panel & Lesson Plans</div>
                  <div className="qs-nav-desc">Curriculum, student tracking & tools</div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              {(currentUser?.role === 'super_admin' || currentUser?.role === 'admin' || currentUser?.role === 'owner') && (
                <button
                  className="qs-nav-item teacher"
                  onClick={() => {
                    onClose();
                    window.__openSuperAdminPanel?.();
                  }}
                >
                  <div className="qs-nav-icon bg-amber-100 text-amber-700">
                    <Shield size={18} />
                  </div>
                  <div className="qs-nav-text">
                    <div className="qs-nav-title">👑 Super Admin Panel</div>
                    <div className="qs-nav-desc">Owner licensing & system config</div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
              )}
            </div>
          )}

          {/* Print Worksheet */}
          <button
            className="qs-nav-item"
            onClick={() => {
              onClose();
              navigate(`/week/${currentWeekId}/print`);
            }}
          >
            <div className="qs-nav-icon bg-slate-100 text-slate-700">
              <Printer size={18} />
            </div>
            <div className="qs-nav-text">
              <div className="qs-nav-title">🖨️ Print Worksheets</div>
              <div className="qs-nav-desc">PDF printable for Trip {currentWeekId}</div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </nav>

        {/* Footer Actions */}
        <div className="qs-footer">
          <button
            className="qs-footer-btn"
            onClick={() => {
              if (window.confirm('Reset toàn bộ tiến độ tuần này để làm lại từ đầu?')) {
                window.location.href = window.location.pathname + '?reset=all';
              }
            }}
          >
            <Settings size={14} /> Reset Progress
          </button>
          <button className="qs-footer-btn logout" onClick={handleLogout}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Trip Selector Modal */}
      {showTripModal && (
        <div className="qs-modal-overlay animate-in fade-in duration-200" onClick={() => setShowTripModal(false)}>
          <div className="qs-trip-modal animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="qs-modal-header">
              <div>
                <h3 className="qs-modal-title">🗺️ Choose Your Trip</h3>
                <p className="qs-modal-sub">Select any week to explore its 3D quest adventure</p>
              </div>
              <button className="qs-modal-close" onClick={() => setShowTripModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="qs-trip-grid">
              {Array.from({ length: TOTAL_TRIPS }, (_, i) => i + 1).map(num => {
                const isCurrent = num === currentWeekId;
                return (
                  <button
                    key={num}
                    className={`qs-trip-card ${isCurrent ? 'current' : ''}`}
                    onClick={() => handleSelectTrip(num)}
                  >
                    <div className="qs-trip-num">Trip {num}</div>
                    <div className="qs-trip-tag">{isCurrent ? '🌟 Current' : `Week ${num}`}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Co-op Board Modal (Canonical Phase 2D standard) */}
      <ClassLeaderboardModal isOpen={showCoopModal} onClose={() => setShowCoopModal(false)} />
    </div>
  );
}
