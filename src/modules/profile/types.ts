export interface UpdateMeDto {
  email?: string;
  username?: string;
}

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

export enum SubscriptionPlan {
  Starter = 'Starter',
  Pro = 'Pro',
  Premium = 'Premium',
  AnnualPlan = 'Annual Plan',
  WhopWeekly = 'Whop Weekly',
  WhopMonthly = 'Whop Monthly',
  WhopOneTime = 'Whop One Time',
}

export const PREMIUM_PLANS = new Set<string>([
  SubscriptionPlan.Premium,
  SubscriptionPlan.AnnualPlan,
  SubscriptionPlan.WhopWeekly,
  SubscriptionPlan.WhopMonthly,
  SubscriptionPlan.WhopOneTime,
]);

export interface IUserSubscription {
  id: number;
  type_id: number;
  type?: {
    name?: string;
  };
  status: string;
  created_at: string;
}

export const hasPremiumSubscription = (
  subscriptions?: IUserSubscription[],
): boolean =>
  !!subscriptions?.some(
    (s) => s.status === 'active' && PREMIUM_PLANS.has(s.type?.name ?? ''),
  );
