import React, { useState } from 'react';
import { X, BarChart, DollarSign } from 'lucide-react';
import SubscriptionAdmin from './SubscriptionAdmin';

const AdminDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-bold text-xl text-indigo-800">Admin Panel</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`}
          >
            <BarChart size={18} /> Overview
          </button>
          
          {/* NÚT SUBSCRIPTION BẠN CẦN Ở ĐÂY */}
          <button 
            onClick={() => setActiveTab('subscription')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'subscription' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`}
          >
            <DollarSign size={18} /> Subscription & Plans
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-auto">
        {activeTab === 'overview' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Welcome Admin!</h1>
            <p>Select "Subscription & Plans" to manage pricing.</p>
          </div>
        )}
        {activeTab === 'subscription' && <SubscriptionAdmin />}
      </div>
    </div>
  );
};

export default AdminDashboard;
