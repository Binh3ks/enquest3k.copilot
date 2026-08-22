import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import NovaMascot from './components/NovaMascot';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Printer, Gauge, Sparkles, BookOpen, Swords, PenTool, Radio } from 'lucide-react';

// STORES & API
import { useUserStore } from './stores/useUserStore';
import { progressAPI } from './services/api';
import useTTSStore from './stores/useTTSStore';

// CONFIG & CONSTANTS
import { MODULE_COMPONENTS, STATIONS, TAB_TO_STATION_ID, STATION_ID_TO_TAB } from './config/stationConfig';

// UTILS & COMPONENTS
import { useFetchWeekData, useStationData } from './utils/dataHooks';
import { loadVoices } from './utils/AudioHelper'; // Import loadVoices
import { initGlobalClickSound } from './utils/soundEffects';
import { replayJournal, installUnloadFlush, recoverFromLocalStorage } from './utils/progressBackup';
import { TTSWeekPrefetch } from './services/ttsWeekPrefetch'; // Week-wide TTS prefetch
import LoginScreen from './components/auth/LoginScreen';
import LandingPage from './components/auth/LandingPage';
import AIProviderStatus from './components/common/AIProviderStatus';
import SettingsModal from './components/common/SettingsModal';
import ProfileModal from './components/common/ProfileModal';
import AppIntroModal from './components/common/AppIntroModal';
import QADebugDrawer from './components/debug/QADebugDrawer';
import HeaderProfileMenu from './components/common/HeaderProfileMenu';
import CompletionCard from './components/common/CompletionCard';
import CollectionBoard from './pages/CollectionBoard';
import AvatarCloset from './components/avatar/AvatarCloset';
import Sidebar from './components/layout/Sidebar';
import QuestSidebar from './components/questmap/QuestSidebar';
import AITutorWidget from './modules/ai_tutor/AITutorWidget';
import TutorWindow from './modules/ai_tutor/components/TutorWindow';
import useTutorStore from './services/ai_tutor/tutorStore';
import SandboxQAPanel from './components/common/SandboxQAPanel';
import SaveToast from './components/common/SaveToast';

import AutoSaveIndicator from './components/common/AutoSaveIndicator';
import CongratulationsModal from './components/common/CongratulationsModal';
import PlacementTest from './components/PlacementTest';
import CheckpointAssessment from './components/CheckpointAssessment';
import PeriodicAssessmentModal from './components/assessment/PeriodicAssessmentModal';
import ChildrenManager from './components/parent/ChildrenManager';
import { getWeekCEFR, MILESTONE_WEEKS } from './data/weekData';
import { evaluateSpeakingNudge } from './utils/adaptiveEngine';
import { recordDailyStreak } from './utils/progressReport';
import { generateSmartReviewAsync } from './utils/srsGenerator';
import EncounterOverlay from './components/encounter/EncounterOverlay';
import UnboxAnimation from './components/avatar/UnboxAnimation';
import Station2Hub from './modules/hubs/station2/Station2Hub';
import WorldDiscoveryHub from './modules/cambridge_suite/WorldDiscoveryHub';
import ArenaHub from './modules/cambridge_suite/ArenaHub';
import WritingStudioHub from './modules/cambridge_suite/WritingStudioHub';
import NovaTalkShowHub from './modules/cambridge_suite/NovaTalkShowHub';
import StoryWorldZone from './modules/zones/StoryWorldZone';
import BattleArenaZone from './modules/zones/BattleArenaZone';
import CreatorStudioZone from './modules/zones/CreatorStudioZone';
import BossBattleZone from './modules/zones/BossBattleZone';
import { mapDataToZones } from './config/zoneDataMapper';
import TodayQuestBar from './components/common/TodayQuestBar';
import QuestMap from './components/common/QuestMap';
import QuestMap3D from './components/questmap/QuestMap3D';
import TaskScreen from './components/questmap/TaskScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import SubscriptionModal from './components/subscription/SubscriptionModal';
import useArcadeStore from './stores/useArcadeStore';
import ArcadeModal from './components/games/ArcadeModal';
import ArcadeBreakPromptModal from './components/games/ArcadeBreakPromptModal';

// Lazy-loaded heavy pages
const GameHub = React.lazy(() => import('./pages/GameHub/GameHub'));
const ParentDashboard = React.lazy(() => import('./pages/ParentDashboard'));
const WordTreasury = React.lazy(() => import('./pages/WordTreasury'));
const AdminDashboard = React.lazy(() => import('./components/common/AdminDashboard'));
const WorksheetGenerator = React.lazy(() => import('./components/common/WorksheetGenerator'));
import week33Data from './data/weeks/week_33/index.js';
import { getCollectionByWeek } from './data/collectionConfig';

// Lazy-load checkpoint data only for the 4 checkpoint weeks
const CHECKPOINT_WEEKS = [14, 26, 36, 54];
const checkpointLoaders = {
  14: () => import('./data/checkpoints/checkpoint_w14.js'),
  26: () => import('./data/checkpoints/checkpoint_w26.js'),
  36: () => import('./data/checkpoints/checkpoint_w36.js'),
  54: () => import('./data/checkpoints/checkpoint_w54.js'),
};

const StationLoading = () => <div className="p-10 text-center text-slate-400 font-black italic">Station loading...</div>;

const RootRedirect = () => {
  const { login, register, guestLogin } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    if (res?.success) {
      const user = res.user || useUserStore.getState().currentUser;
      if (user?.role === 'parent') {
        navigate('/dashboard');
      } else {
        navigate('/week/33/read_explore');
      }
    }
    return res;
  };

  const handleGuest = () => {
    guestLogin();
    navigate('/week/33/read_explore');
  };

  const handleRegister = async (data) => {
    const res = await register(data);
    if (res?.success) {
      navigate('/week/33/read_explore');
    }
    return res;
  };

  return (
    <LandingPage
      onLogin={handleLogin}
      onRegister={handleRegister}
      onGuestLogin={handleGuest}
    />
  );
};

