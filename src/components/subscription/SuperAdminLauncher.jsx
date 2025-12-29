import React, { useState, useEffect } from 'react';
import SuperAdminPanel from './SuperAdminPanel';
import { Shield } from 'lucide-react';

const SuperAdminLauncher = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkRole = () => {
      try {
        const userJson = localStorage.getItem('engquest_current_user') || sessionStorage.getItem('engquest_current_user');
        if (userJson) {
          const user = JSON.parse(userJson);
          // STRICT CHECK: CHỈ SUPER ADMIN (OWNER)
          if (user.role === 'super_admin') {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        } else {
          setIsVisible(false);
        }
      } catch (e) {
        setIsVisible(false);
      }
    };

    checkRole();
    const interval = setInterval(checkRole, 1000); // Check thường xuyên hơn
    return () => clearInterval(interval);
  }, []);

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
