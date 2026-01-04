import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, ChevronRight } from 'lucide-react';

const HeaderProfileMenu = ({ user, onLogout, onOpenProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative z-50" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 focus:outline-none group"
      >
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
            {user.username || user.name}
          </p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {user.role === 'super_admin' ? 'Owner' : user.role}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-slate-200 p-[2px] bg-white group-hover:border-indigo-400 transition-all shadow-sm">
          <img 
            src={user.avatar_url || user.avatarUrl || "https://api.dicebear.com/7.x/micah/svg?seed=Felix"} 
            alt="Avatar" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
          <div className="p-4 bg-slate-50 border-b md:hidden">
            <p className="font-bold text-slate-800">{user.username || user.name}</p>
            <p className="text-xs text-slate-500 uppercase">{user.role}</p>
          </div>
          <div className="p-2 space-y-1">
            <button 
              onClick={() => { setIsOpen(false); onOpenProfile(); }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all font-medium text-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                  <User size={18} />
                </div>
                My Profile
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400" />
            </button>
            <div className="h-px bg-slate-100 my-1 mx-2"></div>
            <button 
              onClick={() => { setIsOpen(false); onLogout(); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-all font-medium text-sm group"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-400 flex items-center justify-center">
                <LogOut size={18} />
              </div>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderProfileMenu;
