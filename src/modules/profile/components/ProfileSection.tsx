'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/modules/auth';
import { GeneralInformation } from './GeneralInformation';
import { Subscription } from './Subscription';
import SecuritySettings from './SecuritySettings';
import PasswordSettings from './PasswordSettings';
import { DiscordConnect } from './DiscordConnect';
import { userService } from '@/modules/profile/services';
import { usePostPaymentSync } from '@/modules/profile/hooks/usePostPaymentSync';

export function ProfileSection() {
  const { isAuthenticated } = useAuth();
  usePostPaymentSync();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getMe,
    enabled: isAuthenticated,
  });

  return (
    <div className="space-y-6">
      <Subscription />
      <GeneralInformation />
      <DiscordConnect discordUserId={user?.discord_user_id} />
      <PasswordSettings />
      {user && <SecuritySettings user={user} />}
    </div>
  );
}
