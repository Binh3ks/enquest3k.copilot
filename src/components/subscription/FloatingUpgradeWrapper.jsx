import React, { useState, useEffect } from 'react';
import SubscriptionModal from './SubscriptionModal';
import { Crown } from 'lucide-react';
import { getCurrentUserPlan } from '../../services/SubscriptionManager';

const FloatingUpgradeWrapper = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      // 1. Check User Role (Ẩn với student/teacher để tránh phiền)
      let userRole = 'guest';
      try {
        const userJson = localStorage.getItem('engquest_current_user') || sessionStorage.getItem('engquest_current_user');
        if (userJson) {
          const user = JSON.parse(userJson);
          userRole = user.role || 'student';
        }
      } catch (e) {}

      if (userRole === 'student' || userRole === 'teacher') {
        setIsVisible(false);
        return;
      }

      // 2. Check System Config (Admin có bật nút này không?)
      try {
        const sysConfig = localStorage.getItem('engquest_sys_config');
        const showUpgradeBtn = sysConfig ? JSON.parse(sysConfig).showUpgradeBtn : false;
        
        if (!showUpgradeBtn) {
          setIsVisible(false);
          return;
        }
      } catch (e) {
        setIsVisible(false);
        return;
      }

      // 3. Check Plan (Đã mua Premium thì thôi)
      const currentPlan = getCurrentUserPlan();
      if (currentPlan === 'premium') {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
    };

    checkVisibility();
    window.addEventListener('subscription-update', checkVisibility);
    window.addEventListener('storage', checkVisibility);
    // Poll nhẹ để cập nhật config real-time
    const interval = setInterval(checkVisibility, 2000);

    return () => {
      window.removeEventListener('subscription-update', checkVisibility);
      window.removeEventListener('storage', checkVisibility);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-bounce-slow"
      >
        <Crown className="w-5 h-5 mr-2 fill-white animate-pulse" />
        <span className="font-black text-sm uppercase tracking-wide">Upgrade Plan</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      <SubscriptionModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default FloatingUpgradeWrapper;
