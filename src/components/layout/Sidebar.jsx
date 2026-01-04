import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Flame, Edit2, RotateCcw, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import weekIndex from '../../data/weeks/index';

const Sidebar = ({ currentUser, weekId, weekProgress, learningMode, handleToggleMode, tabKey, setIsProfileModalOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();

  // Get last accessed week/station from user progress
  const lastWeek = currentUser?.lastWeek || weekId;
  const lastStation = currentUser?.lastStation || 'read_explore';
  const hasProgress = currentUser?.progress && Object.keys(currentUser.progress).length > 0;

  // Get station progress for each week
  const getWeekStationProgress = (weekNumber) => {
    if (!currentUser?.progress || !currentUser.progress[weekNumber]) return 0;
    
    const weekData = currentUser.progress[weekNumber];
    const stations = Object.keys(weekData);
    if (stations.length === 0) return 0;
    
    const total = stations.reduce((sum, station) => sum + (weekData[station] || 0), 0);
    return Math.round(total / stations.length);
  };

  const handleWeekClick = (targetWeek) => {
    // Students: weeks >=6 require previous week's SRS completed
    try {
      let latestUser = null;
      const json = localStorage.getItem('engquest_current_user') || sessionStorage.getItem('engquest_current_user');
      if (json) latestUser = JSON.parse(json);

      const checkUser = latestUser || currentUser;
      if (checkUser && checkUser.role === 'student' && targetWeek >= 6) {
        const prev = targetWeek - 1;
        const srsDone = checkUser.srs_completed && checkUser.srs_completed[prev];
        if (!srsDone) {
          alert('Please complete the SRS review for the previous week before accessing this week.');
          navigate(`/week/${prev}/review`);
          if (typeof setIsSidebarOpen === 'function') setIsSidebarOpen(false);
          return;
        }
      }
    } catch (e) {
      // If parsing fails, fall back to prop check
      const checkUser = currentUser;
      if (checkUser && checkUser.role === 'student' && targetWeek >= 6) {
        const prev = targetWeek - 1;
        const srsDone = checkUser.srs_completed && checkUser.srs_completed[prev];
        if (!srsDone) {
          alert('Please complete the SRS review for the previous week before accessing this week.');
          navigate(`/week/${prev}/review`);
          if (typeof setIsSidebarOpen === 'function') setIsSidebarOpen(false);
          return;
        }
      }
    }
    navigate(`/week/${targetWeek}/read_explore`);
    if (typeof setIsSidebarOpen === 'function') setIsSidebarOpen(false);
  };

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 ${setIsSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none`}>
    <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <h1 className="font-black text-3xl text-indigo-600 tracking-tighter italic leading-none">EngQuest</h1>
           <ShieldCheck className="text-emerald-500 fill-emerald-50" size={24} />
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-rose-500"><X size={24} /></button>
    </div>
    
    {/* Continue Learning Card - Master Prompt V23 Section 0.1.1.D */}
    {hasProgress && (
      <div 
        onClick={() => navigate(`/week/${lastWeek}/${lastStation}`)}
        className="mx-5 mb-4 p-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all group"
      >
        <div className="text-xs font-black text-white/80 uppercase tracking-widest mb-2">
          Continue Learning
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-white mb-1">
              Week {lastWeek}
            </div>
            <div className="text-sm text-white/90 capitalize">
              {lastStation.replace(/_/g, ' ')}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-white">
              {getWeekStationProgress(lastWeek)}%
            </div>
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    )}

    {/* User Profile Card */}
    <div onClick={() => setIsProfileModalOpen(true)} className="mx-5 mb-6 p-6 bg-gradient-to-br from-slate-50 to-white rounded-[40px] border-2 border-slate-100 hover:border-indigo-300 shadow-lg cursor-pointer transition-all group relative overflow-hidden">
      <div className="absolute top-5 right-5 text-slate-300 group-hover:text-indigo-500"><Edit2 size={16}/></div>
      <div className="flex items-center space-x-4 mb-4 relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-white border-2 border-indigo-100 overflow-hidden shadow-md transform group-hover:rotate-6 transition-transform">
          <img src={currentUser.avatar_url || currentUser.avatarUrl || "https://api.dicebear.com/7.x/micah/svg?seed=Felix"} alt="User" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-black text-lg text-slate-800 truncate leading-none mb-1">{currentUser.username || currentUser.name}</h3>
          <button onClick={handleToggleMode} className={`mt-2 text-[10px] font-black px-3 py-1.5 rounded-full border-2 flex items-center gap-1.5 transition-all ${learningMode === 'easy' ? 'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100' : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'}`}>
            <RotateCcw size={10} /> {learningMode === 'easy' ? 'EASY MODE' : 'ADVANCED'}
          </button>
        </div>
      </div>
      <div className="relative z-10">
        <div className="flex justify-between text-[10px] uppercase font-black text-slate-400 mb-2 tracking-widest"><span>Learning Week {weekId}</span><span>{weekProgress}%</span></div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner"><div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${weekProgress}%` }}></div></div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-5 space-y-1.5 custom-scrollbar pb-6">
      <Link to={`/week/${weekId}/review`} className={`flex items-center p-4 rounded-[24px] transition-all shadow-sm group mb-6 ${tabKey === 'review' ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-orange-50 border-2 border-orange-100 text-orange-600 hover:bg-orange-100'}`}>
          <div className={`p-2.5 rounded-2xl mr-4 ${tabKey === 'review' ? 'bg-white/20' : 'bg-white shadow-sm'}`}><Flame size={20} /></div>
          <span className="text-sm font-black uppercase italic tracking-tighter">Review Dashboard</span>
      </Link>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 ml-2">Weekly Journey</p>
      {weekIndex.map(w => {
        const progress = getWeekStationProgress(w.id);
        const isComplete = progress === 100;
        
        return (
          <button key={w.id} onClick={() => handleWeekClick(w.id)} className={`relative w-full text-left flex items-center p-3.5 rounded-[20px] transition-all ${w.id === weekId ? 'bg-indigo-600 text-white shadow-xl scale-[1.02]' : 'text-slate-600 border-2 border-transparent hover:bg-slate-50'}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mr-4 font-black text-xs ${w.id === weekId ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>{w.id}</div>
            <span className="text-sm font-bold truncate">{w.title_en}</span>
            
            {/* Progress Badge - Master Prompt V23 Section 0.1.1.B */}
            {progress > 0 && (
              <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-md ${
                isComplete 
                  ? 'bg-green-500' 
                  : 'bg-gradient-to-br from-yellow-400 to-orange-500'
              }`}>
                {isComplete ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  `${progress}%`
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
    </aside>
  );
};
export default Sidebar;
