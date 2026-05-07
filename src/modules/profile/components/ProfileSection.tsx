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
import { ModalProfile } from './Modal';

export function ProfileSection() {
  const { isAuthenticated } = useAuth();
  const { successOpen, failedOpen, closeSuccess, closeFailed } = usePostPaymentSync();

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

      <ModalProfile
        open={successOpen}
        onClose={closeSuccess}
        title="Payment Successful"
        desciption={`Your payment has been processed successfully.\nWe're updating your account now — this may take a few seconds.`}
        firstText="Continue"
        firstOnClick={closeSuccess}
      />

      <ModalProfile
        open={failedOpen}
        onClose={closeFailed}
        title="Payment Failed"
        desciption={`Unfortunately, your payment could not be completed.\nPlease check your payment details or try again.`}
        firstText="Try Again"
        firstOnClick={closeFailed}
      />
    </div>
  );
}
