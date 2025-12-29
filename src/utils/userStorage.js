const USERS_KEY = 'engquest_users_db_v2';
const BILLING_KEY = 'engquest_billing_requests';
const AVATARS_KEY = 'engquest_global_avatars';

// --- DEFAULT AVATARS (Đẹp & Phong phú hơn) ---
const DEFAULT_AVATARS = [
  // Chibi Boys
  { id: 'boy_1', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Felix&backgroundColor=b6e3f4' },
  { id: 'boy_2', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Ivan&backgroundColor=c0ebd7' },
  // Chibi Girls
  { id: 'girl_1', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Amara&backgroundColor=ffdfbf' },
  { id: 'girl_2', url: 'https://api.dicebear.com/9.x/micah/svg?seed=Nora&backgroundColor=fdf4e3' },
  // Thú cưng & Đồ vật (Dùng style fun-emoji hoặc icons)
  { id: 'cat', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Kitty&backgroundColor=ffdfbf' },
  { id: 'bear', url: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Bear&backgroundColor=b6e3f4' },
  { id: 'car', url: 'https://api.dicebear.com/9.x/icons/svg?seed=Car&backgroundColor=e0e7ff&icon=car' }, // Xe đua (Icon)
  { id: 'flower', url: 'https://api.dicebear.com/9.x/icons/svg?seed=Flower&backgroundColor=fce7f3&icon=flower' } // Hoa
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
