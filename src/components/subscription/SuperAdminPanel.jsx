import React, { useState, useEffect, useRef } from 'react';
import { X, Shield, Users, DollarSign, Settings, Save, CheckCircle, Trash2, UserPlus, Image as ImageIcon, Upload } from 'lucide-react';
import { getSystemStatus, setSystemStatus } from '../../services/SubscriptionManager';
import { loadAllUsers, saveUserToDB, getPaymentRequests, approvePayment, getGlobalAvatars, addGlobalAvatar, deleteGlobalAvatar } from '../../utils/userStorage';

const SuperAdminPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('billing'); // Ưu tiên xem Billing
  const [requests, setRequests] = useState([]);
  const [allUsers, setAllUsers] = useState({});
  const [avatars, setAvatars] = useState([]);
  
  // System Config
  const [isPaidMode, setIsPaidMode] = useState(true);
  const [showUpgradeBtn, setShowUpgradeBtn] = useState(false);
  
  // Create User
  const [newUserName, setNewUserName] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserRole, setNewUserRole] = useState('student'); // Default role
  const [newUserPlan, setNewUserPlan] = useState('free');    // Default plan

  // Avatar Upload
  const avatarInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) refreshData();
  }, [isOpen]);

  const refreshData = () => {
      setRequests(getPaymentRequests());
      setAllUsers(loadAllUsers());
      setAvatars(getGlobalAvatars());
      
      try {
          const sysConfig = localStorage.getItem('engquest_sys_config');
          if (sysConfig) {
              const parsed = JSON.parse(sysConfig);
              setIsPaidMode(parsed.isPaidMode);
              setShowUpgradeBtn(parsed.showUpgradeBtn);
          }
      } catch (e) {}
  };

  const handleApprove = (reqId) => {
    if(approvePayment(reqId)) { refreshData(); alert("Payment Approved!"); }
  };

  const handleCreateUser = () => {
      if(!newUserName || !newUserPass) return alert("Missing Info!");
      if(loadAllUsers()[newUserName]) return alert("User exists!");
      
      const newUser = {
          name: newUserName,
          password: newUserPass,
          role: newUserRole, 
          age: 'Adult',
          avatarUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=${newUserName}&backgroundColor=e0e7ff`,
          stats: { streak: 0, stars: 0 },
          plan: newUserPlan 
      };
      saveUserToDB(newUserName, newUser);
      refreshData();
      setNewUserName(''); setNewUserPass('');
      alert(`Created user: ${newUserName} (${newUserRole} - ${newUserPlan})`);
  };

  const handleDeleteUser = (username) => {
      if(username === 'owner') return alert("Cannot delete Owner!");
      if(confirm(`Delete ${username}?`)) {
          const u = loadAllUsers();
          delete u[username];
          localStorage.setItem('engquest_users_db_v2', JSON.stringify(u));
          refreshData();
      }
  };

  const handleAddAvatar = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              addGlobalAvatar(reader.result);
              refreshData();
          };
          reader.readAsDataURL(file);
      }
  };

  const handleDeleteAvatar = (id) => {
      if(confirm("Remove this avatar from global list?")) {
          deleteGlobalAvatar(id);
          refreshData();
      }
  };

  const saveConfig = () => {
    const config = { isPaidMode, showUpgradeBtn };
    localStorage.setItem('engquest_sys_config', JSON.stringify(config));
    setSystemStatus(isPaidMode);
    window.dispatchEvent(new Event('subscription-update'));
    window.dispatchEvent(new Event('storage'));
    alert("Saved!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-gray-900/95 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        <div className="bg-gray-900 text-white p-5 flex justify-between items-center shrink-0 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg"><Shield className="text-yellow-400 fill-yellow-400" size={24} /></div>
            <div><h2 className="font-black text-xl leading-none text-white">OWNER CONTROL</h2><p className="text-xs text-gray-400 font-mono mt-1">Super Admin Access</p></div>
          </div>
          <button onClick={onClose} className="hover:bg-gray-800 p-2 rounded-full transition-colors"><X size={24} /></button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-2 shrink-0">
            <button onClick={() => setActiveTab('billing')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='billing'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><DollarSign size={18}/> Billing Requests {requests.filter(r=>r.status==='pending').length > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{requests.filter(r=>r.status==='pending').length}</span>}</button>
            <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='users'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><Users size={18}/> Manage Users</button>
            <button onClick={() => setActiveTab('avatars')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='avatars'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><ImageIcon size={18}/> Global Avatars</button>
            <button onClick={() => setActiveTab('system')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='system'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><Settings size={18}/> System Config</button>
          </div>

          <div className="flex-1 p-8 overflow-y-auto bg-white">
            
            {/* BILLING TAB */}
            {activeTab === 'billing' && (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><DollarSign/> Payment Requests</h3>
                    {requests.length === 0 ? <p className="text-slate-400 italic bg-slate-50 p-8 rounded-xl text-center">No requests.</p> : (
                        <div className="space-y-3">
                            {requests.map((req) => (
                                <div key={req.id} className="p-4 border rounded-xl flex items-center justify-between bg-slate-50 shadow-sm">
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg">{req.username}</p>
                                        <p className="text-xs text-slate-500">{new Date(req.date).toLocaleString()}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded uppercase">{req.plan}</span>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">{req.amount.toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                    <div>
                                        {req.status === 'pending' ? (
                                            <button onClick={() => handleApprove(req.id)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-2">
                                                <CheckCircle size={16}/> Approve
                                            </button>
                                        ) : <span className="px-4 py-2 bg-slate-200 text-slate-500 font-bold rounded-lg flex items-center gap-2"><CheckCircle size={16}/> Done</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
                <div className="space-y-8">
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
                        <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><UserPlus size={20}/> Create / Assign User</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                            <input value={newUserName} onChange={e=>setNewUserName(e.target.value)} placeholder="Username" className="p-3 border rounded-lg bg-white font-bold col-span-1"/>
                            <input value={newUserPass} onChange={e=>setNewUserPass(e.target.value)} placeholder="Password" type="password" className="p-3 border rounded-lg bg-white font-bold col-span-1"/>
                            <select value={newUserRole} onChange={e=>setNewUserRole(e.target.value)} className="p-3 border rounded-lg bg-white font-bold col-span-1">
                                <option value="student">Student</option>
                                <option value="admin">Admin (Teacher)</option>
                                <option value="teacher">Teacher (View Only)</option>
                            </select>
                            <select value={newUserPlan} onChange={e=>setNewUserPlan(e.target.value)} className="p-3 border rounded-lg bg-white font-bold col-span-1">
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                            </select>
                            <button onClick={handleCreateUser} className="bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md col-span-1">Create</button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">All Users</h3>
                        <div className="border rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-100 text-slate-500 uppercase"><tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Plan</th><th className="p-3 text-right">Action</th></tr></thead>
                                <tbody>
                                    {Object.values(allUsers).map((u, i) => (
                                        <tr key={i} className="border-t hover:bg-slate-50">
                                            <td className="p-3 font-bold">{u.name}</td>
                                            <td className="p-3"><span className="px-2 py-1 bg-slate-200 rounded text-xs font-bold uppercase">{u.role}</span></td>
                                            <td className="p-3"><span className={`px-2 py-1 rounded text-xs font-bold ${u.plan==='premium'?'bg-green-100 text-green-700':'bg-slate-100 text-slate-500'}`}>{u.plan || 'free'}</span></td>
                                            <td className="p-3 text-right">{u.role !== 'super_admin' && <button onClick={()=>handleDeleteUser(u.name)} className="text-rose-500 p-2"><Trash2 size={16}/></button>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* AVATARS TAB (NEW) */}
            {activeTab === 'avatars' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><ImageIcon/> Global Gallery</h3>
                        <button onClick={() => avatarInputRef.current.click()} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md flex items-center gap-2"><Upload size={16}/> Upload New</button>
                        <input type="file" ref={avatarInputRef} onChange={handleAddAvatar} accept="image/*" className="hidden" />
                    </div>
                    <div className="grid grid-cols-6 gap-4">
                        {avatars.map((av, i) => (
                            <div key={i} className="relative group">
                                <div className="aspect-square rounded-xl border-2 border-slate-200 overflow-hidden bg-white">
                                    <img src={av.url} className="w-full h-full object-cover"/>
                                </div>
                                <button onClick={()=>handleDeleteAvatar(av.id)} className="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SYSTEM CONFIG TAB */}
            {activeTab === 'system' && (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800">Global Settings</h3>
                    <div className="p-6 border rounded-xl flex items-center justify-between bg-white shadow-sm">
                        <div><p className="font-bold text-slate-700 text-lg">Paid Mode</p><p className="text-sm text-slate-500">Lock Guest/Free users.</p></div>
                        <input type="checkbox" checked={isPaidMode} onChange={e => setIsPaidMode(e.target.checked)} className="w-6 h-6 accent-indigo-600" />
                    </div>
                    <div className="p-6 border rounded-xl flex items-center justify-between bg-white shadow-sm border-amber-100">
                        <div><p className="font-bold text-slate-700 text-lg">Show Upgrade Button</p><p className="text-sm text-slate-500">Display floating upgrade button.</p></div>
                        <input type="checkbox" checked={showUpgradeBtn} onChange={e => setShowUpgradeBtn(e.target.checked)} className="w-6 h-6 accent-amber-500" />
                    </div>
                    <button onClick={saveConfig} className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg mt-4"><Save size={18} className="inline mr-2"/> Save Changes</button>
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
export default SuperAdminPanel;
