import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { Menu, Printer } from 'lucide-react';

// STORES & API
import { useUserStore } from './stores/useUserStore';
import { getProgress, updateProgress } from './services/api';

// CONFIG & CONSTANTS
import { MODULE_COMPONENTS, STATIONS } from './config/stationConfig';

// UTILS & COMPONENTS
import { useFetchWeekData, useStationData } from './utils/dataHooks';
import { generateSmartReview } from './utils/srsGenerator';
import { loadVoices } from './utils/AudioHelper'; // Import loadVoices
import LoginScreen from './components/auth/LoginScreen';
import FloatingDictionary from './components/common/FloatingDictionary';
import AIProviderStatus from './components/common/AIProviderStatus';
import SettingsModal from './components/common/SettingsModal';
import ProfileModal from './components/common/ProfileModal';
import HeaderProfileMenu from './components/common/HeaderProfileMenu';
import WorksheetGenerator from './components/common/WorksheetGenerator';
import ReviewDashboard from './modules/review/ReviewDashboard';
import Sidebar from './components/layout/Sidebar';
import AITutor from './modules/ai_tutor/AITutor';
import SaveToast from './components/common/SaveToast';
import AutoSaveIndicator from './components/common/AutoSaveIndicator';
import CongratulationsModal from './components/common/CongratulationsModal';

const StationLoading = () => <div className="p-10 text-center text-slate-400 font-black italic">Station loading...</div>;

const App = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<Navigate replace to="/week/1/read_explore" />} />
      <Route path="/week/:weekId/:tabKey" element={<MainLayout />} />
    </Routes>
  </Router>
);

