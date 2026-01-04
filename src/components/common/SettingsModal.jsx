import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Wrench, LogOut } from 'lucide-react';
import { getAdminStudents } from '../../services/api'; 
import MediaStudio from './MediaStudio'; 

const SettingsModal = ({ isOpen, onClose, onLogout, currentUser, currentWeekId }) => { 
  const [stats, setStats] = useState({ users: 0, avgLevel: 0, students: [] });

  // Role Logic
  const isAdminOrOwner = currentUser.role === 'admin' || currentUser.role === 'super_admin';
  const isTeacherView = currentUser.role === 'teacher' || isAdminOrOwner;

  const [activeTab, setActiveTab] = useState(isTeacherView ? 'dashboard' : ''); 

  useEffect(() => { 
      const fetchStudents = async () => {
        if (isTeacherView && isOpen) {
          try {
            const response = await getAdminStudents();
            const students = response.data;
            const count = students.length;
            let totalWeek = 0;
            students.forEach(s => totalWeek += (s.last_week || 1));

            setStats({
                users: count,
                avgLevel: count > 0 ? Math.round(totalWeek / count) : 1,
                students: students.map(s => ({
                  name: s.username,
                  stars: s.stars || 0,
                  week: s.last_week || 1
                })).sort((a, b) => b.stars - a.stars)
            });
          } catch (error) {
            console.error("Failed to fetch students from API:", error);
          }
        }
      };
      fetchStudents();
  }, [isOpen, isTeacherView]); 
  
  if (!isOpen) return null; 
  
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[650px] flex flex-col overflow-hidden animate-in zoom-in-95 shadow-2xl">
        <div className="flex border-b bg-slate-50">
            {isTeacherView && (
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`flex-1 p-4 font-bold text-sm flex items-center justify-center ${activeTab === 'dashboard' ? 'text-orange-600 border-b-2 border-orange-500 bg-white' : 'text-slate-500 hover:bg-white'}`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2"/> Students
              </button>
            )}
            {isAdminOrOwner && (
              <button 
                onClick={() => setActiveTab('studio')} 
                className={`flex-1 p-4 font-bold text-sm flex items-center justify-center ${activeTab === 'studio' ? 'text-purple-600 border-b-2 border-purple-500 bg-white' : 'text-slate-500 hover:bg-white'}`}
              >
                <Wrench className="w-4 h-4 mr-2"/> Media Studio
              </button>
            )}
        </div>
        <div className="flex-1 p-6 overflow-auto bg-white">
            {activeTab === 'dashboard' && isTeacherView && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                          <h3 className="text-3xl font-black text-indigo-900">{stats.users}</h3>
                          <p className="text-xs font-bold text-indigo-400 uppercase">Students</p>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                          <h3 className="text-3xl font-black text-emerald-900">W{stats.avgLevel}</h3>
                          <p className="text-xs font-bold text-emerald-400 uppercase">Avg. Week</p>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                              <tr><th className="p-3 text-left">Name</th><th className="p-3 text-center">Stars</th><th className="p-3 text-center">Week</th></tr>
                            </thead>
                            <tbody>
                              {stats.students.map((s, i) => (
                                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                                  <td className="p-3 font-bold text-slate-800">{s.name}</td>
                                  <td className="p-3 text-center text-amber-500">★ {s.stars}</td>
                                  <td className="p-3 text-center font-bold text-indigo-600">W{s.week}</td>
                                </tr>
                              ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {activeTab === 'studio' && isAdminOrOwner && (<MediaStudio defaultWeekId={currentWeekId || 1} />)}
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <button onClick={onClose} className="px-6 py-2 bg-white border border-slate-300 font-bold text-slate-600 rounded-lg hover:bg-slate-100">Close</button>
            <button onClick={onLogout} className="text-rose-600 font-bold text-sm flex items-center hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors"><LogOut className="w-4 h-4 mr-2"/> Log Out</button>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;
