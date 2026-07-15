import React, { useState, useEffect, useCallback } from 'react';
import { Users, Plus, Trash2, Key, RefreshCw, User, CheckCircle, AlertCircle, X } from 'lucide-react';
import { parentAPI } from '../../services/api';

const MAX_CHILDREN = 4;

export default function ChildrenManager({ currentUser }) {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Create form
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', display_name: '' });
  const [creating, setCreating] = useState(false);

  // Reset password inline
  const [resetTarget, setResetTarget] = useState(null); // childUsername
  const [newPwd, setNewPwd] = useState('');
  const [resetting, setResetting] = useState(false);

  const loadChildren = useCallback(async () => {
    setLoading(true);
    try {
      const res = await parentAPI.getChildren();
      setChildren(res.data);
    } catch (e) {
      setError('Không tải được danh sách tài khoản con.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadChildren(); }, [loadChildren]);

  const flash = (msg, isErr = false) => {
    if (isErr) setError(msg); else setSuccess(msg);
    setTimeout(() => { setError(''); setSuccess(''); }, 4000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newUser.username.trim() || !newUser.password.trim()) {
      flash('Vui lòng điền tên đăng nhập và mật khẩu.', true); return;
    }
    setCreating(true);
    try {
      await parentAPI.createChild(
        newUser.username.trim(),
        newUser.password.trim(),
        newUser.display_name.trim() || newUser.username.trim(),
      );
      flash(`Đã tạo tài khoản "${newUser.username.trim()}"!`);
      setNewUser({ username: '', password: '', display_name: '' });
      setShowCreate(false);
      loadChildren();
    } catch (e) {
      flash(e.response?.data?.message || 'Lỗi tạo tài khoản.', true);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (childUsername) => {
    if (!window.confirm(`Xóa tài khoản "${childUsername}"? Toàn bộ tiến độ sẽ mất!`)) return;
    try {
      await parentAPI.deleteChild(childUsername);
      flash(`Đã xóa "${childUsername}".`);
      loadChildren();
    } catch (e) {
      flash(e.response?.data?.message || 'Lỗi xóa tài khoản.', true);
    }
  };

  const handleResetPwd = async (e) => {
    e.preventDefault();
    if (!newPwd || newPwd.length < 6) { flash('Mật khẩu mới phải ít nhất 6 ký tự.', true); return; }
    setResetting(true);
    try {
      await parentAPI.resetChildPassword(resetTarget, newPwd);
      flash(`Đã đổi mật khẩu cho "${resetTarget}".`);
      setResetTarget(null); setNewPwd('');
    } catch (e) {
      flash(e.response?.data?.message || 'Lỗi đổi mật khẩu.', true);
    } finally {
      setResetting(false);
    }
  };

  const handleSync = async () => {
    try {
      const res = await parentAPI.syncChildren();
      flash(res.data.message || 'Đã đồng bộ gói đăng ký cho tất cả tài khoản con.');
      loadChildren();
    } catch (e) {
      flash('Lỗi đồng bộ.', true);
    }
  };

  const planExpiry = currentUser?.plan_expires_at
    ? new Date(currentUser.plan_expires_at).toLocaleDateString('vi-VN')
    : '—';

  return (
    <div className="max-w-xl mx-auto p-4 space-y-5">
      {/* Header card */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black">Quản lý tài khoản con</h1>
            <p className="text-violet-200 text-xs">Gói Gia đình · tối đa {MAX_CHILDREN} HS</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-violet-200">Đã tạo: <strong className="text-white">{children.length}/{MAX_CHILDREN}</strong></span>
          <span className="text-violet-200">Hết hạn: <strong className="text-white">{planExpiry}</strong></span>
          <button onClick={handleSync} title="Đồng bộ ngày hết hạn cho tài khoản con" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all">
            <RefreshCw size={13} /> Đồng bộ gói
          </button>
        </div>
      </div>

      {/* Flash messages */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle size={16} className="shrink-0" />{error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          <CheckCircle size={16} className="shrink-0" />{success}
        </div>
      )}

      {/* Children list */}
      {loading ? (
        <p className="text-center text-slate-400 text-sm py-8">Đang tải…</p>
      ) : (
        <div className="space-y-3">
          {children.map(child => (
            <div key={child.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <User size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-black text-slate-800">{child.username}</p>
                    <p className="text-xs text-slate-400">Tạo: {new Date(child.created_at).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setResetTarget(child.username); setNewPwd(''); }}
                    className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors"
                    title="Đổi mật khẩu"
                  ><Key size={15}/></button>
                  <button
                    onClick={() => handleDelete(child.username)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                    title="Xóa tài khoản"
                  ><Trash2 size={15}/></button>
                </div>
              </div>

              {/* Inline password reset */}
              {resetTarget === child.username && (
                <form onSubmit={handleResetPwd} className="mt-3 flex gap-2">
                  <input
                    type="password"
                    value={newPwd}
                    onChange={e => setNewPwd(e.target.value)}
                    placeholder="Mật khẩu mới (ít nhất 6 ký tự)"
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    autoFocus
                  />
                  <button type="submit" disabled={resetting} className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50">
                    {resetting ? '…' : 'Lưu'}
                  </button>
                  <button type="button" onClick={() => setResetTarget(null)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
                    <X size={14}/>
                  </button>
                </form>
              )}
            </div>
          ))}

          {children.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              <Users size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-bold">Chưa có tài khoản con nào.</p>
              <p className="text-xs mt-1">Nhấn nút bên dưới để tạo tài khoản cho con.</p>
            </div>
          )}
        </div>
      )}

      {/* Add button / Create form */}
      {children.length < MAX_CHILDREN && !showCreate && (
        <button
          onClick={() => setShowCreate(true)}
          className="w-full py-3 border-2 border-dashed border-violet-300 text-violet-600 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-violet-50 transition-colors"
        >
          <Plus size={18} /> Thêm tài khoản cho con ({MAX_CHILDREN - children.length} chỗ còn lại)
        </button>
      )}

      {showCreate && (
        <form onSubmit={handleCreate} className="bg-violet-50 border border-violet-200 rounded-2xl p-4 space-y-3">
          <h3 className="font-black text-violet-800 text-sm">Tạo tài khoản học sinh mới</h3>
          <div className="space-y-2">
            <input
              type="text"
              value={newUser.username}
              onChange={e => setNewUser(u => ({ ...u, username: e.target.value }))}
              placeholder="Tên đăng nhập (VD: bao_nhi_1)"
              className="w-full px-3 py-2 text-sm border border-violet-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
              autoFocus
            />
            <input
              type="password"
              value={newUser.password}
              onChange={e => setNewUser(u => ({ ...u, password: e.target.value }))}
              placeholder="Mật khẩu (ít nhất 6 ký tự)"
              className="w-full px-3 py-2 text-sm border border-violet-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={creating} className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-xl text-sm transition-colors disabled:opacity-50">
              {creating ? 'Đang tạo…' : 'Tạo tài khoản'}
            </button>
            <button type="button" onClick={() => { setShowCreate(false); setNewUser({ username: '', password: '', display_name: '' }); }} className="px-4 py-2.5 border border-violet-200 text-violet-600 font-bold rounded-xl text-sm hover:bg-violet-100 transition-colors">
              Hủy
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center">
            Mỗi con đăng nhập bằng tài khoản riêng — tiến độ độc lập với nhau.
          </p>
        </form>
      )}
    </div>
  );
}
