const USERS_KEY = 'engquest_users_db_v2';
const BILLING_KEY = 'engquest_billing_requests';
const AVATARS_KEY = 'engquest_global_avatars';

// --- DEFAULT AVATARS (Đẹp & Phong phú hơn) ---
// These are DiceBear CDN fallbacks — primary gallery is loaded from
// /api/admin/global-avatars (64 presets stored in Supabase).
// When DB gallery is empty/404, this fallback is used.
export const DEFAULT_AVATARS = [
  // Micah (anime-style)
  { id: 'mx_yuki', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Yuki&backgroundColor=fdf4e3' },
  { id: 'mx_hana', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Hana&backgroundColor=e8d5f5' },
  { id: 'mx_sora', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Sora&backgroundColor=b6e3f4' },
  { id: 'mx_mei', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Mei&backgroundColor=ffd5dc' },
  { id: 'mx_ryu', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Ryu&backgroundColor=c0aede' },
  { id: 'mx_luna', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Luna&backgroundColor=d1f4e0' },
  { id: 'mx_aiko', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Aiko&backgroundColor=fce4ec' },
  { id: 'mx_haru', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Haru&backgroundColor=e8eaf6' },
  // Avataaars (cartoon)
  { id: 'av_kenji', url: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Kenji&backgroundColor=b6e3f4' },
  { id: 'av_leomiu', url: 'https://api.dicebear.com/9.x/avataaars/svg?seed=LeoMiu&backgroundColor=ffd5dc' },
  { id: 'av_nao', url: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Nao&backgroundColor=c0aede' },
  { id: 'av_riku', url: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Riku&backgroundColor=fce4ec' },
  // Adventurer (colorful)
  { id: 'ad_ren', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ren&backgroundColor=c0aede' },
  { id: 'ad_mika', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mika&backgroundColor=d1f4e0' },
  { id: 'ad_hina', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Hina&backgroundColor=fdf4e3' },
  { id: 'ad_junya', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Junya&backgroundColor=e8d5f5' },
  // Lorelei (anime-like)
  { id: 'lr_yuki2', url: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Yuki2&backgroundColor=fce4ec' },
  { id: 'lr_sora2', url: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Sora2&backgroundColor=e8eaf6' },
  { id: 'lr_ren', url: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Ren&backgroundColor=fdf4e3' },
  { id: 'lr_mika2', url: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Mika2&backgroundColor=ffd5dc' },
];

// --- AVATAR MANAGEMENT ---
export const getGlobalAvatars = () => {
  try {
    const stored = localStorage.getItem(AVATARS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_AVATARS;
  } catch { return DEFAULT_AVATARS; }
};

export const addGlobalAvatar = (url) => {
  const avatars = getGlobalAvatars();
  const newAvatar = { id: `custom_${Date.now()}`, url };
  avatars.push(newAvatar);
  localStorage.setItem(AVATARS_KEY, JSON.stringify(avatars));
  return avatars;
};

export const deleteGlobalAvatar = (id) => {
    let avatars = getGlobalAvatars();
    // Không cho xóa avatar mặc định nếu muốn an toàn, nhưng ở đây cho phép Admin xóa hết trừ cái đầu
    avatars = avatars.filter(a => a.id !== id);
    localStorage.setItem(AVATARS_KEY, JSON.stringify(avatars));
    return avatars;
};

// --- USER MANAGEMENT ---
export const loadAllUsers = () => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch { return {}; }
};

export const saveUserToDB = (username, data) => {
  const users = loadAllUsers();
  users[username] = data;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUserFromDB = (username) => {
  const users = loadAllUsers();
  return users[username] || null;
};

// --- BILLING MANAGEMENT ---
export const createPaymentRequest = (username, plan, amount) => {
  const requests = getPaymentRequests();
  const newReq = {
    id: Date.now(),
    username,
    plan,
    amount,
    status: 'pending', // pending, approved, rejected
    date: new Date().toISOString()
  };
  requests.push(newReq);
  localStorage.setItem(BILLING_KEY, JSON.stringify(requests));
  return newReq;
};

export const getPaymentRequests = () => {
  try {
    const data = localStorage.getItem(BILLING_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

export const approvePayment = (reqId) => {
  const requests = getPaymentRequests();
  const reqIndex = requests.findIndex(r => r.id === reqId);
  if (reqIndex !== -1) {
    requests[reqIndex].status = 'approved';
    localStorage.setItem(BILLING_KEY, JSON.stringify(requests));
    
    // Upgrade User Logic
    const username = requests[reqIndex].username;
    const user = getUserFromDB(username);
    if (user) {
      user.plan = requests[reqIndex].plan;
      saveUserToDB(username, user);
    }
    return true;
  }
  return false;
};