const MainLayout = () => {
  // Global state from Zustand store
  const { 
    currentUser, 
    learningMode, 
    login, 
    register, 
    updateProfile,
    guestLogin, 
    logout, 
    toggleLearningMode,
  } = useUserStore();

  // Local UI and data state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVi, setIsVi] = useState(false);
  const [weekProgress, setWeekProgress] = useState({});
  const [saveToastStatus, setSaveToastStatus] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
  const [showCongratulations, setShowCongratulations] = useState(false);
  
  const params = useParams();
  const weekId = parseInt(params.weekId || 1);
  const tabKey = params.tabKey || 'read_explore';
  
  const { data: weekData } = useFetchWeekData(weekId, learningMode);
  const stationData = useStationData(tabKey, weekData);
  const matchData = tabKey === 'word_match' ? weekData : stationData;
  
  // Hooks must be called before early returns
  const reviewItems = useMemo(() => {
    if (tabKey === 'review') return generateSmartReview(weekId);
    return [];
  }, [weekId, tabKey]);

  const overallWeekProgress = useMemo(() => {
      const stations = STATIONS.filter(s => s.key !== 'review');
      if (stations.length === 0) return 0;
      const totalProgress = stations.reduce((sum, station) => sum + (weekProgress[station.key] || 0), 0);
      return Math.round(totalProgress / stations.length);
  }, [weekProgress]);

  // Fetch progress when weekId or user changes
  useEffect(() => {
    // Initial load of speech voices
    loadVoices();

    const initializeAppData = async () => {
      if (currentUser && currentUser.role !== 'guest') {
        try {
          // Verify user session and get latest data
          const { getMe } = await import('./services/api');
          const meResponse = await getMe();
          if (meResponse.data) {
            useUserStore.getState().setCurrentUser(meResponse.data);
          }

          const response = await getProgress(weekId);
          setWeekProgress(response.data || {});
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
  }, [weekId, currentUser?.id]); // Use id to avoid loop if object ref changes but content same

  const handleToggleMode = (e) => {
    e.stopPropagation();
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
  };

  const handleReportProgress = async (percent) => {
    if (!currentUser || currentUser.role === 'guest') return;
    
    setAutoSaveStatus('saving');
    try {
      await updateProgress({ weekId, stationKey: tabKey, progressPercent: percent });
      
      const updatedProgress = { ...weekProgress, [tabKey]: percent };
      setWeekProgress(updatedProgress);
      
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 1500);

      const totalStations = STATIONS.filter(s => s.key !== 'review').length;
      const completedStations = Object.values(updatedProgress).filter(p => p === 100).length;
      if (totalStations > 0 && completedStations === totalStations) {
        setShowCongratulations(true);
      }

    } catch (error) {
      console.error("Failed to report progress:", error);
      setAutoSaveStatus('idle');
    }
  };

  // Early return for logged-out users
  if (!currentUser) return (
    <LoginScreen 
      onLogin={login} 
      onRegister={register}
      onGuestLogin={guestLogin}
    />
  );

  const currentStation = STATIONS.find(s => s.key === tabKey) || STATIONS[0];
  const isTeacher = currentUser?.role === 'admin' || currentUser?.role === 'super_admin' || currentUser?.role === 'teacher';
  const CurrentModule = MODULE_COMPONENTS[tabKey] || StationLoading;

  return (
    <>
      <WorksheetGenerator weekData={weekData} />
      <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden screen-only">
        <FloatingDictionary />
        <AIProviderStatus />
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} currentUser={currentUser} onUpdateProfile={handleUpdateProfile} onLogout={logout} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onLogout={logout} currentUser={currentUser} currentWeekId={weekId} />

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
        />

        <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative">
          <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors"><Menu size={24} /></button>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Week {weekId}</p>
                   <h2 className="text-xl font-black text-slate-800 truncate max-w-xs md:max-w-md italic">{tabKey === 'review' ? 'SRS System' : weekData?.weekTitle_en}</h2>
        
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
                </div>
            </div>
            
            <div className="flex items-center gap-3">
               <AutoSaveIndicator status={autoSaveStatus} />
               <button onClick={() => window.print()} title="Print Worksheet" className="p-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 px-4 group">
                  <Printer size={18} className="group-hover:rotate-12 transition-transform"/>
                  <span className="text-[10px] font-black uppercase tracking-wider hidden sm:block">Print Worksheet</span>
               </button>

               <div className="h-8 w-px bg-slate-200 mx-1"></div>

               {isTeacher && <button onClick={() => setIsSettingsOpen(true)} className="flex px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Teacher Panel</button>}
               <HeaderProfileMenu user={currentUser} onLogout={logout} onOpenProfile={()=>setIsProfileModalOpen(true)} />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 relative no-scrollbar">
            <div className="flex space-x-4 mb-12 overflow-x-auto pb-6 scrollbar-hide scroll-smooth no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="flex space-x-4 mx-auto min-w-max px-8 pt-4">
                {STATIONS.map(s => {
                  const isActive = tabKey === s.key;
                  return (
                    <Link key={s.key} to={`/week/${weekId}/${s.key}`} 
                          className={`flex-shrink-0 flex flex-col items-center justify-center rounded-[35px] transition-all duration-500 border-2 ${isActive ? `w-28 h-28 bg-${s.color}-500 text-white border-${s.color}-300 shadow-2xl scale-110` : `w-24 h-24 bg-white border-slate-100 text-${s.color}-500 hover:border-${s.color}-300 hover:bg-slate-50 shadow-sm`}`}>
                      <div className={`p-3 rounded-2xl mb-1 ${isActive ? 'bg-white/20' : `bg-${s.color}-50`}`}><s.icon size={isActive ? 30 : 24} className={isActive ? 'animate-bounce-slow':''} /></div>
                      <span className={`text-[9px] font-black uppercase tracking-tighter px-2 text-center ${isActive ? 'opacity-100' : 'opacity-70'}`}>{s.title_en}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto relative">
              {tabKey === 'review' ? (
                 <ReviewDashboard userId={currentUser?.id || currentUser?.name} isAuthenticated={!!currentUser} themeColor={currentStation.color} reviewItems={reviewItems} onWeekComplete={() => {}} />
              ) : (
                <CurrentModule data={matchData} themeColor={currentStation.color} isVi={isVi} onToggleLang={() => setIsVi(!isVi)} onReportProgress={handleReportProgress} currentProgress={weekProgress[tabKey] || 0} />
              )}
            </div>
          </div>
        </main>
        <AITutor weekData={weekData} />
      </div>
    </>
  );
};

export default App;
