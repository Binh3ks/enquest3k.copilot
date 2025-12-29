import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { Menu, Printer } from 'lucide-react';

// CONFIG & CONSTANTS
import { MODULE_COMPONENTS, STATIONS } from './config/stationConfig';
import weekIndex from './data/weeks/index';

// UTILS & COMPONENTS
import { useFetchWeekData, useStationData } from './utils/dataHooks';
import { saveStationProgress, getWeekProgress } from './utils/progressHelper';
import { generateSmartReview } from './utils/srsGenerator';
import { getUserFromDB, saveUserToDB } from './utils/userStorage'; 
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
// Progressive Saving UI - Master Prompt V23 Section 0.1.1 & 0.1.2
import SaveToast from './components/common/SaveToast';
import AutoSaveIndicator from './components/common/AutoSaveIndicator';
import CongratulationsModal from './components/common/CongratulationsModal';

const App = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<Navigate replace to="/week/1/read_explore" />} />
      <Route path="/week/:weekId/:tabKey" element={<MainLayout />} />
    </Routes>
  </Router>
);

const MainLayout = () => { 
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('engquest_current_user')) || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVi, setIsVi] = useState(false); 
  const [learningMode, setLearningMode] = useState(localStorage.getItem('engquest_content_mode') || 'advanced');
  const [reviewItems, setReviewItems] = useState([]);
  
  // Progressive Saving UI States - Master Prompt V23 Section 0.1.1
  const [saveToastStatus, setSaveToastStatus] = useState(null); // 'saving' | 'success' | null
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved'
  const [showCongratulations, setShowCongratulations] = useState(false);
  
  const params = useParams();
  const weekId = parseInt(params.weekId || 1);
  const tabKey = params.tabKey || 'read_explore';
  
  const { data: weekData } = useFetchWeekData(weekId);
  const stationData = useStationData(tabKey, weekData);
  const matchData = tabKey === 'word_match' ? weekData : stationData;

  useEffect(() => {
    if (currentUser) localStorage.setItem('engquest_current_user', JSON.stringify(currentUser));
    else localStorage.removeItem('engquest_current_user');
  }, [currentUser]);

  useEffect(() => {
    if (tabKey === 'review') {
      const srsItems = generateSmartReview(weekId);
      setReviewItems(srsItems);
    }
  }, [weekId, tabKey]);

  // Handler called by ReviewDashboard when a week's SRS is fully completed
  const handleWeekSrsComplete = (completedWeekId) => {
    if (!currentUser) return;
    try {
      const updated = { ...currentUser };
      if (!updated.srs_completed) updated.srs_completed = {};
      updated.srs_completed[completedWeekId] = true;
      // persist
      saveUserToDB(updated.name, updated);
      setCurrentUser(updated);
      // Dispatch event so other components can react
      window.dispatchEvent(new Event('srs-completed'));
    } catch (e) {
      console.error('Error saving SRS completion', e);
    }
  };

  const handleToggleMode = (e) => {
    e.stopPropagation();
    const newMode = learningMode === 'advanced' ? 'easy' : 'advanced';
    localStorage.setItem('engquest_content_mode', newMode);
    setLearningMode(newMode);
    
    // Show saving indicators
    setSaveToastStatus('saving');
    setAutoSaveStatus('saving');
    
    // Save progress
    const updatedUser = saveStationProgress(currentUser, weekId, tabKey, percent);
    if (updatedUser) {
      // Update last accessed week/station for Continue Learning card
      updatedUser.lastWeek = weekId;
      updatedUser.lastStation = tabKey;
      
      setCurrentUser({ ...updatedUser });
      
      // Show success indicators
      setTimeout(() => {
        setSaveToastStatus('success');
        setAutoSaveStatus('saved');
        
        // Hide auto-save indicator after 1s
        setTimeout(() => {
          setAutoSaveStatus('idle');
        }, 1000);
      }, 500);
      
      // Check if week is complete (100%)
      const newWeekProgress = getWeekProgress(updatedUser, weekId);
      if (newWeekProgress === 100) {
        // Award 50 bonus stars
        updatedUser.stats = updatedUser.stats || { stars: 0, streak: 0 };
        updatedUser.stats.stars += 50;
        
        // Mark week as certified
        if (!updatedUser.certified_weeks) updatedUser.certified_weeks = {};
        updatedUser.certified_weeks[weekId] = true;
        
        // Save and show celebration
        saveUserToDB(updatedUser.name, updatedUser);
        setShowCongratulations(true);
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('week-completed', { detail: { weekId } }));
      }
    }
  };

  const handleReportProgress = (percent) => {
    if (!currentUser || currentUser.role === 'guest') return;
    
    // Show saving indicators
    setSaveToastStatus('saving');
    setAutoSaveStatus('saving');
    
    const updatedUser = saveStationProgress(currentUser, weekId, tabKey, percent);
    if (updatedUser) {
      // Update last accessed week/station for Continue Learning card
      updatedUser.lastWeek = weekId;
      updatedUser.lastStation = tabKey;
      
      setCurrentUser({ ...updatedUser });
      
      // Show success indicators
      setTimeout(() => {
        setSaveToastStatus('success');
        setAutoSaveStatus('saved');
        
        // Hide auto-save indicator after 1s
        setTimeout(() => {
          setAutoSaveStatus('idle');
        }, 1000);
      }, 500);
      
      // Check if week is complete (100%)
      const newWeekProgress = getWeekProgress(updatedUser, weekId);
      if (newWeekProgress === 100) {
        // Check if not already celebrated to avoid duplicate celebrations
        const alreadyCelebrated = updatedUser.certified_weeks && updatedUser.certified_weeks[weekId];
        
        if (!alreadyCelebrated) {
          // Award 50 bonus stars
          updatedUser.stats = updatedUser.stats || { stars: 0, streak: 0 };
          updatedUser.stats.stars += 50;
          
          // Mark week as certified
          if (!updatedUser.certified_weeks) updatedUser.certified_weeks = {};
          updatedUser.certified_weeks[weekId] = true;
          
          // Save and show celebration
          saveUserToDB(updatedUser.name, updatedUser);
          setCurrentUser({ ...updatedUser });
          setShowCongratulations(true);
          
          // Dispatch event
          window.dispatchEvent(new CustomEvent('week-completed', { detail: { weekId } }));
        }
      }
    }
  };

  const logout = () => { setCurrentUser(null); localStorage.removeItem('engquest_current_user'); };
  
  if (!currentUser) return (
    <LoginScreen 
      onLogin={(u,p) => { const usr = getUserFromDB(u); if(usr&&usr.password===p){setCurrentUser(usr); return {success:true};} return {success:false}; }} 
      onRegister={(payload) => {
        // basic validation
        if (!payload.name || !payload.password || !payload.parentEmail) return { success: false, error: 'Missing fields' };
        const existing = getUserFromDB(payload.name);
        if (existing) return { success: false, error: 'Username already exists' };
        const newUser = {
          name: payload.name,
          password: payload.password,
          role: 'student',
          age: payload.age || null,
          parentEmail: payload.parentEmail || null,
          avatarUrl: payload.avatarUrl || `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${payload.name}`,
          stats: { streak: 0, stars: 0 },
          progress: {}
        };
        saveUserToDB(payload.name, newUser);
        setCurrentUser(newUser);
        return { success: true };
      }}
      onGuestLogin={() => setCurrentUser({name:'Guest', role:'guest', avatarUrl:'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Guest', stats:{streak:1, stars:0}})}
    />
  );

  const CurrentModule = (tabKey === 'review' ? ReviewDashboard : MODULE_COMPONENTS[tabKey]) || (() => <div className="p-10 text-center text-slate-400 font-black italic">Station loading...</div>);
  const currentStation = STATIONS.find(s => s.key === tabKey) || STATIONS[0];
  const weekProgress = getWeekProgress(currentUser, weekId);
  const isTeacher = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  return (
    <>
      {/* 1. KHỐI NỘI DUNG IN (CHỈ HIỆN KHI IN) */}
      <WorksheetGenerator weekData={weekData} />

      {/* 2. KHỐI GIAO DIỆN MÀN HÌNH (ẨN KHI IN) */}
      <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden screen-only">
        <FloatingDictionary />
        <AIProviderStatus />
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} currentUser={currentUser} onUpdateProfile={(u)=>setCurrentUser({...currentUser, ...u})} onLogout={logout} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onLogout={logout} currentUser={currentUser} currentWeekId={weekId} />

        <Sidebar 
          currentUser={currentUser}
          weekId={weekId}
          weekProgress={weekProgress}
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
        
        {/* Progressive Saving UI - Master Prompt V23 Section 0.1.1 & 0.1.2 */}
        <SaveToast 
          status={saveToastStatus} 
          onDismiss={() => setSaveToastStatus(null)} 
        />
        {showCongratulations && (
          <CongratulationsModal
            weekId={weekId}
            onClose={() => setShowCongratulations(false)}
            userStats={{
              accuracy: '95%',
              timeSpent: '2h 30m',
              totalStars: currentUser?.stats?.stars || 0
            }}
          />
        )}
                </div>
            </div>
            
            <div className="flex items-center gap-3">
               {/* Auto-Save Indicator - Master Prompt V23 Section 0.1.1.C */}
               <AutoSaveIndicator status={autoSaveStatus} />
               
               {/* NÚT PRINT DI SẢN (DÙNG ĐỂ KÍCH HOẠT LỆNH IN CỦA TRÌNH DUYỆT) */}
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
              {tabKey === 'game_hub' ? (
                <CurrentModule data={weekData} themeColor={currentStation.color} isVi={isVi} onToggleLang={() => setIsVi(!isVi)} onReportProgress={handleReportProgress} />
              ) : tabKey === 'review' ? (
                <CurrentModule userId={currentUser?.id || currentUser?.name} isAuthenticated={!!currentUser} themeColor={currentStation.color} reviewItems={reviewItems} setReviewItems={setReviewItems} onWeekComplete={handleWeekSrsComplete} />
              ) : (
                <CurrentModule data={matchData} themeColor={currentStation.color} isVi={isVi} onToggleLang={() => setIsVi(!isVi)} onReportProgress={handleReportProgress} />
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
