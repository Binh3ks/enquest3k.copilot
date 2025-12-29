// Firebase imports commented out - install firebase if needed
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// --- 1. KHỞI TẠO FIREBASE AN TOÀN (SINGLETON) ---
let app = null;
let auth = null;
let db = null;

// Firebase disabled - uncomment imports above and enable this code if needed
// try {
//   const firebaseConfig = typeof __firebase_config !== 'undefined' ? __firebase_config : null;
//   if (firebaseConfig && getApps().length === 0) {
//     try {
//       app = initializeApp(typeof firebaseConfig === 'string' ? JSON.parse(firebaseConfig) : firebaseConfig);
//       auth = getAuth(app);
//       db = getFirestore(app);
//     } catch (error) {
//       console.warn("⚠️ Firebase initialization skipped:", error.message);
//       app = null;
//     }
//   }
// } catch (e) {
//   console.warn("⚠️ Firebase Init Warning:", e.message);
// }

export { auth, db };

// --- 2. CẤU HÌNH GÓI CƯỚC ---
export const SUBSCRIPTION_PLANS = {
  FREE: { id: 'free', name: 'Starter', price: 0, limits: { worksheet_download: false } },
  BASIC: { id: 'basic', name: 'Junior', price: 99000, limits: { worksheet_download: true } },
  PREMIUM: { id: 'premium', name: 'Elite', price: 990000, limits: { worksheet_download: true } }
};

const CONFIG_KEY = 'engquest_sys_config';

// --- 3. PUBLIC API ---

// Lấy trạng thái hệ thống (Paid/Free mode)
export const getSystemStatus = () => {
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    return stored ? JSON.parse(stored) : { isPaidMode: true };
  } catch {
    return { isPaidMode: true };
  }
};

// Cập nhật trạng thái hệ thống
export const setSystemStatus = (isPaidMode) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify({ isPaidMode }));
  window.dispatchEvent(new Event('subscription-update'));
};

// Kiểm tra quyền (Logic thực tế)
export const checkAccess = async (feature) => {
  const system = getSystemStatus();
  if (!system.isPaidMode) return true; // Free Mode -> Mở hết

  if (!auth || !auth.currentUser) return false;

  // Lấy plan từ localStorage (Đảm bảo hoạt động ngay lập tức)
  const userPlan = localStorage.getItem(`plan_${auth.currentUser.uid}`) || 'free';

  if (feature === 'worksheet_download') {
    return userPlan !== 'free'; // Basic & Premium OK
  }
  return true;
};

// Nâng cấp user (Lưu vào localStorage để test ngay)
export const upgradeSubscription = async (uid, planId) => {
  if (!uid && auth && auth.currentUser) uid = auth.currentUser.uid;
  
  if (uid) {
    localStorage.setItem(`plan_${uid}`, planId);
    // Phát event để UI cập nhật ngay lập tức
    window.dispatchEvent(new Event('subscription-update'));
    return true;
  }
  return false;
};

export const getCurrentUserPlan = () => {
  if (!auth || !auth.currentUser) return 'guest';
  return localStorage.getItem(`plan_${auth.currentUser.uid}`) || 'free';
};
