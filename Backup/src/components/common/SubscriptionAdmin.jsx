import React, { useState } from 'react';
import { Users, DollarSign, Save } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../../services/SubscriptionManager';

const SubscriptionAdmin = () => {
  const [plans, setPlans] = useState(SUBSCRIPTION_PLANS);

  const handlePriceChange = (key, val) => {
    setPlans(prev => ({
      ...prev,
      [key]: { ...prev[key], price: val }
    }));
  };

  return (
    <div className="p-6 bg-gray-50 h-full overflow-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <DollarSign className="text-green-600" /> Subscription Management
      </h2>

      {/* 1. Plans Configuration */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-700">Pricing Plans</h3>
        <div className="grid gap-4">
          {Object.entries(plans).map(([key, plan]) => (
            <div key={key} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div>
                <span className="font-bold text-indigo-700">{plan.name}</span>
                <span className="text-xs text-gray-500 ml-2">({key})</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={plan.price}
                  onChange={(e) => handlePriceChange(key, e.target.value)}
                  className="border rounded px-3 py-1 w-32 text-right"
                />
                <span className="text-sm text-gray-600">VND</span>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          <Save size={16} /> Save Pricing
        </button>
      </div>

      {/* 2. Mock Users */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-4 text-gray-700">User Status</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">student@engquest.com</td>
              <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Premium</span></td>
              <td className="p-3 text-right"><button className="text-red-500 hover:underline">Downgrade</button></td>
            </tr>
            <tr className="border-t">
              <td className="p-3">newuser@gmail.com</td>
              <td className="p-3"><span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Free</span></td>
              <td className="p-3 text-right"><button className="text-blue-500 hover:underline">Upgrade</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionAdmin;
