import React, { useState } from 'react';
import SuperAdminPanel from './SuperAdminPanel';
import { Shield } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

const SuperAdminLauncher = () => {
  const [showPanel, setShowPanel] = useState(false);
  const currentUser = useUserStore(state => state.currentUser);
  const isVisible = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  if (!isVisible) return null;

  return (
    <>
      <button 
        type="button"
        onClick={(e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          setShowPanel(true);
        }}
        className="fixed bottom-24 sm:bottom-4 right-3 sm:right-4 z-[9999] w-11 h-11 sm:w-14 sm:h-14 bg-gray-900 text-yellow-400 hover:text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 sm:border-4 border-yellow-500 cursor-pointer no-print group"
        title="Owner Control Panel"
      >
        <Shield className="w-5 h-5 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {showPanel && <SuperAdminPanel isOpen={showPanel} onClose={() => setShowPanel(false)} />}
    </>
  );
};

export default SuperAdminLauncher;