const ParentChildrenPage = () => {
  const currentUser = useUserStore(state => state.currentUser);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Lexio · Gói Gia Đình</p>
          <h1 className="text-base font-black text-slate-800">👨‍👩‍👧‍👦 Quản lý tài khoản con</h1>
        </div>
      </header>
      <ChildrenManager currentUser={currentUser} />
    </div>
  );
};

const STAFF_ROLES = ['owner', 'admin', 'super_admin', 'teacher', 'team_leader', 'center_director'];

/**
 * TaskRoute — Dedicated, isolated route handler for /week/:weekId/task/:taskId
 * 100% pure React lifecycle — zero conditional early returns before hooks!
 */
const TaskRoute = () => {
  const params = useParams();
  const weekId = parseInt(params.weekId || 33);
  const { learningMode, currentUser } = useUserStore();
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('engquest_onboarded'));
  const isOwner = currentUser?.role === 'owner' || currentUser?.displayName === 'Bình' || currentUser?.email?.includes('binh') || localStorage.getItem('arcade_owner_bypass') === 'true';
  const isStaffOrOwner = isOwner || STAFF_ROLES.includes(currentUser?.role);
  const effectiveShowOnboarding = showOnboarding && !isStaffOrOwner;

  const { data: weekData, loading: isWeekDataLoading } = useFetchWeekData(weekId, learningMode);

  if (isWeekDataLoading && !weekData) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="text-5xl mb-4 animate-bounce">🧭</div>
        <p className="font-black text-lg text-amber-400">Loading Quest...</p>
      </div>
    );
  }

  const mappedZones = mapDataToZones(weekData, weekId);

  return (
    <>
      {effectiveShowOnboarding && <OnboardingFlow onComplete={() => setShowOnboarding(false)} />}
      <TaskScreen weekData={mappedZones} weekId={weekId} />
    </>
  );
};

/**
 * QuestMapRoute — Dedicated, isolated route handler for /week/:weekId/hub/:hubId
 * 100% pure React lifecycle.
 */
const QuestMapRoute = () => {
  const params = useParams();
  const weekId = parseInt(params.weekId || 33);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, learningMode, toggleLearningMode } = useUserStore();
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('engquest_onboarded'));
  const isOwner = currentUser?.role === 'owner' || currentUser?.displayName === 'Bình' || currentUser?.email?.includes('binh') || localStorage.getItem('arcade_owner_bypass') === 'true';
  const isStaffOrOwner = isOwner || STAFF_ROLES.includes(currentUser?.role);
  const effectiveShowOnboarding = showOnboarding && !isStaffOrOwner;

  const { isArcadeOpen, setArcadeOpen, showBreakPrompt, dismissBreakPrompt } = useArcadeStore();

  return (
    <>
      {effectiveShowOnboarding && <OnboardingFlow onComplete={() => setShowOnboarding(false)} />}
      <QuestMap3D
        weekId={weekId}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
      />
      <QuestSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentWeekId={weekId}
        learningMode={learningMode}
        onToggleMode={toggleLearningMode}
      />
      <ArcadeModal
        isOpen={isArcadeOpen}
        weekNumber={weekId}
        ownerBypass={isOwner}
        onClose={() => setArcadeOpen(false)}
      />
      <ArcadeBreakPromptModal
        isOpen={showBreakPrompt}
        onPlay={() => {
          dismissBreakPrompt();
          setArcadeOpen(true);
        }}
        onSkip={dismissBreakPrompt}
      />
    </>
  );
};

const App = () => {
  const [isSandboxQAOpen, setIsSandboxQAOpen] = useState(false);

  useEffect(() => {
    initGlobalClickSound();
    window.__openSandboxQA = () => setIsSandboxQAOpen(true);
  }, []);

  return (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/placement" element={<PlacementTest />} />
      <Route path="/placementtest" element={<PlacementTest />} />
      <Route path="/parent/children" element={<ParentChildrenPage />} />
      <Route path="/week/:weekId" element={<QuestMapRoute />} />
      <Route path="/week/:weekId/hub/:hubId" element={<QuestMapRoute />} />
      <Route path="/week/:weekId/task/:taskId" element={<TaskRoute />} />
      <Route path="/week/:weekId/:tabKey" element={<MainLayout />} />

      <Route path="/gamehub/:weekId" element={<GameHubLayout />} />
      <Route path="/collection" element={<CollectionBoard />} />
      <Route path="/word-treasury" element={<WordTreasury />} />
      <Route path="/hub/station-1" element={<WorldDiscoveryHub data={week33Data?.readingHub} weekNumber={33} />} />
      <Route path="/hub/station-2" element={<ArenaHub data={week33Data?.listeningHub} weekNumber={33} />} />
      <Route path="/hub/station-3" element={<WritingStudioHub data={week33Data?.writingHub} weekNumber={33} />} />
      <Route path="/hub/station-4" element={<NovaTalkShowHub data={week33Data?.speakingHub} weekNumber={33} />} />
    </Routes>
    
    {/* Global AI Tutor Widget - V5 Premium */}
    <AITutorWidget />

    {/* Production Sandbox QA Tools Panel */}
    <SandboxQAPanel isOpen={isSandboxQAOpen} onClose={() => setIsSandboxQAOpen(false)} />
  </Router>
);
};


