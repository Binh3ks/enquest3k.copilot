import React, { useState } from 'react';
import SubscriptionModal from './SubscriptionModal';
import { Crown } from 'lucide-react';
import { usePlanAccess } from '../../hooks/usePlanAccess';

const FloatingUpgradeWrapper = () => {
  const [showModal, setShowModal] = useState(false);
  const { isPaid, effectivePlan } = usePlanAccess();

  // Hide if already paid or plan is unlimited
  if (isPaid || effectivePlan === 'unlimited') return null;

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

