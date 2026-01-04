import React from 'react';
import { Lock, Star, Crown } from 'lucide-react';

const LockScreen = ({ type, onUnlock }) => {
  const isGuestLimit = type === 'guest_limit';
  
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50/90 backdrop-blur-sm p-4 text-center animate-in fade-in">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border-2 border-indigo-50">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-indigo-600" />
        </div>
        
        <h2 className="text-2xl font-black text-slate-800 mb-2">
            {isGuestLimit ? "Trial Period Ended" : "Premium Feature"}
        </h2>
        
        <p className="text-slate-500 font-medium mb-6">
            {isGuestLimit 
                ? "Guest account is limited to the first 3 weeks. Please register to continue your journey!" 
                : "This feature requires a Premium account. Upgrade now to unlock full potential!"}
        </p>

        {/* Gamification Mockup */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-xs font-bold text-amber-600 uppercase mb-2 flex items-center justify-center gap-1"><Star size={12} fill="currentColor"/> Gamification Challenge</p>
            <p className="text-sm font-bold text-slate-700">Earn 50 Stars to unlock Premium for 24h!</p>
            <div className="w-full h-2 bg-amber-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-amber-500 w-[20%]"></div>
            </div>
            <p className="text-[10px] text-amber-600 mt-1 text-right">10/50 Stars</p>
        </div>

        <div className="space-y-3">
            <button onClick={onUnlock} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
                <Crown size={18} /> {isGuestLimit ? "Register Now" : "Upgrade Plan"}
            </button>
            <button onClick={() => window.location.reload()} className="text-sm font-bold text-slate-400 hover:text-slate-600">
                Maybe Later
            </button>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
