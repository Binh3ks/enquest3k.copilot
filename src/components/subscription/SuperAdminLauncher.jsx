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
        onClick={() => setShowPanel(true)}
        className="fixed bottom-4 right-4 z-[9999] w-14 h-14 bg-gray-900 text-yellow-400 hover:text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-yellow-500 cursor-pointer no-print group"
        title="Owner Control Panel"
      >
        <Shield className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      {showPanel && <SuperAdminPanel isOpen={showPanel} onClose={() => setShowPanel(false)} />}
    </>
  );
};

export default SuperAdminLauncher;
