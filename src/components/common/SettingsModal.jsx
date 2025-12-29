import React, { useState, useEffect } from 'react';
import { Mic2, LayoutDashboard, Wrench, Shield, Volume2, LogOut, UserPlus } from 'lucide-react';
import { loadAllUsers, saveUserToDB } from '../../utils/userStorage'; 
import { getVoicesList, setVoice, loadVoices } from '../../utils/AudioHelper';
import MediaStudio from './MediaStudio'; 

const SettingsModal = ({ isOpen, onClose, onLogout, currentUser, currentWeekId }) => { 
  const [activeTab, setActiveTab] = useState('voice'); 
  const [teacherName, setTeacherName] = useState('');
  const [teacherPass, setTeacherPass] = useState('');
  const [voices, setVoices] = useState([]); 
  const [stats, setStats] = useState({ users: 0, avgLevel: 0, students: [] });

  // Role Logic
  const canManageTeachers = currentUser.role === 'admin' || currentUser.role === 'super_admin';
  const isSuperAdmin = currentUser.role === 'super_admin';
  const isTeacherView = currentUser.role === 'teacher' || canManageTeachers;

  useEffect(() => { 
      loadVoices().then(v => setVoices(getVoicesList()));
      
      if (isTeacherView && isOpen) {
          const allUsers = loadAllUsers();
          const userKeys = Object.keys(allUsers).filter(k => allUsers[k].role === 'student');
          const count = userKeys.length;
          let totalWeek = 0;
          const studentsList = [];
          userKeys.forEach(k => {
              const u = allUsers[k];
              totalWeek += (u.lastWeekVisited || 1);
              studentsList.push({ name: u.name, week: u.lastWeekVisited || 1, stars: u.stats?.stars || 0 });
          });
          setStats({
              users: count,
              avgLevel: count > 0 ? Math.round(totalWeek / count) : 1,
              students: studentsList.sort((a, b) => b.stars - a.stars)
          });
      }
  }, [isOpen, isTeacherView]); 
  
  if (!isOpen) return null; 
  
  const handleCreateTeacher = () => {
      if(!teacherName || !teacherPass) return alert("Enter info!");
      const users = loadAllUsers();
      if(users[teacherName]) return alert("User exists!");
      
      saveUserToDB(teacherName, {
          name: teacherName, password: teacherPass,
          role: 'teacher', // Admin creates Teacher (View Only)
          age: 'Adult',
          plan: 'premium',
          stats: { streak: 0, stars: 0 },
          avatarUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=${teacherName}&backgroundColor=e0e7ff`
      });
      alert("Teacher Created!");
      setTeacherName(''); setTeacherPass('');
  };
  
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[650px] flex flex-col overflow-hidden animate-in zoom-in-95 shadow-2xl">
        <div className="flex border-b bg-slate-50">
            <button onClick={() => setActiveTab('voice')} className={`flex-1 p-4 font-bold text-sm flex items-center justify-center ${activeTab==='voice'?'text-indigo-600 border-b-2 border-indigo-500 bg-white':'text-slate-500 hover:bg-white'}`}><Mic2 className="w-4 h-4 mr-2"/> Voice</button>
            {isTeacherView && (<button onClick={() => setActiveTab('dashboard')} className={`flex-1 p-4 font-bold text-sm flex items-center justify-center ${activeTab==='dashboard'?'text-orange-600 border-b-2 border-orange-500 bg-white':'text-slate-500 hover:bg-white'}`}><LayoutDashboard className="w-4 h-4 mr-2"/> Students</button>)}
            {canManageTeachers && (<button onClick={() => setActiveTab('create_teacher')} className={`flex-1 p-4 font-bold text-sm flex items-center justify-center ${activeTab==='create_teacher'?'text-green-600 border-b-2 border-green-500 bg-white':'text-slate-500 hover:bg-white'}`}><UserPlus className="w-4 h-4 mr-2"/> New Teacher</button>)}
            {isSuperAdmin && (<button onClick={() => setActiveTab('studio')} className={`flex-1 p-4 font-bold text-sm flex items-center justify-center ${activeTab==='studio'?'text-purple-600 border-b-2 border-purple-500 bg-white':'text-slate-500 hover:bg-white'}`}><Wrench className="w-4 h-4 mr-2"/> Studio</button>)}
        </div>
        <div className="flex-1 p-6 overflow-auto bg-white">
            {activeTab === 'voice' && (
                <div className="space-y-2">
                    <h3 className="font-black text-slate-700 mb-4">Select Voice</h3>
                    {voices.map(v => (
                        <button key={v.voiceURI} onClick={() => { setVoice(v.voiceURI); new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=Hello&client=tw-ob`).play().catch(()=>{}); }} className="w-full text-left p-3 hover:bg-slate-50 flex justify-between items-center rounded-lg border border-transparent hover:border-slate-200">
                            <span className="font-medium text-slate-700">{v.name}</span><Volume2 className="w-4 h-4 text-indigo-400" />
                        </button>
                    ))}
                </div>
            )}
            {activeTab === 'dashboard' && isTeacherView && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100"><h3 className="text-3xl font-black text-indigo-900">{stats.users}</h3><p className="text-xs font-bold text-indigo-400 uppercase">Students</p></div>
                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100"><h3 className="text-3xl font-black text-emerald-900">W{stats.avgLevel}</h3><p className="text-xs font-bold text-emerald-400 uppercase">Avg. Week</p></div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-center">Stars</th><th className="p-3 text-center">Week</th></tr></thead>
                            <tbody>{stats.students.map((s, i) => (<tr key={i} className="border-b border-slate-100 hover:bg-slate-50"><td className="p-3 font-bold text-slate-800">{s.name}</td><td className="p-3 text-center text-amber-500">★ {s.stars}</td><td className="p-3 text-center font-bold text-indigo-600">W{s.week}</td></tr>))}</tbody>
                        </table>
                    </div>
                </div>
            )}
            {activeTab === 'create_teacher' && canManageTeachers && (
                <div className="max-w-sm mx-auto mt-8 space-y-4 p-6 border rounded-xl bg-slate-50">
                    <h3 className="text-center font-black text-slate-700 mb-4">Create Teacher Account</h3>
                    <input value={teacherName} onChange={e=>setTeacherName(e.target.value)} placeholder="Username" className="w-full p-3 border-2 border-slate-200 rounded-xl font-bold" />
                    <input value={teacherPass} onChange={e=>setTeacherPass(e.target.value)} placeholder="Password" type="password" className="w-full p-3 border-2 border-slate-200 rounded-xl font-bold" />
                    <button onClick={handleCreateTeacher} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-xl shadow-lg">Create Account</button>
                </div>
            )}
            {activeTab === 'studio' && isSuperAdmin && (<MediaStudio defaultWeekId={currentWeekId || 1} />)}
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
