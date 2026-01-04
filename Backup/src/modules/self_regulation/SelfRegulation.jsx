import React, { useState } from 'react';
import { Target, CheckSquare, Battery, BookOpen, Globe } from 'lucide-react';

const SelfRegulation = ({ themeColor, isVi, onToggleLang }) => {
  const [goals, setGoals] = useState(['', '', '']);
  const [mood, setMood] = useState(null);

  return (
    <div className="pb-24 space-y-8">
       {/* Header */}
       <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 flex justify-between items-center">
          <div>
             <h2 className="text-2xl font-black text-sky-900 uppercase">My Learning Goals</h2>
             <p className="text-sky-600 font-bold text-sm">Self-Regulation & Reflection</p>
          </div>
          <button onClick={onToggleLang} className="p-2 bg-white rounded-lg shadow-sm text-xs font-bold flex items-center text-slate-500"><Globe className="w-3 h-3 mr-1"/> {isVi?'VI':'EN'}</button>
       </div>

       {/* Daily Goals */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-black text-slate-400 uppercase mb-4 flex items-center"><Target className="w-4 h-4 mr-2"/> Today's Goals</h3>
          <div className="space-y-3">
             {goals.map((g, i) => (
                <div key={i} className="flex gap-3">
                   <div className="mt-3 w-4 h-4 rounded border-2 border-slate-300"></div>
                   <input 
                     type="text" 
                     className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:bg-white focus:border-sky-400 outline-none transition-all"
                     placeholder={`Goal #${i+1} (e.g., Learn 5 new words)`}
                     value={g}
                     onChange={(e) => { const n = [...goals]; n[i] = e.target.value; setGoals(n); }}
                   />
                </div>
             ))}
          </div>
       </div>

       {/* Reflection Journal */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-black text-slate-400 uppercase mb-4 flex items-center"><BookOpen className="w-4 h-4 mr-2"/> Daily Reflection</h3>
          <p className="text-sm font-bold text-slate-700 mb-2">How do you feel about your learning today?</p>
          <div className="flex gap-4 mb-4">
             {['🤩 Excited', '🙂 Good', '😐 Okay', '😫 Tired'].map(m => (
                <button 
                  key={m} 
                  onClick={() => setMood(m)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${mood === m ? 'bg-sky-500 text-white border-sky-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                >
                  {m}
                </button>
             ))}
          </div>
          <textarea className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:bg-white focus:border-sky-400 outline-none" rows="4" placeholder="Write about what you learned..."></textarea>
       </div>
    </div>
  );
};
export default SelfRegulation;
