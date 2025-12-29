import React, { useState } from 'react';
import { X, Check, Crown, ArrowRight, CreditCard, Copy } from 'lucide-react';
import { createPaymentRequest } from '../../utils/userStorage';

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Select Plan, 2: Bank Info, 3: Success
  const [selectedPlan, setSelectedPlan] = useState('basic'); // basic | premium

  if (!isOpen) return null;

  const PLANS = {
    basic: { name: 'JUNIOR SCHOLAR', price: '99,000đ', duration: '/month', features: ['Full Access 144 Weeks', 'Print Worksheets', 'No Ads'] },
    premium: { name: 'ELITE SCHOLAR', price: '990,000đ', duration: '/lifetime', features: ['Everything in Junior', 'Access Video Challenge', 'Priority Support', 'Family Plan (3 Kids)'] }
  };

  const handleConfirm = () => {
    // Lưu request (prefer localStorage, fallback to sessionStorage)
    let userJson = null;
    try {
      userJson = localStorage.getItem('engquest_current_user') || sessionStorage.getItem('engquest_current_user');
    } catch (e) {
      userJson = sessionStorage.getItem('engquest_current_user');
    }

    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        createPaymentRequest(user.name, selectedPlan, selectedPlan === 'basic' ? 99000 : 990000);
        setStep(3);
      } catch (e) {
        alert('Invalid user data. Please login again.');
      }
    } else {
      alert('Please login first!');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in-95">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">
        
        {/* Left Side: Art */}
        <div className="w-full md:w-1/3 bg-indigo-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <div>
            <h2 className="text-3xl font-black mb-2 text-yellow-400">UNLOCK<br/>FUTURE</h2>
            <p className="text-indigo-200 text-sm font-medium">Invest in your child's journey to becoming a global citizen.</p>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3"><div className="p-2 bg-white/10 rounded-lg"><Check size={16}/></div> <span className="text-sm font-bold">IELTS 5.0+ Goal</span></div>
            <div className="flex items-center gap-3"><div className="p-2 bg-white/10 rounded-lg"><Check size={16}/></div> <span className="text-sm font-bold">Critical Thinking</span></div>
            <div className="flex items-center gap-3"><div className="p-2 bg-white/10 rounded-lg"><Check size={16}/></div> <span className="text-sm font-bold">100% Ad-Free</span></div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 bg-slate-50 p-8 flex flex-col relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>

          {step === 1 && (
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-black text-slate-800 mb-6 text-center">Choose Your Plan</h3>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {Object.keys(PLANS).map(key => (
                  <div key={key} onClick={() => setSelectedPlan(key)} 
                    className={`cursor-pointer rounded-2xl p-6 border-2 transition-all flex flex-col ${selectedPlan === key ? 'border-indigo-500 bg-white shadow-xl scale-105 z-10' : 'border-slate-200 bg-slate-100 hover:border-indigo-300'}`}>
                    {key === 'premium' && <div className="self-start px-2 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-black rounded uppercase mb-2">Best Value</div>}
                    <h4 className="font-black text-lg text-slate-700 uppercase">{PLANS[key].name}</h4>
                    <div className="mt-2 mb-4"><span className="text-2xl font-black text-indigo-600">{PLANS[key].price}</span><span className="text-xs text-slate-400 font-bold">{PLANS[key].duration}</span></div>
                    <ul className="space-y-2 mb-6 flex-1">
                        {PLANS[key].features.map((f,i) => <li key={i} className="text-xs text-slate-600 font-medium flex items-start gap-2"><Check size={14} className="text-green-500 shrink-0"/> {f}</li>)}
                    </ul>
                    <div className={`w-6 h-6 rounded-full border-2 ml-auto flex items-center justify-center ${selectedPlan === key ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                        {selectedPlan === key && <Check size={14} className="text-white"/>}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
                Continue to Payment <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <h3 className="text-xl font-black text-slate-800 mb-2 text-center">Bank Transfer</h3>
                <p className="text-sm text-slate-500 text-center mb-6">Please transfer <strong className="text-indigo-600">{PLANS[selectedPlan].price}</strong> to activate.</p>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center"><CreditCard className="text-blue-600"/></div>
                        <div><p className="text-xs font-bold text-slate-400 uppercase">Bank Name</p><p className="font-bold text-slate-800">MB BANK (Military Bank)</p></div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Account Number</p>
                        <div className="flex gap-2">
                            <code className="flex-1 p-3 bg-slate-100 rounded-lg font-mono font-bold text-lg text-slate-700">0123456789</code>
                            <button className="p-3 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg transition-colors"><Copy size={18}/></button>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Account Holder</p>
                        <p className="font-bold text-slate-800 uppercase">NGUYEN VAN ADMIN</p>
                    </div>
                    <div className="p-3 bg-yellow-50 text-yellow-800 text-xs font-bold rounded-lg text-center border border-yellow-100">
                        Content: EQ {selectedPlan.toUpperCase()}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50">Back</button>
                    <button onClick={handleConfirm} className="flex-[2] py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg flex items-center justify-center gap-2">I Have Transferred <Check size={18}/></button>
                </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Check size={48} className="text-green-600"/>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Request Sent!</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-8">We have received your request. The Admin will verify and activate your plan shortly (usually within 1 hour).</p>
                <button onClick={onClose} className="px-8 py-3 bg-slate-800 text-white font-bold rounded-xl">Got it</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
