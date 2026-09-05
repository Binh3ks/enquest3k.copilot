import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import NovaMascot from './components/NovaMascot';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Printer, Gauge, Sparkles, BookOpen, Swords, PenTool, Radio } from 'lucide-react';

// STORES & API
import { useUserStore } from './stores/useUserStore';
import { progressAPI } from './services/api';
import useTTSStore from './stores/useTTSStore';
import useDailyQuestStore from './stores/useDailyQuestStore';
import { QUEST_SCHEDULE } from './config/questSchedule';
import './services/badgeEngine';

// CONFIG & CONSTANTS

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
import { generateSmartReviewAsync } from './utils/srsGenerator';
import EncounterOverlay from './components/encounter/EncounterOverlay';
import UnboxAnimation from './components/avatar/UnboxAnimation';
import Station2Hub from './modules/hubs/station2/Station2Hub';
import WorldDiscoveryHub from './modules/cambridge_suite/WorldDiscoveryHub';
import ArenaHub from './modules/cambridge_suite/ArenaHub';
import WritingStudioHub from './modules/cambridge_suite/WritingStudioHub';
import NovaTalkShowHub from './modules/cambridge_suite/NovaTalkShowHub';
import StoryWorldZone from './modules/zones/StoryWorldZone';
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
import StreakMilestoneToast from './components/gamification/StreakMilestoneToast';

