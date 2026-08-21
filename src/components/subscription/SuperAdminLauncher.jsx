import React, { useState, useEffect } from 'react';
import SuperAdminPanel from './SuperAdminPanel';
import { useUserStore } from '../../stores/useUserStore';

const SuperAdminLauncher = () => {
  const [showPanel, setShowPanel] = useState(false);
  const currentUser = useUserStore(state => state.currentUser);
  const isVisible = currentUser?.role === 'super_admin' || currentUser?.role === 'admin' || currentUser?.role === 'owner';

  useEffect(() => {
    window.__openSuperAdminPanel = () => {
      if (isVisible) {
        setShowPanel(true);
      }
    };
    return () => {
      delete window.__openSuperAdminPanel;
    };
  }, [isVisible]);

  if (!isVisible || !showPanel) return null;

  return (
    <SuperAdminPanel isOpen={showPanel} onClose={() => setShowPanel(false)} />
  );
};

export default SuperAdminLauncher;

