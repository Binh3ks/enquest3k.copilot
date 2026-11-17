/**
 * src/config/releaseConfig.js
 * Centralized Release Configuration for EngQuest3K
 */
export const MAX_RELEASED_WEEK = 34;

export const STAFF_ROLES = ['owner', 'admin', 'super_admin', 'teacher', 'team_leader', 'center_director'];

export const isWeekReleased = (weekId) => {
  const w = Number(weekId);
  return !Number.isNaN(w) && w >= 1 && w <= MAX_RELEASED_WEEK;
};

/**
 * Predicate specifically for release guard bypass.
 * Only roles ('owner', staff) or explicit localStorage flag can bypass unreleased weeks.
 * NO displayName or email matching is permitted for release gating!
 */
export const canBypassRelease = (user) => {
  if (user === true) return true;
  const role = user?.role;
  const isOwner = role === 'owner';
  const isStaff = STAFF_ROLES.includes(role);
  const isBypassFlag = typeof window !== 'undefined' && localStorage.getItem('arcade_owner_bypass') === 'true';
  return isOwner || isStaff || isBypassFlag;
};
