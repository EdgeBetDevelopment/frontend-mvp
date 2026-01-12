'use client';

import { useQuery } from '@tanstack/react-query';
import { GeneralInformation } from './GeneralInformation';
import { Subscription } from './Subscription';
import SecuritySettings from './SecuritySettings';
import { userService } from '@/services/user';

export function ProfileSection() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getMe,
  });

  return (
    <div className="space-y-6">
      <Subscription />
      <GeneralInformation />
      {user && <SecuritySettings user={user} />}
    </div>
  );
}
