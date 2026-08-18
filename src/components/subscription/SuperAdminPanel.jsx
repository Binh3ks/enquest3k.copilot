import React, { useState, useEffect, useRef } from 'react';
import { X, Shield, Users, DollarSign, Settings, Save, CheckCircle, Trash2, UserPlus, Image as ImageIcon, Upload, UserCheck, Link, Calendar, KeyRound } from 'lucide-react';
import { getAllUsers, adminCreateUser, adminDeleteUser, fetchGlobalAvatars, addGlobalAvatarAPI, deleteGlobalAvatarAPI, teacherAPI, adminSubscriptionAPI, adminHierarchy, paymentAPI, pushAPI } from '../../services/api';
import { getSystemStatus, setSystemStatus } from '../../services/SubscriptionManager';
import { useUserStore } from '../../stores/useUserStore';

const PLAN_OPTS = [
  { value: 'free_trial',        label: 'Free Trial' },
  { value: 'student',           label: 'Student (99k/tháng)' },
  { value: 'sibling',           label: 'Anh em 2HS (168k/tháng)' },
  { value: 'family',            label: 'Gia đình 4HS (316k/tháng)' },
  { value: 'teacher_starter',   label: 'GV Starter 1+5 (544k)' },
  { value: 'teacher_pro',       label: 'GV Pro 1+20 (1.479M)' },
  { value: 'team',              label: 'Nhóm 3+60 (3.237M)' },
  { value: 'center',            label: 'Trung tâm 10+200 (8.79M)' },
  { value: 'premium_lifetime',  label: '⭐ Premium Trọn Đời (Owner/VIP)' },
];

const PLAN_TO_ROLE = {
  free_trial: 'student',
  student: 'student',
  sibling: 'parent',
  family: 'parent',
  teacher_starter: 'teacher',
  teacher_pro: 'teacher',
  team: 'team_leader',
  center: 'center_director',
  premium_lifetime: 'super_admin',
};

const SEAT_MAP = {
  student: 0, sibling: 2, family: 4, free_trial: 0, premium_lifetime: 0,
  teacher_starter: 5, teacher_pro: 20, team: 60, center: 200,
};

const PLAN_BADGE = {
  free_trial: 'bg-slate-100 text-slate-500',
  student: 'bg-blue-100 text-blue-700',
  teacher_starter: 'bg-green-100 text-green-700',
  teacher_pro: 'bg-emerald-100 text-emerald-700',
  team: 'bg-teal-100 text-teal-700',
  center: 'bg-purple-100 text-purple-700',
  premium_lifetime: 'bg-amber-100 text-amber-700',
  premium: 'bg-amber-100 text-amber-700',
};

const daysLeft = (d) => {
  if (!d) return null;
  return Math.ceil((new Date(d) - Date.now()) / 86400000);
};

const SuperAdminPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('billing');
  const [requests, setRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [hierarchy, setHierarchy] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  const sortedAndFilteredUsers = [...allUsers]
    .sort((a, b) => {
      // Super admin / owner ALWAYS comes first (Top 1)
      const aIsOwner = a.username === 'owner' || a.role === 'super_admin';
      const bIsOwner = b.username === 'owner' || b.role === 'super_admin';
      if (aIsOwner && !bIsOwner) return -1;
      if (!aIsOwner && bIsOwner) return 1;
      const aIsAdmin = a.role === 'admin';
      const bIsAdmin = b.role === 'admin';
      if (aIsAdmin && !bIsAdmin) return -1;
      if (!aIsAdmin && bIsAdmin) return 1;
      return (new Date(b.created_at || 0)) - (new Date(a.created_at || 0));
    })
    .filter(u => {
      if (userRoleFilter !== 'all') {
        if (userRoleFilter === 'super_admin') {
          if (u.role !== 'super_admin' && u.username !== 'owner') return false;
        } else if (u.role !== userRoleFilter) {
          return false;
        }
      }
      if (!userSearchTerm.trim()) return true;
      const term = userSearchTerm.toLowerCase();
      return (
        (u.username && u.username.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term)) ||
        (u.real_email && u.real_email.toLowerCase().includes(term)) ||
        (u.role && u.role.toLowerCase().includes(term)) ||
        (u.plan && u.plan.toLowerCase().includes(term))
      );
    });

  // Push notification subscription state
  const [pushStatus, setPushStatus] = useState('unknown'); // 'unknown'|'granted'|'denied'|'subscribed'
  const [pushWorking, setPushWorking] = useState(false);

  // System Config
  const [isPaidMode, setIsPaidMode] = useState(true);
  const [showUpgradeBtn, setShowUpgradeBtn] = useState(false);

  // Helper: convert VAPID base64 key to Uint8Array
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = window.atob(base64);
    return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
  };

  const handleEnablePush = async () => {
    try {
      setPushWorking(true);

      // 0. Check browser support
      if (!('serviceWorker' in navigator)) throw new Error('Trình duyệt không hỗ trợ Service Worker');
      if (!('PushManager' in window)) throw new Error('Trình duyệt không hỗ trợ Web Push');

      // 1. Ensure service worker is registered (re-register if not already active)
      let reg;
      try {
        reg = await Promise.race([
          navigator.serviceWorker.ready,
          new Promise((_, rej) => setTimeout(() => rej(new Error('SW_TIMEOUT')), 8000)),
        ]);
      } catch (e) {
        if (e.message === 'SW_TIMEOUT') {
          // Try to force-register the service worker
          const freshReg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
          reg = freshReg;
          // Wait a bit for activation
          await new Promise(r => setTimeout(r, 1500));
          if (!freshReg.active && !freshReg.installing && !freshReg.waiting) {
            throw new Error('Service Worker không kích hoạt được — thử tải lại trang (Ctrl+Shift+R)');
          }
        } else throw e;
      }

      // 2. Request notification permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') { setPushStatus('denied'); return; }

      // 3. Get VAPID public key from server
      const { data } = await pushAPI.getVapidKey();
      const applicationServerKey = urlBase64ToUint8Array(data.publicKey);

      // 4. Subscribe via push manager
      const existingSub = await reg.pushManager.getSubscription();
      if (existingSub) await existingSub.unsubscribe();
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });

      // 5. POST subscription to backend
      await pushAPI.subscribe(sub.toJSON());
      setPushStatus('subscribed');
      alert('✅ Bật thông báo thành công! Bạn sẽ nhận được tin khi có yêu cầu thanh toán.');
    } catch (err) {
      console.error('Enable push error:', err);
      const msg = err.response?.data?.message || err.message || 'Lỗi không xác định';
      alert('❌ Không thể bật thông báo:\n' + msg + '\n\nHãy thử:\n1. Mở lại trang\n2. Cho phép thông báo trong cài đặt trình duyệt');
    } finally {
      setPushWorking(false);
    }
  };

  const handleDisablePush = async () => {
    try {
      setPushWorking(true);
      await pushAPI.unsubscribe();
      setPushStatus('granted');
    } catch (err) {
      console.error('Disable push error:', err);
    } finally {
      setPushWorking(false);
    }
  };

  // Check current push state when panel opens
  useEffect(() => {
    if (!isOpen) return;
    if (!('Notification' in window)) { setPushStatus('unsupported'); return; }
    const perm = Notification.permission;
    if (perm === 'denied') { setPushStatus('denied'); return; }
    // Check if already subscribed
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg =>
        reg.pushManager.getSubscription().then(sub => {
          setPushStatus(sub ? 'subscribed' : (perm === 'granted' ? 'granted' : 'unknown'));
        })
      ).catch(() => setPushStatus('unknown'));
    }
  }, [isOpen]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserRole, setNewUserRole] = useState('student');
  const [newUserPlan, setNewUserPlan] = useState('free_trial');
  const [newUserSeats, setNewUserSeats] = useState(2); // for parent role

  const ROLE_DEFAULT_PLAN = {
    student: 'free_trial', teacher: 'teacher_starter',
    team_leader: 'team', center_director: 'center',
    parent: 'family',
  };
  const handleRoleChange = (role) => {
    setNewUserRole(role);
    setNewUserPlan(ROLE_DEFAULT_PLAN[role] || 'free_trial');
    if (role === 'parent') setNewUserSeats(4);
  };

  // Current logged-in admin (to gate owner-only features)
  const currentUser = useUserStore(s => s.currentUser);
  const isSuperAdmin = currentUser?.role === 'super_admin';

  // Per-row state in Users table
  const [rowPlan, setRowPlan] = useState({});       // { [username]: selected plan type }
  const [rowDuration, setRowDuration] = useState({}); // { [username]: duration value }
  const [rowPass, setRowPass] = useState({});         // { [username]: new password string }
  const [rowRole, setRowRole] = useState({});         // { [username]: role being edited }
  const [rowRealEmail, setRowRealEmail] = useState({}); // { [username]: real email being edited }
  const [rowWorking, setRowWorking] = useState({});   // { [username]: 'activate'|'pass'|null }

  // Avatar Upload
  const avatarInputRef = useRef(null);

  useEffect(() => { if (isOpen) refreshData(); }, [isOpen]);

  // Sync rowDuration from allUsers data: preserve existing selections,
  // init from plan_months (source of truth), fall back to plan_expires_at calc
  useEffect(() => {
    if (!allUsers || !allUsers.length) return;
    setRowDuration(prev => {
      const next = { ...prev };
      for (const u of allUsers) {
        if (prev[u.username] !== undefined) continue; // preserve user edits
        // PRIMARY: use plan_months from DB (set by handleActivate)
        if (u.plan_months && u.plan_months >= 1) {
          next[u.username] = String(u.plan_months);
        }
        // FALLBACK: calculate from plan_expires_at only if plan_months absent
        else if (u.plan_expires_at) {
          const remaining = Math.round((new Date(u.plan_expires_at) - Date.now()) / (30 * 24 * 60 * 60 * 1000));
          if (remaining >= 1 && remaining <= 36) next[u.username] = String(remaining);
          else if (remaining > 36) next[u.username] = '12';
        }
      }
      return next;
    });
  }, [allUsers]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [prRes, avRes, usersRes] = await Promise.allSettled([
        paymentAPI.getRequests(),
        fetchGlobalAvatars(),
        getAllUsers(),
      ]);

      if (prRes.status === 'fulfilled' && prRes.value?.data) {
        setRequests(prRes.value.data);
      }
      if (avRes.status === 'fulfilled' && avRes.value?.data) {
        setAvatars(avRes.value.data.map(r => ({ id: String(r.id), url: r.url })));
      }
      if (usersRes.status === 'fulfilled' && usersRes.value?.data) {
        setAllUsers(usersRes.value.data);
      } else {
        const fallback = await getAllUsers();
        if (fallback?.data) setAllUsers(fallback.data);
      }

      try {
        const h = await adminHierarchy();
        if (h?.data) setHierarchy(h.data);
      } catch { /* non-fatal */ }

      const sysConfig = localStorage.getItem('engquest_sys_config');
      if (sysConfig) {
        const p = JSON.parse(sysConfig);
        setIsPaidMode(p.isPaidMode);
        setShowUpgradeBtn(p.showUpgradeBtn);
      }
    } catch (e) {
      console.error('Admin refresh failed:', e);
    } finally {
      setLoading(false);
    }
  };

  // When owner approves a billing request: call backend (auto-activates + marks approved in DB)
  const handleApprove = async (reqId) => {
    setLoading(true);
    try {
      await paymentAPI.approve(reqId);
      refreshData();
      alert('✓ Gói đã được kích hoạt tự động!');
    } catch (e) {
      alert(e.response?.data?.message || 'Kích hoạt thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!newUserName || !newUserPass) return alert('Điền username và password!');
    setLoading(true);
    try {
      const payload = { username: newUserName, password: newUserPass, role: newUserRole, plan: newUserPlan };
      if (newUserRole === 'parent') payload.seats_total = newUserSeats;
      await adminCreateUser(payload);
      setNewUserName(''); setNewUserPass('');
      refreshData();
    } catch (e) { alert(e.response?.data?.message || 'Tạo user thất bại.'); }
    finally { setLoading(false); }
  };

  // Duration dropdown options (free_60 is owner-only)
  const DURATION_OPTS = [
    { value: 'free_14', label: 'Free 14 ngày' },
    ...(isSuperAdmin ? [{ value: 'free_60', label: 'Free 60 ngày ⭐' }] : []),
    { value: '1',  label: '1 tháng' },
    { value: '3',  label: '3 tháng' },
    { value: '6',  label: '6 tháng' },
    { value: '12', label: '1 năm (12T)' },
    { value: '24', label: '2 năm (24T)' },
    { value: '36', label: '3 năm (36T)' },
    ...(isSuperAdmin ? [{ value: 'lifetime', label: '♾ Premium Trọn Đời ⭐' }] : []),
  ];

  // Unified activate handler: reads rowPlan + rowDuration, sets from TODAY (manual override)
  // NOTE: role is NEVER changed here — role is set when creating user or via separate action.
  const handleActivate = async (u) => {
    const plan = rowPlan[u.username] ?? u.plan ?? 'free_trial';
    const duration = rowDuration[u.username] ?? '1';
    setRowWorking(w => ({ ...w, [u.username]: 'activate' }));
    try {
      // Special case: Premium Lifetime (plan selector) or lifetime duration option
      if (plan === 'premium_lifetime' || duration === 'lifetime') {
        const finalPlan = duration === 'lifetime' ? plan : 'premium_lifetime';
        await adminSubscriptionAPI.setExpiry(u.username, finalPlan === 'free_trial' ? 'premium_lifetime' : finalPlan, 36500);
        setAllUsers(prev => prev.map(x => x.username !== u.username ? x : {
          ...x, plan: finalPlan === 'free_trial' ? 'premium_lifetime' : finalPlan, plan_expires_at: null, plan_months: null,
        }));
        return;
      }

      if (duration === 'free_14' || duration === 'free_60') {
        const days = duration === 'free_14' ? 14 : 60;
        if (plan === 'free_trial' || !plan) {
          // Pure free trial reset
          await adminSubscriptionAPI.setTrial(u.username, days);
          const trialExpiry = new Date(Date.now() + days * 86400000).toISOString();
          setAllUsers(prev => prev.map(x => x.username !== u.username ? x : {
            ...x, plan: 'free_trial', trial_expires_at: trialExpiry, plan_expires_at: null, plan_months: null,
          }));
        } else {
          // Activate a REAL plan for free for N days (owner gift/demo)
          await adminSubscriptionAPI.setExpiry(u.username, plan, days);
          const newExpiry = new Date(Date.now() + days * 86400000).toISOString();
          setAllUsers(prev => prev.map(x => x.username !== u.username ? x : {
            ...x, plan, plan_expires_at: newExpiry, plan_months: null,
          }));
        }
      } else {
        const months = parseInt(duration);
        const finalPlan = plan === 'free_trial' ? 'student' : plan;
        // days: 1N=365, 2N=730, 3N=1095, otherwise months×30
        const days = months === 12 ? 365 : months === 24 ? 730 : months === 36 ? 1095 : months * 30;
        await adminSubscriptionAPI.setExpiry(u.username, finalPlan, days);
        setAllUsers(prev => prev.map(x => x.username !== u.username ? x : {
          ...x, plan: finalPlan,
          plan_expires_at: new Date(Date.now() + days * 86400000).toISOString(),
          plan_months: months,
        }));
      }
    } catch (e) { alert(e.response?.data?.message || 'Kích hoạt thất bại'); }
    finally { setRowWorking(w => ({ ...w, [u.username]: null })); }
  };

  // Change role handler (independent of plan/expiry)
  const handleChangeRole = async (u, newRole) => {
    if (!newRole || newRole === u.role) return;
    setRowWorking(w => ({ ...w, [u.username]: 'role' }));
    try {
      await adminSubscriptionAPI.updateUser(u.username, { role: newRole });
      setAllUsers(prev => prev.map(x => x.username !== u.username ? x : { ...x, role: newRole }));
      setRowRole(r => ({ ...r, [u.username]: newRole }));
    } catch (e) { alert(e.response?.data?.message || 'Đổi role thất bại'); }
    finally { setRowWorking(w => ({ ...w, [u.username]: null })); }
  };

  // Update real email handler
  const handleUpdateRealEmail = async (u) => {
    const email = (rowRealEmail[u.username] || '').trim();
    if (!email) return;
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert('Email không hợp lệ');
    }
    setRowWorking(w => ({ ...w, [u.username]: 'email' }));
    try {
      await adminSubscriptionAPI.updateUser(u.username, { real_email: email });
      setAllUsers(prev => prev.map(x => x.username !== u.username ? x : { ...x, real_email: email }));
      setRowRealEmail(r => ({ ...r, [u.username]: email }));
      alert(`✓ Đã cập nhật email cho ${u.username}`);
    } catch (e) {
      alert(e.response?.data?.message || 'Cập nhật email thất bại');
    } finally {
      setRowWorking(w => ({ ...w, [u.username]: null }));
    }
  };

  // Reset password handler
  const handleResetPass = async (u) => {
    const newPassword = (rowPass[u.username] || '').trim();
    if (newPassword.length < 6) return alert('Mật khẩu tối thiểu 6 ký tự');
    setRowWorking(w => ({ ...w, [u.username]: 'pass' }));
    try {
      await adminSubscriptionAPI.resetPassword(u.username, newPassword);
      setRowPass(p => ({ ...p, [u.username]: '' }));
      alert(`✓ Đã reset mật khẩu cho ${u.username}`);
    } catch (e) { alert(e.response?.data?.message || 'Reset mật khẩu thất bại'); }
    finally { setRowWorking(w => ({ ...w, [u.username]: null })); }
  };

  // Change only the plan type (no expiry change — use 1T/1N buttons to set duration)
  const handleDeleteUser = async (username) => {
    if (username === 'owner') return alert('Không thể xóa owner!');
    if (!confirm(`Xóa user "${username}"?`)) return;
    setLoading(true);
    try { await adminDeleteUser(username); refreshData(); }
    catch (e) { alert(e.response?.data?.message || 'Xóa thất bại.'); }
    finally { setLoading(false); }
  };

  // Compress image before uploading to DB (keep small)
  const compressImage = (dataUrl, maxWidth = 200, quality = 0.7) => new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
          const canvas = document.createElement('canvas');
          const scale = Math.min(1, maxWidth / Math.max(img.width, img.height));
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
  });

  const handleAddAvatar = async (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;
      e.target.value = '';

      setLoading(true);
      const readFile = (file) => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
      });

      try {
          const rawResults = await Promise.all(files.map(readFile));
          const compressed = await Promise.all(rawResults.map(url => compressImage(url)));
          // Upload each to DB via API
          await Promise.all(compressed.map(dataUrl => addGlobalAvatarAPI(dataUrl)));
          await refreshData(); // Reload from DB
          if (files.length > 1) alert(`Uploaded ${files.length} avatars!`);
      } catch (err) {
          console.error('Avatar upload error:', err);
          alert('Upload failed! ' + (err.response?.data?.message || err.message));
      } finally {
          setLoading(false);
      }
  };

  const handleDeleteAvatar = async (id) => {
      if(confirm("Remove this avatar from global list?")) {
          try {
              await deleteGlobalAvatarAPI(id);
              await refreshData();
          } catch (err) {
              alert('Delete failed: ' + (err.response?.data?.message || err.message));
          }
      }
  };

  const handleRunMigration = async () => {
    if (!confirm('⚠️ Run real_email migration on production database?\n\nThis will:\n- Add real_email column to users table\n- Create index for faster lookups\n\nSafe to run multiple times (uses IF NOT EXISTS).')) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('engquest_token');
      console.log('[Migration] Token check:', token ? 'exists' : 'missing');
      
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/admin/run-migration`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('[Migration] Response status:', res.status);
      const data = await res.json();
      console.log('[Migration] Response data:', data);
      
      if (res.ok && data.success) {
        alert('✅ Migration completed successfully!\n\nColumn: ' + JSON.stringify(data.column));
        await refreshData(); // Refresh to load new column data
      } else {
        alert('❌ Migration failed:\n' + (data.message || `HTTP ${res.status}`));
      }
    } catch (err) {
      console.error('Migration error:', err);
      alert('❌ Error running migration:\n' + (err.message || 'Network error'));
    } finally {
      setLoading(false);
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
        <div className="w-56 bg-gray-50 border-r border-gray-200 p-4 space-y-1.5 shrink-0">
            <button onClick={() => setActiveTab('billing')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='billing'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}>
              <DollarSign size={18}/> Billing Requests
              {requests.filter(r=>r.status==='pending').length > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{requests.filter(r=>r.status==='pending').length}</span>}
            </button>
            <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='users'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><Users size={18}/> Manage Users</button>
            <button onClick={() => setActiveTab('hierarchy')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='hierarchy'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><Link size={18}/> B2B Hierarchy</button>
            <button onClick={() => setActiveTab('assignments')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='assignments'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><UserCheck size={18}/> Teacher Assignments</button>
            <button onClick={() => setActiveTab('avatars')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='avatars'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><ImageIcon size={18}/> Global Avatars</button>
            <button onClick={() => setActiveTab('system')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 ${activeTab==='system'?'bg-indigo-600 text-white':'hover:bg-gray-100'}`}><Settings size={18}/> System Config</button>
          </div>

          <div className="flex-1 p-8 overflow-y-auto bg-white relative">
            {loading && <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center font-bold text-indigo-600">Loading...</div>}
            
            {/* BILLING TAB */}
            {activeTab === 'billing' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><DollarSign/> Payment Requests</h3>
                      {/* Push notification toggle */}
                      {'Notification' in window && 'serviceWorker' in navigator && (
                        <div className="flex items-center gap-2">
                          {pushStatus === 'subscribed' ? (
                            <button onClick={handleDisablePush} disabled={pushWorking} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors">
                              🔔 Tắt thông báo
                            </button>
                          ) : (
                            <button onClick={handleEnablePush} disabled={pushWorking || pushStatus === 'denied'} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50">
                              🔔 {pushStatus === 'denied' ? 'Đã chặn (vào Settings)' : pushWorking ? 'Đang bật...' : 'Bật thông báo điện thoại'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {requests.length === 0 ? <p className="text-slate-400 italic bg-slate-50 p-8 rounded-xl text-center">Chưa có yêu cầu thanh toán nào.</p> : (
                        <div className="space-y-3">
                            {requests.map((req) => (
                                <div key={req.id} className="p-4 border rounded-xl flex items-center justify-between bg-slate-50 shadow-sm">
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg">{req.username}</p>
                                        <p className="text-xs text-slate-500">{req.created_at ? new Date(req.created_at).toLocaleString('vi-VN') : '—'}</p>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded uppercase">{req.plan}</span>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">{Number(req.amount).toLocaleString('vi-VN')}đ</span>
                                            {req.notes && <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-mono rounded">{req.notes}</span>}
                                        </div>
                                    </div>
                                    <div>
                                        {req.status === 'pending' ? (
                                            <button onClick={() => handleApprove(req.id)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-2">
                                                <CheckCircle size={16}/> Kích hoạt
                                            </button>
                                        ) : <span className="px-4 py-2 bg-slate-200 text-slate-500 font-bold rounded-lg flex items-center gap-2"><CheckCircle size={16}/> Đã duyệt</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
                <div className="space-y-6">
                  {/* Create User */}
                  <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <h3 className="text-sm font-black text-indigo-900 mb-3 flex items-center gap-2"><UserPlus size={16}/> Create / Assign User</h3>
                    <div className="flex gap-2 flex-wrap">
                      <input value={newUserName} onChange={e=>setNewUserName(e.target.value)} placeholder="Username" className="flex-1 min-w-[120px] p-2.5 border rounded-lg bg-white font-bold text-sm"/>
                      <input value={newUserPass} onChange={e=>setNewUserPass(e.target.value)} placeholder="Password" type="password" className="flex-1 min-w-[120px] p-2.5 border rounded-lg bg-white font-bold text-sm"/>
                      <select value={newUserRole} onChange={e=>handleRoleChange(e.target.value)} className="p-2.5 border rounded-lg bg-white font-bold text-sm">
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="parent">Parent 👨‍👩‍👧</option>
                        <option value="team_leader">Trưởng nhóm</option>
                        <option value="center_director">Giám đốc TT</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                      {newUserRole === 'parent' && (
                        <select value={newUserSeats} onChange={e=>setNewUserSeats(Number(e.target.value))} className="p-2.5 border rounded-lg bg-white font-bold text-sm text-indigo-700">
                          <option value={1}>1 con</option>
                          <option value={2}>2 con (Anh chị em)</option>
                          <option value={4}>4 con (Nhóm bạn)</option>
                        </select>
                      )}
                      <button onClick={handleCreateUser} className="px-5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-sm">Tạo</button>
                    </div>
                    {newUserRole === 'parent' && (
                      <p className="text-xs text-indigo-600 mt-2 font-bold">
                        👨‍👩‍👧 Tài khoản Parent sẽ có {newUserSeats} chỗ con. Sau khi tạo, PH dùng tab &quot;Manage Children&quot; để tạo TK con hoặc Admin dùng &ldquo;Link Student&rdquo; bên dưới.
                      </p>
                    )}
                  </div>

                    {/* All Users Table Toolbar */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="text-base font-black text-slate-800">
                            All Users — {allUsers.length} tài khoản {userSearchTerm && `(Tìm thấy ${sortedAndFilteredUsers.length})`}
                          </h3>
                          <p className="text-xs text-slate-400">
                            Tài khoản <strong>owner / super_admin</strong> luôn được ghim ở đầu bảng (⭐). Chọn <strong>Loại gói</strong> + <strong>Thời gian</strong> rồi bấm <strong>Kích hoạt</strong>.
                          </p>
                        </div>

                        {/* Search Input */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <input
                            type="text"
                            value={userSearchTerm}
                            onChange={e => setUserSearchTerm(e.target.value)}
                            placeholder="🔍 Tìm username, email, role..."
                            className="text-xs px-3 py-2 border border-slate-300 rounded-xl bg-white w-full sm:w-64 font-medium focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Role Filter Tabs */}
                      <div className="flex items-center gap-1.5 flex-wrap text-xs">
                        {[
                          { id: 'all', label: `Tất cả (${allUsers.length})` },
                          { id: 'super_admin', label: `⭐ Owner (${allUsers.filter(u => u.role === 'super_admin' || u.username === 'owner').length})` },
                          { id: 'teacher', label: `Giáo viên (${allUsers.filter(u => u.role === 'teacher').length})` },
                          { id: 'student', label: `Học sinh (${allUsers.filter(u => u.role === 'student').length})` },
                          { id: 'parent', label: `Phụ huynh (${allUsers.filter(u => u.role === 'parent').length})` },
                          { id: 'team_leader', label: `Trưởng nhóm (${allUsers.filter(u => u.role === 'team_leader').length})` },
                        ].map(rf => (
                          <button
                            key={rf.id}
                            onClick={() => setUserRoleFilter(rf.id)}
                            className={`px-3 py-1.5 rounded-lg font-bold transition ${
                              userRoleFilter === rf.id
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {rf.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-xl overflow-x-auto shadow-sm">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-100 text-slate-500 text-[11px] uppercase">
                          <tr>
                            <th className="p-3 text-left">User / Role</th>
                            <th className="p-3 text-left">Loại gói</th>
                            <th className="p-3 text-left">Thời gian</th>
                            <th className="p-3 text-center">Kích hoạt</th>
                            <th className="p-3 text-center">Pass</th>
                            <th className="p-3 text-center">Xóa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedAndFilteredUsers.map((u) => {
                            const dl = daysLeft(u.plan_expires_at);
                            const tdl = daysLeft(u.trial_expires_at);
                            const isExpired = dl !== null && dl <= 0;
                            const isExpiringSoon = dl !== null && dl > 0 && dl <= 7;
                            const isOwnerRow = u.username === 'owner' || u.role === 'super_admin';
                            const isTrial = u.plan !== 'premium_lifetime' && (!u.plan_expires_at || u.plan === 'free_trial');
                            const working = rowWorking[u.username];
                            return (
                              <tr key={u.id} className={`border-t hover:bg-slate-50 ${isOwnerRow ? 'bg-amber-50/50 font-medium' : isExpired && !isTrial ? 'bg-red-50' : ''}`}>

                                {/* User / Role */}
                                <td className="p-3 whitespace-nowrap min-w-[150px]">
                                  <div className="flex items-center gap-1.5">
                                    <p className="font-black text-slate-800">{u.username}</p>
                                    {isOwnerRow && (
                                      <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded text-[9px] font-black uppercase tracking-wider">
                                        ⭐ OWNER
                                      </span>
                                    )}
                                  </div>
                                  {u.email && <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{u.email}</p>}
                                  
                                  {/* Real Email Input */}
                                  <div className="flex items-center gap-1 mt-1">
                                    <input
                                      type="email"
                                      placeholder="email@real.com"
                                      value={rowRealEmail[u.username] ?? u.real_email ?? ''}
                                      onChange={e => setRowRealEmail(r => ({ ...r, [u.username]: e.target.value }))}
                                      onKeyDown={e => { if (e.key === 'Enter') handleUpdateRealEmail(u); }}
                                      disabled={!!working}
                                      className="text-[10px] px-1.5 py-0.5 border border-green-300 rounded w-full disabled:opacity-40"
                                    />
                                    <button
                                      onClick={() => handleUpdateRealEmail(u)}
                                      disabled={!!working || !(rowRealEmail[u.username] || '').trim()}
                                      className="text-[10px] px-1.5 py-0.5 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                                    >
                                      💾
                                    </button>
                                  </div>
                                  <select
                                    value={rowRole[u.username] ?? u.role ?? 'student'}
                                    onChange={e => handleChangeRole(u, e.target.value)}
                                    disabled={!!working}
                                    className={`mt-1 text-[10px] font-black uppercase px-1.5 py-0.5 rounded cursor-pointer disabled:opacity-40 border ${
                                      isOwnerRow ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-100 border-slate-300'
                                    }`}
                                  >
                                    <option value="student">STUDENT</option>
                                    <option value="teacher">TEACHER</option>
                                    <option value="parent">PARENT</option>
                                    <option value="team_leader">TEAM_LEADER</option>
                                    <option value="center_director">CENTER_DIRECTOR</option>
                                    <option value="admin">ADMIN</option>
                                    <option value="super_admin">SUPER_ADMIN</option>
                                  </select>
                                </td>

                                {/* Loại gói: type selector + current state below */}
                                <td className="p-3 min-w-[180px]">
                                  <select
                                    value={rowPlan[u.username] ?? u.plan ?? 'free_trial'}
                                    onChange={e => setRowPlan(r => ({ ...r, [u.username]: e.target.value }))}
                                    className="text-xs border rounded px-1.5 py-1 bg-white w-full"
                                  >
                                    {PLAN_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                  </select>
                                  {/* Current state shown below the dropdown */}
                                  <div className="mt-1.5">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${PLAN_BADGE[u.plan] || 'bg-slate-100 text-slate-500'}`}>
                                      {u.plan || 'free_trial'}
                                    </span>
                                    {u.plan_expires_at && !isTrial ? (
                                      <p className={`text-[10px] mt-0.5 font-bold ${isExpired ? 'text-red-600' : isExpiringSoon ? 'text-amber-600' : 'text-slate-500'}`}>
                                        <Calendar size={9} className="inline mr-0.5"/>
                                        {new Date(u.plan_expires_at).toLocaleDateString('vi-VN')}
                                        {dl !== null && <span className="ml-1">({dl > 0 ? `còn ${dl}n` : 'Hết'})</span>}
                                      </p>
                                    ) : u.trial_expires_at ? (
                                      <p className={`text-[10px] mt-0.5 font-bold ${tdl !== null && tdl <= 3 ? 'text-red-500' : 'text-amber-600'}`}>
                                        Trial {tdl !== null ? (tdl > 0 ? `còn ${tdl}n` : 'hết') : '—'}
                                      </p>
                                    ) : <p className="text-[10px] text-slate-300 mt-0.5">—</p>}
                                  </div>
                                </td>

                                {/* Thời gian dropdown */}
                                <td className="p-3 min-w-[130px]">
                                  {(rowPlan[u.username] ?? u.plan) === 'premium_lifetime' ? (
                                    <span className="text-xs font-bold text-amber-600 px-2 py-1 bg-amber-50 rounded-lg">♾ Trọn đời</span>
                                  ) : (
                                    <select
                                      value={rowDuration[u.username] ?? '1'}
                                      onChange={e => setRowDuration(d => ({ ...d, [u.username]: e.target.value }))}
                                      className="text-xs border rounded px-1.5 py-1 bg-white w-full"
                                    >
                                      {DURATION_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                    </select>
                                  )}
                                </td>

                                {/* Kích hoạt */}
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => handleActivate(u)}
                                    disabled={!!working}
                                    className="text-xs font-black px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg whitespace-nowrap"
                                  >
                                    {working === 'activate' ? '…' : 'Kích hoạt'}
                                  </button>
                                </td>

                                {/* Password reset */}
                                <td className="p-3 min-w-[160px]">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="text"
                                      value={rowPass[u.username] ?? ''}
                                      onChange={e => setRowPass(p => ({ ...p, [u.username]: e.target.value }))}
                                      placeholder="New pass"
                                      className="text-xs border rounded px-1.5 py-1 bg-white flex-1 min-w-0 w-24"
                                    />
                                    <button
                                      onClick={() => handleResetPass(u)}
                                      disabled={!!working || !(rowPass[u.username]?.length >= 6)}
                                      title="Reset mật khẩu"
                                      className="p-1.5 bg-slate-600 hover:bg-slate-700 disabled:opacity-30 text-white rounded"
                                    >
                                      {working === 'pass' ? '…' : <KeyRound size={13}/>}
                                    </button>
                                  </div>
                                </td>

                                {/* Xóa */}
                                <td className="p-3 text-center">
                                  {u.username !== 'owner' && (
                                    <button onClick={() => handleDeleteUser(u.username)} className="text-rose-400 hover:text-rose-600 p-1"><Trash2 size={15}/></button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
            )}

            {/* HIERARCHY TAB (Crash Protected) */}
            {activeTab === 'hierarchy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"><Link size={20}/> B2B Subscription Hierarchy</h3>
                  <p className="text-xs text-slate-500 mb-4">Cây phân cấp: Trưởng nhóm / Giám đốc → Giáo viên → Học sinh</p>
                </div>
                {hierarchy.length === 0 ? (
                  <p className="text-slate-400 text-center py-10">Chưa có tài khoản B2B nào.</p>
                ) : hierarchy.map(mgr => (
                  <div key={mgr.id} className="border border-indigo-200 rounded-2xl overflow-hidden">
                    <div className="bg-indigo-50 px-5 py-3 flex items-center justify-between">
                      <div>
                        <span className="font-black text-indigo-800 text-sm">{mgr.username}</span>
                        <span className="ml-2 px-2 py-0.5 bg-indigo-200 text-indigo-700 rounded text-[10px] font-black uppercase">{mgr.role === 'team_leader' ? 'Trưởng nhóm' : 'Giám đốc TT'}</span>
                        <span className="ml-2 text-xs text-slate-500">Gói: {mgr.plan}</span>
                      </div>
                      <div className="text-right text-xs font-bold">
                        <p className="text-indigo-700">{mgr.teacher_count || 0} GV · {mgr.student_count || 0} HS</p>
                        {mgr.trial_expires_at && <p className="text-slate-400">HH: {new Date(mgr.trial_expires_at).toLocaleDateString('vi-VN')}</p>}
                      </div>
                    </div>
                    {(!mgr.teachers || mgr.teachers.length === 0) ? (
                      <p className="px-5 py-3 text-xs text-slate-400 italic">Chưa có giáo viên nào.</p>
                    ) : (
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase">
                          <tr><th className="px-5 py-2 text-left">Giáo viên</th><th className="px-5 py-2 text-right">HS đã tạo / Ghế cấp</th></tr>
                        </thead>
                        <tbody>
                          {(mgr.teachers || []).map(t => (
                            <tr key={t.id} className="border-t hover:bg-slate-50">
                              <td className="px-5 py-2.5 font-bold text-slate-700">{t.username}</td>
                              <td className="px-5 py-2.5 text-right">
                                <span className={`font-black text-sm ${t.student_count >= t.allocated_seats ? 'text-red-600' : 'text-green-600'}`}>{t.student_count}</span>
                                <span className="text-slate-400 text-xs"> / {t.allocated_seats}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TRANSFER ASSIGNMENT TAB */}
            {activeTab === 'assignments' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2"><UserCheck size={20}/> Chuyển học sinh giữa giáo viên</h3>
                    <p className="text-xs text-slate-500 mb-5">Owner có thể gán hoặc chuyển bất kỳ học sinh nào sang giáo viên khác. Giáo viên / Trưởng nhóm tự quản lý trong Teacher Panel của họ.</p>
                  </div>
                  <TransferAssignmentPanel allUsers={allUsers} onRefresh={refreshData} isOpen={isOpen} />
                </div>
            )}

            {/* AVATARS TAB (NEW) */}
            {activeTab === 'avatars' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><ImageIcon/> Global Gallery</h3>
                        <button onClick={() => avatarInputRef.current.click()} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md flex items-center gap-2"><Upload size={16}/> Upload New</button>
                        <input type="file" ref={avatarInputRef} onChange={handleAddAvatar} accept="image/*" multiple className="hidden" />
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
                    
                    {/* Emergency Migration Button */}
                    {isSuperAdmin && (
                      <div className="p-6 border-2 border-rose-200 rounded-xl bg-rose-50">
                        <div className="flex items-start gap-3 mb-4">
                          <Shield className="text-rose-600 flex-shrink-0" size={24} />
                          <div>
                            <p className="font-bold text-rose-900 text-lg">Database Migration</p>
                            <p className="text-sm text-rose-700 mt-1">Run this if SuperAdmin panel shows empty user list or 500 errors.</p>
                            <p className="text-xs text-rose-600 mt-1 font-mono">Adds real_email column to production database</p>
                          </div>
                        </div>
                        <button 
                          onClick={handleRunMigration} 
                          disabled={loading}
                          className="w-full py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-lg shadow-md transition-colors"
                        >
                          🔧 Run Migration (Safe to run multiple times)
                        </button>
                      </div>
                    )}
                    
                    <button onClick={saveConfig} className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg mt-4"><Save size={18} className="inline mr-2"/> Save Changes</button>
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TransferAssignmentPanel — owner can assign/transfer any student to/from any teacher
// ============================================================================
const TransferAssignmentPanel = ({ allUsers, onRefresh, isOpen }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selStudent, setSelStudent] = useState('');
  const [selTeacher, setSelTeacher] = useState('');
  const [transferMap, setTransferMap] = useState({}); // { studentId: new teacherId }
  const [saving, setSaving] = useState({});

  useEffect(() => {
    if (isOpen) loadAssignments();
  }, [isOpen]);

  const loadAssignments = async () => {
    setLoading(true);
    try {
      const res = await teacherAPI.getAllAssignments();
      setAssignments(res.data || []);
    } catch { setAssignments([]); }
    finally { setLoading(false); }
  };

  const teachers = allUsers.filter(u => ['teacher', 'team_leader', 'center_director'].includes(u.role));
  const students = allUsers.filter(u => u.role === 'student');
  const assignedIds = new Set(assignments.map(a => a.student_id));
  const unassigned = students.filter(s => !assignedIds.has(s.id));

  const handleAssign = async () => {
    if (!selStudent || !selTeacher) return;
    setLoading(true);
    try {
      await teacherAPI.assignStudent(parseInt(selTeacher), parseInt(selStudent));
      setSelStudent(''); setSelTeacher('');
      loadAssignments(); onRefresh();
    } catch (e) { alert(e.response?.data?.message || 'Gán thất bại'); }
    finally { setLoading(false); }
  };

  const handleTransfer = async (studentId) => {
    const newTeacherId = transferMap[studentId];
    if (!newTeacherId) return;
    setSaving(s => ({ ...s, [studentId]: true }));
    try {
      await teacherAPI.unassignStudent(studentId);
      await teacherAPI.assignStudent(parseInt(newTeacherId), studentId);
      loadAssignments(); onRefresh();
    } catch (e) { alert(e.response?.data?.message || 'Chuyển thất bại'); }
    finally { setSaving(s => ({ ...s, [studentId]: false })); }
  };

  const handleUnassign = async (studentId) => {
    if (!confirm('Bỏ phân công học sinh này?')) return;
    setLoading(true);
    try {
      await teacherAPI.unassignStudent(studentId);
      loadAssignments(); onRefresh();
    } catch { alert('Thất bại'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      {/* New assignment form */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <p className="text-sm font-black text-blue-800 mb-3">Gán học sinh chưa có GV</p>
        <div className="flex gap-3 flex-wrap">
          <select value={selStudent} onChange={e => setSelStudent(e.target.value)}
            className="flex-1 p-2.5 border rounded-lg bg-white text-sm font-bold min-w-[140px]">
            <option value="">-- Học sinh --</option>
            {unassigned.map(s => <option key={s.id} value={s.id}>{s.username}</option>)}
          </select>
          <select value={selTeacher} onChange={e => setSelTeacher(e.target.value)}
            className="flex-1 p-2.5 border rounded-lg bg-white text-sm font-bold min-w-[140px]">
            <option value="">-- Giáo viên --</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.username}</option>)}
          </select>
          <button onClick={handleAssign} disabled={!selStudent || !selTeacher || loading}
            className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
            <Link size={15}/> Gán
          </button>
        </div>
      </div>

      {unassigned.length > 0 && (
        <div className="px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm font-bold text-yellow-800">
          ⚠️ {unassigned.length} HS chưa gán: {unassigned.map(s => s.username).join(', ')}
        </div>
      )}

      {/* Assignments table with inline transfer */}
      {loading ? <p className="text-slate-400 text-center py-8">Đang tải…</p> : (
        <div className="border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-500 text-[11px] uppercase">
              <tr>
                <th className="p-3 text-left">Học sinh</th>
                <th className="p-3 text-left">GV hiện tại</th>
                <th className="p-3 text-left">Chuyển sang</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(a => {
                const teacher = allUsers.find(u => u.id === a.teacher_id);
                return (
                  <tr key={a.assignment_id || a.student_id} className="border-t hover:bg-slate-50">
                    <td className="p-3 font-bold">{a.student_name || a.student_username}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">
                        {teacher?.username || '—'}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={transferMap[a.student_id] || ''}
                        onChange={e => setTransferMap(m => ({ ...m, [a.student_id]: e.target.value }))}
                        className="text-xs border rounded px-2 py-1 bg-white">
                        <option value="">Chọn GV mới…</option>
                        {teachers.filter(t => t.id !== a.teacher_id).map(t => (
                          <option key={t.id} value={t.id}>{t.username}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-right flex items-center justify-end gap-1.5">
                      {transferMap[a.student_id] && (
                        <button onClick={() => handleTransfer(a.student_id)}
                          disabled={saving[a.student_id]}
                          className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 disabled:opacity-50 font-bold">
                          {saving[a.student_id] ? '…' : 'Chuyển'}
                        </button>
                      )}
                      <button onClick={() => handleUnassign(a.student_id)}
                        className="text-rose-400 hover:text-rose-600 p-1">
                        <X size={14}/>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {assignments.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-slate-400">Chưa có phân công nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SuperAdminPanel;
