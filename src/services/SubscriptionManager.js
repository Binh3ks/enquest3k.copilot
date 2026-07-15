// ── EngQuest3K Subscription Manager ──
// Single source of truth for plans, pricing, and access rules.
// Backend is authoritative (via /api/subscription/status).
// This module provides: constants, local helpers, and the useSubscription store.

// ──────────────────────────────────────────────────────
// PLAN CATALOGUE
// ──────────────────────────────────────────────────────
export const PLANS = {
  free_trial: {
    id: 'free_trial',
    label: 'Dùng thử',
    badge: null,
    max_week: 4,
    ai_daily_limit: 5,
    can_print: false,
    seats: 0,
    desc: '4 tuần đầu + AI 5 lần/ngày, miễn phí 14 ngày',
  },
  student: {
    id: 'student',
    label: 'Student',
    badge: 'Phổ biến',
    price_monthly: 99000,
    price_yearly: 890000,
    max_week: 999,
    ai_daily_limit: -1,
    can_print: true,
    seats: 0,
    desc: 'Toàn bộ content + AI không giới hạn + In worksheet',
  },
  family: {
    id: 'family',
    label: 'Gia đình',
    badge: 'Giảm 20%',
    price_monthly: 316000,
    price_yearly: 2844000,
    max_week: 999,
    ai_daily_limit: -1,
    can_print: true,
    seats: 4,
    teachers: 0,
    desc: '4 học sinh (anh chị em / bạn bè) · ~79k/HS/tháng (-20% vs cá nhân)',
  },
  sibling: {
    id: 'sibling',
    label: 'Anh em 2 HS',
    badge: 'Giảm 15%',
    price_monthly: 168000,
    price_yearly: 1512000,
    max_week: 999,
    ai_daily_limit: -1,
    can_print: true,
    seats: 2,
    teachers: 0,
    desc: '2 học sinh anh em · ~84k/HS/tháng (-15% vs cá nhân)',
  },
  // ── B2B: Giáo viên ──────────────────────────────────
  // Option 2: 89k×HS + 99k×GV/tháng
  // GV Starter 1+5:       89k×5  + 99k×1  = 544k   ~109k/HS [bait]
  // GV Pro 1(max2)+20:    69k×20 + 99k×1  = 1.479M  ~74k/HS  [-25%]
  // Nhóm 3(max5)+60:      49k×60 + 99k×3  = 3.237M  ~54k/HS  [-45%]
  // Center 10(max15)+200: 39k×200+ 99k×10 = 8.79M   ~44k/HS  [-55%]
  teacher_starter: {
    id: 'teacher_starter',
    label: 'GV Starter',
    badge: 'Khởi đầu',
    price_monthly: 445000,
    price_yearly: 4450000,
    max_week: 999,
    ai_daily_limit: -1,
    can_print: true,
    seats: 5,
    teachers: 1,
    extra_seat_price: 89000,
    desc: '1 giáo viên + 5 học sinh · ~89k/HS/tháng',
  },
  teacher_pro: {
    id: 'teacher_pro',
    label: 'GV Pro',
    badge: '✨ Giá trị nhất',
    price_monthly: 1380000,
    price_yearly: 13800000,
    max_week: 999,
    ai_daily_limit: -1,
    can_print: true,
    seats: 20,
    teachers: 1,
    extra_seat_price: 69000,
    desc: '1 giáo viên + 20 học sinh · ~69k/HS/tháng',
  },
  team: {
    id: 'team',
    label: 'Nhóm',
    badge: 'Tiết kiệm 51%',
    price_monthly: 2940000,
    price_yearly: 29400000,
    max_week: 999,
    ai_daily_limit: -1,
    can_print: true,
    seats: 60,
    teachers: 3,
    extra_seat_price: 49000,
    desc: '3 giáo viên + 60 học sinh · ~49k/HS/tháng',
  },
  center: {
    id: 'center',
    label: 'Trung tâm',
    badge: 'Tiết kiệm 61%',
    price_monthly: 7800000,
    price_yearly: 78000000,
    max_week: 999,
    ai_daily_limit: -1,
    can_print: true,
    seats: 200,
    teachers: 8,
    extra_seat_price: 39000,
    desc: '8 giáo viên + 200 học sinh · ~39k/HS/tháng',
  },
  // ── Premium Lifetime: trọn đời, chỉ cấp bởi Owner ────────────────────
  premium_lifetime: {
    id: 'premium_lifetime',
    label: 'Premium Trọn Đời',
    badge: '⭐ Lifetime',
    price_monthly: 0,
    price_yearly: 0,
    max_week: 999,
    ai_daily_limit: -1,
    can_print: true,
    seats: 0,
    desc: 'Trọn đời, cấp bởi Owner, không hết hạn',
  },
};

