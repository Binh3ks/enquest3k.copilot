import React, { useState, useRef, useEffect } from 'react';
import { X, Save, LogOut, User, Upload } from 'lucide-react';
import { getGlobalAvatars } from '../../utils/userStorage';

const ProfileModal = ({ isOpen, onClose, currentUser, onUpdateProfile, onLogout }) => {
  const [name, setName] = useState(currentUser?.username || currentUser?.name || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar_url || currentUser?.avatarUrl || '');
  const [presetAvatars, setPresetAvatars] = useState(getGlobalAvatars());
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (name.trim()) {
      onUpdateProfile({ name, avatarUrl: avatar });
      onClose();
    }
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in-95">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><User size={20}/> My Profile</h3>
          <button onClick={onClose}><X size={20} className="text-slate-400 hover:text-slate-600" /></button>
        </div>
        <div className="p-8 flex flex-col items-center gap-6 overflow-y-auto">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
            <div className="w-32 h-32 rounded-full border-4 border-indigo-100 overflow-hidden shadow-lg bg-white">
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold">
              <Upload className="w-8 h-8 mb-1" />
              <span className="text-xs">Upload Photo</span>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
          <div className="w-full">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2 text-center">Choose from Gallery</p>
            <div className="flex flex-wrap gap-3 justify-center max-h-40 overflow-y-auto p-2 border rounded-xl bg-slate-50">
                {presetAvatars.map(av => (
                    <button key={av.id} onClick={() => setAvatar(av.url)} className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${avatar === av.url ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200 bg-white'}`}>
                        <img src={av.url} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
          </div>
          <div className="w-full space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Display Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 text-center text-lg" />
            </div>
            <div className="flex gap-4">
                <div className="flex-1 bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-center">
                    <span className="block text-[10px] font-bold text-indigo-400 uppercase">Role</span>
                    <span className="font-black text-indigo-700 uppercase text-sm">{currentUser.role === 'admin' ? 'Teacher' : currentUser.role === 'super_admin' ? 'Owner' : currentUser.role}</span>
                </div>
                <div className="flex-1 bg-amber-50 p-3 rounded-xl border border-amber-100 text-center">
                    <span className="block text-[10px] font-bold text-amber-400 uppercase">Plan</span>
                    <span className="font-black text-amber-700 uppercase text-sm">{currentUser.plan || 'Free'}</span>
                </div>
            </div>
          </div>
          <div className="flex gap-3 w-full mt-4 pt-4 border-t">
            <button onClick={onLogout} className="flex-1 py-3 border-2 border-rose-100 text-rose-500 hover:bg-rose-50 font-bold rounded-xl flex items-center justify-center gap-2"><LogOut size={18} /> Logout</button>
            <button onClick={handleSave} className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"><Save size={18} /> Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
