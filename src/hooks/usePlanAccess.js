import { useMemo, useCallback } from 'react';
import { useUserStore } from '../stores/useUserStore';
import {
  getEffectivePlan,
  canAccessWeek as _canAccessWeek,
  canUseAI as _canUseAI,
  incrementAIUsage,
  getAIUsageToday,
  getTrialDaysLeft,
  getPlanDaysLeft,
  isB2BPlan,
  PLANS,
} from '../services/SubscriptionManager';

/**
 * usePlanAccess — single hook for all plan/access logic.
 *
 * Returns:
 *   effectivePlan   'unlimited' | 'student' | 'teacher_*' | 'free_trial' | 'expired' | 'guest'
 *   isPaid          boolean — any active paid plan
 *   isFullAccess    boolean — can access all weeks
 *   trialDaysLeft   number
 *   planDaysLeft    number | null
 *   seatsTotal      number (B2B teachers/centers)
 *   isB2B           boolean
 *   canAccessWeek   (weekId: number) => boolean
 *   canUseAI        () => boolean
 *   useAITurn       () => void  — call after each AI message
 *   aiUsageToday    number
 *   aiDailyLimit    number (-1 = unlimited)
 *   planLabel       string
 */
export function usePlanAccess() {
  const currentUser = useUserStore(state => state.currentUser);

  const effectivePlan = useMemo(() => getEffectivePlan(currentUser), [currentUser]);

  const isPaid = useMemo(() =>
    ['unlimited', 'student', 'teacher_5', 'teacher_10', 'teacher_20', 'center_50', 'premium', 'student_sponsored']
      .includes(effectivePlan),
  [effectivePlan]);

  const isFullAccess = useMemo(() => isPaid || effectivePlan === 'unlimited', [isPaid, effectivePlan]);

  const trialDaysLeft = useMemo(() => getTrialDaysLeft(currentUser), [currentUser]);
  const planDaysLeft = useMemo(() => getPlanDaysLeft(currentUser), [currentUser]);

  const seatsTotal = useMemo(() => currentUser?.seats_total || 0, [currentUser]);
  const isB2B = useMemo(() => isB2BPlan(currentUser?.plan), [currentUser]);

  const canAccessWeekFn = useCallback(
    (weekId) => _canAccessWeek(currentUser, weekId),
    [currentUser]
  );

  const canUseAIFn = useCallback(
    () => _canUseAI(currentUser),
    [currentUser]
  );

  const useAITurn = useCallback(() => {
    incrementAIUsage(currentUser);
  }, [currentUser]);

  const aiUsageToday = useMemo(() => getAIUsageToday(currentUser), [currentUser]);

  const aiDailyLimit = useMemo(() => {
    if (effectivePlan === 'free_trial') return 5;
    if (effectivePlan === 'expired' || effectivePlan === 'guest') return 0;
    return -1; // unlimited
  }, [effectivePlan]);

  const planLabel = useMemo(() => {
    if (effectivePlan === 'unlimited') return 'Owner';
    if (effectivePlan === 'expired') return 'Hết hạn';
    if (effectivePlan === 'guest') return 'Khách';
    if (effectivePlan === 'free_trial') {
      return trialDaysLeft > 0 ? `Dùng thử (còn ${trialDaysLeft} ngày)` : 'Dùng thử (hết hạn)';
    }
    if (effectivePlan === 'student_sponsored') return 'Student (qua giáo viên)';
    return PLANS[effectivePlan]?.label || effectivePlan;
  }, [effectivePlan, trialDaysLeft]);

  return {
    effectivePlan,
    isPaid,
    isFullAccess,
    trialDaysLeft,
    planDaysLeft,
    seatsTotal,
    isB2B,
    canAccessWeek: canAccessWeekFn,
    canUseAI: canUseAIFn,
    useAITurn,
    aiUsageToday,
    aiDailyLimit,
    planLabel,
  };
}