// Extra seat add-on price per month
export const EXTRA_SEAT_PRICE = 39000;

// ──────────────────────────────────────────────────────
// HELPERS (no API calls — use local user data)
// ──────────────────────────────────────────────────────

function isExpired(dateStr) {
  if (!dateStr) return true;
  return new Date(dateStr) < new Date();
}

export function getEffectivePlan(user) {
  if (!user) return 'guest';
  const { role, plan, plan_expires_at, trial_expires_at } = user;

  if (role === 'guest') return 'guest';
  if (role === 'super_admin' || role === 'admin') return 'unlimited';
  // Staff roles always have full access
  if (role === 'teacher' || role === 'team_leader' || role === 'center_director') return 'unlimited';
  // Parent (Family plan holder) — treat same as paid student for content access
  if (role === 'parent') {
    if (plan === 'family' && !isExpired(plan_expires_at)) return 'family';
    return 'expired';
  }

  // premium_lifetime never expires
  if (plan === 'premium_lifetime') return 'premium_lifetime';

  const paidPlans = ['student', 'family', 'teacher_starter', 'teacher_pro', 'team', 'center', 'premium_lifetime'];
  if (paidPlans.includes(plan) && !isExpired(plan_expires_at)) return plan;

  if (!isExpired(trial_expires_at)) return 'free_trial';

  return 'expired';
}

export function canAccessWeek(user, weekId) {
  const ep = getEffectivePlan(user);
  if (ep === 'unlimited') return true;
  if (ep === 'guest') return weekId <= 3;
  if (ep === 'free_trial') return weekId <= 4;
  if (ep === 'expired') return weekId <= 3;
  // student / teacher_* / student_sponsored → full access
  return true;
}

export function canUseAI(user) {
  const ep = getEffectivePlan(user);
  if (ep === 'unlimited') return true;
  if (['student', 'family', 'teacher_starter', 'teacher_pro', 'team', 'center', 'premium_lifetime', 'student_sponsored'].includes(ep)) return true;
  if (ep === 'free_trial') {
    const today = new Date().toDateString();
    const key = `ai_count_${user?.id}_${today}`;
    const count = parseInt(localStorage.getItem(key) || '0');
    return count < 5;
  }
  return false;
}

export function incrementAIUsage(user) {
  if (!user) return;
  const today = new Date().toDateString();
  const key = `ai_count_${user.id}_${today}`;
  const count = parseInt(localStorage.getItem(key) || '0');
  localStorage.setItem(key, String(count + 1));
}

export function getAIUsageToday(user) {
  if (!user) return 0;
  const today = new Date().toDateString();
  const key = `ai_count_${user.id}_${today}`;
  return parseInt(localStorage.getItem(key) || '0');
}

export function isB2BPlan(plan) {
  return ['teacher_starter', 'teacher_pro', 'team', 'center'].includes(plan);
}

export function getTrialDaysLeft(user) {
  if (!user?.trial_expires_at) return 0;
  const diff = new Date(user.trial_expires_at) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getPlanDaysLeft(user) {
  if (!user?.plan_expires_at) return null;
  const diff = new Date(user.plan_expires_at) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ──────────────────────────────────────────────────────
// LEGACY - keep for backward compat
// ──────────────────────────────────────────────────────
export const SUBSCRIPTION_PLANS = PLANS;

const CONFIG_KEY = 'engquest_sys_config';
export const getSystemStatus = () => {
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    return stored ? JSON.parse(stored) : { isPaidMode: true };
  } catch { return { isPaidMode: true }; }
};
export const setSystemStatus = (isPaidMode) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify({ isPaidMode }));
  window.dispatchEvent(new Event('subscription-update'));
};

