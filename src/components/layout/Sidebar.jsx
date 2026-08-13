import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { X, Flame, Edit2, RotateCcw, ShieldCheck, CheckCircle, ArrowRight, Star, Lock, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import NovaMascot from '../NovaMascot';
import weekIndex from '../../data/weeks/index';
import { useUserStore } from '../../stores/useUserStore'; // Import the store
import { calculateStars } from '../../utils/scoringSystem';
import { getBankStats } from '../../utils/wordMemoryBank';
import { usePlanAccess } from '../../hooks/usePlanAccess';
import { getAvatarItem } from '../../data/avatarItemConfig';
import { COLLECTIONS } from '../../data/collectionConfig';

const Sidebar = ({ currentUser, weekId: currentWeekId, learningMode, handleToggleMode, tabKey, setIsProfileModalOpen, setIsSidebarOpen, onShowUpgrade, setIsAvatarClosetOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { weekId: paramWeekId } = useParams();
  const weekId = parseInt(paramWeekId || currentWeekId);

  // Shadowing mode: sidebar auto-collapses to a thin strip with a chevron
  // button to re-open. State persists per session via React state.
  const isShadowing = location.pathname.includes('/shadow');
  const [shadowCollapsed, setShadowCollapsed] = useState(true);

  const { canAccessWeek, effectivePlan, trialDaysLeft, planLabel, planDaysLeft } = usePlanAccess();

  // Get progress directly from the store - using a selector to minimize re-renders
  const weekCompletion = useUserStore(state => state.weekCompletion);
  const weekStars = useUserStore(state => state.weekStars);
  const progressCache = useUserStore(state => state.progressCache);
  const avatarItems = useUserStore(state => state.avatarItems);
  const equippedItems = useUserStore(state => state.equippedItems);

  const weekProgress = useMemo(() => weekCompletion[weekId] || 0, [weekCompletion, weekId]);
  const currentWeekStars = useMemo(() => weekStars[weekId] || { totalStars: 0, maxStars: 0 }, [weekStars, weekId]);

  // Get last accessed week/station from user progress
  const lastWeek = currentUser?.lastWeek || weekId;
  const lastStation = currentUser?.lastStation || 'read_explore';
  const hasProgress = currentUser?.progress && Object.keys(currentUser.progress).length > 0;

  // Live SRS due-today count + bank stats — re-read from localStorage on every tab change
  const [srsDueCount, setSrsDueCount] = useState(0);
  const [bankStats, setBankStats] = useState({ total: 0, mastered: 0 });
  useEffect(() => {
    try {
      const stats = getBankStats();
      setSrsDueCount(stats.dueToday || 0);
      setBankStats({ total: stats.total || 0, mastered: stats.mastered || 0 });
    } catch { /* ignore */ }
  }, [tabKey]);

  // Get station progress for each week from the new centralized state
  const getWeekStationProgress = useMemo(() => {
    return (weekNumber) => weekCompletion[weekNumber] || 0;
  }, [weekCompletion]);

  // Get stars for each week
  const getWeekStars = useMemo(() => {
    return (weekNumber) => weekStars[weekNumber] || { totalStars: 0, maxStars: 0, percentage: 0 };
  }, [weekStars]);

  const handleWeekClick = (targetWeek) => {
    // Check plan gating first
    if (!canAccessWeek(targetWeek)) {
      if (typeof onShowUpgrade === 'function') onShowUpgrade();
      return;
    }
    // Students: weeks >=6 require previous week's SRS completed
    try {
      let latestUser = null;
      const json = localStorage.getItem('engquest-user-storage');
      if (json) {
        const parsed = JSON.parse(json);
        latestUser = parsed?.state?.currentUser;
      }

      const checkUser = latestUser || currentUser;
      if (checkUser && checkUser.role === 'student' && targetWeek >= 6) {
        const prev = targetWeek - 1;
        const srsDone = progressCache[prev]?.review_session?.isCompleted;
        if (!srsDone) {
          alert('Please complete the SRS review for the previous week before accessing this week.');
          navigate(`/week/${prev}/review`);
          if (typeof setIsSidebarOpen === 'function') setIsSidebarOpen(false);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to check SRS completion status:", e);
    }
    navigate(targetWeek >= 33 ? `/week/${targetWeek}/hub/1` : `/week/${targetWeek}/read_explore`);
    if (typeof setIsSidebarOpen === 'function') setIsSidebarOpen(false);
  };


  // Shadowing collapsed strip — auto-hides full sidebar to a thin tab on
  // the left edge. User clicks the chevron to re-open.
  if (isShadowing && shadowCollapsed) {
    return (
      <aside className="fixed lg:static inset-y-0 left-0 z-50 w-12 bg-white border-r border-slate-200 flex flex-col items-center pt-4 shadow-md lg:shadow-none">
        <button
          onClick={() => setShadowCollapsed(false)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors"
          title="Mở sidebar"
        >
          <ChevronRight size={20} />
        </button>
      </aside>
    );
  }

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ${setIsSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none`}>
    <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <NovaMascot size={44} mood="sidebar" />
           <h1 style={{ fontFamily: "'Nunito', 'Quicksand', system-ui, sans-serif", fontWeight: 800, fontSize: '1.6rem', color: '#58cc02', letterSpacing: '-0.5px', lineHeight: 1 }}>Lexio</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-rose-500"><X size={24} /></button>
        {isShadowing && (
          <button
            onClick={() => setShadowCollapsed(true)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-rose-500 transition-colors"
            title="Ẩn sidebar"
          >
            <X size={20} />
          </button>
        )}
    </div>
    
    {/* Continue Learning Card - Master Prompt V23 Section 0.1.1.D */}
    {hasProgress && (
      <div 
        onClick={() => navigate(`/week/${lastWeek}/${lastStation}`)}
        className="mx-3 mb-3 p-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all group"
      >
        <div className="text-xs font-black text-white/80 uppercase tracking-widest mb-2">
          Continue Learning
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-white mb-1">
              Week {lastWeek}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="text-xl font-bold text-white">
                {getWeekStars(lastWeek).totalStars}/{getWeekStars(lastWeek).maxStars}
              </span>
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
    <div onClick={() => setIsProfileModalOpen(true)} className="mx-3 mb-4 p-4 bg-gradient-to-br from-slate-50 to-white rounded-[32px] border-2 border-slate-100 hover:border-indigo-300 shadow-lg cursor-pointer transition-all group relative overflow-hidden">
      <div className="absolute top-5 right-5 text-slate-300 group-hover:text-indigo-500"><Edit2 size={16}/></div>
      <div className="flex items-center space-x-4 mb-4 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white border-2 border-indigo-100 overflow-hidden shadow-md relative">
          <img src={currentUser.avatar_url || currentUser.avatarUrl || "https://api.dicebear.com/7.x/micah/svg?seed=Felix"} alt="User" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          {Object.values(equippedItems).filter(Boolean).length > 0 && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center ring-1 ring-slate-200 text-[8px]">
              {Object.values(equippedItems).filter(Boolean).map(id => getAvatarItem(id)).filter(Boolean)[0]?.icon || '🎁'}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-black text-sm text-slate-800 truncate leading-none mb-1">{currentUser.display_name || currentUser.username || currentUser.name}</h3>
          {weekId < 33 ? (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                if (handleToggleMode) handleToggleMode(); 
              }} 
              className={`mt-2 text-[10px] font-black px-3 py-1.5 rounded-full border-2 flex items-center gap-1.5 transition-all ${learningMode === 'easy' ? 'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100' : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'}`}
            >
              <RotateCcw size={10} /> {learningMode === 'easy' ? 'EASY MODE' : 'ADVANCED'}
            </button>
          ) : (
            <div className="mt-2 text-[10px] font-black px-3 py-1.5 rounded-full border-2 flex items-center gap-1.5 bg-indigo-50 text-indigo-600 border-indigo-200 w-max shadow-sm">
              ✨ CAMBRIDGE FULL MODE
            </div>
          )}
        </div>
      </div>
      <div className="relative z-10">
        <div className="flex justify-between text-[10px] uppercase font-black text-slate-400 mb-2 tracking-widest">
          <span>Learning Week {weekId}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{currentWeekStars.totalStars}/{currentWeekStars.maxStars}</span>
          </div>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner"><div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${weekProgress}%` }}></div></div>
        {/* Plan badge */}
        <div className="flex items-center justify-between mt-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
            effectivePlan === 'unlimited' ? 'bg-amber-100 text-amber-700' :
            effectivePlan === 'premium_lifetime' ? 'bg-amber-100 text-amber-700' :
            effectivePlan === 'free_trial' ? 'bg-sky-100 text-sky-700' :
            effectivePlan === 'expired' ? 'bg-rose-100 text-rose-700' :
            effectivePlan === 'guest' ? 'bg-slate-100 text-slate-500' :
            'bg-emerald-100 text-emerald-700'
          }`}>{planLabel}</span>
          {planDaysLeft != null && effectivePlan !== 'unlimited' && effectivePlan !== 'premium_lifetime' && (
            <span className={`text-[10px] font-bold ${ planDaysLeft <= 7 ? 'text-rose-500' : planDaysLeft <= 30 ? 'text-amber-500' : 'text-slate-400' }`}>
              còn {planDaysLeft}n
            </span>
          )}
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar pb-4">
      <Link to={`/week/${weekId}/review`} className={`flex items-center p-3 rounded-[20px] transition-all shadow-sm group mb-4 ${tabKey === 'review' ? 'bg-violet-500 text-white shadow-violet-200' : 'bg-violet-50 border-2 border-violet-100 text-violet-600 hover:bg-violet-100'}`}>
          <div className={`p-2 rounded-xl mr-3 ${tabKey === 'review' ? 'bg-white/20' : 'bg-white shadow-sm'}`}><Flame size={16} /></div>
          <span className="text-xs font-black uppercase italic tracking-tighter flex-1">Weekly Review</span>
          {srsDueCount > 0 && tabKey !== 'review' && (
            <span className="ml-2 min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
              {srsDueCount > 99 ? '99+' : srsDueCount}
            </span>
          )}
      </Link>

      {/* Collection Board Link */}
      <button
        onClick={() => navigate('/collection')}
        className="flex items-center p-3 rounded-[20px] transition-all shadow-sm group mb-2 w-full bg-indigo-50 border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-100"
      >
        <div className="p-2 rounded-xl mr-3 bg-white shadow-sm">
          <Sparkles size={16} className="text-indigo-500" />
        </div>
        <span className="text-xs font-black uppercase italic tracking-tighter flex-1 text-left">Collection</span>
        <span className="text-[9px] font-black text-slate-400">
          {COLLECTIONS.filter(c => c.weekRange.every(w => (weekCompletion[w] || 0) >= 100)).length}/{COLLECTIONS.length}
        </span>
      </button>

      {/* Avatar Closet Button */}
      <button
        onClick={() => setIsAvatarClosetOpen?.(true)}
        className="flex items-center p-3 rounded-[20px] transition-all shadow-sm group mb-2 w-full bg-purple-50 border-2 border-purple-100 text-purple-600 hover:bg-purple-100"
      >
        <div className="p-2 rounded-xl mr-3 bg-white shadow-sm text-base">👗</div>
        <span className="text-xs font-black uppercase italic tracking-tighter flex-1 text-left">Avatar Closet</span>
        <span className="text-[9px] font-black text-purple-400">{avatarItems.length}/6</span>
      </button>

      {/* Word Treasury Button */}
      <button
        onClick={() => navigate('/word-treasury')}
        className="flex items-center p-3 rounded-[20px] transition-all shadow-sm group mb-4 w-full bg-emerald-50 border-2 border-emerald-100 text-emerald-600 hover:bg-emerald-100"
      >
        <div className="p-2 rounded-xl mr-3 bg-white shadow-sm">📖</div>
        <span className="text-xs font-black uppercase italic tracking-tighter flex-1 text-left">Word Treasury</span>
        <span className="text-[9px] font-black text-emerald-400">{bankStats.mastered}/{bankStats.total}</span>
      </button>

      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 ml-2">Weekly Journey</p>
      {/* Parent: link to manage child accounts */}
      {currentUser?.role === 'parent' && (
        <div className="mx-2 mb-3 px-3 py-2 bg-violet-50 border border-violet-200 rounded-xl text-center">
          <p className="text-[10px] font-black text-violet-700">👨‍👩‍👧‍👦 Gói Gia Đình</p>
          <Link to="/parent/children" className="text-[10px] font-black text-violet-600 hover:underline mt-0.5 block">Quản lý tài khoản con →</Link>
        </div>
      )}
      {/* Trial banner */}
      {effectivePlan === 'guest' && (
        <div className="mx-2 mb-3 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
          <p className="text-[10px] font-black text-indigo-700">🎁 Đang xem thử W1–W3</p>
          <button onClick={() => typeof onShowUpgrade === 'function' && onShowUpgrade()} className="text-[10px] font-black text-indigo-600 hover:underline mt-0.5">Đăng ký miễn phí 14 ngày → mở W1–W8!</button>
        </div>
      )}
      {effectivePlan === 'free_trial' && trialDaysLeft <= 14 && (
        <div className="mx-2 mb-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <p className="text-[10px] font-black text-amber-700">Dùng thử còn {trialDaysLeft} ngày</p>
          <button onClick={() => typeof onShowUpgrade === 'function' && onShowUpgrade()} className="text-[10px] font-black text-indigo-600 hover:underline mt-0.5">Nâng cấp ngay →</button>
        </div>
      )}
      {effectivePlan === 'expired' && (
        <div className="mx-2 mb-3 px-3 py-2 bg-rose-50 border border-rose-200 rounded-xl text-center">
          <p className="text-[10px] font-black text-rose-700">Tài khoản đã hết hạn</p>
          <button onClick={() => typeof onShowUpgrade === 'function' && onShowUpgrade()} className="text-[10px] font-black text-indigo-600 hover:underline mt-0.5">Gia hạn ngay →</button>
        </div>
      )}

      {weekIndex.map(w => {
        const progress = getWeekStationProgress(w.id);
        const stars = getWeekStars(w.id);
        const isComplete = progress === 100;
        const isLocked = !canAccessWeek(w.id);
        
        return (
          <button key={w.id} onClick={() => handleWeekClick(w.id)}
            className={`relative w-full text-left flex items-center p-2.5 rounded-[16px] transition-all
              ${w.id === weekId ? 'bg-indigo-600 text-white shadow-xl scale-[1.02]'
              : isLocked ? 'text-slate-400 border-2 border-transparent bg-slate-50 opacity-70 cursor-pointer hover:opacity-100'
              : 'text-slate-600 border-2 border-transparent hover:bg-slate-50'}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-3 font-black text-xs flex-shrink-0
              ${w.id === weekId ? 'bg-white/20 text-white'
              : isLocked ? 'bg-slate-200 text-slate-400'
              : 'bg-slate-100 text-slate-400'}`}>
              {isLocked ? <Lock size={12} /> : w.id}
            </div>
            <span className="text-xs font-bold truncate">{w.title_en}</span>
            
            {/* Progress Badge */}
            {!isLocked && progress > 0 && (
              <div className={`absolute -top-1 -right-1 flex items-center gap-0.5 px-2 py-1 rounded-full text-[9px] font-black text-white shadow-md ${
                isComplete ? 'bg-green-500' : 'bg-gradient-to-br from-yellow-400 to-orange-500'
              }`}>
                {isComplete ? <CheckCircle className="w-3.5 h-3.5" /> : (<><Star className="w-2.5 h-2.5 fill-white" /><span>{stars.totalStars}/{stars.maxStars}</span></>)}
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
