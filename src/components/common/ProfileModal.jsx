import React, { useState, useRef, useEffect } from 'react';
import { X, Save, LogOut, User, Upload, Key, Eye, EyeOff } from 'lucide-react';
import { DEFAULT_AVATARS } from '../../utils/userStorage';
import { authAPI, fetchGlobalAvatars } from '../../services/api';

const ProfileModal = ({ isOpen, onClose, currentUser, onUpdateProfile, onLogout }) => {
  const [name, setName] = useState(currentUser?.username || currentUser?.name || '');
  const [displayName, setDisplayName] = useState(currentUser?.display_name || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar_url || currentUser?.avatarUrl || '');
  const [presetAvatars, setPresetAvatars] = useState(DEFAULT_AVATARS);
  const fileInputRef = useRef(null);

  // Refresh avatar gallery + user data every time modal opens
  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.username || currentUser?.name || '');
      setDisplayName(currentUser?.display_name || '');
      setAvatar(currentUser?.avatar_url || currentUser?.avatarUrl || '');
      // Load avatars from shared DB (not localStorage)
      fetchGlobalAvatars()
        .then(res => {
          const rows = res.data;
          // Merge DB avatars with defaults; DB rows have { id, url }
          const dbAvatars = rows.map(r => ({ id: String(r.id), url: r.url }));
          setPresetAvatars(dbAvatars.length > 0 ? dbAvatars : DEFAULT_AVATARS);
        })
        .catch(() => setPresetAvatars(DEFAULT_AVATARS));
    }
  }, [isOpen, currentUser]);
  
  // Change Password state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    const result = await onUpdateProfile({ avatarUrl: avatar, display_name: displayName.trim() || undefined });
    setSaving(false);
    if (result && result.success === false) {
      setSaveError(result.error || 'Lưu thất bại, vui lòng thử lại.');
    } else {
      onClose();
    }
  };
  
  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp');
      return;
    }
    
    setChangingPassword(true);
    try {
      const response = await authAPI.changePassword(currentPassword, newPassword);
      setPasswordSuccess('Đổi mật khẩu thành công!');
      setTimeout(() => {
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordSuccess('');
      }, 1500);
    } catch (error) {
      setPasswordError(error.response?.data?.message || 'Đổi mật khẩu thất bại');
    } finally {
      setChangingPassword(false);
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
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tên hiển thị — Nova gọi</label>
                <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full p-3 bg-white border-2 border-indigo-300 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 text-center text-lg" placeholder="Nhập tên hiển thị..." />
                <p className="text-[10px] text-slate-400 text-center mt-1">Tên gọi trong app và khi Nova nói chuyện</p>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Username (Login)</label>
                <div className="w-full p-3 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-slate-500 text-center text-base select-none cursor-not-allowed">{currentUser?.username || currentUser?.name}</div>
                <p className="text-[10px] text-slate-400 text-center mt-1">Không thể thay đổi username</p>
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
          {saveError && (
            <div className="w-full p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium text-center">{saveError}</div>
          )}
          <div className="flex gap-3 w-full mt-4 pt-4 border-t">
            <button onClick={onLogout} disabled={saving} className="flex-1 py-3 border-2 border-rose-100 text-rose-500 hover:bg-rose-50 font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"><LogOut size={18} /> Logout</button>
            <button onClick={handleSave} disabled={saving} className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-60">{saving ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang lưu...</> : <><Save size={18} /> Save Changes</>}</button>
          </div>
          
          {/* Change Password Button */}
          <button 
            onClick={() => setShowPasswordModal(true)} 
            className="w-full py-3 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <Key size={18} /> Change Password
          </button>
        </div>
      </div>
      
      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Key size={20}/> Đổi Mật Khẩu
              </h3>
              <button onClick={() => {
                setShowPasswordModal(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setPasswordError('');
                setPasswordSuccess('');
              }}>
                <X size={20} className="text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {passwordError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-sm font-medium">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm font-medium">
                  {passwordSuccess}
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mật khẩu hiện tại</label>
                <div className="relative">
                  <input 
                    type={showCurrentPw ? 'text' : 'password'}
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    className="w-full p-3 pr-10 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-indigo-500" 
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mật khẩu mới</label>
                <div className="relative">
                  <input 
                    type={showNewPw ? 'text' : 'password'}
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full p-3 pr-10 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-indigo-500" 
                    placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Xác nhận mật khẩu mới</label>
                <input 
                  type="password"
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-indigo-500" 
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                  }}
                  className="flex-1 py-3 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleChangePassword}
                  disabled={changingPassword}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
                >
                  {changingPassword ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileModal;