// Lazy-loaded heavy pages
const GameHub = React.lazy(() => import('./pages/GameHub/GameHub'));
const ParentDashboard = React.lazy(() => import('./pages/ParentDashboard'));
const WordTreasury = React.lazy(() => import('./pages/WordTreasury'));
const AdminDashboard = React.lazy(() => import('./components/common/AdminDashboard'));
const WorksheetGenerator = React.lazy(() => import('./components/common/WorksheetGenerator'));
const ReviewDashboardPage = React.lazy(() => import('./modules/review/ReviewDashboard'));
const PassportTracker = React.lazy(() => import('./pages/PassportTracker'));
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
  const navigate = useNavigate();
  const weekId = parseInt(params.weekId || 33);
  const taskId = params.taskId;
  const { learningMode, currentUser } = useUserStore();
  const { isDayUnlocked, getQuestDayIndex } = useDailyQuestStore();
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('engquest_onboarded'));
  const [lockToast, setLockToast] = useState(null);

  const isOwner = currentUser?.role === 'owner' || currentUser?.displayName === 'Bình' || currentUser?.email?.includes('binh') || localStorage.getItem('arcade_owner_bypass') === 'true';
  const isStaffOrOwner = isOwner || STAFF_ROLES.includes(currentUser?.role);
  const effectiveShowOnboarding = showOnboarding && !isStaffOrOwner;

  // ── Progressive Day Lock check (runs before data fetch) ──────────────────
  const questDayIndex = getQuestDayIndex(taskId);
  const questUnlocked = isDayUnlocked(weekId, questDayIndex, isStaffOrOwner);

  // Find what day number to complete first (for the toast message)
  const prevDayConfig = questDayIndex > 0 ? QUEST_SCHEDULE[questDayIndex - 1] : null;
  const prevDayLabel = prevDayConfig?.label || `Day ${questDayIndex}`;

  useEffect(() => {
    if (!questUnlocked) {
      // Show brief toast then redirect
      setLockToast(prevDayLabel);
      const t = setTimeout(() => {
        navigate(`/week/${weekId}/hub/map`, { replace: true });
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [questUnlocked, weekId, navigate, prevDayLabel]);

  const { data: weekData, loading: isWeekDataLoading } = useFetchWeekData(weekId, learningMode);

  // Show lock toast + redirect screen
  if (!questUnlocked) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white gap-5 p-6">
        <div className="text-6xl">🔒</div>
        <div className="text-center">
          <p className="font-black text-xl text-amber-400 mb-1">Quest Locked!</p>
          <p className="text-slate-300 text-sm">Complete <strong className="text-amber-300">{prevDayLabel}</strong> first to unlock this quest.</p>
        </div>
        <div className="w-48 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 rounded-full animate-[lock-slide_2s_linear_forwards]" style={{ width: '100%', animation: 'width 2.2s linear' }} />
        </div>
        <p className="text-slate-500 text-xs">Redirecting to map...</p>
      </div>
    );
  }

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

/**
 * PracticeRoute — Standalone Smart Practice Drills (SRS drilling) without legacy station tabs.
 * Route: /week/:weekId/practice
 */
const PracticeRoute = () => {
  const params = useParams();
  const weekId = parseInt(params.weekId || 33);
  const navigate = useNavigate();
  const [reviewItems, setReviewItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { learningMode, toggleLearningMode, currentUser } = useUserStore();
  const isOwner = currentUser?.role === 'owner' || localStorage.getItem('arcade_owner_bypass') === 'true';

  React.useEffect(() => {
    import('./utils/srsGenerator').then(({ generateSmartReviewAsync }) => {
      generateSmartReviewAsync(weekId).then(items => setReviewItems(items || []));
    }).catch(() => setReviewItems([]));
  }, [weekId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Minimal header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm sticky top-0 z-40">
        <button
          onClick={() => navigate(`/week/${weekId}/hub/1`)}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600"
          aria-label="Back to map"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Week {weekId} · Smart Practice</p>
          <h1 className="text-base font-black text-slate-800">📝 Smart Practice Drills</h1>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <React.Suspense fallback={<div className="p-10 text-center text-slate-400 font-black">Loading drills...</div>}>
          {reviewItems.length > 0 ? (
            <ReviewDashboardPage
              reviewItems={reviewItems}
              setReviewItems={setReviewItems}
              themeColor="indigo"
              onWeekComplete={() => navigate(`/week/${weekId}/hub/1`)}
            />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-indigo-100 p-10 text-center">
              <div className="text-4xl mb-3">📝</div>
              <p className="font-black text-slate-700 text-lg mb-2">No drills due today!</p>
              <p className="text-sm text-slate-500 mb-6">Complete quests to build up your SRS vocabulary bank, then come back here to practice.</p>
              <button
                onClick={() => navigate(`/week/${weekId}/hub/1`)}
                className="bg-indigo-500 text-white font-black rounded-xl px-6 py-3 hover:bg-indigo-600 transition-colors"
              >Back to Quest Map</button>
            </div>
          )}
        </React.Suspense>
      </div>
      <QuestSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentWeekId={weekId}
        learningMode={learningMode}
        onToggleMode={toggleLearningMode}
      />
    </div>
  );
};


/**
 * Game Hub Layout - Route for Game Hub station
 */
const GameHubLayout = () => {
  const params = useParams();
  const weekNumber = parseInt(params.weekId) || 33;
  const { learningMode } = useUserStore();
  const navigate = useNavigate();
  
  return (
    <div className="game-hub-layout min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate(`/week/${weekNumber}/hub/1`)} 
            className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
          >
            ← Back to Quest Map
          </button>
          <h1 className="text-2xl font-bold text-slate-800">🎮 Game Hub</h1>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${learningMode === 'easy' ? 'bg-teal-100 text-teal-700' : 'bg-indigo-100 text-indigo-700'}`}>
              {learningMode === 'easy' ? '⭐ EASY' : '⭐⭐ ADVANCED'}
            </span>
            <div className="text-sm text-gray-500 font-bold">Week {weekNumber}</div>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <React.Suspense fallback={<div className="p-10 text-center font-bold text-slate-400">Loading Game Hub...</div>}>
          <GameHub weekNumber={weekNumber} learningMode={learningMode} />
        </React.Suspense>
      </main>
    </div>
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
      <Route path="/week/:weekId/practice" element={<PracticeRoute />} />

      <Route path="/gamehub/:weekId" element={<GameHubLayout />} />
      <Route path="/collection" element={<CollectionBoard />} />
      <Route path="/word-treasury" element={<WordTreasury />} />
      <Route path="/passport" element={<PassportTracker />} />
      <Route path="/hub/station-1" element={<WorldDiscoveryHub data={week33Data?.readingHub} weekNumber={33} />} />
      <Route path="/hub/station-2" element={<ArenaHub data={week33Data?.listeningHub} weekNumber={33} />} />
      <Route path="/hub/station-3" element={<WritingStudioHub data={week33Data?.writingHub} weekNumber={33} />} />
      <Route path="/hub/station-4" element={<NovaTalkShowHub data={week33Data?.speakingHub} weekNumber={33} />} />
    </Routes>
    
    {/* Global AI Tutor Widget - V5 Premium */}
    <AITutorWidget />

    {/* Streak Milestone Celebration Toast — global singleton */}
    <StreakMilestoneToast />

    {/* Production Sandbox QA Tools Panel */}
    <SandboxQAPanel isOpen={isSandboxQAOpen} onClose={() => setIsSandboxQAOpen(false)} />
  </Router>
);
};

export default App;