const MainLayout = ({ isTaskMode = false }) => {
  // Global state from Zustand store
  const { 
    currentUser, 
    token,
    learningMode, 
    login, 
    register, 
    updateProfile,
    guestLogin, 
    logout, 
    toggleLearningMode,
    weekCompletion,
    earnedBadges,
  } = useUserStore();

  // Local UI and data state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isAvatarClosetOpen, setIsAvatarClosetOpen] = useState(false);
  const [isEncounterOpen, setIsEncounterOpen] = useState(false);
  const [completedCollectionId, setCompletedCollectionId] = useState(null);
  const [isVi, setIsVi] = useState(false);
  const [weekProgress, setWeekProgress] = useState({});
  const [saveToastStatus, setSaveToastStatus] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showCompletionCard, setShowCompletionCard] = useState(false);
  // Station progressive reveal — always start collapsed (session-only)
  const [stationsExpanded, setStationsExpanded] = useState(false);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  const [reviewItems, setReviewItems] = useState([]);
  const [checkpointData, setCheckpointData] = useState(null);
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [speakingNudge, setSpeakingNudge] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('engquest_onboarded'));
  const [pendingAssessment, setPendingAssessment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const scrollContainerRef = useRef(null);

  const { speed: ttsSpeed, speedPresets, setSpeed: setTTSSpeed } = useTTSStore();
  const { isWidgetOpen } = useTutorStore();
  const { isArcadeOpen, setArcadeOpen, showBreakPrompt, dismissBreakPrompt } = useArcadeStore();
  
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const weekId = parseInt(params.weekId || 33);
  const hubId = params.hubId;

  let tabKey = params.tabKey || 'read_explore';
  if (hubId) {
    tabKey = `hub${hubId}`;
  }

  // Redirect legacy W01-32 or default station URLs to clean /week/:weekId/hub/1 for Week 33+
  useEffect(() => {
    if (weekId < 33) {
      navigate('/week/33/hub/1', { replace: true });
    } else if (tabKey === 'read_explore' || tabKey === 'hub1' || !tabKey) {
      navigate(`/week/${weekId}/hub/1`, { replace: true });
    }
  }, [weekId, tabKey, navigate]);

  // ?reset=all → clear all onboarding/quest/PIN/consent data and reload
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('reset') === 'all') {
      ['engquest_onboarded', 'engquest-daily-quest', 'engquest_parent_pin',
       'engquest_voice_consent', 'engquest_placement_mode'].forEach(k => localStorage.removeItem(k));
      console.log('✅ All progress reset!');
      window.location.href = window.location.pathname; // reload without ?reset=all
    }
  }, [location.search]);

  
  const { data: weekData, loading: isWeekDataLoading, error: weekDataError } = useFetchWeekData(weekId, learningMode);
  const stationData = useStationData(tabKey, weekData);
  // GameHub and word_match need full weekData, others use station-specific data
  const matchData = (tabKey === 'word_match' || tabKey === 'game_hub') ? weekData : stationData;
  
  // 🧠 Adaptive Engine — evaluate speaking nudge on week change
  useEffect(() => {
    if (currentUser && currentUser.role !== 'guest') {
      const { showSpeakingNudge } = evaluateSpeakingNudge(weekId);
      setSpeakingNudge(showSpeakingNudge);
      recordDailyStreak();
    }
  }, [weekId, currentUser]);

  // 💡 Option-suggestion fade: W1-16 hints ON (scaffolding), W17+ hints OFF (production)
  useEffect(() => {
    useTutorStore.getState().setHintsForWeek(weekId);
  }, [weekId]);

  // 🎁 Collection completion detection — triggers UnboxAnimation
  // Reset the celebrated set when the active user changes (e.g. logout/login)
  // so each user gets their own first-time celebration.
  const celebratedCollections = useRef(new Set());
  const celebratedUserId = useRef(null);
  useEffect(() => {
    const userId = currentUser?.id || currentUser?._id || null;
    if (userId !== celebratedUserId.current) {
      celebratedCollections.current = new Set();
      celebratedUserId.current = userId;
    }
    if (!weekId) return;
    const col = getCollectionByWeek(weekId);
    if (!col) return;
    const allComplete = col.weekRange.every((w) => (weekCompletion[w] || 0) >= 100);
    if (allComplete && !celebratedCollections.current.has(col.id)) {
      celebratedCollections.current.add(col.id);
      setCompletedCollectionId(col.id);
    }
  }, [weekCompletion, weekId, currentUser?.id, currentUser?._id]);

  // 🚀 Single prefetch entry point — cancel old week first, then start new one
  useEffect(() => {
    if (weekData && !isWeekDataLoading) {
      const isEasy = learningMode === 'easy';
      console.log(`[App] 🚀 Prefetch Week ${weekId} (${isEasy ? 'EASY' : 'ADVANCED'}), station: ${tabKey}`);
      TTSWeekPrefetch.cancel(); // stop any in-flight prefetch from previous week
      TTSWeekPrefetch.initialize(weekId, isEasy, tabKey).catch(err => {
        console.warn('[App] Week prefetch failed:', err);
      });
    }
  }, [weekId, learningMode]); // only re-run when week or mode changes, not on every tab switch

  const overallWeekProgress = useMemo(() => {
      const stations = STATIONS.filter(s => s.key !== 'review');
      if (stations.length === 0) return 0;
      const totalProgress = stations.reduce((sum, station) => sum + (weekProgress[station.key] || 0), 0);
      return Math.round(totalProgress / stations.length);
  }, [weekProgress]);

  // Load review items when student navigates to /review
  useEffect(() => {
    if (tabKey === 'review') {
      generateSmartReviewAsync(weekId).then(items => setReviewItems(items));
    } else {
      setReviewItems([]);
    }
  }, [weekId, tabKey]);

  // Fetch progress when weekId or user changes
  useEffect(() => {
    // Initial load of speech voices
    loadVoices();
    // Install the unload-flush handler once per session — fire-and-forget
    // sendBeacon writes any unsynced journal entries to the server before
    // the page is closed. See utils/progressBackup.js.
    installUnloadFlush();

    const initializeAppData = async () => {
      if (currentUser && currentUser.role !== 'guest' && token) {
        try {
          // Verify user session and get latest data
          const { getMe } = await import('./services/api');
          const meResponse = await getMe().catch((err) => {
            console.warn('[App] Session verify unreachable:', err.message);
            return { data: null };
          });
          if (meResponse?.data) {
            useUserStore.getState().setCurrentUser(meResponse.data);
          }

          // 🔁 Replay any progress saves that didn't make it to the server
          // before last unload (network drop, tab close, etc.). The server's
          // merge logic dedupes, so re-sending is safe.
          replayJournal().catch((e) =>
            console.warn('[App] journal replay failed:', e)
          );

          // 🚑 ONE-TIME recovery: re-push localStorage backups to the server.
          // Triggered only once per device (localStorage flag), so this
          // doesn't spam the server on every mount. After running once,
          // subsequent mounts only do the cheap replayJournal above.
          const recoveryFlag = `progress_recovery_done_v2_${currentUser.id}`;
          if (!localStorage.getItem(recoveryFlag)) {
            console.log('[App] running one-time localStorage recovery...');
            recoverFromLocalStorage({
              onProgress: ({ current, total, station }) =>
                console.log(`[App] recovery ${current}/${total} (${station})`)
            })
              .then(({ total, pushed, failed }) => {
                console.log(`[App] recovery done: ${pushed}/${total} pushed, ${failed} failed`);
                localStorage.setItem(recoveryFlag, '1');
              })
              .catch((e) => {
                console.warn('[App] recovery failed:', e);
                // Don't set the flag — will retry next mount
              });
          }

          // � Check if periodic assessment is due (every 4 weeks, role=student)
          if (currentUser?.role === 'student') {
            const { assessmentAPI } = await import('./services/api');
            const sessionKey = `assessment_checked_${currentUser.id}`;
            if (!sessionStorage.getItem(sessionKey)) {
              assessmentAPI.getPending().then(r => {
                sessionStorage.setItem(sessionKey, '1');
                if (r.data?.due) {
                  setPendingAssessment(r.data);
                  setShowAssessment(true);
                }
              }).catch(() => {});
            }
          }

          // �🔥 Log session start so teacher dashboard last_active + Last 7 Days stays current
          const { teacherAPI } = await import('./services/api');
          teacherAPI.logActivity('session_start', weekId, null, { weekId }).catch(() => {});

          const progressData = await progressAPI.fetchWeekProgress(weekId);

          // BUG FIX: Server stores stationId keys (e.g. 'vocab_mastery') but weekProgress
          // must use tabKeys (e.g. 'new_words').  Map them back via STATION_ID_TO_TAB.
          // BUG FIX 2 (Jun 7, 2026): When the user is in easy mode, server keys include the
          // `_easy` suffix (e.g. 'vocab_mastery_easy') which STATION_ID_TO_TAB does NOT know.
          // Without stripping, the tabKey would be 'vocab_mastery_easy' (no such tab) and
          // progress for that station would silently be missing from the UI. Strip the
          // suffix before lookup so easy-mode progress is visible.
          const normalizedProgress = Object.entries(progressData || {}).reduce((acc, [stationKey, value]) => {
            const baseKey = stationKey.endsWith('_easy') ? stationKey.slice(0, -5) : stationKey;
            const tabKey = STATION_ID_TO_TAB[baseKey] || baseKey;
            const percent = typeof value === 'number'
              ? value
              : (value?.progressPercent ?? value?.score ?? (value?.isCompleted ? 100 : 0) ?? 0);
            acc[tabKey] = percent;
            return acc;
          }, {});
          setWeekProgress(normalizedProgress);

          // BUG FIX: Also populate Zustand progressCache so the sidebar updates correctly.
          // Cache keys keep their full mode suffix (e.g. 'vocab_mastery_easy') so subsequent
          // loads in the same mode can compare against the original server keys.
          useUserStore.getState().updateLocalProgress && Object.entries(progressData || {}).forEach(([stationKey, value]) => {
            const payload = typeof value === 'number'
              ? { score: value, isCompleted: value >= 100, data: {} }
              : { score: value?.score ?? 0, isCompleted: value?.isCompleted ?? false, data: value?.data ?? {} };
            useUserStore.getState().updateLocalProgress(weekId, stationKey, payload);
          });
        } catch (error) {
          console.error("Failed to initialize app data:", error);
          if (error.response?.status === 401) {
            logout();
          }
          setWeekProgress({});
        }
      } else {
        setWeekProgress({});
      }
    };
    initializeAppData();
  }, [weekId, currentUser?.id, learningMode]); // Re-fetch when week, user, OR learning mode changes (bug fix Jun 7: easy/ADV mode toggle was not refetching)

  // Scroll to top when tab, mode, or week changes
  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [tabKey, learningMode, weekId]);

  // Refresh user session on window focus (catches plan changes made by owner)
  useEffect(() => {
    const handleFocus = async () => {
      if (!currentUser || currentUser.role === 'guest' || !token) return;
      try {
        const { getMe, teacherAPI } = await import('./services/api');
        const meResponse = await getMe();
        if (meResponse.data) useUserStore.getState().setCurrentUser(meResponse.data);
        // 🔥 Log app focus so last_active updates when student returns to tab
        teacherAPI.logActivity('app_focus', weekId, null, null).catch(() => {});
      } catch { /* non-fatal */ }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [currentUser?.id]);

  const handleToggleMode = () => {
    toggleLearningMode();
  };

  const handleUpdateProfile = async (profileData) => {
    const result = await updateProfile(profileData);
    if (result.success) {
      setSaveToastStatus('success');
      setTimeout(() => setSaveToastStatus(null), 3000);
    } else {
      setSaveToastStatus('error');
      setTimeout(() => setSaveToastStatus(null), 3000);
    }
    return result;
  };

  const handleReportProgress = useCallback(async (percent) => {
    if (!currentUser || currentUser.role === 'guest' || !token) return;

    setAutoSaveStatus('saving');
    try {
      const baseStationId = TAB_TO_STATION_ID[tabKey] || tabKey;
      // 🔥 FIX: Use mode-aware key so easy mode progress is stored under the
      // correct suffix and counted by recalculateWeekCompletion.
      const stationId = learningMode === 'easy' ? `${baseStationId}_easy` : baseStationId;
      // BUG FIX (Jun 9, 2026): Preserve any JSONB data the station hook already
      // persisted. Previously this call wrote data: {} unconditionally, which
      // wiped the rich {cards, completedWords} payload from useStationProgress
      // whenever the station called onReportProgress — so vocab cards appeared
      // unsaved after every reload. We now read the current cache and merge.
      const existing = useUserStore.getState().progressCache?.[weekId]?.[stationId]?.data || {};
      await progressAPI.saveProgress({
        weekId,
        stationId,
        data: existing,
        isCompleted: percent >= 100,
        score: percent
      });

      // BUG FIX: Also update Zustand progressCache so sidebar/stars stay in sync.
      useUserStore.getState().updateLocalProgress(weekId, stationId, {
        score: percent,
        isCompleted: percent >= 100,
        data: existing,
      });
      
      setWeekProgress(prev => {
        const updatedProgress = { ...prev, [tabKey]: percent };
        
        // Show station completion card when a single station hits 100%
        if (percent >= 100 && (prev[tabKey] || 0) < 100) {
          setShowCompletionCard(true);
          // Random Encounter: ~33% chance per station completion, capped at 2 per day
          // to avoid modal fatigue across many stations in one week.
          const today = new Date().toDateString();
          const lastEncDay = parseInt(sessionStorage.getItem('enc_day') || '0', 10);
          const encCount = parseInt(sessionStorage.getItem('enc_count') || '0', 10);
          if (today !== lastEncDay) {
            sessionStorage.setItem('enc_day', today);
            sessionStorage.setItem('enc_count', '0');
          }
          const freshCount = parseInt(sessionStorage.getItem('enc_count') || '0', 10);
          if (freshCount < 2 && Math.random() < 0.33) {
            sessionStorage.setItem('enc_count', String(freshCount + 1));
            setTimeout(() => setIsEncounterOpen(true), 2000);
          }
        }

        // Check completion
        const totalStations = STATIONS.filter(s => s.key !== 'review').length;
        const completedStations = Object.values(updatedProgress).filter(p => p === 100).length;
        if (totalStations > 0 && completedStations === totalStations) {
          setShowCongratulations(true);
          // Trigger checkpoint assessment if this is a checkpoint week and not done yet
          const cpKey = `checkpoint_w${weekId}`;
          if (CHECKPOINT_WEEKS.includes(weekId) && !localStorage.getItem(cpKey) && checkpointLoaders[weekId]) {
            checkpointLoaders[weekId]().then((mod) => {
              setCheckpointData(mod.default);
              setShowCheckpoint(true);
            });
          }
        }
        
        return updatedProgress;
      });
      
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 1500);

    } catch (error) {
      console.error("Failed to report progress:", error);
      setAutoSaveStatus('idle');
    }
  }, [currentUser, token, weekId, tabKey]);

  // Called by ReviewDashboard when all drills are complete — saves 100% progress
  // MUST be declared after handleReportProgress to avoid TDZ
  const handleWeekComplete = useCallback(() => {
    handleReportProgress(100);
  }, [handleReportProgress]);

  // Early return for logged-out users
  if (!currentUser) return (
    <LandingPage
      onLogin={login}
      onRegister={register}
      onGuestLogin={guestLogin}
    />
  );

  // Student logged in but no placement yet → go to placement test
  const placed = localStorage.getItem('placement_result');
  const STAFF_ROLES = ['owner', 'admin', 'super_admin', 'teacher', 'team_leader', 'center_director'];
  const isOwner = currentUser?.role === 'owner' || currentUser?.displayName === 'Bình' || currentUser?.email?.includes('binh') || localStorage.getItem('arcade_owner_bypass') === 'true';
  const isStaffOrOwner = isOwner || STAFF_ROLES.includes(currentUser?.role);

  if (currentUser.role === 'student' && !placed && !isStaffOrOwner) {
    return <Navigate replace to="/placement" />;
  }
  // Parent logging in from LandingPage → go to their dashboard
  if (currentUser.role === 'parent') {
    return <Navigate replace to="/dashboard" />;
  }

  const currentStation = STATIONS.find(s => s.key === tabKey) || STATIONS[0];
  const isTeacher = STAFF_ROLES.includes(currentUser?.role);
  const CurrentModule = MODULE_COMPONENTS[tabKey] || StationLoading;
  const effectiveShowOnboarding = showOnboarding && !isStaffOrOwner;

  return (
    <>
      {/* Onboarding — 7-step first-time experience */}
      {effectiveShowOnboarding && (
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
      )}
      <WorksheetGenerator weekData={weekData} />
      <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden screen-only">
        {/* <AIProviderStatus /> */}
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} currentUser={currentUser} onUpdateProfile={handleUpdateProfile} onLogout={logout} />
        <AdminDashboard isOpen={isAdminDashboardOpen} onClose={() => setIsAdminDashboardOpen(false)} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onLogout={logout} currentUser={currentUser} currentWeekId={weekId} />
        <SubscriptionModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
        <ArcadeModal isOpen={isArcadeOpen} onClose={() => setArcadeOpen(false)} weekNumber={weekId} ownerBypass={isOwner} />
        <ArcadeBreakPromptModal
          isOpen={showBreakPrompt}
          onPlay={() => {
            dismissBreakPrompt();
            setArcadeOpen(true);
          }}
          onSkip={dismissBreakPrompt}
        />
        <AvatarCloset isOpen={isAvatarClosetOpen} onClose={() => setIsAvatarClosetOpen(false)} currentUser={currentUser} />
        <EncounterOverlay isOpen={isEncounterOpen} onClose={() => setIsEncounterOpen(false)} weekNumber={weekId} learningMode={learningMode} />
        <UnboxAnimation
          isOpen={!!completedCollectionId}
          onClose={() => setCompletedCollectionId(null)}
          onOpenCloset={() => setIsAvatarClosetOpen(true)}
        />
        {/* <SuperAdminLauncher /> */}
        {/* <TeacherLauncher /> */}

        <Sidebar 
          isOpen={isSidebarOpen}
          currentUser={currentUser}
          weekId={weekId}
          weekProgress={overallWeekProgress}
          learningMode={learningMode}
          handleToggleMode={handleToggleMode}
          tabKey={tabKey}
          setIsProfileModalOpen={setIsProfileModalOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setIsAvatarClosetOpen={setIsAvatarClosetOpen}
          onShowUpgrade={() => { if (!isTeacher) setIsUpgradeModalOpen(true); }}
        />

        {isWidgetOpen && <TutorWindow />}
        <main className={`flex-col min-w-0 bg-slate-50/50 relative ${isWidgetOpen ? 'hidden' : 'flex flex-1'}`}>
          <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-5 z-40 shadow-sm relative">
            <div className="flex items-center gap-3">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-1.5 bg-slate-50 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors"><Menu size={20} /></button>
                <div>
                   <div className="flex items-center gap-1.5 leading-none mb-0.5">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Week {weekId}</p>
                     {(() => { const { cefr, color } = getWeekCEFR(weekId); return (
                       <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md bg-${color}-100 text-${color}-700 uppercase tracking-wide`}>{cefr}</span>
                     ); })()}
                     {MILESTONE_WEEKS.includes(weekId) && <span className="text-[9px]">🏆</span>}
                     {/* 🔥 Streak counter — next to CEFR */}
                     {currentUser?.role !== 'guest' && (() => {
                       try {
                         const raw = localStorage.getItem('engquest_streak');
                         const streak = raw ? JSON.parse(raw).days : 0;
                         if (!streak) return null;
                         return (
                           <div title={`${streak} day streak`} className="flex items-center gap-0.5 bg-orange-50 border border-orange-200 rounded-md px-1.5 py-0.5">
                             <span className="text-[11px] leading-none">🔥</span>
                             <span className="text-[9px] font-black text-orange-700">{streak}d</span>
                           </div>
                         );
                       } catch { return null; }
                     })()}
                   </div>
                   <h2 className="text-base font-black text-slate-800 truncate max-w-xs md:max-w-md italic">{tabKey === 'review' ? 'SRS System' : weekData?.weekTitle_en}</h2>
        
                <SaveToast 
                  status={saveToastStatus} 
                  onDismiss={() => setSaveToastStatus(null)} 
                />
                {showCongratulations && (
                  <CongratulationsModal
                    weekId={weekId}
                    onClose={() => setShowCongratulations(false)}
                    userStats={{ accuracy: 'N/A', timeSpent: 'N/A', totalStars: currentUser?.stats?.stars || 0 }}
                  />
                )}
                {showCompletionCard && (() => {
                  const nonReview = STATIONS.filter(s => s.key !== 'review');
                  const curIdx = nonReview.findIndex(s => s.key === tabKey);
                  const nextStation = curIdx >= 0 && curIdx < nonReview.length - 1 ? nonReview[curIdx + 1] : null;
                  const curStation = nonReview[curIdx];
                  return (
                    <CompletionCard
                      stationName={curStation?.title_en || tabKey}
                      nextStation={nextStation}
                      weekId={weekId}
                      onClose={() => setShowCompletionCard(false)}
                    />
                  );
                })()}
                {showCheckpoint && checkpointData && (
                  <CheckpointAssessment
                    checkpointData={checkpointData}
                    weekNumber={weekId}
                    isVi={isVi}
                    onClose={() => setShowCheckpoint(false)}
                  />
                )}
                <PeriodicAssessmentModal
                  isOpen={showAssessment}
                  onClose={() => {
                    setShowAssessment(false);
                  }}
                  pendingData={pendingAssessment}
                  studentName={currentUser?.display_name || currentUser?.name || currentUser?.username}
                />
                </div>
            </div>
            
            <div className="flex items-center gap-2 relative z-10">
               <AutoSaveIndicator status={autoSaveStatus} />

               {/* Speed Selector */}
               <div className="relative flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 hover:bg-blue-100 transition-colors cursor-pointer">
                 <Gauge size={13} className="text-blue-600 flex-shrink-0" />
                 <span className="text-[10px] font-bold text-blue-600 pointer-events-none">Speed</span>
                 <select
                   value={ttsSpeed}
                   onChange={(e) => setTTSSpeed(e.target.value)}
                   className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                   title="TTS Playback Speed"
                 >
                   {speedPresets.map((s) => (
                     <option key={s.id} value={s.id}>{s.label}</option>
                   ))}
                 </select>
               </div>

               {currentUser?.role !== 'guest' && (
               <button onClick={() => window.print()} title="Print Worksheet" className="p-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-1.5 px-3 group">
                  <Printer size={14} className="group-hover:rotate-12 transition-transform"/>
                  <span className="text-[9px] font-black uppercase tracking-wider hidden sm:block">Print</span>
               </button>
               )}

               <div className="h-6 w-px bg-slate-200"></div>

               {isTeacher && (
                  <button 
                    type="button"
                    onClick={(e) => {
                      if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                      useUserStore.getState().setTeacherPanelOpen(true);
                    }} 
                    className="flex px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md hover:bg-slate-800 transition-all active:scale-95 cursor-pointer"
                  >
                    Teacher Panel
                  </button>
                )}
               {!isTeacher && currentUser?.role !== 'guest' && <Link to={`/dashboard/${weekId}`} className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-[9px] font-black uppercase tracking-wide hover:bg-emerald-100 transition-colors" title="Parent Dashboard">
                 📊 {isVi ? 'Phụ huynh' : 'Parent Report'}
               </Link>}
            </div>
          </header>

          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-5 relative no-scrollbar" onClick={() => { if (showWelcomeCard) setShowWelcomeCard(false); }}>
            {/* 👋 Welcome back card — compact corner float, no layout shift */}
            {currentUser?.role !== 'guest' && showWelcomeCard && (() => {
              const firstName = currentUser?.display_name || (currentUser?.name || currentUser?.username || '').split(' ').pop() || '';
              const isV2Hub = weekId >= 33;
              if (isV2Hub) {
                const HUBS = [
                  { hubId: 1, title: 'Hub 1: World Discovery', link: `/week/${weekId}/hub/1`, keys: ['read_explore', 'explore', 'new_words', 'hub1', '1'] },
                  { hubId: 2, title: 'Hub 2: Arena & Listening', link: `/week/${weekId}/hub/2`, keys: ['grammar', 'logic_lab', 'word_match', 'game_hub', 'hub2', '2'] },
                  { hubId: 3, title: 'Hub 3: Writing Studio', link: `/week/${weekId}/hub/3`, keys: ['writing', 'dictation', 'hub3', '3'] },
                  { hubId: 4, title: 'Hub 4: Nova Talk Show', link: `/week/${weekId}/hub/4`, keys: ['shadowing', 'ask_ai', 'mindmap_speaking', 'hub4', '4'] }
                ];
                const completedHubs = HUBS.filter(h => h.keys.some(k => (weekProgress[k] || 0) >= 100)).length;
                const nextHub = HUBS.find(h => !h.keys.some(k => (weekProgress[k] || 0) >= 100)) || HUBS[0];

                return (
                  <div className="absolute top-4 left-4 z-30 w-72 rounded-2xl overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-white font-black text-[13px] leading-tight">👋 Welcome back, {firstName}!</span>
                        <button onClick={() => setShowWelcomeCard(false)} className="text-white/70 hover:text-white text-lg font-bold leading-none flex-shrink-0 mt-0.5">×</button>
                      </div>
                      <p className="text-white/90 font-bold text-[11px]">Week {weekId} · {completedHubs}/4 Hubs done</p>
                      {nextHub && <p className="text-white/80 text-[11px] mt-0.5">Next: <b className="text-white">{nextHub.title}</b></p>}
                      {nextHub && (
                        <Link
                          to={nextHub.link}
                          onClick={() => setShowWelcomeCard(false)}
                          className="mt-2 w-full block text-center px-4 py-1.5 bg-white text-indigo-700 text-[11px] font-black rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                        >
                          Start →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              }

              const completedCount = STATIONS.filter(s => (weekProgress[s.key] || 0) >= 50).length;
              const nextStation = STATIONS.find(s => (weekProgress[s.key] || 0) < 50);
              return (
                <div className="absolute top-4 left-4 z-30 w-72 rounded-2xl overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
                  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-white font-black text-[13px] leading-tight">👋 Welcome back, {firstName}!</span>
                      <button onClick={() => setShowWelcomeCard(false)} className="text-white/70 hover:text-white text-lg font-bold leading-none flex-shrink-0 mt-0.5">×</button>
                    </div>
                    <p className="text-white/90 font-bold text-[11px]">Week {weekId} · {completedCount}/{STATIONS.length} stations done</p>
                    {nextStation && <p className="text-white/80 text-[11px] mt-0.5">Next: <b className="text-white">{nextStation.title_en}</b></p>}
                    {nextStation && (
                      <Link
                        to={`/week/${weekId}/${nextStation.key}`}
                        onClick={() => setShowWelcomeCard(false)}
                        className="mt-2 w-full block text-center px-4 py-1.5 bg-white text-indigo-700 text-[11px] font-black rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                      >
                        Start →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Quest Map — Vertical quest path replacing Zone tabs for W33+ */}
            {weekId >= 33 ? (
              <QuestMap weekId={weekId} />
            ) : (
              (() => {
                const PINNED = ['read_explore', 'new_words', 'grammar'];
                const pinned = STATIONS.filter(s => PINNED.includes(s.key));
                const rest   = STATIONS.filter(s => !PINNED.includes(s.key) && s.key !== 'review');
                const review = STATIONS.filter(s => s.key === 'review');
                // If current tab is in the rest, ensure expanded
                const isRestActive = rest.some(s => s.key === tabKey) || review.some(s => s.key === tabKey);
                const showAll = stationsExpanded || isRestActive;
                const displayed = showAll ? [...pinned, ...rest, ...review] : pinned;
                const handleExpand = () => {
                  setStationsExpanded(true);
                };
                const handleCollapse = () => {
                  setStationsExpanded(false);
                };
                return (
                  <div className="flex space-x-3 mb-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <div className="flex space-x-3 mx-auto min-w-max px-6 pt-3">
                      {displayed.map(s => {
                        const isActive = tabKey === s.key;
                        return (
                          <Link key={s.key} to={`/week/${weekId}/${s.key}`}
                                onClick={() => setShowWelcomeCard(false)}
                                className={`flex-shrink-0 flex flex-col items-center justify-center rounded-[26px] transition-all duration-500 border-2 ${isActive ? `w-20 h-20 bg-${s.color}-500 text-white border-${s.color}-300 shadow-xl scale-105` : `w-16 h-16 bg-white border-slate-100 text-${s.color}-500 hover:border-${s.color}-300 hover:bg-slate-50 shadow-sm`}`}>
                            <div className={`p-2 rounded-xl mb-0.5 ${isActive ? 'bg-white/20' : `bg-${s.color}-50`}`}><s.icon size={isActive ? 22 : 18} className={isActive ? 'animate-bounce-slow' : ''} /></div>
                            <span className={`text-[8px] font-black uppercase tracking-tighter px-1 text-center ${isActive ? 'opacity-100' : 'opacity-70'}`}>{s.title_en}</span>
                          </Link>
                        );
                      })}
                      {!showAll && (
                        <button
                          onClick={handleExpand}
                          className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-[26px] border-2 border-dashed border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all bg-white"
                          title={`Xem thêm ${rest.length + review.length} tính năng`}
                        >
                          <span className="text-lg leading-none">›</span>
                          <span className="text-[7px] font-black uppercase tracking-tighter mt-0.5">Thêm ({rest.length + review.length})</span>
                        </button>
                      )}
                      {showAll && (
                        <button
                          onClick={handleCollapse}
                          className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-[26px] border-2 border-dashed border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all bg-white"
                          title="Thu gọn danh sách tính năng"
                        >
                          <span className="text-lg leading-none">‹</span>
                          <span className="text-[7px] font-black uppercase tracking-tighter mt-0.5">Thu gọn</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()
            )}
            
            <div className="max-w-7xl mx-auto relative">
              {/* Speaking nudge banner (Rule 5) */}
              {speakingNudge && (
                <div className="mx-4 mt-4 p-3 bg-violet-50 border border-violet-200 rounded-2xl flex items-center justify-between">
                  <p className="text-sm font-bold text-violet-700">🎤 {isVi ? "Bạn chưa luyện Speaking trong 2 tuần — thử Ask AI hoặc Shadow Asking hôm nay!" : "You haven't practised Speaking in 2 weeks — try Ask AI or Shadow Asking today!"}</p>
                  <button onClick={() => setSpeakingNudge(false)} className="text-violet-400 hover:text-violet-600 ml-3 text-xs font-bold">✕</button>
                </div>
              )}

              {/* Week 33+ Gold Standard 4-Zone Experiential Router vs Legacy Modules */}
              {weekId >= 33 ? (
                (() => {
                  const tk = String(tabKey || '');
                  const mappedZones = mapDataToZones(weekData, weekId);

                  if (['story', 'hub1', '1', 'read_explore', 'explore', 'new_words'].includes(tk)) {
                    return <StoryWorldZone data={mappedZones} weekNumber={weekId} />;
                  }
                  if (['arena', 'hub2', '2', 'grammar', 'logic_lab', 'word_match', 'game_hub'].includes(tk)) {
                    return <BattleArenaZone data={mappedZones} weekNumber={weekId} />;
                  }
                  if (['create', 'hub3', '3', 'writing', 'dictation'].includes(tk)) {
                    return <CreatorStudioZone data={mappedZones} weekNumber={weekId} />;
                  }
                  if (['boss', 'hub4', '4', 'shadowing', 'ask_ai', 'mindmap_speaking'].includes(tk)) {
                    return <BossBattleZone data={mappedZones} weekNumber={weekId} />;
                  }

                  return <StoryWorldZone data={mappedZones} weekNumber={weekId} />;
                })()
              ) : (
                <CurrentModule 
                  key={`${weekId}-${tabKey}-${learningMode}`} 
                  data={matchData} 
                  themeColor={currentStation.color} 
                  isVi={isVi} 
                  onToggleLang={() => setIsVi(!isVi)} 
                  onReportProgress={handleReportProgress} 
                  currentProgress={weekProgress[tabKey] || 0}
                  weekNumber={weekId}
                  mode={learningMode}
                  reviewItems={reviewItems}
                  setReviewItems={setReviewItems}
                  onWeekComplete={handleWeekComplete}
                />
              )}
            </div>
          </div>
        </main>
      </div>
      <QADebugDrawer />
    </>
  );
};

/**
 * Game Hub Layout - Separate route for Game Hub station
 * Simple layout without sidebar (focused game experience)
 */
const GameHubLayout = () => {
  const { weekId } = useParams();
  const weekNumber = parseInt(weekId) || 5;
  const { learningMode } = useUserStore(); // Get learningMode from global store
  
  return (
    <div className="game-hub-layout min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to={`/week/${weekNumber}/read_explore`} className="text-blue-600 hover:text-blue-800">
            ← Back to Main App
          </Link>
          <h1 className="text-2xl font-bold">🎮 Game Hub</h1>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${learningMode === 'easy' ? 'bg-teal-100 text-teal-700' : 'bg-indigo-100 text-indigo-700'}`}>
              {learningMode === 'easy' ? '⭐ EASY' : '⭐⭐ ADVANCED'}
            </span>
            <div className="text-sm text-gray-500">Week {weekNumber}</div>
          </div>
        </div>
      </header>
      
      {/* Game Hub Content */}
      <main className="py-8">
        <GameHub weekNumber={weekNumber} learningMode={learningMode} />
      </main>
    </div>
  );
};

export default App;
