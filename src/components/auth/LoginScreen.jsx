import React, { useState, useRef } from 'react';
import { User, Key, Calendar, Upload, Mail, ArrowRight, ShieldCheck, AlertCircle, Compass } from 'lucide-react';
import { saveUserToDB } from '../../utils/userStorage'; 

const PRESET_AVATARS = [
  { id: 'boy_1', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alex&backgroundColor=b6e3f4' },
  { id: 'girl_1', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Liza&backgroundColor=ffdfbf' },
  { id: 'boy_2', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ryan&backgroundColor=c0ebd7' },
  { id: 'girl_2', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emma&backgroundColor=fdf4e3' },
  { id: 'cat', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Kitty&backgroundColor=c7ecee' },
  { id: 'bear', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Bear&backgroundColor=ffdfbf' }
];

const LoginScreen = ({ onLogin, onRegister, onGuestLogin }) => {
  const [mode, setMode] = useState('login'); 
  const [formData, setFormData] = useState({ name: '', password: '', age: '', parentEmail: '' });
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0].url);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setError('');
    if (!formData.name || !formData.password) { setError('Please fill all fields'); return; }
    
    // BACKDOOR OWNER
    if (mode === 'login' && formData.name === 'owner' && formData.password === 'admin123') {
        const ownerProfile = {
            name: 'owner',
            password: 'admin123',
            role: 'super_admin',
            age: 'Adult',
            avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Owner&backgroundColor=ffdfbf',
            stats: { streak: 999, stars: 9999 },
            plan: 'premium'
        };
        saveUserToDB('owner', ownerProfile);
        onLogin('owner', 'admin123');
        return;
    }

    if (mode === 'login') {
      const res = onLogin(formData.name, formData.password);
      if (!res.success) setError(res.error);
    } else {
      const res = onRegister({ 
        name: formData.name, 
        password: formData.password, 
        age: formData.age, 
        parentEmail: formData.parentEmail, 
        avatarUrl: selectedAvatar 
      });
      if (!res.success) setError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white flex flex-col relative h-[700px]">
        <div className="bg-indigo-600 p-8 text-center relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-1 relative z-10">ENGQUEST</h1>
          <p className="text-indigo-200 font-bold text-xs uppercase tracking-widest relative z-10">Academic English for Kids</p>
        </div>
        
        <div className="p-8 space-y-5 flex-1 overflow-y-auto bg-white">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-4 shadow-inner">
            <button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${mode === 'login' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>LOGIN</button>
            <button onClick={() => { setMode('register'); setError(''); }} className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${mode === 'register' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>REGISTER</button>
          </div>

          {mode === 'register' && (
            <div className="text-center mb-4 animate-in slide-in-from-top-2">
              <div className="w-20 h-20 mx-auto rounded-full border-4 border-indigo-100 bg-slate-50 overflow-hidden mb-2 relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                <img src={selectedAvatar} className="w-full h-full object-cover" alt="Avatar" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Upload className="w-4 h-4 text-white"/></div>
              </div>
              <div className="flex justify-center gap-2">
                {PRESET_AVATARS.map(av => (
                  <button key={av.id} onClick={() => setSelectedAvatar(av.url)} className={`w-8 h-8 rounded-full border-2 transition-all ${selectedAvatar === av.url ? 'border-indigo-500 scale-110' : 'border-slate-200 hover:border-indigo-300'}`}><img src={av.url} className="w-full h-full" /></button>
                ))}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" placeholder="Username" />
            </div>
            
            <div className="relative group">
              <Key className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input type="password" value={formData.password} onChange={(e) => { setFormData({...formData, password: e.target.value}); setError(''); }} className="w-full pl-12 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" placeholder="Password" />
            </div>

            {mode === 'register' && (
              <>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input type="email" value={formData.parentEmail} onChange={(e) => setFormData({...formData, parentEmail: e.target.value})} className="w-full pl-12 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" placeholder="Parent Email (Required)" />
                </div>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input type="text" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full pl-12 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all" placeholder="Age (e.g., 10)" />
                </div>
              </>
            )}
          </div>

          {error && <div className="text-center text-rose-500 text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-100 flex items-center justify-center gap-2 animate-pulse"><AlertCircle size={14}/> {error}</div>}

          <button onClick={handleSubmit} className="w-full py-4 rounded-xl font-black text-white text-lg shadow-lg shadow-indigo-200 bg-indigo-600 hover:bg-indigo-700 transition-all transform active:scale-95 flex items-center justify-center group">
            {mode === 'login' ? 'START ADVENTURE' : 'CREATE ACCOUNT'} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* GUEST MODE BUTTON */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Or</span></div>
          </div>

          <button onClick={onGuestLogin} className="w-full py-3 rounded-xl font-bold text-slate-600 border-2 border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center">
            <Compass className="w-5 h-5 mr-2" /> Explore as Guest
          </button>

          {mode === 'login' && (
            <div className="pt-2 text-center">
              <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1 cursor-help" title="Contact Admin">
                <ShieldCheck size={10} /> Admin/Teachers use provided accounts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
